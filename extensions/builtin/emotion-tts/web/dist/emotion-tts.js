function jE(n, a) {
  for (var i = 0; i < a.length; i++) {
    const s = a[i];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const o in s)
        if (o !== "default" && !(o in n)) {
          const u = Object.getOwnPropertyDescriptor(s, o);
          u && Object.defineProperty(n, o, u.get ? u : {
            enumerable: !0,
            get: () => s[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function Vb(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Pd = { exports: {} }, Xl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hv;
function NE() {
  if (Hv) return Xl;
  Hv = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(s, o, u) {
    var h = null;
    if (u !== void 0 && (h = "" + u), o.key !== void 0 && (h = "" + o.key), "key" in o) {
      u = {};
      for (var m in o)
        m !== "key" && (u[m] = o[m]);
    } else u = o;
    return o = u.ref, {
      $$typeof: n,
      type: s,
      key: h,
      ref: o !== void 0 ? o : null,
      props: u
    };
  }
  return Xl.Fragment = a, Xl.jsx = i, Xl.jsxs = i, Xl;
}
var qv;
function TE() {
  return qv || (qv = 1, Pd.exports = NE()), Pd.exports;
}
var d = TE(), Kd = { exports: {} }, Le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Iv;
function CE() {
  if (Iv) return Le;
  Iv = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), S = Symbol.iterator;
  function E(M) {
    return M === null || typeof M != "object" ? null : (M = S && M[S] || M["@@iterator"], typeof M == "function" ? M : null);
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
  }, N = Object.assign, C = {};
  function T(M, J, Z) {
    this.props = M, this.context = J, this.refs = C, this.updater = Z || w;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(M, J) {
    if (typeof M != "object" && typeof M != "function" && M != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, M, J, "setState");
  }, T.prototype.forceUpdate = function(M) {
    this.updater.enqueueForceUpdate(this, M, "forceUpdate");
  };
  function k() {
  }
  k.prototype = T.prototype;
  function R(M, J, Z) {
    this.props = M, this.context = J, this.refs = C, this.updater = Z || w;
  }
  var _ = R.prototype = new k();
  _.constructor = R, N(_, T.prototype), _.isPureReactComponent = !0;
  var K = Array.isArray;
  function ee() {
  }
  var te = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function q(M, J, Z) {
    var ce = Z.ref;
    return {
      $$typeof: n,
      type: M,
      key: J,
      ref: ce !== void 0 ? ce : null,
      props: Z
    };
  }
  function F(M, J) {
    return q(M.type, J, M.props);
  }
  function oe(M) {
    return typeof M == "object" && M !== null && M.$$typeof === n;
  }
  function ie(M) {
    var J = { "=": "=0", ":": "=2" };
    return "$" + M.replace(/[=:]/g, function(Z) {
      return J[Z];
    });
  }
  var U = /\/+/g;
  function ne(M, J) {
    return typeof M == "object" && M !== null && M.key != null ? ie("" + M.key) : J.toString(36);
  }
  function Q(M) {
    switch (M.status) {
      case "fulfilled":
        return M.value;
      case "rejected":
        throw M.reason;
      default:
        switch (typeof M.status == "string" ? M.then(ee, ee) : (M.status = "pending", M.then(
          function(J) {
            M.status === "pending" && (M.status = "fulfilled", M.value = J);
          },
          function(J) {
            M.status === "pending" && (M.status = "rejected", M.reason = J);
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
  function O(M, J, Z, ce, he) {
    var ve = typeof M;
    (ve === "undefined" || ve === "boolean") && (M = null);
    var _e = !1;
    if (M === null) _e = !0;
    else
      switch (ve) {
        case "bigint":
        case "string":
        case "number":
          _e = !0;
          break;
        case "object":
          switch (M.$$typeof) {
            case n:
            case a:
              _e = !0;
              break;
            case x:
              return _e = M._init, O(
                _e(M._payload),
                J,
                Z,
                ce,
                he
              );
          }
      }
    if (_e)
      return he = he(M), _e = ce === "" ? "." + ne(M, 0) : ce, K(he) ? (Z = "", _e != null && (Z = _e.replace(U, "$&/") + "/"), O(he, J, Z, "", function(Jt) {
        return Jt;
      })) : he != null && (oe(he) && (he = F(
        he,
        Z + (he.key == null || M && M.key === he.key ? "" : ("" + he.key).replace(
          U,
          "$&/"
        ) + "/") + _e
      )), J.push(he)), 1;
    _e = 0;
    var Me = ce === "" ? "." : ce + ":";
    if (K(M))
      for (var Ve = 0; Ve < M.length; Ve++)
        ce = M[Ve], ve = Me + ne(ce, Ve), _e += O(
          ce,
          J,
          Z,
          ve,
          he
        );
    else if (Ve = E(M), typeof Ve == "function")
      for (M = Ve.call(M), Ve = 0; !(ce = M.next()).done; )
        ce = ce.value, ve = Me + ne(ce, Ve++), _e += O(
          ce,
          J,
          Z,
          ve,
          he
        );
    else if (ve === "object") {
      if (typeof M.then == "function")
        return O(
          Q(M),
          J,
          Z,
          ce,
          he
        );
      throw J = String(M), Error(
        "Objects are not valid as a React child (found: " + (J === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : J) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return _e;
  }
  function A(M, J, Z) {
    if (M == null) return M;
    var ce = [], he = 0;
    return O(M, ce, "", "", function(ve) {
      return J.call(Z, ve, he++);
    }), ce;
  }
  function V(M) {
    if (M._status === -1) {
      var J = M._result;
      J = J(), J.then(
        function(Z) {
          (M._status === 0 || M._status === -1) && (M._status = 1, M._result = Z);
        },
        function(Z) {
          (M._status === 0 || M._status === -1) && (M._status = 2, M._result = Z);
        }
      ), M._status === -1 && (M._status = 0, M._result = J);
    }
    if (M._status === 1) return M._result.default;
    throw M._result;
  }
  var X = typeof reportError == "function" ? reportError : function(M) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var J = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof M == "object" && M !== null && typeof M.message == "string" ? String(M.message) : String(M),
        error: M
      });
      if (!window.dispatchEvent(J)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", M);
      return;
    }
    console.error(M);
  }, re = {
    map: A,
    forEach: function(M, J, Z) {
      A(
        M,
        function() {
          J.apply(this, arguments);
        },
        Z
      );
    },
    count: function(M) {
      var J = 0;
      return A(M, function() {
        J++;
      }), J;
    },
    toArray: function(M) {
      return A(M, function(J) {
        return J;
      }) || [];
    },
    only: function(M) {
      if (!oe(M))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return M;
    }
  };
  return Le.Activity = g, Le.Children = re, Le.Component = T, Le.Fragment = i, Le.Profiler = o, Le.PureComponent = R, Le.StrictMode = s, Le.Suspense = v, Le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = te, Le.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(M) {
      return te.H.useMemoCache(M);
    }
  }, Le.cache = function(M) {
    return function() {
      return M.apply(null, arguments);
    };
  }, Le.cacheSignal = function() {
    return null;
  }, Le.cloneElement = function(M, J, Z) {
    if (M == null)
      throw Error(
        "The argument must be a React element, but you passed " + M + "."
      );
    var ce = N({}, M.props), he = M.key;
    if (J != null)
      for (ve in J.key !== void 0 && (he = "" + J.key), J)
        !D.call(J, ve) || ve === "key" || ve === "__self" || ve === "__source" || ve === "ref" && J.ref === void 0 || (ce[ve] = J[ve]);
    var ve = arguments.length - 2;
    if (ve === 1) ce.children = Z;
    else if (1 < ve) {
      for (var _e = Array(ve), Me = 0; Me < ve; Me++)
        _e[Me] = arguments[Me + 2];
      ce.children = _e;
    }
    return q(M.type, he, ce);
  }, Le.createContext = function(M) {
    return M = {
      $$typeof: h,
      _currentValue: M,
      _currentValue2: M,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, M.Provider = M, M.Consumer = {
      $$typeof: u,
      _context: M
    }, M;
  }, Le.createElement = function(M, J, Z) {
    var ce, he = {}, ve = null;
    if (J != null)
      for (ce in J.key !== void 0 && (ve = "" + J.key), J)
        D.call(J, ce) && ce !== "key" && ce !== "__self" && ce !== "__source" && (he[ce] = J[ce]);
    var _e = arguments.length - 2;
    if (_e === 1) he.children = Z;
    else if (1 < _e) {
      for (var Me = Array(_e), Ve = 0; Ve < _e; Ve++)
        Me[Ve] = arguments[Ve + 2];
      he.children = Me;
    }
    if (M && M.defaultProps)
      for (ce in _e = M.defaultProps, _e)
        he[ce] === void 0 && (he[ce] = _e[ce]);
    return q(M, ve, he);
  }, Le.createRef = function() {
    return { current: null };
  }, Le.forwardRef = function(M) {
    return { $$typeof: m, render: M };
  }, Le.isValidElement = oe, Le.lazy = function(M) {
    return {
      $$typeof: x,
      _payload: { _status: -1, _result: M },
      _init: V
    };
  }, Le.memo = function(M, J) {
    return {
      $$typeof: p,
      type: M,
      compare: J === void 0 ? null : J
    };
  }, Le.startTransition = function(M) {
    var J = te.T, Z = {};
    te.T = Z;
    try {
      var ce = M(), he = te.S;
      he !== null && he(Z, ce), typeof ce == "object" && ce !== null && typeof ce.then == "function" && ce.then(ee, X);
    } catch (ve) {
      X(ve);
    } finally {
      J !== null && Z.types !== null && (J.types = Z.types), te.T = J;
    }
  }, Le.unstable_useCacheRefresh = function() {
    return te.H.useCacheRefresh();
  }, Le.use = function(M) {
    return te.H.use(M);
  }, Le.useActionState = function(M, J, Z) {
    return te.H.useActionState(M, J, Z);
  }, Le.useCallback = function(M, J) {
    return te.H.useCallback(M, J);
  }, Le.useContext = function(M) {
    return te.H.useContext(M);
  }, Le.useDebugValue = function() {
  }, Le.useDeferredValue = function(M, J) {
    return te.H.useDeferredValue(M, J);
  }, Le.useEffect = function(M, J) {
    return te.H.useEffect(M, J);
  }, Le.useEffectEvent = function(M) {
    return te.H.useEffectEvent(M);
  }, Le.useId = function() {
    return te.H.useId();
  }, Le.useImperativeHandle = function(M, J, Z) {
    return te.H.useImperativeHandle(M, J, Z);
  }, Le.useInsertionEffect = function(M, J) {
    return te.H.useInsertionEffect(M, J);
  }, Le.useLayoutEffect = function(M, J) {
    return te.H.useLayoutEffect(M, J);
  }, Le.useMemo = function(M, J) {
    return te.H.useMemo(M, J);
  }, Le.useOptimistic = function(M, J) {
    return te.H.useOptimistic(M, J);
  }, Le.useReducer = function(M, J, Z) {
    return te.H.useReducer(M, J, Z);
  }, Le.useRef = function(M) {
    return te.H.useRef(M);
  }, Le.useState = function(M) {
    return te.H.useState(M);
  }, Le.useSyncExternalStore = function(M, J, Z) {
    return te.H.useSyncExternalStore(
      M,
      J,
      Z
    );
  }, Le.useTransition = function() {
    return te.H.useTransition();
  }, Le.version = "19.2.5", Le;
}
var Fv;
function yh() {
  return Fv || (Fv = 1, Kd.exports = CE()), Kd.exports;
}
var y = yh();
const me = /* @__PURE__ */ Vb(y), RE = /* @__PURE__ */ jE({
  __proto__: null,
  default: me
}, [y]);
var Qd = { exports: {} }, Pl = {}, Zd = { exports: {} }, Jd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yv;
function ME() {
  return Yv || (Yv = 1, (function(n) {
    function a(O, A) {
      var V = O.length;
      O.push(A);
      e: for (; 0 < V; ) {
        var X = V - 1 >>> 1, re = O[X];
        if (0 < o(re, A))
          O[X] = A, O[V] = re, V = X;
        else break e;
      }
    }
    function i(O) {
      return O.length === 0 ? null : O[0];
    }
    function s(O) {
      if (O.length === 0) return null;
      var A = O[0], V = O.pop();
      if (V !== A) {
        O[0] = V;
        e: for (var X = 0, re = O.length, M = re >>> 1; X < M; ) {
          var J = 2 * (X + 1) - 1, Z = O[J], ce = J + 1, he = O[ce];
          if (0 > o(Z, V))
            ce < re && 0 > o(he, Z) ? (O[X] = he, O[ce] = V, X = ce) : (O[X] = Z, O[J] = V, X = J);
          else if (ce < re && 0 > o(he, V))
            O[X] = he, O[ce] = V, X = ce;
          else break e;
        }
      }
      return A;
    }
    function o(O, A) {
      var V = O.sortIndex - A.sortIndex;
      return V !== 0 ? V : O.id - A.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      n.unstable_now = function() {
        return u.now();
      };
    } else {
      var h = Date, m = h.now();
      n.unstable_now = function() {
        return h.now() - m;
      };
    }
    var v = [], p = [], x = 1, g = null, S = 3, E = !1, w = !1, N = !1, C = !1, T = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, R = typeof setImmediate < "u" ? setImmediate : null;
    function _(O) {
      for (var A = i(p); A !== null; ) {
        if (A.callback === null) s(p);
        else if (A.startTime <= O)
          s(p), A.sortIndex = A.expirationTime, a(v, A);
        else break;
        A = i(p);
      }
    }
    function K(O) {
      if (N = !1, _(O), !w)
        if (i(v) !== null)
          w = !0, ee || (ee = !0, ie());
        else {
          var A = i(p);
          A !== null && Q(K, A.startTime - O);
        }
    }
    var ee = !1, te = -1, D = 5, q = -1;
    function F() {
      return C ? !0 : !(n.unstable_now() - q < D);
    }
    function oe() {
      if (C = !1, ee) {
        var O = n.unstable_now();
        q = O;
        var A = !0;
        try {
          e: {
            w = !1, N && (N = !1, k(te), te = -1), E = !0;
            var V = S;
            try {
              t: {
                for (_(O), g = i(v); g !== null && !(g.expirationTime > O && F()); ) {
                  var X = g.callback;
                  if (typeof X == "function") {
                    g.callback = null, S = g.priorityLevel;
                    var re = X(
                      g.expirationTime <= O
                    );
                    if (O = n.unstable_now(), typeof re == "function") {
                      g.callback = re, _(O), A = !0;
                      break t;
                    }
                    g === i(v) && s(v), _(O);
                  } else s(v);
                  g = i(v);
                }
                if (g !== null) A = !0;
                else {
                  var M = i(p);
                  M !== null && Q(
                    K,
                    M.startTime - O
                  ), A = !1;
                }
              }
              break e;
            } finally {
              g = null, S = V, E = !1;
            }
            A = void 0;
          }
        } finally {
          A ? ie() : ee = !1;
        }
      }
    }
    var ie;
    if (typeof R == "function")
      ie = function() {
        R(oe);
      };
    else if (typeof MessageChannel < "u") {
      var U = new MessageChannel(), ne = U.port2;
      U.port1.onmessage = oe, ie = function() {
        ne.postMessage(null);
      };
    } else
      ie = function() {
        T(oe, 0);
      };
    function Q(O, A) {
      te = T(function() {
        O(n.unstable_now());
      }, A);
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
          var A = 3;
          break;
        default:
          A = S;
      }
      var V = S;
      S = A;
      try {
        return O();
      } finally {
        S = V;
      }
    }, n.unstable_requestPaint = function() {
      C = !0;
    }, n.unstable_runWithPriority = function(O, A) {
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
      var V = S;
      S = O;
      try {
        return A();
      } finally {
        S = V;
      }
    }, n.unstable_scheduleCallback = function(O, A, V) {
      var X = n.unstable_now();
      switch (typeof V == "object" && V !== null ? (V = V.delay, V = typeof V == "number" && 0 < V ? X + V : X) : V = X, O) {
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
      return re = V + re, O = {
        id: x++,
        callback: A,
        priorityLevel: O,
        startTime: V,
        expirationTime: re,
        sortIndex: -1
      }, V > X ? (O.sortIndex = V, a(p, O), i(v) === null && O === i(p) && (N ? (k(te), te = -1) : N = !0, Q(K, V - X))) : (O.sortIndex = re, a(v, O), w || E || (w = !0, ee || (ee = !0, ie()))), O;
    }, n.unstable_shouldYield = F, n.unstable_wrapCallback = function(O) {
      var A = S;
      return function() {
        var V = S;
        S = A;
        try {
          return O.apply(this, arguments);
        } finally {
          S = V;
        }
      };
    };
  })(Jd)), Jd;
}
var Gv;
function AE() {
  return Gv || (Gv = 1, Zd.exports = ME()), Zd.exports;
}
var Wd = { exports: {} }, on = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xv;
function _E() {
  if (Xv) return on;
  Xv = 1;
  var n = yh();
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
  function u(v, p, x) {
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
  return on.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, on.createPortal = function(v, p) {
    var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return u(v, p, null, x);
  }, on.flushSync = function(v) {
    var p = h.T, x = s.p;
    try {
      if (h.T = null, s.p = 2, v) return v();
    } finally {
      h.T = p, s.p = x, s.d.f();
    }
  }, on.preconnect = function(v, p) {
    typeof v == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(v, p));
  }, on.prefetchDNS = function(v) {
    typeof v == "string" && s.d.D(v);
  }, on.preinit = function(v, p) {
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
  }, on.preinitModule = function(v, p) {
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
  }, on.preload = function(v, p) {
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
  }, on.preloadModule = function(v, p) {
    if (typeof v == "string")
      if (p) {
        var x = m(p.as, p.crossOrigin);
        s.d.m(v, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: x,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(v);
  }, on.requestFormReset = function(v) {
    s.d.r(v);
  }, on.unstable_batchedUpdates = function(v, p) {
    return v(p);
  }, on.useFormState = function(v, p, x) {
    return h.H.useFormState(v, p, x);
  }, on.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, on.version = "19.2.5", on;
}
var Pv;
function $b() {
  if (Pv) return Wd.exports;
  Pv = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Wd.exports = _E(), Wd.exports;
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
function DE() {
  if (Kv) return Pl;
  Kv = 1;
  var n = AE(), a = yh(), i = $b();
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
  function u(e) {
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
    if (u(e) !== e)
      throw Error(s(188));
  }
  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (t = u(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var r = e, l = t; ; ) {
      var c = r.return;
      if (c === null) break;
      var f = c.alternate;
      if (f === null) {
        if (l = c.return, l !== null) {
          r = l;
          continue;
        }
        break;
      }
      if (c.child === f.child) {
        for (f = c.child; f; ) {
          if (f === r) return v(c), e;
          if (f === l) return v(c), t;
          f = f.sibling;
        }
        throw Error(s(188));
      }
      if (r.return !== l.return) r = c, l = f;
      else {
        for (var b = !1, j = c.child; j; ) {
          if (j === r) {
            b = !0, r = c, l = f;
            break;
          }
          if (j === l) {
            b = !0, l = c, r = f;
            break;
          }
          j = j.sibling;
        }
        if (!b) {
          for (j = f.child; j; ) {
            if (j === r) {
              b = !0, r = f, l = c;
              break;
            }
            if (j === l) {
              b = !0, l = f, r = c;
              break;
            }
            j = j.sibling;
          }
          if (!b) throw Error(s(189));
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
  var g = Object.assign, S = Symbol.for("react.element"), E = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), k = Symbol.for("react.consumer"), R = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), ee = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), q = Symbol.for("react.activity"), F = Symbol.for("react.memo_cache_sentinel"), oe = Symbol.iterator;
  function ie(e) {
    return e === null || typeof e != "object" ? null : (e = oe && e[oe] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var U = Symbol.for("react.client.reference");
  function ne(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === U ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case N:
        return "Fragment";
      case T:
        return "Profiler";
      case C:
        return "StrictMode";
      case K:
        return "Suspense";
      case ee:
        return "SuspenseList";
      case q:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case R:
          return e.displayName || "Context";
        case k:
          return (e._context.displayName || "Context") + ".Consumer";
        case _:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case te:
          return t = e.displayName || null, t !== null ? t : ne(e.type) || "Memo";
        case D:
          t = e._payload, e = e._init;
          try {
            return ne(e(t));
          } catch {
          }
      }
    return null;
  }
  var Q = Array.isArray, O = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, A = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, X = [], re = -1;
  function M(e) {
    return { current: e };
  }
  function J(e) {
    0 > re || (e.current = X[re], X[re] = null, re--);
  }
  function Z(e, t) {
    re++, X[re] = e.current, e.current = t;
  }
  var ce = M(null), he = M(null), ve = M(null), _e = M(null);
  function Me(e, t) {
    switch (Z(ve, t), Z(he, e), Z(ce, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? uv(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = uv(t), e = dv(t, e);
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
    J(ce), Z(ce, e);
  }
  function Ve() {
    J(ce), J(he), J(ve);
  }
  function Jt(e) {
    e.memoizedState !== null && Z(_e, e);
    var t = ce.current, r = dv(t, e.type);
    t !== r && (Z(he, e), Z(ce, r));
  }
  function Pt(e) {
    he.current === e && (J(ce), J(he)), _e.current === e && (J(_e), Il._currentValue = V);
  }
  var _t, We;
  function pt(e) {
    if (_t === void 0)
      try {
        throw Error();
      } catch (r) {
        var t = r.stack.trim().match(/\n( *(at )?)/);
        _t = t && t[1] || "", We = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + _t + e + We;
  }
  var fe = !1;
  function ke(e, t) {
    if (!e || fe) return "";
    fe = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var se = function() {
                throw Error();
              };
              if (Object.defineProperty(se.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(se, []);
                } catch (W) {
                  var P = W;
                }
                Reflect.construct(e, [], se);
              } else {
                try {
                  se.call();
                } catch (W) {
                  P = W;
                }
                e.call(se.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (W) {
                P = W;
              }
              (se = e()) && typeof se.catch == "function" && se.catch(function() {
              });
            }
          } catch (W) {
            if (W && P && typeof W.stack == "string")
              return [W.stack, P.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var c = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      c && c.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var f = l.DetermineComponentFrameRoot(), b = f[0], j = f[1];
      if (b && j) {
        var L = b.split(`
`), G = j.split(`
`);
        for (c = l = 0; l < L.length && !L[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; c < G.length && !G[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (l === L.length || c === G.length)
          for (l = L.length - 1, c = G.length - 1; 1 <= l && 0 <= c && L[l] !== G[c]; )
            c--;
        for (; 1 <= l && 0 <= c; l--, c--)
          if (L[l] !== G[c]) {
            if (l !== 1 || c !== 1)
              do
                if (l--, c--, 0 > c || L[l] !== G[c]) {
                  var ae = `
` + L[l].replace(" at new ", " at ");
                  return e.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", e.displayName)), ae;
                }
              while (1 <= l && 0 <= c);
            break;
          }
      }
    } finally {
      fe = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? pt(r) : "";
  }
  function De(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return pt(e.type);
      case 16:
        return pt("Lazy");
      case 13:
        return e.child !== t && t !== null ? pt("Suspense Fallback") : pt("Suspense");
      case 19:
        return pt("SuspenseList");
      case 0:
      case 15:
        return ke(e.type, !1);
      case 11:
        return ke(e.type.render, !1);
      case 1:
        return ke(e.type, !0);
      case 31:
        return pt("Activity");
      default:
        return "";
    }
  }
  function Te(e) {
    try {
      var t = "", r = null;
      do
        t += De(e, r), r = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var bt = Object.prototype.hasOwnProperty, xt = n.unstable_scheduleCallback, dn = n.unstable_cancelCallback, Ht = n.unstable_shouldYield, On = n.unstable_requestPaint, qt = n.unstable_now, ye = n.unstable_getCurrentPriorityLevel, ze = n.unstable_ImmediatePriority, Ke = n.unstable_UserBlockingPriority, tt = n.unstable_NormalPriority, It = n.unstable_LowPriority, Ft = n.unstable_IdlePriority, Nr = n.log, la = n.unstable_setDisableYieldValue, Zn = null, Wt = null;
  function Tt(e) {
    if (typeof Nr == "function" && la(e), Wt && typeof Wt.setStrictMode == "function")
      try {
        Wt.setStrictMode(Zn, e);
      } catch {
      }
  }
  var Yt = Math.clz32 ? Math.clz32 : kn, ei = Math.log, Ha = Math.LN2;
  function kn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ei(e) / Ha | 0) | 0;
  }
  var ga = 256, Jn = 262144, sa = 4194304;
  function hn(e) {
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
  function Oe(e, t, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var c = 0, f = e.suspendedLanes, b = e.pingedLanes;
    e = e.warmLanes;
    var j = l & 134217727;
    return j !== 0 ? (l = j & ~f, l !== 0 ? c = hn(l) : (b &= j, b !== 0 ? c = hn(b) : r || (r = j & ~e, r !== 0 && (c = hn(r))))) : (j = l & ~f, j !== 0 ? c = hn(j) : b !== 0 ? c = hn(b) : r || (r = l & ~e, r !== 0 && (c = hn(r)))), c === 0 ? 0 : t !== 0 && t !== c && (t & f) === 0 && (f = c & -c, r = t & -t, f >= r || f === 32 && (r & 4194048) !== 0) ? t : c;
  }
  function ct(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Dt(e, t) {
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
  function Gt() {
    var e = sa;
    return sa <<= 1, (sa & 62914560) === 0 && (sa = 4194304), e;
  }
  function wn(e) {
    for (var t = [], r = 0; 31 > r; r++) t.push(e);
    return t;
  }
  function rt(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function en(e, t, r, l, c, f) {
    var b = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var j = e.entanglements, L = e.expirationTimes, G = e.hiddenUpdates;
    for (r = b & ~r; 0 < r; ) {
      var ae = 31 - Yt(r), se = 1 << ae;
      j[ae] = 0, L[ae] = -1;
      var P = G[ae];
      if (P !== null)
        for (G[ae] = null, ae = 0; ae < P.length; ae++) {
          var W = P[ae];
          W !== null && (W.lane &= -536870913);
        }
      r &= ~se;
    }
    l !== 0 && va(e, l, 0), f !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(b & ~t));
  }
  function va(e, t, r) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - Yt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function ln(e, t) {
    var r = e.entangledLanes |= t;
    for (e = e.entanglements; r; ) {
      var l = 31 - Yt(r), c = 1 << l;
      c & t | e[l] & t && (e[l] |= t), r &= ~c;
    }
  }
  function z(e, t) {
    var r = t & -t;
    return r = (r & 42) !== 0 ? 1 : $(r), (r & (e.suspendedLanes | t)) !== 0 ? 0 : r;
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
  function I(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ue() {
    var e = A.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Ov(e.type));
  }
  function de(e, t) {
    var r = A.p;
    try {
      return A.p = e, t();
    } finally {
      A.p = r;
    }
  }
  var Se = Math.random().toString(36).slice(2), pe = "__reactFiber$" + Se, ge = "__reactProps$" + Se, Ee = "__reactContainer$" + Se, be = "__reactEvents$" + Se, Re = "__reactListeners$" + Se, Ne = "__reactHandles$" + Se, Qe = "__reactResources$" + Se, $e = "__reactMarker$" + Se;
  function ut(e) {
    delete e[pe], delete e[ge], delete e[be], delete e[Re], delete e[Ne];
  }
  function it(e) {
    var t = e[pe];
    if (t) return t;
    for (var r = e.parentNode; r; ) {
      if (t = r[Ee] || r[pe]) {
        if (r = t.alternate, t.child !== null || r !== null && r.child !== null)
          for (e = yv(e); e !== null; ) {
            if (r = e[pe]) return r;
            e = yv(e);
          }
        return t;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function St(e) {
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
  function zt(e) {
    var t = e[Qe];
    return t || (t = e[Qe] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function mt(e) {
    e[$e] = !0;
  }
  var qa = /* @__PURE__ */ new Set(), Wn = {};
  function Kt(e, t) {
    oa(e, t), oa(e + "Capture", t);
  }
  function oa(e, t) {
    for (Wn[e] = t, e = 0; e < t.length; e++)
      qa.add(t[e]);
  }
  var Tr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ca = {}, Cr = {};
  function ti(e) {
    return bt.call(Cr, e) ? !0 : bt.call(ca, e) ? !1 : Tr.test(e) ? Cr[e] = !0 : (ca[e] = !0, !1);
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
  function Ct(e, t, r) {
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
  function sn(e, t, r, l) {
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
  function Ot(e) {
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
  function gt(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ni(e, t, r) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, f = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return c.call(this);
        },
        set: function(b) {
          r = "" + b, f.call(this, b);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return r;
        },
        setValue: function(b) {
          r = "" + b;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function ai(e) {
    if (!e._valueTracker) {
      var t = gt(e) ? "checked" : "value";
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
    return e && (l = gt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (t.setValue(e), !0) : !1;
  }
  function zs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var yS = /[\n"\\]/g;
  function Ln(e) {
    return e.replace(
      yS,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function qc(e, t, r, l, c, f, b, j) {
    e.name = "", b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? e.type = b : e.removeAttribute("type"), t != null ? b === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ot(t)) : e.value !== "" + Ot(t) && (e.value = "" + Ot(t)) : b !== "submit" && b !== "reset" || e.removeAttribute("value"), t != null ? Ic(e, b, Ot(t)) : r != null ? Ic(e, b, Ot(r)) : l != null && e.removeAttribute("value"), c == null && f != null && (e.defaultChecked = !!f), c != null && (e.checked = c && typeof c != "function" && typeof c != "symbol"), j != null && typeof j != "function" && typeof j != "symbol" && typeof j != "boolean" ? e.name = "" + Ot(j) : e.removeAttribute("name");
  }
  function rm(e, t, r, l, c, f, b, j) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), t != null || r != null) {
      if (!(f !== "submit" && f !== "reset" || t != null)) {
        ai(e);
        return;
      }
      r = r != null ? "" + Ot(r) : "", t = t != null ? "" + Ot(t) : r, j || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? c, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = j ? e.checked : !!l, e.defaultChecked = !!l, b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" && (e.name = b), ai(e);
  }
  function Ic(e, t, r) {
    t === "number" && zs(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ri(e, t, r, l) {
    if (e = e.options, t) {
      t = {};
      for (var c = 0; c < r.length; c++)
        t["$" + r[c]] = !0;
      for (r = 0; r < e.length; r++)
        c = t.hasOwnProperty("$" + e[r].value), e[r].selected !== c && (e[r].selected = c), c && l && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + Ot(r), t = null, c = 0; c < e.length; c++) {
        if (e[c].value === r) {
          e[c].selected = !0, l && (e[c].defaultSelected = !0);
          return;
        }
        t !== null || e[c].disabled || (t = e[c]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function im(e, t, r) {
    if (t != null && (t = "" + Ot(t), t !== e.value && (e.value = t), r == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = r != null ? "" + Ot(r) : "";
  }
  function lm(e, t, r, l) {
    if (t == null) {
      if (l != null) {
        if (r != null) throw Error(s(92));
        if (Q(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), t = r;
    }
    r = Ot(t), e.defaultValue = r, l = e.textContent, l === r && l !== "" && l !== null && (e.value = l), ai(e);
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
  var bS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function sm(e, t, r) {
    var l = t.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, r) : typeof r != "number" || r === 0 || bS.has(t) ? t === "float" ? e.cssFloat = r : e[t] = ("" + r).trim() : e[t] = r + "px";
  }
  function om(e, t, r) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, r != null) {
      for (var l in r)
        !r.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var c in t)
        l = t[c], t.hasOwnProperty(c) && r[c] !== l && sm(e, c, l);
    } else
      for (var f in t)
        t.hasOwnProperty(f) && sm(e, f, t[f]);
  }
  function Fc(e) {
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
  var xS = /* @__PURE__ */ new Map([
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
  ]), SS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Os(e) {
    return SS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ya() {
  }
  var Yc = null;
  function Gc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var li = null, si = null;
  function cm(e) {
    var t = St(e);
    if (t && (e = t.stateNode)) {
      var r = e[ge] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (qc(
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
              'input[name="' + Ln(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < r.length; t++) {
              var l = r[t];
              if (l !== e && l.form === e.form) {
                var c = l[ge] || null;
                if (!c) throw Error(s(90));
                qc(
                  l,
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
            for (t = 0; t < r.length; t++)
              l = r[t], l.form === e.form && Ds(l);
          }
          break e;
        case "textarea":
          im(e, r.value, r.defaultValue);
          break e;
        case "select":
          t = r.value, t != null && ri(e, !!r.multiple, t, !1);
      }
    }
  }
  var Xc = !1;
  function um(e, t, r) {
    if (Xc) return e(t, r);
    Xc = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Xc = !1, (li !== null || si !== null) && (wo(), li && (t = li, e = si, si = li = null, cm(t), e)))
        for (t = 0; t < e.length; t++) cm(e[t]);
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
  var ba = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Pc = !1;
  if (ba)
    try {
      var sl = {};
      Object.defineProperty(sl, "passive", {
        get: function() {
          Pc = !0;
        }
      }), window.addEventListener("test", sl, sl), window.removeEventListener("test", sl, sl);
    } catch {
      Pc = !1;
    }
  var Ia = null, Kc = null, ks = null;
  function dm() {
    if (ks) return ks;
    var e, t = Kc, r = t.length, l, c = "value" in Ia ? Ia.value : Ia.textContent, f = c.length;
    for (e = 0; e < r && t[e] === c[e]; e++) ;
    var b = r - e;
    for (l = 1; l <= b && t[r - l] === c[f - l]; l++) ;
    return ks = c.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Ls(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Us() {
    return !0;
  }
  function fm() {
    return !1;
  }
  function mn(e) {
    function t(r, l, c, f, b) {
      this._reactName = r, this._targetInst = c, this.type = l, this.nativeEvent = f, this.target = b, this.currentTarget = null;
      for (var j in e)
        e.hasOwnProperty(j) && (r = e[j], this[j] = r ? r(f) : f[j]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Us : fm, this.isPropagationStopped = fm, this;
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
  }, Bs = mn(Rr), ol = g({}, Rr, { view: 0, detail: 0 }), wS = mn(ol), Qc, Zc, cl, Vs = g({}, ol, {
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
    getModifierState: Wc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== cl && (cl && e.type === "mousemove" ? (Qc = e.screenX - cl.screenX, Zc = e.screenY - cl.screenY) : Zc = Qc = 0, cl = e), Qc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Zc;
    }
  }), hm = mn(Vs), ES = g({}, Vs, { dataTransfer: 0 }), jS = mn(ES), NS = g({}, ol, { relatedTarget: 0 }), Jc = mn(NS), TS = g({}, Rr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), CS = mn(TS), RS = g({}, Rr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), MS = mn(RS), AS = g({}, Rr, { data: 0 }), mm = mn(AS), _S = {
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
  }, DS = {
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
  }, zS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function OS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = zS[e]) ? !!t[e] : !1;
  }
  function Wc() {
    return OS;
  }
  var kS = g({}, ol, {
    key: function(e) {
      if (e.key) {
        var t = _S[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Ls(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? DS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Wc,
    charCode: function(e) {
      return e.type === "keypress" ? Ls(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ls(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), LS = mn(kS), US = g({}, Vs, {
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
  }), pm = mn(US), BS = g({}, ol, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Wc
  }), VS = mn(BS), $S = g({}, Rr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), HS = mn($S), qS = g({}, Vs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), IS = mn(qS), FS = g({}, Rr, {
    newState: 0,
    oldState: 0
  }), YS = mn(FS), GS = [9, 13, 27, 32], eu = ba && "CompositionEvent" in window, ul = null;
  ba && "documentMode" in document && (ul = document.documentMode);
  var XS = ba && "TextEvent" in window && !ul, gm = ba && (!eu || ul && 8 < ul && 11 >= ul), vm = " ", ym = !1;
  function bm(e, t) {
    switch (e) {
      case "keyup":
        return GS.indexOf(t.keyCode) !== -1;
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
  function xm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var oi = !1;
  function PS(e, t) {
    switch (e) {
      case "compositionend":
        return xm(t);
      case "keypress":
        return t.which !== 32 ? null : (ym = !0, vm);
      case "textInput":
        return e = t.data, e === vm && ym ? null : e;
      default:
        return null;
    }
  }
  function KS(e, t) {
    if (oi)
      return e === "compositionend" || !eu && bm(e, t) ? (e = dm(), ks = Kc = Ia = null, oi = !1, e) : null;
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
        return gm && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var QS = {
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
  function Sm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!QS[e.type] : t === "textarea";
  }
  function wm(e, t, r, l) {
    li ? si ? si.push(l) : si = [l] : li = l, t = Mo(t, "onChange"), 0 < t.length && (r = new Bs(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: t }));
  }
  var dl = null, fl = null;
  function ZS(e) {
    rv(e, 0);
  }
  function $s(e) {
    var t = Ie(e);
    if (Ds(t)) return e;
  }
  function Em(e, t) {
    if (e === "change") return t;
  }
  var jm = !1;
  if (ba) {
    var tu;
    if (ba) {
      var nu = "oninput" in document;
      if (!nu) {
        var Nm = document.createElement("div");
        Nm.setAttribute("oninput", "return;"), nu = typeof Nm.oninput == "function";
      }
      tu = nu;
    } else tu = !1;
    jm = tu && (!document.documentMode || 9 < document.documentMode);
  }
  function Tm() {
    dl && (dl.detachEvent("onpropertychange", Cm), fl = dl = null);
  }
  function Cm(e) {
    if (e.propertyName === "value" && $s(fl)) {
      var t = [];
      wm(
        t,
        fl,
        e,
        Gc(e)
      ), um(ZS, t);
    }
  }
  function JS(e, t, r) {
    e === "focusin" ? (Tm(), dl = t, fl = r, dl.attachEvent("onpropertychange", Cm)) : e === "focusout" && Tm();
  }
  function WS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return $s(fl);
  }
  function ew(e, t) {
    if (e === "click") return $s(t);
  }
  function tw(e, t) {
    if (e === "input" || e === "change")
      return $s(t);
  }
  function nw(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var En = typeof Object.is == "function" ? Object.is : nw;
  function hl(e, t) {
    if (En(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(t);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var c = r[l];
      if (!bt.call(t, c) || !En(e[c], t[c]))
        return !1;
    }
    return !0;
  }
  function Rm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Mm(e, t) {
    var r = Rm(e);
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
      r = Rm(r);
    }
  }
  function Am(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Am(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function _m(e) {
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
  function au(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var aw = ba && "documentMode" in document && 11 >= document.documentMode, ci = null, ru = null, ml = null, iu = !1;
  function Dm(e, t, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    iu || ci == null || ci !== zs(l) || (l = ci, "selectionStart" in l && au(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), ml && hl(ml, l) || (ml = l, l = Mo(ru, "onSelect"), 0 < l.length && (t = new Bs(
      "onSelect",
      "select",
      null,
      t,
      r
    ), e.push({ event: t, listeners: l }), t.target = ci)));
  }
  function Mr(e, t) {
    var r = {};
    return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
  }
  var ui = {
    animationend: Mr("Animation", "AnimationEnd"),
    animationiteration: Mr("Animation", "AnimationIteration"),
    animationstart: Mr("Animation", "AnimationStart"),
    transitionrun: Mr("Transition", "TransitionRun"),
    transitionstart: Mr("Transition", "TransitionStart"),
    transitioncancel: Mr("Transition", "TransitionCancel"),
    transitionend: Mr("Transition", "TransitionEnd")
  }, lu = {}, zm = {};
  ba && (zm = document.createElement("div").style, "AnimationEvent" in window || (delete ui.animationend.animation, delete ui.animationiteration.animation, delete ui.animationstart.animation), "TransitionEvent" in window || delete ui.transitionend.transition);
  function Ar(e) {
    if (lu[e]) return lu[e];
    if (!ui[e]) return e;
    var t = ui[e], r;
    for (r in t)
      if (t.hasOwnProperty(r) && r in zm)
        return lu[e] = t[r];
    return e;
  }
  var Om = Ar("animationend"), km = Ar("animationiteration"), Lm = Ar("animationstart"), rw = Ar("transitionrun"), iw = Ar("transitionstart"), lw = Ar("transitioncancel"), Um = Ar("transitionend"), Bm = /* @__PURE__ */ new Map(), su = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  su.push("scrollEnd");
  function ea(e, t) {
    Bm.set(e, t), Kt(t, [e]);
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
  }, Un = [], di = 0, ou = 0;
  function qs() {
    for (var e = di, t = ou = di = 0; t < e; ) {
      var r = Un[t];
      Un[t++] = null;
      var l = Un[t];
      Un[t++] = null;
      var c = Un[t];
      Un[t++] = null;
      var f = Un[t];
      if (Un[t++] = null, l !== null && c !== null) {
        var b = l.pending;
        b === null ? c.next = c : (c.next = b.next, b.next = c), l.pending = c;
      }
      f !== 0 && Vm(r, c, f);
    }
  }
  function Is(e, t, r, l) {
    Un[di++] = e, Un[di++] = t, Un[di++] = r, Un[di++] = l, ou |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function cu(e, t, r, l) {
    return Is(e, t, r, l), Fs(e);
  }
  function _r(e, t) {
    return Is(e, null, null, t), Fs(e);
  }
  function Vm(e, t, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var c = !1, f = e.return; f !== null; )
      f.childLanes |= r, l = f.alternate, l !== null && (l.childLanes |= r), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (c = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, c && t !== null && (c = 31 - Yt(r), e = f.hiddenUpdates, l = e[c], l === null ? e[c] = [t] : l.push(t), t.lane = r | 536870912), f) : null;
  }
  function Fs(e) {
    if (50 < Ll)
      throw Ll = 0, yd = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fi = {};
  function sw(e, t, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function jn(e, t, r, l) {
    return new sw(e, t, r, l);
  }
  function uu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function xa(e, t) {
    var r = e.alternate;
    return r === null ? (r = jn(
      e.tag,
      t,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function $m(e, t) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, t = r.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ys(e, t, r, l, c, f) {
    var b = 0;
    if (l = e, typeof e == "function") uu(e) && (b = 1);
    else if (typeof e == "string")
      b = fE(
        e,
        r,
        ce.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case q:
          return e = jn(31, r, t, c), e.elementType = q, e.lanes = f, e;
        case N:
          return Dr(r.children, c, f, t);
        case C:
          b = 8, c |= 24;
          break;
        case T:
          return e = jn(12, r, t, c | 2), e.elementType = T, e.lanes = f, e;
        case K:
          return e = jn(13, r, t, c), e.elementType = K, e.lanes = f, e;
        case ee:
          return e = jn(19, r, t, c), e.elementType = ee, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case R:
                b = 10;
                break e;
              case k:
                b = 9;
                break e;
              case _:
                b = 11;
                break e;
              case te:
                b = 14;
                break e;
              case D:
                b = 16, l = null;
                break e;
            }
          b = 29, r = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = jn(b, r, t, c), t.elementType = e, t.type = l, t.lanes = f, t;
  }
  function Dr(e, t, r, l) {
    return e = jn(7, e, l, t), e.lanes = r, e;
  }
  function du(e, t, r) {
    return e = jn(6, e, null, t), e.lanes = r, e;
  }
  function Hm(e) {
    var t = jn(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function fu(e, t, r) {
    return t = jn(
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
  var qm = /* @__PURE__ */ new WeakMap();
  function Bn(e, t) {
    if (typeof e == "object" && e !== null) {
      var r = qm.get(e);
      return r !== void 0 ? r : (t = {
        value: e,
        source: t,
        stack: Te(t)
      }, qm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Te(t)
    };
  }
  var hi = [], mi = 0, Gs = null, pl = 0, Vn = [], $n = 0, Fa = null, ua = 1, da = "";
  function Sa(e, t) {
    hi[mi++] = pl, hi[mi++] = Gs, Gs = e, pl = t;
  }
  function Im(e, t, r) {
    Vn[$n++] = ua, Vn[$n++] = da, Vn[$n++] = Fa, Fa = e;
    var l = ua;
    e = da;
    var c = 32 - Yt(l) - 1;
    l &= ~(1 << c), r += 1;
    var f = 32 - Yt(t) + c;
    if (30 < f) {
      var b = c - c % 5;
      f = (l & (1 << b) - 1).toString(32), l >>= b, c -= b, ua = 1 << 32 - Yt(t) + c | r << c | l, da = f + e;
    } else
      ua = 1 << f | r << c | l, da = e;
  }
  function hu(e) {
    e.return !== null && (Sa(e, 1), Im(e, 1, 0));
  }
  function mu(e) {
    for (; e === Gs; )
      Gs = hi[--mi], hi[mi] = null, pl = hi[--mi], hi[mi] = null;
    for (; e === Fa; )
      Fa = Vn[--$n], Vn[$n] = null, da = Vn[--$n], Vn[$n] = null, ua = Vn[--$n], Vn[$n] = null;
  }
  function Fm(e, t) {
    Vn[$n++] = ua, Vn[$n++] = da, Vn[$n++] = Fa, ua = t.id, da = t.overflow, Fa = e;
  }
  var tn = null, vt = null, Pe = !1, Ya = null, Hn = !1, pu = Error(s(519));
  function Ga(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw gl(Bn(t, e)), pu;
  }
  function Ym(e) {
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
        Ye("invalid", t), rm(
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
        Ye("invalid", t), lm(t, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || t.textContent === "" + r || l.suppressHydrationWarning === !0 || ov(t.textContent, r) ? (l.popover != null && (Ye("beforetoggle", t), Ye("toggle", t)), l.onScroll != null && Ye("scroll", t), l.onScrollEnd != null && Ye("scrollend", t), l.onClick != null && (t.onclick = ya), t = !0) : t = !1, t || Ga(e, !0);
  }
  function Gm(e) {
    for (tn = e.return; tn; )
      switch (tn.tag) {
        case 5:
        case 31:
        case 13:
          Hn = !1;
          return;
        case 27:
        case 3:
          Hn = !0;
          return;
        default:
          tn = tn.return;
      }
  }
  function pi(e) {
    if (e !== tn) return !1;
    if (!Pe) return Gm(e), Pe = !0, !1;
    var t = e.tag, r;
    if ((r = t !== 3 && t !== 27) && ((r = t === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || zd(e.type, e.memoizedProps)), r = !r), r && vt && Ga(e), Gm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      vt = vv(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      vt = vv(e);
    } else
      t === 27 ? (t = vt, lr(e.type) ? (e = Bd, Bd = null, vt = e) : vt = t) : vt = tn ? In(e.stateNode.nextSibling) : null;
    return !0;
  }
  function zr() {
    vt = tn = null, Pe = !1;
  }
  function gu() {
    var e = Ya;
    return e !== null && (yn === null ? yn = e : yn.push.apply(
      yn,
      e
    ), Ya = null), e;
  }
  function gl(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var vu = M(null), Or = null, wa = null;
  function Xa(e, t, r) {
    Z(vu, t._currentValue), t._currentValue = r;
  }
  function Ea(e) {
    e._currentValue = vu.current, J(vu);
  }
  function yu(e, t, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === r) break;
      e = e.return;
    }
  }
  function bu(e, t, r, l) {
    var c = e.child;
    for (c !== null && (c.return = e); c !== null; ) {
      var f = c.dependencies;
      if (f !== null) {
        var b = c.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var j = f;
          f = c;
          for (var L = 0; L < t.length; L++)
            if (j.context === t[L]) {
              f.lanes |= r, j = f.alternate, j !== null && (j.lanes |= r), yu(
                f.return,
                r,
                e
              ), l || (b = null);
              break e;
            }
          f = j.next;
        }
      } else if (c.tag === 18) {
        if (b = c.return, b === null) throw Error(s(341));
        b.lanes |= r, f = b.alternate, f !== null && (f.lanes |= r), yu(b, r, e), b = null;
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
  function gi(e, t, r, l) {
    e = null;
    for (var c = t, f = !1; c !== null; ) {
      if (!f) {
        if ((c.flags & 524288) !== 0) f = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var b = c.alternate;
        if (b === null) throw Error(s(387));
        if (b = b.memoizedProps, b !== null) {
          var j = c.type;
          En(c.pendingProps.value, b.value) || (e !== null ? e.push(j) : e = [j]);
        }
      } else if (c === _e.current) {
        if (b = c.alternate, b === null) throw Error(s(387));
        b.memoizedState.memoizedState !== c.memoizedState.memoizedState && (e !== null ? e.push(Il) : e = [Il]);
      }
      c = c.return;
    }
    e !== null && bu(
      t,
      e,
      r,
      l
    ), t.flags |= 262144;
  }
  function Xs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!En(
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
  function nn(e) {
    return Xm(Or, e);
  }
  function Ps(e, t) {
    return Or === null && kr(e), Xm(e, t);
  }
  function Xm(e, t) {
    var r = t._currentValue;
    if (t = { context: t, memoizedValue: r, next: null }, wa === null) {
      if (e === null) throw Error(s(308));
      wa = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else wa = wa.next = t;
    return r;
  }
  var ow = typeof AbortController < "u" ? AbortController : function() {
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
  }, cw = n.unstable_scheduleCallback, uw = n.unstable_NormalPriority, kt = {
    $$typeof: R,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function xu() {
    return {
      controller: new ow(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function vl(e) {
    e.refCount--, e.refCount === 0 && cw(uw, function() {
      e.controller.abort();
    });
  }
  var yl = null, Su = 0, vi = 0, yi = null;
  function dw(e, t) {
    if (yl === null) {
      var r = yl = [];
      Su = 0, vi = jd(), yi = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return Su++, t.then(Pm, Pm), t;
  }
  function Pm() {
    if (--Su === 0 && yl !== null) {
      yi !== null && (yi.status = "fulfilled");
      var e = yl;
      yl = null, vi = 0, yi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function fw(e, t) {
    var r = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(c) {
        r.push(c);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var c = 0; c < r.length; c++) (0, r[c])(t);
      },
      function(c) {
        for (l.status = "rejected", l.reason = c, c = 0; c < r.length; c++)
          (0, r[c])(void 0);
      }
    ), l;
  }
  var Km = O.S;
  O.S = function(e, t) {
    Dg = qt(), typeof t == "object" && t !== null && typeof t.then == "function" && dw(e, t), Km !== null && Km(e, t);
  };
  var Lr = M(null);
  function wu() {
    var e = Lr.current;
    return e !== null ? e : dt.pooledCache;
  }
  function Ks(e, t) {
    t === null ? Z(Lr, Lr.current) : Z(Lr, t.pool);
  }
  function Qm() {
    var e = wu();
    return e === null ? null : { parent: kt._currentValue, pool: e };
  }
  var bi = Error(s(460)), Eu = Error(s(474)), Qs = Error(s(542)), Zs = { then: function() {
  } };
  function Zm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Jm(e, t, r) {
    switch (r = e[r], r === void 0 ? e.push(t) : r !== t && (t.then(ya, ya), t = r), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, ep(e), e;
      default:
        if (typeof t.status == "string") t.then(ya, ya);
        else {
          if (e = dt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(s(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var c = t;
                c.status = "fulfilled", c.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var c = t;
                c.status = "rejected", c.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, ep(e), e;
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
  function Wm() {
    if (Br === null) throw Error(s(459));
    var e = Br;
    return Br = null, e;
  }
  function ep(e) {
    if (e === bi || e === Qs)
      throw Error(s(483));
  }
  var xi = null, bl = 0;
  function Js(e) {
    var t = bl;
    return bl += 1, xi === null && (xi = []), Jm(xi, e, t);
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
  function tp(e) {
    function t(H, B) {
      if (e) {
        var Y = H.deletions;
        Y === null ? (H.deletions = [B], H.flags |= 16) : Y.push(B);
      }
    }
    function r(H, B) {
      if (!e) return null;
      for (; B !== null; )
        t(H, B), B = B.sibling;
      return null;
    }
    function l(H) {
      for (var B = /* @__PURE__ */ new Map(); H !== null; )
        H.key !== null ? B.set(H.key, H) : B.set(H.index, H), H = H.sibling;
      return B;
    }
    function c(H, B) {
      return H = xa(H, B), H.index = 0, H.sibling = null, H;
    }
    function f(H, B, Y) {
      return H.index = Y, e ? (Y = H.alternate, Y !== null ? (Y = Y.index, Y < B ? (H.flags |= 67108866, B) : Y) : (H.flags |= 67108866, B)) : (H.flags |= 1048576, B);
    }
    function b(H) {
      return e && H.alternate === null && (H.flags |= 67108866), H;
    }
    function j(H, B, Y, le) {
      return B === null || B.tag !== 6 ? (B = du(Y, H.mode, le), B.return = H, B) : (B = c(B, Y), B.return = H, B);
    }
    function L(H, B, Y, le) {
      var Ce = Y.type;
      return Ce === N ? ae(
        H,
        B,
        Y.props.children,
        le,
        Y.key
      ) : B !== null && (B.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === D && Ur(Ce) === B.type) ? (B = c(B, Y.props), xl(B, Y), B.return = H, B) : (B = Ys(
        Y.type,
        Y.key,
        Y.props,
        null,
        H.mode,
        le
      ), xl(B, Y), B.return = H, B);
    }
    function G(H, B, Y, le) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== Y.containerInfo || B.stateNode.implementation !== Y.implementation ? (B = fu(Y, H.mode, le), B.return = H, B) : (B = c(B, Y.children || []), B.return = H, B);
    }
    function ae(H, B, Y, le, Ce) {
      return B === null || B.tag !== 7 ? (B = Dr(
        Y,
        H.mode,
        le,
        Ce
      ), B.return = H, B) : (B = c(B, Y), B.return = H, B);
    }
    function se(H, B, Y) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = du(
          "" + B,
          H.mode,
          Y
        ), B.return = H, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case E:
            return Y = Ys(
              B.type,
              B.key,
              B.props,
              null,
              H.mode,
              Y
            ), xl(Y, B), Y.return = H, Y;
          case w:
            return B = fu(
              B,
              H.mode,
              Y
            ), B.return = H, B;
          case D:
            return B = Ur(B), se(H, B, Y);
        }
        if (Q(B) || ie(B))
          return B = Dr(
            B,
            H.mode,
            Y,
            null
          ), B.return = H, B;
        if (typeof B.then == "function")
          return se(H, Js(B), Y);
        if (B.$$typeof === R)
          return se(
            H,
            Ps(H, B),
            Y
          );
        Ws(H, B);
      }
      return null;
    }
    function P(H, B, Y, le) {
      var Ce = B !== null ? B.key : null;
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return Ce !== null ? null : j(H, B, "" + Y, le);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case E:
            return Y.key === Ce ? L(H, B, Y, le) : null;
          case w:
            return Y.key === Ce ? G(H, B, Y, le) : null;
          case D:
            return Y = Ur(Y), P(H, B, Y, le);
        }
        if (Q(Y) || ie(Y))
          return Ce !== null ? null : ae(H, B, Y, le, null);
        if (typeof Y.then == "function")
          return P(
            H,
            B,
            Js(Y),
            le
          );
        if (Y.$$typeof === R)
          return P(
            H,
            B,
            Ps(H, Y),
            le
          );
        Ws(H, Y);
      }
      return null;
    }
    function W(H, B, Y, le, Ce) {
      if (typeof le == "string" && le !== "" || typeof le == "number" || typeof le == "bigint")
        return H = H.get(Y) || null, j(B, H, "" + le, Ce);
      if (typeof le == "object" && le !== null) {
        switch (le.$$typeof) {
          case E:
            return H = H.get(
              le.key === null ? Y : le.key
            ) || null, L(B, H, le, Ce);
          case w:
            return H = H.get(
              le.key === null ? Y : le.key
            ) || null, G(B, H, le, Ce);
          case D:
            return le = Ur(le), W(
              H,
              B,
              Y,
              le,
              Ce
            );
        }
        if (Q(le) || ie(le))
          return H = H.get(Y) || null, ae(B, H, le, Ce, null);
        if (typeof le.then == "function")
          return W(
            H,
            B,
            Y,
            Js(le),
            Ce
          );
        if (le.$$typeof === R)
          return W(
            H,
            B,
            Y,
            Ps(B, le),
            Ce
          );
        Ws(B, le);
      }
      return null;
    }
    function xe(H, B, Y, le) {
      for (var Ce = null, Ze = null, je = B, Be = B = 0, Xe = null; je !== null && Be < Y.length; Be++) {
        je.index > Be ? (Xe = je, je = null) : Xe = je.sibling;
        var Je = P(
          H,
          je,
          Y[Be],
          le
        );
        if (Je === null) {
          je === null && (je = Xe);
          break;
        }
        e && je && Je.alternate === null && t(H, je), B = f(Je, B, Be), Ze === null ? Ce = Je : Ze.sibling = Je, Ze = Je, je = Xe;
      }
      if (Be === Y.length)
        return r(H, je), Pe && Sa(H, Be), Ce;
      if (je === null) {
        for (; Be < Y.length; Be++)
          je = se(H, Y[Be], le), je !== null && (B = f(
            je,
            B,
            Be
          ), Ze === null ? Ce = je : Ze.sibling = je, Ze = je);
        return Pe && Sa(H, Be), Ce;
      }
      for (je = l(je); Be < Y.length; Be++)
        Xe = W(
          je,
          H,
          Be,
          Y[Be],
          le
        ), Xe !== null && (e && Xe.alternate !== null && je.delete(
          Xe.key === null ? Be : Xe.key
        ), B = f(
          Xe,
          B,
          Be
        ), Ze === null ? Ce = Xe : Ze.sibling = Xe, Ze = Xe);
      return e && je.forEach(function(dr) {
        return t(H, dr);
      }), Pe && Sa(H, Be), Ce;
    }
    function Ae(H, B, Y, le) {
      if (Y == null) throw Error(s(151));
      for (var Ce = null, Ze = null, je = B, Be = B = 0, Xe = null, Je = Y.next(); je !== null && !Je.done; Be++, Je = Y.next()) {
        je.index > Be ? (Xe = je, je = null) : Xe = je.sibling;
        var dr = P(H, je, Je.value, le);
        if (dr === null) {
          je === null && (je = Xe);
          break;
        }
        e && je && dr.alternate === null && t(H, je), B = f(dr, B, Be), Ze === null ? Ce = dr : Ze.sibling = dr, Ze = dr, je = Xe;
      }
      if (Je.done)
        return r(H, je), Pe && Sa(H, Be), Ce;
      if (je === null) {
        for (; !Je.done; Be++, Je = Y.next())
          Je = se(H, Je.value, le), Je !== null && (B = f(Je, B, Be), Ze === null ? Ce = Je : Ze.sibling = Je, Ze = Je);
        return Pe && Sa(H, Be), Ce;
      }
      for (je = l(je); !Je.done; Be++, Je = Y.next())
        Je = W(je, H, Be, Je.value, le), Je !== null && (e && Je.alternate !== null && je.delete(Je.key === null ? Be : Je.key), B = f(Je, B, Be), Ze === null ? Ce = Je : Ze.sibling = Je, Ze = Je);
      return e && je.forEach(function(EE) {
        return t(H, EE);
      }), Pe && Sa(H, Be), Ce;
    }
    function ot(H, B, Y, le) {
      if (typeof Y == "object" && Y !== null && Y.type === N && Y.key === null && (Y = Y.props.children), typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case E:
            e: {
              for (var Ce = Y.key; B !== null; ) {
                if (B.key === Ce) {
                  if (Ce = Y.type, Ce === N) {
                    if (B.tag === 7) {
                      r(
                        H,
                        B.sibling
                      ), le = c(
                        B,
                        Y.props.children
                      ), le.return = H, H = le;
                      break e;
                    }
                  } else if (B.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === D && Ur(Ce) === B.type) {
                    r(
                      H,
                      B.sibling
                    ), le = c(B, Y.props), xl(le, Y), le.return = H, H = le;
                    break e;
                  }
                  r(H, B);
                  break;
                } else t(H, B);
                B = B.sibling;
              }
              Y.type === N ? (le = Dr(
                Y.props.children,
                H.mode,
                le,
                Y.key
              ), le.return = H, H = le) : (le = Ys(
                Y.type,
                Y.key,
                Y.props,
                null,
                H.mode,
                le
              ), xl(le, Y), le.return = H, H = le);
            }
            return b(H);
          case w:
            e: {
              for (Ce = Y.key; B !== null; ) {
                if (B.key === Ce)
                  if (B.tag === 4 && B.stateNode.containerInfo === Y.containerInfo && B.stateNode.implementation === Y.implementation) {
                    r(
                      H,
                      B.sibling
                    ), le = c(B, Y.children || []), le.return = H, H = le;
                    break e;
                  } else {
                    r(H, B);
                    break;
                  }
                else t(H, B);
                B = B.sibling;
              }
              le = fu(Y, H.mode, le), le.return = H, H = le;
            }
            return b(H);
          case D:
            return Y = Ur(Y), ot(
              H,
              B,
              Y,
              le
            );
        }
        if (Q(Y))
          return xe(
            H,
            B,
            Y,
            le
          );
        if (ie(Y)) {
          if (Ce = ie(Y), typeof Ce != "function") throw Error(s(150));
          return Y = Ce.call(Y), Ae(
            H,
            B,
            Y,
            le
          );
        }
        if (typeof Y.then == "function")
          return ot(
            H,
            B,
            Js(Y),
            le
          );
        if (Y.$$typeof === R)
          return ot(
            H,
            B,
            Ps(H, Y),
            le
          );
        Ws(H, Y);
      }
      return typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint" ? (Y = "" + Y, B !== null && B.tag === 6 ? (r(H, B.sibling), le = c(B, Y), le.return = H, H = le) : (r(H, B), le = du(Y, H.mode, le), le.return = H, H = le), b(H)) : r(H, B);
    }
    return function(H, B, Y, le) {
      try {
        bl = 0;
        var Ce = ot(
          H,
          B,
          Y,
          le
        );
        return xi = null, Ce;
      } catch (je) {
        if (je === bi || je === Qs) throw je;
        var Ze = jn(29, je, null, H.mode);
        return Ze.lanes = le, Ze.return = H, Ze;
      } finally {
      }
    };
  }
  var Vr = tp(!0), np = tp(!1), Pa = !1;
  function ju(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Nu(e, t) {
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
  function Qa(e, t, r) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (et & 2) !== 0) {
      var c = l.pending;
      return c === null ? t.next = t : (t.next = c.next, c.next = t), l.pending = t, t = Fs(e), Vm(e, null, r), t;
    }
    return Is(e, l, t, r), Fs(e);
  }
  function Sl(e, t, r) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, r |= l, t.lanes = r, ln(e, r);
    }
  }
  function Tu(e, t) {
    var r = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, r === l)) {
      var c = null, f = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var b = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          };
          f === null ? c = f = b : f = f.next = b, r = r.next;
        } while (r !== null);
        f === null ? c = f = t : f = f.next = t;
      } else c = f = t;
      r = {
        baseState: l.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: f,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
  }
  var Cu = !1;
  function wl() {
    if (Cu) {
      var e = yi;
      if (e !== null) throw e;
    }
  }
  function El(e, t, r, l) {
    Cu = !1;
    var c = e.updateQueue;
    Pa = !1;
    var f = c.firstBaseUpdate, b = c.lastBaseUpdate, j = c.shared.pending;
    if (j !== null) {
      c.shared.pending = null;
      var L = j, G = L.next;
      L.next = null, b === null ? f = G : b.next = G, b = L;
      var ae = e.alternate;
      ae !== null && (ae = ae.updateQueue, j = ae.lastBaseUpdate, j !== b && (j === null ? ae.firstBaseUpdate = G : j.next = G, ae.lastBaseUpdate = L));
    }
    if (f !== null) {
      var se = c.baseState;
      b = 0, ae = G = L = null, j = f;
      do {
        var P = j.lane & -536870913, W = P !== j.lane;
        if (W ? (Ge & P) === P : (l & P) === P) {
          P !== 0 && P === vi && (Cu = !0), ae !== null && (ae = ae.next = {
            lane: 0,
            tag: j.tag,
            payload: j.payload,
            callback: null,
            next: null
          });
          e: {
            var xe = e, Ae = j;
            P = t;
            var ot = r;
            switch (Ae.tag) {
              case 1:
                if (xe = Ae.payload, typeof xe == "function") {
                  se = xe.call(ot, se, P);
                  break e;
                }
                se = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = Ae.payload, P = typeof xe == "function" ? xe.call(ot, se, P) : xe, P == null) break e;
                se = g({}, se, P);
                break e;
              case 2:
                Pa = !0;
            }
          }
          P = j.callback, P !== null && (e.flags |= 64, W && (e.flags |= 8192), W = c.callbacks, W === null ? c.callbacks = [P] : W.push(P));
        } else
          W = {
            lane: P,
            tag: j.tag,
            payload: j.payload,
            callback: j.callback,
            next: null
          }, ae === null ? (G = ae = W, L = se) : ae = ae.next = W, b |= P;
        if (j = j.next, j === null) {
          if (j = c.shared.pending, j === null)
            break;
          W = j, j = W.next, W.next = null, c.lastBaseUpdate = W, c.shared.pending = null;
        }
      } while (!0);
      ae === null && (L = se), c.baseState = L, c.firstBaseUpdate = G, c.lastBaseUpdate = ae, f === null && (c.shared.lanes = 0), tr |= b, e.lanes = b, e.memoizedState = se;
    }
  }
  function ap(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function rp(e, t) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        ap(r[e], t);
  }
  var Si = M(null), eo = M(0);
  function ip(e, t) {
    e = Da, Z(eo, e), Z(Si, t), Da = e | t.baseLanes;
  }
  function Ru() {
    Z(eo, Da), Z(Si, Si.current);
  }
  function Mu() {
    Da = eo.current, J(Si), J(eo);
  }
  var Nn = M(null), qn = null;
  function Za(e) {
    var t = e.alternate;
    Z(Rt, Rt.current & 1), Z(Nn, e), qn === null && (t === null || Si.current !== null || t.memoizedState !== null) && (qn = e);
  }
  function Au(e) {
    Z(Rt, Rt.current), Z(Nn, e), qn === null && (qn = e);
  }
  function lp(e) {
    e.tag === 22 ? (Z(Rt, Rt.current), Z(Nn, e), qn === null && (qn = e)) : Ja();
  }
  function Ja() {
    Z(Rt, Rt.current), Z(Nn, Nn.current);
  }
  function Tn(e) {
    J(Nn), qn === e && (qn = null), J(Rt);
  }
  var Rt = M(0);
  function to(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var r = t.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Ld(r) || Ud(r)))
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
  var ja = 0, Ue = null, lt = null, Lt = null, no = !1, wi = !1, $r = !1, ao = 0, jl = 0, Ei = null, hw = 0;
  function jt() {
    throw Error(s(321));
  }
  function _u(e, t) {
    if (t === null) return !1;
    for (var r = 0; r < t.length && r < e.length; r++)
      if (!En(e[r], t[r])) return !1;
    return !0;
  }
  function Du(e, t, r, l, c, f) {
    return ja = f, Ue = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? Ip : Xu, $r = !1, f = r(l, c), $r = !1, wi && (f = op(
      t,
      r,
      l,
      c
    )), sp(e), f;
  }
  function sp(e) {
    O.H = Cl;
    var t = lt !== null && lt.next !== null;
    if (ja = 0, Lt = lt = Ue = null, no = !1, jl = 0, Ei = null, t) throw Error(s(300));
    e === null || Ut || (e = e.dependencies, e !== null && Xs(e) && (Ut = !0));
  }
  function op(e, t, r, l) {
    Ue = e;
    var c = 0;
    do {
      if (wi && (Ei = null), jl = 0, wi = !1, 25 <= c) throw Error(s(301));
      if (c += 1, Lt = lt = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      O.H = Fp, f = t(r, l);
    } while (wi);
    return f;
  }
  function mw() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Nl(t) : t, e = e.useState()[0], (lt !== null ? lt.memoizedState : null) !== e && (Ue.flags |= 1024), t;
  }
  function zu() {
    var e = ao !== 0;
    return ao = 0, e;
  }
  function Ou(e, t, r) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~r;
  }
  function ku(e) {
    if (no) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      no = !1;
    }
    ja = 0, Lt = lt = Ue = null, wi = !1, jl = ao = 0, Ei = null;
  }
  function fn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Lt === null ? Ue.memoizedState = Lt = e : Lt = Lt.next = e, Lt;
  }
  function Mt() {
    if (lt === null) {
      var e = Ue.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = lt.next;
    var t = Lt === null ? Ue.memoizedState : Lt.next;
    if (t !== null)
      Lt = t, lt = e;
    else {
      if (e === null)
        throw Ue.alternate === null ? Error(s(467)) : Error(s(310));
      lt = e, e = {
        memoizedState: lt.memoizedState,
        baseState: lt.baseState,
        baseQueue: lt.baseQueue,
        queue: lt.queue,
        next: null
      }, Lt === null ? Ue.memoizedState = Lt = e : Lt = Lt.next = e;
    }
    return Lt;
  }
  function ro() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Nl(e) {
    var t = jl;
    return jl += 1, Ei === null && (Ei = []), e = Jm(Ei, e, t), t = Ue, (Lt === null ? t.memoizedState : Lt.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? Ip : Xu), e;
  }
  function io(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Nl(e);
      if (e.$$typeof === R) return nn(e);
    }
    throw Error(s(438, String(e)));
  }
  function Lu(e) {
    var t = null, r = Ue.updateQueue;
    if (r !== null && (t = r.memoCache), t == null) {
      var l = Ue.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(c) {
          return c.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), r === null && (r = ro(), Ue.updateQueue = r), r.memoCache = t, r = t.data[t.index], r === void 0)
      for (r = t.data[t.index] = Array(e), l = 0; l < e; l++)
        r[l] = F;
    return t.index++, r;
  }
  function Na(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function lo(e) {
    var t = Mt();
    return Uu(t, lt, e);
  }
  function Uu(e, t, r) {
    var l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = r;
    var c = e.baseQueue, f = l.pending;
    if (f !== null) {
      if (c !== null) {
        var b = c.next;
        c.next = f.next, f.next = b;
      }
      t.baseQueue = c = f, l.pending = null;
    }
    if (f = e.baseState, c === null) e.memoizedState = f;
    else {
      t = c.next;
      var j = b = null, L = null, G = t, ae = !1;
      do {
        var se = G.lane & -536870913;
        if (se !== G.lane ? (Ge & se) === se : (ja & se) === se) {
          var P = G.revertLane;
          if (P === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: G.action,
              hasEagerState: G.hasEagerState,
              eagerState: G.eagerState,
              next: null
            }), se === vi && (ae = !0);
          else if ((ja & P) === P) {
            G = G.next, P === vi && (ae = !0);
            continue;
          } else
            se = {
              lane: 0,
              revertLane: G.revertLane,
              gesture: null,
              action: G.action,
              hasEagerState: G.hasEagerState,
              eagerState: G.eagerState,
              next: null
            }, L === null ? (j = L = se, b = f) : L = L.next = se, Ue.lanes |= P, tr |= P;
          se = G.action, $r && r(f, se), f = G.hasEagerState ? G.eagerState : r(f, se);
        } else
          P = {
            lane: se,
            revertLane: G.revertLane,
            gesture: G.gesture,
            action: G.action,
            hasEagerState: G.hasEagerState,
            eagerState: G.eagerState,
            next: null
          }, L === null ? (j = L = P, b = f) : L = L.next = P, Ue.lanes |= se, tr |= se;
        G = G.next;
      } while (G !== null && G !== t);
      if (L === null ? b = f : L.next = j, !En(f, e.memoizedState) && (Ut = !0, ae && (r = yi, r !== null)))
        throw r;
      e.memoizedState = f, e.baseState = b, e.baseQueue = L, l.lastRenderedState = f;
    }
    return c === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Bu(e) {
    var t = Mt(), r = t.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch, c = r.pending, f = t.memoizedState;
    if (c !== null) {
      r.pending = null;
      var b = c = c.next;
      do
        f = e(f, b.action), b = b.next;
      while (b !== c);
      En(f, t.memoizedState) || (Ut = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), r.lastRenderedState = f;
    }
    return [f, l];
  }
  function cp(e, t, r) {
    var l = Ue, c = Mt(), f = Pe;
    if (f) {
      if (r === void 0) throw Error(s(407));
      r = r();
    } else r = t();
    var b = !En(
      (lt || c).memoizedState,
      r
    );
    if (b && (c.memoizedState = r, Ut = !0), c = c.queue, Hu(fp.bind(null, l, c, e), [
      e
    ]), c.getSnapshot !== t || b || Lt !== null && Lt.memoizedState.tag & 1) {
      if (l.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        dp.bind(
          null,
          l,
          c,
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
  function dp(e, t, r, l) {
    t.value = r, t.getSnapshot = l, hp(t) && mp(e);
  }
  function fp(e, t, r) {
    return r(function() {
      hp(t) && mp(e);
    });
  }
  function hp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !En(e, r);
    } catch {
      return !0;
    }
  }
  function mp(e) {
    var t = _r(e, 2);
    t !== null && bn(t, e, 2);
  }
  function Vu(e) {
    var t = fn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), $r) {
        Tt(!0);
        try {
          r();
        } finally {
          Tt(!1);
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
  function pp(e, t, r, l) {
    return e.baseState = r, Uu(
      e,
      lt,
      typeof l == "function" ? l : Na
    );
  }
  function pw(e, t, r, l, c) {
    if (co(e)) throw Error(s(485));
    if (e = t.action, e !== null) {
      var f = {
        payload: c,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(b) {
          f.listeners.push(b);
        }
      };
      O.T !== null ? r(!0) : f.isTransition = !1, l(f), r = t.pending, r === null ? (f.next = t.pending = f, gp(t, f)) : (f.next = r.next, t.pending = r.next = f);
    }
  }
  function gp(e, t) {
    var r = t.action, l = t.payload, c = e.state;
    if (t.isTransition) {
      var f = O.T, b = {};
      O.T = b;
      try {
        var j = r(c, l), L = O.S;
        L !== null && L(b, j), vp(e, t, j);
      } catch (G) {
        $u(e, t, G);
      } finally {
        f !== null && b.types !== null && (f.types = b.types), O.T = f;
      }
    } else
      try {
        f = r(c, l), vp(e, t, f);
      } catch (G) {
        $u(e, t, G);
      }
  }
  function vp(e, t, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        yp(e, t, l);
      },
      function(l) {
        return $u(e, t, l);
      }
    ) : yp(e, t, r);
  }
  function yp(e, t, r) {
    t.status = "fulfilled", t.value = r, bp(t), e.state = r, t = e.pending, t !== null && (r = t.next, r === t ? e.pending = null : (r = r.next, t.next = r, gp(e, r)));
  }
  function $u(e, t, r) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = r, bp(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function bp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function xp(e, t) {
    return t;
  }
  function Sp(e, t) {
    if (Pe) {
      var r = dt.formState;
      if (r !== null) {
        e: {
          var l = Ue;
          if (Pe) {
            if (vt) {
              t: {
                for (var c = vt, f = Hn; c.nodeType !== 8; ) {
                  if (!f) {
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
                f = c.data, c = f === "F!" || f === "F" ? c : null;
              }
              if (c) {
                vt = In(
                  c.nextSibling
                ), l = c.data === "F!";
                break e;
              }
            }
            Ga(l);
          }
          l = !1;
        }
        l && (t = r[0]);
      }
    }
    return r = fn(), r.memoizedState = r.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xp,
      lastRenderedState: t
    }, r.queue = l, r = $p.bind(
      null,
      Ue,
      l
    ), l.dispatch = r, l = Vu(!1), f = Gu.bind(
      null,
      Ue,
      !1,
      l.queue
    ), l = fn(), c = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = c, r = pw.bind(
      null,
      Ue,
      c,
      f,
      r
    ), c.dispatch = r, l.memoizedState = e, [t, r, !1];
  }
  function wp(e) {
    var t = Mt();
    return Ep(t, lt, e);
  }
  function Ep(e, t, r) {
    if (t = Uu(
      e,
      t,
      xp
    )[0], e = lo(Na)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Nl(t);
      } catch (b) {
        throw b === bi ? Qs : b;
      }
    else l = t;
    t = Mt();
    var c = t.queue, f = c.dispatch;
    return r !== t.memoizedState && (Ue.flags |= 2048, ji(
      9,
      { destroy: void 0 },
      gw.bind(null, c, r),
      null
    )), [l, f, e];
  }
  function gw(e, t) {
    e.action = t;
  }
  function jp(e) {
    var t = Mt(), r = lt;
    if (r !== null)
      return Ep(t, r, e);
    Mt(), t = t.memoizedState, r = Mt();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [t, l, !1];
  }
  function ji(e, t, r, l) {
    return e = { tag: e, create: r, deps: l, inst: t, next: null }, t = Ue.updateQueue, t === null && (t = ro(), Ue.updateQueue = t), r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, t.lastEffect = e), e;
  }
  function Np() {
    return Mt().memoizedState;
  }
  function so(e, t, r, l) {
    var c = fn();
    Ue.flags |= e, c.memoizedState = ji(
      1 | t,
      { destroy: void 0 },
      r,
      l === void 0 ? null : l
    );
  }
  function oo(e, t, r, l) {
    var c = Mt();
    l = l === void 0 ? null : l;
    var f = c.memoizedState.inst;
    lt !== null && l !== null && _u(l, lt.memoizedState.deps) ? c.memoizedState = ji(t, f, r, l) : (Ue.flags |= e, c.memoizedState = ji(
      1 | t,
      f,
      r,
      l
    ));
  }
  function Tp(e, t) {
    so(8390656, 8, e, t);
  }
  function Hu(e, t) {
    oo(2048, 8, e, t);
  }
  function vw(e) {
    Ue.flags |= 4;
    var t = Ue.updateQueue;
    if (t === null)
      t = ro(), Ue.updateQueue = t, t.events = [e];
    else {
      var r = t.events;
      r === null ? t.events = [e] : r.push(e);
    }
  }
  function Cp(e) {
    var t = Mt().memoizedState;
    return vw({ ref: t, nextImpl: e }), function() {
      if ((et & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Rp(e, t) {
    return oo(4, 2, e, t);
  }
  function Mp(e, t) {
    return oo(4, 4, e, t);
  }
  function Ap(e, t) {
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
  function _p(e, t, r) {
    r = r != null ? r.concat([e]) : null, oo(4, 4, Ap.bind(null, t, e), r);
  }
  function qu() {
  }
  function Dp(e, t) {
    var r = Mt();
    t = t === void 0 ? null : t;
    var l = r.memoizedState;
    return t !== null && _u(t, l[1]) ? l[0] : (r.memoizedState = [e, t], e);
  }
  function zp(e, t) {
    var r = Mt();
    t = t === void 0 ? null : t;
    var l = r.memoizedState;
    if (t !== null && _u(t, l[1]))
      return l[0];
    if (l = e(), $r) {
      Tt(!0);
      try {
        e();
      } finally {
        Tt(!1);
      }
    }
    return r.memoizedState = [l, t], l;
  }
  function Iu(e, t, r) {
    return r === void 0 || (ja & 1073741824) !== 0 && (Ge & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = r, e = Og(), Ue.lanes |= e, tr |= e, r);
  }
  function Op(e, t, r, l) {
    return En(r, t) ? r : Si.current !== null ? (e = Iu(e, r, l), En(e, t) || (Ut = !0), e) : (ja & 42) === 0 || (ja & 1073741824) !== 0 && (Ge & 261930) === 0 ? (Ut = !0, e.memoizedState = r) : (e = Og(), Ue.lanes |= e, tr |= e, t);
  }
  function kp(e, t, r, l, c) {
    var f = A.p;
    A.p = f !== 0 && 8 > f ? f : 8;
    var b = O.T, j = {};
    O.T = j, Gu(e, !1, t, r);
    try {
      var L = c(), G = O.S;
      if (G !== null && G(j, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ae = fw(
          L,
          l
        );
        Tl(
          e,
          t,
          ae,
          Mn(e)
        );
      } else
        Tl(
          e,
          t,
          l,
          Mn(e)
        );
    } catch (se) {
      Tl(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: se },
        Mn()
      );
    } finally {
      A.p = f, b !== null && j.types !== null && (b.types = j.types), O.T = b;
    }
  }
  function yw() {
  }
  function Fu(e, t, r, l) {
    if (e.tag !== 5) throw Error(s(476));
    var c = Lp(e).queue;
    kp(
      e,
      c,
      t,
      V,
      r === null ? yw : function() {
        return Up(e), r(l);
      }
    );
  }
  function Lp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: V,
      baseState: V,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Na,
        lastRenderedState: V
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
  function Up(e) {
    var t = Lp(e);
    t.next === null && (t = e.alternate.memoizedState), Tl(
      e,
      t.next.queue,
      {},
      Mn()
    );
  }
  function Yu() {
    return nn(Il);
  }
  function Bp() {
    return Mt().memoizedState;
  }
  function Vp() {
    return Mt().memoizedState;
  }
  function bw(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var r = Mn();
          e = Ka(r);
          var l = Qa(t, e, r);
          l !== null && (bn(l, t, r), Sl(l, t, r)), t = { cache: xu() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function xw(e, t, r) {
    var l = Mn();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, co(e) ? Hp(t, r) : (r = cu(e, t, r, l), r !== null && (bn(r, e, l), qp(r, t, l)));
  }
  function $p(e, t, r) {
    var l = Mn();
    Tl(e, t, r, l);
  }
  function Tl(e, t, r, l) {
    var c = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (co(e)) Hp(t, c);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null))
        try {
          var b = t.lastRenderedState, j = f(b, r);
          if (c.hasEagerState = !0, c.eagerState = j, En(j, b))
            return Is(e, t, c, 0), dt === null && qs(), !1;
        } catch {
        } finally {
        }
      if (r = cu(e, t, c, l), r !== null)
        return bn(r, e, l), qp(r, t, l), !0;
    }
    return !1;
  }
  function Gu(e, t, r, l) {
    if (l = {
      lane: 2,
      revertLane: jd(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, co(e)) {
      if (t) throw Error(s(479));
    } else
      t = cu(
        e,
        r,
        l,
        2
      ), t !== null && bn(t, e, 2);
  }
  function co(e) {
    var t = e.alternate;
    return e === Ue || t !== null && t === Ue;
  }
  function Hp(e, t) {
    wi = no = !0;
    var r = e.pending;
    r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
  }
  function qp(e, t, r) {
    if ((r & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, r |= l, t.lanes = r, ln(e, r);
    }
  }
  var Cl = {
    readContext: nn,
    use: io,
    useCallback: jt,
    useContext: jt,
    useEffect: jt,
    useImperativeHandle: jt,
    useLayoutEffect: jt,
    useInsertionEffect: jt,
    useMemo: jt,
    useReducer: jt,
    useRef: jt,
    useState: jt,
    useDebugValue: jt,
    useDeferredValue: jt,
    useTransition: jt,
    useSyncExternalStore: jt,
    useId: jt,
    useHostTransitionStatus: jt,
    useFormState: jt,
    useActionState: jt,
    useOptimistic: jt,
    useMemoCache: jt,
    useCacheRefresh: jt
  };
  Cl.useEffectEvent = jt;
  var Ip = {
    readContext: nn,
    use: io,
    useCallback: function(e, t) {
      return fn().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: nn,
    useEffect: Tp,
    useImperativeHandle: function(e, t, r) {
      r = r != null ? r.concat([e]) : null, so(
        4194308,
        4,
        Ap.bind(null, t, e),
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
      var r = fn();
      t = t === void 0 ? null : t;
      var l = e();
      if ($r) {
        Tt(!0);
        try {
          e();
        } finally {
          Tt(!1);
        }
      }
      return r.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, r) {
      var l = fn();
      if (r !== void 0) {
        var c = r(t);
        if ($r) {
          Tt(!0);
          try {
            r(t);
          } finally {
            Tt(!1);
          }
        }
      } else c = t;
      return l.memoizedState = l.baseState = c, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      }, l.queue = e, e = e.dispatch = xw.bind(
        null,
        Ue,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = fn();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Vu(e);
      var t = e.queue, r = $p.bind(null, Ue, t);
      return t.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: qu,
    useDeferredValue: function(e, t) {
      var r = fn();
      return Iu(r, e, t);
    },
    useTransition: function() {
      var e = Vu(!1);
      return e = kp.bind(
        null,
        Ue,
        e.queue,
        !0,
        !1
      ), fn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, r) {
      var l = Ue, c = fn();
      if (Pe) {
        if (r === void 0)
          throw Error(s(407));
        r = r();
      } else {
        if (r = t(), dt === null)
          throw Error(s(349));
        (Ge & 127) !== 0 || up(l, t, r);
      }
      c.memoizedState = r;
      var f = { value: r, getSnapshot: t };
      return c.queue = f, Tp(fp.bind(null, l, f, e), [
        e
      ]), l.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        dp.bind(
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
      var e = fn(), t = dt.identifierPrefix;
      if (Pe) {
        var r = da, l = ua;
        r = (l & ~(1 << 32 - Yt(l) - 1)).toString(32) + r, t = "_" + t + "R_" + r, r = ao++, 0 < r && (t += "H" + r.toString(32)), t += "_";
      } else
        r = hw++, t = "_" + t + "r_" + r.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Yu,
    useFormState: Sp,
    useActionState: Sp,
    useOptimistic: function(e) {
      var t = fn();
      t.memoizedState = t.baseState = e;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = r, t = Gu.bind(
        null,
        Ue,
        !0,
        r
      ), r.dispatch = t, [e, t];
    },
    useMemoCache: Lu,
    useCacheRefresh: function() {
      return fn().memoizedState = bw.bind(
        null,
        Ue
      );
    },
    useEffectEvent: function(e) {
      var t = fn(), r = { impl: e };
      return t.memoizedState = r, function() {
        if ((et & 2) !== 0)
          throw Error(s(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, Xu = {
    readContext: nn,
    use: io,
    useCallback: Dp,
    useContext: nn,
    useEffect: Hu,
    useImperativeHandle: _p,
    useInsertionEffect: Rp,
    useLayoutEffect: Mp,
    useMemo: zp,
    useReducer: lo,
    useRef: Np,
    useState: function() {
      return lo(Na);
    },
    useDebugValue: qu,
    useDeferredValue: function(e, t) {
      var r = Mt();
      return Op(
        r,
        lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = lo(Na)[0], t = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Nl(e),
        t
      ];
    },
    useSyncExternalStore: cp,
    useId: Bp,
    useHostTransitionStatus: Yu,
    useFormState: wp,
    useActionState: wp,
    useOptimistic: function(e, t) {
      var r = Mt();
      return pp(r, lt, e, t);
    },
    useMemoCache: Lu,
    useCacheRefresh: Vp
  };
  Xu.useEffectEvent = Cp;
  var Fp = {
    readContext: nn,
    use: io,
    useCallback: Dp,
    useContext: nn,
    useEffect: Hu,
    useImperativeHandle: _p,
    useInsertionEffect: Rp,
    useLayoutEffect: Mp,
    useMemo: zp,
    useReducer: Bu,
    useRef: Np,
    useState: function() {
      return Bu(Na);
    },
    useDebugValue: qu,
    useDeferredValue: function(e, t) {
      var r = Mt();
      return lt === null ? Iu(r, e, t) : Op(
        r,
        lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Bu(Na)[0], t = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Nl(e),
        t
      ];
    },
    useSyncExternalStore: cp,
    useId: Bp,
    useHostTransitionStatus: Yu,
    useFormState: jp,
    useActionState: jp,
    useOptimistic: function(e, t) {
      var r = Mt();
      return lt !== null ? pp(r, lt, e, t) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Lu,
    useCacheRefresh: Vp
  };
  Fp.useEffectEvent = Cp;
  function Pu(e, t, r, l) {
    t = e.memoizedState, r = r(l, t), r = r == null ? t : g({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var Ku = {
    enqueueSetState: function(e, t, r) {
      e = e._reactInternals;
      var l = Mn(), c = Ka(l);
      c.payload = t, r != null && (c.callback = r), t = Qa(e, c, l), t !== null && (bn(t, e, l), Sl(t, e, l));
    },
    enqueueReplaceState: function(e, t, r) {
      e = e._reactInternals;
      var l = Mn(), c = Ka(l);
      c.tag = 1, c.payload = t, r != null && (c.callback = r), t = Qa(e, c, l), t !== null && (bn(t, e, l), Sl(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var r = Mn(), l = Ka(r);
      l.tag = 2, t != null && (l.callback = t), t = Qa(e, l, r), t !== null && (bn(t, e, r), Sl(t, e, r));
    }
  };
  function Yp(e, t, r, l, c, f, b) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, f, b) : t.prototype && t.prototype.isPureReactComponent ? !hl(r, l) || !hl(c, f) : !0;
  }
  function Gp(e, t, r, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, l), t.state !== e && Ku.enqueueReplaceState(t, t.state, null);
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
      for (var c in e)
        r[c] === void 0 && (r[c] = e[c]);
    }
    return r;
  }
  function Xp(e) {
    Hs(e);
  }
  function Pp(e) {
    console.error(e);
  }
  function Kp(e) {
    Hs(e);
  }
  function uo(e, t) {
    try {
      var r = e.onUncaughtError;
      r(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Qp(e, t, r) {
    try {
      var l = e.onCaughtError;
      l(r.value, {
        componentStack: r.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function Qu(e, t, r) {
    return r = Ka(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      uo(e, t);
    }, r;
  }
  function Zp(e) {
    return e = Ka(e), e.tag = 3, e;
  }
  function Jp(e, t, r, l) {
    var c = r.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var f = l.value;
      e.payload = function() {
        return c(f);
      }, e.callback = function() {
        Qp(t, r, l);
      };
    }
    var b = r.stateNode;
    b !== null && typeof b.componentDidCatch == "function" && (e.callback = function() {
      Qp(t, r, l), typeof c != "function" && (nr === null ? nr = /* @__PURE__ */ new Set([this]) : nr.add(this));
      var j = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: j !== null ? j : ""
      });
    });
  }
  function Sw(e, t, r, l, c) {
    if (r.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = r.alternate, t !== null && gi(
        t,
        r,
        c,
        !0
      ), r = Nn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return qn === null ? Eo() : r.alternate === null && Nt === 0 && (Nt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = c, l === Zs ? r.flags |= 16384 : (t = r.updateQueue, t === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Sd(e, l, c)), !1;
          case 22:
            return r.flags |= 65536, l === Zs ? r.flags |= 16384 : (t = r.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, r.updateQueue = t) : (r = t.retryQueue, r === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : r.add(l)), Sd(e, l, c)), !1;
        }
        throw Error(s(435, r.tag));
      }
      return Sd(e, l, c), Eo(), !1;
    }
    if (Pe)
      return t = Nn.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = c, l !== pu && (e = Error(s(422), { cause: l }), gl(Bn(e, r)))) : (l !== pu && (t = Error(s(423), {
        cause: l
      }), gl(
        Bn(t, r)
      )), e = e.current.alternate, e.flags |= 65536, c &= -c, e.lanes |= c, l = Bn(l, r), c = Qu(
        e.stateNode,
        l,
        c
      ), Tu(e, c), Nt !== 4 && (Nt = 2)), !1;
    var f = Error(s(520), { cause: l });
    if (f = Bn(f, r), kl === null ? kl = [f] : kl.push(f), Nt !== 4 && (Nt = 2), t === null) return !0;
    l = Bn(l, r), r = t;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = c & -c, r.lanes |= e, e = Qu(r.stateNode, l, e), Tu(r, e), !1;
        case 1:
          if (t = r.type, f = r.stateNode, (r.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (nr === null || !nr.has(f))))
            return r.flags |= 65536, c &= -c, r.lanes |= c, c = Zp(c), Jp(
              c,
              e,
              r,
              l
            ), Tu(r, c), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var Zu = Error(s(461)), Ut = !1;
  function an(e, t, r, l) {
    t.child = e === null ? np(t, null, r, l) : Vr(
      t,
      e.child,
      r,
      l
    );
  }
  function Wp(e, t, r, l, c) {
    r = r.render;
    var f = t.ref;
    if ("ref" in l) {
      var b = {};
      for (var j in l)
        j !== "ref" && (b[j] = l[j]);
    } else b = l;
    return kr(t), l = Du(
      e,
      t,
      r,
      b,
      f,
      c
    ), j = zu(), e !== null && !Ut ? (Ou(e, t, c), Ta(e, t, c)) : (Pe && j && hu(t), t.flags |= 1, an(e, t, l, c), t.child);
  }
  function eg(e, t, r, l, c) {
    if (e === null) {
      var f = r.type;
      return typeof f == "function" && !uu(f) && f.defaultProps === void 0 && r.compare === null ? (t.tag = 15, t.type = f, tg(
        e,
        t,
        f,
        l,
        c
      )) : (e = Ys(
        r.type,
        null,
        l,
        t,
        t.mode,
        c
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (f = e.child, !id(e, c)) {
      var b = f.memoizedProps;
      if (r = r.compare, r = r !== null ? r : hl, r(b, l) && e.ref === t.ref)
        return Ta(e, t, c);
    }
    return t.flags |= 1, e = xa(f, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function tg(e, t, r, l, c) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (hl(f, l) && e.ref === t.ref)
        if (Ut = !1, t.pendingProps = l = f, id(e, c))
          (e.flags & 131072) !== 0 && (Ut = !0);
        else
          return t.lanes = e.lanes, Ta(e, t, c);
    }
    return Ju(
      e,
      t,
      r,
      l,
      c
    );
  }
  function ng(e, t, r, l) {
    var c = l.children, f = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | r : r, e !== null) {
          for (l = t.child = e.child, c = 0; l !== null; )
            c = c | l.lanes | l.childLanes, l = l.sibling;
          l = c & ~f;
        } else l = 0, t.child = null;
        return ag(
          e,
          t,
          f,
          r,
          l
        );
      }
      if ((r & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ks(
          t,
          f !== null ? f.cachePool : null
        ), f !== null ? ip(t, f) : Ru(), lp(t);
      else
        return l = t.lanes = 536870912, ag(
          e,
          t,
          f !== null ? f.baseLanes | r : r,
          r,
          l
        );
    } else
      f !== null ? (Ks(t, f.cachePool), ip(t, f), Ja(), t.memoizedState = null) : (e !== null && Ks(t, null), Ru(), Ja());
    return an(e, t, c, r), t.child;
  }
  function Rl(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function ag(e, t, r, l, c) {
    var f = wu();
    return f = f === null ? null : { parent: kt._currentValue, pool: f }, t.memoizedState = {
      baseLanes: r,
      cachePool: f
    }, e !== null && Ks(t, null), Ru(), lp(t), e !== null && gi(e, t, l, !0), t.childLanes = c, null;
  }
  function fo(e, t) {
    return t = mo(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function rg(e, t, r) {
    return Vr(t, e.child, null, r), e = fo(t, t.pendingProps), e.flags |= 2, Tn(t), t.memoizedState = null, e;
  }
  function ww(e, t, r) {
    var l = t.pendingProps, c = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Pe) {
        if (l.mode === "hidden")
          return e = fo(t, l), t.lanes = 536870912, Rl(null, e);
        if (Au(t), (e = vt) ? (e = gv(
          e,
          Hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Hm(e), r.return = t, t.child = r, tn = t, vt = null)) : e = null, e === null) throw Ga(t);
        return t.lanes = 536870912, null;
      }
      return fo(t, l);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var b = f.dehydrated;
      if (Au(t), c)
        if (t.flags & 256)
          t.flags &= -257, t = rg(
            e,
            t,
            r
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (Ut || gi(e, t, r, !1), c = (r & e.childLanes) !== 0, Ut || c) {
        if (l = dt, l !== null && (b = z(l, r), b !== 0 && b !== f.retryLane))
          throw f.retryLane = b, _r(e, b), bn(l, e, b), Zu;
        Eo(), t = rg(
          e,
          t,
          r
        );
      } else
        e = f.treeContext, vt = In(b.nextSibling), tn = t, Pe = !0, Ya = null, Hn = !1, e !== null && Fm(t, e), t = fo(t, l), t.flags |= 4096;
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
  function Ju(e, t, r, l, c) {
    return kr(t), r = Du(
      e,
      t,
      r,
      l,
      void 0,
      c
    ), l = zu(), e !== null && !Ut ? (Ou(e, t, c), Ta(e, t, c)) : (Pe && l && hu(t), t.flags |= 1, an(e, t, r, c), t.child);
  }
  function ig(e, t, r, l, c, f) {
    return kr(t), t.updateQueue = null, r = op(
      t,
      l,
      r,
      c
    ), sp(e), l = zu(), e !== null && !Ut ? (Ou(e, t, f), Ta(e, t, f)) : (Pe && l && hu(t), t.flags |= 1, an(e, t, r, f), t.child);
  }
  function lg(e, t, r, l, c) {
    if (kr(t), t.stateNode === null) {
      var f = fi, b = r.contextType;
      typeof b == "object" && b !== null && (f = nn(b)), f = new r(l, f), t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Ku, t.stateNode = f, f._reactInternals = t, f = t.stateNode, f.props = l, f.state = t.memoizedState, f.refs = {}, ju(t), b = r.contextType, f.context = typeof b == "object" && b !== null ? nn(b) : fi, f.state = t.memoizedState, b = r.getDerivedStateFromProps, typeof b == "function" && (Pu(
        t,
        r,
        b,
        l
      ), f.state = t.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (b = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), b !== f.state && Ku.enqueueReplaceState(f, f.state, null), El(t, l, f, c), wl(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      f = t.stateNode;
      var j = t.memoizedProps, L = Hr(r, j);
      f.props = L;
      var G = f.context, ae = r.contextType;
      b = fi, typeof ae == "object" && ae !== null && (b = nn(ae));
      var se = r.getDerivedStateFromProps;
      ae = typeof se == "function" || typeof f.getSnapshotBeforeUpdate == "function", j = t.pendingProps !== j, ae || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (j || G !== b) && Gp(
        t,
        f,
        l,
        b
      ), Pa = !1;
      var P = t.memoizedState;
      f.state = P, El(t, l, f, c), wl(), G = t.memoizedState, j || P !== G || Pa ? (typeof se == "function" && (Pu(
        t,
        r,
        se,
        l
      ), G = t.memoizedState), (L = Pa || Yp(
        t,
        r,
        L,
        l,
        P,
        G,
        b
      )) ? (ae || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = G), f.props = l, f.state = G, f.context = b, l = L) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      f = t.stateNode, Nu(e, t), b = t.memoizedProps, ae = Hr(r, b), f.props = ae, se = t.pendingProps, P = f.context, G = r.contextType, L = fi, typeof G == "object" && G !== null && (L = nn(G)), j = r.getDerivedStateFromProps, (G = typeof j == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (b !== se || P !== L) && Gp(
        t,
        f,
        l,
        L
      ), Pa = !1, P = t.memoizedState, f.state = P, El(t, l, f, c), wl();
      var W = t.memoizedState;
      b !== se || P !== W || Pa || e !== null && e.dependencies !== null && Xs(e.dependencies) ? (typeof j == "function" && (Pu(
        t,
        r,
        j,
        l
      ), W = t.memoizedState), (ae = Pa || Yp(
        t,
        r,
        ae,
        l,
        P,
        W,
        L
      ) || e !== null && e.dependencies !== null && Xs(e.dependencies)) ? (G || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(l, W, L), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        l,
        W,
        L
      )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || b === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = W), f.props = l, f.state = W, f.context = L, l = ae) : (typeof f.componentDidUpdate != "function" || b === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return f = l, ho(e, t), l = (t.flags & 128) !== 0, f || l ? (f = t.stateNode, r = l && typeof r.getDerivedStateFromError != "function" ? null : f.render(), t.flags |= 1, e !== null && l ? (t.child = Vr(
      t,
      e.child,
      null,
      c
    ), t.child = Vr(
      t,
      null,
      r,
      c
    )) : an(e, t, r, c), t.memoizedState = f.state, e = t.child) : e = Ta(
      e,
      t,
      c
    ), e;
  }
  function sg(e, t, r, l) {
    return zr(), t.flags |= 256, an(e, t, r, l), t.child;
  }
  var Wu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ed(e) {
    return { baseLanes: e, cachePool: Qm() };
  }
  function td(e, t, r) {
    return e = e !== null ? e.childLanes & ~r : 0, t && (e |= Rn), e;
  }
  function og(e, t, r) {
    var l = t.pendingProps, c = !1, f = (t.flags & 128) !== 0, b;
    if ((b = f) || (b = e !== null && e.memoizedState === null ? !1 : (Rt.current & 2) !== 0), b && (c = !0, t.flags &= -129), b = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Pe) {
        if (c ? Za(t) : Ja(), (e = vt) ? (e = gv(
          e,
          Hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Hm(e), r.return = t, t.child = r, tn = t, vt = null)) : e = null, e === null) throw Ga(t);
        return Ud(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var j = l.children;
      return l = l.fallback, c ? (Ja(), c = t.mode, j = mo(
        { mode: "hidden", children: j },
        c
      ), l = Dr(
        l,
        c,
        r,
        null
      ), j.return = t, l.return = t, j.sibling = l, t.child = j, l = t.child, l.memoizedState = ed(r), l.childLanes = td(
        e,
        b,
        r
      ), t.memoizedState = Wu, Rl(null, l)) : (Za(t), nd(t, j));
    }
    var L = e.memoizedState;
    if (L !== null && (j = L.dehydrated, j !== null)) {
      if (f)
        t.flags & 256 ? (Za(t), t.flags &= -257, t = ad(
          e,
          t,
          r
        )) : t.memoizedState !== null ? (Ja(), t.child = e.child, t.flags |= 128, t = null) : (Ja(), j = l.fallback, c = t.mode, l = mo(
          { mode: "visible", children: l.children },
          c
        ), j = Dr(
          j,
          c,
          r,
          null
        ), j.flags |= 2, l.return = t, j.return = t, l.sibling = j, t.child = l, Vr(
          t,
          e.child,
          null,
          r
        ), l = t.child, l.memoizedState = ed(r), l.childLanes = td(
          e,
          b,
          r
        ), t.memoizedState = Wu, t = Rl(null, l));
      else if (Za(t), Ud(j)) {
        if (b = j.nextSibling && j.nextSibling.dataset, b) var G = b.dgst;
        b = G, l = Error(s(419)), l.stack = "", l.digest = b, gl({ value: l, source: null, stack: null }), t = ad(
          e,
          t,
          r
        );
      } else if (Ut || gi(e, t, r, !1), b = (r & e.childLanes) !== 0, Ut || b) {
        if (b = dt, b !== null && (l = z(b, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, _r(e, l), bn(b, e, l), Zu;
        Ld(j) || Eo(), t = ad(
          e,
          t,
          r
        );
      } else
        Ld(j) ? (t.flags |= 192, t.child = e.child, t = null) : (e = L.treeContext, vt = In(
          j.nextSibling
        ), tn = t, Pe = !0, Ya = null, Hn = !1, e !== null && Fm(t, e), t = nd(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return c ? (Ja(), j = l.fallback, c = t.mode, L = e.child, G = L.sibling, l = xa(L, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = L.subtreeFlags & 65011712, G !== null ? j = xa(
      G,
      j
    ) : (j = Dr(
      j,
      c,
      r,
      null
    ), j.flags |= 2), j.return = t, l.return = t, l.sibling = j, t.child = l, Rl(null, l), l = t.child, j = e.child.memoizedState, j === null ? j = ed(r) : (c = j.cachePool, c !== null ? (L = kt._currentValue, c = c.parent !== L ? { parent: L, pool: L } : c) : c = Qm(), j = {
      baseLanes: j.baseLanes | r,
      cachePool: c
    }), l.memoizedState = j, l.childLanes = td(
      e,
      b,
      r
    ), t.memoizedState = Wu, Rl(e.child, l)) : (Za(t), r = e.child, e = r.sibling, r = xa(r, {
      mode: "visible",
      children: l.children
    }), r.return = t, r.sibling = null, e !== null && (b = t.deletions, b === null ? (t.deletions = [e], t.flags |= 16) : b.push(e)), t.child = r, t.memoizedState = null, r);
  }
  function nd(e, t) {
    return t = mo(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function mo(e, t) {
    return e = jn(22, e, null, t), e.lanes = 0, e;
  }
  function ad(e, t, r) {
    return Vr(t, e.child, null, r), e = nd(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function cg(e, t, r) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), yu(e.return, t, r);
  }
  function rd(e, t, r, l, c, f) {
    var b = e.memoizedState;
    b === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: r,
      tailMode: c,
      treeForkCount: f
    } : (b.isBackwards = t, b.rendering = null, b.renderingStartTime = 0, b.last = l, b.tail = r, b.tailMode = c, b.treeForkCount = f);
  }
  function ug(e, t, r) {
    var l = t.pendingProps, c = l.revealOrder, f = l.tail;
    l = l.children;
    var b = Rt.current, j = (b & 2) !== 0;
    if (j ? (b = b & 1 | 2, t.flags |= 128) : b &= 1, Z(Rt, b), an(e, t, l, r), l = Pe ? pl : 0, !j && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && cg(e, r, t);
        else if (e.tag === 19)
          cg(e, r, t);
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
    switch (c) {
      case "forwards":
        for (r = t.child, c = null; r !== null; )
          e = r.alternate, e !== null && to(e) === null && (c = r), r = r.sibling;
        r = c, r === null ? (c = t.child, t.child = null) : (c = r.sibling, r.sibling = null), rd(
          t,
          !1,
          c,
          r,
          f,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, c = t.child, t.child = null; c !== null; ) {
          if (e = c.alternate, e !== null && to(e) === null) {
            t.child = c;
            break;
          }
          e = c.sibling, c.sibling = r, r = c, c = e;
        }
        rd(
          t,
          !0,
          r,
          null,
          f,
          l
        );
        break;
      case "together":
        rd(
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
    if (e !== null && (t.dependencies = e.dependencies), tr |= t.lanes, (r & t.childLanes) === 0)
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
  function id(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Xs(e)));
  }
  function Ew(e, t, r) {
    switch (t.tag) {
      case 3:
        Me(t, t.stateNode.containerInfo), Xa(t, kt, e.memoizedState.cache), zr();
        break;
      case 27:
      case 5:
        Jt(t);
        break;
      case 4:
        Me(t, t.stateNode.containerInfo);
        break;
      case 10:
        Xa(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Au(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Za(t), t.flags |= 128, null) : (r & t.child.childLanes) !== 0 ? og(e, t, r) : (Za(t), e = Ta(
            e,
            t,
            r
          ), e !== null ? e.sibling : null);
        Za(t);
        break;
      case 19:
        var c = (e.flags & 128) !== 0;
        if (l = (r & t.childLanes) !== 0, l || (gi(
          e,
          t,
          r,
          !1
        ), l = (r & t.childLanes) !== 0), c) {
          if (l)
            return ug(
              e,
              t,
              r
            );
          t.flags |= 128;
        }
        if (c = t.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), Z(Rt, Rt.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, ng(
          e,
          t,
          r,
          t.pendingProps
        );
      case 24:
        Xa(t, kt, e.memoizedState.cache);
    }
    return Ta(e, t, r);
  }
  function dg(e, t, r) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ut = !0;
      else {
        if (!id(e, r) && (t.flags & 128) === 0)
          return Ut = !1, Ew(
            e,
            t,
            r
          );
        Ut = (e.flags & 131072) !== 0;
      }
    else
      Ut = !1, Pe && (t.flags & 1048576) !== 0 && Im(t, pl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Ur(t.elementType), t.type = e, typeof e == "function")
            uu(e) ? (l = Hr(e, l), t.tag = 1, t = lg(
              null,
              t,
              e,
              l,
              r
            )) : (t.tag = 0, t = Ju(
              null,
              t,
              e,
              l,
              r
            ));
          else {
            if (e != null) {
              var c = e.$$typeof;
              if (c === _) {
                t.tag = 11, t = Wp(
                  null,
                  t,
                  e,
                  l,
                  r
                );
                break e;
              } else if (c === te) {
                t.tag = 14, t = eg(
                  null,
                  t,
                  e,
                  l,
                  r
                );
                break e;
              }
            }
            throw t = ne(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Ju(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 1:
        return l = t.type, c = Hr(
          l,
          t.pendingProps
        ), lg(
          e,
          t,
          l,
          c,
          r
        );
      case 3:
        e: {
          if (Me(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = t.pendingProps;
          var f = t.memoizedState;
          c = f.element, Nu(e, t), El(t, l, null, r);
          var b = t.memoizedState;
          if (l = b.cache, Xa(t, kt, l), l !== f.cache && bu(
            t,
            [kt],
            r,
            !0
          ), wl(), l = b.element, f.isDehydrated)
            if (f = {
              element: l,
              isDehydrated: !1,
              cache: b.cache
            }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
              t = sg(
                e,
                t,
                l,
                r
              );
              break e;
            } else if (l !== c) {
              c = Bn(
                Error(s(424)),
                t
              ), gl(c), t = sg(
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
              for (vt = In(e.firstChild), tn = t, Pe = !0, Ya = null, Hn = !0, r = np(
                t,
                null,
                l,
                r
              ), t.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (zr(), l === c) {
              t = Ta(
                e,
                t,
                r
              );
              break e;
            }
            an(e, t, l, r);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ho(e, t), e === null ? (r = wv(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = r : Pe || (r = t.type, e = t.pendingProps, l = Ao(
          ve.current
        ).createElement(r), l[pe] = t, l[ge] = e, rn(l, r, e), mt(l), t.stateNode = l) : t.memoizedState = wv(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Jt(t), e === null && Pe && (l = t.stateNode = bv(
          t.type,
          t.pendingProps,
          ve.current
        ), tn = t, Hn = !0, c = vt, lr(t.type) ? (Bd = c, vt = In(l.firstChild)) : vt = c), an(
          e,
          t,
          t.pendingProps.children,
          r
        ), ho(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Pe && ((c = l = vt) && (l = Ww(
          l,
          t.type,
          t.pendingProps,
          Hn
        ), l !== null ? (t.stateNode = l, tn = t, vt = In(l.firstChild), Hn = !1, c = !0) : c = !1), c || Ga(t)), Jt(t), c = t.type, f = t.pendingProps, b = e !== null ? e.memoizedProps : null, l = f.children, zd(c, f) ? l = null : b !== null && zd(c, b) && (t.flags |= 32), t.memoizedState !== null && (c = Du(
          e,
          t,
          mw,
          null,
          null,
          r
        ), Il._currentValue = c), ho(e, t), an(e, t, l, r), t.child;
      case 6:
        return e === null && Pe && ((e = r = vt) && (r = eE(
          r,
          t.pendingProps,
          Hn
        ), r !== null ? (t.stateNode = r, tn = t, vt = null, e = !0) : e = !1), e || Ga(t)), null;
      case 13:
        return og(e, t, r);
      case 4:
        return Me(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Vr(
          t,
          null,
          l,
          r
        ) : an(e, t, l, r), t.child;
      case 11:
        return Wp(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 7:
        return an(
          e,
          t,
          t.pendingProps,
          r
        ), t.child;
      case 8:
        return an(
          e,
          t,
          t.pendingProps.children,
          r
        ), t.child;
      case 12:
        return an(
          e,
          t,
          t.pendingProps.children,
          r
        ), t.child;
      case 10:
        return l = t.pendingProps, Xa(t, t.type, l.value), an(e, t, l.children, r), t.child;
      case 9:
        return c = t.type._context, l = t.pendingProps.children, kr(t), c = nn(c), l = l(c), t.flags |= 1, an(e, t, l, r), t.child;
      case 14:
        return eg(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 15:
        return tg(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 19:
        return ug(e, t, r);
      case 31:
        return ww(e, t, r);
      case 22:
        return ng(
          e,
          t,
          r,
          t.pendingProps
        );
      case 24:
        return kr(t), l = nn(kt), e === null ? (c = wu(), c === null && (c = dt, f = xu(), c.pooledCache = f, f.refCount++, f !== null && (c.pooledCacheLanes |= r), c = f), t.memoizedState = { parent: l, cache: c }, ju(t), Xa(t, kt, c)) : ((e.lanes & r) !== 0 && (Nu(e, t), El(t, null, null, r), wl()), c = e.memoizedState, f = t.memoizedState, c.parent !== l ? (c = { parent: l, cache: l }, t.memoizedState = c, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = c), Xa(t, kt, l)) : (l = f.cache, Xa(t, kt, l), l !== c.cache && bu(
          t,
          [kt],
          r,
          !0
        ))), an(
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
  function ld(e, t, r, l, c) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (c & 335544128) === c)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Bg()) e.flags |= 8192;
        else
          throw Br = Zs, Eu;
    } else e.flags &= -16777217;
  }
  function fg(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Cv(t))
      if (Bg()) e.flags |= 8192;
      else
        throw Br = Zs, Eu;
  }
  function po(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Gt() : 536870912, e.lanes |= t, Ri |= t);
  }
  function Ml(e, t) {
    if (!Pe)
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
  function yt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (t)
      for (var c = e.child; c !== null; )
        r |= c.lanes | c.childLanes, l |= c.subtreeFlags & 65011712, l |= c.flags & 65011712, c.return = e, c = c.sibling;
    else
      for (c = e.child; c !== null; )
        r |= c.lanes | c.childLanes, l |= c.subtreeFlags, l |= c.flags, c.return = e, c = c.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, t;
  }
  function jw(e, t, r) {
    var l = t.pendingProps;
    switch (mu(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return yt(t), null;
      case 1:
        return yt(t), null;
      case 3:
        return r = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Ea(kt), Ve(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pi(t) ? Ca(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, gu())), yt(t), null;
      case 26:
        var c = t.type, f = t.memoizedState;
        return e === null ? (Ca(t), f !== null ? (yt(t), fg(t, f)) : (yt(t), ld(
          t,
          c,
          null,
          l,
          r
        ))) : f ? f !== e.memoizedState ? (Ca(t), yt(t), fg(t, f)) : (yt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Ca(t), yt(t), ld(
          t,
          c,
          e,
          l,
          r
        )), null;
      case 27:
        if (Pt(t), r = ve.current, c = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return yt(t), null;
          }
          e = ce.current, pi(t) ? Ym(t) : (e = bv(c, l, r), t.stateNode = e, Ca(t));
        }
        return yt(t), null;
      case 5:
        if (Pt(t), c = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return yt(t), null;
          }
          if (f = ce.current, pi(t))
            Ym(t);
          else {
            var b = Ao(
              ve.current
            );
            switch (f) {
              case 1:
                f = b.createElementNS(
                  "http://www.w3.org/2000/svg",
                  c
                );
                break;
              case 2:
                f = b.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  c
                );
                break;
              default:
                switch (c) {
                  case "svg":
                    f = b.createElementNS(
                      "http://www.w3.org/2000/svg",
                      c
                    );
                    break;
                  case "math":
                    f = b.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      c
                    );
                    break;
                  case "script":
                    f = b.createElement("div"), f.innerHTML = "<script><\/script>", f = f.removeChild(
                      f.firstChild
                    );
                    break;
                  case "select":
                    f = typeof l.is == "string" ? b.createElement("select", {
                      is: l.is
                    }) : b.createElement("select"), l.multiple ? f.multiple = !0 : l.size && (f.size = l.size);
                    break;
                  default:
                    f = typeof l.is == "string" ? b.createElement(c, { is: l.is }) : b.createElement(c);
                }
            }
            f[pe] = t, f[ge] = l;
            e: for (b = t.child; b !== null; ) {
              if (b.tag === 5 || b.tag === 6)
                f.appendChild(b.stateNode);
              else if (b.tag !== 4 && b.tag !== 27 && b.child !== null) {
                b.child.return = b, b = b.child;
                continue;
              }
              if (b === t) break e;
              for (; b.sibling === null; ) {
                if (b.return === null || b.return === t)
                  break e;
                b = b.return;
              }
              b.sibling.return = b.return, b = b.sibling;
            }
            t.stateNode = f;
            e: switch (rn(f, c, l), c) {
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
        return yt(t), ld(
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
            if (e = t.stateNode, r = t.memoizedProps, l = null, c = tn, c !== null)
              switch (c.tag) {
                case 27:
                case 5:
                  l = c.memoizedProps;
              }
            e[pe] = t, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || ov(e.nodeValue, r)), e || Ga(t, !0);
          } else
            e = Ao(e).createTextNode(
              l
            ), e[pe] = t, t.stateNode = e;
        }
        return yt(t), null;
      case 31:
        if (r = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = pi(t), r !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[pe] = t;
            } else
              zr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            yt(t), e = !1;
          } else
            r = gu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return t.flags & 256 ? (Tn(t), t) : (Tn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return yt(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (c = pi(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(s(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(s(317));
              c[pe] = t;
            } else
              zr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            yt(t), c = !1;
          } else
            c = gu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c), c = !0;
          if (!c)
            return t.flags & 256 ? (Tn(t), t) : (Tn(t), null);
        }
        return Tn(t), (t.flags & 128) !== 0 ? (t.lanes = r, t) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = t.child, c = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (c = l.alternate.memoizedState.cachePool.pool), f = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (f = l.memoizedState.cachePool.pool), f !== c && (l.flags |= 2048)), r !== e && r && (t.child.flags |= 8192), po(t, t.updateQueue), yt(t), null);
      case 4:
        return Ve(), e === null && Rd(t.stateNode.containerInfo), yt(t), null;
      case 10:
        return Ea(t.type), yt(t), null;
      case 19:
        if (J(Rt), l = t.memoizedState, l === null) return yt(t), null;
        if (c = (t.flags & 128) !== 0, f = l.rendering, f === null)
          if (c) Ml(l, !1);
          else {
            if (Nt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (f = to(e), f !== null) {
                  for (t.flags |= 128, Ml(l, !1), e = f.updateQueue, t.updateQueue = e, po(t, e), t.subtreeFlags = 0, e = r, r = t.child; r !== null; )
                    $m(r, e), r = r.sibling;
                  return Z(
                    Rt,
                    Rt.current & 1 | 2
                  ), Pe && Sa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && qt() > xo && (t.flags |= 128, c = !0, Ml(l, !1), t.lanes = 4194304);
          }
        else {
          if (!c)
            if (e = to(f), e !== null) {
              if (t.flags |= 128, c = !0, e = e.updateQueue, t.updateQueue = e, po(t, e), Ml(l, !0), l.tail === null && l.tailMode === "hidden" && !f.alternate && !Pe)
                return yt(t), null;
            } else
              2 * qt() - l.renderingStartTime > xo && r !== 536870912 && (t.flags |= 128, c = !0, Ml(l, !1), t.lanes = 4194304);
          l.isBackwards ? (f.sibling = t.child, t.child = f) : (e = l.last, e !== null ? e.sibling = f : t.child = f, l.last = f);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = qt(), e.sibling = null, r = Rt.current, Z(
          Rt,
          c ? r & 1 | 2 : r & 1
        ), Pe && Sa(t, l.treeForkCount), e) : (yt(t), null);
      case 22:
      case 23:
        return Tn(t), Mu(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (r & 536870912) !== 0 && (t.flags & 128) === 0 && (yt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : yt(t), r = t.updateQueue, r !== null && po(t, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== r && (t.flags |= 2048), e !== null && J(Lr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Ea(kt), yt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Nw(e, t) {
    switch (mu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Ea(kt), Ve(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Pt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Tn(t), t.alternate === null)
            throw Error(s(340));
          zr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Tn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          zr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return J(Rt), null;
      case 4:
        return Ve(), null;
      case 10:
        return Ea(t.type), null;
      case 22:
      case 23:
        return Tn(t), Mu(), e !== null && J(Lr), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Ea(kt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function hg(e, t) {
    switch (mu(t), t.tag) {
      case 3:
        Ea(kt), Ve();
        break;
      case 26:
      case 27:
      case 5:
        Pt(t);
        break;
      case 4:
        Ve();
        break;
      case 31:
        t.memoizedState !== null && Tn(t);
        break;
      case 13:
        Tn(t);
        break;
      case 19:
        J(Rt);
        break;
      case 10:
        Ea(t.type);
        break;
      case 22:
      case 23:
        Tn(t), Mu(), e !== null && J(Lr);
        break;
      case 24:
        Ea(kt);
    }
  }
  function Al(e, t) {
    try {
      var r = t.updateQueue, l = r !== null ? r.lastEffect : null;
      if (l !== null) {
        var c = l.next;
        r = c;
        do {
          if ((r.tag & e) === e) {
            l = void 0;
            var f = r.create, b = r.inst;
            l = f(), b.destroy = l;
          }
          r = r.next;
        } while (r !== c);
      }
    } catch (j) {
      at(t, t.return, j);
    }
  }
  function Wa(e, t, r) {
    try {
      var l = t.updateQueue, c = l !== null ? l.lastEffect : null;
      if (c !== null) {
        var f = c.next;
        l = f;
        do {
          if ((l.tag & e) === e) {
            var b = l.inst, j = b.destroy;
            if (j !== void 0) {
              b.destroy = void 0, c = t;
              var L = r, G = j;
              try {
                G();
              } catch (ae) {
                at(
                  c,
                  L,
                  ae
                );
              }
            }
          }
          l = l.next;
        } while (l !== f);
      }
    } catch (ae) {
      at(t, t.return, ae);
    }
  }
  function mg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var r = e.stateNode;
      try {
        rp(t, r);
      } catch (l) {
        at(e, e.return, l);
      }
    }
  }
  function pg(e, t, r) {
    r.props = Hr(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (l) {
      at(e, t, l);
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
    } catch (c) {
      at(e, t, c);
    }
  }
  function fa(e, t) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (c) {
          at(e, t, c);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (c) {
          at(e, t, c);
        }
      else r.current = null;
  }
  function gg(e) {
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
    } catch (c) {
      at(e, e.return, c);
    }
  }
  function sd(e, t, r) {
    try {
      var l = e.stateNode;
      Xw(l, e.type, r, t), l[ge] = t;
    } catch (c) {
      at(e, e.return, c);
    }
  }
  function vg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && lr(e.type) || e.tag === 4;
  }
  function od(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || vg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && lr(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function cd(e, t, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, t) : (t = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, t.appendChild(e), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = ya));
    else if (l !== 4 && (l === 27 && lr(e.type) && (r = e.stateNode, t = null), e = e.child, e !== null))
      for (cd(e, t, r), e = e.sibling; e !== null; )
        cd(e, t, r), e = e.sibling;
  }
  function go(e, t, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
    else if (l !== 4 && (l === 27 && lr(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (go(e, t, r), e = e.sibling; e !== null; )
        go(e, t, r), e = e.sibling;
  }
  function yg(e) {
    var t = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, c = t.attributes; c.length; )
        t.removeAttributeNode(c[0]);
      rn(t, l, r), t[pe] = e, t[ge] = r;
    } catch (f) {
      at(e, e.return, f);
    }
  }
  var Ra = !1, Bt = !1, ud = !1, bg = typeof WeakSet == "function" ? WeakSet : Set, Qt = null;
  function Tw(e, t) {
    if (e = e.containerInfo, _d = Uo, e = _m(e), au(e)) {
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
            var c = l.anchorOffset, f = l.focusNode;
            l = l.focusOffset;
            try {
              r.nodeType, f.nodeType;
            } catch {
              r = null;
              break e;
            }
            var b = 0, j = -1, L = -1, G = 0, ae = 0, se = e, P = null;
            t: for (; ; ) {
              for (var W; se !== r || c !== 0 && se.nodeType !== 3 || (j = b + c), se !== f || l !== 0 && se.nodeType !== 3 || (L = b + l), se.nodeType === 3 && (b += se.nodeValue.length), (W = se.firstChild) !== null; )
                P = se, se = W;
              for (; ; ) {
                if (se === e) break t;
                if (P === r && ++G === c && (j = b), P === f && ++ae === l && (L = b), (W = se.nextSibling) !== null) break;
                se = P, P = se.parentNode;
              }
              se = W;
            }
            r = j === -1 || L === -1 ? null : { start: j, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Dd = { focusedElem: e, selectionRange: r }, Uo = !1, Qt = t; Qt !== null; )
      if (t = Qt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Qt = e;
      else
        for (; Qt !== null; ) {
          switch (t = Qt, f = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (r = 0; r < e.length; r++)
                  c = e[r], c.ref.impl = c.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, r = t, c = f.memoizedProps, f = f.memoizedState, l = r.stateNode;
                try {
                  var xe = Hr(
                    r.type,
                    c
                  );
                  e = l.getSnapshotBeforeUpdate(
                    xe,
                    f
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ae) {
                  at(
                    r,
                    r.return,
                    Ae
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, r = e.nodeType, r === 9)
                  kd(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      kd(e);
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
            e.return = t.return, Qt = e;
            break;
          }
          Qt = t.return;
        }
  }
  function xg(e, t, r) {
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
            } catch (b) {
              at(r, r.return, b);
            }
          else {
            var c = Hr(
              r.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                c,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (b) {
              at(
                r,
                r.return,
                b
              );
            }
          }
        l & 64 && mg(r), l & 512 && _l(r, r.return);
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
            rp(e, t);
          } catch (b) {
            at(r, r.return, b);
          }
        }
        break;
      case 27:
        t === null && l & 4 && yg(r);
      case 26:
      case 5:
        Aa(e, r), t === null && l & 4 && gg(r), l & 512 && _l(r, r.return);
        break;
      case 12:
        Aa(e, r);
        break;
      case 31:
        Aa(e, r), l & 4 && Eg(e, r);
        break;
      case 13:
        Aa(e, r), l & 4 && jg(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = kw.bind(
          null,
          r
        ), tE(e, r))));
        break;
      case 22:
        if (l = r.memoizedState !== null || Ra, !l) {
          t = t !== null && t.memoizedState !== null || Bt, c = Ra;
          var f = Bt;
          Ra = l, (Bt = t) && !f ? _a(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : Aa(e, r), Ra = c, Bt = f;
        }
        break;
      case 30:
        break;
      default:
        Aa(e, r);
    }
  }
  function Sg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Sg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ut(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var wt = null, pn = !1;
  function Ma(e, t, r) {
    for (r = r.child; r !== null; )
      wg(e, t, r), r = r.sibling;
  }
  function wg(e, t, r) {
    if (Wt && typeof Wt.onCommitFiberUnmount == "function")
      try {
        Wt.onCommitFiberUnmount(Zn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        Bt || fa(r, t), Ma(
          e,
          t,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Bt || fa(r, t);
        var l = wt, c = pn;
        lr(r.type) && (wt = r.stateNode, pn = !1), Ma(
          e,
          t,
          r
        ), $l(r.stateNode), wt = l, pn = c;
        break;
      case 5:
        Bt || fa(r, t);
      case 6:
        if (l = wt, c = pn, wt = null, Ma(
          e,
          t,
          r
        ), wt = l, pn = c, wt !== null)
          if (pn)
            try {
              (wt.nodeType === 9 ? wt.body : wt.nodeName === "HTML" ? wt.ownerDocument.body : wt).removeChild(r.stateNode);
            } catch (f) {
              at(
                r,
                t,
                f
              );
            }
          else
            try {
              wt.removeChild(r.stateNode);
            } catch (f) {
              at(
                r,
                t,
                f
              );
            }
        break;
      case 18:
        wt !== null && (pn ? (e = wt, mv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Li(e)) : mv(wt, r.stateNode));
        break;
      case 4:
        l = wt, c = pn, wt = r.stateNode.containerInfo, pn = !0, Ma(
          e,
          t,
          r
        ), wt = l, pn = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Wa(2, r, t), Bt || Wa(4, r, t), Ma(
          e,
          t,
          r
        );
        break;
      case 1:
        Bt || (fa(r, t), l = r.stateNode, typeof l.componentWillUnmount == "function" && pg(
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
        Bt = (l = Bt) || r.memoizedState !== null, Ma(
          e,
          t,
          r
        ), Bt = l;
        break;
      default:
        Ma(
          e,
          t,
          r
        );
    }
  }
  function Eg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Li(e);
      } catch (r) {
        at(t, t.return, r);
      }
    }
  }
  function jg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Li(e);
      } catch (r) {
        at(t, t.return, r);
      }
  }
  function Cw(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new bg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new bg()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function vo(e, t) {
    var r = Cw(e);
    t.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var c = Lw.bind(null, e, l);
        l.then(c, c);
      }
    });
  }
  function gn(e, t) {
    var r = t.deletions;
    if (r !== null)
      for (var l = 0; l < r.length; l++) {
        var c = r[l], f = e, b = t, j = b;
        e: for (; j !== null; ) {
          switch (j.tag) {
            case 27:
              if (lr(j.type)) {
                wt = j.stateNode, pn = !1;
                break e;
              }
              break;
            case 5:
              wt = j.stateNode, pn = !1;
              break e;
            case 3:
            case 4:
              wt = j.stateNode.containerInfo, pn = !0;
              break e;
          }
          j = j.return;
        }
        if (wt === null) throw Error(s(160));
        wg(f, b, c), wt = null, pn = !1, f = c.alternate, f !== null && (f.return = null), c.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Ng(t, e), t = t.sibling;
  }
  var ta = null;
  function Ng(e, t) {
    var r = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        gn(t, e), vn(e), l & 4 && (Wa(3, e, e.return), Al(3, e), Wa(5, e, e.return));
        break;
      case 1:
        gn(t, e), vn(e), l & 512 && (Bt || r === null || fa(r, r.return)), l & 64 && Ra && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var c = ta;
        if (gn(t, e), vn(e), l & 512 && (Bt || r === null || fa(r, r.return)), l & 4) {
          var f = r !== null ? r.memoizedState : null;
          if (l = e.memoizedState, r === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, r = e.memoizedProps, c = c.ownerDocument || c;
                  t: switch (l) {
                    case "title":
                      f = c.getElementsByTagName("title")[0], (!f || f[$e] || f[pe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = c.createElement(l), c.head.insertBefore(
                        f,
                        c.querySelector("head > title")
                      )), rn(f, l, r), f[pe] = e, mt(f), l = f;
                      break e;
                    case "link":
                      var b = Nv(
                        "link",
                        "href",
                        c
                      ).get(l + (r.href || ""));
                      if (b) {
                        for (var j = 0; j < b.length; j++)
                          if (f = b[j], f.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && f.getAttribute("rel") === (r.rel == null ? null : r.rel) && f.getAttribute("title") === (r.title == null ? null : r.title) && f.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            b.splice(j, 1);
                            break t;
                          }
                      }
                      f = c.createElement(l), rn(f, l, r), c.head.appendChild(f);
                      break;
                    case "meta":
                      if (b = Nv(
                        "meta",
                        "content",
                        c
                      ).get(l + (r.content || ""))) {
                        for (j = 0; j < b.length; j++)
                          if (f = b[j], f.getAttribute("content") === (r.content == null ? null : "" + r.content) && f.getAttribute("name") === (r.name == null ? null : r.name) && f.getAttribute("property") === (r.property == null ? null : r.property) && f.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && f.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            b.splice(j, 1);
                            break t;
                          }
                      }
                      f = c.createElement(l), rn(f, l, r), c.head.appendChild(f);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  f[pe] = e, mt(f), l = f;
                }
                e.stateNode = l;
              } else
                Tv(
                  c,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = jv(
                c,
                l,
                e.memoizedProps
              );
          else
            f !== l ? (f === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : f.count--, l === null ? Tv(
              c,
              e.type,
              e.stateNode
            ) : jv(
              c,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && sd(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        gn(t, e), vn(e), l & 512 && (Bt || r === null || fa(r, r.return)), r !== null && l & 4 && sd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (gn(t, e), vn(e), l & 512 && (Bt || r === null || fa(r, r.return)), e.flags & 32) {
          c = e.stateNode;
          try {
            ii(c, "");
          } catch (xe) {
            at(e, e.return, xe);
          }
        }
        l & 4 && e.stateNode != null && (c = e.memoizedProps, sd(
          e,
          c,
          r !== null ? r.memoizedProps : c
        )), l & 1024 && (ud = !0);
        break;
      case 6:
        if (gn(t, e), vn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (xe) {
            at(e, e.return, xe);
          }
        }
        break;
      case 3:
        if (zo = null, c = ta, ta = _o(t.containerInfo), gn(t, e), ta = c, vn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Li(t.containerInfo);
          } catch (xe) {
            at(e, e.return, xe);
          }
        ud && (ud = !1, Tg(e));
        break;
      case 4:
        l = ta, ta = _o(
          e.stateNode.containerInfo
        ), gn(t, e), vn(e), ta = l;
        break;
      case 12:
        gn(t, e), vn(e);
        break;
      case 31:
        gn(t, e), vn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 13:
        gn(t, e), vn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (bo = qt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 22:
        c = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, G = Ra, ae = Bt;
        if (Ra = G || c, Bt = ae || L, gn(t, e), Bt = ae, Ra = G, vn(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = c ? t._visibility & -2 : t._visibility | 1, c && (r === null || L || Ra || Bt || qr(e)), r = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (r === null) {
                L = r = t;
                try {
                  if (f = L.stateNode, c)
                    b = f.style, typeof b.setProperty == "function" ? b.setProperty("display", "none", "important") : b.display = "none";
                  else {
                    j = L.stateNode;
                    var se = L.memoizedProps.style, P = se != null && se.hasOwnProperty("display") ? se.display : null;
                    j.style.display = P == null || typeof P == "boolean" ? "" : ("" + P).trim();
                  }
                } catch (xe) {
                  at(L, L.return, xe);
                }
              }
            } else if (t.tag === 6) {
              if (r === null) {
                L = t;
                try {
                  L.stateNode.nodeValue = c ? "" : L.memoizedProps;
                } catch (xe) {
                  at(L, L.return, xe);
                }
              }
            } else if (t.tag === 18) {
              if (r === null) {
                L = t;
                try {
                  var W = L.stateNode;
                  c ? pv(W, !0) : pv(L.stateNode, !1);
                } catch (xe) {
                  at(L, L.return, xe);
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
        gn(t, e), vn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        gn(t, e), vn(e);
    }
  }
  function vn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var r, l = e.return; l !== null; ) {
          if (vg(l)) {
            r = l;
            break;
          }
          l = l.return;
        }
        if (r == null) throw Error(s(160));
        switch (r.tag) {
          case 27:
            var c = r.stateNode, f = od(e);
            go(e, f, c);
            break;
          case 5:
            var b = r.stateNode;
            r.flags & 32 && (ii(b, ""), r.flags &= -33);
            var j = od(e);
            go(e, j, b);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, G = od(e);
            cd(
              e,
              G,
              L
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (ae) {
        at(e, e.return, ae);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Tg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Tg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Aa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        xg(e, t.alternate, t), t = t.sibling;
  }
  function qr(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Wa(4, t, t.return), qr(t);
          break;
        case 1:
          fa(t, t.return);
          var r = t.stateNode;
          typeof r.componentWillUnmount == "function" && pg(
            t,
            t.return,
            r
          ), qr(t);
          break;
        case 27:
          $l(t.stateNode);
        case 26:
        case 5:
          fa(t, t.return), qr(t);
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
      var l = t.alternate, c = e, f = t, b = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          _a(
            c,
            f,
            r
          ), Al(4, f);
          break;
        case 1:
          if (_a(
            c,
            f,
            r
          ), l = f, c = l.stateNode, typeof c.componentDidMount == "function")
            try {
              c.componentDidMount();
            } catch (G) {
              at(l, l.return, G);
            }
          if (l = f, c = l.updateQueue, c !== null) {
            var j = l.stateNode;
            try {
              var L = c.shared.hiddenCallbacks;
              if (L !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < L.length; c++)
                  ap(L[c], j);
            } catch (G) {
              at(l, l.return, G);
            }
          }
          r && b & 64 && mg(f), _l(f, f.return);
          break;
        case 27:
          yg(f);
        case 26:
        case 5:
          _a(
            c,
            f,
            r
          ), r && l === null && b & 4 && gg(f), _l(f, f.return);
          break;
        case 12:
          _a(
            c,
            f,
            r
          );
          break;
        case 31:
          _a(
            c,
            f,
            r
          ), r && b & 4 && Eg(c, f);
          break;
        case 13:
          _a(
            c,
            f,
            r
          ), r && b & 4 && jg(c, f);
          break;
        case 22:
          f.memoizedState === null && _a(
            c,
            f,
            r
          ), _l(f, f.return);
          break;
        case 30:
          break;
        default:
          _a(
            c,
            f,
            r
          );
      }
      t = t.sibling;
    }
  }
  function dd(e, t) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && vl(r));
  }
  function fd(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && vl(e));
  }
  function na(e, t, r, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Cg(
          e,
          t,
          r,
          l
        ), t = t.sibling;
  }
  function Cg(e, t, r, l) {
    var c = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        na(
          e,
          t,
          r,
          l
        ), c & 2048 && Al(9, t);
        break;
      case 1:
        na(
          e,
          t,
          r,
          l
        );
        break;
      case 3:
        na(
          e,
          t,
          r,
          l
        ), c & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && vl(e)));
        break;
      case 12:
        if (c & 2048) {
          na(
            e,
            t,
            r,
            l
          ), e = t.stateNode;
          try {
            var f = t.memoizedProps, b = f.id, j = f.onPostCommit;
            typeof j == "function" && j(
              b,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (L) {
            at(t, t.return, L);
          }
        } else
          na(
            e,
            t,
            r,
            l
          );
        break;
      case 31:
        na(
          e,
          t,
          r,
          l
        );
        break;
      case 13:
        na(
          e,
          t,
          r,
          l
        );
        break;
      case 23:
        break;
      case 22:
        f = t.stateNode, b = t.alternate, t.memoizedState !== null ? f._visibility & 2 ? na(
          e,
          t,
          r,
          l
        ) : Dl(e, t) : f._visibility & 2 ? na(
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
        )), c & 2048 && dd(b, t);
        break;
      case 24:
        na(
          e,
          t,
          r,
          l
        ), c & 2048 && fd(t.alternate, t);
        break;
      default:
        na(
          e,
          t,
          r,
          l
        );
    }
  }
  function Ni(e, t, r, l, c) {
    for (c = c && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var f = e, b = t, j = r, L = l, G = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          Ni(
            f,
            b,
            j,
            L,
            c
          ), Al(8, b);
          break;
        case 23:
          break;
        case 22:
          var ae = b.stateNode;
          b.memoizedState !== null ? ae._visibility & 2 ? Ni(
            f,
            b,
            j,
            L,
            c
          ) : Dl(
            f,
            b
          ) : (ae._visibility |= 2, Ni(
            f,
            b,
            j,
            L,
            c
          )), c && G & 2048 && dd(
            b.alternate,
            b
          );
          break;
        case 24:
          Ni(
            f,
            b,
            j,
            L,
            c
          ), c && G & 2048 && fd(b.alternate, b);
          break;
        default:
          Ni(
            f,
            b,
            j,
            L,
            c
          );
      }
      t = t.sibling;
    }
  }
  function Dl(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var r = e, l = t, c = l.flags;
        switch (l.tag) {
          case 22:
            Dl(r, l), c & 2048 && dd(
              l.alternate,
              l
            );
            break;
          case 24:
            Dl(r, l), c & 2048 && fd(l.alternate, l);
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
        Rg(
          e,
          t,
          r
        ), e = e.sibling;
  }
  function Rg(e, t, r) {
    switch (e.tag) {
      case 26:
        Ti(
          e,
          t,
          r
        ), e.flags & zl && e.memoizedState !== null && hE(
          r,
          ta,
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
        var l = ta;
        ta = _o(e.stateNode.containerInfo), Ti(
          e,
          t,
          r
        ), ta = l;
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
  function Mg(e) {
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
          Qt = l, _g(
            l,
            e
          );
        }
      Mg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Ag(e), e = e.sibling;
  }
  function Ag(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ol(e), e.flags & 2048 && Wa(9, e, e.return);
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
          Qt = l, _g(
            l,
            e
          );
        }
      Mg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, t, t.return), yo(t);
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
  function _g(e, t) {
    for (; Qt !== null; ) {
      var r = Qt;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, r, t);
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
      if (l = r.child, l !== null) l.return = r, Qt = l;
      else
        e: for (r = e; Qt !== null; ) {
          l = Qt;
          var c = l.sibling, f = l.return;
          if (Sg(l), l === r) {
            Qt = null;
            break e;
          }
          if (c !== null) {
            c.return = f, Qt = c;
            break e;
          }
          Qt = f;
        }
    }
  }
  var Rw = {
    getCacheForType: function(e) {
      var t = nn(kt), r = t.data.get(e);
      return r === void 0 && (r = e(), t.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return nn(kt).controller.signal;
    }
  }, Mw = typeof WeakMap == "function" ? WeakMap : Map, et = 0, dt = null, Fe = null, Ge = 0, nt = 0, Cn = null, er = !1, Ci = !1, hd = !1, Da = 0, Nt = 0, tr = 0, Ir = 0, md = 0, Rn = 0, Ri = 0, kl = null, yn = null, pd = !1, bo = 0, Dg = 0, xo = 1 / 0, So = null, nr = null, Xt = 0, ar = null, Mi = null, za = 0, gd = 0, vd = null, zg = null, Ll = 0, yd = null;
  function Mn() {
    return (et & 2) !== 0 && Ge !== 0 ? Ge & -Ge : O.T !== null ? jd() : ue();
  }
  function Og() {
    if (Rn === 0)
      if ((Ge & 536870912) === 0 || Pe) {
        var e = Jn;
        Jn <<= 1, (Jn & 3932160) === 0 && (Jn = 262144), Rn = e;
      } else Rn = 536870912;
    return e = Nn.current, e !== null && (e.flags |= 32), Rn;
  }
  function bn(e, t, r) {
    (e === dt && (nt === 2 || nt === 9) || e.cancelPendingCommit !== null) && (Ai(e, 0), rr(
      e,
      Ge,
      Rn,
      !1
    )), rt(e, r), ((et & 2) === 0 || e !== dt) && (e === dt && ((et & 2) === 0 && (Ir |= r), Nt === 4 && rr(
      e,
      Ge,
      Rn,
      !1
    )), ha(e));
  }
  function kg(e, t, r) {
    if ((et & 6) !== 0) throw Error(s(327));
    var l = !r && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ct(e, t), c = l ? Dw(e, t) : xd(e, t, !0), f = l;
    do {
      if (c === 0) {
        Ci && !l && rr(e, t, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, f && !Aw(r)) {
          c = xd(e, t, !1), f = !1;
          continue;
        }
        if (c === 2) {
          if (f = t, e.errorRecoveryDisabledLanes & f)
            var b = 0;
          else
            b = e.pendingLanes & -536870913, b = b !== 0 ? b : b & 536870912 ? 536870912 : 0;
          if (b !== 0) {
            t = b;
            e: {
              var j = e;
              c = kl;
              var L = j.current.memoizedState.isDehydrated;
              if (L && (Ai(j, b).flags |= 256), b = xd(
                j,
                b,
                !1
              ), b !== 2) {
                if (hd && !L) {
                  j.errorRecoveryDisabledLanes |= f, Ir |= f, c = 4;
                  break e;
                }
                f = yn, yn = c, f !== null && (yn === null ? yn = f : yn.push.apply(
                  yn,
                  f
                ));
              }
              c = b;
            }
            if (f = !1, c !== 2) continue;
          }
        }
        if (c === 1) {
          Ai(e, 0), rr(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, f = c, f) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              rr(
                l,
                t,
                Rn,
                !er
              );
              break e;
            case 2:
              yn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (c = bo + 300 - qt(), 10 < c)) {
            if (rr(
              l,
              t,
              Rn,
              !er
            ), Oe(l, 0, !0) !== 0) break e;
            za = t, l.timeoutHandle = fv(
              Lg.bind(
                null,
                l,
                r,
                yn,
                So,
                pd,
                t,
                Rn,
                Ir,
                Ri,
                er,
                f,
                "Throttled",
                -0,
                0
              ),
              c
            );
            break e;
          }
          Lg(
            l,
            r,
            yn,
            So,
            pd,
            t,
            Rn,
            Ir,
            Ri,
            er,
            f,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ha(e);
  }
  function Lg(e, t, r, l, c, f, b, j, L, G, ae, se, P, W) {
    if (e.timeoutHandle = -1, se = t.subtreeFlags, se & 8192 || (se & 16785408) === 16785408) {
      se = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ya
      }, Rg(
        t,
        f,
        se
      );
      var xe = (f & 62914560) === f ? bo - qt() : (f & 4194048) === f ? Dg - qt() : 0;
      if (xe = mE(
        se,
        xe
      ), xe !== null) {
        za = f, e.cancelPendingCommit = xe(
          Fg.bind(
            null,
            e,
            t,
            f,
            r,
            l,
            c,
            b,
            j,
            L,
            ae,
            se,
            null,
            P,
            W
          )
        ), rr(e, f, b, !G);
        return;
      }
    }
    Fg(
      e,
      t,
      f,
      r,
      l,
      c,
      b,
      j,
      L
    );
  }
  function Aw(e) {
    for (var t = e; ; ) {
      var r = t.tag;
      if ((r === 0 || r === 11 || r === 15) && t.flags & 16384 && (r = t.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var l = 0; l < r.length; l++) {
          var c = r[l], f = c.getSnapshot;
          c = c.value;
          try {
            if (!En(f(), c)) return !1;
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
  function rr(e, t, r, l) {
    t &= ~md, t &= ~Ir, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var c = t; 0 < c; ) {
      var f = 31 - Yt(c), b = 1 << f;
      l[f] = -1, c &= ~b;
    }
    r !== 0 && va(e, r, t);
  }
  function wo() {
    return (et & 6) === 0 ? (Ul(0), !1) : !0;
  }
  function bd() {
    if (Fe !== null) {
      if (nt === 0)
        var e = Fe.return;
      else
        e = Fe, wa = Or = null, ku(e), xi = null, bl = 0, e = Fe;
      for (; e !== null; )
        hg(e.alternate, e), e = e.return;
      Fe = null;
    }
  }
  function Ai(e, t) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, Qw(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), za = 0, bd(), dt = e, Fe = r = xa(e.current, null), Ge = t, nt = 0, Cn = null, er = !1, Ci = ct(e, t), hd = !1, Ri = Rn = md = Ir = tr = Nt = 0, yn = kl = null, pd = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var c = 31 - Yt(l), f = 1 << c;
        t |= e[c], l &= ~f;
      }
    return Da = t, qs(), r;
  }
  function Ug(e, t) {
    Ue = null, O.H = Cl, t === bi || t === Qs ? (t = Wm(), nt = 3) : t === Eu ? (t = Wm(), nt = 4) : nt = t === Zu ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Cn = t, Fe === null && (Nt = 1, uo(
      e,
      Bn(t, e.current)
    ));
  }
  function Bg() {
    var e = Nn.current;
    return e === null ? !0 : (Ge & 4194048) === Ge ? qn === null : (Ge & 62914560) === Ge || (Ge & 536870912) !== 0 ? e === qn : !1;
  }
  function Vg() {
    var e = O.H;
    return O.H = Cl, e === null ? Cl : e;
  }
  function $g() {
    var e = O.A;
    return O.A = Rw, e;
  }
  function Eo() {
    Nt = 4, er || (Ge & 4194048) !== Ge && Nn.current !== null || (Ci = !0), (tr & 134217727) === 0 && (Ir & 134217727) === 0 || dt === null || rr(
      dt,
      Ge,
      Rn,
      !1
    );
  }
  function xd(e, t, r) {
    var l = et;
    et |= 2;
    var c = Vg(), f = $g();
    (dt !== e || Ge !== t) && (So = null, Ai(e, t)), t = !1;
    var b = Nt;
    e: do
      try {
        if (nt !== 0 && Fe !== null) {
          var j = Fe, L = Cn;
          switch (nt) {
            case 8:
              bd(), b = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Nn.current === null && (t = !0);
              var G = nt;
              if (nt = 0, Cn = null, _i(e, j, L, G), r && Ci) {
                b = 0;
                break e;
              }
              break;
            default:
              G = nt, nt = 0, Cn = null, _i(e, j, L, G);
          }
        }
        _w(), b = Nt;
        break;
      } catch (ae) {
        Ug(e, ae);
      }
    while (!0);
    return t && e.shellSuspendCounter++, wa = Or = null, et = l, O.H = c, O.A = f, Fe === null && (dt = null, Ge = 0, qs()), b;
  }
  function _w() {
    for (; Fe !== null; ) Hg(Fe);
  }
  function Dw(e, t) {
    var r = et;
    et |= 2;
    var l = Vg(), c = $g();
    dt !== e || Ge !== t ? (So = null, xo = qt() + 500, Ai(e, t)) : Ci = ct(
      e,
      t
    );
    e: do
      try {
        if (nt !== 0 && Fe !== null) {
          t = Fe;
          var f = Cn;
          t: switch (nt) {
            case 1:
              nt = 0, Cn = null, _i(e, t, f, 1);
              break;
            case 2:
            case 9:
              if (Zm(f)) {
                nt = 0, Cn = null, qg(t);
                break;
              }
              t = function() {
                nt !== 2 && nt !== 9 || dt !== e || (nt = 7), ha(e);
              }, f.then(t, t);
              break e;
            case 3:
              nt = 7;
              break e;
            case 4:
              nt = 5;
              break e;
            case 7:
              Zm(f) ? (nt = 0, Cn = null, qg(t)) : (nt = 0, Cn = null, _i(e, t, f, 7));
              break;
            case 5:
              var b = null;
              switch (Fe.tag) {
                case 26:
                  b = Fe.memoizedState;
                case 5:
                case 27:
                  var j = Fe;
                  if (b ? Cv(b) : j.stateNode.complete) {
                    nt = 0, Cn = null;
                    var L = j.sibling;
                    if (L !== null) Fe = L;
                    else {
                      var G = j.return;
                      G !== null ? (Fe = G, jo(G)) : Fe = null;
                    }
                    break t;
                  }
              }
              nt = 0, Cn = null, _i(e, t, f, 5);
              break;
            case 6:
              nt = 0, Cn = null, _i(e, t, f, 6);
              break;
            case 8:
              bd(), Nt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        zw();
        break;
      } catch (ae) {
        Ug(e, ae);
      }
    while (!0);
    return wa = Or = null, O.H = l, O.A = c, et = r, Fe !== null ? 0 : (dt = null, Ge = 0, qs(), Nt);
  }
  function zw() {
    for (; Fe !== null && !Ht(); )
      Hg(Fe);
  }
  function Hg(e) {
    var t = dg(e.alternate, e, Da);
    e.memoizedProps = e.pendingProps, t === null ? jo(e) : Fe = t;
  }
  function qg(e) {
    var t = e, r = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = ig(
          r,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ge
        );
        break;
      case 11:
        t = ig(
          r,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ge
        );
        break;
      case 5:
        ku(t);
      default:
        hg(r, t), t = Fe = $m(t, Da), t = dg(r, t, Da);
    }
    e.memoizedProps = e.pendingProps, t === null ? jo(e) : Fe = t;
  }
  function _i(e, t, r, l) {
    wa = Or = null, ku(t), xi = null, bl = 0;
    var c = t.return;
    try {
      if (Sw(
        e,
        c,
        t,
        r,
        Ge
      )) {
        Nt = 1, uo(
          e,
          Bn(r, e.current)
        ), Fe = null;
        return;
      }
    } catch (f) {
      if (c !== null) throw Fe = c, f;
      Nt = 1, uo(
        e,
        Bn(r, e.current)
      ), Fe = null;
      return;
    }
    t.flags & 32768 ? (Pe || l === 1 ? e = !0 : Ci || (Ge & 536870912) !== 0 ? e = !1 : (er = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Nn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Ig(t, e)) : jo(t);
  }
  function jo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Ig(
          t,
          er
        );
        return;
      }
      e = t.return;
      var r = jw(
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
    Nt === 0 && (Nt = 5);
  }
  function Ig(e, t) {
    do {
      var r = Nw(e.alternate, e);
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
    Nt = 6, Fe = null;
  }
  function Fg(e, t, r, l, c, f, b, j, L) {
    e.cancelPendingCommit = null;
    do
      No();
    while (Xt !== 0);
    if ((et & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (f = t.lanes | t.childLanes, f |= ou, en(
        e,
        r,
        f,
        b,
        j,
        L
      ), e === dt && (Fe = dt = null, Ge = 0), Mi = t, ar = e, za = r, gd = f, vd = c, zg = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Uw(tt, function() {
        return Kg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null, c = A.p, A.p = 2, b = et, et |= 4;
        try {
          Tw(e, t, r);
        } finally {
          et = b, A.p = c, O.T = l;
        }
      }
      Xt = 1, Yg(), Gg(), Xg();
    }
  }
  function Yg() {
    if (Xt === 1) {
      Xt = 0;
      var e = ar, t = Mi, r = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || r) {
        r = O.T, O.T = null;
        var l = A.p;
        A.p = 2;
        var c = et;
        et |= 4;
        try {
          Ng(t, e);
          var f = Dd, b = _m(e.containerInfo), j = f.focusedElem, L = f.selectionRange;
          if (b !== j && j && j.ownerDocument && Am(
            j.ownerDocument.documentElement,
            j
          )) {
            if (L !== null && au(j)) {
              var G = L.start, ae = L.end;
              if (ae === void 0 && (ae = G), "selectionStart" in j)
                j.selectionStart = G, j.selectionEnd = Math.min(
                  ae,
                  j.value.length
                );
              else {
                var se = j.ownerDocument || document, P = se && se.defaultView || window;
                if (P.getSelection) {
                  var W = P.getSelection(), xe = j.textContent.length, Ae = Math.min(L.start, xe), ot = L.end === void 0 ? Ae : Math.min(L.end, xe);
                  !W.extend && Ae > ot && (b = ot, ot = Ae, Ae = b);
                  var H = Mm(
                    j,
                    Ae
                  ), B = Mm(
                    j,
                    ot
                  );
                  if (H && B && (W.rangeCount !== 1 || W.anchorNode !== H.node || W.anchorOffset !== H.offset || W.focusNode !== B.node || W.focusOffset !== B.offset)) {
                    var Y = se.createRange();
                    Y.setStart(H.node, H.offset), W.removeAllRanges(), Ae > ot ? (W.addRange(Y), W.extend(B.node, B.offset)) : (Y.setEnd(B.node, B.offset), W.addRange(Y));
                  }
                }
              }
            }
            for (se = [], W = j; W = W.parentNode; )
              W.nodeType === 1 && se.push({
                element: W,
                left: W.scrollLeft,
                top: W.scrollTop
              });
            for (typeof j.focus == "function" && j.focus(), j = 0; j < se.length; j++) {
              var le = se[j];
              le.element.scrollLeft = le.left, le.element.scrollTop = le.top;
            }
          }
          Uo = !!_d, Dd = _d = null;
        } finally {
          et = c, A.p = l, O.T = r;
        }
      }
      e.current = t, Xt = 2;
    }
  }
  function Gg() {
    if (Xt === 2) {
      Xt = 0;
      var e = ar, t = Mi, r = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || r) {
        r = O.T, O.T = null;
        var l = A.p;
        A.p = 2;
        var c = et;
        et |= 4;
        try {
          xg(e, t.alternate, t);
        } finally {
          et = c, A.p = l, O.T = r;
        }
      }
      Xt = 3;
    }
  }
  function Xg() {
    if (Xt === 4 || Xt === 3) {
      Xt = 0, On();
      var e = ar, t = Mi, r = za, l = zg;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Xt = 5 : (Xt = 0, Mi = ar = null, Pg(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (c === 0 && (nr = null), I(r), t = t.stateNode, Wt && typeof Wt.onCommitFiberRoot == "function")
        try {
          Wt.onCommitFiberRoot(
            Zn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = O.T, c = A.p, A.p = 2, O.T = null;
        try {
          for (var f = e.onRecoverableError, b = 0; b < l.length; b++) {
            var j = l[b];
            f(j.value, {
              componentStack: j.stack
            });
          }
        } finally {
          O.T = t, A.p = c;
        }
      }
      (za & 3) !== 0 && No(), ha(e), c = e.pendingLanes, (r & 261930) !== 0 && (c & 42) !== 0 ? e === yd ? Ll++ : (Ll = 0, yd = e) : Ll = 0, Ul(0);
    }
  }
  function Pg(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, vl(t)));
  }
  function No() {
    return Yg(), Gg(), Xg(), Kg();
  }
  function Kg() {
    if (Xt !== 5) return !1;
    var e = ar, t = gd;
    gd = 0;
    var r = I(za), l = O.T, c = A.p;
    try {
      A.p = 32 > r ? 32 : r, O.T = null, r = vd, vd = null;
      var f = ar, b = za;
      if (Xt = 0, Mi = ar = null, za = 0, (et & 6) !== 0) throw Error(s(331));
      var j = et;
      if (et |= 4, Ag(f.current), Cg(
        f,
        f.current,
        b,
        r
      ), et = j, Ul(0, !1), Wt && typeof Wt.onPostCommitFiberRoot == "function")
        try {
          Wt.onPostCommitFiberRoot(Zn, f);
        } catch {
        }
      return !0;
    } finally {
      A.p = c, O.T = l, Pg(e, t);
    }
  }
  function Qg(e, t, r) {
    t = Bn(r, t), t = Qu(e.stateNode, t, 2), e = Qa(e, t, 2), e !== null && (rt(e, 2), ha(e));
  }
  function at(e, t, r) {
    if (e.tag === 3)
      Qg(e, e, r);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Qg(
            t,
            e,
            r
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (nr === null || !nr.has(l))) {
            e = Bn(r, e), r = Zp(2), l = Qa(t, r, 2), l !== null && (Jp(
              r,
              l,
              t,
              e
            ), rt(l, 2), ha(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Sd(e, t, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Mw();
      var c = /* @__PURE__ */ new Set();
      l.set(t, c);
    } else
      c = l.get(t), c === void 0 && (c = /* @__PURE__ */ new Set(), l.set(t, c));
    c.has(r) || (hd = !0, c.add(r), e = Ow.bind(null, e, t, r), t.then(e, e));
  }
  function Ow(e, t, r) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, dt === e && (Ge & r) === r && (Nt === 4 || Nt === 3 && (Ge & 62914560) === Ge && 300 > qt() - bo ? (et & 2) === 0 && Ai(e, 0) : md |= r, Ri === Ge && (Ri = 0)), ha(e);
  }
  function Zg(e, t) {
    t === 0 && (t = Gt()), e = _r(e, t), e !== null && (rt(e, t), ha(e));
  }
  function kw(e) {
    var t = e.memoizedState, r = 0;
    t !== null && (r = t.retryLane), Zg(e, r);
  }
  function Lw(e, t) {
    var r = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, c = e.memoizedState;
        c !== null && (r = c.retryLane);
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
    l !== null && l.delete(t), Zg(e, r);
  }
  function Uw(e, t) {
    return xt(e, t);
  }
  var To = null, Di = null, wd = !1, Co = !1, Ed = !1, ir = 0;
  function ha(e) {
    e !== Di && e.next === null && (Di === null ? To = Di = e : Di = Di.next = e), Co = !0, wd || (wd = !0, Vw());
  }
  function Ul(e, t) {
    if (!Ed && Co) {
      Ed = !0;
      do
        for (var r = !1, l = To; l !== null; ) {
          if (e !== 0) {
            var c = l.pendingLanes;
            if (c === 0) var f = 0;
            else {
              var b = l.suspendedLanes, j = l.pingedLanes;
              f = (1 << 31 - Yt(42 | e) + 1) - 1, f &= c & ~(b & ~j), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (r = !0, tv(l, f));
          } else
            f = Ge, f = Oe(
              l,
              l === dt ? f : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (f & 3) === 0 || ct(l, f) || (r = !0, tv(l, f));
          l = l.next;
        }
      while (r);
      Ed = !1;
    }
  }
  function Bw() {
    Jg();
  }
  function Jg() {
    Co = wd = !1;
    var e = 0;
    ir !== 0 && Kw() && (e = ir);
    for (var t = qt(), r = null, l = To; l !== null; ) {
      var c = l.next, f = Wg(l, t);
      f === 0 ? (l.next = null, r === null ? To = c : r.next = c, c === null && (Di = r)) : (r = l, (e !== 0 || (f & 3) !== 0) && (Co = !0)), l = c;
    }
    Xt !== 0 && Xt !== 5 || Ul(e), ir !== 0 && (ir = 0);
  }
  function Wg(e, t) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, c = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var b = 31 - Yt(f), j = 1 << b, L = c[b];
      L === -1 ? ((j & r) === 0 || (j & l) !== 0) && (c[b] = Dt(j, t)) : L <= t && (e.expiredLanes |= j), f &= ~j;
    }
    if (t = dt, r = Ge, r = Oe(
      e,
      e === t ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === t && (nt === 2 || nt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && dn(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || ct(e, r)) {
      if (t = r & -r, t === e.callbackPriority) return t;
      switch (l !== null && dn(l), I(r)) {
        case 2:
        case 8:
          r = Ke;
          break;
        case 32:
          r = tt;
          break;
        case 268435456:
          r = Ft;
          break;
        default:
          r = tt;
      }
      return l = ev.bind(null, e), r = xt(r, l), e.callbackPriority = t, e.callbackNode = r, t;
    }
    return l !== null && l !== null && dn(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function ev(e, t) {
    if (Xt !== 0 && Xt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (No() && e.callbackNode !== r)
      return null;
    var l = Ge;
    return l = Oe(
      e,
      e === dt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (kg(e, l, t), Wg(e, qt()), e.callbackNode != null && e.callbackNode === r ? ev.bind(null, e) : null);
  }
  function tv(e, t) {
    if (No()) return null;
    kg(e, t, !0);
  }
  function Vw() {
    Zw(function() {
      (et & 6) !== 0 ? xt(
        ze,
        Bw
      ) : Jg();
    });
  }
  function jd() {
    if (ir === 0) {
      var e = vi;
      e === 0 && (e = ga, ga <<= 1, (ga & 261888) === 0 && (ga = 256)), ir = e;
    }
    return ir;
  }
  function nv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Os("" + e);
  }
  function av(e, t) {
    var r = t.ownerDocument.createElement("input");
    return r.name = t.name, r.value = t.value, e.id && r.setAttribute("form", e.id), t.parentNode.insertBefore(r, t), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function $w(e, t, r, l, c) {
    if (t === "submit" && r && r.stateNode === c) {
      var f = nv(
        (c[ge] || null).action
      ), b = l.submitter;
      b && (t = (t = b[ge] || null) ? nv(t.formAction) : b.getAttribute("formAction"), t !== null && (f = t, b = null));
      var j = new Bs(
        "action",
        "action",
        null,
        l,
        c
      );
      e.push({
        event: j,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (ir !== 0) {
                  var L = b ? av(c, b) : new FormData(c);
                  Fu(
                    r,
                    {
                      pending: !0,
                      data: L,
                      method: c.method,
                      action: f
                    },
                    null,
                    L
                  );
                }
              } else
                typeof f == "function" && (j.preventDefault(), L = b ? av(c, b) : new FormData(c), Fu(
                  r,
                  {
                    pending: !0,
                    data: L,
                    method: c.method,
                    action: f
                  },
                  f,
                  L
                ));
            },
            currentTarget: c
          }
        ]
      });
    }
  }
  for (var Nd = 0; Nd < su.length; Nd++) {
    var Td = su[Nd], Hw = Td.toLowerCase(), qw = Td[0].toUpperCase() + Td.slice(1);
    ea(
      Hw,
      "on" + qw
    );
  }
  ea(Om, "onAnimationEnd"), ea(km, "onAnimationIteration"), ea(Lm, "onAnimationStart"), ea("dblclick", "onDoubleClick"), ea("focusin", "onFocus"), ea("focusout", "onBlur"), ea(rw, "onTransitionRun"), ea(iw, "onTransitionStart"), ea(lw, "onTransitionCancel"), ea(Um, "onTransitionEnd"), oa("onMouseEnter", ["mouseout", "mouseover"]), oa("onMouseLeave", ["mouseout", "mouseover"]), oa("onPointerEnter", ["pointerout", "pointerover"]), oa("onPointerLeave", ["pointerout", "pointerover"]), Kt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Kt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Kt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Kt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Kt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Kt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Bl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Iw = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bl)
  );
  function rv(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var l = e[r], c = l.event;
      l = l.listeners;
      e: {
        var f = void 0;
        if (t)
          for (var b = l.length - 1; 0 <= b; b--) {
            var j = l[b], L = j.instance, G = j.currentTarget;
            if (j = j.listener, L !== f && c.isPropagationStopped())
              break e;
            f = j, c.currentTarget = G;
            try {
              f(c);
            } catch (ae) {
              Hs(ae);
            }
            c.currentTarget = null, f = L;
          }
        else
          for (b = 0; b < l.length; b++) {
            if (j = l[b], L = j.instance, G = j.currentTarget, j = j.listener, L !== f && c.isPropagationStopped())
              break e;
            f = j, c.currentTarget = G;
            try {
              f(c);
            } catch (ae) {
              Hs(ae);
            }
            c.currentTarget = null, f = L;
          }
      }
    }
  }
  function Ye(e, t) {
    var r = t[be];
    r === void 0 && (r = t[be] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (iv(t, e, 2, !1), r.add(l));
  }
  function Cd(e, t, r) {
    var l = 0;
    t && (l |= 4), iv(
      r,
      e,
      l,
      t
    );
  }
  var Ro = "_reactListening" + Math.random().toString(36).slice(2);
  function Rd(e) {
    if (!e[Ro]) {
      e[Ro] = !0, qa.forEach(function(r) {
        r !== "selectionchange" && (Iw.has(r) || Cd(r, !1, e), Cd(r, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ro] || (t[Ro] = !0, Cd("selectionchange", !1, t));
    }
  }
  function iv(e, t, r, l) {
    switch (Ov(t)) {
      case 2:
        var c = vE;
        break;
      case 8:
        c = yE;
        break;
      default:
        c = Id;
    }
    r = c.bind(
      null,
      t,
      r,
      e
    ), c = void 0, !Pc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (c = !0), l ? c !== void 0 ? e.addEventListener(t, r, {
      capture: !0,
      passive: c
    }) : e.addEventListener(t, r, !0) : c !== void 0 ? e.addEventListener(t, r, {
      passive: c
    }) : e.addEventListener(t, r, !1);
  }
  function Md(e, t, r, l, c) {
    var f = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var b = l.tag;
        if (b === 3 || b === 4) {
          var j = l.stateNode.containerInfo;
          if (j === c) break;
          if (b === 4)
            for (b = l.return; b !== null; ) {
              var L = b.tag;
              if ((L === 3 || L === 4) && b.stateNode.containerInfo === c)
                return;
              b = b.return;
            }
          for (; j !== null; ) {
            if (b = it(j), b === null) return;
            if (L = b.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              l = f = b;
              continue e;
            }
            j = j.parentNode;
          }
        }
        l = l.return;
      }
    um(function() {
      var G = f, ae = Gc(r), se = [];
      e: {
        var P = Bm.get(e);
        if (P !== void 0) {
          var W = Bs, xe = e;
          switch (e) {
            case "keypress":
              if (Ls(r) === 0) break e;
            case "keydown":
            case "keyup":
              W = LS;
              break;
            case "focusin":
              xe = "focus", W = Jc;
              break;
            case "focusout":
              xe = "blur", W = Jc;
              break;
            case "beforeblur":
            case "afterblur":
              W = Jc;
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
              W = hm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              W = jS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              W = VS;
              break;
            case Om:
            case km:
            case Lm:
              W = CS;
              break;
            case Um:
              W = HS;
              break;
            case "scroll":
            case "scrollend":
              W = wS;
              break;
            case "wheel":
              W = IS;
              break;
            case "copy":
            case "cut":
            case "paste":
              W = MS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              W = pm;
              break;
            case "toggle":
            case "beforetoggle":
              W = YS;
          }
          var Ae = (t & 4) !== 0, ot = !Ae && (e === "scroll" || e === "scrollend"), H = Ae ? P !== null ? P + "Capture" : null : P;
          Ae = [];
          for (var B = G, Y; B !== null; ) {
            var le = B;
            if (Y = le.stateNode, le = le.tag, le !== 5 && le !== 26 && le !== 27 || Y === null || H === null || (le = ll(B, H), le != null && Ae.push(
              Vl(B, le, Y)
            )), ot) break;
            B = B.return;
          }
          0 < Ae.length && (P = new W(
            P,
            xe,
            null,
            r,
            ae
          ), se.push({ event: P, listeners: Ae }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (P = e === "mouseover" || e === "pointerover", W = e === "mouseout" || e === "pointerout", P && r !== Yc && (xe = r.relatedTarget || r.fromElement) && (it(xe) || xe[Ee]))
            break e;
          if ((W || P) && (P = ae.window === ae ? ae : (P = ae.ownerDocument) ? P.defaultView || P.parentWindow : window, W ? (xe = r.relatedTarget || r.toElement, W = G, xe = xe ? it(xe) : null, xe !== null && (ot = u(xe), Ae = xe.tag, xe !== ot || Ae !== 5 && Ae !== 27 && Ae !== 6) && (xe = null)) : (W = null, xe = G), W !== xe)) {
            if (Ae = hm, le = "onMouseLeave", H = "onMouseEnter", B = "mouse", (e === "pointerout" || e === "pointerover") && (Ae = pm, le = "onPointerLeave", H = "onPointerEnter", B = "pointer"), ot = W == null ? P : Ie(W), Y = xe == null ? P : Ie(xe), P = new Ae(
              le,
              B + "leave",
              W,
              r,
              ae
            ), P.target = ot, P.relatedTarget = Y, le = null, it(ae) === G && (Ae = new Ae(
              H,
              B + "enter",
              xe,
              r,
              ae
            ), Ae.target = Y, Ae.relatedTarget = ot, le = Ae), ot = le, W && xe)
              t: {
                for (Ae = Fw, H = W, B = xe, Y = 0, le = H; le; le = Ae(le))
                  Y++;
                le = 0;
                for (var Ce = B; Ce; Ce = Ae(Ce))
                  le++;
                for (; 0 < Y - le; )
                  H = Ae(H), Y--;
                for (; 0 < le - Y; )
                  B = Ae(B), le--;
                for (; Y--; ) {
                  if (H === B || B !== null && H === B.alternate) {
                    Ae = H;
                    break t;
                  }
                  H = Ae(H), B = Ae(B);
                }
                Ae = null;
              }
            else Ae = null;
            W !== null && lv(
              se,
              P,
              W,
              Ae,
              !1
            ), xe !== null && ot !== null && lv(
              se,
              ot,
              xe,
              Ae,
              !0
            );
          }
        }
        e: {
          if (P = G ? Ie(G) : window, W = P.nodeName && P.nodeName.toLowerCase(), W === "select" || W === "input" && P.type === "file")
            var Ze = Em;
          else if (Sm(P))
            if (jm)
              Ze = tw;
            else {
              Ze = WS;
              var je = JS;
            }
          else
            W = P.nodeName, !W || W.toLowerCase() !== "input" || P.type !== "checkbox" && P.type !== "radio" ? G && Fc(G.elementType) && (Ze = Em) : Ze = ew;
          if (Ze && (Ze = Ze(e, G))) {
            wm(
              se,
              Ze,
              r,
              ae
            );
            break e;
          }
          je && je(e, P, G), e === "focusout" && G && P.type === "number" && G.memoizedProps.value != null && Ic(P, "number", P.value);
        }
        switch (je = G ? Ie(G) : window, e) {
          case "focusin":
            (Sm(je) || je.contentEditable === "true") && (ci = je, ru = G, ml = null);
            break;
          case "focusout":
            ml = ru = ci = null;
            break;
          case "mousedown":
            iu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            iu = !1, Dm(se, r, ae);
            break;
          case "selectionchange":
            if (aw) break;
          case "keydown":
          case "keyup":
            Dm(se, r, ae);
        }
        var Be;
        if (eu)
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
          oi ? bm(e, r) && (Xe = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (Xe = "onCompositionStart");
        Xe && (gm && r.locale !== "ko" && (oi || Xe !== "onCompositionStart" ? Xe === "onCompositionEnd" && oi && (Be = dm()) : (Ia = ae, Kc = "value" in Ia ? Ia.value : Ia.textContent, oi = !0)), je = Mo(G, Xe), 0 < je.length && (Xe = new mm(
          Xe,
          e,
          null,
          r,
          ae
        ), se.push({ event: Xe, listeners: je }), Be ? Xe.data = Be : (Be = xm(r), Be !== null && (Xe.data = Be)))), (Be = XS ? PS(e, r) : KS(e, r)) && (Xe = Mo(G, "onBeforeInput"), 0 < Xe.length && (je = new mm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ae
        ), se.push({
          event: je,
          listeners: Xe
        }), je.data = Be)), $w(
          se,
          e,
          G,
          r,
          ae
        );
      }
      rv(se, t);
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
      var c = e, f = c.stateNode;
      if (c = c.tag, c !== 5 && c !== 26 && c !== 27 || f === null || (c = ll(e, r), c != null && l.unshift(
        Vl(e, c, f)
      ), c = ll(e, t), c != null && l.push(
        Vl(e, c, f)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Fw(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function lv(e, t, r, l, c) {
    for (var f = t._reactName, b = []; r !== null && r !== l; ) {
      var j = r, L = j.alternate, G = j.stateNode;
      if (j = j.tag, L !== null && L === l) break;
      j !== 5 && j !== 26 && j !== 27 || G === null || (L = G, c ? (G = ll(r, f), G != null && b.unshift(
        Vl(r, G, L)
      )) : c || (G = ll(r, f), G != null && b.push(
        Vl(r, G, L)
      ))), r = r.return;
    }
    b.length !== 0 && e.push({ event: t, listeners: b });
  }
  var Yw = /\r\n?/g, Gw = /\u0000|\uFFFD/g;
  function sv(e) {
    return (typeof e == "string" ? e : "" + e).replace(Yw, `
`).replace(Gw, "");
  }
  function ov(e, t) {
    return t = sv(t), sv(e) === t;
  }
  function st(e, t, r, l, c, f) {
    switch (r) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || ii(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && ii(e, "" + l);
        break;
      case "className":
        Ct(e, "class", l);
        break;
      case "tabIndex":
        Ct(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ct(e, r, l);
        break;
      case "style":
        om(e, l, f);
        break;
      case "data":
        if (t !== "object") {
          Ct(e, "data", l);
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
          typeof f == "function" && (r === "formAction" ? (t !== "input" && st(e, t, "name", c.name, c, null), st(
            e,
            t,
            "formEncType",
            c.formEncType,
            c,
            null
          ), st(
            e,
            t,
            "formMethod",
            c.formMethod,
            c,
            null
          ), st(
            e,
            t,
            "formTarget",
            c.formTarget,
            c,
            null
          )) : (st(e, t, "encType", c.encType, c, null), st(e, t, "method", c.method, c, null), st(e, t, "target", c.target, c, null)));
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
            if (c.children != null) throw Error(s(60));
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
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        sn(
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
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = xS.get(r) || r, He(e, r, l));
    }
  }
  function Ad(e, t, r, l, c, f) {
    switch (r) {
      case "style":
        om(e, l, f);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (r = l.__html, r != null) {
            if (c.children != null) throw Error(s(60));
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
        if (!Wn.hasOwnProperty(r))
          e: {
            if (r[0] === "o" && r[1] === "n" && (c = r.endsWith("Capture"), t = r.slice(2, c ? r.length - 7 : void 0), f = e[ge] || null, f = f != null ? f[r] : null, typeof f == "function" && e.removeEventListener(t, f, c), typeof l == "function")) {
              typeof f != "function" && f !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(t, l, c);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : He(e, r, l);
          }
    }
  }
  function rn(e, t, r) {
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
        var l = !1, c = !1, f;
        for (f in r)
          if (r.hasOwnProperty(f)) {
            var b = r[f];
            if (b != null)
              switch (f) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  c = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  st(e, t, f, b, r, null);
              }
          }
        c && st(e, t, "srcSet", r.srcSet, r, null), l && st(e, t, "src", r.src, r, null);
        return;
      case "input":
        Ye("invalid", e);
        var j = f = b = c = null, L = null, G = null;
        for (l in r)
          if (r.hasOwnProperty(l)) {
            var ae = r[l];
            if (ae != null)
              switch (l) {
                case "name":
                  c = ae;
                  break;
                case "type":
                  b = ae;
                  break;
                case "checked":
                  L = ae;
                  break;
                case "defaultChecked":
                  G = ae;
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
        rm(
          e,
          f,
          j,
          L,
          G,
          b,
          c,
          !1
        );
        return;
      case "select":
        Ye("invalid", e), l = b = f = null;
        for (c in r)
          if (r.hasOwnProperty(c) && (j = r[c], j != null))
            switch (c) {
              case "value":
                f = j;
                break;
              case "defaultValue":
                b = j;
                break;
              case "multiple":
                l = j;
              default:
                st(e, t, c, j, r, null);
            }
        t = f, r = b, e.multiple = !!l, t != null ? ri(e, !!l, t, !1) : r != null && ri(e, !!l, r, !0);
        return;
      case "textarea":
        Ye("invalid", e), f = c = l = null;
        for (b in r)
          if (r.hasOwnProperty(b) && (j = r[b], j != null))
            switch (b) {
              case "value":
                l = j;
                break;
              case "defaultValue":
                c = j;
                break;
              case "children":
                f = j;
                break;
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(s(91));
                break;
              default:
                st(e, t, b, j, r, null);
            }
        lm(e, l, c, f);
        return;
      case "option":
        for (L in r)
          if (r.hasOwnProperty(L) && (l = r[L], l != null))
            switch (L) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                st(e, t, L, l, r, null);
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
        for (G in r)
          if (r.hasOwnProperty(G) && (l = r[G], l != null))
            switch (G) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                st(e, t, G, l, r, null);
            }
        return;
      default:
        if (Fc(t)) {
          for (ae in r)
            r.hasOwnProperty(ae) && (l = r[ae], l !== void 0 && Ad(
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
  function Xw(e, t, r, l) {
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
        var c = null, f = null, b = null, j = null, L = null, G = null, ae = null;
        for (W in r) {
          var se = r[W];
          if (r.hasOwnProperty(W) && se != null)
            switch (W) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = se;
              default:
                l.hasOwnProperty(W) || st(e, t, W, null, l, se);
            }
        }
        for (var P in l) {
          var W = l[P];
          if (se = r[P], l.hasOwnProperty(P) && (W != null || se != null))
            switch (P) {
              case "type":
                f = W;
                break;
              case "name":
                c = W;
                break;
              case "checked":
                G = W;
                break;
              case "defaultChecked":
                ae = W;
                break;
              case "value":
                b = W;
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
                W !== se && st(
                  e,
                  t,
                  P,
                  W,
                  l,
                  se
                );
            }
        }
        qc(
          e,
          b,
          j,
          L,
          G,
          ae,
          f,
          c
        );
        return;
      case "select":
        W = b = j = P = null;
        for (f in r)
          if (L = r[f], r.hasOwnProperty(f) && L != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                W = L;
              default:
                l.hasOwnProperty(f) || st(
                  e,
                  t,
                  f,
                  null,
                  l,
                  L
                );
            }
        for (c in l)
          if (f = l[c], L = r[c], l.hasOwnProperty(c) && (f != null || L != null))
            switch (c) {
              case "value":
                P = f;
                break;
              case "defaultValue":
                j = f;
                break;
              case "multiple":
                b = f;
              default:
                f !== L && st(
                  e,
                  t,
                  c,
                  f,
                  l,
                  L
                );
            }
        t = j, r = b, l = W, P != null ? ri(e, !!r, P, !1) : !!l != !!r && (t != null ? ri(e, !!r, t, !0) : ri(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        W = P = null;
        for (j in r)
          if (c = r[j], r.hasOwnProperty(j) && c != null && !l.hasOwnProperty(j))
            switch (j) {
              case "value":
                break;
              case "children":
                break;
              default:
                st(e, t, j, null, l, c);
            }
        for (b in l)
          if (c = l[b], f = r[b], l.hasOwnProperty(b) && (c != null || f != null))
            switch (b) {
              case "value":
                P = c;
                break;
              case "defaultValue":
                W = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(s(91));
                break;
              default:
                c !== f && st(e, t, b, c, l, f);
            }
        im(e, P, W);
        return;
      case "option":
        for (var xe in r)
          if (P = r[xe], r.hasOwnProperty(xe) && P != null && !l.hasOwnProperty(xe))
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
                  P
                );
            }
        for (L in l)
          if (P = l[L], W = r[L], l.hasOwnProperty(L) && P !== W && (P != null || W != null))
            switch (L) {
              case "selected":
                e.selected = P && typeof P != "function" && typeof P != "symbol";
                break;
              default:
                st(
                  e,
                  t,
                  L,
                  P,
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
        for (var Ae in r)
          P = r[Ae], r.hasOwnProperty(Ae) && P != null && !l.hasOwnProperty(Ae) && st(e, t, Ae, null, l, P);
        for (G in l)
          if (P = l[G], W = r[G], l.hasOwnProperty(G) && P !== W && (P != null || W != null))
            switch (G) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null)
                  throw Error(s(137, t));
                break;
              default:
                st(
                  e,
                  t,
                  G,
                  P,
                  l,
                  W
                );
            }
        return;
      default:
        if (Fc(t)) {
          for (var ot in r)
            P = r[ot], r.hasOwnProperty(ot) && P !== void 0 && !l.hasOwnProperty(ot) && Ad(
              e,
              t,
              ot,
              void 0,
              l,
              P
            );
          for (ae in l)
            P = l[ae], W = r[ae], !l.hasOwnProperty(ae) || P === W || P === void 0 && W === void 0 || Ad(
              e,
              t,
              ae,
              P,
              l,
              W
            );
          return;
        }
    }
    for (var H in r)
      P = r[H], r.hasOwnProperty(H) && P != null && !l.hasOwnProperty(H) && st(e, t, H, null, l, P);
    for (se in l)
      P = l[se], W = r[se], !l.hasOwnProperty(se) || P === W || P == null && W == null || st(e, t, se, P, l, W);
  }
  function cv(e) {
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
  function Pw() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var c = r[l], f = c.transferSize, b = c.initiatorType, j = c.duration;
        if (f && j && cv(b)) {
          for (b = 0, j = c.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], G = L.startTime;
            if (G > j) break;
            var ae = L.transferSize, se = L.initiatorType;
            ae && cv(se) && (L = L.responseEnd, b += ae * (L < j ? 1 : (j - G) / (L - G)));
          }
          if (--l, t += 8 * (f + b) / (c.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var _d = null, Dd = null;
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
  function dv(e, t) {
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
  function zd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Od = null;
  function Kw() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Od ? !1 : (Od = e, !0) : (Od = null, !1);
  }
  var fv = typeof setTimeout == "function" ? setTimeout : void 0, Qw = typeof clearTimeout == "function" ? clearTimeout : void 0, hv = typeof Promise == "function" ? Promise : void 0, Zw = typeof queueMicrotask == "function" ? queueMicrotask : typeof hv < "u" ? function(e) {
    return hv.resolve(null).then(e).catch(Jw);
  } : fv;
  function Jw(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function lr(e) {
    return e === "head";
  }
  function mv(e, t) {
    var r = t, l = 0;
    do {
      var c = r.nextSibling;
      if (e.removeChild(r), c && c.nodeType === 8)
        if (r = c.data, r === "/$" || r === "/&") {
          if (l === 0) {
            e.removeChild(c), Li(t);
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
            var b = f.nextSibling, j = f.nodeName;
            f[$e] || j === "SCRIPT" || j === "STYLE" || j === "LINK" && f.rel.toLowerCase() === "stylesheet" || r.removeChild(f), f = b;
          }
        } else
          r === "body" && $l(e.ownerDocument.body);
      r = c;
    } while (r);
    Li(t);
  }
  function pv(e, t) {
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
  function kd(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var r = t;
      switch (t = t.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          kd(r), ut(r);
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
  function Ww(e, t, r, l) {
    for (; e.nodeType === 1; ) {
      var c = r;
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
              if (f !== c.rel || e.getAttribute("href") !== (c.href == null || c.href === "" ? null : c.href) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin) || e.getAttribute("title") !== (c.title == null ? null : c.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (f = e.getAttribute("src"), (f !== (c.src == null ? null : c.src) || e.getAttribute("type") !== (c.type == null ? null : c.type) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var f = c.name == null ? null : "" + c.name;
        if (c.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = In(e.nextSibling), e === null) break;
    }
    return null;
  }
  function eE(e, t, r) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function gv(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ld(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ud(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function tE(e, t) {
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
  function In(e) {
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
  var Bd = null;
  function vv(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "/$" || r === "/&") {
          if (t === 0)
            return In(e.nextSibling);
          t--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function yv(e) {
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
  function bv(e, t, r) {
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
    ut(e);
  }
  var Fn = /* @__PURE__ */ new Map(), xv = /* @__PURE__ */ new Set();
  function _o(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Oa = A.d;
  A.d = {
    f: nE,
    r: aE,
    D: rE,
    C: iE,
    L: lE,
    m: sE,
    X: cE,
    S: oE,
    M: uE
  };
  function nE() {
    var e = Oa.f(), t = wo();
    return e || t;
  }
  function aE(e) {
    var t = St(e);
    t !== null && t.tag === 5 && t.type === "form" ? Up(t) : Oa.r(e);
  }
  var zi = typeof document > "u" ? null : document;
  function Sv(e, t, r) {
    var l = zi;
    if (l && typeof t == "string" && t) {
      var c = Ln(t);
      c = 'link[rel="' + e + '"][href="' + c + '"]', typeof r == "string" && (c += '[crossorigin="' + r + '"]'), xv.has(c) || (xv.add(c), e = { rel: e, crossOrigin: r, href: t }, l.querySelector(c) === null && (t = l.createElement("link"), rn(t, "link", e), mt(t), l.head.appendChild(t)));
    }
  }
  function rE(e) {
    Oa.D(e), Sv("dns-prefetch", e, null);
  }
  function iE(e, t) {
    Oa.C(e, t), Sv("preconnect", e, t);
  }
  function lE(e, t, r) {
    Oa.L(e, t, r);
    var l = zi;
    if (l && e && t) {
      var c = 'link[rel="preload"][as="' + Ln(t) + '"]';
      t === "image" && r && r.imageSrcSet ? (c += '[imagesrcset="' + Ln(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (c += '[imagesizes="' + Ln(
        r.imageSizes
      ) + '"]')) : c += '[href="' + Ln(e) + '"]';
      var f = c;
      switch (t) {
        case "style":
          f = Oi(e);
          break;
        case "script":
          f = ki(e);
      }
      Fn.has(f) || (e = g(
        {
          rel: "preload",
          href: t === "image" && r && r.imageSrcSet ? void 0 : e,
          as: t
        },
        r
      ), Fn.set(f, e), l.querySelector(c) !== null || t === "style" && l.querySelector(Hl(f)) || t === "script" && l.querySelector(ql(f)) || (t = l.createElement("link"), rn(t, "link", e), mt(t), l.head.appendChild(t)));
    }
  }
  function sE(e, t) {
    Oa.m(e, t);
    var r = zi;
    if (r && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", c = 'link[rel="modulepreload"][as="' + Ln(l) + '"][href="' + Ln(e) + '"]', f = c;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = ki(e);
      }
      if (!Fn.has(f) && (e = g({ rel: "modulepreload", href: e }, t), Fn.set(f, e), r.querySelector(c) === null)) {
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
        l = r.createElement("link"), rn(l, "link", e), mt(l), r.head.appendChild(l);
      }
    }
  }
  function oE(e, t, r) {
    Oa.S(e, t, r);
    var l = zi;
    if (l && e) {
      var c = zt(l).hoistableStyles, f = Oi(e);
      t = t || "default";
      var b = c.get(f);
      if (!b) {
        var j = { loading: 0, preload: null };
        if (b = l.querySelector(
          Hl(f)
        ))
          j.loading = 5;
        else {
          e = g(
            { rel: "stylesheet", href: e, "data-precedence": t },
            r
          ), (r = Fn.get(f)) && Vd(e, r);
          var L = b = l.createElement("link");
          mt(L), rn(L, "link", e), L._p = new Promise(function(G, ae) {
            L.onload = G, L.onerror = ae;
          }), L.addEventListener("load", function() {
            j.loading |= 1;
          }), L.addEventListener("error", function() {
            j.loading |= 2;
          }), j.loading |= 4, Do(b, t, l);
        }
        b = {
          type: "stylesheet",
          instance: b,
          count: 1,
          state: j
        }, c.set(f, b);
      }
    }
  }
  function cE(e, t) {
    Oa.X(e, t);
    var r = zi;
    if (r && e) {
      var l = zt(r).hoistableScripts, c = ki(e), f = l.get(c);
      f || (f = r.querySelector(ql(c)), f || (e = g({ src: e, async: !0 }, t), (t = Fn.get(c)) && $d(e, t), f = r.createElement("script"), mt(f), rn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, l.set(c, f));
    }
  }
  function uE(e, t) {
    Oa.M(e, t);
    var r = zi;
    if (r && e) {
      var l = zt(r).hoistableScripts, c = ki(e), f = l.get(c);
      f || (f = r.querySelector(ql(c)), f || (e = g({ src: e, async: !0, type: "module" }, t), (t = Fn.get(c)) && $d(e, t), f = r.createElement("script"), mt(f), rn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, l.set(c, f));
    }
  }
  function wv(e, t, r, l) {
    var c = (c = ve.current) ? _o(c) : null;
    if (!c) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (t = Oi(r.href), r = zt(
          c
        ).hoistableStyles, l = r.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = Oi(r.href);
          var f = zt(
            c
          ).hoistableStyles, b = f.get(e);
          if (b || (c = c.ownerDocument || c, b = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, b), (f = c.querySelector(
            Hl(e)
          )) && !f._p && (b.instance = f, b.state.loading = 5), Fn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Fn.set(e, r), f || dE(
            c,
            e,
            r,
            b.state
          ))), t && l === null)
            throw Error(s(528, ""));
          return b;
        }
        if (t && l !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = r.async, r = r.src, typeof r == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ki(r), r = zt(
          c
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
    return 'href="' + Ln(e) + '"';
  }
  function Hl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Ev(e) {
    return g({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function dE(e, t, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), rn(t, "link", r), mt(t), e.head.appendChild(t));
  }
  function ki(e) {
    return '[src="' + Ln(e) + '"]';
  }
  function ql(e) {
    return "script[async]" + e;
  }
  function jv(e, t, r) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Ln(r.href) + '"]'
          );
          if (l)
            return t.instance = l, mt(l), l;
          var c = g({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), mt(l), rn(l, "style", c), Do(l, r.precedence, e), t.instance = l;
        case "stylesheet":
          c = Oi(r.href);
          var f = e.querySelector(
            Hl(c)
          );
          if (f)
            return t.state.loading |= 4, t.instance = f, mt(f), f;
          l = Ev(r), (c = Fn.get(c)) && Vd(l, c), f = (e.ownerDocument || e).createElement("link"), mt(f);
          var b = f;
          return b._p = new Promise(function(j, L) {
            b.onload = j, b.onerror = L;
          }), rn(f, "link", l), t.state.loading |= 4, Do(f, r.precedence, e), t.instance = f;
        case "script":
          return f = ki(r.src), (c = e.querySelector(
            ql(f)
          )) ? (t.instance = c, mt(c), c) : (l = r, (c = Fn.get(f)) && (l = g({}, r), $d(l, c)), e = e.ownerDocument || e, c = e.createElement("script"), mt(c), rn(c, "link", l), e.head.appendChild(c), t.instance = c);
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
    ), c = l.length ? l[l.length - 1] : null, f = c, b = 0; b < l.length; b++) {
      var j = l[b];
      if (j.dataset.precedence === t) f = j;
      else if (f !== c) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = r.nodeType === 9 ? r.head : r, t.insertBefore(e, t.firstChild));
  }
  function Vd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function $d(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var zo = null;
  function Nv(e, t, r) {
    if (zo === null) {
      var l = /* @__PURE__ */ new Map(), c = zo = /* @__PURE__ */ new Map();
      c.set(r, l);
    } else
      c = zo, l = c.get(r), l || (l = /* @__PURE__ */ new Map(), c.set(r, l));
    if (l.has(e)) return l;
    for (l.set(e, null), r = r.getElementsByTagName(e), c = 0; c < r.length; c++) {
      var f = r[c];
      if (!(f[$e] || f[pe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var b = f.getAttribute(t) || "";
        b = e + b;
        var j = l.get(b);
        j ? j.push(f) : l.set(b, [f]);
      }
    }
    return l;
  }
  function Tv(e, t, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function fE(e, t, r) {
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
  function Cv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function hE(e, t, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var c = Oi(l.href), f = t.querySelector(
          Hl(c)
        );
        if (f) {
          t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Oo.bind(e), t.then(e, e)), r.state.loading |= 4, r.instance = f, mt(f);
          return;
        }
        f = t.ownerDocument || t, l = Ev(l), (c = Fn.get(c)) && Vd(l, c), f = f.createElement("link"), mt(f);
        var b = f;
        b._p = new Promise(function(j, L) {
          b.onload = j, b.onerror = L;
        }), rn(f, "link", l), r.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, t), (t = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Oo.bind(e), t.addEventListener("load", r), t.addEventListener("error", r));
    }
  }
  var Hd = 0;
  function mE(e, t) {
    return e.stylesheets && e.count === 0 && Lo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Hd === 0 && (Hd = 62500 * Pw());
      var c = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > Hd ? 50 : 800) + t
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(c);
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, ko = /* @__PURE__ */ new Map(), t.forEach(pE, e), ko = null, Oo.call(e));
  }
  function pE(e, t) {
    if (!(t.state.loading & 4)) {
      var r = ko.get(e);
      if (r) var l = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), ko.set(e, r);
        for (var c = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < c.length; f++) {
          var b = c[f];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") && (r.set(b.dataset.precedence, b), l = b);
        }
        l && r.set(null, l);
      }
      c = t.instance, b = c.getAttribute("data-precedence"), f = r.get(b) || l, f === l && r.set(null, c), r.set(b, c), this.count++, l = Oo.bind(this), c.addEventListener("load", l), c.addEventListener("error", l), f ? f.parentNode.insertBefore(c, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(c, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Il = {
    $$typeof: R,
    Provider: null,
    Consumer: null,
    _currentValue: V,
    _currentValue2: V,
    _threadCount: 0
  };
  function gE(e, t, r, l, c, f, b, j, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = l, this.onUncaughtError = c, this.onCaughtError = f, this.onRecoverableError = b, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Rv(e, t, r, l, c, f, b, j, L, G, ae, se) {
    return e = new gE(
      e,
      t,
      r,
      b,
      L,
      G,
      ae,
      se,
      j
    ), t = 1, f === !0 && (t |= 24), f = jn(3, null, null, t), e.current = f, f.stateNode = e, t = xu(), t.refCount++, e.pooledCache = t, t.refCount++, f.memoizedState = {
      element: l,
      isDehydrated: r,
      cache: t
    }, ju(f), e;
  }
  function Mv(e) {
    return e ? (e = fi, e) : fi;
  }
  function Av(e, t, r, l, c, f) {
    c = Mv(c), l.context === null ? l.context = c : l.pendingContext = c, l = Ka(t), l.payload = { element: r }, f = f === void 0 ? null : f, f !== null && (l.callback = f), r = Qa(e, l, t), r !== null && (bn(r, e, t), Sl(r, e, t));
  }
  function _v(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function qd(e, t) {
    _v(e, t), (e = e.alternate) && _v(e, t);
  }
  function Dv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = _r(e, 67108864);
      t !== null && bn(t, e, 67108864), qd(e, 67108864);
    }
  }
  function zv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Mn();
      t = $(t);
      var r = _r(e, t);
      r !== null && bn(r, e, t), qd(e, t);
    }
  }
  var Uo = !0;
  function vE(e, t, r, l) {
    var c = O.T;
    O.T = null;
    var f = A.p;
    try {
      A.p = 2, Id(e, t, r, l);
    } finally {
      A.p = f, O.T = c;
    }
  }
  function yE(e, t, r, l) {
    var c = O.T;
    O.T = null;
    var f = A.p;
    try {
      A.p = 8, Id(e, t, r, l);
    } finally {
      A.p = f, O.T = c;
    }
  }
  function Id(e, t, r, l) {
    if (Uo) {
      var c = Fd(l);
      if (c === null)
        Md(
          e,
          t,
          l,
          Bo,
          r
        ), kv(e, l);
      else if (xE(
        c,
        e,
        t,
        r,
        l
      ))
        l.stopPropagation();
      else if (kv(e, l), t & 4 && -1 < bE.indexOf(e)) {
        for (; c !== null; ) {
          var f = St(c);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var b = hn(f.pendingLanes);
                  if (b !== 0) {
                    var j = f;
                    for (j.pendingLanes |= 2, j.entangledLanes |= 2; b; ) {
                      var L = 1 << 31 - Yt(b);
                      j.entanglements[1] |= L, b &= ~L;
                    }
                    ha(f), (et & 6) === 0 && (xo = qt() + 500, Ul(0));
                  }
                }
                break;
              case 31:
              case 13:
                j = _r(f, 2), j !== null && bn(j, f, 2), wo(), qd(f, 2);
            }
          if (f = Fd(l), f === null && Md(
            e,
            t,
            l,
            Bo,
            r
          ), f === c) break;
          c = f;
        }
        c !== null && l.stopPropagation();
      } else
        Md(
          e,
          t,
          l,
          null,
          r
        );
    }
  }
  function Fd(e) {
    return e = Gc(e), Yd(e);
  }
  var Bo = null;
  function Yd(e) {
    if (Bo = null, e = it(e), e !== null) {
      var t = u(e);
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
  function Ov(e) {
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
          case ze:
            return 2;
          case Ke:
            return 8;
          case tt:
          case It:
            return 32;
          case Ft:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Gd = !1, sr = null, or = null, cr = null, Fl = /* @__PURE__ */ new Map(), Yl = /* @__PURE__ */ new Map(), ur = [], bE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function kv(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        sr = null;
        break;
      case "dragenter":
      case "dragleave":
        or = null;
        break;
      case "mouseover":
      case "mouseout":
        cr = null;
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
  function Gl(e, t, r, l, c, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: t,
      domEventName: r,
      eventSystemFlags: l,
      nativeEvent: f,
      targetContainers: [c]
    }, t !== null && (t = St(t), t !== null && Dv(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, c !== null && t.indexOf(c) === -1 && t.push(c), e);
  }
  function xE(e, t, r, l, c) {
    switch (t) {
      case "focusin":
        return sr = Gl(
          sr,
          e,
          t,
          r,
          l,
          c
        ), !0;
      case "dragenter":
        return or = Gl(
          or,
          e,
          t,
          r,
          l,
          c
        ), !0;
      case "mouseover":
        return cr = Gl(
          cr,
          e,
          t,
          r,
          l,
          c
        ), !0;
      case "pointerover":
        var f = c.pointerId;
        return Fl.set(
          f,
          Gl(
            Fl.get(f) || null,
            e,
            t,
            r,
            l,
            c
          )
        ), !0;
      case "gotpointercapture":
        return f = c.pointerId, Yl.set(
          f,
          Gl(
            Yl.get(f) || null,
            e,
            t,
            r,
            l,
            c
          )
        ), !0;
    }
    return !1;
  }
  function Lv(e) {
    var t = it(e.target);
    if (t !== null) {
      var r = u(t);
      if (r !== null) {
        if (t = r.tag, t === 13) {
          if (t = h(r), t !== null) {
            e.blockedOn = t, de(e.priority, function() {
              zv(r);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(r), t !== null) {
            e.blockedOn = t, de(e.priority, function() {
              zv(r);
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
      var r = Fd(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(
          r.type,
          r
        );
        Yc = l, r.target.dispatchEvent(l), Yc = null;
      } else
        return t = St(r), t !== null && Dv(t), e.blockedOn = r, !1;
      t.shift();
    }
    return !0;
  }
  function Uv(e, t, r) {
    Vo(e) && r.delete(t);
  }
  function SE() {
    Gd = !1, sr !== null && Vo(sr) && (sr = null), or !== null && Vo(or) && (or = null), cr !== null && Vo(cr) && (cr = null), Fl.forEach(Uv), Yl.forEach(Uv);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Gd || (Gd = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      SE
    )));
  }
  var Ho = null;
  function Bv(e) {
    Ho !== e && (Ho = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Ho === e && (Ho = null);
        for (var t = 0; t < e.length; t += 3) {
          var r = e[t], l = e[t + 1], c = e[t + 2];
          if (typeof l != "function") {
            if (Yd(l || r) === null)
              continue;
            break;
          }
          var f = St(r);
          f !== null && (e.splice(t, 3), t -= 3, Fu(
            f,
            {
              pending: !0,
              data: c,
              method: r.method,
              action: l
            },
            l,
            c
          ));
        }
      }
    ));
  }
  function Li(e) {
    function t(L) {
      return $o(L, e);
    }
    sr !== null && $o(sr, e), or !== null && $o(or, e), cr !== null && $o(cr, e), Fl.forEach(t), Yl.forEach(t);
    for (var r = 0; r < ur.length; r++) {
      var l = ur[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < ur.length && (r = ur[0], r.blockedOn === null); )
      Lv(r), r.blockedOn === null && ur.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var c = r[l], f = r[l + 1], b = c[ge] || null;
        if (typeof f == "function")
          b || Bv(r);
        else if (b) {
          var j = null;
          if (f && f.hasAttribute("formAction")) {
            if (c = f, b = f[ge] || null)
              j = b.formAction;
            else if (Yd(c) !== null) continue;
          } else j = b.action;
          typeof j == "function" ? r[l + 1] = j : (r.splice(l, 3), l -= 3), Bv(r);
        }
      }
  }
  function Vv() {
    function e(f) {
      f.canIntercept && f.info === "react-transition" && f.intercept({
        handler: function() {
          return new Promise(function(b) {
            return c = b;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      c !== null && (c(), c = null), l || setTimeout(r, 20);
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
      var l = !1, c = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(r, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), c !== null && (c(), c = null);
      };
    }
  }
  function Xd(e) {
    this._internalRoot = e;
  }
  qo.prototype.render = Xd.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var r = t.current, l = Mn();
    Av(r, l, e, t, null, null);
  }, qo.prototype.unmount = Xd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Av(e.current, 2, null, e, null, null), wo(), t[Ee] = null;
    }
  };
  function qo(e) {
    this._internalRoot = e;
  }
  qo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ue();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < ur.length && t !== 0 && t < ur[r].priority; r++) ;
      ur.splice(r, 0, e), r === 0 && Lv(e);
    }
  };
  var $v = a.version;
  if ($v !== "19.2.5")
    throw Error(
      s(
        527,
        $v,
        "19.2.5"
      )
    );
  A.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = p(t), e = e !== null ? x(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var wE = {
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
        Zn = Io.inject(
          wE
        ), Wt = Io;
      } catch {
      }
  }
  return Pl.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var r = !1, l = "", c = Xp, f = Pp, b = Kp;
    return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (c = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (b = t.onRecoverableError)), t = Rv(
      e,
      1,
      !1,
      null,
      null,
      r,
      l,
      null,
      c,
      f,
      b,
      Vv
    ), e[Ee] = t.current, Rd(e), new Xd(t);
  }, Pl.hydrateRoot = function(e, t, r) {
    if (!o(e)) throw Error(s(299));
    var l = !1, c = "", f = Xp, b = Pp, j = Kp, L = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (c = r.identifierPrefix), r.onUncaughtError !== void 0 && (f = r.onUncaughtError), r.onCaughtError !== void 0 && (b = r.onCaughtError), r.onRecoverableError !== void 0 && (j = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), t = Rv(
      e,
      1,
      !0,
      t,
      r ?? null,
      l,
      c,
      L,
      f,
      b,
      j,
      Vv
    ), t.context = Mv(null), r = t.current, l = Mn(), l = $(l), c = Ka(l), c.callback = null, Qa(r, c, l), r = l, t.current.lanes = r, rt(t, r), ha(t), e[Ee] = t.current, Rd(e), new qo(t);
  }, Pl.version = "19.2.5", Pl;
}
var Qv;
function zE() {
  if (Qv) return Qd.exports;
  Qv = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Qd.exports = DE(), Qd.exports;
}
var OE = zE();
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
var Hb = (n) => {
  throw TypeError(n);
}, kE = (n, a, i) => a.has(n) || Hb("Cannot " + i), ef = (n, a, i) => (kE(n, a, "read from private field"), i ? i.call(n) : a.get(n)), LE = (n, a, i) => a.has(n) ? Hb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, i);
function Zv(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function UE(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: s = !1 } = n, o;
  o = a.map(
    (E, w) => x(
      E,
      typeof E == "string" ? null : E.state,
      w === 0 ? "default" : void 0,
      typeof E == "string" ? void 0 : E.unstable_mask
    )
  );
  let u = v(
    i ?? o.length - 1
  ), h = "POP", m = null;
  function v(E) {
    return Math.min(Math.max(E, 0), o.length - 1);
  }
  function p() {
    return o[u];
  }
  function x(E, w = null, N, C) {
    let T = Ff(
      o ? p().pathname : "/",
      E,
      w,
      N,
      C
    );
    return At(
      T.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        E
      )}`
    ), T;
  }
  function g(E) {
    return typeof E == "string" ? E : pa(E);
  }
  return {
    get index() {
      return u;
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
      let w = typeof E == "string" ? ia(E) : E;
      return {
        pathname: w.pathname || "",
        search: w.search || "",
        hash: w.hash || ""
      };
    },
    push(E, w) {
      h = "PUSH";
      let N = Zv(E) ? E : x(E, w);
      u += 1, o.splice(u, o.length, N), s && m && m({ action: h, location: N, delta: 1 });
    },
    replace(E, w) {
      h = "REPLACE";
      let N = Zv(E) ? E : x(E, w);
      o[u] = N, s && m && m({ action: h, location: N, delta: 0 });
    },
    go(E) {
      h = "POP";
      let w = v(u + E), N = o[w];
      u = w, m && m({ action: h, location: N, delta: E });
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
function At(n, a) {
  if (!n) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function BE() {
  return Math.random().toString(36).substring(2, 10);
}
function Ff(n, a, i = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? ia(a) : a,
    state: i,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || BE(),
    unstable_mask: o
  };
}
function pa({
  pathname: n = "/",
  search: a = "",
  hash: i = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (n += i.charAt(0) === "#" ? i : "#" + i), n;
}
function ia(n) {
  let a = {};
  if (n) {
    let i = n.indexOf("#");
    i >= 0 && (a.hash = n.substring(i), n = n.substring(0, i));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function VE(n, a = !1) {
  let i = "http://localhost";
  typeof window < "u" && (i = window.location.origin !== "null" ? window.location.origin : window.location.href), qe(i, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : pa(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = i + s), new URL(s, i);
}
var ls, Jv = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (LE(this, ls, /* @__PURE__ */ new Map()), n)
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
    if (ef(this, ls).has(n))
      return ef(this, ls).get(n);
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
    ef(this, ls).set(n, a);
  }
};
ls = /* @__PURE__ */ new WeakMap();
var $E = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function HE(n) {
  return $E.has(
    n
  );
}
var qE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function IE(n) {
  return qE.has(
    n
  );
}
function FE(n) {
  return n.index === !0;
}
function hs(n, a, i = [], s = {}, o = !1) {
  return n.map((u, h) => {
    let m = [...i, String(h)], v = typeof u.id == "string" ? u.id : m.join("-");
    if (qe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), qe(
      o || !s[v],
      `Found a route id collision on id "${v}".  Route id's must be globally unique within Data Router usages`
    ), FE(u)) {
      let p = {
        ...u,
        id: v
      };
      return s[v] = Wv(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...u,
        id: v,
        children: void 0
      };
      return s[v] = Wv(
        p,
        a(p)
      ), u.children && (p.children = hs(
        u.children,
        a,
        m,
        s,
        o
      )), p;
    }
  });
}
function Wv(n, a) {
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
function gr(n, a, i = "/") {
  return ss(n, a, i, !1);
}
function ss(n, a, i, s) {
  let o = typeof a == "string" ? ia(a) : a, u = Kn(o.pathname || "/", i);
  if (u == null)
    return null;
  let h = qb(n);
  GE(h);
  let m = null;
  for (let v = 0; m == null && v < h.length; ++v) {
    let p = aj(u);
    m = tj(
      h[v],
      p,
      s
    );
  }
  return m;
}
function YE(n, a) {
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
function qb(n, a = [], i = [], s = "", o = !1) {
  let u = (h, m, v = o, p) => {
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
    let g = Gn([s, x.relativePath]), S = i.concat(x);
    h.children && h.children.length > 0 && (qe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      h.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), qb(
      h.children,
      a,
      S,
      g,
      v
    )), !(h.path == null && !h.index) && a.push({
      path: g,
      score: WE(g, h.index),
      routesMeta: S
    });
  };
  return n.forEach((h, m) => {
    if (h.path === "" || !h.path?.includes("?"))
      u(h, m);
    else
      for (let v of Ib(h.path))
        u(h, m, !0, v);
  }), a;
}
function Ib(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [i, ...s] = a, o = i.endsWith("?"), u = i.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [u, ""] : [u];
  let h = Ib(s.join("/")), m = [];
  return m.push(
    ...h.map(
      (v) => v === "" ? u : [u, v].join("/")
    )
  ), o && m.push(...h), m.map(
    (v) => n.startsWith("/") && v === "" ? "/" : v
  );
}
function GE(n) {
  n.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : ej(
      a.routesMeta.map((s) => s.childrenIndex),
      i.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var XE = /^:[\w-]+$/, PE = 3, KE = 2, QE = 1, ZE = 10, JE = -2, ey = (n) => n === "*";
function WE(n, a) {
  let i = n.split("/"), s = i.length;
  return i.some(ey) && (s += JE), a && (s += KE), i.filter((o) => !ey(o)).reduce(
    (o, u) => o + (XE.test(u) ? PE : u === "" ? QE : ZE),
    s
  );
}
function ej(n, a) {
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
function tj(n, a, i = !1) {
  let { routesMeta: s } = n, o = {}, u = "/", h = [];
  for (let m = 0; m < s.length; ++m) {
    let v = s[m], p = m === s.length - 1, x = u === "/" ? a : a.slice(u.length) || "/", g = pc(
      { path: v.relativePath, caseSensitive: v.caseSensitive, end: p },
      x
    ), S = v.route;
    if (!g && p && i && !s[s.length - 1].route.index && (g = pc(
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
      pathname: Gn([u, g.pathname]),
      pathnameBase: lj(
        Gn([u, g.pathnameBase])
      ),
      route: S
    }), g.pathnameBase !== "/" && (u = Gn([u, g.pathnameBase]));
  }
  return h;
}
function pc(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [i, s] = nj(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(i);
  if (!o) return null;
  let u = o[0], h = u.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: s.reduce(
      (p, { paramName: x, isOptional: g }, S) => {
        if (x === "*") {
          let w = m[S] || "";
          h = u.slice(0, u.length - w.length).replace(/(.)\/+$/, "$1");
        }
        const E = m[S];
        return g && !E ? p[x] = void 0 : p[x] = (E || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: u,
    pathnameBase: h,
    pattern: n
  };
}
function nj(n, a = !1, i = !0) {
  At(
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
function aj(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return At(
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
function rj({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : Gn([n, a]);
}
var Fb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, bh = (n) => Fb.test(n);
function ij(n, a = "/") {
  let {
    pathname: i,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? ia(n) : n, u;
  return i ? (i = Sh(i), i.startsWith("/") ? u = ty(i.substring(1), "/") : u = ty(i, a)) : u = a, {
    pathname: u,
    search: sj(s),
    hash: oj(o)
  };
}
function ty(n, a) {
  let i = gc(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
  }), i.length > 1 ? i.join("/") : "/";
}
function tf(n, a, i, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Yb(n) {
  return n.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function xh(n) {
  let a = Yb(n);
  return a.map(
    (i, s) => s === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function Rc(n, a, i, s = !1) {
  let o;
  typeof n == "string" ? o = ia(n) : (o = { ...n }, qe(
    !o.pathname || !o.pathname.includes("?"),
    tf("?", "pathname", "search", o)
  ), qe(
    !o.pathname || !o.pathname.includes("#"),
    tf("#", "pathname", "hash", o)
  ), qe(
    !o.search || !o.search.includes("#"),
    tf("#", "search", "hash", o)
  ));
  let u = n === "" || o.pathname === "", h = u ? "/" : o.pathname, m;
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
  let v = ij(o, m), p = h && h !== "/" && h.endsWith("/"), x = (u || h === ".") && i.endsWith("/");
  return !v.pathname.endsWith("/") && (p || x) && (v.pathname += "/"), v;
}
var Sh = (n) => n.replace(/\/\/+/g, "/"), Gn = (n) => Sh(n.join("/")), gc = (n) => n.replace(/\/+$/, ""), lj = (n) => gc(n).replace(/^\/*/, "/"), sj = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, oj = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, cj = (n, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let s = new Headers(i.headers);
  return s.set("Location", n), new Response(null, { ...i, headers: s });
}, Mc = class {
  constructor(n, a, i, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function ms(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function Ss(n) {
  let a = n.map((i) => i.route.path).filter(Boolean);
  return Gn(a) || "/";
}
var Gb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Xb(n, a) {
  let i = n;
  if (typeof i != "string" || !Fb.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let s = i, o = !1;
  if (Gb)
    try {
      let u = new URL(window.location.href), h = i.startsWith("//") ? new URL(u.protocol + i) : new URL(i), m = Kn(h.pathname, a);
      h.origin === u.origin && m != null ? i = m + h.search + h.hash : o = !0;
    } catch {
      At(
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
var yr = Symbol("Uninstrumented");
function uj(n, a) {
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
      instrument(u) {
        let h = Object.keys(i);
        for (let m of h)
          u[m] && i[m].push(u[m]);
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
    ["middleware", "loader", "action"].forEach((u) => {
      let h = o[u], m = i[`lazy.${u}`];
      if (typeof h == "function" && m.length > 0) {
        let v = Fi(m, h, () => {
        });
        v && (s.lazy = Object.assign(s.lazy || {}, {
          [u]: v
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let u = a[o];
    if (typeof u == "function" && i[o].length > 0) {
      let h = u[yr] ?? u, m = Fi(
        i[o],
        h,
        (...v) => ny(v[0])
      );
      m && (o === "loader" && h.hydrate === !0 && (m.hydrate = !0), m[yr] = h, s[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let u = o[yr] ?? o, h = Fi(
      i.middleware,
      u,
      (...m) => ny(m[0])
    );
    return h ? (h[yr] = u, h) : o;
  })), s;
}
function dj(n, a) {
  let i = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (s) => s({
      instrument(o) {
        let u = Object.keys(o);
        for (let h of u)
          o[h] && i[h].push(o[h]);
      }
    })
  ), i.navigate.length > 0) {
    let s = n.navigate[yr] ?? n.navigate, o = Fi(
      i.navigate,
      s,
      (...u) => {
        let [h, m] = u;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? pa(h) : ".",
          ...ay(n, m ?? {})
        };
      }
    );
    o && (o[yr] = s, n.navigate = o);
  }
  if (i.fetch.length > 0) {
    let s = n.fetch[yr] ?? n.fetch, o = Fi(i.fetch, s, (...u) => {
      let [h, , m, v] = u;
      return {
        href: m ?? ".",
        fetcherKey: h,
        ...ay(n, v ?? {})
      };
    });
    o && (o[yr] = s, n.fetch = o);
  }
  return n;
}
function Fi(n, a, i) {
  return n.length === 0 ? null : async (...s) => {
    let o = await Pb(
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
async function Pb(n, a, i, s) {
  let o = n[s], u;
  if (o) {
    let h, m = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = Pb(n, a, i, s - 1), u = await h, qe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (v) {
      console.error("An instrumentation function threw an error:", v);
    }
    h || await m(), await h;
  } else
    try {
      u = { type: "success", value: await i() };
    } catch (h) {
      u = { type: "error", value: h };
    }
  return u || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function ny(n) {
  let { request: a, context: i, params: s, unstable_pattern: o } = n;
  return {
    request: fj(a),
    params: { ...s },
    unstable_pattern: o,
    context: hj(i)
  };
}
function ay(n, a) {
  return {
    currentUrl: pa(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function fj(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function hj(n) {
  if (pj(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var mj = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function pj(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === mj;
}
var Kb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], gj = new Set(
  Kb
), vj = [
  "GET",
  ...Kb
], yj = new Set(vj), Qb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), bj = /* @__PURE__ */ new Set([307, 308]), nf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, xj = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Kl = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, Sj = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), Zb = "remix-router-transitions", Jb = Symbol("ResetLoaderData");
function wj(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  qe(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || Sj, u = o;
  if (n.unstable_instrumentations) {
    let z = n.unstable_instrumentations;
    u = ($) => ({
      ...o($),
      ...uj(
        z.map((I) => I.route).filter(Boolean),
        $
      )
    });
  }
  let h = {}, m = hs(
    n.routes,
    u,
    void 0,
    h
  ), v, p = n.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let x = n.dataStrategy || Cj, g = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, E = /* @__PURE__ */ new Set(), w = null, N = null, C = null, T = n.hydrationData != null, k = gr(m, n.history.location, p), R = !1, _ = null, K, ee;
  if (k == null && !n.patchRoutesOnNavigation) {
    let z = Yn(404, {
      pathname: n.history.location.pathname
    }), { matches: $, route: I } = Fo(m);
    K = !0, ee = !K, k = $, _ = { [I.id]: z };
  } else if (k && !n.hydrationData && wn(
    k,
    m,
    n.history.location.pathname
  ).active && (k = null), k)
    if (k.some((z) => z.route.lazy))
      K = !1, ee = !K;
    else if (!k.some((z) => wh(z.route)))
      K = !0, ee = !K;
    else {
      let z = n.hydrationData ? n.hydrationData.loaderData : null, $ = n.hydrationData ? n.hydrationData.errors : null, I = k;
      if ($) {
        let ue = k.findIndex(
          (de) => $[de.route.id] !== void 0
        );
        I = I.slice(0, ue + 1);
      }
      ee = !1, K = !0, I.forEach((ue) => {
        let de = Wb(ue.route, z, $);
        ee = ee || de.renderFallback, K = K && !de.shouldLoad;
      });
    }
  else {
    K = !1, ee = !K, k = [];
    let z = wn(
      null,
      m,
      n.history.location.pathname
    );
    z.active && z.matches && (R = !0, k = z.matches);
  }
  let te, D = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: k,
    initialized: K,
    renderFallback: ee,
    navigation: nf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || _,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, q = "POP", F = null, oe = !1, ie, U = !1, ne = /* @__PURE__ */ new Map(), Q = null, O = !1, A = !1, V = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Map(), re = 0, M = -1, J = /* @__PURE__ */ new Map(), Z = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Set(), _e = /* @__PURE__ */ new Map(), Me, Ve = null;
  function Jt() {
    if (S = n.history.listen(
      ({ action: z, location: $, delta: I }) => {
        if (Me) {
          Me(), Me = void 0;
          return;
        }
        At(
          _e.size === 0 || I != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ue = sa({
          currentLocation: D.location,
          nextLocation: $,
          historyAction: z
        });
        if (ue && I != null) {
          let de = new Promise((Se) => {
            Me = Se;
          });
          n.history.go(I * -1), Jn(ue, {
            state: "blocked",
            location: $,
            proceed() {
              Jn(ue, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: $
              }), de.then(() => n.history.go(I));
            },
            reset() {
              let Se = new Map(D.blockers);
              Se.set(ue, Kl), We({ blockers: Se });
            }
          }), F?.resolve(), F = null;
          return;
        }
        return De(z, $);
      }
    ), i) {
      Yj(a, ne);
      let z = () => Gj(a, ne);
      a.addEventListener("pagehide", z), Q = () => a.removeEventListener("pagehide", z);
    }
    return D.initialized || De("POP", D.location, {
      initialHydration: !0
    }), te;
  }
  function Pt() {
    S && S(), Q && Q(), E.clear(), ie && ie.abort(), D.fetchers.forEach((z, $) => Zn($)), D.blockers.forEach((z, $) => ga($));
  }
  function _t(z) {
    return E.add(z), () => E.delete(z);
  }
  function We(z, $ = {}) {
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
    let I = [], ue = [];
    D.fetchers.forEach((de, Se) => {
      de.state === "idle" && (ve.has(Se) ? I.push(Se) : ue.push(Se));
    }), ve.forEach((de) => {
      !D.fetchers.has(de) && !X.has(de) && I.push(de);
    }), [...E].forEach(
      (de) => de(D, {
        deletedFetchers: I,
        newErrors: z.errors ?? null,
        viewTransitionOpts: $.viewTransitionOpts,
        flushSync: $.flushSync === !0
      })
    ), I.forEach((de) => Zn(de)), ue.forEach((de) => D.fetchers.delete(de));
  }
  function pt(z, $, { flushSync: I } = {}) {
    let ue = D.actionData != null && D.navigation.formMethod != null && cn(D.navigation.formMethod) && D.navigation.state === "loading" && z.state?._isRedirect !== !0, de;
    $.actionData ? Object.keys($.actionData).length > 0 ? de = $.actionData : de = null : ue ? de = D.actionData : de = null;
    let Se = $.loaderData ? my(
      D.loaderData,
      $.loaderData,
      $.matches || [],
      $.errors
    ) : D.loaderData, pe = D.blockers;
    pe.size > 0 && (pe = new Map(pe), pe.forEach((Re, Ne) => pe.set(Ne, Kl)));
    let ge = O ? !1 : Gt(z, $.matches || D.matches), Ee = oe === !0 || D.navigation.formMethod != null && cn(D.navigation.formMethod) && z.state?._isRedirect !== !0;
    v && (m = v, v = void 0), O || q === "POP" || (q === "PUSH" ? n.history.push(z, z.state) : q === "REPLACE" && n.history.replace(z, z.state));
    let be;
    if (q === "POP") {
      let Re = ne.get(D.location.pathname);
      Re && Re.has(z.pathname) ? be = {
        currentLocation: D.location,
        nextLocation: z
      } : ne.has(z.pathname) && (be = {
        currentLocation: z,
        nextLocation: D.location
      });
    } else if (U) {
      let Re = ne.get(D.location.pathname);
      Re ? Re.add(z.pathname) : (Re = /* @__PURE__ */ new Set([z.pathname]), ne.set(D.location.pathname, Re)), be = {
        currentLocation: D.location,
        nextLocation: z
      };
    }
    We(
      {
        ...$,
        // matches, errors, fetchers go through as-is
        actionData: de,
        loaderData: Se,
        historyAction: q,
        location: z,
        initialized: !0,
        renderFallback: !1,
        navigation: nf,
        revalidation: "idle",
        restoreScrollPosition: ge,
        preventScrollReset: Ee,
        blockers: pe
      },
      {
        viewTransitionOpts: be,
        flushSync: I === !0
      }
    ), q = "POP", oe = !1, U = !1, O = !1, A = !1, F?.resolve(), F = null, Ve?.resolve(), Ve = null;
  }
  async function fe(z, $) {
    if (F?.resolve(), F = null, typeof z == "number") {
      F || (F = yy());
      let ut = F.promise;
      return n.history.go(z), ut;
    }
    let I = Yf(
      D.location,
      D.matches,
      p,
      z,
      $?.fromRouteId,
      $?.relative
    ), { path: ue, submission: de, error: Se } = ry(
      !1,
      I,
      $
    ), pe;
    $?.unstable_mask && (pe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof $.unstable_mask == "string" ? ia($.unstable_mask) : {
        ...D.location.unstable_mask,
        ...$.unstable_mask
      }
    });
    let ge = D.location, Ee = Ff(
      ge,
      ue,
      $ && $.state,
      void 0,
      pe
    );
    Ee = {
      ...Ee,
      ...n.history.encodeLocation(Ee)
    };
    let be = $ && $.replace != null ? $.replace : void 0, Re = "PUSH";
    be === !0 ? Re = "REPLACE" : be === !1 || de != null && cn(de.formMethod) && de.formAction === D.location.pathname + D.location.search && (Re = "REPLACE");
    let Ne = $ && "preventScrollReset" in $ ? $.preventScrollReset === !0 : void 0, Qe = ($ && $.flushSync) === !0, $e = sa({
      currentLocation: ge,
      nextLocation: Ee,
      historyAction: Re
    });
    if ($e) {
      Jn($e, {
        state: "blocked",
        location: Ee,
        proceed() {
          Jn($e, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Ee
          }), fe(z, $);
        },
        reset() {
          let ut = new Map(D.blockers);
          ut.set($e, Kl), We({ blockers: ut });
        }
      });
      return;
    }
    await De(Re, Ee, {
      submission: de,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Se,
      preventScrollReset: Ne,
      replace: $ && $.replace,
      enableViewTransition: $ && $.viewTransition,
      flushSync: Qe,
      callSiteDefaultShouldRevalidate: $ && $.unstable_defaultShouldRevalidate
    });
  }
  function ke() {
    Ve || (Ve = yy()), tt(), We({ revalidation: "loading" });
    let z = Ve.promise;
    return D.navigation.state === "submitting" ? z : D.navigation.state === "idle" ? (De(D.historyAction, D.location, {
      startUninterruptedRevalidation: !0
    }), z) : (De(
      q || D.historyAction,
      D.navigation.location,
      {
        overrideNavigation: D.navigation,
        // Proxy through any rending view transition
        enableViewTransition: U === !0
      }
    ), z);
  }
  async function De(z, $, I) {
    ie && ie.abort(), ie = null, q = z, O = (I && I.startUninterruptedRevalidation) === !0, Dt(D.location, D.matches), oe = (I && I.preventScrollReset) === !0, U = (I && I.enableViewTransition) === !0;
    let ue = v || m, de = I && I.overrideNavigation, Se = I?.initialHydration && D.matches && D.matches.length > 0 && !R ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      D.matches
    ) : gr(ue, $, p), pe = (I && I.flushSync) === !0;
    if (Se && D.initialized && !A && kj(D.location, $) && !(I && I.submission && cn(I.submission.formMethod))) {
      pt($, { matches: Se }, { flushSync: pe });
      return;
    }
    let ge = wn(Se, ue, $.pathname);
    if (ge.active && ge.matches && (Se = ge.matches), !Se) {
      let { error: it, notFoundMatches: St, route: Ie } = hn(
        $.pathname
      );
      pt(
        $,
        {
          matches: St,
          loaderData: {},
          errors: {
            [Ie.id]: it
          }
        },
        { flushSync: pe }
      );
      return;
    }
    ie = new AbortController();
    let Ee = qi(
      n.history,
      $,
      ie.signal,
      I && I.submission
    ), be = n.getContext ? await n.getContext() : new Jv(), Re;
    if (I && I.pendingError)
      Re = [
        vr(Se).route.id,
        { type: "error", error: I.pendingError }
      ];
    else if (I && I.submission && cn(I.submission.formMethod)) {
      let it = await Te(
        Ee,
        $,
        I.submission,
        Se,
        be,
        ge.active,
        I && I.initialHydration === !0,
        { replace: I.replace, flushSync: pe }
      );
      if (it.shortCircuited)
        return;
      if (it.pendingActionResult) {
        let [St, Ie] = it.pendingActionResult;
        if (_n(Ie) && ms(Ie.error) && Ie.error.status === 404) {
          ie = null, pt($, {
            matches: it.matches,
            loaderData: {},
            errors: {
              [St]: Ie.error
            }
          });
          return;
        }
      }
      Se = it.matches || Se, Re = it.pendingActionResult, de = af($, I.submission), pe = !1, ge.active = !1, Ee = qi(
        n.history,
        Ee.url,
        Ee.signal
      );
    }
    let {
      shortCircuited: Ne,
      matches: Qe,
      loaderData: $e,
      errors: ut
    } = await bt(
      Ee,
      $,
      Se,
      be,
      ge.active,
      de,
      I && I.submission,
      I && I.fetcherSubmission,
      I && I.replace,
      I && I.initialHydration === !0,
      pe,
      Re,
      I && I.callSiteDefaultShouldRevalidate
    );
    Ne || (ie = null, pt($, {
      matches: Qe || Se,
      ...py(Re),
      loaderData: $e,
      errors: ut
    }));
  }
  async function Te(z, $, I, ue, de, Se, pe, ge = {}) {
    tt();
    let Ee = Ij($, I);
    if (We({ navigation: Ee }, { flushSync: ge.flushSync === !0 }), Se) {
      let Ne = await rt(
        ue,
        $.pathname,
        z.signal
      );
      if (Ne.type === "aborted")
        return { shortCircuited: !0 };
      if (Ne.type === "error") {
        if (Ne.partialMatches.length === 0) {
          let { matches: $e, route: ut } = Fo(m);
          return {
            matches: $e,
            pendingActionResult: [
              ut.id,
              {
                type: "error",
                error: Ne.error
              }
            ]
          };
        }
        let Qe = vr(Ne.partialMatches).route.id;
        return {
          matches: Ne.partialMatches,
          pendingActionResult: [
            Qe,
            {
              type: "error",
              error: Ne.error
            }
          ]
        };
      } else if (Ne.matches)
        ue = Ne.matches;
      else {
        let { notFoundMatches: Qe, error: $e, route: ut } = hn(
          $.pathname
        );
        return {
          matches: Qe,
          pendingActionResult: [
            ut.id,
            {
              type: "error",
              error: $e
            }
          ]
        };
      }
    }
    let be, Re = sc(ue, $);
    if (!Re.route.action && !Re.route.lazy)
      be = {
        type: "error",
        error: Yn(405, {
          method: z.method,
          pathname: $.pathname,
          routeId: Re.route.id
        })
      };
    else {
      let Ne = Pi(
        u,
        h,
        z,
        $,
        ue,
        Re,
        pe ? [] : s,
        de
      ), Qe = await ze(
        z,
        $,
        Ne,
        de,
        null
      );
      if (be = Qe[Re.route.id], !be) {
        for (let $e of ue)
          if (Qe[$e.route.id]) {
            be = Qe[$e.route.id];
            break;
          }
      }
      if (z.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Gr(be)) {
      let Ne;
      return ge && ge.replace != null ? Ne = ge.replace : Ne = dy(
        be.response.headers.get("Location"),
        new URL(z.url),
        p,
        n.history
      ) === D.location.pathname + D.location.search, await ye(z, be, !0, {
        submission: I,
        replace: Ne
      }), { shortCircuited: !0 };
    }
    if (_n(be)) {
      let Ne = vr(ue, Re.route.id);
      return (ge && ge.replace) !== !0 && (q = "PUSH"), {
        matches: ue,
        pendingActionResult: [
          Ne.route.id,
          be,
          Re.route.id
        ]
      };
    }
    return {
      matches: ue,
      pendingActionResult: [Re.route.id, be]
    };
  }
  async function bt(z, $, I, ue, de, Se, pe, ge, Ee, be, Re, Ne, Qe) {
    let $e = Se || af($, pe), ut = pe || ge || vy($e), it = !O && !be;
    if (de) {
      if (it) {
        let Ct = xt(Ne);
        We(
          {
            navigation: $e,
            ...Ct !== void 0 ? { actionData: Ct } : {}
          },
          {
            flushSync: Re
          }
        );
      }
      let He = await rt(
        I,
        $.pathname,
        z.signal
      );
      if (He.type === "aborted")
        return { shortCircuited: !0 };
      if (He.type === "error") {
        if (He.partialMatches.length === 0) {
          let { matches: sn, route: Ot } = Fo(m);
          return {
            matches: sn,
            loaderData: {},
            errors: {
              [Ot.id]: He.error
            }
          };
        }
        let Ct = vr(He.partialMatches).route.id;
        return {
          matches: He.partialMatches,
          loaderData: {},
          errors: {
            [Ct]: He.error
          }
        };
      } else if (He.matches)
        I = He.matches;
      else {
        let { error: Ct, notFoundMatches: sn, route: Ot } = hn(
          $.pathname
        );
        return {
          matches: sn,
          loaderData: {},
          errors: {
            [Ot.id]: Ct
          }
        };
      }
    }
    let St = v || m, { dsMatches: Ie, revalidatingFetchers: zt } = iy(
      z,
      ue,
      u,
      h,
      n.history,
      D,
      I,
      ut,
      $,
      be ? [] : s,
      be === !0,
      A,
      V,
      ve,
      ce,
      Z,
      St,
      p,
      n.patchRoutesOnNavigation != null,
      Ne,
      Qe
    );
    if (M = ++re, !n.dataStrategy && !Ie.some((He) => He.shouldLoad) && !Ie.some(
      (He) => He.route.middleware && He.route.middleware.length > 0
    ) && zt.length === 0) {
      let He = ei();
      return pt(
        $,
        {
          matches: I,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ne && _n(Ne[1]) ? { [Ne[0]]: Ne[1].error } : null,
          ...py(Ne),
          ...He ? { fetchers: new Map(D.fetchers) } : {}
        },
        { flushSync: Re }
      ), { shortCircuited: !0 };
    }
    if (it) {
      let He = {};
      if (!de) {
        He.navigation = $e;
        let Ct = xt(Ne);
        Ct !== void 0 && (He.actionData = Ct);
      }
      zt.length > 0 && (He.fetchers = dn(zt)), We(He, { flushSync: Re });
    }
    zt.forEach((He) => {
      Tt(He.key), He.controller && X.set(He.key, He.controller);
    });
    let mt = () => zt.forEach((He) => Tt(He.key));
    ie && ie.signal.addEventListener(
      "abort",
      mt
    );
    let { loaderResults: qa, fetcherResults: Wn } = await Ke(
      Ie,
      zt,
      z,
      $,
      ue
    );
    if (z.signal.aborted)
      return { shortCircuited: !0 };
    ie && ie.signal.removeEventListener(
      "abort",
      mt
    ), zt.forEach((He) => X.delete(He.key));
    let Kt = Yo(qa);
    if (Kt)
      return await ye(z, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    if (Kt = Yo(Wn), Kt)
      return Z.add(Kt.key), await ye(z, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    let { loaderData: oa, errors: Tr } = hy(
      D,
      I,
      qa,
      Ne,
      zt,
      Wn
    );
    be && D.errors && (Tr = { ...D.errors, ...Tr });
    let ca = ei(), Cr = Ha(M), ti = ca || Cr || zt.length > 0;
    return {
      matches: I,
      loaderData: oa,
      errors: Tr,
      ...ti ? { fetchers: new Map(D.fetchers) } : {}
    };
  }
  function xt(z) {
    if (z && !_n(z[1]))
      return {
        [z[0]]: z[1].data
      };
    if (D.actionData)
      return Object.keys(D.actionData).length === 0 ? null : D.actionData;
  }
  function dn(z) {
    return z.forEach(($) => {
      let I = D.fetchers.get($.key), ue = Ql(
        void 0,
        I ? I.data : void 0
      );
      D.fetchers.set($.key, ue);
    }), new Map(D.fetchers);
  }
  async function Ht(z, $, I, ue) {
    Tt(z);
    let de = (ue && ue.flushSync) === !0, Se = v || m, pe = Yf(
      D.location,
      D.matches,
      p,
      I,
      $,
      ue?.relative
    ), ge = gr(Se, pe, p), Ee = wn(ge, Se, pe);
    if (Ee.active && Ee.matches && (ge = Ee.matches), !ge) {
      Ft(
        z,
        $,
        Yn(404, { pathname: pe }),
        { flushSync: de }
      );
      return;
    }
    let { path: be, submission: Re, error: Ne } = ry(
      !0,
      pe,
      ue
    );
    if (Ne) {
      Ft(z, $, Ne, { flushSync: de });
      return;
    }
    let Qe = n.getContext ? await n.getContext() : new Jv(), $e = (ue && ue.preventScrollReset) === !0;
    if (Re && cn(Re.formMethod)) {
      await On(
        z,
        $,
        be,
        ge,
        Qe,
        Ee.active,
        de,
        $e,
        Re,
        ue && ue.unstable_defaultShouldRevalidate
      );
      return;
    }
    ce.set(z, { routeId: $, path: be }), await qt(
      z,
      $,
      be,
      ge,
      Qe,
      Ee.active,
      de,
      $e,
      Re
    );
  }
  async function On(z, $, I, ue, de, Se, pe, ge, Ee, be) {
    tt(), ce.delete(z);
    let Re = D.fetchers.get(z);
    It(z, Fj(Ee, Re), {
      flushSync: pe
    });
    let Ne = new AbortController(), Qe = qi(
      n.history,
      I,
      Ne.signal,
      Ee
    );
    if (Se) {
      let gt = await rt(
        ue,
        new URL(Qe.url).pathname,
        Qe.signal,
        z
      );
      if (gt.type === "aborted")
        return;
      if (gt.type === "error") {
        Ft(z, $, gt.error, { flushSync: pe });
        return;
      } else if (gt.matches)
        ue = gt.matches;
      else {
        Ft(
          z,
          $,
          Yn(404, { pathname: I }),
          { flushSync: pe }
        );
        return;
      }
    }
    let $e = sc(ue, I);
    if (!$e.route.action && !$e.route.lazy) {
      let gt = Yn(405, {
        method: Ee.formMethod,
        pathname: I,
        routeId: $
      });
      Ft(z, $, gt, { flushSync: pe });
      return;
    }
    X.set(z, Ne);
    let ut = re, it = Pi(
      u,
      h,
      Qe,
      I,
      ue,
      $e,
      s,
      de
    ), St = await ze(
      Qe,
      I,
      it,
      de,
      z
    ), Ie = St[$e.route.id];
    if (!Ie) {
      for (let gt of it)
        if (St[gt.route.id]) {
          Ie = St[gt.route.id];
          break;
        }
    }
    if (Qe.signal.aborted) {
      X.get(z) === Ne && X.delete(z);
      return;
    }
    if (ve.has(z)) {
      if (Gr(Ie) || _n(Ie)) {
        It(z, ka(void 0));
        return;
      }
    } else {
      if (Gr(Ie))
        if (X.delete(z), M > ut) {
          It(z, ka(void 0));
          return;
        } else
          return Z.add(z), It(z, Ql(Ee)), ye(Qe, Ie, !1, {
            fetcherSubmission: Ee,
            preventScrollReset: ge
          });
      if (_n(Ie)) {
        Ft(z, $, Ie.error);
        return;
      }
    }
    let zt = D.navigation.location || D.location, mt = qi(
      n.history,
      zt,
      Ne.signal
    ), qa = v || m, Wn = D.navigation.state !== "idle" ? gr(qa, D.navigation.location, p) : D.matches;
    qe(Wn, "Didn't find any matches after fetcher action");
    let Kt = ++re;
    J.set(z, Kt);
    let oa = Ql(Ee, Ie.data);
    D.fetchers.set(z, oa);
    let { dsMatches: Tr, revalidatingFetchers: ca } = iy(
      mt,
      de,
      u,
      h,
      n.history,
      D,
      Wn,
      Ee,
      zt,
      s,
      !1,
      A,
      V,
      ve,
      ce,
      Z,
      qa,
      p,
      n.patchRoutesOnNavigation != null,
      [$e.route.id, Ie],
      be
    );
    ca.filter((gt) => gt.key !== z).forEach((gt) => {
      let ni = gt.key, ai = D.fetchers.get(ni), Ds = Ql(
        void 0,
        ai ? ai.data : void 0
      );
      D.fetchers.set(ni, Ds), Tt(ni), gt.controller && X.set(ni, gt.controller);
    }), We({ fetchers: new Map(D.fetchers) });
    let Cr = () => ca.forEach((gt) => Tt(gt.key));
    Ne.signal.addEventListener(
      "abort",
      Cr
    );
    let { loaderResults: ti, fetcherResults: He } = await Ke(
      Tr,
      ca,
      mt,
      zt,
      de
    );
    if (Ne.signal.aborted)
      return;
    if (Ne.signal.removeEventListener(
      "abort",
      Cr
    ), J.delete(z), X.delete(z), ca.forEach((gt) => X.delete(gt.key)), D.fetchers.has(z)) {
      let gt = ka(Ie.data);
      D.fetchers.set(z, gt);
    }
    let Ct = Yo(ti);
    if (Ct)
      return ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ge }
      );
    if (Ct = Yo(He), Ct)
      return Z.add(Ct.key), ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ge }
      );
    let { loaderData: sn, errors: Ot } = hy(
      D,
      Wn,
      ti,
      void 0,
      ca,
      He
    );
    Ha(Kt), D.navigation.state === "loading" && Kt > M ? (qe(q, "Expected pending action"), ie && ie.abort(), pt(D.navigation.location, {
      matches: Wn,
      loaderData: sn,
      errors: Ot,
      fetchers: new Map(D.fetchers)
    })) : (We({
      errors: Ot,
      loaderData: my(
        D.loaderData,
        sn,
        Wn,
        Ot
      ),
      fetchers: new Map(D.fetchers)
    }), A = !1);
  }
  async function qt(z, $, I, ue, de, Se, pe, ge, Ee) {
    let be = D.fetchers.get(z);
    It(
      z,
      Ql(
        Ee,
        be ? be.data : void 0
      ),
      { flushSync: pe }
    );
    let Re = new AbortController(), Ne = qi(
      n.history,
      I,
      Re.signal
    );
    if (Se) {
      let Ie = await rt(
        ue,
        new URL(Ne.url).pathname,
        Ne.signal,
        z
      );
      if (Ie.type === "aborted")
        return;
      if (Ie.type === "error") {
        Ft(z, $, Ie.error, { flushSync: pe });
        return;
      } else if (Ie.matches)
        ue = Ie.matches;
      else {
        Ft(
          z,
          $,
          Yn(404, { pathname: I }),
          { flushSync: pe }
        );
        return;
      }
    }
    let Qe = sc(ue, I);
    X.set(z, Re);
    let $e = re, ut = Pi(
      u,
      h,
      Ne,
      I,
      ue,
      Qe,
      s,
      de
    ), it = await ze(
      Ne,
      I,
      ut,
      de,
      z
    ), St = it[Qe.route.id];
    if (!St) {
      for (let Ie of ue)
        if (it[Ie.route.id]) {
          St = it[Ie.route.id];
          break;
        }
    }
    if (X.get(z) === Re && X.delete(z), !Ne.signal.aborted) {
      if (ve.has(z)) {
        It(z, ka(void 0));
        return;
      }
      if (Gr(St))
        if (M > $e) {
          It(z, ka(void 0));
          return;
        } else {
          Z.add(z), await ye(Ne, St, !1, {
            preventScrollReset: ge
          });
          return;
        }
      if (_n(St)) {
        Ft(z, $, St.error);
        return;
      }
      It(z, ka(St.data));
    }
  }
  async function ye(z, $, I, {
    submission: ue,
    fetcherSubmission: de,
    preventScrollReset: Se,
    replace: pe
  } = {}) {
    I || (F?.resolve(), F = null), $.response.headers.has("X-Remix-Revalidate") && (A = !0);
    let ge = $.response.headers.get("Location");
    qe(ge, "Expected a Location header on the redirect Response"), ge = dy(
      ge,
      new URL(z.url),
      p,
      n.history
    );
    let Ee = Ff(D.location, ge, {
      _isRedirect: !0
    });
    if (i) {
      let ut = !1;
      if ($.response.headers.has("X-Remix-Reload-Document"))
        ut = !0;
      else if (bh(ge)) {
        const it = VE(ge, !0);
        ut = // Hard reload if it's an absolute URL to a new origin
        it.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Kn(it.pathname, p) == null;
      }
      if (ut) {
        pe ? a.location.replace(ge) : a.location.assign(ge);
        return;
      }
    }
    ie = null;
    let be = pe === !0 || $.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Re, formAction: Ne, formEncType: Qe } = D.navigation;
    !ue && !de && Re && Ne && Qe && (ue = vy(D.navigation));
    let $e = ue || de;
    if (bj.has($.response.status) && $e && cn($e.formMethod))
      await De(be, Ee, {
        submission: {
          ...$e,
          formAction: ge
        },
        // Preserve these flags across redirects
        preventScrollReset: Se || oe,
        enableViewTransition: I ? U : void 0
      });
    else {
      let ut = af(
        Ee,
        ue
      );
      await De(be, Ee, {
        overrideNavigation: ut,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: de,
        // Preserve these flags across redirects
        preventScrollReset: Se || oe,
        enableViewTransition: I ? U : void 0
      });
    }
  }
  async function ze(z, $, I, ue, de) {
    let Se, pe = {};
    try {
      Se = await Mj(
        x,
        z,
        $,
        I,
        de,
        ue,
        !1
      );
    } catch (ge) {
      return I.filter((Ee) => Ee.shouldLoad).forEach((Ee) => {
        pe[Ee.route.id] = {
          type: "error",
          error: ge
        };
      }), pe;
    }
    if (z.signal.aborted)
      return pe;
    if (!cn(z.method))
      for (let ge of I) {
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
      if (Vj(Ee)) {
        let be = Ee.result;
        pe[ge] = {
          type: "redirect",
          response: zj(
            be,
            z,
            ge,
            I,
            p
          )
        };
      } else
        pe[ge] = await Dj(Ee);
    return pe;
  }
  async function Ke(z, $, I, ue, de) {
    let Se = ze(
      I,
      ue,
      z,
      de,
      null
    ), pe = Promise.all(
      $.map(async (be) => {
        if (be.matches && be.match && be.request && be.controller) {
          let Ne = (await ze(
            be.request,
            be.path,
            be.matches,
            de,
            be.key
          ))[be.match.route.id];
          return { [be.key]: Ne };
        } else
          return Promise.resolve({
            [be.key]: {
              type: "error",
              error: Yn(404, {
                pathname: be.path
              })
            }
          });
      })
    ), ge = await Se, Ee = (await pe).reduce(
      (be, Re) => Object.assign(be, Re),
      {}
    );
    return {
      loaderResults: ge,
      fetcherResults: Ee
    };
  }
  function tt() {
    A = !0, ce.forEach((z, $) => {
      X.has($) && V.add($), Tt($);
    });
  }
  function It(z, $, I = {}) {
    D.fetchers.set(z, $), We(
      { fetchers: new Map(D.fetchers) },
      { flushSync: (I && I.flushSync) === !0 }
    );
  }
  function Ft(z, $, I, ue = {}) {
    let de = vr(D.matches, $);
    Zn(z), We(
      {
        errors: {
          [de.route.id]: I
        },
        fetchers: new Map(D.fetchers)
      },
      { flushSync: (ue && ue.flushSync) === !0 }
    );
  }
  function Nr(z) {
    return he.set(z, (he.get(z) || 0) + 1), ve.has(z) && ve.delete(z), D.fetchers.get(z) || xj;
  }
  function la(z, $) {
    Tt(z, $?.reason), It(z, ka(null));
  }
  function Zn(z) {
    let $ = D.fetchers.get(z);
    X.has(z) && !($ && $.state === "loading" && J.has(z)) && Tt(z), ce.delete(z), J.delete(z), Z.delete(z), ve.delete(z), V.delete(z), D.fetchers.delete(z);
  }
  function Wt(z) {
    let $ = (he.get(z) || 0) - 1;
    $ <= 0 ? (he.delete(z), ve.add(z)) : he.set(z, $), We({ fetchers: new Map(D.fetchers) });
  }
  function Tt(z, $) {
    let I = X.get(z);
    I && (I.abort($), X.delete(z));
  }
  function Yt(z) {
    for (let $ of z) {
      let I = Nr($), ue = ka(I.data);
      D.fetchers.set($, ue);
    }
  }
  function ei() {
    let z = [], $ = !1;
    for (let I of Z) {
      let ue = D.fetchers.get(I);
      qe(ue, `Expected fetcher: ${I}`), ue.state === "loading" && (Z.delete(I), z.push(I), $ = !0);
    }
    return Yt(z), $;
  }
  function Ha(z) {
    let $ = [];
    for (let [I, ue] of J)
      if (ue < z) {
        let de = D.fetchers.get(I);
        qe(de, `Expected fetcher: ${I}`), de.state === "loading" && (Tt(I), J.delete(I), $.push(I));
      }
    return Yt($), $.length > 0;
  }
  function kn(z, $) {
    let I = D.blockers.get(z) || Kl;
    return _e.get(z) !== $ && _e.set(z, $), I;
  }
  function ga(z) {
    D.blockers.delete(z), _e.delete(z);
  }
  function Jn(z, $) {
    let I = D.blockers.get(z) || Kl;
    qe(
      I.state === "unblocked" && $.state === "blocked" || I.state === "blocked" && $.state === "blocked" || I.state === "blocked" && $.state === "proceeding" || I.state === "blocked" && $.state === "unblocked" || I.state === "proceeding" && $.state === "unblocked",
      `Invalid blocker state transition: ${I.state} -> ${$.state}`
    );
    let ue = new Map(D.blockers);
    ue.set(z, $), We({ blockers: ue });
  }
  function sa({
    currentLocation: z,
    nextLocation: $,
    historyAction: I
  }) {
    if (_e.size === 0)
      return;
    _e.size > 1 && At(!1, "A router only supports one blocker at a time");
    let ue = Array.from(_e.entries()), [de, Se] = ue[ue.length - 1], pe = D.blockers.get(de);
    if (!(pe && pe.state === "proceeding") && Se({ currentLocation: z, nextLocation: $, historyAction: I }))
      return de;
  }
  function hn(z) {
    let $ = Yn(404, { pathname: z }), I = v || m, { matches: ue, route: de } = Fo(I);
    return { notFoundMatches: ue, route: de, error: $ };
  }
  function Oe(z, $, I) {
    if (w = z, C = $, N = I || null, !T && D.navigation === nf) {
      T = !0;
      let ue = Gt(D.location, D.matches);
      ue != null && We({ restoreScrollPosition: ue });
    }
    return () => {
      w = null, C = null, N = null;
    };
  }
  function ct(z, $) {
    return N && N(
      z,
      $.map((ue) => YE(ue, D.loaderData))
    ) || z.key;
  }
  function Dt(z, $) {
    if (w && C) {
      let I = ct(z, $);
      w[I] = C();
    }
  }
  function Gt(z, $) {
    if (w) {
      let I = ct(z, $), ue = w[I];
      if (typeof ue == "number")
        return ue;
    }
    return null;
  }
  function wn(z, $, I) {
    if (n.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
          return { active: !0, matches: ss(
            $,
            I,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: ss(
          $,
          I,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function rt(z, $, I, ue) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: z };
    let de = z;
    for (; ; ) {
      let Se = v == null, pe = v || m, ge = h;
      try {
        await n.patchRoutesOnNavigation({
          signal: I,
          path: $,
          matches: de,
          fetcherKey: ue,
          patch: (Re, Ne) => {
            I.aborted || ly(
              Re,
              Ne,
              pe,
              ge,
              u,
              !1
            );
          }
        });
      } catch (Re) {
        return { type: "error", error: Re, partialMatches: de };
      } finally {
        Se && !I.aborted && (m = [...m]);
      }
      if (I.aborted)
        return { type: "aborted" };
      let Ee = gr(pe, $, p), be = null;
      if (Ee) {
        if (Object.keys(Ee[0].params).length === 0)
          return { type: "success", matches: Ee };
        if (be = ss(
          pe,
          $,
          p,
          !0
        ), !(be && de.length < be.length && en(
          de,
          be.slice(0, de.length)
        )))
          return { type: "success", matches: Ee };
      }
      if (be || (be = ss(
        pe,
        $,
        p,
        !0
      )), !be || en(de, be))
        return { type: "success", matches: null };
      de = be;
    }
  }
  function en(z, $) {
    return z.length === $.length && z.every((I, ue) => I.route.id === $[ue].route.id);
  }
  function va(z) {
    h = {}, v = hs(
      z,
      u,
      void 0,
      h
    );
  }
  function ln(z, $, I = !1) {
    let ue = v == null;
    ly(
      z,
      $,
      v || m,
      h,
      u,
      I
    ), ue && (m = [...m], We({}));
  }
  return te = {
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
    initialize: Jt,
    subscribe: _t,
    enableScrollRestoration: Oe,
    navigate: fe,
    fetch: Ht,
    revalidate: ke,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (z) => n.history.createHref(z),
    encodeLocation: (z) => n.history.encodeLocation(z),
    getFetcher: Nr,
    resetFetcher: la,
    deleteFetcher: Wt,
    dispose: Pt,
    getBlocker: kn,
    deleteBlocker: ga,
    patchRoutes: ln,
    _internalFetchControllers: X,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: va,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
      We(z);
    }
  }, n.unstable_instrumentations && (te = dj(
    te,
    n.unstable_instrumentations.map((z) => z.router).filter(Boolean)
  )), te;
}
function Ej(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function Yf(n, a, i, s, o, u) {
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
  let v = Rc(
    s || ".",
    xh(h),
    Kn(n.pathname, i) || n.pathname,
    u === "path"
  );
  if (s == null && (v.search = n.search, v.hash = n.hash), (s == null || s === "" || s === ".") && m) {
    let p = jh(v.search);
    if (m.route.index && !p)
      v.search = v.search ? v.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let x = new URLSearchParams(v.search), g = x.getAll("index");
      x.delete("index"), g.filter((E) => E).forEach((E) => x.append("index", E));
      let S = x.toString();
      v.search = S ? `?${S}` : "";
    }
  }
  return i !== "/" && (v.pathname = rj({ basename: i, pathname: v.pathname })), pa(v);
}
function ry(n, a, i) {
  if (!i || !Ej(i))
    return { path: a };
  if (i.formMethod && !qj(i.formMethod))
    return {
      path: a,
      error: Yn(405, { method: i.formMethod })
    };
  let s = () => ({
    path: a,
    error: Yn(400, { type: "invalid-body" })
  }), u = (i.formMethod || "get").toUpperCase(), h = lx(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!cn(u))
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
          formMethod: u,
          formAction: h,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: g
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!cn(u))
        return s();
      try {
        let g = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: a,
          submission: {
            formMethod: u,
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
    m = Xf(i.formData), v = i.formData;
  else if (i.body instanceof FormData)
    m = Xf(i.body), v = i.body;
  else if (i.body instanceof URLSearchParams)
    m = i.body, v = fy(m);
  else if (i.body == null)
    m = new URLSearchParams(), v = new FormData();
  else
    try {
      m = new URLSearchParams(i.body), v = fy(m);
    } catch {
      return s();
    }
  let p = {
    formMethod: u,
    formAction: h,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: v,
    json: void 0,
    text: void 0
  };
  if (cn(p.formMethod))
    return { path: a, submission: p };
  let x = ia(a);
  return n && x.search && jh(x.search) && m.append("index", ""), x.search = `?${m}`, { path: pa(x), submission: p };
}
function iy(n, a, i, s, o, u, h, m, v, p, x, g, S, E, w, N, C, T, k, R, _) {
  let K = R ? _n(R[1]) ? R[1].error : R[1].data : void 0, ee = o.createURL(u.location), te = o.createURL(v), D;
  if (x && u.errors) {
    let Q = Object.keys(u.errors)[0];
    D = h.findIndex((O) => O.route.id === Q);
  } else if (R && _n(R[1])) {
    let Q = R[0];
    D = h.findIndex((O) => O.route.id === Q) - 1;
  }
  let q = R ? R[1].statusCode : void 0, F = q && q >= 400, oe = {
    currentUrl: ee,
    currentParams: u.matches[0]?.params || {},
    nextUrl: te,
    nextParams: h[0].params,
    ...m,
    actionResult: K,
    actionStatus: q
  }, ie = Ss(h), U = h.map((Q, O) => {
    let { route: A } = Q, V = null;
    if (D != null && O > D)
      V = !1;
    else if (A.lazy)
      V = !0;
    else if (!wh(A))
      V = !1;
    else if (x) {
      let { shouldLoad: J } = Wb(
        A,
        u.loaderData,
        u.errors
      );
      V = J;
    } else jj(u.loaderData, u.matches[O], Q) && (V = !0);
    if (V !== null)
      return Gf(
        i,
        s,
        n,
        v,
        ie,
        Q,
        p,
        a,
        V
      );
    let X = !1;
    typeof _ == "boolean" ? X = _ : F ? X = !1 : (g || ee.pathname + ee.search === te.pathname + te.search || ee.search !== te.search || Nj(u.matches[O], Q)) && (X = !0);
    let re = {
      ...oe,
      defaultShouldRevalidate: X
    }, M = cs(Q, re);
    return Gf(
      i,
      s,
      n,
      v,
      ie,
      Q,
      p,
      a,
      M,
      re,
      _
    );
  }), ne = [];
  return w.forEach((Q, O) => {
    if (x || !h.some((ce) => ce.route.id === Q.routeId) || E.has(O))
      return;
    let A = u.fetchers.get(O), V = A && A.state !== "idle" && A.data === void 0, X = gr(C, Q.path, T);
    if (!X) {
      if (k && V)
        return;
      ne.push({
        key: O,
        routeId: Q.routeId,
        path: Q.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(O))
      return;
    let re = sc(X, Q.path), M = new AbortController(), J = qi(
      o,
      Q.path,
      M.signal
    ), Z = null;
    if (S.has(O))
      S.delete(O), Z = Pi(
        i,
        s,
        J,
        Q.path,
        X,
        re,
        p,
        a
      );
    else if (V)
      g && (Z = Pi(
        i,
        s,
        J,
        Q.path,
        X,
        re,
        p,
        a
      ));
    else {
      let ce;
      typeof _ == "boolean" ? ce = _ : F ? ce = !1 : ce = g;
      let he = {
        ...oe,
        defaultShouldRevalidate: ce
      };
      cs(re, he) && (Z = Pi(
        i,
        s,
        J,
        Q.path,
        X,
        re,
        p,
        a,
        he
      ));
    }
    Z && ne.push({
      key: O,
      routeId: Q.routeId,
      path: Q.path,
      matches: Z,
      match: re,
      request: J,
      controller: M
    });
  }), { dsMatches: U, revalidatingFetchers: ne };
}
function wh(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function Wb(n, a, i) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!wh(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = i != null && i[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let u = !s && !o;
  return { shouldLoad: u, renderFallback: u };
}
function jj(n, a, i) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), o = !n.hasOwnProperty(i.route.id);
  return s || o;
}
function Nj(n, a) {
  let i = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function cs(n, a) {
  if (n.route.shouldRevalidate) {
    let i = n.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function ly(n, a, i, s, o, u) {
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
      (g) => ex(p, g)
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
  if (u && v.length > 0)
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
function ex(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (i, s) => a.children?.some((o) => ex(i, o))
  ) ?? !1 : !1;
}
var sy = /* @__PURE__ */ new WeakMap(), tx = ({
  key: n,
  route: a,
  manifest: i,
  mapRouteProperties: s
}) => {
  let o = i[a.id];
  if (qe(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let u = o.lazy[n];
  if (!u)
    return;
  let h = sy.get(o);
  h || (h = {}, sy.set(o, h));
  let m = h[n];
  if (m)
    return m;
  let v = (async () => {
    let p = HE(n), g = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (p)
      At(
        !p,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), h[n] = Promise.resolve();
    else if (g)
      At(
        !1,
        `Route "${o.id}" has a static property "${n}" defined. The lazy property will be ignored.`
      );
    else {
      let S = await u();
      S != null && (Object.assign(o, { [n]: S }), Object.assign(o, s(o)));
    }
    typeof o.lazy == "object" && (o.lazy[n] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return h[n] = v, v;
}, oy = /* @__PURE__ */ new WeakMap();
function Tj(n, a, i, s, o) {
  let u = i[n.id];
  if (qe(u, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let x = oy.get(u);
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
        let C = IE(w), k = u[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        C ? At(
          !C,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : k ? At(
          !k,
          `Route "${u.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : E[w] = N;
      }
      Object.assign(u, E), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(u),
        lazy: void 0
      });
    })();
    return oy.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let h = Object.keys(n.lazy), m = [], v;
  for (let x of h) {
    if (o && o.includes(x))
      continue;
    let g = tx({
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
async function cy(n) {
  let a = n.matches.filter((o) => o.shouldLoad), i = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    i[a[u].route.id] = o;
  }), i;
}
async function Cj(n) {
  return n.matches.some((a) => a.route.middleware) ? nx(n, () => cy(n)) : cy(n);
}
function nx(n, a) {
  return Rj(
    n,
    a,
    (s) => {
      if (Hj(s))
        throw s;
      return s;
    },
    Uj,
    i
  );
  function i(s, o, u) {
    if (u)
      return Promise.resolve(
        Object.assign(u.value, {
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
      ), v = vr(
        h,
        h[m].route.id
      ).route.id;
      return Promise.resolve({
        [v]: { type: "error", result: s }
      });
    }
  }
}
async function Rj(n, a, i, s, o) {
  let { matches: u, ...h } = n, m = u.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((x) => [p.route.id, x]) : []
  );
  return await ax(
    h,
    m,
    a,
    i,
    s,
    o
  );
}
async function ax(n, a, i, s, o, u, h = 0) {
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
      return g = { value: await ax(
        n,
        a,
        i,
        s,
        o,
        u,
        h + 1
      ) }, g.value;
    } catch (E) {
      return g = { value: await u(E, p, g) }, g.value;
    }
  };
  try {
    let E = await x(n, S), w = E != null ? s(E) : void 0;
    return o(w) ? w : g ? w ?? g.value : (g = { value: await S() }, g.value);
  } catch (E) {
    return await u(E, p, g);
  }
}
function rx(n, a, i, s, o) {
  let u = tx({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), h = Tj(
    s.route,
    cn(i.method) ? "action" : "loader",
    a,
    n,
    o
  );
  return {
    middleware: u,
    route: h.lazyRoutePromise,
    handler: h.lazyHandlerPromise
  };
}
function Gf(n, a, i, s, o, u, h, m, v, p = null, x) {
  let g = !1, S = rx(
    n,
    a,
    i,
    u,
    h
  );
  return {
    ...u,
    _lazyPromises: S,
    shouldLoad: v,
    shouldRevalidateArgs: p,
    shouldCallHandler(E) {
      return g = !0, p ? typeof x == "boolean" ? cs(u, {
        ...p,
        defaultShouldRevalidate: x
      }) : typeof E == "boolean" ? cs(u, {
        ...p,
        defaultShouldRevalidate: E
      }) : cs(u, p) : v;
    },
    resolve(E) {
      let { lazy: w, loader: N, middleware: C } = u.route, T = g || v || E && !cn(i.method) && (w || N), k = C && C.length > 0 && !N && !w;
      return T && (cn(i.method) || !k) ? Aj({
        request: i,
        path: s,
        unstable_pattern: o,
        match: u,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: E,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Pi(n, a, i, s, o, u, h, m, v = null) {
  return o.map((p) => p.route.id !== u.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: v,
    shouldCallHandler: () => !1,
    _lazyPromises: rx(
      n,
      a,
      i,
      p,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Gf(
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
async function Mj(n, a, i, s, o, u, h) {
  s.some((x) => x._lazyPromises?.middleware) && await Promise.all(s.map((x) => x._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: ix(a, i),
    unstable_pattern: Ss(s),
    params: s[0].params,
    context: u,
    matches: s
  }, p = await n({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (x) => {
      let g = m;
      return nx(g, () => x({
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
async function Aj({
  request: n,
  path: a,
  unstable_pattern: i,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: h,
  scopedContext: m
}) {
  let v, p, x = cn(n.method), g = x ? "action" : "loader", S = (E) => {
    let w, N = new Promise((k, R) => w = R);
    p = () => w(), n.signal.addEventListener("abort", p);
    let C = (k) => typeof E != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${s.route.id}]`
      )
    ) : E(
      {
        request: n,
        unstable_url: ix(n, a),
        unstable_pattern: i,
        params: s.params,
        context: m
      },
      ...k !== void 0 ? [k] : []
    ), T = (async () => {
      try {
        return { type: "data", result: await (h ? h((R) => C(R)) : C()) };
      } catch (k) {
        return { type: "error", result: k };
      }
    })();
    return Promise.race([T, N]);
  };
  try {
    let E = x ? s.route.action : s.route.loader;
    if (o || u)
      if (E) {
        let w, [N] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(E).catch((C) => {
            w = C;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          u
        ]);
        if (w !== void 0)
          throw w;
        v = N;
      } else {
        await o;
        let w = x ? s.route.action : s.route.loader;
        if (w)
          [v] = await Promise.all([S(w), u]);
        else if (g === "action") {
          let N = new URL(n.url), C = N.pathname + N.search;
          throw Yn(405, {
            method: n.method,
            pathname: C,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (E)
      v = await S(E);
    else {
      let w = new URL(n.url), N = w.pathname + w.search;
      throw Yn(404, {
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
async function _j(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function Dj(n) {
  let { result: a, type: i } = n;
  if (Eh(a)) {
    let s;
    try {
      s = await _j(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return i === "error" ? {
      type: "error",
      error: new Mc(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? gy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: Lj(a),
    statusCode: ms(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: ms(a) ? a.status : void 0
  } : gy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function zj(n, a, i, s, o) {
  let u = n.headers.get("Location");
  if (qe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !bh(u)) {
    let h = s.slice(
      0,
      s.findIndex((m) => m.route.id === i) + 1
    );
    u = Yf(
      new URL(a.url),
      h,
      o,
      u
    ), n.headers.set("Location", u);
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
function dy(n, a, i, s) {
  if (bh(n)) {
    let o = n, u = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (uy.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let h = Kn(u.pathname, i) != null;
    if (u.origin === a.origin && h)
      return Sh(u.pathname) + u.search + u.hash;
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
  let o = n.createURL(lx(a)).toString(), u = { signal: i };
  if (s && cn(s.formMethod)) {
    let { formMethod: h, formEncType: m } = s;
    u.method = h.toUpperCase(), m === "application/json" ? (u.headers = new Headers({ "Content-Type": m }), u.body = JSON.stringify(s.json)) : m === "text/plain" ? u.body = s.text : m === "application/x-www-form-urlencoded" && s.formData ? u.body = Xf(s.formData) : u.body = s.formData;
  }
  return new Request(o, u);
}
function ix(n, a) {
  let i = new URL(n.url), s = typeof a == "string" ? ia(a) : a;
  if (i.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), u = o.getAll("index");
    o.delete("index");
    for (let h of u.filter(Boolean))
      o.append("index", h);
    i.search = o.size ? `?${o.toString()}` : "";
  } else
    i.search = "";
  return i.hash = s.hash || "", i;
}
function Xf(n) {
  let a = new URLSearchParams();
  for (let [i, s] of n.entries())
    a.append(i, typeof s == "string" ? s : s.name);
  return a;
}
function fy(n) {
  let a = new FormData();
  for (let [i, s] of n.entries())
    a.append(i, s);
  return a;
}
function Oj(n, a, i, s = !1, o = !1) {
  let u = {}, h = null, m, v = !1, p = {}, x = i && _n(i[1]) ? i[1].error : void 0;
  return n.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let S = g.route.id, E = a[S];
    if (qe(
      !Gr(E),
      "Cannot handle redirect results in processLoaderData"
    ), _n(E)) {
      let w = E.error;
      if (x !== void 0 && (w = x, x = void 0), h = h || {}, o)
        h[S] = w;
      else {
        let N = vr(n, S);
        h[N.route.id] == null && (h[N.route.id] = w);
      }
      s || (u[S] = Jb), v || (v = !0, m = ms(E.error) ? E.error.status : 500), E.headers && (p[S] = E.headers);
    } else
      u[S] = E.data, E.statusCode && E.statusCode !== 200 && !v && (m = E.statusCode), E.headers && (p[S] = E.headers);
  }), x !== void 0 && i && (h = { [i[0]]: x }, i[2] && (u[i[2]] = void 0)), {
    loaderData: u,
    errors: h,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function hy(n, a, i, s, o, u) {
  let { loaderData: h, errors: m } = Oj(
    a,
    i,
    s
  );
  return o.filter((v) => !v.matches || v.matches.some((p) => p.shouldLoad)).forEach((v) => {
    let { key: p, match: x, controller: g } = v;
    if (g && g.signal.aborted)
      return;
    let S = u[p];
    if (qe(S, "Did not find corresponding fetcher result"), _n(S)) {
      let E = vr(n.matches, x?.route.id);
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
function my(n, a, i, s) {
  let o = Object.entries(a).filter(([, u]) => u !== Jb).reduce((u, [h, m]) => (u[h] = m, u), {});
  for (let u of i) {
    let h = u.route.id;
    if (!a.hasOwnProperty(h) && n.hasOwnProperty(h) && u.route.loader && (o[h] = n[h]), s && s.hasOwnProperty(h))
      break;
  }
  return o;
}
function py(n) {
  return n ? _n(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function vr(n, a) {
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
function Yn(n, {
  pathname: a,
  routeId: i,
  method: s,
  type: o,
  message: u
} = {}) {
  let h = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return n === 400 ? (h = "Bad Request", s && a && i ? m = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : n === 403 ? (h = "Forbidden", m = `Route "${i}" does not match URL "${a}"`) : n === 404 ? (h = "Not Found", m = `No route matches URL "${a}"`) : n === 405 && (h = "Method Not Allowed", s && a && i ? m = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : s && (m = `Invalid request method "${s.toUpperCase()}"`)), new Mc(
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
function lx(n) {
  let a = typeof n == "string" ? ia(n) : n;
  return pa({ ...a, hash: "" });
}
function kj(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function Lj(n) {
  return new Mc(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function Uj(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, i]) => typeof a == "string" && Bj(i)
  );
}
function Bj(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function Vj(n) {
  return Eh(n.result) && Qb.has(n.result.status);
}
function _n(n) {
  return n.type === "error";
}
function Gr(n) {
  return (n && n.type) === "redirect";
}
function gy(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function Eh(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function $j(n) {
  return Qb.has(n);
}
function Hj(n) {
  return Eh(n) && $j(n.status) && n.headers.has("Location");
}
function qj(n) {
  return yj.has(n.toUpperCase());
}
function cn(n) {
  return gj.has(n.toUpperCase());
}
function jh(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function sc(n, a) {
  let i = typeof a == "string" ? ia(a).search : a.search;
  if (n[n.length - 1].route.index && jh(i || ""))
    return n[n.length - 1];
  let s = Yb(n);
  return s[s.length - 1];
}
function vy(n) {
  let { formMethod: a, formAction: i, formEncType: s, text: o, formData: u, json: h } = n;
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
    if (u != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: s,
        formData: u,
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
function af(n, a) {
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
function Ij(n, a) {
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
function Fj(n, a) {
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
function Yj(n, a) {
  try {
    let i = n.sessionStorage.getItem(
      Zb
    );
    if (i) {
      let s = JSON.parse(i);
      for (let [o, u] of Object.entries(s || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function Gj(n, a) {
  if (a.size > 0) {
    let i = {};
    for (let [s, o] of a)
      i[s] = [...o];
    try {
      n.sessionStorage.setItem(
        Zb,
        JSON.stringify(i)
      );
    } catch (s) {
      At(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function yy() {
  let n, a, i = new Promise((s, o) => {
    n = async (u) => {
      s(u);
      try {
        await i;
      } catch {
      }
    }, a = async (u) => {
      o(u);
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
var Wr = y.createContext(null);
Wr.displayName = "DataRouter";
var ws = y.createContext(null);
ws.displayName = "DataRouterState";
var sx = y.createContext(!1);
function ox() {
  return y.useContext(sx);
}
var Nh = y.createContext({
  isTransitioning: !1
});
Nh.displayName = "ViewTransition";
var cx = y.createContext(
  /* @__PURE__ */ new Map()
);
cx.displayName = "Fetchers";
var Xj = y.createContext(null);
Xj.displayName = "Await";
var Qn = y.createContext(
  null
);
Qn.displayName = "Navigation";
var Ac = y.createContext(
  null
);
Ac.displayName = "Location";
var Ba = y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ba.displayName = "Route";
var Th = y.createContext(null);
Th.displayName = "RouteError";
var ux = "REACT_ROUTER_ERROR", Pj = "REDIRECT", Kj = "ROUTE_ERROR_RESPONSE";
function Qj(n) {
  if (n.startsWith(`${ux}:${Pj}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function Zj(n) {
  if (n.startsWith(
    `${ux}:${Kj}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Mc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function Jj(n, { relative: a } = {}) {
  qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: s } = y.useContext(Qn), { hash: o, pathname: u, search: h } = Ns(n, { relative: a }), m = u;
  return i !== "/" && (m = u === "/" ? i : Gn([i, u])), s.createHref({ pathname: m, search: h, hash: o });
}
function Es() {
  return y.useContext(Ac) != null;
}
function Va() {
  return qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(Ac).location;
}
var dx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function fx(n) {
  y.useContext(Qn).static || y.useLayoutEffect(n);
}
function js() {
  let { isDataRoute: n } = y.useContext(Ba);
  return n ? uN() : Wj();
}
function Wj() {
  qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = y.useContext(Wr), { basename: a, navigator: i } = y.useContext(Qn), { matches: s } = y.useContext(Ba), { pathname: o } = Va(), u = JSON.stringify(xh(s)), h = y.useRef(!1);
  return fx(() => {
    h.current = !0;
  }), y.useCallback(
    (v, p = {}) => {
      if (At(h.current, dx), !h.current) return;
      if (typeof v == "number") {
        i.go(v);
        return;
      }
      let x = Rc(
        v,
        JSON.parse(u),
        o,
        p.relative === "path"
      );
      n == null && a !== "/" && (x.pathname = x.pathname === "/" ? a : Gn([a, x.pathname])), (p.replace ? i.replace : i.push)(
        x,
        p.state,
        p
      );
    },
    [
      a,
      i,
      u,
      o,
      n
    ]
  );
}
y.createContext(null);
function Ns(n, { relative: a } = {}) {
  let { matches: i } = y.useContext(Ba), { pathname: s } = Va(), o = JSON.stringify(xh(i));
  return y.useMemo(
    () => Rc(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function eN(n, a, i) {
  qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = y.useContext(Qn), { matches: o } = y.useContext(Ba), u = o[o.length - 1], h = u ? u.params : {}, m = u ? u.pathname : "/", v = u ? u.pathnameBase : "/", p = u && u.route;
  {
    let C = p && p.path || "";
    px(
      m,
      !p || C.endsWith("*") || C.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C === "/" ? "*" : `${C}/*`}">.`
    );
  }
  let x = Va(), g;
  g = x;
  let S = g.pathname || "/", E = S;
  if (v !== "/") {
    let C = v.replace(/^\//, "").split("/");
    E = "/" + S.replace(/^\//, "").split("/").slice(C.length).join("/");
  }
  let w = gr(n, { pathname: E });
  return At(
    p || w != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), At(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), iN(
    w && w.map(
      (C) => Object.assign({}, C, {
        params: Object.assign({}, h, C.params),
        pathname: Gn([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            C.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathname
        ]),
        pathnameBase: C.pathnameBase === "/" ? v : Gn([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            C.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathnameBase
        ])
      })
    ),
    o,
    i
  );
}
function tN() {
  let n = cN(), a = ms(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), i = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, u = { padding: "2px 4px", backgroundColor: s }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), h = /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ y.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ y.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ y.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ y.createElement("pre", { style: o }, i) : null, h);
}
var nN = /* @__PURE__ */ y.createElement(tN, null), hx = class extends y.Component {
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
      const i = Zj(n.digest);
      i && (n = i);
    }
    let a = n !== void 0 ? /* @__PURE__ */ y.createElement(Ba.Provider, { value: this.props.routeContext }, /* @__PURE__ */ y.createElement(
      Th.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ y.createElement(aN, { error: n }, a) : a;
  }
};
hx.contextType = sx;
var rf = /* @__PURE__ */ new WeakMap();
function aN({
  children: n,
  error: a
}) {
  let { basename: i } = y.useContext(Qn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = Qj(a.digest);
    if (s) {
      let o = rf.get(a);
      if (o) throw o;
      let u = Xb(s.location, i);
      if (Gb && !rf.get(a))
        if (u.isExternal || s.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: s.replace
            })
          );
          throw rf.set(a, h), h;
        }
      return /* @__PURE__ */ y.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${u.absoluteURL || u.to}`
        }
      );
    }
  }
  return n;
}
function rN({ routeContext: n, match: a, children: i }) {
  let s = y.useContext(Wr);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ y.createElement(Ba.Provider, { value: n }, i);
}
function iN(n, a = [], i) {
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
  let o = n, u = s?.errors;
  if (u != null) {
    let x = o.findIndex(
      (g) => g.route.id && u?.[g.route.id] !== void 0
    );
    qe(
      x >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
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
      let E, w = !1, N = null, C = null;
      s && (E = u && g.route.id ? u[g.route.id] : void 0, N = g.route.errorElement || nN, h && (m < 0 && S === 0 ? (px(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, C = null) : m === S && (w = !0, C = g.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, S + 1)), k = () => {
        let R;
        return E ? R = N : w ? R = C : g.route.Component ? R = /* @__PURE__ */ y.createElement(g.route.Component, null) : g.route.element ? R = g.route.element : R = x, /* @__PURE__ */ y.createElement(
          rN,
          {
            match: g,
            routeContext: {
              outlet: x,
              matches: T,
              isDataRoute: s != null
            },
            children: R
          }
        );
      };
      return s && (g.route.ErrorBoundary || g.route.errorElement || S === 0) ? /* @__PURE__ */ y.createElement(
        hx,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: N,
          error: E,
          children: k(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p
        }
      ) : k();
    },
    null
  );
}
function Ch(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function lN(n) {
  let a = y.useContext(Wr);
  return qe(a, Ch(n)), a;
}
function mx(n) {
  let a = y.useContext(ws);
  return qe(a, Ch(n)), a;
}
function sN(n) {
  let a = y.useContext(Ba);
  return qe(a, Ch(n)), a;
}
function _c(n) {
  let a = sN(n), i = a.matches[a.matches.length - 1];
  return qe(
    i.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function oN() {
  return _c(
    "useRouteId"
    /* UseRouteId */
  );
}
function Ts() {
  let n = mx(
    "useLoaderData"
    /* UseLoaderData */
  ), a = _c(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function cN() {
  let n = y.useContext(Th), a = mx(
    "useRouteError"
    /* UseRouteError */
  ), i = _c(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[i];
}
function uN() {
  let { router: n } = lN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = _c(
    "useNavigate"
    /* UseNavigateStable */
  ), i = y.useRef(!1);
  return fx(() => {
    i.current = !0;
  }), y.useCallback(
    async (o, u = {}) => {
      At(i.current, dx), i.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...u }));
    },
    [n, a]
  );
}
var by = {};
function px(n, a, i) {
  !a && !by[n] && (by[n] = !0, At(!1, i));
}
var xy = {};
function Sy(n, a) {
  !n && !xy[a] && (xy[a] = !0, console.warn(a));
}
var dN = "useOptimistic", wy = RE[dN], fN = () => {
};
function hN(n) {
  return wy ? wy(n) : [n, fN];
}
function mN(n) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && At(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: y.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && At(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: y.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && At(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: y.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var pN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function gN(n, a) {
  return wj({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: UE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: pN,
    mapRouteProperties: mN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var vN = class {
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
function yN({
  router: n,
  flushSync: a,
  onError: i,
  unstable_useTransitions: s
}) {
  s = ox() || s;
  let [u, h] = y.useState(n.state), [m, v] = hN(u), [p, x] = y.useState(), [g, S] = y.useState({
    isTransitioning: !1
  }), [E, w] = y.useState(), [N, C] = y.useState(), [T, k] = y.useState(), R = y.useRef(/* @__PURE__ */ new Map()), _ = y.useCallback(
    (q, { deletedFetchers: F, newErrors: oe, flushSync: ie, viewTransitionOpts: U }) => {
      oe && i && Object.values(oe).forEach(
        (Q) => i(Q, {
          location: q.location,
          params: q.matches[0]?.params ?? {},
          unstable_pattern: Ss(q.matches)
        })
      ), q.fetchers.forEach((Q, O) => {
        Q.data !== void 0 && R.current.set(O, Q.data);
      }), F.forEach((Q) => R.current.delete(Q)), Sy(
        ie === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ne = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (Sy(
        U == null || ne,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !U || !ne) {
        a && ie ? a(() => h(q)) : s === !1 ? h(q) : y.startTransition(() => {
          s === !0 && v((Q) => Ey(Q, q)), h(q);
        });
        return;
      }
      if (a && ie) {
        a(() => {
          N && (E?.resolve(), N.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: U.currentLocation,
            nextLocation: U.nextLocation
          });
        });
        let Q = n.window.document.startViewTransition(() => {
          a(() => h(q));
        });
        Q.finished.finally(() => {
          a(() => {
            w(void 0), C(void 0), x(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => C(Q));
        return;
      }
      N ? (E?.resolve(), N.skipTransition(), k({
        state: q,
        currentLocation: U.currentLocation,
        nextLocation: U.nextLocation
      })) : (x(q), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: U.currentLocation,
        nextLocation: U.nextLocation
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
  y.useLayoutEffect(() => n.subscribe(_), [n, _]);
  let K = m.initialized;
  y.useLayoutEffect(() => {
    !K && n.state.initialized && _(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [K, _, n.state]), y.useEffect(() => {
    g.isTransitioning && !g.flushSync && w(new vN());
  }, [g]), y.useEffect(() => {
    if (E && p && n.window) {
      let q = p, F = E.promise, oe = n.window.document.startViewTransition(async () => {
        s === !1 ? h(q) : y.startTransition(() => {
          s === !0 && v((ie) => Ey(ie, q)), h(q);
        }), await F;
      });
      oe.finished.finally(() => {
        w(void 0), C(void 0), x(void 0), S({ isTransitioning: !1 });
      }), C(oe);
    }
  }, [
    p,
    E,
    n.window,
    s,
    v
  ]), y.useEffect(() => {
    E && p && m.location.key === p.location.key && E.resolve();
  }, [E, N, m.location, p]), y.useEffect(() => {
    !g.isTransitioning && T && (x(T.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), k(void 0));
  }, [g.isTransitioning, T]);
  let ee = y.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (q) => n.navigate(q),
    push: (q, F, oe) => n.navigate(q, {
      state: F,
      preventScrollReset: oe?.preventScrollReset
    }),
    replace: (q, F, oe) => n.navigate(q, {
      replace: !0,
      state: F,
      preventScrollReset: oe?.preventScrollReset
    })
  }), [n]), te = n.basename || "/", D = y.useMemo(
    () => ({
      router: n,
      navigator: ee,
      static: !1,
      basename: te,
      onError: i
    }),
    [n, ee, te, i]
  );
  return /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement(Wr.Provider, { value: D }, /* @__PURE__ */ y.createElement(ws.Provider, { value: m }, /* @__PURE__ */ y.createElement(cx.Provider, { value: R.current }, /* @__PURE__ */ y.createElement(Nh.Provider, { value: g }, /* @__PURE__ */ y.createElement(
    SN,
    {
      basename: te,
      location: m.location,
      navigationType: m.historyAction,
      navigator: ee,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ y.createElement(
      bN,
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
function Ey(n, a) {
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
var bN = y.memo(xN);
function xN({
  routes: n,
  future: a,
  state: i,
  isStatic: s,
  onError: o
}) {
  return eN(n, void 0, { state: i, isStatic: s, onError: o });
}
function SN({
  basename: n = "/",
  children: a = null,
  location: i,
  navigationType: s = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: h
}) {
  qe(
    !Es(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = n.replace(/^\/*/, "/"), v = y.useMemo(
    () => ({
      basename: m,
      navigator: o,
      static: u,
      unstable_useTransitions: h,
      future: {}
    }),
    [m, o, u, h]
  );
  typeof i == "string" && (i = ia(i));
  let {
    pathname: p = "/",
    search: x = "",
    hash: g = "",
    state: S = null,
    key: E = "default",
    unstable_mask: w
  } = i, N = y.useMemo(() => {
    let C = Kn(p, m);
    return C == null ? null : {
      location: {
        pathname: C,
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
  return At(
    N != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${x}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ y.createElement(Qn.Provider, { value: v }, /* @__PURE__ */ y.createElement(Ac.Provider, { children: a, value: N }));
}
var oc = "get", cc = "application/x-www-form-urlencoded";
function Dc(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function wN(n) {
  return Dc(n) && n.tagName.toLowerCase() === "button";
}
function EN(n) {
  return Dc(n) && n.tagName.toLowerCase() === "form";
}
function jN(n) {
  return Dc(n) && n.tagName.toLowerCase() === "input";
}
function NN(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function TN(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !NN(n);
}
var Go = null;
function CN() {
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
var RN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function lf(n) {
  return n != null && !RN.has(n) ? (At(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${cc}"`
  ), null) : n;
}
function MN(n, a) {
  let i, s, o, u, h;
  if (EN(n)) {
    let m = n.getAttribute("action");
    s = m ? Kn(m, a) : null, i = n.getAttribute("method") || oc, o = lf(n.getAttribute("enctype")) || cc, u = new FormData(n);
  } else if (wN(n) || jN(n) && (n.type === "submit" || n.type === "image")) {
    let m = n.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let v = n.getAttribute("formaction") || m.getAttribute("action");
    if (s = v ? Kn(v, a) : null, i = n.getAttribute("formmethod") || m.getAttribute("method") || oc, o = lf(n.getAttribute("formenctype")) || lf(m.getAttribute("enctype")) || cc, u = new FormData(m, n), !CN()) {
      let { name: p, type: x, value: g } = n;
      if (x === "image") {
        let S = p ? `${p}.` : "";
        u.append(`${S}x`, "0"), u.append(`${S}y`, "0");
      } else p && u.append(p, g);
    }
  } else {
    if (Dc(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = oc, s = null, o = cc, h = n;
  }
  return u && o === "text/plain" && (h = u, u = void 0), { action: s, method: i.toLowerCase(), encType: o, formData: u, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Rh(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function gx(n, a, i, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return i ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && Kn(o.pathname, a) === "/" ? o.pathname = `${gc(a)}/_root.${s}` : o.pathname = `${gc(o.pathname)}.${s}`, o;
}
async function AN(n, a) {
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
function _N(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function DN(n, a, i) {
  let s = await Promise.all(
    n.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let h = await AN(u, i);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return LN(
    s.flat(1).filter(_N).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function jy(n, a, i, s, o, u) {
  let h = (v, p) => i[p] ? v.route.id !== i[p].route.id : !0, m = (v, p) => (
    // param change, /users/123 -> /users/456
    i[p].pathname !== v.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[p].route.path?.endsWith("*") && i[p].params["*"] !== v.params["*"]
  );
  return u === "assets" ? a.filter(
    (v, p) => h(v, p) || m(v, p)
  ) : u === "data" ? a.filter((v, p) => {
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
function zN(n, a, { includeHydrateFallback: i } = {}) {
  return ON(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), i && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function ON(n) {
  return [...new Set(n)];
}
function kN(n) {
  let a = {}, i = Object.keys(n).sort();
  for (let s of i)
    a[s] = n[s];
  return a;
}
function LN(n, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let u = JSON.stringify(kN(o));
    return i.has(u) || (i.add(u), s.push({ key: u, link: o })), s;
  }, []);
}
function Mh() {
  let n = y.useContext(Wr);
  return Rh(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function UN() {
  let n = y.useContext(ws);
  return Rh(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var Ah = y.createContext(void 0);
Ah.displayName = "FrameworkContext";
function _h() {
  let n = y.useContext(Ah);
  return Rh(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function BN(n, a) {
  let i = y.useContext(Ah), [s, o] = y.useState(!1), [u, h] = y.useState(!1), { onFocus: m, onBlur: v, onMouseEnter: p, onMouseLeave: x, onTouchStart: g } = a, S = y.useRef(null);
  y.useEffect(() => {
    if (n === "render" && h(!0), n === "viewport") {
      let N = (T) => {
        T.forEach((k) => {
          h(k.isIntersecting);
        });
      }, C = new IntersectionObserver(N, { threshold: 0.5 });
      return S.current && C.observe(S.current), () => {
        C.disconnect();
      };
    }
  }, [n]), y.useEffect(() => {
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
  return i ? n !== "intent" ? [u, S, {}] : [
    u,
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
function VN({ page: n, ...a }) {
  let i = ox(), { router: s } = Mh(), o = y.useMemo(
    () => gr(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? i ? /* @__PURE__ */ y.createElement(HN, { page: n, matches: o, ...a }) : /* @__PURE__ */ y.createElement(qN, { page: n, matches: o, ...a }) : null;
}
function $N(n) {
  let { manifest: a, routeModules: i } = _h(), [s, o] = y.useState([]);
  return y.useEffect(() => {
    let u = !1;
    return DN(n, a, i).then(
      (h) => {
        u || o(h);
      }
    ), () => {
      u = !0;
    };
  }, [n, a, i]), s;
}
function HN({
  page: n,
  matches: a,
  ...i
}) {
  let s = Va(), { future: o } = _h(), { basename: u } = Mh(), h = y.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let m = gx(
      n,
      u,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), v = !1, p = [];
    for (let x of a)
      typeof x.route.shouldRevalidate == "function" ? v = !0 : p.push(x.route.id);
    return v && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    u,
    o.unstable_trailingSlashAwareDataRequests,
    n,
    s,
    a
  ]);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, h.map((m) => /* @__PURE__ */ y.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...i })));
}
function qN({
  page: n,
  matches: a,
  ...i
}) {
  let s = Va(), { future: o, manifest: u, routeModules: h } = _h(), { basename: m } = Mh(), { loaderData: v, matches: p } = UN(), x = y.useMemo(
    () => jy(
      n,
      a,
      p,
      u,
      s,
      "data"
    ),
    [n, a, p, u, s]
  ), g = y.useMemo(
    () => jy(
      n,
      a,
      p,
      u,
      s,
      "assets"
    ),
    [n, a, p, u, s]
  ), S = y.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), C = !1;
    if (a.forEach((k) => {
      let R = u.routes[k.route.id];
      !R || !R.hasLoader || (!x.some((_) => _.route.id === k.route.id) && k.route.id in v && h[k.route.id]?.shouldRevalidate || R.hasClientLoader ? C = !0 : N.add(k.route.id));
    }), N.size === 0)
      return [];
    let T = gx(
      n,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return C && N.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((k) => N.has(k.route.id)).map((k) => k.route.id).join(",")
    ), [T.pathname + T.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    v,
    s,
    u,
    x,
    a,
    n,
    h
  ]), E = y.useMemo(
    () => zN(g, u),
    [g, u]
  ), w = $N(g);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, S.map((N) => /* @__PURE__ */ y.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...i })), E.map((N) => /* @__PURE__ */ y.createElement("link", { key: N, rel: "modulepreload", href: N, ...i })), w.map(({ key: N, link: C }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ y.createElement(
      "link",
      {
        key: N,
        nonce: i.nonce,
        ...C,
        crossOrigin: C.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function IN(...n) {
  return (a) => {
    n.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var FN = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  FN && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var vx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, zc = y.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: u,
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
    let { basename: C, navigator: T, unstable_useTransitions: k } = y.useContext(Qn), R = typeof x == "string" && vx.test(x), _ = Xb(x, C);
    x = _.to;
    let K = Jj(x, { relative: o }), ee = Va(), te = null;
    if (m) {
      let Q = Rc(
        m,
        [],
        ee.unstable_mask ? ee.unstable_mask.pathname : "/",
        !0
      );
      C !== "/" && (Q.pathname = Q.pathname === "/" ? C : Gn([C, Q.pathname])), te = T.createHref(Q);
    }
    let [D, q, F] = BN(
      s,
      w
    ), oe = PN(x, {
      replace: h,
      unstable_mask: m,
      state: v,
      target: p,
      preventScrollReset: g,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: E,
      unstable_useTransitions: k
    });
    function ie(Q) {
      a && a(Q), Q.defaultPrevented || oe(Q);
    }
    let U = !(_.isExternal || u), ne = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ y.createElement(
        "a",
        {
          ...w,
          ...F,
          href: (U ? te : void 0) || _.absoluteURL || K,
          onClick: U ? ie : a,
          ref: IN(N, q),
          target: p,
          "data-discover": !R && i === "render" ? "true" : void 0
        }
      )
    );
    return D && !R ? /* @__PURE__ */ y.createElement(y.Fragment, null, ne, /* @__PURE__ */ y.createElement(VN, { page: K })) : ne;
  }
);
zc.displayName = "Link";
var YN = y.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: s = "",
    end: o = !1,
    style: u,
    to: h,
    viewTransition: m,
    children: v,
    ...p
  }, x) {
    let g = Ns(h, { relative: p.relative }), S = Va(), E = y.useContext(ws), { navigator: w, basename: N } = y.useContext(Qn), C = E != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    WN(g) && m === !0, T = w.encodeLocation ? w.encodeLocation(g).pathname : g.pathname, k = S.pathname, R = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
    i || (k = k.toLowerCase(), R = R ? R.toLowerCase() : null, T = T.toLowerCase()), R && N && (R = Kn(R, N) || R);
    const _ = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let K = k === T || !o && k.startsWith(T) && k.charAt(_) === "/", ee = R != null && (R === T || !o && R.startsWith(T) && R.charAt(T.length) === "/"), te = {
      isActive: K,
      isPending: ee,
      isTransitioning: C
    }, D = K ? a : void 0, q;
    typeof s == "function" ? q = s(te) : q = [
      s,
      K ? "active" : null,
      ee ? "pending" : null,
      C ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let F = typeof u == "function" ? u(te) : u;
    return /* @__PURE__ */ y.createElement(
      zc,
      {
        ...p,
        "aria-current": D,
        className: q,
        ref: x,
        style: F,
        to: h,
        viewTransition: m
      },
      typeof v == "function" ? v(te) : v
    );
  }
);
YN.displayName = "NavLink";
var GN = y.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: s,
    replace: o,
    state: u,
    method: h = oc,
    action: m,
    onSubmit: v,
    relative: p,
    preventScrollReset: x,
    viewTransition: g,
    unstable_defaultShouldRevalidate: S,
    ...E
  }, w) => {
    let { unstable_useTransitions: N } = y.useContext(Qn), C = ZN(), T = JN(m, { relative: p }), k = h.toLowerCase() === "get" ? "get" : "post", R = typeof m == "string" && vx.test(m), _ = (K) => {
      if (v && v(K), K.defaultPrevented) return;
      K.preventDefault();
      let ee = K.nativeEvent.submitter, te = ee?.getAttribute("formmethod") || h, D = () => C(ee || K.currentTarget, {
        fetcherKey: a,
        method: te,
        navigate: i,
        replace: o,
        state: u,
        relative: p,
        preventScrollReset: x,
        viewTransition: g,
        unstable_defaultShouldRevalidate: S
      });
      N && i !== !1 ? y.startTransition(() => D()) : D();
    };
    return /* @__PURE__ */ y.createElement(
      "form",
      {
        ref: w,
        method: k,
        action: T,
        onSubmit: s ? v : _,
        ...E,
        "data-discover": !R && n === "render" ? "true" : void 0
      }
    );
  }
);
GN.displayName = "Form";
function XN(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function yx(n) {
  let a = y.useContext(Wr);
  return qe(a, XN(n)), a;
}
function PN(n, {
  target: a,
  replace: i,
  unstable_mask: s,
  state: o,
  preventScrollReset: u,
  relative: h,
  viewTransition: m,
  unstable_defaultShouldRevalidate: v,
  unstable_useTransitions: p
} = {}) {
  let x = js(), g = Va(), S = Ns(n, { relative: h });
  return y.useCallback(
    (E) => {
      if (TN(E, a)) {
        E.preventDefault();
        let w = i !== void 0 ? i : pa(g) === pa(S), N = () => x(n, {
          replace: w,
          unstable_mask: s,
          state: o,
          preventScrollReset: u,
          relative: h,
          viewTransition: m,
          unstable_defaultShouldRevalidate: v
        });
        p ? y.startTransition(() => N()) : N();
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
      u,
      h,
      m,
      v,
      p
    ]
  );
}
var KN = 0, QN = () => `__${String(++KN)}__`;
function ZN() {
  let { router: n } = yx(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = y.useContext(Qn), i = oN(), s = n.fetch, o = n.navigate;
  return y.useCallback(
    async (u, h = {}) => {
      let { action: m, method: v, encType: p, formData: x, body: g } = MN(
        u,
        a
      );
      if (h.navigate === !1) {
        let S = h.fetcherKey || QN();
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
function JN(n, { relative: a } = {}) {
  let { basename: i } = y.useContext(Qn), s = y.useContext(Ba);
  qe(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), u = { ...Ns(n || ".", { relative: a }) }, h = Va();
  if (n == null) {
    u.search = h.search;
    let m = new URLSearchParams(u.search), v = m.getAll("index");
    if (v.some((x) => x === "")) {
      m.delete("index"), v.filter((g) => g).forEach((g) => m.append("index", g));
      let x = m.toString();
      u.search = x ? `?${x}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (u.pathname = u.pathname === "/" ? i : Gn([i, u.pathname])), pa(u);
}
function WN(n, { relative: a } = {}) {
  let i = y.useContext(Nh);
  qe(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = yx(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = Ns(n, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let u = Kn(i.currentLocation.pathname, s) || i.currentLocation.pathname, h = Kn(i.nextLocation.pathname, s) || i.nextLocation.pathname;
  return pc(o.pathname, h) != null || pc(o.pathname, u) != null;
}
class el extends Error {
  constructor(a, i, s, o) {
    super(s), this.status = a, this.category = i, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const $a = "/api/v1/extensions/nexus.audio.emotiontts";
async function ht(n, a) {
  const i = n.startsWith("http") ? n : `${$a}${n}`, s = await fetch(i, {
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
function eT(n, a, i) {
  const s = n.startsWith("http") ? n : `${$a}${n}`, o = new EventSource(s);
  return o.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, o.onerror = (u) => {
    i?.(u);
  }, () => o.close();
}
async function tT() {
  return ht("/deployments");
}
async function Ny(n) {
  return ht(`/deployments/${n}`);
}
async function nT(n, a) {
  return ht(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Ty(n) {
  return ht(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function Dh(n, a) {
  return ht("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function us(n, a, i) {
  return ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(i)
    }
  );
}
async function bx(n, a) {
  await ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function aT(n) {
  return ht(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function rT(n, a, i = "error") {
  return ht("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: i })
  });
}
async function iT(n, a = {}) {
  const i = new URLSearchParams();
  a.limit && i.set("limit", String(a.limit)), a.status && i.set("status", a.status);
  const s = i.toString(), o = s ? `?${s}` : "";
  return ht(`/deployments/${n}/runs${o}`);
}
async function lT(n, a) {
  return ht(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function zh(n, a) {
  return ht(`/deployments/${n}/runs/${a}`);
}
async function sT(n, a) {
  return ht(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function xx(n, a) {
  return ht(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function oT(n, a) {
  return ht(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Cy(n, a, i, s) {
  return eT(
    `/deployments/${n}/runs/${a}/progress`,
    i,
    s
  );
}
async function ps(n) {
  return ht(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function vc(n, a, i, s, o) {
  const u = new FormData();
  u.append("deploymentId", n), u.append("displayName", i), u.append("kind", s), u.append("audio", a);
  const h = await fetch(`${$a}/voice-assets`, {
    method: "POST",
    body: u
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function cT(n, a) {
  await ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function uT(n, a, i) {
  return ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: i })
    }
  );
}
function dT(n) {
  if (!n.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: n.deploymentId });
  return `${$a}/voice-assets/${encodeURIComponent(n.voiceAssetId)}/audio?${a.toString()}`;
}
async function fT(n) {
  return ht(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var hT = "mux0i60", mT = "mux0i61", pT = "mux0i62", gT = "mux0i63";
function Cs({ count: n = "0", title: a, hint: i }) {
  return /* @__PURE__ */ d.jsxs("div", { className: hT, children: [
    /* @__PURE__ */ d.jsx("span", { className: mT, "aria-hidden": "true", children: n }),
    /* @__PURE__ */ d.jsx("h3", { className: pT, children: a }),
    i ? /* @__PURE__ */ d.jsx("p", { className: gT, children: i }) : null
  ] });
}
var vT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, yT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, bT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, xT = "zwn3019";
function La({
  tone: n = "raised",
  density: a = "comfortable",
  elevation: i = "subtle",
  as: s = "section",
  children: o,
  className: u,
  style: h,
  ...m
}) {
  const v = [vT[n], bT[a], yT[i], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(s, { className: v, style: h, "data-elevation": i, ...m, children: o });
}
function ST({ children: n, className: a }) {
  const i = [xT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("div", { className: i, children: n });
}
var Kr = "vrkn5p0", wT = "_93p6291", ET = "_93p6292", jT = "_93p6293", NT = "_93p6294", TT = "_93p6295", CT = "_93p6296", RT = "_93p6297", MT = "_93p6298", AT = "_93p6299", _T = "_93p629a", DT = "_93p629b", zT = "_93p629c", OT = "_93p629d", kT = "_93p629e";
function LT() {
  const { deployments: n } = Ts(), a = n.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ d.jsxs("main", { className: wT, children: [
    /* @__PURE__ */ d.jsxs("header", { className: ET, children: [
      /* @__PURE__ */ d.jsx("p", { className: jT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ d.jsxs("h1", { className: NT, children: [
        "Direct your characters.",
        /* @__PURE__ */ d.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ d.jsx("p", { className: TT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ d.jsxs("p", { className: CT, children: [
        /* @__PURE__ */ d.jsx("span", { className: RT, children: n.length }),
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
        className: MT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ d.jsx("h2", { id: "deployments-section-list", className: Kr, children: "01 / Deployments" }),
          n.length === 0 ? /* @__PURE__ */ d.jsx(
            Cs,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ d.jsx("ul", { className: AT, children: n.map((i) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(zc, { to: `/${i.deploymentId}/recipe`, className: _T, children: [
            /* @__PURE__ */ d.jsx("span", { className: DT, "aria-hidden": "true", children: UT(i.displayName) }),
            /* @__PURE__ */ d.jsxs("span", { children: [
              /* @__PURE__ */ d.jsx("span", { className: zT, children: i.displayName }),
              /* @__PURE__ */ d.jsx("span", { className: OT, children: i.deploymentId })
            ] }),
            /* @__PURE__ */ d.jsx("span", { className: kT, "aria-hidden": "true", children: "→" })
          ] }) }, i.deploymentId)) })
        ]
      }
    )
  ] });
}
function UT(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var BT = $b();
const VT = /* @__PURE__ */ Vb(BT);
function $T(n) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = n : i.appendChild(document.createTextNode(n));
}
const HT = (n) => {
  switch (n) {
    case "success":
      return FT;
    case "info":
      return GT;
    case "warning":
      return YT;
    case "error":
      return XT;
    default:
      return null;
  }
}, qT = Array(12).fill(0), IT = ({ visible: n, className: a }) => /* @__PURE__ */ me.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": n
}, /* @__PURE__ */ me.createElement("div", {
  className: "sonner-spinner"
}, qT.map((i, s) => /* @__PURE__ */ me.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${s}`
})))), FT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), YT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), GT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), XT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), PT = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ me.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ me.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), KT = () => {
  const [n, a] = me.useState(document.hidden);
  return me.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), n;
};
let Pf = 1;
class QT {
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
      const { message: s, ...o } = a, u = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : Pf++, h = this.toasts.find((v) => v.id === u), m = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), h ? this.toasts = this.toasts.map((v) => v.id === u ? (this.publish({
        ...v,
        ...a,
        id: u,
        title: s
      }), {
        ...v,
        ...a,
        id: u,
        dismissible: m,
        title: s
      }) : v) : this.addToast({
        title: s,
        ...o,
        dismissible: m,
        id: u
      }), u;
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
      let u = s !== void 0, h;
      const m = o.then(async (p) => {
        if (h = [
          "resolve",
          p
        ], me.isValidElement(p))
          u = !1, this.create({
            id: s,
            type: "default",
            message: p
          });
        else if (JT(p) && !p.ok) {
          u = !1;
          const g = typeof i.error == "function" ? await i.error(`HTTP error! status: ${p.status}`) : i.error, S = typeof i.description == "function" ? await i.description(`HTTP error! status: ${p.status}`) : i.description, w = typeof g == "object" && !me.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...w
          });
        } else if (p instanceof Error) {
          u = !1;
          const g = typeof i.error == "function" ? await i.error(p) : i.error, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof g == "object" && !me.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...w
          });
        } else if (i.success !== void 0) {
          u = !1;
          const g = typeof i.success == "function" ? await i.success(p) : i.success, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof g == "object" && !me.isValidElement(g) ? g : {
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
          u = !1;
          const x = typeof i.error == "function" ? await i.error(p) : i.error, g = typeof i.description == "function" ? await i.description(p) : i.description, E = typeof x == "object" && !me.isValidElement(x) ? x : {
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
        u && (this.dismiss(s), s = void 0), i.finally == null || i.finally.call(i);
      }), v = () => new Promise((p, x) => m.then(() => h[0] === "reject" ? x(h[1]) : p(h[1])).catch(x));
      return typeof s != "string" && typeof s != "number" ? {
        unwrap: v
      } : Object.assign(s, {
        unwrap: v
      });
    }, this.custom = (a, i) => {
      const s = i?.id || Pf++;
      return this.create({
        jsx: a(s),
        id: s,
        ...i
      }), s;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const xn = new QT(), ZT = (n, a) => {
  const i = a?.id || Pf++;
  return xn.addToast({
    title: n,
    ...a,
    id: i
  }), i;
}, JT = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", WT = ZT, eC = () => xn.toasts, tC = () => xn.getActiveToasts(), Zt = Object.assign(WT, {
  success: xn.success,
  info: xn.info,
  warning: xn.warning,
  error: xn.error,
  custom: xn.custom,
  message: xn.message,
  promise: xn.promise,
  dismiss: xn.dismiss,
  loading: xn.loading
}, {
  getHistory: eC,
  getToasts: tC
});
$T("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Xo(n) {
  return n.label !== void 0;
}
const nC = 3, aC = "24px", rC = "16px", Ry = 4e3, iC = 356, lC = 14, sC = 45, oC = 200;
function ma(...n) {
  return n.filter(Boolean).join(" ");
}
function cC(n) {
  const [a, i] = n.split("-"), s = [];
  return a && s.push(a), i && s.push(i), s;
}
const uC = (n) => {
  var a, i, s, o, u, h, m, v, p;
  const { invert: x, toast: g, unstyled: S, interacting: E, setHeights: w, visibleToasts: N, heights: C, index: T, toasts: k, expanded: R, removeToast: _, defaultRichColors: K, closeButton: ee, style: te, cancelButtonStyle: D, actionButtonStyle: q, className: F = "", descriptionClassName: oe = "", duration: ie, position: U, gap: ne, expandByDefault: Q, classNames: O, icons: A, closeButtonAriaLabel: V = "Close toast" } = n, [X, re] = me.useState(null), [M, J] = me.useState(null), [Z, ce] = me.useState(!1), [he, ve] = me.useState(!1), [_e, Me] = me.useState(!1), [Ve, Jt] = me.useState(!1), [Pt, _t] = me.useState(!1), [We, pt] = me.useState(0), [fe, ke] = me.useState(0), De = me.useRef(g.duration || ie || Ry), Te = me.useRef(null), bt = me.useRef(null), xt = T === 0, dn = T + 1 <= N, Ht = g.type, On = g.dismissible !== !1, qt = g.className || "", ye = g.descriptionClassName || "", ze = me.useMemo(() => C.findIndex((Oe) => Oe.toastId === g.id) || 0, [
    C,
    g.id
  ]), Ke = me.useMemo(() => {
    var Oe;
    return (Oe = g.closeButton) != null ? Oe : ee;
  }, [
    g.closeButton,
    ee
  ]), tt = me.useMemo(() => g.duration || ie || Ry, [
    g.duration,
    ie
  ]), It = me.useRef(0), Ft = me.useRef(0), Nr = me.useRef(0), la = me.useRef(null), [Zn, Wt] = U.split("-"), Tt = me.useMemo(() => C.reduce((Oe, ct, Dt) => Dt >= ze ? Oe : Oe + ct.height, 0), [
    C,
    ze
  ]), Yt = KT(), ei = g.invert || x, Ha = Ht === "loading";
  Ft.current = me.useMemo(() => ze * ne + Tt, [
    ze,
    Tt
  ]), me.useEffect(() => {
    De.current = tt;
  }, [
    tt
  ]), me.useEffect(() => {
    ce(!0);
  }, []), me.useEffect(() => {
    const Oe = bt.current;
    if (Oe) {
      const ct = Oe.getBoundingClientRect().height;
      return ke(ct), w((Dt) => [
        {
          toastId: g.id,
          height: ct,
          position: g.position
        },
        ...Dt
      ]), () => w((Dt) => Dt.filter((Gt) => Gt.toastId !== g.id));
    }
  }, [
    w,
    g.id
  ]), me.useLayoutEffect(() => {
    if (!Z) return;
    const Oe = bt.current, ct = Oe.style.height;
    Oe.style.height = "auto";
    const Dt = Oe.getBoundingClientRect().height;
    Oe.style.height = ct, ke(Dt), w((Gt) => Gt.find((rt) => rt.toastId === g.id) ? Gt.map((rt) => rt.toastId === g.id ? {
      ...rt,
      height: Dt
    } : rt) : [
      {
        toastId: g.id,
        height: Dt,
        position: g.position
      },
      ...Gt
    ]);
  }, [
    Z,
    g.title,
    g.description,
    w,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const kn = me.useCallback(() => {
    ve(!0), pt(Ft.current), w((Oe) => Oe.filter((ct) => ct.toastId !== g.id)), setTimeout(() => {
      _(g);
    }, oC);
  }, [
    g,
    _,
    w,
    Ft
  ]);
  me.useEffect(() => {
    if (g.promise && Ht === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let Oe;
    return R || E || Yt ? (() => {
      if (Nr.current < It.current) {
        const Gt = (/* @__PURE__ */ new Date()).getTime() - It.current;
        De.current = De.current - Gt;
      }
      Nr.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      De.current !== 1 / 0 && (It.current = (/* @__PURE__ */ new Date()).getTime(), Oe = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), kn();
      }, De.current));
    })(), () => clearTimeout(Oe);
  }, [
    R,
    E,
    g,
    Ht,
    Yt,
    kn
  ]), me.useEffect(() => {
    g.delete && (kn(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    kn,
    g.delete
  ]);
  function ga() {
    var Oe;
    if (A?.loading) {
      var ct;
      return /* @__PURE__ */ me.createElement("div", {
        className: ma(O?.loader, g == null || (ct = g.classNames) == null ? void 0 : ct.loader, "sonner-loader"),
        "data-visible": Ht === "loading"
      }, A.loading);
    }
    return /* @__PURE__ */ me.createElement(IT, {
      className: ma(O?.loader, g == null || (Oe = g.classNames) == null ? void 0 : Oe.loader),
      visible: Ht === "loading"
    });
  }
  const Jn = g.icon || A?.[Ht] || HT(Ht);
  var sa, hn;
  return /* @__PURE__ */ me.createElement("li", {
    tabIndex: 0,
    ref: bt,
    className: ma(F, qt, O?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, O?.default, O?.[Ht], g == null || (i = g.classNames) == null ? void 0 : i[Ht]),
    "data-sonner-toast": "",
    "data-rich-colors": (sa = g.richColors) != null ? sa : K,
    "data-styled": !(g.jsx || g.unstyled || S),
    "data-mounted": Z,
    "data-promise": !!g.promise,
    "data-swiped": Pt,
    "data-removed": he,
    "data-visible": dn,
    "data-y-position": Zn,
    "data-x-position": Wt,
    "data-index": T,
    "data-front": xt,
    "data-swiping": _e,
    "data-dismissible": On,
    "data-type": Ht,
    "data-invert": ei,
    "data-swipe-out": Ve,
    "data-swipe-direction": M,
    "data-expanded": !!(R || Q && Z),
    "data-testid": g.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": k.length - T,
      "--offset": `${he ? We : Ft.current}px`,
      "--initial-height": Q ? "auto" : `${fe}px`,
      ...te,
      ...g.style
    },
    onDragEnd: () => {
      Me(!1), re(null), la.current = null;
    },
    onPointerDown: (Oe) => {
      Oe.button !== 2 && (Ha || !On || (Te.current = /* @__PURE__ */ new Date(), pt(Ft.current), Oe.target.setPointerCapture(Oe.pointerId), Oe.target.tagName !== "BUTTON" && (Me(!0), la.current = {
        x: Oe.clientX,
        y: Oe.clientY
      })));
    },
    onPointerUp: () => {
      var Oe, ct, Dt;
      if (Ve || !On) return;
      la.current = null;
      const Gt = Number(((Oe = bt.current) == null ? void 0 : Oe.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), wn = Number(((ct = bt.current) == null ? void 0 : ct.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), rt = (/* @__PURE__ */ new Date()).getTime() - ((Dt = Te.current) == null ? void 0 : Dt.getTime()), en = X === "x" ? Gt : wn, va = Math.abs(en) / rt;
      if (Math.abs(en) >= sC || va > 0.11) {
        pt(Ft.current), g.onDismiss == null || g.onDismiss.call(g, g), J(X === "x" ? Gt > 0 ? "right" : "left" : wn > 0 ? "down" : "up"), kn(), Jt(!0);
        return;
      } else {
        var ln, z;
        (ln = bt.current) == null || ln.style.setProperty("--swipe-amount-x", "0px"), (z = bt.current) == null || z.style.setProperty("--swipe-amount-y", "0px");
      }
      _t(!1), Me(!1), re(null);
    },
    onPointerMove: (Oe) => {
      var ct, Dt, Gt;
      if (!la.current || !On || ((ct = window.getSelection()) == null ? void 0 : ct.toString().length) > 0) return;
      const rt = Oe.clientY - la.current.y, en = Oe.clientX - la.current.x;
      var va;
      const ln = (va = n.swipeDirections) != null ? va : cC(U);
      !X && (Math.abs(en) > 1 || Math.abs(rt) > 1) && re(Math.abs(en) > Math.abs(rt) ? "x" : "y");
      let z = {
        x: 0,
        y: 0
      };
      const $ = (I) => 1 / (1.5 + Math.abs(I) / 20);
      if (X === "y") {
        if (ln.includes("top") || ln.includes("bottom"))
          if (ln.includes("top") && rt < 0 || ln.includes("bottom") && rt > 0)
            z.y = rt;
          else {
            const I = rt * $(rt);
            z.y = Math.abs(I) < Math.abs(rt) ? I : rt;
          }
      } else if (X === "x" && (ln.includes("left") || ln.includes("right")))
        if (ln.includes("left") && en < 0 || ln.includes("right") && en > 0)
          z.x = en;
        else {
          const I = en * $(en);
          z.x = Math.abs(I) < Math.abs(en) ? I : en;
        }
      (Math.abs(z.x) > 0 || Math.abs(z.y) > 0) && _t(!0), (Dt = bt.current) == null || Dt.style.setProperty("--swipe-amount-x", `${z.x}px`), (Gt = bt.current) == null || Gt.style.setProperty("--swipe-amount-y", `${z.y}px`);
    }
  }, Ke && !g.jsx && Ht !== "loading" ? /* @__PURE__ */ me.createElement("button", {
    "aria-label": V,
    "data-disabled": Ha,
    "data-close-button": !0,
    onClick: Ha || !On ? () => {
    } : () => {
      kn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: ma(O?.closeButton, g == null || (s = g.classNames) == null ? void 0 : s.closeButton)
  }, (hn = A?.close) != null ? hn : PT) : null, (Ht || g.icon || g.promise) && g.icon !== null && (A?.[Ht] !== null || g.icon) ? /* @__PURE__ */ me.createElement("div", {
    "data-icon": "",
    className: ma(O?.icon, g == null || (o = g.classNames) == null ? void 0 : o.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || ga() : null, g.type !== "loading" ? Jn : null) : null, /* @__PURE__ */ me.createElement("div", {
    "data-content": "",
    className: ma(O?.content, g == null || (u = g.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ me.createElement("div", {
    "data-title": "",
    className: ma(O?.title, g == null || (h = g.classNames) == null ? void 0 : h.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ me.createElement("div", {
    "data-description": "",
    className: ma(oe, ye, O?.description, g == null || (m = g.classNames) == null ? void 0 : m.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ me.isValidElement(g.cancel) ? g.cancel : g.cancel && Xo(g.cancel) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || D,
    onClick: (Oe) => {
      Xo(g.cancel) && On && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, Oe), kn());
    },
    className: ma(O?.cancelButton, g == null || (v = g.classNames) == null ? void 0 : v.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ me.isValidElement(g.action) ? g.action : g.action && Xo(g.action) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || q,
    onClick: (Oe) => {
      Xo(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, Oe), !Oe.defaultPrevented && kn());
    },
    className: ma(O?.actionButton, g == null || (p = g.classNames) == null ? void 0 : p.actionButton)
  }, g.action.label) : null);
};
function My() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function dC(n, a) {
  const i = {};
  return [
    n,
    a
  ].forEach((s, o) => {
    const u = o === 1, h = u ? "--mobile-offset" : "--offset", m = u ? rC : aC;
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
const fC = /* @__PURE__ */ me.forwardRef(function(a, i) {
  const { id: s, invert: o, position: u = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: v, className: p, offset: x, mobileOffset: g, theme: S = "light", richColors: E, duration: w, style: N, visibleToasts: C = nC, toastOptions: T, dir: k = My(), gap: R = lC, icons: _, containerAriaLabel: K = "Notifications" } = a, [ee, te] = me.useState([]), D = me.useMemo(() => s ? ee.filter((Z) => Z.toasterId === s) : ee.filter((Z) => !Z.toasterId), [
    ee,
    s
  ]), q = me.useMemo(() => Array.from(new Set([
    u
  ].concat(D.filter((Z) => Z.position).map((Z) => Z.position)))), [
    D,
    u
  ]), [F, oe] = me.useState([]), [ie, U] = me.useState(!1), [ne, Q] = me.useState(!1), [O, A] = me.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), V = me.useRef(null), X = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), re = me.useRef(null), M = me.useRef(!1), J = me.useCallback((Z) => {
    te((ce) => {
      var he;
      return (he = ce.find((ve) => ve.id === Z.id)) != null && he.delete || xn.dismiss(Z.id), ce.filter(({ id: ve }) => ve !== Z.id);
    });
  }, []);
  return me.useEffect(() => xn.subscribe((Z) => {
    if (Z.dismiss) {
      requestAnimationFrame(() => {
        te((ce) => ce.map((he) => he.id === Z.id ? {
          ...he,
          delete: !0
        } : he));
      });
      return;
    }
    setTimeout(() => {
      VT.flushSync(() => {
        te((ce) => {
          const he = ce.findIndex((ve) => ve.id === Z.id);
          return he !== -1 ? [
            ...ce.slice(0, he),
            {
              ...ce[he],
              ...Z
            },
            ...ce.slice(he + 1)
          ] : [
            Z,
            ...ce
          ];
        });
      });
    });
  }), [
    ee
  ]), me.useEffect(() => {
    if (S !== "system") {
      A(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? A("dark") : A("light")), typeof window > "u") return;
    const Z = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Z.addEventListener("change", ({ matches: ce }) => {
        A(ce ? "dark" : "light");
      });
    } catch {
      Z.addListener(({ matches: he }) => {
        try {
          A(he ? "dark" : "light");
        } catch (ve) {
          console.error(ve);
        }
      });
    }
  }, [
    S
  ]), me.useEffect(() => {
    ee.length <= 1 && U(!1);
  }, [
    ee
  ]), me.useEffect(() => {
    const Z = (ce) => {
      var he;
      if (h.every((Me) => ce[Me] || ce.code === Me)) {
        var _e;
        U(!0), (_e = V.current) == null || _e.focus();
      }
      ce.code === "Escape" && (document.activeElement === V.current || (he = V.current) != null && he.contains(document.activeElement)) && U(!1);
    };
    return document.addEventListener("keydown", Z), () => document.removeEventListener("keydown", Z);
  }, [
    h
  ]), me.useEffect(() => {
    if (V.current)
      return () => {
        re.current && (re.current.focus({
          preventScroll: !0
        }), re.current = null, M.current = !1);
      };
  }, [
    V.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ me.createElement("section", {
    ref: i,
    "aria-label": `${K} ${X}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, q.map((Z, ce) => {
    var he;
    const [ve, _e] = Z.split("-");
    return D.length ? /* @__PURE__ */ me.createElement("ol", {
      key: Z,
      dir: k === "auto" ? My() : k,
      tabIndex: -1,
      ref: V,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": O,
      "data-y-position": ve,
      "data-x-position": _e,
      style: {
        "--front-toast-height": `${((he = F[0]) == null ? void 0 : he.height) || 0}px`,
        "--width": `${iC}px`,
        "--gap": `${R}px`,
        ...N,
        ...dC(x, g)
      },
      onBlur: (Me) => {
        M.current && !Me.currentTarget.contains(Me.relatedTarget) && (M.current = !1, re.current && (re.current.focus({
          preventScroll: !0
        }), re.current = null));
      },
      onFocus: (Me) => {
        Me.target instanceof HTMLElement && Me.target.dataset.dismissible === "false" || M.current || (M.current = !0, re.current = Me.relatedTarget);
      },
      onMouseEnter: () => U(!0),
      onMouseMove: () => U(!0),
      onMouseLeave: () => {
        ne || U(!1);
      },
      onDragEnd: () => U(!1),
      onPointerDown: (Me) => {
        Me.target instanceof HTMLElement && Me.target.dataset.dismissible === "false" || Q(!0);
      },
      onPointerUp: () => Q(!1)
    }, D.filter((Me) => !Me.position && ce === 0 || Me.position === Z).map((Me, Ve) => {
      var Jt, Pt;
      return /* @__PURE__ */ me.createElement(uC, {
        key: Me.id,
        icons: _,
        index: Ve,
        toast: Me,
        defaultRichColors: E,
        duration: (Jt = T?.duration) != null ? Jt : w,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: C,
        closeButton: (Pt = T?.closeButton) != null ? Pt : v,
        interacting: ne,
        position: Z,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: J,
        toasts: D.filter((_t) => _t.position == Me.position),
        heights: F.filter((_t) => _t.position == Me.position),
        setHeights: oe,
        expandByDefault: m,
        gap: R,
        expanded: ie,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Ay = 32, _y = -30, Dy = -6, zy = 0.5, Oy = 2, ky = -24, Ly = 24, Uy = -12, By = 12, Vy = -12, $y = 12, Hy = -60, qy = -20;
class Qi extends Error {
  constructor(a, i) {
    super(i), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function Sx(n, a, i, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, u = `${$a}${o}`, h = await fetch(u, {
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
    throw new Error(await Oc(h, "apply"));
  return await h.json();
}
async function hC(n, a, i, s, o = {}) {
  const u = `/deployments/${encodeURIComponent(n)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(i)}/edit`, h = `${$a}${u}`, m = await fetch(h, {
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
    throw new Error(await Oc(m, "apply"));
  return await m.json();
}
async function mC(n, a, i = {}) {
  const s = `${$a}/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
    method: "DELETE",
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function pC(n, a, i, s = {}) {
  const o = `${$a}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, u = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: i }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!u.ok)
    throw new Error(await Oc(u, "preview"));
  return u.blob();
}
async function uc(n, a, i, s = 50, o = {}) {
  const u = `${$a}/audit/${encodeURIComponent(a)}/${encodeURIComponent(i)}?deploymentId=${encodeURIComponent(n)}&limit=${encodeURIComponent(String(s))}`, h = await fetch(u, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!h.ok)
    throw new Error(await Oc(h, "audit fetch"));
  return await h.json();
}
function Sn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function wx(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > Ay)
    return {
      message: `Chain exceeds the maximum of ${Ay} operations.`
    };
  for (const i of n.ops) {
    const s = gC(i, a);
    if (s) return s;
  }
  return null;
}
function gC(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return vC(n.id, n.start_ms, n.end_ms, a);
    case "normalize":
      return n.target_lufs < _y || n.target_lufs > Dy ? {
        opId: n.id,
        message: `Normalize target must be between ${_y} and ${Dy} LUFS.`
      } : null;
    case "speed":
      return n.factor < zy || n.factor > Oy ? {
        opId: n.id,
        message: `Speed factor must be between ${zy}× and ${Oy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return n.duration_ms < 1 ? { opId: n.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return n.gain_db < ky || n.gain_db > Ly ? {
        opId: n.id,
        message: `Volume must be between ${ky} and ${Ly} dB.`
      } : null;
    case "eq3":
      for (const [i, s] of [
        ["low_db", n.low_db],
        ["mid_db", n.mid_db],
        ["high_db", n.high_db]
      ])
        if (s < Uy || s > By)
          return {
            opId: n.id,
            message: `EQ ${i} must be between ${Uy} and ${By} dB.`
          };
      return null;
    case "pitch_shift":
      return n.semitones < Vy || n.semitones > $y ? {
        opId: n.id,
        message: `Pitch must be between ${Vy} and ${$y} semitones.`
      } : null;
    case "silence_strip":
      return n.threshold_db < Hy || n.threshold_db > qy ? {
        opId: n.id,
        message: `Silence threshold must be between ${Hy} and ${qy} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function vC(n, a, i, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : i <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && i > s ? { opId: n, message: "End extends past source duration." } : null;
}
async function Oc(n, a) {
  const i = await n.json().catch(() => null);
  return i?.error?.message ?? i?.message ?? `${a} failed: ${n.status}`;
}
var yC = "_3f2ar0", bC = "_3f2ar1", xC = "_3f2ar2", SC = "_3f2ar3", wC = "_3f2ar4", EC = "_3f2ar6", Jl = "_3f2ar7", Wl = "_3f2ar8", es = "_3f2ar9", Iy = "_3f2ara", Fy = "_3f2arb";
function jC({ label: n, glyph: a = "?", children: i }) {
  const [s, o] = y.useState(!1), u = y.useRef(null), h = y.useId(), m = `${h}-content`, v = y.useCallback(() => o(!1), []);
  return y.useEffect(() => {
    if (!s) return;
    const p = (g) => {
      u.current && (g.target instanceof Node && u.current.contains(g.target) || v());
    }, x = (g) => {
      g.key === "Escape" && v();
    };
    return document.addEventListener("mousedown", p), document.addEventListener("keydown", x), () => {
      document.removeEventListener("mousedown", p), document.removeEventListener("keydown", x);
    };
  }, [s, v]), /* @__PURE__ */ d.jsxs("span", { ref: u, className: yC, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        id: h,
        className: bC,
        "aria-expanded": s,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ d.jsx("span", { className: xC, "aria-hidden": "true", children: a }),
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
        className: SC,
        children: i
      }
    )
  ] });
}
var NC = "a6ki8u0", TC = "a6ki8u1", CC = "a6ki8u2", RC = "a6ki8u3", MC = "a6ki8u4", AC = "a6ki8u5", _C = "a6ki8u6", sf = "a6ki8u7", DC = "a6ki8u8", zC = "a6ki8u9", OC = "a6ki8ua", kC = "a6ki8ub", LC = "a6ki8uc", UC = "a6ki8ud", BC = "a6ki8ue", VC = "a6ki8uf", $C = "a6ki8ug", HC = "a6ki8uh", qC = "a6ki8ui", IC = "_1lguv7x0", FC = "_1lguv7x1", YC = "_1lguv7x2", GC = "_1lguv7x3", XC = "_1lguv7x4", PC = "_1lguv7x5", KC = "_1lguv7x6", QC = "_1lguv7x7", ZC = "_1lguv7x8", JC = "_1lguv7x9", WC = "_1lguv7xa", eR = "_1lguv7xb", tR = "_1lguv7xc", Yy = "_1lguv7xd", nR = "_1lguv7xe", aR = "_1lguv7xf", of = "_1lguv7xg", rR = "_1lguv7xh";
const iR = 28;
function lR(n) {
  if (!n) return 1;
  let a = 0;
  for (let i = 0; i < Math.min(n.length, 12); i++)
    a = a * 33 + n.charCodeAt(i) >>> 0;
  return a || 1;
}
function sR(n, a) {
  const i = new Array(a);
  let s = n;
  for (let o = 0; o < a; o++) {
    s = (s * 9301 + 49297) % 233280;
    const u = s / 233280, h = Math.min(1, o / 6, (a - o) / 6);
    i[o] = Math.max(0.18, h * (0.32 + u * 0.68));
  }
  return i;
}
function oR(n) {
  if (n == null) return "—";
  const a = Math.max(0, Math.round(n / 1e3)), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function cR(n) {
  return n ? `${(n / 1e3).toFixed(n % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function uR({
  asset: n,
  presentation: a,
  usedBy: i,
  isPlaying: s,
  onTogglePlay: o,
  onRename: u,
  onCopyName: h,
  onDelete: m,
  onPlaybackEnded: v
}) {
  const [p, x] = y.useState(!1), [g, S] = y.useState(n.displayName), E = y.useRef(null), w = y.useMemo(() => lR(n.contentSha256), [n.contentSha256]), N = y.useMemo(() => sR(w, iR), [w]), C = y.useMemo(() => dT(n), [n]);
  y.useEffect(() => {
    S(n.displayName);
  }, [n.displayName]), y.useEffect(() => {
    const R = E.current;
    R && (s && C ? R.play().catch(() => {
    }) : (R.pause(), R.currentTime = 0));
  }, [s, C]);
  const T = async () => {
    const R = g.trim();
    if (!R || R === n.displayName) {
      x(!1), S(n.displayName);
      return;
    }
    try {
      await u(R);
    } finally {
      x(!1);
    }
  }, k = `${oR(n.durationMs)} · ${cR(n.sampleRate)}`;
  return /* @__PURE__ */ d.jsxs("article", { className: IC, "data-playing": s ? "true" : "false", children: [
    /* @__PURE__ */ d.jsxs("header", { className: FC, children: [
      /* @__PURE__ */ d.jsx("span", { className: YC, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ d.jsxs("div", { className: GC, children: [
        p ? /* @__PURE__ */ d.jsx(
          "input",
          {
            className: PC,
            value: g,
            autoFocus: !0,
            onChange: (R) => S(R.target.value),
            onBlur: () => {
              T();
            },
            onKeyDown: (R) => {
              R.key === "Enter" ? (R.preventDefault(), R.currentTarget.blur()) : R.key === "Escape" && (x(!1), S(n.displayName));
            },
            "aria-label": `Rename ${n.displayName}`
          }
        ) : /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: XC,
            onDoubleClick: () => x(!0),
            title: "Double-click to rename",
            children: n.displayName
          }
        ),
        /* @__PURE__ */ d.jsx("span", { className: KC, children: k })
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: QC, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: ZC,
        "data-playing": s ? "true" : "false",
        disabled: C == null,
        title: C ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": s ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ d.jsx("span", { className: JC, "aria-hidden": "true", children: s ? "❚❚" : "▶" }),
          /* @__PURE__ */ d.jsx("span", { className: WC, "aria-hidden": "true", children: N.map((R, _) => /* @__PURE__ */ d.jsx("span", { className: eR, style: { height: `${Math.round(R * 100)}%` } }, _)) })
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("footer", { className: tR, children: [
      i.length > 0 ? /* @__PURE__ */ d.jsxs("span", { className: Yy, children: [
        /* @__PURE__ */ d.jsx("span", { children: "used by" }),
        i.map((R) => /* @__PURE__ */ d.jsx(
          "span",
          {
            className: nR,
            style: { color: R.color, borderColor: R.color },
            children: R.characterName
          },
          R.characterName
        ))
      ] }) : /* @__PURE__ */ d.jsx("span", { className: Yy, children: "unassigned" }),
      /* @__PURE__ */ d.jsxs("span", { className: aR, children: [
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: of,
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
            className: of,
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
            className: of,
            "data-tone": "danger",
            title: "Delete",
            "aria-label": "Delete voice",
            onClick: m,
            children: "✕"
          }
        )
      ] })
    ] }),
    C && /* @__PURE__ */ d.jsx(
      "audio",
      {
        ref: E,
        src: C,
        preload: "none",
        className: rR,
        onEnded: v
      }
    )
  ] });
}
var dR = "_17eol302", fR = "_17eol303", hR = "_17eol304", mR = "_17eol305", pR = "_17eol306", gR = "_17eol307", Ui = "_17eol308", vR = "_17eol309", yR = "_17eol30a", bR = "_17eol30b", xR = "_17eol30c", SR = "_17eol30d", Gy = "_17eol30e", wR = "_17eol30g";
function ER() {
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
function jR(n) {
  const a = Math.max(0, Math.floor(n / 1e3)), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function NR({
  open: n,
  defaultName: a,
  onClose: i,
  onSubmit: s
}) {
  const [o, u] = y.useState("idle"), [h, m] = y.useState(null), [v, p] = y.useState(0), [x, g] = y.useState(null), [S, E] = y.useState(a), [w, N] = y.useState(!1), C = y.useRef(null), T = y.useRef(null), k = y.useRef([]), R = y.useRef(0), _ = y.useRef(null), K = y.useRef(null), ee = y.useRef({ mime: "audio/webm", ext: "webm" }), te = y.useCallback(() => {
    if (T.current) {
      for (const U of T.current.getTracks()) U.stop();
      T.current = null;
    }
    _.current != null && (window.clearInterval(_.current), _.current = null);
  }, []), D = y.useCallback(() => {
    te(), x && URL.revokeObjectURL(x), g(null), k.current = [], K.current = null, p(0), m(null), u("idle");
  }, [x, te]);
  if (y.useEffect(() => {
    n || (D(), E(a));
  }, [n, a, D]), y.useEffect(() => () => {
    te(), x && URL.revokeObjectURL(x);
  }, [x, te]), !n) return null;
  const q = async () => {
    m(null), u("preparing");
    try {
      const U = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = U;
      const ne = ER();
      ee.current = ne;
      const Q = ne.mime ? new MediaRecorder(U, { mimeType: ne.mime }) : new MediaRecorder(U);
      C.current = Q, k.current = [], Q.ondataavailable = (O) => {
        O.data && O.data.size > 0 && k.current.push(O.data);
      }, Q.onstop = () => {
        const O = ne.mime || "audio/webm", A = new Blob(k.current, { type: O }), V = new File([A], `${S || a || "recording"}.${ne.ext}`, {
          type: O
        });
        K.current = V;
        const X = URL.createObjectURL(A);
        g(X), u("ready"), te();
      }, Q.start(), R.current = Date.now(), p(0), _.current = window.setInterval(() => {
        p(Date.now() - R.current);
      }, 200), u("recording");
    } catch (U) {
      const ne = U instanceof Error ? U.message : "could not access microphone";
      m(ne), u(ne.toLowerCase().includes("denied") ? "denied" : "error"), te();
    }
  }, F = () => {
    const U = C.current;
    U && U.state !== "inactive" && U.stop(), _.current != null && (window.clearInterval(_.current), _.current = null);
  }, oe = async () => {
    const U = K.current;
    if (!U) return;
    const ne = (S || a).trim();
    if (!ne) {
      m("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await s(U, ne), i();
    } catch (Q) {
      m(Q instanceof Error ? Q.message : "upload failed");
    } finally {
      N(!1);
    }
  }, ie = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ d.jsx("div", { className: dR, role: "presentation", onClick: i, children: /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: fR,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (U) => U.stopPropagation(),
      children: [
        /* @__PURE__ */ d.jsx("h2", { id: "mic-recorder-heading", className: hR, children: "Record reference audio" }),
        /* @__PURE__ */ d.jsx("p", { className: mR, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ d.jsx(
          "span",
          {
            className: pR,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: ie
          }
        ),
        /* @__PURE__ */ d.jsx("div", { className: xR, "aria-live": "polite", children: jR(v) }),
        /* @__PURE__ */ d.jsxs("div", { className: gR, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ d.jsxs(
            "button",
            {
              type: "button",
              className: Ui,
              "data-tone": "danger",
              onClick: () => {
                q();
              },
              children: [
                /* @__PURE__ */ d.jsx("span", { className: Gy, "aria-hidden": "true" }),
                "Record"
              ]
            }
          ),
          o === "preparing" && /* @__PURE__ */ d.jsx("button", { type: "button", className: Ui, disabled: !0, children: "Starting…" }),
          o === "recording" && /* @__PURE__ */ d.jsxs(
            "button",
            {
              type: "button",
              className: Ui,
              "data-tone": "danger",
              "data-active": "true",
              onClick: F,
              children: [
                /* @__PURE__ */ d.jsx("span", { className: Gy, "aria-hidden": "true" }),
                "Stop"
              ]
            }
          ),
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
        x && /* @__PURE__ */ d.jsx("audio", { className: SR, src: x, controls: !0, preload: "auto" }),
        /* @__PURE__ */ d.jsxs("label", { className: vR, children: [
          /* @__PURE__ */ d.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              className: yR,
              value: S,
              onChange: (U) => E(U.target.value),
              placeholder: a
            }
          )
        ] }),
        h && /* @__PURE__ */ d.jsx("div", { className: bR, children: h }),
        /* @__PURE__ */ d.jsxs("div", { className: wR, children: [
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
function TR({
  deploymentId: n,
  voiceAssets: a,
  mappings: i,
  characterColors: s,
  onVoiceAssetsChange: o
}) {
  const [u, h] = y.useState(""), [m, v] = y.useState("all"), [p, x] = y.useState(!1), [g, S] = y.useState(null), [E, w] = y.useState(!1), [N, C] = y.useState(!1), T = y.useRef(null), k = y.useCallback(
    (U) => "upload",
    []
  ), R = y.useMemo(() => {
    const U = u.trim().toLowerCase();
    return a.filter((ne) => {
      const Q = k(ne);
      return !(m === "uploaded" && Q !== "upload" || m === "preset" && Q !== "preset" || U && !ne.displayName.toLowerCase().includes(U));
    });
  }, [a, u, m, k]), _ = y.useMemo(
    () => a.filter((U) => k(U) === "upload").length,
    [a, k]
  ), K = y.useCallback(
    (U) => {
      const ne = [], Q = /* @__PURE__ */ new Set();
      for (const O of i)
        O.speakerVoiceAssetId === U && (Q.has(O.characterName) || (Q.add(O.characterName), ne.push({
          characterName: O.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: s[O.characterName] ?? "#ba9eff"
        })));
      return ne;
    },
    [i, s]
  ), ee = y.useCallback(
    async (U) => {
      const ne = Array.from(U).slice(0, 8);
      if (ne.length !== 0) {
        C(!0);
        try {
          const Q = [];
          for (const O of ne) {
            if (!O.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(O.name)) {
              Zt.error(`${O.name}: not an audio file`);
              continue;
            }
            const A = O.name.replace(/\.[^.]+$/, "");
            try {
              const V = await vc(n, O, A, "speaker");
              Q.push(V), Zt.success(`Added ${V.displayName}`);
            } catch (V) {
              Zt.error(V instanceof Error ? V.message : `${O.name}: upload failed`);
            }
          }
          Q.length > 0 && o([...Q, ...a]);
        } finally {
          C(!1);
        }
      }
    },
    [n, a, o]
  ), te = (U) => {
    U.preventDefault(), x(!1), U.dataTransfer?.files && ee(U.dataTransfer.files);
  }, D = y.useCallback(async () => {
    const U = window.prompt("Paste an audio URL (https://…)");
    if (U)
      try {
        const ne = await fetch(U);
        if (!ne.ok) throw new Error(`fetch failed: ${ne.status}`);
        const Q = await ne.blob(), O = U.split("/").pop()?.split("?")[0] ?? "voice.wav", A = new File([Q], O, { type: Q.type || "audio/wav" });
        await ee([A]);
      } catch (ne) {
        Zt.error(ne instanceof Error ? ne.message : "could not fetch URL");
      }
  }, [ee]), q = y.useCallback(
    async (U, ne) => {
      try {
        const Q = await uT(n, U, ne);
        o(
          a.map((O) => O.voiceAssetId === U ? Q : O)
        ), Zt.success(`Renamed to ${Q.displayName}`);
      } catch (Q) {
        Zt.error(Q instanceof Error ? Q.message : "rename failed");
      }
    },
    [n, a, o]
  ), F = y.useCallback((U) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(U), Zt.success("Copied name")) : Zt.error("Clipboard unavailable");
  }, []), oe = y.useCallback(
    async (U) => {
      if (window.confirm(`Delete "${U.displayName}"? Mappings using it will reset.`))
        try {
          await cT(n, U.voiceAssetId), o(a.filter((Q) => Q.voiceAssetId !== U.voiceAssetId)), Zt.success(`Deleted ${U.displayName}`);
        } catch (Q) {
          Zt.error(Q instanceof Error ? Q.message : "delete failed");
        }
    },
    [n, a, o]
  );
  return /* @__PURE__ */ d.jsxs("div", { className: NC, children: [
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: TC,
        "data-over": p ? "true" : "false",
        onDragOver: (U) => {
          U.preventDefault(), x(!0);
        },
        onDragLeave: () => x(!1),
        onDrop: te,
        children: [
          /* @__PURE__ */ d.jsx("span", { className: CC, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ d.jsxs("div", { className: RC, children: [
            /* @__PURE__ */ d.jsxs("div", { className: MC, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ d.jsx("span", { className: AC, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: _C, children: [
              "or",
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  className: sf,
                  onClick: () => T.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  className: sf,
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
                  className: sf,
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
              className: DC,
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
              className: qC,
              onChange: (U) => {
                U.target.files && (ee(U.target.files), U.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: zC, children: [
      /* @__PURE__ */ d.jsxs("label", { className: OC, children: [
        /* @__PURE__ */ d.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            className: kC,
            value: u,
            onChange: (U) => h(U.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: LC, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([U, ne]) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: UC,
          "data-active": m === U ? "true" : "false",
          onClick: () => v(U),
          children: ne
        },
        U
      )) }),
      /* @__PURE__ */ d.jsxs("span", { className: $C, children: [
        /* @__PURE__ */ d.jsx("span", { className: HC, children: a.length }),
        " voices",
        /* @__PURE__ */ d.jsx("span", { children: "·" }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          _,
          " uploaded"
        ] })
      ] })
    ] }),
    R.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: VC, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ d.jsx("div", { className: BC, children: R.map((U) => {
      const ne = k(U);
      return /* @__PURE__ */ d.jsx(
        uR,
        {
          asset: U,
          presentation: ne,
          usedBy: K(U.voiceAssetId),
          isPlaying: g === U.voiceAssetId,
          onTogglePlay: () => S((Q) => Q === U.voiceAssetId ? null : U.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (Q) => q(U.voiceAssetId, Q),
          onCopyName: () => F(U.displayName),
          onDelete: ne === "upload" ? () => void oe(U) : void 0
        },
        U.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ d.jsx(
      NR,
      {
        open: E,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => w(!1),
        onSubmit: async (U, ne) => {
          await ie(U, ne);
        }
      }
    )
  ] });
  async function ie(U, ne) {
    C(!0);
    try {
      const Q = await vc(n, U, ne, "speaker");
      o([Q, ...a]), Zt.success(`Recorded ${Q.displayName}`);
    } catch (Q) {
      throw Zt.error(Q instanceof Error ? Q.message : "upload failed"), Q;
    } finally {
      C(!1);
    }
  }
}
async function Ex(n) {
  return ht(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function CR(n, a, i) {
  return ht("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: i })
  });
}
async function RR(n, a) {
  await ht(
    `/presets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
var Xy = "_190jlds0", MR = "_190jlds1", AR = "_190jlds2", _R = "_190jlds3", DR = "_190jlds4", zR = "_190jlds5", OR = "_190jlds7", kR = "_190jlds8", LR = "_190jlds9", UR = "_190jldsa", BR = "_190jldsb", Py = "_190jldsc", VR = "_190jldsd", Ky = "_190jldse", $R = "_190jldsf", HR = "_190jldsg", qR = "_190jldsh", jx = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Nx = { sm: "_4ydn546", md: "_4ydn547", lg: "_4ydn548" };
function ft({
  variant: n = "primary",
  size: a = "md",
  type: i = "button",
  loading: s = !1,
  disabled: o,
  children: u,
  className: h,
  style: m,
  ...v
}) {
  const p = [jx[n], Nx[a], h].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(
    "button",
    {
      type: i,
      className: p,
      style: m,
      disabled: s || o,
      "aria-busy": s || void 0,
      ...v,
      children: u
    }
  );
}
function IR({
  deploymentId: n,
  targets: a,
  onRevertToIdentity: i,
  onRevertToChain: s,
  emptyHint: o
}) {
  const [u, h] = y.useState(() => Bi(a[0])), [m, v] = y.useState([]), [p, x] = y.useState(!1), [g, S] = y.useState(null), [E, w] = y.useState(!1), [N, C] = y.useState(null), T = y.useMemo(
    () => a.find((_) => Bi(_) === u) ?? a[0],
    [a, u]
  );
  y.useEffect(() => {
    a.length && (a.some((_) => Bi(_) === u) || h(Bi(a[0])));
  }, [a, u]), y.useEffect(() => {
    if (!T) {
      v([]);
      return;
    }
    let _ = !1;
    return x(!0), S(null), uc(n, T.kind, T.id, 50).then((K) => {
      _ || v(K.entries);
    }).catch((K) => {
      _ || S(K instanceof Error ? K.message : "audit fetch failed");
    }).finally(() => {
      _ || x(!1);
    }), () => {
      _ = !0;
    };
  }, [n, T]);
  const k = y.useCallback(() => {
    if (!T) return;
    const _ = {
      deploymentId: n,
      targetKind: T.kind,
      targetId: T.id,
      targetLabel: T.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, K = new Blob([JSON.stringify(_, null, 2)], {
      type: "application/json"
    }), ee = URL.createObjectURL(K), te = document.createElement("a");
    te.href = ee, te.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(te), te.click(), document.body.removeChild(te), URL.revokeObjectURL(ee);
  }, [n, m, T]), R = y.useCallback(async () => {
    if (!(!T || !i) && window.confirm(
      `Revert "${T.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      w(!0);
      try {
        await i(T);
        const _ = await uc(n, T.kind, T.id, 50);
        v(_.entries);
      } catch (_) {
        S(_ instanceof Error ? _.message : "revert failed");
      } finally {
        w(!1);
      }
    }
  }, [n, i, T]);
  return a.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: Xy, children: /* @__PURE__ */ d.jsx("p", { className: Ky, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ d.jsxs("div", { className: Xy, children: [
    /* @__PURE__ */ d.jsxs("header", { className: MR, children: [
      /* @__PURE__ */ d.jsxs("div", { className: AR, children: [
        /* @__PURE__ */ d.jsx("label", { htmlFor: "audit-target-select", className: Py, children: "Target" }),
        /* @__PURE__ */ d.jsx(
          "select",
          {
            id: "audit-target-select",
            className: _R,
            value: u,
            onChange: (_) => h(_.target.value),
            children: a.map((_) => /* @__PURE__ */ d.jsxs("option", { value: Bi(_), children: [
              _.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              _.label
            ] }, Bi(_)))
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: DR, children: [
        /* @__PURE__ */ d.jsx(
          ft,
          {
            variant: "ghost",
            size: "sm",
            onClick: k,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        i && /* @__PURE__ */ d.jsx(
          ft,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void R(),
            disabled: E || !T,
            children: E ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    g && /* @__PURE__ */ d.jsx("div", { className: HR, children: g }),
    p && !g && /* @__PURE__ */ d.jsx("div", { className: qR, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !g && m.length === 0 && /* @__PURE__ */ d.jsxs("p", { className: Ky, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ d.jsx("br", {}),
      /* @__PURE__ */ d.jsx("span", { className: $R, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !g && m.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: OR, children: m.map((_) => {
      const K = s && T && !!_.chain_snapshot_json && _.operation_count > 0;
      return /* @__PURE__ */ d.jsxs("li", { className: kR, children: [
        /* @__PURE__ */ d.jsx("span", { className: LR, children: FR(_.recorded_at) }),
        /* @__PURE__ */ d.jsx("span", { className: UR, children: _.operation_count === 0 ? "cleared" : `${_.operation_count} ops` }),
        /* @__PURE__ */ d.jsxs("span", { className: BR, title: _.digest_after, children: [
          _.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ d.jsx("span", { className: Py, children: _.actor || "—" }),
        /* @__PURE__ */ d.jsx(
          "span",
          {
            className: VR,
            style: {
              background: `color-mix(in oklab, ${_.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: _.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: _.digest_before === "" || !_.digest_before ? "create" : _.operation_count === 0 ? "clear" : "update"
          }
        ),
        K && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: zR,
            disabled: E || N !== null,
            onClick: async () => {
              if (!(!T || !_.chain_snapshot_json) && !(N !== null || E) && window.confirm(
                `Replay this ${_.operation_count}-op chain on "${T.label}"? A new audit entry will be written.`
              )) {
                C(_.entry_id);
                try {
                  await s(T, _.chain_snapshot_json, _);
                  const ee = await uc(
                    n,
                    T.kind,
                    T.id,
                    50
                  );
                  v(ee.entries);
                } catch (ee) {
                  S(ee instanceof Error ? ee.message : "revert failed");
                } finally {
                  C(null);
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
function FR(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var YR = "_1uzgubz0", GR = "_1uzgubz1", XR = "_1uzgubz2", PR = "_1uzgubz3", KR = "_1uzgubz4", QR = "_1uzgubz5", ZR = "_1uzgubz6", JR = "_1uzgubz7", Qy = "_1uzgubz8", WR = "_1uzgubz9", Tx = "_1uzgubza", Cx = "_1uzgubzb", eM = "_1uzgubzc", tM = "_1uzgubzd", cf = "_1uzgubze", uf = "_1uzgubzf", nM = "_1uzgubzg", aM = "_1uzgubzh", Zy = "_1uzgubzi", Jy = "_1uzgubzj", Wy = "_1uzgubzk", e0 = "_1uzgubzl", t0 = "_1uzgubzm", rM = "_1uzgubzn", iM = "_1uzgubzo", lM = "_1uzgubzp", sM = "_1uzgubzq", oM = "_1uzgubzr";
function cM({
  characterName: n,
  color: a,
  lineCount: i,
  mapping: s,
  voiceAssets: o,
  presets: u,
  active: h,
  onToggle: m,
  onAssignVoiceAsset: v,
  onAssignPreset: p,
  onUploadFile: x,
  onClearMapping: g
}) {
  const [S, E] = y.useState(!1), w = s ? o.find((k) => k.voiceAssetId === s.speakerVoiceAssetId) : null, N = s?.defaultVectorPresetId ? u.find((k) => k.presetId === s.defaultVectorPresetId) ?? null : null, C = (n[0] ?? "?").toUpperCase(), T = s !== null;
  return /* @__PURE__ */ d.jsxs("div", { className: `${YR}${h ? ` ${GR}` : ""}`, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: XR,
        onClick: m,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: PR,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: C
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { className: KR, children: [
            /* @__PURE__ */ d.jsx("span", { className: QR, style: { color: a }, children: n }),
            /* @__PURE__ */ d.jsxs("span", { className: ZR, children: [
              i,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ d.jsxs("span", { className: JR, children: [
            w ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("span", { className: Qy, children: w.displayName }),
              w.durationMs != null && /* @__PURE__ */ d.jsxs("span", { children: [
                n0(w.durationMs),
                " ·",
                " ",
                w.sampleRate ? `${w.sampleRate} Hz` : "—"
              ] })
            ] }) : N ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("span", { className: Qy, children: N.presetName }),
              /* @__PURE__ */ d.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ d.jsx("span", { children: "no voice assigned" }),
            s?.voiceAssetChainDigest && /* @__PURE__ */ d.jsxs("span", { className: eM, children: [
              "chain · ",
              s.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: `${WR} ${T ? Tx : Cx}`,
              children: T ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ d.jsxs("div", { className: tM, children: [
      /* @__PURE__ */ d.jsxs("div", { className: cf, children: [
        /* @__PURE__ */ d.jsx("span", { className: uf, children: "Drop new audio" }),
        /* @__PURE__ */ d.jsxs(
          "label",
          {
            className: `${nM}${S ? ` ${aM}` : ""}`,
            onDragEnter: (k) => {
              k.preventDefault(), E(!0);
            },
            onDragOver: (k) => k.preventDefault(),
            onDragLeave: () => E(!1),
            onDrop: (k) => {
              k.preventDefault(), E(!1);
              const R = k.dataTransfer.files?.[0];
              R && x && x(R);
            },
            children: [
              /* @__PURE__ */ d.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (k) => {
                    const R = k.target.files?.[0];
                    R && x && x(R);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: cf, children: [
        /* @__PURE__ */ d.jsx("span", { className: uf, children: "Reference library" }),
        /* @__PURE__ */ d.jsx("div", { className: Zy, children: o.map((k) => /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: `${Jy}${s?.speakerVoiceAssetId === k.voiceAssetId ? ` ${Wy}` : ""}`,
            onClick: () => v(k.voiceAssetId),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: e0, children: k.displayName }),
              /* @__PURE__ */ d.jsxs("span", { className: t0, children: [
                k.durationMs != null ? n0(k.durationMs) : "—",
                " ",
                "·",
                " ",
                k.sampleRate ? `${k.sampleRate} Hz` : "—"
              ] })
            ]
          },
          k.voiceAssetId
        )) })
      ] }),
      u.length > 0 && p && /* @__PURE__ */ d.jsxs("div", { className: cf, children: [
        /* @__PURE__ */ d.jsx("span", { className: uf, children: "Preset voices" }),
        /* @__PURE__ */ d.jsx("div", { className: Zy, children: u.map((k) => /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: `${Jy}${s?.defaultVectorPresetId === k.presetId ? ` ${Wy}` : ""}`,
            onClick: () => p(k.presetId),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: e0, children: k.presetName }),
              /* @__PURE__ */ d.jsx("span", { className: t0, children: "preset · vector" })
            ]
          },
          k.presetId
        )) })
      ] }),
      T && g && /* @__PURE__ */ d.jsx("button", { type: "button", className: oM, onClick: g, children: "Clear mapping →" })
    ] })
  ] });
}
function n0(n) {
  if (!Number.isFinite(n) || n < 0) return "0:00";
  const a = Math.round(n / 1e3), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function uM({
  unmappedCount: n,
  totalCount: a,
  children: i,
  emptyHint: s
}) {
  if (a === 0)
    return /* @__PURE__ */ d.jsx("p", { className: sM, children: s ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = n === 0;
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsx("header", { className: rM, children: /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `${iM} ${o ? Tx : Cx}`,
        children: o ? `All ${a} mapped` : `${n} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ d.jsx("ul", { className: lM, children: i })
  ] });
}
async function yc() {
  return ht("/runtime/health");
}
async function Rx() {
  await ht("/runtime/start", { method: "POST" });
}
async function Mx() {
  return ht("/runtime/stop", { method: "POST" });
}
function Ax(n) {
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
var dM = "g5r6d10", fM = "g5r6d11", hM = "g5r6d12", mM = "g5r6d13", pM = "g5r6d14", gM = "g5r6d15", vM = "g5r6d1a", yM = "g5r6d1b", bM = "g5r6d1c", xM = "g5r6d1d", SM = "g5r6d1e", wM = "g5r6d1g", EM = "g5r6d1h", jM = "g5r6d1i", NM = "g5r6d1j", TM = "g5r6d1k", CM = "g5r6d1l", a0 = "g5r6d1m", RM = "g5r6d1n", MM = "g5r6d1o", AM = "g5r6d1p", r0 = "g5r6d1q", i0 = "g5r6d1r", _M = "g5r6d1s", DM = "g5r6d1t", Yi = "g5r6d1u", _x = "g5r6d1v", l0 = "g5r6d1w", zM = "g5r6d1x", OM = "g5r6d1y", fr = "g5r6d1z", kM = "g5r6d110", LM = "g5r6d111", UM = "g5r6d112", BM = "g5r6d113", VM = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function zn({
  severity: n,
  children: a,
  role: i,
  ariaLive: s,
  className: o,
  style: u
}) {
  const h = [VM[n], o].filter(Boolean).join(" "), m = i ?? (n === "error" ? "alert" : "status"), v = s ?? (n === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ d.jsx("div", { className: h, role: m, "aria-live": v, style: u, children: a });
}
var Dx = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, zx = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, $M = "_13bb4njb";
function xr({
  tone: n,
  size: a = "sm",
  pulse: i = !1,
  children: s,
  className: o,
  style: u,
  title: h
}) {
  const m = i && n !== "faint", v = [Dx[a], zx[n], m ? $M : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("span", { className: v, style: u, title: h, children: s });
}
const HM = 4e3;
function qM({ deployment: n }) {
  const [a, i] = y.useState(null), [s, o] = y.useState(null);
  y.useEffect(() => {
    let m = !1;
    const v = async () => {
      try {
        const x = await yc();
        m || (i(x), o(null));
      } catch (x) {
        m || o(YM(x));
      }
    };
    v();
    const p = setInterval(v, HM);
    return () => {
      m = !0, clearInterval(p);
    };
  }, []);
  const u = a?.badge ?? "not_installed", h = s?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ d.jsxs("output", { className: _x, "aria-live": "polite", children: [
    /* @__PURE__ */ d.jsx("span", { className: Yi, children: "Runtime" }),
    /* @__PURE__ */ d.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ d.jsx("span", { className: Yi, children: "Badge" }),
    /* @__PURE__ */ d.jsx(xr, { tone: IM(u), pulse: u === "starting" || u === "installing", children: Ax(u) }),
    a && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("span", { className: Yi, children: "Uptime" }),
      /* @__PURE__ */ d.jsx("span", { children: FM(a.uptimeSeconds) }),
      /* @__PURE__ */ d.jsx("span", { className: Yi, children: "VRAM" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    s && !h && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: s })
  ] });
}
function IM(n) {
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
function FM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function YM(n) {
  return n instanceof el || n instanceof Error ? n.message : "unknown error";
}
const bc = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, kc = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Ua = 1e-3;
function GM(n, a, i) {
  for (const s of Object.keys(bc)) {
    const o = bc[s];
    if (Math.abs(o.low - n) < Ua && Math.abs(o.mid - a) < Ua && Math.abs(o.high - i) < Ua)
      return s;
  }
  return "custom";
}
function XM(n) {
  let a = KM();
  for (const i of n.ops)
    a = PM(a, i);
  return a;
}
function PM(n, a) {
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
          preset: GM(a.low_db, a.mid_db, a.high_db)
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
function KM() {
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
function QM(n, a) {
  const i = Er(n, "gain");
  if (Math.abs(a) < Ua) return { ...n, ops: i };
  const s = { id: Sn(), mode: "gain", gain_db: a };
  return { ...n, ops: jr(i, s) };
}
function ZM(n, a, i, s) {
  const o = Er(n, "eq3");
  if (Math.abs(a) < Ua && Math.abs(i) < Ua && Math.abs(s) < Ua)
    return { ...n, ops: o };
  const u = {
    id: Sn(),
    mode: "eq3",
    low_db: a,
    mid_db: i,
    high_db: s
  };
  return { ...n, ops: jr(o, u) };
}
function JM(n, a) {
  const i = Er(n, "speed");
  if (Math.abs(a - 1) < Ua) return { ...n, ops: i };
  const s = { id: Sn(), mode: "speed", factor: a };
  return { ...n, ops: jr(i, s) };
}
function WM(n, a) {
  const i = Er(n, "pitch_shift");
  if (Math.abs(a) < Ua) return { ...n, ops: i };
  const s = {
    id: Sn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...n, ops: jr(i, s) };
}
function eA(n, a, i) {
  const s = Er(n, "normalize");
  if (a === "off") return { ...n, ops: s };
  const o = {
    id: Sn(),
    mode: "normalize",
    target_lufs: i
  };
  return { ...n, ops: jr(s, o) };
}
function tA(n, a) {
  const i = Er(n, "fade_in");
  if (a <= 0) return { ...n, ops: i };
  const s = {
    id: Sn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: jr(i, s) };
}
function nA(n, a) {
  const i = Er(n, "fade_out");
  if (a <= 0) return { ...n, ops: i };
  const s = {
    id: Sn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: jr(i, s) };
}
function aA(n, a, i) {
  const s = Er(n, "silence_strip");
  if (!a) return { ...n, ops: s };
  const o = {
    id: Sn(),
    mode: "silence_strip",
    threshold_db: i
  };
  return { ...n, ops: jr(s, o) };
}
const Ox = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function kx(n, a) {
  const i = {
    ...n,
    ops: n.ops.filter((u) => !Ox.has(u.mode))
  };
  let o = QM({ version: 1, ops: [] }, a.volumeDb);
  return o = ZM(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = JM(o, a.speed.value)), o = WM(o, a.pitchSt), o = eA(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = tA(o, a.fade.inS), o = nA(o, a.fade.outS), o = aA(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...i, ops: [...i.ops, ...o.ops] };
}
function Lx(n) {
  const a = {
    ...n,
    ops: n.ops.filter((i) => Ox.has(i.mode))
  };
  return XM(a);
}
var rA = "_1rsa80i0", iA = "_1rsa80i1", lA = "_1rsa80i2", sA = "_1rsa80i3", oA = "_1rsa80i4", cA = "_1rsa80i5", uA = "_1rsa80i6", dA = "_1rsa80i7", fA = "_1rsa80i8", hA = "_1rsa80i9";
const Ux = ["flat", "warm", "bright", "voice", "telephone"], ts = -12, Po = 12, mA = 0.5;
function pA(n) {
  const { low: a, mid: i, high: s, preset: o, onChange: u, disabled: h } = n, m = (p) => {
    const x = bc[p];
    u(x.low, x.mid, x.high, p);
  }, v = (p, x) => {
    const g = { low: a, mid: i, high: s, [p]: x }, S = vA(g.low, g.mid, g.high);
    u(g.low, g.mid, g.high, S);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: rA, children: [
    /* @__PURE__ */ d.jsxs("div", { className: iA, role: "group", "aria-label": "EQ presets", children: [
      Ux.map((p) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: lA,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: h,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ d.jsx("span", { className: sA, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: oA, children: [
      /* @__PURE__ */ d.jsx(
        df,
        {
          label: "Low",
          value: a,
          onChange: (p) => v("low", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ d.jsx(
        df,
        {
          label: "Mid",
          value: i,
          onChange: (p) => v("mid", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ d.jsx(
        df,
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
function df({ label: n, value: a, onChange: i, disabled: s }) {
  const o = (a - ts) / (Po - ts) * 100, u = y.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: cA, children: [
    /* @__PURE__ */ d.jsx("label", { htmlFor: u, className: uA, children: n }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: ts,
        max: Po,
        step: mA,
        value: a,
        disabled: s,
        className: fA,
        style: { "--fill": `${o}%` },
        onChange: (h) => i(Number(h.target.value)),
        "aria-valuemin": ts,
        "aria-valuemax": Po,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: dA, children: gA(a) }),
    /* @__PURE__ */ d.jsxs("span", { className: hA, "aria-hidden": "true", children: [
      /* @__PURE__ */ d.jsx("span", { children: ts }),
      /* @__PURE__ */ d.jsx("span", { children: "0" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        "+",
        Po
      ] })
    ] })
  ] });
}
function gA(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
const ff = 1e-3;
function vA(n, a, i) {
  for (const s of Ux) {
    const o = bc[s];
    if (Math.abs(o.low - n) < ff && Math.abs(o.mid - a) < ff && Math.abs(o.high - i) < ff)
      return s;
  }
  return "custom";
}
var yA = "_85bhwb0", bA = "_85bhwb1", s0 = "_85bhwb2", xA = "_85bhwb3", SA = "_85bhwb4", wA = "_85bhwb5", EA = "_85bhwb6", jA = "_85bhwb7";
const Ko = 0.5, hf = 2, NA = 0.05;
function TA(n) {
  const { mode: a, value: i, supportsSynthSpeed: s, onChange: o, onReRenderAtSynthTime: u, disabled: h } = n, m = (i - Ko) / (hf - Ko) * 100, v = y.useId(), p = (g) => o(g, i), x = (g) => o(a, g);
  return /* @__PURE__ */ d.jsxs("div", { className: yA, children: [
    s ? /* @__PURE__ */ d.jsxs("div", { className: bA, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: s0,
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
          className: s0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ d.jsxs("div", { className: xA, children: [
      /* @__PURE__ */ d.jsx(
        "input",
        {
          id: v,
          type: "range",
          min: Ko,
          max: hf,
          step: NA,
          value: i,
          disabled: h,
          className: SA,
          style: { "--fill": `${m}%` },
          onChange: (g) => x(Number(g.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": hf,
          "aria-valuenow": i,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: wA, children: `${i.toFixed(2)}×` })
    ] }),
    a === "synth" && s ? /* @__PURE__ */ d.jsxs("div", { className: EA, children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "primary",
          size: "sm",
          onClick: u,
          disabled: h || !u,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: jA, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var CA = "kgszk50", RA = "kgszk51", o0 = "kgszk52", MA = "kgszk53", AA = "kgszk54", Bx = "kgszk55", _A = "kgszk56", DA = "kgszk58", Oh = "kgszk59", Vx = "kgszk5a", kh = "kgszk5b", zA = "kgszk5c", OA = "kgszk5d", kA = "kgszk5e", c0 = "kgszk5f", u0 = "kgszk5g", d0 = "kgszk5h", LA = "kgszk5i", UA = "kgszk5j", BA = "kgszk5l", gs = "kgszk5m", vs = "kgszk5n";
const VA = -24, $A = 24, HA = 0.5, qA = -12, IA = 12, FA = 0.5, YA = -30, GA = -6, XA = -12, PA = 0, Qo = -60, mf = -20;
function Lh(n) {
  const {
    state: a,
    onChange: i,
    supportsSynthSpeed: s,
    onReRenderAtSynthTime: o,
    onSliderFlush: u,
    pendingExecution: h = !1,
    disabled: m = !1,
    onApply: v,
    applyLabel: p = "Apply edit"
  } = n, x = (E) => {
    i({ ...a, ...E });
  }, g = JA(a), S = (E) => {
    const w = E.target;
    w && (w.tagName === "INPUT" || w.tagName === "BUTTON" || w.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ d.jsxs("div", { className: CA, onPointerDownCapture: S, children: [
    /* @__PURE__ */ d.jsxs("div", { className: RA, children: [
      g.length === 0 ? /* @__PURE__ */ d.jsx("span", { className: MA, children: "No active edits" }) : /* @__PURE__ */ d.jsxs("span", { className: o0, children: [
        /* @__PURE__ */ d.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ d.jsx("span", { children: g.join(" · ") })
      ] }),
      h ? /* @__PURE__ */ d.jsxs("span", { className: o0, "aria-live": "polite", children: [
        /* @__PURE__ */ d.jsx("span", { className: AA, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ d.jsx(
      f0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: VA,
        max: $A,
        step: HA,
        format: WA,
        value: a.volumeDb,
        onChange: (E) => x({ volumeDb: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: gs, children: [
      /* @__PURE__ */ d.jsx("span", { className: vs, children: "3-band EQ" }),
      /* @__PURE__ */ d.jsx(
        pA,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: m,
          onChange: (E, w, N, C) => x({ eq3: { low: E, mid: w, high: N, preset: C } })
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: gs, children: [
      /* @__PURE__ */ d.jsx("span", { className: vs, children: "Speed" }),
      /* @__PURE__ */ d.jsx(
        TA,
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
      f0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: qA,
        max: IA,
        step: FA,
        format: e_,
        value: a.pitchSt,
        onChange: (E) => x({ pitchSt: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ d.jsx(
      KA,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (E) => x({ normalize: E })
      }
    ),
    /* @__PURE__ */ d.jsx(
      QA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (E, w) => x({ fade: { ...a.fade, inS: E, outS: w } })
      }
    ),
    /* @__PURE__ */ d.jsx(
      ZA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (E, w) => x({ silence: { enabled: E, thresholdDb: w } })
      }
    ),
    v ? /* @__PURE__ */ d.jsxs("div", { className: BA, children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(kc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ d.jsx(ft, { variant: "primary", size: "md", onClick: v, disabled: m, children: p })
    ] }) : null
  ] });
}
function f0(n) {
  const { label: a, sub: i, min: s, max: o, step: u, format: h, value: m, onChange: v, disabled: p } = n, x = (m - s) / (o - s) * 100, g = y.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: Bx, children: [
    /* @__PURE__ */ d.jsxs("div", { className: _A, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: g, className: DA, children: a }),
      /* @__PURE__ */ d.jsx("span", { className: Vx, children: i })
    ] }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: g,
        type: "range",
        min: s,
        max: o,
        step: u,
        value: m,
        disabled: p,
        className: kh,
        style: { "--fill": `${x}%` },
        onChange: (S) => v(Number(S.target.value)),
        "aria-valuemin": s,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: Oh, children: h(m) })
  ] });
}
function KA({ normalize: n, onChange: a, disabled: i }) {
  const o = n.mode === "loudness" ? { min: YA, max: GA, step: 0.5, suffix: "LUFS" } : { min: XA, max: PA, step: 0.5, suffix: "dB" }, u = t_(n.targetDbOrLufs, o.min, o.max), h = (u - o.min) / (o.max - o.min) * 100, m = (v) => {
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
    /* @__PURE__ */ d.jsx("div", { className: zA, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((v) => {
      const p = v === "peak";
      return /* @__PURE__ */ d.jsxs(
        "button",
        {
          type: "button",
          className: OA,
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
    n.mode !== "off" ? /* @__PURE__ */ d.jsxs("div", { className: Bx, children: [
      /* @__PURE__ */ d.jsx("span", { className: Vx, children: "Target" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: u,
          disabled: i,
          className: kh,
          style: { "--fill": `${h}%` },
          onChange: (v) => a({ mode: n.mode, targetDbOrLufs: Number(v.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": u,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: Oh, children: [
        u.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function QA({ inS: n, outS: a, onChange: i, disabled: s }) {
  const o = y.useId(), u = y.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: gs, children: [
    /* @__PURE__ */ d.jsx("span", { className: vs, children: "Fade" }),
    /* @__PURE__ */ d.jsxs("div", { className: kA, children: [
      /* @__PURE__ */ d.jsxs("div", { className: c0, children: [
        /* @__PURE__ */ d.jsx("label", { className: u0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: n,
            disabled: s,
            className: d0,
            onChange: (h) => i(Math.max(0, Number(h.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: c0, children: [
        /* @__PURE__ */ d.jsx("label", { className: u0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: s,
            className: d0,
            onChange: (h) => i(n, Math.max(0, Number(h.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function ZA({ enabled: n, thresholdDb: a, onChange: i, disabled: s }) {
  const o = (a - Qo) / (mf - Qo) * 100;
  return /* @__PURE__ */ d.jsxs("div", { className: gs, children: [
    /* @__PURE__ */ d.jsx("span", { className: vs, children: "Silence trim" }),
    /* @__PURE__ */ d.jsxs("div", { className: LA, children: [
      /* @__PURE__ */ d.jsxs("label", { className: UA, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: n,
            disabled: s,
            onChange: (u) => i(u.target.checked, a)
          }
        ),
        "Enabled"
      ] }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: Qo,
          max: mf,
          step: 1,
          value: a,
          disabled: s || !n,
          className: kh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => i(n, Number(u.target.value)),
          "aria-valuemin": Qo,
          "aria-valuemax": mf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: Oh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Vi = 1e-3;
function JA(n) {
  const a = [];
  return Math.abs(n.volumeDb) >= Vi && a.push("gain"), (Math.abs(n.eq3.low) >= Vi || Math.abs(n.eq3.mid) >= Vi || Math.abs(n.eq3.high) >= Vi) && a.push("eq3"), n.speed.mode === "audio" && Math.abs(n.speed.value - 1) >= Vi && a.push("speed"), Math.abs(n.pitchSt) >= Vi && a.push("pitch"), n.normalize.mode !== "off" && a.push("normalize"), n.fade.inS > 0 && a.push("fade-in"), n.fade.outS > 0 && a.push("fade-out"), n.silence.enabled && a.push("silence"), a;
}
function WA(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
function e_(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} st`;
}
function t_(n, a, i) {
  return Number.isFinite(n) ? Math.max(a, Math.min(i, n)) : a;
}
var n_ = "skdk4g0", a_ = "skdk4g1", h0 = "skdk4g2", r_ = "skdk4g3", i_ = "skdk4g4", l_ = "skdk4g5", s_ = "skdk4g6", o_ = "skdk4g7", c_ = "skdk4g8", u_ = "skdk4g9", d_ = "skdk4ga", f_ = "skdk4gb", h_ = "skdk4gc", m_ = "skdk4gd", p_ = "skdk4ge", m0 = "skdk4gf", p0 = "skdk4gg", g_ = "skdk4gh", g0 = "skdk4gi", v0 = "skdk4gj", v_ = "skdk4gk", y_ = "skdk4gl", b_ = "skdk4gm", y0 = "skdk4gn", x_ = "skdk4go", b0 = "skdk4gp", S_ = "skdk4gq", w_ = "skdk4gr", E_ = "skdk4gs", j_ = "skdk4gt", N_ = "skdk4gu", T_ = "skdk4gv", C_ = "skdk4gw", x0 = "skdk4gx", R_ = "skdk4gy", M_ = "skdk4gz", A_ = "skdk4g10", __ = "skdk4g11", D_ = "cgsfgh1", z_ = "cgsfgh2", O_ = "cgsfgh3", k_ = "cgsfgh4", L_ = "cgsfgh5", U_ = "cgsfgh6", B_ = "cgsfgh7", V_ = "cgsfgh8", $_ = "cgsfgh9", H_ = "cgsfgha", q_ = "cgsfghb", I_ = "cgsfghc", F_ = "cgsfghd", Y_ = "cgsfghe", G_ = "cgsfghm", X_ = "cgsfghn", P_ = "cgsfgho", K_ = "cgsfghp";
const $t = [
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
}, $x = 0.05;
function Q_(n) {
  let a = null, i = -1 / 0;
  for (const s of $t) {
    const o = n[s];
    o > i && (i = o, a = s);
  }
  return !a || i <= $x ? null : a;
}
function Hx(n, a = 3) {
  return $t.map((i) => ({ key: i, label: ys[i], value: n[i] })).filter((i) => i.value > $x).sort((i, s) => s.value - i.value).slice(0, a);
}
function Z_(n) {
  let a = 0;
  for (const i of $t) a += n[i] * n[i];
  return Math.sqrt(a);
}
function S0(n) {
  const a = Hx(n, 2), i = a[0];
  if (!i) return "";
  const s = a[1];
  return !s || i.value - s.value > 0.25 ? pf(i.label) : `${pf(i.label)} + ${s.label.toLowerCase()}`;
}
function pf(n) {
  if (!n) return n;
  const a = n[0];
  return a ? a.toUpperCase() + n.slice(1) : n;
}
function Jr(n) {
  const a = { ...Zi };
  for (const i of $t) {
    const s = n[i];
    a[i] = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
  }
  return a;
}
const w0 = 0.05, E0 = 0.2, J_ = 22, W_ = 320, gf = 0.78;
function vf(n, a, i, s) {
  const o = Math.cos(i), u = Math.sin(i), h = n * o + a * u;
  return Math.max(0, Math.min(1, h / s));
}
function e2(n) {
  const { vec: a, onChange: i, size: s, reduceMotion: o = !1 } = n, [u, h] = y.useState(a), [m, v] = y.useState(null), [p, x] = y.useState(null), g = y.useRef(null), S = y.useRef(a), E = y.useRef(o), w = y.useRef(null), N = y.useRef(0);
  E.current = o, y.useEffect(() => {
    h(a), S.current = a;
  }, [a]);
  const C = y.useCallback(
    (q) => {
      const F = Jr(q);
      h(F), S.current = F, i(F);
    },
    [i]
  ), T = y.useCallback((q) => {
    const F = Jr(q);
    h(F), S.current = F;
  }, []), k = y.useCallback(
    (q) => {
      const F = g.current;
      if (!F || E.current) return;
      const oe = q.clientX - F.centerX, ie = q.clientY - F.centerY, U = s / 2 * gf, ne = vf(oe, ie, F.angle, U), Q = { ...S.current, [F.axis]: ne };
      T(Q);
    },
    [s, T]
  ), R = y.useCallback(
    (q) => {
      const F = g.current;
      if (F) {
        if (window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", R), window.removeEventListener("pointercancel", R), E.current) {
          const oe = q.clientX - F.centerX, ie = q.clientY - F.centerY, U = s / 2 * gf, ne = vf(oe, ie, F.angle, U), Q = { ...S.current, [F.axis]: ne };
          g.current = null, C(Q);
          return;
        }
        g.current = null, C(S.current);
      }
    },
    [C, k, s]
  );
  y.useEffect(() => () => {
    window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", R), window.removeEventListener("pointercancel", R), g.current = null, w.current !== null && (window.clearTimeout(w.current), w.current = null);
  }, [k, R]);
  const _ = y.useCallback((q, F) => {
    E.current || (N.current += 1, x({ x: q, y: F, key: N.current }), w.current !== null && window.clearTimeout(w.current), w.current = window.setTimeout(() => {
      x(null), w.current = null;
    }, W_));
  }, []), K = y.useCallback(
    (q, F, oe, ie, U) => {
      const ne = oe.getBoundingClientRect(), Q = ne.left + ne.width / 2, O = ne.top + ne.height / 2, V = $t.indexOf(q) / $t.length * Math.PI * 2 - Math.PI / 2;
      if (g.current = {
        axis: q,
        pointerId: F,
        centerX: Q,
        centerY: O,
        angle: V
      }, v(q), ie !== void 0 && U !== void 0) {
        const X = ie - Q, re = U - O, M = s / 2 * gf, J = vf(X, re, V, M), Z = { ...S.current, [q]: J };
        E.current ? C(Z) : T(Z);
      }
      window.addEventListener("pointermove", k), window.addEventListener("pointerup", R), window.addEventListener("pointercancel", R);
    },
    [C, k, R, s, T]
  ), ee = y.useCallback(
    (q, F) => {
      F.preventDefault();
      const oe = F.currentTarget, ie = oe.ownerSVGElement ?? oe;
      K(q, F.pointerId, ie);
    },
    [K]
  ), te = y.useCallback(
    (q) => {
      const F = q.currentTarget, oe = F instanceof SVGSVGElement ? F : F.ownerSVGElement ?? F, ie = oe.getBoundingClientRect(), U = ie.left + ie.width / 2, ne = ie.top + ie.height / 2, Q = q.clientX - U, O = q.clientY - ne;
      if (Math.sqrt(Q * Q + O * O) < 8) return;
      let V = Math.atan2(O, Q) * 180 / Math.PI;
      V = ((V + 90) % 360 + 360) % 360;
      let X = null, re = 999;
      for (let Z = 0; Z < $t.length; Z++) {
        const ce = $t[Z];
        if (!ce) continue;
        const he = Z / $t.length * 360, ve = Math.abs((he - V + 540) % 360 - 180);
        ve < re && (re = ve, X = ce);
      }
      if (!X || re > J_) return;
      q.preventDefault();
      const M = (q.clientX - ie.left) / ie.width * s, J = (q.clientY - ie.top) / ie.height * s;
      _(M, J), K(X, q.pointerId, oe, q.clientX, q.clientY);
    },
    [K, s, _]
  ), D = y.useCallback(
    (q, F) => {
      const oe = S.current[q];
      let ie = oe;
      switch (F.key) {
        case "ArrowUp":
        case "ArrowRight":
          ie = oe + w0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          ie = oe - w0;
          break;
        case "PageUp":
          ie = oe + E0;
          break;
        case "PageDown":
          ie = oe - E0;
          break;
        case "Home":
          ie = 0;
          break;
        case "End":
          ie = 1;
          break;
        default:
          return;
      }
      F.preventDefault(), v(q), C({ ...S.current, [q]: ie });
    },
    [C]
  );
  return {
    liveVec: u,
    activeAxis: m,
    setActiveAxis: v,
    onPointerDown: ee,
    onKeyDown: D,
    onSurfacePointerDown: te,
    surfacePing: p
  };
}
const t2 = [0.25, 0.5, 0.75, 1];
function n2({
  vec: n,
  onChange: a,
  size: i = 360,
  readOnly: s = !1,
  reduceMotion: o = !1
}) {
  const u = e2({ vec: n, onChange: a, size: i, reduceMotion: o }), h = i / 2, m = i / 2, v = i / 2 * 0.78, p = y.useMemo(() => a2(h, m, v), [h, m, v]), x = y.useMemo(() => $t.map((g, S) => {
    const E = dc(u.liveVec[g]), w = p[S];
    return w ? `${h + w.dx * E},${m + w.dy * E}` : "0,0";
  }).join(" "), [p, h, m, u.liveVec]);
  return /* @__PURE__ */ d.jsx("div", { className: D_, children: /* @__PURE__ */ d.jsx("div", { className: z_, style: { width: i, height: i }, children: /* @__PURE__ */ d.jsxs(
    "svg",
    {
      className: O_,
      viewBox: `0 0 ${i} ${i}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: s ? void 0 : u.onSurfacePointerDown,
      style: s ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        t2.map((g) => /* @__PURE__ */ d.jsx(
          "circle",
          {
            className: k_,
            cx: h,
            cy: m,
            r: v * g
          },
          g
        )),
        $t.map((g, S) => {
          const E = p[S];
          if (!E) return null;
          const w = h + E.dx * 1.18, N = m + E.dy * 1.18, C = u.activeAxis === g;
          return /* @__PURE__ */ d.jsxs("g", { children: [
            /* @__PURE__ */ d.jsx(
              "line",
              {
                className: L_,
                x1: h,
                y1: m,
                x2: h + E.dx,
                y2: m + E.dy
              }
            ),
            /* @__PURE__ */ d.jsx(
              "text",
              {
                className: `${F_}${C ? ` ${Y_}` : ""}`,
                x: w,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: ys[g]
              }
            )
          ] }, g);
        }),
        $t.map((g, S) => {
          const E = dc(u.liveVec[g]);
          if (E <= 0.01) return null;
          const w = p[S];
          if (!w) return null;
          const N = u.activeAxis === g;
          return /* @__PURE__ */ d.jsx(
            "line",
            {
              className: `${B_}${N ? ` ${V_}` : ""}`,
              x1: h,
              y1: m,
              x2: h + w.dx * E,
              y2: m + w.dy * E
            },
            `petal-${g}`
          );
        }),
        /* @__PURE__ */ d.jsx("polygon", { className: U_, points: x }),
        u.surfacePing && /* @__PURE__ */ d.jsx(
          "circle",
          {
            className: I_,
            cx: u.surfacePing.x,
            cy: u.surfacePing.y,
            r: 10
          },
          u.surfacePing.key
        ),
        !s && $t.map((g, S) => {
          const E = dc(u.liveVec[g]), w = p[S];
          if (!w) return null;
          const N = h + w.dx * E, C = m + w.dy * E, T = u.activeAxis === g;
          return /* @__PURE__ */ d.jsxs("g", { children: [
            /* @__PURE__ */ d.jsx(
              "circle",
              {
                className: $_,
                cx: N,
                cy: C,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${ys[g]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": E,
                onPointerDown: (k) => u.onPointerDown(g, k),
                onKeyDown: (k) => u.onKeyDown(g, k),
                onFocus: () => u.setActiveAxis(g),
                onBlur: () => u.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ d.jsx(
              "circle",
              {
                className: `${H_}${T ? ` ${q_}` : ""}`,
                cx: N,
                cy: C,
                r: 6
              }
            )
          ] }, g);
        })
      ]
    }
  ) }) });
}
function a2(n, a, i) {
  return $t.map((s, o) => {
    const u = o / $t.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(u) * i,
      dy: Math.sin(u) * i
    };
  });
}
function dc(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function r2({ vec: n, size: a = 36 }) {
  const i = a / 2, s = a / 2, o = a / 2 * 0.86, u = y.useMemo(() => $t.map((h, m) => {
    const v = dc(n[h]), p = m / $t.length * Math.PI * 2 - Math.PI / 2, x = i + Math.cos(p) * o * v, g = s + Math.sin(p) * o * v;
    return `${x},${g}`;
  }).join(" "), [i, s, o, n]);
  return /* @__PURE__ */ d.jsx("span", { className: G_, "aria-hidden": "true", children: /* @__PURE__ */ d.jsxs(
    "svg",
    {
      className: X_,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ d.jsx("circle", { className: P_, cx: i, cy: s, r: o }),
        /* @__PURE__ */ d.jsx("polygon", { className: K_, points: u })
      ]
    }
  ) });
}
var i2 = "_1jqr3aj0", l2 = "_1jqr3aj1", s2 = "_1jqr3aj2", o2 = "_1jqr3aj3", c2 = "_1jqr3aj4", u2 = "_1jqr3aj5", d2 = "_1jqr3aj6", f2 = "_1jqr3aj7";
const j0 = 0.05, N0 = 0.2;
function h2({
  vec: n,
  onChange: a,
  readOnly: i = !1,
  reduceMotion: s = !1
}) {
  const [o, u] = y.useState(null), h = y.useRef(null), m = y.useRef(/* @__PURE__ */ new Map()), v = y.useCallback(
    (w, N) => {
      const C = Math.max(0, Math.min(1, N));
      a(Jr({ ...n, [w]: C }));
    },
    [a, n]
  ), p = y.useCallback((w, N) => {
    const C = m.current.get(w);
    return !C || C.width <= 0 ? 0 : (N - C.left) / C.width;
  }, []), x = y.useCallback(
    (w, N) => {
      if (i) return;
      N.preventDefault();
      const C = N.currentTarget.querySelector("[data-track]");
      C instanceof HTMLElement && m.current.set(w, C.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), h.current = w, u(w), v(w, p(w, N.clientX));
    },
    [i, v, p]
  ), g = y.useCallback(
    (w, N) => {
      i || s || h.current === w && v(w, p(w, N.clientX));
    },
    [i, s, v, p]
  ), S = y.useCallback(
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
  ), E = y.useCallback(
    (w, N) => {
      if (i) return;
      const C = n[w] ?? 0;
      let T = C;
      switch (N.key) {
        case "ArrowRight":
        case "ArrowUp":
          T = C + j0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = C - j0;
          break;
        case "PageUp":
          T = C + N0;
          break;
        case "PageDown":
          T = C - N0;
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
      N.preventDefault(), u(w), v(w, T);
    },
    [i, v, n]
  );
  return /* @__PURE__ */ d.jsx("div", { className: i2, role: "group", "aria-label": "Emotion axis sliders", children: $t.map((w) => {
    const N = m2(n[w] ?? 0), C = N > 0.05, T = o === w, k = ys[w];
    return /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: `${l2}${C ? ` ${s2}` : ""}${T ? ` ${o2}` : ""}`,
        role: "slider",
        "aria-label": `${k} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": i,
        disabled: i,
        onPointerDown: (R) => x(w, R),
        onPointerMove: (R) => g(w, R),
        onPointerUp: (R) => S(w, R),
        onPointerCancel: (R) => S(w, R),
        onKeyDown: (R) => E(w, R),
        onFocus: () => u(w),
        onBlur: () => u(null),
        children: [
          /* @__PURE__ */ d.jsx("span", { className: c2, children: k }),
          /* @__PURE__ */ d.jsx("span", { className: u2, "data-track": "true", children: /* @__PURE__ */ d.jsx(
            "span",
            {
              className: d2,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ d.jsx("span", { className: f2, children: N.toFixed(2) })
        ]
      },
      w
    );
  }) });
}
function m2(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
var T0 = "gvwvwg0", p2 = "gvwvwg2", g2 = "gvwvwg3", v2 = "gvwvwg8", y2 = "gvwvwg9", b2 = "gvwvwga", x2 = "gvwvwgb", S2 = "gvwvwgc", w2 = "gvwvwgd", E2 = "gvwvwge";
function j2({
  presets: n,
  activePresetId: a,
  onSelect: i,
  onDelete: s
}) {
  return n.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: T0, children: [
    /* @__PURE__ */ d.jsx("span", { className: p2, children: "Preset library" }),
    /* @__PURE__ */ d.jsx("span", { className: g2, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ d.jsxs("div", { className: T0, children: [
    /* @__PURE__ */ d.jsx("span", { className: E2, children: "Preset library" }),
    /* @__PURE__ */ d.jsx("div", { className: v2, children: n.map((o) => {
      const u = N2(o), h = o.presetId === a;
      return /* @__PURE__ */ d.jsxs(
        "div",
        {
          className: `${y2}${h ? ` ${x2}` : ""}`,
          children: [
            /* @__PURE__ */ d.jsxs(
              "button",
              {
                type: "button",
                className: b2,
                onClick: () => i(o),
                "aria-pressed": h,
                children: [
                  /* @__PURE__ */ d.jsx(r2, { vec: u, size: 28 }),
                  /* @__PURE__ */ d.jsx("span", { className: S2, children: o.presetName })
                ]
              }
            ),
            s && /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: w2,
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
function N2(n) {
  const a = Kf.reduce(
    (s, o) => ({ ...s, [o]: 0 }),
    {}
  );
  if (!Array.isArray(n.vector)) return a;
  const i = Kf.reduce(
    (s, o, u) => ({ ...s, [o]: n.vector[u] ?? 0 }),
    a
  );
  return Jr(i);
}
function yf(n) {
  return Kf.map((a) => n[a] ?? 0);
}
const T2 = [
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
], C2 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], R2 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], M2 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function A2(n) {
  const a = n.toLowerCase().trim();
  if (!a) return { ...Zi };
  const s = a.split(/\s+/).some((h) => C2.includes(h)) ? 1.2 : 1, o = R2.some((h) => a.includes(h)) ? 0.55 : 1, u = { ...Zi };
  for (const h of T2) {
    let m = 0;
    for (const v of h.keywords) {
      const p = v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), g = new RegExp(`\\b${p}\\b`).exec(a);
      if (!g) continue;
      const S = g.index, E = a.slice(0, S), w = Math.max(
        E.lastIndexOf(","),
        E.lastIndexOf(";"),
        E.lastIndexOf(" but "),
        E.lastIndexOf(" yet ")
      ), C = E.slice(w >= 0 ? w : 0).slice(-30);
      M2.some((T) => new RegExp(`\\b${T}\\b`).test(C)) || (m += 1);
    }
    if (m > 0) {
      const v = h.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * s * o;
      u[h.axis] = Math.min(1, v);
    }
  }
  return $t.every((h) => u[h] === 0) && (u.calm = 0.4), Jr(u);
}
const _2 = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function D2({
  value: n,
  onChange: a,
  deploymentId: i
}) {
  const s = n.mode ?? "none", o = y.useMemo(() => z2(n.vector), [n.vector]), u = n.emotionAlpha ?? 1, [h, m] = y.useState([]), [v, p] = y.useState(null), [x, g] = y.useState(!1), [S, E] = y.useState(null), [w, N] = y.useState(""), [C, T] = y.useState(!1), k = y.useRef(!0);
  y.useEffect(() => (k.current = !0, () => {
    k.current = !1;
  }), []), y.useEffect(() => {
    let A = !1;
    return Ex(i).then((V) => {
      A || m(C0(V.presets));
    }).catch((V) => {
      A || p(bf(V));
    }), () => {
      A = !0;
    };
  }, [i]), y.useEffect(() => {
    C || N(S0(o));
  }, [o, C]);
  const R = (A) => {
    a({ ...n, mode: A });
  }, _ = (A) => {
    a({
      ...n,
      mode: "emotion_vector",
      vector: yf(A)
    }), S && E(null);
  }, K = () => {
    _(Jr(Zi));
  }, ee = (A) => {
    const V = Math.max(0, Math.min(1, Number.isFinite(A) ? A : 1));
    a({ ...n, emotionAlpha: V });
  }, te = async () => {
    const A = w.trim();
    if (A) {
      g(!0), p(null);
      try {
        const V = await CR(i, A, yf(o));
        if (!k.current) return;
        m(
          (X) => C0([V, ...X.filter((re) => re.presetId !== V.presetId)])
        ), E(V.presetId), T(!1);
      } catch (V) {
        k.current && p(bf(V));
      } finally {
        k.current && g(!1);
      }
    }
  }, D = async (A) => {
    const V = h;
    m((X) => X.filter((re) => re.presetId !== A)), S === A && E(null);
    try {
      await RR(i, A);
    } catch (X) {
      k.current && (m(V), p(bf(X)));
    }
  }, q = (A) => {
    E(A.presetId), a({
      ...n,
      mode: "emotion_vector",
      vector: A.vector
    });
  }, F = (A) => {
    a({ ...n, mode: "qwen_template", qwenTemplate: A });
  }, oe = Q_(o), ie = Z_(o), U = Hx(o, 3), ne = U.length > 0 && w.trim().length > 0 && !x, Q = S0(o) || "name your preset…", O = s !== "emotion_vector";
  return /* @__PURE__ */ d.jsxs("div", { className: n_, children: [
    /* @__PURE__ */ d.jsxs("div", { className: a_, children: [
      /* @__PURE__ */ d.jsx("span", { className: h0, children: "Emotion mode" }),
      /* @__PURE__ */ d.jsx("div", { className: r_, role: "radiogroup", "aria-label": "Emotion mode", children: _2.map((A) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === A.id,
          className: `${i_}${s === A.id ? ` ${l_}` : ""}`,
          onClick: () => R(A.id),
          children: A.label
        },
        A.id
      )) })
    ] }),
    s === "none" && /* @__PURE__ */ d.jsxs("div", { className: b0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ d.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    s === "audio_ref" && /* @__PURE__ */ d.jsx("div", { className: b0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    s === "qwen_template" && /* @__PURE__ */ d.jsxs("div", { className: v_, children: [
      /* @__PURE__ */ d.jsx(
        "textarea",
        {
          className: y_,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: n.qwenTemplate ?? "",
          onChange: (A) => F(A.target.value)
        }
      ),
      /* @__PURE__ */ d.jsxs("div", { className: b_, children: [
        /* @__PURE__ */ d.jsx(
          ft,
          {
            variant: "secondary",
            onClick: () => {
              const A = (n.qwenTemplate ?? "").trim();
              if (!A) return;
              const V = A2(A);
              a({
                ...n,
                mode: "emotion_vector",
                vector: yf(V)
              });
            },
            disabled: !(n.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ d.jsx("span", { className: y0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: y0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ d.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    (s === "emotion_vector" || s === "none" || s === "audio_ref") && /* @__PURE__ */ d.jsxs("div", { className: p_, children: [
      /* @__PURE__ */ d.jsx("div", { className: `${a0} ${s_}`, children: /* @__PURE__ */ d.jsx(
        n2,
        {
          vec: o,
          onChange: _,
          readOnly: O
        }
      ) }),
      /* @__PURE__ */ d.jsxs("div", { className: `${a0} ${o_}`, children: [
        /* @__PURE__ */ d.jsxs("div", { className: c_, children: [
          /* @__PURE__ */ d.jsx("span", { className: h0, children: "Dominant" }),
          /* @__PURE__ */ d.jsx("span", { className: u_, children: oe ? ys[oe].toLowerCase() : "neutral" }),
          /* @__PURE__ */ d.jsxs("span", { className: d_, children: [
            "‖v‖ = ",
            ie.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ d.jsx(h2, { vec: o, onChange: _, readOnly: O }),
        /* @__PURE__ */ d.jsx("div", { className: f_, children: /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: h_,
            onClick: K,
            disabled: O || ie < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ d.jsxs(
                "svg",
                {
                  className: m_,
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
      /* @__PURE__ */ d.jsxs("div", { className: m0, children: [
        /* @__PURE__ */ d.jsxs("span", { children: [
          /* @__PURE__ */ d.jsx("span", { className: p0, children: "Alpha" }),
          /* @__PURE__ */ d.jsx("br", {}),
          /* @__PURE__ */ d.jsx("span", { className: g_, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: u,
            className: g0,
            style: { "--fill": `${u * 100}%` },
            onChange: (A) => ee(Number(A.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { className: v0, children: [
          (u * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(
        "div",
        {
          className: `${S_}${U.length === 0 ? ` ${w_}` : ""}`,
          children: [
            /* @__PURE__ */ d.jsxs("div", { className: E_, children: [
              /* @__PURE__ */ d.jsx("span", { className: j_, children: "Save current as preset" }),
              U.length === 0 && /* @__PURE__ */ d.jsx("span", { className: N_, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: T_, children: [
              /* @__PURE__ */ d.jsx("div", { className: C_, children: U.length === 0 ? /* @__PURE__ */ d.jsx("span", { className: `${x0} ${M_}`, children: "no axes set" }) : U.map((A) => /* @__PURE__ */ d.jsxs("span", { className: x0, children: [
                A.label.toLowerCase(),
                /* @__PURE__ */ d.jsx("b", { className: R_, children: A.value.toFixed(2) })
              ] }, A.key)) }),
              /* @__PURE__ */ d.jsxs("div", { className: A_, children: [
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    type: "text",
                    className: __,
                    placeholder: Q,
                    value: w,
                    disabled: U.length === 0 || x,
                    onChange: (A) => {
                      N(A.target.value), T(!0);
                    },
                    onKeyDown: (A) => {
                      A.key === "Enter" && ne && te();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  ft,
                  {
                    variant: "primary",
                    disabled: !ne,
                    onClick: te,
                    children: x ? "Saving…" : "+ Save"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d.jsx(
        j2,
        {
          presets: h,
          activePresetId: S,
          onSelect: q,
          onDelete: D
        }
      )
    ] }),
    s === "qwen_template" && /* @__PURE__ */ d.jsxs("div", { className: m0, children: [
      /* @__PURE__ */ d.jsx("span", { className: p0, children: "Alpha" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 1,
          step: 0.01,
          value: u,
          className: g0,
          style: { "--fill": `${u * 100}%` },
          onChange: (A) => ee(Number(A.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: v0, children: [
        (u * 100).toFixed(0),
        "%"
      ] })
    ] }),
    v && /* @__PURE__ */ d.jsx("div", { className: x_, children: v })
  ] });
}
function z2(n) {
  if (!n || !Array.isArray(n)) return Jr(Zi);
  const a = { ...Zi };
  return $t.forEach((i, s) => {
    const o = n[s];
    a[i] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function C0(n) {
  return [...n].sort((a, i) => i.updatedAt - a.updatedAt);
}
function bf(n) {
  return n instanceof el || n instanceof Error ? n.message : "Unknown error";
}
var O2 = "_5u1uau0", ns = "_5u1uau1", k2 = "_5u1uau2", $i = "_5u1uau3", as = "_5u1uau4", L2 = "_5u1uau5", xf = "_5u1uau6", U2 = "_5u1uau7", B2 = "_5u1uau8", V2 = "_5u1uau9", $2 = "_5u1uaua", H2 = "_5u1uaub", q2 = "_5u1uauc", I2 = "_5u1uaud";
const Sf = [
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
], F2 = ["mp3", "wav", "flac"], Zo = 0.5, wf = 2, Y2 = 0.05, G2 = 0.8, X2 = 0.8, P2 = 42;
function Ef(n, a, i) {
  const s = n[a];
  if (typeof s == "number" && Number.isFinite(s)) return s;
  if (typeof s == "string") {
    const o = Number(s);
    if (Number.isFinite(o)) return o;
  }
  return i;
}
function K2({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: i,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: u,
  generation: h,
  onGenerationChange: m
}) {
  const v = y.useId(), p = y.useId(), x = y.useId(), g = y.useId(), S = y.useId(), E = (R, _) => {
    m({ ...h, [R]: _ });
  }, w = Sf.find((R) => R.id === o) ?? Sf[0], N = (i - Zo) / (wf - Zo) * 100, C = Ef(h, "temperature", G2), T = Ef(h, "top_p", X2), k = Ef(h, "seed", P2);
  return /* @__PURE__ */ d.jsxs("div", { className: O2, children: [
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: v, className: $i, children: "Format" }),
      /* @__PURE__ */ d.jsx("div", { className: as, children: /* @__PURE__ */ d.jsx(
        "select",
        {
          id: v,
          className: L2,
          value: n,
          onChange: (R) => a(R.currentTarget.value),
          children: F2.map((R) => /* @__PURE__ */ d.jsx("option", { value: R, children: R }, R))
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: p, className: $i, children: "Speed" }),
      /* @__PURE__ */ d.jsxs("div", { className: `${as} ${U2}`, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: B2,
            min: Zo,
            max: wf,
            step: Y2,
            value: i,
            style: { "--range-pct": `${N}%` },
            onChange: (R) => s(Number(R.currentTarget.value)),
            "aria-valuemin": Zo,
            "aria-valuemax": wf,
            "aria-valuenow": i
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { className: V2, children: [
          i.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: k2, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ d.jsx("span", { className: $i, children: "Cache" }),
      /* @__PURE__ */ d.jsx("div", { className: $2, children: Sf.map((R) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === R.id,
          className: H2,
          onClick: () => u(R.id),
          title: R.help,
          children: R.label
        },
        R.id
      )) }),
      /* @__PURE__ */ d.jsx("p", { className: q2, "aria-live": "polite", children: w.help })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: I2, "aria-hidden": "true" }),
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: x, className: $i, children: "Temperature" }),
      /* @__PURE__ */ d.jsx("div", { className: as, children: /* @__PURE__ */ d.jsx(
        "input",
        {
          id: x,
          type: "number",
          className: xf,
          min: 0,
          max: 2,
          step: 0.05,
          value: C,
          onChange: (R) => E("temperature", Number(R.currentTarget.value))
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
          className: xf,
          min: 0,
          max: 1,
          step: 0.05,
          value: T,
          onChange: (R) => E("top_p", Number(R.currentTarget.value))
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
          className: xf,
          step: 1,
          value: k,
          onChange: (R) => E("seed", Math.trunc(Number(R.currentTarget.value)))
        }
      ) })
    ] })
  ] });
}
var Q2 = "iv43qk0", R0 = "iv43qk1", Z2 = "iv43qk2", M0 = "iv43qk3", J2 = "iv43qk4", W2 = "iv43qk5", e3 = "iv43qk6", t3 = "iv43qk7", n3 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, a3 = "iv43qkd", r3 = "iv43qke", jf = "iv43qkf", Nf = "iv43qkg";
function i3({
  lines: n,
  characterColors: a,
  onLineClick: i
}) {
  if (n.length === 0)
    return /* @__PURE__ */ d.jsx("p", { className: a3, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const s = n.length, o = n.filter((h) => h.character !== null).length, u = s - o;
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: r3, children: [
      /* @__PURE__ */ d.jsxs("span", { className: jf, children: [
        /* @__PURE__ */ d.jsx("span", { className: Nf, children: s }),
        "lines"
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: jf, children: [
        /* @__PURE__ */ d.jsx("span", { className: Nf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: jf, children: [
        /* @__PURE__ */ d.jsx("span", { className: Nf, children: u }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("ol", { className: Q2, children: n.map((h) => /* @__PURE__ */ d.jsx(
      l3,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...i ? { onClick: () => i(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function l3({ line: n, color: a, onClick: i }) {
  return n.character === null ? /* @__PURE__ */ d.jsxs("li", { className: `${R0} ${Z2}`, children: [
    /* @__PURE__ */ d.jsx("span", { className: M0, children: String(n.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ d.jsx("span", { className: e3, children: n.text })
  ] }) : /* @__PURE__ */ d.jsxs(
    "li",
    {
      className: R0,
      onClick: i,
      style: i ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ d.jsx("span", { className: M0, children: String(n.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ d.jsx("span", { className: J2, style: a ? { color: a } : void 0, children: n.character }),
        /* @__PURE__ */ d.jsxs("span", { className: W2, children: [
          n.text,
          n.override && /* @__PURE__ */ d.jsxs("span", { className: `${t3} ${n3[n.override.kind]}`, children: [
            n.override.kind,
            n.override.label ? ` · ${n.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var s3 = "_46z95i0", o3 = "_46z95i1", c3 = "_46z95i2", u3 = "_46z95i3", d3 = "_46z95i4", f3 = "_46z95i5", h3 = "_46z95i6";
const m3 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function p3({ value: n, onChange: a }) {
  return /* @__PURE__ */ d.jsxs("div", { className: s3, children: [
    /* @__PURE__ */ d.jsx(
      Tf,
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
      Tf,
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
      Tf,
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
function Tf({ label: n, sub: a, min: i, max: s, step: o, format: u, value: h, onChange: m }) {
  const v = (h - i) / (s - i) * 100, p = `perf-${n.toLowerCase()}`;
  return /* @__PURE__ */ d.jsxs("div", { className: o3, children: [
    /* @__PURE__ */ d.jsxs("div", { className: c3, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: p, className: u3, children: n }),
      /* @__PURE__ */ d.jsx("span", { className: d3, children: a })
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
        className: f3,
        style: { "--fill": `${v}%` },
        onChange: (x) => m(Number(x.target.value))
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: h3, children: u(h) })
  ] });
}
var g3 = "qe93dj0", v3 = "qe93dj1", y3 = "qe93dj2", b3 = "qe93dj3", x3 = "qe93dj4", S3 = "qe93dj5", w3 = "qe93dj6", E3 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, j3 = "qe93dja", N3 = "qe93djb";
function T3({ checks: n }) {
  const a = n.filter((i) => i.status === "ok").length;
  return /* @__PURE__ */ d.jsxs("div", { className: g3, children: [
    /* @__PURE__ */ d.jsxs("header", { className: v3, children: [
      /* @__PURE__ */ d.jsx("span", { className: y3, children: "Pre-flight" }),
      /* @__PURE__ */ d.jsxs("span", { className: b3, children: [
        a,
        "/",
        n.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("ul", { className: x3, children: n.map((i) => /* @__PURE__ */ d.jsxs("li", { className: S3, children: [
      /* @__PURE__ */ d.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${w3} ${E3[i.status]}`
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: j3, children: i.label }),
      i.detail && /* @__PURE__ */ d.jsx("span", { className: N3, children: i.detail })
    ] }, i.id)) })
  ] });
}
var C3 = "xq3iim0", R3 = "xq3iim2 xq3iim1", M3 = "xq3iim3 xq3iim1", A3 = "xq3iim4", _3 = "xq3iim5", D3 = "xq3iim6", z3 = "xq3iim7";
function O3({
  deploymentId: n,
  initialVoiceAssetId: a,
  onChange: i
}) {
  const [s, o] = y.useState([]), [u, h] = y.useState(a), [m, v] = y.useState(!0), [p, x] = y.useState(!1), [g, S] = y.useState(null);
  y.useEffect(() => {
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
    const N = u;
    h(w);
    try {
      await nT(n, w), i?.(w);
    } catch (C) {
      h(N), S(C instanceof Error ? C.message : "Failed to update default voice");
    } finally {
      x(!1);
    }
  }
  return m ? /* @__PURE__ */ d.jsx("p", { className: D3, children: "Loading voices…" }) : g ? /* @__PURE__ */ d.jsx("p", { className: z3, children: g }) : s.length === 0 ? /* @__PURE__ */ d.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ d.jsx(
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
      className: C3,
      children: s.map((w) => {
        const N = w.voiceAssetId === u;
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": N,
            disabled: p,
            onClick: () => void E(N ? null : w.voiceAssetId),
            className: N ? M3 : R3,
            children: [
              /* @__PURE__ */ d.jsx("span", { className: A3, children: w.displayName }),
              w.durationMs !== null && w.durationMs !== void 0 && /* @__PURE__ */ d.jsx("span", { className: _3, children: k3(w.durationMs) })
            ]
          },
          w.voiceAssetId
        );
      })
    }
  );
}
function k3(n) {
  const a = n / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const i = Math.floor(a / 60), s = Math.round(a - i * 60);
  return `${i}:${s.toString().padStart(2, "0")}`;
}
var A0 = "_17fbpt30", _0 = "_17fbpt31", D0 = "_17fbpt32", L3 = "_17fbpt33", U3 = "_17fbpt34", B3 = "_17fbpt35", z0 = "_17fbpt36", V3 = "_17fbpt37", $3 = "_17fbpt38";
const H3 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function q3({
  runs: n,
  deploymentId: a,
  onOpenQueue: i,
  onOpenRun: s,
  emptyHint: o
}) {
  return n.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: A0, children: [
    /* @__PURE__ */ d.jsx("header", { className: _0, children: /* @__PURE__ */ d.jsx(
      "a",
      {
        className: D0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: i ? (u) => {
          u.preventDefault(), i();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ d.jsx("p", { className: V3, children: "No runs yet." }),
    /* @__PURE__ */ d.jsx("p", { className: $3, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ d.jsxs("div", { className: A0, children: [
    /* @__PURE__ */ d.jsxs("header", { className: _0, children: [
      /* @__PURE__ */ d.jsx("span", {}),
      /* @__PURE__ */ d.jsx(
        "a",
        {
          className: D0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: i ? (u) => {
            u.preventDefault(), i();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ d.jsx("ul", { className: L3, children: n.slice(0, 5).map((u) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: U3,
        onClick: s ? () => s(u.runId) : void 0,
        children: [
          /* @__PURE__ */ d.jsx("span", { className: B3, children: u.runId }),
          /* @__PURE__ */ d.jsx("span", { className: `${Dx.sm} ${zx[H3[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ d.jsx("span", { className: z0, children: I3(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ d.jsx("span", { className: z0, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function I3(n) {
  if (!n) return "—";
  const a = n > 1e12 ? Math.floor(n / 1e3) : n, i = new Date(a * 1e3);
  if (Number.isNaN(i.getTime())) return "—";
  const o = Date.now() - i.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : i.toISOString().slice(0, 16).replace("T", " ");
}
function F3(n) {
  const a = js(), [i, s] = y.useState("idle"), [o, u] = y.useState(null), [h, m] = y.useState(/* @__PURE__ */ new Map()), [v, p] = y.useState(null), [x, g] = y.useState(null), S = y.useRef(null);
  y.useEffect(() => () => {
    S.current?.();
  }, []), y.useEffect(() => {
    const U = {
      busy: i === "starting" || i === "running"
    };
    window.dispatchEvent(new CustomEvent("emotion-tts:run-state", { detail: U }));
  }, [i]);
  const E = y.useCallback(
    (U) => {
      const ne = U.status;
      (ne === "completed" || ne === "partial") && Zt.success(
        ne === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
        {
          action: {
            label: "Artifacts",
            onClick: () => {
              a(`/${n.deploymentId}?tab=artifacts`);
            }
          }
        }
      );
    },
    [a, n.deploymentId]
  ), w = y.useCallback(async () => {
    s("starting"), p(null), m(/* @__PURE__ */ new Map()), g(null);
    try {
      const U = await lT(n.deploymentId, n.createPayload);
      u(U.runId), s("running"), S.current?.(), S.current = Cy(
        n.deploymentId,
        U.runId,
        (ne) => O0(
          ne,
          m,
          s,
          (Q) => {
            g(Q), E(Q);
          },
          n.deploymentId,
          U.runId
        ),
        () => s("error")
      );
    } catch (U) {
      s("error"), p(Cf(U));
    }
  }, [n.deploymentId, n.createPayload, E]);
  y.useEffect(() => {
    const U = () => {
      (i === "idle" || i === "terminal" || i === "error") && w();
    };
    return window.addEventListener("emotion-tts:trigger-generate", U), () => window.removeEventListener("emotion-tts:trigger-generate", U);
  }, [i, w]);
  const N = y.useCallback(async () => {
    if (o)
      try {
        await sT(n.deploymentId, o);
      } catch (U) {
        p(Cf(U));
      }
  }, [n.deploymentId, o]), C = Array.from(h.values()).sort((U, ne) => U.globalIndex - ne.globalIndex), T = i === "starting" || i === "running", k = x?.status === "partial", R = C.filter((U) => U.status === "running").length, _ = C.filter((U) => U.status === "completed").length, K = i === "starting" || i === "running" || C.length > 0, ee = C.filter((U) => U.status === "failed"), te = (() => {
    if (i !== "terminal" || ee.length === 0) return null;
    const U = /* @__PURE__ */ new Map();
    for (const A of ee) {
      const V = A.failureCategory ?? "unknown";
      U.set(V, (U.get(V) ?? 0) + 1);
    }
    let ne = "unknown", Q = 0;
    for (const [A, V] of U)
      V > Q && (ne = A, Q = V);
    const O = C.length;
    return { category: ne, count: Q, total: O };
  })(), D = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, q = "Check the run detail page for the per-segment error log.", F = v?.toLowerCase().includes("unmapped") ?? !1, oe = n.diagnostics ?? [], ie = oe.find((U) => U.status === "fail");
  return /* @__PURE__ */ d.jsxs("div", { children: [
    oe.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: kM, "aria-label": "Pre-flight checks", children: oe.map((U) => /* @__PURE__ */ d.jsxs("li", { className: LM, children: [
      /* @__PURE__ */ d.jsx(xr, { tone: G3(U.status), children: X3(U.status) }),
      /* @__PURE__ */ d.jsx("span", { className: UM, children: U.label }),
      U.detail && /* @__PURE__ */ d.jsx("span", { className: BM, children: U.detail })
    ] }, U.label)) }),
    v && /* @__PURE__ */ d.jsxs(
      zn,
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
          F && /* @__PURE__ */ d.jsx(
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
    /* @__PURE__ */ d.jsxs("div", { className: _x, children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          disabled: !n.canGenerate || T || !!ie,
          onClick: w,
          children: i === "running" ? "Running…" : "Generate"
        }
      ),
      /* @__PURE__ */ d.jsx(ft, { variant: "danger", disabled: !T, onClick: N, children: "Cancel" }),
      K && /* @__PURE__ */ d.jsxs(
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
              /* @__PURE__ */ d.jsx("strong", { children: R }),
              " in flight ·",
              " ",
              /* @__PURE__ */ d.jsx("strong", { children: _ }),
              "/",
              C.length,
              " done"
            ] })
          ]
        }
      )
    ] }),
    te && /* @__PURE__ */ d.jsxs(zn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ d.jsxs("strong", { children: [
        "Run failed — ",
        te.count,
        " of ",
        te.total,
        " segments failed with ",
        /* @__PURE__ */ d.jsx("code", { children: te.category })
      ] }),
      /* @__PURE__ */ d.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: D[te.category] ?? q })
    ] }),
    x?.exportArtifactRef && /* @__PURE__ */ d.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${x.exportArtifactRef}/download`,
        download: !0,
        className: `${jx.secondary} ${Nx.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    k && x && /* @__PURE__ */ d.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ d.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "secondary",
          disabled: !!ie,
          onClick: async () => {
            try {
              const U = await xx(n.deploymentId, x.runId);
              u(U.runId), m(/* @__PURE__ */ new Map()), g(null), s("running"), S.current?.(), S.current = Cy(
                n.deploymentId,
                U.runId,
                (ne) => O0(ne, m, s, g, n.deploymentId, U.runId),
                () => s("error")
              );
            } catch (U) {
              p(Cf(U)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    C.length > 0 && /* @__PURE__ */ d.jsxs("table", { className: zM, children: [
      /* @__PURE__ */ d.jsx("thead", { children: /* @__PURE__ */ d.jsxs("tr", { children: [
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "#" }),
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "Status" }),
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "Duration" }),
        /* @__PURE__ */ d.jsx("th", { className: fr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ d.jsx("tbody", { children: C.map((U) => /* @__PURE__ */ d.jsxs("tr", { className: OM, children: [
        /* @__PURE__ */ d.jsx("td", { className: fr, children: U.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ d.jsx("td", { className: fr, children: /* @__PURE__ */ d.jsx(xr, { tone: Y3(U.status), children: U.status }) }),
        /* @__PURE__ */ d.jsx("td", { className: fr, children: U.durationMs ? `${U.durationMs} ms` : "—" }),
        /* @__PURE__ */ d.jsx("td", { className: fr, children: U.failureCategory ?? "" })
      ] }, U.globalIndex)) })
    ] })
  ] });
}
async function O0(n, a, i, s, o, u) {
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
        const h = await zh(o, u);
        s(h);
      } catch {
      }
      return;
  }
}
function Y3(n) {
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
function G3(n) {
  switch (n) {
    case "ok":
      return "success";
    case "warn":
      return "warning";
    case "fail":
      return "danger";
  }
}
function X3(n) {
  switch (n) {
    case "ok":
      return "ok";
    case "warn":
      return "warn";
    case "fail":
      return "stop";
  }
}
function Cf(n) {
  return n instanceof el || n instanceof Error ? n.message : "unknown error";
}
const k0 = [
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
function P3(n) {
  const a = js(), i = y.useRef(null), { tokens: s, attributions: o, unresolved: u, predictedFilenames: h, characterColor: m } = y.useMemo(
    () => Q3(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  ), v = (p) => {
    const x = i.current;
    x && (x.scrollTop = p.currentTarget.scrollTop, x.scrollLeft = p.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: RM, children: [
      /* @__PURE__ */ d.jsx("div", { ref: i, className: MM, "aria-hidden": "true", children: s.map((p, x) => K3(p, x, m)) }),
      /* @__PURE__ */ d.jsx(
        "textarea",
        {
          className: AM,
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
    u.length > 0 && /* @__PURE__ */ d.jsxs(zn, { severity: "error", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      u.map((p) => /* @__PURE__ */ d.jsxs(
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
      /* @__PURE__ */ d.jsx("ul", { className: l0, children: o.map((p) => /* @__PURE__ */ d.jsxs("li", { children: [
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
      /* @__PURE__ */ d.jsx("ul", { className: l0, children: h.map((p) => /* @__PURE__ */ d.jsx("li", { children: p }, p)) })
    ] })
  ] });
}
function K3(n, a, i) {
  if (n.kind === "blank")
    return /* @__PURE__ */ d.jsxs("span", { children: [
      n.raw,
      `
`
    ] }, a);
  if (n.kind === "narrator")
    return /* @__PURE__ */ d.jsxs("span", { children: [
      /* @__PURE__ */ d.jsx("span", { className: i0, children: n.raw }),
      `
`
    ] }, a);
  const s = i.get(n.character?.toLowerCase() ?? "") ?? "currentColor", o = n.hasMapping ? r0 : `${r0} ${_M}`;
  return /* @__PURE__ */ d.jsxs("span", { children: [
    /* @__PURE__ */ d.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      n.character,
      n.override && /* @__PURE__ */ d.jsxs("span", { className: DM, children: [
        "|",
        n.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: i0, children: [
      " ",
      n.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function Q3(n, a, i) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], h = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), v = [], p = /* @__PURE__ */ new Map();
  let x = 0;
  const g = n.split(/\r?\n/);
  let S = 0;
  return g.forEach((E, w) => {
    const N = E.trim();
    if (!N) {
      o.push({ kind: "blank", raw: E });
      return;
    }
    const C = w + 1, T = N.match(s);
    let k = "Narrator", R = N, _, K = !1;
    if (T?.groups) {
      K = !0;
      const q = (T.groups.body ?? "").trim(), F = (T.groups.rest ?? "").trim();
      k = ((q.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", _ = (q.includes("|") ? q.slice(q.indexOf("|") + 1) : "").trim() || void 0, R = F;
    }
    S += 1;
    const ee = k.toLowerCase(), te = (m.get(ee) ?? 0) + 1;
    m.set(ee, te);
    const D = k === "Narrator" || i.has(ee);
    if (D || h.add(k), k !== "Narrator" && !p.has(ee) && (p.set(ee, k0[x % k0.length] ?? "currentColor"), x += 1), K) {
      const q = { kind: "character", raw: E, character: k, text: R, hasMapping: D };
      _ !== void 0 && (q.override = _), o.push(q);
    } else
      o.push({ kind: "narrator", raw: E });
    u.push({ lineNumber: C, character: k, text: R, hasMapping: D }), v.push(
      `${S.toString().padStart(3, "0")}_${Z3(k)}_${te.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(h),
    predictedFilenames: v,
    characterColor: p
  };
}
function Z3(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const Rf = [
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
], J3 = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function W3(n) {
  const a = [];
  if (!n) return a;
  const i = n.split(/\r?\n/);
  for (let s = 0; s < i.length; s += 1) {
    const u = (i[s] ?? "").trim();
    if (u.length === 0) continue;
    const h = u.match(J3);
    if (!h || !h.groups) {
      a.push({ idx: s, character: null, text: u, override: null });
      continue;
    }
    const m = h.groups.body ?? "", v = (h.groups.rest ?? "").trim(), [p = "", ...x] = m.split("|"), g = p.trim();
    if (!g) {
      a.push({ idx: s, character: null, text: v || u, override: null });
      continue;
    }
    const S = g.split(":")[0]?.trim() || null, E = x.join("|").trim(), w = E ? eD(E) : null;
    a.push({
      idx: s,
      character: S,
      text: v,
      override: w
    });
  }
  return a;
}
function eD(n) {
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
function tD(n) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const s of n) {
    if (!s.character) continue;
    const o = s.character.toLowerCase();
    a.has(o) || (a.add(o), i.push(s.character));
  }
  return i;
}
function nD(n) {
  const a = {};
  for (let i = 0; i < n.length; i += 1) {
    const s = n[i];
    s && (a[s] = Rf[i % Rf.length] ?? Rf[0]);
  }
  return a;
}
function aD(n) {
  const a = {};
  for (const i of n)
    i.character && (a[i.character] = (a[i.character] ?? 0) + 1);
  return a;
}
var rD = "_1snzz30", iD = "_1snzz31", lD = "_1snzz32", sD = "_1snzz33", Mf = "_1snzz34", L0 = "_1snzz36";
const oD = 4e3;
function cD({ visible: n, canGenerate: a }) {
  const [i, s] = y.useState(null), [o, u] = y.useState(!1), [h, m] = y.useState(!1);
  y.useEffect(() => {
    let R = !1;
    const _ = async () => {
      try {
        const ee = await yc();
        R || s(ee);
      } catch {
      }
    };
    _();
    const K = window.setInterval(_, oD);
    return () => {
      R = !0, window.clearInterval(K);
    };
  }, []), y.useEffect(() => {
    const R = (_) => {
      const K = _.detail;
      m(!!K?.busy);
    };
    return window.addEventListener("emotion-tts:run-state", R), () => window.removeEventListener("emotion-tts:run-state", R);
  }, []);
  const v = y.useCallback(() => {
    window.dispatchEvent(new CustomEvent("emotion-tts:trigger-generate"));
  }, []), p = i?.badge ?? "not_installed", x = p === "ready" || p === "running", g = p === "starting" || p === "installing", S = x, E = y.useCallback(async () => {
    u(!0);
    try {
      x ? (await Mx(), Zt.success("Runtime stopped")) : (await Rx(), Zt.success("Runtime starting…"));
    } catch (R) {
      Zt.error(R instanceof Error ? R.message : "runtime action failed");
    } finally {
      u(!1);
    }
  }, [x]), w = x ? "Stop runtime" : g ? "Runtime starting…" : "Start runtime", N = o || g, C = o || g, T = !a || h || !S, k = S ? a ? h ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate";
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: rD,
      "data-visible": n ? "true" : "false",
      role: "toolbar",
      "aria-label": "Quick actions",
      "aria-hidden": !n,
      children: [
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: iD,
            "data-state": x ? "running" : "stopped",
            onClick: E,
            disabled: N,
            title: w,
            "aria-label": w,
            children: C ? /* @__PURE__ */ d.jsx("span", { className: L0, "aria-hidden": "true" }) : x ? /* @__PURE__ */ d.jsx("span", { className: Mf, "aria-hidden": "true", children: "◼" }) : /* @__PURE__ */ d.jsx("span", { className: Mf, "aria-hidden": "true", children: "⏻" })
          }
        ),
        /* @__PURE__ */ d.jsx("span", { className: sD, "aria-hidden": "true" }),
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: lD,
            onClick: v,
            disabled: T,
            title: k,
            "aria-label": k,
            children: h ? /* @__PURE__ */ d.jsx("span", { className: L0, "aria-hidden": "true" }) : /* @__PURE__ */ d.jsx("span", { className: Mf, "aria-hidden": "true", children: "▶" })
          }
        )
      ]
    }
  );
}
function uD(n) {
  const a = n.workflowCustomised ?? !1, i = n.unmappableFields ?? [], s = mD(n.deployment.displayName, n.deployment.deploymentId), o = dD(360), u = n.canGenerate ?? !1;
  return /* @__PURE__ */ d.jsxs("div", { className: dM, children: [
    /* @__PURE__ */ d.jsxs("header", { className: fM, children: [
      /* @__PURE__ */ d.jsx("div", { className: mM, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ d.jsx("div", { className: hM, children: /* @__PURE__ */ d.jsx("h1", { className: pM, children: s }) }),
      /* @__PURE__ */ d.jsx("p", { className: gM, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      n.hero
    ] }),
    a && /* @__PURE__ */ d.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Workflow customised." }),
      " ",
      i.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${i.join(", ")}.`,
      " ",
      /* @__PURE__ */ d.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    n.quickActions && /* @__PURE__ */ d.jsx("div", { className: jM, "aria-label": "Quick actions", children: n.quickActions }),
    /* @__PURE__ */ d.jsxs("div", { className: vM, children: [
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: n.scriptSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: n.parsedDialogueSection
        }
      ),
      n.voiceLibrarySection && /* @__PURE__ */ d.jsx(
        hr,
        {
          number: "03",
          title: "Voice library",
          id: "recipe-section-voice-library",
          variant: "default",
          children: n.voiceLibrarySection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: n.voiceLibrarySection ? "04" : "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: n.castSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: n.voiceLibrarySection ? "05" : "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: n.emotionSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: n.voiceLibrarySection ? "06" : "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: n.performanceSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        hr,
        {
          number: n.voiceLibrarySection ? "07" : "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: n.recentRunsSection
        }
      ),
      n.auditSection && /* @__PURE__ */ d.jsx(
        hr,
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
    /* @__PURE__ */ d.jsx(cD, { visible: o, canGenerate: u }),
    /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: NM,
        "data-visible": o ? "true" : "false",
        "aria-label": "Scroll to top",
        title: "Scroll to top",
        onClick: hD,
        children: "↑"
      }
    )
  ] });
}
function dD(n) {
  const [a, i] = y.useState(!1);
  return y.useEffect(() => {
    if (typeof window > "u") return;
    const s = qx(), o = () => {
      const h = s.reduce((m, v) => {
        const p = fD(v);
        return p > m ? p : m;
      }, 0);
      i(h > n);
    };
    o();
    const u = { passive: !0 };
    for (const h of s)
      h.addEventListener("scroll", o, u);
    return () => {
      for (const h of s)
        h.removeEventListener("scroll", o, u);
    };
  }, [n]), a;
}
function fD(n) {
  return n === window ? window.scrollY || document.documentElement.scrollTop || 0 : n.scrollTop;
}
function qx() {
  const n = [window];
  if (typeof document > "u") return n;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const i = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(i.overflowY) || /(auto|scroll|overlay)/.test(i.overflow)) && n.push(a), a = a.parentElement;
  }
  return n;
}
function hD() {
  if (typeof window > "u") return;
  const n = qx();
  for (const a of n)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function mD(n, a) {
  const i = (n ?? "").trim();
  return !i || i === a ? "Recipe Studio" : i;
}
function hr({
  number: n,
  title: a,
  id: i,
  variant: s,
  defaultCollapsed: o = !1,
  children: u
}) {
  const [h, m] = y.useState(o), v = `${i}-body`;
  return /* @__PURE__ */ d.jsxs("section", { className: yM, "aria-labelledby": i, children: [
    /* @__PURE__ */ d.jsx("header", { className: bM, children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: wM,
        "aria-expanded": !h,
        "aria-controls": v,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ d.jsxs("span", { className: xM, children: [
            n,
            " / ",
            a
          ] }),
          /* @__PURE__ */ d.jsx("h2", { id: i, className: SM, children: a }),
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: EM,
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
        className: s === "split" ? CM : TM,
        children: u
      }
    )
  ] });
}
const An = {
  success(n) {
    Zt.success(n);
  },
  error(n) {
    Zt.error(n);
  }
};
function pD(n) {
  try {
    const a = JSON.parse(n);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function gD() {
  const { deployment: n, mappings: a, runs: i, workflow: s } = Ts(), [o, u] = y.useState(a), [h, m] = y.useState([]), [v, p] = y.useState([]), [x, g] = y.useState(null), [S, E] = y.useState(kc), w = y.useMemo(
    () => n.defaultGenerationOverridesJson ? pD(n.defaultGenerationOverridesJson) : {},
    [n.defaultGenerationOverridesJson]
  ), N = y.useMemo(() => {
    const fe = w.__recipe;
    return typeof fe == "object" && fe !== null ? fe : {};
  }, [w]), [C, T] = y.useState(""), [k, R] = y.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [_, K] = y.useState(n.defaultSpeedFactor ?? 1), [ee, te] = y.useState({
    mode: "none",
    emotionAlpha: 1
  }), [D, q] = y.useState(() => {
    const { __recipe: fe, ...ke } = w;
    return {
      temperature: 0.8,
      top_p: 0.8,
      seed: 42,
      ...ke
    };
  }), [F, oe] = y.useState(() => {
    const fe = N.cachePolicy;
    return fe === "use_cache" || fe === "force_regenerate" || fe === "read_only_cache" ? fe : "use_cache";
  }), [ie, U] = y.useState(
    n.defaultVoiceAssetId ?? null
  ), [ne, Q] = y.useState(() => {
    const fe = N.quickMode;
    return typeof fe == "boolean" ? fe : n.defaultVoiceAssetId != null;
  }), [O, A] = y.useState(m3);
  y.useEffect(() => {
    let fe = !1;
    return ps(n.deploymentId).then((ke) => {
      fe || m(ke.voiceAssets);
    }).catch(() => {
    }), Ex(n.deploymentId).then((ke) => {
      fe || p(ke.presets);
    }).catch(() => {
    }), () => {
      fe = !0;
    };
  }, [n.deploymentId]);
  const V = y.useRef(!0);
  y.useEffect(() => {
    if (V.current) {
      V.current = !1;
      return;
    }
    const fe = window.setTimeout(() => {
      const ke = {
        ...D,
        __recipe: {
          quickMode: ne,
          cachePolicy: F
        }
      };
      ht(`/deployments/${n.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: k,
          defaultSpeedFactor: _,
          defaultGenerationOverrides: ke
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(fe);
  }, [
    n.deploymentId,
    k,
    _,
    F,
    ne,
    D
  ]);
  const X = y.useMemo(() => W3(C), [C]), re = y.useMemo(() => tD(X), [X]), M = y.useMemo(() => nD(re), [re]), J = y.useMemo(() => aD(X), [X]), Z = y.useMemo(() => {
    const fe = /* @__PURE__ */ new Map();
    for (const ke of o)
      fe.set(ke.characterName.toLowerCase(), ke);
    return fe;
  }, [o]), ce = y.useMemo(() => ne && ie ? 0 : re.filter((fe) => !Z.has(fe.toLowerCase())).length, [re, Z, ne, ie]), he = y.useCallback(
    async (fe, ke) => {
      const De = Z.get(fe.toLowerCase());
      try {
        if (De) {
          const Te = await us(n.deploymentId, De.mappingId, ke);
          u(
            (bt) => bt.map((xt) => xt.mappingId === Te.mappingId ? Te : xt)
          ), An.success(`Updated mapping for ${fe}`);
        } else if (ke.speakerVoiceAssetId) {
          const Te = await Dh(n.deploymentId, {
            ...ke,
            characterName: fe,
            speakerVoiceAssetId: ke.speakerVoiceAssetId
          });
          u((bt) => [...bt, Te]), An.success(`Mapped ${fe} to voice`);
        }
      } catch (Te) {
        An.error(Te instanceof Error ? Te.message : "mapping failed");
      }
    },
    [Z, n.deploymentId]
  ), ve = y.useCallback(
    async (fe) => {
      const ke = Z.get(fe.toLowerCase());
      if (ke)
        try {
          await bx(n.deploymentId, ke.mappingId), u((De) => De.filter((Te) => Te.mappingId !== ke.mappingId)), An.success(`Cleared mapping for ${fe}`);
        } catch (De) {
          An.error(De instanceof Error ? De.message : "clear failed");
        }
    },
    [Z, n.deploymentId]
  ), _e = y.useCallback(
    async (fe, ke) => {
      try {
        const De = await vc(
          n.deploymentId,
          ke,
          ke.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((Te) => [De, ...Te]), await he(fe, { speakerVoiceAssetId: De.voiceAssetId });
      } catch (De) {
        An.error(De instanceof Error ? De.message : "upload failed");
      }
    },
    [n.deploymentId, he]
  ), Me = y.useCallback((fe) => {
    E(fe);
  }, []), Ve = y.useMemo(() => {
    const fe = [], ke = /* @__PURE__ */ new Set();
    for (const De of o) {
      const Te = De.speakerVoiceAssetId;
      if (!Te || ke.has(Te)) continue;
      ke.add(Te);
      const xt = h.find((dn) => dn.voiceAssetId === Te)?.displayName ?? `${De.characterName} · ${Te.slice(0, 8)}`;
      fe.push({ kind: "voice_asset", id: Te, label: xt });
    }
    for (const De of h)
      ke.has(De.voiceAssetId) || (ke.add(De.voiceAssetId), fe.push({ kind: "voice_asset", id: De.voiceAssetId, label: De.displayName }));
    return fe;
  }, [o, h]), Jt = y.useCallback(
    async (fe, ke) => {
      if (fe.kind !== "voice_asset") {
        An.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let De;
      try {
        const Te = JSON.parse(ke);
        if (typeof Te != "object" || Te === null || Te.version !== 1 || !Array.isArray(Te.ops))
          throw new Error("snapshot is not a valid EditChain");
        De = Te;
      } catch (Te) {
        An.error(
          Te instanceof Error ? `Audit snapshot is malformed: ${Te.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const Te = await Sx(fe.id, n.deploymentId, {
          chain: De
        }), bt = o.filter((xt) => xt.speakerVoiceAssetId === fe.id);
        await Promise.all(
          bt.map(
            (xt) => us(n.deploymentId, xt.mappingId, {
              voiceAssetChainDigest: Te.chain_digest
            }).catch(() => null)
          )
        ), u(
          (xt) => xt.map(
            (dn) => dn.speakerVoiceAssetId === fe.id ? { ...dn, voiceAssetChainDigest: Te.chain_digest } : dn
          )
        ), An.success(`Reverted ${fe.label} to a prior chain`);
      } catch (Te) {
        An.error(Te instanceof Error ? Te.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), Pt = y.useCallback(
    async (fe) => {
      if (fe.kind !== "voice_asset") {
        An.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await mC(fe.id, n.deploymentId);
        const ke = o.filter((De) => De.speakerVoiceAssetId === fe.id);
        await Promise.all(
          ke.map(
            (De) => us(n.deploymentId, De.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (De) => De.map(
            (Te) => Te.speakerVoiceAssetId === fe.id ? { ...Te, voiceAssetChainDigest: null } : Te
          )
        ), An.success(`Cleared edit chain on ${fe.label}`);
      } catch (ke) {
        An.error(ke instanceof Error ? ke.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), _t = y.useMemo(
    () => ({
      script: C,
      parserMode: ne ? "raw_text" : "dialogue",
      outputFormat: k,
      speedFactor: _,
      globalEmotion: { ...ee, emotionAlpha: O.intensity },
      generation: D,
      cachePolicy: F
    }),
    [C, ne, k, _, O.intensity, ee, D, F]
  ), We = y.useMemo(
    () => xD({
      script: C,
      quickMode: ne,
      defaultVoiceAssetId: ie,
      characters: re,
      unmappedCount: ce,
      globalEmotion: ee,
      performance: O
    }),
    [C, ne, ie, re, ce, ee, O]
  ), pt = y.useMemo(
    () => We.filter((fe) => fe.id !== "performance").map((fe) => ({
      label: fe.label,
      status: fe.status === "ok" ? "ok" : fe.status === "warn" ? "warn" : "fail",
      detail: fe.detail
    })),
    [We]
  );
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(fC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ d.jsx(
      uD,
      {
        deployment: n,
        canGenerate: C.trim().length > 0,
        workflowCustomised: s.workflow.customised,
        unmappableFields: s.unmappableFields,
        hero: /* @__PURE__ */ d.jsx(qM, { deployment: n }),
        quickActions: /* @__PURE__ */ d.jsx(
          F3,
          {
            deploymentId: n.deploymentId,
            createPayload: _t,
            canGenerate: C.trim().length > 0,
            diagnostics: pt
          }
        ),
        scriptSection: /* @__PURE__ */ d.jsx(
          vD,
          {
            quickMode: ne,
            onToggleQuickMode: Q,
            deployment: n,
            script: C,
            onScriptChange: T,
            outputFormat: k,
            mappingsByLower: Z,
            defaultVoiceAssetId: ie,
            onDefaultVoiceAssetIdChange: U
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ d.jsx(i3, { lines: X, characterColors: M }),
        voiceLibrarySection: /* @__PURE__ */ d.jsx(
          TR,
          {
            deploymentId: n.deploymentId,
            voiceAssets: h,
            mappings: o,
            characterColors: M,
            onVoiceAssetsChange: m
          }
        ),
        castSection: /* @__PURE__ */ d.jsx(uM, { unmappedCount: ce, totalCount: re.length, children: re.map((fe) => {
          const ke = Z.get(fe.toLowerCase()) ?? null, De = M[fe] ?? "#ba9eff";
          return /* @__PURE__ */ d.jsx("li", { style: { listStyle: "none" }, children: /* @__PURE__ */ d.jsx(
            cM,
            {
              characterName: fe,
              color: De,
              lineCount: J[fe] ?? 0,
              mapping: ke,
              voiceAssets: h,
              presets: v,
              active: x === fe,
              onToggle: () => g((Te) => Te === fe ? null : fe),
              onAssignVoiceAsset: (Te) => he(fe, { speakerVoiceAssetId: Te }),
              onAssignPreset: (Te) => he(fe, { defaultVectorPresetId: Te }),
              onUploadFile: (Te) => _e(fe, Te),
              onClearMapping: () => ve(fe)
            }
          ) }, fe);
        }) }),
        emotionSection: /* @__PURE__ */ d.jsx(
          D2,
          {
            value: ee,
            onChange: te,
            deploymentId: n.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            p3,
            {
              value: { ...O, pace: _ },
              onChange: (fe) => {
                A(fe), fe.pace !== _ && K(fe.pace);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            Lh,
            {
              state: S,
              onChange: Me,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ d.jsx(T3, { checks: We }),
          /* @__PURE__ */ d.jsx(
            K2,
            {
              outputFormat: k,
              onOutputFormatChange: R,
              speedFactor: _,
              onSpeedFactorChange: K,
              cachePolicy: F,
              onCachePolicyChange: oe,
              generation: D,
              onGenerationChange: q
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ d.jsx(q3, { runs: i, deploymentId: n.deploymentId }),
        auditSection: /* @__PURE__ */ d.jsx(
          IR,
          {
            deploymentId: n.deploymentId,
            targets: Ve,
            onRevertToIdentity: Pt,
            onRevertToChain: Jt
          }
        )
      }
    )
  ] });
}
function vD({
  quickMode: n,
  onToggleQuickMode: a,
  deployment: i,
  script: s,
  onScriptChange: o,
  outputFormat: u,
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
            O3,
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
                /* @__PURE__ */ d.jsx(yD, {})
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ d.jsx(
      P3,
      {
        value: s,
        onChange: o,
        outputFormat: u,
        mappings: h,
        deploymentId: i.deploymentId
      }
    ),
    /* @__PURE__ */ d.jsx(bD, {})
  ] });
}
function yD() {
  return /* @__PURE__ */ d.jsxs(jC, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ d.jsx("h3", { className: wC, children: "Script syntax" }),
    /* @__PURE__ */ d.jsxs("ul", { className: EC, children: [
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
    /* @__PURE__ */ d.jsxs("p", { className: Iy, children: [
      /* @__PURE__ */ d.jsx("span", { className: Fy, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: Iy, children: [
      /* @__PURE__ */ d.jsx("span", { className: Fy, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function bD() {
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
function xD({
  script: n,
  quickMode: a,
  defaultVoiceAssetId: i,
  characters: s,
  unmappedCount: o,
  globalEmotion: u,
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
  }), u.mode === "qwen_template" && !u.qwenTemplate?.trim())
    m.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (u.mode === "emotion_vector") {
    const p = u.vector, x = Array.isArray(p) && p.some((g) => Math.abs(g) > 0.01);
    m.push({
      id: "emotion",
      status: x ? "ok" : "info",
      label: "Emotion",
      detail: x ? "8-axis vector" : "neutral vector"
    });
  } else u.mode === "audio_ref" ? m.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : m.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return m.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(h.intensity * 100)}% · pace ${h.pace.toFixed(2)}× · pitch ${h.pitchSt >= 0 ? "+" : ""}${h.pitchSt.toFixed(1)}st`
  }), m;
}
const U0 = /* @__PURE__ */ new Map();
function SD(n, a) {
  const [i, s] = y.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return y.useEffect(() => {
    if (!n || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${n}::${a}`, u = U0.get(o);
    if (u) {
      s({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), wD(n, a, h.signal).then((m) => {
      h.signal.aborted || (U0.set(o, m), s({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (h.signal.aborted) return;
      const v = m instanceof Error ? m.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: v });
    }), () => h.abort();
  }, [n, a]), i;
}
async function wD(n, a, i) {
  const s = await fetch(n, { signal: i });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (i.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return ED(h, a);
}
function ED(n, a) {
  const i = n.numberOfChannels, s = n.length, o = Math.max(1, Math.floor(s / a)), u = new Float32Array(a), h = [];
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
    u[m] = x;
  }
  return u;
}
const B0 = "(prefers-reduced-motion: reduce)";
function jD() {
  const [n, a] = y.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(B0).matches);
  return y.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(B0), s = (o) => a(o.matches);
    return i.addEventListener("change", s), () => i.removeEventListener("change", s);
  }, []), n;
}
var ND = "mquzal0", TD = "mquzal1", V0 = "mquzal2", $0 = "mquzal3", H0 = "mquzal4", CD = "mquzal5", q0 = "mquzal6", I0 = "mquzal7";
const RD = 120, MD = 720;
function Ix(n) {
  const {
    audioUrl: a,
    durationMs: i,
    startMs: s,
    endMs: o,
    onChangeStart: u,
    onChangeEnd: h,
    isPlaying: m = !1,
    playbackPositionMs: v = 0,
    onSeek: p,
    width: x = MD,
    height: g = RD
  } = n, S = y.useRef(null), E = y.useRef(null), w = y.useRef(null), N = SD(a, x), C = jD();
  y.useEffect(() => {
    AD(S.current, N.peaks, x, g);
  }, [N.peaks, x, g]);
  const T = y.useCallback(
    (D) => {
      const q = E.current?.getBoundingClientRect();
      if (!q || q.width <= 0) return 0;
      const F = Math.max(0, Math.min(1, (D - q.left) / q.width));
      return Math.round(F * i);
    },
    [i]
  );
  y.useEffect(() => {
    const D = (F) => {
      if (!w.current) return;
      const oe = T(F.clientX);
      w.current === "start" ? u(Jo(oe, 0, o - 1)) : h(Jo(oe, s + 1, i));
    }, q = () => {
      w.current = null;
    };
    return window.addEventListener("pointermove", D), window.addEventListener("pointerup", q), () => {
      window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", q);
    };
  }, [T, i, o, s, u, h]);
  const k = (D) => (q) => {
    q.preventDefault(), q.stopPropagation(), w.current = D;
  }, R = (D) => {
    !p || D.target.closest("[data-handle]") || p(T(D.clientX));
  }, _ = (D) => (q) => {
    const F = q.shiftKey ? 100 : q.ctrlKey ? 1 : 10;
    let oe = 0;
    if (q.key === "ArrowLeft") oe = -F;
    else if (q.key === "ArrowRight") oe = F;
    else return;
    q.preventDefault(), D === "start" ? u(Jo(s + oe, 0, o - 1)) : h(Jo(o + oe, s + 1, i));
  }, K = Af(s, i), ee = Af(o, i), te = Af(v, i);
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: E,
      className: ND,
      style: { height: g },
      onPointerDown: R,
      children: [
        /* @__PURE__ */ d.jsx(
          "canvas",
          {
            ref: S,
            width: x,
            height: g,
            className: TD,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ d.jsx("div", { className: I0, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ d.jsx("div", { className: I0, role: "alert", children: N.error }),
        /* @__PURE__ */ d.jsx("div", { className: q0, style: { left: 0, width: `${K}%` } }),
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: q0,
            style: { left: `${ee}%`, right: 0, width: `${100 - ee}%` }
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: V0,
            style: { left: `${K}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: k("start"),
            onKeyDown: _("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: $0, "aria-hidden": "true" }),
              /* @__PURE__ */ d.jsx("span", { className: H0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: V0,
            style: { left: `${ee}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: k("end"),
            onKeyDown: _("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: $0, "aria-hidden": "true" }),
              /* @__PURE__ */ d.jsx("span", { className: H0, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: CD,
            style: {
              left: `${te}%`,
              transition: C ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function Af(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function Jo(n, a, i) {
  return Math.max(a, Math.min(i, n));
}
function AD(n, a, i, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, i, s), !a || a.length === 0)) return;
  const u = s / 2;
  o.fillStyle = _D(n, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, i);
  for (let m = 0; m < h; m += 1) {
    const v = a[m] ?? 0, p = Math.max(1, v * (s - 4));
    o.fillRect(m, u - p / 2, 1, p);
  }
}
function _D(n, a, i) {
  return getComputedStyle(n).getPropertyValue(a).trim() || i;
}
var DD = "r8lfsm0", zD = "r8lfsm1", OD = "r8lfsm2", kD = "r8lfsm3", LD = "r8lfsm4", UD = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, BD = "_1b1zchy3", VD = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, $D = "_1b1zchy6", HD = "_1b1zchy7";
const Fx = y.createContext("standalone");
function Yx({
  variant: n = "standalone",
  children: a,
  className: i,
  style: s,
  ...o
}) {
  const u = [UD[n], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(Fx.Provider, { value: n, children: /* @__PURE__ */ d.jsx("div", { className: u, style: s, ...o, children: a }) });
}
function Gx({
  title: n,
  meta: a,
  children: i,
  className: s,
  titleId: o
}) {
  const u = y.useContext(Fx), h = [BD, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsxs("div", { className: h, children: [
    /* @__PURE__ */ d.jsx("h3", { id: o, className: VD[u], children: n }),
    a ? /* @__PURE__ */ d.jsx("span", { className: $D, children: a }) : null,
    i
  ] });
}
function Xx({
  children: n,
  className: a,
  role: i = "group"
}) {
  const s = [HD, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("div", { className: s, role: i, children: n });
}
const F0 = -16, qD = 80, ID = 720;
function FD(n) {
  const { deploymentId: a, runId: i, utterance: s, audioUrl: o, onApplied: u, onError: h, onCancel: m } = n, v = s.durationMs ?? 0, [p, x] = y.useState(() => Y0(v)), [g, S] = y.useState(kc), [E, w] = y.useState(!1), [N, C] = y.useState(!1), [T, k] = y.useState(null), [R, _] = y.useState(!1), K = y.useRef(null), ee = y.useRef(null), te = y.useRef(null);
  y.useEffect(() => {
    const V = Y0(v);
    x(V), S(Lx(V)), C(!1), k(null), te.current = null;
  }, [s.utteranceId, v]);
  const D = y.useCallback((V) => {
    S(V), x((X) => kx(X, V));
  }, []);
  y.useEffect(() => () => ee.current?.abort(), []), y.useEffect(() => {
    K.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const q = y.useCallback(
    (V) => {
      V.key === "Escape" && (V.stopPropagation(), m());
    },
    [m]
  ), F = y.useMemo(
    () => p.ops.find((V) => V.mode === "trim"),
    [p.ops]
  ), oe = F?.start_ms ?? 0, ie = F?.end_ms ?? Math.max(1, v), U = y.useCallback((V, X) => {
    x((re) => YD(re, "trim", (M) => ({
      ...M,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(V)),
      end_ms: Math.max(Math.floor(V) + 1, Math.floor(X))
    })));
  }, []), ne = y.useCallback((V) => U(V, ie), [ie, U]), Q = y.useCallback((V) => U(oe, V), [oe, U]), O = y.useCallback((V) => {
    C(V), x((X) => {
      const re = X.ops.filter((M) => M.mode !== "normalize");
      if (V) {
        const M = {
          id: Sn(),
          mode: "normalize",
          target_lufs: F0
        };
        return { ...X, ops: [...re, M] };
      }
      return { ...X, ops: re };
    });
  }, []), A = y.useCallback(async () => {
    const V = wx(p, v);
    if (V) {
      k(V.message);
      return;
    }
    if (k(null), R) return;
    ee.current?.abort();
    const X = new AbortController();
    ee.current = X, _(!0);
    try {
      const re = te.current ?? void 0, M = await hC(
        a,
        i,
        s.utteranceId,
        re ? { chain: p, digest_before: re } : { chain: p },
        { signal: X.signal }
      );
      if (X.signal.aborted) return;
      te.current = M.chain_digest, u(M);
    } catch (re) {
      if (X.signal.aborted) return;
      re instanceof Qi && (te.current = re.currentDigest || null);
      const M = re instanceof Qi ? "Edit chain has changed in another tab. Reload to continue." : re instanceof Error ? re.message : "apply failed";
      k(M), h(M);
    } finally {
      X.signal.aborted || _(!1);
    }
  }, [p, v, R, a, i, s.utteranceId, u, h]);
  return /* @__PURE__ */ d.jsx(Yx, { variant: "nested", children: /* @__PURE__ */ d.jsxs("div", { ref: K, onKeyDown: q, children: [
    /* @__PURE__ */ d.jsx(Gx, { title: "Edit segment", meta: `Source · ${Wo(v)}` }),
    /* @__PURE__ */ d.jsx(
      Ix,
      {
        audioUrl: o,
        durationMs: Math.max(1, v),
        startMs: oe,
        endMs: ie,
        onChangeStart: ne,
        onChangeEnd: Q,
        height: qD,
        width: ID
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: DD, children: [
      /* @__PURE__ */ d.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ d.jsxs("span", { className: zD, children: [
        Wo(oe),
        " → ",
        Wo(ie),
        " · ",
        Wo(ie - oe)
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: OD, children: [
      /* @__PURE__ */ d.jsxs("label", { className: kD, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: (V) => O(V.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { children: [
          "Normalize to ",
          F0.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(
        "button",
        {
          type: "button",
          className: LD,
          onClick: () => w((V) => !V),
          "aria-expanded": E,
          children: [
            E ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    E && /* @__PURE__ */ d.jsx(
      Lh,
      {
        state: g,
        onChange: D,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ d.jsxs(Xx, { children: [
      /* @__PURE__ */ d.jsx(ft, { size: "sm", onClick: () => void A(), disabled: R, children: R ? "Applying…" : "Apply" }),
      /* @__PURE__ */ d.jsx(ft, { variant: "ghost", size: "sm", onClick: m, disabled: R, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: T })
  ] }) });
}
function Y0(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function YD(n, a, i) {
  const s = n.ops.findIndex((u) => u.mode === a);
  if (s === -1) {
    const u = { id: Sn(), mode: a };
    return { ...n, ops: [...n.ops, i(u)] };
  }
  const o = [...n.ops];
  return o[s] = i(o[s]), { ...n, ops: o };
}
function Wo(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
var GD = "jq2zyb2", XD = "jq2zyb3", PD = "jq2zyb4", KD = "jq2zyb5", QD = "jq2zyb6", ZD = "jq2zyb7", JD = "jq2zyb8", WD = "jq2zyb9", ez = "jq2zyba", tz = "jq2zybb", nz = "jq2zybc", az = "jq2zybd", rz = "jq2zybe", iz = "jq2zybf jq2zybe", lz = "jq2zybg", sz = "jq2zybh", oz = "jq2zybi", cz = "jq2zybj", uz = "jq2zybk", dz = "jq2zybl", fz = "jq2zybm", hz = "jq2zybn", mz = "jq2zybo", pz = "jq2zybp", gz = "jq2zybq", vz = "jq2zybr", yz = "jq2zybs", bz = "jq2zybt", xz = "jq2zybu", Sz = "jq2zybv", wz = "jq2zybw", Ez = "jq2zybx", jz = "jq2zyby", Nz = "jq2zybz", G0 = "jq2zyb10", Tz = "jq2zyb11", Cz = "jq2zyb12", Rz = "jq2zyb13", Mz = "jq2zyb14";
const Az = ["cancelled", "failed", "partial"], _z = 2600;
function Dz() {
  const { run: n } = Ts(), a = js(), [i, s] = y.useState(n), [o, u] = y.useState(!1), [h, m] = y.useState(null), [v, p] = y.useState(null), [x, g] = y.useState(
    null
  );
  y.useEffect(() => {
    s(n);
  }, [n]), y.useEffect(() => {
    if (!x) return;
    const _ = setTimeout(() => g(null), _z);
    return () => clearTimeout(_);
  }, [x]);
  const S = y.useMemo(() => kz(i), [i]), E = Az.includes(i.status) && i.kind === "batch", w = (i.exportZipStaleAt ?? null) !== null, N = async () => {
    if (i.deploymentId) {
      u(!0), m(null);
      try {
        const { runId: _ } = await xx(i.deploymentId, i.runId);
        a(`/${i.deploymentId}/runs/${_}`);
      } catch (_) {
        m(Bz(_));
      } finally {
        u(!1);
      }
    }
  }, C = y.useCallback((_) => {
    p((K) => K === _ ? null : _);
  }, []), T = y.useCallback(() => {
    p(null);
  }, []), k = (_, K) => {
    s((ee) => Oz(ee, _, K)), p(null), g({ message: "Segment edited", severity: "success" });
  }, R = y.useCallback((_) => {
    g({ message: _, severity: "error" });
  }, []);
  return /* @__PURE__ */ d.jsxs("main", { className: GD, children: [
    /* @__PURE__ */ d.jsxs("div", { className: XD, children: [
      /* @__PURE__ */ d.jsxs("header", { className: PD, children: [
        /* @__PURE__ */ d.jsxs("p", { className: KD, children: [
          i.deploymentId ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            /* @__PURE__ */ d.jsx(zc, { to: `/${i.deploymentId}/recipe`, className: QD, children: "← Back to recipe" }),
            /* @__PURE__ */ d.jsx("span", { className: ZD, children: "·" })
          ] }) : null,
          /* @__PURE__ */ d.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: JD, children: [
          /* @__PURE__ */ d.jsxs("h1", { className: WD, children: [
            Lz(i.kind),
            /* @__PURE__ */ d.jsx("span", { className: ez, children: i.runId })
          ] }),
          /* @__PURE__ */ d.jsx(xr, { size: "md", tone: Vz(i.status), pulse: i.status === "running", children: i.status })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("section", { className: tz, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ d.jsx(ec, { label: "Format", value: i.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ d.jsx(ec, { label: "Speed", value: `${i.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ d.jsx(
          ec,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ d.jsx(
          ec,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      E && /* @__PURE__ */ d.jsxs("section", { className: sz, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ d.jsxs("div", { className: oz, children: [
          /* @__PURE__ */ d.jsx("h2", { id: "run-detail-resume-title", className: cz, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ d.jsx("p", { className: uz, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ d.jsx(ft, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ d.jsx("p", { className: dz, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ d.jsxs(La, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ d.jsxs(ST, { children: [
          /* @__PURE__ */ d.jsx("h2", { id: "run-detail-utterances", className: Kr, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ d.jsxs("span", { className: fz, children: [
            /* @__PURE__ */ d.jsx("span", { className: hz, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("ul", { className: mz, children: i.utterances.map((_) => {
          const K = v === _.utteranceId, ee = _.status === "completed" && _.audioArtifactRef !== null && _.audioArtifactRef !== void 0, te = _.derivedArtifactRef ?? _.audioArtifactRef ?? null, D = te ? `/api/v1/artifacts/${encodeURIComponent(te)}/download` : "", q = (_.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ d.jsxs("li", { className: gz, children: [
            /* @__PURE__ */ d.jsxs("div", { className: pz, children: [
              /* @__PURE__ */ d.jsxs("span", { className: bz, children: [
                "#",
                _.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ d.jsx("span", { className: xz, title: _.characterDisplay, children: _.characterDisplay }),
              /* @__PURE__ */ d.jsx("span", { className: Sz, title: _.text, children: _.text }),
              /* @__PURE__ */ d.jsxs("span", { className: wz, children: [
                _.cacheHit && /* @__PURE__ */ d.jsx("span", { className: Ez, children: "cached" }),
                q && /* @__PURE__ */ d.jsx("span", { className: vz, children: "edited" }),
                _.durationMs ? /* @__PURE__ */ d.jsx("span", { children: Uz(_.durationMs) }) : null,
                /* @__PURE__ */ d.jsx(xr, { tone: $z(_.status), children: _.status }),
                ee && /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    className: yz,
                    onClick: () => C(_.utteranceId),
                    "aria-expanded": K,
                    "aria-label": K ? "Close segment editor" : "Edit segment",
                    children: K ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            K && D && i.deploymentId && /* @__PURE__ */ d.jsx(
              FD,
              {
                deploymentId: i.deploymentId,
                runId: i.runId,
                utterance: _,
                audioUrl: D,
                onApplied: (F) => k(_.utteranceId, F),
                onError: R,
                onCancel: T
              }
            )
          ] }, _.utteranceId);
        }) })
      ] }),
      zz(i, w)
    ] }),
    x && /* @__PURE__ */ d.jsx(
      "div",
      {
        className: Mz,
        role: x.severity === "error" ? "alert" : "status",
        "aria-live": x.severity === "error" ? "assertive" : "polite",
        children: x.message
      }
    )
  ] });
}
function zz(n, a) {
  if (!n.exportArtifactRef && !a) return null;
  const s = !!n.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ d.jsx("div", { className: jz, children: a ? /* @__PURE__ */ d.jsxs("div", { className: Tz, children: [
    /* @__PURE__ */ d.jsx("p", { className: Cz, children: s }),
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: Rz,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ d.jsx("span", { className: G0, children: "↻" })
        ]
      }
    )
  ] }) : n.exportArtifactRef ? /* @__PURE__ */ d.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
      download: !0,
      className: Nz,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ d.jsx("span", { className: G0, children: "↓" })
      ]
    }
  ) : null });
}
function Oz(n, a, i) {
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
function ec({ label: n, value: a, mono: i, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: nz,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ d.jsx("span", { className: az, children: n }),
        /* @__PURE__ */ d.jsx("span", { className: i ? iz : rz, children: a }),
        o !== void 0 && /* @__PURE__ */ d.jsx("span", { className: lz, "aria-hidden": "true" })
      ]
    }
  );
}
function kz(n) {
  const a = n.utterances.length, i = n.utterances.filter((h) => h.status === "completed").length, s = n.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = n.utterances.filter((h) => h.cacheHit).length, u = i > 0 ? Math.round(o / i * 100) : 0;
  return { total: a, completed: i, failed: s, cached: o, cacheRatio: u };
}
function Lz(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function Uz(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function Bz(n) {
  return n instanceof el ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function Vz(n) {
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
function $z(n) {
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
var Hz = "pcphqj2", qz = "pcphqj3", Iz = "pcphqj4", Fz = "pcphqj5", Yz = "pcphqj6", Gz = "pcphqj7", Xz = "pcphqj8", Pz = "pcphqj9", Kz = "pcphqja", X0 = "pcphqjb", Qz = "pcphqjc", Zz = "pcphqjd", Jz = "pcphqje pcphqjd", Wz = "pcphqjf", e5 = "pcphqjg", t5 = "pcphqjh", n5 = "pcphqji", a5 = "pcphqjj pcphqji", r5 = "pcphqjk pcphqji", i5 = "pcphqjl pcphqji", l5 = "pcphqjm", _f = "pcphqjn", Df = "pcphqjo";
function s5() {
  const [n, a] = y.useState(null), [i, s] = y.useState(null);
  return y.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const m = await ht("/runtime/queue");
        o || (a(m.entries), s(null));
      } catch (m) {
        o || s(m instanceof Error ? m.message : "Unknown error");
      }
    };
    u();
    const h = setInterval(() => void u(), 3e3);
    return () => {
      o = !0, clearInterval(h);
    };
  }, []), /* @__PURE__ */ d.jsx("main", { className: Hz, children: /* @__PURE__ */ d.jsxs("div", { className: qz, children: [
    /* @__PURE__ */ d.jsxs("header", { className: Iz, children: [
      /* @__PURE__ */ d.jsx("p", { className: Fz, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ d.jsxs("div", { className: Yz, children: [
        /* @__PURE__ */ d.jsx("h1", { className: Gz, children: "Queue" }),
        /* @__PURE__ */ d.jsx("span", { className: Xz, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ d.jsx("p", { className: Pz, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    i ? /* @__PURE__ */ d.jsx(zn, { severity: "error", children: i }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ d.jsx(La, { density: "compact", children: /* @__PURE__ */ d.jsx(Cs, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ d.jsxs(La, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ d.jsx("h2", { id: "runtime-queue-section", className: Kr, children: "01 / In flight" }),
      /* @__PURE__ */ d.jsx("ul", { className: Kz, children: n.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ d.jsxs(
          "li",
          {
            className: u ? `${X0} ${Qz}` : X0,
            children: [
              /* @__PURE__ */ d.jsx("span", { className: u ? Jz : Zz, children: o.position }),
              /* @__PURE__ */ d.jsxs("span", { className: Wz, children: [
                /* @__PURE__ */ d.jsx("span", { className: e5, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ d.jsx("span", { className: t5, children: o.runId })
              ] }),
              /* @__PURE__ */ d.jsx("span", { className: o5(o.kind), children: c5(o.kind) }),
              /* @__PURE__ */ d.jsx("span", { className: l5, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: _f, children: u5(o.etaSeconds) }),
                /* @__PURE__ */ d.jsx("span", { className: Df, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: _f, children: o.utteranceTotal }),
                /* @__PURE__ */ d.jsx("span", { className: Df, children: "lines" })
              ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: _f, children: "—" }),
                /* @__PURE__ */ d.jsx("span", { className: Df, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function o5(n) {
  switch (n) {
    case "batch":
      return a5;
    case "test_line":
      return r5;
    case "resume":
      return i5;
    default:
      return n5;
  }
}
function c5(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function u5(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), i = n % 60;
  return i === 0 ? `${a}m` : `${a}m ${i}s`;
}
function d5() {
  const { deploymentId: n, prefillCharacterName: a } = Ts(), i = js(), [s, o] = y.useState(a), [u, h] = y.useState(""), [m, v] = y.useState("none"), [p, x] = y.useState(!1), [g, S] = y.useState(null), E = y.useRef(null);
  y.useEffect(() => {
    E.current?.scrollIntoView({ behavior: "smooth", block: "center" }), E.current?.focus();
  }, []);
  const w = async (N) => {
    N.preventDefault(), x(!0), S(null);
    try {
      await Dh(n, {
        characterName: s,
        speakerVoiceAssetId: u,
        defaultEmotionMode: m
      }), i(`/${n}/recipe`);
    } catch (C) {
      S(C instanceof Error ? C.message : "failed");
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
            value: u,
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
      g && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: g })
    ] })
  ] });
}
const Px = y.createContext({});
function Uh(n) {
  const a = y.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const f5 = typeof window < "u", Kx = f5 ? y.useLayoutEffect : y.useEffect, Lc = /* @__PURE__ */ y.createContext(null);
function h5(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function m5(n, a) {
  const i = n.indexOf(a);
  i > -1 && n.splice(i, 1);
}
const Sr = (n, a, i) => i > a ? a : i < n ? n : i;
function P0(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let Rs = () => {
}, Ji = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Rs = (n, a, i) => {
  !n && typeof console < "u" && console.warn(P0(a, i));
}, Ji = (n, a, i) => {
  if (!n)
    throw new Error(P0(a, i));
});
const wr = {}, Qx = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function p5(n) {
  return typeof n == "object" && n !== null;
}
const Zx = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function Jx(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const tl = /* @__NO_SIDE_EFFECTS__ */ (n) => n, g5 = (n, a) => (i) => a(n(i)), Uc = (...n) => n.reduce(g5), Wx = /* @__NO_SIDE_EFFECTS__ */ (n, a, i) => {
  const s = a - n;
  return s === 0 ? 1 : (i - n) / s;
};
class e1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return h5(this.subscriptions, a), () => m5(this.subscriptions, a);
  }
  notify(a, i, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, i, s);
      else
        for (let u = 0; u < o; u++) {
          const h = this.subscriptions[u];
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
const Xn = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, aa = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function t1(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const n1 = (n, a, i) => (((1 - 3 * i + 3 * a) * n + (3 * i - 6 * a)) * n + 3 * a) * n, v5 = 1e-7, y5 = 12;
function b5(n, a, i, s, o) {
  let u, h, m = 0;
  do
    h = a + (i - a) / 2, u = n1(h, s, o) - n, u > 0 ? i = h : a = h;
  while (Math.abs(u) > v5 && ++m < y5);
  return h;
}
function Ms(n, a, i, s) {
  if (n === a && i === s)
    return tl;
  const o = (u) => b5(u, 0, 1, n, i);
  return (u) => u === 0 || u === 1 ? u : n1(o(u), a, s);
}
const a1 = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, r1 = (n) => (a) => 1 - n(1 - a), i1 = /* @__PURE__ */ Ms(0.33, 1.53, 0.69, 0.99), Bh = /* @__PURE__ */ r1(i1), l1 = /* @__PURE__ */ a1(Bh), s1 = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * Bh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), Vh = (n) => 1 - Math.sin(Math.acos(n)), x5 = r1(Vh), o1 = a1(Vh), S5 = /* @__PURE__ */ Ms(0.42, 0, 1, 1), w5 = /* @__PURE__ */ Ms(0, 0, 0.58, 1), c1 = /* @__PURE__ */ Ms(0.42, 0, 0.58, 1), E5 = (n) => Array.isArray(n) && typeof n[0] != "number", u1 = (n) => Array.isArray(n) && typeof n[0] == "number", K0 = {
  linear: tl,
  easeIn: S5,
  easeInOut: c1,
  easeOut: w5,
  circIn: Vh,
  circInOut: o1,
  circOut: x5,
  backIn: Bh,
  backInOut: l1,
  backOut: i1,
  anticipate: s1
}, j5 = (n) => typeof n == "string", Q0 = (n) => {
  if (u1(n)) {
    Ji(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, i, s, o] = n;
    return Ms(a, i, s, o);
  } else if (j5(n))
    return Ji(K0[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), K0[n];
  return n;
}, tc = [
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
function N5(n, a) {
  let i = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, u = !1;
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
        u = !0;
        return;
      }
      o = !0;
      const g = i;
      i = s, s = g, i.forEach(v), i.clear(), o = !1, u && (u = !1, p.process(x));
    }
  };
  return p;
}
const T5 = 40;
function d1(n, a) {
  let i = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => i = !0, h = tc.reduce((R, _) => (R[_] = N5(u), R), {}), { setup: m, read: v, resolveKeyframes: p, preUpdate: x, update: g, preRender: S, render: E, postRender: w } = h, N = () => {
    const R = wr.useManualTiming, _ = R ? o.timestamp : performance.now();
    i = !1, R || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(_ - o.timestamp, T5), 1)), o.timestamp = _, o.isProcessing = !0, m.process(o), v.process(o), p.process(o), x.process(o), g.process(o), S.process(o), E.process(o), w.process(o), o.isProcessing = !1, i && a && (s = !1, n(N));
  }, C = () => {
    i = !0, s = !0, o.isProcessing || n(N);
  };
  return { schedule: tc.reduce((R, _) => {
    const K = h[_];
    return R[_] = (ee, te = !1, D = !1) => (i || C(), K.schedule(ee, te, D)), R;
  }, {}), cancel: (R) => {
    for (let _ = 0; _ < tc.length; _++)
      h[tc[_]].cancel(R);
  }, state: o, steps: h };
}
const { schedule: Pn, cancel: Qf, state: xc } = /* @__PURE__ */ d1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : tl, !0);
let fc;
function C5() {
  fc = void 0;
}
const Dn = {
  now: () => (fc === void 0 && Dn.set(xc.isProcessing || wr.useManualTiming ? xc.timestamp : performance.now()), fc),
  set: (n) => {
    fc = n, queueMicrotask(C5);
  }
}, f1 = (n) => (a) => typeof a == "string" && a.startsWith(n), h1 = /* @__PURE__ */ f1("--"), R5 = /* @__PURE__ */ f1("var(--"), $h = (n) => R5(n) ? M5.test(n.split("/*")[0].trim()) : !1, M5 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Z0(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const nl = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, bs = {
  ...nl,
  transform: (n) => Sr(0, 1, n)
}, nc = {
  ...nl,
  default: 1
}, ds = (n) => Math.round(n * 1e5) / 1e5, Hh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function A5(n) {
  return n == null;
}
const _5 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, qh = (n, a) => (i) => !!(typeof i == "string" && _5.test(i) && i.startsWith(n) || a && !A5(i) && Object.prototype.hasOwnProperty.call(i, a)), m1 = (n, a, i) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, u, h, m] = s.match(Hh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(u),
    [i]: parseFloat(h),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, D5 = (n) => Sr(0, 255, n), zf = {
  ...nl,
  transform: (n) => Math.round(D5(n))
}, Xr = {
  test: /* @__PURE__ */ qh("rgb", "red"),
  parse: /* @__PURE__ */ m1("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: i, alpha: s = 1 }) => "rgba(" + zf.transform(n) + ", " + zf.transform(a) + ", " + zf.transform(i) + ", " + ds(bs.transform(s)) + ")"
};
function z5(n) {
  let a = "", i = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), i = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), i = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, i += i, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(i, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Zf = {
  test: /* @__PURE__ */ qh("#"),
  parse: z5,
  transform: Xr.transform
}, As = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), pr = /* @__PURE__ */ As("deg"), Ki = /* @__PURE__ */ As("%"), we = /* @__PURE__ */ As("px"), O5 = /* @__PURE__ */ As("vh"), k5 = /* @__PURE__ */ As("vw"), J0 = {
  ...Ki,
  parse: (n) => Ki.parse(n) / 100,
  transform: (n) => Ki.transform(n * 100)
}, Gi = {
  test: /* @__PURE__ */ qh("hsl", "hue"),
  parse: /* @__PURE__ */ m1("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: i, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Ki.transform(ds(a)) + ", " + Ki.transform(ds(i)) + ", " + ds(bs.transform(s)) + ")"
}, Vt = {
  test: (n) => Xr.test(n) || Zf.test(n) || Gi.test(n),
  parse: (n) => Xr.test(n) ? Xr.parse(n) : Gi.test(n) ? Gi.parse(n) : Zf.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Xr.transform(n) : Gi.transform(n),
  getAnimatableNone: (n) => {
    const a = Vt.parse(n);
    return a.alpha = 0, Vt.transform(a);
  }
}, L5 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function U5(n) {
  return isNaN(n) && typeof n == "string" && (n.match(Hh)?.length || 0) + (n.match(L5)?.length || 0) > 0;
}
const p1 = "number", g1 = "color", B5 = "var", V5 = "var(", W0 = "${}", $5 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Wi(n) {
  const a = n.toString(), i = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const m = a.replace($5, (v) => (Vt.test(v) ? (s.color.push(u), o.push(g1), i.push(Vt.parse(v))) : v.startsWith(V5) ? (s.var.push(u), o.push(B5), i.push(v)) : (s.number.push(u), o.push(p1), i.push(parseFloat(v))), ++u, W0)).split(W0);
  return { values: i, split: m, indexes: s, types: o };
}
function H5(n) {
  return Wi(n).values;
}
function v1({ split: n, types: a }) {
  const i = n.length;
  return (s) => {
    let o = "";
    for (let u = 0; u < i; u++)
      if (o += n[u], s[u] !== void 0) {
        const h = a[u];
        h === p1 ? o += ds(s[u]) : h === g1 ? o += Vt.transform(s[u]) : o += s[u];
      }
    return o;
  };
}
function q5(n) {
  return v1(Wi(n));
}
const I5 = (n) => typeof n == "number" ? 0 : Vt.test(n) ? Vt.getAnimatableNone(n) : n, F5 = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : I5(n);
function Y5(n) {
  const a = Wi(n);
  return v1(a)(a.values.map((s, o) => F5(s, a.split[o])));
}
const ra = {
  test: U5,
  parse: H5,
  createTransformer: q5,
  getAnimatableNone: Y5
};
function Of(n, a, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? n + (a - n) * 6 * i : i < 1 / 2 ? a : i < 2 / 3 ? n + (a - n) * (2 / 3 - i) * 6 : n;
}
function G5({ hue: n, saturation: a, lightness: i, alpha: s }) {
  n /= 360, a /= 100, i /= 100;
  let o = 0, u = 0, h = 0;
  if (!a)
    o = u = h = i;
  else {
    const m = i < 0.5 ? i * (1 + a) : i + a - i * a, v = 2 * i - m;
    o = Of(v, m, n + 1 / 3), u = Of(v, m, n), h = Of(v, m, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(u * 255),
    blue: Math.round(h * 255),
    alpha: s
  };
}
function Sc(n, a) {
  return (i) => i > 0 ? a : n;
}
const _s = (n, a, i) => n + (a - n) * i, kf = (n, a, i) => {
  const s = n * n, o = i * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, X5 = [Zf, Xr, Gi], P5 = (n) => X5.find((a) => a.test(n));
function eb(n) {
  const a = P5(n);
  if (Rs(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let i = a.parse(n);
  return a === Gi && (i = G5(i)), i;
}
const tb = (n, a) => {
  const i = eb(n), s = eb(a);
  if (!i || !s)
    return Sc(n, a);
  const o = { ...i };
  return (u) => (o.red = kf(i.red, s.red, u), o.green = kf(i.green, s.green, u), o.blue = kf(i.blue, s.blue, u), o.alpha = _s(i.alpha, s.alpha, u), Xr.transform(o));
}, Jf = /* @__PURE__ */ new Set(["none", "hidden"]);
function K5(n, a) {
  return Jf.has(n) ? (i) => i <= 0 ? n : a : (i) => i >= 1 ? a : n;
}
function Q5(n, a) {
  return (i) => _s(n, a, i);
}
function Ih(n) {
  return typeof n == "number" ? Q5 : typeof n == "string" ? $h(n) ? Sc : Vt.test(n) ? tb : W5 : Array.isArray(n) ? y1 : typeof n == "object" ? Vt.test(n) ? tb : Z5 : Sc;
}
function y1(n, a) {
  const i = [...n], s = i.length, o = n.map((u, h) => Ih(u)(u, a[h]));
  return (u) => {
    for (let h = 0; h < s; h++)
      i[h] = o[h](u);
    return i;
  };
}
function Z5(n, a) {
  const i = { ...n, ...a }, s = {};
  for (const o in i)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = Ih(n[o])(n[o], a[o]));
  return (o) => {
    for (const u in s)
      i[u] = s[u](o);
    return i;
  };
}
function J5(n, a) {
  const i = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], h = n.indexes[u][s[u]], m = n.values[h] ?? 0;
    i[o] = m, s[u]++;
  }
  return i;
}
const W5 = (n, a) => {
  const i = ra.createTransformer(a), s = Wi(n), o = Wi(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Jf.has(n) && !o.values.length || Jf.has(a) && !s.values.length ? K5(n, a) : Uc(y1(J5(s, o), o.values), i) : (Rs(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Sc(n, a));
};
function b1(n, a, i) {
  return typeof n == "number" && typeof a == "number" && typeof i == "number" ? _s(n, a, i) : Ih(n)(n, a);
}
const eO = (n) => {
  const a = ({ timestamp: i }) => n(i);
  return {
    start: (i = !0) => Pn.update(a, i),
    stop: () => Qf(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => xc.isProcessing ? xc.timestamp : Dn.now()
  };
}, x1 = (n, a, i = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / i), 2);
  for (let u = 0; u < o; u++)
    s += Math.round(n(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, wc = 2e4;
function Fh(n) {
  let a = 0;
  const i = 50;
  let s = n.next(a);
  for (; !s.done && a < wc; )
    a += i, s = n.next(a);
  return a >= wc ? 1 / 0 : a;
}
function tO(n, a = 100, i) {
  const s = i({ ...n, keyframes: [0, a] }), o = Math.min(Fh(s), wc);
  return {
    type: "keyframes",
    ease: (u) => s.next(o * u).value / a,
    duration: /* @__PURE__ */ aa(o)
  };
}
const Et = {
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
function Wf(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const nO = 12;
function aO(n, a, i) {
  let s = i;
  for (let o = 1; o < nO; o++)
    s = s - n(s) / a(s);
  return s;
}
const Lf = 1e-3;
function rO({ duration: n = Et.duration, bounce: a = Et.bounce, velocity: i = Et.velocity, mass: s = Et.mass }) {
  let o, u;
  Rs(n <= /* @__PURE__ */ Xn(Et.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = Sr(Et.minDamping, Et.maxDamping, h), n = Sr(Et.minDuration, Et.maxDuration, /* @__PURE__ */ aa(n)), h < 1 ? (o = (p) => {
    const x = p * h, g = x * n, S = x - i, E = Wf(p, h), w = Math.exp(-g);
    return Lf - S / E * w;
  }, u = (p) => {
    const g = p * h * n, S = g * i + i, E = Math.pow(h, 2) * Math.pow(p, 2) * n, w = Math.exp(-g), N = Wf(Math.pow(p, 2), h);
    return (-o(p) + Lf > 0 ? -1 : 1) * ((S - E) * w) / N;
  }) : (o = (p) => {
    const x = Math.exp(-p * n), g = (p - i) * n + 1;
    return -Lf + x * g;
  }, u = (p) => {
    const x = Math.exp(-p * n), g = (i - p) * (n * n);
    return x * g;
  });
  const m = 5 / n, v = aO(o, u, m);
  if (n = /* @__PURE__ */ Xn(n), isNaN(v))
    return {
      stiffness: Et.stiffness,
      damping: Et.damping,
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
const iO = ["duration", "bounce"], lO = ["stiffness", "damping", "mass"];
function nb(n, a) {
  return a.some((i) => n[i] !== void 0);
}
function sO(n) {
  let a = {
    velocity: Et.velocity,
    stiffness: Et.stiffness,
    damping: Et.damping,
    mass: Et.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!nb(n, lO) && nb(n, iO))
    if (a.velocity = 0, n.visualDuration) {
      const i = n.visualDuration, s = 2 * Math.PI / (i * 1.2), o = s * s, u = 2 * Sr(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: Et.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const i = rO({ ...n, velocity: 0 });
      a = {
        ...a,
        ...i,
        mass: Et.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Ec(n = Et.visualDuration, a = Et.bounce) {
  const i = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = i;
  const u = i.keyframes[0], h = i.keyframes[i.keyframes.length - 1], m = { done: !1, value: u }, { stiffness: v, damping: p, mass: x, duration: g, velocity: S, isResolvedFromDuration: E } = sO({
    ...i,
    velocity: -/* @__PURE__ */ aa(i.velocity || 0)
  }), w = S || 0, N = p / (2 * Math.sqrt(v * x)), C = h - u, T = /* @__PURE__ */ aa(Math.sqrt(v / x)), k = Math.abs(C) < 5;
  s || (s = k ? Et.restSpeed.granular : Et.restSpeed.default), o || (o = k ? Et.restDelta.granular : Et.restDelta.default);
  let R, _, K, ee, te, D;
  if (N < 1)
    K = Wf(T, N), ee = (w + N * T * C) / K, R = (F) => {
      const oe = Math.exp(-N * T * F);
      return h - oe * (ee * Math.sin(K * F) + C * Math.cos(K * F));
    }, te = N * T * ee + C * K, D = N * T * C - ee * K, _ = (F) => Math.exp(-N * T * F) * (te * Math.sin(K * F) + D * Math.cos(K * F));
  else if (N === 1) {
    R = (oe) => h - Math.exp(-T * oe) * (C + (w + T * C) * oe);
    const F = w + T * C;
    _ = (oe) => Math.exp(-T * oe) * (T * F * oe - w);
  } else {
    const F = T * Math.sqrt(N * N - 1);
    R = (ne) => {
      const Q = Math.exp(-N * T * ne), O = Math.min(F * ne, 300);
      return h - Q * ((w + N * T * C) * Math.sinh(O) + F * C * Math.cosh(O)) / F;
    };
    const oe = (w + N * T * C) / F, ie = N * T * oe - C * F, U = N * T * C - oe * F;
    _ = (ne) => {
      const Q = Math.exp(-N * T * ne), O = Math.min(F * ne, 300);
      return Q * (ie * Math.sinh(O) + U * Math.cosh(O));
    };
  }
  const q = {
    calculatedDuration: E && g || null,
    velocity: (F) => /* @__PURE__ */ Xn(_(F)),
    next: (F) => {
      if (!E && N < 1) {
        const ie = Math.exp(-N * T * F), U = Math.sin(K * F), ne = Math.cos(K * F), Q = h - ie * (ee * U + C * ne), O = /* @__PURE__ */ Xn(ie * (te * U + D * ne));
        return m.done = Math.abs(O) <= s && Math.abs(h - Q) <= o, m.value = m.done ? h : Q, m;
      }
      const oe = R(F);
      if (E)
        m.done = F >= g;
      else {
        const ie = /* @__PURE__ */ Xn(_(F));
        m.done = Math.abs(ie) <= s && Math.abs(h - oe) <= o;
      }
      return m.value = m.done ? h : oe, m;
    },
    toString: () => {
      const F = Math.min(Fh(q), wc), oe = x1((ie) => q.next(F * ie).value, F, 30);
      return F + "ms " + oe;
    },
    toTransition: () => {
    }
  };
  return q;
}
Ec.applyToOptions = (n) => {
  const a = tO(n, 100, Ec);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ Xn(a.duration), n.type = "keyframes", n;
};
const oO = 5;
function S1(n, a, i) {
  const s = Math.max(a - oO, 0);
  return t1(i - n(s), a - s);
}
function eh({ keyframes: n, velocity: a = 0, power: i = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: h, min: m, max: v, restDelta: p = 0.5, restSpeed: x }) {
  const g = n[0], S = {
    done: !1,
    value: g
  }, E = (D) => m !== void 0 && D < m || v !== void 0 && D > v, w = (D) => m === void 0 ? v : v === void 0 || Math.abs(m - D) < Math.abs(v - D) ? m : v;
  let N = i * a;
  const C = g + N, T = h === void 0 ? C : h(C);
  T !== C && (N = T - g);
  const k = (D) => -N * Math.exp(-D / s), R = (D) => T + k(D), _ = (D) => {
    const q = k(D), F = R(D);
    S.done = Math.abs(q) <= p, S.value = S.done ? T : F;
  };
  let K, ee;
  const te = (D) => {
    E(S.value) && (K = D, ee = Ec({
      keyframes: [S.value, w(S.value)],
      velocity: S1(R, D, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: p,
      restSpeed: x
    }));
  };
  return te(0), {
    calculatedDuration: null,
    next: (D) => {
      let q = !1;
      return !ee && K === void 0 && (q = !0, _(D), te(D)), K !== void 0 && D >= K ? ee.next(D - K) : (!q && _(D), S);
    }
  };
}
function cO(n, a, i) {
  const s = [], o = i || wr.mix || b1, u = n.length - 1;
  for (let h = 0; h < u; h++) {
    let m = o(n[h], n[h + 1]);
    if (a) {
      const v = Array.isArray(a) ? a[h] || tl : a;
      m = Uc(v, m);
    }
    s.push(m);
  }
  return s;
}
function uO(n, a, { clamp: i = !0, ease: s, mixer: o } = {}) {
  const u = n.length;
  if (Ji(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const h = n[0] === n[1];
  n[0] > n[u - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const m = cO(a, s, o), v = m.length, p = (x) => {
    if (h && x < n[0])
      return a[0];
    let g = 0;
    if (v > 1)
      for (; g < n.length - 2 && !(x < n[g + 1]); g++)
        ;
    const S = /* @__PURE__ */ Wx(n[g], n[g + 1], x);
    return m[g](S);
  };
  return i ? (x) => p(Sr(n[0], n[u - 1], x)) : p;
}
function dO(n, a) {
  const i = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ Wx(0, a, s);
    n.push(_s(i, 1, o));
  }
}
function fO(n) {
  const a = [0];
  return dO(a, n.length - 1), a;
}
function hO(n, a) {
  return n.map((i) => i * a);
}
function mO(n, a) {
  return n.map(() => a || c1).splice(0, n.length - 1);
}
function fs({ duration: n = 300, keyframes: a, times: i, ease: s = "easeInOut" }) {
  const o = E5(s) ? s.map(Q0) : Q0(s), u = {
    done: !1,
    value: a[0]
  }, h = hO(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === a.length ? i : fO(a),
    n
  ), m = uO(h, a, {
    ease: Array.isArray(o) ? o : mO(a, o)
  });
  return {
    calculatedDuration: n,
    next: (v) => (u.value = m(v), u.done = v >= n, u)
  };
}
const pO = (n) => n !== null;
function Bc(n, { repeat: a, repeatType: i = "loop" }, s, o = 1) {
  const u = n.filter(pO), m = o < 0 || a && i !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !m || s === void 0 ? u[m] : s;
}
const gO = {
  decay: eh,
  inertia: eh,
  tween: fs,
  keyframes: fs,
  spring: Ec
};
function w1(n) {
  typeof n.type == "string" && (n.type = gO[n.type]);
}
class Yh {
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
const vO = (n) => n / 100;
class jc extends Yh {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: i } = this.options;
      i && i.updatedAt !== Dn.now() && this.tick(Dn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    w1(a);
    const { type: i = fs, repeat: s = 0, repeatDelay: o = 0, repeatType: u, velocity: h = 0 } = a;
    let { keyframes: m } = a;
    const v = i || fs;
    v !== fs && typeof m[0] != "number" && (this.mixKeyframes = Uc(vO, b1(m[0], m[1])), m = [0, 100]);
    const p = v({ ...a, keyframes: m });
    u === "mirror" && (this.mirroredGenerator = v({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -h
    })), p.calculatedDuration === null && (p.calculatedDuration = Fh(p));
    const { calculatedDuration: x } = p;
    this.calculatedDuration = x, this.resolvedDuration = x + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const i = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = i;
  }
  tick(a, i = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: u, mirroredGenerator: h, resolvedDuration: m, calculatedDuration: v } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: p = 0, keyframes: x, repeat: g, repeatType: S, repeatDelay: E, type: w, onUpdate: N, finalKeyframe: C } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), i ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), k = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let R = this.currentTime, _ = s;
    if (g) {
      const D = Math.min(this.currentTime, o) / m;
      let q = Math.floor(D), F = D % 1;
      !F && D >= 1 && (F = 1), F === 1 && q--, q = Math.min(q, g + 1), !!(q % 2) && (S === "reverse" ? (F = 1 - F, E && (F -= E / m)) : S === "mirror" && (_ = h)), R = Sr(0, 1, F) * m;
    }
    let K;
    k ? (this.delayState.value = x[0], K = this.delayState) : K = _.next(R), u && !k && (K.value = u(K.value));
    let { done: ee } = K;
    !k && v !== null && (ee = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const te = this.holdTime === null && (this.state === "finished" || this.state === "running" && ee);
    return te && w !== eh && (K.value = Bc(x, this.options, C, this.speed)), N && N(K.value), te && this.finish(), K;
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
    return /* @__PURE__ */ aa(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ aa(a);
  }
  get time() {
    return /* @__PURE__ */ aa(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ Xn(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    return S1((s) => this.generator.next(s).value, a, i);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const i = this.playbackSpeed !== a;
    i && this.driver && this.updateTime(Dn.now()), this.playbackSpeed = a, i && this.driver && (this.time = /* @__PURE__ */ aa(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = eO, startTime: i } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = i ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Dn.now()), this.holdTime = this.currentTime;
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
function yO(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Pr = (n) => n * 180 / Math.PI, th = (n) => {
  const a = Pr(Math.atan2(n[1], n[0]));
  return nh(a);
}, bO = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: th,
  rotateZ: th,
  skewX: (n) => Pr(Math.atan(n[1])),
  skewY: (n) => Pr(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, nh = (n) => (n = n % 360, n < 0 && (n += 360), n), ab = th, rb = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), ib = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), xO = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: rb,
  scaleY: ib,
  scale: (n) => (rb(n) + ib(n)) / 2,
  rotateX: (n) => nh(Pr(Math.atan2(n[6], n[5]))),
  rotateY: (n) => nh(Pr(Math.atan2(-n[2], n[0]))),
  rotateZ: ab,
  rotate: ab,
  skewX: (n) => Pr(Math.atan(n[4])),
  skewY: (n) => Pr(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function ah(n) {
  return n.includes("scale") ? 1 : 0;
}
function rh(n, a) {
  if (!n || n === "none")
    return ah(a);
  const i = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (i)
    s = xO, o = i;
  else {
    const m = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = bO, o = m;
  }
  if (!o)
    return ah(a);
  const u = s[a], h = o[1].split(",").map(wO);
  return typeof u == "function" ? u(h) : h[u];
}
const SO = (n, a) => {
  const { transform: i = "none" } = getComputedStyle(n);
  return rh(i, a);
};
function wO(n) {
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
], rl = new Set(al), lb = (n) => n === nl || n === we, EO = /* @__PURE__ */ new Set(["x", "y", "z"]), jO = al.filter((n) => !EO.has(n));
function NO(n) {
  const a = [];
  return jO.forEach((i) => {
    const s = n.getValue(i);
    s !== void 0 && (a.push([i, s.get()]), s.set(i.startsWith("scale") ? 1 : 0));
  }), a;
}
const br = {
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
  x: (n, { transform: a }) => rh(a, "x"),
  y: (n, { transform: a }) => rh(a, "y")
};
br.translateX = br.x;
br.translateY = br.y;
const Qr = /* @__PURE__ */ new Set();
let ih = !1, lh = !1, sh = !1;
function E1() {
  if (lh) {
    const n = Array.from(Qr).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), i = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = NO(s);
      o.length && (i.set(s, o), s.render());
    }), n.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = i.get(s);
      o && o.forEach(([u, h]) => {
        s.getValue(u)?.set(h);
      });
    }), n.forEach((s) => s.measureEndState()), n.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  lh = !1, ih = !1, Qr.forEach((n) => n.complete(sh)), Qr.clear();
}
function j1() {
  Qr.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (lh = !0);
  });
}
function TO() {
  sh = !0, j1(), E1(), sh = !1;
}
class Gh {
  constructor(a, i, s, o, u, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = i, this.name = s, this.motionValue = o, this.element = u, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Qr.add(this), ih || (ih = !0, Pn.read(j1), Pn.resolveKeyframes(E1))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: i, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const u = o?.get(), h = a[a.length - 1];
      if (u !== void 0)
        a[0] = u;
      else if (s && i) {
        const m = s.readValue(i, h);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = h), o && u === void 0 && o.set(a[0]);
    }
    yO(a);
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
const CO = (n) => n.startsWith("--");
function N1(n, a, i) {
  CO(a) ? n.style.setProperty(a, i) : n.style[a] = i;
}
const RO = {};
function T1(n, a) {
  const i = /* @__PURE__ */ Jx(n);
  return () => RO[a] ?? i();
}
const MO = /* @__PURE__ */ T1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), C1 = /* @__PURE__ */ T1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), os = ([n, a, i, s]) => `cubic-bezier(${n}, ${a}, ${i}, ${s})`, sb = {
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
function R1(n, a) {
  if (n)
    return typeof n == "function" ? C1() ? x1(n, a) : "ease-out" : u1(n) ? os(n) : Array.isArray(n) ? n.map((i) => R1(i, a) || sb.easeOut) : sb[n];
}
function AO(n, a, i, { delay: s = 0, duration: o = 300, repeat: u = 0, repeatType: h = "loop", ease: m = "easeOut", times: v } = {}, p = void 0) {
  const x = {
    [a]: i
  };
  v && (x.offset = v);
  const g = R1(m, o);
  Array.isArray(g) && (x.easing = g);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(g) ? "linear" : g,
    fill: "both",
    iterations: u + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return p && (S.pseudoElement = p), n.animate(x, S);
}
function M1(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function _O({ type: n, ...a }) {
  return M1(n) && C1() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class A1 extends Yh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: i, name: s, keyframes: o, pseudoElement: u, allowFlatten: h = !1, finalKeyframe: m, onComplete: v } = a;
    this.isPseudoElement = !!u, this.allowFlatten = h, this.options = a, Ji(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = _O(a);
    this.animation = AO(i, s, o, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const x = Bc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(x), N1(i, s, x), this.animation.cancel();
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
    return /* @__PURE__ */ aa(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ aa(a);
  }
  get time() {
    return /* @__PURE__ */ aa(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const i = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Xn(a), i && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && MO() ? (this.animation.timeline = a, i && (this.animation.rangeStart = i), s && (this.animation.rangeEnd = s), tl) : o(this);
  }
}
const _1 = {
  anticipate: s1,
  backInOut: l1,
  circInOut: o1
};
function DO(n) {
  return n in _1;
}
function zO(n) {
  typeof n.ease == "string" && DO(n.ease) && (n.ease = _1[n.ease]);
}
const Uf = 10;
class OO extends A1 {
  constructor(a) {
    zO(a), w1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: i, onUpdate: s, onComplete: o, element: u, ...h } = this.options;
    if (!i)
      return;
    if (a !== void 0) {
      i.set(a);
      return;
    }
    const m = new jc({
      ...h,
      autoplay: !1
    }), v = Math.max(Uf, Dn.now() - this.startTime), p = Sr(0, Uf, v - Uf), x = m.sample(v).value, { name: g } = this.options;
    u && g && N1(u, g, x), i.setWithVelocity(m.sample(Math.max(0, v - p)).value, x, p), m.stop();
  }
}
const ob = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(ra.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function kO(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let i = 0; i < n.length; i++)
    if (n[i] !== a)
      return !0;
}
function LO(n, a, i, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = n[n.length - 1], h = ob(o, a), m = ob(u, a);
  return Rs(h === m, `You are trying to animate ${a} from "${o}" to "${u}". "${h ? u : o}" is not an animatable value.`, "value-not-animatable"), !h || !m ? !1 : kO(n) || (i === "spring" || M1(i)) && s;
}
function oh(n) {
  n.duration = 0, n.type = "keyframes";
}
const D1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), UO = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function BO(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && UO.test(n[a]))
      return !0;
  return !1;
}
const VO = /* @__PURE__ */ new Set([
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
]), $O = /* @__PURE__ */ Jx(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function HO(n) {
  const { motionValue: a, name: i, repeatDelay: s, repeatType: o, damping: u, type: h, keyframes: m } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: x } = a.owner.getProps();
  return $O() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (D1.has(i) || VO.has(i) && BO(m)) && (i !== "transform" || !x) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !s && o !== "mirror" && u !== 0 && h !== "inertia";
}
const qO = 40;
class IO extends Yh {
  constructor({ autoplay: a = !0, delay: i = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: h = "loop", keyframes: m, name: v, motionValue: p, element: x, ...g }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Dn.now();
    const S = {
      autoplay: a,
      delay: i,
      type: s,
      repeat: o,
      repeatDelay: u,
      repeatType: h,
      name: v,
      motionValue: p,
      element: x,
      ...g
    }, E = x?.KeyframeResolver || Gh;
    this.keyframeResolver = new E(m, (w, N, C) => this.onKeyframesResolved(w, N, S, !C), v, p, x), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, i, s, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: h, velocity: m, delay: v, isHandoff: p, onUpdate: x } = s;
    this.resolvedAt = Dn.now();
    let g = !0;
    LO(a, u, h, m) || (g = !1, (wr.instantAnimations || !v) && x?.(Bc(a, s, i)), a[0] = a[a.length - 1], oh(s), s.repeat = 0);
    const E = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > qO ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...s,
      keyframes: a
    }, w = g && !p && HO(E), N = E.motionValue?.owner?.current;
    let C;
    if (w)
      try {
        C = new OO({
          ...E,
          element: N
        });
      } catch {
        C = new jc(E);
      }
    else
      C = new jc(E);
    C.finished.then(() => {
      this.notifyFinished();
    }).catch(tl), this.pendingTimeline && (this.stopTimeline = C.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = C;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, i) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), TO()), this._animation;
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
function z1(n, a, i, s = 0, o = 1) {
  const u = Array.from(n).sort((p, x) => p.sortNodePosition(x)).indexOf(a), h = n.size, m = (h - 1) * s;
  return typeof i == "function" ? i(u, h) : o === 1 ? u * s : m - u * s;
}
const FO = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function YO(n) {
  const a = FO.exec(n);
  if (!a)
    return [,];
  const [, i, s, o] = a;
  return [`--${i ?? s}`, o];
}
const GO = 4;
function O1(n, a, i = 1) {
  Ji(i <= GO, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = YO(n);
  if (!s)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(s);
  if (u) {
    const h = u.trim();
    return Qx(h) ? parseFloat(h) : h;
  }
  return $h(o) ? O1(o, a, i + 1) : o;
}
const XO = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, PO = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), KO = {
  type: "keyframes",
  duration: 0.8
}, QO = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, ZO = (n, { keyframes: a }) => a.length > 2 ? KO : rl.has(n) ? n.startsWith("scale") ? PO(a[1]) : XO : QO;
function k1(n, a) {
  if (n?.inherit && a) {
    const { inherit: i, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function L1(n, a) {
  const i = n?.[a] ?? n?.default ?? n;
  return i !== n ? k1(i, n) : i;
}
const JO = /* @__PURE__ */ new Set([
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
function WO(n) {
  for (const a in n)
    if (!JO.has(a))
      return !0;
  return !1;
}
const e4 = (n, a, i, s = {}, o, u) => (h) => {
  const m = L1(s, n) || {}, v = m.delay || s.delay || 0;
  let { elapsed: p = 0 } = s;
  p = p - /* @__PURE__ */ Xn(v);
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
    element: u ? void 0 : o
  };
  WO(m) || Object.assign(x, ZO(n, x)), x.duration && (x.duration = /* @__PURE__ */ Xn(x.duration)), x.repeatDelay && (x.repeatDelay = /* @__PURE__ */ Xn(x.repeatDelay)), x.from !== void 0 && (x.keyframes[0] = x.from);
  let g = !1;
  if ((x.type === !1 || x.duration === 0 && !x.repeatDelay) && (oh(x), x.delay === 0 && (g = !0)), (wr.instantAnimations || wr.skipAnimations || o?.shouldSkipAnimations) && (g = !0, oh(x), x.delay = 0), x.allowFlatten = !m.type && !m.ease, g && !u && a.get() !== void 0) {
    const S = Bc(x.keyframes, m);
    if (S !== void 0) {
      Pn.update(() => {
        x.onUpdate(S), x.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new jc(x) : new IO(x);
};
function cb(n) {
  const a = [{}, {}];
  return n?.values.forEach((i, s) => {
    a[0][s] = i.get(), a[1][s] = i.getVelocity();
  }), a;
}
function Xh(n, a, i, s) {
  if (typeof a == "function") {
    const [o, u] = cb(s);
    a = a(i !== void 0 ? i : n.custom, o, u);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, u] = cb(s);
    a = a(i !== void 0 ? i : n.custom, o, u);
  }
  return a;
}
function Zr(n, a, i) {
  const s = n.getProps();
  return Xh(s, a, i !== void 0 ? i : s.custom, n);
}
const U1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...al
]), ub = 30, t4 = (n) => !isNaN(parseFloat(n));
class n4 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, i = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = Dn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const u of this.dependents)
          u.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = i.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Dn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = t4(this.current));
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
    this.events[a] || (this.events[a] = new e1());
    const s = this.events[a].add(i);
    return a === "change" ? () => {
      s(), Pn.read(() => {
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
    const a = Dn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > ub)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, ub);
    return t1(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
function Nc(n, a) {
  return new n4(n, a);
}
const ch = (n) => Array.isArray(n);
function a4(n, a, i) {
  n.hasValue(a) ? n.getValue(a).set(i) : n.addValue(a, Nc(i));
}
function r4(n) {
  return ch(n) ? n[n.length - 1] || 0 : n;
}
function i4(n, a) {
  const i = Zr(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...u } = i || {};
  u = { ...u, ...s };
  for (const h in u) {
    const m = r4(u[h]);
    a4(n, h, m);
  }
}
const un = (n) => !!(n && n.getVelocity);
function l4(n) {
  return !!(un(n) && n.add);
}
function s4(n, a) {
  const i = n.getValue("willChange");
  if (l4(i))
    return i.add(a);
  if (!i && wr.WillChange) {
    const s = new wr.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Ph(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const o4 = "framerAppearId", B1 = "data-" + Ph(o4);
function c4(n) {
  return n.props[B1];
}
function u4({ protectedKeys: n, needsAnimating: a }, i) {
  const s = n.hasOwnProperty(i) && a[i] !== !0;
  return a[i] = !1, s;
}
function V1(n, a, { delay: i = 0, transitionOverride: s, type: o } = {}) {
  let { transition: u, transitionEnd: h, ...m } = a;
  const v = n.getDefaultTransition();
  u = u ? k1(u, v) : v;
  const p = u?.reduceMotion;
  s && (u = s);
  const x = [], g = o && n.animationState && n.animationState.getState()[o];
  for (const S in m) {
    const E = n.getValue(S, n.latestValues[S] ?? null), w = m[S];
    if (w === void 0 || g && u4(g, S))
      continue;
    const N = {
      delay: i,
      ...L1(u || {}, S)
    }, C = E.get();
    if (C !== void 0 && !E.isAnimating() && !Array.isArray(w) && w === C && !N.velocity) {
      Pn.update(() => E.set(w));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const _ = c4(n);
      if (_) {
        const K = window.MotionHandoffAnimation(_, S, Pn);
        K !== null && (N.startTime = K, T = !0);
      }
    }
    s4(n, S);
    const k = p ?? n.shouldReduceMotion;
    E.start(e4(S, E, w, k && U1.has(S) ? { type: !1 } : N, n, T));
    const R = E.animation;
    R && x.push(R);
  }
  if (h) {
    const S = () => Pn.update(() => {
      h && i4(n, h);
    });
    x.length ? Promise.all(x).then(S) : S();
  }
  return x;
}
function uh(n, a, i = {}) {
  const s = Zr(n, a, i.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  i.transitionOverride && (o = i.transitionOverride);
  const u = s ? () => Promise.all(V1(n, s, i)) : () => Promise.resolve(), h = n.variantChildren && n.variantChildren.size ? (v = 0) => {
    const { delayChildren: p = 0, staggerChildren: x, staggerDirection: g } = o;
    return d4(n, a, v, p, x, g, i);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [v, p] = m === "beforeChildren" ? [u, h] : [h, u];
    return v().then(() => p());
  } else
    return Promise.all([u(), h(i.delay)]);
}
function d4(n, a, i = 0, s = 0, o = 0, u = 1, h) {
  const m = [];
  for (const v of n.variantChildren)
    v.notify("AnimationStart", a), m.push(uh(v, a, {
      ...h,
      delay: i + (typeof s == "function" ? 0 : s) + z1(n.variantChildren, v, s, o, u)
    }).then(() => v.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function f4(n, a, i = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((u) => uh(n, u, i));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = uh(n, a, i);
  else {
    const o = typeof a == "function" ? Zr(n, a, i.custom) : a;
    s = Promise.all(V1(n, o, i));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const h4 = {
  test: (n) => n === "auto",
  parse: (n) => n
}, $1 = (n) => (a) => a.test(n), H1 = [nl, we, Ki, pr, k5, O5, h4], db = (n) => H1.find($1(n));
function m4(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || Zx(n) : !0;
}
const p4 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function g4(n) {
  const [a, i] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = i.match(Hh) || [];
  if (!s)
    return n;
  const o = i.replace(s, "");
  let u = p4.has(a) ? 1 : 0;
  return s !== i && (u *= 100), a + "(" + u + o + ")";
}
const v4 = /\b([a-z-]*)\(.*?\)/gu, dh = {
  ...ra,
  getAnimatableNone: (n) => {
    const a = n.match(v4);
    return a ? a.map(g4).join(" ") : n;
  }
}, fh = {
  ...ra,
  getAnimatableNone: (n) => {
    const a = ra.parse(n);
    return ra.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, fb = {
  ...nl,
  transform: Math.round
}, y4 = {
  rotate: pr,
  rotateX: pr,
  rotateY: pr,
  rotateZ: pr,
  scale: nc,
  scaleX: nc,
  scaleY: nc,
  scaleZ: nc,
  skew: pr,
  skewX: pr,
  skewY: pr,
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
  originX: J0,
  originY: J0,
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
  ...y4,
  zIndex: fb,
  // SVG
  fillOpacity: bs,
  strokeOpacity: bs,
  numOctaves: fb
}, b4 = {
  ...Kh,
  // Color props
  color: Vt,
  backgroundColor: Vt,
  outlineColor: Vt,
  fill: Vt,
  stroke: Vt,
  // Border props
  borderColor: Vt,
  borderTopColor: Vt,
  borderRightColor: Vt,
  borderBottomColor: Vt,
  borderLeftColor: Vt,
  filter: dh,
  WebkitFilter: dh,
  mask: fh,
  WebkitMask: fh
}, q1 = (n) => b4[n], x4 = /* @__PURE__ */ new Set([dh, fh]);
function I1(n, a) {
  let i = q1(n);
  return x4.has(i) || (i = ra), i.getAnimatableNone ? i.getAnimatableNone(a) : void 0;
}
const S4 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function w4(n, a, i) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const u = n[s];
    typeof u == "string" && !S4.has(u) && Wi(u).values.length && (o = n[s]), s++;
  }
  if (o && i)
    for (const u of a)
      n[u] = I1(i, o);
}
class E4 extends Gh {
  constructor(a, i, s, o, u) {
    super(a, i, s, o, u, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: i, name: s } = this;
    if (!i || !i.current)
      return;
    super.readKeyframes();
    for (let x = 0; x < a.length; x++) {
      let g = a[x];
      if (typeof g == "string" && (g = g.trim(), $h(g))) {
        const S = O1(g, i.current);
        S !== void 0 && (a[x] = S), x === a.length - 1 && (this.finalKeyframe = g);
      }
    }
    if (this.resolveNoneKeyframes(), !U1.has(s) || a.length !== 2)
      return;
    const [o, u] = a, h = db(o), m = db(u), v = Z0(o), p = Z0(u);
    if (v !== p && br[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== m)
      if (lb(h) && lb(m))
        for (let x = 0; x < a.length; x++) {
          const g = a[x];
          typeof g == "string" && (a[x] = parseFloat(g));
        }
      else br[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: i } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || m4(a[o])) && s.push(o);
    s.length && w4(a, s, i);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: i, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = br[s](a.measureViewportBox(), window.getComputedStyle(a.current)), i[0] = this.measuredOrigin;
    const o = i[i.length - 1];
    o !== void 0 && a.getValue(s, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: i, unresolvedKeyframes: s } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(i);
    o && o.jump(this.measuredOrigin, !1);
    const u = s.length - 1, h = s[u];
    s[u] = br[i](a.measureViewportBox(), window.getComputedStyle(a.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([m, v]) => {
      a.getValue(m).set(v);
    }), this.resolveNoneKeyframes();
  }
}
function j4(n, a, i) {
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
const F1 = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function hc(n) {
  return p5(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: N4 } = /* @__PURE__ */ d1(queueMicrotask, !1), T4 = {
  y: !1
};
function C4() {
  return T4.y;
}
function Y1(n, a) {
  const i = j4(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [i, o, () => s.abort()];
}
function R4(n) {
  return !(n.pointerType === "touch" || C4());
}
function M4(n, a, i = {}) {
  const [s, o, u] = Y1(n, i);
  return s.forEach((h) => {
    let m = !1, v = !1, p;
    const x = () => {
      h.removeEventListener("pointerleave", w);
    }, g = (C) => {
      p && (p(C), p = void 0), x();
    }, S = (C) => {
      m = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), v && (v = !1, g(C));
    }, E = () => {
      m = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, w = (C) => {
      if (C.pointerType !== "touch") {
        if (m) {
          v = !0;
          return;
        }
        g(C);
      }
    }, N = (C) => {
      if (!R4(C))
        return;
      v = !1;
      const T = a(h, C);
      typeof T == "function" && (p = T, h.addEventListener("pointerleave", w, o));
    };
    h.addEventListener("pointerenter", N, o), h.addEventListener("pointerdown", E, o);
  }), u;
}
const G1 = (n, a) => a ? n === a ? !0 : G1(n, a.parentElement) : !1, A4 = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, _4 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function D4(n) {
  return _4.has(n.tagName) || n.isContentEditable === !0;
}
const mc = /* @__PURE__ */ new WeakSet();
function hb(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function Bf(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const z4 = (n, a) => {
  const i = n.currentTarget;
  if (!i)
    return;
  const s = hb(() => {
    if (mc.has(i))
      return;
    Bf(i, "down");
    const o = hb(() => {
      Bf(i, "up");
    }), u = () => Bf(i, "cancel");
    i.addEventListener("keyup", o, a), i.addEventListener("blur", u, a);
  });
  i.addEventListener("keydown", s, a), i.addEventListener("blur", () => i.removeEventListener("keydown", s), a);
};
function mb(n) {
  return A4(n) && !0;
}
const pb = /* @__PURE__ */ new WeakSet();
function O4(n, a, i = {}) {
  const [s, o, u] = Y1(n, i), h = (m) => {
    const v = m.currentTarget;
    if (!mb(m) || pb.has(m))
      return;
    mc.add(v), i.stopPropagation && pb.add(m);
    const p = a(v, m), x = (E, w) => {
      window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", S), mc.has(v) && mc.delete(v), mb(E) && typeof p == "function" && p(E, { success: w });
    }, g = (E) => {
      x(E, v === window || v === document || i.useGlobalTarget || G1(v, E.target));
    }, S = (E) => {
      x(E, !1);
    };
    window.addEventListener("pointerup", g, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((m) => {
    (i.useGlobalTarget ? window : m).addEventListener("pointerdown", h, o), hc(m) && (m.addEventListener("focus", (p) => z4(p, o)), !D4(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), u;
}
const k4 = [...H1, Vt, ra], L4 = (n) => k4.find($1(n)), gb = () => ({ min: 0, max: 0 }), X1 = () => ({
  x: gb(),
  y: gb()
}), U4 = /* @__PURE__ */ new WeakMap();
function Vc(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function xs(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Qh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Zh = ["initial", ...Qh];
function $c(n) {
  return Vc(n.animate) || Zh.some((a) => xs(n[a]));
}
function P1(n) {
  return !!($c(n) || n.variants);
}
function B4(n, a, i) {
  for (const s in a) {
    const o = a[s], u = i[s];
    if (un(o))
      n.addValue(s, o);
    else if (un(u))
      n.addValue(s, Nc(o, { owner: n }));
    else if (u !== o)
      if (n.hasValue(s)) {
        const h = n.getValue(s);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = n.getStaticValue(s);
        n.addValue(s, Nc(h !== void 0 ? h : o, { owner: n }));
      }
  }
  for (const s in i)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const hh = { current: null }, K1 = { current: !1 }, V4 = typeof window < "u";
function $4() {
  if (K1.current = !0, !!V4)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => hh.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      hh.current = !1;
}
const vb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Tc = {};
function Q1(n) {
  Tc = n;
}
function H4() {
  return Tc;
}
class q4 {
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
  constructor({ parent: a, props: i, presenceContext: s, reducedMotionConfig: o, skipAnimations: u, blockInitialAnimation: h, visualState: m }, v = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Gh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const E = Dn.now();
      this.renderScheduledAt < E && (this.renderScheduledAt = E, Pn.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: x } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = i.initial ? { ...p } : {}, this.renderState = x, this.parent = a, this.props = i, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = v, this.blockInitialAnimation = !!h, this.isControllingVariants = $c(i), this.isVariantNode = P1(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: g, ...S } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const E in S) {
      const w = S[E];
      p[E] !== void 0 && un(w) && w.set(p[E]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        this.values.get(i)?.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = a, U4.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, s) => this.bindToMotionValue(s, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (K1.current || $4(), this.shouldReduceMotion = hh.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Qf(this.notifyUpdate), Qf(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), i.accelerate && D1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: m, times: v, ease: p, duration: x } = i.accelerate, g = new A1({
        element: this.current,
        name: a,
        keyframes: m,
        times: v,
        ease: p,
        duration: /* @__PURE__ */ Xn(x)
      }), S = h(g);
      this.valueSubscriptions.set(a, () => {
        S(), g.cancel();
      });
      return;
    }
    const s = rl.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = i.on("change", (h) => {
      this.latestValues[a] = h, this.props.onUpdate && Pn.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let u;
    typeof window < "u" && window.MotionCheckAppearSync && (u = window.MotionCheckAppearSync(this, a, i)), this.valueSubscriptions.set(a, () => {
      o(), u && u(), i.owner && i.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in Tc) {
      const i = Tc[a];
      if (!i)
        continue;
      const { isEnabled: s, Feature: o } = i;
      if (!this.features[a] && o && s(this.props) && (this.features[a] = new o(this)), this.features[a]) {
        const u = this.features[a];
        u.isMounted ? u.update() : (u.mount(), u.isMounted = !0);
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : X1();
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
    for (let s = 0; s < vb.length; s++) {
      const o = vb[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, h = a[u];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = B4(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && i !== void 0 && (s = Nc(i === null ? void 0 : i, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, i) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Qx(s) || Zx(s)) ? s = parseFloat(s) : !L4(s) && ra.test(i) && (s = I1(a, i)), this.setBaseTarget(a, un(s) ? s.get() : s)), un(s) ? s.get() : s;
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
      const u = Xh(this.props, i, this.presenceContext?.custom);
      u && (s = u[a]);
    }
    if (i && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !un(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, i) {
    return this.events[a] || (this.events[a] = new e1()), this.events[a].add(i);
  }
  notify(a, ...i) {
    this.events[a] && this.events[a].notify(...i);
  }
  scheduleRenderMicrotask() {
    N4.render(this.render);
  }
}
class Z1 extends q4 {
  constructor() {
    super(...arguments), this.KeyframeResolver = E4;
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
    un(a) && (this.childSubscription = a.on("change", (i) => {
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
function I4({ top: n, left: a, right: i, bottom: s }) {
  return {
    x: { min: a, max: i },
    y: { min: n, max: s }
  };
}
function F4(n, a) {
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
function Y4(n, a) {
  return I4(F4(n.getBoundingClientRect(), a));
}
const G4 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, X4 = al.length;
function P4(n, a, i) {
  let s = "", o = !0;
  for (let u = 0; u < X4; u++) {
    const h = al[u], m = n[h];
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
      const p = F1(m, Kh[h]);
      if (!v) {
        o = !1;
        const x = G4[h] || h;
        s += `${x}(${p}) `;
      }
      i && (a[h] = p);
    }
  }
  return s = s.trim(), i ? s = i(a, o ? "" : s) : o && (s = "none"), s;
}
function Jh(n, a, i) {
  const { style: s, vars: o, transformOrigin: u } = n;
  let h = !1, m = !1;
  for (const v in a) {
    const p = a[v];
    if (rl.has(v)) {
      h = !0;
      continue;
    } else if (h1(v)) {
      o[v] = p;
      continue;
    } else {
      const x = F1(p, Kh[v]);
      v.startsWith("origin") ? (m = !0, u[v] = x) : s[v] = x;
    }
  }
  if (a.transform || (h || i ? s.transform = P4(a, n.transform, i) : s.transform && (s.transform = "none")), m) {
    const { originX: v = "50%", originY: p = "50%", originZ: x = 0 } = u;
    s.transformOrigin = `${v} ${p} ${x}`;
  }
}
function J1(n, { style: a, vars: i }, s, o) {
  const u = n.style;
  let h;
  for (h in a)
    u[h] = a[h];
  o?.applyProjectionStyles(u, s);
  for (h in i)
    u.setProperty(h, i[h]);
}
function yb(n, a) {
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
    const i = yb(n, a.target.x), s = yb(n, a.target.y);
    return `${i}% ${s}%`;
  }
}, K4 = {
  correct: (n, { treeScale: a, projectionDelta: i }) => {
    const s = n, o = ra.parse(n);
    if (o.length > 5)
      return s;
    const u = ra.createTransformer(n), h = typeof o[0] != "number" ? 1 : 0, m = i.x.scale * a.x, v = i.y.scale * a.y;
    o[0 + h] /= m, o[1 + h] /= v;
    const p = _s(m, v, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= p), typeof o[3 + h] == "number" && (o[3 + h] /= p), u(o);
  }
}, Q4 = {
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
  boxShadow: K4
};
function W1(n, { layout: a, layoutId: i }) {
  return rl.has(n) || n.startsWith("origin") || (a || i !== void 0) && (!!Q4[n] || n === "opacity");
}
function Wh(n, a, i) {
  const s = n.style, o = a?.style, u = {};
  if (!s)
    return u;
  for (const h in s)
    (un(s[h]) || o && un(o[h]) || W1(h, n) || i?.getValue(h)?.liveStyle !== void 0) && (u[h] = s[h]);
  return u;
}
function Z4(n) {
  return window.getComputedStyle(n);
}
class J4 extends Z1 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = J1;
  }
  readValueFromInstance(a, i) {
    if (rl.has(i))
      return this.projection?.isProjecting ? ah(i) : SO(a, i);
    {
      const s = Z4(a), o = (h1(i) ? s.getPropertyValue(i) : s[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: i }) {
    return Y4(a, i);
  }
  build(a, i, s) {
    Jh(a, i, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return Wh(a, i, s);
  }
}
const W4 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, ek = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function tk(n, a, i = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const u = o ? W4 : ek;
  n[u.offset] = `${-s}`, n[u.array] = `${a} ${i}`;
}
const nk = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function eS(n, {
  attrX: a,
  attrY: i,
  attrScale: s,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, v, p, x) {
  if (Jh(n, m, p), v) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: g, style: S } = n;
  g.transform && (S.transform = g.transform, delete g.transform), (S.transform || g.transformOrigin) && (S.transformOrigin = g.transformOrigin ?? "50% 50%", delete g.transformOrigin), S.transform && (S.transformBox = x?.transformBox ?? "fill-box", delete g.transformBox);
  for (const E of nk)
    g[E] !== void 0 && (S[E] = g[E], delete g[E]);
  a !== void 0 && (g.x = a), i !== void 0 && (g.y = i), s !== void 0 && (g.scale = s), o !== void 0 && tk(g, o, u, h, !1);
}
const tS = /* @__PURE__ */ new Set([
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
]), nS = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function ak(n, a, i, s) {
  J1(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(tS.has(o) ? o : Ph(o), a.attrs[o]);
}
function aS(n, a, i) {
  const s = Wh(n, a, i);
  for (const o in n)
    if (un(n[o]) || un(a[o])) {
      const u = al.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[u] = n[o];
    }
  return s;
}
class rk extends Z1 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = X1;
  }
  getBaseTargetFromProps(a, i) {
    return a[i];
  }
  readValueFromInstance(a, i) {
    if (rl.has(i)) {
      const s = q1(i);
      return s && s.default || 0;
    }
    return i = tS.has(i) ? i : Ph(i), a.getAttribute(i);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return aS(a, i, s);
  }
  build(a, i, s) {
    eS(a, i, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, i, s, o) {
    ak(a, i, s, o);
  }
  mount(a) {
    this.isSVGTag = nS(a.tagName), super.mount(a);
  }
}
const ik = Zh.length;
function rS(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const i = n.parent ? rS(n.parent) || {} : {};
    return n.props.initial !== void 0 && (i.initial = n.props.initial), i;
  }
  const a = {};
  for (let i = 0; i < ik; i++) {
    const s = Zh[i], o = n.props[s];
    (xs(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function iS(n, a) {
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
const lk = [...Qh].reverse(), sk = Qh.length;
function ok(n) {
  return (a) => Promise.all(a.map(({ animation: i, options: s }) => f4(n, i, s)));
}
function ck(n) {
  let a = ok(n), i = bb(), s = !0, o = !1;
  const u = (p) => (x, g) => {
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
    const { props: x } = n, g = rS(n.parent) || {}, S = [], E = /* @__PURE__ */ new Set();
    let w = {}, N = 1 / 0;
    for (let T = 0; T < sk; T++) {
      const k = lk[T], R = i[k], _ = x[k] !== void 0 ? x[k] : g[k], K = xs(_), ee = k === p ? R.isActive : null;
      ee === !1 && (N = T);
      let te = _ === g[k] && _ !== x[k] && K;
      if (te && (s || o) && n.manuallyAnimateOnMount && (te = !1), R.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !R.isActive && ee === null || // If we didn't and don't have any defined prop for this animation type
      !_ && !R.prevProp || // Or if the prop doesn't define an animation
      Vc(_) || typeof _ == "boolean")
        continue;
      if (k === "exit" && R.isActive && ee !== !0) {
        R.prevResolvedValues && (w = {
          ...w,
          ...R.prevResolvedValues
        });
        continue;
      }
      const D = uk(R.prevProp, _);
      let q = D || // If we're making this variant active, we want to always make it active
      k === p && R.isActive && !te && K || // If we removed a higher-priority variant (i is in reverse order)
      T > N && K, F = !1;
      const oe = Array.isArray(_) ? _ : [_];
      let ie = oe.reduce(u(k), {});
      ee === !1 && (ie = {});
      const { prevResolvedValues: U = {} } = R, ne = {
        ...U,
        ...ie
      }, Q = (V) => {
        q = !0, E.has(V) && (F = !0, E.delete(V)), R.needsAnimating[V] = !0;
        const X = n.getValue(V);
        X && (X.liveStyle = !1);
      };
      for (const V in ne) {
        const X = ie[V], re = U[V];
        if (w.hasOwnProperty(V))
          continue;
        let M = !1;
        ch(X) && ch(re) ? M = !iS(X, re) : M = X !== re, M ? X != null ? Q(V) : E.add(V) : X !== void 0 && E.has(V) ? Q(V) : R.protectedKeys[V] = !0;
      }
      R.prevProp = _, R.prevResolvedValues = ie, R.isActive && (w = { ...w, ...ie }), (s || o) && n.blockInitialAnimation && (q = !1);
      const O = te && D;
      q && (!O || F) && S.push(...oe.map((V) => {
        const X = { type: k };
        if (typeof V == "string" && (s || o) && !O && n.manuallyAnimateOnMount && n.parent) {
          const { parent: re } = n, M = Zr(re, V);
          if (re.enteringChildren && M) {
            const { delayChildren: J } = M.transition || {};
            X.delay = z1(re.enteringChildren, n, J);
          }
        }
        return {
          animation: V,
          options: X
        };
      }));
    }
    if (E.size) {
      const T = {};
      if (typeof x.initial != "boolean") {
        const k = Zr(n, Array.isArray(x.initial) ? x.initial[0] : x.initial);
        k && k.transition && (T.transition = k.transition);
      }
      E.forEach((k) => {
        const R = n.getBaseTarget(k), _ = n.getValue(k);
        _ && (_.liveStyle = !0), T[k] = R ?? null;
      }), S.push({ animation: T });
    }
    let C = !!S.length;
    return s && (x.initial === !1 || x.initial === x.animate) && !n.manuallyAnimateOnMount && (C = !1), s = !1, o = !1, C ? a(S) : Promise.resolve();
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
      i = bb(), o = !0;
    }
  };
}
function uk(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !iS(a, n) : !1;
}
function Fr(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function bb() {
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
function xb(n, a, i, s = { passive: !0 }) {
  return n.addEventListener(a, i, s), () => n.removeEventListener(a, i);
}
function dk(n) {
  return un(n) ? n.get() : n;
}
const em = y.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function Sb(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function fk(...n) {
  return (a) => {
    let i = !1;
    const s = n.map((o) => {
      const u = Sb(o, a);
      return !i && typeof u == "function" && (i = !0), u;
    });
    if (i)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const u = s[o];
          typeof u == "function" ? u() : Sb(n[o], null);
        }
      };
  };
}
function hk(...n) {
  return y.useCallback(fk(...n), n);
}
class mk extends y.Component {
  getSnapshotBeforeUpdate(a) {
    const i = this.props.childRef.current;
    if (hc(i) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = i.offsetParent, o = hc(s) && s.offsetWidth || 0, u = hc(s) && s.offsetHeight || 0, h = getComputedStyle(i), m = this.props.sizeRef.current;
      m.height = parseFloat(h.height), m.width = parseFloat(h.width), m.top = i.offsetTop, m.left = i.offsetLeft, m.right = o - m.width - m.left, m.bottom = u - m.height - m.top;
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
function pk({ children: n, isPresent: a, anchorX: i, anchorY: s, root: o, pop: u }) {
  const h = y.useId(), m = y.useRef(null), v = y.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = y.useContext(em), x = n.props?.ref ?? n?.ref, g = hk(m, x);
  return y.useInsertionEffect(() => {
    const { width: S, height: E, top: w, left: N, right: C, bottom: T } = v.current;
    if (a || u === !1 || !m.current || !S || !E)
      return;
    const k = i === "left" ? `left: ${N}` : `right: ${C}`, R = s === "bottom" ? `bottom: ${T}` : `top: ${w}`;
    m.current.dataset.motionPopId = h;
    const _ = document.createElement("style");
    p && (_.nonce = p);
    const K = o ?? document.head;
    return K.appendChild(_), _.sheet && _.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${E}px !important;
            ${k}px !important;
            ${R}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), K.contains(_) && K.removeChild(_);
    };
  }, [a]), d.jsx(mk, { isPresent: a, childRef: m, sizeRef: v, pop: u, children: u === !1 ? n : y.cloneElement(n, { ref: g }) });
}
const gk = ({ children: n, initial: a, isPresent: i, onExitComplete: s, custom: o, presenceAffectsLayout: u, mode: h, anchorX: m, anchorY: v, root: p }) => {
  const x = Uh(vk), g = y.useId();
  let S = !0, E = y.useMemo(() => (S = !1, {
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
  return u && S && (E = { ...E }), y.useMemo(() => {
    x.forEach((w, N) => x.set(N, !1));
  }, [i]), y.useEffect(() => {
    !i && !x.size && s && s();
  }, [i]), n = d.jsx(pk, { pop: h === "popLayout", isPresent: i, anchorX: m, anchorY: v, root: p, children: n }), d.jsx(Lc.Provider, { value: E, children: n });
};
function vk() {
  return /* @__PURE__ */ new Map();
}
function yk(n = !0) {
  const a = y.useContext(Lc);
  if (a === null)
    return [!0, null];
  const { isPresent: i, onExitComplete: s, register: o } = a, u = y.useId();
  y.useEffect(() => {
    if (n)
      return o(u);
  }, [n]);
  const h = y.useCallback(() => n && s && s(u), [u, s, n]);
  return !i && s ? [!1, h] : [!0];
}
const ac = (n) => n.key || "";
function wb(n) {
  const a = [];
  return y.Children.forEach(n, (i) => {
    y.isValidElement(i) && a.push(i);
  }), a;
}
const bk = ({ children: n, custom: a, initial: i = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: h = !1, anchorX: m = "left", anchorY: v = "top", root: p }) => {
  const [x, g] = yk(h), S = y.useMemo(() => wb(n), [n]), E = h && !x ? [] : S.map(ac), w = y.useRef(!0), N = y.useRef(S), C = Uh(() => /* @__PURE__ */ new Map()), T = y.useRef(/* @__PURE__ */ new Set()), [k, R] = y.useState(S), [_, K] = y.useState(S);
  Kx(() => {
    w.current = !1, N.current = S;
    for (let D = 0; D < _.length; D++) {
      const q = ac(_[D]);
      E.includes(q) ? (C.delete(q), T.current.delete(q)) : C.get(q) !== !0 && C.set(q, !1);
    }
  }, [_, E.length, E.join("-")]);
  const ee = [];
  if (S !== k) {
    let D = [...S];
    for (let q = 0; q < _.length; q++) {
      const F = _[q], oe = ac(F);
      E.includes(oe) || (D.splice(q, 0, F), ee.push(F));
    }
    return u === "wait" && ee.length && (D = ee), K(wb(D)), R(S), null;
  }
  const { forceRender: te } = y.useContext(Px);
  return d.jsx(d.Fragment, { children: _.map((D) => {
    const q = ac(D), F = h && !x ? !1 : S === _ || E.includes(q), oe = () => {
      if (T.current.has(q))
        return;
      if (C.has(q))
        T.current.add(q), C.set(q, !0);
      else
        return;
      let ie = !0;
      C.forEach((U) => {
        U || (ie = !1);
      }), ie && (te?.(), K(N.current), h && g?.(), s && s());
    };
    return d.jsx(gk, { isPresent: F, initial: !w.current || i ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: p, onExitComplete: F ? void 0 : oe, anchorX: m, anchorY: v, children: D }, q);
  }) });
}, tm = y.createContext({ strict: !1 }), Eb = {
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
let jb = !1;
function xk() {
  if (jb)
    return;
  const n = {};
  for (const a in Eb)
    n[a] = {
      isEnabled: (i) => Eb[a].some((s) => !!i[s])
    };
  Q1(n), jb = !0;
}
function lS() {
  return xk(), H4();
}
function mh(n) {
  const a = lS();
  for (const i in n)
    a[i] = {
      ...a[i],
      ...n[i]
    };
  Q1(a);
}
function sS({ children: n, features: a, strict: i = !1 }) {
  const [, s] = y.useState(!Vf(a)), o = y.useRef(void 0);
  if (!Vf(a)) {
    const { renderer: u, ...h } = a;
    o.current = u, mh(h);
  }
  return y.useEffect(() => {
    Vf(a) && a().then(({ renderer: u, ...h }) => {
      mh(h), o.current = u, s(!0);
    });
  }, []), d.jsx(tm.Provider, { value: { renderer: o.current, strict: i }, children: n });
}
function Vf(n) {
  return typeof n == "function";
}
const Sk = /* @__PURE__ */ new Set([
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
function Cc(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || Sk.has(n);
}
let oS = (n) => !Cc(n);
function wk(n) {
  typeof n == "function" && (oS = (a) => a.startsWith("on") ? !Cc(a) : n(a));
}
try {
  wk(require("@emotion/is-prop-valid").default);
} catch {
}
function Ek(n, a, i) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || un(n[o]) || (oS(o) || i === !0 && Cc(o) || !a && !Cc(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const Hc = /* @__PURE__ */ y.createContext({});
function jk(n, a) {
  if ($c(n)) {
    const { initial: i, animate: s } = n;
    return {
      initial: i === !1 || xs(i) ? i : void 0,
      animate: xs(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function Nk(n) {
  const { initial: a, animate: i } = jk(n, y.useContext(Hc));
  return y.useMemo(() => ({ initial: a, animate: i }), [Nb(a), Nb(i)]);
}
function Nb(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const nm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function cS(n, a, i) {
  for (const s in a)
    !un(a[s]) && !W1(s, i) && (n[s] = a[s]);
}
function Tk({ transformTemplate: n }, a) {
  return y.useMemo(() => {
    const i = nm();
    return Jh(i, a, n), Object.assign({}, i.vars, i.style);
  }, [a]);
}
function Ck(n, a) {
  const i = n.style || {}, s = {};
  return cS(s, i, n), Object.assign(s, Tk(n, a)), s;
}
function Rk(n, a) {
  const i = {}, s = Ck(n, a);
  return n.drag && n.dragListener !== !1 && (i.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (i.tabIndex = 0), i.style = s, i;
}
const uS = () => ({
  ...nm(),
  attrs: {}
});
function Mk(n, a, i, s) {
  const o = y.useMemo(() => {
    const u = uS();
    return eS(u, a, nS(s), n.transformTemplate, n.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (n.style) {
    const u = {};
    cS(u, n.style, n), o.style = { ...u, ...o.style };
  }
  return o;
}
const Ak = [
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
function am(n) {
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
      !!(Ak.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function _k(n, a, i, { latestValues: s }, o, u = !1, h) {
  const v = (h ?? am(n) ? Mk : Rk)(a, s, o, n), p = Ek(a, typeof n == "string", u), x = n !== y.Fragment ? { ...p, ...v, ref: i } : {}, { children: g } = a, S = y.useMemo(() => un(g) ? g.get() : g, [g]);
  return y.createElement(n, {
    ...x,
    children: S
  });
}
function Dk({ scrapeMotionValuesFromProps: n, createRenderState: a }, i, s, o) {
  return {
    latestValues: zk(i, s, o, n),
    renderState: a()
  };
}
function zk(n, a, i, s) {
  const o = {}, u = s(n, {});
  for (const S in u)
    o[S] = dk(u[S]);
  let { initial: h, animate: m } = n;
  const v = $c(n), p = P1(n);
  a && p && !v && n.inherit !== !1 && (h === void 0 && (h = a.initial), m === void 0 && (m = a.animate));
  let x = i ? i.initial === !1 : !1;
  x = x || h === !1;
  const g = x ? m : h;
  if (g && typeof g != "boolean" && !Vc(g)) {
    const S = Array.isArray(g) ? g : [g];
    for (let E = 0; E < S.length; E++) {
      const w = Xh(n, S[E]);
      if (w) {
        const { transitionEnd: N, transition: C, ...T } = w;
        for (const k in T) {
          let R = T[k];
          if (Array.isArray(R)) {
            const _ = x ? R.length - 1 : 0;
            R = R[_];
          }
          R !== null && (o[k] = R);
        }
        for (const k in N)
          o[k] = N[k];
      }
    }
  }
  return o;
}
const dS = (n) => (a, i) => {
  const s = y.useContext(Hc), o = y.useContext(Lc), u = () => Dk(n, a, s, o);
  return i ? u() : Uh(u);
}, Ok = /* @__PURE__ */ dS({
  scrapeMotionValuesFromProps: Wh,
  createRenderState: nm
}), kk = /* @__PURE__ */ dS({
  scrapeMotionValuesFromProps: aS,
  createRenderState: uS
}), Lk = Symbol.for("motionComponentSymbol");
function Uk(n, a, i) {
  const s = y.useRef(i);
  y.useInsertionEffect(() => {
    s.current = i;
  });
  const o = y.useRef(null);
  return y.useCallback((u) => {
    u && n.onMount?.(u);
    const h = s.current;
    if (typeof h == "function")
      if (u) {
        const m = h(u);
        typeof m == "function" && (o.current = m);
      } else o.current ? (o.current(), o.current = null) : h(u);
    else h && (h.current = u);
    a && (u ? a.mount(u) : a.unmount());
  }, [a]);
}
const Bk = y.createContext({});
function Vk(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function $k(n, a, i, s, o, u) {
  const { visualElement: h } = y.useContext(Hc), m = y.useContext(tm), v = y.useContext(Lc), p = y.useContext(em), x = p.reducedMotion, g = p.skipAnimations, S = y.useRef(null), E = y.useRef(!1);
  s = s || m.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: h,
    props: i,
    presenceContext: v,
    blockInitialAnimation: v ? v.initial === !1 : !1,
    reducedMotionConfig: x,
    skipAnimations: g,
    isSVG: u
  }), E.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const w = S.current, N = y.useContext(Bk);
  w && !w.projection && o && (w.type === "html" || w.type === "svg") && Hk(S.current, i, o, N);
  const C = y.useRef(!1);
  y.useInsertionEffect(() => {
    w && C.current && w.update(i, v);
  });
  const T = i[B1], k = y.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return Kx(() => {
    E.current = !0, w && (C.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), k.current && w.animationState && w.animationState.animateChanges());
  }), y.useEffect(() => {
    w && (!k.current && w.animationState && w.animationState.animateChanges(), k.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), k.current = !1), w.enteringChildren = void 0);
  }), w;
}
function Hk(n, a, i, s) {
  const { layoutId: o, layout: u, drag: h, dragConstraints: m, layoutScroll: v, layoutRoot: p, layoutAnchor: x, layoutCrossfade: g } = a;
  n.projection = new i(n.latestValues, a["data-framer-portal-id"] ? void 0 : fS(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!h || m && Vk(m),
    visualElement: n,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof u == "string" ? u : "both",
    initialPromotionConfig: s,
    crossfade: g,
    layoutScroll: v,
    layoutRoot: p,
    layoutAnchor: x
  });
}
function fS(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : fS(n.parent);
}
function $f(n, { forwardMotionProps: a = !1, type: i } = {}, s, o) {
  s && mh(s);
  const u = i ? i === "svg" : am(n), h = u ? kk : Ok;
  function m(p, x) {
    let g;
    const S = {
      ...y.useContext(em),
      ...p,
      layoutId: qk(p)
    }, { isStatic: E } = S, w = Nk(p), N = h(p, E);
    if (!E && typeof window < "u") {
      Ik();
      const C = Fk(S);
      g = C.MeasureLayout, w.visualElement = $k(n, N, S, o, C.ProjectionNode, u);
    }
    return d.jsxs(Hc.Provider, { value: w, children: [g && w.visualElement ? d.jsx(g, { visualElement: w.visualElement, ...S }) : null, _k(n, p, Uk(N, w.visualElement, x), N, E, a, u)] });
  }
  m.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const v = y.forwardRef(m);
  return v[Lk] = n, v;
}
function qk({ layoutId: n }) {
  const a = y.useContext(Px).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function Ik(n, a) {
  y.useContext(tm).strict;
}
function Fk(n) {
  const a = lS(), { drag: i, layout: s } = a;
  if (!i && !s)
    return {};
  const o = { ...i, ...s };
  return {
    MeasureLayout: i?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function Yk(n, a) {
  if (typeof Proxy > "u")
    return $f;
  const i = /* @__PURE__ */ new Map(), s = (u, h) => $f(u, h, n, a), o = (u, h) => s(u, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, h) => h === "create" ? s : (i.has(h) || i.set(h, $f(h, void 0, n, a)), i.get(h))
  });
}
const hS = /* @__PURE__ */ Yk(), Gk = (n, a) => a.isSVG ?? am(n) ? new rk(a) : new J4(a, {
  allowProjection: n !== y.Fragment
});
class Xk extends il {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = ck(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Vc(a) && (this.unmountControls = a.subscribe(this.node));
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
let Pk = 0;
class Kk extends il {
  constructor() {
    super(...arguments), this.id = Pk++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: i } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: u, custom: h } = this.node.getProps();
        if (typeof u == "string") {
          const m = Zr(this.node, u, h);
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
const Qk = {
  animation: {
    Feature: Xk
  },
  exit: {
    Feature: Kk
  }
};
function mS(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
function Tb(n, a, i) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, u = s[o];
  u && Pn.postRender(() => u(a, mS(a)));
}
class Zk extends il {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = M4(a, (i, s) => (Tb(this.node, s, "Start"), (o) => Tb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class Jk extends il {
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
    this.unmount = Uc(xb(this.node.current, "focus", () => this.onFocus()), xb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Cb(n, a, i) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), u = s[o];
  u && Pn.postRender(() => u(a, mS(a)));
}
class Wk extends il {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: i, propagate: s } = this.node.props;
    this.unmount = O4(a, (o, u) => (Cb(this.node, u, "Start"), (h, { success: m }) => Cb(this.node, h, m ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const ph = /* @__PURE__ */ new WeakMap(), Hf = /* @__PURE__ */ new WeakMap(), eL = (n) => {
  const a = ph.get(n.target);
  a && a(n);
}, tL = (n) => {
  n.forEach(eL);
};
function nL({ root: n, ...a }) {
  const i = n || document;
  Hf.has(i) || Hf.set(i, {});
  const s = Hf.get(i), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(tL, { root: n, ...a })), s[o];
}
function aL(n, a, i) {
  const s = nL(a);
  return ph.set(n, i), s.observe(n), () => {
    ph.delete(n), s.unobserve(n);
  };
}
const rL = {
  some: 0,
  all: 1
};
class iL extends il {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: i, margin: s, amount: o = "some", once: u } = a, h = {
      root: i ? i.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : rL[o]
    }, m = (v) => {
      const { isIntersecting: p } = v;
      if (this.isInView === p || (this.isInView = p, u && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: x, onViewportLeave: g } = this.node.getProps(), S = p ? x : g;
      S && S(v);
    };
    this.stopObserver = aL(this.node.current, h, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(lL(a, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function lL({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (i) => n[i] !== a[i];
}
const sL = {
  inView: {
    Feature: iL
  },
  tap: {
    Feature: Wk
  },
  focus: {
    Feature: Jk
  },
  hover: {
    Feature: Zk
  }
}, pS = {
  renderer: Gk,
  ...Qk,
  ...sL
};
var oL = "_1oor31e0", cL = "_1oor31e1", uL = "_1oor31e2", dL = "_1oor31e3", fL = "_1oor31e4", hL = "_1oor31e5", mL = "_1oor31e6", pL = "_1oor31e7", gL = "_1oor31e8";
const vL = 8;
function yL(n) {
  const { entries: a, loading: i, error: s } = n;
  return /* @__PURE__ */ d.jsxs("div", { className: oL, "aria-busy": !!i, children: [
    s && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: s }),
    i && !s && /* @__PURE__ */ d.jsx("div", { className: gL, "aria-live": "polite", children: "Loading edit history…" }),
    !i && !s && a.length === 0 && /* @__PURE__ */ d.jsx("div", { className: pL, children: "No edits yet" }),
    !i && !s && a.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: cL, children: a.map((o) => /* @__PURE__ */ d.jsxs("li", { className: uL, children: [
      /* @__PURE__ */ d.jsx("span", { className: dL, children: xL(o.recorded_at) }),
      /* @__PURE__ */ d.jsx("span", { className: fL, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ d.jsx("span", { className: hL, title: o.digest_after, children: bL(o.digest_after) }),
      /* @__PURE__ */ d.jsx("span", { className: mL, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function bL(n) {
  return n ? `${n.slice(0, vL)}…` : "—";
}
function xL(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var Rb = "_1c63kaw0", SL = "_1c63kaw1", wL = "_1c63kaw2", EL = "_1c63kaw3", jL = "_1c63kaw4", NL = "_1c63kaw5", TL = "_1c63kaw6", CL = "_1c63kaw7";
function RL({ chain: n, onRemoveOp: a }) {
  return n.ops.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: Rb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ d.jsx("span", { className: SL, children: "No edits yet" }) }) : /* @__PURE__ */ d.jsx("ol", { className: Rb, "data-testid": "edit-chain-list", children: n.ops.map((i, s) => /* @__PURE__ */ d.jsxs("li", { className: wL, children: [
    /* @__PURE__ */ d.jsxs("span", { className: EL, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: jL, children: [
      /* @__PURE__ */ d.jsx("span", { className: NL, children: Mb(i) }),
      /* @__PURE__ */ d.jsx("span", { className: TL, children: ML(i) })
    ] }),
    /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: CL,
        onClick: () => a(i.id),
        "aria-label": `Remove ${Mb(i)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, i.id)) });
}
function Mb(n) {
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
function ML(n) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Ab(n.start_ms)} → ${Ab(n.end_ms)}`;
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
      return `${qf(n.low_db)} / ${qf(n.mid_db)} / ${qf(n.high_db)}`;
    case "pitch_shift":
      return `${n.semitones >= 0 ? "+" : ""}${n.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${n.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function qf(n) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(0)}`;
}
function Ab(n) {
  return !Number.isFinite(n) || n < 0 ? "0.00s" : `${(n / 1e3).toFixed(2)}s`;
}
var rc = "_1o3ytop0", AL = "_1o3ytop1", _L = "_1o3ytop2", DL = "_1o3ytop3", zL = "_1o3ytop4", ic = "_1o3ytop5", OL = "_1o3ytop6", kL = "_1o3ytopc", LL = "_1o3ytopd", UL = "_1o3ytope", BL = "_1o3ytopf", VL = "_1o3ytopg", $L = "_1o3ytoph";
const _b = -16;
function HL(n) {
  const {
    voiceAsset: a,
    deploymentId: i,
    affectedCharacterNames: s = [],
    onChainPersisted: o,
    onError: u
  } = n, h = a.durationMs ?? 0, m = y.useMemo(
    () => qL(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [v, p] = y.useState(() => If(h)), [x, g] = y.useState(kc), [S, E] = y.useState(!1), [w, N] = y.useState(null), [C, T] = y.useState(null), [k, R] = y.useState(!1), [_, K] = y.useState(!1), [ee, te] = y.useState(!1), [D, q] = y.useState(null), [F, oe] = y.useState([]), [ie, U] = y.useState(null), [ne, Q] = y.useState([]), [O, A] = y.useState(!1), [V, X] = y.useState(null), [re, M] = y.useState(0), J = y.useRef(null), Z = y.useRef(null), ce = y.useRef(null), he = y.useRef(null), ve = y.useRef(null), _e = y.useRef(0), Me = y.useMemo(
    () => v.ops.some((ye) => ye.mode === "normalize"),
    [v.ops]
  );
  y.useEffect(() => {
    const ye = If(h);
    p(ye), g(Lx(ye)), N(null), te(!1), oe([]), U(null), ve.current = null;
  }, [a.voiceAssetId, h]);
  const Ve = y.useCallback((ye) => {
    g(ye), p((ze) => kx(ze, ye));
  }, []);
  y.useEffect(() => {
    he.current?.abort();
    const ye = new AbortController();
    return he.current = ye, A(!0), X(null), uc(i, "voice_asset", a.voiceAssetId, 50, {
      signal: ye.signal
    }).then((ze) => {
      ye.signal.aborted || Q(ze.entries);
    }).catch((ze) => {
      if (ye.signal.aborted) return;
      const Ke = ze instanceof Error ? ze.message : "audit fetch failed";
      X(Ke);
    }).finally(() => {
      ye.signal.aborted || A(!1);
    }), () => ye.abort();
  }, [i, a.voiceAssetId, re]), y.useEffect(() => () => {
    C && URL.revokeObjectURL(C);
  }, [C]), y.useEffect(() => () => {
    Z.current?.abort(), ce.current?.abort(), he.current?.abort();
  }, []);
  const Jt = v.ops.find((ye) => ye.mode === "trim"), Pt = v.ops.find((ye) => ye.mode === "normalize"), _t = Jt?.start_ms ?? 0, We = Jt?.end_ms ?? Math.max(1, h), pt = y.useCallback((ye, ze) => {
    p(
      (Ke) => Db(
        Ke,
        "trim",
        (tt) => ({
          ...tt,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(ye)),
          end_ms: Math.max(Math.floor(ye) + 1, Math.floor(ze))
        })
      )
    );
  }, []), fe = y.useCallback(
    (ye) => pt(ye, We),
    [We, pt]
  ), ke = y.useCallback(
    (ye) => pt(_t, ye),
    [_t, pt]
  ), De = y.useCallback((ye) => {
    p((ze) => {
      const Ke = ze.ops.filter((tt) => tt.mode !== "normalize");
      if (ye) {
        const tt = {
          id: Sn(),
          mode: "normalize",
          target_lufs: _b
        };
        return { ...ze, ops: [...Ke, tt] };
      }
      return { ...ze, ops: Ke };
    });
  }, []), Te = y.useCallback(
    (ye) => {
      const ze = v.ops.findIndex((It) => It.id === ye);
      if (ze === -1) return;
      const Ke = v.ops[ze];
      if (!Ke) return;
      const tt = [...v.ops.slice(0, ze), ...v.ops.slice(ze + 1)];
      p({ ...v, ops: tt }), oe((It) => [...It, { op: Ke, index: ze }]);
    },
    [v]
  ), bt = y.useCallback(() => {
    const ye = F[F.length - 1];
    if (!ye) return;
    const ze = Math.min(ye.index, v.ops.length), Ke = [...v.ops.slice(0, ze), ye.op, ...v.ops.slice(ze)];
    p({ ...v, ops: Ke }), oe(F.slice(0, -1));
  }, [v, F]), xt = y.useCallback(() => {
    const ye = wx(v, h);
    return ye ? (N(ye.message), !1) : (N(null), !0);
  }, [v, h]), dn = y.useCallback(async () => {
    if (!xt() || k) return;
    Z.current?.abort();
    const ye = new AbortController();
    Z.current = ye;
    const ze = ++_e.current;
    K(!0);
    try {
      const Ke = await pC(a.voiceAssetId, i, v, {
        signal: ye.signal
      });
      if (ye.signal.aborted || ze !== _e.current) return;
      C && URL.revokeObjectURL(C);
      const tt = URL.createObjectURL(Ke);
      T(tt), te(!0), requestAnimationFrame(() => J.current?.play().catch(() => {
      }));
    } catch (Ke) {
      if (ye.signal.aborted) return;
      const tt = Ke instanceof Error ? Ke.message : "preview failed";
      N(tt), u(tt);
    } finally {
      ye.signal.aborted || K(!1);
    }
  }, [xt, k, a.voiceAssetId, i, v, C, u]), Ht = y.useCallback(async () => {
    if (!xt() || _ || k) return;
    if (s.length > 1) {
      const ze = s.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${s.length} characters: ${ze}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    Z.current?.abort(), ce.current?.abort();
    const ye = new AbortController();
    ce.current = ye, R(!0);
    try {
      const ze = ve.current ?? void 0, Ke = await Sx(
        a.voiceAssetId,
        i,
        ze ? { chain: v, digest_before: ze } : { chain: v },
        { signal: ye.signal }
      );
      if (ye.signal.aborted) return;
      ve.current = Ke.chain_digest, U(Ke.chain_digest), N(null), q(Ke.measured_lufs ?? null), oe([]), o(Ke), M((tt) => tt + 1);
    } catch (ze) {
      if (ye.signal.aborted) return;
      const Ke = ze instanceof Qi;
      ze instanceof Qi && (ve.current = ze.currentDigest || null);
      const tt = Ke ? "Edit chain has changed in another tab. Reload to continue." : ze instanceof Error ? ze.message : "apply failed";
      N(tt), u(tt);
    } finally {
      ye.signal.aborted || R(!1);
    }
  }, [
    xt,
    _,
    k,
    s,
    a.voiceAssetId,
    i,
    v,
    o,
    u
  ]), On = y.useCallback(() => {
    Z.current?.abort(), p(If(h)), N(null), q(null), te(!1), oe([]), M((ye) => ye + 1), C && (URL.revokeObjectURL(C), T(null));
  }, [h, C]), qt = y.useCallback((ye) => {
    p(
      (ze) => Db(
        ze,
        "normalize",
        (Ke) => ({
          ...Ke,
          mode: "normalize",
          target_lufs: ye
        })
      )
    );
  }, []);
  return /* @__PURE__ */ d.jsxs(Yx, { variant: "standalone", children: [
    /* @__PURE__ */ d.jsx(
      Gx,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${lc(h)}`
      }
    ),
    /* @__PURE__ */ d.jsx(
      Ix,
      {
        audioUrl: m,
        durationMs: Math.max(1, h),
        startMs: _t,
        endMs: We,
        onChangeStart: fe,
        onChangeEnd: ke
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: rc, children: [
      /* @__PURE__ */ d.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ d.jsxs("span", { className: AL, children: [
        lc(_t),
        " → ",
        lc(We),
        " · ",
        lc(We - _t)
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: zL, children: [
      /* @__PURE__ */ d.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ d.jsxs("span", { className: rc, children: [
          /* @__PURE__ */ d.jsx("span", { children: "Normalize loudness" }),
          Me && Pt && /* @__PURE__ */ d.jsxs("span", { className: kL, children: [
            "target ",
            Pt.target_lufs.toFixed(1),
            " LUFS",
            D !== null && ` · measured ${D.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: OL, children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: Me,
              onChange: (ye) => De(ye.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { children: [
            "Target ",
            _b.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        Me && Pt && /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "range",
            className: UL,
            min: -30,
            max: -6,
            step: 0.5,
            value: Pt.target_lufs,
            onChange: (ye) => qt(Number(ye.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ d.jsxs("span", { className: rc, children: [
          "Operations · ",
          v.ops.length
        ] }),
        /* @__PURE__ */ d.jsx(RL, { chain: v, onRemoveOp: Te })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: _L,
            onClick: () => E((ye) => !ye),
            "aria-expanded": S,
            children: [
              S ? "▾" : "▸",
              " Advanced effects · gain · eq · pitch · fade · silence trim"
            ]
          }
        ),
        S && /* @__PURE__ */ d.jsx(
          Lh,
          {
            state: x,
            onChange: Ve,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      ie && /* @__PURE__ */ d.jsx("div", { className: ic, children: /* @__PURE__ */ d.jsxs("span", { className: rc, children: [
        /* @__PURE__ */ d.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ d.jsxs("span", { className: DL, title: ie, children: [
          ie.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ d.jsxs(Xx, { children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "secondary",
          onClick: () => void dn(),
          disabled: _ || k,
          children: _ ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          onClick: () => void Ht(),
          disabled: k || _,
          children: k ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "ghost",
          onClick: On,
          disabled: k || _,
          children: "Reset"
        }
      ),
      F.length > 0 && /* @__PURE__ */ d.jsxs(
        ft,
        {
          variant: "ghost",
          size: "sm",
          onClick: bt,
          disabled: k || _,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            F.length,
            ")"
          ]
        }
      ),
      ee && /* @__PURE__ */ d.jsx(
        "span",
        {
          className: $L,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    C && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ d.jsx(
      "audio",
      {
        ref: J,
        src: C,
        controls: !0,
        className: LL,
        "aria-label": "Edit preview"
      }
    ),
    w && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: w }),
    /* @__PURE__ */ d.jsxs("details", { className: BL, children: [
      /* @__PURE__ */ d.jsxs("summary", { className: VL, children: [
        "Edit history",
        ne.length > 0 ? ` · ${ne.length}` : ""
      ] }),
      /* @__PURE__ */ d.jsx(
        yL,
        {
          entries: ne,
          loading: O,
          error: V
        }
      )
    ] })
  ] });
}
function If(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function Db(n, a, i) {
  const s = n.ops.findIndex((u) => u.mode === a);
  if (s === -1) {
    const u = { id: Sn(), mode: a };
    return { ...n, ops: [...n.ops, i(u)] };
  }
  const o = [...n.ops];
  return o[s] = i(o[s]), { ...n, ops: o };
}
function lc(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
function qL(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var IL = "go9vi12", FL = "go9vi13", YL = "go9vi14", GL = "go9vi15", XL = "go9vi16", PL = "go9vi17", KL = "go9vi18", QL = "go9vi19", ZL = "go9vi1a go9vi19", JL = "go9vi1b", WL = "go9vi1c", e6 = "go9vi1d", t6 = "go9vi1e", n6 = "go9vi1f", a6 = "go9vi1g", r6 = "go9vi1h", i6 = "go9vi1i", Yr = "go9vi1j", is = "go9vi1k", Xi = "go9vi1l", l6 = "go9vi1m go9vi1l", s6 = "go9vi1n", o6 = "go9vi1o go9vi1n", c6 = "go9vi1p go9vi1n", u6 = "go9vi1q", d6 = "go9vi1r", f6 = "go9vi1s", h6 = "go9vi1t", gS = "go9vi1u", m6 = "go9vi1v", p6 = "go9vi1w", g6 = "go9vi1x go9vi1l", v6 = "go9vi1y", y6 = "go9vi1z", b6 = "go9vi110", x6 = "go9vi111", S6 = "go9vi112", w6 = "go9vi113";
const E6 = ["none", "audio_ref", "vector_preset", "qwen_template"];
function j6() {
  const { deployment: n, mappings: a, voiceAssets: i } = Ts(), [s, o] = y.useState(a), [u, h] = y.useState(i), [m, v] = y.useState(
    a[0]?.mappingId ?? null
  ), [p, x] = y.useState(""), [g, S] = y.useState(null), [E, w] = y.useState(null), [N, C] = y.useState(null), T = y.useMemo(() => {
    const A = /* @__PURE__ */ new Map();
    for (const V of u) A.set(V.voiceAssetId, V);
    return A;
  }, [u]), k = y.useMemo(() => {
    const A = p.trim().toLowerCase();
    return A ? s.filter((V) => V.characterName.toLowerCase().includes(A)) : s;
  }, [s, p]), R = y.useMemo(
    () => s.find((A) => A.mappingId === m) ?? null,
    [s, m]
  );
  y.useEffect(() => {
    o(a), h(i), v(a[0]?.mappingId ?? null);
  }, [a, i]), y.useEffect(() => {
    if (!E) return;
    const A = setTimeout(() => w(null), 2600);
    return () => clearTimeout(A);
  }, [E]);
  const _ = y.useCallback(async () => {
    const A = await ps(n.deploymentId);
    h(A.voiceAssets);
  }, [n.deploymentId]), K = y.useCallback(
    (A) => {
      o(
        (V) => V.map((X) => X.mappingId === m ? { ...X, ...A } : X)
      );
    },
    [m]
  ), ee = y.useCallback(
    async (A) => {
      if (!R) return;
      const V = R;
      try {
        const X = await us(n.deploymentId, R.mappingId, A);
        o((re) => re.map((M) => M.mappingId === X.mappingId ? X : M));
      } catch (X) {
        o(
          (re) => re.map((M) => M.mappingId === V.mappingId ? V : M)
        ), S(mr(X));
      }
    },
    [R, n.deploymentId]
  ), te = y.useCallback(async () => {
    const A = u[0];
    if (!A) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const V = A6(s), X = await Dh(n.deploymentId, {
        characterName: V,
        speakerVoiceAssetId: A.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((re) => [...re, X]), v(X.mappingId);
    } catch (V) {
      S(mr(V));
    }
  }, [n.deploymentId, u, s]), D = y.useCallback(() => {
    R && C({ id: R.mappingId, name: R.characterName });
  }, [R]), q = y.useCallback(async () => {
    if (!N) return;
    const { id: A, name: V } = N;
    C(null);
    try {
      await bx(n.deploymentId, A), o((X) => X.filter((re) => re.mappingId !== A)), v(null), w(`Mapping for ${V} deactivated.`);
    } catch (X) {
      S(mr(X));
    }
  }, [n.deploymentId, N]), F = y.useCallback(
    async (A, V, X) => {
      try {
        const re = await vc(n.deploymentId, A, V, X);
        return h((M) => [re, ...M]), w(`${re.displayName} uploaded.`), re;
      } catch (re) {
        return S(mr(re)), null;
      }
    },
    [n.deploymentId]
  ), oe = y.useCallback(async () => {
    try {
      const A = await aT(n.deploymentId);
      L6(A, `${n.deploymentId}-mappings.json`), w("Mappings exported to JSON.");
    } catch (A) {
      S(mr(A));
    }
  }, [n.deploymentId]), ie = y.useCallback(
    async (A, V) => {
      try {
        const X = await rT(
          n.deploymentId,
          A.mappings,
          V
        );
        w(
          `Imported ${X.created.length} • skipped ${X.skipped.length} • replaced ${X.replaced.length}.`
        );
        const re = await ps(n.deploymentId);
        h(re.voiceAssets);
      } catch (X) {
        S(mr(X));
      }
    },
    [n.deploymentId]
  ), U = y.useCallback(
    async (A) => {
      if (await _(), R && A.chain_digest)
        try {
          const V = await us(n.deploymentId, R.mappingId, {
            voiceAssetChainDigest: A.chain_digest
          });
          o(
            (X) => X.map((re) => re.mappingId === V.mappingId ? V : re)
          );
        } catch (V) {
          S(mr(V));
        }
      w("Edit applied.");
    },
    [_, R, n.deploymentId]
  ), ne = y.useCallback((A) => {
    S(A);
  }, []), Q = y.useCallback(
    async (A, V) => {
      if (!R) return null;
      const X = A.trim() || `[${R.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await oT(n.deploymentId, {
          line: X,
          outputFormat: V
        })).runId };
      } catch (re) {
        return S(mr(re)), null;
      }
    },
    [n.deploymentId, R]
  ), O = u.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ d.jsxs("div", { className: IL, children: [
    /* @__PURE__ */ d.jsxs("aside", { className: FL, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ d.jsxs("header", { className: YL, children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("h1", { id: "mapping-sidebar-heading", className: GL, children: "Cast" }),
          /* @__PURE__ */ d.jsxs("span", { className: XL, children: [
            s.length,
            " active · ",
            u.length,
            " ",
            O
          ] })
        ] }),
        /* @__PURE__ */ d.jsx(ft, { variant: "primary", size: "sm", onClick: te, children: "+ Add" })
      ] }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "search",
          className: PL,
          placeholder: "Search characters",
          value: p,
          onChange: (A) => x(A.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ d.jsx(M6, { onExport: oe, onImport: ie, onParseError: S }),
      /* @__PURE__ */ d.jsx("div", { className: KL, children: k.length === 0 ? /* @__PURE__ */ d.jsx(
        Cs,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : k.map((A) => {
        const V = T.get(A.speakerVoiceAssetId), X = A.mappingId === m;
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: X ? ZL : QL,
            onClick: () => v(A.mappingId),
            "aria-pressed": X,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: JL, "aria-hidden": "true", children: _6(A.characterName) }),
              /* @__PURE__ */ d.jsxs("span", { className: WL, children: [
                /* @__PURE__ */ d.jsx("span", { className: e6, children: A.characterName }),
                /* @__PURE__ */ d.jsxs("span", { className: t6, children: [
                  A.defaultEmotionMode,
                  " · ",
                  V?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          A.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: n6, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ d.jsx(sS, { features: pS, children: /* @__PURE__ */ d.jsx(bk, { children: E && /* @__PURE__ */ d.jsx(
        hS.div,
        {
          className: m6,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: E
        },
        E
      ) }) }),
      g && /* @__PURE__ */ d.jsx(zn, { severity: "error", children: g }),
      N && /* @__PURE__ */ d.jsxs(zn, { severity: "warning", children: [
        /* @__PURE__ */ d.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          N.name,
          "?"
        ] }),
        /* @__PURE__ */ d.jsx(ft, { variant: "danger", size: "sm", onClick: () => void q(), children: "Delete" }),
        /* @__PURE__ */ d.jsx(ft, { variant: "ghost", size: "sm", onClick: () => C(null), children: "Cancel" })
      ] }),
      R ? /* @__PURE__ */ d.jsx(
        T6,
        {
          deploymentId: n.deploymentId,
          mapping: R,
          voiceAssets: u,
          allMappings: s,
          onNameChange: (A) => {
            K({ characterName: A });
          },
          onNameBlur: (A) => {
            A !== R.characterName && A.trim() && ee({ characterName: A.trim() });
          },
          onSpeakerChange: (A) => {
            K({ speakerVoiceAssetId: A }), ee({ speakerVoiceAssetId: A });
          },
          onModeChange: (A) => {
            K({ defaultEmotionMode: A }), ee({ defaultEmotionMode: A });
          },
          onQwenChange: (A) => {
            K({ defaultQwenTemplate: A });
          },
          onQwenBlur: (A) => {
            ee({ defaultQwenTemplate: A });
          },
          onSpeedChange: (A) => {
            K({ defaultSpeedFactor: A });
          },
          onSpeedCommit: (A) => {
            ee({ defaultSpeedFactor: A });
          },
          onEmotionVoiceChange: (A) => {
            const V = A || null;
            K({ defaultEmotionVoiceAssetId: V }), ee({ defaultEmotionVoiceAssetId: V });
          },
          onDelete: D,
          onUploadVoice: async (A, V, X) => {
            const re = await F(A, V, X);
            return re && X === "speaker" && (K({ speakerVoiceAssetId: re.voiceAssetId }), ee({ speakerVoiceAssetId: re.voiceAssetId })), await _(), re;
          },
          onTestLine: Q,
          onEditChainPersisted: U,
          onEditError: ne
        },
        R.mappingId
      ) : /* @__PURE__ */ d.jsx(
        N6,
        {
          voiceCount: u.length,
          onUploadVoice: async (A) => {
            await F(A, A.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function N6({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ d.jsxs(La, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ d.jsxs("div", { className: b6, children: [
      /* @__PURE__ */ d.jsx("p", { className: Kr, children: "01 / Onboarding" }),
      /* @__PURE__ */ d.jsx("h2", { id: "onboarding-heading", className: x6, children: "Upload your first voice" }),
      /* @__PURE__ */ d.jsxs("p", { className: S6, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ d.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ d.jsx(
      vS,
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
function T6(n) {
  const { mapping: a, voiceAssets: i, allMappings: s } = n, o = i.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = y.useMemo(
    () => s.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [s, a.speakerVoiceAssetId]
  ), h = i.find((T) => T.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [m, v] = y.useState(""), [p, x] = y.useState("mp3"), [g, S] = y.useState("idle"), [E, w] = y.useState(null), N = y.useRef(!1);
  y.useEffect(() => (N.current = !1, () => {
    N.current = !0;
  }), []);
  const C = y.useCallback(async () => {
    N.current = !1, S("running"), w(null);
    const T = await n.onTestLine(m, p);
    if (N.current) return;
    if (!T) {
      S("error"), w("Failed to enqueue test-line run.");
      return;
    }
    const { runId: k } = T;
    for (let R = 0; R < 60; R += 1) {
      if (await new Promise((_) => setTimeout(_, 500)), N.current) return;
      try {
        const _ = await zh(n.deploymentId, k);
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
    /* @__PURE__ */ d.jsxs("header", { className: a6, children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("p", { className: Kr, children: "Character" }),
        /* @__PURE__ */ d.jsx("h2", { className: r6, children: a.characterName })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: gS, children: /* @__PURE__ */ d.jsx(ft, { variant: "danger", size: "sm", onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ d.jsxs(
      La,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: p6,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              className: g6,
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
              onClick: () => void C(),
              disabled: g === "running",
              children: g === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          g === "done" && /* @__PURE__ */ d.jsx(xr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          g === "error" && E && /* @__PURE__ */ d.jsx(xr, { tone: "danger", children: E })
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: i6, children: [
      /* @__PURE__ */ d.jsxs(La, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ d.jsx("h3", { id: "identity-heading", className: Kr, children: "01 / Identity & Performance" }),
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
              children: E6.map((T) => /* @__PURE__ */ d.jsx("option", { value: T, children: D6(T) }, T))
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
              className: l6,
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
        /* @__PURE__ */ d.jsx("h3", { id: "voice-heading", className: Kr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ d.jsx("span", { className: Yr, children: "Speaker reference" }),
        /* @__PURE__ */ d.jsx(
          C6,
          {
            value: a.speakerVoiceAssetId,
            voices: i,
            onChange: n.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ d.jsx(zb, { voice: o }),
        /* @__PURE__ */ d.jsx(
          vS,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => n.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ d.jsx(
          HL,
          {
            voiceAsset: o,
            deploymentId: n.deploymentId,
            affectedCharacterNames: u,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        h && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx("span", { className: Yr, children: "Emotion reference voice" }),
          /* @__PURE__ */ d.jsx(zb, { voice: h })
        ] })
      ] })
    ] })
  ] });
}
function C6({
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
function zb({ voice: n }) {
  const a = z6(n.durationMs ?? null);
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: u6, children: [
      /* @__PURE__ */ d.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ d.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ d.jsx("span", { children: O6(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ d.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ d.jsxs("div", { className: d6, children: [
      /* @__PURE__ */ d.jsx("div", { className: f6, children: /* @__PURE__ */ d.jsx(sS, { features: pS, children: /* @__PURE__ */ d.jsx(
        hS.div,
        {
          className: h6,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ d.jsx(xr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ d.jsx(R6, { seed: n.contentSha256 })
  ] });
}
function R6({ seed: n }) {
  const a = y.useMemo(() => k6(n, 48), [n]);
  return /* @__PURE__ */ d.jsx("div", { className: v6, "aria-hidden": "true", children: a.map((i, s) => /* @__PURE__ */ d.jsx(
    "span",
    {
      className: y6,
      style: { height: `${Math.max(6, i * 100)}%` }
    },
    `${n}-${s}`
  )) });
}
function vS({
  label: n,
  onFile: a
}) {
  const [i, s] = y.useState(!1), [o, u] = y.useState(!1), h = y.useRef(null), m = y.useCallback(
    async (v) => {
      u(!0);
      try {
        await a(v);
      } finally {
        u(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: o ? c6 : i ? o6 : s6,
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
function M6({
  onExport: n,
  onImport: a,
  onParseError: i
}) {
  const [s, o] = y.useState("error"), u = y.useRef(null);
  return /* @__PURE__ */ d.jsxs("div", { className: gS, children: [
    /* @__PURE__ */ d.jsx(ft, { variant: "secondary", size: "sm", onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: w6,
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
    /* @__PURE__ */ d.jsx(ft, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
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
function A6(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let i = 1;
  for (; a.has(`character ${i}`); ) i += 1;
  return `Character ${i}`;
}
function _6(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function D6(n) {
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
function z6(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function O6(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function k6(n, a) {
  const i = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    i.push((o * 31 + s * 7) % 100 / 100);
  }
  return i;
}
function L6(n, a) {
  const i = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(i), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function mr(n) {
  return n instanceof el || n instanceof Error ? n.message : "unknown error";
}
function U6() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await tT();
        return { deployments: n };
      },
      Component: LT
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId");
        return cj(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId"), [i, { mappings: s }, { runs: o }, u] = await Promise.all([
          Ny(a),
          Ty(a),
          iT(a, { limit: 10 }),
          fT(a)
        ]);
        return { deployment: i, mappings: s, runs: o, workflow: u };
      },
      Component: gD
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId"), i = Hi(n, "runId");
        return { run: await zh(a, i) };
      },
      Component: Dz
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId"), [i, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          Ny(a),
          Ty(a),
          ps(a)
        ]);
        return { deployment: i, mappings: s, voiceAssets: o };
      },
      Component: j6
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
      Component: d5
    },
    {
      path: "/runtime/queue",
      Component: s5
    }
  ];
}
function Hi(n, a) {
  const i = n[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const Ob = "ext-actions-request", B6 = "ext-actions-declare", V6 = "ext-action-state", kb = "ext-action-invoke", gh = "emotion-tts:navigate", Ii = "emotion-tts.run", Lb = "emotion-tts.mappings", $6 = 4e3;
function H6(n, a) {
  let i = null, s = !1;
  const o = () => {
    const w = i?.badge ?? "not_installed";
    return q6(w, s);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: Lb,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), h = () => {
    n.dispatchEvent(
      new CustomEvent(B6, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, m = () => {
    n.dispatchEvent(
      new CustomEvent(V6, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, v = () => h(), p = (w) => {
    const N = w.detail?.id;
    N === Ii ? x() : N === Lb && n.dispatchEvent(
      new CustomEvent(gh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, x = async () => {
    const w = i?.badge ?? "not_installed", N = w === "ready" || w === "running" || w === "starting";
    s = !0, m();
    try {
      N ? await Mx() : await Rx();
      try {
        i = await yc();
      } catch {
      }
    } catch {
    } finally {
      s = !1, m();
    }
  };
  n.addEventListener(Ob, v), n.addEventListener(kb, p);
  let g = !1;
  const S = async () => {
    try {
      const w = await yc();
      if (g) return;
      i = w, m();
    } catch {
    }
  };
  S();
  const E = window.setInterval(() => void S(), $6);
  return h(), {
    dispose: () => {
      g = !0, window.clearInterval(E), n.removeEventListener(Ob, v), n.removeEventListener(kb, p);
    }
  };
}
function q6(n, a) {
  const i = n === "ready" || n === "running" || n === "starting", s = n === "stopped" || n === "not_installed" || n === "failed";
  return a ? {
    id: Ii,
    label: i ? "Stopping…" : "Starting…",
    icon: i ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : n === "starting" || n === "installing" || n === "stopping" ? {
    id: Ii,
    label: Ax(n),
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
const vh = "emotion-tts-app", I6 = "ext-event", Ub = "emotion-tts-stylesheet", Bb = ["accent", "density", "card"];
function F6(n) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[n];
}
function Y6() {
  if (typeof document > "u" || document.getElementById(Ub)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Ub, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
Y6();
class G6 extends HTMLElement {
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
    this.root = OE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(gh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = H6(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const s = i.detail?.path;
      s && this.router && this.router.navigate(s);
    };
    this.navigateListener = a, this.addEventListener(gh, a);
  }
  syncTweaksFromBody() {
    for (const a of Bb) {
      const i = F6(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Bb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), i = gN(U6(), { initialEntries: [a] });
    this.router = i, this.root.render(
      /* @__PURE__ */ d.jsx(y.StrictMode, { children: /* @__PURE__ */ d.jsx(yN, { router: i }) })
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
      new CustomEvent(I6, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function X6() {
  typeof customElements > "u" || customElements.get(vh) || customElements.define(vh, G6);
}
typeof customElements < "u" && !customElements.get(vh) && X6();
export {
  X6 as register
};
//# sourceMappingURL=emotion-tts.js.map
