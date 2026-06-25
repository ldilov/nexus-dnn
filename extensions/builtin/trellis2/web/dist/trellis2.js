function hw(t, a) {
  for (var l = 0; l < a.length; l++) {
    const o = a[l];
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
function nh(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var nd = { exports: {} }, Wr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var x0;
function mw() {
  if (x0) return Wr;
  x0 = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function l(o, s, u) {
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
  return Wr.Fragment = a, Wr.jsx = l, Wr.jsxs = l, Wr;
}
var S0;
function gw() {
  return S0 || (S0 = 1, nd.exports = mw()), nd.exports;
}
var R = gw(), ad = { exports: {} }, Ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var w0;
function pw() {
  if (w0) return Ue;
  w0 = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), v = Symbol.iterator;
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
  }, C = Object.assign, T = {};
  function N(A, V, I) {
    this.props = A, this.context = V, this.refs = T, this.updater = I || S;
  }
  N.prototype.isReactComponent = {}, N.prototype.setState = function(A, V) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, V, "setState");
  }, N.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function j() {
  }
  j.prototype = N.prototype;
  function w(A, V, I) {
    this.props = A, this.context = V, this.refs = T, this.updater = I || S;
  }
  var z = w.prototype = new j();
  z.constructor = w, C(z, N.prototype), z.isPureReactComponent = !0;
  var U = Array.isArray;
  function H() {
  }
  var k = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function Q(A, V, I) {
    var ne = I.ref;
    return {
      $$typeof: t,
      type: A,
      key: V,
      ref: ne !== void 0 ? ne : null,
      props: I
    };
  }
  function le(A, V) {
    return Q(A.type, V, A.props);
  }
  function K(A) {
    return typeof A == "object" && A !== null && A.$$typeof === t;
  }
  function J(A) {
    var V = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(I) {
      return V[I];
    });
  }
  var oe = /\/+/g;
  function L(A, V) {
    return typeof A == "object" && A !== null && A.key != null ? J("" + A.key) : V.toString(36);
  }
  function X(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(H, H) : (A.status = "pending", A.then(
          function(V) {
            A.status === "pending" && (A.status = "fulfilled", A.value = V);
          },
          function(V) {
            A.status === "pending" && (A.status = "rejected", A.reason = V);
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
  function _(A, V, I, ne, se) {
    var me = typeof A;
    (me === "undefined" || me === "boolean") && (A = null);
    var ge = !1;
    if (A === null) ge = !0;
    else
      switch (me) {
        case "bigint":
        case "string":
        case "number":
          ge = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case t:
            case a:
              ge = !0;
              break;
            case y:
              return ge = A._init, _(
                ge(A._payload),
                V,
                I,
                ne,
                se
              );
          }
      }
    if (ge)
      return se = se(A), ge = ne === "" ? "." + L(A, 0) : ne, U(se) ? (I = "", ge != null && (I = ge.replace(oe, "$&/") + "/"), _(se, V, I, "", function(ze) {
        return ze;
      })) : se != null && (K(se) && (se = le(
        se,
        I + (se.key == null || A && A.key === se.key ? "" : ("" + se.key).replace(
          oe,
          "$&/"
        ) + "/") + ge
      )), V.push(se)), 1;
    ge = 0;
    var W = ne === "" ? "." : ne + ":";
    if (U(A))
      for (var pe = 0; pe < A.length; pe++)
        ne = A[pe], me = W + L(ne, pe), ge += _(
          ne,
          V,
          I,
          me,
          se
        );
    else if (pe = x(A), typeof pe == "function")
      for (A = pe.call(A), pe = 0; !(ne = A.next()).done; )
        ne = ne.value, me = W + L(ne, pe++), ge += _(
          ne,
          V,
          I,
          me,
          se
        );
    else if (me === "object") {
      if (typeof A.then == "function")
        return _(
          X(A),
          V,
          I,
          ne,
          se
        );
      throw V = String(A), Error(
        "Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ge;
  }
  function O(A, V, I) {
    if (A == null) return A;
    var ne = [], se = 0;
    return _(A, ne, "", "", function(me) {
      return V.call(I, me, se++);
    }), ne;
  }
  function Z(A) {
    if (A._status === -1) {
      var V = A._result;
      V = V(), V.then(
        function(I) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = I);
        },
        function(I) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = I);
        }
      ), A._status === -1 && (A._status = 0, A._result = V);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var G = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var V = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(V)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  }, ae = {
    map: O,
    forEach: function(A, V, I) {
      O(
        A,
        function() {
          V.apply(this, arguments);
        },
        I
      );
    },
    count: function(A) {
      var V = 0;
      return O(A, function() {
        V++;
      }), V;
    },
    toArray: function(A) {
      return O(A, function(V) {
        return V;
      }) || [];
    },
    only: function(A) {
      if (!K(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return Ue.Activity = m, Ue.Children = ae, Ue.Component = N, Ue.Fragment = l, Ue.Profiler = s, Ue.PureComponent = w, Ue.StrictMode = o, Ue.Suspense = p, Ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k, Ue.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return k.H.useMemoCache(A);
    }
  }, Ue.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, Ue.cacheSignal = function() {
    return null;
  }, Ue.cloneElement = function(A, V, I) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var ne = C({}, A.props), se = A.key;
    if (V != null)
      for (me in V.key !== void 0 && (se = "" + V.key), V)
        !D.call(V, me) || me === "key" || me === "__self" || me === "__source" || me === "ref" && V.ref === void 0 || (ne[me] = V[me]);
    var me = arguments.length - 2;
    if (me === 1) ne.children = I;
    else if (1 < me) {
      for (var ge = Array(me), W = 0; W < me; W++)
        ge[W] = arguments[W + 2];
      ne.children = ge;
    }
    return Q(A.type, se, ne);
  }, Ue.createContext = function(A) {
    return A = {
      $$typeof: f,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: u,
      _context: A
    }, A;
  }, Ue.createElement = function(A, V, I) {
    var ne, se = {}, me = null;
    if (V != null)
      for (ne in V.key !== void 0 && (me = "" + V.key), V)
        D.call(V, ne) && ne !== "key" && ne !== "__self" && ne !== "__source" && (se[ne] = V[ne]);
    var ge = arguments.length - 2;
    if (ge === 1) se.children = I;
    else if (1 < ge) {
      for (var W = Array(ge), pe = 0; pe < ge; pe++)
        W[pe] = arguments[pe + 2];
      se.children = W;
    }
    if (A && A.defaultProps)
      for (ne in ge = A.defaultProps, ge)
        se[ne] === void 0 && (se[ne] = ge[ne]);
    return Q(A, me, se);
  }, Ue.createRef = function() {
    return { current: null };
  }, Ue.forwardRef = function(A) {
    return { $$typeof: h, render: A };
  }, Ue.isValidElement = K, Ue.lazy = function(A) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: A },
      _init: Z
    };
  }, Ue.memo = function(A, V) {
    return {
      $$typeof: g,
      type: A,
      compare: V === void 0 ? null : V
    };
  }, Ue.startTransition = function(A) {
    var V = k.T, I = {};
    k.T = I;
    try {
      var ne = A(), se = k.S;
      se !== null && se(I, ne), typeof ne == "object" && ne !== null && typeof ne.then == "function" && ne.then(H, G);
    } catch (me) {
      G(me);
    } finally {
      V !== null && I.types !== null && (V.types = I.types), k.T = V;
    }
  }, Ue.unstable_useCacheRefresh = function() {
    return k.H.useCacheRefresh();
  }, Ue.use = function(A) {
    return k.H.use(A);
  }, Ue.useActionState = function(A, V, I) {
    return k.H.useActionState(A, V, I);
  }, Ue.useCallback = function(A, V) {
    return k.H.useCallback(A, V);
  }, Ue.useContext = function(A) {
    return k.H.useContext(A);
  }, Ue.useDebugValue = function() {
  }, Ue.useDeferredValue = function(A, V) {
    return k.H.useDeferredValue(A, V);
  }, Ue.useEffect = function(A, V) {
    return k.H.useEffect(A, V);
  }, Ue.useEffectEvent = function(A) {
    return k.H.useEffectEvent(A);
  }, Ue.useId = function() {
    return k.H.useId();
  }, Ue.useImperativeHandle = function(A, V, I) {
    return k.H.useImperativeHandle(A, V, I);
  }, Ue.useInsertionEffect = function(A, V) {
    return k.H.useInsertionEffect(A, V);
  }, Ue.useLayoutEffect = function(A, V) {
    return k.H.useLayoutEffect(A, V);
  }, Ue.useMemo = function(A, V) {
    return k.H.useMemo(A, V);
  }, Ue.useOptimistic = function(A, V) {
    return k.H.useOptimistic(A, V);
  }, Ue.useReducer = function(A, V, I) {
    return k.H.useReducer(A, V, I);
  }, Ue.useRef = function(A) {
    return k.H.useRef(A);
  }, Ue.useState = function(A) {
    return k.H.useState(A);
  }, Ue.useSyncExternalStore = function(A, V, I) {
    return k.H.useSyncExternalStore(
      A,
      V,
      I
    );
  }, Ue.useTransition = function() {
    return k.H.useTransition();
  }, Ue.version = "19.2.7", Ue;
}
var E0;
function No() {
  return E0 || (E0 = 1, ad.exports = pw()), ad.exports;
}
var M = No();
const ye = /* @__PURE__ */ nh(M), yw = /* @__PURE__ */ hw({
  __proto__: null,
  default: ye
}, [M]);
var id = { exports: {} }, eo = {}, ld = { exports: {} }, rd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _0;
function vw() {
  return _0 || (_0 = 1, (function(t) {
    function a(_, O) {
      var Z = _.length;
      _.push(O);
      e: for (; 0 < Z; ) {
        var G = Z - 1 >>> 1, ae = _[G];
        if (0 < s(ae, O))
          _[G] = O, _[Z] = ae, Z = G;
        else break e;
      }
    }
    function l(_) {
      return _.length === 0 ? null : _[0];
    }
    function o(_) {
      if (_.length === 0) return null;
      var O = _[0], Z = _.pop();
      if (Z !== O) {
        _[0] = Z;
        e: for (var G = 0, ae = _.length, A = ae >>> 1; G < A; ) {
          var V = 2 * (G + 1) - 1, I = _[V], ne = V + 1, se = _[ne];
          if (0 > s(I, Z))
            ne < ae && 0 > s(se, I) ? (_[G] = se, _[ne] = Z, G = ne) : (_[G] = I, _[V] = Z, G = V);
          else if (ne < ae && 0 > s(se, Z))
            _[G] = se, _[ne] = Z, G = ne;
          else break e;
        }
      }
      return O;
    }
    function s(_, O) {
      var Z = _.sortIndex - O.sortIndex;
      return Z !== 0 ? Z : _.id - O.id;
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
    var p = [], g = [], y = 1, m = null, v = 3, x = !1, S = !1, C = !1, T = !1, N = typeof setTimeout == "function" ? setTimeout : null, j = typeof clearTimeout == "function" ? clearTimeout : null, w = typeof setImmediate < "u" ? setImmediate : null;
    function z(_) {
      for (var O = l(g); O !== null; ) {
        if (O.callback === null) o(g);
        else if (O.startTime <= _)
          o(g), O.sortIndex = O.expirationTime, a(p, O);
        else break;
        O = l(g);
      }
    }
    function U(_) {
      if (C = !1, z(_), !S)
        if (l(p) !== null)
          S = !0, H || (H = !0, J());
        else {
          var O = l(g);
          O !== null && X(U, O.startTime - _);
        }
    }
    var H = !1, k = -1, D = 5, Q = -1;
    function le() {
      return T ? !0 : !(t.unstable_now() - Q < D);
    }
    function K() {
      if (T = !1, H) {
        var _ = t.unstable_now();
        Q = _;
        var O = !0;
        try {
          e: {
            S = !1, C && (C = !1, j(k), k = -1), x = !0;
            var Z = v;
            try {
              t: {
                for (z(_), m = l(p); m !== null && !(m.expirationTime > _ && le()); ) {
                  var G = m.callback;
                  if (typeof G == "function") {
                    m.callback = null, v = m.priorityLevel;
                    var ae = G(
                      m.expirationTime <= _
                    );
                    if (_ = t.unstable_now(), typeof ae == "function") {
                      m.callback = ae, z(_), O = !0;
                      break t;
                    }
                    m === l(p) && o(p), z(_);
                  } else o(p);
                  m = l(p);
                }
                if (m !== null) O = !0;
                else {
                  var A = l(g);
                  A !== null && X(
                    U,
                    A.startTime - _
                  ), O = !1;
                }
              }
              break e;
            } finally {
              m = null, v = Z, x = !1;
            }
            O = void 0;
          }
        } finally {
          O ? J() : H = !1;
        }
      }
    }
    var J;
    if (typeof w == "function")
      J = function() {
        w(K);
      };
    else if (typeof MessageChannel < "u") {
      var oe = new MessageChannel(), L = oe.port2;
      oe.port1.onmessage = K, J = function() {
        L.postMessage(null);
      };
    } else
      J = function() {
        N(K, 0);
      };
    function X(_, O) {
      k = N(function() {
        _(t.unstable_now());
      }, O);
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
          var O = 3;
          break;
        default:
          O = v;
      }
      var Z = v;
      v = O;
      try {
        return _();
      } finally {
        v = Z;
      }
    }, t.unstable_requestPaint = function() {
      T = !0;
    }, t.unstable_runWithPriority = function(_, O) {
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
        return O();
      } finally {
        v = Z;
      }
    }, t.unstable_scheduleCallback = function(_, O, Z) {
      var G = t.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? G + Z : G) : Z = G, _) {
        case 1:
          var ae = -1;
          break;
        case 2:
          ae = 250;
          break;
        case 5:
          ae = 1073741823;
          break;
        case 4:
          ae = 1e4;
          break;
        default:
          ae = 5e3;
      }
      return ae = Z + ae, _ = {
        id: y++,
        callback: O,
        priorityLevel: _,
        startTime: Z,
        expirationTime: ae,
        sortIndex: -1
      }, Z > G ? (_.sortIndex = Z, a(g, _), l(p) === null && _ === l(g) && (C ? (j(k), k = -1) : C = !0, X(U, Z - G))) : (_.sortIndex = ae, a(p, _), S || x || (S = !0, H || (H = !0, J()))), _;
    }, t.unstable_shouldYield = le, t.unstable_wrapCallback = function(_) {
      var O = v;
      return function() {
        var Z = v;
        v = O;
        try {
          return _.apply(this, arguments);
        } finally {
          v = Z;
        }
      };
    };
  })(rd)), rd;
}
var N0;
function bw() {
  return N0 || (N0 = 1, ld.exports = vw()), ld.exports;
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
var M0;
function xw() {
  if (M0) return un;
  M0 = 1;
  var t = No();
  function a(p) {
    var g = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        g += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + p + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l() {
  }
  var o = {
    d: {
      f: l,
      r: function() {
        throw Error(a(522));
      },
      D: l,
      C: l,
      L: l,
      m: l,
      X: l,
      S: l,
      M: l
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
var T0;
function Av() {
  if (T0) return od.exports;
  T0 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), od.exports = xw(), od.exports;
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
var C0;
function Sw() {
  if (C0) return eo;
  C0 = 1;
  var t = bw(), a = No(), l = Av();
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
    for (var i = e, r = n; ; ) {
      var c = i.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (r = c.return, r !== null) {
          i = r;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === i) return p(c), e;
          if (d === r) return p(c), n;
          d = d.sibling;
        }
        throw Error(o(188));
      }
      if (i.return !== r.return) i = c, r = d;
      else {
        for (var b = !1, E = c.child; E; ) {
          if (E === i) {
            b = !0, i = c, r = d;
            break;
          }
          if (E === r) {
            b = !0, r = c, i = d;
            break;
          }
          E = E.sibling;
        }
        if (!b) {
          for (E = d.child; E; ) {
            if (E === i) {
              b = !0, i = d, r = c;
              break;
            }
            if (E === r) {
              b = !0, r = d, i = c;
              break;
            }
            E = E.sibling;
          }
          if (!b) throw Error(o(189));
        }
      }
      if (i.alternate !== r) throw Error(o(190));
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
  var m = Object.assign, v = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), T = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), j = Symbol.for("react.consumer"), w = Symbol.for("react.context"), z = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), H = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), Q = Symbol.for("react.activity"), le = Symbol.for("react.memo_cache_sentinel"), K = Symbol.iterator;
  function J(e) {
    return e === null || typeof e != "object" ? null : (e = K && e[K] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var oe = Symbol.for("react.client.reference");
  function L(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === oe ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case N:
        return "Profiler";
      case T:
        return "StrictMode";
      case U:
        return "Suspense";
      case H:
        return "SuspenseList";
      case Q:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case S:
          return "Portal";
        case w:
          return e.displayName || "Context";
        case j:
          return (e._context.displayName || "Context") + ".Consumer";
        case z:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case k:
          return n = e.displayName || null, n !== null ? n : L(e.type) || "Memo";
        case D:
          n = e._payload, e = e._init;
          try {
            return L(e(n));
          } catch {
          }
      }
    return null;
  }
  var X = Array.isArray, _ = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, G = [], ae = -1;
  function A(e) {
    return { current: e };
  }
  function V(e) {
    0 > ae || (e.current = G[ae], G[ae] = null, ae--);
  }
  function I(e, n) {
    ae++, G[ae] = e.current, e.current = n;
  }
  var ne = A(null), se = A(null), me = A(null), ge = A(null);
  function W(e, n) {
    switch (I(me, n), I(se, e), I(ne, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Gp(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Gp(n), e = Xp(n, e);
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
    V(ne), I(ne, e);
  }
  function pe() {
    V(ne), V(se), V(me);
  }
  function ze(e) {
    e.memoizedState !== null && I(ge, e);
    var n = ne.current, i = Xp(n, e.type);
    n !== i && (I(se, e), I(ne, i));
  }
  function Ae(e) {
    se.current === e && (V(ne), V(se)), ge.current === e && (V(ge), Ir._currentValue = Z);
  }
  var we, Se;
  function De(e) {
    if (we === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        we = n && n[1] || "", Se = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + we + e + Se;
  }
  var Ge = !1;
  function nt(e, n) {
    if (!e || Ge) return "";
    Ge = !0;
    var i = Error.prepareStackTrace;
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
      var d = r.DetermineComponentFrameRoot(), b = d[0], E = d[1];
      if (b && E) {
        var Y = b.split(`
`), te = E.split(`
`);
        for (c = r = 0; r < Y.length && !Y[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; c < te.length && !te[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (r === Y.length || c === te.length)
          for (r = Y.length - 1, c = te.length - 1; 1 <= r && 0 <= c && Y[r] !== te[c]; )
            c--;
        for (; 1 <= r && 0 <= c; r--, c--)
          if (Y[r] !== te[c]) {
            if (r !== 1 || c !== 1)
              do
                if (r--, c--, 0 > c || Y[r] !== te[c]) {
                  var ue = `
` + Y[r].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= r && 0 <= c);
            break;
          }
      }
    } finally {
      Ge = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? De(i) : "";
  }
  function lt(e, n) {
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
      var n = "", i = null;
      do
        n += lt(e, i), i = e, e = e.return;
      while (e);
      return n;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var pt = Object.prototype.hasOwnProperty, qt = t.unstable_scheduleCallback, Jt = t.unstable_cancelCallback, Et = t.unstable_shouldYield, Qt = t.unstable_requestPaint, yt = t.unstable_now, _t = t.unstable_getCurrentPriorityLevel, Nt = t.unstable_ImmediatePriority, Pt = t.unstable_UserBlockingPriority, Gt = t.unstable_NormalPriority, Wt = t.unstable_LowPriority, Mt = t.unstable_IdlePriority, ti = t.log, kn = t.unstable_setDisableYieldValue, Nn = null, Xt = null;
  function Tt(e) {
    if (typeof ti == "function" && kn(e), Xt && typeof Xt.setStrictMode == "function")
      try {
        Xt.setStrictMode(Nn, e);
      } catch {
      }
  }
  var zt = Math.clz32 ? Math.clz32 : mn, ni = Math.log, ya = Math.LN2;
  function mn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ni(e) / ya | 0) | 0;
  }
  var ta = 256, Mn = 262144, Yn = 4194304;
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
  function je(e, n, i) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var c = 0, d = e.suspendedLanes, b = e.pingedLanes;
    e = e.warmLanes;
    var E = r & 134217727;
    return E !== 0 ? (r = E & ~d, r !== 0 ? c = on(r) : (b &= E, b !== 0 ? c = on(b) : i || (i = E & ~e, i !== 0 && (c = on(i))))) : (E = r & ~d, E !== 0 ? c = on(E) : b !== 0 ? c = on(b) : i || (i = r & ~e, i !== 0 && (c = on(i)))), c === 0 ? 0 : n !== 0 && n !== c && (n & d) === 0 && (d = c & -c, i = n & -n, d >= i || d === 32 && (i & 4194048) !== 0) ? n : c;
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
    var e = Yn;
    return Yn <<= 1, (Yn & 62914560) === 0 && (Yn = 4194304), e;
  }
  function fn(e) {
    for (var n = [], i = 0; 31 > i; i++) n.push(e);
    return n;
  }
  function rt(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function $t(e, n, i, r, c, d) {
    var b = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var E = e.entanglements, Y = e.expirationTimes, te = e.hiddenUpdates;
    for (i = b & ~i; 0 < i; ) {
      var ue = 31 - zt(i), fe = 1 << ue;
      E[ue] = 0, Y[ue] = -1;
      var ie = te[ue];
      if (ie !== null)
        for (te[ue] = null, ue = 0; ue < ie.length; ue++) {
          var re = ie[ue];
          re !== null && (re.lane &= -536870913);
        }
      i &= ~fe;
    }
    r !== 0 && na(e, r, 0), d !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(b & ~n));
  }
  function na(e, n, i) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var r = 31 - zt(n);
    e.entangledLanes |= n, e.entanglements[r] = e.entanglements[r] | 1073741824 | i & 261930;
  }
  function Kt(e, n) {
    var i = e.entangledLanes |= n;
    for (e = e.entanglements; i; ) {
      var r = 31 - zt(i), c = 1 << r;
      c & n | e[r] & n && (e[r] |= n), i &= ~c;
    }
  }
  function B(e, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : $(i), (i & (e.suspendedLanes | n)) !== 0 ? 0 : i;
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
  function P(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function de() {
    var e = O.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : h0(e.type));
  }
  function he(e, n) {
    var i = O.p;
    try {
      return O.p = e, n();
    } finally {
      O.p = i;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ve = "__reactFiber$" + Ee, xe = "__reactProps$" + Ee, be = "__reactContainer$" + Ee, Me = "__reactEvents$" + Ee, Te = "__reactListeners$" + Ee, Be = "__reactHandles$" + Ee, Oe = "__reactResources$" + Ee, Ve = "__reactMarker$" + Ee;
  function Je(e) {
    delete e[ve], delete e[xe], delete e[Me], delete e[Te], delete e[Be];
  }
  function mt(e) {
    var n = e[ve];
    if (n) return n;
    for (var i = e.parentNode; i; ) {
      if (n = i[be] || i[ve]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (e = Jp(e); e !== null; ) {
            if (i = e[ve]) return i;
            e = Jp(e);
          }
        return n;
      }
      e = i, i = e.parentNode;
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
  function Ie(e) {
    e[Ve] = !0;
  }
  var va = /* @__PURE__ */ new Set(), Tn = {};
  function sn(e, n) {
    en(e, n), en(e + "Capture", n);
  }
  function en(e, n) {
    for (Tn[e] = n, e = 0; e < n.length; e++)
      va.add(n[e]);
  }
  var gn = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ai = {}, pn = {};
  function ii(e) {
    return pt.call(pn, e) ? !0 : pt.call(ai, e) ? !1 : gn.test(e) ? pn[e] = !0 : (ai[e] = !0, !1);
  }
  function aa(e, n, i) {
    if (ii(n))
      if (i === null) e.removeAttribute(n);
      else {
        switch (typeof i) {
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
        e.setAttribute(n, "" + i);
      }
  }
  function ia(e, n, i) {
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
  function He(e, n, i, r) {
    if (r === null) e.removeAttribute(i);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(i);
          return;
      }
      e.setAttributeNS(n, i, "" + r);
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
  function Cn(e, n, i) {
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
          i = "" + b, d.call(this, b);
        }
      }), Object.defineProperty(e, n, {
        enumerable: r.enumerable
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
  function li(e) {
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
    var i = n.getValue(), r = "";
    return e && (r = dn(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== i ? (n.setValue(e), !0) : !1;
  }
  function at(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Vn = /[\n"\\]/g;
  function tn(e) {
    return e.replace(
      Vn,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Bi(e, n, i, r, c, d, b, E) {
    e.name = "", b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? e.type = b : e.removeAttribute("type"), n != null ? b === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + st(n)) : e.value !== "" + st(n) && (e.value = "" + st(n)) : b !== "submit" && b !== "reset" || e.removeAttribute("value"), n != null ? cr(e, b, st(n)) : i != null ? cr(e, b, st(i)) : r != null && e.removeAttribute("value"), c == null && d != null && (e.defaultChecked = !!d), c != null && (e.checked = c && typeof c != "function" && typeof c != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + st(E) : e.removeAttribute("name");
  }
  function dl(e, n, i, r, c, d, b, E) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), n != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        li(e);
        return;
      }
      i = i != null ? "" + st(i) : "", n = n != null ? "" + st(n) : i, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    r = r ?? c, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = E ? e.checked : !!r, e.defaultChecked = !!r, b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" && (e.name = b), li(e);
  }
  function cr(e, n, i) {
    n === "number" && at(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function ri(e, n, i, r) {
    if (e = e.options, n) {
      n = {};
      for (var c = 0; c < i.length; c++)
        n["$" + i[c]] = !0;
      for (i = 0; i < e.length; i++)
        c = n.hasOwnProperty("$" + e[i].value), e[i].selected !== c && (e[i].selected = c), c && r && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + st(i), n = null, c = 0; c < e.length; c++) {
        if (e[c].value === i) {
          e[c].selected = !0, r && (e[c].defaultSelected = !0);
          return;
        }
        n !== null || e[c].disabled || (n = e[c]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function fr(e, n, i) {
    if (n != null && (n = "" + st(n), n !== e.value && (e.value = n), i == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = i != null ? "" + st(i) : "";
  }
  function kh(e, n, i, r) {
    if (n == null) {
      if (r != null) {
        if (i != null) throw Error(o(92));
        if (X(r)) {
          if (1 < r.length) throw Error(o(93));
          r = r[0];
        }
        i = r;
      }
      i == null && (i = ""), n = i;
    }
    i = st(n), e.defaultValue = i, r = e.textContent, r === i && r !== "" && r !== null && (e.value = r), li(e);
  }
  function hl(e, n) {
    if (n) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var sx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Yh(e, n, i) {
    var r = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? r ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : r ? e.setProperty(n, i) : typeof i != "number" || i === 0 || sx.has(n) ? n === "float" ? e.cssFloat = i : e[n] = ("" + i).trim() : e[n] = i + "px";
  }
  function Vh(e, n, i) {
    if (n != null && typeof n != "object")
      throw Error(o(62));
    if (e = e.style, i != null) {
      for (var r in i)
        !i.hasOwnProperty(r) || n != null && n.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var c in n)
        r = n[c], n.hasOwnProperty(c) && i[c] !== r && Yh(e, c, r);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && Yh(e, d, n[d]);
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
  var ux = /* @__PURE__ */ new Map([
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
  ]), cx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Uo(e) {
    return cx.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function za() {
  }
  var Pu = null;
  function Wu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ml = null, gl = null;
  function qh(e) {
    var n = We(e);
    if (n && (e = n.stateNode)) {
      var i = e[xe] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Bi(
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
              'input[name="' + tn(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < i.length; n++) {
              var r = i[n];
              if (r !== e && r.form === e.form) {
                var c = r[xe] || null;
                if (!c) throw Error(o(90));
                Bi(
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
            for (n = 0; n < i.length; n++)
              r = i[n], r.form === e.form && Da(r);
          }
          break e;
        case "textarea":
          fr(e, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && ri(e, !!i.multiple, n, !1);
      }
    }
  }
  var ec = !1;
  function Gh(e, n, i) {
    if (ec) return e(n, i);
    ec = !0;
    try {
      var r = e(n);
      return r;
    } finally {
      if (ec = !1, (ml !== null || gl !== null) && (Ns(), ml && (n = ml, e = gl, gl = ml = null, qh(n), e)))
        for (n = 0; n < e.length; n++) qh(e[n]);
    }
  }
  function dr(e, n) {
    var i = e.stateNode;
    if (i === null) return null;
    var r = i[xe] || null;
    if (r === null) return null;
    i = r[n];
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
    if (i && typeof i != "function")
      throw Error(
        o(231, n, typeof i)
      );
    return i;
  }
  var Oa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), tc = !1;
  if (Oa)
    try {
      var hr = {};
      Object.defineProperty(hr, "passive", {
        get: function() {
          tc = !0;
        }
      }), window.addEventListener("test", hr, hr), window.removeEventListener("test", hr, hr);
    } catch {
      tc = !1;
    }
  var oi = null, nc = null, ko = null;
  function Xh() {
    if (ko) return ko;
    var e, n = nc, i = n.length, r, c = "value" in oi ? oi.value : oi.textContent, d = c.length;
    for (e = 0; e < i && n[e] === c[e]; e++) ;
    var b = i - e;
    for (r = 1; r <= b && n[i - r] === c[d - r]; r++) ;
    return ko = c.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Yo(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Vo() {
    return !0;
  }
  function $h() {
    return !1;
  }
  function yn(e) {
    function n(i, r, c, d, b) {
      this._reactName = i, this._targetInst = c, this.type = r, this.nativeEvent = d, this.target = b, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (i = e[E], this[E] = i ? i(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Vo : $h, this.isPropagationStopped = $h, this;
    }
    return m(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Vo);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Vo);
      },
      persist: function() {
      },
      isPersistent: Vo
    }), n;
  }
  var Ui = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, qo = yn(Ui), mr = m({}, Ui, { view: 0, detail: 0 }), fx = yn(mr), ac, ic, gr, Go = m({}, mr, {
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
      return "movementX" in e ? e.movementX : (e !== gr && (gr && e.type === "mousemove" ? (ac = e.screenX - gr.screenX, ic = e.screenY - gr.screenY) : ic = ac = 0, gr = e), ac);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ic;
    }
  }), Zh = yn(Go), dx = m({}, Go, { dataTransfer: 0 }), hx = yn(dx), mx = m({}, mr, { relatedTarget: 0 }), lc = yn(mx), gx = m({}, Ui, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), px = yn(gx), yx = m({}, Ui, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), vx = yn(yx), bx = m({}, Ui, { data: 0 }), Qh = yn(bx), xx = {
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
  }, Sx = {
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
  }, wx = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Ex(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = wx[e]) ? !!n[e] : !1;
  }
  function rc() {
    return Ex;
  }
  var _x = m({}, mr, {
    key: function(e) {
      if (e.key) {
        var n = xx[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Yo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Sx[e.keyCode] || "Unidentified" : "";
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
      return e.type === "keypress" ? Yo(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Yo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Nx = yn(_x), Mx = m({}, Go, {
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
  }), Kh = yn(Mx), Tx = m({}, mr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: rc
  }), Cx = yn(Tx), Rx = m({}, Ui, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ax = yn(Rx), Dx = m({}, Go, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), zx = yn(Dx), Ox = m({}, Ui, {
    newState: 0,
    oldState: 0
  }), Lx = yn(Ox), jx = [9, 13, 27, 32], oc = Oa && "CompositionEvent" in window, pr = null;
  Oa && "documentMode" in document && (pr = document.documentMode);
  var Hx = Oa && "TextEvent" in window && !pr, Ih = Oa && (!oc || pr && 8 < pr && 11 >= pr), Fh = " ", Jh = !1;
  function Ph(e, n) {
    switch (e) {
      case "keyup":
        return jx.indexOf(n.keyCode) !== -1;
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
  function Wh(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var pl = !1;
  function Bx(e, n) {
    switch (e) {
      case "compositionend":
        return Wh(n);
      case "keypress":
        return n.which !== 32 ? null : (Jh = !0, Fh);
      case "textInput":
        return e = n.data, e === Fh && Jh ? null : e;
      default:
        return null;
    }
  }
  function Ux(e, n) {
    if (pl)
      return e === "compositionend" || !oc && Ph(e, n) ? (e = Xh(), ko = nc = oi = null, pl = !1, e) : null;
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
        return Ih && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var kx = {
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
  function em(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!kx[e.type] : n === "textarea";
  }
  function tm(e, n, i, r) {
    ml ? gl ? gl.push(r) : gl = [r] : ml = r, n = zs(n, "onChange"), 0 < n.length && (i = new qo(
      "onChange",
      "change",
      null,
      i,
      r
    ), e.push({ event: i, listeners: n }));
  }
  var yr = null, vr = null;
  function Yx(e) {
    Bp(e, 0);
  }
  function Xo(e) {
    var n = Ze(e);
    if (Da(n)) return e;
  }
  function nm(e, n) {
    if (e === "change") return n;
  }
  var am = !1;
  if (Oa) {
    var sc;
    if (Oa) {
      var uc = "oninput" in document;
      if (!uc) {
        var im = document.createElement("div");
        im.setAttribute("oninput", "return;"), uc = typeof im.oninput == "function";
      }
      sc = uc;
    } else sc = !1;
    am = sc && (!document.documentMode || 9 < document.documentMode);
  }
  function lm() {
    yr && (yr.detachEvent("onpropertychange", rm), vr = yr = null);
  }
  function rm(e) {
    if (e.propertyName === "value" && Xo(vr)) {
      var n = [];
      tm(
        n,
        vr,
        e,
        Wu(e)
      ), Gh(Yx, n);
    }
  }
  function Vx(e, n, i) {
    e === "focusin" ? (lm(), yr = n, vr = i, yr.attachEvent("onpropertychange", rm)) : e === "focusout" && lm();
  }
  function qx(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Xo(vr);
  }
  function Gx(e, n) {
    if (e === "click") return Xo(n);
  }
  function Xx(e, n) {
    if (e === "input" || e === "change")
      return Xo(n);
  }
  function $x(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Rn = typeof Object.is == "function" ? Object.is : $x;
  function br(e, n) {
    if (Rn(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(e), r = Object.keys(n);
    if (i.length !== r.length) return !1;
    for (r = 0; r < i.length; r++) {
      var c = i[r];
      if (!pt.call(n, c) || !Rn(e[c], n[c]))
        return !1;
    }
    return !0;
  }
  function om(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function sm(e, n) {
    var i = om(e);
    e = 0;
    for (var r; i; ) {
      if (i.nodeType === 3) {
        if (r = e + i.textContent.length, e <= n && r >= n)
          return { node: i, offset: n - e };
        e = r;
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
      i = om(i);
    }
  }
  function um(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? um(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function cm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = at(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = n.contentWindow;
      else break;
      n = at(e.document);
    }
    return n;
  }
  function cc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var Zx = Oa && "documentMode" in document && 11 >= document.documentMode, yl = null, fc = null, xr = null, dc = !1;
  function fm(e, n, i) {
    var r = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    dc || yl == null || yl !== at(r) || (r = yl, "selectionStart" in r && cc(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), xr && br(xr, r) || (xr = r, r = zs(fc, "onSelect"), 0 < r.length && (n = new qo(
      "onSelect",
      "select",
      null,
      n,
      i
    ), e.push({ event: n, listeners: r }), n.target = yl)));
  }
  function ki(e, n) {
    var i = {};
    return i[e.toLowerCase()] = n.toLowerCase(), i["Webkit" + e] = "webkit" + n, i["Moz" + e] = "moz" + n, i;
  }
  var vl = {
    animationend: ki("Animation", "AnimationEnd"),
    animationiteration: ki("Animation", "AnimationIteration"),
    animationstart: ki("Animation", "AnimationStart"),
    transitionrun: ki("Transition", "TransitionRun"),
    transitionstart: ki("Transition", "TransitionStart"),
    transitioncancel: ki("Transition", "TransitionCancel"),
    transitionend: ki("Transition", "TransitionEnd")
  }, hc = {}, dm = {};
  Oa && (dm = document.createElement("div").style, "AnimationEvent" in window || (delete vl.animationend.animation, delete vl.animationiteration.animation, delete vl.animationstart.animation), "TransitionEvent" in window || delete vl.transitionend.transition);
  function Yi(e) {
    if (hc[e]) return hc[e];
    if (!vl[e]) return e;
    var n = vl[e], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in dm)
        return hc[e] = n[i];
    return e;
  }
  var hm = Yi("animationend"), mm = Yi("animationiteration"), gm = Yi("animationstart"), Qx = Yi("transitionrun"), Kx = Yi("transitionstart"), Ix = Yi("transitioncancel"), pm = Yi("transitionend"), ym = /* @__PURE__ */ new Map(), mc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  mc.push("scrollEnd");
  function la(e, n) {
    ym.set(e, n), sn(n, [e]);
  }
  var $o = typeof reportError == "function" ? reportError : function(e) {
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
  }, qn = [], bl = 0, gc = 0;
  function Zo() {
    for (var e = bl, n = gc = bl = 0; n < e; ) {
      var i = qn[n];
      qn[n++] = null;
      var r = qn[n];
      qn[n++] = null;
      var c = qn[n];
      qn[n++] = null;
      var d = qn[n];
      if (qn[n++] = null, r !== null && c !== null) {
        var b = r.pending;
        b === null ? c.next = c : (c.next = b.next, b.next = c), r.pending = c;
      }
      d !== 0 && vm(i, c, d);
    }
  }
  function Qo(e, n, i, r) {
    qn[bl++] = e, qn[bl++] = n, qn[bl++] = i, qn[bl++] = r, gc |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function pc(e, n, i, r) {
    return Qo(e, n, i, r), Ko(e);
  }
  function Vi(e, n) {
    return Qo(e, null, null, n), Ko(e);
  }
  function vm(e, n, i) {
    e.lanes |= i;
    var r = e.alternate;
    r !== null && (r.lanes |= i);
    for (var c = !1, d = e.return; d !== null; )
      d.childLanes |= i, r = d.alternate, r !== null && (r.childLanes |= i), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (c = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, c && n !== null && (c = 31 - zt(i), e = d.hiddenUpdates, r = e[c], r === null ? e[c] = [n] : r.push(n), n.lane = i | 536870912), d) : null;
  }
  function Ko(e) {
    if (50 < qr)
      throw qr = 0, Mf = null, Error(o(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var xl = {};
  function Fx(e, n, i, r) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function An(e, n, i, r) {
    return new Fx(e, n, i, r);
  }
  function yc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function La(e, n) {
    var i = e.alternate;
    return i === null ? (i = An(
      e.tag,
      n,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = n, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, n = e.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function bm(e, n) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, n = i.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Io(e, n, i, r, c, d) {
    var b = 0;
    if (r = e, typeof e == "function") yc(e) && (b = 1);
    else if (typeof e == "string")
      b = tw(
        e,
        i,
        ne.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Q:
          return e = An(31, i, n, c), e.elementType = Q, e.lanes = d, e;
        case C:
          return qi(i.children, c, d, n);
        case T:
          b = 8, c |= 24;
          break;
        case N:
          return e = An(12, i, n, c | 2), e.elementType = N, e.lanes = d, e;
        case U:
          return e = An(13, i, n, c), e.elementType = U, e.lanes = d, e;
        case H:
          return e = An(19, i, n, c), e.elementType = H, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case w:
                b = 10;
                break e;
              case j:
                b = 9;
                break e;
              case z:
                b = 11;
                break e;
              case k:
                b = 14;
                break e;
              case D:
                b = 16, r = null;
                break e;
            }
          b = 29, i = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), r = null;
      }
    return n = An(b, i, n, c), n.elementType = e, n.type = r, n.lanes = d, n;
  }
  function qi(e, n, i, r) {
    return e = An(7, e, r, n), e.lanes = i, e;
  }
  function vc(e, n, i) {
    return e = An(6, e, null, n), e.lanes = i, e;
  }
  function xm(e) {
    var n = An(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function bc(e, n, i) {
    return n = An(
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
  var Sm = /* @__PURE__ */ new WeakMap();
  function Gn(e, n) {
    if (typeof e == "object" && e !== null) {
      var i = Sm.get(e);
      return i !== void 0 ? i : (n = {
        value: e,
        source: n,
        stack: Ft(n)
      }, Sm.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Ft(n)
    };
  }
  var Sl = [], wl = 0, Fo = null, Sr = 0, Xn = [], $n = 0, si = null, ba = 1, xa = "";
  function ja(e, n) {
    Sl[wl++] = Sr, Sl[wl++] = Fo, Fo = e, Sr = n;
  }
  function wm(e, n, i) {
    Xn[$n++] = ba, Xn[$n++] = xa, Xn[$n++] = si, si = e;
    var r = ba;
    e = xa;
    var c = 32 - zt(r) - 1;
    r &= ~(1 << c), i += 1;
    var d = 32 - zt(n) + c;
    if (30 < d) {
      var b = c - c % 5;
      d = (r & (1 << b) - 1).toString(32), r >>= b, c -= b, ba = 1 << 32 - zt(n) + c | i << c | r, xa = d + e;
    } else
      ba = 1 << d | i << c | r, xa = e;
  }
  function xc(e) {
    e.return !== null && (ja(e, 1), wm(e, 1, 0));
  }
  function Sc(e) {
    for (; e === Fo; )
      Fo = Sl[--wl], Sl[wl] = null, Sr = Sl[--wl], Sl[wl] = null;
    for (; e === si; )
      si = Xn[--$n], Xn[$n] = null, xa = Xn[--$n], Xn[$n] = null, ba = Xn[--$n], Xn[$n] = null;
  }
  function Em(e, n) {
    Xn[$n++] = ba, Xn[$n++] = xa, Xn[$n++] = si, ba = n.id, xa = n.overflow, si = e;
  }
  var nn = null, vt = null, Fe = !1, ui = null, Zn = !1, wc = Error(o(519));
  function ci(e) {
    var n = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw wr(Gn(n, e)), wc;
  }
  function _m(e) {
    var n = e.stateNode, i = e.type, r = e.memoizedProps;
    switch (n[ve] = e, n[xe] = r, i) {
      case "dialog":
        $e("cancel", n), $e("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        $e("load", n);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Xr.length; i++)
          $e(Xr[i], n);
        break;
      case "source":
        $e("error", n);
        break;
      case "img":
      case "image":
      case "link":
        $e("error", n), $e("load", n);
        break;
      case "details":
        $e("toggle", n);
        break;
      case "input":
        $e("invalid", n), dl(
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
        $e("invalid", n);
        break;
      case "textarea":
        $e("invalid", n), kh(n, r.value, r.defaultValue, r.children);
    }
    i = r.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || r.suppressHydrationWarning === !0 || Vp(n.textContent, i) ? (r.popover != null && ($e("beforetoggle", n), $e("toggle", n)), r.onScroll != null && $e("scroll", n), r.onScrollEnd != null && $e("scrollend", n), r.onClick != null && (n.onclick = za), n = !0) : n = !1, n || ci(e, !0);
  }
  function Nm(e) {
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
  function El(e) {
    if (e !== nn) return !1;
    if (!Fe) return Nm(e), Fe = !0, !1;
    var n = e.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || Vf(e.type, e.memoizedProps)), i = !i), i && vt && ci(e), Nm(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      vt = Fp(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      vt = Fp(e);
    } else
      n === 27 ? (n = vt, _i(e.type) ? (e = Zf, Zf = null, vt = e) : vt = n) : vt = nn ? Kn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Gi() {
    vt = nn = null, Fe = !1;
  }
  function Ec() {
    var e = ui;
    return e !== null && (Sn === null ? Sn = e : Sn.push.apply(
      Sn,
      e
    ), ui = null), e;
  }
  function wr(e) {
    ui === null ? ui = [e] : ui.push(e);
  }
  var _c = A(null), Xi = null, Ha = null;
  function fi(e, n, i) {
    I(_c, n._currentValue), n._currentValue = i;
  }
  function Ba(e) {
    e._currentValue = _c.current, V(_c);
  }
  function Nc(e, n, i) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, r !== null && (r.childLanes |= n)) : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n), e === i) break;
      e = e.return;
    }
  }
  function Mc(e, n, i, r) {
    var c = e.child;
    for (c !== null && (c.return = e); c !== null; ) {
      var d = c.dependencies;
      if (d !== null) {
        var b = c.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var E = d;
          d = c;
          for (var Y = 0; Y < n.length; Y++)
            if (E.context === n[Y]) {
              d.lanes |= i, E = d.alternate, E !== null && (E.lanes |= i), Nc(
                d.return,
                i,
                e
              ), r || (b = null);
              break e;
            }
          d = E.next;
        }
      } else if (c.tag === 18) {
        if (b = c.return, b === null) throw Error(o(341));
        b.lanes |= i, d = b.alternate, d !== null && (d.lanes |= i), Nc(b, i, e), b = null;
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
  function _l(e, n, i, r) {
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
          var E = c.type;
          Rn(c.pendingProps.value, b.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (c === ge.current) {
        if (b = c.alternate, b === null) throw Error(o(387));
        b.memoizedState.memoizedState !== c.memoizedState.memoizedState && (e !== null ? e.push(Ir) : e = [Ir]);
      }
      c = c.return;
    }
    e !== null && Mc(
      n,
      e,
      i,
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
  function $i(e) {
    Xi = e, Ha = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function an(e) {
    return Mm(Xi, e);
  }
  function Po(e, n) {
    return Xi === null && $i(e), Mm(e, n);
  }
  function Mm(e, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Ha === null) {
      if (e === null) throw Error(o(308));
      Ha = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ha = Ha.next = n;
    return i;
  }
  var Jx = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(i, r) {
        e.push(r);
      }
    };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(i) {
        return i();
      });
    };
  }, Px = t.unstable_scheduleCallback, Wx = t.unstable_NormalPriority, Bt = {
    $$typeof: w,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Tc() {
    return {
      controller: new Jx(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Er(e) {
    e.refCount--, e.refCount === 0 && Px(Wx, function() {
      e.controller.abort();
    });
  }
  var _r = null, Cc = 0, Nl = 0, Ml = null;
  function eS(e, n) {
    if (_r === null) {
      var i = _r = [];
      Cc = 0, Nl = zf(), Ml = {
        status: "pending",
        value: void 0,
        then: function(r) {
          i.push(r);
        }
      };
    }
    return Cc++, n.then(Tm, Tm), n;
  }
  function Tm() {
    if (--Cc === 0 && _r !== null) {
      Ml !== null && (Ml.status = "fulfilled");
      var e = _r;
      _r = null, Nl = 0, Ml = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function tS(e, n) {
    var i = [], r = {
      status: "pending",
      value: null,
      reason: null,
      then: function(c) {
        i.push(c);
      }
    };
    return e.then(
      function() {
        r.status = "fulfilled", r.value = n;
        for (var c = 0; c < i.length; c++) (0, i[c])(n);
      },
      function(c) {
        for (r.status = "rejected", r.reason = c, c = 0; c < i.length; c++)
          (0, i[c])(void 0);
      }
    ), r;
  }
  var Cm = _.S;
  _.S = function(e, n) {
    fp = yt(), typeof n == "object" && n !== null && typeof n.then == "function" && eS(e, n), Cm !== null && Cm(e, n);
  };
  var Zi = A(null);
  function Rc() {
    var e = Zi.current;
    return e !== null ? e : gt.pooledCache;
  }
  function Wo(e, n) {
    n === null ? I(Zi, Zi.current) : I(Zi, n.pool);
  }
  function Rm() {
    var e = Rc();
    return e === null ? null : { parent: Bt._currentValue, pool: e };
  }
  var Tl = Error(o(460)), Ac = Error(o(474)), es = Error(o(542)), ts = { then: function() {
  } };
  function Am(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Dm(e, n, i) {
    switch (i = e[i], i === void 0 ? e.push(n) : i !== n && (n.then(za, za), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, Om(e), e;
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
            throw e = n.reason, Om(e), e;
        }
        throw Ki = n, Tl;
    }
  }
  function Qi(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (Ki = i, Tl) : i;
    }
  }
  var Ki = null;
  function zm() {
    if (Ki === null) throw Error(o(459));
    var e = Ki;
    return Ki = null, e;
  }
  function Om(e) {
    if (e === Tl || e === es)
      throw Error(o(483));
  }
  var Cl = null, Nr = 0;
  function ns(e) {
    var n = Nr;
    return Nr += 1, Cl === null && (Cl = []), Dm(Cl, e, n);
  }
  function Mr(e, n) {
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
  function Lm(e) {
    function n(F, q) {
      if (e) {
        var ee = F.deletions;
        ee === null ? (F.deletions = [q], F.flags |= 16) : ee.push(q);
      }
    }
    function i(F, q) {
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
      return F = La(F, q), F.index = 0, F.sibling = null, F;
    }
    function d(F, q, ee) {
      return F.index = ee, e ? (ee = F.alternate, ee !== null ? (ee = ee.index, ee < q ? (F.flags |= 67108866, q) : ee) : (F.flags |= 67108866, q)) : (F.flags |= 1048576, q);
    }
    function b(F) {
      return e && F.alternate === null && (F.flags |= 67108866), F;
    }
    function E(F, q, ee, ce) {
      return q === null || q.tag !== 6 ? (q = vc(ee, F.mode, ce), q.return = F, q) : (q = c(q, ee), q.return = F, q);
    }
    function Y(F, q, ee, ce) {
      var Re = ee.type;
      return Re === C ? ue(
        F,
        q,
        ee.props.children,
        ce,
        ee.key
      ) : q !== null && (q.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === D && Qi(Re) === q.type) ? (q = c(q, ee.props), Mr(q, ee), q.return = F, q) : (q = Io(
        ee.type,
        ee.key,
        ee.props,
        null,
        F.mode,
        ce
      ), Mr(q, ee), q.return = F, q);
    }
    function te(F, q, ee, ce) {
      return q === null || q.tag !== 4 || q.stateNode.containerInfo !== ee.containerInfo || q.stateNode.implementation !== ee.implementation ? (q = bc(ee, F.mode, ce), q.return = F, q) : (q = c(q, ee.children || []), q.return = F, q);
    }
    function ue(F, q, ee, ce, Re) {
      return q === null || q.tag !== 7 ? (q = qi(
        ee,
        F.mode,
        ce,
        Re
      ), q.return = F, q) : (q = c(q, ee), q.return = F, q);
    }
    function fe(F, q, ee) {
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return q = vc(
          "" + q,
          F.mode,
          ee
        ), q.return = F, q;
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case x:
            return ee = Io(
              q.type,
              q.key,
              q.props,
              null,
              F.mode,
              ee
            ), Mr(ee, q), ee.return = F, ee;
          case S:
            return q = bc(
              q,
              F.mode,
              ee
            ), q.return = F, q;
          case D:
            return q = Qi(q), fe(F, q, ee);
        }
        if (X(q) || J(q))
          return q = qi(
            q,
            F.mode,
            ee,
            null
          ), q.return = F, q;
        if (typeof q.then == "function")
          return fe(F, ns(q), ee);
        if (q.$$typeof === w)
          return fe(
            F,
            Po(F, q),
            ee
          );
        as(F, q);
      }
      return null;
    }
    function ie(F, q, ee, ce) {
      var Re = q !== null ? q.key : null;
      if (typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint")
        return Re !== null ? null : E(F, q, "" + ee, ce);
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case x:
            return ee.key === Re ? Y(F, q, ee, ce) : null;
          case S:
            return ee.key === Re ? te(F, q, ee, ce) : null;
          case D:
            return ee = Qi(ee), ie(F, q, ee, ce);
        }
        if (X(ee) || J(ee))
          return Re !== null ? null : ue(F, q, ee, ce, null);
        if (typeof ee.then == "function")
          return ie(
            F,
            q,
            ns(ee),
            ce
          );
        if (ee.$$typeof === w)
          return ie(
            F,
            q,
            Po(F, ee),
            ce
          );
        as(F, ee);
      }
      return null;
    }
    function re(F, q, ee, ce, Re) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return F = F.get(ee) || null, E(q, F, "" + ce, Re);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case x:
            return F = F.get(
              ce.key === null ? ee : ce.key
            ) || null, Y(q, F, ce, Re);
          case S:
            return F = F.get(
              ce.key === null ? ee : ce.key
            ) || null, te(q, F, ce, Re);
          case D:
            return ce = Qi(ce), re(
              F,
              q,
              ee,
              ce,
              Re
            );
        }
        if (X(ce) || J(ce))
          return F = F.get(ee) || null, ue(q, F, ce, Re, null);
        if (typeof ce.then == "function")
          return re(
            F,
            q,
            ee,
            ns(ce),
            Re
          );
        if (ce.$$typeof === w)
          return re(
            F,
            q,
            ee,
            Po(q, ce),
            Re
          );
        as(q, ce);
      }
      return null;
    }
    function _e(F, q, ee, ce) {
      for (var Re = null, et = null, Ne = q, Ye = q = 0, Ke = null; Ne !== null && Ye < ee.length; Ye++) {
        Ne.index > Ye ? (Ke = Ne, Ne = null) : Ke = Ne.sibling;
        var tt = ie(
          F,
          Ne,
          ee[Ye],
          ce
        );
        if (tt === null) {
          Ne === null && (Ne = Ke);
          break;
        }
        e && Ne && tt.alternate === null && n(F, Ne), q = d(tt, q, Ye), et === null ? Re = tt : et.sibling = tt, et = tt, Ne = Ke;
      }
      if (Ye === ee.length)
        return i(F, Ne), Fe && ja(F, Ye), Re;
      if (Ne === null) {
        for (; Ye < ee.length; Ye++)
          Ne = fe(F, ee[Ye], ce), Ne !== null && (q = d(
            Ne,
            q,
            Ye
          ), et === null ? Re = Ne : et.sibling = Ne, et = Ne);
        return Fe && ja(F, Ye), Re;
      }
      for (Ne = r(Ne); Ye < ee.length; Ye++)
        Ke = re(
          Ne,
          F,
          Ye,
          ee[Ye],
          ce
        ), Ke !== null && (e && Ke.alternate !== null && Ne.delete(
          Ke.key === null ? Ye : Ke.key
        ), q = d(
          Ke,
          q,
          Ye
        ), et === null ? Re = Ke : et.sibling = Ke, et = Ke);
      return e && Ne.forEach(function(Ri) {
        return n(F, Ri);
      }), Fe && ja(F, Ye), Re;
    }
    function Le(F, q, ee, ce) {
      if (ee == null) throw Error(o(151));
      for (var Re = null, et = null, Ne = q, Ye = q = 0, Ke = null, tt = ee.next(); Ne !== null && !tt.done; Ye++, tt = ee.next()) {
        Ne.index > Ye ? (Ke = Ne, Ne = null) : Ke = Ne.sibling;
        var Ri = ie(F, Ne, tt.value, ce);
        if (Ri === null) {
          Ne === null && (Ne = Ke);
          break;
        }
        e && Ne && Ri.alternate === null && n(F, Ne), q = d(Ri, q, Ye), et === null ? Re = Ri : et.sibling = Ri, et = Ri, Ne = Ke;
      }
      if (tt.done)
        return i(F, Ne), Fe && ja(F, Ye), Re;
      if (Ne === null) {
        for (; !tt.done; Ye++, tt = ee.next())
          tt = fe(F, tt.value, ce), tt !== null && (q = d(tt, q, Ye), et === null ? Re = tt : et.sibling = tt, et = tt);
        return Fe && ja(F, Ye), Re;
      }
      for (Ne = r(Ne); !tt.done; Ye++, tt = ee.next())
        tt = re(Ne, F, Ye, tt.value, ce), tt !== null && (e && tt.alternate !== null && Ne.delete(tt.key === null ? Ye : tt.key), q = d(tt, q, Ye), et === null ? Re = tt : et.sibling = tt, et = tt);
      return e && Ne.forEach(function(dw) {
        return n(F, dw);
      }), Fe && ja(F, Ye), Re;
    }
    function ht(F, q, ee, ce) {
      if (typeof ee == "object" && ee !== null && ee.type === C && ee.key === null && (ee = ee.props.children), typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case x:
            e: {
              for (var Re = ee.key; q !== null; ) {
                if (q.key === Re) {
                  if (Re = ee.type, Re === C) {
                    if (q.tag === 7) {
                      i(
                        F,
                        q.sibling
                      ), ce = c(
                        q,
                        ee.props.children
                      ), ce.return = F, F = ce;
                      break e;
                    }
                  } else if (q.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === D && Qi(Re) === q.type) {
                    i(
                      F,
                      q.sibling
                    ), ce = c(q, ee.props), Mr(ce, ee), ce.return = F, F = ce;
                    break e;
                  }
                  i(F, q);
                  break;
                } else n(F, q);
                q = q.sibling;
              }
              ee.type === C ? (ce = qi(
                ee.props.children,
                F.mode,
                ce,
                ee.key
              ), ce.return = F, F = ce) : (ce = Io(
                ee.type,
                ee.key,
                ee.props,
                null,
                F.mode,
                ce
              ), Mr(ce, ee), ce.return = F, F = ce);
            }
            return b(F);
          case S:
            e: {
              for (Re = ee.key; q !== null; ) {
                if (q.key === Re)
                  if (q.tag === 4 && q.stateNode.containerInfo === ee.containerInfo && q.stateNode.implementation === ee.implementation) {
                    i(
                      F,
                      q.sibling
                    ), ce = c(q, ee.children || []), ce.return = F, F = ce;
                    break e;
                  } else {
                    i(F, q);
                    break;
                  }
                else n(F, q);
                q = q.sibling;
              }
              ce = bc(ee, F.mode, ce), ce.return = F, F = ce;
            }
            return b(F);
          case D:
            return ee = Qi(ee), ht(
              F,
              q,
              ee,
              ce
            );
        }
        if (X(ee))
          return _e(
            F,
            q,
            ee,
            ce
          );
        if (J(ee)) {
          if (Re = J(ee), typeof Re != "function") throw Error(o(150));
          return ee = Re.call(ee), Le(
            F,
            q,
            ee,
            ce
          );
        }
        if (typeof ee.then == "function")
          return ht(
            F,
            q,
            ns(ee),
            ce
          );
        if (ee.$$typeof === w)
          return ht(
            F,
            q,
            Po(F, ee),
            ce
          );
        as(F, ee);
      }
      return typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint" ? (ee = "" + ee, q !== null && q.tag === 6 ? (i(F, q.sibling), ce = c(q, ee), ce.return = F, F = ce) : (i(F, q), ce = vc(ee, F.mode, ce), ce.return = F, F = ce), b(F)) : i(F, q);
    }
    return function(F, q, ee, ce) {
      try {
        Nr = 0;
        var Re = ht(
          F,
          q,
          ee,
          ce
        );
        return Cl = null, Re;
      } catch (Ne) {
        if (Ne === Tl || Ne === es) throw Ne;
        var et = An(29, Ne, null, F.mode);
        return et.lanes = ce, et.return = F, et;
      } finally {
      }
    };
  }
  var Ii = Lm(!0), jm = Lm(!1), di = !1;
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
  function hi(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function mi(e, n, i) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (it & 2) !== 0) {
      var c = r.pending;
      return c === null ? n.next = n : (n.next = c.next, c.next = n), r.pending = n, n = Ko(e), vm(e, null, i), n;
    }
    return Qo(e, r, n, i), Ko(e);
  }
  function Tr(e, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var r = n.lanes;
      r &= e.pendingLanes, i |= r, n.lanes = i, Kt(e, i);
    }
  }
  function Oc(e, n) {
    var i = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, i === r)) {
      var c = null, d = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var b = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          d === null ? c = d = b : d = d.next = b, i = i.next;
        } while (i !== null);
        d === null ? c = d = n : d = d.next = n;
      } else c = d = n;
      i = {
        baseState: r.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: d,
        shared: r.shared,
        callbacks: r.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = n : e.next = n, i.lastBaseUpdate = n;
  }
  var Lc = !1;
  function Cr() {
    if (Lc) {
      var e = Ml;
      if (e !== null) throw e;
    }
  }
  function Rr(e, n, i, r) {
    Lc = !1;
    var c = e.updateQueue;
    di = !1;
    var d = c.firstBaseUpdate, b = c.lastBaseUpdate, E = c.shared.pending;
    if (E !== null) {
      c.shared.pending = null;
      var Y = E, te = Y.next;
      Y.next = null, b === null ? d = te : b.next = te, b = Y;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, E = ue.lastBaseUpdate, E !== b && (E === null ? ue.firstBaseUpdate = te : E.next = te, ue.lastBaseUpdate = Y));
    }
    if (d !== null) {
      var fe = c.baseState;
      b = 0, ue = te = Y = null, E = d;
      do {
        var ie = E.lane & -536870913, re = ie !== E.lane;
        if (re ? (Qe & ie) === ie : (r & ie) === ie) {
          ie !== 0 && ie === Nl && (Lc = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var _e = e, Le = E;
            ie = n;
            var ht = i;
            switch (Le.tag) {
              case 1:
                if (_e = Le.payload, typeof _e == "function") {
                  fe = _e.call(ht, fe, ie);
                  break e;
                }
                fe = _e;
                break e;
              case 3:
                _e.flags = _e.flags & -65537 | 128;
              case 0:
                if (_e = Le.payload, ie = typeof _e == "function" ? _e.call(ht, fe, ie) : _e, ie == null) break e;
                fe = m({}, fe, ie);
                break e;
              case 2:
                di = !0;
            }
          }
          ie = E.callback, ie !== null && (e.flags |= 64, re && (e.flags |= 8192), re = c.callbacks, re === null ? c.callbacks = [ie] : re.push(ie));
        } else
          re = {
            lane: ie,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, ue === null ? (te = ue = re, Y = fe) : ue = ue.next = re, b |= ie;
        if (E = E.next, E === null) {
          if (E = c.shared.pending, E === null)
            break;
          re = E, E = re.next, re.next = null, c.lastBaseUpdate = re, c.shared.pending = null;
        }
      } while (!0);
      ue === null && (Y = fe), c.baseState = Y, c.firstBaseUpdate = te, c.lastBaseUpdate = ue, d === null && (c.shared.lanes = 0), bi |= b, e.lanes = b, e.memoizedState = fe;
    }
  }
  function Hm(e, n) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(n);
  }
  function Bm(e, n) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Hm(i[e], n);
  }
  var Rl = A(null), is = A(0);
  function Um(e, n) {
    e = Za, I(is, e), I(Rl, n), Za = e | n.baseLanes;
  }
  function jc() {
    I(is, Za), I(Rl, Rl.current);
  }
  function Hc() {
    Za = is.current, V(Rl), V(is);
  }
  var Dn = A(null), Qn = null;
  function gi(e) {
    var n = e.alternate;
    I(Lt, Lt.current & 1), I(Dn, e), Qn === null && (n === null || Rl.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function Bc(e) {
    I(Lt, Lt.current), I(Dn, e), Qn === null && (Qn = e);
  }
  function km(e) {
    e.tag === 22 ? (I(Lt, Lt.current), I(Dn, e), Qn === null && (Qn = e)) : pi();
  }
  function pi() {
    I(Lt, Lt.current), I(Dn, Dn.current);
  }
  function zn(e) {
    V(Dn), Qn === e && (Qn = null), V(Lt);
  }
  var Lt = A(0);
  function ls(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Xf(i) || $f(i)))
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
  var Ua = 0, ke = null, ft = null, Ut = null, rs = !1, Al = !1, Fi = !1, os = 0, Ar = 0, Dl = null, nS = 0;
  function At() {
    throw Error(o(321));
  }
  function Uc(e, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < e.length; i++)
      if (!Rn(e[i], n[i])) return !1;
    return !0;
  }
  function kc(e, n, i, r, c, d) {
    return Ua = d, ke = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, _.H = e === null || e.memoizedState === null ? wg : ef, Fi = !1, d = i(r, c), Fi = !1, Al && (d = Vm(
      n,
      i,
      r,
      c
    )), Ym(e), d;
  }
  function Ym(e) {
    _.H = Or;
    var n = ft !== null && ft.next !== null;
    if (Ua = 0, Ut = ft = ke = null, rs = !1, Ar = 0, Dl = null, n) throw Error(o(300));
    e === null || kt || (e = e.dependencies, e !== null && Jo(e) && (kt = !0));
  }
  function Vm(e, n, i, r) {
    ke = e;
    var c = 0;
    do {
      if (Al && (Dl = null), Ar = 0, Al = !1, 25 <= c) throw Error(o(301));
      if (c += 1, Ut = ft = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      _.H = Eg, d = n(i, r);
    } while (Al);
    return d;
  }
  function aS() {
    var e = _.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Dr(n) : n, e = e.useState()[0], (ft !== null ? ft.memoizedState : null) !== e && (ke.flags |= 1024), n;
  }
  function Yc() {
    var e = os !== 0;
    return os = 0, e;
  }
  function Vc(e, n, i) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~i;
  }
  function qc(e) {
    if (rs) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      rs = !1;
    }
    Ua = 0, Ut = ft = ke = null, Al = !1, Ar = os = 0, Dl = null;
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
  function jt() {
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
  function Dr(e) {
    var n = Ar;
    return Ar += 1, Dl === null && (Dl = []), e = Dm(Dl, e, n), n = ke, (Ut === null ? n.memoizedState : Ut.next) === null && (n = n.alternate, _.H = n === null || n.memoizedState === null ? wg : ef), e;
  }
  function us(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Dr(e);
      if (e.$$typeof === w) return an(e);
    }
    throw Error(o(438, String(e)));
  }
  function Gc(e) {
    var n = null, i = ke.updateQueue;
    if (i !== null && (n = i.memoCache), n == null) {
      var r = ke.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (n = {
        data: r.data.map(function(c) {
          return c.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = ss(), ke.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(e), r = 0; r < e; r++)
        i[r] = le;
    return n.index++, i;
  }
  function ka(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function cs(e) {
    var n = jt();
    return Xc(n, ft, e);
  }
  function Xc(e, n, i) {
    var r = e.queue;
    if (r === null) throw Error(o(311));
    r.lastRenderedReducer = i;
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
      var E = b = null, Y = null, te = n, ue = !1;
      do {
        var fe = te.lane & -536870913;
        if (fe !== te.lane ? (Qe & fe) === fe : (Ua & fe) === fe) {
          var ie = te.revertLane;
          if (ie === 0)
            Y !== null && (Y = Y.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: te.action,
              hasEagerState: te.hasEagerState,
              eagerState: te.eagerState,
              next: null
            }), fe === Nl && (ue = !0);
          else if ((Ua & ie) === ie) {
            te = te.next, ie === Nl && (ue = !0);
            continue;
          } else
            fe = {
              lane: 0,
              revertLane: te.revertLane,
              gesture: null,
              action: te.action,
              hasEagerState: te.hasEagerState,
              eagerState: te.eagerState,
              next: null
            }, Y === null ? (E = Y = fe, b = d) : Y = Y.next = fe, ke.lanes |= ie, bi |= ie;
          fe = te.action, Fi && i(d, fe), d = te.hasEagerState ? te.eagerState : i(d, fe);
        } else
          ie = {
            lane: fe,
            revertLane: te.revertLane,
            gesture: te.gesture,
            action: te.action,
            hasEagerState: te.hasEagerState,
            eagerState: te.eagerState,
            next: null
          }, Y === null ? (E = Y = ie, b = d) : Y = Y.next = ie, ke.lanes |= fe, bi |= fe;
        te = te.next;
      } while (te !== null && te !== n);
      if (Y === null ? b = d : Y.next = E, !Rn(d, e.memoizedState) && (kt = !0, ue && (i = Ml, i !== null)))
        throw i;
      e.memoizedState = d, e.baseState = b, e.baseQueue = Y, r.lastRenderedState = d;
    }
    return c === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function $c(e) {
    var n = jt(), i = n.queue;
    if (i === null) throw Error(o(311));
    i.lastRenderedReducer = e;
    var r = i.dispatch, c = i.pending, d = n.memoizedState;
    if (c !== null) {
      i.pending = null;
      var b = c = c.next;
      do
        d = e(d, b.action), b = b.next;
      while (b !== c);
      Rn(d, n.memoizedState) || (kt = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), i.lastRenderedState = d;
    }
    return [d, r];
  }
  function qm(e, n, i) {
    var r = ke, c = jt(), d = Fe;
    if (d) {
      if (i === void 0) throw Error(o(407));
      i = i();
    } else i = n();
    var b = !Rn(
      (ft || c).memoizedState,
      i
    );
    if (b && (c.memoizedState = i, kt = !0), c = c.queue, Kc($m.bind(null, r, c, e), [
      e
    ]), c.getSnapshot !== n || b || Ut !== null && Ut.memoizedState.tag & 1) {
      if (r.flags |= 2048, zl(
        9,
        { destroy: void 0 },
        Xm.bind(
          null,
          r,
          c,
          i,
          n
        ),
        null
      ), gt === null) throw Error(o(349));
      d || (Ua & 127) !== 0 || Gm(r, n, i);
    }
    return i;
  }
  function Gm(e, n, i) {
    e.flags |= 16384, e = { getSnapshot: n, value: i }, n = ke.updateQueue, n === null ? (n = ss(), ke.updateQueue = n, n.stores = [e]) : (i = n.stores, i === null ? n.stores = [e] : i.push(e));
  }
  function Xm(e, n, i, r) {
    n.value = i, n.getSnapshot = r, Zm(n) && Qm(e);
  }
  function $m(e, n, i) {
    return i(function() {
      Zm(n) && Qm(e);
    });
  }
  function Zm(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var i = n();
      return !Rn(e, i);
    } catch {
      return !0;
    }
  }
  function Qm(e) {
    var n = Vi(e, 2);
    n !== null && wn(n, e, 2);
  }
  function Zc(e) {
    var n = hn();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), Fi) {
        Tt(!0);
        try {
          i();
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
  function Km(e, n, i, r) {
    return e.baseState = i, Xc(
      e,
      ft,
      typeof r == "function" ? r : ka
    );
  }
  function iS(e, n, i, r, c) {
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
      _.T !== null ? i(!0) : d.isTransition = !1, r(d), i = n.pending, i === null ? (d.next = n.pending = d, Im(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function Im(e, n) {
    var i = n.action, r = n.payload, c = e.state;
    if (n.isTransition) {
      var d = _.T, b = {};
      _.T = b;
      try {
        var E = i(c, r), Y = _.S;
        Y !== null && Y(b, E), Fm(e, n, E);
      } catch (te) {
        Qc(e, n, te);
      } finally {
        d !== null && b.types !== null && (d.types = b.types), _.T = d;
      }
    } else
      try {
        d = i(c, r), Fm(e, n, d);
      } catch (te) {
        Qc(e, n, te);
      }
  }
  function Fm(e, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(r) {
        Jm(e, n, r);
      },
      function(r) {
        return Qc(e, n, r);
      }
    ) : Jm(e, n, i);
  }
  function Jm(e, n, i) {
    n.status = "fulfilled", n.value = i, Pm(n), e.state = i, n = e.pending, n !== null && (i = n.next, i === n ? e.pending = null : (i = i.next, n.next = i, Im(e, i)));
  }
  function Qc(e, n, i) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        n.status = "rejected", n.reason = i, Pm(n), n = n.next;
      while (n !== r);
    }
    e.action = null;
  }
  function Pm(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Wm(e, n) {
    return n;
  }
  function eg(e, n) {
    if (Fe) {
      var i = gt.formState;
      if (i !== null) {
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
                  if (c = Kn(
                    c.nextSibling
                  ), c === null) {
                    c = null;
                    break t;
                  }
                }
                d = c.data, c = d === "F!" || d === "F" ? c : null;
              }
              if (c) {
                vt = Kn(
                  c.nextSibling
                ), r = c.data === "F!";
                break e;
              }
            }
            ci(r);
          }
          r = !1;
        }
        r && (n = i[0]);
      }
    }
    return i = hn(), i.memoizedState = i.baseState = n, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Wm,
      lastRenderedState: n
    }, i.queue = r, i = bg.bind(
      null,
      ke,
      r
    ), r.dispatch = i, r = Zc(!1), d = Wc.bind(
      null,
      ke,
      !1,
      r.queue
    ), r = hn(), c = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = c, i = iS.bind(
      null,
      ke,
      c,
      d,
      i
    ), c.dispatch = i, r.memoizedState = e, [n, i, !1];
  }
  function tg(e) {
    var n = jt();
    return ng(n, ft, e);
  }
  function ng(e, n, i) {
    if (n = Xc(
      e,
      n,
      Wm
    )[0], e = cs(ka)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var r = Dr(n);
      } catch (b) {
        throw b === Tl ? es : b;
      }
    else r = n;
    n = jt();
    var c = n.queue, d = c.dispatch;
    return i !== n.memoizedState && (ke.flags |= 2048, zl(
      9,
      { destroy: void 0 },
      lS.bind(null, c, i),
      null
    )), [r, d, e];
  }
  function lS(e, n) {
    e.action = n;
  }
  function ag(e) {
    var n = jt(), i = ft;
    if (i !== null)
      return ng(n, i, e);
    jt(), n = n.memoizedState, i = jt();
    var r = i.queue.dispatch;
    return i.memoizedState = e, [n, r, !1];
  }
  function zl(e, n, i, r) {
    return e = { tag: e, create: i, deps: r, inst: n, next: null }, n = ke.updateQueue, n === null && (n = ss(), ke.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = e.next = e : (r = i.next, i.next = e, e.next = r, n.lastEffect = e), e;
  }
  function ig() {
    return jt().memoizedState;
  }
  function fs(e, n, i, r) {
    var c = hn();
    ke.flags |= e, c.memoizedState = zl(
      1 | n,
      { destroy: void 0 },
      i,
      r === void 0 ? null : r
    );
  }
  function ds(e, n, i, r) {
    var c = jt();
    r = r === void 0 ? null : r;
    var d = c.memoizedState.inst;
    ft !== null && r !== null && Uc(r, ft.memoizedState.deps) ? c.memoizedState = zl(n, d, i, r) : (ke.flags |= e, c.memoizedState = zl(
      1 | n,
      d,
      i,
      r
    ));
  }
  function lg(e, n) {
    fs(8390656, 8, e, n);
  }
  function Kc(e, n) {
    ds(2048, 8, e, n);
  }
  function rS(e) {
    ke.flags |= 4;
    var n = ke.updateQueue;
    if (n === null)
      n = ss(), ke.updateQueue = n, n.events = [e];
    else {
      var i = n.events;
      i === null ? n.events = [e] : i.push(e);
    }
  }
  function rg(e) {
    var n = jt().memoizedState;
    return rS({ ref: n, nextImpl: e }), function() {
      if ((it & 2) !== 0) throw Error(o(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function og(e, n) {
    return ds(4, 2, e, n);
  }
  function sg(e, n) {
    return ds(4, 4, e, n);
  }
  function ug(e, n) {
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
  function cg(e, n, i) {
    i = i != null ? i.concat([e]) : null, ds(4, 4, ug.bind(null, n, e), i);
  }
  function Ic() {
  }
  function fg(e, n) {
    var i = jt();
    n = n === void 0 ? null : n;
    var r = i.memoizedState;
    return n !== null && Uc(n, r[1]) ? r[0] : (i.memoizedState = [e, n], e);
  }
  function dg(e, n) {
    var i = jt();
    n = n === void 0 ? null : n;
    var r = i.memoizedState;
    if (n !== null && Uc(n, r[1]))
      return r[0];
    if (r = e(), Fi) {
      Tt(!0);
      try {
        e();
      } finally {
        Tt(!1);
      }
    }
    return i.memoizedState = [r, n], r;
  }
  function Fc(e, n, i) {
    return i === void 0 || (Ua & 1073741824) !== 0 && (Qe & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = i, e = hp(), ke.lanes |= e, bi |= e, i);
  }
  function hg(e, n, i, r) {
    return Rn(i, n) ? i : Rl.current !== null ? (e = Fc(e, i, r), Rn(e, n) || (kt = !0), e) : (Ua & 42) === 0 || (Ua & 1073741824) !== 0 && (Qe & 261930) === 0 ? (kt = !0, e.memoizedState = i) : (e = hp(), ke.lanes |= e, bi |= e, n);
  }
  function mg(e, n, i, r, c) {
    var d = O.p;
    O.p = d !== 0 && 8 > d ? d : 8;
    var b = _.T, E = {};
    _.T = E, Wc(e, !1, n, i);
    try {
      var Y = c(), te = _.S;
      if (te !== null && te(E, Y), Y !== null && typeof Y == "object" && typeof Y.then == "function") {
        var ue = tS(
          Y,
          r
        );
        zr(
          e,
          n,
          ue,
          jn(e)
        );
      } else
        zr(
          e,
          n,
          r,
          jn(e)
        );
    } catch (fe) {
      zr(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        jn()
      );
    } finally {
      O.p = d, b !== null && E.types !== null && (b.types = E.types), _.T = b;
    }
  }
  function oS() {
  }
  function Jc(e, n, i, r) {
    if (e.tag !== 5) throw Error(o(476));
    var c = gg(e).queue;
    mg(
      e,
      c,
      n,
      Z,
      i === null ? oS : function() {
        return pg(e), i(r);
      }
    );
  }
  function gg(e) {
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
        lastRenderedReducer: ka,
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
        lastRenderedReducer: ka,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function pg(e) {
    var n = gg(e);
    n.next === null && (n = e.alternate.memoizedState), zr(
      e,
      n.next.queue,
      {},
      jn()
    );
  }
  function Pc() {
    return an(Ir);
  }
  function yg() {
    return jt().memoizedState;
  }
  function vg() {
    return jt().memoizedState;
  }
  function sS(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = jn();
          e = hi(i);
          var r = mi(n, e, i);
          r !== null && (wn(r, n, i), Tr(r, n, i)), n = { cache: Tc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function uS(e, n, i) {
    var r = jn();
    i = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, hs(e) ? xg(n, i) : (i = pc(e, n, i, r), i !== null && (wn(i, e, r), Sg(i, n, r)));
  }
  function bg(e, n, i) {
    var r = jn();
    zr(e, n, i, r);
  }
  function zr(e, n, i, r) {
    var c = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (hs(e)) xg(n, c);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var b = n.lastRenderedState, E = d(b, i);
          if (c.hasEagerState = !0, c.eagerState = E, Rn(E, b))
            return Qo(e, n, c, 0), gt === null && Zo(), !1;
        } catch {
        } finally {
        }
      if (i = pc(e, n, c, r), i !== null)
        return wn(i, e, r), Sg(i, n, r), !0;
    }
    return !1;
  }
  function Wc(e, n, i, r) {
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
        i,
        r,
        2
      ), n !== null && wn(n, e, 2);
  }
  function hs(e) {
    var n = e.alternate;
    return e === ke || n !== null && n === ke;
  }
  function xg(e, n) {
    Al = rs = !0;
    var i = e.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), e.pending = n;
  }
  function Sg(e, n, i) {
    if ((i & 4194048) !== 0) {
      var r = n.lanes;
      r &= e.pendingLanes, i |= r, n.lanes = i, Kt(e, i);
    }
  }
  var Or = {
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
  Or.useEffectEvent = At;
  var wg = {
    readContext: an,
    use: us,
    useCallback: function(e, n) {
      return hn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: an,
    useEffect: lg,
    useImperativeHandle: function(e, n, i) {
      i = i != null ? i.concat([e]) : null, fs(
        4194308,
        4,
        ug.bind(null, n, e),
        i
      );
    },
    useLayoutEffect: function(e, n) {
      return fs(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      fs(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var i = hn();
      n = n === void 0 ? null : n;
      var r = e();
      if (Fi) {
        Tt(!0);
        try {
          e();
        } finally {
          Tt(!1);
        }
      }
      return i.memoizedState = [r, n], r;
    },
    useReducer: function(e, n, i) {
      var r = hn();
      if (i !== void 0) {
        var c = i(n);
        if (Fi) {
          Tt(!0);
          try {
            i(n);
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
      }, r.queue = e, e = e.dispatch = uS.bind(
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
      var n = e.queue, i = bg.bind(null, ke, n);
      return n.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Ic,
    useDeferredValue: function(e, n) {
      var i = hn();
      return Fc(i, e, n);
    },
    useTransition: function() {
      var e = Zc(!1);
      return e = mg.bind(
        null,
        ke,
        e.queue,
        !0,
        !1
      ), hn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, i) {
      var r = ke, c = hn();
      if (Fe) {
        if (i === void 0)
          throw Error(o(407));
        i = i();
      } else {
        if (i = n(), gt === null)
          throw Error(o(349));
        (Qe & 127) !== 0 || Gm(r, n, i);
      }
      c.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return c.queue = d, lg($m.bind(null, r, d, e), [
        e
      ]), r.flags |= 2048, zl(
        9,
        { destroy: void 0 },
        Xm.bind(
          null,
          r,
          d,
          i,
          n
        ),
        null
      ), i;
    },
    useId: function() {
      var e = hn(), n = gt.identifierPrefix;
      if (Fe) {
        var i = xa, r = ba;
        i = (r & ~(1 << 32 - zt(r) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = os++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = nS++, n = "_" + n + "r_" + i.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Pc,
    useFormState: eg,
    useActionState: eg,
    useOptimistic: function(e) {
      var n = hn();
      n.memoizedState = n.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = Wc.bind(
        null,
        ke,
        !0,
        i
      ), i.dispatch = n, [e, n];
    },
    useMemoCache: Gc,
    useCacheRefresh: function() {
      return hn().memoizedState = sS.bind(
        null,
        ke
      );
    },
    useEffectEvent: function(e) {
      var n = hn(), i = { impl: e };
      return n.memoizedState = i, function() {
        if ((it & 2) !== 0)
          throw Error(o(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, ef = {
    readContext: an,
    use: us,
    useCallback: fg,
    useContext: an,
    useEffect: Kc,
    useImperativeHandle: cg,
    useInsertionEffect: og,
    useLayoutEffect: sg,
    useMemo: dg,
    useReducer: cs,
    useRef: ig,
    useState: function() {
      return cs(ka);
    },
    useDebugValue: Ic,
    useDeferredValue: function(e, n) {
      var i = jt();
      return hg(
        i,
        ft.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = cs(ka)[0], n = jt().memoizedState;
      return [
        typeof e == "boolean" ? e : Dr(e),
        n
      ];
    },
    useSyncExternalStore: qm,
    useId: yg,
    useHostTransitionStatus: Pc,
    useFormState: tg,
    useActionState: tg,
    useOptimistic: function(e, n) {
      var i = jt();
      return Km(i, ft, e, n);
    },
    useMemoCache: Gc,
    useCacheRefresh: vg
  };
  ef.useEffectEvent = rg;
  var Eg = {
    readContext: an,
    use: us,
    useCallback: fg,
    useContext: an,
    useEffect: Kc,
    useImperativeHandle: cg,
    useInsertionEffect: og,
    useLayoutEffect: sg,
    useMemo: dg,
    useReducer: $c,
    useRef: ig,
    useState: function() {
      return $c(ka);
    },
    useDebugValue: Ic,
    useDeferredValue: function(e, n) {
      var i = jt();
      return ft === null ? Fc(i, e, n) : hg(
        i,
        ft.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = $c(ka)[0], n = jt().memoizedState;
      return [
        typeof e == "boolean" ? e : Dr(e),
        n
      ];
    },
    useSyncExternalStore: qm,
    useId: yg,
    useHostTransitionStatus: Pc,
    useFormState: ag,
    useActionState: ag,
    useOptimistic: function(e, n) {
      var i = jt();
      return ft !== null ? Km(i, ft, e, n) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Gc,
    useCacheRefresh: vg
  };
  Eg.useEffectEvent = rg;
  function tf(e, n, i, r) {
    n = e.memoizedState, i = i(r, n), i = i == null ? n : m({}, n, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var nf = {
    enqueueSetState: function(e, n, i) {
      e = e._reactInternals;
      var r = jn(), c = hi(r);
      c.payload = n, i != null && (c.callback = i), n = mi(e, c, r), n !== null && (wn(n, e, r), Tr(n, e, r));
    },
    enqueueReplaceState: function(e, n, i) {
      e = e._reactInternals;
      var r = jn(), c = hi(r);
      c.tag = 1, c.payload = n, i != null && (c.callback = i), n = mi(e, c, r), n !== null && (wn(n, e, r), Tr(n, e, r));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var i = jn(), r = hi(i);
      r.tag = 2, n != null && (r.callback = n), n = mi(e, r, i), n !== null && (wn(n, e, i), Tr(n, e, i));
    }
  };
  function _g(e, n, i, r, c, d, b) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, d, b) : n.prototype && n.prototype.isPureReactComponent ? !br(i, r) || !br(c, d) : !0;
  }
  function Ng(e, n, i, r) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, r), n.state !== e && nf.enqueueReplaceState(n, n.state, null);
  }
  function Ji(e, n) {
    var i = n;
    if ("ref" in n) {
      i = {};
      for (var r in n)
        r !== "ref" && (i[r] = n[r]);
    }
    if (e = e.defaultProps) {
      i === n && (i = m({}, i));
      for (var c in e)
        i[c] === void 0 && (i[c] = e[c]);
    }
    return i;
  }
  function Mg(e) {
    $o(e);
  }
  function Tg(e) {
    console.error(e);
  }
  function Cg(e) {
    $o(e);
  }
  function ms(e, n) {
    try {
      var i = e.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Rg(e, n, i) {
    try {
      var r = e.onCaughtError;
      r(i.value, {
        componentStack: i.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function af(e, n, i) {
    return i = hi(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      ms(e, n);
    }, i;
  }
  function Ag(e) {
    return e = hi(e), e.tag = 3, e;
  }
  function Dg(e, n, i, r) {
    var c = i.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var d = r.value;
      e.payload = function() {
        return c(d);
      }, e.callback = function() {
        Rg(n, i, r);
      };
    }
    var b = i.stateNode;
    b !== null && typeof b.componentDidCatch == "function" && (e.callback = function() {
      Rg(n, i, r), typeof c != "function" && (xi === null ? xi = /* @__PURE__ */ new Set([this]) : xi.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function cS(e, n, i, r, c) {
    if (i.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (n = i.alternate, n !== null && _l(
        n,
        i,
        c,
        !0
      ), i = Dn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return Qn === null ? Ms() : i.alternate === null && Dt === 0 && (Dt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = c, r === ts ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([r]) : n.add(r), Rf(e, r, c)), !1;
          case 22:
            return i.flags |= 65536, r === ts ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([r]) : i.add(r)), Rf(e, r, c)), !1;
        }
        throw Error(o(435, i.tag));
      }
      return Rf(e, r, c), Ms(), !1;
    }
    if (Fe)
      return n = Dn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = c, r !== wc && (e = Error(o(422), { cause: r }), wr(Gn(e, i)))) : (r !== wc && (n = Error(o(423), {
        cause: r
      }), wr(
        Gn(n, i)
      )), e = e.current.alternate, e.flags |= 65536, c &= -c, e.lanes |= c, r = Gn(r, i), c = af(
        e.stateNode,
        r,
        c
      ), Oc(e, c), Dt !== 4 && (Dt = 2)), !1;
    var d = Error(o(520), { cause: r });
    if (d = Gn(d, i), Vr === null ? Vr = [d] : Vr.push(d), Dt !== 4 && (Dt = 2), n === null) return !0;
    r = Gn(r, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = c & -c, i.lanes |= e, e = af(i.stateNode, r, e), Oc(i, e), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (xi === null || !xi.has(d))))
            return i.flags |= 65536, c &= -c, i.lanes |= c, c = Ag(c), Dg(
              c,
              e,
              i,
              r
            ), Oc(i, c), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var lf = Error(o(461)), kt = !1;
  function ln(e, n, i, r) {
    n.child = e === null ? jm(n, null, i, r) : Ii(
      n,
      e.child,
      i,
      r
    );
  }
  function zg(e, n, i, r, c) {
    i = i.render;
    var d = n.ref;
    if ("ref" in r) {
      var b = {};
      for (var E in r)
        E !== "ref" && (b[E] = r[E]);
    } else b = r;
    return $i(n), r = kc(
      e,
      n,
      i,
      b,
      d,
      c
    ), E = Yc(), e !== null && !kt ? (Vc(e, n, c), Ya(e, n, c)) : (Fe && E && xc(n), n.flags |= 1, ln(e, n, r, c), n.child);
  }
  function Og(e, n, i, r, c) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" && !yc(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, Lg(
        e,
        n,
        d,
        r,
        c
      )) : (e = Io(
        i.type,
        null,
        r,
        n,
        n.mode,
        c
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (d = e.child, !hf(e, c)) {
      var b = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : br, i(b, r) && e.ref === n.ref)
        return Ya(e, n, c);
    }
    return n.flags |= 1, e = La(d, r), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Lg(e, n, i, r, c) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (br(d, r) && e.ref === n.ref)
        if (kt = !1, n.pendingProps = r = d, hf(e, c))
          (e.flags & 131072) !== 0 && (kt = !0);
        else
          return n.lanes = e.lanes, Ya(e, n, c);
    }
    return rf(
      e,
      n,
      i,
      r,
      c
    );
  }
  function jg(e, n, i, r) {
    var c = r.children, d = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), r.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (d = d !== null ? d.baseLanes | i : i, e !== null) {
          for (r = n.child = e.child, c = 0; r !== null; )
            c = c | r.lanes | r.childLanes, r = r.sibling;
          r = c & ~d;
        } else r = 0, n.child = null;
        return Hg(
          e,
          n,
          d,
          i,
          r
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Wo(
          n,
          d !== null ? d.cachePool : null
        ), d !== null ? Um(n, d) : jc(), km(n);
      else
        return r = n.lanes = 536870912, Hg(
          e,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          r
        );
    } else
      d !== null ? (Wo(n, d.cachePool), Um(n, d), pi(), n.memoizedState = null) : (e !== null && Wo(n, null), jc(), pi());
    return ln(e, n, c, i), n.child;
  }
  function Lr(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Hg(e, n, i, r, c) {
    var d = Rc();
    return d = d === null ? null : { parent: Bt._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, e !== null && Wo(n, null), jc(), km(n), e !== null && _l(e, n, r, !0), n.childLanes = c, null;
  }
  function gs(e, n) {
    return n = ys(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Bg(e, n, i) {
    return Ii(n, e.child, null, i), e = gs(n, n.pendingProps), e.flags |= 2, zn(n), n.memoizedState = null, e;
  }
  function fS(e, n, i) {
    var r = n.pendingProps, c = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Fe) {
        if (r.mode === "hidden")
          return e = gs(n, r), n.lanes = 536870912, Lr(null, e);
        if (Bc(n), (e = vt) ? (e = Ip(
          e,
          Zn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: si !== null ? { id: ba, overflow: xa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = xm(e), i.return = n, n.child = i, nn = n, vt = null)) : e = null, e === null) throw ci(n);
        return n.lanes = 536870912, null;
      }
      return gs(n, r);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var b = d.dehydrated;
      if (Bc(n), c)
        if (n.flags & 256)
          n.flags &= -257, n = Bg(
            e,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(o(558));
      else if (kt || _l(e, n, i, !1), c = (i & e.childLanes) !== 0, kt || c) {
        if (r = gt, r !== null && (b = B(r, i), b !== 0 && b !== d.retryLane))
          throw d.retryLane = b, Vi(e, b), wn(r, e, b), lf;
        Ms(), n = Bg(
          e,
          n,
          i
        );
      } else
        e = d.treeContext, vt = Kn(b.nextSibling), nn = n, Fe = !0, ui = null, Zn = !1, e !== null && Em(n, e), n = gs(n, r), n.flags |= 4096;
      return n;
    }
    return e = La(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function ps(e, n) {
    var i = n.ref;
    if (i === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(o(284));
      (e === null || e.ref !== i) && (n.flags |= 4194816);
    }
  }
  function rf(e, n, i, r, c) {
    return $i(n), i = kc(
      e,
      n,
      i,
      r,
      void 0,
      c
    ), r = Yc(), e !== null && !kt ? (Vc(e, n, c), Ya(e, n, c)) : (Fe && r && xc(n), n.flags |= 1, ln(e, n, i, c), n.child);
  }
  function Ug(e, n, i, r, c, d) {
    return $i(n), n.updateQueue = null, i = Vm(
      n,
      r,
      i,
      c
    ), Ym(e), r = Yc(), e !== null && !kt ? (Vc(e, n, d), Ya(e, n, d)) : (Fe && r && xc(n), n.flags |= 1, ln(e, n, i, d), n.child);
  }
  function kg(e, n, i, r, c) {
    if ($i(n), n.stateNode === null) {
      var d = xl, b = i.contextType;
      typeof b == "object" && b !== null && (d = an(b)), d = new i(r, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = nf, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = r, d.state = n.memoizedState, d.refs = {}, Dc(n), b = i.contextType, d.context = typeof b == "object" && b !== null ? an(b) : xl, d.state = n.memoizedState, b = i.getDerivedStateFromProps, typeof b == "function" && (tf(
        n,
        i,
        b,
        r
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (b = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), b !== d.state && nf.enqueueReplaceState(d, d.state, null), Rr(n, r, d, c), Cr(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), r = !0;
    } else if (e === null) {
      d = n.stateNode;
      var E = n.memoizedProps, Y = Ji(i, E);
      d.props = Y;
      var te = d.context, ue = i.contextType;
      b = xl, typeof ue == "object" && ue !== null && (b = an(ue));
      var fe = i.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof d.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, ue || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (E || te !== b) && Ng(
        n,
        d,
        r,
        b
      ), di = !1;
      var ie = n.memoizedState;
      d.state = ie, Rr(n, r, d, c), Cr(), te = n.memoizedState, E || ie !== te || di ? (typeof fe == "function" && (tf(
        n,
        i,
        fe,
        r
      ), te = n.memoizedState), (Y = di || _g(
        n,
        i,
        Y,
        r,
        ie,
        te,
        b
      )) ? (ue || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = te), d.props = r, d.state = te, d.context = b, r = Y) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), r = !1);
    } else {
      d = n.stateNode, zc(e, n), b = n.memoizedProps, ue = Ji(i, b), d.props = ue, fe = n.pendingProps, ie = d.context, te = i.contextType, Y = xl, typeof te == "object" && te !== null && (Y = an(te)), E = i.getDerivedStateFromProps, (te = typeof E == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (b !== fe || ie !== Y) && Ng(
        n,
        d,
        r,
        Y
      ), di = !1, ie = n.memoizedState, d.state = ie, Rr(n, r, d, c), Cr();
      var re = n.memoizedState;
      b !== fe || ie !== re || di || e !== null && e.dependencies !== null && Jo(e.dependencies) ? (typeof E == "function" && (tf(
        n,
        i,
        E,
        r
      ), re = n.memoizedState), (ue = di || _g(
        n,
        i,
        ue,
        r,
        ie,
        re,
        Y
      ) || e !== null && e.dependencies !== null && Jo(e.dependencies)) ? (te || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(r, re, Y), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        r,
        re,
        Y
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = re), d.props = r, d.state = re, d.context = Y, r = ue) : (typeof d.componentDidUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), r = !1);
    }
    return d = r, ps(e, n), r = (n.flags & 128) !== 0, d || r ? (d = n.stateNode, i = r && typeof i.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, e !== null && r ? (n.child = Ii(
      n,
      e.child,
      null,
      c
    ), n.child = Ii(
      n,
      null,
      i,
      c
    )) : ln(e, n, i, c), n.memoizedState = d.state, e = n.child) : e = Ya(
      e,
      n,
      c
    ), e;
  }
  function Yg(e, n, i, r) {
    return Gi(), n.flags |= 256, ln(e, n, i, r), n.child;
  }
  var of = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sf(e) {
    return { baseLanes: e, cachePool: Rm() };
  }
  function uf(e, n, i) {
    return e = e !== null ? e.childLanes & ~i : 0, n && (e |= Ln), e;
  }
  function Vg(e, n, i) {
    var r = n.pendingProps, c = !1, d = (n.flags & 128) !== 0, b;
    if ((b = d) || (b = e !== null && e.memoizedState === null ? !1 : (Lt.current & 2) !== 0), b && (c = !0, n.flags &= -129), b = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Fe) {
        if (c ? gi(n) : pi(), (e = vt) ? (e = Ip(
          e,
          Zn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: si !== null ? { id: ba, overflow: xa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = xm(e), i.return = n, n.child = i, nn = n, vt = null)) : e = null, e === null) throw ci(n);
        return $f(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = r.children;
      return r = r.fallback, c ? (pi(), c = n.mode, E = ys(
        { mode: "hidden", children: E },
        c
      ), r = qi(
        r,
        c,
        i,
        null
      ), E.return = n, r.return = n, E.sibling = r, n.child = E, r = n.child, r.memoizedState = sf(i), r.childLanes = uf(
        e,
        b,
        i
      ), n.memoizedState = of, Lr(null, r)) : (gi(n), cf(n, E));
    }
    var Y = e.memoizedState;
    if (Y !== null && (E = Y.dehydrated, E !== null)) {
      if (d)
        n.flags & 256 ? (gi(n), n.flags &= -257, n = ff(
          e,
          n,
          i
        )) : n.memoizedState !== null ? (pi(), n.child = e.child, n.flags |= 128, n = null) : (pi(), E = r.fallback, c = n.mode, r = ys(
          { mode: "visible", children: r.children },
          c
        ), E = qi(
          E,
          c,
          i,
          null
        ), E.flags |= 2, r.return = n, E.return = n, r.sibling = E, n.child = r, Ii(
          n,
          e.child,
          null,
          i
        ), r = n.child, r.memoizedState = sf(i), r.childLanes = uf(
          e,
          b,
          i
        ), n.memoizedState = of, n = Lr(null, r));
      else if (gi(n), $f(E)) {
        if (b = E.nextSibling && E.nextSibling.dataset, b) var te = b.dgst;
        b = te, r = Error(o(419)), r.stack = "", r.digest = b, wr({ value: r, source: null, stack: null }), n = ff(
          e,
          n,
          i
        );
      } else if (kt || _l(e, n, i, !1), b = (i & e.childLanes) !== 0, kt || b) {
        if (b = gt, b !== null && (r = B(b, i), r !== 0 && r !== Y.retryLane))
          throw Y.retryLane = r, Vi(e, r), wn(b, e, r), lf;
        Xf(E) || Ms(), n = ff(
          e,
          n,
          i
        );
      } else
        Xf(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = Y.treeContext, vt = Kn(
          E.nextSibling
        ), nn = n, Fe = !0, ui = null, Zn = !1, e !== null && Em(n, e), n = cf(
          n,
          r.children
        ), n.flags |= 4096);
      return n;
    }
    return c ? (pi(), E = r.fallback, c = n.mode, Y = e.child, te = Y.sibling, r = La(Y, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = Y.subtreeFlags & 65011712, te !== null ? E = La(
      te,
      E
    ) : (E = qi(
      E,
      c,
      i,
      null
    ), E.flags |= 2), E.return = n, r.return = n, r.sibling = E, n.child = r, Lr(null, r), r = n.child, E = e.child.memoizedState, E === null ? E = sf(i) : (c = E.cachePool, c !== null ? (Y = Bt._currentValue, c = c.parent !== Y ? { parent: Y, pool: Y } : c) : c = Rm(), E = {
      baseLanes: E.baseLanes | i,
      cachePool: c
    }), r.memoizedState = E, r.childLanes = uf(
      e,
      b,
      i
    ), n.memoizedState = of, Lr(e.child, r)) : (gi(n), i = e.child, e = i.sibling, i = La(i, {
      mode: "visible",
      children: r.children
    }), i.return = n, i.sibling = null, e !== null && (b = n.deletions, b === null ? (n.deletions = [e], n.flags |= 16) : b.push(e)), n.child = i, n.memoizedState = null, i);
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
  function ff(e, n, i) {
    return Ii(n, e.child, null, i), e = cf(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function qg(e, n, i) {
    e.lanes |= n;
    var r = e.alternate;
    r !== null && (r.lanes |= n), Nc(e.return, n, i);
  }
  function df(e, n, i, r, c, d) {
    var b = e.memoizedState;
    b === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: r,
      tail: i,
      tailMode: c,
      treeForkCount: d
    } : (b.isBackwards = n, b.rendering = null, b.renderingStartTime = 0, b.last = r, b.tail = i, b.tailMode = c, b.treeForkCount = d);
  }
  function Gg(e, n, i) {
    var r = n.pendingProps, c = r.revealOrder, d = r.tail;
    r = r.children;
    var b = Lt.current, E = (b & 2) !== 0;
    if (E ? (b = b & 1 | 2, n.flags |= 128) : b &= 1, I(Lt, b), ln(e, n, r, i), r = Fe ? Sr : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && qg(e, i, n);
        else if (e.tag === 19)
          qg(e, i, n);
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
        for (i = n.child, c = null; i !== null; )
          e = i.alternate, e !== null && ls(e) === null && (c = i), i = i.sibling;
        i = c, i === null ? (c = n.child, n.child = null) : (c = i.sibling, i.sibling = null), df(
          n,
          !1,
          c,
          i,
          d,
          r
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, c = n.child, n.child = null; c !== null; ) {
          if (e = c.alternate, e !== null && ls(e) === null) {
            n.child = c;
            break;
          }
          e = c.sibling, c.sibling = i, i = c, c = e;
        }
        df(
          n,
          !0,
          i,
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
  function Ya(e, n, i) {
    if (e !== null && (n.dependencies = e.dependencies), bi |= n.lanes, (i & n.childLanes) === 0)
      if (e !== null) {
        if (_l(
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
      for (e = n.child, i = La(e, e.pendingProps), n.child = i, i.return = n; e.sibling !== null; )
        e = e.sibling, i = i.sibling = La(e, e.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function hf(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Jo(e)));
  }
  function dS(e, n, i) {
    switch (n.tag) {
      case 3:
        W(n, n.stateNode.containerInfo), fi(n, Bt, e.memoizedState.cache), Gi();
        break;
      case 27:
      case 5:
        ze(n);
        break;
      case 4:
        W(n, n.stateNode.containerInfo);
        break;
      case 10:
        fi(
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
          return r.dehydrated !== null ? (gi(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? Vg(e, n, i) : (gi(n), e = Ya(
            e,
            n,
            i
          ), e !== null ? e.sibling : null);
        gi(n);
        break;
      case 19:
        var c = (e.flags & 128) !== 0;
        if (r = (i & n.childLanes) !== 0, r || (_l(
          e,
          n,
          i,
          !1
        ), r = (i & n.childLanes) !== 0), c) {
          if (r)
            return Gg(
              e,
              n,
              i
            );
          n.flags |= 128;
        }
        if (c = n.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), I(Lt, Lt.current), r) break;
        return null;
      case 22:
        return n.lanes = 0, jg(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        fi(n, Bt, e.memoizedState.cache);
    }
    return Ya(e, n, i);
  }
  function Xg(e, n, i) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        kt = !0;
      else {
        if (!hf(e, i) && (n.flags & 128) === 0)
          return kt = !1, dS(
            e,
            n,
            i
          );
        kt = (e.flags & 131072) !== 0;
      }
    else
      kt = !1, Fe && (n.flags & 1048576) !== 0 && wm(n, Sr, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var r = n.pendingProps;
          if (e = Qi(n.elementType), n.type = e, typeof e == "function")
            yc(e) ? (r = Ji(e, r), n.tag = 1, n = kg(
              null,
              n,
              e,
              r,
              i
            )) : (n.tag = 0, n = rf(
              null,
              n,
              e,
              r,
              i
            ));
          else {
            if (e != null) {
              var c = e.$$typeof;
              if (c === z) {
                n.tag = 11, n = zg(
                  null,
                  n,
                  e,
                  r,
                  i
                );
                break e;
              } else if (c === k) {
                n.tag = 14, n = Og(
                  null,
                  n,
                  e,
                  r,
                  i
                );
                break e;
              }
            }
            throw n = L(e) || e, Error(o(306, n, ""));
          }
        }
        return n;
      case 0:
        return rf(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return r = n.type, c = Ji(
          r,
          n.pendingProps
        ), kg(
          e,
          n,
          r,
          c,
          i
        );
      case 3:
        e: {
          if (W(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          r = n.pendingProps;
          var d = n.memoizedState;
          c = d.element, zc(e, n), Rr(n, r, null, i);
          var b = n.memoizedState;
          if (r = b.cache, fi(n, Bt, r), r !== d.cache && Mc(
            n,
            [Bt],
            i,
            !0
          ), Cr(), r = b.element, d.isDehydrated)
            if (d = {
              element: r,
              isDehydrated: !1,
              cache: b.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = Yg(
                e,
                n,
                r,
                i
              );
              break e;
            } else if (r !== c) {
              c = Gn(
                Error(o(424)),
                n
              ), wr(c), n = Yg(
                e,
                n,
                r,
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
              for (vt = Kn(e.firstChild), nn = n, Fe = !0, ui = null, Zn = !0, i = jm(
                n,
                null,
                r,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (Gi(), r === c) {
              n = Ya(
                e,
                n,
                i
              );
              break e;
            }
            ln(e, n, r, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return ps(e, n), e === null ? (i = t0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : Fe || (i = n.type, e = n.pendingProps, r = Os(
          me.current
        ).createElement(i), r[ve] = n, r[xe] = e, rn(r, i, e), Ie(r), n.stateNode = r) : n.memoizedState = t0(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ze(n), e === null && Fe && (r = n.stateNode = Pp(
          n.type,
          n.pendingProps,
          me.current
        ), nn = n, Zn = !0, c = vt, _i(n.type) ? (Zf = c, vt = Kn(r.firstChild)) : vt = c), ln(
          e,
          n,
          n.pendingProps.children,
          i
        ), ps(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Fe && ((c = r = vt) && (r = qS(
          r,
          n.type,
          n.pendingProps,
          Zn
        ), r !== null ? (n.stateNode = r, nn = n, vt = Kn(r.firstChild), Zn = !1, c = !0) : c = !1), c || ci(n)), ze(n), c = n.type, d = n.pendingProps, b = e !== null ? e.memoizedProps : null, r = d.children, Vf(c, d) ? r = null : b !== null && Vf(c, b) && (n.flags |= 32), n.memoizedState !== null && (c = kc(
          e,
          n,
          aS,
          null,
          null,
          i
        ), Ir._currentValue = c), ps(e, n), ln(e, n, r, i), n.child;
      case 6:
        return e === null && Fe && ((e = i = vt) && (i = GS(
          i,
          n.pendingProps,
          Zn
        ), i !== null ? (n.stateNode = i, nn = n, vt = null, e = !0) : e = !1), e || ci(n)), null;
      case 13:
        return Vg(e, n, i);
      case 4:
        return W(
          n,
          n.stateNode.containerInfo
        ), r = n.pendingProps, e === null ? n.child = Ii(
          n,
          null,
          r,
          i
        ) : ln(e, n, r, i), n.child;
      case 11:
        return zg(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 7:
        return ln(
          e,
          n,
          n.pendingProps,
          i
        ), n.child;
      case 8:
        return ln(
          e,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 12:
        return ln(
          e,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 10:
        return r = n.pendingProps, fi(n, n.type, r.value), ln(e, n, r.children, i), n.child;
      case 9:
        return c = n.type._context, r = n.pendingProps.children, $i(n), c = an(c), r = r(c), n.flags |= 1, ln(e, n, r, i), n.child;
      case 14:
        return Og(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return Lg(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return Gg(e, n, i);
      case 31:
        return fS(e, n, i);
      case 22:
        return jg(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return $i(n), r = an(Bt), e === null ? (c = Rc(), c === null && (c = gt, d = Tc(), c.pooledCache = d, d.refCount++, d !== null && (c.pooledCacheLanes |= i), c = d), n.memoizedState = { parent: r, cache: c }, Dc(n), fi(n, Bt, c)) : ((e.lanes & i) !== 0 && (zc(e, n), Rr(n, null, null, i), Cr()), c = e.memoizedState, d = n.memoizedState, c.parent !== r ? (c = { parent: r, cache: r }, n.memoizedState = c, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = c), fi(n, Bt, r)) : (r = d.cache, fi(n, Bt, r), r !== c.cache && Mc(
          n,
          [Bt],
          i,
          !0
        ))), ln(
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
  function Va(e) {
    e.flags |= 4;
  }
  function mf(e, n, i, r, c) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (c & 335544128) === c)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (yp()) e.flags |= 8192;
        else
          throw Ki = ts, Ac;
    } else e.flags &= -16777217;
  }
  function $g(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !r0(n))
      if (yp()) e.flags |= 8192;
      else
        throw Ki = ts, Ac;
  }
  function vs(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Ot() : 536870912, e.lanes |= n, Hl |= n);
  }
  function jr(e, n) {
    if (!Fe)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? e.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = e.tail;
          for (var r = null; i !== null; )
            i.alternate !== null && (r = i), i = i.sibling;
          r === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
      }
  }
  function bt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, i = 0, r = 0;
    if (n)
      for (var c = e.child; c !== null; )
        i |= c.lanes | c.childLanes, r |= c.subtreeFlags & 65011712, r |= c.flags & 65011712, c.return = e, c = c.sibling;
    else
      for (c = e.child; c !== null; )
        i |= c.lanes | c.childLanes, r |= c.subtreeFlags, r |= c.flags, c.return = e, c = c.sibling;
    return e.subtreeFlags |= r, e.childLanes = i, n;
  }
  function hS(e, n, i) {
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
        return i = n.stateNode, r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ba(Bt), pe(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (El(n) ? Va(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Ec())), bt(n), null;
      case 26:
        var c = n.type, d = n.memoizedState;
        return e === null ? (Va(n), d !== null ? (bt(n), $g(n, d)) : (bt(n), mf(
          n,
          c,
          null,
          r,
          i
        ))) : d ? d !== e.memoizedState ? (Va(n), bt(n), $g(n, d)) : (bt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== r && Va(n), bt(n), mf(
          n,
          c,
          e,
          r,
          i
        )), null;
      case 27:
        if (Ae(n), i = me.current, c = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== r && Va(n);
        else {
          if (!r) {
            if (n.stateNode === null)
              throw Error(o(166));
            return bt(n), null;
          }
          e = ne.current, El(n) ? _m(n) : (e = Pp(c, r, i), n.stateNode = e, Va(n));
        }
        return bt(n), null;
      case 5:
        if (Ae(n), c = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== r && Va(n);
        else {
          if (!r) {
            if (n.stateNode === null)
              throw Error(o(166));
            return bt(n), null;
          }
          if (d = ne.current, El(n))
            _m(n);
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
            r && Va(n);
          }
        }
        return bt(n), mf(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== r && Va(n);
        else {
          if (typeof r != "string" && n.stateNode === null)
            throw Error(o(166));
          if (e = me.current, El(n)) {
            if (e = n.stateNode, i = n.memoizedProps, r = null, c = nn, c !== null)
              switch (c.tag) {
                case 27:
                case 5:
                  r = c.memoizedProps;
              }
            e[ve] = n, e = !!(e.nodeValue === i || r !== null && r.suppressHydrationWarning === !0 || Vp(e.nodeValue, i)), e || ci(n, !0);
          } else
            e = Os(e).createTextNode(
              r
            ), e[ve] = n, n.stateNode = e;
        }
        return bt(n), null;
      case 31:
        if (i = n.memoizedState, e === null || e.memoizedState !== null) {
          if (r = El(n), i !== null) {
            if (e === null) {
              if (!r) throw Error(o(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[ve] = n;
            } else
              Gi(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            bt(n), e = !1;
          } else
            i = Ec(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return n.flags & 256 ? (zn(n), n) : (zn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(o(558));
        }
        return bt(n), null;
      case 13:
        if (r = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (c = El(n), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(o(318));
              if (c = n.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(o(317));
              c[ve] = n;
            } else
              Gi(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            bt(n), c = !1;
          } else
            c = Ec(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c), c = !0;
          if (!c)
            return n.flags & 256 ? (zn(n), n) : (zn(n), null);
        }
        return zn(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = r !== null, e = e !== null && e.memoizedState !== null, i && (r = n.child, c = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (c = r.alternate.memoizedState.cachePool.pool), d = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (d = r.memoizedState.cachePool.pool), d !== c && (r.flags |= 2048)), i !== e && i && (n.child.flags |= 8192), vs(n, n.updateQueue), bt(n), null);
      case 4:
        return pe(), e === null && Hf(n.stateNode.containerInfo), bt(n), null;
      case 10:
        return Ba(n.type), bt(n), null;
      case 19:
        if (V(Lt), r = n.memoizedState, r === null) return bt(n), null;
        if (c = (n.flags & 128) !== 0, d = r.rendering, d === null)
          if (c) jr(r, !1);
          else {
            if (Dt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (d = ls(e), d !== null) {
                  for (n.flags |= 128, jr(r, !1), e = d.updateQueue, n.updateQueue = e, vs(n, e), n.subtreeFlags = 0, e = i, i = n.child; i !== null; )
                    bm(i, e), i = i.sibling;
                  return I(
                    Lt,
                    Lt.current & 1 | 2
                  ), Fe && ja(n, r.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            r.tail !== null && yt() > Es && (n.flags |= 128, c = !0, jr(r, !1), n.lanes = 4194304);
          }
        else {
          if (!c)
            if (e = ls(d), e !== null) {
              if (n.flags |= 128, c = !0, e = e.updateQueue, n.updateQueue = e, vs(n, e), jr(r, !0), r.tail === null && r.tailMode === "hidden" && !d.alternate && !Fe)
                return bt(n), null;
            } else
              2 * yt() - r.renderingStartTime > Es && i !== 536870912 && (n.flags |= 128, c = !0, jr(r, !1), n.lanes = 4194304);
          r.isBackwards ? (d.sibling = n.child, n.child = d) : (e = r.last, e !== null ? e.sibling = d : n.child = d, r.last = d);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = yt(), e.sibling = null, i = Lt.current, I(
          Lt,
          c ? i & 1 | 2 : i & 1
        ), Fe && ja(n, r.treeForkCount), e) : (bt(n), null);
      case 22:
      case 23:
        return zn(n), Hc(), r = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (n.flags |= 8192) : r && (n.flags |= 8192), r ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (bt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : bt(n), i = n.updateQueue, i !== null && vs(n, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), r = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (r = n.memoizedState.cachePool.pool), r !== i && (n.flags |= 2048), e !== null && V(Zi), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Ba(Bt), bt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function mS(e, n) {
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
          Gi();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (zn(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(o(340));
          Gi();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return V(Lt), null;
      case 4:
        return pe(), null;
      case 10:
        return Ba(n.type), null;
      case 22:
      case 23:
        return zn(n), Hc(), e !== null && V(Zi), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ba(Bt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zg(e, n) {
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
        V(Lt);
        break;
      case 10:
        Ba(n.type);
        break;
      case 22:
      case 23:
        zn(n), Hc(), e !== null && V(Zi);
        break;
      case 24:
        Ba(Bt);
    }
  }
  function Hr(e, n) {
    try {
      var i = n.updateQueue, r = i !== null ? i.lastEffect : null;
      if (r !== null) {
        var c = r.next;
        i = c;
        do {
          if ((i.tag & e) === e) {
            r = void 0;
            var d = i.create, b = i.inst;
            r = d(), b.destroy = r;
          }
          i = i.next;
        } while (i !== c);
      }
    } catch (E) {
      ct(n, n.return, E);
    }
  }
  function yi(e, n, i) {
    try {
      var r = n.updateQueue, c = r !== null ? r.lastEffect : null;
      if (c !== null) {
        var d = c.next;
        r = d;
        do {
          if ((r.tag & e) === e) {
            var b = r.inst, E = b.destroy;
            if (E !== void 0) {
              b.destroy = void 0, c = n;
              var Y = i, te = E;
              try {
                te();
              } catch (ue) {
                ct(
                  c,
                  Y,
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
  function Qg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var i = e.stateNode;
      try {
        Bm(n, i);
      } catch (r) {
        ct(e, e.return, r);
      }
    }
  }
  function Kg(e, n, i) {
    i.props = Ji(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (r) {
      ct(e, n, r);
    }
  }
  function Br(e, n) {
    try {
      var i = e.ref;
      if (i !== null) {
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
        typeof i == "function" ? e.refCleanup = i(r) : i.current = r;
      }
    } catch (c) {
      ct(e, n, c);
    }
  }
  function Sa(e, n) {
    var i = e.ref, r = e.refCleanup;
    if (i !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (c) {
          ct(e, n, c);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (c) {
          ct(e, n, c);
        }
      else i.current = null;
  }
  function Ig(e) {
    var n = e.type, i = e.memoizedProps, r = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && r.focus();
          break e;
        case "img":
          i.src ? r.src = i.src : i.srcSet && (r.srcset = i.srcSet);
      }
    } catch (c) {
      ct(e, e.return, c);
    }
  }
  function gf(e, n, i) {
    try {
      var r = e.stateNode;
      HS(r, e.type, i, n), r[xe] = n;
    } catch (c) {
      ct(e, e.return, c);
    }
  }
  function Fg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && _i(e.type) || e.tag === 4;
  }
  function pf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Fg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && _i(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function yf(e, n, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(e), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = za));
    else if (r !== 4 && (r === 27 && _i(e.type) && (i = e.stateNode, n = null), e = e.child, e !== null))
      for (yf(e, n, i), e = e.sibling; e !== null; )
        yf(e, n, i), e = e.sibling;
  }
  function bs(e, n, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? i.insertBefore(e, n) : i.appendChild(e);
    else if (r !== 4 && (r === 27 && _i(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (bs(e, n, i), e = e.sibling; e !== null; )
        bs(e, n, i), e = e.sibling;
  }
  function Jg(e) {
    var n = e.stateNode, i = e.memoizedProps;
    try {
      for (var r = e.type, c = n.attributes; c.length; )
        n.removeAttributeNode(c[0]);
      rn(n, r, i), n[ve] = e, n[xe] = i;
    } catch (d) {
      ct(e, e.return, d);
    }
  }
  var qa = !1, Yt = !1, vf = !1, Pg = typeof WeakSet == "function" ? WeakSet : Set, It = null;
  function gS(e, n) {
    if (e = e.containerInfo, kf = Ys, e = cm(e), cc(e)) {
      if ("selectionStart" in e)
        var i = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          i = (i = e.ownerDocument) && i.defaultView || window;
          var r = i.getSelection && i.getSelection();
          if (r && r.rangeCount !== 0) {
            i = r.anchorNode;
            var c = r.anchorOffset, d = r.focusNode;
            r = r.focusOffset;
            try {
              i.nodeType, d.nodeType;
            } catch {
              i = null;
              break e;
            }
            var b = 0, E = -1, Y = -1, te = 0, ue = 0, fe = e, ie = null;
            t: for (; ; ) {
              for (var re; fe !== i || c !== 0 && fe.nodeType !== 3 || (E = b + c), fe !== d || r !== 0 && fe.nodeType !== 3 || (Y = b + r), fe.nodeType === 3 && (b += fe.nodeValue.length), (re = fe.firstChild) !== null; )
                ie = fe, fe = re;
              for (; ; ) {
                if (fe === e) break t;
                if (ie === i && ++te === c && (E = b), ie === d && ++ue === r && (Y = b), (re = fe.nextSibling) !== null) break;
                fe = ie, ie = fe.parentNode;
              }
              fe = re;
            }
            i = E === -1 || Y === -1 ? null : { start: E, end: Y };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Yf = { focusedElem: e, selectionRange: i }, Ys = !1, It = n; It !== null; )
      if (n = It, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, It = e;
      else
        for (; It !== null; ) {
          switch (n = It, d = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  c = e[i], c.ref.impl = c.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && d !== null) {
                e = void 0, i = n, c = d.memoizedProps, d = d.memoizedState, r = i.stateNode;
                try {
                  var _e = Ji(
                    i.type,
                    c
                  );
                  e = r.getSnapshotBeforeUpdate(
                    _e,
                    d
                  ), r.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Le) {
                  ct(
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
                  Gf(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Gf(e);
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
            e.return = n.return, It = e;
            break;
          }
          It = n.return;
        }
  }
  function Wg(e, n, i) {
    var r = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Xa(e, i), r & 4 && Hr(5, i);
        break;
      case 1:
        if (Xa(e, i), r & 4)
          if (e = i.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (b) {
              ct(i, i.return, b);
            }
          else {
            var c = Ji(
              i.type,
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
                i,
                i.return,
                b
              );
            }
          }
        r & 64 && Qg(i), r & 512 && Br(i, i.return);
        break;
      case 3:
        if (Xa(e, i), r & 64 && (e = i.updateQueue, e !== null)) {
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
            Bm(e, n);
          } catch (b) {
            ct(i, i.return, b);
          }
        }
        break;
      case 27:
        n === null && r & 4 && Jg(i);
      case 26:
      case 5:
        Xa(e, i), n === null && r & 4 && Ig(i), r & 512 && Br(i, i.return);
        break;
      case 12:
        Xa(e, i);
        break;
      case 31:
        Xa(e, i), r & 4 && np(e, i);
        break;
      case 13:
        Xa(e, i), r & 4 && ap(e, i), r & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = _S.bind(
          null,
          i
        ), XS(e, i))));
        break;
      case 22:
        if (r = i.memoizedState !== null || qa, !r) {
          n = n !== null && n.memoizedState !== null || Yt, c = qa;
          var d = Yt;
          qa = r, (Yt = n) && !d ? $a(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : Xa(e, i), qa = c, Yt = d;
        }
        break;
      case 30:
        break;
      default:
        Xa(e, i);
    }
  }
  function ep(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, ep(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Je(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var xt = null, vn = !1;
  function Ga(e, n, i) {
    for (i = i.child; i !== null; )
      tp(e, n, i), i = i.sibling;
  }
  function tp(e, n, i) {
    if (Xt && typeof Xt.onCommitFiberUnmount == "function")
      try {
        Xt.onCommitFiberUnmount(Nn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Yt || Sa(i, n), Ga(
          e,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Yt || Sa(i, n);
        var r = xt, c = vn;
        _i(i.type) && (xt = i.stateNode, vn = !1), Ga(
          e,
          n,
          i
        ), Zr(i.stateNode), xt = r, vn = c;
        break;
      case 5:
        Yt || Sa(i, n);
      case 6:
        if (r = xt, c = vn, xt = null, Ga(
          e,
          n,
          i
        ), xt = r, vn = c, xt !== null)
          if (vn)
            try {
              (xt.nodeType === 9 ? xt.body : xt.nodeName === "HTML" ? xt.ownerDocument.body : xt).removeChild(i.stateNode);
            } catch (d) {
              ct(
                i,
                n,
                d
              );
            }
          else
            try {
              xt.removeChild(i.stateNode);
            } catch (d) {
              ct(
                i,
                n,
                d
              );
            }
        break;
      case 18:
        xt !== null && (vn ? (e = xt, Qp(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), Xl(e)) : Qp(xt, i.stateNode));
        break;
      case 4:
        r = xt, c = vn, xt = i.stateNode.containerInfo, vn = !0, Ga(
          e,
          n,
          i
        ), xt = r, vn = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        yi(2, i, n), Yt || yi(4, i, n), Ga(
          e,
          n,
          i
        );
        break;
      case 1:
        Yt || (Sa(i, n), r = i.stateNode, typeof r.componentWillUnmount == "function" && Kg(
          i,
          n,
          r
        )), Ga(
          e,
          n,
          i
        );
        break;
      case 21:
        Ga(
          e,
          n,
          i
        );
        break;
      case 22:
        Yt = (r = Yt) || i.memoizedState !== null, Ga(
          e,
          n,
          i
        ), Yt = r;
        break;
      default:
        Ga(
          e,
          n,
          i
        );
    }
  }
  function np(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Xl(e);
      } catch (i) {
        ct(n, n.return, i);
      }
    }
  }
  function ap(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Xl(e);
      } catch (i) {
        ct(n, n.return, i);
      }
  }
  function pS(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Pg()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Pg()), n;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function xs(e, n) {
    var i = pS(e);
    n.forEach(function(r) {
      if (!i.has(r)) {
        i.add(r);
        var c = NS.bind(null, e, r);
        r.then(c, c);
      }
    });
  }
  function bn(e, n) {
    var i = n.deletions;
    if (i !== null)
      for (var r = 0; r < i.length; r++) {
        var c = i[r], d = e, b = n, E = b;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (_i(E.type)) {
                xt = E.stateNode, vn = !1;
                break e;
              }
              break;
            case 5:
              xt = E.stateNode, vn = !1;
              break e;
            case 3:
            case 4:
              xt = E.stateNode.containerInfo, vn = !0;
              break e;
          }
          E = E.return;
        }
        if (xt === null) throw Error(o(160));
        tp(d, b, c), xt = null, vn = !1, d = c.alternate, d !== null && (d.return = null), c.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        ip(n, e), n = n.sibling;
  }
  var ra = null;
  function ip(e, n) {
    var i = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        bn(n, e), xn(e), r & 4 && (yi(3, e, e.return), Hr(3, e), yi(5, e, e.return));
        break;
      case 1:
        bn(n, e), xn(e), r & 512 && (Yt || i === null || Sa(i, i.return)), r & 64 && qa && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? r : i.concat(r))));
        break;
      case 26:
        var c = ra;
        if (bn(n, e), xn(e), r & 512 && (Yt || i === null || Sa(i, i.return)), r & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (r = e.memoizedState, i === null)
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  r = e.type, i = e.memoizedProps, c = c.ownerDocument || c;
                  t: switch (r) {
                    case "title":
                      d = c.getElementsByTagName("title")[0], (!d || d[Ve] || d[ve] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = c.createElement(r), c.head.insertBefore(
                        d,
                        c.querySelector("head > title")
                      )), rn(d, r, i), d[ve] = e, Ie(d), r = d;
                      break e;
                    case "link":
                      var b = i0(
                        "link",
                        "href",
                        c
                      ).get(r + (i.href || ""));
                      if (b) {
                        for (var E = 0; E < b.length; E++)
                          if (d = b[E], d.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && d.getAttribute("rel") === (i.rel == null ? null : i.rel) && d.getAttribute("title") === (i.title == null ? null : i.title) && d.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            b.splice(E, 1);
                            break t;
                          }
                      }
                      d = c.createElement(r), rn(d, r, i), c.head.appendChild(d);
                      break;
                    case "meta":
                      if (b = i0(
                        "meta",
                        "content",
                        c
                      ).get(r + (i.content || ""))) {
                        for (E = 0; E < b.length; E++)
                          if (d = b[E], d.getAttribute("content") === (i.content == null ? null : "" + i.content) && d.getAttribute("name") === (i.name == null ? null : i.name) && d.getAttribute("property") === (i.property == null ? null : i.property) && d.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && d.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            b.splice(E, 1);
                            break t;
                          }
                      }
                      d = c.createElement(r), rn(d, r, i), c.head.appendChild(d);
                      break;
                    default:
                      throw Error(o(468, r));
                  }
                  d[ve] = e, Ie(d), r = d;
                }
                e.stateNode = r;
              } else
                l0(
                  c,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = a0(
                c,
                r,
                e.memoizedProps
              );
          else
            d !== r ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, r === null ? l0(
              c,
              e.type,
              e.stateNode
            ) : a0(
              c,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && gf(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        bn(n, e), xn(e), r & 512 && (Yt || i === null || Sa(i, i.return)), i !== null && r & 4 && gf(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (bn(n, e), xn(e), r & 512 && (Yt || i === null || Sa(i, i.return)), e.flags & 32) {
          c = e.stateNode;
          try {
            hl(c, "");
          } catch (_e) {
            ct(e, e.return, _e);
          }
        }
        r & 4 && e.stateNode != null && (c = e.memoizedProps, gf(
          e,
          c,
          i !== null ? i.memoizedProps : c
        )), r & 1024 && (vf = !0);
        break;
      case 6:
        if (bn(n, e), xn(e), r & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          r = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = r;
          } catch (_e) {
            ct(e, e.return, _e);
          }
        }
        break;
      case 3:
        if (Hs = null, c = ra, ra = Ls(n.containerInfo), bn(n, e), ra = c, xn(e), r & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Xl(n.containerInfo);
          } catch (_e) {
            ct(e, e.return, _e);
          }
        vf && (vf = !1, lp(e));
        break;
      case 4:
        r = ra, ra = Ls(
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
        bn(n, e), xn(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (ws = yt()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, xs(e, r)));
        break;
      case 22:
        c = e.memoizedState !== null;
        var Y = i !== null && i.memoizedState !== null, te = qa, ue = Yt;
        if (qa = te || c, Yt = ue || Y, bn(n, e), Yt = ue, qa = te, xn(e), r & 8192)
          e: for (n = e.stateNode, n._visibility = c ? n._visibility & -2 : n._visibility | 1, c && (i === null || Y || qa || Yt || Pi(e)), i = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                Y = i = n;
                try {
                  if (d = Y.stateNode, c)
                    b = d.style, typeof b.setProperty == "function" ? b.setProperty("display", "none", "important") : b.display = "none";
                  else {
                    E = Y.stateNode;
                    var fe = Y.memoizedProps.style, ie = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    E.style.display = ie == null || typeof ie == "boolean" ? "" : ("" + ie).trim();
                  }
                } catch (_e) {
                  ct(Y, Y.return, _e);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                Y = n;
                try {
                  Y.stateNode.nodeValue = c ? "" : Y.memoizedProps;
                } catch (_e) {
                  ct(Y, Y.return, _e);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                Y = n;
                try {
                  var re = Y.stateNode;
                  c ? Kp(re, !0) : Kp(Y.stateNode, !1);
                } catch (_e) {
                  ct(Y, Y.return, _e);
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
        r & 4 && (r = e.updateQueue, r !== null && (i = r.retryQueue, i !== null && (r.retryQueue = null, xs(e, i))));
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
        for (var i, r = e.return; r !== null; ) {
          if (Fg(r)) {
            i = r;
            break;
          }
          r = r.return;
        }
        if (i == null) throw Error(o(160));
        switch (i.tag) {
          case 27:
            var c = i.stateNode, d = pf(e);
            bs(e, d, c);
            break;
          case 5:
            var b = i.stateNode;
            i.flags & 32 && (hl(b, ""), i.flags &= -33);
            var E = pf(e);
            bs(e, E, b);
            break;
          case 3:
          case 4:
            var Y = i.stateNode.containerInfo, te = pf(e);
            yf(
              e,
              te,
              Y
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
  function lp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        lp(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function Xa(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Wg(e, n.alternate, n), n = n.sibling;
  }
  function Pi(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          yi(4, n, n.return), Pi(n);
          break;
        case 1:
          Sa(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && Kg(
            n,
            n.return,
            i
          ), Pi(n);
          break;
        case 27:
          Zr(n.stateNode);
        case 26:
        case 5:
          Sa(n, n.return), Pi(n);
          break;
        case 22:
          n.memoizedState === null && Pi(n);
          break;
        case 30:
          Pi(n);
          break;
        default:
          Pi(n);
      }
      e = e.sibling;
    }
  }
  function $a(e, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var r = n.alternate, c = e, d = n, b = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          $a(
            c,
            d,
            i
          ), Hr(4, d);
          break;
        case 1:
          if ($a(
            c,
            d,
            i
          ), r = d, c = r.stateNode, typeof c.componentDidMount == "function")
            try {
              c.componentDidMount();
            } catch (te) {
              ct(r, r.return, te);
            }
          if (r = d, c = r.updateQueue, c !== null) {
            var E = r.stateNode;
            try {
              var Y = c.shared.hiddenCallbacks;
              if (Y !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < Y.length; c++)
                  Hm(Y[c], E);
            } catch (te) {
              ct(r, r.return, te);
            }
          }
          i && b & 64 && Qg(d), Br(d, d.return);
          break;
        case 27:
          Jg(d);
        case 26:
        case 5:
          $a(
            c,
            d,
            i
          ), i && r === null && b & 4 && Ig(d), Br(d, d.return);
          break;
        case 12:
          $a(
            c,
            d,
            i
          );
          break;
        case 31:
          $a(
            c,
            d,
            i
          ), i && b & 4 && np(c, d);
          break;
        case 13:
          $a(
            c,
            d,
            i
          ), i && b & 4 && ap(c, d);
          break;
        case 22:
          d.memoizedState === null && $a(
            c,
            d,
            i
          ), Br(d, d.return);
          break;
        case 30:
          break;
        default:
          $a(
            c,
            d,
            i
          );
      }
      n = n.sibling;
    }
  }
  function bf(e, n) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && Er(i));
  }
  function xf(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && Er(e));
  }
  function oa(e, n, i, r) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        rp(
          e,
          n,
          i,
          r
        ), n = n.sibling;
  }
  function rp(e, n, i, r) {
    var c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        oa(
          e,
          n,
          i,
          r
        ), c & 2048 && Hr(9, n);
        break;
      case 1:
        oa(
          e,
          n,
          i,
          r
        );
        break;
      case 3:
        oa(
          e,
          n,
          i,
          r
        ), c & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && Er(e)));
        break;
      case 12:
        if (c & 2048) {
          oa(
            e,
            n,
            i,
            r
          ), e = n.stateNode;
          try {
            var d = n.memoizedProps, b = d.id, E = d.onPostCommit;
            typeof E == "function" && E(
              b,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (Y) {
            ct(n, n.return, Y);
          }
        } else
          oa(
            e,
            n,
            i,
            r
          );
        break;
      case 31:
        oa(
          e,
          n,
          i,
          r
        );
        break;
      case 13:
        oa(
          e,
          n,
          i,
          r
        );
        break;
      case 23:
        break;
      case 22:
        d = n.stateNode, b = n.alternate, n.memoizedState !== null ? d._visibility & 2 ? oa(
          e,
          n,
          i,
          r
        ) : Ur(e, n) : d._visibility & 2 ? oa(
          e,
          n,
          i,
          r
        ) : (d._visibility |= 2, Ol(
          e,
          n,
          i,
          r,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), c & 2048 && bf(b, n);
        break;
      case 24:
        oa(
          e,
          n,
          i,
          r
        ), c & 2048 && xf(n.alternate, n);
        break;
      default:
        oa(
          e,
          n,
          i,
          r
        );
    }
  }
  function Ol(e, n, i, r, c) {
    for (c = c && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var d = e, b = n, E = i, Y = r, te = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          Ol(
            d,
            b,
            E,
            Y,
            c
          ), Hr(8, b);
          break;
        case 23:
          break;
        case 22:
          var ue = b.stateNode;
          b.memoizedState !== null ? ue._visibility & 2 ? Ol(
            d,
            b,
            E,
            Y,
            c
          ) : Ur(
            d,
            b
          ) : (ue._visibility |= 2, Ol(
            d,
            b,
            E,
            Y,
            c
          )), c && te & 2048 && bf(
            b.alternate,
            b
          );
          break;
        case 24:
          Ol(
            d,
            b,
            E,
            Y,
            c
          ), c && te & 2048 && xf(b.alternate, b);
          break;
        default:
          Ol(
            d,
            b,
            E,
            Y,
            c
          );
      }
      n = n.sibling;
    }
  }
  function Ur(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = e, r = n, c = r.flags;
        switch (r.tag) {
          case 22:
            Ur(i, r), c & 2048 && bf(
              r.alternate,
              r
            );
            break;
          case 24:
            Ur(i, r), c & 2048 && xf(r.alternate, r);
            break;
          default:
            Ur(i, r);
        }
        n = n.sibling;
      }
  }
  var kr = 8192;
  function Ll(e, n, i) {
    if (e.subtreeFlags & kr)
      for (e = e.child; e !== null; )
        op(
          e,
          n,
          i
        ), e = e.sibling;
  }
  function op(e, n, i) {
    switch (e.tag) {
      case 26:
        Ll(
          e,
          n,
          i
        ), e.flags & kr && e.memoizedState !== null && nw(
          i,
          ra,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ll(
          e,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var r = ra;
        ra = Ls(e.stateNode.containerInfo), Ll(
          e,
          n,
          i
        ), ra = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = kr, kr = 16777216, Ll(
          e,
          n,
          i
        ), kr = r) : Ll(
          e,
          n,
          i
        ));
        break;
      default:
        Ll(
          e,
          n,
          i
        );
    }
  }
  function sp(e) {
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
        for (var i = 0; i < n.length; i++) {
          var r = n[i];
          It = r, cp(
            r,
            e
          );
        }
      sp(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        up(e), e = e.sibling;
  }
  function up(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Yr(e), e.flags & 2048 && yi(9, e, e.return);
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
        for (var i = 0; i < n.length; i++) {
          var r = n[i];
          It = r, cp(
            r,
            e
          );
        }
      sp(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          yi(8, n, n.return), Ss(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, Ss(n));
          break;
        default:
          Ss(n);
      }
      e = e.sibling;
    }
  }
  function cp(e, n) {
    for (; It !== null; ) {
      var i = It;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          yi(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var r = i.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          Er(i.memoizedState.cache);
      }
      if (r = i.child, r !== null) r.return = i, It = r;
      else
        e: for (i = e; It !== null; ) {
          r = It;
          var c = r.sibling, d = r.return;
          if (ep(r), r === i) {
            It = null;
            break e;
          }
          if (c !== null) {
            c.return = d, It = c;
            break e;
          }
          It = d;
        }
    }
  }
  var yS = {
    getCacheForType: function(e) {
      var n = an(Bt), i = n.data.get(e);
      return i === void 0 && (i = e(), n.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return an(Bt).controller.signal;
    }
  }, vS = typeof WeakMap == "function" ? WeakMap : Map, it = 0, gt = null, Xe = null, Qe = 0, ut = 0, On = null, vi = !1, jl = !1, Sf = !1, Za = 0, Dt = 0, bi = 0, Wi = 0, wf = 0, Ln = 0, Hl = 0, Vr = null, Sn = null, Ef = !1, ws = 0, fp = 0, Es = 1 / 0, _s = null, xi = null, Zt = 0, Si = null, Bl = null, Qa = 0, _f = 0, Nf = null, dp = null, qr = 0, Mf = null;
  function jn() {
    return (it & 2) !== 0 && Qe !== 0 ? Qe & -Qe : _.T !== null ? zf() : de();
  }
  function hp() {
    if (Ln === 0)
      if ((Qe & 536870912) === 0 || Fe) {
        var e = Mn;
        Mn <<= 1, (Mn & 3932160) === 0 && (Mn = 262144), Ln = e;
      } else Ln = 536870912;
    return e = Dn.current, e !== null && (e.flags |= 32), Ln;
  }
  function wn(e, n, i) {
    (e === gt && (ut === 2 || ut === 9) || e.cancelPendingCommit !== null) && (Ul(e, 0), wi(
      e,
      Qe,
      Ln,
      !1
    )), rt(e, i), ((it & 2) === 0 || e !== gt) && (e === gt && ((it & 2) === 0 && (Wi |= i), Dt === 4 && wi(
      e,
      Qe,
      Ln,
      !1
    )), wa(e));
  }
  function mp(e, n, i) {
    if ((it & 6) !== 0) throw Error(o(327));
    var r = !i && (n & 127) === 0 && (n & e.expiredLanes) === 0 || ot(e, n), c = r ? SS(e, n) : Cf(e, n, !0), d = r;
    do {
      if (c === 0) {
        jl && !r && wi(e, n, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, d && !bS(i)) {
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
              var E = e;
              c = Vr;
              var Y = E.current.memoizedState.isDehydrated;
              if (Y && (Ul(E, b).flags |= 256), b = Cf(
                E,
                b,
                !1
              ), b !== 2) {
                if (Sf && !Y) {
                  E.errorRecoveryDisabledLanes |= d, Wi |= d, c = 4;
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
          Ul(e, 0), wi(e, n, 0, !0);
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
              wi(
                r,
                n,
                Ln,
                !vi
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
            if (wi(
              r,
              n,
              Ln,
              !vi
            ), je(r, 0, !0) !== 0) break e;
            Qa = n, r.timeoutHandle = $p(
              gp.bind(
                null,
                r,
                i,
                Sn,
                _s,
                Ef,
                n,
                Ln,
                Wi,
                Hl,
                vi,
                d,
                "Throttled",
                -0,
                0
              ),
              c
            );
            break e;
          }
          gp(
            r,
            i,
            Sn,
            _s,
            Ef,
            n,
            Ln,
            Wi,
            Hl,
            vi,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    wa(e);
  }
  function gp(e, n, i, r, c, d, b, E, Y, te, ue, fe, ie, re) {
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
      }, op(
        n,
        d,
        fe
      );
      var _e = (d & 62914560) === d ? ws - yt() : (d & 4194048) === d ? fp - yt() : 0;
      if (_e = aw(
        fe,
        _e
      ), _e !== null) {
        Qa = d, e.cancelPendingCommit = _e(
          Ep.bind(
            null,
            e,
            n,
            d,
            i,
            r,
            c,
            b,
            E,
            Y,
            ue,
            fe,
            null,
            ie,
            re
          )
        ), wi(e, d, b, !te);
        return;
      }
    }
    Ep(
      e,
      n,
      d,
      i,
      r,
      c,
      b,
      E,
      Y
    );
  }
  function bS(e) {
    for (var n = e; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var r = 0; r < i.length; r++) {
          var c = i[r], d = c.getSnapshot;
          c = c.value;
          try {
            if (!Rn(d(), c)) return !1;
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
  function wi(e, n, i, r) {
    n &= ~wf, n &= ~Wi, e.suspendedLanes |= n, e.pingedLanes &= ~n, r && (e.warmLanes |= n), r = e.expirationTimes;
    for (var c = n; 0 < c; ) {
      var d = 31 - zt(c), b = 1 << d;
      r[d] = -1, c &= ~b;
    }
    i !== 0 && na(e, i, n);
  }
  function Ns() {
    return (it & 6) === 0 ? (Gr(0), !1) : !0;
  }
  function Tf() {
    if (Xe !== null) {
      if (ut === 0)
        var e = Xe.return;
      else
        e = Xe, Ha = Xi = null, qc(e), Cl = null, Nr = 0, e = Xe;
      for (; e !== null; )
        Zg(e.alternate, e), e = e.return;
      Xe = null;
    }
  }
  function Ul(e, n) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, kS(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), Qa = 0, Tf(), gt = e, Xe = i = La(e.current, null), Qe = n, ut = 0, On = null, vi = !1, jl = ot(e, n), Sf = !1, Hl = Ln = wf = Wi = bi = Dt = 0, Sn = Vr = null, Ef = !1, (n & 8) !== 0 && (n |= n & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= n; 0 < r; ) {
        var c = 31 - zt(r), d = 1 << c;
        n |= e[c], r &= ~d;
      }
    return Za = n, Zo(), i;
  }
  function pp(e, n) {
    ke = null, _.H = Or, n === Tl || n === es ? (n = zm(), ut = 3) : n === Ac ? (n = zm(), ut = 4) : ut = n === lf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, On = n, Xe === null && (Dt = 1, ms(
      e,
      Gn(n, e.current)
    ));
  }
  function yp() {
    var e = Dn.current;
    return e === null ? !0 : (Qe & 4194048) === Qe ? Qn === null : (Qe & 62914560) === Qe || (Qe & 536870912) !== 0 ? e === Qn : !1;
  }
  function vp() {
    var e = _.H;
    return _.H = Or, e === null ? Or : e;
  }
  function bp() {
    var e = _.A;
    return _.A = yS, e;
  }
  function Ms() {
    Dt = 4, vi || (Qe & 4194048) !== Qe && Dn.current !== null || (jl = !0), (bi & 134217727) === 0 && (Wi & 134217727) === 0 || gt === null || wi(
      gt,
      Qe,
      Ln,
      !1
    );
  }
  function Cf(e, n, i) {
    var r = it;
    it |= 2;
    var c = vp(), d = bp();
    (gt !== e || Qe !== n) && (_s = null, Ul(e, n)), n = !1;
    var b = Dt;
    e: do
      try {
        if (ut !== 0 && Xe !== null) {
          var E = Xe, Y = On;
          switch (ut) {
            case 8:
              Tf(), b = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Dn.current === null && (n = !0);
              var te = ut;
              if (ut = 0, On = null, kl(e, E, Y, te), i && jl) {
                b = 0;
                break e;
              }
              break;
            default:
              te = ut, ut = 0, On = null, kl(e, E, Y, te);
          }
        }
        xS(), b = Dt;
        break;
      } catch (ue) {
        pp(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ha = Xi = null, it = r, _.H = c, _.A = d, Xe === null && (gt = null, Qe = 0, Zo()), b;
  }
  function xS() {
    for (; Xe !== null; ) xp(Xe);
  }
  function SS(e, n) {
    var i = it;
    it |= 2;
    var r = vp(), c = bp();
    gt !== e || Qe !== n ? (_s = null, Es = yt() + 500, Ul(e, n)) : jl = ot(
      e,
      n
    );
    e: do
      try {
        if (ut !== 0 && Xe !== null) {
          n = Xe;
          var d = On;
          t: switch (ut) {
            case 1:
              ut = 0, On = null, kl(e, n, d, 1);
              break;
            case 2:
            case 9:
              if (Am(d)) {
                ut = 0, On = null, Sp(n);
                break;
              }
              n = function() {
                ut !== 2 && ut !== 9 || gt !== e || (ut = 7), wa(e);
              }, d.then(n, n);
              break e;
            case 3:
              ut = 7;
              break e;
            case 4:
              ut = 5;
              break e;
            case 7:
              Am(d) ? (ut = 0, On = null, Sp(n)) : (ut = 0, On = null, kl(e, n, d, 7));
              break;
            case 5:
              var b = null;
              switch (Xe.tag) {
                case 26:
                  b = Xe.memoizedState;
                case 5:
                case 27:
                  var E = Xe;
                  if (b ? r0(b) : E.stateNode.complete) {
                    ut = 0, On = null;
                    var Y = E.sibling;
                    if (Y !== null) Xe = Y;
                    else {
                      var te = E.return;
                      te !== null ? (Xe = te, Ts(te)) : Xe = null;
                    }
                    break t;
                  }
              }
              ut = 0, On = null, kl(e, n, d, 5);
              break;
            case 6:
              ut = 0, On = null, kl(e, n, d, 6);
              break;
            case 8:
              Tf(), Dt = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        wS();
        break;
      } catch (ue) {
        pp(e, ue);
      }
    while (!0);
    return Ha = Xi = null, _.H = r, _.A = c, it = i, Xe !== null ? 0 : (gt = null, Qe = 0, Zo(), Dt);
  }
  function wS() {
    for (; Xe !== null && !Et(); )
      xp(Xe);
  }
  function xp(e) {
    var n = Xg(e.alternate, e, Za);
    e.memoizedProps = e.pendingProps, n === null ? Ts(e) : Xe = n;
  }
  function Sp(e) {
    var n = e, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Ug(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Qe
        );
        break;
      case 11:
        n = Ug(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Qe
        );
        break;
      case 5:
        qc(n);
      default:
        Zg(i, n), n = Xe = bm(n, Za), n = Xg(i, n, Za);
    }
    e.memoizedProps = e.pendingProps, n === null ? Ts(e) : Xe = n;
  }
  function kl(e, n, i, r) {
    Ha = Xi = null, qc(n), Cl = null, Nr = 0;
    var c = n.return;
    try {
      if (cS(
        e,
        c,
        n,
        i,
        Qe
      )) {
        Dt = 1, ms(
          e,
          Gn(i, e.current)
        ), Xe = null;
        return;
      }
    } catch (d) {
      if (c !== null) throw Xe = c, d;
      Dt = 1, ms(
        e,
        Gn(i, e.current)
      ), Xe = null;
      return;
    }
    n.flags & 32768 ? (Fe || r === 1 ? e = !0 : jl || (Qe & 536870912) !== 0 ? e = !1 : (vi = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Dn.current, r !== null && r.tag === 13 && (r.flags |= 16384))), wp(n, e)) : Ts(n);
  }
  function Ts(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        wp(
          n,
          vi
        );
        return;
      }
      e = n.return;
      var i = hS(
        n.alternate,
        n,
        Za
      );
      if (i !== null) {
        Xe = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Xe = n;
        return;
      }
      Xe = n = e;
    } while (n !== null);
    Dt === 0 && (Dt = 5);
  }
  function wp(e, n) {
    do {
      var i = mS(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Xe = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (e = e.sibling, e !== null)) {
        Xe = e;
        return;
      }
      Xe = e = i;
    } while (e !== null);
    Dt = 6, Xe = null;
  }
  function Ep(e, n, i, r, c, d, b, E, Y) {
    e.cancelPendingCommit = null;
    do
      Cs();
    while (Zt !== 0);
    if ((it & 6) !== 0) throw Error(o(327));
    if (n !== null) {
      if (n === e.current) throw Error(o(177));
      if (d = n.lanes | n.childLanes, d |= gc, $t(
        e,
        i,
        d,
        b,
        E,
        Y
      ), e === gt && (Xe = gt = null, Qe = 0), Bl = n, Si = e, Qa = i, _f = d, Nf = c, dp = r, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, MS(Gt, function() {
        return Cp(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || r) {
        r = _.T, _.T = null, c = O.p, O.p = 2, b = it, it |= 4;
        try {
          gS(e, n, i);
        } finally {
          it = b, O.p = c, _.T = r;
        }
      }
      Zt = 1, _p(), Np(), Mp();
    }
  }
  function _p() {
    if (Zt === 1) {
      Zt = 0;
      var e = Si, n = Bl, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = _.T, _.T = null;
        var r = O.p;
        O.p = 2;
        var c = it;
        it |= 4;
        try {
          ip(n, e);
          var d = Yf, b = cm(e.containerInfo), E = d.focusedElem, Y = d.selectionRange;
          if (b !== E && E && E.ownerDocument && um(
            E.ownerDocument.documentElement,
            E
          )) {
            if (Y !== null && cc(E)) {
              var te = Y.start, ue = Y.end;
              if (ue === void 0 && (ue = te), "selectionStart" in E)
                E.selectionStart = te, E.selectionEnd = Math.min(
                  ue,
                  E.value.length
                );
              else {
                var fe = E.ownerDocument || document, ie = fe && fe.defaultView || window;
                if (ie.getSelection) {
                  var re = ie.getSelection(), _e = E.textContent.length, Le = Math.min(Y.start, _e), ht = Y.end === void 0 ? Le : Math.min(Y.end, _e);
                  !re.extend && Le > ht && (b = ht, ht = Le, Le = b);
                  var F = sm(
                    E,
                    Le
                  ), q = sm(
                    E,
                    ht
                  );
                  if (F && q && (re.rangeCount !== 1 || re.anchorNode !== F.node || re.anchorOffset !== F.offset || re.focusNode !== q.node || re.focusOffset !== q.offset)) {
                    var ee = fe.createRange();
                    ee.setStart(F.node, F.offset), re.removeAllRanges(), Le > ht ? (re.addRange(ee), re.extend(q.node, q.offset)) : (ee.setEnd(q.node, q.offset), re.addRange(ee));
                  }
                }
              }
            }
            for (fe = [], re = E; re = re.parentNode; )
              re.nodeType === 1 && fe.push({
                element: re,
                left: re.scrollLeft,
                top: re.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < fe.length; E++) {
              var ce = fe[E];
              ce.element.scrollLeft = ce.left, ce.element.scrollTop = ce.top;
            }
          }
          Ys = !!kf, Yf = kf = null;
        } finally {
          it = c, O.p = r, _.T = i;
        }
      }
      e.current = n, Zt = 2;
    }
  }
  function Np() {
    if (Zt === 2) {
      Zt = 0;
      var e = Si, n = Bl, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = _.T, _.T = null;
        var r = O.p;
        O.p = 2;
        var c = it;
        it |= 4;
        try {
          Wg(e, n.alternate, n);
        } finally {
          it = c, O.p = r, _.T = i;
        }
      }
      Zt = 3;
    }
  }
  function Mp() {
    if (Zt === 4 || Zt === 3) {
      Zt = 0, Qt();
      var e = Si, n = Bl, i = Qa, r = dp;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Zt = 5 : (Zt = 0, Bl = Si = null, Tp(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (c === 0 && (xi = null), P(i), n = n.stateNode, Xt && typeof Xt.onCommitFiberRoot == "function")
        try {
          Xt.onCommitFiberRoot(
            Nn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        n = _.T, c = O.p, O.p = 2, _.T = null;
        try {
          for (var d = e.onRecoverableError, b = 0; b < r.length; b++) {
            var E = r[b];
            d(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          _.T = n, O.p = c;
        }
      }
      (Qa & 3) !== 0 && Cs(), wa(e), c = e.pendingLanes, (i & 261930) !== 0 && (c & 42) !== 0 ? e === Mf ? qr++ : (qr = 0, Mf = e) : qr = 0, Gr(0);
    }
  }
  function Tp(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, Er(n)));
  }
  function Cs() {
    return _p(), Np(), Mp(), Cp();
  }
  function Cp() {
    if (Zt !== 5) return !1;
    var e = Si, n = _f;
    _f = 0;
    var i = P(Qa), r = _.T, c = O.p;
    try {
      O.p = 32 > i ? 32 : i, _.T = null, i = Nf, Nf = null;
      var d = Si, b = Qa;
      if (Zt = 0, Bl = Si = null, Qa = 0, (it & 6) !== 0) throw Error(o(331));
      var E = it;
      if (it |= 4, up(d.current), rp(
        d,
        d.current,
        b,
        i
      ), it = E, Gr(0, !1), Xt && typeof Xt.onPostCommitFiberRoot == "function")
        try {
          Xt.onPostCommitFiberRoot(Nn, d);
        } catch {
        }
      return !0;
    } finally {
      O.p = c, _.T = r, Tp(e, n);
    }
  }
  function Rp(e, n, i) {
    n = Gn(i, n), n = af(e.stateNode, n, 2), e = mi(e, n, 2), e !== null && (rt(e, 2), wa(e));
  }
  function ct(e, n, i) {
    if (e.tag === 3)
      Rp(e, e, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Rp(
            n,
            e,
            i
          );
          break;
        } else if (n.tag === 1) {
          var r = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (xi === null || !xi.has(r))) {
            e = Gn(i, e), i = Ag(2), r = mi(n, i, 2), r !== null && (Dg(
              i,
              r,
              n,
              e
            ), rt(r, 2), wa(r));
            break;
          }
        }
        n = n.return;
      }
  }
  function Rf(e, n, i) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new vS();
      var c = /* @__PURE__ */ new Set();
      r.set(n, c);
    } else
      c = r.get(n), c === void 0 && (c = /* @__PURE__ */ new Set(), r.set(n, c));
    c.has(i) || (Sf = !0, c.add(i), e = ES.bind(null, e, n, i), n.then(e, e));
  }
  function ES(e, n, i) {
    var r = e.pingCache;
    r !== null && r.delete(n), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, gt === e && (Qe & i) === i && (Dt === 4 || Dt === 3 && (Qe & 62914560) === Qe && 300 > yt() - ws ? (it & 2) === 0 && Ul(e, 0) : wf |= i, Hl === Qe && (Hl = 0)), wa(e);
  }
  function Ap(e, n) {
    n === 0 && (n = Ot()), e = Vi(e, n), e !== null && (rt(e, n), wa(e));
  }
  function _S(e) {
    var n = e.memoizedState, i = 0;
    n !== null && (i = n.retryLane), Ap(e, i);
  }
  function NS(e, n) {
    var i = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var r = e.stateNode, c = e.memoizedState;
        c !== null && (i = c.retryLane);
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
    r !== null && r.delete(n), Ap(e, i);
  }
  function MS(e, n) {
    return qt(e, n);
  }
  var Rs = null, Yl = null, Af = !1, As = !1, Df = !1, Ei = 0;
  function wa(e) {
    e !== Yl && e.next === null && (Yl === null ? Rs = Yl = e : Yl = Yl.next = e), As = !0, Af || (Af = !0, CS());
  }
  function Gr(e, n) {
    if (!Df && As) {
      Df = !0;
      do
        for (var i = !1, r = Rs; r !== null; ) {
          if (e !== 0) {
            var c = r.pendingLanes;
            if (c === 0) var d = 0;
            else {
              var b = r.suspendedLanes, E = r.pingedLanes;
              d = (1 << 31 - zt(42 | e) + 1) - 1, d &= c & ~(b & ~E), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, Lp(r, d));
          } else
            d = Qe, d = je(
              r,
              r === gt ? d : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (d & 3) === 0 || ot(r, d) || (i = !0, Lp(r, d));
          r = r.next;
        }
      while (i);
      Df = !1;
    }
  }
  function TS() {
    Dp();
  }
  function Dp() {
    As = Af = !1;
    var e = 0;
    Ei !== 0 && US() && (e = Ei);
    for (var n = yt(), i = null, r = Rs; r !== null; ) {
      var c = r.next, d = zp(r, n);
      d === 0 ? (r.next = null, i === null ? Rs = c : i.next = c, c === null && (Yl = i)) : (i = r, (e !== 0 || (d & 3) !== 0) && (As = !0)), r = c;
    }
    Zt !== 0 && Zt !== 5 || Gr(e), Ei !== 0 && (Ei = 0);
  }
  function zp(e, n) {
    for (var i = e.suspendedLanes, r = e.pingedLanes, c = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var b = 31 - zt(d), E = 1 << b, Y = c[b];
      Y === -1 ? ((E & i) === 0 || (E & r) !== 0) && (c[b] = Rt(E, n)) : Y <= n && (e.expiredLanes |= E), d &= ~E;
    }
    if (n = gt, i = Qe, i = je(
      e,
      e === n ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, i === 0 || e === n && (ut === 2 || ut === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && Jt(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || ot(e, i)) {
      if (n = i & -i, n === e.callbackPriority) return n;
      switch (r !== null && Jt(r), P(i)) {
        case 2:
        case 8:
          i = Pt;
          break;
        case 32:
          i = Gt;
          break;
        case 268435456:
          i = Mt;
          break;
        default:
          i = Gt;
      }
      return r = Op.bind(null, e), i = qt(i, r), e.callbackPriority = n, e.callbackNode = i, n;
    }
    return r !== null && r !== null && Jt(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Op(e, n) {
    if (Zt !== 0 && Zt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (Cs() && e.callbackNode !== i)
      return null;
    var r = Qe;
    return r = je(
      e,
      e === gt ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (mp(e, r, n), zp(e, yt()), e.callbackNode != null && e.callbackNode === i ? Op.bind(null, e) : null);
  }
  function Lp(e, n) {
    if (Cs()) return null;
    mp(e, n, !0);
  }
  function CS() {
    YS(function() {
      (it & 6) !== 0 ? qt(
        Nt,
        TS
      ) : Dp();
    });
  }
  function zf() {
    if (Ei === 0) {
      var e = Nl;
      e === 0 && (e = ta, ta <<= 1, (ta & 261888) === 0 && (ta = 256)), Ei = e;
    }
    return Ei;
  }
  function jp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Uo("" + e);
  }
  function Hp(e, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, e.id && i.setAttribute("form", e.id), n.parentNode.insertBefore(i, n), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function RS(e, n, i, r, c) {
    if (n === "submit" && i && i.stateNode === c) {
      var d = jp(
        (c[xe] || null).action
      ), b = r.submitter;
      b && (n = (n = b[xe] || null) ? jp(n.formAction) : b.getAttribute("formAction"), n !== null && (d = n, b = null));
      var E = new qo(
        "action",
        "action",
        null,
        r,
        c
      );
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (r.defaultPrevented) {
                if (Ei !== 0) {
                  var Y = b ? Hp(c, b) : new FormData(c);
                  Jc(
                    i,
                    {
                      pending: !0,
                      data: Y,
                      method: c.method,
                      action: d
                    },
                    null,
                    Y
                  );
                }
              } else
                typeof d == "function" && (E.preventDefault(), Y = b ? Hp(c, b) : new FormData(c), Jc(
                  i,
                  {
                    pending: !0,
                    data: Y,
                    method: c.method,
                    action: d
                  },
                  d,
                  Y
                ));
            },
            currentTarget: c
          }
        ]
      });
    }
  }
  for (var Of = 0; Of < mc.length; Of++) {
    var Lf = mc[Of], AS = Lf.toLowerCase(), DS = Lf[0].toUpperCase() + Lf.slice(1);
    la(
      AS,
      "on" + DS
    );
  }
  la(hm, "onAnimationEnd"), la(mm, "onAnimationIteration"), la(gm, "onAnimationStart"), la("dblclick", "onDoubleClick"), la("focusin", "onFocus"), la("focusout", "onBlur"), la(Qx, "onTransitionRun"), la(Kx, "onTransitionStart"), la(Ix, "onTransitionCancel"), la(pm, "onTransitionEnd"), en("onMouseEnter", ["mouseout", "mouseover"]), en("onMouseLeave", ["mouseout", "mouseover"]), en("onPointerEnter", ["pointerout", "pointerover"]), en("onPointerLeave", ["pointerout", "pointerover"]), sn(
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
  ), zS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xr)
  );
  function Bp(e, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var r = e[i], c = r.event;
      r = r.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var b = r.length - 1; 0 <= b; b--) {
            var E = r[b], Y = E.instance, te = E.currentTarget;
            if (E = E.listener, Y !== d && c.isPropagationStopped())
              break e;
            d = E, c.currentTarget = te;
            try {
              d(c);
            } catch (ue) {
              $o(ue);
            }
            c.currentTarget = null, d = Y;
          }
        else
          for (b = 0; b < r.length; b++) {
            if (E = r[b], Y = E.instance, te = E.currentTarget, E = E.listener, Y !== d && c.isPropagationStopped())
              break e;
            d = E, c.currentTarget = te;
            try {
              d(c);
            } catch (ue) {
              $o(ue);
            }
            c.currentTarget = null, d = Y;
          }
      }
    }
  }
  function $e(e, n) {
    var i = n[Me];
    i === void 0 && (i = n[Me] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    i.has(r) || (Up(n, e, 2, !1), i.add(r));
  }
  function jf(e, n, i) {
    var r = 0;
    n && (r |= 4), Up(
      i,
      e,
      r,
      n
    );
  }
  var Ds = "_reactListening" + Math.random().toString(36).slice(2);
  function Hf(e) {
    if (!e[Ds]) {
      e[Ds] = !0, va.forEach(function(i) {
        i !== "selectionchange" && (zS.has(i) || jf(i, !1, e), jf(i, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Ds] || (n[Ds] = !0, jf("selectionchange", !1, n));
    }
  }
  function Up(e, n, i, r) {
    switch (h0(n)) {
      case 2:
        var c = rw;
        break;
      case 8:
        c = ow;
        break;
      default:
        c = Jf;
    }
    i = c.bind(
      null,
      n,
      i,
      e
    ), c = void 0, !tc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (c = !0), r ? c !== void 0 ? e.addEventListener(n, i, {
      capture: !0,
      passive: c
    }) : e.addEventListener(n, i, !0) : c !== void 0 ? e.addEventListener(n, i, {
      passive: c
    }) : e.addEventListener(n, i, !1);
  }
  function Bf(e, n, i, r, c) {
    var d = r;
    if ((n & 1) === 0 && (n & 2) === 0 && r !== null)
      e: for (; ; ) {
        if (r === null) return;
        var b = r.tag;
        if (b === 3 || b === 4) {
          var E = r.stateNode.containerInfo;
          if (E === c) break;
          if (b === 4)
            for (b = r.return; b !== null; ) {
              var Y = b.tag;
              if ((Y === 3 || Y === 4) && b.stateNode.containerInfo === c)
                return;
              b = b.return;
            }
          for (; E !== null; ) {
            if (b = mt(E), b === null) return;
            if (Y = b.tag, Y === 5 || Y === 6 || Y === 26 || Y === 27) {
              r = d = b;
              continue e;
            }
            E = E.parentNode;
          }
        }
        r = r.return;
      }
    Gh(function() {
      var te = d, ue = Wu(i), fe = [];
      e: {
        var ie = ym.get(e);
        if (ie !== void 0) {
          var re = qo, _e = e;
          switch (e) {
            case "keypress":
              if (Yo(i) === 0) break e;
            case "keydown":
            case "keyup":
              re = Nx;
              break;
            case "focusin":
              _e = "focus", re = lc;
              break;
            case "focusout":
              _e = "blur", re = lc;
              break;
            case "beforeblur":
            case "afterblur":
              re = lc;
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
              re = Zh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              re = hx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              re = Cx;
              break;
            case hm:
            case mm:
            case gm:
              re = px;
              break;
            case pm:
              re = Ax;
              break;
            case "scroll":
            case "scrollend":
              re = fx;
              break;
            case "wheel":
              re = zx;
              break;
            case "copy":
            case "cut":
            case "paste":
              re = vx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              re = Kh;
              break;
            case "toggle":
            case "beforetoggle":
              re = Lx;
          }
          var Le = (n & 4) !== 0, ht = !Le && (e === "scroll" || e === "scrollend"), F = Le ? ie !== null ? ie + "Capture" : null : ie;
          Le = [];
          for (var q = te, ee; q !== null; ) {
            var ce = q;
            if (ee = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || ee === null || F === null || (ce = dr(q, F), ce != null && Le.push(
              $r(q, ce, ee)
            )), ht) break;
            q = q.return;
          }
          0 < Le.length && (ie = new re(
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
          if (ie = e === "mouseover" || e === "pointerover", re = e === "mouseout" || e === "pointerout", ie && i !== Pu && (_e = i.relatedTarget || i.fromElement) && (mt(_e) || _e[be]))
            break e;
          if ((re || ie) && (ie = ue.window === ue ? ue : (ie = ue.ownerDocument) ? ie.defaultView || ie.parentWindow : window, re ? (_e = i.relatedTarget || i.toElement, re = te, _e = _e ? mt(_e) : null, _e !== null && (ht = u(_e), Le = _e.tag, _e !== ht || Le !== 5 && Le !== 27 && Le !== 6) && (_e = null)) : (re = null, _e = te), re !== _e)) {
            if (Le = Zh, ce = "onMouseLeave", F = "onMouseEnter", q = "mouse", (e === "pointerout" || e === "pointerover") && (Le = Kh, ce = "onPointerLeave", F = "onPointerEnter", q = "pointer"), ht = re == null ? ie : Ze(re), ee = _e == null ? ie : Ze(_e), ie = new Le(
              ce,
              q + "leave",
              re,
              i,
              ue
            ), ie.target = ht, ie.relatedTarget = ee, ce = null, mt(ue) === te && (Le = new Le(
              F,
              q + "enter",
              _e,
              i,
              ue
            ), Le.target = ee, Le.relatedTarget = ht, ce = Le), ht = ce, re && _e)
              t: {
                for (Le = OS, F = re, q = _e, ee = 0, ce = F; ce; ce = Le(ce))
                  ee++;
                ce = 0;
                for (var Re = q; Re; Re = Le(Re))
                  ce++;
                for (; 0 < ee - ce; )
                  F = Le(F), ee--;
                for (; 0 < ce - ee; )
                  q = Le(q), ce--;
                for (; ee--; ) {
                  if (F === q || q !== null && F === q.alternate) {
                    Le = F;
                    break t;
                  }
                  F = Le(F), q = Le(q);
                }
                Le = null;
              }
            else Le = null;
            re !== null && kp(
              fe,
              ie,
              re,
              Le,
              !1
            ), _e !== null && ht !== null && kp(
              fe,
              ht,
              _e,
              Le,
              !0
            );
          }
        }
        e: {
          if (ie = te ? Ze(te) : window, re = ie.nodeName && ie.nodeName.toLowerCase(), re === "select" || re === "input" && ie.type === "file")
            var et = nm;
          else if (em(ie))
            if (am)
              et = Xx;
            else {
              et = qx;
              var Ne = Vx;
            }
          else
            re = ie.nodeName, !re || re.toLowerCase() !== "input" || ie.type !== "checkbox" && ie.type !== "radio" ? te && Ju(te.elementType) && (et = nm) : et = Gx;
          if (et && (et = et(e, te))) {
            tm(
              fe,
              et,
              i,
              ue
            );
            break e;
          }
          Ne && Ne(e, ie, te), e === "focusout" && te && ie.type === "number" && te.memoizedProps.value != null && cr(ie, "number", ie.value);
        }
        switch (Ne = te ? Ze(te) : window, e) {
          case "focusin":
            (em(Ne) || Ne.contentEditable === "true") && (yl = Ne, fc = te, xr = null);
            break;
          case "focusout":
            xr = fc = yl = null;
            break;
          case "mousedown":
            dc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            dc = !1, fm(fe, i, ue);
            break;
          case "selectionchange":
            if (Zx) break;
          case "keydown":
          case "keyup":
            fm(fe, i, ue);
        }
        var Ye;
        if (oc)
          e: {
            switch (e) {
              case "compositionstart":
                var Ke = "onCompositionStart";
                break e;
              case "compositionend":
                Ke = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ke = "onCompositionUpdate";
                break e;
            }
            Ke = void 0;
          }
        else
          pl ? Ph(e, i) && (Ke = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (Ke = "onCompositionStart");
        Ke && (Ih && i.locale !== "ko" && (pl || Ke !== "onCompositionStart" ? Ke === "onCompositionEnd" && pl && (Ye = Xh()) : (oi = ue, nc = "value" in oi ? oi.value : oi.textContent, pl = !0)), Ne = zs(te, Ke), 0 < Ne.length && (Ke = new Qh(
          Ke,
          e,
          null,
          i,
          ue
        ), fe.push({ event: Ke, listeners: Ne }), Ye ? Ke.data = Ye : (Ye = Wh(i), Ye !== null && (Ke.data = Ye)))), (Ye = Hx ? Bx(e, i) : Ux(e, i)) && (Ke = zs(te, "onBeforeInput"), 0 < Ke.length && (Ne = new Qh(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ue
        ), fe.push({
          event: Ne,
          listeners: Ke
        }), Ne.data = Ye)), RS(
          fe,
          e,
          te,
          i,
          ue
        );
      }
      Bp(fe, n);
    });
  }
  function $r(e, n, i) {
    return {
      instance: e,
      listener: n,
      currentTarget: i
    };
  }
  function zs(e, n) {
    for (var i = n + "Capture", r = []; e !== null; ) {
      var c = e, d = c.stateNode;
      if (c = c.tag, c !== 5 && c !== 26 && c !== 27 || d === null || (c = dr(e, i), c != null && r.unshift(
        $r(e, c, d)
      ), c = dr(e, n), c != null && r.push(
        $r(e, c, d)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function OS(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function kp(e, n, i, r, c) {
    for (var d = n._reactName, b = []; i !== null && i !== r; ) {
      var E = i, Y = E.alternate, te = E.stateNode;
      if (E = E.tag, Y !== null && Y === r) break;
      E !== 5 && E !== 26 && E !== 27 || te === null || (Y = te, c ? (te = dr(i, d), te != null && b.unshift(
        $r(i, te, Y)
      )) : c || (te = dr(i, d), te != null && b.push(
        $r(i, te, Y)
      ))), i = i.return;
    }
    b.length !== 0 && e.push({ event: n, listeners: b });
  }
  var LS = /\r\n?/g, jS = /\u0000|\uFFFD/g;
  function Yp(e) {
    return (typeof e == "string" ? e : "" + e).replace(LS, `
`).replace(jS, "");
  }
  function Vp(e, n) {
    return n = Yp(n), Yp(e) === n;
  }
  function dt(e, n, i, r, c, d) {
    switch (i) {
      case "children":
        typeof r == "string" ? n === "body" || n === "textarea" && r === "" || hl(e, r) : (typeof r == "number" || typeof r == "bigint") && n !== "body" && hl(e, "" + r);
        break;
      case "className":
        ia(e, "class", r);
        break;
      case "tabIndex":
        ia(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ia(e, i, r);
        break;
      case "style":
        Vh(e, r, d);
        break;
      case "data":
        if (n !== "object") {
          ia(e, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (n !== "a" || i !== "href")) {
          e.removeAttribute(i);
          break;
        }
        if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(i);
          break;
        }
        r = Uo("" + r), e.setAttribute(i, r);
        break;
      case "action":
      case "formAction":
        if (typeof r == "function") {
          e.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof d == "function" && (i === "formAction" ? (n !== "input" && dt(e, n, "name", c.name, c, null), dt(
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
          e.removeAttribute(i);
          break;
        }
        r = Uo("" + r), e.setAttribute(i, r);
        break;
      case "onClick":
        r != null && (e.onclick = za);
        break;
      case "onScroll":
        r != null && $e("scroll", e);
        break;
      case "onScrollEnd":
        r != null && $e("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(o(61));
          if (i = r.__html, i != null) {
            if (c.children != null) throw Error(o(60));
            e.innerHTML = i;
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
        i = Uo("" + r), e.setAttributeNS(
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
        r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(i, "" + r) : e.removeAttribute(i);
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
        r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(i, "") : e.removeAttribute(i);
        break;
      case "capture":
      case "download":
        r === !0 ? e.setAttribute(i, "") : r !== !1 && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(i, r) : e.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(i, r) : e.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(i) : e.setAttribute(i, r);
        break;
      case "popover":
        $e("beforetoggle", e), $e("toggle", e), aa(e, "popover", r);
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
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = ux.get(i) || i, aa(e, i, r));
    }
  }
  function Uf(e, n, i, r, c, d) {
    switch (i) {
      case "style":
        Vh(e, r, d);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(o(61));
          if (i = r.__html, i != null) {
            if (c.children != null) throw Error(o(60));
            e.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof r == "string" ? hl(e, r) : (typeof r == "number" || typeof r == "bigint") && hl(e, "" + r);
        break;
      case "onScroll":
        r != null && $e("scroll", e);
        break;
      case "onScrollEnd":
        r != null && $e("scrollend", e);
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
        if (!Tn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (c = i.endsWith("Capture"), n = i.slice(2, c ? i.length - 7 : void 0), d = e[xe] || null, d = d != null ? d[i] : null, typeof d == "function" && e.removeEventListener(n, d, c), typeof r == "function")) {
              typeof d != "function" && d !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(n, r, c);
              break e;
            }
            i in e ? e[i] = r : r === !0 ? e.setAttribute(i, "") : aa(e, i, r);
          }
    }
  }
  function rn(e, n, i) {
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
        $e("error", e), $e("load", e);
        var r = !1, c = !1, d;
        for (d in i)
          if (i.hasOwnProperty(d)) {
            var b = i[d];
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
                  dt(e, n, d, b, i, null);
              }
          }
        c && dt(e, n, "srcSet", i.srcSet, i, null), r && dt(e, n, "src", i.src, i, null);
        return;
      case "input":
        $e("invalid", e);
        var E = d = b = c = null, Y = null, te = null;
        for (r in i)
          if (i.hasOwnProperty(r)) {
            var ue = i[r];
            if (ue != null)
              switch (r) {
                case "name":
                  c = ue;
                  break;
                case "type":
                  b = ue;
                  break;
                case "checked":
                  Y = ue;
                  break;
                case "defaultChecked":
                  te = ue;
                  break;
                case "value":
                  d = ue;
                  break;
                case "defaultValue":
                  E = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(o(137, n));
                  break;
                default:
                  dt(e, n, r, ue, i, null);
              }
          }
        dl(
          e,
          d,
          E,
          Y,
          te,
          b,
          c,
          !1
        );
        return;
      case "select":
        $e("invalid", e), r = b = d = null;
        for (c in i)
          if (i.hasOwnProperty(c) && (E = i[c], E != null))
            switch (c) {
              case "value":
                d = E;
                break;
              case "defaultValue":
                b = E;
                break;
              case "multiple":
                r = E;
              default:
                dt(e, n, c, E, i, null);
            }
        n = d, i = b, e.multiple = !!r, n != null ? ri(e, !!r, n, !1) : i != null && ri(e, !!r, i, !0);
        return;
      case "textarea":
        $e("invalid", e), d = c = r = null;
        for (b in i)
          if (i.hasOwnProperty(b) && (E = i[b], E != null))
            switch (b) {
              case "value":
                r = E;
                break;
              case "defaultValue":
                c = E;
                break;
              case "children":
                d = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(o(91));
                break;
              default:
                dt(e, n, b, E, i, null);
            }
        kh(e, r, c, d);
        return;
      case "option":
        for (Y in i)
          if (i.hasOwnProperty(Y) && (r = i[Y], r != null))
            switch (Y) {
              case "selected":
                e.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                dt(e, n, Y, r, i, null);
            }
        return;
      case "dialog":
        $e("beforetoggle", e), $e("toggle", e), $e("cancel", e), $e("close", e);
        break;
      case "iframe":
      case "object":
        $e("load", e);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Xr.length; r++)
          $e(Xr[r], e);
        break;
      case "image":
        $e("error", e), $e("load", e);
        break;
      case "details":
        $e("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        $e("error", e), $e("load", e);
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
        for (te in i)
          if (i.hasOwnProperty(te) && (r = i[te], r != null))
            switch (te) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, n));
              default:
                dt(e, n, te, r, i, null);
            }
        return;
      default:
        if (Ju(n)) {
          for (ue in i)
            i.hasOwnProperty(ue) && (r = i[ue], r !== void 0 && Uf(
              e,
              n,
              ue,
              r,
              i,
              void 0
            ));
          return;
        }
    }
    for (E in i)
      i.hasOwnProperty(E) && (r = i[E], r != null && dt(e, n, E, r, i, null));
  }
  function HS(e, n, i, r) {
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
        var c = null, d = null, b = null, E = null, Y = null, te = null, ue = null;
        for (re in i) {
          var fe = i[re];
          if (i.hasOwnProperty(re) && fe != null)
            switch (re) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                Y = fe;
              default:
                r.hasOwnProperty(re) || dt(e, n, re, null, r, fe);
            }
        }
        for (var ie in r) {
          var re = r[ie];
          if (fe = i[ie], r.hasOwnProperty(ie) && (re != null || fe != null))
            switch (ie) {
              case "type":
                d = re;
                break;
              case "name":
                c = re;
                break;
              case "checked":
                te = re;
                break;
              case "defaultChecked":
                ue = re;
                break;
              case "value":
                b = re;
                break;
              case "defaultValue":
                E = re;
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
        Bi(
          e,
          b,
          E,
          Y,
          te,
          ue,
          d,
          c
        );
        return;
      case "select":
        re = b = E = ie = null;
        for (d in i)
          if (Y = i[d], i.hasOwnProperty(d) && Y != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                re = Y;
              default:
                r.hasOwnProperty(d) || dt(
                  e,
                  n,
                  d,
                  null,
                  r,
                  Y
                );
            }
        for (c in r)
          if (d = r[c], Y = i[c], r.hasOwnProperty(c) && (d != null || Y != null))
            switch (c) {
              case "value":
                ie = d;
                break;
              case "defaultValue":
                E = d;
                break;
              case "multiple":
                b = d;
              default:
                d !== Y && dt(
                  e,
                  n,
                  c,
                  d,
                  r,
                  Y
                );
            }
        n = E, i = b, r = re, ie != null ? ri(e, !!i, ie, !1) : !!r != !!i && (n != null ? ri(e, !!i, n, !0) : ri(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        re = ie = null;
        for (E in i)
          if (c = i[E], i.hasOwnProperty(E) && c != null && !r.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                dt(e, n, E, null, r, c);
            }
        for (b in r)
          if (c = r[b], d = i[b], r.hasOwnProperty(b) && (c != null || d != null))
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
        fr(e, ie, re);
        return;
      case "option":
        for (var _e in i)
          if (ie = i[_e], i.hasOwnProperty(_e) && ie != null && !r.hasOwnProperty(_e))
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
        for (Y in r)
          if (ie = r[Y], re = i[Y], r.hasOwnProperty(Y) && ie !== re && (ie != null || re != null))
            switch (Y) {
              case "selected":
                e.selected = ie && typeof ie != "function" && typeof ie != "symbol";
                break;
              default:
                dt(
                  e,
                  n,
                  Y,
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
        for (var Le in i)
          ie = i[Le], i.hasOwnProperty(Le) && ie != null && !r.hasOwnProperty(Le) && dt(e, n, Le, null, r, ie);
        for (te in r)
          if (ie = r[te], re = i[te], r.hasOwnProperty(te) && ie !== re && (ie != null || re != null))
            switch (te) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (ie != null)
                  throw Error(o(137, n));
                break;
              default:
                dt(
                  e,
                  n,
                  te,
                  ie,
                  r,
                  re
                );
            }
        return;
      default:
        if (Ju(n)) {
          for (var ht in i)
            ie = i[ht], i.hasOwnProperty(ht) && ie !== void 0 && !r.hasOwnProperty(ht) && Uf(
              e,
              n,
              ht,
              void 0,
              r,
              ie
            );
          for (ue in r)
            ie = r[ue], re = i[ue], !r.hasOwnProperty(ue) || ie === re || ie === void 0 && re === void 0 || Uf(
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
    for (var F in i)
      ie = i[F], i.hasOwnProperty(F) && ie != null && !r.hasOwnProperty(F) && dt(e, n, F, null, r, ie);
    for (fe in r)
      ie = r[fe], re = i[fe], !r.hasOwnProperty(fe) || ie === re || ie == null && re == null || dt(e, n, fe, ie, r, re);
  }
  function qp(e) {
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
  function BS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, i = performance.getEntriesByType("resource"), r = 0; r < i.length; r++) {
        var c = i[r], d = c.transferSize, b = c.initiatorType, E = c.duration;
        if (d && E && qp(b)) {
          for (b = 0, E = c.responseEnd, r += 1; r < i.length; r++) {
            var Y = i[r], te = Y.startTime;
            if (te > E) break;
            var ue = Y.transferSize, fe = Y.initiatorType;
            ue && qp(fe) && (Y = Y.responseEnd, b += ue * (Y < E ? 1 : (E - te) / (Y - te)));
          }
          if (--r, n += 8 * (d + b) / (c.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var kf = null, Yf = null;
  function Os(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Gp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Xp(e, n) {
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
  function Vf(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var qf = null;
  function US() {
    var e = window.event;
    return e && e.type === "popstate" ? e === qf ? !1 : (qf = e, !0) : (qf = null, !1);
  }
  var $p = typeof setTimeout == "function" ? setTimeout : void 0, kS = typeof clearTimeout == "function" ? clearTimeout : void 0, Zp = typeof Promise == "function" ? Promise : void 0, YS = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zp < "u" ? function(e) {
    return Zp.resolve(null).then(e).catch(VS);
  } : $p;
  function VS(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function _i(e) {
    return e === "head";
  }
  function Qp(e, n) {
    var i = n, r = 0;
    do {
      var c = i.nextSibling;
      if (e.removeChild(i), c && c.nodeType === 8)
        if (i = c.data, i === "/$" || i === "/&") {
          if (r === 0) {
            e.removeChild(c), Xl(n);
            return;
          }
          r--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          r++;
        else if (i === "html")
          Zr(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, Zr(i);
          for (var d = i.firstChild; d; ) {
            var b = d.nextSibling, E = d.nodeName;
            d[Ve] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = b;
          }
        } else
          i === "body" && Zr(e.ownerDocument.body);
      i = c;
    } while (i);
    Xl(n);
  }
  function Kp(e, n) {
    var i = e;
    e = 0;
    do {
      var r = i.nextSibling;
      if (i.nodeType === 1 ? n ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (n ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), r && r.nodeType === 8)
        if (i = r.data, i === "/$") {
          if (e === 0) break;
          e--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || e++;
      i = r;
    } while (i);
  }
  function Gf(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Gf(i), Je(i);
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
  function qS(e, n, i, r) {
    for (; e.nodeType === 1; ) {
      var c = i;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (r) {
        if (!e[Ve])
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
      if (e = Kn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function GS(e, n, i) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = Kn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ip(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Kn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Xf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function $f(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function XS(e, n) {
    var i = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || i.readyState !== "loading")
      n();
    else {
      var r = function() {
        n(), i.removeEventListener("DOMContentLoaded", r);
      };
      i.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
    }
  }
  function Kn(e) {
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
  function Fp(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return Kn(e.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Jp(e) {
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
  function Pp(e, n, i) {
    switch (n = Os(i), e) {
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
  function Zr(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    Je(e);
  }
  var In = /* @__PURE__ */ new Map(), Wp = /* @__PURE__ */ new Set();
  function Ls(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ka = O.d;
  O.d = {
    f: $S,
    r: ZS,
    D: QS,
    C: KS,
    L: IS,
    m: FS,
    X: PS,
    S: JS,
    M: WS
  };
  function $S() {
    var e = Ka.f(), n = Ns();
    return e || n;
  }
  function ZS(e) {
    var n = We(e);
    n !== null && n.tag === 5 && n.type === "form" ? pg(n) : Ka.r(e);
  }
  var Vl = typeof document > "u" ? null : document;
  function e0(e, n, i) {
    var r = Vl;
    if (r && typeof n == "string" && n) {
      var c = tn(n);
      c = 'link[rel="' + e + '"][href="' + c + '"]', typeof i == "string" && (c += '[crossorigin="' + i + '"]'), Wp.has(c) || (Wp.add(c), e = { rel: e, crossOrigin: i, href: n }, r.querySelector(c) === null && (n = r.createElement("link"), rn(n, "link", e), Ie(n), r.head.appendChild(n)));
    }
  }
  function QS(e) {
    Ka.D(e), e0("dns-prefetch", e, null);
  }
  function KS(e, n) {
    Ka.C(e, n), e0("preconnect", e, n);
  }
  function IS(e, n, i) {
    Ka.L(e, n, i);
    var r = Vl;
    if (r && e && n) {
      var c = 'link[rel="preload"][as="' + tn(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (c += '[imagesrcset="' + tn(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (c += '[imagesizes="' + tn(
        i.imageSizes
      ) + '"]')) : c += '[href="' + tn(e) + '"]';
      var d = c;
      switch (n) {
        case "style":
          d = ql(e);
          break;
        case "script":
          d = Gl(e);
      }
      In.has(d) || (e = m(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : e,
          as: n
        },
        i
      ), In.set(d, e), r.querySelector(c) !== null || n === "style" && r.querySelector(Qr(d)) || n === "script" && r.querySelector(Kr(d)) || (n = r.createElement("link"), rn(n, "link", e), Ie(n), r.head.appendChild(n)));
    }
  }
  function FS(e, n) {
    Ka.m(e, n);
    var i = Vl;
    if (i && e) {
      var r = n && typeof n.as == "string" ? n.as : "script", c = 'link[rel="modulepreload"][as="' + tn(r) + '"][href="' + tn(e) + '"]', d = c;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = Gl(e);
      }
      if (!In.has(d) && (e = m({ rel: "modulepreload", href: e }, n), In.set(d, e), i.querySelector(c) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Kr(d)))
              return;
        }
        r = i.createElement("link"), rn(r, "link", e), Ie(r), i.head.appendChild(r);
      }
    }
  }
  function JS(e, n, i) {
    Ka.S(e, n, i);
    var r = Vl;
    if (r && e) {
      var c = Ct(r).hoistableStyles, d = ql(e);
      n = n || "default";
      var b = c.get(d);
      if (!b) {
        var E = { loading: 0, preload: null };
        if (b = r.querySelector(
          Qr(d)
        ))
          E.loading = 5;
        else {
          e = m(
            { rel: "stylesheet", href: e, "data-precedence": n },
            i
          ), (i = In.get(d)) && Qf(e, i);
          var Y = b = r.createElement("link");
          Ie(Y), rn(Y, "link", e), Y._p = new Promise(function(te, ue) {
            Y.onload = te, Y.onerror = ue;
          }), Y.addEventListener("load", function() {
            E.loading |= 1;
          }), Y.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, js(b, n, r);
        }
        b = {
          type: "stylesheet",
          instance: b,
          count: 1,
          state: E
        }, c.set(d, b);
      }
    }
  }
  function PS(e, n) {
    Ka.X(e, n);
    var i = Vl;
    if (i && e) {
      var r = Ct(i).hoistableScripts, c = Gl(e), d = r.get(c);
      d || (d = i.querySelector(Kr(c)), d || (e = m({ src: e, async: !0 }, n), (n = In.get(c)) && Kf(e, n), d = i.createElement("script"), Ie(d), rn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, r.set(c, d));
    }
  }
  function WS(e, n) {
    Ka.M(e, n);
    var i = Vl;
    if (i && e) {
      var r = Ct(i).hoistableScripts, c = Gl(e), d = r.get(c);
      d || (d = i.querySelector(Kr(c)), d || (e = m({ src: e, async: !0, type: "module" }, n), (n = In.get(c)) && Kf(e, n), d = i.createElement("script"), Ie(d), rn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, r.set(c, d));
    }
  }
  function t0(e, n, i, r) {
    var c = (c = me.current) ? Ls(c) : null;
    if (!c) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = ql(i.href), i = Ct(
          c
        ).hoistableStyles, r = i.get(n), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = ql(i.href);
          var d = Ct(
            c
          ).hoistableStyles, b = d.get(e);
          if (b || (c = c.ownerDocument || c, b = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(e, b), (d = c.querySelector(
            Qr(e)
          )) && !d._p && (b.instance = d, b.state.loading = 5), In.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, In.set(e, i), d || ew(
            c,
            e,
            i,
            b.state
          ))), n && r === null)
            throw Error(o(528, ""));
          return b;
        }
        if (n && r !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Gl(i), i = Ct(
          c
        ).hoistableScripts, r = i.get(n), r || (r = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, r)), r) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, e));
    }
  }
  function ql(e) {
    return 'href="' + tn(e) + '"';
  }
  function Qr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function n0(e) {
    return m({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function ew(e, n, i, r) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? r.loading = 1 : (n = e.createElement("link"), r.preload = n, n.addEventListener("load", function() {
      return r.loading |= 1;
    }), n.addEventListener("error", function() {
      return r.loading |= 2;
    }), rn(n, "link", i), Ie(n), e.head.appendChild(n));
  }
  function Gl(e) {
    return '[src="' + tn(e) + '"]';
  }
  function Kr(e) {
    return "script[async]" + e;
  }
  function a0(e, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + tn(i.href) + '"]'
          );
          if (r)
            return n.instance = r, Ie(r), r;
          var c = m({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), Ie(r), rn(r, "style", c), js(r, i.precedence, e), n.instance = r;
        case "stylesheet":
          c = ql(i.href);
          var d = e.querySelector(
            Qr(c)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, Ie(d), d;
          r = n0(i), (c = In.get(c)) && Qf(r, c), d = (e.ownerDocument || e).createElement("link"), Ie(d);
          var b = d;
          return b._p = new Promise(function(E, Y) {
            b.onload = E, b.onerror = Y;
          }), rn(d, "link", r), n.state.loading |= 4, js(d, i.precedence, e), n.instance = d;
        case "script":
          return d = Gl(i.src), (c = e.querySelector(
            Kr(d)
          )) ? (n.instance = c, Ie(c), c) : (r = i, (c = In.get(d)) && (r = m({}, i), Kf(r, c)), e = e.ownerDocument || e, c = e.createElement("script"), Ie(c), rn(c, "link", r), e.head.appendChild(c), n.instance = c);
        case "void":
          return null;
        default:
          throw Error(o(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (r = n.instance, n.state.loading |= 4, js(r, i.precedence, e));
    return n.instance;
  }
  function js(e, n, i) {
    for (var r = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), c = r.length ? r[r.length - 1] : null, d = c, b = 0; b < r.length; b++) {
      var E = r[b];
      if (E.dataset.precedence === n) d = E;
      else if (d !== c) break;
    }
    d ? d.parentNode.insertBefore(e, d.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(e, n.firstChild));
  }
  function Qf(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Kf(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Hs = null;
  function i0(e, n, i) {
    if (Hs === null) {
      var r = /* @__PURE__ */ new Map(), c = Hs = /* @__PURE__ */ new Map();
      c.set(i, r);
    } else
      c = Hs, r = c.get(i), r || (r = /* @__PURE__ */ new Map(), c.set(i, r));
    if (r.has(e)) return r;
    for (r.set(e, null), i = i.getElementsByTagName(e), c = 0; c < i.length; c++) {
      var d = i[c];
      if (!(d[Ve] || d[ve] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var b = d.getAttribute(n) || "";
        b = e + b;
        var E = r.get(b);
        E ? E.push(d) : r.set(b, [d]);
      }
    }
    return r;
  }
  function l0(e, n, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function tw(e, n, i) {
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
  function r0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function nw(e, n, i, r) {
    if (i.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var c = ql(r.href), d = n.querySelector(
          Qr(c)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Bs.bind(e), n.then(e, e)), i.state.loading |= 4, i.instance = d, Ie(d);
          return;
        }
        d = n.ownerDocument || n, r = n0(r), (c = In.get(c)) && Qf(r, c), d = d.createElement("link"), Ie(d);
        var b = d;
        b._p = new Promise(function(E, Y) {
          b.onload = E, b.onerror = Y;
        }), rn(d, "link", r), i.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Bs.bind(e), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var If = 0;
  function aw(e, n) {
    return e.stylesheets && e.count === 0 && ks(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var r = setTimeout(function() {
        if (e.stylesheets && ks(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < e.imgBytes && If === 0 && (If = 62500 * BS());
      var c = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ks(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > If ? 50 : 800) + n
      );
      return e.unsuspend = i, function() {
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Us = /* @__PURE__ */ new Map(), n.forEach(iw, e), Us = null, Bs.call(e));
  }
  function iw(e, n) {
    if (!(n.state.loading & 4)) {
      var i = Us.get(e);
      if (i) var r = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Us.set(e, i);
        for (var c = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < c.length; d++) {
          var b = c[d];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") && (i.set(b.dataset.precedence, b), r = b);
        }
        r && i.set(null, r);
      }
      c = n.instance, b = c.getAttribute("data-precedence"), d = i.get(b) || r, d === r && i.set(null, c), i.set(b, c), this.count++, r = Bs.bind(this), c.addEventListener("load", r), c.addEventListener("error", r), d ? d.parentNode.insertBefore(c, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(c, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Ir = {
    $$typeof: w,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0
  };
  function lw(e, n, i, r, c, d, b, E, Y) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = fn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = fn(0), this.hiddenUpdates = fn(null), this.identifierPrefix = r, this.onUncaughtError = c, this.onCaughtError = d, this.onRecoverableError = b, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = Y, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function o0(e, n, i, r, c, d, b, E, Y, te, ue, fe) {
    return e = new lw(
      e,
      n,
      i,
      b,
      Y,
      te,
      ue,
      fe,
      E
    ), n = 1, d === !0 && (n |= 24), d = An(3, null, null, n), e.current = d, d.stateNode = e, n = Tc(), n.refCount++, e.pooledCache = n, n.refCount++, d.memoizedState = {
      element: r,
      isDehydrated: i,
      cache: n
    }, Dc(d), e;
  }
  function s0(e) {
    return e ? (e = xl, e) : xl;
  }
  function u0(e, n, i, r, c, d) {
    c = s0(c), r.context === null ? r.context = c : r.pendingContext = c, r = hi(n), r.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (r.callback = d), i = mi(e, r, n), i !== null && (wn(i, e, n), Tr(i, e, n));
  }
  function c0(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Ff(e, n) {
    c0(e, n), (e = e.alternate) && c0(e, n);
  }
  function f0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Vi(e, 67108864);
      n !== null && wn(n, e, 67108864), Ff(e, 67108864);
    }
  }
  function d0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = jn();
      n = $(n);
      var i = Vi(e, n);
      i !== null && wn(i, e, n), Ff(e, n);
    }
  }
  var Ys = !0;
  function rw(e, n, i, r) {
    var c = _.T;
    _.T = null;
    var d = O.p;
    try {
      O.p = 2, Jf(e, n, i, r);
    } finally {
      O.p = d, _.T = c;
    }
  }
  function ow(e, n, i, r) {
    var c = _.T;
    _.T = null;
    var d = O.p;
    try {
      O.p = 8, Jf(e, n, i, r);
    } finally {
      O.p = d, _.T = c;
    }
  }
  function Jf(e, n, i, r) {
    if (Ys) {
      var c = Pf(r);
      if (c === null)
        Bf(
          e,
          n,
          r,
          Vs,
          i
        ), m0(e, r);
      else if (uw(
        c,
        e,
        n,
        i,
        r
      ))
        r.stopPropagation();
      else if (m0(e, r), n & 4 && -1 < sw.indexOf(e)) {
        for (; c !== null; ) {
          var d = We(c);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var b = on(d.pendingLanes);
                  if (b !== 0) {
                    var E = d;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; b; ) {
                      var Y = 1 << 31 - zt(b);
                      E.entanglements[1] |= Y, b &= ~Y;
                    }
                    wa(d), (it & 6) === 0 && (Es = yt() + 500, Gr(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Vi(d, 2), E !== null && wn(E, d, 2), Ns(), Ff(d, 2);
            }
          if (d = Pf(r), d === null && Bf(
            e,
            n,
            r,
            Vs,
            i
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
          i
        );
    }
  }
  function Pf(e) {
    return e = Wu(e), Wf(e);
  }
  var Vs = null;
  function Wf(e) {
    if (Vs = null, e = mt(e), e !== null) {
      var n = u(e);
      if (n === null) e = null;
      else {
        var i = n.tag;
        if (i === 13) {
          if (e = f(n), e !== null) return e;
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
    return Vs = e, null;
  }
  function h0(e) {
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
          case Gt:
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
  var ed = !1, Ni = null, Mi = null, Ti = null, Fr = /* @__PURE__ */ new Map(), Jr = /* @__PURE__ */ new Map(), Ci = [], sw = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function m0(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ni = null;
        break;
      case "dragenter":
      case "dragleave":
        Mi = null;
        break;
      case "mouseover":
      case "mouseout":
        Ti = null;
        break;
      case "pointerover":
      case "pointerout":
        Fr.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Jr.delete(n.pointerId);
    }
  }
  function Pr(e, n, i, r, c, d) {
    return e === null || e.nativeEvent !== d ? (e = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: r,
      nativeEvent: d,
      targetContainers: [c]
    }, n !== null && (n = We(n), n !== null && f0(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, c !== null && n.indexOf(c) === -1 && n.push(c), e);
  }
  function uw(e, n, i, r, c) {
    switch (n) {
      case "focusin":
        return Ni = Pr(
          Ni,
          e,
          n,
          i,
          r,
          c
        ), !0;
      case "dragenter":
        return Mi = Pr(
          Mi,
          e,
          n,
          i,
          r,
          c
        ), !0;
      case "mouseover":
        return Ti = Pr(
          Ti,
          e,
          n,
          i,
          r,
          c
        ), !0;
      case "pointerover":
        var d = c.pointerId;
        return Fr.set(
          d,
          Pr(
            Fr.get(d) || null,
            e,
            n,
            i,
            r,
            c
          )
        ), !0;
      case "gotpointercapture":
        return d = c.pointerId, Jr.set(
          d,
          Pr(
            Jr.get(d) || null,
            e,
            n,
            i,
            r,
            c
          )
        ), !0;
    }
    return !1;
  }
  function g0(e) {
    var n = mt(e.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = f(i), n !== null) {
            e.blockedOn = n, he(e.priority, function() {
              d0(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            e.blockedOn = n, he(e.priority, function() {
              d0(i);
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
  function qs(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var i = Pf(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var r = new i.constructor(
          i.type,
          i
        );
        Pu = r, i.target.dispatchEvent(r), Pu = null;
      } else
        return n = We(i), n !== null && f0(n), e.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function p0(e, n, i) {
    qs(e) && i.delete(n);
  }
  function cw() {
    ed = !1, Ni !== null && qs(Ni) && (Ni = null), Mi !== null && qs(Mi) && (Mi = null), Ti !== null && qs(Ti) && (Ti = null), Fr.forEach(p0), Jr.forEach(p0);
  }
  function Gs(e, n) {
    e.blockedOn === n && (e.blockedOn = null, ed || (ed = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      cw
    )));
  }
  var Xs = null;
  function y0(e) {
    Xs !== e && (Xs = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Xs === e && (Xs = null);
        for (var n = 0; n < e.length; n += 3) {
          var i = e[n], r = e[n + 1], c = e[n + 2];
          if (typeof r != "function") {
            if (Wf(r || i) === null)
              continue;
            break;
          }
          var d = We(i);
          d !== null && (e.splice(n, 3), n -= 3, Jc(
            d,
            {
              pending: !0,
              data: c,
              method: i.method,
              action: r
            },
            r,
            c
          ));
        }
      }
    ));
  }
  function Xl(e) {
    function n(Y) {
      return Gs(Y, e);
    }
    Ni !== null && Gs(Ni, e), Mi !== null && Gs(Mi, e), Ti !== null && Gs(Ti, e), Fr.forEach(n), Jr.forEach(n);
    for (var i = 0; i < Ci.length; i++) {
      var r = Ci[i];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Ci.length && (i = Ci[0], i.blockedOn === null); )
      g0(i), i.blockedOn === null && Ci.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (r = 0; r < i.length; r += 3) {
        var c = i[r], d = i[r + 1], b = c[xe] || null;
        if (typeof d == "function")
          b || y0(i);
        else if (b) {
          var E = null;
          if (d && d.hasAttribute("formAction")) {
            if (c = d, b = d[xe] || null)
              E = b.formAction;
            else if (Wf(c) !== null) continue;
          } else E = b.action;
          typeof E == "function" ? i[r + 1] = E : (i.splice(r, 3), r -= 3), y0(i);
        }
      }
  }
  function v0() {
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
      c !== null && (c(), c = null), r || setTimeout(i, 20);
    }
    function i() {
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
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(i, 100), function() {
        r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), c !== null && (c(), c = null);
      };
    }
  }
  function td(e) {
    this._internalRoot = e;
  }
  $s.prototype.render = td.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(o(409));
    var i = n.current, r = jn();
    u0(i, r, e, n, null, null);
  }, $s.prototype.unmount = td.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      u0(e.current, 2, null, e, null, null), Ns(), n[be] = null;
    }
  };
  function $s(e) {
    this._internalRoot = e;
  }
  $s.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = de();
      e = { blockedOn: null, target: e, priority: n };
      for (var i = 0; i < Ci.length && n !== 0 && n < Ci[i].priority; i++) ;
      Ci.splice(i, 0, e), i === 0 && g0(e);
    }
  };
  var b0 = a.version;
  if (b0 !== "19.2.7")
    throw Error(
      o(
        527,
        b0,
        "19.2.7"
      )
    );
  O.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = g(n), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var fw = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Zs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Zs.isDisabled && Zs.supportsFiber)
      try {
        Nn = Zs.inject(
          fw
        ), Xt = Zs;
      } catch {
      }
  }
  return eo.createRoot = function(e, n) {
    if (!s(e)) throw Error(o(299));
    var i = !1, r = "", c = Mg, d = Tg, b = Cg;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (b = n.onRecoverableError)), n = o0(
      e,
      1,
      !1,
      null,
      null,
      i,
      r,
      null,
      c,
      d,
      b,
      v0
    ), e[be] = n.current, Hf(e), new td(n);
  }, eo.hydrateRoot = function(e, n, i) {
    if (!s(e)) throw Error(o(299));
    var r = !1, c = "", d = Mg, b = Tg, E = Cg, Y = null;
    return i != null && (i.unstable_strictMode === !0 && (r = !0), i.identifierPrefix !== void 0 && (c = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (b = i.onCaughtError), i.onRecoverableError !== void 0 && (E = i.onRecoverableError), i.formState !== void 0 && (Y = i.formState)), n = o0(
      e,
      1,
      !0,
      n,
      i ?? null,
      r,
      c,
      Y,
      d,
      b,
      E,
      v0
    ), n.context = s0(null), i = n.current, r = jn(), r = $(r), c = hi(r), c.callback = null, mi(i, c, r), i = r, n.current.lanes = i, rt(n, i), wa(n), e[be] = n.current, Hf(e), new $s(n);
  }, eo.version = "19.2.7", eo;
}
var R0;
function ww() {
  if (R0) return id.exports;
  R0 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), id.exports = Sw(), id.exports;
}
var Ew = ww();
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
var Dv = (t) => {
  throw TypeError(t);
}, zv = (t, a, l) => a.has(t) || Dv("Cannot " + l), Fn = (t, a, l) => (zv(t, a, "read from private field"), l ? l.call(t) : a.get(t)), ro = (t, a, l) => a.has(t) ? Dv("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, l), Ea = (t, a, l, o) => (zv(t, a, "write to private field"), a.set(t, l), l), Du = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i, ah = /^[\\/]{2}/;
function Ov(t, a) {
  return a + t.replace(/\\/g, "/");
}
function A0(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function _w(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: l, v5Compat: o = !1 } = t, s;
  s = a.map(
    (x, S) => y(
      x,
      typeof x == "string" ? null : x.state,
      S === 0 ? "default" : void 0,
      typeof x == "string" ? void 0 : x.mask
    )
  );
  let u = p(
    l ?? s.length - 1
  ), f = "POP", h = null;
  function p(x) {
    return Math.min(Math.max(x, 0), s.length - 1);
  }
  function g() {
    return s[u];
  }
  function y(x, S = null, C, T) {
    let N = Dd(
      s ? g().pathname : "/",
      x,
      S,
      C,
      T
    );
    return Ht(
      N.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), N;
  }
  function m(x) {
    return typeof x == "string" ? x : Ra(x);
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
      let C = A0(x) ? x : y(x, S);
      u += 1, s.splice(u, s.length, C), o && h && h({ action: f, location: C, delta: 1 });
    },
    replace(x, S) {
      f = "REPLACE";
      let C = A0(x) ? x : y(x, S);
      s[u] = C, o && h && h({ action: f, location: C, delta: 0 });
    },
    go(x) {
      f = "POP";
      let S = p(u + x), C = s[S];
      u = S, h && h({ action: f, location: C, delta: x });
    },
    listen(x) {
      return h = x, () => {
        h = null;
      };
    }
  };
}
function qe(t, a) {
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
function Nw() {
  return Math.random().toString(36).substring(2, 10);
}
function Dd(t, a, l = null, o, s) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? ma(a) : a,
    state: l,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || o || Nw(),
    mask: s
  };
}
function Ra({
  pathname: t = "/",
  search: a = "",
  hash: l = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), l && l !== "#" && (t += l.charAt(0) === "#" ? l : "#" + l), t;
}
function ma(t) {
  let a = {};
  if (t) {
    let l = t.indexOf("#");
    l >= 0 && (a.hash = t.substring(l), t = t.substring(0, l));
    let o = t.indexOf("?");
    o >= 0 && (a.search = t.substring(o), t = t.substring(0, o)), t && (a.pathname = t);
  }
  return a;
}
function Mw(t, a, l = !1) {
  let o = "http://localhost";
  t && (o = t.location.origin !== "null" ? t.location.origin : t.location.href), qe(o, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : Ra(a);
  return s = s.replace(/ $/, "%20"), !l && ah.test(s) && (s = o + s), new URL(s, o);
}
var oo, D0 = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (ro(this, oo, /* @__PURE__ */ new Map()), t)
      for (let [a, l] of t)
        this.set(a, l);
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
    if (Fn(this, oo).has(t))
      return Fn(this, oo).get(t);
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
    Fn(this, oo).set(t, a);
  }
};
oo = /* @__PURE__ */ new WeakMap();
var Tw = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function Cw(t) {
  return Tw.has(
    t
  );
}
var Rw = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function Aw(t) {
  return Rw.has(
    t
  );
}
function Dw(t) {
  return t.index === !0;
}
function mo(t, a, l = [], o = {}, s = !1) {
  return t.map((u, f) => {
    let h = [...l, String(f)], p = typeof u.id == "string" ? u.id : h.join("-");
    if (qe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), qe(
      s || !o[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), Dw(u)) {
      let g = {
        ...u,
        id: p
      };
      return o[p] = z0(
        g,
        a(g)
      ), g;
    } else {
      let g = {
        ...u,
        id: p,
        children: void 0
      };
      return o[p] = z0(
        g,
        a(g)
      ), u.children && (g.children = mo(
        u.children,
        a,
        h,
        o,
        s
      )), g;
    }
  });
}
function z0(t, a) {
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
function Lv(t, a, l = "/") {
  return sa(t, a, l, !1);
}
function sa(t, a, l, o, s) {
  let u = typeof a == "string" ? ma(a) : a, f = Wn(u.pathname || "/", l);
  if (f == null)
    return null;
  let h = s ?? ou(t), p = null, g = Gw(f);
  for (let y = 0; p == null && y < h.length; ++y)
    p = qw(
      h[y],
      g,
      o
    );
  return p;
}
function zw(t, a) {
  let { route: l, pathname: o, params: s } = t;
  return {
    id: l.id,
    pathname: o,
    params: s,
    data: a[l.id],
    loaderData: a[l.id],
    handle: l.handle
  };
}
function ou(t) {
  let a = jv(t);
  return Ow(a), a;
}
function jv(t, a = [], l = [], o = "", s = !1) {
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
      qe(
        y.relativePath.startsWith(o),
        `Absolute route path "${y.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(o.length);
    }
    let m = Pn([o, y.relativePath]), v = l.concat(y);
    f.children && f.children.length > 0 && (qe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${m}".`
    ), jv(
      f.children,
      a,
      v,
      m,
      p
    )), !(f.path == null && !f.index) && a.push({
      path: m,
      score: Yw(m, f.index),
      routesMeta: v.map((x, S) => {
        let [C, T] = Uv(
          x.relativePath,
          x.caseSensitive,
          S === v.length - 1
        );
        return {
          ...x,
          matcher: C,
          compiledParams: T
        };
      })
    });
  };
  return t.forEach((f, h) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, h);
    else
      for (let p of Hv(f.path))
        u(f, h, !0, p);
  }), a;
}
function Hv(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [l, ...o] = a, s = l.endsWith("?"), u = l.replace(/\?$/, "");
  if (o.length === 0)
    return s ? [u, ""] : [u];
  let f = Hv(o.join("/")), h = [];
  return h.push(
    ...f.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && h.push(...f), h.map(
    (p) => t.startsWith("/") && p === "" ? "/" : p
  );
}
function Ow(t) {
  t.sort(
    (a, l) => a.score !== l.score ? l.score - a.score : Vw(
      a.routesMeta.map((o) => o.childrenIndex),
      l.routesMeta.map((o) => o.childrenIndex)
    )
  );
}
var Lw = /^:[\w-]+$/, jw = 3, Hw = 2, Bw = 1, Uw = 10, kw = -2, O0 = (t) => t === "*";
function Yw(t, a) {
  let l = t.split("/"), o = l.length;
  return l.some(O0) && (o += kw), a && (o += Hw), l.filter((s) => !O0(s)).reduce(
    (s, u) => s + (Lw.test(u) ? jw : u === "" ? Bw : Uw),
    o
  );
}
function Vw(t, a) {
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
function qw(t, a, l = !1) {
  let { routesMeta: o } = t, s = {}, u = "/", f = [];
  for (let h = 0; h < o.length; ++h) {
    let p = o[h], g = h === o.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", m = {
      path: p.relativePath,
      caseSensitive: p.caseSensitive,
      end: g
    }, v = (
      // Use precomputed matcher if it exists
      p.matcher && p.compiledParams ? Bv(
        m,
        y,
        p.matcher,
        p.compiledParams
      ) : vu(m, y)
    ), x = p.route;
    if (!v && g && l && !o[o.length - 1].route.index && (v = vu(
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
      pathnameBase: Zw(
        Pn([u, v.pathnameBase])
      ),
      route: x
    }), v.pathnameBase !== "/" && (u = Pn([u, v.pathnameBase]));
  }
  return f;
}
function vu(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [l, o] = Uv(
    t.path,
    t.caseSensitive,
    t.end
  );
  return Bv(t, a, l, o);
}
function Bv(t, a, l, o) {
  let s = a.match(l);
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
function Uv(t, a = !1, l = !0) {
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
  return t.endsWith("*") ? (o.push({ paramName: "*" }), s += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : l ? s += "\\/*$" : t !== "" && t !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), o];
}
function Gw(t) {
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
  let l = a.endsWith("/") ? a.length - 1 : a.length, o = t.charAt(l);
  return o && o !== "/" ? null : t.slice(l) || "/";
}
function Xw({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Pn([t, a]);
}
var ih = (t) => Du.test(t);
function $w(t, a = "/") {
  let {
    pathname: l,
    search: o = "",
    hash: s = ""
  } = typeof t == "string" ? ma(t) : t, u;
  return l ? (l = rh(l), l.startsWith("/") ? u = L0(l.substring(1), "/") : u = L0(l, a)) : u = a, {
    pathname: u,
    search: Qw(o),
    hash: Kw(s)
  };
}
function L0(t, a) {
  let l = bu(a).split("/");
  return t.split("/").forEach((s) => {
    s === ".." ? l.length > 1 && l.pop() : s !== "." && l.push(s);
  }), l.length > 1 ? l.join("/") : "/";
}
function sd(t, a, l, o) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${l}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function kv(t) {
  return t.filter(
    (a, l) => l === 0 || a.route.path && a.route.path.length > 0
  );
}
function lh(t) {
  let a = kv(t);
  return a.map(
    (l, o) => o === a.length - 1 ? l.pathname : l.pathnameBase
  );
}
function zu(t, a, l, o = !1) {
  let s;
  typeof t == "string" ? s = ma(t) : (s = { ...t }, qe(
    !s.pathname || !s.pathname.includes("?"),
    sd("?", "pathname", "search", s)
  ), qe(
    !s.pathname || !s.pathname.includes("#"),
    sd("#", "pathname", "hash", s)
  ), qe(
    !s.search || !s.search.includes("#"),
    sd("#", "search", "hash", s)
  ));
  let u = t === "" || s.pathname === "", f = u ? "/" : s.pathname, h;
  if (f == null)
    h = l;
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
  let p = $w(s, h), g = f && f !== "/" && f.endsWith("/"), y = (u || f === ".") && l.endsWith("/");
  return !p.pathname.endsWith("/") && (g || y) && (p.pathname += "/"), p;
}
var rh = (t) => t.replace(/[\\/]{2,}/g, "/"), Pn = (t) => rh(t.join("/")), bu = (t) => t.replace(/\/+$/, ""), Zw = (t) => bu(t).replace(/^\/*/, "/"), Qw = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, Kw = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, j0 = (t, a = 302) => {
  let l = a;
  typeof l == "number" ? l = { status: l } : typeof l.status > "u" && (l.status = 302);
  let o = new Headers(l.headers);
  return o.set("Location", t), new Response(null, { ...l, headers: o });
}, Ou = class {
  constructor(t, a, l, o = !1) {
    this.status = t, this.statusText = a || "", this.internal = o, l instanceof Error ? (this.data = l.toString(), this.error = l) : this.data = l;
  }
};
function go(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function Mo(t) {
  let a = t.map((l) => l.route.path).filter(Boolean);
  return Pn(a) || "/";
}
var Yv = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Vv(t, a) {
  let l = t;
  if (typeof l != "string" || !Du.test(l))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: l
    };
  let o = l, s = !1;
  if (Yv)
    try {
      let u = new URL(window.location.href), f = ah.test(l) ? new URL(Ov(l, u.protocol)) : new URL(l), h = Wn(f.pathname, a);
      f.origin === u.origin && h != null ? l = h + f.search + f.hash : s = !0;
    } catch {
      Ht(
        !1,
        `<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: o,
    isExternal: s,
    to: l
  };
}
var ji = Symbol("Uninstrumented");
function Iw(t, a) {
  let l = {
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
        let f = Object.keys(l);
        for (let h of f)
          u[h] && l[h].push(u[h]);
      }
    })
  );
  let o = {};
  if (typeof a.lazy == "function" && l.lazy.length > 0) {
    let s = Il(l.lazy, a.lazy, () => {
    });
    s && (o.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let f = s[u], h = l[`lazy.${u}`];
      if (typeof f == "function" && h.length > 0) {
        let p = Il(h, f, () => {
        });
        p && (o.lazy = Object.assign(o.lazy || {}, {
          [u]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((s) => {
    let u = a[s];
    if (typeof u == "function" && l[s].length > 0) {
      let f = u[ji] ?? u, h = Il(
        l[s],
        f,
        (...p) => H0(p[0])
      );
      h && (s === "loader" && f.hydrate === !0 && (h.hydrate = !0), h[ji] = f, o[s] = h);
    }
  }), a.middleware && a.middleware.length > 0 && l.middleware.length > 0 && (o.middleware = a.middleware.map((s) => {
    let u = s[ji] ?? s, f = Il(
      l.middleware,
      u,
      (...h) => H0(h[0])
    );
    return f ? (f[ji] = u, f) : s;
  })), o;
}
function Fw(t, a) {
  let l = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (o) => o({
      instrument(s) {
        let u = Object.keys(s);
        for (let f of u)
          s[f] && l[f].push(s[f]);
      }
    })
  ), l.navigate.length > 0) {
    let o = t.navigate[ji] ?? t.navigate, s = Il(
      l.navigate,
      o,
      (...u) => {
        let [f, h] = u;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? Ra(f) : ".",
          ...B0(t, h ?? {})
        };
      }
    );
    s && (s[ji] = o, t.navigate = s);
  }
  if (l.fetch.length > 0) {
    let o = t.fetch[ji] ?? t.fetch, s = Il(l.fetch, o, (...u) => {
      let [f, , h, p] = u;
      return {
        href: h ?? ".",
        fetcherKey: f,
        ...B0(t, p ?? {})
      };
    });
    s && (s[ji] = o, t.fetch = s);
  }
  return t;
}
function Il(t, a, l) {
  return t.length === 0 ? null : async (...o) => {
    let s = await qv(
      t,
      l(...o),
      () => a(...o),
      t.length - 1
    );
    if (s.type === "error")
      throw s.value;
    return s.value;
  };
}
async function qv(t, a, l, o) {
  let s = t[o], u;
  if (s) {
    let f, h = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = qv(t, a, l, o - 1), u = await f, qe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await s(h, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    f || await h(), await f;
  } else
    try {
      u = { type: "success", value: await l() };
    } catch (f) {
      u = { type: "error", value: f };
    }
  return u || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function H0(t) {
  let { request: a, context: l, params: o, pattern: s } = t;
  return {
    request: Jw(a),
    params: { ...o },
    pattern: s,
    context: Pw(l)
  };
}
function B0(t, a) {
  return {
    currentUrl: Ra(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function Jw(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function Pw(t) {
  if (eE(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var Ww = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function eE(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === Ww;
}
var Gv = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], tE = new Set(
  Gv
), nE = [
  "GET",
  ...Gv
], aE = new Set(nE), Xv = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), iE = /* @__PURE__ */ new Set([307, 308]), ud = {
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
}, lE = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, to = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, rE = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), $v = "remix-router-transitions", Zv = Symbol("ResetLoaderData"), el, Zl, zi, Ql, oE = class {
  constructor(t) {
    ro(this, el), ro(this, Zl), ro(this, zi), ro(this, Ql), Ea(this, el, t), Ea(this, Zl, ou(t));
  }
  /** The stable route tree */
  get stableRoutes() {
    return Fn(this, el);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return Fn(this, zi) ?? Fn(this, el);
  }
  /** Pre-computed branches */
  get branches() {
    return Fn(this, Ql) ?? Fn(this, Zl);
  }
  get hasHMRRoutes() {
    return Fn(this, zi) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(t) {
    Ea(this, el, t), Ea(this, Zl, ou(t));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(t) {
    Ea(this, zi, t), Ea(this, Ql, ou(t));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    Fn(this, zi) && (Ea(this, el, Fn(this, zi)), Ea(this, Zl, Fn(this, Ql)), Ea(this, zi, void 0), Ea(this, Ql, void 0));
  }
};
el = /* @__PURE__ */ new WeakMap();
Zl = /* @__PURE__ */ new WeakMap();
zi = /* @__PURE__ */ new WeakMap();
Ql = /* @__PURE__ */ new WeakMap();
function sE(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, l = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  qe(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let o = t.hydrationRouteProperties || [], s = t.mapRouteProperties || rE, u = s;
  if (t.instrumentations) {
    let B = t.instrumentations;
    u = ($) => ({
      ...s($),
      ...Iw(
        B.map((P) => P.route).filter(Boolean),
        $
      )
    });
  }
  let f = {}, h = new oE(
    mo(
      t.routes,
      u,
      void 0,
      f
    )
  ), p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let g = t.dataStrategy || hE, y = {
    ...t.future
  }, m = null, v = /* @__PURE__ */ new Set(), x = null, S = null, C = null, T = null, N = t.hydrationData != null, j = sa(
    h.activeRoutes,
    t.history.location,
    p,
    !1,
    h.branches
  ), w = !1, z = null, U, H;
  if (j == null && !t.patchRoutesOnNavigation) {
    let B = Jn(404, {
      pathname: t.history.location.pathname
    }), { matches: $, route: P } = Qs(h.activeRoutes);
    U = !0, H = !U, j = $, z = { [P.id]: B };
  } else if (j && !t.hydrationData && fn(
    j,
    h.activeRoutes,
    t.history.location.pathname
  ).active && (j = null), j)
    if (j.some((B) => B.route.lazy))
      U = !1, H = !U;
    else if (!j.some((B) => oh(B.route)))
      U = !0, H = !U;
    else {
      let B = t.hydrationData ? t.hydrationData.loaderData : null, $ = t.hydrationData ? t.hydrationData.errors : null, P = j;
      if ($) {
        let de = j.findIndex(
          (he) => $[he.route.id] !== void 0
        );
        P = P.slice(0, de + 1);
      }
      H = !1, U = !0, P.forEach((de) => {
        let he = Qv(de.route, B, $);
        H = H || he.renderFallback, U = U && !he.shouldLoad;
      });
    }
  else {
    U = !1, H = !U, j = [];
    let B = fn(
      null,
      h.activeRoutes,
      t.history.location.pathname
    );
    B.active && B.matches && (w = !0, j = B.matches);
  }
  let k, D = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: j,
    initialized: U,
    renderFallback: H,
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
  }, Q = "POP", le = null, K = !1, J, oe = !1, L = /* @__PURE__ */ new Map(), X = null, _ = !1, O = !1, Z = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), ae = 0, A = -1, V = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Set(), ne = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), me = /* @__PURE__ */ new Set(), ge = /* @__PURE__ */ new Map(), W, pe = null;
  function ze() {
    if (m = t.history.listen(
      ({ action: B, location: $, delta: P }) => {
        if (W) {
          W(), W = void 0;
          return;
        }
        Ht(
          ge.size === 0 || P != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let de = Yn({
          currentLocation: D.location,
          nextLocation: $,
          historyAction: B
        });
        if (de && P != null) {
          let he = new Promise((Ee) => {
            W = Ee;
          });
          t.history.go(P * -1), Mn(de, {
            state: "blocked",
            location: $,
            proceed() {
              Mn(de, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: $
              }), he.then(() => t.history.go(P));
            },
            reset() {
              let Ee = new Map(D.blockers);
              Ee.set(de, to), Se({ blockers: Ee });
            }
          }), le?.resolve(), le = null;
          return;
        }
        return lt(B, $);
      }
    ), l) {
      zE(a, L);
      let B = () => OE(a, L);
      a.addEventListener("pagehide", B), X = () => a.removeEventListener("pagehide", B);
    }
    return D.initialized || lt("POP", D.location, {
      initialHydration: !0
    }), k;
  }
  function Ae() {
    m && m(), X && X(), v.clear(), J && J.abort(), D.fetchers.forEach((B, $) => Nn(D.fetchers, $)), D.blockers.forEach((B, $) => ta($));
  }
  function we(B) {
    if (v.add(B), x) {
      let { newErrors: $ } = x;
      x = null, B(D, {
        deletedFetchers: [],
        newErrors: $,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => v.delete(B);
  }
  function Se(B, $ = {}) {
    B.matches && (B.matches = B.matches.map((he) => {
      let Ee = f[he.route.id], ve = he.route;
      return ve.element !== Ee.element || ve.errorElement !== Ee.errorElement || ve.hydrateFallbackElement !== Ee.hydrateFallbackElement ? {
        ...he,
        route: Ee
      } : he;
    })), D = {
      ...D,
      ...B
    };
    let P = [], de = [];
    D.fetchers.forEach((he, Ee) => {
      he.state === "idle" && (me.has(Ee) ? P.push(Ee) : de.push(Ee));
    }), me.forEach((he) => {
      !D.fetchers.has(he) && !G.has(he) && P.push(he);
    }), v.size === 0 && (x = { newErrors: B.errors ?? null }), [...v].forEach(
      (he) => he(D, {
        deletedFetchers: P,
        newErrors: B.errors ?? null,
        viewTransitionOpts: $.viewTransitionOpts,
        flushSync: $.flushSync === !0
      })
    ), P.forEach((he) => Nn(D.fetchers, he)), de.forEach((he) => D.fetchers.delete(he));
  }
  function De(B, $, { flushSync: P } = {}) {
    let de = D.actionData != null && D.navigation.formMethod != null && cn(D.navigation.formMethod) && D.navigation.state === "loading" && B.state?._isRedirect !== !0, he;
    $.actionData ? Object.keys($.actionData).length > 0 ? he = $.actionData : he = null : de ? he = D.actionData : he = null;
    let Ee = $.loaderData ? Q0(
      D.loaderData,
      $.loaderData,
      $.matches || [],
      $.errors
    ) : D.loaderData, ve = D.blockers;
    ve.size > 0 && (ve = new Map(ve), ve.forEach((Te, Be) => ve.set(Be, to)));
    let xe = _ ? !1 : Ot(B, $.matches || D.matches), be = K === !0 || D.navigation.formMethod != null && cn(D.navigation.formMethod) && B.state?._isRedirect !== !0;
    h.commitHmrRoutes(), _ || Q === "POP" || (Q === "PUSH" ? t.history.push(B, B.state) : Q === "REPLACE" && t.history.replace(B, B.state));
    let Me;
    if (Q === "POP") {
      let Te = L.get(D.location.pathname);
      Te && Te.has(B.pathname) ? Me = {
        currentLocation: D.location,
        nextLocation: B
      } : L.has(B.pathname) && (Me = {
        currentLocation: B,
        nextLocation: D.location
      });
    } else if (oe) {
      let Te = L.get(D.location.pathname);
      Te ? Te.add(B.pathname) : (Te = /* @__PURE__ */ new Set([B.pathname]), L.set(D.location.pathname, Te)), Me = {
        currentLocation: D.location,
        nextLocation: B
      };
    }
    Se(
      {
        ...$,
        // matches, errors, fetchers go through as-is
        actionData: he,
        loaderData: Ee,
        historyAction: Q,
        location: B,
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
        flushSync: P === !0
      }
    ), Q = "POP", K = !1, oe = !1, _ = !1, O = !1, le?.resolve(), le = null, pe?.resolve(), pe = null;
  }
  async function Ge(B, $) {
    if (le?.resolve(), le = null, typeof B == "number") {
      le || (le = J0());
      let Je = le.promise;
      return t.history.go(B), Je;
    }
    let P = zd(
      D.location,
      D.matches,
      p,
      B,
      $?.fromRouteId,
      $?.relative
    ), { path: de, submission: he, error: Ee } = U0(
      !1,
      P,
      $
    ), ve;
    $?.mask && (ve = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof $.mask == "string" ? ma($.mask) : {
        ...D.location.mask,
        ...$.mask
      }
    });
    let xe = D.location, be = Dd(
      xe,
      de,
      $ && $.state,
      void 0,
      ve
    );
    be = {
      ...be,
      ...t.history.encodeLocation(be)
    };
    let Me = $ && $.replace != null ? $.replace : void 0, Te = "PUSH";
    Me === !0 ? Te = "REPLACE" : Me === !1 || he != null && cn(he.formMethod) && he.formAction === D.location.pathname + D.location.search && (Te = "REPLACE");
    let Be = $ && "preventScrollReset" in $ ? $.preventScrollReset === !0 : void 0, Oe = ($ && $.flushSync) === !0, Ve = Yn({
      currentLocation: xe,
      nextLocation: be,
      historyAction: Te
    });
    if (Ve) {
      Mn(Ve, {
        state: "blocked",
        location: be,
        proceed() {
          Mn(Ve, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: be
          }), Ge(B, $);
        },
        reset() {
          let Je = new Map(D.blockers);
          Je.set(Ve, to), Se({ blockers: Je });
        }
      });
      return;
    }
    await lt(Te, be, {
      submission: he,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ee,
      preventScrollReset: Be,
      replace: $ && $.replace,
      enableViewTransition: $ && $.viewTransition,
      flushSync: Oe,
      callSiteDefaultShouldRevalidate: $ && $.defaultShouldRevalidate
    });
  }
  function nt() {
    pe || (pe = J0()), Gt(), Se({ revalidation: "loading" });
    let B = pe.promise;
    return D.navigation.state === "submitting" ? B : D.navigation.state === "idle" ? (lt(D.historyAction, D.location, {
      startUninterruptedRevalidation: !0
    }), B) : (lt(
      Q || D.historyAction,
      D.navigation.location,
      {
        overrideNavigation: D.navigation,
        // Proxy through any rending view transition
        enableViewTransition: oe === !0
      }
    ), B);
  }
  async function lt(B, $, P) {
    J && J.abort(), J = null, Q = B, _ = (P && P.startUninterruptedRevalidation) === !0, Rt(D.location, D.matches), K = (P && P.preventScrollReset) === !0, oe = (P && P.enableViewTransition) === !0;
    let de = h.activeRoutes, he = P?.initialHydration && D.matches && D.matches.length > 0 && !w ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      D.matches
    ) : sa(
      de,
      $,
      p,
      !1,
      h.branches
    ), Ee = (P && P.flushSync) === !0;
    if (he && D.initialized && !O && wE(D.location, $) && !(P && P.submission && cn(P.submission.formMethod))) {
      De($, { matches: he }, { flushSync: Ee });
      return;
    }
    let ve = fn(he, de, $.pathname);
    if (ve.active && ve.matches && (he = ve.matches), !he) {
      let { error: We, notFoundMatches: Ze, route: Ct } = on(
        $.pathname
      );
      De(
        $,
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
    let xe = P && P.overrideNavigation ? {
      ...P.overrideNavigation,
      matches: he,
      historyAction: B
    } : void 0;
    J = new AbortController();
    let be = Kl(
      t.history,
      $,
      J.signal,
      P && P.submission
    ), Me = t.getContext ? await t.getContext() : new D0(), Te;
    if (P && P.pendingError)
      Te = [
        Oi(he).route.id,
        { type: "error", error: P.pendingError }
      ];
    else if (P && P.submission && cn(P.submission.formMethod)) {
      let We = await Ft(
        be,
        $,
        P.submission,
        he,
        B,
        Me,
        ve.active,
        P && P.initialHydration === !0,
        { replace: P.replace, flushSync: Ee }
      );
      if (We.shortCircuited)
        return;
      if (We.pendingActionResult) {
        let [Ze, Ct] = We.pendingActionResult;
        if (Hn(Ct) && go(Ct.error) && Ct.error.status === 404) {
          J = null, De($, {
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
        $,
        he,
        B,
        P.submission
      ), Ee = !1, ve.active = !1, be = Kl(
        t.history,
        be.url,
        be.signal
      );
    }
    let {
      shortCircuited: Be,
      matches: Oe,
      loaderData: Ve,
      errors: Je,
      workingFetchers: mt
    } = await pt(
      be,
      $,
      he,
      B,
      Me,
      ve.active,
      xe,
      P && P.submission,
      P && P.fetcherSubmission,
      P && P.replace,
      P && P.initialHydration === !0,
      Ee,
      Te,
      P && P.callSiteDefaultShouldRevalidate
    );
    Be || (J = null, De($, {
      matches: Oe || he,
      ...K0(Te),
      loaderData: Ve,
      errors: Je,
      ...mt ? { fetchers: mt } : {}
    }));
  }
  async function Ft(B, $, P, de, he, Ee, ve, xe, be = {}) {
    Gt();
    let Me = AE(
      $,
      de,
      he,
      P
    );
    if (Se({ navigation: Me }, { flushSync: be.flushSync === !0 }), ve) {
      let Oe = await rt(
        de,
        $.pathname,
        B.signal
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
        let Ve = Oi(Oe.partialMatches).route.id;
        return {
          matches: Oe.partialMatches,
          pendingActionResult: [
            Ve,
            {
              type: "error",
              error: Oe.error
            }
          ]
        };
      } else if (Oe.matches)
        de = Oe.matches;
      else {
        let { notFoundMatches: Ve, error: Je, route: mt } = on(
          $.pathname
        );
        return {
          matches: Ve,
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
    let Te, Be = su(de, $);
    if (!Be.route.action && !Be.route.lazy)
      Te = {
        type: "error",
        error: Jn(405, {
          method: B.method,
          pathname: $.pathname,
          routeId: Be.route.id
        })
      };
    else {
      let Oe = Wl(
        u,
        f,
        B,
        $,
        de,
        Be,
        xe ? [] : o,
        Ee
      ), Ve = await Nt(
        B,
        $,
        Oe,
        Ee,
        null
      );
      if (Te = Ve[Be.route.id], !Te) {
        for (let Je of de)
          if (Ve[Je.route.id]) {
            Te = Ve[Je.route.id];
            break;
          }
      }
      if (B.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (nl(Te)) {
      let Oe;
      return be && be.replace != null ? Oe = be.replace : Oe = X0(
        Te.response.headers.get("Location"),
        new URL(B.url),
        p,
        t.history
      ) === D.location.pathname + D.location.search, await _t(B, Te, !0, {
        submission: P,
        replace: Oe
      }), { shortCircuited: !0 };
    }
    if (Hn(Te)) {
      let Oe = Oi(de, Be.route.id);
      return (be && be.replace) !== !0 && (Q = "PUSH"), {
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
  async function pt(B, $, P, de, he, Ee, ve, xe, be, Me, Te, Be, Oe, Ve) {
    let Je = ve || cd($, P, de, xe), mt = xe || be || F0(Je), We = !_ && !Te;
    if (Ee) {
      if (We) {
        let st = qt(Oe);
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
        P,
        $.pathname,
        B.signal
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
        let st = Oi(He.partialMatches).route.id;
        return {
          matches: He.partialMatches,
          loaderData: {},
          errors: {
            [st]: He.error
          }
        };
      } else if (He.matches)
        P = He.matches;
      else {
        let { error: st, notFoundMatches: dn, route: Cn } = on(
          $.pathname
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
    let Ze = h.activeRoutes, { dsMatches: Ct, revalidatingFetchers: Ie } = k0(
      B,
      he,
      u,
      f,
      t.history,
      D,
      P,
      mt,
      $,
      Te ? [] : o,
      Te === !0,
      O,
      Z,
      me,
      ne,
      I,
      Ze,
      p,
      t.patchRoutesOnNavigation != null,
      h.branches,
      Oe,
      Ve
    );
    if (A = ++ae, !t.dataStrategy && !Ct.some((He) => He.shouldLoad) && !Ct.some(
      (He) => He.route.middleware && He.route.middleware.length > 0
    ) && Ie.length === 0) {
      let He = new Map(D.fetchers), st = ni(He);
      return De(
        $,
        {
          matches: P,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Oe && Hn(Oe[1]) ? { [Oe[0]]: Oe[1].error } : null,
          ...K0(Oe),
          ...st ? { fetchers: He } : {}
        },
        { flushSync: Be }
      ), { shortCircuited: !0 };
    }
    if (We) {
      let He = {};
      if (!Ee) {
        He.navigation = Je;
        let st = qt(Oe);
        st !== void 0 && (He.actionData = st);
      }
      Ie.length > 0 && (He.fetchers = Jt(Ie)), Se(He, { flushSync: Be });
    }
    Ie.forEach((He) => {
      Tt(He.key), He.controller && G.set(He.key, He.controller);
    });
    let va = () => Ie.forEach((He) => Tt(He.key));
    J && J.signal.addEventListener(
      "abort",
      va
    );
    let { loaderResults: Tn, fetcherResults: sn } = await Pt(
      Ct,
      Ie,
      B,
      $,
      he
    );
    if (B.signal.aborted)
      return { shortCircuited: !0 };
    J && J.signal.removeEventListener(
      "abort",
      va
    ), Ie.forEach((He) => G.delete(He.key));
    let en = Ks(Tn);
    if (en)
      return await _t(B, en.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    if (en = Ks(sn), en)
      return I.add(en.key), await _t(B, en.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    let gn = new Map(D.fetchers), { loaderData: ai, errors: pn } = Z0(
      D,
      P,
      Tn,
      Oe,
      Ie,
      sn,
      gn
    );
    Te && D.errors && (pn = { ...D.errors, ...pn });
    let ii = ni(gn), aa = ya(
      A,
      gn
    ), ia = ii || aa || Ie.length > 0;
    return {
      matches: P,
      loaderData: ai,
      errors: pn,
      ...ia ? { workingFetchers: gn } : {}
    };
  }
  function qt(B) {
    if (B && !Hn(B[1]))
      return {
        [B[0]]: B[1].data
      };
    if (D.actionData)
      return Object.keys(D.actionData).length === 0 ? null : D.actionData;
  }
  function Jt(B) {
    let $ = new Map(D.fetchers);
    return B.forEach((P) => {
      let de = $.get(P.key), he = no(
        void 0,
        de ? de.data : void 0
      );
      $.set(P.key, he);
    }), $;
  }
  async function Et(B, $, P, de) {
    Tt(B);
    let he = (de && de.flushSync) === !0, Ee = h.activeRoutes, ve = zd(
      D.location,
      D.matches,
      p,
      P,
      $,
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
        B,
        $,
        Jn(404, { pathname: ve }),
        { flushSync: he }
      );
      return;
    }
    let { path: Me, submission: Te, error: Be } = U0(
      !0,
      ve,
      de
    );
    if (Be) {
      Mt(B, $, Be, { flushSync: he });
      return;
    }
    let Oe = t.getContext ? await t.getContext() : new D0(), Ve = (de && de.preventScrollReset) === !0;
    if (Te && cn(Te.formMethod)) {
      await Qt(
        B,
        $,
        Me,
        xe,
        Oe,
        be.active,
        he,
        Ve,
        Te,
        de && de.defaultShouldRevalidate
      );
      return;
    }
    ne.set(B, { routeId: $, path: Me }), await yt(
      B,
      $,
      Me,
      xe,
      Oe,
      be.active,
      he,
      Ve,
      Te
    );
  }
  async function Qt(B, $, P, de, he, Ee, ve, xe, be, Me) {
    Gt(), ne.delete(B);
    let Te = D.fetchers.get(B);
    Wt(B, DE(be, Te), {
      flushSync: ve
    });
    let Be = new AbortController(), Oe = Kl(
      t.history,
      P,
      Be.signal,
      be
    );
    if (Ee) {
      let at = await rt(
        de,
        new URL(Oe.url).pathname,
        Oe.signal,
        B
      );
      if (at.type === "aborted")
        return;
      if (at.type === "error") {
        Mt(B, $, at.error, { flushSync: ve });
        return;
      } else if (at.matches)
        de = at.matches;
      else {
        Mt(
          B,
          $,
          Jn(404, { pathname: P }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Ve = su(de, P);
    if (!Ve.route.action && !Ve.route.lazy) {
      let at = Jn(405, {
        method: be.formMethod,
        pathname: P,
        routeId: $
      });
      Mt(B, $, at, { flushSync: ve });
      return;
    }
    G.set(B, Be);
    let Je = ae, mt = Wl(
      u,
      f,
      Oe,
      P,
      de,
      Ve,
      o,
      he
    ), We = await Nt(
      Oe,
      P,
      mt,
      he,
      B
    ), Ze = We[Ve.route.id];
    if (!Ze) {
      for (let at of mt)
        if (We[at.route.id]) {
          Ze = We[at.route.id];
          break;
        }
    }
    if (Oe.signal.aborted) {
      G.get(B) === Be && G.delete(B);
      return;
    }
    if (me.has(B)) {
      if (nl(Ze) || Hn(Ze)) {
        Wt(B, Na(void 0));
        return;
      }
    } else {
      if (nl(Ze))
        if (G.delete(B), A > Je) {
          Wt(B, Na(void 0));
          return;
        } else
          return I.add(B), Wt(B, no(be)), _t(Oe, Ze, !1, {
            fetcherSubmission: be,
            preventScrollReset: xe
          });
      if (Hn(Ze)) {
        Mt(B, $, Ze.error);
        return;
      }
    }
    let Ct = D.navigation.location || D.location, Ie = Kl(
      t.history,
      Ct,
      Be.signal
    ), va = h.activeRoutes, Tn = D.navigation.state !== "idle" ? sa(
      va,
      D.navigation.location,
      p,
      !1,
      h.branches
    ) : D.matches;
    qe(Tn, "Didn't find any matches after fetcher action");
    let sn = ++ae;
    V.set(B, sn);
    let { dsMatches: en, revalidatingFetchers: gn } = k0(
      Ie,
      he,
      u,
      f,
      t.history,
      D,
      Tn,
      be,
      Ct,
      o,
      !1,
      O,
      Z,
      me,
      ne,
      I,
      va,
      p,
      t.patchRoutesOnNavigation != null,
      h.branches,
      [Ve.route.id, Ze],
      Me
    ), ai = no(be, Ze.data), pn = new Map(D.fetchers);
    pn.set(B, ai), gn.filter((at) => at.key !== B).forEach((at) => {
      let Vn = at.key, tn = pn.get(Vn), Bi = no(
        void 0,
        tn ? tn.data : void 0
      );
      pn.set(Vn, Bi), Tt(Vn), at.controller && G.set(Vn, at.controller);
    }), Se({ fetchers: pn });
    let ii = () => gn.forEach((at) => Tt(at.key));
    Be.signal.addEventListener(
      "abort",
      ii
    );
    let { loaderResults: aa, fetcherResults: ia } = await Pt(
      en,
      gn,
      Ie,
      Ct,
      he
    );
    if (Be.signal.aborted)
      return;
    Be.signal.removeEventListener(
      "abort",
      ii
    ), V.delete(B), G.delete(B), gn.forEach((at) => G.delete(at.key));
    let He = D.fetchers.has(B), st = (at) => {
      if (!He) return at;
      let Vn = new Map(at.fetchers);
      return Vn.set(B, Na(Ze.data)), { ...at, fetchers: Vn };
    }, dn = Ks(aa);
    if (dn)
      return D = st(D), _t(
        Ie,
        dn.result,
        !1,
        { preventScrollReset: xe }
      );
    if (dn = Ks(ia), dn)
      return I.add(dn.key), D = st(D), _t(
        Ie,
        dn.result,
        !1,
        { preventScrollReset: xe }
      );
    let Cn = new Map(D.fetchers);
    He && Cn.set(B, Na(Ze.data));
    let { loaderData: li, errors: Da } = Z0(
      D,
      Tn,
      aa,
      void 0,
      gn,
      ia,
      Cn
    );
    ya(sn, Cn), D.navigation.state === "loading" && sn > A ? (qe(Q, "Expected pending action"), J && J.abort(), De(D.navigation.location, {
      matches: Tn,
      loaderData: li,
      errors: Da,
      fetchers: Cn
    })) : (Se({
      errors: Da,
      loaderData: Q0(
        D.loaderData,
        li,
        Tn,
        Da
      ),
      fetchers: Cn
    }), O = !1);
  }
  async function yt(B, $, P, de, he, Ee, ve, xe, be) {
    let Me = D.fetchers.get(B);
    Wt(
      B,
      no(
        be,
        Me ? Me.data : void 0
      ),
      { flushSync: ve }
    );
    let Te = new AbortController(), Be = Kl(
      t.history,
      P,
      Te.signal
    );
    if (Ee) {
      let Ze = await rt(
        de,
        new URL(Be.url).pathname,
        Be.signal,
        B
      );
      if (Ze.type === "aborted")
        return;
      if (Ze.type === "error") {
        Mt(B, $, Ze.error, { flushSync: ve });
        return;
      } else if (Ze.matches)
        de = Ze.matches;
      else {
        Mt(
          B,
          $,
          Jn(404, { pathname: P }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Oe = su(de, P);
    G.set(B, Te);
    let Ve = ae, Je = Wl(
      u,
      f,
      Be,
      P,
      de,
      Oe,
      o,
      he
    ), mt = await Nt(
      Be,
      P,
      Je,
      he,
      B
    ), We = mt[Oe.route.id];
    if (!We) {
      for (let Ze of de)
        if (mt[Ze.route.id]) {
          We = mt[Ze.route.id];
          break;
        }
    }
    if (G.get(B) === Te && G.delete(B), !Be.signal.aborted) {
      if (me.has(B)) {
        Wt(B, Na(void 0));
        return;
      }
      if (nl(We))
        if (A > Ve) {
          Wt(B, Na(void 0));
          return;
        } else {
          I.add(B), await _t(Be, We, !1, {
            preventScrollReset: xe
          });
          return;
        }
      if (Hn(We)) {
        Mt(B, $, We.error);
        return;
      }
      Wt(B, Na(We.data));
    }
  }
  async function _t(B, $, P, {
    submission: de,
    fetcherSubmission: he,
    preventScrollReset: Ee,
    replace: ve
  } = {}) {
    P || (le?.resolve(), le = null), $.response.headers.has("X-Remix-Revalidate") && (O = !0);
    let xe = $.response.headers.get("Location");
    qe(xe, "Expected a Location header on the redirect Response"), xe = X0(
      xe,
      new URL(B.url),
      p,
      t.history
    );
    let be = Dd(D.location, xe, {
      _isRedirect: !0
    });
    if (l) {
      let Je = !1;
      if ($.response.headers.has("X-Remix-Reload-Document"))
        Je = !0;
      else if (ih(xe)) {
        const mt = Mw(a, xe, !0);
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
    let Me = ve === !0 || $.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Te, formAction: Be, formEncType: Oe } = D.navigation;
    !de && !he && Te && Be && Oe && (de = F0(D.navigation));
    let Ve = de || he;
    if (iE.has($.response.status) && Ve && cn(Ve.formMethod))
      await lt(Me, be, {
        submission: {
          ...Ve,
          formAction: xe
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || K,
        enableViewTransition: P ? oe : void 0
      });
    else {
      let Je = cd(
        be,
        [],
        Me,
        de
      );
      await lt(Me, be, {
        overrideNavigation: Je,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: he,
        // Preserve these flags across redirects
        preventScrollReset: Ee || K,
        enableViewTransition: P ? oe : void 0
      });
    }
  }
  async function Nt(B, $, P, de, he) {
    let Ee, ve = {};
    try {
      Ee = await gE(
        g,
        B,
        $,
        P,
        he,
        de,
        !1
      );
    } catch (xe) {
      return P.filter((be) => be.shouldLoad).forEach((be) => {
        ve[be.route.id] = {
          type: "error",
          error: xe
        };
      }), ve;
    }
    if (B.signal.aborted)
      return ve;
    if (!cn(B.method))
      for (let xe of P) {
        if (Ee[xe.route.id]?.type === "error")
          break;
        !Ee.hasOwnProperty(xe.route.id) && !D.loaderData.hasOwnProperty(xe.route.id) && (!D.errors || !D.errors.hasOwnProperty(xe.route.id)) && xe.shouldCallHandler() && (Ee[xe.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${xe.route.id}`
          )
        });
      }
    for (let [xe, be] of Object.entries(Ee))
      if (ME(be)) {
        let Me = be.result;
        ve[xe] = {
          type: "redirect",
          response: bE(
            Me,
            B,
            xe,
            P,
            p
          )
        };
      } else
        ve[xe] = await vE(be);
    return ve;
  }
  async function Pt(B, $, P, de, he) {
    let Ee = Nt(
      P,
      de,
      B,
      he,
      null
    ), ve = Promise.all(
      $.map(async (Me) => {
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
  function Gt() {
    O = !0, ne.forEach((B, $) => {
      G.has($) && Z.add($), Tt($);
    });
  }
  function Wt(B, $, P = {}) {
    let de = new Map(D.fetchers);
    de.set(B, $), Se(
      { fetchers: de },
      { flushSync: (P && P.flushSync) === !0 }
    );
  }
  function Mt(B, $, P, de = {}) {
    let he = Oi(D.matches, $), Ee = new Map(D.fetchers);
    Nn(Ee, B), Se(
      {
        errors: {
          [he.route.id]: P
        },
        fetchers: Ee
      },
      { flushSync: (de && de.flushSync) === !0 }
    );
  }
  function ti(B) {
    return se.set(B, (se.get(B) || 0) + 1), me.has(B) && me.delete(B), D.fetchers.get(B) || lE;
  }
  function kn(B, $) {
    Tt(B, $?.reason), Wt(B, Na(null));
  }
  function Nn(B, $) {
    let P = D.fetchers.get($);
    G.has($) && !(P && P.state === "loading" && V.has($)) && Tt($), ne.delete($), V.delete($), I.delete($), me.delete($), Z.delete($), B.delete($);
  }
  function Xt(B) {
    let $ = (se.get(B) || 0) - 1;
    $ <= 0 ? (se.delete(B), me.add(B)) : se.set(B, $), Se({ fetchers: new Map(D.fetchers) });
  }
  function Tt(B, $) {
    let P = G.get(B);
    P && (P.abort($), G.delete(B));
  }
  function zt(B, $) {
    for (let P of B) {
      let de = $.get(P);
      qe(de, `Expected fetcher: ${P}`);
      let he = Na(de.data);
      $.set(P, he);
    }
  }
  function ni(B) {
    let $ = [], P = !1;
    for (let de of I) {
      let he = B.get(de);
      qe(he, `Expected fetcher: ${de}`), he.state === "loading" && (I.delete(de), $.push(de), P = !0);
    }
    return zt($, B), P;
  }
  function ya(B, $) {
    let P = [];
    for (let [de, he] of V)
      if (he < B) {
        let Ee = $.get(de);
        qe(Ee, `Expected fetcher: ${de}`), Ee.state === "loading" && (Tt(de), V.delete(de), P.push(de));
      }
    return zt(P, $), P.length > 0;
  }
  function mn(B, $) {
    let P = D.blockers.get(B) || to;
    return ge.get(B) !== $ && ge.set(B, $), P;
  }
  function ta(B) {
    D.blockers.delete(B), ge.delete(B);
  }
  function Mn(B, $) {
    let P = D.blockers.get(B) || to;
    qe(
      P.state === "unblocked" && $.state === "blocked" || P.state === "blocked" && $.state === "blocked" || P.state === "blocked" && $.state === "proceeding" || P.state === "blocked" && $.state === "unblocked" || P.state === "proceeding" && $.state === "unblocked",
      `Invalid blocker state transition: ${P.state} -> ${$.state}`
    );
    let de = new Map(D.blockers);
    de.set(B, $), Se({ blockers: de });
  }
  function Yn({
    currentLocation: B,
    nextLocation: $,
    historyAction: P
  }) {
    if (ge.size === 0)
      return;
    ge.size > 1 && Ht(!1, "A router only supports one blocker at a time");
    let de = Array.from(ge.entries()), [he, Ee] = de[de.length - 1], ve = D.blockers.get(he);
    if (!(ve && ve.state === "proceeding") && Ee({ currentLocation: B, nextLocation: $, historyAction: P }))
      return he;
  }
  function on(B) {
    let $ = Jn(404, { pathname: B }), P = h.activeRoutes, { matches: de, route: he } = Qs(P);
    return { notFoundMatches: de, route: he, error: $ };
  }
  function je(B, $, P) {
    if (S = B, T = $, C = P || null, !N && D.navigation === ud) {
      N = !0;
      let de = Ot(D.location, D.matches);
      de != null && Se({ restoreScrollPosition: de });
    }
    return () => {
      S = null, T = null, C = null;
    };
  }
  function ot(B, $) {
    return C && C(
      B,
      $.map((de) => zw(de, D.loaderData))
    ) || B.key;
  }
  function Rt(B, $) {
    if (S && T) {
      let P = ot(B, $);
      S[P] = T();
    }
  }
  function Ot(B, $) {
    if (S) {
      let P = ot(B, $), de = S[P];
      if (typeof de == "number")
        return de;
    }
    return null;
  }
  function fn(B, $, P) {
    if (t.patchRoutesOnNavigation) {
      let de = h.branches;
      if (B) {
        if (Object.keys(B[0].params).length > 0)
          return { active: !0, matches: sa(
            $,
            P,
            p,
            !0,
            de
          ) };
      } else
        return { active: !0, matches: sa(
          $,
          P,
          p,
          !0,
          de
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function rt(B, $, P, de) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: B };
    let he = B;
    for (; ; ) {
      let Ee = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: P,
          path: $,
          matches: he,
          fetcherKey: de,
          patch: (Me, Te) => {
            P.aborted || Y0(
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
      if (P.aborted)
        return { type: "aborted" };
      let ve = h.branches, xe = sa(
        h.activeRoutes,
        $,
        p,
        !1,
        ve
      ), be = null;
      if (xe) {
        if (Object.keys(xe[0].params).length === 0)
          return { type: "success", matches: xe };
        if (be = sa(
          h.activeRoutes,
          $,
          p,
          !0,
          ve
        ), !(be && he.length < be.length && $t(
          he,
          be.slice(0, he.length)
        )))
          return { type: "success", matches: xe };
      }
      if (be || (be = sa(
        h.activeRoutes,
        $,
        p,
        !0,
        ve
      )), !be || $t(he, be))
        return { type: "success", matches: null };
      he = be;
    }
  }
  function $t(B, $) {
    return B.length === $.length && B.every((P, de) => P.route.id === $[de].route.id);
  }
  function na(B) {
    f = {}, h.setHmrRoutes(
      mo(
        B,
        u,
        void 0,
        f
      )
    );
  }
  function Kt(B, $, P = !1) {
    Y0(
      B,
      $,
      h,
      f,
      u,
      P
    ), h.hasHMRRoutes || Se({});
  }
  return k = {
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
      return f;
    },
    get window() {
      return a;
    },
    initialize: ze,
    subscribe: we,
    enableScrollRestoration: je,
    navigate: Ge,
    fetch: Et,
    revalidate: nt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (B) => t.history.createHref(B),
    encodeLocation: (B) => t.history.encodeLocation(B),
    getFetcher: ti,
    resetFetcher: kn,
    deleteFetcher: Xt,
    dispose: Ae,
    getBlocker: mn,
    deleteBlocker: ta,
    patchRoutes: Kt,
    _internalFetchControllers: G,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: na,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(B) {
      Se(B);
    }
  }, t.instrumentations && (k = Fw(
    k,
    t.instrumentations.map((B) => B.router).filter(Boolean)
  )), k;
}
function uE(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function zd(t, a, l, o, s, u) {
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
    lh(f),
    Wn(t.pathname, l) || t.pathname,
    u === "path"
  );
  if (o == null && (p.search = t.search, p.hash = t.hash), (o == null || o === "" || o === ".") && h) {
    let g = uh(p.search);
    if (h.route.index && !g)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && g) {
      let y = new URLSearchParams(p.search), m = y.getAll("index");
      y.delete("index"), m.filter((x) => x).forEach((x) => y.append("index", x));
      let v = y.toString();
      p.search = v ? `?${v}` : "";
    }
  }
  return l !== "/" && (p.pathname = Xw({ basename: l, pathname: p.pathname })), Ra(p);
}
function U0(t, a, l) {
  if (!l || !uE(l))
    return { path: a };
  if (l.formMethod && !RE(l.formMethod))
    return {
      path: a,
      error: Jn(405, { method: l.formMethod })
    };
  let o = () => ({
    path: a,
    error: Jn(400, { type: "invalid-body" })
  }), u = (l.formMethod || "get").toUpperCase(), f = eb(a);
  if (l.body !== void 0) {
    if (l.formEncType === "text/plain") {
      if (!cn(u))
        return o();
      let m = typeof l.body == "string" ? l.body : l.body instanceof FormData || l.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(l.body.entries()).reduce(
          (v, [x, S]) => `${v}${x}=${S}
`,
          ""
        )
      ) : String(l.body);
      return {
        path: a,
        submission: {
          formMethod: u,
          formAction: f,
          formEncType: l.formEncType,
          formData: void 0,
          json: void 0,
          text: m
        }
      };
    } else if (l.formEncType === "application/json") {
      if (!cn(u))
        return o();
      try {
        let m = typeof l.body == "string" ? JSON.parse(l.body) : l.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: f,
            formEncType: l.formEncType,
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
  qe(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let h, p;
  if (l.formData)
    h = jd(l.formData), p = l.formData;
  else if (l.body instanceof FormData)
    h = jd(l.body), p = l.body;
  else if (l.body instanceof URLSearchParams)
    h = l.body, p = $0(h);
  else if (l.body == null)
    h = new URLSearchParams(), p = new FormData();
  else
    try {
      h = new URLSearchParams(l.body), p = $0(h);
    } catch {
      return o();
    }
  let g = {
    formMethod: u,
    formAction: f,
    formEncType: l && l.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (cn(g.formMethod))
    return { path: a, submission: g };
  let y = ma(a);
  return t && y.search && uh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: Ra(y), submission: g };
}
function k0(t, a, l, o, s, u, f, h, p, g, y, m, v, x, S, C, T, N, j, w, z, U) {
  let H = z ? Hn(z[1]) ? z[1].error : z[1].data : void 0, k = s.createURL(u.location), D = s.createURL(p), Q;
  if (y && u.errors) {
    let _ = Object.keys(u.errors)[0];
    Q = f.findIndex((O) => O.route.id === _);
  } else if (z && Hn(z[1])) {
    let _ = z[0];
    Q = f.findIndex((O) => O.route.id === _) - 1;
  }
  let le = z ? z[1].statusCode : void 0, K = le && le >= 400, J = {
    currentUrl: k,
    currentParams: u.matches[0]?.params || {},
    nextUrl: D,
    nextParams: f[0].params,
    ...h,
    actionResult: H,
    actionStatus: le
  }, oe = Mo(f), L = f.map((_, O) => {
    let { route: Z } = _, G = null;
    if (Q != null && O > Q)
      G = !1;
    else if (Z.lazy)
      G = !0;
    else if (!oh(Z))
      G = !1;
    else if (y) {
      let { shouldLoad: I } = Qv(
        Z,
        u.loaderData,
        u.errors
      );
      G = I;
    } else cE(u.loaderData, u.matches[O], _) && (G = !0);
    if (G !== null)
      return Od(
        l,
        o,
        t,
        p,
        oe,
        _,
        g,
        a,
        G
      );
    let ae = !1;
    typeof U == "boolean" ? ae = U : K ? ae = !1 : (m || k.pathname + k.search === D.pathname + D.search || k.search !== D.search || fE(u.matches[O], _)) && (ae = !0);
    let A = {
      ...J,
      defaultShouldRevalidate: ae
    }, V = co(_, A);
    return Od(
      l,
      o,
      t,
      p,
      oe,
      _,
      g,
      a,
      V,
      A,
      U
    );
  }), X = [];
  return S.forEach((_, O) => {
    if (y || !f.some((se) => se.route.id === _.routeId) || x.has(O))
      return;
    let Z = u.fetchers.get(O), G = Z && Z.state !== "idle" && Z.data === void 0, ae = sa(
      T,
      _.path,
      N ?? "/",
      !1,
      w
    );
    if (!ae) {
      if (j && G)
        return;
      X.push({
        key: O,
        routeId: _.routeId,
        path: _.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (C.has(O))
      return;
    let A = su(ae, _.path), V = new AbortController(), I = Kl(
      s,
      _.path,
      V.signal
    ), ne = null;
    if (v.has(O))
      v.delete(O), ne = Wl(
        l,
        o,
        I,
        _.path,
        ae,
        A,
        g,
        a
      );
    else if (G)
      m && (ne = Wl(
        l,
        o,
        I,
        _.path,
        ae,
        A,
        g,
        a
      ));
    else {
      let se;
      typeof U == "boolean" ? se = U : K ? se = !1 : se = m;
      let me = {
        ...J,
        defaultShouldRevalidate: se
      };
      co(A, me) && (ne = Wl(
        l,
        o,
        I,
        _.path,
        ae,
        A,
        g,
        a,
        me
      ));
    }
    ne && X.push({
      key: O,
      routeId: _.routeId,
      path: _.path,
      matches: ne,
      match: A,
      request: I,
      controller: V
    });
  }), { dsMatches: L, revalidatingFetchers: X };
}
function oh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Qv(t, a, l) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!oh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let o = a != null && t.id in a, s = l != null && l[t.id] !== void 0;
  if (!o && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !o };
  let u = !o && !s;
  return { shouldLoad: u, renderFallback: u };
}
function cE(t, a, l) {
  let o = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    l.route.id !== a.route.id
  ), s = !t.hasOwnProperty(l.route.id);
  return o || s;
}
function fE(t, a) {
  let l = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    l != null && l.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function co(t, a) {
  if (t.route.shouldRevalidate) {
    let l = t.route.shouldRevalidate(a);
    if (typeof l == "boolean")
      return l;
  }
  return a.defaultShouldRevalidate;
}
function Y0(t, a, l, o, s, u) {
  let f;
  if (t) {
    let g = o[t];
    qe(
      g,
      `No route found to patch children into: routeId = ${t}`
    ), g.children || (g.children = []), f = g.children;
  } else
    f = l.activeRoutes;
  let h = [], p = [];
  if (a.forEach((g) => {
    let y = f.find(
      (m) => Kv(g, m)
    );
    y ? p.push({ existingRoute: y, newRoute: g }) : h.push(g);
  }), h.length > 0) {
    let g = mo(
      h,
      s,
      [t || "_", "patch", String(f?.length || "0")],
      o
    );
    f.push(...g);
  }
  if (u && p.length > 0)
    for (let g = 0; g < p.length; g++) {
      let { existingRoute: y, newRoute: m } = p[g], v = y, [x] = mo(
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
  l.hasHMRRoutes || l.setRoutes([...l.activeRoutes]);
}
function Kv(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (l, o) => a.children?.some((s) => Kv(l, s))
  ) ?? !1 : !1;
}
var V0 = /* @__PURE__ */ new WeakMap(), Iv = ({
  key: t,
  route: a,
  manifest: l,
  mapRouteProperties: o
}) => {
  let s = l[a.id];
  if (qe(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object")
    return;
  let u = s.lazy[t];
  if (!u)
    return;
  let f = V0.get(s);
  f || (f = {}, V0.set(s, f));
  let h = f[t];
  if (h)
    return h;
  let p = (async () => {
    let g = Cw(t), m = s[t] !== void 0 && t !== "hasErrorBoundary";
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
}, q0 = /* @__PURE__ */ new WeakMap();
function dE(t, a, l, o, s) {
  let u = l[t.id];
  if (qe(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let y = q0.get(u);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let m = (async () => {
      qe(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let v = await t.lazy(), x = {};
      for (let S in v) {
        let C = v[S];
        if (C === void 0)
          continue;
        let T = Aw(S), j = u[S] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        S !== "hasErrorBoundary";
        T ? Ht(
          !T,
          "Route property " + S + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : j ? Ht(
          !j,
          `Route "${u.id}" has a static property "${S}" defined but its lazy function is also returning a value for this property. The lazy route property "${S}" will be ignored.`
        ) : x[S] = C;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...o(u),
        lazy: void 0
      });
    })();
    return q0.set(u, m), m.catch(() => {
    }), {
      lazyRoutePromise: m,
      lazyHandlerPromise: m
    };
  }
  let f = Object.keys(t.lazy), h = [], p;
  for (let y of f) {
    if (s && s.includes(y))
      continue;
    let m = Iv({
      key: y,
      route: t,
      manifest: l,
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
async function G0(t) {
  let a = t.matches.filter((s) => s.shouldLoad), l = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    l[a[u].route.id] = s;
  }), l;
}
async function hE(t) {
  return t.matches.some((a) => a.route.middleware) ? Fv(t, () => G0(t)) : G0(t);
}
function Fv(t, a) {
  return mE(
    t,
    a,
    (o) => {
      if (CE(o))
        throw o;
      return o;
    },
    _E,
    l
  );
  function l(o, s, u) {
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
      ), p = Oi(
        f,
        f[h].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: o }
      });
    }
  }
}
async function mE(t, a, l, o, s) {
  let { matches: u, ...f } = t, h = u.flatMap(
    (g) => g.route.middleware ? g.route.middleware.map((y) => [g.route.id, y]) : []
  );
  return await Jv(
    f,
    h,
    a,
    l,
    o,
    s
  );
}
async function Jv(t, a, l, o, s, u, f = 0) {
  let { request: h } = t;
  if (h.signal.aborted)
    throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let p = a[f];
  if (!p)
    return await l();
  let [g, y] = p, m, v = async () => {
    if (m)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return m = { value: await Jv(
        t,
        a,
        l,
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
function Pv(t, a, l, o, s) {
  let u = Iv({
    key: "middleware",
    route: o.route,
    manifest: a,
    mapRouteProperties: t
  }), f = dE(
    o.route,
    cn(l.method) ? "action" : "loader",
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
function Od(t, a, l, o, s, u, f, h, p, g = null, y) {
  let m = !1, v = Pv(
    t,
    a,
    l,
    u,
    f
  );
  return {
    ...u,
    _lazyPromises: v,
    shouldLoad: p,
    shouldRevalidateArgs: g,
    shouldCallHandler(x) {
      return m = !0, g ? typeof y == "boolean" ? co(u, {
        ...g,
        defaultShouldRevalidate: y
      }) : typeof x == "boolean" ? co(u, {
        ...g,
        defaultShouldRevalidate: x
      }) : co(u, g) : p;
    },
    resolve(x) {
      let { lazy: S, loader: C, middleware: T } = u.route, N = m || p || x && !cn(l.method) && (S || C), j = T && T.length > 0 && !C && !S;
      return N && (cn(l.method) || !j) ? pE({
        request: l,
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
function Wl(t, a, l, o, s, u, f, h, p = null) {
  return s.map((g) => g.route.id !== u.route.id ? {
    ...g,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: Pv(
      t,
      a,
      l,
      g,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Od(
    t,
    a,
    l,
    o,
    Mo(s),
    g,
    f,
    h,
    !0,
    p
  ));
}
async function gE(t, a, l, o, s, u, f) {
  o.some((y) => y._lazyPromises?.middleware) && await Promise.all(o.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    url: Wv(a, l),
    pattern: Mo(o),
    params: o[0].params,
    context: u,
    matches: o
  }, g = await t({
    ...h,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let m = h;
      return Fv(m, () => y({
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
async function pE({
  request: t,
  path: a,
  pattern: l,
  match: o,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: f,
  scopedContext: h
}) {
  let p, g, y = cn(t.method), m = y ? "action" : "loader", v = (x) => {
    let S, C = new Promise((j, w) => S = w);
    g = () => S(), t.signal.addEventListener("abort", g);
    let T = (j) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${m}" [routeId: ${o.route.id}]`
      )
    ) : x(
      {
        request: t,
        url: Wv(t, a),
        pattern: l,
        params: o.params,
        context: h
      },
      ...j !== void 0 ? [j] : []
    ), N = (async () => {
      try {
        return { type: "data", result: await (f ? f((w) => T(w)) : T()) };
      } catch (j) {
        return { type: "error", result: j };
      }
    })();
    return Promise.race([N, C]);
  };
  try {
    let x = y ? o.route.action : o.route.loader;
    if (s || u)
      if (x) {
        let S, [C] = await Promise.all([
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
        p = C;
      } else {
        await s;
        let S = y ? o.route.action : o.route.loader;
        if (S)
          [p] = await Promise.all([v(S), u]);
        else if (m === "action") {
          let C = new URL(t.url), T = C.pathname + C.search;
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
      let S = new URL(t.url), C = S.pathname + S.search;
      throw Jn(404, {
        pathname: C
      });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    g && t.signal.removeEventListener("abort", g);
  }
  return p;
}
async function yE(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function vE(t) {
  let { result: a, type: l } = t;
  if (sh(a)) {
    let o;
    try {
      o = await yE(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return l === "error" ? {
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
  return l === "error" ? I0(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: EE(a),
    statusCode: go(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: go(a) ? a.status : void 0
  } : I0(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function bE(t, a, l, o, s) {
  let u = t.headers.get("Location");
  if (qe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !ih(u)) {
    let f = o.slice(
      0,
      o.findIndex((h) => h.route.id === l) + 1
    );
    u = zd(
      new URL(a.url),
      f,
      s,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var xE = [
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
function Ld(t) {
  try {
    return xE.includes(new URL(t).protocol);
  } catch {
    return !1;
  }
}
function X0(t, a, l, o) {
  if (ih(t)) {
    let s = t, u = ah.test(s) ? new URL(
      Ov(s, a.protocol)
    ) : new URL(s);
    if (Ld(u.toString()))
      throw new Error("Invalid redirect location");
    let f = Wn(u.pathname, l) != null;
    if (u.origin === a.origin && f)
      return rh(u.pathname) + u.search + u.hash;
  }
  try {
    let s = o.createURL(t);
    if (Ld(s.toString()))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Kl(t, a, l, o) {
  let s = t.createURL(eb(a)).toString(), u = { signal: l };
  if (o && cn(o.formMethod)) {
    let { formMethod: f, formEncType: h } = o;
    u.method = f.toUpperCase(), h === "application/json" ? (u.headers = new Headers({ "Content-Type": h }), u.body = JSON.stringify(o.json)) : h === "text/plain" ? u.body = o.text : h === "application/x-www-form-urlencoded" && o.formData ? u.body = jd(o.formData) : u.body = o.formData;
  }
  return new Request(s, u);
}
function Wv(t, a) {
  let l = new URL(t.url), o = typeof a == "string" ? ma(a) : a;
  if (l.pathname = o.pathname || "/", o.search) {
    let s = new URLSearchParams(o.search), u = s.getAll("index");
    s.delete("index");
    for (let f of u.filter(Boolean))
      s.append("index", f);
    l.search = s.size ? `?${s.toString()}` : "";
  } else
    l.search = "";
  return l.hash = o.hash || "", l;
}
function jd(t) {
  let a = new URLSearchParams();
  for (let [l, o] of t.entries())
    a.append(l, typeof o == "string" ? o : o.name);
  return a;
}
function $0(t) {
  let a = new FormData();
  for (let [l, o] of t.entries())
    a.append(l, o);
  return a;
}
function SE(t, a, l, o = !1, s = !1) {
  let u = {}, f = null, h, p = !1, g = {}, y = l && Hn(l[1]) ? l[1].error : void 0;
  return t.forEach((m) => {
    if (!(m.route.id in a))
      return;
    let v = m.route.id, x = a[v];
    if (qe(
      !nl(x),
      "Cannot handle redirect results in processLoaderData"
    ), Hn(x)) {
      let S = x.error;
      if (y !== void 0 && (S = y, y = void 0), f = f || {}, s)
        f[v] = S;
      else {
        let C = Oi(t, v);
        f[C.route.id] == null && (f[C.route.id] = S);
      }
      o || (u[v] = Zv), p || (p = !0, h = go(x.error) ? x.error.status : 500), x.headers && (g[v] = x.headers);
    } else
      u[v] = x.data, x.statusCode && x.statusCode !== 200 && !p && (h = x.statusCode), x.headers && (g[v] = x.headers);
  }), y !== void 0 && l && (f = { [l[0]]: y }, l[2] && (u[l[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: h || 200,
    loaderHeaders: g
  };
}
function Z0(t, a, l, o, s, u, f) {
  let { loaderData: h, errors: p } = SE(
    a,
    l,
    o
  );
  return s.filter((g) => !g.matches || g.matches.some((y) => y.shouldLoad)).forEach((g) => {
    let { key: y, match: m, controller: v } = g;
    if (v && v.signal.aborted)
      return;
    let x = u[y];
    if (qe(x, "Did not find corresponding fetcher result"), Hn(x)) {
      let S = Oi(t.matches, m?.route.id);
      p && p[S.route.id] || (p = {
        ...p,
        [S.route.id]: x.error
      }), f.delete(y);
    } else if (nl(x))
      qe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Na(x.data);
      f.set(y, S);
    }
  }), { loaderData: h, errors: p };
}
function Q0(t, a, l, o) {
  let s = Object.entries(a).filter(([, u]) => u !== Zv).reduce((u, [f, h]) => (u[f] = h, u), {});
  for (let u of l) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (s[f] = t[f]), o && o.hasOwnProperty(f))
      break;
  }
  return s;
}
function K0(t) {
  return t ? Hn(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function Oi(t, a) {
  return (a ? t.slice(0, t.findIndex((o) => o.route.id === a) + 1) : [...t]).reverse().find((o) => o.route.hasErrorBoundary === !0) || t[0];
}
function Qs(t) {
  let a = t.length === 1 ? t[0] : t.find((l) => l.index || !l.path || l.path === "/") || {
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
  routeId: l,
  method: o,
  type: s,
  message: u
} = {}) {
  let f = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return t === 400 ? (f = "Bad Request", o && a && l ? h = `You made a ${o} request to "${a}" but did not provide a \`loader\` for route "${l}", so there is no way to handle the request.` : s === "invalid-body" && (h = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", h = `Route "${l}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", h = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", o && a && l ? h = `You made a ${o.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${l}", so there is no way to handle the request.` : o && (h = `Invalid request method "${o.toUpperCase()}"`)), new Ou(
    t || 500,
    f,
    new Error(h),
    !0
  );
}
function Ks(t) {
  let a = Object.entries(t);
  for (let l = a.length - 1; l >= 0; l--) {
    let [o, s] = a[l];
    if (nl(s))
      return { key: o, result: s };
  }
}
function eb(t) {
  let a = typeof t == "string" ? ma(t) : t;
  return Ra({ ...a, hash: "" });
}
function wE(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function EE(t) {
  return new Ou(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function _E(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, l]) => typeof a == "string" && NE(l)
  );
}
function NE(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function ME(t) {
  return sh(t.result) && Xv.has(t.result.status);
}
function Hn(t) {
  return t.type === "error";
}
function nl(t) {
  return (t && t.type) === "redirect";
}
function I0(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function sh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function TE(t) {
  return Xv.has(t);
}
function CE(t) {
  return sh(t) && TE(t.status) && t.headers.has("Location");
}
function RE(t) {
  return aE.has(t.toUpperCase());
}
function cn(t) {
  return tE.has(t.toUpperCase());
}
function uh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function su(t, a) {
  let l = typeof a == "string" ? ma(a).search : a.search;
  if (t[t.length - 1].route.index && uh(l || ""))
    return t[t.length - 1];
  let o = kv(t);
  return o[o.length - 1];
}
function F0(t) {
  let { formMethod: a, formAction: l, formEncType: o, text: s, formData: u, json: f } = t;
  if (!(!a || !l || !o)) {
    if (s != null)
      return {
        formMethod: a,
        formAction: l,
        formEncType: o,
        formData: void 0,
        json: void 0,
        text: s
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: l,
        formEncType: o,
        formData: u,
        json: void 0,
        text: void 0
      };
    if (f !== void 0)
      return {
        formMethod: a,
        formAction: l,
        formEncType: o,
        formData: void 0,
        json: f,
        text: void 0
      };
  }
}
function cd(t, a, l, o) {
  return o ? {
    state: "loading",
    location: t,
    matches: a,
    historyAction: l,
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
    historyAction: l,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function AE(t, a, l, o) {
  return {
    state: "submitting",
    location: t,
    matches: a,
    historyAction: l,
    formMethod: o.formMethod,
    formAction: o.formAction,
    formEncType: o.formEncType,
    formData: o.formData,
    json: o.json,
    text: o.text
  };
}
function no(t, a) {
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
function DE(t, a) {
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
function Na(t) {
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
function zE(t, a) {
  try {
    let l = t.sessionStorage.getItem(
      $v
    );
    if (l) {
      let o = JSON.parse(l);
      for (let [s, u] of Object.entries(o || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function OE(t, a) {
  if (a.size > 0) {
    let l = {};
    for (let [o, s] of a)
      l[o] = [...s];
    try {
      t.sessionStorage.setItem(
        $v,
        JSON.stringify(l)
      );
    } catch (o) {
      Ht(
        !1,
        `Failed to save applied view transitions in sessionStorage (${o}).`
      );
    }
  }
}
function J0() {
  let t, a, l = new Promise((o, s) => {
    t = async (u) => {
      o(u);
      try {
        await l;
      } catch {
      }
    }, a = async (u) => {
      s(u);
      try {
        await l;
      } catch {
      }
    };
  });
  return {
    promise: l,
    //@ts-ignore
    resolve: t,
    //@ts-ignore
    reject: a
  };
}
var fl = M.createContext(null);
fl.displayName = "DataRouter";
var To = M.createContext(null);
To.displayName = "DataRouterState";
var tb = M.createContext(!1);
function nb() {
  return M.useContext(tb);
}
var ch = M.createContext({
  isTransitioning: !1
});
ch.displayName = "ViewTransition";
var ab = M.createContext(
  /* @__PURE__ */ new Map()
);
ab.displayName = "Fetchers";
var LE = M.createContext(null);
LE.displayName = "Await";
var ea = M.createContext(
  null
);
ea.displayName = "Navigation";
var Lu = M.createContext(
  null
);
Lu.displayName = "Location";
var ga = M.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ga.displayName = "Route";
var fh = M.createContext(null);
fh.displayName = "RouteError";
var ib = "REACT_ROUTER_ERROR", jE = "REDIRECT", HE = "ROUTE_ERROR_RESPONSE";
function BE(t) {
  if (t.startsWith(`${ib}:${jE}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function UE(t) {
  if (t.startsWith(
    `${ib}:${HE}:{`
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
function kE(t, { relative: a } = {}) {
  qe(
    Co(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: l, navigator: o } = M.useContext(ea), { hash: s, pathname: u, search: f } = Ro(t, { relative: a }), h = u;
  return l !== "/" && (h = u === "/" ? l : Pn([l, u])), o.createHref({ pathname: h, search: f, hash: s });
}
function Co() {
  return M.useContext(Lu) != null;
}
function Wa() {
  return qe(
    Co(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), M.useContext(Lu).location;
}
var lb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function rb(t) {
  M.useContext(ea).static || M.useLayoutEffect(t);
}
function YE() {
  let { isDataRoute: t } = M.useContext(ga);
  return t ? n2() : VE();
}
function VE() {
  qe(
    Co(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = M.useContext(fl), { basename: a, navigator: l } = M.useContext(ea), { matches: o } = M.useContext(ga), { pathname: s } = Wa(), u = JSON.stringify(lh(o)), f = M.useRef(!1);
  return rb(() => {
    f.current = !0;
  }), M.useCallback(
    (p, g = {}) => {
      if (Ht(f.current, lb), !f.current) return;
      if (typeof p == "number") {
        l.go(p);
        return;
      }
      let y = zu(
        p,
        JSON.parse(u),
        s,
        g.relative === "path"
      );
      t == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : Pn([a, y.pathname])), (g.replace ? l.replace : l.push)(
        y,
        g.state,
        g
      );
    },
    [
      a,
      l,
      u,
      s,
      t
    ]
  );
}
var qE = M.createContext(null);
function GE(t) {
  let a = M.useContext(ga).outlet;
  return M.useMemo(
    () => a && /* @__PURE__ */ M.createElement(qE.Provider, { value: t }, a),
    [a, t]
  );
}
function XE() {
  let { matches: t } = M.useContext(ga);
  return t[t.length - 1]?.params ?? {};
}
function Ro(t, { relative: a } = {}) {
  let { matches: l } = M.useContext(ga), { pathname: o } = Wa(), s = JSON.stringify(lh(l));
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
function $E(t, a, l) {
  qe(
    Co(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o } = M.useContext(ea), { matches: s } = M.useContext(ga), u = s[s.length - 1], f = u ? u.params : {}, h = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", g = u && u.route;
  {
    let T = g && g.path || "";
    sb(
      h,
      !g || T.endsWith("*") || T.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${T}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${T}"> to <Route path="${T === "/" ? "*" : `${T}/*`}">.`
    );
  }
  let y = Wa(), m;
  m = y;
  let v = m.pathname || "/", x = v;
  if (p !== "/") {
    let T = p.replace(/^\//, "").split("/");
    x = "/" + v.replace(/^\//, "").split("/").slice(T.length).join("/");
  }
  let S = l && l.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    l.state.matches.map(
      (T) => Object.assign(T, {
        route: l.manifest[T.route.id] || T.route
      })
    )
  ) : Lv(t, { pathname: x });
  return Ht(
    g || S != null,
    `No routes matched location "${m.pathname}${m.search}${m.hash}" `
  ), Ht(
    S == null || S[S.length - 1].route.element !== void 0 || S[S.length - 1].route.Component !== void 0 || S[S.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), FE(
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
    l
  );
}
function ZE() {
  let t = t2(), a = go(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), l = t instanceof Error ? t.stack : null, o = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: o }, u = { padding: "2px 4px", backgroundColor: o }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ M.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ M.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ M.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ M.createElement("h3", { style: { fontStyle: "italic" } }, a), l ? /* @__PURE__ */ M.createElement("pre", { style: s }, l) : null, f);
}
var QE = /* @__PURE__ */ M.createElement(ZE, null), ob = class extends M.Component {
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
      const l = UE(t.digest);
      l && (t = l);
    }
    let a = t !== void 0 ? /* @__PURE__ */ M.createElement(ga.Provider, { value: this.props.routeContext }, /* @__PURE__ */ M.createElement(
      fh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ M.createElement(KE, { error: t }, a) : a;
  }
};
ob.contextType = tb;
var fd = /* @__PURE__ */ new WeakMap();
function KE({
  children: t,
  error: a
}) {
  let { basename: l } = M.useContext(ea);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let o = BE(a.digest);
    if (o) {
      let s = fd.get(a);
      if (s) throw s;
      let u = Vv(o.location, l), f = u.absoluteURL || u.to;
      if (Ld(f))
        throw new Error("Invalid redirect location");
      if (Yv && !fd.get(a))
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
function IE({ routeContext: t, match: a, children: l }) {
  let o = M.useContext(fl);
  return o && o.static && o.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ M.createElement(ga.Provider, { value: t }, l);
}
function FE(t, a = [], l) {
  let o = l?.state;
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
    qe(
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
  if (l && o) {
    f = o.renderFallback;
    for (let y = 0; y < s.length; y++) {
      let m = s[y];
      if ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (h = y), m.route.id) {
        let { loaderData: v, errors: x } = o, S = m.route.loader && !v.hasOwnProperty(m.route.id) && (!x || x[m.route.id] === void 0);
        if (m.route.lazy || S) {
          l.isStatic && (f = !0), h >= 0 ? s = s.slice(0, h + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let p = l?.onError, g = o && p ? (y, m) => {
    p(y, {
      location: o.location,
      params: o.matches?.[0]?.params ?? {},
      pattern: Mo(o.matches),
      errorInfo: m
    });
  } : void 0;
  return s.reduceRight(
    (y, m, v) => {
      let x, S = !1, C = null, T = null;
      o && (x = u && m.route.id ? u[m.route.id] : void 0, C = m.route.errorElement || QE, f && (h < 0 && v === 0 ? (sb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), S = !0, T = null) : h === v && (S = !0, T = m.route.hydrateFallbackElement || null)));
      let N = a.concat(s.slice(0, v + 1)), j = () => {
        let w;
        return x ? w = C : S ? w = T : m.route.Component ? w = /* @__PURE__ */ M.createElement(m.route.Component, null) : m.route.element ? w = m.route.element : w = y, /* @__PURE__ */ M.createElement(
          IE,
          {
            match: m,
            routeContext: {
              outlet: y,
              matches: N,
              isDataRoute: o != null
            },
            children: w
          }
        );
      };
      return o && (m.route.ErrorBoundary || m.route.errorElement || v === 0) ? /* @__PURE__ */ M.createElement(
        ob,
        {
          location: o.location,
          revalidation: o.revalidation,
          component: C,
          error: x,
          children: j(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 },
          onError: g
        }
      ) : j();
    },
    null
  );
}
function dh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function JE(t) {
  let a = M.useContext(fl);
  return qe(a, dh(t)), a;
}
function PE(t) {
  let a = M.useContext(To);
  return qe(a, dh(t)), a;
}
function WE(t) {
  let a = M.useContext(ga);
  return qe(a, dh(t)), a;
}
function hh(t) {
  let a = WE(t), l = a.matches[a.matches.length - 1];
  return qe(
    l.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), l.route.id;
}
function e2() {
  return hh(
    "useRouteId"
    /* UseRouteId */
  );
}
function t2() {
  let t = M.useContext(fh), a = PE(
    "useRouteError"
    /* UseRouteError */
  ), l = hh(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[l];
}
function n2() {
  let { router: t } = JE(
    "useNavigate"
    /* UseNavigateStable */
  ), a = hh(
    "useNavigate"
    /* UseNavigateStable */
  ), l = M.useRef(!1);
  return rb(() => {
    l.current = !0;
  }), M.useCallback(
    async (s, u = {}) => {
      Ht(l.current, lb), l.current && (typeof s == "number" ? await t.navigate(s) : await t.navigate(s, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var P0 = {};
function sb(t, a, l) {
  !a && !P0[t] && (P0[t] = !0, Ht(!1, l));
}
var W0 = {};
function ey(t, a) {
  !t && !W0[a] && (W0[a] = !0, console.warn(a));
}
var a2 = "useOptimistic", ty = yw[a2], i2 = () => {
};
function l2(t) {
  return ty ? ty(t) : [t, i2];
}
function r2(t) {
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
var o2 = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function s2(t, a) {
  return sE({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: _w({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: o2,
    mapRouteProperties: r2,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var u2 = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((t, a) => {
      this.resolve = (l) => {
        this.status === "pending" && (this.status = "resolved", t(l));
      }, this.reject = (l) => {
        this.status === "pending" && (this.status = "rejected", a(l));
      };
    });
  }
};
function c2({
  router: t,
  flushSync: a,
  onError: l,
  useTransitions: o
}) {
  o = nb() || o;
  let [u, f] = M.useState(t.state), [h, p] = l2(u), [g, y] = M.useState(), [m, v] = M.useState({
    isTransitioning: !1
  }), [x, S] = M.useState(), [C, T] = M.useState(), [N, j] = M.useState(), w = M.useRef(/* @__PURE__ */ new Map()), z = M.useCallback(
    (D, { deletedFetchers: Q, newErrors: le, flushSync: K, viewTransitionOpts: J }) => {
      le && l && Object.values(le).forEach(
        (L) => l(L, {
          location: D.location,
          params: D.matches[0]?.params ?? {},
          pattern: Mo(D.matches)
        })
      ), D.fetchers.forEach((L, X) => {
        L.data !== void 0 && w.current.set(X, L.data);
      }), Q.forEach((L) => w.current.delete(L)), ey(
        K === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let oe = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (ey(
        J == null || oe,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !J || !oe) {
        a && K ? a(() => f(D)) : o === !1 ? f(D) : M.startTransition(() => {
          o === !0 && p((L) => ny(L, D)), f(D);
        });
        return;
      }
      if (a && K) {
        a(() => {
          C && (x?.resolve(), C.skipTransition()), v({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: J.currentLocation,
            nextLocation: J.nextLocation
          });
        });
        let L = t.window.document.startViewTransition(() => {
          a(() => f(D));
        });
        L.finished.finally(() => {
          a(() => {
            S(void 0), T(void 0), y(void 0), v({ isTransitioning: !1 });
          });
        }), a(() => T(L));
        return;
      }
      C ? (x?.resolve(), C.skipTransition(), j({
        state: D,
        currentLocation: J.currentLocation,
        nextLocation: J.nextLocation
      })) : (y(D), v({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: J.currentLocation,
        nextLocation: J.nextLocation
      }));
    },
    [
      t.window,
      a,
      C,
      x,
      o,
      p,
      l
    ]
  );
  M.useLayoutEffect(() => t.subscribe(z), [t, z]), M.useEffect(() => {
    m.isTransitioning && !m.flushSync && S(new u2());
  }, [m]), M.useEffect(() => {
    if (x && g && t.window) {
      let D = g, Q = x.promise, le = t.window.document.startViewTransition(async () => {
        o === !1 ? f(D) : M.startTransition(() => {
          o === !0 && p((K) => ny(K, D)), f(D);
        }), await Q;
      });
      le.finished.finally(() => {
        S(void 0), T(void 0), y(void 0), v({ isTransitioning: !1 });
      }), T(le);
    }
  }, [
    g,
    x,
    t.window,
    o,
    p
  ]), M.useEffect(() => {
    x && g && h.location.key === g.location.key && x.resolve();
  }, [x, C, h.location, g]), M.useEffect(() => {
    !m.isTransitioning && N && (y(N.state), v({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: N.currentLocation,
      nextLocation: N.nextLocation
    }), j(void 0));
  }, [m.isTransitioning, N]);
  let U = M.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (D) => t.navigate(D),
    push: (D, Q, le) => t.navigate(D, {
      state: Q,
      preventScrollReset: le?.preventScrollReset
    }),
    replace: (D, Q, le) => t.navigate(D, {
      replace: !0,
      state: Q,
      preventScrollReset: le?.preventScrollReset
    })
  }), [t]), H = t.basename || "/", k = M.useMemo(
    () => ({
      router: t,
      navigator: U,
      static: !1,
      basename: H,
      onError: l
    }),
    [t, U, H, l]
  );
  return /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement(fl.Provider, { value: k }, /* @__PURE__ */ M.createElement(To.Provider, { value: h }, /* @__PURE__ */ M.createElement(ab.Provider, { value: w.current }, /* @__PURE__ */ M.createElement(ch.Provider, { value: m }, /* @__PURE__ */ M.createElement(
    m2,
    {
      basename: H,
      location: h.location,
      navigationType: h.historyAction,
      navigator: U,
      useTransitions: o
    },
    /* @__PURE__ */ M.createElement(
      f2,
      {
        routes: t.routes,
        manifest: t.manifest,
        future: t.future,
        state: h,
        isStatic: !1,
        onError: l
      }
    )
  ))))), null);
}
function ny(t, a) {
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
var f2 = M.memo(d2);
function d2({
  routes: t,
  manifest: a,
  future: l,
  state: o,
  isStatic: s,
  onError: u
}) {
  return $E(t, void 0, {
    manifest: a,
    state: o,
    isStatic: s,
    onError: u
  });
}
function h2(t) {
  return GE(t.context);
}
function m2({
  basename: t = "/",
  children: a = null,
  location: l,
  navigationType: o = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: f
}) {
  qe(
    !Co(),
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
  typeof l == "string" && (l = ma(l));
  let {
    pathname: g = "/",
    search: y = "",
    hash: m = "",
    state: v = null,
    key: x = "default",
    mask: S
  } = l, C = M.useMemo(() => {
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
    C != null,
    `<Router basename="${h}"> is not able to match the URL "${g}${y}${m}" because it does not start with the basename, so the <Router> won't render anything.`
  ), C == null ? null : /* @__PURE__ */ M.createElement(ea.Provider, { value: p }, /* @__PURE__ */ M.createElement(Lu.Provider, { children: a, value: C }));
}
var uu = "get", cu = "application/x-www-form-urlencoded";
function ju(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function g2(t) {
  return ju(t) && t.tagName.toLowerCase() === "button";
}
function p2(t) {
  return ju(t) && t.tagName.toLowerCase() === "form";
}
function y2(t) {
  return ju(t) && t.tagName.toLowerCase() === "input";
}
function v2(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function b2(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !v2(t);
}
var Is = null;
function x2() {
  if (Is === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Is = !1;
    } catch {
      Is = !0;
    }
  return Is;
}
var S2 = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function dd(t) {
  return t != null && !S2.has(t) ? (Ht(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${cu}"`
  ), null) : t;
}
function w2(t, a) {
  let l, o, s, u, f;
  if (p2(t)) {
    let h = t.getAttribute("action");
    o = h ? Wn(h, a) : null, l = t.getAttribute("method") || uu, s = dd(t.getAttribute("enctype")) || cu, u = new FormData(t);
  } else if (g2(t) || y2(t) && (t.type === "submit" || t.type === "image")) {
    let h = t.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = t.getAttribute("formaction") || h.getAttribute("action");
    if (o = p ? Wn(p, a) : null, l = t.getAttribute("formmethod") || h.getAttribute("method") || uu, s = dd(t.getAttribute("formenctype")) || dd(h.getAttribute("enctype")) || cu, u = new FormData(h, t), !x2()) {
      let { name: g, type: y, value: m } = t;
      if (y === "image") {
        let v = g ? `${g}.` : "";
        u.append(`${v}x`, "0"), u.append(`${v}y`, "0");
      } else g && u.append(g, m);
    }
  } else {
    if (ju(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    l = uu, o = null, s = cu, f = t;
  }
  return u && s === "text/plain" && (f = u, u = void 0), { action: o, method: l.toLowerCase(), encType: s, formData: u, body: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function mh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function ub(t, a, l, o) {
  let s = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return l ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${o}` : s.pathname = `${s.pathname}.${o}` : s.pathname === "/" ? s.pathname = `_root.${o}` : a && Wn(s.pathname, a) === "/" ? s.pathname = `${bu(a)}/_root.${o}` : s.pathname = `${bu(s.pathname)}.${o}`, s;
}
async function E2(t, a) {
  if (t.id in a)
    return a[t.id];
  try {
    let l = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      t.module
    );
    return a[t.id] = l, l;
  } catch (l) {
    return console.error(
      `Error loading route module \`${t.module}\`, reloading page...`
    ), console.error(l), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function _2(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function N2(t, a, l) {
  let o = await Promise.all(
    t.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let f = await E2(u, l);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return R2(
    o.flat(1).filter(_2).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function ay(t, a, l, o, s, u) {
  let f = (p, g) => l[g] ? p.route.id !== l[g].route.id : !0, h = (p, g) => (
    // param change, /users/123 -> /users/456
    l[g].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    l[g].route.path?.endsWith("*") && l[g].params["*"] !== p.params["*"]
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
        currentParams: l[0]?.params || {},
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
function M2(t, a, { includeHydrateFallback: l } = {}) {
  return T2(
    t.map((o) => {
      let s = a.routes[o.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), l && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function T2(t) {
  return [...new Set(t)];
}
function C2(t) {
  let a = {}, l = Object.keys(t).sort();
  for (let o of l)
    a[o] = t[o];
  return a;
}
function R2(t, a) {
  let l = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((o, s) => {
    let u = JSON.stringify(C2(s));
    return l.has(u) || (l.add(u), o.push({ key: u, link: s })), o;
  }, []);
}
function gh() {
  let t = M.useContext(fl);
  return mh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function A2() {
  let t = M.useContext(To);
  return mh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var ph = M.createContext(void 0);
ph.displayName = "FrameworkContext";
function Hu() {
  let t = M.useContext(ph);
  return mh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function D2(t, a) {
  let l = M.useContext(ph), [o, s] = M.useState(!1), [u, f] = M.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: g, onMouseLeave: y, onTouchStart: m } = a, v = M.useRef(null);
  M.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let C = (N) => {
        N.forEach((j) => {
          f(j.isIntersecting);
        });
      }, T = new IntersectionObserver(C, { threshold: 0.5 });
      return v.current && T.observe(v.current), () => {
        T.disconnect();
      };
    }
  }, [t]), M.useEffect(() => {
    if (o) {
      let C = setTimeout(() => {
        f(!0);
      }, 100);
      return () => {
        clearTimeout(C);
      };
    }
  }, [o]);
  let x = () => {
    s(!0);
  }, S = () => {
    s(!1), f(!1);
  };
  return l ? t !== "intent" ? [u, v, {}] : [
    u,
    v,
    {
      onFocus: ao(h, x),
      onBlur: ao(p, S),
      onMouseEnter: ao(g, x),
      onMouseLeave: ao(y, S),
      onTouchStart: ao(m, x)
    }
  ] : [!1, v, {}];
}
function ao(t, a) {
  return (l) => {
    t && t(l), l.defaultPrevented || a(l);
  };
}
function z2({ page: t, ...a }) {
  let l = nb(), { nonce: o } = Hu(), { router: s } = gh(), u = M.useMemo(
    () => Lv(s.routes, t, s.basename),
    [s.routes, t, s.basename]
  );
  return u ? (a.nonce == null && o && (a = { ...a, nonce: o }), l ? /* @__PURE__ */ M.createElement(L2, { page: t, matches: u, ...a }) : /* @__PURE__ */ M.createElement(j2, { page: t, matches: u, ...a })) : null;
}
function O2(t) {
  let { manifest: a, routeModules: l } = Hu(), [o, s] = M.useState([]);
  return M.useEffect(() => {
    let u = !1;
    return N2(t, a, l).then(
      (f) => {
        u || s(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, l]), o;
}
function L2({
  page: t,
  matches: a,
  ...l
}) {
  let o = Wa(), { future: s } = Hu(), { basename: u } = gh(), f = M.useMemo(() => {
    if (t === o.pathname + o.search + o.hash)
      return [];
    let h = ub(
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
  return /* @__PURE__ */ M.createElement(M.Fragment, null, f.map((h) => /* @__PURE__ */ M.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...l })));
}
function j2({
  page: t,
  matches: a,
  ...l
}) {
  let o = Wa(), { future: s, manifest: u, routeModules: f } = Hu(), { basename: h } = gh(), { loaderData: p, matches: g } = A2(), y = M.useMemo(
    () => ay(
      t,
      a,
      g,
      u,
      o,
      "data"
    ),
    [t, a, g, u, o]
  ), m = M.useMemo(
    () => ay(
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
    let C = /* @__PURE__ */ new Set(), T = !1;
    if (a.forEach((j) => {
      let w = u.routes[j.route.id];
      !w || !w.hasLoader || (!y.some((z) => z.route.id === j.route.id) && j.route.id in p && f[j.route.id]?.shouldRevalidate || w.hasClientLoader ? T = !0 : C.add(j.route.id));
    }), C.size === 0)
      return [];
    let N = ub(
      t,
      h,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return T && C.size > 0 && N.searchParams.set(
      "_routes",
      a.filter((j) => C.has(j.route.id)).map((j) => j.route.id).join(",")
    ), [N.pathname + N.search];
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
    () => M2(m, u),
    [m, u]
  ), S = O2(m);
  return /* @__PURE__ */ M.createElement(M.Fragment, null, v.map((C) => /* @__PURE__ */ M.createElement("link", { key: C, rel: "prefetch", as: "fetch", href: C, ...l })), x.map((C) => /* @__PURE__ */ M.createElement("link", { key: C, rel: "modulepreload", href: C, ...l })), S.map(({ key: C, link: T }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ M.createElement(
      "link",
      {
        key: C,
        nonce: l.nonce,
        ...T,
        crossOrigin: T.crossOrigin ?? l.crossOrigin
      }
    )
  )));
}
function H2(...t) {
  return (a) => {
    t.forEach((l) => {
      typeof l == "function" ? l(a) : l != null && (l.current = a);
    });
  };
}
var B2 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  B2 && (window.__reactRouterVersion = // @ts-expect-error
  "7.18.0");
} catch {
}
var cb = M.forwardRef(
  function({
    onClick: a,
    discover: l = "render",
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
  }, C) {
    let { basename: T, navigator: N, useTransitions: j } = M.useContext(ea), w = typeof y == "string" && Du.test(y), z = Vv(y, T);
    y = z.to;
    let U = kE(y, { relative: s }), H = Wa(), k = null;
    if (h) {
      let X = zu(
        h,
        [],
        H.mask ? H.mask.pathname : "/",
        !0
      );
      T !== "/" && (X.pathname = X.pathname === "/" ? T : Pn([T, X.pathname])), k = N.createHref(X);
    }
    let [D, Q, le] = D2(
      o,
      S
    ), K = Y2(y, {
      replace: f,
      mask: h,
      state: p,
      target: g,
      preventScrollReset: m,
      relative: s,
      viewTransition: v,
      defaultShouldRevalidate: x,
      useTransitions: j
    });
    function J(X) {
      a && a(X), X.defaultPrevented || K(X);
    }
    let oe = !(z.isExternal || u), L = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ M.createElement(
        "a",
        {
          ...S,
          ...le,
          href: (oe ? k : void 0) || z.absoluteURL || U,
          onClick: oe ? J : a,
          ref: H2(C, Q),
          target: g,
          "data-discover": !w && l === "render" ? "true" : void 0
        }
      )
    );
    return D && !w ? /* @__PURE__ */ M.createElement(M.Fragment, null, L, /* @__PURE__ */ M.createElement(z2, { page: U })) : L;
  }
);
cb.displayName = "Link";
var fb = M.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: l = !1,
    className: o = "",
    end: s = !1,
    style: u,
    to: f,
    viewTransition: h,
    children: p,
    ...g
  }, y) {
    let m = Ro(f, { relative: g.relative }), v = Wa(), x = M.useContext(To), { navigator: S, basename: C } = M.useContext(ea), T = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    $2(m) && h === !0, N = S.encodeLocation ? S.encodeLocation(m).pathname : m.pathname, j = v.pathname, w = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    l || (j = j.toLowerCase(), w = w ? w.toLowerCase() : null, N = N.toLowerCase()), w && C && (w = Wn(w, C) || w);
    const z = N !== "/" && N.endsWith("/") ? N.length - 1 : N.length;
    let U = j === N || !s && j.startsWith(N) && j.charAt(z) === "/", H = w != null && (w === N || !s && w.startsWith(N) && w.charAt(N.length) === "/"), k = {
      isActive: U,
      isPending: H,
      isTransitioning: T
    }, D = U ? a : void 0, Q;
    typeof o == "function" ? Q = o(k) : Q = [
      o,
      U ? "active" : null,
      H ? "pending" : null,
      T ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let le = typeof u == "function" ? u(k) : u;
    return /* @__PURE__ */ M.createElement(
      cb,
      {
        ...g,
        "aria-current": D,
        className: Q,
        ref: y,
        style: le,
        to: f,
        viewTransition: h
      },
      typeof p == "function" ? p(k) : p
    );
  }
);
fb.displayName = "NavLink";
var U2 = M.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: l,
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
    let { useTransitions: C } = M.useContext(ea), T = G2(), N = X2(h, { relative: g }), j = f.toLowerCase() === "get" ? "get" : "post", w = typeof h == "string" && Du.test(h), z = (U) => {
      if (p && p(U), U.defaultPrevented) return;
      U.preventDefault();
      let H = U.nativeEvent.submitter, k = H?.getAttribute("formmethod") || f, D = () => T(H || U.currentTarget, {
        fetcherKey: a,
        method: k,
        navigate: l,
        replace: s,
        state: u,
        relative: g,
        preventScrollReset: y,
        viewTransition: m,
        defaultShouldRevalidate: v
      });
      C && l !== !1 ? M.startTransition(() => D()) : D();
    };
    return /* @__PURE__ */ M.createElement(
      "form",
      {
        ref: S,
        method: j,
        action: N,
        onSubmit: o ? p : z,
        ...x,
        "data-discover": !w && t === "render" ? "true" : void 0
      }
    );
  }
);
U2.displayName = "Form";
function k2(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function db(t) {
  let a = M.useContext(fl);
  return qe(a, k2(t)), a;
}
function Y2(t, {
  target: a,
  replace: l,
  mask: o,
  state: s,
  preventScrollReset: u,
  relative: f,
  viewTransition: h,
  defaultShouldRevalidate: p,
  useTransitions: g
} = {}) {
  let y = YE(), m = Wa(), v = Ro(t, { relative: f });
  return M.useCallback(
    (x) => {
      if (b2(x, a)) {
        x.preventDefault();
        let S = l !== void 0 ? l : Ra(m) === Ra(v), C = () => y(t, {
          replace: S,
          mask: o,
          state: s,
          preventScrollReset: u,
          relative: f,
          viewTransition: h,
          defaultShouldRevalidate: p
        });
        g ? M.startTransition(() => C()) : C();
      }
    },
    [
      m,
      y,
      v,
      l,
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
var V2 = 0, q2 = () => `__${String(++V2)}__`;
function G2() {
  let { router: t } = db(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = M.useContext(ea), l = e2(), o = t.fetch, s = t.navigate;
  return M.useCallback(
    async (u, f = {}) => {
      let { action: h, method: p, encType: g, formData: y, body: m } = w2(
        u,
        a
      );
      if (f.navigate === !1) {
        let v = f.fetcherKey || q2();
        await o(v, l, f.action || h, {
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
          fromRouteId: l,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition
        });
    },
    [o, s, a, l]
  );
}
function X2(t, { relative: a } = {}) {
  let { basename: l } = M.useContext(ea), o = M.useContext(ga);
  qe(o, "useFormAction must be used inside a RouteContext");
  let [s] = o.matches.slice(-1), u = { ...Ro(t || ".", { relative: a }) }, f = Wa();
  if (t == null) {
    u.search = f.search;
    let h = new URLSearchParams(u.search), p = h.getAll("index");
    if (p.some((y) => y === "")) {
      h.delete("index"), p.filter((m) => m).forEach((m) => h.append("index", m));
      let y = h.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (!t || t === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), l !== "/" && (u.pathname = u.pathname === "/" ? l : Pn([l, u.pathname])), Ra(u);
}
function $2(t, { relative: a } = {}) {
  let l = M.useContext(ch);
  qe(
    l != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = db(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = Ro(t, { relative: a });
  if (!l.isTransitioning)
    return !1;
  let u = Wn(l.currentLocation.pathname, o) || l.currentLocation.pathname, f = Wn(l.nextLocation.pathname, o) || l.nextLocation.pathname;
  return vu(s.pathname, f) != null || vu(s.pathname, u) != null;
}
const Hd = "trellis2:trigger-generate", Bd = "trellis2:generate-state";
function Z2() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Hd));
}
function Q2(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Bd, { detail: t }));
}
function K2(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Hd, t), () => window.removeEventListener(Hd, t));
}
function I2(t) {
  if (typeof window > "u") return () => {
  };
  const a = (l) => {
    const o = l.detail;
    o && t(o);
  };
  return window.addEventListener(Bd, a), () => window.removeEventListener(Bd, a);
}
const iy = "ext-actions-request", F2 = "ext-actions-declare", J2 = "ext-action-state", ly = "ext-action-invoke", ry = "trellis2:navigate", oy = "trellis2.generate";
function P2(t, a) {
  let l = !1, o = !1;
  const s = () => ({
    id: oy,
    label: l ? "Generating…" : "Generate",
    icon: l ? "hourglass_top" : "deployed_code",
    tone: "primary",
    state: l ? "loading" : o ? "disabled" : "idle",
    tooltip: o ? "Upload an input image before generating" : "Generate a 3D mesh from the input image"
  }), u = () => ({
    primary: s()
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(F2, { detail: { actions: u() }, bubbles: !1 })
    );
  }, h = () => {
    t.dispatchEvent(
      new CustomEvent(J2, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => f(), g = (m) => {
    m.detail?.id === oy && Z2();
  }, y = I2((m) => {
    l = m.busy, o = m.blocked, h();
  });
  return t.addEventListener(iy, p), t.addEventListener(ly, g), f(), {
    dispose: () => {
      y(), t.removeEventListener(iy, p), t.removeEventListener(ly, g);
    }
  };
}
function Vt(t) {
  if (typeof t == "string" || typeof t == "number") return "" + t;
  let a = "";
  if (Array.isArray(t))
    for (let l = 0, o; l < t.length; l++)
      (o = Vt(t[l])) !== "" && (a += (a && " ") + o);
  else
    for (let l in t)
      t[l] && (a += (a && " ") + l);
  return a;
}
var W2 = { value: () => {
} };
function Bu() {
  for (var t = 0, a = arguments.length, l = {}, o; t < a; ++t) {
    if (!(o = arguments[t] + "") || o in l || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    l[o] = [];
  }
  return new fu(l);
}
function fu(t) {
  this._ = t;
}
function e_(t, a) {
  return t.trim().split(/^|\s+/).map(function(l) {
    var o = "", s = l.indexOf(".");
    if (s >= 0 && (o = l.slice(s + 1), l = l.slice(0, s)), l && !a.hasOwnProperty(l)) throw new Error("unknown type: " + l);
    return { type: l, name: o };
  });
}
fu.prototype = Bu.prototype = {
  constructor: fu,
  on: function(t, a) {
    var l = this._, o = e_(t + "", l), s, u = -1, f = o.length;
    if (arguments.length < 2) {
      for (; ++u < f; ) if ((s = (t = o[u]).type) && (s = t_(l[s], t.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < f; )
      if (s = (t = o[u]).type) l[s] = sy(l[s], t.name, a);
      else if (a == null) for (s in l) l[s] = sy(l[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, a = this._;
    for (var l in a) t[l] = a[l].slice();
    return new fu(t);
  },
  call: function(t, a) {
    if ((s = arguments.length - 2) > 0) for (var l = new Array(s), o = 0, s, u; o < s; ++o) l[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (u = this._[t], o = 0, s = u.length; o < s; ++o) u[o].value.apply(a, l);
  },
  apply: function(t, a, l) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var o = this._[t], s = 0, u = o.length; s < u; ++s) o[s].value.apply(a, l);
  }
};
function t_(t, a) {
  for (var l = 0, o = t.length, s; l < o; ++l)
    if ((s = t[l]).name === a)
      return s.value;
}
function sy(t, a, l) {
  for (var o = 0, s = t.length; o < s; ++o)
    if (t[o].name === a) {
      t[o] = W2, t = t.slice(0, o).concat(t.slice(o + 1));
      break;
    }
  return l != null && t.push({ name: a, value: l }), t;
}
var Ud = "http://www.w3.org/1999/xhtml";
const uy = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ud,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Uu(t) {
  var a = t += "", l = a.indexOf(":");
  return l >= 0 && (a = t.slice(0, l)) !== "xmlns" && (t = t.slice(l + 1)), uy.hasOwnProperty(a) ? { space: uy[a], local: t } : t;
}
function n_(t) {
  return function() {
    var a = this.ownerDocument, l = this.namespaceURI;
    return l === Ud && a.documentElement.namespaceURI === Ud ? a.createElement(t) : a.createElementNS(l, t);
  };
}
function a_(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function hb(t) {
  var a = Uu(t);
  return (a.local ? a_ : n_)(a);
}
function i_() {
}
function yh(t) {
  return t == null ? i_ : function() {
    return this.querySelector(t);
  };
}
function l_(t) {
  typeof t != "function" && (t = yh(t));
  for (var a = this._groups, l = a.length, o = new Array(l), s = 0; s < l; ++s)
    for (var u = a[s], f = u.length, h = o[s] = new Array(f), p, g, y = 0; y < f; ++y)
      (p = u[y]) && (g = t.call(p, p.__data__, y, u)) && ("__data__" in p && (g.__data__ = p.__data__), h[y] = g);
  return new Un(o, this._parents);
}
function r_(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function o_() {
  return [];
}
function mb(t) {
  return t == null ? o_ : function() {
    return this.querySelectorAll(t);
  };
}
function s_(t) {
  return function() {
    return r_(t.apply(this, arguments));
  };
}
function u_(t) {
  typeof t == "function" ? t = s_(t) : t = mb(t);
  for (var a = this._groups, l = a.length, o = [], s = [], u = 0; u < l; ++u)
    for (var f = a[u], h = f.length, p, g = 0; g < h; ++g)
      (p = f[g]) && (o.push(t.call(p, p.__data__, g, f)), s.push(p));
  return new Un(o, s);
}
function gb(t) {
  return function() {
    return this.matches(t);
  };
}
function pb(t) {
  return function(a) {
    return a.matches(t);
  };
}
var c_ = Array.prototype.find;
function f_(t) {
  return function() {
    return c_.call(this.children, t);
  };
}
function d_() {
  return this.firstElementChild;
}
function h_(t) {
  return this.select(t == null ? d_ : f_(typeof t == "function" ? t : pb(t)));
}
var m_ = Array.prototype.filter;
function g_() {
  return Array.from(this.children);
}
function p_(t) {
  return function() {
    return m_.call(this.children, t);
  };
}
function y_(t) {
  return this.selectAll(t == null ? g_ : p_(typeof t == "function" ? t : pb(t)));
}
function v_(t) {
  typeof t != "function" && (t = gb(t));
  for (var a = this._groups, l = a.length, o = new Array(l), s = 0; s < l; ++s)
    for (var u = a[s], f = u.length, h = o[s] = [], p, g = 0; g < f; ++g)
      (p = u[g]) && t.call(p, p.__data__, g, u) && h.push(p);
  return new Un(o, this._parents);
}
function yb(t) {
  return new Array(t.length);
}
function b_() {
  return new Un(this._enter || this._groups.map(yb), this._parents);
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
function x_(t) {
  return function() {
    return t;
  };
}
function S_(t, a, l, o, s, u) {
  for (var f = 0, h, p = a.length, g = u.length; f < g; ++f)
    (h = a[f]) ? (h.__data__ = u[f], o[f] = h) : l[f] = new xu(t, u[f]);
  for (; f < p; ++f)
    (h = a[f]) && (s[f] = h);
}
function w_(t, a, l, o, s, u, f) {
  var h, p, g = /* @__PURE__ */ new Map(), y = a.length, m = u.length, v = new Array(y), x;
  for (h = 0; h < y; ++h)
    (p = a[h]) && (v[h] = x = f.call(p, p.__data__, h, a) + "", g.has(x) ? s[h] = p : g.set(x, p));
  for (h = 0; h < m; ++h)
    x = f.call(t, u[h], h, u) + "", (p = g.get(x)) ? (o[h] = p, p.__data__ = u[h], g.delete(x)) : l[h] = new xu(t, u[h]);
  for (h = 0; h < y; ++h)
    (p = a[h]) && g.get(v[h]) === p && (s[h] = p);
}
function E_(t) {
  return t.__data__;
}
function __(t, a) {
  if (!arguments.length) return Array.from(this, E_);
  var l = a ? w_ : S_, o = this._parents, s = this._groups;
  typeof t != "function" && (t = x_(t));
  for (var u = s.length, f = new Array(u), h = new Array(u), p = new Array(u), g = 0; g < u; ++g) {
    var y = o[g], m = s[g], v = m.length, x = N_(t.call(y, y && y.__data__, g, o)), S = x.length, C = h[g] = new Array(S), T = f[g] = new Array(S), N = p[g] = new Array(v);
    l(y, m, C, T, N, x, a);
    for (var j = 0, w = 0, z, U; j < S; ++j)
      if (z = C[j]) {
        for (j >= w && (w = j + 1); !(U = T[w]) && ++w < S; ) ;
        z._next = U || null;
      }
  }
  return f = new Un(f, o), f._enter = h, f._exit = p, f;
}
function N_(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function M_() {
  return new Un(this._exit || this._groups.map(yb), this._parents);
}
function T_(t, a, l) {
  var o = this.enter(), s = this, u = this.exit();
  return typeof t == "function" ? (o = t(o), o && (o = o.selection())) : o = o.append(t + ""), a != null && (s = a(s), s && (s = s.selection())), l == null ? u.remove() : l(u), o && s ? o.merge(s).order() : s;
}
function C_(t) {
  for (var a = t.selection ? t.selection() : t, l = this._groups, o = a._groups, s = l.length, u = o.length, f = Math.min(s, u), h = new Array(s), p = 0; p < f; ++p)
    for (var g = l[p], y = o[p], m = g.length, v = h[p] = new Array(m), x, S = 0; S < m; ++S)
      (x = g[S] || y[S]) && (v[S] = x);
  for (; p < s; ++p)
    h[p] = l[p];
  return new Un(h, this._parents);
}
function R_() {
  for (var t = this._groups, a = -1, l = t.length; ++a < l; )
    for (var o = t[a], s = o.length - 1, u = o[s], f; --s >= 0; )
      (f = o[s]) && (u && f.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(f, u), u = f);
  return this;
}
function A_(t) {
  t || (t = D_);
  function a(m, v) {
    return m && v ? t(m.__data__, v.__data__) : !m - !v;
  }
  for (var l = this._groups, o = l.length, s = new Array(o), u = 0; u < o; ++u) {
    for (var f = l[u], h = f.length, p = s[u] = new Array(h), g, y = 0; y < h; ++y)
      (g = f[y]) && (p[y] = g);
    p.sort(a);
  }
  return new Un(s, this._parents).order();
}
function D_(t, a) {
  return t < a ? -1 : t > a ? 1 : t >= a ? 0 : NaN;
}
function z_() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function O_() {
  return Array.from(this);
}
function L_() {
  for (var t = this._groups, a = 0, l = t.length; a < l; ++a)
    for (var o = t[a], s = 0, u = o.length; s < u; ++s) {
      var f = o[s];
      if (f) return f;
    }
  return null;
}
function j_() {
  let t = 0;
  for (const a of this) ++t;
  return t;
}
function H_() {
  return !this.node();
}
function B_(t) {
  for (var a = this._groups, l = 0, o = a.length; l < o; ++l)
    for (var s = a[l], u = 0, f = s.length, h; u < f; ++u)
      (h = s[u]) && t.call(h, h.__data__, u, s);
  return this;
}
function U_(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function k_(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Y_(t, a) {
  return function() {
    this.setAttribute(t, a);
  };
}
function V_(t, a) {
  return function() {
    this.setAttributeNS(t.space, t.local, a);
  };
}
function q_(t, a) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.removeAttribute(t) : this.setAttribute(t, l);
  };
}
function G_(t, a) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, l);
  };
}
function X_(t, a) {
  var l = Uu(t);
  if (arguments.length < 2) {
    var o = this.node();
    return l.local ? o.getAttributeNS(l.space, l.local) : o.getAttribute(l);
  }
  return this.each((a == null ? l.local ? k_ : U_ : typeof a == "function" ? l.local ? G_ : q_ : l.local ? V_ : Y_)(l, a));
}
function vb(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function $_(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Z_(t, a, l) {
  return function() {
    this.style.setProperty(t, a, l);
  };
}
function Q_(t, a, l) {
  return function() {
    var o = a.apply(this, arguments);
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, l);
  };
}
function K_(t, a, l) {
  return arguments.length > 1 ? this.each((a == null ? $_ : typeof a == "function" ? Q_ : Z_)(t, a, l ?? "")) : ar(this.node(), t);
}
function ar(t, a) {
  return t.style.getPropertyValue(a) || vb(t).getComputedStyle(t, null).getPropertyValue(a);
}
function I_(t) {
  return function() {
    delete this[t];
  };
}
function F_(t, a) {
  return function() {
    this[t] = a;
  };
}
function J_(t, a) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? delete this[t] : this[t] = l;
  };
}
function P_(t, a) {
  return arguments.length > 1 ? this.each((a == null ? I_ : typeof a == "function" ? J_ : F_)(t, a)) : this.node()[t];
}
function bb(t) {
  return t.trim().split(/^|\s+/);
}
function vh(t) {
  return t.classList || new xb(t);
}
function xb(t) {
  this._node = t, this._names = bb(t.getAttribute("class") || "");
}
xb.prototype = {
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
function Sb(t, a) {
  for (var l = vh(t), o = -1, s = a.length; ++o < s; ) l.add(a[o]);
}
function wb(t, a) {
  for (var l = vh(t), o = -1, s = a.length; ++o < s; ) l.remove(a[o]);
}
function W_(t) {
  return function() {
    Sb(this, t);
  };
}
function eN(t) {
  return function() {
    wb(this, t);
  };
}
function tN(t, a) {
  return function() {
    (a.apply(this, arguments) ? Sb : wb)(this, t);
  };
}
function nN(t, a) {
  var l = bb(t + "");
  if (arguments.length < 2) {
    for (var o = vh(this.node()), s = -1, u = l.length; ++s < u; ) if (!o.contains(l[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? tN : a ? W_ : eN)(l, a));
}
function aN() {
  this.textContent = "";
}
function iN(t) {
  return function() {
    this.textContent = t;
  };
}
function lN(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function rN(t) {
  return arguments.length ? this.each(t == null ? aN : (typeof t == "function" ? lN : iN)(t)) : this.node().textContent;
}
function oN() {
  this.innerHTML = "";
}
function sN(t) {
  return function() {
    this.innerHTML = t;
  };
}
function uN(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function cN(t) {
  return arguments.length ? this.each(t == null ? oN : (typeof t == "function" ? uN : sN)(t)) : this.node().innerHTML;
}
function fN() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function dN() {
  return this.each(fN);
}
function hN() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function mN() {
  return this.each(hN);
}
function gN(t) {
  var a = typeof t == "function" ? t : hb(t);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function pN() {
  return null;
}
function yN(t, a) {
  var l = typeof t == "function" ? t : hb(t), o = a == null ? pN : typeof a == "function" ? a : yh(a);
  return this.select(function() {
    return this.insertBefore(l.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function vN() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function bN() {
  return this.each(vN);
}
function xN() {
  var t = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function SN() {
  var t = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function wN(t) {
  return this.select(t ? SN : xN);
}
function EN(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function _N(t) {
  return function(a) {
    t.call(this, a, this.__data__);
  };
}
function NN(t) {
  return t.trim().split(/^|\s+/).map(function(a) {
    var l = "", o = a.indexOf(".");
    return o >= 0 && (l = a.slice(o + 1), a = a.slice(0, o)), { type: a, name: l };
  });
}
function MN(t) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var l = 0, o = -1, s = a.length, u; l < s; ++l)
        u = a[l], (!t.type || u.type === t.type) && u.name === t.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++o] = u;
      ++o ? a.length = o : delete this.__on;
    }
  };
}
function TN(t, a, l) {
  return function() {
    var o = this.__on, s, u = _N(a);
    if (o) {
      for (var f = 0, h = o.length; f < h; ++f)
        if ((s = o[f]).type === t.type && s.name === t.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = u, s.options = l), s.value = a;
          return;
        }
    }
    this.addEventListener(t.type, u, l), s = { type: t.type, name: t.name, value: a, listener: u, options: l }, o ? o.push(s) : this.__on = [s];
  };
}
function CN(t, a, l) {
  var o = NN(t + ""), s, u = o.length, f;
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
  for (h = a ? TN : MN, s = 0; s < u; ++s) this.each(h(o[s], a, l));
  return this;
}
function Eb(t, a, l) {
  var o = vb(t), s = o.CustomEvent;
  typeof s == "function" ? s = new s(a, l) : (s = o.document.createEvent("Event"), l ? (s.initEvent(a, l.bubbles, l.cancelable), s.detail = l.detail) : s.initEvent(a, !1, !1)), t.dispatchEvent(s);
}
function RN(t, a) {
  return function() {
    return Eb(this, t, a);
  };
}
function AN(t, a) {
  return function() {
    return Eb(this, t, a.apply(this, arguments));
  };
}
function DN(t, a) {
  return this.each((typeof a == "function" ? AN : RN)(t, a));
}
function* zN() {
  for (var t = this._groups, a = 0, l = t.length; a < l; ++a)
    for (var o = t[a], s = 0, u = o.length, f; s < u; ++s)
      (f = o[s]) && (yield f);
}
var _b = [null];
function Un(t, a) {
  this._groups = t, this._parents = a;
}
function Ao() {
  return new Un([[document.documentElement]], _b);
}
function ON() {
  return this;
}
Un.prototype = Ao.prototype = {
  constructor: Un,
  select: l_,
  selectAll: u_,
  selectChild: h_,
  selectChildren: y_,
  filter: v_,
  data: __,
  enter: b_,
  exit: M_,
  join: T_,
  merge: C_,
  selection: ON,
  order: R_,
  sort: A_,
  call: z_,
  nodes: O_,
  node: L_,
  size: j_,
  empty: H_,
  each: B_,
  attr: X_,
  style: K_,
  property: P_,
  classed: nN,
  text: rN,
  html: cN,
  raise: dN,
  lower: mN,
  append: gN,
  insert: yN,
  remove: bN,
  clone: wN,
  datum: EN,
  on: CN,
  dispatch: DN,
  [Symbol.iterator]: zN
};
function Bn(t) {
  return typeof t == "string" ? new Un([[document.querySelector(t)]], [document.documentElement]) : new Un([[t]], _b);
}
function LN(t) {
  let a;
  for (; a = t.sourceEvent; ) t = a;
  return t;
}
function ua(t, a) {
  if (t = LN(t), a === void 0 && (a = t.currentTarget), a) {
    var l = a.ownerSVGElement || a;
    if (l.createSVGPoint) {
      var o = l.createSVGPoint();
      return o.x = t.clientX, o.y = t.clientY, o = o.matrixTransform(a.getScreenCTM().inverse()), [o.x, o.y];
    }
    if (a.getBoundingClientRect) {
      var s = a.getBoundingClientRect();
      return [t.clientX - s.left - a.clientLeft, t.clientY - s.top - a.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const jN = { passive: !1 }, po = { capture: !0, passive: !1 };
function hd(t) {
  t.stopImmediatePropagation();
}
function er(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Nb(t) {
  var a = t.document.documentElement, l = Bn(t).on("dragstart.drag", er, po);
  "onselectstart" in a ? l.on("selectstart.drag", er, po) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function Mb(t, a) {
  var l = t.document.documentElement, o = Bn(t).on("dragstart.drag", null);
  a && (o.on("click.drag", er, po), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in l ? o.on("selectstart.drag", null) : (l.style.MozUserSelect = l.__noselect, delete l.__noselect);
}
const Fs = (t) => () => t;
function kd(t, {
  sourceEvent: a,
  subject: l,
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
    subject: { value: l, enumerable: !0, configurable: !0 },
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
kd.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function HN(t) {
  return !t.ctrlKey && !t.button;
}
function BN() {
  return this.parentNode;
}
function UN(t, a) {
  return a ?? { x: t.x, y: t.y };
}
function kN() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Tb() {
  var t = HN, a = BN, l = UN, o = kN, s = {}, u = Bu("start", "drag", "end"), f = 0, h, p, g, y, m = 0;
  function v(z) {
    z.on("mousedown.drag", x).filter(o).on("touchstart.drag", T).on("touchmove.drag", N, jN).on("touchend.drag touchcancel.drag", j).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(z, U) {
    if (!(y || !t.call(this, z, U))) {
      var H = w(this, a.call(this, z, U), z, U, "mouse");
      H && (Bn(z.view).on("mousemove.drag", S, po).on("mouseup.drag", C, po), Nb(z.view), hd(z), g = !1, h = z.clientX, p = z.clientY, H("start", z));
    }
  }
  function S(z) {
    if (er(z), !g) {
      var U = z.clientX - h, H = z.clientY - p;
      g = U * U + H * H > m;
    }
    s.mouse("drag", z);
  }
  function C(z) {
    Bn(z.view).on("mousemove.drag mouseup.drag", null), Mb(z.view, g), er(z), s.mouse("end", z);
  }
  function T(z, U) {
    if (t.call(this, z, U)) {
      var H = z.changedTouches, k = a.call(this, z, U), D = H.length, Q, le;
      for (Q = 0; Q < D; ++Q)
        (le = w(this, k, z, U, H[Q].identifier, H[Q])) && (hd(z), le("start", z, H[Q]));
    }
  }
  function N(z) {
    var U = z.changedTouches, H = U.length, k, D;
    for (k = 0; k < H; ++k)
      (D = s[U[k].identifier]) && (er(z), D("drag", z, U[k]));
  }
  function j(z) {
    var U = z.changedTouches, H = U.length, k, D;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), k = 0; k < H; ++k)
      (D = s[U[k].identifier]) && (hd(z), D("end", z, U[k]));
  }
  function w(z, U, H, k, D, Q) {
    var le = u.copy(), K = ua(Q || H, U), J, oe, L;
    if ((L = l.call(z, new kd("beforestart", {
      sourceEvent: H,
      target: v,
      identifier: D,
      active: f,
      x: K[0],
      y: K[1],
      dx: 0,
      dy: 0,
      dispatch: le
    }), k)) != null)
      return J = L.x - K[0] || 0, oe = L.y - K[1] || 0, function X(_, O, Z) {
        var G = K, ae;
        switch (_) {
          case "start":
            s[D] = X, ae = f++;
            break;
          case "end":
            delete s[D], --f;
          // falls through
          case "drag":
            K = ua(Z || O, U), ae = f;
            break;
        }
        le.call(
          _,
          z,
          new kd(_, {
            sourceEvent: O,
            subject: L,
            target: v,
            identifier: D,
            active: ae,
            x: K[0] + J,
            y: K[1] + oe,
            dx: K[0] - G[0],
            dy: K[1] - G[1],
            dispatch: le
          }),
          k
        );
      };
  }
  return v.filter = function(z) {
    return arguments.length ? (t = typeof z == "function" ? z : Fs(!!z), v) : t;
  }, v.container = function(z) {
    return arguments.length ? (a = typeof z == "function" ? z : Fs(z), v) : a;
  }, v.subject = function(z) {
    return arguments.length ? (l = typeof z == "function" ? z : Fs(z), v) : l;
  }, v.touchable = function(z) {
    return arguments.length ? (o = typeof z == "function" ? z : Fs(!!z), v) : o;
  }, v.on = function() {
    var z = u.on.apply(u, arguments);
    return z === u ? v : z;
  }, v.clickDistance = function(z) {
    return arguments.length ? (m = (z = +z) * z, v) : Math.sqrt(m);
  }, v;
}
function bh(t, a, l) {
  t.prototype = a.prototype = l, l.constructor = t;
}
function Cb(t, a) {
  var l = Object.create(t.prototype);
  for (var o in a) l[o] = a[o];
  return l;
}
function Do() {
}
var yo = 0.7, Su = 1 / yo, tr = "\\s*([+-]?\\d+)\\s*", vo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ta = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", YN = /^#([0-9a-f]{3,8})$/, VN = new RegExp(`^rgb\\(${tr},${tr},${tr}\\)$`), qN = new RegExp(`^rgb\\(${Ta},${Ta},${Ta}\\)$`), GN = new RegExp(`^rgba\\(${tr},${tr},${tr},${vo}\\)$`), XN = new RegExp(`^rgba\\(${Ta},${Ta},${Ta},${vo}\\)$`), $N = new RegExp(`^hsl\\(${vo},${Ta},${Ta}\\)$`), ZN = new RegExp(`^hsla\\(${vo},${Ta},${Ta},${vo}\\)$`), cy = {
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
bh(Do, rl, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: fy,
  // Deprecated! Use color.formatHex.
  formatHex: fy,
  formatHex8: QN,
  formatHsl: KN,
  formatRgb: dy,
  toString: dy
});
function fy() {
  return this.rgb().formatHex();
}
function QN() {
  return this.rgb().formatHex8();
}
function KN() {
  return Rb(this).formatHsl();
}
function dy() {
  return this.rgb().formatRgb();
}
function rl(t) {
  var a, l;
  return t = (t + "").trim().toLowerCase(), (a = YN.exec(t)) ? (l = a[1].length, a = parseInt(a[1], 16), l === 6 ? hy(a) : l === 3 ? new _n(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : l === 8 ? Js(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : l === 4 ? Js(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = VN.exec(t)) ? new _n(a[1], a[2], a[3], 1) : (a = qN.exec(t)) ? new _n(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = GN.exec(t)) ? Js(a[1], a[2], a[3], a[4]) : (a = XN.exec(t)) ? Js(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = $N.exec(t)) ? py(a[1], a[2] / 100, a[3] / 100, 1) : (a = ZN.exec(t)) ? py(a[1], a[2] / 100, a[3] / 100, a[4]) : cy.hasOwnProperty(t) ? hy(cy[t]) : t === "transparent" ? new _n(NaN, NaN, NaN, 0) : null;
}
function hy(t) {
  return new _n(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Js(t, a, l, o) {
  return o <= 0 && (t = a = l = NaN), new _n(t, a, l, o);
}
function IN(t) {
  return t instanceof Do || (t = rl(t)), t ? (t = t.rgb(), new _n(t.r, t.g, t.b, t.opacity)) : new _n();
}
function Yd(t, a, l, o) {
  return arguments.length === 1 ? IN(t) : new _n(t, a, l, o ?? 1);
}
function _n(t, a, l, o) {
  this.r = +t, this.g = +a, this.b = +l, this.opacity = +o;
}
bh(_n, Yd, Cb(Do, {
  brighter(t) {
    return t = t == null ? Su : Math.pow(Su, t), new _n(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? yo : Math.pow(yo, t), new _n(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new _n(il(this.r), il(this.g), il(this.b), wu(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: my,
  // Deprecated! Use color.formatHex.
  formatHex: my,
  formatHex8: FN,
  formatRgb: gy,
  toString: gy
}));
function my() {
  return `#${al(this.r)}${al(this.g)}${al(this.b)}`;
}
function FN() {
  return `#${al(this.r)}${al(this.g)}${al(this.b)}${al((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function gy() {
  const t = wu(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${il(this.r)}, ${il(this.g)}, ${il(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function wu(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function il(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function al(t) {
  return t = il(t), (t < 16 ? "0" : "") + t.toString(16);
}
function py(t, a, l, o) {
  return o <= 0 ? t = a = l = NaN : l <= 0 || l >= 1 ? t = a = NaN : a <= 0 && (t = NaN), new ca(t, a, l, o);
}
function Rb(t) {
  if (t instanceof ca) return new ca(t.h, t.s, t.l, t.opacity);
  if (t instanceof Do || (t = rl(t)), !t) return new ca();
  if (t instanceof ca) return t;
  t = t.rgb();
  var a = t.r / 255, l = t.g / 255, o = t.b / 255, s = Math.min(a, l, o), u = Math.max(a, l, o), f = NaN, h = u - s, p = (u + s) / 2;
  return h ? (a === u ? f = (l - o) / h + (l < o) * 6 : l === u ? f = (o - a) / h + 2 : f = (a - l) / h + 4, h /= p < 0.5 ? u + s : 2 - u - s, f *= 60) : h = p > 0 && p < 1 ? 0 : f, new ca(f, h, p, t.opacity);
}
function JN(t, a, l, o) {
  return arguments.length === 1 ? Rb(t) : new ca(t, a, l, o ?? 1);
}
function ca(t, a, l, o) {
  this.h = +t, this.s = +a, this.l = +l, this.opacity = +o;
}
bh(ca, JN, Cb(Do, {
  brighter(t) {
    return t = t == null ? Su : Math.pow(Su, t), new ca(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? yo : Math.pow(yo, t), new ca(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, a = isNaN(t) || isNaN(this.s) ? 0 : this.s, l = this.l, o = l + (l < 0.5 ? l : 1 - l) * a, s = 2 * l - o;
    return new _n(
      md(t >= 240 ? t - 240 : t + 120, s, o),
      md(t, s, o),
      md(t < 120 ? t + 240 : t - 120, s, o),
      this.opacity
    );
  },
  clamp() {
    return new ca(yy(this.h), Ps(this.s), Ps(this.l), wu(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = wu(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${yy(this.h)}, ${Ps(this.s) * 100}%, ${Ps(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function yy(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Ps(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function md(t, a, l) {
  return (t < 60 ? a + (l - a) * t / 60 : t < 180 ? l : t < 240 ? a + (l - a) * (240 - t) / 60 : a) * 255;
}
const xh = (t) => () => t;
function PN(t, a) {
  return function(l) {
    return t + l * a;
  };
}
function WN(t, a, l) {
  return t = Math.pow(t, l), a = Math.pow(a, l) - t, l = 1 / l, function(o) {
    return Math.pow(t + o * a, l);
  };
}
function eM(t) {
  return (t = +t) == 1 ? Ab : function(a, l) {
    return l - a ? WN(a, l, t) : xh(isNaN(a) ? l : a);
  };
}
function Ab(t, a) {
  var l = a - t;
  return l ? PN(t, l) : xh(isNaN(t) ? a : t);
}
const Eu = (function t(a) {
  var l = eM(a);
  function o(s, u) {
    var f = l((s = Yd(s)).r, (u = Yd(u)).r), h = l(s.g, u.g), p = l(s.b, u.b), g = Ab(s.opacity, u.opacity);
    return function(y) {
      return s.r = f(y), s.g = h(y), s.b = p(y), s.opacity = g(y), s + "";
    };
  }
  return o.gamma = t, o;
})(1);
function tM(t, a) {
  a || (a = []);
  var l = t ? Math.min(a.length, t.length) : 0, o = a.slice(), s;
  return function(u) {
    for (s = 0; s < l; ++s) o[s] = t[s] * (1 - u) + a[s] * u;
    return o;
  };
}
function nM(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function aM(t, a) {
  var l = a ? a.length : 0, o = t ? Math.min(l, t.length) : 0, s = new Array(o), u = new Array(l), f;
  for (f = 0; f < o; ++f) s[f] = fo(t[f], a[f]);
  for (; f < l; ++f) u[f] = a[f];
  return function(h) {
    for (f = 0; f < o; ++f) u[f] = s[f](h);
    return u;
  };
}
function iM(t, a) {
  var l = /* @__PURE__ */ new Date();
  return t = +t, a = +a, function(o) {
    return l.setTime(t * (1 - o) + a * o), l;
  };
}
function Ma(t, a) {
  return t = +t, a = +a, function(l) {
    return t * (1 - l) + a * l;
  };
}
function lM(t, a) {
  var l = {}, o = {}, s;
  (t === null || typeof t != "object") && (t = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in t ? l[s] = fo(t[s], a[s]) : o[s] = a[s];
  return function(u) {
    for (s in l) o[s] = l[s](u);
    return o;
  };
}
var Vd = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, gd = new RegExp(Vd.source, "g");
function rM(t) {
  return function() {
    return t;
  };
}
function oM(t) {
  return function(a) {
    return t(a) + "";
  };
}
function Db(t, a) {
  var l = Vd.lastIndex = gd.lastIndex = 0, o, s, u, f = -1, h = [], p = [];
  for (t = t + "", a = a + ""; (o = Vd.exec(t)) && (s = gd.exec(a)); )
    (u = s.index) > l && (u = a.slice(l, u), h[f] ? h[f] += u : h[++f] = u), (o = o[0]) === (s = s[0]) ? h[f] ? h[f] += s : h[++f] = s : (h[++f] = null, p.push({ i: f, x: Ma(o, s) })), l = gd.lastIndex;
  return l < a.length && (u = a.slice(l), h[f] ? h[f] += u : h[++f] = u), h.length < 2 ? p[0] ? oM(p[0].x) : rM(a) : (a = p.length, function(g) {
    for (var y = 0, m; y < a; ++y) h[(m = p[y]).i] = m.x(g);
    return h.join("");
  });
}
function fo(t, a) {
  var l = typeof a, o;
  return a == null || l === "boolean" ? xh(a) : (l === "number" ? Ma : l === "string" ? (o = rl(a)) ? (a = o, Eu) : Db : a instanceof rl ? Eu : a instanceof Date ? iM : nM(a) ? tM : Array.isArray(a) ? aM : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? lM : Ma)(t, a);
}
var vy = 180 / Math.PI, qd = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function zb(t, a, l, o, s, u) {
  var f, h, p;
  return (f = Math.sqrt(t * t + a * a)) && (t /= f, a /= f), (p = t * l + a * o) && (l -= t * p, o -= a * p), (h = Math.sqrt(l * l + o * o)) && (l /= h, o /= h, p /= h), t * o < a * l && (t = -t, a = -a, p = -p, f = -f), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, t) * vy,
    skewX: Math.atan(p) * vy,
    scaleX: f,
    scaleY: h
  };
}
var Ws;
function sM(t) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return a.isIdentity ? qd : zb(a.a, a.b, a.c, a.d, a.e, a.f);
}
function uM(t) {
  return t == null || (Ws || (Ws = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ws.setAttribute("transform", t), !(t = Ws.transform.baseVal.consolidate())) ? qd : (t = t.matrix, zb(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Ob(t, a, l, o) {
  function s(g) {
    return g.length ? g.pop() + " " : "";
  }
  function u(g, y, m, v, x, S) {
    if (g !== m || y !== v) {
      var C = x.push("translate(", null, a, null, l);
      S.push({ i: C - 4, x: Ma(g, m) }, { i: C - 2, x: Ma(y, v) });
    } else (m || v) && x.push("translate(" + m + a + v + l);
  }
  function f(g, y, m, v) {
    g !== y ? (g - y > 180 ? y += 360 : y - g > 180 && (g += 360), v.push({ i: m.push(s(m) + "rotate(", null, o) - 2, x: Ma(g, y) })) : y && m.push(s(m) + "rotate(" + y + o);
  }
  function h(g, y, m, v) {
    g !== y ? v.push({ i: m.push(s(m) + "skewX(", null, o) - 2, x: Ma(g, y) }) : y && m.push(s(m) + "skewX(" + y + o);
  }
  function p(g, y, m, v, x, S) {
    if (g !== m || y !== v) {
      var C = x.push(s(x) + "scale(", null, ",", null, ")");
      S.push({ i: C - 4, x: Ma(g, m) }, { i: C - 2, x: Ma(y, v) });
    } else (m !== 1 || v !== 1) && x.push(s(x) + "scale(" + m + "," + v + ")");
  }
  return function(g, y) {
    var m = [], v = [];
    return g = t(g), y = t(y), u(g.translateX, g.translateY, y.translateX, y.translateY, m, v), f(g.rotate, y.rotate, m, v), h(g.skewX, y.skewX, m, v), p(g.scaleX, g.scaleY, y.scaleX, y.scaleY, m, v), g = y = null, function(x) {
      for (var S = -1, C = v.length, T; ++S < C; ) m[(T = v[S]).i] = T.x(x);
      return m.join("");
    };
  };
}
var cM = Ob(sM, "px, ", "px)", "deg)"), fM = Ob(uM, ", ", ")", ")"), dM = 1e-12;
function by(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function hM(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function mM(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const du = (function t(a, l, o) {
  function s(u, f) {
    var h = u[0], p = u[1], g = u[2], y = f[0], m = f[1], v = f[2], x = y - h, S = m - p, C = x * x + S * S, T, N;
    if (C < dM)
      N = Math.log(v / g) / a, T = function(k) {
        return [
          h + k * x,
          p + k * S,
          g * Math.exp(a * k * N)
        ];
      };
    else {
      var j = Math.sqrt(C), w = (v * v - g * g + o * C) / (2 * g * l * j), z = (v * v - g * g - o * C) / (2 * v * l * j), U = Math.log(Math.sqrt(w * w + 1) - w), H = Math.log(Math.sqrt(z * z + 1) - z);
      N = (H - U) / a, T = function(k) {
        var D = k * N, Q = by(U), le = g / (l * j) * (Q * mM(a * D + U) - hM(U));
        return [
          h + le * x,
          p + le * S,
          g * Q / by(a * D + U)
        ];
      };
    }
    return T.duration = N * 1e3 * a / Math.SQRT2, T;
  }
  return s.rho = function(u) {
    var f = Math.max(1e-3, +u), h = f * f, p = h * h;
    return t(f, h, p);
  }, s;
})(Math.SQRT2, 2, 4);
var ir = 0, so = 0, io = 0, Lb = 1e3, _u, uo, Nu = 0, ol = 0, ku = 0, bo = typeof performance == "object" && performance.now ? performance : Date, jb = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Sh() {
  return ol || (jb(gM), ol = bo.now() + ku);
}
function gM() {
  ol = 0;
}
function Mu() {
  this._call = this._time = this._next = null;
}
Mu.prototype = Hb.prototype = {
  constructor: Mu,
  restart: function(t, a, l) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    l = (l == null ? Sh() : +l) + (a == null ? 0 : +a), !this._next && uo !== this && (uo ? uo._next = this : _u = this, uo = this), this._call = t, this._time = l, Gd();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Gd());
  }
};
function Hb(t, a, l) {
  var o = new Mu();
  return o.restart(t, a, l), o;
}
function pM() {
  Sh(), ++ir;
  for (var t = _u, a; t; )
    (a = ol - t._time) >= 0 && t._call.call(void 0, a), t = t._next;
  --ir;
}
function xy() {
  ol = (Nu = bo.now()) + ku, ir = so = 0;
  try {
    pM();
  } finally {
    ir = 0, vM(), ol = 0;
  }
}
function yM() {
  var t = bo.now(), a = t - Nu;
  a > Lb && (ku -= a, Nu = t);
}
function vM() {
  for (var t, a = _u, l, o = 1 / 0; a; )
    a._call ? (o > a._time && (o = a._time), t = a, a = a._next) : (l = a._next, a._next = null, a = t ? t._next = l : _u = l);
  uo = t, Gd(o);
}
function Gd(t) {
  if (!ir) {
    so && (so = clearTimeout(so));
    var a = t - ol;
    a > 24 ? (t < 1 / 0 && (so = setTimeout(xy, t - bo.now() - ku)), io && (io = clearInterval(io))) : (io || (Nu = bo.now(), io = setInterval(yM, Lb)), ir = 1, jb(xy));
  }
}
function Sy(t, a, l) {
  var o = new Mu();
  return a = a == null ? 0 : +a, o.restart((s) => {
    o.stop(), t(s + a);
  }, a, l), o;
}
var bM = Bu("start", "end", "cancel", "interrupt"), xM = [], Bb = 0, wy = 1, Xd = 2, hu = 3, Ey = 4, $d = 5, mu = 6;
function Yu(t, a, l, o, s, u) {
  var f = t.__transition;
  if (!f) t.__transition = {};
  else if (l in f) return;
  SM(t, l, {
    name: a,
    index: o,
    // For context during callback.
    group: s,
    // For context during callback.
    on: bM,
    tween: xM,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: Bb
  });
}
function wh(t, a) {
  var l = pa(t, a);
  if (l.state > Bb) throw new Error("too late; already scheduled");
  return l;
}
function Aa(t, a) {
  var l = pa(t, a);
  if (l.state > hu) throw new Error("too late; already running");
  return l;
}
function pa(t, a) {
  var l = t.__transition;
  if (!l || !(l = l[a])) throw new Error("transition not found");
  return l;
}
function SM(t, a, l) {
  var o = t.__transition, s;
  o[a] = l, l.timer = Hb(u, 0, l.time);
  function u(g) {
    l.state = wy, l.timer.restart(f, l.delay, l.time), l.delay <= g && f(g - l.delay);
  }
  function f(g) {
    var y, m, v, x;
    if (l.state !== wy) return p();
    for (y in o)
      if (x = o[y], x.name === l.name) {
        if (x.state === hu) return Sy(f);
        x.state === Ey ? (x.state = mu, x.timer.stop(), x.on.call("interrupt", t, t.__data__, x.index, x.group), delete o[y]) : +y < a && (x.state = mu, x.timer.stop(), x.on.call("cancel", t, t.__data__, x.index, x.group), delete o[y]);
      }
    if (Sy(function() {
      l.state === hu && (l.state = Ey, l.timer.restart(h, l.delay, l.time), h(g));
    }), l.state = Xd, l.on.call("start", t, t.__data__, l.index, l.group), l.state === Xd) {
      for (l.state = hu, s = new Array(v = l.tween.length), y = 0, m = -1; y < v; ++y)
        (x = l.tween[y].value.call(t, t.__data__, l.index, l.group)) && (s[++m] = x);
      s.length = m + 1;
    }
  }
  function h(g) {
    for (var y = g < l.duration ? l.ease.call(null, g / l.duration) : (l.timer.restart(p), l.state = $d, 1), m = -1, v = s.length; ++m < v; )
      s[m].call(t, y);
    l.state === $d && (l.on.call("end", t, t.__data__, l.index, l.group), p());
  }
  function p() {
    l.state = mu, l.timer.stop(), delete o[a];
    for (var g in o) return;
    delete t.__transition;
  }
}
function gu(t, a) {
  var l = t.__transition, o, s, u = !0, f;
  if (l) {
    a = a == null ? null : a + "";
    for (f in l) {
      if ((o = l[f]).name !== a) {
        u = !1;
        continue;
      }
      s = o.state > Xd && o.state < $d, o.state = mu, o.timer.stop(), o.on.call(s ? "interrupt" : "cancel", t, t.__data__, o.index, o.group), delete l[f];
    }
    u && delete t.__transition;
  }
}
function wM(t) {
  return this.each(function() {
    gu(this, t);
  });
}
function EM(t, a) {
  var l, o;
  return function() {
    var s = Aa(this, t), u = s.tween;
    if (u !== l) {
      o = l = u;
      for (var f = 0, h = o.length; f < h; ++f)
        if (o[f].name === a) {
          o = o.slice(), o.splice(f, 1);
          break;
        }
    }
    s.tween = o;
  };
}
function _M(t, a, l) {
  var o, s;
  if (typeof l != "function") throw new Error();
  return function() {
    var u = Aa(this, t), f = u.tween;
    if (f !== o) {
      s = (o = f).slice();
      for (var h = { name: a, value: l }, p = 0, g = s.length; p < g; ++p)
        if (s[p].name === a) {
          s[p] = h;
          break;
        }
      p === g && s.push(h);
    }
    u.tween = s;
  };
}
function NM(t, a) {
  var l = this._id;
  if (t += "", arguments.length < 2) {
    for (var o = pa(this.node(), l).tween, s = 0, u = o.length, f; s < u; ++s)
      if ((f = o[s]).name === t)
        return f.value;
    return null;
  }
  return this.each((a == null ? EM : _M)(l, t, a));
}
function Eh(t, a, l) {
  var o = t._id;
  return t.each(function() {
    var s = Aa(this, o);
    (s.value || (s.value = {}))[a] = l.apply(this, arguments);
  }), function(s) {
    return pa(s, o).value[a];
  };
}
function Ub(t, a) {
  var l;
  return (typeof a == "number" ? Ma : a instanceof rl ? Eu : (l = rl(a)) ? (a = l, Eu) : Db)(t, a);
}
function MM(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function TM(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function CM(t, a, l) {
  var o, s = l + "", u;
  return function() {
    var f = this.getAttribute(t);
    return f === s ? null : f === o ? u : u = a(o = f, l);
  };
}
function RM(t, a, l) {
  var o, s = l + "", u;
  return function() {
    var f = this.getAttributeNS(t.space, t.local);
    return f === s ? null : f === o ? u : u = a(o = f, l);
  };
}
function AM(t, a, l) {
  var o, s, u;
  return function() {
    var f, h = l(this), p;
    return h == null ? void this.removeAttribute(t) : (f = this.getAttribute(t), p = h + "", f === p ? null : f === o && p === s ? u : (s = p, u = a(o = f, h)));
  };
}
function DM(t, a, l) {
  var o, s, u;
  return function() {
    var f, h = l(this), p;
    return h == null ? void this.removeAttributeNS(t.space, t.local) : (f = this.getAttributeNS(t.space, t.local), p = h + "", f === p ? null : f === o && p === s ? u : (s = p, u = a(o = f, h)));
  };
}
function zM(t, a) {
  var l = Uu(t), o = l === "transform" ? fM : Ub;
  return this.attrTween(t, typeof a == "function" ? (l.local ? DM : AM)(l, o, Eh(this, "attr." + t, a)) : a == null ? (l.local ? TM : MM)(l) : (l.local ? RM : CM)(l, o, a));
}
function OM(t, a) {
  return function(l) {
    this.setAttribute(t, a.call(this, l));
  };
}
function LM(t, a) {
  return function(l) {
    this.setAttributeNS(t.space, t.local, a.call(this, l));
  };
}
function jM(t, a) {
  var l, o;
  function s() {
    var u = a.apply(this, arguments);
    return u !== o && (l = (o = u) && LM(t, u)), l;
  }
  return s._value = a, s;
}
function HM(t, a) {
  var l, o;
  function s() {
    var u = a.apply(this, arguments);
    return u !== o && (l = (o = u) && OM(t, u)), l;
  }
  return s._value = a, s;
}
function BM(t, a) {
  var l = "attr." + t;
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  var o = Uu(t);
  return this.tween(l, (o.local ? jM : HM)(o, a));
}
function UM(t, a) {
  return function() {
    wh(this, t).delay = +a.apply(this, arguments);
  };
}
function kM(t, a) {
  return a = +a, function() {
    wh(this, t).delay = a;
  };
}
function YM(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? UM : kM)(a, t)) : pa(this.node(), a).delay;
}
function VM(t, a) {
  return function() {
    Aa(this, t).duration = +a.apply(this, arguments);
  };
}
function qM(t, a) {
  return a = +a, function() {
    Aa(this, t).duration = a;
  };
}
function GM(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? VM : qM)(a, t)) : pa(this.node(), a).duration;
}
function XM(t, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    Aa(this, t).ease = a;
  };
}
function $M(t) {
  var a = this._id;
  return arguments.length ? this.each(XM(a, t)) : pa(this.node(), a).ease;
}
function ZM(t, a) {
  return function() {
    var l = a.apply(this, arguments);
    if (typeof l != "function") throw new Error();
    Aa(this, t).ease = l;
  };
}
function QM(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ZM(this._id, t));
}
function KM(t) {
  typeof t != "function" && (t = gb(t));
  for (var a = this._groups, l = a.length, o = new Array(l), s = 0; s < l; ++s)
    for (var u = a[s], f = u.length, h = o[s] = [], p, g = 0; g < f; ++g)
      (p = u[g]) && t.call(p, p.__data__, g, u) && h.push(p);
  return new Pa(o, this._parents, this._name, this._id);
}
function IM(t) {
  if (t._id !== this._id) throw new Error();
  for (var a = this._groups, l = t._groups, o = a.length, s = l.length, u = Math.min(o, s), f = new Array(o), h = 0; h < u; ++h)
    for (var p = a[h], g = l[h], y = p.length, m = f[h] = new Array(y), v, x = 0; x < y; ++x)
      (v = p[x] || g[x]) && (m[x] = v);
  for (; h < o; ++h)
    f[h] = a[h];
  return new Pa(f, this._parents, this._name, this._id);
}
function FM(t) {
  return (t + "").trim().split(/^|\s+/).every(function(a) {
    var l = a.indexOf(".");
    return l >= 0 && (a = a.slice(0, l)), !a || a === "start";
  });
}
function JM(t, a, l) {
  var o, s, u = FM(a) ? wh : Aa;
  return function() {
    var f = u(this, t), h = f.on;
    h !== o && (s = (o = h).copy()).on(a, l), f.on = s;
  };
}
function PM(t, a) {
  var l = this._id;
  return arguments.length < 2 ? pa(this.node(), l).on.on(t) : this.each(JM(l, t, a));
}
function WM(t) {
  return function() {
    var a = this.parentNode;
    for (var l in this.__transition) if (+l !== t) return;
    a && a.removeChild(this);
  };
}
function eT() {
  return this.on("end.remove", WM(this._id));
}
function tT(t) {
  var a = this._name, l = this._id;
  typeof t != "function" && (t = yh(t));
  for (var o = this._groups, s = o.length, u = new Array(s), f = 0; f < s; ++f)
    for (var h = o[f], p = h.length, g = u[f] = new Array(p), y, m, v = 0; v < p; ++v)
      (y = h[v]) && (m = t.call(y, y.__data__, v, h)) && ("__data__" in y && (m.__data__ = y.__data__), g[v] = m, Yu(g[v], a, l, v, g, pa(y, l)));
  return new Pa(u, this._parents, a, l);
}
function nT(t) {
  var a = this._name, l = this._id;
  typeof t != "function" && (t = mb(t));
  for (var o = this._groups, s = o.length, u = [], f = [], h = 0; h < s; ++h)
    for (var p = o[h], g = p.length, y, m = 0; m < g; ++m)
      if (y = p[m]) {
        for (var v = t.call(y, y.__data__, m, p), x, S = pa(y, l), C = 0, T = v.length; C < T; ++C)
          (x = v[C]) && Yu(x, a, l, C, v, S);
        u.push(v), f.push(y);
      }
  return new Pa(u, f, a, l);
}
var aT = Ao.prototype.constructor;
function iT() {
  return new aT(this._groups, this._parents);
}
function lT(t, a) {
  var l, o, s;
  return function() {
    var u = ar(this, t), f = (this.style.removeProperty(t), ar(this, t));
    return u === f ? null : u === l && f === o ? s : s = a(l = u, o = f);
  };
}
function kb(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function rT(t, a, l) {
  var o, s = l + "", u;
  return function() {
    var f = ar(this, t);
    return f === s ? null : f === o ? u : u = a(o = f, l);
  };
}
function oT(t, a, l) {
  var o, s, u;
  return function() {
    var f = ar(this, t), h = l(this), p = h + "";
    return h == null && (p = h = (this.style.removeProperty(t), ar(this, t))), f === p ? null : f === o && p === s ? u : (s = p, u = a(o = f, h));
  };
}
function sT(t, a) {
  var l, o, s, u = "style." + a, f = "end." + u, h;
  return function() {
    var p = Aa(this, t), g = p.on, y = p.value[u] == null ? h || (h = kb(a)) : void 0;
    (g !== l || s !== y) && (o = (l = g).copy()).on(f, s = y), p.on = o;
  };
}
function uT(t, a, l) {
  var o = (t += "") == "transform" ? cM : Ub;
  return a == null ? this.styleTween(t, lT(t, o)).on("end.style." + t, kb(t)) : typeof a == "function" ? this.styleTween(t, oT(t, o, Eh(this, "style." + t, a))).each(sT(this._id, t)) : this.styleTween(t, rT(t, o, a), l).on("end.style." + t, null);
}
function cT(t, a, l) {
  return function(o) {
    this.style.setProperty(t, a.call(this, o), l);
  };
}
function fT(t, a, l) {
  var o, s;
  function u() {
    var f = a.apply(this, arguments);
    return f !== s && (o = (s = f) && cT(t, f, l)), o;
  }
  return u._value = a, u;
}
function dT(t, a, l) {
  var o = "style." + (t += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (a == null) return this.tween(o, null);
  if (typeof a != "function") throw new Error();
  return this.tween(o, fT(t, a, l ?? ""));
}
function hT(t) {
  return function() {
    this.textContent = t;
  };
}
function mT(t) {
  return function() {
    var a = t(this);
    this.textContent = a ?? "";
  };
}
function gT(t) {
  return this.tween("text", typeof t == "function" ? mT(Eh(this, "text", t)) : hT(t == null ? "" : t + ""));
}
function pT(t) {
  return function(a) {
    this.textContent = t.call(this, a);
  };
}
function yT(t) {
  var a, l;
  function o() {
    var s = t.apply(this, arguments);
    return s !== l && (a = (l = s) && pT(s)), a;
  }
  return o._value = t, o;
}
function vT(t) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (t == null) return this.tween(a, null);
  if (typeof t != "function") throw new Error();
  return this.tween(a, yT(t));
}
function bT() {
  for (var t = this._name, a = this._id, l = Yb(), o = this._groups, s = o.length, u = 0; u < s; ++u)
    for (var f = o[u], h = f.length, p, g = 0; g < h; ++g)
      if (p = f[g]) {
        var y = pa(p, a);
        Yu(p, t, l, g, f, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new Pa(o, this._parents, t, l);
}
function xT() {
  var t, a, l = this, o = l._id, s = l.size();
  return new Promise(function(u, f) {
    var h = { value: f }, p = { value: function() {
      --s === 0 && u();
    } };
    l.each(function() {
      var g = Aa(this, o), y = g.on;
      y !== t && (a = (t = y).copy(), a._.cancel.push(h), a._.interrupt.push(h), a._.end.push(p)), g.on = a;
    }), s === 0 && u();
  });
}
var ST = 0;
function Pa(t, a, l, o) {
  this._groups = t, this._parents = a, this._name = l, this._id = o;
}
function Yb() {
  return ++ST;
}
var Ia = Ao.prototype;
Pa.prototype = {
  constructor: Pa,
  select: tT,
  selectAll: nT,
  selectChild: Ia.selectChild,
  selectChildren: Ia.selectChildren,
  filter: KM,
  merge: IM,
  selection: iT,
  transition: bT,
  call: Ia.call,
  nodes: Ia.nodes,
  node: Ia.node,
  size: Ia.size,
  empty: Ia.empty,
  each: Ia.each,
  on: PM,
  attr: zM,
  attrTween: BM,
  style: uT,
  styleTween: dT,
  text: gT,
  textTween: vT,
  remove: eT,
  tween: NM,
  delay: YM,
  duration: GM,
  ease: $M,
  easeVarying: QM,
  end: xT,
  [Symbol.iterator]: Ia[Symbol.iterator]
};
function wT(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ET = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: wT
};
function _T(t, a) {
  for (var l; !(l = t.__transition) || !(l = l[a]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${a} not found`);
  return l;
}
function NT(t) {
  var a, l;
  t instanceof Pa ? (a = t._id, t = t._name) : (a = Yb(), (l = ET).time = Sh(), t = t == null ? null : t + "");
  for (var o = this._groups, s = o.length, u = 0; u < s; ++u)
    for (var f = o[u], h = f.length, p, g = 0; g < h; ++g)
      (p = f[g]) && Yu(p, t, a, g, f, l || _T(p, a));
  return new Pa(o, this._parents, t, a);
}
Ao.prototype.interrupt = wM;
Ao.prototype.transition = NT;
const eu = (t) => () => t;
function MT(t, {
  sourceEvent: a,
  target: l,
  transform: o,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    target: { value: l, enumerable: !0, configurable: !0 },
    transform: { value: o, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function Fa(t, a, l) {
  this.k = t, this.x = a, this.y = l;
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
var Vu = new Fa(1, 0, 0);
Vb.prototype = Fa.prototype;
function Vb(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Vu;
  return t.__zoom;
}
function pd(t) {
  t.stopImmediatePropagation();
}
function lo(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function TT(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function CT() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function _y() {
  return this.__zoom || Vu;
}
function RT(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function AT() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function DT(t, a, l) {
  var o = t.invertX(a[0][0]) - l[0][0], s = t.invertX(a[1][0]) - l[1][0], u = t.invertY(a[0][1]) - l[0][1], f = t.invertY(a[1][1]) - l[1][1];
  return t.translate(
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s),
    f > u ? (u + f) / 2 : Math.min(0, u) || Math.max(0, f)
  );
}
function qb() {
  var t = TT, a = CT, l = DT, o = RT, s = AT, u = [0, 1 / 0], f = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], h = 250, p = du, g = Bu("start", "zoom", "end"), y, m, v, x = 500, S = 150, C = 0, T = 10;
  function N(L) {
    L.property("__zoom", _y).on("wheel.zoom", D, { passive: !1 }).on("mousedown.zoom", Q).on("dblclick.zoom", le).filter(s).on("touchstart.zoom", K).on("touchmove.zoom", J).on("touchend.zoom touchcancel.zoom", oe).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  N.transform = function(L, X, _, O) {
    var Z = L.selection ? L.selection() : L;
    Z.property("__zoom", _y), L !== Z ? U(L, X, _, O) : Z.interrupt().each(function() {
      H(this, arguments).event(O).start().zoom(null, typeof X == "function" ? X.apply(this, arguments) : X).end();
    });
  }, N.scaleBy = function(L, X, _, O) {
    N.scaleTo(L, function() {
      var Z = this.__zoom.k, G = typeof X == "function" ? X.apply(this, arguments) : X;
      return Z * G;
    }, _, O);
  }, N.scaleTo = function(L, X, _, O) {
    N.transform(L, function() {
      var Z = a.apply(this, arguments), G = this.__zoom, ae = _ == null ? z(Z) : typeof _ == "function" ? _.apply(this, arguments) : _, A = G.invert(ae), V = typeof X == "function" ? X.apply(this, arguments) : X;
      return l(w(j(G, V), ae, A), Z, f);
    }, _, O);
  }, N.translateBy = function(L, X, _, O) {
    N.transform(L, function() {
      return l(this.__zoom.translate(
        typeof X == "function" ? X.apply(this, arguments) : X,
        typeof _ == "function" ? _.apply(this, arguments) : _
      ), a.apply(this, arguments), f);
    }, null, O);
  }, N.translateTo = function(L, X, _, O, Z) {
    N.transform(L, function() {
      var G = a.apply(this, arguments), ae = this.__zoom, A = O == null ? z(G) : typeof O == "function" ? O.apply(this, arguments) : O;
      return l(Vu.translate(A[0], A[1]).scale(ae.k).translate(
        typeof X == "function" ? -X.apply(this, arguments) : -X,
        typeof _ == "function" ? -_.apply(this, arguments) : -_
      ), G, f);
    }, O, Z);
  };
  function j(L, X) {
    return X = Math.max(u[0], Math.min(u[1], X)), X === L.k ? L : new Fa(X, L.x, L.y);
  }
  function w(L, X, _) {
    var O = X[0] - _[0] * L.k, Z = X[1] - _[1] * L.k;
    return O === L.x && Z === L.y ? L : new Fa(L.k, O, Z);
  }
  function z(L) {
    return [(+L[0][0] + +L[1][0]) / 2, (+L[0][1] + +L[1][1]) / 2];
  }
  function U(L, X, _, O) {
    L.on("start.zoom", function() {
      H(this, arguments).event(O).start();
    }).on("interrupt.zoom end.zoom", function() {
      H(this, arguments).event(O).end();
    }).tween("zoom", function() {
      var Z = this, G = arguments, ae = H(Z, G).event(O), A = a.apply(Z, G), V = _ == null ? z(A) : typeof _ == "function" ? _.apply(Z, G) : _, I = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), ne = Z.__zoom, se = typeof X == "function" ? X.apply(Z, G) : X, me = p(ne.invert(V).concat(I / ne.k), se.invert(V).concat(I / se.k));
      return function(ge) {
        if (ge === 1) ge = se;
        else {
          var W = me(ge), pe = I / W[2];
          ge = new Fa(pe, V[0] - W[0] * pe, V[1] - W[1] * pe);
        }
        ae.zoom(null, ge);
      };
    });
  }
  function H(L, X, _) {
    return !_ && L.__zooming || new k(L, X);
  }
  function k(L, X) {
    this.that = L, this.args = X, this.active = 0, this.sourceEvent = null, this.extent = a.apply(L, X), this.taps = 0;
  }
  k.prototype = {
    event: function(L) {
      return L && (this.sourceEvent = L), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(L, X) {
      return this.mouse && L !== "mouse" && (this.mouse[1] = X.invert(this.mouse[0])), this.touch0 && L !== "touch" && (this.touch0[1] = X.invert(this.touch0[0])), this.touch1 && L !== "touch" && (this.touch1[1] = X.invert(this.touch1[0])), this.that.__zoom = X, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(L) {
      var X = Bn(this.that).datum();
      g.call(
        L,
        this.that,
        new MT(L, {
          sourceEvent: this.sourceEvent,
          target: N,
          transform: this.that.__zoom,
          dispatch: g
        }),
        X
      );
    }
  };
  function D(L, ...X) {
    if (!t.apply(this, arguments)) return;
    var _ = H(this, X).event(L), O = this.__zoom, Z = Math.max(u[0], Math.min(u[1], O.k * Math.pow(2, o.apply(this, arguments)))), G = ua(L);
    if (_.wheel)
      (_.mouse[0][0] !== G[0] || _.mouse[0][1] !== G[1]) && (_.mouse[1] = O.invert(_.mouse[0] = G)), clearTimeout(_.wheel);
    else {
      if (O.k === Z) return;
      _.mouse = [G, O.invert(G)], gu(this), _.start();
    }
    lo(L), _.wheel = setTimeout(ae, S), _.zoom("mouse", l(w(j(O, Z), _.mouse[0], _.mouse[1]), _.extent, f));
    function ae() {
      _.wheel = null, _.end();
    }
  }
  function Q(L, ...X) {
    if (v || !t.apply(this, arguments)) return;
    var _ = L.currentTarget, O = H(this, X, !0).event(L), Z = Bn(L.view).on("mousemove.zoom", V, !0).on("mouseup.zoom", I, !0), G = ua(L, _), ae = L.clientX, A = L.clientY;
    Nb(L.view), pd(L), O.mouse = [G, this.__zoom.invert(G)], gu(this), O.start();
    function V(ne) {
      if (lo(ne), !O.moved) {
        var se = ne.clientX - ae, me = ne.clientY - A;
        O.moved = se * se + me * me > C;
      }
      O.event(ne).zoom("mouse", l(w(O.that.__zoom, O.mouse[0] = ua(ne, _), O.mouse[1]), O.extent, f));
    }
    function I(ne) {
      Z.on("mousemove.zoom mouseup.zoom", null), Mb(ne.view, O.moved), lo(ne), O.event(ne).end();
    }
  }
  function le(L, ...X) {
    if (t.apply(this, arguments)) {
      var _ = this.__zoom, O = ua(L.changedTouches ? L.changedTouches[0] : L, this), Z = _.invert(O), G = _.k * (L.shiftKey ? 0.5 : 2), ae = l(w(j(_, G), O, Z), a.apply(this, X), f);
      lo(L), h > 0 ? Bn(this).transition().duration(h).call(U, ae, O, L) : Bn(this).call(N.transform, ae, O, L);
    }
  }
  function K(L, ...X) {
    if (t.apply(this, arguments)) {
      var _ = L.touches, O = _.length, Z = H(this, X, L.changedTouches.length === O).event(L), G, ae, A, V;
      for (pd(L), ae = 0; ae < O; ++ae)
        A = _[ae], V = ua(A, this), V = [V, this.__zoom.invert(V), A.identifier], Z.touch0 ? !Z.touch1 && Z.touch0[2] !== V[2] && (Z.touch1 = V, Z.taps = 0) : (Z.touch0 = V, G = !0, Z.taps = 1 + !!y);
      y && (y = clearTimeout(y)), G && (Z.taps < 2 && (m = V[0], y = setTimeout(function() {
        y = null;
      }, x)), gu(this), Z.start());
    }
  }
  function J(L, ...X) {
    if (this.__zooming) {
      var _ = H(this, X).event(L), O = L.changedTouches, Z = O.length, G, ae, A, V;
      for (lo(L), G = 0; G < Z; ++G)
        ae = O[G], A = ua(ae, this), _.touch0 && _.touch0[2] === ae.identifier ? _.touch0[0] = A : _.touch1 && _.touch1[2] === ae.identifier && (_.touch1[0] = A);
      if (ae = _.that.__zoom, _.touch1) {
        var I = _.touch0[0], ne = _.touch0[1], se = _.touch1[0], me = _.touch1[1], ge = (ge = se[0] - I[0]) * ge + (ge = se[1] - I[1]) * ge, W = (W = me[0] - ne[0]) * W + (W = me[1] - ne[1]) * W;
        ae = j(ae, Math.sqrt(ge / W)), A = [(I[0] + se[0]) / 2, (I[1] + se[1]) / 2], V = [(ne[0] + me[0]) / 2, (ne[1] + me[1]) / 2];
      } else if (_.touch0) A = _.touch0[0], V = _.touch0[1];
      else return;
      _.zoom("touch", l(w(ae, A, V), _.extent, f));
    }
  }
  function oe(L, ...X) {
    if (this.__zooming) {
      var _ = H(this, X).event(L), O = L.changedTouches, Z = O.length, G, ae;
      for (pd(L), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, x), G = 0; G < Z; ++G)
        ae = O[G], _.touch0 && _.touch0[2] === ae.identifier ? delete _.touch0 : _.touch1 && _.touch1[2] === ae.identifier && delete _.touch1;
      if (_.touch1 && !_.touch0 && (_.touch0 = _.touch1, delete _.touch1), _.touch0) _.touch0[1] = this.__zoom.invert(_.touch0[0]);
      else if (_.end(), _.taps === 2 && (ae = ua(ae, this), Math.hypot(m[0] - ae[0], m[1] - ae[1]) < T)) {
        var A = Bn(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return N.wheelDelta = function(L) {
    return arguments.length ? (o = typeof L == "function" ? L : eu(+L), N) : o;
  }, N.filter = function(L) {
    return arguments.length ? (t = typeof L == "function" ? L : eu(!!L), N) : t;
  }, N.touchable = function(L) {
    return arguments.length ? (s = typeof L == "function" ? L : eu(!!L), N) : s;
  }, N.extent = function(L) {
    return arguments.length ? (a = typeof L == "function" ? L : eu([[+L[0][0], +L[0][1]], [+L[1][0], +L[1][1]]]), N) : a;
  }, N.scaleExtent = function(L) {
    return arguments.length ? (u[0] = +L[0], u[1] = +L[1], N) : [u[0], u[1]];
  }, N.translateExtent = function(L) {
    return arguments.length ? (f[0][0] = +L[0][0], f[1][0] = +L[1][0], f[0][1] = +L[0][1], f[1][1] = +L[1][1], N) : [[f[0][0], f[0][1]], [f[1][0], f[1][1]]];
  }, N.constrain = function(L) {
    return arguments.length ? (l = L, N) : l;
  }, N.duration = function(L) {
    return arguments.length ? (h = +L, N) : h;
  }, N.interpolate = function(L) {
    return arguments.length ? (p = L, N) : p;
  }, N.on = function() {
    var L = g.on.apply(g, arguments);
    return L === g ? N : L;
  }, N.clickDistance = function(L) {
    return arguments.length ? (C = (L = +L) * L, N) : Math.sqrt(C);
  }, N.tapDistance = function(L) {
    return arguments.length ? (T = +L, N) : T;
  }, N;
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
  error008: (t, { id: a, sourceHandle: l, targetHandle: o }) => `Couldn't create edge for ${t} handle id: "${t === "source" ? l : o}", edge id: ${a}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (t) => `Edge type "${t}" not found. Using fallback type "default".`,
  error012: (t) => `Node with id "${t}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (t = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${t}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (t) => `Edge with id "${t}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, xo = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Gb = ["Enter", " ", "Escape"], Xb = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: t, x: a, y: l }) => `Moved selected node ${t}. New position, x: ${a}, y: ${l}`,
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
var lr;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(lr || (lr = {}));
var ll;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(ll || (ll = {}));
var So;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(So || (So = {}));
const $b = {
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
var Li;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(Li || (Li = {}));
var Tu;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Tu || (Tu = {}));
var Ce;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(Ce || (Ce = {}));
const Ny = {
  [Ce.Left]: Ce.Right,
  [Ce.Right]: Ce.Left,
  [Ce.Top]: Ce.Bottom,
  [Ce.Bottom]: Ce.Top
};
function Zb(t) {
  return t === null ? null : t ? "valid" : "invalid";
}
const Qb = (t) => "id" in t && "source" in t && "target" in t, zT = (t) => "id" in t && "position" in t && !("source" in t) && !("target" in t), _h = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), zo = (t, a = [0, 0]) => {
  const { width: l, height: o } = ei(t), s = t.origin ?? a, u = l * s[0], f = o * s[1];
  return {
    x: t.position.x - u,
    y: t.position.y - f
  };
}, OT = (t, a = { nodeOrigin: [0, 0] }) => {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const l = t.reduce((o, s) => {
    const u = typeof s == "string";
    let f = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (f = u ? a.nodeLookup.get(s) : _h(s) ? s : a.nodeLookup.get(s.id));
    const h = f ? Cu(f, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return qu(o, h);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Gu(l);
}, Oo = (t, a = {}) => {
  let l = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, o = !1;
  return t.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (l = qu(l, Cu(s)), o = !0);
  }), o ? Gu(l) : { x: 0, y: 0, width: 0, height: 0 };
}, Nh = (t, a, [l, o, s] = [0, 0, 1], u = !1, f = !1) => {
  const h = (a.x - l) / s, p = (a.y - o) / s, g = a.width / s, y = a.height / s, m = [];
  for (const v of t.values()) {
    const { measured: x, selectable: S = !0, hidden: C = !1 } = v;
    if (f && !S || C)
      continue;
    const T = x.width ?? v.width ?? v.initialWidth ?? 0, N = x.height ?? v.height ?? v.initialHeight ?? 0, { x: j, y: w } = v.internals.positionAbsolute, z = Jb(h, p, g, y, j, w, T, N), U = T * N, H = u && z > 0;
    (!v.internals.handleBounds || H || z >= U || v.dragging) && m.push(v);
  }
  return m;
}, LT = (t, a) => {
  const l = /* @__PURE__ */ new Set();
  return t.forEach((o) => {
    l.add(o.id);
  }), a.filter((o) => l.has(o.source) || l.has(o.target));
};
function jT(t, a) {
  const l = /* @__PURE__ */ new Map(), o = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return t.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!o || o.has(s.id)) && l.set(s.id, s);
  }), l;
}
async function HT({ nodes: t, width: a, height: l, panZoom: o, minZoom: s, maxZoom: u }, f) {
  if (t.size === 0)
    return !0;
  const h = jT(t, f), p = Oo(h), g = Th(p, a, l, f?.minZoom ?? s, f?.maxZoom ?? u, f?.padding ?? 0.1);
  return await o.setViewport(g, {
    duration: f?.duration,
    ease: f?.ease,
    interpolate: f?.interpolate
  }), !0;
}
function Kb({ nodeId: t, nextPosition: a, nodeLookup: l, nodeOrigin: o = [0, 0], nodeExtent: s, onError: u }) {
  const f = l.get(t), h = f.parentId ? l.get(f.parentId) : void 0, { x: p, y: g } = h ? h.internals.positionAbsolute : { x: 0, y: 0 }, y = f.origin ?? o;
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
  else h && ul(f.extent) && (m = [
    [f.extent[0][0] + p, f.extent[0][1] + g],
    [f.extent[1][0] + p, f.extent[1][1] + g]
  ]);
  const v = ul(m) ? sl(a, m, f.measured) : a;
  return (f.measured.width === void 0 || f.measured.height === void 0) && u?.("015", ha.error015()), {
    position: {
      x: v.x - p + (f.measured.width ?? 0) * y[0],
      y: v.y - g + (f.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function BT({ nodesToRemove: t = [], edgesToRemove: a = [], nodes: l, edges: o, onBeforeDelete: s }) {
  const u = new Set(t.map((v) => v.id)), f = [];
  for (const v of l) {
    if (v.deletable === !1)
      continue;
    const x = u.has(v.id), S = !x && v.parentId && f.find((C) => C.id === v.parentId);
    (x || S) && f.push(v);
  }
  const h = new Set(a.map((v) => v.id)), p = o.filter((v) => v.deletable !== !1), y = LT(f, p);
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
const rr = (t, a = 0, l = 1) => Math.min(Math.max(t, a), l), sl = (t = { x: 0, y: 0 }, a, l) => ({
  x: rr(t.x, a[0][0], a[1][0] - (l?.width ?? 0)),
  y: rr(t.y, a[0][1], a[1][1] - (l?.height ?? 0))
});
function Ib(t, a, l) {
  const { width: o, height: s } = ei(l), { x: u, y: f } = l.internals.positionAbsolute;
  return sl(t, [
    [u, f],
    [u + o, f + s]
  ], a);
}
const My = (t, a, l) => t < a ? rr(Math.abs(t - a), 1, a) / a : t > l ? -rr(Math.abs(t - l), 1, a) / a : 0, Mh = (t, a, l = 15, o = 40) => {
  const s = My(t.x, o, a.width - o) * l, u = My(t.y, o, a.height - o) * l;
  return [s, u];
}, qu = (t, a) => ({
  x: Math.min(t.x, a.x),
  y: Math.min(t.y, a.y),
  x2: Math.max(t.x2, a.x2),
  y2: Math.max(t.y2, a.y2)
}), Zd = ({ x: t, y: a, width: l, height: o }) => ({
  x: t,
  y: a,
  x2: t + l,
  y2: a + o
}), Gu = ({ x: t, y: a, x2: l, y2: o }) => ({
  x: t,
  y: a,
  width: l - t,
  height: o - a
}), wo = (t, a = [0, 0]) => {
  const { x: l, y: o } = _h(t) ? t.internals.positionAbsolute : zo(t, a);
  return {
    x: l,
    y: o,
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}, Cu = (t, a = [0, 0]) => {
  const { x: l, y: o } = _h(t) ? t.internals.positionAbsolute : zo(t, a);
  return {
    x: l,
    y: o,
    x2: l + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: o + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, Fb = (t, a) => Gu(qu(Zd(t), Zd(a))), Jb = (t, a, l, o, s, u, f, h) => {
  const p = Math.max(0, Math.min(t + l, s + f) - Math.max(t, s)), g = Math.max(0, Math.min(a + o, u + h) - Math.max(a, u));
  return Math.ceil(p * g);
}, Ru = (t, a) => Jb(t.x, t.y, t.width, t.height, a.x, a.y, a.width, a.height), Ty = (t) => fa(t.width) && fa(t.height) && fa(t.x) && fa(t.y), fa = (t) => !isNaN(t) && isFinite(t), Pb = (t, a) => (l, o) => {
}, Lo = (t, a = [1, 1]) => ({
  x: a[0] * Math.round(t.x / a[0]),
  y: a[1] * Math.round(t.y / a[1])
}), jo = ({ x: t, y: a }, [l, o, s], u = !1, f = [1, 1]) => {
  const h = {
    x: (t - l) / s,
    y: (a - o) / s
  };
  return u ? Lo(h, f) : h;
}, or = ({ x: t, y: a }, [l, o, s]) => ({
  x: t * s + l,
  y: a * s + o
});
function $l(t, a) {
  if (typeof t == "number")
    return Math.floor((a - a / (1 + t)) * 0.5);
  if (typeof t == "string" && t.endsWith("px")) {
    const l = parseFloat(t);
    if (!Number.isNaN(l))
      return Math.floor(l);
  }
  if (typeof t == "string" && t.endsWith("%")) {
    const l = parseFloat(t);
    if (!Number.isNaN(l))
      return Math.floor(a * l * 0.01);
  }
  return console.error(`The padding value "${t}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function UT(t, a, l) {
  if (typeof t == "string" || typeof t == "number") {
    const o = $l(t, l), s = $l(t, a);
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
    const o = $l(t.top ?? t.y ?? 0, l), s = $l(t.bottom ?? t.y ?? 0, l), u = $l(t.left ?? t.x ?? 0, a), f = $l(t.right ?? t.x ?? 0, a);
    return { top: o, right: f, bottom: s, left: u, x: u + f, y: o + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function kT(t, a, l, o, s, u) {
  const { x: f, y: h } = or(t, [a, l, o]), { x: p, y: g } = or({ x: t.x + t.width, y: t.y + t.height }, [a, l, o]), y = s - p, m = u - g;
  return {
    left: Math.floor(f),
    top: Math.floor(h),
    right: Math.floor(y),
    bottom: Math.floor(m)
  };
}
const Th = (t, a, l, o, s, u) => {
  const f = UT(u, a, l), h = (a - f.x) / t.width, p = (l - f.y) / t.height, g = Math.min(h, p), y = rr(g, o, s), m = t.x + t.width / 2, v = t.y + t.height / 2, x = a / 2 - m * y, S = l / 2 - v * y, C = kT(t, x, S, y, a, l), T = {
    left: Math.min(C.left - f.left, 0),
    top: Math.min(C.top - f.top, 0),
    right: Math.min(C.right - f.right, 0),
    bottom: Math.min(C.bottom - f.bottom, 0)
  };
  return {
    x: x - T.left + T.right,
    y: S - T.top + T.bottom,
    zoom: y
  };
}, Eo = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function ul(t) {
  return t != null && t !== "parent";
}
function ei(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function Wb(t) {
  return (t.measured?.width ?? t.width ?? t.initialWidth) !== void 0 && (t.measured?.height ?? t.height ?? t.initialHeight) !== void 0;
}
function e1(t, a = { width: 0, height: 0 }, l, o, s) {
  const u = { ...t }, f = o.get(l);
  if (f) {
    const h = f.origin || s;
    u.x += f.internals.positionAbsolute.x - (a.width ?? 0) * h[0], u.y += f.internals.positionAbsolute.y - (a.height ?? 0) * h[1];
  }
  return u;
}
function Cy(t, a) {
  if (t.size !== a.size)
    return !1;
  for (const l of t)
    if (!a.has(l))
      return !1;
  return !0;
}
function YT() {
  let t, a;
  return { promise: new Promise((o, s) => {
    t = o, a = s;
  }), resolve: t, reject: a };
}
function VT(t) {
  return { ...Xb, ...t || {} };
}
function ho(t, { snapGrid: a = [0, 0], snapToGrid: l = !1, transform: o, containerBounds: s }) {
  const { x: u, y: f } = da(t), h = jo({ x: u - (s?.left ?? 0), y: f - (s?.top ?? 0) }, o), { x: p, y: g } = l ? Lo(h, a) : h;
  return {
    xSnapped: p,
    ySnapped: g,
    ...h
  };
}
const Ch = (t) => ({
  width: t.offsetWidth,
  height: t.offsetHeight
}), t1 = (t) => t?.getRootNode?.() || window?.document, qT = ["INPUT", "SELECT", "TEXTAREA"];
function n1(t) {
  const a = t.composedPath?.()?.[0] || t.target;
  return a?.nodeType !== 1 ? !1 : qT.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const a1 = (t) => "clientX" in t, da = (t, a) => {
  const l = a1(t), o = l ? t.clientX : t.touches?.[0].clientX, s = l ? t.clientY : t.touches?.[0].clientY;
  return {
    x: o - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, Ry = (t, a, l, o, s) => {
  const u = a.querySelectorAll(`.${t}`);
  return !u || !u.length ? null : Array.from(u).map((f) => {
    const h = f.getBoundingClientRect();
    return {
      id: f.getAttribute("data-handleid"),
      type: t,
      nodeId: s,
      position: f.getAttribute("data-handlepos"),
      x: (h.left - l.left) / o,
      y: (h.top - l.top) / o,
      ...Ch(f)
    };
  });
};
function i1({ sourceX: t, sourceY: a, targetX: l, targetY: o, sourceControlX: s, sourceControlY: u, targetControlX: f, targetControlY: h }) {
  const p = t * 0.125 + s * 0.375 + f * 0.375 + l * 0.125, g = a * 0.125 + u * 0.375 + h * 0.375 + o * 0.125, y = Math.abs(p - t), m = Math.abs(g - a);
  return [p, g, y, m];
}
function tu(t, a) {
  return t >= 0 ? 0.5 * t : a * 25 * Math.sqrt(-t);
}
function Ay({ pos: t, x1: a, y1: l, x2: o, y2: s, c: u }) {
  switch (t) {
    case Ce.Left:
      return [a - tu(a - o, u), l];
    case Ce.Right:
      return [a + tu(o - a, u), l];
    case Ce.Top:
      return [a, l - tu(l - s, u)];
    case Ce.Bottom:
      return [a, l + tu(s - l, u)];
  }
}
function l1({ sourceX: t, sourceY: a, sourcePosition: l = Ce.Bottom, targetX: o, targetY: s, targetPosition: u = Ce.Top, curvature: f = 0.25 }) {
  const [h, p] = Ay({
    pos: l,
    x1: t,
    y1: a,
    x2: o,
    y2: s,
    c: f
  }), [g, y] = Ay({
    pos: u,
    x1: o,
    y1: s,
    x2: t,
    y2: a,
    c: f
  }), [m, v, x, S] = i1({
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
function r1({ sourceX: t, sourceY: a, targetX: l, targetY: o }) {
  const s = Math.abs(l - t) / 2, u = l < t ? l + s : l - s, f = Math.abs(o - a) / 2, h = o < a ? o + f : o - f;
  return [u, h, s, f];
}
function GT({ sourceNode: t, targetNode: a, selected: l = !1, zIndex: o = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return o;
  const f = s && l ? o + 1e3 : o, h = Math.max(t.parentId || s && t.selected ? t.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return f + h;
}
function XT({ sourceNode: t, targetNode: a, width: l, height: o, transform: s }) {
  const u = qu(Cu(t), Cu(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const f = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: l / s[2],
    height: o / s[2]
  };
  return Ru(f, Gu(u)) > 0;
}
const $T = ({ source: t, sourceHandle: a, target: l, targetHandle: o }) => `xy-edge__${t}${a || ""}-${l}${o || ""}`, ZT = (t, a) => a.some((l) => l.source === t.source && l.target === t.target && (l.sourceHandle === t.sourceHandle || !l.sourceHandle && !t.sourceHandle) && (l.targetHandle === t.targetHandle || !l.targetHandle && !t.targetHandle)), QT = (t, a, l = {}) => {
  if (!t.source || !t.target)
    return l.onError?.("006", ha.error006()), a;
  const o = l.getEdgeId || $T;
  let s;
  return Qb(t) ? s = { ...t } : s = {
    ...t,
    id: o(t)
  }, ZT(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function o1({ sourceX: t, sourceY: a, targetX: l, targetY: o }) {
  const [s, u, f, h] = r1({
    sourceX: t,
    sourceY: a,
    targetX: l,
    targetY: o
  });
  return [`M ${t},${a}L ${l},${o}`, s, u, f, h];
}
const Dy = {
  [Ce.Left]: { x: -1, y: 0 },
  [Ce.Right]: { x: 1, y: 0 },
  [Ce.Top]: { x: 0, y: -1 },
  [Ce.Bottom]: { x: 0, y: 1 }
}, KT = ({ source: t, sourcePosition: a = Ce.Bottom, target: l }) => a === Ce.Left || a === Ce.Right ? t.x < l.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < l.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, zy = (t, a) => Math.sqrt(Math.pow(a.x - t.x, 2) + Math.pow(a.y - t.y, 2));
function IT({ source: t, sourcePosition: a = Ce.Bottom, target: l, targetPosition: o = Ce.Top, center: s, offset: u, stepPosition: f }) {
  const h = Dy[a], p = Dy[o], g = { x: t.x + h.x * u, y: t.y + h.y * u }, y = { x: l.x + p.x * u, y: l.y + p.y * u }, m = KT({
    source: g,
    sourcePosition: a,
    target: y
  }), v = m.x !== 0 ? "x" : "y", x = m[v];
  let S = [], C, T;
  const N = { x: 0, y: 0 }, j = { x: 0, y: 0 }, [, , w, z] = r1({
    sourceX: t.x,
    sourceY: t.y,
    targetX: l.x,
    targetY: l.y
  });
  if (h[v] * p[v] === -1) {
    v === "x" ? (C = s.x ?? g.x + (y.x - g.x) * f, T = s.y ?? (g.y + y.y) / 2) : (C = s.x ?? (g.x + y.x) / 2, T = s.y ?? g.y + (y.y - g.y) * f);
    const D = [
      { x: C, y: g.y },
      { x: C, y: y.y }
    ], Q = [
      { x: g.x, y: T },
      { x: y.x, y: T }
    ];
    h[v] === x ? S = v === "x" ? D : Q : S = v === "x" ? Q : D;
  } else {
    const D = [{ x: g.x, y: y.y }], Q = [{ x: y.x, y: g.y }];
    if (v === "x" ? S = h.x === x ? Q : D : S = h.y === x ? D : Q, a === o) {
      const L = Math.abs(t[v] - l[v]);
      if (L <= u) {
        const X = Math.min(u - 1, u - L);
        h[v] === x ? N[v] = (g[v] > t[v] ? -1 : 1) * X : j[v] = (y[v] > l[v] ? -1 : 1) * X;
      }
    }
    if (a !== o) {
      const L = v === "x" ? "y" : "x", X = h[v] === p[L], _ = g[L] > y[L], O = g[L] < y[L];
      (h[v] === 1 && (!X && _ || X && O) || h[v] !== 1 && (!X && O || X && _)) && (S = v === "x" ? D : Q);
    }
    const le = { x: g.x + N.x, y: g.y + N.y }, K = { x: y.x + j.x, y: y.y + j.y }, J = Math.max(Math.abs(le.x - S[0].x), Math.abs(K.x - S[0].x)), oe = Math.max(Math.abs(le.y - S[0].y), Math.abs(K.y - S[0].y));
    J >= oe ? (C = (le.x + K.x) / 2, T = S[0].y) : (C = S[0].x, T = (le.y + K.y) / 2);
  }
  const U = { x: g.x + N.x, y: g.y + N.y }, H = { x: y.x + j.x, y: y.y + j.y };
  return [[
    t,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...U.x !== S[0].x || U.y !== S[0].y ? [U] : [],
    ...S,
    ...H.x !== S[S.length - 1].x || H.y !== S[S.length - 1].y ? [H] : [],
    l
  ], C, T, w, z];
}
function FT(t, a, l, o) {
  const s = Math.min(zy(t, a) / 2, zy(a, l) / 2, o), { x: u, y: f } = a;
  if (t.x === u && u === l.x || t.y === f && f === l.y)
    return `L${u} ${f}`;
  if (t.y === f) {
    const g = t.x < l.x ? -1 : 1, y = t.y < l.y ? 1 : -1;
    return `L ${u + s * g},${f}Q ${u},${f} ${u},${f + s * y}`;
  }
  const h = t.x < l.x ? 1 : -1, p = t.y < l.y ? -1 : 1;
  return `L ${u},${f + s * p}Q ${u},${f} ${u + s * h},${f}`;
}
function Qd({ sourceX: t, sourceY: a, sourcePosition: l = Ce.Bottom, targetX: o, targetY: s, targetPosition: u = Ce.Top, borderRadius: f = 5, centerX: h, centerY: p, offset: g = 20, stepPosition: y = 0.5 }) {
  const [m, v, x, S, C] = IT({
    source: { x: t, y: a },
    sourcePosition: l,
    target: { x: o, y: s },
    targetPosition: u,
    center: { x: h, y: p },
    offset: g,
    stepPosition: y
  });
  let T = `M${m[0].x} ${m[0].y}`;
  for (let N = 1; N < m.length - 1; N++)
    T += FT(m[N - 1], m[N], m[N + 1], f);
  return T += `L${m[m.length - 1].x} ${m[m.length - 1].y}`, [T, v, x, S, C];
}
function Oy(t) {
  return t && !!(t.internals.handleBounds || t.handles?.length) && !!(t.measured.width || t.width || t.initialWidth);
}
function JT(t) {
  const { sourceNode: a, targetNode: l } = t;
  if (!Oy(a) || !Oy(l))
    return null;
  const o = a.internals.handleBounds || Ly(a.handles), s = l.internals.handleBounds || Ly(l.handles), u = jy(o?.source ?? [], t.sourceHandle), f = jy(
    // when connection type is loose we can define all handles as sources and connect source -> source
    t.connectionMode === lr.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    t.targetHandle
  );
  if (!u || !f)
    return t.onError?.("008", ha.error008(u ? "target" : "source", {
      id: t.id,
      sourceHandle: t.sourceHandle,
      targetHandle: t.targetHandle
    })), null;
  const h = u?.position || Ce.Bottom, p = f?.position || Ce.Top, g = cl(a, u, h), y = cl(l, f, p);
  return {
    sourceX: g.x,
    sourceY: g.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: h,
    targetPosition: p
  };
}
function Ly(t) {
  if (!t)
    return null;
  const a = [], l = [];
  for (const o of t)
    o.width = o.width ?? 1, o.height = o.height ?? 1, o.type === "source" ? a.push(o) : o.type === "target" && l.push(o);
  return {
    source: a,
    target: l
  };
}
function cl(t, a, l = Ce.Left, o = !1) {
  const s = (a?.x ?? 0) + t.internals.positionAbsolute.x, u = (a?.y ?? 0) + t.internals.positionAbsolute.y, { width: f, height: h } = a ?? ei(t);
  if (o)
    return { x: s + f / 2, y: u + h / 2 };
  switch (a?.position ?? l) {
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
function jy(t, a) {
  return t && (a ? t.find((l) => l.id === a) : t[0]) || null;
}
function Kd(t, a) {
  return t ? typeof t == "string" ? t : `${a ? `${a}__` : ""}${Object.keys(t).sort().map((o) => `${o}=${t[o]}`).join("&")}` : "";
}
function PT(t, { id: a, defaultColor: l, defaultMarkerStart: o, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return t.reduce((f, h) => ([h.markerStart || o, h.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const g = Kd(p, a);
      u.has(g) || (f.push({ id: g, color: p.color || l, ...p }), u.add(g));
    }
  }), f), []).sort((f, h) => f.id.localeCompare(h.id));
}
const s1 = 1e3, WT = 10, Rh = {
  nodeOrigin: [0, 0],
  nodeExtent: xo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, eC = {
  ...Rh,
  checkEquality: !0
};
function Ah(t, a) {
  const l = { ...t };
  for (const o in a)
    a[o] !== void 0 && (l[o] = a[o]);
  return l;
}
function tC(t, a, l) {
  const o = Ah(Rh, l);
  for (const s of t.values())
    if (s.parentId)
      zh(s, t, a, o);
    else {
      const u = zo(s, o.nodeOrigin), f = ul(s.extent) ? s.extent : o.nodeExtent, h = sl(u, f, ei(s));
      s.internals.positionAbsolute = h;
    }
}
function nC(t, a) {
  if (!t.handles)
    return t.measured ? a?.internals.handleBounds : void 0;
  const l = [], o = [];
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
    s.type === "source" ? l.push(u) : s.type === "target" && o.push(u);
  }
  return {
    source: l,
    target: o
  };
}
function Dh(t) {
  return t === "manual";
}
function Id(t, a, l, o = {}) {
  const s = Ah(eC, o), u = { i: 0 }, f = new Map(a), h = s?.elevateNodesOnSelect && !Dh(s.zIndexMode) ? s1 : 0;
  let p = t.length > 0, g = !1;
  a.clear(), l.clear();
  for (const y of t) {
    let m = f.get(y.id);
    if (s.checkEquality && y === m?.internals.userNode)
      a.set(y.id, m);
    else {
      const v = zo(y, s.nodeOrigin), x = ul(y.extent) ? y.extent : s.nodeExtent, S = sl(v, x, ei(y));
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
          handleBounds: nC(y, m),
          z: u1(y, h, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, m);
    }
    (m.measured === void 0 || m.measured.width === void 0 || m.measured.height === void 0) && !m.hidden && (p = !1), y.parentId && zh(m, a, l, o, u), g ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: g };
}
function aC(t, a) {
  if (!t.parentId)
    return;
  const l = a.get(t.parentId);
  l ? l.set(t.id, t) : a.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function zh(t, a, l, o, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: f, nodeExtent: h, zIndexMode: p } = Ah(Rh, o), g = t.parentId, y = a.get(g);
  if (!y) {
    console.warn(`Parent node ${g} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  aC(t, l), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * WT), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const m = u && !Dh(p) ? s1 : 0, { x: v, y: x, z: S } = iC(t, y, f, h, m, p), { positionAbsolute: C } = t.internals, T = v !== C.x || x !== C.y;
  (T || S !== t.internals.z) && a.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: T ? { x: v, y: x } : C,
      z: S
    }
  });
}
function u1(t, a, l) {
  const o = fa(t.zIndex) ? t.zIndex : 0;
  return Dh(l) ? o : o + (t.selected ? a : 0);
}
function iC(t, a, l, o, s, u) {
  const { x: f, y: h } = a.internals.positionAbsolute, p = ei(t), g = zo(t, l), y = ul(t.extent) ? sl(g, t.extent, p) : g;
  let m = sl({ x: f + y.x, y: h + y.y }, o, p);
  t.extent === "parent" && (m = Ib(m, p, a));
  const v = u1(t, s, u), x = a.internals.z ?? 0;
  return {
    x: m.x,
    y: m.y,
    z: x >= v ? x + 1 : v
  };
}
function Oh(t, a, l, o = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const f of t) {
    const h = a.get(f.parentId);
    if (!h)
      continue;
    const p = u.get(f.parentId)?.expandedRect ?? wo(h), g = Fb(p, f.rect);
    u.set(f.parentId, { expandedRect: g, parent: h });
  }
  return u.size > 0 && u.forEach(({ expandedRect: f, parent: h }, p) => {
    const g = h.internals.positionAbsolute, y = ei(h), m = h.origin ?? o, v = f.x < g.x ? Math.round(Math.abs(g.x - f.x)) : 0, x = f.y < g.y ? Math.round(Math.abs(g.y - f.y)) : 0, S = Math.max(y.width, Math.round(f.width)), C = Math.max(y.height, Math.round(f.height)), T = (S - y.width) * m[0], N = (C - y.height) * m[1];
    (v > 0 || x > 0 || T || N) && (s.push({
      id: p,
      type: "position",
      position: {
        x: h.position.x - v + T,
        y: h.position.y - x + N
      }
    }), l.get(p)?.forEach((j) => {
      t.some((w) => w.id === j.id) || s.push({
        id: j.id,
        type: "position",
        position: {
          x: j.position.x + v,
          y: j.position.y + x
        }
      });
    })), (y.width < f.width || y.height < f.height || v || x) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: S + (v ? m[0] * v - T : 0),
        height: C + (x ? m[1] * x - N : 0)
      }
    });
  }), s;
}
function lC(t, a, l, o, s, u, f) {
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
    const C = Ch(x.nodeElement), T = S.measured.width !== C.width || S.measured.height !== C.height;
    if (!!(C.width && C.height && (T || !S.internals.handleBounds || x.force))) {
      const j = x.nodeElement.getBoundingClientRect(), w = ul(S.extent) ? S.extent : u;
      let { positionAbsolute: z } = S.internals;
      S.parentId && S.extent === "parent" ? z = Ib(z, C, a.get(S.parentId)) : w && (z = sl(z, w, C));
      const U = {
        ...S,
        measured: C,
        internals: {
          ...S.internals,
          positionAbsolute: z,
          handleBounds: {
            source: Ry("source", x.nodeElement, j, m, S.id),
            target: Ry("target", x.nodeElement, j, m, S.id)
          }
        }
      };
      a.set(S.id, U), S.parentId && zh(U, a, l, { nodeOrigin: s, zIndexMode: f }), p = !0, T && (g.push({
        id: S.id,
        type: "dimensions",
        dimensions: C
      }), S.expandParent && S.parentId && v.push({
        id: S.id,
        parentId: S.parentId,
        rect: wo(U, s)
      }));
    }
  }
  if (v.length > 0) {
    const x = Oh(v, a, l, s);
    g.push(...x);
  }
  return { changes: g, updatedInternals: p };
}
async function rC({ delta: t, panZoom: a, transform: l, translateExtent: o, width: s, height: u }) {
  if (!a || !t.x && !t.y)
    return !1;
  const f = await a.setViewportConstrained({
    x: l[0] + t.x,
    y: l[1] + t.y,
    zoom: l[2]
  }, [
    [0, 0],
    [s, u]
  ], o);
  return !!f && (f.x !== l[0] || f.y !== l[1] || f.k !== l[2]);
}
function Hy(t, a, l, o, s, u) {
  let f = s;
  const h = o.get(f) || /* @__PURE__ */ new Map();
  o.set(f, h.set(l, a)), f = `${s}-${t}`;
  const p = o.get(f) || /* @__PURE__ */ new Map();
  if (o.set(f, p.set(l, a)), u) {
    f = `${s}-${t}-${u}`;
    const g = o.get(f) || /* @__PURE__ */ new Map();
    o.set(f, g.set(l, a));
  }
}
function c1(t, a, l) {
  t.clear(), a.clear();
  for (const o of l) {
    const { source: s, target: u, sourceHandle: f = null, targetHandle: h = null } = o, p = { edgeId: o.id, source: s, target: u, sourceHandle: f, targetHandle: h }, g = `${s}-${f}--${u}-${h}`, y = `${u}-${h}--${s}-${f}`;
    Hy("source", p, y, t, s, f), Hy("target", p, g, t, u, h), a.set(o.id, o);
  }
}
function f1(t, a) {
  if (!t.parentId)
    return !1;
  const l = a.get(t.parentId);
  return l ? l.selected ? !0 : f1(l, a) : !1;
}
function By(t, a, l) {
  let o = t;
  do {
    if (o?.matches?.(a))
      return !0;
    if (o === l)
      return !1;
    o = o?.parentElement;
  } while (o);
  return !1;
}
function oC(t, a, l, o) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, f] of t)
    if ((f.selected || f.id === o) && (!f.parentId || !f1(f, t)) && (f.draggable || a && typeof f.draggable > "u")) {
      const h = t.get(u);
      h && s.set(u, {
        id: u,
        position: h.position || { x: 0, y: 0 },
        distance: {
          x: l.x - h.internals.positionAbsolute.x,
          y: l.y - h.internals.positionAbsolute.y
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
function yd({ nodeId: t, dragItems: a, nodeLookup: l, dragging: o = !0 }) {
  const s = [];
  for (const [f, h] of a) {
    const p = l.get(f)?.internals.userNode;
    p && s.push({
      ...p,
      position: h.position,
      dragging: o
    });
  }
  if (!t)
    return [s[0], s];
  const u = l.get(t)?.internals.userNode;
  return [
    u ? {
      ...u,
      position: a.get(t)?.position || u.position,
      dragging: o
    } : s[0],
    s
  ];
}
function sC({ dragItems: t, snapGrid: a, x: l, y: o }) {
  const s = t.values().next().value;
  if (!s)
    return null;
  const u = {
    x: l - s.distance.x,
    y: o - s.distance.y
  }, f = Lo(u, a);
  return {
    x: f.x - u.x,
    y: f.y - u.y
  };
}
function uC({ onNodeMouseDown: t, getStoreItems: a, onDragStart: l, onDrag: o, onDragStop: s }) {
  let u = { x: null, y: null }, f = 0, h = /* @__PURE__ */ new Map(), p = !1, g = { x: 0, y: 0 }, y = null, m = !1, v = null, x = !1, S = !1, C = null;
  function T({ noDragClassName: j, handleSelector: w, domNode: z, isSelectable: U, nodeId: H, nodeClickDistance: k = 0 }) {
    v = Bn(z);
    function D({ x: J, y: oe }) {
      const { nodeLookup: L, nodeExtent: X, snapGrid: _, snapToGrid: O, nodeOrigin: Z, onNodeDrag: G, onSelectionDrag: ae, onError: A, updateNodePositions: V } = a();
      u = { x: J, y: oe };
      let I = !1;
      const ne = h.size > 1, se = ne && X ? Zd(Oo(h)) : null, me = ne && O ? sC({
        dragItems: h,
        snapGrid: _,
        x: J,
        y: oe
      }) : null;
      for (const [ge, W] of h) {
        if (!L.has(ge))
          continue;
        let pe = { x: J - W.distance.x, y: oe - W.distance.y };
        O && (pe = me ? {
          x: Math.round(pe.x + me.x),
          y: Math.round(pe.y + me.y)
        } : Lo(pe, _));
        let ze = null;
        if (ne && X && !W.extent && se) {
          const { positionAbsolute: Se } = W.internals, De = Se.x - se.x + X[0][0], Ge = Se.x + W.measured.width - se.x2 + X[1][0], nt = Se.y - se.y + X[0][1], lt = Se.y + W.measured.height - se.y2 + X[1][1];
          ze = [
            [De, nt],
            [Ge, lt]
          ];
        }
        const { position: Ae, positionAbsolute: we } = Kb({
          nodeId: ge,
          nextPosition: pe,
          nodeLookup: L,
          nodeExtent: ze || X,
          nodeOrigin: Z,
          onError: A
        });
        I = I || W.position.x !== Ae.x || W.position.y !== Ae.y, W.position = Ae, W.internals.positionAbsolute = we;
      }
      if (S = S || I, !!I && (V(h, !0), C && (o || G || !H && ae))) {
        const [ge, W] = yd({
          nodeId: H,
          dragItems: h,
          nodeLookup: L
        });
        o?.(C, h, ge, W), G?.(C, ge, W), H || ae?.(C, W);
      }
    }
    async function Q() {
      if (!y)
        return;
      const { transform: J, panBy: oe, autoPanSpeed: L, autoPanOnNodeDrag: X } = a();
      if (!X) {
        p = !1, cancelAnimationFrame(f);
        return;
      }
      const [_, O] = Mh(g, y, L);
      (_ !== 0 || O !== 0) && (u.x = (u.x ?? 0) - _ / J[2], u.y = (u.y ?? 0) - O / J[2], await oe({ x: _, y: O }) && D(u)), f = requestAnimationFrame(Q);
    }
    function le(J) {
      const { nodeLookup: oe, multiSelectionActive: L, nodesDraggable: X, transform: _, snapGrid: O, snapToGrid: Z, selectNodesOnDrag: G, onNodeDragStart: ae, onSelectionDragStart: A, unselectNodesAndEdges: V } = a();
      m = !0, (!G || !U) && !L && H && (oe.get(H)?.selected || V()), U && G && H && t?.(H);
      const I = ho(J.sourceEvent, { transform: _, snapGrid: O, snapToGrid: Z, containerBounds: y });
      if (u = I, h = oC(oe, X, I, H), h.size > 0 && (l || ae || !H && A)) {
        const [ne, se] = yd({
          nodeId: H,
          dragItems: h,
          nodeLookup: oe
        });
        l?.(J.sourceEvent, h, ne, se), ae?.(J.sourceEvent, ne, se), H || A?.(J.sourceEvent, se);
      }
    }
    const K = Tb().clickDistance(k).on("start", (J) => {
      const { domNode: oe, nodeDragThreshold: L, transform: X, snapGrid: _, snapToGrid: O } = a();
      y = oe?.getBoundingClientRect() || null, x = !1, S = !1, C = J.sourceEvent, L === 0 && le(J), u = ho(J.sourceEvent, { transform: X, snapGrid: _, snapToGrid: O, containerBounds: y }), g = da(J.sourceEvent, y);
    }).on("drag", (J) => {
      const { autoPanOnNodeDrag: oe, transform: L, snapGrid: X, snapToGrid: _, nodeDragThreshold: O, nodeLookup: Z } = a(), G = ho(J.sourceEvent, { transform: L, snapGrid: X, snapToGrid: _, containerBounds: y });
      if (C = J.sourceEvent, (J.sourceEvent.type === "touchmove" && J.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      H && !Z.has(H)) && (x = !0), !x) {
        if (!p && oe && m && (p = !0, Q()), !m) {
          const ae = da(J.sourceEvent, y), A = ae.x - g.x, V = ae.y - g.y;
          Math.sqrt(A * A + V * V) > O && le(J);
        }
        (u.x !== G.xSnapped || u.y !== G.ySnapped) && h && m && (g = da(J.sourceEvent, y), D(G));
      }
    }).on("end", (J) => {
      if (!m || x) {
        x && h.size > 0 && a().updateNodePositions(h, !1);
        return;
      }
      if (p = !1, m = !1, cancelAnimationFrame(f), h.size > 0) {
        const { nodeLookup: oe, updateNodePositions: L, onNodeDragStop: X, onSelectionDragStop: _ } = a();
        if (S && (L(h, !1), S = !1), s || X || !H && _) {
          const [O, Z] = yd({
            nodeId: H,
            dragItems: h,
            nodeLookup: oe,
            dragging: !1
          });
          s?.(J.sourceEvent, h, O, Z), X?.(J.sourceEvent, O, Z), H || _?.(J.sourceEvent, Z);
        }
      }
    }).filter((J) => {
      const oe = J.target;
      return !J.button && (!j || !By(oe, `.${j}`, z)) && (!w || By(oe, w, z));
    });
    v.call(K);
  }
  function N() {
    v?.on(".drag", null);
  }
  return {
    update: T,
    destroy: N
  };
}
function cC(t, a, l) {
  const o = [], s = {
    x: t.x - l,
    y: t.y - l,
    width: l * 2,
    height: l * 2
  };
  for (const u of a.values())
    Ru(s, wo(u)) > 0 && o.push(u);
  return o;
}
const fC = 250;
function dC(t, a, l, o) {
  let s = [], u = 1 / 0;
  const f = cC(t, l, a + fC);
  for (const h of f) {
    const p = [...h.internals.handleBounds?.source ?? [], ...h.internals.handleBounds?.target ?? []];
    for (const g of p) {
      if (o.nodeId === g.nodeId && o.type === g.type && o.id === g.id)
        continue;
      const { x: y, y: m } = cl(h, g, g.position, !0), v = Math.sqrt(Math.pow(y - t.x, 2) + Math.pow(m - t.y, 2));
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
function d1(t, a, l, o, s, u = !1) {
  const f = o.get(t);
  if (!f)
    return null;
  const h = s === "strict" ? f.internals.handleBounds?.[a] : [...f.internals.handleBounds?.source ?? [], ...f.internals.handleBounds?.target ?? []], p = (l ? h?.find((g) => g.id === l) : h?.[0]) ?? null;
  return p && u ? { ...p, ...cl(f, p, p.position, !0) } : p;
}
function h1(t, a) {
  return t || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function hC(t, a) {
  let l = null;
  return a ? l = !0 : t && !a && (l = !1), l;
}
const m1 = () => !0;
function mC(t, { connectionMode: a, connectionRadius: l, handleId: o, nodeId: s, edgeUpdaterType: u, isTarget: f, domNode: h, nodeLookup: p, lib: g, autoPanOnConnect: y, flowId: m, panBy: v, cancelConnection: x, onConnectStart: S, onConnect: C, onConnectEnd: T, isValidConnection: N = m1, onReconnectEnd: j, updateConnection: w, getTransform: z, getFromHandle: U, autoPanSpeed: H, dragThreshold: k = 1, handleDomNode: D }) {
  const Q = t1(t.target);
  let le = 0, K;
  const { x: J, y: oe } = da(t), L = h1(u, D), X = h?.getBoundingClientRect();
  let _ = !1;
  if (!X || !L)
    return;
  const O = d1(s, L, o, p, a);
  if (!O)
    return;
  let Z = da(t, X), G = !1, ae = null, A = !1, V = null;
  function I() {
    if (!y || !X)
      return;
    const [Ae, we] = Mh(Z, X, H);
    v({ x: Ae, y: we }), le = requestAnimationFrame(I);
  }
  const ne = {
    ...O,
    nodeId: s,
    type: L,
    position: O.position
  }, se = p.get(s);
  let ge = {
    inProgress: !0,
    isValid: null,
    from: cl(se, ne, Ce.Left, !0),
    fromHandle: ne,
    fromPosition: ne.position,
    fromNode: se,
    to: Z,
    toHandle: null,
    toPosition: Ny[ne.position],
    toNode: null,
    pointer: Z
  };
  function W() {
    _ = !0, w(ge), S?.(t, { nodeId: s, handleId: o, handleType: L });
  }
  k === 0 && W();
  function pe(Ae) {
    if (!_) {
      const { x: lt, y: Ft } = da(Ae), pt = lt - J, qt = Ft - oe;
      if (!(pt * pt + qt * qt > k * k))
        return;
      W();
    }
    if (!U() || !ne) {
      ze(Ae);
      return;
    }
    const we = z();
    Z = da(Ae, X), K = dC(jo(Z, we, !1, [1, 1]), l, p, ne), G || (I(), G = !0);
    const Se = g1(Ae, {
      handle: K,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: o,
      fromType: f ? "target" : "source",
      isValidConnection: N,
      doc: Q,
      lib: g,
      flowId: m,
      nodeLookup: p
    });
    V = Se.handleDomNode, ae = Se.connection, A = hC(!!K, Se.isValid);
    const De = p.get(s), Ge = De ? cl(De, ne, Ce.Left, !0) : ge.from, nt = {
      ...ge,
      from: Ge,
      isValid: A,
      to: Se.toHandle && A ? or({ x: Se.toHandle.x, y: Se.toHandle.y }, we) : Z,
      toHandle: Se.toHandle,
      toPosition: A && Se.toHandle ? Se.toHandle.position : Ny[ne.position],
      toNode: Se.toHandle ? p.get(Se.toHandle.nodeId) : null,
      pointer: Z
    };
    w(nt), ge = nt;
  }
  function ze(Ae) {
    if (!("touches" in Ae && Ae.touches.length > 0)) {
      if (_) {
        (K || V) && ae && A && C?.(ae);
        const { inProgress: we, ...Se } = ge, De = {
          ...Se,
          toPosition: ge.toHandle ? ge.toPosition : null
        };
        T?.(Ae, De), u && j?.(Ae, De);
      }
      x(), cancelAnimationFrame(le), G = !1, A = !1, ae = null, V = null, Q.removeEventListener("mousemove", pe), Q.removeEventListener("mouseup", ze), Q.removeEventListener("touchmove", pe), Q.removeEventListener("touchend", ze);
    }
  }
  Q.addEventListener("mousemove", pe), Q.addEventListener("mouseup", ze), Q.addEventListener("touchmove", pe), Q.addEventListener("touchend", ze);
}
function g1(t, { handle: a, connectionMode: l, fromNodeId: o, fromHandleId: s, fromType: u, doc: f, lib: h, flowId: p, isValidConnection: g = m1, nodeLookup: y }) {
  const m = u === "target", v = a ? f.querySelector(`.${h}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: S } = da(t), C = f.elementFromPoint(x, S), T = C?.classList.contains(`${h}-flow__handle`) ? C : v, N = {
    handleDomNode: T,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (T) {
    const j = h1(void 0, T), w = T.getAttribute("data-nodeid"), z = T.getAttribute("data-handleid"), U = T.classList.contains("connectable"), H = T.classList.contains("connectableend");
    if (!w || !j)
      return N;
    const k = {
      source: m ? w : o,
      sourceHandle: m ? z : s,
      target: m ? o : w,
      targetHandle: m ? s : z
    };
    N.connection = k;
    const Q = U && H && (l === lr.Strict ? m && j === "source" || !m && j === "target" : w !== o || z !== s);
    N.isValid = Q && g(k), N.toHandle = d1(w, j, z, y, l, !0);
  }
  return N;
}
const Fd = {
  onPointerDown: mC,
  isValid: g1
};
function gC({ domNode: t, panZoom: a, getTransform: l, getViewScale: o }) {
  const s = Bn(t);
  function u({ translateExtent: h, width: p, height: g, zoomStep: y = 1, pannable: m = !0, zoomable: v = !0, inversePan: x = !1 }) {
    const S = (w) => {
      if (w.sourceEvent.type !== "wheel" || !a)
        return;
      const z = l(), U = w.sourceEvent.ctrlKey && Eo() ? 10 : 1, H = -w.sourceEvent.deltaY * (w.sourceEvent.deltaMode === 1 ? 0.05 : w.sourceEvent.deltaMode ? 1 : 2e-3) * y, k = z[2] * Math.pow(2, H * U);
      a.scaleTo(k);
    };
    let C = [0, 0];
    const T = (w) => {
      (w.sourceEvent.type === "mousedown" || w.sourceEvent.type === "touchstart") && (C = [
        w.sourceEvent.clientX ?? w.sourceEvent.touches[0].clientX,
        w.sourceEvent.clientY ?? w.sourceEvent.touches[0].clientY
      ]);
    }, N = (w) => {
      const z = l();
      if (w.sourceEvent.type !== "mousemove" && w.sourceEvent.type !== "touchmove" || !a)
        return;
      const U = [
        w.sourceEvent.clientX ?? w.sourceEvent.touches[0].clientX,
        w.sourceEvent.clientY ?? w.sourceEvent.touches[0].clientY
      ], H = [U[0] - C[0], U[1] - C[1]];
      C = U;
      const k = o() * Math.max(z[2], Math.log(z[2])) * (x ? -1 : 1), D = {
        x: z[0] - H[0] * k,
        y: z[1] - H[1] * k
      }, Q = [
        [0, 0],
        [p, g]
      ];
      a.setViewportConstrained({
        x: D.x,
        y: D.y,
        zoom: z[2]
      }, Q, h);
    }, j = qb().on("start", T).on("zoom", m ? N : null).on("zoom.wheel", v ? S : null);
    s.call(j, {});
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
const Xu = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), vd = ({ x: t, y: a, zoom: l }) => Vu.translate(t, a).scale(l), Fl = (t, a) => t.target.closest(`.${a}`), p1 = (t, a) => a === 2 && Array.isArray(t) && t.includes(2), pC = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, bd = (t, a = 0, l = pC, o = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || o(), s ? t.transition().duration(a).ease(l).on("end", o) : t;
}, y1 = (t) => {
  const a = t.ctrlKey && Eo() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * a;
};
function yC({ zoomPanValues: t, noWheelClassName: a, d3Selection: l, d3Zoom: o, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: f, onPanZoomStart: h, onPanZoom: p, onPanZoomEnd: g }) {
  return (y) => {
    if (Fl(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const m = l.property("__zoom").k || 1;
    if (y.ctrlKey && f) {
      const T = ua(y), N = y1(y), j = m * Math.pow(2, N);
      o.scaleTo(l, j, T, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let x = s === ll.Vertical ? 0 : y.deltaX * v, S = s === ll.Horizontal ? 0 : y.deltaY * v;
    !Eo() && y.shiftKey && s !== ll.Vertical && (x = y.deltaY * v, S = 0), o.translateBy(
      l,
      -(x / m) * u,
      -(S / m) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const C = Xu(l.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (p?.(y, C), t.panScrollTimeout = setTimeout(() => {
      g?.(y, C), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, h?.(y, C));
  };
}
function vC({ noWheelClassName: t, preventScrolling: a, d3ZoomHandler: l }) {
  return function(o, s) {
    const u = o.type === "wheel", f = !a && u && !o.ctrlKey, h = Fl(o, t);
    if (o.ctrlKey && u && h && o.preventDefault(), f || h)
      return null;
    o.preventDefault(), l.call(this, o, s);
  };
}
function bC({ zoomPanValues: t, onDraggingChange: a, onPanZoomStart: l }) {
  return (o) => {
    if (o.sourceEvent?.internal)
      return;
    const s = Xu(o.transform);
    t.mouseButton = o.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, o.sourceEvent?.type === "mousedown" && a(!0), l && l?.(o.sourceEvent, s);
  };
}
function xC({ zoomPanValues: t, panOnDrag: a, onPaneContextMenu: l, onTransformChange: o, onPanZoom: s }) {
  return (u) => {
    t.usedRightMouseButton = !!(l && p1(a, t.mouseButton ?? 0)), u.sourceEvent?.sync || o([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, Xu(u.transform));
  };
}
function SC({ zoomPanValues: t, panOnDrag: a, panOnScroll: l, onDraggingChange: o, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (f) => {
    if (!f.sourceEvent?.internal && (t.isZoomingOrPanning = !1, u && p1(a, t.mouseButton ?? 0) && !t.usedRightMouseButton && f.sourceEvent && u(f.sourceEvent), t.usedRightMouseButton = !1, o(!1), s)) {
      const h = Xu(f.transform);
      t.prevViewport = h, clearTimeout(t.timerId), t.timerId = setTimeout(
        () => {
          s?.(f.sourceEvent, h);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        l ? 150 : 0
      );
    }
  };
}
function wC({ zoomActivationKeyPressed: t, zoomOnScroll: a, zoomOnPinch: l, panOnDrag: o, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: f, noWheelClassName: h, noPanClassName: p, lib: g, connectionInProgress: y }) {
  return (m) => {
    const v = t || a, x = l && m.ctrlKey, S = m.type === "wheel";
    if (m.button === 1 && m.type === "mousedown" && (Fl(m, `${g}-flow__node`) || Fl(m, `${g}-flow__edge`)))
      return !0;
    if (!o && !v && !s && !u && !l || f || y && !S || Fl(m, h) && S || Fl(m, p) && (!S || s && S && !t) || !l && m.ctrlKey && S)
      return !1;
    if (!l && m.type === "touchstart" && m.touches?.length > 1)
      return m.preventDefault(), !1;
    if (!v && !s && !x && S || !o && (m.type === "mousedown" || m.type === "touchstart") || Array.isArray(o) && !o.includes(m.button) && m.type === "mousedown")
      return !1;
    const C = Array.isArray(o) && o.includes(m.button) || !m.button || m.button <= 1;
    return (!m.ctrlKey || S) && C;
  };
}
function EC({ domNode: t, minZoom: a, maxZoom: l, translateExtent: o, viewport: s, onPanZoom: u, onPanZoomStart: f, onPanZoomEnd: h, onDraggingChange: p }) {
  const g = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = t.getBoundingClientRect(), m = qb().scaleExtent([a, l]).translateExtent(o), v = Bn(t).call(m);
  j({
    x: s.x,
    y: s.y,
    zoom: rr(s.zoom, a, l)
  }, [
    [0, 0],
    [y.width, y.height]
  ], o);
  const x = v.on("wheel.zoom"), S = v.on("dblclick.zoom");
  m.wheelDelta(y1);
  async function C(K, J) {
    return v ? new Promise((oe) => {
      m?.interpolate(J?.interpolate === "linear" ? fo : du).transform(bd(v, J?.duration, J?.ease, () => oe(!0)), K);
    }) : !1;
  }
  function T({ noWheelClassName: K, noPanClassName: J, onPaneContextMenu: oe, userSelectionActive: L, panOnScroll: X, panOnDrag: _, panOnScrollMode: O, panOnScrollSpeed: Z, preventScrolling: G, zoomOnPinch: ae, zoomOnScroll: A, zoomOnDoubleClick: V, zoomActivationKeyPressed: I, lib: ne, onTransformChange: se, connectionInProgress: me, paneClickDistance: ge, selectionOnDrag: W }) {
    L && !g.isZoomingOrPanning && N();
    const pe = X && !I && !L;
    m.clickDistance(W ? 1 / 0 : !fa(ge) || ge < 0 ? 0 : ge);
    const ze = pe ? yC({
      zoomPanValues: g,
      noWheelClassName: K,
      d3Selection: v,
      d3Zoom: m,
      panOnScrollMode: O,
      panOnScrollSpeed: Z,
      zoomOnPinch: ae,
      onPanZoomStart: f,
      onPanZoom: u,
      onPanZoomEnd: h
    }) : vC({
      noWheelClassName: K,
      preventScrolling: G,
      d3ZoomHandler: x
    });
    v.on("wheel.zoom", ze, { passive: !1 });
    const Ae = bC({
      zoomPanValues: g,
      onDraggingChange: p,
      onPanZoomStart: f
    });
    m.on("start", Ae);
    const we = xC({
      zoomPanValues: g,
      panOnDrag: _,
      onPaneContextMenu: !!oe,
      onPanZoom: u,
      onTransformChange: se
    });
    m.on("zoom", we);
    const Se = SC({
      zoomPanValues: g,
      panOnDrag: _,
      panOnScroll: X,
      onPaneContextMenu: oe,
      onPanZoomEnd: h,
      onDraggingChange: p
    });
    m.on("end", Se);
    const De = wC({
      zoomActivationKeyPressed: I,
      panOnDrag: _,
      zoomOnScroll: A,
      panOnScroll: X,
      zoomOnDoubleClick: V,
      zoomOnPinch: ae,
      userSelectionActive: L,
      noPanClassName: J,
      noWheelClassName: K,
      lib: ne,
      connectionInProgress: me
    });
    m.filter(De), V ? v.on("dblclick.zoom", S) : v.on("dblclick.zoom", null);
  }
  function N() {
    m.on("zoom", null);
  }
  async function j(K, J, oe) {
    const L = vd(K), X = m?.constrain()(L, J, oe);
    return X && await C(X), X;
  }
  async function w(K, J) {
    const oe = vd(K);
    return await C(oe, J), oe;
  }
  function z(K) {
    if (v) {
      const J = vd(K), oe = v.property("__zoom");
      (oe.k !== K.zoom || oe.x !== K.x || oe.y !== K.y) && m?.transform(v, J, null, { sync: !0 });
    }
  }
  function U() {
    const K = v ? Vb(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: K.x, y: K.y, zoom: K.k };
  }
  async function H(K, J) {
    return v ? new Promise((oe) => {
      m?.interpolate(J?.interpolate === "linear" ? fo : du).scaleTo(bd(v, J?.duration, J?.ease, () => oe(!0)), K);
    }) : !1;
  }
  async function k(K, J) {
    return v ? new Promise((oe) => {
      m?.interpolate(J?.interpolate === "linear" ? fo : du).scaleBy(bd(v, J?.duration, J?.ease, () => oe(!0)), K);
    }) : !1;
  }
  function D(K) {
    m?.scaleExtent(K);
  }
  function Q(K) {
    m?.translateExtent(K);
  }
  function le(K) {
    const J = !fa(K) || K < 0 ? 0 : K;
    m?.clickDistance(J);
  }
  return {
    update: T,
    destroy: N,
    setViewport: w,
    setViewportConstrained: j,
    getViewport: U,
    scaleTo: H,
    scaleBy: k,
    setScaleExtent: D,
    setTranslateExtent: Q,
    syncViewport: z,
    setClickDistance: le
  };
}
var sr;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(sr || (sr = {}));
function _C({ width: t, prevWidth: a, height: l, prevHeight: o, affectsX: s, affectsY: u }) {
  const f = t - a, h = l - o, p = [f > 0 ? 1 : f < 0 ? -1 : 0, h > 0 ? 1 : h < 0 ? -1 : 0];
  return f && s && (p[0] = p[0] * -1), h && u && (p[1] = p[1] * -1), p;
}
function Uy(t) {
  const a = t.includes("right") || t.includes("left"), l = t.includes("bottom") || t.includes("top"), o = t.includes("left"), s = t.includes("top");
  return {
    isHorizontal: a,
    isVertical: l,
    affectsX: o,
    affectsY: s
  };
}
function Ai(t, a) {
  return Math.max(0, a - t);
}
function Di(t, a) {
  return Math.max(0, t - a);
}
function nu(t, a, l) {
  return Math.max(0, a - t, t - l);
}
function ky(t, a) {
  return t ? !a : a;
}
function NC(t, a, l, o, s, u, f, h) {
  let { affectsX: p, affectsY: g } = a;
  const { isHorizontal: y, isVertical: m } = a, v = y && m, { xSnapped: x, ySnapped: S } = l, { minWidth: C, maxWidth: T, minHeight: N, maxHeight: j } = o, { x: w, y: z, width: U, height: H, aspectRatio: k } = t;
  let D = Math.floor(y ? x - t.pointerX : 0), Q = Math.floor(m ? S - t.pointerY : 0);
  const le = U + (p ? -D : D), K = H + (g ? -Q : Q), J = -u[0] * U, oe = -u[1] * H;
  let L = nu(le, C, T), X = nu(K, N, j);
  if (f) {
    let Z = 0, G = 0;
    p && D < 0 ? Z = Ai(w + D + J, f[0][0]) : !p && D > 0 && (Z = Di(w + le + J, f[1][0])), g && Q < 0 ? G = Ai(z + Q + oe, f[0][1]) : !g && Q > 0 && (G = Di(z + K + oe, f[1][1])), L = Math.max(L, Z), X = Math.max(X, G);
  }
  if (h) {
    let Z = 0, G = 0;
    p && D > 0 ? Z = Di(w + D, h[0][0]) : !p && D < 0 && (Z = Ai(w + le, h[1][0])), g && Q > 0 ? G = Di(z + Q, h[0][1]) : !g && Q < 0 && (G = Ai(z + K, h[1][1])), L = Math.max(L, Z), X = Math.max(X, G);
  }
  if (s) {
    if (y) {
      const Z = nu(le / k, N, j) * k;
      if (L = Math.max(L, Z), f) {
        let G = 0;
        !p && !g || p && !g && v ? G = Di(z + oe + le / k, f[1][1]) * k : G = Ai(z + oe + (p ? D : -D) / k, f[0][1]) * k, L = Math.max(L, G);
      }
      if (h) {
        let G = 0;
        !p && !g || p && !g && v ? G = Ai(z + le / k, h[1][1]) * k : G = Di(z + (p ? D : -D) / k, h[0][1]) * k, L = Math.max(L, G);
      }
    }
    if (m) {
      const Z = nu(K * k, C, T) / k;
      if (X = Math.max(X, Z), f) {
        let G = 0;
        !p && !g || g && !p && v ? G = Di(w + K * k + J, f[1][0]) / k : G = Ai(w + (g ? Q : -Q) * k + J, f[0][0]) / k, X = Math.max(X, G);
      }
      if (h) {
        let G = 0;
        !p && !g || g && !p && v ? G = Ai(w + K * k, h[1][0]) / k : G = Di(w + (g ? Q : -Q) * k, h[0][0]) / k, X = Math.max(X, G);
      }
    }
  }
  Q = Q + (Q < 0 ? X : -X), D = D + (D < 0 ? L : -L), s && (v ? le > K * k ? Q = (ky(p, g) ? -D : D) / k : D = (ky(p, g) ? -Q : Q) * k : y ? (Q = D / k, g = p) : (D = Q * k, p = g));
  const _ = p ? w + D : w, O = g ? z + Q : z;
  return {
    width: U + (p ? -D : D),
    height: H + (g ? -Q : Q),
    x: u[0] * D * (p ? -1 : 1) + _,
    y: u[1] * Q * (g ? -1 : 1) + O
  };
}
const v1 = { width: 0, height: 0, x: 0, y: 0 }, MC = {
  ...v1,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function TC(t, a, l) {
  const o = a.position.x + t.position.x, s = a.position.y + t.position.y, u = t.measured.width ?? 0, f = t.measured.height ?? 0, h = l[0] * u, p = l[1] * f;
  return [
    [o - h, s - p],
    [o + u - h, s + f - p]
  ];
}
function CC({ domNode: t, nodeId: a, getStoreItems: l, onChange: o, onEnd: s }) {
  const u = Bn(t);
  let f = {
    controlDirection: Uy("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function h({ controlPosition: g, boundaries: y, keepAspectRatio: m, resizeDirection: v, onResizeStart: x, onResize: S, onResizeEnd: C, shouldResize: T }) {
    let N = { ...v1 }, j = { ...MC };
    f = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: m,
      controlDirection: Uy(g)
    };
    let w, z = null, U = [], H, k, D, Q = !1;
    const le = Tb().on("start", (K) => {
      const { nodeLookup: J, transform: oe, snapGrid: L, snapToGrid: X, nodeOrigin: _, paneDomNode: O } = l();
      if (w = J.get(a), !w)
        return;
      z = O?.getBoundingClientRect() ?? null;
      const { xSnapped: Z, ySnapped: G } = ho(K.sourceEvent, {
        transform: oe,
        snapGrid: L,
        snapToGrid: X,
        containerBounds: z
      });
      N = {
        width: w.measured.width ?? 0,
        height: w.measured.height ?? 0,
        x: w.position.x ?? 0,
        y: w.position.y ?? 0
      }, j = {
        ...N,
        pointerX: Z,
        pointerY: G,
        aspectRatio: N.width / N.height
      }, H = void 0, k = ul(w.extent) ? w.extent : void 0, w.parentId && (w.extent === "parent" || w.expandParent) && (H = J.get(w.parentId)), H && w.extent === "parent" && (k = [
        [0, 0],
        [H.measured.width, H.measured.height]
      ]), U = [], D = void 0;
      for (const [ae, A] of J)
        if (A.parentId === a && (U.push({
          id: ae,
          position: { ...A.position },
          extent: A.extent
        }), A.extent === "parent" || A.expandParent)) {
          const V = TC(A, w, A.origin ?? _);
          D ? D = [
            [Math.min(V[0][0], D[0][0]), Math.min(V[0][1], D[0][1])],
            [Math.max(V[1][0], D[1][0]), Math.max(V[1][1], D[1][1])]
          ] : D = V;
        }
      x?.(K, { ...N });
    }).on("drag", (K) => {
      const { transform: J, snapGrid: oe, snapToGrid: L, nodeOrigin: X } = l(), _ = ho(K.sourceEvent, {
        transform: J,
        snapGrid: oe,
        snapToGrid: L,
        containerBounds: z
      }), O = [];
      if (!w)
        return;
      const { x: Z, y: G, width: ae, height: A } = N, V = {}, I = w.origin ?? X, { width: ne, height: se, x: me, y: ge } = NC(j, f.controlDirection, _, f.boundaries, f.keepAspectRatio, I, k, D), W = ne !== ae, pe = se !== A, ze = me !== Z && W, Ae = ge !== G && pe;
      if (!ze && !Ae && !W && !pe)
        return;
      if ((ze || Ae || I[0] === 1 || I[1] === 1) && (V.x = ze ? me : N.x, V.y = Ae ? ge : N.y, N.x = V.x, N.y = V.y, U.length > 0)) {
        const Ge = me - Z, nt = ge - G;
        for (const lt of U)
          lt.position = {
            x: lt.position.x - Ge + I[0] * (ne - ae),
            y: lt.position.y - nt + I[1] * (se - A)
          }, O.push(lt);
      }
      if ((W || pe) && (V.width = W && (!f.resizeDirection || f.resizeDirection === "horizontal") ? ne : N.width, V.height = pe && (!f.resizeDirection || f.resizeDirection === "vertical") ? se : N.height, N.width = V.width, N.height = V.height), H && w.expandParent) {
        const Ge = I[0] * (V.width ?? 0);
        V.x && V.x < Ge && (N.x = Ge, j.x = j.x - (V.x - Ge));
        const nt = I[1] * (V.height ?? 0);
        V.y && V.y < nt && (N.y = nt, j.y = j.y - (V.y - nt));
      }
      const we = _C({
        width: N.width,
        prevWidth: ae,
        height: N.height,
        prevHeight: A,
        affectsX: f.controlDirection.affectsX,
        affectsY: f.controlDirection.affectsY
      }), Se = { ...N, direction: we };
      T?.(K, Se) !== !1 && (Q = !0, S?.(K, Se), o(V, O));
    }).on("end", (K) => {
      Q && (C?.(K, { ...N }), s?.({ ...N }), Q = !1);
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
var Yy;
function RC() {
  if (Yy) return Ed;
  Yy = 1;
  var t = No();
  function a(m, v) {
    return m === v && (m !== 0 || 1 / m === 1 / v) || m !== m && v !== v;
  }
  var l = typeof Object.is == "function" ? Object.is : a, o = t.useState, s = t.useEffect, u = t.useLayoutEffect, f = t.useDebugValue;
  function h(m, v) {
    var x = v(), S = o({ inst: { value: x, getSnapshot: v } }), C = S[0].inst, T = S[1];
    return u(
      function() {
        C.value = x, C.getSnapshot = v, p(C) && T({ inst: C });
      },
      [m, x, v]
    ), s(
      function() {
        return p(C) && T({ inst: C }), m(function() {
          p(C) && T({ inst: C });
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
      return !l(m, x);
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
var Vy;
function AC() {
  return Vy || (Vy = 1, wd.exports = RC()), wd.exports;
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
var qy;
function DC() {
  if (qy) return Sd;
  qy = 1;
  var t = No(), a = AC();
  function l(g, y) {
    return g === y && (g !== 0 || 1 / g === 1 / y) || g !== g && y !== y;
  }
  var o = typeof Object.is == "function" ? Object.is : l, s = a.useSyncExternalStore, u = t.useRef, f = t.useEffect, h = t.useMemo, p = t.useDebugValue;
  return Sd.useSyncExternalStoreWithSelector = function(g, y, m, v, x) {
    var S = u(null);
    if (S.current === null) {
      var C = { hasValue: !1, value: null };
      S.current = C;
    } else C = S.current;
    S = h(
      function() {
        function N(H) {
          if (!j) {
            if (j = !0, w = H, H = v(H), x !== void 0 && C.hasValue) {
              var k = C.value;
              if (x(k, H))
                return z = k;
            }
            return z = H;
          }
          if (k = z, o(w, H)) return k;
          var D = v(H);
          return x !== void 0 && x(k, D) ? (w = H, k) : (w = H, z = D);
        }
        var j = !1, w, z, U = m === void 0 ? null : m;
        return [
          function() {
            return N(y());
          },
          U === null ? void 0 : function() {
            return N(U());
          }
        ];
      },
      [y, m, v, x]
    );
    var T = s(g, S[0], S[1]);
    return f(
      function() {
        C.hasValue = !0, C.value = T;
      },
      [T]
    ), p(T), T;
  }, Sd;
}
var Gy;
function zC() {
  return Gy || (Gy = 1, xd.exports = DC()), xd.exports;
}
var OC = zC();
const LC = /* @__PURE__ */ nh(OC), jC = {}, Xy = (t) => {
  let a;
  const l = /* @__PURE__ */ new Set(), o = (y, m) => {
    const v = typeof y == "function" ? y(a) : y;
    if (!Object.is(v, a)) {
      const x = a;
      a = m ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), l.forEach((S) => S(a, x));
    }
  }, s = () => a, p = { setState: o, getState: s, getInitialState: () => g, subscribe: (y) => (l.add(y), () => l.delete(y)), destroy: () => {
    (jC ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), l.clear();
  } }, g = a = t(o, s, p);
  return p;
}, HC = (t) => t ? Xy(t) : Xy, { useDebugValue: BC } = ye, { useSyncExternalStoreWithSelector: UC } = LC, kC = (t) => t;
function b1(t, a = kC, l) {
  const o = UC(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    a,
    l
  );
  return BC(o), o;
}
const $y = (t, a) => {
  const l = HC(t), o = (s, u = a) => b1(l, s, u);
  return Object.assign(o, l), o;
}, YC = (t, a) => t ? $y(t, a) : $y;
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
  const l = Object.keys(t);
  if (l.length !== Object.keys(a).length)
    return !1;
  for (const o of l)
    if (!Object.prototype.hasOwnProperty.call(a, o) || !Object.is(t[o], a[o]))
      return !1;
  return !0;
}
var VC = Av();
const qC = /* @__PURE__ */ nh(VC), $u = M.createContext(null), GC = $u.Provider, x1 = ha.error001("react");
function Pe(t, a) {
  const l = M.useContext($u);
  if (l === null)
    throw new Error(x1);
  return b1(l, t, a);
}
function wt() {
  const t = M.useContext($u);
  if (t === null)
    throw new Error(x1);
  return M.useMemo(() => ({
    getState: t.getState,
    setState: t.setState,
    subscribe: t.subscribe
  }), [t]);
}
const Zy = { display: "none" }, XC = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, S1 = "react-flow__node-desc", w1 = "react-flow__edge-desc", $C = "react-flow__aria-live", ZC = (t) => t.ariaLiveMessage, QC = (t) => t.ariaLabelConfig;
function KC({ rfId: t }) {
  const a = Pe(ZC);
  return R.jsx("div", { id: `${$C}-${t}`, "aria-live": "assertive", "aria-atomic": "true", style: XC, children: a });
}
function IC({ rfId: t, disableKeyboardA11y: a }) {
  const l = Pe(QC);
  return R.jsxs(R.Fragment, { children: [R.jsx("div", { id: `${S1}-${t}`, style: Zy, children: a ? l["node.a11yDescription.default"] : l["node.a11yDescription.keyboardDisabled"] }), R.jsx("div", { id: `${w1}-${t}`, style: Zy, children: l["edge.a11yDescription.default"] }), !a && R.jsx(KC, { rfId: t })] });
}
const Zu = M.forwardRef(({ position: t = "top-left", children: a, className: l, style: o, ...s }, u) => {
  const f = `${t}`.split("-");
  return R.jsx("div", { className: Vt(["react-flow__panel", l, ...f]), style: o, ref: u, ...s, children: a });
});
Zu.displayName = "Panel";
const Qy = "https://reactflow.dev?utm_source=attribution";
function FC({ proOptions: t, position: a = "bottom-right" }) {
  return t?.hideAttribution ? null : R.jsx(Zu, { position: a, className: "react-flow__attribution", "data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${Qy}`, children: R.jsx("a", { href: Qy, target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const JC = (t) => {
  const a = [], l = [];
  for (const [, o] of t.nodeLookup)
    o.selected && a.push(o.internals.userNode);
  for (const [, o] of t.edgeLookup)
    o.selected && l.push(o);
  return { selectedNodes: a, selectedEdges: l };
}, au = (t) => t.id;
function PC(t, a) {
  return St(t.selectedNodes.map(au), a.selectedNodes.map(au)) && St(t.selectedEdges.map(au), a.selectedEdges.map(au));
}
function WC({ onSelectionChange: t }) {
  const a = wt(), { selectedNodes: l, selectedEdges: o } = Pe(JC, PC);
  return M.useEffect(() => {
    const s = { nodes: l, edges: o };
    t?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [l, o, t]), null;
}
const eR = (t) => !!t.onSelectionChangeHandlers;
function tR({ onSelectionChange: t }) {
  const a = Pe(eR);
  return t || a ? R.jsx(WC, { onSelectionChange: t }) : null;
}
const E1 = [0, 0], nR = { x: 0, y: 0, zoom: 1 }, aR = [
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
], Ky = [...aR, "rfId"], iR = (t) => ({
  setNodes: t.setNodes,
  setEdges: t.setEdges,
  setMinZoom: t.setMinZoom,
  setMaxZoom: t.setMaxZoom,
  setTranslateExtent: t.setTranslateExtent,
  setNodeExtent: t.setNodeExtent,
  reset: t.reset,
  setDefaultNodesAndEdges: t.setDefaultNodesAndEdges
}), Iy = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: xo,
  nodeOrigin: E1,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function lR(t) {
  const { setNodes: a, setEdges: l, setMinZoom: o, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: f, reset: h, setDefaultNodesAndEdges: p } = Pe(iR, St), g = wt();
  M.useEffect(() => (p(t.defaultNodes, t.defaultEdges), () => {
    y.current = Iy, h();
  }), []);
  const y = M.useRef(Iy);
  return M.useEffect(
    () => {
      for (const m of Ky) {
        const v = t[m], x = y.current[m];
        v !== x && (typeof t[m] > "u" || (m === "nodes" ? a(v) : m === "edges" ? l(v) : m === "minZoom" ? o(v) : m === "maxZoom" ? s(v) : m === "translateExtent" ? u(v) : m === "nodeExtent" ? f(v) : m === "ariaLabelConfig" ? g.setState({ ariaLabelConfig: VT(v) }) : m === "fitView" ? g.setState({ fitViewQueued: v }) : m === "fitViewOptions" ? g.setState({ fitViewOptions: v }) : g.setState({ [m]: v })));
      }
      y.current = t;
    },
    // Only re-run the effect if one of the fields we track changes
    Ky.map((m) => t[m])
  ), null;
}
function Fy() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function rR(t) {
  const [a, l] = M.useState(t === "system" ? null : t);
  return M.useEffect(() => {
    if (t !== "system") {
      l(t);
      return;
    }
    const o = Fy(), s = () => l(o?.matches ? "dark" : "light");
    return s(), o?.addEventListener("change", s), () => {
      o?.removeEventListener("change", s);
    };
  }, [t]), a !== null ? a : Fy()?.matches ? "dark" : "light";
}
const Jy = typeof document < "u" ? document : null;
function _o(t = null, a = { target: Jy, actInsideInputWithModifier: !0 }) {
  const [l, o] = M.useState(!1), s = M.useRef(!1), u = M.useRef(/* @__PURE__ */ new Set([])), [f, h] = M.useMemo(() => {
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
    const p = a?.target ?? Jy, g = a?.actInsideInputWithModifier ?? !0;
    if (t !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !g) && n1(x))
          return !1;
        const C = Wy(x.code, h);
        if (u.current.add(x[C]), Py(f, u.current, !1)) {
          const T = x.composedPath?.()?.[0] || x.target, N = T?.nodeName === "BUTTON" || T?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !N) && x.preventDefault(), o(!0);
        }
      }, m = (x) => {
        const S = Wy(x.code, h);
        Py(f, u.current, !0) ? (o(!1), u.current.clear()) : u.current.delete(x[S]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), o(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", m), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", m), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [t, o]), l;
}
function Py(t, a, l) {
  return t.filter((o) => l || o.length === a.size).some((o) => o.every((s) => a.has(s)));
}
function Wy(t, a) {
  return a.includes(t) ? "code" : "key";
}
const oR = () => {
  const t = wt();
  return M.useMemo(() => ({
    zoomIn: async (a) => {
      const { panZoom: l } = t.getState();
      return l ? l.scaleBy(1.2, a) : !1;
    },
    zoomOut: async (a) => {
      const { panZoom: l } = t.getState();
      return l ? l.scaleBy(1 / 1.2, a) : !1;
    },
    zoomTo: async (a, l) => {
      const { panZoom: o } = t.getState();
      return o ? o.scaleTo(a, l) : !1;
    },
    getZoom: () => t.getState().transform[2],
    setViewport: async (a, l) => {
      const { transform: [o, s, u], panZoom: f } = t.getState();
      return f ? (await f.setViewport({
        x: a.x ?? o,
        y: a.y ?? s,
        zoom: a.zoom ?? u
      }, l), !0) : !1;
    },
    getViewport: () => {
      const [a, l, o] = t.getState().transform;
      return { x: a, y: l, zoom: o };
    },
    setCenter: async (a, l, o) => t.getState().setCenter(a, l, o),
    fitBounds: async (a, l) => {
      const { width: o, height: s, minZoom: u, maxZoom: f, panZoom: h } = t.getState(), p = Th(a, o, s, u, f, l?.padding ?? 0.1);
      return h ? (await h.setViewport(p, {
        duration: l?.duration,
        ease: l?.ease,
        interpolate: l?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (a, l = {}) => {
      const { transform: o, snapGrid: s, snapToGrid: u, domNode: f } = t.getState();
      if (!f)
        return a;
      const { x: h, y: p } = f.getBoundingClientRect(), g = {
        x: a.x - h,
        y: a.y - p
      }, y = l.snapGrid ?? s, m = l.snapToGrid ?? u;
      return jo(g, o, m, y);
    },
    flowToScreenPosition: (a) => {
      const { transform: l, domNode: o } = t.getState();
      if (!o)
        return a;
      const { x: s, y: u } = o.getBoundingClientRect(), f = or(a, l);
      return {
        x: f.x + s,
        y: f.y + u
      };
    }
  }), []);
};
function _1(t, a) {
  const l = [], o = /* @__PURE__ */ new Map(), s = [];
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
      l.push(u);
      continue;
    }
    if (f[0].type === "remove")
      continue;
    if (f[0].type === "replace") {
      l.push({ ...f[0].item });
      continue;
    }
    const h = { ...u };
    for (const p of f)
      sR(p, h);
    l.push(h);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? l.splice(u.index, 0, { ...u.item }) : l.push({ ...u.item });
  }), l;
}
function sR(t, a) {
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
function uR(t, a) {
  return _1(t, a);
}
function cR(t, a) {
  return _1(t, a);
}
function tl(t, a) {
  return {
    id: t,
    type: "select",
    selected: a
  };
}
function Jl(t, a = /* @__PURE__ */ new Set(), l = !1) {
  const o = [];
  for (const [s, u] of t) {
    const f = a.has(s);
    !(u.selected === void 0 && !f) && u.selected !== f && (l && (u.selected = f), o.push(tl(u.id, f)));
  }
  return o;
}
function ev({ items: t = [], lookup: a }) {
  const l = [], o = new Map(t.map((s) => [s.id, s]));
  for (const [s, u] of t.entries()) {
    const f = a.get(u.id), h = f?.internals?.userNode ?? f;
    h !== void 0 && h !== u && l.push({ id: u.id, item: u, type: "replace" }), h === void 0 && l.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    o.get(s) === void 0 && l.push({ id: s, type: "remove" });
  return l;
}
function tv(t) {
  return {
    id: t.id,
    type: "remove"
  };
}
const fR = Pb();
function dR(t, a, l = {}) {
  return QT(t, a, {
    ...l,
    onError: l.onError ?? fR
  });
}
const nv = (t) => zT(t), hR = (t) => Qb(t);
function N1(t) {
  return M.forwardRef(t);
}
const mR = typeof window < "u" ? M.useLayoutEffect : M.useEffect;
function av(t) {
  const [a, l] = M.useState(BigInt(0)), [o] = M.useState(() => gR(() => l((s) => s + BigInt(1))));
  return mR(() => {
    const s = o.get();
    s.length && (t(s), o.reset());
  }, [a]), o;
}
function gR(t) {
  let a = [];
  return {
    get: () => a,
    reset: () => {
      a = [];
    },
    push: (l) => {
      a.push(l), t();
    }
  };
}
const M1 = M.createContext(null);
function pR({ children: t }) {
  const a = wt(), l = M.useCallback((h) => {
    const { nodes: p = [], setNodes: g, hasDefaultNodes: y, onNodesChange: m, nodeLookup: v, fitViewQueued: x, onNodesChangeMiddlewareMap: S } = a.getState();
    let C = p;
    for (const N of h)
      C = typeof N == "function" ? N(C) : N;
    let T = ev({
      items: C,
      lookup: v
    });
    for (const N of S.values())
      T = N(T);
    y && g(C), T.length > 0 ? m?.(T) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: N, nodes: j, setNodes: w } = a.getState();
      N && w(j);
    });
  }, []), o = av(l), s = M.useCallback((h) => {
    const { edges: p = [], setEdges: g, hasDefaultEdges: y, onEdgesChange: m, edgeLookup: v } = a.getState();
    let x = p;
    for (const S of h)
      x = typeof S == "function" ? S(x) : S;
    y ? g(x) : m && m(ev({
      items: x,
      lookup: v
    }));
  }, []), u = av(s), f = M.useMemo(() => ({ nodeQueue: o, edgeQueue: u }), []);
  return R.jsx(M1.Provider, { value: f, children: t });
}
function yR() {
  const t = M.useContext(M1);
  if (!t)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return t;
}
const vR = (t) => !!t.panZoom;
function Lh() {
  const t = oR(), a = wt(), l = yR(), o = Pe(vR), s = M.useMemo(() => {
    const u = (m) => a.getState().nodeLookup.get(m), f = (m) => {
      l.nodeQueue.push(m);
    }, h = (m) => {
      l.edgeQueue.push(m);
    }, p = (m) => {
      const { nodeLookup: v, nodeOrigin: x } = a.getState(), S = nv(m) ? m : v.get(m.id), C = S.parentId ? e1(S.position, S.measured, S.parentId, v, x) : S.position, T = {
        ...S,
        position: C,
        width: S.measured?.width ?? S.width,
        height: S.measured?.height ?? S.height
      };
      return wo(T);
    }, g = (m, v, x = { replace: !1 }) => {
      f((S) => S.map((C) => {
        if (C.id === m) {
          const T = typeof v == "function" ? v(C) : v;
          return x.replace && nv(T) ? T : { ...C, ...T };
        }
        return C;
      }));
    }, y = (m, v, x = { replace: !1 }) => {
      h((S) => S.map((C) => {
        if (C.id === m) {
          const T = typeof v == "function" ? v(C) : v;
          return x.replace && hR(T) ? T : { ...C, ...T };
        }
        return C;
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
        l.nodeQueue.push((x) => [...x, ...v]);
      },
      addEdges: (m) => {
        const v = Array.isArray(m) ? m : [m];
        l.edgeQueue.push((x) => [...x, ...v]);
      },
      toObject: () => {
        const { nodes: m = [], edges: v = [], transform: x } = a.getState(), [S, C, T] = x;
        return {
          nodes: m.map((N) => ({ ...N })),
          edges: v.map((N) => ({ ...N })),
          viewport: {
            x: S,
            y: C,
            zoom: T
          }
        };
      },
      deleteElements: async ({ nodes: m = [], edges: v = [] }) => {
        const { nodes: x, edges: S, onNodesDelete: C, onEdgesDelete: T, triggerNodeChanges: N, triggerEdgeChanges: j, onDelete: w, onBeforeDelete: z } = a.getState(), { nodes: U, edges: H } = await BT({
          nodesToRemove: m,
          edgesToRemove: v,
          nodes: x,
          edges: S,
          onBeforeDelete: z
        }), k = H.length > 0, D = U.length > 0;
        if (k) {
          const Q = H.map(tv);
          T?.(H), j(Q);
        }
        if (D) {
          const Q = U.map(tv);
          C?.(U), N(Q);
        }
        return (D || k) && w?.({ nodes: U, edges: H }), { deletedNodes: U, deletedEdges: H };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (m, v = !0, x) => {
        const S = Ty(m), C = S ? m : p(m), T = x !== void 0;
        return C ? (x || a.getState().nodes).filter((N) => {
          const j = a.getState().nodeLookup.get(N.id);
          if (j && !S && (N.id === m.id || !j.internals.positionAbsolute))
            return !1;
          const w = wo(T ? N : j), z = Ru(w, C);
          return v && z > 0 || z >= w.width * w.height || z >= C.width * C.height;
        }) : [];
      },
      isNodeIntersecting: (m, v, x = !0) => {
        const C = Ty(m) ? m : p(m);
        if (!C)
          return !1;
        const T = Ru(C, v);
        return x && T > 0 || T >= v.width * v.height || T >= C.width * C.height;
      },
      updateNode: g,
      updateNodeData: (m, v, x = { replace: !1 }) => {
        g(m, (S) => {
          const C = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: C } : { ...S, data: { ...S.data, ...C } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (m, v, x = { replace: !1 }) => {
        y(m, (S) => {
          const C = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: C } : { ...S, data: { ...S.data, ...C } };
        }, x);
      },
      getNodesBounds: (m) => {
        const { nodeLookup: v, nodeOrigin: x } = a.getState();
        return OT(m, { nodeLookup: v, nodeOrigin: x });
      },
      getHandleConnections: ({ type: m, id: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${m}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: m, handleId: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${m ? v ? `-${m}-${v}` : `-${m}` : ""}`)?.values() ?? []),
      fitView: async (m) => {
        const v = a.getState().fitViewResolver ?? YT();
        return a.setState({ fitViewQueued: !0, fitViewOptions: m, fitViewResolver: v }), l.nodeQueue.push((x) => [...x]), v.promise;
      }
    };
  }, []);
  return M.useMemo(() => ({
    ...s,
    ...t,
    viewportInitialized: o
  }), [o]);
}
const iv = (t) => t.selected, bR = typeof window < "u" ? window : void 0;
function xR({ deleteKeyCode: t, multiSelectionKeyCode: a }) {
  const l = wt(), { deleteElements: o } = Lh(), s = _o(t, { actInsideInputWithModifier: !1 }), u = _o(a, { target: bR });
  M.useEffect(() => {
    if (s) {
      const { edges: f, nodes: h } = l.getState();
      o({ nodes: h.filter(iv), edges: f.filter(iv) }), l.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), M.useEffect(() => {
    l.setState({ multiSelectionActive: u });
  }, [u]);
}
function SR(t) {
  const a = wt();
  M.useEffect(() => {
    const l = () => {
      if (!t.current || !(t.current.checkVisibility?.() ?? !0))
        return !1;
      const o = Ch(t.current);
      (o.height === 0 || o.width === 0) && a.getState().onError?.("004", ha.error004()), a.setState({ width: o.width || 500, height: o.height || 500 });
    };
    if (t.current) {
      l(), window.addEventListener("resize", l);
      const o = new ResizeObserver(() => l());
      return o.observe(t.current), () => {
        window.removeEventListener("resize", l), o && t.current && o.unobserve(t.current);
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
}, wR = (t) => ({
  userSelectionActive: t.userSelectionActive,
  lib: t.lib,
  connectionInProgress: t.connection.inProgress
});
function ER({ onPaneContextMenu: t, zoomOnScroll: a = !0, zoomOnPinch: l = !0, panOnScroll: o = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = ll.Free, zoomOnDoubleClick: f = !0, panOnDrag: h = !0, defaultViewport: p, translateExtent: g, minZoom: y, maxZoom: m, zoomActivationKeyCode: v, preventScrolling: x = !0, children: S, noWheelClassName: C, noPanClassName: T, onViewportChange: N, isControlledViewport: j, paneClickDistance: w, selectionOnDrag: z }) {
  const U = wt(), H = M.useRef(null), { userSelectionActive: k, lib: D, connectionInProgress: Q } = Pe(wR, St), le = _o(v), K = M.useRef();
  SR(H);
  const J = M.useCallback((oe) => {
    N?.({ x: oe[0], y: oe[1], zoom: oe[2] }), j || U.setState({ transform: oe });
  }, [N, j]);
  return M.useEffect(() => {
    if (H.current) {
      K.current = EC({
        domNode: H.current,
        minZoom: y,
        maxZoom: m,
        translateExtent: g,
        viewport: p,
        onDraggingChange: (_) => U.setState((O) => O.paneDragging === _ ? O : { paneDragging: _ }),
        onPanZoomStart: (_, O) => {
          const { onViewportChangeStart: Z, onMoveStart: G } = U.getState();
          G?.(_, O), Z?.(O);
        },
        onPanZoom: (_, O) => {
          const { onViewportChange: Z, onMove: G } = U.getState();
          G?.(_, O), Z?.(O);
        },
        onPanZoomEnd: (_, O) => {
          const { onViewportChangeEnd: Z, onMoveEnd: G } = U.getState();
          G?.(_, O), Z?.(O);
        }
      });
      const { x: oe, y: L, zoom: X } = K.current.getViewport();
      return U.setState({
        panZoom: K.current,
        transform: [oe, L, X],
        domNode: H.current.closest(".react-flow")
      }), () => {
        K.current?.destroy();
      };
    }
  }, []), M.useEffect(() => {
    K.current?.update({
      onPaneContextMenu: t,
      zoomOnScroll: a,
      zoomOnPinch: l,
      panOnScroll: o,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: f,
      panOnDrag: h,
      zoomActivationKeyPressed: le,
      preventScrolling: x,
      noPanClassName: T,
      userSelectionActive: k,
      noWheelClassName: C,
      lib: D,
      onTransformChange: J,
      connectionInProgress: Q,
      selectionOnDrag: z,
      paneClickDistance: w
    });
  }, [
    t,
    a,
    l,
    o,
    s,
    u,
    f,
    h,
    le,
    x,
    T,
    k,
    C,
    D,
    J,
    Q,
    z,
    w
  ]), R.jsx("div", { className: "react-flow__renderer", ref: H, style: Qu, children: S });
}
const _R = (t) => ({
  userSelectionActive: t.userSelectionActive,
  userSelectionRect: t.userSelectionRect
});
function NR() {
  const { userSelectionActive: t, userSelectionRect: a } = Pe(_R, St);
  return t && a ? R.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const _d = (t, a) => (l) => {
  l.target === a.current && t?.(l);
}, MR = (t) => ({
  userSelectionActive: t.userSelectionActive,
  elementsSelectable: t.elementsSelectable,
  dragging: t.paneDragging,
  panBy: t.panBy,
  autoPanSpeed: t.autoPanSpeed
});
function TR({ isSelecting: t, selectionKeyPressed: a, selectionMode: l = So.Full, panOnDrag: o, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: f, onSelectionStart: h, onSelectionEnd: p, onPaneClick: g, onPaneContextMenu: y, onPaneScroll: m, onPaneMouseEnter: v, onPaneMouseMove: x, onPaneMouseLeave: S, children: C }) {
  const T = M.useRef(0), N = wt(), { userSelectionActive: j, elementsSelectable: w, dragging: z, panBy: U, autoPanSpeed: H } = Pe(MR, St), k = w && (t || j), D = M.useRef(null), Q = M.useRef(), le = M.useRef(/* @__PURE__ */ new Set()), K = M.useRef(/* @__PURE__ */ new Set()), J = M.useRef(!1), oe = M.useRef(!1), L = M.useRef({ x: 0, y: 0 }), X = M.useRef(!1), _ = (W) => {
    if (oe.current || J.current || N.getState().connection.inProgress) {
      oe.current = !1, J.current = !1;
      return;
    }
    g?.(W), N.getState().resetSelectedElements(), N.setState({ nodesSelectionActive: !1 });
  }, O = (W) => {
    if (Array.isArray(o) && o?.includes(2)) {
      W.preventDefault();
      return;
    }
    y?.(W);
  }, Z = m ? (W) => m(W) : void 0, G = (W) => {
    oe.current && (W.stopPropagation(), oe.current = !1);
  }, ae = (W) => {
    const { domNode: pe, transform: ze } = N.getState();
    if (Q.current = pe?.getBoundingClientRect(), !Q.current)
      return;
    const Ae = W.target === D.current;
    if (!Ae && !!W.target.closest(".nokey") || !t || !(f && Ae || a) || W.button !== 0 || !W.isPrimary)
      return;
    W.target?.setPointerCapture?.(W.pointerId), oe.current = !1;
    const { x: De, y: Ge } = da(W.nativeEvent, Q.current), nt = jo({ x: De, y: Ge }, ze);
    N.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: nt.x,
        startY: nt.y,
        x: De,
        y: Ge
      }
    }), Ae || (W.stopPropagation(), W.preventDefault());
  };
  function A(W, pe) {
    const { userSelectionRect: ze } = N.getState();
    if (!ze)
      return;
    const { transform: Ae, nodeLookup: we, edgeLookup: Se, connectionLookup: De, triggerNodeChanges: Ge, triggerEdgeChanges: nt, defaultEdgeOptions: lt } = N.getState(), Ft = { x: ze.startX, y: ze.startY }, { x: pt, y: qt } = or(Ft, Ae), Jt = {
      startX: Ft.x,
      startY: Ft.y,
      x: W < pt ? W : pt,
      y: pe < qt ? pe : qt,
      width: Math.abs(W - pt),
      height: Math.abs(pe - qt)
    }, Et = le.current, Qt = K.current;
    le.current = new Set(Nh(we, Jt, Ae, l === So.Partial, !0).map((_t) => _t.id)), K.current = /* @__PURE__ */ new Set();
    const yt = lt?.selectable ?? !0;
    for (const _t of le.current) {
      const Nt = De.get(_t);
      if (Nt)
        for (const { edgeId: Pt } of Nt.values()) {
          const Gt = Se.get(Pt);
          Gt && (Gt.selectable ?? yt) && K.current.add(Pt);
        }
    }
    if (!Cy(Et, le.current)) {
      const _t = Jl(we, le.current, !0);
      Ge(_t);
    }
    if (!Cy(Qt, K.current)) {
      const _t = Jl(Se, K.current);
      nt(_t);
    }
    N.setState({
      userSelectionRect: Jt,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function V() {
    if (!s || !Q.current)
      return;
    const [W, pe] = Mh(L.current, Q.current, H);
    U({ x: W, y: pe }).then((ze) => {
      if (!oe.current || !ze) {
        T.current = requestAnimationFrame(V);
        return;
      }
      const { x: Ae, y: we } = L.current;
      A(Ae, we), T.current = requestAnimationFrame(V);
    });
  }
  const I = () => {
    cancelAnimationFrame(T.current), T.current = 0, X.current = !1;
  };
  M.useEffect(() => () => I(), []);
  const ne = (W) => {
    const { userSelectionRect: pe, transform: ze, resetSelectedElements: Ae } = N.getState();
    if (!Q.current || !pe)
      return;
    const { x: we, y: Se } = da(W.nativeEvent, Q.current);
    L.current = { x: we, y: Se };
    const De = or({ x: pe.startX, y: pe.startY }, ze);
    if (!oe.current) {
      const Ge = a ? 0 : u;
      if (Math.hypot(we - De.x, Se - De.y) <= Ge)
        return;
      Ae(), h?.(W);
    }
    oe.current = !0, X.current || (V(), X.current = !0), A(we, Se);
  }, se = (W) => {
    if (!k) {
      W.target === D.current && N.getState().connection.inProgress && (J.current = !0);
      return;
    }
    W.button === 0 && (W.target?.releasePointerCapture?.(W.pointerId), !j && W.target === D.current && N.getState().userSelectionRect && _?.(W), N.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), oe.current && (p?.(W), N.setState({
      nodesSelectionActive: le.current.size > 0
    })), I());
  }, me = (W) => {
    W.target?.releasePointerCapture?.(W.pointerId), I();
  }, ge = o === !0 || Array.isArray(o) && o.includes(0);
  return R.jsxs("div", { className: Vt(["react-flow__pane", { draggable: ge, dragging: z, selection: t }]), onClick: k ? void 0 : _d(_, D), onContextMenu: _d(O, D), onWheel: _d(Z, D), onPointerEnter: k ? void 0 : v, onPointerMove: k ? ne : x, onPointerUp: se, onPointerCancel: k ? me : void 0, onPointerDownCapture: k ? ae : void 0, onClickCapture: k ? G : void 0, onPointerLeave: S, ref: D, style: Qu, children: [C, R.jsx(NR, {})] });
}
function Jd({ id: t, store: a, unselect: l = !1, nodeRef: o }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: f, nodeLookup: h, onError: p } = a.getState(), g = h.get(t);
  if (!g) {
    p?.("012", ha.error012(t));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), g.selected ? (l || g.selected && f) && (u({ nodes: [g], edges: [] }), requestAnimationFrame(() => o?.current?.blur())) : s([t]);
}
function T1({ nodeRef: t, disabled: a = !1, noDragClassName: l, handleSelector: o, nodeId: s, isSelectable: u, nodeClickDistance: f }) {
  const h = wt(), [p, g] = M.useState(!1), y = M.useRef();
  return M.useEffect(() => {
    y.current = uC({
      getStoreItems: () => h.getState(),
      onNodeMouseDown: (m) => {
        Jd({
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
        noDragClassName: l,
        handleSelector: o,
        domNode: t.current,
        isSelectable: u,
        nodeId: s,
        nodeClickDistance: f
      }), () => {
        y.current?.destroy();
      };
  }, [l, o, a, u, t, s, f]), p;
}
const CR = (t) => (a) => a.selected && (a.draggable || t && typeof a.draggable > "u");
function C1() {
  const t = wt();
  return M.useCallback((l) => {
    const { nodeExtent: o, snapToGrid: s, snapGrid: u, nodesDraggable: f, onError: h, updateNodePositions: p, nodeLookup: g, nodeOrigin: y } = t.getState(), m = /* @__PURE__ */ new Map(), v = CR(f), x = s ? u[0] : 5, S = s ? u[1] : 5, C = l.direction.x * x * l.factor, T = l.direction.y * S * l.factor;
    for (const [, N] of g) {
      if (!v(N))
        continue;
      let j = {
        x: N.internals.positionAbsolute.x + C,
        y: N.internals.positionAbsolute.y + T
      };
      s && (j = Lo(j, u));
      const { position: w, positionAbsolute: z } = Kb({
        nodeId: N.id,
        nextPosition: j,
        nodeLookup: g,
        nodeExtent: o,
        nodeOrigin: y,
        onError: h
      });
      N.position = w, N.internals.positionAbsolute = z, m.set(N.id, N);
    }
    p(m);
  }, []);
}
const jh = M.createContext(null), RR = jh.Provider;
jh.Consumer;
const R1 = () => M.useContext(jh), AR = (t) => ({
  connectOnClick: t.connectOnClick,
  noPanClassName: t.noPanClassName,
  rfId: t.rfId
}), A1 = M.createContext(null);
function DR({ children: t }) {
  const a = Pe(AR, St);
  return R.jsx(A1.Provider, { value: a, children: t });
}
function zR() {
  const t = M.useContext(A1);
  if (!t)
    throw new Error("useHandleConfig must be used within a HandleConfigProvider");
  return t;
}
const OR = {
  connectingFrom: !1,
  connectingTo: !1,
  clickConnecting: !1,
  isPossibleEndHandle: !0,
  connectionInProcess: !1,
  clickConnectionInProcess: !1,
  valid: !1
}, LR = (t, a, l) => (o) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: f } = o, { fromHandle: h, toHandle: p, isValid: g } = f;
  if (!h && !s)
    return OR;
  const y = p?.nodeId === t && p?.id === a && p?.type === l;
  return {
    connectingFrom: h?.nodeId === t && h?.id === a && h?.type === l,
    connectingTo: y,
    clickConnecting: s?.nodeId === t && s?.id === a && s?.type === l,
    isPossibleEndHandle: u === lr.Strict ? h?.type !== l : t !== h?.nodeId || a !== h?.id,
    connectionInProcess: !!h,
    clickConnectionInProcess: !!s,
    valid: y && g
  };
};
function jR({ type: t = "source", position: a = Ce.Top, isValidConnection: l, isConnectable: o = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: f, onConnect: h, children: p, className: g, onMouseDown: y, onTouchStart: m, ...v }, x) {
  const S = f || null, C = t === "target", T = wt(), N = R1(), { connectOnClick: j, noPanClassName: w, rfId: z } = zR(), { connectingFrom: U, connectingTo: H, clickConnecting: k, isPossibleEndHandle: D, connectionInProcess: Q, clickConnectionInProcess: le, valid: K } = Pe(LR(N, S, t), St);
  N || T.getState().onError?.("010", ha.error010());
  const J = (X) => {
    const { defaultEdgeOptions: _, onConnect: O, hasDefaultEdges: Z } = T.getState(), G = {
      ..._,
      ...X
    };
    if (Z) {
      const { edges: ae, setEdges: A, onError: V } = T.getState();
      A(dR(G, ae, { onError: V }));
    }
    O?.(G), h?.(G);
  }, oe = (X) => {
    if (!N)
      return;
    const _ = a1(X.nativeEvent);
    if (s && (_ && X.button === 0 || !_)) {
      const O = T.getState();
      Fd.onPointerDown(X.nativeEvent, {
        handleDomNode: X.currentTarget,
        autoPanOnConnect: O.autoPanOnConnect,
        connectionMode: O.connectionMode,
        connectionRadius: O.connectionRadius,
        domNode: O.domNode,
        nodeLookup: O.nodeLookup,
        lib: O.lib,
        isTarget: C,
        handleId: S,
        nodeId: N,
        flowId: O.rfId,
        panBy: O.panBy,
        cancelConnection: O.cancelConnection,
        onConnectStart: O.onConnectStart,
        onConnectEnd: (...Z) => T.getState().onConnectEnd?.(...Z),
        updateConnection: O.updateConnection,
        onConnect: J,
        isValidConnection: l || ((...Z) => T.getState().isValidConnection?.(...Z) ?? !0),
        getTransform: () => T.getState().transform,
        getFromHandle: () => T.getState().connection.fromHandle,
        autoPanSpeed: O.autoPanSpeed,
        dragThreshold: O.connectionDragThreshold
      });
    }
    _ ? y?.(X) : m?.(X);
  }, L = (X) => {
    const { onClickConnectStart: _, onClickConnectEnd: O, connectionClickStartHandle: Z, connectionMode: G, isValidConnection: ae, lib: A, rfId: V, nodeLookup: I, connection: ne } = T.getState();
    if (!N || !Z && !s)
      return;
    if (!Z) {
      _?.(X.nativeEvent, { nodeId: N, handleId: S, handleType: t }), T.setState({ connectionClickStartHandle: { nodeId: N, type: t, id: S } });
      return;
    }
    const se = t1(X.target), me = l || ae, { connection: ge, isValid: W } = Fd.isValid(X.nativeEvent, {
      handle: {
        nodeId: N,
        id: S,
        type: t
      },
      connectionMode: G,
      fromNodeId: Z.nodeId,
      fromHandleId: Z.id || null,
      fromType: Z.type,
      isValidConnection: me,
      flowId: V,
      doc: se,
      lib: A,
      nodeLookup: I
    });
    W && ge && J(ge);
    const pe = structuredClone(ne);
    delete pe.inProgress, pe.toPosition = pe.toHandle ? pe.toHandle.position : null, O?.(X, pe), T.setState({ connectionClickStartHandle: null });
  };
  return R.jsx("div", { "data-handleid": S, "data-nodeid": N, "data-handlepos": a, "data-id": `${z}-${N}-${S}-${t}`, className: Vt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    w,
    g,
    {
      source: !C,
      target: C,
      connectable: o,
      connectablestart: s,
      connectableend: u,
      clickconnecting: k,
      connectingfrom: U,
      connectingto: H,
      valid: K,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: o && (!Q || D) && (Q || le ? u : s)
    }
  ]), onMouseDown: oe, onTouchStart: oe, onClick: j ? L : void 0, ref: x, ...v, children: p });
}
const ur = M.memo(N1(jR));
function HR({ data: t, isConnectable: a, sourcePosition: l = Ce.Bottom }) {
  return R.jsxs(R.Fragment, { children: [t?.label, R.jsx(ur, { type: "source", position: l, isConnectable: a })] });
}
function BR({ data: t, isConnectable: a, targetPosition: l = Ce.Top, sourcePosition: o = Ce.Bottom }) {
  return R.jsxs(R.Fragment, { children: [R.jsx(ur, { type: "target", position: l, isConnectable: a }), t?.label, R.jsx(ur, { type: "source", position: o, isConnectable: a })] });
}
function UR() {
  return null;
}
function kR({ data: t, isConnectable: a, targetPosition: l = Ce.Top }) {
  return R.jsxs(R.Fragment, { children: [R.jsx(ur, { type: "target", position: l, isConnectable: a }), t?.label] });
}
const Au = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, lv = {
  input: HR,
  default: BR,
  output: kR,
  group: UR
};
function YR(t) {
  return t.internals.handleBounds === void 0 ? {
    width: t.width ?? t.initialWidth ?? t.style?.width,
    height: t.height ?? t.initialHeight ?? t.style?.height
  } : {
    width: t.width ?? t.style?.width,
    height: t.height ?? t.style?.height
  };
}
const VR = (t) => {
  const { width: a, height: l, x: o, y: s } = Oo(t.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: fa(a) ? a : null,
    height: fa(l) ? l : null,
    userSelectionActive: t.userSelectionActive,
    transformString: `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]}) translate(${o}px,${s}px)`
  };
};
function qR({ onSelectionContextMenu: t, noPanClassName: a, disableKeyboardA11y: l }) {
  const o = wt(), { width: s, height: u, transformString: f, userSelectionActive: h } = Pe(VR, St), p = C1(), g = M.useRef(null);
  M.useEffect(() => {
    l || g.current?.focus({
      preventScroll: !0
    });
  }, [l]);
  const y = !h && s !== null && u !== null;
  if (T1({
    nodeRef: g,
    disabled: !y
  }), !y)
    return null;
  const m = t ? (x) => {
    const S = o.getState().nodes.filter((C) => C.selected);
    t(x, S);
  } : void 0, v = (x) => {
    Object.prototype.hasOwnProperty.call(Au, x.key) && (x.preventDefault(), p({
      direction: Au[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return R.jsx("div", { className: Vt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: f
  }, children: R.jsx("div", { ref: g, className: "react-flow__nodesselection-rect", onContextMenu: m, tabIndex: l ? void 0 : -1, onKeyDown: l ? void 0 : v, style: {
    width: s,
    height: u
  } }) });
}
const rv = typeof window < "u" ? window : void 0, GR = (t) => ({ nodesSelectionActive: t.nodesSelectionActive, userSelectionActive: t.userSelectionActive });
function D1({ children: t, onPaneClick: a, onPaneMouseEnter: l, onPaneMouseMove: o, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: f, paneClickDistance: h, deleteKeyCode: p, selectionKeyCode: g, selectionOnDrag: y, selectionMode: m, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: S, panActivationKeyCode: C, zoomActivationKeyCode: T, elementsSelectable: N, zoomOnScroll: j, zoomOnPinch: w, panOnScroll: z, panOnScrollSpeed: U, panOnScrollMode: H, zoomOnDoubleClick: k, panOnDrag: D, autoPanOnSelection: Q, defaultViewport: le, translateExtent: K, minZoom: J, maxZoom: oe, preventScrolling: L, onSelectionContextMenu: X, noWheelClassName: _, noPanClassName: O, disableKeyboardA11y: Z, onViewportChange: G, isControlledViewport: ae }) {
  const { nodesSelectionActive: A, userSelectionActive: V } = Pe(GR, St), I = _o(g, { target: rv }), ne = _o(C, { target: rv }), se = ne || D, me = ne || z, ge = y && se !== !0, W = I || V || ge;
  return xR({ deleteKeyCode: p, multiSelectionKeyCode: S }), R.jsx(ER, { onPaneContextMenu: u, elementsSelectable: N, zoomOnScroll: j, zoomOnPinch: w, panOnScroll: me, panOnScrollSpeed: U, panOnScrollMode: H, zoomOnDoubleClick: k, panOnDrag: !I && se, defaultViewport: le, translateExtent: K, minZoom: J, maxZoom: oe, zoomActivationKeyCode: T, preventScrolling: L, noWheelClassName: _, noPanClassName: O, onViewportChange: G, isControlledViewport: ae, paneClickDistance: h, selectionOnDrag: ge, children: R.jsxs(TR, { onSelectionStart: v, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: l, onPaneMouseMove: o, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: f, panOnDrag: se, autoPanOnSelection: Q, isSelecting: !!W, selectionMode: m, selectionKeyPressed: I, paneClickDistance: h, selectionOnDrag: ge, children: [t, A && R.jsx(qR, { onSelectionContextMenu: X, noPanClassName: O, disableKeyboardA11y: Z })] }) });
}
D1.displayName = "FlowRenderer";
const XR = M.memo(D1), $R = (t) => (a) => t ? Nh(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((l) => l.id) : Array.from(a.nodeLookup.keys());
function ZR(t) {
  return Pe(M.useCallback($R(t), [t]), St);
}
const QR = (t) => t.updateNodeInternals;
function KR() {
  const t = Pe(QR), [a] = M.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((l) => {
    const o = /* @__PURE__ */ new Map();
    l.forEach((s) => {
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
function IR({ node: t, nodeType: a, hasDimensions: l, resizeObserver: o }) {
  const s = wt(), u = M.useRef(null), f = M.useRef(null), h = M.useRef(t.sourcePosition), p = M.useRef(t.targetPosition), g = M.useRef(a), y = l && !!t.internals.handleBounds;
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
function FR({ id: t, onClick: a, onMouseEnter: l, onMouseMove: o, onMouseLeave: s, onContextMenu: u, onDoubleClick: f, nodesDraggable: h, elementsSelectable: p, nodesConnectable: g, nodesFocusable: y, resizeObserver: m, noDragClassName: v, noPanClassName: x, disableKeyboardA11y: S, rfId: C, nodeTypes: T, nodeClickDistance: N, onError: j }) {
  const { node: w, internals: z, isParent: U } = Pe((W) => {
    const pe = W.nodeLookup.get(t), ze = W.parentLookup.has(t);
    return {
      node: pe,
      internals: pe.internals,
      isParent: ze
    };
  }, St);
  let H = w.type || "default", k = T?.[H] || lv[H];
  k === void 0 && (j?.("003", ha.error003(H)), H = "default", k = T?.default || lv.default);
  const D = !!(w.draggable || h && typeof w.draggable > "u"), Q = !!(w.selectable || p && typeof w.selectable > "u"), le = !!(w.connectable || g && typeof w.connectable > "u"), K = !!(w.focusable || y && typeof w.focusable > "u"), J = wt(), oe = Wb(w), L = IR({ node: w, nodeType: H, hasDimensions: oe, resizeObserver: m }), X = T1({
    nodeRef: L,
    disabled: w.hidden || !D,
    noDragClassName: v,
    handleSelector: w.dragHandle,
    nodeId: t,
    isSelectable: Q,
    nodeClickDistance: N
  }), _ = C1();
  if (w.hidden)
    return null;
  const O = ei(w), Z = YR(w), G = Q || D || a || l || o || s, ae = l ? (W) => l(W, { ...z.userNode }) : void 0, A = o ? (W) => o(W, { ...z.userNode }) : void 0, V = s ? (W) => s(W, { ...z.userNode }) : void 0, I = u ? (W) => u(W, { ...z.userNode }) : void 0, ne = f ? (W) => f(W, { ...z.userNode }) : void 0, se = (W) => {
    const { selectNodesOnDrag: pe, nodeDragThreshold: ze } = J.getState();
    Q && (!pe || !D || ze > 0) && Jd({
      id: t,
      store: J,
      nodeRef: L
    }), a && a(W, { ...z.userNode });
  }, me = (W) => {
    if (!(n1(W.nativeEvent) || S)) {
      if (Gb.includes(W.key) && Q) {
        const pe = W.key === "Escape";
        Jd({
          id: t,
          store: J,
          unselect: pe,
          nodeRef: L
        });
      } else if (D && w.selected && Object.prototype.hasOwnProperty.call(Au, W.key)) {
        W.preventDefault();
        const { ariaLabelConfig: pe } = J.getState();
        J.setState({
          ariaLiveMessage: pe["node.a11yDescription.ariaLiveMessage"]({
            direction: W.key.replace("Arrow", "").toLowerCase(),
            x: ~~z.positionAbsolute.x,
            y: ~~z.positionAbsolute.y
          })
        }), _({
          direction: Au[W.key],
          factor: W.shiftKey ? 4 : 1
        });
      }
    }
  }, ge = () => {
    if (S || !L.current?.matches(":focus-visible"))
      return;
    const { transform: W, width: pe, height: ze, autoPanOnNodeFocus: Ae, setCenter: we } = J.getState();
    if (!Ae)
      return;
    Nh(/* @__PURE__ */ new Map([[t, w]]), { x: 0, y: 0, width: pe, height: ze }, W, !0).length > 0 || we(w.position.x + O.width / 2, w.position.y + O.height / 2, {
      zoom: W[2]
    });
  };
  return R.jsx("div", { className: Vt([
    "react-flow__node",
    `react-flow__node-${H}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: D
    },
    w.className,
    {
      selected: w.selected,
      selectable: Q,
      parent: U,
      draggable: D,
      dragging: X
    }
  ]), ref: L, style: {
    zIndex: z.z,
    transform: `translate(${z.positionAbsolute.x}px,${z.positionAbsolute.y}px)`,
    pointerEvents: G ? "all" : "none",
    visibility: oe ? "visible" : "hidden",
    ...w.style,
    ...Z
  }, "data-id": t, "data-testid": `rf__node-${t}`, onMouseEnter: ae, onMouseMove: A, onMouseLeave: V, onContextMenu: I, onClick: se, onDoubleClick: ne, onKeyDown: K ? me : void 0, tabIndex: K ? 0 : void 0, onFocus: K ? ge : void 0, role: w.ariaRole ?? (K ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${S1}-${C}`, "aria-label": w.ariaLabel, ...w.domAttributes, children: R.jsx(RR, { value: t, children: R.jsx(k, { id: t, data: w.data, type: H, positionAbsoluteX: z.positionAbsolute.x, positionAbsoluteY: z.positionAbsolute.y, selected: w.selected ?? !1, selectable: Q, draggable: D, deletable: w.deletable ?? !0, isConnectable: le, sourcePosition: w.sourcePosition, targetPosition: w.targetPosition, dragging: X, dragHandle: w.dragHandle, zIndex: z.z, parentId: w.parentId, ...O }) }) });
}
var JR = M.memo(FR);
const PR = (t) => ({
  nodesDraggable: t.nodesDraggable,
  nodesConnectable: t.nodesConnectable,
  nodesFocusable: t.nodesFocusable,
  elementsSelectable: t.elementsSelectable,
  onError: t.onError
});
function z1(t) {
  const { nodesDraggable: a, nodesConnectable: l, nodesFocusable: o, elementsSelectable: s, onError: u } = Pe(PR, St), f = ZR(t.onlyRenderVisibleElements), h = KR();
  return R.jsx("div", { className: "react-flow__nodes", style: Qu, children: f.map((p) => (
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
    R.jsx(JR, { id: p, nodeTypes: t.nodeTypes, nodeExtent: t.nodeExtent, onClick: t.onNodeClick, onMouseEnter: t.onNodeMouseEnter, onMouseMove: t.onNodeMouseMove, onMouseLeave: t.onNodeMouseLeave, onContextMenu: t.onNodeContextMenu, onDoubleClick: t.onNodeDoubleClick, noDragClassName: t.noDragClassName, noPanClassName: t.noPanClassName, rfId: t.rfId, disableKeyboardA11y: t.disableKeyboardA11y, resizeObserver: h, nodesDraggable: a, nodesConnectable: l, nodesFocusable: o, elementsSelectable: s, nodeClickDistance: t.nodeClickDistance, onError: u }, p)
  )) });
}
z1.displayName = "NodeRenderer";
const WR = M.memo(z1);
function e3(t) {
  return Pe(M.useCallback((l) => {
    if (!t)
      return l.edges.map((s) => s.id);
    const o = [];
    if (l.width && l.height)
      for (const s of l.edges) {
        const u = l.nodeLookup.get(s.source), f = l.nodeLookup.get(s.target);
        u && f && XT({
          sourceNode: u,
          targetNode: f,
          width: l.width,
          height: l.height,
          transform: l.transform
        }) && o.push(s.id);
      }
    return o;
  }, [t]), St);
}
const t3 = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const l = {
    strokeWidth: a,
    ...t && { stroke: t }
  };
  return R.jsx("polyline", { className: "arrow", style: l, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, n3 = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const l = {
    strokeWidth: a,
    ...t && { stroke: t, fill: t }
  };
  return R.jsx("polyline", { className: "arrowclosed", style: l, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, ov = {
  [Tu.Arrow]: t3,
  [Tu.ArrowClosed]: n3
};
function a3(t) {
  const a = wt();
  return M.useMemo(() => Object.prototype.hasOwnProperty.call(ov, t) ? ov[t] : (a.getState().onError?.("009", ha.error009(t)), null), [t]);
}
const i3 = ({ id: t, type: a, color: l, width: o = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: f, orient: h = "auto-start-reverse" }) => {
  const p = a3(a);
  return p ? R.jsx("marker", { className: "react-flow__arrowhead", id: t, markerWidth: `${o}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: h, refX: "0", refY: "0", children: R.jsx(p, { color: l, strokeWidth: f }) }) : null;
}, O1 = ({ defaultColor: t, rfId: a }) => {
  const l = Pe((u) => u.edges), o = Pe((u) => u.defaultEdgeOptions), s = M.useMemo(() => PT(l, {
    id: a,
    defaultColor: t,
    defaultMarkerStart: o?.markerStart,
    defaultMarkerEnd: o?.markerEnd
  }), [l, o, a, t]);
  return s.length ? R.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: R.jsx("defs", { children: s.map((u) => R.jsx(i3, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
O1.displayName = "MarkerDefinitions";
var l3 = M.memo(O1);
function L1({ x: t, y: a, label: l, labelStyle: o, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: f = [2, 4], labelBgBorderRadius: h = 2, children: p, className: g, ...y }) {
  const [m, v] = M.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Vt(["react-flow__edge-textwrapper", g]), S = M.useRef(null);
  return M.useEffect(() => {
    if (S.current) {
      const C = S.current.getBBox();
      v({
        x: C.x,
        y: C.y,
        width: C.width,
        height: C.height
      });
    }
  }, [l]), l ? R.jsxs("g", { transform: `translate(${t - m.width / 2} ${a - m.height / 2})`, className: x, visibility: m.width ? "visible" : "hidden", ...y, children: [s && R.jsx("rect", { width: m.width + 2 * f[0], x: -f[0], y: -f[1], height: m.height + 2 * f[1], className: "react-flow__edge-textbg", style: u, rx: h, ry: h }), R.jsx("text", { className: "react-flow__edge-text", y: m.height / 2, dy: "0.3em", ref: S, style: o, children: l }), p] }) : null;
}
L1.displayName = "EdgeText";
const r3 = M.memo(L1);
function Ku({ path: t, labelX: a, labelY: l, label: o, labelStyle: s, labelShowBg: u, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, interactionWidth: g = 20, ...y }) {
  return R.jsxs(R.Fragment, { children: [R.jsx("path", { ...y, d: t, fill: "none", className: Vt(["react-flow__edge-path", y.className]) }), g ? R.jsx("path", { d: t, fill: "none", strokeOpacity: 0, strokeWidth: g, className: "react-flow__edge-interaction" }) : null, o && fa(a) && fa(l) ? R.jsx(r3, { x: a, y: l, label: o, labelStyle: s, labelShowBg: u, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p }) : null] });
}
function sv({ pos: t, x1: a, y1: l, x2: o, y2: s }) {
  return t === Ce.Left || t === Ce.Right ? [0.5 * (a + o), l] : [a, 0.5 * (l + s)];
}
function j1({ sourceX: t, sourceY: a, sourcePosition: l = Ce.Bottom, targetX: o, targetY: s, targetPosition: u = Ce.Top }) {
  const [f, h] = sv({
    pos: l,
    x1: t,
    y1: a,
    x2: o,
    y2: s
  }), [p, g] = sv({
    pos: u,
    x1: o,
    y1: s,
    x2: t,
    y2: a
  }), [y, m, v, x] = i1({
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
function H1(t) {
  return M.memo(({ id: a, sourceX: l, sourceY: o, targetX: s, targetY: u, sourcePosition: f, targetPosition: h, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: T, interactionWidth: N }) => {
    const [j, w, z] = j1({
      sourceX: l,
      sourceY: o,
      sourcePosition: f,
      targetX: s,
      targetY: u,
      targetPosition: h
    }), U = t.isInternal ? void 0 : a;
    return R.jsx(Ku, { id: U, path: j, labelX: w, labelY: z, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: T, interactionWidth: N });
  });
}
const o3 = H1({ isInternal: !1 }), B1 = H1({ isInternal: !0 });
o3.displayName = "SimpleBezierEdge";
B1.displayName = "SimpleBezierEdgeInternal";
function U1(t) {
  return M.memo(({ id: a, sourceX: l, sourceY: o, targetX: s, targetY: u, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, sourcePosition: x = Ce.Bottom, targetPosition: S = Ce.Top, markerEnd: C, markerStart: T, pathOptions: N, interactionWidth: j }) => {
    const [w, z, U] = Qd({
      sourceX: l,
      sourceY: o,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: S,
      borderRadius: N?.borderRadius,
      offset: N?.offset,
      stepPosition: N?.stepPosition
    }), H = t.isInternal ? void 0 : a;
    return R.jsx(Ku, { id: H, path: w, labelX: z, labelY: U, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: C, markerStart: T, interactionWidth: j });
  });
}
const k1 = U1({ isInternal: !1 }), Y1 = U1({ isInternal: !0 });
k1.displayName = "SmoothStepEdge";
Y1.displayName = "SmoothStepEdgeInternal";
function V1(t) {
  return M.memo(({ id: a, ...l }) => {
    const o = t.isInternal ? void 0 : a;
    return R.jsx(k1, { ...l, id: o, pathOptions: M.useMemo(() => ({ borderRadius: 0, offset: l.pathOptions?.offset }), [l.pathOptions?.offset]) });
  });
}
const s3 = V1({ isInternal: !1 }), q1 = V1({ isInternal: !0 });
s3.displayName = "StepEdge";
q1.displayName = "StepEdgeInternal";
function G1(t) {
  return M.memo(({ id: a, sourceX: l, sourceY: o, targetX: s, targetY: u, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: C }) => {
    const [T, N, j] = o1({ sourceX: l, sourceY: o, targetX: s, targetY: u }), w = t.isInternal ? void 0 : a;
    return R.jsx(Ku, { id: w, path: T, labelX: N, labelY: j, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: C });
  });
}
const u3 = G1({ isInternal: !1 }), X1 = G1({ isInternal: !0 });
u3.displayName = "StraightEdge";
X1.displayName = "StraightEdgeInternal";
function $1(t) {
  return M.memo(({ id: a, sourceX: l, sourceY: o, targetX: s, targetY: u, sourcePosition: f = Ce.Bottom, targetPosition: h = Ce.Top, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: T, pathOptions: N, interactionWidth: j }) => {
    const [w, z, U] = l1({
      sourceX: l,
      sourceY: o,
      sourcePosition: f,
      targetX: s,
      targetY: u,
      targetPosition: h,
      curvature: N?.curvature
    }), H = t.isInternal ? void 0 : a;
    return R.jsx(Ku, { id: H, path: w, labelX: z, labelY: U, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: T, interactionWidth: j });
  });
}
const c3 = $1({ isInternal: !1 }), Z1 = $1({ isInternal: !0 });
c3.displayName = "BezierEdge";
Z1.displayName = "BezierEdgeInternal";
const uv = {
  default: Z1,
  straight: X1,
  step: q1,
  smoothstep: Y1,
  simplebezier: B1
}, cv = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null,
  zIndex: void 0
}, f3 = (t, a, l) => l === Ce.Left ? t - a : l === Ce.Right ? t + a : t, d3 = (t, a, l) => l === Ce.Top ? t - a : l === Ce.Bottom ? t + a : t, fv = "react-flow__edgeupdater";
function dv({ position: t, centerX: a, centerY: l, radius: o = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: f, type: h }) {
  return R.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: f, className: Vt([fv, `${fv}-${h}`]), cx: f3(a, o, t), cy: d3(l, o, t), r: o, stroke: "transparent", fill: "transparent" });
}
function h3({ isReconnectable: t, reconnectRadius: a, edge: l, sourceX: o, sourceY: s, targetX: u, targetY: f, sourcePosition: h, targetPosition: p, onReconnect: g, onReconnectStart: y, onReconnectEnd: m, setReconnecting: v, setUpdateHover: x }) {
  const S = wt(), C = (z, U) => {
    if (z.button !== 0)
      return;
    const { autoPanOnConnect: H, domNode: k, connectionMode: D, connectionRadius: Q, lib: le, onConnectStart: K, cancelConnection: J, nodeLookup: oe, rfId: L, panBy: X, updateConnection: _ } = S.getState(), O = U.type === "target", Z = (A, V) => {
      v(!1), m?.(A, l, U.type, V);
    }, G = (A) => g?.(l, A), ae = (A, V) => {
      v(!0), y?.(z, l, U.type), K?.(A, V);
    };
    Fd.onPointerDown(z.nativeEvent, {
      autoPanOnConnect: H,
      connectionMode: D,
      connectionRadius: Q,
      domNode: k,
      handleId: U.id,
      nodeId: U.nodeId,
      nodeLookup: oe,
      isTarget: O,
      edgeUpdaterType: U.type,
      lib: le,
      flowId: L,
      cancelConnection: J,
      panBy: X,
      isValidConnection: (...A) => S.getState().isValidConnection?.(...A) ?? !0,
      onConnect: G,
      onConnectStart: ae,
      onConnectEnd: (...A) => S.getState().onConnectEnd?.(...A),
      onReconnectEnd: Z,
      updateConnection: _,
      getTransform: () => S.getState().transform,
      getFromHandle: () => S.getState().connection.fromHandle,
      dragThreshold: S.getState().connectionDragThreshold,
      handleDomNode: z.currentTarget
    });
  }, T = (z) => C(z, { nodeId: l.target, id: l.targetHandle ?? null, type: "target" }), N = (z) => C(z, { nodeId: l.source, id: l.sourceHandle ?? null, type: "source" }), j = () => x(!0), w = () => x(!1);
  return R.jsxs(R.Fragment, { children: [(t === !0 || t === "source") && R.jsx(dv, { position: h, centerX: o, centerY: s, radius: a, onMouseDown: T, onMouseEnter: j, onMouseOut: w, type: "source" }), (t === !0 || t === "target") && R.jsx(dv, { position: p, centerX: u, centerY: f, radius: a, onMouseDown: N, onMouseEnter: j, onMouseOut: w, type: "target" })] });
}
function m3({ id: t, edgesFocusable: a, edgesReconnectable: l, elementsSelectable: o, onClick: s, onDoubleClick: u, onContextMenu: f, onMouseEnter: h, onMouseMove: p, onMouseLeave: g, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, rfId: S, edgeTypes: C, noPanClassName: T, onError: N, disableKeyboardA11y: j }) {
  let w = Pe((we) => we.edgeLookup.get(t));
  const z = Pe((we) => we.defaultEdgeOptions);
  w = z ? { ...z, ...w } : w;
  let U = w.type || "default", H = C?.[U] || uv[U];
  H === void 0 && (N?.("011", ha.error011(U)), U = "default", H = C?.default || uv.default);
  const k = !!(w.focusable || a && typeof w.focusable > "u"), D = typeof m < "u" && (w.reconnectable || l && typeof w.reconnectable > "u"), Q = !!(w.selectable || o && typeof w.selectable > "u"), le = M.useRef(null), [K, J] = M.useState(!1), [oe, L] = M.useState(!1), X = wt(), { zIndex: _ = w.zIndex, sourceX: O, sourceY: Z, targetX: G, targetY: ae, sourcePosition: A, targetPosition: V } = Pe(M.useCallback((we) => {
    const Se = we.nodeLookup.get(w.source), De = we.nodeLookup.get(w.target);
    if (!Se || !De)
      return cv;
    const Ge = JT({
      id: t,
      sourceNode: Se,
      targetNode: De,
      sourceHandle: w.sourceHandle || null,
      targetHandle: w.targetHandle || null,
      connectionMode: we.connectionMode,
      onError: N
    }), nt = GT({
      selected: w.selected,
      zIndex: w.zIndex,
      sourceNode: Se,
      targetNode: De,
      elevateOnSelect: we.elevateEdgesOnSelect,
      zIndexMode: we.zIndexMode
    });
    return {
      ...Ge || cv,
      zIndex: nt
    };
  }, [w.source, w.target, w.sourceHandle, w.targetHandle, w.selected, w.zIndex]), St), I = M.useMemo(() => w.markerStart ? `url('#${Kd(w.markerStart, S)}')` : void 0, [w.markerStart, S]), ne = M.useMemo(() => w.markerEnd ? `url('#${Kd(w.markerEnd, S)}')` : void 0, [w.markerEnd, S]);
  if (w.hidden || O === null || Z === null || G === null || ae === null)
    return null;
  const se = (we) => {
    const { addSelectedEdges: Se, unselectNodesAndEdges: De, multiSelectionActive: Ge } = X.getState();
    Q && (X.setState({ nodesSelectionActive: !1 }), w.selected && Ge ? (De({ nodes: [], edges: [w] }), le.current?.blur()) : Se([t])), s && s(we, w);
  }, me = u ? (we) => {
    u(we, { ...w });
  } : void 0, ge = f ? (we) => {
    f(we, { ...w });
  } : void 0, W = h ? (we) => {
    h(we, { ...w });
  } : void 0, pe = p ? (we) => {
    p(we, { ...w });
  } : void 0, ze = g ? (we) => {
    g(we, { ...w });
  } : void 0, Ae = (we) => {
    if (!j && Gb.includes(we.key) && Q) {
      const { unselectNodesAndEdges: Se, addSelectedEdges: De } = X.getState();
      we.key === "Escape" ? (le.current?.blur(), Se({ edges: [w] })) : De([t]);
    }
  };
  return R.jsx("svg", { style: { zIndex: _ }, children: R.jsxs("g", { className: Vt([
    "react-flow__edge",
    `react-flow__edge-${U}`,
    w.className,
    T,
    {
      selected: w.selected,
      animated: w.animated,
      inactive: !Q && !s,
      updating: K,
      selectable: Q
    }
  ]), onClick: se, onDoubleClick: me, onContextMenu: ge, onMouseEnter: W, onMouseMove: pe, onMouseLeave: ze, onKeyDown: k ? Ae : void 0, tabIndex: k ? 0 : void 0, role: w.ariaRole ?? (k ? "group" : "img"), "aria-roledescription": "edge", "data-id": t, "data-testid": `rf__edge-${t}`, "aria-label": w.ariaLabel === null ? void 0 : w.ariaLabel || `Edge from ${w.source} to ${w.target}`, "aria-describedby": k ? `${w1}-${S}` : void 0, ref: le, ...w.domAttributes, children: [!oe && R.jsx(H, { id: t, source: w.source, target: w.target, type: w.type, selected: w.selected, animated: w.animated, selectable: Q, deletable: w.deletable ?? !0, label: w.label, labelStyle: w.labelStyle, labelShowBg: w.labelShowBg, labelBgStyle: w.labelBgStyle, labelBgPadding: w.labelBgPadding, labelBgBorderRadius: w.labelBgBorderRadius, sourceX: O, sourceY: Z, targetX: G, targetY: ae, sourcePosition: A, targetPosition: V, data: w.data, style: w.style, sourceHandleId: w.sourceHandle, targetHandleId: w.targetHandle, markerStart: I, markerEnd: ne, pathOptions: "pathOptions" in w ? w.pathOptions : void 0, interactionWidth: w.interactionWidth }), D && R.jsx(h3, { edge: w, isReconnectable: D, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, sourceX: O, sourceY: Z, targetX: G, targetY: ae, sourcePosition: A, targetPosition: V, setUpdateHover: J, setReconnecting: L })] }) });
}
var g3 = M.memo(m3);
const p3 = (t) => ({
  edgesFocusable: t.edgesFocusable,
  edgesReconnectable: t.edgesReconnectable,
  elementsSelectable: t.elementsSelectable,
  connectionMode: t.connectionMode,
  onError: t.onError
});
function Q1({ defaultMarkerColor: t, onlyRenderVisibleElements: a, rfId: l, edgeTypes: o, noPanClassName: s, onReconnect: u, onEdgeContextMenu: f, onEdgeMouseEnter: h, onEdgeMouseMove: p, onEdgeMouseLeave: g, onEdgeClick: y, reconnectRadius: m, onEdgeDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, disableKeyboardA11y: C }) {
  const { edgesFocusable: T, edgesReconnectable: N, elementsSelectable: j, onError: w } = Pe(p3, St), z = e3(a);
  return R.jsxs("div", { className: "react-flow__edges", children: [R.jsx(l3, { defaultColor: t, rfId: l }), z.map((U) => R.jsx(g3, { id: U, edgesFocusable: T, edgesReconnectable: N, elementsSelectable: j, noPanClassName: s, onReconnect: u, onContextMenu: f, onMouseEnter: h, onMouseMove: p, onMouseLeave: g, onClick: y, reconnectRadius: m, onDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, rfId: l, onError: w, edgeTypes: o, disableKeyboardA11y: C }, U))] });
}
Q1.displayName = "EdgeRenderer";
const y3 = M.memo(Q1), v3 = (t) => `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]})`;
function b3({ children: t }) {
  const a = Pe(v3);
  return R.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: t });
}
function x3(t) {
  const a = Lh(), l = M.useRef(!1);
  M.useEffect(() => {
    !l.current && a.viewportInitialized && t && (setTimeout(() => t(a), 1), l.current = !0);
  }, [t, a.viewportInitialized]);
}
const S3 = (t) => t.panZoom?.syncViewport;
function w3(t) {
  const a = Pe(S3), l = wt();
  return M.useEffect(() => {
    t && (a?.(t), l.setState({ transform: [t.x, t.y, t.zoom] }));
  }, [t, a]), null;
}
function E3(t) {
  return t.connection.inProgress ? { ...t.connection, to: jo(t.connection.to, t.transform) } : { ...t.connection };
}
function _3(t) {
  return E3;
}
function N3(t) {
  const a = _3();
  return Pe(a, St);
}
const M3 = (t) => ({
  nodesConnectable: t.nodesConnectable,
  isValid: t.connection.isValid,
  inProgress: t.connection.inProgress,
  width: t.width,
  height: t.height
});
function T3({ containerStyle: t, style: a, type: l, component: o }) {
  const { nodesConnectable: s, width: u, height: f, isValid: h, inProgress: p } = Pe(M3, St);
  return !(u && s && p) ? null : R.jsx("svg", { style: t, width: u, height: f, className: "react-flow__connectionline react-flow__container", children: R.jsx("g", { className: Vt(["react-flow__connection", Zb(h)]), children: R.jsx(K1, { style: a, type: l, CustomComponent: o, isValid: h }) }) });
}
const K1 = ({ style: t, type: a = Li.Bezier, CustomComponent: l, isValid: o }) => {
  const { inProgress: s, from: u, fromNode: f, fromHandle: h, fromPosition: p, to: g, toNode: y, toHandle: m, toPosition: v, pointer: x } = N3();
  if (!s)
    return;
  if (l)
    return R.jsx(l, { connectionLineType: a, connectionLineStyle: t, fromNode: f, fromHandle: h, fromX: u.x, fromY: u.y, toX: g.x, toY: g.y, fromPosition: p, toPosition: v, connectionStatus: Zb(o), toNode: y, toHandle: m, pointer: x });
  let S = "";
  const C = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: g.x,
    targetY: g.y,
    targetPosition: v
  };
  switch (a) {
    case Li.Bezier:
      [S] = l1(C);
      break;
    case Li.SimpleBezier:
      [S] = j1(C);
      break;
    case Li.Step:
      [S] = Qd({
        ...C,
        borderRadius: 0
      });
      break;
    case Li.SmoothStep:
      [S] = Qd(C);
      break;
    default:
      [S] = o1(C);
  }
  return R.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: t });
};
K1.displayName = "ConnectionLine";
const C3 = {};
function hv(t = C3) {
  M.useRef(t), wt(), M.useEffect(() => {
  }, [t]);
}
function R3() {
  wt(), M.useRef(!1), M.useEffect(() => {
  }, []);
}
function I1({ nodeTypes: t, edgeTypes: a, onInit: l, onNodeClick: o, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: f, onNodeMouseEnter: h, onNodeMouseMove: p, onNodeMouseLeave: g, onNodeContextMenu: y, onSelectionContextMenu: m, onSelectionStart: v, onSelectionEnd: x, connectionLineType: S, connectionLineStyle: C, connectionLineComponent: T, connectionLineContainerStyle: N, selectionKeyCode: j, selectionOnDrag: w, selectionMode: z, multiSelectionKeyCode: U, panActivationKeyCode: H, zoomActivationKeyCode: k, deleteKeyCode: D, onlyRenderVisibleElements: Q, elementsSelectable: le, defaultViewport: K, translateExtent: J, minZoom: oe, maxZoom: L, preventScrolling: X, defaultMarkerColor: _, zoomOnScroll: O, zoomOnPinch: Z, panOnScroll: G, panOnScrollSpeed: ae, panOnScrollMode: A, zoomOnDoubleClick: V, panOnDrag: I, autoPanOnSelection: ne, onPaneClick: se, onPaneMouseEnter: me, onPaneMouseMove: ge, onPaneMouseLeave: W, onPaneScroll: pe, onPaneContextMenu: ze, paneClickDistance: Ae, nodeClickDistance: we, onEdgeContextMenu: Se, onEdgeMouseEnter: De, onEdgeMouseMove: Ge, onEdgeMouseLeave: nt, reconnectRadius: lt, onReconnect: Ft, onReconnectStart: pt, onReconnectEnd: qt, noDragClassName: Jt, noWheelClassName: Et, noPanClassName: Qt, disableKeyboardA11y: yt, nodeExtent: _t, rfId: Nt, viewport: Pt, onViewportChange: Gt }) {
  return hv(t), hv(a), R3(), x3(l), w3(Pt), R.jsx(XR, { onPaneClick: se, onPaneMouseEnter: me, onPaneMouseMove: ge, onPaneMouseLeave: W, onPaneContextMenu: ze, onPaneScroll: pe, paneClickDistance: Ae, deleteKeyCode: D, selectionKeyCode: j, selectionOnDrag: w, selectionMode: z, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: U, panActivationKeyCode: H, zoomActivationKeyCode: k, elementsSelectable: le, zoomOnScroll: O, zoomOnPinch: Z, zoomOnDoubleClick: V, panOnScroll: G, panOnScrollSpeed: ae, panOnScrollMode: A, panOnDrag: I, autoPanOnSelection: ne, defaultViewport: K, translateExtent: J, minZoom: oe, maxZoom: L, onSelectionContextMenu: m, preventScrolling: X, noDragClassName: Jt, noWheelClassName: Et, noPanClassName: Qt, disableKeyboardA11y: yt, onViewportChange: Gt, isControlledViewport: !!Pt, children: R.jsxs(b3, { children: [R.jsx(y3, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: f, onReconnect: Ft, onReconnectStart: pt, onReconnectEnd: qt, onlyRenderVisibleElements: Q, onEdgeContextMenu: Se, onEdgeMouseEnter: De, onEdgeMouseMove: Ge, onEdgeMouseLeave: nt, reconnectRadius: lt, defaultMarkerColor: _, noPanClassName: Qt, disableKeyboardA11y: yt, rfId: Nt }), R.jsx(T3, { style: C, type: S, component: T, containerStyle: N }), R.jsx("div", { className: "react-flow__edgelabel-renderer" }), R.jsx(WR, { nodeTypes: t, onNodeClick: o, onNodeDoubleClick: u, onNodeMouseEnter: h, onNodeMouseMove: p, onNodeMouseLeave: g, onNodeContextMenu: y, nodeClickDistance: we, onlyRenderVisibleElements: Q, noPanClassName: Qt, noDragClassName: Jt, disableKeyboardA11y: yt, nodeExtent: _t, rfId: Nt }), R.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
I1.displayName = "GraphView";
const A3 = M.memo(I1), D3 = Pb(), mv = ({ nodes: t, edges: a, defaultNodes: l, defaultEdges: o, width: s, height: u, fitView: f, fitViewOptions: h, minZoom: p = 0.5, maxZoom: g = 2, nodeOrigin: y, nodeExtent: m, zIndexMode: v = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), N = o ?? a ?? [], j = l ?? t ?? [], w = y ?? [0, 0], z = m ?? xo;
  c1(C, T, N);
  const { nodesInitialized: U } = Id(j, x, S, {
    nodeOrigin: w,
    nodeExtent: z,
    zIndexMode: v
  });
  let H = [0, 0, 1];
  if (f && s && u) {
    const k = Oo(x, {
      filter: (K) => !!((K.width || K.initialWidth) && (K.height || K.initialHeight))
    }), { x: D, y: Q, zoom: le } = Th(k, s, u, p, g, h?.padding ?? 0.1);
    H = [D, Q, le];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: H,
    nodes: j,
    nodesInitialized: U,
    nodeLookup: x,
    parentLookup: S,
    edges: N,
    edgeLookup: T,
    connectionLookup: C,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: l !== void 0,
    hasDefaultEdges: o !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: g,
    translateExtent: xo,
    nodeExtent: z,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: lr.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: w,
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
    connection: { ...$b },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: D3,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: Xb,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, z3 = ({ nodes: t, edges: a, defaultNodes: l, defaultEdges: o, width: s, height: u, fitView: f, fitViewOptions: h, minZoom: p, maxZoom: g, nodeOrigin: y, nodeExtent: m, zIndexMode: v }) => YC((x, S) => {
  async function C() {
    const { nodeLookup: T, panZoom: N, fitViewOptions: j, fitViewResolver: w, width: z, height: U, minZoom: H, maxZoom: k } = S();
    N && (await HT({
      nodes: T,
      width: z,
      height: U,
      panZoom: N,
      minZoom: H,
      maxZoom: k
    }, j), w?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...mv({
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
      defaultNodes: l,
      defaultEdges: o,
      zIndexMode: v
    }),
    setNodes: (T) => {
      const { nodeLookup: N, parentLookup: j, nodeOrigin: w, elevateNodesOnSelect: z, fitViewQueued: U, zIndexMode: H, nodesSelectionActive: k } = S(), { nodesInitialized: D, hasSelectedNodes: Q } = Id(T, N, j, {
        nodeOrigin: w,
        nodeExtent: m,
        elevateNodesOnSelect: z,
        checkEquality: !0,
        zIndexMode: H
      }), le = k && Q;
      U && D ? (C(), x({
        nodes: T,
        nodesInitialized: D,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: le
      })) : x({ nodes: T, nodesInitialized: D, nodesSelectionActive: le });
    },
    setEdges: (T) => {
      const { connectionLookup: N, edgeLookup: j } = S();
      c1(N, j, T), x({ edges: T });
    },
    setDefaultNodesAndEdges: (T, N) => {
      if (T) {
        const { setNodes: j } = S();
        j(T), x({ hasDefaultNodes: !0 });
      }
      if (N) {
        const { setEdges: j } = S();
        j(N), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (T) => {
      const { triggerNodeChanges: N, nodeLookup: j, parentLookup: w, domNode: z, nodeOrigin: U, nodeExtent: H, debug: k, fitViewQueued: D, zIndexMode: Q } = S(), { changes: le, updatedInternals: K } = lC(T, j, w, z, U, H, Q);
      K && (tC(j, w, { nodeOrigin: U, nodeExtent: H, zIndexMode: Q }), D ? (C(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), le?.length > 0 && (k && console.log("React Flow: trigger node changes", le), N?.(le)));
    },
    updateNodePositions: (T, N = !1) => {
      const j = [];
      let w = [];
      const { nodeLookup: z, triggerNodeChanges: U, connection: H, updateConnection: k, onNodesChangeMiddlewareMap: D } = S();
      for (const [Q, le] of T) {
        const K = z.get(Q), J = !!(K?.expandParent && K?.parentId && le?.position), oe = {
          id: Q,
          type: "position",
          position: J ? {
            x: Math.max(0, le.position.x),
            y: Math.max(0, le.position.y)
          } : le.position,
          dragging: N
        };
        if (K && H.inProgress && H.fromNode.id === K.id) {
          const L = cl(K, H.fromHandle, Ce.Left, !0);
          k({ ...H, from: L });
        }
        J && K.parentId && j.push({
          id: Q,
          parentId: K.parentId,
          rect: {
            ...le.internals.positionAbsolute,
            width: le.measured.width ?? 0,
            height: le.measured.height ?? 0
          }
        }), w.push(oe);
      }
      if (j.length > 0) {
        const { parentLookup: Q, nodeOrigin: le } = S(), K = Oh(j, z, Q, le);
        w.push(...K);
      }
      for (const Q of D.values())
        w = Q(w);
      U(w);
    },
    triggerNodeChanges: (T) => {
      const { onNodesChange: N, setNodes: j, nodes: w, hasDefaultNodes: z, debug: U } = S();
      if (T?.length) {
        if (z) {
          const H = uR(T, w);
          j(H);
        }
        U && console.log("React Flow: trigger node changes", T), N?.(T);
      }
    },
    triggerEdgeChanges: (T) => {
      const { onEdgesChange: N, setEdges: j, edges: w, hasDefaultEdges: z, debug: U } = S();
      if (T?.length) {
        if (z) {
          const H = cR(T, w);
          j(H);
        }
        U && console.log("React Flow: trigger edge changes", T), N?.(T);
      }
    },
    addSelectedNodes: (T) => {
      const { multiSelectionActive: N, edgeLookup: j, nodeLookup: w, triggerNodeChanges: z, triggerEdgeChanges: U } = S();
      if (N) {
        const H = T.map((k) => tl(k, !0));
        z(H);
        return;
      }
      z(Jl(w, /* @__PURE__ */ new Set([...T]), !0)), U(Jl(j));
    },
    addSelectedEdges: (T) => {
      const { multiSelectionActive: N, edgeLookup: j, nodeLookup: w, triggerNodeChanges: z, triggerEdgeChanges: U } = S();
      if (N) {
        const H = T.map((k) => tl(k, !0));
        U(H);
        return;
      }
      U(Jl(j, /* @__PURE__ */ new Set([...T]))), z(Jl(w, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: T, edges: N } = {}) => {
      const { edges: j, nodes: w, nodeLookup: z, triggerNodeChanges: U, triggerEdgeChanges: H } = S(), k = T || w, D = N || j, Q = [];
      for (const K of k) {
        if (!K.selected)
          continue;
        const J = z.get(K.id);
        J && (J.selected = !1), Q.push(tl(K.id, !1));
      }
      const le = [];
      for (const K of D)
        K.selected && le.push(tl(K.id, !1));
      U(Q), H(le);
    },
    setMinZoom: (T) => {
      const { panZoom: N, maxZoom: j } = S();
      N?.setScaleExtent([T, j]), x({ minZoom: T });
    },
    setMaxZoom: (T) => {
      const { panZoom: N, minZoom: j } = S();
      N?.setScaleExtent([j, T]), x({ maxZoom: T });
    },
    setTranslateExtent: (T) => {
      S().panZoom?.setTranslateExtent(T), x({ translateExtent: T });
    },
    resetSelectedElements: () => {
      const { edges: T, nodes: N, triggerNodeChanges: j, triggerEdgeChanges: w, elementsSelectable: z } = S();
      if (!z)
        return;
      const U = N.reduce((k, D) => D.selected ? [...k, tl(D.id, !1)] : k, []), H = T.reduce((k, D) => D.selected ? [...k, tl(D.id, !1)] : k, []);
      j(U), w(H);
    },
    setNodeExtent: (T) => {
      const { nodes: N, nodeLookup: j, parentLookup: w, nodeOrigin: z, elevateNodesOnSelect: U, nodeExtent: H, zIndexMode: k } = S();
      T[0][0] === H[0][0] && T[0][1] === H[0][1] && T[1][0] === H[1][0] && T[1][1] === H[1][1] || (Id(N, j, w, {
        nodeOrigin: z,
        nodeExtent: T,
        elevateNodesOnSelect: U,
        checkEquality: !1,
        zIndexMode: k
      }), x({ nodeExtent: T }));
    },
    panBy: (T) => {
      const { transform: N, width: j, height: w, panZoom: z, translateExtent: U } = S();
      return rC({ delta: T, panZoom: z, transform: N, translateExtent: U, width: j, height: w });
    },
    setCenter: async (T, N, j) => {
      const { width: w, height: z, maxZoom: U, panZoom: H } = S();
      if (!H)
        return !1;
      const k = typeof j?.zoom < "u" ? j.zoom : U;
      return await H.setViewport({
        x: w / 2 - T * k,
        y: z / 2 - N * k,
        zoom: k
      }, { duration: j?.duration, ease: j?.ease, interpolate: j?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...$b }
      });
    },
    updateConnection: (T) => {
      x({ connection: T });
    },
    reset: () => x({ ...mv() })
  };
}, Object.is);
function F1({ initialNodes: t, initialEdges: a, defaultNodes: l, defaultEdges: o, initialWidth: s, initialHeight: u, initialMinZoom: f, initialMaxZoom: h, initialFitViewOptions: p, fitView: g, nodeOrigin: y, nodeExtent: m, zIndexMode: v, children: x }) {
  const [S] = M.useState(() => z3({
    nodes: t,
    edges: a,
    defaultNodes: l,
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
  return R.jsx(GC, { value: S, children: R.jsx(pR, { children: R.jsx(DR, { children: x }) }) });
}
function O3({ children: t, nodes: a, edges: l, defaultNodes: o, defaultEdges: s, width: u, height: f, fitView: h, fitViewOptions: p, minZoom: g, maxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x }) {
  return M.useContext($u) ? R.jsx(R.Fragment, { children: t }) : R.jsx(F1, { initialNodes: a, initialEdges: l, defaultNodes: o, defaultEdges: s, initialWidth: u, initialHeight: f, fitView: h, initialFitViewOptions: p, initialMinZoom: g, initialMaxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x, children: t });
}
const L3 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function j3({ nodes: t, edges: a, defaultNodes: l, defaultEdges: o, className: s, nodeTypes: u, edgeTypes: f, onNodeClick: h, onEdgeClick: p, onInit: g, onMove: y, onMoveStart: m, onMoveEnd: v, onConnect: x, onConnectStart: S, onConnectEnd: C, onClickConnectStart: T, onClickConnectEnd: N, onNodeMouseEnter: j, onNodeMouseMove: w, onNodeMouseLeave: z, onNodeContextMenu: U, onNodeDoubleClick: H, onNodeDragStart: k, onNodeDrag: D, onNodeDragStop: Q, onNodesDelete: le, onEdgesDelete: K, onDelete: J, onSelectionChange: oe, onSelectionDragStart: L, onSelectionDrag: X, onSelectionDragStop: _, onSelectionContextMenu: O, onSelectionStart: Z, onSelectionEnd: G, onBeforeDelete: ae, connectionMode: A, connectionLineType: V = Li.Bezier, connectionLineStyle: I, connectionLineComponent: ne, connectionLineContainerStyle: se, deleteKeyCode: me = "Backspace", selectionKeyCode: ge = "Shift", selectionOnDrag: W = !1, selectionMode: pe = So.Full, panActivationKeyCode: ze = "Space", multiSelectionKeyCode: Ae = Eo() ? "Meta" : "Control", zoomActivationKeyCode: we = Eo() ? "Meta" : "Control", snapToGrid: Se, snapGrid: De, onlyRenderVisibleElements: Ge = !1, selectNodesOnDrag: nt, nodesDraggable: lt, autoPanOnNodeFocus: Ft, nodesConnectable: pt, nodesFocusable: qt, nodeOrigin: Jt = E1, edgesFocusable: Et, edgesReconnectable: Qt, elementsSelectable: yt = !0, defaultViewport: _t = nR, minZoom: Nt = 0.5, maxZoom: Pt = 2, translateExtent: Gt = xo, preventScrolling: Wt = !0, nodeExtent: Mt, defaultMarkerColor: ti = "#b1b1b7", zoomOnScroll: kn = !0, zoomOnPinch: Nn = !0, panOnScroll: Xt = !1, panOnScrollSpeed: Tt = 0.5, panOnScrollMode: zt = ll.Free, zoomOnDoubleClick: ni = !0, panOnDrag: ya = !0, onPaneClick: mn, onPaneMouseEnter: ta, onPaneMouseMove: Mn, onPaneMouseLeave: Yn, onPaneScroll: on, onPaneContextMenu: je, paneClickDistance: ot = 1, nodeClickDistance: Rt = 0, children: Ot, onReconnect: fn, onReconnectStart: rt, onReconnectEnd: $t, onEdgeContextMenu: na, onEdgeDoubleClick: Kt, onEdgeMouseEnter: B, onEdgeMouseMove: $, onEdgeMouseLeave: P, reconnectRadius: de = 10, onNodesChange: he, onEdgesChange: Ee, noDragClassName: ve = "nodrag", noWheelClassName: xe = "nowheel", noPanClassName: be = "nopan", fitView: Me, fitViewOptions: Te, connectOnClick: Be, attributionPosition: Oe, proOptions: Ve, defaultEdgeOptions: Je, elevateNodesOnSelect: mt = !0, elevateEdgesOnSelect: We = !1, disableKeyboardA11y: Ze = !1, autoPanOnConnect: Ct, autoPanOnNodeDrag: Ie, autoPanOnSelection: va = !0, autoPanSpeed: Tn, connectionRadius: sn, isValidConnection: en, onError: gn, style: ai, id: pn, nodeDragThreshold: ii, connectionDragThreshold: aa, viewport: ia, onViewportChange: He, width: st, height: dn, colorMode: Cn = "light", debug: li, onScroll: Da, ariaLabelConfig: at, zIndexMode: Vn = "basic", ...tn }, Bi) {
  const dl = pn || "1", cr = rR(Cn), ri = M.useCallback((fr) => {
    fr.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Da?.(fr);
  }, [Da]);
  return R.jsx("div", { "data-testid": "rf__wrapper", ...tn, onScroll: ri, style: { ...ai, ...L3 }, ref: Bi, className: Vt(["react-flow", s, cr]), id: pn, role: "application", children: R.jsxs(O3, { nodes: t, edges: a, width: st, height: dn, fitView: Me, fitViewOptions: Te, minZoom: Nt, maxZoom: Pt, nodeOrigin: Jt, nodeExtent: Mt, zIndexMode: Vn, children: [R.jsx(lR, { nodes: t, edges: a, defaultNodes: l, defaultEdges: o, onConnect: x, onConnectStart: S, onConnectEnd: C, onClickConnectStart: T, onClickConnectEnd: N, nodesDraggable: lt, autoPanOnNodeFocus: Ft, nodesConnectable: pt, nodesFocusable: qt, edgesFocusable: Et, edgesReconnectable: Qt, elementsSelectable: yt, elevateNodesOnSelect: mt, elevateEdgesOnSelect: We, minZoom: Nt, maxZoom: Pt, nodeExtent: Mt, onNodesChange: he, onEdgesChange: Ee, snapToGrid: Se, snapGrid: De, connectionMode: A, translateExtent: Gt, connectOnClick: Be, defaultEdgeOptions: Je, fitView: Me, fitViewOptions: Te, onNodesDelete: le, onEdgesDelete: K, onDelete: J, onNodeDragStart: k, onNodeDrag: D, onNodeDragStop: Q, onSelectionDrag: X, onSelectionDragStart: L, onSelectionDragStop: _, onMove: y, onMoveStart: m, onMoveEnd: v, noPanClassName: be, nodeOrigin: Jt, rfId: dl, autoPanOnConnect: Ct, autoPanOnNodeDrag: Ie, autoPanSpeed: Tn, onError: gn, connectionRadius: sn, isValidConnection: en, selectNodesOnDrag: nt, nodeDragThreshold: ii, connectionDragThreshold: aa, onBeforeDelete: ae, debug: li, ariaLabelConfig: at, zIndexMode: Vn }), R.jsx(A3, { onInit: g, onNodeClick: h, onEdgeClick: p, onNodeMouseEnter: j, onNodeMouseMove: w, onNodeMouseLeave: z, onNodeContextMenu: U, onNodeDoubleClick: H, nodeTypes: u, edgeTypes: f, connectionLineType: V, connectionLineStyle: I, connectionLineComponent: ne, connectionLineContainerStyle: se, selectionKeyCode: ge, selectionOnDrag: W, selectionMode: pe, deleteKeyCode: me, multiSelectionKeyCode: Ae, panActivationKeyCode: ze, zoomActivationKeyCode: we, onlyRenderVisibleElements: Ge, defaultViewport: _t, translateExtent: Gt, minZoom: Nt, maxZoom: Pt, preventScrolling: Wt, zoomOnScroll: kn, zoomOnPinch: Nn, zoomOnDoubleClick: ni, panOnScroll: Xt, panOnScrollSpeed: Tt, panOnScrollMode: zt, panOnDrag: ya, autoPanOnSelection: va, onPaneClick: mn, onPaneMouseEnter: ta, onPaneMouseMove: Mn, onPaneMouseLeave: Yn, onPaneScroll: on, onPaneContextMenu: je, paneClickDistance: ot, nodeClickDistance: Rt, onSelectionContextMenu: O, onSelectionStart: Z, onSelectionEnd: G, onReconnect: fn, onReconnectStart: rt, onReconnectEnd: $t, onEdgeContextMenu: na, onEdgeDoubleClick: Kt, onEdgeMouseEnter: B, onEdgeMouseMove: $, onEdgeMouseLeave: P, reconnectRadius: de, defaultMarkerColor: ti, noDragClassName: ve, noWheelClassName: xe, noPanClassName: be, rfId: dl, disableKeyboardA11y: Ze, nodeExtent: Mt, viewport: ia, onViewportChange: He }), R.jsx(tR, { onSelectionChange: oe }), Ot, R.jsx(FC, { proOptions: Ve, position: Oe }), R.jsx(IC, { rfId: dl, disableKeyboardA11y: Ze })] }) });
}
var H3 = N1(j3);
function B3({ dimensions: t, lineWidth: a, variant: l, className: o }) {
  return R.jsx("path", { strokeWidth: a, d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`, className: Vt(["react-flow__background-pattern", l, o]) });
}
function U3({ radius: t, className: a }) {
  return R.jsx("circle", { cx: t, cy: t, r: t, className: Vt(["react-flow__background-pattern", "dots", a]) });
}
var Ca;
(function(t) {
  t.Lines = "lines", t.Dots = "dots", t.Cross = "cross";
})(Ca || (Ca = {}));
const k3 = {
  [Ca.Dots]: 1,
  [Ca.Lines]: 1,
  [Ca.Cross]: 6
}, Y3 = (t) => ({ transform: t.transform, patternId: `pattern-${t.rfId}` });
function J1({
  id: t,
  variant: a = Ca.Dots,
  // only used for dots and cross
  gap: l = 20,
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
  const m = M.useRef(null), { transform: v, patternId: x } = Pe(Y3, St), S = o || k3[a], C = a === Ca.Dots, T = a === Ca.Cross, N = Array.isArray(l) ? l : [l, l], j = [N[0] * v[2] || 1, N[1] * v[2] || 1], w = S * v[2], z = Array.isArray(u) ? u : [u, u], U = T ? [w, w] : j, H = [
    z[0] * v[2] || 1 + U[0] / 2,
    z[1] * v[2] || 1 + U[1] / 2
  ], k = `${x}${t || ""}`;
  return R.jsxs("svg", { className: Vt(["react-flow__background", g]), style: {
    ...p,
    ...Qu,
    "--xy-background-color-props": h,
    "--xy-background-pattern-color-props": f
  }, ref: m, "data-testid": "rf__background", children: [R.jsx("pattern", { id: k, x: v[0] % j[0], y: v[1] % j[1], width: j[0], height: j[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${H[0]},-${H[1]})`, children: C ? R.jsx(U3, { radius: w / 2, className: y }) : R.jsx(B3, { dimensions: U, lineWidth: s, variant: a, className: y }) }), R.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${k})` })] });
}
J1.displayName = "Background";
const gv = M.memo(J1);
function V3() {
  return R.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: R.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function q3() {
  return R.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: R.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function G3() {
  return R.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: R.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function X3() {
  return R.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: R.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function $3() {
  return R.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: R.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function iu({ children: t, className: a, ...l }) {
  return R.jsx("button", { type: "button", className: Vt(["react-flow__controls-button", a]), ...l, children: t });
}
const Z3 = (t) => ({
  isInteractive: t.nodesDraggable || t.nodesConnectable || t.elementsSelectable,
  minZoomReached: t.transform[2] <= t.minZoom,
  maxZoomReached: t.transform[2] >= t.maxZoom,
  ariaLabelConfig: t.ariaLabelConfig
});
function P1({ style: t, showZoom: a = !0, showFitView: l = !0, showInteractive: o = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: f, onFitView: h, onInteractiveChange: p, className: g, children: y, position: m = "bottom-left", orientation: v = "vertical", "aria-label": x }) {
  const S = wt(), { isInteractive: C, minZoomReached: T, maxZoomReached: N, ariaLabelConfig: j } = Pe(Z3, St), { zoomIn: w, zoomOut: z, fitView: U } = Lh(), H = () => {
    w(), u?.();
  }, k = () => {
    z(), f?.();
  }, D = () => {
    U(s), h?.();
  }, Q = () => {
    S.setState({
      nodesDraggable: !C,
      nodesConnectable: !C,
      elementsSelectable: !C
    }), p?.(!C);
  }, le = v === "horizontal" ? "horizontal" : "vertical";
  return R.jsxs(Zu, { className: Vt(["react-flow__controls", le, g]), position: m, style: t, "data-testid": "rf__controls", "aria-label": x ?? j["controls.ariaLabel"], children: [a && R.jsxs(R.Fragment, { children: [R.jsx(iu, { onClick: H, className: "react-flow__controls-zoomin", title: j["controls.zoomIn.ariaLabel"], "aria-label": j["controls.zoomIn.ariaLabel"], disabled: N, children: R.jsx(V3, {}) }), R.jsx(iu, { onClick: k, className: "react-flow__controls-zoomout", title: j["controls.zoomOut.ariaLabel"], "aria-label": j["controls.zoomOut.ariaLabel"], disabled: T, children: R.jsx(q3, {}) })] }), l && R.jsx(iu, { className: "react-flow__controls-fitview", onClick: D, title: j["controls.fitView.ariaLabel"], "aria-label": j["controls.fitView.ariaLabel"], children: R.jsx(G3, {}) }), o && R.jsx(iu, { className: "react-flow__controls-interactive", onClick: Q, title: j["controls.interactive.ariaLabel"], "aria-label": j["controls.interactive.ariaLabel"], children: C ? R.jsx($3, {}) : R.jsx(X3, {}) }), y] });
}
P1.displayName = "Controls";
const Q3 = M.memo(P1);
function K3({ id: t, x: a, y: l, width: o, height: s, style: u, color: f, strokeColor: h, strokeWidth: p, className: g, borderRadius: y, shapeRendering: m, selected: v, onClick: x }) {
  const { background: S, backgroundColor: C } = u || {}, T = f || S || C;
  return R.jsx("rect", { className: Vt(["react-flow__minimap-node", { selected: v }, g]), x: a, y: l, rx: y, ry: y, width: o, height: s, style: {
    fill: T,
    stroke: h,
    strokeWidth: p
  }, shapeRendering: m, onClick: x ? (N) => x(N, t) : void 0 });
}
const I3 = M.memo(K3), F3 = (t) => t.nodes.map((a) => a.id), Nd = (t) => t instanceof Function ? t : () => t;
function J3({
  nodeStrokeColor: t,
  nodeColor: a,
  nodeClassName: l = "",
  nodeBorderRadius: o = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = I3,
  onClick: f
}) {
  const h = Pe(F3, St), p = Nd(a), g = Nd(t), y = Nd(l), m = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return R.jsx(R.Fragment, { children: h.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    R.jsx(W3, { id: v, nodeColorFunc: p, nodeStrokeColorFunc: g, nodeClassNameFunc: y, nodeBorderRadius: o, nodeStrokeWidth: s, NodeComponent: u, onClick: f, shapeRendering: m }, v)
  )) });
}
function P3({ id: t, nodeColorFunc: a, nodeStrokeColorFunc: l, nodeClassNameFunc: o, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: f, NodeComponent: h, onClick: p }) {
  const { node: g, x: y, y: m, width: v, height: x } = Pe((S) => {
    const C = S.nodeLookup.get(t);
    if (!C)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const T = C.internals.userNode, { x: N, y: j } = C.internals.positionAbsolute, { width: w, height: z } = ei(T);
    return {
      node: T,
      x: N,
      y: j,
      width: w,
      height: z
    };
  }, St);
  return !g || g.hidden || !Wb(g) ? null : R.jsx(h, { x: y, y: m, width: v, height: x, style: g.style, selected: !!g.selected, className: o(g), color: a(g), borderRadius: s, strokeColor: l(g), strokeWidth: u, shapeRendering: f, onClick: p, id: g.id });
}
const W3 = M.memo(P3);
var eA = M.memo(J3);
const tA = 200, nA = 150, aA = (t) => !t.hidden, iA = (t) => {
  const a = {
    x: -t.transform[0] / t.transform[2],
    y: -t.transform[1] / t.transform[2],
    width: t.width / t.transform[2],
    height: t.height / t.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: t.nodeLookup.size > 0 ? Fb(Oo(t.nodeLookup, { filter: aA }), a) : a,
    rfId: t.rfId,
    panZoom: t.panZoom,
    translateExtent: t.translateExtent,
    flowWidth: t.width,
    flowHeight: t.height,
    ariaLabelConfig: t.ariaLabelConfig
  };
}, lA = "react-flow__minimap-desc";
function W1({
  style: t,
  className: a,
  nodeStrokeColor: l,
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
  pannable: C = !1,
  zoomable: T = !1,
  ariaLabel: N,
  inversePan: j,
  zoomStep: w = 1,
  offsetScale: z = 5
}) {
  const U = wt(), H = M.useRef(null), { boundingRect: k, viewBB: D, rfId: Q, panZoom: le, translateExtent: K, flowWidth: J, flowHeight: oe, ariaLabelConfig: L } = Pe(iA, St), X = t?.width ?? tA, _ = t?.height ?? nA, O = k.width / X, Z = k.height / _, G = Math.max(O, Z), ae = G * X, A = G * _, V = z * G, I = k.x - (ae - k.width) / 2 - V, ne = k.y - (A - k.height) / 2 - V, se = ae + V * 2, me = A + V * 2, ge = `${lA}-${Q}`, W = M.useRef(0), pe = M.useRef();
  W.current = G, M.useEffect(() => {
    if (H.current && le)
      return pe.current = gC({
        domNode: H.current,
        panZoom: le,
        getTransform: () => U.getState().transform,
        getViewScale: () => W.current
      }), () => {
        pe.current?.destroy();
      };
  }, [le]), M.useEffect(() => {
    pe.current?.update({
      translateExtent: K,
      width: J,
      height: oe,
      inversePan: j,
      pannable: C,
      zoomStep: w,
      zoomable: T
    });
  }, [C, T, j, w, K, J, oe]);
  const ze = x ? (Se) => {
    const [De, Ge] = pe.current?.pointer(Se) || [0, 0];
    x(Se, { x: De, y: Ge });
  } : void 0, Ae = S ? M.useCallback((Se, De) => {
    const Ge = U.getState().nodeLookup.get(De).internals.userNode;
    S(Se, Ge);
  }, []) : void 0, we = N ?? L["minimap.ariaLabel"];
  return R.jsx(Zu, { position: v, style: {
    ...t,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof m == "number" ? m * G : void 0,
    "--xy-minimap-node-background-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-width-props": typeof f == "number" ? f : void 0
  }, className: Vt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: R.jsxs("svg", { width: X, height: _, viewBox: `${I} ${ne} ${se} ${me}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": ge, ref: H, onClick: ze, children: [we && R.jsx("title", { id: ge, children: we }), R.jsx(eA, { onClick: Ae, nodeColor: o, nodeStrokeColor: l, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: f, nodeComponent: h }), R.jsx("path", { className: "react-flow__minimap-mask", d: `M${I - V},${ne - V}h${se + V * 2}v${me + V * 2}h${-se - V * 2}z
        M${D.x},${D.y}h${D.width}v${D.height}h${-D.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
W1.displayName = "MiniMap";
const rA = M.memo(W1), oA = (t) => (a) => t ? `${Math.max(1 / a.transform[2], 1)}` : void 0, sA = {
  [sr.Line]: "right",
  [sr.Handle]: "bottom-right"
};
function uA({ nodeId: t, position: a, variant: l = sr.Handle, className: o, style: s = void 0, children: u, color: f, minWidth: h = 10, minHeight: p = 10, maxWidth: g = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: m = !1, resizeDirection: v, autoScale: x = !0, shouldResize: S, onResizeStart: C, onResize: T, onResizeEnd: N }) {
  const j = R1(), w = typeof t == "string" ? t : j, z = wt(), U = M.useRef(null), H = l === sr.Handle, k = Pe(M.useCallback(oA(H && x), [H, x]), St), D = M.useRef(null), Q = a ?? sA[l];
  M.useEffect(() => {
    if (!(!U.current || !w))
      return D.current || (D.current = CC({
        domNode: U.current,
        nodeId: w,
        getStoreItems: () => {
          const { nodeLookup: K, transform: J, snapGrid: oe, snapToGrid: L, nodeOrigin: X, domNode: _ } = z.getState();
          return {
            nodeLookup: K,
            transform: J,
            snapGrid: oe,
            snapToGrid: L,
            nodeOrigin: X,
            paneDomNode: _
          };
        },
        onChange: (K, J) => {
          const { triggerNodeChanges: oe, nodeLookup: L, parentLookup: X, nodeOrigin: _ } = z.getState(), O = [], Z = { x: K.x, y: K.y }, G = L.get(w);
          if (G && G.expandParent && G.parentId) {
            const ae = G.origin ?? _, A = K.width ?? G.measured.width ?? 0, V = K.height ?? G.measured.height ?? 0, I = {
              id: G.id,
              parentId: G.parentId,
              rect: {
                width: A,
                height: V,
                ...e1({
                  x: K.x ?? G.position.x,
                  y: K.y ?? G.position.y
                }, { width: A, height: V }, G.parentId, L, ae)
              }
            }, ne = Oh([I], L, X, _);
            O.push(...ne), Z.x = K.x ? Math.max(ae[0] * A, K.x) : void 0, Z.y = K.y ? Math.max(ae[1] * V, K.y) : void 0;
          }
          if (Z.x !== void 0 && Z.y !== void 0) {
            const ae = {
              id: w,
              type: "position",
              position: { ...Z }
            };
            O.push(ae);
          }
          if (K.width !== void 0 && K.height !== void 0) {
            const A = {
              id: w,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: K.width,
                height: K.height
              }
            };
            O.push(A);
          }
          for (const ae of J) {
            const A = {
              ...ae,
              type: "position"
            };
            O.push(A);
          }
          oe(O);
        },
        onEnd: ({ width: K, height: J }) => {
          const oe = {
            id: w,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: K,
              height: J
            }
          };
          z.getState().triggerNodeChanges([oe]);
        }
      })), D.current.update({
        controlPosition: Q,
        boundaries: {
          minWidth: h,
          minHeight: p,
          maxWidth: g,
          maxHeight: y
        },
        keepAspectRatio: m,
        resizeDirection: v,
        onResizeStart: C,
        onResize: T,
        onResizeEnd: N,
        shouldResize: S
      }), () => {
        D.current?.destroy();
      };
  }, [
    Q,
    h,
    p,
    g,
    y,
    m,
    C,
    T,
    N,
    S
  ]);
  const le = Q.split("-");
  return R.jsx("div", { className: Vt(["react-flow__resize-control", "nodrag", ...le, l, o]), ref: U, style: {
    ...s,
    scale: k,
    ...f && { [H ? "backgroundColor" : "borderColor"]: f }
  }, children: u });
}
M.memo(uA);
var cA = "_1729v610", fA = "_1729v611";
const pv = 16, dA = "rgba(186, 158, 255, 0.14)", hA = "rgba(186, 158, 255, 0.06)", mA = "rgba(0, 0, 0, 0.6)", gA = "#1d2023", pA = "#ba9eff";
function yA({
  nodes: t,
  edges: a,
  nodeTypes: l,
  showMiniMap: o = !1,
  showControls: s = !0,
  fitView: u = !0,
  className: f,
  ariaLabel: h,
  children: p
}) {
  const g = [cA, f].filter(Boolean).join(" ");
  return /* @__PURE__ */ R.jsx("div", { className: g, "aria-label": h ?? "node graph", children: /* @__PURE__ */ R.jsxs(
    H3,
    {
      nodes: t,
      edges: a,
      ...l ? { nodeTypes: l } : {},
      fitView: u,
      fitViewOptions: { padding: 0.2 },
      nodesDraggable: !1,
      nodesConnectable: !1,
      elementsSelectable: !1,
      minZoom: 0.2,
      maxZoom: 1.8,
      proOptions: { hideAttribution: !0 },
      children: [
        /* @__PURE__ */ R.jsx(
          gv,
          {
            id: "minor",
            variant: Ca.Dots,
            gap: pv,
            size: 1.1,
            color: dA
          }
        ),
        /* @__PURE__ */ R.jsx(
          gv,
          {
            id: "major",
            variant: Ca.Lines,
            gap: pv * 5,
            lineWidth: 1,
            color: hA
          }
        ),
        s && /* @__PURE__ */ R.jsx(Q3, { showInteractive: !1 }),
        o && /* @__PURE__ */ R.jsx(
          rA,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: mA,
            nodeColor: () => gA,
            nodeStrokeColor: () => pA,
            className: fA
          }
        ),
        p
      ]
    }
  ) });
}
function vA(t) {
  return /* @__PURE__ */ R.jsx(F1, { children: /* @__PURE__ */ R.jsx(yA, { ...t }) });
}
var bA = { neutral: "_160uuo1 _160uuo0", accent: "_160uuo2 _160uuo0", warning: "_160uuo3 _160uuo0", success: "_160uuo4 _160uuo0" };
function ex({ tone: t = "neutral", children: a, className: l }) {
  const o = [bA[t], l].filter(Boolean).join(" ");
  return /* @__PURE__ */ R.jsx("span", { className: o, children: a });
}
var xA = { primary: "mzxlfs1 mzxlfs0", secondary: "mzxlfs2 mzxlfs0", ghost: "mzxlfs3 mzxlfs0", danger: "mzxlfs4 mzxlfs0" }, SA = { sm: "mzxlfs5", md: "mzxlfs6", lg: "mzxlfs7" }, wA = "mzxlfs9";
function Ja({
  variant: t = "primary",
  size: a = "md",
  type: l = "button",
  loading: o = !1,
  disabled: s,
  children: u,
  className: f,
  ...h
}) {
  const p = [xA[t], SA[a], f].filter(Boolean).join(" ");
  return /* @__PURE__ */ R.jsxs(
    "button",
    {
      type: l,
      className: p,
      disabled: o || s,
      "aria-busy": o || void 0,
      ...h,
      children: [
        o ? /* @__PURE__ */ R.jsx("span", { className: wA, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
var EA = "_1i506u20", _A = "_1i506u21", NA = "_1i506u22", MA = "_1i506u23", TA = "_1i506u24", CA = "_1i506u25", RA = "_1i506u26", AA = "_1i506u27", DA = "_1i506u28";
const zA = {
  default: "",
  raised: _A,
  inset: NA
};
function pu({
  eyebrow: t,
  title: a,
  description: l,
  actions: o,
  children: s,
  className: u,
  elevation: f = "default"
}) {
  const h = [EA, zA[f], u].filter(Boolean).join(" "), p = !!(t || a || o);
  return /* @__PURE__ */ R.jsxs("section", { className: h, children: [
    p && /* @__PURE__ */ R.jsxs("header", { className: MA, children: [
      /* @__PURE__ */ R.jsxs("div", { className: TA, children: [
        t && /* @__PURE__ */ R.jsx("span", { className: RA, children: t }),
        a && /* @__PURE__ */ R.jsx("span", { className: AA, children: a }),
        l && /* @__PURE__ */ R.jsx("span", { className: DA, children: l })
      ] }),
      o && /* @__PURE__ */ R.jsx("div", { className: CA, children: o })
    ] }),
    s
  ] });
}
function OA(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], l = document.createElement("style");
  l.type = "text/css", a.appendChild(l), l.styleSheet ? l.styleSheet.cssText = t : l.appendChild(document.createTextNode(t));
}
const LA = (t) => {
  switch (t) {
    case "success":
      return BA;
    case "info":
      return kA;
    case "warning":
      return UA;
    case "error":
      return YA;
    default:
      return null;
  }
}, jA = Array(12).fill(0), HA = ({ visible: t, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, jA.map((l, o) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${o}`
})))), BA = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), UA = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), kA = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), YA = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), VA = /* @__PURE__ */ ye.createElement("svg", {
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
})), qA = () => {
  const [t, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const l = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", l), () => window.removeEventListener("visibilitychange", l);
  }, []), t;
};
let Pd = 1;
class GA {
  constructor() {
    this.subscribe = (a) => (this.subscribers.push(a), () => {
      const l = this.subscribers.indexOf(a);
      this.subscribers.splice(l, 1);
    }), this.publish = (a) => {
      this.subscribers.forEach((l) => l(a));
    }, this.addToast = (a) => {
      this.publish(a), this.toasts = [
        ...this.toasts,
        a
      ];
    }, this.create = (a) => {
      var l;
      const { message: o, ...s } = a, u = typeof a?.id == "number" || ((l = a.id) == null ? void 0 : l.length) > 0 ? a.id : Pd++, f = this.toasts.find((p) => p.id === u), h = a.dismissible === void 0 ? !0 : a.dismissible;
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
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((l) => l({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((l) => {
      this.subscribers.forEach((o) => o({
        id: l.id,
        dismiss: !0
      }));
    }), a), this.message = (a, l) => this.create({
      ...l,
      message: a
    }), this.error = (a, l) => this.create({
      ...l,
      message: a,
      type: "error"
    }), this.success = (a, l) => this.create({
      ...l,
      type: "success",
      message: a
    }), this.info = (a, l) => this.create({
      ...l,
      type: "info",
      message: a
    }), this.warning = (a, l) => this.create({
      ...l,
      type: "warning",
      message: a
    }), this.loading = (a, l) => this.create({
      ...l,
      type: "loading",
      message: a
    }), this.promise = (a, l) => {
      if (!l)
        return;
      let o;
      l.loading !== void 0 && (o = this.create({
        ...l,
        promise: a,
        type: "loading",
        message: l.loading,
        description: typeof l.description != "function" ? l.description : void 0
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
        else if ($A(g) && !g.ok) {
          u = !1;
          const m = typeof l.error == "function" ? await l.error(`HTTP error! status: ${g.status}`) : l.error, v = typeof l.description == "function" ? await l.description(`HTTP error! status: ${g.status}`) : l.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
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
          const m = typeof l.error == "function" ? await l.error(g) : l.error, v = typeof l.description == "function" ? await l.description(g) : l.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
            message: m
          };
          this.create({
            id: o,
            type: "error",
            description: v,
            ...S
          });
        } else if (l.success !== void 0) {
          u = !1;
          const m = typeof l.success == "function" ? await l.success(g) : l.success, v = typeof l.description == "function" ? await l.description(g) : l.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
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
        ], l.error !== void 0) {
          u = !1;
          const y = typeof l.error == "function" ? await l.error(g) : l.error, m = typeof l.description == "function" ? await l.description(g) : l.description, x = typeof y == "object" && !ye.isValidElement(y) ? y : {
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
        u && (this.dismiss(o), o = void 0), l.finally == null || l.finally.call(l);
      }), p = () => new Promise((g, y) => h.then(() => f[0] === "reject" ? y(f[1]) : g(f[1])).catch(y));
      return typeof o != "string" && typeof o != "number" ? {
        unwrap: p
      } : Object.assign(o, {
        unwrap: p
      });
    }, this.custom = (a, l) => {
      const o = l?.id || Pd++;
      return this.create({
        jsx: a(o),
        id: o,
        ...l
      }), o;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const En = new GA(), XA = (t, a) => {
  const l = a?.id || Pd++;
  return En.addToast({
    title: t,
    ...a,
    id: l
  }), l;
}, $A = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", ZA = XA, QA = () => En.toasts, KA = () => En.getActiveToasts(), Pl = Object.assign(ZA, {
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
  getHistory: QA,
  getToasts: KA
});
OA("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function lu(t) {
  return t.label !== void 0;
}
const IA = 3, FA = "24px", JA = "16px", yv = 4e3, PA = 356, WA = 14, eD = 45, tD = 200;
function _a(...t) {
  return t.filter(Boolean).join(" ");
}
function nD(t) {
  const [a, l] = t.split("-"), o = [];
  return a && o.push(a), l && o.push(l), o;
}
const aD = (t) => {
  var a, l, o, s, u, f, h, p, g;
  const { invert: y, toast: m, unstyled: v, interacting: x, setHeights: S, visibleToasts: C, heights: T, index: N, toasts: j, expanded: w, removeToast: z, defaultRichColors: U, closeButton: H, style: k, cancelButtonStyle: D, actionButtonStyle: Q, className: le = "", descriptionClassName: K = "", duration: J, position: oe, gap: L, expandByDefault: X, classNames: _, icons: O, closeButtonAriaLabel: Z = "Close toast" } = t, [G, ae] = ye.useState(null), [A, V] = ye.useState(null), [I, ne] = ye.useState(!1), [se, me] = ye.useState(!1), [ge, W] = ye.useState(!1), [pe, ze] = ye.useState(!1), [Ae, we] = ye.useState(!1), [Se, De] = ye.useState(0), [Ge, nt] = ye.useState(0), lt = ye.useRef(m.duration || J || yv), Ft = ye.useRef(null), pt = ye.useRef(null), qt = N === 0, Jt = N + 1 <= C, Et = m.type, Qt = m.dismissible !== !1, yt = m.className || "", _t = m.descriptionClassName || "", Nt = ye.useMemo(() => T.findIndex((je) => je.toastId === m.id) || 0, [
    T,
    m.id
  ]), Pt = ye.useMemo(() => {
    var je;
    return (je = m.closeButton) != null ? je : H;
  }, [
    m.closeButton,
    H
  ]), Gt = ye.useMemo(() => m.duration || J || yv, [
    m.duration,
    J
  ]), Wt = ye.useRef(0), Mt = ye.useRef(0), ti = ye.useRef(0), kn = ye.useRef(null), [Nn, Xt] = oe.split("-"), Tt = ye.useMemo(() => T.reduce((je, ot, Rt) => Rt >= Nt ? je : je + ot.height, 0), [
    T,
    Nt
  ]), zt = qA(), ni = m.invert || y, ya = Et === "loading";
  Mt.current = ye.useMemo(() => Nt * L + Tt, [
    Nt,
    Tt
  ]), ye.useEffect(() => {
    lt.current = Gt;
  }, [
    Gt
  ]), ye.useEffect(() => {
    ne(!0);
  }, []), ye.useEffect(() => {
    const je = pt.current;
    if (je) {
      const ot = je.getBoundingClientRect().height;
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
    if (!I) return;
    const je = pt.current, ot = je.style.height;
    je.style.height = "auto";
    const Rt = je.getBoundingClientRect().height;
    je.style.height = ot, nt(Rt), S((Ot) => Ot.find((rt) => rt.toastId === m.id) ? Ot.map((rt) => rt.toastId === m.id ? {
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
    I,
    m.title,
    m.description,
    S,
    m.id,
    m.jsx,
    m.action,
    m.cancel
  ]);
  const mn = ye.useCallback(() => {
    me(!0), De(Mt.current), S((je) => je.filter((ot) => ot.toastId !== m.id)), setTimeout(() => {
      z(m);
    }, tD);
  }, [
    m,
    z,
    S,
    Mt
  ]);
  ye.useEffect(() => {
    if (m.promise && Et === "loading" || m.duration === 1 / 0 || m.type === "loading") return;
    let je;
    return w || x || zt ? (() => {
      if (ti.current < Wt.current) {
        const Ot = (/* @__PURE__ */ new Date()).getTime() - Wt.current;
        lt.current = lt.current - Ot;
      }
      ti.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      lt.current !== 1 / 0 && (Wt.current = (/* @__PURE__ */ new Date()).getTime(), je = setTimeout(() => {
        m.onAutoClose == null || m.onAutoClose.call(m, m), mn();
      }, lt.current));
    })(), () => clearTimeout(je);
  }, [
    w,
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
    var je;
    if (O?.loading) {
      var ot;
      return /* @__PURE__ */ ye.createElement("div", {
        className: _a(_?.loader, m == null || (ot = m.classNames) == null ? void 0 : ot.loader, "sonner-loader"),
        "data-visible": Et === "loading"
      }, O.loading);
    }
    return /* @__PURE__ */ ye.createElement(HA, {
      className: _a(_?.loader, m == null || (je = m.classNames) == null ? void 0 : je.loader),
      visible: Et === "loading"
    });
  }
  const Mn = m.icon || O?.[Et] || LA(Et);
  var Yn, on;
  return /* @__PURE__ */ ye.createElement("li", {
    tabIndex: 0,
    ref: pt,
    className: _a(le, yt, _?.toast, m == null || (a = m.classNames) == null ? void 0 : a.toast, _?.default, _?.[Et], m == null || (l = m.classNames) == null ? void 0 : l[Et]),
    "data-sonner-toast": "",
    "data-rich-colors": (Yn = m.richColors) != null ? Yn : U,
    "data-styled": !(m.jsx || m.unstyled || v),
    "data-mounted": I,
    "data-promise": !!m.promise,
    "data-swiped": Ae,
    "data-removed": se,
    "data-visible": Jt,
    "data-y-position": Nn,
    "data-x-position": Xt,
    "data-index": N,
    "data-front": qt,
    "data-swiping": ge,
    "data-dismissible": Qt,
    "data-type": Et,
    "data-invert": ni,
    "data-swipe-out": pe,
    "data-swipe-direction": A,
    "data-expanded": !!(w || X && I),
    "data-testid": m.testId,
    style: {
      "--index": N,
      "--toasts-before": N,
      "--z-index": j.length - N,
      "--offset": `${se ? Se : Mt.current}px`,
      "--initial-height": X ? "auto" : `${Ge}px`,
      ...k,
      ...m.style
    },
    onDragEnd: () => {
      W(!1), ae(null), kn.current = null;
    },
    onPointerDown: (je) => {
      je.button !== 2 && (ya || !Qt || (Ft.current = /* @__PURE__ */ new Date(), De(Mt.current), je.target.setPointerCapture(je.pointerId), je.target.tagName !== "BUTTON" && (W(!0), kn.current = {
        x: je.clientX,
        y: je.clientY
      })));
    },
    onPointerUp: () => {
      var je, ot, Rt;
      if (pe || !Qt) return;
      kn.current = null;
      const Ot = Number(((je = pt.current) == null ? void 0 : je.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), fn = Number(((ot = pt.current) == null ? void 0 : ot.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), rt = (/* @__PURE__ */ new Date()).getTime() - ((Rt = Ft.current) == null ? void 0 : Rt.getTime()), $t = G === "x" ? Ot : fn, na = Math.abs($t) / rt;
      if (Math.abs($t) >= eD || na > 0.11) {
        De(Mt.current), m.onDismiss == null || m.onDismiss.call(m, m), V(G === "x" ? Ot > 0 ? "right" : "left" : fn > 0 ? "down" : "up"), mn(), ze(!0);
        return;
      } else {
        var Kt, B;
        (Kt = pt.current) == null || Kt.style.setProperty("--swipe-amount-x", "0px"), (B = pt.current) == null || B.style.setProperty("--swipe-amount-y", "0px");
      }
      we(!1), W(!1), ae(null);
    },
    onPointerMove: (je) => {
      var ot, Rt, Ot;
      if (!kn.current || !Qt || ((ot = window.getSelection()) == null ? void 0 : ot.toString().length) > 0) return;
      const rt = je.clientY - kn.current.y, $t = je.clientX - kn.current.x;
      var na;
      const Kt = (na = t.swipeDirections) != null ? na : nD(oe);
      !G && (Math.abs($t) > 1 || Math.abs(rt) > 1) && ae(Math.abs($t) > Math.abs(rt) ? "x" : "y");
      let B = {
        x: 0,
        y: 0
      };
      const $ = (P) => 1 / (1.5 + Math.abs(P) / 20);
      if (G === "y") {
        if (Kt.includes("top") || Kt.includes("bottom"))
          if (Kt.includes("top") && rt < 0 || Kt.includes("bottom") && rt > 0)
            B.y = rt;
          else {
            const P = rt * $(rt);
            B.y = Math.abs(P) < Math.abs(rt) ? P : rt;
          }
      } else if (G === "x" && (Kt.includes("left") || Kt.includes("right")))
        if (Kt.includes("left") && $t < 0 || Kt.includes("right") && $t > 0)
          B.x = $t;
        else {
          const P = $t * $($t);
          B.x = Math.abs(P) < Math.abs($t) ? P : $t;
        }
      (Math.abs(B.x) > 0 || Math.abs(B.y) > 0) && we(!0), (Rt = pt.current) == null || Rt.style.setProperty("--swipe-amount-x", `${B.x}px`), (Ot = pt.current) == null || Ot.style.setProperty("--swipe-amount-y", `${B.y}px`);
    }
  }, Pt && !m.jsx && Et !== "loading" ? /* @__PURE__ */ ye.createElement("button", {
    "aria-label": Z,
    "data-disabled": ya,
    "data-close-button": !0,
    onClick: ya || !Qt ? () => {
    } : () => {
      mn(), m.onDismiss == null || m.onDismiss.call(m, m);
    },
    className: _a(_?.closeButton, m == null || (o = m.classNames) == null ? void 0 : o.closeButton)
  }, (on = O?.close) != null ? on : VA) : null, (Et || m.icon || m.promise) && m.icon !== null && (O?.[Et] !== null || m.icon) ? /* @__PURE__ */ ye.createElement("div", {
    "data-icon": "",
    className: _a(_?.icon, m == null || (s = m.classNames) == null ? void 0 : s.icon)
  }, m.promise || m.type === "loading" && !m.icon ? m.icon || ta() : null, m.type !== "loading" ? Mn : null) : null, /* @__PURE__ */ ye.createElement("div", {
    "data-content": "",
    className: _a(_?.content, m == null || (u = m.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ye.createElement("div", {
    "data-title": "",
    className: _a(_?.title, m == null || (f = m.classNames) == null ? void 0 : f.title)
  }, m.jsx ? m.jsx : typeof m.title == "function" ? m.title() : m.title), m.description ? /* @__PURE__ */ ye.createElement("div", {
    "data-description": "",
    className: _a(K, _t, _?.description, m == null || (h = m.classNames) == null ? void 0 : h.description)
  }, typeof m.description == "function" ? m.description() : m.description) : null), /* @__PURE__ */ ye.isValidElement(m.cancel) ? m.cancel : m.cancel && lu(m.cancel) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: m.cancelButtonStyle || D,
    onClick: (je) => {
      lu(m.cancel) && Qt && (m.cancel.onClick == null || m.cancel.onClick.call(m.cancel, je), mn());
    },
    className: _a(_?.cancelButton, m == null || (p = m.classNames) == null ? void 0 : p.cancelButton)
  }, m.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(m.action) ? m.action : m.action && lu(m.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: m.actionButtonStyle || Q,
    onClick: (je) => {
      lu(m.action) && (m.action.onClick == null || m.action.onClick.call(m.action, je), !je.defaultPrevented && mn());
    },
    className: _a(_?.actionButton, m == null || (g = m.classNames) == null ? void 0 : g.actionButton)
  }, m.action.label) : null);
};
function vv() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function iD(t, a) {
  const l = {};
  return [
    t,
    a
  ].forEach((o, s) => {
    const u = s === 1, f = u ? "--mobile-offset" : "--offset", h = u ? JA : FA;
    function p(g) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((y) => {
        l[`${f}-${y}`] = typeof g == "number" ? `${g}px` : g;
      });
    }
    typeof o == "number" || typeof o == "string" ? p(o) : typeof o == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((g) => {
      o[g] === void 0 ? l[`${f}-${g}`] = h : l[`${f}-${g}`] = typeof o[g] == "number" ? `${o[g]}px` : o[g];
    }) : p(h);
  }), l;
}
const lD = /* @__PURE__ */ ye.forwardRef(function(a, l) {
  const { id: o, invert: s, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: h, closeButton: p, className: g, offset: y, mobileOffset: m, theme: v = "light", richColors: x, duration: S, style: C, visibleToasts: T = IA, toastOptions: N, dir: j = vv(), gap: w = WA, icons: z, containerAriaLabel: U = "Notifications" } = a, [H, k] = ye.useState([]), D = ye.useMemo(() => o ? H.filter((I) => I.toasterId === o) : H.filter((I) => !I.toasterId), [
    H,
    o
  ]), Q = ye.useMemo(() => Array.from(new Set([
    u
  ].concat(D.filter((I) => I.position).map((I) => I.position)))), [
    D,
    u
  ]), [le, K] = ye.useState([]), [J, oe] = ye.useState(!1), [L, X] = ye.useState(!1), [_, O] = ye.useState(v !== "system" ? v : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), Z = ye.useRef(null), G = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ae = ye.useRef(null), A = ye.useRef(!1), V = ye.useCallback((I) => {
    k((ne) => {
      var se;
      return (se = ne.find((me) => me.id === I.id)) != null && se.delete || En.dismiss(I.id), ne.filter(({ id: me }) => me !== I.id);
    });
  }, []);
  return ye.useEffect(() => En.subscribe((I) => {
    if (I.dismiss) {
      requestAnimationFrame(() => {
        k((ne) => ne.map((se) => se.id === I.id ? {
          ...se,
          delete: !0
        } : se));
      });
      return;
    }
    setTimeout(() => {
      qC.flushSync(() => {
        k((ne) => {
          const se = ne.findIndex((me) => me.id === I.id);
          return se !== -1 ? [
            ...ne.slice(0, se),
            {
              ...ne[se],
              ...I
            },
            ...ne.slice(se + 1)
          ] : [
            I,
            ...ne
          ];
        });
      });
    });
  }), [
    H
  ]), ye.useEffect(() => {
    if (v !== "system") {
      O(v);
      return;
    }
    if (v === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? O("dark") : O("light")), typeof window > "u") return;
    const I = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      I.addEventListener("change", ({ matches: ne }) => {
        O(ne ? "dark" : "light");
      });
    } catch {
      I.addListener(({ matches: se }) => {
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
    H.length <= 1 && oe(!1);
  }, [
    H
  ]), ye.useEffect(() => {
    const I = (ne) => {
      var se;
      if (f.every((W) => ne[W] || ne.code === W)) {
        var ge;
        oe(!0), (ge = Z.current) == null || ge.focus();
      }
      ne.code === "Escape" && (document.activeElement === Z.current || (se = Z.current) != null && se.contains(document.activeElement)) && oe(!1);
    };
    return document.addEventListener("keydown", I), () => document.removeEventListener("keydown", I);
  }, [
    f
  ]), ye.useEffect(() => {
    if (Z.current)
      return () => {
        ae.current && (ae.current.focus({
          preventScroll: !0
        }), ae.current = null, A.current = !1);
      };
  }, [
    Z.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ye.createElement("section", {
    ref: l,
    "aria-label": `${U} ${G}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, Q.map((I, ne) => {
    var se;
    const [me, ge] = I.split("-");
    return D.length ? /* @__PURE__ */ ye.createElement("ol", {
      key: I,
      dir: j === "auto" ? vv() : j,
      tabIndex: -1,
      ref: Z,
      className: g,
      "data-sonner-toaster": !0,
      "data-sonner-theme": _,
      "data-y-position": me,
      "data-x-position": ge,
      style: {
        "--front-toast-height": `${((se = le[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${PA}px`,
        "--gap": `${w}px`,
        ...C,
        ...iD(y, m)
      },
      onBlur: (W) => {
        A.current && !W.currentTarget.contains(W.relatedTarget) && (A.current = !1, ae.current && (ae.current.focus({
          preventScroll: !0
        }), ae.current = null));
      },
      onFocus: (W) => {
        W.target instanceof HTMLElement && W.target.dataset.dismissible === "false" || A.current || (A.current = !0, ae.current = W.relatedTarget);
      },
      onMouseEnter: () => oe(!0),
      onMouseMove: () => oe(!0),
      onMouseLeave: () => {
        L || oe(!1);
      },
      onDragEnd: () => oe(!1),
      onPointerDown: (W) => {
        W.target instanceof HTMLElement && W.target.dataset.dismissible === "false" || X(!0);
      },
      onPointerUp: () => X(!1)
    }, D.filter((W) => !W.position && ne === 0 || W.position === I).map((W, pe) => {
      var ze, Ae;
      return /* @__PURE__ */ ye.createElement(aD, {
        key: W.id,
        icons: z,
        index: pe,
        toast: W,
        defaultRichColors: x,
        duration: (ze = N?.duration) != null ? ze : S,
        className: N?.className,
        descriptionClassName: N?.descriptionClassName,
        invert: s,
        visibleToasts: T,
        closeButton: (Ae = N?.closeButton) != null ? Ae : p,
        interacting: L,
        position: I,
        style: N?.style,
        unstyled: N?.unstyled,
        classNames: N?.classNames,
        cancelButtonStyle: N?.cancelButtonStyle,
        actionButtonStyle: N?.actionButtonStyle,
        closeButtonAriaLabel: N?.closeButtonAriaLabel,
        removeToast: V,
        toasts: D.filter((we) => we.position == W.position),
        heights: le.filter((we) => we.position == W.position),
        setHeights: K,
        expandByDefault: h,
        gap: w,
        expanded: J,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
});
class Iu extends Error {
  constructor(a, l, o, s) {
    super(o), this.status = a, this.category = l, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const Fu = "/api/v1/extensions/nexus.3d.trellis2";
async function Ho(t, a) {
  const l = t.startsWith("http") ? t : `${Fu}${t}`, o = await fetch(l, {
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
    throw new Iu(
      o.status,
      s?.category ?? "unknown",
      s?.message ?? o.statusText,
      s?.requestId
    );
  }
  if (o.status !== 204)
    return await o.json();
}
function rD(t, a, l) {
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
const oD = {
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
  residency: "balanced"
}, Hi = [
  "load",
  "encode",
  "sparse",
  "shape",
  "texture",
  "decode",
  "glb"
];
function Hh() {
  const t = {};
  for (const a of Hi) t[a] = "idle";
  return t;
}
const nr = {
  phase: "idle",
  stage: null,
  step: 0,
  totalSteps: 0,
  overallFraction: 0,
  stageStates: Hh(),
  glbRef: null,
  thumbnailRef: null,
  metadata: null,
  errorCode: null,
  errorMessage: null
};
function Wd() {
  return { ...nr, stageStates: Hh(), phase: "running" };
}
function Bh(t) {
  return Hi.includes(t);
}
function sD(t, a) {
  if (!Bh(a)) return t;
  const l = { ...t };
  let o = !1;
  for (const s of Hi)
    s === a ? (l[s] = "active", o = !0) : o || (l[s] = "done");
  return l;
}
function uD(t, a, l) {
  const o = l > 0 ? Math.min(1, a / l) : 0, s = Bh(t) ? Hi.indexOf(t) : 0, u = 1 / Hi.length;
  return Math.min(0.99, u * (s + o));
}
function cD(t, a) {
  switch (a.method) {
    case "trellis2.generate.progress": {
      const { stage: l, step: o, total: s } = a.params, u = uD(l, o, s);
      return {
        ...t,
        phase: "running",
        stage: l,
        step: o,
        totalSteps: s,
        overallFraction: Math.max(t.overallFraction, u),
        stageStates: sD(t.stageStates, l)
      };
    }
    case "trellis2.generate.done": {
      const l = Hh();
      for (const o of Hi) l[o] = "done";
      return {
        ...t,
        phase: "done",
        overallFraction: 1,
        stageStates: l,
        glbRef: a.params.glbRef,
        thumbnailRef: null,
        metadata: a.params.metadata ?? null
      };
    }
    case "trellis2.generate.error": {
      const l = { ...t.stageStates };
      return t.stage && Bh(t.stage) && (l[t.stage] = "error"), {
        ...t,
        phase: "error",
        stageStates: l,
        errorCode: a.params.code,
        errorMessage: a.params.message
      };
    }
    default:
      return t;
  }
}
function bv(t) {
  return { ...t, phase: "cancelled" };
}
async function fD(t) {
  return Ho("/generate/start", {
    method: "POST",
    body: JSON.stringify(t)
  });
}
async function dD(t) {
  return Ho(`/generate/jobs/${encodeURIComponent(t)}/cancel`, {
    method: "POST",
    body: "{}"
  });
}
function hD(t, a, l) {
  return rD(
    `/generate/jobs/${encodeURIComponent(t)}/events`,
    a
  );
}
async function mD(t = 25) {
  return Ho(`/generate/jobs?limit=${t}`);
}
async function xv(t) {
  return Ho(`/generate/jobs/${encodeURIComponent(t)}`);
}
async function gD(t) {
  await Ho(`/generate/jobs/${encodeURIComponent(t)}`, { method: "DELETE" });
}
const Uh = "nexus.3d.trellis2.active-job";
function pD(t) {
  try {
    sessionStorage.setItem(Uh, JSON.stringify({ jobId: t }));
  } catch {
  }
}
function ru() {
  try {
    sessionStorage.removeItem(Uh);
  } catch {
  }
}
function Md() {
  try {
    const t = sessionStorage.getItem(Uh);
    if (!t) return null;
    const a = JSON.parse(t);
    return typeof a.jobId == "string" ? a.jobId : null;
  } catch {
    return null;
  }
}
function Td(t) {
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
  } : t.status === "cancelled" ? { ...nr, phase: "cancelled" } : Wd();
}
const tx = M.createContext(null);
function yD({ children: t }) {
  const [a, l] = M.useState(() => ({ ...oD })), [o, s] = M.useState(null), [u, f] = M.useState(null), [h, p] = M.useState(nr), g = M.useRef(null), y = M.useRef(h);
  y.current = h;
  const m = M.useCallback((U) => {
    g.current?.(), g.current = hD(U, (H) => {
      p((k) => cD(k, H));
    });
  }, []), v = M.useCallback(
    (U, H) => {
      l((k) => ({ ...k, [U]: H }));
    },
    []
  ), x = M.useCallback((U) => {
    l((H) => ({ ...H, ...U }));
  }, []), S = M.useCallback((U, H) => {
    s(U), f(H);
  }, []), C = M.useCallback(() => {
    s(null), f(null);
  }, []), T = M.useCallback(() => {
    g.current?.(), g.current = null, ru(), p(nr);
  }, []), N = M.useCallback(async () => {
    if (!o) return;
    g.current?.();
    const U = { image: o, params: { ...a } }, { jobId: H } = await fD(U);
    p(Wd()), pD(H), m(H);
  }, [o, a, m]), j = M.useCallback(async () => {
    const U = Md();
    if (!U) {
      p((k) => bv(k));
      return;
    }
    const { status: H } = await dD(U);
    H !== "cancelling" && (g.current?.(), g.current = null, ru(), p((k) => bv(k)));
  }, []), w = M.useCallback(async (U) => {
    g.current?.(), g.current = null;
    try {
      const H = await xv(U.id);
      p(Td(H));
    } catch {
      p(Td(U));
    }
  }, []);
  M.useEffect(() => {
    (h.phase === "done" || h.phase === "error" || h.phase === "cancelled") && ru();
  }, [h.phase]), M.useEffect(() => {
    const U = () => {
      if (y.current.phase !== "running") return;
      const Q = Md();
      Q && m(Q);
    }, H = () => {
      document.visibilityState === "visible" && U();
    }, k = () => U();
    return document.addEventListener("visibilitychange", H), window.addEventListener("focus", k), () => {
      document.removeEventListener("visibilitychange", H), window.removeEventListener("focus", k);
    };
  }, [m]), M.useEffect(() => {
    const U = Md();
    if (!U) return;
    let H = !1;
    return xv(U).then((k) => {
      if (!H) {
        if (k.status === "queued" || k.status === "running") {
          p(Wd()), m(U);
          return;
        }
        ru(), p(Td(k));
      }
    }).catch(() => {
    }), () => {
      H = !0;
    };
  }, [m]), M.useEffect(() => () => {
    g.current?.(), g.current = null;
  }, []);
  const z = M.useMemo(
    () => ({
      params: a,
      imageRef: o,
      imageName: u,
      generate: h,
      updateParam: v,
      applyParams: x,
      setImage: S,
      clearImage: C,
      startJob: N,
      cancelJob: j,
      resetGenerate: T,
      showJobResult: w
    }),
    [
      a,
      o,
      u,
      h,
      v,
      x,
      S,
      C,
      N,
      j,
      T,
      w
    ]
  );
  return /* @__PURE__ */ R.jsx(tx.Provider, { value: z, children: t });
}
function Bo() {
  const t = M.useContext(tx);
  if (!t)
    throw new Error("useGenerateRequest must be used within GenerateRequestProvider");
  return t;
}
function nx() {
  const { imageRef: t, generate: a, startJob: l, cancelJob: o } = Bo(), s = !t, u = a.phase === "running", f = M.useCallback(async () => {
    if (s) {
      Pl.error("Upload an input image before generating.");
      return;
    }
    try {
      await l(), Pl.success("Generation started.");
    } catch (p) {
      const g = p instanceof Iu ? p.message : "Could not start the generation.";
      Pl.error(g);
    }
  }, [s, l]), h = M.useCallback(async () => {
    try {
      await o();
    } catch {
      Pl.error("Could not cancel the generation.");
    }
  }, [o]);
  return M.useEffect(() => K2(() => void f()), [f]), M.useEffect(() => {
    Q2({ busy: u, blocked: s });
  }, [u, s]), { blocked: s, busy: u, submit: f, cancel: h };
}
const vD = {
  load: "Load model",
  encode: "Encode image",
  sparse: "Sparse structure",
  shape: "Shape",
  texture: "Texture",
  decode: "Decode mesh",
  glb: "Export GLB"
}, bD = {
  load: "Weights → VRAM",
  encode: "DINOv3 features",
  sparse: "O-Voxel layout",
  shape: "Structured latents",
  texture: "Albedo bake",
  decode: "Watertight mesh",
  glb: "glTF artifact"
}, xD = 220, SD = 80;
function wD({
  stageStates: t,
  textureEnabled: a
}) {
  const l = Hi.filter(
    (u) => u !== "texture" || a
  ), o = l.map((u, f) => ({
    id: u,
    type: "dagStage",
    position: { x: f * xD, y: SD },
    data: {
      label: vD[u],
      caption: bD[u],
      state: t[u],
      index: f,
      total: l.length
    }
  })), s = [];
  for (let u = 1; u < l.length; u += 1) {
    const f = l[u - 1], h = l[u];
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
var ED = "_1igljo10", _D = "_1igljo11", ND = "_1igljo12", MD = "_1igljo13", TD = "_1igljo14", CD = "_1igljo15", RD = "_1igljo16", AD = "_1igljo17", DD = { idle: "m9fvj82 m9fvj81", active: "m9fvj83 m9fvj81", done: "m9fvj84 m9fvj81", error: "m9fvj85 m9fvj81" }, zD = "m9fvj86", OD = "m9fvj87", LD = { idle: "m9fvj89 m9fvj88", active: "m9fvj8a m9fvj88", done: "m9fvj8b m9fvj88", error: "m9fvj8c m9fvj88" }, jD = { idle: "m9fvj8f m9fvj8e", active: "m9fvj8g m9fvj8e", done: "m9fvj8h m9fvj8e", error: "m9fvj8i m9fvj8e" }, HD = "m9fvj8j", BD = "m9fvj8k", Sv = "m9fvj8l";
const UD = {
  idle: "idle",
  active: "running",
  done: "done",
  error: "failed"
};
function kD({ data: t }) {
  const a = t, { state: l } = a, o = `${a.index + 1}/${a.total}`;
  return /* @__PURE__ */ R.jsxs("div", { className: DD[l], children: [
    /* @__PURE__ */ R.jsx(ur, { type: "target", position: Ce.Left, className: Sv }),
    /* @__PURE__ */ R.jsxs("div", { className: zD, children: [
      /* @__PURE__ */ R.jsx("span", { className: OD, children: o }),
      /* @__PURE__ */ R.jsxs("span", { className: LD[l], children: [
        /* @__PURE__ */ R.jsx("span", { className: jD[l], "aria-hidden": "true" }),
        UD[l]
      ] })
    ] }),
    /* @__PURE__ */ R.jsx("span", { className: HD, children: a.label }),
    /* @__PURE__ */ R.jsx("span", { className: BD, children: a.caption }),
    /* @__PURE__ */ R.jsx(ur, { type: "source", position: Ce.Right, className: Sv })
  ] });
}
const YD = {
  dagStage: kD
}, VD = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, qD = {
  load: "Load model",
  encode: "Encode image",
  sparse: "Sparse structure",
  shape: "Shape",
  texture: "Texture",
  decode: "Decode mesh",
  glb: "Export GLB"
};
function GD() {
  const { params: t, generate: a } = Bo(), { busy: l, blocked: o, submit: s, cancel: u } = nx(), f = !!t.texture, h = M.useMemo(
    () => wD({ stageStates: a.stageStates, textureEnabled: f }),
    [a.stageStates, f]
  ), p = Hi.filter(
    (g) => g !== "texture" || f
  );
  return /* @__PURE__ */ R.jsxs("div", { className: ED, children: [
    /* @__PURE__ */ R.jsx("div", { className: _D, children: /* @__PURE__ */ R.jsx(
      vA,
      {
        nodes: h.nodes,
        edges: h.edges,
        nodeTypes: YD,
        ariaLabel: "TRELLIS 2 image-to-3D workflow graph"
      }
    ) }),
    /* @__PURE__ */ R.jsx("div", { className: ND, children: /* @__PURE__ */ R.jsxs(
      pu,
      {
        elevation: "raised",
        title: "Workflow",
        description: "load → encode → sparse → shape → texture → decode → glb. Live state mirrors the worker.",
        children: [
          /* @__PURE__ */ R.jsx("div", { className: MD, children: p.map((g, y) => /* @__PURE__ */ R.jsxs("div", { className: TD, children: [
            /* @__PURE__ */ R.jsxs("span", { className: CD, children: [
              /* @__PURE__ */ R.jsx("span", { className: RD, children: String(y + 1).padStart(2, "0") }),
              /* @__PURE__ */ R.jsx("span", { children: qD[g] })
            ] }),
            /* @__PURE__ */ R.jsx(ex, { tone: VD[a.stageStates[g]], children: a.stageStates[g] })
          ] }, g)) }),
          /* @__PURE__ */ R.jsx("div", { className: AD, children: l ? /* @__PURE__ */ R.jsx(Ja, { variant: "danger", onClick: () => void u(), children: "Cancel generation" }) : /* @__PURE__ */ R.jsx(Ja, { onClick: () => void s(), disabled: o, children: "Generate" }) })
        ]
      }
    ) })
  ] });
}
function XD(t) {
  const [a, l] = M.useState([]), [o, s] = M.useState(!0), [u, f] = M.useState(0), h = M.useCallback(() => f((g) => g + 1), []), p = M.useCallback(async (g) => {
    l((y) => y.filter((m) => m.id !== g)), await gD(g);
  }, []);
  return M.useEffect(() => {
    let g = !1;
    return s(!0), mD().then((y) => {
      g || l(y.jobs);
    }).catch(() => {
    }).finally(() => {
      g || s(!1);
    }), () => {
      g = !0;
    };
  }, [u, t]), { jobs: a, loading: o, reload: h, remove: p };
}
var $D = "qi7dyl0", ZD = "qi7dyl1", QD = "qi7dyl2", KD = "qi7dyl3", ax = "qi7dyl4", ID = "qi7dyl5", FD = "qi7dyl7 qi7dyl6", JD = "qi7dyl8 qi7dyl6", wv = "qi7dyl9", PD = "qi7dyla", WD = "qi7dylb", ez = "qi7dylc", tz = "qi7dyld";
function Ev({
  spec: t,
  value: a,
  error: l,
  onChange: o,
  disabled: s = !1
}) {
  const u = M.useId(), f = `${u}-help`, h = l ? `${u}-error` : f;
  return /* @__PURE__ */ R.jsxs("div", { className: $D, children: [
    /* @__PURE__ */ R.jsxs("div", { className: ZD, children: [
      /* @__PURE__ */ R.jsx("label", { className: QD, htmlFor: u, children: t.label }),
      t.control === "slider" && /* @__PURE__ */ R.jsx("span", { className: KD, children: az(a, t.step) })
    ] }),
    nz(t, a, o, u, h, l !== void 0, s),
    /* @__PURE__ */ R.jsx("span", { id: f, className: ax, children: t.help }),
    l && /* @__PURE__ */ R.jsx("span", { id: `${u}-error`, role: "alert", className: ID, children: l })
  ] });
}
function nz(t, a, l, o, s, u, f) {
  switch (t.control) {
    case "toggle": {
      const h = !!a;
      return /* @__PURE__ */ R.jsxs("div", { className: WD, children: [
        /* @__PURE__ */ R.jsx(
          "button",
          {
            type: "button",
            id: o,
            role: "switch",
            "aria-checked": h,
            "aria-describedby": s,
            disabled: f,
            className: ez,
            onClick: () => l(!h),
            children: /* @__PURE__ */ R.jsx("span", { className: tz, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ R.jsx("span", { className: ax, children: h ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ R.jsx(
        "select",
        {
          id: o,
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: f,
          className: [JD, u ? wv : ""].filter(Boolean).join(" "),
          value: String(a ?? t.default ?? ""),
          onChange: (h) => l(t.numeric ? Number(h.target.value) : h.target.value),
          children: t.options?.map((h) => /* @__PURE__ */ R.jsx("option", { value: h.value, children: h.label }, h.value))
        }
      );
    case "slider": {
      const h = _v(a, t), p = t.min ?? 0, g = t.max ?? 100, m = { "--trellis2-slider-fill": `${g > p ? (h - p) / (g - p) * 100 : 0}%` };
      return /* @__PURE__ */ R.jsx(
        "input",
        {
          id: o,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: f,
          className: PD,
          style: m,
          min: t.min,
          max: t.max,
          step: t.step,
          value: h,
          onChange: (v) => l(Number(v.target.value))
        }
      );
    }
    default:
      return /* @__PURE__ */ R.jsx(
        "input",
        {
          id: o,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: f,
          className: [FD, u ? wv : ""].filter(Boolean).join(" "),
          min: t.min,
          max: t.max,
          step: t.step,
          value: _v(a, t),
          onChange: (h) => l(Number(h.target.value))
        }
      );
  }
}
function _v(t, a) {
  return typeof t == "number" && Number.isFinite(t) ? t : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function az(t, a) {
  return typeof t != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(t) ? String(t) : t.toFixed(2) : t.toFixed(a >= 0.1 ? 1 : 2);
}
const ix = [
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
    advanced: !0,
    gate: { key: "pipeline_type", in: ["1536_cascade"] }
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
], iz = ix.filter(
  (t) => !t.advanced
), lz = ix.filter(
  (t) => t.advanced
);
function rz(t, a) {
  return t.gate ? t.gate.in.includes(String(a[t.gate.key])) : !0;
}
const oz = [
  "pipeline_type",
  "sparse_steps",
  "shape_steps",
  "texture_steps",
  "texture_size",
  "max_num_tokens",
  "simplify_target"
], lx = [
  {
    id: "fast",
    label: "Fast",
    hint: "512 · quick draft",
    params: {
      pipeline_type: "512",
      sparse_steps: 8,
      shape_steps: 8,
      texture_steps: 8,
      texture_size: 1024,
      max_num_tokens: 49152,
      simplify_target: 1e5
    }
  },
  {
    id: "balanced",
    label: "Balanced",
    hint: "1024 cascade · default",
    params: {
      pipeline_type: "1024_cascade",
      sparse_steps: 12,
      shape_steps: 12,
      texture_steps: 12,
      texture_size: 2048,
      max_num_tokens: 49152,
      simplify_target: 1e6
    }
  },
  {
    id: "max",
    label: "Max detail",
    hint: "1536 cascade · slow",
    params: {
      pipeline_type: "1536_cascade",
      sparse_steps: 20,
      shape_steps: 25,
      texture_steps: 25,
      texture_size: 4096,
      max_num_tokens: 98304,
      simplify_target: 1e6
    }
  }
];
function sz(t) {
  for (const a of lx)
    if (oz.every((l) => t[l] === a.params[l]))
      return a.id;
  return null;
}
var uz = "dab3al0", cz = "dab3al1", fz = "dab3al2", dz = "dab3al3", hz = "dab3al4", mz = "dab3al5", gz = "dab3al6", pz = "dab3al7", yz = "dab3al8";
function vz(t, a) {
  const l = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (l.length === 0) return !0;
  const o = t.name.toLowerCase(), s = t.type.toLowerCase();
  return l.some((u) => u.startsWith(".") ? o.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function bz(t, a, l) {
  return a && !vz(t, a) ? `"${t.name}" is not an accepted file type.` : l !== void 0 && t.size > l ? `"${t.name}" exceeds the maximum size.` : null;
}
function xz({
  accept: t,
  maxSizeBytes: a,
  disabled: l = !1,
  label: o,
  hint: s,
  ariaLabel: u,
  className: f,
  renderPreview: h,
  onFile: p
}) {
  const g = M.useRef(null), y = M.useId(), m = M.useId(), [v, x] = M.useState(!1), [S, C] = M.useState(null), [T, N] = M.useState(null), j = M.useCallback(
    (le) => {
      const K = le?.[0];
      if (!K) return;
      const J = bz(K, t, a);
      if (J) {
        C(J);
        return;
      }
      C(null), N(K), p(K);
    },
    [t, a, p]
  ), w = M.useCallback(() => {
    l || g.current?.click();
  }, [l]), z = M.useCallback(
    (le) => {
      l || (le.key === "Enter" || le.key === " ") && (le.preventDefault(), w());
    },
    [l, w]
  ), U = M.useCallback(
    (le) => {
      le.preventDefault(), x(!1), !l && j(le.dataTransfer.files);
    },
    [l, j]
  ), H = M.useCallback(
    (le) => {
      le.preventDefault(), l || x(!0);
    },
    [l]
  ), k = M.useCallback((le) => {
    le.preventDefault(), x(!1);
  }, []), D = [s ? m : null, S ? y : null].filter(Boolean).join(" "), Q = [
    uz,
    v ? cz : "",
    l ? fz : "",
    S !== null ? dz : "",
    f
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ R.jsxs("div", { children: [
    /* @__PURE__ */ R.jsxs(
      "div",
      {
        role: "button",
        tabIndex: l ? -1 : 0,
        "aria-label": u ?? "image dropzone",
        "aria-disabled": l,
        "aria-describedby": D || void 0,
        className: Q,
        onClick: w,
        onKeyDown: z,
        onDrop: U,
        onDragOver: H,
        onDragLeave: k,
        children: [
          /* @__PURE__ */ R.jsx(
            "input",
            {
              ref: g,
              type: "file",
              className: hz,
              accept: t,
              disabled: l,
              tabIndex: -1,
              onChange: (le) => j(le.target.files)
            }
          ),
          h && T ? /* @__PURE__ */ R.jsx("div", { className: yz, children: h(T) }) : /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
            /* @__PURE__ */ R.jsx("span", { className: mz, children: o ?? (v ? "Drop to upload" : "Drop an image or click to browse") }),
            s && /* @__PURE__ */ R.jsx("span", { id: m, className: gz, children: s })
          ] })
        ]
      }
    ),
    S && /* @__PURE__ */ R.jsx("div", { id: y, role: "alert", className: pz, children: S })
  ] });
}
function Sz(t) {
  const [a, l] = M.useState(null);
  return M.useEffect(() => {
    if (!t) {
      l(null);
      return;
    }
    const o = URL.createObjectURL(t);
    return l(o), () => URL.revokeObjectURL(o);
  }, [t]), a;
}
async function wz(t) {
  const a = new FormData();
  a.append("file", t);
  const l = await fetch(`${Fu}/uploads`, { method: "POST", body: a });
  if (!l.ok) {
    let o = null;
    try {
      o = await l.json();
    } catch {
      o = null;
    }
    throw new Iu(
      l.status,
      o?.category ?? "unknown",
      o?.message ?? l.statusText,
      o?.requestId
    );
  }
  return await l.json();
}
var Ez = "_16wbbp30", _z = "_16wbbp31", Nz = "_16wbbp32", Mz = "_16wbbp33", Tz = "_16wbbp34", Cz = "_16wbbp35", Rz = "_16wbbp37";
const Az = 32 * 1024 * 1024, Dz = "image/png,image/jpeg,image/webp";
function zz() {
  const { imageRef: t, imageName: a, setImage: l, clearImage: o } = Bo(), [s, u] = M.useState(null), [f, h] = M.useState(!1), p = Sz(s), g = M.useCallback(
    async (m) => {
      u(m), h(!0);
      try {
        const { ref: v } = await wz(m);
        l(v, m.name);
      } catch (v) {
        const x = v instanceof Iu ? v.message : "Upload failed — try again.";
        Pl.error(x), u(null);
      } finally {
        h(!1);
      }
    },
    [l]
  ), y = M.useCallback(() => {
    u(null), o();
  }, [o]);
  return t && a ? /* @__PURE__ */ R.jsx("div", { className: Ez, children: /* @__PURE__ */ R.jsxs("div", { className: _z, children: [
    p ? /* @__PURE__ */ R.jsx("img", { className: Nz, src: p, alt: a }) : null,
    /* @__PURE__ */ R.jsxs("div", { className: Mz, children: [
      /* @__PURE__ */ R.jsx("span", { className: Tz, children: a }),
      /* @__PURE__ */ R.jsx("span", { className: Cz, children: t })
    ] }),
    /* @__PURE__ */ R.jsx(Ja, { variant: "ghost", size: "sm", onClick: y, children: "Replace" })
  ] }) }) : /* @__PURE__ */ R.jsx(
    xz,
    {
      accept: Dz,
      maxSizeBytes: Az,
      disabled: f,
      ariaLabel: "input image",
      label: f ? "Uploading…" : "Drop an image or click to browse",
      hint: "PNG, JPEG or WebP · single subject on a clean background works best",
      onFile: (m) => void g(m),
      renderPreview: (m) => p ? /* @__PURE__ */ R.jsx("img", { className: Rz, src: p, alt: m.name }) : null
    }
  );
}
var Oz = "_1dyscui0", Cd = "_1dyscui1", Nv = "_1dyscui2", Lz = "_1dyscui3", jz = "_1dyscui4", Hz = "_1dyscui5", Bz = "_1dyscui6", Uz = "_1dyscui7", kz = "_1dyscui8", Yz = "_1dyscui9", Vz = "_1dyscuia", qz = "_1dyscuib", Gz = "_1dyscuic", Xz = "_1dyscuid", $z = "_1dyscuie", Zz = "_1dyscuif", Qz = "_1dyscuig";
const Kz = /* @__PURE__ */ new Set(["pipeline_type", "residency"]);
function Iz() {
  const { params: t, generate: a, updateParam: l, applyParams: o } = Bo(), s = a.phase === "running", [u, f] = M.useState(!1), h = M.useId(), p = sz(t);
  return /* @__PURE__ */ R.jsxs("div", { className: Oz, children: [
    /* @__PURE__ */ R.jsx("span", { className: Cd, children: "Input image" }),
    /* @__PURE__ */ R.jsx(zz, {}),
    /* @__PURE__ */ R.jsx("span", { className: Cd, children: "Quality preset" }),
    /* @__PURE__ */ R.jsx("div", { className: Lz, children: lx.map((y) => /* @__PURE__ */ R.jsxs(
      "button",
      {
        type: "button",
        disabled: s,
        className: jz,
        "data-active": p === y.id,
        "aria-pressed": p === y.id,
        onClick: () => o(y.params),
        children: [
          /* @__PURE__ */ R.jsx("span", { className: Hz, children: y.label }),
          /* @__PURE__ */ R.jsx("span", { className: Bz, children: y.hint })
        ]
      },
      y.id
    )) }),
    /* @__PURE__ */ R.jsx("span", { className: Cd, children: "Generation" }),
    /* @__PURE__ */ R.jsx("div", { className: Nv, children: iz.map((y) => /* @__PURE__ */ R.jsx(
      Ev,
      {
        spec: y,
        value: t[y.key],
        disabled: s,
        onChange: (m) => g(y.key, m)
      },
      y.key
    )) }),
    /* @__PURE__ */ R.jsxs("div", { className: Uz, children: [
      /* @__PURE__ */ R.jsxs("div", { className: kz, children: [
        /* @__PURE__ */ R.jsx("span", { className: Yz, children: "Bake texture" }),
        /* @__PURE__ */ R.jsx("span", { className: Vz, children: "Off exports a MeshOnly GLB. On runs the texture pass (slower, larger file)." })
      ] }),
      /* @__PURE__ */ R.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": !!t.texture,
          "aria-label": "Bake texture",
          disabled: s,
          className: qz,
          onClick: () => l("texture", !t.texture),
          children: /* @__PURE__ */ R.jsx("span", { className: Gz, "aria-hidden": "true" })
        }
      )
    ] }),
    /* @__PURE__ */ R.jsxs("section", { className: Xz, children: [
      /* @__PURE__ */ R.jsxs(
        "button",
        {
          type: "button",
          className: $z,
          "aria-expanded": u,
          "aria-controls": h,
          onClick: () => f((y) => !y),
          children: [
            /* @__PURE__ */ R.jsx("span", { className: Zz, children: "Advanced / Quality" }),
            /* @__PURE__ */ R.jsx("span", { className: Qz, "data-open": u, "aria-hidden": "true", children: "expand_more" })
          ]
        }
      ),
      u && /* @__PURE__ */ R.jsx("div", { id: h, className: Nv, children: lz.map((y) => /* @__PURE__ */ R.jsx(
        Ev,
        {
          spec: y,
          value: t[y.key],
          disabled: s || !rz(y, t),
          onChange: (m) => g(y.key, m)
        },
        y.key
      )) })
    ] })
  ] });
  function g(y, m) {
    if (Kz.has(y) && typeof m == "string") {
      l(y, m);
      return;
    }
    typeof m == "number" && l(y, m);
  }
}
var Fz = "_11e6dkm0", Jz = "_11e6dkm1", Pz = "_11e6dkm3";
function Wz({ url: t, alt: a, className: l }) {
  const [o, s] = M.useState(
    () => typeof customElements < "u" && !!customElements.get("model-viewer")
  ), [u, f] = M.useState(!1), h = M.useRef(null);
  return M.useEffect(() => {
    let p = !1;
    if (!o)
      return import("./model-viewer-CRo-xH2b.js").then(() => {
        p || s(!0);
      }).catch(() => {
      }), () => {
        p = !0;
      };
  }, [o]), M.useEffect(() => {
    f(!1);
    const p = h.current;
    if (!o || !p || p.getAttribute("src") !== t) return;
    const g = () => f(!0);
    return p.addEventListener("load", g), () => p.removeEventListener("load", g);
  }, [o, t]), /* @__PURE__ */ R.jsxs("div", { className: [Fz, l].filter(Boolean).join(" "), children: [
    o ? /* @__PURE__ */ R.jsx(
      "model-viewer",
      {
        ref: h,
        className: Jz,
        src: t,
        alt: a,
        "camera-controls": !0,
        "auto-rotate": !0,
        "shadow-intensity": "1",
        exposure: "1"
      }
    ) : null,
    o && u ? null : /* @__PURE__ */ R.jsx("span", { className: Pz, "aria-hidden": "true", children: "Loading mesh…" })
  ] });
}
var e5 = "gsuv1n0", t5 = "gsuv1n1", n5 = "gsuv1n2";
function eh({ title: t, detail: a, action: l, className: o }) {
  const s = [e5, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ R.jsxs("div", { className: s, children: [
    /* @__PURE__ */ R.jsx("span", { className: t5, children: t }),
    a && /* @__PURE__ */ R.jsx("span", { className: n5, children: a }),
    l
  ] });
}
const Mv = {
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
function a5(t, a) {
  return t !== null && Mv[t] ? Mv[t] : {
    title: "Generation failed",
    hint: a ?? "The worker reported an unexpected error. Check the logs and try again."
  };
}
function rx(t) {
  if (!t) return null;
  const a = t.split("/").map(encodeURIComponent).join("/");
  return `${Fu}/media/${a}`;
}
var Rd = "_1799g9j0", i5 = "_1799g9j1", l5 = "_1799g9j2", r5 = "_1799g9j3", o5 = "_1799g9j4", s5 = "_1799g9j5", u5 = "_1799g9j6", c5 = "_1799g9j7", yu = "_1799g9j8", f5 = "_1799g9j9", d5 = "_1799g9ja", h5 = "_1799g9jb", m5 = "_1799g9jd", g5 = "_1799g9jg", p5 = "_1799g9jh", y5 = "_1799g9ji", v5 = "_1799g9jj", b5 = "_1799g9jk", x5 = "_1799g9jl", S5 = "_1799g9jm";
const w5 = {
  load: "Loading model…",
  encode: "Encoding image (DINOv3)…",
  sparse: "Building sparse structure…",
  shape: "Decoding shape…",
  texture: "Baking texture…",
  decode: "Decoding mesh…",
  glb: "Exporting GLB…"
};
function E5({
  state: t,
  onCancel: a,
  onReset: l
}) {
  const [o, s] = M.useState(!1);
  M.useEffect(() => {
    t.phase !== "running" && s(!1);
  }, [t.phase]);
  const u = M.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (t.phase === "idle")
    return /* @__PURE__ */ R.jsx(
      eh,
      {
        title: "No active generation",
        detail: "Upload an input image and start a generation to see live progress here."
      }
    );
  if (t.phase === "error") {
    const h = a5(t.errorCode, t.errorMessage);
    return /* @__PURE__ */ R.jsxs("div", { className: Rd, children: [
      /* @__PURE__ */ R.jsxs("div", { className: f5, role: "alert", children: [
        /* @__PURE__ */ R.jsx("span", { className: d5, children: h.title }),
        /* @__PURE__ */ R.jsx("span", { className: h5, children: h.hint })
      ] }),
      /* @__PURE__ */ R.jsx("div", { className: yu, children: /* @__PURE__ */ R.jsx(Ja, { variant: "secondary", onClick: l, children: "Dismiss" }) })
    ] });
  }
  if (t.phase === "cancelled")
    return /* @__PURE__ */ R.jsxs("div", { className: Rd, children: [
      /* @__PURE__ */ R.jsx(
        eh,
        {
          title: "Generation cancelled",
          detail: "The generation was stopped before completion."
        }
      ),
      /* @__PURE__ */ R.jsx("div", { className: yu, children: /* @__PURE__ */ R.jsx(Ja, { variant: "secondary", onClick: l, children: "Reset" }) })
    ] });
  if (t.phase === "done")
    return /* @__PURE__ */ R.jsx(_5, { state: t, onReset: l });
  const f = Math.round(t.overallFraction * 100);
  return /* @__PURE__ */ R.jsxs("div", { className: Rd, children: [
    /* @__PURE__ */ R.jsx("output", { className: i5, "aria-live": "polite", children: N5(t) }),
    /* @__PURE__ */ R.jsx(
      "div",
      {
        className: l5,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": f,
        children: /* @__PURE__ */ R.jsx(
          "div",
          {
            className: r5,
            style: { transform: `scaleX(${Math.max(0.02, t.overallFraction)})` }
          }
        )
      }
    ),
    /* @__PURE__ */ R.jsxs("div", { className: o5, "aria-live": "polite", children: [
      /* @__PURE__ */ R.jsx(Ad, { label: "Overall", value: `${f}%` }),
      /* @__PURE__ */ R.jsx(Ad, { label: "Stage", value: t.stage ? ox(t.stage) : "—" }),
      /* @__PURE__ */ R.jsx(
        Ad,
        {
          label: "Step",
          value: t.totalSteps ? `${t.step} / ${t.totalSteps}` : "—"
        }
      )
    ] }),
    /* @__PURE__ */ R.jsx("div", { className: yu, children: /* @__PURE__ */ R.jsx(Ja, { variant: "danger", onClick: u, loading: o, disabled: o, children: o ? "Cancelling…" : "Cancel generation" }) })
  ] });
}
function _5({
  state: t,
  onReset: a
}) {
  const l = rx(t.glbRef), o = t.glbRef ? `${t.glbRef}.glb` : "mesh.glb";
  return /* @__PURE__ */ R.jsxs("output", { className: m5, children: [
    l ? /* @__PURE__ */ R.jsx(Wz, { url: l, alt: "Generated 3D mesh preview" }) : /* @__PURE__ */ R.jsx("div", { className: g5, "aria-hidden": "true", children: "3D" }),
    /* @__PURE__ */ R.jsxs("div", { className: p5, children: [
      /* @__PURE__ */ R.jsx(M5, { metadata: t.metadata, glbRef: t.glbRef }),
      l ? /* @__PURE__ */ R.jsx("a", { className: S5, href: l, download: o, children: "Download GLB" }) : null
    ] }),
    /* @__PURE__ */ R.jsx("div", { className: yu, children: /* @__PURE__ */ R.jsx(Ja, { variant: "secondary", onClick: a, children: "New generation" }) })
  ] });
}
function ox(t) {
  return t.replace(/[_-]+/g, " ");
}
function N5(t) {
  return t.stage ? w5[t.stage] ?? `${ox(t.stage)}…` : "Starting worker…";
}
function Ad({ label: t, value: a }) {
  return /* @__PURE__ */ R.jsxs("div", { className: s5, children: [
    /* @__PURE__ */ R.jsx("span", { className: u5, children: t }),
    /* @__PURE__ */ R.jsx("span", { className: c5, children: a })
  ] });
}
function M5({
  metadata: t,
  glbRef: a
}) {
  const l = [];
  if (t) {
    const o = t.mesh?.vertices, s = t.mesh?.faces;
    typeof o == "number" && l.push(["Vertices", o.toLocaleString()]), typeof s == "number" && l.push(["Faces", s.toLocaleString()]), typeof t.textured == "boolean" && l.push(["Texture", t.textured ? "baked" : "none"]), typeof t.attention_backend == "string" && l.push(["Attention", t.attention_backend]), typeof t.compute_cap == "string" && l.push(["Compute cap", t.compute_cap]);
    const u = T5(t.stage_timings);
    u !== null && l.push(["Duration", `${(u / 1e3).toFixed(1)}s`]), typeof t.sha256 == "string" && l.push(["sha256", `${t.sha256.slice(0, 16)}…`]);
  }
  return a && l.push(["Artifact", a]), l.length === 0 ? null : /* @__PURE__ */ R.jsx("div", { className: y5, children: l.map(([o, s]) => /* @__PURE__ */ R.jsxs("div", { className: v5, children: [
    /* @__PURE__ */ R.jsx("span", { className: b5, children: o }),
    /* @__PURE__ */ R.jsx("span", { className: x5, children: s })
  ] }, o)) });
}
function T5(t) {
  if (!t) return null;
  const a = Object.values(t).filter((l) => typeof l == "number");
  return a.length === 0 ? null : a.reduce((l, o) => l + o, 0);
}
var C5 = "_16ts7i00", R5 = "_16ts7i01", A5 = "_16ts7i03", D5 = "_16ts7i04", z5 = "_16ts7i05", O5 = "_16ts7i06", L5 = "_16ts7i07", j5 = "_16ts7i08", H5 = "_16ts7i09", B5 = "_16ts7i0b _16ts7i0a", U5 = "_16ts7i0c", k5 = "_16ts7i0d _16ts7i0a", Y5 = "_16ts7i0e";
const V5 = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function q5({ jobs: t, onOpen: a, onDelete: l }) {
  return t.length === 0 ? /* @__PURE__ */ R.jsx(
    eh,
    {
      title: "No meshes yet",
      detail: "Completed generations appear here with their preview, parameters and a GLB download."
    }
  ) : /* @__PURE__ */ R.jsx("div", { className: C5, children: t.map((o) => {
    const s = rx(o.glbRef);
    return /* @__PURE__ */ R.jsxs("div", { className: R5, children: [
      /* @__PURE__ */ R.jsx("span", { className: A5, "aria-hidden": "true", children: "3D" }),
      /* @__PURE__ */ R.jsxs("button", { type: "button", className: D5, onClick: () => a(o), children: [
        /* @__PURE__ */ R.jsxs("span", { className: z5, children: [
          /* @__PURE__ */ R.jsx("span", { className: O5, children: o.id }),
          /* @__PURE__ */ R.jsx("span", { className: L5, children: X5(o) })
        ] }),
        /* @__PURE__ */ R.jsxs("span", { className: j5, children: [
          /* @__PURE__ */ R.jsx(
            "time",
            {
              className: H5,
              dateTime: o.createdAt,
              title: $5(o.createdAt),
              children: Z5(o.createdAt)
            }
          ),
          /* @__PURE__ */ R.jsx(ex, { tone: V5[o.status], children: o.status })
        ] })
      ] }),
      /* @__PURE__ */ R.jsxs(
        "a",
        {
          className: [B5, s ? "" : U5].filter(Boolean).join(" "),
          href: s ?? void 0,
          download: s ? `${o.glbRef}.glb` : void 0,
          "aria-disabled": s ? void 0 : !0,
          tabIndex: s ? 0 : -1,
          "aria-label": `Download GLB for ${o.id}`,
          title: "Download GLB",
          children: [
            /* @__PURE__ */ R.jsx("svg", { viewBox: "0 0 24 24", width: "16", height: "16", "aria-hidden": "true", children: /* @__PURE__ */ R.jsx(
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
            /* @__PURE__ */ R.jsx("span", { className: Y5, children: "Download GLB" })
          ]
        }
      ),
      /* @__PURE__ */ R.jsx(
        "button",
        {
          type: "button",
          className: k5,
          "aria-label": `Delete ${o.id} from history`,
          title: "Delete from history",
          onClick: () => l(o),
          children: /* @__PURE__ */ R.jsxs("svg", { viewBox: "0 0 24 24", width: "15", height: "15", "aria-hidden": "true", children: [
            /* @__PURE__ */ R.jsx("title", { children: "delete" }),
            /* @__PURE__ */ R.jsx(
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
const G5 = M.memo(q5);
function X5(t) {
  const a = t.params, l = [];
  typeof a.seed == "number" && l.push(`seed ${a.seed}`), typeof a.sparse_steps == "number" && l.push(`${a.sparse_steps} sparse`), a.texture && l.push("textured");
  const o = t.metadata?.mesh?.faces;
  return typeof o == "number" && l.push(`${o.toLocaleString()} faces`), l.join(" · ") || "—";
}
function $5(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
function Z5(t) {
  const a = new Date(t), l = a.getTime();
  if (Number.isNaN(l)) return "";
  const o = Date.now() - l;
  if (o < 0) return "just now";
  const s = Math.floor(o / 6e4);
  if (s < 1) return "just now";
  if (s < 60) return `${s}m ago`;
  const u = Math.floor(s / 60);
  if (u < 24) return `${u}h ago`;
  const f = Math.floor(u / 24);
  return f < 7 ? `${f}d ago` : a.toLocaleDateString();
}
var Q5 = "_174fijm0", Tv = "_174fijm1", K5 = "_174fijm2";
function I5() {
  const { generate: t, resetGenerate: a, showJobResult: l } = Bo(), { blocked: o, busy: s, submit: u, cancel: f } = nx(), h = XD(t.phase), p = M.useCallback(
    (y) => {
      l(y);
    },
    [l]
  ), g = M.useCallback(
    async (y) => {
      try {
        await h.remove(y.id);
      } catch {
        Pl.error("Could not delete that generation."), h.reload();
      }
    },
    [h]
  );
  return /* @__PURE__ */ R.jsxs("div", { className: Q5, children: [
    /* @__PURE__ */ R.jsxs("div", { className: Tv, children: [
      /* @__PURE__ */ R.jsxs(
        pu,
        {
          eyebrow: "OPERATOR · TRELLIS2.GENERATE_3D",
          title: "New mesh",
          description: "One image in, one watertight GLB out.",
          children: [
            /* @__PURE__ */ R.jsx(Iz, {}),
            /* @__PURE__ */ R.jsx("div", { className: K5, children: s ? /* @__PURE__ */ R.jsx(Ja, { variant: "danger", onClick: () => void f(), children: "Cancel generation" }) : /* @__PURE__ */ R.jsx(Ja, { onClick: () => void u(), disabled: o, children: "Generate" }) })
          ]
        }
      ),
      /* @__PURE__ */ R.jsx(pu, { elevation: "raised", title: "Progress", description: "Live state mirrors the worker.", children: /* @__PURE__ */ R.jsx(E5, { state: t, onCancel: () => void f(), onReset: a }) })
    ] }),
    /* @__PURE__ */ R.jsx("div", { className: Tv, children: /* @__PURE__ */ R.jsx(pu, { title: "History", description: "Past generations and their GLB downloads.", children: /* @__PURE__ */ R.jsx(G5, { jobs: h.jobs, onOpen: p, onDelete: g }) }) })
  ] });
}
var F5 = "_126eaw50", J5 = "_126eaw51", P5 = "_126eaw52", W5 = "_126eaw53", e4 = "_126eaw54", t4 = "_126eaw55", n4 = "_126eaw56", a4 = "_126eaw57", i4 = "_126eaw58", l4 = "_126eaw59";
const r4 = [
  { to: "generate", label: "Generate" },
  { to: "dag", label: "Workflow" }
];
function o4() {
  const { deploymentId: t } = XE(), a = t ? `/${t}` : "";
  return /* @__PURE__ */ R.jsxs(yD, { children: [
    /* @__PURE__ */ R.jsxs("div", { className: F5, children: [
      /* @__PURE__ */ R.jsxs("header", { className: J5, children: [
        /* @__PURE__ */ R.jsxs("div", { className: P5, children: [
          /* @__PURE__ */ R.jsx("span", { className: W5, children: "GENERATIVE SURFACE · IMAGE TO 3D" }),
          /* @__PURE__ */ R.jsx("h1", { className: e4, children: "TRELLIS 2" }),
          /* @__PURE__ */ R.jsx("p", { className: t4, children: "Turn a single image into a watertight 3D mesh with Microsoft TRELLIS.2. Upload a subject, tune the flow, and export a GLB." })
        ] }),
        /* @__PURE__ */ R.jsx("nav", { className: n4, "aria-label": "Workspace sections", children: r4.map((l) => /* @__PURE__ */ R.jsx(
          fb,
          {
            to: `${a}/${l.to}`,
            className: ({ isActive: o }) => [a4, o ? i4 : ""].filter(Boolean).join(" "),
            children: l.label
          },
          l.to
        )) })
      ] }),
      /* @__PURE__ */ R.jsx("main", { className: l4, children: /* @__PURE__ */ R.jsx(h2, {}) })
    ] }),
    /* @__PURE__ */ R.jsx(lD, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function s4() {
  return [
    {
      path: "/",
      loader: () => j0("/default/generate")
    },
    {
      path: "/:deploymentId",
      Component: o4,
      children: [
        {
          index: !0,
          loader: ({ params: t }) => j0(`/${u4(t, "deploymentId")}/generate`)
        },
        { path: "generate", Component: I5 },
        { path: "dag", Component: GD }
      ]
    }
  ];
}
function u4(t, a) {
  const l = t[a];
  if (!l)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return l;
}
const th = "trellis2-app", c4 = "ext-event", Cv = "trellis2-stylesheet", Rv = ["accent", "density", "card"];
function f4(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function d4() {
  if (typeof document > "u" || document.getElementById(Cv)) return;
  const t = new URL("./trellis2.css", import.meta.url).href, a = document.createElement("link");
  a.id = Cv, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
d4();
class h4 extends HTMLElement {
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
    this.root = Ew.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(ry, this.navigateListener), this.navigateListener = null), this.router = null, this.paintedEntry = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = P2(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (l) => {
      const o = l.detail?.path;
      o && this.router && this.router.navigate(o);
    };
    this.navigateListener = a, this.addEventListener(ry, a);
  }
  syncTweaksFromBody() {
    for (const a of Rv) {
      const l = f4(a);
      l === void 0 ? delete this.dataset[a] : this.dataset[a] !== l && (this.dataset[a] = l);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Rv.map((a) => `data-${a}`)
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
    const l = s2(s4(), { initialEntries: [a] });
    this.router = l, this.paintedEntry = a, this.root.render(
      /* @__PURE__ */ R.jsx(M.StrictMode, { children: /* @__PURE__ */ R.jsx(c2, { router: l }) })
    );
  }
  resolveInitialEntry() {
    const a = this.getAttribute("route");
    if (a && a.length > 0) return a;
    const l = this.getAttribute("deployment-id");
    return l && l.length > 0 ? `/${l}/generate` : "/";
  }
  emitHostEvent(a, l) {
    this.dispatchEvent(
      new CustomEvent(c4, {
        detail: { topic: a, payload: l },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function m4() {
  typeof customElements > "u" || customElements.get(th) || customElements.define(th, h4);
}
typeof customElements < "u" && !customElements.get(th) && m4();
export {
  m4 as register
};
//# sourceMappingURL=trellis2.js.map
