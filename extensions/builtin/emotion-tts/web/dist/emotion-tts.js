function VE(n, a) {
  for (var i = 0; i < a.length; i++) {
    const s = a[i];
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
function BE(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Rf = { exports: {} }, Rr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mg;
function kE() {
  if (mg) return Rr;
  mg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(s, o, c) {
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
  return Rr.Fragment = a, Rr.jsx = i, Rr.jsxs = i, Rr;
}
var pg;
function qE() {
  return pg || (pg = 1, Rf.exports = kE()), Rf.exports;
}
var d = qE(), _f = { exports: {} }, Re = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vg;
function HE() {
  if (vg) return Re;
  vg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), S = Symbol.iterator;
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
  }, T = Object.assign, R = {};
  function O(C, K, le) {
    this.props = C, this.context = K, this.refs = R, this.updater = le || j;
  }
  O.prototype.isReactComponent = {}, O.prototype.setState = function(C, K) {
    if (typeof C != "object" && typeof C != "function" && C != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, C, K, "setState");
  }, O.prototype.forceUpdate = function(C) {
    this.updater.enqueueForceUpdate(this, C, "forceUpdate");
  };
  function D() {
  }
  D.prototype = O.prototype;
  function z(C, K, le) {
    this.props = C, this.context = K, this.refs = R, this.updater = le || j;
  }
  var k = z.prototype = new D();
  k.constructor = z, T(k, O.prototype), k.isPureReactComponent = !0;
  var J = Array.isArray;
  function I() {
  }
  var W = { H: null, A: null, T: null, S: null }, M = Object.prototype.hasOwnProperty;
  function V(C, K, le) {
    var ce = le.ref;
    return {
      $$typeof: n,
      type: C,
      key: K,
      ref: ce !== void 0 ? ce : null,
      props: le
    };
  }
  function P(C, K) {
    return V(C.type, K, C.props);
  }
  function oe(C) {
    return typeof C == "object" && C !== null && C.$$typeof === n;
  }
  function ue(C) {
    var K = { "=": "=0", ":": "=2" };
    return "$" + C.replace(/[=:]/g, function(le) {
      return K[le];
    });
  }
  var Ee = /\/+/g;
  function we(C, K) {
    return typeof C == "object" && C !== null && C.key != null ? ue("" + C.key) : K.toString(36);
  }
  function re(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (typeof C.status == "string" ? C.then(I, I) : (C.status = "pending", C.then(
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
  function q(C, K, le, ce, xe) {
    var Ce = typeof C;
    (Ce === "undefined" || Ce === "boolean") && (C = null);
    var se = !1;
    if (C === null) se = !0;
    else
      switch (Ce) {
        case "bigint":
        case "string":
        case "number":
          se = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case n:
            case a:
              se = !0;
              break;
            case y:
              return se = C._init, q(
                se(C._payload),
                K,
                le,
                ce,
                xe
              );
          }
      }
    if (se)
      return xe = xe(C), se = ce === "" ? "." + we(C, 0) : ce, J(xe) ? (le = "", se != null && (le = se.replace(Ee, "$&/") + "/"), q(xe, K, le, "", function(Fe) {
        return Fe;
      })) : xe != null && (oe(xe) && (xe = P(
        xe,
        le + (xe.key == null || C && C.key === xe.key ? "" : ("" + xe.key).replace(
          Ee,
          "$&/"
        ) + "/") + se
      )), K.push(xe)), 1;
    se = 0;
    var _e = ce === "" ? "." : ce + ":";
    if (J(C))
      for (var Ne = 0; Ne < C.length; Ne++)
        ce = C[Ne], Ce = _e + we(ce, Ne), se += q(
          ce,
          K,
          le,
          Ce,
          xe
        );
    else if (Ne = w(C), typeof Ne == "function")
      for (C = Ne.call(C), Ne = 0; !(ce = C.next()).done; )
        ce = ce.value, Ce = _e + we(ce, Ne++), se += q(
          ce,
          K,
          le,
          Ce,
          xe
        );
    else if (Ce === "object") {
      if (typeof C.then == "function")
        return q(
          re(C),
          K,
          le,
          ce,
          xe
        );
      throw K = String(C), Error(
        "Objects are not valid as a React child (found: " + (K === "[object Object]" ? "object with keys {" + Object.keys(C).join(", ") + "}" : K) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return se;
  }
  function B(C, K, le) {
    if (C == null) return C;
    var ce = [], xe = 0;
    return q(C, ce, "", "", function(Ce) {
      return K.call(le, Ce, xe++);
    }), ce;
  }
  function Y(C) {
    if (C._status === -1) {
      var K = C._result;
      K = K(), K.then(
        function(le) {
          (C._status === 0 || C._status === -1) && (C._status = 1, C._result = le);
        },
        function(le) {
          (C._status === 0 || C._status === -1) && (C._status = 2, C._result = le);
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
  }, ne = {
    map: B,
    forEach: function(C, K, le) {
      B(
        C,
        function() {
          K.apply(this, arguments);
        },
        le
      );
    },
    count: function(C) {
      var K = 0;
      return B(C, function() {
        K++;
      }), K;
    },
    toArray: function(C) {
      return B(C, function(K) {
        return K;
      }) || [];
    },
    only: function(C) {
      if (!oe(C))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return C;
    }
  };
  return Re.Activity = b, Re.Children = ne, Re.Component = O, Re.Fragment = i, Re.Profiler = o, Re.PureComponent = z, Re.StrictMode = s, Re.Suspense = v, Re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W, Re.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(C) {
      return W.H.useMemoCache(C);
    }
  }, Re.cache = function(C) {
    return function() {
      return C.apply(null, arguments);
    };
  }, Re.cacheSignal = function() {
    return null;
  }, Re.cloneElement = function(C, K, le) {
    if (C == null)
      throw Error(
        "The argument must be a React element, but you passed " + C + "."
      );
    var ce = T({}, C.props), xe = C.key;
    if (K != null)
      for (Ce in K.key !== void 0 && (xe = "" + K.key), K)
        !M.call(K, Ce) || Ce === "key" || Ce === "__self" || Ce === "__source" || Ce === "ref" && K.ref === void 0 || (ce[Ce] = K[Ce]);
    var Ce = arguments.length - 2;
    if (Ce === 1) ce.children = le;
    else if (1 < Ce) {
      for (var se = Array(Ce), _e = 0; _e < Ce; _e++)
        se[_e] = arguments[_e + 2];
      ce.children = se;
    }
    return V(C.type, xe, ce);
  }, Re.createContext = function(C) {
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
  }, Re.createElement = function(C, K, le) {
    var ce, xe = {}, Ce = null;
    if (K != null)
      for (ce in K.key !== void 0 && (Ce = "" + K.key), K)
        M.call(K, ce) && ce !== "key" && ce !== "__self" && ce !== "__source" && (xe[ce] = K[ce]);
    var se = arguments.length - 2;
    if (se === 1) xe.children = le;
    else if (1 < se) {
      for (var _e = Array(se), Ne = 0; Ne < se; Ne++)
        _e[Ne] = arguments[Ne + 2];
      xe.children = _e;
    }
    if (C && C.defaultProps)
      for (ce in se = C.defaultProps, se)
        xe[ce] === void 0 && (xe[ce] = se[ce]);
    return V(C, Ce, xe);
  }, Re.createRef = function() {
    return { current: null };
  }, Re.forwardRef = function(C) {
    return { $$typeof: m, render: C };
  }, Re.isValidElement = oe, Re.lazy = function(C) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: C },
      _init: Y
    };
  }, Re.memo = function(C, K) {
    return {
      $$typeof: p,
      type: C,
      compare: K === void 0 ? null : K
    };
  }, Re.startTransition = function(C) {
    var K = W.T, le = {};
    W.T = le;
    try {
      var ce = C(), xe = W.S;
      xe !== null && xe(le, ce), typeof ce == "object" && ce !== null && typeof ce.then == "function" && ce.then(I, Q);
    } catch (Ce) {
      Q(Ce);
    } finally {
      K !== null && le.types !== null && (K.types = le.types), W.T = K;
    }
  }, Re.unstable_useCacheRefresh = function() {
    return W.H.useCacheRefresh();
  }, Re.use = function(C) {
    return W.H.use(C);
  }, Re.useActionState = function(C, K, le) {
    return W.H.useActionState(C, K, le);
  }, Re.useCallback = function(C, K) {
    return W.H.useCallback(C, K);
  }, Re.useContext = function(C) {
    return W.H.useContext(C);
  }, Re.useDebugValue = function() {
  }, Re.useDeferredValue = function(C, K) {
    return W.H.useDeferredValue(C, K);
  }, Re.useEffect = function(C, K) {
    return W.H.useEffect(C, K);
  }, Re.useEffectEvent = function(C) {
    return W.H.useEffectEvent(C);
  }, Re.useId = function() {
    return W.H.useId();
  }, Re.useImperativeHandle = function(C, K, le) {
    return W.H.useImperativeHandle(C, K, le);
  }, Re.useInsertionEffect = function(C, K) {
    return W.H.useInsertionEffect(C, K);
  }, Re.useLayoutEffect = function(C, K) {
    return W.H.useLayoutEffect(C, K);
  }, Re.useMemo = function(C, K) {
    return W.H.useMemo(C, K);
  }, Re.useOptimistic = function(C, K) {
    return W.H.useOptimistic(C, K);
  }, Re.useReducer = function(C, K, le) {
    return W.H.useReducer(C, K, le);
  }, Re.useRef = function(C) {
    return W.H.useRef(C);
  }, Re.useState = function(C) {
    return W.H.useState(C);
  }, Re.useSyncExternalStore = function(C, K, le) {
    return W.H.useSyncExternalStore(
      C,
      K,
      le
    );
  }, Re.useTransition = function() {
    return W.H.useTransition();
  }, Re.version = "19.2.5", Re;
}
var gg;
function Gd() {
  return gg || (gg = 1, _f.exports = HE()), _f.exports;
}
var x = Gd();
const $E = /* @__PURE__ */ BE(x), YE = /* @__PURE__ */ VE({
  __proto__: null,
  default: $E
}, [x]);
var Df = { exports: {} }, _r = {}, zf = { exports: {} }, Of = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yg;
function FE() {
  return yg || (yg = 1, (function(n) {
    function a(q, B) {
      var Y = q.length;
      q.push(B);
      e: for (; 0 < Y; ) {
        var Q = Y - 1 >>> 1, ne = q[Q];
        if (0 < o(ne, B))
          q[Q] = B, q[Y] = ne, Y = Q;
        else break e;
      }
    }
    function i(q) {
      return q.length === 0 ? null : q[0];
    }
    function s(q) {
      if (q.length === 0) return null;
      var B = q[0], Y = q.pop();
      if (Y !== B) {
        q[0] = Y;
        e: for (var Q = 0, ne = q.length, C = ne >>> 1; Q < C; ) {
          var K = 2 * (Q + 1) - 1, le = q[K], ce = K + 1, xe = q[ce];
          if (0 > o(le, Y))
            ce < ne && 0 > o(xe, le) ? (q[Q] = xe, q[ce] = Y, Q = ce) : (q[Q] = le, q[K] = Y, Q = K);
          else if (ce < ne && 0 > o(xe, Y))
            q[Q] = xe, q[ce] = Y, Q = ce;
          else break e;
        }
      }
      return B;
    }
    function o(q, B) {
      var Y = q.sortIndex - B.sortIndex;
      return Y !== 0 ? Y : q.id - B.id;
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
    var v = [], p = [], y = 1, b = null, S = 3, w = !1, j = !1, T = !1, R = !1, O = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, z = typeof setImmediate < "u" ? setImmediate : null;
    function k(q) {
      for (var B = i(p); B !== null; ) {
        if (B.callback === null) s(p);
        else if (B.startTime <= q)
          s(p), B.sortIndex = B.expirationTime, a(v, B);
        else break;
        B = i(p);
      }
    }
    function J(q) {
      if (T = !1, k(q), !j)
        if (i(v) !== null)
          j = !0, I || (I = !0, ue());
        else {
          var B = i(p);
          B !== null && re(J, B.startTime - q);
        }
    }
    var I = !1, W = -1, M = 5, V = -1;
    function P() {
      return R ? !0 : !(n.unstable_now() - V < M);
    }
    function oe() {
      if (R = !1, I) {
        var q = n.unstable_now();
        V = q;
        var B = !0;
        try {
          e: {
            j = !1, T && (T = !1, D(W), W = -1), w = !0;
            var Y = S;
            try {
              t: {
                for (k(q), b = i(v); b !== null && !(b.expirationTime > q && P()); ) {
                  var Q = b.callback;
                  if (typeof Q == "function") {
                    b.callback = null, S = b.priorityLevel;
                    var ne = Q(
                      b.expirationTime <= q
                    );
                    if (q = n.unstable_now(), typeof ne == "function") {
                      b.callback = ne, k(q), B = !0;
                      break t;
                    }
                    b === i(v) && s(v), k(q);
                  } else s(v);
                  b = i(v);
                }
                if (b !== null) B = !0;
                else {
                  var C = i(p);
                  C !== null && re(
                    J,
                    C.startTime - q
                  ), B = !1;
                }
              }
              break e;
            } finally {
              b = null, S = Y, w = !1;
            }
            B = void 0;
          }
        } finally {
          B ? ue() : I = !1;
        }
      }
    }
    var ue;
    if (typeof z == "function")
      ue = function() {
        z(oe);
      };
    else if (typeof MessageChannel < "u") {
      var Ee = new MessageChannel(), we = Ee.port2;
      Ee.port1.onmessage = oe, ue = function() {
        we.postMessage(null);
      };
    } else
      ue = function() {
        O(oe, 0);
      };
    function re(q, B) {
      W = O(function() {
        q(n.unstable_now());
      }, B);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(q) {
      q.callback = null;
    }, n.unstable_forceFrameRate = function(q) {
      0 > q || 125 < q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : M = 0 < q ? Math.floor(1e3 / q) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(q) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = S;
      }
      var Y = S;
      S = B;
      try {
        return q();
      } finally {
        S = Y;
      }
    }, n.unstable_requestPaint = function() {
      R = !0;
    }, n.unstable_runWithPriority = function(q, B) {
      switch (q) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          q = 3;
      }
      var Y = S;
      S = q;
      try {
        return B();
      } finally {
        S = Y;
      }
    }, n.unstable_scheduleCallback = function(q, B, Y) {
      var Q = n.unstable_now();
      switch (typeof Y == "object" && Y !== null ? (Y = Y.delay, Y = typeof Y == "number" && 0 < Y ? Q + Y : Q) : Y = Q, q) {
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
      return ne = Y + ne, q = {
        id: y++,
        callback: B,
        priorityLevel: q,
        startTime: Y,
        expirationTime: ne,
        sortIndex: -1
      }, Y > Q ? (q.sortIndex = Y, a(p, q), i(v) === null && q === i(p) && (T ? (D(W), W = -1) : T = !0, re(J, Y - Q))) : (q.sortIndex = ne, a(v, q), j || w || (j = !0, I || (I = !0, ue()))), q;
    }, n.unstable_shouldYield = P, n.unstable_wrapCallback = function(q) {
      var B = S;
      return function() {
        var Y = S;
        S = B;
        try {
          return q.apply(this, arguments);
        } finally {
          S = Y;
        }
      };
    };
  })(Of)), Of;
}
var bg;
function GE() {
  return bg || (bg = 1, zf.exports = FE()), zf.exports;
}
var Lf = { exports: {} }, kt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xg;
function XE() {
  if (xg) return kt;
  xg = 1;
  var n = Gd();
  function a(v) {
    var p = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        p += "&args[]=" + encodeURIComponent(arguments[y]);
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
  function c(v, p, y) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: b == null ? null : "" + b,
      children: v,
      containerInfo: p,
      implementation: y
    };
  }
  var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(v, p) {
    if (v === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return kt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, kt.createPortal = function(v, p) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return c(v, p, null, y);
  }, kt.flushSync = function(v) {
    var p = h.T, y = s.p;
    try {
      if (h.T = null, s.p = 2, v) return v();
    } finally {
      h.T = p, s.p = y, s.d.f();
    }
  }, kt.preconnect = function(v, p) {
    typeof v == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(v, p));
  }, kt.prefetchDNS = function(v) {
    typeof v == "string" && s.d.D(v);
  }, kt.preinit = function(v, p) {
    if (typeof v == "string" && p && typeof p.as == "string") {
      var y = p.as, b = m(y, p.crossOrigin), S = typeof p.integrity == "string" ? p.integrity : void 0, w = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      y === "style" ? s.d.S(
        v,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: b,
          integrity: S,
          fetchPriority: w
        }
      ) : y === "script" && s.d.X(v, {
        crossOrigin: b,
        integrity: S,
        fetchPriority: w,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, kt.preinitModule = function(v, p) {
    if (typeof v == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var y = m(
            p.as,
            p.crossOrigin
          );
          s.d.M(v, {
            crossOrigin: y,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && s.d.M(v);
  }, kt.preload = function(v, p) {
    if (typeof v == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var y = p.as, b = m(y, p.crossOrigin);
      s.d.L(v, y, {
        crossOrigin: b,
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
  }, kt.preloadModule = function(v, p) {
    if (typeof v == "string")
      if (p) {
        var y = m(p.as, p.crossOrigin);
        s.d.m(v, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: y,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(v);
  }, kt.requestFormReset = function(v) {
    s.d.r(v);
  }, kt.unstable_batchedUpdates = function(v, p) {
    return v(p);
  }, kt.useFormState = function(v, p, y) {
    return h.H.useFormState(v, p, y);
  }, kt.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, kt.version = "19.2.5", kt;
}
var Sg;
function IE() {
  if (Sg) return Lf.exports;
  Sg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Lf.exports = XE(), Lf.exports;
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
var Eg;
function KE() {
  if (Eg) return _r;
  Eg = 1;
  var n = GE(), a = Gd(), i = IE();
  function s(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function c(e) {
    var t = e, l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (l = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? l : null;
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
    for (var l = e, r = t; ; ) {
      var u = l.return;
      if (u === null) break;
      var f = u.alternate;
      if (f === null) {
        if (r = u.return, r !== null) {
          l = r;
          continue;
        }
        break;
      }
      if (u.child === f.child) {
        for (f = u.child; f; ) {
          if (f === l) return v(u), e;
          if (f === r) return v(u), t;
          f = f.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== r.return) l = u, r = f;
      else {
        for (var g = !1, E = u.child; E; ) {
          if (E === l) {
            g = !0, l = u, r = f;
            break;
          }
          if (E === r) {
            g = !0, r = u, l = f;
            break;
          }
          E = E.sibling;
        }
        if (!g) {
          for (E = f.child; E; ) {
            if (E === l) {
              g = !0, l = f, r = u;
              break;
            }
            if (E === r) {
              g = !0, r = f, l = u;
              break;
            }
            E = E.sibling;
          }
          if (!g) throw Error(s(189));
        }
      }
      if (l.alternate !== r) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? e : t;
  }
  function y(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = y(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign, S = Symbol.for("react.element"), w = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), z = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), I = Symbol.for("react.suspense_list"), W = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), V = Symbol.for("react.activity"), P = Symbol.for("react.memo_cache_sentinel"), oe = Symbol.iterator;
  function ue(e) {
    return e === null || typeof e != "object" ? null : (e = oe && e[oe] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ee = Symbol.for("react.client.reference");
  function we(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ee ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case T:
        return "Fragment";
      case O:
        return "Profiler";
      case R:
        return "StrictMode";
      case J:
        return "Suspense";
      case I:
        return "SuspenseList";
      case V:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case z:
          return e.displayName || "Context";
        case D:
          return (e._context.displayName || "Context") + ".Consumer";
        case k:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case W:
          return t = e.displayName || null, t !== null ? t : we(e.type) || "Memo";
        case M:
          t = e._payload, e = e._init;
          try {
            return we(e(t));
          } catch {
          }
      }
    return null;
  }
  var re = Array.isArray, q = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Q = [], ne = -1;
  function C(e) {
    return { current: e };
  }
  function K(e) {
    0 > ne || (e.current = Q[ne], Q[ne] = null, ne--);
  }
  function le(e, t) {
    ne++, Q[ne] = e.current, e.current = t;
  }
  var ce = C(null), xe = C(null), Ce = C(null), se = C(null);
  function _e(e, t) {
    switch (le(Ce, t), le(xe, e), le(ce, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Vv(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Vv(t), e = Bv(t, e);
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
    K(ce), le(ce, e);
  }
  function Ne() {
    K(ce), K(xe), K(Ce);
  }
  function Fe(e) {
    e.memoizedState !== null && le(se, e);
    var t = ce.current, l = Bv(t, e.type);
    t !== l && (le(xe, e), le(ce, l));
  }
  function Lt(e) {
    xe.current === e && (K(ce), K(xe)), se.current === e && (K(se), Cr._currentValue = Y);
  }
  var Gt, ut;
  function Ut(e) {
    if (Gt === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        Gt = t && t[1] || "", ut = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Gt + e + ut;
  }
  var ya = !1;
  function ll(e, t) {
    if (!e || ya) return "";
    ya = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var te = function() {
                throw Error();
              };
              if (Object.defineProperty(te.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(te, []);
                } catch (X) {
                  var G = X;
                }
                Reflect.construct(e, [], te);
              } else {
                try {
                  te.call();
                } catch (X) {
                  G = X;
                }
                e.call(te.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (X) {
                G = X;
              }
              (te = e()) && typeof te.catch == "function" && te.catch(function() {
              });
            }
          } catch (X) {
            if (X && G && typeof X.stack == "string")
              return [X.stack, G.stack];
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
      var f = r.DetermineComponentFrameRoot(), g = f[0], E = f[1];
      if (g && E) {
        var N = g.split(`
`), $ = E.split(`
`);
        for (u = r = 0; r < N.length && !N[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; u < $.length && !$[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (r === N.length || u === $.length)
          for (r = N.length - 1, u = $.length - 1; 1 <= r && 0 <= u && N[r] !== $[u]; )
            u--;
        for (; 1 <= r && 0 <= u; r--, u--)
          if (N[r] !== $[u]) {
            if (r !== 1 || u !== 1)
              do
                if (r--, u--, 0 > u || N[r] !== $[u]) {
                  var Z = `
` + N[r].replace(" at new ", " at ");
                  return e.displayName && Z.includes("<anonymous>") && (Z = Z.replace("<anonymous>", e.displayName)), Z;
                }
              while (1 <= r && 0 <= u);
            break;
          }
      }
    } finally {
      ya = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Ut(l) : "";
  }
  function Nn(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ut(e.type);
      case 16:
        return Ut("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ut("Suspense Fallback") : Ut("Suspense");
      case 19:
        return Ut("SuspenseList");
      case 0:
      case 15:
        return ll(e.type, !1);
      case 11:
        return ll(e.type.render, !1);
      case 1:
        return ll(e.type, !0);
      case 31:
        return Ut("Activity");
      default:
        return "";
    }
  }
  function Ul(e) {
    try {
      var t = "", l = null;
      do
        t += Nn(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var Bn = Object.prototype.hasOwnProperty, ba = n.unstable_scheduleCallback, il = n.unstable_cancelCallback, qi = n.unstable_shouldYield, Hi = n.unstable_requestPaint, he = n.unstable_now, Ae = n.unstable_getCurrentPriorityLevel, Ye = n.unstable_ImmediatePriority, dt = n.unstable_UserBlockingPriority, fn = n.unstable_NormalPriority, An = n.unstable_LowPriority, dn = n.unstable_IdlePriority, us = n.log, xu = n.unstable_setDisableYieldValue, In = null, $t = null;
  function Nt(e) {
    if (typeof us == "function" && xu(e), $t && typeof $t.setStrictMode == "function")
      try {
        $t.setStrictMode(In, e);
      } catch {
      }
  }
  var Vt = Math.clz32 ? Math.clz32 : Su, cs = Math.log, fs = Math.LN2;
  function Su(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (cs(e) / fs | 0) | 0;
  }
  var rl = 256, Kn = 262144, sl = 4194304;
  function Rn(e) {
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
  function Vl(e, t, l) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var u = 0, f = e.suspendedLanes, g = e.pingedLanes;
    e = e.warmLanes;
    var E = r & 134217727;
    return E !== 0 ? (r = E & ~f, r !== 0 ? u = Rn(r) : (g &= E, g !== 0 ? u = Rn(g) : l || (l = E & ~e, l !== 0 && (u = Rn(l))))) : (E = r & ~f, E !== 0 ? u = Rn(E) : g !== 0 ? u = Rn(g) : l || (l = r & ~e, l !== 0 && (u = Rn(l)))), u === 0 ? 0 : t !== 0 && t !== u && (t & f) === 0 && (f = u & -u, l = t & -t, f >= l || f === 32 && (l & 4194048) !== 0) ? t : u;
  }
  function xa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Eu(e, t) {
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
  function $i() {
    var e = sl;
    return sl <<= 1, (sl & 62914560) === 0 && (sl = 4194304), e;
  }
  function Sa(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function kn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function ds(e, t, l, r, u, f) {
    var g = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var E = e.entanglements, N = e.expirationTimes, $ = e.hiddenUpdates;
    for (l = g & ~l; 0 < l; ) {
      var Z = 31 - Vt(l), te = 1 << Z;
      E[Z] = 0, N[Z] = -1;
      var G = $[Z];
      if (G !== null)
        for ($[Z] = null, Z = 0; Z < G.length; Z++) {
          var X = G[Z];
          X !== null && (X.lane &= -536870913);
        }
      l &= ~te;
    }
    r !== 0 && hs(e, r, 0), f !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(g & ~t));
  }
  function hs(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var r = 31 - Vt(t);
    e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | l & 261930;
  }
  function ms(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var r = 31 - Vt(l), u = 1 << r;
      u & t | e[r] & t && (e[r] |= t), l &= ~u;
    }
  }
  function A(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : L(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
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
  function F(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ae() {
    var e = B.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : sg(e.type));
  }
  function ie(e, t) {
    var l = B.p;
    try {
      return B.p = e, t();
    } finally {
      B.p = l;
    }
  }
  var ve = Math.random().toString(36).slice(2), fe = "__reactFiber$" + ve, de = "__reactProps$" + ve, ye = "__reactContainer$" + ve, me = "__reactEvents$" + ve, Te = "__reactListeners$" + ve, Se = "__reactHandles$" + ve, Ge = "__reactResources$" + ve, Oe = "__reactMarker$" + ve;
  function nt(e) {
    delete e[fe], delete e[de], delete e[me], delete e[Te], delete e[Se];
  }
  function Je(e) {
    var t = e[fe];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[ye] || l[fe]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Gv(e); e !== null; ) {
            if (l = e[fe]) return l;
            e = Gv(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function ct(e) {
    if (e = e[fe] || e[ye]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ve(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function xt(e) {
    var t = e[Ge];
    return t || (t = e[Ge] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function lt(e) {
    e[Oe] = !0;
  }
  var Ea = /* @__PURE__ */ new Set(), _n = {};
  function At(e, t) {
    qn(e, t), qn(e + "Capture", t);
  }
  function qn(e, t) {
    for (_n[e] = t, e = 0; e < t.length; e++)
      Ea.add(t[e]);
  }
  var ol = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Hn = {}, ul = {};
  function Bl(e) {
    return Bn.call(ul, e) ? !0 : Bn.call(Hn, e) ? !1 : ol.test(e) ? ul[e] = !0 : (Hn[e] = !0, !1);
  }
  function Le(e, t, l) {
    if (Bl(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var r = t.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
  }
  function vt(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function Bt(e, t, l, r) {
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
      e.setAttributeNS(t, l, "" + r);
    }
  }
  function St(e) {
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
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function kl(e, t, l) {
    var r = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var u = r.get, f = r.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(g) {
          l = "" + g, f.call(this, g);
        }
      }), Object.defineProperty(e, t, {
        enumerable: r.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(g) {
          l = "" + g;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function ql(e) {
    if (!e._valueTracker) {
      var t = it(e) ? "checked" : "value";
      e._valueTracker = kl(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function ps(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), r = "";
    return e && (r = it(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== l ? (t.setValue(e), !0) : !1;
  }
  function vs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var _S = /[\n"\\]/g;
  function hn(e) {
    return e.replace(
      _S,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function wu(e, t, l, r, u, f, g, E) {
    e.name = "", g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" ? e.type = g : e.removeAttribute("type"), t != null ? g === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + St(t)) : e.value !== "" + St(t) && (e.value = "" + St(t)) : g !== "submit" && g !== "reset" || e.removeAttribute("value"), t != null ? ju(e, g, St(t)) : l != null ? ju(e, g, St(l)) : r != null && e.removeAttribute("value"), u == null && f != null && (e.defaultChecked = !!f), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + St(E) : e.removeAttribute("name");
  }
  function _h(e, t, l, r, u, f, g, E) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), t != null || l != null) {
      if (!(f !== "submit" && f !== "reset" || t != null)) {
        ql(e);
        return;
      }
      l = l != null ? "" + St(l) : "", t = t != null ? "" + St(t) : l, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = r ?? u, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = E ? e.checked : !!r, e.defaultChecked = !!r, g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (e.name = g), ql(e);
  }
  function ju(e, t, l) {
    t === "number" && vs(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function Hl(e, t, l, r) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < l.length; u++)
        t["$" + l[u]] = !0;
      for (l = 0; l < e.length; l++)
        u = t.hasOwnProperty("$" + e[l].value), e[l].selected !== u && (e[l].selected = u), u && r && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + St(l), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === l) {
          e[u].selected = !0, r && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Dh(e, t, l) {
    if (t != null && (t = "" + St(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + St(l) : "";
  }
  function zh(e, t, l, r) {
    if (t == null) {
      if (r != null) {
        if (l != null) throw Error(s(92));
        if (re(r)) {
          if (1 < r.length) throw Error(s(93));
          r = r[0];
        }
        l = r;
      }
      l == null && (l = ""), t = l;
    }
    l = St(t), e.defaultValue = l, r = e.textContent, r === l && r !== "" && r !== null && (e.value = r), ql(e);
  }
  function $l(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var DS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Oh(e, t, l) {
    var r = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, l) : typeof l != "number" || l === 0 || DS.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function Lh(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, l != null) {
      for (var r in l)
        !l.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var u in t)
        r = t[u], t.hasOwnProperty(u) && l[u] !== r && Oh(e, u, r);
    } else
      for (var f in t)
        t.hasOwnProperty(f) && Oh(e, f, t[f]);
  }
  function Tu(e) {
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
  var zS = /* @__PURE__ */ new Map([
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
  ]), OS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function gs(e) {
    return OS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Qn() {
  }
  var Cu = null;
  function Mu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Yl = null, Fl = null;
  function Uh(e) {
    var t = ct(e);
    if (t && (e = t.stateNode)) {
      var l = e[de] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (wu(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), t = l.name, l.type === "radio" && t != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + hn(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var r = l[t];
              if (r !== e && r.form === e.form) {
                var u = r[de] || null;
                if (!u) throw Error(s(90));
                wu(
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
            for (t = 0; t < l.length; t++)
              r = l[t], r.form === e.form && ps(r);
          }
          break e;
        case "textarea":
          Dh(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && Hl(e, !!l.multiple, t, !1);
      }
    }
  }
  var Nu = !1;
  function Vh(e, t, l) {
    if (Nu) return e(t, l);
    Nu = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (Nu = !1, (Yl !== null || Fl !== null) && (lo(), Yl && (t = Yl, e = Fl, Fl = Yl = null, Uh(t), e)))
        for (t = 0; t < e.length; t++) Uh(e[t]);
    }
  }
  function Yi(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var r = l[de] || null;
    if (r === null) return null;
    l = r[t];
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
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        s(231, t, typeof l)
      );
    return l;
  }
  var Zn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Au = !1;
  if (Zn)
    try {
      var Fi = {};
      Object.defineProperty(Fi, "passive", {
        get: function() {
          Au = !0;
        }
      }), window.addEventListener("test", Fi, Fi), window.removeEventListener("test", Fi, Fi);
    } catch {
      Au = !1;
    }
  var wa = null, Ru = null, ys = null;
  function Bh() {
    if (ys) return ys;
    var e, t = Ru, l = t.length, r, u = "value" in wa ? wa.value : wa.textContent, f = u.length;
    for (e = 0; e < l && t[e] === u[e]; e++) ;
    var g = l - e;
    for (r = 1; r <= g && t[l - r] === u[f - r]; r++) ;
    return ys = u.slice(e, 1 < r ? 1 - r : void 0);
  }
  function bs(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function xs() {
    return !0;
  }
  function kh() {
    return !1;
  }
  function Xt(e) {
    function t(l, r, u, f, g) {
      this._reactName = l, this._targetInst = u, this.type = r, this.nativeEvent = f, this.target = g, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (l = e[E], this[E] = l ? l(f) : f[E]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? xs : kh, this.isPropagationStopped = kh, this;
    }
    return b(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = xs);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = xs);
      },
      persist: function() {
      },
      isPersistent: xs
    }), t;
  }
  var cl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ss = Xt(cl), Gi = b({}, cl, { view: 0, detail: 0 }), LS = Xt(Gi), _u, Du, Xi, Es = b({}, Gi, {
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
    getModifierState: Ou,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Xi && (Xi && e.type === "mousemove" ? (_u = e.screenX - Xi.screenX, Du = e.screenY - Xi.screenY) : Du = _u = 0, Xi = e), _u);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Du;
    }
  }), qh = Xt(Es), US = b({}, Es, { dataTransfer: 0 }), VS = Xt(US), BS = b({}, Gi, { relatedTarget: 0 }), zu = Xt(BS), kS = b({}, cl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), qS = Xt(kS), HS = b({}, cl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), $S = Xt(HS), YS = b({}, cl, { data: 0 }), Hh = Xt(YS), FS = {
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
  }, GS = {
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
  }, XS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function IS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = XS[e]) ? !!t[e] : !1;
  }
  function Ou() {
    return IS;
  }
  var KS = b({}, Gi, {
    key: function(e) {
      if (e.key) {
        var t = FS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = bs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? GS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ou,
    charCode: function(e) {
      return e.type === "keypress" ? bs(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? bs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), QS = Xt(KS), ZS = b({}, Es, {
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
  }), $h = Xt(ZS), PS = b({}, Gi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ou
  }), JS = Xt(PS), WS = b({}, cl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), e1 = Xt(WS), t1 = b({}, Es, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), n1 = Xt(t1), a1 = b({}, cl, {
    newState: 0,
    oldState: 0
  }), l1 = Xt(a1), i1 = [9, 13, 27, 32], Lu = Zn && "CompositionEvent" in window, Ii = null;
  Zn && "documentMode" in document && (Ii = document.documentMode);
  var r1 = Zn && "TextEvent" in window && !Ii, Yh = Zn && (!Lu || Ii && 8 < Ii && 11 >= Ii), Fh = " ", Gh = !1;
  function Xh(e, t) {
    switch (e) {
      case "keyup":
        return i1.indexOf(t.keyCode) !== -1;
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
  function Ih(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Gl = !1;
  function s1(e, t) {
    switch (e) {
      case "compositionend":
        return Ih(t);
      case "keypress":
        return t.which !== 32 ? null : (Gh = !0, Fh);
      case "textInput":
        return e = t.data, e === Fh && Gh ? null : e;
      default:
        return null;
    }
  }
  function o1(e, t) {
    if (Gl)
      return e === "compositionend" || !Lu && Xh(e, t) ? (e = Bh(), ys = Ru = wa = null, Gl = !1, e) : null;
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
        return Yh && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var u1 = {
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
  function Kh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!u1[e.type] : t === "textarea";
  }
  function Qh(e, t, l, r) {
    Yl ? Fl ? Fl.push(r) : Fl = [r] : Yl = r, t = fo(t, "onChange"), 0 < t.length && (l = new Ss(
      "onChange",
      "change",
      null,
      l,
      r
    ), e.push({ event: l, listeners: t }));
  }
  var Ki = null, Qi = null;
  function c1(e) {
    _v(e, 0);
  }
  function ws(e) {
    var t = Ve(e);
    if (ps(t)) return e;
  }
  function Zh(e, t) {
    if (e === "change") return t;
  }
  var Ph = !1;
  if (Zn) {
    var Uu;
    if (Zn) {
      var Vu = "oninput" in document;
      if (!Vu) {
        var Jh = document.createElement("div");
        Jh.setAttribute("oninput", "return;"), Vu = typeof Jh.oninput == "function";
      }
      Uu = Vu;
    } else Uu = !1;
    Ph = Uu && (!document.documentMode || 9 < document.documentMode);
  }
  function Wh() {
    Ki && (Ki.detachEvent("onpropertychange", em), Qi = Ki = null);
  }
  function em(e) {
    if (e.propertyName === "value" && ws(Qi)) {
      var t = [];
      Qh(
        t,
        Qi,
        e,
        Mu(e)
      ), Vh(c1, t);
    }
  }
  function f1(e, t, l) {
    e === "focusin" ? (Wh(), Ki = t, Qi = l, Ki.attachEvent("onpropertychange", em)) : e === "focusout" && Wh();
  }
  function d1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ws(Qi);
  }
  function h1(e, t) {
    if (e === "click") return ws(t);
  }
  function m1(e, t) {
    if (e === "input" || e === "change")
      return ws(t);
  }
  function p1(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Wt = typeof Object.is == "function" ? Object.is : p1;
  function Zi(e, t) {
    if (Wt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), r = Object.keys(t);
    if (l.length !== r.length) return !1;
    for (r = 0; r < l.length; r++) {
      var u = l[r];
      if (!Bn.call(t, u) || !Wt(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function tm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function nm(e, t) {
    var l = tm(e);
    e = 0;
    for (var r; l; ) {
      if (l.nodeType === 3) {
        if (r = e + l.textContent.length, e <= t && r >= t)
          return { node: l, offset: t - e };
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
      l = tm(l);
    }
  }
  function am(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? am(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function lm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = vs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = vs(e.document);
    }
    return t;
  }
  function Bu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var v1 = Zn && "documentMode" in document && 11 >= document.documentMode, Xl = null, ku = null, Pi = null, qu = !1;
  function im(e, t, l) {
    var r = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    qu || Xl == null || Xl !== vs(r) || (r = Xl, "selectionStart" in r && Bu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), Pi && Zi(Pi, r) || (Pi = r, r = fo(ku, "onSelect"), 0 < r.length && (t = new Ss(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: r }), t.target = Xl)));
  }
  function fl(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var Il = {
    animationend: fl("Animation", "AnimationEnd"),
    animationiteration: fl("Animation", "AnimationIteration"),
    animationstart: fl("Animation", "AnimationStart"),
    transitionrun: fl("Transition", "TransitionRun"),
    transitionstart: fl("Transition", "TransitionStart"),
    transitioncancel: fl("Transition", "TransitionCancel"),
    transitionend: fl("Transition", "TransitionEnd")
  }, Hu = {}, rm = {};
  Zn && (rm = document.createElement("div").style, "AnimationEvent" in window || (delete Il.animationend.animation, delete Il.animationiteration.animation, delete Il.animationstart.animation), "TransitionEvent" in window || delete Il.transitionend.transition);
  function dl(e) {
    if (Hu[e]) return Hu[e];
    if (!Il[e]) return e;
    var t = Il[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in rm)
        return Hu[e] = t[l];
    return e;
  }
  var sm = dl("animationend"), om = dl("animationiteration"), um = dl("animationstart"), g1 = dl("transitionrun"), y1 = dl("transitionstart"), b1 = dl("transitioncancel"), cm = dl("transitionend"), fm = /* @__PURE__ */ new Map(), $u = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  $u.push("scrollEnd");
  function Dn(e, t) {
    fm.set(e, t), At(t, [e]);
  }
  var js = typeof reportError == "function" ? reportError : function(e) {
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
  }, mn = [], Kl = 0, Yu = 0;
  function Ts() {
    for (var e = Kl, t = Yu = Kl = 0; t < e; ) {
      var l = mn[t];
      mn[t++] = null;
      var r = mn[t];
      mn[t++] = null;
      var u = mn[t];
      mn[t++] = null;
      var f = mn[t];
      if (mn[t++] = null, r !== null && u !== null) {
        var g = r.pending;
        g === null ? u.next = u : (u.next = g.next, g.next = u), r.pending = u;
      }
      f !== 0 && dm(l, u, f);
    }
  }
  function Cs(e, t, l, r) {
    mn[Kl++] = e, mn[Kl++] = t, mn[Kl++] = l, mn[Kl++] = r, Yu |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function Fu(e, t, l, r) {
    return Cs(e, t, l, r), Ms(e);
  }
  function hl(e, t) {
    return Cs(e, null, null, t), Ms(e);
  }
  function dm(e, t, l) {
    e.lanes |= l;
    var r = e.alternate;
    r !== null && (r.lanes |= l);
    for (var u = !1, f = e.return; f !== null; )
      f.childLanes |= l, r = f.alternate, r !== null && (r.childLanes |= l), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (u = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, u && t !== null && (u = 31 - Vt(l), e = f.hiddenUpdates, r = e[u], r === null ? e[u] = [t] : r.push(t), t.lane = l | 536870912), f) : null;
  }
  function Ms(e) {
    if (50 < br)
      throw br = 0, Wc = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ql = {};
  function x1(e, t, l, r) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function en(e, t, l, r) {
    return new x1(e, t, l, r);
  }
  function Gu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Pn(e, t) {
    var l = e.alternate;
    return l === null ? (l = en(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function hm(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ns(e, t, l, r, u, f) {
    var g = 0;
    if (r = e, typeof e == "function") Gu(e) && (g = 1);
    else if (typeof e == "string")
      g = TE(
        e,
        l,
        ce.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case V:
          return e = en(31, l, t, u), e.elementType = V, e.lanes = f, e;
        case T:
          return ml(l.children, u, f, t);
        case R:
          g = 8, u |= 24;
          break;
        case O:
          return e = en(12, l, t, u | 2), e.elementType = O, e.lanes = f, e;
        case J:
          return e = en(13, l, t, u), e.elementType = J, e.lanes = f, e;
        case I:
          return e = en(19, l, t, u), e.elementType = I, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case z:
                g = 10;
                break e;
              case D:
                g = 9;
                break e;
              case k:
                g = 11;
                break e;
              case W:
                g = 14;
                break e;
              case M:
                g = 16, r = null;
                break e;
            }
          g = 29, l = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), r = null;
      }
    return t = en(g, l, t, u), t.elementType = e, t.type = r, t.lanes = f, t;
  }
  function ml(e, t, l, r) {
    return e = en(7, e, r, t), e.lanes = l, e;
  }
  function Xu(e, t, l) {
    return e = en(6, e, null, t), e.lanes = l, e;
  }
  function mm(e) {
    var t = en(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Iu(e, t, l) {
    return t = en(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = l, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var pm = /* @__PURE__ */ new WeakMap();
  function pn(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = pm.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Ul(t)
      }, pm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Ul(t)
    };
  }
  var Zl = [], Pl = 0, As = null, Ji = 0, vn = [], gn = 0, ja = null, $n = 1, Yn = "";
  function Jn(e, t) {
    Zl[Pl++] = Ji, Zl[Pl++] = As, As = e, Ji = t;
  }
  function vm(e, t, l) {
    vn[gn++] = $n, vn[gn++] = Yn, vn[gn++] = ja, ja = e;
    var r = $n;
    e = Yn;
    var u = 32 - Vt(r) - 1;
    r &= ~(1 << u), l += 1;
    var f = 32 - Vt(t) + u;
    if (30 < f) {
      var g = u - u % 5;
      f = (r & (1 << g) - 1).toString(32), r >>= g, u -= g, $n = 1 << 32 - Vt(t) + u | l << u | r, Yn = f + e;
    } else
      $n = 1 << f | l << u | r, Yn = e;
  }
  function Ku(e) {
    e.return !== null && (Jn(e, 1), vm(e, 1, 0));
  }
  function Qu(e) {
    for (; e === As; )
      As = Zl[--Pl], Zl[Pl] = null, Ji = Zl[--Pl], Zl[Pl] = null;
    for (; e === ja; )
      ja = vn[--gn], vn[gn] = null, Yn = vn[--gn], vn[gn] = null, $n = vn[--gn], vn[gn] = null;
  }
  function gm(e, t) {
    vn[gn++] = $n, vn[gn++] = Yn, vn[gn++] = ja, $n = t.id, Yn = t.overflow, ja = e;
  }
  var _t = null, rt = null, $e = !1, Ta = null, yn = !1, Zu = Error(s(519));
  function Ca(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Wi(pn(t, e)), Zu;
  }
  function ym(e) {
    var t = e.stateNode, l = e.type, r = e.memoizedProps;
    switch (t[fe] = e, t[de] = r, l) {
      case "dialog":
        ke("cancel", t), ke("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ke("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Sr.length; l++)
          ke(Sr[l], t);
        break;
      case "source":
        ke("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ke("error", t), ke("load", t);
        break;
      case "details":
        ke("toggle", t);
        break;
      case "input":
        ke("invalid", t), _h(
          t,
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
        ke("invalid", t);
        break;
      case "textarea":
        ke("invalid", t), zh(t, r.value, r.defaultValue, r.children);
    }
    l = r.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || r.suppressHydrationWarning === !0 || Lv(t.textContent, l) ? (r.popover != null && (ke("beforetoggle", t), ke("toggle", t)), r.onScroll != null && ke("scroll", t), r.onScrollEnd != null && ke("scrollend", t), r.onClick != null && (t.onclick = Qn), t = !0) : t = !1, t || Ca(e, !0);
  }
  function bm(e) {
    for (_t = e.return; _t; )
      switch (_t.tag) {
        case 5:
        case 31:
        case 13:
          yn = !1;
          return;
        case 27:
        case 3:
          yn = !0;
          return;
        default:
          _t = _t.return;
      }
  }
  function Jl(e) {
    if (e !== _t) return !1;
    if (!$e) return bm(e), $e = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || pf(e.type, e.memoizedProps)), l = !l), l && rt && Ca(e), bm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      rt = Fv(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      rt = Fv(e);
    } else
      t === 27 ? (t = rt, qa(e.type) ? (e = xf, xf = null, rt = e) : rt = t) : rt = _t ? xn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function pl() {
    rt = _t = null, $e = !1;
  }
  function Pu() {
    var e = Ta;
    return e !== null && (Zt === null ? Zt = e : Zt.push.apply(
      Zt,
      e
    ), Ta = null), e;
  }
  function Wi(e) {
    Ta === null ? Ta = [e] : Ta.push(e);
  }
  var Ju = C(null), vl = null, Wn = null;
  function Ma(e, t, l) {
    le(Ju, t._currentValue), t._currentValue = l;
  }
  function ea(e) {
    e._currentValue = Ju.current, K(Ju);
  }
  function Wu(e, t, l) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function ec(e, t, l, r) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var f = u.dependencies;
      if (f !== null) {
        var g = u.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var E = f;
          f = u;
          for (var N = 0; N < t.length; N++)
            if (E.context === t[N]) {
              f.lanes |= l, E = f.alternate, E !== null && (E.lanes |= l), Wu(
                f.return,
                l,
                e
              ), r || (g = null);
              break e;
            }
          f = E.next;
        }
      } else if (u.tag === 18) {
        if (g = u.return, g === null) throw Error(s(341));
        g.lanes |= l, f = g.alternate, f !== null && (f.lanes |= l), Wu(g, l, e), g = null;
      } else g = u.child;
      if (g !== null) g.return = u;
      else
        for (g = u; g !== null; ) {
          if (g === e) {
            g = null;
            break;
          }
          if (u = g.sibling, u !== null) {
            u.return = g.return, g = u;
            break;
          }
          g = g.return;
        }
      u = g;
    }
  }
  function Wl(e, t, l, r) {
    e = null;
    for (var u = t, f = !1; u !== null; ) {
      if (!f) {
        if ((u.flags & 524288) !== 0) f = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var g = u.alternate;
        if (g === null) throw Error(s(387));
        if (g = g.memoizedProps, g !== null) {
          var E = u.type;
          Wt(u.pendingProps.value, g.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (u === se.current) {
        if (g = u.alternate, g === null) throw Error(s(387));
        g.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Cr) : e = [Cr]);
      }
      u = u.return;
    }
    e !== null && ec(
      t,
      e,
      l,
      r
    ), t.flags |= 262144;
  }
  function Rs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Wt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function gl(e) {
    vl = e, Wn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Dt(e) {
    return xm(vl, e);
  }
  function _s(e, t) {
    return vl === null && gl(e), xm(e, t);
  }
  function xm(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, Wn === null) {
      if (e === null) throw Error(s(308));
      Wn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Wn = Wn.next = t;
    return l;
  }
  var S1 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(l, r) {
        e.push(r);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, E1 = n.unstable_scheduleCallback, w1 = n.unstable_NormalPriority, Et = {
    $$typeof: z,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function tc() {
    return {
      controller: new S1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function er(e) {
    e.refCount--, e.refCount === 0 && E1(w1, function() {
      e.controller.abort();
    });
  }
  var tr = null, nc = 0, ei = 0, ti = null;
  function j1(e, t) {
    if (tr === null) {
      var l = tr = [];
      nc = 0, ei = rf(), ti = {
        status: "pending",
        value: void 0,
        then: function(r) {
          l.push(r);
        }
      };
    }
    return nc++, t.then(Sm, Sm), t;
  }
  function Sm() {
    if (--nc === 0 && tr !== null) {
      ti !== null && (ti.status = "fulfilled");
      var e = tr;
      tr = null, ei = 0, ti = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function T1(e, t) {
    var l = [], r = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        l.push(u);
      }
    };
    return e.then(
      function() {
        r.status = "fulfilled", r.value = t;
        for (var u = 0; u < l.length; u++) (0, l[u])(t);
      },
      function(u) {
        for (r.status = "rejected", r.reason = u, u = 0; u < l.length; u++)
          (0, l[u])(void 0);
      }
    ), r;
  }
  var Em = q.S;
  q.S = function(e, t) {
    iv = he(), typeof t == "object" && t !== null && typeof t.then == "function" && j1(e, t), Em !== null && Em(e, t);
  };
  var yl = C(null);
  function ac() {
    var e = yl.current;
    return e !== null ? e : at.pooledCache;
  }
  function Ds(e, t) {
    t === null ? le(yl, yl.current) : le(yl, t.pool);
  }
  function wm() {
    var e = ac();
    return e === null ? null : { parent: Et._currentValue, pool: e };
  }
  var ni = Error(s(460)), lc = Error(s(474)), zs = Error(s(542)), Os = { then: function() {
  } };
  function jm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Tm(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(Qn, Qn), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Mm(e), e;
      default:
        if (typeof t.status == "string") t.then(Qn, Qn);
        else {
          if (e = at, e !== null && 100 < e.shellSuspendCounter)
            throw Error(s(482));
          e = t, e.status = "pending", e.then(
            function(r) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = r;
              }
            },
            function(r) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = r;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Mm(e), e;
        }
        throw xl = t, ni;
    }
  }
  function bl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (xl = l, ni) : l;
    }
  }
  var xl = null;
  function Cm() {
    if (xl === null) throw Error(s(459));
    var e = xl;
    return xl = null, e;
  }
  function Mm(e) {
    if (e === ni || e === zs)
      throw Error(s(483));
  }
  var ai = null, nr = 0;
  function Ls(e) {
    var t = nr;
    return nr += 1, ai === null && (ai = []), Tm(ai, e, t);
  }
  function ar(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Us(e, t) {
    throw t.$$typeof === S ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Nm(e) {
    function t(U, _) {
      if (e) {
        var H = U.deletions;
        H === null ? (U.deletions = [_], U.flags |= 16) : H.push(_);
      }
    }
    function l(U, _) {
      if (!e) return null;
      for (; _ !== null; )
        t(U, _), _ = _.sibling;
      return null;
    }
    function r(U) {
      for (var _ = /* @__PURE__ */ new Map(); U !== null; )
        U.key !== null ? _.set(U.key, U) : _.set(U.index, U), U = U.sibling;
      return _;
    }
    function u(U, _) {
      return U = Pn(U, _), U.index = 0, U.sibling = null, U;
    }
    function f(U, _, H) {
      return U.index = H, e ? (H = U.alternate, H !== null ? (H = H.index, H < _ ? (U.flags |= 67108866, _) : H) : (U.flags |= 67108866, _)) : (U.flags |= 1048576, _);
    }
    function g(U) {
      return e && U.alternate === null && (U.flags |= 67108866), U;
    }
    function E(U, _, H, ee) {
      return _ === null || _.tag !== 6 ? (_ = Xu(H, U.mode, ee), _.return = U, _) : (_ = u(_, H), _.return = U, _);
    }
    function N(U, _, H, ee) {
      var je = H.type;
      return je === T ? Z(
        U,
        _,
        H.props.children,
        ee,
        H.key
      ) : _ !== null && (_.elementType === je || typeof je == "object" && je !== null && je.$$typeof === M && bl(je) === _.type) ? (_ = u(_, H.props), ar(_, H), _.return = U, _) : (_ = Ns(
        H.type,
        H.key,
        H.props,
        null,
        U.mode,
        ee
      ), ar(_, H), _.return = U, _);
    }
    function $(U, _, H, ee) {
      return _ === null || _.tag !== 4 || _.stateNode.containerInfo !== H.containerInfo || _.stateNode.implementation !== H.implementation ? (_ = Iu(H, U.mode, ee), _.return = U, _) : (_ = u(_, H.children || []), _.return = U, _);
    }
    function Z(U, _, H, ee, je) {
      return _ === null || _.tag !== 7 ? (_ = ml(
        H,
        U.mode,
        ee,
        je
      ), _.return = U, _) : (_ = u(_, H), _.return = U, _);
    }
    function te(U, _, H) {
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return _ = Xu(
          "" + _,
          U.mode,
          H
        ), _.return = U, _;
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case w:
            return H = Ns(
              _.type,
              _.key,
              _.props,
              null,
              U.mode,
              H
            ), ar(H, _), H.return = U, H;
          case j:
            return _ = Iu(
              _,
              U.mode,
              H
            ), _.return = U, _;
          case M:
            return _ = bl(_), te(U, _, H);
        }
        if (re(_) || ue(_))
          return _ = ml(
            _,
            U.mode,
            H,
            null
          ), _.return = U, _;
        if (typeof _.then == "function")
          return te(U, Ls(_), H);
        if (_.$$typeof === z)
          return te(
            U,
            _s(U, _),
            H
          );
        Us(U, _);
      }
      return null;
    }
    function G(U, _, H, ee) {
      var je = _ !== null ? _.key : null;
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return je !== null ? null : E(U, _, "" + H, ee);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case w:
            return H.key === je ? N(U, _, H, ee) : null;
          case j:
            return H.key === je ? $(U, _, H, ee) : null;
          case M:
            return H = bl(H), G(U, _, H, ee);
        }
        if (re(H) || ue(H))
          return je !== null ? null : Z(U, _, H, ee, null);
        if (typeof H.then == "function")
          return G(
            U,
            _,
            Ls(H),
            ee
          );
        if (H.$$typeof === z)
          return G(
            U,
            _,
            _s(U, H),
            ee
          );
        Us(U, H);
      }
      return null;
    }
    function X(U, _, H, ee, je) {
      if (typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint")
        return U = U.get(H) || null, E(_, U, "" + ee, je);
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case w:
            return U = U.get(
              ee.key === null ? H : ee.key
            ) || null, N(_, U, ee, je);
          case j:
            return U = U.get(
              ee.key === null ? H : ee.key
            ) || null, $(_, U, ee, je);
          case M:
            return ee = bl(ee), X(
              U,
              _,
              H,
              ee,
              je
            );
        }
        if (re(ee) || ue(ee))
          return U = U.get(H) || null, Z(_, U, ee, je, null);
        if (typeof ee.then == "function")
          return X(
            U,
            _,
            H,
            Ls(ee),
            je
          );
        if (ee.$$typeof === z)
          return X(
            U,
            _,
            H,
            _s(_, ee),
            je
          );
        Us(_, ee);
      }
      return null;
    }
    function pe(U, _, H, ee) {
      for (var je = null, Xe = null, be = _, ze = _ = 0, He = null; be !== null && ze < H.length; ze++) {
        be.index > ze ? (He = be, be = null) : He = be.sibling;
        var Ie = G(
          U,
          be,
          H[ze],
          ee
        );
        if (Ie === null) {
          be === null && (be = He);
          break;
        }
        e && be && Ie.alternate === null && t(U, be), _ = f(Ie, _, ze), Xe === null ? je = Ie : Xe.sibling = Ie, Xe = Ie, be = He;
      }
      if (ze === H.length)
        return l(U, be), $e && Jn(U, ze), je;
      if (be === null) {
        for (; ze < H.length; ze++)
          be = te(U, H[ze], ee), be !== null && (_ = f(
            be,
            _,
            ze
          ), Xe === null ? je = be : Xe.sibling = be, Xe = be);
        return $e && Jn(U, ze), je;
      }
      for (be = r(be); ze < H.length; ze++)
        He = X(
          be,
          U,
          ze,
          H[ze],
          ee
        ), He !== null && (e && He.alternate !== null && be.delete(
          He.key === null ? ze : He.key
        ), _ = f(
          He,
          _,
          ze
        ), Xe === null ? je = He : Xe.sibling = He, Xe = He);
      return e && be.forEach(function(Ga) {
        return t(U, Ga);
      }), $e && Jn(U, ze), je;
    }
    function Me(U, _, H, ee) {
      if (H == null) throw Error(s(151));
      for (var je = null, Xe = null, be = _, ze = _ = 0, He = null, Ie = H.next(); be !== null && !Ie.done; ze++, Ie = H.next()) {
        be.index > ze ? (He = be, be = null) : He = be.sibling;
        var Ga = G(U, be, Ie.value, ee);
        if (Ga === null) {
          be === null && (be = He);
          break;
        }
        e && be && Ga.alternate === null && t(U, be), _ = f(Ga, _, ze), Xe === null ? je = Ga : Xe.sibling = Ga, Xe = Ga, be = He;
      }
      if (Ie.done)
        return l(U, be), $e && Jn(U, ze), je;
      if (be === null) {
        for (; !Ie.done; ze++, Ie = H.next())
          Ie = te(U, Ie.value, ee), Ie !== null && (_ = f(Ie, _, ze), Xe === null ? je = Ie : Xe.sibling = Ie, Xe = Ie);
        return $e && Jn(U, ze), je;
      }
      for (be = r(be); !Ie.done; ze++, Ie = H.next())
        Ie = X(be, U, ze, Ie.value, ee), Ie !== null && (e && Ie.alternate !== null && be.delete(Ie.key === null ? ze : Ie.key), _ = f(Ie, _, ze), Xe === null ? je = Ie : Xe.sibling = Ie, Xe = Ie);
      return e && be.forEach(function(UE) {
        return t(U, UE);
      }), $e && Jn(U, ze), je;
    }
    function tt(U, _, H, ee) {
      if (typeof H == "object" && H !== null && H.type === T && H.key === null && (H = H.props.children), typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case w:
            e: {
              for (var je = H.key; _ !== null; ) {
                if (_.key === je) {
                  if (je = H.type, je === T) {
                    if (_.tag === 7) {
                      l(
                        U,
                        _.sibling
                      ), ee = u(
                        _,
                        H.props.children
                      ), ee.return = U, U = ee;
                      break e;
                    }
                  } else if (_.elementType === je || typeof je == "object" && je !== null && je.$$typeof === M && bl(je) === _.type) {
                    l(
                      U,
                      _.sibling
                    ), ee = u(_, H.props), ar(ee, H), ee.return = U, U = ee;
                    break e;
                  }
                  l(U, _);
                  break;
                } else t(U, _);
                _ = _.sibling;
              }
              H.type === T ? (ee = ml(
                H.props.children,
                U.mode,
                ee,
                H.key
              ), ee.return = U, U = ee) : (ee = Ns(
                H.type,
                H.key,
                H.props,
                null,
                U.mode,
                ee
              ), ar(ee, H), ee.return = U, U = ee);
            }
            return g(U);
          case j:
            e: {
              for (je = H.key; _ !== null; ) {
                if (_.key === je)
                  if (_.tag === 4 && _.stateNode.containerInfo === H.containerInfo && _.stateNode.implementation === H.implementation) {
                    l(
                      U,
                      _.sibling
                    ), ee = u(_, H.children || []), ee.return = U, U = ee;
                    break e;
                  } else {
                    l(U, _);
                    break;
                  }
                else t(U, _);
                _ = _.sibling;
              }
              ee = Iu(H, U.mode, ee), ee.return = U, U = ee;
            }
            return g(U);
          case M:
            return H = bl(H), tt(
              U,
              _,
              H,
              ee
            );
        }
        if (re(H))
          return pe(
            U,
            _,
            H,
            ee
          );
        if (ue(H)) {
          if (je = ue(H), typeof je != "function") throw Error(s(150));
          return H = je.call(H), Me(
            U,
            _,
            H,
            ee
          );
        }
        if (typeof H.then == "function")
          return tt(
            U,
            _,
            Ls(H),
            ee
          );
        if (H.$$typeof === z)
          return tt(
            U,
            _,
            _s(U, H),
            ee
          );
        Us(U, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, _ !== null && _.tag === 6 ? (l(U, _.sibling), ee = u(_, H), ee.return = U, U = ee) : (l(U, _), ee = Xu(H, U.mode, ee), ee.return = U, U = ee), g(U)) : l(U, _);
    }
    return function(U, _, H, ee) {
      try {
        nr = 0;
        var je = tt(
          U,
          _,
          H,
          ee
        );
        return ai = null, je;
      } catch (be) {
        if (be === ni || be === zs) throw be;
        var Xe = en(29, be, null, U.mode);
        return Xe.lanes = ee, Xe.return = U, Xe;
      } finally {
      }
    };
  }
  var Sl = Nm(!0), Am = Nm(!1), Na = !1;
  function ic(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function rc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Aa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ra(e, t, l) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Ke & 2) !== 0) {
      var u = r.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), r.pending = t, t = Ms(e), dm(e, null, l), t;
    }
    return Cs(e, r, t, l), Ms(e);
  }
  function lr(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, l |= r, t.lanes = l, ms(e, l);
    }
  }
  function sc(e, t) {
    var l = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, l === r)) {
      var u = null, f = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var g = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          f === null ? u = f = g : f = f.next = g, l = l.next;
        } while (l !== null);
        f === null ? u = f = t : f = f.next = t;
      } else u = f = t;
      l = {
        baseState: r.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: f,
        shared: r.shared,
        callbacks: r.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var oc = !1;
  function ir() {
    if (oc) {
      var e = ti;
      if (e !== null) throw e;
    }
  }
  function rr(e, t, l, r) {
    oc = !1;
    var u = e.updateQueue;
    Na = !1;
    var f = u.firstBaseUpdate, g = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var N = E, $ = N.next;
      N.next = null, g === null ? f = $ : g.next = $, g = N;
      var Z = e.alternate;
      Z !== null && (Z = Z.updateQueue, E = Z.lastBaseUpdate, E !== g && (E === null ? Z.firstBaseUpdate = $ : E.next = $, Z.lastBaseUpdate = N));
    }
    if (f !== null) {
      var te = u.baseState;
      g = 0, Z = $ = N = null, E = f;
      do {
        var G = E.lane & -536870913, X = G !== E.lane;
        if (X ? (qe & G) === G : (r & G) === G) {
          G !== 0 && G === ei && (oc = !0), Z !== null && (Z = Z.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var pe = e, Me = E;
            G = t;
            var tt = l;
            switch (Me.tag) {
              case 1:
                if (pe = Me.payload, typeof pe == "function") {
                  te = pe.call(tt, te, G);
                  break e;
                }
                te = pe;
                break e;
              case 3:
                pe.flags = pe.flags & -65537 | 128;
              case 0:
                if (pe = Me.payload, G = typeof pe == "function" ? pe.call(tt, te, G) : pe, G == null) break e;
                te = b({}, te, G);
                break e;
              case 2:
                Na = !0;
            }
          }
          G = E.callback, G !== null && (e.flags |= 64, X && (e.flags |= 8192), X = u.callbacks, X === null ? u.callbacks = [G] : X.push(G));
        } else
          X = {
            lane: G,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, Z === null ? ($ = Z = X, N = te) : Z = Z.next = X, g |= G;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          X = E, E = X.next, X.next = null, u.lastBaseUpdate = X, u.shared.pending = null;
        }
      } while (!0);
      Z === null && (N = te), u.baseState = N, u.firstBaseUpdate = $, u.lastBaseUpdate = Z, f === null && (u.shared.lanes = 0), La |= g, e.lanes = g, e.memoizedState = te;
    }
  }
  function Rm(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function _m(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Rm(l[e], t);
  }
  var li = C(null), Vs = C(0);
  function Dm(e, t) {
    e = ua, le(Vs, e), le(li, t), ua = e | t.baseLanes;
  }
  function uc() {
    le(Vs, ua), le(li, li.current);
  }
  function cc() {
    ua = Vs.current, K(li), K(Vs);
  }
  var tn = C(null), bn = null;
  function _a(e) {
    var t = e.alternate;
    le(gt, gt.current & 1), le(tn, e), bn === null && (t === null || li.current !== null || t.memoizedState !== null) && (bn = e);
  }
  function fc(e) {
    le(gt, gt.current), le(tn, e), bn === null && (bn = e);
  }
  function zm(e) {
    e.tag === 22 ? (le(gt, gt.current), le(tn, e), bn === null && (bn = e)) : Da();
  }
  function Da() {
    le(gt, gt.current), le(tn, tn.current);
  }
  function nn(e) {
    K(tn), bn === e && (bn = null), K(gt);
  }
  var gt = C(0);
  function Bs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || yf(l) || bf(l)))
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
  var ta = 0, De = null, We = null, wt = null, ks = !1, ii = !1, El = !1, qs = 0, sr = 0, ri = null, C1 = 0;
  function mt() {
    throw Error(s(321));
  }
  function dc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!Wt(e[l], t[l])) return !1;
    return !0;
  }
  function hc(e, t, l, r, u, f) {
    return ta = f, De = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, q.H = e === null || e.memoizedState === null ? vp : Nc, El = !1, f = l(r, u), El = !1, ii && (f = Lm(
      t,
      l,
      r,
      u
    )), Om(e), f;
  }
  function Om(e) {
    q.H = cr;
    var t = We !== null && We.next !== null;
    if (ta = 0, wt = We = De = null, ks = !1, sr = 0, ri = null, t) throw Error(s(300));
    e === null || jt || (e = e.dependencies, e !== null && Rs(e) && (jt = !0));
  }
  function Lm(e, t, l, r) {
    De = e;
    var u = 0;
    do {
      if (ii && (ri = null), sr = 0, ii = !1, 25 <= u) throw Error(s(301));
      if (u += 1, wt = We = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      q.H = gp, f = t(l, r);
    } while (ii);
    return f;
  }
  function M1() {
    var e = q.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? or(t) : t, e = e.useState()[0], (We !== null ? We.memoizedState : null) !== e && (De.flags |= 1024), t;
  }
  function mc() {
    var e = qs !== 0;
    return qs = 0, e;
  }
  function pc(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function vc(e) {
    if (ks) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      ks = !1;
    }
    ta = 0, wt = We = De = null, ii = !1, sr = qs = 0, ri = null;
  }
  function Yt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return wt === null ? De.memoizedState = wt = e : wt = wt.next = e, wt;
  }
  function yt() {
    if (We === null) {
      var e = De.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = We.next;
    var t = wt === null ? De.memoizedState : wt.next;
    if (t !== null)
      wt = t, We = e;
    else {
      if (e === null)
        throw De.alternate === null ? Error(s(467)) : Error(s(310));
      We = e, e = {
        memoizedState: We.memoizedState,
        baseState: We.baseState,
        baseQueue: We.baseQueue,
        queue: We.queue,
        next: null
      }, wt === null ? De.memoizedState = wt = e : wt = wt.next = e;
    }
    return wt;
  }
  function Hs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function or(e) {
    var t = sr;
    return sr += 1, ri === null && (ri = []), e = Tm(ri, e, t), t = De, (wt === null ? t.memoizedState : wt.next) === null && (t = t.alternate, q.H = t === null || t.memoizedState === null ? vp : Nc), e;
  }
  function $s(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return or(e);
      if (e.$$typeof === z) return Dt(e);
    }
    throw Error(s(438, String(e)));
  }
  function gc(e) {
    var t = null, l = De.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var r = De.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
        data: r.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Hs(), De.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), r = 0; r < e; r++)
        l[r] = P;
    return t.index++, l;
  }
  function na(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ys(e) {
    var t = yt();
    return yc(t, We, e);
  }
  function yc(e, t, l) {
    var r = e.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = l;
    var u = e.baseQueue, f = r.pending;
    if (f !== null) {
      if (u !== null) {
        var g = u.next;
        u.next = f.next, f.next = g;
      }
      t.baseQueue = u = f, r.pending = null;
    }
    if (f = e.baseState, u === null) e.memoizedState = f;
    else {
      t = u.next;
      var E = g = null, N = null, $ = t, Z = !1;
      do {
        var te = $.lane & -536870913;
        if (te !== $.lane ? (qe & te) === te : (ta & te) === te) {
          var G = $.revertLane;
          if (G === 0)
            N !== null && (N = N.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: $.action,
              hasEagerState: $.hasEagerState,
              eagerState: $.eagerState,
              next: null
            }), te === ei && (Z = !0);
          else if ((ta & G) === G) {
            $ = $.next, G === ei && (Z = !0);
            continue;
          } else
            te = {
              lane: 0,
              revertLane: $.revertLane,
              gesture: null,
              action: $.action,
              hasEagerState: $.hasEagerState,
              eagerState: $.eagerState,
              next: null
            }, N === null ? (E = N = te, g = f) : N = N.next = te, De.lanes |= G, La |= G;
          te = $.action, El && l(f, te), f = $.hasEagerState ? $.eagerState : l(f, te);
        } else
          G = {
            lane: te,
            revertLane: $.revertLane,
            gesture: $.gesture,
            action: $.action,
            hasEagerState: $.hasEagerState,
            eagerState: $.eagerState,
            next: null
          }, N === null ? (E = N = G, g = f) : N = N.next = G, De.lanes |= te, La |= te;
        $ = $.next;
      } while ($ !== null && $ !== t);
      if (N === null ? g = f : N.next = E, !Wt(f, e.memoizedState) && (jt = !0, Z && (l = ti, l !== null)))
        throw l;
      e.memoizedState = f, e.baseState = g, e.baseQueue = N, r.lastRenderedState = f;
    }
    return u === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function bc(e) {
    var t = yt(), l = t.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = e;
    var r = l.dispatch, u = l.pending, f = t.memoizedState;
    if (u !== null) {
      l.pending = null;
      var g = u = u.next;
      do
        f = e(f, g.action), g = g.next;
      while (g !== u);
      Wt(f, t.memoizedState) || (jt = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), l.lastRenderedState = f;
    }
    return [f, r];
  }
  function Um(e, t, l) {
    var r = De, u = yt(), f = $e;
    if (f) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = t();
    var g = !Wt(
      (We || u).memoizedState,
      l
    );
    if (g && (u.memoizedState = l, jt = !0), u = u.queue, Ec(km.bind(null, r, u, e), [
      e
    ]), u.getSnapshot !== t || g || wt !== null && wt.memoizedState.tag & 1) {
      if (r.flags |= 2048, si(
        9,
        { destroy: void 0 },
        Bm.bind(
          null,
          r,
          u,
          l,
          t
        ),
        null
      ), at === null) throw Error(s(349));
      f || (ta & 127) !== 0 || Vm(r, t, l);
    }
    return l;
  }
  function Vm(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = De.updateQueue, t === null ? (t = Hs(), De.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function Bm(e, t, l, r) {
    t.value = l, t.getSnapshot = r, qm(t) && Hm(e);
  }
  function km(e, t, l) {
    return l(function() {
      qm(t) && Hm(e);
    });
  }
  function qm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Wt(e, l);
    } catch {
      return !0;
    }
  }
  function Hm(e) {
    var t = hl(e, 2);
    t !== null && Pt(t, e, 2);
  }
  function xc(e) {
    var t = Yt();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), El) {
        Nt(!0);
        try {
          l();
        } finally {
          Nt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: na,
      lastRenderedState: e
    }, t;
  }
  function $m(e, t, l, r) {
    return e.baseState = l, yc(
      e,
      We,
      typeof r == "function" ? r : na
    );
  }
  function N1(e, t, l, r, u) {
    if (Xs(e)) throw Error(s(485));
    if (e = t.action, e !== null) {
      var f = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(g) {
          f.listeners.push(g);
        }
      };
      q.T !== null ? l(!0) : f.isTransition = !1, r(f), l = t.pending, l === null ? (f.next = t.pending = f, Ym(t, f)) : (f.next = l.next, t.pending = l.next = f);
    }
  }
  function Ym(e, t) {
    var l = t.action, r = t.payload, u = e.state;
    if (t.isTransition) {
      var f = q.T, g = {};
      q.T = g;
      try {
        var E = l(u, r), N = q.S;
        N !== null && N(g, E), Fm(e, t, E);
      } catch ($) {
        Sc(e, t, $);
      } finally {
        f !== null && g.types !== null && (f.types = g.types), q.T = f;
      }
    } else
      try {
        f = l(u, r), Fm(e, t, f);
      } catch ($) {
        Sc(e, t, $);
      }
  }
  function Fm(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(r) {
        Gm(e, t, r);
      },
      function(r) {
        return Sc(e, t, r);
      }
    ) : Gm(e, t, l);
  }
  function Gm(e, t, l) {
    t.status = "fulfilled", t.value = l, Xm(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Ym(e, l)));
  }
  function Sc(e, t, l) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        t.status = "rejected", t.reason = l, Xm(t), t = t.next;
      while (t !== r);
    }
    e.action = null;
  }
  function Xm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Im(e, t) {
    return t;
  }
  function Km(e, t) {
    if ($e) {
      var l = at.formState;
      if (l !== null) {
        e: {
          var r = De;
          if ($e) {
            if (rt) {
              t: {
                for (var u = rt, f = yn; u.nodeType !== 8; ) {
                  if (!f) {
                    u = null;
                    break t;
                  }
                  if (u = xn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                f = u.data, u = f === "F!" || f === "F" ? u : null;
              }
              if (u) {
                rt = xn(
                  u.nextSibling
                ), r = u.data === "F!";
                break e;
              }
            }
            Ca(r);
          }
          r = !1;
        }
        r && (t = l[0]);
      }
    }
    return l = Yt(), l.memoizedState = l.baseState = t, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Im,
      lastRenderedState: t
    }, l.queue = r, l = hp.bind(
      null,
      De,
      r
    ), r.dispatch = l, r = xc(!1), f = Mc.bind(
      null,
      De,
      !1,
      r.queue
    ), r = Yt(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = u, l = N1.bind(
      null,
      De,
      u,
      f,
      l
    ), u.dispatch = l, r.memoizedState = e, [t, l, !1];
  }
  function Qm(e) {
    var t = yt();
    return Zm(t, We, e);
  }
  function Zm(e, t, l) {
    if (t = yc(
      e,
      t,
      Im
    )[0], e = Ys(na)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var r = or(t);
      } catch (g) {
        throw g === ni ? zs : g;
      }
    else r = t;
    t = yt();
    var u = t.queue, f = u.dispatch;
    return l !== t.memoizedState && (De.flags |= 2048, si(
      9,
      { destroy: void 0 },
      A1.bind(null, u, l),
      null
    )), [r, f, e];
  }
  function A1(e, t) {
    e.action = t;
  }
  function Pm(e) {
    var t = yt(), l = We;
    if (l !== null)
      return Zm(t, l, e);
    yt(), t = t.memoizedState, l = yt();
    var r = l.queue.dispatch;
    return l.memoizedState = e, [t, r, !1];
  }
  function si(e, t, l, r) {
    return e = { tag: e, create: l, deps: r, inst: t, next: null }, t = De.updateQueue, t === null && (t = Hs(), De.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (r = l.next, l.next = e, e.next = r, t.lastEffect = e), e;
  }
  function Jm() {
    return yt().memoizedState;
  }
  function Fs(e, t, l, r) {
    var u = Yt();
    De.flags |= e, u.memoizedState = si(
      1 | t,
      { destroy: void 0 },
      l,
      r === void 0 ? null : r
    );
  }
  function Gs(e, t, l, r) {
    var u = yt();
    r = r === void 0 ? null : r;
    var f = u.memoizedState.inst;
    We !== null && r !== null && dc(r, We.memoizedState.deps) ? u.memoizedState = si(t, f, l, r) : (De.flags |= e, u.memoizedState = si(
      1 | t,
      f,
      l,
      r
    ));
  }
  function Wm(e, t) {
    Fs(8390656, 8, e, t);
  }
  function Ec(e, t) {
    Gs(2048, 8, e, t);
  }
  function R1(e) {
    De.flags |= 4;
    var t = De.updateQueue;
    if (t === null)
      t = Hs(), De.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function ep(e) {
    var t = yt().memoizedState;
    return R1({ ref: t, nextImpl: e }), function() {
      if ((Ke & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function tp(e, t) {
    return Gs(4, 2, e, t);
  }
  function np(e, t) {
    return Gs(4, 4, e, t);
  }
  function ap(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function() {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function lp(e, t, l) {
    l = l != null ? l.concat([e]) : null, Gs(4, 4, ap.bind(null, t, e), l);
  }
  function wc() {
  }
  function ip(e, t) {
    var l = yt();
    t = t === void 0 ? null : t;
    var r = l.memoizedState;
    return t !== null && dc(t, r[1]) ? r[0] : (l.memoizedState = [e, t], e);
  }
  function rp(e, t) {
    var l = yt();
    t = t === void 0 ? null : t;
    var r = l.memoizedState;
    if (t !== null && dc(t, r[1]))
      return r[0];
    if (r = e(), El) {
      Nt(!0);
      try {
        e();
      } finally {
        Nt(!1);
      }
    }
    return l.memoizedState = [r, t], r;
  }
  function jc(e, t, l) {
    return l === void 0 || (ta & 1073741824) !== 0 && (qe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = sv(), De.lanes |= e, La |= e, l);
  }
  function sp(e, t, l, r) {
    return Wt(l, t) ? l : li.current !== null ? (e = jc(e, l, r), Wt(e, t) || (jt = !0), e) : (ta & 42) === 0 || (ta & 1073741824) !== 0 && (qe & 261930) === 0 ? (jt = !0, e.memoizedState = l) : (e = sv(), De.lanes |= e, La |= e, t);
  }
  function op(e, t, l, r, u) {
    var f = B.p;
    B.p = f !== 0 && 8 > f ? f : 8;
    var g = q.T, E = {};
    q.T = E, Mc(e, !1, t, l);
    try {
      var N = u(), $ = q.S;
      if ($ !== null && $(E, N), N !== null && typeof N == "object" && typeof N.then == "function") {
        var Z = T1(
          N,
          r
        );
        ur(
          e,
          t,
          Z,
          rn(e)
        );
      } else
        ur(
          e,
          t,
          r,
          rn(e)
        );
    } catch (te) {
      ur(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: te },
        rn()
      );
    } finally {
      B.p = f, g !== null && E.types !== null && (g.types = E.types), q.T = g;
    }
  }
  function _1() {
  }
  function Tc(e, t, l, r) {
    if (e.tag !== 5) throw Error(s(476));
    var u = up(e).queue;
    op(
      e,
      u,
      t,
      Y,
      l === null ? _1 : function() {
        return cp(e), l(r);
      }
    );
  }
  function up(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Y,
      baseState: Y,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: na,
        lastRenderedState: Y
      },
      next: null
    };
    var l = {};
    return t.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: na,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function cp(e) {
    var t = up(e);
    t.next === null && (t = e.alternate.memoizedState), ur(
      e,
      t.next.queue,
      {},
      rn()
    );
  }
  function Cc() {
    return Dt(Cr);
  }
  function fp() {
    return yt().memoizedState;
  }
  function dp() {
    return yt().memoizedState;
  }
  function D1(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = rn();
          e = Aa(l);
          var r = Ra(t, e, l);
          r !== null && (Pt(r, t, l), lr(r, t, l)), t = { cache: tc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function z1(e, t, l) {
    var r = rn();
    l = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xs(e) ? mp(t, l) : (l = Fu(e, t, l, r), l !== null && (Pt(l, e, r), pp(l, t, r)));
  }
  function hp(e, t, l) {
    var r = rn();
    ur(e, t, l, r);
  }
  function ur(e, t, l, r) {
    var u = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Xs(e)) mp(t, u);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null))
        try {
          var g = t.lastRenderedState, E = f(g, l);
          if (u.hasEagerState = !0, u.eagerState = E, Wt(E, g))
            return Cs(e, t, u, 0), at === null && Ts(), !1;
        } catch {
        } finally {
        }
      if (l = Fu(e, t, u, r), l !== null)
        return Pt(l, e, r), pp(l, t, r), !0;
    }
    return !1;
  }
  function Mc(e, t, l, r) {
    if (r = {
      lane: 2,
      revertLane: rf(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xs(e)) {
      if (t) throw Error(s(479));
    } else
      t = Fu(
        e,
        l,
        r,
        2
      ), t !== null && Pt(t, e, 2);
  }
  function Xs(e) {
    var t = e.alternate;
    return e === De || t !== null && t === De;
  }
  function mp(e, t) {
    ii = ks = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function pp(e, t, l) {
    if ((l & 4194048) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, l |= r, t.lanes = l, ms(e, l);
    }
  }
  var cr = {
    readContext: Dt,
    use: $s,
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
  cr.useEffectEvent = mt;
  var vp = {
    readContext: Dt,
    use: $s,
    useCallback: function(e, t) {
      return Yt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Dt,
    useEffect: Wm,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Fs(
        4194308,
        4,
        ap.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return Fs(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Fs(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = Yt();
      t = t === void 0 ? null : t;
      var r = e();
      if (El) {
        Nt(!0);
        try {
          e();
        } finally {
          Nt(!1);
        }
      }
      return l.memoizedState = [r, t], r;
    },
    useReducer: function(e, t, l) {
      var r = Yt();
      if (l !== void 0) {
        var u = l(t);
        if (El) {
          Nt(!0);
          try {
            l(t);
          } finally {
            Nt(!1);
          }
        }
      } else u = t;
      return r.memoizedState = r.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, r.queue = e, e = e.dispatch = z1.bind(
        null,
        De,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var t = Yt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = xc(e);
      var t = e.queue, l = hp.bind(null, De, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: wc,
    useDeferredValue: function(e, t) {
      var l = Yt();
      return jc(l, e, t);
    },
    useTransition: function() {
      var e = xc(!1);
      return e = op.bind(
        null,
        De,
        e.queue,
        !0,
        !1
      ), Yt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var r = De, u = Yt();
      if ($e) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = t(), at === null)
          throw Error(s(349));
        (qe & 127) !== 0 || Vm(r, t, l);
      }
      u.memoizedState = l;
      var f = { value: l, getSnapshot: t };
      return u.queue = f, Wm(km.bind(null, r, f, e), [
        e
      ]), r.flags |= 2048, si(
        9,
        { destroy: void 0 },
        Bm.bind(
          null,
          r,
          f,
          l,
          t
        ),
        null
      ), l;
    },
    useId: function() {
      var e = Yt(), t = at.identifierPrefix;
      if ($e) {
        var l = Yn, r = $n;
        l = (r & ~(1 << 32 - Vt(r) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = qs++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = C1++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Cc,
    useFormState: Km,
    useActionState: Km,
    useOptimistic: function(e) {
      var t = Yt();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Mc.bind(
        null,
        De,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: gc,
    useCacheRefresh: function() {
      return Yt().memoizedState = D1.bind(
        null,
        De
      );
    },
    useEffectEvent: function(e) {
      var t = Yt(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((Ke & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Nc = {
    readContext: Dt,
    use: $s,
    useCallback: ip,
    useContext: Dt,
    useEffect: Ec,
    useImperativeHandle: lp,
    useInsertionEffect: tp,
    useLayoutEffect: np,
    useMemo: rp,
    useReducer: Ys,
    useRef: Jm,
    useState: function() {
      return Ys(na);
    },
    useDebugValue: wc,
    useDeferredValue: function(e, t) {
      var l = yt();
      return sp(
        l,
        We.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ys(na)[0], t = yt().memoizedState;
      return [
        typeof e == "boolean" ? e : or(e),
        t
      ];
    },
    useSyncExternalStore: Um,
    useId: fp,
    useHostTransitionStatus: Cc,
    useFormState: Qm,
    useActionState: Qm,
    useOptimistic: function(e, t) {
      var l = yt();
      return $m(l, We, e, t);
    },
    useMemoCache: gc,
    useCacheRefresh: dp
  };
  Nc.useEffectEvent = ep;
  var gp = {
    readContext: Dt,
    use: $s,
    useCallback: ip,
    useContext: Dt,
    useEffect: Ec,
    useImperativeHandle: lp,
    useInsertionEffect: tp,
    useLayoutEffect: np,
    useMemo: rp,
    useReducer: bc,
    useRef: Jm,
    useState: function() {
      return bc(na);
    },
    useDebugValue: wc,
    useDeferredValue: function(e, t) {
      var l = yt();
      return We === null ? jc(l, e, t) : sp(
        l,
        We.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = bc(na)[0], t = yt().memoizedState;
      return [
        typeof e == "boolean" ? e : or(e),
        t
      ];
    },
    useSyncExternalStore: Um,
    useId: fp,
    useHostTransitionStatus: Cc,
    useFormState: Pm,
    useActionState: Pm,
    useOptimistic: function(e, t) {
      var l = yt();
      return We !== null ? $m(l, We, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: gc,
    useCacheRefresh: dp
  };
  gp.useEffectEvent = ep;
  function Ac(e, t, l, r) {
    t = e.memoizedState, l = l(r, t), l = l == null ? t : b({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Rc = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var r = rn(), u = Aa(r);
      u.payload = t, l != null && (u.callback = l), t = Ra(e, u, r), t !== null && (Pt(t, e, r), lr(t, e, r));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var r = rn(), u = Aa(r);
      u.tag = 1, u.payload = t, l != null && (u.callback = l), t = Ra(e, u, r), t !== null && (Pt(t, e, r), lr(t, e, r));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = rn(), r = Aa(l);
      r.tag = 2, t != null && (r.callback = t), t = Ra(e, r, l), t !== null && (Pt(t, e, l), lr(t, e, l));
    }
  };
  function yp(e, t, l, r, u, f, g) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, f, g) : t.prototype && t.prototype.isPureReactComponent ? !Zi(l, r) || !Zi(u, f) : !0;
  }
  function bp(e, t, l, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, r), t.state !== e && Rc.enqueueReplaceState(t, t.state, null);
  }
  function wl(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var r in t)
        r !== "ref" && (l[r] = t[r]);
    }
    if (e = e.defaultProps) {
      l === t && (l = b({}, l));
      for (var u in e)
        l[u] === void 0 && (l[u] = e[u]);
    }
    return l;
  }
  function xp(e) {
    js(e);
  }
  function Sp(e) {
    console.error(e);
  }
  function Ep(e) {
    js(e);
  }
  function Is(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function wp(e, t, l) {
    try {
      var r = e.onCaughtError;
      r(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function _c(e, t, l) {
    return l = Aa(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Is(e, t);
    }, l;
  }
  function jp(e) {
    return e = Aa(e), e.tag = 3, e;
  }
  function Tp(e, t, l, r) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = r.value;
      e.payload = function() {
        return u(f);
      }, e.callback = function() {
        wp(t, l, r);
      };
    }
    var g = l.stateNode;
    g !== null && typeof g.componentDidCatch == "function" && (e.callback = function() {
      wp(t, l, r), typeof u != "function" && (Ua === null ? Ua = /* @__PURE__ */ new Set([this]) : Ua.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function O1(e, t, l, r, u) {
    if (l.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (t = l.alternate, t !== null && Wl(
        t,
        l,
        u,
        !0
      ), l = tn.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return bn === null ? io() : l.alternate === null && pt === 0 && (pt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = u, r === Os ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), nf(e, r, u)), !1;
          case 22:
            return l.flags |= 65536, r === Os ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : l.add(r)), nf(e, r, u)), !1;
        }
        throw Error(s(435, l.tag));
      }
      return nf(e, r, u), io(), !1;
    }
    if ($e)
      return t = tn.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, r !== Zu && (e = Error(s(422), { cause: r }), Wi(pn(e, l)))) : (r !== Zu && (t = Error(s(423), {
        cause: r
      }), Wi(
        pn(t, l)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, r = pn(r, l), u = _c(
        e.stateNode,
        r,
        u
      ), sc(e, u), pt !== 4 && (pt = 2)), !1;
    var f = Error(s(520), { cause: r });
    if (f = pn(f, l), yr === null ? yr = [f] : yr.push(f), pt !== 4 && (pt = 2), t === null) return !0;
    r = pn(r, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = u & -u, l.lanes |= e, e = _c(l.stateNode, r, e), sc(l, e), !1;
        case 1:
          if (t = l.type, f = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Ua === null || !Ua.has(f))))
            return l.flags |= 65536, u &= -u, l.lanes |= u, u = jp(u), Tp(
              u,
              e,
              l,
              r
            ), sc(l, u), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Dc = Error(s(461)), jt = !1;
  function zt(e, t, l, r) {
    t.child = e === null ? Am(t, null, l, r) : Sl(
      t,
      e.child,
      l,
      r
    );
  }
  function Cp(e, t, l, r, u) {
    l = l.render;
    var f = t.ref;
    if ("ref" in r) {
      var g = {};
      for (var E in r)
        E !== "ref" && (g[E] = r[E]);
    } else g = r;
    return gl(t), r = hc(
      e,
      t,
      l,
      g,
      f,
      u
    ), E = mc(), e !== null && !jt ? (pc(e, t, u), aa(e, t, u)) : ($e && E && Ku(t), t.flags |= 1, zt(e, t, r, u), t.child);
  }
  function Mp(e, t, l, r, u) {
    if (e === null) {
      var f = l.type;
      return typeof f == "function" && !Gu(f) && f.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = f, Np(
        e,
        t,
        f,
        r,
        u
      )) : (e = Ns(
        l.type,
        null,
        r,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (f = e.child, !qc(e, u)) {
      var g = f.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Zi, l(g, r) && e.ref === t.ref)
        return aa(e, t, u);
    }
    return t.flags |= 1, e = Pn(f, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Np(e, t, l, r, u) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (Zi(f, r) && e.ref === t.ref)
        if (jt = !1, t.pendingProps = r = f, qc(e, u))
          (e.flags & 131072) !== 0 && (jt = !0);
        else
          return t.lanes = e.lanes, aa(e, t, u);
    }
    return zc(
      e,
      t,
      l,
      r,
      u
    );
  }
  function Ap(e, t, l, r) {
    var u = r.children, f = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), r.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | l : l, e !== null) {
          for (r = t.child = e.child, u = 0; r !== null; )
            u = u | r.lanes | r.childLanes, r = r.sibling;
          r = u & ~f;
        } else r = 0, t.child = null;
        return Rp(
          e,
          t,
          f,
          l,
          r
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ds(
          t,
          f !== null ? f.cachePool : null
        ), f !== null ? Dm(t, f) : uc(), zm(t);
      else
        return r = t.lanes = 536870912, Rp(
          e,
          t,
          f !== null ? f.baseLanes | l : l,
          l,
          r
        );
    } else
      f !== null ? (Ds(t, f.cachePool), Dm(t, f), Da(), t.memoizedState = null) : (e !== null && Ds(t, null), uc(), Da());
    return zt(e, t, u, l), t.child;
  }
  function fr(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Rp(e, t, l, r, u) {
    var f = ac();
    return f = f === null ? null : { parent: Et._currentValue, pool: f }, t.memoizedState = {
      baseLanes: l,
      cachePool: f
    }, e !== null && Ds(t, null), uc(), zm(t), e !== null && Wl(e, t, r, !0), t.childLanes = u, null;
  }
  function Ks(e, t) {
    return t = Zs(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function _p(e, t, l) {
    return Sl(t, e.child, null, l), e = Ks(t, t.pendingProps), e.flags |= 2, nn(t), t.memoizedState = null, e;
  }
  function L1(e, t, l) {
    var r = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if ($e) {
        if (r.mode === "hidden")
          return e = Ks(t, r), t.lanes = 536870912, fr(null, e);
        if (fc(t), (e = rt) ? (e = Yv(
          e,
          yn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ja !== null ? { id: $n, overflow: Yn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = mm(e), l.return = t, t.child = l, _t = t, rt = null)) : e = null, e === null) throw Ca(t);
        return t.lanes = 536870912, null;
      }
      return Ks(t, r);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var g = f.dehydrated;
      if (fc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = _p(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (jt || Wl(e, t, l, !1), u = (l & e.childLanes) !== 0, jt || u) {
        if (r = at, r !== null && (g = A(r, l), g !== 0 && g !== f.retryLane))
          throw f.retryLane = g, hl(e, g), Pt(r, e, g), Dc;
        io(), t = _p(
          e,
          t,
          l
        );
      } else
        e = f.treeContext, rt = xn(g.nextSibling), _t = t, $e = !0, Ta = null, yn = !1, e !== null && gm(t, e), t = Ks(t, r), t.flags |= 4096;
      return t;
    }
    return e = Pn(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Qs(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(s(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function zc(e, t, l, r, u) {
    return gl(t), l = hc(
      e,
      t,
      l,
      r,
      void 0,
      u
    ), r = mc(), e !== null && !jt ? (pc(e, t, u), aa(e, t, u)) : ($e && r && Ku(t), t.flags |= 1, zt(e, t, l, u), t.child);
  }
  function Dp(e, t, l, r, u, f) {
    return gl(t), t.updateQueue = null, l = Lm(
      t,
      r,
      l,
      u
    ), Om(e), r = mc(), e !== null && !jt ? (pc(e, t, f), aa(e, t, f)) : ($e && r && Ku(t), t.flags |= 1, zt(e, t, l, f), t.child);
  }
  function zp(e, t, l, r, u) {
    if (gl(t), t.stateNode === null) {
      var f = Ql, g = l.contextType;
      typeof g == "object" && g !== null && (f = Dt(g)), f = new l(r, f), t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Rc, t.stateNode = f, f._reactInternals = t, f = t.stateNode, f.props = r, f.state = t.memoizedState, f.refs = {}, ic(t), g = l.contextType, f.context = typeof g == "object" && g !== null ? Dt(g) : Ql, f.state = t.memoizedState, g = l.getDerivedStateFromProps, typeof g == "function" && (Ac(
        t,
        l,
        g,
        r
      ), f.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (g = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), g !== f.state && Rc.enqueueReplaceState(f, f.state, null), rr(t, r, f, u), ir(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
    } else if (e === null) {
      f = t.stateNode;
      var E = t.memoizedProps, N = wl(l, E);
      f.props = N;
      var $ = f.context, Z = l.contextType;
      g = Ql, typeof Z == "object" && Z !== null && (g = Dt(Z));
      var te = l.getDerivedStateFromProps;
      Z = typeof te == "function" || typeof f.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, Z || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (E || $ !== g) && bp(
        t,
        f,
        r,
        g
      ), Na = !1;
      var G = t.memoizedState;
      f.state = G, rr(t, r, f, u), ir(), $ = t.memoizedState, E || G !== $ || Na ? (typeof te == "function" && (Ac(
        t,
        l,
        te,
        r
      ), $ = t.memoizedState), (N = Na || yp(
        t,
        l,
        N,
        r,
        G,
        $,
        g
      )) ? (Z || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = $), f.props = r, f.state = $, f.context = g, r = N) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      f = t.stateNode, rc(e, t), g = t.memoizedProps, Z = wl(l, g), f.props = Z, te = t.pendingProps, G = f.context, $ = l.contextType, N = Ql, typeof $ == "object" && $ !== null && (N = Dt($)), E = l.getDerivedStateFromProps, ($ = typeof E == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== te || G !== N) && bp(
        t,
        f,
        r,
        N
      ), Na = !1, G = t.memoizedState, f.state = G, rr(t, r, f, u), ir();
      var X = t.memoizedState;
      g !== te || G !== X || Na || e !== null && e.dependencies !== null && Rs(e.dependencies) ? (typeof E == "function" && (Ac(
        t,
        l,
        E,
        r
      ), X = t.memoizedState), (Z = Na || yp(
        t,
        l,
        Z,
        r,
        G,
        X,
        N
      ) || e !== null && e.dependencies !== null && Rs(e.dependencies)) ? ($ || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(r, X, N), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        r,
        X,
        N
      )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && G === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && G === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = X), f.props = r, f.state = X, f.context = N, r = Z) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && G === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && G === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return f = r, Qs(e, t), r = (t.flags & 128) !== 0, f || r ? (f = t.stateNode, l = r && typeof l.getDerivedStateFromError != "function" ? null : f.render(), t.flags |= 1, e !== null && r ? (t.child = Sl(
      t,
      e.child,
      null,
      u
    ), t.child = Sl(
      t,
      null,
      l,
      u
    )) : zt(e, t, l, u), t.memoizedState = f.state, e = t.child) : e = aa(
      e,
      t,
      u
    ), e;
  }
  function Op(e, t, l, r) {
    return pl(), t.flags |= 256, zt(e, t, l, r), t.child;
  }
  var Oc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Lc(e) {
    return { baseLanes: e, cachePool: wm() };
  }
  function Uc(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= ln), e;
  }
  function Lp(e, t, l) {
    var r = t.pendingProps, u = !1, f = (t.flags & 128) !== 0, g;
    if ((g = f) || (g = e !== null && e.memoizedState === null ? !1 : (gt.current & 2) !== 0), g && (u = !0, t.flags &= -129), g = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if ($e) {
        if (u ? _a(t) : Da(), (e = rt) ? (e = Yv(
          e,
          yn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ja !== null ? { id: $n, overflow: Yn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = mm(e), l.return = t, t.child = l, _t = t, rt = null)) : e = null, e === null) throw Ca(t);
        return bf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = r.children;
      return r = r.fallback, u ? (Da(), u = t.mode, E = Zs(
        { mode: "hidden", children: E },
        u
      ), r = ml(
        r,
        u,
        l,
        null
      ), E.return = t, r.return = t, E.sibling = r, t.child = E, r = t.child, r.memoizedState = Lc(l), r.childLanes = Uc(
        e,
        g,
        l
      ), t.memoizedState = Oc, fr(null, r)) : (_a(t), Vc(t, E));
    }
    var N = e.memoizedState;
    if (N !== null && (E = N.dehydrated, E !== null)) {
      if (f)
        t.flags & 256 ? (_a(t), t.flags &= -257, t = Bc(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (Da(), t.child = e.child, t.flags |= 128, t = null) : (Da(), E = r.fallback, u = t.mode, r = Zs(
          { mode: "visible", children: r.children },
          u
        ), E = ml(
          E,
          u,
          l,
          null
        ), E.flags |= 2, r.return = t, E.return = t, r.sibling = E, t.child = r, Sl(
          t,
          e.child,
          null,
          l
        ), r = t.child, r.memoizedState = Lc(l), r.childLanes = Uc(
          e,
          g,
          l
        ), t.memoizedState = Oc, t = fr(null, r));
      else if (_a(t), bf(E)) {
        if (g = E.nextSibling && E.nextSibling.dataset, g) var $ = g.dgst;
        g = $, r = Error(s(419)), r.stack = "", r.digest = g, Wi({ value: r, source: null, stack: null }), t = Bc(
          e,
          t,
          l
        );
      } else if (jt || Wl(e, t, l, !1), g = (l & e.childLanes) !== 0, jt || g) {
        if (g = at, g !== null && (r = A(g, l), r !== 0 && r !== N.retryLane))
          throw N.retryLane = r, hl(e, r), Pt(g, e, r), Dc;
        yf(E) || io(), t = Bc(
          e,
          t,
          l
        );
      } else
        yf(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = N.treeContext, rt = xn(
          E.nextSibling
        ), _t = t, $e = !0, Ta = null, yn = !1, e !== null && gm(t, e), t = Vc(
          t,
          r.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Da(), E = r.fallback, u = t.mode, N = e.child, $ = N.sibling, r = Pn(N, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = N.subtreeFlags & 65011712, $ !== null ? E = Pn(
      $,
      E
    ) : (E = ml(
      E,
      u,
      l,
      null
    ), E.flags |= 2), E.return = t, r.return = t, r.sibling = E, t.child = r, fr(null, r), r = t.child, E = e.child.memoizedState, E === null ? E = Lc(l) : (u = E.cachePool, u !== null ? (N = Et._currentValue, u = u.parent !== N ? { parent: N, pool: N } : u) : u = wm(), E = {
      baseLanes: E.baseLanes | l,
      cachePool: u
    }), r.memoizedState = E, r.childLanes = Uc(
      e,
      g,
      l
    ), t.memoizedState = Oc, fr(e.child, r)) : (_a(t), l = e.child, e = l.sibling, l = Pn(l, {
      mode: "visible",
      children: r.children
    }), l.return = t, l.sibling = null, e !== null && (g = t.deletions, g === null ? (t.deletions = [e], t.flags |= 16) : g.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Vc(e, t) {
    return t = Zs(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Zs(e, t) {
    return e = en(22, e, null, t), e.lanes = 0, e;
  }
  function Bc(e, t, l) {
    return Sl(t, e.child, null, l), e = Vc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Up(e, t, l) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Wu(e.return, t, l);
  }
  function kc(e, t, l, r, u, f) {
    var g = e.memoizedState;
    g === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: r,
      tail: l,
      tailMode: u,
      treeForkCount: f
    } : (g.isBackwards = t, g.rendering = null, g.renderingStartTime = 0, g.last = r, g.tail = l, g.tailMode = u, g.treeForkCount = f);
  }
  function Vp(e, t, l) {
    var r = t.pendingProps, u = r.revealOrder, f = r.tail;
    r = r.children;
    var g = gt.current, E = (g & 2) !== 0;
    if (E ? (g = g & 1 | 2, t.flags |= 128) : g &= 1, le(gt, g), zt(e, t, r, l), r = $e ? Ji : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Up(e, l, t);
        else if (e.tag === 19)
          Up(e, l, t);
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
        for (l = t.child, u = null; l !== null; )
          e = l.alternate, e !== null && Bs(e) === null && (u = l), l = l.sibling;
        l = u, l === null ? (u = t.child, t.child = null) : (u = l.sibling, l.sibling = null), kc(
          t,
          !1,
          u,
          l,
          f,
          r
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && Bs(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = l, l = u, u = e;
        }
        kc(
          t,
          !0,
          l,
          null,
          f,
          r
        );
        break;
      case "together":
        kc(
          t,
          !1,
          null,
          null,
          void 0,
          r
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function aa(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), La |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (Wl(
          e,
          t,
          l,
          !1
        ), (l & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, l = Pn(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Pn(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function qc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Rs(e)));
  }
  function U1(e, t, l) {
    switch (t.tag) {
      case 3:
        _e(t, t.stateNode.containerInfo), Ma(t, Et, e.memoizedState.cache), pl();
        break;
      case 27:
      case 5:
        Fe(t);
        break;
      case 4:
        _e(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ma(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, fc(t), null;
        break;
      case 13:
        var r = t.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (_a(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Lp(e, t, l) : (_a(t), e = aa(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        _a(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (r = (l & t.childLanes) !== 0, r || (Wl(
          e,
          t,
          l,
          !1
        ), r = (l & t.childLanes) !== 0), u) {
          if (r)
            return Vp(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), le(gt, gt.current), r) break;
        return null;
      case 22:
        return t.lanes = 0, Ap(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        Ma(t, Et, e.memoizedState.cache);
    }
    return aa(e, t, l);
  }
  function Bp(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        jt = !0;
      else {
        if (!qc(e, l) && (t.flags & 128) === 0)
          return jt = !1, U1(
            e,
            t,
            l
          );
        jt = (e.flags & 131072) !== 0;
      }
    else
      jt = !1, $e && (t.flags & 1048576) !== 0 && vm(t, Ji, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var r = t.pendingProps;
          if (e = bl(t.elementType), t.type = e, typeof e == "function")
            Gu(e) ? (r = wl(e, r), t.tag = 1, t = zp(
              null,
              t,
              e,
              r,
              l
            )) : (t.tag = 0, t = zc(
              null,
              t,
              e,
              r,
              l
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === k) {
                t.tag = 11, t = Cp(
                  null,
                  t,
                  e,
                  r,
                  l
                );
                break e;
              } else if (u === W) {
                t.tag = 14, t = Mp(
                  null,
                  t,
                  e,
                  r,
                  l
                );
                break e;
              }
            }
            throw t = we(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return zc(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return r = t.type, u = wl(
          r,
          t.pendingProps
        ), zp(
          e,
          t,
          r,
          u,
          l
        );
      case 3:
        e: {
          if (_e(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          r = t.pendingProps;
          var f = t.memoizedState;
          u = f.element, rc(e, t), rr(t, r, null, l);
          var g = t.memoizedState;
          if (r = g.cache, Ma(t, Et, r), r !== f.cache && ec(
            t,
            [Et],
            l,
            !0
          ), ir(), r = g.element, f.isDehydrated)
            if (f = {
              element: r,
              isDehydrated: !1,
              cache: g.cache
            }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
              t = Op(
                e,
                t,
                r,
                l
              );
              break e;
            } else if (r !== u) {
              u = pn(
                Error(s(424)),
                t
              ), Wi(u), t = Op(
                e,
                t,
                r,
                l
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
              for (rt = xn(e.firstChild), _t = t, $e = !0, Ta = null, yn = !0, l = Am(
                t,
                null,
                r,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (pl(), r === u) {
              t = aa(
                e,
                t,
                l
              );
              break e;
            }
            zt(e, t, r, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Qs(e, t), e === null ? (l = Qv(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : $e || (l = t.type, e = t.pendingProps, r = ho(
          Ce.current
        ).createElement(l), r[fe] = t, r[de] = e, Ot(r, l, e), lt(r), t.stateNode = r) : t.memoizedState = Qv(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Fe(t), e === null && $e && (r = t.stateNode = Xv(
          t.type,
          t.pendingProps,
          Ce.current
        ), _t = t, yn = !0, u = rt, qa(t.type) ? (xf = u, rt = xn(r.firstChild)) : rt = u), zt(
          e,
          t,
          t.pendingProps.children,
          l
        ), Qs(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && $e && ((u = r = rt) && (r = dE(
          r,
          t.type,
          t.pendingProps,
          yn
        ), r !== null ? (t.stateNode = r, _t = t, rt = xn(r.firstChild), yn = !1, u = !0) : u = !1), u || Ca(t)), Fe(t), u = t.type, f = t.pendingProps, g = e !== null ? e.memoizedProps : null, r = f.children, pf(u, f) ? r = null : g !== null && pf(u, g) && (t.flags |= 32), t.memoizedState !== null && (u = hc(
          e,
          t,
          M1,
          null,
          null,
          l
        ), Cr._currentValue = u), Qs(e, t), zt(e, t, r, l), t.child;
      case 6:
        return e === null && $e && ((e = l = rt) && (l = hE(
          l,
          t.pendingProps,
          yn
        ), l !== null ? (t.stateNode = l, _t = t, rt = null, e = !0) : e = !1), e || Ca(t)), null;
      case 13:
        return Lp(e, t, l);
      case 4:
        return _e(
          t,
          t.stateNode.containerInfo
        ), r = t.pendingProps, e === null ? t.child = Sl(
          t,
          null,
          r,
          l
        ) : zt(e, t, r, l), t.child;
      case 11:
        return Cp(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return zt(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return zt(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return zt(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return r = t.pendingProps, Ma(t, t.type, r.value), zt(e, t, r.children, l), t.child;
      case 9:
        return u = t.type._context, r = t.pendingProps.children, gl(t), u = Dt(u), r = r(u), t.flags |= 1, zt(e, t, r, l), t.child;
      case 14:
        return Mp(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return Np(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Vp(e, t, l);
      case 31:
        return L1(e, t, l);
      case 22:
        return Ap(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return gl(t), r = Dt(Et), e === null ? (u = ac(), u === null && (u = at, f = tc(), u.pooledCache = f, f.refCount++, f !== null && (u.pooledCacheLanes |= l), u = f), t.memoizedState = { parent: r, cache: u }, ic(t), Ma(t, Et, u)) : ((e.lanes & l) !== 0 && (rc(e, t), rr(t, null, null, l), ir()), u = e.memoizedState, f = t.memoizedState, u.parent !== r ? (u = { parent: r, cache: r }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Ma(t, Et, r)) : (r = f.cache, Ma(t, Et, r), r !== u.cache && ec(
          t,
          [Et],
          l,
          !0
        ))), zt(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function la(e) {
    e.flags |= 4;
  }
  function Hc(e, t, l, r, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (fv()) e.flags |= 8192;
        else
          throw xl = Os, lc;
    } else e.flags &= -16777217;
  }
  function kp(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !eg(t))
      if (fv()) e.flags |= 8192;
      else
        throw xl = Os, lc;
  }
  function Ps(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? $i() : 536870912, e.lanes |= t, fi |= t);
  }
  function dr(e, t) {
    if (!$e)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; )
            t.alternate !== null && (l = t), t = t.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var r = null; l !== null; )
            l.alternate !== null && (r = l), l = l.sibling;
          r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
      }
  }
  function st(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, r = 0;
    if (t)
      for (var u = e.child; u !== null; )
        l |= u.lanes | u.childLanes, r |= u.subtreeFlags & 65011712, r |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        l |= u.lanes | u.childLanes, r |= u.subtreeFlags, r |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= r, e.childLanes = l, t;
  }
  function V1(e, t, l) {
    var r = t.pendingProps;
    switch (Qu(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return st(t), null;
      case 1:
        return st(t), null;
      case 3:
        return l = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ea(Et), Ne(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Jl(t) ? la(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Pu())), st(t), null;
      case 26:
        var u = t.type, f = t.memoizedState;
        return e === null ? (la(t), f !== null ? (st(t), kp(t, f)) : (st(t), Hc(
          t,
          u,
          null,
          r,
          l
        ))) : f ? f !== e.memoizedState ? (la(t), st(t), kp(t, f)) : (st(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== r && la(t), st(t), Hc(
          t,
          u,
          e,
          r,
          l
        )), null;
      case 27:
        if (Lt(t), l = Ce.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && la(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(s(166));
            return st(t), null;
          }
          e = ce.current, Jl(t) ? ym(t) : (e = Xv(u, r, l), t.stateNode = e, la(t));
        }
        return st(t), null;
      case 5:
        if (Lt(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && la(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(s(166));
            return st(t), null;
          }
          if (f = ce.current, Jl(t))
            ym(t);
          else {
            var g = ho(
              Ce.current
            );
            switch (f) {
              case 1:
                f = g.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                f = g.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    f = g.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    f = g.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    f = g.createElement("div"), f.innerHTML = "<script><\/script>", f = f.removeChild(
                      f.firstChild
                    );
                    break;
                  case "select":
                    f = typeof r.is == "string" ? g.createElement("select", {
                      is: r.is
                    }) : g.createElement("select"), r.multiple ? f.multiple = !0 : r.size && (f.size = r.size);
                    break;
                  default:
                    f = typeof r.is == "string" ? g.createElement(u, { is: r.is }) : g.createElement(u);
                }
            }
            f[fe] = t, f[de] = r;
            e: for (g = t.child; g !== null; ) {
              if (g.tag === 5 || g.tag === 6)
                f.appendChild(g.stateNode);
              else if (g.tag !== 4 && g.tag !== 27 && g.child !== null) {
                g.child.return = g, g = g.child;
                continue;
              }
              if (g === t) break e;
              for (; g.sibling === null; ) {
                if (g.return === null || g.return === t)
                  break e;
                g = g.return;
              }
              g.sibling.return = g.return, g = g.sibling;
            }
            t.stateNode = f;
            e: switch (Ot(f, u, r), u) {
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
            r && la(t);
          }
        }
        return st(t), Hc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== r && la(t);
        else {
          if (typeof r != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = Ce.current, Jl(t)) {
            if (e = t.stateNode, l = t.memoizedProps, r = null, u = _t, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  r = u.memoizedProps;
              }
            e[fe] = t, e = !!(e.nodeValue === l || r !== null && r.suppressHydrationWarning === !0 || Lv(e.nodeValue, l)), e || Ca(t, !0);
          } else
            e = ho(e).createTextNode(
              r
            ), e[fe] = t, t.stateNode = e;
        }
        return st(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (r = Jl(t), l !== null) {
            if (e === null) {
              if (!r) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[fe] = t;
            } else
              pl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            st(t), e = !1;
          } else
            l = Pu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (nn(t), t) : (nn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return st(t), null;
      case 13:
        if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = Jl(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[fe] = t;
            } else
              pl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            st(t), u = !1;
          } else
            u = Pu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (nn(t), t) : (nn(t), null);
        }
        return nn(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = r !== null, e = e !== null && e.memoizedState !== null, l && (r = t.child, u = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (u = r.alternate.memoizedState.cachePool.pool), f = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (f = r.memoizedState.cachePool.pool), f !== u && (r.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Ps(t, t.updateQueue), st(t), null);
      case 4:
        return Ne(), e === null && cf(t.stateNode.containerInfo), st(t), null;
      case 10:
        return ea(t.type), st(t), null;
      case 19:
        if (K(gt), r = t.memoizedState, r === null) return st(t), null;
        if (u = (t.flags & 128) !== 0, f = r.rendering, f === null)
          if (u) dr(r, !1);
          else {
            if (pt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (f = Bs(e), f !== null) {
                  for (t.flags |= 128, dr(r, !1), e = f.updateQueue, t.updateQueue = e, Ps(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    hm(l, e), l = l.sibling;
                  return le(
                    gt,
                    gt.current & 1 | 2
                  ), $e && Jn(t, r.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            r.tail !== null && he() > no && (t.flags |= 128, u = !0, dr(r, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Bs(f), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, Ps(t, e), dr(r, !0), r.tail === null && r.tailMode === "hidden" && !f.alternate && !$e)
                return st(t), null;
            } else
              2 * he() - r.renderingStartTime > no && l !== 536870912 && (t.flags |= 128, u = !0, dr(r, !1), t.lanes = 4194304);
          r.isBackwards ? (f.sibling = t.child, t.child = f) : (e = r.last, e !== null ? e.sibling = f : t.child = f, r.last = f);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = he(), e.sibling = null, l = gt.current, le(
          gt,
          u ? l & 1 | 2 : l & 1
        ), $e && Jn(t, r.treeForkCount), e) : (st(t), null);
      case 22:
      case 23:
        return nn(t), cc(), r = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (t.flags |= 8192) : r && (t.flags |= 8192), r ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (st(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : st(t), l = t.updateQueue, l !== null && Ps(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== l && (t.flags |= 2048), e !== null && K(yl), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), ea(Et), st(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function B1(e, t) {
    switch (Qu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return ea(Et), Ne(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Lt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (nn(t), t.alternate === null)
            throw Error(s(340));
          pl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (nn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          pl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return K(gt), null;
      case 4:
        return Ne(), null;
      case 10:
        return ea(t.type), null;
      case 22:
      case 23:
        return nn(t), cc(), e !== null && K(yl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return ea(Et), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function qp(e, t) {
    switch (Qu(t), t.tag) {
      case 3:
        ea(Et), Ne();
        break;
      case 26:
      case 27:
      case 5:
        Lt(t);
        break;
      case 4:
        Ne();
        break;
      case 31:
        t.memoizedState !== null && nn(t);
        break;
      case 13:
        nn(t);
        break;
      case 19:
        K(gt);
        break;
      case 10:
        ea(t.type);
        break;
      case 22:
      case 23:
        nn(t), cc(), e !== null && K(yl);
        break;
      case 24:
        ea(Et);
    }
  }
  function hr(e, t) {
    try {
      var l = t.updateQueue, r = l !== null ? l.lastEffect : null;
      if (r !== null) {
        var u = r.next;
        l = u;
        do {
          if ((l.tag & e) === e) {
            r = void 0;
            var f = l.create, g = l.inst;
            r = f(), g.destroy = r;
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (E) {
      Pe(t, t.return, E);
    }
  }
  function za(e, t, l) {
    try {
      var r = t.updateQueue, u = r !== null ? r.lastEffect : null;
      if (u !== null) {
        var f = u.next;
        r = f;
        do {
          if ((r.tag & e) === e) {
            var g = r.inst, E = g.destroy;
            if (E !== void 0) {
              g.destroy = void 0, u = t;
              var N = l, $ = E;
              try {
                $();
              } catch (Z) {
                Pe(
                  u,
                  N,
                  Z
                );
              }
            }
          }
          r = r.next;
        } while (r !== f);
      }
    } catch (Z) {
      Pe(t, t.return, Z);
    }
  }
  function Hp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        _m(t, l);
      } catch (r) {
        Pe(e, e.return, r);
      }
    }
  }
  function $p(e, t, l) {
    l.props = wl(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (r) {
      Pe(e, t, r);
    }
  }
  function mr(e, t) {
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
    } catch (u) {
      Pe(e, t, u);
    }
  }
  function Fn(e, t) {
    var l = e.ref, r = e.refCleanup;
    if (l !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (u) {
          Pe(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (u) {
          Pe(e, t, u);
        }
      else l.current = null;
  }
  function Yp(e) {
    var t = e.type, l = e.memoizedProps, r = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && r.focus();
          break e;
        case "img":
          l.src ? r.src = l.src : l.srcSet && (r.srcset = l.srcSet);
      }
    } catch (u) {
      Pe(e, e.return, u);
    }
  }
  function $c(e, t, l) {
    try {
      var r = e.stateNode;
      rE(r, e.type, l, t), r[de] = t;
    } catch (u) {
      Pe(e, e.return, u);
    }
  }
  function Fp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && qa(e.type) || e.tag === 4;
  }
  function Yc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Fp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && qa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Fc(e, t, l) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = Qn));
    else if (r !== 4 && (r === 27 && qa(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (Fc(e, t, l), e = e.sibling; e !== null; )
        Fc(e, t, l), e = e.sibling;
  }
  function Js(e, t, l) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (r !== 4 && (r === 27 && qa(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (Js(e, t, l), e = e.sibling; e !== null; )
        Js(e, t, l), e = e.sibling;
  }
  function Gp(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var r = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Ot(t, r, l), t[fe] = e, t[de] = l;
    } catch (f) {
      Pe(e, e.return, f);
    }
  }
  var ia = !1, Tt = !1, Gc = !1, Xp = typeof WeakSet == "function" ? WeakSet : Set, Rt = null;
  function k1(e, t) {
    if (e = e.containerInfo, hf = xo, e = lm(e), Bu(e)) {
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
            var u = r.anchorOffset, f = r.focusNode;
            r = r.focusOffset;
            try {
              l.nodeType, f.nodeType;
            } catch {
              l = null;
              break e;
            }
            var g = 0, E = -1, N = -1, $ = 0, Z = 0, te = e, G = null;
            t: for (; ; ) {
              for (var X; te !== l || u !== 0 && te.nodeType !== 3 || (E = g + u), te !== f || r !== 0 && te.nodeType !== 3 || (N = g + r), te.nodeType === 3 && (g += te.nodeValue.length), (X = te.firstChild) !== null; )
                G = te, te = X;
              for (; ; ) {
                if (te === e) break t;
                if (G === l && ++$ === u && (E = g), G === f && ++Z === r && (N = g), (X = te.nextSibling) !== null) break;
                te = G, G = te.parentNode;
              }
              te = X;
            }
            l = E === -1 || N === -1 ? null : { start: E, end: N };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (mf = { focusedElem: e, selectionRange: l }, xo = !1, Rt = t; Rt !== null; )
      if (t = Rt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Rt = e;
      else
        for (; Rt !== null; ) {
          switch (t = Rt, f = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  u = e[l], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, l = t, u = f.memoizedProps, f = f.memoizedState, r = l.stateNode;
                try {
                  var pe = wl(
                    l.type,
                    u
                  );
                  e = r.getSnapshotBeforeUpdate(
                    pe,
                    f
                  ), r.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Me) {
                  Pe(
                    l,
                    l.return,
                    Me
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  gf(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      gf(e);
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
            e.return = t.return, Rt = e;
            break;
          }
          Rt = t.return;
        }
  }
  function Ip(e, t, l) {
    var r = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        sa(e, l), r & 4 && hr(5, l);
        break;
      case 1:
        if (sa(e, l), r & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (g) {
              Pe(l, l.return, g);
            }
          else {
            var u = wl(
              l.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                u,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (g) {
              Pe(
                l,
                l.return,
                g
              );
            }
          }
        r & 64 && Hp(l), r & 512 && mr(l, l.return);
        break;
      case 3:
        if (sa(e, l), r & 64 && (e = l.updateQueue, e !== null)) {
          if (t = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            _m(e, t);
          } catch (g) {
            Pe(l, l.return, g);
          }
        }
        break;
      case 27:
        t === null && r & 4 && Gp(l);
      case 26:
      case 5:
        sa(e, l), t === null && r & 4 && Yp(l), r & 512 && mr(l, l.return);
        break;
      case 12:
        sa(e, l);
        break;
      case 31:
        sa(e, l), r & 4 && Zp(e, l);
        break;
      case 13:
        sa(e, l), r & 4 && Pp(e, l), r & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = K1.bind(
          null,
          l
        ), mE(e, l))));
        break;
      case 22:
        if (r = l.memoizedState !== null || ia, !r) {
          t = t !== null && t.memoizedState !== null || Tt, u = ia;
          var f = Tt;
          ia = r, (Tt = t) && !f ? oa(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : sa(e, l), ia = u, Tt = f;
        }
        break;
      case 30:
        break;
      default:
        sa(e, l);
    }
  }
  function Kp(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Kp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && nt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ft = null, It = !1;
  function ra(e, t, l) {
    for (l = l.child; l !== null; )
      Qp(e, t, l), l = l.sibling;
  }
  function Qp(e, t, l) {
    if ($t && typeof $t.onCommitFiberUnmount == "function")
      try {
        $t.onCommitFiberUnmount(In, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Tt || Fn(l, t), ra(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Tt || Fn(l, t);
        var r = ft, u = It;
        qa(l.type) && (ft = l.stateNode, It = !1), ra(
          e,
          t,
          l
        ), wr(l.stateNode), ft = r, It = u;
        break;
      case 5:
        Tt || Fn(l, t);
      case 6:
        if (r = ft, u = It, ft = null, ra(
          e,
          t,
          l
        ), ft = r, It = u, ft !== null)
          if (It)
            try {
              (ft.nodeType === 9 ? ft.body : ft.nodeName === "HTML" ? ft.ownerDocument.body : ft).removeChild(l.stateNode);
            } catch (f) {
              Pe(
                l,
                t,
                f
              );
            }
          else
            try {
              ft.removeChild(l.stateNode);
            } catch (f) {
              Pe(
                l,
                t,
                f
              );
            }
        break;
      case 18:
        ft !== null && (It ? (e = ft, Hv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), bi(e)) : Hv(ft, l.stateNode));
        break;
      case 4:
        r = ft, u = It, ft = l.stateNode.containerInfo, It = !0, ra(
          e,
          t,
          l
        ), ft = r, It = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        za(2, l, t), Tt || za(4, l, t), ra(
          e,
          t,
          l
        );
        break;
      case 1:
        Tt || (Fn(l, t), r = l.stateNode, typeof r.componentWillUnmount == "function" && $p(
          l,
          t,
          r
        )), ra(
          e,
          t,
          l
        );
        break;
      case 21:
        ra(
          e,
          t,
          l
        );
        break;
      case 22:
        Tt = (r = Tt) || l.memoizedState !== null, ra(
          e,
          t,
          l
        ), Tt = r;
        break;
      default:
        ra(
          e,
          t,
          l
        );
    }
  }
  function Zp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        bi(e);
      } catch (l) {
        Pe(t, t.return, l);
      }
    }
  }
  function Pp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        bi(e);
      } catch (l) {
        Pe(t, t.return, l);
      }
  }
  function q1(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Xp()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Xp()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function Ws(e, t) {
    var l = q1(e);
    t.forEach(function(r) {
      if (!l.has(r)) {
        l.add(r);
        var u = Q1.bind(null, e, r);
        r.then(u, u);
      }
    });
  }
  function Kt(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var r = 0; r < l.length; r++) {
        var u = l[r], f = e, g = t, E = g;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (qa(E.type)) {
                ft = E.stateNode, It = !1;
                break e;
              }
              break;
            case 5:
              ft = E.stateNode, It = !1;
              break e;
            case 3:
            case 4:
              ft = E.stateNode.containerInfo, It = !0;
              break e;
          }
          E = E.return;
        }
        if (ft === null) throw Error(s(160));
        Qp(f, g, u), ft = null, It = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Jp(t, e), t = t.sibling;
  }
  var zn = null;
  function Jp(e, t) {
    var l = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Kt(t, e), Qt(e), r & 4 && (za(3, e, e.return), hr(3, e), za(5, e, e.return));
        break;
      case 1:
        Kt(t, e), Qt(e), r & 512 && (Tt || l === null || Fn(l, l.return)), r & 64 && ia && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? r : l.concat(r))));
        break;
      case 26:
        var u = zn;
        if (Kt(t, e), Qt(e), r & 512 && (Tt || l === null || Fn(l, l.return)), r & 4) {
          var f = l !== null ? l.memoizedState : null;
          if (r = e.memoizedState, l === null)
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  r = e.type, l = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (r) {
                    case "title":
                      f = u.getElementsByTagName("title")[0], (!f || f[Oe] || f[fe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = u.createElement(r), u.head.insertBefore(
                        f,
                        u.querySelector("head > title")
                      )), Ot(f, r, l), f[fe] = e, lt(f), r = f;
                      break e;
                    case "link":
                      var g = Jv(
                        "link",
                        "href",
                        u
                      ).get(r + (l.href || ""));
                      if (g) {
                        for (var E = 0; E < g.length; E++)
                          if (f = g[E], f.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && f.getAttribute("rel") === (l.rel == null ? null : l.rel) && f.getAttribute("title") === (l.title == null ? null : l.title) && f.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            g.splice(E, 1);
                            break t;
                          }
                      }
                      f = u.createElement(r), Ot(f, r, l), u.head.appendChild(f);
                      break;
                    case "meta":
                      if (g = Jv(
                        "meta",
                        "content",
                        u
                      ).get(r + (l.content || ""))) {
                        for (E = 0; E < g.length; E++)
                          if (f = g[E], f.getAttribute("content") === (l.content == null ? null : "" + l.content) && f.getAttribute("name") === (l.name == null ? null : l.name) && f.getAttribute("property") === (l.property == null ? null : l.property) && f.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && f.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            g.splice(E, 1);
                            break t;
                          }
                      }
                      f = u.createElement(r), Ot(f, r, l), u.head.appendChild(f);
                      break;
                    default:
                      throw Error(s(468, r));
                  }
                  f[fe] = e, lt(f), r = f;
                }
                e.stateNode = r;
              } else
                Wv(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Pv(
                u,
                r,
                e.memoizedProps
              );
          else
            f !== r ? (f === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : f.count--, r === null ? Wv(
              u,
              e.type,
              e.stateNode
            ) : Pv(
              u,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && $c(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        Kt(t, e), Qt(e), r & 512 && (Tt || l === null || Fn(l, l.return)), l !== null && r & 4 && $c(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Kt(t, e), Qt(e), r & 512 && (Tt || l === null || Fn(l, l.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            $l(u, "");
          } catch (pe) {
            Pe(e, e.return, pe);
          }
        }
        r & 4 && e.stateNode != null && (u = e.memoizedProps, $c(
          e,
          u,
          l !== null ? l.memoizedProps : u
        )), r & 1024 && (Gc = !0);
        break;
      case 6:
        if (Kt(t, e), Qt(e), r & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          r = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = r;
          } catch (pe) {
            Pe(e, e.return, pe);
          }
        }
        break;
      case 3:
        if (vo = null, u = zn, zn = mo(t.containerInfo), Kt(t, e), zn = u, Qt(e), r & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            bi(t.containerInfo);
          } catch (pe) {
            Pe(e, e.return, pe);
          }
        Gc && (Gc = !1, Wp(e));
        break;
      case 4:
        r = zn, zn = mo(
          e.stateNode.containerInfo
        ), Kt(t, e), Qt(e), zn = r;
        break;
      case 12:
        Kt(t, e), Qt(e);
        break;
      case 31:
        Kt(t, e), Qt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Ws(e, r)));
        break;
      case 13:
        Kt(t, e), Qt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (to = he()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Ws(e, r)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var N = l !== null && l.memoizedState !== null, $ = ia, Z = Tt;
        if (ia = $ || u, Tt = Z || N, Kt(t, e), Tt = Z, ia = $, Qt(e), r & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (l === null || N || ia || Tt || jl(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                N = l = t;
                try {
                  if (f = N.stateNode, u)
                    g = f.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none";
                  else {
                    E = N.stateNode;
                    var te = N.memoizedProps.style, G = te != null && te.hasOwnProperty("display") ? te.display : null;
                    E.style.display = G == null || typeof G == "boolean" ? "" : ("" + G).trim();
                  }
                } catch (pe) {
                  Pe(N, N.return, pe);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                N = t;
                try {
                  N.stateNode.nodeValue = u ? "" : N.memoizedProps;
                } catch (pe) {
                  Pe(N, N.return, pe);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                N = t;
                try {
                  var X = N.stateNode;
                  u ? $v(X, !0) : $v(N.stateNode, !1);
                } catch (pe) {
                  Pe(N, N.return, pe);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              l === t && (l = null), t = t.return;
            }
            l === t && (l = null), t.sibling.return = t.return, t = t.sibling;
          }
        r & 4 && (r = e.updateQueue, r !== null && (l = r.retryQueue, l !== null && (r.retryQueue = null, Ws(e, l))));
        break;
      case 19:
        Kt(t, e), Qt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Ws(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Kt(t, e), Qt(e);
    }
  }
  function Qt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, r = e.return; r !== null; ) {
          if (Fp(r)) {
            l = r;
            break;
          }
          r = r.return;
        }
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var u = l.stateNode, f = Yc(e);
            Js(e, f, u);
            break;
          case 5:
            var g = l.stateNode;
            l.flags & 32 && ($l(g, ""), l.flags &= -33);
            var E = Yc(e);
            Js(e, E, g);
            break;
          case 3:
          case 4:
            var N = l.stateNode.containerInfo, $ = Yc(e);
            Fc(
              e,
              $,
              N
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (Z) {
        Pe(e, e.return, Z);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Wp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Wp(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function sa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Ip(e, t.alternate, t), t = t.sibling;
  }
  function jl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          za(4, t, t.return), jl(t);
          break;
        case 1:
          Fn(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && $p(
            t,
            t.return,
            l
          ), jl(t);
          break;
        case 27:
          wr(t.stateNode);
        case 26:
        case 5:
          Fn(t, t.return), jl(t);
          break;
        case 22:
          t.memoizedState === null && jl(t);
          break;
        case 30:
          jl(t);
          break;
        default:
          jl(t);
      }
      e = e.sibling;
    }
  }
  function oa(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var r = t.alternate, u = e, f = t, g = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          oa(
            u,
            f,
            l
          ), hr(4, f);
          break;
        case 1:
          if (oa(
            u,
            f,
            l
          ), r = f, u = r.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch ($) {
              Pe(r, r.return, $);
            }
          if (r = f, u = r.updateQueue, u !== null) {
            var E = r.stateNode;
            try {
              var N = u.shared.hiddenCallbacks;
              if (N !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < N.length; u++)
                  Rm(N[u], E);
            } catch ($) {
              Pe(r, r.return, $);
            }
          }
          l && g & 64 && Hp(f), mr(f, f.return);
          break;
        case 27:
          Gp(f);
        case 26:
        case 5:
          oa(
            u,
            f,
            l
          ), l && r === null && g & 4 && Yp(f), mr(f, f.return);
          break;
        case 12:
          oa(
            u,
            f,
            l
          );
          break;
        case 31:
          oa(
            u,
            f,
            l
          ), l && g & 4 && Zp(u, f);
          break;
        case 13:
          oa(
            u,
            f,
            l
          ), l && g & 4 && Pp(u, f);
          break;
        case 22:
          f.memoizedState === null && oa(
            u,
            f,
            l
          ), mr(f, f.return);
          break;
        case 30:
          break;
        default:
          oa(
            u,
            f,
            l
          );
      }
      t = t.sibling;
    }
  }
  function Xc(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && er(l));
  }
  function Ic(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && er(e));
  }
  function On(e, t, l, r) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ev(
          e,
          t,
          l,
          r
        ), t = t.sibling;
  }
  function ev(e, t, l, r) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        On(
          e,
          t,
          l,
          r
        ), u & 2048 && hr(9, t);
        break;
      case 1:
        On(
          e,
          t,
          l,
          r
        );
        break;
      case 3:
        On(
          e,
          t,
          l,
          r
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && er(e)));
        break;
      case 12:
        if (u & 2048) {
          On(
            e,
            t,
            l,
            r
          ), e = t.stateNode;
          try {
            var f = t.memoizedProps, g = f.id, E = f.onPostCommit;
            typeof E == "function" && E(
              g,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (N) {
            Pe(t, t.return, N);
          }
        } else
          On(
            e,
            t,
            l,
            r
          );
        break;
      case 31:
        On(
          e,
          t,
          l,
          r
        );
        break;
      case 13:
        On(
          e,
          t,
          l,
          r
        );
        break;
      case 23:
        break;
      case 22:
        f = t.stateNode, g = t.alternate, t.memoizedState !== null ? f._visibility & 2 ? On(
          e,
          t,
          l,
          r
        ) : pr(e, t) : f._visibility & 2 ? On(
          e,
          t,
          l,
          r
        ) : (f._visibility |= 2, oi(
          e,
          t,
          l,
          r,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Xc(g, t);
        break;
      case 24:
        On(
          e,
          t,
          l,
          r
        ), u & 2048 && Ic(t.alternate, t);
        break;
      default:
        On(
          e,
          t,
          l,
          r
        );
    }
  }
  function oi(e, t, l, r, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var f = e, g = t, E = l, N = r, $ = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          oi(
            f,
            g,
            E,
            N,
            u
          ), hr(8, g);
          break;
        case 23:
          break;
        case 22:
          var Z = g.stateNode;
          g.memoizedState !== null ? Z._visibility & 2 ? oi(
            f,
            g,
            E,
            N,
            u
          ) : pr(
            f,
            g
          ) : (Z._visibility |= 2, oi(
            f,
            g,
            E,
            N,
            u
          )), u && $ & 2048 && Xc(
            g.alternate,
            g
          );
          break;
        case 24:
          oi(
            f,
            g,
            E,
            N,
            u
          ), u && $ & 2048 && Ic(g.alternate, g);
          break;
        default:
          oi(
            f,
            g,
            E,
            N,
            u
          );
      }
      t = t.sibling;
    }
  }
  function pr(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, r = t, u = r.flags;
        switch (r.tag) {
          case 22:
            pr(l, r), u & 2048 && Xc(
              r.alternate,
              r
            );
            break;
          case 24:
            pr(l, r), u & 2048 && Ic(r.alternate, r);
            break;
          default:
            pr(l, r);
        }
        t = t.sibling;
      }
  }
  var vr = 8192;
  function ui(e, t, l) {
    if (e.subtreeFlags & vr)
      for (e = e.child; e !== null; )
        tv(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function tv(e, t, l) {
    switch (e.tag) {
      case 26:
        ui(
          e,
          t,
          l
        ), e.flags & vr && e.memoizedState !== null && CE(
          l,
          zn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ui(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var r = zn;
        zn = mo(e.stateNode.containerInfo), ui(
          e,
          t,
          l
        ), zn = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = vr, vr = 16777216, ui(
          e,
          t,
          l
        ), vr = r) : ui(
          e,
          t,
          l
        ));
        break;
      default:
        ui(
          e,
          t,
          l
        );
    }
  }
  function nv(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function gr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var r = t[l];
          Rt = r, lv(
            r,
            e
          );
        }
      nv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        av(e), e = e.sibling;
  }
  function av(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        gr(e), e.flags & 2048 && za(9, e, e.return);
        break;
      case 3:
        gr(e);
        break;
      case 12:
        gr(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, eo(e)) : gr(e);
        break;
      default:
        gr(e);
    }
  }
  function eo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var r = t[l];
          Rt = r, lv(
            r,
            e
          );
        }
      nv(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          za(8, t, t.return), eo(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, eo(t));
          break;
        default:
          eo(t);
      }
      e = e.sibling;
    }
  }
  function lv(e, t) {
    for (; Rt !== null; ) {
      var l = Rt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          za(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var r = l.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          er(l.memoizedState.cache);
      }
      if (r = l.child, r !== null) r.return = l, Rt = r;
      else
        e: for (l = e; Rt !== null; ) {
          r = Rt;
          var u = r.sibling, f = r.return;
          if (Kp(r), r === l) {
            Rt = null;
            break e;
          }
          if (u !== null) {
            u.return = f, Rt = u;
            break e;
          }
          Rt = f;
        }
    }
  }
  var H1 = {
    getCacheForType: function(e) {
      var t = Dt(Et), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Dt(Et).controller.signal;
    }
  }, $1 = typeof WeakMap == "function" ? WeakMap : Map, Ke = 0, at = null, Be = null, qe = 0, Ze = 0, an = null, Oa = !1, ci = !1, Kc = !1, ua = 0, pt = 0, La = 0, Tl = 0, Qc = 0, ln = 0, fi = 0, yr = null, Zt = null, Zc = !1, to = 0, iv = 0, no = 1 / 0, ao = null, Ua = null, Mt = 0, Va = null, di = null, ca = 0, Pc = 0, Jc = null, rv = null, br = 0, Wc = null;
  function rn() {
    return (Ke & 2) !== 0 && qe !== 0 ? qe & -qe : q.T !== null ? rf() : ae();
  }
  function sv() {
    if (ln === 0)
      if ((qe & 536870912) === 0 || $e) {
        var e = Kn;
        Kn <<= 1, (Kn & 3932160) === 0 && (Kn = 262144), ln = e;
      } else ln = 536870912;
    return e = tn.current, e !== null && (e.flags |= 32), ln;
  }
  function Pt(e, t, l) {
    (e === at && (Ze === 2 || Ze === 9) || e.cancelPendingCommit !== null) && (hi(e, 0), Ba(
      e,
      qe,
      ln,
      !1
    )), kn(e, l), ((Ke & 2) === 0 || e !== at) && (e === at && ((Ke & 2) === 0 && (Tl |= l), pt === 4 && Ba(
      e,
      qe,
      ln,
      !1
    )), Gn(e));
  }
  function ov(e, t, l) {
    if ((Ke & 6) !== 0) throw Error(s(327));
    var r = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || xa(e, t), u = r ? G1(e, t) : tf(e, t, !0), f = r;
    do {
      if (u === 0) {
        ci && !r && Ba(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, f && !Y1(l)) {
          u = tf(e, t, !1), f = !1;
          continue;
        }
        if (u === 2) {
          if (f = t, e.errorRecoveryDisabledLanes & f)
            var g = 0;
          else
            g = e.pendingLanes & -536870913, g = g !== 0 ? g : g & 536870912 ? 536870912 : 0;
          if (g !== 0) {
            t = g;
            e: {
              var E = e;
              u = yr;
              var N = E.current.memoizedState.isDehydrated;
              if (N && (hi(E, g).flags |= 256), g = tf(
                E,
                g,
                !1
              ), g !== 2) {
                if (Kc && !N) {
                  E.errorRecoveryDisabledLanes |= f, Tl |= f, u = 4;
                  break e;
                }
                f = Zt, Zt = u, f !== null && (Zt === null ? Zt = f : Zt.push.apply(
                  Zt,
                  f
                ));
              }
              u = g;
            }
            if (f = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          hi(e, 0), Ba(e, t, 0, !0);
          break;
        }
        e: {
          switch (r = e, f = u, f) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ba(
                r,
                t,
                ln,
                !Oa
              );
              break e;
            case 2:
              Zt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = to + 300 - he(), 10 < u)) {
            if (Ba(
              r,
              t,
              ln,
              !Oa
            ), Vl(r, 0, !0) !== 0) break e;
            ca = t, r.timeoutHandle = kv(
              uv.bind(
                null,
                r,
                l,
                Zt,
                ao,
                Zc,
                t,
                ln,
                Tl,
                fi,
                Oa,
                f,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          uv(
            r,
            l,
            Zt,
            ao,
            Zc,
            t,
            ln,
            Tl,
            fi,
            Oa,
            f,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Gn(e);
  }
  function uv(e, t, l, r, u, f, g, E, N, $, Z, te, G, X) {
    if (e.timeoutHandle = -1, te = t.subtreeFlags, te & 8192 || (te & 16785408) === 16785408) {
      te = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Qn
      }, tv(
        t,
        f,
        te
      );
      var pe = (f & 62914560) === f ? to - he() : (f & 4194048) === f ? iv - he() : 0;
      if (pe = ME(
        te,
        pe
      ), pe !== null) {
        ca = f, e.cancelPendingCommit = pe(
          gv.bind(
            null,
            e,
            t,
            f,
            l,
            r,
            u,
            g,
            E,
            N,
            Z,
            te,
            null,
            G,
            X
          )
        ), Ba(e, f, g, !$);
        return;
      }
    }
    gv(
      e,
      t,
      f,
      l,
      r,
      u,
      g,
      E,
      N
    );
  }
  function Y1(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var r = 0; r < l.length; r++) {
          var u = l[r], f = u.getSnapshot;
          u = u.value;
          try {
            if (!Wt(f(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = t.child, t.subtreeFlags & 16384 && l !== null)
        l.return = t, t = l;
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
  function Ba(e, t, l, r) {
    t &= ~Qc, t &= ~Tl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var f = 31 - Vt(u), g = 1 << f;
      r[f] = -1, u &= ~g;
    }
    l !== 0 && hs(e, l, t);
  }
  function lo() {
    return (Ke & 6) === 0 ? (xr(0), !1) : !0;
  }
  function ef() {
    if (Be !== null) {
      if (Ze === 0)
        var e = Be.return;
      else
        e = Be, Wn = vl = null, vc(e), ai = null, nr = 0, e = Be;
      for (; e !== null; )
        qp(e.alternate, e), e = e.return;
      Be = null;
    }
  }
  function hi(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, uE(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), ca = 0, ef(), at = e, Be = l = Pn(e.current, null), qe = t, Ze = 0, an = null, Oa = !1, ci = xa(e, t), Kc = !1, fi = ln = Qc = Tl = La = pt = 0, Zt = yr = null, Zc = !1, (t & 8) !== 0 && (t |= t & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var u = 31 - Vt(r), f = 1 << u;
        t |= e[u], r &= ~f;
      }
    return ua = t, Ts(), l;
  }
  function cv(e, t) {
    De = null, q.H = cr, t === ni || t === zs ? (t = Cm(), Ze = 3) : t === lc ? (t = Cm(), Ze = 4) : Ze = t === Dc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, an = t, Be === null && (pt = 1, Is(
      e,
      pn(t, e.current)
    ));
  }
  function fv() {
    var e = tn.current;
    return e === null ? !0 : (qe & 4194048) === qe ? bn === null : (qe & 62914560) === qe || (qe & 536870912) !== 0 ? e === bn : !1;
  }
  function dv() {
    var e = q.H;
    return q.H = cr, e === null ? cr : e;
  }
  function hv() {
    var e = q.A;
    return q.A = H1, e;
  }
  function io() {
    pt = 4, Oa || (qe & 4194048) !== qe && tn.current !== null || (ci = !0), (La & 134217727) === 0 && (Tl & 134217727) === 0 || at === null || Ba(
      at,
      qe,
      ln,
      !1
    );
  }
  function tf(e, t, l) {
    var r = Ke;
    Ke |= 2;
    var u = dv(), f = hv();
    (at !== e || qe !== t) && (ao = null, hi(e, t)), t = !1;
    var g = pt;
    e: do
      try {
        if (Ze !== 0 && Be !== null) {
          var E = Be, N = an;
          switch (Ze) {
            case 8:
              ef(), g = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              tn.current === null && (t = !0);
              var $ = Ze;
              if (Ze = 0, an = null, mi(e, E, N, $), l && ci) {
                g = 0;
                break e;
              }
              break;
            default:
              $ = Ze, Ze = 0, an = null, mi(e, E, N, $);
          }
        }
        F1(), g = pt;
        break;
      } catch (Z) {
        cv(e, Z);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Wn = vl = null, Ke = r, q.H = u, q.A = f, Be === null && (at = null, qe = 0, Ts()), g;
  }
  function F1() {
    for (; Be !== null; ) mv(Be);
  }
  function G1(e, t) {
    var l = Ke;
    Ke |= 2;
    var r = dv(), u = hv();
    at !== e || qe !== t ? (ao = null, no = he() + 500, hi(e, t)) : ci = xa(
      e,
      t
    );
    e: do
      try {
        if (Ze !== 0 && Be !== null) {
          t = Be;
          var f = an;
          t: switch (Ze) {
            case 1:
              Ze = 0, an = null, mi(e, t, f, 1);
              break;
            case 2:
            case 9:
              if (jm(f)) {
                Ze = 0, an = null, pv(t);
                break;
              }
              t = function() {
                Ze !== 2 && Ze !== 9 || at !== e || (Ze = 7), Gn(e);
              }, f.then(t, t);
              break e;
            case 3:
              Ze = 7;
              break e;
            case 4:
              Ze = 5;
              break e;
            case 7:
              jm(f) ? (Ze = 0, an = null, pv(t)) : (Ze = 0, an = null, mi(e, t, f, 7));
              break;
            case 5:
              var g = null;
              switch (Be.tag) {
                case 26:
                  g = Be.memoizedState;
                case 5:
                case 27:
                  var E = Be;
                  if (g ? eg(g) : E.stateNode.complete) {
                    Ze = 0, an = null;
                    var N = E.sibling;
                    if (N !== null) Be = N;
                    else {
                      var $ = E.return;
                      $ !== null ? (Be = $, ro($)) : Be = null;
                    }
                    break t;
                  }
              }
              Ze = 0, an = null, mi(e, t, f, 5);
              break;
            case 6:
              Ze = 0, an = null, mi(e, t, f, 6);
              break;
            case 8:
              ef(), pt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        X1();
        break;
      } catch (Z) {
        cv(e, Z);
      }
    while (!0);
    return Wn = vl = null, q.H = r, q.A = u, Ke = l, Be !== null ? 0 : (at = null, qe = 0, Ts(), pt);
  }
  function X1() {
    for (; Be !== null && !qi(); )
      mv(Be);
  }
  function mv(e) {
    var t = Bp(e.alternate, e, ua);
    e.memoizedProps = e.pendingProps, t === null ? ro(e) : Be = t;
  }
  function pv(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Dp(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          qe
        );
        break;
      case 11:
        t = Dp(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          qe
        );
        break;
      case 5:
        vc(t);
      default:
        qp(l, t), t = Be = hm(t, ua), t = Bp(l, t, ua);
    }
    e.memoizedProps = e.pendingProps, t === null ? ro(e) : Be = t;
  }
  function mi(e, t, l, r) {
    Wn = vl = null, vc(t), ai = null, nr = 0;
    var u = t.return;
    try {
      if (O1(
        e,
        u,
        t,
        l,
        qe
      )) {
        pt = 1, Is(
          e,
          pn(l, e.current)
        ), Be = null;
        return;
      }
    } catch (f) {
      if (u !== null) throw Be = u, f;
      pt = 1, Is(
        e,
        pn(l, e.current)
      ), Be = null;
      return;
    }
    t.flags & 32768 ? ($e || r === 1 ? e = !0 : ci || (qe & 536870912) !== 0 ? e = !1 : (Oa = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = tn.current, r !== null && r.tag === 13 && (r.flags |= 16384))), vv(t, e)) : ro(t);
  }
  function ro(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        vv(
          t,
          Oa
        );
        return;
      }
      e = t.return;
      var l = V1(
        t.alternate,
        t,
        ua
      );
      if (l !== null) {
        Be = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        Be = t;
        return;
      }
      Be = t = e;
    } while (t !== null);
    pt === 0 && (pt = 5);
  }
  function vv(e, t) {
    do {
      var l = B1(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, Be = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        Be = e;
        return;
      }
      Be = e = l;
    } while (e !== null);
    pt = 6, Be = null;
  }
  function gv(e, t, l, r, u, f, g, E, N) {
    e.cancelPendingCommit = null;
    do
      so();
    while (Mt !== 0);
    if ((Ke & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (f = t.lanes | t.childLanes, f |= Yu, ds(
        e,
        l,
        f,
        g,
        E,
        N
      ), e === at && (Be = at = null, qe = 0), di = t, Va = e, ca = l, Pc = f, Jc = u, rv = r, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Z1(fn, function() {
        return Ev(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || r) {
        r = q.T, q.T = null, u = B.p, B.p = 2, g = Ke, Ke |= 4;
        try {
          k1(e, t, l);
        } finally {
          Ke = g, B.p = u, q.T = r;
        }
      }
      Mt = 1, yv(), bv(), xv();
    }
  }
  function yv() {
    if (Mt === 1) {
      Mt = 0;
      var e = Va, t = di, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = q.T, q.T = null;
        var r = B.p;
        B.p = 2;
        var u = Ke;
        Ke |= 4;
        try {
          Jp(t, e);
          var f = mf, g = lm(e.containerInfo), E = f.focusedElem, N = f.selectionRange;
          if (g !== E && E && E.ownerDocument && am(
            E.ownerDocument.documentElement,
            E
          )) {
            if (N !== null && Bu(E)) {
              var $ = N.start, Z = N.end;
              if (Z === void 0 && (Z = $), "selectionStart" in E)
                E.selectionStart = $, E.selectionEnd = Math.min(
                  Z,
                  E.value.length
                );
              else {
                var te = E.ownerDocument || document, G = te && te.defaultView || window;
                if (G.getSelection) {
                  var X = G.getSelection(), pe = E.textContent.length, Me = Math.min(N.start, pe), tt = N.end === void 0 ? Me : Math.min(N.end, pe);
                  !X.extend && Me > tt && (g = tt, tt = Me, Me = g);
                  var U = nm(
                    E,
                    Me
                  ), _ = nm(
                    E,
                    tt
                  );
                  if (U && _ && (X.rangeCount !== 1 || X.anchorNode !== U.node || X.anchorOffset !== U.offset || X.focusNode !== _.node || X.focusOffset !== _.offset)) {
                    var H = te.createRange();
                    H.setStart(U.node, U.offset), X.removeAllRanges(), Me > tt ? (X.addRange(H), X.extend(_.node, _.offset)) : (H.setEnd(_.node, _.offset), X.addRange(H));
                  }
                }
              }
            }
            for (te = [], X = E; X = X.parentNode; )
              X.nodeType === 1 && te.push({
                element: X,
                left: X.scrollLeft,
                top: X.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < te.length; E++) {
              var ee = te[E];
              ee.element.scrollLeft = ee.left, ee.element.scrollTop = ee.top;
            }
          }
          xo = !!hf, mf = hf = null;
        } finally {
          Ke = u, B.p = r, q.T = l;
        }
      }
      e.current = t, Mt = 2;
    }
  }
  function bv() {
    if (Mt === 2) {
      Mt = 0;
      var e = Va, t = di, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = q.T, q.T = null;
        var r = B.p;
        B.p = 2;
        var u = Ke;
        Ke |= 4;
        try {
          Ip(e, t.alternate, t);
        } finally {
          Ke = u, B.p = r, q.T = l;
        }
      }
      Mt = 3;
    }
  }
  function xv() {
    if (Mt === 4 || Mt === 3) {
      Mt = 0, Hi();
      var e = Va, t = di, l = ca, r = rv;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Mt = 5 : (Mt = 0, di = Va = null, Sv(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (Ua = null), F(l), t = t.stateNode, $t && typeof $t.onCommitFiberRoot == "function")
        try {
          $t.onCommitFiberRoot(
            In,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        t = q.T, u = B.p, B.p = 2, q.T = null;
        try {
          for (var f = e.onRecoverableError, g = 0; g < r.length; g++) {
            var E = r[g];
            f(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          q.T = t, B.p = u;
        }
      }
      (ca & 3) !== 0 && so(), Gn(e), u = e.pendingLanes, (l & 261930) !== 0 && (u & 42) !== 0 ? e === Wc ? br++ : (br = 0, Wc = e) : br = 0, xr(0);
    }
  }
  function Sv(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, er(t)));
  }
  function so() {
    return yv(), bv(), xv(), Ev();
  }
  function Ev() {
    if (Mt !== 5) return !1;
    var e = Va, t = Pc;
    Pc = 0;
    var l = F(ca), r = q.T, u = B.p;
    try {
      B.p = 32 > l ? 32 : l, q.T = null, l = Jc, Jc = null;
      var f = Va, g = ca;
      if (Mt = 0, di = Va = null, ca = 0, (Ke & 6) !== 0) throw Error(s(331));
      var E = Ke;
      if (Ke |= 4, av(f.current), ev(
        f,
        f.current,
        g,
        l
      ), Ke = E, xr(0, !1), $t && typeof $t.onPostCommitFiberRoot == "function")
        try {
          $t.onPostCommitFiberRoot(In, f);
        } catch {
        }
      return !0;
    } finally {
      B.p = u, q.T = r, Sv(e, t);
    }
  }
  function wv(e, t, l) {
    t = pn(l, t), t = _c(e.stateNode, t, 2), e = Ra(e, t, 2), e !== null && (kn(e, 2), Gn(e));
  }
  function Pe(e, t, l) {
    if (e.tag === 3)
      wv(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          wv(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Ua === null || !Ua.has(r))) {
            e = pn(l, e), l = jp(2), r = Ra(t, l, 2), r !== null && (Tp(
              l,
              r,
              t,
              e
            ), kn(r, 2), Gn(r));
            break;
          }
        }
        t = t.return;
      }
  }
  function nf(e, t, l) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new $1();
      var u = /* @__PURE__ */ new Set();
      r.set(t, u);
    } else
      u = r.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), r.set(t, u));
    u.has(l) || (Kc = !0, u.add(l), e = I1.bind(null, e, t, l), t.then(e, e));
  }
  function I1(e, t, l) {
    var r = e.pingCache;
    r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, at === e && (qe & l) === l && (pt === 4 || pt === 3 && (qe & 62914560) === qe && 300 > he() - to ? (Ke & 2) === 0 && hi(e, 0) : Qc |= l, fi === qe && (fi = 0)), Gn(e);
  }
  function jv(e, t) {
    t === 0 && (t = $i()), e = hl(e, t), e !== null && (kn(e, t), Gn(e));
  }
  function K1(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), jv(e, l);
  }
  function Q1(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var r = e.stateNode, u = e.memoizedState;
        u !== null && (l = u.retryLane);
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
    r !== null && r.delete(t), jv(e, l);
  }
  function Z1(e, t) {
    return ba(e, t);
  }
  var oo = null, pi = null, af = !1, uo = !1, lf = !1, ka = 0;
  function Gn(e) {
    e !== pi && e.next === null && (pi === null ? oo = pi = e : pi = pi.next = e), uo = !0, af || (af = !0, J1());
  }
  function xr(e, t) {
    if (!lf && uo) {
      lf = !0;
      do
        for (var l = !1, r = oo; r !== null; ) {
          if (e !== 0) {
            var u = r.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var g = r.suspendedLanes, E = r.pingedLanes;
              f = (1 << 31 - Vt(42 | e) + 1) - 1, f &= u & ~(g & ~E), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (l = !0, Nv(r, f));
          } else
            f = qe, f = Vl(
              r,
              r === at ? f : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (f & 3) === 0 || xa(r, f) || (l = !0, Nv(r, f));
          r = r.next;
        }
      while (l);
      lf = !1;
    }
  }
  function P1() {
    Tv();
  }
  function Tv() {
    uo = af = !1;
    var e = 0;
    ka !== 0 && oE() && (e = ka);
    for (var t = he(), l = null, r = oo; r !== null; ) {
      var u = r.next, f = Cv(r, t);
      f === 0 ? (r.next = null, l === null ? oo = u : l.next = u, u === null && (pi = l)) : (l = r, (e !== 0 || (f & 3) !== 0) && (uo = !0)), r = u;
    }
    Mt !== 0 && Mt !== 5 || xr(e), ka !== 0 && (ka = 0);
  }
  function Cv(e, t) {
    for (var l = e.suspendedLanes, r = e.pingedLanes, u = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var g = 31 - Vt(f), E = 1 << g, N = u[g];
      N === -1 ? ((E & l) === 0 || (E & r) !== 0) && (u[g] = Eu(E, t)) : N <= t && (e.expiredLanes |= E), f &= ~E;
    }
    if (t = at, l = qe, l = Vl(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, l === 0 || e === t && (Ze === 2 || Ze === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && il(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || xa(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (r !== null && il(r), F(l)) {
        case 2:
        case 8:
          l = dt;
          break;
        case 32:
          l = fn;
          break;
        case 268435456:
          l = dn;
          break;
        default:
          l = fn;
      }
      return r = Mv.bind(null, e), l = ba(l, r), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return r !== null && r !== null && il(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Mv(e, t) {
    if (Mt !== 0 && Mt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (so() && e.callbackNode !== l)
      return null;
    var r = qe;
    return r = Vl(
      e,
      e === at ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (ov(e, r, t), Cv(e, he()), e.callbackNode != null && e.callbackNode === l ? Mv.bind(null, e) : null);
  }
  function Nv(e, t) {
    if (so()) return null;
    ov(e, t, !0);
  }
  function J1() {
    cE(function() {
      (Ke & 6) !== 0 ? ba(
        Ye,
        P1
      ) : Tv();
    });
  }
  function rf() {
    if (ka === 0) {
      var e = ei;
      e === 0 && (e = rl, rl <<= 1, (rl & 261888) === 0 && (rl = 256)), ka = e;
    }
    return ka;
  }
  function Av(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : gs("" + e);
  }
  function Rv(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function W1(e, t, l, r, u) {
    if (t === "submit" && l && l.stateNode === u) {
      var f = Av(
        (u[de] || null).action
      ), g = r.submitter;
      g && (t = (t = g[de] || null) ? Av(t.formAction) : g.getAttribute("formAction"), t !== null && (f = t, g = null));
      var E = new Ss(
        "action",
        "action",
        null,
        r,
        u
      );
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (r.defaultPrevented) {
                if (ka !== 0) {
                  var N = g ? Rv(u, g) : new FormData(u);
                  Tc(
                    l,
                    {
                      pending: !0,
                      data: N,
                      method: u.method,
                      action: f
                    },
                    null,
                    N
                  );
                }
              } else
                typeof f == "function" && (E.preventDefault(), N = g ? Rv(u, g) : new FormData(u), Tc(
                  l,
                  {
                    pending: !0,
                    data: N,
                    method: u.method,
                    action: f
                  },
                  f,
                  N
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var sf = 0; sf < $u.length; sf++) {
    var of = $u[sf], eE = of.toLowerCase(), tE = of[0].toUpperCase() + of.slice(1);
    Dn(
      eE,
      "on" + tE
    );
  }
  Dn(sm, "onAnimationEnd"), Dn(om, "onAnimationIteration"), Dn(um, "onAnimationStart"), Dn("dblclick", "onDoubleClick"), Dn("focusin", "onFocus"), Dn("focusout", "onBlur"), Dn(g1, "onTransitionRun"), Dn(y1, "onTransitionStart"), Dn(b1, "onTransitionCancel"), Dn(cm, "onTransitionEnd"), qn("onMouseEnter", ["mouseout", "mouseover"]), qn("onMouseLeave", ["mouseout", "mouseover"]), qn("onPointerEnter", ["pointerout", "pointerover"]), qn("onPointerLeave", ["pointerout", "pointerover"]), At(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), At(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), At("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), At(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), At(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), At(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Sr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), nE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Sr)
  );
  function _v(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var r = e[l], u = r.event;
      r = r.listeners;
      e: {
        var f = void 0;
        if (t)
          for (var g = r.length - 1; 0 <= g; g--) {
            var E = r[g], N = E.instance, $ = E.currentTarget;
            if (E = E.listener, N !== f && u.isPropagationStopped())
              break e;
            f = E, u.currentTarget = $;
            try {
              f(u);
            } catch (Z) {
              js(Z);
            }
            u.currentTarget = null, f = N;
          }
        else
          for (g = 0; g < r.length; g++) {
            if (E = r[g], N = E.instance, $ = E.currentTarget, E = E.listener, N !== f && u.isPropagationStopped())
              break e;
            f = E, u.currentTarget = $;
            try {
              f(u);
            } catch (Z) {
              js(Z);
            }
            u.currentTarget = null, f = N;
          }
      }
    }
  }
  function ke(e, t) {
    var l = t[me];
    l === void 0 && (l = t[me] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    l.has(r) || (Dv(t, e, 2, !1), l.add(r));
  }
  function uf(e, t, l) {
    var r = 0;
    t && (r |= 4), Dv(
      l,
      e,
      r,
      t
    );
  }
  var co = "_reactListening" + Math.random().toString(36).slice(2);
  function cf(e) {
    if (!e[co]) {
      e[co] = !0, Ea.forEach(function(l) {
        l !== "selectionchange" && (nE.has(l) || uf(l, !1, e), uf(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[co] || (t[co] = !0, uf("selectionchange", !1, t));
    }
  }
  function Dv(e, t, l, r) {
    switch (sg(t)) {
      case 2:
        var u = RE;
        break;
      case 8:
        u = _E;
        break;
      default:
        u = Tf;
    }
    l = u.bind(
      null,
      t,
      l,
      e
    ), u = void 0, !Au || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), r ? u !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, l, !0) : u !== void 0 ? e.addEventListener(t, l, {
      passive: u
    }) : e.addEventListener(t, l, !1);
  }
  function ff(e, t, l, r, u) {
    var f = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (; ; ) {
        if (r === null) return;
        var g = r.tag;
        if (g === 3 || g === 4) {
          var E = r.stateNode.containerInfo;
          if (E === u) break;
          if (g === 4)
            for (g = r.return; g !== null; ) {
              var N = g.tag;
              if ((N === 3 || N === 4) && g.stateNode.containerInfo === u)
                return;
              g = g.return;
            }
          for (; E !== null; ) {
            if (g = Je(E), g === null) return;
            if (N = g.tag, N === 5 || N === 6 || N === 26 || N === 27) {
              r = f = g;
              continue e;
            }
            E = E.parentNode;
          }
        }
        r = r.return;
      }
    Vh(function() {
      var $ = f, Z = Mu(l), te = [];
      e: {
        var G = fm.get(e);
        if (G !== void 0) {
          var X = Ss, pe = e;
          switch (e) {
            case "keypress":
              if (bs(l) === 0) break e;
            case "keydown":
            case "keyup":
              X = QS;
              break;
            case "focusin":
              pe = "focus", X = zu;
              break;
            case "focusout":
              pe = "blur", X = zu;
              break;
            case "beforeblur":
            case "afterblur":
              X = zu;
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
              X = qh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              X = VS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              X = JS;
              break;
            case sm:
            case om:
            case um:
              X = qS;
              break;
            case cm:
              X = e1;
              break;
            case "scroll":
            case "scrollend":
              X = LS;
              break;
            case "wheel":
              X = n1;
              break;
            case "copy":
            case "cut":
            case "paste":
              X = $S;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              X = $h;
              break;
            case "toggle":
            case "beforetoggle":
              X = l1;
          }
          var Me = (t & 4) !== 0, tt = !Me && (e === "scroll" || e === "scrollend"), U = Me ? G !== null ? G + "Capture" : null : G;
          Me = [];
          for (var _ = $, H; _ !== null; ) {
            var ee = _;
            if (H = ee.stateNode, ee = ee.tag, ee !== 5 && ee !== 26 && ee !== 27 || H === null || U === null || (ee = Yi(_, U), ee != null && Me.push(
              Er(_, ee, H)
            )), tt) break;
            _ = _.return;
          }
          0 < Me.length && (G = new X(
            G,
            pe,
            null,
            l,
            Z
          ), te.push({ event: G, listeners: Me }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (G = e === "mouseover" || e === "pointerover", X = e === "mouseout" || e === "pointerout", G && l !== Cu && (pe = l.relatedTarget || l.fromElement) && (Je(pe) || pe[ye]))
            break e;
          if ((X || G) && (G = Z.window === Z ? Z : (G = Z.ownerDocument) ? G.defaultView || G.parentWindow : window, X ? (pe = l.relatedTarget || l.toElement, X = $, pe = pe ? Je(pe) : null, pe !== null && (tt = c(pe), Me = pe.tag, pe !== tt || Me !== 5 && Me !== 27 && Me !== 6) && (pe = null)) : (X = null, pe = $), X !== pe)) {
            if (Me = qh, ee = "onMouseLeave", U = "onMouseEnter", _ = "mouse", (e === "pointerout" || e === "pointerover") && (Me = $h, ee = "onPointerLeave", U = "onPointerEnter", _ = "pointer"), tt = X == null ? G : Ve(X), H = pe == null ? G : Ve(pe), G = new Me(
              ee,
              _ + "leave",
              X,
              l,
              Z
            ), G.target = tt, G.relatedTarget = H, ee = null, Je(Z) === $ && (Me = new Me(
              U,
              _ + "enter",
              pe,
              l,
              Z
            ), Me.target = H, Me.relatedTarget = tt, ee = Me), tt = ee, X && pe)
              t: {
                for (Me = aE, U = X, _ = pe, H = 0, ee = U; ee; ee = Me(ee))
                  H++;
                ee = 0;
                for (var je = _; je; je = Me(je))
                  ee++;
                for (; 0 < H - ee; )
                  U = Me(U), H--;
                for (; 0 < ee - H; )
                  _ = Me(_), ee--;
                for (; H--; ) {
                  if (U === _ || _ !== null && U === _.alternate) {
                    Me = U;
                    break t;
                  }
                  U = Me(U), _ = Me(_);
                }
                Me = null;
              }
            else Me = null;
            X !== null && zv(
              te,
              G,
              X,
              Me,
              !1
            ), pe !== null && tt !== null && zv(
              te,
              tt,
              pe,
              Me,
              !0
            );
          }
        }
        e: {
          if (G = $ ? Ve($) : window, X = G.nodeName && G.nodeName.toLowerCase(), X === "select" || X === "input" && G.type === "file")
            var Xe = Zh;
          else if (Kh(G))
            if (Ph)
              Xe = m1;
            else {
              Xe = d1;
              var be = f1;
            }
          else
            X = G.nodeName, !X || X.toLowerCase() !== "input" || G.type !== "checkbox" && G.type !== "radio" ? $ && Tu($.elementType) && (Xe = Zh) : Xe = h1;
          if (Xe && (Xe = Xe(e, $))) {
            Qh(
              te,
              Xe,
              l,
              Z
            );
            break e;
          }
          be && be(e, G, $), e === "focusout" && $ && G.type === "number" && $.memoizedProps.value != null && ju(G, "number", G.value);
        }
        switch (be = $ ? Ve($) : window, e) {
          case "focusin":
            (Kh(be) || be.contentEditable === "true") && (Xl = be, ku = $, Pi = null);
            break;
          case "focusout":
            Pi = ku = Xl = null;
            break;
          case "mousedown":
            qu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            qu = !1, im(te, l, Z);
            break;
          case "selectionchange":
            if (v1) break;
          case "keydown":
          case "keyup":
            im(te, l, Z);
        }
        var ze;
        if (Lu)
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
          Gl ? Xh(e, l) && (He = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (He = "onCompositionStart");
        He && (Yh && l.locale !== "ko" && (Gl || He !== "onCompositionStart" ? He === "onCompositionEnd" && Gl && (ze = Bh()) : (wa = Z, Ru = "value" in wa ? wa.value : wa.textContent, Gl = !0)), be = fo($, He), 0 < be.length && (He = new Hh(
          He,
          e,
          null,
          l,
          Z
        ), te.push({ event: He, listeners: be }), ze ? He.data = ze : (ze = Ih(l), ze !== null && (He.data = ze)))), (ze = r1 ? s1(e, l) : o1(e, l)) && (He = fo($, "onBeforeInput"), 0 < He.length && (be = new Hh(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          Z
        ), te.push({
          event: be,
          listeners: He
        }), be.data = ze)), W1(
          te,
          e,
          $,
          l,
          Z
        );
      }
      _v(te, t);
    });
  }
  function Er(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function fo(e, t) {
    for (var l = t + "Capture", r = []; e !== null; ) {
      var u = e, f = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || f === null || (u = Yi(e, l), u != null && r.unshift(
        Er(e, u, f)
      ), u = Yi(e, t), u != null && r.push(
        Er(e, u, f)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function aE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function zv(e, t, l, r, u) {
    for (var f = t._reactName, g = []; l !== null && l !== r; ) {
      var E = l, N = E.alternate, $ = E.stateNode;
      if (E = E.tag, N !== null && N === r) break;
      E !== 5 && E !== 26 && E !== 27 || $ === null || (N = $, u ? ($ = Yi(l, f), $ != null && g.unshift(
        Er(l, $, N)
      )) : u || ($ = Yi(l, f), $ != null && g.push(
        Er(l, $, N)
      ))), l = l.return;
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  var lE = /\r\n?/g, iE = /\u0000|\uFFFD/g;
  function Ov(e) {
    return (typeof e == "string" ? e : "" + e).replace(lE, `
`).replace(iE, "");
  }
  function Lv(e, t) {
    return t = Ov(t), Ov(e) === t;
  }
  function et(e, t, l, r, u, f) {
    switch (l) {
      case "children":
        typeof r == "string" ? t === "body" || t === "textarea" && r === "" || $l(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && $l(e, "" + r);
        break;
      case "className":
        vt(e, "class", r);
        break;
      case "tabIndex":
        vt(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        vt(e, l, r);
        break;
      case "style":
        Lh(e, r, f);
        break;
      case "data":
        if (t !== "object") {
          vt(e, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(l);
          break;
        }
        r = gs("" + r), e.setAttribute(l, r);
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
          typeof f == "function" && (l === "formAction" ? (t !== "input" && et(e, t, "name", u.name, u, null), et(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), et(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), et(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (et(e, t, "encType", u.encType, u, null), et(e, t, "method", u.method, u, null), et(e, t, "target", u.target, u, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(l);
          break;
        }
        r = gs("" + r), e.setAttribute(l, r);
        break;
      case "onClick":
        r != null && (e.onclick = Qn);
        break;
      case "onScroll":
        r != null && ke("scroll", e);
        break;
      case "onScrollEnd":
        r != null && ke("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(s(61));
          if (l = r.__html, l != null) {
            if (u.children != null) throw Error(s(60));
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
        l = gs("" + r), e.setAttributeNS(
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
        ke("beforetoggle", e), ke("toggle", e), Le(e, "popover", r);
        break;
      case "xlinkActuate":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        Bt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        Bt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        Bt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          r
        );
        break;
      case "is":
        Le(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = zS.get(l) || l, Le(e, l, r));
    }
  }
  function df(e, t, l, r, u, f) {
    switch (l) {
      case "style":
        Lh(e, r, f);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(s(61));
          if (l = r.__html, l != null) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof r == "string" ? $l(e, r) : (typeof r == "number" || typeof r == "bigint") && $l(e, "" + r);
        break;
      case "onScroll":
        r != null && ke("scroll", e);
        break;
      case "onScrollEnd":
        r != null && ke("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = Qn);
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
        if (!_n.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (u = l.endsWith("Capture"), t = l.slice(2, u ? l.length - 7 : void 0), f = e[de] || null, f = f != null ? f[l] : null, typeof f == "function" && e.removeEventListener(t, f, u), typeof r == "function")) {
              typeof f != "function" && f !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, r, u);
              break e;
            }
            l in e ? e[l] = r : r === !0 ? e.setAttribute(l, "") : Le(e, l, r);
          }
    }
  }
  function Ot(e, t, l) {
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
        ke("error", e), ke("load", e);
        var r = !1, u = !1, f;
        for (f in l)
          if (l.hasOwnProperty(f)) {
            var g = l[f];
            if (g != null)
              switch (f) {
                case "src":
                  r = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  et(e, t, f, g, l, null);
              }
          }
        u && et(e, t, "srcSet", l.srcSet, l, null), r && et(e, t, "src", l.src, l, null);
        return;
      case "input":
        ke("invalid", e);
        var E = f = g = u = null, N = null, $ = null;
        for (r in l)
          if (l.hasOwnProperty(r)) {
            var Z = l[r];
            if (Z != null)
              switch (r) {
                case "name":
                  u = Z;
                  break;
                case "type":
                  g = Z;
                  break;
                case "checked":
                  N = Z;
                  break;
                case "defaultChecked":
                  $ = Z;
                  break;
                case "value":
                  f = Z;
                  break;
                case "defaultValue":
                  E = Z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Z != null)
                    throw Error(s(137, t));
                  break;
                default:
                  et(e, t, r, Z, l, null);
              }
          }
        _h(
          e,
          f,
          E,
          N,
          $,
          g,
          u,
          !1
        );
        return;
      case "select":
        ke("invalid", e), r = g = f = null;
        for (u in l)
          if (l.hasOwnProperty(u) && (E = l[u], E != null))
            switch (u) {
              case "value":
                f = E;
                break;
              case "defaultValue":
                g = E;
                break;
              case "multiple":
                r = E;
              default:
                et(e, t, u, E, l, null);
            }
        t = f, l = g, e.multiple = !!r, t != null ? Hl(e, !!r, t, !1) : l != null && Hl(e, !!r, l, !0);
        return;
      case "textarea":
        ke("invalid", e), f = u = r = null;
        for (g in l)
          if (l.hasOwnProperty(g) && (E = l[g], E != null))
            switch (g) {
              case "value":
                r = E;
                break;
              case "defaultValue":
                u = E;
                break;
              case "children":
                f = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(s(91));
                break;
              default:
                et(e, t, g, E, l, null);
            }
        zh(e, r, u, f);
        return;
      case "option":
        for (N in l)
          if (l.hasOwnProperty(N) && (r = l[N], r != null))
            switch (N) {
              case "selected":
                e.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                et(e, t, N, r, l, null);
            }
        return;
      case "dialog":
        ke("beforetoggle", e), ke("toggle", e), ke("cancel", e), ke("close", e);
        break;
      case "iframe":
      case "object":
        ke("load", e);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Sr.length; r++)
          ke(Sr[r], e);
        break;
      case "image":
        ke("error", e), ke("load", e);
        break;
      case "details":
        ke("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ke("error", e), ke("load", e);
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
        for ($ in l)
          if (l.hasOwnProperty($) && (r = l[$], r != null))
            switch ($) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                et(e, t, $, r, l, null);
            }
        return;
      default:
        if (Tu(t)) {
          for (Z in l)
            l.hasOwnProperty(Z) && (r = l[Z], r !== void 0 && df(
              e,
              t,
              Z,
              r,
              l,
              void 0
            ));
          return;
        }
    }
    for (E in l)
      l.hasOwnProperty(E) && (r = l[E], r != null && et(e, t, E, r, l, null));
  }
  function rE(e, t, l, r) {
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
        var u = null, f = null, g = null, E = null, N = null, $ = null, Z = null;
        for (X in l) {
          var te = l[X];
          if (l.hasOwnProperty(X) && te != null)
            switch (X) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                N = te;
              default:
                r.hasOwnProperty(X) || et(e, t, X, null, r, te);
            }
        }
        for (var G in r) {
          var X = r[G];
          if (te = l[G], r.hasOwnProperty(G) && (X != null || te != null))
            switch (G) {
              case "type":
                f = X;
                break;
              case "name":
                u = X;
                break;
              case "checked":
                $ = X;
                break;
              case "defaultChecked":
                Z = X;
                break;
              case "value":
                g = X;
                break;
              case "defaultValue":
                E = X;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (X != null)
                  throw Error(s(137, t));
                break;
              default:
                X !== te && et(
                  e,
                  t,
                  G,
                  X,
                  r,
                  te
                );
            }
        }
        wu(
          e,
          g,
          E,
          N,
          $,
          Z,
          f,
          u
        );
        return;
      case "select":
        X = g = E = G = null;
        for (f in l)
          if (N = l[f], l.hasOwnProperty(f) && N != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                X = N;
              default:
                r.hasOwnProperty(f) || et(
                  e,
                  t,
                  f,
                  null,
                  r,
                  N
                );
            }
        for (u in r)
          if (f = r[u], N = l[u], r.hasOwnProperty(u) && (f != null || N != null))
            switch (u) {
              case "value":
                G = f;
                break;
              case "defaultValue":
                E = f;
                break;
              case "multiple":
                g = f;
              default:
                f !== N && et(
                  e,
                  t,
                  u,
                  f,
                  r,
                  N
                );
            }
        t = E, l = g, r = X, G != null ? Hl(e, !!l, G, !1) : !!r != !!l && (t != null ? Hl(e, !!l, t, !0) : Hl(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        X = G = null;
        for (E in l)
          if (u = l[E], l.hasOwnProperty(E) && u != null && !r.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                et(e, t, E, null, r, u);
            }
        for (g in r)
          if (u = r[g], f = l[g], r.hasOwnProperty(g) && (u != null || f != null))
            switch (g) {
              case "value":
                G = u;
                break;
              case "defaultValue":
                X = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== f && et(e, t, g, u, r, f);
            }
        Dh(e, G, X);
        return;
      case "option":
        for (var pe in l)
          if (G = l[pe], l.hasOwnProperty(pe) && G != null && !r.hasOwnProperty(pe))
            switch (pe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                et(
                  e,
                  t,
                  pe,
                  null,
                  r,
                  G
                );
            }
        for (N in r)
          if (G = r[N], X = l[N], r.hasOwnProperty(N) && G !== X && (G != null || X != null))
            switch (N) {
              case "selected":
                e.selected = G && typeof G != "function" && typeof G != "symbol";
                break;
              default:
                et(
                  e,
                  t,
                  N,
                  G,
                  r,
                  X
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
        for (var Me in l)
          G = l[Me], l.hasOwnProperty(Me) && G != null && !r.hasOwnProperty(Me) && et(e, t, Me, null, r, G);
        for ($ in r)
          if (G = r[$], X = l[$], r.hasOwnProperty($) && G !== X && (G != null || X != null))
            switch ($) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (G != null)
                  throw Error(s(137, t));
                break;
              default:
                et(
                  e,
                  t,
                  $,
                  G,
                  r,
                  X
                );
            }
        return;
      default:
        if (Tu(t)) {
          for (var tt in l)
            G = l[tt], l.hasOwnProperty(tt) && G !== void 0 && !r.hasOwnProperty(tt) && df(
              e,
              t,
              tt,
              void 0,
              r,
              G
            );
          for (Z in r)
            G = r[Z], X = l[Z], !r.hasOwnProperty(Z) || G === X || G === void 0 && X === void 0 || df(
              e,
              t,
              Z,
              G,
              r,
              X
            );
          return;
        }
    }
    for (var U in l)
      G = l[U], l.hasOwnProperty(U) && G != null && !r.hasOwnProperty(U) && et(e, t, U, null, r, G);
    for (te in r)
      G = r[te], X = l[te], !r.hasOwnProperty(te) || G === X || G == null && X == null || et(e, t, te, G, r, X);
  }
  function Uv(e) {
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
  function sE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), r = 0; r < l.length; r++) {
        var u = l[r], f = u.transferSize, g = u.initiatorType, E = u.duration;
        if (f && E && Uv(g)) {
          for (g = 0, E = u.responseEnd, r += 1; r < l.length; r++) {
            var N = l[r], $ = N.startTime;
            if ($ > E) break;
            var Z = N.transferSize, te = N.initiatorType;
            Z && Uv(te) && (N = N.responseEnd, g += Z * (N < E ? 1 : (E - $) / (N - $)));
          }
          if (--r, t += 8 * (f + g) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var hf = null, mf = null;
  function ho(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Vv(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Bv(e, t) {
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
  function pf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var vf = null;
  function oE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === vf ? !1 : (vf = e, !0) : (vf = null, !1);
  }
  var kv = typeof setTimeout == "function" ? setTimeout : void 0, uE = typeof clearTimeout == "function" ? clearTimeout : void 0, qv = typeof Promise == "function" ? Promise : void 0, cE = typeof queueMicrotask == "function" ? queueMicrotask : typeof qv < "u" ? function(e) {
    return qv.resolve(null).then(e).catch(fE);
  } : kv;
  function fE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function qa(e) {
    return e === "head";
  }
  function Hv(e, t) {
    var l = t, r = 0;
    do {
      var u = l.nextSibling;
      if (e.removeChild(l), u && u.nodeType === 8)
        if (l = u.data, l === "/$" || l === "/&") {
          if (r === 0) {
            e.removeChild(u), bi(t);
            return;
          }
          r--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          r++;
        else if (l === "html")
          wr(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, wr(l);
          for (var f = l.firstChild; f; ) {
            var g = f.nextSibling, E = f.nodeName;
            f[Oe] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && f.rel.toLowerCase() === "stylesheet" || l.removeChild(f), f = g;
          }
        } else
          l === "body" && wr(e.ownerDocument.body);
      l = u;
    } while (l);
    bi(t);
  }
  function $v(e, t) {
    var l = e;
    e = 0;
    do {
      var r = l.nextSibling;
      if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), r && r.nodeType === 8)
        if (l = r.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = r;
    } while (l);
  }
  function gf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          gf(l), nt(l);
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
  function dE(e, t, l, r) {
    for (; e.nodeType === 1; ) {
      var u = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (r) {
        if (!e[Oe])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (f = e.getAttribute("rel"), f === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (f !== u.rel || e.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || e.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (f = e.getAttribute("src"), (f !== (u.src == null ? null : u.src) || e.getAttribute("type") !== (u.type == null ? null : u.type) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var f = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = xn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function hE(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = xn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Yv(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = xn(e.nextSibling), e === null)) return null;
    return e;
  }
  function yf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function bf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function mE(e, t) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || l.readyState !== "loading")
      t();
    else {
      var r = function() {
        t(), l.removeEventListener("DOMContentLoaded", r);
      };
      l.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
    }
  }
  function xn(e) {
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
  var xf = null;
  function Fv(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return xn(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Gv(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (t === 0) return e;
          t--;
        } else l !== "/$" && l !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Xv(e, t, l) {
    switch (t = ho(l), e) {
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
  function wr(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    nt(e);
  }
  var Sn = /* @__PURE__ */ new Map(), Iv = /* @__PURE__ */ new Set();
  function mo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var fa = B.d;
  B.d = {
    f: pE,
    r: vE,
    D: gE,
    C: yE,
    L: bE,
    m: xE,
    X: EE,
    S: SE,
    M: wE
  };
  function pE() {
    var e = fa.f(), t = lo();
    return e || t;
  }
  function vE(e) {
    var t = ct(e);
    t !== null && t.tag === 5 && t.type === "form" ? cp(t) : fa.r(e);
  }
  var vi = typeof document > "u" ? null : document;
  function Kv(e, t, l) {
    var r = vi;
    if (r && typeof t == "string" && t) {
      var u = hn(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof l == "string" && (u += '[crossorigin="' + l + '"]'), Iv.has(u) || (Iv.add(u), e = { rel: e, crossOrigin: l, href: t }, r.querySelector(u) === null && (t = r.createElement("link"), Ot(t, "link", e), lt(t), r.head.appendChild(t)));
    }
  }
  function gE(e) {
    fa.D(e), Kv("dns-prefetch", e, null);
  }
  function yE(e, t) {
    fa.C(e, t), Kv("preconnect", e, t);
  }
  function bE(e, t, l) {
    fa.L(e, t, l);
    var r = vi;
    if (r && e && t) {
      var u = 'link[rel="preload"][as="' + hn(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (u += '[imagesrcset="' + hn(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (u += '[imagesizes="' + hn(
        l.imageSizes
      ) + '"]')) : u += '[href="' + hn(e) + '"]';
      var f = u;
      switch (t) {
        case "style":
          f = gi(e);
          break;
        case "script":
          f = yi(e);
      }
      Sn.has(f) || (e = b(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Sn.set(f, e), r.querySelector(u) !== null || t === "style" && r.querySelector(jr(f)) || t === "script" && r.querySelector(Tr(f)) || (t = r.createElement("link"), Ot(t, "link", e), lt(t), r.head.appendChild(t)));
    }
  }
  function xE(e, t) {
    fa.m(e, t);
    var l = vi;
    if (l && e) {
      var r = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + hn(r) + '"][href="' + hn(e) + '"]', f = u;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = yi(e);
      }
      if (!Sn.has(f) && (e = b({ rel: "modulepreload", href: e }, t), Sn.set(f, e), l.querySelector(u) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Tr(f)))
              return;
        }
        r = l.createElement("link"), Ot(r, "link", e), lt(r), l.head.appendChild(r);
      }
    }
  }
  function SE(e, t, l) {
    fa.S(e, t, l);
    var r = vi;
    if (r && e) {
      var u = xt(r).hoistableStyles, f = gi(e);
      t = t || "default";
      var g = u.get(f);
      if (!g) {
        var E = { loading: 0, preload: null };
        if (g = r.querySelector(
          jr(f)
        ))
          E.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Sn.get(f)) && Sf(e, l);
          var N = g = r.createElement("link");
          lt(N), Ot(N, "link", e), N._p = new Promise(function($, Z) {
            N.onload = $, N.onerror = Z;
          }), N.addEventListener("load", function() {
            E.loading |= 1;
          }), N.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, po(g, t, r);
        }
        g = {
          type: "stylesheet",
          instance: g,
          count: 1,
          state: E
        }, u.set(f, g);
      }
    }
  }
  function EE(e, t) {
    fa.X(e, t);
    var l = vi;
    if (l && e) {
      var r = xt(l).hoistableScripts, u = yi(e), f = r.get(u);
      f || (f = l.querySelector(Tr(u)), f || (e = b({ src: e, async: !0 }, t), (t = Sn.get(u)) && Ef(e, t), f = l.createElement("script"), lt(f), Ot(f, "link", e), l.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, r.set(u, f));
    }
  }
  function wE(e, t) {
    fa.M(e, t);
    var l = vi;
    if (l && e) {
      var r = xt(l).hoistableScripts, u = yi(e), f = r.get(u);
      f || (f = l.querySelector(Tr(u)), f || (e = b({ src: e, async: !0, type: "module" }, t), (t = Sn.get(u)) && Ef(e, t), f = l.createElement("script"), lt(f), Ot(f, "link", e), l.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, r.set(u, f));
    }
  }
  function Qv(e, t, l, r) {
    var u = (u = Ce.current) ? mo(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = gi(l.href), l = xt(
          u
        ).hoistableStyles, r = l.get(t), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = gi(l.href);
          var f = xt(
            u
          ).hoistableStyles, g = f.get(e);
          if (g || (u = u.ownerDocument || u, g = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, g), (f = u.querySelector(
            jr(e)
          )) && !f._p && (g.instance = f, g.state.loading = 5), Sn.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Sn.set(e, l), f || jE(
            u,
            e,
            l,
            g.state
          ))), t && r === null)
            throw Error(s(528, ""));
          return g;
        }
        if (t && r !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = yi(l), l = xt(
          u
        ).hoistableScripts, r = l.get(t), r || (r = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, r)), r) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function gi(e) {
    return 'href="' + hn(e) + '"';
  }
  function jr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Zv(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function jE(e, t, l, r) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
      return r.loading |= 1;
    }), t.addEventListener("error", function() {
      return r.loading |= 2;
    }), Ot(t, "link", l), lt(t), e.head.appendChild(t));
  }
  function yi(e) {
    return '[src="' + hn(e) + '"]';
  }
  function Tr(e) {
    return "script[async]" + e;
  }
  function Pv(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + hn(l.href) + '"]'
          );
          if (r)
            return t.instance = r, lt(r), r;
          var u = b({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), lt(r), Ot(r, "style", u), po(r, l.precedence, e), t.instance = r;
        case "stylesheet":
          u = gi(l.href);
          var f = e.querySelector(
            jr(u)
          );
          if (f)
            return t.state.loading |= 4, t.instance = f, lt(f), f;
          r = Zv(l), (u = Sn.get(u)) && Sf(r, u), f = (e.ownerDocument || e).createElement("link"), lt(f);
          var g = f;
          return g._p = new Promise(function(E, N) {
            g.onload = E, g.onerror = N;
          }), Ot(f, "link", r), t.state.loading |= 4, po(f, l.precedence, e), t.instance = f;
        case "script":
          return f = yi(l.src), (u = e.querySelector(
            Tr(f)
          )) ? (t.instance = u, lt(u), u) : (r = l, (u = Sn.get(f)) && (r = b({}, l), Ef(r, u)), e = e.ownerDocument || e, u = e.createElement("script"), lt(u), Ot(u, "link", r), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (r = t.instance, t.state.loading |= 4, po(r, l.precedence, e));
    return t.instance;
  }
  function po(e, t, l) {
    for (var r = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = r.length ? r[r.length - 1] : null, f = u, g = 0; g < r.length; g++) {
      var E = r[g];
      if (E.dataset.precedence === t) f = E;
      else if (f !== u) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Sf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Ef(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var vo = null;
  function Jv(e, t, l) {
    if (vo === null) {
      var r = /* @__PURE__ */ new Map(), u = vo = /* @__PURE__ */ new Map();
      u.set(l, r);
    } else
      u = vo, r = u.get(l), r || (r = /* @__PURE__ */ new Map(), u.set(l, r));
    if (r.has(e)) return r;
    for (r.set(e, null), l = l.getElementsByTagName(e), u = 0; u < l.length; u++) {
      var f = l[u];
      if (!(f[Oe] || f[fe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var g = f.getAttribute(t) || "";
        g = e + g;
        var E = r.get(g);
        E ? E.push(f) : r.set(g, [f]);
      }
    }
    return r;
  }
  function Wv(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function TE(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
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
  function eg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function CE(e, t, l, r) {
    if (l.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var u = gi(r.href), f = t.querySelector(
          jr(u)
        );
        if (f) {
          t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = go.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = f, lt(f);
          return;
        }
        f = t.ownerDocument || t, r = Zv(r), (u = Sn.get(u)) && Sf(r, u), f = f.createElement("link"), lt(f);
        var g = f;
        g._p = new Promise(function(E, N) {
          g.onload = E, g.onerror = N;
        }), Ot(f, "link", r), l.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = go.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var wf = 0;
  function ME(e, t) {
    return e.stylesheets && e.count === 0 && bo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var r = setTimeout(function() {
        if (e.stylesheets && bo(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + t);
      0 < e.imgBytes && wf === 0 && (wf = 62500 * sE());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && bo(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > wf ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(u);
      };
    } : null;
  }
  function go() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) bo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var yo = null;
  function bo(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, yo = /* @__PURE__ */ new Map(), t.forEach(NE, e), yo = null, go.call(e));
  }
  function NE(e, t) {
    if (!(t.state.loading & 4)) {
      var l = yo.get(e);
      if (l) var r = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), yo.set(e, l);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < u.length; f++) {
          var g = u[f];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") && (l.set(g.dataset.precedence, g), r = g);
        }
        r && l.set(null, r);
      }
      u = t.instance, g = u.getAttribute("data-precedence"), f = l.get(g) || r, f === r && l.set(null, u), l.set(g, u), this.count++, r = go.bind(this), u.addEventListener("load", r), u.addEventListener("error", r), f ? f.parentNode.insertBefore(u, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Cr = {
    $$typeof: z,
    Provider: null,
    Consumer: null,
    _currentValue: Y,
    _currentValue2: Y,
    _threadCount: 0
  };
  function AE(e, t, l, r, u, f, g, E, N) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Sa(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Sa(0), this.hiddenUpdates = Sa(null), this.identifierPrefix = r, this.onUncaughtError = u, this.onCaughtError = f, this.onRecoverableError = g, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = N, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function tg(e, t, l, r, u, f, g, E, N, $, Z, te) {
    return e = new AE(
      e,
      t,
      l,
      g,
      N,
      $,
      Z,
      te,
      E
    ), t = 1, f === !0 && (t |= 24), f = en(3, null, null, t), e.current = f, f.stateNode = e, t = tc(), t.refCount++, e.pooledCache = t, t.refCount++, f.memoizedState = {
      element: r,
      isDehydrated: l,
      cache: t
    }, ic(f), e;
  }
  function ng(e) {
    return e ? (e = Ql, e) : Ql;
  }
  function ag(e, t, l, r, u, f) {
    u = ng(u), r.context === null ? r.context = u : r.pendingContext = u, r = Aa(t), r.payload = { element: l }, f = f === void 0 ? null : f, f !== null && (r.callback = f), l = Ra(e, r, t), l !== null && (Pt(l, e, t), lr(l, e, t));
  }
  function lg(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function jf(e, t) {
    lg(e, t), (e = e.alternate) && lg(e, t);
  }
  function ig(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = hl(e, 67108864);
      t !== null && Pt(t, e, 67108864), jf(e, 67108864);
    }
  }
  function rg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = rn();
      t = L(t);
      var l = hl(e, t);
      l !== null && Pt(l, e, t), jf(e, t);
    }
  }
  var xo = !0;
  function RE(e, t, l, r) {
    var u = q.T;
    q.T = null;
    var f = B.p;
    try {
      B.p = 2, Tf(e, t, l, r);
    } finally {
      B.p = f, q.T = u;
    }
  }
  function _E(e, t, l, r) {
    var u = q.T;
    q.T = null;
    var f = B.p;
    try {
      B.p = 8, Tf(e, t, l, r);
    } finally {
      B.p = f, q.T = u;
    }
  }
  function Tf(e, t, l, r) {
    if (xo) {
      var u = Cf(r);
      if (u === null)
        ff(
          e,
          t,
          r,
          So,
          l
        ), og(e, r);
      else if (zE(
        u,
        e,
        t,
        l,
        r
      ))
        r.stopPropagation();
      else if (og(e, r), t & 4 && -1 < DE.indexOf(e)) {
        for (; u !== null; ) {
          var f = ct(u);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var g = Rn(f.pendingLanes);
                  if (g !== 0) {
                    var E = f;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; g; ) {
                      var N = 1 << 31 - Vt(g);
                      E.entanglements[1] |= N, g &= ~N;
                    }
                    Gn(f), (Ke & 6) === 0 && (no = he() + 500, xr(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = hl(f, 2), E !== null && Pt(E, f, 2), lo(), jf(f, 2);
            }
          if (f = Cf(r), f === null && ff(
            e,
            t,
            r,
            So,
            l
          ), f === u) break;
          u = f;
        }
        u !== null && r.stopPropagation();
      } else
        ff(
          e,
          t,
          r,
          null,
          l
        );
    }
  }
  function Cf(e) {
    return e = Mu(e), Mf(e);
  }
  var So = null;
  function Mf(e) {
    if (So = null, e = Je(e), e !== null) {
      var t = c(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return So = e, null;
  }
  function sg(e) {
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
        switch (Ae()) {
          case Ye:
            return 2;
          case dt:
            return 8;
          case fn:
          case An:
            return 32;
          case dn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Nf = !1, Ha = null, $a = null, Ya = null, Mr = /* @__PURE__ */ new Map(), Nr = /* @__PURE__ */ new Map(), Fa = [], DE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function og(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ha = null;
        break;
      case "dragenter":
      case "dragleave":
        $a = null;
        break;
      case "mouseover":
      case "mouseout":
        Ya = null;
        break;
      case "pointerover":
      case "pointerout":
        Mr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Nr.delete(t.pointerId);
    }
  }
  function Ar(e, t, l, r, u, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: r,
      nativeEvent: f,
      targetContainers: [u]
    }, t !== null && (t = ct(t), t !== null && ig(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function zE(e, t, l, r, u) {
    switch (t) {
      case "focusin":
        return Ha = Ar(
          Ha,
          e,
          t,
          l,
          r,
          u
        ), !0;
      case "dragenter":
        return $a = Ar(
          $a,
          e,
          t,
          l,
          r,
          u
        ), !0;
      case "mouseover":
        return Ya = Ar(
          Ya,
          e,
          t,
          l,
          r,
          u
        ), !0;
      case "pointerover":
        var f = u.pointerId;
        return Mr.set(
          f,
          Ar(
            Mr.get(f) || null,
            e,
            t,
            l,
            r,
            u
          )
        ), !0;
      case "gotpointercapture":
        return f = u.pointerId, Nr.set(
          f,
          Ar(
            Nr.get(f) || null,
            e,
            t,
            l,
            r,
            u
          )
        ), !0;
    }
    return !1;
  }
  function ug(e) {
    var t = Je(e.target);
    if (t !== null) {
      var l = c(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = h(l), t !== null) {
            e.blockedOn = t, ie(e.priority, function() {
              rg(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(l), t !== null) {
            e.blockedOn = t, ie(e.priority, function() {
              rg(l);
            });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Eo(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Cf(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var r = new l.constructor(
          l.type,
          l
        );
        Cu = r, l.target.dispatchEvent(r), Cu = null;
      } else
        return t = ct(l), t !== null && ig(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function cg(e, t, l) {
    Eo(e) && l.delete(t);
  }
  function OE() {
    Nf = !1, Ha !== null && Eo(Ha) && (Ha = null), $a !== null && Eo($a) && ($a = null), Ya !== null && Eo(Ya) && (Ya = null), Mr.forEach(cg), Nr.forEach(cg);
  }
  function wo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Nf || (Nf = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      OE
    )));
  }
  var jo = null;
  function fg(e) {
    jo !== e && (jo = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        jo === e && (jo = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], r = e[t + 1], u = e[t + 2];
          if (typeof r != "function") {
            if (Mf(r || l) === null)
              continue;
            break;
          }
          var f = ct(l);
          f !== null && (e.splice(t, 3), t -= 3, Tc(
            f,
            {
              pending: !0,
              data: u,
              method: l.method,
              action: r
            },
            r,
            u
          ));
        }
      }
    ));
  }
  function bi(e) {
    function t(N) {
      return wo(N, e);
    }
    Ha !== null && wo(Ha, e), $a !== null && wo($a, e), Ya !== null && wo(Ya, e), Mr.forEach(t), Nr.forEach(t);
    for (var l = 0; l < Fa.length; l++) {
      var r = Fa[l];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Fa.length && (l = Fa[0], l.blockedOn === null); )
      ug(l), l.blockedOn === null && Fa.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (r = 0; r < l.length; r += 3) {
        var u = l[r], f = l[r + 1], g = u[de] || null;
        if (typeof f == "function")
          g || fg(l);
        else if (g) {
          var E = null;
          if (f && f.hasAttribute("formAction")) {
            if (u = f, g = f[de] || null)
              E = g.formAction;
            else if (Mf(u) !== null) continue;
          } else E = g.action;
          typeof E == "function" ? l[r + 1] = E : (l.splice(r, 3), r -= 3), fg(l);
        }
      }
  }
  function dg() {
    function e(f) {
      f.canIntercept && f.info === "react-transition" && f.intercept({
        handler: function() {
          return new Promise(function(g) {
            return u = g;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), r || setTimeout(l, 20);
    }
    function l() {
      if (!r && !navigation.transition) {
        var f = navigation.currentEntry;
        f && f.url != null && navigation.navigate(f.url, {
          state: f.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var r = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
        r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function Af(e) {
    this._internalRoot = e;
  }
  To.prototype.render = Af.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var l = t.current, r = rn();
    ag(l, r, e, t, null, null);
  }, To.prototype.unmount = Af.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      ag(e.current, 2, null, e, null, null), lo(), t[ye] = null;
    }
  };
  function To(e) {
    this._internalRoot = e;
  }
  To.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ae();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Fa.length && t !== 0 && t < Fa[l].priority; l++) ;
      Fa.splice(l, 0, e), l === 0 && ug(e);
    }
  };
  var hg = a.version;
  if (hg !== "19.2.5")
    throw Error(
      s(
        527,
        hg,
        "19.2.5"
      )
    );
  B.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = p(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var LE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: q,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Co = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Co.isDisabled && Co.supportsFiber)
      try {
        In = Co.inject(
          LE
        ), $t = Co;
      } catch {
      }
  }
  return _r.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var l = !1, r = "", u = xp, f = Sp, g = Ep;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (g = t.onRecoverableError)), t = tg(
      e,
      1,
      !1,
      null,
      null,
      l,
      r,
      null,
      u,
      f,
      g,
      dg
    ), e[ye] = t.current, cf(e), new Af(t);
  }, _r.hydrateRoot = function(e, t, l) {
    if (!o(e)) throw Error(s(299));
    var r = !1, u = "", f = xp, g = Sp, E = Ep, N = null;
    return l != null && (l.unstable_strictMode === !0 && (r = !0), l.identifierPrefix !== void 0 && (u = l.identifierPrefix), l.onUncaughtError !== void 0 && (f = l.onUncaughtError), l.onCaughtError !== void 0 && (g = l.onCaughtError), l.onRecoverableError !== void 0 && (E = l.onRecoverableError), l.formState !== void 0 && (N = l.formState)), t = tg(
      e,
      1,
      !0,
      t,
      l ?? null,
      r,
      u,
      N,
      f,
      g,
      E,
      dg
    ), t.context = ng(null), l = t.current, r = rn(), r = L(r), u = Aa(r), u.callback = null, Ra(l, u, r), l = r, t.current.lanes = l, kn(t, l), Gn(t), e[ye] = t.current, cf(e), new To(t);
  }, _r.version = "19.2.5", _r;
}
var wg;
function QE() {
  if (wg) return Df.exports;
  wg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Df.exports = KE(), Df.exports;
}
var ZE = QE();
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
var P0 = (n) => {
  throw TypeError(n);
}, PE = (n, a, i) => a.has(n) || P0("Cannot " + i), Uf = (n, a, i) => (PE(n, a, "read from private field"), i ? i.call(n) : a.get(n)), JE = (n, a, i) => a.has(n) ? P0("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, i);
function jg(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function WE(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: s = !1 } = n, o;
  o = a.map(
    (w, j) => y(
      w,
      typeof w == "string" ? null : w.state,
      j === 0 ? "default" : void 0,
      typeof w == "string" ? void 0 : w.unstable_mask
    )
  );
  let c = v(
    i ?? o.length - 1
  ), h = "POP", m = null;
  function v(w) {
    return Math.min(Math.max(w, 0), o.length - 1);
  }
  function p() {
    return o[c];
  }
  function y(w, j = null, T, R) {
    let O = pd(
      o ? p().pathname : "/",
      w,
      j,
      T,
      R
    );
    return bt(
      O.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        w
      )}`
    ), O;
  }
  function b(w) {
    return typeof w == "string" ? w : Xn(w);
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
    createHref: b,
    createURL(w) {
      return new URL(b(w), "http://localhost");
    },
    encodeLocation(w) {
      let j = typeof w == "string" ? Vn(w) : w;
      return {
        pathname: j.pathname || "",
        search: j.search || "",
        hash: j.hash || ""
      };
    },
    push(w, j) {
      h = "PUSH";
      let T = jg(w) ? w : y(w, j);
      c += 1, o.splice(c, o.length, T), s && m && m({ action: h, location: T, delta: 1 });
    },
    replace(w, j) {
      h = "REPLACE";
      let T = jg(w) ? w : y(w, j);
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
function Ue(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function bt(n, a) {
  if (!n) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function ew() {
  return Math.random().toString(36).substring(2, 10);
}
function pd(n, a, i = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? Vn(a) : a,
    state: i,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || ew(),
    unstable_mask: o
  };
}
function Xn({
  pathname: n = "/",
  search: a = "",
  hash: i = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (n += i.charAt(0) === "#" ? i : "#" + i), n;
}
function Vn(n) {
  let a = {};
  if (n) {
    let i = n.indexOf("#");
    i >= 0 && (a.hash = n.substring(i), n = n.substring(0, i));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function tw(n, a = !1) {
  let i = "http://localhost";
  typeof window < "u" && (i = window.location.origin !== "null" ? window.location.origin : window.location.href), Ue(i, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : Xn(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = i + s), new URL(s, i);
}
var kr, Tg = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (JE(this, kr, /* @__PURE__ */ new Map()), n)
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
    if (Uf(this, kr).has(n))
      return Uf(this, kr).get(n);
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
    Uf(this, kr).set(n, a);
  }
};
kr = /* @__PURE__ */ new WeakMap();
var nw = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function aw(n) {
  return nw.has(
    n
  );
}
var lw = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function iw(n) {
  return lw.has(
    n
  );
}
function rw(n) {
  return n.index === !0;
}
function Xr(n, a, i = [], s = {}, o = !1) {
  return n.map((c, h) => {
    let m = [...i, String(h)], v = typeof c.id == "string" ? c.id : m.join("-");
    if (Ue(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), Ue(
      o || !s[v],
      `Found a route id collision on id "${v}".  Route id's must be globally unique within Data Router usages`
    ), rw(c)) {
      let p = {
        ...c,
        id: v
      };
      return s[v] = Cg(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...c,
        id: v,
        children: void 0
      };
      return s[v] = Cg(
        p,
        a(p)
      ), c.children && (p.children = Xr(
        c.children,
        a,
        m,
        s,
        o
      )), p;
    }
  });
}
function Cg(n, a) {
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
function Za(n, a, i = "/") {
  return qr(n, a, i, !1);
}
function qr(n, a, i, s) {
  let o = typeof a == "string" ? Vn(a) : a, c = Cn(o.pathname || "/", i);
  if (c == null)
    return null;
  let h = J0(n);
  ow(h);
  let m = null;
  for (let v = 0; m == null && v < h.length; ++v) {
    let p = bw(c);
    m = gw(
      h[v],
      p,
      s
    );
  }
  return m;
}
function sw(n, a) {
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
function J0(n, a = [], i = [], s = "", o = !1) {
  let c = (h, m, v = o, p) => {
    let y = {
      relativePath: p === void 0 ? h.path || "" : p,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: m,
      route: h
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(s) && v)
        return;
      Ue(
        y.relativePath.startsWith(s),
        `Absolute route path "${y.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(s.length);
    }
    let b = wn([s, y.relativePath]), S = i.concat(y);
    h.children && h.children.length > 0 && (Ue(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      h.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
    ), J0(
      h.children,
      a,
      S,
      b,
      v
    )), !(h.path == null && !h.index) && a.push({
      path: b,
      score: pw(b, h.index),
      routesMeta: S
    });
  };
  return n.forEach((h, m) => {
    if (h.path === "" || !h.path?.includes("?"))
      c(h, m);
    else
      for (let v of W0(h.path))
        c(h, m, !0, v);
  }), a;
}
function W0(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [i, ...s] = a, o = i.endsWith("?"), c = i.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let h = W0(s.join("/")), m = [];
  return m.push(
    ...h.map(
      (v) => v === "" ? c : [c, v].join("/")
    )
  ), o && m.push(...h), m.map(
    (v) => n.startsWith("/") && v === "" ? "/" : v
  );
}
function ow(n) {
  n.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : vw(
      a.routesMeta.map((s) => s.childrenIndex),
      i.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var uw = /^:[\w-]+$/, cw = 3, fw = 2, dw = 1, hw = 10, mw = -2, Mg = (n) => n === "*";
function pw(n, a) {
  let i = n.split("/"), s = i.length;
  return i.some(Mg) && (s += mw), a && (s += fw), i.filter((o) => !Mg(o)).reduce(
    (o, c) => o + (uw.test(c) ? cw : c === "" ? dw : hw),
    s
  );
}
function vw(n, a) {
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
function gw(n, a, i = !1) {
  let { routesMeta: s } = n, o = {}, c = "/", h = [];
  for (let m = 0; m < s.length; ++m) {
    let v = s[m], p = m === s.length - 1, y = c === "/" ? a : a.slice(c.length) || "/", b = Qo(
      { path: v.relativePath, caseSensitive: v.caseSensitive, end: p },
      y
    ), S = v.route;
    if (!b && p && i && !s[s.length - 1].route.index && (b = Qo(
      {
        path: v.relativePath,
        caseSensitive: v.caseSensitive,
        end: !1
      },
      y
    )), !b)
      return null;
    Object.assign(o, b.params), h.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: wn([c, b.pathname]),
      pathnameBase: Ew(
        wn([c, b.pathnameBase])
      ),
      route: S
    }), b.pathnameBase !== "/" && (c = wn([c, b.pathnameBase]));
  }
  return h;
}
function Qo(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [i, s] = yw(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(i);
  if (!o) return null;
  let c = o[0], h = c.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: s.reduce(
      (p, { paramName: y, isOptional: b }, S) => {
        if (y === "*") {
          let j = m[S] || "";
          h = c.slice(0, c.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const w = m[S];
        return b && !w ? p[y] = void 0 : p[y] = (w || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: c,
    pathnameBase: h,
    pattern: n
  };
}
function yw(n, a = !1, i = !0) {
  bt(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + n.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (h, m, v, p, y) => {
      if (s.push({ paramName: m, isOptional: v != null }), v) {
        let b = y.charAt(p + h.length);
        return b && b !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return n.endsWith("*") ? (s.push({ paramName: "*" }), o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? o += "\\/*$" : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function bw(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return bt(
      !1,
      `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), n;
  }
}
function Cn(n, a) {
  if (a === "/") return n;
  if (!n.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let i = a.endsWith("/") ? a.length - 1 : a.length, s = n.charAt(i);
  return s && s !== "/" ? null : n.slice(i) || "/";
}
function xw({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : wn([n, a]);
}
var eb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Xd = (n) => eb.test(n);
function Sw(n, a = "/") {
  let {
    pathname: i,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? Vn(n) : n, c;
  return i ? (i = Kd(i), i.startsWith("/") ? c = Ng(i.substring(1), "/") : c = Ng(i, a)) : c = a, {
    pathname: c,
    search: ww(s),
    hash: jw(o)
  };
}
function Ng(n, a) {
  let i = Zo(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
  }), i.length > 1 ? i.join("/") : "/";
}
function Vf(n, a, i, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function tb(n) {
  return n.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function Id(n) {
  let a = tb(n);
  return a.map(
    (i, s) => s === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function ru(n, a, i, s = !1) {
  let o;
  typeof n == "string" ? o = Vn(n) : (o = { ...n }, Ue(
    !o.pathname || !o.pathname.includes("?"),
    Vf("?", "pathname", "search", o)
  ), Ue(
    !o.pathname || !o.pathname.includes("#"),
    Vf("#", "pathname", "hash", o)
  ), Ue(
    !o.search || !o.search.includes("#"),
    Vf("#", "search", "hash", o)
  ));
  let c = n === "" || o.pathname === "", h = c ? "/" : o.pathname, m;
  if (h == null)
    m = i;
  else {
    let b = a.length - 1;
    if (!s && h.startsWith("..")) {
      let S = h.split("/");
      for (; S[0] === ".."; )
        S.shift(), b -= 1;
      o.pathname = S.join("/");
    }
    m = b >= 0 ? a[b] : "/";
  }
  let v = Sw(o, m), p = h && h !== "/" && h.endsWith("/"), y = (c || h === ".") && i.endsWith("/");
  return !v.pathname.endsWith("/") && (p || y) && (v.pathname += "/"), v;
}
var Kd = (n) => n.replace(/\/\/+/g, "/"), wn = (n) => Kd(n.join("/")), Zo = (n) => n.replace(/\/+$/, ""), Ew = (n) => Zo(n).replace(/^\/*/, "/"), ww = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, jw = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, Tw = (n, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let s = new Headers(i.headers);
  return s.set("Location", n), new Response(null, { ...i, headers: s });
}, su = class {
  constructor(n, a, i, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function Ir(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function Wr(n) {
  let a = n.map((i) => i.route.path).filter(Boolean);
  return wn(a) || "/";
}
var nb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function ab(n, a) {
  let i = n;
  if (typeof i != "string" || !eb.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let s = i, o = !1;
  if (nb)
    try {
      let c = new URL(window.location.href), h = i.startsWith("//") ? new URL(c.protocol + i) : new URL(i), m = Cn(h.pathname, a);
      h.origin === c.origin && m != null ? i = m + h.search + h.hash : o = !0;
    } catch {
      bt(
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
var Ja = Symbol("Uninstrumented");
function Cw(n, a) {
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
      instrument(c) {
        let h = Object.keys(i);
        for (let m of h)
          c[m] && i[m].push(c[m]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && i.lazy.length > 0) {
    let o = Ti(i.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((c) => {
      let h = o[c], m = i[`lazy.${c}`];
      if (typeof h == "function" && m.length > 0) {
        let v = Ti(m, h, () => {
        });
        v && (s.lazy = Object.assign(s.lazy || {}, {
          [c]: v
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let c = a[o];
    if (typeof c == "function" && i[o].length > 0) {
      let h = c[Ja] ?? c, m = Ti(
        i[o],
        h,
        (...v) => Ag(v[0])
      );
      m && (o === "loader" && h.hydrate === !0 && (m.hydrate = !0), m[Ja] = h, s[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[Ja] ?? o, h = Ti(
      i.middleware,
      c,
      (...m) => Ag(m[0])
    );
    return h ? (h[Ja] = c, h) : o;
  })), s;
}
function Mw(n, a) {
  let i = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (s) => s({
      instrument(o) {
        let c = Object.keys(o);
        for (let h of c)
          o[h] && i[h].push(o[h]);
      }
    })
  ), i.navigate.length > 0) {
    let s = n.navigate[Ja] ?? n.navigate, o = Ti(
      i.navigate,
      s,
      (...c) => {
        let [h, m] = c;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? Xn(h) : ".",
          ...Rg(n, m ?? {})
        };
      }
    );
    o && (o[Ja] = s, n.navigate = o);
  }
  if (i.fetch.length > 0) {
    let s = n.fetch[Ja] ?? n.fetch, o = Ti(i.fetch, s, (...c) => {
      let [h, , m, v] = c;
      return {
        href: m ?? ".",
        fetcherKey: h,
        ...Rg(n, v ?? {})
      };
    });
    o && (o[Ja] = s, n.fetch = o);
  }
  return n;
}
function Ti(n, a, i) {
  return n.length === 0 ? null : async (...s) => {
    let o = await lb(
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
async function lb(n, a, i, s) {
  let o = n[s], c;
  if (o) {
    let h, m = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = lb(n, a, i, s - 1), c = await h, Ue(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (v) {
      console.error("An instrumentation function threw an error:", v);
    }
    h || await m(), await h;
  } else
    try {
      c = { type: "success", value: await i() };
    } catch (h) {
      c = { type: "error", value: h };
    }
  return c || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function Ag(n) {
  let { request: a, context: i, params: s, unstable_pattern: o } = n;
  return {
    request: Nw(a),
    params: { ...s },
    unstable_pattern: o,
    context: Aw(i)
  };
}
function Rg(n, a) {
  return {
    currentUrl: Xn(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function Nw(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function Aw(n) {
  if (_w(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var Rw = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function _w(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === Rw;
}
var ib = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], Dw = new Set(
  ib
), zw = [
  "GET",
  ...ib
], Ow = new Set(zw), rb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Lw = /* @__PURE__ */ new Set([307, 308]), Bf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Uw = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Dr = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, Vw = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), sb = "remix-router-transitions", ob = Symbol("ResetLoaderData");
function Bw(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ue(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || Vw, c = o;
  if (n.unstable_instrumentations) {
    let A = n.unstable_instrumentations;
    c = (L) => ({
      ...o(L),
      ...Cw(
        A.map((F) => F.route).filter(Boolean),
        L
      )
    });
  }
  let h = {}, m = Xr(
    n.routes,
    c,
    void 0,
    h
  ), v, p = n.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let y = n.dataStrategy || Yw, b = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, w = /* @__PURE__ */ new Set(), j = null, T = null, R = null, O = n.hydrationData != null, D = Za(m, n.history.location, p), z = !1, k = null, J, I;
  if (D == null && !n.patchRoutesOnNavigation) {
    let A = En(404, {
      pathname: n.history.location.pathname
    }), { matches: L, route: F } = Mo(m);
    J = !0, I = !J, D = L, k = { [F.id]: A };
  } else if (D && !n.hydrationData && Sa(
    D,
    m,
    n.history.location.pathname
  ).active && (D = null), D)
    if (D.some((A) => A.route.lazy))
      J = !1, I = !J;
    else if (!D.some((A) => Qd(A.route)))
      J = !0, I = !J;
    else {
      let A = n.hydrationData ? n.hydrationData.loaderData : null, L = n.hydrationData ? n.hydrationData.errors : null, F = D;
      if (L) {
        let ae = D.findIndex(
          (ie) => L[ie.route.id] !== void 0
        );
        F = F.slice(0, ae + 1);
      }
      I = !1, J = !0, F.forEach((ae) => {
        let ie = ub(ae.route, A, L);
        I = I || ie.renderFallback, J = J && !ie.shouldLoad;
      });
    }
  else {
    J = !1, I = !J, D = [];
    let A = Sa(
      null,
      m,
      n.history.location.pathname
    );
    A.active && A.matches && (z = !0, D = A.matches);
  }
  let W, M = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: D,
    initialized: J,
    renderFallback: I,
    navigation: Bf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || k,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, V = "POP", P = null, oe = !1, ue, Ee = !1, we = /* @__PURE__ */ new Map(), re = null, q = !1, B = !1, Y = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Map(), ne = 0, C = -1, K = /* @__PURE__ */ new Map(), le = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), xe = /* @__PURE__ */ new Map(), Ce = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Map(), _e, Ne = null;
  function Fe() {
    if (S = n.history.listen(
      ({ action: A, location: L, delta: F }) => {
        if (_e) {
          _e(), _e = void 0;
          return;
        }
        bt(
          se.size === 0 || F != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ae = sl({
          currentLocation: M.location,
          nextLocation: L,
          historyAction: A
        });
        if (ae && F != null) {
          let ie = new Promise((ve) => {
            _e = ve;
          });
          n.history.go(F * -1), Kn(ae, {
            state: "blocked",
            location: L,
            proceed() {
              Kn(ae, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: L
              }), ie.then(() => n.history.go(F));
            },
            reset() {
              let ve = new Map(M.blockers);
              ve.set(ae, Dr), ut({ blockers: ve });
            }
          }), P?.resolve(), P = null;
          return;
        }
        return Nn(A, L);
      }
    ), i) {
      sj(a, we);
      let A = () => oj(a, we);
      a.addEventListener("pagehide", A), re = () => a.removeEventListener("pagehide", A);
    }
    return M.initialized || Nn("POP", M.location, {
      initialHydration: !0
    }), W;
  }
  function Lt() {
    S && S(), re && re(), w.clear(), ue && ue.abort(), M.fetchers.forEach((A, L) => In(L)), M.blockers.forEach((A, L) => rl(L));
  }
  function Gt(A) {
    return w.add(A), () => w.delete(A);
  }
  function ut(A, L = {}) {
    A.matches && (A.matches = A.matches.map((ie) => {
      let ve = h[ie.route.id], fe = ie.route;
      return fe.element !== ve.element || fe.errorElement !== ve.errorElement || fe.hydrateFallbackElement !== ve.hydrateFallbackElement ? {
        ...ie,
        route: ve
      } : ie;
    })), M = {
      ...M,
      ...A
    };
    let F = [], ae = [];
    M.fetchers.forEach((ie, ve) => {
      ie.state === "idle" && (Ce.has(ve) ? F.push(ve) : ae.push(ve));
    }), Ce.forEach((ie) => {
      !M.fetchers.has(ie) && !Q.has(ie) && F.push(ie);
    }), [...w].forEach(
      (ie) => ie(M, {
        deletedFetchers: F,
        newErrors: A.errors ?? null,
        viewTransitionOpts: L.viewTransitionOpts,
        flushSync: L.flushSync === !0
      })
    ), F.forEach((ie) => In(ie)), ae.forEach((ie) => M.fetchers.delete(ie));
  }
  function Ut(A, L, { flushSync: F } = {}) {
    let ae = M.actionData != null && M.navigation.formMethod != null && qt(M.navigation.formMethod) && M.navigation.state === "loading" && A.state?._isRedirect !== !0, ie;
    L.actionData ? Object.keys(L.actionData).length > 0 ? ie = L.actionData : ie = null : ae ? ie = M.actionData : ie = null;
    let ve = L.loaderData ? Hg(
      M.loaderData,
      L.loaderData,
      L.matches || [],
      L.errors
    ) : M.loaderData, fe = M.blockers;
    fe.size > 0 && (fe = new Map(fe), fe.forEach((Te, Se) => fe.set(Se, Dr)));
    let de = q ? !1 : $i(A, L.matches || M.matches), ye = oe === !0 || M.navigation.formMethod != null && qt(M.navigation.formMethod) && A.state?._isRedirect !== !0;
    v && (m = v, v = void 0), q || V === "POP" || (V === "PUSH" ? n.history.push(A, A.state) : V === "REPLACE" && n.history.replace(A, A.state));
    let me;
    if (V === "POP") {
      let Te = we.get(M.location.pathname);
      Te && Te.has(A.pathname) ? me = {
        currentLocation: M.location,
        nextLocation: A
      } : we.has(A.pathname) && (me = {
        currentLocation: A,
        nextLocation: M.location
      });
    } else if (Ee) {
      let Te = we.get(M.location.pathname);
      Te ? Te.add(A.pathname) : (Te = /* @__PURE__ */ new Set([A.pathname]), we.set(M.location.pathname, Te)), me = {
        currentLocation: M.location,
        nextLocation: A
      };
    }
    ut(
      {
        ...L,
        // matches, errors, fetchers go through as-is
        actionData: ie,
        loaderData: ve,
        historyAction: V,
        location: A,
        initialized: !0,
        renderFallback: !1,
        navigation: Bf,
        revalidation: "idle",
        restoreScrollPosition: de,
        preventScrollReset: ye,
        blockers: fe
      },
      {
        viewTransitionOpts: me,
        flushSync: F === !0
      }
    ), V = "POP", oe = !1, Ee = !1, q = !1, B = !1, P?.resolve(), P = null, Ne?.resolve(), Ne = null;
  }
  async function ya(A, L) {
    if (P?.resolve(), P = null, typeof A == "number") {
      P || (P = Gg());
      let nt = P.promise;
      return n.history.go(A), nt;
    }
    let F = vd(
      M.location,
      M.matches,
      p,
      A,
      L?.fromRouteId,
      L?.relative
    ), { path: ae, submission: ie, error: ve } = _g(
      !1,
      F,
      L
    ), fe;
    L?.unstable_mask && (fe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof L.unstable_mask == "string" ? Vn(L.unstable_mask) : {
        ...M.location.unstable_mask,
        ...L.unstable_mask
      }
    });
    let de = M.location, ye = pd(
      de,
      ae,
      L && L.state,
      void 0,
      fe
    );
    ye = {
      ...ye,
      ...n.history.encodeLocation(ye)
    };
    let me = L && L.replace != null ? L.replace : void 0, Te = "PUSH";
    me === !0 ? Te = "REPLACE" : me === !1 || ie != null && qt(ie.formMethod) && ie.formAction === M.location.pathname + M.location.search && (Te = "REPLACE");
    let Se = L && "preventScrollReset" in L ? L.preventScrollReset === !0 : void 0, Ge = (L && L.flushSync) === !0, Oe = sl({
      currentLocation: de,
      nextLocation: ye,
      historyAction: Te
    });
    if (Oe) {
      Kn(Oe, {
        state: "blocked",
        location: ye,
        proceed() {
          Kn(Oe, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ye
          }), ya(A, L);
        },
        reset() {
          let nt = new Map(M.blockers);
          nt.set(Oe, Dr), ut({ blockers: nt });
        }
      });
      return;
    }
    await Nn(Te, ye, {
      submission: ie,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: ve,
      preventScrollReset: Se,
      replace: L && L.replace,
      enableViewTransition: L && L.viewTransition,
      flushSync: Ge,
      callSiteDefaultShouldRevalidate: L && L.unstable_defaultShouldRevalidate
    });
  }
  function ll() {
    Ne || (Ne = Gg()), fn(), ut({ revalidation: "loading" });
    let A = Ne.promise;
    return M.navigation.state === "submitting" ? A : M.navigation.state === "idle" ? (Nn(M.historyAction, M.location, {
      startUninterruptedRevalidation: !0
    }), A) : (Nn(
      V || M.historyAction,
      M.navigation.location,
      {
        overrideNavigation: M.navigation,
        // Proxy through any rending view transition
        enableViewTransition: Ee === !0
      }
    ), A);
  }
  async function Nn(A, L, F) {
    ue && ue.abort(), ue = null, V = A, q = (F && F.startUninterruptedRevalidation) === !0, Eu(M.location, M.matches), oe = (F && F.preventScrollReset) === !0, Ee = (F && F.enableViewTransition) === !0;
    let ae = v || m, ie = F && F.overrideNavigation, ve = F?.initialHydration && M.matches && M.matches.length > 0 && !z ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      M.matches
    ) : Za(ae, L, p), fe = (F && F.flushSync) === !0;
    if (ve && M.initialized && !B && Pw(M.location, L) && !(F && F.submission && qt(F.submission.formMethod))) {
      Ut(L, { matches: ve }, { flushSync: fe });
      return;
    }
    let de = Sa(ve, ae, L.pathname);
    if (de.active && de.matches && (ve = de.matches), !ve) {
      let { error: Je, notFoundMatches: ct, route: Ve } = Rn(
        L.pathname
      );
      Ut(
        L,
        {
          matches: ct,
          loaderData: {},
          errors: {
            [Ve.id]: Je
          }
        },
        { flushSync: fe }
      );
      return;
    }
    ue = new AbortController();
    let ye = ji(
      n.history,
      L,
      ue.signal,
      F && F.submission
    ), me = n.getContext ? await n.getContext() : new Tg(), Te;
    if (F && F.pendingError)
      Te = [
        Pa(ve).route.id,
        { type: "error", error: F.pendingError }
      ];
    else if (F && F.submission && qt(F.submission.formMethod)) {
      let Je = await Ul(
        ye,
        L,
        F.submission,
        ve,
        me,
        de.active,
        F && F.initialHydration === !0,
        { replace: F.replace, flushSync: fe }
      );
      if (Je.shortCircuited)
        return;
      if (Je.pendingActionResult) {
        let [ct, Ve] = Je.pendingActionResult;
        if (sn(Ve) && Ir(Ve.error) && Ve.error.status === 404) {
          ue = null, Ut(L, {
            matches: Je.matches,
            loaderData: {},
            errors: {
              [ct]: Ve.error
            }
          });
          return;
        }
      }
      ve = Je.matches || ve, Te = Je.pendingActionResult, ie = kf(L, F.submission), fe = !1, de.active = !1, ye = ji(
        n.history,
        ye.url,
        ye.signal
      );
    }
    let {
      shortCircuited: Se,
      matches: Ge,
      loaderData: Oe,
      errors: nt
    } = await Bn(
      ye,
      L,
      ve,
      me,
      de.active,
      ie,
      F && F.submission,
      F && F.fetcherSubmission,
      F && F.replace,
      F && F.initialHydration === !0,
      fe,
      Te,
      F && F.callSiteDefaultShouldRevalidate
    );
    Se || (ue = null, Ut(L, {
      matches: Ge || ve,
      ...$g(Te),
      loaderData: Oe,
      errors: nt
    }));
  }
  async function Ul(A, L, F, ae, ie, ve, fe, de = {}) {
    fn();
    let ye = ij(L, F);
    if (ut({ navigation: ye }, { flushSync: de.flushSync === !0 }), ve) {
      let Se = await kn(
        ae,
        L.pathname,
        A.signal
      );
      if (Se.type === "aborted")
        return { shortCircuited: !0 };
      if (Se.type === "error") {
        if (Se.partialMatches.length === 0) {
          let { matches: Oe, route: nt } = Mo(m);
          return {
            matches: Oe,
            pendingActionResult: [
              nt.id,
              {
                type: "error",
                error: Se.error
              }
            ]
          };
        }
        let Ge = Pa(Se.partialMatches).route.id;
        return {
          matches: Se.partialMatches,
          pendingActionResult: [
            Ge,
            {
              type: "error",
              error: Se.error
            }
          ]
        };
      } else if (Se.matches)
        ae = Se.matches;
      else {
        let { notFoundMatches: Ge, error: Oe, route: nt } = Rn(
          L.pathname
        );
        return {
          matches: Ge,
          pendingActionResult: [
            nt.id,
            {
              type: "error",
              error: Oe
            }
          ]
        };
      }
    }
    let me, Te = $o(ae, L);
    if (!Te.route.action && !Te.route.lazy)
      me = {
        type: "error",
        error: En(405, {
          method: A.method,
          pathname: L.pathname,
          routeId: Te.route.id
        })
      };
    else {
      let Se = Ni(
        c,
        h,
        A,
        L,
        ae,
        Te,
        fe ? [] : s,
        ie
      ), Ge = await Ye(
        A,
        L,
        Se,
        ie,
        null
      );
      if (me = Ge[Te.route.id], !me) {
        for (let Oe of ae)
          if (Ge[Oe.route.id]) {
            me = Ge[Oe.route.id];
            break;
          }
      }
      if (A.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Nl(me)) {
      let Se;
      return de && de.replace != null ? Se = de.replace : Se = Bg(
        me.response.headers.get("Location"),
        new URL(A.url),
        p,
        n.history
      ) === M.location.pathname + M.location.search, await Ae(A, me, !0, {
        submission: F,
        replace: Se
      }), { shortCircuited: !0 };
    }
    if (sn(me)) {
      let Se = Pa(ae, Te.route.id);
      return (de && de.replace) !== !0 && (V = "PUSH"), {
        matches: ae,
        pendingActionResult: [
          Se.route.id,
          me,
          Te.route.id
        ]
      };
    }
    return {
      matches: ae,
      pendingActionResult: [Te.route.id, me]
    };
  }
  async function Bn(A, L, F, ae, ie, ve, fe, de, ye, me, Te, Se, Ge) {
    let Oe = ve || kf(L, fe), nt = fe || de || Fg(Oe), Je = !q && !me;
    if (ie) {
      if (Je) {
        let vt = ba(Se);
        ut(
          {
            navigation: Oe,
            ...vt !== void 0 ? { actionData: vt } : {}
          },
          {
            flushSync: Te
          }
        );
      }
      let Le = await kn(
        F,
        L.pathname,
        A.signal
      );
      if (Le.type === "aborted")
        return { shortCircuited: !0 };
      if (Le.type === "error") {
        if (Le.partialMatches.length === 0) {
          let { matches: Bt, route: St } = Mo(m);
          return {
            matches: Bt,
            loaderData: {},
            errors: {
              [St.id]: Le.error
            }
          };
        }
        let vt = Pa(Le.partialMatches).route.id;
        return {
          matches: Le.partialMatches,
          loaderData: {},
          errors: {
            [vt]: Le.error
          }
        };
      } else if (Le.matches)
        F = Le.matches;
      else {
        let { error: vt, notFoundMatches: Bt, route: St } = Rn(
          L.pathname
        );
        return {
          matches: Bt,
          loaderData: {},
          errors: {
            [St.id]: vt
          }
        };
      }
    }
    let ct = v || m, { dsMatches: Ve, revalidatingFetchers: xt } = Dg(
      A,
      ae,
      c,
      h,
      n.history,
      M,
      F,
      nt,
      L,
      me ? [] : s,
      me === !0,
      B,
      Y,
      Ce,
      ce,
      le,
      ct,
      p,
      n.patchRoutesOnNavigation != null,
      Se,
      Ge
    );
    if (C = ++ne, !n.dataStrategy && !Ve.some((Le) => Le.shouldLoad) && !Ve.some(
      (Le) => Le.route.middleware && Le.route.middleware.length > 0
    ) && xt.length === 0) {
      let Le = cs();
      return Ut(
        L,
        {
          matches: F,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Se && sn(Se[1]) ? { [Se[0]]: Se[1].error } : null,
          ...$g(Se),
          ...Le ? { fetchers: new Map(M.fetchers) } : {}
        },
        { flushSync: Te }
      ), { shortCircuited: !0 };
    }
    if (Je) {
      let Le = {};
      if (!ie) {
        Le.navigation = Oe;
        let vt = ba(Se);
        vt !== void 0 && (Le.actionData = vt);
      }
      xt.length > 0 && (Le.fetchers = il(xt)), ut(Le, { flushSync: Te });
    }
    xt.forEach((Le) => {
      Nt(Le.key), Le.controller && Q.set(Le.key, Le.controller);
    });
    let lt = () => xt.forEach((Le) => Nt(Le.key));
    ue && ue.signal.addEventListener(
      "abort",
      lt
    );
    let { loaderResults: Ea, fetcherResults: _n } = await dt(
      Ve,
      xt,
      A,
      L,
      ae
    );
    if (A.signal.aborted)
      return { shortCircuited: !0 };
    ue && ue.signal.removeEventListener(
      "abort",
      lt
    ), xt.forEach((Le) => Q.delete(Le.key));
    let At = No(Ea);
    if (At)
      return await Ae(A, At.result, !0, {
        replace: ye
      }), { shortCircuited: !0 };
    if (At = No(_n), At)
      return le.add(At.key), await Ae(A, At.result, !0, {
        replace: ye
      }), { shortCircuited: !0 };
    let { loaderData: qn, errors: ol } = qg(
      M,
      F,
      Ea,
      Se,
      xt,
      _n
    );
    me && M.errors && (ol = { ...M.errors, ...ol });
    let Hn = cs(), ul = fs(C), Bl = Hn || ul || xt.length > 0;
    return {
      matches: F,
      loaderData: qn,
      errors: ol,
      ...Bl ? { fetchers: new Map(M.fetchers) } : {}
    };
  }
  function ba(A) {
    if (A && !sn(A[1]))
      return {
        [A[0]]: A[1].data
      };
    if (M.actionData)
      return Object.keys(M.actionData).length === 0 ? null : M.actionData;
  }
  function il(A) {
    return A.forEach((L) => {
      let F = M.fetchers.get(L.key), ae = zr(
        void 0,
        F ? F.data : void 0
      );
      M.fetchers.set(L.key, ae);
    }), new Map(M.fetchers);
  }
  async function qi(A, L, F, ae) {
    Nt(A);
    let ie = (ae && ae.flushSync) === !0, ve = v || m, fe = vd(
      M.location,
      M.matches,
      p,
      F,
      L,
      ae?.relative
    ), de = Za(ve, fe, p), ye = Sa(de, ve, fe);
    if (ye.active && ye.matches && (de = ye.matches), !de) {
      dn(
        A,
        L,
        En(404, { pathname: fe }),
        { flushSync: ie }
      );
      return;
    }
    let { path: me, submission: Te, error: Se } = _g(
      !0,
      fe,
      ae
    );
    if (Se) {
      dn(A, L, Se, { flushSync: ie });
      return;
    }
    let Ge = n.getContext ? await n.getContext() : new Tg(), Oe = (ae && ae.preventScrollReset) === !0;
    if (Te && qt(Te.formMethod)) {
      await Hi(
        A,
        L,
        me,
        de,
        Ge,
        ye.active,
        ie,
        Oe,
        Te,
        ae && ae.unstable_defaultShouldRevalidate
      );
      return;
    }
    ce.set(A, { routeId: L, path: me }), await he(
      A,
      L,
      me,
      de,
      Ge,
      ye.active,
      ie,
      Oe,
      Te
    );
  }
  async function Hi(A, L, F, ae, ie, ve, fe, de, ye, me) {
    fn(), ce.delete(A);
    let Te = M.fetchers.get(A);
    An(A, rj(ye, Te), {
      flushSync: fe
    });
    let Se = new AbortController(), Ge = ji(
      n.history,
      F,
      Se.signal,
      ye
    );
    if (ve) {
      let it = await kn(
        ae,
        new URL(Ge.url).pathname,
        Ge.signal,
        A
      );
      if (it.type === "aborted")
        return;
      if (it.type === "error") {
        dn(A, L, it.error, { flushSync: fe });
        return;
      } else if (it.matches)
        ae = it.matches;
      else {
        dn(
          A,
          L,
          En(404, { pathname: F }),
          { flushSync: fe }
        );
        return;
      }
    }
    let Oe = $o(ae, F);
    if (!Oe.route.action && !Oe.route.lazy) {
      let it = En(405, {
        method: ye.formMethod,
        pathname: F,
        routeId: L
      });
      dn(A, L, it, { flushSync: fe });
      return;
    }
    Q.set(A, Se);
    let nt = ne, Je = Ni(
      c,
      h,
      Ge,
      F,
      ae,
      Oe,
      s,
      ie
    ), ct = await Ye(
      Ge,
      F,
      Je,
      ie,
      A
    ), Ve = ct[Oe.route.id];
    if (!Ve) {
      for (let it of Je)
        if (ct[it.route.id]) {
          Ve = ct[it.route.id];
          break;
        }
    }
    if (Ge.signal.aborted) {
      Q.get(A) === Se && Q.delete(A);
      return;
    }
    if (Ce.has(A)) {
      if (Nl(Ve) || sn(Ve)) {
        An(A, da(void 0));
        return;
      }
    } else {
      if (Nl(Ve))
        if (Q.delete(A), C > nt) {
          An(A, da(void 0));
          return;
        } else
          return le.add(A), An(A, zr(ye)), Ae(Ge, Ve, !1, {
            fetcherSubmission: ye,
            preventScrollReset: de
          });
      if (sn(Ve)) {
        dn(A, L, Ve.error);
        return;
      }
    }
    let xt = M.navigation.location || M.location, lt = ji(
      n.history,
      xt,
      Se.signal
    ), Ea = v || m, _n = M.navigation.state !== "idle" ? Za(Ea, M.navigation.location, p) : M.matches;
    Ue(_n, "Didn't find any matches after fetcher action");
    let At = ++ne;
    K.set(A, At);
    let qn = zr(ye, Ve.data);
    M.fetchers.set(A, qn);
    let { dsMatches: ol, revalidatingFetchers: Hn } = Dg(
      lt,
      ie,
      c,
      h,
      n.history,
      M,
      _n,
      ye,
      xt,
      s,
      !1,
      B,
      Y,
      Ce,
      ce,
      le,
      Ea,
      p,
      n.patchRoutesOnNavigation != null,
      [Oe.route.id, Ve],
      me
    );
    Hn.filter((it) => it.key !== A).forEach((it) => {
      let kl = it.key, ql = M.fetchers.get(kl), ps = zr(
        void 0,
        ql ? ql.data : void 0
      );
      M.fetchers.set(kl, ps), Nt(kl), it.controller && Q.set(kl, it.controller);
    }), ut({ fetchers: new Map(M.fetchers) });
    let ul = () => Hn.forEach((it) => Nt(it.key));
    Se.signal.addEventListener(
      "abort",
      ul
    );
    let { loaderResults: Bl, fetcherResults: Le } = await dt(
      ol,
      Hn,
      lt,
      xt,
      ie
    );
    if (Se.signal.aborted)
      return;
    if (Se.signal.removeEventListener(
      "abort",
      ul
    ), K.delete(A), Q.delete(A), Hn.forEach((it) => Q.delete(it.key)), M.fetchers.has(A)) {
      let it = da(Ve.data);
      M.fetchers.set(A, it);
    }
    let vt = No(Bl);
    if (vt)
      return Ae(
        lt,
        vt.result,
        !1,
        { preventScrollReset: de }
      );
    if (vt = No(Le), vt)
      return le.add(vt.key), Ae(
        lt,
        vt.result,
        !1,
        { preventScrollReset: de }
      );
    let { loaderData: Bt, errors: St } = qg(
      M,
      _n,
      Bl,
      void 0,
      Hn,
      Le
    );
    fs(At), M.navigation.state === "loading" && At > C ? (Ue(V, "Expected pending action"), ue && ue.abort(), Ut(M.navigation.location, {
      matches: _n,
      loaderData: Bt,
      errors: St,
      fetchers: new Map(M.fetchers)
    })) : (ut({
      errors: St,
      loaderData: Hg(
        M.loaderData,
        Bt,
        _n,
        St
      ),
      fetchers: new Map(M.fetchers)
    }), B = !1);
  }
  async function he(A, L, F, ae, ie, ve, fe, de, ye) {
    let me = M.fetchers.get(A);
    An(
      A,
      zr(
        ye,
        me ? me.data : void 0
      ),
      { flushSync: fe }
    );
    let Te = new AbortController(), Se = ji(
      n.history,
      F,
      Te.signal
    );
    if (ve) {
      let Ve = await kn(
        ae,
        new URL(Se.url).pathname,
        Se.signal,
        A
      );
      if (Ve.type === "aborted")
        return;
      if (Ve.type === "error") {
        dn(A, L, Ve.error, { flushSync: fe });
        return;
      } else if (Ve.matches)
        ae = Ve.matches;
      else {
        dn(
          A,
          L,
          En(404, { pathname: F }),
          { flushSync: fe }
        );
        return;
      }
    }
    let Ge = $o(ae, F);
    Q.set(A, Te);
    let Oe = ne, nt = Ni(
      c,
      h,
      Se,
      F,
      ae,
      Ge,
      s,
      ie
    ), Je = await Ye(
      Se,
      F,
      nt,
      ie,
      A
    ), ct = Je[Ge.route.id];
    if (!ct) {
      for (let Ve of ae)
        if (Je[Ve.route.id]) {
          ct = Je[Ve.route.id];
          break;
        }
    }
    if (Q.get(A) === Te && Q.delete(A), !Se.signal.aborted) {
      if (Ce.has(A)) {
        An(A, da(void 0));
        return;
      }
      if (Nl(ct))
        if (C > Oe) {
          An(A, da(void 0));
          return;
        } else {
          le.add(A), await Ae(Se, ct, !1, {
            preventScrollReset: de
          });
          return;
        }
      if (sn(ct)) {
        dn(A, L, ct.error);
        return;
      }
      An(A, da(ct.data));
    }
  }
  async function Ae(A, L, F, {
    submission: ae,
    fetcherSubmission: ie,
    preventScrollReset: ve,
    replace: fe
  } = {}) {
    F || (P?.resolve(), P = null), L.response.headers.has("X-Remix-Revalidate") && (B = !0);
    let de = L.response.headers.get("Location");
    Ue(de, "Expected a Location header on the redirect Response"), de = Bg(
      de,
      new URL(A.url),
      p,
      n.history
    );
    let ye = pd(M.location, de, {
      _isRedirect: !0
    });
    if (i) {
      let nt = !1;
      if (L.response.headers.has("X-Remix-Reload-Document"))
        nt = !0;
      else if (Xd(de)) {
        const Je = tw(de, !0);
        nt = // Hard reload if it's an absolute URL to a new origin
        Je.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Cn(Je.pathname, p) == null;
      }
      if (nt) {
        fe ? a.location.replace(de) : a.location.assign(de);
        return;
      }
    }
    ue = null;
    let me = fe === !0 || L.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Te, formAction: Se, formEncType: Ge } = M.navigation;
    !ae && !ie && Te && Se && Ge && (ae = Fg(M.navigation));
    let Oe = ae || ie;
    if (Lw.has(L.response.status) && Oe && qt(Oe.formMethod))
      await Nn(me, ye, {
        submission: {
          ...Oe,
          formAction: de
        },
        // Preserve these flags across redirects
        preventScrollReset: ve || oe,
        enableViewTransition: F ? Ee : void 0
      });
    else {
      let nt = kf(
        ye,
        ae
      );
      await Nn(me, ye, {
        overrideNavigation: nt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ie,
        // Preserve these flags across redirects
        preventScrollReset: ve || oe,
        enableViewTransition: F ? Ee : void 0
      });
    }
  }
  async function Ye(A, L, F, ae, ie) {
    let ve, fe = {};
    try {
      ve = await Gw(
        y,
        A,
        L,
        F,
        ie,
        ae,
        !1
      );
    } catch (de) {
      return F.filter((ye) => ye.shouldLoad).forEach((ye) => {
        fe[ye.route.id] = {
          type: "error",
          error: de
        };
      }), fe;
    }
    if (A.signal.aborted)
      return fe;
    if (!qt(A.method))
      for (let de of F) {
        if (ve[de.route.id]?.type === "error")
          break;
        !ve.hasOwnProperty(de.route.id) && !M.loaderData.hasOwnProperty(de.route.id) && (!M.errors || !M.errors.hasOwnProperty(de.route.id)) && de.shouldCallHandler() && (ve[de.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${de.route.id}`
          )
        });
      }
    for (let [de, ye] of Object.entries(ve))
      if (tj(ye)) {
        let me = ye.result;
        fe[de] = {
          type: "redirect",
          response: Qw(
            me,
            A,
            de,
            F,
            p
          )
        };
      } else
        fe[de] = await Kw(ye);
    return fe;
  }
  async function dt(A, L, F, ae, ie) {
    let ve = Ye(
      F,
      ae,
      A,
      ie,
      null
    ), fe = Promise.all(
      L.map(async (me) => {
        if (me.matches && me.match && me.request && me.controller) {
          let Se = (await Ye(
            me.request,
            me.path,
            me.matches,
            ie,
            me.key
          ))[me.match.route.id];
          return { [me.key]: Se };
        } else
          return Promise.resolve({
            [me.key]: {
              type: "error",
              error: En(404, {
                pathname: me.path
              })
            }
          });
      })
    ), de = await ve, ye = (await fe).reduce(
      (me, Te) => Object.assign(me, Te),
      {}
    );
    return {
      loaderResults: de,
      fetcherResults: ye
    };
  }
  function fn() {
    B = !0, ce.forEach((A, L) => {
      Q.has(L) && Y.add(L), Nt(L);
    });
  }
  function An(A, L, F = {}) {
    M.fetchers.set(A, L), ut(
      { fetchers: new Map(M.fetchers) },
      { flushSync: (F && F.flushSync) === !0 }
    );
  }
  function dn(A, L, F, ae = {}) {
    let ie = Pa(M.matches, L);
    In(A), ut(
      {
        errors: {
          [ie.route.id]: F
        },
        fetchers: new Map(M.fetchers)
      },
      { flushSync: (ae && ae.flushSync) === !0 }
    );
  }
  function us(A) {
    return xe.set(A, (xe.get(A) || 0) + 1), Ce.has(A) && Ce.delete(A), M.fetchers.get(A) || Uw;
  }
  function xu(A, L) {
    Nt(A, L?.reason), An(A, da(null));
  }
  function In(A) {
    let L = M.fetchers.get(A);
    Q.has(A) && !(L && L.state === "loading" && K.has(A)) && Nt(A), ce.delete(A), K.delete(A), le.delete(A), Ce.delete(A), Y.delete(A), M.fetchers.delete(A);
  }
  function $t(A) {
    let L = (xe.get(A) || 0) - 1;
    L <= 0 ? (xe.delete(A), Ce.add(A)) : xe.set(A, L), ut({ fetchers: new Map(M.fetchers) });
  }
  function Nt(A, L) {
    let F = Q.get(A);
    F && (F.abort(L), Q.delete(A));
  }
  function Vt(A) {
    for (let L of A) {
      let F = us(L), ae = da(F.data);
      M.fetchers.set(L, ae);
    }
  }
  function cs() {
    let A = [], L = !1;
    for (let F of le) {
      let ae = M.fetchers.get(F);
      Ue(ae, `Expected fetcher: ${F}`), ae.state === "loading" && (le.delete(F), A.push(F), L = !0);
    }
    return Vt(A), L;
  }
  function fs(A) {
    let L = [];
    for (let [F, ae] of K)
      if (ae < A) {
        let ie = M.fetchers.get(F);
        Ue(ie, `Expected fetcher: ${F}`), ie.state === "loading" && (Nt(F), K.delete(F), L.push(F));
      }
    return Vt(L), L.length > 0;
  }
  function Su(A, L) {
    let F = M.blockers.get(A) || Dr;
    return se.get(A) !== L && se.set(A, L), F;
  }
  function rl(A) {
    M.blockers.delete(A), se.delete(A);
  }
  function Kn(A, L) {
    let F = M.blockers.get(A) || Dr;
    Ue(
      F.state === "unblocked" && L.state === "blocked" || F.state === "blocked" && L.state === "blocked" || F.state === "blocked" && L.state === "proceeding" || F.state === "blocked" && L.state === "unblocked" || F.state === "proceeding" && L.state === "unblocked",
      `Invalid blocker state transition: ${F.state} -> ${L.state}`
    );
    let ae = new Map(M.blockers);
    ae.set(A, L), ut({ blockers: ae });
  }
  function sl({
    currentLocation: A,
    nextLocation: L,
    historyAction: F
  }) {
    if (se.size === 0)
      return;
    se.size > 1 && bt(!1, "A router only supports one blocker at a time");
    let ae = Array.from(se.entries()), [ie, ve] = ae[ae.length - 1], fe = M.blockers.get(ie);
    if (!(fe && fe.state === "proceeding") && ve({ currentLocation: A, nextLocation: L, historyAction: F }))
      return ie;
  }
  function Rn(A) {
    let L = En(404, { pathname: A }), F = v || m, { matches: ae, route: ie } = Mo(F);
    return { notFoundMatches: ae, route: ie, error: L };
  }
  function Vl(A, L, F) {
    if (j = A, R = L, T = F || null, !O && M.navigation === Bf) {
      O = !0;
      let ae = $i(M.location, M.matches);
      ae != null && ut({ restoreScrollPosition: ae });
    }
    return () => {
      j = null, R = null, T = null;
    };
  }
  function xa(A, L) {
    return T && T(
      A,
      L.map((ae) => sw(ae, M.loaderData))
    ) || A.key;
  }
  function Eu(A, L) {
    if (j && R) {
      let F = xa(A, L);
      j[F] = R();
    }
  }
  function $i(A, L) {
    if (j) {
      let F = xa(A, L), ae = j[F];
      if (typeof ae == "number")
        return ae;
    }
    return null;
  }
  function Sa(A, L, F) {
    if (n.patchRoutesOnNavigation)
      if (A) {
        if (Object.keys(A[0].params).length > 0)
          return { active: !0, matches: qr(
            L,
            F,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: qr(
          L,
          F,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function kn(A, L, F, ae) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: A };
    let ie = A;
    for (; ; ) {
      let ve = v == null, fe = v || m, de = h;
      try {
        await n.patchRoutesOnNavigation({
          signal: F,
          path: L,
          matches: ie,
          fetcherKey: ae,
          patch: (Te, Se) => {
            F.aborted || zg(
              Te,
              Se,
              fe,
              de,
              c,
              !1
            );
          }
        });
      } catch (Te) {
        return { type: "error", error: Te, partialMatches: ie };
      } finally {
        ve && !F.aborted && (m = [...m]);
      }
      if (F.aborted)
        return { type: "aborted" };
      let ye = Za(fe, L, p), me = null;
      if (ye) {
        if (Object.keys(ye[0].params).length === 0)
          return { type: "success", matches: ye };
        if (me = qr(
          fe,
          L,
          p,
          !0
        ), !(me && ie.length < me.length && ds(
          ie,
          me.slice(0, ie.length)
        )))
          return { type: "success", matches: ye };
      }
      if (me || (me = qr(
        fe,
        L,
        p,
        !0
      )), !me || ds(ie, me))
        return { type: "success", matches: null };
      ie = me;
    }
  }
  function ds(A, L) {
    return A.length === L.length && A.every((F, ae) => F.route.id === L[ae].route.id);
  }
  function hs(A) {
    h = {}, v = Xr(
      A,
      c,
      void 0,
      h
    );
  }
  function ms(A, L, F = !1) {
    let ae = v == null;
    zg(
      A,
      L,
      v || m,
      h,
      c,
      F
    ), ae && (m = [...m], ut({}));
  }
  return W = {
    get basename() {
      return p;
    },
    get future() {
      return b;
    },
    get state() {
      return M;
    },
    get routes() {
      return m;
    },
    get window() {
      return a;
    },
    initialize: Fe,
    subscribe: Gt,
    enableScrollRestoration: Vl,
    navigate: ya,
    fetch: qi,
    revalidate: ll,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (A) => n.history.createHref(A),
    encodeLocation: (A) => n.history.encodeLocation(A),
    getFetcher: us,
    resetFetcher: xu,
    deleteFetcher: $t,
    dispose: Lt,
    getBlocker: Su,
    deleteBlocker: rl,
    patchRoutes: ms,
    _internalFetchControllers: Q,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: hs,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(A) {
      ut(A);
    }
  }, n.unstable_instrumentations && (W = Mw(
    W,
    n.unstable_instrumentations.map((A) => A.router).filter(Boolean)
  )), W;
}
function kw(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function vd(n, a, i, s, o, c) {
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
  let v = ru(
    s || ".",
    Id(h),
    Cn(n.pathname, i) || n.pathname,
    c === "path"
  );
  if (s == null && (v.search = n.search, v.hash = n.hash), (s == null || s === "" || s === ".") && m) {
    let p = Pd(v.search);
    if (m.route.index && !p)
      v.search = v.search ? v.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let y = new URLSearchParams(v.search), b = y.getAll("index");
      y.delete("index"), b.filter((w) => w).forEach((w) => y.append("index", w));
      let S = y.toString();
      v.search = S ? `?${S}` : "";
    }
  }
  return i !== "/" && (v.pathname = xw({ basename: i, pathname: v.pathname })), Xn(v);
}
function _g(n, a, i) {
  if (!i || !kw(i))
    return { path: a };
  if (i.formMethod && !lj(i.formMethod))
    return {
      path: a,
      error: En(405, { method: i.formMethod })
    };
  let s = () => ({
    path: a,
    error: En(400, { type: "invalid-body" })
  }), c = (i.formMethod || "get").toUpperCase(), h = vb(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!qt(c))
        return s();
      let b = typeof i.body == "string" ? i.body : i.body instanceof FormData || i.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(i.body.entries()).reduce(
          (S, [w, j]) => `${S}${w}=${j}
`,
          ""
        )
      ) : String(i.body);
      return {
        path: a,
        submission: {
          formMethod: c,
          formAction: h,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: b
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!qt(c))
        return s();
      try {
        let b = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: a,
          submission: {
            formMethod: c,
            formAction: h,
            formEncType: i.formEncType,
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
  Ue(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, v;
  if (i.formData)
    m = yd(i.formData), v = i.formData;
  else if (i.body instanceof FormData)
    m = yd(i.body), v = i.body;
  else if (i.body instanceof URLSearchParams)
    m = i.body, v = kg(m);
  else if (i.body == null)
    m = new URLSearchParams(), v = new FormData();
  else
    try {
      m = new URLSearchParams(i.body), v = kg(m);
    } catch {
      return s();
    }
  let p = {
    formMethod: c,
    formAction: h,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: v,
    json: void 0,
    text: void 0
  };
  if (qt(p.formMethod))
    return { path: a, submission: p };
  let y = Vn(a);
  return n && y.search && Pd(y.search) && m.append("index", ""), y.search = `?${m}`, { path: Xn(y), submission: p };
}
function Dg(n, a, i, s, o, c, h, m, v, p, y, b, S, w, j, T, R, O, D, z, k) {
  let J = z ? sn(z[1]) ? z[1].error : z[1].data : void 0, I = o.createURL(c.location), W = o.createURL(v), M;
  if (y && c.errors) {
    let re = Object.keys(c.errors)[0];
    M = h.findIndex((q) => q.route.id === re);
  } else if (z && sn(z[1])) {
    let re = z[0];
    M = h.findIndex((q) => q.route.id === re) - 1;
  }
  let V = z ? z[1].statusCode : void 0, P = V && V >= 400, oe = {
    currentUrl: I,
    currentParams: c.matches[0]?.params || {},
    nextUrl: W,
    nextParams: h[0].params,
    ...m,
    actionResult: J,
    actionStatus: V
  }, ue = Wr(h), Ee = h.map((re, q) => {
    let { route: B } = re, Y = null;
    if (M != null && q > M)
      Y = !1;
    else if (B.lazy)
      Y = !0;
    else if (!Qd(B))
      Y = !1;
    else if (y) {
      let { shouldLoad: K } = ub(
        B,
        c.loaderData,
        c.errors
      );
      Y = K;
    } else qw(c.loaderData, c.matches[q], re) && (Y = !0);
    if (Y !== null)
      return gd(
        i,
        s,
        n,
        v,
        ue,
        re,
        p,
        a,
        Y
      );
    let Q = !1;
    typeof k == "boolean" ? Q = k : P ? Q = !1 : (b || I.pathname + I.search === W.pathname + W.search || I.search !== W.search || Hw(c.matches[q], re)) && (Q = !0);
    let ne = {
      ...oe,
      defaultShouldRevalidate: Q
    }, C = Yr(re, ne);
    return gd(
      i,
      s,
      n,
      v,
      ue,
      re,
      p,
      a,
      C,
      ne,
      k
    );
  }), we = [];
  return j.forEach((re, q) => {
    if (y || !h.some((ce) => ce.route.id === re.routeId) || w.has(q))
      return;
    let B = c.fetchers.get(q), Y = B && B.state !== "idle" && B.data === void 0, Q = Za(R, re.path, O);
    if (!Q) {
      if (D && Y)
        return;
      we.push({
        key: q,
        routeId: re.routeId,
        path: re.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (T.has(q))
      return;
    let ne = $o(Q, re.path), C = new AbortController(), K = ji(
      o,
      re.path,
      C.signal
    ), le = null;
    if (S.has(q))
      S.delete(q), le = Ni(
        i,
        s,
        K,
        re.path,
        Q,
        ne,
        p,
        a
      );
    else if (Y)
      b && (le = Ni(
        i,
        s,
        K,
        re.path,
        Q,
        ne,
        p,
        a
      ));
    else {
      let ce;
      typeof k == "boolean" ? ce = k : P ? ce = !1 : ce = b;
      let xe = {
        ...oe,
        defaultShouldRevalidate: ce
      };
      Yr(ne, xe) && (le = Ni(
        i,
        s,
        K,
        re.path,
        Q,
        ne,
        p,
        a,
        xe
      ));
    }
    le && we.push({
      key: q,
      routeId: re.routeId,
      path: re.path,
      matches: le,
      match: ne,
      request: K,
      controller: C
    });
  }), { dsMatches: Ee, revalidatingFetchers: we };
}
function Qd(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function ub(n, a, i) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Qd(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = i != null && i[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
}
function qw(n, a, i) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), o = !n.hasOwnProperty(i.route.id);
  return s || o;
}
function Hw(n, a) {
  let i = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function Yr(n, a) {
  if (n.route.shouldRevalidate) {
    let i = n.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function zg(n, a, i, s, o, c) {
  let h;
  if (n) {
    let p = s[n];
    Ue(
      p,
      `No route found to patch children into: routeId = ${n}`
    ), p.children || (p.children = []), h = p.children;
  } else
    h = i;
  let m = [], v = [];
  if (a.forEach((p) => {
    let y = h.find(
      (b) => cb(p, b)
    );
    y ? v.push({ existingRoute: y, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = Xr(
      m,
      o,
      [n || "_", "patch", String(h?.length || "0")],
      s
    );
    h.push(...p);
  }
  if (c && v.length > 0)
    for (let p = 0; p < v.length; p++) {
      let { existingRoute: y, newRoute: b } = v[p], S = y, [w] = Xr(
        [b],
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
function cb(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (i, s) => a.children?.some((o) => cb(i, o))
  ) ?? !1 : !1;
}
var Og = /* @__PURE__ */ new WeakMap(), fb = ({
  key: n,
  route: a,
  manifest: i,
  mapRouteProperties: s
}) => {
  let o = i[a.id];
  if (Ue(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let c = o.lazy[n];
  if (!c)
    return;
  let h = Og.get(o);
  h || (h = {}, Og.set(o, h));
  let m = h[n];
  if (m)
    return m;
  let v = (async () => {
    let p = aw(n), b = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (p)
      bt(
        !p,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), h[n] = Promise.resolve();
    else if (b)
      bt(
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
}, Lg = /* @__PURE__ */ new WeakMap();
function $w(n, a, i, s, o) {
  let c = i[n.id];
  if (Ue(c, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let y = Lg.get(c);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let b = (async () => {
      Ue(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let S = await n.lazy(), w = {};
      for (let j in S) {
        let T = S[j];
        if (T === void 0)
          continue;
        let R = iw(j), D = c[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        R ? bt(
          !R,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : D ? bt(
          !D,
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
    return Lg.set(c, b), b.catch(() => {
    }), {
      lazyRoutePromise: b,
      lazyHandlerPromise: b
    };
  }
  let h = Object.keys(n.lazy), m = [], v;
  for (let y of h) {
    if (o && o.includes(y))
      continue;
    let b = fb({
      key: y,
      route: n,
      manifest: i,
      mapRouteProperties: s
    });
    b && (m.push(b), y === a && (v = b));
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
async function Ug(n) {
  let a = n.matches.filter((o) => o.shouldLoad), i = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    i[a[c].route.id] = o;
  }), i;
}
async function Yw(n) {
  return n.matches.some((a) => a.route.middleware) ? db(n, () => Ug(n)) : Ug(n);
}
function db(n, a) {
  return Fw(
    n,
    a,
    (s) => {
      if (aj(s))
        throw s;
      return s;
    },
    Ww,
    i
  );
  function i(s, o, c) {
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
      ), v = Pa(
        h,
        h[m].route.id
      ).route.id;
      return Promise.resolve({
        [v]: { type: "error", result: s }
      });
    }
  }
}
async function Fw(n, a, i, s, o) {
  let { matches: c, ...h } = n, m = c.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((y) => [p.route.id, y]) : []
  );
  return await hb(
    h,
    m,
    a,
    i,
    s,
    o
  );
}
async function hb(n, a, i, s, o, c, h = 0) {
  let { request: m } = n;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let v = a[h];
  if (!v)
    return await i();
  let [p, y] = v, b, S = async () => {
    if (b)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return b = { value: await hb(
        n,
        a,
        i,
        s,
        o,
        c,
        h + 1
      ) }, b.value;
    } catch (w) {
      return b = { value: await c(w, p, b) }, b.value;
    }
  };
  try {
    let w = await y(n, S), j = w != null ? s(w) : void 0;
    return o(j) ? j : b ? j ?? b.value : (b = { value: await S() }, b.value);
  } catch (w) {
    return await c(w, p, b);
  }
}
function mb(n, a, i, s, o) {
  let c = fb({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), h = $w(
    s.route,
    qt(i.method) ? "action" : "loader",
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
function gd(n, a, i, s, o, c, h, m, v, p = null, y) {
  let b = !1, S = mb(
    n,
    a,
    i,
    c,
    h
  );
  return {
    ...c,
    _lazyPromises: S,
    shouldLoad: v,
    shouldRevalidateArgs: p,
    shouldCallHandler(w) {
      return b = !0, p ? typeof y == "boolean" ? Yr(c, {
        ...p,
        defaultShouldRevalidate: y
      }) : typeof w == "boolean" ? Yr(c, {
        ...p,
        defaultShouldRevalidate: w
      }) : Yr(c, p) : v;
    },
    resolve(w) {
      let { lazy: j, loader: T, middleware: R } = c.route, O = b || v || w && !qt(i.method) && (j || T), D = R && R.length > 0 && !T && !j;
      return O && (qt(i.method) || !D) ? Xw({
        request: i,
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
function Ni(n, a, i, s, o, c, h, m, v = null) {
  return o.map((p) => p.route.id !== c.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: v,
    shouldCallHandler: () => !1,
    _lazyPromises: mb(
      n,
      a,
      i,
      p,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : gd(
    n,
    a,
    i,
    s,
    Wr(o),
    p,
    h,
    m,
    !0,
    v
  ));
}
async function Gw(n, a, i, s, o, c, h) {
  s.some((y) => y._lazyPromises?.middleware) && await Promise.all(s.map((y) => y._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: pb(a, i),
    unstable_pattern: Wr(s),
    params: s[0].params,
    context: c,
    matches: s
  }, p = await n({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (y) => {
      let b = m;
      return db(b, () => y({
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
  return p;
}
async function Xw({
  request: n,
  path: a,
  unstable_pattern: i,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: h,
  scopedContext: m
}) {
  let v, p, y = qt(n.method), b = y ? "action" : "loader", S = (w) => {
    let j, T = new Promise((D, z) => j = z);
    p = () => j(), n.signal.addEventListener("abort", p);
    let R = (D) => typeof w != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${b}" [routeId: ${s.route.id}]`
      )
    ) : w(
      {
        request: n,
        unstable_url: pb(n, a),
        unstable_pattern: i,
        params: s.params,
        context: m
      },
      ...D !== void 0 ? [D] : []
    ), O = (async () => {
      try {
        return { type: "data", result: await (h ? h((z) => R(z)) : R()) };
      } catch (D) {
        return { type: "error", result: D };
      }
    })();
    return Promise.race([O, T]);
  };
  try {
    let w = y ? s.route.action : s.route.loader;
    if (o || c)
      if (w) {
        let j, [T] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(w).catch((R) => {
            j = R;
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
        let j = y ? s.route.action : s.route.loader;
        if (j)
          [v] = await Promise.all([S(j), c]);
        else if (b === "action") {
          let T = new URL(n.url), R = T.pathname + T.search;
          throw En(405, {
            method: n.method,
            pathname: R,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (w)
      v = await S(w);
    else {
      let j = new URL(n.url), T = j.pathname + j.search;
      throw En(404, {
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
async function Iw(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function Kw(n) {
  let { result: a, type: i } = n;
  if (Zd(a)) {
    let s;
    try {
      s = await Iw(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return i === "error" ? {
      type: "error",
      error: new su(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? Yg(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: Jw(a),
    statusCode: Ir(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Ir(a) ? a.status : void 0
  } : Yg(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function Qw(n, a, i, s, o) {
  let c = n.headers.get("Location");
  if (Ue(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Xd(c)) {
    let h = s.slice(
      0,
      s.findIndex((m) => m.route.id === i) + 1
    );
    c = vd(
      new URL(a.url),
      h,
      o,
      c
    ), n.headers.set("Location", c);
  }
  return n;
}
var Vg = [
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
function Bg(n, a, i, s) {
  if (Xd(n)) {
    let o = n, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Vg.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let h = Cn(c.pathname, i) != null;
    if (c.origin === a.origin && h)
      return Kd(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(n);
    if (Vg.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function ji(n, a, i, s) {
  let o = n.createURL(vb(a)).toString(), c = { signal: i };
  if (s && qt(s.formMethod)) {
    let { formMethod: h, formEncType: m } = s;
    c.method = h.toUpperCase(), m === "application/json" ? (c.headers = new Headers({ "Content-Type": m }), c.body = JSON.stringify(s.json)) : m === "text/plain" ? c.body = s.text : m === "application/x-www-form-urlencoded" && s.formData ? c.body = yd(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function pb(n, a) {
  let i = new URL(n.url), s = typeof a == "string" ? Vn(a) : a;
  if (i.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), c = o.getAll("index");
    o.delete("index");
    for (let h of c.filter(Boolean))
      o.append("index", h);
    i.search = o.size ? `?${o.toString()}` : "";
  } else
    i.search = "";
  return i.hash = s.hash || "", i;
}
function yd(n) {
  let a = new URLSearchParams();
  for (let [i, s] of n.entries())
    a.append(i, typeof s == "string" ? s : s.name);
  return a;
}
function kg(n) {
  let a = new FormData();
  for (let [i, s] of n.entries())
    a.append(i, s);
  return a;
}
function Zw(n, a, i, s = !1, o = !1) {
  let c = {}, h = null, m, v = !1, p = {}, y = i && sn(i[1]) ? i[1].error : void 0;
  return n.forEach((b) => {
    if (!(b.route.id in a))
      return;
    let S = b.route.id, w = a[S];
    if (Ue(
      !Nl(w),
      "Cannot handle redirect results in processLoaderData"
    ), sn(w)) {
      let j = w.error;
      if (y !== void 0 && (j = y, y = void 0), h = h || {}, o)
        h[S] = j;
      else {
        let T = Pa(n, S);
        h[T.route.id] == null && (h[T.route.id] = j);
      }
      s || (c[S] = ob), v || (v = !0, m = Ir(w.error) ? w.error.status : 500), w.headers && (p[S] = w.headers);
    } else
      c[S] = w.data, w.statusCode && w.statusCode !== 200 && !v && (m = w.statusCode), w.headers && (p[S] = w.headers);
  }), y !== void 0 && i && (h = { [i[0]]: y }, i[2] && (c[i[2]] = void 0)), {
    loaderData: c,
    errors: h,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function qg(n, a, i, s, o, c) {
  let { loaderData: h, errors: m } = Zw(
    a,
    i,
    s
  );
  return o.filter((v) => !v.matches || v.matches.some((p) => p.shouldLoad)).forEach((v) => {
    let { key: p, match: y, controller: b } = v;
    if (b && b.signal.aborted)
      return;
    let S = c[p];
    if (Ue(S, "Did not find corresponding fetcher result"), sn(S)) {
      let w = Pa(n.matches, y?.route.id);
      m && m[w.route.id] || (m = {
        ...m,
        [w.route.id]: S.error
      }), n.fetchers.delete(p);
    } else if (Nl(S))
      Ue(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = da(S.data);
      n.fetchers.set(p, w);
    }
  }), { loaderData: h, errors: m };
}
function Hg(n, a, i, s) {
  let o = Object.entries(a).filter(([, c]) => c !== ob).reduce((c, [h, m]) => (c[h] = m, c), {});
  for (let c of i) {
    let h = c.route.id;
    if (!a.hasOwnProperty(h) && n.hasOwnProperty(h) && c.route.loader && (o[h] = n[h]), s && s.hasOwnProperty(h))
      break;
  }
  return o;
}
function $g(n) {
  return n ? sn(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function Pa(n, a) {
  return (a ? n.slice(0, n.findIndex((s) => s.route.id === a) + 1) : [...n]).reverse().find((s) => s.route.hasErrorBoundary === !0) || n[0];
}
function Mo(n) {
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
function En(n, {
  pathname: a,
  routeId: i,
  method: s,
  type: o,
  message: c
} = {}) {
  let h = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return n === 400 ? (h = "Bad Request", s && a && i ? m = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : n === 403 ? (h = "Forbidden", m = `Route "${i}" does not match URL "${a}"`) : n === 404 ? (h = "Not Found", m = `No route matches URL "${a}"`) : n === 405 && (h = "Method Not Allowed", s && a && i ? m = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : s && (m = `Invalid request method "${s.toUpperCase()}"`)), new su(
    n || 500,
    h,
    new Error(m),
    !0
  );
}
function No(n) {
  let a = Object.entries(n);
  for (let i = a.length - 1; i >= 0; i--) {
    let [s, o] = a[i];
    if (Nl(o))
      return { key: s, result: o };
  }
}
function vb(n) {
  let a = typeof n == "string" ? Vn(n) : n;
  return Xn({ ...a, hash: "" });
}
function Pw(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function Jw(n) {
  return new su(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function Ww(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, i]) => typeof a == "string" && ej(i)
  );
}
function ej(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function tj(n) {
  return Zd(n.result) && rb.has(n.result.status);
}
function sn(n) {
  return n.type === "error";
}
function Nl(n) {
  return (n && n.type) === "redirect";
}
function Yg(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function Zd(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function nj(n) {
  return rb.has(n);
}
function aj(n) {
  return Zd(n) && nj(n.status) && n.headers.has("Location");
}
function lj(n) {
  return Ow.has(n.toUpperCase());
}
function qt(n) {
  return Dw.has(n.toUpperCase());
}
function Pd(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function $o(n, a) {
  let i = typeof a == "string" ? Vn(a).search : a.search;
  if (n[n.length - 1].route.index && Pd(i || ""))
    return n[n.length - 1];
  let s = tb(n);
  return s[s.length - 1];
}
function Fg(n) {
  let { formMethod: a, formAction: i, formEncType: s, text: o, formData: c, json: h } = n;
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
    if (c != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: s,
        formData: c,
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
function kf(n, a) {
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
function ij(n, a) {
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
function zr(n, a) {
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
function rj(n, a) {
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
function da(n) {
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
function sj(n, a) {
  try {
    let i = n.sessionStorage.getItem(
      sb
    );
    if (i) {
      let s = JSON.parse(i);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function oj(n, a) {
  if (a.size > 0) {
    let i = {};
    for (let [s, o] of a)
      i[s] = [...o];
    try {
      n.sessionStorage.setItem(
        sb,
        JSON.stringify(i)
      );
    } catch (s) {
      bt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function Gg() {
  let n, a, i = new Promise((s, o) => {
    n = async (c) => {
      s(c);
      try {
        await i;
      } catch {
      }
    }, a = async (c) => {
      o(c);
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
var Ol = x.createContext(null);
Ol.displayName = "DataRouter";
var es = x.createContext(null);
es.displayName = "DataRouterState";
var gb = x.createContext(!1);
function yb() {
  return x.useContext(gb);
}
var Jd = x.createContext({
  isTransitioning: !1
});
Jd.displayName = "ViewTransition";
var bb = x.createContext(
  /* @__PURE__ */ new Map()
);
bb.displayName = "Fetchers";
var uj = x.createContext(null);
uj.displayName = "Await";
var Mn = x.createContext(
  null
);
Mn.displayName = "Navigation";
var ou = x.createContext(
  null
);
ou.displayName = "Location";
var pa = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
pa.displayName = "Route";
var Wd = x.createContext(null);
Wd.displayName = "RouteError";
var xb = "REACT_ROUTER_ERROR", cj = "REDIRECT", fj = "ROUTE_ERROR_RESPONSE";
function dj(n) {
  if (n.startsWith(`${xb}:${cj}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function hj(n) {
  if (n.startsWith(
    `${xb}:${fj}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new su(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function mj(n, { relative: a } = {}) {
  Ue(
    ts(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: s } = x.useContext(Mn), { hash: o, pathname: c, search: h } = ns(n, { relative: a }), m = c;
  return i !== "/" && (m = c === "/" ? i : wn([i, c])), s.createHref({ pathname: m, search: h, hash: o });
}
function ts() {
  return x.useContext(ou) != null;
}
function va() {
  return Ue(
    ts(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(ou).location;
}
var Sb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Eb(n) {
  x.useContext(Mn).static || x.useLayoutEffect(n);
}
function zi() {
  let { isDataRoute: n } = x.useContext(pa);
  return n ? Cj() : pj();
}
function pj() {
  Ue(
    ts(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = x.useContext(Ol), { basename: a, navigator: i } = x.useContext(Mn), { matches: s } = x.useContext(pa), { pathname: o } = va(), c = JSON.stringify(Id(s)), h = x.useRef(!1);
  return Eb(() => {
    h.current = !0;
  }), x.useCallback(
    (v, p = {}) => {
      if (bt(h.current, Sb), !h.current) return;
      if (typeof v == "number") {
        i.go(v);
        return;
      }
      let y = ru(
        v,
        JSON.parse(c),
        o,
        p.relative === "path"
      );
      n == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : wn([a, y.pathname])), (p.replace ? i.replace : i.push)(
        y,
        p.state,
        p
      );
    },
    [
      a,
      i,
      c,
      o,
      n
    ]
  );
}
x.createContext(null);
function ns(n, { relative: a } = {}) {
  let { matches: i } = x.useContext(pa), { pathname: s } = va(), o = JSON.stringify(Id(i));
  return x.useMemo(
    () => ru(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function vj(n, a, i) {
  Ue(
    ts(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = x.useContext(Mn), { matches: o } = x.useContext(pa), c = o[o.length - 1], h = c ? c.params : {}, m = c ? c.pathname : "/", v = c ? c.pathnameBase : "/", p = c && c.route;
  {
    let R = p && p.path || "";
    Tb(
      m,
      !p || R.endsWith("*") || R.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R === "/" ? "*" : `${R}/*`}">.`
    );
  }
  let y = va(), b;
  b = y;
  let S = b.pathname || "/", w = S;
  if (v !== "/") {
    let R = v.replace(/^\//, "").split("/");
    w = "/" + S.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let j = Za(n, { pathname: w });
  return bt(
    p || j != null,
    `No routes matched location "${b.pathname}${b.search}${b.hash}" `
  ), bt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), Sj(
    j && j.map(
      (R) => Object.assign({}, R, {
        params: Object.assign({}, h, R.params),
        pathname: wn([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            R.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathname
        ]),
        pathnameBase: R.pathnameBase === "/" ? v : wn([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            R.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathnameBase
        ])
      })
    ),
    o,
    i
  );
}
function gj() {
  let n = Tj(), a = Ir(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), i = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), h = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ x.createElement("pre", { style: o }, i) : null, h);
}
var yj = /* @__PURE__ */ x.createElement(gj, null), wb = class extends x.Component {
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
      const i = hj(n.digest);
      i && (n = i);
    }
    let a = n !== void 0 ? /* @__PURE__ */ x.createElement(pa.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      Wd.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ x.createElement(bj, { error: n }, a) : a;
  }
};
wb.contextType = gb;
var qf = /* @__PURE__ */ new WeakMap();
function bj({
  children: n,
  error: a
}) {
  let { basename: i } = x.useContext(Mn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = dj(a.digest);
    if (s) {
      let o = qf.get(a);
      if (o) throw o;
      let c = ab(s.location, i);
      if (nb && !qf.get(a))
        if (c.isExternal || s.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(c.to, {
              replace: s.replace
            })
          );
          throw qf.set(a, h), h;
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
function xj({ routeContext: n, match: a, children: i }) {
  let s = x.useContext(Ol);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ x.createElement(pa.Provider, { value: n }, i);
}
function Sj(n, a = [], i) {
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
  let o = n, c = s?.errors;
  if (c != null) {
    let y = o.findIndex(
      (b) => b.route.id && c?.[b.route.id] !== void 0
    );
    Ue(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        c
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, y + 1)
    );
  }
  let h = !1, m = -1;
  if (i && s) {
    h = s.renderFallback;
    for (let y = 0; y < o.length; y++) {
      let b = o[y];
      if ((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (m = y), b.route.id) {
        let { loaderData: S, errors: w } = s, j = b.route.loader && !S.hasOwnProperty(b.route.id) && (!w || w[b.route.id] === void 0);
        if (b.route.lazy || j) {
          i.isStatic && (h = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let v = i?.onError, p = s && v ? (y, b) => {
    v(y, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: Wr(s.matches),
      errorInfo: b
    });
  } : void 0;
  return o.reduceRight(
    (y, b, S) => {
      let w, j = !1, T = null, R = null;
      s && (w = c && b.route.id ? c[b.route.id] : void 0, T = b.route.errorElement || yj, h && (m < 0 && S === 0 ? (Tb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, R = null) : m === S && (j = !0, R = b.route.hydrateFallbackElement || null)));
      let O = a.concat(o.slice(0, S + 1)), D = () => {
        let z;
        return w ? z = T : j ? z = R : b.route.Component ? z = /* @__PURE__ */ x.createElement(b.route.Component, null) : b.route.element ? z = b.route.element : z = y, /* @__PURE__ */ x.createElement(
          xj,
          {
            match: b,
            routeContext: {
              outlet: y,
              matches: O,
              isDataRoute: s != null
            },
            children: z
          }
        );
      };
      return s && (b.route.ErrorBoundary || b.route.errorElement || S === 0) ? /* @__PURE__ */ x.createElement(
        wb,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: T,
          error: w,
          children: D(),
          routeContext: { outlet: null, matches: O, isDataRoute: !0 },
          onError: p
        }
      ) : D();
    },
    null
  );
}
function eh(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ej(n) {
  let a = x.useContext(Ol);
  return Ue(a, eh(n)), a;
}
function jb(n) {
  let a = x.useContext(es);
  return Ue(a, eh(n)), a;
}
function wj(n) {
  let a = x.useContext(pa);
  return Ue(a, eh(n)), a;
}
function uu(n) {
  let a = wj(n), i = a.matches[a.matches.length - 1];
  return Ue(
    i.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function jj() {
  return uu(
    "useRouteId"
    /* UseRouteId */
  );
}
function as() {
  let n = jb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = uu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function Tj() {
  let n = x.useContext(Wd), a = jb(
    "useRouteError"
    /* UseRouteError */
  ), i = uu(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[i];
}
function Cj() {
  let { router: n } = Ej(
    "useNavigate"
    /* UseNavigateStable */
  ), a = uu(
    "useNavigate"
    /* UseNavigateStable */
  ), i = x.useRef(!1);
  return Eb(() => {
    i.current = !0;
  }), x.useCallback(
    async (o, c = {}) => {
      bt(i.current, Sb), i.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...c }));
    },
    [n, a]
  );
}
var Xg = {};
function Tb(n, a, i) {
  !a && !Xg[n] && (Xg[n] = !0, bt(!1, i));
}
var Ig = {};
function Kg(n, a) {
  !n && !Ig[a] && (Ig[a] = !0, console.warn(a));
}
var Mj = "useOptimistic", Qg = YE[Mj], Nj = () => {
};
function Aj(n) {
  return Qg ? Qg(n) : [n, Nj];
}
function Rj(n) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && bt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: x.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && bt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: x.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && bt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: x.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var _j = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function Dj(n, a) {
  return Bw({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: WE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: _j,
    mapRouteProperties: Rj,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var zj = class {
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
function Oj({
  router: n,
  flushSync: a,
  onError: i,
  unstable_useTransitions: s
}) {
  s = yb() || s;
  let [c, h] = x.useState(n.state), [m, v] = Aj(c), [p, y] = x.useState(), [b, S] = x.useState({
    isTransitioning: !1
  }), [w, j] = x.useState(), [T, R] = x.useState(), [O, D] = x.useState(), z = x.useRef(/* @__PURE__ */ new Map()), k = x.useCallback(
    (V, { deletedFetchers: P, newErrors: oe, flushSync: ue, viewTransitionOpts: Ee }) => {
      oe && i && Object.values(oe).forEach(
        (re) => i(re, {
          location: V.location,
          params: V.matches[0]?.params ?? {},
          unstable_pattern: Wr(V.matches)
        })
      ), V.fetchers.forEach((re, q) => {
        re.data !== void 0 && z.current.set(q, re.data);
      }), P.forEach((re) => z.current.delete(re)), Kg(
        ue === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let we = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (Kg(
        Ee == null || we,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !Ee || !we) {
        a && ue ? a(() => h(V)) : s === !1 ? h(V) : x.startTransition(() => {
          s === !0 && v((re) => Zg(re, V)), h(V);
        });
        return;
      }
      if (a && ue) {
        a(() => {
          T && (w?.resolve(), T.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: Ee.currentLocation,
            nextLocation: Ee.nextLocation
          });
        });
        let re = n.window.document.startViewTransition(() => {
          a(() => h(V));
        });
        re.finished.finally(() => {
          a(() => {
            j(void 0), R(void 0), y(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => R(re));
        return;
      }
      T ? (w?.resolve(), T.skipTransition(), D({
        state: V,
        currentLocation: Ee.currentLocation,
        nextLocation: Ee.nextLocation
      })) : (y(V), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: Ee.currentLocation,
        nextLocation: Ee.nextLocation
      }));
    },
    [
      n.window,
      a,
      T,
      w,
      s,
      v,
      i
    ]
  );
  x.useLayoutEffect(() => n.subscribe(k), [n, k]);
  let J = m.initialized;
  x.useLayoutEffect(() => {
    !J && n.state.initialized && k(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [J, k, n.state]), x.useEffect(() => {
    b.isTransitioning && !b.flushSync && j(new zj());
  }, [b]), x.useEffect(() => {
    if (w && p && n.window) {
      let V = p, P = w.promise, oe = n.window.document.startViewTransition(async () => {
        s === !1 ? h(V) : x.startTransition(() => {
          s === !0 && v((ue) => Zg(ue, V)), h(V);
        }), await P;
      });
      oe.finished.finally(() => {
        j(void 0), R(void 0), y(void 0), S({ isTransitioning: !1 });
      }), R(oe);
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
    !b.isTransitioning && O && (y(O.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: O.currentLocation,
      nextLocation: O.nextLocation
    }), D(void 0));
  }, [b.isTransitioning, O]);
  let I = x.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (V) => n.navigate(V),
    push: (V, P, oe) => n.navigate(V, {
      state: P,
      preventScrollReset: oe?.preventScrollReset
    }),
    replace: (V, P, oe) => n.navigate(V, {
      replace: !0,
      state: P,
      preventScrollReset: oe?.preventScrollReset
    })
  }), [n]), W = n.basename || "/", M = x.useMemo(
    () => ({
      router: n,
      navigator: I,
      static: !1,
      basename: W,
      onError: i
    }),
    [n, I, W, i]
  );
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(Ol.Provider, { value: M }, /* @__PURE__ */ x.createElement(es.Provider, { value: m }, /* @__PURE__ */ x.createElement(bb.Provider, { value: z.current }, /* @__PURE__ */ x.createElement(Jd.Provider, { value: b }, /* @__PURE__ */ x.createElement(
    Vj,
    {
      basename: W,
      location: m.location,
      navigationType: m.historyAction,
      navigator: I,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ x.createElement(
      Lj,
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
function Zg(n, a) {
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
var Lj = x.memo(Uj);
function Uj({
  routes: n,
  future: a,
  state: i,
  isStatic: s,
  onError: o
}) {
  return vj(n, void 0, { state: i, isStatic: s, onError: o });
}
function Vj({
  basename: n = "/",
  children: a = null,
  location: i,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: h
}) {
  Ue(
    !ts(),
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
  typeof i == "string" && (i = Vn(i));
  let {
    pathname: p = "/",
    search: y = "",
    hash: b = "",
    state: S = null,
    key: w = "default",
    unstable_mask: j
  } = i, T = x.useMemo(() => {
    let R = Cn(p, m);
    return R == null ? null : {
      location: {
        pathname: R,
        search: y,
        hash: b,
        state: S,
        key: w,
        unstable_mask: j
      },
      navigationType: s
    };
  }, [
    m,
    p,
    y,
    b,
    S,
    w,
    s,
    j
  ]);
  return bt(
    T != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${y}${b}" because it does not start with the basename, so the <Router> won't render anything.`
  ), T == null ? null : /* @__PURE__ */ x.createElement(Mn.Provider, { value: v }, /* @__PURE__ */ x.createElement(ou.Provider, { children: a, value: T }));
}
var Yo = "get", Fo = "application/x-www-form-urlencoded";
function cu(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function Bj(n) {
  return cu(n) && n.tagName.toLowerCase() === "button";
}
function kj(n) {
  return cu(n) && n.tagName.toLowerCase() === "form";
}
function qj(n) {
  return cu(n) && n.tagName.toLowerCase() === "input";
}
function Hj(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function $j(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !Hj(n);
}
var Ao = null;
function Yj() {
  if (Ao === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Ao = !1;
    } catch {
      Ao = !0;
    }
  return Ao;
}
var Fj = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Hf(n) {
  return n != null && !Fj.has(n) ? (bt(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Fo}"`
  ), null) : n;
}
function Gj(n, a) {
  let i, s, o, c, h;
  if (kj(n)) {
    let m = n.getAttribute("action");
    s = m ? Cn(m, a) : null, i = n.getAttribute("method") || Yo, o = Hf(n.getAttribute("enctype")) || Fo, c = new FormData(n);
  } else if (Bj(n) || qj(n) && (n.type === "submit" || n.type === "image")) {
    let m = n.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let v = n.getAttribute("formaction") || m.getAttribute("action");
    if (s = v ? Cn(v, a) : null, i = n.getAttribute("formmethod") || m.getAttribute("method") || Yo, o = Hf(n.getAttribute("formenctype")) || Hf(m.getAttribute("enctype")) || Fo, c = new FormData(m, n), !Yj()) {
      let { name: p, type: y, value: b } = n;
      if (y === "image") {
        let S = p ? `${p}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else p && c.append(p, b);
    }
  } else {
    if (cu(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = Yo, s = null, o = Fo, h = n;
  }
  return c && o === "text/plain" && (h = c, c = void 0), { action: s, method: i.toLowerCase(), encType: o, formData: c, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function th(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function Cb(n, a, i, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return i ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && Cn(o.pathname, a) === "/" ? o.pathname = `${Zo(a)}/_root.${s}` : o.pathname = `${Zo(o.pathname)}.${s}`, o;
}
async function Xj(n, a) {
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
function Ij(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function Kj(n, a, i) {
  let s = await Promise.all(
    n.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let h = await Xj(c, i);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return Jj(
    s.flat(1).filter(Ij).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function Pg(n, a, i, s, o, c) {
  let h = (v, p) => i[p] ? v.route.id !== i[p].route.id : !0, m = (v, p) => (
    // param change, /users/123 -> /users/456
    i[p].pathname !== v.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[p].route.path?.endsWith("*") && i[p].params["*"] !== v.params["*"]
  );
  return c === "assets" ? a.filter(
    (v, p) => h(v, p) || m(v, p)
  ) : c === "data" ? a.filter((v, p) => {
    let y = s.routes[v.route.id];
    if (!y || !y.hasLoader)
      return !1;
    if (h(v, p) || m(v, p))
      return !0;
    if (v.route.shouldRevalidate) {
      let b = v.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: i[0]?.params || {},
        nextUrl: new URL(n, window.origin),
        nextParams: v.params,
        defaultShouldRevalidate: !0
      });
      if (typeof b == "boolean")
        return b;
    }
    return !0;
  }) : [];
}
function Qj(n, a, { includeHydrateFallback: i } = {}) {
  return Zj(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), i && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function Zj(n) {
  return [...new Set(n)];
}
function Pj(n) {
  let a = {}, i = Object.keys(n).sort();
  for (let s of i)
    a[s] = n[s];
  return a;
}
function Jj(n, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let c = JSON.stringify(Pj(o));
    return i.has(c) || (i.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function nh() {
  let n = x.useContext(Ol);
  return th(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function Wj() {
  let n = x.useContext(es);
  return th(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var ah = x.createContext(void 0);
ah.displayName = "FrameworkContext";
function lh() {
  let n = x.useContext(ah);
  return th(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function eT(n, a) {
  let i = x.useContext(ah), [s, o] = x.useState(!1), [c, h] = x.useState(!1), { onFocus: m, onBlur: v, onMouseEnter: p, onMouseLeave: y, onTouchStart: b } = a, S = x.useRef(null);
  x.useEffect(() => {
    if (n === "render" && h(!0), n === "viewport") {
      let T = (O) => {
        O.forEach((D) => {
          h(D.isIntersecting);
        });
      }, R = new IntersectionObserver(T, { threshold: 0.5 });
      return S.current && R.observe(S.current), () => {
        R.disconnect();
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
  return i ? n !== "intent" ? [c, S, {}] : [
    c,
    S,
    {
      onFocus: Or(m, w),
      onBlur: Or(v, j),
      onMouseEnter: Or(p, w),
      onMouseLeave: Or(y, j),
      onTouchStart: Or(b, w)
    }
  ] : [!1, S, {}];
}
function Or(n, a) {
  return (i) => {
    n && n(i), i.defaultPrevented || a(i);
  };
}
function tT({ page: n, ...a }) {
  let i = yb(), { router: s } = nh(), o = x.useMemo(
    () => Za(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? i ? /* @__PURE__ */ x.createElement(aT, { page: n, matches: o, ...a }) : /* @__PURE__ */ x.createElement(lT, { page: n, matches: o, ...a }) : null;
}
function nT(n) {
  let { manifest: a, routeModules: i } = lh(), [s, o] = x.useState([]);
  return x.useEffect(() => {
    let c = !1;
    return Kj(n, a, i).then(
      (h) => {
        c || o(h);
      }
    ), () => {
      c = !0;
    };
  }, [n, a, i]), s;
}
function aT({
  page: n,
  matches: a,
  ...i
}) {
  let s = va(), { future: o } = lh(), { basename: c } = nh(), h = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let m = Cb(
      n,
      c,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), v = !1, p = [];
    for (let y of a)
      typeof y.route.shouldRevalidate == "function" ? v = !0 : p.push(y.route.id);
    return v && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    c,
    o.unstable_trailingSlashAwareDataRequests,
    n,
    s,
    a
  ]);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, h.map((m) => /* @__PURE__ */ x.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...i })));
}
function lT({
  page: n,
  matches: a,
  ...i
}) {
  let s = va(), { future: o, manifest: c, routeModules: h } = lh(), { basename: m } = nh(), { loaderData: v, matches: p } = Wj(), y = x.useMemo(
    () => Pg(
      n,
      a,
      p,
      c,
      s,
      "data"
    ),
    [n, a, p, c, s]
  ), b = x.useMemo(
    () => Pg(
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
    let T = /* @__PURE__ */ new Set(), R = !1;
    if (a.forEach((D) => {
      let z = c.routes[D.route.id];
      !z || !z.hasLoader || (!y.some((k) => k.route.id === D.route.id) && D.route.id in v && h[D.route.id]?.shouldRevalidate || z.hasClientLoader ? R = !0 : T.add(D.route.id));
    }), T.size === 0)
      return [];
    let O = Cb(
      n,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return R && T.size > 0 && O.searchParams.set(
      "_routes",
      a.filter((D) => T.has(D.route.id)).map((D) => D.route.id).join(",")
    ), [O.pathname + O.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    v,
    s,
    c,
    y,
    a,
    n,
    h
  ]), w = x.useMemo(
    () => Qj(b, c),
    [b, c]
  ), j = nT(b);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, S.map((T) => /* @__PURE__ */ x.createElement("link", { key: T, rel: "prefetch", as: "fetch", href: T, ...i })), w.map((T) => /* @__PURE__ */ x.createElement("link", { key: T, rel: "modulepreload", href: T, ...i })), j.map(({ key: T, link: R }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement(
      "link",
      {
        key: T,
        nonce: i.nonce,
        ...R,
        crossOrigin: R.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function iT(...n) {
  return (a) => {
    n.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var rT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  rT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Mb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, fu = x.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: c,
    replace: h,
    unstable_mask: m,
    state: v,
    target: p,
    to: y,
    preventScrollReset: b,
    viewTransition: S,
    unstable_defaultShouldRevalidate: w,
    ...j
  }, T) {
    let { basename: R, navigator: O, unstable_useTransitions: D } = x.useContext(Mn), z = typeof y == "string" && Mb.test(y), k = ab(y, R);
    y = k.to;
    let J = mj(y, { relative: o }), I = va(), W = null;
    if (m) {
      let re = ru(
        m,
        [],
        I.unstable_mask ? I.unstable_mask.pathname : "/",
        !0
      );
      R !== "/" && (re.pathname = re.pathname === "/" ? R : wn([R, re.pathname])), W = O.createHref(re);
    }
    let [M, V, P] = eT(
      s,
      j
    ), oe = cT(y, {
      replace: h,
      unstable_mask: m,
      state: v,
      target: p,
      preventScrollReset: b,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: w,
      unstable_useTransitions: D
    });
    function ue(re) {
      a && a(re), re.defaultPrevented || oe(re);
    }
    let Ee = !(k.isExternal || c), we = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...j,
          ...P,
          href: (Ee ? W : void 0) || k.absoluteURL || J,
          onClick: Ee ? ue : a,
          ref: iT(T, V),
          target: p,
          "data-discover": !z && i === "render" ? "true" : void 0
        }
      )
    );
    return M && !z ? /* @__PURE__ */ x.createElement(x.Fragment, null, we, /* @__PURE__ */ x.createElement(tT, { page: J })) : we;
  }
);
fu.displayName = "Link";
var sT = x.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: s = "",
    end: o = !1,
    style: c,
    to: h,
    viewTransition: m,
    children: v,
    ...p
  }, y) {
    let b = ns(h, { relative: p.relative }), S = va(), w = x.useContext(es), { navigator: j, basename: T } = x.useContext(Mn), R = w != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    pT(b) && m === !0, O = j.encodeLocation ? j.encodeLocation(b).pathname : b.pathname, D = S.pathname, z = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
    i || (D = D.toLowerCase(), z = z ? z.toLowerCase() : null, O = O.toLowerCase()), z && T && (z = Cn(z, T) || z);
    const k = O !== "/" && O.endsWith("/") ? O.length - 1 : O.length;
    let J = D === O || !o && D.startsWith(O) && D.charAt(k) === "/", I = z != null && (z === O || !o && z.startsWith(O) && z.charAt(O.length) === "/"), W = {
      isActive: J,
      isPending: I,
      isTransitioning: R
    }, M = J ? a : void 0, V;
    typeof s == "function" ? V = s(W) : V = [
      s,
      J ? "active" : null,
      I ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let P = typeof c == "function" ? c(W) : c;
    return /* @__PURE__ */ x.createElement(
      fu,
      {
        ...p,
        "aria-current": M,
        className: V,
        ref: y,
        style: P,
        to: h,
        viewTransition: m
      },
      typeof v == "function" ? v(W) : v
    );
  }
);
sT.displayName = "NavLink";
var oT = x.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: s,
    replace: o,
    state: c,
    method: h = Yo,
    action: m,
    onSubmit: v,
    relative: p,
    preventScrollReset: y,
    viewTransition: b,
    unstable_defaultShouldRevalidate: S,
    ...w
  }, j) => {
    let { unstable_useTransitions: T } = x.useContext(Mn), R = hT(), O = mT(m, { relative: p }), D = h.toLowerCase() === "get" ? "get" : "post", z = typeof m == "string" && Mb.test(m), k = (J) => {
      if (v && v(J), J.defaultPrevented) return;
      J.preventDefault();
      let I = J.nativeEvent.submitter, W = I?.getAttribute("formmethod") || h, M = () => R(I || J.currentTarget, {
        fetcherKey: a,
        method: W,
        navigate: i,
        replace: o,
        state: c,
        relative: p,
        preventScrollReset: y,
        viewTransition: b,
        unstable_defaultShouldRevalidate: S
      });
      T && i !== !1 ? x.startTransition(() => M()) : M();
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: j,
        method: D,
        action: O,
        onSubmit: s ? v : k,
        ...w,
        "data-discover": !z && n === "render" ? "true" : void 0
      }
    );
  }
);
oT.displayName = "Form";
function uT(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Nb(n) {
  let a = x.useContext(Ol);
  return Ue(a, uT(n)), a;
}
function cT(n, {
  target: a,
  replace: i,
  unstable_mask: s,
  state: o,
  preventScrollReset: c,
  relative: h,
  viewTransition: m,
  unstable_defaultShouldRevalidate: v,
  unstable_useTransitions: p
} = {}) {
  let y = zi(), b = va(), S = ns(n, { relative: h });
  return x.useCallback(
    (w) => {
      if ($j(w, a)) {
        w.preventDefault();
        let j = i !== void 0 ? i : Xn(b) === Xn(S), T = () => y(n, {
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
      b,
      y,
      S,
      i,
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
var fT = 0, dT = () => `__${String(++fT)}__`;
function hT() {
  let { router: n } = Nb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = x.useContext(Mn), i = jj(), s = n.fetch, o = n.navigate;
  return x.useCallback(
    async (c, h = {}) => {
      let { action: m, method: v, encType: p, formData: y, body: b } = Gj(
        c,
        a
      );
      if (h.navigate === !1) {
        let S = h.fetcherKey || dT();
        await s(S, i, h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: y,
          body: b,
          formMethod: h.method || v,
          formEncType: h.encType || p,
          flushSync: h.flushSync
        });
      } else
        await o(h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: y,
          body: b,
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
function mT(n, { relative: a } = {}) {
  let { basename: i } = x.useContext(Mn), s = x.useContext(pa);
  Ue(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...ns(n || ".", { relative: a }) }, h = va();
  if (n == null) {
    c.search = h.search;
    let m = new URLSearchParams(c.search), v = m.getAll("index");
    if (v.some((y) => y === "")) {
      m.delete("index"), v.filter((b) => b).forEach((b) => m.append("index", b));
      let y = m.toString();
      c.search = y ? `?${y}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (c.pathname = c.pathname === "/" ? i : wn([i, c.pathname])), Xn(c);
}
function pT(n, { relative: a } = {}) {
  let i = x.useContext(Jd);
  Ue(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Nb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = ns(n, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let c = Cn(i.currentLocation.pathname, s) || i.currentLocation.pathname, h = Cn(i.nextLocation.pathname, s) || i.nextLocation.pathname;
  return Qo(o.pathname, h) != null || Qo(o.pathname, c) != null;
}
class Oi extends Error {
  constructor(a, i, s, o) {
    super(s), this.status = a, this.category = i, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const Ll = "/api/v1/extensions/nexus.audio.emotiontts";
async function ot(n, a) {
  const i = n.startsWith("http") ? n : `${Ll}${n}`, s = await fetch(i, {
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
    throw new Oi(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function vT(n, a, i) {
  const s = n.startsWith("http") ? n : `${Ll}${n}`, o = new EventSource(s);
  return o.onmessage = (c) => {
    if (c.data)
      try {
        a(JSON.parse(c.data));
      } catch {
      }
  }, o.onerror = (c) => {
    i?.(c);
  }, () => o.close();
}
async function gT() {
  return ot("/deployments");
}
async function Jg(n) {
  return ot(`/deployments/${n}`);
}
async function yT(n, a) {
  return ot(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Wg(n) {
  return ot(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function ih(n, a) {
  return ot("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function bd(n, a, i) {
  return ot(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(i)
    }
  );
}
async function Ab(n, a) {
  await ot(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function bT(n) {
  return ot(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function xT(n, a, i = "error") {
  return ot("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: i })
  });
}
async function ST(n, a = {}) {
  const i = new URLSearchParams();
  a.limit && i.set("limit", String(a.limit)), a.status && i.set("status", a.status);
  const s = i.toString(), o = s ? `?${s}` : "";
  return ot(`/deployments/${n}/runs${o}`);
}
async function ET(n, a) {
  return ot(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function rh(n, a) {
  return ot(`/deployments/${n}/runs/${a}`);
}
async function wT(n, a) {
  return ot(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function Rb(n, a) {
  return ot(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function jT(n, a) {
  return ot(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function ey(n, a, i, s) {
  return vT(
    `/deployments/${n}/runs/${a}/progress`,
    i,
    s
  );
}
async function Kr(n) {
  return ot(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function _b(n, a, i, s, o) {
  const c = new FormData();
  c.append("deploymentId", n), c.append("displayName", i), c.append("kind", s), c.append("audio", a);
  const h = await fetch(`${Ll}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function TT(n) {
  return ot(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var CT = "mux0i60", MT = "mux0i61", NT = "mux0i62", AT = "mux0i63";
function ls({ count: n = "0", title: a, hint: i }) {
  return /* @__PURE__ */ d.jsxs("div", { className: CT, children: [
    /* @__PURE__ */ d.jsx("span", { className: MT, "aria-hidden": "true", children: n }),
    /* @__PURE__ */ d.jsx("h3", { className: NT, children: a }),
    i ? /* @__PURE__ */ d.jsx("p", { className: AT, children: i }) : null
  ] });
}
var RT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, _T = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, DT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, zT = "zwn3019";
function ha({
  tone: n = "raised",
  density: a = "comfortable",
  elevation: i = "subtle",
  as: s = "section",
  children: o,
  className: c,
  style: h,
  ...m
}) {
  const v = [RT[n], DT[a], _T[i], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(s, { className: v, style: h, "data-elevation": i, ...m, children: o });
}
function OT({ children: n, className: a }) {
  const i = [zT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("div", { className: i, children: n });
}
var _l = "vrkn5p0", LT = "_93p6291", UT = "_93p6292", VT = "_93p6293", BT = "_93p6294", kT = "_93p6295", qT = "_93p6296", HT = "_93p6297", $T = "_93p6298", YT = "_93p6299", FT = "_93p629a", GT = "_93p629b", XT = "_93p629c", IT = "_93p629d", KT = "_93p629e";
function QT() {
  const { deployments: n } = as(), a = n.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ d.jsxs("main", { className: LT, children: [
    /* @__PURE__ */ d.jsxs("header", { className: UT, children: [
      /* @__PURE__ */ d.jsx("p", { className: VT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ d.jsxs("h1", { className: BT, children: [
        "Direct your characters.",
        /* @__PURE__ */ d.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ d.jsx("p", { className: kT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ d.jsxs("p", { className: qT, children: [
        /* @__PURE__ */ d.jsx("span", { className: HT, children: n.length }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs(
      ha,
      {
        density: "airy",
        elevation: "raised",
        className: $T,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ d.jsx("h2", { id: "deployments-section-list", className: _l, children: "01 / Deployments" }),
          n.length === 0 ? /* @__PURE__ */ d.jsx(
            ls,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ d.jsx("ul", { className: YT, children: n.map((i) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(fu, { to: `/${i.deploymentId}/recipe`, className: FT, children: [
            /* @__PURE__ */ d.jsx("span", { className: GT, "aria-hidden": "true", children: ZT(i.displayName) }),
            /* @__PURE__ */ d.jsxs("span", { children: [
              /* @__PURE__ */ d.jsx("span", { className: XT, children: i.displayName }),
              /* @__PURE__ */ d.jsx("span", { className: IT, children: i.deploymentId })
            ] }),
            /* @__PURE__ */ d.jsx("span", { className: KT, "aria-hidden": "true", children: "→" })
          ] }) }, i.deploymentId)) })
        ]
      }
    )
  ] });
}
function ZT(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
async function Db(n) {
  return ot(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function PT(n, a, i) {
  return ot("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: i })
  });
}
async function JT(n, a) {
  await ot(
    `/presets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
var WT = "_1uzgubz0", eC = "_1uzgubz1", tC = "_1uzgubz2", nC = "_1uzgubz3", aC = "_1uzgubz4", lC = "_1uzgubz5", iC = "_1uzgubz6", rC = "_1uzgubz7", ty = "_1uzgubz8", sC = "_1uzgubz9", zb = "_1uzgubza", Ob = "_1uzgubzb", oC = "_1uzgubzc", uC = "_1uzgubzd", $f = "_1uzgubze", Yf = "_1uzgubzf", cC = "_1uzgubzg", fC = "_1uzgubzh", ny = "_1uzgubzi", ay = "_1uzgubzj", ly = "_1uzgubzk", iy = "_1uzgubzl", ry = "_1uzgubzm", dC = "_1uzgubzn", hC = "_1uzgubzo", mC = "_1uzgubzp", pC = "_1uzgubzq";
function vC({
  characterName: n,
  color: a,
  lineCount: i,
  mapping: s,
  voiceAssets: o,
  presets: c,
  active: h,
  onToggle: m,
  onAssignVoiceAsset: v,
  onAssignPreset: p,
  onUploadFile: y,
  onClearMapping: b
}) {
  const [S, w] = x.useState(!1), j = s ? o.find((D) => D.voiceAssetId === s.speakerVoiceAssetId) : null, T = s?.defaultVectorPresetId ? c.find((D) => D.presetId === s.defaultVectorPresetId) ?? null : null, R = (n[0] ?? "?").toUpperCase(), O = s !== null;
  return /* @__PURE__ */ d.jsxs("div", { className: `${WT}${h ? ` ${eC}` : ""}`, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: tC,
        onClick: m,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: nC,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: R
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { className: aC, children: [
            /* @__PURE__ */ d.jsx("span", { className: lC, style: { color: a }, children: n }),
            /* @__PURE__ */ d.jsxs("span", { className: iC, children: [
              i,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ d.jsxs("span", { className: rC, children: [
            j ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("span", { className: ty, children: j.displayName }),
              j.durationMs != null && /* @__PURE__ */ d.jsxs("span", { children: [
                sy(j.durationMs),
                " ·",
                " ",
                j.sampleRate ? `${j.sampleRate} Hz` : "—"
              ] })
            ] }) : T ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("span", { className: ty, children: T.presetName }),
              /* @__PURE__ */ d.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ d.jsx("span", { children: "no voice assigned" }),
            s?.voiceAssetChainDigest && /* @__PURE__ */ d.jsxs("span", { className: oC, children: [
              "chain · ",
              s.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: `${sC} ${O ? zb : Ob}`,
              children: O ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ d.jsxs("div", { className: uC, children: [
      /* @__PURE__ */ d.jsxs("div", { className: $f, children: [
        /* @__PURE__ */ d.jsx("span", { className: Yf, children: "Drop new audio" }),
        /* @__PURE__ */ d.jsxs(
          "label",
          {
            className: `${cC}${S ? ` ${fC}` : ""}`,
            onDragEnter: (D) => {
              D.preventDefault(), w(!0);
            },
            onDragOver: (D) => D.preventDefault(),
            onDragLeave: () => w(!1),
            onDrop: (D) => {
              D.preventDefault(), w(!1);
              const z = D.dataTransfer.files?.[0];
              z && y && y(z);
            },
            children: [
              /* @__PURE__ */ d.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (D) => {
                    const z = D.target.files?.[0];
                    z && y && y(z);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: $f, children: [
        /* @__PURE__ */ d.jsx("span", { className: Yf, children: "Reference library" }),
        /* @__PURE__ */ d.jsx("div", { className: ny, children: o.map((D) => /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: `${ay}${s?.speakerVoiceAssetId === D.voiceAssetId ? ` ${ly}` : ""}`,
            onClick: () => v(D.voiceAssetId),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: iy, children: D.displayName }),
              /* @__PURE__ */ d.jsxs("span", { className: ry, children: [
                D.durationMs != null ? sy(D.durationMs) : "—",
                " ",
                "·",
                " ",
                D.sampleRate ? `${D.sampleRate} Hz` : "—"
              ] })
            ]
          },
          D.voiceAssetId
        )) })
      ] }),
      c.length > 0 && p && /* @__PURE__ */ d.jsxs("div", { className: $f, children: [
        /* @__PURE__ */ d.jsx("span", { className: Yf, children: "Preset voices" }),
        /* @__PURE__ */ d.jsx("div", { className: ny, children: c.map((D) => /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: `${ay}${s?.defaultVectorPresetId === D.presetId ? ` ${ly}` : ""}`,
            onClick: () => p(D.presetId),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: iy, children: D.presetName }),
              /* @__PURE__ */ d.jsx("span", { className: ry, children: "preset · vector" })
            ]
          },
          D.presetId
        )) })
      ] }),
      O && b && /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          onClick: b,
          style: {
            alignSelf: "flex-start",
            background: "transparent",
            border: "none",
            color: "var(--on-surface-variant)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            cursor: "pointer"
          },
          children: "Clear mapping →"
        }
      )
    ] })
  ] });
}
function sy(n) {
  if (!Number.isFinite(n) || n < 0) return "0:00";
  const a = Math.round(n / 1e3), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function gC({
  unmappedCount: n,
  totalCount: a,
  children: i,
  emptyHint: s
}) {
  if (a === 0)
    return /* @__PURE__ */ d.jsx("p", { className: pC, children: s ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = n === 0;
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsx("header", { className: dC, children: /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `${hC} ${o ? zb : Ob}`,
        children: o ? `All ${a} mapped` : `${n} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ d.jsx("ul", { className: mC, children: i })
  ] });
}
const yC = "huggingface/IndexTeam/IndexTTS-2";
async function bC(n) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(n)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function xC() {
  return ot("/runtime/health");
}
async function SC() {
  await ot("/runtime/start", { method: "POST" });
}
async function EC() {
  return ot("/runtime/stop", { method: "POST" });
}
async function wC() {
  await ot("/runtime/restart", { method: "POST" });
}
function jC(n) {
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
var TC = "g5r6d10", CC = "g5r6d11", MC = "g5r6d12", NC = "g5r6d13", AC = "g5r6d14", RC = "g5r6d15", _C = "g5r6d1a", DC = "g5r6d1b", zC = "g5r6d1c", OC = "g5r6d1d", LC = "g5r6d1e", UC = "g5r6d1g", VC = "g5r6d1h", oy = "g5r6d1i", BC = "g5r6d1j", kC = "g5r6d1k", qC = "g5r6d1l", uy = "g5r6d1m", cy = "g5r6d1n", HC = "g5r6d1o", $C = "g5r6d1p", on = "g5r6d1q", Qa = "g5r6d1r", fy = "g5r6d1s", YC = "g5r6d1t", FC = "g5r6d1u", Xa = "g5r6d1v", GC = "g5r6d1w", XC = "g5r6d1x", IC = "g5r6d1y", KC = "g5r6d1z", QC = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function cn({
  severity: n,
  children: a,
  role: i,
  ariaLive: s,
  className: o,
  style: c
}) {
  const h = [QC[n], o].filter(Boolean).join(" "), m = i ?? (n === "error" ? "alert" : "status"), v = s ?? (n === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ d.jsx("div", { className: h, role: m, "aria-live": v, style: c, children: a });
}
var Lb = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Ub = { sm: "_4ydn546", md: "_4ydn547", lg: "_4ydn548" };
function Qe({
  variant: n = "primary",
  size: a = "md",
  type: i = "button",
  loading: s = !1,
  disabled: o,
  children: c,
  className: h,
  style: m,
  ...v
}) {
  const p = [Lb[n], Ub[a], h].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(
    "button",
    {
      type: i,
      className: p,
      style: m,
      disabled: s || o,
      "aria-busy": s || void 0,
      ...v,
      children: c
    }
  );
}
var Vb = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, Bb = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, ZC = "_13bb4njb";
function el({
  tone: n,
  size: a = "sm",
  pulse: i = !1,
  children: s,
  className: o,
  style: c,
  title: h
}) {
  const m = i && n !== "faint", v = [Vb[a], Bb[n], m ? ZC : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("span", { className: v, style: c, title: h, children: s });
}
const PC = 4e3;
function JC({ deployment: n }) {
  const a = zi(), [i, s] = x.useState(null), [o, c] = x.useState(null), [h, m] = x.useState(!1);
  x.useEffect(() => {
    let R = !1;
    const O = async () => {
      try {
        const z = await xC();
        R || (s(z), c(null));
      } catch (z) {
        R || c(Lr(z));
      }
    };
    O();
    const D = setInterval(O, PC);
    return () => {
      R = !0, clearInterval(D);
    };
  }, []);
  const v = x.useCallback(async () => {
    m(!0), c(null);
    try {
      await SC();
    } catch (R) {
      c(Lr(R));
    } finally {
      m(!1);
    }
  }, []), p = x.useCallback(async () => {
    m(!0);
    try {
      await EC();
    } catch (R) {
      c(Lr(R));
    } finally {
      m(!1);
    }
  }, []), y = x.useCallback(async () => {
    m(!0);
    try {
      await wC();
    } catch (R) {
      c(Lr(R));
    } finally {
      m(!1);
    }
  }, []), b = x.useCallback(async () => {
    m(!0);
    try {
      await bC(yC);
    } catch (R) {
      c(Lr(R));
    } finally {
      m(!1);
    }
  }, []), S = i?.badge ?? "not_installed", w = S === "stopped" || S === "not_installed", j = S === "ready" || S === "running" || S === "starting", T = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ d.jsxs("output", { className: Qa, "aria-live": "polite", children: [
    /* @__PURE__ */ d.jsx("span", { className: on, children: "Runtime" }),
    /* @__PURE__ */ d.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ d.jsx("span", { className: on, children: "Badge" }),
    /* @__PURE__ */ d.jsx(el, { tone: WC(S), pulse: S === "starting" || S === "installing", children: jC(S) }),
    i && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("span", { className: on, children: "Uptime" }),
      /* @__PURE__ */ d.jsx("span", { children: eM(i.uptimeSeconds) }),
      /* @__PURE__ */ d.jsx("span", { className: on, children: "VRAM" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        i.vramUsedMb,
        " / ",
        i.vramTotalMb,
        " MB"
      ] })
    ] }),
    w && /* @__PURE__ */ d.jsx(Qe, { disabled: h, onClick: v, children: "Install / Start runtime" }),
    j && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(Qe, { variant: "danger", disabled: h, onClick: p, children: "Stop backend" }),
      /* @__PURE__ */ d.jsx(Qe, { variant: "secondary", disabled: h, onClick: y, children: "Restart" })
    ] }),
    T && /* @__PURE__ */ d.jsx(Qe, { disabled: h, onClick: b, children: "Download IndexTTS-2 model" }),
    /* @__PURE__ */ d.jsx(
      Qe,
      {
        variant: "secondary",
        onClick: () => a(`/${n.deploymentId}/mappings`),
        title: "Manage character → voice mappings (upload voice samples, edit emotion defaults)",
        children: "Mappings"
      }
    ),
    o && !T && /* @__PURE__ */ d.jsx(cn, { severity: "error", children: o })
  ] });
}
function WC(n) {
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
function eM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Lr(n) {
  return n instanceof Oi || n instanceof Error ? n.message : "unknown error";
}
const dy = 32, hy = -30, my = -6, py = 0.5, vy = 2, gy = -24, yy = 24, by = -12, xy = 12, Sy = -12, Ey = 12, wy = -60, jy = -20;
class Ri extends Error {
  constructor(a, i) {
    super(i), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function tM(n, a, i, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, c = `${Ll}${o}`, h = await fetch(c, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (h.status === 409) {
    const m = await h.json().catch(() => null), v = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Ri(v, p);
  }
  if (!h.ok)
    throw new Error(await du(h, "apply"));
  return await h.json();
}
async function nM(n, a, i, s, o = {}) {
  const c = `/deployments/${encodeURIComponent(n)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(i)}/edit`, h = `${Ll}${c}`, m = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const v = await m.json().catch(() => null), p = v?.error?.current_digest ?? "", y = v?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Ri(p, y);
  }
  if (!m.ok)
    throw new Error(await du(m, "apply"));
  return await m.json();
}
async function aM(n, a, i, s = {}) {
  const o = `${Ll}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: i }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!c.ok)
    throw new Error(await du(c, "preview"));
  return c.blob();
}
async function lM(n, a, i, s = 50, o = {}) {
  const c = `${Ll}/audit/${encodeURIComponent(a)}/${encodeURIComponent(i)}?deploymentId=${encodeURIComponent(n)}&limit=${encodeURIComponent(String(s))}`, h = await fetch(c, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!h.ok)
    throw new Error(await du(h, "audit fetch"));
  return await h.json();
}
function Jt() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function kb(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > dy)
    return {
      message: `Chain exceeds the maximum of ${dy} operations.`
    };
  for (const i of n.ops) {
    const s = iM(i, a);
    if (s) return s;
  }
  return null;
}
function iM(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return rM(n.id, n.start_ms, n.end_ms, a);
    case "normalize":
      return n.target_lufs < hy || n.target_lufs > my ? {
        opId: n.id,
        message: `Normalize target must be between ${hy} and ${my} LUFS.`
      } : null;
    case "speed":
      return n.factor < py || n.factor > vy ? {
        opId: n.id,
        message: `Speed factor must be between ${py}× and ${vy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return n.duration_ms < 1 ? { opId: n.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return n.gain_db < gy || n.gain_db > yy ? {
        opId: n.id,
        message: `Volume must be between ${gy} and ${yy} dB.`
      } : null;
    case "eq3":
      for (const [i, s] of [
        ["low_db", n.low_db],
        ["mid_db", n.mid_db],
        ["high_db", n.high_db]
      ])
        if (s < by || s > xy)
          return {
            opId: n.id,
            message: `EQ ${i} must be between ${by} and ${xy} dB.`
          };
      return null;
    case "pitch_shift":
      return n.semitones < Sy || n.semitones > Ey ? {
        opId: n.id,
        message: `Pitch must be between ${Sy} and ${Ey} semitones.`
      } : null;
    case "silence_strip":
      return n.threshold_db < wy || n.threshold_db > jy ? {
        opId: n.id,
        message: `Silence threshold must be between ${wy} and ${jy} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function rM(n, a, i, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : i <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && i > s ? { opId: n, message: "End extends past source duration." } : null;
}
async function du(n, a) {
  const i = await n.json().catch(() => null);
  return i?.error?.message ?? i?.message ?? `${a} failed: ${n.status}`;
}
const Po = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, hu = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -40 }
}, ma = 1e-3;
function sM(n, a, i) {
  for (const s of Object.keys(Po)) {
    const o = Po[s];
    if (Math.abs(o.low - n) < ma && Math.abs(o.mid - a) < ma && Math.abs(o.high - i) < ma)
      return s;
  }
  return "custom";
}
function oM(n) {
  let a = cM();
  for (const i of n.ops)
    a = uM(a, i);
  return a;
}
function uM(n, a) {
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
          preset: sM(a.low_db, a.mid_db, a.high_db)
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
function cM() {
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
    silence: { enabled: !1, thresholdDb: -40 }
  };
}
function ga(n, a) {
  return n.ops.filter((i) => i.mode !== a);
}
function al(n, a) {
  return [...n, a];
}
function qb(n, a) {
  const i = ga(n, "gain");
  if (Math.abs(a) < ma) return { ...n, ops: i };
  const s = { id: Jt(), mode: "gain", gain_db: a };
  return { ...n, ops: al(i, s) };
}
function Hb(n, a, i, s) {
  const o = ga(n, "eq3");
  if (Math.abs(a) < ma && Math.abs(i) < ma && Math.abs(s) < ma)
    return { ...n, ops: o };
  const c = {
    id: Jt(),
    mode: "eq3",
    low_db: a,
    mid_db: i,
    high_db: s
  };
  return { ...n, ops: al(o, c) };
}
function fM(n, a) {
  const i = ga(n, "speed");
  if (Math.abs(a - 1) < ma) return { ...n, ops: i };
  const s = { id: Jt(), mode: "speed", factor: a };
  return { ...n, ops: al(i, s) };
}
function $b(n, a) {
  const i = ga(n, "pitch_shift");
  if (Math.abs(a) < ma) return { ...n, ops: i };
  const s = {
    id: Jt(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...n, ops: al(i, s) };
}
function dM(n, a, i) {
  const s = ga(n, "normalize");
  if (a === "off") return { ...n, ops: s };
  const o = {
    id: Jt(),
    mode: "normalize",
    target_lufs: i
  };
  return { ...n, ops: al(s, o) };
}
function Yb(n, a) {
  const i = ga(n, "fade_in");
  if (a <= 0) return { ...n, ops: i };
  const s = {
    id: Jt(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: al(i, s) };
}
function Fb(n, a) {
  const i = ga(n, "fade_out");
  if (a <= 0) return { ...n, ops: i };
  const s = {
    id: Jt(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: al(i, s) };
}
function Gb(n, a, i) {
  const s = ga(n, "silence_strip");
  if (!a) return { ...n, ops: s };
  const o = {
    id: Jt(),
    mode: "silence_strip",
    threshold_db: i
  };
  return { ...n, ops: al(s, o) };
}
function hM(n, a) {
  let i = n;
  return i = qb(i, a.volumeDb), i = Hb(i, a.eq3.low, a.eq3.mid, a.eq3.high), a.speed.mode === "audio" ? i = fM(i, a.speed.value) : i = { ...i, ops: ga(i, "speed") }, i = $b(i, a.pitchSt), i = dM(
    i,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), i = Yb(i, a.fade.inS), i = Fb(i, a.fade.outS), i = Gb(i, a.silence.enabled, a.silence.thresholdDb), i;
}
const Xb = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "pitch_shift",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function Ib(n, a) {
  const i = {
    ...n,
    ops: n.ops.filter((c) => !Xb.has(c.mode))
  };
  let o = qb({ version: 1, ops: [] }, a.volumeDb);
  return o = Hb(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), o = $b(o, a.pitchSt), o = Yb(o, a.fade.inS), o = Fb(o, a.fade.outS), o = Gb(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...i, ops: [...i.ops, ...o.ops] };
}
function Kb(n) {
  const a = {
    ...n,
    ops: n.ops.filter((i) => Xb.has(i.mode))
  };
  return oM(a);
}
var mM = "_1rsa80i0", pM = "_1rsa80i1", vM = "_1rsa80i2", gM = "_1rsa80i3", yM = "_1rsa80i4", bM = "_1rsa80i5", xM = "_1rsa80i6", SM = "_1rsa80i7", EM = "_1rsa80i8", wM = "_1rsa80i9";
const Qb = ["flat", "warm", "bright", "voice", "telephone"], Ur = -12, Ro = 12, jM = 0.5;
function TM(n) {
  const { low: a, mid: i, high: s, preset: o, onChange: c, disabled: h } = n, m = (p) => {
    const y = Po[p];
    c(y.low, y.mid, y.high, p);
  }, v = (p, y) => {
    const b = { low: a, mid: i, high: s, [p]: y }, S = MM(b.low, b.mid, b.high);
    c(b.low, b.mid, b.high, S);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: mM, children: [
    /* @__PURE__ */ d.jsxs("div", { className: pM, role: "group", "aria-label": "EQ presets", children: [
      Qb.map((p) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: vM,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: h,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ d.jsx("span", { className: gM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: yM, children: [
      /* @__PURE__ */ d.jsx(
        Ff,
        {
          label: "Low",
          value: a,
          onChange: (p) => v("low", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ d.jsx(
        Ff,
        {
          label: "Mid",
          value: i,
          onChange: (p) => v("mid", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ d.jsx(
        Ff,
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
function Ff({ label: n, value: a, onChange: i, disabled: s }) {
  const o = (a - Ur) / (Ro - Ur) * 100, c = `eq3-${n.toLowerCase()}`;
  return /* @__PURE__ */ d.jsxs("div", { className: bM, children: [
    /* @__PURE__ */ d.jsx("label", { htmlFor: c, className: xM, children: n }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: c,
        type: "range",
        min: Ur,
        max: Ro,
        step: jM,
        value: a,
        disabled: s,
        className: EM,
        style: { "--fill": `${o}%` },
        onChange: (h) => i(Number(h.target.value)),
        "aria-valuemin": Ur,
        "aria-valuemax": Ro,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: SM, children: CM(a) }),
    /* @__PURE__ */ d.jsxs("span", { className: wM, "aria-hidden": "true", children: [
      /* @__PURE__ */ d.jsx("span", { children: Ur }),
      /* @__PURE__ */ d.jsx("span", { children: "0" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        "+",
        Ro
      ] })
    ] })
  ] });
}
function CM(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
const Gf = 1e-3;
function MM(n, a, i) {
  for (const s of Qb) {
    const o = Po[s];
    if (Math.abs(o.low - n) < Gf && Math.abs(o.mid - a) < Gf && Math.abs(o.high - i) < Gf)
      return s;
  }
  return "custom";
}
var NM = "_85bhwb0", AM = "_85bhwb1", Ty = "_85bhwb2", RM = "_85bhwb3", _M = "_85bhwb4", DM = "_85bhwb5", zM = "_85bhwb6", OM = "_85bhwb7";
const _o = 0.5, Xf = 2, LM = 0.05;
function UM(n) {
  const { mode: a, value: i, supportsSynthSpeed: s, onChange: o, onReRenderAtSynthTime: c, disabled: h } = n, m = (i - _o) / (Xf - _o) * 100, v = "speed-slider", p = (b) => o(b, i), y = (b) => o(a, b);
  return /* @__PURE__ */ d.jsxs("div", { className: NM, children: [
    s ? /* @__PURE__ */ d.jsxs("div", { className: AM, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: Ty,
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
          className: Ty,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ d.jsxs("div", { className: RM, children: [
      /* @__PURE__ */ d.jsx(
        "input",
        {
          id: v,
          type: "range",
          min: _o,
          max: Xf,
          step: LM,
          value: i,
          disabled: h,
          className: _M,
          style: { "--fill": `${m}%` },
          onChange: (b) => y(Number(b.target.value)),
          "aria-valuemin": _o,
          "aria-valuemax": Xf,
          "aria-valuenow": i,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: DM, children: `${i.toFixed(2)}×` })
    ] }),
    a === "synth" && s ? /* @__PURE__ */ d.jsxs("div", { className: zM, children: [
      /* @__PURE__ */ d.jsx(
        Qe,
        {
          variant: "primary",
          size: "sm",
          onClick: c,
          disabled: h || !c,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: OM, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var VM = "kgszk50", BM = "kgszk51", Cy = "kgszk52", kM = "kgszk53", qM = "kgszk54", Zb = "kgszk55", HM = "kgszk56", $M = "kgszk58", sh = "kgszk59", Pb = "kgszk5a", oh = "kgszk5b", YM = "kgszk5c", FM = "kgszk5d", GM = "kgszk5e", My = "kgszk5f", Ny = "kgszk5g", Ay = "kgszk5h", XM = "kgszk5i", IM = "kgszk5j", KM = "kgszk5l", Qr = "kgszk5m", Zr = "kgszk5n";
const QM = -24, ZM = 24, PM = 0.5, JM = -12, WM = 12, eN = 0.5, tN = -30, nN = -6, aN = -12, lN = 0, Do = -60, If = -20;
function uh(n) {
  const {
    state: a,
    onChange: i,
    supportsSynthSpeed: s,
    onReRenderAtSynthTime: o,
    pendingExecution: c = !1,
    disabled: h = !1,
    onApply: m,
    applyLabel: v = "Apply edit"
  } = n, p = (b) => {
    i({ ...a, ...b });
  }, y = oN(a);
  return /* @__PURE__ */ d.jsxs("div", { className: VM, children: [
    /* @__PURE__ */ d.jsxs("div", { className: BM, children: [
      y.length === 0 ? /* @__PURE__ */ d.jsx("span", { className: kM, children: "No active edits" }) : /* @__PURE__ */ d.jsxs("span", { className: Cy, children: [
        /* @__PURE__ */ d.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ d.jsx("span", { children: y.join(" · ") })
      ] }),
      c ? /* @__PURE__ */ d.jsxs("span", { className: Cy, "aria-live": "polite", children: [
        /* @__PURE__ */ d.jsx("span", { className: qM, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ d.jsx(
      Ry,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: QM,
        max: ZM,
        step: PM,
        format: uN,
        value: a.volumeDb,
        onChange: (b) => p({ volumeDb: b }),
        disabled: h
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: Qr, children: [
      /* @__PURE__ */ d.jsx("span", { className: Zr, children: "3-band EQ" }),
      /* @__PURE__ */ d.jsx(
        TM,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: h,
          onChange: (b, S, w, j) => p({ eq3: { low: b, mid: S, high: w, preset: j } })
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: Qr, children: [
      /* @__PURE__ */ d.jsx("span", { className: Zr, children: "Speed" }),
      /* @__PURE__ */ d.jsx(
        UM,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: s,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: h,
          onChange: (b, S) => p({ speed: { mode: b, value: S } })
        }
      )
    ] }),
    /* @__PURE__ */ d.jsx(
      Ry,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: JM,
        max: WM,
        step: eN,
        format: cN,
        value: a.pitchSt,
        onChange: (b) => p({ pitchSt: b }),
        disabled: h
      }
    ),
    /* @__PURE__ */ d.jsx(
      iN,
      {
        normalize: a.normalize,
        disabled: h,
        onChange: (b) => p({ normalize: b })
      }
    ),
    /* @__PURE__ */ d.jsx(
      rN,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: h,
        onChange: (b, S) => p({ fade: { ...a.fade, inS: b, outS: S } })
      }
    ),
    /* @__PURE__ */ d.jsx(
      sN,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: h,
        onChange: (b, S) => p({ silence: { enabled: b, thresholdDb: S } })
      }
    ),
    m ? /* @__PURE__ */ d.jsxs("div", { className: KM, children: [
      /* @__PURE__ */ d.jsx(
        Qe,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(hu),
          disabled: h,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ d.jsx(Qe, { variant: "primary", size: "md", onClick: m, disabled: h, children: v })
    ] }) : null
  ] });
}
function Ry(n) {
  const { label: a, sub: i, min: s, max: o, step: c, format: h, value: m, onChange: v, disabled: p } = n, y = (m - s) / (o - s) * 100, b = `dm-${a.toLowerCase()}`;
  return /* @__PURE__ */ d.jsxs("div", { className: Zb, children: [
    /* @__PURE__ */ d.jsxs("div", { className: HM, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: b, className: $M, children: a }),
      /* @__PURE__ */ d.jsx("span", { className: Pb, children: i })
    ] }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: b,
        type: "range",
        min: s,
        max: o,
        step: c,
        value: m,
        disabled: p,
        className: oh,
        style: { "--fill": `${y}%` },
        onChange: (S) => v(Number(S.target.value)),
        "aria-valuemin": s,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: sh, children: h(m) })
  ] });
}
function iN({ normalize: n, onChange: a, disabled: i }) {
  const o = n.mode === "loudness" ? { min: tN, max: nN, step: 0.5, suffix: "LUFS" } : { min: aN, max: lN, step: 0.5, suffix: "dB" }, c = fN(n.targetDbOrLufs, o.min, o.max), h = (c - o.min) / (o.max - o.min) * 100, m = (v) => {
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
  return /* @__PURE__ */ d.jsxs("div", { className: Qr, children: [
    /* @__PURE__ */ d.jsx("span", { className: Zr, children: "Normalize" }),
    /* @__PURE__ */ d.jsx("div", { className: YM, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((v) => /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: FM,
        "data-active": n.mode === v,
        disabled: i,
        onClick: () => m(v),
        children: v
      },
      v
    )) }),
    n.mode !== "off" ? /* @__PURE__ */ d.jsxs("div", { className: Zb, children: [
      /* @__PURE__ */ d.jsx("span", { className: Pb, children: "Target" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: c,
          disabled: i,
          className: oh,
          style: { "--fill": `${h}%` },
          onChange: (v) => a({ mode: n.mode, targetDbOrLufs: Number(v.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": c,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: sh, children: [
        c.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function rN({ inS: n, outS: a, onChange: i, disabled: s }) {
  return /* @__PURE__ */ d.jsxs("div", { className: Qr, children: [
    /* @__PURE__ */ d.jsx("span", { className: Zr, children: "Fade" }),
    /* @__PURE__ */ d.jsxs("div", { className: GM, children: [
      /* @__PURE__ */ d.jsxs("div", { className: My, children: [
        /* @__PURE__ */ d.jsx("label", { className: Ny, htmlFor: "fade-in", children: "Fade in (s)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: "fade-in",
            type: "number",
            min: 0,
            step: 0.05,
            value: n,
            disabled: s,
            className: Ay,
            onChange: (o) => i(Math.max(0, Number(o.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: My, children: [
        /* @__PURE__ */ d.jsx("label", { className: Ny, htmlFor: "fade-out", children: "Fade out (s)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: "fade-out",
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: s,
            className: Ay,
            onChange: (o) => i(n, Math.max(0, Number(o.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function sN({ enabled: n, thresholdDb: a, onChange: i, disabled: s }) {
  const o = (a - Do) / (If - Do) * 100;
  return /* @__PURE__ */ d.jsxs("div", { className: Qr, children: [
    /* @__PURE__ */ d.jsx("span", { className: Zr, children: "Silence trim" }),
    /* @__PURE__ */ d.jsxs("div", { className: XM, children: [
      /* @__PURE__ */ d.jsxs("label", { className: IM, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: n,
            disabled: s,
            onChange: (c) => i(c.target.checked, a)
          }
        ),
        "Enabled"
      ] }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: Do,
          max: If,
          step: 1,
          value: a,
          disabled: s || !n,
          className: oh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (c) => i(n, Number(c.target.value)),
          "aria-valuemin": Do,
          "aria-valuemax": If,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: sh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const xi = 1e-3;
function oN(n) {
  const a = [];
  return Math.abs(n.volumeDb) >= xi && a.push("gain"), (Math.abs(n.eq3.low) >= xi || Math.abs(n.eq3.mid) >= xi || Math.abs(n.eq3.high) >= xi) && a.push("eq3"), n.speed.mode === "audio" && Math.abs(n.speed.value - 1) >= xi && a.push("speed"), Math.abs(n.pitchSt) >= xi && a.push("pitch"), n.normalize.mode !== "off" && a.push("normalize"), n.fade.inS > 0 && a.push("fade-in"), n.fade.outS > 0 && a.push("fade-out"), n.silence.enabled && a.push("silence"), a;
}
function uN(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
function cN(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} st`;
}
function fN(n, a, i) {
  return Number.isFinite(n) ? Math.max(a, Math.min(i, n)) : a;
}
var dN = "skdk4g1", hN = "skdk4g3", mN = "skdk4g4", pN = "skdk4g5", _y = "skdk4g6", Dy = "skdk4g7", vN = "skdk4g8", zy = "skdk4g9", Oy = "skdk4ga", gN = "skdk4gb", yN = "skdk4gc", bN = "skdk4gd", Ly = "skdk4ge", xN = "cgsfgh0", SN = "cgsfgh1", EN = "cgsfgh2", wN = "cgsfgh3", jN = "cgsfgh4", TN = "cgsfgh5", CN = "cgsfgh6", MN = "cgsfgh7", NN = "cgsfgh8", AN = "cgsfgh9", RN = "cgsfgha", _N = "cgsfghb", DN = "cgsfghc", zN = "cgsfghd", ON = "cgsfghe", LN = "cgsfghf", UN = "cgsfghg", VN = "cgsfghh", BN = "cgsfghi", kN = "cgsfghj", qN = "cgsfghk";
const Ft = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], Hr = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, xd = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, Jb = 0.05;
function HN(n) {
  let a = null, i = -1 / 0;
  for (const s of Ft) {
    const o = n[s];
    o > i && (i = o, a = s);
  }
  return !a || i <= Jb ? null : a;
}
function Wb(n, a = 3) {
  return Ft.map((i) => ({ key: i, label: Hr[i], value: n[i] })).filter((i) => i.value > Jb).sort((i, s) => s.value - i.value).slice(0, a);
}
function $N(n) {
  let a = 0;
  for (const i of Ft) a += n[i] * n[i];
  return Math.sqrt(a);
}
function Uy(n) {
  const a = Wb(n, 2), i = a[0];
  if (!i) return "";
  const s = a[1];
  return !s || i.value - s.value > 0.25 ? Kf(i.label) : `${Kf(i.label)} + ${s.label.toLowerCase()}`;
}
function Kf(n) {
  if (!n) return n;
  const a = n[0];
  return a ? a.toUpperCase() + n.slice(1) : n;
}
function Sd(n) {
  const a = { ...xd };
  for (const i of Ft) {
    const s = n[i];
    a[i] = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
  }
  return a;
}
const Vy = 0.05, By = 0.2;
function YN(n) {
  const { vec: a, onChange: i, size: s } = n, [o, c] = x.useState(a), [h, m] = x.useState(null), v = x.useRef(null), p = x.useRef(a);
  x.useEffect(() => {
    c(a), p.current = a;
  }, [a]);
  const y = x.useCallback(
    (R) => {
      const O = Sd(R);
      c(O), p.current = O, i(O);
    },
    [i]
  ), b = x.useCallback((R) => {
    const O = Sd(R);
    c(O), p.current = O;
  }, []), S = x.useCallback(
    (R) => {
      const O = v.current;
      if (!O) return;
      const D = R.clientX - O.centerX, z = R.clientY - O.centerY, k = Math.sqrt(D * D + z * z), J = s / 2, I = Math.max(0, Math.min(1, k / J)), W = { ...p.current, [O.axis]: I };
      b(W);
    },
    [s, b]
  ), w = x.useCallback(
    (R) => {
      v.current && (window.removeEventListener("pointermove", S), window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w), v.current = null, y(p.current));
    },
    [y, S]
  ), j = x.useCallback(
    (R, O) => {
      O.preventDefault();
      const D = O.currentTarget, k = (D.ownerSVGElement ?? D).getBoundingClientRect(), J = k.left + k.width / 2, I = k.top + k.height / 2, M = Ft.indexOf(R) / Ft.length * Math.PI * 2 - Math.PI / 2;
      v.current = {
        axis: R,
        pointerId: O.pointerId,
        centerX: J,
        centerY: I,
        angle: M
      }, m(R), window.addEventListener("pointermove", S), window.addEventListener("pointerup", w), window.addEventListener("pointercancel", w);
    },
    [S, w]
  ), T = x.useCallback(
    (R, O) => {
      const D = p.current[R];
      let z = D;
      switch (O.key) {
        case "ArrowUp":
        case "ArrowRight":
          z = D + Vy;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          z = D - Vy;
          break;
        case "PageUp":
          z = D + By;
          break;
        case "PageDown":
          z = D - By;
          break;
        case "Home":
          z = 0;
          break;
        case "End":
          z = 1;
          break;
        default:
          return;
      }
      O.preventDefault(), m(R), y({ ...p.current, [R]: z });
    },
    [y]
  );
  return {
    liveVec: o,
    activeAxis: h,
    setActiveAxis: m,
    onPointerDown: j,
    onKeyDown: T
  };
}
const FN = [0.25, 0.5, 0.75, 1];
function GN({
  vec: n,
  onChange: a,
  size: i = 360,
  readOnly: s = !1,
  reduceMotion: o = !1
}) {
  const c = YN({ vec: n, onChange: a, size: i }), h = i / 2, m = i / 2, v = i / 2 * 0.78, p = x.useMemo(() => XN(h, m, v), [h, m, v]), y = x.useMemo(() => Ft.map((w, j) => {
    const T = Go(c.liveVec[w]), R = p[j];
    return R ? `${h + R.dx * T},${m + R.dy * T}` : "0,0";
  }).join(" "), [p, h, m, c.liveVec]), b = HN(c.liveVec), S = $N(c.liveVec);
  return /* @__PURE__ */ d.jsxs("div", { className: xN, children: [
    /* @__PURE__ */ d.jsx("div", { className: SN, style: { width: i, height: i }, children: /* @__PURE__ */ d.jsxs(
      "svg",
      {
        className: EN,
        viewBox: `0 0 ${i} ${i}`,
        role: "img",
        "aria-label": "8-axis emotion radar",
        children: [
          FN.map((w) => /* @__PURE__ */ d.jsx(
            "circle",
            {
              className: wN,
              cx: h,
              cy: m,
              r: v * w
            },
            w
          )),
          Ft.map((w, j) => {
            const T = p[j];
            if (!T) return null;
            const R = h + T.dx * 1.18, O = m + T.dy * 1.18, D = c.activeAxis === w;
            return /* @__PURE__ */ d.jsxs("g", { children: [
              /* @__PURE__ */ d.jsx(
                "line",
                {
                  className: jN,
                  x1: h,
                  y1: m,
                  x2: h + T.dx,
                  y2: m + T.dy
                }
              ),
              /* @__PURE__ */ d.jsx(
                "text",
                {
                  className: `${NN}${D ? ` ${AN}` : ""}`,
                  x: R,
                  y: O,
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  children: Hr[w]
                }
              )
            ] }, w);
          }),
          /* @__PURE__ */ d.jsx("polygon", { className: TN, points: y }),
          !s && Ft.map((w, j) => {
            const T = Go(c.liveVec[w]), R = p[j];
            if (!R) return null;
            const O = h + R.dx * T, D = m + R.dy * T, z = c.activeAxis === w;
            return /* @__PURE__ */ d.jsx(
              "circle",
              {
                className: `${CN}${z ? ` ${MN}` : ""}`,
                cx: O,
                cy: D,
                r: 6,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${Hr[w]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": T,
                onPointerDown: (k) => c.onPointerDown(w, k),
                onKeyDown: (k) => c.onKeyDown(w, k),
                onFocus: () => c.setActiveAxis(w),
                onBlur: () => c.setActiveAxis(null)
              },
              w
            );
          })
        ]
      }
    ) }),
    /* @__PURE__ */ d.jsxs("div", { className: RN, children: [
      /* @__PURE__ */ d.jsx("span", { className: _N, children: b ? Hr[b].toLowerCase() : "neutral" }),
      /* @__PURE__ */ d.jsxs("span", { className: DN, children: [
        "‖v‖ = ",
        S.toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: zN, role: "group", "aria-label": "Axis values", children: Ft.map((w) => {
      const j = Go(c.liveVec[w]), T = c.activeAxis === w;
      return /* @__PURE__ */ d.jsxs(
        "button",
        {
          type: "button",
          className: `${ON}${T ? ` ${LN}` : ""}`,
          onClick: () => a({
            ...c.liveVec,
            [w]: j > 0.05 ? 0 : 0.5
          }),
          "aria-pressed": j > 0.05,
          children: [
            Hr[w].toLowerCase(),
            /* @__PURE__ */ d.jsx("span", { className: UN, children: j.toFixed(2) })
          ]
        },
        w
      );
    }) })
  ] });
}
function XN(n, a, i) {
  return Ft.map((s, o) => {
    const c = o / Ft.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(c) * i,
      dy: Math.sin(c) * i
    };
  });
}
function Go(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function IN({ vec: n, size: a = 36 }) {
  const i = a / 2, s = a / 2, o = a / 2 * 0.86, c = x.useMemo(() => Ft.map((h, m) => {
    const v = Go(n[h]), p = m / Ft.length * Math.PI * 2 - Math.PI / 2, y = i + Math.cos(p) * o * v, b = s + Math.sin(p) * o * v;
    return `${y},${b}`;
  }).join(" "), [i, s, o, n]);
  return /* @__PURE__ */ d.jsx("span", { className: VN, "aria-hidden": "true", children: /* @__PURE__ */ d.jsxs(
    "svg",
    {
      className: BN,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ d.jsx("circle", { className: kN, cx: i, cy: s, r: o }),
        /* @__PURE__ */ d.jsx("polygon", { className: qN, points: c })
      ]
    }
  ) });
}
var Ed = "gvwvwg0", KN = "gvwvwg1", ex = "gvwvwg2", tx = "gvwvwg3", QN = "gvwvwg4", ZN = "gvwvwg5", PN = "gvwvwg6", JN = "gvwvwg7", WN = "gvwvwg8", eA = "gvwvwg9", tA = "gvwvwga", nA = "gvwvwgb", aA = "gvwvwgc", lA = "gvwvwgd";
function iA({
  vec: n,
  onSave: a,
  saving: i = !1
}) {
  const [s, o] = x.useState(Uy(n)), [c, h] = x.useState(!1), m = Wb(n, 3);
  x.useEffect(() => {
    c || o(Uy(n));
  }, [n, c]);
  const v = s.trim().length > 0;
  return /* @__PURE__ */ d.jsxs("div", { className: Ed, children: [
    /* @__PURE__ */ d.jsx("header", { className: KN, children: /* @__PURE__ */ d.jsx("span", { className: ex, children: "Save current vector as preset" }) }),
    /* @__PURE__ */ d.jsx("div", { className: tx, children: m.length === 0 ? /* @__PURE__ */ d.jsx("span", { children: "(neutral — drag the radar to set a vector first)" }) : m.map((p) => /* @__PURE__ */ d.jsxs("span", { className: QN, children: [
      p.label.toLowerCase(),
      /* @__PURE__ */ d.jsx("span", { className: ZN, children: p.value.toFixed(2) })
    ] }, p.key)) }),
    /* @__PURE__ */ d.jsxs("div", { className: PN, children: [
      /* @__PURE__ */ d.jsx(
        "input",
        {
          className: JN,
          type: "text",
          placeholder: "Preset name",
          value: s,
          onChange: (p) => {
            o(p.target.value), h(!0);
          }
        }
      ),
      /* @__PURE__ */ d.jsx(
        Qe,
        {
          variant: "primary",
          disabled: !v || i,
          onClick: () => {
            a(s.trim()), h(!1);
          },
          children: i ? "Saving…" : "Save preset"
        }
      )
    ] })
  ] });
}
function rA({
  presets: n,
  activePresetId: a,
  onSelect: i,
  onDelete: s
}) {
  return n.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: Ed, children: [
    /* @__PURE__ */ d.jsx("span", { className: ex, children: "Preset library" }),
    /* @__PURE__ */ d.jsx("span", { className: tx, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ d.jsxs("div", { className: Ed, children: [
    /* @__PURE__ */ d.jsx("span", { className: lA, children: "Preset library" }),
    /* @__PURE__ */ d.jsx("div", { className: WN, children: n.map((o) => {
      const c = sA(o), h = o.presetId === a;
      return /* @__PURE__ */ d.jsxs(
        "div",
        {
          className: `${eA}${h ? ` ${tA}` : ""}`,
          children: [
            /* @__PURE__ */ d.jsxs(
              "button",
              {
                type: "button",
                style: { display: "contents", border: "none", background: "transparent", cursor: "pointer" },
                onClick: () => i(o),
                children: [
                  /* @__PURE__ */ d.jsx(IN, { vec: c, size: 28 }),
                  /* @__PURE__ */ d.jsx("span", { className: nA, children: o.presetName })
                ]
              }
            ),
            s && /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: aA,
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
const wd = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function sA(n) {
  const a = wd.reduce(
    (i, s) => ({ ...i, [s]: 0 }),
    {}
  );
  return Array.isArray(n.vector) ? wd.reduce(
    (i, s, o) => ({ ...i, [s]: n.vector[o] ?? 0 }),
    a
  ) : a;
}
function ky(n) {
  return wd.map((a) => n[a] ?? 0);
}
const oA = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function uA({
  value: n,
  onChange: a,
  deploymentId: i
}) {
  const s = n.mode ?? "none", o = x.useMemo(() => cA(n.vector), [n.vector]), c = n.emotionAlpha ?? 1, [h, m] = x.useState([]), [v, p] = x.useState(null), [y, b] = x.useState(!1), [S, w] = x.useState(null), j = x.useRef(!0);
  x.useEffect(() => (j.current = !0, () => {
    j.current = !1;
  }), []), x.useEffect(() => {
    let I = !1;
    return Db(i).then((W) => {
      I || m(qy(W.presets));
    }).catch((W) => {
      I || p(Qf(W));
    }), () => {
      I = !0;
    };
  }, [i]);
  const T = (I) => {
    a({ ...n, mode: I });
  }, R = (I) => {
    a({
      ...n,
      mode: "emotion_vector",
      vector: ky(I)
    }), S && w(null);
  }, O = (I) => {
    const W = Math.max(0, Math.min(1, Number.isFinite(I) ? I : 1));
    a({ ...n, emotionAlpha: W });
  }, D = async (I) => {
    b(!0), p(null);
    try {
      const W = await PT(i, I, ky(o));
      if (!j.current) return;
      m(
        (M) => qy([W, ...M.filter((V) => V.presetId !== W.presetId)])
      ), w(W.presetId);
    } catch (W) {
      j.current && p(Qf(W));
    } finally {
      j.current && b(!1);
    }
  }, z = async (I) => {
    const W = h;
    m((M) => M.filter((V) => V.presetId !== I)), S === I && w(null);
    try {
      await JT(i, I);
    } catch (M) {
      j.current && (m(W), p(Qf(M)));
    }
  }, k = (I) => {
    w(I.presetId), a({
      ...n,
      mode: "emotion_vector",
      vector: I.vector
    });
  }, J = (I) => {
    a({ ...n, mode: "qwen_template", qwenTemplate: I });
  };
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx("div", { className: `${oy} ${dN}`, children: /* @__PURE__ */ d.jsx(
      GN,
      {
        vec: o,
        onChange: R,
        readOnly: s !== "emotion_vector"
      }
    ) }),
    /* @__PURE__ */ d.jsxs("div", { className: oy, children: [
      /* @__PURE__ */ d.jsx("div", { className: hN, role: "radiogroup", "aria-label": "Emotion mode", children: oA.map((I) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === I.id,
          className: `${mN}${s === I.id ? ` ${pN}` : ""}`,
          onClick: () => T(I.id),
          children: I.label
        },
        I.id
      )) }),
      s === "none" && /* @__PURE__ */ d.jsxs("div", { className: Ly, children: [
        "Neutral default. Per-line ",
        /* @__PURE__ */ d.jsx("code", { children: "[Char|emotion_vector:…]" }),
        " overrides still apply when present."
      ] }),
      s === "emotion_vector" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsxs("div", { className: _y, children: [
          /* @__PURE__ */ d.jsxs("span", { children: [
            /* @__PURE__ */ d.jsx("span", { className: Dy, children: "Alpha" }),
            /* @__PURE__ */ d.jsx("br", {}),
            /* @__PURE__ */ d.jsx("span", { className: vN, children: "Global mix · per-line overrides bypass it" })
          ] }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: c,
              className: zy,
              style: { "--fill": `${c * 100}%` },
              onChange: (I) => O(Number(I.target.value)),
              "aria-label": "Emotion alpha"
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { className: Oy, children: [
            (c * 100).toFixed(0),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ d.jsx(
          iA,
          {
            vec: o,
            onSave: D,
            saving: y
          }
        ),
        /* @__PURE__ */ d.jsx(
          rA,
          {
            presets: h,
            activePresetId: S,
            onSelect: k,
            onDelete: z
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ d.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
        /* @__PURE__ */ d.jsx(
          "textarea",
          {
            className: gN,
            placeholder: 'e.g. "Friendly teen, slightly skeptical"',
            value: n.qwenTemplate ?? "",
            onChange: (I) => J(I.target.value)
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { className: yN, children: [
          "The Qwen prompt is mapped to a vector at synth time. Per-line",
          " ",
          /* @__PURE__ */ d.jsx("code", { children: "[Char|qwen:…]" }),
          " overrides take precedence."
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: _y, children: [
          /* @__PURE__ */ d.jsx("span", { className: Dy, children: "Alpha" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: c,
              className: zy,
              style: { "--fill": `${c * 100}%` },
              onChange: (I) => O(Number(I.target.value)),
              "aria-label": "Emotion alpha"
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { className: Oy, children: [
            (c * 100).toFixed(0),
            "%"
          ] })
        ] })
      ] }),
      s === "audio_ref" && /* @__PURE__ */ d.jsx("div", { className: Ly, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
      v && /* @__PURE__ */ d.jsx("div", { className: bN, children: v })
    ] })
  ] });
}
function cA(n) {
  if (!n || !Array.isArray(n)) return Sd(xd);
  const a = { ...xd };
  return Ft.forEach((i, s) => {
    const o = n[s];
    a[i] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function qy(n) {
  return [...n].sort((a, i) => i.updatedAt - a.updatedAt);
}
function Qf(n) {
  return n instanceof Oi || n instanceof Error ? n.message : "Unknown error";
}
const Hy = [
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
], fA = {
  help: "Read hits, write misses. Fastest on re-runs."
};
function dA({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: i,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: c,
  generation: h,
  onGenerationChange: m
}) {
  const v = (y, b) => {
    m({ ...h, [y]: b });
  }, p = Hy.find((y) => y.id === o) ?? fA;
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("label", { className: Qa, children: [
      /* @__PURE__ */ d.jsx("span", { className: on, children: "Format" }),
      /* @__PURE__ */ d.jsxs("select", { value: n, onChange: (y) => a(y.currentTarget.value), children: [
        /* @__PURE__ */ d.jsx("option", { value: "mp3", children: "mp3" }),
        /* @__PURE__ */ d.jsx("option", { value: "wav", children: "wav" }),
        /* @__PURE__ */ d.jsx("option", { value: "flac", children: "flac" })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("label", { className: Qa, children: [
      /* @__PURE__ */ d.jsx("span", { className: on, children: "Speed" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: 0.5,
          max: 2,
          step: 0.05,
          value: i,
          onChange: (y) => s(Number(y.currentTarget.value))
        }
      ),
      /* @__PURE__ */ d.jsxs("output", { children: [
        i.toFixed(2),
        "×"
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: Qa,
        role: "radiogroup",
        "aria-label": "Cache policy",
        children: [
          /* @__PURE__ */ d.jsx("span", { className: on, children: "Cache" }),
          Hy.map((y) => /* @__PURE__ */ d.jsx(
            Qe,
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
    /* @__PURE__ */ d.jsx("p", { className: on, "aria-live": "polite", children: p.help }),
    /* @__PURE__ */ d.jsxs("label", { className: Qa, children: [
      /* @__PURE__ */ d.jsx("span", { className: on, children: "Temperature" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 2,
          step: 0.05,
          defaultValue: 0.8,
          onChange: (y) => v("temperature", Number(y.currentTarget.value))
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs("label", { className: Qa, children: [
      /* @__PURE__ */ d.jsx("span", { className: on, children: "Top-p" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 1,
          step: 0.05,
          defaultValue: 0.8,
          onChange: (y) => v("top_p", Number(y.currentTarget.value))
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs("label", { className: Qa, children: [
      /* @__PURE__ */ d.jsx("span", { className: on, children: "Seed" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "number",
          defaultValue: 42,
          onChange: (y) => v("seed", Number(y.currentTarget.value))
        }
      )
    ] })
  ] });
}
var hA = "iv43qk0", $y = "iv43qk1", mA = "iv43qk2", Yy = "iv43qk3", pA = "iv43qk4", vA = "iv43qk5", gA = "iv43qk6", yA = "iv43qk7", bA = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, xA = "iv43qkd", SA = "iv43qke", Zf = "iv43qkf", Pf = "iv43qkg";
function EA({
  lines: n,
  characterColors: a,
  onLineClick: i
}) {
  if (n.length === 0)
    return /* @__PURE__ */ d.jsx("p", { className: xA, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const s = n.length, o = n.filter((h) => h.character !== null).length, c = s - o;
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: SA, children: [
      /* @__PURE__ */ d.jsxs("span", { className: Zf, children: [
        /* @__PURE__ */ d.jsx("span", { className: Pf, children: s }),
        "lines"
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: Zf, children: [
        /* @__PURE__ */ d.jsx("span", { className: Pf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: Zf, children: [
        /* @__PURE__ */ d.jsx("span", { className: Pf, children: c }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("ol", { className: hA, children: n.map((h) => /* @__PURE__ */ d.jsx(
      wA,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...i ? { onClick: () => i(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function wA({ line: n, color: a, onClick: i }) {
  return n.character === null ? /* @__PURE__ */ d.jsxs("li", { className: `${$y} ${mA}`, children: [
    /* @__PURE__ */ d.jsx("span", { className: Yy, children: String(n.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ d.jsx("span", { className: gA, children: n.text })
  ] }) : /* @__PURE__ */ d.jsxs(
    "li",
    {
      className: $y,
      onClick: i,
      style: i ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ d.jsx("span", { className: Yy, children: String(n.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ d.jsx("span", { className: pA, style: a ? { color: a } : void 0, children: n.character }),
        /* @__PURE__ */ d.jsxs("span", { className: vA, children: [
          n.text,
          n.override && /* @__PURE__ */ d.jsxs("span", { className: `${yA} ${bA[n.override.kind]}`, children: [
            n.override.kind,
            n.override.label ? ` · ${n.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var jA = "_46z95i0", TA = "_46z95i1", CA = "_46z95i2", MA = "_46z95i3", NA = "_46z95i4", AA = "_46z95i5", RA = "_46z95i6";
const _A = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function DA({ value: n, onChange: a }) {
  return /* @__PURE__ */ d.jsxs("div", { className: jA, children: [
    /* @__PURE__ */ d.jsx(
      Jf,
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
      Jf,
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
      Jf,
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
function Jf({ label: n, sub: a, min: i, max: s, step: o, format: c, value: h, onChange: m }) {
  const v = (h - i) / (s - i) * 100, p = `perf-${n.toLowerCase()}`;
  return /* @__PURE__ */ d.jsxs("div", { className: TA, children: [
    /* @__PURE__ */ d.jsxs("div", { className: CA, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: p, className: MA, children: n }),
      /* @__PURE__ */ d.jsx("span", { className: NA, children: a })
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
        className: AA,
        style: { "--fill": `${v}%` },
        onChange: (y) => m(Number(y.target.value))
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: RA, children: c(h) })
  ] });
}
var zA = "qe93dj0", OA = "qe93dj1", LA = "qe93dj2", UA = "qe93dj3", VA = "qe93dj4", BA = "qe93dj5", kA = "qe93dj6", qA = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, HA = "qe93dja", $A = "qe93djb";
function YA({ checks: n }) {
  const a = n.filter((i) => i.status === "ok").length;
  return /* @__PURE__ */ d.jsxs("div", { className: zA, children: [
    /* @__PURE__ */ d.jsxs("header", { className: OA, children: [
      /* @__PURE__ */ d.jsx("span", { className: LA, children: "Pre-flight" }),
      /* @__PURE__ */ d.jsxs("span", { className: UA, children: [
        a,
        "/",
        n.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("ul", { className: VA, children: n.map((i) => /* @__PURE__ */ d.jsxs("li", { className: BA, children: [
      /* @__PURE__ */ d.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${kA} ${qA[i.status]}`
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: HA, children: i.label }),
      i.detail && /* @__PURE__ */ d.jsx("span", { className: $A, children: i.detail })
    ] }, i.id)) })
  ] });
}
var FA = "xq3iim0", GA = "xq3iim2 xq3iim1", XA = "xq3iim3 xq3iim1", IA = "xq3iim4", KA = "xq3iim5", QA = "xq3iim6", ZA = "xq3iim7";
function PA({
  deploymentId: n,
  initialVoiceAssetId: a,
  onChange: i
}) {
  const [s, o] = x.useState([]), [c, h] = x.useState(a), [m, v] = x.useState(!0), [p, y] = x.useState(!1), [b, S] = x.useState(null);
  x.useEffect(() => {
    let j = !1;
    return v(!0), Kr(n).then(({ voiceAssets: T }) => {
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
    y(!0), S(null);
    const T = c;
    h(j);
    try {
      await yT(n, j), i?.(j);
    } catch (R) {
      h(T), S(R instanceof Error ? R.message : "Failed to update default voice");
    } finally {
      y(!1);
    }
  }
  return m ? /* @__PURE__ */ d.jsx("p", { className: QA, children: "Loading voices…" }) : b ? /* @__PURE__ */ d.jsx("p", { className: ZA, children: b }) : s.length === 0 ? /* @__PURE__ */ d.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ d.jsx(
    ls,
    {
      title: "No voices yet.",
      hint: "Upload a voice in Mappings to enable quick mode."
    }
  ) }) : /* @__PURE__ */ d.jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Default voice for quick mode",
      className: FA,
      children: s.map((j) => {
        const T = j.voiceAssetId === c;
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": T,
            disabled: p,
            onClick: () => void w(T ? null : j.voiceAssetId),
            className: T ? XA : GA,
            children: [
              /* @__PURE__ */ d.jsx("span", { className: IA, children: j.displayName }),
              j.durationMs !== null && j.durationMs !== void 0 && /* @__PURE__ */ d.jsx("span", { className: KA, children: JA(j.durationMs) })
            ]
          },
          j.voiceAssetId
        );
      })
    }
  );
}
function JA(n) {
  const a = n / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const i = Math.floor(a / 60), s = Math.round(a - i * 60);
  return `${i}:${s.toString().padStart(2, "0")}`;
}
var Fy = "_17fbpt30", Gy = "_17fbpt31", Xy = "_17fbpt32", WA = "_17fbpt33", eR = "_17fbpt34", tR = "_17fbpt35", Iy = "_17fbpt36", nR = "_17fbpt37", aR = "_17fbpt38";
const lR = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function iR({
  runs: n,
  deploymentId: a,
  onOpenQueue: i,
  onOpenRun: s,
  emptyHint: o
}) {
  return n.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: Fy, children: [
    /* @__PURE__ */ d.jsx("header", { className: Gy, children: /* @__PURE__ */ d.jsx(
      "a",
      {
        className: Xy,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: i ? (c) => {
          c.preventDefault(), i();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ d.jsx("p", { className: nR, children: "No runs yet." }),
    /* @__PURE__ */ d.jsx("p", { className: aR, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ d.jsxs("div", { className: Fy, children: [
    /* @__PURE__ */ d.jsxs("header", { className: Gy, children: [
      /* @__PURE__ */ d.jsx("span", {}),
      /* @__PURE__ */ d.jsx(
        "a",
        {
          className: Xy,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: i ? (c) => {
            c.preventDefault(), i();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ d.jsx("ul", { className: WA, children: n.slice(0, 5).map((c) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: eR,
        onClick: s ? () => s(c.runId) : void 0,
        children: [
          /* @__PURE__ */ d.jsx("span", { className: tR, children: c.runId }),
          /* @__PURE__ */ d.jsx("span", { className: `${Vb.sm} ${Bb[lR[c.status] ?? "neutral"]}`, children: c.status }),
          /* @__PURE__ */ d.jsx("span", { className: Iy, children: rR(c.startedAt ?? c.queuedAt) }),
          /* @__PURE__ */ d.jsx("span", { className: Iy, children: c.kind })
        ]
      }
    ) }, c.runId)) })
  ] });
}
function rR(n) {
  if (!n) return "—";
  const a = n > 1e12 ? Math.floor(n / 1e3) : n, i = new Date(a * 1e3);
  if (Number.isNaN(i.getTime())) return "—";
  const o = Date.now() - i.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : i.toISOString().slice(0, 16).replace("T", " ");
}
function sR(n) {
  const a = zi(), [i, s] = x.useState("idle"), [o, c] = x.useState(null), [h, m] = x.useState(/* @__PURE__ */ new Map()), [v, p] = x.useState(null), [y, b] = x.useState(null), S = x.useRef(null);
  x.useEffect(() => () => {
    S.current?.();
  }, []);
  const w = x.useCallback(async () => {
    s("starting"), p(null), m(/* @__PURE__ */ new Map()), b(null);
    try {
      const V = await ET(n.deploymentId, n.createPayload);
      c(V.runId), s("running"), S.current?.(), S.current = ey(
        n.deploymentId,
        V.runId,
        (P) => Ky(P, m, s, b, n.deploymentId, V.runId),
        () => s("error")
      );
    } catch (V) {
      s("error"), p(Wf(V));
    }
  }, [n.deploymentId, n.createPayload]), j = x.useCallback(async () => {
    if (o)
      try {
        await wT(n.deploymentId, o);
      } catch (V) {
        p(Wf(V));
      }
  }, [n.deploymentId, o]), T = Array.from(h.values()).sort((V, P) => V.globalIndex - P.globalIndex), R = i === "starting" || i === "running", O = y?.status === "partial", D = T.filter((V) => V.status === "failed"), z = (() => {
    if (i !== "terminal" || D.length === 0) return null;
    const V = /* @__PURE__ */ new Map();
    for (const Ee of D) {
      const we = Ee.failureCategory ?? "unknown";
      V.set(we, (V.get(we) ?? 0) + 1);
    }
    let P = "unknown", oe = 0;
    for (const [Ee, we] of V)
      we > oe && (P = Ee, oe = we);
    const ue = T.length;
    return { category: P, count: oe, total: ue };
  })(), k = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, J = "Check the run detail page for the per-segment error log.", I = v?.toLowerCase().includes("unmapped") ?? !1, W = n.diagnostics ?? [], M = W.find((V) => V.status === "fail");
  return /* @__PURE__ */ d.jsxs("div", { children: [
    W.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: GC, "aria-label": "Pre-flight checks", children: W.map((V) => /* @__PURE__ */ d.jsxs("li", { className: XC, children: [
      /* @__PURE__ */ d.jsx(el, { tone: uR(V.status), children: cR(V.status) }),
      /* @__PURE__ */ d.jsx("span", { className: IC, children: V.label }),
      V.detail && /* @__PURE__ */ d.jsx("span", { className: KC, children: V.detail })
    ] }, V.label)) }),
    v && /* @__PURE__ */ d.jsxs(
      cn,
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
          I && /* @__PURE__ */ d.jsx(
            Qe,
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
    /* @__PURE__ */ d.jsxs("div", { className: Qa, children: [
      /* @__PURE__ */ d.jsx(
        Qe,
        {
          disabled: !n.canGenerate || R || !!M,
          onClick: w,
          children: i === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ d.jsx(Qe, { variant: "danger", disabled: !R, onClick: j, children: "Cancel" })
    ] }),
    z && /* @__PURE__ */ d.jsxs(cn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ d.jsxs("strong", { children: [
        "Run failed — ",
        z.count,
        " of ",
        z.total,
        " segments failed with ",
        /* @__PURE__ */ d.jsx("code", { children: z.category })
      ] }),
      /* @__PURE__ */ d.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: k[z.category] ?? J })
    ] }),
    y?.exportArtifactRef && /* @__PURE__ */ d.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${y.exportArtifactRef}/download`,
        download: !0,
        className: `${Lb.secondary} ${Ub.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    O && y && /* @__PURE__ */ d.jsxs(cn, { severity: "warning", children: [
      /* @__PURE__ */ d.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ d.jsx(
        Qe,
        {
          variant: "secondary",
          disabled: !!M,
          onClick: async () => {
            try {
              const V = await Rb(n.deploymentId, y.runId);
              c(V.runId), m(/* @__PURE__ */ new Map()), b(null), s("running"), S.current?.(), S.current = ey(
                n.deploymentId,
                V.runId,
                (P) => Ky(P, m, s, b, n.deploymentId, V.runId),
                () => s("error")
              );
            } catch (V) {
              p(Wf(V)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    T.length > 0 && /* @__PURE__ */ d.jsxs("table", { className: YC, children: [
      /* @__PURE__ */ d.jsx("thead", { children: /* @__PURE__ */ d.jsxs("tr", { children: [
        /* @__PURE__ */ d.jsx("th", { className: Xa, children: "#" }),
        /* @__PURE__ */ d.jsx("th", { className: Xa, children: "Status" }),
        /* @__PURE__ */ d.jsx("th", { className: Xa, children: "Duration" }),
        /* @__PURE__ */ d.jsx("th", { className: Xa, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ d.jsx("tbody", { children: T.map((V) => /* @__PURE__ */ d.jsxs("tr", { className: FC, children: [
        /* @__PURE__ */ d.jsx("td", { className: Xa, children: V.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ d.jsx("td", { className: Xa, children: /* @__PURE__ */ d.jsx(el, { tone: oR(V.status), children: V.status }) }),
        /* @__PURE__ */ d.jsx("td", { className: Xa, children: V.durationMs ? `${V.durationMs} ms` : "—" }),
        /* @__PURE__ */ d.jsx("td", { className: Xa, children: V.failureCategory ?? "" })
      ] }, V.globalIndex)) })
    ] })
  ] });
}
async function Ky(n, a, i, s, o, c) {
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
        const h = await rh(o, c);
        s(h);
      } catch {
      }
      return;
  }
}
function oR(n) {
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
function uR(n) {
  switch (n) {
    case "ok":
      return "success";
    case "warn":
      return "warning";
    case "fail":
      return "danger";
  }
}
function cR(n) {
  switch (n) {
    case "ok":
      return "ok";
    case "warn":
      return "warn";
    case "fail":
      return "stop";
  }
}
function Wf(n) {
  return n instanceof Oi || n instanceof Error ? n.message : "unknown error";
}
const Qy = [
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
function fR(n) {
  const a = zi(), i = x.useRef(null), { tokens: s, attributions: o, unresolved: c, predictedFilenames: h, characterColor: m } = x.useMemo(
    () => hR(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  ), v = (p) => {
    const y = i.current;
    y && (y.scrollTop = p.currentTarget.scrollTop, y.scrollLeft = p.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: BC, children: [
      /* @__PURE__ */ d.jsx("div", { ref: i, className: kC, "aria-hidden": "true", children: s.map((p, y) => dR(p, y, m)) }),
      /* @__PURE__ */ d.jsx(
        "textarea",
        {
          className: qC,
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
    c.length > 0 && /* @__PURE__ */ d.jsxs(cn, { severity: "error", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      c.map((p) => /* @__PURE__ */ d.jsxs(
        Qe,
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
      /* @__PURE__ */ d.jsx("span", { className: on, children: "Parsed lines" }),
      /* @__PURE__ */ d.jsx("ul", { className: fy, children: o.map((p) => /* @__PURE__ */ d.jsxs("li", { children: [
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
      /* @__PURE__ */ d.jsx("span", { className: on, children: "Predicted filenames" }),
      /* @__PURE__ */ d.jsx("ul", { className: fy, children: h.map((p) => /* @__PURE__ */ d.jsx("li", { children: p }, p)) })
    ] })
  ] });
}
function dR(n, a, i) {
  if (n.kind === "blank")
    return /* @__PURE__ */ d.jsxs("span", { children: [
      n.raw,
      `
`
    ] }, a);
  if (n.kind === "narrator")
    return /* @__PURE__ */ d.jsxs("span", { children: [
      /* @__PURE__ */ d.jsx("span", { className: cy, children: n.raw }),
      `
`
    ] }, a);
  const s = i.get(n.character?.toLowerCase() ?? "") ?? "currentColor", o = n.hasMapping ? uy : `${uy} ${HC}`;
  return /* @__PURE__ */ d.jsxs("span", { children: [
    /* @__PURE__ */ d.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      n.character,
      n.override && /* @__PURE__ */ d.jsxs("span", { className: $C, children: [
        "|",
        n.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: cy, children: [
      " ",
      n.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function hR(n, a, i) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = [], h = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), v = [], p = /* @__PURE__ */ new Map();
  let y = 0;
  const b = n.split(/\r?\n/);
  let S = 0;
  return b.forEach((w, j) => {
    const T = w.trim();
    if (!T) {
      o.push({ kind: "blank", raw: w });
      return;
    }
    const R = j + 1, O = T.match(s);
    let D = "Narrator", z = T, k, J = !1;
    if (O?.groups) {
      J = !0;
      const V = (O.groups.body ?? "").trim(), P = (O.groups.rest ?? "").trim();
      D = ((V.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", k = (V.includes("|") ? V.slice(V.indexOf("|") + 1) : "").trim() || void 0, z = P;
    }
    S += 1;
    const I = D.toLowerCase(), W = (m.get(I) ?? 0) + 1;
    m.set(I, W);
    const M = D === "Narrator" || i.has(I);
    if (M || h.add(D), D !== "Narrator" && !p.has(I) && (p.set(I, Qy[y % Qy.length] ?? "currentColor"), y += 1), J) {
      const V = { kind: "character", raw: w, character: D, text: z, hasMapping: M };
      k !== void 0 && (V.override = k), o.push(V);
    } else
      o.push({ kind: "narrator", raw: w });
    c.push({ lineNumber: R, character: D, text: z, hasMapping: M }), v.push(
      `${S.toString().padStart(3, "0")}_${mR(D)}_${W.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: c,
    unresolved: Array.from(h),
    predictedFilenames: v,
    characterColor: p
  };
}
function mR(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const ed = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], pR = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function vR(n) {
  const a = [];
  if (!n) return a;
  const i = n.split(/\r?\n/);
  for (let s = 0; s < i.length; s += 1) {
    const c = (i[s] ?? "").trim();
    if (c.length === 0) continue;
    const h = c.match(pR);
    if (!h || !h.groups) {
      a.push({ idx: s, character: null, text: c, override: null });
      continue;
    }
    const m = h.groups.body ?? "", v = (h.groups.rest ?? "").trim(), [p = "", ...y] = m.split("|"), b = p.trim();
    if (!b) {
      a.push({ idx: s, character: null, text: v || c, override: null });
      continue;
    }
    const S = b.split(":")[0]?.trim() || null, w = y.join("|").trim(), j = w ? gR(w) : null;
    a.push({
      idx: s,
      character: S,
      text: v,
      override: j
    });
  }
  return a;
}
function gR(n) {
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
function yR(n) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const s of n) {
    if (!s.character) continue;
    const o = s.character.toLowerCase();
    a.has(o) || (a.add(o), i.push(s.character));
  }
  return i;
}
function bR(n) {
  const a = {};
  for (let i = 0; i < n.length; i += 1) {
    const s = n[i];
    s && (a[s] = ed[i % ed.length] ?? ed[0]);
  }
  return a;
}
function xR(n) {
  const a = {};
  for (const i of n)
    i.character && (a[i.character] = (a[i.character] ?? 0) + 1);
  return a;
}
function SR(n) {
  const a = n.workflowCustomised ?? !1, i = n.unmappableFields ?? [];
  return /* @__PURE__ */ d.jsxs("div", { className: TC, children: [
    /* @__PURE__ */ d.jsxs("header", { className: CC, children: [
      /* @__PURE__ */ d.jsx("div", { className: NC, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ d.jsx("div", { className: MC, children: /* @__PURE__ */ d.jsx("h1", { className: AC, children: n.deployment.displayName }) }),
      /* @__PURE__ */ d.jsx("p", { className: RC, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      n.hero
    ] }),
    a && /* @__PURE__ */ d.jsxs(cn, { severity: "warning", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Workflow customised." }),
      " ",
      i.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${i.join(", ")}.`,
      " ",
      /* @__PURE__ */ d.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: _C, children: [
      /* @__PURE__ */ d.jsx(
        Si,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: n.scriptSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        Si,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: n.parsedDialogueSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        Si,
        {
          number: "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: n.castSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        Si,
        {
          number: "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: n.emotionSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        Si,
        {
          number: "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: n.performanceSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        Si,
        {
          number: "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: n.recentRunsSection
        }
      )
    ] })
  ] });
}
function Si({ number: n, title: a, id: i, variant: s, children: o }) {
  return /* @__PURE__ */ d.jsxs("section", { className: DC, "aria-labelledby": i, children: [
    /* @__PURE__ */ d.jsx("header", { className: zC, children: /* @__PURE__ */ d.jsxs("div", { children: [
      /* @__PURE__ */ d.jsxs("div", { className: OC, children: [
        n,
        " / ",
        a
      ] }),
      /* @__PURE__ */ d.jsx("h2", { id: i, className: LC, children: a })
    ] }) }),
    /* @__PURE__ */ d.jsx("div", { className: s === "split" ? VC : UC, children: o })
  ] });
}
const Ei = {
  success(n) {
    if (typeof window < "u") {
      const a = new CustomEvent("emotion-tts:toast", { detail: { kind: "success", message: n } });
      window.dispatchEvent(a);
    }
  },
  error(n) {
    if (typeof window < "u") {
      const a = new CustomEvent("emotion-tts:toast", { detail: { kind: "error", message: n } });
      window.dispatchEvent(a);
    }
    typeof console < "u" && console.warn("[emotion-tts]", n);
  }
};
function ER() {
  const { deployment: n, mappings: a, runs: i, workflow: s } = as(), [o, c] = x.useState(a), [h, m] = x.useState([]), [v, p] = x.useState([]), [y, b] = x.useState(null), [S, w] = x.useState(hu), [j, T] = x.useState(""), [R, O] = x.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [D, z] = x.useState(n.defaultSpeedFactor ?? 1), [k, J] = x.useState({
    mode: "none",
    emotionAlpha: 1
  }), [I, W] = x.useState({}), [M, V] = x.useState("use_cache"), [P, oe] = x.useState(n.defaultVoiceAssetId != null), [ue, Ee] = x.useState(_A);
  x.useEffect(() => {
    let se = !1;
    return Kr(n.deploymentId).then((_e) => {
      se || m(_e.voiceAssets);
    }).catch(() => {
    }), Db(n.deploymentId).then((_e) => {
      se || p(_e.presets);
    }).catch(() => {
    }), () => {
      se = !0;
    };
  }, [n.deploymentId]);
  const we = x.useMemo(() => vR(j), [j]), re = x.useMemo(() => yR(we), [we]), q = x.useMemo(() => bR(re), [re]), B = x.useMemo(() => xR(we), [we]), Y = x.useMemo(() => {
    const se = /* @__PURE__ */ new Map();
    for (const _e of o)
      se.set(_e.characterName.toLowerCase(), _e);
    return se;
  }, [o]), Q = x.useMemo(() => P ? 0 : re.filter((se) => !Y.has(se.toLowerCase())).length, [re, Y, P]), ne = x.useCallback(
    async (se, _e) => {
      const Ne = Y.get(se.toLowerCase());
      try {
        if (Ne) {
          const Fe = await bd(n.deploymentId, Ne.mappingId, _e);
          c(
            (Lt) => Lt.map((Gt) => Gt.mappingId === Fe.mappingId ? Fe : Gt)
          ), Ei.success(`Updated mapping for ${se}`);
        } else if (_e.speakerVoiceAssetId) {
          const Fe = await ih(n.deploymentId, {
            ..._e,
            characterName: se,
            speakerVoiceAssetId: _e.speakerVoiceAssetId
          });
          c((Lt) => [...Lt, Fe]), Ei.success(`Mapped ${se} to voice`);
        }
      } catch (Fe) {
        Ei.error(Fe instanceof Error ? Fe.message : "mapping failed");
      }
    },
    [Y, n.deploymentId]
  ), C = x.useCallback(
    async (se) => {
      const _e = Y.get(se.toLowerCase());
      if (_e)
        try {
          await Ab(n.deploymentId, _e.mappingId), c((Ne) => Ne.filter((Fe) => Fe.mappingId !== _e.mappingId)), Ei.success(`Cleared mapping for ${se}`);
        } catch (Ne) {
          Ei.error(Ne instanceof Error ? Ne.message : "clear failed");
        }
    },
    [Y, n.deploymentId]
  ), K = x.useCallback(
    async (se, _e) => {
      try {
        const Ne = await _b(
          n.deploymentId,
          _e,
          _e.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((Fe) => [Ne, ...Fe]), await ne(se, { speakerVoiceAssetId: Ne.voiceAssetId });
      } catch (Ne) {
        Ei.error(Ne instanceof Error ? Ne.message : "upload failed");
      }
    },
    [n.deploymentId, ne]
  ), le = x.useCallback(
    (se) => {
      w(se), hM({ version: 1, ops: [] }, se);
    },
    []
  ), ce = x.useMemo(
    () => ({
      script: j,
      parserMode: P ? "raw_text" : "dialogue",
      outputFormat: R,
      speedFactor: ue.pace,
      globalEmotion: { ...k, emotionAlpha: ue.intensity },
      generation: I,
      cachePolicy: M
    }),
    [j, P, R, ue.pace, ue.intensity, k, I, M]
  ), xe = x.useMemo(
    () => TR({
      script: j,
      quickMode: P,
      defaultVoiceAssetId: n.defaultVoiceAssetId,
      characters: re,
      unmappedCount: Q,
      globalEmotion: k,
      performance: ue
    }),
    [j, P, n.defaultVoiceAssetId, re, Q, k, ue]
  ), Ce = x.useMemo(
    () => xe.filter((se) => se.id !== "performance").map((se) => ({
      label: se.label,
      status: se.status === "ok" ? "ok" : se.status === "warn" ? "warn" : "fail",
      detail: se.detail
    })),
    [xe]
  );
  return /* @__PURE__ */ d.jsx(
    SR,
    {
      deployment: n,
      workflowCustomised: s.workflow.customised,
      unmappableFields: s.unmappableFields,
      hero: /* @__PURE__ */ d.jsx(JC, { deployment: n }),
      scriptSection: /* @__PURE__ */ d.jsx(
        wR,
        {
          quickMode: P,
          onToggleQuickMode: oe,
          deployment: n,
          script: j,
          onScriptChange: T,
          outputFormat: R,
          mappingsByLower: Y
        }
      ),
      parsedDialogueSection: /* @__PURE__ */ d.jsx(EA, { lines: we, characterColors: q }),
      castSection: /* @__PURE__ */ d.jsx(gC, { unmappedCount: Q, totalCount: re.length, children: re.map((se) => {
        const _e = Y.get(se.toLowerCase()) ?? null, Ne = q[se] ?? "#ba9eff";
        return /* @__PURE__ */ d.jsx("li", { style: { listStyle: "none" }, children: /* @__PURE__ */ d.jsx(
          vC,
          {
            characterName: se,
            color: Ne,
            lineCount: B[se] ?? 0,
            mapping: _e,
            voiceAssets: h,
            presets: v,
            active: y === se,
            onToggle: () => b((Fe) => Fe === se ? null : se),
            onAssignVoiceAsset: (Fe) => ne(se, { speakerVoiceAssetId: Fe }),
            onAssignPreset: (Fe) => ne(se, { defaultVectorPresetId: Fe }),
            onUploadFile: (Fe) => K(se, Fe),
            onClearMapping: () => C(se)
          }
        ) }, se);
      }) }),
      emotionSection: /* @__PURE__ */ d.jsx(
        uA,
        {
          value: k,
          onChange: J,
          deploymentId: n.deploymentId
        }
      ),
      performanceSection: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx(DA, { value: ue, onChange: Ee }),
        /* @__PURE__ */ d.jsx(
          uh,
          {
            state: S,
            onChange: le,
            supportsSynthSpeed: !1
          }
        ),
        /* @__PURE__ */ d.jsx(YA, { checks: xe }),
        /* @__PURE__ */ d.jsx(
          dA,
          {
            outputFormat: R,
            onOutputFormatChange: O,
            speedFactor: D,
            onSpeedFactorChange: z,
            cachePolicy: M,
            onCachePolicyChange: V,
            generation: I,
            onGenerationChange: W
          }
        ),
        /* @__PURE__ */ d.jsx(
          sR,
          {
            deploymentId: n.deploymentId,
            createPayload: ce,
            canGenerate: j.trim().length > 0,
            diagnostics: Ce
          }
        )
      ] }),
      recentRunsSection: /* @__PURE__ */ d.jsx(iR, { runs: i, deploymentId: n.deploymentId })
    }
  );
}
function wR({
  quickMode: n,
  onToggleQuickMode: a,
  deployment: i,
  script: s,
  onScriptChange: o,
  outputFormat: c,
  mappingsByLower: h
}) {
  const m = s.length, v = s.trim() ? s.trim().split(/\s+/).length : 0, p = s.trim() ? s.trim().split(/\r?\n/).filter((y) => y.trim()).length : 0;
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
                onChange: (y) => a(y.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          n && /* @__PURE__ */ d.jsx(
            PA,
            {
              deploymentId: i.deploymentId,
              initialVoiceAssetId: i.defaultVoiceAssetId ?? null
            }
          ),
          /* @__PURE__ */ d.jsxs(
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
                /* @__PURE__ */ d.jsxs("span", { children: [
                  /* @__PURE__ */ d.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: m.toString().padStart(3, "0") }),
                  " ",
                  "chars"
                ] }),
                /* @__PURE__ */ d.jsxs("span", { children: [
                  /* @__PURE__ */ d.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: p.toString().padStart(2, "0") }),
                  " ",
                  "lines"
                ] }),
                /* @__PURE__ */ d.jsxs("span", { children: [
                  /* @__PURE__ */ d.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: v.toString().padStart(3, "0") }),
                  " ",
                  "words"
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ d.jsx(
      fR,
      {
        value: s,
        onChange: o,
        outputFormat: c,
        mappings: h,
        deploymentId: i.deploymentId
      }
    ),
    /* @__PURE__ */ d.jsx(jR, {})
  ] });
}
function jR() {
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
function TR({
  script: n,
  quickMode: a,
  defaultVoiceAssetId: i,
  characters: s,
  unmappedCount: o,
  globalEmotion: c,
  performance: h
}) {
  const m = [], v = n.trim();
  if (!v)
    m.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const p = v.split(/\r?\n/).filter((y) => y.trim()).length;
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
  }), c.mode === "qwen_template" && !c.qwenTemplate?.trim())
    m.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (c.mode === "emotion_vector") {
    const p = c.vector, y = Array.isArray(p) && p.some((b) => Math.abs(b) > 0.01);
    m.push({
      id: "emotion",
      status: y ? "ok" : "info",
      label: "Emotion",
      detail: y ? "8-axis vector" : "neutral vector"
    });
  } else c.mode === "audio_ref" ? m.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : m.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return m.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(h.intensity * 100)}% · pace ${h.pace.toFixed(2)}× · pitch ${h.pitchSt >= 0 ? "+" : ""}${h.pitchSt.toFixed(1)}st`
  }), m;
}
const Zy = /* @__PURE__ */ new Map();
function CR(n, a) {
  const [i, s] = x.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return x.useEffect(() => {
    if (!n || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${n}::${a}`, c = Zy.get(o);
    if (c) {
      s({ peaks: c, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), MR(n, a, h.signal).then((m) => {
      h.signal.aborted || (Zy.set(o, m), s({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (h.signal.aborted) return;
      const v = m instanceof Error ? m.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: v });
    }), () => h.abort();
  }, [n, a]), i;
}
async function MR(n, a, i) {
  const s = await fetch(n, { signal: i });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (i.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return NR(h, a);
}
function NR(n, a) {
  const i = n.numberOfChannels, s = n.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), h = [];
  for (let m = 0; m < i; m += 1) h.push(n.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const v = m * o, p = Math.min(s, v + o);
    let y = 0;
    for (let b = v; b < p; b += 1) {
      let S = 0;
      for (let j = 0; j < i; j += 1) {
        const T = h[j];
        T && (S += Math.abs(T[b] ?? 0));
      }
      const w = S / i;
      w > y && (y = w);
    }
    c[m] = y;
  }
  return c;
}
const Py = "(prefers-reduced-motion: reduce)";
function AR() {
  const [n, a] = x.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Py).matches);
  return x.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(Py), s = (o) => a(o.matches);
    return i.addEventListener("change", s), () => i.removeEventListener("change", s);
  }, []), n;
}
var RR = "mquzal0", _R = "mquzal1", Jy = "mquzal2", Wy = "mquzal3", e0 = "mquzal4", DR = "mquzal5", t0 = "mquzal6", n0 = "mquzal7";
const zR = 120, OR = 720;
function nx(n) {
  const {
    audioUrl: a,
    durationMs: i,
    startMs: s,
    endMs: o,
    onChangeStart: c,
    onChangeEnd: h,
    isPlaying: m = !1,
    playbackPositionMs: v = 0,
    onSeek: p,
    width: y = OR,
    height: b = zR
  } = n, S = x.useRef(null), w = x.useRef(null), j = x.useRef(null), T = CR(a, y), R = AR();
  x.useEffect(() => {
    LR(S.current, T.peaks, y, b);
  }, [T.peaks, y, b]);
  const O = x.useCallback(
    (M) => {
      const V = w.current?.getBoundingClientRect();
      if (!V || V.width <= 0) return 0;
      const P = Math.max(0, Math.min(1, (M - V.left) / V.width));
      return Math.round(P * i);
    },
    [i]
  );
  x.useEffect(() => {
    const M = (P) => {
      if (!j.current) return;
      const oe = O(P.clientX);
      j.current === "start" ? c(zo(oe, 0, o - 1)) : h(zo(oe, s + 1, i));
    }, V = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", M), window.addEventListener("pointerup", V), () => {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", V);
    };
  }, [O, i, o, s, c, h]);
  const D = (M) => (V) => {
    V.preventDefault(), V.stopPropagation(), j.current = M;
  }, z = (M) => {
    !p || M.target.closest("[data-handle]") || p(O(M.clientX));
  }, k = (M) => (V) => {
    const P = V.shiftKey ? 100 : V.ctrlKey ? 1 : 10;
    let oe = 0;
    if (V.key === "ArrowLeft") oe = -P;
    else if (V.key === "ArrowRight") oe = P;
    else return;
    V.preventDefault(), M === "start" ? c(zo(s + oe, 0, o - 1)) : h(zo(o + oe, s + 1, i));
  }, J = td(s, i), I = td(o, i), W = td(v, i);
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: w,
      className: RR,
      style: { height: b },
      onPointerDown: z,
      children: [
        /* @__PURE__ */ d.jsx(
          "canvas",
          {
            ref: S,
            width: y,
            height: b,
            className: _R,
            "aria-label": "Audio waveform"
          }
        ),
        T.isLoading && /* @__PURE__ */ d.jsx("div", { className: n0, children: "Decoding waveform…" }),
        T.error && /* @__PURE__ */ d.jsx("div", { className: n0, role: "alert", children: T.error }),
        /* @__PURE__ */ d.jsx("div", { className: t0, style: { left: 0, width: `${J}%` } }),
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: t0,
            style: { left: `${I}%`, right: 0, width: `${100 - I}%` }
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: Jy,
            style: { left: `${J}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: D("start"),
            onKeyDown: k("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: Wy, "aria-hidden": "true" }),
              /* @__PURE__ */ d.jsx("span", { className: e0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: Jy,
            style: { left: `${I}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: D("end"),
            onKeyDown: k("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: Wy, "aria-hidden": "true" }),
              /* @__PURE__ */ d.jsx("span", { className: e0, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: DR,
            style: {
              left: `${W}%`,
              transition: R ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function td(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function zo(n, a, i) {
  return Math.max(a, Math.min(i, n));
}
function LR(n, a, i, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, i, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = UR(n, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, i);
  for (let m = 0; m < h; m += 1) {
    const v = a[m] ?? 0, p = Math.max(1, v * (s - 4));
    o.fillRect(m, c - p / 2, 1, p);
  }
}
function UR(n, a, i) {
  return getComputedStyle(n).getPropertyValue(a).trim() || i;
}
var VR = "r8lfsm0", BR = "r8lfsm1", kR = "r8lfsm2", a0 = "r8lfsm3", qR = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, HR = "_1b1zchy3", $R = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, YR = "_1b1zchy6", FR = "_1b1zchy7";
const ax = x.createContext("standalone");
function lx({
  variant: n = "standalone",
  children: a,
  className: i,
  style: s,
  ...o
}) {
  const c = [qR[n], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(ax.Provider, { value: n, children: /* @__PURE__ */ d.jsx("div", { className: c, style: s, ...o, children: a }) });
}
function ix({
  title: n,
  meta: a,
  children: i,
  className: s,
  titleId: o
}) {
  const c = x.useContext(ax), h = [HR, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsxs("div", { className: h, children: [
    /* @__PURE__ */ d.jsx("h3", { id: o, className: $R[c], children: n }),
    a ? /* @__PURE__ */ d.jsx("span", { className: YR, children: a }) : null,
    i
  ] });
}
function rx({
  children: n,
  className: a,
  role: i = "group"
}) {
  const s = [FR, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("div", { className: s, role: i, children: n });
}
const l0 = -16, GR = 80, XR = 720;
function IR(n) {
  const { deploymentId: a, runId: i, utterance: s, audioUrl: o, onApplied: c, onError: h, onCancel: m } = n, v = s.durationMs ?? 0, [p, y] = x.useState(() => i0(v)), [b, S] = x.useState(hu), [w, j] = x.useState(!1), [T, R] = x.useState(!1), [O, D] = x.useState(null), [z, k] = x.useState(!1), J = x.useRef(null), I = x.useRef(null), W = x.useRef(null);
  x.useEffect(() => {
    const Y = i0(v);
    y(Y), S(Kb(Y)), R(!1), D(null), W.current = null;
  }, [s.utteranceId, v]);
  const M = x.useCallback((Y) => {
    S(Y), y((Q) => Ib(Q, Y));
  }, []);
  x.useEffect(() => () => I.current?.abort(), []), x.useEffect(() => {
    J.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const V = x.useCallback(
    (Y) => {
      Y.key === "Escape" && (Y.stopPropagation(), m());
    },
    [m]
  ), P = x.useMemo(
    () => p.ops.find((Y) => Y.mode === "trim"),
    [p.ops]
  ), oe = P?.start_ms ?? 0, ue = P?.end_ms ?? Math.max(1, v), Ee = x.useCallback((Y, Q) => {
    y((ne) => KR(ne, "trim", (C) => ({
      ...C,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(Y)),
      end_ms: Math.max(Math.floor(Y) + 1, Math.floor(Q))
    })));
  }, []), we = x.useCallback((Y) => Ee(Y, ue), [ue, Ee]), re = x.useCallback((Y) => Ee(oe, Y), [oe, Ee]), q = x.useCallback((Y) => {
    R(Y), y((Q) => {
      const ne = Q.ops.filter((C) => C.mode !== "normalize");
      if (Y) {
        const C = {
          id: Jt(),
          mode: "normalize",
          target_lufs: l0
        };
        return { ...Q, ops: [...ne, C] };
      }
      return { ...Q, ops: ne };
    });
  }, []), B = x.useCallback(async () => {
    const Y = kb(p, v);
    if (Y) {
      D(Y.message);
      return;
    }
    if (D(null), z) return;
    I.current?.abort();
    const Q = new AbortController();
    I.current = Q, k(!0);
    try {
      const ne = W.current ?? void 0, C = await nM(
        a,
        i,
        s.utteranceId,
        ne ? { chain: p, digest_before: ne } : { chain: p },
        { signal: Q.signal }
      );
      if (Q.signal.aborted) return;
      W.current = C.chain_digest, c(C);
    } catch (ne) {
      if (Q.signal.aborted) return;
      ne instanceof Ri && (W.current = ne.currentDigest || null);
      const C = ne instanceof Ri ? "Edit chain has changed in another tab. Reload to continue." : ne instanceof Error ? ne.message : "apply failed";
      D(C), h(C);
    } finally {
      Q.signal.aborted || k(!1);
    }
  }, [p, v, z, a, i, s.utteranceId, c, h]);
  return /* @__PURE__ */ d.jsx(lx, { variant: "nested", children: /* @__PURE__ */ d.jsxs("div", { ref: J, onKeyDown: V, children: [
    /* @__PURE__ */ d.jsx(ix, { title: "Edit segment", meta: `Source · ${Oo(v)}` }),
    /* @__PURE__ */ d.jsx(
      nx,
      {
        audioUrl: o,
        durationMs: Math.max(1, v),
        startMs: oe,
        endMs: ue,
        onChangeStart: we,
        onChangeEnd: re,
        height: GR,
        width: XR
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: VR, children: [
      /* @__PURE__ */ d.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ d.jsxs("span", { className: BR, children: [
        Oo(oe),
        " → ",
        Oo(ue),
        " · ",
        Oo(ue - oe)
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: kR, children: [
      /* @__PURE__ */ d.jsxs("label", { className: a0, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: T,
            onChange: (Y) => q(Y.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { children: [
          "Normalize to ",
          l0.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(
        "button",
        {
          type: "button",
          className: a0,
          onClick: () => j((Y) => !Y),
          style: {
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
            textAlign: "left",
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em"
          },
          "aria-expanded": w,
          children: [
            w ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    w && /* @__PURE__ */ d.jsx(
      uh,
      {
        state: b,
        onChange: M,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ d.jsxs(rx, { children: [
      /* @__PURE__ */ d.jsx(Qe, { size: "sm", onClick: () => void B(), disabled: z, children: z ? "Applying…" : "Apply" }),
      /* @__PURE__ */ d.jsx(Qe, { variant: "ghost", size: "sm", onClick: m, disabled: z, children: "Cancel" })
    ] }),
    O && /* @__PURE__ */ d.jsx(cn, { severity: "error", children: O })
  ] }) });
}
function i0(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Jt(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function KR(n, a, i) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Jt(), mode: a };
    return { ...n, ops: [...n.ops, i(c)] };
  }
  const o = [...n.ops];
  return o[s] = i(o[s]), { ...n, ops: o };
}
function Oo(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
var QR = "jq2zyb2", ZR = "jq2zyb3", PR = "jq2zyb4", JR = "jq2zyb5", WR = "jq2zyb6", e2 = "jq2zyb7", t2 = "jq2zyb8", n2 = "jq2zyb9", a2 = "jq2zyba", l2 = "jq2zybb", i2 = "jq2zybc", r2 = "jq2zybd", s2 = "jq2zybe", o2 = "jq2zybf jq2zybe", u2 = "jq2zybg", c2 = "jq2zybh", f2 = "jq2zybi", d2 = "jq2zybj", h2 = "jq2zybk", m2 = "jq2zybl", p2 = "jq2zybm", v2 = "jq2zybn", g2 = "jq2zybo", y2 = "jq2zybp", b2 = "jq2zybq", x2 = "jq2zybr", S2 = "jq2zybs", E2 = "jq2zybt", w2 = "jq2zybu", j2 = "jq2zybv", T2 = "jq2zybw", C2 = "jq2zybx", M2 = "jq2zyby", N2 = "jq2zybz", r0 = "jq2zyb10", A2 = "jq2zyb11", R2 = "jq2zyb12", _2 = "jq2zyb13", D2 = "jq2zyb14";
const z2 = ["cancelled", "failed", "partial"], O2 = 2600;
function L2() {
  const { run: n } = as(), a = zi(), [i, s] = x.useState(n), [o, c] = x.useState(!1), [h, m] = x.useState(null), [v, p] = x.useState(null), [y, b] = x.useState(
    null
  );
  x.useEffect(() => {
    s(n);
  }, [n]), x.useEffect(() => {
    if (!y) return;
    const k = setTimeout(() => b(null), O2);
    return () => clearTimeout(k);
  }, [y]);
  const S = x.useMemo(() => B2(i), [i]), w = z2.includes(i.status) && i.kind === "batch", j = (i.exportZipStaleAt ?? null) !== null, T = async () => {
    if (i.deploymentId) {
      c(!0), m(null);
      try {
        const { runId: k } = await Rb(i.deploymentId, i.runId);
        a(`/${i.deploymentId}/runs/${k}`);
      } catch (k) {
        m(H2(k));
      } finally {
        c(!1);
      }
    }
  }, R = x.useCallback((k) => {
    p((J) => J === k ? null : k);
  }, []), O = x.useCallback(() => {
    p(null);
  }, []), D = (k, J) => {
    s((I) => V2(I, k, J)), p(null), b({ message: "Segment edited", severity: "success" });
  }, z = x.useCallback((k) => {
    b({ message: k, severity: "error" });
  }, []);
  return /* @__PURE__ */ d.jsxs("main", { className: QR, children: [
    /* @__PURE__ */ d.jsxs("div", { className: ZR, children: [
      /* @__PURE__ */ d.jsxs("header", { className: PR, children: [
        /* @__PURE__ */ d.jsxs("p", { className: JR, children: [
          i.deploymentId ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            /* @__PURE__ */ d.jsx(fu, { to: `/${i.deploymentId}/recipe`, className: WR, children: "← Back to recipe" }),
            /* @__PURE__ */ d.jsx("span", { className: e2, children: "·" })
          ] }) : null,
          /* @__PURE__ */ d.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: t2, children: [
          /* @__PURE__ */ d.jsxs("h1", { className: n2, children: [
            k2(i.kind),
            /* @__PURE__ */ d.jsx("span", { className: a2, children: i.runId })
          ] }),
          /* @__PURE__ */ d.jsx(el, { size: "md", tone: $2(i.status), pulse: i.status === "running", children: i.status })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("section", { className: l2, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ d.jsx(Lo, { label: "Format", value: i.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ d.jsx(Lo, { label: "Speed", value: `${i.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ d.jsx(
          Lo,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ d.jsx(
          Lo,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      w && /* @__PURE__ */ d.jsxs("section", { className: c2, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ d.jsxs("div", { className: f2, children: [
          /* @__PURE__ */ d.jsx("h2", { id: "run-detail-resume-title", className: d2, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ d.jsx("p", { className: h2, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ d.jsx(Qe, { size: "lg", disabled: o, onClick: () => void T(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ d.jsx("p", { className: m2, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ d.jsxs(ha, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ d.jsxs(OT, { children: [
          /* @__PURE__ */ d.jsx("h2", { id: "run-detail-utterances", className: _l, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ d.jsxs("span", { className: p2, children: [
            /* @__PURE__ */ d.jsx("span", { className: v2, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("ul", { className: g2, children: i.utterances.map((k) => {
          const J = v === k.utteranceId, I = k.status === "completed" && k.audioArtifactRef !== null && k.audioArtifactRef !== void 0, W = k.derivedArtifactRef ?? k.audioArtifactRef ?? null, M = W ? `/api/v1/artifacts/${encodeURIComponent(W)}/download` : "", V = (k.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ d.jsxs("li", { className: b2, children: [
            /* @__PURE__ */ d.jsxs("div", { className: y2, children: [
              /* @__PURE__ */ d.jsxs("span", { className: E2, children: [
                "#",
                k.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ d.jsx("span", { className: w2, title: k.characterDisplay, children: k.characterDisplay }),
              /* @__PURE__ */ d.jsx("span", { className: j2, title: k.text, children: k.text }),
              /* @__PURE__ */ d.jsxs("span", { className: T2, children: [
                k.cacheHit && /* @__PURE__ */ d.jsx("span", { className: C2, children: "cached" }),
                V && /* @__PURE__ */ d.jsx("span", { className: x2, children: "edited" }),
                k.durationMs ? /* @__PURE__ */ d.jsx("span", { children: q2(k.durationMs) }) : null,
                /* @__PURE__ */ d.jsx(el, { tone: Y2(k.status), children: k.status }),
                I && /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    className: S2,
                    onClick: () => R(k.utteranceId),
                    "aria-expanded": J,
                    "aria-label": J ? "Close segment editor" : "Edit segment",
                    children: J ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            J && M && i.deploymentId && /* @__PURE__ */ d.jsx(
              IR,
              {
                deploymentId: i.deploymentId,
                runId: i.runId,
                utterance: k,
                audioUrl: M,
                onApplied: (P) => D(k.utteranceId, P),
                onError: z,
                onCancel: O
              }
            )
          ] }, k.utteranceId);
        }) })
      ] }),
      U2(i, j)
    ] }),
    y && /* @__PURE__ */ d.jsx(
      "div",
      {
        className: D2,
        role: y.severity === "error" ? "alert" : "status",
        "aria-live": y.severity === "error" ? "assertive" : "polite",
        children: y.message
      }
    )
  ] });
}
function U2(n, a) {
  if (!n.exportArtifactRef && !a) return null;
  const s = !!n.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ d.jsx("div", { className: M2, children: a ? /* @__PURE__ */ d.jsxs("div", { className: A2, children: [
    /* @__PURE__ */ d.jsx("p", { className: R2, children: s }),
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: _2,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ d.jsx("span", { className: r0, children: "↻" })
        ]
      }
    )
  ] }) : n.exportArtifactRef ? /* @__PURE__ */ d.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
      download: !0,
      className: N2,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ d.jsx("span", { className: r0, children: "↓" })
      ]
    }
  ) : null });
}
function V2(n, a, i) {
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
function Lo({ label: n, value: a, mono: i, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: i2,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ d.jsx("span", { className: r2, children: n }),
        /* @__PURE__ */ d.jsx("span", { className: i ? o2 : s2, children: a }),
        o !== void 0 && /* @__PURE__ */ d.jsx("span", { className: u2, "aria-hidden": "true" })
      ]
    }
  );
}
function B2(n) {
  const a = n.utterances.length, i = n.utterances.filter((h) => h.status === "completed").length, s = n.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = n.utterances.filter((h) => h.cacheHit).length, c = i > 0 ? Math.round(o / i * 100) : 0;
  return { total: a, completed: i, failed: s, cached: o, cacheRatio: c };
}
function k2(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function q2(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function H2(n) {
  return n instanceof Oi ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function $2(n) {
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
function Y2(n) {
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
var F2 = "pcphqj2", G2 = "pcphqj3", X2 = "pcphqj4", I2 = "pcphqj5", K2 = "pcphqj6", Q2 = "pcphqj7", Z2 = "pcphqj8", P2 = "pcphqj9", J2 = "pcphqja", s0 = "pcphqjb", W2 = "pcphqjc", e_ = "pcphqjd", t_ = "pcphqje pcphqjd", n_ = "pcphqjf", a_ = "pcphqjg", l_ = "pcphqjh", i_ = "pcphqji", r_ = "pcphqjj pcphqji", s_ = "pcphqjk pcphqji", o_ = "pcphqjl pcphqji", u_ = "pcphqjm", nd = "pcphqjn", ad = "pcphqjo";
function c_() {
  const [n, a] = x.useState(null), [i, s] = x.useState(null);
  return x.useEffect(() => {
    let o = !1;
    const c = async () => {
      try {
        const m = await ot("/runtime/queue");
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
  }, []), /* @__PURE__ */ d.jsx("main", { className: F2, children: /* @__PURE__ */ d.jsxs("div", { className: G2, children: [
    /* @__PURE__ */ d.jsxs("header", { className: X2, children: [
      /* @__PURE__ */ d.jsx("p", { className: I2, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ d.jsxs("div", { className: K2, children: [
        /* @__PURE__ */ d.jsx("h1", { className: Q2, children: "Queue" }),
        /* @__PURE__ */ d.jsx("span", { className: Z2, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ d.jsx("p", { className: P2, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    i ? /* @__PURE__ */ d.jsx(cn, { severity: "error", children: i }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ d.jsx(ha, { density: "compact", children: /* @__PURE__ */ d.jsx(ls, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ d.jsxs(ha, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ d.jsx("h2", { id: "runtime-queue-section", className: _l, children: "01 / In flight" }),
      /* @__PURE__ */ d.jsx("ul", { className: J2, children: n.map((o) => {
        const c = o.position === 1;
        return /* @__PURE__ */ d.jsxs(
          "li",
          {
            className: c ? `${s0} ${W2}` : s0,
            children: [
              /* @__PURE__ */ d.jsx("span", { className: c ? t_ : e_, children: o.position }),
              /* @__PURE__ */ d.jsxs("span", { className: n_, children: [
                /* @__PURE__ */ d.jsx("span", { className: a_, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ d.jsx("span", { className: l_, children: o.runId })
              ] }),
              /* @__PURE__ */ d.jsx("span", { className: f_(o.kind), children: d_(o.kind) }),
              /* @__PURE__ */ d.jsx("span", { className: u_, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: nd, children: h_(o.etaSeconds) }),
                /* @__PURE__ */ d.jsx("span", { className: ad, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: nd, children: o.utteranceTotal }),
                /* @__PURE__ */ d.jsx("span", { className: ad, children: "lines" })
              ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: nd, children: "—" }),
                /* @__PURE__ */ d.jsx("span", { className: ad, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function f_(n) {
  switch (n) {
    case "batch":
      return r_;
    case "test_line":
      return s_;
    case "resume":
      return o_;
    default:
      return i_;
  }
}
function d_(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function h_(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), i = n % 60;
  return i === 0 ? `${a}m` : `${a}m ${i}s`;
}
function m_() {
  const { deploymentId: n, prefillCharacterName: a } = as(), i = zi(), [s, o] = x.useState(a), [c, h] = x.useState(""), [m, v] = x.useState("none"), [p, y] = x.useState(!1), [b, S] = x.useState(null), w = x.useRef(null);
  x.useEffect(() => {
    w.current?.scrollIntoView({ behavior: "smooth", block: "center" }), w.current?.focus();
  }, []);
  const j = async (T) => {
    T.preventDefault(), y(!0), S(null);
    try {
      await ih(n, {
        characterName: s,
        speakerVoiceAssetId: c,
        defaultEmotionMode: m
      }), i(`/${n}/recipe`);
    } catch (R) {
      S(R instanceof Error ? R.message : "failed");
    } finally {
      y(!1);
    }
  };
  return /* @__PURE__ */ d.jsxs("main", { children: [
    /* @__PURE__ */ d.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ d.jsxs("form", { onSubmit: j, children: [
      /* @__PURE__ */ d.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: w,
            value: s,
            onChange: (T) => o(T.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("label", { children: [
        "Speaker voice asset id",
        /* @__PURE__ */ d.jsx(
          "input",
          {
            value: c,
            onChange: (T) => h(T.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ d.jsxs("select", { value: m, onChange: (T) => v(T.currentTarget.value), children: [
          /* @__PURE__ */ d.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ d.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ d.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ d.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ d.jsx(Qe, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      b && /* @__PURE__ */ d.jsx(cn, { severity: "error", children: b })
    ] })
  ] });
}
const sx = x.createContext({});
function ch(n) {
  const a = x.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const p_ = typeof window < "u", ox = p_ ? x.useLayoutEffect : x.useEffect, mu = /* @__PURE__ */ x.createContext(null);
function v_(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function g_(n, a) {
  const i = n.indexOf(a);
  i > -1 && n.splice(i, 1);
}
const tl = (n, a, i) => i > a ? a : i < n ? n : i;
function o0(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let is = () => {
}, _i = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (is = (n, a, i) => {
  !n && typeof console < "u" && console.warn(o0(a, i));
}, _i = (n, a, i) => {
  if (!n)
    throw new Error(o0(a, i));
});
const nl = {}, ux = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function y_(n) {
  return typeof n == "object" && n !== null;
}
const cx = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function fx(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const Li = /* @__NO_SIDE_EFFECTS__ */ (n) => n, b_ = (n, a) => (i) => a(n(i)), pu = (...n) => n.reduce(b_), dx = /* @__NO_SIDE_EFFECTS__ */ (n, a, i) => {
  const s = a - n;
  return s === 0 ? 1 : (i - n) / s;
};
class hx {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return v_(this.subscriptions, a), () => g_(this.subscriptions, a);
  }
  notify(a, i, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, i, s);
      else
        for (let c = 0; c < o; c++) {
          const h = this.subscriptions[c];
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
const jn = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, Ln = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function mx(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const px = (n, a, i) => (((1 - 3 * i + 3 * a) * n + (3 * i - 6 * a)) * n + 3 * a) * n, x_ = 1e-7, S_ = 12;
function E_(n, a, i, s, o) {
  let c, h, m = 0;
  do
    h = a + (i - a) / 2, c = px(h, s, o) - n, c > 0 ? i = h : a = h;
  while (Math.abs(c) > x_ && ++m < S_);
  return h;
}
function rs(n, a, i, s) {
  if (n === a && i === s)
    return Li;
  const o = (c) => E_(c, 0, 1, n, i);
  return (c) => c === 0 || c === 1 ? c : px(o(c), a, s);
}
const vx = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, gx = (n) => (a) => 1 - n(1 - a), yx = /* @__PURE__ */ rs(0.33, 1.53, 0.69, 0.99), fh = /* @__PURE__ */ gx(yx), bx = /* @__PURE__ */ vx(fh), xx = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * fh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), dh = (n) => 1 - Math.sin(Math.acos(n)), w_ = gx(dh), Sx = vx(dh), j_ = /* @__PURE__ */ rs(0.42, 0, 1, 1), T_ = /* @__PURE__ */ rs(0, 0, 0.58, 1), Ex = /* @__PURE__ */ rs(0.42, 0, 0.58, 1), C_ = (n) => Array.isArray(n) && typeof n[0] != "number", wx = (n) => Array.isArray(n) && typeof n[0] == "number", u0 = {
  linear: Li,
  easeIn: j_,
  easeInOut: Ex,
  easeOut: T_,
  circIn: dh,
  circInOut: Sx,
  circOut: w_,
  backIn: fh,
  backInOut: bx,
  backOut: yx,
  anticipate: xx
}, M_ = (n) => typeof n == "string", c0 = (n) => {
  if (wx(n)) {
    _i(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, i, s, o] = n;
    return rs(a, i, s, o);
  } else if (M_(n))
    return _i(u0[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), u0[n];
  return n;
}, Uo = [
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
function N_(n, a) {
  let i = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, c = !1;
  const h = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function v(y) {
    h.has(y) && (p.schedule(y), n()), y(m);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (y, b = !1, S = !1) => {
      const j = S && o ? i : s;
      return b && h.add(y), j.add(y), y;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (y) => {
      s.delete(y), h.delete(y);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (y) => {
      if (m = y, o) {
        c = !0;
        return;
      }
      o = !0;
      const b = i;
      i = s, s = b, i.forEach(v), i.clear(), o = !1, c && (c = !1, p.process(y));
    }
  };
  return p;
}
const A_ = 40;
function jx(n, a) {
  let i = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => i = !0, h = Uo.reduce((z, k) => (z[k] = N_(c), z), {}), { setup: m, read: v, resolveKeyframes: p, preUpdate: y, update: b, preRender: S, render: w, postRender: j } = h, T = () => {
    const z = nl.useManualTiming, k = z ? o.timestamp : performance.now();
    i = !1, z || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(k - o.timestamp, A_), 1)), o.timestamp = k, o.isProcessing = !0, m.process(o), v.process(o), p.process(o), y.process(o), b.process(o), S.process(o), w.process(o), j.process(o), o.isProcessing = !1, i && a && (s = !1, n(T));
  }, R = () => {
    i = !0, s = !0, o.isProcessing || n(T);
  };
  return { schedule: Uo.reduce((z, k) => {
    const J = h[k];
    return z[k] = (I, W = !1, M = !1) => (i || R(), J.schedule(I, W, M)), z;
  }, {}), cancel: (z) => {
    for (let k = 0; k < Uo.length; k++)
      h[Uo[k]].cancel(z);
  }, state: o, steps: h };
}
const { schedule: Tn, cancel: jd, state: Jo } = /* @__PURE__ */ jx(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Li, !0);
let Xo;
function R_() {
  Xo = void 0;
}
const un = {
  now: () => (Xo === void 0 && un.set(Jo.isProcessing || nl.useManualTiming ? Jo.timestamp : performance.now()), Xo),
  set: (n) => {
    Xo = n, queueMicrotask(R_);
  }
}, Tx = (n) => (a) => typeof a == "string" && a.startsWith(n), Cx = /* @__PURE__ */ Tx("--"), __ = /* @__PURE__ */ Tx("var(--"), hh = (n) => __(n) ? D_.test(n.split("/*")[0].trim()) : !1, D_ = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function f0(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Ui = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, Pr = {
  ...Ui,
  transform: (n) => tl(0, 1, n)
}, Vo = {
  ...Ui,
  default: 1
}, Fr = (n) => Math.round(n * 1e5) / 1e5, mh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function z_(n) {
  return n == null;
}
const O_ = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, ph = (n, a) => (i) => !!(typeof i == "string" && O_.test(i) && i.startsWith(n) || a && !z_(i) && Object.prototype.hasOwnProperty.call(i, a)), Mx = (n, a, i) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, h, m] = s.match(mh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(c),
    [i]: parseFloat(h),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, L_ = (n) => tl(0, 255, n), ld = {
  ...Ui,
  transform: (n) => Math.round(L_(n))
}, Al = {
  test: /* @__PURE__ */ ph("rgb", "red"),
  parse: /* @__PURE__ */ Mx("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: i, alpha: s = 1 }) => "rgba(" + ld.transform(n) + ", " + ld.transform(a) + ", " + ld.transform(i) + ", " + Fr(Pr.transform(s)) + ")"
};
function U_(n) {
  let a = "", i = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), i = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), i = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, i += i, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(i, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Td = {
  test: /* @__PURE__ */ ph("#"),
  parse: U_,
  transform: Al.transform
}, ss = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), Ka = /* @__PURE__ */ ss("deg"), Ai = /* @__PURE__ */ ss("%"), ge = /* @__PURE__ */ ss("px"), V_ = /* @__PURE__ */ ss("vh"), B_ = /* @__PURE__ */ ss("vw"), d0 = {
  ...Ai,
  parse: (n) => Ai.parse(n) / 100,
  transform: (n) => Ai.transform(n * 100)
}, Ci = {
  test: /* @__PURE__ */ ph("hsl", "hue"),
  parse: /* @__PURE__ */ Mx("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: i, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Ai.transform(Fr(a)) + ", " + Ai.transform(Fr(i)) + ", " + Fr(Pr.transform(s)) + ")"
}, Ct = {
  test: (n) => Al.test(n) || Td.test(n) || Ci.test(n),
  parse: (n) => Al.test(n) ? Al.parse(n) : Ci.test(n) ? Ci.parse(n) : Td.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Al.transform(n) : Ci.transform(n),
  getAnimatableNone: (n) => {
    const a = Ct.parse(n);
    return a.alpha = 0, Ct.transform(a);
  }
}, k_ = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function q_(n) {
  return isNaN(n) && typeof n == "string" && (n.match(mh)?.length || 0) + (n.match(k_)?.length || 0) > 0;
}
const Nx = "number", Ax = "color", H_ = "var", $_ = "var(", h0 = "${}", Y_ = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Di(n) {
  const a = n.toString(), i = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const m = a.replace(Y_, (v) => (Ct.test(v) ? (s.color.push(c), o.push(Ax), i.push(Ct.parse(v))) : v.startsWith($_) ? (s.var.push(c), o.push(H_), i.push(v)) : (s.number.push(c), o.push(Nx), i.push(parseFloat(v))), ++c, h0)).split(h0);
  return { values: i, split: m, indexes: s, types: o };
}
function F_(n) {
  return Di(n).values;
}
function Rx({ split: n, types: a }) {
  const i = n.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < i; c++)
      if (o += n[c], s[c] !== void 0) {
        const h = a[c];
        h === Nx ? o += Fr(s[c]) : h === Ax ? o += Ct.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function G_(n) {
  return Rx(Di(n));
}
const X_ = (n) => typeof n == "number" ? 0 : Ct.test(n) ? Ct.getAnimatableNone(n) : n, I_ = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : X_(n);
function K_(n) {
  const a = Di(n);
  return Rx(a)(a.values.map((s, o) => I_(s, a.split[o])));
}
const Un = {
  test: q_,
  parse: F_,
  createTransformer: G_,
  getAnimatableNone: K_
};
function id(n, a, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? n + (a - n) * 6 * i : i < 1 / 2 ? a : i < 2 / 3 ? n + (a - n) * (2 / 3 - i) * 6 : n;
}
function Q_({ hue: n, saturation: a, lightness: i, alpha: s }) {
  n /= 360, a /= 100, i /= 100;
  let o = 0, c = 0, h = 0;
  if (!a)
    o = c = h = i;
  else {
    const m = i < 0.5 ? i * (1 + a) : i + a - i * a, v = 2 * i - m;
    o = id(v, m, n + 1 / 3), c = id(v, m, n), h = id(v, m, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(h * 255),
    alpha: s
  };
}
function Wo(n, a) {
  return (i) => i > 0 ? a : n;
}
const os = (n, a, i) => n + (a - n) * i, rd = (n, a, i) => {
  const s = n * n, o = i * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, Z_ = [Td, Al, Ci], P_ = (n) => Z_.find((a) => a.test(n));
function m0(n) {
  const a = P_(n);
  if (is(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let i = a.parse(n);
  return a === Ci && (i = Q_(i)), i;
}
const p0 = (n, a) => {
  const i = m0(n), s = m0(a);
  if (!i || !s)
    return Wo(n, a);
  const o = { ...i };
  return (c) => (o.red = rd(i.red, s.red, c), o.green = rd(i.green, s.green, c), o.blue = rd(i.blue, s.blue, c), o.alpha = os(i.alpha, s.alpha, c), Al.transform(o));
}, Cd = /* @__PURE__ */ new Set(["none", "hidden"]);
function J_(n, a) {
  return Cd.has(n) ? (i) => i <= 0 ? n : a : (i) => i >= 1 ? a : n;
}
function W_(n, a) {
  return (i) => os(n, a, i);
}
function vh(n) {
  return typeof n == "number" ? W_ : typeof n == "string" ? hh(n) ? Wo : Ct.test(n) ? p0 : n3 : Array.isArray(n) ? _x : typeof n == "object" ? Ct.test(n) ? p0 : e3 : Wo;
}
function _x(n, a) {
  const i = [...n], s = i.length, o = n.map((c, h) => vh(c)(c, a[h]));
  return (c) => {
    for (let h = 0; h < s; h++)
      i[h] = o[h](c);
    return i;
  };
}
function e3(n, a) {
  const i = { ...n, ...a }, s = {};
  for (const o in i)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = vh(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in s)
      i[c] = s[c](o);
    return i;
  };
}
function t3(n, a) {
  const i = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], h = n.indexes[c][s[c]], m = n.values[h] ?? 0;
    i[o] = m, s[c]++;
  }
  return i;
}
const n3 = (n, a) => {
  const i = Un.createTransformer(a), s = Di(n), o = Di(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Cd.has(n) && !o.values.length || Cd.has(a) && !s.values.length ? J_(n, a) : pu(_x(t3(s, o), o.values), i) : (is(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Wo(n, a));
};
function Dx(n, a, i) {
  return typeof n == "number" && typeof a == "number" && typeof i == "number" ? os(n, a, i) : vh(n)(n, a);
}
const a3 = (n) => {
  const a = ({ timestamp: i }) => n(i);
  return {
    start: (i = !0) => Tn.update(a, i),
    stop: () => jd(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Jo.isProcessing ? Jo.timestamp : un.now()
  };
}, zx = (n, a, i = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / i), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, eu = 2e4;
function gh(n) {
  let a = 0;
  const i = 50;
  let s = n.next(a);
  for (; !s.done && a < eu; )
    a += i, s = n.next(a);
  return a >= eu ? 1 / 0 : a;
}
function l3(n, a = 100, i) {
  const s = i({ ...n, keyframes: [0, a] }), o = Math.min(gh(s), eu);
  return {
    type: "keyframes",
    ease: (c) => s.next(o * c).value / a,
    duration: /* @__PURE__ */ Ln(o)
  };
}
const ht = {
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
function Md(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const i3 = 12;
function r3(n, a, i) {
  let s = i;
  for (let o = 1; o < i3; o++)
    s = s - n(s) / a(s);
  return s;
}
const sd = 1e-3;
function s3({ duration: n = ht.duration, bounce: a = ht.bounce, velocity: i = ht.velocity, mass: s = ht.mass }) {
  let o, c;
  is(n <= /* @__PURE__ */ jn(ht.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = tl(ht.minDamping, ht.maxDamping, h), n = tl(ht.minDuration, ht.maxDuration, /* @__PURE__ */ Ln(n)), h < 1 ? (o = (p) => {
    const y = p * h, b = y * n, S = y - i, w = Md(p, h), j = Math.exp(-b);
    return sd - S / w * j;
  }, c = (p) => {
    const b = p * h * n, S = b * i + i, w = Math.pow(h, 2) * Math.pow(p, 2) * n, j = Math.exp(-b), T = Md(Math.pow(p, 2), h);
    return (-o(p) + sd > 0 ? -1 : 1) * ((S - w) * j) / T;
  }) : (o = (p) => {
    const y = Math.exp(-p * n), b = (p - i) * n + 1;
    return -sd + y * b;
  }, c = (p) => {
    const y = Math.exp(-p * n), b = (i - p) * (n * n);
    return y * b;
  });
  const m = 5 / n, v = r3(o, c, m);
  if (n = /* @__PURE__ */ jn(n), isNaN(v))
    return {
      stiffness: ht.stiffness,
      damping: ht.damping,
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
const o3 = ["duration", "bounce"], u3 = ["stiffness", "damping", "mass"];
function v0(n, a) {
  return a.some((i) => n[i] !== void 0);
}
function c3(n) {
  let a = {
    velocity: ht.velocity,
    stiffness: ht.stiffness,
    damping: ht.damping,
    mass: ht.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!v0(n, u3) && v0(n, o3))
    if (a.velocity = 0, n.visualDuration) {
      const i = n.visualDuration, s = 2 * Math.PI / (i * 1.2), o = s * s, c = 2 * tl(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: ht.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const i = s3({ ...n, velocity: 0 });
      a = {
        ...a,
        ...i,
        mass: ht.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function tu(n = ht.visualDuration, a = ht.bounce) {
  const i = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = i;
  const c = i.keyframes[0], h = i.keyframes[i.keyframes.length - 1], m = { done: !1, value: c }, { stiffness: v, damping: p, mass: y, duration: b, velocity: S, isResolvedFromDuration: w } = c3({
    ...i,
    velocity: -/* @__PURE__ */ Ln(i.velocity || 0)
  }), j = S || 0, T = p / (2 * Math.sqrt(v * y)), R = h - c, O = /* @__PURE__ */ Ln(Math.sqrt(v / y)), D = Math.abs(R) < 5;
  s || (s = D ? ht.restSpeed.granular : ht.restSpeed.default), o || (o = D ? ht.restDelta.granular : ht.restDelta.default);
  let z, k, J, I, W, M;
  if (T < 1)
    J = Md(O, T), I = (j + T * O * R) / J, z = (P) => {
      const oe = Math.exp(-T * O * P);
      return h - oe * (I * Math.sin(J * P) + R * Math.cos(J * P));
    }, W = T * O * I + R * J, M = T * O * R - I * J, k = (P) => Math.exp(-T * O * P) * (W * Math.sin(J * P) + M * Math.cos(J * P));
  else if (T === 1) {
    z = (oe) => h - Math.exp(-O * oe) * (R + (j + O * R) * oe);
    const P = j + O * R;
    k = (oe) => Math.exp(-O * oe) * (O * P * oe - j);
  } else {
    const P = O * Math.sqrt(T * T - 1);
    z = (we) => {
      const re = Math.exp(-T * O * we), q = Math.min(P * we, 300);
      return h - re * ((j + T * O * R) * Math.sinh(q) + P * R * Math.cosh(q)) / P;
    };
    const oe = (j + T * O * R) / P, ue = T * O * oe - R * P, Ee = T * O * R - oe * P;
    k = (we) => {
      const re = Math.exp(-T * O * we), q = Math.min(P * we, 300);
      return re * (ue * Math.sinh(q) + Ee * Math.cosh(q));
    };
  }
  const V = {
    calculatedDuration: w && b || null,
    velocity: (P) => /* @__PURE__ */ jn(k(P)),
    next: (P) => {
      if (!w && T < 1) {
        const ue = Math.exp(-T * O * P), Ee = Math.sin(J * P), we = Math.cos(J * P), re = h - ue * (I * Ee + R * we), q = /* @__PURE__ */ jn(ue * (W * Ee + M * we));
        return m.done = Math.abs(q) <= s && Math.abs(h - re) <= o, m.value = m.done ? h : re, m;
      }
      const oe = z(P);
      if (w)
        m.done = P >= b;
      else {
        const ue = /* @__PURE__ */ jn(k(P));
        m.done = Math.abs(ue) <= s && Math.abs(h - oe) <= o;
      }
      return m.value = m.done ? h : oe, m;
    },
    toString: () => {
      const P = Math.min(gh(V), eu), oe = zx((ue) => V.next(P * ue).value, P, 30);
      return P + "ms " + oe;
    },
    toTransition: () => {
    }
  };
  return V;
}
tu.applyToOptions = (n) => {
  const a = l3(n, 100, tu);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ jn(a.duration), n.type = "keyframes", n;
};
const f3 = 5;
function Ox(n, a, i) {
  const s = Math.max(a - f3, 0);
  return mx(i - n(s), a - s);
}
function Nd({ keyframes: n, velocity: a = 0, power: i = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: h, min: m, max: v, restDelta: p = 0.5, restSpeed: y }) {
  const b = n[0], S = {
    done: !1,
    value: b
  }, w = (M) => m !== void 0 && M < m || v !== void 0 && M > v, j = (M) => m === void 0 ? v : v === void 0 || Math.abs(m - M) < Math.abs(v - M) ? m : v;
  let T = i * a;
  const R = b + T, O = h === void 0 ? R : h(R);
  O !== R && (T = O - b);
  const D = (M) => -T * Math.exp(-M / s), z = (M) => O + D(M), k = (M) => {
    const V = D(M), P = z(M);
    S.done = Math.abs(V) <= p, S.value = S.done ? O : P;
  };
  let J, I;
  const W = (M) => {
    w(S.value) && (J = M, I = tu({
      keyframes: [S.value, j(S.value)],
      velocity: Ox(z, M, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: p,
      restSpeed: y
    }));
  };
  return W(0), {
    calculatedDuration: null,
    next: (M) => {
      let V = !1;
      return !I && J === void 0 && (V = !0, k(M), W(M)), J !== void 0 && M >= J ? I.next(M - J) : (!V && k(M), S);
    }
  };
}
function d3(n, a, i) {
  const s = [], o = i || nl.mix || Dx, c = n.length - 1;
  for (let h = 0; h < c; h++) {
    let m = o(n[h], n[h + 1]);
    if (a) {
      const v = Array.isArray(a) ? a[h] || Li : a;
      m = pu(v, m);
    }
    s.push(m);
  }
  return s;
}
function h3(n, a, { clamp: i = !0, ease: s, mixer: o } = {}) {
  const c = n.length;
  if (_i(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const h = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const m = d3(a, s, o), v = m.length, p = (y) => {
    if (h && y < n[0])
      return a[0];
    let b = 0;
    if (v > 1)
      for (; b < n.length - 2 && !(y < n[b + 1]); b++)
        ;
    const S = /* @__PURE__ */ dx(n[b], n[b + 1], y);
    return m[b](S);
  };
  return i ? (y) => p(tl(n[0], n[c - 1], y)) : p;
}
function m3(n, a) {
  const i = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ dx(0, a, s);
    n.push(os(i, 1, o));
  }
}
function p3(n) {
  const a = [0];
  return m3(a, n.length - 1), a;
}
function v3(n, a) {
  return n.map((i) => i * a);
}
function g3(n, a) {
  return n.map(() => a || Ex).splice(0, n.length - 1);
}
function Gr({ duration: n = 300, keyframes: a, times: i, ease: s = "easeInOut" }) {
  const o = C_(s) ? s.map(c0) : c0(s), c = {
    done: !1,
    value: a[0]
  }, h = v3(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === a.length ? i : p3(a),
    n
  ), m = h3(h, a, {
    ease: Array.isArray(o) ? o : g3(a, o)
  });
  return {
    calculatedDuration: n,
    next: (v) => (c.value = m(v), c.done = v >= n, c)
  };
}
const y3 = (n) => n !== null;
function vu(n, { repeat: a, repeatType: i = "loop" }, s, o = 1) {
  const c = n.filter(y3), m = o < 0 || a && i !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !m || s === void 0 ? c[m] : s;
}
const b3 = {
  decay: Nd,
  inertia: Nd,
  tween: Gr,
  keyframes: Gr,
  spring: tu
};
function Lx(n) {
  typeof n.type == "string" && (n.type = b3[n.type]);
}
class yh {
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
const x3 = (n) => n / 100;
class nu extends yh {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: i } = this.options;
      i && i.updatedAt !== un.now() && this.tick(un.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    Lx(a);
    const { type: i = Gr, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: h = 0 } = a;
    let { keyframes: m } = a;
    const v = i || Gr;
    v !== Gr && typeof m[0] != "number" && (this.mixKeyframes = pu(x3, Dx(m[0], m[1])), m = [0, 100]);
    const p = v({ ...a, keyframes: m });
    c === "mirror" && (this.mirroredGenerator = v({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -h
    })), p.calculatedDuration === null && (p.calculatedDuration = gh(p));
    const { calculatedDuration: y } = p;
    this.calculatedDuration = y, this.resolvedDuration = y + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const i = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = i;
  }
  tick(a, i = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: c, mirroredGenerator: h, resolvedDuration: m, calculatedDuration: v } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: p = 0, keyframes: y, repeat: b, repeatType: S, repeatDelay: w, type: j, onUpdate: T, finalKeyframe: R } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), i ? this.currentTime = a : this.updateTime(a);
    const O = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), D = this.playbackSpeed >= 0 ? O < 0 : O > o;
    this.currentTime = Math.max(O, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let z = this.currentTime, k = s;
    if (b) {
      const M = Math.min(this.currentTime, o) / m;
      let V = Math.floor(M), P = M % 1;
      !P && M >= 1 && (P = 1), P === 1 && V--, V = Math.min(V, b + 1), !!(V % 2) && (S === "reverse" ? (P = 1 - P, w && (P -= w / m)) : S === "mirror" && (k = h)), z = tl(0, 1, P) * m;
    }
    let J;
    D ? (this.delayState.value = y[0], J = this.delayState) : J = k.next(z), c && !D && (J.value = c(J.value));
    let { done: I } = J;
    !D && v !== null && (I = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const W = this.holdTime === null && (this.state === "finished" || this.state === "running" && I);
    return W && j !== Nd && (J.value = vu(y, this.options, R, this.speed)), T && T(J.value), W && this.finish(), J;
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
    return /* @__PURE__ */ Ln(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Ln(a);
  }
  get time() {
    return /* @__PURE__ */ Ln(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ jn(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    return Ox((s) => this.generator.next(s).value, a, i);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const i = this.playbackSpeed !== a;
    i && this.driver && this.updateTime(un.now()), this.playbackSpeed = a, i && this.driver && (this.time = /* @__PURE__ */ Ln(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = a3, startTime: i } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = i ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(un.now()), this.holdTime = this.currentTime;
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
function S3(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Rl = (n) => n * 180 / Math.PI, Ad = (n) => {
  const a = Rl(Math.atan2(n[1], n[0]));
  return Rd(a);
}, E3 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Ad,
  rotateZ: Ad,
  skewX: (n) => Rl(Math.atan(n[1])),
  skewY: (n) => Rl(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, Rd = (n) => (n = n % 360, n < 0 && (n += 360), n), g0 = Ad, y0 = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), b0 = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), w3 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: y0,
  scaleY: b0,
  scale: (n) => (y0(n) + b0(n)) / 2,
  rotateX: (n) => Rd(Rl(Math.atan2(n[6], n[5]))),
  rotateY: (n) => Rd(Rl(Math.atan2(-n[2], n[0]))),
  rotateZ: g0,
  rotate: g0,
  skewX: (n) => Rl(Math.atan(n[4])),
  skewY: (n) => Rl(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function _d(n) {
  return n.includes("scale") ? 1 : 0;
}
function Dd(n, a) {
  if (!n || n === "none")
    return _d(a);
  const i = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (i)
    s = w3, o = i;
  else {
    const m = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = E3, o = m;
  }
  if (!o)
    return _d(a);
  const c = s[a], h = o[1].split(",").map(T3);
  return typeof c == "function" ? c(h) : h[c];
}
const j3 = (n, a) => {
  const { transform: i = "none" } = getComputedStyle(n);
  return Dd(i, a);
};
function T3(n) {
  return parseFloat(n.trim());
}
const Vi = [
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
], Bi = new Set(Vi), x0 = (n) => n === Ui || n === ge, C3 = /* @__PURE__ */ new Set(["x", "y", "z"]), M3 = Vi.filter((n) => !C3.has(n));
function N3(n) {
  const a = [];
  return M3.forEach((i) => {
    const s = n.getValue(i);
    s !== void 0 && (a.push([i, s.get()]), s.set(i.startsWith("scale") ? 1 : 0));
  }), a;
}
const Wa = {
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
  x: (n, { transform: a }) => Dd(a, "x"),
  y: (n, { transform: a }) => Dd(a, "y")
};
Wa.translateX = Wa.x;
Wa.translateY = Wa.y;
const Dl = /* @__PURE__ */ new Set();
let zd = !1, Od = !1, Ld = !1;
function Ux() {
  if (Od) {
    const n = Array.from(Dl).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), i = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = N3(s);
      o.length && (i.set(s, o), s.render());
    }), n.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = i.get(s);
      o && o.forEach(([c, h]) => {
        s.getValue(c)?.set(h);
      });
    }), n.forEach((s) => s.measureEndState()), n.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Od = !1, zd = !1, Dl.forEach((n) => n.complete(Ld)), Dl.clear();
}
function Vx() {
  Dl.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Od = !0);
  });
}
function A3() {
  Ld = !0, Vx(), Ux(), Ld = !1;
}
class bh {
  constructor(a, i, s, o, c, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = i, this.name = s, this.motionValue = o, this.element = c, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Dl.add(this), zd || (zd = !0, Tn.read(Vx), Tn.resolveKeyframes(Ux))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: i, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const c = o?.get(), h = a[a.length - 1];
      if (c !== void 0)
        a[0] = c;
      else if (s && i) {
        const m = s.readValue(i, h);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = h), o && c === void 0 && o.set(a[0]);
    }
    S3(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Dl.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Dl.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const R3 = (n) => n.startsWith("--");
function Bx(n, a, i) {
  R3(a) ? n.style.setProperty(a, i) : n.style[a] = i;
}
const _3 = {};
function kx(n, a) {
  const i = /* @__PURE__ */ fx(n);
  return () => _3[a] ?? i();
}
const D3 = /* @__PURE__ */ kx(() => window.ScrollTimeline !== void 0, "scrollTimeline"), qx = /* @__PURE__ */ kx(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), $r = ([n, a, i, s]) => `cubic-bezier(${n}, ${a}, ${i}, ${s})`, S0 = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ $r([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ $r([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ $r([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ $r([0.33, 1.53, 0.69, 0.99])
};
function Hx(n, a) {
  if (n)
    return typeof n == "function" ? qx() ? zx(n, a) : "ease-out" : wx(n) ? $r(n) : Array.isArray(n) ? n.map((i) => Hx(i, a) || S0.easeOut) : S0[n];
}
function z3(n, a, i, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: h = "loop", ease: m = "easeOut", times: v } = {}, p = void 0) {
  const y = {
    [a]: i
  };
  v && (y.offset = v);
  const b = Hx(m, o);
  Array.isArray(b) && (y.easing = b);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(b) ? "linear" : b,
    fill: "both",
    iterations: c + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return p && (S.pseudoElement = p), n.animate(y, S);
}
function $x(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function O3({ type: n, ...a }) {
  return $x(n) && qx() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class Yx extends yh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: i, name: s, keyframes: o, pseudoElement: c, allowFlatten: h = !1, finalKeyframe: m, onComplete: v } = a;
    this.isPseudoElement = !!c, this.allowFlatten = h, this.options = a, _i(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = O3(a);
    this.animation = z3(i, s, o, p, c), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const y = vu(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(y), Bx(i, s, y), this.animation.cancel();
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
    return /* @__PURE__ */ Ln(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Ln(a);
  }
  get time() {
    return /* @__PURE__ */ Ln(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const i = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ jn(a), i && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && D3() ? (this.animation.timeline = a, i && (this.animation.rangeStart = i), s && (this.animation.rangeEnd = s), Li) : o(this);
  }
}
const Fx = {
  anticipate: xx,
  backInOut: bx,
  circInOut: Sx
};
function L3(n) {
  return n in Fx;
}
function U3(n) {
  typeof n.ease == "string" && L3(n.ease) && (n.ease = Fx[n.ease]);
}
const od = 10;
class V3 extends Yx {
  constructor(a) {
    U3(a), Lx(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: i, onUpdate: s, onComplete: o, element: c, ...h } = this.options;
    if (!i)
      return;
    if (a !== void 0) {
      i.set(a);
      return;
    }
    const m = new nu({
      ...h,
      autoplay: !1
    }), v = Math.max(od, un.now() - this.startTime), p = tl(0, od, v - od), y = m.sample(v).value, { name: b } = this.options;
    c && b && Bx(c, b, y), i.setWithVelocity(m.sample(Math.max(0, v - p)).value, y, p), m.stop();
  }
}
const E0 = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(Un.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function B3(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let i = 0; i < n.length; i++)
    if (n[i] !== a)
      return !0;
}
function k3(n, a, i, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = n[n.length - 1], h = E0(o, a), m = E0(c, a);
  return is(h === m, `You are trying to animate ${a} from "${o}" to "${c}". "${h ? c : o}" is not an animatable value.`, "value-not-animatable"), !h || !m ? !1 : B3(n) || (i === "spring" || $x(i)) && s;
}
function Ud(n) {
  n.duration = 0, n.type = "keyframes";
}
const Gx = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), q3 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function H3(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && q3.test(n[a]))
      return !0;
  return !1;
}
const $3 = /* @__PURE__ */ new Set([
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
]), Y3 = /* @__PURE__ */ fx(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function F3(n) {
  const { motionValue: a, name: i, repeatDelay: s, repeatType: o, damping: c, type: h, keyframes: m } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: y } = a.owner.getProps();
  return Y3() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (Gx.has(i) || $3.has(i) && H3(m)) && (i !== "transform" || !y) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !s && o !== "mirror" && c !== 0 && h !== "inertia";
}
const G3 = 40;
class X3 extends yh {
  constructor({ autoplay: a = !0, delay: i = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: h = "loop", keyframes: m, name: v, motionValue: p, element: y, ...b }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = un.now();
    const S = {
      autoplay: a,
      delay: i,
      type: s,
      repeat: o,
      repeatDelay: c,
      repeatType: h,
      name: v,
      motionValue: p,
      element: y,
      ...b
    }, w = y?.KeyframeResolver || bh;
    this.keyframeResolver = new w(m, (j, T, R) => this.onKeyframesResolved(j, T, S, !R), v, p, y), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, i, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: h, velocity: m, delay: v, isHandoff: p, onUpdate: y } = s;
    this.resolvedAt = un.now();
    let b = !0;
    k3(a, c, h, m) || (b = !1, (nl.instantAnimations || !v) && y?.(vu(a, s, i)), a[0] = a[a.length - 1], Ud(s), s.repeat = 0);
    const w = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > G3 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...s,
      keyframes: a
    }, j = b && !p && F3(w), T = w.motionValue?.owner?.current;
    let R;
    if (j)
      try {
        R = new V3({
          ...w,
          element: T
        });
      } catch {
        R = new nu(w);
      }
    else
      R = new nu(w);
    R.finished.then(() => {
      this.notifyFinished();
    }).catch(Li), this.pendingTimeline && (this.stopTimeline = R.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = R;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, i) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), A3()), this._animation;
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
function Xx(n, a, i, s = 0, o = 1) {
  const c = Array.from(n).sort((p, y) => p.sortNodePosition(y)).indexOf(a), h = n.size, m = (h - 1) * s;
  return typeof i == "function" ? i(c, h) : o === 1 ? c * s : m - c * s;
}
const I3 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function K3(n) {
  const a = I3.exec(n);
  if (!a)
    return [,];
  const [, i, s, o] = a;
  return [`--${i ?? s}`, o];
}
const Q3 = 4;
function Ix(n, a, i = 1) {
  _i(i <= Q3, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = K3(n);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const h = c.trim();
    return ux(h) ? parseFloat(h) : h;
  }
  return hh(o) ? Ix(o, a, i + 1) : o;
}
const Z3 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, P3 = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), J3 = {
  type: "keyframes",
  duration: 0.8
}, W3 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, eD = (n, { keyframes: a }) => a.length > 2 ? J3 : Bi.has(n) ? n.startsWith("scale") ? P3(a[1]) : Z3 : W3;
function Kx(n, a) {
  if (n?.inherit && a) {
    const { inherit: i, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function Qx(n, a) {
  const i = n?.[a] ?? n?.default ?? n;
  return i !== n ? Kx(i, n) : i;
}
const tD = /* @__PURE__ */ new Set([
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
function nD(n) {
  for (const a in n)
    if (!tD.has(a))
      return !0;
  return !1;
}
const aD = (n, a, i, s = {}, o, c) => (h) => {
  const m = Qx(s, n) || {}, v = m.delay || s.delay || 0;
  let { elapsed: p = 0 } = s;
  p = p - /* @__PURE__ */ jn(v);
  const y = {
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
    element: c ? void 0 : o
  };
  nD(m) || Object.assign(y, eD(n, y)), y.duration && (y.duration = /* @__PURE__ */ jn(y.duration)), y.repeatDelay && (y.repeatDelay = /* @__PURE__ */ jn(y.repeatDelay)), y.from !== void 0 && (y.keyframes[0] = y.from);
  let b = !1;
  if ((y.type === !1 || y.duration === 0 && !y.repeatDelay) && (Ud(y), y.delay === 0 && (b = !0)), (nl.instantAnimations || nl.skipAnimations || o?.shouldSkipAnimations) && (b = !0, Ud(y), y.delay = 0), y.allowFlatten = !m.type && !m.ease, b && !c && a.get() !== void 0) {
    const S = vu(y.keyframes, m);
    if (S !== void 0) {
      Tn.update(() => {
        y.onUpdate(S), y.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new nu(y) : new X3(y);
};
function w0(n) {
  const a = [{}, {}];
  return n?.values.forEach((i, s) => {
    a[0][s] = i.get(), a[1][s] = i.getVelocity();
  }), a;
}
function xh(n, a, i, s) {
  if (typeof a == "function") {
    const [o, c] = w0(s);
    a = a(i !== void 0 ? i : n.custom, o, c);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, c] = w0(s);
    a = a(i !== void 0 ? i : n.custom, o, c);
  }
  return a;
}
function zl(n, a, i) {
  const s = n.getProps();
  return xh(s, a, i !== void 0 ? i : s.custom, n);
}
const Zx = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Vi
]), j0 = 30, lD = (n) => !isNaN(parseFloat(n));
class iD {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, i = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = un.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = i.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = un.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = lD(this.current));
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
    this.events[a] || (this.events[a] = new hx());
    const s = this.events[a].add(i);
    return a === "change" ? () => {
      s(), Tn.read(() => {
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
    const a = un.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > j0)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, j0);
    return mx(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
function au(n, a) {
  return new iD(n, a);
}
const Vd = (n) => Array.isArray(n);
function rD(n, a, i) {
  n.hasValue(a) ? n.getValue(a).set(i) : n.addValue(a, au(i));
}
function sD(n) {
  return Vd(n) ? n[n.length - 1] || 0 : n;
}
function oD(n, a) {
  const i = zl(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = i || {};
  c = { ...c, ...s };
  for (const h in c) {
    const m = sD(c[h]);
    rD(n, h, m);
  }
}
const Ht = (n) => !!(n && n.getVelocity);
function uD(n) {
  return !!(Ht(n) && n.add);
}
function cD(n, a) {
  const i = n.getValue("willChange");
  if (uD(i))
    return i.add(a);
  if (!i && nl.WillChange) {
    const s = new nl.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Sh(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const fD = "framerAppearId", Px = "data-" + Sh(fD);
function dD(n) {
  return n.props[Px];
}
function hD({ protectedKeys: n, needsAnimating: a }, i) {
  const s = n.hasOwnProperty(i) && a[i] !== !0;
  return a[i] = !1, s;
}
function Jx(n, a, { delay: i = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: h, ...m } = a;
  const v = n.getDefaultTransition();
  c = c ? Kx(c, v) : v;
  const p = c?.reduceMotion;
  s && (c = s);
  const y = [], b = o && n.animationState && n.animationState.getState()[o];
  for (const S in m) {
    const w = n.getValue(S, n.latestValues[S] ?? null), j = m[S];
    if (j === void 0 || b && hD(b, S))
      continue;
    const T = {
      delay: i,
      ...Qx(c || {}, S)
    }, R = w.get();
    if (R !== void 0 && !w.isAnimating() && !Array.isArray(j) && j === R && !T.velocity) {
      Tn.update(() => w.set(j));
      continue;
    }
    let O = !1;
    if (window.MotionHandoffAnimation) {
      const k = dD(n);
      if (k) {
        const J = window.MotionHandoffAnimation(k, S, Tn);
        J !== null && (T.startTime = J, O = !0);
      }
    }
    cD(n, S);
    const D = p ?? n.shouldReduceMotion;
    w.start(aD(S, w, j, D && Zx.has(S) ? { type: !1 } : T, n, O));
    const z = w.animation;
    z && y.push(z);
  }
  if (h) {
    const S = () => Tn.update(() => {
      h && oD(n, h);
    });
    y.length ? Promise.all(y).then(S) : S();
  }
  return y;
}
function Bd(n, a, i = {}) {
  const s = zl(n, a, i.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  i.transitionOverride && (o = i.transitionOverride);
  const c = s ? () => Promise.all(Jx(n, s, i)) : () => Promise.resolve(), h = n.variantChildren && n.variantChildren.size ? (v = 0) => {
    const { delayChildren: p = 0, staggerChildren: y, staggerDirection: b } = o;
    return mD(n, a, v, p, y, b, i);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [v, p] = m === "beforeChildren" ? [c, h] : [h, c];
    return v().then(() => p());
  } else
    return Promise.all([c(), h(i.delay)]);
}
function mD(n, a, i = 0, s = 0, o = 0, c = 1, h) {
  const m = [];
  for (const v of n.variantChildren)
    v.notify("AnimationStart", a), m.push(Bd(v, a, {
      ...h,
      delay: i + (typeof s == "function" ? 0 : s) + Xx(n.variantChildren, v, s, o, c)
    }).then(() => v.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function pD(n, a, i = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => Bd(n, c, i));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = Bd(n, a, i);
  else {
    const o = typeof a == "function" ? zl(n, a, i.custom) : a;
    s = Promise.all(Jx(n, o, i));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const vD = {
  test: (n) => n === "auto",
  parse: (n) => n
}, Wx = (n) => (a) => a.test(n), eS = [Ui, ge, Ai, Ka, B_, V_, vD], T0 = (n) => eS.find(Wx(n));
function gD(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || cx(n) : !0;
}
const yD = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function bD(n) {
  const [a, i] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = i.match(mh) || [];
  if (!s)
    return n;
  const o = i.replace(s, "");
  let c = yD.has(a) ? 1 : 0;
  return s !== i && (c *= 100), a + "(" + c + o + ")";
}
const xD = /\b([a-z-]*)\(.*?\)/gu, kd = {
  ...Un,
  getAnimatableNone: (n) => {
    const a = n.match(xD);
    return a ? a.map(bD).join(" ") : n;
  }
}, qd = {
  ...Un,
  getAnimatableNone: (n) => {
    const a = Un.parse(n);
    return Un.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, C0 = {
  ...Ui,
  transform: Math.round
}, SD = {
  rotate: Ka,
  rotateX: Ka,
  rotateY: Ka,
  rotateZ: Ka,
  scale: Vo,
  scaleX: Vo,
  scaleY: Vo,
  scaleZ: Vo,
  skew: Ka,
  skewX: Ka,
  skewY: Ka,
  distance: ge,
  translateX: ge,
  translateY: ge,
  translateZ: ge,
  x: ge,
  y: ge,
  z: ge,
  perspective: ge,
  transformPerspective: ge,
  opacity: Pr,
  originX: d0,
  originY: d0,
  originZ: ge
}, Eh = {
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
  ...SD,
  zIndex: C0,
  // SVG
  fillOpacity: Pr,
  strokeOpacity: Pr,
  numOctaves: C0
}, ED = {
  ...Eh,
  // Color props
  color: Ct,
  backgroundColor: Ct,
  outlineColor: Ct,
  fill: Ct,
  stroke: Ct,
  // Border props
  borderColor: Ct,
  borderTopColor: Ct,
  borderRightColor: Ct,
  borderBottomColor: Ct,
  borderLeftColor: Ct,
  filter: kd,
  WebkitFilter: kd,
  mask: qd,
  WebkitMask: qd
}, tS = (n) => ED[n], wD = /* @__PURE__ */ new Set([kd, qd]);
function nS(n, a) {
  let i = tS(n);
  return wD.has(i) || (i = Un), i.getAnimatableNone ? i.getAnimatableNone(a) : void 0;
}
const jD = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function TD(n, a, i) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const c = n[s];
    typeof c == "string" && !jD.has(c) && Di(c).values.length && (o = n[s]), s++;
  }
  if (o && i)
    for (const c of a)
      n[c] = nS(i, o);
}
class CD extends bh {
  constructor(a, i, s, o, c) {
    super(a, i, s, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: i, name: s } = this;
    if (!i || !i.current)
      return;
    super.readKeyframes();
    for (let y = 0; y < a.length; y++) {
      let b = a[y];
      if (typeof b == "string" && (b = b.trim(), hh(b))) {
        const S = Ix(b, i.current);
        S !== void 0 && (a[y] = S), y === a.length - 1 && (this.finalKeyframe = b);
      }
    }
    if (this.resolveNoneKeyframes(), !Zx.has(s) || a.length !== 2)
      return;
    const [o, c] = a, h = T0(o), m = T0(c), v = f0(o), p = f0(c);
    if (v !== p && Wa[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== m)
      if (x0(h) && x0(m))
        for (let y = 0; y < a.length; y++) {
          const b = a[y];
          typeof b == "string" && (a[y] = parseFloat(b));
        }
      else Wa[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: i } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || gD(a[o])) && s.push(o);
    s.length && TD(a, s, i);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: i, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Wa[s](a.measureViewportBox(), window.getComputedStyle(a.current)), i[0] = this.measuredOrigin;
    const o = i[i.length - 1];
    o !== void 0 && a.getValue(s, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: i, unresolvedKeyframes: s } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(i);
    o && o.jump(this.measuredOrigin, !1);
    const c = s.length - 1, h = s[c];
    s[c] = Wa[i](a.measureViewportBox(), window.getComputedStyle(a.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([m, v]) => {
      a.getValue(m).set(v);
    }), this.resolveNoneKeyframes();
  }
}
function MD(n, a, i) {
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
const aS = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function Io(n) {
  return y_(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: ND } = /* @__PURE__ */ jx(queueMicrotask, !1), AD = {
  y: !1
};
function RD() {
  return AD.y;
}
function lS(n, a) {
  const i = MD(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [i, o, () => s.abort()];
}
function _D(n) {
  return !(n.pointerType === "touch" || RD());
}
function DD(n, a, i = {}) {
  const [s, o, c] = lS(n, i);
  return s.forEach((h) => {
    let m = !1, v = !1, p;
    const y = () => {
      h.removeEventListener("pointerleave", j);
    }, b = (R) => {
      p && (p(R), p = void 0), y();
    }, S = (R) => {
      m = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), v && (v = !1, b(R));
    }, w = () => {
      m = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, j = (R) => {
      if (R.pointerType !== "touch") {
        if (m) {
          v = !0;
          return;
        }
        b(R);
      }
    }, T = (R) => {
      if (!_D(R))
        return;
      v = !1;
      const O = a(h, R);
      typeof O == "function" && (p = O, h.addEventListener("pointerleave", j, o));
    };
    h.addEventListener("pointerenter", T, o), h.addEventListener("pointerdown", w, o);
  }), c;
}
const iS = (n, a) => a ? n === a ? !0 : iS(n, a.parentElement) : !1, zD = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, OD = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function LD(n) {
  return OD.has(n.tagName) || n.isContentEditable === !0;
}
const Ko = /* @__PURE__ */ new WeakSet();
function M0(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function ud(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const UD = (n, a) => {
  const i = n.currentTarget;
  if (!i)
    return;
  const s = M0(() => {
    if (Ko.has(i))
      return;
    ud(i, "down");
    const o = M0(() => {
      ud(i, "up");
    }), c = () => ud(i, "cancel");
    i.addEventListener("keyup", o, a), i.addEventListener("blur", c, a);
  });
  i.addEventListener("keydown", s, a), i.addEventListener("blur", () => i.removeEventListener("keydown", s), a);
};
function N0(n) {
  return zD(n) && !0;
}
const A0 = /* @__PURE__ */ new WeakSet();
function VD(n, a, i = {}) {
  const [s, o, c] = lS(n, i), h = (m) => {
    const v = m.currentTarget;
    if (!N0(m) || A0.has(m))
      return;
    Ko.add(v), i.stopPropagation && A0.add(m);
    const p = a(v, m), y = (w, j) => {
      window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", S), Ko.has(v) && Ko.delete(v), N0(w) && typeof p == "function" && p(w, { success: j });
    }, b = (w) => {
      y(w, v === window || v === document || i.useGlobalTarget || iS(v, w.target));
    }, S = (w) => {
      y(w, !1);
    };
    window.addEventListener("pointerup", b, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((m) => {
    (i.useGlobalTarget ? window : m).addEventListener("pointerdown", h, o), Io(m) && (m.addEventListener("focus", (p) => UD(p, o)), !LD(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), c;
}
const BD = [...eS, Ct, Un], kD = (n) => BD.find(Wx(n)), R0 = () => ({ min: 0, max: 0 }), rS = () => ({
  x: R0(),
  y: R0()
}), qD = /* @__PURE__ */ new WeakMap();
function gu(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function Jr(n) {
  return typeof n == "string" || Array.isArray(n);
}
const wh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], jh = ["initial", ...wh];
function yu(n) {
  return gu(n.animate) || jh.some((a) => Jr(n[a]));
}
function sS(n) {
  return !!(yu(n) || n.variants);
}
function HD(n, a, i) {
  for (const s in a) {
    const o = a[s], c = i[s];
    if (Ht(o))
      n.addValue(s, o);
    else if (Ht(c))
      n.addValue(s, au(o, { owner: n }));
    else if (c !== o)
      if (n.hasValue(s)) {
        const h = n.getValue(s);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = n.getStaticValue(s);
        n.addValue(s, au(h !== void 0 ? h : o, { owner: n }));
      }
  }
  for (const s in i)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const Hd = { current: null }, oS = { current: !1 }, $D = typeof window < "u";
function YD() {
  if (oS.current = !0, !!$D)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => Hd.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      Hd.current = !1;
}
const _0 = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let lu = {};
function uS(n) {
  lu = n;
}
function FD() {
  return lu;
}
class GD {
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
  constructor({ parent: a, props: i, presenceContext: s, reducedMotionConfig: o, skipAnimations: c, blockInitialAnimation: h, visualState: m }, v = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = bh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const w = un.now();
      this.renderScheduledAt < w && (this.renderScheduledAt = w, Tn.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: y } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = i.initial ? { ...p } : {}, this.renderState = y, this.parent = a, this.props = i, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = v, this.blockInitialAnimation = !!h, this.isControllingVariants = yu(i), this.isVariantNode = sS(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: b, ...S } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const w in S) {
      const j = S[w];
      p[w] !== void 0 && Ht(j) && j.set(p[w]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        this.values.get(i)?.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = a, qD.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, s) => this.bindToMotionValue(s, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (oS.current || YD(), this.shouldReduceMotion = Hd.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), jd(this.notifyUpdate), jd(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), i.accelerate && Gx.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: m, times: v, ease: p, duration: y } = i.accelerate, b = new Yx({
        element: this.current,
        name: a,
        keyframes: m,
        times: v,
        ease: p,
        duration: /* @__PURE__ */ jn(y)
      }), S = h(b);
      this.valueSubscriptions.set(a, () => {
        S(), b.cancel();
      });
      return;
    }
    const s = Bi.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = i.on("change", (h) => {
      this.latestValues[a] = h, this.props.onUpdate && Tn.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let c;
    typeof window < "u" && window.MotionCheckAppearSync && (c = window.MotionCheckAppearSync(this, a, i)), this.valueSubscriptions.set(a, () => {
      o(), c && c(), i.owner && i.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in lu) {
      const i = lu[a];
      if (!i)
        continue;
      const { isEnabled: s, Feature: o } = i;
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : rS();
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
    for (let s = 0; s < _0.length; s++) {
      const o = _0[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, h = a[c];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = HD(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && i !== void 0 && (s = au(i === null ? void 0 : i, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, i) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (ux(s) || cx(s)) ? s = parseFloat(s) : !kD(s) && Un.test(i) && (s = nS(a, i)), this.setBaseTarget(a, Ht(s) ? s.get() : s)), Ht(s) ? s.get() : s;
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
      const c = xh(this.props, i, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (i && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !Ht(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, i) {
    return this.events[a] || (this.events[a] = new hx()), this.events[a].add(i);
  }
  notify(a, ...i) {
    this.events[a] && this.events[a].notify(...i);
  }
  scheduleRenderMicrotask() {
    ND.render(this.render);
  }
}
class cS extends GD {
  constructor() {
    super(...arguments), this.KeyframeResolver = CD;
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
    Ht(a) && (this.childSubscription = a.on("change", (i) => {
      this.current && (this.current.textContent = `${i}`);
    }));
  }
}
class ki {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function XD({ top: n, left: a, right: i, bottom: s }) {
  return {
    x: { min: a, max: i },
    y: { min: n, max: s }
  };
}
function ID(n, a) {
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
function KD(n, a) {
  return XD(ID(n.getBoundingClientRect(), a));
}
const QD = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, ZD = Vi.length;
function PD(n, a, i) {
  let s = "", o = !0;
  for (let c = 0; c < ZD; c++) {
    const h = Vi[c], m = n[h];
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
      const p = aS(m, Eh[h]);
      if (!v) {
        o = !1;
        const y = QD[h] || h;
        s += `${y}(${p}) `;
      }
      i && (a[h] = p);
    }
  }
  return s = s.trim(), i ? s = i(a, o ? "" : s) : o && (s = "none"), s;
}
function Th(n, a, i) {
  const { style: s, vars: o, transformOrigin: c } = n;
  let h = !1, m = !1;
  for (const v in a) {
    const p = a[v];
    if (Bi.has(v)) {
      h = !0;
      continue;
    } else if (Cx(v)) {
      o[v] = p;
      continue;
    } else {
      const y = aS(p, Eh[v]);
      v.startsWith("origin") ? (m = !0, c[v] = y) : s[v] = y;
    }
  }
  if (a.transform || (h || i ? s.transform = PD(a, n.transform, i) : s.transform && (s.transform = "none")), m) {
    const { originX: v = "50%", originY: p = "50%", originZ: y = 0 } = c;
    s.transformOrigin = `${v} ${p} ${y}`;
  }
}
function fS(n, { style: a, vars: i }, s, o) {
  const c = n.style;
  let h;
  for (h in a)
    c[h] = a[h];
  o?.applyProjectionStyles(c, s);
  for (h in i)
    c.setProperty(h, i[h]);
}
function D0(n, a) {
  return a.max === a.min ? 0 : n / (a.max - a.min) * 100;
}
const Vr = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (ge.test(n))
        n = parseFloat(n);
      else
        return n;
    const i = D0(n, a.target.x), s = D0(n, a.target.y);
    return `${i}% ${s}%`;
  }
}, JD = {
  correct: (n, { treeScale: a, projectionDelta: i }) => {
    const s = n, o = Un.parse(n);
    if (o.length > 5)
      return s;
    const c = Un.createTransformer(n), h = typeof o[0] != "number" ? 1 : 0, m = i.x.scale * a.x, v = i.y.scale * a.y;
    o[0 + h] /= m, o[1 + h] /= v;
    const p = os(m, v, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= p), typeof o[3 + h] == "number" && (o[3 + h] /= p), c(o);
  }
}, WD = {
  borderRadius: {
    ...Vr,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Vr,
  borderTopRightRadius: Vr,
  borderBottomLeftRadius: Vr,
  borderBottomRightRadius: Vr,
  boxShadow: JD
};
function dS(n, { layout: a, layoutId: i }) {
  return Bi.has(n) || n.startsWith("origin") || (a || i !== void 0) && (!!WD[n] || n === "opacity");
}
function Ch(n, a, i) {
  const s = n.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const h in s)
    (Ht(s[h]) || o && Ht(o[h]) || dS(h, n) || i?.getValue(h)?.liveStyle !== void 0) && (c[h] = s[h]);
  return c;
}
function ez(n) {
  return window.getComputedStyle(n);
}
class tz extends cS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = fS;
  }
  readValueFromInstance(a, i) {
    if (Bi.has(i))
      return this.projection?.isProjecting ? _d(i) : j3(a, i);
    {
      const s = ez(a), o = (Cx(i) ? s.getPropertyValue(i) : s[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: i }) {
    return KD(a, i);
  }
  build(a, i, s) {
    Th(a, i, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return Ch(a, i, s);
  }
}
const nz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, az = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function lz(n, a, i = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? nz : az;
  n[c.offset] = `${-s}`, n[c.array] = `${a} ${i}`;
}
const iz = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function hS(n, {
  attrX: a,
  attrY: i,
  attrScale: s,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, v, p, y) {
  if (Th(n, m, p), v) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: b, style: S } = n;
  b.transform && (S.transform = b.transform, delete b.transform), (S.transform || b.transformOrigin) && (S.transformOrigin = b.transformOrigin ?? "50% 50%", delete b.transformOrigin), S.transform && (S.transformBox = y?.transformBox ?? "fill-box", delete b.transformBox);
  for (const w of iz)
    b[w] !== void 0 && (S[w] = b[w], delete b[w]);
  a !== void 0 && (b.x = a), i !== void 0 && (b.y = i), s !== void 0 && (b.scale = s), o !== void 0 && lz(b, o, c, h, !1);
}
const mS = /* @__PURE__ */ new Set([
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
]), pS = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function rz(n, a, i, s) {
  fS(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(mS.has(o) ? o : Sh(o), a.attrs[o]);
}
function vS(n, a, i) {
  const s = Ch(n, a, i);
  for (const o in n)
    if (Ht(n[o]) || Ht(a[o])) {
      const c = Vi.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = n[o];
    }
  return s;
}
class sz extends cS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = rS;
  }
  getBaseTargetFromProps(a, i) {
    return a[i];
  }
  readValueFromInstance(a, i) {
    if (Bi.has(i)) {
      const s = tS(i);
      return s && s.default || 0;
    }
    return i = mS.has(i) ? i : Sh(i), a.getAttribute(i);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return vS(a, i, s);
  }
  build(a, i, s) {
    hS(a, i, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, i, s, o) {
    rz(a, i, s, o);
  }
  mount(a) {
    this.isSVGTag = pS(a.tagName), super.mount(a);
  }
}
const oz = jh.length;
function gS(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const i = n.parent ? gS(n.parent) || {} : {};
    return n.props.initial !== void 0 && (i.initial = n.props.initial), i;
  }
  const a = {};
  for (let i = 0; i < oz; i++) {
    const s = jh[i], o = n.props[s];
    (Jr(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function yS(n, a) {
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
const uz = [...wh].reverse(), cz = wh.length;
function fz(n) {
  return (a) => Promise.all(a.map(({ animation: i, options: s }) => pD(n, i, s)));
}
function dz(n) {
  let a = fz(n), i = z0(), s = !0, o = !1;
  const c = (p) => (y, b) => {
    const S = zl(n, b, p === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: w, transitionEnd: j, ...T } = S;
      y = { ...y, ...T, ...j };
    }
    return y;
  };
  function h(p) {
    a = p(n);
  }
  function m(p) {
    const { props: y } = n, b = gS(n.parent) || {}, S = [], w = /* @__PURE__ */ new Set();
    let j = {}, T = 1 / 0;
    for (let O = 0; O < cz; O++) {
      const D = uz[O], z = i[D], k = y[D] !== void 0 ? y[D] : b[D], J = Jr(k), I = D === p ? z.isActive : null;
      I === !1 && (T = O);
      let W = k === b[D] && k !== y[D] && J;
      if (W && (s || o) && n.manuallyAnimateOnMount && (W = !1), z.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !z.isActive && I === null || // If we didn't and don't have any defined prop for this animation type
      !k && !z.prevProp || // Or if the prop doesn't define an animation
      gu(k) || typeof k == "boolean")
        continue;
      if (D === "exit" && z.isActive && I !== !0) {
        z.prevResolvedValues && (j = {
          ...j,
          ...z.prevResolvedValues
        });
        continue;
      }
      const M = hz(z.prevProp, k);
      let V = M || // If we're making this variant active, we want to always make it active
      D === p && z.isActive && !W && J || // If we removed a higher-priority variant (i is in reverse order)
      O > T && J, P = !1;
      const oe = Array.isArray(k) ? k : [k];
      let ue = oe.reduce(c(D), {});
      I === !1 && (ue = {});
      const { prevResolvedValues: Ee = {} } = z, we = {
        ...Ee,
        ...ue
      }, re = (Y) => {
        V = !0, w.has(Y) && (P = !0, w.delete(Y)), z.needsAnimating[Y] = !0;
        const Q = n.getValue(Y);
        Q && (Q.liveStyle = !1);
      };
      for (const Y in we) {
        const Q = ue[Y], ne = Ee[Y];
        if (j.hasOwnProperty(Y))
          continue;
        let C = !1;
        Vd(Q) && Vd(ne) ? C = !yS(Q, ne) : C = Q !== ne, C ? Q != null ? re(Y) : w.add(Y) : Q !== void 0 && w.has(Y) ? re(Y) : z.protectedKeys[Y] = !0;
      }
      z.prevProp = k, z.prevResolvedValues = ue, z.isActive && (j = { ...j, ...ue }), (s || o) && n.blockInitialAnimation && (V = !1);
      const q = W && M;
      V && (!q || P) && S.push(...oe.map((Y) => {
        const Q = { type: D };
        if (typeof Y == "string" && (s || o) && !q && n.manuallyAnimateOnMount && n.parent) {
          const { parent: ne } = n, C = zl(ne, Y);
          if (ne.enteringChildren && C) {
            const { delayChildren: K } = C.transition || {};
            Q.delay = Xx(ne.enteringChildren, n, K);
          }
        }
        return {
          animation: Y,
          options: Q
        };
      }));
    }
    if (w.size) {
      const O = {};
      if (typeof y.initial != "boolean") {
        const D = zl(n, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        D && D.transition && (O.transition = D.transition);
      }
      w.forEach((D) => {
        const z = n.getBaseTarget(D), k = n.getValue(D);
        k && (k.liveStyle = !0), O[D] = z ?? null;
      }), S.push({ animation: O });
    }
    let R = !!S.length;
    return s && (y.initial === !1 || y.initial === y.animate) && !n.manuallyAnimateOnMount && (R = !1), s = !1, o = !1, R ? a(S) : Promise.resolve();
  }
  function v(p, y) {
    if (i[p].isActive === y)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(p, y)), i[p].isActive = y;
    const b = m(p);
    for (const S in i)
      i[S].protectedKeys = {};
    return b;
  }
  return {
    animateChanges: m,
    setActive: v,
    setAnimateFunction: h,
    getState: () => i,
    reset: () => {
      i = z0(), o = !0;
    }
  };
}
function hz(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !yS(a, n) : !1;
}
function Cl(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function z0() {
  return {
    animate: Cl(!0),
    whileInView: Cl(),
    whileHover: Cl(),
    whileTap: Cl(),
    whileDrag: Cl(),
    whileFocus: Cl(),
    exit: Cl()
  };
}
function O0(n, a, i, s = { passive: !0 }) {
  return n.addEventListener(a, i, s), () => n.removeEventListener(a, i);
}
function mz(n) {
  return Ht(n) ? n.get() : n;
}
const Mh = x.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function L0(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function pz(...n) {
  return (a) => {
    let i = !1;
    const s = n.map((o) => {
      const c = L0(o, a);
      return !i && typeof c == "function" && (i = !0), c;
    });
    if (i)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : L0(n[o], null);
        }
      };
  };
}
function vz(...n) {
  return x.useCallback(pz(...n), n);
}
class gz extends x.Component {
  getSnapshotBeforeUpdate(a) {
    const i = this.props.childRef.current;
    if (Io(i) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = i.offsetParent, o = Io(s) && s.offsetWidth || 0, c = Io(s) && s.offsetHeight || 0, h = getComputedStyle(i), m = this.props.sizeRef.current;
      m.height = parseFloat(h.height), m.width = parseFloat(h.width), m.top = i.offsetTop, m.left = i.offsetLeft, m.right = o - m.width - m.left, m.bottom = c - m.height - m.top;
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
function yz({ children: n, isPresent: a, anchorX: i, anchorY: s, root: o, pop: c }) {
  const h = x.useId(), m = x.useRef(null), v = x.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = x.useContext(Mh), y = n.props?.ref ?? n?.ref, b = vz(m, y);
  return x.useInsertionEffect(() => {
    const { width: S, height: w, top: j, left: T, right: R, bottom: O } = v.current;
    if (a || c === !1 || !m.current || !S || !w)
      return;
    const D = i === "left" ? `left: ${T}` : `right: ${R}`, z = s === "bottom" ? `bottom: ${O}` : `top: ${j}`;
    m.current.dataset.motionPopId = h;
    const k = document.createElement("style");
    p && (k.nonce = p);
    const J = o ?? document.head;
    return J.appendChild(k), k.sheet && k.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${w}px !important;
            ${D}px !important;
            ${z}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), J.contains(k) && J.removeChild(k);
    };
  }, [a]), d.jsx(gz, { isPresent: a, childRef: m, sizeRef: v, pop: c, children: c === !1 ? n : x.cloneElement(n, { ref: b }) });
}
const bz = ({ children: n, initial: a, isPresent: i, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: h, anchorX: m, anchorY: v, root: p }) => {
  const y = ch(xz), b = x.useId();
  let S = !0, w = x.useMemo(() => (S = !1, {
    id: b,
    initial: a,
    isPresent: i,
    custom: o,
    onExitComplete: (j) => {
      y.set(j, !0);
      for (const T of y.values())
        if (!T)
          return;
      s && s();
    },
    register: (j) => (y.set(j, !1), () => y.delete(j))
  }), [i, y, s]);
  return c && S && (w = { ...w }), x.useMemo(() => {
    y.forEach((j, T) => y.set(T, !1));
  }, [i]), x.useEffect(() => {
    !i && !y.size && s && s();
  }, [i]), n = d.jsx(yz, { pop: h === "popLayout", isPresent: i, anchorX: m, anchorY: v, root: p, children: n }), d.jsx(mu.Provider, { value: w, children: n });
};
function xz() {
  return /* @__PURE__ */ new Map();
}
function Sz(n = !0) {
  const a = x.useContext(mu);
  if (a === null)
    return [!0, null];
  const { isPresent: i, onExitComplete: s, register: o } = a, c = x.useId();
  x.useEffect(() => {
    if (n)
      return o(c);
  }, [n]);
  const h = x.useCallback(() => n && s && s(c), [c, s, n]);
  return !i && s ? [!1, h] : [!0];
}
const Bo = (n) => n.key || "";
function U0(n) {
  const a = [];
  return x.Children.forEach(n, (i) => {
    x.isValidElement(i) && a.push(i);
  }), a;
}
const Ez = ({ children: n, custom: a, initial: i = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: h = !1, anchorX: m = "left", anchorY: v = "top", root: p }) => {
  const [y, b] = Sz(h), S = x.useMemo(() => U0(n), [n]), w = h && !y ? [] : S.map(Bo), j = x.useRef(!0), T = x.useRef(S), R = ch(() => /* @__PURE__ */ new Map()), O = x.useRef(/* @__PURE__ */ new Set()), [D, z] = x.useState(S), [k, J] = x.useState(S);
  ox(() => {
    j.current = !1, T.current = S;
    for (let M = 0; M < k.length; M++) {
      const V = Bo(k[M]);
      w.includes(V) ? (R.delete(V), O.current.delete(V)) : R.get(V) !== !0 && R.set(V, !1);
    }
  }, [k, w.length, w.join("-")]);
  const I = [];
  if (S !== D) {
    let M = [...S];
    for (let V = 0; V < k.length; V++) {
      const P = k[V], oe = Bo(P);
      w.includes(oe) || (M.splice(V, 0, P), I.push(P));
    }
    return c === "wait" && I.length && (M = I), J(U0(M)), z(S), null;
  }
  const { forceRender: W } = x.useContext(sx);
  return d.jsx(d.Fragment, { children: k.map((M) => {
    const V = Bo(M), P = h && !y ? !1 : S === k || w.includes(V), oe = () => {
      if (O.current.has(V))
        return;
      if (R.has(V))
        O.current.add(V), R.set(V, !0);
      else
        return;
      let ue = !0;
      R.forEach((Ee) => {
        Ee || (ue = !1);
      }), ue && (W?.(), J(T.current), h && b?.(), s && s());
    };
    return d.jsx(bz, { isPresent: P, initial: !j.current || i ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: p, onExitComplete: P ? void 0 : oe, anchorX: m, anchorY: v, children: M }, V);
  }) });
}, Nh = x.createContext({ strict: !1 }), V0 = {
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
let B0 = !1;
function wz() {
  if (B0)
    return;
  const n = {};
  for (const a in V0)
    n[a] = {
      isEnabled: (i) => V0[a].some((s) => !!i[s])
    };
  uS(n), B0 = !0;
}
function bS() {
  return wz(), FD();
}
function $d(n) {
  const a = bS();
  for (const i in n)
    a[i] = {
      ...a[i],
      ...n[i]
    };
  uS(a);
}
function xS({ children: n, features: a, strict: i = !1 }) {
  const [, s] = x.useState(!cd(a)), o = x.useRef(void 0);
  if (!cd(a)) {
    const { renderer: c, ...h } = a;
    o.current = c, $d(h);
  }
  return x.useEffect(() => {
    cd(a) && a().then(({ renderer: c, ...h }) => {
      $d(h), o.current = c, s(!0);
    });
  }, []), d.jsx(Nh.Provider, { value: { renderer: o.current, strict: i }, children: n });
}
function cd(n) {
  return typeof n == "function";
}
const jz = /* @__PURE__ */ new Set([
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
function iu(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || jz.has(n);
}
let SS = (n) => !iu(n);
function Tz(n) {
  typeof n == "function" && (SS = (a) => a.startsWith("on") ? !iu(a) : n(a));
}
try {
  Tz(require("@emotion/is-prop-valid").default);
} catch {
}
function Cz(n, a, i) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || Ht(n[o]) || (SS(o) || i === !0 && iu(o) || !a && !iu(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const bu = /* @__PURE__ */ x.createContext({});
function Mz(n, a) {
  if (yu(n)) {
    const { initial: i, animate: s } = n;
    return {
      initial: i === !1 || Jr(i) ? i : void 0,
      animate: Jr(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function Nz(n) {
  const { initial: a, animate: i } = Mz(n, x.useContext(bu));
  return x.useMemo(() => ({ initial: a, animate: i }), [k0(a), k0(i)]);
}
function k0(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Ah = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function ES(n, a, i) {
  for (const s in a)
    !Ht(a[s]) && !dS(s, i) && (n[s] = a[s]);
}
function Az({ transformTemplate: n }, a) {
  return x.useMemo(() => {
    const i = Ah();
    return Th(i, a, n), Object.assign({}, i.vars, i.style);
  }, [a]);
}
function Rz(n, a) {
  const i = n.style || {}, s = {};
  return ES(s, i, n), Object.assign(s, Az(n, a)), s;
}
function _z(n, a) {
  const i = {}, s = Rz(n, a);
  return n.drag && n.dragListener !== !1 && (i.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (i.tabIndex = 0), i.style = s, i;
}
const wS = () => ({
  ...Ah(),
  attrs: {}
});
function Dz(n, a, i, s) {
  const o = x.useMemo(() => {
    const c = wS();
    return hS(c, a, pS(s), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (n.style) {
    const c = {};
    ES(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const zz = [
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
function Rh(n) {
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
      !!(zz.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function Oz(n, a, i, { latestValues: s }, o, c = !1, h) {
  const v = (h ?? Rh(n) ? Dz : _z)(a, s, o, n), p = Cz(a, typeof n == "string", c), y = n !== x.Fragment ? { ...p, ...v, ref: i } : {}, { children: b } = a, S = x.useMemo(() => Ht(b) ? b.get() : b, [b]);
  return x.createElement(n, {
    ...y,
    children: S
  });
}
function Lz({ scrapeMotionValuesFromProps: n, createRenderState: a }, i, s, o) {
  return {
    latestValues: Uz(i, s, o, n),
    renderState: a()
  };
}
function Uz(n, a, i, s) {
  const o = {}, c = s(n, {});
  for (const S in c)
    o[S] = mz(c[S]);
  let { initial: h, animate: m } = n;
  const v = yu(n), p = sS(n);
  a && p && !v && n.inherit !== !1 && (h === void 0 && (h = a.initial), m === void 0 && (m = a.animate));
  let y = i ? i.initial === !1 : !1;
  y = y || h === !1;
  const b = y ? m : h;
  if (b && typeof b != "boolean" && !gu(b)) {
    const S = Array.isArray(b) ? b : [b];
    for (let w = 0; w < S.length; w++) {
      const j = xh(n, S[w]);
      if (j) {
        const { transitionEnd: T, transition: R, ...O } = j;
        for (const D in O) {
          let z = O[D];
          if (Array.isArray(z)) {
            const k = y ? z.length - 1 : 0;
            z = z[k];
          }
          z !== null && (o[D] = z);
        }
        for (const D in T)
          o[D] = T[D];
      }
    }
  }
  return o;
}
const jS = (n) => (a, i) => {
  const s = x.useContext(bu), o = x.useContext(mu), c = () => Lz(n, a, s, o);
  return i ? c() : ch(c);
}, Vz = /* @__PURE__ */ jS({
  scrapeMotionValuesFromProps: Ch,
  createRenderState: Ah
}), Bz = /* @__PURE__ */ jS({
  scrapeMotionValuesFromProps: vS,
  createRenderState: wS
}), kz = Symbol.for("motionComponentSymbol");
function qz(n, a, i) {
  const s = x.useRef(i);
  x.useInsertionEffect(() => {
    s.current = i;
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
const Hz = x.createContext({});
function $z(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function Yz(n, a, i, s, o, c) {
  const { visualElement: h } = x.useContext(bu), m = x.useContext(Nh), v = x.useContext(mu), p = x.useContext(Mh), y = p.reducedMotion, b = p.skipAnimations, S = x.useRef(null), w = x.useRef(!1);
  s = s || m.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: h,
    props: i,
    presenceContext: v,
    blockInitialAnimation: v ? v.initial === !1 : !1,
    reducedMotionConfig: y,
    skipAnimations: b,
    isSVG: c
  }), w.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const j = S.current, T = x.useContext(Hz);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && Fz(S.current, i, o, T);
  const R = x.useRef(!1);
  x.useInsertionEffect(() => {
    j && R.current && j.update(i, v);
  });
  const O = i[Px], D = x.useRef(!!O && typeof window < "u" && !window.MotionHandoffIsComplete?.(O) && window.MotionHasOptimisedAnimation?.(O));
  return ox(() => {
    w.current = !0, j && (R.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), D.current && j.animationState && j.animationState.animateChanges());
  }), x.useEffect(() => {
    j && (!D.current && j.animationState && j.animationState.animateChanges(), D.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(O);
    }), D.current = !1), j.enteringChildren = void 0);
  }), j;
}
function Fz(n, a, i, s) {
  const { layoutId: o, layout: c, drag: h, dragConstraints: m, layoutScroll: v, layoutRoot: p, layoutAnchor: y, layoutCrossfade: b } = a;
  n.projection = new i(n.latestValues, a["data-framer-portal-id"] ? void 0 : TS(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!h || m && $z(m),
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
    crossfade: b,
    layoutScroll: v,
    layoutRoot: p,
    layoutAnchor: y
  });
}
function TS(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : TS(n.parent);
}
function fd(n, { forwardMotionProps: a = !1, type: i } = {}, s, o) {
  s && $d(s);
  const c = i ? i === "svg" : Rh(n), h = c ? Bz : Vz;
  function m(p, y) {
    let b;
    const S = {
      ...x.useContext(Mh),
      ...p,
      layoutId: Gz(p)
    }, { isStatic: w } = S, j = Nz(p), T = h(p, w);
    if (!w && typeof window < "u") {
      Xz();
      const R = Iz(S);
      b = R.MeasureLayout, j.visualElement = Yz(n, T, S, o, R.ProjectionNode, c);
    }
    return d.jsxs(bu.Provider, { value: j, children: [b && j.visualElement ? d.jsx(b, { visualElement: j.visualElement, ...S }) : null, Oz(n, p, qz(T, j.visualElement, y), T, w, a, c)] });
  }
  m.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const v = x.forwardRef(m);
  return v[kz] = n, v;
}
function Gz({ layoutId: n }) {
  const a = x.useContext(sx).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function Xz(n, a) {
  x.useContext(Nh).strict;
}
function Iz(n) {
  const a = bS(), { drag: i, layout: s } = a;
  if (!i && !s)
    return {};
  const o = { ...i, ...s };
  return {
    MeasureLayout: i?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function Kz(n, a) {
  if (typeof Proxy > "u")
    return fd;
  const i = /* @__PURE__ */ new Map(), s = (c, h) => fd(c, h, n, a), o = (c, h) => s(c, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, h) => h === "create" ? s : (i.has(h) || i.set(h, fd(h, void 0, n, a)), i.get(h))
  });
}
const CS = /* @__PURE__ */ Kz(), Qz = (n, a) => a.isSVG ?? Rh(n) ? new sz(a) : new tz(a, {
  allowProjection: n !== x.Fragment
});
class Zz extends ki {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = dz(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    gu(a) && (this.unmountControls = a.subscribe(this.node));
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
let Pz = 0;
class Jz extends ki {
  constructor() {
    super(...arguments), this.id = Pz++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: i } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: c, custom: h } = this.node.getProps();
        if (typeof c == "string") {
          const m = zl(this.node, c, h);
          if (m) {
            const { transition: v, transitionEnd: p, ...y } = m;
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
const Wz = {
  animation: {
    Feature: Zz
  },
  exit: {
    Feature: Jz
  }
};
function MS(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
function q0(n, a, i) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, c = s[o];
  c && Tn.postRender(() => c(a, MS(a)));
}
class eO extends ki {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = DD(a, (i, s) => (q0(this.node, s, "Start"), (o) => q0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class tO extends ki {
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
    this.unmount = pu(O0(this.node.current, "focus", () => this.onFocus()), O0(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function H0(n, a, i) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), c = s[o];
  c && Tn.postRender(() => c(a, MS(a)));
}
class nO extends ki {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: i, propagate: s } = this.node.props;
    this.unmount = VD(a, (o, c) => (H0(this.node, c, "Start"), (h, { success: m }) => H0(this.node, h, m ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Yd = /* @__PURE__ */ new WeakMap(), dd = /* @__PURE__ */ new WeakMap(), aO = (n) => {
  const a = Yd.get(n.target);
  a && a(n);
}, lO = (n) => {
  n.forEach(aO);
};
function iO({ root: n, ...a }) {
  const i = n || document;
  dd.has(i) || dd.set(i, {});
  const s = dd.get(i), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(lO, { root: n, ...a })), s[o];
}
function rO(n, a, i) {
  const s = iO(a);
  return Yd.set(n, i), s.observe(n), () => {
    Yd.delete(n), s.unobserve(n);
  };
}
const sO = {
  some: 0,
  all: 1
};
class oO extends ki {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: i, margin: s, amount: o = "some", once: c } = a, h = {
      root: i ? i.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : sO[o]
    }, m = (v) => {
      const { isIntersecting: p } = v;
      if (this.isInView === p || (this.isInView = p, c && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: y, onViewportLeave: b } = this.node.getProps(), S = p ? y : b;
      S && S(v);
    };
    this.stopObserver = rO(this.node.current, h, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(uO(a, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function uO({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (i) => n[i] !== a[i];
}
const cO = {
  inView: {
    Feature: oO
  },
  tap: {
    Feature: nO
  },
  focus: {
    Feature: tO
  },
  hover: {
    Feature: eO
  }
}, NS = {
  renderer: Qz,
  ...Wz,
  ...cO
};
var fO = "_1oor31e0", dO = "_1oor31e1", hO = "_1oor31e2", mO = "_1oor31e3", pO = "_1oor31e4", vO = "_1oor31e5", gO = "_1oor31e6", yO = "_1oor31e7", bO = "_1oor31e8";
const xO = 8;
function SO(n) {
  const { entries: a, loading: i, error: s } = n;
  return /* @__PURE__ */ d.jsxs("div", { className: fO, "aria-busy": !!i, children: [
    s && /* @__PURE__ */ d.jsx(cn, { severity: "error", children: s }),
    i && !s && /* @__PURE__ */ d.jsx("div", { className: bO, "aria-live": "polite", children: "Loading edit history…" }),
    !i && !s && a.length === 0 && /* @__PURE__ */ d.jsx("div", { className: yO, children: "No edits yet" }),
    !i && !s && a.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: dO, children: a.map((o) => /* @__PURE__ */ d.jsxs("li", { className: hO, children: [
      /* @__PURE__ */ d.jsx("span", { className: mO, children: wO(o.recorded_at) }),
      /* @__PURE__ */ d.jsx("span", { className: pO, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ d.jsx("span", { className: vO, title: o.digest_after, children: EO(o.digest_after) }),
      /* @__PURE__ */ d.jsx("span", { className: gO, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function EO(n) {
  return n ? `${n.slice(0, xO)}…` : "—";
}
function wO(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var $0 = "_1c63kaw0", jO = "_1c63kaw1", TO = "_1c63kaw2", CO = "_1c63kaw3", MO = "_1c63kaw4", NO = "_1c63kaw5", AO = "_1c63kaw6", RO = "_1c63kaw7";
function _O({ chain: n, onRemoveOp: a }) {
  return n.ops.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: $0, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ d.jsx("span", { className: jO, children: "No edits yet" }) }) : /* @__PURE__ */ d.jsx("ol", { className: $0, "data-testid": "edit-chain-list", children: n.ops.map((i, s) => /* @__PURE__ */ d.jsxs("li", { className: TO, children: [
    /* @__PURE__ */ d.jsxs("span", { className: CO, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: MO, children: [
      /* @__PURE__ */ d.jsx("span", { className: NO, children: Y0(i) }),
      /* @__PURE__ */ d.jsx("span", { className: AO, children: DO(i) })
    ] }),
    /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: RO,
        onClick: () => a(i.id),
        "aria-label": `Remove ${Y0(i)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, i.id)) });
}
function Y0(n) {
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
  }
}
function DO(n) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${F0(n.start_ms)} → ${F0(n.end_ms)}`;
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
      return `${hd(n.low_db)} / ${hd(n.mid_db)} / ${hd(n.high_db)}`;
    case "pitch_shift":
      return `${n.semitones >= 0 ? "+" : ""}${n.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${n.threshold_db.toFixed(0)} dB`;
  }
}
function hd(n) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(0)}`;
}
function F0(n) {
  return !Number.isFinite(n) || n < 0 ? "0.00s" : `${(n / 1e3).toFixed(2)}s`;
}
var ko = "_1o3ytop0", G0 = "_1o3ytop1", zO = "_1o3ytop2", qo = "_1o3ytop3", OO = "_1o3ytop4", LO = "_1o3ytopa", UO = "_1o3ytopb", VO = "_1o3ytopc", BO = "_1o3ytopd", kO = "_1o3ytope", qO = "_1o3ytopf";
const X0 = -16;
function HO(n) {
  const { voiceAsset: a, deploymentId: i, onChainPersisted: s, onError: o } = n, c = a.durationMs ?? 0, h = x.useMemo(
    () => $O(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [m, v] = x.useState(() => md(c)), [p, y] = x.useState(hu), [b, S] = x.useState(!1), [w, j] = x.useState(null), [T, R] = x.useState(null), [O, D] = x.useState(!1), [z, k] = x.useState(!1), [J, I] = x.useState(!1), [W, M] = x.useState(null), [V, P] = x.useState([]), [oe, ue] = x.useState(null), [Ee, we] = x.useState([]), [re, q] = x.useState(!1), [B, Y] = x.useState(null), [Q, ne] = x.useState(0), C = x.useRef(null), K = x.useRef(null), le = x.useRef(null), ce = x.useRef(null), xe = x.useRef(null), Ce = x.useRef(0), se = x.useMemo(
    () => m.ops.some((he) => he.mode === "normalize"),
    [m.ops]
  );
  x.useEffect(() => {
    const he = md(c);
    v(he), y(Kb(he)), j(null), I(!1), P([]), ue(null), xe.current = null;
  }, [a.voiceAssetId, c]);
  const _e = x.useCallback((he) => {
    y(he), v((Ae) => Ib(Ae, he));
  }, []);
  x.useEffect(() => {
    ce.current?.abort();
    const he = new AbortController();
    return ce.current = he, q(!0), Y(null), lM(i, "voice_asset", a.voiceAssetId, 50, {
      signal: he.signal
    }).then((Ae) => {
      he.signal.aborted || we(Ae.entries);
    }).catch((Ae) => {
      if (he.signal.aborted) return;
      const Ye = Ae instanceof Error ? Ae.message : "audit fetch failed";
      Y(Ye);
    }).finally(() => {
      he.signal.aborted || q(!1);
    }), () => he.abort();
  }, [i, a.voiceAssetId, Q]), x.useEffect(() => () => {
    T && URL.revokeObjectURL(T);
  }, [T]), x.useEffect(() => () => {
    K.current?.abort(), le.current?.abort(), ce.current?.abort();
  }, []);
  const Ne = m.ops.find((he) => he.mode === "trim"), Fe = m.ops.find((he) => he.mode === "normalize"), Lt = Ne?.start_ms ?? 0, Gt = Ne?.end_ms ?? Math.max(1, c), ut = x.useCallback((he, Ae) => {
    v(
      (Ye) => I0(
        Ye,
        "trim",
        (dt) => ({
          ...dt,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(he)),
          end_ms: Math.max(Math.floor(he) + 1, Math.floor(Ae))
        })
      )
    );
  }, []), Ut = x.useCallback(
    (he) => ut(he, Gt),
    [Gt, ut]
  ), ya = x.useCallback(
    (he) => ut(Lt, he),
    [Lt, ut]
  ), ll = x.useCallback((he) => {
    v((Ae) => {
      const Ye = Ae.ops.filter((dt) => dt.mode !== "normalize");
      if (he) {
        const dt = {
          id: Jt(),
          mode: "normalize",
          target_lufs: X0
        };
        return { ...Ae, ops: [...Ye, dt] };
      }
      return { ...Ae, ops: Ye };
    });
  }, []), Nn = x.useCallback(
    (he) => {
      const Ae = m.ops.findIndex((fn) => fn.id === he);
      if (Ae === -1) return;
      const Ye = m.ops[Ae];
      if (!Ye) return;
      const dt = [...m.ops.slice(0, Ae), ...m.ops.slice(Ae + 1)];
      v({ ...m, ops: dt }), P((fn) => [...fn, { op: Ye, index: Ae }]);
    },
    [m]
  ), Ul = x.useCallback(() => {
    const he = V[V.length - 1];
    if (!he) return;
    const Ae = Math.min(he.index, m.ops.length), Ye = [...m.ops.slice(0, Ae), he.op, ...m.ops.slice(Ae)];
    v({ ...m, ops: Ye }), P(V.slice(0, -1));
  }, [m, V]), Bn = x.useCallback(() => {
    const he = kb(m, c);
    return he ? (j(he.message), !1) : (j(null), !0);
  }, [m, c]), ba = x.useCallback(async () => {
    if (!Bn() || O) return;
    K.current?.abort();
    const he = new AbortController();
    K.current = he;
    const Ae = ++Ce.current;
    k(!0);
    try {
      const Ye = await aM(a.voiceAssetId, i, m, {
        signal: he.signal
      });
      if (he.signal.aborted || Ae !== Ce.current) return;
      T && URL.revokeObjectURL(T);
      const dt = URL.createObjectURL(Ye);
      R(dt), I(!0), requestAnimationFrame(() => C.current?.play().catch(() => {
      }));
    } catch (Ye) {
      if (he.signal.aborted) return;
      const dt = Ye instanceof Error ? Ye.message : "preview failed";
      j(dt), o(dt);
    } finally {
      he.signal.aborted || k(!1);
    }
  }, [Bn, O, a.voiceAssetId, i, m, T, o]), il = x.useCallback(async () => {
    if (!Bn() || z || O) return;
    K.current?.abort(), le.current?.abort();
    const he = new AbortController();
    le.current = he, D(!0);
    try {
      const Ae = xe.current ?? void 0, Ye = await tM(
        a.voiceAssetId,
        i,
        Ae ? { chain: m, digest_before: Ae } : { chain: m },
        { signal: he.signal }
      );
      if (he.signal.aborted) return;
      xe.current = Ye.chain_digest, ue(Ye.chain_digest), j(null), M(Ye.measured_lufs ?? null), P([]), s(Ye), ne((dt) => dt + 1);
    } catch (Ae) {
      if (he.signal.aborted) return;
      const Ye = Ae instanceof Ri;
      Ae instanceof Ri && (xe.current = Ae.currentDigest || null);
      const dt = Ye ? "Edit chain has changed in another tab. Reload to continue." : Ae instanceof Error ? Ae.message : "apply failed";
      j(dt), o(dt);
    } finally {
      he.signal.aborted || D(!1);
    }
  }, [
    Bn,
    z,
    O,
    a.voiceAssetId,
    i,
    m,
    s,
    o
  ]), qi = x.useCallback(() => {
    K.current?.abort(), v(md(c)), j(null), M(null), I(!1), P([]), ne((he) => he + 1), T && (URL.revokeObjectURL(T), R(null));
  }, [c, T]), Hi = x.useCallback((he) => {
    v(
      (Ae) => I0(
        Ae,
        "normalize",
        (Ye) => ({
          ...Ye,
          mode: "normalize",
          target_lufs: he
        })
      )
    );
  }, []);
  return /* @__PURE__ */ d.jsxs(lx, { variant: "standalone", children: [
    /* @__PURE__ */ d.jsx(
      ix,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${Ho(c)}`
      }
    ),
    /* @__PURE__ */ d.jsx(
      nx,
      {
        audioUrl: h,
        durationMs: Math.max(1, c),
        startMs: Lt,
        endMs: Gt,
        onChangeStart: Ut,
        onChangeEnd: ya
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: ko, children: [
      /* @__PURE__ */ d.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ d.jsxs("span", { className: G0, children: [
        Ho(Lt),
        " → ",
        Ho(Gt),
        " · ",
        Ho(Gt - Lt)
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: zO, children: [
      /* @__PURE__ */ d.jsxs("div", { className: qo, children: [
        /* @__PURE__ */ d.jsxs("span", { className: ko, children: [
          /* @__PURE__ */ d.jsx("span", { children: "Normalize loudness" }),
          se && Fe && /* @__PURE__ */ d.jsxs("span", { className: LO, children: [
            "target ",
            Fe.target_lufs.toFixed(1),
            " LUFS",
            W !== null && ` · measured ${W.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: OO, children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: se,
              onChange: (he) => ll(he.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { children: [
            "Target ",
            X0.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        se && Fe && /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "range",
            className: VO,
            min: -30,
            max: -6,
            step: 0.5,
            value: Fe.target_lufs,
            onChange: (he) => Hi(Number(he.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: qo, children: [
        /* @__PURE__ */ d.jsxs("span", { className: ko, children: [
          "Operations · ",
          m.ops.length
        ] }),
        /* @__PURE__ */ d.jsx(_O, { chain: m, onRemoveOp: Nn })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: qo, children: [
        /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            onClick: () => S((he) => !he),
            style: {
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em"
            },
            "aria-expanded": b,
            children: [
              b ? "▾" : "▸",
              " Advanced effects · gain · eq · pitch · fade · silence trim"
            ]
          }
        ),
        b && /* @__PURE__ */ d.jsx(
          uh,
          {
            state: p,
            onChange: _e,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      oe && /* @__PURE__ */ d.jsx("div", { className: qo, children: /* @__PURE__ */ d.jsxs("span", { className: ko, children: [
        /* @__PURE__ */ d.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ d.jsxs(
          "span",
          {
            className: G0,
            style: { color: "var(--secondary)" },
            title: oe,
            children: [
              oe.slice(0, 12),
              "…"
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ d.jsxs(rx, { children: [
      /* @__PURE__ */ d.jsx(
        Qe,
        {
          variant: "secondary",
          onClick: () => void ba(),
          disabled: z || O,
          children: z ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ d.jsx(
        Qe,
        {
          onClick: () => void il(),
          disabled: O || z,
          children: O ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ d.jsx(
        Qe,
        {
          variant: "ghost",
          onClick: qi,
          disabled: O || z,
          children: "Reset"
        }
      ),
      V.length > 0 && /* @__PURE__ */ d.jsxs(
        Qe,
        {
          variant: "ghost",
          size: "sm",
          onClick: Ul,
          disabled: O || z,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            V.length,
            ")"
          ]
        }
      ),
      J && /* @__PURE__ */ d.jsx(
        "span",
        {
          className: qO,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    T && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ d.jsx(
      "audio",
      {
        ref: C,
        src: T,
        controls: !0,
        className: UO,
        "aria-label": "Edit preview"
      }
    ),
    w && /* @__PURE__ */ d.jsx(cn, { severity: "error", children: w }),
    /* @__PURE__ */ d.jsxs("details", { className: BO, children: [
      /* @__PURE__ */ d.jsxs("summary", { className: kO, children: [
        "Edit history",
        Ee.length > 0 ? ` · ${Ee.length}` : ""
      ] }),
      /* @__PURE__ */ d.jsx(
        SO,
        {
          entries: Ee,
          loading: re,
          error: B
        }
      )
    ] })
  ] });
}
function md(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Jt(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function I0(n, a, i) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Jt(), mode: a };
    return { ...n, ops: [...n.ops, i(c)] };
  }
  const o = [...n.ops];
  return o[s] = i(o[s]), { ...n, ops: o };
}
function Ho(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
function $O(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var YO = "go9vi12", FO = "go9vi13", GO = "go9vi14", XO = "go9vi15", IO = "go9vi16", KO = "go9vi17", QO = "go9vi18", ZO = "go9vi19", PO = "go9vi1a go9vi19", JO = "go9vi1b", WO = "go9vi1c", e4 = "go9vi1d", t4 = "go9vi1e", n4 = "go9vi1f", a4 = "go9vi1g", l4 = "go9vi1h", i4 = "go9vi1i", Ml = "go9vi1j", Br = "go9vi1k", Mi = "go9vi1l", r4 = "go9vi1m go9vi1l", s4 = "go9vi1n", o4 = "go9vi1o go9vi1n", u4 = "go9vi1p go9vi1n", c4 = "go9vi1q", f4 = "go9vi1r", d4 = "go9vi1s", h4 = "go9vi1t", AS = "go9vi1u", m4 = "go9vi1v", p4 = "go9vi1w", v4 = "go9vi1x go9vi1l", g4 = "go9vi1y", y4 = "go9vi1z", b4 = "go9vi110", x4 = "go9vi111", S4 = "go9vi112", E4 = "go9vi113";
const w4 = ["none", "audio_ref", "vector_preset", "qwen_template"];
function j4() {
  const { deployment: n, mappings: a, voiceAssets: i } = as(), [s, o] = x.useState(a), [c, h] = x.useState(i), [m, v] = x.useState(
    a[0]?.mappingId ?? null
  ), [p, y] = x.useState(""), [b, S] = x.useState(null), [w, j] = x.useState(null), [T, R] = x.useState(null), O = x.useMemo(() => {
    const B = /* @__PURE__ */ new Map();
    for (const Y of c) B.set(Y.voiceAssetId, Y);
    return B;
  }, [c]), D = x.useMemo(() => {
    const B = p.trim().toLowerCase();
    return B ? s.filter((Y) => Y.characterName.toLowerCase().includes(B)) : s;
  }, [s, p]), z = x.useMemo(
    () => s.find((B) => B.mappingId === m) ?? null,
    [s, m]
  );
  x.useEffect(() => {
    o(a), h(i), v(a[0]?.mappingId ?? null);
  }, [a, i]), x.useEffect(() => {
    if (!w) return;
    const B = setTimeout(() => j(null), 2600);
    return () => clearTimeout(B);
  }, [w]);
  const k = x.useCallback(async () => {
    const B = await Kr(n.deploymentId);
    h(B.voiceAssets);
  }, [n.deploymentId]), J = x.useCallback(
    (B) => {
      o(
        (Y) => Y.map((Q) => Q.mappingId === m ? { ...Q, ...B } : Q)
      );
    },
    [m]
  ), I = x.useCallback(
    async (B) => {
      if (!z) return;
      const Y = z;
      try {
        const Q = await bd(n.deploymentId, z.mappingId, B);
        o((ne) => ne.map((C) => C.mappingId === Q.mappingId ? Q : C));
      } catch (Q) {
        o(
          (ne) => ne.map((C) => C.mappingId === Y.mappingId ? Y : C)
        ), S(Ia(Q));
      }
    },
    [z, n.deploymentId]
  ), W = x.useCallback(async () => {
    const B = c[0];
    if (!B) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const Y = R4(s), Q = await ih(n.deploymentId, {
        characterName: Y,
        speakerVoiceAssetId: B.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((ne) => [...ne, Q]), v(Q.mappingId);
    } catch (Y) {
      S(Ia(Y));
    }
  }, [n.deploymentId, c, s]), M = x.useCallback(() => {
    z && R({ id: z.mappingId, name: z.characterName });
  }, [z]), V = x.useCallback(async () => {
    if (!T) return;
    const { id: B, name: Y } = T;
    R(null);
    try {
      await Ab(n.deploymentId, B), o((Q) => Q.filter((ne) => ne.mappingId !== B)), v(null), j(`Mapping for ${Y} deactivated.`);
    } catch (Q) {
      S(Ia(Q));
    }
  }, [n.deploymentId, T]), P = x.useCallback(
    async (B, Y, Q) => {
      try {
        const ne = await _b(n.deploymentId, B, Y, Q);
        return h((C) => [ne, ...C]), j(`${ne.displayName} uploaded.`), ne;
      } catch (ne) {
        return S(Ia(ne)), null;
      }
    },
    [n.deploymentId]
  ), oe = x.useCallback(async () => {
    try {
      const B = await bT(n.deploymentId);
      U4(B, `${n.deploymentId}-mappings.json`), j("Mappings exported to JSON.");
    } catch (B) {
      S(Ia(B));
    }
  }, [n.deploymentId]), ue = x.useCallback(
    async (B, Y) => {
      try {
        const Q = await xT(
          n.deploymentId,
          B.mappings,
          Y
        );
        j(
          `Imported ${Q.created.length} • skipped ${Q.skipped.length} • replaced ${Q.replaced.length}.`
        );
        const ne = await Kr(n.deploymentId);
        h(ne.voiceAssets);
      } catch (Q) {
        S(Ia(Q));
      }
    },
    [n.deploymentId]
  ), Ee = x.useCallback(
    async (B) => {
      if (await k(), z && B.chain_digest)
        try {
          const Y = await bd(n.deploymentId, z.mappingId, {
            voiceAssetChainDigest: B.chain_digest
          });
          o(
            (Q) => Q.map((ne) => ne.mappingId === Y.mappingId ? Y : ne)
          );
        } catch (Y) {
          S(Ia(Y));
        }
      j("Edit applied.");
    },
    [k, z, n.deploymentId]
  ), we = x.useCallback((B) => {
    S(B);
  }, []), re = x.useCallback(
    async (B, Y) => {
      if (!z) return null;
      const Q = B.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await jT(n.deploymentId, {
          line: Q,
          outputFormat: Y
        })).runId };
      } catch (ne) {
        return S(Ia(ne)), null;
      }
    },
    [n.deploymentId, z]
  ), q = c.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ d.jsxs("div", { className: YO, children: [
    /* @__PURE__ */ d.jsxs("aside", { className: FO, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ d.jsxs("header", { className: GO, children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("h1", { id: "mapping-sidebar-heading", className: XO, children: "Cast" }),
          /* @__PURE__ */ d.jsxs("span", { className: IO, children: [
            s.length,
            " active · ",
            c.length,
            " ",
            q
          ] })
        ] }),
        /* @__PURE__ */ d.jsx(Qe, { variant: "primary", size: "sm", onClick: W, children: "+ Add" })
      ] }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "search",
          className: KO,
          placeholder: "Search characters",
          value: p,
          onChange: (B) => y(B.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ d.jsx(A4, { onExport: oe, onImport: ue, onParseError: S }),
      /* @__PURE__ */ d.jsx("div", { className: QO, children: D.length === 0 ? /* @__PURE__ */ d.jsx(
        ls,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : D.map((B) => {
        const Y = O.get(B.speakerVoiceAssetId), Q = B.mappingId === m;
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: Q ? PO : ZO,
            onClick: () => v(B.mappingId),
            "aria-pressed": Q,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: JO, "aria-hidden": "true", children: _4(B.characterName) }),
              /* @__PURE__ */ d.jsxs("span", { className: WO, children: [
                /* @__PURE__ */ d.jsx("span", { className: e4, children: B.characterName }),
                /* @__PURE__ */ d.jsxs("span", { className: t4, children: [
                  B.defaultEmotionMode,
                  " · ",
                  Y?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          B.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: n4, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ d.jsx(xS, { features: NS, children: /* @__PURE__ */ d.jsx(Ez, { children: w && /* @__PURE__ */ d.jsx(
        CS.div,
        {
          className: m4,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: w
        },
        w
      ) }) }),
      b && /* @__PURE__ */ d.jsx(cn, { severity: "error", children: b }),
      T && /* @__PURE__ */ d.jsxs(cn, { severity: "warning", children: [
        /* @__PURE__ */ d.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          T.name,
          "?"
        ] }),
        /* @__PURE__ */ d.jsx(Qe, { variant: "danger", size: "sm", onClick: () => void V(), children: "Delete" }),
        /* @__PURE__ */ d.jsx(Qe, { variant: "ghost", size: "sm", onClick: () => R(null), children: "Cancel" })
      ] }),
      z ? /* @__PURE__ */ d.jsx(
        C4,
        {
          deploymentId: n.deploymentId,
          mapping: z,
          voiceAssets: c,
          onNameChange: (B) => {
            J({ characterName: B });
          },
          onNameBlur: (B) => {
            B !== z.characterName && B.trim() && I({ characterName: B.trim() });
          },
          onSpeakerChange: (B) => {
            J({ speakerVoiceAssetId: B }), I({ speakerVoiceAssetId: B });
          },
          onModeChange: (B) => {
            J({ defaultEmotionMode: B }), I({ defaultEmotionMode: B });
          },
          onQwenChange: (B) => {
            J({ defaultQwenTemplate: B });
          },
          onQwenBlur: (B) => {
            I({ defaultQwenTemplate: B });
          },
          onSpeedChange: (B) => {
            J({ defaultSpeedFactor: B });
          },
          onSpeedCommit: (B) => {
            I({ defaultSpeedFactor: B });
          },
          onEmotionVoiceChange: (B) => {
            const Y = B || null;
            J({ defaultEmotionVoiceAssetId: Y }), I({ defaultEmotionVoiceAssetId: Y });
          },
          onDelete: M,
          onUploadVoice: async (B, Y, Q) => {
            const ne = await P(B, Y, Q);
            return ne && Q === "speaker" && (J({ speakerVoiceAssetId: ne.voiceAssetId }), I({ speakerVoiceAssetId: ne.voiceAssetId })), await k(), ne;
          },
          onTestLine: re,
          onEditChainPersisted: Ee,
          onEditError: we
        },
        z.mappingId
      ) : /* @__PURE__ */ d.jsx(
        T4,
        {
          voiceCount: c.length,
          onUploadVoice: async (B) => {
            await P(B, B.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function T4({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ d.jsxs(ha, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ d.jsxs("div", { className: b4, children: [
      /* @__PURE__ */ d.jsx("p", { className: _l, children: "01 / Onboarding" }),
      /* @__PURE__ */ d.jsx("h2", { id: "onboarding-heading", className: x4, children: "Upload your first voice" }),
      /* @__PURE__ */ d.jsxs("p", { className: S4, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ d.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ d.jsx(
      RS,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (i) => (await a(i), null)
      }
    )
  ] }) : /* @__PURE__ */ d.jsx(ha, { density: "airy", children: /* @__PURE__ */ d.jsx(
    ls,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function C4(n) {
  const { mapping: a, voiceAssets: i } = n, s = i.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = i.find((T) => T.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [c, h] = x.useState(""), [m, v] = x.useState("mp3"), [p, y] = x.useState("idle"), [b, S] = x.useState(null), w = x.useRef(!1);
  x.useEffect(() => (w.current = !1, () => {
    w.current = !0;
  }), []);
  const j = x.useCallback(async () => {
    w.current = !1, y("running"), S(null);
    const T = await n.onTestLine(c, m);
    if (w.current) return;
    if (!T) {
      y("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: R } = T;
    for (let O = 0; O < 60; O += 1) {
      if (await new Promise((D) => setTimeout(D, 500)), w.current) return;
      try {
        const D = await rh(n.deploymentId, R);
        if (w.current) return;
        if (D.status === "completed") {
          y("done");
          return;
        }
        if (D.status === "failed" || D.status === "cancelled") {
          y("error"), S(`Run ${D.status}.`);
          return;
        }
      } catch (D) {
        if (w.current) return;
        y("error"), S(D instanceof Error ? D.message : "unknown error");
        return;
      }
    }
    w.current || (y("error"), S("test-line timed out after 30s"));
  }, [n.onTestLine, n.deploymentId, c, m]);
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("header", { className: a4, children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("p", { className: _l, children: "Character" }),
        /* @__PURE__ */ d.jsx("h2", { className: l4, children: a.characterName })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: AS, children: /* @__PURE__ */ d.jsx(Qe, { variant: "danger", size: "sm", onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ d.jsxs(
      ha,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: p4,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              className: v4,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: c,
              onChange: (T) => h(T.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: p === "running"
            }
          ),
          /* @__PURE__ */ d.jsxs(
            "select",
            {
              className: Mi,
              value: m,
              onChange: (T) => v(T.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: p === "running",
              children: [
                /* @__PURE__ */ d.jsx("option", { value: "mp3", children: "mp3" }),
                /* @__PURE__ */ d.jsx("option", { value: "wav", children: "wav" }),
                /* @__PURE__ */ d.jsx("option", { value: "flac", children: "flac" })
              ]
            }
          ),
          /* @__PURE__ */ d.jsx(
            Qe,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void j(),
              disabled: p === "running",
              children: p === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          p === "done" && /* @__PURE__ */ d.jsx(el, { tone: "success", children: "Synthesised — see host logs for output path." }),
          p === "error" && b && /* @__PURE__ */ d.jsx(el, { tone: "danger", children: b })
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: i4, children: [
      /* @__PURE__ */ d.jsxs(ha, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ d.jsx("h3", { id: "identity-heading", className: _l, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ d.jsxs("label", { className: Br, children: [
          /* @__PURE__ */ d.jsx("span", { className: Ml, children: "Character name" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              className: Mi,
              value: a.characterName,
              onChange: (T) => n.onNameChange(T.currentTarget.value),
              onBlur: (T) => n.onNameBlur(T.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: Br, children: [
          /* @__PURE__ */ d.jsx("span", { className: Ml, children: "Emotion mode" }),
          /* @__PURE__ */ d.jsx(
            "select",
            {
              className: Mi,
              value: a.defaultEmotionMode,
              onChange: (T) => n.onModeChange(T.currentTarget.value),
              children: w4.map((T) => /* @__PURE__ */ d.jsx("option", { value: T, children: D4(T) }, T))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ d.jsxs("label", { className: Br, children: [
          /* @__PURE__ */ d.jsxs("span", { className: Ml, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ d.jsx(
            "textarea",
            {
              className: r4,
              value: a.defaultQwenTemplate ?? "",
              onChange: (T) => n.onQwenChange(T.currentTarget.value),
              onBlur: (T) => n.onQwenBlur(T.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ d.jsxs("label", { className: Br, children: [
          /* @__PURE__ */ d.jsx("span", { className: Ml, children: "Emotion reference" }),
          /* @__PURE__ */ d.jsxs(
            "select",
            {
              className: Mi,
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
        /* @__PURE__ */ d.jsxs("label", { className: Br, children: [
          /* @__PURE__ */ d.jsxs("span", { className: Ml, children: [
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
      /* @__PURE__ */ d.jsxs(ha, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ d.jsx("h3", { id: "voice-heading", className: _l, children: "02 / Voice Reference" }),
        /* @__PURE__ */ d.jsx("span", { className: Ml, children: "Speaker reference" }),
        /* @__PURE__ */ d.jsx(
          M4,
          {
            value: a.speakerVoiceAssetId,
            voices: i,
            onChange: n.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ d.jsx(K0, { voice: s }),
        /* @__PURE__ */ d.jsx(
          RS,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => n.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        s && /* @__PURE__ */ d.jsx(
          HO,
          {
            voiceAsset: s,
            deploymentId: n.deploymentId,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        o && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx("span", { className: Ml, children: "Emotion reference voice" }),
          /* @__PURE__ */ d.jsx(K0, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function M4({
  value: n,
  voices: a,
  onChange: i
}) {
  return /* @__PURE__ */ d.jsxs(
    "select",
    {
      className: Mi,
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
function K0({ voice: n }) {
  const a = z4(n.durationMs ?? null);
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: c4, children: [
      /* @__PURE__ */ d.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ d.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ d.jsx("span", { children: O4(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ d.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ d.jsxs("div", { className: f4, children: [
      /* @__PURE__ */ d.jsx("div", { className: d4, children: /* @__PURE__ */ d.jsx(xS, { features: NS, children: /* @__PURE__ */ d.jsx(
        CS.div,
        {
          className: h4,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ d.jsx(el, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ d.jsx(N4, { seed: n.contentSha256 })
  ] });
}
function N4({ seed: n }) {
  const a = x.useMemo(() => L4(n, 48), [n]);
  return /* @__PURE__ */ d.jsx("div", { className: g4, "aria-hidden": "true", children: a.map((i, s) => /* @__PURE__ */ d.jsx(
    "span",
    {
      className: y4,
      style: { height: `${Math.max(6, i * 100)}%` }
    },
    `${n}-${s}`
  )) });
}
function RS({
  label: n,
  onFile: a
}) {
  const [i, s] = x.useState(!1), [o, c] = x.useState(!1), h = x.useRef(null), m = x.useCallback(
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
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: o ? u4 : i ? o4 : s4,
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
function A4({
  onExport: n,
  onImport: a,
  onParseError: i
}) {
  const [s, o] = x.useState("error"), c = x.useRef(null);
  return /* @__PURE__ */ d.jsxs("div", { className: AS, children: [
    /* @__PURE__ */ d.jsx(Qe, { variant: "secondary", size: "sm", onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        ref: c,
        type: "file",
        accept: "application/json,.json",
        className: E4,
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
    /* @__PURE__ */ d.jsx(Qe, { variant: "secondary", size: "sm", onClick: () => c.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ d.jsxs(
      "select",
      {
        className: Mi,
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
function R4(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let i = 1;
  for (; a.has(`character ${i}`); ) i += 1;
  return `Character ${i}`;
}
function _4(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function D4(n) {
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
function z4(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function O4(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function L4(n, a) {
  const i = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    i.push((o * 31 + s * 7) % 100 / 100);
  }
  return i;
}
function U4(n, a) {
  const i = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(i), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function Ia(n) {
  return n instanceof Oi || n instanceof Error ? n.message : "unknown error";
}
function V4() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await gT();
        return { deployments: n };
      },
      Component: QT
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = wi(n, "deploymentId");
        return Tw(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = wi(n, "deploymentId"), [i, { mappings: s }, { runs: o }, c] = await Promise.all([
          Jg(a),
          Wg(a),
          ST(a, { limit: 10 }),
          TT(a)
        ]);
        return { deployment: i, mappings: s, runs: o, workflow: c };
      },
      Component: ER
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = wi(n, "deploymentId"), i = wi(n, "runId");
        return { run: await rh(a, i) };
      },
      Component: L2
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = wi(n, "deploymentId"), [i, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          Jg(a),
          Wg(a),
          Kr(a)
        ]);
        return { deployment: i, mappings: s, voiceAssets: o };
      },
      Component: j4
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const i = wi(n, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: i,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: m_
    },
    {
      path: "/runtime/queue",
      Component: c_
    }
  ];
}
function wi(n, a) {
  const i = n[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const Fd = "emotion-tts-app", B4 = "ext-event", Q0 = "emotion-tts-stylesheet", Z0 = ["accent", "density", "card"];
function k4(n) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[n];
}
function q4() {
  if (typeof document > "u" || document.getElementById(Q0)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Q0, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
q4();
class H4 extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = ZE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.paint();
  }
  attributeChangedCallback() {
    this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null;
  }
  syncTweaksFromBody() {
    for (const a of Z0) {
      const i = k4(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Z0.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), i = Dj(V4(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ d.jsx(x.StrictMode, { children: /* @__PURE__ */ d.jsx(Oj, { router: i }) })
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
      new CustomEvent(B4, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function $4() {
  typeof customElements > "u" || customElements.get(Fd) || customElements.define(Fd, H4);
}
typeof customElements < "u" && !customElements.get(Fd) && $4();
export {
  $4 as register
};
//# sourceMappingURL=emotion-tts.js.map
