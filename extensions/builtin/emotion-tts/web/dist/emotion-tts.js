function iE(n, a) {
  for (var r = 0; r < a.length; r++) {
    const s = a[r];
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
function xb(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Fd = { exports: {} }, Yl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ov;
function rE() {
  if (Ov) return Yl;
  Ov = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function r(s, o, c) {
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
  return Yl.Fragment = a, Yl.jsx = r, Yl.jsxs = r, Yl;
}
var Lv;
function lE() {
  return Lv || (Lv = 1, Fd.exports = rE()), Fd.exports;
}
var f = lE(), Yd = { exports: {} }, Ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uv;
function sE() {
  if (Uv) return Ue;
  Uv = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), S = Symbol.iterator;
  function w(C) {
    return C === null || typeof C != "object" ? null : (C = S && C[S] || C["@@iterator"], typeof C == "function" ? C : null);
  }
  var j = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, T = Object.assign, M = {};
  function N(C, K, Z) {
    this.props = C, this.context = K, this.refs = M, this.updater = Z || j;
  }
  N.prototype.isReactComponent = {}, N.prototype.setState = function(C, K) {
    if (typeof C != "object" && typeof C != "function" && C != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, C, K, "setState");
  }, N.prototype.forceUpdate = function(C) {
    this.updater.enqueueForceUpdate(this, C, "forceUpdate");
  };
  function L() {
  }
  L.prototype = N.prototype;
  function z(C, K, Z) {
    this.props = C, this.context = K, this.refs = M, this.updater = Z || j;
  }
  var _ = z.prototype = new L();
  _.constructor = z, T(_, N.prototype), _.isPureReactComponent = !0;
  var J = Array.isArray;
  function G() {
  }
  var W = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function U(C, K, Z) {
    var re = Z.ref;
    return {
      $$typeof: n,
      type: C,
      key: K,
      ref: re !== void 0 ? re : null,
      props: Z
    };
  }
  function I(C, K) {
    return U(C.type, K, C.props);
  }
  function le(C) {
    return typeof C == "object" && C !== null && C.$$typeof === n;
  }
  function ae(C) {
    var K = { "=": "=0", ":": "=2" };
    return "$" + C.replace(/[=:]/g, function(Z) {
      return K[Z];
    });
  }
  var me = /\/+/g;
  function ge(C, K) {
    return typeof C == "object" && C !== null && C.key != null ? ae("" + C.key) : K.toString(36);
  }
  function oe(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (typeof C.status == "string" ? C.then(G, G) : (C.status = "pending", C.then(
          function(K) {
            C.status === "pending" && (C.status = "fulfilled", C.value = K);
          },
          function(K) {
            C.status === "pending" && (C.status = "rejected", C.reason = K);
          }
        )), C.status) {
          case "fulfilled":
            return C.value;
          case "rejected":
            throw C.reason;
        }
    }
    throw C;
  }
  function O(C, K, Z, re, ce) {
    var ve = typeof C;
    (ve === "undefined" || ve === "boolean") && (C = null);
    var ze = !1;
    if (C === null) ze = !0;
    else
      switch (ve) {
        case "bigint":
        case "string":
        case "number":
          ze = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case n:
            case a:
              ze = !0;
              break;
            case b:
              return ze = C._init, O(
                ze(C._payload),
                K,
                Z,
                re,
                ce
              );
          }
      }
    if (ze)
      return ce = ce(C), ze = re === "" ? "." + ge(C, 0) : re, J(ce) ? (Z = "", ze != null && (Z = ze.replace(me, "$&/") + "/"), O(ce, K, Z, "", function(kt) {
        return kt;
      })) : ce != null && (le(ce) && (ce = I(
        ce,
        Z + (ce.key == null || C && C.key === ce.key ? "" : ("" + ce.key).replace(
          me,
          "$&/"
        ) + "/") + ze
      )), K.push(ce)), 1;
    ze = 0;
    var _e = re === "" ? "." : re + ":";
    if (J(C))
      for (var Be = 0; Be < C.length; Be++)
        re = C[Be], ve = _e + ge(re, Be), ze += O(
          re,
          K,
          Z,
          ve,
          ce
        );
    else if (Be = w(C), typeof Be == "function")
      for (C = Be.call(C), Be = 0; !(re = C.next()).done; )
        re = re.value, ve = _e + ge(re, Be++), ze += O(
          re,
          K,
          Z,
          ve,
          ce
        );
    else if (ve === "object") {
      if (typeof C.then == "function")
        return O(
          oe(C),
          K,
          Z,
          re,
          ce
        );
      throw K = String(C), Error(
        "Objects are not valid as a React child (found: " + (K === "[object Object]" ? "object with keys {" + Object.keys(C).join(", ") + "}" : K) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ze;
  }
  function V(C, K, Z) {
    if (C == null) return C;
    var re = [], ce = 0;
    return O(C, re, "", "", function(ve) {
      return K.call(Z, ve, ce++);
    }), re;
  }
  function q(C) {
    if (C._status === -1) {
      var K = C._result;
      K = K(), K.then(
        function(Z) {
          (C._status === 0 || C._status === -1) && (C._status = 1, C._result = Z);
        },
        function(Z) {
          (C._status === 0 || C._status === -1) && (C._status = 2, C._result = Z);
        }
      ), C._status === -1 && (C._status = 0, C._result = K);
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var Q = typeof reportError == "function" ? reportError : function(C) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var K = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof C == "object" && C !== null && typeof C.message == "string" ? String(C.message) : String(C),
        error: C
      });
      if (!window.dispatchEvent(K)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", C);
      return;
    }
    console.error(C);
  }, te = {
    map: V,
    forEach: function(C, K, Z) {
      V(
        C,
        function() {
          K.apply(this, arguments);
        },
        Z
      );
    },
    count: function(C) {
      var K = 0;
      return V(C, function() {
        K++;
      }), K;
    },
    toArray: function(C) {
      return V(C, function(K) {
        return K;
      }) || [];
    },
    only: function(C) {
      if (!le(C))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return C;
    }
  };
  return Ue.Activity = g, Ue.Children = te, Ue.Component = N, Ue.Fragment = r, Ue.Profiler = o, Ue.PureComponent = z, Ue.StrictMode = s, Ue.Suspense = v, Ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W, Ue.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(C) {
      return W.H.useMemoCache(C);
    }
  }, Ue.cache = function(C) {
    return function() {
      return C.apply(null, arguments);
    };
  }, Ue.cacheSignal = function() {
    return null;
  }, Ue.cloneElement = function(C, K, Z) {
    if (C == null)
      throw Error(
        "The argument must be a React element, but you passed " + C + "."
      );
    var re = T({}, C.props), ce = C.key;
    if (K != null)
      for (ve in K.key !== void 0 && (ce = "" + K.key), K)
        !A.call(K, ve) || ve === "key" || ve === "__self" || ve === "__source" || ve === "ref" && K.ref === void 0 || (re[ve] = K[ve]);
    var ve = arguments.length - 2;
    if (ve === 1) re.children = Z;
    else if (1 < ve) {
      for (var ze = Array(ve), _e = 0; _e < ve; _e++)
        ze[_e] = arguments[_e + 2];
      re.children = ze;
    }
    return U(C.type, ce, re);
  }, Ue.createContext = function(C) {
    return C = {
      $$typeof: h,
      _currentValue: C,
      _currentValue2: C,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, C.Provider = C, C.Consumer = {
      $$typeof: c,
      _context: C
    }, C;
  }, Ue.createElement = function(C, K, Z) {
    var re, ce = {}, ve = null;
    if (K != null)
      for (re in K.key !== void 0 && (ve = "" + K.key), K)
        A.call(K, re) && re !== "key" && re !== "__self" && re !== "__source" && (ce[re] = K[re]);
    var ze = arguments.length - 2;
    if (ze === 1) ce.children = Z;
    else if (1 < ze) {
      for (var _e = Array(ze), Be = 0; Be < ze; Be++)
        _e[Be] = arguments[Be + 2];
      ce.children = _e;
    }
    if (C && C.defaultProps)
      for (re in ze = C.defaultProps, ze)
        ce[re] === void 0 && (ce[re] = ze[re]);
    return U(C, ve, ce);
  }, Ue.createRef = function() {
    return { current: null };
  }, Ue.forwardRef = function(C) {
    return { $$typeof: m, render: C };
  }, Ue.isValidElement = le, Ue.lazy = function(C) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: C },
      _init: q
    };
  }, Ue.memo = function(C, K) {
    return {
      $$typeof: p,
      type: C,
      compare: K === void 0 ? null : K
    };
  }, Ue.startTransition = function(C) {
    var K = W.T, Z = {};
    W.T = Z;
    try {
      var re = C(), ce = W.S;
      ce !== null && ce(Z, re), typeof re == "object" && re !== null && typeof re.then == "function" && re.then(G, Q);
    } catch (ve) {
      Q(ve);
    } finally {
      K !== null && Z.types !== null && (K.types = Z.types), W.T = K;
    }
  }, Ue.unstable_useCacheRefresh = function() {
    return W.H.useCacheRefresh();
  }, Ue.use = function(C) {
    return W.H.use(C);
  }, Ue.useActionState = function(C, K, Z) {
    return W.H.useActionState(C, K, Z);
  }, Ue.useCallback = function(C, K) {
    return W.H.useCallback(C, K);
  }, Ue.useContext = function(C) {
    return W.H.useContext(C);
  }, Ue.useDebugValue = function() {
  }, Ue.useDeferredValue = function(C, K) {
    return W.H.useDeferredValue(C, K);
  }, Ue.useEffect = function(C, K) {
    return W.H.useEffect(C, K);
  }, Ue.useEffectEvent = function(C) {
    return W.H.useEffectEvent(C);
  }, Ue.useId = function() {
    return W.H.useId();
  }, Ue.useImperativeHandle = function(C, K, Z) {
    return W.H.useImperativeHandle(C, K, Z);
  }, Ue.useInsertionEffect = function(C, K) {
    return W.H.useInsertionEffect(C, K);
  }, Ue.useLayoutEffect = function(C, K) {
    return W.H.useLayoutEffect(C, K);
  }, Ue.useMemo = function(C, K) {
    return W.H.useMemo(C, K);
  }, Ue.useOptimistic = function(C, K) {
    return W.H.useOptimistic(C, K);
  }, Ue.useReducer = function(C, K, Z) {
    return W.H.useReducer(C, K, Z);
  }, Ue.useRef = function(C) {
    return W.H.useRef(C);
  }, Ue.useState = function(C) {
    return W.H.useState(C);
  }, Ue.useSyncExternalStore = function(C, K, Z) {
    return W.H.useSyncExternalStore(
      C,
      K,
      Z
    );
  }, Ue.useTransition = function() {
    return W.H.useTransition();
  }, Ue.version = "19.2.5", Ue;
}
var kv;
function dh() {
  return kv || (kv = 1, Yd.exports = sE()), Yd.exports;
}
var x = dh();
const de = /* @__PURE__ */ xb(x), oE = /* @__PURE__ */ iE({
  __proto__: null,
  default: de
}, [x]);
var Gd = { exports: {} }, Gl = {}, Xd = { exports: {} }, Kd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vv;
function uE() {
  return Vv || (Vv = 1, (function(n) {
    function a(O, V) {
      var q = O.length;
      O.push(V);
      e: for (; 0 < q; ) {
        var Q = q - 1 >>> 1, te = O[Q];
        if (0 < o(te, V))
          O[Q] = V, O[q] = te, q = Q;
        else break e;
      }
    }
    function r(O) {
      return O.length === 0 ? null : O[0];
    }
    function s(O) {
      if (O.length === 0) return null;
      var V = O[0], q = O.pop();
      if (q !== V) {
        O[0] = q;
        e: for (var Q = 0, te = O.length, C = te >>> 1; Q < C; ) {
          var K = 2 * (Q + 1) - 1, Z = O[K], re = K + 1, ce = O[re];
          if (0 > o(Z, q))
            re < te && 0 > o(ce, Z) ? (O[Q] = ce, O[re] = q, Q = re) : (O[Q] = Z, O[K] = q, Q = K);
          else if (re < te && 0 > o(ce, q))
            O[Q] = ce, O[re] = q, Q = re;
          else break e;
        }
      }
      return V;
    }
    function o(O, V) {
      var q = O.sortIndex - V.sortIndex;
      return q !== 0 ? q : O.id - V.id;
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
    var v = [], p = [], b = 1, g = null, S = 3, w = !1, j = !1, T = !1, M = !1, N = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, z = typeof setImmediate < "u" ? setImmediate : null;
    function _(O) {
      for (var V = r(p); V !== null; ) {
        if (V.callback === null) s(p);
        else if (V.startTime <= O)
          s(p), V.sortIndex = V.expirationTime, a(v, V);
        else break;
        V = r(p);
      }
    }
    function J(O) {
      if (T = !1, _(O), !j)
        if (r(v) !== null)
          j = !0, G || (G = !0, ae());
        else {
          var V = r(p);
          V !== null && oe(J, V.startTime - O);
        }
    }
    var G = !1, W = -1, A = 5, U = -1;
    function I() {
      return M ? !0 : !(n.unstable_now() - U < A);
    }
    function le() {
      if (M = !1, G) {
        var O = n.unstable_now();
        U = O;
        var V = !0;
        try {
          e: {
            j = !1, T && (T = !1, L(W), W = -1), w = !0;
            var q = S;
            try {
              t: {
                for (_(O), g = r(v); g !== null && !(g.expirationTime > O && I()); ) {
                  var Q = g.callback;
                  if (typeof Q == "function") {
                    g.callback = null, S = g.priorityLevel;
                    var te = Q(
                      g.expirationTime <= O
                    );
                    if (O = n.unstable_now(), typeof te == "function") {
                      g.callback = te, _(O), V = !0;
                      break t;
                    }
                    g === r(v) && s(v), _(O);
                  } else s(v);
                  g = r(v);
                }
                if (g !== null) V = !0;
                else {
                  var C = r(p);
                  C !== null && oe(
                    J,
                    C.startTime - O
                  ), V = !1;
                }
              }
              break e;
            } finally {
              g = null, S = q, w = !1;
            }
            V = void 0;
          }
        } finally {
          V ? ae() : G = !1;
        }
      }
    }
    var ae;
    if (typeof z == "function")
      ae = function() {
        z(le);
      };
    else if (typeof MessageChannel < "u") {
      var me = new MessageChannel(), ge = me.port2;
      me.port1.onmessage = le, ae = function() {
        ge.postMessage(null);
      };
    } else
      ae = function() {
        N(le, 0);
      };
    function oe(O, V) {
      W = N(function() {
        O(n.unstable_now());
      }, V);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, n.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < O ? Math.floor(1e3 / O) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(O) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = S;
      }
      var q = S;
      S = V;
      try {
        return O();
      } finally {
        S = q;
      }
    }, n.unstable_requestPaint = function() {
      M = !0;
    }, n.unstable_runWithPriority = function(O, V) {
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
      var q = S;
      S = O;
      try {
        return V();
      } finally {
        S = q;
      }
    }, n.unstable_scheduleCallback = function(O, V, q) {
      var Q = n.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? Q + q : Q) : q = Q, O) {
        case 1:
          var te = -1;
          break;
        case 2:
          te = 250;
          break;
        case 5:
          te = 1073741823;
          break;
        case 4:
          te = 1e4;
          break;
        default:
          te = 5e3;
      }
      return te = q + te, O = {
        id: b++,
        callback: V,
        priorityLevel: O,
        startTime: q,
        expirationTime: te,
        sortIndex: -1
      }, q > Q ? (O.sortIndex = q, a(p, O), r(v) === null && O === r(p) && (T ? (L(W), W = -1) : T = !0, oe(J, q - Q))) : (O.sortIndex = te, a(v, O), j || w || (j = !0, G || (G = !0, ae()))), O;
    }, n.unstable_shouldYield = I, n.unstable_wrapCallback = function(O) {
      var V = S;
      return function() {
        var q = S;
        S = V;
        try {
          return O.apply(this, arguments);
        } finally {
          S = q;
        }
      };
    };
  })(Kd)), Kd;
}
var Bv;
function cE() {
  return Bv || (Bv = 1, Xd.exports = uE()), Xd.exports;
}
var Qd = { exports: {} }, rn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hv;
function dE() {
  if (Hv) return rn;
  Hv = 1;
  var n = dh();
  function a(v) {
    var p = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        p += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + v + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var s = {
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
  }, o = Symbol.for("react.portal");
  function c(v, p, b) {
    var g = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: g == null ? null : "" + g,
      children: v,
      containerInfo: p,
      implementation: b
    };
  }
  var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(v, p) {
    if (v === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return rn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, rn.createPortal = function(v, p) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return c(v, p, null, b);
  }, rn.flushSync = function(v) {
    var p = h.T, b = s.p;
    try {
      if (h.T = null, s.p = 2, v) return v();
    } finally {
      h.T = p, s.p = b, s.d.f();
    }
  }, rn.preconnect = function(v, p) {
    typeof v == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(v, p));
  }, rn.prefetchDNS = function(v) {
    typeof v == "string" && s.d.D(v);
  }, rn.preinit = function(v, p) {
    if (typeof v == "string" && p && typeof p.as == "string") {
      var b = p.as, g = m(b, p.crossOrigin), S = typeof p.integrity == "string" ? p.integrity : void 0, w = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? s.d.S(
        v,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: g,
          integrity: S,
          fetchPriority: w
        }
      ) : b === "script" && s.d.X(v, {
        crossOrigin: g,
        integrity: S,
        fetchPriority: w,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, rn.preinitModule = function(v, p) {
    if (typeof v == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var b = m(
            p.as,
            p.crossOrigin
          );
          s.d.M(v, {
            crossOrigin: b,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && s.d.M(v);
  }, rn.preload = function(v, p) {
    if (typeof v == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var b = p.as, g = m(b, p.crossOrigin);
      s.d.L(v, b, {
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
        var b = m(p.as, p.crossOrigin);
        s.d.m(v, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(v);
  }, rn.requestFormReset = function(v) {
    s.d.r(v);
  }, rn.unstable_batchedUpdates = function(v, p) {
    return v(p);
  }, rn.useFormState = function(v, p, b) {
    return h.H.useFormState(v, p, b);
  }, rn.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, rn.version = "19.2.5", rn;
}
var qv;
function Sb() {
  if (qv) return Qd.exports;
  qv = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Qd.exports = dE(), Qd.exports;
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
var $v;
function fE() {
  if ($v) return Gl;
  $v = 1;
  var n = cE(), a = dh(), r = Sb();
  function s(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        t += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function c(e) {
    var t = e, i = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (i = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? i : null;
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
    for (var i = e, l = t; ; ) {
      var u = i.return;
      if (u === null) break;
      var d = u.alternate;
      if (d === null) {
        if (l = u.return, l !== null) {
          i = l;
          continue;
        }
        break;
      }
      if (u.child === d.child) {
        for (d = u.child; d; ) {
          if (d === i) return v(u), e;
          if (d === l) return v(u), t;
          d = d.sibling;
        }
        throw Error(s(188));
      }
      if (i.return !== l.return) i = u, l = d;
      else {
        for (var y = !1, E = u.child; E; ) {
          if (E === i) {
            y = !0, i = u, l = d;
            break;
          }
          if (E === l) {
            y = !0, l = u, i = d;
            break;
          }
          E = E.sibling;
        }
        if (!y) {
          for (E = d.child; E; ) {
            if (E === i) {
              y = !0, i = d, l = u;
              break;
            }
            if (E === l) {
              y = !0, l = d, i = u;
              break;
            }
            E = E.sibling;
          }
          if (!y) throw Error(s(189));
        }
      }
      if (i.alternate !== l) throw Error(s(190));
    }
    if (i.tag !== 3) throw Error(s(188));
    return i.stateNode.current === i ? e : t;
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
  var g = Object.assign, S = Symbol.for("react.element"), w = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), z = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), G = Symbol.for("react.suspense_list"), W = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), U = Symbol.for("react.activity"), I = Symbol.for("react.memo_cache_sentinel"), le = Symbol.iterator;
  function ae(e) {
    return e === null || typeof e != "object" ? null : (e = le && e[le] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var me = Symbol.for("react.client.reference");
  function ge(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === me ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case T:
        return "Fragment";
      case N:
        return "Profiler";
      case M:
        return "StrictMode";
      case J:
        return "Suspense";
      case G:
        return "SuspenseList";
      case U:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case z:
          return e.displayName || "Context";
        case L:
          return (e._context.displayName || "Context") + ".Consumer";
        case _:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case W:
          return t = e.displayName || null, t !== null ? t : ge(e.type) || "Memo";
        case A:
          t = e._payload, e = e._init;
          try {
            return ge(e(t));
          } catch {
          }
      }
    return null;
  }
  var oe = Array.isArray, O = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Q = [], te = -1;
  function C(e) {
    return { current: e };
  }
  function K(e) {
    0 > te || (e.current = Q[te], Q[te] = null, te--);
  }
  function Z(e, t) {
    te++, Q[te] = e.current, e.current = t;
  }
  var re = C(null), ce = C(null), ve = C(null), ze = C(null);
  function _e(e, t) {
    switch (Z(ve, t), Z(ce, e), Z(re, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? av(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = av(t), e = iv(t, e);
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
    K(re), Z(re, e);
  }
  function Be() {
    K(re), K(ce), K(ve);
  }
  function kt(e) {
    e.memoizedState !== null && Z(ze, e);
    var t = re.current, i = iv(t, e.type);
    t !== i && (Z(ce, e), Z(re, i));
  }
  function Yt(e) {
    ce.current === e && (K(re), K(ce)), ze.current === e && (K(ze), ql._currentValue = q);
  }
  var fe, Te;
  function Ce(e) {
    if (fe === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        fe = t && t[1] || "", Te = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + fe + e + Te;
  }
  var Me = !1;
  function Kt(e, t) {
    if (!e || Me) return "";
    Me = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var ie = function() {
                throw Error();
              };
              if (Object.defineProperty(ie.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(ie, []);
                } catch (P) {
                  var X = P;
                }
                Reflect.construct(e, [], ie);
              } else {
                try {
                  ie.call();
                } catch (P) {
                  X = P;
                }
                e.call(ie.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (P) {
                X = P;
              }
              (ie = e()) && typeof ie.catch == "function" && ie.catch(function() {
              });
            }
          } catch (P) {
            if (P && X && typeof P.stack == "string")
              return [P.stack, X.stack];
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
      var d = l.DetermineComponentFrameRoot(), y = d[0], E = d[1];
      if (y && E) {
        var D = y.split(`
`), Y = E.split(`
`);
        for (u = l = 0; l < D.length && !D[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < Y.length && !Y[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === D.length || u === Y.length)
          for (l = D.length - 1, u = Y.length - 1; 1 <= l && 0 <= u && D[l] !== Y[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (D[l] !== Y[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || D[l] !== Y[u]) {
                  var ee = `
` + D[l].replace(" at new ", " at ");
                  return e.displayName && ee.includes("<anonymous>") && (ee = ee.replace("<anonymous>", e.displayName)), ee;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      Me = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Ce(i) : "";
  }
  function it(e, t) {
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
      var t = "", i = null;
      do
        t += it(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Qt = Object.prototype.hasOwnProperty, bn = n.unstable_scheduleCallback, ma = n.unstable_cancelCallback, Vt = n.unstable_shouldYield, Dn = n.unstable_requestPaint, Bt = n.unstable_now, ye = n.unstable_getCurrentPriorityLevel, Oe = n.unstable_ImmediatePriority, Qe = n.unstable_UserBlockingPriority, tt = n.unstable_NormalPriority, Ht = n.unstable_LowPriority, qt = n.unstable_IdlePriority, Ei = n.log, ia = n.unstable_setDisableYieldValue, Qn = null, Pt = null;
  function Et(e) {
    if (typeof Ei == "function" && ia(e), Pt && typeof Pt.setStrictMode == "function")
      try {
        Pt.setStrictMode(Qn, e);
      } catch {
      }
  }
  var $t = Math.clz32 ? Math.clz32 : zn, Ji = Math.log, Ba = Math.LN2;
  function zn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ji(e) / Ba | 0) | 0;
  }
  var pa = 256, Pn = 262144, ra = 4194304;
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
  function Le(e, t, i) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var u = 0, d = e.suspendedLanes, y = e.pingedLanes;
    e = e.warmLanes;
    var E = l & 134217727;
    return E !== 0 ? (l = E & ~d, l !== 0 ? u = cn(l) : (y &= E, y !== 0 ? u = cn(y) : i || (i = E & ~e, i !== 0 && (u = cn(i))))) : (E = l & ~d, E !== 0 ? u = cn(E) : y !== 0 ? u = cn(y) : i || (i = l & ~e, i !== 0 && (u = cn(i)))), u === 0 ? 0 : t !== 0 && t !== u && (t & d) === 0 && (d = u & -u, i = t & -t, d >= i || d === 32 && (i & 4194048) !== 0) ? t : u;
  }
  function ct(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Mt(e, t) {
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
    var e = ra;
    return ra <<= 1, (ra & 62914560) === 0 && (ra = 4194304), e;
  }
  function xn(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function rt(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Zt(e, t, i, l, u, d) {
    var y = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var E = e.entanglements, D = e.expirationTimes, Y = e.hiddenUpdates;
    for (i = y & ~i; 0 < i; ) {
      var ee = 31 - $t(i), ie = 1 << ee;
      E[ee] = 0, D[ee] = -1;
      var X = Y[ee];
      if (X !== null)
        for (Y[ee] = null, ee = 0; ee < X.length; ee++) {
          var P = X[ee];
          P !== null && (P.lane &= -536870913);
        }
      i &= ~ie;
    }
    l !== 0 && ga(e, l, 0), d !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(y & ~t));
  }
  function ga(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - $t(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | i & 261930;
  }
  function nn(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var l = 31 - $t(i), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), i &= ~u;
    }
  }
  function R(e, t) {
    var i = t & -t;
    return i = (i & 42) !== 0 ? 1 : B(i), (i & (e.suspendedLanes | t)) !== 0 ? 0 : i;
  }
  function B(e) {
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
  function $(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function se() {
    var e = V.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Cv(e.type));
  }
  function ue(e, t) {
    var i = V.p;
    try {
      return V.p = e, t();
    } finally {
      V.p = i;
    }
  }
  var Se = Math.random().toString(36).slice(2), he = "__reactFiber$" + Se, pe = "__reactProps$" + Se, Ee = "__reactContainer$" + Se, be = "__reactEvents$" + Se, Ae = "__reactListeners$" + Se, Ne = "__reactHandles$" + Se, Pe = "__reactResources$" + Se, He = "__reactMarker$" + Se;
  function dt(e) {
    delete e[he], delete e[pe], delete e[be], delete e[Ae], delete e[Ne];
  }
  function lt(e) {
    var t = e[he];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[Ee] || i[he]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = dv(e); e !== null; ) {
            if (i = e[he]) return i;
            e = dv(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function yt(e) {
    if (e = e[he] || e[Ee]) {
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
  function Rt(e) {
    var t = e[Pe];
    return t || (t = e[Pe] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function ht(e) {
    e[He] = !0;
  }
  var Ha = /* @__PURE__ */ new Set(), Zn = {};
  function Gt(e, t) {
    la(e, t), la(e + "Capture", t);
  }
  function la(e, t) {
    for (Zn[e] = t, e = 0; e < t.length; e++)
      Ha.add(t[e]);
  }
  var ji = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), sa = {}, Ti = {};
  function Wi(e) {
    return Qt.call(Ti, e) ? !0 : Qt.call(sa, e) ? !1 : ji.test(e) ? Ti[e] = !0 : (sa[e] = !0, !1);
  }
  function qe(e, t, i) {
    if (Wi(t))
      if (i === null) e.removeAttribute(t);
      else {
        switch (typeof i) {
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
        e.setAttribute(t, "" + i);
      }
  }
  function jt(e, t, i) {
    if (i === null) e.removeAttribute(t);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + i);
    }
  }
  function an(e, t, i, l) {
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
      e.setAttributeNS(t, i, "" + l);
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
  function mt(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function er(e, t, i) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var u = l.get, d = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(y) {
          i = "" + y, d.call(this, y);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(y) {
          i = "" + y;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function tr(e) {
    if (!e._valueTracker) {
      var t = mt(e) ? "checked" : "value";
      e._valueTracker = er(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function As(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), l = "";
    return e && (l = mt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== i ? (t.setValue(e), !0) : !1;
  }
  function _s(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var J1 = /[\n"\\]/g;
  function On(e) {
    return e.replace(
      J1,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Vu(e, t, i, l, u, d, y, E) {
    e.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.type = y : e.removeAttribute("type"), t != null ? y === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + At(t)) : e.value !== "" + At(t) && (e.value = "" + At(t)) : y !== "submit" && y !== "reset" || e.removeAttribute("value"), t != null ? Bu(e, y, At(t)) : i != null ? Bu(e, y, At(i)) : l != null && e.removeAttribute("value"), u == null && d != null && (e.defaultChecked = !!d), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + At(E) : e.removeAttribute("name");
  }
  function Zh(e, t, i, l, u, d, y, E) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), t != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || t != null)) {
        tr(e);
        return;
      }
      i = i != null ? "" + At(i) : "", t = t != null ? "" + At(t) : i, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (e.name = y), tr(e);
  }
  function Bu(e, t, i) {
    t === "number" && _s(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function nr(e, t, i, l) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < i.length; u++)
        t["$" + i[u]] = !0;
      for (i = 0; i < e.length; i++)
        u = t.hasOwnProperty("$" + e[i].value), e[i].selected !== u && (e[i].selected = u), u && l && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + At(i), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === i) {
          e[u].selected = !0, l && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Jh(e, t, i) {
    if (t != null && (t = "" + At(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + At(i) : "";
  }
  function Wh(e, t, i, l) {
    if (t == null) {
      if (l != null) {
        if (i != null) throw Error(s(92));
        if (oe(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        i = l;
      }
      i == null && (i = ""), t = i;
    }
    i = At(t), e.defaultValue = i, l = e.textContent, l === i && l !== "" && l !== null && (e.value = l), tr(e);
  }
  function ar(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var W1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function em(e, t, i) {
    var l = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, i) : typeof i != "number" || i === 0 || W1.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function tm(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var l in i)
        !i.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && i[u] !== l && em(e, u, l);
    } else
      for (var d in t)
        t.hasOwnProperty(d) && em(e, d, t[d]);
  }
  function Hu(e) {
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
  function Ds(e) {
    return tS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function va() {
  }
  var qu = null;
  function $u(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ir = null, rr = null;
  function nm(e) {
    var t = yt(e);
    if (t && (e = t.stateNode)) {
      var i = e[pe] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Vu(
            e,
            i.value,
            i.defaultValue,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name
          ), t = i.name, i.type === "radio" && t != null) {
            for (i = e; i.parentNode; ) i = i.parentNode;
            for (i = i.querySelectorAll(
              'input[name="' + On(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < i.length; t++) {
              var l = i[t];
              if (l !== e && l.form === e.form) {
                var u = l[pe] || null;
                if (!u) throw Error(s(90));
                Vu(
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
            for (t = 0; t < i.length; t++)
              l = i[t], l.form === e.form && As(l);
          }
          break e;
        case "textarea":
          Jh(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && nr(e, !!i.multiple, t, !1);
      }
    }
  }
  var Iu = !1;
  function am(e, t, i) {
    if (Iu) return e(t, i);
    Iu = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Iu = !1, (ir !== null || rr !== null) && (xo(), ir && (t = ir, e = rr, rr = ir = null, nm(t), e)))
        for (t = 0; t < e.length; t++) nm(e[t]);
    }
  }
  function il(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var l = i[pe] || null;
    if (l === null) return null;
    i = l[t];
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
    if (i && typeof i != "function")
      throw Error(
        s(231, t, typeof i)
      );
    return i;
  }
  var ya = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Fu = !1;
  if (ya)
    try {
      var rl = {};
      Object.defineProperty(rl, "passive", {
        get: function() {
          Fu = !0;
        }
      }), window.addEventListener("test", rl, rl), window.removeEventListener("test", rl, rl);
    } catch {
      Fu = !1;
    }
  var qa = null, Yu = null, zs = null;
  function im() {
    if (zs) return zs;
    var e, t = Yu, i = t.length, l, u = "value" in qa ? qa.value : qa.textContent, d = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) ;
    var y = i - e;
    for (l = 1; l <= y && t[i - l] === u[d - l]; l++) ;
    return zs = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Os(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ls() {
    return !0;
  }
  function rm() {
    return !1;
  }
  function dn(e) {
    function t(i, l, u, d, y) {
      this._reactName = i, this._targetInst = u, this.type = l, this.nativeEvent = d, this.target = y, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (i = e[E], this[E] = i ? i(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Ls : rm, this.isPropagationStopped = rm, this;
    }
    return g(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Ls);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Ls);
      },
      persist: function() {
      },
      isPersistent: Ls
    }), t;
  }
  var Ni = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Us = dn(Ni), ll = g({}, Ni, { view: 0, detail: 0 }), nS = dn(ll), Gu, Xu, sl, ks = g({}, ll, {
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
    getModifierState: Qu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== sl && (sl && e.type === "mousemove" ? (Gu = e.screenX - sl.screenX, Xu = e.screenY - sl.screenY) : Xu = Gu = 0, sl = e), Gu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Xu;
    }
  }), lm = dn(ks), aS = g({}, ks, { dataTransfer: 0 }), iS = dn(aS), rS = g({}, ll, { relatedTarget: 0 }), Ku = dn(rS), lS = g({}, Ni, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), sS = dn(lS), oS = g({}, Ni, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), uS = dn(oS), cS = g({}, Ni, { data: 0 }), sm = dn(cS), dS = {
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
  }, fS = {
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
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = hS[e]) ? !!t[e] : !1;
  }
  function Qu() {
    return mS;
  }
  var pS = g({}, ll, {
    key: function(e) {
      if (e.key) {
        var t = dS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Os(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? fS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Qu,
    charCode: function(e) {
      return e.type === "keypress" ? Os(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Os(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), gS = dn(pS), vS = g({}, ks, {
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
  }), om = dn(vS), yS = g({}, ll, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Qu
  }), bS = dn(yS), xS = g({}, Ni, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SS = dn(xS), wS = g({}, ks, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ES = dn(wS), jS = g({}, Ni, {
    newState: 0,
    oldState: 0
  }), TS = dn(jS), NS = [9, 13, 27, 32], Pu = ya && "CompositionEvent" in window, ol = null;
  ya && "documentMode" in document && (ol = document.documentMode);
  var CS = ya && "TextEvent" in window && !ol, um = ya && (!Pu || ol && 8 < ol && 11 >= ol), cm = " ", dm = !1;
  function fm(e, t) {
    switch (e) {
      case "keyup":
        return NS.indexOf(t.keyCode) !== -1;
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
  function hm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var lr = !1;
  function MS(e, t) {
    switch (e) {
      case "compositionend":
        return hm(t);
      case "keypress":
        return t.which !== 32 ? null : (dm = !0, cm);
      case "textInput":
        return e = t.data, e === cm && dm ? null : e;
      default:
        return null;
    }
  }
  function RS(e, t) {
    if (lr)
      return e === "compositionend" || !Pu && fm(e, t) ? (e = im(), zs = Yu = qa = null, lr = !1, e) : null;
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
        return um && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var AS = {
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
  function mm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!AS[e.type] : t === "textarea";
  }
  function pm(e, t, i, l) {
    ir ? rr ? rr.push(l) : rr = [l] : ir = l, t = Co(t, "onChange"), 0 < t.length && (i = new Us(
      "onChange",
      "change",
      null,
      i,
      l
    ), e.push({ event: i, listeners: t }));
  }
  var ul = null, cl = null;
  function _S(e) {
    Zg(e, 0);
  }
  function Vs(e) {
    var t = Ie(e);
    if (As(t)) return e;
  }
  function gm(e, t) {
    if (e === "change") return t;
  }
  var vm = !1;
  if (ya) {
    var Zu;
    if (ya) {
      var Ju = "oninput" in document;
      if (!Ju) {
        var ym = document.createElement("div");
        ym.setAttribute("oninput", "return;"), Ju = typeof ym.oninput == "function";
      }
      Zu = Ju;
    } else Zu = !1;
    vm = Zu && (!document.documentMode || 9 < document.documentMode);
  }
  function bm() {
    ul && (ul.detachEvent("onpropertychange", xm), cl = ul = null);
  }
  function xm(e) {
    if (e.propertyName === "value" && Vs(cl)) {
      var t = [];
      pm(
        t,
        cl,
        e,
        $u(e)
      ), am(_S, t);
    }
  }
  function DS(e, t, i) {
    e === "focusin" ? (bm(), ul = t, cl = i, ul.attachEvent("onpropertychange", xm)) : e === "focusout" && bm();
  }
  function zS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Vs(cl);
  }
  function OS(e, t) {
    if (e === "click") return Vs(t);
  }
  function LS(e, t) {
    if (e === "input" || e === "change")
      return Vs(t);
  }
  function US(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Sn = typeof Object.is == "function" ? Object.is : US;
  function dl(e, t) {
    if (Sn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), l = Object.keys(t);
    if (i.length !== l.length) return !1;
    for (l = 0; l < i.length; l++) {
      var u = i[l];
      if (!Qt.call(t, u) || !Sn(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function Sm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function wm(e, t) {
    var i = Sm(e);
    e = 0;
    for (var l; i; ) {
      if (i.nodeType === 3) {
        if (l = e + i.textContent.length, e <= t && l >= t)
          return { node: i, offset: t - e };
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
      i = Sm(i);
    }
  }
  function Em(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Em(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function jm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = _s(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = _s(e.document);
    }
    return t;
  }
  function Wu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var kS = ya && "documentMode" in document && 11 >= document.documentMode, sr = null, ec = null, fl = null, tc = !1;
  function Tm(e, t, i) {
    var l = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    tc || sr == null || sr !== _s(l) || (l = sr, "selectionStart" in l && Wu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), fl && dl(fl, l) || (fl = l, l = Co(ec, "onSelect"), 0 < l.length && (t = new Us(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: l }), t.target = sr)));
  }
  function Ci(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var or = {
    animationend: Ci("Animation", "AnimationEnd"),
    animationiteration: Ci("Animation", "AnimationIteration"),
    animationstart: Ci("Animation", "AnimationStart"),
    transitionrun: Ci("Transition", "TransitionRun"),
    transitionstart: Ci("Transition", "TransitionStart"),
    transitioncancel: Ci("Transition", "TransitionCancel"),
    transitionend: Ci("Transition", "TransitionEnd")
  }, nc = {}, Nm = {};
  ya && (Nm = document.createElement("div").style, "AnimationEvent" in window || (delete or.animationend.animation, delete or.animationiteration.animation, delete or.animationstart.animation), "TransitionEvent" in window || delete or.transitionend.transition);
  function Mi(e) {
    if (nc[e]) return nc[e];
    if (!or[e]) return e;
    var t = or[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in Nm)
        return nc[e] = t[i];
    return e;
  }
  var Cm = Mi("animationend"), Mm = Mi("animationiteration"), Rm = Mi("animationstart"), VS = Mi("transitionrun"), BS = Mi("transitionstart"), HS = Mi("transitioncancel"), Am = Mi("transitionend"), _m = /* @__PURE__ */ new Map(), ac = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ac.push("scrollEnd");
  function Jn(e, t) {
    _m.set(e, t), Gt(t, [e]);
  }
  var Bs = typeof reportError == "function" ? reportError : function(e) {
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
  }, Ln = [], ur = 0, ic = 0;
  function Hs() {
    for (var e = ur, t = ic = ur = 0; t < e; ) {
      var i = Ln[t];
      Ln[t++] = null;
      var l = Ln[t];
      Ln[t++] = null;
      var u = Ln[t];
      Ln[t++] = null;
      var d = Ln[t];
      if (Ln[t++] = null, l !== null && u !== null) {
        var y = l.pending;
        y === null ? u.next = u : (u.next = y.next, y.next = u), l.pending = u;
      }
      d !== 0 && Dm(i, u, d);
    }
  }
  function qs(e, t, i, l) {
    Ln[ur++] = e, Ln[ur++] = t, Ln[ur++] = i, Ln[ur++] = l, ic |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function rc(e, t, i, l) {
    return qs(e, t, i, l), $s(e);
  }
  function Ri(e, t) {
    return qs(e, null, null, t), $s(e);
  }
  function Dm(e, t, i) {
    e.lanes |= i;
    var l = e.alternate;
    l !== null && (l.lanes |= i);
    for (var u = !1, d = e.return; d !== null; )
      d.childLanes |= i, l = d.alternate, l !== null && (l.childLanes |= i), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (u = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, u && t !== null && (u = 31 - $t(i), e = d.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = i | 536870912), d) : null;
  }
  function $s(e) {
    if (50 < Ol)
      throw Ol = 0, md = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var cr = {};
  function qS(e, t, i, l) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function wn(e, t, i, l) {
    return new qS(e, t, i, l);
  }
  function lc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ba(e, t) {
    var i = e.alternate;
    return i === null ? (i = wn(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function zm(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Is(e, t, i, l, u, d) {
    var y = 0;
    if (l = e, typeof e == "function") lc(e) && (y = 1);
    else if (typeof e == "string")
      y = Gw(
        e,
        i,
        re.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case U:
          return e = wn(31, i, t, u), e.elementType = U, e.lanes = d, e;
        case T:
          return Ai(i.children, u, d, t);
        case M:
          y = 8, u |= 24;
          break;
        case N:
          return e = wn(12, i, t, u | 2), e.elementType = N, e.lanes = d, e;
        case J:
          return e = wn(13, i, t, u), e.elementType = J, e.lanes = d, e;
        case G:
          return e = wn(19, i, t, u), e.elementType = G, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case z:
                y = 10;
                break e;
              case L:
                y = 9;
                break e;
              case _:
                y = 11;
                break e;
              case W:
                y = 14;
                break e;
              case A:
                y = 16, l = null;
                break e;
            }
          y = 29, i = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = wn(y, i, t, u), t.elementType = e, t.type = l, t.lanes = d, t;
  }
  function Ai(e, t, i, l) {
    return e = wn(7, e, l, t), e.lanes = i, e;
  }
  function sc(e, t, i) {
    return e = wn(6, e, null, t), e.lanes = i, e;
  }
  function Om(e) {
    var t = wn(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function oc(e, t, i) {
    return t = wn(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = i, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Lm = /* @__PURE__ */ new WeakMap();
  function Un(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = Lm.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: on(t)
      }, Lm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: on(t)
    };
  }
  var dr = [], fr = 0, Fs = null, hl = 0, kn = [], Vn = 0, $a = null, oa = 1, ua = "";
  function xa(e, t) {
    dr[fr++] = hl, dr[fr++] = Fs, Fs = e, hl = t;
  }
  function Um(e, t, i) {
    kn[Vn++] = oa, kn[Vn++] = ua, kn[Vn++] = $a, $a = e;
    var l = oa;
    e = ua;
    var u = 32 - $t(l) - 1;
    l &= ~(1 << u), i += 1;
    var d = 32 - $t(t) + u;
    if (30 < d) {
      var y = u - u % 5;
      d = (l & (1 << y) - 1).toString(32), l >>= y, u -= y, oa = 1 << 32 - $t(t) + u | i << u | l, ua = d + e;
    } else
      oa = 1 << d | i << u | l, ua = e;
  }
  function uc(e) {
    e.return !== null && (xa(e, 1), Um(e, 1, 0));
  }
  function cc(e) {
    for (; e === Fs; )
      Fs = dr[--fr], dr[fr] = null, hl = dr[--fr], dr[fr] = null;
    for (; e === $a; )
      $a = kn[--Vn], kn[Vn] = null, ua = kn[--Vn], kn[Vn] = null, oa = kn[--Vn], kn[Vn] = null;
  }
  function km(e, t) {
    kn[Vn++] = oa, kn[Vn++] = ua, kn[Vn++] = $a, oa = t.id, ua = t.overflow, $a = e;
  }
  var Jt = null, pt = null, Ke = !1, Ia = null, Bn = !1, dc = Error(s(519));
  function Fa(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ml(Un(t, e)), dc;
  }
  function Vm(e) {
    var t = e.stateNode, i = e.type, l = e.memoizedProps;
    switch (t[he] = e, t[pe] = l, i) {
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
        for (i = 0; i < Ul.length; i++)
          Ye(Ul[i], t);
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
        Ye("invalid", t), Zh(
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
        Ye("invalid", t), Wh(t, l.value, l.defaultValue, l.children);
    }
    i = l.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || l.suppressHydrationWarning === !0 || tv(t.textContent, i) ? (l.popover != null && (Ye("beforetoggle", t), Ye("toggle", t)), l.onScroll != null && Ye("scroll", t), l.onScrollEnd != null && Ye("scrollend", t), l.onClick != null && (t.onclick = va), t = !0) : t = !1, t || Fa(e, !0);
  }
  function Bm(e) {
    for (Jt = e.return; Jt; )
      switch (Jt.tag) {
        case 5:
        case 31:
        case 13:
          Bn = !1;
          return;
        case 27:
        case 3:
          Bn = !0;
          return;
        default:
          Jt = Jt.return;
      }
  }
  function hr(e) {
    if (e !== Jt) return !1;
    if (!Ke) return Bm(e), Ke = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || Rd(e.type, e.memoizedProps)), i = !i), i && pt && Fa(e), Bm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      pt = cv(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      pt = cv(e);
    } else
      t === 27 ? (t = pt, ii(e.type) ? (e = Od, Od = null, pt = e) : pt = t) : pt = Jt ? qn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function _i() {
    pt = Jt = null, Ke = !1;
  }
  function fc() {
    var e = Ia;
    return e !== null && (pn === null ? pn = e : pn.push.apply(
      pn,
      e
    ), Ia = null), e;
  }
  function ml(e) {
    Ia === null ? Ia = [e] : Ia.push(e);
  }
  var hc = C(null), Di = null, Sa = null;
  function Ya(e, t, i) {
    Z(hc, t._currentValue), t._currentValue = i;
  }
  function wa(e) {
    e._currentValue = hc.current, K(hc);
  }
  function mc(e, t, i) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function pc(e, t, i, l) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var d = u.dependencies;
      if (d !== null) {
        var y = u.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var E = d;
          d = u;
          for (var D = 0; D < t.length; D++)
            if (E.context === t[D]) {
              d.lanes |= i, E = d.alternate, E !== null && (E.lanes |= i), mc(
                d.return,
                i,
                e
              ), l || (y = null);
              break e;
            }
          d = E.next;
        }
      } else if (u.tag === 18) {
        if (y = u.return, y === null) throw Error(s(341));
        y.lanes |= i, d = y.alternate, d !== null && (d.lanes |= i), mc(y, i, e), y = null;
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
  function mr(e, t, i, l) {
    e = null;
    for (var u = t, d = !1; u !== null; ) {
      if (!d) {
        if ((u.flags & 524288) !== 0) d = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var y = u.alternate;
        if (y === null) throw Error(s(387));
        if (y = y.memoizedProps, y !== null) {
          var E = u.type;
          Sn(u.pendingProps.value, y.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (u === ze.current) {
        if (y = u.alternate, y === null) throw Error(s(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(ql) : e = [ql]);
      }
      u = u.return;
    }
    e !== null && pc(
      t,
      e,
      i,
      l
    ), t.flags |= 262144;
  }
  function Ys(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Sn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function zi(e) {
    Di = e, Sa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Wt(e) {
    return Hm(Di, e);
  }
  function Gs(e, t) {
    return Di === null && zi(e), Hm(e, t);
  }
  function Hm(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, Sa === null) {
      if (e === null) throw Error(s(308));
      Sa = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Sa = Sa.next = t;
    return i;
  }
  var $S = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(i, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(i) {
        return i();
      });
    };
  }, IS = n.unstable_scheduleCallback, FS = n.unstable_NormalPriority, _t = {
    $$typeof: z,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function gc() {
    return {
      controller: new $S(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function pl(e) {
    e.refCount--, e.refCount === 0 && IS(FS, function() {
      e.controller.abort();
    });
  }
  var gl = null, vc = 0, pr = 0, gr = null;
  function YS(e, t) {
    if (gl === null) {
      var i = gl = [];
      vc = 0, pr = xd(), gr = {
        status: "pending",
        value: void 0,
        then: function(l) {
          i.push(l);
        }
      };
    }
    return vc++, t.then(qm, qm), t;
  }
  function qm() {
    if (--vc === 0 && gl !== null) {
      gr !== null && (gr.status = "fulfilled");
      var e = gl;
      gl = null, pr = 0, gr = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function GS(e, t) {
    var i = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        i.push(u);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var u = 0; u < i.length; u++) (0, i[u])(t);
      },
      function(u) {
        for (l.status = "rejected", l.reason = u, u = 0; u < i.length; u++)
          (0, i[u])(void 0);
      }
    ), l;
  }
  var $m = O.S;
  O.S = function(e, t) {
    Tg = Bt(), typeof t == "object" && t !== null && typeof t.then == "function" && YS(e, t), $m !== null && $m(e, t);
  };
  var Oi = C(null);
  function yc() {
    var e = Oi.current;
    return e !== null ? e : ft.pooledCache;
  }
  function Xs(e, t) {
    t === null ? Z(Oi, Oi.current) : Z(Oi, t.pool);
  }
  function Im() {
    var e = yc();
    return e === null ? null : { parent: _t._currentValue, pool: e };
  }
  var vr = Error(s(460)), bc = Error(s(474)), Ks = Error(s(542)), Qs = { then: function() {
  } };
  function Fm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Ym(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(va, va), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Xm(e), e;
      default:
        if (typeof t.status == "string") t.then(va, va);
        else {
          if (e = ft, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, Xm(e), e;
        }
        throw Ui = t, vr;
    }
  }
  function Li(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (Ui = i, vr) : i;
    }
  }
  var Ui = null;
  function Gm() {
    if (Ui === null) throw Error(s(459));
    var e = Ui;
    return Ui = null, e;
  }
  function Xm(e) {
    if (e === vr || e === Ks)
      throw Error(s(483));
  }
  var yr = null, vl = 0;
  function Ps(e) {
    var t = vl;
    return vl += 1, yr === null && (yr = []), Ym(yr, e, t);
  }
  function yl(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Zs(e, t) {
    throw t.$$typeof === S ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Km(e) {
    function t(H, k) {
      if (e) {
        var F = H.deletions;
        F === null ? (H.deletions = [k], H.flags |= 16) : F.push(k);
      }
    }
    function i(H, k) {
      if (!e) return null;
      for (; k !== null; )
        t(H, k), k = k.sibling;
      return null;
    }
    function l(H) {
      for (var k = /* @__PURE__ */ new Map(); H !== null; )
        H.key !== null ? k.set(H.key, H) : k.set(H.index, H), H = H.sibling;
      return k;
    }
    function u(H, k) {
      return H = ba(H, k), H.index = 0, H.sibling = null, H;
    }
    function d(H, k, F) {
      return H.index = F, e ? (F = H.alternate, F !== null ? (F = F.index, F < k ? (H.flags |= 67108866, k) : F) : (H.flags |= 67108866, k)) : (H.flags |= 1048576, k);
    }
    function y(H) {
      return e && H.alternate === null && (H.flags |= 67108866), H;
    }
    function E(H, k, F, ne) {
      return k === null || k.tag !== 6 ? (k = sc(F, H.mode, ne), k.return = H, k) : (k = u(k, F), k.return = H, k);
    }
    function D(H, k, F, ne) {
      var Re = F.type;
      return Re === T ? ee(
        H,
        k,
        F.props.children,
        ne,
        F.key
      ) : k !== null && (k.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === A && Li(Re) === k.type) ? (k = u(k, F.props), yl(k, F), k.return = H, k) : (k = Is(
        F.type,
        F.key,
        F.props,
        null,
        H.mode,
        ne
      ), yl(k, F), k.return = H, k);
    }
    function Y(H, k, F, ne) {
      return k === null || k.tag !== 4 || k.stateNode.containerInfo !== F.containerInfo || k.stateNode.implementation !== F.implementation ? (k = oc(F, H.mode, ne), k.return = H, k) : (k = u(k, F.children || []), k.return = H, k);
    }
    function ee(H, k, F, ne, Re) {
      return k === null || k.tag !== 7 ? (k = Ai(
        F,
        H.mode,
        ne,
        Re
      ), k.return = H, k) : (k = u(k, F), k.return = H, k);
    }
    function ie(H, k, F) {
      if (typeof k == "string" && k !== "" || typeof k == "number" || typeof k == "bigint")
        return k = sc(
          "" + k,
          H.mode,
          F
        ), k.return = H, k;
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case w:
            return F = Is(
              k.type,
              k.key,
              k.props,
              null,
              H.mode,
              F
            ), yl(F, k), F.return = H, F;
          case j:
            return k = oc(
              k,
              H.mode,
              F
            ), k.return = H, k;
          case A:
            return k = Li(k), ie(H, k, F);
        }
        if (oe(k) || ae(k))
          return k = Ai(
            k,
            H.mode,
            F,
            null
          ), k.return = H, k;
        if (typeof k.then == "function")
          return ie(H, Ps(k), F);
        if (k.$$typeof === z)
          return ie(
            H,
            Gs(H, k),
            F
          );
        Zs(H, k);
      }
      return null;
    }
    function X(H, k, F, ne) {
      var Re = k !== null ? k.key : null;
      if (typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint")
        return Re !== null ? null : E(H, k, "" + F, ne);
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case w:
            return F.key === Re ? D(H, k, F, ne) : null;
          case j:
            return F.key === Re ? Y(H, k, F, ne) : null;
          case A:
            return F = Li(F), X(H, k, F, ne);
        }
        if (oe(F) || ae(F))
          return Re !== null ? null : ee(H, k, F, ne, null);
        if (typeof F.then == "function")
          return X(
            H,
            k,
            Ps(F),
            ne
          );
        if (F.$$typeof === z)
          return X(
            H,
            k,
            Gs(H, F),
            ne
          );
        Zs(H, F);
      }
      return null;
    }
    function P(H, k, F, ne, Re) {
      if (typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint")
        return H = H.get(F) || null, E(k, H, "" + ne, Re);
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case w:
            return H = H.get(
              ne.key === null ? F : ne.key
            ) || null, D(k, H, ne, Re);
          case j:
            return H = H.get(
              ne.key === null ? F : ne.key
            ) || null, Y(k, H, ne, Re);
          case A:
            return ne = Li(ne), P(
              H,
              k,
              F,
              ne,
              Re
            );
        }
        if (oe(ne) || ae(ne))
          return H = H.get(F) || null, ee(k, H, ne, Re, null);
        if (typeof ne.then == "function")
          return P(
            H,
            k,
            F,
            Ps(ne),
            Re
          );
        if (ne.$$typeof === z)
          return P(
            H,
            k,
            F,
            Gs(k, ne),
            Re
          );
        Zs(k, ne);
      }
      return null;
    }
    function xe(H, k, F, ne) {
      for (var Re = null, Ze = null, je = k, Ve = k = 0, Xe = null; je !== null && Ve < F.length; Ve++) {
        je.index > Ve ? (Xe = je, je = null) : Xe = je.sibling;
        var Je = X(
          H,
          je,
          F[Ve],
          ne
        );
        if (Je === null) {
          je === null && (je = Xe);
          break;
        }
        e && je && Je.alternate === null && t(H, je), k = d(Je, k, Ve), Ze === null ? Re = Je : Ze.sibling = Je, Ze = Je, je = Xe;
      }
      if (Ve === F.length)
        return i(H, je), Ke && xa(H, Ve), Re;
      if (je === null) {
        for (; Ve < F.length; Ve++)
          je = ie(H, F[Ve], ne), je !== null && (k = d(
            je,
            k,
            Ve
          ), Ze === null ? Re = je : Ze.sibling = je, Ze = je);
        return Ke && xa(H, Ve), Re;
      }
      for (je = l(je); Ve < F.length; Ve++)
        Xe = P(
          je,
          H,
          Ve,
          F[Ve],
          ne
        ), Xe !== null && (e && Xe.alternate !== null && je.delete(
          Xe.key === null ? Ve : Xe.key
        ), k = d(
          Xe,
          k,
          Ve
        ), Ze === null ? Re = Xe : Ze.sibling = Xe, Ze = Xe);
      return e && je.forEach(function(ui) {
        return t(H, ui);
      }), Ke && xa(H, Ve), Re;
    }
    function De(H, k, F, ne) {
      if (F == null) throw Error(s(151));
      for (var Re = null, Ze = null, je = k, Ve = k = 0, Xe = null, Je = F.next(); je !== null && !Je.done; Ve++, Je = F.next()) {
        je.index > Ve ? (Xe = je, je = null) : Xe = je.sibling;
        var ui = X(H, je, Je.value, ne);
        if (ui === null) {
          je === null && (je = Xe);
          break;
        }
        e && je && ui.alternate === null && t(H, je), k = d(ui, k, Ve), Ze === null ? Re = ui : Ze.sibling = ui, Ze = ui, je = Xe;
      }
      if (Je.done)
        return i(H, je), Ke && xa(H, Ve), Re;
      if (je === null) {
        for (; !Je.done; Ve++, Je = F.next())
          Je = ie(H, Je.value, ne), Je !== null && (k = d(Je, k, Ve), Ze === null ? Re = Je : Ze.sibling = Je, Ze = Je);
        return Ke && xa(H, Ve), Re;
      }
      for (je = l(je); !Je.done; Ve++, Je = F.next())
        Je = P(je, H, Ve, Je.value, ne), Je !== null && (e && Je.alternate !== null && je.delete(Je.key === null ? Ve : Je.key), k = d(Je, k, Ve), Ze === null ? Re = Je : Ze.sibling = Je, Ze = Je);
      return e && je.forEach(function(aE) {
        return t(H, aE);
      }), Ke && xa(H, Ve), Re;
    }
    function ut(H, k, F, ne) {
      if (typeof F == "object" && F !== null && F.type === T && F.key === null && (F = F.props.children), typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case w:
            e: {
              for (var Re = F.key; k !== null; ) {
                if (k.key === Re) {
                  if (Re = F.type, Re === T) {
                    if (k.tag === 7) {
                      i(
                        H,
                        k.sibling
                      ), ne = u(
                        k,
                        F.props.children
                      ), ne.return = H, H = ne;
                      break e;
                    }
                  } else if (k.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === A && Li(Re) === k.type) {
                    i(
                      H,
                      k.sibling
                    ), ne = u(k, F.props), yl(ne, F), ne.return = H, H = ne;
                    break e;
                  }
                  i(H, k);
                  break;
                } else t(H, k);
                k = k.sibling;
              }
              F.type === T ? (ne = Ai(
                F.props.children,
                H.mode,
                ne,
                F.key
              ), ne.return = H, H = ne) : (ne = Is(
                F.type,
                F.key,
                F.props,
                null,
                H.mode,
                ne
              ), yl(ne, F), ne.return = H, H = ne);
            }
            return y(H);
          case j:
            e: {
              for (Re = F.key; k !== null; ) {
                if (k.key === Re)
                  if (k.tag === 4 && k.stateNode.containerInfo === F.containerInfo && k.stateNode.implementation === F.implementation) {
                    i(
                      H,
                      k.sibling
                    ), ne = u(k, F.children || []), ne.return = H, H = ne;
                    break e;
                  } else {
                    i(H, k);
                    break;
                  }
                else t(H, k);
                k = k.sibling;
              }
              ne = oc(F, H.mode, ne), ne.return = H, H = ne;
            }
            return y(H);
          case A:
            return F = Li(F), ut(
              H,
              k,
              F,
              ne
            );
        }
        if (oe(F))
          return xe(
            H,
            k,
            F,
            ne
          );
        if (ae(F)) {
          if (Re = ae(F), typeof Re != "function") throw Error(s(150));
          return F = Re.call(F), De(
            H,
            k,
            F,
            ne
          );
        }
        if (typeof F.then == "function")
          return ut(
            H,
            k,
            Ps(F),
            ne
          );
        if (F.$$typeof === z)
          return ut(
            H,
            k,
            Gs(H, F),
            ne
          );
        Zs(H, F);
      }
      return typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint" ? (F = "" + F, k !== null && k.tag === 6 ? (i(H, k.sibling), ne = u(k, F), ne.return = H, H = ne) : (i(H, k), ne = sc(F, H.mode, ne), ne.return = H, H = ne), y(H)) : i(H, k);
    }
    return function(H, k, F, ne) {
      try {
        vl = 0;
        var Re = ut(
          H,
          k,
          F,
          ne
        );
        return yr = null, Re;
      } catch (je) {
        if (je === vr || je === Ks) throw je;
        var Ze = wn(29, je, null, H.mode);
        return Ze.lanes = ne, Ze.return = H, Ze;
      } finally {
      }
    };
  }
  var ki = Km(!0), Qm = Km(!1), Ga = !1;
  function xc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Sc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Xa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ka(e, t, i) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (et & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = $s(e), Dm(e, null, i), t;
    }
    return qs(e, l, t, i), $s(e);
  }
  function bl(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, nn(e, i);
    }
  }
  function wc(e, t) {
    var i = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, i === l)) {
      var u = null, d = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var y = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          d === null ? u = d = y : d = d.next = y, i = i.next;
        } while (i !== null);
        d === null ? u = d = t : d = d.next = t;
      } else u = d = t;
      i = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: d,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = t : e.next = t, i.lastBaseUpdate = t;
  }
  var Ec = !1;
  function xl() {
    if (Ec) {
      var e = gr;
      if (e !== null) throw e;
    }
  }
  function Sl(e, t, i, l) {
    Ec = !1;
    var u = e.updateQueue;
    Ga = !1;
    var d = u.firstBaseUpdate, y = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var D = E, Y = D.next;
      D.next = null, y === null ? d = Y : y.next = Y, y = D;
      var ee = e.alternate;
      ee !== null && (ee = ee.updateQueue, E = ee.lastBaseUpdate, E !== y && (E === null ? ee.firstBaseUpdate = Y : E.next = Y, ee.lastBaseUpdate = D));
    }
    if (d !== null) {
      var ie = u.baseState;
      y = 0, ee = Y = D = null, E = d;
      do {
        var X = E.lane & -536870913, P = X !== E.lane;
        if (P ? (Ge & X) === X : (l & X) === X) {
          X !== 0 && X === pr && (Ec = !0), ee !== null && (ee = ee.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var xe = e, De = E;
            X = t;
            var ut = i;
            switch (De.tag) {
              case 1:
                if (xe = De.payload, typeof xe == "function") {
                  ie = xe.call(ut, ie, X);
                  break e;
                }
                ie = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = De.payload, X = typeof xe == "function" ? xe.call(ut, ie, X) : xe, X == null) break e;
                ie = g({}, ie, X);
                break e;
              case 2:
                Ga = !0;
            }
          }
          X = E.callback, X !== null && (e.flags |= 64, P && (e.flags |= 8192), P = u.callbacks, P === null ? u.callbacks = [X] : P.push(X));
        } else
          P = {
            lane: X,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, ee === null ? (Y = ee = P, D = ie) : ee = ee.next = P, y |= X;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          P = E, E = P.next, P.next = null, u.lastBaseUpdate = P, u.shared.pending = null;
        }
      } while (!0);
      ee === null && (D = ie), u.baseState = D, u.firstBaseUpdate = Y, u.lastBaseUpdate = ee, d === null && (u.shared.lanes = 0), Wa |= y, e.lanes = y, e.memoizedState = ie;
    }
  }
  function Pm(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function Zm(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Pm(i[e], t);
  }
  var br = C(null), Js = C(0);
  function Jm(e, t) {
    e = _a, Z(Js, e), Z(br, t), _a = e | t.baseLanes;
  }
  function jc() {
    Z(Js, _a), Z(br, br.current);
  }
  function Tc() {
    _a = Js.current, K(br), K(Js);
  }
  var En = C(null), Hn = null;
  function Qa(e) {
    var t = e.alternate;
    Z(Tt, Tt.current & 1), Z(En, e), Hn === null && (t === null || br.current !== null || t.memoizedState !== null) && (Hn = e);
  }
  function Nc(e) {
    Z(Tt, Tt.current), Z(En, e), Hn === null && (Hn = e);
  }
  function Wm(e) {
    e.tag === 22 ? (Z(Tt, Tt.current), Z(En, e), Hn === null && (Hn = e)) : Pa();
  }
  function Pa() {
    Z(Tt, Tt.current), Z(En, En.current);
  }
  function jn(e) {
    K(En), Hn === e && (Hn = null), K(Tt);
  }
  var Tt = C(0);
  function Ws(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Dd(i) || zd(i)))
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
  var Ea = 0, ke = null, st = null, Dt = null, eo = !1, xr = !1, Vi = !1, to = 0, wl = 0, Sr = null, XS = 0;
  function St() {
    throw Error(s(321));
  }
  function Cc(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!Sn(e[i], t[i])) return !1;
    return !0;
  }
  function Mc(e, t, i, l, u, d) {
    return Ea = d, ke = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? Up : Ic, Vi = !1, d = i(l, u), Vi = !1, xr && (d = tp(
      t,
      i,
      l,
      u
    )), ep(e), d;
  }
  function ep(e) {
    O.H = Tl;
    var t = st !== null && st.next !== null;
    if (Ea = 0, Dt = st = ke = null, eo = !1, wl = 0, Sr = null, t) throw Error(s(300));
    e === null || zt || (e = e.dependencies, e !== null && Ys(e) && (zt = !0));
  }
  function tp(e, t, i, l) {
    ke = e;
    var u = 0;
    do {
      if (xr && (Sr = null), wl = 0, xr = !1, 25 <= u) throw Error(s(301));
      if (u += 1, Dt = st = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      O.H = kp, d = t(i, l);
    } while (xr);
    return d;
  }
  function KS() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? El(t) : t, e = e.useState()[0], (st !== null ? st.memoizedState : null) !== e && (ke.flags |= 1024), t;
  }
  function Rc() {
    var e = to !== 0;
    return to = 0, e;
  }
  function Ac(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function _c(e) {
    if (eo) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      eo = !1;
    }
    Ea = 0, Dt = st = ke = null, xr = !1, wl = to = 0, Sr = null;
  }
  function un() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Dt === null ? ke.memoizedState = Dt = e : Dt = Dt.next = e, Dt;
  }
  function Nt() {
    if (st === null) {
      var e = ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = st.next;
    var t = Dt === null ? ke.memoizedState : Dt.next;
    if (t !== null)
      Dt = t, st = e;
    else {
      if (e === null)
        throw ke.alternate === null ? Error(s(467)) : Error(s(310));
      st = e, e = {
        memoizedState: st.memoizedState,
        baseState: st.baseState,
        baseQueue: st.baseQueue,
        queue: st.queue,
        next: null
      }, Dt === null ? ke.memoizedState = Dt = e : Dt = Dt.next = e;
    }
    return Dt;
  }
  function no() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function El(e) {
    var t = wl;
    return wl += 1, Sr === null && (Sr = []), e = Ym(Sr, e, t), t = ke, (Dt === null ? t.memoizedState : Dt.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? Up : Ic), e;
  }
  function ao(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return El(e);
      if (e.$$typeof === z) return Wt(e);
    }
    throw Error(s(438, String(e)));
  }
  function Dc(e) {
    var t = null, i = ke.updateQueue;
    if (i !== null && (t = i.memoCache), t == null) {
      var l = ke.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = no(), ke.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), l = 0; l < e; l++)
        i[l] = I;
    return t.index++, i;
  }
  function ja(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function io(e) {
    var t = Nt();
    return zc(t, st, e);
  }
  function zc(e, t, i) {
    var l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = i;
    var u = e.baseQueue, d = l.pending;
    if (d !== null) {
      if (u !== null) {
        var y = u.next;
        u.next = d.next, d.next = y;
      }
      t.baseQueue = u = d, l.pending = null;
    }
    if (d = e.baseState, u === null) e.memoizedState = d;
    else {
      t = u.next;
      var E = y = null, D = null, Y = t, ee = !1;
      do {
        var ie = Y.lane & -536870913;
        if (ie !== Y.lane ? (Ge & ie) === ie : (Ea & ie) === ie) {
          var X = Y.revertLane;
          if (X === 0)
            D !== null && (D = D.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: Y.action,
              hasEagerState: Y.hasEagerState,
              eagerState: Y.eagerState,
              next: null
            }), ie === pr && (ee = !0);
          else if ((Ea & X) === X) {
            Y = Y.next, X === pr && (ee = !0);
            continue;
          } else
            ie = {
              lane: 0,
              revertLane: Y.revertLane,
              gesture: null,
              action: Y.action,
              hasEagerState: Y.hasEagerState,
              eagerState: Y.eagerState,
              next: null
            }, D === null ? (E = D = ie, y = d) : D = D.next = ie, ke.lanes |= X, Wa |= X;
          ie = Y.action, Vi && i(d, ie), d = Y.hasEagerState ? Y.eagerState : i(d, ie);
        } else
          X = {
            lane: ie,
            revertLane: Y.revertLane,
            gesture: Y.gesture,
            action: Y.action,
            hasEagerState: Y.hasEagerState,
            eagerState: Y.eagerState,
            next: null
          }, D === null ? (E = D = X, y = d) : D = D.next = X, ke.lanes |= ie, Wa |= ie;
        Y = Y.next;
      } while (Y !== null && Y !== t);
      if (D === null ? y = d : D.next = E, !Sn(d, e.memoizedState) && (zt = !0, ee && (i = gr, i !== null)))
        throw i;
      e.memoizedState = d, e.baseState = y, e.baseQueue = D, l.lastRenderedState = d;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Oc(e) {
    var t = Nt(), i = t.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var l = i.dispatch, u = i.pending, d = t.memoizedState;
    if (u !== null) {
      i.pending = null;
      var y = u = u.next;
      do
        d = e(d, y.action), y = y.next;
      while (y !== u);
      Sn(d, t.memoizedState) || (zt = !0), t.memoizedState = d, t.baseQueue === null && (t.baseState = d), i.lastRenderedState = d;
    }
    return [d, l];
  }
  function np(e, t, i) {
    var l = ke, u = Nt(), d = Ke;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = t();
    var y = !Sn(
      (st || u).memoizedState,
      i
    );
    if (y && (u.memoizedState = i, zt = !0), u = u.queue, kc(rp.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || y || Dt !== null && Dt.memoizedState.tag & 1) {
      if (l.flags |= 2048, wr(
        9,
        { destroy: void 0 },
        ip.bind(
          null,
          l,
          u,
          i,
          t
        ),
        null
      ), ft === null) throw Error(s(349));
      d || (Ea & 127) !== 0 || ap(l, t, i);
    }
    return i;
  }
  function ap(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = ke.updateQueue, t === null ? (t = no(), ke.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function ip(e, t, i, l) {
    t.value = i, t.getSnapshot = l, lp(t) && sp(e);
  }
  function rp(e, t, i) {
    return i(function() {
      lp(t) && sp(e);
    });
  }
  function lp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !Sn(e, i);
    } catch {
      return !0;
    }
  }
  function sp(e) {
    var t = Ri(e, 2);
    t !== null && gn(t, e, 2);
  }
  function Lc(e) {
    var t = un();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), Vi) {
        Et(!0);
        try {
          i();
        } finally {
          Et(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ja,
      lastRenderedState: e
    }, t;
  }
  function op(e, t, i, l) {
    return e.baseState = i, zc(
      e,
      st,
      typeof l == "function" ? l : ja
    );
  }
  function QS(e, t, i, l, u) {
    if (so(e)) throw Error(s(485));
    if (e = t.action, e !== null) {
      var d = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(y) {
          d.listeners.push(y);
        }
      };
      O.T !== null ? i(!0) : d.isTransition = !1, l(d), i = t.pending, i === null ? (d.next = t.pending = d, up(t, d)) : (d.next = i.next, t.pending = i.next = d);
    }
  }
  function up(e, t) {
    var i = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var d = O.T, y = {};
      O.T = y;
      try {
        var E = i(u, l), D = O.S;
        D !== null && D(y, E), cp(e, t, E);
      } catch (Y) {
        Uc(e, t, Y);
      } finally {
        d !== null && y.types !== null && (d.types = y.types), O.T = d;
      }
    } else
      try {
        d = i(u, l), cp(e, t, d);
      } catch (Y) {
        Uc(e, t, Y);
      }
  }
  function cp(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(l) {
        dp(e, t, l);
      },
      function(l) {
        return Uc(e, t, l);
      }
    ) : dp(e, t, i);
  }
  function dp(e, t, i) {
    t.status = "fulfilled", t.value = i, fp(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, up(e, i)));
  }
  function Uc(e, t, i) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = i, fp(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function fp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function hp(e, t) {
    return t;
  }
  function mp(e, t) {
    if (Ke) {
      var i = ft.formState;
      if (i !== null) {
        e: {
          var l = ke;
          if (Ke) {
            if (pt) {
              t: {
                for (var u = pt, d = Bn; u.nodeType !== 8; ) {
                  if (!d) {
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
                d = u.data, u = d === "F!" || d === "F" ? u : null;
              }
              if (u) {
                pt = qn(
                  u.nextSibling
                ), l = u.data === "F!";
                break e;
              }
            }
            Fa(l);
          }
          l = !1;
        }
        l && (t = i[0]);
      }
    }
    return i = un(), i.memoizedState = i.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: hp,
      lastRenderedState: t
    }, i.queue = l, i = zp.bind(
      null,
      ke,
      l
    ), l.dispatch = i, l = Lc(!1), d = $c.bind(
      null,
      ke,
      !1,
      l.queue
    ), l = un(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = u, i = QS.bind(
      null,
      ke,
      u,
      d,
      i
    ), u.dispatch = i, l.memoizedState = e, [t, i, !1];
  }
  function pp(e) {
    var t = Nt();
    return gp(t, st, e);
  }
  function gp(e, t, i) {
    if (t = zc(
      e,
      t,
      hp
    )[0], e = io(ja)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = El(t);
      } catch (y) {
        throw y === vr ? Ks : y;
      }
    else l = t;
    t = Nt();
    var u = t.queue, d = u.dispatch;
    return i !== t.memoizedState && (ke.flags |= 2048, wr(
      9,
      { destroy: void 0 },
      PS.bind(null, u, i),
      null
    )), [l, d, e];
  }
  function PS(e, t) {
    e.action = t;
  }
  function vp(e) {
    var t = Nt(), i = st;
    if (i !== null)
      return gp(t, i, e);
    Nt(), t = t.memoizedState, i = Nt();
    var l = i.queue.dispatch;
    return i.memoizedState = e, [t, l, !1];
  }
  function wr(e, t, i, l) {
    return e = { tag: e, create: i, deps: l, inst: t, next: null }, t = ke.updateQueue, t === null && (t = no(), ke.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (l = i.next, i.next = e, e.next = l, t.lastEffect = e), e;
  }
  function yp() {
    return Nt().memoizedState;
  }
  function ro(e, t, i, l) {
    var u = un();
    ke.flags |= e, u.memoizedState = wr(
      1 | t,
      { destroy: void 0 },
      i,
      l === void 0 ? null : l
    );
  }
  function lo(e, t, i, l) {
    var u = Nt();
    l = l === void 0 ? null : l;
    var d = u.memoizedState.inst;
    st !== null && l !== null && Cc(l, st.memoizedState.deps) ? u.memoizedState = wr(t, d, i, l) : (ke.flags |= e, u.memoizedState = wr(
      1 | t,
      d,
      i,
      l
    ));
  }
  function bp(e, t) {
    ro(8390656, 8, e, t);
  }
  function kc(e, t) {
    lo(2048, 8, e, t);
  }
  function ZS(e) {
    ke.flags |= 4;
    var t = ke.updateQueue;
    if (t === null)
      t = no(), ke.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function xp(e) {
    var t = Nt().memoizedState;
    return ZS({ ref: t, nextImpl: e }), function() {
      if ((et & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Sp(e, t) {
    return lo(4, 2, e, t);
  }
  function wp(e, t) {
    return lo(4, 4, e, t);
  }
  function Ep(e, t) {
    if (typeof t == "function") {
      e = e();
      var i = t(e);
      return function() {
        typeof i == "function" ? i() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function jp(e, t, i) {
    i = i != null ? i.concat([e]) : null, lo(4, 4, Ep.bind(null, t, e), i);
  }
  function Vc() {
  }
  function Tp(e, t) {
    var i = Nt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    return t !== null && Cc(t, l[1]) ? l[0] : (i.memoizedState = [e, t], e);
  }
  function Np(e, t) {
    var i = Nt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    if (t !== null && Cc(t, l[1]))
      return l[0];
    if (l = e(), Vi) {
      Et(!0);
      try {
        e();
      } finally {
        Et(!1);
      }
    }
    return i.memoizedState = [l, t], l;
  }
  function Bc(e, t, i) {
    return i === void 0 || (Ea & 1073741824) !== 0 && (Ge & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = Cg(), ke.lanes |= e, Wa |= e, i);
  }
  function Cp(e, t, i, l) {
    return Sn(i, t) ? i : br.current !== null ? (e = Bc(e, i, l), Sn(e, t) || (zt = !0), e) : (Ea & 42) === 0 || (Ea & 1073741824) !== 0 && (Ge & 261930) === 0 ? (zt = !0, e.memoizedState = i) : (e = Cg(), ke.lanes |= e, Wa |= e, t);
  }
  function Mp(e, t, i, l, u) {
    var d = V.p;
    V.p = d !== 0 && 8 > d ? d : 8;
    var y = O.T, E = {};
    O.T = E, $c(e, !1, t, i);
    try {
      var D = u(), Y = O.S;
      if (Y !== null && Y(E, D), D !== null && typeof D == "object" && typeof D.then == "function") {
        var ee = GS(
          D,
          l
        );
        jl(
          e,
          t,
          ee,
          Cn(e)
        );
      } else
        jl(
          e,
          t,
          l,
          Cn(e)
        );
    } catch (ie) {
      jl(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: ie },
        Cn()
      );
    } finally {
      V.p = d, y !== null && E.types !== null && (y.types = E.types), O.T = y;
    }
  }
  function JS() {
  }
  function Hc(e, t, i, l) {
    if (e.tag !== 5) throw Error(s(476));
    var u = Rp(e).queue;
    Mp(
      e,
      u,
      t,
      q,
      i === null ? JS : function() {
        return Ap(e), i(l);
      }
    );
  }
  function Rp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: q,
      baseState: q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ja,
        lastRenderedState: q
      },
      next: null
    };
    var i = {};
    return t.next = {
      memoizedState: i,
      baseState: i,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ja,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Ap(e) {
    var t = Rp(e);
    t.next === null && (t = e.alternate.memoizedState), jl(
      e,
      t.next.queue,
      {},
      Cn()
    );
  }
  function qc() {
    return Wt(ql);
  }
  function _p() {
    return Nt().memoizedState;
  }
  function Dp() {
    return Nt().memoizedState;
  }
  function WS(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = Cn();
          e = Xa(i);
          var l = Ka(t, e, i);
          l !== null && (gn(l, t, i), bl(l, t, i)), t = { cache: gc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ew(e, t, i) {
    var l = Cn();
    i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, so(e) ? Op(t, i) : (i = rc(e, t, i, l), i !== null && (gn(i, e, l), Lp(i, t, l)));
  }
  function zp(e, t, i) {
    var l = Cn();
    jl(e, t, i, l);
  }
  function jl(e, t, i, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (so(e)) Op(t, u);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = t.lastRenderedReducer, d !== null))
        try {
          var y = t.lastRenderedState, E = d(y, i);
          if (u.hasEagerState = !0, u.eagerState = E, Sn(E, y))
            return qs(e, t, u, 0), ft === null && Hs(), !1;
        } catch {
        } finally {
        }
      if (i = rc(e, t, u, l), i !== null)
        return gn(i, e, l), Lp(i, t, l), !0;
    }
    return !1;
  }
  function $c(e, t, i, l) {
    if (l = {
      lane: 2,
      revertLane: xd(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, so(e)) {
      if (t) throw Error(s(479));
    } else
      t = rc(
        e,
        i,
        l,
        2
      ), t !== null && gn(t, e, 2);
  }
  function so(e) {
    var t = e.alternate;
    return e === ke || t !== null && t === ke;
  }
  function Op(e, t) {
    xr = eo = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function Lp(e, t, i) {
    if ((i & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, nn(e, i);
    }
  }
  var Tl = {
    readContext: Wt,
    use: ao,
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
  Tl.useEffectEvent = St;
  var Up = {
    readContext: Wt,
    use: ao,
    useCallback: function(e, t) {
      return un().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Wt,
    useEffect: bp,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, ro(
        4194308,
        4,
        Ep.bind(null, t, e),
        i
      );
    },
    useLayoutEffect: function(e, t) {
      return ro(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      ro(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var i = un();
      t = t === void 0 ? null : t;
      var l = e();
      if (Vi) {
        Et(!0);
        try {
          e();
        } finally {
          Et(!1);
        }
      }
      return i.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, i) {
      var l = un();
      if (i !== void 0) {
        var u = i(t);
        if (Vi) {
          Et(!0);
          try {
            i(t);
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
      }, l.queue = e, e = e.dispatch = ew.bind(
        null,
        ke,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = un();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Lc(e);
      var t = e.queue, i = zp.bind(null, ke, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Vc,
    useDeferredValue: function(e, t) {
      var i = un();
      return Bc(i, e, t);
    },
    useTransition: function() {
      var e = Lc(!1);
      return e = Mp.bind(
        null,
        ke,
        e.queue,
        !0,
        !1
      ), un().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var l = ke, u = un();
      if (Ke) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = t(), ft === null)
          throw Error(s(349));
        (Ge & 127) !== 0 || ap(l, t, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: t };
      return u.queue = d, bp(rp.bind(null, l, d, e), [
        e
      ]), l.flags |= 2048, wr(
        9,
        { destroy: void 0 },
        ip.bind(
          null,
          l,
          d,
          i,
          t
        ),
        null
      ), i;
    },
    useId: function() {
      var e = un(), t = ft.identifierPrefix;
      if (Ke) {
        var i = ua, l = oa;
        i = (l & ~(1 << 32 - $t(l) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = to++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = XS++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: qc,
    useFormState: mp,
    useActionState: mp,
    useOptimistic: function(e) {
      var t = un();
      t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = i, t = $c.bind(
        null,
        ke,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: Dc,
    useCacheRefresh: function() {
      return un().memoizedState = WS.bind(
        null,
        ke
      );
    },
    useEffectEvent: function(e) {
      var t = un(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((et & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Ic = {
    readContext: Wt,
    use: ao,
    useCallback: Tp,
    useContext: Wt,
    useEffect: kc,
    useImperativeHandle: jp,
    useInsertionEffect: Sp,
    useLayoutEffect: wp,
    useMemo: Np,
    useReducer: io,
    useRef: yp,
    useState: function() {
      return io(ja);
    },
    useDebugValue: Vc,
    useDeferredValue: function(e, t) {
      var i = Nt();
      return Cp(
        i,
        st.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = io(ja)[0], t = Nt().memoizedState;
      return [
        typeof e == "boolean" ? e : El(e),
        t
      ];
    },
    useSyncExternalStore: np,
    useId: _p,
    useHostTransitionStatus: qc,
    useFormState: pp,
    useActionState: pp,
    useOptimistic: function(e, t) {
      var i = Nt();
      return op(i, st, e, t);
    },
    useMemoCache: Dc,
    useCacheRefresh: Dp
  };
  Ic.useEffectEvent = xp;
  var kp = {
    readContext: Wt,
    use: ao,
    useCallback: Tp,
    useContext: Wt,
    useEffect: kc,
    useImperativeHandle: jp,
    useInsertionEffect: Sp,
    useLayoutEffect: wp,
    useMemo: Np,
    useReducer: Oc,
    useRef: yp,
    useState: function() {
      return Oc(ja);
    },
    useDebugValue: Vc,
    useDeferredValue: function(e, t) {
      var i = Nt();
      return st === null ? Bc(i, e, t) : Cp(
        i,
        st.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Oc(ja)[0], t = Nt().memoizedState;
      return [
        typeof e == "boolean" ? e : El(e),
        t
      ];
    },
    useSyncExternalStore: np,
    useId: _p,
    useHostTransitionStatus: qc,
    useFormState: vp,
    useActionState: vp,
    useOptimistic: function(e, t) {
      var i = Nt();
      return st !== null ? op(i, st, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Dc,
    useCacheRefresh: Dp
  };
  kp.useEffectEvent = xp;
  function Fc(e, t, i, l) {
    t = e.memoizedState, i = i(l, t), i = i == null ? t : g({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var Yc = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var l = Cn(), u = Xa(l);
      u.payload = t, i != null && (u.callback = i), t = Ka(e, u, l), t !== null && (gn(t, e, l), bl(t, e, l));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var l = Cn(), u = Xa(l);
      u.tag = 1, u.payload = t, i != null && (u.callback = i), t = Ka(e, u, l), t !== null && (gn(t, e, l), bl(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = Cn(), l = Xa(i);
      l.tag = 2, t != null && (l.callback = t), t = Ka(e, l, i), t !== null && (gn(t, e, i), bl(t, e, i));
    }
  };
  function Vp(e, t, i, l, u, d, y) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, d, y) : t.prototype && t.prototype.isPureReactComponent ? !dl(i, l) || !dl(u, d) : !0;
  }
  function Bp(e, t, i, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, l), t.state !== e && Yc.enqueueReplaceState(t, t.state, null);
  }
  function Bi(e, t) {
    var i = t;
    if ("ref" in t) {
      i = {};
      for (var l in t)
        l !== "ref" && (i[l] = t[l]);
    }
    if (e = e.defaultProps) {
      i === t && (i = g({}, i));
      for (var u in e)
        i[u] === void 0 && (i[u] = e[u]);
    }
    return i;
  }
  function Hp(e) {
    Bs(e);
  }
  function qp(e) {
    console.error(e);
  }
  function $p(e) {
    Bs(e);
  }
  function oo(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Ip(e, t, i) {
    try {
      var l = e.onCaughtError;
      l(i.value, {
        componentStack: i.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Gc(e, t, i) {
    return i = Xa(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      oo(e, t);
    }, i;
  }
  function Fp(e) {
    return e = Xa(e), e.tag = 3, e;
  }
  function Yp(e, t, i, l) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = l.value;
      e.payload = function() {
        return u(d);
      }, e.callback = function() {
        Ip(t, i, l);
      };
    }
    var y = i.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (e.callback = function() {
      Ip(t, i, l), typeof u != "function" && (ei === null ? ei = /* @__PURE__ */ new Set([this]) : ei.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function tw(e, t, i, l, u) {
    if (i.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = i.alternate, t !== null && mr(
        t,
        i,
        u,
        !0
      ), i = En.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return Hn === null ? So() : i.alternate === null && wt === 0 && (wt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, l === Qs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), vd(e, l, u)), !1;
          case 22:
            return i.flags |= 65536, l === Qs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : i.add(l)), vd(e, l, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return vd(e, l, u), So(), !1;
    }
    if (Ke)
      return t = En.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== dc && (e = Error(s(422), { cause: l }), ml(Un(e, i)))) : (l !== dc && (t = Error(s(423), {
        cause: l
      }), ml(
        Un(t, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = Un(l, i), u = Gc(
        e.stateNode,
        l,
        u
      ), wc(e, u), wt !== 4 && (wt = 2)), !1;
    var d = Error(s(520), { cause: l });
    if (d = Un(d, i), zl === null ? zl = [d] : zl.push(d), wt !== 4 && (wt = 2), t === null) return !0;
    l = Un(l, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = Gc(i.stateNode, l, e), wc(i, e), !1;
        case 1:
          if (t = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (ei === null || !ei.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Fp(u), Yp(
              u,
              e,
              i,
              l
            ), wc(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Xc = Error(s(461)), zt = !1;
  function en(e, t, i, l) {
    t.child = e === null ? Qm(t, null, i, l) : ki(
      t,
      e.child,
      i,
      l
    );
  }
  function Gp(e, t, i, l, u) {
    i = i.render;
    var d = t.ref;
    if ("ref" in l) {
      var y = {};
      for (var E in l)
        E !== "ref" && (y[E] = l[E]);
    } else y = l;
    return zi(t), l = Mc(
      e,
      t,
      i,
      y,
      d,
      u
    ), E = Rc(), e !== null && !zt ? (Ac(e, t, u), Ta(e, t, u)) : (Ke && E && uc(t), t.flags |= 1, en(e, t, l, u), t.child);
  }
  function Xp(e, t, i, l, u) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" && !lc(d) && d.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = d, Kp(
        e,
        t,
        d,
        l,
        u
      )) : (e = Is(
        i.type,
        null,
        l,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (d = e.child, !td(e, u)) {
      var y = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : dl, i(y, l) && e.ref === t.ref)
        return Ta(e, t, u);
    }
    return t.flags |= 1, e = ba(d, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Kp(e, t, i, l, u) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (dl(d, l) && e.ref === t.ref)
        if (zt = !1, t.pendingProps = l = d, td(e, u))
          (e.flags & 131072) !== 0 && (zt = !0);
        else
          return t.lanes = e.lanes, Ta(e, t, u);
    }
    return Kc(
      e,
      t,
      i,
      l,
      u
    );
  }
  function Qp(e, t, i, l) {
    var u = l.children, d = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (d = d !== null ? d.baseLanes | i : i, e !== null) {
          for (l = t.child = e.child, u = 0; l !== null; )
            u = u | l.lanes | l.childLanes, l = l.sibling;
          l = u & ~d;
        } else l = 0, t.child = null;
        return Pp(
          e,
          t,
          d,
          i,
          l
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Xs(
          t,
          d !== null ? d.cachePool : null
        ), d !== null ? Jm(t, d) : jc(), Wm(t);
      else
        return l = t.lanes = 536870912, Pp(
          e,
          t,
          d !== null ? d.baseLanes | i : i,
          i,
          l
        );
    } else
      d !== null ? (Xs(t, d.cachePool), Jm(t, d), Pa(), t.memoizedState = null) : (e !== null && Xs(t, null), jc(), Pa());
    return en(e, t, u, i), t.child;
  }
  function Nl(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Pp(e, t, i, l, u) {
    var d = yc();
    return d = d === null ? null : { parent: _t._currentValue, pool: d }, t.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, e !== null && Xs(t, null), jc(), Wm(t), e !== null && mr(e, t, l, !0), t.childLanes = u, null;
  }
  function uo(e, t) {
    return t = fo(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Zp(e, t, i) {
    return ki(t, e.child, null, i), e = uo(t, t.pendingProps), e.flags |= 2, jn(t), t.memoizedState = null, e;
  }
  function nw(e, t, i) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Ke) {
        if (l.mode === "hidden")
          return e = uo(t, l), t.lanes = 536870912, Nl(null, e);
        if (Nc(t), (e = pt) ? (e = uv(
          e,
          Bn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: $a !== null ? { id: oa, overflow: ua } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Om(e), i.return = t, t.child = i, Jt = t, pt = null)) : e = null, e === null) throw Fa(t);
        return t.lanes = 536870912, null;
      }
      return uo(t, l);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var y = d.dehydrated;
      if (Nc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Zp(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (zt || mr(e, t, i, !1), u = (i & e.childLanes) !== 0, zt || u) {
        if (l = ft, l !== null && (y = R(l, i), y !== 0 && y !== d.retryLane))
          throw d.retryLane = y, Ri(e, y), gn(l, e, y), Xc;
        So(), t = Zp(
          e,
          t,
          i
        );
      } else
        e = d.treeContext, pt = qn(y.nextSibling), Jt = t, Ke = !0, Ia = null, Bn = !1, e !== null && km(t, e), t = uo(t, l), t.flags |= 4096;
      return t;
    }
    return e = ba(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function co(e, t) {
    var i = t.ref;
    if (i === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (e === null || e.ref !== i) && (t.flags |= 4194816);
    }
  }
  function Kc(e, t, i, l, u) {
    return zi(t), i = Mc(
      e,
      t,
      i,
      l,
      void 0,
      u
    ), l = Rc(), e !== null && !zt ? (Ac(e, t, u), Ta(e, t, u)) : (Ke && l && uc(t), t.flags |= 1, en(e, t, i, u), t.child);
  }
  function Jp(e, t, i, l, u, d) {
    return zi(t), t.updateQueue = null, i = tp(
      t,
      l,
      i,
      u
    ), ep(e), l = Rc(), e !== null && !zt ? (Ac(e, t, d), Ta(e, t, d)) : (Ke && l && uc(t), t.flags |= 1, en(e, t, i, d), t.child);
  }
  function Wp(e, t, i, l, u) {
    if (zi(t), t.stateNode === null) {
      var d = cr, y = i.contextType;
      typeof y == "object" && y !== null && (d = Wt(y)), d = new i(l, d), t.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = Yc, t.stateNode = d, d._reactInternals = t, d = t.stateNode, d.props = l, d.state = t.memoizedState, d.refs = {}, xc(t), y = i.contextType, d.context = typeof y == "object" && y !== null ? Wt(y) : cr, d.state = t.memoizedState, y = i.getDerivedStateFromProps, typeof y == "function" && (Fc(
        t,
        i,
        y,
        l
      ), d.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (y = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), y !== d.state && Yc.enqueueReplaceState(d, d.state, null), Sl(t, l, d, u), xl(), d.state = t.memoizedState), typeof d.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      d = t.stateNode;
      var E = t.memoizedProps, D = Bi(i, E);
      d.props = D;
      var Y = d.context, ee = i.contextType;
      y = cr, typeof ee == "object" && ee !== null && (y = Wt(ee));
      var ie = i.getDerivedStateFromProps;
      ee = typeof ie == "function" || typeof d.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, ee || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (E || Y !== y) && Bp(
        t,
        d,
        l,
        y
      ), Ga = !1;
      var X = t.memoizedState;
      d.state = X, Sl(t, l, d, u), xl(), Y = t.memoizedState, E || X !== Y || Ga ? (typeof ie == "function" && (Fc(
        t,
        i,
        ie,
        l
      ), Y = t.memoizedState), (D = Ga || Vp(
        t,
        i,
        D,
        l,
        X,
        Y,
        y
      )) ? (ee || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = Y), d.props = l, d.state = Y, d.context = y, l = D) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      d = t.stateNode, Sc(e, t), y = t.memoizedProps, ee = Bi(i, y), d.props = ee, ie = t.pendingProps, X = d.context, Y = i.contextType, D = cr, typeof Y == "object" && Y !== null && (D = Wt(Y)), E = i.getDerivedStateFromProps, (Y = typeof E == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (y !== ie || X !== D) && Bp(
        t,
        d,
        l,
        D
      ), Ga = !1, X = t.memoizedState, d.state = X, Sl(t, l, d, u), xl();
      var P = t.memoizedState;
      y !== ie || X !== P || Ga || e !== null && e.dependencies !== null && Ys(e.dependencies) ? (typeof E == "function" && (Fc(
        t,
        i,
        E,
        l
      ), P = t.memoizedState), (ee = Ga || Vp(
        t,
        i,
        ee,
        l,
        X,
        P,
        D
      ) || e !== null && e.dependencies !== null && Ys(e.dependencies)) ? (Y || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, P, D), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        l,
        P,
        D
      )), typeof d.componentDidUpdate == "function" && (t.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || y === e.memoizedProps && X === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && X === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = P), d.props = l, d.state = P, d.context = D, l = ee) : (typeof d.componentDidUpdate != "function" || y === e.memoizedProps && X === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && X === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return d = l, co(e, t), l = (t.flags & 128) !== 0, d || l ? (d = t.stateNode, i = l && typeof i.getDerivedStateFromError != "function" ? null : d.render(), t.flags |= 1, e !== null && l ? (t.child = ki(
      t,
      e.child,
      null,
      u
    ), t.child = ki(
      t,
      null,
      i,
      u
    )) : en(e, t, i, u), t.memoizedState = d.state, e = t.child) : e = Ta(
      e,
      t,
      u
    ), e;
  }
  function eg(e, t, i, l) {
    return _i(), t.flags |= 256, en(e, t, i, l), t.child;
  }
  var Qc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Pc(e) {
    return { baseLanes: e, cachePool: Im() };
  }
  function Zc(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= Nn), e;
  }
  function tg(e, t, i) {
    var l = t.pendingProps, u = !1, d = (t.flags & 128) !== 0, y;
    if ((y = d) || (y = e !== null && e.memoizedState === null ? !1 : (Tt.current & 2) !== 0), y && (u = !0, t.flags &= -129), y = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Ke) {
        if (u ? Qa(t) : Pa(), (e = pt) ? (e = uv(
          e,
          Bn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: $a !== null ? { id: oa, overflow: ua } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Om(e), i.return = t, t.child = i, Jt = t, pt = null)) : e = null, e === null) throw Fa(t);
        return zd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = l.children;
      return l = l.fallback, u ? (Pa(), u = t.mode, E = fo(
        { mode: "hidden", children: E },
        u
      ), l = Ai(
        l,
        u,
        i,
        null
      ), E.return = t, l.return = t, E.sibling = l, t.child = E, l = t.child, l.memoizedState = Pc(i), l.childLanes = Zc(
        e,
        y,
        i
      ), t.memoizedState = Qc, Nl(null, l)) : (Qa(t), Jc(t, E));
    }
    var D = e.memoizedState;
    if (D !== null && (E = D.dehydrated, E !== null)) {
      if (d)
        t.flags & 256 ? (Qa(t), t.flags &= -257, t = Wc(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (Pa(), t.child = e.child, t.flags |= 128, t = null) : (Pa(), E = l.fallback, u = t.mode, l = fo(
          { mode: "visible", children: l.children },
          u
        ), E = Ai(
          E,
          u,
          i,
          null
        ), E.flags |= 2, l.return = t, E.return = t, l.sibling = E, t.child = l, ki(
          t,
          e.child,
          null,
          i
        ), l = t.child, l.memoizedState = Pc(i), l.childLanes = Zc(
          e,
          y,
          i
        ), t.memoizedState = Qc, t = Nl(null, l));
      else if (Qa(t), zd(E)) {
        if (y = E.nextSibling && E.nextSibling.dataset, y) var Y = y.dgst;
        y = Y, l = Error(s(419)), l.stack = "", l.digest = y, ml({ value: l, source: null, stack: null }), t = Wc(
          e,
          t,
          i
        );
      } else if (zt || mr(e, t, i, !1), y = (i & e.childLanes) !== 0, zt || y) {
        if (y = ft, y !== null && (l = R(y, i), l !== 0 && l !== D.retryLane))
          throw D.retryLane = l, Ri(e, l), gn(y, e, l), Xc;
        Dd(E) || So(), t = Wc(
          e,
          t,
          i
        );
      } else
        Dd(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = D.treeContext, pt = qn(
          E.nextSibling
        ), Jt = t, Ke = !0, Ia = null, Bn = !1, e !== null && km(t, e), t = Jc(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Pa(), E = l.fallback, u = t.mode, D = e.child, Y = D.sibling, l = ba(D, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = D.subtreeFlags & 65011712, Y !== null ? E = ba(
      Y,
      E
    ) : (E = Ai(
      E,
      u,
      i,
      null
    ), E.flags |= 2), E.return = t, l.return = t, l.sibling = E, t.child = l, Nl(null, l), l = t.child, E = e.child.memoizedState, E === null ? E = Pc(i) : (u = E.cachePool, u !== null ? (D = _t._currentValue, u = u.parent !== D ? { parent: D, pool: D } : u) : u = Im(), E = {
      baseLanes: E.baseLanes | i,
      cachePool: u
    }), l.memoizedState = E, l.childLanes = Zc(
      e,
      y,
      i
    ), t.memoizedState = Qc, Nl(e.child, l)) : (Qa(t), i = e.child, e = i.sibling, i = ba(i, {
      mode: "visible",
      children: l.children
    }), i.return = t, i.sibling = null, e !== null && (y = t.deletions, y === null ? (t.deletions = [e], t.flags |= 16) : y.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function Jc(e, t) {
    return t = fo(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function fo(e, t) {
    return e = wn(22, e, null, t), e.lanes = 0, e;
  }
  function Wc(e, t, i) {
    return ki(t, e.child, null, i), e = Jc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function ng(e, t, i) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), mc(e.return, t, i);
  }
  function ed(e, t, i, l, u, d) {
    var y = e.memoizedState;
    y === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: i,
      tailMode: u,
      treeForkCount: d
    } : (y.isBackwards = t, y.rendering = null, y.renderingStartTime = 0, y.last = l, y.tail = i, y.tailMode = u, y.treeForkCount = d);
  }
  function ag(e, t, i) {
    var l = t.pendingProps, u = l.revealOrder, d = l.tail;
    l = l.children;
    var y = Tt.current, E = (y & 2) !== 0;
    if (E ? (y = y & 1 | 2, t.flags |= 128) : y &= 1, Z(Tt, y), en(e, t, l, i), l = Ke ? hl : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && ng(e, i, t);
        else if (e.tag === 19)
          ng(e, i, t);
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
        for (i = t.child, u = null; i !== null; )
          e = i.alternate, e !== null && Ws(e) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = t.child, t.child = null) : (u = i.sibling, i.sibling = null), ed(
          t,
          !1,
          u,
          i,
          d,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && Ws(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = i, i = u, u = e;
        }
        ed(
          t,
          !0,
          i,
          null,
          d,
          l
        );
        break;
      case "together":
        ed(
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
  function Ta(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), Wa |= t.lanes, (i & t.childLanes) === 0)
      if (e !== null) {
        if (mr(
          e,
          t,
          i,
          !1
        ), (i & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, i = ba(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; )
        e = e.sibling, i = i.sibling = ba(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function td(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ys(e)));
  }
  function aw(e, t, i) {
    switch (t.tag) {
      case 3:
        _e(t, t.stateNode.containerInfo), Ya(t, _t, e.memoizedState.cache), _i();
        break;
      case 27:
      case 5:
        kt(t);
        break;
      case 4:
        _e(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ya(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Nc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Qa(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? tg(e, t, i) : (Qa(t), e = Ta(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        Qa(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (l = (i & t.childLanes) !== 0, l || (mr(
          e,
          t,
          i,
          !1
        ), l = (i & t.childLanes) !== 0), u) {
          if (l)
            return ag(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), Z(Tt, Tt.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Qp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        Ya(t, _t, e.memoizedState.cache);
    }
    return Ta(e, t, i);
  }
  function ig(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        zt = !0;
      else {
        if (!td(e, i) && (t.flags & 128) === 0)
          return zt = !1, aw(
            e,
            t,
            i
          );
        zt = (e.flags & 131072) !== 0;
      }
    else
      zt = !1, Ke && (t.flags & 1048576) !== 0 && Um(t, hl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Li(t.elementType), t.type = e, typeof e == "function")
            lc(e) ? (l = Bi(e, l), t.tag = 1, t = Wp(
              null,
              t,
              e,
              l,
              i
            )) : (t.tag = 0, t = Kc(
              null,
              t,
              e,
              l,
              i
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === _) {
                t.tag = 11, t = Gp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              } else if (u === W) {
                t.tag = 14, t = Xp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              }
            }
            throw t = ge(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Kc(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 1:
        return l = t.type, u = Bi(
          l,
          t.pendingProps
        ), Wp(
          e,
          t,
          l,
          u,
          i
        );
      case 3:
        e: {
          if (_e(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = t.pendingProps;
          var d = t.memoizedState;
          u = d.element, Sc(e, t), Sl(t, l, null, i);
          var y = t.memoizedState;
          if (l = y.cache, Ya(t, _t, l), l !== d.cache && pc(
            t,
            [_t],
            i,
            !0
          ), xl(), l = y.element, d.isDehydrated)
            if (d = {
              element: l,
              isDehydrated: !1,
              cache: y.cache
            }, t.updateQueue.baseState = d, t.memoizedState = d, t.flags & 256) {
              t = eg(
                e,
                t,
                l,
                i
              );
              break e;
            } else if (l !== u) {
              u = Un(
                Error(s(424)),
                t
              ), ml(u), t = eg(
                e,
                t,
                l,
                i
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
              for (pt = qn(e.firstChild), Jt = t, Ke = !0, Ia = null, Bn = !0, i = Qm(
                t,
                null,
                l,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (_i(), l === u) {
              t = Ta(
                e,
                t,
                i
              );
              break e;
            }
            en(e, t, l, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return co(e, t), e === null ? (i = pv(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : Ke || (i = t.type, e = t.pendingProps, l = Mo(
          ve.current
        ).createElement(i), l[he] = t, l[pe] = e, tn(l, i, e), ht(l), t.stateNode = l) : t.memoizedState = pv(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return kt(t), e === null && Ke && (l = t.stateNode = fv(
          t.type,
          t.pendingProps,
          ve.current
        ), Jt = t, Bn = !0, u = pt, ii(t.type) ? (Od = u, pt = qn(l.firstChild)) : pt = u), en(
          e,
          t,
          t.pendingProps.children,
          i
        ), co(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Ke && ((u = l = pt) && (l = zw(
          l,
          t.type,
          t.pendingProps,
          Bn
        ), l !== null ? (t.stateNode = l, Jt = t, pt = qn(l.firstChild), Bn = !1, u = !0) : u = !1), u || Fa(t)), kt(t), u = t.type, d = t.pendingProps, y = e !== null ? e.memoizedProps : null, l = d.children, Rd(u, d) ? l = null : y !== null && Rd(u, y) && (t.flags |= 32), t.memoizedState !== null && (u = Mc(
          e,
          t,
          KS,
          null,
          null,
          i
        ), ql._currentValue = u), co(e, t), en(e, t, l, i), t.child;
      case 6:
        return e === null && Ke && ((e = i = pt) && (i = Ow(
          i,
          t.pendingProps,
          Bn
        ), i !== null ? (t.stateNode = i, Jt = t, pt = null, e = !0) : e = !1), e || Fa(t)), null;
      case 13:
        return tg(e, t, i);
      case 4:
        return _e(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = ki(
          t,
          null,
          l,
          i
        ) : en(e, t, l, i), t.child;
      case 11:
        return Gp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 7:
        return en(
          e,
          t,
          t.pendingProps,
          i
        ), t.child;
      case 8:
        return en(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 12:
        return en(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 10:
        return l = t.pendingProps, Ya(t, t.type, l.value), en(e, t, l.children, i), t.child;
      case 9:
        return u = t.type._context, l = t.pendingProps.children, zi(t), u = Wt(u), l = l(u), t.flags |= 1, en(e, t, l, i), t.child;
      case 14:
        return Xp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return Kp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return ag(e, t, i);
      case 31:
        return nw(e, t, i);
      case 22:
        return Qp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return zi(t), l = Wt(_t), e === null ? (u = yc(), u === null && (u = ft, d = gc(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), t.memoizedState = { parent: l, cache: u }, xc(t), Ya(t, _t, u)) : ((e.lanes & i) !== 0 && (Sc(e, t), Sl(t, null, null, i), xl()), u = e.memoizedState, d = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Ya(t, _t, l)) : (l = d.cache, Ya(t, _t, l), l !== u.cache && pc(
          t,
          [_t],
          i,
          !0
        ))), en(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Na(e) {
    e.flags |= 4;
  }
  function nd(e, t, i, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (_g()) e.flags |= 8192;
        else
          throw Ui = Qs, bc;
    } else e.flags &= -16777217;
  }
  function rg(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !xv(t))
      if (_g()) e.flags |= 8192;
      else
        throw Ui = Qs, bc;
  }
  function ho(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? It() : 536870912, e.lanes |= t, Nr |= t);
  }
  function Cl(e, t) {
    if (!Ke)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var i = null; t !== null; )
            t.alternate !== null && (i = t), t = t.sibling;
          i === null ? e.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = e.tail;
          for (var l = null; i !== null; )
            i.alternate !== null && (l = i), i = i.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function gt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, i = 0, l = 0;
    if (t)
      for (var u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, l |= u.subtreeFlags & 65011712, l |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= l, e.childLanes = i, t;
  }
  function iw(e, t, i) {
    var l = t.pendingProps;
    switch (cc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return gt(t), null;
      case 1:
        return gt(t), null;
      case 3:
        return i = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), wa(_t), Be(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (hr(t) ? Na(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, fc())), gt(t), null;
      case 26:
        var u = t.type, d = t.memoizedState;
        return e === null ? (Na(t), d !== null ? (gt(t), rg(t, d)) : (gt(t), nd(
          t,
          u,
          null,
          l,
          i
        ))) : d ? d !== e.memoizedState ? (Na(t), gt(t), rg(t, d)) : (gt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Na(t), gt(t), nd(
          t,
          u,
          e,
          l,
          i
        )), null;
      case 27:
        if (Yt(t), i = ve.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Na(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return gt(t), null;
          }
          e = re.current, hr(t) ? Vm(t) : (e = fv(u, l, i), t.stateNode = e, Na(t));
        }
        return gt(t), null;
      case 5:
        if (Yt(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Na(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return gt(t), null;
          }
          if (d = re.current, hr(t))
            Vm(t);
          else {
            var y = Mo(
              ve.current
            );
            switch (d) {
              case 1:
                d = y.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                d = y.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    d = y.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    d = y.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    d = y.createElement("div"), d.innerHTML = "<script><\/script>", d = d.removeChild(
                      d.firstChild
                    );
                    break;
                  case "select":
                    d = typeof l.is == "string" ? y.createElement("select", {
                      is: l.is
                    }) : y.createElement("select"), l.multiple ? d.multiple = !0 : l.size && (d.size = l.size);
                    break;
                  default:
                    d = typeof l.is == "string" ? y.createElement(u, { is: l.is }) : y.createElement(u);
                }
            }
            d[he] = t, d[pe] = l;
            e: for (y = t.child; y !== null; ) {
              if (y.tag === 5 || y.tag === 6)
                d.appendChild(y.stateNode);
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
            t.stateNode = d;
            e: switch (tn(d, u, l), u) {
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
            l && Na(t);
          }
        }
        return gt(t), nd(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          i
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && Na(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = ve.current, hr(t)) {
            if (e = t.stateNode, i = t.memoizedProps, l = null, u = Jt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            e[he] = t, e = !!(e.nodeValue === i || l !== null && l.suppressHydrationWarning === !0 || tv(e.nodeValue, i)), e || Fa(t, !0);
          } else
            e = Mo(e).createTextNode(
              l
            ), e[he] = t, t.stateNode = e;
        }
        return gt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = hr(t), i !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[he] = t;
            } else
              _i(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            gt(t), e = !1;
          } else
            i = fc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (jn(t), t) : (jn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return gt(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = hr(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[he] = t;
            } else
              _i(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            gt(t), u = !1;
          } else
            u = fc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (jn(t), t) : (jn(t), null);
        }
        return jn(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = l !== null, e = e !== null && e.memoizedState !== null, i && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), d = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (d = l.memoizedState.cachePool.pool), d !== u && (l.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), ho(t, t.updateQueue), gt(t), null);
      case 4:
        return Be(), e === null && jd(t.stateNode.containerInfo), gt(t), null;
      case 10:
        return wa(t.type), gt(t), null;
      case 19:
        if (K(Tt), l = t.memoizedState, l === null) return gt(t), null;
        if (u = (t.flags & 128) !== 0, d = l.rendering, d === null)
          if (u) Cl(l, !1);
          else {
            if (wt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (d = Ws(e), d !== null) {
                  for (t.flags |= 128, Cl(l, !1), e = d.updateQueue, t.updateQueue = e, ho(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    zm(i, e), i = i.sibling;
                  return Z(
                    Tt,
                    Tt.current & 1 | 2
                  ), Ke && xa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Bt() > yo && (t.flags |= 128, u = !0, Cl(l, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Ws(d), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, ho(t, e), Cl(l, !0), l.tail === null && l.tailMode === "hidden" && !d.alternate && !Ke)
                return gt(t), null;
            } else
              2 * Bt() - l.renderingStartTime > yo && i !== 536870912 && (t.flags |= 128, u = !0, Cl(l, !1), t.lanes = 4194304);
          l.isBackwards ? (d.sibling = t.child, t.child = d) : (e = l.last, e !== null ? e.sibling = d : t.child = d, l.last = d);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Bt(), e.sibling = null, i = Tt.current, Z(
          Tt,
          u ? i & 1 | 2 : i & 1
        ), Ke && xa(t, l.treeForkCount), e) : (gt(t), null);
      case 22:
      case 23:
        return jn(t), Tc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (gt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : gt(t), i = t.updateQueue, i !== null && ho(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== i && (t.flags |= 2048), e !== null && K(Oi), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), wa(_t), gt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function rw(e, t) {
    switch (cc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return wa(_t), Be(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Yt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (jn(t), t.alternate === null)
            throw Error(s(340));
          _i();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (jn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          _i();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return K(Tt), null;
      case 4:
        return Be(), null;
      case 10:
        return wa(t.type), null;
      case 22:
      case 23:
        return jn(t), Tc(), e !== null && K(Oi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return wa(_t), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function lg(e, t) {
    switch (cc(t), t.tag) {
      case 3:
        wa(_t), Be();
        break;
      case 26:
      case 27:
      case 5:
        Yt(t);
        break;
      case 4:
        Be();
        break;
      case 31:
        t.memoizedState !== null && jn(t);
        break;
      case 13:
        jn(t);
        break;
      case 19:
        K(Tt);
        break;
      case 10:
        wa(t.type);
        break;
      case 22:
      case 23:
        jn(t), Tc(), e !== null && K(Oi);
        break;
      case 24:
        wa(_t);
    }
  }
  function Ml(e, t) {
    try {
      var i = t.updateQueue, l = i !== null ? i.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        i = u;
        do {
          if ((i.tag & e) === e) {
            l = void 0;
            var d = i.create, y = i.inst;
            l = d(), y.destroy = l;
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (E) {
      at(t, t.return, E);
    }
  }
  function Za(e, t, i) {
    try {
      var l = t.updateQueue, u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var d = u.next;
        l = d;
        do {
          if ((l.tag & e) === e) {
            var y = l.inst, E = y.destroy;
            if (E !== void 0) {
              y.destroy = void 0, u = t;
              var D = i, Y = E;
              try {
                Y();
              } catch (ee) {
                at(
                  u,
                  D,
                  ee
                );
              }
            }
          }
          l = l.next;
        } while (l !== d);
      }
    } catch (ee) {
      at(t, t.return, ee);
    }
  }
  function sg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Zm(t, i);
      } catch (l) {
        at(e, e.return, l);
      }
    }
  }
  function og(e, t, i) {
    i.props = Bi(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (l) {
      at(e, t, l);
    }
  }
  function Rl(e, t) {
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
    } catch (u) {
      at(e, t, u);
    }
  }
  function ca(e, t) {
    var i = e.ref, l = e.refCleanup;
    if (i !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          at(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          at(e, t, u);
        }
      else i.current = null;
  }
  function ug(e) {
    var t = e.type, i = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && l.focus();
          break e;
        case "img":
          i.src ? l.src = i.src : i.srcSet && (l.srcset = i.srcSet);
      }
    } catch (u) {
      at(e, e.return, u);
    }
  }
  function ad(e, t, i) {
    try {
      var l = e.stateNode;
      Cw(l, e.type, i, t), l[pe] = t;
    } catch (u) {
      at(e, e.return, u);
    }
  }
  function cg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ii(e.type) || e.tag === 4;
  }
  function id(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || cg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ii(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function rd(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = va));
    else if (l !== 4 && (l === 27 && ii(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (rd(e, t, i), e = e.sibling; e !== null; )
        rd(e, t, i), e = e.sibling;
  }
  function mo(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (l !== 4 && (l === 27 && ii(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (mo(e, t, i), e = e.sibling; e !== null; )
        mo(e, t, i), e = e.sibling;
  }
  function dg(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      tn(t, l, i), t[he] = e, t[pe] = i;
    } catch (d) {
      at(e, e.return, d);
    }
  }
  var Ca = !1, Ot = !1, ld = !1, fg = typeof WeakSet == "function" ? WeakSet : Set, Xt = null;
  function lw(e, t) {
    if (e = e.containerInfo, Cd = Lo, e = jm(e), Wu(e)) {
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
            var u = l.anchorOffset, d = l.focusNode;
            l = l.focusOffset;
            try {
              i.nodeType, d.nodeType;
            } catch {
              i = null;
              break e;
            }
            var y = 0, E = -1, D = -1, Y = 0, ee = 0, ie = e, X = null;
            t: for (; ; ) {
              for (var P; ie !== i || u !== 0 && ie.nodeType !== 3 || (E = y + u), ie !== d || l !== 0 && ie.nodeType !== 3 || (D = y + l), ie.nodeType === 3 && (y += ie.nodeValue.length), (P = ie.firstChild) !== null; )
                X = ie, ie = P;
              for (; ; ) {
                if (ie === e) break t;
                if (X === i && ++Y === u && (E = y), X === d && ++ee === l && (D = y), (P = ie.nextSibling) !== null) break;
                ie = X, X = ie.parentNode;
              }
              ie = P;
            }
            i = E === -1 || D === -1 ? null : { start: E, end: D };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Md = { focusedElem: e, selectionRange: i }, Lo = !1, Xt = t; Xt !== null; )
      if (t = Xt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Xt = e;
      else
        for (; Xt !== null; ) {
          switch (t = Xt, d = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  u = e[i], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && d !== null) {
                e = void 0, i = t, u = d.memoizedProps, d = d.memoizedState, l = i.stateNode;
                try {
                  var xe = Bi(
                    i.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    xe,
                    d
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (De) {
                  at(
                    i,
                    i.return,
                    De
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, i = e.nodeType, i === 9)
                  _d(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      _d(e);
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
  function hg(e, t, i) {
    var l = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Ra(e, i), l & 4 && Ml(5, i);
        break;
      case 1:
        if (Ra(e, i), l & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (y) {
              at(i, i.return, y);
            }
          else {
            var u = Bi(
              i.type,
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
              at(
                i,
                i.return,
                y
              );
            }
          }
        l & 64 && sg(i), l & 512 && Rl(i, i.return);
        break;
      case 3:
        if (Ra(e, i), l & 64 && (e = i.updateQueue, e !== null)) {
          if (t = null, i.child !== null)
            switch (i.child.tag) {
              case 27:
              case 5:
                t = i.child.stateNode;
                break;
              case 1:
                t = i.child.stateNode;
            }
          try {
            Zm(e, t);
          } catch (y) {
            at(i, i.return, y);
          }
        }
        break;
      case 27:
        t === null && l & 4 && dg(i);
      case 26:
      case 5:
        Ra(e, i), t === null && l & 4 && ug(i), l & 512 && Rl(i, i.return);
        break;
      case 12:
        Ra(e, i);
        break;
      case 31:
        Ra(e, i), l & 4 && gg(e, i);
        break;
      case 13:
        Ra(e, i), l & 4 && vg(e, i), l & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = pw.bind(
          null,
          i
        ), Lw(e, i))));
        break;
      case 22:
        if (l = i.memoizedState !== null || Ca, !l) {
          t = t !== null && t.memoizedState !== null || Ot, u = Ca;
          var d = Ot;
          Ca = l, (Ot = t) && !d ? Aa(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : Ra(e, i), Ca = u, Ot = d;
        }
        break;
      case 30:
        break;
      default:
        Ra(e, i);
    }
  }
  function mg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, mg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && dt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var bt = null, fn = !1;
  function Ma(e, t, i) {
    for (i = i.child; i !== null; )
      pg(e, t, i), i = i.sibling;
  }
  function pg(e, t, i) {
    if (Pt && typeof Pt.onCommitFiberUnmount == "function")
      try {
        Pt.onCommitFiberUnmount(Qn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Ot || ca(i, t), Ma(
          e,
          t,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Ot || ca(i, t);
        var l = bt, u = fn;
        ii(i.type) && (bt = i.stateNode, fn = !1), Ma(
          e,
          t,
          i
        ), Vl(i.stateNode), bt = l, fn = u;
        break;
      case 5:
        Ot || ca(i, t);
      case 6:
        if (l = bt, u = fn, bt = null, Ma(
          e,
          t,
          i
        ), bt = l, fn = u, bt !== null)
          if (fn)
            try {
              (bt.nodeType === 9 ? bt.body : bt.nodeName === "HTML" ? bt.ownerDocument.body : bt).removeChild(i.stateNode);
            } catch (d) {
              at(
                i,
                t,
                d
              );
            }
          else
            try {
              bt.removeChild(i.stateNode);
            } catch (d) {
              at(
                i,
                t,
                d
              );
            }
        break;
      case 18:
        bt !== null && (fn ? (e = bt, sv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), Or(e)) : sv(bt, i.stateNode));
        break;
      case 4:
        l = bt, u = fn, bt = i.stateNode.containerInfo, fn = !0, Ma(
          e,
          t,
          i
        ), bt = l, fn = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Za(2, i, t), Ot || Za(4, i, t), Ma(
          e,
          t,
          i
        );
        break;
      case 1:
        Ot || (ca(i, t), l = i.stateNode, typeof l.componentWillUnmount == "function" && og(
          i,
          t,
          l
        )), Ma(
          e,
          t,
          i
        );
        break;
      case 21:
        Ma(
          e,
          t,
          i
        );
        break;
      case 22:
        Ot = (l = Ot) || i.memoizedState !== null, Ma(
          e,
          t,
          i
        ), Ot = l;
        break;
      default:
        Ma(
          e,
          t,
          i
        );
    }
  }
  function gg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Or(e);
      } catch (i) {
        at(t, t.return, i);
      }
    }
  }
  function vg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Or(e);
      } catch (i) {
        at(t, t.return, i);
      }
  }
  function sw(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new fg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new fg()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function po(e, t) {
    var i = sw(e);
    t.forEach(function(l) {
      if (!i.has(l)) {
        i.add(l);
        var u = gw.bind(null, e, l);
        l.then(u, u);
      }
    });
  }
  function hn(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var l = 0; l < i.length; l++) {
        var u = i[l], d = e, y = t, E = y;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (ii(E.type)) {
                bt = E.stateNode, fn = !1;
                break e;
              }
              break;
            case 5:
              bt = E.stateNode, fn = !1;
              break e;
            case 3:
            case 4:
              bt = E.stateNode.containerInfo, fn = !0;
              break e;
          }
          E = E.return;
        }
        if (bt === null) throw Error(s(160));
        pg(d, y, u), bt = null, fn = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        yg(t, e), t = t.sibling;
  }
  var Wn = null;
  function yg(e, t) {
    var i = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        hn(t, e), mn(e), l & 4 && (Za(3, e, e.return), Ml(3, e), Za(5, e, e.return));
        break;
      case 1:
        hn(t, e), mn(e), l & 512 && (Ot || i === null || ca(i, i.return)), l & 64 && Ca && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? l : i.concat(l))));
        break;
      case 26:
        var u = Wn;
        if (hn(t, e), mn(e), l & 512 && (Ot || i === null || ca(i, i.return)), l & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (l = e.memoizedState, i === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, i = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (l) {
                    case "title":
                      d = u.getElementsByTagName("title")[0], (!d || d[He] || d[he] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(l), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), tn(d, l, i), d[he] = e, ht(d), l = d;
                      break e;
                    case "link":
                      var y = yv(
                        "link",
                        "href",
                        u
                      ).get(l + (i.href || ""));
                      if (y) {
                        for (var E = 0; E < y.length; E++)
                          if (d = y[E], d.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && d.getAttribute("rel") === (i.rel == null ? null : i.rel) && d.getAttribute("title") === (i.title == null ? null : i.title) && d.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            y.splice(E, 1);
                            break t;
                          }
                      }
                      d = u.createElement(l), tn(d, l, i), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (y = yv(
                        "meta",
                        "content",
                        u
                      ).get(l + (i.content || ""))) {
                        for (E = 0; E < y.length; E++)
                          if (d = y[E], d.getAttribute("content") === (i.content == null ? null : "" + i.content) && d.getAttribute("name") === (i.name == null ? null : i.name) && d.getAttribute("property") === (i.property == null ? null : i.property) && d.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && d.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            y.splice(E, 1);
                            break t;
                          }
                      }
                      d = u.createElement(l), tn(d, l, i), u.head.appendChild(d);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  d[he] = e, ht(d), l = d;
                }
                e.stateNode = l;
              } else
                bv(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = vv(
                u,
                l,
                e.memoizedProps
              );
          else
            d !== l ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, l === null ? bv(
              u,
              e.type,
              e.stateNode
            ) : vv(
              u,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && ad(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        hn(t, e), mn(e), l & 512 && (Ot || i === null || ca(i, i.return)), i !== null && l & 4 && ad(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (hn(t, e), mn(e), l & 512 && (Ot || i === null || ca(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            ar(u, "");
          } catch (xe) {
            at(e, e.return, xe);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, ad(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), l & 1024 && (ld = !0);
        break;
      case 6:
        if (hn(t, e), mn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = l;
          } catch (xe) {
            at(e, e.return, xe);
          }
        }
        break;
      case 3:
        if (_o = null, u = Wn, Wn = Ro(t.containerInfo), hn(t, e), Wn = u, mn(e), l & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Or(t.containerInfo);
          } catch (xe) {
            at(e, e.return, xe);
          }
        ld && (ld = !1, bg(e));
        break;
      case 4:
        l = Wn, Wn = Ro(
          e.stateNode.containerInfo
        ), hn(t, e), mn(e), Wn = l;
        break;
      case 12:
        hn(t, e), mn(e);
        break;
      case 31:
        hn(t, e), mn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, po(e, l)));
        break;
      case 13:
        hn(t, e), mn(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (vo = Bt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, po(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var D = i !== null && i.memoizedState !== null, Y = Ca, ee = Ot;
        if (Ca = Y || u, Ot = ee || D, hn(t, e), Ot = ee, Ca = Y, mn(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (i === null || D || Ca || Ot || Hi(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                D = i = t;
                try {
                  if (d = D.stateNode, u)
                    y = d.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    E = D.stateNode;
                    var ie = D.memoizedProps.style, X = ie != null && ie.hasOwnProperty("display") ? ie.display : null;
                    E.style.display = X == null || typeof X == "boolean" ? "" : ("" + X).trim();
                  }
                } catch (xe) {
                  at(D, D.return, xe);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                D = t;
                try {
                  D.stateNode.nodeValue = u ? "" : D.memoizedProps;
                } catch (xe) {
                  at(D, D.return, xe);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                D = t;
                try {
                  var P = D.stateNode;
                  u ? ov(P, !0) : ov(D.stateNode, !1);
                } catch (xe) {
                  at(D, D.return, xe);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              i === t && (i = null), t = t.return;
            }
            i === t && (i = null), t.sibling.return = t.return, t = t.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (i = l.retryQueue, i !== null && (l.retryQueue = null, po(e, i))));
        break;
      case 19:
        hn(t, e), mn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, po(e, l)));
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
        for (var i, l = e.return; l !== null; ) {
          if (cg(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, d = id(e);
            mo(e, d, u);
            break;
          case 5:
            var y = i.stateNode;
            i.flags & 32 && (ar(y, ""), i.flags &= -33);
            var E = id(e);
            mo(e, E, y);
            break;
          case 3:
          case 4:
            var D = i.stateNode.containerInfo, Y = id(e);
            rd(
              e,
              Y,
              D
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (ee) {
        at(e, e.return, ee);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function bg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        bg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Ra(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        hg(e, t.alternate, t), t = t.sibling;
  }
  function Hi(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Za(4, t, t.return), Hi(t);
          break;
        case 1:
          ca(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && og(
            t,
            t.return,
            i
          ), Hi(t);
          break;
        case 27:
          Vl(t.stateNode);
        case 26:
        case 5:
          ca(t, t.return), Hi(t);
          break;
        case 22:
          t.memoizedState === null && Hi(t);
          break;
        case 30:
          Hi(t);
          break;
        default:
          Hi(t);
      }
      e = e.sibling;
    }
  }
  function Aa(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, u = e, d = t, y = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Aa(
            u,
            d,
            i
          ), Ml(4, d);
          break;
        case 1:
          if (Aa(
            u,
            d,
            i
          ), l = d, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (Y) {
              at(l, l.return, Y);
            }
          if (l = d, u = l.updateQueue, u !== null) {
            var E = l.stateNode;
            try {
              var D = u.shared.hiddenCallbacks;
              if (D !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < D.length; u++)
                  Pm(D[u], E);
            } catch (Y) {
              at(l, l.return, Y);
            }
          }
          i && y & 64 && sg(d), Rl(d, d.return);
          break;
        case 27:
          dg(d);
        case 26:
        case 5:
          Aa(
            u,
            d,
            i
          ), i && l === null && y & 4 && ug(d), Rl(d, d.return);
          break;
        case 12:
          Aa(
            u,
            d,
            i
          );
          break;
        case 31:
          Aa(
            u,
            d,
            i
          ), i && y & 4 && gg(u, d);
          break;
        case 13:
          Aa(
            u,
            d,
            i
          ), i && y & 4 && vg(u, d);
          break;
        case 22:
          d.memoizedState === null && Aa(
            u,
            d,
            i
          ), Rl(d, d.return);
          break;
        case 30:
          break;
        default:
          Aa(
            u,
            d,
            i
          );
      }
      t = t.sibling;
    }
  }
  function sd(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && pl(i));
  }
  function od(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && pl(e));
  }
  function ea(e, t, i, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        xg(
          e,
          t,
          i,
          l
        ), t = t.sibling;
  }
  function xg(e, t, i, l) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ea(
          e,
          t,
          i,
          l
        ), u & 2048 && Ml(9, t);
        break;
      case 1:
        ea(
          e,
          t,
          i,
          l
        );
        break;
      case 3:
        ea(
          e,
          t,
          i,
          l
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && pl(e)));
        break;
      case 12:
        if (u & 2048) {
          ea(
            e,
            t,
            i,
            l
          ), e = t.stateNode;
          try {
            var d = t.memoizedProps, y = d.id, E = d.onPostCommit;
            typeof E == "function" && E(
              y,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (D) {
            at(t, t.return, D);
          }
        } else
          ea(
            e,
            t,
            i,
            l
          );
        break;
      case 31:
        ea(
          e,
          t,
          i,
          l
        );
        break;
      case 13:
        ea(
          e,
          t,
          i,
          l
        );
        break;
      case 23:
        break;
      case 22:
        d = t.stateNode, y = t.alternate, t.memoizedState !== null ? d._visibility & 2 ? ea(
          e,
          t,
          i,
          l
        ) : Al(e, t) : d._visibility & 2 ? ea(
          e,
          t,
          i,
          l
        ) : (d._visibility |= 2, Er(
          e,
          t,
          i,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && sd(y, t);
        break;
      case 24:
        ea(
          e,
          t,
          i,
          l
        ), u & 2048 && od(t.alternate, t);
        break;
      default:
        ea(
          e,
          t,
          i,
          l
        );
    }
  }
  function Er(e, t, i, l, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var d = e, y = t, E = i, D = l, Y = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          Er(
            d,
            y,
            E,
            D,
            u
          ), Ml(8, y);
          break;
        case 23:
          break;
        case 22:
          var ee = y.stateNode;
          y.memoizedState !== null ? ee._visibility & 2 ? Er(
            d,
            y,
            E,
            D,
            u
          ) : Al(
            d,
            y
          ) : (ee._visibility |= 2, Er(
            d,
            y,
            E,
            D,
            u
          )), u && Y & 2048 && sd(
            y.alternate,
            y
          );
          break;
        case 24:
          Er(
            d,
            y,
            E,
            D,
            u
          ), u && Y & 2048 && od(y.alternate, y);
          break;
        default:
          Er(
            d,
            y,
            E,
            D,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Al(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, l = t, u = l.flags;
        switch (l.tag) {
          case 22:
            Al(i, l), u & 2048 && sd(
              l.alternate,
              l
            );
            break;
          case 24:
            Al(i, l), u & 2048 && od(l.alternate, l);
            break;
          default:
            Al(i, l);
        }
        t = t.sibling;
      }
  }
  var _l = 8192;
  function jr(e, t, i) {
    if (e.subtreeFlags & _l)
      for (e = e.child; e !== null; )
        Sg(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function Sg(e, t, i) {
    switch (e.tag) {
      case 26:
        jr(
          e,
          t,
          i
        ), e.flags & _l && e.memoizedState !== null && Xw(
          i,
          Wn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        jr(
          e,
          t,
          i
        );
        break;
      case 3:
      case 4:
        var l = Wn;
        Wn = Ro(e.stateNode.containerInfo), jr(
          e,
          t,
          i
        ), Wn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = _l, _l = 16777216, jr(
          e,
          t,
          i
        ), _l = l) : jr(
          e,
          t,
          i
        ));
        break;
      default:
        jr(
          e,
          t,
          i
        );
    }
  }
  function wg(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Dl(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Xt = l, jg(
            l,
            e
          );
        }
      wg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Eg(e), e = e.sibling;
  }
  function Eg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Dl(e), e.flags & 2048 && Za(9, e, e.return);
        break;
      case 3:
        Dl(e);
        break;
      case 12:
        Dl(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, go(e)) : Dl(e);
        break;
      default:
        Dl(e);
    }
  }
  function go(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Xt = l, jg(
            l,
            e
          );
        }
      wg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Za(8, t, t.return), go(t);
          break;
        case 22:
          i = t.stateNode, i._visibility & 2 && (i._visibility &= -3, go(t));
          break;
        default:
          go(t);
      }
      e = e.sibling;
    }
  }
  function jg(e, t) {
    for (; Xt !== null; ) {
      var i = Xt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Za(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var l = i.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          pl(i.memoizedState.cache);
      }
      if (l = i.child, l !== null) l.return = i, Xt = l;
      else
        e: for (i = e; Xt !== null; ) {
          l = Xt;
          var u = l.sibling, d = l.return;
          if (mg(l), l === i) {
            Xt = null;
            break e;
          }
          if (u !== null) {
            u.return = d, Xt = u;
            break e;
          }
          Xt = d;
        }
    }
  }
  var ow = {
    getCacheForType: function(e) {
      var t = Wt(_t), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Wt(_t).controller.signal;
    }
  }, uw = typeof WeakMap == "function" ? WeakMap : Map, et = 0, ft = null, Fe = null, Ge = 0, nt = 0, Tn = null, Ja = !1, Tr = !1, ud = !1, _a = 0, wt = 0, Wa = 0, qi = 0, cd = 0, Nn = 0, Nr = 0, zl = null, pn = null, dd = !1, vo = 0, Tg = 0, yo = 1 / 0, bo = null, ei = null, Ft = 0, ti = null, Cr = null, Da = 0, fd = 0, hd = null, Ng = null, Ol = 0, md = null;
  function Cn() {
    return (et & 2) !== 0 && Ge !== 0 ? Ge & -Ge : O.T !== null ? xd() : se();
  }
  function Cg() {
    if (Nn === 0)
      if ((Ge & 536870912) === 0 || Ke) {
        var e = Pn;
        Pn <<= 1, (Pn & 3932160) === 0 && (Pn = 262144), Nn = e;
      } else Nn = 536870912;
    return e = En.current, e !== null && (e.flags |= 32), Nn;
  }
  function gn(e, t, i) {
    (e === ft && (nt === 2 || nt === 9) || e.cancelPendingCommit !== null) && (Mr(e, 0), ni(
      e,
      Ge,
      Nn,
      !1
    )), rt(e, i), ((et & 2) === 0 || e !== ft) && (e === ft && ((et & 2) === 0 && (qi |= i), wt === 4 && ni(
      e,
      Ge,
      Nn,
      !1
    )), da(e));
  }
  function Mg(e, t, i) {
    if ((et & 6) !== 0) throw Error(s(327));
    var l = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ct(e, t), u = l ? fw(e, t) : gd(e, t, !0), d = l;
    do {
      if (u === 0) {
        Tr && !l && ni(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, d && !cw(i)) {
          u = gd(e, t, !1), d = !1;
          continue;
        }
        if (u === 2) {
          if (d = t, e.errorRecoveryDisabledLanes & d)
            var y = 0;
          else
            y = e.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            t = y;
            e: {
              var E = e;
              u = zl;
              var D = E.current.memoizedState.isDehydrated;
              if (D && (Mr(E, y).flags |= 256), y = gd(
                E,
                y,
                !1
              ), y !== 2) {
                if (ud && !D) {
                  E.errorRecoveryDisabledLanes |= d, qi |= d, u = 4;
                  break e;
                }
                d = pn, pn = u, d !== null && (pn === null ? pn = d : pn.push.apply(
                  pn,
                  d
                ));
              }
              u = y;
            }
            if (d = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Mr(e, 0), ni(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, d = u, d) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ni(
                l,
                t,
                Nn,
                !Ja
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
          if ((t & 62914560) === t && (u = vo + 300 - Bt(), 10 < u)) {
            if (ni(
              l,
              t,
              Nn,
              !Ja
            ), Le(l, 0, !0) !== 0) break e;
            Da = t, l.timeoutHandle = rv(
              Rg.bind(
                null,
                l,
                i,
                pn,
                bo,
                dd,
                t,
                Nn,
                qi,
                Nr,
                Ja,
                d,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          Rg(
            l,
            i,
            pn,
            bo,
            dd,
            t,
            Nn,
            qi,
            Nr,
            Ja,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    da(e);
  }
  function Rg(e, t, i, l, u, d, y, E, D, Y, ee, ie, X, P) {
    if (e.timeoutHandle = -1, ie = t.subtreeFlags, ie & 8192 || (ie & 16785408) === 16785408) {
      ie = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: va
      }, Sg(
        t,
        d,
        ie
      );
      var xe = (d & 62914560) === d ? vo - Bt() : (d & 4194048) === d ? Tg - Bt() : 0;
      if (xe = Kw(
        ie,
        xe
      ), xe !== null) {
        Da = d, e.cancelPendingCommit = xe(
          kg.bind(
            null,
            e,
            t,
            d,
            i,
            l,
            u,
            y,
            E,
            D,
            ee,
            ie,
            null,
            X,
            P
          )
        ), ni(e, d, y, !Y);
        return;
      }
    }
    kg(
      e,
      t,
      d,
      i,
      l,
      u,
      y,
      E,
      D
    );
  }
  function cw(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var l = 0; l < i.length; l++) {
          var u = i[l], d = u.getSnapshot;
          u = u.value;
          try {
            if (!Sn(d(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (i = t.child, t.subtreeFlags & 16384 && i !== null)
        i.return = t, t = i;
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
  function ni(e, t, i, l) {
    t &= ~cd, t &= ~qi, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var d = 31 - $t(u), y = 1 << d;
      l[d] = -1, u &= ~y;
    }
    i !== 0 && ga(e, i, t);
  }
  function xo() {
    return (et & 6) === 0 ? (Ll(0), !1) : !0;
  }
  function pd() {
    if (Fe !== null) {
      if (nt === 0)
        var e = Fe.return;
      else
        e = Fe, Sa = Di = null, _c(e), yr = null, vl = 0, e = Fe;
      for (; e !== null; )
        lg(e.alternate, e), e = e.return;
      Fe = null;
    }
  }
  function Mr(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, Aw(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), Da = 0, pd(), ft = e, Fe = i = ba(e.current, null), Ge = t, nt = 0, Tn = null, Ja = !1, Tr = ct(e, t), ud = !1, Nr = Nn = cd = qi = Wa = wt = 0, pn = zl = null, dd = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - $t(l), d = 1 << u;
        t |= e[u], l &= ~d;
      }
    return _a = t, Hs(), i;
  }
  function Ag(e, t) {
    ke = null, O.H = Tl, t === vr || t === Ks ? (t = Gm(), nt = 3) : t === bc ? (t = Gm(), nt = 4) : nt = t === Xc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Tn = t, Fe === null && (wt = 1, oo(
      e,
      Un(t, e.current)
    ));
  }
  function _g() {
    var e = En.current;
    return e === null ? !0 : (Ge & 4194048) === Ge ? Hn === null : (Ge & 62914560) === Ge || (Ge & 536870912) !== 0 ? e === Hn : !1;
  }
  function Dg() {
    var e = O.H;
    return O.H = Tl, e === null ? Tl : e;
  }
  function zg() {
    var e = O.A;
    return O.A = ow, e;
  }
  function So() {
    wt = 4, Ja || (Ge & 4194048) !== Ge && En.current !== null || (Tr = !0), (Wa & 134217727) === 0 && (qi & 134217727) === 0 || ft === null || ni(
      ft,
      Ge,
      Nn,
      !1
    );
  }
  function gd(e, t, i) {
    var l = et;
    et |= 2;
    var u = Dg(), d = zg();
    (ft !== e || Ge !== t) && (bo = null, Mr(e, t)), t = !1;
    var y = wt;
    e: do
      try {
        if (nt !== 0 && Fe !== null) {
          var E = Fe, D = Tn;
          switch (nt) {
            case 8:
              pd(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              En.current === null && (t = !0);
              var Y = nt;
              if (nt = 0, Tn = null, Rr(e, E, D, Y), i && Tr) {
                y = 0;
                break e;
              }
              break;
            default:
              Y = nt, nt = 0, Tn = null, Rr(e, E, D, Y);
          }
        }
        dw(), y = wt;
        break;
      } catch (ee) {
        Ag(e, ee);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Sa = Di = null, et = l, O.H = u, O.A = d, Fe === null && (ft = null, Ge = 0, Hs()), y;
  }
  function dw() {
    for (; Fe !== null; ) Og(Fe);
  }
  function fw(e, t) {
    var i = et;
    et |= 2;
    var l = Dg(), u = zg();
    ft !== e || Ge !== t ? (bo = null, yo = Bt() + 500, Mr(e, t)) : Tr = ct(
      e,
      t
    );
    e: do
      try {
        if (nt !== 0 && Fe !== null) {
          t = Fe;
          var d = Tn;
          t: switch (nt) {
            case 1:
              nt = 0, Tn = null, Rr(e, t, d, 1);
              break;
            case 2:
            case 9:
              if (Fm(d)) {
                nt = 0, Tn = null, Lg(t);
                break;
              }
              t = function() {
                nt !== 2 && nt !== 9 || ft !== e || (nt = 7), da(e);
              }, d.then(t, t);
              break e;
            case 3:
              nt = 7;
              break e;
            case 4:
              nt = 5;
              break e;
            case 7:
              Fm(d) ? (nt = 0, Tn = null, Lg(t)) : (nt = 0, Tn = null, Rr(e, t, d, 7));
              break;
            case 5:
              var y = null;
              switch (Fe.tag) {
                case 26:
                  y = Fe.memoizedState;
                case 5:
                case 27:
                  var E = Fe;
                  if (y ? xv(y) : E.stateNode.complete) {
                    nt = 0, Tn = null;
                    var D = E.sibling;
                    if (D !== null) Fe = D;
                    else {
                      var Y = E.return;
                      Y !== null ? (Fe = Y, wo(Y)) : Fe = null;
                    }
                    break t;
                  }
              }
              nt = 0, Tn = null, Rr(e, t, d, 5);
              break;
            case 6:
              nt = 0, Tn = null, Rr(e, t, d, 6);
              break;
            case 8:
              pd(), wt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        hw();
        break;
      } catch (ee) {
        Ag(e, ee);
      }
    while (!0);
    return Sa = Di = null, O.H = l, O.A = u, et = i, Fe !== null ? 0 : (ft = null, Ge = 0, Hs(), wt);
  }
  function hw() {
    for (; Fe !== null && !Vt(); )
      Og(Fe);
  }
  function Og(e) {
    var t = ig(e.alternate, e, _a);
    e.memoizedProps = e.pendingProps, t === null ? wo(e) : Fe = t;
  }
  function Lg(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Jp(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ge
        );
        break;
      case 11:
        t = Jp(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ge
        );
        break;
      case 5:
        _c(t);
      default:
        lg(i, t), t = Fe = zm(t, _a), t = ig(i, t, _a);
    }
    e.memoizedProps = e.pendingProps, t === null ? wo(e) : Fe = t;
  }
  function Rr(e, t, i, l) {
    Sa = Di = null, _c(t), yr = null, vl = 0;
    var u = t.return;
    try {
      if (tw(
        e,
        u,
        t,
        i,
        Ge
      )) {
        wt = 1, oo(
          e,
          Un(i, e.current)
        ), Fe = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Fe = u, d;
      wt = 1, oo(
        e,
        Un(i, e.current)
      ), Fe = null;
      return;
    }
    t.flags & 32768 ? (Ke || l === 1 ? e = !0 : Tr || (Ge & 536870912) !== 0 ? e = !1 : (Ja = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = En.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Ug(t, e)) : wo(t);
  }
  function wo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Ug(
          t,
          Ja
        );
        return;
      }
      e = t.return;
      var i = iw(
        t.alternate,
        t,
        _a
      );
      if (i !== null) {
        Fe = i;
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
  function Ug(e, t) {
    do {
      var i = rw(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Fe = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !t && (e = e.sibling, e !== null)) {
        Fe = e;
        return;
      }
      Fe = e = i;
    } while (e !== null);
    wt = 6, Fe = null;
  }
  function kg(e, t, i, l, u, d, y, E, D) {
    e.cancelPendingCommit = null;
    do
      Eo();
    while (Ft !== 0);
    if ((et & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (d = t.lanes | t.childLanes, d |= ic, Zt(
        e,
        i,
        d,
        y,
        E,
        D
      ), e === ft && (Fe = ft = null, Ge = 0), Cr = t, ti = e, Da = i, fd = d, hd = u, Ng = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, vw(tt, function() {
        return $g(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null, u = V.p, V.p = 2, y = et, et |= 4;
        try {
          lw(e, t, i);
        } finally {
          et = y, V.p = u, O.T = l;
        }
      }
      Ft = 1, Vg(), Bg(), Hg();
    }
  }
  function Vg() {
    if (Ft === 1) {
      Ft = 0;
      var e = ti, t = Cr, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = O.T, O.T = null;
        var l = V.p;
        V.p = 2;
        var u = et;
        et |= 4;
        try {
          yg(t, e);
          var d = Md, y = jm(e.containerInfo), E = d.focusedElem, D = d.selectionRange;
          if (y !== E && E && E.ownerDocument && Em(
            E.ownerDocument.documentElement,
            E
          )) {
            if (D !== null && Wu(E)) {
              var Y = D.start, ee = D.end;
              if (ee === void 0 && (ee = Y), "selectionStart" in E)
                E.selectionStart = Y, E.selectionEnd = Math.min(
                  ee,
                  E.value.length
                );
              else {
                var ie = E.ownerDocument || document, X = ie && ie.defaultView || window;
                if (X.getSelection) {
                  var P = X.getSelection(), xe = E.textContent.length, De = Math.min(D.start, xe), ut = D.end === void 0 ? De : Math.min(D.end, xe);
                  !P.extend && De > ut && (y = ut, ut = De, De = y);
                  var H = wm(
                    E,
                    De
                  ), k = wm(
                    E,
                    ut
                  );
                  if (H && k && (P.rangeCount !== 1 || P.anchorNode !== H.node || P.anchorOffset !== H.offset || P.focusNode !== k.node || P.focusOffset !== k.offset)) {
                    var F = ie.createRange();
                    F.setStart(H.node, H.offset), P.removeAllRanges(), De > ut ? (P.addRange(F), P.extend(k.node, k.offset)) : (F.setEnd(k.node, k.offset), P.addRange(F));
                  }
                }
              }
            }
            for (ie = [], P = E; P = P.parentNode; )
              P.nodeType === 1 && ie.push({
                element: P,
                left: P.scrollLeft,
                top: P.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < ie.length; E++) {
              var ne = ie[E];
              ne.element.scrollLeft = ne.left, ne.element.scrollTop = ne.top;
            }
          }
          Lo = !!Cd, Md = Cd = null;
        } finally {
          et = u, V.p = l, O.T = i;
        }
      }
      e.current = t, Ft = 2;
    }
  }
  function Bg() {
    if (Ft === 2) {
      Ft = 0;
      var e = ti, t = Cr, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = O.T, O.T = null;
        var l = V.p;
        V.p = 2;
        var u = et;
        et |= 4;
        try {
          hg(e, t.alternate, t);
        } finally {
          et = u, V.p = l, O.T = i;
        }
      }
      Ft = 3;
    }
  }
  function Hg() {
    if (Ft === 4 || Ft === 3) {
      Ft = 0, Dn();
      var e = ti, t = Cr, i = Da, l = Ng;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Ft = 5 : (Ft = 0, Cr = ti = null, qg(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (ei = null), $(i), t = t.stateNode, Pt && typeof Pt.onCommitFiberRoot == "function")
        try {
          Pt.onCommitFiberRoot(
            Qn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = O.T, u = V.p, V.p = 2, O.T = null;
        try {
          for (var d = e.onRecoverableError, y = 0; y < l.length; y++) {
            var E = l[y];
            d(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          O.T = t, V.p = u;
        }
      }
      (Da & 3) !== 0 && Eo(), da(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === md ? Ol++ : (Ol = 0, md = e) : Ol = 0, Ll(0);
    }
  }
  function qg(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, pl(t)));
  }
  function Eo() {
    return Vg(), Bg(), Hg(), $g();
  }
  function $g() {
    if (Ft !== 5) return !1;
    var e = ti, t = fd;
    fd = 0;
    var i = $(Da), l = O.T, u = V.p;
    try {
      V.p = 32 > i ? 32 : i, O.T = null, i = hd, hd = null;
      var d = ti, y = Da;
      if (Ft = 0, Cr = ti = null, Da = 0, (et & 6) !== 0) throw Error(s(331));
      var E = et;
      if (et |= 4, Eg(d.current), xg(
        d,
        d.current,
        y,
        i
      ), et = E, Ll(0, !1), Pt && typeof Pt.onPostCommitFiberRoot == "function")
        try {
          Pt.onPostCommitFiberRoot(Qn, d);
        } catch {
        }
      return !0;
    } finally {
      V.p = u, O.T = l, qg(e, t);
    }
  }
  function Ig(e, t, i) {
    t = Un(i, t), t = Gc(e.stateNode, t, 2), e = Ka(e, t, 2), e !== null && (rt(e, 2), da(e));
  }
  function at(e, t, i) {
    if (e.tag === 3)
      Ig(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ig(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (ei === null || !ei.has(l))) {
            e = Un(i, e), i = Fp(2), l = Ka(t, i, 2), l !== null && (Yp(
              i,
              l,
              t,
              e
            ), rt(l, 2), da(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function vd(e, t, i) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new uw();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(i) || (ud = !0, u.add(i), e = mw.bind(null, e, t, i), t.then(e, e));
  }
  function mw(e, t, i) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, ft === e && (Ge & i) === i && (wt === 4 || wt === 3 && (Ge & 62914560) === Ge && 300 > Bt() - vo ? (et & 2) === 0 && Mr(e, 0) : cd |= i, Nr === Ge && (Nr = 0)), da(e);
  }
  function Fg(e, t) {
    t === 0 && (t = It()), e = Ri(e, t), e !== null && (rt(e, t), da(e));
  }
  function pw(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), Fg(e, i);
  }
  function gw(e, t) {
    var i = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, u = e.memoizedState;
        u !== null && (i = u.retryLane);
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
    l !== null && l.delete(t), Fg(e, i);
  }
  function vw(e, t) {
    return bn(e, t);
  }
  var jo = null, Ar = null, yd = !1, To = !1, bd = !1, ai = 0;
  function da(e) {
    e !== Ar && e.next === null && (Ar === null ? jo = Ar = e : Ar = Ar.next = e), To = !0, yd || (yd = !0, bw());
  }
  function Ll(e, t) {
    if (!bd && To) {
      bd = !0;
      do
        for (var i = !1, l = jo; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var y = l.suspendedLanes, E = l.pingedLanes;
              d = (1 << 31 - $t(42 | e) + 1) - 1, d &= u & ~(y & ~E), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, Kg(l, d));
          } else
            d = Ge, d = Le(
              l,
              l === ft ? d : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (d & 3) === 0 || ct(l, d) || (i = !0, Kg(l, d));
          l = l.next;
        }
      while (i);
      bd = !1;
    }
  }
  function yw() {
    Yg();
  }
  function Yg() {
    To = yd = !1;
    var e = 0;
    ai !== 0 && Rw() && (e = ai);
    for (var t = Bt(), i = null, l = jo; l !== null; ) {
      var u = l.next, d = Gg(l, t);
      d === 0 ? (l.next = null, i === null ? jo = u : i.next = u, u === null && (Ar = i)) : (i = l, (e !== 0 || (d & 3) !== 0) && (To = !0)), l = u;
    }
    Ft !== 0 && Ft !== 5 || Ll(e), ai !== 0 && (ai = 0);
  }
  function Gg(e, t) {
    for (var i = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var y = 31 - $t(d), E = 1 << y, D = u[y];
      D === -1 ? ((E & i) === 0 || (E & l) !== 0) && (u[y] = Mt(E, t)) : D <= t && (e.expiredLanes |= E), d &= ~E;
    }
    if (t = ft, i = Ge, i = Le(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, i === 0 || e === t && (nt === 2 || nt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && ma(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || ct(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (l !== null && ma(l), $(i)) {
        case 2:
        case 8:
          i = Qe;
          break;
        case 32:
          i = tt;
          break;
        case 268435456:
          i = qt;
          break;
        default:
          i = tt;
      }
      return l = Xg.bind(null, e), i = bn(i, l), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return l !== null && l !== null && ma(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Xg(e, t) {
    if (Ft !== 0 && Ft !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (Eo() && e.callbackNode !== i)
      return null;
    var l = Ge;
    return l = Le(
      e,
      e === ft ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Mg(e, l, t), Gg(e, Bt()), e.callbackNode != null && e.callbackNode === i ? Xg.bind(null, e) : null);
  }
  function Kg(e, t) {
    if (Eo()) return null;
    Mg(e, t, !0);
  }
  function bw() {
    _w(function() {
      (et & 6) !== 0 ? bn(
        Oe,
        yw
      ) : Yg();
    });
  }
  function xd() {
    if (ai === 0) {
      var e = pr;
      e === 0 && (e = pa, pa <<= 1, (pa & 261888) === 0 && (pa = 256)), ai = e;
    }
    return ai;
  }
  function Qg(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ds("" + e);
  }
  function Pg(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function xw(e, t, i, l, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var d = Qg(
        (u[pe] || null).action
      ), y = l.submitter;
      y && (t = (t = y[pe] || null) ? Qg(t.formAction) : y.getAttribute("formAction"), t !== null && (d = t, y = null));
      var E = new Us(
        "action",
        "action",
        null,
        l,
        u
      );
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (ai !== 0) {
                  var D = y ? Pg(u, y) : new FormData(u);
                  Hc(
                    i,
                    {
                      pending: !0,
                      data: D,
                      method: u.method,
                      action: d
                    },
                    null,
                    D
                  );
                }
              } else
                typeof d == "function" && (E.preventDefault(), D = y ? Pg(u, y) : new FormData(u), Hc(
                  i,
                  {
                    pending: !0,
                    data: D,
                    method: u.method,
                    action: d
                  },
                  d,
                  D
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Sd = 0; Sd < ac.length; Sd++) {
    var wd = ac[Sd], Sw = wd.toLowerCase(), ww = wd[0].toUpperCase() + wd.slice(1);
    Jn(
      Sw,
      "on" + ww
    );
  }
  Jn(Cm, "onAnimationEnd"), Jn(Mm, "onAnimationIteration"), Jn(Rm, "onAnimationStart"), Jn("dblclick", "onDoubleClick"), Jn("focusin", "onFocus"), Jn("focusout", "onBlur"), Jn(VS, "onTransitionRun"), Jn(BS, "onTransitionStart"), Jn(HS, "onTransitionCancel"), Jn(Am, "onTransitionEnd"), la("onMouseEnter", ["mouseout", "mouseover"]), la("onMouseLeave", ["mouseout", "mouseover"]), la("onPointerEnter", ["pointerout", "pointerover"]), la("onPointerLeave", ["pointerout", "pointerover"]), Gt(
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
  var Ul = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Ew = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ul)
  );
  function Zg(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var l = e[i], u = l.event;
      l = l.listeners;
      e: {
        var d = void 0;
        if (t)
          for (var y = l.length - 1; 0 <= y; y--) {
            var E = l[y], D = E.instance, Y = E.currentTarget;
            if (E = E.listener, D !== d && u.isPropagationStopped())
              break e;
            d = E, u.currentTarget = Y;
            try {
              d(u);
            } catch (ee) {
              Bs(ee);
            }
            u.currentTarget = null, d = D;
          }
        else
          for (y = 0; y < l.length; y++) {
            if (E = l[y], D = E.instance, Y = E.currentTarget, E = E.listener, D !== d && u.isPropagationStopped())
              break e;
            d = E, u.currentTarget = Y;
            try {
              d(u);
            } catch (ee) {
              Bs(ee);
            }
            u.currentTarget = null, d = D;
          }
      }
    }
  }
  function Ye(e, t) {
    var i = t[be];
    i === void 0 && (i = t[be] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    i.has(l) || (Jg(t, e, 2, !1), i.add(l));
  }
  function Ed(e, t, i) {
    var l = 0;
    t && (l |= 4), Jg(
      i,
      e,
      l,
      t
    );
  }
  var No = "_reactListening" + Math.random().toString(36).slice(2);
  function jd(e) {
    if (!e[No]) {
      e[No] = !0, Ha.forEach(function(i) {
        i !== "selectionchange" && (Ew.has(i) || Ed(i, !1, e), Ed(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[No] || (t[No] = !0, Ed("selectionchange", !1, t));
    }
  }
  function Jg(e, t, i, l) {
    switch (Cv(t)) {
      case 2:
        var u = Zw;
        break;
      case 8:
        u = Jw;
        break;
      default:
        u = Bd;
    }
    i = u.bind(
      null,
      t,
      i,
      e
    ), u = void 0, !Fu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, i, !0) : u !== void 0 ? e.addEventListener(t, i, {
      passive: u
    }) : e.addEventListener(t, i, !1);
  }
  function Td(e, t, i, l, u) {
    var d = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var y = l.tag;
        if (y === 3 || y === 4) {
          var E = l.stateNode.containerInfo;
          if (E === u) break;
          if (y === 4)
            for (y = l.return; y !== null; ) {
              var D = y.tag;
              if ((D === 3 || D === 4) && y.stateNode.containerInfo === u)
                return;
              y = y.return;
            }
          for (; E !== null; ) {
            if (y = lt(E), y === null) return;
            if (D = y.tag, D === 5 || D === 6 || D === 26 || D === 27) {
              l = d = y;
              continue e;
            }
            E = E.parentNode;
          }
        }
        l = l.return;
      }
    am(function() {
      var Y = d, ee = $u(i), ie = [];
      e: {
        var X = _m.get(e);
        if (X !== void 0) {
          var P = Us, xe = e;
          switch (e) {
            case "keypress":
              if (Os(i) === 0) break e;
            case "keydown":
            case "keyup":
              P = gS;
              break;
            case "focusin":
              xe = "focus", P = Ku;
              break;
            case "focusout":
              xe = "blur", P = Ku;
              break;
            case "beforeblur":
            case "afterblur":
              P = Ku;
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
              P = lm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              P = iS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              P = bS;
              break;
            case Cm:
            case Mm:
            case Rm:
              P = sS;
              break;
            case Am:
              P = SS;
              break;
            case "scroll":
            case "scrollend":
              P = nS;
              break;
            case "wheel":
              P = ES;
              break;
            case "copy":
            case "cut":
            case "paste":
              P = uS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              P = om;
              break;
            case "toggle":
            case "beforetoggle":
              P = TS;
          }
          var De = (t & 4) !== 0, ut = !De && (e === "scroll" || e === "scrollend"), H = De ? X !== null ? X + "Capture" : null : X;
          De = [];
          for (var k = Y, F; k !== null; ) {
            var ne = k;
            if (F = ne.stateNode, ne = ne.tag, ne !== 5 && ne !== 26 && ne !== 27 || F === null || H === null || (ne = il(k, H), ne != null && De.push(
              kl(k, ne, F)
            )), ut) break;
            k = k.return;
          }
          0 < De.length && (X = new P(
            X,
            xe,
            null,
            i,
            ee
          ), ie.push({ event: X, listeners: De }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (X = e === "mouseover" || e === "pointerover", P = e === "mouseout" || e === "pointerout", X && i !== qu && (xe = i.relatedTarget || i.fromElement) && (lt(xe) || xe[Ee]))
            break e;
          if ((P || X) && (X = ee.window === ee ? ee : (X = ee.ownerDocument) ? X.defaultView || X.parentWindow : window, P ? (xe = i.relatedTarget || i.toElement, P = Y, xe = xe ? lt(xe) : null, xe !== null && (ut = c(xe), De = xe.tag, xe !== ut || De !== 5 && De !== 27 && De !== 6) && (xe = null)) : (P = null, xe = Y), P !== xe)) {
            if (De = lm, ne = "onMouseLeave", H = "onMouseEnter", k = "mouse", (e === "pointerout" || e === "pointerover") && (De = om, ne = "onPointerLeave", H = "onPointerEnter", k = "pointer"), ut = P == null ? X : Ie(P), F = xe == null ? X : Ie(xe), X = new De(
              ne,
              k + "leave",
              P,
              i,
              ee
            ), X.target = ut, X.relatedTarget = F, ne = null, lt(ee) === Y && (De = new De(
              H,
              k + "enter",
              xe,
              i,
              ee
            ), De.target = F, De.relatedTarget = ut, ne = De), ut = ne, P && xe)
              t: {
                for (De = jw, H = P, k = xe, F = 0, ne = H; ne; ne = De(ne))
                  F++;
                ne = 0;
                for (var Re = k; Re; Re = De(Re))
                  ne++;
                for (; 0 < F - ne; )
                  H = De(H), F--;
                for (; 0 < ne - F; )
                  k = De(k), ne--;
                for (; F--; ) {
                  if (H === k || k !== null && H === k.alternate) {
                    De = H;
                    break t;
                  }
                  H = De(H), k = De(k);
                }
                De = null;
              }
            else De = null;
            P !== null && Wg(
              ie,
              X,
              P,
              De,
              !1
            ), xe !== null && ut !== null && Wg(
              ie,
              ut,
              xe,
              De,
              !0
            );
          }
        }
        e: {
          if (X = Y ? Ie(Y) : window, P = X.nodeName && X.nodeName.toLowerCase(), P === "select" || P === "input" && X.type === "file")
            var Ze = gm;
          else if (mm(X))
            if (vm)
              Ze = LS;
            else {
              Ze = zS;
              var je = DS;
            }
          else
            P = X.nodeName, !P || P.toLowerCase() !== "input" || X.type !== "checkbox" && X.type !== "radio" ? Y && Hu(Y.elementType) && (Ze = gm) : Ze = OS;
          if (Ze && (Ze = Ze(e, Y))) {
            pm(
              ie,
              Ze,
              i,
              ee
            );
            break e;
          }
          je && je(e, X, Y), e === "focusout" && Y && X.type === "number" && Y.memoizedProps.value != null && Bu(X, "number", X.value);
        }
        switch (je = Y ? Ie(Y) : window, e) {
          case "focusin":
            (mm(je) || je.contentEditable === "true") && (sr = je, ec = Y, fl = null);
            break;
          case "focusout":
            fl = ec = sr = null;
            break;
          case "mousedown":
            tc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            tc = !1, Tm(ie, i, ee);
            break;
          case "selectionchange":
            if (kS) break;
          case "keydown":
          case "keyup":
            Tm(ie, i, ee);
        }
        var Ve;
        if (Pu)
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
          lr ? fm(e, i) && (Xe = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (Xe = "onCompositionStart");
        Xe && (um && i.locale !== "ko" && (lr || Xe !== "onCompositionStart" ? Xe === "onCompositionEnd" && lr && (Ve = im()) : (qa = ee, Yu = "value" in qa ? qa.value : qa.textContent, lr = !0)), je = Co(Y, Xe), 0 < je.length && (Xe = new sm(
          Xe,
          e,
          null,
          i,
          ee
        ), ie.push({ event: Xe, listeners: je }), Ve ? Xe.data = Ve : (Ve = hm(i), Ve !== null && (Xe.data = Ve)))), (Ve = CS ? MS(e, i) : RS(e, i)) && (Xe = Co(Y, "onBeforeInput"), 0 < Xe.length && (je = new sm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ee
        ), ie.push({
          event: je,
          listeners: Xe
        }), je.data = Ve)), xw(
          ie,
          e,
          Y,
          i,
          ee
        );
      }
      Zg(ie, t);
    });
  }
  function kl(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function Co(e, t) {
    for (var i = t + "Capture", l = []; e !== null; ) {
      var u = e, d = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || d === null || (u = il(e, i), u != null && l.unshift(
        kl(e, u, d)
      ), u = il(e, t), u != null && l.push(
        kl(e, u, d)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function jw(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Wg(e, t, i, l, u) {
    for (var d = t._reactName, y = []; i !== null && i !== l; ) {
      var E = i, D = E.alternate, Y = E.stateNode;
      if (E = E.tag, D !== null && D === l) break;
      E !== 5 && E !== 26 && E !== 27 || Y === null || (D = Y, u ? (Y = il(i, d), Y != null && y.unshift(
        kl(i, Y, D)
      )) : u || (Y = il(i, d), Y != null && y.push(
        kl(i, Y, D)
      ))), i = i.return;
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var Tw = /\r\n?/g, Nw = /\u0000|\uFFFD/g;
  function ev(e) {
    return (typeof e == "string" ? e : "" + e).replace(Tw, `
`).replace(Nw, "");
  }
  function tv(e, t) {
    return t = ev(t), ev(e) === t;
  }
  function ot(e, t, i, l, u, d) {
    switch (i) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || ar(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && ar(e, "" + l);
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
        jt(e, i, l);
        break;
      case "style":
        tm(e, l, d);
        break;
      case "data":
        if (t !== "object") {
          jt(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || i !== "href")) {
          e.removeAttribute(i);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        l = Ds("" + l), e.setAttribute(i, l);
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
          typeof d == "function" && (i === "formAction" ? (t !== "input" && ot(e, t, "name", u.name, u, null), ot(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), ot(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), ot(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (ot(e, t, "encType", u.encType, u, null), ot(e, t, "method", u.method, u, null), ot(e, t, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        l = Ds("" + l), e.setAttribute(i, l);
        break;
      case "onClick":
        l != null && (e.onclick = va);
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
          if (i = l.__html, i != null) {
            if (u.children != null) throw Error(s(60));
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
        i = Ds("" + l), e.setAttributeNS(
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
        Ye("beforetoggle", e), Ye("toggle", e), qe(e, "popover", l);
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
        qe(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = eS.get(i) || i, qe(e, i, l));
    }
  }
  function Nd(e, t, i, l, u, d) {
    switch (i) {
      case "style":
        tm(e, l, d);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (i = l.__html, i != null) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof l == "string" ? ar(e, l) : (typeof l == "number" || typeof l == "bigint") && ar(e, "" + l);
        break;
      case "onScroll":
        l != null && Ye("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Ye("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = va);
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
        if (!Zn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), t = i.slice(2, u ? i.length - 7 : void 0), d = e[pe] || null, d = d != null ? d[i] : null, typeof d == "function" && e.removeEventListener(t, d, u), typeof l == "function")) {
              typeof d != "function" && d !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, l, u);
              break e;
            }
            i in e ? e[i] = l : l === !0 ? e.setAttribute(i, "") : qe(e, i, l);
          }
    }
  }
  function tn(e, t, i) {
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
        var l = !1, u = !1, d;
        for (d in i)
          if (i.hasOwnProperty(d)) {
            var y = i[d];
            if (y != null)
              switch (d) {
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
                  ot(e, t, d, y, i, null);
              }
          }
        u && ot(e, t, "srcSet", i.srcSet, i, null), l && ot(e, t, "src", i.src, i, null);
        return;
      case "input":
        Ye("invalid", e);
        var E = d = y = u = null, D = null, Y = null;
        for (l in i)
          if (i.hasOwnProperty(l)) {
            var ee = i[l];
            if (ee != null)
              switch (l) {
                case "name":
                  u = ee;
                  break;
                case "type":
                  y = ee;
                  break;
                case "checked":
                  D = ee;
                  break;
                case "defaultChecked":
                  Y = ee;
                  break;
                case "value":
                  d = ee;
                  break;
                case "defaultValue":
                  E = ee;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ee != null)
                    throw Error(s(137, t));
                  break;
                default:
                  ot(e, t, l, ee, i, null);
              }
          }
        Zh(
          e,
          d,
          E,
          D,
          Y,
          y,
          u,
          !1
        );
        return;
      case "select":
        Ye("invalid", e), l = y = d = null;
        for (u in i)
          if (i.hasOwnProperty(u) && (E = i[u], E != null))
            switch (u) {
              case "value":
                d = E;
                break;
              case "defaultValue":
                y = E;
                break;
              case "multiple":
                l = E;
              default:
                ot(e, t, u, E, i, null);
            }
        t = d, i = y, e.multiple = !!l, t != null ? nr(e, !!l, t, !1) : i != null && nr(e, !!l, i, !0);
        return;
      case "textarea":
        Ye("invalid", e), d = u = l = null;
        for (y in i)
          if (i.hasOwnProperty(y) && (E = i[y], E != null))
            switch (y) {
              case "value":
                l = E;
                break;
              case "defaultValue":
                u = E;
                break;
              case "children":
                d = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(s(91));
                break;
              default:
                ot(e, t, y, E, i, null);
            }
        Wh(e, l, u, d);
        return;
      case "option":
        for (D in i)
          if (i.hasOwnProperty(D) && (l = i[D], l != null))
            switch (D) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                ot(e, t, D, l, i, null);
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
        for (l = 0; l < Ul.length; l++)
          Ye(Ul[l], e);
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
        for (Y in i)
          if (i.hasOwnProperty(Y) && (l = i[Y], l != null))
            switch (Y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                ot(e, t, Y, l, i, null);
            }
        return;
      default:
        if (Hu(t)) {
          for (ee in i)
            i.hasOwnProperty(ee) && (l = i[ee], l !== void 0 && Nd(
              e,
              t,
              ee,
              l,
              i,
              void 0
            ));
          return;
        }
    }
    for (E in i)
      i.hasOwnProperty(E) && (l = i[E], l != null && ot(e, t, E, l, i, null));
  }
  function Cw(e, t, i, l) {
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
        var u = null, d = null, y = null, E = null, D = null, Y = null, ee = null;
        for (P in i) {
          var ie = i[P];
          if (i.hasOwnProperty(P) && ie != null)
            switch (P) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                D = ie;
              default:
                l.hasOwnProperty(P) || ot(e, t, P, null, l, ie);
            }
        }
        for (var X in l) {
          var P = l[X];
          if (ie = i[X], l.hasOwnProperty(X) && (P != null || ie != null))
            switch (X) {
              case "type":
                d = P;
                break;
              case "name":
                u = P;
                break;
              case "checked":
                Y = P;
                break;
              case "defaultChecked":
                ee = P;
                break;
              case "value":
                y = P;
                break;
              case "defaultValue":
                E = P;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null)
                  throw Error(s(137, t));
                break;
              default:
                P !== ie && ot(
                  e,
                  t,
                  X,
                  P,
                  l,
                  ie
                );
            }
        }
        Vu(
          e,
          y,
          E,
          D,
          Y,
          ee,
          d,
          u
        );
        return;
      case "select":
        P = y = E = X = null;
        for (d in i)
          if (D = i[d], i.hasOwnProperty(d) && D != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                P = D;
              default:
                l.hasOwnProperty(d) || ot(
                  e,
                  t,
                  d,
                  null,
                  l,
                  D
                );
            }
        for (u in l)
          if (d = l[u], D = i[u], l.hasOwnProperty(u) && (d != null || D != null))
            switch (u) {
              case "value":
                X = d;
                break;
              case "defaultValue":
                E = d;
                break;
              case "multiple":
                y = d;
              default:
                d !== D && ot(
                  e,
                  t,
                  u,
                  d,
                  l,
                  D
                );
            }
        t = E, i = y, l = P, X != null ? nr(e, !!i, X, !1) : !!l != !!i && (t != null ? nr(e, !!i, t, !0) : nr(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        P = X = null;
        for (E in i)
          if (u = i[E], i.hasOwnProperty(E) && u != null && !l.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                ot(e, t, E, null, l, u);
            }
        for (y in l)
          if (u = l[y], d = i[y], l.hasOwnProperty(y) && (u != null || d != null))
            switch (y) {
              case "value":
                X = u;
                break;
              case "defaultValue":
                P = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== d && ot(e, t, y, u, l, d);
            }
        Jh(e, X, P);
        return;
      case "option":
        for (var xe in i)
          if (X = i[xe], i.hasOwnProperty(xe) && X != null && !l.hasOwnProperty(xe))
            switch (xe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                ot(
                  e,
                  t,
                  xe,
                  null,
                  l,
                  X
                );
            }
        for (D in l)
          if (X = l[D], P = i[D], l.hasOwnProperty(D) && X !== P && (X != null || P != null))
            switch (D) {
              case "selected":
                e.selected = X && typeof X != "function" && typeof X != "symbol";
                break;
              default:
                ot(
                  e,
                  t,
                  D,
                  X,
                  l,
                  P
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
        for (var De in i)
          X = i[De], i.hasOwnProperty(De) && X != null && !l.hasOwnProperty(De) && ot(e, t, De, null, l, X);
        for (Y in l)
          if (X = l[Y], P = i[Y], l.hasOwnProperty(Y) && X !== P && (X != null || P != null))
            switch (Y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (X != null)
                  throw Error(s(137, t));
                break;
              default:
                ot(
                  e,
                  t,
                  Y,
                  X,
                  l,
                  P
                );
            }
        return;
      default:
        if (Hu(t)) {
          for (var ut in i)
            X = i[ut], i.hasOwnProperty(ut) && X !== void 0 && !l.hasOwnProperty(ut) && Nd(
              e,
              t,
              ut,
              void 0,
              l,
              X
            );
          for (ee in l)
            X = l[ee], P = i[ee], !l.hasOwnProperty(ee) || X === P || X === void 0 && P === void 0 || Nd(
              e,
              t,
              ee,
              X,
              l,
              P
            );
          return;
        }
    }
    for (var H in i)
      X = i[H], i.hasOwnProperty(H) && X != null && !l.hasOwnProperty(H) && ot(e, t, H, null, l, X);
    for (ie in l)
      X = l[ie], P = i[ie], !l.hasOwnProperty(ie) || X === P || X == null && P == null || ot(e, t, ie, X, l, P);
  }
  function nv(e) {
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
  function Mw() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), l = 0; l < i.length; l++) {
        var u = i[l], d = u.transferSize, y = u.initiatorType, E = u.duration;
        if (d && E && nv(y)) {
          for (y = 0, E = u.responseEnd, l += 1; l < i.length; l++) {
            var D = i[l], Y = D.startTime;
            if (Y > E) break;
            var ee = D.transferSize, ie = D.initiatorType;
            ee && nv(ie) && (D = D.responseEnd, y += ee * (D < E ? 1 : (E - Y) / (D - Y)));
          }
          if (--l, t += 8 * (d + y) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Cd = null, Md = null;
  function Mo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function av(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function iv(e, t) {
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
  function Rd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Ad = null;
  function Rw() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ad ? !1 : (Ad = e, !0) : (Ad = null, !1);
  }
  var rv = typeof setTimeout == "function" ? setTimeout : void 0, Aw = typeof clearTimeout == "function" ? clearTimeout : void 0, lv = typeof Promise == "function" ? Promise : void 0, _w = typeof queueMicrotask == "function" ? queueMicrotask : typeof lv < "u" ? function(e) {
    return lv.resolve(null).then(e).catch(Dw);
  } : rv;
  function Dw(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ii(e) {
    return e === "head";
  }
  function sv(e, t) {
    var i = t, l = 0;
    do {
      var u = i.nextSibling;
      if (e.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (l === 0) {
            e.removeChild(u), Or(t);
            return;
          }
          l--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          l++;
        else if (i === "html")
          Vl(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, Vl(i);
          for (var d = i.firstChild; d; ) {
            var y = d.nextSibling, E = d.nodeName;
            d[He] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = y;
          }
        } else
          i === "body" && Vl(e.ownerDocument.body);
      i = u;
    } while (i);
    Or(t);
  }
  function ov(e, t) {
    var i = e;
    e = 0;
    do {
      var l = i.nextSibling;
      if (i.nodeType === 1 ? t ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (t ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), l && l.nodeType === 8)
        if (i = l.data, i === "/$") {
          if (e === 0) break;
          e--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || e++;
      i = l;
    } while (i);
  }
  function _d(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          _d(i), dt(i);
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
  function zw(e, t, i, l) {
    for (; e.nodeType === 1; ) {
      var u = i;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[He])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (d = e.getAttribute("rel"), d === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (d !== u.rel || e.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || e.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (d = e.getAttribute("src"), (d !== (u.src == null ? null : u.src) || e.getAttribute("type") !== (u.type == null ? null : u.type) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && d && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var d = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === d)
          return e;
      } else return e;
      if (e = qn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Ow(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = qn(e.nextSibling), e === null)) return null;
    return e;
  }
  function uv(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = qn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Dd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function zd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Lw(e, t) {
    var i = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || i.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), i.removeEventListener("DOMContentLoaded", l);
      };
      i.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
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
  var Od = null;
  function cv(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (t === 0)
            return qn(e.nextSibling);
          t--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function dv(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&") {
          if (t === 0) return e;
          t--;
        } else i !== "/$" && i !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function fv(e, t, i) {
    switch (t = Mo(i), e) {
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
  function Vl(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    dt(e);
  }
  var $n = /* @__PURE__ */ new Map(), hv = /* @__PURE__ */ new Set();
  function Ro(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var za = V.d;
  V.d = {
    f: Uw,
    r: kw,
    D: Vw,
    C: Bw,
    L: Hw,
    m: qw,
    X: Iw,
    S: $w,
    M: Fw
  };
  function Uw() {
    var e = za.f(), t = xo();
    return e || t;
  }
  function kw(e) {
    var t = yt(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ap(t) : za.r(e);
  }
  var _r = typeof document > "u" ? null : document;
  function mv(e, t, i) {
    var l = _r;
    if (l && typeof t == "string" && t) {
      var u = On(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), hv.has(u) || (hv.add(u), e = { rel: e, crossOrigin: i, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), tn(t, "link", e), ht(t), l.head.appendChild(t)));
    }
  }
  function Vw(e) {
    za.D(e), mv("dns-prefetch", e, null);
  }
  function Bw(e, t) {
    za.C(e, t), mv("preconnect", e, t);
  }
  function Hw(e, t, i) {
    za.L(e, t, i);
    var l = _r;
    if (l && e && t) {
      var u = 'link[rel="preload"][as="' + On(t) + '"]';
      t === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + On(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + On(
        i.imageSizes
      ) + '"]')) : u += '[href="' + On(e) + '"]';
      var d = u;
      switch (t) {
        case "style":
          d = Dr(e);
          break;
        case "script":
          d = zr(e);
      }
      $n.has(d) || (e = g(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), $n.set(d, e), l.querySelector(u) !== null || t === "style" && l.querySelector(Bl(d)) || t === "script" && l.querySelector(Hl(d)) || (t = l.createElement("link"), tn(t, "link", e), ht(t), l.head.appendChild(t)));
    }
  }
  function qw(e, t) {
    za.m(e, t);
    var i = _r;
    if (i && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + On(l) + '"][href="' + On(e) + '"]', d = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = zr(e);
      }
      if (!$n.has(d) && (e = g({ rel: "modulepreload", href: e }, t), $n.set(d, e), i.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Hl(d)))
              return;
        }
        l = i.createElement("link"), tn(l, "link", e), ht(l), i.head.appendChild(l);
      }
    }
  }
  function $w(e, t, i) {
    za.S(e, t, i);
    var l = _r;
    if (l && e) {
      var u = Rt(l).hoistableStyles, d = Dr(e);
      t = t || "default";
      var y = u.get(d);
      if (!y) {
        var E = { loading: 0, preload: null };
        if (y = l.querySelector(
          Bl(d)
        ))
          E.loading = 5;
        else {
          e = g(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = $n.get(d)) && Ld(e, i);
          var D = y = l.createElement("link");
          ht(D), tn(D, "link", e), D._p = new Promise(function(Y, ee) {
            D.onload = Y, D.onerror = ee;
          }), D.addEventListener("load", function() {
            E.loading |= 1;
          }), D.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, Ao(y, t, l);
        }
        y = {
          type: "stylesheet",
          instance: y,
          count: 1,
          state: E
        }, u.set(d, y);
      }
    }
  }
  function Iw(e, t) {
    za.X(e, t);
    var i = _r;
    if (i && e) {
      var l = Rt(i).hoistableScripts, u = zr(e), d = l.get(u);
      d || (d = i.querySelector(Hl(u)), d || (e = g({ src: e, async: !0 }, t), (t = $n.get(u)) && Ud(e, t), d = i.createElement("script"), ht(d), tn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(u, d));
    }
  }
  function Fw(e, t) {
    za.M(e, t);
    var i = _r;
    if (i && e) {
      var l = Rt(i).hoistableScripts, u = zr(e), d = l.get(u);
      d || (d = i.querySelector(Hl(u)), d || (e = g({ src: e, async: !0, type: "module" }, t), (t = $n.get(u)) && Ud(e, t), d = i.createElement("script"), ht(d), tn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(u, d));
    }
  }
  function pv(e, t, i, l) {
    var u = (u = ve.current) ? Ro(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = Dr(i.href), i = Rt(
          u
        ).hoistableStyles, l = i.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = Dr(i.href);
          var d = Rt(
            u
          ).hoistableStyles, y = d.get(e);
          if (y || (u = u.ownerDocument || u, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(e, y), (d = u.querySelector(
            Bl(e)
          )) && !d._p && (y.instance = d, y.state.loading = 5), $n.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, $n.set(e, i), d || Yw(
            u,
            e,
            i,
            y.state
          ))), t && l === null)
            throw Error(s(528, ""));
          return y;
        }
        if (t && l !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = zr(i), i = Rt(
          u
        ).hoistableScripts, l = i.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function Dr(e) {
    return 'href="' + On(e) + '"';
  }
  function Bl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function gv(e) {
    return g({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Yw(e, t, i, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), tn(t, "link", i), ht(t), e.head.appendChild(t));
  }
  function zr(e) {
    return '[src="' + On(e) + '"]';
  }
  function Hl(e) {
    return "script[async]" + e;
  }
  function vv(e, t, i) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + On(i.href) + '"]'
          );
          if (l)
            return t.instance = l, ht(l), l;
          var u = g({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), ht(l), tn(l, "style", u), Ao(l, i.precedence, e), t.instance = l;
        case "stylesheet":
          u = Dr(i.href);
          var d = e.querySelector(
            Bl(u)
          );
          if (d)
            return t.state.loading |= 4, t.instance = d, ht(d), d;
          l = gv(i), (u = $n.get(u)) && Ld(l, u), d = (e.ownerDocument || e).createElement("link"), ht(d);
          var y = d;
          return y._p = new Promise(function(E, D) {
            y.onload = E, y.onerror = D;
          }), tn(d, "link", l), t.state.loading |= 4, Ao(d, i.precedence, e), t.instance = d;
        case "script":
          return d = zr(i.src), (u = e.querySelector(
            Hl(d)
          )) ? (t.instance = u, ht(u), u) : (l = i, (u = $n.get(d)) && (l = g({}, i), Ud(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), ht(u), tn(u, "link", l), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Ao(l, i.precedence, e));
    return t.instance;
  }
  function Ao(e, t, i) {
    for (var l = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, d = u, y = 0; y < l.length; y++) {
      var E = l[y];
      if (E.dataset.precedence === t) d = E;
      else if (d !== u) break;
    }
    d ? d.parentNode.insertBefore(e, d.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function Ld(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Ud(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var _o = null;
  function yv(e, t, i) {
    if (_o === null) {
      var l = /* @__PURE__ */ new Map(), u = _o = /* @__PURE__ */ new Map();
      u.set(i, l);
    } else
      u = _o, l = u.get(i), l || (l = /* @__PURE__ */ new Map(), u.set(i, l));
    if (l.has(e)) return l;
    for (l.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var d = i[u];
      if (!(d[He] || d[he] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = d.getAttribute(t) || "";
        y = e + y;
        var E = l.get(y);
        E ? E.push(d) : l.set(y, [d]);
      }
    }
    return l;
  }
  function bv(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Gw(e, t, i) {
    if (i === 1 || t.itemProp != null) return !1;
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
  function xv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Xw(e, t, i, l) {
    if (i.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Dr(l.href), d = t.querySelector(
          Bl(u)
        );
        if (d) {
          t = d._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Do.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = d, ht(d);
          return;
        }
        d = t.ownerDocument || t, l = gv(l), (u = $n.get(u)) && Ld(l, u), d = d.createElement("link"), ht(d);
        var y = d;
        y._p = new Promise(function(E, D) {
          y.onload = E, y.onerror = D;
        }), tn(d, "link", l), i.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Do.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var kd = 0;
  function Kw(e, t) {
    return e.stylesheets && e.count === 0 && Oo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var l = setTimeout(function() {
        if (e.stylesheets && Oo(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + t);
      0 < e.imgBytes && kd === 0 && (kd = 62500 * Mw());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Oo(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > kd ? 50 : 800) + t
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(u);
      };
    } : null;
  }
  function Do() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Oo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var zo = null;
  function Oo(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, zo = /* @__PURE__ */ new Map(), t.forEach(Qw, e), zo = null, Do.call(e));
  }
  function Qw(e, t) {
    if (!(t.state.loading & 4)) {
      var i = zo.get(e);
      if (i) var l = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), zo.set(e, i);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var y = u[d];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (i.set(y.dataset.precedence, y), l = y);
        }
        l && i.set(null, l);
      }
      u = t.instance, y = u.getAttribute("data-precedence"), d = i.get(y) || l, d === l && i.set(null, u), i.set(y, u), this.count++, l = Do.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), d ? d.parentNode.insertBefore(u, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var ql = {
    $$typeof: z,
    Provider: null,
    Consumer: null,
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0
  };
  function Pw(e, t, i, l, u, d, y, E, D) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = xn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = xn(0), this.hiddenUpdates = xn(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = D, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Sv(e, t, i, l, u, d, y, E, D, Y, ee, ie) {
    return e = new Pw(
      e,
      t,
      i,
      y,
      D,
      Y,
      ee,
      ie,
      E
    ), t = 1, d === !0 && (t |= 24), d = wn(3, null, null, t), e.current = d, d.stateNode = e, t = gc(), t.refCount++, e.pooledCache = t, t.refCount++, d.memoizedState = {
      element: l,
      isDehydrated: i,
      cache: t
    }, xc(d), e;
  }
  function wv(e) {
    return e ? (e = cr, e) : cr;
  }
  function Ev(e, t, i, l, u, d) {
    u = wv(u), l.context === null ? l.context = u : l.pendingContext = u, l = Xa(t), l.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (l.callback = d), i = Ka(e, l, t), i !== null && (gn(i, e, t), bl(i, e, t));
  }
  function jv(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Vd(e, t) {
    jv(e, t), (e = e.alternate) && jv(e, t);
  }
  function Tv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ri(e, 67108864);
      t !== null && gn(t, e, 67108864), Vd(e, 67108864);
    }
  }
  function Nv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Cn();
      t = B(t);
      var i = Ri(e, t);
      i !== null && gn(i, e, t), Vd(e, t);
    }
  }
  var Lo = !0;
  function Zw(e, t, i, l) {
    var u = O.T;
    O.T = null;
    var d = V.p;
    try {
      V.p = 2, Bd(e, t, i, l);
    } finally {
      V.p = d, O.T = u;
    }
  }
  function Jw(e, t, i, l) {
    var u = O.T;
    O.T = null;
    var d = V.p;
    try {
      V.p = 8, Bd(e, t, i, l);
    } finally {
      V.p = d, O.T = u;
    }
  }
  function Bd(e, t, i, l) {
    if (Lo) {
      var u = Hd(l);
      if (u === null)
        Td(
          e,
          t,
          l,
          Uo,
          i
        ), Mv(e, l);
      else if (eE(
        u,
        e,
        t,
        i,
        l
      ))
        l.stopPropagation();
      else if (Mv(e, l), t & 4 && -1 < Ww.indexOf(e)) {
        for (; u !== null; ) {
          var d = yt(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var y = cn(d.pendingLanes);
                  if (y !== 0) {
                    var E = d;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; y; ) {
                      var D = 1 << 31 - $t(y);
                      E.entanglements[1] |= D, y &= ~D;
                    }
                    da(d), (et & 6) === 0 && (yo = Bt() + 500, Ll(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Ri(d, 2), E !== null && gn(E, d, 2), xo(), Vd(d, 2);
            }
          if (d = Hd(l), d === null && Td(
            e,
            t,
            l,
            Uo,
            i
          ), d === u) break;
          u = d;
        }
        u !== null && l.stopPropagation();
      } else
        Td(
          e,
          t,
          l,
          null,
          i
        );
    }
  }
  function Hd(e) {
    return e = $u(e), qd(e);
  }
  var Uo = null;
  function qd(e) {
    if (Uo = null, e = lt(e), e !== null) {
      var t = c(e);
      if (t === null) e = null;
      else {
        var i = t.tag;
        if (i === 13) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (i === 31) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (i === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Uo = e, null;
  }
  function Cv(e) {
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
          case Qe:
            return 8;
          case tt:
          case Ht:
            return 32;
          case qt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var $d = !1, ri = null, li = null, si = null, $l = /* @__PURE__ */ new Map(), Il = /* @__PURE__ */ new Map(), oi = [], Ww = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Mv(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ri = null;
        break;
      case "dragenter":
      case "dragleave":
        li = null;
        break;
      case "mouseover":
      case "mouseout":
        si = null;
        break;
      case "pointerover":
      case "pointerout":
        $l.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Il.delete(t.pointerId);
    }
  }
  function Fl(e, t, i, l, u, d) {
    return e === null || e.nativeEvent !== d ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: l,
      nativeEvent: d,
      targetContainers: [u]
    }, t !== null && (t = yt(t), t !== null && Tv(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function eE(e, t, i, l, u) {
    switch (t) {
      case "focusin":
        return ri = Fl(
          ri,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "dragenter":
        return li = Fl(
          li,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "mouseover":
        return si = Fl(
          si,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "pointerover":
        var d = u.pointerId;
        return $l.set(
          d,
          Fl(
            $l.get(d) || null,
            e,
            t,
            i,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return d = u.pointerId, Il.set(
          d,
          Fl(
            Il.get(d) || null,
            e,
            t,
            i,
            l,
            u
          )
        ), !0;
    }
    return !1;
  }
  function Rv(e) {
    var t = lt(e.target);
    if (t !== null) {
      var i = c(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = h(i), t !== null) {
            e.blockedOn = t, ue(e.priority, function() {
              Nv(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(i), t !== null) {
            e.blockedOn = t, ue(e.priority, function() {
              Nv(i);
            });
            return;
          }
        } else if (t === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function ko(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var i = Hd(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var l = new i.constructor(
          i.type,
          i
        );
        qu = l, i.target.dispatchEvent(l), qu = null;
      } else
        return t = yt(i), t !== null && Tv(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function Av(e, t, i) {
    ko(e) && i.delete(t);
  }
  function tE() {
    $d = !1, ri !== null && ko(ri) && (ri = null), li !== null && ko(li) && (li = null), si !== null && ko(si) && (si = null), $l.forEach(Av), Il.forEach(Av);
  }
  function Vo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, $d || ($d = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      tE
    )));
  }
  var Bo = null;
  function _v(e) {
    Bo !== e && (Bo = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Bo === e && (Bo = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (qd(l || i) === null)
              continue;
            break;
          }
          var d = yt(i);
          d !== null && (e.splice(t, 3), t -= 3, Hc(
            d,
            {
              pending: !0,
              data: u,
              method: i.method,
              action: l
            },
            l,
            u
          ));
        }
      }
    ));
  }
  function Or(e) {
    function t(D) {
      return Vo(D, e);
    }
    ri !== null && Vo(ri, e), li !== null && Vo(li, e), si !== null && Vo(si, e), $l.forEach(t), Il.forEach(t);
    for (var i = 0; i < oi.length; i++) {
      var l = oi[i];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < oi.length && (i = oi[0], i.blockedOn === null); )
      Rv(i), i.blockedOn === null && oi.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (l = 0; l < i.length; l += 3) {
        var u = i[l], d = i[l + 1], y = u[pe] || null;
        if (typeof d == "function")
          y || _v(i);
        else if (y) {
          var E = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, y = d[pe] || null)
              E = y.formAction;
            else if (qd(u) !== null) continue;
          } else E = y.action;
          typeof E == "function" ? i[l + 1] = E : (i.splice(l, 3), l -= 3), _v(i);
        }
      }
  }
  function Dv() {
    function e(d) {
      d.canIntercept && d.info === "react-transition" && d.intercept({
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
      u !== null && (u(), u = null), l || setTimeout(i, 20);
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
      var l = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(i, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function Id(e) {
    this._internalRoot = e;
  }
  Ho.prototype.render = Id.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var i = t.current, l = Cn();
    Ev(i, l, e, t, null, null);
  }, Ho.prototype.unmount = Id.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Ev(e.current, 2, null, e, null, null), xo(), t[Ee] = null;
    }
  };
  function Ho(e) {
    this._internalRoot = e;
  }
  Ho.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = se();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < oi.length && t !== 0 && t < oi[i].priority; i++) ;
      oi.splice(i, 0, e), i === 0 && Rv(e);
    }
  };
  var zv = a.version;
  if (zv !== "19.2.5")
    throw Error(
      s(
        527,
        zv,
        "19.2.5"
      )
    );
  V.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = p(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var nE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qo.isDisabled && qo.supportsFiber)
      try {
        Qn = qo.inject(
          nE
        ), Pt = qo;
      } catch {
      }
  }
  return Gl.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var i = !1, l = "", u = Hp, d = qp, y = $p;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (d = t.onCaughtError), t.onRecoverableError !== void 0 && (y = t.onRecoverableError)), t = Sv(
      e,
      1,
      !1,
      null,
      null,
      i,
      l,
      null,
      u,
      d,
      y,
      Dv
    ), e[Ee] = t.current, jd(e), new Id(t);
  }, Gl.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(s(299));
    var l = !1, u = "", d = Hp, y = qp, E = $p, D = null;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (y = i.onCaughtError), i.onRecoverableError !== void 0 && (E = i.onRecoverableError), i.formState !== void 0 && (D = i.formState)), t = Sv(
      e,
      1,
      !0,
      t,
      i ?? null,
      l,
      u,
      D,
      d,
      y,
      E,
      Dv
    ), t.context = wv(null), i = t.current, l = Cn(), l = B(l), u = Xa(l), u.callback = null, Ka(i, u, l), i = l, t.current.lanes = i, rt(t, i), da(t), e[Ee] = t.current, jd(e), new Ho(t);
  }, Gl.version = "19.2.5", Gl;
}
var Iv;
function hE() {
  if (Iv) return Gd.exports;
  Iv = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Gd.exports = fE(), Gd.exports;
}
var mE = hE();
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
var wb = (n) => {
  throw TypeError(n);
}, pE = (n, a, r) => a.has(n) || wb("Cannot " + r), Pd = (n, a, r) => (pE(n, a, "read from private field"), r ? r.call(n) : a.get(n)), gE = (n, a, r) => a.has(n) ? wb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, r);
function Fv(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function vE(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: s = !1 } = n, o;
  o = a.map(
    (w, j) => b(
      w,
      typeof w == "string" ? null : w.state,
      j === 0 ? "default" : void 0,
      typeof w == "string" ? void 0 : w.unstable_mask
    )
  );
  let c = v(
    r ?? o.length - 1
  ), h = "POP", m = null;
  function v(w) {
    return Math.min(Math.max(w, 0), o.length - 1);
  }
  function p() {
    return o[c];
  }
  function b(w, j = null, T, M) {
    let N = kf(
      o ? p().pathname : "/",
      w,
      j,
      T,
      M
    );
    return Ct(
      N.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        w
      )}`
    ), N;
  }
  function g(w) {
    return typeof w == "string" ? w : ha(w);
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
    createURL(w) {
      return new URL(g(w), "http://localhost");
    },
    encodeLocation(w) {
      let j = typeof w == "string" ? aa(w) : w;
      return {
        pathname: j.pathname || "",
        search: j.search || "",
        hash: j.hash || ""
      };
    },
    push(w, j) {
      h = "PUSH";
      let T = Fv(w) ? w : b(w, j);
      c += 1, o.splice(c, o.length, T), s && m && m({ action: h, location: T, delta: 1 });
    },
    replace(w, j) {
      h = "REPLACE";
      let T = Fv(w) ? w : b(w, j);
      o[c] = T, s && m && m({ action: h, location: T, delta: 0 });
    },
    go(w) {
      h = "POP";
      let j = v(c + w), T = o[j];
      c = j, m && m({ action: h, location: T, delta: w });
    },
    listen(w) {
      return m = w, () => {
        m = null;
      };
    }
  };
}
function $e(n, a) {
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
function yE() {
  return Math.random().toString(36).substring(2, 10);
}
function kf(n, a, r = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? aa(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || yE(),
    unstable_mask: o
  };
}
function ha({
  pathname: n = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (n += r.charAt(0) === "#" ? r : "#" + r), n;
}
function aa(n) {
  let a = {};
  if (n) {
    let r = n.indexOf("#");
    r >= 0 && (a.hash = n.substring(r), n = n.substring(0, r));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function bE(n, a = !1) {
  let r = "http://localhost";
  typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href), $e(r, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : ha(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = r + s), new URL(s, r);
}
var ns, Yv = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (gE(this, ns, /* @__PURE__ */ new Map()), n)
      for (let [a, r] of n)
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
  get(n) {
    if (Pd(this, ns).has(n))
      return Pd(this, ns).get(n);
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
    Pd(this, ns).set(n, a);
  }
};
ns = /* @__PURE__ */ new WeakMap();
var xE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function SE(n) {
  return xE.has(
    n
  );
}
var wE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function EE(n) {
  return wE.has(
    n
  );
}
function jE(n) {
  return n.index === !0;
}
function ds(n, a, r = [], s = {}, o = !1) {
  return n.map((c, h) => {
    let m = [...r, String(h)], v = typeof c.id == "string" ? c.id : m.join("-");
    if ($e(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), $e(
      o || !s[v],
      `Found a route id collision on id "${v}".  Route id's must be globally unique within Data Router usages`
    ), jE(c)) {
      let p = {
        ...c,
        id: v
      };
      return s[v] = Gv(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...c,
        id: v,
        children: void 0
      };
      return s[v] = Gv(
        p,
        a(p)
      ), c.children && (p.children = ds(
        c.children,
        a,
        m,
        s,
        o
      )), p;
    }
  });
}
function Gv(n, a) {
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
function hi(n, a, r = "/") {
  return as(n, a, r, !1);
}
function as(n, a, r, s) {
  let o = typeof a == "string" ? aa(a) : a, c = Xn(o.pathname || "/", r);
  if (c == null)
    return null;
  let h = Eb(n);
  NE(h);
  let m = null;
  for (let v = 0; m == null && v < h.length; ++v) {
    let p = kE(c);
    m = LE(
      h[v],
      p,
      s
    );
  }
  return m;
}
function TE(n, a) {
  let { route: r, pathname: s, params: o } = n;
  return {
    id: r.id,
    pathname: s,
    params: o,
    data: a[r.id],
    loaderData: a[r.id],
    handle: r.handle
  };
}
function Eb(n, a = [], r = [], s = "", o = !1) {
  let c = (h, m, v = o, p) => {
    let b = {
      relativePath: p === void 0 ? h.path || "" : p,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: m,
      route: h
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(s) && v)
        return;
      $e(
        b.relativePath.startsWith(s),
        `Absolute route path "${b.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(s.length);
    }
    let g = Fn([s, b.relativePath]), S = r.concat(b);
    h.children && h.children.length > 0 && ($e(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      h.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), Eb(
      h.children,
      a,
      S,
      g,
      v
    )), !(h.path == null && !h.index) && a.push({
      path: g,
      score: zE(g, h.index),
      routesMeta: S
    });
  };
  return n.forEach((h, m) => {
    if (h.path === "" || !h.path?.includes("?"))
      c(h, m);
    else
      for (let v of jb(h.path))
        c(h, m, !0, v);
  }), a;
}
function jb(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [r, ...s] = a, o = r.endsWith("?"), c = r.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let h = jb(s.join("/")), m = [];
  return m.push(
    ...h.map(
      (v) => v === "" ? c : [c, v].join("/")
    )
  ), o && m.push(...h), m.map(
    (v) => n.startsWith("/") && v === "" ? "/" : v
  );
}
function NE(n) {
  n.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : OE(
      a.routesMeta.map((s) => s.childrenIndex),
      r.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var CE = /^:[\w-]+$/, ME = 3, RE = 2, AE = 1, _E = 10, DE = -2, Xv = (n) => n === "*";
function zE(n, a) {
  let r = n.split("/"), s = r.length;
  return r.some(Xv) && (s += DE), a && (s += RE), r.filter((o) => !Xv(o)).reduce(
    (o, c) => o + (CE.test(c) ? ME : c === "" ? AE : _E),
    s
  );
}
function OE(n, a) {
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
function LE(n, a, r = !1) {
  let { routesMeta: s } = n, o = {}, c = "/", h = [];
  for (let m = 0; m < s.length; ++m) {
    let v = s[m], p = m === s.length - 1, b = c === "/" ? a : a.slice(c.length) || "/", g = hu(
      { path: v.relativePath, caseSensitive: v.caseSensitive, end: p },
      b
    ), S = v.route;
    if (!g && p && r && !s[s.length - 1].route.index && (g = hu(
      {
        path: v.relativePath,
        caseSensitive: v.caseSensitive,
        end: !1
      },
      b
    )), !g)
      return null;
    Object.assign(o, g.params), h.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: Fn([c, g.pathname]),
      pathnameBase: HE(
        Fn([c, g.pathnameBase])
      ),
      route: S
    }), g.pathnameBase !== "/" && (c = Fn([c, g.pathnameBase]));
  }
  return h;
}
function hu(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [r, s] = UE(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(r);
  if (!o) return null;
  let c = o[0], h = c.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: s.reduce(
      (p, { paramName: b, isOptional: g }, S) => {
        if (b === "*") {
          let j = m[S] || "";
          h = c.slice(0, c.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const w = m[S];
        return g && !w ? p[b] = void 0 : p[b] = (w || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: c,
    pathnameBase: h,
    pattern: n
  };
}
function UE(n, a = !1, r = !0) {
  Ct(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + n.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (h, m, v, p, b) => {
      if (s.push({ paramName: m, isOptional: v != null }), v) {
        let g = b.charAt(p + h.length);
        return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return n.endsWith("*") ? (s.push({ paramName: "*" }), o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function kE(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Ct(
      !1,
      `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), n;
  }
}
function Xn(n, a) {
  if (a === "/") return n;
  if (!n.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, s = n.charAt(r);
  return s && s !== "/" ? null : n.slice(r) || "/";
}
function VE({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : Fn([n, a]);
}
var Tb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, fh = (n) => Tb.test(n);
function BE(n, a = "/") {
  let {
    pathname: r,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? aa(n) : n, c;
  return r ? (r = mh(r), r.startsWith("/") ? c = Kv(r.substring(1), "/") : c = Kv(r, a)) : c = a, {
    pathname: c,
    search: qE(s),
    hash: $E(o)
  };
}
function Kv(n, a) {
  let r = mu(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function Zd(n, a, r, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Nb(n) {
  return n.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function hh(n) {
  let a = Nb(n);
  return a.map(
    (r, s) => s === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function ju(n, a, r, s = !1) {
  let o;
  typeof n == "string" ? o = aa(n) : (o = { ...n }, $e(
    !o.pathname || !o.pathname.includes("?"),
    Zd("?", "pathname", "search", o)
  ), $e(
    !o.pathname || !o.pathname.includes("#"),
    Zd("#", "pathname", "hash", o)
  ), $e(
    !o.search || !o.search.includes("#"),
    Zd("#", "search", "hash", o)
  ));
  let c = n === "" || o.pathname === "", h = c ? "/" : o.pathname, m;
  if (h == null)
    m = r;
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
  let v = BE(o, m), p = h && h !== "/" && h.endsWith("/"), b = (c || h === ".") && r.endsWith("/");
  return !v.pathname.endsWith("/") && (p || b) && (v.pathname += "/"), v;
}
var mh = (n) => n.replace(/\/\/+/g, "/"), Fn = (n) => mh(n.join("/")), mu = (n) => n.replace(/\/+$/, ""), HE = (n) => mu(n).replace(/^\/*/, "/"), qE = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, $E = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, IE = (n, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let s = new Headers(r.headers);
  return s.set("Location", n), new Response(null, { ...r, headers: s });
}, Tu = class {
  constructor(n, a, r, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function fs(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function xs(n) {
  let a = n.map((r) => r.route.path).filter(Boolean);
  return Fn(a) || "/";
}
var Cb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Mb(n, a) {
  let r = n;
  if (typeof r != "string" || !Tb.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let s = r, o = !1;
  if (Cb)
    try {
      let c = new URL(window.location.href), h = r.startsWith("//") ? new URL(c.protocol + r) : new URL(r), m = Xn(h.pathname, a);
      h.origin === c.origin && m != null ? r = m + h.search + h.hash : o = !0;
    } catch {
      Ct(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: s,
    isExternal: o,
    to: r
  };
}
var pi = Symbol("Uninstrumented");
function FE(n, a) {
  let r = {
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
        let h = Object.keys(r);
        for (let m of h)
          c[m] && r[m].push(c[m]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && r.lazy.length > 0) {
    let o = $r(r.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((c) => {
      let h = o[c], m = r[`lazy.${c}`];
      if (typeof h == "function" && m.length > 0) {
        let v = $r(m, h, () => {
        });
        v && (s.lazy = Object.assign(s.lazy || {}, {
          [c]: v
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let c = a[o];
    if (typeof c == "function" && r[o].length > 0) {
      let h = c[pi] ?? c, m = $r(
        r[o],
        h,
        (...v) => Qv(v[0])
      );
      m && (o === "loader" && h.hydrate === !0 && (m.hydrate = !0), m[pi] = h, s[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[pi] ?? o, h = $r(
      r.middleware,
      c,
      (...m) => Qv(m[0])
    );
    return h ? (h[pi] = c, h) : o;
  })), s;
}
function YE(n, a) {
  let r = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (s) => s({
      instrument(o) {
        let c = Object.keys(o);
        for (let h of c)
          o[h] && r[h].push(o[h]);
      }
    })
  ), r.navigate.length > 0) {
    let s = n.navigate[pi] ?? n.navigate, o = $r(
      r.navigate,
      s,
      (...c) => {
        let [h, m] = c;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? ha(h) : ".",
          ...Pv(n, m ?? {})
        };
      }
    );
    o && (o[pi] = s, n.navigate = o);
  }
  if (r.fetch.length > 0) {
    let s = n.fetch[pi] ?? n.fetch, o = $r(r.fetch, s, (...c) => {
      let [h, , m, v] = c;
      return {
        href: m ?? ".",
        fetcherKey: h,
        ...Pv(n, v ?? {})
      };
    });
    o && (o[pi] = s, n.fetch = o);
  }
  return n;
}
function $r(n, a, r) {
  return n.length === 0 ? null : async (...s) => {
    let o = await Rb(
      n,
      r(...s),
      () => a(...s),
      n.length - 1
    );
    if (o.type === "error")
      throw o.value;
    return o.value;
  };
}
async function Rb(n, a, r, s) {
  let o = n[s], c;
  if (o) {
    let h, m = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = Rb(n, a, r, s - 1), c = await h, $e(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (v) {
      console.error("An instrumentation function threw an error:", v);
    }
    h || await m(), await h;
  } else
    try {
      c = { type: "success", value: await r() };
    } catch (h) {
      c = { type: "error", value: h };
    }
  return c || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function Qv(n) {
  let { request: a, context: r, params: s, unstable_pattern: o } = n;
  return {
    request: GE(a),
    params: { ...s },
    unstable_pattern: o,
    context: XE(r)
  };
}
function Pv(n, a) {
  return {
    currentUrl: ha(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function GE(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function XE(n) {
  if (QE(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var KE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function QE(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === KE;
}
var Ab = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], PE = new Set(
  Ab
), ZE = [
  "GET",
  ...Ab
], JE = new Set(ZE), _b = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), WE = /* @__PURE__ */ new Set([307, 308]), Jd = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, ej = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Xl = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, tj = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), Db = "remix-router-transitions", zb = Symbol("ResetLoaderData");
function nj(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  $e(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || tj, c = o;
  if (n.unstable_instrumentations) {
    let R = n.unstable_instrumentations;
    c = (B) => ({
      ...o(B),
      ...FE(
        R.map(($) => $.route).filter(Boolean),
        B
      )
    });
  }
  let h = {}, m = ds(
    n.routes,
    c,
    void 0,
    h
  ), v, p = n.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let b = n.dataStrategy || sj, g = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, w = /* @__PURE__ */ new Set(), j = null, T = null, M = null, N = n.hydrationData != null, L = hi(m, n.history.location, p), z = !1, _ = null, J, G;
  if (L == null && !n.patchRoutesOnNavigation) {
    let R = In(404, {
      pathname: n.history.location.pathname
    }), { matches: B, route: $ } = $o(m);
    J = !0, G = !J, L = B, _ = { [$.id]: R };
  } else if (L && !n.hydrationData && xn(
    L,
    m,
    n.history.location.pathname
  ).active && (L = null), L)
    if (L.some((R) => R.route.lazy))
      J = !1, G = !J;
    else if (!L.some((R) => ph(R.route)))
      J = !0, G = !J;
    else {
      let R = n.hydrationData ? n.hydrationData.loaderData : null, B = n.hydrationData ? n.hydrationData.errors : null, $ = L;
      if (B) {
        let se = L.findIndex(
          (ue) => B[ue.route.id] !== void 0
        );
        $ = $.slice(0, se + 1);
      }
      G = !1, J = !0, $.forEach((se) => {
        let ue = Ob(se.route, R, B);
        G = G || ue.renderFallback, J = J && !ue.shouldLoad;
      });
    }
  else {
    J = !1, G = !J, L = [];
    let R = xn(
      null,
      m,
      n.history.location.pathname
    );
    R.active && R.matches && (z = !0, L = R.matches);
  }
  let W, A = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: L,
    initialized: J,
    renderFallback: G,
    navigation: Jd,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || _,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, U = "POP", I = null, le = !1, ae, me = !1, ge = /* @__PURE__ */ new Map(), oe = null, O = !1, V = !1, q = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Map(), te = 0, C = -1, K = /* @__PURE__ */ new Map(), Z = /* @__PURE__ */ new Set(), re = /* @__PURE__ */ new Map(), ce = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Set(), ze = /* @__PURE__ */ new Map(), _e, Be = null;
  function kt() {
    if (S = n.history.listen(
      ({ action: R, location: B, delta: $ }) => {
        if (_e) {
          _e(), _e = void 0;
          return;
        }
        Ct(
          ze.size === 0 || $ != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let se = ra({
          currentLocation: A.location,
          nextLocation: B,
          historyAction: R
        });
        if (se && $ != null) {
          let ue = new Promise((Se) => {
            _e = Se;
          });
          n.history.go($ * -1), Pn(se, {
            state: "blocked",
            location: B,
            proceed() {
              Pn(se, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: B
              }), ue.then(() => n.history.go($));
            },
            reset() {
              let Se = new Map(A.blockers);
              Se.set(se, Xl), Te({ blockers: Se });
            }
          }), I?.resolve(), I = null;
          return;
        }
        return it(R, B);
      }
    ), r) {
      Tj(a, ge);
      let R = () => Nj(a, ge);
      a.addEventListener("pagehide", R), oe = () => a.removeEventListener("pagehide", R);
    }
    return A.initialized || it("POP", A.location, {
      initialHydration: !0
    }), W;
  }
  function Yt() {
    S && S(), oe && oe(), w.clear(), ae && ae.abort(), A.fetchers.forEach((R, B) => Qn(B)), A.blockers.forEach((R, B) => pa(B));
  }
  function fe(R) {
    return w.add(R), () => w.delete(R);
  }
  function Te(R, B = {}) {
    R.matches && (R.matches = R.matches.map((ue) => {
      let Se = h[ue.route.id], he = ue.route;
      return he.element !== Se.element || he.errorElement !== Se.errorElement || he.hydrateFallbackElement !== Se.hydrateFallbackElement ? {
        ...ue,
        route: Se
      } : ue;
    })), A = {
      ...A,
      ...R
    };
    let $ = [], se = [];
    A.fetchers.forEach((ue, Se) => {
      ue.state === "idle" && (ve.has(Se) ? $.push(Se) : se.push(Se));
    }), ve.forEach((ue) => {
      !A.fetchers.has(ue) && !Q.has(ue) && $.push(ue);
    }), [...w].forEach(
      (ue) => ue(A, {
        deletedFetchers: $,
        newErrors: R.errors ?? null,
        viewTransitionOpts: B.viewTransitionOpts,
        flushSync: B.flushSync === !0
      })
    ), $.forEach((ue) => Qn(ue)), se.forEach((ue) => A.fetchers.delete(ue));
  }
  function Ce(R, B, { flushSync: $ } = {}) {
    let se = A.actionData != null && A.navigation.formMethod != null && ln(A.navigation.formMethod) && A.navigation.state === "loading" && R.state?._isRedirect !== !0, ue;
    B.actionData ? Object.keys(B.actionData).length > 0 ? ue = B.actionData : ue = null : se ? ue = A.actionData : ue = null;
    let Se = B.loaderData ? sy(
      A.loaderData,
      B.loaderData,
      B.matches || [],
      B.errors
    ) : A.loaderData, he = A.blockers;
    he.size > 0 && (he = new Map(he), he.forEach((Ae, Ne) => he.set(Ne, Xl)));
    let pe = O ? !1 : It(R, B.matches || A.matches), Ee = le === !0 || A.navigation.formMethod != null && ln(A.navigation.formMethod) && R.state?._isRedirect !== !0;
    v && (m = v, v = void 0), O || U === "POP" || (U === "PUSH" ? n.history.push(R, R.state) : U === "REPLACE" && n.history.replace(R, R.state));
    let be;
    if (U === "POP") {
      let Ae = ge.get(A.location.pathname);
      Ae && Ae.has(R.pathname) ? be = {
        currentLocation: A.location,
        nextLocation: R
      } : ge.has(R.pathname) && (be = {
        currentLocation: R,
        nextLocation: A.location
      });
    } else if (me) {
      let Ae = ge.get(A.location.pathname);
      Ae ? Ae.add(R.pathname) : (Ae = /* @__PURE__ */ new Set([R.pathname]), ge.set(A.location.pathname, Ae)), be = {
        currentLocation: A.location,
        nextLocation: R
      };
    }
    Te(
      {
        ...B,
        // matches, errors, fetchers go through as-is
        actionData: ue,
        loaderData: Se,
        historyAction: U,
        location: R,
        initialized: !0,
        renderFallback: !1,
        navigation: Jd,
        revalidation: "idle",
        restoreScrollPosition: pe,
        preventScrollReset: Ee,
        blockers: he
      },
      {
        viewTransitionOpts: be,
        flushSync: $ === !0
      }
    ), U = "POP", le = !1, me = !1, O = !1, V = !1, I?.resolve(), I = null, Be?.resolve(), Be = null;
  }
  async function Me(R, B) {
    if (I?.resolve(), I = null, typeof R == "number") {
      I || (I = dy());
      let dt = I.promise;
      return n.history.go(R), dt;
    }
    let $ = Vf(
      A.location,
      A.matches,
      p,
      R,
      B?.fromRouteId,
      B?.relative
    ), { path: se, submission: ue, error: Se } = Zv(
      !1,
      $,
      B
    ), he;
    B?.unstable_mask && (he = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof B.unstable_mask == "string" ? aa(B.unstable_mask) : {
        ...A.location.unstable_mask,
        ...B.unstable_mask
      }
    });
    let pe = A.location, Ee = kf(
      pe,
      se,
      B && B.state,
      void 0,
      he
    );
    Ee = {
      ...Ee,
      ...n.history.encodeLocation(Ee)
    };
    let be = B && B.replace != null ? B.replace : void 0, Ae = "PUSH";
    be === !0 ? Ae = "REPLACE" : be === !1 || ue != null && ln(ue.formMethod) && ue.formAction === A.location.pathname + A.location.search && (Ae = "REPLACE");
    let Ne = B && "preventScrollReset" in B ? B.preventScrollReset === !0 : void 0, Pe = (B && B.flushSync) === !0, He = ra({
      currentLocation: pe,
      nextLocation: Ee,
      historyAction: Ae
    });
    if (He) {
      Pn(He, {
        state: "blocked",
        location: Ee,
        proceed() {
          Pn(He, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Ee
          }), Me(R, B);
        },
        reset() {
          let dt = new Map(A.blockers);
          dt.set(He, Xl), Te({ blockers: dt });
        }
      });
      return;
    }
    await it(Ae, Ee, {
      submission: ue,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Se,
      preventScrollReset: Ne,
      replace: B && B.replace,
      enableViewTransition: B && B.viewTransition,
      flushSync: Pe,
      callSiteDefaultShouldRevalidate: B && B.unstable_defaultShouldRevalidate
    });
  }
  function Kt() {
    Be || (Be = dy()), tt(), Te({ revalidation: "loading" });
    let R = Be.promise;
    return A.navigation.state === "submitting" ? R : A.navigation.state === "idle" ? (it(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), R) : (it(
      U || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: me === !0
      }
    ), R);
  }
  async function it(R, B, $) {
    ae && ae.abort(), ae = null, U = R, O = ($ && $.startUninterruptedRevalidation) === !0, Mt(A.location, A.matches), le = ($ && $.preventScrollReset) === !0, me = ($ && $.enableViewTransition) === !0;
    let se = v || m, ue = $ && $.overrideNavigation, Se = $?.initialHydration && A.matches && A.matches.length > 0 && !z ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : hi(se, B, p), he = ($ && $.flushSync) === !0;
    if (Se && A.initialized && !V && pj(A.location, B) && !($ && $.submission && ln($.submission.formMethod))) {
      Ce(B, { matches: Se }, { flushSync: he });
      return;
    }
    let pe = xn(Se, se, B.pathname);
    if (pe.active && pe.matches && (Se = pe.matches), !Se) {
      let { error: lt, notFoundMatches: yt, route: Ie } = cn(
        B.pathname
      );
      Ce(
        B,
        {
          matches: yt,
          loaderData: {},
          errors: {
            [Ie.id]: lt
          }
        },
        { flushSync: he }
      );
      return;
    }
    ae = new AbortController();
    let Ee = qr(
      n.history,
      B,
      ae.signal,
      $ && $.submission
    ), be = n.getContext ? await n.getContext() : new Yv(), Ae;
    if ($ && $.pendingError)
      Ae = [
        mi(Se).route.id,
        { type: "error", error: $.pendingError }
      ];
    else if ($ && $.submission && ln($.submission.formMethod)) {
      let lt = await on(
        Ee,
        B,
        $.submission,
        Se,
        be,
        pe.active,
        $ && $.initialHydration === !0,
        { replace: $.replace, flushSync: he }
      );
      if (lt.shortCircuited)
        return;
      if (lt.pendingActionResult) {
        let [yt, Ie] = lt.pendingActionResult;
        if (Rn(Ie) && fs(Ie.error) && Ie.error.status === 404) {
          ae = null, Ce(B, {
            matches: lt.matches,
            loaderData: {},
            errors: {
              [yt]: Ie.error
            }
          });
          return;
        }
      }
      Se = lt.matches || Se, Ae = lt.pendingActionResult, ue = Wd(B, $.submission), he = !1, pe.active = !1, Ee = qr(
        n.history,
        Ee.url,
        Ee.signal
      );
    }
    let {
      shortCircuited: Ne,
      matches: Pe,
      loaderData: He,
      errors: dt
    } = await Qt(
      Ee,
      B,
      Se,
      be,
      pe.active,
      ue,
      $ && $.submission,
      $ && $.fetcherSubmission,
      $ && $.replace,
      $ && $.initialHydration === !0,
      he,
      Ae,
      $ && $.callSiteDefaultShouldRevalidate
    );
    Ne || (ae = null, Ce(B, {
      matches: Pe || Se,
      ...oy(Ae),
      loaderData: He,
      errors: dt
    }));
  }
  async function on(R, B, $, se, ue, Se, he, pe = {}) {
    tt();
    let Ee = Ej(B, $);
    if (Te({ navigation: Ee }, { flushSync: pe.flushSync === !0 }), Se) {
      let Ne = await rt(
        se,
        B.pathname,
        R.signal
      );
      if (Ne.type === "aborted")
        return { shortCircuited: !0 };
      if (Ne.type === "error") {
        if (Ne.partialMatches.length === 0) {
          let { matches: He, route: dt } = $o(m);
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
        let Pe = mi(Ne.partialMatches).route.id;
        return {
          matches: Ne.partialMatches,
          pendingActionResult: [
            Pe,
            {
              type: "error",
              error: Ne.error
            }
          ]
        };
      } else if (Ne.matches)
        se = Ne.matches;
      else {
        let { notFoundMatches: Pe, error: He, route: dt } = cn(
          B.pathname
        );
        return {
          matches: Pe,
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
    let be, Ae = lu(se, B);
    if (!Ae.route.action && !Ae.route.lazy)
      be = {
        type: "error",
        error: In(405, {
          method: R.method,
          pathname: B.pathname,
          routeId: Ae.route.id
        })
      };
    else {
      let Ne = Gr(
        c,
        h,
        R,
        B,
        se,
        Ae,
        he ? [] : s,
        ue
      ), Pe = await Oe(
        R,
        B,
        Ne,
        ue,
        null
      );
      if (be = Pe[Ae.route.id], !be) {
        for (let He of se)
          if (Pe[He.route.id]) {
            be = Pe[He.route.id];
            break;
          }
      }
      if (R.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Yi(be)) {
      let Ne;
      return pe && pe.replace != null ? Ne = pe.replace : Ne = iy(
        be.response.headers.get("Location"),
        new URL(R.url),
        p,
        n.history
      ) === A.location.pathname + A.location.search, await ye(R, be, !0, {
        submission: $,
        replace: Ne
      }), { shortCircuited: !0 };
    }
    if (Rn(be)) {
      let Ne = mi(se, Ae.route.id);
      return (pe && pe.replace) !== !0 && (U = "PUSH"), {
        matches: se,
        pendingActionResult: [
          Ne.route.id,
          be,
          Ae.route.id
        ]
      };
    }
    return {
      matches: se,
      pendingActionResult: [Ae.route.id, be]
    };
  }
  async function Qt(R, B, $, se, ue, Se, he, pe, Ee, be, Ae, Ne, Pe) {
    let He = Se || Wd(B, he), dt = he || pe || cy(He), lt = !O && !be;
    if (ue) {
      if (lt) {
        let jt = bn(Ne);
        Te(
          {
            navigation: He,
            ...jt !== void 0 ? { actionData: jt } : {}
          },
          {
            flushSync: Ae
          }
        );
      }
      let qe = await rt(
        $,
        B.pathname,
        R.signal
      );
      if (qe.type === "aborted")
        return { shortCircuited: !0 };
      if (qe.type === "error") {
        if (qe.partialMatches.length === 0) {
          let { matches: an, route: At } = $o(m);
          return {
            matches: an,
            loaderData: {},
            errors: {
              [At.id]: qe.error
            }
          };
        }
        let jt = mi(qe.partialMatches).route.id;
        return {
          matches: qe.partialMatches,
          loaderData: {},
          errors: {
            [jt]: qe.error
          }
        };
      } else if (qe.matches)
        $ = qe.matches;
      else {
        let { error: jt, notFoundMatches: an, route: At } = cn(
          B.pathname
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
    let yt = v || m, { dsMatches: Ie, revalidatingFetchers: Rt } = Jv(
      R,
      se,
      c,
      h,
      n.history,
      A,
      $,
      dt,
      B,
      be ? [] : s,
      be === !0,
      V,
      q,
      ve,
      re,
      Z,
      yt,
      p,
      n.patchRoutesOnNavigation != null,
      Ne,
      Pe
    );
    if (C = ++te, !n.dataStrategy && !Ie.some((qe) => qe.shouldLoad) && !Ie.some(
      (qe) => qe.route.middleware && qe.route.middleware.length > 0
    ) && Rt.length === 0) {
      let qe = Ji();
      return Ce(
        B,
        {
          matches: $,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ne && Rn(Ne[1]) ? { [Ne[0]]: Ne[1].error } : null,
          ...oy(Ne),
          ...qe ? { fetchers: new Map(A.fetchers) } : {}
        },
        { flushSync: Ae }
      ), { shortCircuited: !0 };
    }
    if (lt) {
      let qe = {};
      if (!ue) {
        qe.navigation = He;
        let jt = bn(Ne);
        jt !== void 0 && (qe.actionData = jt);
      }
      Rt.length > 0 && (qe.fetchers = ma(Rt)), Te(qe, { flushSync: Ae });
    }
    Rt.forEach((qe) => {
      Et(qe.key), qe.controller && Q.set(qe.key, qe.controller);
    });
    let ht = () => Rt.forEach((qe) => Et(qe.key));
    ae && ae.signal.addEventListener(
      "abort",
      ht
    );
    let { loaderResults: Ha, fetcherResults: Zn } = await Qe(
      Ie,
      Rt,
      R,
      B,
      se
    );
    if (R.signal.aborted)
      return { shortCircuited: !0 };
    ae && ae.signal.removeEventListener(
      "abort",
      ht
    ), Rt.forEach((qe) => Q.delete(qe.key));
    let Gt = Io(Ha);
    if (Gt)
      return await ye(R, Gt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    if (Gt = Io(Zn), Gt)
      return Z.add(Gt.key), await ye(R, Gt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    let { loaderData: la, errors: ji } = ly(
      A,
      $,
      Ha,
      Ne,
      Rt,
      Zn
    );
    be && A.errors && (ji = { ...A.errors, ...ji });
    let sa = Ji(), Ti = Ba(C), Wi = sa || Ti || Rt.length > 0;
    return {
      matches: $,
      loaderData: la,
      errors: ji,
      ...Wi ? { fetchers: new Map(A.fetchers) } : {}
    };
  }
  function bn(R) {
    if (R && !Rn(R[1]))
      return {
        [R[0]]: R[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function ma(R) {
    return R.forEach((B) => {
      let $ = A.fetchers.get(B.key), se = Kl(
        void 0,
        $ ? $.data : void 0
      );
      A.fetchers.set(B.key, se);
    }), new Map(A.fetchers);
  }
  async function Vt(R, B, $, se) {
    Et(R);
    let ue = (se && se.flushSync) === !0, Se = v || m, he = Vf(
      A.location,
      A.matches,
      p,
      $,
      B,
      se?.relative
    ), pe = hi(Se, he, p), Ee = xn(pe, Se, he);
    if (Ee.active && Ee.matches && (pe = Ee.matches), !pe) {
      qt(
        R,
        B,
        In(404, { pathname: he }),
        { flushSync: ue }
      );
      return;
    }
    let { path: be, submission: Ae, error: Ne } = Zv(
      !0,
      he,
      se
    );
    if (Ne) {
      qt(R, B, Ne, { flushSync: ue });
      return;
    }
    let Pe = n.getContext ? await n.getContext() : new Yv(), He = (se && se.preventScrollReset) === !0;
    if (Ae && ln(Ae.formMethod)) {
      await Dn(
        R,
        B,
        be,
        pe,
        Pe,
        Ee.active,
        ue,
        He,
        Ae,
        se && se.unstable_defaultShouldRevalidate
      );
      return;
    }
    re.set(R, { routeId: B, path: be }), await Bt(
      R,
      B,
      be,
      pe,
      Pe,
      Ee.active,
      ue,
      He,
      Ae
    );
  }
  async function Dn(R, B, $, se, ue, Se, he, pe, Ee, be) {
    tt(), re.delete(R);
    let Ae = A.fetchers.get(R);
    Ht(R, jj(Ee, Ae), {
      flushSync: he
    });
    let Ne = new AbortController(), Pe = qr(
      n.history,
      $,
      Ne.signal,
      Ee
    );
    if (Se) {
      let mt = await rt(
        se,
        new URL(Pe.url).pathname,
        Pe.signal,
        R
      );
      if (mt.type === "aborted")
        return;
      if (mt.type === "error") {
        qt(R, B, mt.error, { flushSync: he });
        return;
      } else if (mt.matches)
        se = mt.matches;
      else {
        qt(
          R,
          B,
          In(404, { pathname: $ }),
          { flushSync: he }
        );
        return;
      }
    }
    let He = lu(se, $);
    if (!He.route.action && !He.route.lazy) {
      let mt = In(405, {
        method: Ee.formMethod,
        pathname: $,
        routeId: B
      });
      qt(R, B, mt, { flushSync: he });
      return;
    }
    Q.set(R, Ne);
    let dt = te, lt = Gr(
      c,
      h,
      Pe,
      $,
      se,
      He,
      s,
      ue
    ), yt = await Oe(
      Pe,
      $,
      lt,
      ue,
      R
    ), Ie = yt[He.route.id];
    if (!Ie) {
      for (let mt of lt)
        if (yt[mt.route.id]) {
          Ie = yt[mt.route.id];
          break;
        }
    }
    if (Pe.signal.aborted) {
      Q.get(R) === Ne && Q.delete(R);
      return;
    }
    if (ve.has(R)) {
      if (Yi(Ie) || Rn(Ie)) {
        Ht(R, Oa(void 0));
        return;
      }
    } else {
      if (Yi(Ie))
        if (Q.delete(R), C > dt) {
          Ht(R, Oa(void 0));
          return;
        } else
          return Z.add(R), Ht(R, Kl(Ee)), ye(Pe, Ie, !1, {
            fetcherSubmission: Ee,
            preventScrollReset: pe
          });
      if (Rn(Ie)) {
        qt(R, B, Ie.error);
        return;
      }
    }
    let Rt = A.navigation.location || A.location, ht = qr(
      n.history,
      Rt,
      Ne.signal
    ), Ha = v || m, Zn = A.navigation.state !== "idle" ? hi(Ha, A.navigation.location, p) : A.matches;
    $e(Zn, "Didn't find any matches after fetcher action");
    let Gt = ++te;
    K.set(R, Gt);
    let la = Kl(Ee, Ie.data);
    A.fetchers.set(R, la);
    let { dsMatches: ji, revalidatingFetchers: sa } = Jv(
      ht,
      ue,
      c,
      h,
      n.history,
      A,
      Zn,
      Ee,
      Rt,
      s,
      !1,
      V,
      q,
      ve,
      re,
      Z,
      Ha,
      p,
      n.patchRoutesOnNavigation != null,
      [He.route.id, Ie],
      be
    );
    sa.filter((mt) => mt.key !== R).forEach((mt) => {
      let er = mt.key, tr = A.fetchers.get(er), As = Kl(
        void 0,
        tr ? tr.data : void 0
      );
      A.fetchers.set(er, As), Et(er), mt.controller && Q.set(er, mt.controller);
    }), Te({ fetchers: new Map(A.fetchers) });
    let Ti = () => sa.forEach((mt) => Et(mt.key));
    Ne.signal.addEventListener(
      "abort",
      Ti
    );
    let { loaderResults: Wi, fetcherResults: qe } = await Qe(
      ji,
      sa,
      ht,
      Rt,
      ue
    );
    if (Ne.signal.aborted)
      return;
    if (Ne.signal.removeEventListener(
      "abort",
      Ti
    ), K.delete(R), Q.delete(R), sa.forEach((mt) => Q.delete(mt.key)), A.fetchers.has(R)) {
      let mt = Oa(Ie.data);
      A.fetchers.set(R, mt);
    }
    let jt = Io(Wi);
    if (jt)
      return ye(
        ht,
        jt.result,
        !1,
        { preventScrollReset: pe }
      );
    if (jt = Io(qe), jt)
      return Z.add(jt.key), ye(
        ht,
        jt.result,
        !1,
        { preventScrollReset: pe }
      );
    let { loaderData: an, errors: At } = ly(
      A,
      Zn,
      Wi,
      void 0,
      sa,
      qe
    );
    Ba(Gt), A.navigation.state === "loading" && Gt > C ? ($e(U, "Expected pending action"), ae && ae.abort(), Ce(A.navigation.location, {
      matches: Zn,
      loaderData: an,
      errors: At,
      fetchers: new Map(A.fetchers)
    })) : (Te({
      errors: At,
      loaderData: sy(
        A.loaderData,
        an,
        Zn,
        At
      ),
      fetchers: new Map(A.fetchers)
    }), V = !1);
  }
  async function Bt(R, B, $, se, ue, Se, he, pe, Ee) {
    let be = A.fetchers.get(R);
    Ht(
      R,
      Kl(
        Ee,
        be ? be.data : void 0
      ),
      { flushSync: he }
    );
    let Ae = new AbortController(), Ne = qr(
      n.history,
      $,
      Ae.signal
    );
    if (Se) {
      let Ie = await rt(
        se,
        new URL(Ne.url).pathname,
        Ne.signal,
        R
      );
      if (Ie.type === "aborted")
        return;
      if (Ie.type === "error") {
        qt(R, B, Ie.error, { flushSync: he });
        return;
      } else if (Ie.matches)
        se = Ie.matches;
      else {
        qt(
          R,
          B,
          In(404, { pathname: $ }),
          { flushSync: he }
        );
        return;
      }
    }
    let Pe = lu(se, $);
    Q.set(R, Ae);
    let He = te, dt = Gr(
      c,
      h,
      Ne,
      $,
      se,
      Pe,
      s,
      ue
    ), lt = await Oe(
      Ne,
      $,
      dt,
      ue,
      R
    ), yt = lt[Pe.route.id];
    if (!yt) {
      for (let Ie of se)
        if (lt[Ie.route.id]) {
          yt = lt[Ie.route.id];
          break;
        }
    }
    if (Q.get(R) === Ae && Q.delete(R), !Ne.signal.aborted) {
      if (ve.has(R)) {
        Ht(R, Oa(void 0));
        return;
      }
      if (Yi(yt))
        if (C > He) {
          Ht(R, Oa(void 0));
          return;
        } else {
          Z.add(R), await ye(Ne, yt, !1, {
            preventScrollReset: pe
          });
          return;
        }
      if (Rn(yt)) {
        qt(R, B, yt.error);
        return;
      }
      Ht(R, Oa(yt.data));
    }
  }
  async function ye(R, B, $, {
    submission: se,
    fetcherSubmission: ue,
    preventScrollReset: Se,
    replace: he
  } = {}) {
    $ || (I?.resolve(), I = null), B.response.headers.has("X-Remix-Revalidate") && (V = !0);
    let pe = B.response.headers.get("Location");
    $e(pe, "Expected a Location header on the redirect Response"), pe = iy(
      pe,
      new URL(R.url),
      p,
      n.history
    );
    let Ee = kf(A.location, pe, {
      _isRedirect: !0
    });
    if (r) {
      let dt = !1;
      if (B.response.headers.has("X-Remix-Reload-Document"))
        dt = !0;
      else if (fh(pe)) {
        const lt = bE(pe, !0);
        dt = // Hard reload if it's an absolute URL to a new origin
        lt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Xn(lt.pathname, p) == null;
      }
      if (dt) {
        he ? a.location.replace(pe) : a.location.assign(pe);
        return;
      }
    }
    ae = null;
    let be = he === !0 || B.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Ae, formAction: Ne, formEncType: Pe } = A.navigation;
    !se && !ue && Ae && Ne && Pe && (se = cy(A.navigation));
    let He = se || ue;
    if (WE.has(B.response.status) && He && ln(He.formMethod))
      await it(be, Ee, {
        submission: {
          ...He,
          formAction: pe
        },
        // Preserve these flags across redirects
        preventScrollReset: Se || le,
        enableViewTransition: $ ? me : void 0
      });
    else {
      let dt = Wd(
        Ee,
        se
      );
      await it(be, Ee, {
        overrideNavigation: dt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ue,
        // Preserve these flags across redirects
        preventScrollReset: Se || le,
        enableViewTransition: $ ? me : void 0
      });
    }
  }
  async function Oe(R, B, $, se, ue) {
    let Se, he = {};
    try {
      Se = await uj(
        b,
        R,
        B,
        $,
        ue,
        se,
        !1
      );
    } catch (pe) {
      return $.filter((Ee) => Ee.shouldLoad).forEach((Ee) => {
        he[Ee.route.id] = {
          type: "error",
          error: pe
        };
      }), he;
    }
    if (R.signal.aborted)
      return he;
    if (!ln(R.method))
      for (let pe of $) {
        if (Se[pe.route.id]?.type === "error")
          break;
        !Se.hasOwnProperty(pe.route.id) && !A.loaderData.hasOwnProperty(pe.route.id) && (!A.errors || !A.errors.hasOwnProperty(pe.route.id)) && pe.shouldCallHandler() && (Se[pe.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${pe.route.id}`
          )
        });
      }
    for (let [pe, Ee] of Object.entries(Se))
      if (bj(Ee)) {
        let be = Ee.result;
        he[pe] = {
          type: "redirect",
          response: hj(
            be,
            R,
            pe,
            $,
            p
          )
        };
      } else
        he[pe] = await fj(Ee);
    return he;
  }
  async function Qe(R, B, $, se, ue) {
    let Se = Oe(
      $,
      se,
      R,
      ue,
      null
    ), he = Promise.all(
      B.map(async (be) => {
        if (be.matches && be.match && be.request && be.controller) {
          let Ne = (await Oe(
            be.request,
            be.path,
            be.matches,
            ue,
            be.key
          ))[be.match.route.id];
          return { [be.key]: Ne };
        } else
          return Promise.resolve({
            [be.key]: {
              type: "error",
              error: In(404, {
                pathname: be.path
              })
            }
          });
      })
    ), pe = await Se, Ee = (await he).reduce(
      (be, Ae) => Object.assign(be, Ae),
      {}
    );
    return {
      loaderResults: pe,
      fetcherResults: Ee
    };
  }
  function tt() {
    V = !0, re.forEach((R, B) => {
      Q.has(B) && q.add(B), Et(B);
    });
  }
  function Ht(R, B, $ = {}) {
    A.fetchers.set(R, B), Te(
      { fetchers: new Map(A.fetchers) },
      { flushSync: ($ && $.flushSync) === !0 }
    );
  }
  function qt(R, B, $, se = {}) {
    let ue = mi(A.matches, B);
    Qn(R), Te(
      {
        errors: {
          [ue.route.id]: $
        },
        fetchers: new Map(A.fetchers)
      },
      { flushSync: (se && se.flushSync) === !0 }
    );
  }
  function Ei(R) {
    return ce.set(R, (ce.get(R) || 0) + 1), ve.has(R) && ve.delete(R), A.fetchers.get(R) || ej;
  }
  function ia(R, B) {
    Et(R, B?.reason), Ht(R, Oa(null));
  }
  function Qn(R) {
    let B = A.fetchers.get(R);
    Q.has(R) && !(B && B.state === "loading" && K.has(R)) && Et(R), re.delete(R), K.delete(R), Z.delete(R), ve.delete(R), q.delete(R), A.fetchers.delete(R);
  }
  function Pt(R) {
    let B = (ce.get(R) || 0) - 1;
    B <= 0 ? (ce.delete(R), ve.add(R)) : ce.set(R, B), Te({ fetchers: new Map(A.fetchers) });
  }
  function Et(R, B) {
    let $ = Q.get(R);
    $ && ($.abort(B), Q.delete(R));
  }
  function $t(R) {
    for (let B of R) {
      let $ = Ei(B), se = Oa($.data);
      A.fetchers.set(B, se);
    }
  }
  function Ji() {
    let R = [], B = !1;
    for (let $ of Z) {
      let se = A.fetchers.get($);
      $e(se, `Expected fetcher: ${$}`), se.state === "loading" && (Z.delete($), R.push($), B = !0);
    }
    return $t(R), B;
  }
  function Ba(R) {
    let B = [];
    for (let [$, se] of K)
      if (se < R) {
        let ue = A.fetchers.get($);
        $e(ue, `Expected fetcher: ${$}`), ue.state === "loading" && (Et($), K.delete($), B.push($));
      }
    return $t(B), B.length > 0;
  }
  function zn(R, B) {
    let $ = A.blockers.get(R) || Xl;
    return ze.get(R) !== B && ze.set(R, B), $;
  }
  function pa(R) {
    A.blockers.delete(R), ze.delete(R);
  }
  function Pn(R, B) {
    let $ = A.blockers.get(R) || Xl;
    $e(
      $.state === "unblocked" && B.state === "blocked" || $.state === "blocked" && B.state === "blocked" || $.state === "blocked" && B.state === "proceeding" || $.state === "blocked" && B.state === "unblocked" || $.state === "proceeding" && B.state === "unblocked",
      `Invalid blocker state transition: ${$.state} -> ${B.state}`
    );
    let se = new Map(A.blockers);
    se.set(R, B), Te({ blockers: se });
  }
  function ra({
    currentLocation: R,
    nextLocation: B,
    historyAction: $
  }) {
    if (ze.size === 0)
      return;
    ze.size > 1 && Ct(!1, "A router only supports one blocker at a time");
    let se = Array.from(ze.entries()), [ue, Se] = se[se.length - 1], he = A.blockers.get(ue);
    if (!(he && he.state === "proceeding") && Se({ currentLocation: R, nextLocation: B, historyAction: $ }))
      return ue;
  }
  function cn(R) {
    let B = In(404, { pathname: R }), $ = v || m, { matches: se, route: ue } = $o($);
    return { notFoundMatches: se, route: ue, error: B };
  }
  function Le(R, B, $) {
    if (j = R, M = B, T = $ || null, !N && A.navigation === Jd) {
      N = !0;
      let se = It(A.location, A.matches);
      se != null && Te({ restoreScrollPosition: se });
    }
    return () => {
      j = null, M = null, T = null;
    };
  }
  function ct(R, B) {
    return T && T(
      R,
      B.map((se) => TE(se, A.loaderData))
    ) || R.key;
  }
  function Mt(R, B) {
    if (j && M) {
      let $ = ct(R, B);
      j[$] = M();
    }
  }
  function It(R, B) {
    if (j) {
      let $ = ct(R, B), se = j[$];
      if (typeof se == "number")
        return se;
    }
    return null;
  }
  function xn(R, B, $) {
    if (n.patchRoutesOnNavigation)
      if (R) {
        if (Object.keys(R[0].params).length > 0)
          return { active: !0, matches: as(
            B,
            $,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: as(
          B,
          $,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function rt(R, B, $, se) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: R };
    let ue = R;
    for (; ; ) {
      let Se = v == null, he = v || m, pe = h;
      try {
        await n.patchRoutesOnNavigation({
          signal: $,
          path: B,
          matches: ue,
          fetcherKey: se,
          patch: (Ae, Ne) => {
            $.aborted || Wv(
              Ae,
              Ne,
              he,
              pe,
              c,
              !1
            );
          }
        });
      } catch (Ae) {
        return { type: "error", error: Ae, partialMatches: ue };
      } finally {
        Se && !$.aborted && (m = [...m]);
      }
      if ($.aborted)
        return { type: "aborted" };
      let Ee = hi(he, B, p), be = null;
      if (Ee) {
        if (Object.keys(Ee[0].params).length === 0)
          return { type: "success", matches: Ee };
        if (be = as(
          he,
          B,
          p,
          !0
        ), !(be && ue.length < be.length && Zt(
          ue,
          be.slice(0, ue.length)
        )))
          return { type: "success", matches: Ee };
      }
      if (be || (be = as(
        he,
        B,
        p,
        !0
      )), !be || Zt(ue, be))
        return { type: "success", matches: null };
      ue = be;
    }
  }
  function Zt(R, B) {
    return R.length === B.length && R.every(($, se) => $.route.id === B[se].route.id);
  }
  function ga(R) {
    h = {}, v = ds(
      R,
      c,
      void 0,
      h
    );
  }
  function nn(R, B, $ = !1) {
    let se = v == null;
    Wv(
      R,
      B,
      v || m,
      h,
      c,
      $
    ), se && (m = [...m], Te({}));
  }
  return W = {
    get basename() {
      return p;
    },
    get future() {
      return g;
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
    initialize: kt,
    subscribe: fe,
    enableScrollRestoration: Le,
    navigate: Me,
    fetch: Vt,
    revalidate: Kt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (R) => n.history.createHref(R),
    encodeLocation: (R) => n.history.encodeLocation(R),
    getFetcher: Ei,
    resetFetcher: ia,
    deleteFetcher: Pt,
    dispose: Yt,
    getBlocker: zn,
    deleteBlocker: pa,
    patchRoutes: nn,
    _internalFetchControllers: Q,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ga,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(R) {
      Te(R);
    }
  }, n.unstable_instrumentations && (W = YE(
    W,
    n.unstable_instrumentations.map((R) => R.router).filter(Boolean)
  )), W;
}
function aj(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function Vf(n, a, r, s, o, c) {
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
  let v = ju(
    s || ".",
    hh(h),
    Xn(n.pathname, r) || n.pathname,
    c === "path"
  );
  if (s == null && (v.search = n.search, v.hash = n.hash), (s == null || s === "" || s === ".") && m) {
    let p = vh(v.search);
    if (m.route.index && !p)
      v.search = v.search ? v.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(v.search), g = b.getAll("index");
      b.delete("index"), g.filter((w) => w).forEach((w) => b.append("index", w));
      let S = b.toString();
      v.search = S ? `?${S}` : "";
    }
  }
  return r !== "/" && (v.pathname = VE({ basename: r, pathname: v.pathname })), ha(v);
}
function Zv(n, a, r) {
  if (!r || !aj(r))
    return { path: a };
  if (r.formMethod && !wj(r.formMethod))
    return {
      path: a,
      error: In(405, { method: r.formMethod })
    };
  let s = () => ({
    path: a,
    error: In(400, { type: "invalid-body" })
  }), c = (r.formMethod || "get").toUpperCase(), h = qb(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!ln(c))
        return s();
      let g = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(r.body.entries()).reduce(
          (S, [w, j]) => `${S}${w}=${j}
`,
          ""
        )
      ) : String(r.body);
      return {
        path: a,
        submission: {
          formMethod: c,
          formAction: h,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: g
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!ln(c))
        return s();
      try {
        let g = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: a,
          submission: {
            formMethod: c,
            formAction: h,
            formEncType: r.formEncType,
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
  $e(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, v;
  if (r.formData)
    m = Hf(r.formData), v = r.formData;
  else if (r.body instanceof FormData)
    m = Hf(r.body), v = r.body;
  else if (r.body instanceof URLSearchParams)
    m = r.body, v = ry(m);
  else if (r.body == null)
    m = new URLSearchParams(), v = new FormData();
  else
    try {
      m = new URLSearchParams(r.body), v = ry(m);
    } catch {
      return s();
    }
  let p = {
    formMethod: c,
    formAction: h,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: v,
    json: void 0,
    text: void 0
  };
  if (ln(p.formMethod))
    return { path: a, submission: p };
  let b = aa(a);
  return n && b.search && vh(b.search) && m.append("index", ""), b.search = `?${m}`, { path: ha(b), submission: p };
}
function Jv(n, a, r, s, o, c, h, m, v, p, b, g, S, w, j, T, M, N, L, z, _) {
  let J = z ? Rn(z[1]) ? z[1].error : z[1].data : void 0, G = o.createURL(c.location), W = o.createURL(v), A;
  if (b && c.errors) {
    let oe = Object.keys(c.errors)[0];
    A = h.findIndex((O) => O.route.id === oe);
  } else if (z && Rn(z[1])) {
    let oe = z[0];
    A = h.findIndex((O) => O.route.id === oe) - 1;
  }
  let U = z ? z[1].statusCode : void 0, I = U && U >= 400, le = {
    currentUrl: G,
    currentParams: c.matches[0]?.params || {},
    nextUrl: W,
    nextParams: h[0].params,
    ...m,
    actionResult: J,
    actionStatus: U
  }, ae = xs(h), me = h.map((oe, O) => {
    let { route: V } = oe, q = null;
    if (A != null && O > A)
      q = !1;
    else if (V.lazy)
      q = !0;
    else if (!ph(V))
      q = !1;
    else if (b) {
      let { shouldLoad: K } = Ob(
        V,
        c.loaderData,
        c.errors
      );
      q = K;
    } else ij(c.loaderData, c.matches[O], oe) && (q = !0);
    if (q !== null)
      return Bf(
        r,
        s,
        n,
        v,
        ae,
        oe,
        p,
        a,
        q
      );
    let Q = !1;
    typeof _ == "boolean" ? Q = _ : I ? Q = !1 : (g || G.pathname + G.search === W.pathname + W.search || G.search !== W.search || rj(c.matches[O], oe)) && (Q = !0);
    let te = {
      ...le,
      defaultShouldRevalidate: Q
    }, C = ss(oe, te);
    return Bf(
      r,
      s,
      n,
      v,
      ae,
      oe,
      p,
      a,
      C,
      te,
      _
    );
  }), ge = [];
  return j.forEach((oe, O) => {
    if (b || !h.some((re) => re.route.id === oe.routeId) || w.has(O))
      return;
    let V = c.fetchers.get(O), q = V && V.state !== "idle" && V.data === void 0, Q = hi(M, oe.path, N);
    if (!Q) {
      if (L && q)
        return;
      ge.push({
        key: O,
        routeId: oe.routeId,
        path: oe.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (T.has(O))
      return;
    let te = lu(Q, oe.path), C = new AbortController(), K = qr(
      o,
      oe.path,
      C.signal
    ), Z = null;
    if (S.has(O))
      S.delete(O), Z = Gr(
        r,
        s,
        K,
        oe.path,
        Q,
        te,
        p,
        a
      );
    else if (q)
      g && (Z = Gr(
        r,
        s,
        K,
        oe.path,
        Q,
        te,
        p,
        a
      ));
    else {
      let re;
      typeof _ == "boolean" ? re = _ : I ? re = !1 : re = g;
      let ce = {
        ...le,
        defaultShouldRevalidate: re
      };
      ss(te, ce) && (Z = Gr(
        r,
        s,
        K,
        oe.path,
        Q,
        te,
        p,
        a,
        ce
      ));
    }
    Z && ge.push({
      key: O,
      routeId: oe.routeId,
      path: oe.path,
      matches: Z,
      match: te,
      request: K,
      controller: C
    });
  }), { dsMatches: me, revalidatingFetchers: ge };
}
function ph(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function Ob(n, a, r) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!ph(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = r != null && r[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
}
function ij(n, a, r) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), o = !n.hasOwnProperty(r.route.id);
  return s || o;
}
function rj(n, a) {
  let r = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function ss(n, a) {
  if (n.route.shouldRevalidate) {
    let r = n.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function Wv(n, a, r, s, o, c) {
  let h;
  if (n) {
    let p = s[n];
    $e(
      p,
      `No route found to patch children into: routeId = ${n}`
    ), p.children || (p.children = []), h = p.children;
  } else
    h = r;
  let m = [], v = [];
  if (a.forEach((p) => {
    let b = h.find(
      (g) => Lb(p, g)
    );
    b ? v.push({ existingRoute: b, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = ds(
      m,
      o,
      [n || "_", "patch", String(h?.length || "0")],
      s
    );
    h.push(...p);
  }
  if (c && v.length > 0)
    for (let p = 0; p < v.length; p++) {
      let { existingRoute: b, newRoute: g } = v[p], S = b, [w] = ds(
        [g],
        o,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(S, {
        element: w.element ? w.element : S.element,
        errorElement: w.errorElement ? w.errorElement : S.errorElement,
        hydrateFallbackElement: w.hydrateFallbackElement ? w.hydrateFallbackElement : S.hydrateFallbackElement
      });
    }
}
function Lb(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (r, s) => a.children?.some((o) => Lb(r, o))
  ) ?? !1 : !1;
}
var ey = /* @__PURE__ */ new WeakMap(), Ub = ({
  key: n,
  route: a,
  manifest: r,
  mapRouteProperties: s
}) => {
  let o = r[a.id];
  if ($e(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let c = o.lazy[n];
  if (!c)
    return;
  let h = ey.get(o);
  h || (h = {}, ey.set(o, h));
  let m = h[n];
  if (m)
    return m;
  let v = (async () => {
    let p = SE(n), g = o[n] !== void 0 && n !== "hasErrorBoundary";
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
}, ty = /* @__PURE__ */ new WeakMap();
function lj(n, a, r, s, o) {
  let c = r[n.id];
  if ($e(c, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let b = ty.get(c);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let g = (async () => {
      $e(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let S = await n.lazy(), w = {};
      for (let j in S) {
        let T = S[j];
        if (T === void 0)
          continue;
        let M = EE(j), L = c[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        M ? Ct(
          !M,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : L ? Ct(
          !L,
          `Route "${c.id}" has a static property "${j}" defined but its lazy function is also returning a value for this property. The lazy route property "${j}" will be ignored.`
        ) : w[j] = T;
      }
      Object.assign(c, w), Object.assign(c, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(c),
        lazy: void 0
      });
    })();
    return ty.set(c, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let h = Object.keys(n.lazy), m = [], v;
  for (let b of h) {
    if (o && o.includes(b))
      continue;
    let g = Ub({
      key: b,
      route: n,
      manifest: r,
      mapRouteProperties: s
    });
    g && (m.push(g), b === a && (v = g));
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
async function ny(n) {
  let a = n.matches.filter((o) => o.shouldLoad), r = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    r[a[c].route.id] = o;
  }), r;
}
async function sj(n) {
  return n.matches.some((a) => a.route.middleware) ? kb(n, () => ny(n)) : ny(n);
}
function kb(n, a) {
  return oj(
    n,
    a,
    (s) => {
      if (Sj(s))
        throw s;
      return s;
    },
    vj,
    r
  );
  function r(s, o, c) {
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
      ), v = mi(
        h,
        h[m].route.id
      ).route.id;
      return Promise.resolve({
        [v]: { type: "error", result: s }
      });
    }
  }
}
async function oj(n, a, r, s, o) {
  let { matches: c, ...h } = n, m = c.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await Vb(
    h,
    m,
    a,
    r,
    s,
    o
  );
}
async function Vb(n, a, r, s, o, c, h = 0) {
  let { request: m } = n;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let v = a[h];
  if (!v)
    return await r();
  let [p, b] = v, g, S = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await Vb(
        n,
        a,
        r,
        s,
        o,
        c,
        h + 1
      ) }, g.value;
    } catch (w) {
      return g = { value: await c(w, p, g) }, g.value;
    }
  };
  try {
    let w = await b(n, S), j = w != null ? s(w) : void 0;
    return o(j) ? j : g ? j ?? g.value : (g = { value: await S() }, g.value);
  } catch (w) {
    return await c(w, p, g);
  }
}
function Bb(n, a, r, s, o) {
  let c = Ub({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), h = lj(
    s.route,
    ln(r.method) ? "action" : "loader",
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
function Bf(n, a, r, s, o, c, h, m, v, p = null, b) {
  let g = !1, S = Bb(
    n,
    a,
    r,
    c,
    h
  );
  return {
    ...c,
    _lazyPromises: S,
    shouldLoad: v,
    shouldRevalidateArgs: p,
    shouldCallHandler(w) {
      return g = !0, p ? typeof b == "boolean" ? ss(c, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof w == "boolean" ? ss(c, {
        ...p,
        defaultShouldRevalidate: w
      }) : ss(c, p) : v;
    },
    resolve(w) {
      let { lazy: j, loader: T, middleware: M } = c.route, N = g || v || w && !ln(r.method) && (j || T), L = M && M.length > 0 && !T && !j;
      return N && (ln(r.method) || !L) ? cj({
        request: r,
        path: s,
        unstable_pattern: o,
        match: c,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: w,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Gr(n, a, r, s, o, c, h, m, v = null) {
  return o.map((p) => p.route.id !== c.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: v,
    shouldCallHandler: () => !1,
    _lazyPromises: Bb(
      n,
      a,
      r,
      p,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Bf(
    n,
    a,
    r,
    s,
    xs(o),
    p,
    h,
    m,
    !0,
    v
  ));
}
async function uj(n, a, r, s, o, c, h) {
  s.some((b) => b._lazyPromises?.middleware) && await Promise.all(s.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: Hb(a, r),
    unstable_pattern: xs(s),
    params: s[0].params,
    context: c,
    matches: s
  }, p = await n({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let g = m;
      return kb(g, () => b({
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
      s.flatMap((b) => [
        b._lazyPromises?.handler,
        b._lazyPromises?.route
      ])
    );
  } catch {
  }
  return p;
}
async function cj({
  request: n,
  path: a,
  unstable_pattern: r,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: h,
  scopedContext: m
}) {
  let v, p, b = ln(n.method), g = b ? "action" : "loader", S = (w) => {
    let j, T = new Promise((L, z) => j = z);
    p = () => j(), n.signal.addEventListener("abort", p);
    let M = (L) => typeof w != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${s.route.id}]`
      )
    ) : w(
      {
        request: n,
        unstable_url: Hb(n, a),
        unstable_pattern: r,
        params: s.params,
        context: m
      },
      ...L !== void 0 ? [L] : []
    ), N = (async () => {
      try {
        return { type: "data", result: await (h ? h((z) => M(z)) : M()) };
      } catch (L) {
        return { type: "error", result: L };
      }
    })();
    return Promise.race([N, T]);
  };
  try {
    let w = b ? s.route.action : s.route.loader;
    if (o || c)
      if (w) {
        let j, [T] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(w).catch((M) => {
            j = M;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          c
        ]);
        if (j !== void 0)
          throw j;
        v = T;
      } else {
        await o;
        let j = b ? s.route.action : s.route.loader;
        if (j)
          [v] = await Promise.all([S(j), c]);
        else if (g === "action") {
          let T = new URL(n.url), M = T.pathname + T.search;
          throw In(405, {
            method: n.method,
            pathname: M,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (w)
      v = await S(w);
    else {
      let j = new URL(n.url), T = j.pathname + j.search;
      throw In(404, {
        pathname: T
      });
    }
  } catch (w) {
    return { type: "error", result: w };
  } finally {
    p && n.signal.removeEventListener("abort", p);
  }
  return v;
}
async function dj(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function fj(n) {
  let { result: a, type: r } = n;
  if (gh(a)) {
    let s;
    try {
      s = await dj(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return r === "error" ? {
      type: "error",
      error: new Tu(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? uy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: gj(a),
    statusCode: fs(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: fs(a) ? a.status : void 0
  } : uy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function hj(n, a, r, s, o) {
  let c = n.headers.get("Location");
  if ($e(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !fh(c)) {
    let h = s.slice(
      0,
      s.findIndex((m) => m.route.id === r) + 1
    );
    c = Vf(
      new URL(a.url),
      h,
      o,
      c
    ), n.headers.set("Location", c);
  }
  return n;
}
var ay = [
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
function iy(n, a, r, s) {
  if (fh(n)) {
    let o = n, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (ay.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let h = Xn(c.pathname, r) != null;
    if (c.origin === a.origin && h)
      return mh(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(n);
    if (ay.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function qr(n, a, r, s) {
  let o = n.createURL(qb(a)).toString(), c = { signal: r };
  if (s && ln(s.formMethod)) {
    let { formMethod: h, formEncType: m } = s;
    c.method = h.toUpperCase(), m === "application/json" ? (c.headers = new Headers({ "Content-Type": m }), c.body = JSON.stringify(s.json)) : m === "text/plain" ? c.body = s.text : m === "application/x-www-form-urlencoded" && s.formData ? c.body = Hf(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function Hb(n, a) {
  let r = new URL(n.url), s = typeof a == "string" ? aa(a) : a;
  if (r.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), c = o.getAll("index");
    o.delete("index");
    for (let h of c.filter(Boolean))
      o.append("index", h);
    r.search = o.size ? `?${o.toString()}` : "";
  } else
    r.search = "";
  return r.hash = s.hash || "", r;
}
function Hf(n) {
  let a = new URLSearchParams();
  for (let [r, s] of n.entries())
    a.append(r, typeof s == "string" ? s : s.name);
  return a;
}
function ry(n) {
  let a = new FormData();
  for (let [r, s] of n.entries())
    a.append(r, s);
  return a;
}
function mj(n, a, r, s = !1, o = !1) {
  let c = {}, h = null, m, v = !1, p = {}, b = r && Rn(r[1]) ? r[1].error : void 0;
  return n.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let S = g.route.id, w = a[S];
    if ($e(
      !Yi(w),
      "Cannot handle redirect results in processLoaderData"
    ), Rn(w)) {
      let j = w.error;
      if (b !== void 0 && (j = b, b = void 0), h = h || {}, o)
        h[S] = j;
      else {
        let T = mi(n, S);
        h[T.route.id] == null && (h[T.route.id] = j);
      }
      s || (c[S] = zb), v || (v = !0, m = fs(w.error) ? w.error.status : 500), w.headers && (p[S] = w.headers);
    } else
      c[S] = w.data, w.statusCode && w.statusCode !== 200 && !v && (m = w.statusCode), w.headers && (p[S] = w.headers);
  }), b !== void 0 && r && (h = { [r[0]]: b }, r[2] && (c[r[2]] = void 0)), {
    loaderData: c,
    errors: h,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function ly(n, a, r, s, o, c) {
  let { loaderData: h, errors: m } = mj(
    a,
    r,
    s
  );
  return o.filter((v) => !v.matches || v.matches.some((p) => p.shouldLoad)).forEach((v) => {
    let { key: p, match: b, controller: g } = v;
    if (g && g.signal.aborted)
      return;
    let S = c[p];
    if ($e(S, "Did not find corresponding fetcher result"), Rn(S)) {
      let w = mi(n.matches, b?.route.id);
      m && m[w.route.id] || (m = {
        ...m,
        [w.route.id]: S.error
      }), n.fetchers.delete(p);
    } else if (Yi(S))
      $e(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = Oa(S.data);
      n.fetchers.set(p, w);
    }
  }), { loaderData: h, errors: m };
}
function sy(n, a, r, s) {
  let o = Object.entries(a).filter(([, c]) => c !== zb).reduce((c, [h, m]) => (c[h] = m, c), {});
  for (let c of r) {
    let h = c.route.id;
    if (!a.hasOwnProperty(h) && n.hasOwnProperty(h) && c.route.loader && (o[h] = n[h]), s && s.hasOwnProperty(h))
      break;
  }
  return o;
}
function oy(n) {
  return n ? Rn(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function mi(n, a) {
  return (a ? n.slice(0, n.findIndex((s) => s.route.id === a) + 1) : [...n]).reverse().find((s) => s.route.hasErrorBoundary === !0) || n[0];
}
function $o(n) {
  let a = n.length === 1 ? n[0] : n.find((r) => r.index || !r.path || r.path === "/") || {
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
function In(n, {
  pathname: a,
  routeId: r,
  method: s,
  type: o,
  message: c
} = {}) {
  let h = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return n === 400 ? (h = "Bad Request", s && a && r ? m = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : n === 403 ? (h = "Forbidden", m = `Route "${r}" does not match URL "${a}"`) : n === 404 ? (h = "Not Found", m = `No route matches URL "${a}"`) : n === 405 && (h = "Method Not Allowed", s && a && r ? m = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : s && (m = `Invalid request method "${s.toUpperCase()}"`)), new Tu(
    n || 500,
    h,
    new Error(m),
    !0
  );
}
function Io(n) {
  let a = Object.entries(n);
  for (let r = a.length - 1; r >= 0; r--) {
    let [s, o] = a[r];
    if (Yi(o))
      return { key: s, result: o };
  }
}
function qb(n) {
  let a = typeof n == "string" ? aa(n) : n;
  return ha({ ...a, hash: "" });
}
function pj(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function gj(n) {
  return new Tu(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function vj(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, r]) => typeof a == "string" && yj(r)
  );
}
function yj(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function bj(n) {
  return gh(n.result) && _b.has(n.result.status);
}
function Rn(n) {
  return n.type === "error";
}
function Yi(n) {
  return (n && n.type) === "redirect";
}
function uy(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function gh(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function xj(n) {
  return _b.has(n);
}
function Sj(n) {
  return gh(n) && xj(n.status) && n.headers.has("Location");
}
function wj(n) {
  return JE.has(n.toUpperCase());
}
function ln(n) {
  return PE.has(n.toUpperCase());
}
function vh(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function lu(n, a) {
  let r = typeof a == "string" ? aa(a).search : a.search;
  if (n[n.length - 1].route.index && vh(r || ""))
    return n[n.length - 1];
  let s = Nb(n);
  return s[s.length - 1];
}
function cy(n) {
  let { formMethod: a, formAction: r, formEncType: s, text: o, formData: c, json: h } = n;
  if (!(!a || !r || !s)) {
    if (o != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: s,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (c != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: s,
        formData: c,
        json: void 0,
        text: void 0
      };
    if (h !== void 0)
      return {
        formMethod: a,
        formAction: r,
        formEncType: s,
        formData: void 0,
        json: h,
        text: void 0
      };
  }
}
function Wd(n, a) {
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
function Ej(n, a) {
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
function Kl(n, a) {
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
function jj(n, a) {
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
function Oa(n) {
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
function Tj(n, a) {
  try {
    let r = n.sessionStorage.getItem(
      Db
    );
    if (r) {
      let s = JSON.parse(r);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function Nj(n, a) {
  if (a.size > 0) {
    let r = {};
    for (let [s, o] of a)
      r[s] = [...o];
    try {
      n.sessionStorage.setItem(
        Db,
        JSON.stringify(r)
      );
    } catch (s) {
      Ct(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function dy() {
  let n, a, r = new Promise((s, o) => {
    n = async (c) => {
      s(c);
      try {
        await r;
      } catch {
      }
    }, a = async (c) => {
      o(c);
      try {
        await r;
      } catch {
      }
    };
  });
  return {
    promise: r,
    //@ts-ignore
    resolve: n,
    //@ts-ignore
    reject: a
  };
}
var Zi = x.createContext(null);
Zi.displayName = "DataRouter";
var Ss = x.createContext(null);
Ss.displayName = "DataRouterState";
var $b = x.createContext(!1);
function Ib() {
  return x.useContext($b);
}
var yh = x.createContext({
  isTransitioning: !1
});
yh.displayName = "ViewTransition";
var Fb = x.createContext(
  /* @__PURE__ */ new Map()
);
Fb.displayName = "Fetchers";
var Cj = x.createContext(null);
Cj.displayName = "Await";
var Kn = x.createContext(
  null
);
Kn.displayName = "Navigation";
var Nu = x.createContext(
  null
);
Nu.displayName = "Location";
var ka = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ka.displayName = "Route";
var bh = x.createContext(null);
bh.displayName = "RouteError";
var Yb = "REACT_ROUTER_ERROR", Mj = "REDIRECT", Rj = "ROUTE_ERROR_RESPONSE";
function Aj(n) {
  if (n.startsWith(`${Yb}:${Mj}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function _j(n) {
  if (n.startsWith(
    `${Yb}:${Rj}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Tu(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function Dj(n, { relative: a } = {}) {
  $e(
    ws(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: s } = x.useContext(Kn), { hash: o, pathname: c, search: h } = Es(n, { relative: a }), m = c;
  return r !== "/" && (m = c === "/" ? r : Fn([r, c])), s.createHref({ pathname: m, search: h, hash: o });
}
function ws() {
  return x.useContext(Nu) != null;
}
function Va() {
  return $e(
    ws(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(Nu).location;
}
var Gb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Xb(n) {
  x.useContext(Kn).static || x.useLayoutEffect(n);
}
function Zr() {
  let { isDataRoute: n } = x.useContext(ka);
  return n ? Fj() : zj();
}
function zj() {
  $e(
    ws(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = x.useContext(Zi), { basename: a, navigator: r } = x.useContext(Kn), { matches: s } = x.useContext(ka), { pathname: o } = Va(), c = JSON.stringify(hh(s)), h = x.useRef(!1);
  return Xb(() => {
    h.current = !0;
  }), x.useCallback(
    (v, p = {}) => {
      if (Ct(h.current, Gb), !h.current) return;
      if (typeof v == "number") {
        r.go(v);
        return;
      }
      let b = ju(
        v,
        JSON.parse(c),
        o,
        p.relative === "path"
      );
      n == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : Fn([a, b.pathname])), (p.replace ? r.replace : r.push)(
        b,
        p.state,
        p
      );
    },
    [
      a,
      r,
      c,
      o,
      n
    ]
  );
}
x.createContext(null);
function Es(n, { relative: a } = {}) {
  let { matches: r } = x.useContext(ka), { pathname: s } = Va(), o = JSON.stringify(hh(r));
  return x.useMemo(
    () => ju(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function Oj(n, a, r) {
  $e(
    ws(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = x.useContext(Kn), { matches: o } = x.useContext(ka), c = o[o.length - 1], h = c ? c.params : {}, m = c ? c.pathname : "/", v = c ? c.pathnameBase : "/", p = c && c.route;
  {
    let M = p && p.path || "";
    Pb(
      m,
      !p || M.endsWith("*") || M.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${M}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${M}"> to <Route path="${M === "/" ? "*" : `${M}/*`}">.`
    );
  }
  let b = Va(), g;
  g = b;
  let S = g.pathname || "/", w = S;
  if (v !== "/") {
    let M = v.replace(/^\//, "").split("/");
    w = "/" + S.replace(/^\//, "").split("/").slice(M.length).join("/");
  }
  let j = hi(n, { pathname: w });
  return Ct(
    p || j != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), Ct(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), Bj(
    j && j.map(
      (M) => Object.assign({}, M, {
        params: Object.assign({}, h, M.params),
        pathname: Fn([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            M.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : M.pathname
        ]),
        pathnameBase: M.pathnameBase === "/" ? v : Fn([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            M.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : M.pathnameBase
        ])
      })
    ),
    o,
    r
  );
}
function Lj() {
  let n = Ij(), a = fs(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), r = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), h = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ x.createElement("pre", { style: o }, r) : null, h);
}
var Uj = /* @__PURE__ */ x.createElement(Lj, null), Kb = class extends x.Component {
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
      const r = _j(n.digest);
      r && (n = r);
    }
    let a = n !== void 0 ? /* @__PURE__ */ x.createElement(ka.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      bh.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ x.createElement(kj, { error: n }, a) : a;
  }
};
Kb.contextType = $b;
var ef = /* @__PURE__ */ new WeakMap();
function kj({
  children: n,
  error: a
}) {
  let { basename: r } = x.useContext(Kn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = Aj(a.digest);
    if (s) {
      let o = ef.get(a);
      if (o) throw o;
      let c = Mb(s.location, r);
      if (Cb && !ef.get(a))
        if (c.isExternal || s.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(c.to, {
              replace: s.replace
            })
          );
          throw ef.set(a, h), h;
        }
      return /* @__PURE__ */ x.createElement(
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
function Vj({ routeContext: n, match: a, children: r }) {
  let s = x.useContext(Zi);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ x.createElement(ka.Provider, { value: n }, r);
}
function Bj(n, a = [], r) {
  let s = r?.state;
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
    let b = o.findIndex(
      (g) => g.route.id && c?.[g.route.id] !== void 0
    );
    $e(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        c
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, b + 1)
    );
  }
  let h = !1, m = -1;
  if (r && s) {
    h = s.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let g = o[b];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (m = b), g.route.id) {
        let { loaderData: S, errors: w } = s, j = g.route.loader && !S.hasOwnProperty(g.route.id) && (!w || w[g.route.id] === void 0);
        if (g.route.lazy || j) {
          r.isStatic && (h = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let v = r?.onError, p = s && v ? (b, g) => {
    v(b, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: xs(s.matches),
      errorInfo: g
    });
  } : void 0;
  return o.reduceRight(
    (b, g, S) => {
      let w, j = !1, T = null, M = null;
      s && (w = c && g.route.id ? c[g.route.id] : void 0, T = g.route.errorElement || Uj, h && (m < 0 && S === 0 ? (Pb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, M = null) : m === S && (j = !0, M = g.route.hydrateFallbackElement || null)));
      let N = a.concat(o.slice(0, S + 1)), L = () => {
        let z;
        return w ? z = T : j ? z = M : g.route.Component ? z = /* @__PURE__ */ x.createElement(g.route.Component, null) : g.route.element ? z = g.route.element : z = b, /* @__PURE__ */ x.createElement(
          Vj,
          {
            match: g,
            routeContext: {
              outlet: b,
              matches: N,
              isDataRoute: s != null
            },
            children: z
          }
        );
      };
      return s && (g.route.ErrorBoundary || g.route.errorElement || S === 0) ? /* @__PURE__ */ x.createElement(
        Kb,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: T,
          error: w,
          children: L(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 },
          onError: p
        }
      ) : L();
    },
    null
  );
}
function xh(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Hj(n) {
  let a = x.useContext(Zi);
  return $e(a, xh(n)), a;
}
function Qb(n) {
  let a = x.useContext(Ss);
  return $e(a, xh(n)), a;
}
function qj(n) {
  let a = x.useContext(ka);
  return $e(a, xh(n)), a;
}
function Cu(n) {
  let a = qj(n), r = a.matches[a.matches.length - 1];
  return $e(
    r.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function $j() {
  return Cu(
    "useRouteId"
    /* UseRouteId */
  );
}
function js() {
  let n = Qb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Cu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function Ij() {
  let n = x.useContext(bh), a = Qb(
    "useRouteError"
    /* UseRouteError */
  ), r = Cu(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[r];
}
function Fj() {
  let { router: n } = Hj(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Cu(
    "useNavigate"
    /* UseNavigateStable */
  ), r = x.useRef(!1);
  return Xb(() => {
    r.current = !0;
  }), x.useCallback(
    async (o, c = {}) => {
      Ct(r.current, Gb), r.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...c }));
    },
    [n, a]
  );
}
var fy = {};
function Pb(n, a, r) {
  !a && !fy[n] && (fy[n] = !0, Ct(!1, r));
}
var hy = {};
function my(n, a) {
  !n && !hy[a] && (hy[a] = !0, console.warn(a));
}
var Yj = "useOptimistic", py = oE[Yj], Gj = () => {
};
function Xj(n) {
  return py ? py(n) : [n, Gj];
}
function Kj(n) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && Ct(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: x.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && Ct(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: x.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && Ct(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: x.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var Qj = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function Pj(n, a) {
  return nj({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: vE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: Qj,
    mapRouteProperties: Kj,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var Zj = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((n, a) => {
      this.resolve = (r) => {
        this.status === "pending" && (this.status = "resolved", n(r));
      }, this.reject = (r) => {
        this.status === "pending" && (this.status = "rejected", a(r));
      };
    });
  }
};
function Jj({
  router: n,
  flushSync: a,
  onError: r,
  unstable_useTransitions: s
}) {
  s = Ib() || s;
  let [c, h] = x.useState(n.state), [m, v] = Xj(c), [p, b] = x.useState(), [g, S] = x.useState({
    isTransitioning: !1
  }), [w, j] = x.useState(), [T, M] = x.useState(), [N, L] = x.useState(), z = x.useRef(/* @__PURE__ */ new Map()), _ = x.useCallback(
    (U, { deletedFetchers: I, newErrors: le, flushSync: ae, viewTransitionOpts: me }) => {
      le && r && Object.values(le).forEach(
        (oe) => r(oe, {
          location: U.location,
          params: U.matches[0]?.params ?? {},
          unstable_pattern: xs(U.matches)
        })
      ), U.fetchers.forEach((oe, O) => {
        oe.data !== void 0 && z.current.set(O, oe.data);
      }), I.forEach((oe) => z.current.delete(oe)), my(
        ae === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ge = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (my(
        me == null || ge,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !me || !ge) {
        a && ae ? a(() => h(U)) : s === !1 ? h(U) : x.startTransition(() => {
          s === !0 && v((oe) => gy(oe, U)), h(U);
        });
        return;
      }
      if (a && ae) {
        a(() => {
          T && (w?.resolve(), T.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: me.currentLocation,
            nextLocation: me.nextLocation
          });
        });
        let oe = n.window.document.startViewTransition(() => {
          a(() => h(U));
        });
        oe.finished.finally(() => {
          a(() => {
            j(void 0), M(void 0), b(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => M(oe));
        return;
      }
      T ? (w?.resolve(), T.skipTransition(), L({
        state: U,
        currentLocation: me.currentLocation,
        nextLocation: me.nextLocation
      })) : (b(U), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: me.currentLocation,
        nextLocation: me.nextLocation
      }));
    },
    [
      n.window,
      a,
      T,
      w,
      s,
      v,
      r
    ]
  );
  x.useLayoutEffect(() => n.subscribe(_), [n, _]);
  let J = m.initialized;
  x.useLayoutEffect(() => {
    !J && n.state.initialized && _(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [J, _, n.state]), x.useEffect(() => {
    g.isTransitioning && !g.flushSync && j(new Zj());
  }, [g]), x.useEffect(() => {
    if (w && p && n.window) {
      let U = p, I = w.promise, le = n.window.document.startViewTransition(async () => {
        s === !1 ? h(U) : x.startTransition(() => {
          s === !0 && v((ae) => gy(ae, U)), h(U);
        }), await I;
      });
      le.finished.finally(() => {
        j(void 0), M(void 0), b(void 0), S({ isTransitioning: !1 });
      }), M(le);
    }
  }, [
    p,
    w,
    n.window,
    s,
    v
  ]), x.useEffect(() => {
    w && p && m.location.key === p.location.key && w.resolve();
  }, [w, T, m.location, p]), x.useEffect(() => {
    !g.isTransitioning && N && (b(N.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: N.currentLocation,
      nextLocation: N.nextLocation
    }), L(void 0));
  }, [g.isTransitioning, N]);
  let G = x.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (U) => n.navigate(U),
    push: (U, I, le) => n.navigate(U, {
      state: I,
      preventScrollReset: le?.preventScrollReset
    }),
    replace: (U, I, le) => n.navigate(U, {
      replace: !0,
      state: I,
      preventScrollReset: le?.preventScrollReset
    })
  }), [n]), W = n.basename || "/", A = x.useMemo(
    () => ({
      router: n,
      navigator: G,
      static: !1,
      basename: W,
      onError: r
    }),
    [n, G, W, r]
  );
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(Zi.Provider, { value: A }, /* @__PURE__ */ x.createElement(Ss.Provider, { value: m }, /* @__PURE__ */ x.createElement(Fb.Provider, { value: z.current }, /* @__PURE__ */ x.createElement(yh.Provider, { value: g }, /* @__PURE__ */ x.createElement(
    tT,
    {
      basename: W,
      location: m.location,
      navigationType: m.historyAction,
      navigator: G,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ x.createElement(
      Wj,
      {
        routes: n.routes,
        future: n.future,
        state: m,
        isStatic: !1,
        onError: r
      }
    )
  ))))), null);
}
function gy(n, a) {
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
var Wj = x.memo(eT);
function eT({
  routes: n,
  future: a,
  state: r,
  isStatic: s,
  onError: o
}) {
  return Oj(n, void 0, { state: r, isStatic: s, onError: o });
}
function tT({
  basename: n = "/",
  children: a = null,
  location: r,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: h
}) {
  $e(
    !ws(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = n.replace(/^\/*/, "/"), v = x.useMemo(
    () => ({
      basename: m,
      navigator: o,
      static: c,
      unstable_useTransitions: h,
      future: {}
    }),
    [m, o, c, h]
  );
  typeof r == "string" && (r = aa(r));
  let {
    pathname: p = "/",
    search: b = "",
    hash: g = "",
    state: S = null,
    key: w = "default",
    unstable_mask: j
  } = r, T = x.useMemo(() => {
    let M = Xn(p, m);
    return M == null ? null : {
      location: {
        pathname: M,
        search: b,
        hash: g,
        state: S,
        key: w,
        unstable_mask: j
      },
      navigationType: s
    };
  }, [
    m,
    p,
    b,
    g,
    S,
    w,
    s,
    j
  ]);
  return Ct(
    T != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), T == null ? null : /* @__PURE__ */ x.createElement(Kn.Provider, { value: v }, /* @__PURE__ */ x.createElement(Nu.Provider, { children: a, value: T }));
}
var su = "get", ou = "application/x-www-form-urlencoded";
function Mu(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function nT(n) {
  return Mu(n) && n.tagName.toLowerCase() === "button";
}
function aT(n) {
  return Mu(n) && n.tagName.toLowerCase() === "form";
}
function iT(n) {
  return Mu(n) && n.tagName.toLowerCase() === "input";
}
function rT(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function lT(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !rT(n);
}
var Fo = null;
function sT() {
  if (Fo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Fo = !1;
    } catch {
      Fo = !0;
    }
  return Fo;
}
var oT = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function tf(n) {
  return n != null && !oT.has(n) ? (Ct(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ou}"`
  ), null) : n;
}
function uT(n, a) {
  let r, s, o, c, h;
  if (aT(n)) {
    let m = n.getAttribute("action");
    s = m ? Xn(m, a) : null, r = n.getAttribute("method") || su, o = tf(n.getAttribute("enctype")) || ou, c = new FormData(n);
  } else if (nT(n) || iT(n) && (n.type === "submit" || n.type === "image")) {
    let m = n.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let v = n.getAttribute("formaction") || m.getAttribute("action");
    if (s = v ? Xn(v, a) : null, r = n.getAttribute("formmethod") || m.getAttribute("method") || su, o = tf(n.getAttribute("formenctype")) || tf(m.getAttribute("enctype")) || ou, c = new FormData(m, n), !sT()) {
      let { name: p, type: b, value: g } = n;
      if (b === "image") {
        let S = p ? `${p}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else p && c.append(p, g);
    }
  } else {
    if (Mu(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = su, s = null, o = ou, h = n;
  }
  return c && o === "text/plain" && (h = c, c = void 0), { action: s, method: r.toLowerCase(), encType: o, formData: c, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Sh(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function Zb(n, a, r, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return r ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && Xn(o.pathname, a) === "/" ? o.pathname = `${mu(a)}/_root.${s}` : o.pathname = `${mu(o.pathname)}.${s}`, o;
}
async function cT(n, a) {
  if (n.id in a)
    return a[n.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      n.module
    );
    return a[n.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${n.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function dT(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function fT(n, a, r) {
  let s = await Promise.all(
    n.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let h = await cT(c, r);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return gT(
    s.flat(1).filter(dT).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function vy(n, a, r, s, o, c) {
  let h = (v, p) => r[p] ? v.route.id !== r[p].route.id : !0, m = (v, p) => (
    // param change, /users/123 -> /users/456
    r[p].pathname !== v.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[p].route.path?.endsWith("*") && r[p].params["*"] !== v.params["*"]
  );
  return c === "assets" ? a.filter(
    (v, p) => h(v, p) || m(v, p)
  ) : c === "data" ? a.filter((v, p) => {
    let b = s.routes[v.route.id];
    if (!b || !b.hasLoader)
      return !1;
    if (h(v, p) || m(v, p))
      return !0;
    if (v.route.shouldRevalidate) {
      let g = v.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
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
function hT(n, a, { includeHydrateFallback: r } = {}) {
  return mT(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), r && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function mT(n) {
  return [...new Set(n)];
}
function pT(n) {
  let a = {}, r = Object.keys(n).sort();
  for (let s of r)
    a[s] = n[s];
  return a;
}
function gT(n, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let c = JSON.stringify(pT(o));
    return r.has(c) || (r.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function wh() {
  let n = x.useContext(Zi);
  return Sh(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function vT() {
  let n = x.useContext(Ss);
  return Sh(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var Eh = x.createContext(void 0);
Eh.displayName = "FrameworkContext";
function jh() {
  let n = x.useContext(Eh);
  return Sh(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function yT(n, a) {
  let r = x.useContext(Eh), [s, o] = x.useState(!1), [c, h] = x.useState(!1), { onFocus: m, onBlur: v, onMouseEnter: p, onMouseLeave: b, onTouchStart: g } = a, S = x.useRef(null);
  x.useEffect(() => {
    if (n === "render" && h(!0), n === "viewport") {
      let T = (N) => {
        N.forEach((L) => {
          h(L.isIntersecting);
        });
      }, M = new IntersectionObserver(T, { threshold: 0.5 });
      return S.current && M.observe(S.current), () => {
        M.disconnect();
      };
    }
  }, [n]), x.useEffect(() => {
    if (s) {
      let T = setTimeout(() => {
        h(!0);
      }, 100);
      return () => {
        clearTimeout(T);
      };
    }
  }, [s]);
  let w = () => {
    o(!0);
  }, j = () => {
    o(!1), h(!1);
  };
  return r ? n !== "intent" ? [c, S, {}] : [
    c,
    S,
    {
      onFocus: Ql(m, w),
      onBlur: Ql(v, j),
      onMouseEnter: Ql(p, w),
      onMouseLeave: Ql(b, j),
      onTouchStart: Ql(g, w)
    }
  ] : [!1, S, {}];
}
function Ql(n, a) {
  return (r) => {
    n && n(r), r.defaultPrevented || a(r);
  };
}
function bT({ page: n, ...a }) {
  let r = Ib(), { router: s } = wh(), o = x.useMemo(
    () => hi(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? r ? /* @__PURE__ */ x.createElement(ST, { page: n, matches: o, ...a }) : /* @__PURE__ */ x.createElement(wT, { page: n, matches: o, ...a }) : null;
}
function xT(n) {
  let { manifest: a, routeModules: r } = jh(), [s, o] = x.useState([]);
  return x.useEffect(() => {
    let c = !1;
    return fT(n, a, r).then(
      (h) => {
        c || o(h);
      }
    ), () => {
      c = !0;
    };
  }, [n, a, r]), s;
}
function ST({
  page: n,
  matches: a,
  ...r
}) {
  let s = Va(), { future: o } = jh(), { basename: c } = wh(), h = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let m = Zb(
      n,
      c,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), v = !1, p = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? v = !0 : p.push(b.route.id);
    return v && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    c,
    o.unstable_trailingSlashAwareDataRequests,
    n,
    s,
    a
  ]);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, h.map((m) => /* @__PURE__ */ x.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...r })));
}
function wT({
  page: n,
  matches: a,
  ...r
}) {
  let s = Va(), { future: o, manifest: c, routeModules: h } = jh(), { basename: m } = wh(), { loaderData: v, matches: p } = vT(), b = x.useMemo(
    () => vy(
      n,
      a,
      p,
      c,
      s,
      "data"
    ),
    [n, a, p, c, s]
  ), g = x.useMemo(
    () => vy(
      n,
      a,
      p,
      c,
      s,
      "assets"
    ),
    [n, a, p, c, s]
  ), S = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let T = /* @__PURE__ */ new Set(), M = !1;
    if (a.forEach((L) => {
      let z = c.routes[L.route.id];
      !z || !z.hasLoader || (!b.some((_) => _.route.id === L.route.id) && L.route.id in v && h[L.route.id]?.shouldRevalidate || z.hasClientLoader ? M = !0 : T.add(L.route.id));
    }), T.size === 0)
      return [];
    let N = Zb(
      n,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return M && T.size > 0 && N.searchParams.set(
      "_routes",
      a.filter((L) => T.has(L.route.id)).map((L) => L.route.id).join(",")
    ), [N.pathname + N.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    v,
    s,
    c,
    b,
    a,
    n,
    h
  ]), w = x.useMemo(
    () => hT(g, c),
    [g, c]
  ), j = xT(g);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, S.map((T) => /* @__PURE__ */ x.createElement("link", { key: T, rel: "prefetch", as: "fetch", href: T, ...r })), w.map((T) => /* @__PURE__ */ x.createElement("link", { key: T, rel: "modulepreload", href: T, ...r })), j.map(({ key: T, link: M }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement(
      "link",
      {
        key: T,
        nonce: r.nonce,
        ...M,
        crossOrigin: M.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function ET(...n) {
  return (a) => {
    n.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var jT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  jT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Jb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Ru = x.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: c,
    replace: h,
    unstable_mask: m,
    state: v,
    target: p,
    to: b,
    preventScrollReset: g,
    viewTransition: S,
    unstable_defaultShouldRevalidate: w,
    ...j
  }, T) {
    let { basename: M, navigator: N, unstable_useTransitions: L } = x.useContext(Kn), z = typeof b == "string" && Jb.test(b), _ = Mb(b, M);
    b = _.to;
    let J = Dj(b, { relative: o }), G = Va(), W = null;
    if (m) {
      let oe = ju(
        m,
        [],
        G.unstable_mask ? G.unstable_mask.pathname : "/",
        !0
      );
      M !== "/" && (oe.pathname = oe.pathname === "/" ? M : Fn([M, oe.pathname])), W = N.createHref(oe);
    }
    let [A, U, I] = yT(
      s,
      j
    ), le = MT(b, {
      replace: h,
      unstable_mask: m,
      state: v,
      target: p,
      preventScrollReset: g,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: w,
      unstable_useTransitions: L
    });
    function ae(oe) {
      a && a(oe), oe.defaultPrevented || le(oe);
    }
    let me = !(_.isExternal || c), ge = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...j,
          ...I,
          href: (me ? W : void 0) || _.absoluteURL || J,
          onClick: me ? ae : a,
          ref: ET(T, U),
          target: p,
          "data-discover": !z && r === "render" ? "true" : void 0
        }
      )
    );
    return A && !z ? /* @__PURE__ */ x.createElement(x.Fragment, null, ge, /* @__PURE__ */ x.createElement(bT, { page: J })) : ge;
  }
);
Ru.displayName = "Link";
var TT = x.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: s = "",
    end: o = !1,
    style: c,
    to: h,
    viewTransition: m,
    children: v,
    ...p
  }, b) {
    let g = Es(h, { relative: p.relative }), S = Va(), w = x.useContext(Ss), { navigator: j, basename: T } = x.useContext(Kn), M = w != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    zT(g) && m === !0, N = j.encodeLocation ? j.encodeLocation(g).pathname : g.pathname, L = S.pathname, z = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
    r || (L = L.toLowerCase(), z = z ? z.toLowerCase() : null, N = N.toLowerCase()), z && T && (z = Xn(z, T) || z);
    const _ = N !== "/" && N.endsWith("/") ? N.length - 1 : N.length;
    let J = L === N || !o && L.startsWith(N) && L.charAt(_) === "/", G = z != null && (z === N || !o && z.startsWith(N) && z.charAt(N.length) === "/"), W = {
      isActive: J,
      isPending: G,
      isTransitioning: M
    }, A = J ? a : void 0, U;
    typeof s == "function" ? U = s(W) : U = [
      s,
      J ? "active" : null,
      G ? "pending" : null,
      M ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let I = typeof c == "function" ? c(W) : c;
    return /* @__PURE__ */ x.createElement(
      Ru,
      {
        ...p,
        "aria-current": A,
        className: U,
        ref: b,
        style: I,
        to: h,
        viewTransition: m
      },
      typeof v == "function" ? v(W) : v
    );
  }
);
TT.displayName = "NavLink";
var NT = x.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: s,
    replace: o,
    state: c,
    method: h = su,
    action: m,
    onSubmit: v,
    relative: p,
    preventScrollReset: b,
    viewTransition: g,
    unstable_defaultShouldRevalidate: S,
    ...w
  }, j) => {
    let { unstable_useTransitions: T } = x.useContext(Kn), M = _T(), N = DT(m, { relative: p }), L = h.toLowerCase() === "get" ? "get" : "post", z = typeof m == "string" && Jb.test(m), _ = (J) => {
      if (v && v(J), J.defaultPrevented) return;
      J.preventDefault();
      let G = J.nativeEvent.submitter, W = G?.getAttribute("formmethod") || h, A = () => M(G || J.currentTarget, {
        fetcherKey: a,
        method: W,
        navigate: r,
        replace: o,
        state: c,
        relative: p,
        preventScrollReset: b,
        viewTransition: g,
        unstable_defaultShouldRevalidate: S
      });
      T && r !== !1 ? x.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: j,
        method: L,
        action: N,
        onSubmit: s ? v : _,
        ...w,
        "data-discover": !z && n === "render" ? "true" : void 0
      }
    );
  }
);
NT.displayName = "Form";
function CT(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Wb(n) {
  let a = x.useContext(Zi);
  return $e(a, CT(n)), a;
}
function MT(n, {
  target: a,
  replace: r,
  unstable_mask: s,
  state: o,
  preventScrollReset: c,
  relative: h,
  viewTransition: m,
  unstable_defaultShouldRevalidate: v,
  unstable_useTransitions: p
} = {}) {
  let b = Zr(), g = Va(), S = Es(n, { relative: h });
  return x.useCallback(
    (w) => {
      if (lT(w, a)) {
        w.preventDefault();
        let j = r !== void 0 ? r : ha(g) === ha(S), T = () => b(n, {
          replace: j,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: h,
          viewTransition: m,
          unstable_defaultShouldRevalidate: v
        });
        p ? x.startTransition(() => T()) : T();
      }
    },
    [
      g,
      b,
      S,
      r,
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
var RT = 0, AT = () => `__${String(++RT)}__`;
function _T() {
  let { router: n } = Wb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = x.useContext(Kn), r = $j(), s = n.fetch, o = n.navigate;
  return x.useCallback(
    async (c, h = {}) => {
      let { action: m, method: v, encType: p, formData: b, body: g } = uT(
        c,
        a
      );
      if (h.navigate === !1) {
        let S = h.fetcherKey || AT();
        await s(S, r, h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: g,
          formMethod: h.method || v,
          formEncType: h.encType || p,
          flushSync: h.flushSync
        });
      } else
        await o(h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: g,
          formMethod: h.method || v,
          formEncType: h.encType || p,
          replace: h.replace,
          state: h.state,
          fromRouteId: r,
          flushSync: h.flushSync,
          viewTransition: h.viewTransition
        });
    },
    [s, o, a, r]
  );
}
function DT(n, { relative: a } = {}) {
  let { basename: r } = x.useContext(Kn), s = x.useContext(ka);
  $e(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...Es(n || ".", { relative: a }) }, h = Va();
  if (n == null) {
    c.search = h.search;
    let m = new URLSearchParams(c.search), v = m.getAll("index");
    if (v.some((b) => b === "")) {
      m.delete("index"), v.filter((g) => g).forEach((g) => m.append("index", g));
      let b = m.toString();
      c.search = b ? `?${b}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (c.pathname = c.pathname === "/" ? r : Fn([r, c.pathname])), ha(c);
}
function zT(n, { relative: a } = {}) {
  let r = x.useContext(yh);
  $e(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Wb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = Es(n, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let c = Xn(r.currentLocation.pathname, s) || r.currentLocation.pathname, h = Xn(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return hu(o.pathname, h) != null || hu(o.pathname, c) != null;
}
class Jr extends Error {
  constructor(a, r, s, o) {
    super(s), this.status = a, this.category = r, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const xi = "/api/v1/extensions/nexus.audio.emotiontts";
async function vt(n, a) {
  const r = n.startsWith("http") ? n : `${xi}${n}`, s = await fetch(r, {
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
    throw new Jr(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function OT(n, a, r) {
  const s = n.startsWith("http") ? n : `${xi}${n}`, o = new EventSource(s);
  return o.onmessage = (c) => {
    if (c.data)
      try {
        a(JSON.parse(c.data));
      } catch {
      }
  }, o.onerror = (c) => {
    r?.(c);
  }, () => o.close();
}
async function LT() {
  return vt("/deployments");
}
async function yy(n) {
  return vt(`/deployments/${n}`);
}
async function UT(n, a) {
  return vt(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function by(n) {
  return vt(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function Th(n, a) {
  return vt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function os(n, a, r) {
  return vt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(r)
    }
  );
}
async function ex(n, a) {
  await vt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function kT(n) {
  return vt(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function VT(n, a, r = "error") {
  return vt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: r })
  });
}
async function BT(n, a = {}) {
  const r = new URLSearchParams();
  a.limit && r.set("limit", String(a.limit)), a.status && r.set("status", a.status);
  const s = r.toString(), o = s ? `?${s}` : "";
  return vt(`/deployments/${n}/runs${o}`);
}
async function HT(n, a) {
  return vt(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function Nh(n, a) {
  return vt(`/deployments/${n}/runs/${a}`);
}
async function qT(n, a) {
  return vt(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function tx(n, a) {
  return vt(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function $T(n, a) {
  return vt(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function xy(n, a, r, s) {
  return OT(
    `/deployments/${n}/runs/${a}/progress`,
    r,
    s
  );
}
async function hs(n) {
  return vt(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function nx(n, a, r, s, o) {
  const c = new FormData();
  c.append("deploymentId", n), c.append("displayName", r), c.append("kind", s), c.append("audio", a);
  const h = await fetch(`${xi}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function IT(n) {
  return vt(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var FT = "mux0i60", YT = "mux0i61", GT = "mux0i62", XT = "mux0i63";
function Ts({ count: n = "0", title: a, hint: r }) {
  return /* @__PURE__ */ f.jsxs("div", { className: FT, children: [
    /* @__PURE__ */ f.jsx("span", { className: YT, "aria-hidden": "true", children: n }),
    /* @__PURE__ */ f.jsx("h3", { className: GT, children: a }),
    r ? /* @__PURE__ */ f.jsx("p", { className: XT, children: r }) : null
  ] });
}
var KT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, QT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, PT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, ZT = "zwn3019";
function La({
  tone: n = "raised",
  density: a = "comfortable",
  elevation: r = "subtle",
  as: s = "section",
  children: o,
  className: c,
  style: h,
  ...m
}) {
  const v = [KT[n], PT[a], QT[r], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx(s, { className: v, style: h, "data-elevation": r, ...m, children: o });
}
function JT({ children: n, className: a }) {
  const r = [ZT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("div", { className: r, children: n });
}
var Ki = "vrkn5p0", WT = "_93p6291", eN = "_93p6292", tN = "_93p6293", nN = "_93p6294", aN = "_93p6295", iN = "_93p6296", rN = "_93p6297", lN = "_93p6298", sN = "_93p6299", oN = "_93p629a", uN = "_93p629b", cN = "_93p629c", dN = "_93p629d", fN = "_93p629e";
function hN() {
  const { deployments: n } = js(), a = n.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ f.jsxs("main", { className: WT, children: [
    /* @__PURE__ */ f.jsxs("header", { className: eN, children: [
      /* @__PURE__ */ f.jsx("p", { className: tN, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ f.jsxs("h1", { className: nN, children: [
        "Direct your characters.",
        /* @__PURE__ */ f.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ f.jsx("p", { className: aN, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ f.jsxs("p", { className: iN, children: [
        /* @__PURE__ */ f.jsx("span", { className: rN, children: n.length }),
        /* @__PURE__ */ f.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs(
      La,
      {
        density: "airy",
        elevation: "raised",
        className: lN,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ f.jsx("h2", { id: "deployments-section-list", className: Ki, children: "01 / Deployments" }),
          n.length === 0 ? /* @__PURE__ */ f.jsx(
            Ts,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ f.jsx("ul", { className: sN, children: n.map((r) => /* @__PURE__ */ f.jsx("li", { children: /* @__PURE__ */ f.jsxs(Ru, { to: `/${r.deploymentId}/recipe`, className: oN, children: [
            /* @__PURE__ */ f.jsx("span", { className: uN, "aria-hidden": "true", children: mN(r.displayName) }),
            /* @__PURE__ */ f.jsxs("span", { children: [
              /* @__PURE__ */ f.jsx("span", { className: cN, children: r.displayName }),
              /* @__PURE__ */ f.jsx("span", { className: dN, children: r.deploymentId })
            ] }),
            /* @__PURE__ */ f.jsx("span", { className: fN, "aria-hidden": "true", children: "→" })
          ] }) }, r.deploymentId)) })
        ]
      }
    )
  ] });
}
function mN(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var pN = Sb();
const gN = /* @__PURE__ */ xb(pN);
function vN(n) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = n : r.appendChild(document.createTextNode(n));
}
const yN = (n) => {
  switch (n) {
    case "success":
      return SN;
    case "info":
      return EN;
    case "warning":
      return wN;
    case "error":
      return jN;
    default:
      return null;
  }
}, bN = Array(12).fill(0), xN = ({ visible: n, className: a }) => /* @__PURE__ */ de.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": n
}, /* @__PURE__ */ de.createElement("div", {
  className: "sonner-spinner"
}, bN.map((r, s) => /* @__PURE__ */ de.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${s}`
})))), SN = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), wN = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), EN = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), jN = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), TN = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ de.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ de.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), NN = () => {
  const [n, a] = de.useState(document.hidden);
  return de.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), n;
};
let qf = 1;
class CN {
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
      const { message: s, ...o } = a, c = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : qf++, h = this.toasts.find((v) => v.id === c), m = a.dismissible === void 0 ? !0 : a.dismissible;
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
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((r) => r({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((r) => {
      this.subscribers.forEach((s) => s({
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
      let s;
      r.loading !== void 0 && (s = this.create({
        ...r,
        promise: a,
        type: "loading",
        message: r.loading,
        description: typeof r.description != "function" ? r.description : void 0
      }));
      const o = Promise.resolve(a instanceof Function ? a() : a);
      let c = s !== void 0, h;
      const m = o.then(async (p) => {
        if (h = [
          "resolve",
          p
        ], de.isValidElement(p))
          c = !1, this.create({
            id: s,
            type: "default",
            message: p
          });
        else if (RN(p) && !p.ok) {
          c = !1;
          const g = typeof r.error == "function" ? await r.error(`HTTP error! status: ${p.status}`) : r.error, S = typeof r.description == "function" ? await r.description(`HTTP error! status: ${p.status}`) : r.description, j = typeof g == "object" && !de.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...j
          });
        } else if (p instanceof Error) {
          c = !1;
          const g = typeof r.error == "function" ? await r.error(p) : r.error, S = typeof r.description == "function" ? await r.description(p) : r.description, j = typeof g == "object" && !de.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...j
          });
        } else if (r.success !== void 0) {
          c = !1;
          const g = typeof r.success == "function" ? await r.success(p) : r.success, S = typeof r.description == "function" ? await r.description(p) : r.description, j = typeof g == "object" && !de.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: s,
            type: "success",
            description: S,
            ...j
          });
        }
      }).catch(async (p) => {
        if (h = [
          "reject",
          p
        ], r.error !== void 0) {
          c = !1;
          const b = typeof r.error == "function" ? await r.error(p) : r.error, g = typeof r.description == "function" ? await r.description(p) : r.description, w = typeof b == "object" && !de.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: s,
            type: "error",
            description: g,
            ...w
          });
        }
      }).finally(() => {
        c && (this.dismiss(s), s = void 0), r.finally == null || r.finally.call(r);
      }), v = () => new Promise((p, b) => m.then(() => h[0] === "reject" ? b(h[1]) : p(h[1])).catch(b));
      return typeof s != "string" && typeof s != "number" ? {
        unwrap: v
      } : Object.assign(s, {
        unwrap: v
      });
    }, this.custom = (a, r) => {
      const s = r?.id || qf++;
      return this.create({
        jsx: a(s),
        id: s,
        ...r
      }), s;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const vn = new CN(), MN = (n, a) => {
  const r = a?.id || qf++;
  return vn.addToast({
    title: n,
    ...a,
    id: r
  }), r;
}, RN = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", AN = MN, _N = () => vn.toasts, DN = () => vn.getActiveToasts(), Sy = Object.assign(AN, {
  success: vn.success,
  info: vn.info,
  warning: vn.warning,
  error: vn.error,
  custom: vn.custom,
  message: vn.message,
  promise: vn.promise,
  dismiss: vn.dismiss,
  loading: vn.loading
}, {
  getHistory: _N,
  getToasts: DN
});
vN("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Yo(n) {
  return n.label !== void 0;
}
const zN = 3, ON = "24px", LN = "16px", wy = 4e3, UN = 356, kN = 14, VN = 45, BN = 200;
function fa(...n) {
  return n.filter(Boolean).join(" ");
}
function HN(n) {
  const [a, r] = n.split("-"), s = [];
  return a && s.push(a), r && s.push(r), s;
}
const qN = (n) => {
  var a, r, s, o, c, h, m, v, p;
  const { invert: b, toast: g, unstyled: S, interacting: w, setHeights: j, visibleToasts: T, heights: M, index: N, toasts: L, expanded: z, removeToast: _, defaultRichColors: J, closeButton: G, style: W, cancelButtonStyle: A, actionButtonStyle: U, className: I = "", descriptionClassName: le = "", duration: ae, position: me, gap: ge, expandByDefault: oe, classNames: O, icons: V, closeButtonAriaLabel: q = "Close toast" } = n, [Q, te] = de.useState(null), [C, K] = de.useState(null), [Z, re] = de.useState(!1), [ce, ve] = de.useState(!1), [ze, _e] = de.useState(!1), [Be, kt] = de.useState(!1), [Yt, fe] = de.useState(!1), [Te, Ce] = de.useState(0), [Me, Kt] = de.useState(0), it = de.useRef(g.duration || ae || wy), on = de.useRef(null), Qt = de.useRef(null), bn = N === 0, ma = N + 1 <= T, Vt = g.type, Dn = g.dismissible !== !1, Bt = g.className || "", ye = g.descriptionClassName || "", Oe = de.useMemo(() => M.findIndex((Le) => Le.toastId === g.id) || 0, [
    M,
    g.id
  ]), Qe = de.useMemo(() => {
    var Le;
    return (Le = g.closeButton) != null ? Le : G;
  }, [
    g.closeButton,
    G
  ]), tt = de.useMemo(() => g.duration || ae || wy, [
    g.duration,
    ae
  ]), Ht = de.useRef(0), qt = de.useRef(0), Ei = de.useRef(0), ia = de.useRef(null), [Qn, Pt] = me.split("-"), Et = de.useMemo(() => M.reduce((Le, ct, Mt) => Mt >= Oe ? Le : Le + ct.height, 0), [
    M,
    Oe
  ]), $t = NN(), Ji = g.invert || b, Ba = Vt === "loading";
  qt.current = de.useMemo(() => Oe * ge + Et, [
    Oe,
    Et
  ]), de.useEffect(() => {
    it.current = tt;
  }, [
    tt
  ]), de.useEffect(() => {
    re(!0);
  }, []), de.useEffect(() => {
    const Le = Qt.current;
    if (Le) {
      const ct = Le.getBoundingClientRect().height;
      return Kt(ct), j((Mt) => [
        {
          toastId: g.id,
          height: ct,
          position: g.position
        },
        ...Mt
      ]), () => j((Mt) => Mt.filter((It) => It.toastId !== g.id));
    }
  }, [
    j,
    g.id
  ]), de.useLayoutEffect(() => {
    if (!Z) return;
    const Le = Qt.current, ct = Le.style.height;
    Le.style.height = "auto";
    const Mt = Le.getBoundingClientRect().height;
    Le.style.height = ct, Kt(Mt), j((It) => It.find((rt) => rt.toastId === g.id) ? It.map((rt) => rt.toastId === g.id ? {
      ...rt,
      height: Mt
    } : rt) : [
      {
        toastId: g.id,
        height: Mt,
        position: g.position
      },
      ...It
    ]);
  }, [
    Z,
    g.title,
    g.description,
    j,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const zn = de.useCallback(() => {
    ve(!0), Ce(qt.current), j((Le) => Le.filter((ct) => ct.toastId !== g.id)), setTimeout(() => {
      _(g);
    }, BN);
  }, [
    g,
    _,
    j,
    qt
  ]);
  de.useEffect(() => {
    if (g.promise && Vt === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let Le;
    return z || w || $t ? (() => {
      if (Ei.current < Ht.current) {
        const It = (/* @__PURE__ */ new Date()).getTime() - Ht.current;
        it.current = it.current - It;
      }
      Ei.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      it.current !== 1 / 0 && (Ht.current = (/* @__PURE__ */ new Date()).getTime(), Le = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), zn();
      }, it.current));
    })(), () => clearTimeout(Le);
  }, [
    z,
    w,
    g,
    Vt,
    $t,
    zn
  ]), de.useEffect(() => {
    g.delete && (zn(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    zn,
    g.delete
  ]);
  function pa() {
    var Le;
    if (V?.loading) {
      var ct;
      return /* @__PURE__ */ de.createElement("div", {
        className: fa(O?.loader, g == null || (ct = g.classNames) == null ? void 0 : ct.loader, "sonner-loader"),
        "data-visible": Vt === "loading"
      }, V.loading);
    }
    return /* @__PURE__ */ de.createElement(xN, {
      className: fa(O?.loader, g == null || (Le = g.classNames) == null ? void 0 : Le.loader),
      visible: Vt === "loading"
    });
  }
  const Pn = g.icon || V?.[Vt] || yN(Vt);
  var ra, cn;
  return /* @__PURE__ */ de.createElement("li", {
    tabIndex: 0,
    ref: Qt,
    className: fa(I, Bt, O?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, O?.default, O?.[Vt], g == null || (r = g.classNames) == null ? void 0 : r[Vt]),
    "data-sonner-toast": "",
    "data-rich-colors": (ra = g.richColors) != null ? ra : J,
    "data-styled": !(g.jsx || g.unstyled || S),
    "data-mounted": Z,
    "data-promise": !!g.promise,
    "data-swiped": Yt,
    "data-removed": ce,
    "data-visible": ma,
    "data-y-position": Qn,
    "data-x-position": Pt,
    "data-index": N,
    "data-front": bn,
    "data-swiping": ze,
    "data-dismissible": Dn,
    "data-type": Vt,
    "data-invert": Ji,
    "data-swipe-out": Be,
    "data-swipe-direction": C,
    "data-expanded": !!(z || oe && Z),
    "data-testid": g.testId,
    style: {
      "--index": N,
      "--toasts-before": N,
      "--z-index": L.length - N,
      "--offset": `${ce ? Te : qt.current}px`,
      "--initial-height": oe ? "auto" : `${Me}px`,
      ...W,
      ...g.style
    },
    onDragEnd: () => {
      _e(!1), te(null), ia.current = null;
    },
    onPointerDown: (Le) => {
      Le.button !== 2 && (Ba || !Dn || (on.current = /* @__PURE__ */ new Date(), Ce(qt.current), Le.target.setPointerCapture(Le.pointerId), Le.target.tagName !== "BUTTON" && (_e(!0), ia.current = {
        x: Le.clientX,
        y: Le.clientY
      })));
    },
    onPointerUp: () => {
      var Le, ct, Mt;
      if (Be || !Dn) return;
      ia.current = null;
      const It = Number(((Le = Qt.current) == null ? void 0 : Le.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), xn = Number(((ct = Qt.current) == null ? void 0 : ct.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), rt = (/* @__PURE__ */ new Date()).getTime() - ((Mt = on.current) == null ? void 0 : Mt.getTime()), Zt = Q === "x" ? It : xn, ga = Math.abs(Zt) / rt;
      if (Math.abs(Zt) >= VN || ga > 0.11) {
        Ce(qt.current), g.onDismiss == null || g.onDismiss.call(g, g), K(Q === "x" ? It > 0 ? "right" : "left" : xn > 0 ? "down" : "up"), zn(), kt(!0);
        return;
      } else {
        var nn, R;
        (nn = Qt.current) == null || nn.style.setProperty("--swipe-amount-x", "0px"), (R = Qt.current) == null || R.style.setProperty("--swipe-amount-y", "0px");
      }
      fe(!1), _e(!1), te(null);
    },
    onPointerMove: (Le) => {
      var ct, Mt, It;
      if (!ia.current || !Dn || ((ct = window.getSelection()) == null ? void 0 : ct.toString().length) > 0) return;
      const rt = Le.clientY - ia.current.y, Zt = Le.clientX - ia.current.x;
      var ga;
      const nn = (ga = n.swipeDirections) != null ? ga : HN(me);
      !Q && (Math.abs(Zt) > 1 || Math.abs(rt) > 1) && te(Math.abs(Zt) > Math.abs(rt) ? "x" : "y");
      let R = {
        x: 0,
        y: 0
      };
      const B = ($) => 1 / (1.5 + Math.abs($) / 20);
      if (Q === "y") {
        if (nn.includes("top") || nn.includes("bottom"))
          if (nn.includes("top") && rt < 0 || nn.includes("bottom") && rt > 0)
            R.y = rt;
          else {
            const $ = rt * B(rt);
            R.y = Math.abs($) < Math.abs(rt) ? $ : rt;
          }
      } else if (Q === "x" && (nn.includes("left") || nn.includes("right")))
        if (nn.includes("left") && Zt < 0 || nn.includes("right") && Zt > 0)
          R.x = Zt;
        else {
          const $ = Zt * B(Zt);
          R.x = Math.abs($) < Math.abs(Zt) ? $ : Zt;
        }
      (Math.abs(R.x) > 0 || Math.abs(R.y) > 0) && fe(!0), (Mt = Qt.current) == null || Mt.style.setProperty("--swipe-amount-x", `${R.x}px`), (It = Qt.current) == null || It.style.setProperty("--swipe-amount-y", `${R.y}px`);
    }
  }, Qe && !g.jsx && Vt !== "loading" ? /* @__PURE__ */ de.createElement("button", {
    "aria-label": q,
    "data-disabled": Ba,
    "data-close-button": !0,
    onClick: Ba || !Dn ? () => {
    } : () => {
      zn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: fa(O?.closeButton, g == null || (s = g.classNames) == null ? void 0 : s.closeButton)
  }, (cn = V?.close) != null ? cn : TN) : null, (Vt || g.icon || g.promise) && g.icon !== null && (V?.[Vt] !== null || g.icon) ? /* @__PURE__ */ de.createElement("div", {
    "data-icon": "",
    className: fa(O?.icon, g == null || (o = g.classNames) == null ? void 0 : o.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || pa() : null, g.type !== "loading" ? Pn : null) : null, /* @__PURE__ */ de.createElement("div", {
    "data-content": "",
    className: fa(O?.content, g == null || (c = g.classNames) == null ? void 0 : c.content)
  }, /* @__PURE__ */ de.createElement("div", {
    "data-title": "",
    className: fa(O?.title, g == null || (h = g.classNames) == null ? void 0 : h.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ de.createElement("div", {
    "data-description": "",
    className: fa(le, ye, O?.description, g == null || (m = g.classNames) == null ? void 0 : m.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ de.isValidElement(g.cancel) ? g.cancel : g.cancel && Yo(g.cancel) ? /* @__PURE__ */ de.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || A,
    onClick: (Le) => {
      Yo(g.cancel) && Dn && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, Le), zn());
    },
    className: fa(O?.cancelButton, g == null || (v = g.classNames) == null ? void 0 : v.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ de.isValidElement(g.action) ? g.action : g.action && Yo(g.action) ? /* @__PURE__ */ de.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || U,
    onClick: (Le) => {
      Yo(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, Le), !Le.defaultPrevented && zn());
    },
    className: fa(O?.actionButton, g == null || (p = g.classNames) == null ? void 0 : p.actionButton)
  }, g.action.label) : null);
};
function Ey() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function $N(n, a) {
  const r = {};
  return [
    n,
    a
  ].forEach((s, o) => {
    const c = o === 1, h = c ? "--mobile-offset" : "--offset", m = c ? LN : ON;
    function v(p) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((b) => {
        r[`${h}-${b}`] = typeof p == "number" ? `${p}px` : p;
      });
    }
    typeof s == "number" || typeof s == "string" ? v(s) : typeof s == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      s[p] === void 0 ? r[`${h}-${p}`] = m : r[`${h}-${p}`] = typeof s[p] == "number" ? `${s[p]}px` : s[p];
    }) : v(m);
  }), r;
}
const IN = /* @__PURE__ */ de.forwardRef(function(a, r) {
  const { id: s, invert: o, position: c = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: v, className: p, offset: b, mobileOffset: g, theme: S = "light", richColors: w, duration: j, style: T, visibleToasts: M = zN, toastOptions: N, dir: L = Ey(), gap: z = kN, icons: _, containerAriaLabel: J = "Notifications" } = a, [G, W] = de.useState([]), A = de.useMemo(() => s ? G.filter((Z) => Z.toasterId === s) : G.filter((Z) => !Z.toasterId), [
    G,
    s
  ]), U = de.useMemo(() => Array.from(new Set([
    c
  ].concat(A.filter((Z) => Z.position).map((Z) => Z.position)))), [
    A,
    c
  ]), [I, le] = de.useState([]), [ae, me] = de.useState(!1), [ge, oe] = de.useState(!1), [O, V] = de.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), q = de.useRef(null), Q = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), te = de.useRef(null), C = de.useRef(!1), K = de.useCallback((Z) => {
    W((re) => {
      var ce;
      return (ce = re.find((ve) => ve.id === Z.id)) != null && ce.delete || vn.dismiss(Z.id), re.filter(({ id: ve }) => ve !== Z.id);
    });
  }, []);
  return de.useEffect(() => vn.subscribe((Z) => {
    if (Z.dismiss) {
      requestAnimationFrame(() => {
        W((re) => re.map((ce) => ce.id === Z.id ? {
          ...ce,
          delete: !0
        } : ce));
      });
      return;
    }
    setTimeout(() => {
      gN.flushSync(() => {
        W((re) => {
          const ce = re.findIndex((ve) => ve.id === Z.id);
          return ce !== -1 ? [
            ...re.slice(0, ce),
            {
              ...re[ce],
              ...Z
            },
            ...re.slice(ce + 1)
          ] : [
            Z,
            ...re
          ];
        });
      });
    });
  }), [
    G
  ]), de.useEffect(() => {
    if (S !== "system") {
      V(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? V("dark") : V("light")), typeof window > "u") return;
    const Z = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Z.addEventListener("change", ({ matches: re }) => {
        V(re ? "dark" : "light");
      });
    } catch {
      Z.addListener(({ matches: ce }) => {
        try {
          V(ce ? "dark" : "light");
        } catch (ve) {
          console.error(ve);
        }
      });
    }
  }, [
    S
  ]), de.useEffect(() => {
    G.length <= 1 && me(!1);
  }, [
    G
  ]), de.useEffect(() => {
    const Z = (re) => {
      var ce;
      if (h.every((_e) => re[_e] || re.code === _e)) {
        var ze;
        me(!0), (ze = q.current) == null || ze.focus();
      }
      re.code === "Escape" && (document.activeElement === q.current || (ce = q.current) != null && ce.contains(document.activeElement)) && me(!1);
    };
    return document.addEventListener("keydown", Z), () => document.removeEventListener("keydown", Z);
  }, [
    h
  ]), de.useEffect(() => {
    if (q.current)
      return () => {
        te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null, C.current = !1);
      };
  }, [
    q.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ de.createElement("section", {
    ref: r,
    "aria-label": `${J} ${Q}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, U.map((Z, re) => {
    var ce;
    const [ve, ze] = Z.split("-");
    return A.length ? /* @__PURE__ */ de.createElement("ol", {
      key: Z,
      dir: L === "auto" ? Ey() : L,
      tabIndex: -1,
      ref: q,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": O,
      "data-y-position": ve,
      "data-x-position": ze,
      style: {
        "--front-toast-height": `${((ce = I[0]) == null ? void 0 : ce.height) || 0}px`,
        "--width": `${UN}px`,
        "--gap": `${z}px`,
        ...T,
        ...$N(b, g)
      },
      onBlur: (_e) => {
        C.current && !_e.currentTarget.contains(_e.relatedTarget) && (C.current = !1, te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null));
      },
      onFocus: (_e) => {
        _e.target instanceof HTMLElement && _e.target.dataset.dismissible === "false" || C.current || (C.current = !0, te.current = _e.relatedTarget);
      },
      onMouseEnter: () => me(!0),
      onMouseMove: () => me(!0),
      onMouseLeave: () => {
        ge || me(!1);
      },
      onDragEnd: () => me(!1),
      onPointerDown: (_e) => {
        _e.target instanceof HTMLElement && _e.target.dataset.dismissible === "false" || oe(!0);
      },
      onPointerUp: () => oe(!1)
    }, A.filter((_e) => !_e.position && re === 0 || _e.position === Z).map((_e, Be) => {
      var kt, Yt;
      return /* @__PURE__ */ de.createElement(qN, {
        key: _e.id,
        icons: _,
        index: Be,
        toast: _e,
        defaultRichColors: w,
        duration: (kt = N?.duration) != null ? kt : j,
        className: N?.className,
        descriptionClassName: N?.descriptionClassName,
        invert: o,
        visibleToasts: M,
        closeButton: (Yt = N?.closeButton) != null ? Yt : v,
        interacting: ge,
        position: Z,
        style: N?.style,
        unstyled: N?.unstyled,
        classNames: N?.classNames,
        cancelButtonStyle: N?.cancelButtonStyle,
        actionButtonStyle: N?.actionButtonStyle,
        closeButtonAriaLabel: N?.closeButtonAriaLabel,
        removeToast: K,
        toasts: A.filter((fe) => fe.position == _e.position),
        heights: I.filter((fe) => fe.position == _e.position),
        setHeights: le,
        expandByDefault: m,
        gap: z,
        expanded: ae,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), jy = 32, Ty = -30, Ny = -6, Cy = 0.5, My = 2, Ry = -24, Ay = 24, _y = -12, Dy = 12, zy = -12, Oy = 12, Ly = -60, Uy = -20;
class Kr extends Error {
  constructor(a, r) {
    super(r), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function ax(n, a, r, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, c = `${xi}${o}`, h = await fetch(c, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(r),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (h.status === 409) {
    const m = await h.json().catch(() => null), v = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Kr(v, p);
  }
  if (!h.ok)
    throw new Error(await Au(h, "apply"));
  return await h.json();
}
async function FN(n, a, r, s, o = {}) {
  const c = `/deployments/${encodeURIComponent(n)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(r)}/edit`, h = `${xi}${c}`, m = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const v = await m.json().catch(() => null), p = v?.error?.current_digest ?? "", b = v?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Kr(p, b);
  }
  if (!m.ok)
    throw new Error(await Au(m, "apply"));
  return await m.json();
}
async function YN(n, a, r = {}) {
  const s = `${xi}/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
    method: "DELETE",
    ...r.signal ? { signal: r.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function GN(n, a, r, s = {}) {
  const o = `${xi}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: r }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!c.ok)
    throw new Error(await Au(c, "preview"));
  return c.blob();
}
async function uu(n, a, r, s = 50, o = {}) {
  const c = `${xi}/audit/${encodeURIComponent(a)}/${encodeURIComponent(r)}?deploymentId=${encodeURIComponent(n)}&limit=${encodeURIComponent(String(s))}`, h = await fetch(c, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!h.ok)
    throw new Error(await Au(h, "audit fetch"));
  return await h.json();
}
function yn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function ix(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > jy)
    return {
      message: `Chain exceeds the maximum of ${jy} operations.`
    };
  for (const r of n.ops) {
    const s = XN(r, a);
    if (s) return s;
  }
  return null;
}
function XN(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return KN(n.id, n.start_ms, n.end_ms, a);
    case "normalize":
      return n.target_lufs < Ty || n.target_lufs > Ny ? {
        opId: n.id,
        message: `Normalize target must be between ${Ty} and ${Ny} LUFS.`
      } : null;
    case "speed":
      return n.factor < Cy || n.factor > My ? {
        opId: n.id,
        message: `Speed factor must be between ${Cy}× and ${My}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return n.duration_ms < 1 ? { opId: n.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return n.gain_db < Ry || n.gain_db > Ay ? {
        opId: n.id,
        message: `Volume must be between ${Ry} and ${Ay} dB.`
      } : null;
    case "eq3":
      for (const [r, s] of [
        ["low_db", n.low_db],
        ["mid_db", n.mid_db],
        ["high_db", n.high_db]
      ])
        if (s < _y || s > Dy)
          return {
            opId: n.id,
            message: `EQ ${r} must be between ${_y} and ${Dy} dB.`
          };
      return null;
    case "pitch_shift":
      return n.semitones < zy || n.semitones > Oy ? {
        opId: n.id,
        message: `Pitch must be between ${zy} and ${Oy} semitones.`
      } : null;
    case "silence_strip":
      return n.threshold_db < Ly || n.threshold_db > Uy ? {
        opId: n.id,
        message: `Silence threshold must be between ${Ly} and ${Uy} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function KN(n, a, r, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : r <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && r > s ? { opId: n, message: "End extends past source duration." } : null;
}
async function Au(n, a) {
  const r = await n.json().catch(() => null);
  return r?.error?.message ?? r?.message ?? `${a} failed: ${n.status}`;
}
async function rx(n) {
  return vt(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function QN(n, a, r) {
  return vt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: r })
  });
}
async function PN(n, a) {
  await vt(
    `/presets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
var ky = "_190jlds0", ZN = "_190jlds1", JN = "_190jlds2", WN = "_190jlds3", eC = "_190jlds4", tC = "_190jlds5", nC = "_190jlds7", aC = "_190jlds8", iC = "_190jlds9", rC = "_190jldsa", lC = "_190jldsb", Vy = "_190jldsc", sC = "_190jldsd", By = "_190jldse", oC = "_190jldsf", uC = "_190jldsg", cC = "_190jldsh", lx = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, sx = { sm: "_4ydn546", md: "_4ydn547", lg: "_4ydn548" };
function We({
  variant: n = "primary",
  size: a = "md",
  type: r = "button",
  loading: s = !1,
  disabled: o,
  children: c,
  className: h,
  style: m,
  ...v
}) {
  const p = [lx[n], sx[a], h].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx(
    "button",
    {
      type: r,
      className: p,
      style: m,
      disabled: s || o,
      "aria-busy": s || void 0,
      ...v,
      children: c
    }
  );
}
function dC({
  deploymentId: n,
  targets: a,
  onRevertToIdentity: r,
  onRevertToChain: s,
  emptyHint: o
}) {
  const [c, h] = x.useState(() => Lr(a[0])), [m, v] = x.useState([]), [p, b] = x.useState(!1), [g, S] = x.useState(null), [w, j] = x.useState(!1), [T, M] = x.useState(null), N = x.useMemo(
    () => a.find((_) => Lr(_) === c) ?? a[0],
    [a, c]
  );
  x.useEffect(() => {
    a.length && (a.some((_) => Lr(_) === c) || h(Lr(a[0])));
  }, [a, c]), x.useEffect(() => {
    if (!N) {
      v([]);
      return;
    }
    let _ = !1;
    return b(!0), S(null), uu(n, N.kind, N.id, 50).then((J) => {
      _ || v(J.entries);
    }).catch((J) => {
      _ || S(J instanceof Error ? J.message : "audit fetch failed");
    }).finally(() => {
      _ || b(!1);
    }), () => {
      _ = !0;
    };
  }, [n, N]);
  const L = x.useCallback(() => {
    if (!N) return;
    const _ = {
      deploymentId: n,
      targetKind: N.kind,
      targetId: N.id,
      targetLabel: N.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, J = new Blob([JSON.stringify(_, null, 2)], {
      type: "application/json"
    }), G = URL.createObjectURL(J), W = document.createElement("a");
    W.href = G, W.download = `audit-${N.kind}-${N.id}-${Date.now()}.json`, document.body.appendChild(W), W.click(), document.body.removeChild(W), URL.revokeObjectURL(G);
  }, [n, m, N]), z = x.useCallback(async () => {
    if (!(!N || !r) && window.confirm(
      `Revert "${N.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      j(!0);
      try {
        await r(N);
        const _ = await uu(n, N.kind, N.id, 50);
        v(_.entries);
      } catch (_) {
        S(_ instanceof Error ? _.message : "revert failed");
      } finally {
        j(!1);
      }
    }
  }, [n, r, N]);
  return a.length === 0 ? /* @__PURE__ */ f.jsx("div", { className: ky, children: /* @__PURE__ */ f.jsx("p", { className: By, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ f.jsxs("div", { className: ky, children: [
    /* @__PURE__ */ f.jsxs("header", { className: ZN, children: [
      /* @__PURE__ */ f.jsxs("div", { className: JN, children: [
        /* @__PURE__ */ f.jsx("label", { htmlFor: "audit-target-select", className: Vy, children: "Target" }),
        /* @__PURE__ */ f.jsx(
          "select",
          {
            id: "audit-target-select",
            className: WN,
            value: c,
            onChange: (_) => h(_.target.value),
            children: a.map((_) => /* @__PURE__ */ f.jsxs("option", { value: Lr(_), children: [
              _.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              _.label
            ] }, Lr(_)))
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: eC, children: [
        /* @__PURE__ */ f.jsx(
          We,
          {
            variant: "ghost",
            size: "sm",
            onClick: L,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        r && /* @__PURE__ */ f.jsx(
          We,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void z(),
            disabled: w || !N,
            children: w ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    g && /* @__PURE__ */ f.jsx("div", { className: uC, children: g }),
    p && !g && /* @__PURE__ */ f.jsx("div", { className: cC, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !g && m.length === 0 && /* @__PURE__ */ f.jsxs("p", { className: By, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ f.jsx("br", {}),
      /* @__PURE__ */ f.jsx("span", { className: oC, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !g && m.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: nC, children: m.map((_) => {
      const J = s && N && !!_.chain_snapshot_json && _.operation_count > 0;
      return /* @__PURE__ */ f.jsxs("li", { className: aC, children: [
        /* @__PURE__ */ f.jsx("span", { className: iC, children: fC(_.recorded_at) }),
        /* @__PURE__ */ f.jsx("span", { className: rC, children: _.operation_count === 0 ? "cleared" : `${_.operation_count} ops` }),
        /* @__PURE__ */ f.jsxs("span", { className: lC, title: _.digest_after, children: [
          _.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ f.jsx("span", { className: Vy, children: _.actor || "—" }),
        /* @__PURE__ */ f.jsx(
          "span",
          {
            className: sC,
            style: {
              background: `color-mix(in oklab, ${_.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: _.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: _.digest_before === "" || !_.digest_before ? "create" : _.operation_count === 0 ? "clear" : "update"
          }
        ),
        J && /* @__PURE__ */ f.jsx(
          "button",
          {
            type: "button",
            className: tC,
            disabled: w || T !== null,
            onClick: async () => {
              if (!(!N || !_.chain_snapshot_json) && !(T !== null || w) && window.confirm(
                `Replay this ${_.operation_count}-op chain on "${N.label}"? A new audit entry will be written.`
              )) {
                M(_.entry_id);
                try {
                  await s(N, _.chain_snapshot_json, _);
                  const G = await uu(
                    n,
                    N.kind,
                    N.id,
                    50
                  );
                  v(G.entries);
                } catch (G) {
                  S(G instanceof Error ? G.message : "revert failed");
                } finally {
                  M(null);
                }
              }
            },
            children: T === _.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, _.entry_id);
    }) })
  ] });
}
function Lr(n) {
  return n ? `${n.kind}:${n.id}` : "";
}
function fC(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var hC = "_1uzgubz0", mC = "_1uzgubz1", pC = "_1uzgubz2", gC = "_1uzgubz3", vC = "_1uzgubz4", yC = "_1uzgubz5", bC = "_1uzgubz6", xC = "_1uzgubz7", Hy = "_1uzgubz8", SC = "_1uzgubz9", ox = "_1uzgubza", ux = "_1uzgubzb", wC = "_1uzgubzc", EC = "_1uzgubzd", nf = "_1uzgubze", af = "_1uzgubzf", jC = "_1uzgubzg", TC = "_1uzgubzh", qy = "_1uzgubzi", $y = "_1uzgubzj", Iy = "_1uzgubzk", Fy = "_1uzgubzl", Yy = "_1uzgubzm", NC = "_1uzgubzn", CC = "_1uzgubzo", MC = "_1uzgubzp", RC = "_1uzgubzq", AC = "_1uzgubzr";
function _C({
  characterName: n,
  color: a,
  lineCount: r,
  mapping: s,
  voiceAssets: o,
  presets: c,
  active: h,
  onToggle: m,
  onAssignVoiceAsset: v,
  onAssignPreset: p,
  onUploadFile: b,
  onClearMapping: g
}) {
  const [S, w] = x.useState(!1), j = s ? o.find((L) => L.voiceAssetId === s.speakerVoiceAssetId) : null, T = s?.defaultVectorPresetId ? c.find((L) => L.presetId === s.defaultVectorPresetId) ?? null : null, M = (n[0] ?? "?").toUpperCase(), N = s !== null;
  return /* @__PURE__ */ f.jsxs("div", { className: `${hC}${h ? ` ${mC}` : ""}`, children: [
    /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: pC,
        onClick: m,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ f.jsx(
            "span",
            {
              className: gC,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: M
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: vC, children: [
            /* @__PURE__ */ f.jsx("span", { className: yC, style: { color: a }, children: n }),
            /* @__PURE__ */ f.jsxs("span", { className: bC, children: [
              r,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ f.jsxs("span", { className: xC, children: [
            j ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
              /* @__PURE__ */ f.jsx("span", { className: Hy, children: j.displayName }),
              j.durationMs != null && /* @__PURE__ */ f.jsxs("span", { children: [
                Gy(j.durationMs),
                " ·",
                " ",
                j.sampleRate ? `${j.sampleRate} Hz` : "—"
              ] })
            ] }) : T ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
              /* @__PURE__ */ f.jsx("span", { className: Hy, children: T.presetName }),
              /* @__PURE__ */ f.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ f.jsx("span", { children: "no voice assigned" }),
            s?.voiceAssetChainDigest && /* @__PURE__ */ f.jsxs("span", { className: wC, children: [
              "chain · ",
              s.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ f.jsx(
            "span",
            {
              className: `${SC} ${N ? ox : ux}`,
              children: N ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ f.jsxs("div", { className: EC, children: [
      /* @__PURE__ */ f.jsxs("div", { className: nf, children: [
        /* @__PURE__ */ f.jsx("span", { className: af, children: "Drop new audio" }),
        /* @__PURE__ */ f.jsxs(
          "label",
          {
            className: `${jC}${S ? ` ${TC}` : ""}`,
            onDragEnter: (L) => {
              L.preventDefault(), w(!0);
            },
            onDragOver: (L) => L.preventDefault(),
            onDragLeave: () => w(!1),
            onDrop: (L) => {
              L.preventDefault(), w(!1);
              const z = L.dataTransfer.files?.[0];
              z && b && b(z);
            },
            children: [
              /* @__PURE__ */ f.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ f.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (L) => {
                    const z = L.target.files?.[0];
                    z && b && b(z);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ f.jsxs("div", { className: nf, children: [
        /* @__PURE__ */ f.jsx("span", { className: af, children: "Reference library" }),
        /* @__PURE__ */ f.jsx("div", { className: qy, children: o.map((L) => /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: `${$y}${s?.speakerVoiceAssetId === L.voiceAssetId ? ` ${Iy}` : ""}`,
            onClick: () => v(L.voiceAssetId),
            children: [
              /* @__PURE__ */ f.jsx("span", { className: Fy, children: L.displayName }),
              /* @__PURE__ */ f.jsxs("span", { className: Yy, children: [
                L.durationMs != null ? Gy(L.durationMs) : "—",
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
      c.length > 0 && p && /* @__PURE__ */ f.jsxs("div", { className: nf, children: [
        /* @__PURE__ */ f.jsx("span", { className: af, children: "Preset voices" }),
        /* @__PURE__ */ f.jsx("div", { className: qy, children: c.map((L) => /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: `${$y}${s?.defaultVectorPresetId === L.presetId ? ` ${Iy}` : ""}`,
            onClick: () => p(L.presetId),
            children: [
              /* @__PURE__ */ f.jsx("span", { className: Fy, children: L.presetName }),
              /* @__PURE__ */ f.jsx("span", { className: Yy, children: "preset · vector" })
            ]
          },
          L.presetId
        )) })
      ] }),
      N && g && /* @__PURE__ */ f.jsx("button", { type: "button", className: AC, onClick: g, children: "Clear mapping →" })
    ] })
  ] });
}
function Gy(n) {
  if (!Number.isFinite(n) || n < 0) return "0:00";
  const a = Math.round(n / 1e3), r = Math.floor(a / 60), s = a % 60;
  return `${r}:${s.toString().padStart(2, "0")}`;
}
function DC({
  unmappedCount: n,
  totalCount: a,
  children: r,
  emptyHint: s
}) {
  if (a === 0)
    return /* @__PURE__ */ f.jsx("p", { className: RC, children: s ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = n === 0;
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsx("header", { className: NC, children: /* @__PURE__ */ f.jsx(
      "span",
      {
        className: `${CC} ${o ? ox : ux}`,
        children: o ? `All ${a} mapped` : `${n} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ f.jsx("ul", { className: MC, children: r })
  ] });
}
var zC = "_13ctegf0", Ur = "_13ctegf1", kr = "_13ctegf2", rf = "_13ctegf3", lf = "_13ctegf4", Go = "_13ctegf5";
function OC({
  runtimeId: n,
  device: a,
  sampleRateHz: r,
  lineCount: s,
  charCount: o,
  estimatedDurationS: c
}) {
  return /* @__PURE__ */ f.jsxs("div", { className: zC, role: "status", "aria-label": "Recipe deployment context", children: [
    /* @__PURE__ */ f.jsxs("span", { className: Ur, children: [
      /* @__PURE__ */ f.jsx("span", { className: kr, children: "Runtime" }),
      /* @__PURE__ */ f.jsx("span", { className: rf, children: n })
    ] }),
    a && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx("span", { className: Go, "aria-hidden": "true" }),
      /* @__PURE__ */ f.jsxs("span", { className: Ur, children: [
        /* @__PURE__ */ f.jsx("span", { className: kr, children: "Device" }),
        /* @__PURE__ */ f.jsx("span", { className: rf, children: a })
      ] })
    ] }),
    typeof r == "number" && r > 0 && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx("span", { className: Go, "aria-hidden": "true" }),
      /* @__PURE__ */ f.jsxs("span", { className: Ur, children: [
        /* @__PURE__ */ f.jsx("span", { className: kr, children: "Sample rate" }),
        /* @__PURE__ */ f.jsxs("span", { className: rf, children: [
          r,
          " Hz"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("span", { className: Go, "aria-hidden": "true" }),
    /* @__PURE__ */ f.jsxs("span", { className: Ur, children: [
      /* @__PURE__ */ f.jsx("span", { className: kr, children: "Lines" }),
      /* @__PURE__ */ f.jsx("span", { className: lf, children: s.toString().padStart(2, "0") })
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: Ur, children: [
      /* @__PURE__ */ f.jsx("span", { className: kr, children: "Chars" }),
      /* @__PURE__ */ f.jsx("span", { className: lf, children: o.toString().padStart(3, "0") })
    ] }),
    typeof c == "number" && c > 0 && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx("span", { className: Go, "aria-hidden": "true" }),
      /* @__PURE__ */ f.jsxs("span", { className: Ur, children: [
        /* @__PURE__ */ f.jsx("span", { className: kr, children: "Est duration" }),
        /* @__PURE__ */ f.jsx("span", { className: lf, children: LC(c) })
      ] })
    ] })
  ] });
}
function LC(n) {
  if (!Number.isFinite(n) || n <= 0) return "—";
  const a = Math.floor(n / 60), r = Math.round(n % 60);
  return `${a}:${r.toString().padStart(2, "0")}`;
}
const UC = "huggingface/IndexTeam/IndexTTS-2";
async function kC(n) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(n)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function VC() {
  return vt("/runtime/health");
}
async function BC() {
  await vt("/runtime/start", { method: "POST" });
}
async function HC() {
  return vt("/runtime/stop", { method: "POST" });
}
async function qC() {
  await vt("/runtime/restart", { method: "POST" });
}
function $C(n) {
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
var IC = "g5r6d10", FC = "g5r6d11", YC = "g5r6d12", GC = "g5r6d13", XC = "g5r6d14", KC = "g5r6d15", QC = "g5r6d1a", PC = "g5r6d1b", ZC = "g5r6d1c", JC = "g5r6d1d", WC = "g5r6d1e", eM = "g5r6d1g", tM = "g5r6d1h", Xy = "g5r6d1i", nM = "g5r6d1j", aM = "g5r6d1k", iM = "g5r6d1l", Ky = "g5r6d1m", Qy = "g5r6d1n", rM = "g5r6d1o", lM = "g5r6d1p", Ir = "g5r6d1q", cx = "g5r6d1r", Py = "g5r6d1s", sM = "g5r6d1t", oM = "g5r6d1u", ci = "g5r6d1v", uM = "g5r6d1w", cM = "g5r6d1x", dM = "g5r6d1y", fM = "g5r6d1z", hM = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function _n({
  severity: n,
  children: a,
  role: r,
  ariaLive: s,
  className: o,
  style: c
}) {
  const h = [hM[n], o].filter(Boolean).join(" "), m = r ?? (n === "error" ? "alert" : "status"), v = s ?? (n === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ f.jsx("div", { className: h, role: m, "aria-live": v, style: c, children: a });
}
var dx = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, fx = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, mM = "_13bb4njb";
function vi({
  tone: n,
  size: a = "sm",
  pulse: r = !1,
  children: s,
  className: o,
  style: c,
  title: h
}) {
  const m = r && n !== "faint", v = [dx[a], fx[n], m ? mM : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("span", { className: v, style: c, title: h, children: s });
}
const pM = 4e3;
function gM({ deployment: n }) {
  const a = Zr(), [r, s] = x.useState(null), [o, c] = x.useState(null), [h, m] = x.useState(!1);
  x.useEffect(() => {
    let M = !1;
    const N = async () => {
      try {
        const z = await VC();
        M || (s(z), c(null));
      } catch (z) {
        M || c(Pl(z));
      }
    };
    N();
    const L = setInterval(N, pM);
    return () => {
      M = !0, clearInterval(L);
    };
  }, []);
  const v = x.useCallback(async () => {
    m(!0), c(null);
    try {
      await BC();
    } catch (M) {
      c(Pl(M));
    } finally {
      m(!1);
    }
  }, []), p = x.useCallback(async () => {
    m(!0);
    try {
      await HC();
    } catch (M) {
      c(Pl(M));
    } finally {
      m(!1);
    }
  }, []), b = x.useCallback(async () => {
    m(!0);
    try {
      await qC();
    } catch (M) {
      c(Pl(M));
    } finally {
      m(!1);
    }
  }, []), g = x.useCallback(async () => {
    m(!0);
    try {
      await kC(UC);
    } catch (M) {
      c(Pl(M));
    } finally {
      m(!1);
    }
  }, []), S = r?.badge ?? "not_installed", w = S === "stopped" || S === "not_installed", j = S === "ready" || S === "running" || S === "starting", T = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ f.jsxs("output", { className: cx, "aria-live": "polite", children: [
    /* @__PURE__ */ f.jsx("span", { className: Ir, children: "Runtime" }),
    /* @__PURE__ */ f.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ f.jsx("span", { className: Ir, children: "Badge" }),
    /* @__PURE__ */ f.jsx(vi, { tone: vM(S), pulse: S === "starting" || S === "installing", children: $C(S) }),
    r && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx("span", { className: Ir, children: "Uptime" }),
      /* @__PURE__ */ f.jsx("span", { children: yM(r.uptimeSeconds) }),
      /* @__PURE__ */ f.jsx("span", { className: Ir, children: "VRAM" }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        r.vramUsedMb,
        " / ",
        r.vramTotalMb,
        " MB"
      ] })
    ] }),
    w && /* @__PURE__ */ f.jsx(We, { disabled: h, onClick: v, children: "Install / Start runtime" }),
    j && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx(We, { variant: "danger", disabled: h, onClick: p, children: "Stop backend" }),
      /* @__PURE__ */ f.jsx(We, { variant: "secondary", disabled: h, onClick: b, children: "Restart" })
    ] }),
    T && /* @__PURE__ */ f.jsx(We, { disabled: h, onClick: g, children: "Download IndexTTS-2 model" }),
    /* @__PURE__ */ f.jsx(
      We,
      {
        variant: "secondary",
        onClick: () => a(`/${n.deploymentId}/mappings`),
        title: "Manage character → voice mappings (upload voice samples, edit emotion defaults)",
        children: "Mappings"
      }
    ),
    o && !T && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: o })
  ] });
}
function vM(n) {
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
function yM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Pl(n) {
  return n instanceof Jr || n instanceof Error ? n.message : "unknown error";
}
const pu = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, _u = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Ua = 1e-3;
function bM(n, a, r) {
  for (const s of Object.keys(pu)) {
    const o = pu[s];
    if (Math.abs(o.low - n) < Ua && Math.abs(o.mid - a) < Ua && Math.abs(o.high - r) < Ua)
      return s;
  }
  return "custom";
}
function xM(n) {
  let a = wM();
  for (const r of n.ops)
    a = SM(a, r);
  return a;
}
function SM(n, a) {
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
          preset: bM(a.low_db, a.mid_db, a.high_db)
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
function wM() {
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
function Si(n, a) {
  return n.ops.filter((r) => r.mode !== a);
}
function wi(n, a) {
  return [...n, a];
}
function EM(n, a) {
  const r = Si(n, "gain");
  if (Math.abs(a) < Ua) return { ...n, ops: r };
  const s = { id: yn(), mode: "gain", gain_db: a };
  return { ...n, ops: wi(r, s) };
}
function jM(n, a, r, s) {
  const o = Si(n, "eq3");
  if (Math.abs(a) < Ua && Math.abs(r) < Ua && Math.abs(s) < Ua)
    return { ...n, ops: o };
  const c = {
    id: yn(),
    mode: "eq3",
    low_db: a,
    mid_db: r,
    high_db: s
  };
  return { ...n, ops: wi(o, c) };
}
function TM(n, a) {
  const r = Si(n, "speed");
  if (Math.abs(a - 1) < Ua) return { ...n, ops: r };
  const s = { id: yn(), mode: "speed", factor: a };
  return { ...n, ops: wi(r, s) };
}
function NM(n, a) {
  const r = Si(n, "pitch_shift");
  if (Math.abs(a) < Ua) return { ...n, ops: r };
  const s = {
    id: yn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...n, ops: wi(r, s) };
}
function CM(n, a, r) {
  const s = Si(n, "normalize");
  if (a === "off") return { ...n, ops: s };
  const o = {
    id: yn(),
    mode: "normalize",
    target_lufs: r
  };
  return { ...n, ops: wi(s, o) };
}
function MM(n, a) {
  const r = Si(n, "fade_in");
  if (a <= 0) return { ...n, ops: r };
  const s = {
    id: yn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: wi(r, s) };
}
function RM(n, a) {
  const r = Si(n, "fade_out");
  if (a <= 0) return { ...n, ops: r };
  const s = {
    id: yn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: wi(r, s) };
}
function AM(n, a, r) {
  const s = Si(n, "silence_strip");
  if (!a) return { ...n, ops: s };
  const o = {
    id: yn(),
    mode: "silence_strip",
    threshold_db: r
  };
  return { ...n, ops: wi(s, o) };
}
const hx = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function mx(n, a) {
  const r = {
    ...n,
    ops: n.ops.filter((c) => !hx.has(c.mode))
  };
  let o = EM({ version: 1, ops: [] }, a.volumeDb);
  return o = jM(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = TM(o, a.speed.value)), o = NM(o, a.pitchSt), o = CM(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = MM(o, a.fade.inS), o = RM(o, a.fade.outS), o = AM(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...r, ops: [...r.ops, ...o.ops] };
}
function px(n) {
  const a = {
    ...n,
    ops: n.ops.filter((r) => hx.has(r.mode))
  };
  return xM(a);
}
var _M = "_1rsa80i0", DM = "_1rsa80i1", zM = "_1rsa80i2", OM = "_1rsa80i3", LM = "_1rsa80i4", UM = "_1rsa80i5", kM = "_1rsa80i6", VM = "_1rsa80i7", BM = "_1rsa80i8", HM = "_1rsa80i9";
const gx = ["flat", "warm", "bright", "voice", "telephone"], Zl = -12, Xo = 12, qM = 0.5;
function $M(n) {
  const { low: a, mid: r, high: s, preset: o, onChange: c, disabled: h } = n, m = (p) => {
    const b = pu[p];
    c(b.low, b.mid, b.high, p);
  }, v = (p, b) => {
    const g = { low: a, mid: r, high: s, [p]: b }, S = FM(g.low, g.mid, g.high);
    c(g.low, g.mid, g.high, S);
  };
  return /* @__PURE__ */ f.jsxs("div", { className: _M, children: [
    /* @__PURE__ */ f.jsxs("div", { className: DM, role: "group", "aria-label": "EQ presets", children: [
      gx.map((p) => /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: zM,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: h,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ f.jsx("span", { className: OM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: LM, children: [
      /* @__PURE__ */ f.jsx(
        sf,
        {
          label: "Low",
          value: a,
          onChange: (p) => v("low", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ f.jsx(
        sf,
        {
          label: "Mid",
          value: r,
          onChange: (p) => v("mid", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ f.jsx(
        sf,
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
function sf({ label: n, value: a, onChange: r, disabled: s }) {
  const o = (a - Zl) / (Xo - Zl) * 100, c = x.useId();
  return /* @__PURE__ */ f.jsxs("div", { className: UM, children: [
    /* @__PURE__ */ f.jsx("label", { htmlFor: c, className: kM, children: n }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        id: c,
        type: "range",
        min: Zl,
        max: Xo,
        step: qM,
        value: a,
        disabled: s,
        className: BM,
        style: { "--fill": `${o}%` },
        onChange: (h) => r(Number(h.target.value)),
        "aria-valuemin": Zl,
        "aria-valuemax": Xo,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: VM, children: IM(a) }),
    /* @__PURE__ */ f.jsxs("span", { className: HM, "aria-hidden": "true", children: [
      /* @__PURE__ */ f.jsx("span", { children: Zl }),
      /* @__PURE__ */ f.jsx("span", { children: "0" }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "+",
        Xo
      ] })
    ] })
  ] });
}
function IM(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
const of = 1e-3;
function FM(n, a, r) {
  for (const s of gx) {
    const o = pu[s];
    if (Math.abs(o.low - n) < of && Math.abs(o.mid - a) < of && Math.abs(o.high - r) < of)
      return s;
  }
  return "custom";
}
var YM = "_85bhwb0", GM = "_85bhwb1", Zy = "_85bhwb2", XM = "_85bhwb3", KM = "_85bhwb4", QM = "_85bhwb5", PM = "_85bhwb6", ZM = "_85bhwb7";
const Ko = 0.5, uf = 2, JM = 0.05;
function WM(n) {
  const { mode: a, value: r, supportsSynthSpeed: s, onChange: o, onReRenderAtSynthTime: c, disabled: h } = n, m = (r - Ko) / (uf - Ko) * 100, v = x.useId(), p = (g) => o(g, r), b = (g) => o(a, g);
  return /* @__PURE__ */ f.jsxs("div", { className: YM, children: [
    s ? /* @__PURE__ */ f.jsxs("div", { className: GM, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: Zy,
          "data-active": a === "audio",
          onClick: () => p("audio"),
          disabled: h,
          children: "Audio"
        }
      ),
      /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: Zy,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ f.jsxs("div", { className: XM, children: [
      /* @__PURE__ */ f.jsx(
        "input",
        {
          id: v,
          type: "range",
          min: Ko,
          max: uf,
          step: JM,
          value: r,
          disabled: h,
          className: KM,
          style: { "--fill": `${m}%` },
          onChange: (g) => b(Number(g.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": uf,
          "aria-valuenow": r,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: QM, children: `${r.toFixed(2)}×` })
    ] }),
    a === "synth" && s ? /* @__PURE__ */ f.jsxs("div", { className: PM, children: [
      /* @__PURE__ */ f.jsx(
        We,
        {
          variant: "primary",
          size: "sm",
          onClick: c,
          disabled: h || !c,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: ZM, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var eR = "kgszk50", tR = "kgszk51", Jy = "kgszk52", nR = "kgszk53", aR = "kgszk54", vx = "kgszk55", iR = "kgszk56", rR = "kgszk58", Ch = "kgszk59", yx = "kgszk5a", Mh = "kgszk5b", lR = "kgszk5c", sR = "kgszk5d", oR = "kgszk5e", Wy = "kgszk5f", e0 = "kgszk5g", t0 = "kgszk5h", uR = "kgszk5i", cR = "kgszk5j", dR = "kgszk5l", ms = "kgszk5m", ps = "kgszk5n";
const fR = -24, hR = 24, mR = 0.5, pR = -12, gR = 12, vR = 0.5, yR = -30, bR = -6, xR = -12, SR = 0, Qo = -60, cf = -20;
function Rh(n) {
  const {
    state: a,
    onChange: r,
    supportsSynthSpeed: s,
    onReRenderAtSynthTime: o,
    onSliderFlush: c,
    pendingExecution: h = !1,
    disabled: m = !1,
    onApply: v,
    applyLabel: p = "Apply edit"
  } = n, b = (w) => {
    r({ ...a, ...w });
  }, g = TR(a), S = (w) => {
    const j = w.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && c?.();
  };
  return /* @__PURE__ */ f.jsxs("div", { className: eR, onPointerDownCapture: S, children: [
    /* @__PURE__ */ f.jsxs("div", { className: tR, children: [
      g.length === 0 ? /* @__PURE__ */ f.jsx("span", { className: nR, children: "No active edits" }) : /* @__PURE__ */ f.jsxs("span", { className: Jy, children: [
        /* @__PURE__ */ f.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ f.jsx("span", { children: g.join(" · ") })
      ] }),
      h ? /* @__PURE__ */ f.jsxs("span", { className: Jy, "aria-live": "polite", children: [
        /* @__PURE__ */ f.jsx("span", { className: aR, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ f.jsx(
      n0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: fR,
        max: hR,
        step: mR,
        format: NR,
        value: a.volumeDb,
        onChange: (w) => b({ volumeDb: w }),
        disabled: m
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: ms, children: [
      /* @__PURE__ */ f.jsx("span", { className: ps, children: "3-band EQ" }),
      /* @__PURE__ */ f.jsx(
        $M,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: m,
          onChange: (w, j, T, M) => b({ eq3: { low: w, mid: j, high: T, preset: M } })
        }
      )
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: ms, children: [
      /* @__PURE__ */ f.jsx("span", { className: ps, children: "Speed" }),
      /* @__PURE__ */ f.jsx(
        WM,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: s,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: m,
          onChange: (w, j) => b({ speed: { mode: w, value: j } })
        }
      )
    ] }),
    /* @__PURE__ */ f.jsx(
      n0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: pR,
        max: gR,
        step: vR,
        format: CR,
        value: a.pitchSt,
        onChange: (w) => b({ pitchSt: w }),
        disabled: m
      }
    ),
    /* @__PURE__ */ f.jsx(
      wR,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (w) => b({ normalize: w })
      }
    ),
    /* @__PURE__ */ f.jsx(
      ER,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (w, j) => b({ fade: { ...a.fade, inS: w, outS: j } })
      }
    ),
    /* @__PURE__ */ f.jsx(
      jR,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (w, j) => b({ silence: { enabled: w, thresholdDb: j } })
      }
    ),
    v ? /* @__PURE__ */ f.jsxs("div", { className: dR, children: [
      /* @__PURE__ */ f.jsx(
        We,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => r(_u),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ f.jsx(We, { variant: "primary", size: "md", onClick: v, disabled: m, children: p })
    ] }) : null
  ] });
}
function n0(n) {
  const { label: a, sub: r, min: s, max: o, step: c, format: h, value: m, onChange: v, disabled: p } = n, b = (m - s) / (o - s) * 100, g = x.useId();
  return /* @__PURE__ */ f.jsxs("div", { className: vx, children: [
    /* @__PURE__ */ f.jsxs("div", { className: iR, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: g, className: rR, children: a }),
      /* @__PURE__ */ f.jsx("span", { className: yx, children: r })
    ] }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        id: g,
        type: "range",
        min: s,
        max: o,
        step: c,
        value: m,
        disabled: p,
        className: Mh,
        style: { "--fill": `${b}%` },
        onChange: (S) => v(Number(S.target.value)),
        "aria-valuemin": s,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: Ch, children: h(m) })
  ] });
}
function wR({ normalize: n, onChange: a, disabled: r }) {
  const o = n.mode === "loudness" ? { min: yR, max: bR, step: 0.5, suffix: "LUFS" } : { min: xR, max: SR, step: 0.5, suffix: "dB" }, c = MR(n.targetDbOrLufs, o.min, o.max), h = (c - o.min) / (o.max - o.min) * 100, m = (v) => {
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
  return /* @__PURE__ */ f.jsxs("div", { className: ms, children: [
    /* @__PURE__ */ f.jsx("span", { className: ps, children: "Normalize" }),
    /* @__PURE__ */ f.jsx("div", { className: lR, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((v) => {
      const p = v === "peak";
      return /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: sR,
          "data-active": n.mode === v,
          disabled: r || p,
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
    n.mode !== "off" ? /* @__PURE__ */ f.jsxs("div", { className: vx, children: [
      /* @__PURE__ */ f.jsx("span", { className: yx, children: "Target" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: c,
          disabled: r,
          className: Mh,
          style: { "--fill": `${h}%` },
          onChange: (v) => a({ mode: n.mode, targetDbOrLufs: Number(v.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": c,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ f.jsxs("span", { className: Ch, children: [
        c.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function ER({ inS: n, outS: a, onChange: r, disabled: s }) {
  const o = x.useId(), c = x.useId();
  return /* @__PURE__ */ f.jsxs("div", { className: ms, children: [
    /* @__PURE__ */ f.jsx("span", { className: ps, children: "Fade" }),
    /* @__PURE__ */ f.jsxs("div", { className: oR, children: [
      /* @__PURE__ */ f.jsxs("div", { className: Wy, children: [
        /* @__PURE__ */ f.jsx("label", { className: e0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: n,
            disabled: s,
            className: t0,
            onChange: (h) => r(Math.max(0, Number(h.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: Wy, children: [
        /* @__PURE__ */ f.jsx("label", { className: e0, htmlFor: c, children: "Fade out (s)" }),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: c,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: s,
            className: t0,
            onChange: (h) => r(n, Math.max(0, Number(h.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function jR({ enabled: n, thresholdDb: a, onChange: r, disabled: s }) {
  const o = (a - Qo) / (cf - Qo) * 100;
  return /* @__PURE__ */ f.jsxs("div", { className: ms, children: [
    /* @__PURE__ */ f.jsx("span", { className: ps, children: "Silence trim" }),
    /* @__PURE__ */ f.jsxs("div", { className: uR, children: [
      /* @__PURE__ */ f.jsxs("label", { className: cR, children: [
        /* @__PURE__ */ f.jsx(
          "input",
          {
            type: "checkbox",
            checked: n,
            disabled: s,
            onChange: (c) => r(c.target.checked, a)
          }
        ),
        "Enabled"
      ] }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "range",
          min: Qo,
          max: cf,
          step: 1,
          value: a,
          disabled: s || !n,
          className: Mh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (c) => r(n, Number(c.target.value)),
          "aria-valuemin": Qo,
          "aria-valuemax": cf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ f.jsxs("span", { className: Ch, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Vr = 1e-3;
function TR(n) {
  const a = [];
  return Math.abs(n.volumeDb) >= Vr && a.push("gain"), (Math.abs(n.eq3.low) >= Vr || Math.abs(n.eq3.mid) >= Vr || Math.abs(n.eq3.high) >= Vr) && a.push("eq3"), n.speed.mode === "audio" && Math.abs(n.speed.value - 1) >= Vr && a.push("speed"), Math.abs(n.pitchSt) >= Vr && a.push("pitch"), n.normalize.mode !== "off" && a.push("normalize"), n.fade.inS > 0 && a.push("fade-in"), n.fade.outS > 0 && a.push("fade-out"), n.silence.enabled && a.push("silence"), a;
}
function NR(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
function CR(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} st`;
}
function MR(n, a, r) {
  return Number.isFinite(n) ? Math.max(a, Math.min(r, n)) : a;
}
var RR = "skdk4g1", AR = "skdk4g3", _R = "skdk4g4", DR = "skdk4g5", a0 = "skdk4g6", i0 = "skdk4g7", zR = "skdk4g8", r0 = "skdk4g9", l0 = "skdk4ga", OR = "skdk4gb", s0 = "skdk4gc", LR = "skdk4gd", o0 = "skdk4ge", UR = "cgsfgh1", kR = "cgsfgh2", VR = "cgsfgh3", BR = "cgsfgh4", HR = "cgsfgh5", qR = "cgsfgh6", $R = "cgsfgh7", IR = "cgsfgh8", FR = "cgsfgh9", YR = "cgsfgha", GR = "cgsfghb", XR = "cgsfghc", KR = "cgsfghd", QR = "cgsfghe", PR = "cgsfghf", ZR = "cgsfghg", JR = "cgsfghh", WR = "cgsfghi", eA = "cgsfghj", tA = "cgsfghk", nA = "cgsfghl", aA = "cgsfghm", iA = "cgsfghn", rA = "cgsfgho", lA = "cgsfghp";
const Ut = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], is = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, gs = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, bx = 0.05;
function sA(n) {
  let a = null, r = -1 / 0;
  for (const s of Ut) {
    const o = n[s];
    o > r && (r = o, a = s);
  }
  return !a || r <= bx ? null : a;
}
function xx(n, a = 3) {
  return Ut.map((r) => ({ key: r, label: is[r], value: n[r] })).filter((r) => r.value > bx).sort((r, s) => s.value - r.value).slice(0, a);
}
function oA(n) {
  let a = 0;
  for (const r of Ut) a += n[r] * n[r];
  return Math.sqrt(a);
}
function u0(n) {
  const a = xx(n, 2), r = a[0];
  if (!r) return "";
  const s = a[1];
  return !s || r.value - s.value > 0.25 ? df(r.label) : `${df(r.label)} + ${s.label.toLowerCase()}`;
}
function df(n) {
  if (!n) return n;
  const a = n[0];
  return a ? a.toUpperCase() + n.slice(1) : n;
}
function vs(n) {
  const a = { ...gs };
  for (const r of Ut) {
    const s = n[r];
    a[r] = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
  }
  return a;
}
const c0 = 0.05, d0 = 0.2, uA = 22, cA = 320;
function dA(n) {
  const { vec: a, onChange: r, size: s, reduceMotion: o = !1 } = n, [c, h] = x.useState(a), [m, v] = x.useState(null), [p, b] = x.useState(null), g = x.useRef(null), S = x.useRef(a), w = x.useRef(o), j = x.useRef(null), T = x.useRef(0);
  w.current = o, x.useEffect(() => {
    h(a), S.current = a;
  }, [a]);
  const M = x.useCallback(
    (U) => {
      const I = vs(U);
      h(I), S.current = I, r(I);
    },
    [r]
  ), N = x.useCallback((U) => {
    const I = vs(U);
    h(I), S.current = I;
  }, []), L = x.useCallback(
    (U) => {
      const I = g.current;
      if (!I || w.current) return;
      const le = U.clientX - I.centerX, ae = U.clientY - I.centerY, me = Math.sqrt(le * le + ae * ae), ge = s / 2, oe = Math.max(0, Math.min(1, me / ge)), O = { ...S.current, [I.axis]: oe };
      N(O);
    },
    [s, N]
  ), z = x.useCallback(
    (U) => {
      const I = g.current;
      if (I) {
        if (window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), w.current) {
          const le = U.clientX - I.centerX, ae = U.clientY - I.centerY, me = Math.sqrt(le * le + ae * ae), ge = s / 2, oe = Math.max(0, Math.min(1, me / ge)), O = { ...S.current, [I.axis]: oe };
          g.current = null, M(O);
          return;
        }
        g.current = null, M(S.current);
      }
    },
    [M, L, s]
  );
  x.useEffect(() => () => {
    window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), g.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [L, z]);
  const _ = x.useCallback((U, I) => {
    w.current || (T.current += 1, b({ x: U, y: I, key: T.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, cA));
  }, []), J = x.useCallback(
    (U, I, le, ae, me) => {
      const ge = le.getBoundingClientRect(), oe = ge.left + ge.width / 2, O = ge.top + ge.height / 2, q = Ut.indexOf(U) / Ut.length * Math.PI * 2 - Math.PI / 2;
      if (g.current = {
        axis: U,
        pointerId: I,
        centerX: oe,
        centerY: O,
        angle: q
      }, v(U), ae !== void 0 && me !== void 0) {
        const Q = ae - oe, te = me - O, C = Math.sqrt(Q * Q + te * te), K = s / 2, Z = Math.max(0, Math.min(1, C / K)), re = { ...S.current, [U]: Z };
        w.current ? M(re) : N(re);
      }
      window.addEventListener("pointermove", L), window.addEventListener("pointerup", z), window.addEventListener("pointercancel", z);
    },
    [M, L, z, s, N]
  ), G = x.useCallback(
    (U, I) => {
      I.preventDefault();
      const le = I.currentTarget, ae = le.ownerSVGElement ?? le;
      J(U, I.pointerId, ae);
    },
    [J]
  ), W = x.useCallback(
    (U) => {
      const I = U.currentTarget, le = I instanceof SVGSVGElement ? I : I.ownerSVGElement ?? I, ae = le.getBoundingClientRect(), me = ae.left + ae.width / 2, ge = ae.top + ae.height / 2, oe = U.clientX - me, O = U.clientY - ge;
      if (Math.sqrt(oe * oe + O * O) < 8) return;
      let q = Math.atan2(O, oe) * 180 / Math.PI;
      q = ((q + 90) % 360 + 360) % 360;
      let Q = null, te = 999;
      for (let Z = 0; Z < Ut.length; Z++) {
        const re = Ut[Z];
        if (!re) continue;
        const ce = Z / Ut.length * 360, ve = Math.abs((ce - q + 540) % 360 - 180);
        ve < te && (te = ve, Q = re);
      }
      if (!Q || te > uA) return;
      U.preventDefault();
      const C = (U.clientX - ae.left) / ae.width * s, K = (U.clientY - ae.top) / ae.height * s;
      _(C, K), J(Q, U.pointerId, le, U.clientX, U.clientY);
    },
    [J, s, _]
  ), A = x.useCallback(
    (U, I) => {
      const le = S.current[U];
      let ae = le;
      switch (I.key) {
        case "ArrowUp":
        case "ArrowRight":
          ae = le + c0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          ae = le - c0;
          break;
        case "PageUp":
          ae = le + d0;
          break;
        case "PageDown":
          ae = le - d0;
          break;
        case "Home":
          ae = 0;
          break;
        case "End":
          ae = 1;
          break;
        default:
          return;
      }
      I.preventDefault(), v(U), M({ ...S.current, [U]: ae });
    },
    [M]
  );
  return {
    liveVec: c,
    activeAxis: m,
    setActiveAxis: v,
    onPointerDown: G,
    onKeyDown: A,
    onSurfacePointerDown: W,
    surfacePing: p
  };
}
const fA = [0.25, 0.5, 0.75, 1];
function hA({
  vec: n,
  onChange: a,
  size: r = 360,
  readOnly: s = !1,
  reduceMotion: o = !1
}) {
  const c = dA({ vec: n, onChange: a, size: r, reduceMotion: o }), h = r / 2, m = r / 2, v = r / 2 * 0.78, p = x.useMemo(() => mA(h, m, v), [h, m, v]), b = x.useMemo(() => Ut.map((w, j) => {
    const T = rs(c.liveVec[w]), M = p[j];
    return M ? `${h + M.dx * T},${m + M.dy * T}` : "0,0";
  }).join(" "), [p, h, m, c.liveVec]), g = sA(c.liveVec), S = oA(c.liveVec);
  return /* @__PURE__ */ f.jsxs("div", { className: UR, children: [
    /* @__PURE__ */ f.jsx("div", { className: kR, style: { width: r, height: r }, children: /* @__PURE__ */ f.jsxs(
      "svg",
      {
        className: VR,
        viewBox: `0 0 ${r} ${r}`,
        role: "img",
        "aria-label": "8-axis emotion radar",
        onPointerDown: s ? void 0 : c.onSurfacePointerDown,
        style: s ? void 0 : { cursor: "crosshair", touchAction: "none" },
        children: [
          fA.map((w) => /* @__PURE__ */ f.jsx(
            "circle",
            {
              className: BR,
              cx: h,
              cy: m,
              r: v * w
            },
            w
          )),
          Ut.map((w, j) => {
            const T = p[j];
            if (!T) return null;
            const M = h + T.dx * 1.18, N = m + T.dy * 1.18, L = c.activeAxis === w;
            return /* @__PURE__ */ f.jsxs("g", { children: [
              /* @__PURE__ */ f.jsx(
                "line",
                {
                  className: HR,
                  x1: h,
                  y1: m,
                  x2: h + T.dx,
                  y2: m + T.dy
                }
              ),
              /* @__PURE__ */ f.jsx(
                "text",
                {
                  className: `${KR}${L ? ` ${QR}` : ""}`,
                  x: M,
                  y: N,
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  children: is[w]
                }
              )
            ] }, w);
          }),
          Ut.map((w, j) => {
            const T = rs(c.liveVec[w]);
            if (T <= 0.01) return null;
            const M = p[j];
            if (!M) return null;
            const N = c.activeAxis === w;
            return /* @__PURE__ */ f.jsx(
              "line",
              {
                className: `${$R}${N ? ` ${IR}` : ""}`,
                x1: h,
                y1: m,
                x2: h + M.dx * T,
                y2: m + M.dy * T
              },
              `petal-${w}`
            );
          }),
          /* @__PURE__ */ f.jsx("polygon", { className: qR, points: b }),
          c.surfacePing && /* @__PURE__ */ f.jsx(
            "circle",
            {
              className: XR,
              cx: c.surfacePing.x,
              cy: c.surfacePing.y,
              r: 10
            },
            c.surfacePing.key
          ),
          !s && Ut.map((w, j) => {
            const T = rs(c.liveVec[w]), M = p[j];
            if (!M) return null;
            const N = h + M.dx * T, L = m + M.dy * T, z = c.activeAxis === w;
            return /* @__PURE__ */ f.jsxs("g", { children: [
              /* @__PURE__ */ f.jsx(
                "circle",
                {
                  className: FR,
                  cx: N,
                  cy: L,
                  r: 14,
                  tabIndex: 0,
                  role: "slider",
                  "aria-label": `${is[w]} axis`,
                  "aria-valuemin": 0,
                  "aria-valuemax": 1,
                  "aria-valuenow": T,
                  onPointerDown: (_) => c.onPointerDown(w, _),
                  onKeyDown: (_) => c.onKeyDown(w, _),
                  onFocus: () => c.setActiveAxis(w),
                  onBlur: () => c.setActiveAxis(null)
                }
              ),
              /* @__PURE__ */ f.jsx(
                "circle",
                {
                  className: `${YR}${z ? ` ${GR}` : ""}`,
                  cx: N,
                  cy: L,
                  r: 6
                }
              )
            ] }, w);
          })
        ]
      }
    ) }),
    /* @__PURE__ */ f.jsxs("div", { className: PR, children: [
      /* @__PURE__ */ f.jsx("span", { className: ZR, children: g ? is[g].toLowerCase() : "neutral" }),
      /* @__PURE__ */ f.jsxs("span", { className: JR, children: [
        "‖v‖ = ",
        S.toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: WR, role: "group", "aria-label": "Axis values", children: Ut.map((w) => {
      const j = rs(c.liveVec[w]), T = c.activeAxis === w;
      return /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: `${eA}${T ? ` ${tA}` : ""}`,
          onClick: () => a({
            ...c.liveVec,
            [w]: j > 0.05 ? 0 : 0.5
          }),
          "aria-pressed": j > 0.05,
          children: [
            is[w].toLowerCase(),
            /* @__PURE__ */ f.jsx("span", { className: nA, children: j.toFixed(2) })
          ]
        },
        w
      );
    }) })
  ] });
}
function mA(n, a, r) {
  return Ut.map((s, o) => {
    const c = o / Ut.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(c) * r,
      dy: Math.sin(c) * r
    };
  });
}
function rs(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function pA({ vec: n, size: a = 36 }) {
  const r = a / 2, s = a / 2, o = a / 2 * 0.86, c = x.useMemo(() => Ut.map((h, m) => {
    const v = rs(n[h]), p = m / Ut.length * Math.PI * 2 - Math.PI / 2, b = r + Math.cos(p) * o * v, g = s + Math.sin(p) * o * v;
    return `${b},${g}`;
  }).join(" "), [r, s, o, n]);
  return /* @__PURE__ */ f.jsx("span", { className: aA, "aria-hidden": "true", children: /* @__PURE__ */ f.jsxs(
    "svg",
    {
      className: iA,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ f.jsx("circle", { className: rA, cx: r, cy: s, r: o }),
        /* @__PURE__ */ f.jsx("polygon", { className: lA, points: c })
      ]
    }
  ) });
}
var $f = "gvwvwg0", gA = "gvwvwg1", Sx = "gvwvwg2", wx = "gvwvwg3", vA = "gvwvwg4", yA = "gvwvwg5", bA = "gvwvwg6", xA = "gvwvwg7", SA = "gvwvwg8", wA = "gvwvwg9", EA = "gvwvwga", jA = "gvwvwgb", TA = "gvwvwgc", NA = "gvwvwgd", CA = "gvwvwge";
function MA({
  vec: n,
  onSave: a,
  saving: r = !1
}) {
  const [s, o] = x.useState(u0(n)), [c, h] = x.useState(!1), m = xx(n, 3);
  x.useEffect(() => {
    c || o(u0(n));
  }, [n, c]);
  const v = s.trim().length > 0;
  return /* @__PURE__ */ f.jsxs("div", { className: $f, children: [
    /* @__PURE__ */ f.jsx("header", { className: gA, children: /* @__PURE__ */ f.jsx("span", { className: Sx, children: "Save current vector as preset" }) }),
    /* @__PURE__ */ f.jsx("div", { className: wx, children: m.length === 0 ? /* @__PURE__ */ f.jsx("span", { children: "(neutral — drag the radar to set a vector first)" }) : m.map((p) => /* @__PURE__ */ f.jsxs("span", { className: vA, children: [
      p.label.toLowerCase(),
      /* @__PURE__ */ f.jsx("span", { className: yA, children: p.value.toFixed(2) })
    ] }, p.key)) }),
    /* @__PURE__ */ f.jsxs("div", { className: bA, children: [
      /* @__PURE__ */ f.jsx(
        "input",
        {
          className: xA,
          type: "text",
          placeholder: "Preset name",
          value: s,
          onChange: (p) => {
            o(p.target.value), h(!0);
          }
        }
      ),
      /* @__PURE__ */ f.jsx(
        We,
        {
          variant: "primary",
          disabled: !v || r,
          onClick: () => {
            a(s.trim()), h(!1);
          },
          children: r ? "Saving…" : "Save preset"
        }
      )
    ] })
  ] });
}
function RA({
  presets: n,
  activePresetId: a,
  onSelect: r,
  onDelete: s
}) {
  return n.length === 0 ? /* @__PURE__ */ f.jsxs("div", { className: $f, children: [
    /* @__PURE__ */ f.jsx("span", { className: Sx, children: "Preset library" }),
    /* @__PURE__ */ f.jsx("span", { className: wx, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ f.jsxs("div", { className: $f, children: [
    /* @__PURE__ */ f.jsx("span", { className: CA, children: "Preset library" }),
    /* @__PURE__ */ f.jsx("div", { className: SA, children: n.map((o) => {
      const c = AA(o), h = o.presetId === a;
      return /* @__PURE__ */ f.jsxs(
        "div",
        {
          className: `${wA}${h ? ` ${jA}` : ""}`,
          children: [
            /* @__PURE__ */ f.jsxs(
              "button",
              {
                type: "button",
                className: EA,
                onClick: () => r(o),
                "aria-pressed": h,
                children: [
                  /* @__PURE__ */ f.jsx(pA, { vec: c, size: 28 }),
                  /* @__PURE__ */ f.jsx("span", { className: TA, children: o.presetName })
                ]
              }
            ),
            s && /* @__PURE__ */ f.jsx(
              "button",
              {
                type: "button",
                className: NA,
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
const If = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function AA(n) {
  const a = If.reduce(
    (s, o) => ({ ...s, [o]: 0 }),
    {}
  );
  if (!Array.isArray(n.vector)) return a;
  const r = If.reduce(
    (s, o, c) => ({ ...s, [o]: n.vector[c] ?? 0 }),
    a
  );
  return vs(r);
}
function ff(n) {
  return If.map((a) => n[a] ?? 0);
}
const _A = [
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
], DA = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], zA = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], OA = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function LA(n) {
  const a = n.toLowerCase().trim();
  if (!a) return { ...gs };
  const s = a.split(/\s+/).some((h) => DA.includes(h)) ? 1.2 : 1, o = zA.some((h) => a.includes(h)) ? 0.55 : 1, c = { ...gs };
  for (const h of _A) {
    let m = 0;
    for (const v of h.keywords) {
      const p = v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), g = new RegExp(`\\b${p}\\b`).exec(a);
      if (!g) continue;
      const S = g.index, w = a.slice(0, S), j = Math.max(
        w.lastIndexOf(","),
        w.lastIndexOf(";"),
        w.lastIndexOf(" but "),
        w.lastIndexOf(" yet ")
      ), M = w.slice(j >= 0 ? j : 0).slice(-30);
      OA.some((N) => new RegExp(`\\b${N}\\b`).test(M)) || (m += 1);
    }
    if (m > 0) {
      const v = h.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * s * o;
      c[h.axis] = Math.min(1, v);
    }
  }
  return Ut.every((h) => c[h] === 0) && (c.calm = 0.4), vs(c);
}
const UA = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function kA({
  value: n,
  onChange: a,
  deploymentId: r
}) {
  const s = n.mode ?? "none", o = x.useMemo(() => VA(n.vector), [n.vector]), c = n.emotionAlpha ?? 1, [h, m] = x.useState([]), [v, p] = x.useState(null), [b, g] = x.useState(!1), [S, w] = x.useState(null), j = x.useRef(!0);
  x.useEffect(() => (j.current = !0, () => {
    j.current = !1;
  }), []), x.useEffect(() => {
    let G = !1;
    return rx(r).then((W) => {
      G || m(f0(W.presets));
    }).catch((W) => {
      G || p(hf(W));
    }), () => {
      G = !0;
    };
  }, [r]);
  const T = (G) => {
    a({ ...n, mode: G });
  }, M = (G) => {
    a({
      ...n,
      mode: "emotion_vector",
      vector: ff(G)
    }), S && w(null);
  }, N = (G) => {
    const W = Math.max(0, Math.min(1, Number.isFinite(G) ? G : 1));
    a({ ...n, emotionAlpha: W });
  }, L = async (G) => {
    g(!0), p(null);
    try {
      const W = await QN(r, G, ff(o));
      if (!j.current) return;
      m(
        (A) => f0([W, ...A.filter((U) => U.presetId !== W.presetId)])
      ), w(W.presetId);
    } catch (W) {
      j.current && p(hf(W));
    } finally {
      j.current && g(!1);
    }
  }, z = async (G) => {
    const W = h;
    m((A) => A.filter((U) => U.presetId !== G)), S === G && w(null);
    try {
      await PN(r, G);
    } catch (A) {
      j.current && (m(W), p(hf(A)));
    }
  }, _ = (G) => {
    w(G.presetId), a({
      ...n,
      mode: "emotion_vector",
      vector: G.vector
    });
  }, J = (G) => {
    a({ ...n, mode: "qwen_template", qwenTemplate: G });
  };
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsx("div", { className: `${Xy} ${RR}`, children: /* @__PURE__ */ f.jsx(
      hA,
      {
        vec: o,
        onChange: M,
        readOnly: s !== "emotion_vector"
      }
    ) }),
    /* @__PURE__ */ f.jsxs("div", { className: Xy, children: [
      /* @__PURE__ */ f.jsx("div", { className: AR, role: "radiogroup", "aria-label": "Emotion mode", children: UA.map((G) => /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === G.id,
          className: `${_R}${s === G.id ? ` ${DR}` : ""}`,
          onClick: () => T(G.id),
          children: G.label
        },
        G.id
      )) }),
      s === "none" && /* @__PURE__ */ f.jsxs("div", { className: o0, children: [
        "Neutral default. Per-line ",
        /* @__PURE__ */ f.jsx("code", { children: "[Char|emotion_vector:…]" }),
        " overrides still apply when present."
      ] }),
      s === "emotion_vector" && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
        /* @__PURE__ */ f.jsxs("div", { className: a0, children: [
          /* @__PURE__ */ f.jsxs("span", { children: [
            /* @__PURE__ */ f.jsx("span", { className: i0, children: "Alpha" }),
            /* @__PURE__ */ f.jsx("br", {}),
            /* @__PURE__ */ f.jsx("span", { className: zR, children: "Global mix · per-line overrides bypass it" })
          ] }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: c,
              className: r0,
              style: { "--fill": `${c * 100}%` },
              onChange: (G) => N(Number(G.target.value)),
              "aria-label": "Emotion alpha"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: l0, children: [
            (c * 100).toFixed(0),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ f.jsx(
          MA,
          {
            vec: o,
            onSave: L,
            saving: b
          }
        ),
        /* @__PURE__ */ f.jsx(
          RA,
          {
            presets: h,
            activePresetId: S,
            onSelect: _,
            onDelete: z
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ f.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
        /* @__PURE__ */ f.jsx(
          "textarea",
          {
            className: OR,
            placeholder: 'e.g. "Friendly teen, slightly skeptical"',
            value: n.qwenTemplate ?? "",
            onChange: (G) => J(G.target.value)
          }
        ),
        /* @__PURE__ */ f.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
          /* @__PURE__ */ f.jsx(
            We,
            {
              variant: "secondary",
              onClick: () => {
                const G = (n.qwenTemplate ?? "").trim();
                if (!G) return;
                const W = LA(G);
                a({
                  ...n,
                  mode: "emotion_vector",
                  vector: ff(W)
                });
              },
              disabled: !(n.qwenTemplate ?? "").trim(),
              children: "Map to vector →"
            }
          ),
          /* @__PURE__ */ f.jsx("span", { className: s0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
        ] }),
        /* @__PURE__ */ f.jsxs("span", { className: s0, children: [
          "The Qwen prompt is mapped to a vector at synth time. Per-line",
          " ",
          /* @__PURE__ */ f.jsx("code", { children: "[Char|qwen:…]" }),
          " overrides take precedence."
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: a0, children: [
          /* @__PURE__ */ f.jsx("span", { className: i0, children: "Alpha" }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: c,
              className: r0,
              style: { "--fill": `${c * 100}%` },
              onChange: (G) => N(Number(G.target.value)),
              "aria-label": "Emotion alpha"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: l0, children: [
            (c * 100).toFixed(0),
            "%"
          ] })
        ] })
      ] }),
      s === "audio_ref" && /* @__PURE__ */ f.jsx("div", { className: o0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
      v && /* @__PURE__ */ f.jsx("div", { className: LR, children: v })
    ] })
  ] });
}
function VA(n) {
  if (!n || !Array.isArray(n)) return vs(gs);
  const a = { ...gs };
  return Ut.forEach((r, s) => {
    const o = n[s];
    a[r] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function f0(n) {
  return [...n].sort((a, r) => r.updatedAt - a.updatedAt);
}
function hf(n) {
  return n instanceof Jr || n instanceof Error ? n.message : "Unknown error";
}
var BA = "_5u1uau0", Jl = "_5u1uau1", HA = "_5u1uau2", Br = "_5u1uau3", Wl = "_5u1uau4", qA = "_5u1uau5", mf = "_5u1uau6", $A = "_5u1uau7", IA = "_5u1uau8", FA = "_5u1uau9", YA = "_5u1uaua", GA = "_5u1uaub", XA = "_5u1uauc", KA = "_5u1uaud";
const pf = [
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
], QA = ["mp3", "wav", "flac"], Po = 0.5, gf = 2, PA = 0.05, ZA = 0.8, JA = 0.8, WA = 42;
function vf(n, a, r) {
  const s = n[a];
  if (typeof s == "number" && Number.isFinite(s)) return s;
  if (typeof s == "string") {
    const o = Number(s);
    if (Number.isFinite(o)) return o;
  }
  return r;
}
function e2({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: r,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: c,
  generation: h,
  onGenerationChange: m
}) {
  const v = x.useId(), p = x.useId(), b = x.useId(), g = x.useId(), S = x.useId(), w = (z, _) => {
    m({ ...h, [z]: _ });
  }, j = pf.find((z) => z.id === o) ?? pf[0], T = (r - Po) / (gf - Po) * 100, M = vf(h, "temperature", ZA), N = vf(h, "top_p", JA), L = vf(h, "seed", WA);
  return /* @__PURE__ */ f.jsxs("div", { className: BA, children: [
    /* @__PURE__ */ f.jsxs("div", { className: Jl, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: v, className: Br, children: "Format" }),
      /* @__PURE__ */ f.jsx("div", { className: Wl, children: /* @__PURE__ */ f.jsx(
        "select",
        {
          id: v,
          className: qA,
          value: n,
          onChange: (z) => a(z.currentTarget.value),
          children: QA.map((z) => /* @__PURE__ */ f.jsx("option", { value: z, children: z }, z))
        }
      ) })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: Jl, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: p, className: Br, children: "Speed" }),
      /* @__PURE__ */ f.jsxs("div", { className: `${Wl} ${$A}`, children: [
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: IA,
            min: Po,
            max: gf,
            step: PA,
            value: r,
            style: { "--range-pct": `${T}%` },
            onChange: (z) => s(Number(z.currentTarget.value)),
            "aria-valuemin": Po,
            "aria-valuemax": gf,
            "aria-valuenow": r
          }
        ),
        /* @__PURE__ */ f.jsxs("span", { className: FA, children: [
          r.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: HA, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ f.jsx("span", { className: Br, children: "Cache" }),
      /* @__PURE__ */ f.jsx("div", { className: YA, children: pf.map((z) => /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === z.id,
          className: GA,
          onClick: () => c(z.id),
          title: z.help,
          children: z.label
        },
        z.id
      )) }),
      /* @__PURE__ */ f.jsx("p", { className: XA, "aria-live": "polite", children: j.help })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: KA, "aria-hidden": "true" }),
    /* @__PURE__ */ f.jsxs("div", { className: Jl, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: b, className: Br, children: "Temperature" }),
      /* @__PURE__ */ f.jsx("div", { className: Wl, children: /* @__PURE__ */ f.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: mf,
          min: 0,
          max: 2,
          step: 0.05,
          value: M,
          onChange: (z) => w("temperature", Number(z.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: Jl, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: g, className: Br, children: "Top-p" }),
      /* @__PURE__ */ f.jsx("div", { className: Wl, children: /* @__PURE__ */ f.jsx(
        "input",
        {
          id: g,
          type: "number",
          className: mf,
          min: 0,
          max: 1,
          step: 0.05,
          value: N,
          onChange: (z) => w("top_p", Number(z.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: Jl, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: S, className: Br, children: "Seed" }),
      /* @__PURE__ */ f.jsx("div", { className: Wl, children: /* @__PURE__ */ f.jsx(
        "input",
        {
          id: S,
          type: "number",
          className: mf,
          step: 1,
          value: L,
          onChange: (z) => w("seed", Math.trunc(Number(z.currentTarget.value)))
        }
      ) })
    ] })
  ] });
}
var t2 = "iv43qk0", h0 = "iv43qk1", n2 = "iv43qk2", m0 = "iv43qk3", a2 = "iv43qk4", i2 = "iv43qk5", r2 = "iv43qk6", l2 = "iv43qk7", s2 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, o2 = "iv43qkd", u2 = "iv43qke", yf = "iv43qkf", bf = "iv43qkg";
function c2({
  lines: n,
  characterColors: a,
  onLineClick: r
}) {
  if (n.length === 0)
    return /* @__PURE__ */ f.jsx("p", { className: o2, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const s = n.length, o = n.filter((h) => h.character !== null).length, c = s - o;
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: u2, children: [
      /* @__PURE__ */ f.jsxs("span", { className: yf, children: [
        /* @__PURE__ */ f.jsx("span", { className: bf, children: s }),
        "lines"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { className: yf, children: [
        /* @__PURE__ */ f.jsx("span", { className: bf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { className: yf, children: [
        /* @__PURE__ */ f.jsx("span", { className: bf, children: c }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("ol", { className: t2, children: n.map((h) => /* @__PURE__ */ f.jsx(
      d2,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...r ? { onClick: () => r(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function d2({ line: n, color: a, onClick: r }) {
  return n.character === null ? /* @__PURE__ */ f.jsxs("li", { className: `${h0} ${n2}`, children: [
    /* @__PURE__ */ f.jsx("span", { className: m0, children: String(n.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ f.jsx("span", { className: r2, children: n.text })
  ] }) : /* @__PURE__ */ f.jsxs(
    "li",
    {
      className: h0,
      onClick: r,
      style: r ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ f.jsx("span", { className: m0, children: String(n.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ f.jsx("span", { className: a2, style: a ? { color: a } : void 0, children: n.character }),
        /* @__PURE__ */ f.jsxs("span", { className: i2, children: [
          n.text,
          n.override && /* @__PURE__ */ f.jsxs("span", { className: `${l2} ${s2[n.override.kind]}`, children: [
            n.override.kind,
            n.override.label ? ` · ${n.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var f2 = "_46z95i0", h2 = "_46z95i1", m2 = "_46z95i2", p2 = "_46z95i3", g2 = "_46z95i4", v2 = "_46z95i5", y2 = "_46z95i6";
const b2 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function x2({ value: n, onChange: a }) {
  return /* @__PURE__ */ f.jsxs("div", { className: f2, children: [
    /* @__PURE__ */ f.jsx(
      xf,
      {
        label: "Intensity",
        sub: "How emotionally amplified each line reads",
        min: 0,
        max: 1,
        step: 0.01,
        format: (r) => `${Math.round(r * 100)}%`,
        value: n.intensity,
        onChange: (r) => a({ ...n, intensity: r })
      }
    ),
    /* @__PURE__ */ f.jsx(
      xf,
      {
        label: "Pace",
        sub: "Time-stretched playback per line",
        min: 0.5,
        max: 2,
        step: 0.01,
        format: (r) => `${r.toFixed(2)}×`,
        value: n.pace,
        onChange: (r) => a({ ...n, pace: r })
      }
    ),
    /* @__PURE__ */ f.jsx(
      xf,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: -12,
        max: 12,
        step: 0.5,
        format: (r) => `${r >= 0 ? "+" : ""}${r.toFixed(1)} st`,
        value: n.pitchSt,
        onChange: (r) => a({ ...n, pitchSt: r })
      }
    )
  ] });
}
function xf({ label: n, sub: a, min: r, max: s, step: o, format: c, value: h, onChange: m }) {
  const v = (h - r) / (s - r) * 100, p = `perf-${n.toLowerCase()}`;
  return /* @__PURE__ */ f.jsxs("div", { className: h2, children: [
    /* @__PURE__ */ f.jsxs("div", { className: m2, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: p, className: p2, children: n }),
      /* @__PURE__ */ f.jsx("span", { className: g2, children: a })
    ] }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        id: p,
        type: "range",
        min: r,
        max: s,
        step: o,
        value: h,
        className: v2,
        style: { "--fill": `${v}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: y2, children: c(h) })
  ] });
}
var S2 = "qe93dj0", w2 = "qe93dj1", E2 = "qe93dj2", j2 = "qe93dj3", T2 = "qe93dj4", N2 = "qe93dj5", C2 = "qe93dj6", M2 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, R2 = "qe93dja", A2 = "qe93djb";
function _2({ checks: n }) {
  const a = n.filter((r) => r.status === "ok").length;
  return /* @__PURE__ */ f.jsxs("div", { className: S2, children: [
    /* @__PURE__ */ f.jsxs("header", { className: w2, children: [
      /* @__PURE__ */ f.jsx("span", { className: E2, children: "Pre-flight" }),
      /* @__PURE__ */ f.jsxs("span", { className: j2, children: [
        a,
        "/",
        n.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("ul", { className: T2, children: n.map((r) => /* @__PURE__ */ f.jsxs("li", { className: N2, children: [
      /* @__PURE__ */ f.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${C2} ${M2[r.status]}`
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: R2, children: r.label }),
      r.detail && /* @__PURE__ */ f.jsx("span", { className: A2, children: r.detail })
    ] }, r.id)) })
  ] });
}
var D2 = "xq3iim0", z2 = "xq3iim2 xq3iim1", O2 = "xq3iim3 xq3iim1", L2 = "xq3iim4", U2 = "xq3iim5", k2 = "xq3iim6", V2 = "xq3iim7";
function B2({
  deploymentId: n,
  initialVoiceAssetId: a,
  onChange: r
}) {
  const [s, o] = x.useState([]), [c, h] = x.useState(a), [m, v] = x.useState(!0), [p, b] = x.useState(!1), [g, S] = x.useState(null);
  x.useEffect(() => {
    let j = !1;
    return v(!0), hs(n).then(({ voiceAssets: T }) => {
      j || o(T);
    }).catch((T) => {
      j || S(T instanceof Error ? T.message : "Failed to load voices");
    }).finally(() => {
      j || v(!1);
    }), () => {
      j = !0;
    };
  }, [n]);
  async function w(j) {
    b(!0), S(null);
    const T = c;
    h(j);
    try {
      await UT(n, j), r?.(j);
    } catch (M) {
      h(T), S(M instanceof Error ? M.message : "Failed to update default voice");
    } finally {
      b(!1);
    }
  }
  return m ? /* @__PURE__ */ f.jsx("p", { className: k2, children: "Loading voices…" }) : g ? /* @__PURE__ */ f.jsx("p", { className: V2, children: g }) : s.length === 0 ? /* @__PURE__ */ f.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ f.jsx(
    Ts,
    {
      title: "No voices yet.",
      hint: "Upload a voice in Mappings to enable quick mode."
    }
  ) }) : /* @__PURE__ */ f.jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Default voice for quick mode",
      className: D2,
      children: s.map((j) => {
        const T = j.voiceAssetId === c;
        return /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": T,
            disabled: p,
            onClick: () => void w(T ? null : j.voiceAssetId),
            className: T ? O2 : z2,
            children: [
              /* @__PURE__ */ f.jsx("span", { className: L2, children: j.displayName }),
              j.durationMs !== null && j.durationMs !== void 0 && /* @__PURE__ */ f.jsx("span", { className: U2, children: H2(j.durationMs) })
            ]
          },
          j.voiceAssetId
        );
      })
    }
  );
}
function H2(n) {
  const a = n / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const r = Math.floor(a / 60), s = Math.round(a - r * 60);
  return `${r}:${s.toString().padStart(2, "0")}`;
}
var p0 = "_17fbpt30", g0 = "_17fbpt31", v0 = "_17fbpt32", q2 = "_17fbpt33", $2 = "_17fbpt34", I2 = "_17fbpt35", y0 = "_17fbpt36", F2 = "_17fbpt37", Y2 = "_17fbpt38";
const G2 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function X2({
  runs: n,
  deploymentId: a,
  onOpenQueue: r,
  onOpenRun: s,
  emptyHint: o
}) {
  return n.length === 0 ? /* @__PURE__ */ f.jsxs("div", { className: p0, children: [
    /* @__PURE__ */ f.jsx("header", { className: g0, children: /* @__PURE__ */ f.jsx(
      "a",
      {
        className: v0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: r ? (c) => {
          c.preventDefault(), r();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ f.jsx("p", { className: F2, children: "No runs yet." }),
    /* @__PURE__ */ f.jsx("p", { className: Y2, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ f.jsxs("div", { className: p0, children: [
    /* @__PURE__ */ f.jsxs("header", { className: g0, children: [
      /* @__PURE__ */ f.jsx("span", {}),
      /* @__PURE__ */ f.jsx(
        "a",
        {
          className: v0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: r ? (c) => {
            c.preventDefault(), r();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ f.jsx("ul", { className: q2, children: n.slice(0, 5).map((c) => /* @__PURE__ */ f.jsx("li", { children: /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: $2,
        onClick: s ? () => s(c.runId) : void 0,
        children: [
          /* @__PURE__ */ f.jsx("span", { className: I2, children: c.runId }),
          /* @__PURE__ */ f.jsx("span", { className: `${dx.sm} ${fx[G2[c.status] ?? "neutral"]}`, children: c.status }),
          /* @__PURE__ */ f.jsx("span", { className: y0, children: K2(c.startedAt ?? c.queuedAt) }),
          /* @__PURE__ */ f.jsx("span", { className: y0, children: c.kind })
        ]
      }
    ) }, c.runId)) })
  ] });
}
function K2(n) {
  if (!n) return "—";
  const a = n > 1e12 ? Math.floor(n / 1e3) : n, r = new Date(a * 1e3);
  if (Number.isNaN(r.getTime())) return "—";
  const o = Date.now() - r.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : r.toISOString().slice(0, 16).replace("T", " ");
}
function Q2(n) {
  const a = Zr(), [r, s] = x.useState("idle"), [o, c] = x.useState(null), [h, m] = x.useState(/* @__PURE__ */ new Map()), [v, p] = x.useState(null), [b, g] = x.useState(null), S = x.useRef(null);
  x.useEffect(() => () => {
    S.current?.();
  }, []);
  const w = x.useCallback(async () => {
    s("starting"), p(null), m(/* @__PURE__ */ new Map()), g(null);
    try {
      const U = await HT(n.deploymentId, n.createPayload);
      c(U.runId), s("running"), S.current?.(), S.current = xy(
        n.deploymentId,
        U.runId,
        (I) => b0(I, m, s, g, n.deploymentId, U.runId),
        () => s("error")
      );
    } catch (U) {
      s("error"), p(Sf(U));
    }
  }, [n.deploymentId, n.createPayload]), j = x.useCallback(async () => {
    if (o)
      try {
        await qT(n.deploymentId, o);
      } catch (U) {
        p(Sf(U));
      }
  }, [n.deploymentId, o]), T = Array.from(h.values()).sort((U, I) => U.globalIndex - I.globalIndex), M = r === "starting" || r === "running", N = b?.status === "partial", L = T.filter((U) => U.status === "failed"), z = (() => {
    if (r !== "terminal" || L.length === 0) return null;
    const U = /* @__PURE__ */ new Map();
    for (const me of L) {
      const ge = me.failureCategory ?? "unknown";
      U.set(ge, (U.get(ge) ?? 0) + 1);
    }
    let I = "unknown", le = 0;
    for (const [me, ge] of U)
      ge > le && (I = me, le = ge);
    const ae = T.length;
    return { category: I, count: le, total: ae };
  })(), _ = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, J = "Check the run detail page for the per-segment error log.", G = v?.toLowerCase().includes("unmapped") ?? !1, W = n.diagnostics ?? [], A = W.find((U) => U.status === "fail");
  return /* @__PURE__ */ f.jsxs("div", { children: [
    W.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: uM, "aria-label": "Pre-flight checks", children: W.map((U) => /* @__PURE__ */ f.jsxs("li", { className: cM, children: [
      /* @__PURE__ */ f.jsx(vi, { tone: Z2(U.status), children: J2(U.status) }),
      /* @__PURE__ */ f.jsx("span", { className: dM, children: U.label }),
      U.detail && /* @__PURE__ */ f.jsx("span", { className: fM, children: U.detail })
    ] }, U.label)) }),
    v && /* @__PURE__ */ f.jsxs(
      _n,
      {
        severity: "error",
        style: {
          marginBottom: 12,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8
        },
        children: [
          /* @__PURE__ */ f.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ f.jsx("span", { children: v }),
          G && /* @__PURE__ */ f.jsx(
            We,
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
    /* @__PURE__ */ f.jsxs("div", { className: cx, children: [
      /* @__PURE__ */ f.jsx(
        We,
        {
          disabled: !n.canGenerate || M || !!A,
          onClick: w,
          children: r === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ f.jsx(We, { variant: "danger", disabled: !M, onClick: j, children: "Cancel" })
    ] }),
    z && /* @__PURE__ */ f.jsxs(_n, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ f.jsxs("strong", { children: [
        "Run failed — ",
        z.count,
        " of ",
        z.total,
        " segments failed with ",
        /* @__PURE__ */ f.jsx("code", { children: z.category })
      ] }),
      /* @__PURE__ */ f.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: _[z.category] ?? J })
    ] }),
    b?.exportArtifactRef && /* @__PURE__ */ f.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${lx.secondary} ${sx.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    N && b && /* @__PURE__ */ f.jsxs(_n, { severity: "warning", children: [
      /* @__PURE__ */ f.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ f.jsx(
        We,
        {
          variant: "secondary",
          disabled: !!A,
          onClick: async () => {
            try {
              const U = await tx(n.deploymentId, b.runId);
              c(U.runId), m(/* @__PURE__ */ new Map()), g(null), s("running"), S.current?.(), S.current = xy(
                n.deploymentId,
                U.runId,
                (I) => b0(I, m, s, g, n.deploymentId, U.runId),
                () => s("error")
              );
            } catch (U) {
              p(Sf(U)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    T.length > 0 && /* @__PURE__ */ f.jsxs("table", { className: sM, children: [
      /* @__PURE__ */ f.jsx("thead", { children: /* @__PURE__ */ f.jsxs("tr", { children: [
        /* @__PURE__ */ f.jsx("th", { className: ci, children: "#" }),
        /* @__PURE__ */ f.jsx("th", { className: ci, children: "Status" }),
        /* @__PURE__ */ f.jsx("th", { className: ci, children: "Duration" }),
        /* @__PURE__ */ f.jsx("th", { className: ci, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ f.jsx("tbody", { children: T.map((U) => /* @__PURE__ */ f.jsxs("tr", { className: oM, children: [
        /* @__PURE__ */ f.jsx("td", { className: ci, children: U.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ f.jsx("td", { className: ci, children: /* @__PURE__ */ f.jsx(vi, { tone: P2(U.status), children: U.status }) }),
        /* @__PURE__ */ f.jsx("td", { className: ci, children: U.durationMs ? `${U.durationMs} ms` : "—" }),
        /* @__PURE__ */ f.jsx("td", { className: ci, children: U.failureCategory ?? "" })
      ] }, U.globalIndex)) })
    ] })
  ] });
}
async function b0(n, a, r, s, o, c) {
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
      r("terminal");
      try {
        const h = await Nh(o, c);
        s(h);
      } catch {
      }
      return;
  }
}
function P2(n) {
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
function Z2(n) {
  switch (n) {
    case "ok":
      return "success";
    case "warn":
      return "warning";
    case "fail":
      return "danger";
  }
}
function J2(n) {
  switch (n) {
    case "ok":
      return "ok";
    case "warn":
      return "warn";
    case "fail":
      return "stop";
  }
}
function Sf(n) {
  return n instanceof Jr || n instanceof Error ? n.message : "unknown error";
}
const x0 = [
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
function W2(n) {
  const a = Zr(), r = x.useRef(null), { tokens: s, attributions: o, unresolved: c, predictedFilenames: h, characterColor: m } = x.useMemo(
    () => t_(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  ), v = (p) => {
    const b = r.current;
    b && (b.scrollTop = p.currentTarget.scrollTop, b.scrollLeft = p.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: nM, children: [
      /* @__PURE__ */ f.jsx("div", { ref: r, className: aM, "aria-hidden": "true", children: s.map((p, b) => e_(p, b, m)) }),
      /* @__PURE__ */ f.jsx(
        "textarea",
        {
          className: iM,
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
    c.length > 0 && /* @__PURE__ */ f.jsxs(_n, { severity: "error", children: [
      /* @__PURE__ */ f.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      c.map((p) => /* @__PURE__ */ f.jsxs(
        We,
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
    o.length > 0 && /* @__PURE__ */ f.jsxs("div", { children: [
      /* @__PURE__ */ f.jsx("span", { className: Ir, children: "Parsed lines" }),
      /* @__PURE__ */ f.jsx("ul", { className: Py, children: o.map((p) => /* @__PURE__ */ f.jsxs("li", { children: [
        "#",
        p.lineNumber.toString().padStart(3, "0"),
        " [",
        p.character,
        "] ",
        p.text,
        !p.hasMapping && p.character !== "Narrator" && " — unresolved"
      ] }, p.lineNumber)) })
    ] }),
    h.length > 0 && /* @__PURE__ */ f.jsxs("div", { children: [
      /* @__PURE__ */ f.jsx("span", { className: Ir, children: "Predicted filenames" }),
      /* @__PURE__ */ f.jsx("ul", { className: Py, children: h.map((p) => /* @__PURE__ */ f.jsx("li", { children: p }, p)) })
    ] })
  ] });
}
function e_(n, a, r) {
  if (n.kind === "blank")
    return /* @__PURE__ */ f.jsxs("span", { children: [
      n.raw,
      `
`
    ] }, a);
  if (n.kind === "narrator")
    return /* @__PURE__ */ f.jsxs("span", { children: [
      /* @__PURE__ */ f.jsx("span", { className: Qy, children: n.raw }),
      `
`
    ] }, a);
  const s = r.get(n.character?.toLowerCase() ?? "") ?? "currentColor", o = n.hasMapping ? Ky : `${Ky} ${rM}`;
  return /* @__PURE__ */ f.jsxs("span", { children: [
    /* @__PURE__ */ f.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      n.character,
      n.override && /* @__PURE__ */ f.jsxs("span", { className: lM, children: [
        "|",
        n.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: Qy, children: [
      " ",
      n.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function t_(n, a, r) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = [], h = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), v = [], p = /* @__PURE__ */ new Map();
  let b = 0;
  const g = n.split(/\r?\n/);
  let S = 0;
  return g.forEach((w, j) => {
    const T = w.trim();
    if (!T) {
      o.push({ kind: "blank", raw: w });
      return;
    }
    const M = j + 1, N = T.match(s);
    let L = "Narrator", z = T, _, J = !1;
    if (N?.groups) {
      J = !0;
      const U = (N.groups.body ?? "").trim(), I = (N.groups.rest ?? "").trim();
      L = ((U.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", _ = (U.includes("|") ? U.slice(U.indexOf("|") + 1) : "").trim() || void 0, z = I;
    }
    S += 1;
    const G = L.toLowerCase(), W = (m.get(G) ?? 0) + 1;
    m.set(G, W);
    const A = L === "Narrator" || r.has(G);
    if (A || h.add(L), L !== "Narrator" && !p.has(G) && (p.set(G, x0[b % x0.length] ?? "currentColor"), b += 1), J) {
      const U = { kind: "character", raw: w, character: L, text: z, hasMapping: A };
      _ !== void 0 && (U.override = _), o.push(U);
    } else
      o.push({ kind: "narrator", raw: w });
    c.push({ lineNumber: M, character: L, text: z, hasMapping: A }), v.push(
      `${S.toString().padStart(3, "0")}_${n_(L)}_${W.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: c,
    unresolved: Array.from(h),
    predictedFilenames: v,
    characterColor: p
  };
}
function n_(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const wf = [
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
], a_ = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function i_(n) {
  const a = [];
  if (!n) return a;
  const r = n.split(/\r?\n/);
  for (let s = 0; s < r.length; s += 1) {
    const c = (r[s] ?? "").trim();
    if (c.length === 0) continue;
    const h = c.match(a_);
    if (!h || !h.groups) {
      a.push({ idx: s, character: null, text: c, override: null });
      continue;
    }
    const m = h.groups.body ?? "", v = (h.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), g = p.trim();
    if (!g) {
      a.push({ idx: s, character: null, text: v || c, override: null });
      continue;
    }
    const S = g.split(":")[0]?.trim() || null, w = b.join("|").trim(), j = w ? r_(w) : null;
    a.push({
      idx: s,
      character: S,
      text: v,
      override: j
    });
  }
  return a;
}
function r_(n) {
  const a = n.trim();
  if (!a) return { kind: "raw", label: "" };
  const r = a.indexOf(":"), s = r >= 0 ? a.slice(0, r).trim().toLowerCase() : a.toLowerCase(), o = r >= 0 ? a.slice(r + 1).trim() : "";
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
function l_(n) {
  const a = /* @__PURE__ */ new Set(), r = [];
  for (const s of n) {
    if (!s.character) continue;
    const o = s.character.toLowerCase();
    a.has(o) || (a.add(o), r.push(s.character));
  }
  return r;
}
function s_(n) {
  const a = {};
  for (let r = 0; r < n.length; r += 1) {
    const s = n[r];
    s && (a[s] = wf[r % wf.length] ?? wf[0]);
  }
  return a;
}
function o_(n) {
  const a = {};
  for (const r of n)
    r.character && (a[r.character] = (a[r.character] ?? 0) + 1);
  return a;
}
function u_(n) {
  const a = n.workflowCustomised ?? !1, r = n.unmappableFields ?? [], s = c_(n.deployment.displayName, n.deployment.deploymentId);
  return /* @__PURE__ */ f.jsxs("div", { className: IC, children: [
    /* @__PURE__ */ f.jsxs("header", { className: FC, children: [
      /* @__PURE__ */ f.jsx("div", { className: GC, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ f.jsx("div", { className: YC, children: /* @__PURE__ */ f.jsx("h1", { className: XC, children: s }) }),
      /* @__PURE__ */ f.jsx("p", { className: KC, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      n.hero
    ] }),
    a && /* @__PURE__ */ f.jsxs(_n, { severity: "warning", children: [
      /* @__PURE__ */ f.jsx("strong", { children: "Workflow customised." }),
      " ",
      r.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${r.join(", ")}.`,
      " ",
      /* @__PURE__ */ f.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: QC, children: [
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: n.scriptSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: n.parsedDialogueSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: n.castSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: n.emotionSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: n.performanceSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: n.recentRunsSection
        }
      ),
      n.auditSection && /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "07",
          title: "Edit history",
          id: "recipe-section-audit",
          variant: "default",
          children: n.auditSection
        }
      )
    ] })
  ] });
}
function c_(n, a) {
  const r = (n ?? "").trim();
  return !r || r === a ? "Recipe Studio" : r;
}
function $i({ number: n, title: a, id: r, variant: s, children: o }) {
  return /* @__PURE__ */ f.jsxs("section", { className: PC, "aria-labelledby": r, children: [
    /* @__PURE__ */ f.jsx("header", { className: ZC, children: /* @__PURE__ */ f.jsxs("div", { children: [
      /* @__PURE__ */ f.jsxs("div", { className: JC, children: [
        n,
        " / ",
        a
      ] }),
      /* @__PURE__ */ f.jsx("h2", { id: r, className: WC, children: a })
    ] }) }),
    /* @__PURE__ */ f.jsx("div", { className: s === "split" ? tM : eM, children: o })
  ] });
}
const Mn = {
  success(n) {
    Sy.success(n);
  },
  error(n) {
    Sy.error(n);
  }
};
function d_(n) {
  try {
    const a = JSON.parse(n);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function f_() {
  const { deployment: n, mappings: a, runs: r, workflow: s } = js(), [o, c] = x.useState(a), [h, m] = x.useState([]), [v, p] = x.useState([]), [b, g] = x.useState(null), [S, w] = x.useState(_u), [j, T] = x.useState(""), [M, N] = x.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [L, z] = x.useState(n.defaultSpeedFactor ?? 1), [_, J] = x.useState({
    mode: "none",
    emotionAlpha: 1
  }), [G, W] = x.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...n.defaultGenerationOverridesJson ? d_(n.defaultGenerationOverridesJson) : {}
  })), [A, U] = x.useState("use_cache"), [I, le] = x.useState(
    n.defaultVoiceAssetId ?? null
  ), [ae, me] = x.useState(n.defaultVoiceAssetId != null), [ge, oe] = x.useState(b2);
  x.useEffect(() => {
    let fe = !1;
    return hs(n.deploymentId).then((Te) => {
      fe || m(Te.voiceAssets);
    }).catch(() => {
    }), rx(n.deploymentId).then((Te) => {
      fe || p(Te.presets);
    }).catch(() => {
    }), () => {
      fe = !0;
    };
  }, [n.deploymentId]);
  const O = x.useMemo(() => i_(j), [j]), V = x.useMemo(() => l_(O), [O]), q = x.useMemo(() => s_(V), [V]), Q = x.useMemo(() => o_(O), [O]), te = x.useMemo(() => {
    const fe = /* @__PURE__ */ new Map();
    for (const Te of o)
      fe.set(Te.characterName.toLowerCase(), Te);
    return fe;
  }, [o]), C = x.useMemo(() => ae && I ? 0 : V.filter((fe) => !te.has(fe.toLowerCase())).length, [V, te, ae, I]), K = x.useCallback(
    async (fe, Te) => {
      const Ce = te.get(fe.toLowerCase());
      try {
        if (Ce) {
          const Me = await os(n.deploymentId, Ce.mappingId, Te);
          c(
            (Kt) => Kt.map((it) => it.mappingId === Me.mappingId ? Me : it)
          ), Mn.success(`Updated mapping for ${fe}`);
        } else if (Te.speakerVoiceAssetId) {
          const Me = await Th(n.deploymentId, {
            ...Te,
            characterName: fe,
            speakerVoiceAssetId: Te.speakerVoiceAssetId
          });
          c((Kt) => [...Kt, Me]), Mn.success(`Mapped ${fe} to voice`);
        }
      } catch (Me) {
        Mn.error(Me instanceof Error ? Me.message : "mapping failed");
      }
    },
    [te, n.deploymentId]
  ), Z = x.useCallback(
    async (fe) => {
      const Te = te.get(fe.toLowerCase());
      if (Te)
        try {
          await ex(n.deploymentId, Te.mappingId), c((Ce) => Ce.filter((Me) => Me.mappingId !== Te.mappingId)), Mn.success(`Cleared mapping for ${fe}`);
        } catch (Ce) {
          Mn.error(Ce instanceof Error ? Ce.message : "clear failed");
        }
    },
    [te, n.deploymentId]
  ), re = x.useCallback(
    async (fe, Te) => {
      try {
        const Ce = await nx(
          n.deploymentId,
          Te,
          Te.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((Me) => [Ce, ...Me]), await K(fe, { speakerVoiceAssetId: Ce.voiceAssetId });
      } catch (Ce) {
        Mn.error(Ce instanceof Error ? Ce.message : "upload failed");
      }
    },
    [n.deploymentId, K]
  ), ce = x.useCallback((fe) => {
    w(fe);
  }, []), ve = x.useMemo(() => {
    const fe = [], Te = /* @__PURE__ */ new Set();
    for (const Ce of o) {
      const Me = Ce.speakerVoiceAssetId;
      if (!Me || Te.has(Me)) continue;
      Te.add(Me);
      const it = h.find((on) => on.voiceAssetId === Me)?.displayName ?? `${Ce.characterName} · ${Me.slice(0, 8)}`;
      fe.push({ kind: "voice_asset", id: Me, label: it });
    }
    for (const Ce of h)
      Te.has(Ce.voiceAssetId) || (Te.add(Ce.voiceAssetId), fe.push({ kind: "voice_asset", id: Ce.voiceAssetId, label: Ce.displayName }));
    return fe;
  }, [o, h]), ze = x.useCallback(
    async (fe, Te) => {
      if (fe.kind !== "voice_asset") {
        Mn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let Ce;
      try {
        const Me = JSON.parse(Te);
        if (typeof Me != "object" || Me === null || Me.version !== 1 || !Array.isArray(Me.ops))
          throw new Error("snapshot is not a valid EditChain");
        Ce = Me;
      } catch (Me) {
        Mn.error(
          Me instanceof Error ? `Audit snapshot is malformed: ${Me.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const Me = await ax(fe.id, n.deploymentId, {
          chain: Ce
        }), Kt = o.filter((it) => it.speakerVoiceAssetId === fe.id);
        await Promise.all(
          Kt.map(
            (it) => os(n.deploymentId, it.mappingId, {
              voiceAssetChainDigest: Me.chain_digest
            }).catch(() => null)
          )
        ), c(
          (it) => it.map(
            (on) => on.speakerVoiceAssetId === fe.id ? { ...on, voiceAssetChainDigest: Me.chain_digest } : on
          )
        ), Mn.success(`Reverted ${fe.label} to a prior chain`);
      } catch (Me) {
        Mn.error(Me instanceof Error ? Me.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), _e = x.useCallback(
    async (fe) => {
      if (fe.kind !== "voice_asset") {
        Mn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await YN(fe.id, n.deploymentId);
        const Te = o.filter((Ce) => Ce.speakerVoiceAssetId === fe.id);
        await Promise.all(
          Te.map(
            (Ce) => os(n.deploymentId, Ce.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), c(
          (Ce) => Ce.map(
            (Me) => Me.speakerVoiceAssetId === fe.id ? { ...Me, voiceAssetChainDigest: null } : Me
          )
        ), Mn.success(`Cleared edit chain on ${fe.label}`);
      } catch (Te) {
        Mn.error(Te instanceof Error ? Te.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), Be = x.useMemo(
    () => ({
      script: j,
      parserMode: ae ? "raw_text" : "dialogue",
      outputFormat: M,
      speedFactor: L,
      globalEmotion: { ..._, emotionAlpha: ge.intensity },
      generation: G,
      cachePolicy: A
    }),
    [j, ae, M, L, ge.intensity, _, G, A]
  ), kt = x.useMemo(
    () => p_({
      script: j,
      quickMode: ae,
      defaultVoiceAssetId: I,
      characters: V,
      unmappedCount: C,
      globalEmotion: _,
      performance: ge
    }),
    [j, ae, I, V, C, _, ge]
  ), Yt = x.useMemo(
    () => kt.filter((fe) => fe.id !== "performance").map((fe) => ({
      label: fe.label,
      status: fe.status === "ok" ? "ok" : fe.status === "warn" ? "warn" : "fail",
      detail: fe.detail
    })),
    [kt]
  );
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsx(IN, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ f.jsx(
      u_,
      {
        deployment: n,
        workflowCustomised: s.workflow.customised,
        unmappableFields: s.unmappableFields,
        hero: /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          /* @__PURE__ */ f.jsx(gM, { deployment: n }),
          /* @__PURE__ */ f.jsx(
            OC,
            {
              runtimeId: n.backendRuntimePreference ?? "indextts.python",
              device: null,
              sampleRateHz: null,
              lineCount: O.length,
              charCount: j.length,
              estimatedDurationS: O.length * 4
            }
          )
        ] }),
        scriptSection: /* @__PURE__ */ f.jsx(
          h_,
          {
            quickMode: ae,
            onToggleQuickMode: me,
            deployment: n,
            script: j,
            onScriptChange: T,
            outputFormat: M,
            mappingsByLower: te,
            defaultVoiceAssetId: I,
            onDefaultVoiceAssetIdChange: le
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ f.jsx(c2, { lines: O, characterColors: q }),
        castSection: /* @__PURE__ */ f.jsx(DC, { unmappedCount: C, totalCount: V.length, children: V.map((fe) => {
          const Te = te.get(fe.toLowerCase()) ?? null, Ce = q[fe] ?? "#ba9eff";
          return /* @__PURE__ */ f.jsx("li", { style: { listStyle: "none" }, children: /* @__PURE__ */ f.jsx(
            _C,
            {
              characterName: fe,
              color: Ce,
              lineCount: Q[fe] ?? 0,
              mapping: Te,
              voiceAssets: h,
              presets: v,
              active: b === fe,
              onToggle: () => g((Me) => Me === fe ? null : fe),
              onAssignVoiceAsset: (Me) => K(fe, { speakerVoiceAssetId: Me }),
              onAssignPreset: (Me) => K(fe, { defaultVectorPresetId: Me }),
              onUploadFile: (Me) => re(fe, Me),
              onClearMapping: () => Z(fe)
            }
          ) }, fe);
        }) }),
        emotionSection: /* @__PURE__ */ f.jsx(
          kA,
          {
            value: _,
            onChange: J,
            deploymentId: n.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          /* @__PURE__ */ f.jsx(
            x2,
            {
              value: { ...ge, pace: L },
              onChange: (fe) => {
                oe(fe), fe.pace !== L && z(fe.pace);
              }
            }
          ),
          /* @__PURE__ */ f.jsx(
            Rh,
            {
              state: S,
              onChange: ce,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ f.jsx(_2, { checks: kt }),
          /* @__PURE__ */ f.jsx(
            e2,
            {
              outputFormat: M,
              onOutputFormatChange: N,
              speedFactor: L,
              onSpeedFactorChange: z,
              cachePolicy: A,
              onCachePolicyChange: U,
              generation: G,
              onGenerationChange: W
            }
          ),
          /* @__PURE__ */ f.jsx(
            Q2,
            {
              deploymentId: n.deploymentId,
              createPayload: Be,
              canGenerate: j.trim().length > 0,
              diagnostics: Yt
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ f.jsx(X2, { runs: r, deploymentId: n.deploymentId }),
        auditSection: /* @__PURE__ */ f.jsx(
          dC,
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
function h_({
  quickMode: n,
  onToggleQuickMode: a,
  deployment: r,
  script: s,
  onScriptChange: o,
  outputFormat: c,
  mappingsByLower: h,
  defaultVoiceAssetId: m,
  onDefaultVoiceAssetIdChange: v
}) {
  const p = s.length, b = s.trim() ? s.trim().split(/\s+/).length : 0, g = s.trim() ? s.trim().split(/\r?\n/).filter((S) => S.trim()).length : 0;
  return /* @__PURE__ */ f.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ f.jsxs(
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
          /* @__PURE__ */ f.jsxs("label", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ f.jsx(
              "input",
              {
                type: "checkbox",
                checked: n,
                onChange: (S) => a(S.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          n && /* @__PURE__ */ f.jsx(
            B2,
            {
              deploymentId: r.deploymentId,
              initialVoiceAssetId: m,
              onChange: v
            }
          ),
          /* @__PURE__ */ f.jsxs(
            "div",
            {
              style: {
                display: "inline-flex",
                gap: 16,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--on-surface-variant)",
                marginLeft: "auto"
              },
              "aria-live": "polite",
              children: [
                /* @__PURE__ */ f.jsxs("span", { children: [
                  /* @__PURE__ */ f.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: p.toString().padStart(3, "0") }),
                  " ",
                  "chars"
                ] }),
                /* @__PURE__ */ f.jsxs("span", { children: [
                  /* @__PURE__ */ f.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: g.toString().padStart(2, "0") }),
                  " ",
                  "lines"
                ] }),
                /* @__PURE__ */ f.jsxs("span", { children: [
                  /* @__PURE__ */ f.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: b.toString().padStart(3, "0") }),
                  " ",
                  "words"
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ f.jsx(
      W2,
      {
        value: s,
        onChange: o,
        outputFormat: c,
        mappings: h,
        deploymentId: r.deploymentId
      }
    ),
    /* @__PURE__ */ f.jsx(m_, {})
  ] });
}
function m_() {
  return /* @__PURE__ */ f.jsxs(
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
        /* @__PURE__ */ f.jsxs("li", { children: [
          /* @__PURE__ */ f.jsx("code", { style: { color: "var(--accent)" }, children: "[Char]" }),
          " plain line"
        ] }),
        /* @__PURE__ */ f.jsxs("li", { children: [
          /* @__PURE__ */ f.jsx("code", { style: { color: "var(--accent)" }, children: "[Char|emotion_vector:happy=0.7]" }),
          " per-line vector"
        ] }),
        /* @__PURE__ */ f.jsxs("li", { children: [
          /* @__PURE__ */ f.jsx("code", { style: { color: "var(--secondary)" }, children: "[Char|qwen:warm]" }),
          " AI prompt mapping"
        ] }),
        /* @__PURE__ */ f.jsxs("li", { children: [
          /* @__PURE__ */ f.jsx("code", { style: { color: "var(--tertiary)" }, children: "[Char|preset:Bittersweet]" }),
          " saved preset"
        ] }),
        /* @__PURE__ */ f.jsxs("li", { children: [
          /* @__PURE__ */ f.jsx("code", { style: { color: "var(--acid-green)" }, children: "[Char|audio:slow_breath.wav]" }),
          " audio reference"
        ] })
      ]
    }
  );
}
function p_({
  script: n,
  quickMode: a,
  defaultVoiceAssetId: r,
  characters: s,
  unmappedCount: o,
  globalEmotion: c,
  performance: h
}) {
  const m = [], v = n.trim();
  if (!v)
    m.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const p = v.split(/\r?\n/).filter((b) => b.trim()).length;
    m.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${p} lines · ${v.length} chars`
    });
  }
  if (a ? m.push({
    id: "voice",
    status: r ? "ok" : "warn",
    label: "Quick voice",
    detail: r ? "default voice set" : "no default voice"
  }) : s.length === 0 ? m.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? m.push({ id: "cast", status: "ok", label: "Cast", detail: `${s.length} mapped` }) : m.push({
    id: "cast",
    status: "warn",
    label: "Cast",
    detail: `${o} unmapped`
  }), c.mode === "qwen_template" && !c.qwenTemplate?.trim())
    m.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (c.mode === "emotion_vector") {
    const p = c.vector, b = Array.isArray(p) && p.some((g) => Math.abs(g) > 0.01);
    m.push({
      id: "emotion",
      status: b ? "ok" : "info",
      label: "Emotion",
      detail: b ? "8-axis vector" : "neutral vector"
    });
  } else c.mode === "audio_ref" ? m.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : m.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return m.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(h.intensity * 100)}% · pace ${h.pace.toFixed(2)}× · pitch ${h.pitchSt >= 0 ? "+" : ""}${h.pitchSt.toFixed(1)}st`
  }), m;
}
const S0 = /* @__PURE__ */ new Map();
function g_(n, a) {
  const [r, s] = x.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return x.useEffect(() => {
    if (!n || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${n}::${a}`, c = S0.get(o);
    if (c) {
      s({ peaks: c, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), v_(n, a, h.signal).then((m) => {
      h.signal.aborted || (S0.set(o, m), s({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (h.signal.aborted) return;
      const v = m instanceof Error ? m.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: v });
    }), () => h.abort();
  }, [n, a]), r;
}
async function v_(n, a, r) {
  const s = await fetch(n, { signal: r });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (r.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return y_(h, a);
}
function y_(n, a) {
  const r = n.numberOfChannels, s = n.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), h = [];
  for (let m = 0; m < r; m += 1) h.push(n.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const v = m * o, p = Math.min(s, v + o);
    let b = 0;
    for (let g = v; g < p; g += 1) {
      let S = 0;
      for (let j = 0; j < r; j += 1) {
        const T = h[j];
        T && (S += Math.abs(T[g] ?? 0));
      }
      const w = S / r;
      w > b && (b = w);
    }
    c[m] = b;
  }
  return c;
}
const w0 = "(prefers-reduced-motion: reduce)";
function b_() {
  const [n, a] = x.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(w0).matches);
  return x.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const r = window.matchMedia(w0), s = (o) => a(o.matches);
    return r.addEventListener("change", s), () => r.removeEventListener("change", s);
  }, []), n;
}
var x_ = "mquzal0", S_ = "mquzal1", E0 = "mquzal2", j0 = "mquzal3", T0 = "mquzal4", w_ = "mquzal5", N0 = "mquzal6", C0 = "mquzal7";
const E_ = 120, j_ = 720;
function Ex(n) {
  const {
    audioUrl: a,
    durationMs: r,
    startMs: s,
    endMs: o,
    onChangeStart: c,
    onChangeEnd: h,
    isPlaying: m = !1,
    playbackPositionMs: v = 0,
    onSeek: p,
    width: b = j_,
    height: g = E_
  } = n, S = x.useRef(null), w = x.useRef(null), j = x.useRef(null), T = g_(a, b), M = b_();
  x.useEffect(() => {
    T_(S.current, T.peaks, b, g);
  }, [T.peaks, b, g]);
  const N = x.useCallback(
    (A) => {
      const U = w.current?.getBoundingClientRect();
      if (!U || U.width <= 0) return 0;
      const I = Math.max(0, Math.min(1, (A - U.left) / U.width));
      return Math.round(I * r);
    },
    [r]
  );
  x.useEffect(() => {
    const A = (I) => {
      if (!j.current) return;
      const le = N(I.clientX);
      j.current === "start" ? c(Zo(le, 0, o - 1)) : h(Zo(le, s + 1, r));
    }, U = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", A), window.addEventListener("pointerup", U), () => {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", U);
    };
  }, [N, r, o, s, c, h]);
  const L = (A) => (U) => {
    U.preventDefault(), U.stopPropagation(), j.current = A;
  }, z = (A) => {
    !p || A.target.closest("[data-handle]") || p(N(A.clientX));
  }, _ = (A) => (U) => {
    const I = U.shiftKey ? 100 : U.ctrlKey ? 1 : 10;
    let le = 0;
    if (U.key === "ArrowLeft") le = -I;
    else if (U.key === "ArrowRight") le = I;
    else return;
    U.preventDefault(), A === "start" ? c(Zo(s + le, 0, o - 1)) : h(Zo(o + le, s + 1, r));
  }, J = Ef(s, r), G = Ef(o, r), W = Ef(v, r);
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      ref: w,
      className: x_,
      style: { height: g },
      onPointerDown: z,
      children: [
        /* @__PURE__ */ f.jsx(
          "canvas",
          {
            ref: S,
            width: b,
            height: g,
            className: S_,
            "aria-label": "Audio waveform"
          }
        ),
        T.isLoading && /* @__PURE__ */ f.jsx("div", { className: C0, children: "Decoding waveform…" }),
        T.error && /* @__PURE__ */ f.jsx("div", { className: C0, role: "alert", children: T.error }),
        /* @__PURE__ */ f.jsx("div", { className: N0, style: { left: 0, width: `${J}%` } }),
        /* @__PURE__ */ f.jsx(
          "div",
          {
            className: N0,
            style: { left: `${G}%`, right: 0, width: `${100 - G}%` }
          }
        ),
        /* @__PURE__ */ f.jsxs(
          "div",
          {
            className: E0,
            style: { left: `${J}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": r,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: L("start"),
            onKeyDown: _("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: j0, "aria-hidden": "true" }),
              /* @__PURE__ */ f.jsx("span", { className: T0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ f.jsxs(
          "div",
          {
            className: E0,
            style: { left: `${G}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": r,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: L("end"),
            onKeyDown: _("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: j0, "aria-hidden": "true" }),
              /* @__PURE__ */ f.jsx("span", { className: T0, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ f.jsx(
          "div",
          {
            className: w_,
            style: {
              left: `${W}%`,
              transition: M ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function Ef(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function Zo(n, a, r) {
  return Math.max(a, Math.min(r, n));
}
function T_(n, a, r, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, r, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = N_(n, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, r);
  for (let m = 0; m < h; m += 1) {
    const v = a[m] ?? 0, p = Math.max(1, v * (s - 4));
    o.fillRect(m, c - p / 2, 1, p);
  }
}
function N_(n, a, r) {
  return getComputedStyle(n).getPropertyValue(a).trim() || r;
}
var C_ = "r8lfsm0", M_ = "r8lfsm1", R_ = "r8lfsm2", A_ = "r8lfsm3", __ = "r8lfsm4", D_ = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, z_ = "_1b1zchy3", O_ = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, L_ = "_1b1zchy6", U_ = "_1b1zchy7";
const jx = x.createContext("standalone");
function Tx({
  variant: n = "standalone",
  children: a,
  className: r,
  style: s,
  ...o
}) {
  const c = [D_[n], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx(jx.Provider, { value: n, children: /* @__PURE__ */ f.jsx("div", { className: c, style: s, ...o, children: a }) });
}
function Nx({
  title: n,
  meta: a,
  children: r,
  className: s,
  titleId: o
}) {
  const c = x.useContext(jx), h = [z_, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsxs("div", { className: h, children: [
    /* @__PURE__ */ f.jsx("h3", { id: o, className: O_[c], children: n }),
    a ? /* @__PURE__ */ f.jsx("span", { className: L_, children: a }) : null,
    r
  ] });
}
function Cx({
  children: n,
  className: a,
  role: r = "group"
}) {
  const s = [U_, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("div", { className: s, role: r, children: n });
}
const M0 = -16, k_ = 80, V_ = 720;
function B_(n) {
  const { deploymentId: a, runId: r, utterance: s, audioUrl: o, onApplied: c, onError: h, onCancel: m } = n, v = s.durationMs ?? 0, [p, b] = x.useState(() => R0(v)), [g, S] = x.useState(_u), [w, j] = x.useState(!1), [T, M] = x.useState(!1), [N, L] = x.useState(null), [z, _] = x.useState(!1), J = x.useRef(null), G = x.useRef(null), W = x.useRef(null);
  x.useEffect(() => {
    const q = R0(v);
    b(q), S(px(q)), M(!1), L(null), W.current = null;
  }, [s.utteranceId, v]);
  const A = x.useCallback((q) => {
    S(q), b((Q) => mx(Q, q));
  }, []);
  x.useEffect(() => () => G.current?.abort(), []), x.useEffect(() => {
    J.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const U = x.useCallback(
    (q) => {
      q.key === "Escape" && (q.stopPropagation(), m());
    },
    [m]
  ), I = x.useMemo(
    () => p.ops.find((q) => q.mode === "trim"),
    [p.ops]
  ), le = I?.start_ms ?? 0, ae = I?.end_ms ?? Math.max(1, v), me = x.useCallback((q, Q) => {
    b((te) => H_(te, "trim", (C) => ({
      ...C,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(q)),
      end_ms: Math.max(Math.floor(q) + 1, Math.floor(Q))
    })));
  }, []), ge = x.useCallback((q) => me(q, ae), [ae, me]), oe = x.useCallback((q) => me(le, q), [le, me]), O = x.useCallback((q) => {
    M(q), b((Q) => {
      const te = Q.ops.filter((C) => C.mode !== "normalize");
      if (q) {
        const C = {
          id: yn(),
          mode: "normalize",
          target_lufs: M0
        };
        return { ...Q, ops: [...te, C] };
      }
      return { ...Q, ops: te };
    });
  }, []), V = x.useCallback(async () => {
    const q = ix(p, v);
    if (q) {
      L(q.message);
      return;
    }
    if (L(null), z) return;
    G.current?.abort();
    const Q = new AbortController();
    G.current = Q, _(!0);
    try {
      const te = W.current ?? void 0, C = await FN(
        a,
        r,
        s.utteranceId,
        te ? { chain: p, digest_before: te } : { chain: p },
        { signal: Q.signal }
      );
      if (Q.signal.aborted) return;
      W.current = C.chain_digest, c(C);
    } catch (te) {
      if (Q.signal.aborted) return;
      te instanceof Kr && (W.current = te.currentDigest || null);
      const C = te instanceof Kr ? "Edit chain has changed in another tab. Reload to continue." : te instanceof Error ? te.message : "apply failed";
      L(C), h(C);
    } finally {
      Q.signal.aborted || _(!1);
    }
  }, [p, v, z, a, r, s.utteranceId, c, h]);
  return /* @__PURE__ */ f.jsx(Tx, { variant: "nested", children: /* @__PURE__ */ f.jsxs("div", { ref: J, onKeyDown: U, children: [
    /* @__PURE__ */ f.jsx(Nx, { title: "Edit segment", meta: `Source · ${Jo(v)}` }),
    /* @__PURE__ */ f.jsx(
      Ex,
      {
        audioUrl: o,
        durationMs: Math.max(1, v),
        startMs: le,
        endMs: ae,
        onChangeStart: ge,
        onChangeEnd: oe,
        height: k_,
        width: V_
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: C_, children: [
      /* @__PURE__ */ f.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ f.jsxs("span", { className: M_, children: [
        Jo(le),
        " → ",
        Jo(ae),
        " · ",
        Jo(ae - le)
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: R_, children: [
      /* @__PURE__ */ f.jsxs("label", { className: A_, children: [
        /* @__PURE__ */ f.jsx(
          "input",
          {
            type: "checkbox",
            checked: T,
            onChange: (q) => O(q.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ f.jsxs("span", { children: [
          "Normalize to ",
          M0.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: __,
          onClick: () => j((q) => !q),
          "aria-expanded": w,
          children: [
            w ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    w && /* @__PURE__ */ f.jsx(
      Rh,
      {
        state: g,
        onChange: A,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ f.jsxs(Cx, { children: [
      /* @__PURE__ */ f.jsx(We, { size: "sm", onClick: () => void V(), disabled: z, children: z ? "Applying…" : "Apply" }),
      /* @__PURE__ */ f.jsx(We, { variant: "ghost", size: "sm", onClick: m, disabled: z, children: "Cancel" })
    ] }),
    N && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: N })
  ] }) });
}
function R0(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: yn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function H_(n, a, r) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: yn(), mode: a };
    return { ...n, ops: [...n.ops, r(c)] };
  }
  const o = [...n.ops];
  return o[s] = r(o[s]), { ...n, ops: o };
}
function Jo(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
var q_ = "jq2zyb2", $_ = "jq2zyb3", I_ = "jq2zyb4", F_ = "jq2zyb5", Y_ = "jq2zyb6", G_ = "jq2zyb7", X_ = "jq2zyb8", K_ = "jq2zyb9", Q_ = "jq2zyba", P_ = "jq2zybb", Z_ = "jq2zybc", J_ = "jq2zybd", W_ = "jq2zybe", e3 = "jq2zybf jq2zybe", t3 = "jq2zybg", n3 = "jq2zybh", a3 = "jq2zybi", i3 = "jq2zybj", r3 = "jq2zybk", l3 = "jq2zybl", s3 = "jq2zybm", o3 = "jq2zybn", u3 = "jq2zybo", c3 = "jq2zybp", d3 = "jq2zybq", f3 = "jq2zybr", h3 = "jq2zybs", m3 = "jq2zybt", p3 = "jq2zybu", g3 = "jq2zybv", v3 = "jq2zybw", y3 = "jq2zybx", b3 = "jq2zyby", x3 = "jq2zybz", A0 = "jq2zyb10", S3 = "jq2zyb11", w3 = "jq2zyb12", E3 = "jq2zyb13", j3 = "jq2zyb14";
const T3 = ["cancelled", "failed", "partial"], N3 = 2600;
function C3() {
  const { run: n } = js(), a = Zr(), [r, s] = x.useState(n), [o, c] = x.useState(!1), [h, m] = x.useState(null), [v, p] = x.useState(null), [b, g] = x.useState(
    null
  );
  x.useEffect(() => {
    s(n);
  }, [n]), x.useEffect(() => {
    if (!b) return;
    const _ = setTimeout(() => g(null), N3);
    return () => clearTimeout(_);
  }, [b]);
  const S = x.useMemo(() => A3(r), [r]), w = T3.includes(r.status) && r.kind === "batch", j = (r.exportZipStaleAt ?? null) !== null, T = async () => {
    if (r.deploymentId) {
      c(!0), m(null);
      try {
        const { runId: _ } = await tx(r.deploymentId, r.runId);
        a(`/${r.deploymentId}/runs/${_}`);
      } catch (_) {
        m(z3(_));
      } finally {
        c(!1);
      }
    }
  }, M = x.useCallback((_) => {
    p((J) => J === _ ? null : _);
  }, []), N = x.useCallback(() => {
    p(null);
  }, []), L = (_, J) => {
    s((G) => R3(G, _, J)), p(null), g({ message: "Segment edited", severity: "success" });
  }, z = x.useCallback((_) => {
    g({ message: _, severity: "error" });
  }, []);
  return /* @__PURE__ */ f.jsxs("main", { className: q_, children: [
    /* @__PURE__ */ f.jsxs("div", { className: $_, children: [
      /* @__PURE__ */ f.jsxs("header", { className: I_, children: [
        /* @__PURE__ */ f.jsxs("p", { className: F_, children: [
          r.deploymentId ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
            /* @__PURE__ */ f.jsx(Ru, { to: `/${r.deploymentId}/recipe`, className: Y_, children: "← Back to recipe" }),
            /* @__PURE__ */ f.jsx("span", { className: G_, children: "·" })
          ] }) : null,
          /* @__PURE__ */ f.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: X_, children: [
          /* @__PURE__ */ f.jsxs("h1", { className: K_, children: [
            _3(r.kind),
            /* @__PURE__ */ f.jsx("span", { className: Q_, children: r.runId })
          ] }),
          /* @__PURE__ */ f.jsx(vi, { size: "md", tone: O3(r.status), pulse: r.status === "running", children: r.status })
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs("section", { className: P_, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ f.jsx(Wo, { label: "Format", value: r.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ f.jsx(Wo, { label: "Speed", value: `${r.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ f.jsx(
          Wo,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ f.jsx(
          Wo,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      w && /* @__PURE__ */ f.jsxs("section", { className: n3, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ f.jsxs("div", { className: a3, children: [
          /* @__PURE__ */ f.jsx("h2", { id: "run-detail-resume-title", className: i3, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ f.jsx("p", { className: r3, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ f.jsx(We, { size: "lg", disabled: o, onClick: () => void T(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ f.jsx("p", { className: l3, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ f.jsxs(La, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ f.jsxs(JT, { children: [
          /* @__PURE__ */ f.jsx("h2", { id: "run-detail-utterances", className: Ki, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ f.jsxs("span", { className: s3, children: [
            /* @__PURE__ */ f.jsx("span", { className: o3, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ f.jsx("ul", { className: u3, children: r.utterances.map((_) => {
          const J = v === _.utteranceId, G = _.status === "completed" && _.audioArtifactRef !== null && _.audioArtifactRef !== void 0, W = _.derivedArtifactRef ?? _.audioArtifactRef ?? null, A = W ? `/api/v1/artifacts/${encodeURIComponent(W)}/download` : "", U = (_.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ f.jsxs("li", { className: d3, children: [
            /* @__PURE__ */ f.jsxs("div", { className: c3, children: [
              /* @__PURE__ */ f.jsxs("span", { className: m3, children: [
                "#",
                _.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ f.jsx("span", { className: p3, title: _.characterDisplay, children: _.characterDisplay }),
              /* @__PURE__ */ f.jsx("span", { className: g3, title: _.text, children: _.text }),
              /* @__PURE__ */ f.jsxs("span", { className: v3, children: [
                _.cacheHit && /* @__PURE__ */ f.jsx("span", { className: y3, children: "cached" }),
                U && /* @__PURE__ */ f.jsx("span", { className: f3, children: "edited" }),
                _.durationMs ? /* @__PURE__ */ f.jsx("span", { children: D3(_.durationMs) }) : null,
                /* @__PURE__ */ f.jsx(vi, { tone: L3(_.status), children: _.status }),
                G && /* @__PURE__ */ f.jsx(
                  "button",
                  {
                    type: "button",
                    className: h3,
                    onClick: () => M(_.utteranceId),
                    "aria-expanded": J,
                    "aria-label": J ? "Close segment editor" : "Edit segment",
                    children: J ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            J && A && r.deploymentId && /* @__PURE__ */ f.jsx(
              B_,
              {
                deploymentId: r.deploymentId,
                runId: r.runId,
                utterance: _,
                audioUrl: A,
                onApplied: (I) => L(_.utteranceId, I),
                onError: z,
                onCancel: N
              }
            )
          ] }, _.utteranceId);
        }) })
      ] }),
      M3(r, j)
    ] }),
    b && /* @__PURE__ */ f.jsx(
      "div",
      {
        className: j3,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function M3(n, a) {
  if (!n.exportArtifactRef && !a) return null;
  const s = !!n.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ f.jsx("div", { className: b3, children: a ? /* @__PURE__ */ f.jsxs("div", { className: S3, children: [
    /* @__PURE__ */ f.jsx("p", { className: w3, children: s }),
    /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: E3,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ f.jsx("span", { className: A0, children: "↻" })
        ]
      }
    )
  ] }) : n.exportArtifactRef ? /* @__PURE__ */ f.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
      download: !0,
      className: x3,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ f.jsx("span", { className: A0, children: "↓" })
      ]
    }
  ) : null });
}
function R3(n, a, r) {
  const s = n.utterances.map((o) => o.utteranceId !== a ? o : {
    ...o,
    derivedArtifactRef: r.derived_artifact_ref,
    durationMs: r.derived_duration_ms
  });
  return {
    ...n,
    utterances: s,
    exportZipStaleAt: n.exportZipStaleAt ?? Math.floor(Date.now() / 1e3)
  };
}
function Wo({ label: n, value: a, mono: r, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: Z_,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ f.jsx("span", { className: J_, children: n }),
        /* @__PURE__ */ f.jsx("span", { className: r ? e3 : W_, children: a }),
        o !== void 0 && /* @__PURE__ */ f.jsx("span", { className: t3, "aria-hidden": "true" })
      ]
    }
  );
}
function A3(n) {
  const a = n.utterances.length, r = n.utterances.filter((h) => h.status === "completed").length, s = n.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = n.utterances.filter((h) => h.cacheHit).length, c = r > 0 ? Math.round(o / r * 100) : 0;
  return { total: a, completed: r, failed: s, cached: o, cacheRatio: c };
}
function _3(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function D3(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function z3(n) {
  return n instanceof Jr ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function O3(n) {
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
function L3(n) {
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
var U3 = "pcphqj2", k3 = "pcphqj3", V3 = "pcphqj4", B3 = "pcphqj5", H3 = "pcphqj6", q3 = "pcphqj7", $3 = "pcphqj8", I3 = "pcphqj9", F3 = "pcphqja", _0 = "pcphqjb", Y3 = "pcphqjc", G3 = "pcphqjd", X3 = "pcphqje pcphqjd", K3 = "pcphqjf", Q3 = "pcphqjg", P3 = "pcphqjh", Z3 = "pcphqji", J3 = "pcphqjj pcphqji", W3 = "pcphqjk pcphqji", eD = "pcphqjl pcphqji", tD = "pcphqjm", jf = "pcphqjn", Tf = "pcphqjo";
function nD() {
  const [n, a] = x.useState(null), [r, s] = x.useState(null);
  return x.useEffect(() => {
    let o = !1;
    const c = async () => {
      try {
        const m = await vt("/runtime/queue");
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
  }, []), /* @__PURE__ */ f.jsx("main", { className: U3, children: /* @__PURE__ */ f.jsxs("div", { className: k3, children: [
    /* @__PURE__ */ f.jsxs("header", { className: V3, children: [
      /* @__PURE__ */ f.jsx("p", { className: B3, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ f.jsxs("div", { className: H3, children: [
        /* @__PURE__ */ f.jsx("h1", { className: q3, children: "Queue" }),
        /* @__PURE__ */ f.jsx("span", { className: $3, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ f.jsx("p", { className: I3, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    r ? /* @__PURE__ */ f.jsx(_n, { severity: "error", children: r }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ f.jsx(La, { density: "compact", children: /* @__PURE__ */ f.jsx(Ts, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ f.jsxs(La, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ f.jsx("h2", { id: "runtime-queue-section", className: Ki, children: "01 / In flight" }),
      /* @__PURE__ */ f.jsx("ul", { className: F3, children: n.map((o) => {
        const c = o.position === 1;
        return /* @__PURE__ */ f.jsxs(
          "li",
          {
            className: c ? `${_0} ${Y3}` : _0,
            children: [
              /* @__PURE__ */ f.jsx("span", { className: c ? X3 : G3, children: o.position }),
              /* @__PURE__ */ f.jsxs("span", { className: K3, children: [
                /* @__PURE__ */ f.jsx("span", { className: Q3, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ f.jsx("span", { className: P3, children: o.runId })
              ] }),
              /* @__PURE__ */ f.jsx("span", { className: aD(o.kind), children: iD(o.kind) }),
              /* @__PURE__ */ f.jsx("span", { className: tD, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: jf, children: rD(o.etaSeconds) }),
                /* @__PURE__ */ f.jsx("span", { className: Tf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: jf, children: o.utteranceTotal }),
                /* @__PURE__ */ f.jsx("span", { className: Tf, children: "lines" })
              ] }) : /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: jf, children: "—" }),
                /* @__PURE__ */ f.jsx("span", { className: Tf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function aD(n) {
  switch (n) {
    case "batch":
      return J3;
    case "test_line":
      return W3;
    case "resume":
      return eD;
    default:
      return Z3;
  }
}
function iD(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function rD(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), r = n % 60;
  return r === 0 ? `${a}m` : `${a}m ${r}s`;
}
function lD() {
  const { deploymentId: n, prefillCharacterName: a } = js(), r = Zr(), [s, o] = x.useState(a), [c, h] = x.useState(""), [m, v] = x.useState("none"), [p, b] = x.useState(!1), [g, S] = x.useState(null), w = x.useRef(null);
  x.useEffect(() => {
    w.current?.scrollIntoView({ behavior: "smooth", block: "center" }), w.current?.focus();
  }, []);
  const j = async (T) => {
    T.preventDefault(), b(!0), S(null);
    try {
      await Th(n, {
        characterName: s,
        speakerVoiceAssetId: c,
        defaultEmotionMode: m
      }), r(`/${n}/recipe`);
    } catch (M) {
      S(M instanceof Error ? M.message : "failed");
    } finally {
      b(!1);
    }
  };
  return /* @__PURE__ */ f.jsxs("main", { children: [
    /* @__PURE__ */ f.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ f.jsxs("form", { onSubmit: j, children: [
      /* @__PURE__ */ f.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ f.jsx(
          "input",
          {
            ref: w,
            value: s,
            onChange: (T) => o(T.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("label", { children: [
        "Speaker voice asset id",
        /* @__PURE__ */ f.jsx(
          "input",
          {
            value: c,
            onChange: (T) => h(T.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ f.jsxs("select", { value: m, onChange: (T) => v(T.currentTarget.value), children: [
          /* @__PURE__ */ f.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ f.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ f.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ f.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ f.jsx(We, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      g && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: g })
    ] })
  ] });
}
const Mx = x.createContext({});
function Ah(n) {
  const a = x.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const sD = typeof window < "u", Rx = sD ? x.useLayoutEffect : x.useEffect, Du = /* @__PURE__ */ x.createContext(null);
function oD(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function uD(n, a) {
  const r = n.indexOf(a);
  r > -1 && n.splice(r, 1);
}
const yi = (n, a, r) => r > a ? a : r < n ? n : r;
function D0(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let Ns = () => {
}, Qr = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Ns = (n, a, r) => {
  !n && typeof console < "u" && console.warn(D0(a, r));
}, Qr = (n, a, r) => {
  if (!n)
    throw new Error(D0(a, r));
});
const bi = {}, Ax = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function cD(n) {
  return typeof n == "object" && n !== null;
}
const _x = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function Dx(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const Wr = /* @__NO_SIDE_EFFECTS__ */ (n) => n, dD = (n, a) => (r) => a(n(r)), zu = (...n) => n.reduce(dD), zx = /* @__NO_SIDE_EFFECTS__ */ (n, a, r) => {
  const s = a - n;
  return s === 0 ? 1 : (r - n) / s;
};
class Ox {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return oD(this.subscriptions, a), () => uD(this.subscriptions, a);
  }
  notify(a, r, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, r, s);
      else
        for (let c = 0; c < o; c++) {
          const h = this.subscriptions[c];
          h && h(a, r, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Yn = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, ta = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function Lx(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const Ux = (n, a, r) => (((1 - 3 * r + 3 * a) * n + (3 * r - 6 * a)) * n + 3 * a) * n, fD = 1e-7, hD = 12;
function mD(n, a, r, s, o) {
  let c, h, m = 0;
  do
    h = a + (r - a) / 2, c = Ux(h, s, o) - n, c > 0 ? r = h : a = h;
  while (Math.abs(c) > fD && ++m < hD);
  return h;
}
function Cs(n, a, r, s) {
  if (n === a && r === s)
    return Wr;
  const o = (c) => mD(c, 0, 1, n, r);
  return (c) => c === 0 || c === 1 ? c : Ux(o(c), a, s);
}
const kx = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, Vx = (n) => (a) => 1 - n(1 - a), Bx = /* @__PURE__ */ Cs(0.33, 1.53, 0.69, 0.99), _h = /* @__PURE__ */ Vx(Bx), Hx = /* @__PURE__ */ kx(_h), qx = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * _h(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), Dh = (n) => 1 - Math.sin(Math.acos(n)), pD = Vx(Dh), $x = kx(Dh), gD = /* @__PURE__ */ Cs(0.42, 0, 1, 1), vD = /* @__PURE__ */ Cs(0, 0, 0.58, 1), Ix = /* @__PURE__ */ Cs(0.42, 0, 0.58, 1), yD = (n) => Array.isArray(n) && typeof n[0] != "number", Fx = (n) => Array.isArray(n) && typeof n[0] == "number", z0 = {
  linear: Wr,
  easeIn: gD,
  easeInOut: Ix,
  easeOut: vD,
  circIn: Dh,
  circInOut: $x,
  circOut: pD,
  backIn: _h,
  backInOut: Hx,
  backOut: Bx,
  anticipate: qx
}, bD = (n) => typeof n == "string", O0 = (n) => {
  if (Fx(n)) {
    Qr(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, r, s, o] = n;
    return Cs(a, r, s, o);
  } else if (bD(n))
    return Qr(z0[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), z0[n];
  return n;
}, eu = [
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
function xD(n, a) {
  let r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, c = !1;
  const h = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function v(b) {
    h.has(b) && (p.schedule(b), n()), b(m);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (b, g = !1, S = !1) => {
      const j = S && o ? r : s;
      return g && h.add(b), j.add(b), b;
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
        c = !0;
        return;
      }
      o = !0;
      const g = r;
      r = s, s = g, r.forEach(v), r.clear(), o = !1, c && (c = !1, p.process(b));
    }
  };
  return p;
}
const SD = 40;
function Yx(n, a) {
  let r = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => r = !0, h = eu.reduce((z, _) => (z[_] = xD(c), z), {}), { setup: m, read: v, resolveKeyframes: p, preUpdate: b, update: g, preRender: S, render: w, postRender: j } = h, T = () => {
    const z = bi.useManualTiming, _ = z ? o.timestamp : performance.now();
    r = !1, z || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(_ - o.timestamp, SD), 1)), o.timestamp = _, o.isProcessing = !0, m.process(o), v.process(o), p.process(o), b.process(o), g.process(o), S.process(o), w.process(o), j.process(o), o.isProcessing = !1, r && a && (s = !1, n(T));
  }, M = () => {
    r = !0, s = !0, o.isProcessing || n(T);
  };
  return { schedule: eu.reduce((z, _) => {
    const J = h[_];
    return z[_] = (G, W = !1, A = !1) => (r || M(), J.schedule(G, W, A)), z;
  }, {}), cancel: (z) => {
    for (let _ = 0; _ < eu.length; _++)
      h[eu[_]].cancel(z);
  }, state: o, steps: h };
}
const { schedule: Gn, cancel: Ff, state: gu } = /* @__PURE__ */ Yx(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Wr, !0);
let cu;
function wD() {
  cu = void 0;
}
const An = {
  now: () => (cu === void 0 && An.set(gu.isProcessing || bi.useManualTiming ? gu.timestamp : performance.now()), cu),
  set: (n) => {
    cu = n, queueMicrotask(wD);
  }
}, Gx = (n) => (a) => typeof a == "string" && a.startsWith(n), Xx = /* @__PURE__ */ Gx("--"), ED = /* @__PURE__ */ Gx("var(--"), zh = (n) => ED(n) ? jD.test(n.split("/*")[0].trim()) : !1, jD = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function L0(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const el = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, ys = {
  ...el,
  transform: (n) => yi(0, 1, n)
}, tu = {
  ...el,
  default: 1
}, us = (n) => Math.round(n * 1e5) / 1e5, Oh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function TD(n) {
  return n == null;
}
const ND = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Lh = (n, a) => (r) => !!(typeof r == "string" && ND.test(r) && r.startsWith(n) || a && !TD(r) && Object.prototype.hasOwnProperty.call(r, a)), Kx = (n, a, r) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, h, m] = s.match(Oh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(c),
    [r]: parseFloat(h),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, CD = (n) => yi(0, 255, n), Nf = {
  ...el,
  transform: (n) => Math.round(CD(n))
}, Gi = {
  test: /* @__PURE__ */ Lh("rgb", "red"),
  parse: /* @__PURE__ */ Kx("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: r, alpha: s = 1 }) => "rgba(" + Nf.transform(n) + ", " + Nf.transform(a) + ", " + Nf.transform(r) + ", " + us(ys.transform(s)) + ")"
};
function MD(n) {
  let a = "", r = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), r = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), r = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, r += r, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(r, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Yf = {
  test: /* @__PURE__ */ Lh("#"),
  parse: MD,
  transform: Gi.transform
}, Ms = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), fi = /* @__PURE__ */ Ms("deg"), Xr = /* @__PURE__ */ Ms("%"), we = /* @__PURE__ */ Ms("px"), RD = /* @__PURE__ */ Ms("vh"), AD = /* @__PURE__ */ Ms("vw"), U0 = {
  ...Xr,
  parse: (n) => Xr.parse(n) / 100,
  transform: (n) => Xr.transform(n * 100)
}, Fr = {
  test: /* @__PURE__ */ Lh("hsl", "hue"),
  parse: /* @__PURE__ */ Kx("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: r, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Xr.transform(us(a)) + ", " + Xr.transform(us(r)) + ", " + us(ys.transform(s)) + ")"
}, Lt = {
  test: (n) => Gi.test(n) || Yf.test(n) || Fr.test(n),
  parse: (n) => Gi.test(n) ? Gi.parse(n) : Fr.test(n) ? Fr.parse(n) : Yf.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Gi.transform(n) : Fr.transform(n),
  getAnimatableNone: (n) => {
    const a = Lt.parse(n);
    return a.alpha = 0, Lt.transform(a);
  }
}, _D = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function DD(n) {
  return isNaN(n) && typeof n == "string" && (n.match(Oh)?.length || 0) + (n.match(_D)?.length || 0) > 0;
}
const Qx = "number", Px = "color", zD = "var", OD = "var(", k0 = "${}", LD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Pr(n) {
  const a = n.toString(), r = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const m = a.replace(LD, (v) => (Lt.test(v) ? (s.color.push(c), o.push(Px), r.push(Lt.parse(v))) : v.startsWith(OD) ? (s.var.push(c), o.push(zD), r.push(v)) : (s.number.push(c), o.push(Qx), r.push(parseFloat(v))), ++c, k0)).split(k0);
  return { values: r, split: m, indexes: s, types: o };
}
function UD(n) {
  return Pr(n).values;
}
function Zx({ split: n, types: a }) {
  const r = n.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < r; c++)
      if (o += n[c], s[c] !== void 0) {
        const h = a[c];
        h === Qx ? o += us(s[c]) : h === Px ? o += Lt.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function kD(n) {
  return Zx(Pr(n));
}
const VD = (n) => typeof n == "number" ? 0 : Lt.test(n) ? Lt.getAnimatableNone(n) : n, BD = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : VD(n);
function HD(n) {
  const a = Pr(n);
  return Zx(a)(a.values.map((s, o) => BD(s, a.split[o])));
}
const na = {
  test: DD,
  parse: UD,
  createTransformer: kD,
  getAnimatableNone: HD
};
function Cf(n, a, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? n + (a - n) * 6 * r : r < 1 / 2 ? a : r < 2 / 3 ? n + (a - n) * (2 / 3 - r) * 6 : n;
}
function qD({ hue: n, saturation: a, lightness: r, alpha: s }) {
  n /= 360, a /= 100, r /= 100;
  let o = 0, c = 0, h = 0;
  if (!a)
    o = c = h = r;
  else {
    const m = r < 0.5 ? r * (1 + a) : r + a - r * a, v = 2 * r - m;
    o = Cf(v, m, n + 1 / 3), c = Cf(v, m, n), h = Cf(v, m, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(h * 255),
    alpha: s
  };
}
function vu(n, a) {
  return (r) => r > 0 ? a : n;
}
const Rs = (n, a, r) => n + (a - n) * r, Mf = (n, a, r) => {
  const s = n * n, o = r * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, $D = [Yf, Gi, Fr], ID = (n) => $D.find((a) => a.test(n));
function V0(n) {
  const a = ID(n);
  if (Ns(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let r = a.parse(n);
  return a === Fr && (r = qD(r)), r;
}
const B0 = (n, a) => {
  const r = V0(n), s = V0(a);
  if (!r || !s)
    return vu(n, a);
  const o = { ...r };
  return (c) => (o.red = Mf(r.red, s.red, c), o.green = Mf(r.green, s.green, c), o.blue = Mf(r.blue, s.blue, c), o.alpha = Rs(r.alpha, s.alpha, c), Gi.transform(o));
}, Gf = /* @__PURE__ */ new Set(["none", "hidden"]);
function FD(n, a) {
  return Gf.has(n) ? (r) => r <= 0 ? n : a : (r) => r >= 1 ? a : n;
}
function YD(n, a) {
  return (r) => Rs(n, a, r);
}
function Uh(n) {
  return typeof n == "number" ? YD : typeof n == "string" ? zh(n) ? vu : Lt.test(n) ? B0 : KD : Array.isArray(n) ? Jx : typeof n == "object" ? Lt.test(n) ? B0 : GD : vu;
}
function Jx(n, a) {
  const r = [...n], s = r.length, o = n.map((c, h) => Uh(c)(c, a[h]));
  return (c) => {
    for (let h = 0; h < s; h++)
      r[h] = o[h](c);
    return r;
  };
}
function GD(n, a) {
  const r = { ...n, ...a }, s = {};
  for (const o in r)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = Uh(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in s)
      r[c] = s[c](o);
    return r;
  };
}
function XD(n, a) {
  const r = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], h = n.indexes[c][s[c]], m = n.values[h] ?? 0;
    r[o] = m, s[c]++;
  }
  return r;
}
const KD = (n, a) => {
  const r = na.createTransformer(a), s = Pr(n), o = Pr(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Gf.has(n) && !o.values.length || Gf.has(a) && !s.values.length ? FD(n, a) : zu(Jx(XD(s, o), o.values), r) : (Ns(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), vu(n, a));
};
function Wx(n, a, r) {
  return typeof n == "number" && typeof a == "number" && typeof r == "number" ? Rs(n, a, r) : Uh(n)(n, a);
}
const QD = (n) => {
  const a = ({ timestamp: r }) => n(r);
  return {
    start: (r = !0) => Gn.update(a, r),
    stop: () => Ff(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => gu.isProcessing ? gu.timestamp : An.now()
  };
}, e1 = (n, a, r = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / r), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, yu = 2e4;
function kh(n) {
  let a = 0;
  const r = 50;
  let s = n.next(a);
  for (; !s.done && a < yu; )
    a += r, s = n.next(a);
  return a >= yu ? 1 / 0 : a;
}
function PD(n, a = 100, r) {
  const s = r({ ...n, keyframes: [0, a] }), o = Math.min(kh(s), yu);
  return {
    type: "keyframes",
    ease: (c) => s.next(o * c).value / a,
    duration: /* @__PURE__ */ ta(o)
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
function Xf(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const ZD = 12;
function JD(n, a, r) {
  let s = r;
  for (let o = 1; o < ZD; o++)
    s = s - n(s) / a(s);
  return s;
}
const Rf = 1e-3;
function WD({ duration: n = xt.duration, bounce: a = xt.bounce, velocity: r = xt.velocity, mass: s = xt.mass }) {
  let o, c;
  Ns(n <= /* @__PURE__ */ Yn(xt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = yi(xt.minDamping, xt.maxDamping, h), n = yi(xt.minDuration, xt.maxDuration, /* @__PURE__ */ ta(n)), h < 1 ? (o = (p) => {
    const b = p * h, g = b * n, S = b - r, w = Xf(p, h), j = Math.exp(-g);
    return Rf - S / w * j;
  }, c = (p) => {
    const g = p * h * n, S = g * r + r, w = Math.pow(h, 2) * Math.pow(p, 2) * n, j = Math.exp(-g), T = Xf(Math.pow(p, 2), h);
    return (-o(p) + Rf > 0 ? -1 : 1) * ((S - w) * j) / T;
  }) : (o = (p) => {
    const b = Math.exp(-p * n), g = (p - r) * n + 1;
    return -Rf + b * g;
  }, c = (p) => {
    const b = Math.exp(-p * n), g = (r - p) * (n * n);
    return b * g;
  });
  const m = 5 / n, v = JD(o, c, m);
  if (n = /* @__PURE__ */ Yn(n), isNaN(v))
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
const ez = ["duration", "bounce"], tz = ["stiffness", "damping", "mass"];
function H0(n, a) {
  return a.some((r) => n[r] !== void 0);
}
function nz(n) {
  let a = {
    velocity: xt.velocity,
    stiffness: xt.stiffness,
    damping: xt.damping,
    mass: xt.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!H0(n, tz) && H0(n, ez))
    if (a.velocity = 0, n.visualDuration) {
      const r = n.visualDuration, s = 2 * Math.PI / (r * 1.2), o = s * s, c = 2 * yi(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: xt.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const r = WD({ ...n, velocity: 0 });
      a = {
        ...a,
        ...r,
        mass: xt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function bu(n = xt.visualDuration, a = xt.bounce) {
  const r = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = r;
  const c = r.keyframes[0], h = r.keyframes[r.keyframes.length - 1], m = { done: !1, value: c }, { stiffness: v, damping: p, mass: b, duration: g, velocity: S, isResolvedFromDuration: w } = nz({
    ...r,
    velocity: -/* @__PURE__ */ ta(r.velocity || 0)
  }), j = S || 0, T = p / (2 * Math.sqrt(v * b)), M = h - c, N = /* @__PURE__ */ ta(Math.sqrt(v / b)), L = Math.abs(M) < 5;
  s || (s = L ? xt.restSpeed.granular : xt.restSpeed.default), o || (o = L ? xt.restDelta.granular : xt.restDelta.default);
  let z, _, J, G, W, A;
  if (T < 1)
    J = Xf(N, T), G = (j + T * N * M) / J, z = (I) => {
      const le = Math.exp(-T * N * I);
      return h - le * (G * Math.sin(J * I) + M * Math.cos(J * I));
    }, W = T * N * G + M * J, A = T * N * M - G * J, _ = (I) => Math.exp(-T * N * I) * (W * Math.sin(J * I) + A * Math.cos(J * I));
  else if (T === 1) {
    z = (le) => h - Math.exp(-N * le) * (M + (j + N * M) * le);
    const I = j + N * M;
    _ = (le) => Math.exp(-N * le) * (N * I * le - j);
  } else {
    const I = N * Math.sqrt(T * T - 1);
    z = (ge) => {
      const oe = Math.exp(-T * N * ge), O = Math.min(I * ge, 300);
      return h - oe * ((j + T * N * M) * Math.sinh(O) + I * M * Math.cosh(O)) / I;
    };
    const le = (j + T * N * M) / I, ae = T * N * le - M * I, me = T * N * M - le * I;
    _ = (ge) => {
      const oe = Math.exp(-T * N * ge), O = Math.min(I * ge, 300);
      return oe * (ae * Math.sinh(O) + me * Math.cosh(O));
    };
  }
  const U = {
    calculatedDuration: w && g || null,
    velocity: (I) => /* @__PURE__ */ Yn(_(I)),
    next: (I) => {
      if (!w && T < 1) {
        const ae = Math.exp(-T * N * I), me = Math.sin(J * I), ge = Math.cos(J * I), oe = h - ae * (G * me + M * ge), O = /* @__PURE__ */ Yn(ae * (W * me + A * ge));
        return m.done = Math.abs(O) <= s && Math.abs(h - oe) <= o, m.value = m.done ? h : oe, m;
      }
      const le = z(I);
      if (w)
        m.done = I >= g;
      else {
        const ae = /* @__PURE__ */ Yn(_(I));
        m.done = Math.abs(ae) <= s && Math.abs(h - le) <= o;
      }
      return m.value = m.done ? h : le, m;
    },
    toString: () => {
      const I = Math.min(kh(U), yu), le = e1((ae) => U.next(I * ae).value, I, 30);
      return I + "ms " + le;
    },
    toTransition: () => {
    }
  };
  return U;
}
bu.applyToOptions = (n) => {
  const a = PD(n, 100, bu);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ Yn(a.duration), n.type = "keyframes", n;
};
const az = 5;
function t1(n, a, r) {
  const s = Math.max(a - az, 0);
  return Lx(r - n(s), a - s);
}
function Kf({ keyframes: n, velocity: a = 0, power: r = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: h, min: m, max: v, restDelta: p = 0.5, restSpeed: b }) {
  const g = n[0], S = {
    done: !1,
    value: g
  }, w = (A) => m !== void 0 && A < m || v !== void 0 && A > v, j = (A) => m === void 0 ? v : v === void 0 || Math.abs(m - A) < Math.abs(v - A) ? m : v;
  let T = r * a;
  const M = g + T, N = h === void 0 ? M : h(M);
  N !== M && (T = N - g);
  const L = (A) => -T * Math.exp(-A / s), z = (A) => N + L(A), _ = (A) => {
    const U = L(A), I = z(A);
    S.done = Math.abs(U) <= p, S.value = S.done ? N : I;
  };
  let J, G;
  const W = (A) => {
    w(S.value) && (J = A, G = bu({
      keyframes: [S.value, j(S.value)],
      velocity: t1(z, A, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: p,
      restSpeed: b
    }));
  };
  return W(0), {
    calculatedDuration: null,
    next: (A) => {
      let U = !1;
      return !G && J === void 0 && (U = !0, _(A), W(A)), J !== void 0 && A >= J ? G.next(A - J) : (!U && _(A), S);
    }
  };
}
function iz(n, a, r) {
  const s = [], o = r || bi.mix || Wx, c = n.length - 1;
  for (let h = 0; h < c; h++) {
    let m = o(n[h], n[h + 1]);
    if (a) {
      const v = Array.isArray(a) ? a[h] || Wr : a;
      m = zu(v, m);
    }
    s.push(m);
  }
  return s;
}
function rz(n, a, { clamp: r = !0, ease: s, mixer: o } = {}) {
  const c = n.length;
  if (Qr(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const h = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const m = iz(a, s, o), v = m.length, p = (b) => {
    if (h && b < n[0])
      return a[0];
    let g = 0;
    if (v > 1)
      for (; g < n.length - 2 && !(b < n[g + 1]); g++)
        ;
    const S = /* @__PURE__ */ zx(n[g], n[g + 1], b);
    return m[g](S);
  };
  return r ? (b) => p(yi(n[0], n[c - 1], b)) : p;
}
function lz(n, a) {
  const r = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ zx(0, a, s);
    n.push(Rs(r, 1, o));
  }
}
function sz(n) {
  const a = [0];
  return lz(a, n.length - 1), a;
}
function oz(n, a) {
  return n.map((r) => r * a);
}
function uz(n, a) {
  return n.map(() => a || Ix).splice(0, n.length - 1);
}
function cs({ duration: n = 300, keyframes: a, times: r, ease: s = "easeInOut" }) {
  const o = yD(s) ? s.map(O0) : O0(s), c = {
    done: !1,
    value: a[0]
  }, h = oz(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    r && r.length === a.length ? r : sz(a),
    n
  ), m = rz(h, a, {
    ease: Array.isArray(o) ? o : uz(a, o)
  });
  return {
    calculatedDuration: n,
    next: (v) => (c.value = m(v), c.done = v >= n, c)
  };
}
const cz = (n) => n !== null;
function Ou(n, { repeat: a, repeatType: r = "loop" }, s, o = 1) {
  const c = n.filter(cz), m = o < 0 || a && r !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !m || s === void 0 ? c[m] : s;
}
const dz = {
  decay: Kf,
  inertia: Kf,
  tween: cs,
  keyframes: cs,
  spring: bu
};
function n1(n) {
  typeof n.type == "string" && (n.type = dz[n.type]);
}
class Vh {
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
  then(a, r) {
    return this.finished.then(a, r);
  }
}
const fz = (n) => n / 100;
class xu extends Vh {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: r } = this.options;
      r && r.updatedAt !== An.now() && this.tick(An.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    n1(a);
    const { type: r = cs, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: h = 0 } = a;
    let { keyframes: m } = a;
    const v = r || cs;
    v !== cs && typeof m[0] != "number" && (this.mixKeyframes = zu(fz, Wx(m[0], m[1])), m = [0, 100]);
    const p = v({ ...a, keyframes: m });
    c === "mirror" && (this.mirroredGenerator = v({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -h
    })), p.calculatedDuration === null && (p.calculatedDuration = kh(p));
    const { calculatedDuration: b } = p;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const r = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = r;
  }
  tick(a, r = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: c, mirroredGenerator: h, resolvedDuration: m, calculatedDuration: v } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: p = 0, keyframes: b, repeat: g, repeatType: S, repeatDelay: w, type: j, onUpdate: T, finalKeyframe: M } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), r ? this.currentTime = a : this.updateTime(a);
    const N = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), L = this.playbackSpeed >= 0 ? N < 0 : N > o;
    this.currentTime = Math.max(N, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let z = this.currentTime, _ = s;
    if (g) {
      const A = Math.min(this.currentTime, o) / m;
      let U = Math.floor(A), I = A % 1;
      !I && A >= 1 && (I = 1), I === 1 && U--, U = Math.min(U, g + 1), !!(U % 2) && (S === "reverse" ? (I = 1 - I, w && (I -= w / m)) : S === "mirror" && (_ = h)), z = yi(0, 1, I) * m;
    }
    let J;
    L ? (this.delayState.value = b[0], J = this.delayState) : J = _.next(z), c && !L && (J.value = c(J.value));
    let { done: G } = J;
    !L && v !== null && (G = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const W = this.holdTime === null && (this.state === "finished" || this.state === "running" && G);
    return W && j !== Kf && (J.value = Ou(b, this.options, M, this.speed)), T && T(J.value), W && this.finish(), J;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(a, r) {
    return this.finished.then(a, r);
  }
  get duration() {
    return /* @__PURE__ */ ta(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ta(a);
  }
  get time() {
    return /* @__PURE__ */ ta(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ Yn(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    const r = this.generator.next(a).value;
    return t1((s) => this.generator.next(s).value, a, r);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const r = this.playbackSpeed !== a;
    r && this.driver && this.updateTime(An.now()), this.playbackSpeed = a, r && this.driver && (this.time = /* @__PURE__ */ ta(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = QD, startTime: r } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = r ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(An.now()), this.holdTime = this.currentTime;
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
function hz(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Xi = (n) => n * 180 / Math.PI, Qf = (n) => {
  const a = Xi(Math.atan2(n[1], n[0]));
  return Pf(a);
}, mz = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Qf,
  rotateZ: Qf,
  skewX: (n) => Xi(Math.atan(n[1])),
  skewY: (n) => Xi(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, Pf = (n) => (n = n % 360, n < 0 && (n += 360), n), q0 = Qf, $0 = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), I0 = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), pz = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: $0,
  scaleY: I0,
  scale: (n) => ($0(n) + I0(n)) / 2,
  rotateX: (n) => Pf(Xi(Math.atan2(n[6], n[5]))),
  rotateY: (n) => Pf(Xi(Math.atan2(-n[2], n[0]))),
  rotateZ: q0,
  rotate: q0,
  skewX: (n) => Xi(Math.atan(n[4])),
  skewY: (n) => Xi(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function Zf(n) {
  return n.includes("scale") ? 1 : 0;
}
function Jf(n, a) {
  if (!n || n === "none")
    return Zf(a);
  const r = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (r)
    s = pz, o = r;
  else {
    const m = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = mz, o = m;
  }
  if (!o)
    return Zf(a);
  const c = s[a], h = o[1].split(",").map(vz);
  return typeof c == "function" ? c(h) : h[c];
}
const gz = (n, a) => {
  const { transform: r = "none" } = getComputedStyle(n);
  return Jf(r, a);
};
function vz(n) {
  return parseFloat(n.trim());
}
const tl = [
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
], nl = new Set(tl), F0 = (n) => n === el || n === we, yz = /* @__PURE__ */ new Set(["x", "y", "z"]), bz = tl.filter((n) => !yz.has(n));
function xz(n) {
  const a = [];
  return bz.forEach((r) => {
    const s = n.getValue(r);
    s !== void 0 && (a.push([r, s.get()]), s.set(r.startsWith("scale") ? 1 : 0));
  }), a;
}
const gi = {
  // Dimensions
  width: ({ x: n }, { paddingLeft: a = "0", paddingRight: r = "0", boxSizing: s }) => {
    const o = n.max - n.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(r);
  },
  height: ({ y: n }, { paddingTop: a = "0", paddingBottom: r = "0", boxSizing: s }) => {
    const o = n.max - n.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(r);
  },
  top: (n, { top: a }) => parseFloat(a),
  left: (n, { left: a }) => parseFloat(a),
  bottom: ({ y: n }, { top: a }) => parseFloat(a) + (n.max - n.min),
  right: ({ x: n }, { left: a }) => parseFloat(a) + (n.max - n.min),
  // Transform
  x: (n, { transform: a }) => Jf(a, "x"),
  y: (n, { transform: a }) => Jf(a, "y")
};
gi.translateX = gi.x;
gi.translateY = gi.y;
const Qi = /* @__PURE__ */ new Set();
let Wf = !1, eh = !1, th = !1;
function a1() {
  if (eh) {
    const n = Array.from(Qi).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), r = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = xz(s);
      o.length && (r.set(s, o), s.render());
    }), n.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = r.get(s);
      o && o.forEach(([c, h]) => {
        s.getValue(c)?.set(h);
      });
    }), n.forEach((s) => s.measureEndState()), n.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  eh = !1, Wf = !1, Qi.forEach((n) => n.complete(th)), Qi.clear();
}
function i1() {
  Qi.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (eh = !0);
  });
}
function Sz() {
  th = !0, i1(), a1(), th = !1;
}
class Bh {
  constructor(a, r, s, o, c, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = r, this.name = s, this.motionValue = o, this.element = c, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Qi.add(this), Wf || (Wf = !0, Gn.read(i1), Gn.resolveKeyframes(a1))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: r, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const c = o?.get(), h = a[a.length - 1];
      if (c !== void 0)
        a[0] = c;
      else if (s && r) {
        const m = s.readValue(r, h);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = h), o && c === void 0 && o.set(a[0]);
    }
    hz(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Qi.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Qi.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const wz = (n) => n.startsWith("--");
function r1(n, a, r) {
  wz(a) ? n.style.setProperty(a, r) : n.style[a] = r;
}
const Ez = {};
function l1(n, a) {
  const r = /* @__PURE__ */ Dx(n);
  return () => Ez[a] ?? r();
}
const jz = /* @__PURE__ */ l1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), s1 = /* @__PURE__ */ l1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ls = ([n, a, r, s]) => `cubic-bezier(${n}, ${a}, ${r}, ${s})`, Y0 = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ls([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ls([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ls([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ls([0.33, 1.53, 0.69, 0.99])
};
function o1(n, a) {
  if (n)
    return typeof n == "function" ? s1() ? e1(n, a) : "ease-out" : Fx(n) ? ls(n) : Array.isArray(n) ? n.map((r) => o1(r, a) || Y0.easeOut) : Y0[n];
}
function Tz(n, a, r, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: h = "loop", ease: m = "easeOut", times: v } = {}, p = void 0) {
  const b = {
    [a]: r
  };
  v && (b.offset = v);
  const g = o1(m, o);
  Array.isArray(g) && (b.easing = g);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(g) ? "linear" : g,
    fill: "both",
    iterations: c + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return p && (S.pseudoElement = p), n.animate(b, S);
}
function u1(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function Nz({ type: n, ...a }) {
  return u1(n) && s1() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class c1 extends Vh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: r, name: s, keyframes: o, pseudoElement: c, allowFlatten: h = !1, finalKeyframe: m, onComplete: v } = a;
    this.isPseudoElement = !!c, this.allowFlatten = h, this.options = a, Qr(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = Nz(a);
    this.animation = Tz(r, s, o, p, c), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const b = Ou(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), r1(r, s, b), this.animation.cancel();
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
    return /* @__PURE__ */ ta(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ta(a);
  }
  get time() {
    return /* @__PURE__ */ ta(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const r = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Yn(a), r && this.animation.pause();
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
  attachTimeline({ timeline: a, rangeStart: r, rangeEnd: s, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && jz() ? (this.animation.timeline = a, r && (this.animation.rangeStart = r), s && (this.animation.rangeEnd = s), Wr) : o(this);
  }
}
const d1 = {
  anticipate: qx,
  backInOut: Hx,
  circInOut: $x
};
function Cz(n) {
  return n in d1;
}
function Mz(n) {
  typeof n.ease == "string" && Cz(n.ease) && (n.ease = d1[n.ease]);
}
const Af = 10;
class Rz extends c1 {
  constructor(a) {
    Mz(a), n1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: r, onUpdate: s, onComplete: o, element: c, ...h } = this.options;
    if (!r)
      return;
    if (a !== void 0) {
      r.set(a);
      return;
    }
    const m = new xu({
      ...h,
      autoplay: !1
    }), v = Math.max(Af, An.now() - this.startTime), p = yi(0, Af, v - Af), b = m.sample(v).value, { name: g } = this.options;
    c && g && r1(c, g, b), r.setWithVelocity(m.sample(Math.max(0, v - p)).value, b, p), m.stop();
  }
}
const G0 = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(na.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function Az(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let r = 0; r < n.length; r++)
    if (n[r] !== a)
      return !0;
}
function _z(n, a, r, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = n[n.length - 1], h = G0(o, a), m = G0(c, a);
  return Ns(h === m, `You are trying to animate ${a} from "${o}" to "${c}". "${h ? c : o}" is not an animatable value.`, "value-not-animatable"), !h || !m ? !1 : Az(n) || (r === "spring" || u1(r)) && s;
}
function nh(n) {
  n.duration = 0, n.type = "keyframes";
}
const f1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), Dz = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function zz(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && Dz.test(n[a]))
      return !0;
  return !1;
}
const Oz = /* @__PURE__ */ new Set([
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
]), Lz = /* @__PURE__ */ Dx(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Uz(n) {
  const { motionValue: a, name: r, repeatDelay: s, repeatType: o, damping: c, type: h, keyframes: m } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return Lz() && r && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (f1.has(r) || Oz.has(r) && zz(m)) && (r !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !s && o !== "mirror" && c !== 0 && h !== "inertia";
}
const kz = 40;
class Vz extends Vh {
  constructor({ autoplay: a = !0, delay: r = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: h = "loop", keyframes: m, name: v, motionValue: p, element: b, ...g }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = An.now();
    const S = {
      autoplay: a,
      delay: r,
      type: s,
      repeat: o,
      repeatDelay: c,
      repeatType: h,
      name: v,
      motionValue: p,
      element: b,
      ...g
    }, w = b?.KeyframeResolver || Bh;
    this.keyframeResolver = new w(m, (j, T, M) => this.onKeyframesResolved(j, T, S, !M), v, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, r, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: h, velocity: m, delay: v, isHandoff: p, onUpdate: b } = s;
    this.resolvedAt = An.now();
    let g = !0;
    _z(a, c, h, m) || (g = !1, (bi.instantAnimations || !v) && b?.(Ou(a, s, r)), a[0] = a[a.length - 1], nh(s), s.repeat = 0);
    const w = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > kz ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: r,
      ...s,
      keyframes: a
    }, j = g && !p && Uz(w), T = w.motionValue?.owner?.current;
    let M;
    if (j)
      try {
        M = new Rz({
          ...w,
          element: T
        });
      } catch {
        M = new xu(w);
      }
    else
      M = new xu(w);
    M.finished.then(() => {
      this.notifyFinished();
    }).catch(Wr), this.pendingTimeline && (this.stopTimeline = M.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = M;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, r) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), Sz()), this._animation;
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
function h1(n, a, r, s = 0, o = 1) {
  const c = Array.from(n).sort((p, b) => p.sortNodePosition(b)).indexOf(a), h = n.size, m = (h - 1) * s;
  return typeof r == "function" ? r(c, h) : o === 1 ? c * s : m - c * s;
}
const Bz = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Hz(n) {
  const a = Bz.exec(n);
  if (!a)
    return [,];
  const [, r, s, o] = a;
  return [`--${r ?? s}`, o];
}
const qz = 4;
function m1(n, a, r = 1) {
  Qr(r <= qz, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = Hz(n);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const h = c.trim();
    return Ax(h) ? parseFloat(h) : h;
  }
  return zh(o) ? m1(o, a, r + 1) : o;
}
const $z = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Iz = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Fz = {
  type: "keyframes",
  duration: 0.8
}, Yz = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Gz = (n, { keyframes: a }) => a.length > 2 ? Fz : nl.has(n) ? n.startsWith("scale") ? Iz(a[1]) : $z : Yz;
function p1(n, a) {
  if (n?.inherit && a) {
    const { inherit: r, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function g1(n, a) {
  const r = n?.[a] ?? n?.default ?? n;
  return r !== n ? p1(r, n) : r;
}
const Xz = /* @__PURE__ */ new Set([
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
function Kz(n) {
  for (const a in n)
    if (!Xz.has(a))
      return !0;
  return !1;
}
const Qz = (n, a, r, s = {}, o, c) => (h) => {
  const m = g1(s, n) || {}, v = m.delay || s.delay || 0;
  let { elapsed: p = 0 } = s;
  p = p - /* @__PURE__ */ Yn(v);
  const b = {
    keyframes: Array.isArray(r) ? r : [null, r],
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
  Kz(m) || Object.assign(b, Gz(n, b)), b.duration && (b.duration = /* @__PURE__ */ Yn(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ Yn(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let g = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (nh(b), b.delay === 0 && (g = !0)), (bi.instantAnimations || bi.skipAnimations || o?.shouldSkipAnimations) && (g = !0, nh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, g && !c && a.get() !== void 0) {
    const S = Ou(b.keyframes, m);
    if (S !== void 0) {
      Gn.update(() => {
        b.onUpdate(S), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new xu(b) : new Vz(b);
};
function X0(n) {
  const a = [{}, {}];
  return n?.values.forEach((r, s) => {
    a[0][s] = r.get(), a[1][s] = r.getVelocity();
  }), a;
}
function Hh(n, a, r, s) {
  if (typeof a == "function") {
    const [o, c] = X0(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, c] = X0(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  return a;
}
function Pi(n, a, r) {
  const s = n.getProps();
  return Hh(s, a, r !== void 0 ? r : s.custom, n);
}
const v1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...tl
]), K0 = 30, Pz = (n) => !isNaN(parseFloat(n));
class Zz {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, r = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = An.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = r.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = An.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = Pz(this.current));
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
  on(a, r) {
    this.events[a] || (this.events[a] = new Ox());
    const s = this.events[a].add(r);
    return a === "change" ? () => {
      s(), Gn.read(() => {
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
  attach(a, r) {
    this.passiveEffect = a, this.stopPassiveEffect = r;
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
  setWithVelocity(a, r, s) {
    this.set(r), this.prev = void 0, this.prevFrameValue = a, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(a, r = !0) {
    this.updateAndNotify(a), this.prev = a, this.prevUpdatedAt = this.prevFrameValue = void 0, r && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
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
    const a = An.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > K0)
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, K0);
    return Lx(parseFloat(this.current) - parseFloat(this.prevFrameValue), r);
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
    return this.stop(), new Promise((r) => {
      this.hasAnimated = !0, this.animation = a(r), this.events.animationStart && this.events.animationStart.notify();
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
function Su(n, a) {
  return new Zz(n, a);
}
const ah = (n) => Array.isArray(n);
function Jz(n, a, r) {
  n.hasValue(a) ? n.getValue(a).set(r) : n.addValue(a, Su(r));
}
function Wz(n) {
  return ah(n) ? n[n.length - 1] || 0 : n;
}
function e5(n, a) {
  const r = Pi(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = r || {};
  c = { ...c, ...s };
  for (const h in c) {
    const m = Wz(c[h]);
    Jz(n, h, m);
  }
}
const sn = (n) => !!(n && n.getVelocity);
function t5(n) {
  return !!(sn(n) && n.add);
}
function n5(n, a) {
  const r = n.getValue("willChange");
  if (t5(r))
    return r.add(a);
  if (!r && bi.WillChange) {
    const s = new bi.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function qh(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const a5 = "framerAppearId", y1 = "data-" + qh(a5);
function i5(n) {
  return n.props[y1];
}
function r5({ protectedKeys: n, needsAnimating: a }, r) {
  const s = n.hasOwnProperty(r) && a[r] !== !0;
  return a[r] = !1, s;
}
function b1(n, a, { delay: r = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: h, ...m } = a;
  const v = n.getDefaultTransition();
  c = c ? p1(c, v) : v;
  const p = c?.reduceMotion;
  s && (c = s);
  const b = [], g = o && n.animationState && n.animationState.getState()[o];
  for (const S in m) {
    const w = n.getValue(S, n.latestValues[S] ?? null), j = m[S];
    if (j === void 0 || g && r5(g, S))
      continue;
    const T = {
      delay: r,
      ...g1(c || {}, S)
    }, M = w.get();
    if (M !== void 0 && !w.isAnimating() && !Array.isArray(j) && j === M && !T.velocity) {
      Gn.update(() => w.set(j));
      continue;
    }
    let N = !1;
    if (window.MotionHandoffAnimation) {
      const _ = i5(n);
      if (_) {
        const J = window.MotionHandoffAnimation(_, S, Gn);
        J !== null && (T.startTime = J, N = !0);
      }
    }
    n5(n, S);
    const L = p ?? n.shouldReduceMotion;
    w.start(Qz(S, w, j, L && v1.has(S) ? { type: !1 } : T, n, N));
    const z = w.animation;
    z && b.push(z);
  }
  if (h) {
    const S = () => Gn.update(() => {
      h && e5(n, h);
    });
    b.length ? Promise.all(b).then(S) : S();
  }
  return b;
}
function ih(n, a, r = {}) {
  const s = Pi(n, a, r.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  r.transitionOverride && (o = r.transitionOverride);
  const c = s ? () => Promise.all(b1(n, s, r)) : () => Promise.resolve(), h = n.variantChildren && n.variantChildren.size ? (v = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: g } = o;
    return l5(n, a, v, p, b, g, r);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [v, p] = m === "beforeChildren" ? [c, h] : [h, c];
    return v().then(() => p());
  } else
    return Promise.all([c(), h(r.delay)]);
}
function l5(n, a, r = 0, s = 0, o = 0, c = 1, h) {
  const m = [];
  for (const v of n.variantChildren)
    v.notify("AnimationStart", a), m.push(ih(v, a, {
      ...h,
      delay: r + (typeof s == "function" ? 0 : s) + h1(n.variantChildren, v, s, o, c)
    }).then(() => v.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function s5(n, a, r = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => ih(n, c, r));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = ih(n, a, r);
  else {
    const o = typeof a == "function" ? Pi(n, a, r.custom) : a;
    s = Promise.all(b1(n, o, r));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const o5 = {
  test: (n) => n === "auto",
  parse: (n) => n
}, x1 = (n) => (a) => a.test(n), S1 = [el, we, Xr, fi, AD, RD, o5], Q0 = (n) => S1.find(x1(n));
function u5(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || _x(n) : !0;
}
const c5 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function d5(n) {
  const [a, r] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = r.match(Oh) || [];
  if (!s)
    return n;
  const o = r.replace(s, "");
  let c = c5.has(a) ? 1 : 0;
  return s !== r && (c *= 100), a + "(" + c + o + ")";
}
const f5 = /\b([a-z-]*)\(.*?\)/gu, rh = {
  ...na,
  getAnimatableNone: (n) => {
    const a = n.match(f5);
    return a ? a.map(d5).join(" ") : n;
  }
}, lh = {
  ...na,
  getAnimatableNone: (n) => {
    const a = na.parse(n);
    return na.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, P0 = {
  ...el,
  transform: Math.round
}, h5 = {
  rotate: fi,
  rotateX: fi,
  rotateY: fi,
  rotateZ: fi,
  scale: tu,
  scaleX: tu,
  scaleY: tu,
  scaleZ: tu,
  skew: fi,
  skewX: fi,
  skewY: fi,
  distance: we,
  translateX: we,
  translateY: we,
  translateZ: we,
  x: we,
  y: we,
  z: we,
  perspective: we,
  transformPerspective: we,
  opacity: ys,
  originX: U0,
  originY: U0,
  originZ: we
}, $h = {
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
  ...h5,
  zIndex: P0,
  // SVG
  fillOpacity: ys,
  strokeOpacity: ys,
  numOctaves: P0
}, m5 = {
  ...$h,
  // Color props
  color: Lt,
  backgroundColor: Lt,
  outlineColor: Lt,
  fill: Lt,
  stroke: Lt,
  // Border props
  borderColor: Lt,
  borderTopColor: Lt,
  borderRightColor: Lt,
  borderBottomColor: Lt,
  borderLeftColor: Lt,
  filter: rh,
  WebkitFilter: rh,
  mask: lh,
  WebkitMask: lh
}, w1 = (n) => m5[n], p5 = /* @__PURE__ */ new Set([rh, lh]);
function E1(n, a) {
  let r = w1(n);
  return p5.has(r) || (r = na), r.getAnimatableNone ? r.getAnimatableNone(a) : void 0;
}
const g5 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function v5(n, a, r) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const c = n[s];
    typeof c == "string" && !g5.has(c) && Pr(c).values.length && (o = n[s]), s++;
  }
  if (o && r)
    for (const c of a)
      n[c] = E1(r, o);
}
class y5 extends Bh {
  constructor(a, r, s, o, c) {
    super(a, r, s, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: r, name: s } = this;
    if (!r || !r.current)
      return;
    super.readKeyframes();
    for (let b = 0; b < a.length; b++) {
      let g = a[b];
      if (typeof g == "string" && (g = g.trim(), zh(g))) {
        const S = m1(g, r.current);
        S !== void 0 && (a[b] = S), b === a.length - 1 && (this.finalKeyframe = g);
      }
    }
    if (this.resolveNoneKeyframes(), !v1.has(s) || a.length !== 2)
      return;
    const [o, c] = a, h = Q0(o), m = Q0(c), v = L0(o), p = L0(c);
    if (v !== p && gi[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== m)
      if (F0(h) && F0(m))
        for (let b = 0; b < a.length; b++) {
          const g = a[b];
          typeof g == "string" && (a[b] = parseFloat(g));
        }
      else gi[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: r } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || u5(a[o])) && s.push(o);
    s.length && v5(a, s, r);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: r, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = gi[s](a.measureViewportBox(), window.getComputedStyle(a.current)), r[0] = this.measuredOrigin;
    const o = r[r.length - 1];
    o !== void 0 && a.getValue(s, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: r, unresolvedKeyframes: s } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(r);
    o && o.jump(this.measuredOrigin, !1);
    const c = s.length - 1, h = s[c];
    s[c] = gi[r](a.measureViewportBox(), window.getComputedStyle(a.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([m, v]) => {
      a.getValue(m).set(v);
    }), this.resolveNoneKeyframes();
  }
}
function b5(n, a, r) {
  if (n == null)
    return [];
  if (n instanceof EventTarget)
    return [n];
  if (typeof n == "string") {
    let s = document;
    const o = r?.[n] ?? s.querySelectorAll(n);
    return o ? Array.from(o) : [];
  }
  return Array.from(n).filter((s) => s != null);
}
const j1 = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function du(n) {
  return cD(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: x5 } = /* @__PURE__ */ Yx(queueMicrotask, !1), S5 = {
  y: !1
};
function w5() {
  return S5.y;
}
function T1(n, a) {
  const r = b5(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [r, o, () => s.abort()];
}
function E5(n) {
  return !(n.pointerType === "touch" || w5());
}
function j5(n, a, r = {}) {
  const [s, o, c] = T1(n, r);
  return s.forEach((h) => {
    let m = !1, v = !1, p;
    const b = () => {
      h.removeEventListener("pointerleave", j);
    }, g = (M) => {
      p && (p(M), p = void 0), b();
    }, S = (M) => {
      m = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), v && (v = !1, g(M));
    }, w = () => {
      m = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, j = (M) => {
      if (M.pointerType !== "touch") {
        if (m) {
          v = !0;
          return;
        }
        g(M);
      }
    }, T = (M) => {
      if (!E5(M))
        return;
      v = !1;
      const N = a(h, M);
      typeof N == "function" && (p = N, h.addEventListener("pointerleave", j, o));
    };
    h.addEventListener("pointerenter", T, o), h.addEventListener("pointerdown", w, o);
  }), c;
}
const N1 = (n, a) => a ? n === a ? !0 : N1(n, a.parentElement) : !1, T5 = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, N5 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function C5(n) {
  return N5.has(n.tagName) || n.isContentEditable === !0;
}
const fu = /* @__PURE__ */ new WeakSet();
function Z0(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function _f(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const M5 = (n, a) => {
  const r = n.currentTarget;
  if (!r)
    return;
  const s = Z0(() => {
    if (fu.has(r))
      return;
    _f(r, "down");
    const o = Z0(() => {
      _f(r, "up");
    }), c = () => _f(r, "cancel");
    r.addEventListener("keyup", o, a), r.addEventListener("blur", c, a);
  });
  r.addEventListener("keydown", s, a), r.addEventListener("blur", () => r.removeEventListener("keydown", s), a);
};
function J0(n) {
  return T5(n) && !0;
}
const W0 = /* @__PURE__ */ new WeakSet();
function R5(n, a, r = {}) {
  const [s, o, c] = T1(n, r), h = (m) => {
    const v = m.currentTarget;
    if (!J0(m) || W0.has(m))
      return;
    fu.add(v), r.stopPropagation && W0.add(m);
    const p = a(v, m), b = (w, j) => {
      window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", S), fu.has(v) && fu.delete(v), J0(w) && typeof p == "function" && p(w, { success: j });
    }, g = (w) => {
      b(w, v === window || v === document || r.useGlobalTarget || N1(v, w.target));
    }, S = (w) => {
      b(w, !1);
    };
    window.addEventListener("pointerup", g, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((m) => {
    (r.useGlobalTarget ? window : m).addEventListener("pointerdown", h, o), du(m) && (m.addEventListener("focus", (p) => M5(p, o)), !C5(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), c;
}
const A5 = [...S1, Lt, na], _5 = (n) => A5.find(x1(n)), eb = () => ({ min: 0, max: 0 }), C1 = () => ({
  x: eb(),
  y: eb()
}), D5 = /* @__PURE__ */ new WeakMap();
function Lu(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function bs(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Ih = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Fh = ["initial", ...Ih];
function Uu(n) {
  return Lu(n.animate) || Fh.some((a) => bs(n[a]));
}
function M1(n) {
  return !!(Uu(n) || n.variants);
}
function z5(n, a, r) {
  for (const s in a) {
    const o = a[s], c = r[s];
    if (sn(o))
      n.addValue(s, o);
    else if (sn(c))
      n.addValue(s, Su(o, { owner: n }));
    else if (c !== o)
      if (n.hasValue(s)) {
        const h = n.getValue(s);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = n.getStaticValue(s);
        n.addValue(s, Su(h !== void 0 ? h : o, { owner: n }));
      }
  }
  for (const s in r)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const sh = { current: null }, R1 = { current: !1 }, O5 = typeof window < "u";
function L5() {
  if (R1.current = !0, !!O5)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => sh.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      sh.current = !1;
}
const tb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let wu = {};
function A1(n) {
  wu = n;
}
function U5() {
  return wu;
}
class k5 {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(a, r, s) {
    return {};
  }
  constructor({ parent: a, props: r, presenceContext: s, reducedMotionConfig: o, skipAnimations: c, blockInitialAnimation: h, visualState: m }, v = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Bh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const w = An.now();
      this.renderScheduledAt < w && (this.renderScheduledAt = w, Gn.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = r.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = r, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = v, this.blockInitialAnimation = !!h, this.isControllingVariants = Uu(r), this.isVariantNode = M1(r), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: g, ...S } = this.scrapeMotionValuesFromProps(r, {}, this);
    for (const w in S) {
      const j = S[w];
      p[w] !== void 0 && sn(j) && j.set(p[w]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const r in this.initialValues)
        this.values.get(r)?.jump(this.initialValues[r]), this.latestValues[r] = this.initialValues[r];
    this.current = a, D5.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((r, s) => this.bindToMotionValue(s, r)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (R1.current || L5(), this.shouldReduceMotion = sh.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Ff(this.notifyUpdate), Ff(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const a in this.events)
      this.events[a].clear();
    for (const a in this.features) {
      const r = this.features[a];
      r && (r.unmount(), r.isMounted = !1);
    }
    this.current = null;
  }
  addChild(a) {
    this.children.add(a), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(a);
  }
  removeChild(a) {
    this.children.delete(a), this.enteringChildren && this.enteringChildren.delete(a);
  }
  bindToMotionValue(a, r) {
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), r.accelerate && f1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: m, times: v, ease: p, duration: b } = r.accelerate, g = new c1({
        element: this.current,
        name: a,
        keyframes: m,
        times: v,
        ease: p,
        duration: /* @__PURE__ */ Yn(b)
      }), S = h(g);
      this.valueSubscriptions.set(a, () => {
        S(), g.cancel();
      });
      return;
    }
    const s = nl.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = r.on("change", (h) => {
      this.latestValues[a] = h, this.props.onUpdate && Gn.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let c;
    typeof window < "u" && window.MotionCheckAppearSync && (c = window.MotionCheckAppearSync(this, a, r)), this.valueSubscriptions.set(a, () => {
      o(), c && c(), r.owner && r.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in wu) {
      const r = wu[a];
      if (!r)
        continue;
      const { isEnabled: s, Feature: o } = r;
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : C1();
  }
  getStaticValue(a) {
    return this.latestValues[a];
  }
  setStaticValue(a, r) {
    this.latestValues[a] = r;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(a, r) {
    (a.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = a, this.prevPresenceContext = this.presenceContext, this.presenceContext = r;
    for (let s = 0; s < tb.length; s++) {
      const o = tb[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, h = a[c];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = z5(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const r = this.getClosestVariantNode();
    if (r)
      return r.variantChildren && r.variantChildren.add(a), () => r.variantChildren.delete(a);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(a, r) {
    const s = this.values.get(a);
    r !== s && (s && this.removeValue(a), this.bindToMotionValue(a, r), this.values.set(a, r), this.latestValues[a] = r.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(a) {
    this.values.delete(a);
    const r = this.valueSubscriptions.get(a);
    r && (r(), this.valueSubscriptions.delete(a)), delete this.latestValues[a], this.removeValueFromRenderState(a, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(a) {
    return this.values.has(a);
  }
  getValue(a, r) {
    if (this.props.values && this.props.values[a])
      return this.props.values[a];
    let s = this.values.get(a);
    return s === void 0 && r !== void 0 && (s = Su(r === null ? void 0 : r, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, r) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Ax(s) || _x(s)) ? s = parseFloat(s) : !_5(s) && na.test(r) && (s = E1(a, r)), this.setBaseTarget(a, sn(s) ? s.get() : s)), sn(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(a, r) {
    this.baseTarget[a] = r;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(a) {
    const { initial: r } = this.props;
    let s;
    if (typeof r == "string" || typeof r == "object") {
      const c = Hh(this.props, r, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (r && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !sn(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, r) {
    return this.events[a] || (this.events[a] = new Ox()), this.events[a].add(r);
  }
  notify(a, ...r) {
    this.events[a] && this.events[a].notify(...r);
  }
  scheduleRenderMicrotask() {
    x5.render(this.render);
  }
}
class _1 extends k5 {
  constructor() {
    super(...arguments), this.KeyframeResolver = y5;
  }
  sortInstanceNodePosition(a, r) {
    return a.compareDocumentPosition(r) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(a, r) {
    const s = a.style;
    return s ? s[r] : void 0;
  }
  removeValueFromRenderState(a, { vars: r, style: s }) {
    delete r[a], delete s[a];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: a } = this.props;
    sn(a) && (this.childSubscription = a.on("change", (r) => {
      this.current && (this.current.textContent = `${r}`);
    }));
  }
}
class al {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function V5({ top: n, left: a, right: r, bottom: s }) {
  return {
    x: { min: a, max: r },
    y: { min: n, max: s }
  };
}
function B5(n, a) {
  if (!a)
    return n;
  const r = a({ x: n.left, y: n.top }), s = a({ x: n.right, y: n.bottom });
  return {
    top: r.y,
    left: r.x,
    bottom: s.y,
    right: s.x
  };
}
function H5(n, a) {
  return V5(B5(n.getBoundingClientRect(), a));
}
const q5 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, $5 = tl.length;
function I5(n, a, r) {
  let s = "", o = !0;
  for (let c = 0; c < $5; c++) {
    const h = tl[c], m = n[h];
    if (m === void 0)
      continue;
    let v = !0;
    if (typeof m == "number")
      v = m === (h.startsWith("scale") ? 1 : 0);
    else {
      const p = parseFloat(m);
      v = h.startsWith("scale") ? p === 1 : p === 0;
    }
    if (!v || r) {
      const p = j1(m, $h[h]);
      if (!v) {
        o = !1;
        const b = q5[h] || h;
        s += `${b}(${p}) `;
      }
      r && (a[h] = p);
    }
  }
  return s = s.trim(), r ? s = r(a, o ? "" : s) : o && (s = "none"), s;
}
function Yh(n, a, r) {
  const { style: s, vars: o, transformOrigin: c } = n;
  let h = !1, m = !1;
  for (const v in a) {
    const p = a[v];
    if (nl.has(v)) {
      h = !0;
      continue;
    } else if (Xx(v)) {
      o[v] = p;
      continue;
    } else {
      const b = j1(p, $h[v]);
      v.startsWith("origin") ? (m = !0, c[v] = b) : s[v] = b;
    }
  }
  if (a.transform || (h || r ? s.transform = I5(a, n.transform, r) : s.transform && (s.transform = "none")), m) {
    const { originX: v = "50%", originY: p = "50%", originZ: b = 0 } = c;
    s.transformOrigin = `${v} ${p} ${b}`;
  }
}
function D1(n, { style: a, vars: r }, s, o) {
  const c = n.style;
  let h;
  for (h in a)
    c[h] = a[h];
  o?.applyProjectionStyles(c, s);
  for (h in r)
    c.setProperty(h, r[h]);
}
function nb(n, a) {
  return a.max === a.min ? 0 : n / (a.max - a.min) * 100;
}
const es = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (we.test(n))
        n = parseFloat(n);
      else
        return n;
    const r = nb(n, a.target.x), s = nb(n, a.target.y);
    return `${r}% ${s}%`;
  }
}, F5 = {
  correct: (n, { treeScale: a, projectionDelta: r }) => {
    const s = n, o = na.parse(n);
    if (o.length > 5)
      return s;
    const c = na.createTransformer(n), h = typeof o[0] != "number" ? 1 : 0, m = r.x.scale * a.x, v = r.y.scale * a.y;
    o[0 + h] /= m, o[1 + h] /= v;
    const p = Rs(m, v, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= p), typeof o[3 + h] == "number" && (o[3 + h] /= p), c(o);
  }
}, Y5 = {
  borderRadius: {
    ...es,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: es,
  borderTopRightRadius: es,
  borderBottomLeftRadius: es,
  borderBottomRightRadius: es,
  boxShadow: F5
};
function z1(n, { layout: a, layoutId: r }) {
  return nl.has(n) || n.startsWith("origin") || (a || r !== void 0) && (!!Y5[n] || n === "opacity");
}
function Gh(n, a, r) {
  const s = n.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const h in s)
    (sn(s[h]) || o && sn(o[h]) || z1(h, n) || r?.getValue(h)?.liveStyle !== void 0) && (c[h] = s[h]);
  return c;
}
function G5(n) {
  return window.getComputedStyle(n);
}
class X5 extends _1 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = D1;
  }
  readValueFromInstance(a, r) {
    if (nl.has(r))
      return this.projection?.isProjecting ? Zf(r) : gz(a, r);
    {
      const s = G5(a), o = (Xx(r) ? s.getPropertyValue(r) : s[r]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: r }) {
    return H5(a, r);
  }
  build(a, r, s) {
    Yh(a, r, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return Gh(a, r, s);
  }
}
const K5 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Q5 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function P5(n, a, r = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? K5 : Q5;
  n[c.offset] = `${-s}`, n[c.array] = `${a} ${r}`;
}
const Z5 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function O1(n, {
  attrX: a,
  attrY: r,
  attrScale: s,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, v, p, b) {
  if (Yh(n, m, p), v) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: g, style: S } = n;
  g.transform && (S.transform = g.transform, delete g.transform), (S.transform || g.transformOrigin) && (S.transformOrigin = g.transformOrigin ?? "50% 50%", delete g.transformOrigin), S.transform && (S.transformBox = b?.transformBox ?? "fill-box", delete g.transformBox);
  for (const w of Z5)
    g[w] !== void 0 && (S[w] = g[w], delete g[w]);
  a !== void 0 && (g.x = a), r !== void 0 && (g.y = r), s !== void 0 && (g.scale = s), o !== void 0 && P5(g, o, c, h, !1);
}
const L1 = /* @__PURE__ */ new Set([
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
]), U1 = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function J5(n, a, r, s) {
  D1(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(L1.has(o) ? o : qh(o), a.attrs[o]);
}
function k1(n, a, r) {
  const s = Gh(n, a, r);
  for (const o in n)
    if (sn(n[o]) || sn(a[o])) {
      const c = tl.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = n[o];
    }
  return s;
}
class W5 extends _1 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = C1;
  }
  getBaseTargetFromProps(a, r) {
    return a[r];
  }
  readValueFromInstance(a, r) {
    if (nl.has(r)) {
      const s = w1(r);
      return s && s.default || 0;
    }
    return r = L1.has(r) ? r : qh(r), a.getAttribute(r);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return k1(a, r, s);
  }
  build(a, r, s) {
    O1(a, r, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, r, s, o) {
    J5(a, r, s, o);
  }
  mount(a) {
    this.isSVGTag = U1(a.tagName), super.mount(a);
  }
}
const eO = Fh.length;
function V1(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const r = n.parent ? V1(n.parent) || {} : {};
    return n.props.initial !== void 0 && (r.initial = n.props.initial), r;
  }
  const a = {};
  for (let r = 0; r < eO; r++) {
    const s = Fh[r], o = n.props[s];
    (bs(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function B1(n, a) {
  if (!Array.isArray(a))
    return !1;
  const r = a.length;
  if (r !== n.length)
    return !1;
  for (let s = 0; s < r; s++)
    if (a[s] !== n[s])
      return !1;
  return !0;
}
const tO = [...Ih].reverse(), nO = Ih.length;
function aO(n) {
  return (a) => Promise.all(a.map(({ animation: r, options: s }) => s5(n, r, s)));
}
function iO(n) {
  let a = aO(n), r = ab(), s = !0, o = !1;
  const c = (p) => (b, g) => {
    const S = Pi(n, g, p === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: w, transitionEnd: j, ...T } = S;
      b = { ...b, ...T, ...j };
    }
    return b;
  };
  function h(p) {
    a = p(n);
  }
  function m(p) {
    const { props: b } = n, g = V1(n.parent) || {}, S = [], w = /* @__PURE__ */ new Set();
    let j = {}, T = 1 / 0;
    for (let N = 0; N < nO; N++) {
      const L = tO[N], z = r[L], _ = b[L] !== void 0 ? b[L] : g[L], J = bs(_), G = L === p ? z.isActive : null;
      G === !1 && (T = N);
      let W = _ === g[L] && _ !== b[L] && J;
      if (W && (s || o) && n.manuallyAnimateOnMount && (W = !1), z.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !z.isActive && G === null || // If we didn't and don't have any defined prop for this animation type
      !_ && !z.prevProp || // Or if the prop doesn't define an animation
      Lu(_) || typeof _ == "boolean")
        continue;
      if (L === "exit" && z.isActive && G !== !0) {
        z.prevResolvedValues && (j = {
          ...j,
          ...z.prevResolvedValues
        });
        continue;
      }
      const A = rO(z.prevProp, _);
      let U = A || // If we're making this variant active, we want to always make it active
      L === p && z.isActive && !W && J || // If we removed a higher-priority variant (i is in reverse order)
      N > T && J, I = !1;
      const le = Array.isArray(_) ? _ : [_];
      let ae = le.reduce(c(L), {});
      G === !1 && (ae = {});
      const { prevResolvedValues: me = {} } = z, ge = {
        ...me,
        ...ae
      }, oe = (q) => {
        U = !0, w.has(q) && (I = !0, w.delete(q)), z.needsAnimating[q] = !0;
        const Q = n.getValue(q);
        Q && (Q.liveStyle = !1);
      };
      for (const q in ge) {
        const Q = ae[q], te = me[q];
        if (j.hasOwnProperty(q))
          continue;
        let C = !1;
        ah(Q) && ah(te) ? C = !B1(Q, te) : C = Q !== te, C ? Q != null ? oe(q) : w.add(q) : Q !== void 0 && w.has(q) ? oe(q) : z.protectedKeys[q] = !0;
      }
      z.prevProp = _, z.prevResolvedValues = ae, z.isActive && (j = { ...j, ...ae }), (s || o) && n.blockInitialAnimation && (U = !1);
      const O = W && A;
      U && (!O || I) && S.push(...le.map((q) => {
        const Q = { type: L };
        if (typeof q == "string" && (s || o) && !O && n.manuallyAnimateOnMount && n.parent) {
          const { parent: te } = n, C = Pi(te, q);
          if (te.enteringChildren && C) {
            const { delayChildren: K } = C.transition || {};
            Q.delay = h1(te.enteringChildren, n, K);
          }
        }
        return {
          animation: q,
          options: Q
        };
      }));
    }
    if (w.size) {
      const N = {};
      if (typeof b.initial != "boolean") {
        const L = Pi(n, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        L && L.transition && (N.transition = L.transition);
      }
      w.forEach((L) => {
        const z = n.getBaseTarget(L), _ = n.getValue(L);
        _ && (_.liveStyle = !0), N[L] = z ?? null;
      }), S.push({ animation: N });
    }
    let M = !!S.length;
    return s && (b.initial === !1 || b.initial === b.animate) && !n.manuallyAnimateOnMount && (M = !1), s = !1, o = !1, M ? a(S) : Promise.resolve();
  }
  function v(p, b) {
    if (r[p].isActive === b)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(p, b)), r[p].isActive = b;
    const g = m(p);
    for (const S in r)
      r[S].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: m,
    setActive: v,
    setAnimateFunction: h,
    getState: () => r,
    reset: () => {
      r = ab(), o = !0;
    }
  };
}
function rO(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !B1(a, n) : !1;
}
function Ii(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function ab() {
  return {
    animate: Ii(!0),
    whileInView: Ii(),
    whileHover: Ii(),
    whileTap: Ii(),
    whileDrag: Ii(),
    whileFocus: Ii(),
    exit: Ii()
  };
}
function ib(n, a, r, s = { passive: !0 }) {
  return n.addEventListener(a, r, s), () => n.removeEventListener(a, r);
}
function lO(n) {
  return sn(n) ? n.get() : n;
}
const Xh = x.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function rb(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function sO(...n) {
  return (a) => {
    let r = !1;
    const s = n.map((o) => {
      const c = rb(o, a);
      return !r && typeof c == "function" && (r = !0), c;
    });
    if (r)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : rb(n[o], null);
        }
      };
  };
}
function oO(...n) {
  return x.useCallback(sO(...n), n);
}
class uO extends x.Component {
  getSnapshotBeforeUpdate(a) {
    const r = this.props.childRef.current;
    if (du(r) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = r.offsetParent, o = du(s) && s.offsetWidth || 0, c = du(s) && s.offsetHeight || 0, h = getComputedStyle(r), m = this.props.sizeRef.current;
      m.height = parseFloat(h.height), m.width = parseFloat(h.width), m.top = r.offsetTop, m.left = r.offsetLeft, m.right = o - m.width - m.left, m.bottom = c - m.height - m.top;
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
function cO({ children: n, isPresent: a, anchorX: r, anchorY: s, root: o, pop: c }) {
  const h = x.useId(), m = x.useRef(null), v = x.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = x.useContext(Xh), b = n.props?.ref ?? n?.ref, g = oO(m, b);
  return x.useInsertionEffect(() => {
    const { width: S, height: w, top: j, left: T, right: M, bottom: N } = v.current;
    if (a || c === !1 || !m.current || !S || !w)
      return;
    const L = r === "left" ? `left: ${T}` : `right: ${M}`, z = s === "bottom" ? `bottom: ${N}` : `top: ${j}`;
    m.current.dataset.motionPopId = h;
    const _ = document.createElement("style");
    p && (_.nonce = p);
    const J = o ?? document.head;
    return J.appendChild(_), _.sheet && _.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${w}px !important;
            ${L}px !important;
            ${z}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), J.contains(_) && J.removeChild(_);
    };
  }, [a]), f.jsx(uO, { isPresent: a, childRef: m, sizeRef: v, pop: c, children: c === !1 ? n : x.cloneElement(n, { ref: g }) });
}
const dO = ({ children: n, initial: a, isPresent: r, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: h, anchorX: m, anchorY: v, root: p }) => {
  const b = Ah(fO), g = x.useId();
  let S = !0, w = x.useMemo(() => (S = !1, {
    id: g,
    initial: a,
    isPresent: r,
    custom: o,
    onExitComplete: (j) => {
      b.set(j, !0);
      for (const T of b.values())
        if (!T)
          return;
      s && s();
    },
    register: (j) => (b.set(j, !1), () => b.delete(j))
  }), [r, b, s]);
  return c && S && (w = { ...w }), x.useMemo(() => {
    b.forEach((j, T) => b.set(T, !1));
  }, [r]), x.useEffect(() => {
    !r && !b.size && s && s();
  }, [r]), n = f.jsx(cO, { pop: h === "popLayout", isPresent: r, anchorX: m, anchorY: v, root: p, children: n }), f.jsx(Du.Provider, { value: w, children: n });
};
function fO() {
  return /* @__PURE__ */ new Map();
}
function hO(n = !0) {
  const a = x.useContext(Du);
  if (a === null)
    return [!0, null];
  const { isPresent: r, onExitComplete: s, register: o } = a, c = x.useId();
  x.useEffect(() => {
    if (n)
      return o(c);
  }, [n]);
  const h = x.useCallback(() => n && s && s(c), [c, s, n]);
  return !r && s ? [!1, h] : [!0];
}
const nu = (n) => n.key || "";
function lb(n) {
  const a = [];
  return x.Children.forEach(n, (r) => {
    x.isValidElement(r) && a.push(r);
  }), a;
}
const mO = ({ children: n, custom: a, initial: r = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: h = !1, anchorX: m = "left", anchorY: v = "top", root: p }) => {
  const [b, g] = hO(h), S = x.useMemo(() => lb(n), [n]), w = h && !b ? [] : S.map(nu), j = x.useRef(!0), T = x.useRef(S), M = Ah(() => /* @__PURE__ */ new Map()), N = x.useRef(/* @__PURE__ */ new Set()), [L, z] = x.useState(S), [_, J] = x.useState(S);
  Rx(() => {
    j.current = !1, T.current = S;
    for (let A = 0; A < _.length; A++) {
      const U = nu(_[A]);
      w.includes(U) ? (M.delete(U), N.current.delete(U)) : M.get(U) !== !0 && M.set(U, !1);
    }
  }, [_, w.length, w.join("-")]);
  const G = [];
  if (S !== L) {
    let A = [...S];
    for (let U = 0; U < _.length; U++) {
      const I = _[U], le = nu(I);
      w.includes(le) || (A.splice(U, 0, I), G.push(I));
    }
    return c === "wait" && G.length && (A = G), J(lb(A)), z(S), null;
  }
  const { forceRender: W } = x.useContext(Mx);
  return f.jsx(f.Fragment, { children: _.map((A) => {
    const U = nu(A), I = h && !b ? !1 : S === _ || w.includes(U), le = () => {
      if (N.current.has(U))
        return;
      if (M.has(U))
        N.current.add(U), M.set(U, !0);
      else
        return;
      let ae = !0;
      M.forEach((me) => {
        me || (ae = !1);
      }), ae && (W?.(), J(T.current), h && g?.(), s && s());
    };
    return f.jsx(dO, { isPresent: I, initial: !j.current || r ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: p, onExitComplete: I ? void 0 : le, anchorX: m, anchorY: v, children: A }, U);
  }) });
}, Kh = x.createContext({ strict: !1 }), sb = {
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
let ob = !1;
function pO() {
  if (ob)
    return;
  const n = {};
  for (const a in sb)
    n[a] = {
      isEnabled: (r) => sb[a].some((s) => !!r[s])
    };
  A1(n), ob = !0;
}
function H1() {
  return pO(), U5();
}
function oh(n) {
  const a = H1();
  for (const r in n)
    a[r] = {
      ...a[r],
      ...n[r]
    };
  A1(a);
}
function q1({ children: n, features: a, strict: r = !1 }) {
  const [, s] = x.useState(!Df(a)), o = x.useRef(void 0);
  if (!Df(a)) {
    const { renderer: c, ...h } = a;
    o.current = c, oh(h);
  }
  return x.useEffect(() => {
    Df(a) && a().then(({ renderer: c, ...h }) => {
      oh(h), o.current = c, s(!0);
    });
  }, []), f.jsx(Kh.Provider, { value: { renderer: o.current, strict: r }, children: n });
}
function Df(n) {
  return typeof n == "function";
}
const gO = /* @__PURE__ */ new Set([
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
function Eu(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || gO.has(n);
}
let $1 = (n) => !Eu(n);
function vO(n) {
  typeof n == "function" && ($1 = (a) => a.startsWith("on") ? !Eu(a) : n(a));
}
try {
  vO(require("@emotion/is-prop-valid").default);
} catch {
}
function yO(n, a, r) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || sn(n[o]) || ($1(o) || r === !0 && Eu(o) || !a && !Eu(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const ku = /* @__PURE__ */ x.createContext({});
function bO(n, a) {
  if (Uu(n)) {
    const { initial: r, animate: s } = n;
    return {
      initial: r === !1 || bs(r) ? r : void 0,
      animate: bs(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function xO(n) {
  const { initial: a, animate: r } = bO(n, x.useContext(ku));
  return x.useMemo(() => ({ initial: a, animate: r }), [ub(a), ub(r)]);
}
function ub(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Qh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function I1(n, a, r) {
  for (const s in a)
    !sn(a[s]) && !z1(s, r) && (n[s] = a[s]);
}
function SO({ transformTemplate: n }, a) {
  return x.useMemo(() => {
    const r = Qh();
    return Yh(r, a, n), Object.assign({}, r.vars, r.style);
  }, [a]);
}
function wO(n, a) {
  const r = n.style || {}, s = {};
  return I1(s, r, n), Object.assign(s, SO(n, a)), s;
}
function EO(n, a) {
  const r = {}, s = wO(n, a);
  return n.drag && n.dragListener !== !1 && (r.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (r.tabIndex = 0), r.style = s, r;
}
const F1 = () => ({
  ...Qh(),
  attrs: {}
});
function jO(n, a, r, s) {
  const o = x.useMemo(() => {
    const c = F1();
    return O1(c, a, U1(s), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (n.style) {
    const c = {};
    I1(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const TO = [
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
function Ph(n) {
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
      !!(TO.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function NO(n, a, r, { latestValues: s }, o, c = !1, h) {
  const v = (h ?? Ph(n) ? jO : EO)(a, s, o, n), p = yO(a, typeof n == "string", c), b = n !== x.Fragment ? { ...p, ...v, ref: r } : {}, { children: g } = a, S = x.useMemo(() => sn(g) ? g.get() : g, [g]);
  return x.createElement(n, {
    ...b,
    children: S
  });
}
function CO({ scrapeMotionValuesFromProps: n, createRenderState: a }, r, s, o) {
  return {
    latestValues: MO(r, s, o, n),
    renderState: a()
  };
}
function MO(n, a, r, s) {
  const o = {}, c = s(n, {});
  for (const S in c)
    o[S] = lO(c[S]);
  let { initial: h, animate: m } = n;
  const v = Uu(n), p = M1(n);
  a && p && !v && n.inherit !== !1 && (h === void 0 && (h = a.initial), m === void 0 && (m = a.animate));
  let b = r ? r.initial === !1 : !1;
  b = b || h === !1;
  const g = b ? m : h;
  if (g && typeof g != "boolean" && !Lu(g)) {
    const S = Array.isArray(g) ? g : [g];
    for (let w = 0; w < S.length; w++) {
      const j = Hh(n, S[w]);
      if (j) {
        const { transitionEnd: T, transition: M, ...N } = j;
        for (const L in N) {
          let z = N[L];
          if (Array.isArray(z)) {
            const _ = b ? z.length - 1 : 0;
            z = z[_];
          }
          z !== null && (o[L] = z);
        }
        for (const L in T)
          o[L] = T[L];
      }
    }
  }
  return o;
}
const Y1 = (n) => (a, r) => {
  const s = x.useContext(ku), o = x.useContext(Du), c = () => CO(n, a, s, o);
  return r ? c() : Ah(c);
}, RO = /* @__PURE__ */ Y1({
  scrapeMotionValuesFromProps: Gh,
  createRenderState: Qh
}), AO = /* @__PURE__ */ Y1({
  scrapeMotionValuesFromProps: k1,
  createRenderState: F1
}), _O = Symbol.for("motionComponentSymbol");
function DO(n, a, r) {
  const s = x.useRef(r);
  x.useInsertionEffect(() => {
    s.current = r;
  });
  const o = x.useRef(null);
  return x.useCallback((c) => {
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
const zO = x.createContext({});
function OO(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function LO(n, a, r, s, o, c) {
  const { visualElement: h } = x.useContext(ku), m = x.useContext(Kh), v = x.useContext(Du), p = x.useContext(Xh), b = p.reducedMotion, g = p.skipAnimations, S = x.useRef(null), w = x.useRef(!1);
  s = s || m.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: h,
    props: r,
    presenceContext: v,
    blockInitialAnimation: v ? v.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: g,
    isSVG: c
  }), w.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const j = S.current, T = x.useContext(zO);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && UO(S.current, r, o, T);
  const M = x.useRef(!1);
  x.useInsertionEffect(() => {
    j && M.current && j.update(r, v);
  });
  const N = r[y1], L = x.useRef(!!N && typeof window < "u" && !window.MotionHandoffIsComplete?.(N) && window.MotionHasOptimisedAnimation?.(N));
  return Rx(() => {
    w.current = !0, j && (M.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), L.current && j.animationState && j.animationState.animateChanges());
  }), x.useEffect(() => {
    j && (!L.current && j.animationState && j.animationState.animateChanges(), L.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(N);
    }), L.current = !1), j.enteringChildren = void 0);
  }), j;
}
function UO(n, a, r, s) {
  const { layoutId: o, layout: c, drag: h, dragConstraints: m, layoutScroll: v, layoutRoot: p, layoutAnchor: b, layoutCrossfade: g } = a;
  n.projection = new r(n.latestValues, a["data-framer-portal-id"] ? void 0 : G1(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!h || m && OO(m),
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
    layoutAnchor: b
  });
}
function G1(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : G1(n.parent);
}
function zf(n, { forwardMotionProps: a = !1, type: r } = {}, s, o) {
  s && oh(s);
  const c = r ? r === "svg" : Ph(n), h = c ? AO : RO;
  function m(p, b) {
    let g;
    const S = {
      ...x.useContext(Xh),
      ...p,
      layoutId: kO(p)
    }, { isStatic: w } = S, j = xO(p), T = h(p, w);
    if (!w && typeof window < "u") {
      VO();
      const M = BO(S);
      g = M.MeasureLayout, j.visualElement = LO(n, T, S, o, M.ProjectionNode, c);
    }
    return f.jsxs(ku.Provider, { value: j, children: [g && j.visualElement ? f.jsx(g, { visualElement: j.visualElement, ...S }) : null, NO(n, p, DO(T, j.visualElement, b), T, w, a, c)] });
  }
  m.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const v = x.forwardRef(m);
  return v[_O] = n, v;
}
function kO({ layoutId: n }) {
  const a = x.useContext(Mx).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function VO(n, a) {
  x.useContext(Kh).strict;
}
function BO(n) {
  const a = H1(), { drag: r, layout: s } = a;
  if (!r && !s)
    return {};
  const o = { ...r, ...s };
  return {
    MeasureLayout: r?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function HO(n, a) {
  if (typeof Proxy > "u")
    return zf;
  const r = /* @__PURE__ */ new Map(), s = (c, h) => zf(c, h, n, a), o = (c, h) => s(c, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, h) => h === "create" ? s : (r.has(h) || r.set(h, zf(h, void 0, n, a)), r.get(h))
  });
}
const X1 = /* @__PURE__ */ HO(), qO = (n, a) => a.isSVG ?? Ph(n) ? new W5(a) : new X5(a, {
  allowProjection: n !== x.Fragment
});
class $O extends al {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = iO(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Lu(a) && (this.unmountControls = a.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: a } = this.node.getProps(), { animate: r } = this.node.prevProps || {};
    a !== r && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let IO = 0;
class FO extends al {
  constructor() {
    super(...arguments), this.id = IO++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: r } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: c, custom: h } = this.node.getProps();
        if (typeof c == "string") {
          const m = Pi(this.node, c, h);
          if (m) {
            const { transition: v, transitionEnd: p, ...b } = m;
            for (const g in b)
              this.node.getValue(g)?.jump(b[g]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const o = this.node.animationState.setActive("exit", !a);
    r && !a && o.then(() => {
      this.isExitComplete = !0, r(this.id);
    });
  }
  mount() {
    const { register: a, onExitComplete: r } = this.node.presenceContext || {};
    r && r(this.id), a && (this.unmount = a(this.id));
  }
  unmount() {
  }
}
const YO = {
  animation: {
    Feature: $O
  },
  exit: {
    Feature: FO
  }
};
function K1(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
function cb(n, a, r) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", r === "Start");
  const o = "onHover" + r, c = s[o];
  c && Gn.postRender(() => c(a, K1(a)));
}
class GO extends al {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = j5(a, (r, s) => (cb(this.node, s, "Start"), (o) => cb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class XO extends al {
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
    this.unmount = zu(ib(this.node.current, "focus", () => this.onFocus()), ib(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function db(n, a, r) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", r === "Start");
  const o = "onTap" + (r === "End" ? "" : r), c = s[o];
  c && Gn.postRender(() => c(a, K1(a)));
}
class KO extends al {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: r, propagate: s } = this.node.props;
    this.unmount = R5(a, (o, c) => (db(this.node, c, "Start"), (h, { success: m }) => db(this.node, h, m ? "End" : "Cancel")), {
      useGlobalTarget: r,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const uh = /* @__PURE__ */ new WeakMap(), Of = /* @__PURE__ */ new WeakMap(), QO = (n) => {
  const a = uh.get(n.target);
  a && a(n);
}, PO = (n) => {
  n.forEach(QO);
};
function ZO({ root: n, ...a }) {
  const r = n || document;
  Of.has(r) || Of.set(r, {});
  const s = Of.get(r), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(PO, { root: n, ...a })), s[o];
}
function JO(n, a, r) {
  const s = ZO(a);
  return uh.set(n, r), s.observe(n), () => {
    uh.delete(n), s.unobserve(n);
  };
}
const WO = {
  some: 0,
  all: 1
};
class e4 extends al {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: r, margin: s, amount: o = "some", once: c } = a, h = {
      root: r ? r.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : WO[o]
    }, m = (v) => {
      const { isIntersecting: p } = v;
      if (this.isInView === p || (this.isInView = p, c && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: g } = this.node.getProps(), S = p ? b : g;
      S && S(v);
    };
    this.stopObserver = JO(this.node.current, h, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(t4(a, r)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function t4({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (r) => n[r] !== a[r];
}
const n4 = {
  inView: {
    Feature: e4
  },
  tap: {
    Feature: KO
  },
  focus: {
    Feature: XO
  },
  hover: {
    Feature: GO
  }
}, Q1 = {
  renderer: qO,
  ...YO,
  ...n4
};
var a4 = "_1oor31e0", i4 = "_1oor31e1", r4 = "_1oor31e2", l4 = "_1oor31e3", s4 = "_1oor31e4", o4 = "_1oor31e5", u4 = "_1oor31e6", c4 = "_1oor31e7", d4 = "_1oor31e8";
const f4 = 8;
function h4(n) {
  const { entries: a, loading: r, error: s } = n;
  return /* @__PURE__ */ f.jsxs("div", { className: a4, "aria-busy": !!r, children: [
    s && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: s }),
    r && !s && /* @__PURE__ */ f.jsx("div", { className: d4, "aria-live": "polite", children: "Loading edit history…" }),
    !r && !s && a.length === 0 && /* @__PURE__ */ f.jsx("div", { className: c4, children: "No edits yet" }),
    !r && !s && a.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: i4, children: a.map((o) => /* @__PURE__ */ f.jsxs("li", { className: r4, children: [
      /* @__PURE__ */ f.jsx("span", { className: l4, children: p4(o.recorded_at) }),
      /* @__PURE__ */ f.jsx("span", { className: s4, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ f.jsx("span", { className: o4, title: o.digest_after, children: m4(o.digest_after) }),
      /* @__PURE__ */ f.jsx("span", { className: u4, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function m4(n) {
  return n ? `${n.slice(0, f4)}…` : "—";
}
function p4(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var fb = "_1c63kaw0", g4 = "_1c63kaw1", v4 = "_1c63kaw2", y4 = "_1c63kaw3", b4 = "_1c63kaw4", x4 = "_1c63kaw5", S4 = "_1c63kaw6", w4 = "_1c63kaw7";
function E4({ chain: n, onRemoveOp: a }) {
  return n.ops.length === 0 ? /* @__PURE__ */ f.jsx("div", { className: fb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ f.jsx("span", { className: g4, children: "No edits yet" }) }) : /* @__PURE__ */ f.jsx("ol", { className: fb, "data-testid": "edit-chain-list", children: n.ops.map((r, s) => /* @__PURE__ */ f.jsxs("li", { className: v4, children: [
    /* @__PURE__ */ f.jsxs("span", { className: y4, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: b4, children: [
      /* @__PURE__ */ f.jsx("span", { className: x4, children: hb(r) }),
      /* @__PURE__ */ f.jsx("span", { className: S4, children: j4(r) })
    ] }),
    /* @__PURE__ */ f.jsx(
      "button",
      {
        type: "button",
        className: w4,
        onClick: () => a(r.id),
        "aria-label": `Remove ${hb(r)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, r.id)) });
}
function hb(n) {
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
function j4(n) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${mb(n.start_ms)} → ${mb(n.end_ms)}`;
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
      return `${Lf(n.low_db)} / ${Lf(n.mid_db)} / ${Lf(n.high_db)}`;
    case "pitch_shift":
      return `${n.semitones >= 0 ? "+" : ""}${n.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${n.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function Lf(n) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(0)}`;
}
function mb(n) {
  return !Number.isFinite(n) || n < 0 ? "0.00s" : `${(n / 1e3).toFixed(2)}s`;
}
var au = "_1o3ytop0", T4 = "_1o3ytop1", N4 = "_1o3ytop2", C4 = "_1o3ytop3", M4 = "_1o3ytop4", iu = "_1o3ytop5", R4 = "_1o3ytop6", A4 = "_1o3ytopc", _4 = "_1o3ytopd", D4 = "_1o3ytope", z4 = "_1o3ytopf", O4 = "_1o3ytopg", L4 = "_1o3ytoph";
const pb = -16;
function U4(n) {
  const {
    voiceAsset: a,
    deploymentId: r,
    affectedCharacterNames: s = [],
    onChainPersisted: o,
    onError: c
  } = n, h = a.durationMs ?? 0, m = x.useMemo(
    () => k4(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [v, p] = x.useState(() => Uf(h)), [b, g] = x.useState(_u), [S, w] = x.useState(!1), [j, T] = x.useState(null), [M, N] = x.useState(null), [L, z] = x.useState(!1), [_, J] = x.useState(!1), [G, W] = x.useState(!1), [A, U] = x.useState(null), [I, le] = x.useState([]), [ae, me] = x.useState(null), [ge, oe] = x.useState([]), [O, V] = x.useState(!1), [q, Q] = x.useState(null), [te, C] = x.useState(0), K = x.useRef(null), Z = x.useRef(null), re = x.useRef(null), ce = x.useRef(null), ve = x.useRef(null), ze = x.useRef(0), _e = x.useMemo(
    () => v.ops.some((ye) => ye.mode === "normalize"),
    [v.ops]
  );
  x.useEffect(() => {
    const ye = Uf(h);
    p(ye), g(px(ye)), T(null), W(!1), le([]), me(null), ve.current = null;
  }, [a.voiceAssetId, h]);
  const Be = x.useCallback((ye) => {
    g(ye), p((Oe) => mx(Oe, ye));
  }, []);
  x.useEffect(() => {
    ce.current?.abort();
    const ye = new AbortController();
    return ce.current = ye, V(!0), Q(null), uu(r, "voice_asset", a.voiceAssetId, 50, {
      signal: ye.signal
    }).then((Oe) => {
      ye.signal.aborted || oe(Oe.entries);
    }).catch((Oe) => {
      if (ye.signal.aborted) return;
      const Qe = Oe instanceof Error ? Oe.message : "audit fetch failed";
      Q(Qe);
    }).finally(() => {
      ye.signal.aborted || V(!1);
    }), () => ye.abort();
  }, [r, a.voiceAssetId, te]), x.useEffect(() => () => {
    M && URL.revokeObjectURL(M);
  }, [M]), x.useEffect(() => () => {
    Z.current?.abort(), re.current?.abort(), ce.current?.abort();
  }, []);
  const kt = v.ops.find((ye) => ye.mode === "trim"), Yt = v.ops.find((ye) => ye.mode === "normalize"), fe = kt?.start_ms ?? 0, Te = kt?.end_ms ?? Math.max(1, h), Ce = x.useCallback((ye, Oe) => {
    p(
      (Qe) => gb(
        Qe,
        "trim",
        (tt) => ({
          ...tt,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(ye)),
          end_ms: Math.max(Math.floor(ye) + 1, Math.floor(Oe))
        })
      )
    );
  }, []), Me = x.useCallback(
    (ye) => Ce(ye, Te),
    [Te, Ce]
  ), Kt = x.useCallback(
    (ye) => Ce(fe, ye),
    [fe, Ce]
  ), it = x.useCallback((ye) => {
    p((Oe) => {
      const Qe = Oe.ops.filter((tt) => tt.mode !== "normalize");
      if (ye) {
        const tt = {
          id: yn(),
          mode: "normalize",
          target_lufs: pb
        };
        return { ...Oe, ops: [...Qe, tt] };
      }
      return { ...Oe, ops: Qe };
    });
  }, []), on = x.useCallback(
    (ye) => {
      const Oe = v.ops.findIndex((Ht) => Ht.id === ye);
      if (Oe === -1) return;
      const Qe = v.ops[Oe];
      if (!Qe) return;
      const tt = [...v.ops.slice(0, Oe), ...v.ops.slice(Oe + 1)];
      p({ ...v, ops: tt }), le((Ht) => [...Ht, { op: Qe, index: Oe }]);
    },
    [v]
  ), Qt = x.useCallback(() => {
    const ye = I[I.length - 1];
    if (!ye) return;
    const Oe = Math.min(ye.index, v.ops.length), Qe = [...v.ops.slice(0, Oe), ye.op, ...v.ops.slice(Oe)];
    p({ ...v, ops: Qe }), le(I.slice(0, -1));
  }, [v, I]), bn = x.useCallback(() => {
    const ye = ix(v, h);
    return ye ? (T(ye.message), !1) : (T(null), !0);
  }, [v, h]), ma = x.useCallback(async () => {
    if (!bn() || L) return;
    Z.current?.abort();
    const ye = new AbortController();
    Z.current = ye;
    const Oe = ++ze.current;
    J(!0);
    try {
      const Qe = await GN(a.voiceAssetId, r, v, {
        signal: ye.signal
      });
      if (ye.signal.aborted || Oe !== ze.current) return;
      M && URL.revokeObjectURL(M);
      const tt = URL.createObjectURL(Qe);
      N(tt), W(!0), requestAnimationFrame(() => K.current?.play().catch(() => {
      }));
    } catch (Qe) {
      if (ye.signal.aborted) return;
      const tt = Qe instanceof Error ? Qe.message : "preview failed";
      T(tt), c(tt);
    } finally {
      ye.signal.aborted || J(!1);
    }
  }, [bn, L, a.voiceAssetId, r, v, M, c]), Vt = x.useCallback(async () => {
    if (!bn() || _ || L) return;
    if (s.length > 1) {
      const Oe = s.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${s.length} characters: ${Oe}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    Z.current?.abort(), re.current?.abort();
    const ye = new AbortController();
    re.current = ye, z(!0);
    try {
      const Oe = ve.current ?? void 0, Qe = await ax(
        a.voiceAssetId,
        r,
        Oe ? { chain: v, digest_before: Oe } : { chain: v },
        { signal: ye.signal }
      );
      if (ye.signal.aborted) return;
      ve.current = Qe.chain_digest, me(Qe.chain_digest), T(null), U(Qe.measured_lufs ?? null), le([]), o(Qe), C((tt) => tt + 1);
    } catch (Oe) {
      if (ye.signal.aborted) return;
      const Qe = Oe instanceof Kr;
      Oe instanceof Kr && (ve.current = Oe.currentDigest || null);
      const tt = Qe ? "Edit chain has changed in another tab. Reload to continue." : Oe instanceof Error ? Oe.message : "apply failed";
      T(tt), c(tt);
    } finally {
      ye.signal.aborted || z(!1);
    }
  }, [
    bn,
    _,
    L,
    s,
    a.voiceAssetId,
    r,
    v,
    o,
    c
  ]), Dn = x.useCallback(() => {
    Z.current?.abort(), p(Uf(h)), T(null), U(null), W(!1), le([]), C((ye) => ye + 1), M && (URL.revokeObjectURL(M), N(null));
  }, [h, M]), Bt = x.useCallback((ye) => {
    p(
      (Oe) => gb(
        Oe,
        "normalize",
        (Qe) => ({
          ...Qe,
          mode: "normalize",
          target_lufs: ye
        })
      )
    );
  }, []);
  return /* @__PURE__ */ f.jsxs(Tx, { variant: "standalone", children: [
    /* @__PURE__ */ f.jsx(
      Nx,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${ru(h)}`
      }
    ),
    /* @__PURE__ */ f.jsx(
      Ex,
      {
        audioUrl: m,
        durationMs: Math.max(1, h),
        startMs: fe,
        endMs: Te,
        onChangeStart: Me,
        onChangeEnd: Kt
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: au, children: [
      /* @__PURE__ */ f.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ f.jsxs("span", { className: T4, children: [
        ru(fe),
        " → ",
        ru(Te),
        " · ",
        ru(Te - fe)
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: M4, children: [
      /* @__PURE__ */ f.jsxs("div", { className: iu, children: [
        /* @__PURE__ */ f.jsxs("span", { className: au, children: [
          /* @__PURE__ */ f.jsx("span", { children: "Normalize loudness" }),
          _e && Yt && /* @__PURE__ */ f.jsxs("span", { className: A4, children: [
            "target ",
            Yt.target_lufs.toFixed(1),
            " LUFS",
            A !== null && ` · measured ${A.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: R4, children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "checkbox",
              checked: _e,
              onChange: (ye) => it(ye.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { children: [
            "Target ",
            pb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        _e && Yt && /* @__PURE__ */ f.jsx(
          "input",
          {
            type: "range",
            className: D4,
            min: -30,
            max: -6,
            step: 0.5,
            value: Yt.target_lufs,
            onChange: (ye) => Bt(Number(ye.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: iu, children: [
        /* @__PURE__ */ f.jsxs("span", { className: au, children: [
          "Operations · ",
          v.ops.length
        ] }),
        /* @__PURE__ */ f.jsx(E4, { chain: v, onRemoveOp: on })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: iu, children: [
        /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: N4,
            onClick: () => w((ye) => !ye),
            "aria-expanded": S,
            children: [
              S ? "▾" : "▸",
              " Advanced effects · gain · eq · pitch · fade · silence trim"
            ]
          }
        ),
        S && /* @__PURE__ */ f.jsx(
          Rh,
          {
            state: b,
            onChange: Be,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      ae && /* @__PURE__ */ f.jsx("div", { className: iu, children: /* @__PURE__ */ f.jsxs("span", { className: au, children: [
        /* @__PURE__ */ f.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ f.jsxs("span", { className: C4, title: ae, children: [
          ae.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ f.jsxs(Cx, { children: [
      /* @__PURE__ */ f.jsx(
        We,
        {
          variant: "secondary",
          onClick: () => void ma(),
          disabled: _ || L,
          children: _ ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ f.jsx(
        We,
        {
          onClick: () => void Vt(),
          disabled: L || _,
          children: L ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ f.jsx(
        We,
        {
          variant: "ghost",
          onClick: Dn,
          disabled: L || _,
          children: "Reset"
        }
      ),
      I.length > 0 && /* @__PURE__ */ f.jsxs(
        We,
        {
          variant: "ghost",
          size: "sm",
          onClick: Qt,
          disabled: L || _,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            I.length,
            ")"
          ]
        }
      ),
      G && /* @__PURE__ */ f.jsx(
        "span",
        {
          className: L4,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    M && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ f.jsx(
      "audio",
      {
        ref: K,
        src: M,
        controls: !0,
        className: _4,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: j }),
    /* @__PURE__ */ f.jsxs("details", { className: z4, children: [
      /* @__PURE__ */ f.jsxs("summary", { className: O4, children: [
        "Edit history",
        ge.length > 0 ? ` · ${ge.length}` : ""
      ] }),
      /* @__PURE__ */ f.jsx(
        h4,
        {
          entries: ge,
          loading: O,
          error: q
        }
      )
    ] })
  ] });
}
function Uf(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: yn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function gb(n, a, r) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: yn(), mode: a };
    return { ...n, ops: [...n.ops, r(c)] };
  }
  const o = [...n.ops];
  return o[s] = r(o[s]), { ...n, ops: o };
}
function ru(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
function k4(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var V4 = "go9vi12", B4 = "go9vi13", H4 = "go9vi14", q4 = "go9vi15", $4 = "go9vi16", I4 = "go9vi17", F4 = "go9vi18", Y4 = "go9vi19", G4 = "go9vi1a go9vi19", X4 = "go9vi1b", K4 = "go9vi1c", Q4 = "go9vi1d", P4 = "go9vi1e", Z4 = "go9vi1f", J4 = "go9vi1g", W4 = "go9vi1h", e6 = "go9vi1i", Fi = "go9vi1j", ts = "go9vi1k", Yr = "go9vi1l", t6 = "go9vi1m go9vi1l", n6 = "go9vi1n", a6 = "go9vi1o go9vi1n", i6 = "go9vi1p go9vi1n", r6 = "go9vi1q", l6 = "go9vi1r", s6 = "go9vi1s", o6 = "go9vi1t", P1 = "go9vi1u", u6 = "go9vi1v", c6 = "go9vi1w", d6 = "go9vi1x go9vi1l", f6 = "go9vi1y", h6 = "go9vi1z", m6 = "go9vi110", p6 = "go9vi111", g6 = "go9vi112", v6 = "go9vi113";
const y6 = ["none", "audio_ref", "vector_preset", "qwen_template"];
function b6() {
  const { deployment: n, mappings: a, voiceAssets: r } = js(), [s, o] = x.useState(a), [c, h] = x.useState(r), [m, v] = x.useState(
    a[0]?.mappingId ?? null
  ), [p, b] = x.useState(""), [g, S] = x.useState(null), [w, j] = x.useState(null), [T, M] = x.useState(null), N = x.useMemo(() => {
    const V = /* @__PURE__ */ new Map();
    for (const q of c) V.set(q.voiceAssetId, q);
    return V;
  }, [c]), L = x.useMemo(() => {
    const V = p.trim().toLowerCase();
    return V ? s.filter((q) => q.characterName.toLowerCase().includes(V)) : s;
  }, [s, p]), z = x.useMemo(
    () => s.find((V) => V.mappingId === m) ?? null,
    [s, m]
  );
  x.useEffect(() => {
    o(a), h(r), v(a[0]?.mappingId ?? null);
  }, [a, r]), x.useEffect(() => {
    if (!w) return;
    const V = setTimeout(() => j(null), 2600);
    return () => clearTimeout(V);
  }, [w]);
  const _ = x.useCallback(async () => {
    const V = await hs(n.deploymentId);
    h(V.voiceAssets);
  }, [n.deploymentId]), J = x.useCallback(
    (V) => {
      o(
        (q) => q.map((Q) => Q.mappingId === m ? { ...Q, ...V } : Q)
      );
    },
    [m]
  ), G = x.useCallback(
    async (V) => {
      if (!z) return;
      const q = z;
      try {
        const Q = await os(n.deploymentId, z.mappingId, V);
        o((te) => te.map((C) => C.mappingId === Q.mappingId ? Q : C));
      } catch (Q) {
        o(
          (te) => te.map((C) => C.mappingId === q.mappingId ? q : C)
        ), S(di(Q));
      }
    },
    [z, n.deploymentId]
  ), W = x.useCallback(async () => {
    const V = c[0];
    if (!V) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const q = T6(s), Q = await Th(n.deploymentId, {
        characterName: q,
        speakerVoiceAssetId: V.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((te) => [...te, Q]), v(Q.mappingId);
    } catch (q) {
      S(di(q));
    }
  }, [n.deploymentId, c, s]), A = x.useCallback(() => {
    z && M({ id: z.mappingId, name: z.characterName });
  }, [z]), U = x.useCallback(async () => {
    if (!T) return;
    const { id: V, name: q } = T;
    M(null);
    try {
      await ex(n.deploymentId, V), o((Q) => Q.filter((te) => te.mappingId !== V)), v(null), j(`Mapping for ${q} deactivated.`);
    } catch (Q) {
      S(di(Q));
    }
  }, [n.deploymentId, T]), I = x.useCallback(
    async (V, q, Q) => {
      try {
        const te = await nx(n.deploymentId, V, q, Q);
        return h((C) => [te, ...C]), j(`${te.displayName} uploaded.`), te;
      } catch (te) {
        return S(di(te)), null;
      }
    },
    [n.deploymentId]
  ), le = x.useCallback(async () => {
    try {
      const V = await kT(n.deploymentId);
      _6(V, `${n.deploymentId}-mappings.json`), j("Mappings exported to JSON.");
    } catch (V) {
      S(di(V));
    }
  }, [n.deploymentId]), ae = x.useCallback(
    async (V, q) => {
      try {
        const Q = await VT(
          n.deploymentId,
          V.mappings,
          q
        );
        j(
          `Imported ${Q.created.length} • skipped ${Q.skipped.length} • replaced ${Q.replaced.length}.`
        );
        const te = await hs(n.deploymentId);
        h(te.voiceAssets);
      } catch (Q) {
        S(di(Q));
      }
    },
    [n.deploymentId]
  ), me = x.useCallback(
    async (V) => {
      if (await _(), z && V.chain_digest)
        try {
          const q = await os(n.deploymentId, z.mappingId, {
            voiceAssetChainDigest: V.chain_digest
          });
          o(
            (Q) => Q.map((te) => te.mappingId === q.mappingId ? q : te)
          );
        } catch (q) {
          S(di(q));
        }
      j("Edit applied.");
    },
    [_, z, n.deploymentId]
  ), ge = x.useCallback((V) => {
    S(V);
  }, []), oe = x.useCallback(
    async (V, q) => {
      if (!z) return null;
      const Q = V.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await $T(n.deploymentId, {
          line: Q,
          outputFormat: q
        })).runId };
      } catch (te) {
        return S(di(te)), null;
      }
    },
    [n.deploymentId, z]
  ), O = c.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ f.jsxs("div", { className: V4, children: [
    /* @__PURE__ */ f.jsxs("aside", { className: B4, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ f.jsxs("header", { className: H4, children: [
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("h1", { id: "mapping-sidebar-heading", className: q4, children: "Cast" }),
          /* @__PURE__ */ f.jsxs("span", { className: $4, children: [
            s.length,
            " active · ",
            c.length,
            " ",
            O
          ] })
        ] }),
        /* @__PURE__ */ f.jsx(We, { variant: "primary", size: "sm", onClick: W, children: "+ Add" })
      ] }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "search",
          className: I4,
          placeholder: "Search characters",
          value: p,
          onChange: (V) => b(V.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ f.jsx(j6, { onExport: le, onImport: ae, onParseError: S }),
      /* @__PURE__ */ f.jsx("div", { className: F4, children: L.length === 0 ? /* @__PURE__ */ f.jsx(
        Ts,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : L.map((V) => {
        const q = N.get(V.speakerVoiceAssetId), Q = V.mappingId === m;
        return /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: Q ? G4 : Y4,
            onClick: () => v(V.mappingId),
            "aria-pressed": Q,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: X4, "aria-hidden": "true", children: N6(V.characterName) }),
              /* @__PURE__ */ f.jsxs("span", { className: K4, children: [
                /* @__PURE__ */ f.jsx("span", { className: Q4, children: V.characterName }),
                /* @__PURE__ */ f.jsxs("span", { className: P4, children: [
                  V.defaultEmotionMode,
                  " · ",
                  q?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          V.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ f.jsxs("section", { className: Z4, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ f.jsx(q1, { features: Q1, children: /* @__PURE__ */ f.jsx(mO, { children: w && /* @__PURE__ */ f.jsx(
        X1.div,
        {
          className: u6,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: w
        },
        w
      ) }) }),
      g && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: g }),
      T && /* @__PURE__ */ f.jsxs(_n, { severity: "warning", children: [
        /* @__PURE__ */ f.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          T.name,
          "?"
        ] }),
        /* @__PURE__ */ f.jsx(We, { variant: "danger", size: "sm", onClick: () => void U(), children: "Delete" }),
        /* @__PURE__ */ f.jsx(We, { variant: "ghost", size: "sm", onClick: () => M(null), children: "Cancel" })
      ] }),
      z ? /* @__PURE__ */ f.jsx(
        S6,
        {
          deploymentId: n.deploymentId,
          mapping: z,
          voiceAssets: c,
          allMappings: s,
          onNameChange: (V) => {
            J({ characterName: V });
          },
          onNameBlur: (V) => {
            V !== z.characterName && V.trim() && G({ characterName: V.trim() });
          },
          onSpeakerChange: (V) => {
            J({ speakerVoiceAssetId: V }), G({ speakerVoiceAssetId: V });
          },
          onModeChange: (V) => {
            J({ defaultEmotionMode: V }), G({ defaultEmotionMode: V });
          },
          onQwenChange: (V) => {
            J({ defaultQwenTemplate: V });
          },
          onQwenBlur: (V) => {
            G({ defaultQwenTemplate: V });
          },
          onSpeedChange: (V) => {
            J({ defaultSpeedFactor: V });
          },
          onSpeedCommit: (V) => {
            G({ defaultSpeedFactor: V });
          },
          onEmotionVoiceChange: (V) => {
            const q = V || null;
            J({ defaultEmotionVoiceAssetId: q }), G({ defaultEmotionVoiceAssetId: q });
          },
          onDelete: A,
          onUploadVoice: async (V, q, Q) => {
            const te = await I(V, q, Q);
            return te && Q === "speaker" && (J({ speakerVoiceAssetId: te.voiceAssetId }), G({ speakerVoiceAssetId: te.voiceAssetId })), await _(), te;
          },
          onTestLine: oe,
          onEditChainPersisted: me,
          onEditError: ge
        },
        z.mappingId
      ) : /* @__PURE__ */ f.jsx(
        x6,
        {
          voiceCount: c.length,
          onUploadVoice: async (V) => {
            await I(V, V.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function x6({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ f.jsxs(La, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ f.jsxs("div", { className: m6, children: [
      /* @__PURE__ */ f.jsx("p", { className: Ki, children: "01 / Onboarding" }),
      /* @__PURE__ */ f.jsx("h2", { id: "onboarding-heading", className: p6, children: "Upload your first voice" }),
      /* @__PURE__ */ f.jsxs("p", { className: g6, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ f.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ f.jsx(
      Z1,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (r) => (await a(r), null)
      }
    )
  ] }) : /* @__PURE__ */ f.jsx(La, { density: "airy", children: /* @__PURE__ */ f.jsx(
    Ts,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function S6(n) {
  const { mapping: a, voiceAssets: r, allMappings: s } = n, o = r.find((N) => N.voiceAssetId === a.speakerVoiceAssetId) ?? null, c = x.useMemo(
    () => s.filter(
      (N) => N.isActive && N.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((N) => N.characterName),
    [s, a.speakerVoiceAssetId]
  ), h = r.find((N) => N.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [m, v] = x.useState(""), [p, b] = x.useState("mp3"), [g, S] = x.useState("idle"), [w, j] = x.useState(null), T = x.useRef(!1);
  x.useEffect(() => (T.current = !1, () => {
    T.current = !0;
  }), []);
  const M = x.useCallback(async () => {
    T.current = !1, S("running"), j(null);
    const N = await n.onTestLine(m, p);
    if (T.current) return;
    if (!N) {
      S("error"), j("Failed to enqueue test-line run.");
      return;
    }
    const { runId: L } = N;
    for (let z = 0; z < 60; z += 1) {
      if (await new Promise((_) => setTimeout(_, 500)), T.current) return;
      try {
        const _ = await Nh(n.deploymentId, L);
        if (T.current) return;
        if (_.status === "completed") {
          S("done");
          return;
        }
        if (_.status === "failed" || _.status === "cancelled") {
          S("error"), j(`Run ${_.status}.`);
          return;
        }
      } catch (_) {
        if (T.current) return;
        S("error"), j(_ instanceof Error ? _.message : "unknown error");
        return;
      }
    }
    T.current || (S("error"), j("test-line timed out after 30s"));
  }, [n.onTestLine, n.deploymentId, m, p]);
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsxs("header", { className: J4, children: [
      /* @__PURE__ */ f.jsxs("div", { children: [
        /* @__PURE__ */ f.jsx("p", { className: Ki, children: "Character" }),
        /* @__PURE__ */ f.jsx("h2", { className: W4, children: a.characterName })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: P1, children: /* @__PURE__ */ f.jsx(We, { variant: "danger", size: "sm", onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ f.jsxs(
      La,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: c6,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "text",
              className: d6,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: m,
              onChange: (N) => v(N.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: g === "running"
            }
          ),
          /* @__PURE__ */ f.jsxs(
            "select",
            {
              className: Yr,
              value: p,
              onChange: (N) => b(N.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: g === "running",
              children: [
                /* @__PURE__ */ f.jsx("option", { value: "mp3", children: "mp3" }),
                /* @__PURE__ */ f.jsx("option", { value: "wav", children: "wav" }),
                /* @__PURE__ */ f.jsx("option", { value: "flac", children: "flac" })
              ]
            }
          ),
          /* @__PURE__ */ f.jsx(
            We,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void M(),
              disabled: g === "running",
              children: g === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          g === "done" && /* @__PURE__ */ f.jsx(vi, { tone: "success", children: "Synthesised — see host logs for output path." }),
          g === "error" && w && /* @__PURE__ */ f.jsx(vi, { tone: "danger", children: w })
        ]
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: e6, children: [
      /* @__PURE__ */ f.jsxs(La, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ f.jsx("h3", { id: "identity-heading", className: Ki, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ f.jsxs("label", { className: ts, children: [
          /* @__PURE__ */ f.jsx("span", { className: Fi, children: "Character name" }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              className: Yr,
              value: a.characterName,
              onChange: (N) => n.onNameChange(N.currentTarget.value),
              onBlur: (N) => n.onNameBlur(N.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: ts, children: [
          /* @__PURE__ */ f.jsx("span", { className: Fi, children: "Emotion mode" }),
          /* @__PURE__ */ f.jsx(
            "select",
            {
              className: Yr,
              value: a.defaultEmotionMode,
              onChange: (N) => n.onModeChange(N.currentTarget.value),
              children: y6.map((N) => /* @__PURE__ */ f.jsx("option", { value: N, children: C6(N) }, N))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ f.jsxs("label", { className: ts, children: [
          /* @__PURE__ */ f.jsxs("span", { className: Fi, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ f.jsx(
            "textarea",
            {
              className: t6,
              value: a.defaultQwenTemplate ?? "",
              onChange: (N) => n.onQwenChange(N.currentTarget.value),
              onBlur: (N) => n.onQwenBlur(N.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ f.jsxs("label", { className: ts, children: [
          /* @__PURE__ */ f.jsx("span", { className: Fi, children: "Emotion reference" }),
          /* @__PURE__ */ f.jsxs(
            "select",
            {
              className: Yr,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (N) => n.onEmotionVoiceChange(N.currentTarget.value),
              children: [
                /* @__PURE__ */ f.jsx("option", { value: "", children: "— none —" }),
                r.map((N) => /* @__PURE__ */ f.jsxs("option", { value: N.voiceAssetId, children: [
                  N.displayName,
                  " · ",
                  N.kind
                ] }, N.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: ts, children: [
          /* @__PURE__ */ f.jsxs("span", { className: Fi, children: [
            "Speed · ",
            a.defaultSpeedFactor?.toFixed(2) ?? "—",
            "×"
          ] }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "range",
              min: 0.5,
              max: 2,
              step: 0.05,
              value: a.defaultSpeedFactor ?? 1,
              onChange: (N) => n.onSpeedChange(Number(N.currentTarget.value)),
              onMouseUp: (N) => n.onSpeedCommit(Number(N.currentTarget.value)),
              onTouchEnd: (N) => n.onSpeedCommit(Number(N.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs(La, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ f.jsx("h3", { id: "voice-heading", className: Ki, children: "02 / Voice Reference" }),
        /* @__PURE__ */ f.jsx("span", { className: Fi, children: "Speaker reference" }),
        /* @__PURE__ */ f.jsx(
          w6,
          {
            value: a.speakerVoiceAssetId,
            voices: r,
            onChange: n.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ f.jsx(vb, { voice: o }),
        /* @__PURE__ */ f.jsx(
          Z1,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (N) => n.onUploadVoice(N, N.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ f.jsx(
          U4,
          {
            voiceAsset: o,
            deploymentId: n.deploymentId,
            affectedCharacterNames: c,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        h && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          /* @__PURE__ */ f.jsx("span", { className: Fi, children: "Emotion reference voice" }),
          /* @__PURE__ */ f.jsx(vb, { voice: h })
        ] })
      ] })
    ] })
  ] });
}
function w6({
  value: n,
  voices: a,
  onChange: r
}) {
  return /* @__PURE__ */ f.jsxs(
    "select",
    {
      className: Yr,
      value: n,
      onChange: (s) => r(s.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ f.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((s) => /* @__PURE__ */ f.jsx("option", { value: s.voiceAssetId, children: s.displayName }, s.voiceAssetId))
      ]
    }
  );
}
function vb({ voice: n }) {
  const a = M6(n.durationMs ?? null);
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: r6, children: [
      /* @__PURE__ */ f.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ f.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ f.jsx("span", { children: R6(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ f.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ f.jsxs("div", { className: l6, children: [
      /* @__PURE__ */ f.jsx("div", { className: s6, children: /* @__PURE__ */ f.jsx(q1, { features: Q1, children: /* @__PURE__ */ f.jsx(
        X1.div,
        {
          className: o6,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ f.jsx(vi, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ f.jsx(E6, { seed: n.contentSha256 })
  ] });
}
function E6({ seed: n }) {
  const a = x.useMemo(() => A6(n, 48), [n]);
  return /* @__PURE__ */ f.jsx("div", { className: f6, "aria-hidden": "true", children: a.map((r, s) => /* @__PURE__ */ f.jsx(
    "span",
    {
      className: h6,
      style: { height: `${Math.max(6, r * 100)}%` }
    },
    `${n}-${s}`
  )) });
}
function Z1({
  label: n,
  onFile: a
}) {
  const [r, s] = x.useState(!1), [o, c] = x.useState(!1), h = x.useRef(null), m = x.useCallback(
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
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: o ? i6 : r ? a6 : n6,
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
        /* @__PURE__ */ f.jsx(
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
function j6({
  onExport: n,
  onImport: a,
  onParseError: r
}) {
  const [s, o] = x.useState("error"), c = x.useRef(null);
  return /* @__PURE__ */ f.jsxs("div", { className: P1, children: [
    /* @__PURE__ */ f.jsx(We, { variant: "secondary", size: "sm", onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        ref: c,
        type: "file",
        accept: "application/json,.json",
        className: v6,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (h) => {
          const m = h.currentTarget.files?.[0];
          if (h.currentTarget.value = "", !!m)
            try {
              const v = await m.text(), p = JSON.parse(v);
              a(p, s);
            } catch {
              r("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ f.jsx(We, { variant: "secondary", size: "sm", onClick: () => c.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ f.jsxs(
      "select",
      {
        className: Yr,
        value: s,
        onChange: (h) => o(h.currentTarget.value),
        "aria-label": "Import conflict strategy",
        children: [
          /* @__PURE__ */ f.jsx("option", { value: "error", children: "Error on conflict" }),
          /* @__PURE__ */ f.jsx("option", { value: "skip", children: "Skip existing" }),
          /* @__PURE__ */ f.jsx("option", { value: "replace", children: "Replace existing" })
        ]
      }
    )
  ] });
}
function T6(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let r = 1;
  for (; a.has(`character ${r}`); ) r += 1;
  return `Character ${r}`;
}
function N6(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function C6(n) {
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
function M6(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function R6(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function A6(n, a) {
  const r = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    r.push((o * 31 + s * 7) % 100 / 100);
  }
  return r;
}
function _6(n, a) {
  const r = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(r), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function di(n) {
  return n instanceof Jr || n instanceof Error ? n.message : "unknown error";
}
function D6() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await LT();
        return { deployments: n };
      },
      Component: hN
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = Hr(n, "deploymentId");
        return IE(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = Hr(n, "deploymentId"), [r, { mappings: s }, { runs: o }, c] = await Promise.all([
          yy(a),
          by(a),
          BT(a, { limit: 10 }),
          IT(a)
        ]);
        return { deployment: r, mappings: s, runs: o, workflow: c };
      },
      Component: f_
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = Hr(n, "deploymentId"), r = Hr(n, "runId");
        return { run: await Nh(a, r) };
      },
      Component: C3
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = Hr(n, "deploymentId"), [r, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          yy(a),
          by(a),
          hs(a)
        ]);
        return { deployment: r, mappings: s, voiceAssets: o };
      },
      Component: b6
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const r = Hr(n, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: r,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: lD
    },
    {
      path: "/runtime/queue",
      Component: nD
    }
  ];
}
function Hr(n, a) {
  const r = n[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const ch = "emotion-tts-app", z6 = "ext-event", yb = "emotion-tts-stylesheet", bb = ["accent", "density", "card"];
function O6(n) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[n];
}
function L6() {
  if (typeof document > "u" || document.getElementById(yb)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = yb, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
L6();
class U6 extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = mE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.paint();
  }
  attributeChangedCallback() {
    this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null;
  }
  syncTweaksFromBody() {
    for (const a of bb) {
      const r = O6(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: bb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), r = Pj(D6(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ f.jsx(x.StrictMode, { children: /* @__PURE__ */ f.jsx(Jj, { router: r }) })
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
      new CustomEvent(z6, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function k6() {
  typeof customElements > "u" || customElements.get(ch) || customElements.define(ch, U6);
}
typeof customElements < "u" && !customElements.get(ch) && k6();
export {
  k6 as register
};
//# sourceMappingURL=emotion-tts.js.map
