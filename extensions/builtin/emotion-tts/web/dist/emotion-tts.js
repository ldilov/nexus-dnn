function lT(t, a) {
  for (var l = 0; l < a.length; l++) {
    const s = a[l];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const o in s)
        if (o !== "default" && !(o in t)) {
          const c = Object.getOwnPropertyDescriptor(s, o);
          c && Object.defineProperty(t, o, c.get ? c : {
            enumerable: !0,
            get: () => s[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function rT(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var qf = { exports: {} }, Vr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jg;
function sT() {
  if (jg) return Vr;
  jg = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function l(s, o, c) {
    var f = null;
    if (c !== void 0 && (f = "" + c), o.key !== void 0 && (f = "" + o.key), "key" in o) {
      c = {};
      for (var h in o)
        h !== "key" && (c[h] = o[h]);
    } else c = o;
    return o = c.ref, {
      $$typeof: t,
      type: s,
      key: f,
      ref: o !== void 0 ? o : null,
      props: c
    };
  }
  return Vr.Fragment = a, Vr.jsx = l, Vr.jsxs = l, Vr;
}
var Dg;
function oT() {
  return Dg || (Dg = 1, qf.exports = sT()), qf.exports;
}
var g = oT(), Pf = { exports: {} }, Me = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ng;
function uT() {
  if (Ng) return Me;
  Ng = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), f = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), x = Symbol.iterator;
  function E(M) {
    return M === null || typeof M != "object" ? null : (M = x && M[x] || M["@@iterator"], typeof M == "function" ? M : null);
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
  }, R = Object.assign, D = {};
  function B(M, K, se) {
    this.props = M, this.context = K, this.refs = D, this.updater = se || w;
  }
  B.prototype.isReactComponent = {}, B.prototype.setState = function(M, K) {
    if (typeof M != "object" && typeof M != "function" && M != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, M, K, "setState");
  }, B.prototype.forceUpdate = function(M) {
    this.updater.enqueueForceUpdate(this, M, "forceUpdate");
  };
  function z() {
  }
  z.prototype = B.prototype;
  function _(M, K, se) {
    this.props = M, this.context = K, this.refs = D, this.updater = se || w;
  }
  var k = _.prototype = new z();
  k.constructor = _, R(k, B.prototype), k.isPureReactComponent = !0;
  var G = Array.isArray;
  function ee() {
  }
  var te = { H: null, A: null, T: null, S: null }, C = Object.prototype.hasOwnProperty;
  function O(M, K, se) {
    var ce = se.ref;
    return {
      $$typeof: t,
      type: M,
      key: K,
      ref: ce !== void 0 ? ce : null,
      props: se
    };
  }
  function X(M, K) {
    return O(M.type, K, M.props);
  }
  function ae(M) {
    return typeof M == "object" && M !== null && M.$$typeof === t;
  }
  function I(M) {
    var K = { "=": "=0", ":": "=2" };
    return "$" + M.replace(/[=:]/g, function(se) {
      return K[se];
    });
  }
  var le = /\/+/g;
  function ue(M, K) {
    return typeof M == "object" && M !== null && M.key != null ? I("" + M.key) : K.toString(36);
  }
  function re(M) {
    switch (M.status) {
      case "fulfilled":
        return M.value;
      case "rejected":
        throw M.reason;
      default:
        switch (typeof M.status == "string" ? M.then(ee, ee) : (M.status = "pending", M.then(
          function(K) {
            M.status === "pending" && (M.status = "fulfilled", M.value = K);
          },
          function(K) {
            M.status === "pending" && (M.status = "rejected", M.reason = K);
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
  function U(M, K, se, ce, Ee) {
    var Re = typeof M;
    (Re === "undefined" || Re === "boolean") && (M = null);
    var De = !1;
    if (M === null) De = !0;
    else
      switch (Re) {
        case "bigint":
        case "string":
        case "number":
          De = !0;
          break;
        case "object":
          switch (M.$$typeof) {
            case t:
            case a:
              De = !0;
              break;
            case y:
              return De = M._init, U(
                De(M._payload),
                K,
                se,
                ce,
                Ee
              );
          }
      }
    if (De)
      return Ee = Ee(M), De = ce === "" ? "." + ue(M, 0) : ce, G(Ee) ? (se = "", De != null && (se = De.replace(le, "$&/") + "/"), U(Ee, K, se, "", function(ta) {
        return ta;
      })) : Ee != null && (ae(Ee) && (Ee = X(
        Ee,
        se + (Ee.key == null || M && M.key === Ee.key ? "" : ("" + Ee.key).replace(
          le,
          "$&/"
        ) + "/") + De
      )), K.push(Ee)), 1;
    De = 0;
    var ht = ce === "" ? "." : ce + ":";
    if (G(M))
      for (var Xe = 0; Xe < M.length; Xe++)
        ce = M[Xe], Re = ht + ue(ce, Xe), De += U(
          ce,
          K,
          se,
          Re,
          Ee
        );
    else if (Xe = E(M), typeof Xe == "function")
      for (M = Xe.call(M), Xe = 0; !(ce = M.next()).done; )
        ce = ce.value, Re = ht + ue(ce, Xe++), De += U(
          ce,
          K,
          se,
          Re,
          Ee
        );
    else if (Re === "object") {
      if (typeof M.then == "function")
        return U(
          re(M),
          K,
          se,
          ce,
          Ee
        );
      throw K = String(M), Error(
        "Objects are not valid as a React child (found: " + (K === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : K) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function H(M, K, se) {
    if (M == null) return M;
    var ce = [], Ee = 0;
    return U(M, ce, "", "", function(Re) {
      return K.call(se, Re, Ee++);
    }), ce;
  }
  function J(M) {
    if (M._status === -1) {
      var K = M._result;
      K = K(), K.then(
        function(se) {
          (M._status === 0 || M._status === -1) && (M._status = 1, M._result = se);
        },
        function(se) {
          (M._status === 0 || M._status === -1) && (M._status = 2, M._result = se);
        }
      ), M._status === -1 && (M._status = 0, M._result = K);
    }
    if (M._status === 1) return M._result.default;
    throw M._result;
  }
  var ne = typeof reportError == "function" ? reportError : function(M) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var K = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof M == "object" && M !== null && typeof M.message == "string" ? String(M.message) : String(M),
        error: M
      });
      if (!window.dispatchEvent(K)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", M);
      return;
    }
    console.error(M);
  }, fe = {
    map: H,
    forEach: function(M, K, se) {
      H(
        M,
        function() {
          K.apply(this, arguments);
        },
        se
      );
    },
    count: function(M) {
      var K = 0;
      return H(M, function() {
        K++;
      }), K;
    },
    toArray: function(M) {
      return H(M, function(K) {
        return K;
      }) || [];
    },
    only: function(M) {
      if (!ae(M))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return M;
    }
  };
  return Me.Activity = b, Me.Children = fe, Me.Component = B, Me.Fragment = l, Me.Profiler = o, Me.PureComponent = _, Me.StrictMode = s, Me.Suspense = p, Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = te, Me.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(M) {
      return te.H.useMemoCache(M);
    }
  }, Me.cache = function(M) {
    return function() {
      return M.apply(null, arguments);
    };
  }, Me.cacheSignal = function() {
    return null;
  }, Me.cloneElement = function(M, K, se) {
    if (M == null)
      throw Error(
        "The argument must be a React element, but you passed " + M + "."
      );
    var ce = R({}, M.props), Ee = M.key;
    if (K != null)
      for (Re in K.key !== void 0 && (Ee = "" + K.key), K)
        !C.call(K, Re) || Re === "key" || Re === "__self" || Re === "__source" || Re === "ref" && K.ref === void 0 || (ce[Re] = K[Re]);
    var Re = arguments.length - 2;
    if (Re === 1) ce.children = se;
    else if (1 < Re) {
      for (var De = Array(Re), ht = 0; ht < Re; ht++)
        De[ht] = arguments[ht + 2];
      ce.children = De;
    }
    return O(M.type, Ee, ce);
  }, Me.createContext = function(M) {
    return M = {
      $$typeof: f,
      _currentValue: M,
      _currentValue2: M,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, M.Provider = M, M.Consumer = {
      $$typeof: c,
      _context: M
    }, M;
  }, Me.createElement = function(M, K, se) {
    var ce, Ee = {}, Re = null;
    if (K != null)
      for (ce in K.key !== void 0 && (Re = "" + K.key), K)
        C.call(K, ce) && ce !== "key" && ce !== "__self" && ce !== "__source" && (Ee[ce] = K[ce]);
    var De = arguments.length - 2;
    if (De === 1) Ee.children = se;
    else if (1 < De) {
      for (var ht = Array(De), Xe = 0; Xe < De; Xe++)
        ht[Xe] = arguments[Xe + 2];
      Ee.children = ht;
    }
    if (M && M.defaultProps)
      for (ce in De = M.defaultProps, De)
        Ee[ce] === void 0 && (Ee[ce] = De[ce]);
    return O(M, Re, Ee);
  }, Me.createRef = function() {
    return { current: null };
  }, Me.forwardRef = function(M) {
    return { $$typeof: h, render: M };
  }, Me.isValidElement = ae, Me.lazy = function(M) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: M },
      _init: J
    };
  }, Me.memo = function(M, K) {
    return {
      $$typeof: m,
      type: M,
      compare: K === void 0 ? null : K
    };
  }, Me.startTransition = function(M) {
    var K = te.T, se = {};
    te.T = se;
    try {
      var ce = M(), Ee = te.S;
      Ee !== null && Ee(se, ce), typeof ce == "object" && ce !== null && typeof ce.then == "function" && ce.then(ee, ne);
    } catch (Re) {
      ne(Re);
    } finally {
      K !== null && se.types !== null && (K.types = se.types), te.T = K;
    }
  }, Me.unstable_useCacheRefresh = function() {
    return te.H.useCacheRefresh();
  }, Me.use = function(M) {
    return te.H.use(M);
  }, Me.useActionState = function(M, K, se) {
    return te.H.useActionState(M, K, se);
  }, Me.useCallback = function(M, K) {
    return te.H.useCallback(M, K);
  }, Me.useContext = function(M) {
    return te.H.useContext(M);
  }, Me.useDebugValue = function() {
  }, Me.useDeferredValue = function(M, K) {
    return te.H.useDeferredValue(M, K);
  }, Me.useEffect = function(M, K) {
    return te.H.useEffect(M, K);
  }, Me.useEffectEvent = function(M) {
    return te.H.useEffectEvent(M);
  }, Me.useId = function() {
    return te.H.useId();
  }, Me.useImperativeHandle = function(M, K, se) {
    return te.H.useImperativeHandle(M, K, se);
  }, Me.useInsertionEffect = function(M, K) {
    return te.H.useInsertionEffect(M, K);
  }, Me.useLayoutEffect = function(M, K) {
    return te.H.useLayoutEffect(M, K);
  }, Me.useMemo = function(M, K) {
    return te.H.useMemo(M, K);
  }, Me.useOptimistic = function(M, K) {
    return te.H.useOptimistic(M, K);
  }, Me.useReducer = function(M, K, se) {
    return te.H.useReducer(M, K, se);
  }, Me.useRef = function(M) {
    return te.H.useRef(M);
  }, Me.useState = function(M) {
    return te.H.useState(M);
  }, Me.useSyncExternalStore = function(M, K, se) {
    return te.H.useSyncExternalStore(
      M,
      K,
      se
    );
  }, Me.useTransition = function() {
    return te.H.useTransition();
  }, Me.version = "19.2.5", Me;
}
var zg;
function eh() {
  return zg || (zg = 1, Pf.exports = uT()), Pf.exports;
}
var S = eh();
const cT = /* @__PURE__ */ rT(S), fT = /* @__PURE__ */ lT({
  __proto__: null,
  default: cT
}, [S]);
var Yf = { exports: {} }, Br = {}, Ff = { exports: {} }, Gf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _g;
function dT() {
  return _g || (_g = 1, (function(t) {
    function a(U, H) {
      var J = U.length;
      U.push(H);
      e: for (; 0 < J; ) {
        var ne = J - 1 >>> 1, fe = U[ne];
        if (0 < o(fe, H))
          U[ne] = H, U[J] = fe, J = ne;
        else break e;
      }
    }
    function l(U) {
      return U.length === 0 ? null : U[0];
    }
    function s(U) {
      if (U.length === 0) return null;
      var H = U[0], J = U.pop();
      if (J !== H) {
        U[0] = J;
        e: for (var ne = 0, fe = U.length, M = fe >>> 1; ne < M; ) {
          var K = 2 * (ne + 1) - 1, se = U[K], ce = K + 1, Ee = U[ce];
          if (0 > o(se, J))
            ce < fe && 0 > o(Ee, se) ? (U[ne] = Ee, U[ce] = J, ne = ce) : (U[ne] = se, U[K] = J, ne = K);
          else if (ce < fe && 0 > o(Ee, J))
            U[ne] = Ee, U[ce] = J, ne = ce;
          else break e;
        }
      }
      return H;
    }
    function o(U, H) {
      var J = U.sortIndex - H.sortIndex;
      return J !== 0 ? J : U.id - H.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      t.unstable_now = function() {
        return c.now();
      };
    } else {
      var f = Date, h = f.now();
      t.unstable_now = function() {
        return f.now() - h;
      };
    }
    var p = [], m = [], y = 1, b = null, x = 3, E = !1, w = !1, R = !1, D = !1, B = typeof setTimeout == "function" ? setTimeout : null, z = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function k(U) {
      for (var H = l(m); H !== null; ) {
        if (H.callback === null) s(m);
        else if (H.startTime <= U)
          s(m), H.sortIndex = H.expirationTime, a(p, H);
        else break;
        H = l(m);
      }
    }
    function G(U) {
      if (R = !1, k(U), !w)
        if (l(p) !== null)
          w = !0, ee || (ee = !0, I());
        else {
          var H = l(m);
          H !== null && re(G, H.startTime - U);
        }
    }
    var ee = !1, te = -1, C = 5, O = -1;
    function X() {
      return D ? !0 : !(t.unstable_now() - O < C);
    }
    function ae() {
      if (D = !1, ee) {
        var U = t.unstable_now();
        O = U;
        var H = !0;
        try {
          e: {
            w = !1, R && (R = !1, z(te), te = -1), E = !0;
            var J = x;
            try {
              t: {
                for (k(U), b = l(p); b !== null && !(b.expirationTime > U && X()); ) {
                  var ne = b.callback;
                  if (typeof ne == "function") {
                    b.callback = null, x = b.priorityLevel;
                    var fe = ne(
                      b.expirationTime <= U
                    );
                    if (U = t.unstable_now(), typeof fe == "function") {
                      b.callback = fe, k(U), H = !0;
                      break t;
                    }
                    b === l(p) && s(p), k(U);
                  } else s(p);
                  b = l(p);
                }
                if (b !== null) H = !0;
                else {
                  var M = l(m);
                  M !== null && re(
                    G,
                    M.startTime - U
                  ), H = !1;
                }
              }
              break e;
            } finally {
              b = null, x = J, E = !1;
            }
            H = void 0;
          }
        } finally {
          H ? I() : ee = !1;
        }
      }
    }
    var I;
    if (typeof _ == "function")
      I = function() {
        _(ae);
      };
    else if (typeof MessageChannel < "u") {
      var le = new MessageChannel(), ue = le.port2;
      le.port1.onmessage = ae, I = function() {
        ue.postMessage(null);
      };
    } else
      I = function() {
        B(ae, 0);
      };
    function re(U, H) {
      te = B(function() {
        U(t.unstable_now());
      }, H);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, t.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : C = 0 < U ? Math.floor(1e3 / U) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return x;
    }, t.unstable_next = function(U) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = x;
      }
      var J = x;
      x = H;
      try {
        return U();
      } finally {
        x = J;
      }
    }, t.unstable_requestPaint = function() {
      D = !0;
    }, t.unstable_runWithPriority = function(U, H) {
      switch (U) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          U = 3;
      }
      var J = x;
      x = U;
      try {
        return H();
      } finally {
        x = J;
      }
    }, t.unstable_scheduleCallback = function(U, H, J) {
      var ne = t.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? ne + J : ne) : J = ne, U) {
        case 1:
          var fe = -1;
          break;
        case 2:
          fe = 250;
          break;
        case 5:
          fe = 1073741823;
          break;
        case 4:
          fe = 1e4;
          break;
        default:
          fe = 5e3;
      }
      return fe = J + fe, U = {
        id: y++,
        callback: H,
        priorityLevel: U,
        startTime: J,
        expirationTime: fe,
        sortIndex: -1
      }, J > ne ? (U.sortIndex = J, a(m, U), l(p) === null && U === l(m) && (R ? (z(te), te = -1) : R = !0, re(G, J - ne))) : (U.sortIndex = fe, a(p, U), w || E || (w = !0, ee || (ee = !0, I()))), U;
    }, t.unstable_shouldYield = X, t.unstable_wrapCallback = function(U) {
      var H = x;
      return function() {
        var J = x;
        x = H;
        try {
          return U.apply(this, arguments);
        } finally {
          x = J;
        }
      };
    };
  })(Gf)), Gf;
}
var Og;
function hT() {
  return Og || (Og = 1, Ff.exports = dT()), Ff.exports;
}
var $f = { exports: {} }, Pt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lg;
function mT() {
  if (Lg) return Pt;
  Lg = 1;
  var t = eh();
  function a(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + p + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l() {
  }
  var s = {
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
  }, o = Symbol.for("react.portal");
  function c(p, m, y) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: b == null ? null : "" + b,
      children: p,
      containerInfo: m,
      implementation: y
    };
  }
  var f = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, m) {
    if (p === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Pt.createPortal = function(p, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return c(p, m, null, y);
  }, Pt.flushSync = function(p) {
    var m = f.T, y = s.p;
    try {
      if (f.T = null, s.p = 2, p) return p();
    } finally {
      f.T = m, s.p = y, s.d.f();
    }
  }, Pt.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(p, m));
  }, Pt.prefetchDNS = function(p) {
    typeof p == "string" && s.d.D(p);
  }, Pt.preinit = function(p, m) {
    if (typeof p == "string" && m && typeof m.as == "string") {
      var y = m.as, b = h(y, m.crossOrigin), x = typeof m.integrity == "string" ? m.integrity : void 0, E = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? s.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: b,
          integrity: x,
          fetchPriority: E
        }
      ) : y === "script" && s.d.X(p, {
        crossOrigin: b,
        integrity: x,
        fetchPriority: E,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, Pt.preinitModule = function(p, m) {
    if (typeof p == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var y = h(
            m.as,
            m.crossOrigin
          );
          s.d.M(p, {
            crossOrigin: y,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && s.d.M(p);
  }, Pt.preload = function(p, m) {
    if (typeof p == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var y = m.as, b = h(y, m.crossOrigin);
      s.d.L(p, y, {
        crossOrigin: b,
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
  }, Pt.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var y = h(m.as, m.crossOrigin);
        s.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else s.d.m(p);
  }, Pt.requestFormReset = function(p) {
    s.d.r(p);
  }, Pt.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, Pt.useFormState = function(p, m, y) {
    return f.H.useFormState(p, m, y);
  }, Pt.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, Pt.version = "19.2.5", Pt;
}
var Ug;
function pT() {
  if (Ug) return $f.exports;
  Ug = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), $f.exports = mT(), $f.exports;
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
var Vg;
function yT() {
  if (Vg) return Br;
  Vg = 1;
  var t = hT(), a = eh(), l = pT();
  function s(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        n += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function c(e) {
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
    if (c(e) !== e)
      throw Error(s(188));
  }
  function m(e) {
    var n = e.alternate;
    if (!n) {
      if (n = c(e), n === null) throw Error(s(188));
      return n !== e ? null : e;
    }
    for (var i = e, r = n; ; ) {
      var u = i.return;
      if (u === null) break;
      var d = u.alternate;
      if (d === null) {
        if (r = u.return, r !== null) {
          i = r;
          continue;
        }
        break;
      }
      if (u.child === d.child) {
        for (d = u.child; d; ) {
          if (d === i) return p(u), e;
          if (d === r) return p(u), n;
          d = d.sibling;
        }
        throw Error(s(188));
      }
      if (i.return !== r.return) i = u, r = d;
      else {
        for (var v = !1, T = u.child; T; ) {
          if (T === i) {
            v = !0, i = u, r = d;
            break;
          }
          if (T === r) {
            v = !0, r = u, i = d;
            break;
          }
          T = T.sibling;
        }
        if (!v) {
          for (T = d.child; T; ) {
            if (T === i) {
              v = !0, i = d, r = u;
              break;
            }
            if (T === r) {
              v = !0, r = d, i = u;
              break;
            }
            T = T.sibling;
          }
          if (!v) throw Error(s(189));
        }
      }
      if (i.alternate !== r) throw Error(s(190));
    }
    if (i.tag !== 3) throw Error(s(188));
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
  var b = Object.assign, x = Symbol.for("react.element"), E = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), B = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), G = Symbol.for("react.suspense"), ee = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), X = Symbol.for("react.memo_cache_sentinel"), ae = Symbol.iterator;
  function I(e) {
    return e === null || typeof e != "object" ? null : (e = ae && e[ae] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var le = Symbol.for("react.client.reference");
  function ue(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case R:
        return "Fragment";
      case B:
        return "Profiler";
      case D:
        return "StrictMode";
      case G:
        return "Suspense";
      case ee:
        return "SuspenseList";
      case O:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case _:
          return e.displayName || "Context";
        case z:
          return (e._context.displayName || "Context") + ".Consumer";
        case k:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case te:
          return n = e.displayName || null, n !== null ? n : ue(e.type) || "Memo";
        case C:
          n = e._payload, e = e._init;
          try {
            return ue(e(n));
          } catch {
          }
      }
    return null;
  }
  var re = Array.isArray, U = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ne = [], fe = -1;
  function M(e) {
    return { current: e };
  }
  function K(e) {
    0 > fe || (e.current = ne[fe], ne[fe] = null, fe--);
  }
  function se(e, n) {
    fe++, ne[fe] = e.current, e.current = n;
  }
  var ce = M(null), Ee = M(null), Re = M(null), De = M(null);
  function ht(e, n) {
    switch (se(Re, n), se(Ee, e), se(ce, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Jy(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Jy(n), e = Wy(n, e);
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
    K(ce), se(ce, e);
  }
  function Xe() {
    K(ce), K(Ee), K(Re);
  }
  function ta(e) {
    e.memoizedState !== null && se(De, e);
    var n = ce.current, i = Wy(n, e.type);
    n !== i && (se(Ee, e), se(ce, i));
  }
  function Ma(e) {
    Ee.current === e && (K(ce), K(Ee)), De.current === e && (K(De), _r._currentValue = J);
  }
  var qn, yt;
  function Ht(e) {
    if (qn === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        qn = n && n[1] || "", yt = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + qn + e + yt;
  }
  var Aa = !1;
  function hi(e, n) {
    if (!e || Aa) return "";
    Aa = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var W = function() {
                throw Error();
              };
              if (Object.defineProperty(W.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(W, []);
                } catch ($) {
                  var F = $;
                }
                Reflect.construct(e, [], W);
              } else {
                try {
                  W.call();
                } catch ($) {
                  F = $;
                }
                e.call(W.prototype);
              }
            } else {
              try {
                throw Error();
              } catch ($) {
                F = $;
              }
              (W = e()) && typeof W.catch == "function" && W.catch(function() {
              });
            }
          } catch ($) {
            if ($ && F && typeof $.stack == "string")
              return [$.stack, F.stack];
          }
          return [null, null];
        }
      };
      r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        r.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        r.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var d = r.DetermineComponentFrameRoot(), v = d[0], T = d[1];
      if (v && T) {
        var A = v.split(`
`), P = T.split(`
`);
        for (u = r = 0; r < A.length && !A[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; u < P.length && !P[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (r === A.length || u === P.length)
          for (r = A.length - 1, u = P.length - 1; 1 <= r && 0 <= u && A[r] !== P[u]; )
            u--;
        for (; 1 <= r && 0 <= u; r--, u--)
          if (A[r] !== P[u]) {
            if (r !== 1 || u !== 1)
              do
                if (r--, u--, 0 > u || A[r] !== P[u]) {
                  var Q = `
` + A[r].replace(" at new ", " at ");
                  return e.displayName && Q.includes("<anonymous>") && (Q = Q.replace("<anonymous>", e.displayName)), Q;
                }
              while (1 <= r && 0 <= u);
            break;
          }
      }
    } finally {
      Aa = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Ht(i) : "";
  }
  function xe(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ht(e.type);
      case 16:
        return Ht("Lazy");
      case 13:
        return e.child !== n && n !== null ? Ht("Suspense Fallback") : Ht("Suspense");
      case 19:
        return Ht("SuspenseList");
      case 0:
      case 15:
        return hi(e.type, !1);
      case 11:
        return hi(e.type.render, !1);
      case 1:
        return hi(e.type, !0);
      case 31:
        return Ht("Activity");
      default:
        return "";
    }
  }
  function Oe(e) {
    try {
      var n = "", i = null;
      do
        n += xe(e, i), i = e, e = e.return;
      while (e);
      return n;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var $e = Object.prototype.hasOwnProperty, ut = t.unstable_scheduleCallback, na = t.unstable_cancelCallback, ju = t.unstable_shouldYield, Du = t.unstable_requestPaint, Ft = t.unstable_now, aa = t.unstable_getCurrentPriorityLevel, ja = t.unstable_ImmediatePriority, Il = t.unstable_UserBlockingPriority, Da = t.unstable_NormalPriority, Nn = t.unstable_LowPriority, mn = t.unstable_IdlePriority, ys = t.log, Nu = t.unstable_setDisableYieldValue, ia = null, Gt = null;
  function Dt(e) {
    if (typeof ys == "function" && Nu(e), Gt && typeof Gt.setStrictMode == "function")
      try {
        Gt.setStrictMode(ia, e);
      } catch {
      }
  }
  var kt = Math.clz32 ? Math.clz32 : zu, gs = Math.log, vs = Math.LN2;
  function zu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (gs(e) / vs | 0) | 0;
  }
  var mi = 256, la = 262144, pi = 4194304;
  function zn(e) {
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
  function Ii(e, n, i) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var u = 0, d = e.suspendedLanes, v = e.pingedLanes;
    e = e.warmLanes;
    var T = r & 134217727;
    return T !== 0 ? (r = T & ~d, r !== 0 ? u = zn(r) : (v &= T, v !== 0 ? u = zn(v) : i || (i = T & ~e, i !== 0 && (u = zn(i))))) : (T = r & ~d, T !== 0 ? u = zn(T) : v !== 0 ? u = zn(v) : i || (i = r & ~e, i !== 0 && (u = zn(i)))), u === 0 ? 0 : n !== 0 && n !== u && (n & d) === 0 && (d = u & -u, i = n & -n, d >= i || d === 32 && (i & 4194048) !== 0) ? n : u;
  }
  function Na(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function _u(e, n) {
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
  function Kl() {
    var e = pi;
    return pi <<= 1, (pi & 62914560) === 0 && (pi = 4194304), e;
  }
  function za(e) {
    for (var n = [], i = 0; 31 > i; i++) n.push(e);
    return n;
  }
  function Pn(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function bs(e, n, i, r, u, d) {
    var v = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var T = e.entanglements, A = e.expirationTimes, P = e.hiddenUpdates;
    for (i = v & ~i; 0 < i; ) {
      var Q = 31 - kt(i), W = 1 << Q;
      T[Q] = 0, A[Q] = -1;
      var F = P[Q];
      if (F !== null)
        for (P[Q] = null, Q = 0; Q < F.length; Q++) {
          var $ = F[Q];
          $ !== null && ($.lane &= -536870913);
        }
      i &= ~W;
    }
    r !== 0 && xs(e, r, 0), d !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(v & ~n));
  }
  function xs(e, n, i) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var r = 31 - kt(n);
    e.entangledLanes |= n, e.entanglements[r] = e.entanglements[r] | 1073741824 | i & 261930;
  }
  function Ss(e, n) {
    var i = e.entangledLanes |= n;
    for (e = e.entanglements; i; ) {
      var r = 31 - kt(i), u = 1 << r;
      u & n | e[r] & n && (e[r] |= n), i &= ~u;
    }
  }
  function j(e, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : L(i), (i & (e.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function L(e) {
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
  function ie() {
    var e = H.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Eg(e.type));
  }
  function oe(e, n) {
    var i = H.p;
    try {
      return H.p = e, n();
    } finally {
      H.p = i;
    }
  }
  var ye = Math.random().toString(36).slice(2), de = "__reactFiber$" + ye, he = "__reactProps$" + ye, ve = "__reactContainer$" + ye, me = "__reactEvents$" + ye, we = "__reactListeners$" + ye, Se = "__reactHandles$" + ye, qe = "__reactResources$" + ye, Ne = "__reactMarker$" + ye;
  function et(e) {
    delete e[de], delete e[he], delete e[me], delete e[we], delete e[Se];
  }
  function Qe(e) {
    var n = e[de];
    if (n) return n;
    for (var i = e.parentNode; i; ) {
      if (n = i[ve] || i[de]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (e = rg(e); e !== null; ) {
            if (i = e[de]) return i;
            e = rg(e);
          }
        return n;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function ct(e) {
    if (e = e[de] || e[ve]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function Le(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(s(33));
  }
  function St(e) {
    var n = e[qe];
    return n || (n = e[qe] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function at(e) {
    e[Ne] = !0;
  }
  var _a = /* @__PURE__ */ new Set(), _n = {};
  function Nt(e, n) {
    Yn(e, n), Yn(e + "Capture", n);
  }
  function Yn(e, n) {
    for (_n[e] = n, e = 0; e < n.length; e++)
      _a.add(n[e]);
  }
  var yi = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Fn = {}, gi = {};
  function Ki(e) {
    return $e.call(gi, e) ? !0 : $e.call(Fn, e) ? !1 : yi.test(e) ? gi[e] = !0 : (Fn[e] = !0, !1);
  }
  function ze(e, n, i) {
    if (Ki(n))
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
  function gt(e, n, i) {
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
  function qt(e, n, i, r) {
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
  function Et(e) {
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
  function it(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Qi(e, n, i) {
    var r = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var u = r.get, d = r.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(v) {
          i = "" + v, d.call(this, v);
        }
      }), Object.defineProperty(e, n, {
        enumerable: r.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(v) {
          i = "" + v;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function Zi(e) {
    if (!e._valueTracker) {
      var n = it(e) ? "checked" : "value";
      e._valueTracker = Qi(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Es(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), r = "";
    return e && (r = it(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== i ? (n.setValue(e), !0) : !1;
  }
  function Ts(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var WS = /[\n"\\]/g;
  function pn(e) {
    return e.replace(
      WS,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ou(e, n, i, r, u, d, v, T) {
    e.name = "", v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? e.type = v : e.removeAttribute("type"), n != null ? v === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + Et(n)) : e.value !== "" + Et(n) && (e.value = "" + Et(n)) : v !== "submit" && v !== "reset" || e.removeAttribute("value"), n != null ? Lu(e, v, Et(n)) : i != null ? Lu(e, v, Et(i)) : r != null && e.removeAttribute("value"), u == null && d != null && (e.defaultChecked = !!d), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), T != null && typeof T != "function" && typeof T != "symbol" && typeof T != "boolean" ? e.name = "" + Et(T) : e.removeAttribute("name");
  }
  function $h(e, n, i, r, u, d, v, T) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), n != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        Zi(e);
        return;
      }
      i = i != null ? "" + Et(i) : "", n = n != null ? "" + Et(n) : i, T || n === e.value || (e.value = n), e.defaultValue = n;
    }
    r = r ?? u, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = T ? e.checked : !!r, e.defaultChecked = !!r, v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" && (e.name = v), Zi(e);
  }
  function Lu(e, n, i) {
    n === "number" && Ts(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function Ji(e, n, i, r) {
    if (e = e.options, n) {
      n = {};
      for (var u = 0; u < i.length; u++)
        n["$" + i[u]] = !0;
      for (i = 0; i < e.length; i++)
        u = n.hasOwnProperty("$" + e[i].value), e[i].selected !== u && (e[i].selected = u), u && r && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + Et(i), n = null, u = 0; u < e.length; u++) {
        if (e[u].value === i) {
          e[u].selected = !0, r && (e[u].defaultSelected = !0);
          return;
        }
        n !== null || e[u].disabled || (n = e[u]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Xh(e, n, i) {
    if (n != null && (n = "" + Et(n), n !== e.value && (e.value = n), i == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = i != null ? "" + Et(i) : "";
  }
  function Ih(e, n, i, r) {
    if (n == null) {
      if (r != null) {
        if (i != null) throw Error(s(92));
        if (re(r)) {
          if (1 < r.length) throw Error(s(93));
          r = r[0];
        }
        i = r;
      }
      i == null && (i = ""), n = i;
    }
    i = Et(n), e.defaultValue = i, r = e.textContent, r === i && r !== "" && r !== null && (e.value = r), Zi(e);
  }
  function Wi(e, n) {
    if (n) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var e1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Kh(e, n, i) {
    var r = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? r ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : r ? e.setProperty(n, i) : typeof i != "number" || i === 0 || e1.has(n) ? n === "float" ? e.cssFloat = i : e[n] = ("" + i).trim() : e[n] = i + "px";
  }
  function Qh(e, n, i) {
    if (n != null && typeof n != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var r in i)
        !i.hasOwnProperty(r) || n != null && n.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var u in n)
        r = n[u], n.hasOwnProperty(u) && i[u] !== r && Kh(e, u, r);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && Kh(e, d, n[d]);
  }
  function Uu(e) {
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
  var t1 = /* @__PURE__ */ new Map([
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
  ]), n1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ws(e) {
    return n1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ra() {
  }
  var Vu = null;
  function Bu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var el = null, tl = null;
  function Zh(e) {
    var n = ct(e);
    if (n && (e = n.stateNode)) {
      var i = e[he] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Ou(
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
              'input[name="' + pn(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < i.length; n++) {
              var r = i[n];
              if (r !== e && r.form === e.form) {
                var u = r[he] || null;
                if (!u) throw Error(s(90));
                Ou(
                  r,
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
            for (n = 0; n < i.length; n++)
              r = i[n], r.form === e.form && Es(r);
          }
          break e;
        case "textarea":
          Xh(e, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && Ji(e, !!i.multiple, n, !1);
      }
    }
  }
  var Hu = !1;
  function Jh(e, n, i) {
    if (Hu) return e(n, i);
    Hu = !0;
    try {
      var r = e(n);
      return r;
    } finally {
      if (Hu = !1, (el !== null || tl !== null) && (fo(), el && (n = el, e = tl, tl = el = null, Zh(n), e)))
        for (n = 0; n < e.length; n++) Zh(e[n]);
    }
  }
  function Ql(e, n) {
    var i = e.stateNode;
    if (i === null) return null;
    var r = i[he] || null;
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
        s(231, n, typeof i)
      );
    return i;
  }
  var sa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ku = !1;
  if (sa)
    try {
      var Zl = {};
      Object.defineProperty(Zl, "passive", {
        get: function() {
          ku = !0;
        }
      }), window.addEventListener("test", Zl, Zl), window.removeEventListener("test", Zl, Zl);
    } catch {
      ku = !1;
    }
  var Oa = null, qu = null, Rs = null;
  function Wh() {
    if (Rs) return Rs;
    var e, n = qu, i = n.length, r, u = "value" in Oa ? Oa.value : Oa.textContent, d = u.length;
    for (e = 0; e < i && n[e] === u[e]; e++) ;
    var v = i - e;
    for (r = 1; r <= v && n[i - r] === u[d - r]; r++) ;
    return Rs = u.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Cs(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ms() {
    return !0;
  }
  function em() {
    return !1;
  }
  function Qt(e) {
    function n(i, r, u, d, v) {
      this._reactName = i, this._targetInst = u, this.type = r, this.nativeEvent = d, this.target = v, this.currentTarget = null;
      for (var T in e)
        e.hasOwnProperty(T) && (i = e[T], this[T] = i ? i(d) : d[T]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Ms : em, this.isPropagationStopped = em, this;
    }
    return b(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Ms);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Ms);
      },
      persist: function() {
      },
      isPersistent: Ms
    }), n;
  }
  var vi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, As = Qt(vi), Jl = b({}, vi, { view: 0, detail: 0 }), a1 = Qt(Jl), Pu, Yu, Wl, js = b({}, Jl, {
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
    getModifierState: Gu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Wl && (Wl && e.type === "mousemove" ? (Pu = e.screenX - Wl.screenX, Yu = e.screenY - Wl.screenY) : Yu = Pu = 0, Wl = e), Pu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Yu;
    }
  }), tm = Qt(js), i1 = b({}, js, { dataTransfer: 0 }), l1 = Qt(i1), r1 = b({}, Jl, { relatedTarget: 0 }), Fu = Qt(r1), s1 = b({}, vi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), o1 = Qt(s1), u1 = b({}, vi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), c1 = Qt(u1), f1 = b({}, vi, { data: 0 }), nm = Qt(f1), d1 = {
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
  }, h1 = {
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
  }, m1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function p1(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = m1[e]) ? !!n[e] : !1;
  }
  function Gu() {
    return p1;
  }
  var y1 = b({}, Jl, {
    key: function(e) {
      if (e.key) {
        var n = d1[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Cs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? h1[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Gu,
    charCode: function(e) {
      return e.type === "keypress" ? Cs(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Cs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), g1 = Qt(y1), v1 = b({}, js, {
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
  }), am = Qt(v1), b1 = b({}, Jl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Gu
  }), x1 = Qt(b1), S1 = b({}, vi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), E1 = Qt(S1), T1 = b({}, js, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), w1 = Qt(T1), R1 = b({}, vi, {
    newState: 0,
    oldState: 0
  }), C1 = Qt(R1), M1 = [9, 13, 27, 32], $u = sa && "CompositionEvent" in window, er = null;
  sa && "documentMode" in document && (er = document.documentMode);
  var A1 = sa && "TextEvent" in window && !er, im = sa && (!$u || er && 8 < er && 11 >= er), lm = " ", rm = !1;
  function sm(e, n) {
    switch (e) {
      case "keyup":
        return M1.indexOf(n.keyCode) !== -1;
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
  function om(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var nl = !1;
  function j1(e, n) {
    switch (e) {
      case "compositionend":
        return om(n);
      case "keypress":
        return n.which !== 32 ? null : (rm = !0, lm);
      case "textInput":
        return e = n.data, e === lm && rm ? null : e;
      default:
        return null;
    }
  }
  function D1(e, n) {
    if (nl)
      return e === "compositionend" || !$u && sm(e, n) ? (e = Wh(), Rs = qu = Oa = null, nl = !1, e) : null;
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
        return im && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var N1 = {
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
    return n === "input" ? !!N1[e.type] : n === "textarea";
  }
  function cm(e, n, i, r) {
    el ? tl ? tl.push(r) : tl = [r] : el = r, n = bo(n, "onChange"), 0 < n.length && (i = new As(
      "onChange",
      "change",
      null,
      i,
      r
    ), e.push({ event: i, listeners: n }));
  }
  var tr = null, nr = null;
  function z1(e) {
    $y(e, 0);
  }
  function Ds(e) {
    var n = Le(e);
    if (Es(n)) return e;
  }
  function fm(e, n) {
    if (e === "change") return n;
  }
  var dm = !1;
  if (sa) {
    var Xu;
    if (sa) {
      var Iu = "oninput" in document;
      if (!Iu) {
        var hm = document.createElement("div");
        hm.setAttribute("oninput", "return;"), Iu = typeof hm.oninput == "function";
      }
      Xu = Iu;
    } else Xu = !1;
    dm = Xu && (!document.documentMode || 9 < document.documentMode);
  }
  function mm() {
    tr && (tr.detachEvent("onpropertychange", pm), nr = tr = null);
  }
  function pm(e) {
    if (e.propertyName === "value" && Ds(nr)) {
      var n = [];
      cm(
        n,
        nr,
        e,
        Bu(e)
      ), Jh(z1, n);
    }
  }
  function _1(e, n, i) {
    e === "focusin" ? (mm(), tr = n, nr = i, tr.attachEvent("onpropertychange", pm)) : e === "focusout" && mm();
  }
  function O1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ds(nr);
  }
  function L1(e, n) {
    if (e === "click") return Ds(n);
  }
  function U1(e, n) {
    if (e === "input" || e === "change")
      return Ds(n);
  }
  function V1(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var ln = typeof Object.is == "function" ? Object.is : V1;
  function ar(e, n) {
    if (ln(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(e), r = Object.keys(n);
    if (i.length !== r.length) return !1;
    for (r = 0; r < i.length; r++) {
      var u = i[r];
      if (!$e.call(n, u) || !ln(e[u], n[u]))
        return !1;
    }
    return !0;
  }
  function ym(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function gm(e, n) {
    var i = ym(e);
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
      i = ym(i);
    }
  }
  function vm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? vm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function bm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = Ts(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = n.contentWindow;
      else break;
      n = Ts(e.document);
    }
    return n;
  }
  function Ku(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var B1 = sa && "documentMode" in document && 11 >= document.documentMode, al = null, Qu = null, ir = null, Zu = !1;
  function xm(e, n, i) {
    var r = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Zu || al == null || al !== Ts(r) || (r = al, "selectionStart" in r && Ku(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), ir && ar(ir, r) || (ir = r, r = bo(Qu, "onSelect"), 0 < r.length && (n = new As(
      "onSelect",
      "select",
      null,
      n,
      i
    ), e.push({ event: n, listeners: r }), n.target = al)));
  }
  function bi(e, n) {
    var i = {};
    return i[e.toLowerCase()] = n.toLowerCase(), i["Webkit" + e] = "webkit" + n, i["Moz" + e] = "moz" + n, i;
  }
  var il = {
    animationend: bi("Animation", "AnimationEnd"),
    animationiteration: bi("Animation", "AnimationIteration"),
    animationstart: bi("Animation", "AnimationStart"),
    transitionrun: bi("Transition", "TransitionRun"),
    transitionstart: bi("Transition", "TransitionStart"),
    transitioncancel: bi("Transition", "TransitionCancel"),
    transitionend: bi("Transition", "TransitionEnd")
  }, Ju = {}, Sm = {};
  sa && (Sm = document.createElement("div").style, "AnimationEvent" in window || (delete il.animationend.animation, delete il.animationiteration.animation, delete il.animationstart.animation), "TransitionEvent" in window || delete il.transitionend.transition);
  function xi(e) {
    if (Ju[e]) return Ju[e];
    if (!il[e]) return e;
    var n = il[e], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Sm)
        return Ju[e] = n[i];
    return e;
  }
  var Em = xi("animationend"), Tm = xi("animationiteration"), wm = xi("animationstart"), H1 = xi("transitionrun"), k1 = xi("transitionstart"), q1 = xi("transitioncancel"), Rm = xi("transitionend"), Cm = /* @__PURE__ */ new Map(), Wu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Wu.push("scrollEnd");
  function On(e, n) {
    Cm.set(e, n), Nt(n, [e]);
  }
  var Ns = typeof reportError == "function" ? reportError : function(e) {
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
  }, yn = [], ll = 0, ec = 0;
  function zs() {
    for (var e = ll, n = ec = ll = 0; n < e; ) {
      var i = yn[n];
      yn[n++] = null;
      var r = yn[n];
      yn[n++] = null;
      var u = yn[n];
      yn[n++] = null;
      var d = yn[n];
      if (yn[n++] = null, r !== null && u !== null) {
        var v = r.pending;
        v === null ? u.next = u : (u.next = v.next, v.next = u), r.pending = u;
      }
      d !== 0 && Mm(i, u, d);
    }
  }
  function _s(e, n, i, r) {
    yn[ll++] = e, yn[ll++] = n, yn[ll++] = i, yn[ll++] = r, ec |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function tc(e, n, i, r) {
    return _s(e, n, i, r), Os(e);
  }
  function Si(e, n) {
    return _s(e, null, null, n), Os(e);
  }
  function Mm(e, n, i) {
    e.lanes |= i;
    var r = e.alternate;
    r !== null && (r.lanes |= i);
    for (var u = !1, d = e.return; d !== null; )
      d.childLanes |= i, r = d.alternate, r !== null && (r.childLanes |= i), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (u = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, u && n !== null && (u = 31 - kt(i), e = d.hiddenUpdates, r = e[u], r === null ? e[u] = [n] : r.push(n), n.lane = i | 536870912), d) : null;
  }
  function Os(e) {
    if (50 < Cr)
      throw Cr = 0, ff = null, Error(s(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var rl = {};
  function P1(e, n, i, r) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function rn(e, n, i, r) {
    return new P1(e, n, i, r);
  }
  function nc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function oa(e, n) {
    var i = e.alternate;
    return i === null ? (i = rn(
      e.tag,
      n,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = n, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, n = e.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function Am(e, n) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, n = i.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Ls(e, n, i, r, u, d) {
    var v = 0;
    if (r = e, typeof e == "function") nc(e) && (v = 1);
    else if (typeof e == "string")
      v = XE(
        e,
        i,
        ce.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case O:
          return e = rn(31, i, n, u), e.elementType = O, e.lanes = d, e;
        case R:
          return Ei(i.children, u, d, n);
        case D:
          v = 8, u |= 24;
          break;
        case B:
          return e = rn(12, i, n, u | 2), e.elementType = B, e.lanes = d, e;
        case G:
          return e = rn(13, i, n, u), e.elementType = G, e.lanes = d, e;
        case ee:
          return e = rn(19, i, n, u), e.elementType = ee, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case _:
                v = 10;
                break e;
              case z:
                v = 9;
                break e;
              case k:
                v = 11;
                break e;
              case te:
                v = 14;
                break e;
              case C:
                v = 16, r = null;
                break e;
            }
          v = 29, i = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), r = null;
      }
    return n = rn(v, i, n, u), n.elementType = e, n.type = r, n.lanes = d, n;
  }
  function Ei(e, n, i, r) {
    return e = rn(7, e, r, n), e.lanes = i, e;
  }
  function ac(e, n, i) {
    return e = rn(6, e, null, n), e.lanes = i, e;
  }
  function jm(e) {
    var n = rn(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function ic(e, n, i) {
    return n = rn(
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
  var Dm = /* @__PURE__ */ new WeakMap();
  function gn(e, n) {
    if (typeof e == "object" && e !== null) {
      var i = Dm.get(e);
      return i !== void 0 ? i : (n = {
        value: e,
        source: n,
        stack: Oe(n)
      }, Dm.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Oe(n)
    };
  }
  var sl = [], ol = 0, Us = null, lr = 0, vn = [], bn = 0, La = null, Gn = 1, $n = "";
  function ua(e, n) {
    sl[ol++] = lr, sl[ol++] = Us, Us = e, lr = n;
  }
  function Nm(e, n, i) {
    vn[bn++] = Gn, vn[bn++] = $n, vn[bn++] = La, La = e;
    var r = Gn;
    e = $n;
    var u = 32 - kt(r) - 1;
    r &= ~(1 << u), i += 1;
    var d = 32 - kt(n) + u;
    if (30 < d) {
      var v = u - u % 5;
      d = (r & (1 << v) - 1).toString(32), r >>= v, u -= v, Gn = 1 << 32 - kt(n) + u | i << u | r, $n = d + e;
    } else
      Gn = 1 << d | i << u | r, $n = e;
  }
  function lc(e) {
    e.return !== null && (ua(e, 1), Nm(e, 1, 0));
  }
  function rc(e) {
    for (; e === Us; )
      Us = sl[--ol], sl[ol] = null, lr = sl[--ol], sl[ol] = null;
    for (; e === La; )
      La = vn[--bn], vn[bn] = null, $n = vn[--bn], vn[bn] = null, Gn = vn[--bn], vn[bn] = null;
  }
  function zm(e, n) {
    vn[bn++] = Gn, vn[bn++] = $n, vn[bn++] = La, Gn = n.id, $n = n.overflow, La = e;
  }
  var _t = null, lt = null, ke = !1, Ua = null, xn = !1, sc = Error(s(519));
  function Va(e) {
    var n = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw rr(gn(n, e)), sc;
  }
  function _m(e) {
    var n = e.stateNode, i = e.type, r = e.memoizedProps;
    switch (n[de] = e, n[he] = r, i) {
      case "dialog":
        Ve("cancel", n), Ve("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ve("load", n);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Ar.length; i++)
          Ve(Ar[i], n);
        break;
      case "source":
        Ve("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Ve("error", n), Ve("load", n);
        break;
      case "details":
        Ve("toggle", n);
        break;
      case "input":
        Ve("invalid", n), $h(
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
        Ve("invalid", n);
        break;
      case "textarea":
        Ve("invalid", n), Ih(n, r.value, r.defaultValue, r.children);
    }
    i = r.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || r.suppressHydrationWarning === !0 || Qy(n.textContent, i) ? (r.popover != null && (Ve("beforetoggle", n), Ve("toggle", n)), r.onScroll != null && Ve("scroll", n), r.onScrollEnd != null && Ve("scrollend", n), r.onClick != null && (n.onclick = ra), n = !0) : n = !1, n || Va(e, !0);
  }
  function Om(e) {
    for (_t = e.return; _t; )
      switch (_t.tag) {
        case 5:
        case 31:
        case 13:
          xn = !1;
          return;
        case 27:
        case 3:
          xn = !0;
          return;
        default:
          _t = _t.return;
      }
  }
  function ul(e) {
    if (e !== _t) return !1;
    if (!ke) return Om(e), ke = !0, !1;
    var n = e.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || Cf(e.type, e.memoizedProps)), i = !i), i && lt && Va(e), Om(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      lt = lg(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      lt = lg(e);
    } else
      n === 27 ? (n = lt, Za(e.type) ? (e = Nf, Nf = null, lt = e) : lt = n) : lt = _t ? En(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ti() {
    lt = _t = null, ke = !1;
  }
  function oc() {
    var e = Ua;
    return e !== null && (en === null ? en = e : en.push.apply(
      en,
      e
    ), Ua = null), e;
  }
  function rr(e) {
    Ua === null ? Ua = [e] : Ua.push(e);
  }
  var uc = M(null), wi = null, ca = null;
  function Ba(e, n, i) {
    se(uc, n._currentValue), n._currentValue = i;
  }
  function fa(e) {
    e._currentValue = uc.current, K(uc);
  }
  function cc(e, n, i) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, r !== null && (r.childLanes |= n)) : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n), e === i) break;
      e = e.return;
    }
  }
  function fc(e, n, i, r) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var d = u.dependencies;
      if (d !== null) {
        var v = u.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var T = d;
          d = u;
          for (var A = 0; A < n.length; A++)
            if (T.context === n[A]) {
              d.lanes |= i, T = d.alternate, T !== null && (T.lanes |= i), cc(
                d.return,
                i,
                e
              ), r || (v = null);
              break e;
            }
          d = T.next;
        }
      } else if (u.tag === 18) {
        if (v = u.return, v === null) throw Error(s(341));
        v.lanes |= i, d = v.alternate, d !== null && (d.lanes |= i), cc(v, i, e), v = null;
      } else v = u.child;
      if (v !== null) v.return = u;
      else
        for (v = u; v !== null; ) {
          if (v === e) {
            v = null;
            break;
          }
          if (u = v.sibling, u !== null) {
            u.return = v.return, v = u;
            break;
          }
          v = v.return;
        }
      u = v;
    }
  }
  function cl(e, n, i, r) {
    e = null;
    for (var u = n, d = !1; u !== null; ) {
      if (!d) {
        if ((u.flags & 524288) !== 0) d = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var v = u.alternate;
        if (v === null) throw Error(s(387));
        if (v = v.memoizedProps, v !== null) {
          var T = u.type;
          ln(u.pendingProps.value, v.value) || (e !== null ? e.push(T) : e = [T]);
        }
      } else if (u === De.current) {
        if (v = u.alternate, v === null) throw Error(s(387));
        v.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(_r) : e = [_r]);
      }
      u = u.return;
    }
    e !== null && fc(
      n,
      e,
      i,
      r
    ), n.flags |= 262144;
  }
  function Vs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ln(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ri(e) {
    wi = e, ca = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ot(e) {
    return Lm(wi, e);
  }
  function Bs(e, n) {
    return wi === null && Ri(e), Lm(e, n);
  }
  function Lm(e, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, ca === null) {
      if (e === null) throw Error(s(308));
      ca = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else ca = ca.next = n;
    return i;
  }
  var Y1 = typeof AbortController < "u" ? AbortController : function() {
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
  }, F1 = t.unstable_scheduleCallback, G1 = t.unstable_NormalPriority, Tt = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function dc() {
    return {
      controller: new Y1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function sr(e) {
    e.refCount--, e.refCount === 0 && F1(G1, function() {
      e.controller.abort();
    });
  }
  var or = null, hc = 0, fl = 0, dl = null;
  function $1(e, n) {
    if (or === null) {
      var i = or = [];
      hc = 0, fl = gf(), dl = {
        status: "pending",
        value: void 0,
        then: function(r) {
          i.push(r);
        }
      };
    }
    return hc++, n.then(Um, Um), n;
  }
  function Um() {
    if (--hc === 0 && or !== null) {
      dl !== null && (dl.status = "fulfilled");
      var e = or;
      or = null, fl = 0, dl = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function X1(e, n) {
    var i = [], r = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        i.push(u);
      }
    };
    return e.then(
      function() {
        r.status = "fulfilled", r.value = n;
        for (var u = 0; u < i.length; u++) (0, i[u])(n);
      },
      function(u) {
        for (r.status = "rejected", r.reason = u, u = 0; u < i.length; u++)
          (0, i[u])(void 0);
      }
    ), r;
  }
  var Vm = U.S;
  U.S = function(e, n) {
    xy = Ft(), typeof n == "object" && n !== null && typeof n.then == "function" && $1(e, n), Vm !== null && Vm(e, n);
  };
  var Ci = M(null);
  function mc() {
    var e = Ci.current;
    return e !== null ? e : tt.pooledCache;
  }
  function Hs(e, n) {
    n === null ? se(Ci, Ci.current) : se(Ci, n.pool);
  }
  function Bm() {
    var e = mc();
    return e === null ? null : { parent: Tt._currentValue, pool: e };
  }
  var hl = Error(s(460)), pc = Error(s(474)), ks = Error(s(542)), qs = { then: function() {
  } };
  function Hm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function km(e, n, i) {
    switch (i = e[i], i === void 0 ? e.push(n) : i !== n && (n.then(ra, ra), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, Pm(e), e;
      default:
        if (typeof n.status == "string") n.then(ra, ra);
        else {
          if (e = tt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(s(482));
          e = n, e.status = "pending", e.then(
            function(r) {
              if (n.status === "pending") {
                var u = n;
                u.status = "fulfilled", u.value = r;
              }
            },
            function(r) {
              if (n.status === "pending") {
                var u = n;
                u.status = "rejected", u.reason = r;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, Pm(e), e;
        }
        throw Ai = n, hl;
    }
  }
  function Mi(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (Ai = i, hl) : i;
    }
  }
  var Ai = null;
  function qm() {
    if (Ai === null) throw Error(s(459));
    var e = Ai;
    return Ai = null, e;
  }
  function Pm(e) {
    if (e === hl || e === ks)
      throw Error(s(483));
  }
  var ml = null, ur = 0;
  function Ps(e) {
    var n = ur;
    return ur += 1, ml === null && (ml = []), km(ml, e, n);
  }
  function cr(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Ys(e, n) {
    throw n.$$typeof === x ? Error(s(525)) : (e = Object.prototype.toString.call(n), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function Ym(e) {
    function n(V, N) {
      if (e) {
        var q = V.deletions;
        q === null ? (V.deletions = [N], V.flags |= 16) : q.push(N);
      }
    }
    function i(V, N) {
      if (!e) return null;
      for (; N !== null; )
        n(V, N), N = N.sibling;
      return null;
    }
    function r(V) {
      for (var N = /* @__PURE__ */ new Map(); V !== null; )
        V.key !== null ? N.set(V.key, V) : N.set(V.index, V), V = V.sibling;
      return N;
    }
    function u(V, N) {
      return V = oa(V, N), V.index = 0, V.sibling = null, V;
    }
    function d(V, N, q) {
      return V.index = q, e ? (q = V.alternate, q !== null ? (q = q.index, q < N ? (V.flags |= 67108866, N) : q) : (V.flags |= 67108866, N)) : (V.flags |= 1048576, N);
    }
    function v(V) {
      return e && V.alternate === null && (V.flags |= 67108866), V;
    }
    function T(V, N, q, Z) {
      return N === null || N.tag !== 6 ? (N = ac(q, V.mode, Z), N.return = V, N) : (N = u(N, q), N.return = V, N);
    }
    function A(V, N, q, Z) {
      var Te = q.type;
      return Te === R ? Q(
        V,
        N,
        q.props.children,
        Z,
        q.key
      ) : N !== null && (N.elementType === Te || typeof Te == "object" && Te !== null && Te.$$typeof === C && Mi(Te) === N.type) ? (N = u(N, q.props), cr(N, q), N.return = V, N) : (N = Ls(
        q.type,
        q.key,
        q.props,
        null,
        V.mode,
        Z
      ), cr(N, q), N.return = V, N);
    }
    function P(V, N, q, Z) {
      return N === null || N.tag !== 4 || N.stateNode.containerInfo !== q.containerInfo || N.stateNode.implementation !== q.implementation ? (N = ic(q, V.mode, Z), N.return = V, N) : (N = u(N, q.children || []), N.return = V, N);
    }
    function Q(V, N, q, Z, Te) {
      return N === null || N.tag !== 7 ? (N = Ei(
        q,
        V.mode,
        Z,
        Te
      ), N.return = V, N) : (N = u(N, q), N.return = V, N);
    }
    function W(V, N, q) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return N = ac(
          "" + N,
          V.mode,
          q
        ), N.return = V, N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case E:
            return q = Ls(
              N.type,
              N.key,
              N.props,
              null,
              V.mode,
              q
            ), cr(q, N), q.return = V, q;
          case w:
            return N = ic(
              N,
              V.mode,
              q
            ), N.return = V, N;
          case C:
            return N = Mi(N), W(V, N, q);
        }
        if (re(N) || I(N))
          return N = Ei(
            N,
            V.mode,
            q,
            null
          ), N.return = V, N;
        if (typeof N.then == "function")
          return W(V, Ps(N), q);
        if (N.$$typeof === _)
          return W(
            V,
            Bs(V, N),
            q
          );
        Ys(V, N);
      }
      return null;
    }
    function F(V, N, q, Z) {
      var Te = N !== null ? N.key : null;
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return Te !== null ? null : T(V, N, "" + q, Z);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case E:
            return q.key === Te ? A(V, N, q, Z) : null;
          case w:
            return q.key === Te ? P(V, N, q, Z) : null;
          case C:
            return q = Mi(q), F(V, N, q, Z);
        }
        if (re(q) || I(q))
          return Te !== null ? null : Q(V, N, q, Z, null);
        if (typeof q.then == "function")
          return F(
            V,
            N,
            Ps(q),
            Z
          );
        if (q.$$typeof === _)
          return F(
            V,
            N,
            Bs(V, q),
            Z
          );
        Ys(V, q);
      }
      return null;
    }
    function $(V, N, q, Z, Te) {
      if (typeof Z == "string" && Z !== "" || typeof Z == "number" || typeof Z == "bigint")
        return V = V.get(q) || null, T(N, V, "" + Z, Te);
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case E:
            return V = V.get(
              Z.key === null ? q : Z.key
            ) || null, A(N, V, Z, Te);
          case w:
            return V = V.get(
              Z.key === null ? q : Z.key
            ) || null, P(N, V, Z, Te);
          case C:
            return Z = Mi(Z), $(
              V,
              N,
              q,
              Z,
              Te
            );
        }
        if (re(Z) || I(Z))
          return V = V.get(q) || null, Q(N, V, Z, Te, null);
        if (typeof Z.then == "function")
          return $(
            V,
            N,
            q,
            Ps(Z),
            Te
          );
        if (Z.$$typeof === _)
          return $(
            V,
            N,
            q,
            Bs(N, Z),
            Te
          );
        Ys(N, Z);
      }
      return null;
    }
    function pe(V, N, q, Z) {
      for (var Te = null, Pe = null, be = N, je = N = 0, He = null; be !== null && je < q.length; je++) {
        be.index > je ? (He = be, be = null) : He = be.sibling;
        var Ye = F(
          V,
          be,
          q[je],
          Z
        );
        if (Ye === null) {
          be === null && (be = He);
          break;
        }
        e && be && Ye.alternate === null && n(V, be), N = d(Ye, N, je), Pe === null ? Te = Ye : Pe.sibling = Ye, Pe = Ye, be = He;
      }
      if (je === q.length)
        return i(V, be), ke && ua(V, je), Te;
      if (be === null) {
        for (; je < q.length; je++)
          be = W(V, q[je], Z), be !== null && (N = d(
            be,
            N,
            je
          ), Pe === null ? Te = be : Pe.sibling = be, Pe = be);
        return ke && ua(V, je), Te;
      }
      for (be = r(be); je < q.length; je++)
        He = $(
          be,
          V,
          je,
          q[je],
          Z
        ), He !== null && (e && He.alternate !== null && be.delete(
          He.key === null ? je : He.key
        ), N = d(
          He,
          N,
          je
        ), Pe === null ? Te = He : Pe.sibling = He, Pe = He);
      return e && be.forEach(function(ni) {
        return n(V, ni);
      }), ke && ua(V, je), Te;
    }
    function Ce(V, N, q, Z) {
      if (q == null) throw Error(s(151));
      for (var Te = null, Pe = null, be = N, je = N = 0, He = null, Ye = q.next(); be !== null && !Ye.done; je++, Ye = q.next()) {
        be.index > je ? (He = be, be = null) : He = be.sibling;
        var ni = F(V, be, Ye.value, Z);
        if (ni === null) {
          be === null && (be = He);
          break;
        }
        e && be && ni.alternate === null && n(V, be), N = d(ni, N, je), Pe === null ? Te = ni : Pe.sibling = ni, Pe = ni, be = He;
      }
      if (Ye.done)
        return i(V, be), ke && ua(V, je), Te;
      if (be === null) {
        for (; !Ye.done; je++, Ye = q.next())
          Ye = W(V, Ye.value, Z), Ye !== null && (N = d(Ye, N, je), Pe === null ? Te = Ye : Pe.sibling = Ye, Pe = Ye);
        return ke && ua(V, je), Te;
      }
      for (be = r(be); !Ye.done; je++, Ye = q.next())
        Ye = $(be, V, je, Ye.value, Z), Ye !== null && (e && Ye.alternate !== null && be.delete(Ye.key === null ? je : Ye.key), N = d(Ye, N, je), Pe === null ? Te = Ye : Pe.sibling = Ye, Pe = Ye);
      return e && be.forEach(function(iT) {
        return n(V, iT);
      }), ke && ua(V, je), Te;
    }
    function We(V, N, q, Z) {
      if (typeof q == "object" && q !== null && q.type === R && q.key === null && (q = q.props.children), typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case E:
            e: {
              for (var Te = q.key; N !== null; ) {
                if (N.key === Te) {
                  if (Te = q.type, Te === R) {
                    if (N.tag === 7) {
                      i(
                        V,
                        N.sibling
                      ), Z = u(
                        N,
                        q.props.children
                      ), Z.return = V, V = Z;
                      break e;
                    }
                  } else if (N.elementType === Te || typeof Te == "object" && Te !== null && Te.$$typeof === C && Mi(Te) === N.type) {
                    i(
                      V,
                      N.sibling
                    ), Z = u(N, q.props), cr(Z, q), Z.return = V, V = Z;
                    break e;
                  }
                  i(V, N);
                  break;
                } else n(V, N);
                N = N.sibling;
              }
              q.type === R ? (Z = Ei(
                q.props.children,
                V.mode,
                Z,
                q.key
              ), Z.return = V, V = Z) : (Z = Ls(
                q.type,
                q.key,
                q.props,
                null,
                V.mode,
                Z
              ), cr(Z, q), Z.return = V, V = Z);
            }
            return v(V);
          case w:
            e: {
              for (Te = q.key; N !== null; ) {
                if (N.key === Te)
                  if (N.tag === 4 && N.stateNode.containerInfo === q.containerInfo && N.stateNode.implementation === q.implementation) {
                    i(
                      V,
                      N.sibling
                    ), Z = u(N, q.children || []), Z.return = V, V = Z;
                    break e;
                  } else {
                    i(V, N);
                    break;
                  }
                else n(V, N);
                N = N.sibling;
              }
              Z = ic(q, V.mode, Z), Z.return = V, V = Z;
            }
            return v(V);
          case C:
            return q = Mi(q), We(
              V,
              N,
              q,
              Z
            );
        }
        if (re(q))
          return pe(
            V,
            N,
            q,
            Z
          );
        if (I(q)) {
          if (Te = I(q), typeof Te != "function") throw Error(s(150));
          return q = Te.call(q), Ce(
            V,
            N,
            q,
            Z
          );
        }
        if (typeof q.then == "function")
          return We(
            V,
            N,
            Ps(q),
            Z
          );
        if (q.$$typeof === _)
          return We(
            V,
            N,
            Bs(V, q),
            Z
          );
        Ys(V, q);
      }
      return typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint" ? (q = "" + q, N !== null && N.tag === 6 ? (i(V, N.sibling), Z = u(N, q), Z.return = V, V = Z) : (i(V, N), Z = ac(q, V.mode, Z), Z.return = V, V = Z), v(V)) : i(V, N);
    }
    return function(V, N, q, Z) {
      try {
        ur = 0;
        var Te = We(
          V,
          N,
          q,
          Z
        );
        return ml = null, Te;
      } catch (be) {
        if (be === hl || be === ks) throw be;
        var Pe = rn(29, be, null, V.mode);
        return Pe.lanes = Z, Pe.return = V, Pe;
      } finally {
      }
    };
  }
  var ji = Ym(!0), Fm = Ym(!1), Ha = !1;
  function yc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function gc(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ka(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function qa(e, n, i) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Fe & 2) !== 0) {
      var u = r.pending;
      return u === null ? n.next = n : (n.next = u.next, u.next = n), r.pending = n, n = Os(e), Mm(e, null, i), n;
    }
    return _s(e, r, n, i), Os(e);
  }
  function fr(e, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var r = n.lanes;
      r &= e.pendingLanes, i |= r, n.lanes = i, Ss(e, i);
    }
  }
  function vc(e, n) {
    var i = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, i === r)) {
      var u = null, d = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var v = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          d === null ? u = d = v : d = d.next = v, i = i.next;
        } while (i !== null);
        d === null ? u = d = n : d = d.next = n;
      } else u = d = n;
      i = {
        baseState: r.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: d,
        shared: r.shared,
        callbacks: r.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = n : e.next = n, i.lastBaseUpdate = n;
  }
  var bc = !1;
  function dr() {
    if (bc) {
      var e = dl;
      if (e !== null) throw e;
    }
  }
  function hr(e, n, i, r) {
    bc = !1;
    var u = e.updateQueue;
    Ha = !1;
    var d = u.firstBaseUpdate, v = u.lastBaseUpdate, T = u.shared.pending;
    if (T !== null) {
      u.shared.pending = null;
      var A = T, P = A.next;
      A.next = null, v === null ? d = P : v.next = P, v = A;
      var Q = e.alternate;
      Q !== null && (Q = Q.updateQueue, T = Q.lastBaseUpdate, T !== v && (T === null ? Q.firstBaseUpdate = P : T.next = P, Q.lastBaseUpdate = A));
    }
    if (d !== null) {
      var W = u.baseState;
      v = 0, Q = P = A = null, T = d;
      do {
        var F = T.lane & -536870913, $ = F !== T.lane;
        if ($ ? (Be & F) === F : (r & F) === F) {
          F !== 0 && F === fl && (bc = !0), Q !== null && (Q = Q.next = {
            lane: 0,
            tag: T.tag,
            payload: T.payload,
            callback: null,
            next: null
          });
          e: {
            var pe = e, Ce = T;
            F = n;
            var We = i;
            switch (Ce.tag) {
              case 1:
                if (pe = Ce.payload, typeof pe == "function") {
                  W = pe.call(We, W, F);
                  break e;
                }
                W = pe;
                break e;
              case 3:
                pe.flags = pe.flags & -65537 | 128;
              case 0:
                if (pe = Ce.payload, F = typeof pe == "function" ? pe.call(We, W, F) : pe, F == null) break e;
                W = b({}, W, F);
                break e;
              case 2:
                Ha = !0;
            }
          }
          F = T.callback, F !== null && (e.flags |= 64, $ && (e.flags |= 8192), $ = u.callbacks, $ === null ? u.callbacks = [F] : $.push(F));
        } else
          $ = {
            lane: F,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null
          }, Q === null ? (P = Q = $, A = W) : Q = Q.next = $, v |= F;
        if (T = T.next, T === null) {
          if (T = u.shared.pending, T === null)
            break;
          $ = T, T = $.next, $.next = null, u.lastBaseUpdate = $, u.shared.pending = null;
        }
      } while (!0);
      Q === null && (A = W), u.baseState = A, u.firstBaseUpdate = P, u.lastBaseUpdate = Q, d === null && (u.shared.lanes = 0), $a |= v, e.lanes = v, e.memoizedState = W;
    }
  }
  function Gm(e, n) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(n);
  }
  function $m(e, n) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Gm(i[e], n);
  }
  var pl = M(null), Fs = M(0);
  function Xm(e, n) {
    e = xa, se(Fs, e), se(pl, n), xa = e | n.baseLanes;
  }
  function xc() {
    se(Fs, xa), se(pl, pl.current);
  }
  function Sc() {
    xa = Fs.current, K(pl), K(Fs);
  }
  var sn = M(null), Sn = null;
  function Pa(e) {
    var n = e.alternate;
    se(vt, vt.current & 1), se(sn, e), Sn === null && (n === null || pl.current !== null || n.memoizedState !== null) && (Sn = e);
  }
  function Ec(e) {
    se(vt, vt.current), se(sn, e), Sn === null && (Sn = e);
  }
  function Im(e) {
    e.tag === 22 ? (se(vt, vt.current), se(sn, e), Sn === null && (Sn = e)) : Ya();
  }
  function Ya() {
    se(vt, vt.current), se(sn, sn.current);
  }
  function on(e) {
    K(sn), Sn === e && (Sn = null), K(vt);
  }
  var vt = M(0);
  function Gs(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || jf(i) || Df(i)))
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
  var da = 0, Ae = null, Ze = null, wt = null, $s = !1, yl = !1, Di = !1, Xs = 0, mr = 0, gl = null, I1 = 0;
  function mt() {
    throw Error(s(321));
  }
  function Tc(e, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < e.length; i++)
      if (!ln(e[i], n[i])) return !1;
    return !0;
  }
  function wc(e, n, i, r, u, d) {
    return da = d, Ae = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, U.H = e === null || e.memoizedState === null ? Np : Hc, Di = !1, d = i(r, u), Di = !1, yl && (d = Qm(
      n,
      i,
      r,
      u
    )), Km(e), d;
  }
  function Km(e) {
    U.H = gr;
    var n = Ze !== null && Ze.next !== null;
    if (da = 0, wt = Ze = Ae = null, $s = !1, mr = 0, gl = null, n) throw Error(s(300));
    e === null || Rt || (e = e.dependencies, e !== null && Vs(e) && (Rt = !0));
  }
  function Qm(e, n, i, r) {
    Ae = e;
    var u = 0;
    do {
      if (yl && (gl = null), mr = 0, yl = !1, 25 <= u) throw Error(s(301));
      if (u += 1, wt = Ze = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      U.H = zp, d = n(i, r);
    } while (yl);
    return d;
  }
  function K1() {
    var e = U.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? pr(n) : n, e = e.useState()[0], (Ze !== null ? Ze.memoizedState : null) !== e && (Ae.flags |= 1024), n;
  }
  function Rc() {
    var e = Xs !== 0;
    return Xs = 0, e;
  }
  function Cc(e, n, i) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~i;
  }
  function Mc(e) {
    if ($s) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      $s = !1;
    }
    da = 0, wt = Ze = Ae = null, yl = !1, mr = Xs = 0, gl = null;
  }
  function $t() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return wt === null ? Ae.memoizedState = wt = e : wt = wt.next = e, wt;
  }
  function bt() {
    if (Ze === null) {
      var e = Ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ze.next;
    var n = wt === null ? Ae.memoizedState : wt.next;
    if (n !== null)
      wt = n, Ze = e;
    else {
      if (e === null)
        throw Ae.alternate === null ? Error(s(467)) : Error(s(310));
      Ze = e, e = {
        memoizedState: Ze.memoizedState,
        baseState: Ze.baseState,
        baseQueue: Ze.baseQueue,
        queue: Ze.queue,
        next: null
      }, wt === null ? Ae.memoizedState = wt = e : wt = wt.next = e;
    }
    return wt;
  }
  function Is() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function pr(e) {
    var n = mr;
    return mr += 1, gl === null && (gl = []), e = km(gl, e, n), n = Ae, (wt === null ? n.memoizedState : wt.next) === null && (n = n.alternate, U.H = n === null || n.memoizedState === null ? Np : Hc), e;
  }
  function Ks(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return pr(e);
      if (e.$$typeof === _) return Ot(e);
    }
    throw Error(s(438, String(e)));
  }
  function Ac(e) {
    var n = null, i = Ae.updateQueue;
    if (i !== null && (n = i.memoCache), n == null) {
      var r = Ae.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (n = {
        data: r.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = Is(), Ae.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(e), r = 0; r < e; r++)
        i[r] = X;
    return n.index++, i;
  }
  function ha(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function Qs(e) {
    var n = bt();
    return jc(n, Ze, e);
  }
  function jc(e, n, i) {
    var r = e.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = i;
    var u = e.baseQueue, d = r.pending;
    if (d !== null) {
      if (u !== null) {
        var v = u.next;
        u.next = d.next, d.next = v;
      }
      n.baseQueue = u = d, r.pending = null;
    }
    if (d = e.baseState, u === null) e.memoizedState = d;
    else {
      n = u.next;
      var T = v = null, A = null, P = n, Q = !1;
      do {
        var W = P.lane & -536870913;
        if (W !== P.lane ? (Be & W) === W : (da & W) === W) {
          var F = P.revertLane;
          if (F === 0)
            A !== null && (A = A.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: P.action,
              hasEagerState: P.hasEagerState,
              eagerState: P.eagerState,
              next: null
            }), W === fl && (Q = !0);
          else if ((da & F) === F) {
            P = P.next, F === fl && (Q = !0);
            continue;
          } else
            W = {
              lane: 0,
              revertLane: P.revertLane,
              gesture: null,
              action: P.action,
              hasEagerState: P.hasEagerState,
              eagerState: P.eagerState,
              next: null
            }, A === null ? (T = A = W, v = d) : A = A.next = W, Ae.lanes |= F, $a |= F;
          W = P.action, Di && i(d, W), d = P.hasEagerState ? P.eagerState : i(d, W);
        } else
          F = {
            lane: W,
            revertLane: P.revertLane,
            gesture: P.gesture,
            action: P.action,
            hasEagerState: P.hasEagerState,
            eagerState: P.eagerState,
            next: null
          }, A === null ? (T = A = F, v = d) : A = A.next = F, Ae.lanes |= W, $a |= W;
        P = P.next;
      } while (P !== null && P !== n);
      if (A === null ? v = d : A.next = T, !ln(d, e.memoizedState) && (Rt = !0, Q && (i = dl, i !== null)))
        throw i;
      e.memoizedState = d, e.baseState = v, e.baseQueue = A, r.lastRenderedState = d;
    }
    return u === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function Dc(e) {
    var n = bt(), i = n.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var r = i.dispatch, u = i.pending, d = n.memoizedState;
    if (u !== null) {
      i.pending = null;
      var v = u = u.next;
      do
        d = e(d, v.action), v = v.next;
      while (v !== u);
      ln(d, n.memoizedState) || (Rt = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), i.lastRenderedState = d;
    }
    return [d, r];
  }
  function Zm(e, n, i) {
    var r = Ae, u = bt(), d = ke;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = n();
    var v = !ln(
      (Ze || u).memoizedState,
      i
    );
    if (v && (u.memoizedState = i, Rt = !0), u = u.queue, _c(ep.bind(null, r, u, e), [
      e
    ]), u.getSnapshot !== n || v || wt !== null && wt.memoizedState.tag & 1) {
      if (r.flags |= 2048, vl(
        9,
        { destroy: void 0 },
        Wm.bind(
          null,
          r,
          u,
          i,
          n
        ),
        null
      ), tt === null) throw Error(s(349));
      d || (da & 127) !== 0 || Jm(r, n, i);
    }
    return i;
  }
  function Jm(e, n, i) {
    e.flags |= 16384, e = { getSnapshot: n, value: i }, n = Ae.updateQueue, n === null ? (n = Is(), Ae.updateQueue = n, n.stores = [e]) : (i = n.stores, i === null ? n.stores = [e] : i.push(e));
  }
  function Wm(e, n, i, r) {
    n.value = i, n.getSnapshot = r, tp(n) && np(e);
  }
  function ep(e, n, i) {
    return i(function() {
      tp(n) && np(e);
    });
  }
  function tp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var i = n();
      return !ln(e, i);
    } catch {
      return !0;
    }
  }
  function np(e) {
    var n = Si(e, 2);
    n !== null && tn(n, e, 2);
  }
  function Nc(e) {
    var n = $t();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), Di) {
        Dt(!0);
        try {
          i();
        } finally {
          Dt(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ha,
      lastRenderedState: e
    }, n;
  }
  function ap(e, n, i, r) {
    return e.baseState = i, jc(
      e,
      Ze,
      typeof r == "function" ? r : ha
    );
  }
  function Q1(e, n, i, r, u) {
    if (Ws(e)) throw Error(s(485));
    if (e = n.action, e !== null) {
      var d = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(v) {
          d.listeners.push(v);
        }
      };
      U.T !== null ? i(!0) : d.isTransition = !1, r(d), i = n.pending, i === null ? (d.next = n.pending = d, ip(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function ip(e, n) {
    var i = n.action, r = n.payload, u = e.state;
    if (n.isTransition) {
      var d = U.T, v = {};
      U.T = v;
      try {
        var T = i(u, r), A = U.S;
        A !== null && A(v, T), lp(e, n, T);
      } catch (P) {
        zc(e, n, P);
      } finally {
        d !== null && v.types !== null && (d.types = v.types), U.T = d;
      }
    } else
      try {
        d = i(u, r), lp(e, n, d);
      } catch (P) {
        zc(e, n, P);
      }
  }
  function lp(e, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(r) {
        rp(e, n, r);
      },
      function(r) {
        return zc(e, n, r);
      }
    ) : rp(e, n, i);
  }
  function rp(e, n, i) {
    n.status = "fulfilled", n.value = i, sp(n), e.state = i, n = e.pending, n !== null && (i = n.next, i === n ? e.pending = null : (i = i.next, n.next = i, ip(e, i)));
  }
  function zc(e, n, i) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        n.status = "rejected", n.reason = i, sp(n), n = n.next;
      while (n !== r);
    }
    e.action = null;
  }
  function sp(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function op(e, n) {
    return n;
  }
  function up(e, n) {
    if (ke) {
      var i = tt.formState;
      if (i !== null) {
        e: {
          var r = Ae;
          if (ke) {
            if (lt) {
              t: {
                for (var u = lt, d = xn; u.nodeType !== 8; ) {
                  if (!d) {
                    u = null;
                    break t;
                  }
                  if (u = En(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                d = u.data, u = d === "F!" || d === "F" ? u : null;
              }
              if (u) {
                lt = En(
                  u.nextSibling
                ), r = u.data === "F!";
                break e;
              }
            }
            Va(r);
          }
          r = !1;
        }
        r && (n = i[0]);
      }
    }
    return i = $t(), i.memoizedState = i.baseState = n, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: op,
      lastRenderedState: n
    }, i.queue = r, i = Ap.bind(
      null,
      Ae,
      r
    ), r.dispatch = i, r = Nc(!1), d = Bc.bind(
      null,
      Ae,
      !1,
      r.queue
    ), r = $t(), u = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = u, i = Q1.bind(
      null,
      Ae,
      u,
      d,
      i
    ), u.dispatch = i, r.memoizedState = e, [n, i, !1];
  }
  function cp(e) {
    var n = bt();
    return fp(n, Ze, e);
  }
  function fp(e, n, i) {
    if (n = jc(
      e,
      n,
      op
    )[0], e = Qs(ha)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var r = pr(n);
      } catch (v) {
        throw v === hl ? ks : v;
      }
    else r = n;
    n = bt();
    var u = n.queue, d = u.dispatch;
    return i !== n.memoizedState && (Ae.flags |= 2048, vl(
      9,
      { destroy: void 0 },
      Z1.bind(null, u, i),
      null
    )), [r, d, e];
  }
  function Z1(e, n) {
    e.action = n;
  }
  function dp(e) {
    var n = bt(), i = Ze;
    if (i !== null)
      return fp(n, i, e);
    bt(), n = n.memoizedState, i = bt();
    var r = i.queue.dispatch;
    return i.memoizedState = e, [n, r, !1];
  }
  function vl(e, n, i, r) {
    return e = { tag: e, create: i, deps: r, inst: n, next: null }, n = Ae.updateQueue, n === null && (n = Is(), Ae.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = e.next = e : (r = i.next, i.next = e, e.next = r, n.lastEffect = e), e;
  }
  function hp() {
    return bt().memoizedState;
  }
  function Zs(e, n, i, r) {
    var u = $t();
    Ae.flags |= e, u.memoizedState = vl(
      1 | n,
      { destroy: void 0 },
      i,
      r === void 0 ? null : r
    );
  }
  function Js(e, n, i, r) {
    var u = bt();
    r = r === void 0 ? null : r;
    var d = u.memoizedState.inst;
    Ze !== null && r !== null && Tc(r, Ze.memoizedState.deps) ? u.memoizedState = vl(n, d, i, r) : (Ae.flags |= e, u.memoizedState = vl(
      1 | n,
      d,
      i,
      r
    ));
  }
  function mp(e, n) {
    Zs(8390656, 8, e, n);
  }
  function _c(e, n) {
    Js(2048, 8, e, n);
  }
  function J1(e) {
    Ae.flags |= 4;
    var n = Ae.updateQueue;
    if (n === null)
      n = Is(), Ae.updateQueue = n, n.events = [e];
    else {
      var i = n.events;
      i === null ? n.events = [e] : i.push(e);
    }
  }
  function pp(e) {
    var n = bt().memoizedState;
    return J1({ ref: n, nextImpl: e }), function() {
      if ((Fe & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function yp(e, n) {
    return Js(4, 2, e, n);
  }
  function gp(e, n) {
    return Js(4, 4, e, n);
  }
  function vp(e, n) {
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
  function bp(e, n, i) {
    i = i != null ? i.concat([e]) : null, Js(4, 4, vp.bind(null, n, e), i);
  }
  function Oc() {
  }
  function xp(e, n) {
    var i = bt();
    n = n === void 0 ? null : n;
    var r = i.memoizedState;
    return n !== null && Tc(n, r[1]) ? r[0] : (i.memoizedState = [e, n], e);
  }
  function Sp(e, n) {
    var i = bt();
    n = n === void 0 ? null : n;
    var r = i.memoizedState;
    if (n !== null && Tc(n, r[1]))
      return r[0];
    if (r = e(), Di) {
      Dt(!0);
      try {
        e();
      } finally {
        Dt(!1);
      }
    }
    return i.memoizedState = [r, n], r;
  }
  function Lc(e, n, i) {
    return i === void 0 || (da & 1073741824) !== 0 && (Be & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = i, e = Ey(), Ae.lanes |= e, $a |= e, i);
  }
  function Ep(e, n, i, r) {
    return ln(i, n) ? i : pl.current !== null ? (e = Lc(e, i, r), ln(e, n) || (Rt = !0), e) : (da & 42) === 0 || (da & 1073741824) !== 0 && (Be & 261930) === 0 ? (Rt = !0, e.memoizedState = i) : (e = Ey(), Ae.lanes |= e, $a |= e, n);
  }
  function Tp(e, n, i, r, u) {
    var d = H.p;
    H.p = d !== 0 && 8 > d ? d : 8;
    var v = U.T, T = {};
    U.T = T, Bc(e, !1, n, i);
    try {
      var A = u(), P = U.S;
      if (P !== null && P(T, A), A !== null && typeof A == "object" && typeof A.then == "function") {
        var Q = X1(
          A,
          r
        );
        yr(
          e,
          n,
          Q,
          fn(e)
        );
      } else
        yr(
          e,
          n,
          r,
          fn(e)
        );
    } catch (W) {
      yr(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: W },
        fn()
      );
    } finally {
      H.p = d, v !== null && T.types !== null && (v.types = T.types), U.T = v;
    }
  }
  function W1() {
  }
  function Uc(e, n, i, r) {
    if (e.tag !== 5) throw Error(s(476));
    var u = wp(e).queue;
    Tp(
      e,
      u,
      n,
      J,
      i === null ? W1 : function() {
        return Rp(e), i(r);
      }
    );
  }
  function wp(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: J,
      baseState: J,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ha,
        lastRenderedState: J
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
        lastRenderedReducer: ha,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function Rp(e) {
    var n = wp(e);
    n.next === null && (n = e.alternate.memoizedState), yr(
      e,
      n.next.queue,
      {},
      fn()
    );
  }
  function Vc() {
    return Ot(_r);
  }
  function Cp() {
    return bt().memoizedState;
  }
  function Mp() {
    return bt().memoizedState;
  }
  function eE(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = fn();
          e = ka(i);
          var r = qa(n, e, i);
          r !== null && (tn(r, n, i), fr(r, n, i)), n = { cache: dc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function tE(e, n, i) {
    var r = fn();
    i = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ws(e) ? jp(n, i) : (i = tc(e, n, i, r), i !== null && (tn(i, e, r), Dp(i, n, r)));
  }
  function Ap(e, n, i) {
    var r = fn();
    yr(e, n, i, r);
  }
  function yr(e, n, i, r) {
    var u = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ws(e)) jp(n, u);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var v = n.lastRenderedState, T = d(v, i);
          if (u.hasEagerState = !0, u.eagerState = T, ln(T, v))
            return _s(e, n, u, 0), tt === null && zs(), !1;
        } catch {
        } finally {
        }
      if (i = tc(e, n, u, r), i !== null)
        return tn(i, e, r), Dp(i, n, r), !0;
    }
    return !1;
  }
  function Bc(e, n, i, r) {
    if (r = {
      lane: 2,
      revertLane: gf(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ws(e)) {
      if (n) throw Error(s(479));
    } else
      n = tc(
        e,
        i,
        r,
        2
      ), n !== null && tn(n, e, 2);
  }
  function Ws(e) {
    var n = e.alternate;
    return e === Ae || n !== null && n === Ae;
  }
  function jp(e, n) {
    yl = $s = !0;
    var i = e.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), e.pending = n;
  }
  function Dp(e, n, i) {
    if ((i & 4194048) !== 0) {
      var r = n.lanes;
      r &= e.pendingLanes, i |= r, n.lanes = i, Ss(e, i);
    }
  }
  var gr = {
    readContext: Ot,
    use: Ks,
    useCallback: mt,
    useContext: mt,
    useEffect: mt,
    useImperativeHandle: mt,
    useLayoutEffect: mt,
    useInsertionEffect: mt,
    useMemo: mt,
    useReducer: mt,
    useRef: mt,
    useState: mt,
    useDebugValue: mt,
    useDeferredValue: mt,
    useTransition: mt,
    useSyncExternalStore: mt,
    useId: mt,
    useHostTransitionStatus: mt,
    useFormState: mt,
    useActionState: mt,
    useOptimistic: mt,
    useMemoCache: mt,
    useCacheRefresh: mt
  };
  gr.useEffectEvent = mt;
  var Np = {
    readContext: Ot,
    use: Ks,
    useCallback: function(e, n) {
      return $t().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: Ot,
    useEffect: mp,
    useImperativeHandle: function(e, n, i) {
      i = i != null ? i.concat([e]) : null, Zs(
        4194308,
        4,
        vp.bind(null, n, e),
        i
      );
    },
    useLayoutEffect: function(e, n) {
      return Zs(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      Zs(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var i = $t();
      n = n === void 0 ? null : n;
      var r = e();
      if (Di) {
        Dt(!0);
        try {
          e();
        } finally {
          Dt(!1);
        }
      }
      return i.memoizedState = [r, n], r;
    },
    useReducer: function(e, n, i) {
      var r = $t();
      if (i !== void 0) {
        var u = i(n);
        if (Di) {
          Dt(!0);
          try {
            i(n);
          } finally {
            Dt(!1);
          }
        }
      } else u = n;
      return r.memoizedState = r.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, r.queue = e, e = e.dispatch = tE.bind(
        null,
        Ae,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var n = $t();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Nc(e);
      var n = e.queue, i = Ap.bind(null, Ae, n);
      return n.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, n) {
      var i = $t();
      return Lc(i, e, n);
    },
    useTransition: function() {
      var e = Nc(!1);
      return e = Tp.bind(
        null,
        Ae,
        e.queue,
        !0,
        !1
      ), $t().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, i) {
      var r = Ae, u = $t();
      if (ke) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = n(), tt === null)
          throw Error(s(349));
        (Be & 127) !== 0 || Jm(r, n, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return u.queue = d, mp(ep.bind(null, r, d, e), [
        e
      ]), r.flags |= 2048, vl(
        9,
        { destroy: void 0 },
        Wm.bind(
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
      var e = $t(), n = tt.identifierPrefix;
      if (ke) {
        var i = $n, r = Gn;
        i = (r & ~(1 << 32 - kt(r) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = Xs++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = I1++, n = "_" + n + "r_" + i.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Vc,
    useFormState: up,
    useActionState: up,
    useOptimistic: function(e) {
      var n = $t();
      n.memoizedState = n.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = Bc.bind(
        null,
        Ae,
        !0,
        i
      ), i.dispatch = n, [e, n];
    },
    useMemoCache: Ac,
    useCacheRefresh: function() {
      return $t().memoizedState = eE.bind(
        null,
        Ae
      );
    },
    useEffectEvent: function(e) {
      var n = $t(), i = { impl: e };
      return n.memoizedState = i, function() {
        if ((Fe & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Hc = {
    readContext: Ot,
    use: Ks,
    useCallback: xp,
    useContext: Ot,
    useEffect: _c,
    useImperativeHandle: bp,
    useInsertionEffect: yp,
    useLayoutEffect: gp,
    useMemo: Sp,
    useReducer: Qs,
    useRef: hp,
    useState: function() {
      return Qs(ha);
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, n) {
      var i = bt();
      return Ep(
        i,
        Ze.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Qs(ha)[0], n = bt().memoizedState;
      return [
        typeof e == "boolean" ? e : pr(e),
        n
      ];
    },
    useSyncExternalStore: Zm,
    useId: Cp,
    useHostTransitionStatus: Vc,
    useFormState: cp,
    useActionState: cp,
    useOptimistic: function(e, n) {
      var i = bt();
      return ap(i, Ze, e, n);
    },
    useMemoCache: Ac,
    useCacheRefresh: Mp
  };
  Hc.useEffectEvent = pp;
  var zp = {
    readContext: Ot,
    use: Ks,
    useCallback: xp,
    useContext: Ot,
    useEffect: _c,
    useImperativeHandle: bp,
    useInsertionEffect: yp,
    useLayoutEffect: gp,
    useMemo: Sp,
    useReducer: Dc,
    useRef: hp,
    useState: function() {
      return Dc(ha);
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, n) {
      var i = bt();
      return Ze === null ? Lc(i, e, n) : Ep(
        i,
        Ze.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Dc(ha)[0], n = bt().memoizedState;
      return [
        typeof e == "boolean" ? e : pr(e),
        n
      ];
    },
    useSyncExternalStore: Zm,
    useId: Cp,
    useHostTransitionStatus: Vc,
    useFormState: dp,
    useActionState: dp,
    useOptimistic: function(e, n) {
      var i = bt();
      return Ze !== null ? ap(i, Ze, e, n) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Ac,
    useCacheRefresh: Mp
  };
  zp.useEffectEvent = pp;
  function kc(e, n, i, r) {
    n = e.memoizedState, i = i(r, n), i = i == null ? n : b({}, n, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var qc = {
    enqueueSetState: function(e, n, i) {
      e = e._reactInternals;
      var r = fn(), u = ka(r);
      u.payload = n, i != null && (u.callback = i), n = qa(e, u, r), n !== null && (tn(n, e, r), fr(n, e, r));
    },
    enqueueReplaceState: function(e, n, i) {
      e = e._reactInternals;
      var r = fn(), u = ka(r);
      u.tag = 1, u.payload = n, i != null && (u.callback = i), n = qa(e, u, r), n !== null && (tn(n, e, r), fr(n, e, r));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var i = fn(), r = ka(i);
      r.tag = 2, n != null && (r.callback = n), n = qa(e, r, i), n !== null && (tn(n, e, i), fr(n, e, i));
    }
  };
  function _p(e, n, i, r, u, d, v) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, d, v) : n.prototype && n.prototype.isPureReactComponent ? !ar(i, r) || !ar(u, d) : !0;
  }
  function Op(e, n, i, r) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, r), n.state !== e && qc.enqueueReplaceState(n, n.state, null);
  }
  function Ni(e, n) {
    var i = n;
    if ("ref" in n) {
      i = {};
      for (var r in n)
        r !== "ref" && (i[r] = n[r]);
    }
    if (e = e.defaultProps) {
      i === n && (i = b({}, i));
      for (var u in e)
        i[u] === void 0 && (i[u] = e[u]);
    }
    return i;
  }
  function Lp(e) {
    Ns(e);
  }
  function Up(e) {
    console.error(e);
  }
  function Vp(e) {
    Ns(e);
  }
  function eo(e, n) {
    try {
      var i = e.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Bp(e, n, i) {
    try {
      var r = e.onCaughtError;
      r(i.value, {
        componentStack: i.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Pc(e, n, i) {
    return i = ka(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      eo(e, n);
    }, i;
  }
  function Hp(e) {
    return e = ka(e), e.tag = 3, e;
  }
  function kp(e, n, i, r) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = r.value;
      e.payload = function() {
        return u(d);
      }, e.callback = function() {
        Bp(n, i, r);
      };
    }
    var v = i.stateNode;
    v !== null && typeof v.componentDidCatch == "function" && (e.callback = function() {
      Bp(n, i, r), typeof u != "function" && (Xa === null ? Xa = /* @__PURE__ */ new Set([this]) : Xa.add(this));
      var T = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: T !== null ? T : ""
      });
    });
  }
  function nE(e, n, i, r, u) {
    if (i.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (n = i.alternate, n !== null && cl(
        n,
        i,
        u,
        !0
      ), i = sn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return Sn === null ? ho() : i.alternate === null && pt === 0 && (pt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, r === qs ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([r]) : n.add(r), mf(e, r, u)), !1;
          case 22:
            return i.flags |= 65536, r === qs ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([r]) : i.add(r)), mf(e, r, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return mf(e, r, u), ho(), !1;
    }
    if (ke)
      return n = sn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, r !== sc && (e = Error(s(422), { cause: r }), rr(gn(e, i)))) : (r !== sc && (n = Error(s(423), {
        cause: r
      }), rr(
        gn(n, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, r = gn(r, i), u = Pc(
        e.stateNode,
        r,
        u
      ), vc(e, u), pt !== 4 && (pt = 2)), !1;
    var d = Error(s(520), { cause: r });
    if (d = gn(d, i), Rr === null ? Rr = [d] : Rr.push(d), pt !== 4 && (pt = 2), n === null) return !0;
    r = gn(r, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = Pc(i.stateNode, r, e), vc(i, e), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Xa === null || !Xa.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Hp(u), kp(
              u,
              e,
              i,
              r
            ), vc(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Yc = Error(s(461)), Rt = !1;
  function Lt(e, n, i, r) {
    n.child = e === null ? Fm(n, null, i, r) : ji(
      n,
      e.child,
      i,
      r
    );
  }
  function qp(e, n, i, r, u) {
    i = i.render;
    var d = n.ref;
    if ("ref" in r) {
      var v = {};
      for (var T in r)
        T !== "ref" && (v[T] = r[T]);
    } else v = r;
    return Ri(n), r = wc(
      e,
      n,
      i,
      v,
      d,
      u
    ), T = Rc(), e !== null && !Rt ? (Cc(e, n, u), ma(e, n, u)) : (ke && T && lc(n), n.flags |= 1, Lt(e, n, r, u), n.child);
  }
  function Pp(e, n, i, r, u) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" && !nc(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, Yp(
        e,
        n,
        d,
        r,
        u
      )) : (e = Ls(
        i.type,
        null,
        r,
        n,
        n.mode,
        u
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (d = e.child, !Zc(e, u)) {
      var v = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : ar, i(v, r) && e.ref === n.ref)
        return ma(e, n, u);
    }
    return n.flags |= 1, e = oa(d, r), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Yp(e, n, i, r, u) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (ar(d, r) && e.ref === n.ref)
        if (Rt = !1, n.pendingProps = r = d, Zc(e, u))
          (e.flags & 131072) !== 0 && (Rt = !0);
        else
          return n.lanes = e.lanes, ma(e, n, u);
    }
    return Fc(
      e,
      n,
      i,
      r,
      u
    );
  }
  function Fp(e, n, i, r) {
    var u = r.children, d = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), r.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (d = d !== null ? d.baseLanes | i : i, e !== null) {
          for (r = n.child = e.child, u = 0; r !== null; )
            u = u | r.lanes | r.childLanes, r = r.sibling;
          r = u & ~d;
        } else r = 0, n.child = null;
        return Gp(
          e,
          n,
          d,
          i,
          r
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Hs(
          n,
          d !== null ? d.cachePool : null
        ), d !== null ? Xm(n, d) : xc(), Im(n);
      else
        return r = n.lanes = 536870912, Gp(
          e,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          r
        );
    } else
      d !== null ? (Hs(n, d.cachePool), Xm(n, d), Ya(), n.memoizedState = null) : (e !== null && Hs(n, null), xc(), Ya());
    return Lt(e, n, u, i), n.child;
  }
  function vr(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Gp(e, n, i, r, u) {
    var d = mc();
    return d = d === null ? null : { parent: Tt._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, e !== null && Hs(n, null), xc(), Im(n), e !== null && cl(e, n, r, !0), n.childLanes = u, null;
  }
  function to(e, n) {
    return n = ao(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function $p(e, n, i) {
    return ji(n, e.child, null, i), e = to(n, n.pendingProps), e.flags |= 2, on(n), n.memoizedState = null, e;
  }
  function aE(e, n, i) {
    var r = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (ke) {
        if (r.mode === "hidden")
          return e = to(n, r), n.lanes = 536870912, vr(null, e);
        if (Ec(n), (e = lt) ? (e = ig(
          e,
          xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: La !== null ? { id: Gn, overflow: $n } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = jm(e), i.return = n, n.child = i, _t = n, lt = null)) : e = null, e === null) throw Va(n);
        return n.lanes = 536870912, null;
      }
      return to(n, r);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var v = d.dehydrated;
      if (Ec(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = $p(
            e,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(s(558));
      else if (Rt || cl(e, n, i, !1), u = (i & e.childLanes) !== 0, Rt || u) {
        if (r = tt, r !== null && (v = j(r, i), v !== 0 && v !== d.retryLane))
          throw d.retryLane = v, Si(e, v), tn(r, e, v), Yc;
        ho(), n = $p(
          e,
          n,
          i
        );
      } else
        e = d.treeContext, lt = En(v.nextSibling), _t = n, ke = !0, Ua = null, xn = !1, e !== null && zm(n, e), n = to(n, r), n.flags |= 4096;
      return n;
    }
    return e = oa(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function no(e, n) {
    var i = n.ref;
    if (i === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (e === null || e.ref !== i) && (n.flags |= 4194816);
    }
  }
  function Fc(e, n, i, r, u) {
    return Ri(n), i = wc(
      e,
      n,
      i,
      r,
      void 0,
      u
    ), r = Rc(), e !== null && !Rt ? (Cc(e, n, u), ma(e, n, u)) : (ke && r && lc(n), n.flags |= 1, Lt(e, n, i, u), n.child);
  }
  function Xp(e, n, i, r, u, d) {
    return Ri(n), n.updateQueue = null, i = Qm(
      n,
      r,
      i,
      u
    ), Km(e), r = Rc(), e !== null && !Rt ? (Cc(e, n, d), ma(e, n, d)) : (ke && r && lc(n), n.flags |= 1, Lt(e, n, i, d), n.child);
  }
  function Ip(e, n, i, r, u) {
    if (Ri(n), n.stateNode === null) {
      var d = rl, v = i.contextType;
      typeof v == "object" && v !== null && (d = Ot(v)), d = new i(r, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = qc, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = r, d.state = n.memoizedState, d.refs = {}, yc(n), v = i.contextType, d.context = typeof v == "object" && v !== null ? Ot(v) : rl, d.state = n.memoizedState, v = i.getDerivedStateFromProps, typeof v == "function" && (kc(
        n,
        i,
        v,
        r
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (v = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), v !== d.state && qc.enqueueReplaceState(d, d.state, null), hr(n, r, d, u), dr(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), r = !0;
    } else if (e === null) {
      d = n.stateNode;
      var T = n.memoizedProps, A = Ni(i, T);
      d.props = A;
      var P = d.context, Q = i.contextType;
      v = rl, typeof Q == "object" && Q !== null && (v = Ot(Q));
      var W = i.getDerivedStateFromProps;
      Q = typeof W == "function" || typeof d.getSnapshotBeforeUpdate == "function", T = n.pendingProps !== T, Q || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (T || P !== v) && Op(
        n,
        d,
        r,
        v
      ), Ha = !1;
      var F = n.memoizedState;
      d.state = F, hr(n, r, d, u), dr(), P = n.memoizedState, T || F !== P || Ha ? (typeof W == "function" && (kc(
        n,
        i,
        W,
        r
      ), P = n.memoizedState), (A = Ha || _p(
        n,
        i,
        A,
        r,
        F,
        P,
        v
      )) ? (Q || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = P), d.props = r, d.state = P, d.context = v, r = A) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), r = !1);
    } else {
      d = n.stateNode, gc(e, n), v = n.memoizedProps, Q = Ni(i, v), d.props = Q, W = n.pendingProps, F = d.context, P = i.contextType, A = rl, typeof P == "object" && P !== null && (A = Ot(P)), T = i.getDerivedStateFromProps, (P = typeof T == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (v !== W || F !== A) && Op(
        n,
        d,
        r,
        A
      ), Ha = !1, F = n.memoizedState, d.state = F, hr(n, r, d, u), dr();
      var $ = n.memoizedState;
      v !== W || F !== $ || Ha || e !== null && e.dependencies !== null && Vs(e.dependencies) ? (typeof T == "function" && (kc(
        n,
        i,
        T,
        r
      ), $ = n.memoizedState), (Q = Ha || _p(
        n,
        i,
        Q,
        r,
        F,
        $,
        A
      ) || e !== null && e.dependencies !== null && Vs(e.dependencies)) ? (P || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(r, $, A), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        r,
        $,
        A
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || v === e.memoizedProps && F === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && F === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = $), d.props = r, d.state = $, d.context = A, r = Q) : (typeof d.componentDidUpdate != "function" || v === e.memoizedProps && F === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && F === e.memoizedState || (n.flags |= 1024), r = !1);
    }
    return d = r, no(e, n), r = (n.flags & 128) !== 0, d || r ? (d = n.stateNode, i = r && typeof i.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, e !== null && r ? (n.child = ji(
      n,
      e.child,
      null,
      u
    ), n.child = ji(
      n,
      null,
      i,
      u
    )) : Lt(e, n, i, u), n.memoizedState = d.state, e = n.child) : e = ma(
      e,
      n,
      u
    ), e;
  }
  function Kp(e, n, i, r) {
    return Ti(), n.flags |= 256, Lt(e, n, i, r), n.child;
  }
  var Gc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function $c(e) {
    return { baseLanes: e, cachePool: Bm() };
  }
  function Xc(e, n, i) {
    return e = e !== null ? e.childLanes & ~i : 0, n && (e |= cn), e;
  }
  function Qp(e, n, i) {
    var r = n.pendingProps, u = !1, d = (n.flags & 128) !== 0, v;
    if ((v = d) || (v = e !== null && e.memoizedState === null ? !1 : (vt.current & 2) !== 0), v && (u = !0, n.flags &= -129), v = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (ke) {
        if (u ? Pa(n) : Ya(), (e = lt) ? (e = ig(
          e,
          xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: La !== null ? { id: Gn, overflow: $n } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = jm(e), i.return = n, n.child = i, _t = n, lt = null)) : e = null, e === null) throw Va(n);
        return Df(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var T = r.children;
      return r = r.fallback, u ? (Ya(), u = n.mode, T = ao(
        { mode: "hidden", children: T },
        u
      ), r = Ei(
        r,
        u,
        i,
        null
      ), T.return = n, r.return = n, T.sibling = r, n.child = T, r = n.child, r.memoizedState = $c(i), r.childLanes = Xc(
        e,
        v,
        i
      ), n.memoizedState = Gc, vr(null, r)) : (Pa(n), Ic(n, T));
    }
    var A = e.memoizedState;
    if (A !== null && (T = A.dehydrated, T !== null)) {
      if (d)
        n.flags & 256 ? (Pa(n), n.flags &= -257, n = Kc(
          e,
          n,
          i
        )) : n.memoizedState !== null ? (Ya(), n.child = e.child, n.flags |= 128, n = null) : (Ya(), T = r.fallback, u = n.mode, r = ao(
          { mode: "visible", children: r.children },
          u
        ), T = Ei(
          T,
          u,
          i,
          null
        ), T.flags |= 2, r.return = n, T.return = n, r.sibling = T, n.child = r, ji(
          n,
          e.child,
          null,
          i
        ), r = n.child, r.memoizedState = $c(i), r.childLanes = Xc(
          e,
          v,
          i
        ), n.memoizedState = Gc, n = vr(null, r));
      else if (Pa(n), Df(T)) {
        if (v = T.nextSibling && T.nextSibling.dataset, v) var P = v.dgst;
        v = P, r = Error(s(419)), r.stack = "", r.digest = v, rr({ value: r, source: null, stack: null }), n = Kc(
          e,
          n,
          i
        );
      } else if (Rt || cl(e, n, i, !1), v = (i & e.childLanes) !== 0, Rt || v) {
        if (v = tt, v !== null && (r = j(v, i), r !== 0 && r !== A.retryLane))
          throw A.retryLane = r, Si(e, r), tn(v, e, r), Yc;
        jf(T) || ho(), n = Kc(
          e,
          n,
          i
        );
      } else
        jf(T) ? (n.flags |= 192, n.child = e.child, n = null) : (e = A.treeContext, lt = En(
          T.nextSibling
        ), _t = n, ke = !0, Ua = null, xn = !1, e !== null && zm(n, e), n = Ic(
          n,
          r.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (Ya(), T = r.fallback, u = n.mode, A = e.child, P = A.sibling, r = oa(A, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = A.subtreeFlags & 65011712, P !== null ? T = oa(
      P,
      T
    ) : (T = Ei(
      T,
      u,
      i,
      null
    ), T.flags |= 2), T.return = n, r.return = n, r.sibling = T, n.child = r, vr(null, r), r = n.child, T = e.child.memoizedState, T === null ? T = $c(i) : (u = T.cachePool, u !== null ? (A = Tt._currentValue, u = u.parent !== A ? { parent: A, pool: A } : u) : u = Bm(), T = {
      baseLanes: T.baseLanes | i,
      cachePool: u
    }), r.memoizedState = T, r.childLanes = Xc(
      e,
      v,
      i
    ), n.memoizedState = Gc, vr(e.child, r)) : (Pa(n), i = e.child, e = i.sibling, i = oa(i, {
      mode: "visible",
      children: r.children
    }), i.return = n, i.sibling = null, e !== null && (v = n.deletions, v === null ? (n.deletions = [e], n.flags |= 16) : v.push(e)), n.child = i, n.memoizedState = null, i);
  }
  function Ic(e, n) {
    return n = ao(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function ao(e, n) {
    return e = rn(22, e, null, n), e.lanes = 0, e;
  }
  function Kc(e, n, i) {
    return ji(n, e.child, null, i), e = Ic(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Zp(e, n, i) {
    e.lanes |= n;
    var r = e.alternate;
    r !== null && (r.lanes |= n), cc(e.return, n, i);
  }
  function Qc(e, n, i, r, u, d) {
    var v = e.memoizedState;
    v === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: r,
      tail: i,
      tailMode: u,
      treeForkCount: d
    } : (v.isBackwards = n, v.rendering = null, v.renderingStartTime = 0, v.last = r, v.tail = i, v.tailMode = u, v.treeForkCount = d);
  }
  function Jp(e, n, i) {
    var r = n.pendingProps, u = r.revealOrder, d = r.tail;
    r = r.children;
    var v = vt.current, T = (v & 2) !== 0;
    if (T ? (v = v & 1 | 2, n.flags |= 128) : v &= 1, se(vt, v), Lt(e, n, r, i), r = ke ? lr : 0, !T && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Zp(e, i, n);
        else if (e.tag === 19)
          Zp(e, i, n);
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
        for (i = n.child, u = null; i !== null; )
          e = i.alternate, e !== null && Gs(e) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = n.child, n.child = null) : (u = i.sibling, i.sibling = null), Qc(
          n,
          !1,
          u,
          i,
          d,
          r
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, u = n.child, n.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && Gs(e) === null) {
            n.child = u;
            break;
          }
          e = u.sibling, u.sibling = i, i = u, u = e;
        }
        Qc(
          n,
          !0,
          i,
          null,
          d,
          r
        );
        break;
      case "together":
        Qc(
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
  function ma(e, n, i) {
    if (e !== null && (n.dependencies = e.dependencies), $a |= n.lanes, (i & n.childLanes) === 0)
      if (e !== null) {
        if (cl(
          e,
          n,
          i,
          !1
        ), (i & n.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && n.child !== e.child)
      throw Error(s(153));
    if (n.child !== null) {
      for (e = n.child, i = oa(e, e.pendingProps), n.child = i, i.return = n; e.sibling !== null; )
        e = e.sibling, i = i.sibling = oa(e, e.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function Zc(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Vs(e)));
  }
  function iE(e, n, i) {
    switch (n.tag) {
      case 3:
        ht(n, n.stateNode.containerInfo), Ba(n, Tt, e.memoizedState.cache), Ti();
        break;
      case 27:
      case 5:
        ta(n);
        break;
      case 4:
        ht(n, n.stateNode.containerInfo);
        break;
      case 10:
        Ba(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Ec(n), null;
        break;
      case 13:
        var r = n.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (Pa(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? Qp(e, n, i) : (Pa(n), e = ma(
            e,
            n,
            i
          ), e !== null ? e.sibling : null);
        Pa(n);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (r = (i & n.childLanes) !== 0, r || (cl(
          e,
          n,
          i,
          !1
        ), r = (i & n.childLanes) !== 0), u) {
          if (r)
            return Jp(
              e,
              n,
              i
            );
          n.flags |= 128;
        }
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), se(vt, vt.current), r) break;
        return null;
      case 22:
        return n.lanes = 0, Fp(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        Ba(n, Tt, e.memoizedState.cache);
    }
    return ma(e, n, i);
  }
  function Wp(e, n, i) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Rt = !0;
      else {
        if (!Zc(e, i) && (n.flags & 128) === 0)
          return Rt = !1, iE(
            e,
            n,
            i
          );
        Rt = (e.flags & 131072) !== 0;
      }
    else
      Rt = !1, ke && (n.flags & 1048576) !== 0 && Nm(n, lr, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var r = n.pendingProps;
          if (e = Mi(n.elementType), n.type = e, typeof e == "function")
            nc(e) ? (r = Ni(e, r), n.tag = 1, n = Ip(
              null,
              n,
              e,
              r,
              i
            )) : (n.tag = 0, n = Fc(
              null,
              n,
              e,
              r,
              i
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === k) {
                n.tag = 11, n = qp(
                  null,
                  n,
                  e,
                  r,
                  i
                );
                break e;
              } else if (u === te) {
                n.tag = 14, n = Pp(
                  null,
                  n,
                  e,
                  r,
                  i
                );
                break e;
              }
            }
            throw n = ue(e) || e, Error(s(306, n, ""));
          }
        }
        return n;
      case 0:
        return Fc(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return r = n.type, u = Ni(
          r,
          n.pendingProps
        ), Ip(
          e,
          n,
          r,
          u,
          i
        );
      case 3:
        e: {
          if (ht(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          r = n.pendingProps;
          var d = n.memoizedState;
          u = d.element, gc(e, n), hr(n, r, null, i);
          var v = n.memoizedState;
          if (r = v.cache, Ba(n, Tt, r), r !== d.cache && fc(
            n,
            [Tt],
            i,
            !0
          ), dr(), r = v.element, d.isDehydrated)
            if (d = {
              element: r,
              isDehydrated: !1,
              cache: v.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = Kp(
                e,
                n,
                r,
                i
              );
              break e;
            } else if (r !== u) {
              u = gn(
                Error(s(424)),
                n
              ), rr(u), n = Kp(
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
              for (lt = En(e.firstChild), _t = n, ke = !0, Ua = null, xn = !0, i = Fm(
                n,
                null,
                r,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (Ti(), r === u) {
              n = ma(
                e,
                n,
                i
              );
              break e;
            }
            Lt(e, n, r, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return no(e, n), e === null ? (i = cg(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : ke || (i = n.type, e = n.pendingProps, r = xo(
          Re.current
        ).createElement(i), r[de] = n, r[he] = e, Ut(r, i, e), at(r), n.stateNode = r) : n.memoizedState = cg(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ta(n), e === null && ke && (r = n.stateNode = sg(
          n.type,
          n.pendingProps,
          Re.current
        ), _t = n, xn = !0, u = lt, Za(n.type) ? (Nf = u, lt = En(r.firstChild)) : lt = u), Lt(
          e,
          n,
          n.pendingProps.children,
          i
        ), no(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && ke && ((u = r = lt) && (r = OE(
          r,
          n.type,
          n.pendingProps,
          xn
        ), r !== null ? (n.stateNode = r, _t = n, lt = En(r.firstChild), xn = !1, u = !0) : u = !1), u || Va(n)), ta(n), u = n.type, d = n.pendingProps, v = e !== null ? e.memoizedProps : null, r = d.children, Cf(u, d) ? r = null : v !== null && Cf(u, v) && (n.flags |= 32), n.memoizedState !== null && (u = wc(
          e,
          n,
          K1,
          null,
          null,
          i
        ), _r._currentValue = u), no(e, n), Lt(e, n, r, i), n.child;
      case 6:
        return e === null && ke && ((e = i = lt) && (i = LE(
          i,
          n.pendingProps,
          xn
        ), i !== null ? (n.stateNode = i, _t = n, lt = null, e = !0) : e = !1), e || Va(n)), null;
      case 13:
        return Qp(e, n, i);
      case 4:
        return ht(
          n,
          n.stateNode.containerInfo
        ), r = n.pendingProps, e === null ? n.child = ji(
          n,
          null,
          r,
          i
        ) : Lt(e, n, r, i), n.child;
      case 11:
        return qp(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 7:
        return Lt(
          e,
          n,
          n.pendingProps,
          i
        ), n.child;
      case 8:
        return Lt(
          e,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 12:
        return Lt(
          e,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 10:
        return r = n.pendingProps, Ba(n, n.type, r.value), Lt(e, n, r.children, i), n.child;
      case 9:
        return u = n.type._context, r = n.pendingProps.children, Ri(n), u = Ot(u), r = r(u), n.flags |= 1, Lt(e, n, r, i), n.child;
      case 14:
        return Pp(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return Yp(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return Jp(e, n, i);
      case 31:
        return aE(e, n, i);
      case 22:
        return Fp(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return Ri(n), r = Ot(Tt), e === null ? (u = mc(), u === null && (u = tt, d = dc(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), n.memoizedState = { parent: r, cache: u }, yc(n), Ba(n, Tt, u)) : ((e.lanes & i) !== 0 && (gc(e, n), hr(n, null, null, i), dr()), u = e.memoizedState, d = n.memoizedState, u.parent !== r ? (u = { parent: r, cache: r }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), Ba(n, Tt, r)) : (r = d.cache, Ba(n, Tt, r), r !== u.cache && fc(
          n,
          [Tt],
          i,
          !0
        ))), Lt(
          e,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(s(156, n.tag));
  }
  function pa(e) {
    e.flags |= 4;
  }
  function Jc(e, n, i, r, u) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Cy()) e.flags |= 8192;
        else
          throw Ai = qs, pc;
    } else e.flags &= -16777217;
  }
  function ey(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !pg(n))
      if (Cy()) e.flags |= 8192;
      else
        throw Ai = qs, pc;
  }
  function io(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Kl() : 536870912, e.lanes |= n, El |= n);
  }
  function br(e, n) {
    if (!ke)
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
  function rt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, i = 0, r = 0;
    if (n)
      for (var u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, r |= u.subtreeFlags & 65011712, r |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, r |= u.subtreeFlags, r |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= r, e.childLanes = i, n;
  }
  function lE(e, n, i) {
    var r = n.pendingProps;
    switch (rc(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return rt(n), null;
      case 1:
        return rt(n), null;
      case 3:
        return i = n.stateNode, r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), fa(Tt), Xe(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (ul(n) ? pa(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, oc())), rt(n), null;
      case 26:
        var u = n.type, d = n.memoizedState;
        return e === null ? (pa(n), d !== null ? (rt(n), ey(n, d)) : (rt(n), Jc(
          n,
          u,
          null,
          r,
          i
        ))) : d ? d !== e.memoizedState ? (pa(n), rt(n), ey(n, d)) : (rt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== r && pa(n), rt(n), Jc(
          n,
          u,
          e,
          r,
          i
        )), null;
      case 27:
        if (Ma(n), i = Re.current, u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== r && pa(n);
        else {
          if (!r) {
            if (n.stateNode === null)
              throw Error(s(166));
            return rt(n), null;
          }
          e = ce.current, ul(n) ? _m(n) : (e = sg(u, r, i), n.stateNode = e, pa(n));
        }
        return rt(n), null;
      case 5:
        if (Ma(n), u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== r && pa(n);
        else {
          if (!r) {
            if (n.stateNode === null)
              throw Error(s(166));
            return rt(n), null;
          }
          if (d = ce.current, ul(n))
            _m(n);
          else {
            var v = xo(
              Re.current
            );
            switch (d) {
              case 1:
                d = v.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                d = v.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    d = v.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    d = v.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    d = v.createElement("div"), d.innerHTML = "<script><\/script>", d = d.removeChild(
                      d.firstChild
                    );
                    break;
                  case "select":
                    d = typeof r.is == "string" ? v.createElement("select", {
                      is: r.is
                    }) : v.createElement("select"), r.multiple ? d.multiple = !0 : r.size && (d.size = r.size);
                    break;
                  default:
                    d = typeof r.is == "string" ? v.createElement(u, { is: r.is }) : v.createElement(u);
                }
            }
            d[de] = n, d[he] = r;
            e: for (v = n.child; v !== null; ) {
              if (v.tag === 5 || v.tag === 6)
                d.appendChild(v.stateNode);
              else if (v.tag !== 4 && v.tag !== 27 && v.child !== null) {
                v.child.return = v, v = v.child;
                continue;
              }
              if (v === n) break e;
              for (; v.sibling === null; ) {
                if (v.return === null || v.return === n)
                  break e;
                v = v.return;
              }
              v.sibling.return = v.return, v = v.sibling;
            }
            n.stateNode = d;
            e: switch (Ut(d, u, r), u) {
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
            r && pa(n);
          }
        }
        return rt(n), Jc(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== r && pa(n);
        else {
          if (typeof r != "string" && n.stateNode === null)
            throw Error(s(166));
          if (e = Re.current, ul(n)) {
            if (e = n.stateNode, i = n.memoizedProps, r = null, u = _t, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  r = u.memoizedProps;
              }
            e[de] = n, e = !!(e.nodeValue === i || r !== null && r.suppressHydrationWarning === !0 || Qy(e.nodeValue, i)), e || Va(n, !0);
          } else
            e = xo(e).createTextNode(
              r
            ), e[de] = n, n.stateNode = e;
        }
        return rt(n), null;
      case 31:
        if (i = n.memoizedState, e === null || e.memoizedState !== null) {
          if (r = ul(n), i !== null) {
            if (e === null) {
              if (!r) throw Error(s(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[de] = n;
            } else
              Ti(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            rt(n), e = !1;
          } else
            i = oc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return n.flags & 256 ? (on(n), n) : (on(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(s(558));
        }
        return rt(n), null;
      case 13:
        if (r = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = ul(n), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[de] = n;
            } else
              Ti(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            rt(n), u = !1;
          } else
            u = oc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (on(n), n) : (on(n), null);
        }
        return on(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = r !== null, e = e !== null && e.memoizedState !== null, i && (r = n.child, u = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (u = r.alternate.memoizedState.cachePool.pool), d = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (d = r.memoizedState.cachePool.pool), d !== u && (r.flags |= 2048)), i !== e && i && (n.child.flags |= 8192), io(n, n.updateQueue), rt(n), null);
      case 4:
        return Xe(), e === null && Sf(n.stateNode.containerInfo), rt(n), null;
      case 10:
        return fa(n.type), rt(n), null;
      case 19:
        if (K(vt), r = n.memoizedState, r === null) return rt(n), null;
        if (u = (n.flags & 128) !== 0, d = r.rendering, d === null)
          if (u) br(r, !1);
          else {
            if (pt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (d = Gs(e), d !== null) {
                  for (n.flags |= 128, br(r, !1), e = d.updateQueue, n.updateQueue = e, io(n, e), n.subtreeFlags = 0, e = i, i = n.child; i !== null; )
                    Am(i, e), i = i.sibling;
                  return se(
                    vt,
                    vt.current & 1 | 2
                  ), ke && ua(n, r.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            r.tail !== null && Ft() > uo && (n.flags |= 128, u = !0, br(r, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Gs(d), e !== null) {
              if (n.flags |= 128, u = !0, e = e.updateQueue, n.updateQueue = e, io(n, e), br(r, !0), r.tail === null && r.tailMode === "hidden" && !d.alternate && !ke)
                return rt(n), null;
            } else
              2 * Ft() - r.renderingStartTime > uo && i !== 536870912 && (n.flags |= 128, u = !0, br(r, !1), n.lanes = 4194304);
          r.isBackwards ? (d.sibling = n.child, n.child = d) : (e = r.last, e !== null ? e.sibling = d : n.child = d, r.last = d);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ft(), e.sibling = null, i = vt.current, se(
          vt,
          u ? i & 1 | 2 : i & 1
        ), ke && ua(n, r.treeForkCount), e) : (rt(n), null);
      case 22:
      case 23:
        return on(n), Sc(), r = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (n.flags |= 8192) : r && (n.flags |= 8192), r ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (rt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : rt(n), i = n.updateQueue, i !== null && io(n, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), r = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (r = n.memoizedState.cachePool.pool), r !== i && (n.flags |= 2048), e !== null && K(Ci), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), fa(Tt), rt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function rE(e, n) {
    switch (rc(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return fa(Tt), Xe(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ma(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (on(n), n.alternate === null)
            throw Error(s(340));
          Ti();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (on(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(s(340));
          Ti();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return K(vt), null;
      case 4:
        return Xe(), null;
      case 10:
        return fa(n.type), null;
      case 22:
      case 23:
        return on(n), Sc(), e !== null && K(Ci), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return fa(Tt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ty(e, n) {
    switch (rc(n), n.tag) {
      case 3:
        fa(Tt), Xe();
        break;
      case 26:
      case 27:
      case 5:
        Ma(n);
        break;
      case 4:
        Xe();
        break;
      case 31:
        n.memoizedState !== null && on(n);
        break;
      case 13:
        on(n);
        break;
      case 19:
        K(vt);
        break;
      case 10:
        fa(n.type);
        break;
      case 22:
      case 23:
        on(n), Sc(), e !== null && K(Ci);
        break;
      case 24:
        fa(Tt);
    }
  }
  function xr(e, n) {
    try {
      var i = n.updateQueue, r = i !== null ? i.lastEffect : null;
      if (r !== null) {
        var u = r.next;
        i = u;
        do {
          if ((i.tag & e) === e) {
            r = void 0;
            var d = i.create, v = i.inst;
            r = d(), v.destroy = r;
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (T) {
      Ke(n, n.return, T);
    }
  }
  function Fa(e, n, i) {
    try {
      var r = n.updateQueue, u = r !== null ? r.lastEffect : null;
      if (u !== null) {
        var d = u.next;
        r = d;
        do {
          if ((r.tag & e) === e) {
            var v = r.inst, T = v.destroy;
            if (T !== void 0) {
              v.destroy = void 0, u = n;
              var A = i, P = T;
              try {
                P();
              } catch (Q) {
                Ke(
                  u,
                  A,
                  Q
                );
              }
            }
          }
          r = r.next;
        } while (r !== d);
      }
    } catch (Q) {
      Ke(n, n.return, Q);
    }
  }
  function ny(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var i = e.stateNode;
      try {
        $m(n, i);
      } catch (r) {
        Ke(e, e.return, r);
      }
    }
  }
  function ay(e, n, i) {
    i.props = Ni(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (r) {
      Ke(e, n, r);
    }
  }
  function Sr(e, n) {
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
    } catch (u) {
      Ke(e, n, u);
    }
  }
  function Xn(e, n) {
    var i = e.ref, r = e.refCleanup;
    if (i !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (u) {
          Ke(e, n, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          Ke(e, n, u);
        }
      else i.current = null;
  }
  function iy(e) {
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
    } catch (u) {
      Ke(e, e.return, u);
    }
  }
  function Wc(e, n, i) {
    try {
      var r = e.stateNode;
      AE(r, e.type, i, n), r[he] = n;
    } catch (u) {
      Ke(e, e.return, u);
    }
  }
  function ly(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Za(e.type) || e.tag === 4;
  }
  function ef(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ly(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Za(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function tf(e, n, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(e), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = ra));
    else if (r !== 4 && (r === 27 && Za(e.type) && (i = e.stateNode, n = null), e = e.child, e !== null))
      for (tf(e, n, i), e = e.sibling; e !== null; )
        tf(e, n, i), e = e.sibling;
  }
  function lo(e, n, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? i.insertBefore(e, n) : i.appendChild(e);
    else if (r !== 4 && (r === 27 && Za(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (lo(e, n, i), e = e.sibling; e !== null; )
        lo(e, n, i), e = e.sibling;
  }
  function ry(e) {
    var n = e.stateNode, i = e.memoizedProps;
    try {
      for (var r = e.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      Ut(n, r, i), n[de] = e, n[he] = i;
    } catch (d) {
      Ke(e, e.return, d);
    }
  }
  var ya = !1, Ct = !1, nf = !1, sy = typeof WeakSet == "function" ? WeakSet : Set, zt = null;
  function sE(e, n) {
    if (e = e.containerInfo, wf = Mo, e = bm(e), Ku(e)) {
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
            var u = r.anchorOffset, d = r.focusNode;
            r = r.focusOffset;
            try {
              i.nodeType, d.nodeType;
            } catch {
              i = null;
              break e;
            }
            var v = 0, T = -1, A = -1, P = 0, Q = 0, W = e, F = null;
            t: for (; ; ) {
              for (var $; W !== i || u !== 0 && W.nodeType !== 3 || (T = v + u), W !== d || r !== 0 && W.nodeType !== 3 || (A = v + r), W.nodeType === 3 && (v += W.nodeValue.length), ($ = W.firstChild) !== null; )
                F = W, W = $;
              for (; ; ) {
                if (W === e) break t;
                if (F === i && ++P === u && (T = v), F === d && ++Q === r && (A = v), ($ = W.nextSibling) !== null) break;
                W = F, F = W.parentNode;
              }
              W = $;
            }
            i = T === -1 || A === -1 ? null : { start: T, end: A };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Rf = { focusedElem: e, selectionRange: i }, Mo = !1, zt = n; zt !== null; )
      if (n = zt, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, zt = e;
      else
        for (; zt !== null; ) {
          switch (n = zt, d = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  u = e[i], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && d !== null) {
                e = void 0, i = n, u = d.memoizedProps, d = d.memoizedState, r = i.stateNode;
                try {
                  var pe = Ni(
                    i.type,
                    u
                  );
                  e = r.getSnapshotBeforeUpdate(
                    pe,
                    d
                  ), r.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ce) {
                  Ke(
                    i,
                    i.return,
                    Ce
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, i = e.nodeType, i === 9)
                  Af(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Af(e);
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
          if (e = n.sibling, e !== null) {
            e.return = n.return, zt = e;
            break;
          }
          zt = n.return;
        }
  }
  function oy(e, n, i) {
    var r = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        va(e, i), r & 4 && xr(5, i);
        break;
      case 1:
        if (va(e, i), r & 4)
          if (e = i.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (v) {
              Ke(i, i.return, v);
            }
          else {
            var u = Ni(
              i.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                u,
                n,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (v) {
              Ke(
                i,
                i.return,
                v
              );
            }
          }
        r & 64 && ny(i), r & 512 && Sr(i, i.return);
        break;
      case 3:
        if (va(e, i), r & 64 && (e = i.updateQueue, e !== null)) {
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
            $m(e, n);
          } catch (v) {
            Ke(i, i.return, v);
          }
        }
        break;
      case 27:
        n === null && r & 4 && ry(i);
      case 26:
      case 5:
        va(e, i), n === null && r & 4 && iy(i), r & 512 && Sr(i, i.return);
        break;
      case 12:
        va(e, i);
        break;
      case 31:
        va(e, i), r & 4 && fy(e, i);
        break;
      case 13:
        va(e, i), r & 4 && dy(e, i), r & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = yE.bind(
          null,
          i
        ), UE(e, i))));
        break;
      case 22:
        if (r = i.memoizedState !== null || ya, !r) {
          n = n !== null && n.memoizedState !== null || Ct, u = ya;
          var d = Ct;
          ya = r, (Ct = n) && !d ? ba(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : va(e, i), ya = u, Ct = d;
        }
        break;
      case 30:
        break;
      default:
        va(e, i);
    }
  }
  function uy(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, uy(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && et(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ft = null, Zt = !1;
  function ga(e, n, i) {
    for (i = i.child; i !== null; )
      cy(e, n, i), i = i.sibling;
  }
  function cy(e, n, i) {
    if (Gt && typeof Gt.onCommitFiberUnmount == "function")
      try {
        Gt.onCommitFiberUnmount(ia, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Ct || Xn(i, n), ga(
          e,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Ct || Xn(i, n);
        var r = ft, u = Zt;
        Za(i.type) && (ft = i.stateNode, Zt = !1), ga(
          e,
          n,
          i
        ), Dr(i.stateNode), ft = r, Zt = u;
        break;
      case 5:
        Ct || Xn(i, n);
      case 6:
        if (r = ft, u = Zt, ft = null, ga(
          e,
          n,
          i
        ), ft = r, Zt = u, ft !== null)
          if (Zt)
            try {
              (ft.nodeType === 9 ? ft.body : ft.nodeName === "HTML" ? ft.ownerDocument.body : ft).removeChild(i.stateNode);
            } catch (d) {
              Ke(
                i,
                n,
                d
              );
            }
          else
            try {
              ft.removeChild(i.stateNode);
            } catch (d) {
              Ke(
                i,
                n,
                d
              );
            }
        break;
      case 18:
        ft !== null && (Zt ? (e = ft, ng(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), Dl(e)) : ng(ft, i.stateNode));
        break;
      case 4:
        r = ft, u = Zt, ft = i.stateNode.containerInfo, Zt = !0, ga(
          e,
          n,
          i
        ), ft = r, Zt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Fa(2, i, n), Ct || Fa(4, i, n), ga(
          e,
          n,
          i
        );
        break;
      case 1:
        Ct || (Xn(i, n), r = i.stateNode, typeof r.componentWillUnmount == "function" && ay(
          i,
          n,
          r
        )), ga(
          e,
          n,
          i
        );
        break;
      case 21:
        ga(
          e,
          n,
          i
        );
        break;
      case 22:
        Ct = (r = Ct) || i.memoizedState !== null, ga(
          e,
          n,
          i
        ), Ct = r;
        break;
      default:
        ga(
          e,
          n,
          i
        );
    }
  }
  function fy(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Dl(e);
      } catch (i) {
        Ke(n, n.return, i);
      }
    }
  }
  function dy(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Dl(e);
      } catch (i) {
        Ke(n, n.return, i);
      }
  }
  function oE(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new sy()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new sy()), n;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function ro(e, n) {
    var i = oE(e);
    n.forEach(function(r) {
      if (!i.has(r)) {
        i.add(r);
        var u = gE.bind(null, e, r);
        r.then(u, u);
      }
    });
  }
  function Jt(e, n) {
    var i = n.deletions;
    if (i !== null)
      for (var r = 0; r < i.length; r++) {
        var u = i[r], d = e, v = n, T = v;
        e: for (; T !== null; ) {
          switch (T.tag) {
            case 27:
              if (Za(T.type)) {
                ft = T.stateNode, Zt = !1;
                break e;
              }
              break;
            case 5:
              ft = T.stateNode, Zt = !1;
              break e;
            case 3:
            case 4:
              ft = T.stateNode.containerInfo, Zt = !0;
              break e;
          }
          T = T.return;
        }
        if (ft === null) throw Error(s(160));
        cy(d, v, u), ft = null, Zt = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        hy(n, e), n = n.sibling;
  }
  var Ln = null;
  function hy(e, n) {
    var i = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Jt(n, e), Wt(e), r & 4 && (Fa(3, e, e.return), xr(3, e), Fa(5, e, e.return));
        break;
      case 1:
        Jt(n, e), Wt(e), r & 512 && (Ct || i === null || Xn(i, i.return)), r & 64 && ya && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? r : i.concat(r))));
        break;
      case 26:
        var u = Ln;
        if (Jt(n, e), Wt(e), r & 512 && (Ct || i === null || Xn(i, i.return)), r & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (r = e.memoizedState, i === null)
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  r = e.type, i = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (r) {
                    case "title":
                      d = u.getElementsByTagName("title")[0], (!d || d[Ne] || d[de] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(r), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), Ut(d, r, i), d[de] = e, at(d), r = d;
                      break e;
                    case "link":
                      var v = hg(
                        "link",
                        "href",
                        u
                      ).get(r + (i.href || ""));
                      if (v) {
                        for (var T = 0; T < v.length; T++)
                          if (d = v[T], d.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && d.getAttribute("rel") === (i.rel == null ? null : i.rel) && d.getAttribute("title") === (i.title == null ? null : i.title) && d.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            v.splice(T, 1);
                            break t;
                          }
                      }
                      d = u.createElement(r), Ut(d, r, i), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (v = hg(
                        "meta",
                        "content",
                        u
                      ).get(r + (i.content || ""))) {
                        for (T = 0; T < v.length; T++)
                          if (d = v[T], d.getAttribute("content") === (i.content == null ? null : "" + i.content) && d.getAttribute("name") === (i.name == null ? null : i.name) && d.getAttribute("property") === (i.property == null ? null : i.property) && d.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && d.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            v.splice(T, 1);
                            break t;
                          }
                      }
                      d = u.createElement(r), Ut(d, r, i), u.head.appendChild(d);
                      break;
                    default:
                      throw Error(s(468, r));
                  }
                  d[de] = e, at(d), r = d;
                }
                e.stateNode = r;
              } else
                mg(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = dg(
                u,
                r,
                e.memoizedProps
              );
          else
            d !== r ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, r === null ? mg(
              u,
              e.type,
              e.stateNode
            ) : dg(
              u,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && Wc(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Jt(n, e), Wt(e), r & 512 && (Ct || i === null || Xn(i, i.return)), i !== null && r & 4 && Wc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Jt(n, e), Wt(e), r & 512 && (Ct || i === null || Xn(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            Wi(u, "");
          } catch (pe) {
            Ke(e, e.return, pe);
          }
        }
        r & 4 && e.stateNode != null && (u = e.memoizedProps, Wc(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), r & 1024 && (nf = !0);
        break;
      case 6:
        if (Jt(n, e), Wt(e), r & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          r = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = r;
          } catch (pe) {
            Ke(e, e.return, pe);
          }
        }
        break;
      case 3:
        if (To = null, u = Ln, Ln = So(n.containerInfo), Jt(n, e), Ln = u, Wt(e), r & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Dl(n.containerInfo);
          } catch (pe) {
            Ke(e, e.return, pe);
          }
        nf && (nf = !1, my(e));
        break;
      case 4:
        r = Ln, Ln = So(
          e.stateNode.containerInfo
        ), Jt(n, e), Wt(e), Ln = r;
        break;
      case 12:
        Jt(n, e), Wt(e);
        break;
      case 31:
        Jt(n, e), Wt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ro(e, r)));
        break;
      case 13:
        Jt(n, e), Wt(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (oo = Ft()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ro(e, r)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var A = i !== null && i.memoizedState !== null, P = ya, Q = Ct;
        if (ya = P || u, Ct = Q || A, Jt(n, e), Ct = Q, ya = P, Wt(e), r & 8192)
          e: for (n = e.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (i === null || A || ya || Ct || zi(e)), i = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                A = i = n;
                try {
                  if (d = A.stateNode, u)
                    v = d.style, typeof v.setProperty == "function" ? v.setProperty("display", "none", "important") : v.display = "none";
                  else {
                    T = A.stateNode;
                    var W = A.memoizedProps.style, F = W != null && W.hasOwnProperty("display") ? W.display : null;
                    T.style.display = F == null || typeof F == "boolean" ? "" : ("" + F).trim();
                  }
                } catch (pe) {
                  Ke(A, A.return, pe);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                A = n;
                try {
                  A.stateNode.nodeValue = u ? "" : A.memoizedProps;
                } catch (pe) {
                  Ke(A, A.return, pe);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                A = n;
                try {
                  var $ = A.stateNode;
                  u ? ag($, !0) : ag(A.stateNode, !1);
                } catch (pe) {
                  Ke(A, A.return, pe);
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
        r & 4 && (r = e.updateQueue, r !== null && (i = r.retryQueue, i !== null && (r.retryQueue = null, ro(e, i))));
        break;
      case 19:
        Jt(n, e), Wt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ro(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Jt(n, e), Wt(e);
    }
  }
  function Wt(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var i, r = e.return; r !== null; ) {
          if (ly(r)) {
            i = r;
            break;
          }
          r = r.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, d = ef(e);
            lo(e, d, u);
            break;
          case 5:
            var v = i.stateNode;
            i.flags & 32 && (Wi(v, ""), i.flags &= -33);
            var T = ef(e);
            lo(e, T, v);
            break;
          case 3:
          case 4:
            var A = i.stateNode.containerInfo, P = ef(e);
            tf(
              e,
              P,
              A
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (Q) {
        Ke(e, e.return, Q);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function my(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        my(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function va(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        oy(e, n.alternate, n), n = n.sibling;
  }
  function zi(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Fa(4, n, n.return), zi(n);
          break;
        case 1:
          Xn(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && ay(
            n,
            n.return,
            i
          ), zi(n);
          break;
        case 27:
          Dr(n.stateNode);
        case 26:
        case 5:
          Xn(n, n.return), zi(n);
          break;
        case 22:
          n.memoizedState === null && zi(n);
          break;
        case 30:
          zi(n);
          break;
        default:
          zi(n);
      }
      e = e.sibling;
    }
  }
  function ba(e, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var r = n.alternate, u = e, d = n, v = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          ba(
            u,
            d,
            i
          ), xr(4, d);
          break;
        case 1:
          if (ba(
            u,
            d,
            i
          ), r = d, u = r.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (P) {
              Ke(r, r.return, P);
            }
          if (r = d, u = r.updateQueue, u !== null) {
            var T = r.stateNode;
            try {
              var A = u.shared.hiddenCallbacks;
              if (A !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < A.length; u++)
                  Gm(A[u], T);
            } catch (P) {
              Ke(r, r.return, P);
            }
          }
          i && v & 64 && ny(d), Sr(d, d.return);
          break;
        case 27:
          ry(d);
        case 26:
        case 5:
          ba(
            u,
            d,
            i
          ), i && r === null && v & 4 && iy(d), Sr(d, d.return);
          break;
        case 12:
          ba(
            u,
            d,
            i
          );
          break;
        case 31:
          ba(
            u,
            d,
            i
          ), i && v & 4 && fy(u, d);
          break;
        case 13:
          ba(
            u,
            d,
            i
          ), i && v & 4 && dy(u, d);
          break;
        case 22:
          d.memoizedState === null && ba(
            u,
            d,
            i
          ), Sr(d, d.return);
          break;
        case 30:
          break;
        default:
          ba(
            u,
            d,
            i
          );
      }
      n = n.sibling;
    }
  }
  function af(e, n) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && sr(i));
  }
  function lf(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && sr(e));
  }
  function Un(e, n, i, r) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        py(
          e,
          n,
          i,
          r
        ), n = n.sibling;
  }
  function py(e, n, i, r) {
    var u = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Un(
          e,
          n,
          i,
          r
        ), u & 2048 && xr(9, n);
        break;
      case 1:
        Un(
          e,
          n,
          i,
          r
        );
        break;
      case 3:
        Un(
          e,
          n,
          i,
          r
        ), u & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && sr(e)));
        break;
      case 12:
        if (u & 2048) {
          Un(
            e,
            n,
            i,
            r
          ), e = n.stateNode;
          try {
            var d = n.memoizedProps, v = d.id, T = d.onPostCommit;
            typeof T == "function" && T(
              v,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (A) {
            Ke(n, n.return, A);
          }
        } else
          Un(
            e,
            n,
            i,
            r
          );
        break;
      case 31:
        Un(
          e,
          n,
          i,
          r
        );
        break;
      case 13:
        Un(
          e,
          n,
          i,
          r
        );
        break;
      case 23:
        break;
      case 22:
        d = n.stateNode, v = n.alternate, n.memoizedState !== null ? d._visibility & 2 ? Un(
          e,
          n,
          i,
          r
        ) : Er(e, n) : d._visibility & 2 ? Un(
          e,
          n,
          i,
          r
        ) : (d._visibility |= 2, bl(
          e,
          n,
          i,
          r,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && af(v, n);
        break;
      case 24:
        Un(
          e,
          n,
          i,
          r
        ), u & 2048 && lf(n.alternate, n);
        break;
      default:
        Un(
          e,
          n,
          i,
          r
        );
    }
  }
  function bl(e, n, i, r, u) {
    for (u = u && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var d = e, v = n, T = i, A = r, P = v.flags;
      switch (v.tag) {
        case 0:
        case 11:
        case 15:
          bl(
            d,
            v,
            T,
            A,
            u
          ), xr(8, v);
          break;
        case 23:
          break;
        case 22:
          var Q = v.stateNode;
          v.memoizedState !== null ? Q._visibility & 2 ? bl(
            d,
            v,
            T,
            A,
            u
          ) : Er(
            d,
            v
          ) : (Q._visibility |= 2, bl(
            d,
            v,
            T,
            A,
            u
          )), u && P & 2048 && af(
            v.alternate,
            v
          );
          break;
        case 24:
          bl(
            d,
            v,
            T,
            A,
            u
          ), u && P & 2048 && lf(v.alternate, v);
          break;
        default:
          bl(
            d,
            v,
            T,
            A,
            u
          );
      }
      n = n.sibling;
    }
  }
  function Er(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = e, r = n, u = r.flags;
        switch (r.tag) {
          case 22:
            Er(i, r), u & 2048 && af(
              r.alternate,
              r
            );
            break;
          case 24:
            Er(i, r), u & 2048 && lf(r.alternate, r);
            break;
          default:
            Er(i, r);
        }
        n = n.sibling;
      }
  }
  var Tr = 8192;
  function xl(e, n, i) {
    if (e.subtreeFlags & Tr)
      for (e = e.child; e !== null; )
        yy(
          e,
          n,
          i
        ), e = e.sibling;
  }
  function yy(e, n, i) {
    switch (e.tag) {
      case 26:
        xl(
          e,
          n,
          i
        ), e.flags & Tr && e.memoizedState !== null && IE(
          i,
          Ln,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        xl(
          e,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var r = Ln;
        Ln = So(e.stateNode.containerInfo), xl(
          e,
          n,
          i
        ), Ln = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Tr, Tr = 16777216, xl(
          e,
          n,
          i
        ), Tr = r) : xl(
          e,
          n,
          i
        ));
        break;
      default:
        xl(
          e,
          n,
          i
        );
    }
  }
  function gy(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function wr(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var r = n[i];
          zt = r, by(
            r,
            e
          );
        }
      gy(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        vy(e), e = e.sibling;
  }
  function vy(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        wr(e), e.flags & 2048 && Fa(9, e, e.return);
        break;
      case 3:
        wr(e);
        break;
      case 12:
        wr(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, so(e)) : wr(e);
        break;
      default:
        wr(e);
    }
  }
  function so(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var r = n[i];
          zt = r, by(
            r,
            e
          );
        }
      gy(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Fa(8, n, n.return), so(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, so(n));
          break;
        default:
          so(n);
      }
      e = e.sibling;
    }
  }
  function by(e, n) {
    for (; zt !== null; ) {
      var i = zt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Fa(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var r = i.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          sr(i.memoizedState.cache);
      }
      if (r = i.child, r !== null) r.return = i, zt = r;
      else
        e: for (i = e; zt !== null; ) {
          r = zt;
          var u = r.sibling, d = r.return;
          if (uy(r), r === i) {
            zt = null;
            break e;
          }
          if (u !== null) {
            u.return = d, zt = u;
            break e;
          }
          zt = d;
        }
    }
  }
  var uE = {
    getCacheForType: function(e) {
      var n = Ot(Tt), i = n.data.get(e);
      return i === void 0 && (i = e(), n.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Ot(Tt).controller.signal;
    }
  }, cE = typeof WeakMap == "function" ? WeakMap : Map, Fe = 0, tt = null, Ue = null, Be = 0, Ie = 0, un = null, Ga = !1, Sl = !1, rf = !1, xa = 0, pt = 0, $a = 0, _i = 0, sf = 0, cn = 0, El = 0, Rr = null, en = null, of = !1, oo = 0, xy = 0, uo = 1 / 0, co = null, Xa = null, At = 0, Ia = null, Tl = null, Sa = 0, uf = 0, cf = null, Sy = null, Cr = 0, ff = null;
  function fn() {
    return (Fe & 2) !== 0 && Be !== 0 ? Be & -Be : U.T !== null ? gf() : ie();
  }
  function Ey() {
    if (cn === 0)
      if ((Be & 536870912) === 0 || ke) {
        var e = la;
        la <<= 1, (la & 3932160) === 0 && (la = 262144), cn = e;
      } else cn = 536870912;
    return e = sn.current, e !== null && (e.flags |= 32), cn;
  }
  function tn(e, n, i) {
    (e === tt && (Ie === 2 || Ie === 9) || e.cancelPendingCommit !== null) && (wl(e, 0), Ka(
      e,
      Be,
      cn,
      !1
    )), Pn(e, i), ((Fe & 2) === 0 || e !== tt) && (e === tt && ((Fe & 2) === 0 && (_i |= i), pt === 4 && Ka(
      e,
      Be,
      cn,
      !1
    )), In(e));
  }
  function Ty(e, n, i) {
    if ((Fe & 6) !== 0) throw Error(s(327));
    var r = !i && (n & 127) === 0 && (n & e.expiredLanes) === 0 || Na(e, n), u = r ? hE(e, n) : hf(e, n, !0), d = r;
    do {
      if (u === 0) {
        Sl && !r && Ka(e, n, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, d && !fE(i)) {
          u = hf(e, n, !1), d = !1;
          continue;
        }
        if (u === 2) {
          if (d = n, e.errorRecoveryDisabledLanes & d)
            var v = 0;
          else
            v = e.pendingLanes & -536870913, v = v !== 0 ? v : v & 536870912 ? 536870912 : 0;
          if (v !== 0) {
            n = v;
            e: {
              var T = e;
              u = Rr;
              var A = T.current.memoizedState.isDehydrated;
              if (A && (wl(T, v).flags |= 256), v = hf(
                T,
                v,
                !1
              ), v !== 2) {
                if (rf && !A) {
                  T.errorRecoveryDisabledLanes |= d, _i |= d, u = 4;
                  break e;
                }
                d = en, en = u, d !== null && (en === null ? en = d : en.push.apply(
                  en,
                  d
                ));
              }
              u = v;
            }
            if (d = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          wl(e, 0), Ka(e, n, 0, !0);
          break;
        }
        e: {
          switch (r = e, d = u, d) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              Ka(
                r,
                n,
                cn,
                !Ga
              );
              break e;
            case 2:
              en = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((n & 62914560) === n && (u = oo + 300 - Ft(), 10 < u)) {
            if (Ka(
              r,
              n,
              cn,
              !Ga
            ), Ii(r, 0, !0) !== 0) break e;
            Sa = n, r.timeoutHandle = eg(
              wy.bind(
                null,
                r,
                i,
                en,
                co,
                of,
                n,
                cn,
                _i,
                El,
                Ga,
                d,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          wy(
            r,
            i,
            en,
            co,
            of,
            n,
            cn,
            _i,
            El,
            Ga,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    In(e);
  }
  function wy(e, n, i, r, u, d, v, T, A, P, Q, W, F, $) {
    if (e.timeoutHandle = -1, W = n.subtreeFlags, W & 8192 || (W & 16785408) === 16785408) {
      W = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ra
      }, yy(
        n,
        d,
        W
      );
      var pe = (d & 62914560) === d ? oo - Ft() : (d & 4194048) === d ? xy - Ft() : 0;
      if (pe = KE(
        W,
        pe
      ), pe !== null) {
        Sa = d, e.cancelPendingCommit = pe(
          zy.bind(
            null,
            e,
            n,
            d,
            i,
            r,
            u,
            v,
            T,
            A,
            Q,
            W,
            null,
            F,
            $
          )
        ), Ka(e, d, v, !P);
        return;
      }
    }
    zy(
      e,
      n,
      d,
      i,
      r,
      u,
      v,
      T,
      A
    );
  }
  function fE(e) {
    for (var n = e; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var r = 0; r < i.length; r++) {
          var u = i[r], d = u.getSnapshot;
          u = u.value;
          try {
            if (!ln(d(), u)) return !1;
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
  function Ka(e, n, i, r) {
    n &= ~sf, n &= ~_i, e.suspendedLanes |= n, e.pingedLanes &= ~n, r && (e.warmLanes |= n), r = e.expirationTimes;
    for (var u = n; 0 < u; ) {
      var d = 31 - kt(u), v = 1 << d;
      r[d] = -1, u &= ~v;
    }
    i !== 0 && xs(e, i, n);
  }
  function fo() {
    return (Fe & 6) === 0 ? (Mr(0), !1) : !0;
  }
  function df() {
    if (Ue !== null) {
      if (Ie === 0)
        var e = Ue.return;
      else
        e = Ue, ca = wi = null, Mc(e), ml = null, ur = 0, e = Ue;
      for (; e !== null; )
        ty(e.alternate, e), e = e.return;
      Ue = null;
    }
  }
  function wl(e, n) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, NE(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), Sa = 0, df(), tt = e, Ue = i = oa(e.current, null), Be = n, Ie = 0, un = null, Ga = !1, Sl = Na(e, n), rf = !1, El = cn = sf = _i = $a = pt = 0, en = Rr = null, of = !1, (n & 8) !== 0 && (n |= n & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= n; 0 < r; ) {
        var u = 31 - kt(r), d = 1 << u;
        n |= e[u], r &= ~d;
      }
    return xa = n, zs(), i;
  }
  function Ry(e, n) {
    Ae = null, U.H = gr, n === hl || n === ks ? (n = qm(), Ie = 3) : n === pc ? (n = qm(), Ie = 4) : Ie = n === Yc ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, un = n, Ue === null && (pt = 1, eo(
      e,
      gn(n, e.current)
    ));
  }
  function Cy() {
    var e = sn.current;
    return e === null ? !0 : (Be & 4194048) === Be ? Sn === null : (Be & 62914560) === Be || (Be & 536870912) !== 0 ? e === Sn : !1;
  }
  function My() {
    var e = U.H;
    return U.H = gr, e === null ? gr : e;
  }
  function Ay() {
    var e = U.A;
    return U.A = uE, e;
  }
  function ho() {
    pt = 4, Ga || (Be & 4194048) !== Be && sn.current !== null || (Sl = !0), ($a & 134217727) === 0 && (_i & 134217727) === 0 || tt === null || Ka(
      tt,
      Be,
      cn,
      !1
    );
  }
  function hf(e, n, i) {
    var r = Fe;
    Fe |= 2;
    var u = My(), d = Ay();
    (tt !== e || Be !== n) && (co = null, wl(e, n)), n = !1;
    var v = pt;
    e: do
      try {
        if (Ie !== 0 && Ue !== null) {
          var T = Ue, A = un;
          switch (Ie) {
            case 8:
              df(), v = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              sn.current === null && (n = !0);
              var P = Ie;
              if (Ie = 0, un = null, Rl(e, T, A, P), i && Sl) {
                v = 0;
                break e;
              }
              break;
            default:
              P = Ie, Ie = 0, un = null, Rl(e, T, A, P);
          }
        }
        dE(), v = pt;
        break;
      } catch (Q) {
        Ry(e, Q);
      }
    while (!0);
    return n && e.shellSuspendCounter++, ca = wi = null, Fe = r, U.H = u, U.A = d, Ue === null && (tt = null, Be = 0, zs()), v;
  }
  function dE() {
    for (; Ue !== null; ) jy(Ue);
  }
  function hE(e, n) {
    var i = Fe;
    Fe |= 2;
    var r = My(), u = Ay();
    tt !== e || Be !== n ? (co = null, uo = Ft() + 500, wl(e, n)) : Sl = Na(
      e,
      n
    );
    e: do
      try {
        if (Ie !== 0 && Ue !== null) {
          n = Ue;
          var d = un;
          t: switch (Ie) {
            case 1:
              Ie = 0, un = null, Rl(e, n, d, 1);
              break;
            case 2:
            case 9:
              if (Hm(d)) {
                Ie = 0, un = null, Dy(n);
                break;
              }
              n = function() {
                Ie !== 2 && Ie !== 9 || tt !== e || (Ie = 7), In(e);
              }, d.then(n, n);
              break e;
            case 3:
              Ie = 7;
              break e;
            case 4:
              Ie = 5;
              break e;
            case 7:
              Hm(d) ? (Ie = 0, un = null, Dy(n)) : (Ie = 0, un = null, Rl(e, n, d, 7));
              break;
            case 5:
              var v = null;
              switch (Ue.tag) {
                case 26:
                  v = Ue.memoizedState;
                case 5:
                case 27:
                  var T = Ue;
                  if (v ? pg(v) : T.stateNode.complete) {
                    Ie = 0, un = null;
                    var A = T.sibling;
                    if (A !== null) Ue = A;
                    else {
                      var P = T.return;
                      P !== null ? (Ue = P, mo(P)) : Ue = null;
                    }
                    break t;
                  }
              }
              Ie = 0, un = null, Rl(e, n, d, 5);
              break;
            case 6:
              Ie = 0, un = null, Rl(e, n, d, 6);
              break;
            case 8:
              df(), pt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        mE();
        break;
      } catch (Q) {
        Ry(e, Q);
      }
    while (!0);
    return ca = wi = null, U.H = r, U.A = u, Fe = i, Ue !== null ? 0 : (tt = null, Be = 0, zs(), pt);
  }
  function mE() {
    for (; Ue !== null && !ju(); )
      jy(Ue);
  }
  function jy(e) {
    var n = Wp(e.alternate, e, xa);
    e.memoizedProps = e.pendingProps, n === null ? mo(e) : Ue = n;
  }
  function Dy(e) {
    var n = e, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Xp(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Be
        );
        break;
      case 11:
        n = Xp(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Be
        );
        break;
      case 5:
        Mc(n);
      default:
        ty(i, n), n = Ue = Am(n, xa), n = Wp(i, n, xa);
    }
    e.memoizedProps = e.pendingProps, n === null ? mo(e) : Ue = n;
  }
  function Rl(e, n, i, r) {
    ca = wi = null, Mc(n), ml = null, ur = 0;
    var u = n.return;
    try {
      if (nE(
        e,
        u,
        n,
        i,
        Be
      )) {
        pt = 1, eo(
          e,
          gn(i, e.current)
        ), Ue = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Ue = u, d;
      pt = 1, eo(
        e,
        gn(i, e.current)
      ), Ue = null;
      return;
    }
    n.flags & 32768 ? (ke || r === 1 ? e = !0 : Sl || (Be & 536870912) !== 0 ? e = !1 : (Ga = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = sn.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Ny(n, e)) : mo(n);
  }
  function mo(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        Ny(
          n,
          Ga
        );
        return;
      }
      e = n.return;
      var i = lE(
        n.alternate,
        n,
        xa
      );
      if (i !== null) {
        Ue = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Ue = n;
        return;
      }
      Ue = n = e;
    } while (n !== null);
    pt === 0 && (pt = 5);
  }
  function Ny(e, n) {
    do {
      var i = rE(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Ue = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (e = e.sibling, e !== null)) {
        Ue = e;
        return;
      }
      Ue = e = i;
    } while (e !== null);
    pt = 6, Ue = null;
  }
  function zy(e, n, i, r, u, d, v, T, A) {
    e.cancelPendingCommit = null;
    do
      po();
    while (At !== 0);
    if ((Fe & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === e.current) throw Error(s(177));
      if (d = n.lanes | n.childLanes, d |= ec, bs(
        e,
        i,
        d,
        v,
        T,
        A
      ), e === tt && (Ue = tt = null, Be = 0), Tl = n, Ia = e, Sa = i, uf = d, cf = u, Sy = r, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, vE(Da, function() {
        return Vy(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || r) {
        r = U.T, U.T = null, u = H.p, H.p = 2, v = Fe, Fe |= 4;
        try {
          sE(e, n, i);
        } finally {
          Fe = v, H.p = u, U.T = r;
        }
      }
      At = 1, _y(), Oy(), Ly();
    }
  }
  function _y() {
    if (At === 1) {
      At = 0;
      var e = Ia, n = Tl, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = U.T, U.T = null;
        var r = H.p;
        H.p = 2;
        var u = Fe;
        Fe |= 4;
        try {
          hy(n, e);
          var d = Rf, v = bm(e.containerInfo), T = d.focusedElem, A = d.selectionRange;
          if (v !== T && T && T.ownerDocument && vm(
            T.ownerDocument.documentElement,
            T
          )) {
            if (A !== null && Ku(T)) {
              var P = A.start, Q = A.end;
              if (Q === void 0 && (Q = P), "selectionStart" in T)
                T.selectionStart = P, T.selectionEnd = Math.min(
                  Q,
                  T.value.length
                );
              else {
                var W = T.ownerDocument || document, F = W && W.defaultView || window;
                if (F.getSelection) {
                  var $ = F.getSelection(), pe = T.textContent.length, Ce = Math.min(A.start, pe), We = A.end === void 0 ? Ce : Math.min(A.end, pe);
                  !$.extend && Ce > We && (v = We, We = Ce, Ce = v);
                  var V = gm(
                    T,
                    Ce
                  ), N = gm(
                    T,
                    We
                  );
                  if (V && N && ($.rangeCount !== 1 || $.anchorNode !== V.node || $.anchorOffset !== V.offset || $.focusNode !== N.node || $.focusOffset !== N.offset)) {
                    var q = W.createRange();
                    q.setStart(V.node, V.offset), $.removeAllRanges(), Ce > We ? ($.addRange(q), $.extend(N.node, N.offset)) : (q.setEnd(N.node, N.offset), $.addRange(q));
                  }
                }
              }
            }
            for (W = [], $ = T; $ = $.parentNode; )
              $.nodeType === 1 && W.push({
                element: $,
                left: $.scrollLeft,
                top: $.scrollTop
              });
            for (typeof T.focus == "function" && T.focus(), T = 0; T < W.length; T++) {
              var Z = W[T];
              Z.element.scrollLeft = Z.left, Z.element.scrollTop = Z.top;
            }
          }
          Mo = !!wf, Rf = wf = null;
        } finally {
          Fe = u, H.p = r, U.T = i;
        }
      }
      e.current = n, At = 2;
    }
  }
  function Oy() {
    if (At === 2) {
      At = 0;
      var e = Ia, n = Tl, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = U.T, U.T = null;
        var r = H.p;
        H.p = 2;
        var u = Fe;
        Fe |= 4;
        try {
          oy(e, n.alternate, n);
        } finally {
          Fe = u, H.p = r, U.T = i;
        }
      }
      At = 3;
    }
  }
  function Ly() {
    if (At === 4 || At === 3) {
      At = 0, Du();
      var e = Ia, n = Tl, i = Sa, r = Sy;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? At = 5 : (At = 0, Tl = Ia = null, Uy(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (Xa = null), Y(i), n = n.stateNode, Gt && typeof Gt.onCommitFiberRoot == "function")
        try {
          Gt.onCommitFiberRoot(
            ia,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        n = U.T, u = H.p, H.p = 2, U.T = null;
        try {
          for (var d = e.onRecoverableError, v = 0; v < r.length; v++) {
            var T = r[v];
            d(T.value, {
              componentStack: T.stack
            });
          }
        } finally {
          U.T = n, H.p = u;
        }
      }
      (Sa & 3) !== 0 && po(), In(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === ff ? Cr++ : (Cr = 0, ff = e) : Cr = 0, Mr(0);
    }
  }
  function Uy(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, sr(n)));
  }
  function po() {
    return _y(), Oy(), Ly(), Vy();
  }
  function Vy() {
    if (At !== 5) return !1;
    var e = Ia, n = uf;
    uf = 0;
    var i = Y(Sa), r = U.T, u = H.p;
    try {
      H.p = 32 > i ? 32 : i, U.T = null, i = cf, cf = null;
      var d = Ia, v = Sa;
      if (At = 0, Tl = Ia = null, Sa = 0, (Fe & 6) !== 0) throw Error(s(331));
      var T = Fe;
      if (Fe |= 4, vy(d.current), py(
        d,
        d.current,
        v,
        i
      ), Fe = T, Mr(0, !1), Gt && typeof Gt.onPostCommitFiberRoot == "function")
        try {
          Gt.onPostCommitFiberRoot(ia, d);
        } catch {
        }
      return !0;
    } finally {
      H.p = u, U.T = r, Uy(e, n);
    }
  }
  function By(e, n, i) {
    n = gn(i, n), n = Pc(e.stateNode, n, 2), e = qa(e, n, 2), e !== null && (Pn(e, 2), In(e));
  }
  function Ke(e, n, i) {
    if (e.tag === 3)
      By(e, e, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          By(
            n,
            e,
            i
          );
          break;
        } else if (n.tag === 1) {
          var r = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Xa === null || !Xa.has(r))) {
            e = gn(i, e), i = Hp(2), r = qa(n, i, 2), r !== null && (kp(
              i,
              r,
              n,
              e
            ), Pn(r, 2), In(r));
            break;
          }
        }
        n = n.return;
      }
  }
  function mf(e, n, i) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new cE();
      var u = /* @__PURE__ */ new Set();
      r.set(n, u);
    } else
      u = r.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), r.set(n, u));
    u.has(i) || (rf = !0, u.add(i), e = pE.bind(null, e, n, i), n.then(e, e));
  }
  function pE(e, n, i) {
    var r = e.pingCache;
    r !== null && r.delete(n), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, tt === e && (Be & i) === i && (pt === 4 || pt === 3 && (Be & 62914560) === Be && 300 > Ft() - oo ? (Fe & 2) === 0 && wl(e, 0) : sf |= i, El === Be && (El = 0)), In(e);
  }
  function Hy(e, n) {
    n === 0 && (n = Kl()), e = Si(e, n), e !== null && (Pn(e, n), In(e));
  }
  function yE(e) {
    var n = e.memoizedState, i = 0;
    n !== null && (i = n.retryLane), Hy(e, i);
  }
  function gE(e, n) {
    var i = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var r = e.stateNode, u = e.memoizedState;
        u !== null && (i = u.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      case 22:
        r = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    r !== null && r.delete(n), Hy(e, i);
  }
  function vE(e, n) {
    return ut(e, n);
  }
  var yo = null, Cl = null, pf = !1, go = !1, yf = !1, Qa = 0;
  function In(e) {
    e !== Cl && e.next === null && (Cl === null ? yo = Cl = e : Cl = Cl.next = e), go = !0, pf || (pf = !0, xE());
  }
  function Mr(e, n) {
    if (!yf && go) {
      yf = !0;
      do
        for (var i = !1, r = yo; r !== null; ) {
          if (e !== 0) {
            var u = r.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var v = r.suspendedLanes, T = r.pingedLanes;
              d = (1 << 31 - kt(42 | e) + 1) - 1, d &= u & ~(v & ~T), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, Yy(r, d));
          } else
            d = Be, d = Ii(
              r,
              r === tt ? d : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (d & 3) === 0 || Na(r, d) || (i = !0, Yy(r, d));
          r = r.next;
        }
      while (i);
      yf = !1;
    }
  }
  function bE() {
    ky();
  }
  function ky() {
    go = pf = !1;
    var e = 0;
    Qa !== 0 && DE() && (e = Qa);
    for (var n = Ft(), i = null, r = yo; r !== null; ) {
      var u = r.next, d = qy(r, n);
      d === 0 ? (r.next = null, i === null ? yo = u : i.next = u, u === null && (Cl = i)) : (i = r, (e !== 0 || (d & 3) !== 0) && (go = !0)), r = u;
    }
    At !== 0 && At !== 5 || Mr(e), Qa !== 0 && (Qa = 0);
  }
  function qy(e, n) {
    for (var i = e.suspendedLanes, r = e.pingedLanes, u = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var v = 31 - kt(d), T = 1 << v, A = u[v];
      A === -1 ? ((T & i) === 0 || (T & r) !== 0) && (u[v] = _u(T, n)) : A <= n && (e.expiredLanes |= T), d &= ~T;
    }
    if (n = tt, i = Be, i = Ii(
      e,
      e === n ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, i === 0 || e === n && (Ie === 2 || Ie === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && na(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || Na(e, i)) {
      if (n = i & -i, n === e.callbackPriority) return n;
      switch (r !== null && na(r), Y(i)) {
        case 2:
        case 8:
          i = Il;
          break;
        case 32:
          i = Da;
          break;
        case 268435456:
          i = mn;
          break;
        default:
          i = Da;
      }
      return r = Py.bind(null, e), i = ut(i, r), e.callbackPriority = n, e.callbackNode = i, n;
    }
    return r !== null && r !== null && na(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Py(e, n) {
    if (At !== 0 && At !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (po() && e.callbackNode !== i)
      return null;
    var r = Be;
    return r = Ii(
      e,
      e === tt ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (Ty(e, r, n), qy(e, Ft()), e.callbackNode != null && e.callbackNode === i ? Py.bind(null, e) : null);
  }
  function Yy(e, n) {
    if (po()) return null;
    Ty(e, n, !0);
  }
  function xE() {
    zE(function() {
      (Fe & 6) !== 0 ? ut(
        ja,
        bE
      ) : ky();
    });
  }
  function gf() {
    if (Qa === 0) {
      var e = fl;
      e === 0 && (e = mi, mi <<= 1, (mi & 261888) === 0 && (mi = 256)), Qa = e;
    }
    return Qa;
  }
  function Fy(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ws("" + e);
  }
  function Gy(e, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, e.id && i.setAttribute("form", e.id), n.parentNode.insertBefore(i, n), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function SE(e, n, i, r, u) {
    if (n === "submit" && i && i.stateNode === u) {
      var d = Fy(
        (u[he] || null).action
      ), v = r.submitter;
      v && (n = (n = v[he] || null) ? Fy(n.formAction) : v.getAttribute("formAction"), n !== null && (d = n, v = null));
      var T = new As(
        "action",
        "action",
        null,
        r,
        u
      );
      e.push({
        event: T,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (r.defaultPrevented) {
                if (Qa !== 0) {
                  var A = v ? Gy(u, v) : new FormData(u);
                  Uc(
                    i,
                    {
                      pending: !0,
                      data: A,
                      method: u.method,
                      action: d
                    },
                    null,
                    A
                  );
                }
              } else
                typeof d == "function" && (T.preventDefault(), A = v ? Gy(u, v) : new FormData(u), Uc(
                  i,
                  {
                    pending: !0,
                    data: A,
                    method: u.method,
                    action: d
                  },
                  d,
                  A
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var vf = 0; vf < Wu.length; vf++) {
    var bf = Wu[vf], EE = bf.toLowerCase(), TE = bf[0].toUpperCase() + bf.slice(1);
    On(
      EE,
      "on" + TE
    );
  }
  On(Em, "onAnimationEnd"), On(Tm, "onAnimationIteration"), On(wm, "onAnimationStart"), On("dblclick", "onDoubleClick"), On("focusin", "onFocus"), On("focusout", "onBlur"), On(H1, "onTransitionRun"), On(k1, "onTransitionStart"), On(q1, "onTransitionCancel"), On(Rm, "onTransitionEnd"), Yn("onMouseEnter", ["mouseout", "mouseover"]), Yn("onMouseLeave", ["mouseout", "mouseover"]), Yn("onPointerEnter", ["pointerout", "pointerover"]), Yn("onPointerLeave", ["pointerout", "pointerover"]), Nt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Nt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Nt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Nt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Nt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Nt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ar = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), wE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ar)
  );
  function $y(e, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var r = e[i], u = r.event;
      r = r.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var v = r.length - 1; 0 <= v; v--) {
            var T = r[v], A = T.instance, P = T.currentTarget;
            if (T = T.listener, A !== d && u.isPropagationStopped())
              break e;
            d = T, u.currentTarget = P;
            try {
              d(u);
            } catch (Q) {
              Ns(Q);
            }
            u.currentTarget = null, d = A;
          }
        else
          for (v = 0; v < r.length; v++) {
            if (T = r[v], A = T.instance, P = T.currentTarget, T = T.listener, A !== d && u.isPropagationStopped())
              break e;
            d = T, u.currentTarget = P;
            try {
              d(u);
            } catch (Q) {
              Ns(Q);
            }
            u.currentTarget = null, d = A;
          }
      }
    }
  }
  function Ve(e, n) {
    var i = n[me];
    i === void 0 && (i = n[me] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    i.has(r) || (Xy(n, e, 2, !1), i.add(r));
  }
  function xf(e, n, i) {
    var r = 0;
    n && (r |= 4), Xy(
      i,
      e,
      r,
      n
    );
  }
  var vo = "_reactListening" + Math.random().toString(36).slice(2);
  function Sf(e) {
    if (!e[vo]) {
      e[vo] = !0, _a.forEach(function(i) {
        i !== "selectionchange" && (wE.has(i) || xf(i, !1, e), xf(i, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[vo] || (n[vo] = !0, xf("selectionchange", !1, n));
    }
  }
  function Xy(e, n, i, r) {
    switch (Eg(n)) {
      case 2:
        var u = JE;
        break;
      case 8:
        u = WE;
        break;
      default:
        u = Uf;
    }
    i = u.bind(
      null,
      n,
      i,
      e
    ), u = void 0, !ku || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), r ? u !== void 0 ? e.addEventListener(n, i, {
      capture: !0,
      passive: u
    }) : e.addEventListener(n, i, !0) : u !== void 0 ? e.addEventListener(n, i, {
      passive: u
    }) : e.addEventListener(n, i, !1);
  }
  function Ef(e, n, i, r, u) {
    var d = r;
    if ((n & 1) === 0 && (n & 2) === 0 && r !== null)
      e: for (; ; ) {
        if (r === null) return;
        var v = r.tag;
        if (v === 3 || v === 4) {
          var T = r.stateNode.containerInfo;
          if (T === u) break;
          if (v === 4)
            for (v = r.return; v !== null; ) {
              var A = v.tag;
              if ((A === 3 || A === 4) && v.stateNode.containerInfo === u)
                return;
              v = v.return;
            }
          for (; T !== null; ) {
            if (v = Qe(T), v === null) return;
            if (A = v.tag, A === 5 || A === 6 || A === 26 || A === 27) {
              r = d = v;
              continue e;
            }
            T = T.parentNode;
          }
        }
        r = r.return;
      }
    Jh(function() {
      var P = d, Q = Bu(i), W = [];
      e: {
        var F = Cm.get(e);
        if (F !== void 0) {
          var $ = As, pe = e;
          switch (e) {
            case "keypress":
              if (Cs(i) === 0) break e;
            case "keydown":
            case "keyup":
              $ = g1;
              break;
            case "focusin":
              pe = "focus", $ = Fu;
              break;
            case "focusout":
              pe = "blur", $ = Fu;
              break;
            case "beforeblur":
            case "afterblur":
              $ = Fu;
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
              $ = tm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              $ = l1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              $ = x1;
              break;
            case Em:
            case Tm:
            case wm:
              $ = o1;
              break;
            case Rm:
              $ = E1;
              break;
            case "scroll":
            case "scrollend":
              $ = a1;
              break;
            case "wheel":
              $ = w1;
              break;
            case "copy":
            case "cut":
            case "paste":
              $ = c1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              $ = am;
              break;
            case "toggle":
            case "beforetoggle":
              $ = C1;
          }
          var Ce = (n & 4) !== 0, We = !Ce && (e === "scroll" || e === "scrollend"), V = Ce ? F !== null ? F + "Capture" : null : F;
          Ce = [];
          for (var N = P, q; N !== null; ) {
            var Z = N;
            if (q = Z.stateNode, Z = Z.tag, Z !== 5 && Z !== 26 && Z !== 27 || q === null || V === null || (Z = Ql(N, V), Z != null && Ce.push(
              jr(N, Z, q)
            )), We) break;
            N = N.return;
          }
          0 < Ce.length && (F = new $(
            F,
            pe,
            null,
            i,
            Q
          ), W.push({ event: F, listeners: Ce }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (F = e === "mouseover" || e === "pointerover", $ = e === "mouseout" || e === "pointerout", F && i !== Vu && (pe = i.relatedTarget || i.fromElement) && (Qe(pe) || pe[ve]))
            break e;
          if (($ || F) && (F = Q.window === Q ? Q : (F = Q.ownerDocument) ? F.defaultView || F.parentWindow : window, $ ? (pe = i.relatedTarget || i.toElement, $ = P, pe = pe ? Qe(pe) : null, pe !== null && (We = c(pe), Ce = pe.tag, pe !== We || Ce !== 5 && Ce !== 27 && Ce !== 6) && (pe = null)) : ($ = null, pe = P), $ !== pe)) {
            if (Ce = tm, Z = "onMouseLeave", V = "onMouseEnter", N = "mouse", (e === "pointerout" || e === "pointerover") && (Ce = am, Z = "onPointerLeave", V = "onPointerEnter", N = "pointer"), We = $ == null ? F : Le($), q = pe == null ? F : Le(pe), F = new Ce(
              Z,
              N + "leave",
              $,
              i,
              Q
            ), F.target = We, F.relatedTarget = q, Z = null, Qe(Q) === P && (Ce = new Ce(
              V,
              N + "enter",
              pe,
              i,
              Q
            ), Ce.target = q, Ce.relatedTarget = We, Z = Ce), We = Z, $ && pe)
              t: {
                for (Ce = RE, V = $, N = pe, q = 0, Z = V; Z; Z = Ce(Z))
                  q++;
                Z = 0;
                for (var Te = N; Te; Te = Ce(Te))
                  Z++;
                for (; 0 < q - Z; )
                  V = Ce(V), q--;
                for (; 0 < Z - q; )
                  N = Ce(N), Z--;
                for (; q--; ) {
                  if (V === N || N !== null && V === N.alternate) {
                    Ce = V;
                    break t;
                  }
                  V = Ce(V), N = Ce(N);
                }
                Ce = null;
              }
            else Ce = null;
            $ !== null && Iy(
              W,
              F,
              $,
              Ce,
              !1
            ), pe !== null && We !== null && Iy(
              W,
              We,
              pe,
              Ce,
              !0
            );
          }
        }
        e: {
          if (F = P ? Le(P) : window, $ = F.nodeName && F.nodeName.toLowerCase(), $ === "select" || $ === "input" && F.type === "file")
            var Pe = fm;
          else if (um(F))
            if (dm)
              Pe = U1;
            else {
              Pe = O1;
              var be = _1;
            }
          else
            $ = F.nodeName, !$ || $.toLowerCase() !== "input" || F.type !== "checkbox" && F.type !== "radio" ? P && Uu(P.elementType) && (Pe = fm) : Pe = L1;
          if (Pe && (Pe = Pe(e, P))) {
            cm(
              W,
              Pe,
              i,
              Q
            );
            break e;
          }
          be && be(e, F, P), e === "focusout" && P && F.type === "number" && P.memoizedProps.value != null && Lu(F, "number", F.value);
        }
        switch (be = P ? Le(P) : window, e) {
          case "focusin":
            (um(be) || be.contentEditable === "true") && (al = be, Qu = P, ir = null);
            break;
          case "focusout":
            ir = Qu = al = null;
            break;
          case "mousedown":
            Zu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Zu = !1, xm(W, i, Q);
            break;
          case "selectionchange":
            if (B1) break;
          case "keydown":
          case "keyup":
            xm(W, i, Q);
        }
        var je;
        if ($u)
          e: {
            switch (e) {
              case "compositionstart":
                var He = "onCompositionStart";
                break e;
              case "compositionend":
                He = "onCompositionEnd";
                break e;
              case "compositionupdate":
                He = "onCompositionUpdate";
                break e;
            }
            He = void 0;
          }
        else
          nl ? sm(e, i) && (He = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (He = "onCompositionStart");
        He && (im && i.locale !== "ko" && (nl || He !== "onCompositionStart" ? He === "onCompositionEnd" && nl && (je = Wh()) : (Oa = Q, qu = "value" in Oa ? Oa.value : Oa.textContent, nl = !0)), be = bo(P, He), 0 < be.length && (He = new nm(
          He,
          e,
          null,
          i,
          Q
        ), W.push({ event: He, listeners: be }), je ? He.data = je : (je = om(i), je !== null && (He.data = je)))), (je = A1 ? j1(e, i) : D1(e, i)) && (He = bo(P, "onBeforeInput"), 0 < He.length && (be = new nm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          Q
        ), W.push({
          event: be,
          listeners: He
        }), be.data = je)), SE(
          W,
          e,
          P,
          i,
          Q
        );
      }
      $y(W, n);
    });
  }
  function jr(e, n, i) {
    return {
      instance: e,
      listener: n,
      currentTarget: i
    };
  }
  function bo(e, n) {
    for (var i = n + "Capture", r = []; e !== null; ) {
      var u = e, d = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || d === null || (u = Ql(e, i), u != null && r.unshift(
        jr(e, u, d)
      ), u = Ql(e, n), u != null && r.push(
        jr(e, u, d)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function RE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Iy(e, n, i, r, u) {
    for (var d = n._reactName, v = []; i !== null && i !== r; ) {
      var T = i, A = T.alternate, P = T.stateNode;
      if (T = T.tag, A !== null && A === r) break;
      T !== 5 && T !== 26 && T !== 27 || P === null || (A = P, u ? (P = Ql(i, d), P != null && v.unshift(
        jr(i, P, A)
      )) : u || (P = Ql(i, d), P != null && v.push(
        jr(i, P, A)
      ))), i = i.return;
    }
    v.length !== 0 && e.push({ event: n, listeners: v });
  }
  var CE = /\r\n?/g, ME = /\u0000|\uFFFD/g;
  function Ky(e) {
    return (typeof e == "string" ? e : "" + e).replace(CE, `
`).replace(ME, "");
  }
  function Qy(e, n) {
    return n = Ky(n), Ky(e) === n;
  }
  function Je(e, n, i, r, u, d) {
    switch (i) {
      case "children":
        typeof r == "string" ? n === "body" || n === "textarea" && r === "" || Wi(e, r) : (typeof r == "number" || typeof r == "bigint") && n !== "body" && Wi(e, "" + r);
        break;
      case "className":
        gt(e, "class", r);
        break;
      case "tabIndex":
        gt(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        gt(e, i, r);
        break;
      case "style":
        Qh(e, r, d);
        break;
      case "data":
        if (n !== "object") {
          gt(e, "data", r);
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
        r = ws("" + r), e.setAttribute(i, r);
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
          typeof d == "function" && (i === "formAction" ? (n !== "input" && Je(e, n, "name", u.name, u, null), Je(
            e,
            n,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Je(
            e,
            n,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Je(
            e,
            n,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Je(e, n, "encType", u.encType, u, null), Je(e, n, "method", u.method, u, null), Je(e, n, "target", u.target, u, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(i);
          break;
        }
        r = ws("" + r), e.setAttribute(i, r);
        break;
      case "onClick":
        r != null && (e.onclick = ra);
        break;
      case "onScroll":
        r != null && Ve("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Ve("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(s(61));
          if (i = r.__html, i != null) {
            if (u.children != null) throw Error(s(60));
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
        i = ws("" + r), e.setAttributeNS(
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
        Ve("beforetoggle", e), Ve("toggle", e), ze(e, "popover", r);
        break;
      case "xlinkActuate":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        qt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        qt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        qt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          r
        );
        break;
      case "is":
        ze(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = t1.get(i) || i, ze(e, i, r));
    }
  }
  function Tf(e, n, i, r, u, d) {
    switch (i) {
      case "style":
        Qh(e, r, d);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(s(61));
          if (i = r.__html, i != null) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof r == "string" ? Wi(e, r) : (typeof r == "number" || typeof r == "bigint") && Wi(e, "" + r);
        break;
      case "onScroll":
        r != null && Ve("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Ve("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = ra);
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
        if (!_n.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), n = i.slice(2, u ? i.length - 7 : void 0), d = e[he] || null, d = d != null ? d[i] : null, typeof d == "function" && e.removeEventListener(n, d, u), typeof r == "function")) {
              typeof d != "function" && d !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(n, r, u);
              break e;
            }
            i in e ? e[i] = r : r === !0 ? e.setAttribute(i, "") : ze(e, i, r);
          }
    }
  }
  function Ut(e, n, i) {
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
        Ve("error", e), Ve("load", e);
        var r = !1, u = !1, d;
        for (d in i)
          if (i.hasOwnProperty(d)) {
            var v = i[d];
            if (v != null)
              switch (d) {
                case "src":
                  r = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, n));
                default:
                  Je(e, n, d, v, i, null);
              }
          }
        u && Je(e, n, "srcSet", i.srcSet, i, null), r && Je(e, n, "src", i.src, i, null);
        return;
      case "input":
        Ve("invalid", e);
        var T = d = v = u = null, A = null, P = null;
        for (r in i)
          if (i.hasOwnProperty(r)) {
            var Q = i[r];
            if (Q != null)
              switch (r) {
                case "name":
                  u = Q;
                  break;
                case "type":
                  v = Q;
                  break;
                case "checked":
                  A = Q;
                  break;
                case "defaultChecked":
                  P = Q;
                  break;
                case "value":
                  d = Q;
                  break;
                case "defaultValue":
                  T = Q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Q != null)
                    throw Error(s(137, n));
                  break;
                default:
                  Je(e, n, r, Q, i, null);
              }
          }
        $h(
          e,
          d,
          T,
          A,
          P,
          v,
          u,
          !1
        );
        return;
      case "select":
        Ve("invalid", e), r = v = d = null;
        for (u in i)
          if (i.hasOwnProperty(u) && (T = i[u], T != null))
            switch (u) {
              case "value":
                d = T;
                break;
              case "defaultValue":
                v = T;
                break;
              case "multiple":
                r = T;
              default:
                Je(e, n, u, T, i, null);
            }
        n = d, i = v, e.multiple = !!r, n != null ? Ji(e, !!r, n, !1) : i != null && Ji(e, !!r, i, !0);
        return;
      case "textarea":
        Ve("invalid", e), d = u = r = null;
        for (v in i)
          if (i.hasOwnProperty(v) && (T = i[v], T != null))
            switch (v) {
              case "value":
                r = T;
                break;
              case "defaultValue":
                u = T;
                break;
              case "children":
                d = T;
                break;
              case "dangerouslySetInnerHTML":
                if (T != null) throw Error(s(91));
                break;
              default:
                Je(e, n, v, T, i, null);
            }
        Ih(e, r, u, d);
        return;
      case "option":
        for (A in i)
          if (i.hasOwnProperty(A) && (r = i[A], r != null))
            switch (A) {
              case "selected":
                e.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                Je(e, n, A, r, i, null);
            }
        return;
      case "dialog":
        Ve("beforetoggle", e), Ve("toggle", e), Ve("cancel", e), Ve("close", e);
        break;
      case "iframe":
      case "object":
        Ve("load", e);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Ar.length; r++)
          Ve(Ar[r], e);
        break;
      case "image":
        Ve("error", e), Ve("load", e);
        break;
      case "details":
        Ve("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ve("error", e), Ve("load", e);
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
        for (P in i)
          if (i.hasOwnProperty(P) && (r = i[P], r != null))
            switch (P) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, n));
              default:
                Je(e, n, P, r, i, null);
            }
        return;
      default:
        if (Uu(n)) {
          for (Q in i)
            i.hasOwnProperty(Q) && (r = i[Q], r !== void 0 && Tf(
              e,
              n,
              Q,
              r,
              i,
              void 0
            ));
          return;
        }
    }
    for (T in i)
      i.hasOwnProperty(T) && (r = i[T], r != null && Je(e, n, T, r, i, null));
  }
  function AE(e, n, i, r) {
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
        var u = null, d = null, v = null, T = null, A = null, P = null, Q = null;
        for ($ in i) {
          var W = i[$];
          if (i.hasOwnProperty($) && W != null)
            switch ($) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                A = W;
              default:
                r.hasOwnProperty($) || Je(e, n, $, null, r, W);
            }
        }
        for (var F in r) {
          var $ = r[F];
          if (W = i[F], r.hasOwnProperty(F) && ($ != null || W != null))
            switch (F) {
              case "type":
                d = $;
                break;
              case "name":
                u = $;
                break;
              case "checked":
                P = $;
                break;
              case "defaultChecked":
                Q = $;
                break;
              case "value":
                v = $;
                break;
              case "defaultValue":
                T = $;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if ($ != null)
                  throw Error(s(137, n));
                break;
              default:
                $ !== W && Je(
                  e,
                  n,
                  F,
                  $,
                  r,
                  W
                );
            }
        }
        Ou(
          e,
          v,
          T,
          A,
          P,
          Q,
          d,
          u
        );
        return;
      case "select":
        $ = v = T = F = null;
        for (d in i)
          if (A = i[d], i.hasOwnProperty(d) && A != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                $ = A;
              default:
                r.hasOwnProperty(d) || Je(
                  e,
                  n,
                  d,
                  null,
                  r,
                  A
                );
            }
        for (u in r)
          if (d = r[u], A = i[u], r.hasOwnProperty(u) && (d != null || A != null))
            switch (u) {
              case "value":
                F = d;
                break;
              case "defaultValue":
                T = d;
                break;
              case "multiple":
                v = d;
              default:
                d !== A && Je(
                  e,
                  n,
                  u,
                  d,
                  r,
                  A
                );
            }
        n = T, i = v, r = $, F != null ? Ji(e, !!i, F, !1) : !!r != !!i && (n != null ? Ji(e, !!i, n, !0) : Ji(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        $ = F = null;
        for (T in i)
          if (u = i[T], i.hasOwnProperty(T) && u != null && !r.hasOwnProperty(T))
            switch (T) {
              case "value":
                break;
              case "children":
                break;
              default:
                Je(e, n, T, null, r, u);
            }
        for (v in r)
          if (u = r[v], d = i[v], r.hasOwnProperty(v) && (u != null || d != null))
            switch (v) {
              case "value":
                F = u;
                break;
              case "defaultValue":
                $ = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== d && Je(e, n, v, u, r, d);
            }
        Xh(e, F, $);
        return;
      case "option":
        for (var pe in i)
          if (F = i[pe], i.hasOwnProperty(pe) && F != null && !r.hasOwnProperty(pe))
            switch (pe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Je(
                  e,
                  n,
                  pe,
                  null,
                  r,
                  F
                );
            }
        for (A in r)
          if (F = r[A], $ = i[A], r.hasOwnProperty(A) && F !== $ && (F != null || $ != null))
            switch (A) {
              case "selected":
                e.selected = F && typeof F != "function" && typeof F != "symbol";
                break;
              default:
                Je(
                  e,
                  n,
                  A,
                  F,
                  r,
                  $
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
        for (var Ce in i)
          F = i[Ce], i.hasOwnProperty(Ce) && F != null && !r.hasOwnProperty(Ce) && Je(e, n, Ce, null, r, F);
        for (P in r)
          if (F = r[P], $ = i[P], r.hasOwnProperty(P) && F !== $ && (F != null || $ != null))
            switch (P) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (F != null)
                  throw Error(s(137, n));
                break;
              default:
                Je(
                  e,
                  n,
                  P,
                  F,
                  r,
                  $
                );
            }
        return;
      default:
        if (Uu(n)) {
          for (var We in i)
            F = i[We], i.hasOwnProperty(We) && F !== void 0 && !r.hasOwnProperty(We) && Tf(
              e,
              n,
              We,
              void 0,
              r,
              F
            );
          for (Q in r)
            F = r[Q], $ = i[Q], !r.hasOwnProperty(Q) || F === $ || F === void 0 && $ === void 0 || Tf(
              e,
              n,
              Q,
              F,
              r,
              $
            );
          return;
        }
    }
    for (var V in i)
      F = i[V], i.hasOwnProperty(V) && F != null && !r.hasOwnProperty(V) && Je(e, n, V, null, r, F);
    for (W in r)
      F = r[W], $ = i[W], !r.hasOwnProperty(W) || F === $ || F == null && $ == null || Je(e, n, W, F, r, $);
  }
  function Zy(e) {
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
  function jE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, i = performance.getEntriesByType("resource"), r = 0; r < i.length; r++) {
        var u = i[r], d = u.transferSize, v = u.initiatorType, T = u.duration;
        if (d && T && Zy(v)) {
          for (v = 0, T = u.responseEnd, r += 1; r < i.length; r++) {
            var A = i[r], P = A.startTime;
            if (P > T) break;
            var Q = A.transferSize, W = A.initiatorType;
            Q && Zy(W) && (A = A.responseEnd, v += Q * (A < T ? 1 : (T - P) / (A - P)));
          }
          if (--r, n += 8 * (d + v) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var wf = null, Rf = null;
  function xo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Jy(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Wy(e, n) {
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
  function Cf(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Mf = null;
  function DE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Mf ? !1 : (Mf = e, !0) : (Mf = null, !1);
  }
  var eg = typeof setTimeout == "function" ? setTimeout : void 0, NE = typeof clearTimeout == "function" ? clearTimeout : void 0, tg = typeof Promise == "function" ? Promise : void 0, zE = typeof queueMicrotask == "function" ? queueMicrotask : typeof tg < "u" ? function(e) {
    return tg.resolve(null).then(e).catch(_E);
  } : eg;
  function _E(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Za(e) {
    return e === "head";
  }
  function ng(e, n) {
    var i = n, r = 0;
    do {
      var u = i.nextSibling;
      if (e.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (r === 0) {
            e.removeChild(u), Dl(n);
            return;
          }
          r--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          r++;
        else if (i === "html")
          Dr(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, Dr(i);
          for (var d = i.firstChild; d; ) {
            var v = d.nextSibling, T = d.nodeName;
            d[Ne] || T === "SCRIPT" || T === "STYLE" || T === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = v;
          }
        } else
          i === "body" && Dr(e.ownerDocument.body);
      i = u;
    } while (i);
    Dl(n);
  }
  function ag(e, n) {
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
  function Af(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Af(i), et(i);
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
  function OE(e, n, i, r) {
    for (; e.nodeType === 1; ) {
      var u = i;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (r) {
        if (!e[Ne])
          switch (n) {
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
      } else if (n === "input" && e.type === "hidden") {
        var d = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === d)
          return e;
      } else return e;
      if (e = En(e.nextSibling), e === null) break;
    }
    return null;
  }
  function LE(e, n, i) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = En(e.nextSibling), e === null)) return null;
    return e;
  }
  function ig(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = En(e.nextSibling), e === null)) return null;
    return e;
  }
  function jf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Df(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function UE(e, n) {
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
  function En(e) {
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
  var Nf = null;
  function lg(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return En(e.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function rg(e) {
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
  function sg(e, n, i) {
    switch (n = xo(i), e) {
      case "html":
        if (e = n.documentElement, !e) throw Error(s(452));
        return e;
      case "head":
        if (e = n.head, !e) throw Error(s(453));
        return e;
      case "body":
        if (e = n.body, !e) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function Dr(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    et(e);
  }
  var Tn = /* @__PURE__ */ new Map(), og = /* @__PURE__ */ new Set();
  function So(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ea = H.d;
  H.d = {
    f: VE,
    r: BE,
    D: HE,
    C: kE,
    L: qE,
    m: PE,
    X: FE,
    S: YE,
    M: GE
  };
  function VE() {
    var e = Ea.f(), n = fo();
    return e || n;
  }
  function BE(e) {
    var n = ct(e);
    n !== null && n.tag === 5 && n.type === "form" ? Rp(n) : Ea.r(e);
  }
  var Ml = typeof document > "u" ? null : document;
  function ug(e, n, i) {
    var r = Ml;
    if (r && typeof n == "string" && n) {
      var u = pn(n);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), og.has(u) || (og.add(u), e = { rel: e, crossOrigin: i, href: n }, r.querySelector(u) === null && (n = r.createElement("link"), Ut(n, "link", e), at(n), r.head.appendChild(n)));
    }
  }
  function HE(e) {
    Ea.D(e), ug("dns-prefetch", e, null);
  }
  function kE(e, n) {
    Ea.C(e, n), ug("preconnect", e, n);
  }
  function qE(e, n, i) {
    Ea.L(e, n, i);
    var r = Ml;
    if (r && e && n) {
      var u = 'link[rel="preload"][as="' + pn(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + pn(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + pn(
        i.imageSizes
      ) + '"]')) : u += '[href="' + pn(e) + '"]';
      var d = u;
      switch (n) {
        case "style":
          d = Al(e);
          break;
        case "script":
          d = jl(e);
      }
      Tn.has(d) || (e = b(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : e,
          as: n
        },
        i
      ), Tn.set(d, e), r.querySelector(u) !== null || n === "style" && r.querySelector(Nr(d)) || n === "script" && r.querySelector(zr(d)) || (n = r.createElement("link"), Ut(n, "link", e), at(n), r.head.appendChild(n)));
    }
  }
  function PE(e, n) {
    Ea.m(e, n);
    var i = Ml;
    if (i && e) {
      var r = n && typeof n.as == "string" ? n.as : "script", u = 'link[rel="modulepreload"][as="' + pn(r) + '"][href="' + pn(e) + '"]', d = u;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = jl(e);
      }
      if (!Tn.has(d) && (e = b({ rel: "modulepreload", href: e }, n), Tn.set(d, e), i.querySelector(u) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(zr(d)))
              return;
        }
        r = i.createElement("link"), Ut(r, "link", e), at(r), i.head.appendChild(r);
      }
    }
  }
  function YE(e, n, i) {
    Ea.S(e, n, i);
    var r = Ml;
    if (r && e) {
      var u = St(r).hoistableStyles, d = Al(e);
      n = n || "default";
      var v = u.get(d);
      if (!v) {
        var T = { loading: 0, preload: null };
        if (v = r.querySelector(
          Nr(d)
        ))
          T.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": n },
            i
          ), (i = Tn.get(d)) && zf(e, i);
          var A = v = r.createElement("link");
          at(A), Ut(A, "link", e), A._p = new Promise(function(P, Q) {
            A.onload = P, A.onerror = Q;
          }), A.addEventListener("load", function() {
            T.loading |= 1;
          }), A.addEventListener("error", function() {
            T.loading |= 2;
          }), T.loading |= 4, Eo(v, n, r);
        }
        v = {
          type: "stylesheet",
          instance: v,
          count: 1,
          state: T
        }, u.set(d, v);
      }
    }
  }
  function FE(e, n) {
    Ea.X(e, n);
    var i = Ml;
    if (i && e) {
      var r = St(i).hoistableScripts, u = jl(e), d = r.get(u);
      d || (d = i.querySelector(zr(u)), d || (e = b({ src: e, async: !0 }, n), (n = Tn.get(u)) && _f(e, n), d = i.createElement("script"), at(d), Ut(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, r.set(u, d));
    }
  }
  function GE(e, n) {
    Ea.M(e, n);
    var i = Ml;
    if (i && e) {
      var r = St(i).hoistableScripts, u = jl(e), d = r.get(u);
      d || (d = i.querySelector(zr(u)), d || (e = b({ src: e, async: !0, type: "module" }, n), (n = Tn.get(u)) && _f(e, n), d = i.createElement("script"), at(d), Ut(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, r.set(u, d));
    }
  }
  function cg(e, n, i, r) {
    var u = (u = Re.current) ? So(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = Al(i.href), i = St(
          u
        ).hoistableStyles, r = i.get(n), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = Al(i.href);
          var d = St(
            u
          ).hoistableStyles, v = d.get(e);
          if (v || (u = u.ownerDocument || u, v = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(e, v), (d = u.querySelector(
            Nr(e)
          )) && !d._p && (v.instance = d, v.state.loading = 5), Tn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, Tn.set(e, i), d || $E(
            u,
            e,
            i,
            v.state
          ))), n && r === null)
            throw Error(s(528, ""));
          return v;
        }
        if (n && r !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = jl(i), i = St(
          u
        ).hoistableScripts, r = i.get(n), r || (r = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, r)), r) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function Al(e) {
    return 'href="' + pn(e) + '"';
  }
  function Nr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function fg(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function $E(e, n, i, r) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? r.loading = 1 : (n = e.createElement("link"), r.preload = n, n.addEventListener("load", function() {
      return r.loading |= 1;
    }), n.addEventListener("error", function() {
      return r.loading |= 2;
    }), Ut(n, "link", i), at(n), e.head.appendChild(n));
  }
  function jl(e) {
    return '[src="' + pn(e) + '"]';
  }
  function zr(e) {
    return "script[async]" + e;
  }
  function dg(e, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + pn(i.href) + '"]'
          );
          if (r)
            return n.instance = r, at(r), r;
          var u = b({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), at(r), Ut(r, "style", u), Eo(r, i.precedence, e), n.instance = r;
        case "stylesheet":
          u = Al(i.href);
          var d = e.querySelector(
            Nr(u)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, at(d), d;
          r = fg(i), (u = Tn.get(u)) && zf(r, u), d = (e.ownerDocument || e).createElement("link"), at(d);
          var v = d;
          return v._p = new Promise(function(T, A) {
            v.onload = T, v.onerror = A;
          }), Ut(d, "link", r), n.state.loading |= 4, Eo(d, i.precedence, e), n.instance = d;
        case "script":
          return d = jl(i.src), (u = e.querySelector(
            zr(d)
          )) ? (n.instance = u, at(u), u) : (r = i, (u = Tn.get(d)) && (r = b({}, i), _f(r, u)), e = e.ownerDocument || e, u = e.createElement("script"), at(u), Ut(u, "link", r), e.head.appendChild(u), n.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (r = n.instance, n.state.loading |= 4, Eo(r, i.precedence, e));
    return n.instance;
  }
  function Eo(e, n, i) {
    for (var r = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = r.length ? r[r.length - 1] : null, d = u, v = 0; v < r.length; v++) {
      var T = r[v];
      if (T.dataset.precedence === n) d = T;
      else if (d !== u) break;
    }
    d ? d.parentNode.insertBefore(e, d.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(e, n.firstChild));
  }
  function zf(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function _f(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var To = null;
  function hg(e, n, i) {
    if (To === null) {
      var r = /* @__PURE__ */ new Map(), u = To = /* @__PURE__ */ new Map();
      u.set(i, r);
    } else
      u = To, r = u.get(i), r || (r = /* @__PURE__ */ new Map(), u.set(i, r));
    if (r.has(e)) return r;
    for (r.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var d = i[u];
      if (!(d[Ne] || d[de] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var v = d.getAttribute(n) || "";
        v = e + v;
        var T = r.get(v);
        T ? T.push(d) : r.set(v, [d]);
      }
    }
    return r;
  }
  function mg(e, n, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function XE(e, n, i) {
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
  function pg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function IE(e, n, i, r) {
    if (i.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Al(r.href), d = n.querySelector(
          Nr(u)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = wo.bind(e), n.then(e, e)), i.state.loading |= 4, i.instance = d, at(d);
          return;
        }
        d = n.ownerDocument || n, r = fg(r), (u = Tn.get(u)) && zf(r, u), d = d.createElement("link"), at(d);
        var v = d;
        v._p = new Promise(function(T, A) {
          v.onload = T, v.onerror = A;
        }), Ut(d, "link", r), i.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = wo.bind(e), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Of = 0;
  function KE(e, n) {
    return e.stylesheets && e.count === 0 && Co(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var r = setTimeout(function() {
        if (e.stylesheets && Co(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Of === 0 && (Of = 62500 * jE());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Co(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > Of ? 50 : 800) + n
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(u);
      };
    } : null;
  }
  function wo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Co(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Ro = null;
  function Co(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ro = /* @__PURE__ */ new Map(), n.forEach(QE, e), Ro = null, wo.call(e));
  }
  function QE(e, n) {
    if (!(n.state.loading & 4)) {
      var i = Ro.get(e);
      if (i) var r = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Ro.set(e, i);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var v = u[d];
          (v.nodeName === "LINK" || v.getAttribute("media") !== "not all") && (i.set(v.dataset.precedence, v), r = v);
        }
        r && i.set(null, r);
      }
      u = n.instance, v = u.getAttribute("data-precedence"), d = i.get(v) || r, d === r && i.set(null, u), i.set(v, u), this.count++, r = wo.bind(this), u.addEventListener("load", r), u.addEventListener("error", r), d ? d.parentNode.insertBefore(u, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), n.state.loading |= 4;
    }
  }
  var _r = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0
  };
  function ZE(e, n, i, r, u, d, v, T, A) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = za(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = za(0), this.hiddenUpdates = za(null), this.identifierPrefix = r, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = v, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = A, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function yg(e, n, i, r, u, d, v, T, A, P, Q, W) {
    return e = new ZE(
      e,
      n,
      i,
      v,
      A,
      P,
      Q,
      W,
      T
    ), n = 1, d === !0 && (n |= 24), d = rn(3, null, null, n), e.current = d, d.stateNode = e, n = dc(), n.refCount++, e.pooledCache = n, n.refCount++, d.memoizedState = {
      element: r,
      isDehydrated: i,
      cache: n
    }, yc(d), e;
  }
  function gg(e) {
    return e ? (e = rl, e) : rl;
  }
  function vg(e, n, i, r, u, d) {
    u = gg(u), r.context === null ? r.context = u : r.pendingContext = u, r = ka(n), r.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (r.callback = d), i = qa(e, r, n), i !== null && (tn(i, e, n), fr(i, e, n));
  }
  function bg(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Lf(e, n) {
    bg(e, n), (e = e.alternate) && bg(e, n);
  }
  function xg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Si(e, 67108864);
      n !== null && tn(n, e, 67108864), Lf(e, 67108864);
    }
  }
  function Sg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = fn();
      n = L(n);
      var i = Si(e, n);
      i !== null && tn(i, e, n), Lf(e, n);
    }
  }
  var Mo = !0;
  function JE(e, n, i, r) {
    var u = U.T;
    U.T = null;
    var d = H.p;
    try {
      H.p = 2, Uf(e, n, i, r);
    } finally {
      H.p = d, U.T = u;
    }
  }
  function WE(e, n, i, r) {
    var u = U.T;
    U.T = null;
    var d = H.p;
    try {
      H.p = 8, Uf(e, n, i, r);
    } finally {
      H.p = d, U.T = u;
    }
  }
  function Uf(e, n, i, r) {
    if (Mo) {
      var u = Vf(r);
      if (u === null)
        Ef(
          e,
          n,
          r,
          Ao,
          i
        ), Tg(e, r);
      else if (tT(
        u,
        e,
        n,
        i,
        r
      ))
        r.stopPropagation();
      else if (Tg(e, r), n & 4 && -1 < eT.indexOf(e)) {
        for (; u !== null; ) {
          var d = ct(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var v = zn(d.pendingLanes);
                  if (v !== 0) {
                    var T = d;
                    for (T.pendingLanes |= 2, T.entangledLanes |= 2; v; ) {
                      var A = 1 << 31 - kt(v);
                      T.entanglements[1] |= A, v &= ~A;
                    }
                    In(d), (Fe & 6) === 0 && (uo = Ft() + 500, Mr(0));
                  }
                }
                break;
              case 31:
              case 13:
                T = Si(d, 2), T !== null && tn(T, d, 2), fo(), Lf(d, 2);
            }
          if (d = Vf(r), d === null && Ef(
            e,
            n,
            r,
            Ao,
            i
          ), d === u) break;
          u = d;
        }
        u !== null && r.stopPropagation();
      } else
        Ef(
          e,
          n,
          r,
          null,
          i
        );
    }
  }
  function Vf(e) {
    return e = Bu(e), Bf(e);
  }
  var Ao = null;
  function Bf(e) {
    if (Ao = null, e = Qe(e), e !== null) {
      var n = c(e);
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
    return Ao = e, null;
  }
  function Eg(e) {
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
        switch (aa()) {
          case ja:
            return 2;
          case Il:
            return 8;
          case Da:
          case Nn:
            return 32;
          case mn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Hf = !1, Ja = null, Wa = null, ei = null, Or = /* @__PURE__ */ new Map(), Lr = /* @__PURE__ */ new Map(), ti = [], eT = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Tg(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ja = null;
        break;
      case "dragenter":
      case "dragleave":
        Wa = null;
        break;
      case "mouseover":
      case "mouseout":
        ei = null;
        break;
      case "pointerover":
      case "pointerout":
        Or.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Lr.delete(n.pointerId);
    }
  }
  function Ur(e, n, i, r, u, d) {
    return e === null || e.nativeEvent !== d ? (e = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: r,
      nativeEvent: d,
      targetContainers: [u]
    }, n !== null && (n = ct(n), n !== null && xg(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), e);
  }
  function tT(e, n, i, r, u) {
    switch (n) {
      case "focusin":
        return Ja = Ur(
          Ja,
          e,
          n,
          i,
          r,
          u
        ), !0;
      case "dragenter":
        return Wa = Ur(
          Wa,
          e,
          n,
          i,
          r,
          u
        ), !0;
      case "mouseover":
        return ei = Ur(
          ei,
          e,
          n,
          i,
          r,
          u
        ), !0;
      case "pointerover":
        var d = u.pointerId;
        return Or.set(
          d,
          Ur(
            Or.get(d) || null,
            e,
            n,
            i,
            r,
            u
          )
        ), !0;
      case "gotpointercapture":
        return d = u.pointerId, Lr.set(
          d,
          Ur(
            Lr.get(d) || null,
            e,
            n,
            i,
            r,
            u
          )
        ), !0;
    }
    return !1;
  }
  function wg(e) {
    var n = Qe(e.target);
    if (n !== null) {
      var i = c(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = f(i), n !== null) {
            e.blockedOn = n, oe(e.priority, function() {
              Sg(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            e.blockedOn = n, oe(e.priority, function() {
              Sg(i);
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
  function jo(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var i = Vf(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var r = new i.constructor(
          i.type,
          i
        );
        Vu = r, i.target.dispatchEvent(r), Vu = null;
      } else
        return n = ct(i), n !== null && xg(n), e.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function Rg(e, n, i) {
    jo(e) && i.delete(n);
  }
  function nT() {
    Hf = !1, Ja !== null && jo(Ja) && (Ja = null), Wa !== null && jo(Wa) && (Wa = null), ei !== null && jo(ei) && (ei = null), Or.forEach(Rg), Lr.forEach(Rg);
  }
  function Do(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Hf || (Hf = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      nT
    )));
  }
  var No = null;
  function Cg(e) {
    No !== e && (No = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        No === e && (No = null);
        for (var n = 0; n < e.length; n += 3) {
          var i = e[n], r = e[n + 1], u = e[n + 2];
          if (typeof r != "function") {
            if (Bf(r || i) === null)
              continue;
            break;
          }
          var d = ct(i);
          d !== null && (e.splice(n, 3), n -= 3, Uc(
            d,
            {
              pending: !0,
              data: u,
              method: i.method,
              action: r
            },
            r,
            u
          ));
        }
      }
    ));
  }
  function Dl(e) {
    function n(A) {
      return Do(A, e);
    }
    Ja !== null && Do(Ja, e), Wa !== null && Do(Wa, e), ei !== null && Do(ei, e), Or.forEach(n), Lr.forEach(n);
    for (var i = 0; i < ti.length; i++) {
      var r = ti[i];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < ti.length && (i = ti[0], i.blockedOn === null); )
      wg(i), i.blockedOn === null && ti.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (r = 0; r < i.length; r += 3) {
        var u = i[r], d = i[r + 1], v = u[he] || null;
        if (typeof d == "function")
          v || Cg(i);
        else if (v) {
          var T = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, v = d[he] || null)
              T = v.formAction;
            else if (Bf(u) !== null) continue;
          } else T = v.action;
          typeof T == "function" ? i[r + 1] = T : (i.splice(r, 3), r -= 3), Cg(i);
        }
      }
  }
  function Mg() {
    function e(d) {
      d.canIntercept && d.info === "react-transition" && d.intercept({
        handler: function() {
          return new Promise(function(v) {
            return u = v;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      u !== null && (u(), u = null), r || setTimeout(i, 20);
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
      var r = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(i, 100), function() {
        r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), u !== null && (u(), u = null);
      };
    }
  }
  function kf(e) {
    this._internalRoot = e;
  }
  zo.prototype.render = kf.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(s(409));
    var i = n.current, r = fn();
    vg(i, r, e, n, null, null);
  }, zo.prototype.unmount = kf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      vg(e.current, 2, null, e, null, null), fo(), n[ve] = null;
    }
  };
  function zo(e) {
    this._internalRoot = e;
  }
  zo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ie();
      e = { blockedOn: null, target: e, priority: n };
      for (var i = 0; i < ti.length && n !== 0 && n < ti[i].priority; i++) ;
      ti.splice(i, 0, e), i === 0 && wg(e);
    }
  };
  var Ag = a.version;
  if (Ag !== "19.2.5")
    throw Error(
      s(
        527,
        Ag,
        "19.2.5"
      )
    );
  H.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = m(n), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var aT = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var _o = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!_o.isDisabled && _o.supportsFiber)
      try {
        ia = _o.inject(
          aT
        ), Gt = _o;
      } catch {
      }
  }
  return Br.createRoot = function(e, n) {
    if (!o(e)) throw Error(s(299));
    var i = !1, r = "", u = Lp, d = Up, v = Vp;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (v = n.onRecoverableError)), n = yg(
      e,
      1,
      !1,
      null,
      null,
      i,
      r,
      null,
      u,
      d,
      v,
      Mg
    ), e[ve] = n.current, Sf(e), new kf(n);
  }, Br.hydrateRoot = function(e, n, i) {
    if (!o(e)) throw Error(s(299));
    var r = !1, u = "", d = Lp, v = Up, T = Vp, A = null;
    return i != null && (i.unstable_strictMode === !0 && (r = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (v = i.onCaughtError), i.onRecoverableError !== void 0 && (T = i.onRecoverableError), i.formState !== void 0 && (A = i.formState)), n = yg(
      e,
      1,
      !0,
      n,
      i ?? null,
      r,
      u,
      A,
      d,
      v,
      T,
      Mg
    ), n.context = gg(null), i = n.current, r = fn(), r = L(r), u = ka(r), u.callback = null, qa(i, u, r), i = r, n.current.lanes = i, Pn(n, i), In(n), e[ve] = n.current, Sf(e), new zo(n);
  }, Br.version = "19.2.5", Br;
}
var Bg;
function gT() {
  if (Bg) return Yf.exports;
  Bg = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Yf.exports = yT(), Yf.exports;
}
var vT = gT();
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
var mb = (t) => {
  throw TypeError(t);
}, bT = (t, a, l) => a.has(t) || mb("Cannot " + l), Xf = (t, a, l) => (bT(t, a, "read from private field"), l ? l.call(t) : a.get(t)), xT = (t, a, l) => a.has(t) ? mb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, l);
function Hg(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function ST(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: l, v5Compat: s = !1 } = t, o;
  o = a.map(
    (E, w) => y(
      E,
      typeof E == "string" ? null : E.state,
      w === 0 ? "default" : void 0,
      typeof E == "string" ? void 0 : E.unstable_mask
    )
  );
  let c = p(
    l ?? o.length - 1
  ), f = "POP", h = null;
  function p(E) {
    return Math.min(Math.max(E, 0), o.length - 1);
  }
  function m() {
    return o[c];
  }
  function y(E, w = null, R, D) {
    let B = wd(
      o ? m().pathname : "/",
      E,
      w,
      R,
      D
    );
    return xt(
      B.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        E
      )}`
    ), B;
  }
  function b(E) {
    return typeof E == "string" ? E : Wn(E);
  }
  return {
    get index() {
      return c;
    },
    get action() {
      return f;
    },
    get location() {
      return m();
    },
    createHref: b,
    createURL(E) {
      return new URL(b(E), "http://localhost");
    },
    encodeLocation(E) {
      let w = typeof E == "string" ? kn(E) : E;
      return {
        pathname: w.pathname || "",
        search: w.search || "",
        hash: w.hash || ""
      };
    },
    push(E, w) {
      f = "PUSH";
      let R = Hg(E) ? E : y(E, w);
      c += 1, o.splice(c, o.length, R), s && h && h({ action: f, location: R, delta: 1 });
    },
    replace(E, w) {
      f = "REPLACE";
      let R = Hg(E) ? E : y(E, w);
      o[c] = R, s && h && h({ action: f, location: R, delta: 0 });
    },
    go(E) {
      f = "POP";
      let w = p(c + E), R = o[w];
      c = w, h && h({ action: f, location: R, delta: E });
    },
    listen(E) {
      return h = E, () => {
        h = null;
      };
    }
  };
}
function _e(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function xt(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function ET() {
  return Math.random().toString(36).substring(2, 10);
}
function wd(t, a, l = null, s, o) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? kn(a) : a,
    state: l,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || ET(),
    unstable_mask: o
  };
}
function Wn({
  pathname: t = "/",
  search: a = "",
  hash: l = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), l && l !== "#" && (t += l.charAt(0) === "#" ? l : "#" + l), t;
}
function kn(t) {
  let a = {};
  if (t) {
    let l = t.indexOf("#");
    l >= 0 && (a.hash = t.substring(l), t = t.substring(0, l));
    let s = t.indexOf("?");
    s >= 0 && (a.search = t.substring(s), t = t.substring(0, s)), t && (a.pathname = t);
  }
  return a;
}
function TT(t, a = !1) {
  let l = "http://localhost";
  typeof window < "u" && (l = window.location.origin !== "null" ? window.location.origin : window.location.href), _e(l, "No window.location.(origin|href) available to create URL");
  let s = typeof t == "string" ? t : Wn(t);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var Gr, kg = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (xT(this, Gr, /* @__PURE__ */ new Map()), t)
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
    if (Xf(this, Gr).has(t))
      return Xf(this, Gr).get(t);
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
    Xf(this, Gr).set(t, a);
  }
};
Gr = /* @__PURE__ */ new WeakMap();
var wT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function RT(t) {
  return wT.has(
    t
  );
}
var CT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function MT(t) {
  return CT.has(
    t
  );
}
function AT(t) {
  return t.index === !0;
}
function Wr(t, a, l = [], s = {}, o = !1) {
  return t.map((c, f) => {
    let h = [...l, String(f)], p = typeof c.id == "string" ? c.id : h.join("-");
    if (_e(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), _e(
      o || !s[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), AT(c)) {
      let m = {
        ...c,
        id: p
      };
      return s[p] = qg(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...c,
        id: p,
        children: void 0
      };
      return s[p] = qg(
        m,
        a(m)
      ), c.children && (m.children = Wr(
        c.children,
        a,
        h,
        s,
        o
      )), m;
    }
  });
}
function qg(t, a) {
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
function ri(t, a, l = "/") {
  return $r(t, a, l, !1);
}
function $r(t, a, l, s) {
  let o = typeof a == "string" ? kn(a) : a, c = jn(o.pathname || "/", l);
  if (c == null)
    return null;
  let f = pb(t);
  DT(f);
  let h = null;
  for (let p = 0; h == null && p < f.length; ++p) {
    let m = qT(c);
    h = HT(
      f[p],
      m,
      s
    );
  }
  return h;
}
function jT(t, a) {
  let { route: l, pathname: s, params: o } = t;
  return {
    id: l.id,
    pathname: s,
    params: o,
    data: a[l.id],
    loaderData: a[l.id],
    handle: l.handle
  };
}
function pb(t, a = [], l = [], s = "", o = !1) {
  let c = (f, h, p = o, m) => {
    let y = {
      relativePath: m === void 0 ? f.path || "" : m,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: h,
      route: f
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(s) && p)
        return;
      _e(
        y.relativePath.startsWith(s),
        `Absolute route path "${y.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(s.length);
    }
    let b = Mn([s, y.relativePath]), x = l.concat(y);
    f.children && f.children.length > 0 && (_e(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
    ), pb(
      f.children,
      a,
      x,
      b,
      p
    )), !(f.path == null && !f.index) && a.push({
      path: b,
      score: VT(b, f.index),
      routesMeta: x
    });
  };
  return t.forEach((f, h) => {
    if (f.path === "" || !f.path?.includes("?"))
      c(f, h);
    else
      for (let p of yb(f.path))
        c(f, h, !0, p);
  }), a;
}
function yb(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [l, ...s] = a, o = l.endsWith("?"), c = l.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let f = yb(s.join("/")), h = [];
  return h.push(
    ...f.map(
      (p) => p === "" ? c : [c, p].join("/")
    )
  ), o && h.push(...f), h.map(
    (p) => t.startsWith("/") && p === "" ? "/" : p
  );
}
function DT(t) {
  t.sort(
    (a, l) => a.score !== l.score ? l.score - a.score : BT(
      a.routesMeta.map((s) => s.childrenIndex),
      l.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var NT = /^:[\w-]+$/, zT = 3, _T = 2, OT = 1, LT = 10, UT = -2, Pg = (t) => t === "*";
function VT(t, a) {
  let l = t.split("/"), s = l.length;
  return l.some(Pg) && (s += UT), a && (s += _T), l.filter((o) => !Pg(o)).reduce(
    (o, c) => o + (NT.test(c) ? zT : c === "" ? OT : LT),
    s
  );
}
function BT(t, a) {
  return t.length === a.length && t.slice(0, -1).every((s, o) => s === a[o]) ? (
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
function HT(t, a, l = !1) {
  let { routesMeta: s } = t, o = {}, c = "/", f = [];
  for (let h = 0; h < s.length; ++h) {
    let p = s[h], m = h === s.length - 1, y = c === "/" ? a : a.slice(c.length) || "/", b = lu(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), x = p.route;
    if (!b && m && l && !s[s.length - 1].route.index && (b = lu(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      y
    )), !b)
      return null;
    Object.assign(o, b.params), f.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: Mn([c, b.pathname]),
      pathnameBase: FT(
        Mn([c, b.pathnameBase])
      ),
      route: x
    }), b.pathnameBase !== "/" && (c = Mn([c, b.pathnameBase]));
  }
  return f;
}
function lu(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [l, s] = kT(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(l);
  if (!o) return null;
  let c = o[0], f = c.replace(/(.)\/+$/, "$1"), h = o.slice(1);
  return {
    params: s.reduce(
      (m, { paramName: y, isOptional: b }, x) => {
        if (y === "*") {
          let w = h[x] || "";
          f = c.slice(0, c.length - w.length).replace(/(.)\/+$/, "$1");
        }
        const E = h[x];
        return b && !E ? m[y] = void 0 : m[y] = (E || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: c,
    pathnameBase: f,
    pattern: t
  };
}
function kT(t, a = !1, l = !0) {
  xt(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (f, h, p, m, y) => {
      if (s.push({ paramName: h, isOptional: p != null }), p) {
        let b = y.charAt(m + f.length);
        return b && b !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (s.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : l ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function qT(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return xt(
      !1,
      `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), t;
  }
}
function jn(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let l = a.endsWith("/") ? a.length - 1 : a.length, s = t.charAt(l);
  return s && s !== "/" ? null : t.slice(l) || "/";
}
function PT({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Mn([t, a]);
}
var gb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, th = (t) => gb.test(t);
function YT(t, a = "/") {
  let {
    pathname: l,
    search: s = "",
    hash: o = ""
  } = typeof t == "string" ? kn(t) : t, c;
  return l ? (l = ah(l), l.startsWith("/") ? c = Yg(l.substring(1), "/") : c = Yg(l, a)) : c = a, {
    pathname: c,
    search: GT(s),
    hash: $T(o)
  };
}
function Yg(t, a) {
  let l = ru(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? l.length > 1 && l.pop() : o !== "." && l.push(o);
  }), l.length > 1 ? l.join("/") : "/";
}
function If(t, a, l, s) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${l}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function vb(t) {
  return t.filter(
    (a, l) => l === 0 || a.route.path && a.route.path.length > 0
  );
}
function nh(t) {
  let a = vb(t);
  return a.map(
    (l, s) => s === a.length - 1 ? l.pathname : l.pathnameBase
  );
}
function vu(t, a, l, s = !1) {
  let o;
  typeof t == "string" ? o = kn(t) : (o = { ...t }, _e(
    !o.pathname || !o.pathname.includes("?"),
    If("?", "pathname", "search", o)
  ), _e(
    !o.pathname || !o.pathname.includes("#"),
    If("#", "pathname", "hash", o)
  ), _e(
    !o.search || !o.search.includes("#"),
    If("#", "search", "hash", o)
  ));
  let c = t === "" || o.pathname === "", f = c ? "/" : o.pathname, h;
  if (f == null)
    h = l;
  else {
    let b = a.length - 1;
    if (!s && f.startsWith("..")) {
      let x = f.split("/");
      for (; x[0] === ".."; )
        x.shift(), b -= 1;
      o.pathname = x.join("/");
    }
    h = b >= 0 ? a[b] : "/";
  }
  let p = YT(o, h), m = f && f !== "/" && f.endsWith("/"), y = (c || f === ".") && l.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var ah = (t) => t.replace(/\/\/+/g, "/"), Mn = (t) => ah(t.join("/")), ru = (t) => t.replace(/\/+$/, ""), FT = (t) => ru(t).replace(/^\/*/, "/"), GT = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, $T = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, XT = (t, a = 302) => {
  let l = a;
  typeof l == "number" ? l = { status: l } : typeof l.status > "u" && (l.status = 302);
  let s = new Headers(l.headers);
  return s.set("Location", t), new Response(null, { ...l, headers: s });
}, bu = class {
  constructor(t, a, l, s = !1) {
    this.status = t, this.statusText = a || "", this.internal = s, l instanceof Error ? (this.data = l.toString(), this.error = l) : this.data = l;
  }
};
function es(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function ls(t) {
  let a = t.map((l) => l.route.path).filter(Boolean);
  return Mn(a) || "/";
}
var bb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function xb(t, a) {
  let l = t;
  if (typeof l != "string" || !gb.test(l))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: l
    };
  let s = l, o = !1;
  if (bb)
    try {
      let c = new URL(window.location.href), f = l.startsWith("//") ? new URL(c.protocol + l) : new URL(l), h = jn(f.pathname, a);
      f.origin === c.origin && h != null ? l = h + f.search + f.hash : o = !0;
    } catch {
      xt(
        !1,
        `<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: s,
    isExternal: o,
    to: l
  };
}
var oi = Symbol("Uninstrumented");
function IT(t, a) {
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
    (o) => o({
      id: a.id,
      index: a.index,
      path: a.path,
      instrument(c) {
        let f = Object.keys(l);
        for (let h of f)
          c[h] && l[h].push(c[h]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && l.lazy.length > 0) {
    let o = Ol(l.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((c) => {
      let f = o[c], h = l[`lazy.${c}`];
      if (typeof f == "function" && h.length > 0) {
        let p = Ol(h, f, () => {
        });
        p && (s.lazy = Object.assign(s.lazy || {}, {
          [c]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let c = a[o];
    if (typeof c == "function" && l[o].length > 0) {
      let f = c[oi] ?? c, h = Ol(
        l[o],
        f,
        (...p) => Fg(p[0])
      );
      h && (o === "loader" && f.hydrate === !0 && (h.hydrate = !0), h[oi] = f, s[o] = h);
    }
  }), a.middleware && a.middleware.length > 0 && l.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[oi] ?? o, f = Ol(
      l.middleware,
      c,
      (...h) => Fg(h[0])
    );
    return f ? (f[oi] = c, f) : o;
  })), s;
}
function KT(t, a) {
  let l = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (s) => s({
      instrument(o) {
        let c = Object.keys(o);
        for (let f of c)
          o[f] && l[f].push(o[f]);
      }
    })
  ), l.navigate.length > 0) {
    let s = t.navigate[oi] ?? t.navigate, o = Ol(
      l.navigate,
      s,
      (...c) => {
        let [f, h] = c;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? Wn(f) : ".",
          ...Gg(t, h ?? {})
        };
      }
    );
    o && (o[oi] = s, t.navigate = o);
  }
  if (l.fetch.length > 0) {
    let s = t.fetch[oi] ?? t.fetch, o = Ol(l.fetch, s, (...c) => {
      let [f, , h, p] = c;
      return {
        href: h ?? ".",
        fetcherKey: f,
        ...Gg(t, p ?? {})
      };
    });
    o && (o[oi] = s, t.fetch = o);
  }
  return t;
}
function Ol(t, a, l) {
  return t.length === 0 ? null : async (...s) => {
    let o = await Sb(
      t,
      l(...s),
      () => a(...s),
      t.length - 1
    );
    if (o.type === "error")
      throw o.value;
    return o.value;
  };
}
async function Sb(t, a, l, s) {
  let o = t[s], c;
  if (o) {
    let f, h = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = Sb(t, a, l, s - 1), c = await f, _e(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
    try {
      await o(h, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    f || await h(), await f;
  } else
    try {
      c = { type: "success", value: await l() };
    } catch (f) {
      c = { type: "error", value: f };
    }
  return c || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function Fg(t) {
  let { request: a, context: l, params: s, unstable_pattern: o } = t;
  return {
    request: QT(a),
    params: { ...s },
    unstable_pattern: o,
    context: ZT(l)
  };
}
function Gg(t, a) {
  return {
    currentUrl: Wn(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function QT(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function ZT(t) {
  if (WT(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var JT = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function WT(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === JT;
}
var Eb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], ew = new Set(
  Eb
), tw = [
  "GET",
  ...Eb
], nw = new Set(tw), Tb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), aw = /* @__PURE__ */ new Set([307, 308]), Kf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, iw = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Hr = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, lw = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), wb = "remix-router-transitions", Rb = Symbol("ResetLoaderData");
function rw(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, l = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  _e(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = t.hydrationRouteProperties || [], o = t.mapRouteProperties || lw, c = o;
  if (t.unstable_instrumentations) {
    let j = t.unstable_instrumentations;
    c = (L) => ({
      ...o(L),
      ...IT(
        j.map((Y) => Y.route).filter(Boolean),
        L
      )
    });
  }
  let f = {}, h = Wr(
    t.routes,
    c,
    void 0,
    f
  ), p, m = t.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let y = t.dataStrategy || fw, b = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, x = null, E = /* @__PURE__ */ new Set(), w = null, R = null, D = null, B = t.hydrationData != null, z = ri(h, t.history.location, m), _ = !1, k = null, G, ee;
  if (z == null && !t.patchRoutesOnNavigation) {
    let j = wn(404, {
      pathname: t.history.location.pathname
    }), { matches: L, route: Y } = Oo(h);
    G = !0, ee = !G, z = L, k = { [Y.id]: j };
  } else if (z && !t.hydrationData && za(
    z,
    h,
    t.history.location.pathname
  ).active && (z = null), z)
    if (z.some((j) => j.route.lazy))
      G = !1, ee = !G;
    else if (!z.some((j) => ih(j.route)))
      G = !0, ee = !G;
    else {
      let j = t.hydrationData ? t.hydrationData.loaderData : null, L = t.hydrationData ? t.hydrationData.errors : null, Y = z;
      if (L) {
        let ie = z.findIndex(
          (oe) => L[oe.route.id] !== void 0
        );
        Y = Y.slice(0, ie + 1);
      }
      ee = !1, G = !0, Y.forEach((ie) => {
        let oe = Cb(ie.route, j, L);
        ee = ee || oe.renderFallback, G = G && !oe.shouldLoad;
      });
    }
  else {
    G = !1, ee = !G, z = [];
    let j = za(
      null,
      h,
      t.history.location.pathname
    );
    j.active && j.matches && (_ = !0, z = j.matches);
  }
  let te, C = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: z,
    initialized: G,
    renderFallback: ee,
    navigation: Kf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || k,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, O = "POP", X = null, ae = !1, I, le = !1, ue = /* @__PURE__ */ new Map(), re = null, U = !1, H = !1, J = /* @__PURE__ */ new Set(), ne = /* @__PURE__ */ new Map(), fe = 0, M = -1, K = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), Ee = /* @__PURE__ */ new Map(), Re = /* @__PURE__ */ new Set(), De = /* @__PURE__ */ new Map(), ht, Xe = null;
  function ta() {
    if (x = t.history.listen(
      ({ action: j, location: L, delta: Y }) => {
        if (ht) {
          ht(), ht = void 0;
          return;
        }
        xt(
          De.size === 0 || Y != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ie = pi({
          currentLocation: C.location,
          nextLocation: L,
          historyAction: j
        });
        if (ie && Y != null) {
          let oe = new Promise((ye) => {
            ht = ye;
          });
          t.history.go(Y * -1), la(ie, {
            state: "blocked",
            location: L,
            proceed() {
              la(ie, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: L
              }), oe.then(() => t.history.go(Y));
            },
            reset() {
              let ye = new Map(C.blockers);
              ye.set(ie, Hr), yt({ blockers: ye });
            }
          }), X?.resolve(), X = null;
          return;
        }
        return xe(j, L);
      }
    ), l) {
      jw(a, ue);
      let j = () => Dw(a, ue);
      a.addEventListener("pagehide", j), re = () => a.removeEventListener("pagehide", j);
    }
    return C.initialized || xe("POP", C.location, {
      initialHydration: !0
    }), te;
  }
  function Ma() {
    x && x(), re && re(), E.clear(), I && I.abort(), C.fetchers.forEach((j, L) => ia(L)), C.blockers.forEach((j, L) => mi(L));
  }
  function qn(j) {
    return E.add(j), () => E.delete(j);
  }
  function yt(j, L = {}) {
    j.matches && (j.matches = j.matches.map((oe) => {
      let ye = f[oe.route.id], de = oe.route;
      return de.element !== ye.element || de.errorElement !== ye.errorElement || de.hydrateFallbackElement !== ye.hydrateFallbackElement ? {
        ...oe,
        route: ye
      } : oe;
    })), C = {
      ...C,
      ...j
    };
    let Y = [], ie = [];
    C.fetchers.forEach((oe, ye) => {
      oe.state === "idle" && (Re.has(ye) ? Y.push(ye) : ie.push(ye));
    }), Re.forEach((oe) => {
      !C.fetchers.has(oe) && !ne.has(oe) && Y.push(oe);
    }), [...E].forEach(
      (oe) => oe(C, {
        deletedFetchers: Y,
        newErrors: j.errors ?? null,
        viewTransitionOpts: L.viewTransitionOpts,
        flushSync: L.flushSync === !0
      })
    ), Y.forEach((oe) => ia(oe)), ie.forEach((oe) => C.fetchers.delete(oe));
  }
  function Ht(j, L, { flushSync: Y } = {}) {
    let ie = C.actionData != null && C.navigation.formMethod != null && Yt(C.navigation.formMethod) && C.navigation.state === "loading" && j.state?._isRedirect !== !0, oe;
    L.actionData ? Object.keys(L.actionData).length > 0 ? oe = L.actionData : oe = null : ie ? oe = C.actionData : oe = null;
    let ye = L.loaderData ? nv(
      C.loaderData,
      L.loaderData,
      L.matches || [],
      L.errors
    ) : C.loaderData, de = C.blockers;
    de.size > 0 && (de = new Map(de), de.forEach((we, Se) => de.set(Se, Hr)));
    let he = U ? !1 : Kl(j, L.matches || C.matches), ve = ae === !0 || C.navigation.formMethod != null && Yt(C.navigation.formMethod) && j.state?._isRedirect !== !0;
    p && (h = p, p = void 0), U || O === "POP" || (O === "PUSH" ? t.history.push(j, j.state) : O === "REPLACE" && t.history.replace(j, j.state));
    let me;
    if (O === "POP") {
      let we = ue.get(C.location.pathname);
      we && we.has(j.pathname) ? me = {
        currentLocation: C.location,
        nextLocation: j
      } : ue.has(j.pathname) && (me = {
        currentLocation: j,
        nextLocation: C.location
      });
    } else if (le) {
      let we = ue.get(C.location.pathname);
      we ? we.add(j.pathname) : (we = /* @__PURE__ */ new Set([j.pathname]), ue.set(C.location.pathname, we)), me = {
        currentLocation: C.location,
        nextLocation: j
      };
    }
    yt(
      {
        ...L,
        // matches, errors, fetchers go through as-is
        actionData: oe,
        loaderData: ye,
        historyAction: O,
        location: j,
        initialized: !0,
        renderFallback: !1,
        navigation: Kf,
        revalidation: "idle",
        restoreScrollPosition: he,
        preventScrollReset: ve,
        blockers: de
      },
      {
        viewTransitionOpts: me,
        flushSync: Y === !0
      }
    ), O = "POP", ae = !1, le = !1, U = !1, H = !1, X?.resolve(), X = null, Xe?.resolve(), Xe = null;
  }
  async function Aa(j, L) {
    if (X?.resolve(), X = null, typeof j == "number") {
      X || (X = rv());
      let et = X.promise;
      return t.history.go(j), et;
    }
    let Y = Rd(
      C.location,
      C.matches,
      m,
      j,
      L?.fromRouteId,
      L?.relative
    ), { path: ie, submission: oe, error: ye } = $g(
      !1,
      Y,
      L
    ), de;
    L?.unstable_mask && (de = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof L.unstable_mask == "string" ? kn(L.unstable_mask) : {
        ...C.location.unstable_mask,
        ...L.unstable_mask
      }
    });
    let he = C.location, ve = wd(
      he,
      ie,
      L && L.state,
      void 0,
      de
    );
    ve = {
      ...ve,
      ...t.history.encodeLocation(ve)
    };
    let me = L && L.replace != null ? L.replace : void 0, we = "PUSH";
    me === !0 ? we = "REPLACE" : me === !1 || oe != null && Yt(oe.formMethod) && oe.formAction === C.location.pathname + C.location.search && (we = "REPLACE");
    let Se = L && "preventScrollReset" in L ? L.preventScrollReset === !0 : void 0, qe = (L && L.flushSync) === !0, Ne = pi({
      currentLocation: he,
      nextLocation: ve,
      historyAction: we
    });
    if (Ne) {
      la(Ne, {
        state: "blocked",
        location: ve,
        proceed() {
          la(Ne, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ve
          }), Aa(j, L);
        },
        reset() {
          let et = new Map(C.blockers);
          et.set(Ne, Hr), yt({ blockers: et });
        }
      });
      return;
    }
    await xe(we, ve, {
      submission: oe,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: ye,
      preventScrollReset: Se,
      replace: L && L.replace,
      enableViewTransition: L && L.viewTransition,
      flushSync: qe,
      callSiteDefaultShouldRevalidate: L && L.unstable_defaultShouldRevalidate
    });
  }
  function hi() {
    Xe || (Xe = rv()), Da(), yt({ revalidation: "loading" });
    let j = Xe.promise;
    return C.navigation.state === "submitting" ? j : C.navigation.state === "idle" ? (xe(C.historyAction, C.location, {
      startUninterruptedRevalidation: !0
    }), j) : (xe(
      O || C.historyAction,
      C.navigation.location,
      {
        overrideNavigation: C.navigation,
        // Proxy through any rending view transition
        enableViewTransition: le === !0
      }
    ), j);
  }
  async function xe(j, L, Y) {
    I && I.abort(), I = null, O = j, U = (Y && Y.startUninterruptedRevalidation) === !0, _u(C.location, C.matches), ae = (Y && Y.preventScrollReset) === !0, le = (Y && Y.enableViewTransition) === !0;
    let ie = p || h, oe = Y && Y.overrideNavigation, ye = Y?.initialHydration && C.matches && C.matches.length > 0 && !_ ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      C.matches
    ) : ri(ie, L, m), de = (Y && Y.flushSync) === !0;
    if (ye && C.initialized && !H && bw(C.location, L) && !(Y && Y.submission && Yt(Y.submission.formMethod))) {
      Ht(L, { matches: ye }, { flushSync: de });
      return;
    }
    let he = za(ye, ie, L.pathname);
    if (he.active && he.matches && (ye = he.matches), !ye) {
      let { error: Qe, notFoundMatches: ct, route: Le } = zn(
        L.pathname
      );
      Ht(
        L,
        {
          matches: ct,
          loaderData: {},
          errors: {
            [Le.id]: Qe
          }
        },
        { flushSync: de }
      );
      return;
    }
    I = new AbortController();
    let ve = zl(
      t.history,
      L,
      I.signal,
      Y && Y.submission
    ), me = t.getContext ? await t.getContext() : new kg(), we;
    if (Y && Y.pendingError)
      we = [
        si(ye).route.id,
        { type: "error", error: Y.pendingError }
      ];
    else if (Y && Y.submission && Yt(Y.submission.formMethod)) {
      let Qe = await Oe(
        ve,
        L,
        Y.submission,
        ye,
        me,
        he.active,
        Y && Y.initialHydration === !0,
        { replace: Y.replace, flushSync: de }
      );
      if (Qe.shortCircuited)
        return;
      if (Qe.pendingActionResult) {
        let [ct, Le] = Qe.pendingActionResult;
        if (dn(Le) && es(Le.error) && Le.error.status === 404) {
          I = null, Ht(L, {
            matches: Qe.matches,
            loaderData: {},
            errors: {
              [ct]: Le.error
            }
          });
          return;
        }
      }
      ye = Qe.matches || ye, we = Qe.pendingActionResult, oe = Qf(L, Y.submission), de = !1, he.active = !1, ve = zl(
        t.history,
        ve.url,
        ve.signal
      );
    }
    let {
      shortCircuited: Se,
      matches: qe,
      loaderData: Ne,
      errors: et
    } = await $e(
      ve,
      L,
      ye,
      me,
      he.active,
      oe,
      Y && Y.submission,
      Y && Y.fetcherSubmission,
      Y && Y.replace,
      Y && Y.initialHydration === !0,
      de,
      we,
      Y && Y.callSiteDefaultShouldRevalidate
    );
    Se || (I = null, Ht(L, {
      matches: qe || ye,
      ...av(we),
      loaderData: Ne,
      errors: et
    }));
  }
  async function Oe(j, L, Y, ie, oe, ye, de, he = {}) {
    Da();
    let ve = Mw(L, Y);
    if (yt({ navigation: ve }, { flushSync: he.flushSync === !0 }), ye) {
      let Se = await Pn(
        ie,
        L.pathname,
        j.signal
      );
      if (Se.type === "aborted")
        return { shortCircuited: !0 };
      if (Se.type === "error") {
        if (Se.partialMatches.length === 0) {
          let { matches: Ne, route: et } = Oo(h);
          return {
            matches: Ne,
            pendingActionResult: [
              et.id,
              {
                type: "error",
                error: Se.error
              }
            ]
          };
        }
        let qe = si(Se.partialMatches).route.id;
        return {
          matches: Se.partialMatches,
          pendingActionResult: [
            qe,
            {
              type: "error",
              error: Se.error
            }
          ]
        };
      } else if (Se.matches)
        ie = Se.matches;
      else {
        let { notFoundMatches: qe, error: Ne, route: et } = zn(
          L.pathname
        );
        return {
          matches: qe,
          pendingActionResult: [
            et.id,
            {
              type: "error",
              error: Ne
            }
          ]
        };
      }
    }
    let me, we = Xo(ie, L);
    if (!we.route.action && !we.route.lazy)
      me = {
        type: "error",
        error: wn(405, {
          method: j.method,
          pathname: L.pathname,
          routeId: we.route.id
        })
      };
    else {
      let Se = Hl(
        c,
        f,
        j,
        L,
        ie,
        we,
        de ? [] : s,
        oe
      ), qe = await ja(
        j,
        L,
        Se,
        oe,
        null
      );
      if (me = qe[we.route.id], !me) {
        for (let Ne of ie)
          if (qe[Ne.route.id]) {
            me = qe[Ne.route.id];
            break;
          }
      }
      if (j.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Bi(me)) {
      let Se;
      return he && he.replace != null ? Se = he.replace : Se = Wg(
        me.response.headers.get("Location"),
        new URL(j.url),
        m,
        t.history
      ) === C.location.pathname + C.location.search, await aa(j, me, !0, {
        submission: Y,
        replace: Se
      }), { shortCircuited: !0 };
    }
    if (dn(me)) {
      let Se = si(ie, we.route.id);
      return (he && he.replace) !== !0 && (O = "PUSH"), {
        matches: ie,
        pendingActionResult: [
          Se.route.id,
          me,
          we.route.id
        ]
      };
    }
    return {
      matches: ie,
      pendingActionResult: [we.route.id, me]
    };
  }
  async function $e(j, L, Y, ie, oe, ye, de, he, ve, me, we, Se, qe) {
    let Ne = ye || Qf(L, de), et = de || he || lv(Ne), Qe = !U && !me;
    if (oe) {
      if (Qe) {
        let gt = ut(Se);
        yt(
          {
            navigation: Ne,
            ...gt !== void 0 ? { actionData: gt } : {}
          },
          {
            flushSync: we
          }
        );
      }
      let ze = await Pn(
        Y,
        L.pathname,
        j.signal
      );
      if (ze.type === "aborted")
        return { shortCircuited: !0 };
      if (ze.type === "error") {
        if (ze.partialMatches.length === 0) {
          let { matches: qt, route: Et } = Oo(h);
          return {
            matches: qt,
            loaderData: {},
            errors: {
              [Et.id]: ze.error
            }
          };
        }
        let gt = si(ze.partialMatches).route.id;
        return {
          matches: ze.partialMatches,
          loaderData: {},
          errors: {
            [gt]: ze.error
          }
        };
      } else if (ze.matches)
        Y = ze.matches;
      else {
        let { error: gt, notFoundMatches: qt, route: Et } = zn(
          L.pathname
        );
        return {
          matches: qt,
          loaderData: {},
          errors: {
            [Et.id]: gt
          }
        };
      }
    }
    let ct = p || h, { dsMatches: Le, revalidatingFetchers: St } = Xg(
      j,
      ie,
      c,
      f,
      t.history,
      C,
      Y,
      et,
      L,
      me ? [] : s,
      me === !0,
      H,
      J,
      Re,
      ce,
      se,
      ct,
      m,
      t.patchRoutesOnNavigation != null,
      Se,
      qe
    );
    if (M = ++fe, !t.dataStrategy && !Le.some((ze) => ze.shouldLoad) && !Le.some(
      (ze) => ze.route.middleware && ze.route.middleware.length > 0
    ) && St.length === 0) {
      let ze = gs();
      return Ht(
        L,
        {
          matches: Y,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Se && dn(Se[1]) ? { [Se[0]]: Se[1].error } : null,
          ...av(Se),
          ...ze ? { fetchers: new Map(C.fetchers) } : {}
        },
        { flushSync: we }
      ), { shortCircuited: !0 };
    }
    if (Qe) {
      let ze = {};
      if (!oe) {
        ze.navigation = Ne;
        let gt = ut(Se);
        gt !== void 0 && (ze.actionData = gt);
      }
      St.length > 0 && (ze.fetchers = na(St)), yt(ze, { flushSync: we });
    }
    St.forEach((ze) => {
      Dt(ze.key), ze.controller && ne.set(ze.key, ze.controller);
    });
    let at = () => St.forEach((ze) => Dt(ze.key));
    I && I.signal.addEventListener(
      "abort",
      at
    );
    let { loaderResults: _a, fetcherResults: _n } = await Il(
      Le,
      St,
      j,
      L,
      ie
    );
    if (j.signal.aborted)
      return { shortCircuited: !0 };
    I && I.signal.removeEventListener(
      "abort",
      at
    ), St.forEach((ze) => ne.delete(ze.key));
    let Nt = Lo(_a);
    if (Nt)
      return await aa(j, Nt.result, !0, {
        replace: ve
      }), { shortCircuited: !0 };
    if (Nt = Lo(_n), Nt)
      return se.add(Nt.key), await aa(j, Nt.result, !0, {
        replace: ve
      }), { shortCircuited: !0 };
    let { loaderData: Yn, errors: yi } = tv(
      C,
      Y,
      _a,
      Se,
      St,
      _n
    );
    me && C.errors && (yi = { ...C.errors, ...yi });
    let Fn = gs(), gi = vs(M), Ki = Fn || gi || St.length > 0;
    return {
      matches: Y,
      loaderData: Yn,
      errors: yi,
      ...Ki ? { fetchers: new Map(C.fetchers) } : {}
    };
  }
  function ut(j) {
    if (j && !dn(j[1]))
      return {
        [j[0]]: j[1].data
      };
    if (C.actionData)
      return Object.keys(C.actionData).length === 0 ? null : C.actionData;
  }
  function na(j) {
    return j.forEach((L) => {
      let Y = C.fetchers.get(L.key), ie = kr(
        void 0,
        Y ? Y.data : void 0
      );
      C.fetchers.set(L.key, ie);
    }), new Map(C.fetchers);
  }
  async function ju(j, L, Y, ie) {
    Dt(j);
    let oe = (ie && ie.flushSync) === !0, ye = p || h, de = Rd(
      C.location,
      C.matches,
      m,
      Y,
      L,
      ie?.relative
    ), he = ri(ye, de, m), ve = za(he, ye, de);
    if (ve.active && ve.matches && (he = ve.matches), !he) {
      mn(
        j,
        L,
        wn(404, { pathname: de }),
        { flushSync: oe }
      );
      return;
    }
    let { path: me, submission: we, error: Se } = $g(
      !0,
      de,
      ie
    );
    if (Se) {
      mn(j, L, Se, { flushSync: oe });
      return;
    }
    let qe = t.getContext ? await t.getContext() : new kg(), Ne = (ie && ie.preventScrollReset) === !0;
    if (we && Yt(we.formMethod)) {
      await Du(
        j,
        L,
        me,
        he,
        qe,
        ve.active,
        oe,
        Ne,
        we,
        ie && ie.unstable_defaultShouldRevalidate
      );
      return;
    }
    ce.set(j, { routeId: L, path: me }), await Ft(
      j,
      L,
      me,
      he,
      qe,
      ve.active,
      oe,
      Ne,
      we
    );
  }
  async function Du(j, L, Y, ie, oe, ye, de, he, ve, me) {
    Da(), ce.delete(j);
    let we = C.fetchers.get(j);
    Nn(j, Aw(ve, we), {
      flushSync: de
    });
    let Se = new AbortController(), qe = zl(
      t.history,
      Y,
      Se.signal,
      ve
    );
    if (ye) {
      let it = await Pn(
        ie,
        new URL(qe.url).pathname,
        qe.signal,
        j
      );
      if (it.type === "aborted")
        return;
      if (it.type === "error") {
        mn(j, L, it.error, { flushSync: de });
        return;
      } else if (it.matches)
        ie = it.matches;
      else {
        mn(
          j,
          L,
          wn(404, { pathname: Y }),
          { flushSync: de }
        );
        return;
      }
    }
    let Ne = Xo(ie, Y);
    if (!Ne.route.action && !Ne.route.lazy) {
      let it = wn(405, {
        method: ve.formMethod,
        pathname: Y,
        routeId: L
      });
      mn(j, L, it, { flushSync: de });
      return;
    }
    ne.set(j, Se);
    let et = fe, Qe = Hl(
      c,
      f,
      qe,
      Y,
      ie,
      Ne,
      s,
      oe
    ), ct = await ja(
      qe,
      Y,
      Qe,
      oe,
      j
    ), Le = ct[Ne.route.id];
    if (!Le) {
      for (let it of Qe)
        if (ct[it.route.id]) {
          Le = ct[it.route.id];
          break;
        }
    }
    if (qe.signal.aborted) {
      ne.get(j) === Se && ne.delete(j);
      return;
    }
    if (Re.has(j)) {
      if (Bi(Le) || dn(Le)) {
        Nn(j, Ta(void 0));
        return;
      }
    } else {
      if (Bi(Le))
        if (ne.delete(j), M > et) {
          Nn(j, Ta(void 0));
          return;
        } else
          return se.add(j), Nn(j, kr(ve)), aa(qe, Le, !1, {
            fetcherSubmission: ve,
            preventScrollReset: he
          });
      if (dn(Le)) {
        mn(j, L, Le.error);
        return;
      }
    }
    let St = C.navigation.location || C.location, at = zl(
      t.history,
      St,
      Se.signal
    ), _a = p || h, _n = C.navigation.state !== "idle" ? ri(_a, C.navigation.location, m) : C.matches;
    _e(_n, "Didn't find any matches after fetcher action");
    let Nt = ++fe;
    K.set(j, Nt);
    let Yn = kr(ve, Le.data);
    C.fetchers.set(j, Yn);
    let { dsMatches: yi, revalidatingFetchers: Fn } = Xg(
      at,
      oe,
      c,
      f,
      t.history,
      C,
      _n,
      ve,
      St,
      s,
      !1,
      H,
      J,
      Re,
      ce,
      se,
      _a,
      m,
      t.patchRoutesOnNavigation != null,
      [Ne.route.id, Le],
      me
    );
    Fn.filter((it) => it.key !== j).forEach((it) => {
      let Qi = it.key, Zi = C.fetchers.get(Qi), Es = kr(
        void 0,
        Zi ? Zi.data : void 0
      );
      C.fetchers.set(Qi, Es), Dt(Qi), it.controller && ne.set(Qi, it.controller);
    }), yt({ fetchers: new Map(C.fetchers) });
    let gi = () => Fn.forEach((it) => Dt(it.key));
    Se.signal.addEventListener(
      "abort",
      gi
    );
    let { loaderResults: Ki, fetcherResults: ze } = await Il(
      yi,
      Fn,
      at,
      St,
      oe
    );
    if (Se.signal.aborted)
      return;
    if (Se.signal.removeEventListener(
      "abort",
      gi
    ), K.delete(j), ne.delete(j), Fn.forEach((it) => ne.delete(it.key)), C.fetchers.has(j)) {
      let it = Ta(Le.data);
      C.fetchers.set(j, it);
    }
    let gt = Lo(Ki);
    if (gt)
      return aa(
        at,
        gt.result,
        !1,
        { preventScrollReset: he }
      );
    if (gt = Lo(ze), gt)
      return se.add(gt.key), aa(
        at,
        gt.result,
        !1,
        { preventScrollReset: he }
      );
    let { loaderData: qt, errors: Et } = tv(
      C,
      _n,
      Ki,
      void 0,
      Fn,
      ze
    );
    vs(Nt), C.navigation.state === "loading" && Nt > M ? (_e(O, "Expected pending action"), I && I.abort(), Ht(C.navigation.location, {
      matches: _n,
      loaderData: qt,
      errors: Et,
      fetchers: new Map(C.fetchers)
    })) : (yt({
      errors: Et,
      loaderData: nv(
        C.loaderData,
        qt,
        _n,
        Et
      ),
      fetchers: new Map(C.fetchers)
    }), H = !1);
  }
  async function Ft(j, L, Y, ie, oe, ye, de, he, ve) {
    let me = C.fetchers.get(j);
    Nn(
      j,
      kr(
        ve,
        me ? me.data : void 0
      ),
      { flushSync: de }
    );
    let we = new AbortController(), Se = zl(
      t.history,
      Y,
      we.signal
    );
    if (ye) {
      let Le = await Pn(
        ie,
        new URL(Se.url).pathname,
        Se.signal,
        j
      );
      if (Le.type === "aborted")
        return;
      if (Le.type === "error") {
        mn(j, L, Le.error, { flushSync: de });
        return;
      } else if (Le.matches)
        ie = Le.matches;
      else {
        mn(
          j,
          L,
          wn(404, { pathname: Y }),
          { flushSync: de }
        );
        return;
      }
    }
    let qe = Xo(ie, Y);
    ne.set(j, we);
    let Ne = fe, et = Hl(
      c,
      f,
      Se,
      Y,
      ie,
      qe,
      s,
      oe
    ), Qe = await ja(
      Se,
      Y,
      et,
      oe,
      j
    ), ct = Qe[qe.route.id];
    if (!ct) {
      for (let Le of ie)
        if (Qe[Le.route.id]) {
          ct = Qe[Le.route.id];
          break;
        }
    }
    if (ne.get(j) === we && ne.delete(j), !Se.signal.aborted) {
      if (Re.has(j)) {
        Nn(j, Ta(void 0));
        return;
      }
      if (Bi(ct))
        if (M > Ne) {
          Nn(j, Ta(void 0));
          return;
        } else {
          se.add(j), await aa(Se, ct, !1, {
            preventScrollReset: he
          });
          return;
        }
      if (dn(ct)) {
        mn(j, L, ct.error);
        return;
      }
      Nn(j, Ta(ct.data));
    }
  }
  async function aa(j, L, Y, {
    submission: ie,
    fetcherSubmission: oe,
    preventScrollReset: ye,
    replace: de
  } = {}) {
    Y || (X?.resolve(), X = null), L.response.headers.has("X-Remix-Revalidate") && (H = !0);
    let he = L.response.headers.get("Location");
    _e(he, "Expected a Location header on the redirect Response"), he = Wg(
      he,
      new URL(j.url),
      m,
      t.history
    );
    let ve = wd(C.location, he, {
      _isRedirect: !0
    });
    if (l) {
      let et = !1;
      if (L.response.headers.has("X-Remix-Reload-Document"))
        et = !0;
      else if (th(he)) {
        const Qe = TT(he, !0);
        et = // Hard reload if it's an absolute URL to a new origin
        Qe.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        jn(Qe.pathname, m) == null;
      }
      if (et) {
        de ? a.location.replace(he) : a.location.assign(he);
        return;
      }
    }
    I = null;
    let me = de === !0 || L.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: we, formAction: Se, formEncType: qe } = C.navigation;
    !ie && !oe && we && Se && qe && (ie = lv(C.navigation));
    let Ne = ie || oe;
    if (aw.has(L.response.status) && Ne && Yt(Ne.formMethod))
      await xe(me, ve, {
        submission: {
          ...Ne,
          formAction: he
        },
        // Preserve these flags across redirects
        preventScrollReset: ye || ae,
        enableViewTransition: Y ? le : void 0
      });
    else {
      let et = Qf(
        ve,
        ie
      );
      await xe(me, ve, {
        overrideNavigation: et,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: oe,
        // Preserve these flags across redirects
        preventScrollReset: ye || ae,
        enableViewTransition: Y ? le : void 0
      });
    }
  }
  async function ja(j, L, Y, ie, oe) {
    let ye, de = {};
    try {
      ye = await hw(
        y,
        j,
        L,
        Y,
        oe,
        ie,
        !1
      );
    } catch (he) {
      return Y.filter((ve) => ve.shouldLoad).forEach((ve) => {
        de[ve.route.id] = {
          type: "error",
          error: he
        };
      }), de;
    }
    if (j.signal.aborted)
      return de;
    if (!Yt(j.method))
      for (let he of Y) {
        if (ye[he.route.id]?.type === "error")
          break;
        !ye.hasOwnProperty(he.route.id) && !C.loaderData.hasOwnProperty(he.route.id) && (!C.errors || !C.errors.hasOwnProperty(he.route.id)) && he.shouldCallHandler() && (ye[he.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${he.route.id}`
          )
        });
      }
    for (let [he, ve] of Object.entries(ye))
      if (Tw(ve)) {
        let me = ve.result;
        de[he] = {
          type: "redirect",
          response: gw(
            me,
            j,
            he,
            Y,
            m
          )
        };
      } else
        de[he] = await yw(ve);
    return de;
  }
  async function Il(j, L, Y, ie, oe) {
    let ye = ja(
      Y,
      ie,
      j,
      oe,
      null
    ), de = Promise.all(
      L.map(async (me) => {
        if (me.matches && me.match && me.request && me.controller) {
          let Se = (await ja(
            me.request,
            me.path,
            me.matches,
            oe,
            me.key
          ))[me.match.route.id];
          return { [me.key]: Se };
        } else
          return Promise.resolve({
            [me.key]: {
              type: "error",
              error: wn(404, {
                pathname: me.path
              })
            }
          });
      })
    ), he = await ye, ve = (await de).reduce(
      (me, we) => Object.assign(me, we),
      {}
    );
    return {
      loaderResults: he,
      fetcherResults: ve
    };
  }
  function Da() {
    H = !0, ce.forEach((j, L) => {
      ne.has(L) && J.add(L), Dt(L);
    });
  }
  function Nn(j, L, Y = {}) {
    C.fetchers.set(j, L), yt(
      { fetchers: new Map(C.fetchers) },
      { flushSync: (Y && Y.flushSync) === !0 }
    );
  }
  function mn(j, L, Y, ie = {}) {
    let oe = si(C.matches, L);
    ia(j), yt(
      {
        errors: {
          [oe.route.id]: Y
        },
        fetchers: new Map(C.fetchers)
      },
      { flushSync: (ie && ie.flushSync) === !0 }
    );
  }
  function ys(j) {
    return Ee.set(j, (Ee.get(j) || 0) + 1), Re.has(j) && Re.delete(j), C.fetchers.get(j) || iw;
  }
  function Nu(j, L) {
    Dt(j, L?.reason), Nn(j, Ta(null));
  }
  function ia(j) {
    let L = C.fetchers.get(j);
    ne.has(j) && !(L && L.state === "loading" && K.has(j)) && Dt(j), ce.delete(j), K.delete(j), se.delete(j), Re.delete(j), J.delete(j), C.fetchers.delete(j);
  }
  function Gt(j) {
    let L = (Ee.get(j) || 0) - 1;
    L <= 0 ? (Ee.delete(j), Re.add(j)) : Ee.set(j, L), yt({ fetchers: new Map(C.fetchers) });
  }
  function Dt(j, L) {
    let Y = ne.get(j);
    Y && (Y.abort(L), ne.delete(j));
  }
  function kt(j) {
    for (let L of j) {
      let Y = ys(L), ie = Ta(Y.data);
      C.fetchers.set(L, ie);
    }
  }
  function gs() {
    let j = [], L = !1;
    for (let Y of se) {
      let ie = C.fetchers.get(Y);
      _e(ie, `Expected fetcher: ${Y}`), ie.state === "loading" && (se.delete(Y), j.push(Y), L = !0);
    }
    return kt(j), L;
  }
  function vs(j) {
    let L = [];
    for (let [Y, ie] of K)
      if (ie < j) {
        let oe = C.fetchers.get(Y);
        _e(oe, `Expected fetcher: ${Y}`), oe.state === "loading" && (Dt(Y), K.delete(Y), L.push(Y));
      }
    return kt(L), L.length > 0;
  }
  function zu(j, L) {
    let Y = C.blockers.get(j) || Hr;
    return De.get(j) !== L && De.set(j, L), Y;
  }
  function mi(j) {
    C.blockers.delete(j), De.delete(j);
  }
  function la(j, L) {
    let Y = C.blockers.get(j) || Hr;
    _e(
      Y.state === "unblocked" && L.state === "blocked" || Y.state === "blocked" && L.state === "blocked" || Y.state === "blocked" && L.state === "proceeding" || Y.state === "blocked" && L.state === "unblocked" || Y.state === "proceeding" && L.state === "unblocked",
      `Invalid blocker state transition: ${Y.state} -> ${L.state}`
    );
    let ie = new Map(C.blockers);
    ie.set(j, L), yt({ blockers: ie });
  }
  function pi({
    currentLocation: j,
    nextLocation: L,
    historyAction: Y
  }) {
    if (De.size === 0)
      return;
    De.size > 1 && xt(!1, "A router only supports one blocker at a time");
    let ie = Array.from(De.entries()), [oe, ye] = ie[ie.length - 1], de = C.blockers.get(oe);
    if (!(de && de.state === "proceeding") && ye({ currentLocation: j, nextLocation: L, historyAction: Y }))
      return oe;
  }
  function zn(j) {
    let L = wn(404, { pathname: j }), Y = p || h, { matches: ie, route: oe } = Oo(Y);
    return { notFoundMatches: ie, route: oe, error: L };
  }
  function Ii(j, L, Y) {
    if (w = j, D = L, R = Y || null, !B && C.navigation === Kf) {
      B = !0;
      let ie = Kl(C.location, C.matches);
      ie != null && yt({ restoreScrollPosition: ie });
    }
    return () => {
      w = null, D = null, R = null;
    };
  }
  function Na(j, L) {
    return R && R(
      j,
      L.map((ie) => jT(ie, C.loaderData))
    ) || j.key;
  }
  function _u(j, L) {
    if (w && D) {
      let Y = Na(j, L);
      w[Y] = D();
    }
  }
  function Kl(j, L) {
    if (w) {
      let Y = Na(j, L), ie = w[Y];
      if (typeof ie == "number")
        return ie;
    }
    return null;
  }
  function za(j, L, Y) {
    if (t.patchRoutesOnNavigation)
      if (j) {
        if (Object.keys(j[0].params).length > 0)
          return { active: !0, matches: $r(
            L,
            Y,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: $r(
          L,
          Y,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function Pn(j, L, Y, ie) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: j };
    let oe = j;
    for (; ; ) {
      let ye = p == null, de = p || h, he = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: Y,
          path: L,
          matches: oe,
          fetcherKey: ie,
          patch: (we, Se) => {
            Y.aborted || Ig(
              we,
              Se,
              de,
              he,
              c,
              !1
            );
          }
        });
      } catch (we) {
        return { type: "error", error: we, partialMatches: oe };
      } finally {
        ye && !Y.aborted && (h = [...h]);
      }
      if (Y.aborted)
        return { type: "aborted" };
      let ve = ri(de, L, m), me = null;
      if (ve) {
        if (Object.keys(ve[0].params).length === 0)
          return { type: "success", matches: ve };
        if (me = $r(
          de,
          L,
          m,
          !0
        ), !(me && oe.length < me.length && bs(
          oe,
          me.slice(0, oe.length)
        )))
          return { type: "success", matches: ve };
      }
      if (me || (me = $r(
        de,
        L,
        m,
        !0
      )), !me || bs(oe, me))
        return { type: "success", matches: null };
      oe = me;
    }
  }
  function bs(j, L) {
    return j.length === L.length && j.every((Y, ie) => Y.route.id === L[ie].route.id);
  }
  function xs(j) {
    f = {}, p = Wr(
      j,
      c,
      void 0,
      f
    );
  }
  function Ss(j, L, Y = !1) {
    let ie = p == null;
    Ig(
      j,
      L,
      p || h,
      f,
      c,
      Y
    ), ie && (h = [...h], yt({}));
  }
  return te = {
    get basename() {
      return m;
    },
    get future() {
      return b;
    },
    get state() {
      return C;
    },
    get routes() {
      return h;
    },
    get window() {
      return a;
    },
    initialize: ta,
    subscribe: qn,
    enableScrollRestoration: Ii,
    navigate: Aa,
    fetch: ju,
    revalidate: hi,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (j) => t.history.createHref(j),
    encodeLocation: (j) => t.history.encodeLocation(j),
    getFetcher: ys,
    resetFetcher: Nu,
    deleteFetcher: Gt,
    dispose: Ma,
    getBlocker: zu,
    deleteBlocker: mi,
    patchRoutes: Ss,
    _internalFetchControllers: ne,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: xs,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(j) {
      yt(j);
    }
  }, t.unstable_instrumentations && (te = KT(
    te,
    t.unstable_instrumentations.map((j) => j.router).filter(Boolean)
  )), te;
}
function sw(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Rd(t, a, l, s, o, c) {
  let f, h;
  if (o) {
    f = [];
    for (let m of a)
      if (f.push(m), m.route.id === o) {
        h = m;
        break;
      }
  } else
    f = a, h = a[a.length - 1];
  let p = vu(
    s || ".",
    nh(f),
    jn(t.pathname, l) || t.pathname,
    c === "path"
  );
  if (s == null && (p.search = t.search, p.hash = t.hash), (s == null || s === "" || s === ".") && h) {
    let m = rh(p.search);
    if (h.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && m) {
      let y = new URLSearchParams(p.search), b = y.getAll("index");
      y.delete("index"), b.filter((E) => E).forEach((E) => y.append("index", E));
      let x = y.toString();
      p.search = x ? `?${x}` : "";
    }
  }
  return l !== "/" && (p.pathname = PT({ basename: l, pathname: p.pathname })), Wn(p);
}
function $g(t, a, l) {
  if (!l || !sw(l))
    return { path: a };
  if (l.formMethod && !Cw(l.formMethod))
    return {
      path: a,
      error: wn(405, { method: l.formMethod })
    };
  let s = () => ({
    path: a,
    error: wn(400, { type: "invalid-body" })
  }), c = (l.formMethod || "get").toUpperCase(), f = _b(a);
  if (l.body !== void 0) {
    if (l.formEncType === "text/plain") {
      if (!Yt(c))
        return s();
      let b = typeof l.body == "string" ? l.body : l.body instanceof FormData || l.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(l.body.entries()).reduce(
          (x, [E, w]) => `${x}${E}=${w}
`,
          ""
        )
      ) : String(l.body);
      return {
        path: a,
        submission: {
          formMethod: c,
          formAction: f,
          formEncType: l.formEncType,
          formData: void 0,
          json: void 0,
          text: b
        }
      };
    } else if (l.formEncType === "application/json") {
      if (!Yt(c))
        return s();
      try {
        let b = typeof l.body == "string" ? JSON.parse(l.body) : l.body;
        return {
          path: a,
          submission: {
            formMethod: c,
            formAction: f,
            formEncType: l.formEncType,
            formData: void 0,
            json: b,
            text: void 0
          }
        };
      } catch {
        return s();
      }
    }
  }
  _e(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let h, p;
  if (l.formData)
    h = Md(l.formData), p = l.formData;
  else if (l.body instanceof FormData)
    h = Md(l.body), p = l.body;
  else if (l.body instanceof URLSearchParams)
    h = l.body, p = ev(h);
  else if (l.body == null)
    h = new URLSearchParams(), p = new FormData();
  else
    try {
      h = new URLSearchParams(l.body), p = ev(h);
    } catch {
      return s();
    }
  let m = {
    formMethod: c,
    formAction: f,
    formEncType: l && l.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (Yt(m.formMethod))
    return { path: a, submission: m };
  let y = kn(a);
  return t && y.search && rh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: Wn(y), submission: m };
}
function Xg(t, a, l, s, o, c, f, h, p, m, y, b, x, E, w, R, D, B, z, _, k) {
  let G = _ ? dn(_[1]) ? _[1].error : _[1].data : void 0, ee = o.createURL(c.location), te = o.createURL(p), C;
  if (y && c.errors) {
    let re = Object.keys(c.errors)[0];
    C = f.findIndex((U) => U.route.id === re);
  } else if (_ && dn(_[1])) {
    let re = _[0];
    C = f.findIndex((U) => U.route.id === re) - 1;
  }
  let O = _ ? _[1].statusCode : void 0, X = O && O >= 400, ae = {
    currentUrl: ee,
    currentParams: c.matches[0]?.params || {},
    nextUrl: te,
    nextParams: f[0].params,
    ...h,
    actionResult: G,
    actionStatus: O
  }, I = ls(f), le = f.map((re, U) => {
    let { route: H } = re, J = null;
    if (C != null && U > C)
      J = !1;
    else if (H.lazy)
      J = !0;
    else if (!ih(H))
      J = !1;
    else if (y) {
      let { shouldLoad: K } = Cb(
        H,
        c.loaderData,
        c.errors
      );
      J = K;
    } else ow(c.loaderData, c.matches[U], re) && (J = !0);
    if (J !== null)
      return Cd(
        l,
        s,
        t,
        p,
        I,
        re,
        m,
        a,
        J
      );
    let ne = !1;
    typeof k == "boolean" ? ne = k : X ? ne = !1 : (b || ee.pathname + ee.search === te.pathname + te.search || ee.search !== te.search || uw(c.matches[U], re)) && (ne = !0);
    let fe = {
      ...ae,
      defaultShouldRevalidate: ne
    }, M = Ir(re, fe);
    return Cd(
      l,
      s,
      t,
      p,
      I,
      re,
      m,
      a,
      M,
      fe,
      k
    );
  }), ue = [];
  return w.forEach((re, U) => {
    if (y || !f.some((ce) => ce.route.id === re.routeId) || E.has(U))
      return;
    let H = c.fetchers.get(U), J = H && H.state !== "idle" && H.data === void 0, ne = ri(D, re.path, B);
    if (!ne) {
      if (z && J)
        return;
      ue.push({
        key: U,
        routeId: re.routeId,
        path: re.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (R.has(U))
      return;
    let fe = Xo(ne, re.path), M = new AbortController(), K = zl(
      o,
      re.path,
      M.signal
    ), se = null;
    if (x.has(U))
      x.delete(U), se = Hl(
        l,
        s,
        K,
        re.path,
        ne,
        fe,
        m,
        a
      );
    else if (J)
      b && (se = Hl(
        l,
        s,
        K,
        re.path,
        ne,
        fe,
        m,
        a
      ));
    else {
      let ce;
      typeof k == "boolean" ? ce = k : X ? ce = !1 : ce = b;
      let Ee = {
        ...ae,
        defaultShouldRevalidate: ce
      };
      Ir(fe, Ee) && (se = Hl(
        l,
        s,
        K,
        re.path,
        ne,
        fe,
        m,
        a,
        Ee
      ));
    }
    se && ue.push({
      key: U,
      routeId: re.routeId,
      path: re.path,
      matches: se,
      match: fe,
      request: K,
      controller: M
    });
  }), { dsMatches: le, revalidatingFetchers: ue };
}
function ih(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Cb(t, a, l) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!ih(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && t.id in a, o = l != null && l[t.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
}
function ow(t, a, l) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    l.route.id !== a.route.id
  ), o = !t.hasOwnProperty(l.route.id);
  return s || o;
}
function uw(t, a) {
  let l = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    l != null && l.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function Ir(t, a) {
  if (t.route.shouldRevalidate) {
    let l = t.route.shouldRevalidate(a);
    if (typeof l == "boolean")
      return l;
  }
  return a.defaultShouldRevalidate;
}
function Ig(t, a, l, s, o, c) {
  let f;
  if (t) {
    let m = s[t];
    _e(
      m,
      `No route found to patch children into: routeId = ${t}`
    ), m.children || (m.children = []), f = m.children;
  } else
    f = l;
  let h = [], p = [];
  if (a.forEach((m) => {
    let y = f.find(
      (b) => Mb(m, b)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : h.push(m);
  }), h.length > 0) {
    let m = Wr(
      h,
      o,
      [t || "_", "patch", String(f?.length || "0")],
      s
    );
    f.push(...m);
  }
  if (c && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: b } = p[m], x = y, [E] = Wr(
        [b],
        o,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(x, {
        element: E.element ? E.element : x.element,
        errorElement: E.errorElement ? E.errorElement : x.errorElement,
        hydrateFallbackElement: E.hydrateFallbackElement ? E.hydrateFallbackElement : x.hydrateFallbackElement
      });
    }
}
function Mb(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (l, s) => a.children?.some((o) => Mb(l, o))
  ) ?? !1 : !1;
}
var Kg = /* @__PURE__ */ new WeakMap(), Ab = ({
  key: t,
  route: a,
  manifest: l,
  mapRouteProperties: s
}) => {
  let o = l[a.id];
  if (_e(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let c = o.lazy[t];
  if (!c)
    return;
  let f = Kg.get(o);
  f || (f = {}, Kg.set(o, f));
  let h = f[t];
  if (h)
    return h;
  let p = (async () => {
    let m = RT(t), b = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (m)
      xt(
        !m,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), f[t] = Promise.resolve();
    else if (b)
      xt(
        !1,
        `Route "${o.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let x = await c();
      x != null && (Object.assign(o, { [t]: x }), Object.assign(o, s(o)));
    }
    typeof o.lazy == "object" && (o.lazy[t] = void 0, Object.values(o.lazy).every((x) => x === void 0) && (o.lazy = void 0));
  })();
  return f[t] = p, p;
}, Qg = /* @__PURE__ */ new WeakMap();
function cw(t, a, l, s, o) {
  let c = l[t.id];
  if (_e(c, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let y = Qg.get(c);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let b = (async () => {
      _e(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let x = await t.lazy(), E = {};
      for (let w in x) {
        let R = x[w];
        if (R === void 0)
          continue;
        let D = MT(w), z = c[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        D ? xt(
          !D,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : z ? xt(
          !z,
          `Route "${c.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : E[w] = R;
      }
      Object.assign(c, E), Object.assign(c, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(c),
        lazy: void 0
      });
    })();
    return Qg.set(c, b), b.catch(() => {
    }), {
      lazyRoutePromise: b,
      lazyHandlerPromise: b
    };
  }
  let f = Object.keys(t.lazy), h = [], p;
  for (let y of f) {
    if (o && o.includes(y))
      continue;
    let b = Ab({
      key: y,
      route: t,
      manifest: l,
      mapRouteProperties: s
    });
    b && (h.push(b), y === a && (p = b));
  }
  let m = h.length > 0 ? Promise.all(h).then(() => {
  }) : void 0;
  return m?.catch(() => {
  }), p?.catch(() => {
  }), {
    lazyRoutePromise: m,
    lazyHandlerPromise: p
  };
}
async function Zg(t) {
  let a = t.matches.filter((o) => o.shouldLoad), l = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    l[a[c].route.id] = o;
  }), l;
}
async function fw(t) {
  return t.matches.some((a) => a.route.middleware) ? jb(t, () => Zg(t)) : Zg(t);
}
function jb(t, a) {
  return dw(
    t,
    a,
    (s) => {
      if (Rw(s))
        throw s;
      return s;
    },
    Sw,
    l
  );
  function l(s, o, c) {
    if (c)
      return Promise.resolve(
        Object.assign(c.value, {
          [o]: { type: "error", result: s }
        })
      );
    {
      let { matches: f } = t, h = Math.min(
        // Throwing route
        Math.max(
          f.findIndex((m) => m.route.id === o),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          f.findIndex((m) => m.shouldCallHandler()),
          0
        )
      ), p = si(
        f,
        f[h].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: s }
      });
    }
  }
}
async function dw(t, a, l, s, o) {
  let { matches: c, ...f } = t, h = c.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await Db(
    f,
    h,
    a,
    l,
    s,
    o
  );
}
async function Db(t, a, l, s, o, c, f = 0) {
  let { request: h } = t;
  if (h.signal.aborted)
    throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let p = a[f];
  if (!p)
    return await l();
  let [m, y] = p, b, x = async () => {
    if (b)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return b = { value: await Db(
        t,
        a,
        l,
        s,
        o,
        c,
        f + 1
      ) }, b.value;
    } catch (E) {
      return b = { value: await c(E, m, b) }, b.value;
    }
  };
  try {
    let E = await y(t, x), w = E != null ? s(E) : void 0;
    return o(w) ? w : b ? w ?? b.value : (b = { value: await x() }, b.value);
  } catch (E) {
    return await c(E, m, b);
  }
}
function Nb(t, a, l, s, o) {
  let c = Ab({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: t
  }), f = cw(
    s.route,
    Yt(l.method) ? "action" : "loader",
    a,
    t,
    o
  );
  return {
    middleware: c,
    route: f.lazyRoutePromise,
    handler: f.lazyHandlerPromise
  };
}
function Cd(t, a, l, s, o, c, f, h, p, m = null, y) {
  let b = !1, x = Nb(
    t,
    a,
    l,
    c,
    f
  );
  return {
    ...c,
    _lazyPromises: x,
    shouldLoad: p,
    shouldRevalidateArgs: m,
    shouldCallHandler(E) {
      return b = !0, m ? typeof y == "boolean" ? Ir(c, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof E == "boolean" ? Ir(c, {
        ...m,
        defaultShouldRevalidate: E
      }) : Ir(c, m) : p;
    },
    resolve(E) {
      let { lazy: w, loader: R, middleware: D } = c.route, B = b || p || E && !Yt(l.method) && (w || R), z = D && D.length > 0 && !R && !w;
      return B && (Yt(l.method) || !z) ? mw({
        request: l,
        path: s,
        unstable_pattern: o,
        match: c,
        lazyHandlerPromise: x?.handler,
        lazyRoutePromise: x?.route,
        handlerOverride: E,
        scopedContext: h
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Hl(t, a, l, s, o, c, f, h, p = null) {
  return o.map((m) => m.route.id !== c.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: Nb(
      t,
      a,
      l,
      m,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Cd(
    t,
    a,
    l,
    s,
    ls(o),
    m,
    f,
    h,
    !0,
    p
  ));
}
async function hw(t, a, l, s, o, c, f) {
  s.some((y) => y._lazyPromises?.middleware) && await Promise.all(s.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    unstable_url: zb(a, l),
    unstable_pattern: ls(s),
    params: s[0].params,
    context: c,
    matches: s
  }, m = await t({
    ...h,
    fetcherKey: o,
    runClientMiddleware: (y) => {
      let b = h;
      return jb(b, () => y({
        ...b,
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
      s.flatMap((y) => [
        y._lazyPromises?.handler,
        y._lazyPromises?.route
      ])
    );
  } catch {
  }
  return m;
}
async function mw({
  request: t,
  path: a,
  unstable_pattern: l,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: f,
  scopedContext: h
}) {
  let p, m, y = Yt(t.method), b = y ? "action" : "loader", x = (E) => {
    let w, R = new Promise((z, _) => w = _);
    m = () => w(), t.signal.addEventListener("abort", m);
    let D = (z) => typeof E != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${b}" [routeId: ${s.route.id}]`
      )
    ) : E(
      {
        request: t,
        unstable_url: zb(t, a),
        unstable_pattern: l,
        params: s.params,
        context: h
      },
      ...z !== void 0 ? [z] : []
    ), B = (async () => {
      try {
        return { type: "data", result: await (f ? f((_) => D(_)) : D()) };
      } catch (z) {
        return { type: "error", result: z };
      }
    })();
    return Promise.race([B, R]);
  };
  try {
    let E = y ? s.route.action : s.route.loader;
    if (o || c)
      if (E) {
        let w, [R] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          x(E).catch((D) => {
            w = D;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          c
        ]);
        if (w !== void 0)
          throw w;
        p = R;
      } else {
        await o;
        let w = y ? s.route.action : s.route.loader;
        if (w)
          [p] = await Promise.all([x(w), c]);
        else if (b === "action") {
          let R = new URL(t.url), D = R.pathname + R.search;
          throw wn(405, {
            method: t.method,
            pathname: D,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (E)
      p = await x(E);
    else {
      let w = new URL(t.url), R = w.pathname + w.search;
      throw wn(404, {
        pathname: R
      });
    }
  } catch (E) {
    return { type: "error", result: E };
  } finally {
    m && t.signal.removeEventListener("abort", m);
  }
  return p;
}
async function pw(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function yw(t) {
  let { result: a, type: l } = t;
  if (lh(a)) {
    let s;
    try {
      s = await pw(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return l === "error" ? {
      type: "error",
      error: new bu(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return l === "error" ? iv(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: xw(a),
    statusCode: es(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: es(a) ? a.status : void 0
  } : iv(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function gw(t, a, l, s, o) {
  let c = t.headers.get("Location");
  if (_e(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !th(c)) {
    let f = s.slice(
      0,
      s.findIndex((h) => h.route.id === l) + 1
    );
    c = Rd(
      new URL(a.url),
      f,
      o,
      c
    ), t.headers.set("Location", c);
  }
  return t;
}
var Jg = [
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
function Wg(t, a, l, s) {
  if (th(t)) {
    let o = t, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Jg.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let f = jn(c.pathname, l) != null;
    if (c.origin === a.origin && f)
      return ah(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(t);
    if (Jg.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function zl(t, a, l, s) {
  let o = t.createURL(_b(a)).toString(), c = { signal: l };
  if (s && Yt(s.formMethod)) {
    let { formMethod: f, formEncType: h } = s;
    c.method = f.toUpperCase(), h === "application/json" ? (c.headers = new Headers({ "Content-Type": h }), c.body = JSON.stringify(s.json)) : h === "text/plain" ? c.body = s.text : h === "application/x-www-form-urlencoded" && s.formData ? c.body = Md(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function zb(t, a) {
  let l = new URL(t.url), s = typeof a == "string" ? kn(a) : a;
  if (l.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), c = o.getAll("index");
    o.delete("index");
    for (let f of c.filter(Boolean))
      o.append("index", f);
    l.search = o.size ? `?${o.toString()}` : "";
  } else
    l.search = "";
  return l.hash = s.hash || "", l;
}
function Md(t) {
  let a = new URLSearchParams();
  for (let [l, s] of t.entries())
    a.append(l, typeof s == "string" ? s : s.name);
  return a;
}
function ev(t) {
  let a = new FormData();
  for (let [l, s] of t.entries())
    a.append(l, s);
  return a;
}
function vw(t, a, l, s = !1, o = !1) {
  let c = {}, f = null, h, p = !1, m = {}, y = l && dn(l[1]) ? l[1].error : void 0;
  return t.forEach((b) => {
    if (!(b.route.id in a))
      return;
    let x = b.route.id, E = a[x];
    if (_e(
      !Bi(E),
      "Cannot handle redirect results in processLoaderData"
    ), dn(E)) {
      let w = E.error;
      if (y !== void 0 && (w = y, y = void 0), f = f || {}, o)
        f[x] = w;
      else {
        let R = si(t, x);
        f[R.route.id] == null && (f[R.route.id] = w);
      }
      s || (c[x] = Rb), p || (p = !0, h = es(E.error) ? E.error.status : 500), E.headers && (m[x] = E.headers);
    } else
      c[x] = E.data, E.statusCode && E.statusCode !== 200 && !p && (h = E.statusCode), E.headers && (m[x] = E.headers);
  }), y !== void 0 && l && (f = { [l[0]]: y }, l[2] && (c[l[2]] = void 0)), {
    loaderData: c,
    errors: f,
    statusCode: h || 200,
    loaderHeaders: m
  };
}
function tv(t, a, l, s, o, c) {
  let { loaderData: f, errors: h } = vw(
    a,
    l,
    s
  );
  return o.filter((p) => !p.matches || p.matches.some((m) => m.shouldLoad)).forEach((p) => {
    let { key: m, match: y, controller: b } = p;
    if (b && b.signal.aborted)
      return;
    let x = c[m];
    if (_e(x, "Did not find corresponding fetcher result"), dn(x)) {
      let E = si(t.matches, y?.route.id);
      h && h[E.route.id] || (h = {
        ...h,
        [E.route.id]: x.error
      }), t.fetchers.delete(m);
    } else if (Bi(x))
      _e(!1, "Unhandled fetcher revalidation redirect");
    else {
      let E = Ta(x.data);
      t.fetchers.set(m, E);
    }
  }), { loaderData: f, errors: h };
}
function nv(t, a, l, s) {
  let o = Object.entries(a).filter(([, c]) => c !== Rb).reduce((c, [f, h]) => (c[f] = h, c), {});
  for (let c of l) {
    let f = c.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && c.route.loader && (o[f] = t[f]), s && s.hasOwnProperty(f))
      break;
  }
  return o;
}
function av(t) {
  return t ? dn(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function si(t, a) {
  return (a ? t.slice(0, t.findIndex((s) => s.route.id === a) + 1) : [...t]).reverse().find((s) => s.route.hasErrorBoundary === !0) || t[0];
}
function Oo(t) {
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
function wn(t, {
  pathname: a,
  routeId: l,
  method: s,
  type: o,
  message: c
} = {}) {
  let f = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return t === 400 ? (f = "Bad Request", s && a && l ? h = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${l}", so there is no way to handle the request.` : o === "invalid-body" && (h = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", h = `Route "${l}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", h = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", s && a && l ? h = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${l}", so there is no way to handle the request.` : s && (h = `Invalid request method "${s.toUpperCase()}"`)), new bu(
    t || 500,
    f,
    new Error(h),
    !0
  );
}
function Lo(t) {
  let a = Object.entries(t);
  for (let l = a.length - 1; l >= 0; l--) {
    let [s, o] = a[l];
    if (Bi(o))
      return { key: s, result: o };
  }
}
function _b(t) {
  let a = typeof t == "string" ? kn(t) : t;
  return Wn({ ...a, hash: "" });
}
function bw(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function xw(t) {
  return new bu(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function Sw(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, l]) => typeof a == "string" && Ew(l)
  );
}
function Ew(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function Tw(t) {
  return lh(t.result) && Tb.has(t.result.status);
}
function dn(t) {
  return t.type === "error";
}
function Bi(t) {
  return (t && t.type) === "redirect";
}
function iv(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function lh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function ww(t) {
  return Tb.has(t);
}
function Rw(t) {
  return lh(t) && ww(t.status) && t.headers.has("Location");
}
function Cw(t) {
  return nw.has(t.toUpperCase());
}
function Yt(t) {
  return ew.has(t.toUpperCase());
}
function rh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function Xo(t, a) {
  let l = typeof a == "string" ? kn(a).search : a.search;
  if (t[t.length - 1].route.index && rh(l || ""))
    return t[t.length - 1];
  let s = vb(t);
  return s[s.length - 1];
}
function lv(t) {
  let { formMethod: a, formAction: l, formEncType: s, text: o, formData: c, json: f } = t;
  if (!(!a || !l || !s)) {
    if (o != null)
      return {
        formMethod: a,
        formAction: l,
        formEncType: s,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (c != null)
      return {
        formMethod: a,
        formAction: l,
        formEncType: s,
        formData: c,
        json: void 0,
        text: void 0
      };
    if (f !== void 0)
      return {
        formMethod: a,
        formAction: l,
        formEncType: s,
        formData: void 0,
        json: f,
        text: void 0
      };
  }
}
function Qf(t, a) {
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
function Mw(t, a) {
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
function kr(t, a) {
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
function Aw(t, a) {
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
function Ta(t) {
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
function jw(t, a) {
  try {
    let l = t.sessionStorage.getItem(
      wb
    );
    if (l) {
      let s = JSON.parse(l);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function Dw(t, a) {
  if (a.size > 0) {
    let l = {};
    for (let [s, o] of a)
      l[s] = [...o];
    try {
      t.sessionStorage.setItem(
        wb,
        JSON.stringify(l)
      );
    } catch (s) {
      xt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function rv() {
  let t, a, l = new Promise((s, o) => {
    t = async (c) => {
      s(c);
      try {
        await l;
      } catch {
      }
    }, a = async (c) => {
      o(c);
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
var Fi = S.createContext(null);
Fi.displayName = "DataRouter";
var rs = S.createContext(null);
rs.displayName = "DataRouterState";
var Ob = S.createContext(!1);
function Lb() {
  return S.useContext(Ob);
}
var sh = S.createContext({
  isTransitioning: !1
});
sh.displayName = "ViewTransition";
var Ub = S.createContext(
  /* @__PURE__ */ new Map()
);
Ub.displayName = "Fetchers";
var Nw = S.createContext(null);
Nw.displayName = "Await";
var Dn = S.createContext(
  null
);
Dn.displayName = "Navigation";
var xu = S.createContext(
  null
);
xu.displayName = "Location";
var Ra = S.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ra.displayName = "Route";
var oh = S.createContext(null);
oh.displayName = "RouteError";
var Vb = "REACT_ROUTER_ERROR", zw = "REDIRECT", _w = "ROUTE_ERROR_RESPONSE";
function Ow(t) {
  if (t.startsWith(`${Vb}:${zw}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function Lw(t) {
  if (t.startsWith(
    `${Vb}:${_w}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new bu(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function Uw(t, { relative: a } = {}) {
  _e(
    ss(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: l, navigator: s } = S.useContext(Dn), { hash: o, pathname: c, search: f } = os(t, { relative: a }), h = c;
  return l !== "/" && (h = c === "/" ? l : Mn([l, c])), s.createHref({ pathname: h, search: f, hash: o });
}
function ss() {
  return S.useContext(xu) != null;
}
function Ca() {
  return _e(
    ss(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), S.useContext(xu).location;
}
var Bb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Hb(t) {
  S.useContext(Dn).static || S.useLayoutEffect(t);
}
function Gi() {
  let { isDataRoute: t } = S.useContext(Ra);
  return t ? Iw() : Vw();
}
function Vw() {
  _e(
    ss(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = S.useContext(Fi), { basename: a, navigator: l } = S.useContext(Dn), { matches: s } = S.useContext(Ra), { pathname: o } = Ca(), c = JSON.stringify(nh(s)), f = S.useRef(!1);
  return Hb(() => {
    f.current = !0;
  }), S.useCallback(
    (p, m = {}) => {
      if (xt(f.current, Bb), !f.current) return;
      if (typeof p == "number") {
        l.go(p);
        return;
      }
      let y = vu(
        p,
        JSON.parse(c),
        o,
        m.relative === "path"
      );
      t == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : Mn([a, y.pathname])), (m.replace ? l.replace : l.push)(
        y,
        m.state,
        m
      );
    },
    [
      a,
      l,
      c,
      o,
      t
    ]
  );
}
S.createContext(null);
function os(t, { relative: a } = {}) {
  let { matches: l } = S.useContext(Ra), { pathname: s } = Ca(), o = JSON.stringify(nh(l));
  return S.useMemo(
    () => vu(
      t,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [t, o, s, a]
  );
}
function Bw(t, a, l) {
  _e(
    ss(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = S.useContext(Dn), { matches: o } = S.useContext(Ra), c = o[o.length - 1], f = c ? c.params : {}, h = c ? c.pathname : "/", p = c ? c.pathnameBase : "/", m = c && c.route;
  {
    let D = m && m.path || "";
    Pb(
      h,
      !m || D.endsWith("*") || D.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${D}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${D}"> to <Route path="${D === "/" ? "*" : `${D}/*`}">.`
    );
  }
  let y = Ca(), b;
  b = y;
  let x = b.pathname || "/", E = x;
  if (p !== "/") {
    let D = p.replace(/^\//, "").split("/");
    E = "/" + x.replace(/^\//, "").split("/").slice(D.length).join("/");
  }
  let w = ri(t, { pathname: E });
  return xt(
    m || w != null,
    `No routes matched location "${b.pathname}${b.search}${b.hash}" `
  ), xt(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), Yw(
    w && w.map(
      (D) => Object.assign({}, D, {
        params: Object.assign({}, f, D.params),
        pathname: Mn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            D.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : D.pathname
        ]),
        pathnameBase: D.pathnameBase === "/" ? p : Mn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            D.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : D.pathnameBase
        ])
      })
    ),
    o,
    l
  );
}
function Hw() {
  let t = Xw(), a = es(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), l = t instanceof Error ? t.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ S.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ S.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ S.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ S.createElement("h3", { style: { fontStyle: "italic" } }, a), l ? /* @__PURE__ */ S.createElement("pre", { style: o }, l) : null, f);
}
var kw = /* @__PURE__ */ S.createElement(Hw, null), kb = class extends S.Component {
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
      const l = Lw(t.digest);
      l && (t = l);
    }
    let a = t !== void 0 ? /* @__PURE__ */ S.createElement(Ra.Provider, { value: this.props.routeContext }, /* @__PURE__ */ S.createElement(
      oh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ S.createElement(qw, { error: t }, a) : a;
  }
};
kb.contextType = Ob;
var Zf = /* @__PURE__ */ new WeakMap();
function qw({
  children: t,
  error: a
}) {
  let { basename: l } = S.useContext(Dn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = Ow(a.digest);
    if (s) {
      let o = Zf.get(a);
      if (o) throw o;
      let c = xb(s.location, l);
      if (bb && !Zf.get(a))
        if (c.isExternal || s.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const f = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(c.to, {
              replace: s.replace
            })
          );
          throw Zf.set(a, f), f;
        }
      return /* @__PURE__ */ S.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${c.absoluteURL || c.to}`
        }
      );
    }
  }
  return t;
}
function Pw({ routeContext: t, match: a, children: l }) {
  let s = S.useContext(Fi);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ S.createElement(Ra.Provider, { value: t }, l);
}
function Yw(t, a = [], l) {
  let s = l?.state;
  if (t == null) {
    if (!s)
      return null;
    if (s.errors)
      t = s.matches;
    else if (a.length === 0 && !s.initialized && s.matches.length > 0)
      t = s.matches;
    else
      return null;
  }
  let o = t, c = s?.errors;
  if (c != null) {
    let y = o.findIndex(
      (b) => b.route.id && c?.[b.route.id] !== void 0
    );
    _e(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        c
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, y + 1)
    );
  }
  let f = !1, h = -1;
  if (l && s) {
    f = s.renderFallback;
    for (let y = 0; y < o.length; y++) {
      let b = o[y];
      if ((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (h = y), b.route.id) {
        let { loaderData: x, errors: E } = s, w = b.route.loader && !x.hasOwnProperty(b.route.id) && (!E || E[b.route.id] === void 0);
        if (b.route.lazy || w) {
          l.isStatic && (f = !0), h >= 0 ? o = o.slice(0, h + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let p = l?.onError, m = s && p ? (y, b) => {
    p(y, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: ls(s.matches),
      errorInfo: b
    });
  } : void 0;
  return o.reduceRight(
    (y, b, x) => {
      let E, w = !1, R = null, D = null;
      s && (E = c && b.route.id ? c[b.route.id] : void 0, R = b.route.errorElement || kw, f && (h < 0 && x === 0 ? (Pb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, D = null) : h === x && (w = !0, D = b.route.hydrateFallbackElement || null)));
      let B = a.concat(o.slice(0, x + 1)), z = () => {
        let _;
        return E ? _ = R : w ? _ = D : b.route.Component ? _ = /* @__PURE__ */ S.createElement(b.route.Component, null) : b.route.element ? _ = b.route.element : _ = y, /* @__PURE__ */ S.createElement(
          Pw,
          {
            match: b,
            routeContext: {
              outlet: y,
              matches: B,
              isDataRoute: s != null
            },
            children: _
          }
        );
      };
      return s && (b.route.ErrorBoundary || b.route.errorElement || x === 0) ? /* @__PURE__ */ S.createElement(
        kb,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: R,
          error: E,
          children: z(),
          routeContext: { outlet: null, matches: B, isDataRoute: !0 },
          onError: m
        }
      ) : z();
    },
    null
  );
}
function uh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Fw(t) {
  let a = S.useContext(Fi);
  return _e(a, uh(t)), a;
}
function qb(t) {
  let a = S.useContext(rs);
  return _e(a, uh(t)), a;
}
function Gw(t) {
  let a = S.useContext(Ra);
  return _e(a, uh(t)), a;
}
function Su(t) {
  let a = Gw(t), l = a.matches[a.matches.length - 1];
  return _e(
    l.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), l.route.id;
}
function $w() {
  return Su(
    "useRouteId"
    /* UseRouteId */
  );
}
function us() {
  let t = qb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Su(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function Xw() {
  let t = S.useContext(oh), a = qb(
    "useRouteError"
    /* UseRouteError */
  ), l = Su(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[l];
}
function Iw() {
  let { router: t } = Fw(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Su(
    "useNavigate"
    /* UseNavigateStable */
  ), l = S.useRef(!1);
  return Hb(() => {
    l.current = !0;
  }), S.useCallback(
    async (o, c = {}) => {
      xt(l.current, Bb), l.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...c }));
    },
    [t, a]
  );
}
var sv = {};
function Pb(t, a, l) {
  !a && !sv[t] && (sv[t] = !0, xt(!1, l));
}
var ov = {};
function uv(t, a) {
  !t && !ov[a] && (ov[a] = !0, console.warn(a));
}
var Kw = "useOptimistic", cv = fT[Kw], Qw = () => {
};
function Zw(t) {
  return cv ? cv(t) : [t, Qw];
}
function Jw(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && xt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: S.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && xt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: S.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && xt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: S.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var Ww = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function eR(t, a) {
  return rw({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: ST({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: Ww,
    mapRouteProperties: Jw,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var tR = class {
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
function nR({
  router: t,
  flushSync: a,
  onError: l,
  unstable_useTransitions: s
}) {
  s = Lb() || s;
  let [c, f] = S.useState(t.state), [h, p] = Zw(c), [m, y] = S.useState(), [b, x] = S.useState({
    isTransitioning: !1
  }), [E, w] = S.useState(), [R, D] = S.useState(), [B, z] = S.useState(), _ = S.useRef(/* @__PURE__ */ new Map()), k = S.useCallback(
    (O, { deletedFetchers: X, newErrors: ae, flushSync: I, viewTransitionOpts: le }) => {
      ae && l && Object.values(ae).forEach(
        (re) => l(re, {
          location: O.location,
          params: O.matches[0]?.params ?? {},
          unstable_pattern: ls(O.matches)
        })
      ), O.fetchers.forEach((re, U) => {
        re.data !== void 0 && _.current.set(U, re.data);
      }), X.forEach((re) => _.current.delete(re)), uv(
        I === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ue = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (uv(
        le == null || ue,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !le || !ue) {
        a && I ? a(() => f(O)) : s === !1 ? f(O) : S.startTransition(() => {
          s === !0 && p((re) => fv(re, O)), f(O);
        });
        return;
      }
      if (a && I) {
        a(() => {
          R && (E?.resolve(), R.skipTransition()), x({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: le.currentLocation,
            nextLocation: le.nextLocation
          });
        });
        let re = t.window.document.startViewTransition(() => {
          a(() => f(O));
        });
        re.finished.finally(() => {
          a(() => {
            w(void 0), D(void 0), y(void 0), x({ isTransitioning: !1 });
          });
        }), a(() => D(re));
        return;
      }
      R ? (E?.resolve(), R.skipTransition(), z({
        state: O,
        currentLocation: le.currentLocation,
        nextLocation: le.nextLocation
      })) : (y(O), x({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: le.currentLocation,
        nextLocation: le.nextLocation
      }));
    },
    [
      t.window,
      a,
      R,
      E,
      s,
      p,
      l
    ]
  );
  S.useLayoutEffect(() => t.subscribe(k), [t, k]);
  let G = h.initialized;
  S.useLayoutEffect(() => {
    !G && t.state.initialized && k(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [G, k, t.state]), S.useEffect(() => {
    b.isTransitioning && !b.flushSync && w(new tR());
  }, [b]), S.useEffect(() => {
    if (E && m && t.window) {
      let O = m, X = E.promise, ae = t.window.document.startViewTransition(async () => {
        s === !1 ? f(O) : S.startTransition(() => {
          s === !0 && p((I) => fv(I, O)), f(O);
        }), await X;
      });
      ae.finished.finally(() => {
        w(void 0), D(void 0), y(void 0), x({ isTransitioning: !1 });
      }), D(ae);
    }
  }, [
    m,
    E,
    t.window,
    s,
    p
  ]), S.useEffect(() => {
    E && m && h.location.key === m.location.key && E.resolve();
  }, [E, R, h.location, m]), S.useEffect(() => {
    !b.isTransitioning && B && (y(B.state), x({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: B.currentLocation,
      nextLocation: B.nextLocation
    }), z(void 0));
  }, [b.isTransitioning, B]);
  let ee = S.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (O) => t.navigate(O),
    push: (O, X, ae) => t.navigate(O, {
      state: X,
      preventScrollReset: ae?.preventScrollReset
    }),
    replace: (O, X, ae) => t.navigate(O, {
      replace: !0,
      state: X,
      preventScrollReset: ae?.preventScrollReset
    })
  }), [t]), te = t.basename || "/", C = S.useMemo(
    () => ({
      router: t,
      navigator: ee,
      static: !1,
      basename: te,
      onError: l
    }),
    [t, ee, te, l]
  );
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(Fi.Provider, { value: C }, /* @__PURE__ */ S.createElement(rs.Provider, { value: h }, /* @__PURE__ */ S.createElement(Ub.Provider, { value: _.current }, /* @__PURE__ */ S.createElement(sh.Provider, { value: b }, /* @__PURE__ */ S.createElement(
    lR,
    {
      basename: te,
      location: h.location,
      navigationType: h.historyAction,
      navigator: ee,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ S.createElement(
      aR,
      {
        routes: t.routes,
        future: t.future,
        state: h,
        isStatic: !1,
        onError: l
      }
    )
  ))))), null);
}
function fv(t, a) {
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
var aR = S.memo(iR);
function iR({
  routes: t,
  future: a,
  state: l,
  isStatic: s,
  onError: o
}) {
  return Bw(t, void 0, { state: l, isStatic: s, onError: o });
}
function lR({
  basename: t = "/",
  children: a = null,
  location: l,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: f
}) {
  _e(
    !ss(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = t.replace(/^\/*/, "/"), p = S.useMemo(
    () => ({
      basename: h,
      navigator: o,
      static: c,
      unstable_useTransitions: f,
      future: {}
    }),
    [h, o, c, f]
  );
  typeof l == "string" && (l = kn(l));
  let {
    pathname: m = "/",
    search: y = "",
    hash: b = "",
    state: x = null,
    key: E = "default",
    unstable_mask: w
  } = l, R = S.useMemo(() => {
    let D = jn(m, h);
    return D == null ? null : {
      location: {
        pathname: D,
        search: y,
        hash: b,
        state: x,
        key: E,
        unstable_mask: w
      },
      navigationType: s
    };
  }, [
    h,
    m,
    y,
    b,
    x,
    E,
    s,
    w
  ]);
  return xt(
    R != null,
    `<Router basename="${h}"> is not able to match the URL "${m}${y}${b}" because it does not start with the basename, so the <Router> won't render anything.`
  ), R == null ? null : /* @__PURE__ */ S.createElement(Dn.Provider, { value: p }, /* @__PURE__ */ S.createElement(xu.Provider, { children: a, value: R }));
}
var Io = "get", Ko = "application/x-www-form-urlencoded";
function Eu(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function rR(t) {
  return Eu(t) && t.tagName.toLowerCase() === "button";
}
function sR(t) {
  return Eu(t) && t.tagName.toLowerCase() === "form";
}
function oR(t) {
  return Eu(t) && t.tagName.toLowerCase() === "input";
}
function uR(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function cR(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !uR(t);
}
var Uo = null;
function fR() {
  if (Uo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Uo = !1;
    } catch {
      Uo = !0;
    }
  return Uo;
}
var dR = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Jf(t) {
  return t != null && !dR.has(t) ? (xt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ko}"`
  ), null) : t;
}
function hR(t, a) {
  let l, s, o, c, f;
  if (sR(t)) {
    let h = t.getAttribute("action");
    s = h ? jn(h, a) : null, l = t.getAttribute("method") || Io, o = Jf(t.getAttribute("enctype")) || Ko, c = new FormData(t);
  } else if (rR(t) || oR(t) && (t.type === "submit" || t.type === "image")) {
    let h = t.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = t.getAttribute("formaction") || h.getAttribute("action");
    if (s = p ? jn(p, a) : null, l = t.getAttribute("formmethod") || h.getAttribute("method") || Io, o = Jf(t.getAttribute("formenctype")) || Jf(h.getAttribute("enctype")) || Ko, c = new FormData(h, t), !fR()) {
      let { name: m, type: y, value: b } = t;
      if (y === "image") {
        let x = m ? `${m}.` : "";
        c.append(`${x}x`, "0"), c.append(`${x}y`, "0");
      } else m && c.append(m, b);
    }
  } else {
    if (Eu(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    l = Io, s = null, o = Ko, f = t;
  }
  return c && o === "text/plain" && (f = c, c = void 0), { action: s, method: l.toLowerCase(), encType: o, formData: c, body: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function ch(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Yb(t, a, l, s) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return l ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && jn(o.pathname, a) === "/" ? o.pathname = `${ru(a)}/_root.${s}` : o.pathname = `${ru(o.pathname)}.${s}`, o;
}
async function mR(t, a) {
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
function pR(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function yR(t, a, l) {
  let s = await Promise.all(
    t.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let f = await mR(c, l);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return xR(
    s.flat(1).filter(pR).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function dv(t, a, l, s, o, c) {
  let f = (p, m) => l[m] ? p.route.id !== l[m].route.id : !0, h = (p, m) => (
    // param change, /users/123 -> /users/456
    l[m].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    l[m].route.path?.endsWith("*") && l[m].params["*"] !== p.params["*"]
  );
  return c === "assets" ? a.filter(
    (p, m) => f(p, m) || h(p, m)
  ) : c === "data" ? a.filter((p, m) => {
    let y = s.routes[p.route.id];
    if (!y || !y.hasLoader)
      return !1;
    if (f(p, m) || h(p, m))
      return !0;
    if (p.route.shouldRevalidate) {
      let b = p.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: l[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: p.params,
        defaultShouldRevalidate: !0
      });
      if (typeof b == "boolean")
        return b;
    }
    return !0;
  }) : [];
}
function gR(t, a, { includeHydrateFallback: l } = {}) {
  return vR(
    t.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), l && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function vR(t) {
  return [...new Set(t)];
}
function bR(t) {
  let a = {}, l = Object.keys(t).sort();
  for (let s of l)
    a[s] = t[s];
  return a;
}
function xR(t, a) {
  let l = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((s, o) => {
    let c = JSON.stringify(bR(o));
    return l.has(c) || (l.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function fh() {
  let t = S.useContext(Fi);
  return ch(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function SR() {
  let t = S.useContext(rs);
  return ch(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var dh = S.createContext(void 0);
dh.displayName = "FrameworkContext";
function hh() {
  let t = S.useContext(dh);
  return ch(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function ER(t, a) {
  let l = S.useContext(dh), [s, o] = S.useState(!1), [c, f] = S.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: b } = a, x = S.useRef(null);
  S.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let R = (B) => {
        B.forEach((z) => {
          f(z.isIntersecting);
        });
      }, D = new IntersectionObserver(R, { threshold: 0.5 });
      return x.current && D.observe(x.current), () => {
        D.disconnect();
      };
    }
  }, [t]), S.useEffect(() => {
    if (s) {
      let R = setTimeout(() => {
        f(!0);
      }, 100);
      return () => {
        clearTimeout(R);
      };
    }
  }, [s]);
  let E = () => {
    o(!0);
  }, w = () => {
    o(!1), f(!1);
  };
  return l ? t !== "intent" ? [c, x, {}] : [
    c,
    x,
    {
      onFocus: qr(h, E),
      onBlur: qr(p, w),
      onMouseEnter: qr(m, E),
      onMouseLeave: qr(y, w),
      onTouchStart: qr(b, E)
    }
  ] : [!1, x, {}];
}
function qr(t, a) {
  return (l) => {
    t && t(l), l.defaultPrevented || a(l);
  };
}
function TR({ page: t, ...a }) {
  let l = Lb(), { router: s } = fh(), o = S.useMemo(
    () => ri(s.routes, t, s.basename),
    [s.routes, t, s.basename]
  );
  return o ? l ? /* @__PURE__ */ S.createElement(RR, { page: t, matches: o, ...a }) : /* @__PURE__ */ S.createElement(CR, { page: t, matches: o, ...a }) : null;
}
function wR(t) {
  let { manifest: a, routeModules: l } = hh(), [s, o] = S.useState([]);
  return S.useEffect(() => {
    let c = !1;
    return yR(t, a, l).then(
      (f) => {
        c || o(f);
      }
    ), () => {
      c = !0;
    };
  }, [t, a, l]), s;
}
function RR({
  page: t,
  matches: a,
  ...l
}) {
  let s = Ca(), { future: o } = hh(), { basename: c } = fh(), f = S.useMemo(() => {
    if (t === s.pathname + s.search + s.hash)
      return [];
    let h = Yb(
      t,
      c,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), p = !1, m = [];
    for (let y of a)
      typeof y.route.shouldRevalidate == "function" ? p = !0 : m.push(y.route.id);
    return p && m.length > 0 && h.searchParams.set("_routes", m.join(",")), [h.pathname + h.search];
  }, [
    c,
    o.unstable_trailingSlashAwareDataRequests,
    t,
    s,
    a
  ]);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, f.map((h) => /* @__PURE__ */ S.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...l })));
}
function CR({
  page: t,
  matches: a,
  ...l
}) {
  let s = Ca(), { future: o, manifest: c, routeModules: f } = hh(), { basename: h } = fh(), { loaderData: p, matches: m } = SR(), y = S.useMemo(
    () => dv(
      t,
      a,
      m,
      c,
      s,
      "data"
    ),
    [t, a, m, c, s]
  ), b = S.useMemo(
    () => dv(
      t,
      a,
      m,
      c,
      s,
      "assets"
    ),
    [t, a, m, c, s]
  ), x = S.useMemo(() => {
    if (t === s.pathname + s.search + s.hash)
      return [];
    let R = /* @__PURE__ */ new Set(), D = !1;
    if (a.forEach((z) => {
      let _ = c.routes[z.route.id];
      !_ || !_.hasLoader || (!y.some((k) => k.route.id === z.route.id) && z.route.id in p && f[z.route.id]?.shouldRevalidate || _.hasClientLoader ? D = !0 : R.add(z.route.id));
    }), R.size === 0)
      return [];
    let B = Yb(
      t,
      h,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return D && R.size > 0 && B.searchParams.set(
      "_routes",
      a.filter((z) => R.has(z.route.id)).map((z) => z.route.id).join(",")
    ), [B.pathname + B.search];
  }, [
    h,
    o.unstable_trailingSlashAwareDataRequests,
    p,
    s,
    c,
    y,
    a,
    t,
    f
  ]), E = S.useMemo(
    () => gR(b, c),
    [b, c]
  ), w = wR(b);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, x.map((R) => /* @__PURE__ */ S.createElement("link", { key: R, rel: "prefetch", as: "fetch", href: R, ...l })), E.map((R) => /* @__PURE__ */ S.createElement("link", { key: R, rel: "modulepreload", href: R, ...l })), w.map(({ key: R, link: D }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ S.createElement(
      "link",
      {
        key: R,
        nonce: l.nonce,
        ...D,
        crossOrigin: D.crossOrigin ?? l.crossOrigin
      }
    )
  )));
}
function MR(...t) {
  return (a) => {
    t.forEach((l) => {
      typeof l == "function" ? l(a) : l != null && (l.current = a);
    });
  };
}
var AR = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  AR && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Fb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, cs = S.forwardRef(
  function({
    onClick: a,
    discover: l = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: c,
    replace: f,
    unstable_mask: h,
    state: p,
    target: m,
    to: y,
    preventScrollReset: b,
    viewTransition: x,
    unstable_defaultShouldRevalidate: E,
    ...w
  }, R) {
    let { basename: D, navigator: B, unstable_useTransitions: z } = S.useContext(Dn), _ = typeof y == "string" && Fb.test(y), k = xb(y, D);
    y = k.to;
    let G = Uw(y, { relative: o }), ee = Ca(), te = null;
    if (h) {
      let re = vu(
        h,
        [],
        ee.unstable_mask ? ee.unstable_mask.pathname : "/",
        !0
      );
      D !== "/" && (re.pathname = re.pathname === "/" ? D : Mn([D, re.pathname])), te = B.createHref(re);
    }
    let [C, O, X] = ER(
      s,
      w
    ), ae = zR(y, {
      replace: f,
      unstable_mask: h,
      state: p,
      target: m,
      preventScrollReset: b,
      relative: o,
      viewTransition: x,
      unstable_defaultShouldRevalidate: E,
      unstable_useTransitions: z
    });
    function I(re) {
      a && a(re), re.defaultPrevented || ae(re);
    }
    let le = !(k.isExternal || c), ue = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ S.createElement(
        "a",
        {
          ...w,
          ...X,
          href: (le ? te : void 0) || k.absoluteURL || G,
          onClick: le ? I : a,
          ref: MR(R, O),
          target: m,
          "data-discover": !_ && l === "render" ? "true" : void 0
        }
      )
    );
    return C && !_ ? /* @__PURE__ */ S.createElement(S.Fragment, null, ue, /* @__PURE__ */ S.createElement(TR, { page: G })) : ue;
  }
);
cs.displayName = "Link";
var jR = S.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: l = !1,
    className: s = "",
    end: o = !1,
    style: c,
    to: f,
    viewTransition: h,
    children: p,
    ...m
  }, y) {
    let b = os(f, { relative: m.relative }), x = Ca(), E = S.useContext(rs), { navigator: w, basename: R } = S.useContext(Dn), D = E != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    VR(b) && h === !0, B = w.encodeLocation ? w.encodeLocation(b).pathname : b.pathname, z = x.pathname, _ = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
    l || (z = z.toLowerCase(), _ = _ ? _.toLowerCase() : null, B = B.toLowerCase()), _ && R && (_ = jn(_, R) || _);
    const k = B !== "/" && B.endsWith("/") ? B.length - 1 : B.length;
    let G = z === B || !o && z.startsWith(B) && z.charAt(k) === "/", ee = _ != null && (_ === B || !o && _.startsWith(B) && _.charAt(B.length) === "/"), te = {
      isActive: G,
      isPending: ee,
      isTransitioning: D
    }, C = G ? a : void 0, O;
    typeof s == "function" ? O = s(te) : O = [
      s,
      G ? "active" : null,
      ee ? "pending" : null,
      D ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let X = typeof c == "function" ? c(te) : c;
    return /* @__PURE__ */ S.createElement(
      cs,
      {
        ...m,
        "aria-current": C,
        className: O,
        ref: y,
        style: X,
        to: f,
        viewTransition: h
      },
      typeof p == "function" ? p(te) : p
    );
  }
);
jR.displayName = "NavLink";
var DR = S.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: l,
    reloadDocument: s,
    replace: o,
    state: c,
    method: f = Io,
    action: h,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: b,
    unstable_defaultShouldRevalidate: x,
    ...E
  }, w) => {
    let { unstable_useTransitions: R } = S.useContext(Dn), D = LR(), B = UR(h, { relative: m }), z = f.toLowerCase() === "get" ? "get" : "post", _ = typeof h == "string" && Fb.test(h), k = (G) => {
      if (p && p(G), G.defaultPrevented) return;
      G.preventDefault();
      let ee = G.nativeEvent.submitter, te = ee?.getAttribute("formmethod") || f, C = () => D(ee || G.currentTarget, {
        fetcherKey: a,
        method: te,
        navigate: l,
        replace: o,
        state: c,
        relative: m,
        preventScrollReset: y,
        viewTransition: b,
        unstable_defaultShouldRevalidate: x
      });
      R && l !== !1 ? S.startTransition(() => C()) : C();
    };
    return /* @__PURE__ */ S.createElement(
      "form",
      {
        ref: w,
        method: z,
        action: B,
        onSubmit: s ? p : k,
        ...E,
        "data-discover": !_ && t === "render" ? "true" : void 0
      }
    );
  }
);
DR.displayName = "Form";
function NR(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Gb(t) {
  let a = S.useContext(Fi);
  return _e(a, NR(t)), a;
}
function zR(t, {
  target: a,
  replace: l,
  unstable_mask: s,
  state: o,
  preventScrollReset: c,
  relative: f,
  viewTransition: h,
  unstable_defaultShouldRevalidate: p,
  unstable_useTransitions: m
} = {}) {
  let y = Gi(), b = Ca(), x = os(t, { relative: f });
  return S.useCallback(
    (E) => {
      if (cR(E, a)) {
        E.preventDefault();
        let w = l !== void 0 ? l : Wn(b) === Wn(x), R = () => y(t, {
          replace: w,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: f,
          viewTransition: h,
          unstable_defaultShouldRevalidate: p
        });
        m ? S.startTransition(() => R()) : R();
      }
    },
    [
      b,
      y,
      x,
      l,
      s,
      o,
      a,
      t,
      c,
      f,
      h,
      p,
      m
    ]
  );
}
var _R = 0, OR = () => `__${String(++_R)}__`;
function LR() {
  let { router: t } = Gb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = S.useContext(Dn), l = $w(), s = t.fetch, o = t.navigate;
  return S.useCallback(
    async (c, f = {}) => {
      let { action: h, method: p, encType: m, formData: y, body: b } = hR(
        c,
        a
      );
      if (f.navigate === !1) {
        let x = f.fetcherKey || OR();
        await s(x, l, f.action || h, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: y,
          body: b,
          formMethod: f.method || p,
          formEncType: f.encType || m,
          flushSync: f.flushSync
        });
      } else
        await o(f.action || h, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: y,
          body: b,
          formMethod: f.method || p,
          formEncType: f.encType || m,
          replace: f.replace,
          state: f.state,
          fromRouteId: l,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition
        });
    },
    [s, o, a, l]
  );
}
function UR(t, { relative: a } = {}) {
  let { basename: l } = S.useContext(Dn), s = S.useContext(Ra);
  _e(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...os(t || ".", { relative: a }) }, f = Ca();
  if (t == null) {
    c.search = f.search;
    let h = new URLSearchParams(c.search), p = h.getAll("index");
    if (p.some((y) => y === "")) {
      h.delete("index"), p.filter((b) => b).forEach((b) => h.append("index", b));
      let y = h.toString();
      c.search = y ? `?${y}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), l !== "/" && (c.pathname = c.pathname === "/" ? l : Mn([l, c.pathname])), Wn(c);
}
function VR(t, { relative: a } = {}) {
  let l = S.useContext(sh);
  _e(
    l != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Gb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = os(t, { relative: a });
  if (!l.isTransitioning)
    return !1;
  let c = jn(l.currentLocation.pathname, s) || l.currentLocation.pathname, f = jn(l.nextLocation.pathname, s) || l.nextLocation.pathname;
  return lu(o.pathname, f) != null || lu(o.pathname, c) != null;
}
class $i extends Error {
  constructor(a, l, s, o) {
    super(s), this.status = a, this.category = l, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const Xi = "/api/v1/extensions/nexus.audio.emotiontts";
async function ot(t, a) {
  const l = t.startsWith("http") ? t : `${Xi}${t}`, s = await fetch(l, {
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
    throw new $i(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function BR(t, a, l) {
  const s = t.startsWith("http") ? t : `${Xi}${t}`, o = new EventSource(s);
  return o.onmessage = (c) => {
    if (c.data)
      try {
        a(JSON.parse(c.data));
      } catch {
      }
  }, o.onerror = (c) => {
    l?.(c);
  }, () => o.close();
}
async function HR() {
  return ot("/deployments");
}
async function hv(t) {
  return ot(`/deployments/${t}`);
}
async function kR(t, a) {
  return ot(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function mv(t) {
  return ot(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function $b(t, a) {
  return ot("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function qR(t, a, l) {
  return ot(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(l)
    }
  );
}
async function PR(t, a) {
  await ot(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function YR(t) {
  return ot(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function FR(t, a, l = "error") {
  return ot("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: l })
  });
}
async function GR(t, a = {}) {
  const l = new URLSearchParams();
  a.limit && l.set("limit", String(a.limit)), a.status && l.set("status", a.status);
  const s = l.toString(), o = s ? `?${s}` : "";
  return ot(`/deployments/${t}/runs${o}`);
}
async function $R(t, a) {
  return ot(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function mh(t, a) {
  return ot(`/deployments/${t}/runs/${a}`);
}
async function XR(t, a) {
  return ot(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function ph(t, a) {
  return ot(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function IR(t, a) {
  return ot(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function pv(t, a, l, s) {
  return BR(
    `/deployments/${t}/runs/${a}/progress`,
    l,
    s
  );
}
async function su(t) {
  return ot(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function KR(t, a, l, s, o) {
  const c = new FormData();
  c.append("deploymentId", t), c.append("displayName", l), c.append("kind", s), c.append("audio", a);
  const f = await fetch(`${Xi}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!f.ok)
    throw new Error(`upload failed: ${f.status}`);
  return await f.json();
}
async function QR(t) {
  return ot(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var ZR = "mux0i60", JR = "mux0i61", WR = "mux0i62", eC = "mux0i63";
function Yl({ count: t = "0", title: a, hint: l }) {
  return /* @__PURE__ */ g.jsxs("div", { className: ZR, children: [
    /* @__PURE__ */ g.jsx("span", { className: JR, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ g.jsx("h3", { className: WR, children: a }),
    l ? /* @__PURE__ */ g.jsx("p", { className: eC, children: l }) : null
  ] });
}
var tC = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, nC = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, aC = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, iC = "zwn3019";
function nn({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: l = "subtle",
  as: s = "section",
  children: o,
  className: c,
  style: f,
  ...h
}) {
  const p = [tC[t], aC[a], nC[l], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx(s, { className: p, style: f, "data-elevation": l, ...h, children: o });
}
function lC({ children: t, className: a }) {
  const l = [iC, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx("div", { className: l, children: t });
}
var Rn = "vrkn5p0", rC = "_93p6291", sC = "_93p6292", oC = "_93p6293", uC = "_93p6294", cC = "_93p6295", fC = "_93p6296", dC = "_93p6297", hC = "_93p6298", mC = "_93p6299", pC = "_93p629a", yC = "_93p629b", gC = "_93p629c", vC = "_93p629d", bC = "_93p629e";
function xC() {
  const { deployments: t } = us(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ g.jsxs("main", { className: rC, children: [
    /* @__PURE__ */ g.jsxs("header", { className: sC, children: [
      /* @__PURE__ */ g.jsx("p", { className: oC, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ g.jsxs("h1", { className: uC, children: [
        "Direct your characters.",
        /* @__PURE__ */ g.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ g.jsx("p", { className: cC, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ g.jsxs("p", { className: fC, children: [
        /* @__PURE__ */ g.jsx("span", { className: dC, children: t.length }),
        /* @__PURE__ */ g.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs(
      nn,
      {
        density: "airy",
        elevation: "raised",
        className: hC,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ g.jsx("h2", { id: "deployments-section-list", className: Rn, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ g.jsx(
            Yl,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ g.jsx("ul", { className: mC, children: t.map((l) => /* @__PURE__ */ g.jsx("li", { children: /* @__PURE__ */ g.jsxs(cs, { to: `/${l.deploymentId}/recipe`, className: pC, children: [
            /* @__PURE__ */ g.jsx("span", { className: yC, "aria-hidden": "true", children: SC(l.displayName) }),
            /* @__PURE__ */ g.jsxs("span", { children: [
              /* @__PURE__ */ g.jsx("span", { className: gC, children: l.displayName }),
              /* @__PURE__ */ g.jsx("span", { className: vC, children: l.deploymentId })
            ] }),
            /* @__PURE__ */ g.jsx("span", { className: bC, "aria-hidden": "true", children: "→" })
          ] }) }, l.deploymentId)) })
        ]
      }
    )
  ] });
}
function SC(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
const EC = "huggingface/IndexTeam/IndexTTS-2";
async function TC(t) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(t)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function wC() {
  return ot("/runtime/health");
}
async function RC() {
  await ot("/runtime/start", { method: "POST" });
}
async function CC() {
  return ot("/runtime/stop", { method: "POST" });
}
async function MC() {
  await ot("/runtime/restart", { method: "POST" });
}
function AC(t) {
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
var jC = "g5r6d10", DC = "g5r6d11", NC = "g5r6d12", zC = "g5r6d13", _C = "g5r6d14", OC = "g5r6d15", LC = "g5r6d16", UC = "g5r6d17", yv = "g5r6d18", gv = "g5r6d19", VC = "g5r6d1a", BC = "g5r6d1b", hn = "g5r6d1c", li = "g5r6d1d", Ad = "g5r6d1e", HC = "g5r6d1f", kC = "g5r6d1g", ai = "g5r6d1h", qC = "g5r6d1i", PC = "g5r6d1j", YC = "g5r6d1k", FC = "g5r6d1l", GC = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function Kt({
  severity: t,
  children: a,
  role: l,
  ariaLive: s,
  className: o,
  style: c
}) {
  const f = [GC[t], o].filter(Boolean).join(" "), h = l ?? (t === "error" ? "alert" : "status"), p = s ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ g.jsx("div", { className: f, role: h, "aria-live": p, style: c, children: a });
}
var Xb = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Ib = { sm: "_4ydn546", md: "_4ydn547", lg: "_4ydn548" };
function Ge({
  variant: t = "primary",
  size: a = "md",
  type: l = "button",
  loading: s = !1,
  disabled: o,
  children: c,
  className: f,
  style: h,
  ...p
}) {
  const m = [Xb[t], Ib[a], f].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx(
    "button",
    {
      type: l,
      className: m,
      style: h,
      disabled: s || o,
      "aria-busy": s || void 0,
      ...p,
      children: c
    }
  );
}
var $C = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, XC = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, IC = "_13bb4njb";
function wa({
  tone: t,
  size: a = "sm",
  pulse: l = !1,
  children: s,
  className: o,
  style: c,
  title: f
}) {
  const h = l && t !== "faint", p = [$C[a], XC[t], h ? IC : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx("span", { className: p, style: c, title: f, children: s });
}
const KC = 4e3;
function QC({ deployment: t }) {
  const a = Gi(), [l, s] = S.useState(null), [o, c] = S.useState(null), [f, h] = S.useState(!1);
  S.useEffect(() => {
    let D = !1;
    const B = async () => {
      try {
        const _ = await wC();
        D || (s(_), c(null));
      } catch (_) {
        D || c(Pr(_));
      }
    };
    B();
    const z = setInterval(B, KC);
    return () => {
      D = !0, clearInterval(z);
    };
  }, []);
  const p = S.useCallback(async () => {
    h(!0), c(null);
    try {
      await RC();
    } catch (D) {
      c(Pr(D));
    } finally {
      h(!1);
    }
  }, []), m = S.useCallback(async () => {
    h(!0);
    try {
      await CC();
    } catch (D) {
      c(Pr(D));
    } finally {
      h(!1);
    }
  }, []), y = S.useCallback(async () => {
    h(!0);
    try {
      await MC();
    } catch (D) {
      c(Pr(D));
    } finally {
      h(!1);
    }
  }, []), b = S.useCallback(async () => {
    h(!0);
    try {
      await TC(EC);
    } catch (D) {
      c(Pr(D));
    } finally {
      h(!1);
    }
  }, []), x = l?.badge ?? "not_installed", E = x === "stopped" || x === "not_installed", w = x === "ready" || x === "running" || x === "starting", R = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ g.jsxs("output", { className: li, "aria-live": "polite", children: [
    /* @__PURE__ */ g.jsx("span", { className: hn, children: "Runtime" }),
    /* @__PURE__ */ g.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ g.jsx("span", { className: hn, children: "Badge" }),
    /* @__PURE__ */ g.jsx(wa, { tone: ZC(x), pulse: x === "starting" || x === "installing", children: AC(x) }),
    l && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "Uptime" }),
      /* @__PURE__ */ g.jsx("span", { children: JC(l.uptimeSeconds) }),
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "VRAM" }),
      /* @__PURE__ */ g.jsxs("span", { children: [
        l.vramUsedMb,
        " / ",
        l.vramTotalMb,
        " MB"
      ] })
    ] }),
    E && /* @__PURE__ */ g.jsx(Ge, { disabled: f, onClick: p, children: "Install / Start runtime" }),
    w && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      /* @__PURE__ */ g.jsx(Ge, { variant: "danger", disabled: f, onClick: m, children: "Stop backend" }),
      /* @__PURE__ */ g.jsx(Ge, { variant: "secondary", disabled: f, onClick: y, children: "Restart" })
    ] }),
    R && /* @__PURE__ */ g.jsx(Ge, { disabled: f, onClick: b, children: "Download IndexTTS-2 model" }),
    /* @__PURE__ */ g.jsx(
      Ge,
      {
        variant: "secondary",
        onClick: () => a(`/${t.deploymentId}/mappings`),
        title: "Manage character → voice mappings (upload voice samples, edit emotion defaults)",
        children: "Mappings"
      }
    ),
    o && !R && /* @__PURE__ */ g.jsx(Kt, { severity: "error", children: o })
  ] });
}
function ZC(t) {
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
function JC(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Pr(t) {
  return t instanceof $i || t instanceof Error ? t.message : "unknown error";
}
async function WC(t) {
  return ot(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function eM(t, a, l) {
  return ot("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: l })
  });
}
async function tM(t, a) {
  await ot(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var nM = "wfqeb50", aM = "wfqeb51", iM = "wfqeb52", lM = "wfqeb53", rM = "wfqeb54", sM = "wfqeb55 wfqeb54", oM = "wfqeb56", uM = "wfqeb57", Kb = "wfqeb58", Qb = "wfqeb59", Zb = "wfqeb5a", cM = "wfqeb5b", fM = "wfqeb5c", dM = "wfqeb5d", hM = "wfqeb5e", Wf = "wfqeb5f", mM = "wfqeb5g", pM = "wfqeb5h", yM = "wfqeb5i";
const yh = S.createContext({});
function gh(t) {
  const a = S.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const gM = typeof window < "u", Jb = gM ? S.useLayoutEffect : S.useEffect, Tu = /* @__PURE__ */ S.createContext(null);
function vh(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function ou(t, a) {
  const l = t.indexOf(a);
  l > -1 && t.splice(l, 1);
}
const ea = (t, a, l) => l > a ? a : l < t ? t : l;
function vv(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let fs = () => {
}, Yi = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (fs = (t, a, l) => {
  !t && typeof console < "u" && console.warn(vv(a, l));
}, Yi = (t, a, l) => {
  if (!t)
    throw new Error(vv(a, l));
});
const ci = {}, Wb = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function ex(t) {
  return typeof t == "object" && t !== null;
}
const tx = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function nx(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const An = /* @__NO_SIDE_EFFECTS__ */ (t) => t, vM = (t, a) => (l) => a(t(l)), ds = (...t) => t.reduce(vM), ts = /* @__NO_SIDE_EFFECTS__ */ (t, a, l) => {
  const s = a - t;
  return s === 0 ? 1 : (l - t) / s;
};
class bh {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return vh(this.subscriptions, a), () => ou(this.subscriptions, a);
  }
  notify(a, l, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, l, s);
      else
        for (let c = 0; c < o; c++) {
          const f = this.subscriptions[c];
          f && f(a, l, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const an = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, Cn = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function ax(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const ix = (t, a, l) => (((1 - 3 * l + 3 * a) * t + (3 * l - 6 * a)) * t + 3 * a) * t, bM = 1e-7, xM = 12;
function SM(t, a, l, s, o) {
  let c, f, h = 0;
  do
    f = a + (l - a) / 2, c = ix(f, s, o) - t, c > 0 ? l = f : a = f;
  while (Math.abs(c) > bM && ++h < xM);
  return f;
}
function hs(t, a, l, s) {
  if (t === a && l === s)
    return An;
  const o = (c) => SM(c, 0, 1, t, l);
  return (c) => c === 0 || c === 1 ? c : ix(o(c), a, s);
}
const lx = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, rx = (t) => (a) => 1 - t(1 - a), sx = /* @__PURE__ */ hs(0.33, 1.53, 0.69, 0.99), xh = /* @__PURE__ */ rx(sx), ox = /* @__PURE__ */ lx(xh), ux = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * xh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Sh = (t) => 1 - Math.sin(Math.acos(t)), cx = rx(Sh), fx = lx(Sh), EM = /* @__PURE__ */ hs(0.42, 0, 1, 1), TM = /* @__PURE__ */ hs(0, 0, 0.58, 1), dx = /* @__PURE__ */ hs(0.42, 0, 0.58, 1), wM = (t) => Array.isArray(t) && typeof t[0] != "number", hx = (t) => Array.isArray(t) && typeof t[0] == "number", bv = {
  linear: An,
  easeIn: EM,
  easeInOut: dx,
  easeOut: TM,
  circIn: Sh,
  circInOut: fx,
  circOut: cx,
  backIn: xh,
  backInOut: ox,
  backOut: sx,
  anticipate: ux
}, RM = (t) => typeof t == "string", xv = (t) => {
  if (hx(t)) {
    Yi(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, l, s, o] = t;
    return hs(a, l, s, o);
  } else if (RM(t))
    return Yi(bv[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), bv[t];
  return t;
}, Vo = [
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
function CM(t, a) {
  let l = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, c = !1;
  const f = /* @__PURE__ */ new WeakSet();
  let h = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function p(y) {
    f.has(y) && (m.schedule(y), t()), y(h);
  }
  const m = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (y, b = !1, x = !1) => {
      const w = x && o ? l : s;
      return b && f.add(y), w.add(y), y;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (y) => {
      s.delete(y), f.delete(y);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (y) => {
      if (h = y, o) {
        c = !0;
        return;
      }
      o = !0;
      const b = l;
      l = s, s = b, l.forEach(p), l.clear(), o = !1, c && (c = !1, m.process(y));
    }
  };
  return m;
}
const MM = 40;
function mx(t, a) {
  let l = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, f = Vo.reduce((_, k) => (_[k] = CM(c), _), {}), { setup: h, read: p, resolveKeyframes: m, preUpdate: y, update: b, preRender: x, render: E, postRender: w } = f, R = () => {
    const _ = ci.useManualTiming, k = _ ? o.timestamp : performance.now();
    l = !1, _ || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(k - o.timestamp, MM), 1)), o.timestamp = k, o.isProcessing = !0, h.process(o), p.process(o), m.process(o), y.process(o), b.process(o), x.process(o), E.process(o), w.process(o), o.isProcessing = !1, l && a && (s = !1, t(R));
  }, D = () => {
    l = !0, s = !0, o.isProcessing || t(R);
  };
  return { schedule: Vo.reduce((_, k) => {
    const G = f[k];
    return _[k] = (ee, te = !1, C = !1) => (l || D(), G.schedule(ee, te, C)), _;
  }, {}), cancel: (_) => {
    for (let k = 0; k < Vo.length; k++)
      f[Vo[k]].cancel(_);
  }, state: o, steps: f };
}
const { schedule: nt, cancel: fi, state: Vt, steps: ed } = /* @__PURE__ */ mx(typeof requestAnimationFrame < "u" ? requestAnimationFrame : An, !0);
let Qo;
function AM() {
  Qo = void 0;
}
const Xt = {
  now: () => (Qo === void 0 && Xt.set(Vt.isProcessing || ci.useManualTiming ? Vt.timestamp : performance.now()), Qo),
  set: (t) => {
    Qo = t, queueMicrotask(AM);
  }
}, px = (t) => (a) => typeof a == "string" && a.startsWith(t), yx = /* @__PURE__ */ px("--"), jM = /* @__PURE__ */ px("var(--"), Eh = (t) => jM(t) ? DM.test(t.split("/*")[0].trim()) : !1, DM = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Sv(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const Fl = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, ns = {
  ...Fl,
  transform: (t) => ea(0, 1, t)
}, Bo = {
  ...Fl,
  default: 1
}, Kr = (t) => Math.round(t * 1e5) / 1e5, Th = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function NM(t) {
  return t == null;
}
const zM = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, wh = (t, a) => (l) => !!(typeof l == "string" && zM.test(l) && l.startsWith(t) || a && !NM(l) && Object.prototype.hasOwnProperty.call(l, a)), gx = (t, a, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, f, h] = s.match(Th);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(c),
    [l]: parseFloat(f),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, _M = (t) => ea(0, 255, t), td = {
  ...Fl,
  transform: (t) => Math.round(_M(t))
}, Hi = {
  test: /* @__PURE__ */ wh("rgb", "red"),
  parse: /* @__PURE__ */ gx("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: l, alpha: s = 1 }) => "rgba(" + td.transform(t) + ", " + td.transform(a) + ", " + td.transform(l) + ", " + Kr(ns.transform(s)) + ")"
};
function OM(t) {
  let a = "", l = "", s = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), l = t.substring(3, 5), s = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), l = t.substring(2, 3), s = t.substring(3, 4), o = t.substring(4, 5), a += a, l += l, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(l, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const jd = {
  test: /* @__PURE__ */ wh("#"),
  parse: OM,
  transform: Hi.transform
}, ms = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), ii = /* @__PURE__ */ ms("deg"), Jn = /* @__PURE__ */ ms("%"), ge = /* @__PURE__ */ ms("px"), LM = /* @__PURE__ */ ms("vh"), UM = /* @__PURE__ */ ms("vw"), Ev = {
  ...Jn,
  parse: (t) => Jn.parse(t) / 100,
  transform: (t) => Jn.transform(t * 100)
}, Ll = {
  test: /* @__PURE__ */ wh("hsl", "hue"),
  parse: /* @__PURE__ */ gx("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + Jn.transform(Kr(a)) + ", " + Jn.transform(Kr(l)) + ", " + Kr(ns.transform(s)) + ")"
}, Mt = {
  test: (t) => Hi.test(t) || jd.test(t) || Ll.test(t),
  parse: (t) => Hi.test(t) ? Hi.parse(t) : Ll.test(t) ? Ll.parse(t) : jd.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Hi.transform(t) : Ll.transform(t),
  getAnimatableNone: (t) => {
    const a = Mt.parse(t);
    return a.alpha = 0, Mt.transform(a);
  }
}, VM = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function BM(t) {
  return isNaN(t) && typeof t == "string" && (t.match(Th)?.length || 0) + (t.match(VM)?.length || 0) > 0;
}
const vx = "number", bx = "color", HM = "var", kM = "var(", Tv = "${}", qM = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function kl(t) {
  const a = t.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const h = a.replace(qM, (p) => (Mt.test(p) ? (s.color.push(c), o.push(bx), l.push(Mt.parse(p))) : p.startsWith(kM) ? (s.var.push(c), o.push(HM), l.push(p)) : (s.number.push(c), o.push(vx), l.push(parseFloat(p))), ++c, Tv)).split(Tv);
  return { values: l, split: h, indexes: s, types: o };
}
function PM(t) {
  return kl(t).values;
}
function xx({ split: t, types: a }) {
  const l = t.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < l; c++)
      if (o += t[c], s[c] !== void 0) {
        const f = a[c];
        f === vx ? o += Kr(s[c]) : f === bx ? o += Mt.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function YM(t) {
  return xx(kl(t));
}
const FM = (t) => typeof t == "number" ? 0 : Mt.test(t) ? Mt.getAnimatableNone(t) : t, GM = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : FM(t);
function $M(t) {
  const a = kl(t);
  return xx(a)(a.values.map((s, o) => GM(s, a.split[o])));
}
const Hn = {
  test: BM,
  parse: PM,
  createTransformer: YM,
  getAnimatableNone: $M
};
function nd(t, a, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? t + (a - t) * 6 * l : l < 1 / 2 ? a : l < 2 / 3 ? t + (a - t) * (2 / 3 - l) * 6 : t;
}
function XM({ hue: t, saturation: a, lightness: l, alpha: s }) {
  t /= 360, a /= 100, l /= 100;
  let o = 0, c = 0, f = 0;
  if (!a)
    o = c = f = l;
  else {
    const h = l < 0.5 ? l * (1 + a) : l + a - l * a, p = 2 * l - h;
    o = nd(p, h, t + 1 / 3), c = nd(p, h, t), f = nd(p, h, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(f * 255),
    alpha: s
  };
}
function uu(t, a) {
  return (l) => l > 0 ? a : t;
}
const st = (t, a, l) => t + (a - t) * l, ad = (t, a, l) => {
  const s = t * t, o = l * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, IM = [jd, Hi, Ll], KM = (t) => IM.find((a) => a.test(t));
function wv(t) {
  const a = KM(t);
  if (fs(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let l = a.parse(t);
  return a === Ll && (l = XM(l)), l;
}
const Rv = (t, a) => {
  const l = wv(t), s = wv(a);
  if (!l || !s)
    return uu(t, a);
  const o = { ...l };
  return (c) => (o.red = ad(l.red, s.red, c), o.green = ad(l.green, s.green, c), o.blue = ad(l.blue, s.blue, c), o.alpha = st(l.alpha, s.alpha, c), Hi.transform(o));
}, Dd = /* @__PURE__ */ new Set(["none", "hidden"]);
function QM(t, a) {
  return Dd.has(t) ? (l) => l <= 0 ? t : a : (l) => l >= 1 ? a : t;
}
function ZM(t, a) {
  return (l) => st(t, a, l);
}
function Rh(t) {
  return typeof t == "number" ? ZM : typeof t == "string" ? Eh(t) ? uu : Mt.test(t) ? Rv : eA : Array.isArray(t) ? Sx : typeof t == "object" ? Mt.test(t) ? Rv : JM : uu;
}
function Sx(t, a) {
  const l = [...t], s = l.length, o = t.map((c, f) => Rh(c)(c, a[f]));
  return (c) => {
    for (let f = 0; f < s; f++)
      l[f] = o[f](c);
    return l;
  };
}
function JM(t, a) {
  const l = { ...t, ...a }, s = {};
  for (const o in l)
    t[o] !== void 0 && a[o] !== void 0 && (s[o] = Rh(t[o])(t[o], a[o]));
  return (o) => {
    for (const c in s)
      l[c] = s[c](o);
    return l;
  };
}
function WM(t, a) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], f = t.indexes[c][s[c]], h = t.values[f] ?? 0;
    l[o] = h, s[c]++;
  }
  return l;
}
const eA = (t, a) => {
  const l = Hn.createTransformer(a), s = kl(t), o = kl(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Dd.has(t) && !o.values.length || Dd.has(a) && !s.values.length ? QM(t, a) : ds(Sx(WM(s, o), o.values), l) : (fs(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), uu(t, a));
};
function Ex(t, a, l) {
  return typeof t == "number" && typeof a == "number" && typeof l == "number" ? st(t, a, l) : Rh(t)(t, a);
}
const tA = (t) => {
  const a = ({ timestamp: l }) => t(l);
  return {
    start: (l = !0) => nt.update(a, l),
    stop: () => fi(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Vt.isProcessing ? Vt.timestamp : Xt.now()
  };
}, Tx = (t, a, l = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / l), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(t(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, cu = 2e4;
function Ch(t) {
  let a = 0;
  const l = 50;
  let s = t.next(a);
  for (; !s.done && a < cu; )
    a += l, s = t.next(a);
  return a >= cu ? 1 / 0 : a;
}
function nA(t, a = 100, l) {
  const s = l({ ...t, keyframes: [0, a] }), o = Math.min(Ch(s), cu);
  return {
    type: "keyframes",
    ease: (c) => s.next(o * c).value / a,
    duration: /* @__PURE__ */ Cn(o)
  };
}
const dt = {
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
function Nd(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const aA = 12;
function iA(t, a, l) {
  let s = l;
  for (let o = 1; o < aA; o++)
    s = s - t(s) / a(s);
  return s;
}
const id = 1e-3;
function lA({ duration: t = dt.duration, bounce: a = dt.bounce, velocity: l = dt.velocity, mass: s = dt.mass }) {
  let o, c;
  fs(t <= /* @__PURE__ */ an(dt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = ea(dt.minDamping, dt.maxDamping, f), t = ea(dt.minDuration, dt.maxDuration, /* @__PURE__ */ Cn(t)), f < 1 ? (o = (m) => {
    const y = m * f, b = y * t, x = y - l, E = Nd(m, f), w = Math.exp(-b);
    return id - x / E * w;
  }, c = (m) => {
    const b = m * f * t, x = b * l + l, E = Math.pow(f, 2) * Math.pow(m, 2) * t, w = Math.exp(-b), R = Nd(Math.pow(m, 2), f);
    return (-o(m) + id > 0 ? -1 : 1) * ((x - E) * w) / R;
  }) : (o = (m) => {
    const y = Math.exp(-m * t), b = (m - l) * t + 1;
    return -id + y * b;
  }, c = (m) => {
    const y = Math.exp(-m * t), b = (l - m) * (t * t);
    return y * b;
  });
  const h = 5 / t, p = iA(o, c, h);
  if (t = /* @__PURE__ */ an(t), isNaN(p))
    return {
      stiffness: dt.stiffness,
      damping: dt.damping,
      duration: t
    };
  {
    const m = Math.pow(p, 2) * s;
    return {
      stiffness: m,
      damping: f * 2 * Math.sqrt(s * m),
      duration: t
    };
  }
}
const rA = ["duration", "bounce"], sA = ["stiffness", "damping", "mass"];
function Cv(t, a) {
  return a.some((l) => t[l] !== void 0);
}
function oA(t) {
  let a = {
    velocity: dt.velocity,
    stiffness: dt.stiffness,
    damping: dt.damping,
    mass: dt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Cv(t, sA) && Cv(t, rA))
    if (a.velocity = 0, t.visualDuration) {
      const l = t.visualDuration, s = 2 * Math.PI / (l * 1.2), o = s * s, c = 2 * ea(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: dt.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const l = lA({ ...t, velocity: 0 });
      a = {
        ...a,
        ...l,
        mass: dt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function fu(t = dt.visualDuration, a = dt.bounce) {
  const l = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: s, restDelta: o } = l;
  const c = l.keyframes[0], f = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: p, damping: m, mass: y, duration: b, velocity: x, isResolvedFromDuration: E } = oA({
    ...l,
    velocity: -/* @__PURE__ */ Cn(l.velocity || 0)
  }), w = x || 0, R = m / (2 * Math.sqrt(p * y)), D = f - c, B = /* @__PURE__ */ Cn(Math.sqrt(p / y)), z = Math.abs(D) < 5;
  s || (s = z ? dt.restSpeed.granular : dt.restSpeed.default), o || (o = z ? dt.restDelta.granular : dt.restDelta.default);
  let _, k, G, ee, te, C;
  if (R < 1)
    G = Nd(B, R), ee = (w + R * B * D) / G, _ = (X) => {
      const ae = Math.exp(-R * B * X);
      return f - ae * (ee * Math.sin(G * X) + D * Math.cos(G * X));
    }, te = R * B * ee + D * G, C = R * B * D - ee * G, k = (X) => Math.exp(-R * B * X) * (te * Math.sin(G * X) + C * Math.cos(G * X));
  else if (R === 1) {
    _ = (ae) => f - Math.exp(-B * ae) * (D + (w + B * D) * ae);
    const X = w + B * D;
    k = (ae) => Math.exp(-B * ae) * (B * X * ae - w);
  } else {
    const X = B * Math.sqrt(R * R - 1);
    _ = (ue) => {
      const re = Math.exp(-R * B * ue), U = Math.min(X * ue, 300);
      return f - re * ((w + R * B * D) * Math.sinh(U) + X * D * Math.cosh(U)) / X;
    };
    const ae = (w + R * B * D) / X, I = R * B * ae - D * X, le = R * B * D - ae * X;
    k = (ue) => {
      const re = Math.exp(-R * B * ue), U = Math.min(X * ue, 300);
      return re * (I * Math.sinh(U) + le * Math.cosh(U));
    };
  }
  const O = {
    calculatedDuration: E && b || null,
    velocity: (X) => /* @__PURE__ */ an(k(X)),
    next: (X) => {
      if (!E && R < 1) {
        const I = Math.exp(-R * B * X), le = Math.sin(G * X), ue = Math.cos(G * X), re = f - I * (ee * le + D * ue), U = /* @__PURE__ */ an(I * (te * le + C * ue));
        return h.done = Math.abs(U) <= s && Math.abs(f - re) <= o, h.value = h.done ? f : re, h;
      }
      const ae = _(X);
      if (E)
        h.done = X >= b;
      else {
        const I = /* @__PURE__ */ an(k(X));
        h.done = Math.abs(I) <= s && Math.abs(f - ae) <= o;
      }
      return h.value = h.done ? f : ae, h;
    },
    toString: () => {
      const X = Math.min(Ch(O), cu), ae = Tx((I) => O.next(X * I).value, X, 30);
      return X + "ms " + ae;
    },
    toTransition: () => {
    }
  };
  return O;
}
fu.applyToOptions = (t) => {
  const a = nA(t, 100, fu);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ an(a.duration), t.type = "keyframes", t;
};
const uA = 5;
function wx(t, a, l) {
  const s = Math.max(a - uA, 0);
  return ax(l - t(s), a - s);
}
function zd({ keyframes: t, velocity: a = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: f, min: h, max: p, restDelta: m = 0.5, restSpeed: y }) {
  const b = t[0], x = {
    done: !1,
    value: b
  }, E = (C) => h !== void 0 && C < h || p !== void 0 && C > p, w = (C) => h === void 0 ? p : p === void 0 || Math.abs(h - C) < Math.abs(p - C) ? h : p;
  let R = l * a;
  const D = b + R, B = f === void 0 ? D : f(D);
  B !== D && (R = B - b);
  const z = (C) => -R * Math.exp(-C / s), _ = (C) => B + z(C), k = (C) => {
    const O = z(C), X = _(C);
    x.done = Math.abs(O) <= m, x.value = x.done ? B : X;
  };
  let G, ee;
  const te = (C) => {
    E(x.value) && (G = C, ee = fu({
      keyframes: [x.value, w(x.value)],
      velocity: wx(_, C, x.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: m,
      restSpeed: y
    }));
  };
  return te(0), {
    calculatedDuration: null,
    next: (C) => {
      let O = !1;
      return !ee && G === void 0 && (O = !0, k(C), te(C)), G !== void 0 && C >= G ? ee.next(C - G) : (!O && k(C), x);
    }
  };
}
function cA(t, a, l) {
  const s = [], o = l || ci.mix || Ex, c = t.length - 1;
  for (let f = 0; f < c; f++) {
    let h = o(t[f], t[f + 1]);
    if (a) {
      const p = Array.isArray(a) ? a[f] || An : a;
      h = ds(p, h);
    }
    s.push(h);
  }
  return s;
}
function fA(t, a, { clamp: l = !0, ease: s, mixer: o } = {}) {
  const c = t.length;
  if (Yi(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[c - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const h = cA(a, s, o), p = h.length, m = (y) => {
    if (f && y < t[0])
      return a[0];
    let b = 0;
    if (p > 1)
      for (; b < t.length - 2 && !(y < t[b + 1]); b++)
        ;
    const x = /* @__PURE__ */ ts(t[b], t[b + 1], y);
    return h[b](x);
  };
  return l ? (y) => m(ea(t[0], t[c - 1], y)) : m;
}
function dA(t, a) {
  const l = t[t.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ ts(0, a, s);
    t.push(st(l, 1, o));
  }
}
function hA(t) {
  const a = [0];
  return dA(a, t.length - 1), a;
}
function mA(t, a) {
  return t.map((l) => l * a);
}
function pA(t, a) {
  return t.map(() => a || dx).splice(0, t.length - 1);
}
function Qr({ duration: t = 300, keyframes: a, times: l, ease: s = "easeInOut" }) {
  const o = wM(s) ? s.map(xv) : xv(s), c = {
    done: !1,
    value: a[0]
  }, f = mA(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === a.length ? l : hA(a),
    t
  ), h = fA(f, a, {
    ease: Array.isArray(o) ? o : pA(a, o)
  });
  return {
    calculatedDuration: t,
    next: (p) => (c.value = h(p), c.done = p >= t, c)
  };
}
const yA = (t) => t !== null;
function wu(t, { repeat: a, repeatType: l = "loop" }, s, o = 1) {
  const c = t.filter(yA), h = o < 0 || a && l !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const gA = {
  decay: zd,
  inertia: zd,
  tween: Qr,
  keyframes: Qr,
  spring: fu
};
function Rx(t) {
  typeof t.type == "string" && (t.type = gA[t.type]);
}
class Mh {
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
  then(a, l) {
    return this.finished.then(a, l);
  }
}
const vA = (t) => t / 100;
class du extends Mh {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: l } = this.options;
      l && l.updatedAt !== Xt.now() && this.tick(Xt.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    Rx(a);
    const { type: l = Qr, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: f = 0 } = a;
    let { keyframes: h } = a;
    const p = l || Qr;
    p !== Qr && typeof h[0] != "number" && (this.mixKeyframes = ds(vA, Ex(h[0], h[1])), h = [0, 100]);
    const m = p({ ...a, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = p({
      ...a,
      keyframes: [...h].reverse(),
      velocity: -f
    })), m.calculatedDuration === null && (m.calculatedDuration = Ch(m));
    const { calculatedDuration: y } = m;
    this.calculatedDuration = y, this.resolvedDuration = y + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = m;
  }
  updateTime(a) {
    const l = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = l;
  }
  tick(a, l = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: c, mirroredGenerator: f, resolvedDuration: h, calculatedDuration: p } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: m = 0, keyframes: y, repeat: b, repeatType: x, repeatDelay: E, type: w, onUpdate: R, finalKeyframe: D } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), l ? this.currentTime = a : this.updateTime(a);
    const B = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), z = this.playbackSpeed >= 0 ? B < 0 : B > o;
    this.currentTime = Math.max(B, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let _ = this.currentTime, k = s;
    if (b) {
      const C = Math.min(this.currentTime, o) / h;
      let O = Math.floor(C), X = C % 1;
      !X && C >= 1 && (X = 1), X === 1 && O--, O = Math.min(O, b + 1), !!(O % 2) && (x === "reverse" ? (X = 1 - X, E && (X -= E / h)) : x === "mirror" && (k = f)), _ = ea(0, 1, X) * h;
    }
    let G;
    z ? (this.delayState.value = y[0], G = this.delayState) : G = k.next(_), c && !z && (G.value = c(G.value));
    let { done: ee } = G;
    !z && p !== null && (ee = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const te = this.holdTime === null && (this.state === "finished" || this.state === "running" && ee);
    return te && w !== zd && (G.value = wu(y, this.options, D, this.speed)), R && R(G.value), te && this.finish(), G;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(a, l) {
    return this.finished.then(a, l);
  }
  get duration() {
    return /* @__PURE__ */ Cn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Cn(a);
  }
  get time() {
    return /* @__PURE__ */ Cn(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ an(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    const l = this.generator.next(a).value;
    return wx((s) => this.generator.next(s).value, a, l);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const l = this.playbackSpeed !== a;
    l && this.driver && this.updateTime(Xt.now()), this.playbackSpeed = a, l && this.driver && (this.time = /* @__PURE__ */ Cn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = tA, startTime: l } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = l ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Xt.now()), this.holdTime = this.currentTime;
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
function bA(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const ki = (t) => t * 180 / Math.PI, _d = (t) => {
  const a = ki(Math.atan2(t[1], t[0]));
  return Od(a);
}, xA = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: _d,
  rotateZ: _d,
  skewX: (t) => ki(Math.atan(t[1])),
  skewY: (t) => ki(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Od = (t) => (t = t % 360, t < 0 && (t += 360), t), Mv = _d, Av = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), jv = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), SA = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Av,
  scaleY: jv,
  scale: (t) => (Av(t) + jv(t)) / 2,
  rotateX: (t) => Od(ki(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Od(ki(Math.atan2(-t[2], t[0]))),
  rotateZ: Mv,
  rotate: Mv,
  skewX: (t) => ki(Math.atan(t[4])),
  skewY: (t) => ki(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Ld(t) {
  return t.includes("scale") ? 1 : 0;
}
function Ud(t, a) {
  if (!t || t === "none")
    return Ld(a);
  const l = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (l)
    s = SA, o = l;
  else {
    const h = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = xA, o = h;
  }
  if (!o)
    return Ld(a);
  const c = s[a], f = o[1].split(",").map(TA);
  return typeof c == "function" ? c(f) : f[c];
}
const EA = (t, a) => {
  const { transform: l = "none" } = getComputedStyle(t);
  return Ud(l, a);
};
function TA(t) {
  return parseFloat(t.trim());
}
const Gl = [
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
], $l = new Set(Gl), Dv = (t) => t === Fl || t === ge, wA = /* @__PURE__ */ new Set(["x", "y", "z"]), RA = Gl.filter((t) => !wA.has(t));
function CA(t) {
  const a = [];
  return RA.forEach((l) => {
    const s = t.getValue(l);
    s !== void 0 && (a.push([l, s.get()]), s.set(l.startsWith("scale") ? 1 : 0));
  }), a;
}
const ui = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: a = "0", paddingRight: l = "0", boxSizing: s }) => {
    const o = t.max - t.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(l);
  },
  height: ({ y: t }, { paddingTop: a = "0", paddingBottom: l = "0", boxSizing: s }) => {
    const o = t.max - t.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(l);
  },
  top: (t, { top: a }) => parseFloat(a),
  left: (t, { left: a }) => parseFloat(a),
  bottom: ({ y: t }, { top: a }) => parseFloat(a) + (t.max - t.min),
  right: ({ x: t }, { left: a }) => parseFloat(a) + (t.max - t.min),
  // Transform
  x: (t, { transform: a }) => Ud(a, "x"),
  y: (t, { transform: a }) => Ud(a, "y")
};
ui.translateX = ui.x;
ui.translateY = ui.y;
const qi = /* @__PURE__ */ new Set();
let Vd = !1, Bd = !1, Hd = !1;
function Cx() {
  if (Bd) {
    const t = Array.from(qi).filter((s) => s.needsMeasurement), a = new Set(t.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = CA(s);
      o.length && (l.set(s, o), s.render());
    }), t.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = l.get(s);
      o && o.forEach(([c, f]) => {
        s.getValue(c)?.set(f);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Bd = !1, Vd = !1, qi.forEach((t) => t.complete(Hd)), qi.clear();
}
function Mx() {
  qi.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Bd = !0);
  });
}
function MA() {
  Hd = !0, Mx(), Cx(), Hd = !1;
}
class Ah {
  constructor(a, l, s, o, c, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = l, this.name = s, this.motionValue = o, this.element = c, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (qi.add(this), Vd || (Vd = !0, nt.read(Mx), nt.resolveKeyframes(Cx))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: l, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const c = o?.get(), f = a[a.length - 1];
      if (c !== void 0)
        a[0] = c;
      else if (s && l) {
        const h = s.readValue(l, f);
        h != null && (a[0] = h);
      }
      a[0] === void 0 && (a[0] = f), o && c === void 0 && o.set(a[0]);
    }
    bA(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), qi.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (qi.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const AA = (t) => t.startsWith("--");
function Ax(t, a, l) {
  AA(a) ? t.style.setProperty(a, l) : t.style[a] = l;
}
const jA = {};
function jx(t, a) {
  const l = /* @__PURE__ */ nx(t);
  return () => jA[a] ?? l();
}
const DA = /* @__PURE__ */ jx(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Dx = /* @__PURE__ */ jx(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Xr = ([t, a, l, s]) => `cubic-bezier(${t}, ${a}, ${l}, ${s})`, Nv = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Xr([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Xr([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Xr([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Xr([0.33, 1.53, 0.69, 0.99])
};
function Nx(t, a) {
  if (t)
    return typeof t == "function" ? Dx() ? Tx(t, a) : "ease-out" : hx(t) ? Xr(t) : Array.isArray(t) ? t.map((l) => Nx(l, a) || Nv.easeOut) : Nv[t];
}
function NA(t, a, l, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: f = "loop", ease: h = "easeOut", times: p } = {}, m = void 0) {
  const y = {
    [a]: l
  };
  p && (y.offset = p);
  const b = Nx(h, o);
  Array.isArray(b) && (y.easing = b);
  const x = {
    delay: s,
    duration: o,
    easing: Array.isArray(b) ? "linear" : b,
    fill: "both",
    iterations: c + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return m && (x.pseudoElement = m), t.animate(y, x);
}
function zx(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function zA({ type: t, ...a }) {
  return zx(t) && Dx() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class _x extends Mh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: l, name: s, keyframes: o, pseudoElement: c, allowFlatten: f = !1, finalKeyframe: h, onComplete: p } = a;
    this.isPseudoElement = !!c, this.allowFlatten = f, this.options = a, Yi(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = zA(a);
    this.animation = NA(l, s, o, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const y = wu(o, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(y), Ax(l, s, y), this.animation.cancel();
      }
      p?.(), this.notifyFinished();
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
    return /* @__PURE__ */ Cn(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Cn(a);
  }
  get time() {
    return /* @__PURE__ */ Cn(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const l = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ an(a), l && this.animation.pause();
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
  attachTimeline({ timeline: a, rangeStart: l, rangeEnd: s, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && DA() ? (this.animation.timeline = a, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), An) : o(this);
  }
}
const Ox = {
  anticipate: ux,
  backInOut: ox,
  circInOut: fx
};
function _A(t) {
  return t in Ox;
}
function OA(t) {
  typeof t.ease == "string" && _A(t.ease) && (t.ease = Ox[t.ease]);
}
const ld = 10;
class LA extends _x {
  constructor(a) {
    OA(a), Rx(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: l, onUpdate: s, onComplete: o, element: c, ...f } = this.options;
    if (!l)
      return;
    if (a !== void 0) {
      l.set(a);
      return;
    }
    const h = new du({
      ...f,
      autoplay: !1
    }), p = Math.max(ld, Xt.now() - this.startTime), m = ea(0, ld, p - ld), y = h.sample(p).value, { name: b } = this.options;
    c && b && Ax(c, b, y), l.setWithVelocity(h.sample(Math.max(0, p - m)).value, y, m), h.stop();
  }
}
const zv = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(Hn.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function UA(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let l = 0; l < t.length; l++)
    if (t[l] !== a)
      return !0;
}
function VA(t, a, l, s) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = t[t.length - 1], f = zv(o, a), h = zv(c, a);
  return fs(f === h, `You are trying to animate ${a} from "${o}" to "${c}". "${f ? c : o}" is not an animatable value.`, "value-not-animatable"), !f || !h ? !1 : UA(t) || (l === "spring" || zx(l)) && s;
}
function kd(t) {
  t.duration = 0, t.type = "keyframes";
}
const Lx = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), BA = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function HA(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && BA.test(t[a]))
      return !0;
  return !1;
}
const kA = /* @__PURE__ */ new Set([
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
]), qA = /* @__PURE__ */ nx(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function PA(t) {
  const { motionValue: a, name: l, repeatDelay: s, repeatType: o, damping: c, type: f, keyframes: h } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: y } = a.owner.getProps();
  return qA() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (Lx.has(l) || kA.has(l) && HA(h)) && (l !== "transform" || !y) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && c !== 0 && f !== "inertia";
}
const YA = 40;
class FA extends Mh {
  constructor({ autoplay: a = !0, delay: l = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: f = "loop", keyframes: h, name: p, motionValue: m, element: y, ...b }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Xt.now();
    const x = {
      autoplay: a,
      delay: l,
      type: s,
      repeat: o,
      repeatDelay: c,
      repeatType: f,
      name: p,
      motionValue: m,
      element: y,
      ...b
    }, E = y?.KeyframeResolver || Ah;
    this.keyframeResolver = new E(h, (w, R, D) => this.onKeyframesResolved(w, R, x, !D), p, m, y), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, l, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: f, velocity: h, delay: p, isHandoff: m, onUpdate: y } = s;
    this.resolvedAt = Xt.now();
    let b = !0;
    VA(a, c, f, h) || (b = !1, (ci.instantAnimations || !p) && y?.(wu(a, s, l)), a[0] = a[a.length - 1], kd(s), s.repeat = 0);
    const E = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > YA ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: a
    }, w = b && !m && PA(E), R = E.motionValue?.owner?.current;
    let D;
    if (w)
      try {
        D = new LA({
          ...E,
          element: R
        });
      } catch {
        D = new du(E);
      }
    else
      D = new du(E);
    D.finished.then(() => {
      this.notifyFinished();
    }).catch(An), this.pendingTimeline && (this.stopTimeline = D.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = D;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, l) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), MA()), this._animation;
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
function Ux(t, a, l, s = 0, o = 1) {
  const c = Array.from(t).sort((m, y) => m.sortNodePosition(y)).indexOf(a), f = t.size, h = (f - 1) * s;
  return typeof l == "function" ? l(c, f) : o === 1 ? c * s : h - c * s;
}
const GA = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function $A(t) {
  const a = GA.exec(t);
  if (!a)
    return [,];
  const [, l, s, o] = a;
  return [`--${l ?? s}`, o];
}
const XA = 4;
function Vx(t, a, l = 1) {
  Yi(l <= XA, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = $A(t);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const f = c.trim();
    return Wb(f) ? parseFloat(f) : f;
  }
  return Eh(o) ? Vx(o, a, l + 1) : o;
}
const IA = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, KA = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), QA = {
  type: "keyframes",
  duration: 0.8
}, ZA = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, JA = (t, { keyframes: a }) => a.length > 2 ? QA : $l.has(t) ? t.startsWith("scale") ? KA(a[1]) : IA : ZA;
function Bx(t, a) {
  if (t?.inherit && a) {
    const { inherit: l, ...s } = t;
    return { ...a, ...s };
  }
  return t;
}
function jh(t, a) {
  const l = t?.[a] ?? t?.default ?? t;
  return l !== t ? Bx(l, t) : l;
}
const WA = /* @__PURE__ */ new Set([
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
function ej(t) {
  for (const a in t)
    if (!WA.has(a))
      return !0;
  return !1;
}
const Dh = (t, a, l, s = {}, o, c) => (f) => {
  const h = jh(s, t) || {}, p = h.delay || s.delay || 0;
  let { elapsed: m = 0 } = s;
  m = m - /* @__PURE__ */ an(p);
  const y = {
    keyframes: Array.isArray(l) ? l : [null, l],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...h,
    delay: -m,
    onUpdate: (x) => {
      a.set(x), h.onUpdate && h.onUpdate(x);
    },
    onComplete: () => {
      f(), h.onComplete && h.onComplete();
    },
    name: t,
    motionValue: a,
    element: c ? void 0 : o
  };
  ej(h) || Object.assign(y, JA(t, y)), y.duration && (y.duration = /* @__PURE__ */ an(y.duration)), y.repeatDelay && (y.repeatDelay = /* @__PURE__ */ an(y.repeatDelay)), y.from !== void 0 && (y.keyframes[0] = y.from);
  let b = !1;
  if ((y.type === !1 || y.duration === 0 && !y.repeatDelay) && (kd(y), y.delay === 0 && (b = !0)), (ci.instantAnimations || ci.skipAnimations || o?.shouldSkipAnimations) && (b = !0, kd(y), y.delay = 0), y.allowFlatten = !h.type && !h.ease, b && !c && a.get() !== void 0) {
    const x = wu(y.keyframes, h);
    if (x !== void 0) {
      nt.update(() => {
        y.onUpdate(x), y.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new du(y) : new FA(y);
};
function _v(t) {
  const a = [{}, {}];
  return t?.values.forEach((l, s) => {
    a[0][s] = l.get(), a[1][s] = l.getVelocity();
  }), a;
}
function Nh(t, a, l, s) {
  if (typeof a == "function") {
    const [o, c] = _v(s);
    a = a(l !== void 0 ? l : t.custom, o, c);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, c] = _v(s);
    a = a(l !== void 0 ? l : t.custom, o, c);
  }
  return a;
}
function Pi(t, a, l) {
  const s = t.getProps();
  return Nh(s, a, l !== void 0 ? l : s.custom, t);
}
const Hx = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Gl
]), Ov = 30, tj = (t) => !isNaN(parseFloat(t));
class nj {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, l = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = Xt.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = l.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Xt.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = tj(this.current));
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
  on(a, l) {
    this.events[a] || (this.events[a] = new bh());
    const s = this.events[a].add(l);
    return a === "change" ? () => {
      s(), nt.read(() => {
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
  attach(a, l) {
    this.passiveEffect = a, this.stopPassiveEffect = l;
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
  setWithVelocity(a, l, s) {
    this.set(l), this.prev = void 0, this.prevFrameValue = a, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(a, l = !0) {
    this.updateAndNotify(a), this.prev = a, this.prevUpdatedAt = this.prevFrameValue = void 0, l && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
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
    const a = Xt.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > Ov)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, Ov);
    return ax(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
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
    return this.stop(), new Promise((l) => {
      this.hasAnimated = !0, this.animation = a(l), this.events.animationStart && this.events.animationStart.notify();
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
function ql(t, a) {
  return new nj(t, a);
}
const qd = (t) => Array.isArray(t);
function aj(t, a, l) {
  t.hasValue(a) ? t.getValue(a).set(l) : t.addValue(a, ql(l));
}
function ij(t) {
  return qd(t) ? t[t.length - 1] || 0 : t;
}
function lj(t, a) {
  const l = Pi(t, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const f in c) {
    const h = ij(c[f]);
    aj(t, f, h);
  }
}
const Bt = (t) => !!(t && t.getVelocity);
function rj(t) {
  return !!(Bt(t) && t.add);
}
function Pd(t, a) {
  const l = t.getValue("willChange");
  if (rj(l))
    return l.add(a);
  if (!l && ci.WillChange) {
    const s = new ci.WillChange("auto");
    t.addValue("willChange", s), s.add(a);
  }
}
function zh(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const sj = "framerAppearId", kx = "data-" + zh(sj);
function qx(t) {
  return t.props[kx];
}
function oj({ protectedKeys: t, needsAnimating: a }, l) {
  const s = t.hasOwnProperty(l) && a[l] !== !0;
  return a[l] = !1, s;
}
function Px(t, a, { delay: l = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: f, ...h } = a;
  const p = t.getDefaultTransition();
  c = c ? Bx(c, p) : p;
  const m = c?.reduceMotion;
  s && (c = s);
  const y = [], b = o && t.animationState && t.animationState.getState()[o];
  for (const x in h) {
    const E = t.getValue(x, t.latestValues[x] ?? null), w = h[x];
    if (w === void 0 || b && oj(b, x))
      continue;
    const R = {
      delay: l,
      ...jh(c || {}, x)
    }, D = E.get();
    if (D !== void 0 && !E.isAnimating() && !Array.isArray(w) && w === D && !R.velocity) {
      nt.update(() => E.set(w));
      continue;
    }
    let B = !1;
    if (window.MotionHandoffAnimation) {
      const k = qx(t);
      if (k) {
        const G = window.MotionHandoffAnimation(k, x, nt);
        G !== null && (R.startTime = G, B = !0);
      }
    }
    Pd(t, x);
    const z = m ?? t.shouldReduceMotion;
    E.start(Dh(x, E, w, z && Hx.has(x) ? { type: !1 } : R, t, B));
    const _ = E.animation;
    _ && y.push(_);
  }
  if (f) {
    const x = () => nt.update(() => {
      f && lj(t, f);
    });
    y.length ? Promise.all(y).then(x) : x();
  }
  return y;
}
function Yd(t, a, l = {}) {
  const s = Pi(t, a, l.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (o = l.transitionOverride);
  const c = s ? () => Promise.all(Px(t, s, l)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (p = 0) => {
    const { delayChildren: m = 0, staggerChildren: y, staggerDirection: b } = o;
    return uj(t, a, p, m, y, b, l);
  } : () => Promise.resolve(), { when: h } = o;
  if (h) {
    const [p, m] = h === "beforeChildren" ? [c, f] : [f, c];
    return p().then(() => m());
  } else
    return Promise.all([c(), f(l.delay)]);
}
function uj(t, a, l = 0, s = 0, o = 0, c = 1, f) {
  const h = [];
  for (const p of t.variantChildren)
    p.notify("AnimationStart", a), h.push(Yd(p, a, {
      ...f,
      delay: l + (typeof s == "function" ? 0 : s) + Ux(t.variantChildren, p, s, o, c)
    }).then(() => p.notify("AnimationComplete", a)));
  return Promise.all(h);
}
function cj(t, a, l = {}) {
  t.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => Yd(t, c, l));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = Yd(t, a, l);
  else {
    const o = typeof a == "function" ? Pi(t, a, l.custom) : a;
    s = Promise.all(Px(t, o, l));
  }
  return s.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const fj = {
  test: (t) => t === "auto",
  parse: (t) => t
}, Yx = (t) => (a) => a.test(t), Fx = [Fl, ge, Jn, ii, UM, LM, fj], Lv = (t) => Fx.find(Yx(t));
function dj(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || tx(t) : !0;
}
const hj = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function mj(t) {
  const [a, l] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [s] = l.match(Th) || [];
  if (!s)
    return t;
  const o = l.replace(s, "");
  let c = hj.has(a) ? 1 : 0;
  return s !== l && (c *= 100), a + "(" + c + o + ")";
}
const pj = /\b([a-z-]*)\(.*?\)/gu, Fd = {
  ...Hn,
  getAnimatableNone: (t) => {
    const a = t.match(pj);
    return a ? a.map(mj).join(" ") : t;
  }
}, Gd = {
  ...Hn,
  getAnimatableNone: (t) => {
    const a = Hn.parse(t);
    return Hn.createTransformer(t)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, Uv = {
  ...Fl,
  transform: Math.round
}, yj = {
  rotate: ii,
  rotateX: ii,
  rotateY: ii,
  rotateZ: ii,
  scale: Bo,
  scaleX: Bo,
  scaleY: Bo,
  scaleZ: Bo,
  skew: ii,
  skewX: ii,
  skewY: ii,
  distance: ge,
  translateX: ge,
  translateY: ge,
  translateZ: ge,
  x: ge,
  y: ge,
  z: ge,
  perspective: ge,
  transformPerspective: ge,
  opacity: ns,
  originX: Ev,
  originY: Ev,
  originZ: ge
}, _h = {
  // Border props
  borderWidth: ge,
  borderTopWidth: ge,
  borderRightWidth: ge,
  borderBottomWidth: ge,
  borderLeftWidth: ge,
  borderRadius: ge,
  borderTopLeftRadius: ge,
  borderTopRightRadius: ge,
  borderBottomRightRadius: ge,
  borderBottomLeftRadius: ge,
  // Positioning props
  width: ge,
  maxWidth: ge,
  height: ge,
  maxHeight: ge,
  top: ge,
  right: ge,
  bottom: ge,
  left: ge,
  inset: ge,
  insetBlock: ge,
  insetBlockStart: ge,
  insetBlockEnd: ge,
  insetInline: ge,
  insetInlineStart: ge,
  insetInlineEnd: ge,
  // Spacing props
  padding: ge,
  paddingTop: ge,
  paddingRight: ge,
  paddingBottom: ge,
  paddingLeft: ge,
  paddingBlock: ge,
  paddingBlockStart: ge,
  paddingBlockEnd: ge,
  paddingInline: ge,
  paddingInlineStart: ge,
  paddingInlineEnd: ge,
  margin: ge,
  marginTop: ge,
  marginRight: ge,
  marginBottom: ge,
  marginLeft: ge,
  marginBlock: ge,
  marginBlockStart: ge,
  marginBlockEnd: ge,
  marginInline: ge,
  marginInlineStart: ge,
  marginInlineEnd: ge,
  // Typography
  fontSize: ge,
  // Misc
  backgroundPositionX: ge,
  backgroundPositionY: ge,
  ...yj,
  zIndex: Uv,
  // SVG
  fillOpacity: ns,
  strokeOpacity: ns,
  numOctaves: Uv
}, gj = {
  ..._h,
  // Color props
  color: Mt,
  backgroundColor: Mt,
  outlineColor: Mt,
  fill: Mt,
  stroke: Mt,
  // Border props
  borderColor: Mt,
  borderTopColor: Mt,
  borderRightColor: Mt,
  borderBottomColor: Mt,
  borderLeftColor: Mt,
  filter: Fd,
  WebkitFilter: Fd,
  mask: Gd,
  WebkitMask: Gd
}, Gx = (t) => gj[t], vj = /* @__PURE__ */ new Set([Fd, Gd]);
function $x(t, a) {
  let l = Gx(t);
  return vj.has(l) || (l = Hn), l.getAnimatableNone ? l.getAnimatableNone(a) : void 0;
}
const bj = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function xj(t, a, l) {
  let s = 0, o;
  for (; s < t.length && !o; ) {
    const c = t[s];
    typeof c == "string" && !bj.has(c) && kl(c).values.length && (o = t[s]), s++;
  }
  if (o && l)
    for (const c of a)
      t[c] = $x(l, o);
}
class Sj extends Ah {
  constructor(a, l, s, o, c) {
    super(a, l, s, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: l, name: s } = this;
    if (!l || !l.current)
      return;
    super.readKeyframes();
    for (let y = 0; y < a.length; y++) {
      let b = a[y];
      if (typeof b == "string" && (b = b.trim(), Eh(b))) {
        const x = Vx(b, l.current);
        x !== void 0 && (a[y] = x), y === a.length - 1 && (this.finalKeyframe = b);
      }
    }
    if (this.resolveNoneKeyframes(), !Hx.has(s) || a.length !== 2)
      return;
    const [o, c] = a, f = Lv(o), h = Lv(c), p = Sv(o), m = Sv(c);
    if (p !== m && ui[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== h)
      if (Dv(f) && Dv(h))
        for (let y = 0; y < a.length; y++) {
          const b = a[y];
          typeof b == "string" && (a[y] = parseFloat(b));
        }
      else ui[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: l } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || dj(a[o])) && s.push(o);
    s.length && xj(a, s, l);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: l, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = ui[s](a.measureViewportBox(), window.getComputedStyle(a.current)), l[0] = this.measuredOrigin;
    const o = l[l.length - 1];
    o !== void 0 && a.getValue(s, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: l, unresolvedKeyframes: s } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(l);
    o && o.jump(this.measuredOrigin, !1);
    const c = s.length - 1, f = s[c];
    s[c] = ui[l](a.measureViewportBox(), window.getComputedStyle(a.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([h, p]) => {
      a.getValue(h).set(p);
    }), this.resolveNoneKeyframes();
  }
}
function Xx(t, a, l) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let s = document;
    const o = l?.[t] ?? s.querySelectorAll(t);
    return o ? Array.from(o) : [];
  }
  return Array.from(t).filter((s) => s != null);
}
const Ix = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function Zo(t) {
  return ex(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: Oh } = /* @__PURE__ */ mx(queueMicrotask, !1), Bn = {
  x: !1,
  y: !1
};
function Kx() {
  return Bn.x || Bn.y;
}
function Ej(t) {
  return t === "x" || t === "y" ? Bn[t] ? null : (Bn[t] = !0, () => {
    Bn[t] = !1;
  }) : Bn.x || Bn.y ? null : (Bn.x = Bn.y = !0, () => {
    Bn.x = Bn.y = !1;
  });
}
function Qx(t, a) {
  const l = Xx(t), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [l, o, () => s.abort()];
}
function Tj(t) {
  return !(t.pointerType === "touch" || Kx());
}
function wj(t, a, l = {}) {
  const [s, o, c] = Qx(t, l);
  return s.forEach((f) => {
    let h = !1, p = !1, m;
    const y = () => {
      f.removeEventListener("pointerleave", w);
    }, b = (D) => {
      m && (m(D), m = void 0), y();
    }, x = (D) => {
      h = !1, window.removeEventListener("pointerup", x), window.removeEventListener("pointercancel", x), p && (p = !1, b(D));
    }, E = () => {
      h = !0, window.addEventListener("pointerup", x, o), window.addEventListener("pointercancel", x, o);
    }, w = (D) => {
      if (D.pointerType !== "touch") {
        if (h) {
          p = !0;
          return;
        }
        b(D);
      }
    }, R = (D) => {
      if (!Tj(D))
        return;
      p = !1;
      const B = a(f, D);
      typeof B == "function" && (m = B, f.addEventListener("pointerleave", w, o));
    };
    f.addEventListener("pointerenter", R, o), f.addEventListener("pointerdown", E, o);
  }), c;
}
const Zx = (t, a) => a ? t === a ? !0 : Zx(t, a.parentElement) : !1, Lh = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Rj = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Cj(t) {
  return Rj.has(t.tagName) || t.isContentEditable === !0;
}
const Mj = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function Aj(t) {
  return Mj.has(t.tagName) || t.isContentEditable === !0;
}
const Jo = /* @__PURE__ */ new WeakSet();
function Vv(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function rd(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const jj = (t, a) => {
  const l = t.currentTarget;
  if (!l)
    return;
  const s = Vv(() => {
    if (Jo.has(l))
      return;
    rd(l, "down");
    const o = Vv(() => {
      rd(l, "up");
    }), c = () => rd(l, "cancel");
    l.addEventListener("keyup", o, a), l.addEventListener("blur", c, a);
  });
  l.addEventListener("keydown", s, a), l.addEventListener("blur", () => l.removeEventListener("keydown", s), a);
};
function Bv(t) {
  return Lh(t) && !Kx();
}
const Hv = /* @__PURE__ */ new WeakSet();
function Dj(t, a, l = {}) {
  const [s, o, c] = Qx(t, l), f = (h) => {
    const p = h.currentTarget;
    if (!Bv(h) || Hv.has(h))
      return;
    Jo.add(p), l.stopPropagation && Hv.add(h);
    const m = a(p, h), y = (E, w) => {
      window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", x), Jo.has(p) && Jo.delete(p), Bv(E) && typeof m == "function" && m(E, { success: w });
    }, b = (E) => {
      y(E, p === window || p === document || l.useGlobalTarget || Zx(p, E.target));
    }, x = (E) => {
      y(E, !1);
    };
    window.addEventListener("pointerup", b, o), window.addEventListener("pointercancel", x, o);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", f, o), Zo(h) && (h.addEventListener("focus", (m) => jj(m, o)), !Cj(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function Uh(t) {
  return ex(t) && "ownerSVGElement" in t;
}
const Wo = /* @__PURE__ */ new WeakMap();
let eu;
const Jx = (t, a, l) => (s, o) => o && o[0] ? o[0][t + "Size"] : Uh(s) && "getBBox" in s ? s.getBBox()[a] : s[l], Nj = /* @__PURE__ */ Jx("inline", "width", "offsetWidth"), zj = /* @__PURE__ */ Jx("block", "height", "offsetHeight");
function _j({ target: t, borderBoxSize: a }) {
  Wo.get(t)?.forEach((l) => {
    l(t, {
      get width() {
        return Nj(t, a);
      },
      get height() {
        return zj(t, a);
      }
    });
  });
}
function Oj(t) {
  t.forEach(_j);
}
function Lj() {
  typeof ResizeObserver > "u" || (eu = new ResizeObserver(Oj));
}
function Uj(t, a) {
  eu || Lj();
  const l = Xx(t);
  return l.forEach((s) => {
    let o = Wo.get(s);
    o || (o = /* @__PURE__ */ new Set(), Wo.set(s, o)), o.add(a), eu?.observe(s);
  }), () => {
    l.forEach((s) => {
      const o = Wo.get(s);
      o?.delete(a), o?.size || eu?.unobserve(s);
    });
  };
}
const tu = /* @__PURE__ */ new Set();
let Ul;
function Vj() {
  Ul = () => {
    const t = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    tu.forEach((a) => a(t));
  }, window.addEventListener("resize", Ul);
}
function Bj(t) {
  return tu.add(t), Ul || Vj(), () => {
    tu.delete(t), !tu.size && typeof Ul == "function" && (window.removeEventListener("resize", Ul), Ul = void 0);
  };
}
function kv(t, a) {
  return typeof t == "function" ? Bj(t) : Uj(t, a);
}
function Hj(t) {
  return Uh(t) && t.tagName === "svg";
}
const kj = [...Fx, Mt, Hn], qj = (t) => kj.find(Yx(t)), qv = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Vl = () => ({
  x: qv(),
  y: qv()
}), Pv = () => ({ min: 0, max: 0 }), jt = () => ({
  x: Pv(),
  y: Pv()
}), Pj = /* @__PURE__ */ new WeakMap();
function Ru(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function as(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Vh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Bh = ["initial", ...Vh];
function Cu(t) {
  return Ru(t.animate) || Bh.some((a) => as(t[a]));
}
function Wx(t) {
  return !!(Cu(t) || t.variants);
}
function Yj(t, a, l) {
  for (const s in a) {
    const o = a[s], c = l[s];
    if (Bt(o))
      t.addValue(s, o);
    else if (Bt(c))
      t.addValue(s, ql(o, { owner: t }));
    else if (c !== o)
      if (t.hasValue(s)) {
        const f = t.getValue(s);
        f.liveStyle === !0 ? f.jump(o) : f.hasAnimated || f.set(o);
      } else {
        const f = t.getStaticValue(s);
        t.addValue(s, ql(f !== void 0 ? f : o, { owner: t }));
      }
  }
  for (const s in l)
    a[s] === void 0 && t.removeValue(s);
  return a;
}
const hu = { current: null }, Hh = { current: !1 }, Fj = typeof window < "u";
function eS() {
  if (Hh.current = !0, !!Fj)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => hu.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      hu.current = !1;
}
const Yv = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let mu = {};
function tS(t) {
  mu = t;
}
function Gj() {
  return mu;
}
class $j {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(a, l, s) {
    return {};
  }
  constructor({ parent: a, props: l, presenceContext: s, reducedMotionConfig: o, skipAnimations: c, blockInitialAnimation: f, visualState: h }, p = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Ah, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const E = Xt.now();
      this.renderScheduledAt < E && (this.renderScheduledAt = E, nt.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: y } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = l.initial ? { ...m } : {}, this.renderState = y, this.parent = a, this.props = l, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = p, this.blockInitialAnimation = !!f, this.isControllingVariants = Cu(l), this.isVariantNode = Wx(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: b, ...x } = this.scrapeMotionValuesFromProps(l, {}, this);
    for (const E in x) {
      const w = x[E];
      m[E] !== void 0 && Bt(w) && w.set(m[E]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const l in this.initialValues)
        this.values.get(l)?.jump(this.initialValues[l]), this.latestValues[l] = this.initialValues[l];
    this.current = a, Pj.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Hh.current || eS(), this.shouldReduceMotion = hu.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), fi(this.notifyUpdate), fi(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const a in this.events)
      this.events[a].clear();
    for (const a in this.features) {
      const l = this.features[a];
      l && (l.unmount(), l.isMounted = !1);
    }
    this.current = null;
  }
  addChild(a) {
    this.children.add(a), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(a);
  }
  removeChild(a) {
    this.children.delete(a), this.enteringChildren && this.enteringChildren.delete(a);
  }
  bindToMotionValue(a, l) {
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), l.accelerate && Lx.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: h, times: p, ease: m, duration: y } = l.accelerate, b = new _x({
        element: this.current,
        name: a,
        keyframes: h,
        times: p,
        ease: m,
        duration: /* @__PURE__ */ an(y)
      }), x = f(b);
      this.valueSubscriptions.set(a, () => {
        x(), b.cancel();
      });
      return;
    }
    const s = $l.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = l.on("change", (f) => {
      this.latestValues[a] = f, this.props.onUpdate && nt.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let c;
    typeof window < "u" && window.MotionCheckAppearSync && (c = window.MotionCheckAppearSync(this, a, l)), this.valueSubscriptions.set(a, () => {
      o(), c && c(), l.owner && l.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in mu) {
      const l = mu[a];
      if (!l)
        continue;
      const { isEnabled: s, Feature: o } = l;
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : jt();
  }
  getStaticValue(a) {
    return this.latestValues[a];
  }
  setStaticValue(a, l) {
    this.latestValues[a] = l;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(a, l) {
    (a.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = a, this.prevPresenceContext = this.presenceContext, this.presenceContext = l;
    for (let s = 0; s < Yv.length; s++) {
      const o = Yv[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, f = a[c];
      f && (this.propEventSubscriptions[o] = this.on(o, f));
    }
    this.prevMotionValues = Yj(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const l = this.getClosestVariantNode();
    if (l)
      return l.variantChildren && l.variantChildren.add(a), () => l.variantChildren.delete(a);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(a, l) {
    const s = this.values.get(a);
    l !== s && (s && this.removeValue(a), this.bindToMotionValue(a, l), this.values.set(a, l), this.latestValues[a] = l.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(a) {
    this.values.delete(a);
    const l = this.valueSubscriptions.get(a);
    l && (l(), this.valueSubscriptions.delete(a)), delete this.latestValues[a], this.removeValueFromRenderState(a, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(a) {
    return this.values.has(a);
  }
  getValue(a, l) {
    if (this.props.values && this.props.values[a])
      return this.props.values[a];
    let s = this.values.get(a);
    return s === void 0 && l !== void 0 && (s = ql(l === null ? void 0 : l, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, l) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Wb(s) || tx(s)) ? s = parseFloat(s) : !qj(s) && Hn.test(l) && (s = $x(a, l)), this.setBaseTarget(a, Bt(s) ? s.get() : s)), Bt(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(a, l) {
    this.baseTarget[a] = l;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(a) {
    const { initial: l } = this.props;
    let s;
    if (typeof l == "string" || typeof l == "object") {
      const c = Nh(this.props, l, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (l && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !Bt(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, l) {
    return this.events[a] || (this.events[a] = new bh()), this.events[a].add(l);
  }
  notify(a, ...l) {
    this.events[a] && this.events[a].notify(...l);
  }
  scheduleRenderMicrotask() {
    Oh.render(this.render);
  }
}
class nS extends $j {
  constructor() {
    super(...arguments), this.KeyframeResolver = Sj;
  }
  sortInstanceNodePosition(a, l) {
    return a.compareDocumentPosition(l) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(a, l) {
    const s = a.style;
    return s ? s[l] : void 0;
  }
  removeValueFromRenderState(a, { vars: l, style: s }) {
    delete l[a], delete s[a];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: a } = this.props;
    Bt(a) && (this.childSubscription = a.on("change", (l) => {
      this.current && (this.current.textContent = `${l}`);
    }));
  }
}
class di {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function aS({ top: t, left: a, right: l, bottom: s }) {
  return {
    x: { min: a, max: l },
    y: { min: t, max: s }
  };
}
function Xj({ x: t, y: a }) {
  return { top: a.min, right: t.max, bottom: a.max, left: t.min };
}
function Ij(t, a) {
  if (!a)
    return t;
  const l = a({ x: t.left, y: t.top }), s = a({ x: t.right, y: t.bottom });
  return {
    top: l.y,
    left: l.x,
    bottom: s.y,
    right: s.x
  };
}
function sd(t) {
  return t === void 0 || t === 1;
}
function $d({ scale: t, scaleX: a, scaleY: l }) {
  return !sd(t) || !sd(a) || !sd(l);
}
function Vi(t) {
  return $d(t) || iS(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function iS(t) {
  return Fv(t.x) || Fv(t.y);
}
function Fv(t) {
  return t && t !== "0%";
}
function pu(t, a, l) {
  const s = t - l, o = a * s;
  return l + o;
}
function Gv(t, a, l, s, o) {
  return o !== void 0 && (t = pu(t, o, s)), pu(t, l, s) + a;
}
function Xd(t, a = 0, l = 1, s, o) {
  t.min = Gv(t.min, a, l, s, o), t.max = Gv(t.max, a, l, s, o);
}
function lS(t, { x: a, y: l }) {
  Xd(t.x, a.translate, a.scale, a.originPoint), Xd(t.y, l.translate, l.scale, l.originPoint);
}
const $v = 0.999999999999, Xv = 1.0000000000001;
function Kj(t, a, l, s = !1) {
  const o = l.length;
  if (!o)
    return;
  a.x = a.y = 1;
  let c, f;
  for (let h = 0; h < o; h++) {
    c = l[h], f = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (Zn(t.x, -c.scroll.offset.x), Zn(t.y, -c.scroll.offset.y)), f && (a.x *= f.x.scale, a.y *= f.y.scale, lS(t, f)), s && Vi(c.latestValues) && nu(t, c.latestValues, c.layout?.layoutBox));
  }
  a.x < Xv && a.x > $v && (a.x = 1), a.y < Xv && a.y > $v && (a.y = 1);
}
function Zn(t, a) {
  t.min += a, t.max += a;
}
function Iv(t, a, l, s, o = 0.5) {
  const c = st(t.min, t.max, o);
  Xd(t, a, l, c, s);
}
function Kv(t, a) {
  return typeof t == "string" ? parseFloat(t) / 100 * (a.max - a.min) : t;
}
function nu(t, a, l) {
  const s = l ?? t;
  Iv(t.x, Kv(a.x, s.x), a.scaleX, a.scale, a.originX), Iv(t.y, Kv(a.y, s.y), a.scaleY, a.scale, a.originY);
}
function rS(t, a) {
  return aS(Ij(t.getBoundingClientRect(), a));
}
function Qj(t, a, l) {
  const s = rS(t, l), { scroll: o } = a;
  return o && (Zn(s.x, o.offset.x), Zn(s.y, o.offset.y)), s;
}
const Zj = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Jj = Gl.length;
function Wj(t, a, l) {
  let s = "", o = !0;
  for (let c = 0; c < Jj; c++) {
    const f = Gl[c], h = t[f];
    if (h === void 0)
      continue;
    let p = !0;
    if (typeof h == "number")
      p = h === (f.startsWith("scale") ? 1 : 0);
    else {
      const m = parseFloat(h);
      p = f.startsWith("scale") ? m === 1 : m === 0;
    }
    if (!p || l) {
      const m = Ix(h, _h[f]);
      if (!p) {
        o = !1;
        const y = Zj[f] || f;
        s += `${y}(${m}) `;
      }
      l && (a[f] = m);
    }
  }
  return s = s.trim(), l ? s = l(a, o ? "" : s) : o && (s = "none"), s;
}
function kh(t, a, l) {
  const { style: s, vars: o, transformOrigin: c } = t;
  let f = !1, h = !1;
  for (const p in a) {
    const m = a[p];
    if ($l.has(p)) {
      f = !0;
      continue;
    } else if (yx(p)) {
      o[p] = m;
      continue;
    } else {
      const y = Ix(m, _h[p]);
      p.startsWith("origin") ? (h = !0, c[p] = y) : s[p] = y;
    }
  }
  if (a.transform || (f || l ? s.transform = Wj(a, t.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: p = "50%", originY: m = "50%", originZ: y = 0 } = c;
    s.transformOrigin = `${p} ${m} ${y}`;
  }
}
function sS(t, { style: a, vars: l }, s, o) {
  const c = t.style;
  let f;
  for (f in a)
    c[f] = a[f];
  o?.applyProjectionStyles(c, s);
  for (f in l)
    c.setProperty(f, l[f]);
}
function Qv(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const Yr = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (ge.test(t))
        t = parseFloat(t);
      else
        return t;
    const l = Qv(t, a.target.x), s = Qv(t, a.target.y);
    return `${l}% ${s}%`;
  }
}, eD = {
  correct: (t, { treeScale: a, projectionDelta: l }) => {
    const s = t, o = Hn.parse(t);
    if (o.length > 5)
      return s;
    const c = Hn.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, h = l.x.scale * a.x, p = l.y.scale * a.y;
    o[0 + f] /= h, o[1 + f] /= p;
    const m = st(h, p, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= m), typeof o[3 + f] == "number" && (o[3 + f] /= m), c(o);
  }
}, Id = {
  borderRadius: {
    ...Yr,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Yr,
  borderTopRightRadius: Yr,
  borderBottomLeftRadius: Yr,
  borderBottomRightRadius: Yr,
  boxShadow: eD
};
function oS(t, { layout: a, layoutId: l }) {
  return $l.has(t) || t.startsWith("origin") || (a || l !== void 0) && (!!Id[t] || t === "opacity");
}
function qh(t, a, l) {
  const s = t.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const f in s)
    (Bt(s[f]) || o && Bt(o[f]) || oS(f, t) || l?.getValue(f)?.liveStyle !== void 0) && (c[f] = s[f]);
  return c;
}
function tD(t) {
  return window.getComputedStyle(t);
}
class nD extends nS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = sS;
  }
  readValueFromInstance(a, l) {
    if ($l.has(l))
      return this.projection?.isProjecting ? Ld(l) : EA(a, l);
    {
      const s = tD(a), o = (yx(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: l }) {
    return rS(a, l);
  }
  build(a, l, s) {
    kh(a, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return qh(a, l, s);
  }
}
const aD = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, iD = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function lD(t, a, l = 1, s = 0, o = !0) {
  t.pathLength = 1;
  const c = o ? aD : iD;
  t[c.offset] = `${-s}`, t[c.array] = `${a} ${l}`;
}
const rD = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function uS(t, {
  attrX: a,
  attrY: l,
  attrScale: s,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, p, m, y) {
  if (kh(t, h, m), p) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: b, style: x } = t;
  b.transform && (x.transform = b.transform, delete b.transform), (x.transform || b.transformOrigin) && (x.transformOrigin = b.transformOrigin ?? "50% 50%", delete b.transformOrigin), x.transform && (x.transformBox = y?.transformBox ?? "fill-box", delete b.transformBox);
  for (const E of rD)
    b[E] !== void 0 && (x[E] = b[E], delete b[E]);
  a !== void 0 && (b.x = a), l !== void 0 && (b.y = l), s !== void 0 && (b.scale = s), o !== void 0 && lD(b, o, c, f, !1);
}
const cS = /* @__PURE__ */ new Set([
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
]), fS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function sD(t, a, l, s) {
  sS(t, a, void 0, s);
  for (const o in a.attrs)
    t.setAttribute(cS.has(o) ? o : zh(o), a.attrs[o]);
}
function dS(t, a, l) {
  const s = qh(t, a, l);
  for (const o in t)
    if (Bt(t[o]) || Bt(a[o])) {
      const c = Gl.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = t[o];
    }
  return s;
}
class oD extends nS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = jt;
  }
  getBaseTargetFromProps(a, l) {
    return a[l];
  }
  readValueFromInstance(a, l) {
    if ($l.has(l)) {
      const s = Gx(l);
      return s && s.default || 0;
    }
    return l = cS.has(l) ? l : zh(l), a.getAttribute(l);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return dS(a, l, s);
  }
  build(a, l, s) {
    uS(a, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, l, s, o) {
    sD(a, l, s, o);
  }
  mount(a) {
    this.isSVGTag = fS(a.tagName), super.mount(a);
  }
}
const uD = Bh.length;
function hS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const l = t.parent ? hS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (l.initial = t.props.initial), l;
  }
  const a = {};
  for (let l = 0; l < uD; l++) {
    const s = Bh[l], o = t.props[s];
    (as(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function mS(t, a) {
  if (!Array.isArray(a))
    return !1;
  const l = a.length;
  if (l !== t.length)
    return !1;
  for (let s = 0; s < l; s++)
    if (a[s] !== t[s])
      return !1;
  return !0;
}
const cD = [...Vh].reverse(), fD = Vh.length;
function dD(t) {
  return (a) => Promise.all(a.map(({ animation: l, options: s }) => cj(t, l, s)));
}
function hD(t) {
  let a = dD(t), l = Zv(), s = !0, o = !1;
  const c = (m) => (y, b) => {
    const x = Pi(t, b, m === "exit" ? t.presenceContext?.custom : void 0);
    if (x) {
      const { transition: E, transitionEnd: w, ...R } = x;
      y = { ...y, ...R, ...w };
    }
    return y;
  };
  function f(m) {
    a = m(t);
  }
  function h(m) {
    const { props: y } = t, b = hS(t.parent) || {}, x = [], E = /* @__PURE__ */ new Set();
    let w = {}, R = 1 / 0;
    for (let B = 0; B < fD; B++) {
      const z = cD[B], _ = l[z], k = y[z] !== void 0 ? y[z] : b[z], G = as(k), ee = z === m ? _.isActive : null;
      ee === !1 && (R = B);
      let te = k === b[z] && k !== y[z] && G;
      if (te && (s || o) && t.manuallyAnimateOnMount && (te = !1), _.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !_.isActive && ee === null || // If we didn't and don't have any defined prop for this animation type
      !k && !_.prevProp || // Or if the prop doesn't define an animation
      Ru(k) || typeof k == "boolean")
        continue;
      if (z === "exit" && _.isActive && ee !== !0) {
        _.prevResolvedValues && (w = {
          ...w,
          ..._.prevResolvedValues
        });
        continue;
      }
      const C = mD(_.prevProp, k);
      let O = C || // If we're making this variant active, we want to always make it active
      z === m && _.isActive && !te && G || // If we removed a higher-priority variant (i is in reverse order)
      B > R && G, X = !1;
      const ae = Array.isArray(k) ? k : [k];
      let I = ae.reduce(c(z), {});
      ee === !1 && (I = {});
      const { prevResolvedValues: le = {} } = _, ue = {
        ...le,
        ...I
      }, re = (J) => {
        O = !0, E.has(J) && (X = !0, E.delete(J)), _.needsAnimating[J] = !0;
        const ne = t.getValue(J);
        ne && (ne.liveStyle = !1);
      };
      for (const J in ue) {
        const ne = I[J], fe = le[J];
        if (w.hasOwnProperty(J))
          continue;
        let M = !1;
        qd(ne) && qd(fe) ? M = !mS(ne, fe) : M = ne !== fe, M ? ne != null ? re(J) : E.add(J) : ne !== void 0 && E.has(J) ? re(J) : _.protectedKeys[J] = !0;
      }
      _.prevProp = k, _.prevResolvedValues = I, _.isActive && (w = { ...w, ...I }), (s || o) && t.blockInitialAnimation && (O = !1);
      const U = te && C;
      O && (!U || X) && x.push(...ae.map((J) => {
        const ne = { type: z };
        if (typeof J == "string" && (s || o) && !U && t.manuallyAnimateOnMount && t.parent) {
          const { parent: fe } = t, M = Pi(fe, J);
          if (fe.enteringChildren && M) {
            const { delayChildren: K } = M.transition || {};
            ne.delay = Ux(fe.enteringChildren, t, K);
          }
        }
        return {
          animation: J,
          options: ne
        };
      }));
    }
    if (E.size) {
      const B = {};
      if (typeof y.initial != "boolean") {
        const z = Pi(t, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        z && z.transition && (B.transition = z.transition);
      }
      E.forEach((z) => {
        const _ = t.getBaseTarget(z), k = t.getValue(z);
        k && (k.liveStyle = !0), B[z] = _ ?? null;
      }), x.push({ animation: B });
    }
    let D = !!x.length;
    return s && (y.initial === !1 || y.initial === y.animate) && !t.manuallyAnimateOnMount && (D = !1), s = !1, o = !1, D ? a(x) : Promise.resolve();
  }
  function p(m, y) {
    if (l[m].isActive === y)
      return Promise.resolve();
    t.variantChildren?.forEach((x) => x.animationState?.setActive(m, y)), l[m].isActive = y;
    const b = h(m);
    for (const x in l)
      l[x].protectedKeys = {};
    return b;
  }
  return {
    animateChanges: h,
    setActive: p,
    setAnimateFunction: f,
    getState: () => l,
    reset: () => {
      l = Zv(), o = !0;
    }
  };
}
function mD(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !mS(a, t) : !1;
}
function Oi(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Zv() {
  return {
    animate: Oi(!0),
    whileInView: Oi(),
    whileHover: Oi(),
    whileTap: Oi(),
    whileDrag: Oi(),
    whileFocus: Oi(),
    exit: Oi()
  };
}
function Kd(t, a) {
  t.min = a.min, t.max = a.max;
}
function Vn(t, a) {
  Kd(t.x, a.x), Kd(t.y, a.y);
}
function Jv(t, a) {
  t.translate = a.translate, t.scale = a.scale, t.originPoint = a.originPoint, t.origin = a.origin;
}
const pS = 1e-4, pD = 1 - pS, yD = 1 + pS, yS = 0.01, gD = 0 - yS, vD = 0 + yS;
function It(t) {
  return t.max - t.min;
}
function bD(t, a, l) {
  return Math.abs(t - a) <= l;
}
function Wv(t, a, l, s = 0.5) {
  t.origin = s, t.originPoint = st(a.min, a.max, t.origin), t.scale = It(l) / It(a), t.translate = st(l.min, l.max, t.origin) - t.originPoint, (t.scale >= pD && t.scale <= yD || isNaN(t.scale)) && (t.scale = 1), (t.translate >= gD && t.translate <= vD || isNaN(t.translate)) && (t.translate = 0);
}
function Zr(t, a, l, s) {
  Wv(t.x, a.x, l.x, s ? s.originX : void 0), Wv(t.y, a.y, l.y, s ? s.originY : void 0);
}
function e0(t, a, l, s = 0) {
  const o = s ? st(l.min, l.max, s) : l.min;
  t.min = o + a.min, t.max = t.min + It(a);
}
function xD(t, a, l, s) {
  e0(t.x, a.x, l.x, s?.x), e0(t.y, a.y, l.y, s?.y);
}
function t0(t, a, l, s = 0) {
  const o = s ? st(l.min, l.max, s) : l.min;
  t.min = a.min - o, t.max = t.min + It(a);
}
function yu(t, a, l, s) {
  t0(t.x, a.x, l.x, s?.x), t0(t.y, a.y, l.y, s?.y);
}
function n0(t, a, l, s, o) {
  return t -= a, t = pu(t, 1 / l, s), o !== void 0 && (t = pu(t, 1 / o, s)), t;
}
function SD(t, a = 0, l = 1, s = 0.5, o, c = t, f = t) {
  if (Jn.test(a) && (a = parseFloat(a), a = st(f.min, f.max, a / 100) - f.min), typeof a != "number")
    return;
  let h = st(c.min, c.max, s);
  t === c && (h -= a), t.min = n0(t.min, a, l, h, o), t.max = n0(t.max, a, l, h, o);
}
function a0(t, a, [l, s, o], c, f) {
  SD(t, a[l], a[s], a[o], a.scale, c, f);
}
const ED = ["x", "scaleX", "originX"], TD = ["y", "scaleY", "originY"];
function i0(t, a, l, s) {
  a0(t.x, a, ED, l ? l.x : void 0, s ? s.x : void 0), a0(t.y, a, TD, l ? l.y : void 0, s ? s.y : void 0);
}
function l0(t) {
  return t.translate === 0 && t.scale === 1;
}
function gS(t) {
  return l0(t.x) && l0(t.y);
}
function r0(t, a) {
  return t.min === a.min && t.max === a.max;
}
function wD(t, a) {
  return r0(t.x, a.x) && r0(t.y, a.y);
}
function s0(t, a) {
  return Math.round(t.min) === Math.round(a.min) && Math.round(t.max) === Math.round(a.max);
}
function vS(t, a) {
  return s0(t.x, a.x) && s0(t.y, a.y);
}
function o0(t) {
  return It(t.x) / It(t.y);
}
function u0(t, a) {
  return t.translate === a.translate && t.scale === a.scale && t.originPoint === a.originPoint;
}
function Qn(t) {
  return [t("x"), t("y")];
}
function RD(t, a, l) {
  let s = "";
  const o = t.x.translate / a.x, c = t.y.translate / a.y, f = l?.z || 0;
  if ((o || c || f) && (s = `translate3d(${o}px, ${c}px, ${f}px) `), (a.x !== 1 || a.y !== 1) && (s += `scale(${1 / a.x}, ${1 / a.y}) `), l) {
    const { transformPerspective: m, rotate: y, rotateX: b, rotateY: x, skewX: E, skewY: w } = l;
    m && (s = `perspective(${m}px) ${s}`), y && (s += `rotate(${y}deg) `), b && (s += `rotateX(${b}deg) `), x && (s += `rotateY(${x}deg) `), E && (s += `skewX(${E}deg) `), w && (s += `skewY(${w}deg) `);
  }
  const h = t.x.scale * a.x, p = t.y.scale * a.y;
  return (h !== 1 || p !== 1) && (s += `scale(${h}, ${p})`), s || "none";
}
const bS = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius"
], CD = bS.length, c0 = (t) => typeof t == "string" ? parseFloat(t) : t, f0 = (t) => typeof t == "number" || ge.test(t);
function MD(t, a, l, s, o, c) {
  o ? (t.opacity = st(0, l.opacity ?? 1, AD(s)), t.opacityExit = st(a.opacity ?? 1, 0, jD(s))) : c && (t.opacity = st(a.opacity ?? 1, l.opacity ?? 1, s));
  for (let f = 0; f < CD; f++) {
    const h = bS[f];
    let p = d0(a, h), m = d0(l, h);
    if (p === void 0 && m === void 0)
      continue;
    p || (p = 0), m || (m = 0), p === 0 || m === 0 || f0(p) === f0(m) ? (t[h] = Math.max(st(c0(p), c0(m), s), 0), (Jn.test(m) || Jn.test(p)) && (t[h] += "%")) : t[h] = m;
  }
  (a.rotate || l.rotate) && (t.rotate = st(a.rotate || 0, l.rotate || 0, s));
}
function d0(t, a) {
  return t[a] !== void 0 ? t[a] : t.borderRadius;
}
const AD = /* @__PURE__ */ xS(0, 0.5, cx), jD = /* @__PURE__ */ xS(0.5, 0.95, An);
function xS(t, a, l) {
  return (s) => s < t ? 0 : s > a ? 1 : l(/* @__PURE__ */ ts(t, a, s));
}
function DD(t, a, l) {
  const s = Bt(t) ? t : ql(t);
  return s.start(Dh("", s, a, l)), s.animation;
}
function is(t, a, l, s = { passive: !0 }) {
  return t.addEventListener(a, l, s), () => t.removeEventListener(a, l);
}
const ND = (t, a) => t.depth - a.depth;
class zD {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(a) {
    vh(this.children, a), this.isDirty = !0;
  }
  remove(a) {
    ou(this.children, a), this.isDirty = !0;
  }
  forEach(a) {
    this.isDirty && this.children.sort(ND), this.isDirty = !1, this.children.forEach(a);
  }
}
function _D(t, a) {
  const l = Xt.now(), s = ({ timestamp: o }) => {
    const c = o - l;
    c >= a && (fi(s), t(c - a));
  };
  return nt.setup(s, !0), () => fi(s);
}
function au(t) {
  return Bt(t) ? t.get() : t;
}
class OD {
  constructor() {
    this.members = [];
  }
  add(a) {
    vh(this.members, a);
    for (let l = this.members.length - 1; l >= 0; l--) {
      const s = this.members[l];
      if (s === a || s === this.lead || s === this.prevLead)
        continue;
      const o = s.instance;
      (!o || o.isConnected === !1) && !s.snapshot && (ou(this.members, s), s.unmount());
    }
    a.scheduleRender();
  }
  remove(a) {
    if (ou(this.members, a), a === this.prevLead && (this.prevLead = void 0), a === this.lead) {
      const l = this.members[this.members.length - 1];
      l && this.promote(l);
    }
  }
  relegate(a) {
    for (let l = this.members.indexOf(a) - 1; l >= 0; l--) {
      const s = this.members[l];
      if (s.isPresent !== !1 && s.instance?.isConnected !== !1)
        return this.promote(s), !0;
    }
    return !1;
  }
  promote(a, l) {
    const s = this.lead;
    if (a !== s && (this.prevLead = s, this.lead = a, a.show(), s)) {
      s.updateSnapshot(), a.scheduleRender();
      const { layoutDependency: o } = s.options, { layoutDependency: c } = a.options;
      (o === void 0 || o !== c) && (a.resumeFrom = s, l && (s.preserveOpacity = !0), s.snapshot && (a.snapshot = s.snapshot, a.snapshot.latestValues = s.animationValues || s.latestValues), a.root?.isUpdating && (a.isLayoutDirty = !0)), a.options.crossfade === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((a) => {
      a.options.onExitComplete?.(), a.resumingFrom?.options.onExitComplete?.();
    });
  }
  scheduleRender() {
    this.members.forEach((a) => a.instance && a.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    this.lead?.snapshot && (this.lead.snapshot = void 0);
  }
}
const iu = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, od = ["", "X", "Y", "Z"], LD = 1e3;
let UD = 0;
function ud(t, a, l, s) {
  const { latestValues: o } = a;
  o[t] && (l[t] = o[t], a.setStaticValue(t, 0), s && (s[t] = 0));
}
function SS(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: a } = t.options;
  if (!a)
    return;
  const l = qx(a);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: o, layoutId: c } = t.options;
    window.MotionCancelOptimisedAnimation(l, "transform", nt, !(o || c));
  }
  const { parent: s } = t;
  s && !s.hasCheckedOptimisedAppear && SS(s);
}
function ES({ attachResizeListener: t, defaultParent: a, measureScroll: l, checkIsScrollRoot: s, resetTransform: o }) {
  return class {
    constructor(f = {}, h = a?.()) {
      this.id = UD++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(HD), this.nodes.forEach(GD), this.nodes.forEach($D), this.nodes.forEach(kD);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new zD());
    }
    addEventListener(f, h) {
      return this.eventHandlers.has(f) || this.eventHandlers.set(f, new bh()), this.eventHandlers.get(f).add(h);
    }
    notifyListeners(f, ...h) {
      const p = this.eventHandlers.get(f);
      p && p.notify(...h);
    }
    hasListeners(f) {
      return this.eventHandlers.has(f);
    }
    /**
     * Lifecycles
     */
    mount(f) {
      if (this.instance)
        return;
      this.isSVG = Uh(f) && !Hj(f), this.instance = f;
      const { layoutId: h, layout: p, visualElement: m } = this.options;
      if (m && !m.current && m.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0), t) {
        let y, b = 0;
        const x = () => this.root.updateBlockedByResize = !1;
        nt.read(() => {
          b = window.innerWidth;
        }), t(f, () => {
          const E = window.innerWidth;
          E !== b && (b = E, this.root.updateBlockedByResize = !0, y && y(), y = _D(x, 250), iu.hasAnimatedSinceResize && (iu.hasAnimatedSinceResize = !1, this.nodes.forEach(p0)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || p) && this.addEventListener("didUpdate", ({ delta: y, hasLayoutChanged: b, hasRelativeLayoutChanged: x, layout: E }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const w = this.options.transition || m.getDefaultTransition() || ZD, { onLayoutAnimationStart: R, onLayoutAnimationComplete: D } = m.getProps(), B = !this.targetLayout || !vS(this.targetLayout, E), z = !b && x;
        if (this.options.layoutRoot || this.resumeFrom || z || b && (B || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const _ = {
            ...jh(w, "layout"),
            onPlay: R,
            onComplete: D
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (_.delay = 0, _.type = !1), this.startAnimation(_), this.setAnimationOrigin(y, z);
        } else
          b || p0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = E;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const f = this.getStack();
      f && f.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), fi(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(XD), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: f } = this.options;
      return f && f.getProps().transformTemplate;
    }
    willUpdate(f = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && SS(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let y = 0; y < this.path.length; y++) {
        const b = this.path[y];
        b.shouldResetTransform = !0, (typeof b.latestValues.x == "string" || typeof b.latestValues.y == "string") && (b.isLayoutDirty = !0), b.updateScroll("snapshot"), b.options.layoutRoot && b.willUpdate(!1);
      }
      const { layoutId: h, layout: p } = this.options;
      if (h === void 0 && !p)
        return;
      const m = this.getTransformTemplate();
      this.prevTransformTemplateValue = m ? m(this.latestValues, "") : void 0, this.updateSnapshot(), f && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const p = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(PD), this.nodes.forEach(h0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(m0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(YD), this.nodes.forEach(FD), this.nodes.forEach(VD), this.nodes.forEach(BD)) : this.nodes.forEach(m0), this.clearAllSnapshots();
      const h = Xt.now();
      Vt.delta = ea(0, 1e3 / 60, h - Vt.timestamp), Vt.timestamp = h, Vt.isProcessing = !0, ed.update.process(Vt), ed.preRender.process(Vt), ed.render.process(Vt), Vt.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Oh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(qD), this.sharedNodes.forEach(ID);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, nt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      nt.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !It(this.snapshot.measuredBox.x) && !It(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++)
          this.path[p].updateScroll();
      const f = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = jt()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: h } = this.options;
      h && h.notify("LayoutMeasure", this.layout.layoutBox, f ? f.layoutBox : void 0);
    }
    updateScroll(f = "measure") {
      let h = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === f && (h = !1), h && this.instance) {
        const p = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: f,
          isRoot: p,
          offset: l(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p
        };
      }
    }
    resetTransform() {
      if (!o)
        return;
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !gS(this.projectionDelta), p = this.getTransformTemplate(), m = p ? p(this.latestValues, "") : void 0, y = m !== this.prevTransformTemplateValue;
      f && this.instance && (h || Vi(this.latestValues) || y) && (o(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const h = this.measurePageBox();
      let p = this.removeElementScroll(h);
      return f && (p = this.removeTransform(p)), JD(p), {
        animationId: this.root.animationId,
        measuredBox: h,
        layoutBox: p,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: f } = this.options;
      if (!f)
        return jt();
      const h = f.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(WD))) {
        const { scroll: m } = this.root;
        m && (Zn(h.x, m.offset.x), Zn(h.y, m.offset.y));
      }
      return h;
    }
    removeElementScroll(f) {
      const h = jt();
      if (Vn(h, f), this.scroll?.wasRoot)
        return h;
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p], { scroll: y, options: b } = m;
        m !== this.root && y && b.layoutScroll && (y.wasRoot && Vn(h, f), Zn(h.x, y.offset.x), Zn(h.y, y.offset.y));
      }
      return h;
    }
    applyTransform(f, h = !1, p) {
      const m = p || jt();
      Vn(m, f);
      for (let y = 0; y < this.path.length; y++) {
        const b = this.path[y];
        !h && b.options.layoutScroll && b.scroll && b !== b.root && (Zn(m.x, -b.scroll.offset.x), Zn(m.y, -b.scroll.offset.y)), Vi(b.latestValues) && nu(m, b.latestValues, b.layout?.layoutBox);
      }
      return Vi(this.latestValues) && nu(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(f) {
      const h = jt();
      Vn(h, f);
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p];
        if (!Vi(m.latestValues))
          continue;
        let y;
        m.instance && ($d(m.latestValues) && m.updateSnapshot(), y = jt(), Vn(y, m.measurePageBox())), i0(h, m.latestValues, m.snapshot?.layoutBox, y);
      }
      return Vi(this.latestValues) && i0(h, this.latestValues), h;
    }
    setTargetDelta(f) {
      this.targetDelta = f, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(f) {
      this.options = {
        ...this.options,
        ...f,
        crossfade: f.crossfade !== void 0 ? f.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Vt.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(f = !1) {
      const h = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
      const p = !!this.resumingFrom || this !== h;
      if (!(f || p && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: y, layoutId: b } = this.options;
      if (!this.layout || !(y || b))
        return;
      this.resolvedRelativeTargetAt = Vt.timestamp;
      const x = this.getClosestProjectingParent();
      x && this.linkedParentVersion !== x.layoutVersion && !x.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && x && x.layout ? this.createRelativeTarget(x, this.layout.layoutBox, x.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = jt(), this.targetWithTransforms = jt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), xD(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Vn(this.target, this.layout.layoutBox), lS(this.target, this.targetDelta)) : Vn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && x && !!x.resumingFrom == !!this.resumingFrom && !x.options.layoutScroll && x.target && this.animationProgress !== 1 ? this.createRelativeTarget(x, this.target, x.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || $d(this.parent.latestValues) || iS(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(f, h, p) {
      this.relativeParent = f, this.linkedParentVersion = f.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = jt(), this.relativeTargetOrigin = jt(), yu(this.relativeTargetOrigin, h, p, this.options.layoutAnchor || void 0), Vn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const f = this.getLead(), h = !!this.resumingFrom || this !== f;
      let p = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1), this.resolvedRelativeTargetAt === Vt.timestamp && (p = !1), p)
        return;
      const { layout: m, layoutId: y } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(m || y))
        return;
      Vn(this.layoutCorrected, this.layout.layoutBox);
      const b = this.treeScale.x, x = this.treeScale.y;
      Kj(this.layoutCorrected, this.treeScale, this.path, h), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = jt());
      const { target: E } = f;
      if (!E) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Jv(this.prevProjectionDelta.x, this.projectionDelta.x), Jv(this.prevProjectionDelta.y, this.projectionDelta.y)), Zr(this.projectionDelta, this.layoutCorrected, E, this.latestValues), (this.treeScale.x !== b || this.treeScale.y !== x || !u0(this.projectionDelta.x, this.prevProjectionDelta.x) || !u0(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", E));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(f = !0) {
      if (this.options.visualElement?.scheduleRender(), f) {
        const h = this.getStack();
        h && h.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Vl(), this.projectionDelta = Vl(), this.projectionDeltaWithTransform = Vl();
    }
    setAnimationOrigin(f, h = !1) {
      const p = this.snapshot, m = p ? p.latestValues : {}, y = { ...this.latestValues }, b = Vl();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const x = jt(), E = p ? p.source : void 0, w = this.layout ? this.layout.source : void 0, R = E !== w, D = this.getStack(), B = !D || D.members.length <= 1, z = !!(R && !B && this.options.crossfade === !0 && !this.path.some(QD));
      this.animationProgress = 0;
      let _;
      this.mixTargetDelta = (k) => {
        const G = k / 1e3;
        y0(b.x, f.x, G), y0(b.y, f.y, G), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (yu(x, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), KD(this.relativeTarget, this.relativeTargetOrigin, x, G), _ && wD(this.relativeTarget, _) && (this.isProjectionDirty = !1), _ || (_ = jt()), Vn(_, this.relativeTarget)), R && (this.animationValues = y, MD(y, m, this.latestValues, G, z, B)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = G;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (fi(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = nt.update(() => {
        iu.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = ql(0)), this.motionValue.jump(0, !1), this.currentAnimation = DD(this.motionValue, [0, 1e3], {
          ...f,
          velocity: 0,
          isSync: !0,
          onUpdate: (h) => {
            this.mixTargetDelta(h), f.onUpdate && f.onUpdate(h);
          },
          onStop: () => {
          },
          onComplete: () => {
            f.onComplete && f.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const f = this.getStack();
      f && f.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(LD), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: h, target: p, layout: m, latestValues: y } = f;
      if (!(!h || !p || !m)) {
        if (this !== f && this.layout && m && TS(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          p = this.target || jt();
          const b = It(this.layout.layoutBox.x);
          p.x.min = f.target.x.min, p.x.max = p.x.min + b;
          const x = It(this.layout.layoutBox.y);
          p.y.min = f.target.y.min, p.y.max = p.y.min + x;
        }
        Vn(h, p), nu(h, y), Zr(this.projectionDeltaWithTransform, this.layoutCorrected, h, y);
      }
    }
    registerSharedNode(f, h) {
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new OD()), this.sharedNodes.get(f).add(h);
      const m = h.options.initialPromotionConfig;
      h.promote({
        transition: m ? m.transition : void 0,
        preserveFollowOpacity: m && m.shouldPreserveFollowOpacity ? m.shouldPreserveFollowOpacity(h) : void 0
      });
    }
    isLead() {
      const f = this.getStack();
      return f ? f.lead === this : !0;
    }
    getLead() {
      const { layoutId: f } = this.options;
      return f ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: f } = this.options;
      return f ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: f } = this.options;
      if (f)
        return this.root.sharedNodes.get(f);
    }
    promote({ needsReset: f, transition: h, preserveFollowOpacity: p } = {}) {
      const m = this.getStack();
      m && m.promote(this, p), f && (this.projectionDelta = void 0, this.needsReset = !0), h && this.setOptions({ transition: h });
    }
    relegate() {
      const f = this.getStack();
      return f ? f.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: f } = this.options;
      if (!f)
        return;
      let h = !1;
      const { latestValues: p } = f;
      if ((p.z || p.rotate || p.rotateX || p.rotateY || p.rotateZ || p.skewX || p.skewY) && (h = !0), !h)
        return;
      const m = {};
      p.z && ud("z", f, m, this.animationValues);
      for (let y = 0; y < od.length; y++)
        ud(`rotate${od[y]}`, f, m, this.animationValues), ud(`skew${od[y]}`, f, m, this.animationValues);
      f.render();
      for (const y in m)
        f.setStaticValue(y, m[y]), this.animationValues && (this.animationValues[y] = m[y]);
      f.scheduleRender();
    }
    applyProjectionStyles(f, h) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        f.visibility = "hidden";
        return;
      }
      const p = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, f.visibility = "", f.opacity = "", f.pointerEvents = au(h?.pointerEvents) || "", f.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = au(h?.pointerEvents) || ""), this.hasProjected && !Vi(this.latestValues) && (f.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const y = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let b = RD(this.projectionDeltaWithTransform, this.treeScale, y);
      p && (b = p(y, b)), f.transform = b;
      const { x, y: E } = this.projectionDelta;
      f.transformOrigin = `${x.origin * 100}% ${E.origin * 100}% 0`, m.animationValues ? f.opacity = m === this ? y.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : y.opacityExit : f.opacity = m === this ? y.opacity !== void 0 ? y.opacity : "" : y.opacityExit !== void 0 ? y.opacityExit : 0;
      for (const w in Id) {
        if (y[w] === void 0)
          continue;
        const { correct: R, applyTo: D, isCSSVariable: B } = Id[w], z = b === "none" ? y[w] : R(y[w], m);
        if (D) {
          const _ = D.length;
          for (let k = 0; k < _; k++)
            f[D[k]] = z;
        } else
          B ? this.options.visualElement.renderState.vars[w] = z : f[w] = z;
      }
      this.options.layoutId && (f.pointerEvents = m === this ? au(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => f.currentAnimation?.stop()), this.root.nodes.forEach(h0), this.root.sharedNodes.clear();
    }
  };
}
function VD(t) {
  t.updateLayout();
}
function BD(t) {
  const a = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && a && t.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: s } = t.layout, { animationType: o } = t.options, c = a.source !== t.layout.source;
    if (o === "size")
      Qn((y) => {
        const b = c ? a.measuredBox[y] : a.layoutBox[y], x = It(b);
        b.min = l[y].min, b.max = b.min + x;
      });
    else if (o === "x" || o === "y") {
      const y = o === "x" ? "y" : "x";
      Kd(c ? a.measuredBox[y] : a.layoutBox[y], l[y]);
    } else TS(o, a.layoutBox, l) && Qn((y) => {
      const b = c ? a.measuredBox[y] : a.layoutBox[y], x = It(l[y]);
      b.max = b.min + x, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[y].max = t.relativeTarget[y].min + x);
    });
    const f = Vl();
    Zr(f, l, a.layoutBox);
    const h = Vl();
    c ? Zr(h, t.applyTransform(s, !0), a.measuredBox) : Zr(h, l, a.layoutBox);
    const p = !gS(f);
    let m = !1;
    if (!t.resumeFrom) {
      const y = t.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: b, layout: x } = y;
        if (b && x) {
          const E = t.options.layoutAnchor || void 0, w = jt();
          yu(w, a.layoutBox, b.layoutBox, E);
          const R = jt();
          yu(R, l, x.layoutBox, E), vS(w, R) || (m = !0), y.options.layoutRoot && (t.relativeTarget = R, t.relativeTargetOrigin = w, t.relativeParent = y);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: l,
      snapshot: a,
      delta: h,
      layoutDelta: f,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: m
    });
  } else if (t.isLead()) {
    const { onExitComplete: l } = t.options;
    l && l();
  }
  t.options.transition = void 0;
}
function HD(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function kD(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function qD(t) {
  t.clearSnapshot();
}
function h0(t) {
  t.clearMeasurements();
}
function PD(t) {
  t.isLayoutDirty = !0, t.updateLayout();
}
function m0(t) {
  t.isLayoutDirty = !1;
}
function YD(t) {
  t.isAnimationBlocked && t.layout && !t.isLayoutDirty && (t.snapshot = t.layout, t.isLayoutDirty = !0);
}
function FD(t) {
  const { visualElement: a } = t.options;
  a && a.getProps().onBeforeLayoutMeasure && a.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function p0(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function GD(t) {
  t.resolveTargetDelta();
}
function $D(t) {
  t.calcProjection();
}
function XD(t) {
  t.resetSkewAndRotation();
}
function ID(t) {
  t.removeLeadSnapshot();
}
function y0(t, a, l) {
  t.translate = st(a.translate, 0, l), t.scale = st(a.scale, 1, l), t.origin = a.origin, t.originPoint = a.originPoint;
}
function g0(t, a, l, s) {
  t.min = st(a.min, l.min, s), t.max = st(a.max, l.max, s);
}
function KD(t, a, l, s) {
  g0(t.x, a.x, l.x, s), g0(t.y, a.y, l.y, s);
}
function QD(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const ZD = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, v0 = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), b0 = v0("applewebkit/") && !v0("chrome/") ? Math.round : An;
function x0(t) {
  t.min = b0(t.min), t.max = b0(t.max);
}
function JD(t) {
  x0(t.x), x0(t.y);
}
function TS(t, a, l) {
  return t === "position" || t === "preserve-aspect" && !bD(o0(a), o0(l), 0.2);
}
function WD(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const e2 = ES({
  attachResizeListener: (t, a) => is(t, "resize", a),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), cd = {
  current: void 0
}, wS = ES({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!cd.current) {
      const t = new e2({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), cd.current = t;
    }
    return cd.current;
  },
  resetTransform: (t, a) => {
    t.style.transform = a !== void 0 ? a : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), Ph = S.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function S0(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function t2(...t) {
  return (a) => {
    let l = !1;
    const s = t.map((o) => {
      const c = S0(o, a);
      return !l && typeof c == "function" && (l = !0), c;
    });
    if (l)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : S0(t[o], null);
        }
      };
  };
}
function n2(...t) {
  return S.useCallback(t2(...t), t);
}
class a2 extends S.Component {
  getSnapshotBeforeUpdate(a) {
    const l = this.props.childRef.current;
    if (Zo(l) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = l.offsetParent, o = Zo(s) && s.offsetWidth || 0, c = Zo(s) && s.offsetHeight || 0, f = getComputedStyle(l), h = this.props.sizeRef.current;
      h.height = parseFloat(f.height), h.width = parseFloat(f.width), h.top = l.offsetTop, h.left = l.offsetLeft, h.right = o - h.width - h.left, h.bottom = c - h.height - h.top;
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
function i2({ children: t, isPresent: a, anchorX: l, anchorY: s, root: o, pop: c }) {
  const f = S.useId(), h = S.useRef(null), p = S.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = S.useContext(Ph), y = t.props?.ref ?? t?.ref, b = n2(h, y);
  return S.useInsertionEffect(() => {
    const { width: x, height: E, top: w, left: R, right: D, bottom: B } = p.current;
    if (a || c === !1 || !h.current || !x || !E)
      return;
    const z = l === "left" ? `left: ${R}` : `right: ${D}`, _ = s === "bottom" ? `bottom: ${B}` : `top: ${w}`;
    h.current.dataset.motionPopId = f;
    const k = document.createElement("style");
    m && (k.nonce = m);
    const G = o ?? document.head;
    return G.appendChild(k), k.sheet && k.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${x}px !important;
            height: ${E}px !important;
            ${z}px !important;
            ${_}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), G.contains(k) && G.removeChild(k);
    };
  }, [a]), g.jsx(a2, { isPresent: a, childRef: h, sizeRef: p, pop: c, children: c === !1 ? t : S.cloneElement(t, { ref: b }) });
}
const l2 = ({ children: t, initial: a, isPresent: l, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: f, anchorX: h, anchorY: p, root: m }) => {
  const y = gh(r2), b = S.useId();
  let x = !0, E = S.useMemo(() => (x = !1, {
    id: b,
    initial: a,
    isPresent: l,
    custom: o,
    onExitComplete: (w) => {
      y.set(w, !0);
      for (const R of y.values())
        if (!R)
          return;
      s && s();
    },
    register: (w) => (y.set(w, !1), () => y.delete(w))
  }), [l, y, s]);
  return c && x && (E = { ...E }), S.useMemo(() => {
    y.forEach((w, R) => y.set(R, !1));
  }, [l]), S.useEffect(() => {
    !l && !y.size && s && s();
  }, [l]), t = g.jsx(i2, { pop: f === "popLayout", isPresent: l, anchorX: h, anchorY: p, root: m, children: t }), g.jsx(Tu.Provider, { value: E, children: t });
};
function r2() {
  return /* @__PURE__ */ new Map();
}
function RS(t = !0) {
  const a = S.useContext(Tu);
  if (a === null)
    return [!0, null];
  const { isPresent: l, onExitComplete: s, register: o } = a, c = S.useId();
  S.useEffect(() => {
    if (t)
      return o(c);
  }, [t]);
  const f = S.useCallback(() => t && s && s(c), [c, s, t]);
  return !l && s ? [!1, f] : [!0];
}
const Ho = (t) => t.key || "";
function E0(t) {
  const a = [];
  return S.Children.forEach(t, (l) => {
    S.isValidElement(l) && a.push(l);
  }), a;
}
const s2 = ({ children: t, custom: a, initial: l = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: f = !1, anchorX: h = "left", anchorY: p = "top", root: m }) => {
  const [y, b] = RS(f), x = S.useMemo(() => E0(t), [t]), E = f && !y ? [] : x.map(Ho), w = S.useRef(!0), R = S.useRef(x), D = gh(() => /* @__PURE__ */ new Map()), B = S.useRef(/* @__PURE__ */ new Set()), [z, _] = S.useState(x), [k, G] = S.useState(x);
  Jb(() => {
    w.current = !1, R.current = x;
    for (let C = 0; C < k.length; C++) {
      const O = Ho(k[C]);
      E.includes(O) ? (D.delete(O), B.current.delete(O)) : D.get(O) !== !0 && D.set(O, !1);
    }
  }, [k, E.length, E.join("-")]);
  const ee = [];
  if (x !== z) {
    let C = [...x];
    for (let O = 0; O < k.length; O++) {
      const X = k[O], ae = Ho(X);
      E.includes(ae) || (C.splice(O, 0, X), ee.push(X));
    }
    return c === "wait" && ee.length && (C = ee), G(E0(C)), _(x), null;
  }
  const { forceRender: te } = S.useContext(yh);
  return g.jsx(g.Fragment, { children: k.map((C) => {
    const O = Ho(C), X = f && !y ? !1 : x === k || E.includes(O), ae = () => {
      if (B.current.has(O))
        return;
      if (D.has(O))
        B.current.add(O), D.set(O, !0);
      else
        return;
      let I = !0;
      D.forEach((le) => {
        le || (I = !1);
      }), I && (te?.(), G(R.current), f && b?.(), s && s());
    };
    return g.jsx(l2, { isPresent: X, initial: !w.current || l ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: m, onExitComplete: X ? void 0 : ae, anchorX: h, anchorY: p, children: C }, O);
  }) });
}, Yh = S.createContext({ strict: !1 }), T0 = {
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
let w0 = !1;
function o2() {
  if (w0)
    return;
  const t = {};
  for (const a in T0)
    t[a] = {
      isEnabled: (l) => T0[a].some((s) => !!l[s])
    };
  tS(t), w0 = !0;
}
function CS() {
  return o2(), Gj();
}
function Qd(t) {
  const a = CS();
  for (const l in t)
    a[l] = {
      ...a[l],
      ...t[l]
    };
  tS(a);
}
function MS({ children: t, features: a, strict: l = !1 }) {
  const [, s] = S.useState(!fd(a)), o = S.useRef(void 0);
  if (!fd(a)) {
    const { renderer: c, ...f } = a;
    o.current = c, Qd(f);
  }
  return S.useEffect(() => {
    fd(a) && a().then(({ renderer: c, ...f }) => {
      Qd(f), o.current = c, s(!0);
    });
  }, []), g.jsx(Yh.Provider, { value: { renderer: o.current, strict: l }, children: t });
}
function fd(t) {
  return typeof t == "function";
}
const u2 = /* @__PURE__ */ new Set([
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
function gu(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || u2.has(t);
}
let AS = (t) => !gu(t);
function c2(t) {
  typeof t == "function" && (AS = (a) => a.startsWith("on") ? !gu(a) : t(a));
}
try {
  c2(require("@emotion/is-prop-valid").default);
} catch {
}
function f2(t, a, l) {
  const s = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || Bt(t[o]) || (AS(o) || l === !0 && gu(o) || !a && !gu(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (s[o] = t[o]);
  return s;
}
const Mu = /* @__PURE__ */ S.createContext({});
function d2(t, a) {
  if (Cu(t)) {
    const { initial: l, animate: s } = t;
    return {
      initial: l === !1 || as(l) ? l : void 0,
      animate: as(s) ? s : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function h2(t) {
  const { initial: a, animate: l } = d2(t, S.useContext(Mu));
  return S.useMemo(() => ({ initial: a, animate: l }), [R0(a), R0(l)]);
}
function R0(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Fh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function jS(t, a, l) {
  for (const s in a)
    !Bt(a[s]) && !oS(s, l) && (t[s] = a[s]);
}
function m2({ transformTemplate: t }, a) {
  return S.useMemo(() => {
    const l = Fh();
    return kh(l, a, t), Object.assign({}, l.vars, l.style);
  }, [a]);
}
function p2(t, a) {
  const l = t.style || {}, s = {};
  return jS(s, l, t), Object.assign(s, m2(t, a)), s;
}
function y2(t, a) {
  const l = {}, s = p2(t, a);
  return t.drag && t.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const DS = () => ({
  ...Fh(),
  attrs: {}
});
function g2(t, a, l, s) {
  const o = S.useMemo(() => {
    const c = DS();
    return uS(c, a, fS(s), t.transformTemplate, t.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (t.style) {
    const c = {};
    jS(c, t.style, t), o.style = { ...c, ...o.style };
  }
  return o;
}
const v2 = [
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
function Gh(t) {
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
      !!(v2.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function b2(t, a, l, { latestValues: s }, o, c = !1, f) {
  const p = (f ?? Gh(t) ? g2 : y2)(a, s, o, t), m = f2(a, typeof t == "string", c), y = t !== S.Fragment ? { ...m, ...p, ref: l } : {}, { children: b } = a, x = S.useMemo(() => Bt(b) ? b.get() : b, [b]);
  return S.createElement(t, {
    ...y,
    children: x
  });
}
function x2({ scrapeMotionValuesFromProps: t, createRenderState: a }, l, s, o) {
  return {
    latestValues: S2(l, s, o, t),
    renderState: a()
  };
}
function S2(t, a, l, s) {
  const o = {}, c = s(t, {});
  for (const x in c)
    o[x] = au(c[x]);
  let { initial: f, animate: h } = t;
  const p = Cu(t), m = Wx(t);
  a && m && !p && t.inherit !== !1 && (f === void 0 && (f = a.initial), h === void 0 && (h = a.animate));
  let y = l ? l.initial === !1 : !1;
  y = y || f === !1;
  const b = y ? h : f;
  if (b && typeof b != "boolean" && !Ru(b)) {
    const x = Array.isArray(b) ? b : [b];
    for (let E = 0; E < x.length; E++) {
      const w = Nh(t, x[E]);
      if (w) {
        const { transitionEnd: R, transition: D, ...B } = w;
        for (const z in B) {
          let _ = B[z];
          if (Array.isArray(_)) {
            const k = y ? _.length - 1 : 0;
            _ = _[k];
          }
          _ !== null && (o[z] = _);
        }
        for (const z in R)
          o[z] = R[z];
      }
    }
  }
  return o;
}
const NS = (t) => (a, l) => {
  const s = S.useContext(Mu), o = S.useContext(Tu), c = () => x2(t, a, s, o);
  return l ? c() : gh(c);
}, E2 = /* @__PURE__ */ NS({
  scrapeMotionValuesFromProps: qh,
  createRenderState: Fh
}), T2 = /* @__PURE__ */ NS({
  scrapeMotionValuesFromProps: dS,
  createRenderState: DS
}), w2 = Symbol.for("motionComponentSymbol");
function R2(t, a, l) {
  const s = S.useRef(l);
  S.useInsertionEffect(() => {
    s.current = l;
  });
  const o = S.useRef(null);
  return S.useCallback((c) => {
    c && t.onMount?.(c);
    const f = s.current;
    if (typeof f == "function")
      if (c) {
        const h = f(c);
        typeof h == "function" && (o.current = h);
      } else o.current ? (o.current(), o.current = null) : f(c);
    else f && (f.current = c);
    a && (c ? a.mount(c) : a.unmount());
  }, [a]);
}
const zS = S.createContext({});
function _l(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function C2(t, a, l, s, o, c) {
  const { visualElement: f } = S.useContext(Mu), h = S.useContext(Yh), p = S.useContext(Tu), m = S.useContext(Ph), y = m.reducedMotion, b = m.skipAnimations, x = S.useRef(null), E = S.useRef(!1);
  s = s || h.renderer, !x.current && s && (x.current = s(t, {
    visualState: a,
    parent: f,
    props: l,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: y,
    skipAnimations: b,
    isSVG: c
  }), E.current && x.current && (x.current.manuallyAnimateOnMount = !0));
  const w = x.current, R = S.useContext(zS);
  w && !w.projection && o && (w.type === "html" || w.type === "svg") && M2(x.current, l, o, R);
  const D = S.useRef(!1);
  S.useInsertionEffect(() => {
    w && D.current && w.update(l, p);
  });
  const B = l[kx], z = S.useRef(!!B && typeof window < "u" && !window.MotionHandoffIsComplete?.(B) && window.MotionHasOptimisedAnimation?.(B));
  return Jb(() => {
    E.current = !0, w && (D.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), z.current && w.animationState && w.animationState.animateChanges());
  }), S.useEffect(() => {
    w && (!z.current && w.animationState && w.animationState.animateChanges(), z.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(B);
    }), z.current = !1), w.enteringChildren = void 0);
  }), w;
}
function M2(t, a, l, s) {
  const { layoutId: o, layout: c, drag: f, dragConstraints: h, layoutScroll: p, layoutRoot: m, layoutAnchor: y, layoutCrossfade: b } = a;
  t.projection = new l(t.latestValues, a["data-framer-portal-id"] ? void 0 : _S(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!f || h && _l(h),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof c == "string" ? c : "both",
    initialPromotionConfig: s,
    crossfade: b,
    layoutScroll: p,
    layoutRoot: m,
    layoutAnchor: y
  });
}
function _S(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : _S(t.parent);
}
function dd(t, { forwardMotionProps: a = !1, type: l } = {}, s, o) {
  s && Qd(s);
  const c = l ? l === "svg" : Gh(t), f = c ? T2 : E2;
  function h(m, y) {
    let b;
    const x = {
      ...S.useContext(Ph),
      ...m,
      layoutId: A2(m)
    }, { isStatic: E } = x, w = h2(m), R = f(m, E);
    if (!E && typeof window < "u") {
      j2();
      const D = D2(x);
      b = D.MeasureLayout, w.visualElement = C2(t, R, x, o, D.ProjectionNode, c);
    }
    return g.jsxs(Mu.Provider, { value: w, children: [b && w.visualElement ? g.jsx(b, { visualElement: w.visualElement, ...x }) : null, b2(t, m, R2(R, w.visualElement, y), R, E, a, c)] });
  }
  h.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const p = S.forwardRef(h);
  return p[w2] = t, p;
}
function A2({ layoutId: t }) {
  const a = S.useContext(yh).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function j2(t, a) {
  S.useContext(Yh).strict;
}
function D2(t) {
  const a = CS(), { drag: l, layout: s } = a;
  if (!l && !s)
    return {};
  const o = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(t) || s?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function OS(t, a) {
  if (typeof Proxy > "u")
    return dd;
  const l = /* @__PURE__ */ new Map(), s = (c, f) => dd(c, f, t, a), o = (c, f) => s(c, f);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, f) => f === "create" ? s : (l.has(f) || l.set(f, dd(f, void 0, t, a)), l.get(f))
  });
}
const LS = /* @__PURE__ */ OS(), US = (t, a) => a.isSVG ?? Gh(t) ? new oD(a) : new nD(a, {
  allowProjection: t !== S.Fragment
});
class N2 extends di {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = hD(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Ru(a) && (this.unmountControls = a.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: a } = this.node.getProps(), { animate: l } = this.node.prevProps || {};
    a !== l && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let z2 = 0;
class _2 extends di {
  constructor() {
    super(...arguments), this.id = z2++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: l } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: c, custom: f } = this.node.getProps();
        if (typeof c == "string") {
          const h = Pi(this.node, c, f);
          if (h) {
            const { transition: p, transitionEnd: m, ...y } = h;
            for (const b in y)
              this.node.getValue(b)?.jump(y[b]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const o = this.node.animationState.setActive("exit", !a);
    l && !a && o.then(() => {
      this.isExitComplete = !0, l(this.id);
    });
  }
  mount() {
    const { register: a, onExitComplete: l } = this.node.presenceContext || {};
    l && l(this.id), a && (this.unmount = a(this.id));
  }
  unmount() {
  }
}
const VS = {
  animation: {
    Feature: N2
  },
  exit: {
    Feature: _2
  }
};
function ps(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const O2 = (t) => (a) => Lh(a) && t(a, ps(a));
function Jr(t, a, l, s) {
  return is(t, a, O2(l), s);
}
const BS = ({ current: t }) => t ? t.ownerDocument.defaultView : null, C0 = (t, a) => Math.abs(t - a);
function L2(t, a) {
  const l = C0(t.x, a.x), s = C0(t.y, a.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const M0 = /* @__PURE__ */ new Set(["auto", "scroll"]);
class HS {
  constructor(a, l, { transformPagePoint: s, contextWindow: o = window, dragSnapToOrigin: c = !1, distanceThreshold: f = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (E) => {
      this.handleScroll(E.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = ko(this.lastRawMoveEventInfo, this.transformPagePoint));
      const E = hd(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, R = L2(E.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !R)
        return;
      const { point: D } = E, { timestamp: B } = Vt;
      this.history.push({ ...D, timestamp: B });
      const { onStart: z, onMove: _ } = this.handlers;
      w || (z && z(this.lastMoveEvent, E), this.startEvent = this.lastMoveEvent), _ && _(this.lastMoveEvent, E);
    }, this.handlePointerMove = (E, w) => {
      this.lastMoveEvent = E, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = ko(w, this.transformPagePoint), nt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (E, w) => {
      this.end();
      const { onEnd: R, onSessionEnd: D, resumeAnimation: B } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && B && B(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const z = hd(E.type === "pointercancel" ? this.lastMoveEventInfo : ko(w, this.transformPagePoint), this.history);
      this.startEvent && R && R(E, z), D && D(E, z);
    }, !Lh(a))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = f, this.contextWindow = o || window;
    const p = ps(a), m = ko(p, this.transformPagePoint), { point: y } = m, { timestamp: b } = Vt;
    this.history = [{ ...y, timestamp: b }];
    const { onSessionStart: x } = l;
    x && x(a, hd(m, this.history)), this.removeListeners = ds(Jr(this.contextWindow, "pointermove", this.handlePointerMove), Jr(this.contextWindow, "pointerup", this.handlePointerUp), Jr(this.contextWindow, "pointercancel", this.handlePointerUp)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(a) {
    let l = a.parentElement;
    for (; l; ) {
      const s = getComputedStyle(l);
      (M0.has(s.overflowX) || M0.has(s.overflowY)) && this.scrollPositions.set(l, {
        x: l.scrollLeft,
        y: l.scrollTop
      }), l = l.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(a) {
    const l = this.scrollPositions.get(a);
    if (!l)
      return;
    const s = a === window, o = s ? { x: window.scrollX, y: window.scrollY } : {
      x: a.scrollLeft,
      y: a.scrollTop
    }, c = { x: o.x - l.x, y: o.y - l.y };
    c.x === 0 && c.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(a, o), nt.update(this.updatePoint, !0));
  }
  updateHandlers(a) {
    this.handlers = a;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), fi(this.updatePoint);
  }
}
function ko(t, a) {
  return a ? { point: a(t.point) } : t;
}
function A0(t, a) {
  return { x: t.x - a.x, y: t.y - a.y };
}
function hd({ point: t }, a) {
  return {
    point: t,
    delta: A0(t, kS(a)),
    offset: A0(t, U2(a)),
    velocity: V2(a, 0.1)
  };
}
function U2(t) {
  return t[0];
}
function kS(t) {
  return t[t.length - 1];
}
function V2(t, a) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let l = t.length - 1, s = null;
  const o = kS(t);
  for (; l >= 0 && (s = t[l], !(o.timestamp - s.timestamp > /* @__PURE__ */ an(a))); )
    l--;
  if (!s)
    return { x: 0, y: 0 };
  s === t[0] && t.length > 2 && o.timestamp - s.timestamp > /* @__PURE__ */ an(a) * 2 && (s = t[1]);
  const c = /* @__PURE__ */ Cn(o.timestamp - s.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const f = {
    x: (o.x - s.x) / c,
    y: (o.y - s.y) / c
  };
  return f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f;
}
function B2(t, { min: a, max: l }, s) {
  return a !== void 0 && t < a ? t = s ? st(a, t, s.min) : Math.max(t, a) : l !== void 0 && t > l && (t = s ? st(l, t, s.max) : Math.min(t, l)), t;
}
function j0(t, a, l) {
  return {
    min: a !== void 0 ? t.min + a : void 0,
    max: l !== void 0 ? t.max + l - (t.max - t.min) : void 0
  };
}
function H2(t, { top: a, left: l, bottom: s, right: o }) {
  return {
    x: j0(t.x, l, o),
    y: j0(t.y, a, s)
  };
}
function D0(t, a) {
  let l = a.min - t.min, s = a.max - t.max;
  return a.max - a.min < t.max - t.min && ([l, s] = [s, l]), { min: l, max: s };
}
function k2(t, a) {
  return {
    x: D0(t.x, a.x),
    y: D0(t.y, a.y)
  };
}
function q2(t, a) {
  let l = 0.5;
  const s = It(t), o = It(a);
  return o > s ? l = /* @__PURE__ */ ts(a.min, a.max - s, t.min) : s > o && (l = /* @__PURE__ */ ts(t.min, t.max - o, a.min)), ea(0, 1, l);
}
function P2(t, a) {
  const l = {};
  return a.min !== void 0 && (l.min = a.min - t.min), a.max !== void 0 && (l.max = a.max - t.min), l;
}
const Zd = 0.35;
function Y2(t = Zd) {
  return t === !1 ? t = 0 : t === !0 && (t = Zd), {
    x: N0(t, "left", "right"),
    y: N0(t, "top", "bottom")
  };
}
function N0(t, a, l) {
  return {
    min: z0(t, a),
    max: z0(t, l)
  };
}
function z0(t, a) {
  return typeof t == "number" ? t : t[a] || 0;
}
const F2 = /* @__PURE__ */ new WeakMap();
class G2 {
  constructor(a) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = jt(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = a;
  }
  start(a, { snapToCursor: l = !1, distanceThreshold: s } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const c = (b) => {
      l && this.snapToCursor(ps(b).point), this.stopAnimation();
    }, f = (b, x) => {
      const { drag: E, dragPropagation: w, onDragStart: R } = this.getProps();
      if (E && !w && (this.openDragLock && this.openDragLock(), this.openDragLock = Ej(E), !this.openDragLock))
        return;
      this.latestPointerEvent = b, this.latestPanInfo = x, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Qn((B) => {
        let z = this.getAxisMotionValue(B).get() || 0;
        if (Jn.test(z)) {
          const { projection: _ } = this.visualElement;
          if (_ && _.layout) {
            const k = _.layout.layoutBox[B];
            k && (z = It(k) * (parseFloat(z) / 100));
          }
        }
        this.originPoint[B] = z;
      }), R && nt.update(() => R(b, x), !1, !0), Pd(this.visualElement, "transform");
      const { animationState: D } = this.visualElement;
      D && D.setActive("whileDrag", !0);
    }, h = (b, x) => {
      this.latestPointerEvent = b, this.latestPanInfo = x;
      const { dragPropagation: E, dragDirectionLock: w, onDirectionLock: R, onDrag: D } = this.getProps();
      if (!E && !this.openDragLock)
        return;
      const { offset: B } = x;
      if (w && this.currentDirection === null) {
        this.currentDirection = X2(B), this.currentDirection !== null && R && R(this.currentDirection);
        return;
      }
      this.updateAxis("x", x.point, B), this.updateAxis("y", x.point, B), this.visualElement.render(), D && nt.update(() => D(b, x), !1, !0);
    }, p = (b, x) => {
      this.latestPointerEvent = b, this.latestPanInfo = x, this.stop(b, x), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: b } = this.getProps();
      (b || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: y } = this.getProps();
    this.panSession = new HS(a, {
      onSessionStart: c,
      onStart: f,
      onMove: h,
      onSessionEnd: p,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: y,
      distanceThreshold: s,
      contextWindow: BS(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(a, l) {
    const s = a || this.latestPointerEvent, o = l || this.latestPanInfo, c = this.isDragging;
    if (this.cancel(), !c || !o || !s)
      return;
    const { velocity: f } = o;
    this.startAnimation(f);
    const { onDragEnd: h } = this.getProps();
    h && nt.postRender(() => h(s, o));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: a, animationState: l } = this.visualElement;
    a && (a.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: s } = this.getProps();
    !s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), l && l.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(a, l, s) {
    const { drag: o } = this.getProps();
    if (!s || !qo(a, o, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(a);
    let f = this.originPoint[a] + s[a];
    this.constraints && this.constraints[a] && (f = B2(f, this.constraints[a], this.elastic[a])), c.set(f);
  }
  resolveConstraints() {
    const { dragConstraints: a, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    a && _l(a) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : a && s ? this.constraints = H2(s.layoutBox, a) : this.constraints = !1, this.elastic = Y2(l), o !== this.constraints && !_l(a) && s && this.constraints && !this.hasMutatedConstraints && Qn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = P2(s.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: a, onMeasureDragConstraints: l } = this.getProps();
    if (!a || !_l(a))
      return !1;
    const s = a.current;
    Yi(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: o } = this.visualElement;
    if (!o || !o.layout)
      return !1;
    const c = Qj(s, o.root, this.visualElement.getTransformPagePoint());
    let f = k2(o.layout.layoutBox, c);
    if (l) {
      const h = l(Xj(f));
      this.hasMutatedConstraints = !!h, h && (f = aS(h));
    }
    return f;
  }
  startAnimation(a) {
    const { drag: l, dragMomentum: s, dragElastic: o, dragTransition: c, dragSnapToOrigin: f, onDragTransitionEnd: h } = this.getProps(), p = this.constraints || {}, m = Qn((y) => {
      if (!qo(y, l, this.currentDirection))
        return;
      let b = p && p[y] || {};
      (f === !0 || f === y) && (b = { min: 0, max: 0 });
      const x = o ? 200 : 1e6, E = o ? 40 : 1e7, w = {
        type: "inertia",
        velocity: s ? a[y] : 0,
        bounceStiffness: x,
        bounceDamping: E,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...c,
        ...b
      };
      return this.startAxisValueAnimation(y, w);
    });
    return Promise.all(m).then(h);
  }
  startAxisValueAnimation(a, l) {
    const s = this.getAxisMotionValue(a);
    return Pd(this.visualElement, a), s.start(Dh(a, s, 0, l, this.visualElement, !1));
  }
  stopAnimation() {
    Qn((a) => this.getAxisMotionValue(a).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(a) {
    const l = `_drag${a.toUpperCase()}`, s = this.visualElement.getProps(), o = s[l];
    return o || this.visualElement.getValue(a, (s.initial ? s.initial[a] : void 0) || 0);
  }
  snapToCursor(a) {
    Qn((l) => {
      const { drag: s } = this.getProps();
      if (!qo(l, s, this.currentDirection))
        return;
      const { projection: o } = this.visualElement, c = this.getAxisMotionValue(l);
      if (o && o.layout) {
        const { min: f, max: h } = o.layout.layoutBox[l], p = c.get() || 0;
        c.set(a[l] - st(f, h, 0.5) + p);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: a, dragConstraints: l } = this.getProps(), { projection: s } = this.visualElement;
    if (!_l(l) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    Qn((f) => {
      const h = this.getAxisMotionValue(f);
      if (h && this.constraints !== !1) {
        const p = h.get();
        o[f] = q2({ min: p, max: p }, this.constraints[f]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), Qn((f) => {
      if (!qo(f, a, null))
        return;
      const h = this.getAxisMotionValue(f), { min: p, max: m } = this.constraints[f];
      h.set(st(p, m, o[f]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    F2.set(this.visualElement, this);
    const a = this.visualElement.current, l = Jr(a, "pointerdown", (m) => {
      const { drag: y, dragListener: b = !0 } = this.getProps(), x = m.target, E = x !== a && Aj(x);
      y && b && !E && this.start(m);
    });
    let s;
    const o = () => {
      const { dragConstraints: m } = this.getProps();
      _l(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = $2(a, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, f = c.addEventListener("measure", o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), nt.read(o);
    const h = is(window, "resize", () => this.scalePositionWithinConstraints()), p = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: y }) => {
      this.isDragging && y && (Qn((b) => {
        const x = this.getAxisMotionValue(b);
        x && (this.originPoint[b] += m[b].translate, x.set(x.get() + m[b].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), l(), f(), p && p(), s && s();
    };
  }
  getProps() {
    const a = this.visualElement.getProps(), { drag: l = !1, dragDirectionLock: s = !1, dragPropagation: o = !1, dragConstraints: c = !1, dragElastic: f = Zd, dragMomentum: h = !0 } = a;
    return {
      ...a,
      drag: l,
      dragDirectionLock: s,
      dragPropagation: o,
      dragConstraints: c,
      dragElastic: f,
      dragMomentum: h
    };
  }
}
function _0(t) {
  let a = !0;
  return () => {
    if (a) {
      a = !1;
      return;
    }
    t();
  };
}
function $2(t, a, l) {
  const s = kv(t, _0(l)), o = kv(a, _0(l));
  return () => {
    s(), o();
  };
}
function qo(t, a, l) {
  return (a === !0 || a === t) && (l === null || l === t);
}
function X2(t, a = 10) {
  let l = null;
  return Math.abs(t.y) > a ? l = "y" : Math.abs(t.x) > a && (l = "x"), l;
}
class I2 extends di {
  constructor(a) {
    super(a), this.removeGroupControls = An, this.removeListeners = An, this.controls = new G2(a);
  }
  mount() {
    const { dragControls: a } = this.node.getProps();
    a && (this.removeGroupControls = a.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || An;
  }
  update() {
    const { dragControls: a } = this.node.getProps(), { dragControls: l } = this.node.prevProps || {};
    a !== l && (this.removeGroupControls(), a && (this.removeGroupControls = a.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const md = (t) => (a, l) => {
  t && nt.update(() => t(a, l), !1, !0);
};
class K2 extends di {
  constructor() {
    super(...arguments), this.removePointerDownListener = An;
  }
  onPointerDown(a) {
    this.session = new HS(a, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: BS(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: a, onPanStart: l, onPan: s, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: md(a),
      onStart: md(l),
      onMove: md(s),
      onEnd: (c, f) => {
        delete this.session, o && nt.postRender(() => o(c, f));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Jr(this.node.current, "pointerdown", (a) => this.onPointerDown(a));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let pd = !1;
class Q2 extends S.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: a, layoutGroup: l, switchLayoutGroup: s, layoutId: o } = this.props, { projection: c } = a;
    c && (l.group && l.group.add(c), s && s.register && o && s.register(c), pd && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), iu.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(a) {
    const { layoutDependency: l, visualElement: s, drag: o, isPresent: c } = this.props, { projection: f } = s;
    return f && (f.isPresent = c, a.layoutDependency !== l && f.setOptions({
      ...f.options,
      layoutDependency: l
    }), pd = !0, o || a.layoutDependency !== l || l === void 0 || a.isPresent !== c ? f.willUpdate() : this.safeToRemove(), a.isPresent !== c && (c ? f.promote() : f.relegate() || nt.postRender(() => {
      const h = f.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: a, layoutAnchor: l } = this.props, { projection: s } = a;
    s && (s.options.layoutAnchor = l, s.root.didUpdate(), Oh.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: a, layoutGroup: l, switchLayoutGroup: s } = this.props, { projection: o } = a;
    pd = !0, o && (o.scheduleCheckAfterUnmount(), l && l.group && l.group.remove(o), s && s.deregister && s.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: a } = this.props;
    a && a();
  }
  render() {
    return null;
  }
}
function qS(t) {
  const [a, l] = RS(), s = S.useContext(yh);
  return g.jsx(Q2, { ...t, layoutGroup: s, switchLayoutGroup: S.useContext(zS), isPresent: a, safeToRemove: l });
}
const Z2 = {
  pan: {
    Feature: K2
  },
  drag: {
    Feature: I2,
    ProjectionNode: wS,
    MeasureLayout: qS
  }
};
function O0(t, a, l) {
  const { props: s } = t;
  t.animationState && s.whileHover && t.animationState.setActive("whileHover", l === "Start");
  const o = "onHover" + l, c = s[o];
  c && nt.postRender(() => c(a, ps(a)));
}
class J2 extends di {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = wj(a, (l, s) => (O0(this.node, s, "Start"), (o) => O0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class W2 extends di {
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
    this.unmount = ds(is(this.node.current, "focus", () => this.onFocus()), is(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function L0(t, a, l) {
  const { props: s } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && s.whileTap && t.animationState.setActive("whileTap", l === "Start");
  const o = "onTap" + (l === "End" ? "" : l), c = s[o];
  c && nt.postRender(() => c(a, ps(a)));
}
class eN extends di {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = Dj(a, (o, c) => (L0(this.node, c, "Start"), (f, { success: h }) => L0(this.node, f, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Jd = /* @__PURE__ */ new WeakMap(), yd = /* @__PURE__ */ new WeakMap(), tN = (t) => {
  const a = Jd.get(t.target);
  a && a(t);
}, nN = (t) => {
  t.forEach(tN);
};
function aN({ root: t, ...a }) {
  const l = t || document;
  yd.has(l) || yd.set(l, {});
  const s = yd.get(l), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(nN, { root: t, ...a })), s[o];
}
function iN(t, a, l) {
  const s = aN(a);
  return Jd.set(t, l), s.observe(t), () => {
    Jd.delete(t), s.unobserve(t);
  };
}
const lN = {
  some: 0,
  all: 1
};
class rN extends di {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: l, margin: s, amount: o = "some", once: c } = a, f = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : lN[o]
    }, h = (p) => {
      const { isIntersecting: m } = p;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: y, onViewportLeave: b } = this.node.getProps(), x = m ? y : b;
      x && x(p);
    };
    this.stopObserver = iN(this.node.current, f, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(sN(a, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function sN({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (l) => t[l] !== a[l];
}
const PS = {
  inView: {
    Feature: rN
  },
  tap: {
    Feature: eN
  },
  focus: {
    Feature: W2
  },
  hover: {
    Feature: J2
  }
}, oN = {
  layout: {
    ProjectionNode: wS,
    MeasureLayout: qS
  }
}, uN = {
  ...VS,
  ...PS,
  ...Z2,
  ...oN
}, cN = /* @__PURE__ */ OS(uN, US), YS = {
  renderer: US,
  ...VS,
  ...PS
};
function fN() {
  !Hh.current && eS();
  const [t] = S.useState(hu.current);
  return t;
}
var dN = { color: { surfaceMuted: "var(--_13pk47p1)" } }, hN = "_1suh9ey0", mN = "_1suh9ey1", pN = "_1suh9ey2", U0 = "_1suh9ey3", V0 = "_1suh9ey4", yN = "_1suh9ey5";
const Kn = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function gN({
  vector: t,
  pulseKey: a,
  size: l = 220,
  onChange: s,
  disabled: o = !1
}) {
  const c = fN(), f = S.useRef(null), [h, p] = S.useState(null), m = S.useId(), y = l / 2, b = l / 2, x = l / 2 - 28, E = Kn.length, w = !!s && !o, R = Kn.map((C, O) => {
    const X = -Math.PI / 2 + 2 * Math.PI * O / E, ae = Po(t[O] ?? 0);
    return { x: y + Math.cos(X) * x * ae, y: b + Math.sin(X) * x * ae };
  }), D = Kn.map((C, O) => {
    const X = -Math.PI / 2 + 2 * Math.PI * O / E;
    return { x: y + Math.cos(X) * x, y: b + Math.sin(X) * x, angle: X };
  }), B = R.map((C) => `${C.x.toFixed(2)},${C.y.toFixed(2)}`).join(" "), z = bN(t), _ = S.useCallback(
    (C, O, X) => {
      if (!w || !s || !f.current) return;
      const ae = f.current.getBoundingClientRect(), I = l / ae.width, le = (C - ae.left) * I - y, ue = (O - ae.top) * I - b;
      if (X === void 0 && le * le + ue * ue < 64) return;
      const re = X ?? vN(le, ue, E), U = -Math.PI / 2 + 2 * Math.PI * re / E, H = Math.cos(U), J = Math.sin(U), ne = (le * H + ue * J) / x, fe = Po(ne), M = t.slice();
      M[re] = B0(fe, 0.01), s(M), p(re);
    },
    [E, y, b, w, s, x, l, t]
  ), k = (C) => {
    w && (C.preventDefault(), C.currentTarget.setPointerCapture?.(C.pointerId), _(C.clientX, C.clientY));
  }, G = (C) => {
    !w || h === null || C.buttons === 0 || _(C.clientX, C.clientY, h);
  }, ee = (C) => {
    C.currentTarget.releasePointerCapture?.(C.pointerId), p(null);
  }, te = (C) => {
    if (!w || !s) return;
    const O = h ?? z.index, X = C.shiftKey ? 0.1 : 0.05;
    let ae = t[O] ?? 0, I = O;
    switch (C.key) {
      case "ArrowUp":
      case "ArrowRight":
        ae = Po(ae + X);
        break;
      case "ArrowDown":
      case "ArrowLeft":
        ae = Po(ae - X);
        break;
      case "Tab":
        return;
      case "Home":
        ae = 0;
        break;
      case "End":
        ae = 1;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8": {
        const ue = Number(C.key) - 1;
        I = ue, ae = t[ue] ?? 0, p(ue), C.preventDefault();
        return;
      }
      default:
        return;
    }
    C.preventDefault();
    const le = t.slice();
    le[I] = B0(ae, 0.01), s(le), p(I);
  };
  return /* @__PURE__ */ g.jsxs("div", { className: hN, children: [
    /* @__PURE__ */ g.jsxs(
      "svg",
      {
        ref: f,
        width: l,
        height: l,
        viewBox: `0 0 ${l} ${l}`,
        role: w ? "application" : "img",
        "aria-label": w ? "Emotion vector radar — drag a vertex or press 1-8 then ↑↓ to adjust" : "Emotion vector radar",
        "aria-describedby": m,
        tabIndex: w ? 0 : void 0,
        onPointerDown: k,
        onPointerMove: G,
        onPointerUp: ee,
        onPointerCancel: ee,
        onKeyDown: te,
        className: w ? mN : void 0,
        children: [
          /* @__PURE__ */ g.jsxs("g", { stroke: "currentColor", strokeOpacity: 0.18, fill: "none", children: [
            [0.25, 0.5, 0.75, 1].map((C) => /* @__PURE__ */ g.jsx(
              "polygon",
              {
                points: D.map((O) => `${y + (O.x - y) * C},${b + (O.y - b) * C}`).join(" ")
              },
              C
            )),
            D.map((C, O) => /* @__PURE__ */ g.jsx("line", { x1: y, y1: b, x2: C.x, y2: C.y }, Kn[O]))
          ] }),
          /* @__PURE__ */ g.jsx(
            cN.polygon,
            {
              points: B,
              fill: "currentColor",
              fillOpacity: 0.32,
              stroke: "currentColor",
              strokeWidth: 1.5,
              initial: c || a === void 0 ? !1 : { scale: 0.92, opacity: 0.2 },
              animate: { scale: 1, opacity: 1 },
              style: { transformOrigin: `${y}px ${b}px` },
              transition: c ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
            },
            a ?? "static"
          ),
          R.map((C, O) => {
            const X = h === O, ae = O === z.index && z.value > 0, I = X ? 6 : ae ? 5 : 3;
            return /* @__PURE__ */ g.jsx(
              "circle",
              {
                cx: C.x,
                cy: C.y,
                r: I,
                fill: X || ae ? "currentColor" : dN.color.surfaceMuted,
                stroke: "currentColor",
                strokeWidth: X ? 2 : 1
              },
              Kn[O]
            );
          }),
          D.map((C, O) => /* @__PURE__ */ g.jsx(
            "text",
            {
              x: y + Math.cos(C.angle) * (x + 16),
              y: b + Math.sin(C.angle) * (x + 16) + 3,
              textAnchor: "middle",
              fontSize: 10,
              fill: "currentColor",
              opacity: O === z.index && z.value > 0 ? 1 : 0.72,
              fontWeight: O === z.index && z.value > 0 ? 600 : 400,
              children: Kn[O]
            },
            Kn[O]
          ))
        ]
      }
    ),
    /* @__PURE__ */ g.jsx("div", { id: m, className: pN, "aria-live": "polite", children: (() => {
      if (h !== null) {
        const C = t[h] ?? 0;
        return /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
          /* @__PURE__ */ g.jsx("span", { className: U0, children: Kn[h] }),
          /* @__PURE__ */ g.jsx("span", { className: V0, children: C.toFixed(2) })
        ] });
      }
      return z.value > 0 ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
        /* @__PURE__ */ g.jsx("span", { className: U0, children: Kn[z.index] }),
        /* @__PURE__ */ g.jsx("span", { className: V0, children: z.value.toFixed(2) })
      ] }) : /* @__PURE__ */ g.jsx("span", { className: yN, children: "neutral · 0.00" });
    })() })
  ] });
}
function Po(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function B0(t, a) {
  return Math.round(t / a) * a;
}
function vN(t, a, l) {
  let s = Math.atan2(a, t);
  return s += Math.PI / 2, s < 0 && (s += 2 * Math.PI), Math.round(s * l / (2 * Math.PI)) % l;
}
function bN(t) {
  let a = 0, l = 0;
  for (let s = 0; s < Kn.length; s += 1) {
    const o = t[s] ?? 0;
    o > l && (l = o, a = s);
  }
  return { index: a, value: l };
}
const xN = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function SN({ vector: t, onChange: a, disabled: l = !1 }) {
  const s = (o, c) => {
    const f = Math.max(0, Math.min(1, Number.isFinite(c) ? c : 0)), h = [...t];
    h[o] = f, a(h);
  };
  return /* @__PURE__ */ g.jsx("fieldset", { className: oM, "aria-label": "Emotion axes", children: xN.map((o, c) => /* @__PURE__ */ g.jsxs("div", { className: uM, children: [
    /* @__PURE__ */ g.jsx("label", { htmlFor: `emo-slider-${c}`, className: Kb, children: o }),
    /* @__PURE__ */ g.jsx(
      "input",
      {
        id: `emo-slider-${c}`,
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
        value: t[c] ?? 0,
        disabled: l,
        onChange: (f) => s(c, Number(f.currentTarget.value)),
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": t[c] ?? 0,
        className: Qb
      }
    ),
    /* @__PURE__ */ g.jsx(
      "input",
      {
        type: "number",
        min: 0,
        max: 1,
        step: 0.01,
        value: Number((t[c] ?? 0).toFixed(2)),
        disabled: l,
        onChange: (f) => s(c, Number(f.currentTarget.value)),
        className: Zb,
        "aria-label": `${o} numeric value`
      }
    )
  ] }, o)) });
}
const EN = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
], FS = [0, 0, 0, 0, 0, 0, 0, 0], TN = `Per-line overrides (inside the [Char|…] tag):

  [Bob|emotion_vector:happy=0.7,surprised=0.2]  text…
  [Alice|qwen:Friendly teen voice]              text…
  [Carol:happy_sarah]                           text…   (legacy compat ref)

Precedence (highest wins): inline → legacy compat ref → mapping default → global panel.
Global alpha applies to every line unless a mapping overrides it.`;
function wN({ value: t, onChange: a, deploymentId: l }) {
  const s = t.mode ?? "none", o = RN(t.vector), c = t.emotionAlpha ?? 1, [f, h] = S.useState([]), [p, m] = S.useState(null), [y, b] = S.useState(""), [x, E] = S.useState(""), [w, R] = S.useState(0), [D, B] = S.useState(!1), z = S.useRef(!0);
  S.useEffect(() => (z.current = !0, () => {
    z.current = !1;
  }), []), S.useEffect(() => {
    let I = !1;
    return m(null), WC(l).then((le) => {
      I || h(H0(le.presets));
    }).catch((le) => {
      I || m(gd(le));
    }), () => {
      I = !0;
    };
  }, [l]);
  const _ = S.useMemo(
    () => f.find((I) => I.presetId === x) ?? null,
    [f, x]
  ), k = (I) => {
    a({ ...t, mode: I });
  }, G = (I) => {
    a({ ...t, mode: "emotion_vector", vector: I }), _ && !MN(_.vector, I) && E("");
  }, ee = (I) => {
    const le = Math.max(0, Math.min(1, Number.isFinite(I) ? I : 1));
    a({ ...t, emotionAlpha: le });
  }, te = (I) => {
    const le = f.find((ue) => ue.presetId === I);
    le && (E(I), a({ ...t, mode: "emotion_vector", vector: le.vector }), R((ue) => ue + 1));
  }, C = async () => {
    const I = y.trim();
    if (I) {
      B(!0), m(null);
      try {
        const le = await eM(l, I, o);
        if (!z.current) return;
        h((ue) => H0([le, ...ue.filter((re) => re.presetId !== le.presetId)])), E(le.presetId), b(""), R((ue) => ue + 1);
      } catch (le) {
        z.current && m(gd(le));
      } finally {
        z.current && B(!1);
      }
    }
  }, O = async (I) => {
    const le = f;
    h((ue) => ue.filter((re) => re.presetId !== I)), x === I && E("");
    try {
      await tM(l, I);
    } catch (ue) {
      z.current && (h(le), m(gd(ue)));
    }
  }, X = () => G(FS), ae = () => {
    const I = Array.from({ length: 8 }, () => Math.round(Math.random() * 100) / 100);
    G(I), R((le) => le + 1);
  };
  return /* @__PURE__ */ g.jsxs("div", { className: nM, children: [
    /* @__PURE__ */ g.jsxs("div", { className: aM, children: [
      /* @__PURE__ */ g.jsx(
        gN,
        {
          vector: o,
          pulseKey: w,
          onChange: (I) => G(I),
          disabled: s !== "emotion_vector"
        }
      ),
      /* @__PURE__ */ g.jsx("span", { className: Wf, children: AN(s, _?.presetName) })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: iM, children: [
      /* @__PURE__ */ g.jsx("div", { className: lM, role: "radiogroup", "aria-label": "Emotion source", children: EN.map((I) => /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === I.id,
          className: s === I.id ? sM : rM,
          onClick: () => k(I.id),
          children: I.label
        },
        I.id
      )) }),
      s === "emotion_vector" && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
        /* @__PURE__ */ g.jsxs("div", { className: cM, children: [
          /* @__PURE__ */ g.jsxs(
            "select",
            {
              className: fM,
              value: x,
              onChange: (I) => te(I.currentTarget.value),
              "aria-label": "Load preset",
              children: [
                /* @__PURE__ */ g.jsx("option", { value: "", children: "— Load preset —" }),
                f.map((I) => /* @__PURE__ */ g.jsx("option", { value: I.presetId, children: I.presetName }, I.presetId))
              ]
            }
          ),
          x && /* @__PURE__ */ g.jsx(
            Ge,
            {
              variant: "danger",
              size: "sm",
              onClick: () => void O(x),
              disabled: D,
              children: "Delete preset"
            }
          ),
          /* @__PURE__ */ g.jsx(Ge, { variant: "ghost", size: "sm", onClick: X, children: "Reset" }),
          /* @__PURE__ */ g.jsx(Ge, { variant: "ghost", size: "sm", onClick: ae, children: "Random" })
        ] }),
        /* @__PURE__ */ g.jsx(SN, { vector: o, onChange: G }),
        /* @__PURE__ */ g.jsxs(
          "form",
          {
            className: mM,
            onSubmit: (I) => {
              I.preventDefault(), C();
            },
            children: [
              /* @__PURE__ */ g.jsx(
                "input",
                {
                  type: "text",
                  className: pM,
                  value: y,
                  placeholder: "Name current vector",
                  onChange: (I) => b(I.currentTarget.value),
                  maxLength: 120,
                  "aria-label": "Preset name"
                }
              ),
              /* @__PURE__ */ g.jsx(
                Ge,
                {
                  type: "submit",
                  size: "sm",
                  disabled: D || y.trim().length === 0,
                  children: "Save preset"
                }
              )
            ]
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ g.jsxs("label", { children: [
        /* @__PURE__ */ g.jsxs("span", { className: Wf, children: [
          "Qwen template — use ",
          "{seg}",
          " for the line text."
        ] }),
        /* @__PURE__ */ g.jsx(
          "textarea",
          {
            className: hM,
            value: t.qwenTemplate ?? "",
            onChange: (I) => a({ ...t, mode: "qwen_template", qwenTemplate: I.currentTarget.value }),
            rows: 4
          }
        )
      ] }),
      s === "audio_ref" && /* @__PURE__ */ g.jsx("p", { className: Wf, children: "Audio references are attached per character in the mapping editor — the global panel only toggles the mode." }),
      s !== "none" && /* @__PURE__ */ g.jsxs("div", { className: dM, children: [
        /* @__PURE__ */ g.jsx("span", { className: Kb, children: "alpha" }),
        /* @__PURE__ */ g.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: c,
            className: Qb,
            onChange: (I) => ee(Number(I.currentTarget.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ g.jsx(
          "input",
          {
            type: "number",
            min: 0,
            max: 1,
            step: 0.01,
            value: Number(c.toFixed(2)),
            className: Zb,
            onChange: (I) => ee(Number(I.currentTarget.value)),
            "aria-label": "Emotion alpha numeric"
          }
        )
      ] }),
      p && /* @__PURE__ */ g.jsx(Kt, { severity: "error", children: p }),
      /* @__PURE__ */ g.jsx("pre", { className: yM, children: TN })
    ] })
  ] });
}
function RN(t) {
  return !t || t.length !== 8 ? [...FS] : t.map((a) => CN(a));
}
function CN(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function MN(t, a) {
  for (let l = 0; l < 8; l += 1) {
    const s = t[l] ?? 0, o = a[l] ?? 0;
    if (Math.abs(s - o) > 1e-6) return !1;
  }
  return !0;
}
function H0(t) {
  return [...t].sort((a, l) => l.updatedAt - a.updatedAt);
}
function AN(t, a) {
  switch (t) {
    case "none":
      return "No global emotion — mappings and inline overrides still apply.";
    case "audio_ref":
      return "Audio reference — wire per-character refs in the mapping editor.";
    case "emotion_vector":
      return a ? `Vector preset: ${a}` : "Free-form vector.";
    case "qwen_template":
      return "Qwen template drives emotion for every utterance.";
  }
}
function gd(t) {
  return t instanceof $i ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
const k0 = [
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
], jN = {
  help: "Read hits, write misses. Fastest on re-runs."
};
function DN({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: l,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: c,
  generation: f,
  onGenerationChange: h
}) {
  const p = (y, b) => {
    h({ ...f, [y]: b });
  }, m = k0.find((y) => y.id === o) ?? jN;
  return /* @__PURE__ */ g.jsxs("div", { children: [
    /* @__PURE__ */ g.jsxs("label", { className: li, children: [
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "Format" }),
      /* @__PURE__ */ g.jsxs("select", { value: t, onChange: (y) => a(y.currentTarget.value), children: [
        /* @__PURE__ */ g.jsx("option", { value: "mp3", children: "mp3" }),
        /* @__PURE__ */ g.jsx("option", { value: "wav", children: "wav" }),
        /* @__PURE__ */ g.jsx("option", { value: "flac", children: "flac" })
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("label", { className: li, children: [
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "Speed" }),
      /* @__PURE__ */ g.jsx(
        "input",
        {
          type: "range",
          min: 0.5,
          max: 2,
          step: 0.05,
          value: l,
          onChange: (y) => s(Number(y.currentTarget.value))
        }
      ),
      /* @__PURE__ */ g.jsxs("output", { children: [
        l.toFixed(2),
        "×"
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs(
      "div",
      {
        className: li,
        role: "radiogroup",
        "aria-label": "Cache policy",
        children: [
          /* @__PURE__ */ g.jsx("span", { className: hn, children: "Cache" }),
          k0.map((y) => /* @__PURE__ */ g.jsx(
            Ge,
            {
              variant: o === y.id ? "primary" : "secondary",
              size: "sm",
              role: "radio",
              "aria-checked": o === y.id,
              onClick: () => c(y.id),
              title: y.help,
              children: y.label
            },
            y.id
          ))
        ]
      }
    ),
    /* @__PURE__ */ g.jsx("p", { className: hn, "aria-live": "polite", children: m.help }),
    /* @__PURE__ */ g.jsxs("label", { className: li, children: [
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "Temperature" }),
      /* @__PURE__ */ g.jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 2,
          step: 0.05,
          defaultValue: 0.8,
          onChange: (y) => p("temperature", Number(y.currentTarget.value))
        }
      )
    ] }),
    /* @__PURE__ */ g.jsxs("label", { className: li, children: [
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "Top-p" }),
      /* @__PURE__ */ g.jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 1,
          step: 0.05,
          defaultValue: 0.8,
          onChange: (y) => p("top_p", Number(y.currentTarget.value))
        }
      )
    ] }),
    /* @__PURE__ */ g.jsxs("label", { className: li, children: [
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "Seed" }),
      /* @__PURE__ */ g.jsx(
        "input",
        {
          type: "number",
          defaultValue: 42,
          onChange: (y) => p("seed", Number(y.currentTarget.value))
        }
      )
    ] })
  ] });
}
const NN = ["cancelled", "failed", "partial"];
function zN({ runs: t, deploymentId: a }) {
  const l = Gi(), [s, o] = S.useState(null), [c, f] = S.useState(null);
  if (t.length === 0)
    return /* @__PURE__ */ g.jsx(Yl, { title: "No runs yet.", hint: "Generate to see history" });
  const h = async (p) => {
    o(p), f(null);
    try {
      const { runId: m } = await ph(a, p);
      l(`/${a}/runs/${m}`);
    } catch (m) {
      f(_N(m));
    } finally {
      o(null);
    }
  };
  return /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    c && /* @__PURE__ */ g.jsx(Kt, { severity: "error", children: c }),
    /* @__PURE__ */ g.jsx("ul", { className: Ad, children: t.map((p) => {
      const m = NN.includes(p.status) && p.kind === "batch";
      return /* @__PURE__ */ g.jsxs("li", { children: [
        /* @__PURE__ */ g.jsxs(cs, { to: `/${a}/runs/${p.runId}`, children: [
          p.kind,
          " · ",
          p.status,
          " · ",
          new Date(p.queuedAt * 1e3).toLocaleString()
        ] }),
        m && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
          " ",
          /* @__PURE__ */ g.jsx(wa, { tone: p.status === "failed" ? "danger" : "warning", children: "partial — resumable" }),
          " ",
          /* @__PURE__ */ g.jsx(
            Ge,
            {
              variant: "secondary",
              disabled: s === p.runId,
              onClick: () => void h(p.runId),
              children: s === p.runId ? "Resuming…" : "Resume"
            }
          )
        ] })
      ] }, p.runId);
    }) })
  ] });
}
function _N(t) {
  return t instanceof $i ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
var ON = "xq3iim0", LN = "xq3iim2 xq3iim1", UN = "xq3iim3 xq3iim1", VN = "xq3iim4", BN = "xq3iim5", HN = "xq3iim6", kN = "xq3iim7";
function qN({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: l
}) {
  const [s, o] = S.useState([]), [c, f] = S.useState(a), [h, p] = S.useState(!0), [m, y] = S.useState(!1), [b, x] = S.useState(null);
  S.useEffect(() => {
    let w = !1;
    return p(!0), su(t).then(({ voiceAssets: R }) => {
      w || o(R);
    }).catch((R) => {
      w || x(R instanceof Error ? R.message : "Failed to load voices");
    }).finally(() => {
      w || p(!1);
    }), () => {
      w = !0;
    };
  }, [t]);
  async function E(w) {
    y(!0), x(null);
    const R = c;
    f(w);
    try {
      await kR(t, w), l?.(w);
    } catch (D) {
      f(R), x(D instanceof Error ? D.message : "Failed to update default voice");
    } finally {
      y(!1);
    }
  }
  return h ? /* @__PURE__ */ g.jsx("p", { className: HN, children: "Loading voices…" }) : b ? /* @__PURE__ */ g.jsx("p", { className: kN, children: b }) : s.length === 0 ? /* @__PURE__ */ g.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ g.jsx(
    Yl,
    {
      title: "No voices yet.",
      hint: "Upload a voice in Mappings to enable quick mode."
    }
  ) }) : /* @__PURE__ */ g.jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Default voice for quick mode",
      className: ON,
      children: s.map((w) => {
        const R = w.voiceAssetId === c;
        return /* @__PURE__ */ g.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": R,
            disabled: m,
            onClick: () => void E(R ? null : w.voiceAssetId),
            className: R ? UN : LN,
            children: [
              /* @__PURE__ */ g.jsx("span", { className: VN, children: w.displayName }),
              w.durationMs !== null && w.durationMs !== void 0 && /* @__PURE__ */ g.jsx("span", { className: BN, children: PN(w.durationMs) })
            ]
          },
          w.voiceAssetId
        );
      })
    }
  );
}
function PN(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const l = Math.floor(a / 60), s = Math.round(a - l * 60);
  return `${l}:${s.toString().padStart(2, "0")}`;
}
function YN(t) {
  const a = Gi(), [l, s] = S.useState("idle"), [o, c] = S.useState(null), [f, h] = S.useState(/* @__PURE__ */ new Map()), [p, m] = S.useState(null), [y, b] = S.useState(null), x = S.useRef(null);
  S.useEffect(() => () => {
    x.current?.();
  }, []);
  const E = S.useCallback(async () => {
    s("starting"), m(null), h(/* @__PURE__ */ new Map()), b(null);
    try {
      const O = await $R(t.deploymentId, t.createPayload);
      c(O.runId), s("running"), x.current?.(), x.current = pv(
        t.deploymentId,
        O.runId,
        (X) => q0(X, h, s, b, t.deploymentId, O.runId),
        () => s("error")
      );
    } catch (O) {
      s("error"), m(vd(O));
    }
  }, [t.deploymentId, t.createPayload]), w = S.useCallback(async () => {
    if (o)
      try {
        await XR(t.deploymentId, o);
      } catch (O) {
        m(vd(O));
      }
  }, [t.deploymentId, o]), R = Array.from(f.values()).sort((O, X) => O.globalIndex - X.globalIndex), D = l === "starting" || l === "running", B = y?.status === "partial", z = R.filter((O) => O.status === "failed"), _ = (() => {
    if (l !== "terminal" || z.length === 0) return null;
    const O = /* @__PURE__ */ new Map();
    for (const le of z) {
      const ue = le.failureCategory ?? "unknown";
      O.set(ue, (O.get(ue) ?? 0) + 1);
    }
    let X = "unknown", ae = 0;
    for (const [le, ue] of O)
      ue > ae && (X = le, ae = ue);
    const I = R.length;
    return { category: X, count: ae, total: I };
  })(), k = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, G = "Check the run detail page for the per-segment error log.", ee = p?.toLowerCase().includes("unmapped") ?? !1, te = t.diagnostics ?? [], C = te.find((O) => O.status === "fail");
  return /* @__PURE__ */ g.jsxs("div", { children: [
    te.length > 0 && /* @__PURE__ */ g.jsx("ul", { className: qC, "aria-label": "Pre-flight checks", children: te.map((O) => /* @__PURE__ */ g.jsxs("li", { className: PC, children: [
      /* @__PURE__ */ g.jsx(wa, { tone: GN(O.status), children: $N(O.status) }),
      /* @__PURE__ */ g.jsx("span", { className: YC, children: O.label }),
      O.detail && /* @__PURE__ */ g.jsx("span", { className: FC, children: O.detail })
    ] }, O.label)) }),
    p && /* @__PURE__ */ g.jsxs(
      Kt,
      {
        severity: "error",
        style: {
          marginBottom: 12,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8
        },
        children: [
          /* @__PURE__ */ g.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ g.jsx("span", { children: p }),
          ee && /* @__PURE__ */ g.jsx(
            Ge,
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
    /* @__PURE__ */ g.jsxs("div", { className: li, children: [
      /* @__PURE__ */ g.jsx(
        Ge,
        {
          disabled: !t.canGenerate || D || !!C,
          onClick: E,
          children: l === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ g.jsx(Ge, { variant: "danger", disabled: !D, onClick: w, children: "Cancel" })
    ] }),
    _ && /* @__PURE__ */ g.jsxs(Kt, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ g.jsxs("strong", { children: [
        "Run failed — ",
        _.count,
        " of ",
        _.total,
        " segments failed with ",
        /* @__PURE__ */ g.jsx("code", { children: _.category })
      ] }),
      /* @__PURE__ */ g.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: k[_.category] ?? G })
    ] }),
    y?.exportArtifactRef && /* @__PURE__ */ g.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${y.exportArtifactRef}/download`,
        download: !0,
        className: `${Xb.secondary} ${Ib.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    B && y && /* @__PURE__ */ g.jsxs(Kt, { severity: "warning", children: [
      /* @__PURE__ */ g.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ g.jsx(
        Ge,
        {
          variant: "secondary",
          disabled: !!C,
          onClick: async () => {
            try {
              const O = await ph(t.deploymentId, y.runId);
              c(O.runId), h(/* @__PURE__ */ new Map()), b(null), s("running"), x.current?.(), x.current = pv(
                t.deploymentId,
                O.runId,
                (X) => q0(X, h, s, b, t.deploymentId, O.runId),
                () => s("error")
              );
            } catch (O) {
              m(vd(O)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    R.length > 0 && /* @__PURE__ */ g.jsxs("table", { className: HC, children: [
      /* @__PURE__ */ g.jsx("thead", { children: /* @__PURE__ */ g.jsxs("tr", { children: [
        /* @__PURE__ */ g.jsx("th", { className: ai, children: "#" }),
        /* @__PURE__ */ g.jsx("th", { className: ai, children: "Status" }),
        /* @__PURE__ */ g.jsx("th", { className: ai, children: "Duration" }),
        /* @__PURE__ */ g.jsx("th", { className: ai, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ g.jsx("tbody", { children: R.map((O) => /* @__PURE__ */ g.jsxs("tr", { className: kC, children: [
        /* @__PURE__ */ g.jsx("td", { className: ai, children: O.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ g.jsx("td", { className: ai, children: /* @__PURE__ */ g.jsx(wa, { tone: FN(O.status), children: O.status }) }),
        /* @__PURE__ */ g.jsx("td", { className: ai, children: O.durationMs ? `${O.durationMs} ms` : "—" }),
        /* @__PURE__ */ g.jsx("td", { className: ai, children: O.failureCategory ?? "" })
      ] }, O.globalIndex)) })
    ] })
  ] });
}
async function q0(t, a, l, s, o, c) {
  switch (t.type) {
    case "segment_started":
      a((f) => {
        const h = new Map(f);
        return h.set(t.globalIndex, { globalIndex: t.globalIndex, status: "running" }), h;
      });
      return;
    case "segment_completed":
      a((f) => {
        const h = new Map(f);
        return h.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "completed",
          durationMs: t.durationMs
        }), h;
      });
      return;
    case "segment_failed":
      a((f) => {
        const h = new Map(f);
        return h.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "failed",
          failureCategory: t.failureCategory
        }), h;
      });
      return;
    case "run_terminal":
      l("terminal");
      try {
        const f = await mh(o, c);
        s(f);
      } catch {
      }
      return;
  }
}
function FN(t) {
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
function GN(t) {
  switch (t) {
    case "ok":
      return "success";
    case "warn":
      return "warning";
    case "fail":
      return "danger";
  }
}
function $N(t) {
  switch (t) {
    case "ok":
      return "ok";
    case "warn":
      return "warn";
    case "fail":
      return "stop";
  }
}
function vd(t) {
  return t instanceof $i || t instanceof Error ? t.message : "unknown error";
}
const P0 = [
  "var(--accent, #ba9eff)",
  "var(--secondary, #9093ff)",
  "var(--tertiary, #ff8439)",
  "var(--success, #80e0a8)",
  "var(--warning, #f0c265)",
  "var(--info, #7fdbff)"
];
function XN(t) {
  const a = Gi(), l = S.useRef(null), { tokens: s, attributions: o, unresolved: c, predictedFilenames: f, characterColor: h } = S.useMemo(
    () => KN(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), p = (m) => {
    const y = l.current;
    y && (y.scrollTop = m.currentTarget.scrollTop, y.scrollLeft = m.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ g.jsxs("div", { children: [
    /* @__PURE__ */ g.jsxs("div", { className: OC, children: [
      /* @__PURE__ */ g.jsx("div", { ref: l, className: LC, "aria-hidden": "true", children: s.map((m, y) => IN(m, y, h)) }),
      /* @__PURE__ */ g.jsx(
        "textarea",
        {
          className: UC,
          value: t.value,
          onChange: (m) => t.onChange(m.currentTarget.value),
          onScroll: p,
          placeholder: `[Bob] Hey there
[Alice] Hello
...`,
          "aria-label": "Dialogue script",
          spellCheck: !1
        }
      )
    ] }),
    c.length > 0 && /* @__PURE__ */ g.jsxs(Kt, { severity: "error", children: [
      /* @__PURE__ */ g.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      c.map((m) => /* @__PURE__ */ g.jsxs(
        Ge,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => a(
            `/${t.deploymentId}/mappings/new?character=${encodeURIComponent(m)}`
          ),
          children: [
            "Create mapping for ",
            m
          ]
        },
        m
      ))
    ] }),
    o.length > 0 && /* @__PURE__ */ g.jsxs("div", { children: [
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "Parsed lines" }),
      /* @__PURE__ */ g.jsx("ul", { className: Ad, children: o.map((m) => /* @__PURE__ */ g.jsxs("li", { children: [
        "#",
        m.lineNumber.toString().padStart(3, "0"),
        " [",
        m.character,
        "] ",
        m.text,
        !m.hasMapping && m.character !== "Narrator" && " — unresolved"
      ] }, m.lineNumber)) })
    ] }),
    f.length > 0 && /* @__PURE__ */ g.jsxs("div", { children: [
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "Predicted filenames" }),
      /* @__PURE__ */ g.jsx("ul", { className: Ad, children: f.map((m) => /* @__PURE__ */ g.jsx("li", { children: m }, m)) })
    ] })
  ] });
}
function IN(t, a, l) {
  if (t.kind === "blank")
    return /* @__PURE__ */ g.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ g.jsxs("span", { children: [
      /* @__PURE__ */ g.jsx("span", { className: gv, children: t.raw }),
      `
`
    ] }, a);
  const s = l.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? yv : `${yv} ${VC}`;
  return /* @__PURE__ */ g.jsxs("span", { children: [
    /* @__PURE__ */ g.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ g.jsxs("span", { className: BC, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ g.jsxs("span", { className: gv, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function KN(t, a, l) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = [], f = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Map(), p = [], m = /* @__PURE__ */ new Map();
  let y = 0;
  const b = t.split(/\r?\n/);
  let x = 0;
  return b.forEach((E, w) => {
    const R = E.trim();
    if (!R) {
      o.push({ kind: "blank", raw: E });
      return;
    }
    const D = w + 1, B = R.match(s);
    let z = "Narrator", _ = R, k, G = !1;
    if (B?.groups) {
      G = !0;
      const O = (B.groups.body ?? "").trim(), X = (B.groups.rest ?? "").trim();
      z = ((O.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", k = (O.includes("|") ? O.slice(O.indexOf("|") + 1) : "").trim() || void 0, _ = X;
    }
    x += 1;
    const ee = z.toLowerCase(), te = (h.get(ee) ?? 0) + 1;
    h.set(ee, te);
    const C = z === "Narrator" || l.has(ee);
    if (C || f.add(z), z !== "Narrator" && !m.has(ee) && (m.set(ee, P0[y % P0.length] ?? "currentColor"), y += 1), G) {
      const O = { kind: "character", raw: E, character: z, text: _, hasMapping: C };
      k !== void 0 && (O.override = k), o.push(O);
    } else
      o.push({ kind: "narrator", raw: E });
    c.push({ lineNumber: D, character: z, text: _, hasMapping: C }), p.push(
      `${x.toString().padStart(3, "0")}_${QN(z)}_${te.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: c,
    unresolved: Array.from(f),
    predictedFilenames: p,
    characterColor: m
  };
}
function QN(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
function ZN(t) {
  const a = t.workflowCustomised ?? !1, l = t.unmappableFields ?? [];
  return /* @__PURE__ */ g.jsxs("div", { className: jC, children: [
    /* @__PURE__ */ g.jsxs("header", { className: zC, children: [
      /* @__PURE__ */ g.jsx("h1", { className: _C, children: t.deployment.displayName }),
      t.header
    ] }),
    a && /* @__PURE__ */ g.jsxs(Kt, { severity: "warning", children: [
      /* @__PURE__ */ g.jsx("strong", { children: "Workflow customised." }),
      " ",
      l.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${l.join(", ")}.`,
      " ",
      /* @__PURE__ */ g.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: DC, children: [
      /* @__PURE__ */ g.jsxs(nn, { "aria-labelledby": "recipe-section-script", children: [
        /* @__PURE__ */ g.jsx("h2", { id: "recipe-section-script", className: Rn, children: "01 / Script" }),
        t.scriptEditor
      ] }),
      /* @__PURE__ */ g.jsxs(nn, { "aria-labelledby": "recipe-section-settings", children: [
        /* @__PURE__ */ g.jsx("h2", { id: "recipe-section-settings", className: Rn, children: "02 / Settings" }),
        t.settingsPanel
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: NC, children: [
      /* @__PURE__ */ g.jsxs(nn, { "aria-labelledby": "recipe-section-run", children: [
        /* @__PURE__ */ g.jsx("h2", { id: "recipe-section-run", className: Rn, children: "03 / Run" }),
        t.runPanel
      ] }),
      /* @__PURE__ */ g.jsxs(nn, { "aria-labelledby": "recipe-section-emotion", children: [
        /* @__PURE__ */ g.jsx("h2", { id: "recipe-section-emotion", className: Rn, children: "04 / Emotion" }),
        t.emotionPanel
      ] }),
      /* @__PURE__ */ g.jsxs(nn, { "aria-labelledby": "recipe-section-history", children: [
        /* @__PURE__ */ g.jsx("h2", { id: "recipe-section-history", className: Rn, children: "05 / Recent runs" }),
        t.historyPanel
      ] })
    ] })
  ] });
}
function JN() {
  const { deployment: t, mappings: a, runs: l, workflow: s } = us(), [o, c] = S.useState(""), [f, h] = S.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [p, m] = S.useState(t.defaultSpeedFactor ?? 1), [y, b] = S.useState({
    mode: "none",
    emotionAlpha: 1
  }), [x, E] = S.useState({}), [w, R] = S.useState("use_cache"), [D, B] = S.useState(t.defaultVoiceAssetId != null), z = S.useMemo(
    () => ({
      script: o,
      parserMode: D ? "raw_text" : "dialogue",
      outputFormat: f,
      speedFactor: p,
      globalEmotion: y,
      generation: x,
      cachePolicy: w
    }),
    [o, D, f, p, y, x, w]
  ), _ = S.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const ee of a)
      G.set(ee.characterName.toLowerCase(), ee);
    return G;
  }, [a]), k = S.useMemo(() => {
    const G = [], ee = o.trim();
    if (ee.length === 0)
      G.push({ label: "Script", status: "fail", detail: "empty" });
    else {
      const te = ee.split(/\r?\n/).filter((C) => C.trim().length > 0).length;
      G.push({ label: "Script", status: "ok", detail: `${te} lines` });
    }
    if (D)
      t.defaultVoiceAssetId ? G.push({ label: "Quick voice", status: "ok", detail: "default voice set" }) : G.push({ label: "Quick voice", status: "fail", detail: "no default voice" });
    else {
      const te = /* @__PURE__ */ new Set(), C = /^\[(?<body>[^\]]*)\]/;
      for (const X of ee.split(/\r?\n/)) {
        const ae = X.trim();
        if (!ae) continue;
        const ue = (ae.match(C)?.groups?.body?.split("|")[0]?.trim() ?? "").split(":")[0]?.trim() ?? "";
        ue && te.add(ue.toLowerCase());
      }
      const O = Array.from(te).filter((X) => !_.has(X));
      te.size === 0 ? G.push({ label: "Cast", status: "warn", detail: "no characters detected" }) : O.length === 0 ? G.push({
        label: "Cast",
        status: "ok",
        detail: `${te.size} mapped`
      }) : G.push({
        label: "Cast",
        status: "fail",
        detail: `${O.length} unmapped`
      });
    }
    return y.mode === "qwen_template" && !y.qwenTemplate?.trim() && G.push({ label: "Emotion", status: "warn", detail: "Qwen template empty" }), G;
  }, [o, D, t.defaultVoiceAssetId, _, y]);
  return /* @__PURE__ */ g.jsx(
    ZN,
    {
      deployment: t,
      workflowCustomised: s.workflow.customised,
      unmappableFields: s.unmappableFields,
      header: /* @__PURE__ */ g.jsx(QC, { deployment: t }),
      scriptEditor: /* @__PURE__ */ g.jsxs("div", { children: [
        /* @__PURE__ */ g.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
          /* @__PURE__ */ g.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ g.jsx(
              "input",
              {
                type: "checkbox",
                checked: D,
                onChange: (G) => B(G.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          D && /* @__PURE__ */ g.jsx(
            qN,
            {
              deploymentId: t.deploymentId,
              initialVoiceAssetId: t.defaultVoiceAssetId ?? null
            }
          )
        ] }),
        /* @__PURE__ */ g.jsx(
          XN,
          {
            value: o,
            onChange: c,
            outputFormat: f,
            mappings: _,
            deploymentId: t.deploymentId
          }
        )
      ] }),
      emotionPanel: /* @__PURE__ */ g.jsx(
        wN,
        {
          value: y,
          onChange: b,
          deploymentId: t.deploymentId
        }
      ),
      settingsPanel: /* @__PURE__ */ g.jsx(
        DN,
        {
          outputFormat: f,
          onOutputFormatChange: h,
          speedFactor: p,
          onSpeedFactorChange: m,
          cachePolicy: w,
          onCachePolicyChange: R,
          generation: x,
          onGenerationChange: E
        }
      ),
      runPanel: /* @__PURE__ */ g.jsx(
        YN,
        {
          deploymentId: t.deploymentId,
          createPayload: z,
          canGenerate: o.trim().length > 0,
          diagnostics: k
        }
      ),
      historyPanel: /* @__PURE__ */ g.jsx(zN, { runs: l, deploymentId: t.deploymentId })
    }
  );
}
const Y0 = 32, F0 = -30, G0 = -6, $0 = 0.5, X0 = 2;
class Pl extends Error {
  constructor(a, l) {
    super(l), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function WN(t, a, l, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, c = `${Xi}${o}`, f = await fetch(c, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(l),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (f.status === 409) {
    const h = await f.json().catch(() => null), p = h?.error?.current_digest ?? "", m = h?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Pl(p, m);
  }
  if (!f.ok)
    throw new Error(await Au(f, "apply"));
  return await f.json();
}
async function ez(t, a, l, s, o = {}) {
  const c = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(l)}/edit`, f = `${Xi}${c}`, h = await fetch(f, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (h.status === 409) {
    const p = await h.json().catch(() => null), m = p?.error?.current_digest ?? "", y = p?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Pl(m, y);
  }
  if (!h.ok)
    throw new Error(await Au(h, "apply"));
  return await h.json();
}
async function tz(t, a, l, s = {}) {
  const o = `${Xi}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: l }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!c.ok)
    throw new Error(await Au(c, "preview"));
  return c.blob();
}
async function nz(t, a, l, s = 50, o = {}) {
  const c = `${Xi}/audit/${encodeURIComponent(a)}/${encodeURIComponent(l)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(s))}`, f = await fetch(c, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!f.ok)
    throw new Error(await Au(f, "audit fetch"));
  return await f.json();
}
function Xl() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function GS(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Y0)
    return {
      message: `Chain exceeds the maximum of ${Y0} operations.`
    };
  for (const l of t.ops) {
    const s = az(l, a);
    if (s) return s;
  }
  return null;
}
function az(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return iz(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < F0 || t.target_lufs > G0 ? {
        opId: t.id,
        message: `Normalize target must be between ${F0} and ${G0} LUFS.`
      } : null;
    case "speed":
      return t.factor < $0 || t.factor > X0 ? {
        opId: t.id,
        message: `Speed factor must be between ${$0}× and ${X0}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function iz(t, a, l, s) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : l <= a ? { opId: t, message: "End must be greater than start." } : s > 0 && l > s ? { opId: t, message: "End extends past source duration." } : null;
}
async function Au(t, a) {
  const l = await t.json().catch(() => null);
  return l?.error?.message ?? l?.message ?? `${a} failed: ${t.status}`;
}
const I0 = /* @__PURE__ */ new Map();
function lz(t, a) {
  const [l, s] = S.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return S.useEffect(() => {
    if (!t || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${t}::${a}`, c = I0.get(o);
    if (c) {
      s({ peaks: c, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), rz(t, a, f.signal).then((h) => {
      f.signal.aborted || (I0.set(o, h), s({ peaks: h, isLoading: !1, error: null }));
    }).catch((h) => {
      if (f.signal.aborted) return;
      const p = h instanceof Error ? h.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: p });
    }), () => f.abort();
  }, [t, a]), l;
}
async function rz(t, a, l) {
  const s = await fetch(t, { signal: l });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (l.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return sz(f, a);
}
function sz(t, a) {
  const l = t.numberOfChannels, s = t.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), f = [];
  for (let h = 0; h < l; h += 1) f.push(t.getChannelData(h));
  for (let h = 0; h < a; h += 1) {
    const p = h * o, m = Math.min(s, p + o);
    let y = 0;
    for (let b = p; b < m; b += 1) {
      let x = 0;
      for (let w = 0; w < l; w += 1) {
        const R = f[w];
        R && (x += Math.abs(R[b] ?? 0));
      }
      const E = x / l;
      E > y && (y = E);
    }
    c[h] = y;
  }
  return c;
}
const K0 = "(prefers-reduced-motion: reduce)";
function oz() {
  const [t, a] = S.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(K0).matches);
  return S.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const l = window.matchMedia(K0), s = (o) => a(o.matches);
    return l.addEventListener("change", s), () => l.removeEventListener("change", s);
  }, []), t;
}
var uz = "mquzal0", cz = "mquzal1", Q0 = "mquzal2", Z0 = "mquzal3", J0 = "mquzal4", fz = "mquzal5", W0 = "mquzal6", eb = "mquzal7";
const dz = 120, hz = 720;
function $S(t) {
  const {
    audioUrl: a,
    durationMs: l,
    startMs: s,
    endMs: o,
    onChangeStart: c,
    onChangeEnd: f,
    isPlaying: h = !1,
    playbackPositionMs: p = 0,
    onSeek: m,
    width: y = hz,
    height: b = dz
  } = t, x = S.useRef(null), E = S.useRef(null), w = S.useRef(null), R = lz(a, y), D = oz();
  S.useEffect(() => {
    mz(x.current, R.peaks, y, b);
  }, [R.peaks, y, b]);
  const B = S.useCallback(
    (C) => {
      const O = E.current?.getBoundingClientRect();
      if (!O || O.width <= 0) return 0;
      const X = Math.max(0, Math.min(1, (C - O.left) / O.width));
      return Math.round(X * l);
    },
    [l]
  );
  S.useEffect(() => {
    const C = (X) => {
      if (!w.current) return;
      const ae = B(X.clientX);
      w.current === "start" ? c(Yo(ae, 0, o - 1)) : f(Yo(ae, s + 1, l));
    }, O = () => {
      w.current = null;
    };
    return window.addEventListener("pointermove", C), window.addEventListener("pointerup", O), () => {
      window.removeEventListener("pointermove", C), window.removeEventListener("pointerup", O);
    };
  }, [B, l, o, s, c, f]);
  const z = (C) => (O) => {
    O.preventDefault(), O.stopPropagation(), w.current = C;
  }, _ = (C) => {
    !m || C.target.closest("[data-handle]") || m(B(C.clientX));
  }, k = (C) => (O) => {
    const X = O.shiftKey ? 100 : O.ctrlKey ? 1 : 10;
    let ae = 0;
    if (O.key === "ArrowLeft") ae = -X;
    else if (O.key === "ArrowRight") ae = X;
    else return;
    O.preventDefault(), C === "start" ? c(Yo(s + ae, 0, o - 1)) : f(Yo(o + ae, s + 1, l));
  }, G = bd(s, l), ee = bd(o, l), te = bd(p, l);
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      ref: E,
      className: uz,
      style: { height: b },
      onPointerDown: _,
      children: [
        /* @__PURE__ */ g.jsx(
          "canvas",
          {
            ref: x,
            width: y,
            height: b,
            className: cz,
            "aria-label": "Audio waveform"
          }
        ),
        R.isLoading && /* @__PURE__ */ g.jsx("div", { className: eb, children: "Decoding waveform…" }),
        R.error && /* @__PURE__ */ g.jsx("div", { className: eb, role: "alert", children: R.error }),
        /* @__PURE__ */ g.jsx("div", { className: W0, style: { left: 0, width: `${G}%` } }),
        /* @__PURE__ */ g.jsx(
          "div",
          {
            className: W0,
            style: { left: `${ee}%`, right: 0, width: `${100 - ee}%` }
          }
        ),
        /* @__PURE__ */ g.jsxs(
          "div",
          {
            className: Q0,
            style: { left: `${G}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": l,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: z("start"),
            onKeyDown: k("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ g.jsx("span", { className: Z0, "aria-hidden": "true" }),
              /* @__PURE__ */ g.jsx("span", { className: J0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ g.jsxs(
          "div",
          {
            className: Q0,
            style: { left: `${ee}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": l,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: z("end"),
            onKeyDown: k("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ g.jsx("span", { className: Z0, "aria-hidden": "true" }),
              /* @__PURE__ */ g.jsx("span", { className: J0, "aria-hidden": "true" })
            ]
          }
        ),
        h && /* @__PURE__ */ g.jsx(
          "div",
          {
            className: fz,
            style: {
              left: `${te}%`,
              transition: D ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function bd(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function Yo(t, a, l) {
  return Math.max(a, Math.min(l, t));
}
function mz(t, a, l, s) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, l, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = pz(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, l);
  for (let h = 0; h < f; h += 1) {
    const p = a[h] ?? 0, m = Math.max(1, p * (s - 4));
    o.fillRect(h, c - m / 2, 1, m);
  }
}
function pz(t, a, l) {
  return getComputedStyle(t).getPropertyValue(a).trim() || l;
}
var yz = "r8lfsm0", gz = "r8lfsm1", vz = "r8lfsm2", bz = "r8lfsm3", xz = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, Sz = "_1b1zchy3", Ez = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, Tz = "_1b1zchy6", wz = "_1b1zchy7";
const XS = S.createContext("standalone");
function IS({
  variant: t = "standalone",
  children: a,
  className: l,
  style: s,
  ...o
}) {
  const c = [xz[t], l].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx(XS.Provider, { value: t, children: /* @__PURE__ */ g.jsx("div", { className: c, style: s, ...o, children: a }) });
}
function KS({
  title: t,
  meta: a,
  children: l,
  className: s,
  titleId: o
}) {
  const c = S.useContext(XS), f = [Sz, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsxs("div", { className: f, children: [
    /* @__PURE__ */ g.jsx("h3", { id: o, className: Ez[c], children: t }),
    a ? /* @__PURE__ */ g.jsx("span", { className: Tz, children: a }) : null,
    l
  ] });
}
function QS({
  children: t,
  className: a,
  role: l = "group"
}) {
  const s = [wz, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx("div", { className: s, role: l, children: t });
}
const tb = -16, Rz = 80, Cz = 720;
function Mz(t) {
  const { deploymentId: a, runId: l, utterance: s, audioUrl: o, onApplied: c, onError: f, onCancel: h } = t, p = s.durationMs ?? 0, [m, y] = S.useState(() => nb(p)), [b, x] = S.useState(!1), [E, w] = S.useState(null), [R, D] = S.useState(!1), B = S.useRef(null), z = S.useRef(null), _ = S.useRef(null);
  S.useEffect(() => {
    y(nb(p)), x(!1), w(null), _.current = null;
  }, [s.utteranceId, p]), S.useEffect(() => () => z.current?.abort(), []), S.useEffect(() => {
    B.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const k = S.useCallback(
    (le) => {
      le.key === "Escape" && (le.stopPropagation(), h());
    },
    [h]
  ), G = S.useMemo(
    () => m.ops.find((le) => le.mode === "trim"),
    [m.ops]
  ), ee = G?.start_ms ?? 0, te = G?.end_ms ?? Math.max(1, p), C = S.useCallback((le, ue) => {
    y((re) => Az(re, "trim", (U) => ({
      ...U,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(le)),
      end_ms: Math.max(Math.floor(le) + 1, Math.floor(ue))
    })));
  }, []), O = S.useCallback((le) => C(le, te), [te, C]), X = S.useCallback((le) => C(ee, le), [ee, C]), ae = S.useCallback((le) => {
    x(le), y((ue) => {
      const re = ue.ops.filter((U) => U.mode !== "normalize");
      if (le) {
        const U = {
          id: Xl(),
          mode: "normalize",
          target_lufs: tb
        };
        return { ...ue, ops: [...re, U] };
      }
      return { ...ue, ops: re };
    });
  }, []), I = S.useCallback(async () => {
    const le = GS(m, p);
    if (le) {
      w(le.message);
      return;
    }
    if (w(null), R) return;
    z.current?.abort();
    const ue = new AbortController();
    z.current = ue, D(!0);
    try {
      const re = _.current ?? void 0, U = await ez(
        a,
        l,
        s.utteranceId,
        re ? { chain: m, digest_before: re } : { chain: m },
        { signal: ue.signal }
      );
      if (ue.signal.aborted) return;
      _.current = U.chain_digest, c(U);
    } catch (re) {
      if (ue.signal.aborted) return;
      re instanceof Pl && (_.current = re.currentDigest || null);
      const U = re instanceof Pl ? "Edit chain has changed in another tab. Reload to continue." : re instanceof Error ? re.message : "apply failed";
      w(U), f(U);
    } finally {
      ue.signal.aborted || D(!1);
    }
  }, [m, p, R, a, l, s.utteranceId, c, f]);
  return /* @__PURE__ */ g.jsx(IS, { variant: "nested", children: /* @__PURE__ */ g.jsxs("div", { ref: B, onKeyDown: k, children: [
    /* @__PURE__ */ g.jsx(KS, { title: "Edit segment", meta: `Source · ${Fo(p)}` }),
    /* @__PURE__ */ g.jsx(
      $S,
      {
        audioUrl: o,
        durationMs: Math.max(1, p),
        startMs: ee,
        endMs: te,
        onChangeStart: O,
        onChangeEnd: X,
        height: Rz,
        width: Cz
      }
    ),
    /* @__PURE__ */ g.jsxs("div", { className: yz, children: [
      /* @__PURE__ */ g.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ g.jsxs("span", { className: gz, children: [
        Fo(ee),
        " → ",
        Fo(te),
        " · ",
        Fo(te - ee)
      ] })
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: vz, children: /* @__PURE__ */ g.jsxs("label", { className: bz, children: [
      /* @__PURE__ */ g.jsx(
        "input",
        {
          type: "checkbox",
          checked: b,
          onChange: (le) => ae(le.currentTarget.checked),
          "aria-label": "Toggle loudness normalization"
        }
      ),
      /* @__PURE__ */ g.jsxs("span", { children: [
        "Normalize to ",
        tb.toFixed(0),
        " LUFS (broadcast-friendly)"
      ] })
    ] }) }),
    /* @__PURE__ */ g.jsxs(QS, { children: [
      /* @__PURE__ */ g.jsx(Ge, { size: "sm", onClick: () => void I(), disabled: R, children: R ? "Applying…" : "Apply" }),
      /* @__PURE__ */ g.jsx(Ge, { variant: "ghost", size: "sm", onClick: h, disabled: R, children: "Cancel" })
    ] }),
    E && /* @__PURE__ */ g.jsx(Kt, { severity: "error", children: E })
  ] }) });
}
function nb(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Xl(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Az(t, a, l) {
  const s = t.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Xl(), mode: a };
    return { ...t, ops: [...t.ops, l(c)] };
  }
  const o = [...t.ops];
  return o[s] = l(o[s]), { ...t, ops: o };
}
function Fo(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var jz = "jq2zyb2", Dz = "jq2zyb3", Nz = "jq2zyb4", zz = "jq2zyb5", _z = "jq2zyb6", Oz = "jq2zyb7", Lz = "jq2zyb8", Uz = "jq2zyb9", Vz = "jq2zyba", Bz = "jq2zybb", Hz = "jq2zybc", kz = "jq2zybd", qz = "jq2zybe", Pz = "jq2zybf jq2zybe", Yz = "jq2zybg", Fz = "jq2zybh", Gz = "jq2zybi", $z = "jq2zybj", Xz = "jq2zybk", Iz = "jq2zybl", Kz = "jq2zybm", Qz = "jq2zybn", Zz = "jq2zybo", Jz = "jq2zybp", Wz = "jq2zybq", e3 = "jq2zybr", t3 = "jq2zybs", n3 = "jq2zybt", a3 = "jq2zybu", i3 = "jq2zybv", l3 = "jq2zybw", r3 = "jq2zybx", s3 = "jq2zyby", o3 = "jq2zybz", ab = "jq2zyb10", u3 = "jq2zyb11", c3 = "jq2zyb12", f3 = "jq2zyb13", d3 = "jq2zyb14";
const h3 = ["cancelled", "failed", "partial"], m3 = 2600;
function p3() {
  const { run: t } = us(), a = Gi(), [l, s] = S.useState(t), [o, c] = S.useState(!1), [f, h] = S.useState(null), [p, m] = S.useState(null), [y, b] = S.useState(
    null
  );
  S.useEffect(() => {
    s(t);
  }, [t]), S.useEffect(() => {
    if (!y) return;
    const k = setTimeout(() => b(null), m3);
    return () => clearTimeout(k);
  }, [y]);
  const x = S.useMemo(() => v3(l), [l]), E = h3.includes(l.status) && l.kind === "batch", w = (l.exportZipStaleAt ?? null) !== null, R = async () => {
    if (l.deploymentId) {
      c(!0), h(null);
      try {
        const { runId: k } = await ph(l.deploymentId, l.runId);
        a(`/${l.deploymentId}/runs/${k}`);
      } catch (k) {
        h(S3(k));
      } finally {
        c(!1);
      }
    }
  }, D = S.useCallback((k) => {
    m((G) => G === k ? null : k);
  }, []), B = S.useCallback(() => {
    m(null);
  }, []), z = (k, G) => {
    s((ee) => g3(ee, k, G)), m(null), b({ message: "Segment edited", severity: "success" });
  }, _ = S.useCallback((k) => {
    b({ message: k, severity: "error" });
  }, []);
  return /* @__PURE__ */ g.jsxs("main", { className: jz, children: [
    /* @__PURE__ */ g.jsxs("div", { className: Dz, children: [
      /* @__PURE__ */ g.jsxs("header", { className: Nz, children: [
        /* @__PURE__ */ g.jsxs("p", { className: zz, children: [
          l.deploymentId ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
            /* @__PURE__ */ g.jsx(cs, { to: `/${l.deploymentId}/recipe`, className: _z, children: "← Back to recipe" }),
            /* @__PURE__ */ g.jsx("span", { className: Oz, children: "·" })
          ] }) : null,
          /* @__PURE__ */ g.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ g.jsxs("div", { className: Lz, children: [
          /* @__PURE__ */ g.jsxs("h1", { className: Uz, children: [
            b3(l.kind),
            /* @__PURE__ */ g.jsx("span", { className: Vz, children: l.runId })
          ] }),
          /* @__PURE__ */ g.jsx(wa, { size: "md", tone: E3(l.status), pulse: l.status === "running", children: l.status })
        ] })
      ] }),
      /* @__PURE__ */ g.jsxs("section", { className: Bz, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ g.jsx(Go, { label: "Format", value: l.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ g.jsx(Go, { label: "Speed", value: `${l.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ g.jsx(
          Go,
          {
            label: "Completed",
            value: `${x.completed} / ${x.total}`,
            progress: x.total > 0 ? x.completed / x.total : 0
          }
        ),
        /* @__PURE__ */ g.jsx(
          Go,
          {
            label: "Cache hit",
            value: `${x.cacheRatio}%`,
            progress: x.cacheRatio / 100
          }
        )
      ] }),
      E && /* @__PURE__ */ g.jsxs("section", { className: Fz, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ g.jsxs("div", { className: Gz, children: [
          /* @__PURE__ */ g.jsx("h2", { id: "run-detail-resume-title", className: $z, children: x.failed > 0 ? `${x.failed} line${x.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ g.jsx("p", { className: Xz, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ g.jsx(Ge, { size: "lg", disabled: o, onClick: () => void R(), children: o ? "Resuming…" : x.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ g.jsx("p", { className: Iz, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ g.jsxs(nn, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ g.jsxs(lC, { children: [
          /* @__PURE__ */ g.jsx("h2", { id: "run-detail-utterances", className: Rn, children: "01 / Utterances" }),
          x.completed > 0 && /* @__PURE__ */ g.jsxs("span", { className: Kz, children: [
            /* @__PURE__ */ g.jsx("span", { className: Qz, children: x.cached }),
            "/",
            x.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ g.jsx("ul", { className: Zz, children: l.utterances.map((k) => {
          const G = p === k.utteranceId, ee = k.status === "completed" && k.audioArtifactRef !== null && k.audioArtifactRef !== void 0, te = k.derivedArtifactRef ?? k.audioArtifactRef ?? null, C = te ? `/api/v1/artifacts/${encodeURIComponent(te)}/download` : "", O = (k.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ g.jsxs("li", { className: Wz, children: [
            /* @__PURE__ */ g.jsxs("div", { className: Jz, children: [
              /* @__PURE__ */ g.jsxs("span", { className: n3, children: [
                "#",
                k.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ g.jsx("span", { className: a3, title: k.characterDisplay, children: k.characterDisplay }),
              /* @__PURE__ */ g.jsx("span", { className: i3, title: k.text, children: k.text }),
              /* @__PURE__ */ g.jsxs("span", { className: l3, children: [
                k.cacheHit && /* @__PURE__ */ g.jsx("span", { className: r3, children: "cached" }),
                O && /* @__PURE__ */ g.jsx("span", { className: e3, children: "edited" }),
                k.durationMs ? /* @__PURE__ */ g.jsx("span", { children: x3(k.durationMs) }) : null,
                /* @__PURE__ */ g.jsx(wa, { tone: T3(k.status), children: k.status }),
                ee && /* @__PURE__ */ g.jsx(
                  "button",
                  {
                    type: "button",
                    className: t3,
                    onClick: () => D(k.utteranceId),
                    "aria-expanded": G,
                    "aria-label": G ? "Close segment editor" : "Edit segment",
                    children: G ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            G && C && l.deploymentId && /* @__PURE__ */ g.jsx(
              Mz,
              {
                deploymentId: l.deploymentId,
                runId: l.runId,
                utterance: k,
                audioUrl: C,
                onApplied: (X) => z(k.utteranceId, X),
                onError: _,
                onCancel: B
              }
            )
          ] }, k.utteranceId);
        }) })
      ] }),
      y3(l, w)
    ] }),
    y && /* @__PURE__ */ g.jsx(
      "div",
      {
        className: d3,
        role: y.severity === "error" ? "alert" : "status",
        "aria-live": y.severity === "error" ? "assertive" : "polite",
        children: y.message
      }
    )
  ] });
}
function y3(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const s = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ g.jsx("div", { className: s3, children: a ? /* @__PURE__ */ g.jsxs("div", { className: u3, children: [
    /* @__PURE__ */ g.jsx("p", { className: c3, children: s }),
    /* @__PURE__ */ g.jsxs(
      "button",
      {
        type: "button",
        className: f3,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ g.jsx("span", { className: ab, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ g.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: o3,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ g.jsx("span", { className: ab, children: "↓" })
      ]
    }
  ) : null });
}
function g3(t, a, l) {
  const s = t.utterances.map((o) => o.utteranceId !== a ? o : {
    ...o,
    derivedArtifactRef: l.derived_artifact_ref,
    durationMs: l.derived_duration_ms
  });
  return {
    ...t,
    utterances: s,
    exportZipStaleAt: t.exportZipStaleAt ?? Math.floor(Date.now() / 1e3)
  };
}
function Go({ label: t, value: a, mono: l, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      className: Hz,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ g.jsx("span", { className: kz, children: t }),
        /* @__PURE__ */ g.jsx("span", { className: l ? Pz : qz, children: a }),
        o !== void 0 && /* @__PURE__ */ g.jsx("span", { className: Yz, "aria-hidden": "true" })
      ]
    }
  );
}
function v3(t) {
  const a = t.utterances.length, l = t.utterances.filter((f) => f.status === "completed").length, s = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, c = l > 0 ? Math.round(o / l * 100) : 0;
  return { total: a, completed: l, failed: s, cached: o, cacheRatio: c };
}
function b3(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function x3(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function S3(t) {
  return t instanceof $i ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function E3(t) {
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
function T3(t) {
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
var w3 = "pcphqj2", R3 = "pcphqj3", C3 = "pcphqj4", M3 = "pcphqj5", A3 = "pcphqj6", j3 = "pcphqj7", D3 = "pcphqj8", N3 = "pcphqj9", z3 = "pcphqja", ib = "pcphqjb", _3 = "pcphqjc", O3 = "pcphqjd", L3 = "pcphqje pcphqjd", U3 = "pcphqjf", V3 = "pcphqjg", B3 = "pcphqjh", H3 = "pcphqji", k3 = "pcphqjj pcphqji", q3 = "pcphqjk pcphqji", P3 = "pcphqjl pcphqji", Y3 = "pcphqjm", xd = "pcphqjn", Sd = "pcphqjo";
function F3() {
  const [t, a] = S.useState(null), [l, s] = S.useState(null);
  return S.useEffect(() => {
    let o = !1;
    const c = async () => {
      try {
        const h = await ot("/runtime/queue");
        o || (a(h.entries), s(null));
      } catch (h) {
        o || s(h instanceof Error ? h.message : "Unknown error");
      }
    };
    c();
    const f = setInterval(() => void c(), 3e3);
    return () => {
      o = !0, clearInterval(f);
    };
  }, []), /* @__PURE__ */ g.jsx("main", { className: w3, children: /* @__PURE__ */ g.jsxs("div", { className: R3, children: [
    /* @__PURE__ */ g.jsxs("header", { className: C3, children: [
      /* @__PURE__ */ g.jsx("p", { className: M3, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ g.jsxs("div", { className: A3, children: [
        /* @__PURE__ */ g.jsx("h1", { className: j3, children: "Queue" }),
        /* @__PURE__ */ g.jsx("span", { className: D3, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ g.jsx("p", { className: N3, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    l ? /* @__PURE__ */ g.jsx(Kt, { severity: "error", children: l }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ g.jsx(nn, { density: "compact", children: /* @__PURE__ */ g.jsx(Yl, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ g.jsxs(nn, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ g.jsx("h2", { id: "runtime-queue-section", className: Rn, children: "01 / In flight" }),
      /* @__PURE__ */ g.jsx("ul", { className: z3, children: t.map((o) => {
        const c = o.position === 1;
        return /* @__PURE__ */ g.jsxs(
          "li",
          {
            className: c ? `${ib} ${_3}` : ib,
            children: [
              /* @__PURE__ */ g.jsx("span", { className: c ? L3 : O3, children: o.position }),
              /* @__PURE__ */ g.jsxs("span", { className: U3, children: [
                /* @__PURE__ */ g.jsx("span", { className: V3, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ g.jsx("span", { className: B3, children: o.runId })
              ] }),
              /* @__PURE__ */ g.jsx("span", { className: G3(o.kind), children: $3(o.kind) }),
              /* @__PURE__ */ g.jsx("span", { className: Y3, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
                /* @__PURE__ */ g.jsx("span", { className: xd, children: X3(o.etaSeconds) }),
                /* @__PURE__ */ g.jsx("span", { className: Sd, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
                /* @__PURE__ */ g.jsx("span", { className: xd, children: o.utteranceTotal }),
                /* @__PURE__ */ g.jsx("span", { className: Sd, children: "lines" })
              ] }) : /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
                /* @__PURE__ */ g.jsx("span", { className: xd, children: "—" }),
                /* @__PURE__ */ g.jsx("span", { className: Sd, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function G3(t) {
  switch (t) {
    case "batch":
      return k3;
    case "test_line":
      return q3;
    case "resume":
      return P3;
    default:
      return H3;
  }
}
function $3(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function X3(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), l = t % 60;
  return l === 0 ? `${a}m` : `${a}m ${l}s`;
}
function I3() {
  const { deploymentId: t, prefillCharacterName: a } = us(), l = Gi(), [s, o] = S.useState(a), [c, f] = S.useState(""), [h, p] = S.useState("none"), [m, y] = S.useState(!1), [b, x] = S.useState(null), E = S.useRef(null);
  S.useEffect(() => {
    E.current?.scrollIntoView({ behavior: "smooth", block: "center" }), E.current?.focus();
  }, []);
  const w = async (R) => {
    R.preventDefault(), y(!0), x(null);
    try {
      await $b(t, {
        characterName: s,
        speakerVoiceAssetId: c,
        defaultEmotionMode: h
      }), l(`/${t}/recipe`);
    } catch (D) {
      x(D instanceof Error ? D.message : "failed");
    } finally {
      y(!1);
    }
  };
  return /* @__PURE__ */ g.jsxs("main", { children: [
    /* @__PURE__ */ g.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ g.jsxs("form", { onSubmit: w, children: [
      /* @__PURE__ */ g.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ g.jsx(
          "input",
          {
            ref: E,
            value: s,
            onChange: (R) => o(R.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ g.jsxs("label", { children: [
        "Speaker voice asset id",
        /* @__PURE__ */ g.jsx(
          "input",
          {
            value: c,
            onChange: (R) => f(R.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ g.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ g.jsxs("select", { value: h, onChange: (R) => p(R.currentTarget.value), children: [
          /* @__PURE__ */ g.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ g.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ g.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ g.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ g.jsx(Ge, { type: "submit", variant: "primary", disabled: m, children: "Save mapping" }),
      b && /* @__PURE__ */ g.jsx(Kt, { severity: "error", children: b })
    ] })
  ] });
}
var K3 = "_1oor31e0", Q3 = "_1oor31e1", Z3 = "_1oor31e2", J3 = "_1oor31e3", W3 = "_1oor31e4", e_ = "_1oor31e5", t_ = "_1oor31e6", n_ = "_1oor31e7", a_ = "_1oor31e8";
const i_ = 8;
function l_(t) {
  const { entries: a, loading: l, error: s } = t;
  return /* @__PURE__ */ g.jsxs("div", { className: K3, "aria-busy": !!l, children: [
    s && /* @__PURE__ */ g.jsx(Kt, { severity: "error", children: s }),
    l && !s && /* @__PURE__ */ g.jsx("div", { className: a_, "aria-live": "polite", children: "Loading edit history…" }),
    !l && !s && a.length === 0 && /* @__PURE__ */ g.jsx("div", { className: n_, children: "No edits yet" }),
    !l && !s && a.length > 0 && /* @__PURE__ */ g.jsx("ul", { className: Q3, children: a.map((o) => /* @__PURE__ */ g.jsxs("li", { className: Z3, children: [
      /* @__PURE__ */ g.jsx("span", { className: J3, children: s_(o.recorded_at) }),
      /* @__PURE__ */ g.jsx("span", { className: W3, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ g.jsx("span", { className: e_, title: o.digest_after, children: r_(o.digest_after) }),
      /* @__PURE__ */ g.jsx("span", { className: t_, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function r_(t) {
  return t ? `${t.slice(0, i_)}…` : "—";
}
function s_(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var lb = "_1c63kaw0", o_ = "_1c63kaw1", u_ = "_1c63kaw2", c_ = "_1c63kaw3", f_ = "_1c63kaw4", d_ = "_1c63kaw5", h_ = "_1c63kaw6", m_ = "_1c63kaw7";
function p_({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ g.jsx("div", { className: lb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ g.jsx("span", { className: o_, children: "No edits yet" }) }) : /* @__PURE__ */ g.jsx("ol", { className: lb, "data-testid": "edit-chain-list", children: t.ops.map((l, s) => /* @__PURE__ */ g.jsxs("li", { className: u_, children: [
    /* @__PURE__ */ g.jsxs("span", { className: c_, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ g.jsxs("span", { className: f_, children: [
      /* @__PURE__ */ g.jsx("span", { className: d_, children: rb(l) }),
      /* @__PURE__ */ g.jsx("span", { className: h_, children: y_(l) })
    ] }),
    /* @__PURE__ */ g.jsx(
      "button",
      {
        type: "button",
        className: m_,
        onClick: () => a(l.id),
        "aria-label": `Remove ${rb(l)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, l.id)) });
}
function rb(t) {
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
  }
}
function y_(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${sb(t.start_ms)} → ${sb(t.end_ms)}`;
    case "normalize":
      return `${t.target_lufs.toFixed(1)} LUFS`;
    case "speed":
      return `${t.factor.toFixed(2)}×`;
    case "fade_in":
      return `${t.duration_ms} ms in`;
    case "fade_out":
      return `${t.duration_ms} ms out`;
  }
}
function sb(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var Ed = "_1o3ytop0", g_ = "_1o3ytop1", v_ = "_1o3ytop2", ob = "_1o3ytop3", b_ = "_1o3ytop4", x_ = "_1o3ytopa", S_ = "_1o3ytopb", E_ = "_1o3ytopc", T_ = "_1o3ytopd", w_ = "_1o3ytope", R_ = "_1o3ytopf";
const ub = -16;
function C_(t) {
  const { voiceAsset: a, deploymentId: l, onChainPersisted: s, onError: o } = t, c = a.durationMs ?? 0, f = S.useMemo(
    () => M_(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [h, p] = S.useState(() => Td(c)), [m, y] = S.useState(null), [b, x] = S.useState(null), [E, w] = S.useState(!1), [R, D] = S.useState(!1), [B, z] = S.useState(!1), [_, k] = S.useState(null), [G, ee] = S.useState([]), [te, C] = S.useState([]), [O, X] = S.useState(!1), [ae, I] = S.useState(null), [le, ue] = S.useState(0), re = S.useRef(null), U = S.useRef(null), H = S.useRef(null), J = S.useRef(null), ne = S.useRef(null), fe = S.useRef(0), M = S.useMemo(
    () => h.ops.some((xe) => xe.mode === "normalize"),
    [h.ops]
  );
  S.useEffect(() => {
    p(Td(c)), y(null), z(!1), ee([]), ne.current = null;
  }, [a.voiceAssetId, c]), S.useEffect(() => {
    J.current?.abort();
    const xe = new AbortController();
    return J.current = xe, X(!0), I(null), nz(l, "voice_asset", a.voiceAssetId, 50, {
      signal: xe.signal
    }).then((Oe) => {
      xe.signal.aborted || C(Oe.entries);
    }).catch((Oe) => {
      if (xe.signal.aborted) return;
      const $e = Oe instanceof Error ? Oe.message : "audit fetch failed";
      I($e);
    }).finally(() => {
      xe.signal.aborted || X(!1);
    }), () => xe.abort();
  }, [l, a.voiceAssetId, le]), S.useEffect(() => () => {
    b && URL.revokeObjectURL(b);
  }, [b]), S.useEffect(() => () => {
    U.current?.abort(), H.current?.abort(), J.current?.abort();
  }, []);
  const K = h.ops.find((xe) => xe.mode === "trim"), se = h.ops.find((xe) => xe.mode === "normalize"), ce = K?.start_ms ?? 0, Ee = K?.end_ms ?? Math.max(1, c), Re = S.useCallback((xe, Oe) => {
    p(
      ($e) => cb(
        $e,
        "trim",
        (ut) => ({
          ...ut,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(xe)),
          end_ms: Math.max(Math.floor(xe) + 1, Math.floor(Oe))
        })
      )
    );
  }, []), De = S.useCallback(
    (xe) => Re(xe, Ee),
    [Ee, Re]
  ), ht = S.useCallback(
    (xe) => Re(ce, xe),
    [ce, Re]
  ), Xe = S.useCallback((xe) => {
    p((Oe) => {
      const $e = Oe.ops.filter((ut) => ut.mode !== "normalize");
      if (xe) {
        const ut = {
          id: Xl(),
          mode: "normalize",
          target_lufs: ub
        };
        return { ...Oe, ops: [...$e, ut] };
      }
      return { ...Oe, ops: $e };
    });
  }, []), ta = S.useCallback(
    (xe) => {
      const Oe = h.ops.findIndex((na) => na.id === xe);
      if (Oe === -1) return;
      const $e = h.ops[Oe];
      if (!$e) return;
      const ut = [...h.ops.slice(0, Oe), ...h.ops.slice(Oe + 1)];
      p({ ...h, ops: ut }), ee((na) => [...na, { op: $e, index: Oe }]);
    },
    [h]
  ), Ma = S.useCallback(() => {
    const xe = G[G.length - 1];
    if (!xe) return;
    const Oe = Math.min(xe.index, h.ops.length), $e = [...h.ops.slice(0, Oe), xe.op, ...h.ops.slice(Oe)];
    p({ ...h, ops: $e }), ee(G.slice(0, -1));
  }, [h, G]), qn = S.useCallback(() => {
    const xe = GS(h, c);
    return xe ? (y(xe.message), !1) : (y(null), !0);
  }, [h, c]), yt = S.useCallback(async () => {
    if (!qn() || E) return;
    U.current?.abort();
    const xe = new AbortController();
    U.current = xe;
    const Oe = ++fe.current;
    D(!0);
    try {
      const $e = await tz(a.voiceAssetId, l, h, {
        signal: xe.signal
      });
      if (xe.signal.aborted || Oe !== fe.current) return;
      b && URL.revokeObjectURL(b);
      const ut = URL.createObjectURL($e);
      x(ut), z(!0), requestAnimationFrame(() => re.current?.play().catch(() => {
      }));
    } catch ($e) {
      if (xe.signal.aborted) return;
      const ut = $e instanceof Error ? $e.message : "preview failed";
      y(ut), o(ut);
    } finally {
      xe.signal.aborted || D(!1);
    }
  }, [qn, E, a.voiceAssetId, l, h, b, o]), Ht = S.useCallback(async () => {
    if (!qn() || R || E) return;
    U.current?.abort(), H.current?.abort();
    const xe = new AbortController();
    H.current = xe, w(!0);
    try {
      const Oe = ne.current ?? void 0, $e = await WN(
        a.voiceAssetId,
        l,
        Oe ? { chain: h, digest_before: Oe } : { chain: h },
        { signal: xe.signal }
      );
      if (xe.signal.aborted) return;
      ne.current = $e.chain_digest, y(null), k($e.measured_lufs ?? null), ee([]), s($e), ue((ut) => ut + 1);
    } catch (Oe) {
      if (xe.signal.aborted) return;
      const $e = Oe instanceof Pl;
      Oe instanceof Pl && (ne.current = Oe.currentDigest || null);
      const ut = $e ? "Edit chain has changed in another tab. Reload to continue." : Oe instanceof Error ? Oe.message : "apply failed";
      y(ut), o(ut);
    } finally {
      xe.signal.aborted || w(!1);
    }
  }, [
    qn,
    R,
    E,
    a.voiceAssetId,
    l,
    h,
    s,
    o
  ]), Aa = S.useCallback(() => {
    U.current?.abort(), p(Td(c)), y(null), k(null), z(!1), ee([]), ue((xe) => xe + 1), b && (URL.revokeObjectURL(b), x(null));
  }, [c, b]), hi = S.useCallback((xe) => {
    p(
      (Oe) => cb(
        Oe,
        "normalize",
        ($e) => ({
          ...$e,
          mode: "normalize",
          target_lufs: xe
        })
      )
    );
  }, []);
  return /* @__PURE__ */ g.jsxs(IS, { variant: "standalone", children: [
    /* @__PURE__ */ g.jsx(
      KS,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${$o(c)}`
      }
    ),
    /* @__PURE__ */ g.jsx(
      $S,
      {
        audioUrl: f,
        durationMs: Math.max(1, c),
        startMs: ce,
        endMs: Ee,
        onChangeStart: De,
        onChangeEnd: ht
      }
    ),
    /* @__PURE__ */ g.jsxs("div", { className: Ed, children: [
      /* @__PURE__ */ g.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ g.jsxs("span", { className: g_, children: [
        $o(ce),
        " → ",
        $o(Ee),
        " · ",
        $o(Ee - ce)
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: v_, children: [
      /* @__PURE__ */ g.jsxs("div", { className: ob, children: [
        /* @__PURE__ */ g.jsxs("span", { className: Ed, children: [
          /* @__PURE__ */ g.jsx("span", { children: "Normalize loudness" }),
          M && se && /* @__PURE__ */ g.jsxs("span", { className: x_, children: [
            "target ",
            se.target_lufs.toFixed(1),
            " LUFS",
            _ !== null && ` · measured ${_.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ g.jsxs("label", { className: b_, children: [
          /* @__PURE__ */ g.jsx(
            "input",
            {
              type: "checkbox",
              checked: M,
              onChange: (xe) => Xe(xe.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ g.jsxs("span", { children: [
            "Target ",
            ub.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        M && se && /* @__PURE__ */ g.jsx(
          "input",
          {
            type: "range",
            className: E_,
            min: -30,
            max: -6,
            step: 0.5,
            value: se.target_lufs,
            onChange: (xe) => hi(Number(xe.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: ob, children: [
        /* @__PURE__ */ g.jsxs("span", { className: Ed, children: [
          "Operations · ",
          h.ops.length
        ] }),
        /* @__PURE__ */ g.jsx(p_, { chain: h, onRemoveOp: ta })
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs(QS, { children: [
      /* @__PURE__ */ g.jsx(
        Ge,
        {
          variant: "secondary",
          onClick: () => void yt(),
          disabled: R || E,
          children: R ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ g.jsx(
        Ge,
        {
          onClick: () => void Ht(),
          disabled: E || R,
          children: E ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ g.jsx(
        Ge,
        {
          variant: "ghost",
          onClick: Aa,
          disabled: E || R,
          children: "Reset"
        }
      ),
      G.length > 0 && /* @__PURE__ */ g.jsxs(
        Ge,
        {
          variant: "ghost",
          size: "sm",
          onClick: Ma,
          disabled: E || R,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            G.length,
            ")"
          ]
        }
      ),
      B && /* @__PURE__ */ g.jsx(
        "span",
        {
          className: R_,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    b && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ g.jsx(
      "audio",
      {
        ref: re,
        src: b,
        controls: !0,
        className: S_,
        "aria-label": "Edit preview"
      }
    ),
    m && /* @__PURE__ */ g.jsx(Kt, { severity: "error", children: m }),
    /* @__PURE__ */ g.jsxs("details", { className: T_, children: [
      /* @__PURE__ */ g.jsxs("summary", { className: w_, children: [
        "Edit history",
        te.length > 0 ? ` · ${te.length}` : ""
      ] }),
      /* @__PURE__ */ g.jsx(
        l_,
        {
          entries: te,
          loading: O,
          error: ae
        }
      )
    ] })
  ] });
}
function Td(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Xl(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function cb(t, a, l) {
  const s = t.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Xl(), mode: a };
    return { ...t, ops: [...t.ops, l(c)] };
  }
  const o = [...t.ops];
  return o[s] = l(o[s]), { ...t, ops: o };
}
function $o(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function M_(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var A_ = "go9vi12", j_ = "go9vi13", D_ = "go9vi14", N_ = "go9vi15", z_ = "go9vi16", __ = "go9vi17", O_ = "go9vi18", L_ = "go9vi19", U_ = "go9vi1a go9vi19", V_ = "go9vi1b", B_ = "go9vi1c", H_ = "go9vi1d", k_ = "go9vi1e", q_ = "go9vi1f", P_ = "go9vi1g", Y_ = "go9vi1h", F_ = "go9vi1i", Li = "go9vi1j", Fr = "go9vi1k", Bl = "go9vi1l", G_ = "go9vi1m go9vi1l", $_ = "go9vi1n", X_ = "go9vi1o go9vi1n", I_ = "go9vi1p go9vi1n", K_ = "go9vi1q", Q_ = "go9vi1r", Z_ = "go9vi1s", J_ = "go9vi1t", ZS = "go9vi1u", W_ = "go9vi1v", eO = "go9vi1w", tO = "go9vi1x go9vi1l", nO = "go9vi1y", aO = "go9vi1z", iO = "go9vi110", lO = "go9vi111", rO = "go9vi112", sO = "go9vi113";
const oO = ["none", "audio_ref", "vector_preset", "qwen_template"];
function uO() {
  const { deployment: t, mappings: a, voiceAssets: l } = us(), [s, o] = S.useState(a), [c, f] = S.useState(l), [h, p] = S.useState(
    a[0]?.mappingId ?? null
  ), [m, y] = S.useState(""), [b, x] = S.useState(null), [E, w] = S.useState(null), [R, D] = S.useState(null), B = S.useMemo(() => {
    const H = /* @__PURE__ */ new Map();
    for (const J of c) H.set(J.voiceAssetId, J);
    return H;
  }, [c]), z = S.useMemo(() => {
    const H = m.trim().toLowerCase();
    return H ? s.filter((J) => J.characterName.toLowerCase().includes(H)) : s;
  }, [s, m]), _ = S.useMemo(
    () => s.find((H) => H.mappingId === h) ?? null,
    [s, h]
  );
  S.useEffect(() => {
    o(a), f(l), p(a[0]?.mappingId ?? null);
  }, [a, l]), S.useEffect(() => {
    if (!E) return;
    const H = setTimeout(() => w(null), 2600);
    return () => clearTimeout(H);
  }, [E]);
  const k = S.useCallback(async () => {
    const H = await su(t.deploymentId);
    f(H.voiceAssets);
  }, [t.deploymentId]), G = S.useCallback(
    (H) => {
      o(
        (J) => J.map((ne) => ne.mappingId === h ? { ...ne, ...H } : ne)
      );
    },
    [h]
  ), ee = S.useCallback(
    async (H) => {
      if (!_) return;
      const J = _;
      try {
        const ne = await qR(t.deploymentId, _.mappingId, H);
        o((fe) => fe.map((M) => M.mappingId === ne.mappingId ? ne : M));
      } catch (ne) {
        o(
          (fe) => fe.map((M) => M.mappingId === J.mappingId ? J : M)
        ), x(Ui(ne));
      }
    },
    [_, t.deploymentId]
  ), te = S.useCallback(async () => {
    const H = c[0];
    if (!H) {
      x("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const J = pO(s), ne = await $b(t.deploymentId, {
        characterName: J,
        speakerVoiceAssetId: H.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((fe) => [...fe, ne]), p(ne.mappingId);
    } catch (J) {
      x(Ui(J));
    }
  }, [t.deploymentId, c, s]), C = S.useCallback(() => {
    _ && D({ id: _.mappingId, name: _.characterName });
  }, [_]), O = S.useCallback(async () => {
    if (!R) return;
    const { id: H, name: J } = R;
    D(null);
    try {
      await PR(t.deploymentId, H), o((ne) => ne.filter((fe) => fe.mappingId !== H)), p(null), w(`Mapping for ${J} deactivated.`);
    } catch (ne) {
      x(Ui(ne));
    }
  }, [t.deploymentId, R]), X = S.useCallback(
    async (H, J, ne) => {
      try {
        const fe = await KR(t.deploymentId, H, J, ne);
        return f((M) => [fe, ...M]), w(`${fe.displayName} uploaded.`), fe;
      } catch (fe) {
        return x(Ui(fe)), null;
      }
    },
    [t.deploymentId]
  ), ae = S.useCallback(async () => {
    try {
      const H = await YR(t.deploymentId);
      SO(H, `${t.deploymentId}-mappings.json`), w("Mappings exported to JSON.");
    } catch (H) {
      x(Ui(H));
    }
  }, [t.deploymentId]), I = S.useCallback(
    async (H, J) => {
      try {
        const ne = await FR(
          t.deploymentId,
          H.mappings,
          J
        );
        w(
          `Imported ${ne.created.length} • skipped ${ne.skipped.length} • replaced ${ne.replaced.length}.`
        );
        const fe = await su(t.deploymentId);
        f(fe.voiceAssets);
      } catch (ne) {
        x(Ui(ne));
      }
    },
    [t.deploymentId]
  ), le = S.useCallback(
    async (H) => {
      await k(), w("Edit applied.");
    },
    [k]
  ), ue = S.useCallback((H) => {
    x(H);
  }, []), re = S.useCallback(
    async (H, J) => {
      if (!_) return null;
      const ne = H.trim() || `[${_.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await IR(t.deploymentId, {
          line: ne,
          outputFormat: J
        })).runId };
      } catch (fe) {
        return x(Ui(fe)), null;
      }
    },
    [t.deploymentId, _]
  ), U = c.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ g.jsxs("div", { className: A_, children: [
    /* @__PURE__ */ g.jsxs("aside", { className: j_, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ g.jsxs("header", { className: D_, children: [
        /* @__PURE__ */ g.jsxs("div", { children: [
          /* @__PURE__ */ g.jsx("h1", { id: "mapping-sidebar-heading", className: N_, children: "Cast" }),
          /* @__PURE__ */ g.jsxs("span", { className: z_, children: [
            s.length,
            " active · ",
            c.length,
            " ",
            U
          ] })
        ] }),
        /* @__PURE__ */ g.jsx(Ge, { variant: "primary", size: "sm", onClick: te, children: "+ Add" })
      ] }),
      /* @__PURE__ */ g.jsx(
        "input",
        {
          type: "search",
          className: __,
          placeholder: "Search characters",
          value: m,
          onChange: (H) => y(H.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ g.jsx(mO, { onExport: ae, onImport: I, onParseError: x }),
      /* @__PURE__ */ g.jsx("div", { className: O_, children: z.length === 0 ? /* @__PURE__ */ g.jsx(
        Yl,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : z.map((H) => {
        const J = B.get(H.speakerVoiceAssetId), ne = H.mappingId === h;
        return /* @__PURE__ */ g.jsxs(
          "button",
          {
            type: "button",
            className: ne ? U_ : L_,
            onClick: () => p(H.mappingId),
            "aria-pressed": ne,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ g.jsx("span", { className: V_, "aria-hidden": "true", children: yO(H.characterName) }),
              /* @__PURE__ */ g.jsxs("span", { className: B_, children: [
                /* @__PURE__ */ g.jsx("span", { className: H_, children: H.characterName }),
                /* @__PURE__ */ g.jsxs("span", { className: k_, children: [
                  H.defaultEmotionMode,
                  " · ",
                  J?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          H.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ g.jsxs("section", { className: q_, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ g.jsx(MS, { features: YS, children: /* @__PURE__ */ g.jsx(s2, { children: E && /* @__PURE__ */ g.jsx(
        LS.div,
        {
          className: W_,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: E
        },
        E
      ) }) }),
      b && /* @__PURE__ */ g.jsx(Kt, { severity: "error", children: b }),
      R && /* @__PURE__ */ g.jsxs(Kt, { severity: "warning", children: [
        /* @__PURE__ */ g.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          R.name,
          "?"
        ] }),
        /* @__PURE__ */ g.jsx(Ge, { variant: "danger", size: "sm", onClick: () => void O(), children: "Delete" }),
        /* @__PURE__ */ g.jsx(Ge, { variant: "ghost", size: "sm", onClick: () => D(null), children: "Cancel" })
      ] }),
      _ ? /* @__PURE__ */ g.jsx(
        fO,
        {
          deploymentId: t.deploymentId,
          mapping: _,
          voiceAssets: c,
          onNameChange: (H) => {
            G({ characterName: H });
          },
          onNameBlur: (H) => {
            H !== _.characterName && H.trim() && ee({ characterName: H.trim() });
          },
          onSpeakerChange: (H) => {
            G({ speakerVoiceAssetId: H }), ee({ speakerVoiceAssetId: H });
          },
          onModeChange: (H) => {
            G({ defaultEmotionMode: H }), ee({ defaultEmotionMode: H });
          },
          onQwenChange: (H) => {
            G({ defaultQwenTemplate: H });
          },
          onQwenBlur: (H) => {
            ee({ defaultQwenTemplate: H });
          },
          onSpeedChange: (H) => {
            G({ defaultSpeedFactor: H });
          },
          onSpeedCommit: (H) => {
            ee({ defaultSpeedFactor: H });
          },
          onEmotionVoiceChange: (H) => {
            const J = H || null;
            G({ defaultEmotionVoiceAssetId: J }), ee({ defaultEmotionVoiceAssetId: J });
          },
          onDelete: C,
          onUploadVoice: async (H, J, ne) => {
            const fe = await X(H, J, ne);
            return fe && ne === "speaker" && (G({ speakerVoiceAssetId: fe.voiceAssetId }), ee({ speakerVoiceAssetId: fe.voiceAssetId })), await k(), fe;
          },
          onTestLine: re,
          onEditChainPersisted: le,
          onEditError: ue
        },
        _.mappingId
      ) : /* @__PURE__ */ g.jsx(
        cO,
        {
          voiceCount: c.length,
          onUploadVoice: async (H) => {
            await X(H, H.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function cO({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ g.jsxs(nn, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ g.jsxs("div", { className: iO, children: [
      /* @__PURE__ */ g.jsx("p", { className: Rn, children: "01 / Onboarding" }),
      /* @__PURE__ */ g.jsx("h2", { id: "onboarding-heading", className: lO, children: "Upload your first voice" }),
      /* @__PURE__ */ g.jsxs("p", { className: rO, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ g.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ g.jsx(
      JS,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (l) => (await a(l), null)
      }
    )
  ] }) : /* @__PURE__ */ g.jsx(nn, { density: "airy", children: /* @__PURE__ */ g.jsx(
    Yl,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function fO(t) {
  const { mapping: a, voiceAssets: l } = t, s = l.find((R) => R.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = l.find((R) => R.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [c, f] = S.useState(""), [h, p] = S.useState("mp3"), [m, y] = S.useState("idle"), [b, x] = S.useState(null), E = S.useRef(!1);
  S.useEffect(() => (E.current = !1, () => {
    E.current = !0;
  }), []);
  const w = S.useCallback(async () => {
    E.current = !1, y("running"), x(null);
    const R = await t.onTestLine(c, h);
    if (E.current) return;
    if (!R) {
      y("error"), x("Failed to enqueue test-line run.");
      return;
    }
    const { runId: D } = R;
    for (let B = 0; B < 60; B += 1) {
      if (await new Promise((z) => setTimeout(z, 500)), E.current) return;
      try {
        const z = await mh(t.deploymentId, D);
        if (E.current) return;
        if (z.status === "completed") {
          y("done");
          return;
        }
        if (z.status === "failed" || z.status === "cancelled") {
          y("error"), x(`Run ${z.status}.`);
          return;
        }
      } catch (z) {
        if (E.current) return;
        y("error"), x(z instanceof Error ? z.message : "unknown error");
        return;
      }
    }
    E.current || (y("error"), x("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, c, h]);
  return /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsxs("header", { className: P_, children: [
      /* @__PURE__ */ g.jsxs("div", { children: [
        /* @__PURE__ */ g.jsx("p", { className: Rn, children: "Character" }),
        /* @__PURE__ */ g.jsx("h2", { className: Y_, children: a.characterName })
      ] }),
      /* @__PURE__ */ g.jsx("div", { className: ZS, children: /* @__PURE__ */ g.jsx(Ge, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ g.jsxs(
      nn,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: eO,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ g.jsx(
            "input",
            {
              type: "text",
              className: tO,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: c,
              onChange: (R) => f(R.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: m === "running"
            }
          ),
          /* @__PURE__ */ g.jsxs(
            "select",
            {
              className: Bl,
              value: h,
              onChange: (R) => p(R.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: m === "running",
              children: [
                /* @__PURE__ */ g.jsx("option", { value: "mp3", children: "mp3" }),
                /* @__PURE__ */ g.jsx("option", { value: "wav", children: "wav" }),
                /* @__PURE__ */ g.jsx("option", { value: "flac", children: "flac" })
              ]
            }
          ),
          /* @__PURE__ */ g.jsx(
            Ge,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void w(),
              disabled: m === "running",
              children: m === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          m === "done" && /* @__PURE__ */ g.jsx(wa, { tone: "success", children: "Synthesised — see host logs for output path." }),
          m === "error" && b && /* @__PURE__ */ g.jsx(wa, { tone: "danger", children: b })
        ]
      }
    ),
    /* @__PURE__ */ g.jsxs("div", { className: F_, children: [
      /* @__PURE__ */ g.jsxs(nn, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ g.jsx("h3", { id: "identity-heading", className: Rn, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ g.jsxs("label", { className: Fr, children: [
          /* @__PURE__ */ g.jsx("span", { className: Li, children: "Character name" }),
          /* @__PURE__ */ g.jsx(
            "input",
            {
              className: Bl,
              value: a.characterName,
              onChange: (R) => t.onNameChange(R.currentTarget.value),
              onBlur: (R) => t.onNameBlur(R.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ g.jsxs("label", { className: Fr, children: [
          /* @__PURE__ */ g.jsx("span", { className: Li, children: "Emotion mode" }),
          /* @__PURE__ */ g.jsx(
            "select",
            {
              className: Bl,
              value: a.defaultEmotionMode,
              onChange: (R) => t.onModeChange(R.currentTarget.value),
              children: oO.map((R) => /* @__PURE__ */ g.jsx("option", { value: R, children: gO(R) }, R))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ g.jsxs("label", { className: Fr, children: [
          /* @__PURE__ */ g.jsxs("span", { className: Li, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ g.jsx(
            "textarea",
            {
              className: G_,
              value: a.defaultQwenTemplate ?? "",
              onChange: (R) => t.onQwenChange(R.currentTarget.value),
              onBlur: (R) => t.onQwenBlur(R.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ g.jsxs("label", { className: Fr, children: [
          /* @__PURE__ */ g.jsx("span", { className: Li, children: "Emotion reference" }),
          /* @__PURE__ */ g.jsxs(
            "select",
            {
              className: Bl,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (R) => t.onEmotionVoiceChange(R.currentTarget.value),
              children: [
                /* @__PURE__ */ g.jsx("option", { value: "", children: "— none —" }),
                l.map((R) => /* @__PURE__ */ g.jsxs("option", { value: R.voiceAssetId, children: [
                  R.displayName,
                  " · ",
                  R.kind
                ] }, R.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ g.jsxs("label", { className: Fr, children: [
          /* @__PURE__ */ g.jsxs("span", { className: Li, children: [
            "Speed · ",
            a.defaultSpeedFactor?.toFixed(2) ?? "—",
            "×"
          ] }),
          /* @__PURE__ */ g.jsx(
            "input",
            {
              type: "range",
              min: 0.5,
              max: 2,
              step: 0.05,
              value: a.defaultSpeedFactor ?? 1,
              onChange: (R) => t.onSpeedChange(Number(R.currentTarget.value)),
              onMouseUp: (R) => t.onSpeedCommit(Number(R.currentTarget.value)),
              onTouchEnd: (R) => t.onSpeedCommit(Number(R.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ g.jsxs(nn, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ g.jsx("h3", { id: "voice-heading", className: Rn, children: "02 / Voice Reference" }),
        /* @__PURE__ */ g.jsx("span", { className: Li, children: "Speaker reference" }),
        /* @__PURE__ */ g.jsx(
          dO,
          {
            value: a.speakerVoiceAssetId,
            voices: l,
            onChange: t.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ g.jsx(fb, { voice: s }),
        /* @__PURE__ */ g.jsx(
          JS,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (R) => t.onUploadVoice(R, R.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        s && /* @__PURE__ */ g.jsx(
          C_,
          {
            voiceAsset: s,
            deploymentId: t.deploymentId,
            onChainPersisted: t.onEditChainPersisted,
            onError: t.onEditError
          }
        ),
        o && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
          /* @__PURE__ */ g.jsx("span", { className: Li, children: "Emotion reference voice" }),
          /* @__PURE__ */ g.jsx(fb, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function dO({
  value: t,
  voices: a,
  onChange: l
}) {
  return /* @__PURE__ */ g.jsxs(
    "select",
    {
      className: Bl,
      value: t,
      onChange: (s) => l(s.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ g.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((s) => /* @__PURE__ */ g.jsx("option", { value: s.voiceAssetId, children: s.displayName }, s.voiceAssetId))
      ]
    }
  );
}
function fb({ voice: t }) {
  const a = vO(t.durationMs ?? null);
  return /* @__PURE__ */ g.jsxs("div", { children: [
    /* @__PURE__ */ g.jsxs("div", { className: K_, children: [
      /* @__PURE__ */ g.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ g.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ g.jsx("span", { children: bO(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ g.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ g.jsxs("div", { className: Q_, children: [
      /* @__PURE__ */ g.jsx("div", { className: Z_, children: /* @__PURE__ */ g.jsx(MS, { features: YS, children: /* @__PURE__ */ g.jsx(
        LS.div,
        {
          className: J_,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ g.jsx(wa, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ g.jsx(hO, { seed: t.contentSha256 })
  ] });
}
function hO({ seed: t }) {
  const a = S.useMemo(() => xO(t, 48), [t]);
  return /* @__PURE__ */ g.jsx("div", { className: nO, "aria-hidden": "true", children: a.map((l, s) => /* @__PURE__ */ g.jsx(
    "span",
    {
      className: aO,
      style: { height: `${Math.max(6, l * 100)}%` }
    },
    `${t}-${s}`
  )) });
}
function JS({
  label: t,
  onFile: a
}) {
  const [l, s] = S.useState(!1), [o, c] = S.useState(!1), f = S.useRef(null), h = S.useCallback(
    async (p) => {
      c(!0);
      try {
        await a(p);
      } finally {
        c(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      className: o ? I_ : l ? X_ : $_,
      onDragOver: (p) => {
        p.preventDefault(), s(!0);
      },
      onDragLeave: () => s(!1),
      onDrop: (p) => {
        p.preventDefault(), s(!1);
        const m = p.dataTransfer.files?.[0];
        m && h(m);
      },
      onClick: () => f.current?.click(),
      role: "button",
      tabIndex: 0,
      onKeyDown: (p) => {
        (p.key === "Enter" || p.key === " ") && (p.preventDefault(), f.current?.click());
      },
      "aria-busy": o,
      children: [
        /* @__PURE__ */ g.jsx(
          "input",
          {
            ref: f,
            type: "file",
            accept: "audio/*",
            onChange: (p) => {
              const m = p.currentTarget.files?.[0];
              m && h(m), p.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : t
      ]
    }
  );
}
function mO({
  onExport: t,
  onImport: a,
  onParseError: l
}) {
  const [s, o] = S.useState("error"), c = S.useRef(null);
  return /* @__PURE__ */ g.jsxs("div", { className: ZS, children: [
    /* @__PURE__ */ g.jsx(Ge, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ g.jsx(
      "input",
      {
        ref: c,
        type: "file",
        accept: "application/json,.json",
        className: sO,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (f) => {
          const h = f.currentTarget.files?.[0];
          if (f.currentTarget.value = "", !!h)
            try {
              const p = await h.text(), m = JSON.parse(p);
              a(m, s);
            } catch {
              l("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ g.jsx(Ge, { variant: "secondary", size: "sm", onClick: () => c.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ g.jsxs(
      "select",
      {
        className: Bl,
        value: s,
        onChange: (f) => o(f.currentTarget.value),
        "aria-label": "Import conflict strategy",
        children: [
          /* @__PURE__ */ g.jsx("option", { value: "error", children: "Error on conflict" }),
          /* @__PURE__ */ g.jsx("option", { value: "skip", children: "Skip existing" }),
          /* @__PURE__ */ g.jsx("option", { value: "replace", children: "Replace existing" })
        ]
      }
    )
  ] });
}
function pO(t) {
  const a = new Set(t.map((s) => s.characterName.toLowerCase()));
  let l = 1;
  for (; a.has(`character ${l}`); ) l += 1;
  return `Character ${l}`;
}
function yO(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function gO(t) {
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
function vO(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function bO(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function xO(t, a) {
  const l = [];
  for (let s = 0; s < a; s += 1) {
    const o = t.charCodeAt(s % t.length);
    l.push((o * 31 + s * 7) % 100 / 100);
  }
  return l;
}
function SO(t, a) {
  const l = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), s = URL.createObjectURL(l), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function Ui(t) {
  return t instanceof $i || t instanceof Error ? t.message : "unknown error";
}
function EO() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await HR();
        return { deployments: t };
      },
      Component: xC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Nl(t, "deploymentId");
        return XT(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Nl(t, "deploymentId"), [l, { mappings: s }, { runs: o }, c] = await Promise.all([
          hv(a),
          mv(a),
          GR(a, { limit: 10 }),
          QR(a)
        ]);
        return { deployment: l, mappings: s, runs: o, workflow: c };
      },
      Component: JN
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Nl(t, "deploymentId"), l = Nl(t, "runId");
        return { run: await mh(a, l) };
      },
      Component: p3
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Nl(t, "deploymentId"), [l, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          hv(a),
          mv(a),
          su(a)
        ]);
        return { deployment: l, mappings: s, voiceAssets: o };
      },
      Component: uO
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const l = Nl(t, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: l,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: I3
    },
    {
      path: "/runtime/queue",
      Component: F3
    }
  ];
}
function Nl(t, a) {
  const l = t[a];
  if (!l)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return l;
}
const Wd = "emotion-tts-app", TO = "ext-event", db = "emotion-tts-stylesheet", hb = ["accent", "density", "card"];
function wO(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function RO() {
  if (typeof document > "u" || document.getElementById(db)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = db, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
RO();
class CO extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = vT.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.paint();
  }
  attributeChangedCallback() {
    this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null;
  }
  syncTweaksFromBody() {
    for (const a of hb) {
      const l = wO(a);
      l === void 0 ? delete this.dataset[a] : this.dataset[a] !== l && (this.dataset[a] = l);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: hb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), l = eR(EO(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ g.jsx(S.StrictMode, { children: /* @__PURE__ */ g.jsx(nR, { router: l }) })
    );
  }
  resolveInitialEntry() {
    const a = this.getAttribute("route");
    if (a && a.length > 0) return a;
    const l = this.getAttribute("deployment-id");
    return l && l.length > 0 ? `/${l}/recipe` : "/";
  }
  emitHostEvent(a, l) {
    this.dispatchEvent(
      new CustomEvent(TO, {
        detail: { topic: a, payload: l },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function MO() {
  typeof customElements > "u" || customElements.get(Wd) || customElements.define(Wd, CO);
}
typeof customElements < "u" && !customElements.get(Wd) && MO();
export {
  MO as register
};
//# sourceMappingURL=emotion-tts.js.map
