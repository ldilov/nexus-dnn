function TE(t, a) {
  for (var s = 0; s < a.length; s++) {
    const i = a[s];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const o in i)
        if (o !== "default" && !(o in t)) {
          const u = Object.getOwnPropertyDescriptor(i, o);
          u && Object.defineProperty(t, o, u.get ? u : {
            enumerable: !0,
            get: () => i[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function kx(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var sf = { exports: {} }, Xi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ly;
function RE() {
  if (ly) return Xi;
  ly = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function s(i, o, u) {
    var f = null;
    if (u !== void 0 && (f = "" + u), o.key !== void 0 && (f = "" + o.key), "key" in o) {
      u = {};
      for (var p in o)
        p !== "key" && (u[p] = o[p]);
    } else u = o;
    return o = u.ref, {
      $$typeof: t,
      type: i,
      key: f,
      ref: o !== void 0 ? o : null,
      props: u
    };
  }
  return Xi.Fragment = a, Xi.jsx = s, Xi.jsxs = s, Xi;
}
var oy;
function _E() {
  return oy || (oy = 1, sf.exports = RE()), sf.exports;
}
var c = _E(), lf = { exports: {} }, He = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cy;
function ME() {
  if (cy) return He;
  cy = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), w = Symbol.iterator;
  function S(D) {
    return D === null || typeof D != "object" ? null : (D = w && D[w] || D["@@iterator"], typeof D == "function" ? D : null);
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
  }, N = Object.assign, R = {};
  function C(D, H, Z) {
    this.props = D, this.context = H, this.refs = R, this.updater = Z || j;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(D, H) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, H, "setState");
  }, C.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function O() {
  }
  O.prototype = C.prototype;
  function M(D, H, Z) {
    this.props = D, this.context = H, this.refs = R, this.updater = Z || j;
  }
  var T = M.prototype = new O();
  T.constructor = M, N(T, C.prototype), T.isPureReactComponent = !0;
  var q = Array.isArray;
  function Q() {
  }
  var re = { H: null, A: null, T: null, S: null }, _ = Object.prototype.hasOwnProperty;
  function V(D, H, Z) {
    var G = Z.ref;
    return {
      $$typeof: t,
      type: D,
      key: H,
      ref: G !== void 0 ? G : null,
      props: Z
    };
  }
  function k(D, H) {
    return V(D.type, H, D.props);
  }
  function F(D) {
    return typeof D == "object" && D !== null && D.$$typeof === t;
  }
  function W(D) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(Z) {
      return H[Z];
    });
  }
  var ae = /\/+/g;
  function K(D, H) {
    return typeof D == "object" && D !== null && D.key != null ? W("" + D.key) : H.toString(36);
  }
  function le(D) {
    switch (D.status) {
      case "fulfilled":
        return D.value;
      case "rejected":
        throw D.reason;
      default:
        switch (typeof D.status == "string" ? D.then(Q, Q) : (D.status = "pending", D.then(
          function(H) {
            D.status === "pending" && (D.status = "fulfilled", D.value = H);
          },
          function(H) {
            D.status === "pending" && (D.status = "rejected", D.reason = H);
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
  function A(D, H, Z, G, B) {
    var J = typeof D;
    (J === "undefined" || J === "boolean") && (D = null);
    var ce = !1;
    if (D === null) ce = !0;
    else
      switch (J) {
        case "bigint":
        case "string":
        case "number":
          ce = !0;
          break;
        case "object":
          switch (D.$$typeof) {
            case t:
            case a:
              ce = !0;
              break;
            case b:
              return ce = D._init, A(
                ce(D._payload),
                H,
                Z,
                G,
                B
              );
          }
      }
    if (ce)
      return B = B(D), ce = G === "" ? "." + K(D, 0) : G, q(B) ? (Z = "", ce != null && (Z = ce.replace(ae, "$&/") + "/"), A(B, H, Z, "", function(Pe) {
        return Pe;
      })) : B != null && (F(B) && (B = k(
        B,
        Z + (B.key == null || D && D.key === B.key ? "" : ("" + B.key).replace(
          ae,
          "$&/"
        ) + "/") + ce
      )), H.push(B)), 1;
    ce = 0;
    var ye = G === "" ? "." : G + ":";
    if (q(D))
      for (var Re = 0; Re < D.length; Re++)
        G = D[Re], J = ye + K(G, Re), ce += A(
          G,
          H,
          Z,
          J,
          B
        );
    else if (Re = S(D), typeof Re == "function")
      for (D = Re.call(D), Re = 0; !(G = D.next()).done; )
        G = G.value, J = ye + K(G, Re++), ce += A(
          G,
          H,
          Z,
          J,
          B
        );
    else if (J === "object") {
      if (typeof D.then == "function")
        return A(
          le(D),
          H,
          Z,
          G,
          B
        );
      throw H = String(D), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ce;
  }
  function Y(D, H, Z) {
    if (D == null) return D;
    var G = [], B = 0;
    return A(D, G, "", "", function(J) {
      return H.call(Z, J, B++);
    }), G;
  }
  function $(D) {
    if (D._status === -1) {
      var H = D._result;
      H = H(), H.then(
        function(Z) {
          (D._status === 0 || D._status === -1) && (D._status = 1, D._result = Z);
        },
        function(Z) {
          (D._status === 0 || D._status === -1) && (D._status = 2, D._result = Z);
        }
      ), D._status === -1 && (D._status = 0, D._result = H);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var se = typeof reportError == "function" ? reportError : function(D) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof D == "object" && D !== null && typeof D.message == "string" ? String(D.message) : String(D),
        error: D
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", D);
      return;
    }
    console.error(D);
  }, de = {
    map: Y,
    forEach: function(D, H, Z) {
      Y(
        D,
        function() {
          H.apply(this, arguments);
        },
        Z
      );
    },
    count: function(D) {
      var H = 0;
      return Y(D, function() {
        H++;
      }), H;
    },
    toArray: function(D) {
      return Y(D, function(H) {
        return H;
      }) || [];
    },
    only: function(D) {
      if (!F(D))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return D;
    }
  };
  return He.Activity = v, He.Children = de, He.Component = C, He.Fragment = s, He.Profiler = o, He.PureComponent = M, He.StrictMode = i, He.Suspense = y, He.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = re, He.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(D) {
      return re.H.useMemoCache(D);
    }
  }, He.cache = function(D) {
    return function() {
      return D.apply(null, arguments);
    };
  }, He.cacheSignal = function() {
    return null;
  }, He.cloneElement = function(D, H, Z) {
    if (D == null)
      throw Error(
        "The argument must be a React element, but you passed " + D + "."
      );
    var G = N({}, D.props), B = D.key;
    if (H != null)
      for (J in H.key !== void 0 && (B = "" + H.key), H)
        !_.call(H, J) || J === "key" || J === "__self" || J === "__source" || J === "ref" && H.ref === void 0 || (G[J] = H[J]);
    var J = arguments.length - 2;
    if (J === 1) G.children = Z;
    else if (1 < J) {
      for (var ce = Array(J), ye = 0; ye < J; ye++)
        ce[ye] = arguments[ye + 2];
      G.children = ce;
    }
    return V(D.type, B, G);
  }, He.createContext = function(D) {
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
  }, He.createElement = function(D, H, Z) {
    var G, B = {}, J = null;
    if (H != null)
      for (G in H.key !== void 0 && (J = "" + H.key), H)
        _.call(H, G) && G !== "key" && G !== "__self" && G !== "__source" && (B[G] = H[G]);
    var ce = arguments.length - 2;
    if (ce === 1) B.children = Z;
    else if (1 < ce) {
      for (var ye = Array(ce), Re = 0; Re < ce; Re++)
        ye[Re] = arguments[Re + 2];
      B.children = ye;
    }
    if (D && D.defaultProps)
      for (G in ce = D.defaultProps, ce)
        B[G] === void 0 && (B[G] = ce[G]);
    return V(D, J, B);
  }, He.createRef = function() {
    return { current: null };
  }, He.forwardRef = function(D) {
    return { $$typeof: p, render: D };
  }, He.isValidElement = F, He.lazy = function(D) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: D },
      _init: $
    };
  }, He.memo = function(D, H) {
    return {
      $$typeof: m,
      type: D,
      compare: H === void 0 ? null : H
    };
  }, He.startTransition = function(D) {
    var H = re.T, Z = {};
    re.T = Z;
    try {
      var G = D(), B = re.S;
      B !== null && B(Z, G), typeof G == "object" && G !== null && typeof G.then == "function" && G.then(Q, se);
    } catch (J) {
      se(J);
    } finally {
      H !== null && Z.types !== null && (H.types = Z.types), re.T = H;
    }
  }, He.unstable_useCacheRefresh = function() {
    return re.H.useCacheRefresh();
  }, He.use = function(D) {
    return re.H.use(D);
  }, He.useActionState = function(D, H, Z) {
    return re.H.useActionState(D, H, Z);
  }, He.useCallback = function(D, H) {
    return re.H.useCallback(D, H);
  }, He.useContext = function(D) {
    return re.H.useContext(D);
  }, He.useDebugValue = function() {
  }, He.useDeferredValue = function(D, H) {
    return re.H.useDeferredValue(D, H);
  }, He.useEffect = function(D, H) {
    return re.H.useEffect(D, H);
  }, He.useEffectEvent = function(D) {
    return re.H.useEffectEvent(D);
  }, He.useId = function() {
    return re.H.useId();
  }, He.useImperativeHandle = function(D, H, Z) {
    return re.H.useImperativeHandle(D, H, Z);
  }, He.useInsertionEffect = function(D, H) {
    return re.H.useInsertionEffect(D, H);
  }, He.useLayoutEffect = function(D, H) {
    return re.H.useLayoutEffect(D, H);
  }, He.useMemo = function(D, H) {
    return re.H.useMemo(D, H);
  }, He.useOptimistic = function(D, H) {
    return re.H.useOptimistic(D, H);
  }, He.useReducer = function(D, H, Z) {
    return re.H.useReducer(D, H, Z);
  }, He.useRef = function(D) {
    return re.H.useRef(D);
  }, He.useState = function(D) {
    return re.H.useState(D);
  }, He.useSyncExternalStore = function(D, H, Z) {
    return re.H.useSyncExternalStore(
      D,
      H,
      Z
    );
  }, He.useTransition = function() {
    return re.H.useTransition();
  }, He.version = "19.2.5", He;
}
var uy;
function Dh() {
  return uy || (uy = 1, lf.exports = ME()), lf.exports;
}
var g = Dh();
const Se = /* @__PURE__ */ kx(g), AE = /* @__PURE__ */ TE({
  __proto__: null,
  default: Se
}, [g]);
var of = { exports: {} }, Qi = {}, cf = { exports: {} }, uf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dy;
function DE() {
  return dy || (dy = 1, (function(t) {
    function a(A, Y) {
      var $ = A.length;
      A.push(Y);
      e: for (; 0 < $; ) {
        var se = $ - 1 >>> 1, de = A[se];
        if (0 < o(de, Y))
          A[se] = Y, A[$] = de, $ = se;
        else break e;
      }
    }
    function s(A) {
      return A.length === 0 ? null : A[0];
    }
    function i(A) {
      if (A.length === 0) return null;
      var Y = A[0], $ = A.pop();
      if ($ !== Y) {
        A[0] = $;
        e: for (var se = 0, de = A.length, D = de >>> 1; se < D; ) {
          var H = 2 * (se + 1) - 1, Z = A[H], G = H + 1, B = A[G];
          if (0 > o(Z, $))
            G < de && 0 > o(B, Z) ? (A[se] = B, A[G] = $, se = G) : (A[se] = Z, A[H] = $, se = H);
          else if (G < de && 0 > o(B, $))
            A[se] = B, A[G] = $, se = G;
          else break e;
        }
      }
      return Y;
    }
    function o(A, Y) {
      var $ = A.sortIndex - Y.sortIndex;
      return $ !== 0 ? $ : A.id - Y.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      t.unstable_now = function() {
        return u.now();
      };
    } else {
      var f = Date, p = f.now();
      t.unstable_now = function() {
        return f.now() - p;
      };
    }
    var y = [], m = [], b = 1, v = null, w = 3, S = !1, j = !1, N = !1, R = !1, C = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, M = typeof setImmediate < "u" ? setImmediate : null;
    function T(A) {
      for (var Y = s(m); Y !== null; ) {
        if (Y.callback === null) i(m);
        else if (Y.startTime <= A)
          i(m), Y.sortIndex = Y.expirationTime, a(y, Y);
        else break;
        Y = s(m);
      }
    }
    function q(A) {
      if (N = !1, T(A), !j)
        if (s(y) !== null)
          j = !0, Q || (Q = !0, W());
        else {
          var Y = s(m);
          Y !== null && le(q, Y.startTime - A);
        }
    }
    var Q = !1, re = -1, _ = 5, V = -1;
    function k() {
      return R ? !0 : !(t.unstable_now() - V < _);
    }
    function F() {
      if (R = !1, Q) {
        var A = t.unstable_now();
        V = A;
        var Y = !0;
        try {
          e: {
            j = !1, N && (N = !1, O(re), re = -1), S = !0;
            var $ = w;
            try {
              t: {
                for (T(A), v = s(y); v !== null && !(v.expirationTime > A && k()); ) {
                  var se = v.callback;
                  if (typeof se == "function") {
                    v.callback = null, w = v.priorityLevel;
                    var de = se(
                      v.expirationTime <= A
                    );
                    if (A = t.unstable_now(), typeof de == "function") {
                      v.callback = de, T(A), Y = !0;
                      break t;
                    }
                    v === s(y) && i(y), T(A);
                  } else i(y);
                  v = s(y);
                }
                if (v !== null) Y = !0;
                else {
                  var D = s(m);
                  D !== null && le(
                    q,
                    D.startTime - A
                  ), Y = !1;
                }
              }
              break e;
            } finally {
              v = null, w = $, S = !1;
            }
            Y = void 0;
          }
        } finally {
          Y ? W() : Q = !1;
        }
      }
    }
    var W;
    if (typeof M == "function")
      W = function() {
        M(F);
      };
    else if (typeof MessageChannel < "u") {
      var ae = new MessageChannel(), K = ae.port2;
      ae.port1.onmessage = F, W = function() {
        K.postMessage(null);
      };
    } else
      W = function() {
        C(F, 0);
      };
    function le(A, Y) {
      re = C(function() {
        A(t.unstable_now());
      }, Y);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, t.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : _ = 0 < A ? Math.floor(1e3 / A) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, t.unstable_next = function(A) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var Y = 3;
          break;
        default:
          Y = w;
      }
      var $ = w;
      w = Y;
      try {
        return A();
      } finally {
        w = $;
      }
    }, t.unstable_requestPaint = function() {
      R = !0;
    }, t.unstable_runWithPriority = function(A, Y) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var $ = w;
      w = A;
      try {
        return Y();
      } finally {
        w = $;
      }
    }, t.unstable_scheduleCallback = function(A, Y, $) {
      var se = t.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? se + $ : se) : $ = se, A) {
        case 1:
          var de = -1;
          break;
        case 2:
          de = 250;
          break;
        case 5:
          de = 1073741823;
          break;
        case 4:
          de = 1e4;
          break;
        default:
          de = 5e3;
      }
      return de = $ + de, A = {
        id: b++,
        callback: Y,
        priorityLevel: A,
        startTime: $,
        expirationTime: de,
        sortIndex: -1
      }, $ > se ? (A.sortIndex = $, a(m, A), s(y) === null && A === s(m) && (N ? (O(re), re = -1) : N = !0, le(q, $ - se))) : (A.sortIndex = de, a(y, A), j || S || (j = !0, Q || (Q = !0, W()))), A;
    }, t.unstable_shouldYield = k, t.unstable_wrapCallback = function(A) {
      var Y = w;
      return function() {
        var $ = w;
        w = Y;
        try {
          return A.apply(this, arguments);
        } finally {
          w = $;
        }
      };
    };
  })(uf)), uf;
}
var fy;
function kE() {
  return fy || (fy = 1, cf.exports = DE()), cf.exports;
}
var df = { exports: {} }, vn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hy;
function zE() {
  if (hy) return vn;
  hy = 1;
  var t = Dh();
  function a(y) {
    var m = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        m += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + y + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s() {
  }
  var i = {
    d: {
      f: s,
      r: function() {
        throw Error(a(522));
      },
      D: s,
      C: s,
      L: s,
      m: s,
      X: s,
      S: s,
      M: s
    },
    p: 0,
    findDOMNode: null
  }, o = Symbol.for("react.portal");
  function u(y, m, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: y,
      containerInfo: m,
      implementation: b
    };
  }
  var f = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(y, m) {
    if (y === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return vn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, vn.createPortal = function(y, m) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(y, m, null, b);
  }, vn.flushSync = function(y) {
    var m = f.T, b = i.p;
    try {
      if (f.T = null, i.p = 2, y) return y();
    } finally {
      f.T = m, i.p = b, i.d.f();
    }
  }, vn.preconnect = function(y, m) {
    typeof y == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, i.d.C(y, m));
  }, vn.prefetchDNS = function(y) {
    typeof y == "string" && i.d.D(y);
  }, vn.preinit = function(y, m) {
    if (typeof y == "string" && m && typeof m.as == "string") {
      var b = m.as, v = p(b, m.crossOrigin), w = typeof m.integrity == "string" ? m.integrity : void 0, S = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      b === "style" ? i.d.S(
        y,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: v,
          integrity: w,
          fetchPriority: S
        }
      ) : b === "script" && i.d.X(y, {
        crossOrigin: v,
        integrity: w,
        fetchPriority: S,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, vn.preinitModule = function(y, m) {
    if (typeof y == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var b = p(
            m.as,
            m.crossOrigin
          );
          i.d.M(y, {
            crossOrigin: b,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && i.d.M(y);
  }, vn.preload = function(y, m) {
    if (typeof y == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var b = m.as, v = p(b, m.crossOrigin);
      i.d.L(y, b, {
        crossOrigin: v,
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
  }, vn.preloadModule = function(y, m) {
    if (typeof y == "string")
      if (m) {
        var b = p(m.as, m.crossOrigin);
        i.d.m(y, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: b,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else i.d.m(y);
  }, vn.requestFormReset = function(y) {
    i.d.r(y);
  }, vn.unstable_batchedUpdates = function(y, m) {
    return y(m);
  }, vn.useFormState = function(y, m, b) {
    return f.H.useFormState(y, m, b);
  }, vn.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, vn.version = "19.2.5", vn;
}
var my;
function zx() {
  if (my) return df.exports;
  my = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), df.exports = zE(), df.exports;
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
var py;
function OE() {
  if (py) return Qi;
  py = 1;
  var t = kE(), a = Dh(), s = zx();
  function i(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var r = 2; r < arguments.length; r++)
        n += "&args[]=" + encodeURIComponent(arguments[r]);
    }
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function u(e) {
    var n = e, r = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do
        n = e, (n.flags & 4098) !== 0 && (r = n.return), e = n.return;
      while (e);
    }
    return n.tag === 3 ? r : null;
  }
  function f(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (e.tag === 31) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (u(e) !== e)
      throw Error(i(188));
  }
  function m(e) {
    var n = e.alternate;
    if (!n) {
      if (n = u(e), n === null) throw Error(i(188));
      return n !== e ? null : e;
    }
    for (var r = e, l = n; ; ) {
      var d = r.return;
      if (d === null) break;
      var h = d.alternate;
      if (h === null) {
        if (l = d.return, l !== null) {
          r = l;
          continue;
        }
        break;
      }
      if (d.child === h.child) {
        for (h = d.child; h; ) {
          if (h === r) return y(d), e;
          if (h === l) return y(d), n;
          h = h.sibling;
        }
        throw Error(i(188));
      }
      if (r.return !== l.return) r = d, l = h;
      else {
        for (var x = !1, E = d.child; E; ) {
          if (E === r) {
            x = !0, r = d, l = h;
            break;
          }
          if (E === l) {
            x = !0, l = d, r = h;
            break;
          }
          E = E.sibling;
        }
        if (!x) {
          for (E = h.child; E; ) {
            if (E === r) {
              x = !0, r = h, l = d;
              break;
            }
            if (E === l) {
              x = !0, l = h, r = d;
              break;
            }
            E = E.sibling;
          }
          if (!x) throw Error(i(189));
        }
      }
      if (r.alternate !== l) throw Error(i(190));
    }
    if (r.tag !== 3) throw Error(i(188));
    return r.stateNode.current === r ? e : n;
  }
  function b(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e;
    for (e = e.child; e !== null; ) {
      if (n = b(e), n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign, w = Symbol.for("react.element"), S = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), O = Symbol.for("react.consumer"), M = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), q = Symbol.for("react.suspense"), Q = Symbol.for("react.suspense_list"), re = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), V = Symbol.for("react.activity"), k = Symbol.for("react.memo_cache_sentinel"), F = Symbol.iterator;
  function W(e) {
    return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ae = Symbol.for("react.client.reference");
  function K(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ae ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case N:
        return "Fragment";
      case C:
        return "Profiler";
      case R:
        return "StrictMode";
      case q:
        return "Suspense";
      case Q:
        return "SuspenseList";
      case V:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case M:
          return e.displayName || "Context";
        case O:
          return (e._context.displayName || "Context") + ".Consumer";
        case T:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case re:
          return n = e.displayName || null, n !== null ? n : K(e.type) || "Memo";
        case _:
          n = e._payload, e = e._init;
          try {
            return K(e(n));
          } catch {
          }
      }
    return null;
  }
  var le = Array.isArray, A = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, se = [], de = -1;
  function D(e) {
    return { current: e };
  }
  function H(e) {
    0 > de || (e.current = se[de], se[de] = null, de--);
  }
  function Z(e, n) {
    de++, se[de] = e.current, e.current = n;
  }
  var G = D(null), B = D(null), J = D(null), ce = D(null);
  function ye(e, n) {
    switch (Z(J, n), Z(B, e), Z(G, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Mv(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Mv(n), e = Av(n, e);
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
    H(G), Z(G, e);
  }
  function Re() {
    H(G), H(B), H(J);
  }
  function Pe(e) {
    e.memoizedState !== null && Z(ce, e);
    var n = G.current, r = Av(n, e.type);
    n !== r && (Z(B, e), Z(G, r));
  }
  function Ne(e) {
    B.current === e && (H(G), H(B)), ce.current === e && (H(ce), Yi._currentValue = $);
  }
  var at, Ie;
  function qe(e) {
    if (at === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        at = n && n[1] || "", Ie = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + at + e + Ie;
  }
  var Gt = !1;
  function _t(e, n) {
    if (!e || Gt) return "";
    Gt = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var me = function() {
                throw Error();
              };
              if (Object.defineProperty(me.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(me, []);
                } catch (oe) {
                  var ie = oe;
                }
                Reflect.construct(e, [], me);
              } else {
                try {
                  me.call();
                } catch (oe) {
                  ie = oe;
                }
                e.call(me.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                ie = oe;
              }
              (me = e()) && typeof me.catch == "function" && me.catch(function() {
              });
            }
          } catch (oe) {
            if (oe && ie && typeof oe.stack == "string")
              return [oe.stack, ie.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var d = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      d && d.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var h = l.DetermineComponentFrameRoot(), x = h[0], E = h[1];
      if (x && E) {
        var L = x.split(`
`), ne = E.split(`
`);
        for (d = l = 0; l < L.length && !L[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; d < ne.length && !ne[d].includes(
          "DetermineComponentFrameRoot"
        ); )
          d++;
        if (l === L.length || d === ne.length)
          for (l = L.length - 1, d = ne.length - 1; 1 <= l && 0 <= d && L[l] !== ne[d]; )
            d--;
        for (; 1 <= l && 0 <= d; l--, d--)
          if (L[l] !== ne[d]) {
            if (l !== 1 || d !== 1)
              do
                if (l--, d--, 0 > d || L[l] !== ne[d]) {
                  var ue = `
` + L[l].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= l && 0 <= d);
            break;
          }
      }
    } finally {
      Gt = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? qe(r) : "";
  }
  function Mt(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return qe(e.type);
      case 16:
        return qe("Lazy");
      case 13:
        return e.child !== n && n !== null ? qe("Suspense Fallback") : qe("Suspense");
      case 19:
        return qe("SuspenseList");
      case 0:
      case 15:
        return _t(e.type, !1);
      case 11:
        return _t(e.type.render, !1);
      case 1:
        return _t(e.type, !0);
      case 31:
        return qe("Activity");
      default:
        return "";
    }
  }
  function mn(e) {
    try {
      var n = "", r = null;
      do
        n += Mt(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var gt = Object.prototype.hasOwnProperty, Pt = t.unstable_scheduleCallback, jn = t.unstable_cancelCallback, ot = t.unstable_shouldYield, sn = t.unstable_requestPaint, bt = t.unstable_now, we = t.unstable_getCurrentPriorityLevel, Le = t.unstable_ImmediatePriority, Xe = t.unstable_UserBlockingPriority, ct = t.unstable_NormalPriority, At = t.unstable_LowPriority, Ut = t.unstable_IdlePriority, sa = t.log, Sn = t.unstable_setDisableYieldValue, pn = null, Ot = null;
  function Tt(e) {
    if (typeof sa == "function" && Sn(e), Ot && typeof Ot.setStrictMode == "function")
      try {
        Ot.setStrictMode(pn, e);
      } catch {
      }
  }
  var pt = Math.clz32 ? Math.clz32 : _e, En = Math.log, fe = Math.LN2;
  function _e(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (En(e) / fe | 0) | 0;
  }
  var Ce = 256, U = 262144, pe = 4194304;
  function ve(e) {
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
  function be(e, n, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var d = 0, h = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var E = l & 134217727;
    return E !== 0 ? (l = E & ~h, l !== 0 ? d = ve(l) : (x &= E, x !== 0 ? d = ve(x) : r || (r = E & ~e, r !== 0 && (d = ve(r))))) : (E = l & ~h, E !== 0 ? d = ve(E) : x !== 0 ? d = ve(x) : r || (r = l & ~e, r !== 0 && (d = ve(r)))), d === 0 ? 0 : n !== 0 && n !== d && (n & h) === 0 && (h = d & -d, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : d;
  }
  function Ve(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function We(e, n) {
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
  function it() {
    var e = pe;
    return pe <<= 1, (pe & 62914560) === 0 && (pe = 4194304), e;
  }
  function Fe(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function ht(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function an(e, n, r, l, d, h) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, ne = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var ue = 31 - pt(r), me = 1 << ue;
      E[ue] = 0, L[ue] = -1;
      var ie = ne[ue];
      if (ie !== null)
        for (ne[ue] = null, ue = 0; ue < ie.length; ue++) {
          var oe = ie[ue];
          oe !== null && (oe.lane &= -536870913);
        }
      r &= ~me;
    }
    l !== 0 && zn(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function zn(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - pt(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function Kt(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var l = 31 - pt(r), d = 1 << l;
      d & n | e[l] & n && (e[l] |= n), r &= ~d;
    }
  }
  function z(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : P(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function P(e) {
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
  function ee(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ge() {
    var e = Y.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ey(e.type));
  }
  function xe(e, n) {
    var r = Y.p;
    try {
      return Y.p = e, n();
    } finally {
      Y.p = r;
    }
  }
  var Ae = Math.random().toString(36).slice(2), je = "__reactFiber$" + Ae, Ee = "__reactProps$" + Ae, ke = "__reactContainer$" + Ae, Te = "__reactEvents$" + Ae, Ue = "__reactListeners$" + Ae, Oe = "__reactHandles$" + Ae, ut = "__reactResources$" + Ae, Qe = "__reactMarker$" + Ae;
  function Et(e) {
    delete e[je], delete e[Ee], delete e[Te], delete e[Ue], delete e[Oe];
  }
  function xt(e) {
    var n = e[je];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[ke] || r[je]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Uv(e); e !== null; ) {
            if (r = e[je]) return r;
            e = Uv(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function Lt(e) {
    if (e = e[je] || e[ke]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function et(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Xt(e) {
    var n = e[ut];
    return n || (n = e[ut] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Rt(e) {
    e[Qe] = !0;
  }
  var Fa = /* @__PURE__ */ new Set(), ia = {};
  function ln(e, n) {
    ha(e, n), ha(e + "Capture", n);
  }
  function ha(e, n) {
    for (ia[e] = n, e = 0; e < n.length; e++)
      Fa.add(n[e]);
  }
  var Cr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ma = {}, Tr = {};
  function ts(e) {
    return gt.call(Tr, e) ? !0 : gt.call(ma, e) ? !1 : Cr.test(e) ? Tr[e] = !0 : (ma[e] = !0, !1);
  }
  function Ze(e, n, r) {
    if (ts(n))
      if (r === null) e.removeAttribute(n);
      else {
        switch (typeof r) {
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
        e.setAttribute(n, "" + r);
      }
  }
  function Ht(e, n, r) {
    if (r === null) e.removeAttribute(n);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttribute(n, "" + r);
    }
  }
  function gn(e, n, r, l) {
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
      e.setAttributeNS(n, r, "" + l);
    }
  }
  function Qt(e) {
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
  function Dt(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function ns(e, n, r) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var d = l.get, h = l.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return d.call(this);
        },
        set: function(x) {
          r = "" + x, h.call(this, x);
        }
      }), Object.defineProperty(e, n, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return r;
        },
        setValue: function(x) {
          r = "" + x;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function as(e) {
    if (!e._valueTracker) {
      var n = Dt(e) ? "checked" : "value";
      e._valueTracker = ns(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Dl(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), l = "";
    return e && (l = Dt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (n.setValue(e), !0) : !1;
  }
  function kl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Sw = /[\n"\\]/g;
  function Fn(e) {
    return e.replace(
      Sw,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Wc(e, n, r, l, d, h, x, E) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + Qt(n)) : e.value !== "" + Qt(n) && (e.value = "" + Qt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? eu(e, x, Qt(n)) : r != null ? eu(e, x, Qt(r)) : l != null && e.removeAttribute("value"), d == null && h != null && (e.defaultChecked = !!h), d != null && (e.checked = d && typeof d != "function" && typeof d != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + Qt(E) : e.removeAttribute("name");
  }
  function Em(e, n, r, l, d, h, x, E) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        as(e);
        return;
      }
      r = r != null ? "" + Qt(r) : "", n = n != null ? "" + Qt(n) : r, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? d, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), as(e);
  }
  function eu(e, n, r) {
    n === "number" && kl(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function rs(e, n, r, l) {
    if (e = e.options, n) {
      n = {};
      for (var d = 0; d < r.length; d++)
        n["$" + r[d]] = !0;
      for (r = 0; r < e.length; r++)
        d = n.hasOwnProperty("$" + e[r].value), e[r].selected !== d && (e[r].selected = d), d && l && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + Qt(r), n = null, d = 0; d < e.length; d++) {
        if (e[d].value === r) {
          e[d].selected = !0, l && (e[d].defaultSelected = !0);
          return;
        }
        n !== null || e[d].disabled || (n = e[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Nm(e, n, r) {
    if (n != null && (n = "" + Qt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + Qt(r) : "";
  }
  function Cm(e, n, r, l) {
    if (n == null) {
      if (l != null) {
        if (r != null) throw Error(i(92));
        if (le(l)) {
          if (1 < l.length) throw Error(i(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), n = r;
    }
    r = Qt(n), e.defaultValue = r, l = e.textContent, l === r && l !== "" && l !== null && (e.value = l), as(e);
  }
  function ss(e, n) {
    if (n) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var ww = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Tm(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, r) : typeof r != "number" || r === 0 || ww.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function Rm(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(i(62));
    if (e = e.style, r != null) {
      for (var l in r)
        !r.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var d in n)
        l = n[d], n.hasOwnProperty(d) && r[d] !== l && Tm(e, d, l);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Tm(e, h, n[h]);
  }
  function tu(e) {
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
  var jw = /* @__PURE__ */ new Map([
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
  ]), Ew = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function zl(e) {
    return Ew.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function wa() {
  }
  var nu = null;
  function au(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var is = null, ls = null;
  function _m(e) {
    var n = Lt(e);
    if (n && (e = n.stateNode)) {
      var r = e[Ee] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Wc(
            e,
            r.value,
            r.defaultValue,
            r.defaultValue,
            r.checked,
            r.defaultChecked,
            r.type,
            r.name
          ), n = r.name, r.type === "radio" && n != null) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (r = r.querySelectorAll(
              'input[name="' + Fn(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < r.length; n++) {
              var l = r[n];
              if (l !== e && l.form === e.form) {
                var d = l[Ee] || null;
                if (!d) throw Error(i(90));
                Wc(
                  l,
                  d.value,
                  d.defaultValue,
                  d.defaultValue,
                  d.checked,
                  d.defaultChecked,
                  d.type,
                  d.name
                );
              }
            }
            for (n = 0; n < r.length; n++)
              l = r[n], l.form === e.form && Dl(l);
          }
          break e;
        case "textarea":
          Nm(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && rs(e, !!r.multiple, n, !1);
      }
    }
  }
  var ru = !1;
  function Mm(e, n, r) {
    if (ru) return e(n, r);
    ru = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (ru = !1, (is !== null || ls !== null) && (wo(), is && (n = is, e = ls, ls = is = null, _m(n), e)))
        for (n = 0; n < e.length; n++) _m(e[n]);
    }
  }
  function oi(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var l = r[Ee] || null;
    if (l === null) return null;
    r = l[n];
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
    if (r && typeof r != "function")
      throw Error(
        i(231, n, typeof r)
      );
    return r;
  }
  var ja = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), su = !1;
  if (ja)
    try {
      var ci = {};
      Object.defineProperty(ci, "passive", {
        get: function() {
          su = !0;
        }
      }), window.addEventListener("test", ci, ci), window.removeEventListener("test", ci, ci);
    } catch {
      su = !1;
    }
  var Ya = null, iu = null, Ol = null;
  function Am() {
    if (Ol) return Ol;
    var e, n = iu, r = n.length, l, d = "value" in Ya ? Ya.value : Ya.textContent, h = d.length;
    for (e = 0; e < r && n[e] === d[e]; e++) ;
    var x = r - e;
    for (l = 1; l <= x && n[r - l] === d[h - l]; l++) ;
    return Ol = d.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Ll(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function $l() {
    return !0;
  }
  function Dm() {
    return !1;
  }
  function Nn(e) {
    function n(r, l, d, h, x) {
      this._reactName = r, this._targetInst = d, this.type = l, this.nativeEvent = h, this.target = x, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (r = e[E], this[E] = r ? r(h) : h[E]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? $l : Dm, this.isPropagationStopped = Dm, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = $l);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = $l);
      },
      persist: function() {
      },
      isPersistent: $l
    }), n;
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
  }, Ul = Nn(Rr), ui = v({}, Rr, { view: 0, detail: 0 }), Nw = Nn(ui), lu, ou, di, Bl = v({}, ui, {
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
    getModifierState: uu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== di && (di && e.type === "mousemove" ? (lu = e.screenX - di.screenX, ou = e.screenY - di.screenY) : ou = lu = 0, di = e), lu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ou;
    }
  }), km = Nn(Bl), Cw = v({}, Bl, { dataTransfer: 0 }), Tw = Nn(Cw), Rw = v({}, ui, { relatedTarget: 0 }), cu = Nn(Rw), _w = v({}, Rr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Mw = Nn(_w), Aw = v({}, Rr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Dw = Nn(Aw), kw = v({}, Rr, { data: 0 }), zm = Nn(kw), zw = {
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
  }, Ow = {
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
  }, Lw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function $w(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Lw[e]) ? !!n[e] : !1;
  }
  function uu() {
    return $w;
  }
  var Uw = v({}, ui, {
    key: function(e) {
      if (e.key) {
        var n = zw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Ll(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ow[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: uu,
    charCode: function(e) {
      return e.type === "keypress" ? Ll(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ll(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Bw = Nn(Uw), Vw = v({}, Bl, {
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
  }), Om = Nn(Vw), Iw = v({}, ui, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: uu
  }), Hw = Nn(Iw), qw = v({}, Rr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Fw = Nn(qw), Yw = v({}, Bl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Gw = Nn(Yw), Pw = v({}, Rr, {
    newState: 0,
    oldState: 0
  }), Kw = Nn(Pw), Xw = [9, 13, 27, 32], du = ja && "CompositionEvent" in window, fi = null;
  ja && "documentMode" in document && (fi = document.documentMode);
  var Qw = ja && "TextEvent" in window && !fi, Lm = ja && (!du || fi && 8 < fi && 11 >= fi), $m = " ", Um = !1;
  function Bm(e, n) {
    switch (e) {
      case "keyup":
        return Xw.indexOf(n.keyCode) !== -1;
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
  function Vm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var os = !1;
  function Zw(e, n) {
    switch (e) {
      case "compositionend":
        return Vm(n);
      case "keypress":
        return n.which !== 32 ? null : (Um = !0, $m);
      case "textInput":
        return e = n.data, e === $m && Um ? null : e;
      default:
        return null;
    }
  }
  function Jw(e, n) {
    if (os)
      return e === "compositionend" || !du && Bm(e, n) ? (e = Am(), Ol = iu = Ya = null, os = !1, e) : null;
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
        return Lm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Ww = {
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
  function Im(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Ww[e.type] : n === "textarea";
  }
  function Hm(e, n, r, l) {
    is ? ls ? ls.push(l) : ls = [l] : is = l, n = _o(n, "onChange"), 0 < n.length && (r = new Ul(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: n }));
  }
  var hi = null, mi = null;
  function ej(e) {
    Ev(e, 0);
  }
  function Vl(e) {
    var n = et(e);
    if (Dl(n)) return e;
  }
  function qm(e, n) {
    if (e === "change") return n;
  }
  var Fm = !1;
  if (ja) {
    var fu;
    if (ja) {
      var hu = "oninput" in document;
      if (!hu) {
        var Ym = document.createElement("div");
        Ym.setAttribute("oninput", "return;"), hu = typeof Ym.oninput == "function";
      }
      fu = hu;
    } else fu = !1;
    Fm = fu && (!document.documentMode || 9 < document.documentMode);
  }
  function Gm() {
    hi && (hi.detachEvent("onpropertychange", Pm), mi = hi = null);
  }
  function Pm(e) {
    if (e.propertyName === "value" && Vl(mi)) {
      var n = [];
      Hm(
        n,
        mi,
        e,
        au(e)
      ), Mm(ej, n);
    }
  }
  function tj(e, n, r) {
    e === "focusin" ? (Gm(), hi = n, mi = r, hi.attachEvent("onpropertychange", Pm)) : e === "focusout" && Gm();
  }
  function nj(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Vl(mi);
  }
  function aj(e, n) {
    if (e === "click") return Vl(n);
  }
  function rj(e, n) {
    if (e === "input" || e === "change")
      return Vl(n);
  }
  function sj(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var On = typeof Object.is == "function" ? Object.is : sj;
  function pi(e, n) {
    if (On(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(n);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var d = r[l];
      if (!gt.call(n, d) || !On(e[d], n[d]))
        return !1;
    }
    return !0;
  }
  function Km(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Xm(e, n) {
    var r = Km(e);
    e = 0;
    for (var l; r; ) {
      if (r.nodeType === 3) {
        if (l = e + r.textContent.length, e <= n && l >= n)
          return { node: r, offset: n - e };
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
      r = Km(r);
    }
  }
  function Qm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Qm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Zm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = kl(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = n.contentWindow;
      else break;
      n = kl(e.document);
    }
    return n;
  }
  function mu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var ij = ja && "documentMode" in document && 11 >= document.documentMode, cs = null, pu = null, gi = null, gu = !1;
  function Jm(e, n, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    gu || cs == null || cs !== kl(l) || (l = cs, "selectionStart" in l && mu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), gi && pi(gi, l) || (gi = l, l = _o(pu, "onSelect"), 0 < l.length && (n = new Ul(
      "onSelect",
      "select",
      null,
      n,
      r
    ), e.push({ event: n, listeners: l }), n.target = cs)));
  }
  function _r(e, n) {
    var r = {};
    return r[e.toLowerCase()] = n.toLowerCase(), r["Webkit" + e] = "webkit" + n, r["Moz" + e] = "moz" + n, r;
  }
  var us = {
    animationend: _r("Animation", "AnimationEnd"),
    animationiteration: _r("Animation", "AnimationIteration"),
    animationstart: _r("Animation", "AnimationStart"),
    transitionrun: _r("Transition", "TransitionRun"),
    transitionstart: _r("Transition", "TransitionStart"),
    transitioncancel: _r("Transition", "TransitionCancel"),
    transitionend: _r("Transition", "TransitionEnd")
  }, vu = {}, Wm = {};
  ja && (Wm = document.createElement("div").style, "AnimationEvent" in window || (delete us.animationend.animation, delete us.animationiteration.animation, delete us.animationstart.animation), "TransitionEvent" in window || delete us.transitionend.transition);
  function Mr(e) {
    if (vu[e]) return vu[e];
    if (!us[e]) return e;
    var n = us[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Wm)
        return vu[e] = n[r];
    return e;
  }
  var ep = Mr("animationend"), tp = Mr("animationiteration"), np = Mr("animationstart"), lj = Mr("transitionrun"), oj = Mr("transitionstart"), cj = Mr("transitioncancel"), ap = Mr("transitionend"), rp = /* @__PURE__ */ new Map(), yu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  yu.push("scrollEnd");
  function la(e, n) {
    rp.set(e, n), ln(n, [e]);
  }
  var Il = typeof reportError == "function" ? reportError : function(e) {
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
  }, Yn = [], ds = 0, bu = 0;
  function Hl() {
    for (var e = ds, n = bu = ds = 0; n < e; ) {
      var r = Yn[n];
      Yn[n++] = null;
      var l = Yn[n];
      Yn[n++] = null;
      var d = Yn[n];
      Yn[n++] = null;
      var h = Yn[n];
      if (Yn[n++] = null, l !== null && d !== null) {
        var x = l.pending;
        x === null ? d.next = d : (d.next = x.next, x.next = d), l.pending = d;
      }
      h !== 0 && sp(r, d, h);
    }
  }
  function ql(e, n, r, l) {
    Yn[ds++] = e, Yn[ds++] = n, Yn[ds++] = r, Yn[ds++] = l, bu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function xu(e, n, r, l) {
    return ql(e, n, r, l), Fl(e);
  }
  function Ar(e, n) {
    return ql(e, null, null, n), Fl(e);
  }
  function sp(e, n, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var d = !1, h = e.return; h !== null; )
      h.childLanes |= r, l = h.alternate, l !== null && (l.childLanes |= r), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (d = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, d && n !== null && (d = 31 - pt(r), e = h.hiddenUpdates, l = e[d], l === null ? e[d] = [n] : l.push(n), n.lane = r | 536870912), h) : null;
  }
  function Fl(e) {
    if (50 < Ui)
      throw Ui = 0, _d = null, Error(i(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fs = {};
  function uj(e, n, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ln(e, n, r, l) {
    return new uj(e, n, r, l);
  }
  function Su(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ea(e, n) {
    var r = e.alternate;
    return r === null ? (r = Ln(
      e.tag,
      n,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = n, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, n = e.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function ip(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Yl(e, n, r, l, d, h) {
    var x = 0;
    if (l = e, typeof e == "function") Su(e) && (x = 1);
    else if (typeof e == "string")
      x = pE(
        e,
        r,
        G.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case V:
          return e = Ln(31, r, n, d), e.elementType = V, e.lanes = h, e;
        case N:
          return Dr(r.children, d, h, n);
        case R:
          x = 8, d |= 24;
          break;
        case C:
          return e = Ln(12, r, n, d | 2), e.elementType = C, e.lanes = h, e;
        case q:
          return e = Ln(13, r, n, d), e.elementType = q, e.lanes = h, e;
        case Q:
          return e = Ln(19, r, n, d), e.elementType = Q, e.lanes = h, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case M:
                x = 10;
                break e;
              case O:
                x = 9;
                break e;
              case T:
                x = 11;
                break e;
              case re:
                x = 14;
                break e;
              case _:
                x = 16, l = null;
                break e;
            }
          x = 29, r = Error(
            i(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return n = Ln(x, r, n, d), n.elementType = e, n.type = l, n.lanes = h, n;
  }
  function Dr(e, n, r, l) {
    return e = Ln(7, e, l, n), e.lanes = r, e;
  }
  function wu(e, n, r) {
    return e = Ln(6, e, null, n), e.lanes = r, e;
  }
  function lp(e) {
    var n = Ln(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function ju(e, n, r) {
    return n = Ln(
      4,
      e.children !== null ? e.children : [],
      e.key,
      n
    ), n.lanes = r, n.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, n;
  }
  var op = /* @__PURE__ */ new WeakMap();
  function Gn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = op.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: mn(n)
      }, op.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: mn(n)
    };
  }
  var hs = [], ms = 0, Gl = null, vi = 0, Pn = [], Kn = 0, Ga = null, pa = 1, ga = "";
  function Na(e, n) {
    hs[ms++] = vi, hs[ms++] = Gl, Gl = e, vi = n;
  }
  function cp(e, n, r) {
    Pn[Kn++] = pa, Pn[Kn++] = ga, Pn[Kn++] = Ga, Ga = e;
    var l = pa;
    e = ga;
    var d = 32 - pt(l) - 1;
    l &= ~(1 << d), r += 1;
    var h = 32 - pt(n) + d;
    if (30 < h) {
      var x = d - d % 5;
      h = (l & (1 << x) - 1).toString(32), l >>= x, d -= x, pa = 1 << 32 - pt(n) + d | r << d | l, ga = h + e;
    } else
      pa = 1 << h | r << d | l, ga = e;
  }
  function Eu(e) {
    e.return !== null && (Na(e, 1), cp(e, 1, 0));
  }
  function Nu(e) {
    for (; e === Gl; )
      Gl = hs[--ms], hs[ms] = null, vi = hs[--ms], hs[ms] = null;
    for (; e === Ga; )
      Ga = Pn[--Kn], Pn[Kn] = null, ga = Pn[--Kn], Pn[Kn] = null, pa = Pn[--Kn], Pn[Kn] = null;
  }
  function up(e, n) {
    Pn[Kn++] = pa, Pn[Kn++] = ga, Pn[Kn++] = Ga, pa = n.id, ga = n.overflow, Ga = e;
  }
  var cn = null, kt = null, lt = !1, Pa = null, Xn = !1, Cu = Error(i(519));
  function Ka(e) {
    var n = Error(
      i(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw yi(Gn(n, e)), Cu;
  }
  function dp(e) {
    var n = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (n[je] = e, n[Ee] = l, r) {
      case "dialog":
        nt("cancel", n), nt("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        nt("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Vi.length; r++)
          nt(Vi[r], n);
        break;
      case "source":
        nt("error", n);
        break;
      case "img":
      case "image":
      case "link":
        nt("error", n), nt("load", n);
        break;
      case "details":
        nt("toggle", n);
        break;
      case "input":
        nt("invalid", n), Em(
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
        nt("invalid", n);
        break;
      case "textarea":
        nt("invalid", n), Cm(n, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || l.suppressHydrationWarning === !0 || Rv(n.textContent, r) ? (l.popover != null && (nt("beforetoggle", n), nt("toggle", n)), l.onScroll != null && nt("scroll", n), l.onScrollEnd != null && nt("scrollend", n), l.onClick != null && (n.onclick = wa), n = !0) : n = !1, n || Ka(e, !0);
  }
  function fp(e) {
    for (cn = e.return; cn; )
      switch (cn.tag) {
        case 5:
        case 31:
        case 13:
          Xn = !1;
          return;
        case 27:
        case 3:
          Xn = !0;
          return;
        default:
          cn = cn.return;
      }
  }
  function ps(e) {
    if (e !== cn) return !1;
    if (!lt) return fp(e), lt = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Fd(e.type, e.memoizedProps)), r = !r), r && kt && Ka(e), fp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      kt = $v(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      kt = $v(e);
    } else
      n === 27 ? (n = kt, or(e.type) ? (e = Xd, Xd = null, kt = e) : kt = n) : kt = cn ? Zn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function kr() {
    kt = cn = null, lt = !1;
  }
  function Tu() {
    var e = Pa;
    return e !== null && (_n === null ? _n = e : _n.push.apply(
      _n,
      e
    ), Pa = null), e;
  }
  function yi(e) {
    Pa === null ? Pa = [e] : Pa.push(e);
  }
  var Ru = D(null), zr = null, Ca = null;
  function Xa(e, n, r) {
    Z(Ru, n._currentValue), n._currentValue = r;
  }
  function Ta(e) {
    e._currentValue = Ru.current, H(Ru);
  }
  function _u(e, n, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function Mu(e, n, r, l) {
    var d = e.child;
    for (d !== null && (d.return = e); d !== null; ) {
      var h = d.dependencies;
      if (h !== null) {
        var x = d.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var E = h;
          h = d;
          for (var L = 0; L < n.length; L++)
            if (E.context === n[L]) {
              h.lanes |= r, E = h.alternate, E !== null && (E.lanes |= r), _u(
                h.return,
                r,
                e
              ), l || (x = null);
              break e;
            }
          h = E.next;
        }
      } else if (d.tag === 18) {
        if (x = d.return, x === null) throw Error(i(341));
        x.lanes |= r, h = x.alternate, h !== null && (h.lanes |= r), _u(x, r, e), x = null;
      } else x = d.child;
      if (x !== null) x.return = d;
      else
        for (x = d; x !== null; ) {
          if (x === e) {
            x = null;
            break;
          }
          if (d = x.sibling, d !== null) {
            d.return = x.return, x = d;
            break;
          }
          x = x.return;
        }
      d = x;
    }
  }
  function gs(e, n, r, l) {
    e = null;
    for (var d = n, h = !1; d !== null; ) {
      if (!h) {
        if ((d.flags & 524288) !== 0) h = !0;
        else if ((d.flags & 262144) !== 0) break;
      }
      if (d.tag === 10) {
        var x = d.alternate;
        if (x === null) throw Error(i(387));
        if (x = x.memoizedProps, x !== null) {
          var E = d.type;
          On(d.pendingProps.value, x.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (d === ce.current) {
        if (x = d.alternate, x === null) throw Error(i(387));
        x.memoizedState.memoizedState !== d.memoizedState.memoizedState && (e !== null ? e.push(Yi) : e = [Yi]);
      }
      d = d.return;
    }
    e !== null && Mu(
      n,
      e,
      r,
      l
    ), n.flags |= 262144;
  }
  function Pl(e) {
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
  function Or(e) {
    zr = e, Ca = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function un(e) {
    return hp(zr, e);
  }
  function Kl(e, n) {
    return zr === null && Or(e), hp(e, n);
  }
  function hp(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Ca === null) {
      if (e === null) throw Error(i(308));
      Ca = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ca = Ca.next = n;
    return r;
  }
  var dj = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(r, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(r) {
        return r();
      });
    };
  }, fj = t.unstable_scheduleCallback, hj = t.unstable_NormalPriority, Zt = {
    $$typeof: M,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Au() {
    return {
      controller: new dj(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function bi(e) {
    e.refCount--, e.refCount === 0 && fj(hj, function() {
      e.controller.abort();
    });
  }
  var xi = null, Du = 0, vs = 0, ys = null;
  function mj(e, n) {
    if (xi === null) {
      var r = xi = [];
      Du = 0, vs = Od(), ys = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return Du++, n.then(mp, mp), n;
  }
  function mp() {
    if (--Du === 0 && xi !== null) {
      ys !== null && (ys.status = "fulfilled");
      var e = xi;
      xi = null, vs = 0, ys = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function pj(e, n) {
    var r = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(d) {
        r.push(d);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = n;
        for (var d = 0; d < r.length; d++) (0, r[d])(n);
      },
      function(d) {
        for (l.status = "rejected", l.reason = d, d = 0; d < r.length; d++)
          (0, r[d])(void 0);
      }
    ), l;
  }
  var pp = A.S;
  A.S = function(e, n) {
    Jg = bt(), typeof n == "object" && n !== null && typeof n.then == "function" && mj(e, n), pp !== null && pp(e, n);
  };
  var Lr = D(null);
  function ku() {
    var e = Lr.current;
    return e !== null ? e : Nt.pooledCache;
  }
  function Xl(e, n) {
    n === null ? Z(Lr, Lr.current) : Z(Lr, n.pool);
  }
  function gp() {
    var e = ku();
    return e === null ? null : { parent: Zt._currentValue, pool: e };
  }
  var bs = Error(i(460)), zu = Error(i(474)), Ql = Error(i(542)), Zl = { then: function() {
  } };
  function vp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function yp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(wa, wa), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, xp(e), e;
      default:
        if (typeof n.status == "string") n.then(wa, wa);
        else {
          if (e = Nt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(i(482));
          e = n, e.status = "pending", e.then(
            function(l) {
              if (n.status === "pending") {
                var d = n;
                d.status = "fulfilled", d.value = l;
              }
            },
            function(l) {
              if (n.status === "pending") {
                var d = n;
                d.status = "rejected", d.reason = l;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, xp(e), e;
        }
        throw Ur = n, bs;
    }
  }
  function $r(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (Ur = r, bs) : r;
    }
  }
  var Ur = null;
  function bp() {
    if (Ur === null) throw Error(i(459));
    var e = Ur;
    return Ur = null, e;
  }
  function xp(e) {
    if (e === bs || e === Ql)
      throw Error(i(483));
  }
  var xs = null, Si = 0;
  function Jl(e) {
    var n = Si;
    return Si += 1, xs === null && (xs = []), yp(xs, e, n);
  }
  function wi(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Wl(e, n) {
    throw n.$$typeof === w ? Error(i(525)) : (e = Object.prototype.toString.call(n), Error(
      i(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function Sp(e) {
    function n(X, I) {
      if (e) {
        var te = X.deletions;
        te === null ? (X.deletions = [I], X.flags |= 16) : te.push(I);
      }
    }
    function r(X, I) {
      if (!e) return null;
      for (; I !== null; )
        n(X, I), I = I.sibling;
      return null;
    }
    function l(X) {
      for (var I = /* @__PURE__ */ new Map(); X !== null; )
        X.key !== null ? I.set(X.key, X) : I.set(X.index, X), X = X.sibling;
      return I;
    }
    function d(X, I) {
      return X = Ea(X, I), X.index = 0, X.sibling = null, X;
    }
    function h(X, I, te) {
      return X.index = te, e ? (te = X.alternate, te !== null ? (te = te.index, te < I ? (X.flags |= 67108866, I) : te) : (X.flags |= 67108866, I)) : (X.flags |= 1048576, I);
    }
    function x(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function E(X, I, te, he) {
      return I === null || I.tag !== 6 ? (I = wu(te, X.mode, he), I.return = X, I) : (I = d(I, te), I.return = X, I);
    }
    function L(X, I, te, he) {
      var $e = te.type;
      return $e === N ? ue(
        X,
        I,
        te.props.children,
        he,
        te.key
      ) : I !== null && (I.elementType === $e || typeof $e == "object" && $e !== null && $e.$$typeof === _ && $r($e) === I.type) ? (I = d(I, te.props), wi(I, te), I.return = X, I) : (I = Yl(
        te.type,
        te.key,
        te.props,
        null,
        X.mode,
        he
      ), wi(I, te), I.return = X, I);
    }
    function ne(X, I, te, he) {
      return I === null || I.tag !== 4 || I.stateNode.containerInfo !== te.containerInfo || I.stateNode.implementation !== te.implementation ? (I = ju(te, X.mode, he), I.return = X, I) : (I = d(I, te.children || []), I.return = X, I);
    }
    function ue(X, I, te, he, $e) {
      return I === null || I.tag !== 7 ? (I = Dr(
        te,
        X.mode,
        he,
        $e
      ), I.return = X, I) : (I = d(I, te), I.return = X, I);
    }
    function me(X, I, te) {
      if (typeof I == "string" && I !== "" || typeof I == "number" || typeof I == "bigint")
        return I = wu(
          "" + I,
          X.mode,
          te
        ), I.return = X, I;
      if (typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case S:
            return te = Yl(
              I.type,
              I.key,
              I.props,
              null,
              X.mode,
              te
            ), wi(te, I), te.return = X, te;
          case j:
            return I = ju(
              I,
              X.mode,
              te
            ), I.return = X, I;
          case _:
            return I = $r(I), me(X, I, te);
        }
        if (le(I) || W(I))
          return I = Dr(
            I,
            X.mode,
            te,
            null
          ), I.return = X, I;
        if (typeof I.then == "function")
          return me(X, Jl(I), te);
        if (I.$$typeof === M)
          return me(
            X,
            Kl(X, I),
            te
          );
        Wl(X, I);
      }
      return null;
    }
    function ie(X, I, te, he) {
      var $e = I !== null ? I.key : null;
      if (typeof te == "string" && te !== "" || typeof te == "number" || typeof te == "bigint")
        return $e !== null ? null : E(X, I, "" + te, he);
      if (typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case S:
            return te.key === $e ? L(X, I, te, he) : null;
          case j:
            return te.key === $e ? ne(X, I, te, he) : null;
          case _:
            return te = $r(te), ie(X, I, te, he);
        }
        if (le(te) || W(te))
          return $e !== null ? null : ue(X, I, te, he, null);
        if (typeof te.then == "function")
          return ie(
            X,
            I,
            Jl(te),
            he
          );
        if (te.$$typeof === M)
          return ie(
            X,
            I,
            Kl(X, te),
            he
          );
        Wl(X, te);
      }
      return null;
    }
    function oe(X, I, te, he, $e) {
      if (typeof he == "string" && he !== "" || typeof he == "number" || typeof he == "bigint")
        return X = X.get(te) || null, E(I, X, "" + he, $e);
      if (typeof he == "object" && he !== null) {
        switch (he.$$typeof) {
          case S:
            return X = X.get(
              he.key === null ? te : he.key
            ) || null, L(I, X, he, $e);
          case j:
            return X = X.get(
              he.key === null ? te : he.key
            ) || null, ne(I, X, he, $e);
          case _:
            return he = $r(he), oe(
              X,
              I,
              te,
              he,
              $e
            );
        }
        if (le(he) || W(he))
          return X = X.get(te) || null, ue(I, X, he, $e, null);
        if (typeof he.then == "function")
          return oe(
            X,
            I,
            te,
            Jl(he),
            $e
          );
        if (he.$$typeof === M)
          return oe(
            X,
            I,
            te,
            Kl(I, he),
            $e
          );
        Wl(I, he);
      }
      return null;
    }
    function Me(X, I, te, he) {
      for (var $e = null, dt = null, ze = I, Ke = I = 0, st = null; ze !== null && Ke < te.length; Ke++) {
        ze.index > Ke ? (st = ze, ze = null) : st = ze.sibling;
        var ft = ie(
          X,
          ze,
          te[Ke],
          he
        );
        if (ft === null) {
          ze === null && (ze = st);
          break;
        }
        e && ze && ft.alternate === null && n(X, ze), I = h(ft, I, Ke), dt === null ? $e = ft : dt.sibling = ft, dt = ft, ze = st;
      }
      if (Ke === te.length)
        return r(X, ze), lt && Na(X, Ke), $e;
      if (ze === null) {
        for (; Ke < te.length; Ke++)
          ze = me(X, te[Ke], he), ze !== null && (I = h(
            ze,
            I,
            Ke
          ), dt === null ? $e = ze : dt.sibling = ze, dt = ze);
        return lt && Na(X, Ke), $e;
      }
      for (ze = l(ze); Ke < te.length; Ke++)
        st = oe(
          ze,
          X,
          Ke,
          te[Ke],
          he
        ), st !== null && (e && st.alternate !== null && ze.delete(
          st.key === null ? Ke : st.key
        ), I = h(
          st,
          I,
          Ke
        ), dt === null ? $e = st : dt.sibling = st, dt = st);
      return e && ze.forEach(function(hr) {
        return n(X, hr);
      }), lt && Na(X, Ke), $e;
    }
    function Be(X, I, te, he) {
      if (te == null) throw Error(i(151));
      for (var $e = null, dt = null, ze = I, Ke = I = 0, st = null, ft = te.next(); ze !== null && !ft.done; Ke++, ft = te.next()) {
        ze.index > Ke ? (st = ze, ze = null) : st = ze.sibling;
        var hr = ie(X, ze, ft.value, he);
        if (hr === null) {
          ze === null && (ze = st);
          break;
        }
        e && ze && hr.alternate === null && n(X, ze), I = h(hr, I, Ke), dt === null ? $e = hr : dt.sibling = hr, dt = hr, ze = st;
      }
      if (ft.done)
        return r(X, ze), lt && Na(X, Ke), $e;
      if (ze === null) {
        for (; !ft.done; Ke++, ft = te.next())
          ft = me(X, ft.value, he), ft !== null && (I = h(ft, I, Ke), dt === null ? $e = ft : dt.sibling = ft, dt = ft);
        return lt && Na(X, Ke), $e;
      }
      for (ze = l(ze); !ft.done; Ke++, ft = te.next())
        ft = oe(ze, X, Ke, ft.value, he), ft !== null && (e && ft.alternate !== null && ze.delete(ft.key === null ? Ke : ft.key), I = h(ft, I, Ke), dt === null ? $e = ft : dt.sibling = ft, dt = ft);
      return e && ze.forEach(function(CE) {
        return n(X, CE);
      }), lt && Na(X, Ke), $e;
    }
    function jt(X, I, te, he) {
      if (typeof te == "object" && te !== null && te.type === N && te.key === null && (te = te.props.children), typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case S:
            e: {
              for (var $e = te.key; I !== null; ) {
                if (I.key === $e) {
                  if ($e = te.type, $e === N) {
                    if (I.tag === 7) {
                      r(
                        X,
                        I.sibling
                      ), he = d(
                        I,
                        te.props.children
                      ), he.return = X, X = he;
                      break e;
                    }
                  } else if (I.elementType === $e || typeof $e == "object" && $e !== null && $e.$$typeof === _ && $r($e) === I.type) {
                    r(
                      X,
                      I.sibling
                    ), he = d(I, te.props), wi(he, te), he.return = X, X = he;
                    break e;
                  }
                  r(X, I);
                  break;
                } else n(X, I);
                I = I.sibling;
              }
              te.type === N ? (he = Dr(
                te.props.children,
                X.mode,
                he,
                te.key
              ), he.return = X, X = he) : (he = Yl(
                te.type,
                te.key,
                te.props,
                null,
                X.mode,
                he
              ), wi(he, te), he.return = X, X = he);
            }
            return x(X);
          case j:
            e: {
              for ($e = te.key; I !== null; ) {
                if (I.key === $e)
                  if (I.tag === 4 && I.stateNode.containerInfo === te.containerInfo && I.stateNode.implementation === te.implementation) {
                    r(
                      X,
                      I.sibling
                    ), he = d(I, te.children || []), he.return = X, X = he;
                    break e;
                  } else {
                    r(X, I);
                    break;
                  }
                else n(X, I);
                I = I.sibling;
              }
              he = ju(te, X.mode, he), he.return = X, X = he;
            }
            return x(X);
          case _:
            return te = $r(te), jt(
              X,
              I,
              te,
              he
            );
        }
        if (le(te))
          return Me(
            X,
            I,
            te,
            he
          );
        if (W(te)) {
          if ($e = W(te), typeof $e != "function") throw Error(i(150));
          return te = $e.call(te), Be(
            X,
            I,
            te,
            he
          );
        }
        if (typeof te.then == "function")
          return jt(
            X,
            I,
            Jl(te),
            he
          );
        if (te.$$typeof === M)
          return jt(
            X,
            I,
            Kl(X, te),
            he
          );
        Wl(X, te);
      }
      return typeof te == "string" && te !== "" || typeof te == "number" || typeof te == "bigint" ? (te = "" + te, I !== null && I.tag === 6 ? (r(X, I.sibling), he = d(I, te), he.return = X, X = he) : (r(X, I), he = wu(te, X.mode, he), he.return = X, X = he), x(X)) : r(X, I);
    }
    return function(X, I, te, he) {
      try {
        Si = 0;
        var $e = jt(
          X,
          I,
          te,
          he
        );
        return xs = null, $e;
      } catch (ze) {
        if (ze === bs || ze === Ql) throw ze;
        var dt = Ln(29, ze, null, X.mode);
        return dt.lanes = he, dt.return = X, dt;
      } finally {
      }
    };
  }
  var Br = Sp(!0), wp = Sp(!1), Qa = !1;
  function Ou(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Lu(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Za(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ja(e, n, r) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (mt & 2) !== 0) {
      var d = l.pending;
      return d === null ? n.next = n : (n.next = d.next, d.next = n), l.pending = n, n = Fl(e), sp(e, null, r), n;
    }
    return ql(e, l, n, r), Fl(e);
  }
  function ji(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, Kt(e, r);
    }
  }
  function $u(e, n) {
    var r = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, r === l)) {
      var d = null, h = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var x = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          };
          h === null ? d = h = x : h = h.next = x, r = r.next;
        } while (r !== null);
        h === null ? d = h = n : h = h.next = n;
      } else d = h = n;
      r = {
        baseState: l.baseState,
        firstBaseUpdate: d,
        lastBaseUpdate: h,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = n : e.next = n, r.lastBaseUpdate = n;
  }
  var Uu = !1;
  function Ei() {
    if (Uu) {
      var e = ys;
      if (e !== null) throw e;
    }
  }
  function Ni(e, n, r, l) {
    Uu = !1;
    var d = e.updateQueue;
    Qa = !1;
    var h = d.firstBaseUpdate, x = d.lastBaseUpdate, E = d.shared.pending;
    if (E !== null) {
      d.shared.pending = null;
      var L = E, ne = L.next;
      L.next = null, x === null ? h = ne : x.next = ne, x = L;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, E = ue.lastBaseUpdate, E !== x && (E === null ? ue.firstBaseUpdate = ne : E.next = ne, ue.lastBaseUpdate = L));
    }
    if (h !== null) {
      var me = d.baseState;
      x = 0, ue = ne = L = null, E = h;
      do {
        var ie = E.lane & -536870913, oe = ie !== E.lane;
        if (oe ? (rt & ie) === ie : (l & ie) === ie) {
          ie !== 0 && ie === vs && (Uu = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Me = e, Be = E;
            ie = n;
            var jt = r;
            switch (Be.tag) {
              case 1:
                if (Me = Be.payload, typeof Me == "function") {
                  me = Me.call(jt, me, ie);
                  break e;
                }
                me = Me;
                break e;
              case 3:
                Me.flags = Me.flags & -65537 | 128;
              case 0:
                if (Me = Be.payload, ie = typeof Me == "function" ? Me.call(jt, me, ie) : Me, ie == null) break e;
                me = v({}, me, ie);
                break e;
              case 2:
                Qa = !0;
            }
          }
          ie = E.callback, ie !== null && (e.flags |= 64, oe && (e.flags |= 8192), oe = d.callbacks, oe === null ? d.callbacks = [ie] : oe.push(ie));
        } else
          oe = {
            lane: ie,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, ue === null ? (ne = ue = oe, L = me) : ue = ue.next = oe, x |= ie;
        if (E = E.next, E === null) {
          if (E = d.shared.pending, E === null)
            break;
          oe = E, E = oe.next, oe.next = null, d.lastBaseUpdate = oe, d.shared.pending = null;
        }
      } while (!0);
      ue === null && (L = me), d.baseState = L, d.firstBaseUpdate = ne, d.lastBaseUpdate = ue, h === null && (d.shared.lanes = 0), ar |= x, e.lanes = x, e.memoizedState = me;
    }
  }
  function jp(e, n) {
    if (typeof e != "function")
      throw Error(i(191, e));
    e.call(n);
  }
  function Ep(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        jp(r[e], n);
  }
  var Ss = D(null), eo = D(0);
  function Np(e, n) {
    e = La, Z(eo, e), Z(Ss, n), La = e | n.baseLanes;
  }
  function Bu() {
    Z(eo, La), Z(Ss, Ss.current);
  }
  function Vu() {
    La = eo.current, H(Ss), H(eo);
  }
  var $n = D(null), Qn = null;
  function Wa(e) {
    var n = e.alternate;
    Z(qt, qt.current & 1), Z($n, e), Qn === null && (n === null || Ss.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function Iu(e) {
    Z(qt, qt.current), Z($n, e), Qn === null && (Qn = e);
  }
  function Cp(e) {
    e.tag === 22 ? (Z(qt, qt.current), Z($n, e), Qn === null && (Qn = e)) : er();
  }
  function er() {
    Z(qt, qt.current), Z($n, $n.current);
  }
  function Un(e) {
    H($n), Qn === e && (Qn = null), H(qt);
  }
  var qt = D(0);
  function to(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Pd(r) || Kd(r)))
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
  var Ra = 0, Ye = null, St = null, Jt = null, no = !1, ws = !1, Vr = !1, ao = 0, Ci = 0, js = null, gj = 0;
  function Vt() {
    throw Error(i(321));
  }
  function Hu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!On(e[r], n[r])) return !1;
    return !0;
  }
  function qu(e, n, r, l, d, h) {
    return Ra = h, Ye = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, A.H = e === null || e.memoizedState === null ? cg : rd, Vr = !1, h = r(l, d), Vr = !1, ws && (h = Rp(
      n,
      r,
      l,
      d
    )), Tp(e), h;
  }
  function Tp(e) {
    A.H = _i;
    var n = St !== null && St.next !== null;
    if (Ra = 0, Jt = St = Ye = null, no = !1, Ci = 0, js = null, n) throw Error(i(300));
    e === null || Wt || (e = e.dependencies, e !== null && Pl(e) && (Wt = !0));
  }
  function Rp(e, n, r, l) {
    Ye = e;
    var d = 0;
    do {
      if (ws && (js = null), Ci = 0, ws = !1, 25 <= d) throw Error(i(301));
      if (d += 1, Jt = St = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      A.H = ug, h = n(r, l);
    } while (ws);
    return h;
  }
  function vj() {
    var e = A.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ti(n) : n, e = e.useState()[0], (St !== null ? St.memoizedState : null) !== e && (Ye.flags |= 1024), n;
  }
  function Fu() {
    var e = ao !== 0;
    return ao = 0, e;
  }
  function Yu(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function Gu(e) {
    if (no) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      no = !1;
    }
    Ra = 0, Jt = St = Ye = null, ws = !1, Ci = ao = 0, js = null;
  }
  function wn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Jt === null ? Ye.memoizedState = Jt = e : Jt = Jt.next = e, Jt;
  }
  function Ft() {
    if (St === null) {
      var e = Ye.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = St.next;
    var n = Jt === null ? Ye.memoizedState : Jt.next;
    if (n !== null)
      Jt = n, St = e;
    else {
      if (e === null)
        throw Ye.alternate === null ? Error(i(467)) : Error(i(310));
      St = e, e = {
        memoizedState: St.memoizedState,
        baseState: St.baseState,
        baseQueue: St.baseQueue,
        queue: St.queue,
        next: null
      }, Jt === null ? Ye.memoizedState = Jt = e : Jt = Jt.next = e;
    }
    return Jt;
  }
  function ro() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ti(e) {
    var n = Ci;
    return Ci += 1, js === null && (js = []), e = yp(js, e, n), n = Ye, (Jt === null ? n.memoizedState : Jt.next) === null && (n = n.alternate, A.H = n === null || n.memoizedState === null ? cg : rd), e;
  }
  function so(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ti(e);
      if (e.$$typeof === M) return un(e);
    }
    throw Error(i(438, String(e)));
  }
  function Pu(e) {
    var n = null, r = Ye.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var l = Ye.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (n = {
        data: l.data.map(function(d) {
          return d.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = ro(), Ye.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), l = 0; l < e; l++)
        r[l] = k;
    return n.index++, r;
  }
  function _a(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function io(e) {
    var n = Ft();
    return Ku(n, St, e);
  }
  function Ku(e, n, r) {
    var l = e.queue;
    if (l === null) throw Error(i(311));
    l.lastRenderedReducer = r;
    var d = e.baseQueue, h = l.pending;
    if (h !== null) {
      if (d !== null) {
        var x = d.next;
        d.next = h.next, h.next = x;
      }
      n.baseQueue = d = h, l.pending = null;
    }
    if (h = e.baseState, d === null) e.memoizedState = h;
    else {
      n = d.next;
      var E = x = null, L = null, ne = n, ue = !1;
      do {
        var me = ne.lane & -536870913;
        if (me !== ne.lane ? (rt & me) === me : (Ra & me) === me) {
          var ie = ne.revertLane;
          if (ie === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ne.action,
              hasEagerState: ne.hasEagerState,
              eagerState: ne.eagerState,
              next: null
            }), me === vs && (ue = !0);
          else if ((Ra & ie) === ie) {
            ne = ne.next, ie === vs && (ue = !0);
            continue;
          } else
            me = {
              lane: 0,
              revertLane: ne.revertLane,
              gesture: null,
              action: ne.action,
              hasEagerState: ne.hasEagerState,
              eagerState: ne.eagerState,
              next: null
            }, L === null ? (E = L = me, x = h) : L = L.next = me, Ye.lanes |= ie, ar |= ie;
          me = ne.action, Vr && r(h, me), h = ne.hasEagerState ? ne.eagerState : r(h, me);
        } else
          ie = {
            lane: me,
            revertLane: ne.revertLane,
            gesture: ne.gesture,
            action: ne.action,
            hasEagerState: ne.hasEagerState,
            eagerState: ne.eagerState,
            next: null
          }, L === null ? (E = L = ie, x = h) : L = L.next = ie, Ye.lanes |= me, ar |= me;
        ne = ne.next;
      } while (ne !== null && ne !== n);
      if (L === null ? x = h : L.next = E, !On(h, e.memoizedState) && (Wt = !0, ue && (r = ys, r !== null)))
        throw r;
      e.memoizedState = h, e.baseState = x, e.baseQueue = L, l.lastRenderedState = h;
    }
    return d === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Xu(e) {
    var n = Ft(), r = n.queue;
    if (r === null) throw Error(i(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch, d = r.pending, h = n.memoizedState;
    if (d !== null) {
      r.pending = null;
      var x = d = d.next;
      do
        h = e(h, x.action), x = x.next;
      while (x !== d);
      On(h, n.memoizedState) || (Wt = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), r.lastRenderedState = h;
    }
    return [h, l];
  }
  function _p(e, n, r) {
    var l = Ye, d = Ft(), h = lt;
    if (h) {
      if (r === void 0) throw Error(i(407));
      r = r();
    } else r = n();
    var x = !On(
      (St || d).memoizedState,
      r
    );
    if (x && (d.memoizedState = r, Wt = !0), d = d.queue, Ju(Dp.bind(null, l, d, e), [
      e
    ]), d.getSnapshot !== n || x || Jt !== null && Jt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Es(
        9,
        { destroy: void 0 },
        Ap.bind(
          null,
          l,
          d,
          r,
          n
        ),
        null
      ), Nt === null) throw Error(i(349));
      h || (Ra & 127) !== 0 || Mp(l, n, r);
    }
    return r;
  }
  function Mp(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Ye.updateQueue, n === null ? (n = ro(), Ye.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function Ap(e, n, r, l) {
    n.value = r, n.getSnapshot = l, kp(n) && zp(e);
  }
  function Dp(e, n, r) {
    return r(function() {
      kp(n) && zp(e);
    });
  }
  function kp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !On(e, r);
    } catch {
      return !0;
    }
  }
  function zp(e) {
    var n = Ar(e, 2);
    n !== null && Mn(n, e, 2);
  }
  function Qu(e) {
    var n = wn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), Vr) {
        Tt(!0);
        try {
          r();
        } finally {
          Tt(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: _a,
      lastRenderedState: e
    }, n;
  }
  function Op(e, n, r, l) {
    return e.baseState = r, Ku(
      e,
      St,
      typeof l == "function" ? l : _a
    );
  }
  function yj(e, n, r, l, d) {
    if (co(e)) throw Error(i(485));
    if (e = n.action, e !== null) {
      var h = {
        payload: d,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(x) {
          h.listeners.push(x);
        }
      };
      A.T !== null ? r(!0) : h.isTransition = !1, l(h), r = n.pending, r === null ? (h.next = n.pending = h, Lp(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function Lp(e, n) {
    var r = n.action, l = n.payload, d = e.state;
    if (n.isTransition) {
      var h = A.T, x = {};
      A.T = x;
      try {
        var E = r(d, l), L = A.S;
        L !== null && L(x, E), $p(e, n, E);
      } catch (ne) {
        Zu(e, n, ne);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), A.T = h;
      }
    } else
      try {
        h = r(d, l), $p(e, n, h);
      } catch (ne) {
        Zu(e, n, ne);
      }
  }
  function $p(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        Up(e, n, l);
      },
      function(l) {
        return Zu(e, n, l);
      }
    ) : Up(e, n, r);
  }
  function Up(e, n, r) {
    n.status = "fulfilled", n.value = r, Bp(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Lp(e, r)));
  }
  function Zu(e, n, r) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = r, Bp(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function Bp(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Vp(e, n) {
    return n;
  }
  function Ip(e, n) {
    if (lt) {
      var r = Nt.formState;
      if (r !== null) {
        e: {
          var l = Ye;
          if (lt) {
            if (kt) {
              t: {
                for (var d = kt, h = Xn; d.nodeType !== 8; ) {
                  if (!h) {
                    d = null;
                    break t;
                  }
                  if (d = Zn(
                    d.nextSibling
                  ), d === null) {
                    d = null;
                    break t;
                  }
                }
                h = d.data, d = h === "F!" || h === "F" ? d : null;
              }
              if (d) {
                kt = Zn(
                  d.nextSibling
                ), l = d.data === "F!";
                break e;
              }
            }
            Ka(l);
          }
          l = !1;
        }
        l && (n = r[0]);
      }
    }
    return r = wn(), r.memoizedState = r.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vp,
      lastRenderedState: n
    }, r.queue = l, r = ig.bind(
      null,
      Ye,
      l
    ), l.dispatch = r, l = Qu(!1), h = ad.bind(
      null,
      Ye,
      !1,
      l.queue
    ), l = wn(), d = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = d, r = yj.bind(
      null,
      Ye,
      d,
      h,
      r
    ), d.dispatch = r, l.memoizedState = e, [n, r, !1];
  }
  function Hp(e) {
    var n = Ft();
    return qp(n, St, e);
  }
  function qp(e, n, r) {
    if (n = Ku(
      e,
      n,
      Vp
    )[0], e = io(_a)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = Ti(n);
      } catch (x) {
        throw x === bs ? Ql : x;
      }
    else l = n;
    n = Ft();
    var d = n.queue, h = d.dispatch;
    return r !== n.memoizedState && (Ye.flags |= 2048, Es(
      9,
      { destroy: void 0 },
      bj.bind(null, d, r),
      null
    )), [l, h, e];
  }
  function bj(e, n) {
    e.action = n;
  }
  function Fp(e) {
    var n = Ft(), r = St;
    if (r !== null)
      return qp(n, r, e);
    Ft(), n = n.memoizedState, r = Ft();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [n, l, !1];
  }
  function Es(e, n, r, l) {
    return e = { tag: e, create: r, deps: l, inst: n, next: null }, n = Ye.updateQueue, n === null && (n = ro(), Ye.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Yp() {
    return Ft().memoizedState;
  }
  function lo(e, n, r, l) {
    var d = wn();
    Ye.flags |= e, d.memoizedState = Es(
      1 | n,
      { destroy: void 0 },
      r,
      l === void 0 ? null : l
    );
  }
  function oo(e, n, r, l) {
    var d = Ft();
    l = l === void 0 ? null : l;
    var h = d.memoizedState.inst;
    St !== null && l !== null && Hu(l, St.memoizedState.deps) ? d.memoizedState = Es(n, h, r, l) : (Ye.flags |= e, d.memoizedState = Es(
      1 | n,
      h,
      r,
      l
    ));
  }
  function Gp(e, n) {
    lo(8390656, 8, e, n);
  }
  function Ju(e, n) {
    oo(2048, 8, e, n);
  }
  function xj(e) {
    Ye.flags |= 4;
    var n = Ye.updateQueue;
    if (n === null)
      n = ro(), Ye.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Pp(e) {
    var n = Ft().memoizedState;
    return xj({ ref: n, nextImpl: e }), function() {
      if ((mt & 2) !== 0) throw Error(i(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Kp(e, n) {
    return oo(4, 2, e, n);
  }
  function Xp(e, n) {
    return oo(4, 4, e, n);
  }
  function Qp(e, n) {
    if (typeof n == "function") {
      e = e();
      var r = n(e);
      return function() {
        typeof r == "function" ? r() : n(null);
      };
    }
    if (n != null)
      return e = e(), n.current = e, function() {
        n.current = null;
      };
  }
  function Zp(e, n, r) {
    r = r != null ? r.concat([e]) : null, oo(4, 4, Qp.bind(null, n, e), r);
  }
  function Wu() {
  }
  function Jp(e, n) {
    var r = Ft();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    return n !== null && Hu(n, l[1]) ? l[0] : (r.memoizedState = [e, n], e);
  }
  function Wp(e, n) {
    var r = Ft();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    if (n !== null && Hu(n, l[1]))
      return l[0];
    if (l = e(), Vr) {
      Tt(!0);
      try {
        e();
      } finally {
        Tt(!1);
      }
    }
    return r.memoizedState = [l, n], l;
  }
  function ed(e, n, r) {
    return r === void 0 || (Ra & 1073741824) !== 0 && (rt & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = ev(), Ye.lanes |= e, ar |= e, r);
  }
  function eg(e, n, r, l) {
    return On(r, n) ? r : Ss.current !== null ? (e = ed(e, r, l), On(e, n) || (Wt = !0), e) : (Ra & 42) === 0 || (Ra & 1073741824) !== 0 && (rt & 261930) === 0 ? (Wt = !0, e.memoizedState = r) : (e = ev(), Ye.lanes |= e, ar |= e, n);
  }
  function tg(e, n, r, l, d) {
    var h = Y.p;
    Y.p = h !== 0 && 8 > h ? h : 8;
    var x = A.T, E = {};
    A.T = E, ad(e, !1, n, r);
    try {
      var L = d(), ne = A.S;
      if (ne !== null && ne(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ue = pj(
          L,
          l
        );
        Ri(
          e,
          n,
          ue,
          In(e)
        );
      } else
        Ri(
          e,
          n,
          l,
          In(e)
        );
    } catch (me) {
      Ri(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: me },
        In()
      );
    } finally {
      Y.p = h, x !== null && E.types !== null && (x.types = E.types), A.T = x;
    }
  }
  function Sj() {
  }
  function td(e, n, r, l) {
    if (e.tag !== 5) throw Error(i(476));
    var d = ng(e).queue;
    tg(
      e,
      d,
      n,
      $,
      r === null ? Sj : function() {
        return ag(e), r(l);
      }
    );
  }
  function ng(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _a,
        lastRenderedState: $
      },
      next: null
    };
    var r = {};
    return n.next = {
      memoizedState: r,
      baseState: r,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _a,
        lastRenderedState: r
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function ag(e) {
    var n = ng(e);
    n.next === null && (n = e.alternate.memoizedState), Ri(
      e,
      n.next.queue,
      {},
      In()
    );
  }
  function nd() {
    return un(Yi);
  }
  function rg() {
    return Ft().memoizedState;
  }
  function sg() {
    return Ft().memoizedState;
  }
  function wj(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = In();
          e = Za(r);
          var l = Ja(n, e, r);
          l !== null && (Mn(l, n, r), ji(l, n, r)), n = { cache: Au() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function jj(e, n, r) {
    var l = In();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, co(e) ? lg(n, r) : (r = xu(e, n, r, l), r !== null && (Mn(r, e, l), og(r, n, l)));
  }
  function ig(e, n, r) {
    var l = In();
    Ri(e, n, r, l);
  }
  function Ri(e, n, r, l) {
    var d = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (co(e)) lg(n, d);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var x = n.lastRenderedState, E = h(x, r);
          if (d.hasEagerState = !0, d.eagerState = E, On(E, x))
            return ql(e, n, d, 0), Nt === null && Hl(), !1;
        } catch {
        } finally {
        }
      if (r = xu(e, n, d, l), r !== null)
        return Mn(r, e, l), og(r, n, l), !0;
    }
    return !1;
  }
  function ad(e, n, r, l) {
    if (l = {
      lane: 2,
      revertLane: Od(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, co(e)) {
      if (n) throw Error(i(479));
    } else
      n = xu(
        e,
        r,
        l,
        2
      ), n !== null && Mn(n, e, 2);
  }
  function co(e) {
    var n = e.alternate;
    return e === Ye || n !== null && n === Ye;
  }
  function lg(e, n) {
    ws = no = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function og(e, n, r) {
    if ((r & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, Kt(e, r);
    }
  }
  var _i = {
    readContext: un,
    use: so,
    useCallback: Vt,
    useContext: Vt,
    useEffect: Vt,
    useImperativeHandle: Vt,
    useLayoutEffect: Vt,
    useInsertionEffect: Vt,
    useMemo: Vt,
    useReducer: Vt,
    useRef: Vt,
    useState: Vt,
    useDebugValue: Vt,
    useDeferredValue: Vt,
    useTransition: Vt,
    useSyncExternalStore: Vt,
    useId: Vt,
    useHostTransitionStatus: Vt,
    useFormState: Vt,
    useActionState: Vt,
    useOptimistic: Vt,
    useMemoCache: Vt,
    useCacheRefresh: Vt
  };
  _i.useEffectEvent = Vt;
  var cg = {
    readContext: un,
    use: so,
    useCallback: function(e, n) {
      return wn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: un,
    useEffect: Gp,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, lo(
        4194308,
        4,
        Qp.bind(null, n, e),
        r
      );
    },
    useLayoutEffect: function(e, n) {
      return lo(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      lo(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var r = wn();
      n = n === void 0 ? null : n;
      var l = e();
      if (Vr) {
        Tt(!0);
        try {
          e();
        } finally {
          Tt(!1);
        }
      }
      return r.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, r) {
      var l = wn();
      if (r !== void 0) {
        var d = r(n);
        if (Vr) {
          Tt(!0);
          try {
            r(n);
          } finally {
            Tt(!1);
          }
        }
      } else d = n;
      return l.memoizedState = l.baseState = d, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: d
      }, l.queue = e, e = e.dispatch = jj.bind(
        null,
        Ye,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = wn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Qu(e);
      var n = e.queue, r = ig.bind(null, Ye, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: Wu,
    useDeferredValue: function(e, n) {
      var r = wn();
      return ed(r, e, n);
    },
    useTransition: function() {
      var e = Qu(!1);
      return e = tg.bind(
        null,
        Ye,
        e.queue,
        !0,
        !1
      ), wn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var l = Ye, d = wn();
      if (lt) {
        if (r === void 0)
          throw Error(i(407));
        r = r();
      } else {
        if (r = n(), Nt === null)
          throw Error(i(349));
        (rt & 127) !== 0 || Mp(l, n, r);
      }
      d.memoizedState = r;
      var h = { value: r, getSnapshot: n };
      return d.queue = h, Gp(Dp.bind(null, l, h, e), [
        e
      ]), l.flags |= 2048, Es(
        9,
        { destroy: void 0 },
        Ap.bind(
          null,
          l,
          h,
          r,
          n
        ),
        null
      ), r;
    },
    useId: function() {
      var e = wn(), n = Nt.identifierPrefix;
      if (lt) {
        var r = ga, l = pa;
        r = (l & ~(1 << 32 - pt(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = ao++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = gj++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: nd,
    useFormState: Ip,
    useActionState: Ip,
    useOptimistic: function(e) {
      var n = wn();
      n.memoizedState = n.baseState = e;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = r, n = ad.bind(
        null,
        Ye,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: Pu,
    useCacheRefresh: function() {
      return wn().memoizedState = wj.bind(
        null,
        Ye
      );
    },
    useEffectEvent: function(e) {
      var n = wn(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((mt & 2) !== 0)
          throw Error(i(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, rd = {
    readContext: un,
    use: so,
    useCallback: Jp,
    useContext: un,
    useEffect: Ju,
    useImperativeHandle: Zp,
    useInsertionEffect: Kp,
    useLayoutEffect: Xp,
    useMemo: Wp,
    useReducer: io,
    useRef: Yp,
    useState: function() {
      return io(_a);
    },
    useDebugValue: Wu,
    useDeferredValue: function(e, n) {
      var r = Ft();
      return eg(
        r,
        St.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = io(_a)[0], n = Ft().memoizedState;
      return [
        typeof e == "boolean" ? e : Ti(e),
        n
      ];
    },
    useSyncExternalStore: _p,
    useId: rg,
    useHostTransitionStatus: nd,
    useFormState: Hp,
    useActionState: Hp,
    useOptimistic: function(e, n) {
      var r = Ft();
      return Op(r, St, e, n);
    },
    useMemoCache: Pu,
    useCacheRefresh: sg
  };
  rd.useEffectEvent = Pp;
  var ug = {
    readContext: un,
    use: so,
    useCallback: Jp,
    useContext: un,
    useEffect: Ju,
    useImperativeHandle: Zp,
    useInsertionEffect: Kp,
    useLayoutEffect: Xp,
    useMemo: Wp,
    useReducer: Xu,
    useRef: Yp,
    useState: function() {
      return Xu(_a);
    },
    useDebugValue: Wu,
    useDeferredValue: function(e, n) {
      var r = Ft();
      return St === null ? ed(r, e, n) : eg(
        r,
        St.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Xu(_a)[0], n = Ft().memoizedState;
      return [
        typeof e == "boolean" ? e : Ti(e),
        n
      ];
    },
    useSyncExternalStore: _p,
    useId: rg,
    useHostTransitionStatus: nd,
    useFormState: Fp,
    useActionState: Fp,
    useOptimistic: function(e, n) {
      var r = Ft();
      return St !== null ? Op(r, St, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Pu,
    useCacheRefresh: sg
  };
  ug.useEffectEvent = Pp;
  function sd(e, n, r, l) {
    n = e.memoizedState, r = r(l, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var id = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var l = In(), d = Za(l);
      d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (Mn(n, e, l), ji(n, e, l));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var l = In(), d = Za(l);
      d.tag = 1, d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (Mn(n, e, l), ji(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = In(), l = Za(r);
      l.tag = 2, n != null && (l.callback = n), n = Ja(e, l, r), n !== null && (Mn(n, e, r), ji(n, e, r));
    }
  };
  function dg(e, n, r, l, d, h, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, x) : n.prototype && n.prototype.isPureReactComponent ? !pi(r, l) || !pi(d, h) : !0;
  }
  function fg(e, n, r, l) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, l), n.state !== e && id.enqueueReplaceState(n, n.state, null);
  }
  function Ir(e, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var l in n)
        l !== "ref" && (r[l] = n[l]);
    }
    if (e = e.defaultProps) {
      r === n && (r = v({}, r));
      for (var d in e)
        r[d] === void 0 && (r[d] = e[d]);
    }
    return r;
  }
  function hg(e) {
    Il(e);
  }
  function mg(e) {
    console.error(e);
  }
  function pg(e) {
    Il(e);
  }
  function uo(e, n) {
    try {
      var r = e.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function gg(e, n, r) {
    try {
      var l = e.onCaughtError;
      l(r.value, {
        componentStack: r.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (d) {
      setTimeout(function() {
        throw d;
      });
    }
  }
  function ld(e, n, r) {
    return r = Za(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      uo(e, n);
    }, r;
  }
  function vg(e) {
    return e = Za(e), e.tag = 3, e;
  }
  function yg(e, n, r, l) {
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var h = l.value;
      e.payload = function() {
        return d(h);
      }, e.callback = function() {
        gg(n, r, l);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      gg(n, r, l), typeof d != "function" && (rr === null ? rr = /* @__PURE__ */ new Set([this]) : rr.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function Ej(e, n, r, l, d) {
    if (r.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = r.alternate, n !== null && gs(
        n,
        r,
        d,
        !0
      ), r = $n.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return Qn === null ? jo() : r.alternate === null && It === 0 && (It = 3), r.flags &= -257, r.flags |= 65536, r.lanes = d, l === Zl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Dd(e, l, d)), !1;
          case 22:
            return r.flags |= 65536, l === Zl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : r.add(l)), Dd(e, l, d)), !1;
        }
        throw Error(i(435, r.tag));
      }
      return Dd(e, l, d), jo(), !1;
    }
    if (lt)
      return n = $n.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = d, l !== Cu && (e = Error(i(422), { cause: l }), yi(Gn(e, r)))) : (l !== Cu && (n = Error(i(423), {
        cause: l
      }), yi(
        Gn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, d &= -d, e.lanes |= d, l = Gn(l, r), d = ld(
        e.stateNode,
        l,
        d
      ), $u(e, d), It !== 4 && (It = 2)), !1;
    var h = Error(i(520), { cause: l });
    if (h = Gn(h, r), $i === null ? $i = [h] : $i.push(h), It !== 4 && (It = 2), n === null) return !0;
    l = Gn(l, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = d & -d, r.lanes |= e, e = ld(r.stateNode, l, e), $u(r, e), !1;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (rr === null || !rr.has(h))))
            return r.flags |= 65536, d &= -d, r.lanes |= d, d = vg(d), yg(
              d,
              e,
              r,
              l
            ), $u(r, d), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var od = Error(i(461)), Wt = !1;
  function dn(e, n, r, l) {
    n.child = e === null ? wp(n, null, r, l) : Br(
      n,
      e.child,
      r,
      l
    );
  }
  function bg(e, n, r, l, d) {
    r = r.render;
    var h = n.ref;
    if ("ref" in l) {
      var x = {};
      for (var E in l)
        E !== "ref" && (x[E] = l[E]);
    } else x = l;
    return Or(n), l = qu(
      e,
      n,
      r,
      x,
      h,
      d
    ), E = Fu(), e !== null && !Wt ? (Yu(e, n, d), Ma(e, n, d)) : (lt && E && Eu(n), n.flags |= 1, dn(e, n, l, d), n.child);
  }
  function xg(e, n, r, l, d) {
    if (e === null) {
      var h = r.type;
      return typeof h == "function" && !Su(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, Sg(
        e,
        n,
        h,
        l,
        d
      )) : (e = Yl(
        r.type,
        null,
        l,
        n,
        n.mode,
        d
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (h = e.child, !gd(e, d)) {
      var x = h.memoizedProps;
      if (r = r.compare, r = r !== null ? r : pi, r(x, l) && e.ref === n.ref)
        return Ma(e, n, d);
    }
    return n.flags |= 1, e = Ea(h, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Sg(e, n, r, l, d) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (pi(h, l) && e.ref === n.ref)
        if (Wt = !1, n.pendingProps = l = h, gd(e, d))
          (e.flags & 131072) !== 0 && (Wt = !0);
        else
          return n.lanes = e.lanes, Ma(e, n, d);
    }
    return cd(
      e,
      n,
      r,
      l,
      d
    );
  }
  function wg(e, n, r, l) {
    var d = l.children, h = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (h = h !== null ? h.baseLanes | r : r, e !== null) {
          for (l = n.child = e.child, d = 0; l !== null; )
            d = d | l.lanes | l.childLanes, l = l.sibling;
          l = d & ~h;
        } else l = 0, n.child = null;
        return jg(
          e,
          n,
          h,
          r,
          l
        );
      }
      if ((r & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Xl(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Np(n, h) : Bu(), Cp(n);
      else
        return l = n.lanes = 536870912, jg(
          e,
          n,
          h !== null ? h.baseLanes | r : r,
          r,
          l
        );
    } else
      h !== null ? (Xl(n, h.cachePool), Np(n, h), er(), n.memoizedState = null) : (e !== null && Xl(n, null), Bu(), er());
    return dn(e, n, d, r), n.child;
  }
  function Mi(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function jg(e, n, r, l, d) {
    var h = ku();
    return h = h === null ? null : { parent: Zt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: r,
      cachePool: h
    }, e !== null && Xl(n, null), Bu(), Cp(n), e !== null && gs(e, n, l, !0), n.childLanes = d, null;
  }
  function fo(e, n) {
    return n = mo(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Eg(e, n, r) {
    return Br(n, e.child, null, r), e = fo(n, n.pendingProps), e.flags |= 2, Un(n), n.memoizedState = null, e;
  }
  function Nj(e, n, r) {
    var l = n.pendingProps, d = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (lt) {
        if (l.mode === "hidden")
          return e = fo(n, l), n.lanes = 536870912, Mi(null, e);
        if (Iu(n), (e = kt) ? (e = Lv(
          e,
          Xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: pa, overflow: ga } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = lp(e), r.return = n, n.child = r, cn = n, kt = null)) : e = null, e === null) throw Ka(n);
        return n.lanes = 536870912, null;
      }
      return fo(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var x = h.dehydrated;
      if (Iu(n), d)
        if (n.flags & 256)
          n.flags &= -257, n = Eg(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(i(558));
      else if (Wt || gs(e, n, r, !1), d = (r & e.childLanes) !== 0, Wt || d) {
        if (l = Nt, l !== null && (x = z(l, r), x !== 0 && x !== h.retryLane))
          throw h.retryLane = x, Ar(e, x), Mn(l, e, x), od;
        jo(), n = Eg(
          e,
          n,
          r
        );
      } else
        e = h.treeContext, kt = Zn(x.nextSibling), cn = n, lt = !0, Pa = null, Xn = !1, e !== null && up(n, e), n = fo(n, l), n.flags |= 4096;
      return n;
    }
    return e = Ea(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function ho(e, n) {
    var r = n.ref;
    if (r === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(i(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function cd(e, n, r, l, d) {
    return Or(n), r = qu(
      e,
      n,
      r,
      l,
      void 0,
      d
    ), l = Fu(), e !== null && !Wt ? (Yu(e, n, d), Ma(e, n, d)) : (lt && l && Eu(n), n.flags |= 1, dn(e, n, r, d), n.child);
  }
  function Ng(e, n, r, l, d, h) {
    return Or(n), n.updateQueue = null, r = Rp(
      n,
      l,
      r,
      d
    ), Tp(e), l = Fu(), e !== null && !Wt ? (Yu(e, n, h), Ma(e, n, h)) : (lt && l && Eu(n), n.flags |= 1, dn(e, n, r, h), n.child);
  }
  function Cg(e, n, r, l, d) {
    if (Or(n), n.stateNode === null) {
      var h = fs, x = r.contextType;
      typeof x == "object" && x !== null && (h = un(x)), h = new r(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = id, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, Ou(n), x = r.contextType, h.context = typeof x == "object" && x !== null ? un(x) : fs, h.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (sd(
        n,
        r,
        x,
        l
      ), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (x = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), x !== h.state && id.enqueueReplaceState(h, h.state, null), Ni(n, l, h, d), Ei(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      h = n.stateNode;
      var E = n.memoizedProps, L = Ir(r, E);
      h.props = L;
      var ne = h.context, ue = r.contextType;
      x = fs, typeof ue == "object" && ue !== null && (x = un(ue));
      var me = r.getDerivedStateFromProps;
      ue = typeof me == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, ue || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || ne !== x) && fg(
        n,
        h,
        l,
        x
      ), Qa = !1;
      var ie = n.memoizedState;
      h.state = ie, Ni(n, l, h, d), Ei(), ne = n.memoizedState, E || ie !== ne || Qa ? (typeof me == "function" && (sd(
        n,
        r,
        me,
        l
      ), ne = n.memoizedState), (L = Qa || dg(
        n,
        r,
        L,
        l,
        ie,
        ne,
        x
      )) ? (ue || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = ne), h.props = l, h.state = ne, h.context = x, l = L) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, Lu(e, n), x = n.memoizedProps, ue = Ir(r, x), h.props = ue, me = n.pendingProps, ie = h.context, ne = r.contextType, L = fs, typeof ne == "object" && ne !== null && (L = un(ne)), E = r.getDerivedStateFromProps, (ne = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== me || ie !== L) && fg(
        n,
        h,
        l,
        L
      ), Qa = !1, ie = n.memoizedState, h.state = ie, Ni(n, l, h, d), Ei();
      var oe = n.memoizedState;
      x !== me || ie !== oe || Qa || e !== null && e.dependencies !== null && Pl(e.dependencies) ? (typeof E == "function" && (sd(
        n,
        r,
        E,
        l
      ), oe = n.memoizedState), (ue = Qa || dg(
        n,
        r,
        ue,
        l,
        ie,
        oe,
        L
      ) || e !== null && e.dependencies !== null && Pl(e.dependencies)) ? (ne || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, oe, L), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        oe,
        L
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = oe), h.props = l, h.state = oe, h.context = L, l = ue) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), l = !1);
    }
    return h = l, ho(e, n), l = (n.flags & 128) !== 0, h || l ? (h = n.stateNode, r = l && typeof r.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, e !== null && l ? (n.child = Br(
      n,
      e.child,
      null,
      d
    ), n.child = Br(
      n,
      null,
      r,
      d
    )) : dn(e, n, r, d), n.memoizedState = h.state, e = n.child) : e = Ma(
      e,
      n,
      d
    ), e;
  }
  function Tg(e, n, r, l) {
    return kr(), n.flags |= 256, dn(e, n, r, l), n.child;
  }
  var ud = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function dd(e) {
    return { baseLanes: e, cachePool: gp() };
  }
  function fd(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Vn), e;
  }
  function Rg(e, n, r) {
    var l = n.pendingProps, d = !1, h = (n.flags & 128) !== 0, x;
    if ((x = h) || (x = e !== null && e.memoizedState === null ? !1 : (qt.current & 2) !== 0), x && (d = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (lt) {
        if (d ? Wa(n) : er(), (e = kt) ? (e = Lv(
          e,
          Xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: pa, overflow: ga } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = lp(e), r.return = n, n.child = r, cn = n, kt = null)) : e = null, e === null) throw Ka(n);
        return Kd(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = l.children;
      return l = l.fallback, d ? (er(), d = n.mode, E = mo(
        { mode: "hidden", children: E },
        d
      ), l = Dr(
        l,
        d,
        r,
        null
      ), E.return = n, l.return = n, E.sibling = l, n.child = E, l = n.child, l.memoizedState = dd(r), l.childLanes = fd(
        e,
        x,
        r
      ), n.memoizedState = ud, Mi(null, l)) : (Wa(n), hd(n, E));
    }
    var L = e.memoizedState;
    if (L !== null && (E = L.dehydrated, E !== null)) {
      if (h)
        n.flags & 256 ? (Wa(n), n.flags &= -257, n = md(
          e,
          n,
          r
        )) : n.memoizedState !== null ? (er(), n.child = e.child, n.flags |= 128, n = null) : (er(), E = l.fallback, d = n.mode, l = mo(
          { mode: "visible", children: l.children },
          d
        ), E = Dr(
          E,
          d,
          r,
          null
        ), E.flags |= 2, l.return = n, E.return = n, l.sibling = E, n.child = l, Br(
          n,
          e.child,
          null,
          r
        ), l = n.child, l.memoizedState = dd(r), l.childLanes = fd(
          e,
          x,
          r
        ), n.memoizedState = ud, n = Mi(null, l));
      else if (Wa(n), Kd(E)) {
        if (x = E.nextSibling && E.nextSibling.dataset, x) var ne = x.dgst;
        x = ne, l = Error(i(419)), l.stack = "", l.digest = x, yi({ value: l, source: null, stack: null }), n = md(
          e,
          n,
          r
        );
      } else if (Wt || gs(e, n, r, !1), x = (r & e.childLanes) !== 0, Wt || x) {
        if (x = Nt, x !== null && (l = z(x, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, Ar(e, l), Mn(x, e, l), od;
        Pd(E) || jo(), n = md(
          e,
          n,
          r
        );
      } else
        Pd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, kt = Zn(
          E.nextSibling
        ), cn = n, lt = !0, Pa = null, Xn = !1, e !== null && up(n, e), n = hd(
          n,
          l.children
        ), n.flags |= 4096);
      return n;
    }
    return d ? (er(), E = l.fallback, d = n.mode, L = e.child, ne = L.sibling, l = Ea(L, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = L.subtreeFlags & 65011712, ne !== null ? E = Ea(
      ne,
      E
    ) : (E = Dr(
      E,
      d,
      r,
      null
    ), E.flags |= 2), E.return = n, l.return = n, l.sibling = E, n.child = l, Mi(null, l), l = n.child, E = e.child.memoizedState, E === null ? E = dd(r) : (d = E.cachePool, d !== null ? (L = Zt._currentValue, d = d.parent !== L ? { parent: L, pool: L } : d) : d = gp(), E = {
      baseLanes: E.baseLanes | r,
      cachePool: d
    }), l.memoizedState = E, l.childLanes = fd(
      e,
      x,
      r
    ), n.memoizedState = ud, Mi(e.child, l)) : (Wa(n), r = e.child, e = r.sibling, r = Ea(r, {
      mode: "visible",
      children: l.children
    }), r.return = n, r.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function hd(e, n) {
    return n = mo(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function mo(e, n) {
    return e = Ln(22, e, null, n), e.lanes = 0, e;
  }
  function md(e, n, r) {
    return Br(n, e.child, null, r), e = hd(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function _g(e, n, r) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n), _u(e.return, n, r);
  }
  function pd(e, n, r, l, d, h) {
    var x = e.memoizedState;
    x === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: r,
      tailMode: d,
      treeForkCount: h
    } : (x.isBackwards = n, x.rendering = null, x.renderingStartTime = 0, x.last = l, x.tail = r, x.tailMode = d, x.treeForkCount = h);
  }
  function Mg(e, n, r) {
    var l = n.pendingProps, d = l.revealOrder, h = l.tail;
    l = l.children;
    var x = qt.current, E = (x & 2) !== 0;
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, Z(qt, x), dn(e, n, l, r), l = lt ? vi : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && _g(e, r, n);
        else if (e.tag === 19)
          _g(e, r, n);
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
    switch (d) {
      case "forwards":
        for (r = n.child, d = null; r !== null; )
          e = r.alternate, e !== null && to(e) === null && (d = r), r = r.sibling;
        r = d, r === null ? (d = n.child, n.child = null) : (d = r.sibling, r.sibling = null), pd(
          n,
          !1,
          d,
          r,
          h,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, d = n.child, n.child = null; d !== null; ) {
          if (e = d.alternate, e !== null && to(e) === null) {
            n.child = d;
            break;
          }
          e = d.sibling, d.sibling = r, r = d, d = e;
        }
        pd(
          n,
          !0,
          r,
          null,
          h,
          l
        );
        break;
      case "together":
        pd(
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
  function Ma(e, n, r) {
    if (e !== null && (n.dependencies = e.dependencies), ar |= n.lanes, (r & n.childLanes) === 0)
      if (e !== null) {
        if (gs(
          e,
          n,
          r,
          !1
        ), (r & n.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && n.child !== e.child)
      throw Error(i(153));
    if (n.child !== null) {
      for (e = n.child, r = Ea(e, e.pendingProps), n.child = r, r.return = n; e.sibling !== null; )
        e = e.sibling, r = r.sibling = Ea(e, e.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function gd(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Pl(e)));
  }
  function Cj(e, n, r) {
    switch (n.tag) {
      case 3:
        ye(n, n.stateNode.containerInfo), Xa(n, Zt, e.memoizedState.cache), kr();
        break;
      case 27:
      case 5:
        Pe(n);
        break;
      case 4:
        ye(n, n.stateNode.containerInfo);
        break;
      case 10:
        Xa(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Iu(n), null;
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Wa(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? Rg(e, n, r) : (Wa(n), e = Ma(
            e,
            n,
            r
          ), e !== null ? e.sibling : null);
        Wa(n);
        break;
      case 19:
        var d = (e.flags & 128) !== 0;
        if (l = (r & n.childLanes) !== 0, l || (gs(
          e,
          n,
          r,
          !1
        ), l = (r & n.childLanes) !== 0), d) {
          if (l)
            return Mg(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), Z(qt, qt.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, wg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, Zt, e.memoizedState.cache);
    }
    return Ma(e, n, r);
  }
  function Ag(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Wt = !0;
      else {
        if (!gd(e, r) && (n.flags & 128) === 0)
          return Wt = !1, Cj(
            e,
            n,
            r
          );
        Wt = (e.flags & 131072) !== 0;
      }
    else
      Wt = !1, lt && (n.flags & 1048576) !== 0 && cp(n, vi, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = $r(n.elementType), n.type = e, typeof e == "function")
            Su(e) ? (l = Ir(e, l), n.tag = 1, n = Cg(
              null,
              n,
              e,
              l,
              r
            )) : (n.tag = 0, n = cd(
              null,
              n,
              e,
              l,
              r
            ));
          else {
            if (e != null) {
              var d = e.$$typeof;
              if (d === T) {
                n.tag = 11, n = bg(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              } else if (d === re) {
                n.tag = 14, n = xg(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              }
            }
            throw n = K(e) || e, Error(i(306, n, ""));
          }
        }
        return n;
      case 0:
        return cd(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 1:
        return l = n.type, d = Ir(
          l,
          n.pendingProps
        ), Cg(
          e,
          n,
          l,
          d,
          r
        );
      case 3:
        e: {
          if (ye(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(i(387));
          l = n.pendingProps;
          var h = n.memoizedState;
          d = h.element, Lu(e, n), Ni(n, l, null, r);
          var x = n.memoizedState;
          if (l = x.cache, Xa(n, Zt, l), l !== h.cache && Mu(
            n,
            [Zt],
            r,
            !0
          ), Ei(), l = x.element, h.isDehydrated)
            if (h = {
              element: l,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Tg(
                e,
                n,
                l,
                r
              );
              break e;
            } else if (l !== d) {
              d = Gn(
                Error(i(424)),
                n
              ), yi(d), n = Tg(
                e,
                n,
                l,
                r
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
              for (kt = Zn(e.firstChild), cn = n, lt = !0, Pa = null, Xn = !0, r = wp(
                n,
                null,
                l,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (kr(), l === d) {
              n = Ma(
                e,
                n,
                r
              );
              break e;
            }
            dn(e, n, l, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return ho(e, n), e === null ? (r = Hv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : lt || (r = n.type, e = n.pendingProps, l = Mo(
          J.current
        ).createElement(r), l[je] = n, l[Ee] = e, fn(l, r, e), Rt(l), n.stateNode = l) : n.memoizedState = Hv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Pe(n), e === null && lt && (l = n.stateNode = Bv(
          n.type,
          n.pendingProps,
          J.current
        ), cn = n, Xn = !0, d = kt, or(n.type) ? (Xd = d, kt = Zn(l.firstChild)) : kt = d), dn(
          e,
          n,
          n.pendingProps.children,
          r
        ), ho(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && lt && ((d = l = kt) && (l = nE(
          l,
          n.type,
          n.pendingProps,
          Xn
        ), l !== null ? (n.stateNode = l, cn = n, kt = Zn(l.firstChild), Xn = !1, d = !0) : d = !1), d || Ka(n)), Pe(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, Fd(d, h) ? l = null : x !== null && Fd(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = qu(
          e,
          n,
          vj,
          null,
          null,
          r
        ), Yi._currentValue = d), ho(e, n), dn(e, n, l, r), n.child;
      case 6:
        return e === null && lt && ((e = r = kt) && (r = aE(
          r,
          n.pendingProps,
          Xn
        ), r !== null ? (n.stateNode = r, cn = n, kt = null, e = !0) : e = !1), e || Ka(n)), null;
      case 13:
        return Rg(e, n, r);
      case 4:
        return ye(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, e === null ? n.child = Br(
          n,
          null,
          l,
          r
        ) : dn(e, n, l, r), n.child;
      case 11:
        return bg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return dn(
          e,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return dn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return dn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return l = n.pendingProps, Xa(n, n.type, l.value), dn(e, n, l.children, r), n.child;
      case 9:
        return d = n.type._context, l = n.pendingProps.children, Or(n), d = un(d), l = l(d), n.flags |= 1, dn(e, n, l, r), n.child;
      case 14:
        return xg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return Sg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return Mg(e, n, r);
      case 31:
        return Nj(e, n, r);
      case 22:
        return wg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Or(n), l = un(Zt), e === null ? (d = ku(), d === null && (d = Nt, h = Au(), d.pooledCache = h, h.refCount++, h !== null && (d.pooledCacheLanes |= r), d = h), n.memoizedState = { parent: l, cache: d }, Ou(n), Xa(n, Zt, d)) : ((e.lanes & r) !== 0 && (Lu(e, n), Ni(n, null, null, r), Ei()), d = e.memoizedState, h = n.memoizedState, d.parent !== l ? (d = { parent: l, cache: l }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Xa(n, Zt, l)) : (l = h.cache, Xa(n, Zt, l), l !== d.cache && Mu(
          n,
          [Zt],
          r,
          !0
        ))), dn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(i(156, n.tag));
  }
  function Aa(e) {
    e.flags |= 4;
  }
  function vd(e, n, r, l, d) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (d & 335544128) === d)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (rv()) e.flags |= 8192;
        else
          throw Ur = Zl, zu;
    } else e.flags &= -16777217;
  }
  function Dg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Pv(n))
      if (rv()) e.flags |= 8192;
      else
        throw Ur = Zl, zu;
  }
  function po(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? it() : 536870912, e.lanes |= n, Rs |= n);
  }
  function Ai(e, n) {
    if (!lt)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), n = n.sibling;
          r === null ? e.tail = null : r.sibling = null;
          break;
        case "collapsed":
          r = e.tail;
          for (var l = null; r !== null; )
            r.alternate !== null && (l = r), r = r.sibling;
          l === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function zt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (n)
      for (var d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags & 65011712, l |= d.flags & 65011712, d.return = e, d = d.sibling;
    else
      for (d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags, l |= d.flags, d.return = e, d = d.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, n;
  }
  function Tj(e, n, r) {
    var l = n.pendingProps;
    switch (Nu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return zt(n), null;
      case 1:
        return zt(n), null;
      case 3:
        return r = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ta(Zt), Re(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ps(n) ? Aa(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Tu())), zt(n), null;
      case 26:
        var d = n.type, h = n.memoizedState;
        return e === null ? (Aa(n), h !== null ? (zt(n), Dg(n, h)) : (zt(n), vd(
          n,
          d,
          null,
          l,
          r
        ))) : h ? h !== e.memoizedState ? (Aa(n), zt(n), Dg(n, h)) : (zt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Aa(n), zt(n), vd(
          n,
          d,
          e,
          l,
          r
        )), null;
      case 27:
        if (Ne(n), r = J.current, d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return zt(n), null;
          }
          e = G.current, ps(n) ? dp(n) : (e = Bv(d, l, r), n.stateNode = e, Aa(n));
        }
        return zt(n), null;
      case 5:
        if (Ne(n), d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return zt(n), null;
          }
          if (h = G.current, ps(n))
            dp(n);
          else {
            var x = Mo(
              J.current
            );
            switch (h) {
              case 1:
                h = x.createElementNS(
                  "http://www.w3.org/2000/svg",
                  d
                );
                break;
              case 2:
                h = x.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  d
                );
                break;
              default:
                switch (d) {
                  case "svg":
                    h = x.createElementNS(
                      "http://www.w3.org/2000/svg",
                      d
                    );
                    break;
                  case "math":
                    h = x.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      d
                    );
                    break;
                  case "script":
                    h = x.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof l.is == "string" ? x.createElement("select", {
                      is: l.is
                    }) : x.createElement("select"), l.multiple ? h.multiple = !0 : l.size && (h.size = l.size);
                    break;
                  default:
                    h = typeof l.is == "string" ? x.createElement(d, { is: l.is }) : x.createElement(d);
                }
            }
            h[je] = n, h[Ee] = l;
            e: for (x = n.child; x !== null; ) {
              if (x.tag === 5 || x.tag === 6)
                h.appendChild(x.stateNode);
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
            n.stateNode = h;
            e: switch (fn(h, d, l), d) {
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
            l && Aa(n);
          }
        }
        return zt(n), vd(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          r
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (typeof l != "string" && n.stateNode === null)
            throw Error(i(166));
          if (e = J.current, ps(n)) {
            if (e = n.stateNode, r = n.memoizedProps, l = null, d = cn, d !== null)
              switch (d.tag) {
                case 27:
                case 5:
                  l = d.memoizedProps;
              }
            e[je] = n, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || Rv(e.nodeValue, r)), e || Ka(n, !0);
          } else
            e = Mo(e).createTextNode(
              l
            ), e[je] = n, n.stateNode = e;
        }
        return zt(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = ps(n), r !== null) {
            if (e === null) {
              if (!l) throw Error(i(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(557));
              e[je] = n;
            } else
              kr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            zt(n), e = !1;
          } else
            r = Tu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? (Un(n), n) : (Un(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(i(558));
        }
        return zt(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (d = ps(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(i(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(i(317));
              d[je] = n;
            } else
              kr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            zt(n), d = !1;
          } else
            d = Tu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return n.flags & 256 ? (Un(n), n) : (Un(n), null);
        }
        return Un(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = n.child, d = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (d = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== d && (l.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), po(n, n.updateQueue), zt(n), null);
      case 4:
        return Re(), e === null && Bd(n.stateNode.containerInfo), zt(n), null;
      case 10:
        return Ta(n.type), zt(n), null;
      case 19:
        if (H(qt), l = n.memoizedState, l === null) return zt(n), null;
        if (d = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (d) Ai(l, !1);
          else {
            if (It !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = to(e), h !== null) {
                  for (n.flags |= 128, Ai(l, !1), e = h.updateQueue, n.updateQueue = e, po(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    ip(r, e), r = r.sibling;
                  return Z(
                    qt,
                    qt.current & 1 | 2
                  ), lt && Na(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && bt() > xo && (n.flags |= 128, d = !0, Ai(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = to(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, po(n, e), Ai(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !lt)
                return zt(n), null;
            } else
              2 * bt() - l.renderingStartTime > xo && r !== 536870912 && (n.flags |= 128, d = !0, Ai(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = bt(), e.sibling = null, r = qt.current, Z(
          qt,
          d ? r & 1 | 2 : r & 1
        ), lt && Na(n, l.treeForkCount), e) : (zt(n), null);
      case 22:
      case 23:
        return Un(n), Vu(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (zt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : zt(n), r = n.updateQueue, r !== null && po(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && H(Lr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ta(Zt), zt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function Rj(e, n) {
    switch (Nu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ta(Zt), Re(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ne(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Un(n), n.alternate === null)
            throw Error(i(340));
          kr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (Un(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(i(340));
          kr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return H(qt), null;
      case 4:
        return Re(), null;
      case 10:
        return Ta(n.type), null;
      case 22:
      case 23:
        return Un(n), Vu(), e !== null && H(Lr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ta(Zt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function kg(e, n) {
    switch (Nu(n), n.tag) {
      case 3:
        Ta(Zt), Re();
        break;
      case 26:
      case 27:
      case 5:
        Ne(n);
        break;
      case 4:
        Re();
        break;
      case 31:
        n.memoizedState !== null && Un(n);
        break;
      case 13:
        Un(n);
        break;
      case 19:
        H(qt);
        break;
      case 10:
        Ta(n.type);
        break;
      case 22:
      case 23:
        Un(n), Vu(), e !== null && H(Lr);
        break;
      case 24:
        Ta(Zt);
    }
  }
  function Di(e, n) {
    try {
      var r = n.updateQueue, l = r !== null ? r.lastEffect : null;
      if (l !== null) {
        var d = l.next;
        r = d;
        do {
          if ((r.tag & e) === e) {
            l = void 0;
            var h = r.create, x = r.inst;
            l = h(), x.destroy = l;
          }
          r = r.next;
        } while (r !== d);
      }
    } catch (E) {
      yt(n, n.return, E);
    }
  }
  function tr(e, n, r) {
    try {
      var l = n.updateQueue, d = l !== null ? l.lastEffect : null;
      if (d !== null) {
        var h = d.next;
        l = h;
        do {
          if ((l.tag & e) === e) {
            var x = l.inst, E = x.destroy;
            if (E !== void 0) {
              x.destroy = void 0, d = n;
              var L = r, ne = E;
              try {
                ne();
              } catch (ue) {
                yt(
                  d,
                  L,
                  ue
                );
              }
            }
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (ue) {
      yt(n, n.return, ue);
    }
  }
  function zg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        Ep(n, r);
      } catch (l) {
        yt(e, e.return, l);
      }
    }
  }
  function Og(e, n, r) {
    r.props = Ir(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (l) {
      yt(e, n, l);
    }
  }
  function ki(e, n) {
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
    } catch (d) {
      yt(e, n, d);
    }
  }
  function va(e, n) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (d) {
          yt(e, n, d);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (d) {
          yt(e, n, d);
        }
      else r.current = null;
  }
  function Lg(e) {
    var n = e.type, r = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && l.focus();
          break e;
        case "img":
          r.src ? l.src = r.src : r.srcSet && (l.srcset = r.srcSet);
      }
    } catch (d) {
      yt(e, e.return, d);
    }
  }
  function yd(e, n, r) {
    try {
      var l = e.stateNode;
      Qj(l, e.type, r, n), l[Ee] = n;
    } catch (d) {
      yt(e, e.return, d);
    }
  }
  function $g(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && or(e.type) || e.tag === 4;
  }
  function bd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || $g(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && or(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function xd(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = wa));
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (xd(e, n, r), e = e.sibling; e !== null; )
        xd(e, n, r), e = e.sibling;
  }
  function go(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (go(e, n, r), e = e.sibling; e !== null; )
        go(e, n, r), e = e.sibling;
  }
  function Ug(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, d = n.attributes; d.length; )
        n.removeAttributeNode(d[0]);
      fn(n, l, r), n[je] = e, n[Ee] = r;
    } catch (h) {
      yt(e, e.return, h);
    }
  }
  var Da = !1, en = !1, Sd = !1, Bg = typeof WeakSet == "function" ? WeakSet : Set, on = null;
  function _j(e, n) {
    if (e = e.containerInfo, Hd = $o, e = Zm(e), mu(e)) {
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
            var d = l.anchorOffset, h = l.focusNode;
            l = l.focusOffset;
            try {
              r.nodeType, h.nodeType;
            } catch {
              r = null;
              break e;
            }
            var x = 0, E = -1, L = -1, ne = 0, ue = 0, me = e, ie = null;
            t: for (; ; ) {
              for (var oe; me !== r || d !== 0 && me.nodeType !== 3 || (E = x + d), me !== h || l !== 0 && me.nodeType !== 3 || (L = x + l), me.nodeType === 3 && (x += me.nodeValue.length), (oe = me.firstChild) !== null; )
                ie = me, me = oe;
              for (; ; ) {
                if (me === e) break t;
                if (ie === r && ++ne === d && (E = x), ie === h && ++ue === l && (L = x), (oe = me.nextSibling) !== null) break;
                me = ie, ie = me.parentNode;
              }
              me = oe;
            }
            r = E === -1 || L === -1 ? null : { start: E, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (qd = { focusedElem: e, selectionRange: r }, $o = !1, on = n; on !== null; )
      if (n = on, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, on = e;
      else
        for (; on !== null; ) {
          switch (n = on, h = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (r = 0; r < e.length; r++)
                  d = e[r], d.ref.impl = d.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && h !== null) {
                e = void 0, r = n, d = h.memoizedProps, h = h.memoizedState, l = r.stateNode;
                try {
                  var Me = Ir(
                    r.type,
                    d
                  );
                  e = l.getSnapshotBeforeUpdate(
                    Me,
                    h
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Be) {
                  yt(
                    r,
                    r.return,
                    Be
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, r = e.nodeType, r === 9)
                  Gd(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Gd(e);
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
              if ((e & 1024) !== 0) throw Error(i(163));
          }
          if (e = n.sibling, e !== null) {
            e.return = n.return, on = e;
            break;
          }
          on = n.return;
        }
  }
  function Vg(e, n, r) {
    var l = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        za(e, r), l & 4 && Di(5, r);
        break;
      case 1:
        if (za(e, r), l & 4)
          if (e = r.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              yt(r, r.return, x);
            }
          else {
            var d = Ir(
              r.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                d,
                n,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (x) {
              yt(
                r,
                r.return,
                x
              );
            }
          }
        l & 64 && zg(r), l & 512 && ki(r, r.return);
        break;
      case 3:
        if (za(e, r), l & 64 && (e = r.updateQueue, e !== null)) {
          if (n = null, r.child !== null)
            switch (r.child.tag) {
              case 27:
              case 5:
                n = r.child.stateNode;
                break;
              case 1:
                n = r.child.stateNode;
            }
          try {
            Ep(e, n);
          } catch (x) {
            yt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && l & 4 && Ug(r);
      case 26:
      case 5:
        za(e, r), n === null && l & 4 && Lg(r), l & 512 && ki(r, r.return);
        break;
      case 12:
        za(e, r);
        break;
      case 31:
        za(e, r), l & 4 && qg(e, r);
        break;
      case 13:
        za(e, r), l & 4 && Fg(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = Uj.bind(
          null,
          r
        ), rE(e, r))));
        break;
      case 22:
        if (l = r.memoizedState !== null || Da, !l) {
          n = n !== null && n.memoizedState !== null || en, d = Da;
          var h = en;
          Da = l, (en = n) && !h ? Oa(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : za(e, r), Da = d, en = h;
        }
        break;
      case 30:
        break;
      default:
        za(e, r);
    }
  }
  function Ig(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Ig(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Et(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var $t = null, Cn = !1;
  function ka(e, n, r) {
    for (r = r.child; r !== null; )
      Hg(e, n, r), r = r.sibling;
  }
  function Hg(e, n, r) {
    if (Ot && typeof Ot.onCommitFiberUnmount == "function")
      try {
        Ot.onCommitFiberUnmount(pn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        en || va(r, n), ka(
          e,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        en || va(r, n);
        var l = $t, d = Cn;
        or(r.type) && ($t = r.stateNode, Cn = !1), ka(
          e,
          n,
          r
        ), Hi(r.stateNode), $t = l, Cn = d;
        break;
      case 5:
        en || va(r, n);
      case 6:
        if (l = $t, d = Cn, $t = null, ka(
          e,
          n,
          r
        ), $t = l, Cn = d, $t !== null)
          if (Cn)
            try {
              ($t.nodeType === 9 ? $t.body : $t.nodeName === "HTML" ? $t.ownerDocument.body : $t).removeChild(r.stateNode);
            } catch (h) {
              yt(
                r,
                n,
                h
              );
            }
          else
            try {
              $t.removeChild(r.stateNode);
            } catch (h) {
              yt(
                r,
                n,
                h
              );
            }
        break;
      case 18:
        $t !== null && (Cn ? (e = $t, zv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Ls(e)) : zv($t, r.stateNode));
        break;
      case 4:
        l = $t, d = Cn, $t = r.stateNode.containerInfo, Cn = !0, ka(
          e,
          n,
          r
        ), $t = l, Cn = d;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        tr(2, r, n), en || tr(4, r, n), ka(
          e,
          n,
          r
        );
        break;
      case 1:
        en || (va(r, n), l = r.stateNode, typeof l.componentWillUnmount == "function" && Og(
          r,
          n,
          l
        )), ka(
          e,
          n,
          r
        );
        break;
      case 21:
        ka(
          e,
          n,
          r
        );
        break;
      case 22:
        en = (l = en) || r.memoizedState !== null, ka(
          e,
          n,
          r
        ), en = l;
        break;
      default:
        ka(
          e,
          n,
          r
        );
    }
  }
  function qg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ls(e);
      } catch (r) {
        yt(n, n.return, r);
      }
    }
  }
  function Fg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ls(e);
      } catch (r) {
        yt(n, n.return, r);
      }
  }
  function Mj(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Bg()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Bg()), n;
      default:
        throw Error(i(435, e.tag));
    }
  }
  function vo(e, n) {
    var r = Mj(e);
    n.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var d = Bj.bind(null, e, l);
        l.then(d, d);
      }
    });
  }
  function Tn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var l = 0; l < r.length; l++) {
        var d = r[l], h = e, x = n, E = x;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (or(E.type)) {
                $t = E.stateNode, Cn = !1;
                break e;
              }
              break;
            case 5:
              $t = E.stateNode, Cn = !1;
              break e;
            case 3:
            case 4:
              $t = E.stateNode.containerInfo, Cn = !0;
              break e;
          }
          E = E.return;
        }
        if ($t === null) throw Error(i(160));
        Hg(h, x, d), $t = null, Cn = !1, h = d.alternate, h !== null && (h.return = null), d.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Yg(n, e), n = n.sibling;
  }
  var oa = null;
  function Yg(e, n) {
    var r = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Tn(n, e), Rn(e), l & 4 && (tr(3, e, e.return), Di(3, e), tr(5, e, e.return));
        break;
      case 1:
        Tn(n, e), Rn(e), l & 512 && (en || r === null || va(r, r.return)), l & 64 && Da && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var d = oa;
        if (Tn(n, e), Rn(e), l & 512 && (en || r === null || va(r, r.return)), l & 4) {
          var h = r !== null ? r.memoizedState : null;
          if (l = e.memoizedState, r === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, r = e.memoizedProps, d = d.ownerDocument || d;
                  t: switch (l) {
                    case "title":
                      h = d.getElementsByTagName("title")[0], (!h || h[Qe] || h[je] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = d.createElement(l), d.head.insertBefore(
                        h,
                        d.querySelector("head > title")
                      )), fn(h, l, r), h[je] = e, Rt(h), l = h;
                      break e;
                    case "link":
                      var x = Yv(
                        "link",
                        "href",
                        d
                      ).get(l + (r.href || ""));
                      if (x) {
                        for (var E = 0; E < x.length; E++)
                          if (h = x[E], h.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && h.getAttribute("rel") === (r.rel == null ? null : r.rel) && h.getAttribute("title") === (r.title == null ? null : r.title) && h.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            x.splice(E, 1);
                            break t;
                          }
                      }
                      h = d.createElement(l), fn(h, l, r), d.head.appendChild(h);
                      break;
                    case "meta":
                      if (x = Yv(
                        "meta",
                        "content",
                        d
                      ).get(l + (r.content || ""))) {
                        for (E = 0; E < x.length; E++)
                          if (h = x[E], h.getAttribute("content") === (r.content == null ? null : "" + r.content) && h.getAttribute("name") === (r.name == null ? null : r.name) && h.getAttribute("property") === (r.property == null ? null : r.property) && h.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && h.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            x.splice(E, 1);
                            break t;
                          }
                      }
                      h = d.createElement(l), fn(h, l, r), d.head.appendChild(h);
                      break;
                    default:
                      throw Error(i(468, l));
                  }
                  h[je] = e, Rt(h), l = h;
                }
                e.stateNode = l;
              } else
                Gv(
                  d,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Fv(
                d,
                l,
                e.memoizedProps
              );
          else
            h !== l ? (h === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : h.count--, l === null ? Gv(
              d,
              e.type,
              e.stateNode
            ) : Fv(
              d,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && yd(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        Tn(n, e), Rn(e), l & 512 && (en || r === null || va(r, r.return)), r !== null && l & 4 && yd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (Tn(n, e), Rn(e), l & 512 && (en || r === null || va(r, r.return)), e.flags & 32) {
          d = e.stateNode;
          try {
            ss(d, "");
          } catch (Me) {
            yt(e, e.return, Me);
          }
        }
        l & 4 && e.stateNode != null && (d = e.memoizedProps, yd(
          e,
          d,
          r !== null ? r.memoizedProps : d
        )), l & 1024 && (Sd = !0);
        break;
      case 6:
        if (Tn(n, e), Rn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (Me) {
            yt(e, e.return, Me);
          }
        }
        break;
      case 3:
        if (ko = null, d = oa, oa = Ao(n.containerInfo), Tn(n, e), oa = d, Rn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Ls(n.containerInfo);
          } catch (Me) {
            yt(e, e.return, Me);
          }
        Sd && (Sd = !1, Gg(e));
        break;
      case 4:
        l = oa, oa = Ao(
          e.stateNode.containerInfo
        ), Tn(n, e), Rn(e), oa = l;
        break;
      case 12:
        Tn(n, e), Rn(e);
        break;
      case 31:
        Tn(n, e), Rn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 13:
        Tn(n, e), Rn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (bo = bt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, ne = Da, ue = en;
        if (Da = ne || d, en = ue || L, Tn(n, e), en = ue, Da = ne, Rn(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (r === null || L || Da || en || Hr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (h = L.stateNode, d)
                    x = h.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    E = L.stateNode;
                    var me = L.memoizedProps.style, ie = me != null && me.hasOwnProperty("display") ? me.display : null;
                    E.style.display = ie == null || typeof ie == "boolean" ? "" : ("" + ie).trim();
                  }
                } catch (Me) {
                  yt(L, L.return, Me);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = d ? "" : L.memoizedProps;
                } catch (Me) {
                  yt(L, L.return, Me);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var oe = L.stateNode;
                  d ? Ov(oe, !0) : Ov(L.stateNode, !1);
                } catch (Me) {
                  yt(L, L.return, Me);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === e) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === e) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === e) break e;
              r === n && (r = null), n = n.return;
            }
            r === n && (r = null), n.sibling.return = n.return, n = n.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (r = l.retryQueue, r !== null && (l.retryQueue = null, vo(e, r))));
        break;
      case 19:
        Tn(n, e), Rn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Tn(n, e), Rn(e);
    }
  }
  function Rn(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var r, l = e.return; l !== null; ) {
          if ($g(l)) {
            r = l;
            break;
          }
          l = l.return;
        }
        if (r == null) throw Error(i(160));
        switch (r.tag) {
          case 27:
            var d = r.stateNode, h = bd(e);
            go(e, h, d);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (ss(x, ""), r.flags &= -33);
            var E = bd(e);
            go(e, E, x);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, ne = bd(e);
            xd(
              e,
              ne,
              L
            );
            break;
          default:
            throw Error(i(161));
        }
      } catch (ue) {
        yt(e, e.return, ue);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Gg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Gg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function za(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Vg(e, n.alternate, n), n = n.sibling;
  }
  function Hr(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          tr(4, n, n.return), Hr(n);
          break;
        case 1:
          va(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && Og(
            n,
            n.return,
            r
          ), Hr(n);
          break;
        case 27:
          Hi(n.stateNode);
        case 26:
        case 5:
          va(n, n.return), Hr(n);
          break;
        case 22:
          n.memoizedState === null && Hr(n);
          break;
        case 30:
          Hr(n);
          break;
        default:
          Hr(n);
      }
      e = e.sibling;
    }
  }
  function Oa(e, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var l = n.alternate, d = e, h = n, x = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          Oa(
            d,
            h,
            r
          ), Di(4, h);
          break;
        case 1:
          if (Oa(
            d,
            h,
            r
          ), l = h, d = l.stateNode, typeof d.componentDidMount == "function")
            try {
              d.componentDidMount();
            } catch (ne) {
              yt(l, l.return, ne);
            }
          if (l = h, d = l.updateQueue, d !== null) {
            var E = l.stateNode;
            try {
              var L = d.shared.hiddenCallbacks;
              if (L !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < L.length; d++)
                  jp(L[d], E);
            } catch (ne) {
              yt(l, l.return, ne);
            }
          }
          r && x & 64 && zg(h), ki(h, h.return);
          break;
        case 27:
          Ug(h);
        case 26:
        case 5:
          Oa(
            d,
            h,
            r
          ), r && l === null && x & 4 && Lg(h), ki(h, h.return);
          break;
        case 12:
          Oa(
            d,
            h,
            r
          );
          break;
        case 31:
          Oa(
            d,
            h,
            r
          ), r && x & 4 && qg(d, h);
          break;
        case 13:
          Oa(
            d,
            h,
            r
          ), r && x & 4 && Fg(d, h);
          break;
        case 22:
          h.memoizedState === null && Oa(
            d,
            h,
            r
          ), ki(h, h.return);
          break;
        case 30:
          break;
        default:
          Oa(
            d,
            h,
            r
          );
      }
      n = n.sibling;
    }
  }
  function wd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && bi(r));
  }
  function jd(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && bi(e));
  }
  function ca(e, n, r, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Pg(
          e,
          n,
          r,
          l
        ), n = n.sibling;
  }
  function Pg(e, n, r, l) {
    var d = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ca(
          e,
          n,
          r,
          l
        ), d & 2048 && Di(9, n);
        break;
      case 1:
        ca(
          e,
          n,
          r,
          l
        );
        break;
      case 3:
        ca(
          e,
          n,
          r,
          l
        ), d & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && bi(e)));
        break;
      case 12:
        if (d & 2048) {
          ca(
            e,
            n,
            r,
            l
          ), e = n.stateNode;
          try {
            var h = n.memoizedProps, x = h.id, E = h.onPostCommit;
            typeof E == "function" && E(
              x,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (L) {
            yt(n, n.return, L);
          }
        } else
          ca(
            e,
            n,
            r,
            l
          );
        break;
      case 31:
        ca(
          e,
          n,
          r,
          l
        );
        break;
      case 13:
        ca(
          e,
          n,
          r,
          l
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, x = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? ca(
          e,
          n,
          r,
          l
        ) : zi(e, n) : h._visibility & 2 ? ca(
          e,
          n,
          r,
          l
        ) : (h._visibility |= 2, Ns(
          e,
          n,
          r,
          l,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), d & 2048 && wd(x, n);
        break;
      case 24:
        ca(
          e,
          n,
          r,
          l
        ), d & 2048 && jd(n.alternate, n);
        break;
      default:
        ca(
          e,
          n,
          r,
          l
        );
    }
  }
  function Ns(e, n, r, l, d) {
    for (d = d && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = e, x = n, E = r, L = l, ne = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ns(
            h,
            x,
            E,
            L,
            d
          ), Di(8, x);
          break;
        case 23:
          break;
        case 22:
          var ue = x.stateNode;
          x.memoizedState !== null ? ue._visibility & 2 ? Ns(
            h,
            x,
            E,
            L,
            d
          ) : zi(
            h,
            x
          ) : (ue._visibility |= 2, Ns(
            h,
            x,
            E,
            L,
            d
          )), d && ne & 2048 && wd(
            x.alternate,
            x
          );
          break;
        case 24:
          Ns(
            h,
            x,
            E,
            L,
            d
          ), d && ne & 2048 && jd(x.alternate, x);
          break;
        default:
          Ns(
            h,
            x,
            E,
            L,
            d
          );
      }
      n = n.sibling;
    }
  }
  function zi(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e, l = n, d = l.flags;
        switch (l.tag) {
          case 22:
            zi(r, l), d & 2048 && wd(
              l.alternate,
              l
            );
            break;
          case 24:
            zi(r, l), d & 2048 && jd(l.alternate, l);
            break;
          default:
            zi(r, l);
        }
        n = n.sibling;
      }
  }
  var Oi = 8192;
  function Cs(e, n, r) {
    if (e.subtreeFlags & Oi)
      for (e = e.child; e !== null; )
        Kg(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function Kg(e, n, r) {
    switch (e.tag) {
      case 26:
        Cs(
          e,
          n,
          r
        ), e.flags & Oi && e.memoizedState !== null && gE(
          r,
          oa,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Cs(
          e,
          n,
          r
        );
        break;
      case 3:
      case 4:
        var l = oa;
        oa = Ao(e.stateNode.containerInfo), Cs(
          e,
          n,
          r
        ), oa = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Oi, Oi = 16777216, Cs(
          e,
          n,
          r
        ), Oi = l) : Cs(
          e,
          n,
          r
        ));
        break;
      default:
        Cs(
          e,
          n,
          r
        );
    }
  }
  function Xg(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function Li(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var l = n[r];
          on = l, Zg(
            l,
            e
          );
        }
      Xg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Qg(e), e = e.sibling;
  }
  function Qg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Li(e), e.flags & 2048 && tr(9, e, e.return);
        break;
      case 3:
        Li(e);
        break;
      case 12:
        Li(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, yo(e)) : Li(e);
        break;
      default:
        Li(e);
    }
  }
  function yo(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var l = n[r];
          on = l, Zg(
            l,
            e
          );
        }
      Xg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          tr(8, n, n.return), yo(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, yo(n));
          break;
        default:
          yo(n);
      }
      e = e.sibling;
    }
  }
  function Zg(e, n) {
    for (; on !== null; ) {
      var r = on;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          tr(8, r, n);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var l = r.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          bi(r.memoizedState.cache);
      }
      if (l = r.child, l !== null) l.return = r, on = l;
      else
        e: for (r = e; on !== null; ) {
          l = on;
          var d = l.sibling, h = l.return;
          if (Ig(l), l === r) {
            on = null;
            break e;
          }
          if (d !== null) {
            d.return = h, on = d;
            break e;
          }
          on = h;
        }
    }
  }
  var Aj = {
    getCacheForType: function(e) {
      var n = un(Zt), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return un(Zt).controller.signal;
    }
  }, Dj = typeof WeakMap == "function" ? WeakMap : Map, mt = 0, Nt = null, tt = null, rt = 0, vt = 0, Bn = null, nr = !1, Ts = !1, Ed = !1, La = 0, It = 0, ar = 0, qr = 0, Nd = 0, Vn = 0, Rs = 0, $i = null, _n = null, Cd = !1, bo = 0, Jg = 0, xo = 1 / 0, So = null, rr = null, rn = 0, sr = null, _s = null, $a = 0, Td = 0, Rd = null, Wg = null, Ui = 0, _d = null;
  function In() {
    return (mt & 2) !== 0 && rt !== 0 ? rt & -rt : A.T !== null ? Od() : ge();
  }
  function ev() {
    if (Vn === 0)
      if ((rt & 536870912) === 0 || lt) {
        var e = U;
        U <<= 1, (U & 3932160) === 0 && (U = 262144), Vn = e;
      } else Vn = 536870912;
    return e = $n.current, e !== null && (e.flags |= 32), Vn;
  }
  function Mn(e, n, r) {
    (e === Nt && (vt === 2 || vt === 9) || e.cancelPendingCommit !== null) && (Ms(e, 0), ir(
      e,
      rt,
      Vn,
      !1
    )), ht(e, r), ((mt & 2) === 0 || e !== Nt) && (e === Nt && ((mt & 2) === 0 && (qr |= r), It === 4 && ir(
      e,
      rt,
      Vn,
      !1
    )), ya(e));
  }
  function tv(e, n, r) {
    if ((mt & 6) !== 0) throw Error(i(327));
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || Ve(e, n), d = l ? Oj(e, n) : Ad(e, n, !0), h = l;
    do {
      if (d === 0) {
        Ts && !l && ir(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, h && !kj(r)) {
          d = Ad(e, n, !1), h = !1;
          continue;
        }
        if (d === 2) {
          if (h = n, e.errorRecoveryDisabledLanes & h)
            var x = 0;
          else
            x = e.pendingLanes & -536870913, x = x !== 0 ? x : x & 536870912 ? 536870912 : 0;
          if (x !== 0) {
            n = x;
            e: {
              var E = e;
              d = $i;
              var L = E.current.memoizedState.isDehydrated;
              if (L && (Ms(E, x).flags |= 256), x = Ad(
                E,
                x,
                !1
              ), x !== 2) {
                if (Ed && !L) {
                  E.errorRecoveryDisabledLanes |= h, qr |= h, d = 4;
                  break e;
                }
                h = _n, _n = d, h !== null && (_n === null ? _n = h : _n.push.apply(
                  _n,
                  h
                ));
              }
              d = x;
            }
            if (h = !1, d !== 2) continue;
          }
        }
        if (d === 1) {
          Ms(e, 0), ir(e, n, 0, !0);
          break;
        }
        e: {
          switch (l = e, h = d, h) {
            case 0:
            case 1:
              throw Error(i(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              ir(
                l,
                n,
                Vn,
                !nr
              );
              break e;
            case 2:
              _n = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((n & 62914560) === n && (d = bo + 300 - bt(), 10 < d)) {
            if (ir(
              l,
              n,
              Vn,
              !nr
            ), be(l, 0, !0) !== 0) break e;
            $a = n, l.timeoutHandle = Dv(
              nv.bind(
                null,
                l,
                r,
                _n,
                So,
                Cd,
                n,
                Vn,
                qr,
                Rs,
                nr,
                h,
                "Throttled",
                -0,
                0
              ),
              d
            );
            break e;
          }
          nv(
            l,
            r,
            _n,
            So,
            Cd,
            n,
            Vn,
            qr,
            Rs,
            nr,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ya(e);
  }
  function nv(e, n, r, l, d, h, x, E, L, ne, ue, me, ie, oe) {
    if (e.timeoutHandle = -1, me = n.subtreeFlags, me & 8192 || (me & 16785408) === 16785408) {
      me = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: wa
      }, Kg(
        n,
        h,
        me
      );
      var Me = (h & 62914560) === h ? bo - bt() : (h & 4194048) === h ? Jg - bt() : 0;
      if (Me = vE(
        me,
        Me
      ), Me !== null) {
        $a = h, e.cancelPendingCommit = Me(
          uv.bind(
            null,
            e,
            n,
            h,
            r,
            l,
            d,
            x,
            E,
            L,
            ue,
            me,
            null,
            ie,
            oe
          )
        ), ir(e, h, x, !ne);
        return;
      }
    }
    uv(
      e,
      n,
      h,
      r,
      l,
      d,
      x,
      E,
      L
    );
  }
  function kj(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var l = 0; l < r.length; l++) {
          var d = r[l], h = d.getSnapshot;
          d = d.value;
          try {
            if (!On(h(), d)) return !1;
          } catch {
            return !1;
          }
        }
      if (r = n.child, n.subtreeFlags & 16384 && r !== null)
        r.return = n, n = r;
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
  function ir(e, n, r, l) {
    n &= ~Nd, n &= ~qr, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var d = n; 0 < d; ) {
      var h = 31 - pt(d), x = 1 << h;
      l[h] = -1, d &= ~x;
    }
    r !== 0 && zn(e, r, n);
  }
  function wo() {
    return (mt & 6) === 0 ? (Bi(0), !1) : !0;
  }
  function Md() {
    if (tt !== null) {
      if (vt === 0)
        var e = tt.return;
      else
        e = tt, Ca = zr = null, Gu(e), xs = null, Si = 0, e = tt;
      for (; e !== null; )
        kg(e.alternate, e), e = e.return;
      tt = null;
    }
  }
  function Ms(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, Wj(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), $a = 0, Md(), Nt = e, tt = r = Ea(e.current, null), rt = n, vt = 0, Bn = null, nr = !1, Ts = Ve(e, n), Ed = !1, Rs = Vn = Nd = qr = ar = It = 0, _n = $i = null, Cd = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - pt(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return La = n, Hl(), r;
  }
  function av(e, n) {
    Ye = null, A.H = _i, n === bs || n === Ql ? (n = bp(), vt = 3) : n === zu ? (n = bp(), vt = 4) : vt = n === od ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Bn = n, tt === null && (It = 1, uo(
      e,
      Gn(n, e.current)
    ));
  }
  function rv() {
    var e = $n.current;
    return e === null ? !0 : (rt & 4194048) === rt ? Qn === null : (rt & 62914560) === rt || (rt & 536870912) !== 0 ? e === Qn : !1;
  }
  function sv() {
    var e = A.H;
    return A.H = _i, e === null ? _i : e;
  }
  function iv() {
    var e = A.A;
    return A.A = Aj, e;
  }
  function jo() {
    It = 4, nr || (rt & 4194048) !== rt && $n.current !== null || (Ts = !0), (ar & 134217727) === 0 && (qr & 134217727) === 0 || Nt === null || ir(
      Nt,
      rt,
      Vn,
      !1
    );
  }
  function Ad(e, n, r) {
    var l = mt;
    mt |= 2;
    var d = sv(), h = iv();
    (Nt !== e || rt !== n) && (So = null, Ms(e, n)), n = !1;
    var x = It;
    e: do
      try {
        if (vt !== 0 && tt !== null) {
          var E = tt, L = Bn;
          switch (vt) {
            case 8:
              Md(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              $n.current === null && (n = !0);
              var ne = vt;
              if (vt = 0, Bn = null, As(e, E, L, ne), r && Ts) {
                x = 0;
                break e;
              }
              break;
            default:
              ne = vt, vt = 0, Bn = null, As(e, E, L, ne);
          }
        }
        zj(), x = It;
        break;
      } catch (ue) {
        av(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ca = zr = null, mt = l, A.H = d, A.A = h, tt === null && (Nt = null, rt = 0, Hl()), x;
  }
  function zj() {
    for (; tt !== null; ) lv(tt);
  }
  function Oj(e, n) {
    var r = mt;
    mt |= 2;
    var l = sv(), d = iv();
    Nt !== e || rt !== n ? (So = null, xo = bt() + 500, Ms(e, n)) : Ts = Ve(
      e,
      n
    );
    e: do
      try {
        if (vt !== 0 && tt !== null) {
          n = tt;
          var h = Bn;
          t: switch (vt) {
            case 1:
              vt = 0, Bn = null, As(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (vp(h)) {
                vt = 0, Bn = null, ov(n);
                break;
              }
              n = function() {
                vt !== 2 && vt !== 9 || Nt !== e || (vt = 7), ya(e);
              }, h.then(n, n);
              break e;
            case 3:
              vt = 7;
              break e;
            case 4:
              vt = 5;
              break e;
            case 7:
              vp(h) ? (vt = 0, Bn = null, ov(n)) : (vt = 0, Bn = null, As(e, n, h, 7));
              break;
            case 5:
              var x = null;
              switch (tt.tag) {
                case 26:
                  x = tt.memoizedState;
                case 5:
                case 27:
                  var E = tt;
                  if (x ? Pv(x) : E.stateNode.complete) {
                    vt = 0, Bn = null;
                    var L = E.sibling;
                    if (L !== null) tt = L;
                    else {
                      var ne = E.return;
                      ne !== null ? (tt = ne, Eo(ne)) : tt = null;
                    }
                    break t;
                  }
              }
              vt = 0, Bn = null, As(e, n, h, 5);
              break;
            case 6:
              vt = 0, Bn = null, As(e, n, h, 6);
              break;
            case 8:
              Md(), It = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        Lj();
        break;
      } catch (ue) {
        av(e, ue);
      }
    while (!0);
    return Ca = zr = null, A.H = l, A.A = d, mt = r, tt !== null ? 0 : (Nt = null, rt = 0, Hl(), It);
  }
  function Lj() {
    for (; tt !== null && !ot(); )
      lv(tt);
  }
  function lv(e) {
    var n = Ag(e.alternate, e, La);
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : tt = n;
  }
  function ov(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Ng(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          rt
        );
        break;
      case 11:
        n = Ng(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          rt
        );
        break;
      case 5:
        Gu(n);
      default:
        kg(r, n), n = tt = ip(n, La), n = Ag(r, n, La);
    }
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : tt = n;
  }
  function As(e, n, r, l) {
    Ca = zr = null, Gu(n), xs = null, Si = 0;
    var d = n.return;
    try {
      if (Ej(
        e,
        d,
        n,
        r,
        rt
      )) {
        It = 1, uo(
          e,
          Gn(r, e.current)
        ), tt = null;
        return;
      }
    } catch (h) {
      if (d !== null) throw tt = d, h;
      It = 1, uo(
        e,
        Gn(r, e.current)
      ), tt = null;
      return;
    }
    n.flags & 32768 ? (lt || l === 1 ? e = !0 : Ts || (rt & 536870912) !== 0 ? e = !1 : (nr = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = $n.current, l !== null && l.tag === 13 && (l.flags |= 16384))), cv(n, e)) : Eo(n);
  }
  function Eo(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        cv(
          n,
          nr
        );
        return;
      }
      e = n.return;
      var r = Tj(
        n.alternate,
        n,
        La
      );
      if (r !== null) {
        tt = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        tt = n;
        return;
      }
      tt = n = e;
    } while (n !== null);
    It === 0 && (It = 5);
  }
  function cv(e, n) {
    do {
      var r = Rj(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, tt = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        tt = e;
        return;
      }
      tt = e = r;
    } while (e !== null);
    It = 6, tt = null;
  }
  function uv(e, n, r, l, d, h, x, E, L) {
    e.cancelPendingCommit = null;
    do
      No();
    while (rn !== 0);
    if ((mt & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === e.current) throw Error(i(177));
      if (h = n.lanes | n.childLanes, h |= bu, an(
        e,
        r,
        h,
        x,
        E,
        L
      ), e === Nt && (tt = Nt = null, rt = 0), _s = n, sr = e, $a = r, Td = h, Rd = d, Wg = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Vj(ct, function() {
        return pv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = A.T, A.T = null, d = Y.p, Y.p = 2, x = mt, mt |= 4;
        try {
          _j(e, n, r);
        } finally {
          mt = x, Y.p = d, A.T = l;
        }
      }
      rn = 1, dv(), fv(), hv();
    }
  }
  function dv() {
    if (rn === 1) {
      rn = 0;
      var e = sr, n = _s, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = A.T, A.T = null;
        var l = Y.p;
        Y.p = 2;
        var d = mt;
        mt |= 4;
        try {
          Yg(n, e);
          var h = qd, x = Zm(e.containerInfo), E = h.focusedElem, L = h.selectionRange;
          if (x !== E && E && E.ownerDocument && Qm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (L !== null && mu(E)) {
              var ne = L.start, ue = L.end;
              if (ue === void 0 && (ue = ne), "selectionStart" in E)
                E.selectionStart = ne, E.selectionEnd = Math.min(
                  ue,
                  E.value.length
                );
              else {
                var me = E.ownerDocument || document, ie = me && me.defaultView || window;
                if (ie.getSelection) {
                  var oe = ie.getSelection(), Me = E.textContent.length, Be = Math.min(L.start, Me), jt = L.end === void 0 ? Be : Math.min(L.end, Me);
                  !oe.extend && Be > jt && (x = jt, jt = Be, Be = x);
                  var X = Xm(
                    E,
                    Be
                  ), I = Xm(
                    E,
                    jt
                  );
                  if (X && I && (oe.rangeCount !== 1 || oe.anchorNode !== X.node || oe.anchorOffset !== X.offset || oe.focusNode !== I.node || oe.focusOffset !== I.offset)) {
                    var te = me.createRange();
                    te.setStart(X.node, X.offset), oe.removeAllRanges(), Be > jt ? (oe.addRange(te), oe.extend(I.node, I.offset)) : (te.setEnd(I.node, I.offset), oe.addRange(te));
                  }
                }
              }
            }
            for (me = [], oe = E; oe = oe.parentNode; )
              oe.nodeType === 1 && me.push({
                element: oe,
                left: oe.scrollLeft,
                top: oe.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < me.length; E++) {
              var he = me[E];
              he.element.scrollLeft = he.left, he.element.scrollTop = he.top;
            }
          }
          $o = !!Hd, qd = Hd = null;
        } finally {
          mt = d, Y.p = l, A.T = r;
        }
      }
      e.current = n, rn = 2;
    }
  }
  function fv() {
    if (rn === 2) {
      rn = 0;
      var e = sr, n = _s, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = A.T, A.T = null;
        var l = Y.p;
        Y.p = 2;
        var d = mt;
        mt |= 4;
        try {
          Vg(e, n.alternate, n);
        } finally {
          mt = d, Y.p = l, A.T = r;
        }
      }
      rn = 3;
    }
  }
  function hv() {
    if (rn === 4 || rn === 3) {
      rn = 0, sn();
      var e = sr, n = _s, r = $a, l = Wg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? rn = 5 : (rn = 0, _s = sr = null, mv(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (d === 0 && (rr = null), ee(r), n = n.stateNode, Ot && typeof Ot.onCommitFiberRoot == "function")
        try {
          Ot.onCommitFiberRoot(
            pn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        n = A.T, d = Y.p, Y.p = 2, A.T = null;
        try {
          for (var h = e.onRecoverableError, x = 0; x < l.length; x++) {
            var E = l[x];
            h(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          A.T = n, Y.p = d;
        }
      }
      ($a & 3) !== 0 && No(), ya(e), d = e.pendingLanes, (r & 261930) !== 0 && (d & 42) !== 0 ? e === _d ? Ui++ : (Ui = 0, _d = e) : Ui = 0, Bi(0);
    }
  }
  function mv(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, bi(n)));
  }
  function No() {
    return dv(), fv(), hv(), pv();
  }
  function pv() {
    if (rn !== 5) return !1;
    var e = sr, n = Td;
    Td = 0;
    var r = ee($a), l = A.T, d = Y.p;
    try {
      Y.p = 32 > r ? 32 : r, A.T = null, r = Rd, Rd = null;
      var h = sr, x = $a;
      if (rn = 0, _s = sr = null, $a = 0, (mt & 6) !== 0) throw Error(i(331));
      var E = mt;
      if (mt |= 4, Qg(h.current), Pg(
        h,
        h.current,
        x,
        r
      ), mt = E, Bi(0, !1), Ot && typeof Ot.onPostCommitFiberRoot == "function")
        try {
          Ot.onPostCommitFiberRoot(pn, h);
        } catch {
        }
      return !0;
    } finally {
      Y.p = d, A.T = l, mv(e, n);
    }
  }
  function gv(e, n, r) {
    n = Gn(r, n), n = ld(e.stateNode, n, 2), e = Ja(e, n, 2), e !== null && (ht(e, 2), ya(e));
  }
  function yt(e, n, r) {
    if (e.tag === 3)
      gv(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          gv(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (rr === null || !rr.has(l))) {
            e = Gn(r, e), r = vg(2), l = Ja(n, r, 2), l !== null && (yg(
              r,
              l,
              n,
              e
            ), ht(l, 2), ya(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function Dd(e, n, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Dj();
      var d = /* @__PURE__ */ new Set();
      l.set(n, d);
    } else
      d = l.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), l.set(n, d));
    d.has(r) || (Ed = !0, d.add(r), e = $j.bind(null, e, n, r), n.then(e, e));
  }
  function $j(e, n, r) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, Nt === e && (rt & r) === r && (It === 4 || It === 3 && (rt & 62914560) === rt && 300 > bt() - bo ? (mt & 2) === 0 && Ms(e, 0) : Nd |= r, Rs === rt && (Rs = 0)), ya(e);
  }
  function vv(e, n) {
    n === 0 && (n = it()), e = Ar(e, n), e !== null && (ht(e, n), ya(e));
  }
  function Uj(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), vv(e, r);
  }
  function Bj(e, n) {
    var r = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, d = e.memoizedState;
        d !== null && (r = d.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(i(314));
    }
    l !== null && l.delete(n), vv(e, r);
  }
  function Vj(e, n) {
    return Pt(e, n);
  }
  var Co = null, Ds = null, kd = !1, To = !1, zd = !1, lr = 0;
  function ya(e) {
    e !== Ds && e.next === null && (Ds === null ? Co = Ds = e : Ds = Ds.next = e), To = !0, kd || (kd = !0, Hj());
  }
  function Bi(e, n) {
    if (!zd && To) {
      zd = !0;
      do
        for (var r = !1, l = Co; l !== null; ) {
          if (e !== 0) {
            var d = l.pendingLanes;
            if (d === 0) var h = 0;
            else {
              var x = l.suspendedLanes, E = l.pingedLanes;
              h = (1 << 31 - pt(42 | e) + 1) - 1, h &= d & ~(x & ~E), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, Sv(l, h));
          } else
            h = rt, h = be(
              l,
              l === Nt ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || Ve(l, h) || (r = !0, Sv(l, h));
          l = l.next;
        }
      while (r);
      zd = !1;
    }
  }
  function Ij() {
    yv();
  }
  function yv() {
    To = kd = !1;
    var e = 0;
    lr !== 0 && Jj() && (e = lr);
    for (var n = bt(), r = null, l = Co; l !== null; ) {
      var d = l.next, h = bv(l, n);
      h === 0 ? (l.next = null, r === null ? Co = d : r.next = d, d === null && (Ds = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (To = !0)), l = d;
    }
    rn !== 0 && rn !== 5 || Bi(e), lr !== 0 && (lr = 0);
  }
  function bv(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - pt(h), E = 1 << x, L = d[x];
      L === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = We(E, n)) : L <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = Nt, r = rt, r = be(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === n && (vt === 2 || vt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && jn(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || Ve(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (l !== null && jn(l), ee(r)) {
        case 2:
        case 8:
          r = Xe;
          break;
        case 32:
          r = ct;
          break;
        case 268435456:
          r = Ut;
          break;
        default:
          r = ct;
      }
      return l = xv.bind(null, e), r = Pt(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && jn(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function xv(e, n) {
    if (rn !== 0 && rn !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (No() && e.callbackNode !== r)
      return null;
    var l = rt;
    return l = be(
      e,
      e === Nt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (tv(e, l, n), bv(e, bt()), e.callbackNode != null && e.callbackNode === r ? xv.bind(null, e) : null);
  }
  function Sv(e, n) {
    if (No()) return null;
    tv(e, n, !0);
  }
  function Hj() {
    eE(function() {
      (mt & 6) !== 0 ? Pt(
        Le,
        Ij
      ) : yv();
    });
  }
  function Od() {
    if (lr === 0) {
      var e = vs;
      e === 0 && (e = Ce, Ce <<= 1, (Ce & 261888) === 0 && (Ce = 256)), lr = e;
    }
    return lr;
  }
  function wv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : zl("" + e);
  }
  function jv(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function qj(e, n, r, l, d) {
    if (n === "submit" && r && r.stateNode === d) {
      var h = wv(
        (d[Ee] || null).action
      ), x = l.submitter;
      x && (n = (n = x[Ee] || null) ? wv(n.formAction) : x.getAttribute("formAction"), n !== null && (h = n, x = null));
      var E = new Ul(
        "action",
        "action",
        null,
        l,
        d
      );
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (lr !== 0) {
                  var L = x ? jv(d, x) : new FormData(d);
                  td(
                    r,
                    {
                      pending: !0,
                      data: L,
                      method: d.method,
                      action: h
                    },
                    null,
                    L
                  );
                }
              } else
                typeof h == "function" && (E.preventDefault(), L = x ? jv(d, x) : new FormData(d), td(
                  r,
                  {
                    pending: !0,
                    data: L,
                    method: d.method,
                    action: h
                  },
                  h,
                  L
                ));
            },
            currentTarget: d
          }
        ]
      });
    }
  }
  for (var Ld = 0; Ld < yu.length; Ld++) {
    var $d = yu[Ld], Fj = $d.toLowerCase(), Yj = $d[0].toUpperCase() + $d.slice(1);
    la(
      Fj,
      "on" + Yj
    );
  }
  la(ep, "onAnimationEnd"), la(tp, "onAnimationIteration"), la(np, "onAnimationStart"), la("dblclick", "onDoubleClick"), la("focusin", "onFocus"), la("focusout", "onBlur"), la(lj, "onTransitionRun"), la(oj, "onTransitionStart"), la(cj, "onTransitionCancel"), la(ap, "onTransitionEnd"), ha("onMouseEnter", ["mouseout", "mouseover"]), ha("onMouseLeave", ["mouseout", "mouseover"]), ha("onPointerEnter", ["pointerout", "pointerover"]), ha("onPointerLeave", ["pointerout", "pointerover"]), ln(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ln(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ln("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ln(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ln(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ln(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Vi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Gj = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vi)
  );
  function Ev(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var l = e[r], d = l.event;
      l = l.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var x = l.length - 1; 0 <= x; x--) {
            var E = l[x], L = E.instance, ne = E.currentTarget;
            if (E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = ne;
            try {
              h(d);
            } catch (ue) {
              Il(ue);
            }
            d.currentTarget = null, h = L;
          }
        else
          for (x = 0; x < l.length; x++) {
            if (E = l[x], L = E.instance, ne = E.currentTarget, E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = ne;
            try {
              h(d);
            } catch (ue) {
              Il(ue);
            }
            d.currentTarget = null, h = L;
          }
      }
    }
  }
  function nt(e, n) {
    var r = n[Te];
    r === void 0 && (r = n[Te] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (Nv(n, e, 2, !1), r.add(l));
  }
  function Ud(e, n, r) {
    var l = 0;
    n && (l |= 4), Nv(
      r,
      e,
      l,
      n
    );
  }
  var Ro = "_reactListening" + Math.random().toString(36).slice(2);
  function Bd(e) {
    if (!e[Ro]) {
      e[Ro] = !0, Fa.forEach(function(r) {
        r !== "selectionchange" && (Gj.has(r) || Ud(r, !1, e), Ud(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Ro] || (n[Ro] = !0, Ud("selectionchange", !1, n));
    }
  }
  function Nv(e, n, r, l) {
    switch (ey(n)) {
      case 2:
        var d = xE;
        break;
      case 8:
        d = SE;
        break;
      default:
        d = ef;
    }
    r = d.bind(
      null,
      n,
      r,
      e
    ), d = void 0, !su || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (d = !0), l ? d !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: d
    }) : e.addEventListener(n, r, !0) : d !== void 0 ? e.addEventListener(n, r, {
      passive: d
    }) : e.addEventListener(n, r, !1);
  }
  function Vd(e, n, r, l, d) {
    var h = l;
    if ((n & 1) === 0 && (n & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var x = l.tag;
        if (x === 3 || x === 4) {
          var E = l.stateNode.containerInfo;
          if (E === d) break;
          if (x === 4)
            for (x = l.return; x !== null; ) {
              var L = x.tag;
              if ((L === 3 || L === 4) && x.stateNode.containerInfo === d)
                return;
              x = x.return;
            }
          for (; E !== null; ) {
            if (x = xt(E), x === null) return;
            if (L = x.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              l = h = x;
              continue e;
            }
            E = E.parentNode;
          }
        }
        l = l.return;
      }
    Mm(function() {
      var ne = h, ue = au(r), me = [];
      e: {
        var ie = rp.get(e);
        if (ie !== void 0) {
          var oe = Ul, Me = e;
          switch (e) {
            case "keypress":
              if (Ll(r) === 0) break e;
            case "keydown":
            case "keyup":
              oe = Bw;
              break;
            case "focusin":
              Me = "focus", oe = cu;
              break;
            case "focusout":
              Me = "blur", oe = cu;
              break;
            case "beforeblur":
            case "afterblur":
              oe = cu;
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
              oe = km;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = Tw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = Hw;
              break;
            case ep:
            case tp:
            case np:
              oe = Mw;
              break;
            case ap:
              oe = Fw;
              break;
            case "scroll":
            case "scrollend":
              oe = Nw;
              break;
            case "wheel":
              oe = Gw;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = Dw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = Om;
              break;
            case "toggle":
            case "beforetoggle":
              oe = Kw;
          }
          var Be = (n & 4) !== 0, jt = !Be && (e === "scroll" || e === "scrollend"), X = Be ? ie !== null ? ie + "Capture" : null : ie;
          Be = [];
          for (var I = ne, te; I !== null; ) {
            var he = I;
            if (te = he.stateNode, he = he.tag, he !== 5 && he !== 26 && he !== 27 || te === null || X === null || (he = oi(I, X), he != null && Be.push(
              Ii(I, he, te)
            )), jt) break;
            I = I.return;
          }
          0 < Be.length && (ie = new oe(
            ie,
            Me,
            null,
            r,
            ue
          ), me.push({ event: ie, listeners: Be }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (ie = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", ie && r !== nu && (Me = r.relatedTarget || r.fromElement) && (xt(Me) || Me[ke]))
            break e;
          if ((oe || ie) && (ie = ue.window === ue ? ue : (ie = ue.ownerDocument) ? ie.defaultView || ie.parentWindow : window, oe ? (Me = r.relatedTarget || r.toElement, oe = ne, Me = Me ? xt(Me) : null, Me !== null && (jt = u(Me), Be = Me.tag, Me !== jt || Be !== 5 && Be !== 27 && Be !== 6) && (Me = null)) : (oe = null, Me = ne), oe !== Me)) {
            if (Be = km, he = "onMouseLeave", X = "onMouseEnter", I = "mouse", (e === "pointerout" || e === "pointerover") && (Be = Om, he = "onPointerLeave", X = "onPointerEnter", I = "pointer"), jt = oe == null ? ie : et(oe), te = Me == null ? ie : et(Me), ie = new Be(
              he,
              I + "leave",
              oe,
              r,
              ue
            ), ie.target = jt, ie.relatedTarget = te, he = null, xt(ue) === ne && (Be = new Be(
              X,
              I + "enter",
              Me,
              r,
              ue
            ), Be.target = te, Be.relatedTarget = jt, he = Be), jt = he, oe && Me)
              t: {
                for (Be = Pj, X = oe, I = Me, te = 0, he = X; he; he = Be(he))
                  te++;
                he = 0;
                for (var $e = I; $e; $e = Be($e))
                  he++;
                for (; 0 < te - he; )
                  X = Be(X), te--;
                for (; 0 < he - te; )
                  I = Be(I), he--;
                for (; te--; ) {
                  if (X === I || I !== null && X === I.alternate) {
                    Be = X;
                    break t;
                  }
                  X = Be(X), I = Be(I);
                }
                Be = null;
              }
            else Be = null;
            oe !== null && Cv(
              me,
              ie,
              oe,
              Be,
              !1
            ), Me !== null && jt !== null && Cv(
              me,
              jt,
              Me,
              Be,
              !0
            );
          }
        }
        e: {
          if (ie = ne ? et(ne) : window, oe = ie.nodeName && ie.nodeName.toLowerCase(), oe === "select" || oe === "input" && ie.type === "file")
            var dt = qm;
          else if (Im(ie))
            if (Fm)
              dt = rj;
            else {
              dt = nj;
              var ze = tj;
            }
          else
            oe = ie.nodeName, !oe || oe.toLowerCase() !== "input" || ie.type !== "checkbox" && ie.type !== "radio" ? ne && tu(ne.elementType) && (dt = qm) : dt = aj;
          if (dt && (dt = dt(e, ne))) {
            Hm(
              me,
              dt,
              r,
              ue
            );
            break e;
          }
          ze && ze(e, ie, ne), e === "focusout" && ne && ie.type === "number" && ne.memoizedProps.value != null && eu(ie, "number", ie.value);
        }
        switch (ze = ne ? et(ne) : window, e) {
          case "focusin":
            (Im(ze) || ze.contentEditable === "true") && (cs = ze, pu = ne, gi = null);
            break;
          case "focusout":
            gi = pu = cs = null;
            break;
          case "mousedown":
            gu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gu = !1, Jm(me, r, ue);
            break;
          case "selectionchange":
            if (ij) break;
          case "keydown":
          case "keyup":
            Jm(me, r, ue);
        }
        var Ke;
        if (du)
          e: {
            switch (e) {
              case "compositionstart":
                var st = "onCompositionStart";
                break e;
              case "compositionend":
                st = "onCompositionEnd";
                break e;
              case "compositionupdate":
                st = "onCompositionUpdate";
                break e;
            }
            st = void 0;
          }
        else
          os ? Bm(e, r) && (st = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (st = "onCompositionStart");
        st && (Lm && r.locale !== "ko" && (os || st !== "onCompositionStart" ? st === "onCompositionEnd" && os && (Ke = Am()) : (Ya = ue, iu = "value" in Ya ? Ya.value : Ya.textContent, os = !0)), ze = _o(ne, st), 0 < ze.length && (st = new zm(
          st,
          e,
          null,
          r,
          ue
        ), me.push({ event: st, listeners: ze }), Ke ? st.data = Ke : (Ke = Vm(r), Ke !== null && (st.data = Ke)))), (Ke = Qw ? Zw(e, r) : Jw(e, r)) && (st = _o(ne, "onBeforeInput"), 0 < st.length && (ze = new zm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ue
        ), me.push({
          event: ze,
          listeners: st
        }), ze.data = Ke)), qj(
          me,
          e,
          ne,
          r,
          ue
        );
      }
      Ev(me, n);
    });
  }
  function Ii(e, n, r) {
    return {
      instance: e,
      listener: n,
      currentTarget: r
    };
  }
  function _o(e, n) {
    for (var r = n + "Capture", l = []; e !== null; ) {
      var d = e, h = d.stateNode;
      if (d = d.tag, d !== 5 && d !== 26 && d !== 27 || h === null || (d = oi(e, r), d != null && l.unshift(
        Ii(e, d, h)
      ), d = oi(e, n), d != null && l.push(
        Ii(e, d, h)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Pj(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Cv(e, n, r, l, d) {
    for (var h = n._reactName, x = []; r !== null && r !== l; ) {
      var E = r, L = E.alternate, ne = E.stateNode;
      if (E = E.tag, L !== null && L === l) break;
      E !== 5 && E !== 26 && E !== 27 || ne === null || (L = ne, d ? (ne = oi(r, h), ne != null && x.unshift(
        Ii(r, ne, L)
      )) : d || (ne = oi(r, h), ne != null && x.push(
        Ii(r, ne, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var Kj = /\r\n?/g, Xj = /\u0000|\uFFFD/g;
  function Tv(e) {
    return (typeof e == "string" ? e : "" + e).replace(Kj, `
`).replace(Xj, "");
  }
  function Rv(e, n) {
    return n = Tv(n), Tv(e) === n;
  }
  function wt(e, n, r, l, d, h) {
    switch (r) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || ss(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && ss(e, "" + l);
        break;
      case "className":
        Ht(e, "class", l);
        break;
      case "tabIndex":
        Ht(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ht(e, r, l);
        break;
      case "style":
        Rm(e, l, h);
        break;
      case "data":
        if (n !== "object") {
          Ht(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (n !== "a" || r !== "href")) {
          e.removeAttribute(r);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(r);
          break;
        }
        l = zl("" + l), e.setAttribute(r, l);
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
          typeof h == "function" && (r === "formAction" ? (n !== "input" && wt(e, n, "name", d.name, d, null), wt(
            e,
            n,
            "formEncType",
            d.formEncType,
            d,
            null
          ), wt(
            e,
            n,
            "formMethod",
            d.formMethod,
            d,
            null
          ), wt(
            e,
            n,
            "formTarget",
            d.formTarget,
            d,
            null
          )) : (wt(e, n, "encType", d.encType, d, null), wt(e, n, "method", d.method, d, null), wt(e, n, "target", d.target, d, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(r);
          break;
        }
        l = zl("" + l), e.setAttribute(r, l);
        break;
      case "onClick":
        l != null && (e.onclick = wa);
        break;
      case "onScroll":
        l != null && nt("scroll", e);
        break;
      case "onScrollEnd":
        l != null && nt("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(i(61));
          if (r = l.__html, r != null) {
            if (d.children != null) throw Error(i(60));
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
        r = zl("" + l), e.setAttributeNS(
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
        nt("beforetoggle", e), nt("toggle", e), Ze(e, "popover", l);
        break;
      case "xlinkActuate":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        gn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        gn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        gn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Ze(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = jw.get(r) || r, Ze(e, r, l));
    }
  }
  function Id(e, n, r, l, d, h) {
    switch (r) {
      case "style":
        Rm(e, l, h);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(i(61));
          if (r = l.__html, r != null) {
            if (d.children != null) throw Error(i(60));
            e.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof l == "string" ? ss(e, l) : (typeof l == "number" || typeof l == "bigint") && ss(e, "" + l);
        break;
      case "onScroll":
        l != null && nt("scroll", e);
        break;
      case "onScrollEnd":
        l != null && nt("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = wa);
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
        if (!ia.hasOwnProperty(r))
          e: {
            if (r[0] === "o" && r[1] === "n" && (d = r.endsWith("Capture"), n = r.slice(2, d ? r.length - 7 : void 0), h = e[Ee] || null, h = h != null ? h[r] : null, typeof h == "function" && e.removeEventListener(n, h, d), typeof l == "function")) {
              typeof h != "function" && h !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, l, d);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : Ze(e, r, l);
          }
    }
  }
  function fn(e, n, r) {
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
        nt("error", e), nt("load", e);
        var l = !1, d = !1, h;
        for (h in r)
          if (r.hasOwnProperty(h)) {
            var x = r[h];
            if (x != null)
              switch (h) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  d = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(i(137, n));
                default:
                  wt(e, n, h, x, r, null);
              }
          }
        d && wt(e, n, "srcSet", r.srcSet, r, null), l && wt(e, n, "src", r.src, r, null);
        return;
      case "input":
        nt("invalid", e);
        var E = h = x = d = null, L = null, ne = null;
        for (l in r)
          if (r.hasOwnProperty(l)) {
            var ue = r[l];
            if (ue != null)
              switch (l) {
                case "name":
                  d = ue;
                  break;
                case "type":
                  x = ue;
                  break;
                case "checked":
                  L = ue;
                  break;
                case "defaultChecked":
                  ne = ue;
                  break;
                case "value":
                  h = ue;
                  break;
                case "defaultValue":
                  E = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(i(137, n));
                  break;
                default:
                  wt(e, n, l, ue, r, null);
              }
          }
        Em(
          e,
          h,
          E,
          L,
          ne,
          x,
          d,
          !1
        );
        return;
      case "select":
        nt("invalid", e), l = x = h = null;
        for (d in r)
          if (r.hasOwnProperty(d) && (E = r[d], E != null))
            switch (d) {
              case "value":
                h = E;
                break;
              case "defaultValue":
                x = E;
                break;
              case "multiple":
                l = E;
              default:
                wt(e, n, d, E, r, null);
            }
        n = h, r = x, e.multiple = !!l, n != null ? rs(e, !!l, n, !1) : r != null && rs(e, !!l, r, !0);
        return;
      case "textarea":
        nt("invalid", e), h = d = l = null;
        for (x in r)
          if (r.hasOwnProperty(x) && (E = r[x], E != null))
            switch (x) {
              case "value":
                l = E;
                break;
              case "defaultValue":
                d = E;
                break;
              case "children":
                h = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(i(91));
                break;
              default:
                wt(e, n, x, E, r, null);
            }
        Cm(e, l, d, h);
        return;
      case "option":
        for (L in r)
          if (r.hasOwnProperty(L) && (l = r[L], l != null))
            switch (L) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                wt(e, n, L, l, r, null);
            }
        return;
      case "dialog":
        nt("beforetoggle", e), nt("toggle", e), nt("cancel", e), nt("close", e);
        break;
      case "iframe":
      case "object":
        nt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Vi.length; l++)
          nt(Vi[l], e);
        break;
      case "image":
        nt("error", e), nt("load", e);
        break;
      case "details":
        nt("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        nt("error", e), nt("load", e);
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
        for (ne in r)
          if (r.hasOwnProperty(ne) && (l = r[ne], l != null))
            switch (ne) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, n));
              default:
                wt(e, n, ne, l, r, null);
            }
        return;
      default:
        if (tu(n)) {
          for (ue in r)
            r.hasOwnProperty(ue) && (l = r[ue], l !== void 0 && Id(
              e,
              n,
              ue,
              l,
              r,
              void 0
            ));
          return;
        }
    }
    for (E in r)
      r.hasOwnProperty(E) && (l = r[E], l != null && wt(e, n, E, l, r, null));
  }
  function Qj(e, n, r, l) {
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
        var d = null, h = null, x = null, E = null, L = null, ne = null, ue = null;
        for (oe in r) {
          var me = r[oe];
          if (r.hasOwnProperty(oe) && me != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = me;
              default:
                l.hasOwnProperty(oe) || wt(e, n, oe, null, l, me);
            }
        }
        for (var ie in l) {
          var oe = l[ie];
          if (me = r[ie], l.hasOwnProperty(ie) && (oe != null || me != null))
            switch (ie) {
              case "type":
                h = oe;
                break;
              case "name":
                d = oe;
                break;
              case "checked":
                ne = oe;
                break;
              case "defaultChecked":
                ue = oe;
                break;
              case "value":
                x = oe;
                break;
              case "defaultValue":
                E = oe;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (oe != null)
                  throw Error(i(137, n));
                break;
              default:
                oe !== me && wt(
                  e,
                  n,
                  ie,
                  oe,
                  l,
                  me
                );
            }
        }
        Wc(
          e,
          x,
          E,
          L,
          ne,
          ue,
          h,
          d
        );
        return;
      case "select":
        oe = x = E = ie = null;
        for (h in r)
          if (L = r[h], r.hasOwnProperty(h) && L != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                oe = L;
              default:
                l.hasOwnProperty(h) || wt(
                  e,
                  n,
                  h,
                  null,
                  l,
                  L
                );
            }
        for (d in l)
          if (h = l[d], L = r[d], l.hasOwnProperty(d) && (h != null || L != null))
            switch (d) {
              case "value":
                ie = h;
                break;
              case "defaultValue":
                E = h;
                break;
              case "multiple":
                x = h;
              default:
                h !== L && wt(
                  e,
                  n,
                  d,
                  h,
                  l,
                  L
                );
            }
        n = E, r = x, l = oe, ie != null ? rs(e, !!r, ie, !1) : !!l != !!r && (n != null ? rs(e, !!r, n, !0) : rs(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        oe = ie = null;
        for (E in r)
          if (d = r[E], r.hasOwnProperty(E) && d != null && !l.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                wt(e, n, E, null, l, d);
            }
        for (x in l)
          if (d = l[x], h = r[x], l.hasOwnProperty(x) && (d != null || h != null))
            switch (x) {
              case "value":
                ie = d;
                break;
              case "defaultValue":
                oe = d;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(i(91));
                break;
              default:
                d !== h && wt(e, n, x, d, l, h);
            }
        Nm(e, ie, oe);
        return;
      case "option":
        for (var Me in r)
          if (ie = r[Me], r.hasOwnProperty(Me) && ie != null && !l.hasOwnProperty(Me))
            switch (Me) {
              case "selected":
                e.selected = !1;
                break;
              default:
                wt(
                  e,
                  n,
                  Me,
                  null,
                  l,
                  ie
                );
            }
        for (L in l)
          if (ie = l[L], oe = r[L], l.hasOwnProperty(L) && ie !== oe && (ie != null || oe != null))
            switch (L) {
              case "selected":
                e.selected = ie && typeof ie != "function" && typeof ie != "symbol";
                break;
              default:
                wt(
                  e,
                  n,
                  L,
                  ie,
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
        for (var Be in r)
          ie = r[Be], r.hasOwnProperty(Be) && ie != null && !l.hasOwnProperty(Be) && wt(e, n, Be, null, l, ie);
        for (ne in l)
          if (ie = l[ne], oe = r[ne], l.hasOwnProperty(ne) && ie !== oe && (ie != null || oe != null))
            switch (ne) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (ie != null)
                  throw Error(i(137, n));
                break;
              default:
                wt(
                  e,
                  n,
                  ne,
                  ie,
                  l,
                  oe
                );
            }
        return;
      default:
        if (tu(n)) {
          for (var jt in r)
            ie = r[jt], r.hasOwnProperty(jt) && ie !== void 0 && !l.hasOwnProperty(jt) && Id(
              e,
              n,
              jt,
              void 0,
              l,
              ie
            );
          for (ue in l)
            ie = l[ue], oe = r[ue], !l.hasOwnProperty(ue) || ie === oe || ie === void 0 && oe === void 0 || Id(
              e,
              n,
              ue,
              ie,
              l,
              oe
            );
          return;
        }
    }
    for (var X in r)
      ie = r[X], r.hasOwnProperty(X) && ie != null && !l.hasOwnProperty(X) && wt(e, n, X, null, l, ie);
    for (me in l)
      ie = l[me], oe = r[me], !l.hasOwnProperty(me) || ie === oe || ie == null && oe == null || wt(e, n, me, ie, l, oe);
  }
  function _v(e) {
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
  function Zj() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var d = r[l], h = d.transferSize, x = d.initiatorType, E = d.duration;
        if (h && E && _v(x)) {
          for (x = 0, E = d.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], ne = L.startTime;
            if (ne > E) break;
            var ue = L.transferSize, me = L.initiatorType;
            ue && _v(me) && (L = L.responseEnd, x += ue * (L < E ? 1 : (E - ne) / (L - ne)));
          }
          if (--l, n += 8 * (h + x) / (d.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Hd = null, qd = null;
  function Mo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Mv(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Av(e, n) {
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
  function Fd(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Yd = null;
  function Jj() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Yd ? !1 : (Yd = e, !0) : (Yd = null, !1);
  }
  var Dv = typeof setTimeout == "function" ? setTimeout : void 0, Wj = typeof clearTimeout == "function" ? clearTimeout : void 0, kv = typeof Promise == "function" ? Promise : void 0, eE = typeof queueMicrotask == "function" ? queueMicrotask : typeof kv < "u" ? function(e) {
    return kv.resolve(null).then(e).catch(tE);
  } : Dv;
  function tE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function or(e) {
    return e === "head";
  }
  function zv(e, n) {
    var r = n, l = 0;
    do {
      var d = r.nextSibling;
      if (e.removeChild(r), d && d.nodeType === 8)
        if (r = d.data, r === "/$" || r === "/&") {
          if (l === 0) {
            e.removeChild(d), Ls(n);
            return;
          }
          l--;
        } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&")
          l++;
        else if (r === "html")
          Hi(e.ownerDocument.documentElement);
        else if (r === "head") {
          r = e.ownerDocument.head, Hi(r);
          for (var h = r.firstChild; h; ) {
            var x = h.nextSibling, E = h.nodeName;
            h[Qe] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = x;
          }
        } else
          r === "body" && Hi(e.ownerDocument.body);
      r = d;
    } while (r);
    Ls(n);
  }
  function Ov(e, n) {
    var r = e;
    e = 0;
    do {
      var l = r.nextSibling;
      if (r.nodeType === 1 ? n ? (r._stashedDisplay = r.style.display, r.style.display = "none") : (r.style.display = r._stashedDisplay || "", r.getAttribute("style") === "" && r.removeAttribute("style")) : r.nodeType === 3 && (n ? (r._stashedText = r.nodeValue, r.nodeValue = "") : r.nodeValue = r._stashedText || ""), l && l.nodeType === 8)
        if (r = l.data, r === "/$") {
          if (e === 0) break;
          e--;
        } else
          r !== "$" && r !== "$?" && r !== "$~" && r !== "$!" || e++;
      r = l;
    } while (r);
  }
  function Gd(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Gd(r), Et(r);
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
  function nE(e, n, r, l) {
    for (; e.nodeType === 1; ) {
      var d = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Qe])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (h = e.getAttribute("rel"), h === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (h !== d.rel || e.getAttribute("href") !== (d.href == null || d.href === "" ? null : d.href) || e.getAttribute("crossorigin") !== (d.crossOrigin == null ? null : d.crossOrigin) || e.getAttribute("title") !== (d.title == null ? null : d.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (h = e.getAttribute("src"), (h !== (d.src == null ? null : d.src) || e.getAttribute("type") !== (d.type == null ? null : d.type) || e.getAttribute("crossorigin") !== (d.crossOrigin == null ? null : d.crossOrigin)) && h && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var h = d.name == null ? null : "" + d.name;
        if (d.type === "hidden" && e.getAttribute("name") === h)
          return e;
      } else return e;
      if (e = Zn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function aE(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = Zn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Lv(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Zn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Pd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Kd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function rE(e, n) {
    var r = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || r.readyState !== "loading")
      n();
    else {
      var l = function() {
        n(), r.removeEventListener("DOMContentLoaded", l);
      };
      r.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function Zn(e) {
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
  var Xd = null;
  function $v(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "/$" || r === "/&") {
          if (n === 0)
            return Zn(e.nextSibling);
          n--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Uv(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&") {
          if (n === 0) return e;
          n--;
        } else r !== "/$" && r !== "/&" || n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Bv(e, n, r) {
    switch (n = Mo(r), e) {
      case "html":
        if (e = n.documentElement, !e) throw Error(i(452));
        return e;
      case "head":
        if (e = n.head, !e) throw Error(i(453));
        return e;
      case "body":
        if (e = n.body, !e) throw Error(i(454));
        return e;
      default:
        throw Error(i(451));
    }
  }
  function Hi(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    Et(e);
  }
  var Jn = /* @__PURE__ */ new Map(), Vv = /* @__PURE__ */ new Set();
  function Ao(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ua = Y.d;
  Y.d = {
    f: sE,
    r: iE,
    D: lE,
    C: oE,
    L: cE,
    m: uE,
    X: fE,
    S: dE,
    M: hE
  };
  function sE() {
    var e = Ua.f(), n = wo();
    return e || n;
  }
  function iE(e) {
    var n = Lt(e);
    n !== null && n.tag === 5 && n.type === "form" ? ag(n) : Ua.r(e);
  }
  var ks = typeof document > "u" ? null : document;
  function Iv(e, n, r) {
    var l = ks;
    if (l && typeof n == "string" && n) {
      var d = Fn(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof r == "string" && (d += '[crossorigin="' + r + '"]'), Vv.has(d) || (Vv.add(d), e = { rel: e, crossOrigin: r, href: n }, l.querySelector(d) === null && (n = l.createElement("link"), fn(n, "link", e), Rt(n), l.head.appendChild(n)));
    }
  }
  function lE(e) {
    Ua.D(e), Iv("dns-prefetch", e, null);
  }
  function oE(e, n) {
    Ua.C(e, n), Iv("preconnect", e, n);
  }
  function cE(e, n, r) {
    Ua.L(e, n, r);
    var l = ks;
    if (l && e && n) {
      var d = 'link[rel="preload"][as="' + Fn(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (d += '[imagesrcset="' + Fn(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (d += '[imagesizes="' + Fn(
        r.imageSizes
      ) + '"]')) : d += '[href="' + Fn(e) + '"]';
      var h = d;
      switch (n) {
        case "style":
          h = zs(e);
          break;
        case "script":
          h = Os(e);
      }
      Jn.has(h) || (e = v(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Jn.set(h, e), l.querySelector(d) !== null || n === "style" && l.querySelector(qi(h)) || n === "script" && l.querySelector(Fi(h)) || (n = l.createElement("link"), fn(n, "link", e), Rt(n), l.head.appendChild(n)));
    }
  }
  function uE(e, n) {
    Ua.m(e, n);
    var r = ks;
    if (r && e) {
      var l = n && typeof n.as == "string" ? n.as : "script", d = 'link[rel="modulepreload"][as="' + Fn(l) + '"][href="' + Fn(e) + '"]', h = d;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = Os(e);
      }
      if (!Jn.has(h) && (e = v({ rel: "modulepreload", href: e }, n), Jn.set(h, e), r.querySelector(d) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(Fi(h)))
              return;
        }
        l = r.createElement("link"), fn(l, "link", e), Rt(l), r.head.appendChild(l);
      }
    }
  }
  function dE(e, n, r) {
    Ua.S(e, n, r);
    var l = ks;
    if (l && e) {
      var d = Xt(l).hoistableStyles, h = zs(e);
      n = n || "default";
      var x = d.get(h);
      if (!x) {
        var E = { loading: 0, preload: null };
        if (x = l.querySelector(
          qi(h)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": n },
            r
          ), (r = Jn.get(h)) && Qd(e, r);
          var L = x = l.createElement("link");
          Rt(L), fn(L, "link", e), L._p = new Promise(function(ne, ue) {
            L.onload = ne, L.onerror = ue;
          }), L.addEventListener("load", function() {
            E.loading |= 1;
          }), L.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, Do(x, n, l);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: E
        }, d.set(h, x);
      }
    }
  }
  function fE(e, n) {
    Ua.X(e, n);
    var r = ks;
    if (r && e) {
      var l = Xt(r).hoistableScripts, d = Os(e), h = l.get(d);
      h || (h = r.querySelector(Fi(d)), h || (e = v({ src: e, async: !0 }, n), (n = Jn.get(d)) && Zd(e, n), h = r.createElement("script"), Rt(h), fn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function hE(e, n) {
    Ua.M(e, n);
    var r = ks;
    if (r && e) {
      var l = Xt(r).hoistableScripts, d = Os(e), h = l.get(d);
      h || (h = r.querySelector(Fi(d)), h || (e = v({ src: e, async: !0, type: "module" }, n), (n = Jn.get(d)) && Zd(e, n), h = r.createElement("script"), Rt(h), fn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function Hv(e, n, r, l) {
    var d = (d = J.current) ? Ao(d) : null;
    if (!d) throw Error(i(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = zs(r.href), r = Xt(
          d
        ).hoistableStyles, l = r.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = zs(r.href);
          var h = Xt(
            d
          ).hoistableStyles, x = h.get(e);
          if (x || (d = d.ownerDocument || d, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(e, x), (h = d.querySelector(
            qi(e)
          )) && !h._p && (x.instance = h, x.state.loading = 5), Jn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Jn.set(e, r), h || mE(
            d,
            e,
            r,
            x.state
          ))), n && l === null)
            throw Error(i(528, ""));
          return x;
        }
        if (n && l !== null)
          throw Error(i(529, ""));
        return null;
      case "script":
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Os(r), r = Xt(
          d
        ).hoistableScripts, l = r.get(n), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(i(444, e));
    }
  }
  function zs(e) {
    return 'href="' + Fn(e) + '"';
  }
  function qi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function qv(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function mE(e, n, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), fn(n, "link", r), Rt(n), e.head.appendChild(n));
  }
  function Os(e) {
    return '[src="' + Fn(e) + '"]';
  }
  function Fi(e) {
    return "script[async]" + e;
  }
  function Fv(e, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Fn(r.href) + '"]'
          );
          if (l)
            return n.instance = l, Rt(l), l;
          var d = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Rt(l), fn(l, "style", d), Do(l, r.precedence, e), n.instance = l;
        case "stylesheet":
          d = zs(r.href);
          var h = e.querySelector(
            qi(d)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, Rt(h), h;
          l = qv(r), (d = Jn.get(d)) && Qd(l, d), h = (e.ownerDocument || e).createElement("link"), Rt(h);
          var x = h;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), fn(h, "link", l), n.state.loading |= 4, Do(h, r.precedence, e), n.instance = h;
        case "script":
          return h = Os(r.src), (d = e.querySelector(
            Fi(h)
          )) ? (n.instance = d, Rt(d), d) : (l = r, (d = Jn.get(h)) && (l = v({}, r), Zd(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), Rt(d), fn(d, "link", l), e.head.appendChild(d), n.instance = d);
        case "void":
          return null;
        default:
          throw Error(i(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (l = n.instance, n.state.loading |= 4, Do(l, r.precedence, e));
    return n.instance;
  }
  function Do(e, n, r) {
    for (var l = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), d = l.length ? l[l.length - 1] : null, h = d, x = 0; x < l.length; x++) {
      var E = l[x];
      if (E.dataset.precedence === n) h = E;
      else if (h !== d) break;
    }
    h ? h.parentNode.insertBefore(e, h.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(e, n.firstChild));
  }
  function Qd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Zd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var ko = null;
  function Yv(e, n, r) {
    if (ko === null) {
      var l = /* @__PURE__ */ new Map(), d = ko = /* @__PURE__ */ new Map();
      d.set(r, l);
    } else
      d = ko, l = d.get(r), l || (l = /* @__PURE__ */ new Map(), d.set(r, l));
    if (l.has(e)) return l;
    for (l.set(e, null), r = r.getElementsByTagName(e), d = 0; d < r.length; d++) {
      var h = r[d];
      if (!(h[Qe] || h[je] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = h.getAttribute(n) || "";
        x = e + x;
        var E = l.get(x);
        E ? E.push(h) : l.set(x, [h]);
      }
    }
    return l;
  }
  function Gv(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function pE(e, n, r) {
    if (r === 1 || n.itemProp != null) return !1;
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
  function Pv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function gE(e, n, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var d = zs(l.href), h = n.querySelector(
          qi(d)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = zo.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = h, Rt(h);
          return;
        }
        h = n.ownerDocument || n, l = qv(l), (d = Jn.get(d)) && Qd(l, d), h = h.createElement("link"), Rt(h);
        var x = h;
        x._p = new Promise(function(E, L) {
          x.onload = E, x.onerror = L;
        }), fn(h, "link", l), r.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = zo.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Jd = 0;
  function vE(e, n) {
    return e.stylesheets && e.count === 0 && Lo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Jd === 0 && (Jd = 62500 * Zj());
      var d = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend)) {
            var h = e.unsuspend;
            e.unsuspend = null, h();
          }
        },
        (e.imgBytes > Jd ? 50 : 800) + n
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(d);
      };
    } : null;
  }
  function zo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Lo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Oo = null;
  function Lo(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Oo = /* @__PURE__ */ new Map(), n.forEach(yE, e), Oo = null, zo.call(e));
  }
  function yE(e, n) {
    if (!(n.state.loading & 4)) {
      var r = Oo.get(e);
      if (r) var l = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), Oo.set(e, r);
        for (var d = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < d.length; h++) {
          var x = d[h];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (r.set(x.dataset.precedence, x), l = x);
        }
        l && r.set(null, l);
      }
      d = n.instance, x = d.getAttribute("data-precedence"), h = r.get(x) || l, h === l && r.set(null, d), r.set(x, d), this.count++, l = zo.bind(this), d.addEventListener("load", l), d.addEventListener("error", l), h ? h.parentNode.insertBefore(d, h.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(d, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Yi = {
    $$typeof: M,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function bE(e, n, r, l, d, h, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Fe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Fe(0), this.hiddenUpdates = Fe(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Kv(e, n, r, l, d, h, x, E, L, ne, ue, me) {
    return e = new bE(
      e,
      n,
      r,
      x,
      L,
      ne,
      ue,
      me,
      E
    ), n = 1, h === !0 && (n |= 24), h = Ln(3, null, null, n), e.current = h, h.stateNode = e, n = Au(), n.refCount++, e.pooledCache = n, n.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: r,
      cache: n
    }, Ou(h), e;
  }
  function Xv(e) {
    return e ? (e = fs, e) : fs;
  }
  function Qv(e, n, r, l, d, h) {
    d = Xv(d), l.context === null ? l.context = d : l.pendingContext = d, l = Za(n), l.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (l.callback = h), r = Ja(e, l, n), r !== null && (Mn(r, e, n), ji(r, e, n));
  }
  function Zv(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Wd(e, n) {
    Zv(e, n), (e = e.alternate) && Zv(e, n);
  }
  function Jv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ar(e, 67108864);
      n !== null && Mn(n, e, 67108864), Wd(e, 67108864);
    }
  }
  function Wv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = In();
      n = P(n);
      var r = Ar(e, n);
      r !== null && Mn(r, e, n), Wd(e, n);
    }
  }
  var $o = !0;
  function xE(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = Y.p;
    try {
      Y.p = 2, ef(e, n, r, l);
    } finally {
      Y.p = h, A.T = d;
    }
  }
  function SE(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = Y.p;
    try {
      Y.p = 8, ef(e, n, r, l);
    } finally {
      Y.p = h, A.T = d;
    }
  }
  function ef(e, n, r, l) {
    if ($o) {
      var d = tf(l);
      if (d === null)
        Vd(
          e,
          n,
          l,
          Uo,
          r
        ), ty(e, l);
      else if (jE(
        d,
        e,
        n,
        r,
        l
      ))
        l.stopPropagation();
      else if (ty(e, l), n & 4 && -1 < wE.indexOf(e)) {
        for (; d !== null; ) {
          var h = Lt(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = ve(h.pendingLanes);
                  if (x !== 0) {
                    var E = h;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - pt(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    ya(h), (mt & 6) === 0 && (xo = bt() + 500, Bi(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Ar(h, 2), E !== null && Mn(E, h, 2), wo(), Wd(h, 2);
            }
          if (h = tf(l), h === null && Vd(
            e,
            n,
            l,
            Uo,
            r
          ), h === d) break;
          d = h;
        }
        d !== null && l.stopPropagation();
      } else
        Vd(
          e,
          n,
          l,
          null,
          r
        );
    }
  }
  function tf(e) {
    return e = au(e), nf(e);
  }
  var Uo = null;
  function nf(e) {
    if (Uo = null, e = xt(e), e !== null) {
      var n = u(e);
      if (n === null) e = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (e = f(n), e !== null) return e;
          e = null;
        } else if (r === 31) {
          if (e = p(n), e !== null) return e;
          e = null;
        } else if (r === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return Uo = e, null;
  }
  function ey(e) {
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
        switch (we()) {
          case Le:
            return 2;
          case Xe:
            return 8;
          case ct:
          case At:
            return 32;
          case Ut:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var af = !1, cr = null, ur = null, dr = null, Gi = /* @__PURE__ */ new Map(), Pi = /* @__PURE__ */ new Map(), fr = [], wE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ty(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        cr = null;
        break;
      case "dragenter":
      case "dragleave":
        ur = null;
        break;
      case "mouseover":
      case "mouseout":
        dr = null;
        break;
      case "pointerover":
      case "pointerout":
        Gi.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pi.delete(n.pointerId);
    }
  }
  function Ki(e, n, r, l, d, h) {
    return e === null || e.nativeEvent !== h ? (e = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: l,
      nativeEvent: h,
      targetContainers: [d]
    }, n !== null && (n = Lt(n), n !== null && Jv(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function jE(e, n, r, l, d) {
    switch (n) {
      case "focusin":
        return cr = Ki(
          cr,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "dragenter":
        return ur = Ki(
          ur,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "mouseover":
        return dr = Ki(
          dr,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "pointerover":
        var h = d.pointerId;
        return Gi.set(
          h,
          Ki(
            Gi.get(h) || null,
            e,
            n,
            r,
            l,
            d
          )
        ), !0;
      case "gotpointercapture":
        return h = d.pointerId, Pi.set(
          h,
          Ki(
            Pi.get(h) || null,
            e,
            n,
            r,
            l,
            d
          )
        ), !0;
    }
    return !1;
  }
  function ny(e) {
    var n = xt(e.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = f(r), n !== null) {
            e.blockedOn = n, xe(e.priority, function() {
              Wv(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = p(r), n !== null) {
            e.blockedOn = n, xe(e.priority, function() {
              Wv(r);
            });
            return;
          }
        } else if (n === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Bo(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var r = tf(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(
          r.type,
          r
        );
        nu = l, r.target.dispatchEvent(l), nu = null;
      } else
        return n = Lt(r), n !== null && Jv(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function ay(e, n, r) {
    Bo(e) && r.delete(n);
  }
  function EE() {
    af = !1, cr !== null && Bo(cr) && (cr = null), ur !== null && Bo(ur) && (ur = null), dr !== null && Bo(dr) && (dr = null), Gi.forEach(ay), Pi.forEach(ay);
  }
  function Vo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, af || (af = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      EE
    )));
  }
  var Io = null;
  function ry(e) {
    Io !== e && (Io = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Io === e && (Io = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], l = e[n + 1], d = e[n + 2];
          if (typeof l != "function") {
            if (nf(l || r) === null)
              continue;
            break;
          }
          var h = Lt(r);
          h !== null && (e.splice(n, 3), n -= 3, td(
            h,
            {
              pending: !0,
              data: d,
              method: r.method,
              action: l
            },
            l,
            d
          ));
        }
      }
    ));
  }
  function Ls(e) {
    function n(L) {
      return Vo(L, e);
    }
    cr !== null && Vo(cr, e), ur !== null && Vo(ur, e), dr !== null && Vo(dr, e), Gi.forEach(n), Pi.forEach(n);
    for (var r = 0; r < fr.length; r++) {
      var l = fr[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < fr.length && (r = fr[0], r.blockedOn === null); )
      ny(r), r.blockedOn === null && fr.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var d = r[l], h = r[l + 1], x = d[Ee] || null;
        if (typeof h == "function")
          x || ry(r);
        else if (x) {
          var E = null;
          if (h && h.hasAttribute("formAction")) {
            if (d = h, x = h[Ee] || null)
              E = x.formAction;
            else if (nf(d) !== null) continue;
          } else E = x.action;
          typeof E == "function" ? r[l + 1] = E : (r.splice(l, 3), l -= 3), ry(r);
        }
      }
  }
  function sy() {
    function e(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
        handler: function() {
          return new Promise(function(x) {
            return d = x;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      d !== null && (d(), d = null), l || setTimeout(r, 20);
    }
    function r() {
      if (!l && !navigation.transition) {
        var h = navigation.currentEntry;
        h && h.url != null && navigation.navigate(h.url, {
          state: h.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, d = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(r, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), d !== null && (d(), d = null);
      };
    }
  }
  function rf(e) {
    this._internalRoot = e;
  }
  Ho.prototype.render = rf.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(i(409));
    var r = n.current, l = In();
    Qv(r, l, e, n, null, null);
  }, Ho.prototype.unmount = rf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Qv(e.current, 2, null, e, null, null), wo(), n[ke] = null;
    }
  };
  function Ho(e) {
    this._internalRoot = e;
  }
  Ho.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ge();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < fr.length && n !== 0 && n < fr[r].priority; r++) ;
      fr.splice(r, 0, e), r === 0 && ny(e);
    }
  };
  var iy = a.version;
  if (iy !== "19.2.5")
    throw Error(
      i(
        527,
        iy,
        "19.2.5"
      )
    );
  Y.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = m(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var NE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qo.isDisabled && qo.supportsFiber)
      try {
        pn = qo.inject(
          NE
        ), Ot = qo;
      } catch {
      }
  }
  return Qi.createRoot = function(e, n) {
    if (!o(e)) throw Error(i(299));
    var r = !1, l = "", d = hg, h = mg, x = pg;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (d = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = Kv(
      e,
      1,
      !1,
      null,
      null,
      r,
      l,
      null,
      d,
      h,
      x,
      sy
    ), e[ke] = n.current, Bd(e), new rf(n);
  }, Qi.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(i(299));
    var l = !1, d = "", h = hg, x = mg, E = pg, L = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (d = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (E = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = Kv(
      e,
      1,
      !0,
      n,
      r ?? null,
      l,
      d,
      L,
      h,
      x,
      E,
      sy
    ), n.context = Xv(null), r = n.current, l = In(), l = P(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, ht(n, r), ya(n), e[ke] = n.current, Bd(e), new Ho(n);
  }, Qi.version = "19.2.5", Qi;
}
var gy;
function LE() {
  if (gy) return of.exports;
  gy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), of.exports = OE(), of.exports;
}
var $E = LE();
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
var Ox = (t) => {
  throw TypeError(t);
}, UE = (t, a, s) => a.has(t) || Ox("Cannot " + s), ff = (t, a, s) => (UE(t, a, "read from private field"), s ? s.call(t) : a.get(t)), BE = (t, a, s) => a.has(t) ? Ox("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, s);
function vy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function VE(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: s, v5Compat: i = !1 } = t, o;
  o = a.map(
    (S, j) => b(
      S,
      typeof S == "string" ? null : S.state,
      j === 0 ? "default" : void 0,
      typeof S == "string" ? void 0 : S.unstable_mask
    )
  );
  let u = y(
    s ?? o.length - 1
  ), f = "POP", p = null;
  function y(S) {
    return Math.min(Math.max(S, 0), o.length - 1);
  }
  function m() {
    return o[u];
  }
  function b(S, j = null, N, R) {
    let C = Wf(
      o ? m().pathname : "/",
      S,
      j,
      N,
      R
    );
    return Yt(
      C.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        S
      )}`
    ), C;
  }
  function v(S) {
    return typeof S == "string" ? S : xa(S);
  }
  return {
    get index() {
      return u;
    },
    get action() {
      return f;
    },
    get location() {
      return m();
    },
    createHref: v,
    createURL(S) {
      return new URL(v(S), "http://localhost");
    },
    encodeLocation(S) {
      let j = typeof S == "string" ? fa(S) : S;
      return {
        pathname: j.pathname || "",
        search: j.search || "",
        hash: j.hash || ""
      };
    },
    push(S, j) {
      f = "PUSH";
      let N = vy(S) ? S : b(S, j);
      u += 1, o.splice(u, o.length, N), i && p && p({ action: f, location: N, delta: 1 });
    },
    replace(S, j) {
      f = "REPLACE";
      let N = vy(S) ? S : b(S, j);
      o[u] = N, i && p && p({ action: f, location: N, delta: 0 });
    },
    go(S) {
      f = "POP";
      let j = y(u + S), N = o[j];
      u = j, p && p({ action: f, location: N, delta: S });
    },
    listen(S) {
      return p = S, () => {
        p = null;
      };
    }
  };
}
function Je(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Yt(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function IE() {
  return Math.random().toString(36).substring(2, 10);
}
function Wf(t, a, s = null, i, o) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? fa(a) : a,
    state: s,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || i || IE(),
    unstable_mask: o
  };
}
function xa({
  pathname: t = "/",
  search: a = "",
  hash: s = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), s && s !== "#" && (t += s.charAt(0) === "#" ? s : "#" + s), t;
}
function fa(t) {
  let a = {};
  if (t) {
    let s = t.indexOf("#");
    s >= 0 && (a.hash = t.substring(s), t = t.substring(0, s));
    let i = t.indexOf("?");
    i >= 0 && (a.search = t.substring(i), t = t.substring(0, i)), t && (a.pathname = t);
  }
  return a;
}
function HE(t, a = !1) {
  let s = "http://localhost";
  typeof window < "u" && (s = window.location.origin !== "null" ? window.location.origin : window.location.href), Je(s, "No window.location.(origin|href) available to create URL");
  let i = typeof t == "string" ? t : xa(t);
  return i = i.replace(/ $/, "%20"), !a && i.startsWith("//") && (i = s + i), new URL(i, s);
}
var ol, yy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (BE(this, ol, /* @__PURE__ */ new Map()), t)
      for (let [a, s] of t)
        this.set(a, s);
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
    if (ff(this, ol).has(t))
      return ff(this, ol).get(t);
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
    ff(this, ol).set(t, a);
  }
};
ol = /* @__PURE__ */ new WeakMap();
var qE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function FE(t) {
  return qE.has(
    t
  );
}
var YE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function GE(t) {
  return YE.has(
    t
  );
}
function PE(t) {
  return t.index === !0;
}
function pl(t, a, s = [], i = {}, o = !1) {
  return t.map((u, f) => {
    let p = [...s, String(f)], y = typeof u.id == "string" ? u.id : p.join("-");
    if (Je(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Je(
      o || !i[y],
      `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`
    ), PE(u)) {
      let m = {
        ...u,
        id: y
      };
      return i[y] = by(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: y,
        children: void 0
      };
      return i[y] = by(
        m,
        a(m)
      ), u.children && (m.children = pl(
        u.children,
        a,
        p,
        i,
        o
      )), m;
    }
  });
}
function by(t, a) {
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
function yr(t, a, s = "/") {
  return cl(t, a, s, !1);
}
function cl(t, a, s, i) {
  let o = typeof a == "string" ? fa(a) : a, u = aa(o.pathname || "/", s);
  if (u == null)
    return null;
  let f = Lx(t);
  XE(f);
  let p = null;
  for (let y = 0; p == null && y < f.length; ++y) {
    let m = iN(u);
    p = rN(
      f[y],
      m,
      i
    );
  }
  return p;
}
function KE(t, a) {
  let { route: s, pathname: i, params: o } = t;
  return {
    id: s.id,
    pathname: i,
    params: o,
    data: a[s.id],
    loaderData: a[s.id],
    handle: s.handle
  };
}
function Lx(t, a = [], s = [], i = "", o = !1) {
  let u = (f, p, y = o, m) => {
    let b = {
      relativePath: m === void 0 ? f.path || "" : m,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: p,
      route: f
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(i) && y)
        return;
      Je(
        b.relativePath.startsWith(i),
        `Absolute route path "${b.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(i.length);
    }
    let v = ea([i, b.relativePath]), w = s.concat(b);
    f.children && f.children.length > 0 && (Je(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), Lx(
      f.children,
      a,
      w,
      v,
      y
    )), !(f.path == null && !f.index) && a.push({
      path: v,
      score: nN(v, f.index),
      routesMeta: w
    });
  };
  return t.forEach((f, p) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, p);
    else
      for (let y of $x(f.path))
        u(f, p, !0, y);
  }), a;
}
function $x(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [s, ...i] = a, o = s.endsWith("?"), u = s.replace(/\?$/, "");
  if (i.length === 0)
    return o ? [u, ""] : [u];
  let f = $x(i.join("/")), p = [];
  return p.push(
    ...f.map(
      (y) => y === "" ? u : [u, y].join("/")
    )
  ), o && p.push(...f), p.map(
    (y) => t.startsWith("/") && y === "" ? "/" : y
  );
}
function XE(t) {
  t.sort(
    (a, s) => a.score !== s.score ? s.score - a.score : aN(
      a.routesMeta.map((i) => i.childrenIndex),
      s.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var QE = /^:[\w-]+$/, ZE = 3, JE = 2, WE = 1, eN = 10, tN = -2, xy = (t) => t === "*";
function nN(t, a) {
  let s = t.split("/"), i = s.length;
  return s.some(xy) && (i += tN), a && (i += JE), s.filter((o) => !xy(o)).reduce(
    (o, u) => o + (QE.test(u) ? ZE : u === "" ? WE : eN),
    i
  );
}
function aN(t, a) {
  return t.length === a.length && t.slice(0, -1).every((i, o) => i === a[o]) ? (
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
function rN(t, a, s = !1) {
  let { routesMeta: i } = t, o = {}, u = "/", f = [];
  for (let p = 0; p < i.length; ++p) {
    let y = i[p], m = p === i.length - 1, b = u === "/" ? a : a.slice(u.length) || "/", v = jc(
      { path: y.relativePath, caseSensitive: y.caseSensitive, end: m },
      b
    ), w = y.route;
    if (!v && m && s && !i[i.length - 1].route.index && (v = jc(
      {
        path: y.relativePath,
        caseSensitive: y.caseSensitive,
        end: !1
      },
      b
    )), !v)
      return null;
    Object.assign(o, v.params), f.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: ea([u, v.pathname]),
      pathnameBase: cN(
        ea([u, v.pathnameBase])
      ),
      route: w
    }), v.pathnameBase !== "/" && (u = ea([u, v.pathnameBase]));
  }
  return f;
}
function jc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [s, i] = sN(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(s);
  if (!o) return null;
  let u = o[0], f = u.replace(/(.)\/+$/, "$1"), p = o.slice(1);
  return {
    params: i.reduce(
      (m, { paramName: b, isOptional: v }, w) => {
        if (b === "*") {
          let j = p[w] || "";
          f = u.slice(0, u.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const S = p[w];
        return v && !S ? m[b] = void 0 : m[b] = (S || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: u,
    pathnameBase: f,
    pattern: t
  };
}
function sN(t, a = !1, s = !0) {
  Yt(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let i = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (f, p, y, m, b) => {
      if (i.push({ paramName: p, isOptional: y != null }), y) {
        let v = b.charAt(m + f.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (i.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : s ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), i];
}
function iN(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Yt(
      !1,
      `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), t;
  }
}
function aa(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let s = a.endsWith("/") ? a.length - 1 : a.length, i = t.charAt(s);
  return i && i !== "/" ? null : t.slice(s) || "/";
}
function lN({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : ea([t, a]);
}
var Ux = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, kh = (t) => Ux.test(t);
function oN(t, a = "/") {
  let {
    pathname: s,
    search: i = "",
    hash: o = ""
  } = typeof t == "string" ? fa(t) : t, u;
  return s ? (s = Oh(s), s.startsWith("/") ? u = Sy(s.substring(1), "/") : u = Sy(s, a)) : u = a, {
    pathname: u,
    search: uN(i),
    hash: dN(o)
  };
}
function Sy(t, a) {
  let s = Ec(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? s.length > 1 && s.pop() : o !== "." && s.push(o);
  }), s.length > 1 ? s.join("/") : "/";
}
function hf(t, a, s, i) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    i
  )}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Bx(t) {
  return t.filter(
    (a, s) => s === 0 || a.route.path && a.route.path.length > 0
  );
}
function zh(t) {
  let a = Bx(t);
  return a.map(
    (s, i) => i === a.length - 1 ? s.pathname : s.pathnameBase
  );
}
function Bc(t, a, s, i = !1) {
  let o;
  typeof t == "string" ? o = fa(t) : (o = { ...t }, Je(
    !o.pathname || !o.pathname.includes("?"),
    hf("?", "pathname", "search", o)
  ), Je(
    !o.pathname || !o.pathname.includes("#"),
    hf("#", "pathname", "hash", o)
  ), Je(
    !o.search || !o.search.includes("#"),
    hf("#", "search", "hash", o)
  ));
  let u = t === "" || o.pathname === "", f = u ? "/" : o.pathname, p;
  if (f == null)
    p = s;
  else {
    let v = a.length - 1;
    if (!i && f.startsWith("..")) {
      let w = f.split("/");
      for (; w[0] === ".."; )
        w.shift(), v -= 1;
      o.pathname = w.join("/");
    }
    p = v >= 0 ? a[v] : "/";
  }
  let y = oN(o, p), m = f && f !== "/" && f.endsWith("/"), b = (u || f === ".") && s.endsWith("/");
  return !y.pathname.endsWith("/") && (m || b) && (y.pathname += "/"), y;
}
var Oh = (t) => t.replace(/\/\/+/g, "/"), ea = (t) => Oh(t.join("/")), Ec = (t) => t.replace(/\/+$/, ""), cN = (t) => Ec(t).replace(/^\/*/, "/"), uN = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, dN = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, fN = (t, a = 302) => {
  let s = a;
  typeof s == "number" ? s = { status: s } : typeof s.status > "u" && (s.status = 302);
  let i = new Headers(s.headers);
  return i.set("Location", t), new Response(null, { ...s, headers: i });
}, Vc = class {
  constructor(t, a, s, i = !1) {
    this.status = t, this.statusText = a || "", this.internal = i, s instanceof Error ? (this.data = s.toString(), this.error = s) : this.data = s;
  }
};
function gl(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function jl(t) {
  let a = t.map((s) => s.route.path).filter(Boolean);
  return ea(a) || "/";
}
var Vx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Ix(t, a) {
  let s = t;
  if (typeof s != "string" || !Ux.test(s))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: s
    };
  let i = s, o = !1;
  if (Vx)
    try {
      let u = new URL(window.location.href), f = s.startsWith("//") ? new URL(u.protocol + s) : new URL(s), p = aa(f.pathname, a);
      f.origin === u.origin && p != null ? s = p + f.search + f.hash : o = !0;
    } catch {
      Yt(
        !1,
        `<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: i,
    isExternal: o,
    to: s
  };
}
var xr = Symbol("Uninstrumented");
function hN(t, a) {
  let s = {
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
      instrument(u) {
        let f = Object.keys(s);
        for (let p of f)
          u[p] && s[p].push(u[p]);
      }
    })
  );
  let i = {};
  if (typeof a.lazy == "function" && s.lazy.length > 0) {
    let o = Fs(s.lazy, a.lazy, () => {
    });
    o && (i.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let f = o[u], p = s[`lazy.${u}`];
      if (typeof f == "function" && p.length > 0) {
        let y = Fs(p, f, () => {
        });
        y && (i.lazy = Object.assign(i.lazy || {}, {
          [u]: y
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let u = a[o];
    if (typeof u == "function" && s[o].length > 0) {
      let f = u[xr] ?? u, p = Fs(
        s[o],
        f,
        (...y) => wy(y[0])
      );
      p && (o === "loader" && f.hydrate === !0 && (p.hydrate = !0), p[xr] = f, i[o] = p);
    }
  }), a.middleware && a.middleware.length > 0 && s.middleware.length > 0 && (i.middleware = a.middleware.map((o) => {
    let u = o[xr] ?? o, f = Fs(
      s.middleware,
      u,
      (...p) => wy(p[0])
    );
    return f ? (f[xr] = u, f) : o;
  })), i;
}
function mN(t, a) {
  let s = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (i) => i({
      instrument(o) {
        let u = Object.keys(o);
        for (let f of u)
          o[f] && s[f].push(o[f]);
      }
    })
  ), s.navigate.length > 0) {
    let i = t.navigate[xr] ?? t.navigate, o = Fs(
      s.navigate,
      i,
      (...u) => {
        let [f, p] = u;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? xa(f) : ".",
          ...jy(t, p ?? {})
        };
      }
    );
    o && (o[xr] = i, t.navigate = o);
  }
  if (s.fetch.length > 0) {
    let i = t.fetch[xr] ?? t.fetch, o = Fs(s.fetch, i, (...u) => {
      let [f, , p, y] = u;
      return {
        href: p ?? ".",
        fetcherKey: f,
        ...jy(t, y ?? {})
      };
    });
    o && (o[xr] = i, t.fetch = o);
  }
  return t;
}
function Fs(t, a, s) {
  return t.length === 0 ? null : async (...i) => {
    let o = await Hx(
      t,
      s(...i),
      () => a(...i),
      t.length - 1
    );
    if (o.type === "error")
      throw o.value;
    return o.value;
  };
}
async function Hx(t, a, s, i) {
  let o = t[i], u;
  if (o) {
    let f, p = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = Hx(t, a, s, i - 1), u = await f, Je(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await o(p, a);
    } catch (y) {
      console.error("An instrumentation function threw an error:", y);
    }
    f || await p(), await f;
  } else
    try {
      u = { type: "success", value: await s() };
    } catch (f) {
      u = { type: "error", value: f };
    }
  return u || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function wy(t) {
  let { request: a, context: s, params: i, unstable_pattern: o } = t;
  return {
    request: pN(a),
    params: { ...i },
    unstable_pattern: o,
    context: gN(s)
  };
}
function jy(t, a) {
  return {
    currentUrl: xa(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function pN(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function gN(t) {
  if (yN(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var vN = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function yN(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === vN;
}
var qx = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], bN = new Set(
  qx
), xN = [
  "GET",
  ...qx
], SN = new Set(xN), Fx = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), wN = /* @__PURE__ */ new Set([307, 308]), mf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, jN = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Zi = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, EN = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), Yx = "remix-router-transitions", Gx = Symbol("ResetLoaderData");
function NN(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, s = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Je(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let i = t.hydrationRouteProperties || [], o = t.mapRouteProperties || EN, u = o;
  if (t.unstable_instrumentations) {
    let z = t.unstable_instrumentations;
    u = (P) => ({
      ...o(P),
      ...hN(
        z.map((ee) => ee.route).filter(Boolean),
        P
      )
    });
  }
  let f = {}, p = pl(
    t.routes,
    u,
    void 0,
    f
  ), y, m = t.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let b = t.dataStrategy || MN, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, w = null, S = /* @__PURE__ */ new Set(), j = null, N = null, R = null, C = t.hydrationData != null, O = yr(p, t.history.location, m), M = !1, T = null, q, Q;
  if (O == null && !t.patchRoutesOnNavigation) {
    let z = Wn(404, {
      pathname: t.history.location.pathname
    }), { matches: P, route: ee } = Fo(p);
    q = !0, Q = !q, O = P, T = { [ee.id]: z };
  } else if (O && !t.hydrationData && Fe(
    O,
    p,
    t.history.location.pathname
  ).active && (O = null), O)
    if (O.some((z) => z.route.lazy))
      q = !1, Q = !q;
    else if (!O.some((z) => Lh(z.route)))
      q = !0, Q = !q;
    else {
      let z = t.hydrationData ? t.hydrationData.loaderData : null, P = t.hydrationData ? t.hydrationData.errors : null, ee = O;
      if (P) {
        let ge = O.findIndex(
          (xe) => P[xe.route.id] !== void 0
        );
        ee = ee.slice(0, ge + 1);
      }
      Q = !1, q = !0, ee.forEach((ge) => {
        let xe = Px(ge.route, z, P);
        Q = Q || xe.renderFallback, q = q && !xe.shouldLoad;
      });
    }
  else {
    q = !1, Q = !q, O = [];
    let z = Fe(
      null,
      p,
      t.history.location.pathname
    );
    z.active && z.matches && (M = !0, O = z.matches);
  }
  let re, _ = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: O,
    initialized: q,
    renderFallback: Q,
    navigation: mf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || T,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, V = "POP", k = null, F = !1, W, ae = !1, K = /* @__PURE__ */ new Map(), le = null, A = !1, Y = !1, $ = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Map(), de = 0, D = -1, H = /* @__PURE__ */ new Map(), Z = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Map(), J = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), ye, Re = null;
  function Pe() {
    if (w = t.history.listen(
      ({ action: z, location: P, delta: ee }) => {
        if (ye) {
          ye(), ye = void 0;
          return;
        }
        Yt(
          ce.size === 0 || ee != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ge = pe({
          currentLocation: _.location,
          nextLocation: P,
          historyAction: z
        });
        if (ge && ee != null) {
          let xe = new Promise((Ae) => {
            ye = Ae;
          });
          t.history.go(ee * -1), U(ge, {
            state: "blocked",
            location: P,
            proceed() {
              U(ge, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: P
              }), xe.then(() => t.history.go(ee));
            },
            reset() {
              let Ae = new Map(_.blockers);
              Ae.set(ge, Zi), Ie({ blockers: Ae });
            }
          }), k?.resolve(), k = null;
          return;
        }
        return Mt(z, P);
      }
    ), s) {
      KN(a, K);
      let z = () => XN(a, K);
      a.addEventListener("pagehide", z), le = () => a.removeEventListener("pagehide", z);
    }
    return _.initialized || Mt("POP", _.location, {
      initialHydration: !0
    }), re;
  }
  function Ne() {
    w && w(), le && le(), S.clear(), W && W.abort(), _.fetchers.forEach((z, P) => pn(P)), _.blockers.forEach((z, P) => Ce(P));
  }
  function at(z) {
    return S.add(z), () => S.delete(z);
  }
  function Ie(z, P = {}) {
    z.matches && (z.matches = z.matches.map((xe) => {
      let Ae = f[xe.route.id], je = xe.route;
      return je.element !== Ae.element || je.errorElement !== Ae.errorElement || je.hydrateFallbackElement !== Ae.hydrateFallbackElement ? {
        ...xe,
        route: Ae
      } : xe;
    })), _ = {
      ..._,
      ...z
    };
    let ee = [], ge = [];
    _.fetchers.forEach((xe, Ae) => {
      xe.state === "idle" && (J.has(Ae) ? ee.push(Ae) : ge.push(Ae));
    }), J.forEach((xe) => {
      !_.fetchers.has(xe) && !se.has(xe) && ee.push(xe);
    }), [...S].forEach(
      (xe) => xe(_, {
        deletedFetchers: ee,
        newErrors: z.errors ?? null,
        viewTransitionOpts: P.viewTransitionOpts,
        flushSync: P.flushSync === !0
      })
    ), ee.forEach((xe) => pn(xe)), ge.forEach((xe) => _.fetchers.delete(xe));
  }
  function qe(z, P, { flushSync: ee } = {}) {
    let ge = _.actionData != null && _.navigation.formMethod != null && bn(_.navigation.formMethod) && _.navigation.state === "loading" && z.state?._isRedirect !== !0, xe;
    P.actionData ? Object.keys(P.actionData).length > 0 ? xe = P.actionData : xe = null : ge ? xe = _.actionData : xe = null;
    let Ae = P.loaderData ? zy(
      _.loaderData,
      P.loaderData,
      P.matches || [],
      P.errors
    ) : _.loaderData, je = _.blockers;
    je.size > 0 && (je = new Map(je), je.forEach((Ue, Oe) => je.set(Oe, Zi)));
    let Ee = A ? !1 : it(z, P.matches || _.matches), ke = F === !0 || _.navigation.formMethod != null && bn(_.navigation.formMethod) && z.state?._isRedirect !== !0;
    y && (p = y, y = void 0), A || V === "POP" || (V === "PUSH" ? t.history.push(z, z.state) : V === "REPLACE" && t.history.replace(z, z.state));
    let Te;
    if (V === "POP") {
      let Ue = K.get(_.location.pathname);
      Ue && Ue.has(z.pathname) ? Te = {
        currentLocation: _.location,
        nextLocation: z
      } : K.has(z.pathname) && (Te = {
        currentLocation: z,
        nextLocation: _.location
      });
    } else if (ae) {
      let Ue = K.get(_.location.pathname);
      Ue ? Ue.add(z.pathname) : (Ue = /* @__PURE__ */ new Set([z.pathname]), K.set(_.location.pathname, Ue)), Te = {
        currentLocation: _.location,
        nextLocation: z
      };
    }
    Ie(
      {
        ...P,
        // matches, errors, fetchers go through as-is
        actionData: xe,
        loaderData: Ae,
        historyAction: V,
        location: z,
        initialized: !0,
        renderFallback: !1,
        navigation: mf,
        revalidation: "idle",
        restoreScrollPosition: Ee,
        preventScrollReset: ke,
        blockers: je
      },
      {
        viewTransitionOpts: Te,
        flushSync: ee === !0
      }
    ), V = "POP", F = !1, ae = !1, A = !1, Y = !1, k?.resolve(), k = null, Re?.resolve(), Re = null;
  }
  async function Gt(z, P) {
    if (k?.resolve(), k = null, typeof z == "number") {
      k || (k = Uy());
      let Et = k.promise;
      return t.history.go(z), Et;
    }
    let ee = eh(
      _.location,
      _.matches,
      m,
      z,
      P?.fromRouteId,
      P?.relative
    ), { path: ge, submission: xe, error: Ae } = Ey(
      !1,
      ee,
      P
    ), je;
    P?.unstable_mask && (je = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof P.unstable_mask == "string" ? fa(P.unstable_mask) : {
        ..._.location.unstable_mask,
        ...P.unstable_mask
      }
    });
    let Ee = _.location, ke = Wf(
      Ee,
      ge,
      P && P.state,
      void 0,
      je
    );
    ke = {
      ...ke,
      ...t.history.encodeLocation(ke)
    };
    let Te = P && P.replace != null ? P.replace : void 0, Ue = "PUSH";
    Te === !0 ? Ue = "REPLACE" : Te === !1 || xe != null && bn(xe.formMethod) && xe.formAction === _.location.pathname + _.location.search && (Ue = "REPLACE");
    let Oe = P && "preventScrollReset" in P ? P.preventScrollReset === !0 : void 0, ut = (P && P.flushSync) === !0, Qe = pe({
      currentLocation: Ee,
      nextLocation: ke,
      historyAction: Ue
    });
    if (Qe) {
      U(Qe, {
        state: "blocked",
        location: ke,
        proceed() {
          U(Qe, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ke
          }), Gt(z, P);
        },
        reset() {
          let Et = new Map(_.blockers);
          Et.set(Qe, Zi), Ie({ blockers: Et });
        }
      });
      return;
    }
    await Mt(Ue, ke, {
      submission: xe,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ae,
      preventScrollReset: Oe,
      replace: P && P.replace,
      enableViewTransition: P && P.viewTransition,
      flushSync: ut,
      callSiteDefaultShouldRevalidate: P && P.unstable_defaultShouldRevalidate
    });
  }
  function _t() {
    Re || (Re = Uy()), ct(), Ie({ revalidation: "loading" });
    let z = Re.promise;
    return _.navigation.state === "submitting" ? z : _.navigation.state === "idle" ? (Mt(_.historyAction, _.location, {
      startUninterruptedRevalidation: !0
    }), z) : (Mt(
      V || _.historyAction,
      _.navigation.location,
      {
        overrideNavigation: _.navigation,
        // Proxy through any rending view transition
        enableViewTransition: ae === !0
      }
    ), z);
  }
  async function Mt(z, P, ee) {
    W && W.abort(), W = null, V = z, A = (ee && ee.startUninterruptedRevalidation) === !0, We(_.location, _.matches), F = (ee && ee.preventScrollReset) === !0, ae = (ee && ee.enableViewTransition) === !0;
    let ge = y || p, xe = ee && ee.overrideNavigation, Ae = ee?.initialHydration && _.matches && _.matches.length > 0 && !M ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      _.matches
    ) : yr(ge, P, m), je = (ee && ee.flushSync) === !0;
    if (Ae && _.initialized && !Y && UN(_.location, P) && !(ee && ee.submission && bn(ee.submission.formMethod))) {
      qe(P, { matches: Ae }, { flushSync: je });
      return;
    }
    let Ee = Fe(Ae, ge, P.pathname);
    if (Ee.active && Ee.matches && (Ae = Ee.matches), !Ae) {
      let { error: xt, notFoundMatches: Lt, route: et } = ve(
        P.pathname
      );
      qe(
        P,
        {
          matches: Lt,
          loaderData: {},
          errors: {
            [et.id]: xt
          }
        },
        { flushSync: je }
      );
      return;
    }
    W = new AbortController();
    let ke = Is(
      t.history,
      P,
      W.signal,
      ee && ee.submission
    ), Te = t.getContext ? await t.getContext() : new yy(), Ue;
    if (ee && ee.pendingError)
      Ue = [
        br(Ae).route.id,
        { type: "error", error: ee.pendingError }
      ];
    else if (ee && ee.submission && bn(ee.submission.formMethod)) {
      let xt = await mn(
        ke,
        P,
        ee.submission,
        Ae,
        Te,
        Ee.active,
        ee && ee.initialHydration === !0,
        { replace: ee.replace, flushSync: je }
      );
      if (xt.shortCircuited)
        return;
      if (xt.pendingActionResult) {
        let [Lt, et] = xt.pendingActionResult;
        if (Hn(et) && gl(et.error) && et.error.status === 404) {
          W = null, qe(P, {
            matches: xt.matches,
            loaderData: {},
            errors: {
              [Lt]: et.error
            }
          });
          return;
        }
      }
      Ae = xt.matches || Ae, Ue = xt.pendingActionResult, xe = pf(P, ee.submission), je = !1, Ee.active = !1, ke = Is(
        t.history,
        ke.url,
        ke.signal
      );
    }
    let {
      shortCircuited: Oe,
      matches: ut,
      loaderData: Qe,
      errors: Et
    } = await gt(
      ke,
      P,
      Ae,
      Te,
      Ee.active,
      xe,
      ee && ee.submission,
      ee && ee.fetcherSubmission,
      ee && ee.replace,
      ee && ee.initialHydration === !0,
      je,
      Ue,
      ee && ee.callSiteDefaultShouldRevalidate
    );
    Oe || (W = null, qe(P, {
      matches: ut || Ae,
      ...Oy(Ue),
      loaderData: Qe,
      errors: Et
    }));
  }
  async function mn(z, P, ee, ge, xe, Ae, je, Ee = {}) {
    ct();
    let ke = GN(P, ee);
    if (Ie({ navigation: ke }, { flushSync: Ee.flushSync === !0 }), Ae) {
      let Oe = await ht(
        ge,
        P.pathname,
        z.signal
      );
      if (Oe.type === "aborted")
        return { shortCircuited: !0 };
      if (Oe.type === "error") {
        if (Oe.partialMatches.length === 0) {
          let { matches: Qe, route: Et } = Fo(p);
          return {
            matches: Qe,
            pendingActionResult: [
              Et.id,
              {
                type: "error",
                error: Oe.error
              }
            ]
          };
        }
        let ut = br(Oe.partialMatches).route.id;
        return {
          matches: Oe.partialMatches,
          pendingActionResult: [
            ut,
            {
              type: "error",
              error: Oe.error
            }
          ]
        };
      } else if (Oe.matches)
        ge = Oe.matches;
      else {
        let { notFoundMatches: ut, error: Qe, route: Et } = ve(
          P.pathname
        );
        return {
          matches: ut,
          pendingActionResult: [
            Et.id,
            {
              type: "error",
              error: Qe
            }
          ]
        };
      }
    }
    let Te, Ue = mc(ge, P);
    if (!Ue.route.action && !Ue.route.lazy)
      Te = {
        type: "error",
        error: Wn(405, {
          method: z.method,
          pathname: P.pathname,
          routeId: Ue.route.id
        })
      };
    else {
      let Oe = Ks(
        u,
        f,
        z,
        P,
        ge,
        Ue,
        je ? [] : i,
        xe
      ), ut = await Le(
        z,
        P,
        Oe,
        xe,
        null
      );
      if (Te = ut[Ue.route.id], !Te) {
        for (let Qe of ge)
          if (ut[Qe.route.id]) {
            Te = ut[Qe.route.id];
            break;
          }
      }
      if (z.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Gr(Te)) {
      let Oe;
      return Ee && Ee.replace != null ? Oe = Ee.replace : Oe = Ay(
        Te.response.headers.get("Location"),
        new URL(z.url),
        m,
        t.history
      ) === _.location.pathname + _.location.search, await we(z, Te, !0, {
        submission: ee,
        replace: Oe
      }), { shortCircuited: !0 };
    }
    if (Hn(Te)) {
      let Oe = br(ge, Ue.route.id);
      return (Ee && Ee.replace) !== !0 && (V = "PUSH"), {
        matches: ge,
        pendingActionResult: [
          Oe.route.id,
          Te,
          Ue.route.id
        ]
      };
    }
    return {
      matches: ge,
      pendingActionResult: [Ue.route.id, Te]
    };
  }
  async function gt(z, P, ee, ge, xe, Ae, je, Ee, ke, Te, Ue, Oe, ut) {
    let Qe = Ae || pf(P, je), Et = je || Ee || $y(Qe), xt = !A && !Te;
    if (xe) {
      if (xt) {
        let Ht = Pt(Oe);
        Ie(
          {
            navigation: Qe,
            ...Ht !== void 0 ? { actionData: Ht } : {}
          },
          {
            flushSync: Ue
          }
        );
      }
      let Ze = await ht(
        ee,
        P.pathname,
        z.signal
      );
      if (Ze.type === "aborted")
        return { shortCircuited: !0 };
      if (Ze.type === "error") {
        if (Ze.partialMatches.length === 0) {
          let { matches: gn, route: Qt } = Fo(p);
          return {
            matches: gn,
            loaderData: {},
            errors: {
              [Qt.id]: Ze.error
            }
          };
        }
        let Ht = br(Ze.partialMatches).route.id;
        return {
          matches: Ze.partialMatches,
          loaderData: {},
          errors: {
            [Ht]: Ze.error
          }
        };
      } else if (Ze.matches)
        ee = Ze.matches;
      else {
        let { error: Ht, notFoundMatches: gn, route: Qt } = ve(
          P.pathname
        );
        return {
          matches: gn,
          loaderData: {},
          errors: {
            [Qt.id]: Ht
          }
        };
      }
    }
    let Lt = y || p, { dsMatches: et, revalidatingFetchers: Xt } = Ny(
      z,
      ge,
      u,
      f,
      t.history,
      _,
      ee,
      Et,
      P,
      Te ? [] : i,
      Te === !0,
      Y,
      $,
      J,
      G,
      Z,
      Lt,
      m,
      t.patchRoutesOnNavigation != null,
      Oe,
      ut
    );
    if (D = ++de, !t.dataStrategy && !et.some((Ze) => Ze.shouldLoad) && !et.some(
      (Ze) => Ze.route.middleware && Ze.route.middleware.length > 0
    ) && Xt.length === 0) {
      let Ze = En();
      return qe(
        P,
        {
          matches: ee,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Oe && Hn(Oe[1]) ? { [Oe[0]]: Oe[1].error } : null,
          ...Oy(Oe),
          ...Ze ? { fetchers: new Map(_.fetchers) } : {}
        },
        { flushSync: Ue }
      ), { shortCircuited: !0 };
    }
    if (xt) {
      let Ze = {};
      if (!xe) {
        Ze.navigation = Qe;
        let Ht = Pt(Oe);
        Ht !== void 0 && (Ze.actionData = Ht);
      }
      Xt.length > 0 && (Ze.fetchers = jn(Xt)), Ie(Ze, { flushSync: Ue });
    }
    Xt.forEach((Ze) => {
      Tt(Ze.key), Ze.controller && se.set(Ze.key, Ze.controller);
    });
    let Rt = () => Xt.forEach((Ze) => Tt(Ze.key));
    W && W.signal.addEventListener(
      "abort",
      Rt
    );
    let { loaderResults: Fa, fetcherResults: ia } = await Xe(
      et,
      Xt,
      z,
      P,
      ge
    );
    if (z.signal.aborted)
      return { shortCircuited: !0 };
    W && W.signal.removeEventListener(
      "abort",
      Rt
    ), Xt.forEach((Ze) => se.delete(Ze.key));
    let ln = Yo(Fa);
    if (ln)
      return await we(z, ln.result, !0, {
        replace: ke
      }), { shortCircuited: !0 };
    if (ln = Yo(ia), ln)
      return Z.add(ln.key), await we(z, ln.result, !0, {
        replace: ke
      }), { shortCircuited: !0 };
    let { loaderData: ha, errors: Cr } = ky(
      _,
      ee,
      Fa,
      Oe,
      Xt,
      ia
    );
    Te && _.errors && (Cr = { ..._.errors, ...Cr });
    let ma = En(), Tr = fe(D), ts = ma || Tr || Xt.length > 0;
    return {
      matches: ee,
      loaderData: ha,
      errors: Cr,
      ...ts ? { fetchers: new Map(_.fetchers) } : {}
    };
  }
  function Pt(z) {
    if (z && !Hn(z[1]))
      return {
        [z[0]]: z[1].data
      };
    if (_.actionData)
      return Object.keys(_.actionData).length === 0 ? null : _.actionData;
  }
  function jn(z) {
    return z.forEach((P) => {
      let ee = _.fetchers.get(P.key), ge = Ji(
        void 0,
        ee ? ee.data : void 0
      );
      _.fetchers.set(P.key, ge);
    }), new Map(_.fetchers);
  }
  async function ot(z, P, ee, ge) {
    Tt(z);
    let xe = (ge && ge.flushSync) === !0, Ae = y || p, je = eh(
      _.location,
      _.matches,
      m,
      ee,
      P,
      ge?.relative
    ), Ee = yr(Ae, je, m), ke = Fe(Ee, Ae, je);
    if (ke.active && ke.matches && (Ee = ke.matches), !Ee) {
      Ut(
        z,
        P,
        Wn(404, { pathname: je }),
        { flushSync: xe }
      );
      return;
    }
    let { path: Te, submission: Ue, error: Oe } = Ey(
      !0,
      je,
      ge
    );
    if (Oe) {
      Ut(z, P, Oe, { flushSync: xe });
      return;
    }
    let ut = t.getContext ? await t.getContext() : new yy(), Qe = (ge && ge.preventScrollReset) === !0;
    if (Ue && bn(Ue.formMethod)) {
      await sn(
        z,
        P,
        Te,
        Ee,
        ut,
        ke.active,
        xe,
        Qe,
        Ue,
        ge && ge.unstable_defaultShouldRevalidate
      );
      return;
    }
    G.set(z, { routeId: P, path: Te }), await bt(
      z,
      P,
      Te,
      Ee,
      ut,
      ke.active,
      xe,
      Qe,
      Ue
    );
  }
  async function sn(z, P, ee, ge, xe, Ae, je, Ee, ke, Te) {
    ct(), G.delete(z);
    let Ue = _.fetchers.get(z);
    At(z, PN(ke, Ue), {
      flushSync: je
    });
    let Oe = new AbortController(), ut = Is(
      t.history,
      ee,
      Oe.signal,
      ke
    );
    if (Ae) {
      let Dt = await ht(
        ge,
        new URL(ut.url).pathname,
        ut.signal,
        z
      );
      if (Dt.type === "aborted")
        return;
      if (Dt.type === "error") {
        Ut(z, P, Dt.error, { flushSync: je });
        return;
      } else if (Dt.matches)
        ge = Dt.matches;
      else {
        Ut(
          z,
          P,
          Wn(404, { pathname: ee }),
          { flushSync: je }
        );
        return;
      }
    }
    let Qe = mc(ge, ee);
    if (!Qe.route.action && !Qe.route.lazy) {
      let Dt = Wn(405, {
        method: ke.formMethod,
        pathname: ee,
        routeId: P
      });
      Ut(z, P, Dt, { flushSync: je });
      return;
    }
    se.set(z, Oe);
    let Et = de, xt = Ks(
      u,
      f,
      ut,
      ee,
      ge,
      Qe,
      i,
      xe
    ), Lt = await Le(
      ut,
      ee,
      xt,
      xe,
      z
    ), et = Lt[Qe.route.id];
    if (!et) {
      for (let Dt of xt)
        if (Lt[Dt.route.id]) {
          et = Lt[Dt.route.id];
          break;
        }
    }
    if (ut.signal.aborted) {
      se.get(z) === Oe && se.delete(z);
      return;
    }
    if (J.has(z)) {
      if (Gr(et) || Hn(et)) {
        At(z, Ba(void 0));
        return;
      }
    } else {
      if (Gr(et))
        if (se.delete(z), D > Et) {
          At(z, Ba(void 0));
          return;
        } else
          return Z.add(z), At(z, Ji(ke)), we(ut, et, !1, {
            fetcherSubmission: ke,
            preventScrollReset: Ee
          });
      if (Hn(et)) {
        Ut(z, P, et.error);
        return;
      }
    }
    let Xt = _.navigation.location || _.location, Rt = Is(
      t.history,
      Xt,
      Oe.signal
    ), Fa = y || p, ia = _.navigation.state !== "idle" ? yr(Fa, _.navigation.location, m) : _.matches;
    Je(ia, "Didn't find any matches after fetcher action");
    let ln = ++de;
    H.set(z, ln);
    let ha = Ji(ke, et.data);
    _.fetchers.set(z, ha);
    let { dsMatches: Cr, revalidatingFetchers: ma } = Ny(
      Rt,
      xe,
      u,
      f,
      t.history,
      _,
      ia,
      ke,
      Xt,
      i,
      !1,
      Y,
      $,
      J,
      G,
      Z,
      Fa,
      m,
      t.patchRoutesOnNavigation != null,
      [Qe.route.id, et],
      Te
    );
    ma.filter((Dt) => Dt.key !== z).forEach((Dt) => {
      let ns = Dt.key, as = _.fetchers.get(ns), Dl = Ji(
        void 0,
        as ? as.data : void 0
      );
      _.fetchers.set(ns, Dl), Tt(ns), Dt.controller && se.set(ns, Dt.controller);
    }), Ie({ fetchers: new Map(_.fetchers) });
    let Tr = () => ma.forEach((Dt) => Tt(Dt.key));
    Oe.signal.addEventListener(
      "abort",
      Tr
    );
    let { loaderResults: ts, fetcherResults: Ze } = await Xe(
      Cr,
      ma,
      Rt,
      Xt,
      xe
    );
    if (Oe.signal.aborted)
      return;
    if (Oe.signal.removeEventListener(
      "abort",
      Tr
    ), H.delete(z), se.delete(z), ma.forEach((Dt) => se.delete(Dt.key)), _.fetchers.has(z)) {
      let Dt = Ba(et.data);
      _.fetchers.set(z, Dt);
    }
    let Ht = Yo(ts);
    if (Ht)
      return we(
        Rt,
        Ht.result,
        !1,
        { preventScrollReset: Ee }
      );
    if (Ht = Yo(Ze), Ht)
      return Z.add(Ht.key), we(
        Rt,
        Ht.result,
        !1,
        { preventScrollReset: Ee }
      );
    let { loaderData: gn, errors: Qt } = ky(
      _,
      ia,
      ts,
      void 0,
      ma,
      Ze
    );
    fe(ln), _.navigation.state === "loading" && ln > D ? (Je(V, "Expected pending action"), W && W.abort(), qe(_.navigation.location, {
      matches: ia,
      loaderData: gn,
      errors: Qt,
      fetchers: new Map(_.fetchers)
    })) : (Ie({
      errors: Qt,
      loaderData: zy(
        _.loaderData,
        gn,
        ia,
        Qt
      ),
      fetchers: new Map(_.fetchers)
    }), Y = !1);
  }
  async function bt(z, P, ee, ge, xe, Ae, je, Ee, ke) {
    let Te = _.fetchers.get(z);
    At(
      z,
      Ji(
        ke,
        Te ? Te.data : void 0
      ),
      { flushSync: je }
    );
    let Ue = new AbortController(), Oe = Is(
      t.history,
      ee,
      Ue.signal
    );
    if (Ae) {
      let et = await ht(
        ge,
        new URL(Oe.url).pathname,
        Oe.signal,
        z
      );
      if (et.type === "aborted")
        return;
      if (et.type === "error") {
        Ut(z, P, et.error, { flushSync: je });
        return;
      } else if (et.matches)
        ge = et.matches;
      else {
        Ut(
          z,
          P,
          Wn(404, { pathname: ee }),
          { flushSync: je }
        );
        return;
      }
    }
    let ut = mc(ge, ee);
    se.set(z, Ue);
    let Qe = de, Et = Ks(
      u,
      f,
      Oe,
      ee,
      ge,
      ut,
      i,
      xe
    ), xt = await Le(
      Oe,
      ee,
      Et,
      xe,
      z
    ), Lt = xt[ut.route.id];
    if (!Lt) {
      for (let et of ge)
        if (xt[et.route.id]) {
          Lt = xt[et.route.id];
          break;
        }
    }
    if (se.get(z) === Ue && se.delete(z), !Oe.signal.aborted) {
      if (J.has(z)) {
        At(z, Ba(void 0));
        return;
      }
      if (Gr(Lt))
        if (D > Qe) {
          At(z, Ba(void 0));
          return;
        } else {
          Z.add(z), await we(Oe, Lt, !1, {
            preventScrollReset: Ee
          });
          return;
        }
      if (Hn(Lt)) {
        Ut(z, P, Lt.error);
        return;
      }
      At(z, Ba(Lt.data));
    }
  }
  async function we(z, P, ee, {
    submission: ge,
    fetcherSubmission: xe,
    preventScrollReset: Ae,
    replace: je
  } = {}) {
    ee || (k?.resolve(), k = null), P.response.headers.has("X-Remix-Revalidate") && (Y = !0);
    let Ee = P.response.headers.get("Location");
    Je(Ee, "Expected a Location header on the redirect Response"), Ee = Ay(
      Ee,
      new URL(z.url),
      m,
      t.history
    );
    let ke = Wf(_.location, Ee, {
      _isRedirect: !0
    });
    if (s) {
      let Et = !1;
      if (P.response.headers.has("X-Remix-Reload-Document"))
        Et = !0;
      else if (kh(Ee)) {
        const xt = HE(Ee, !0);
        Et = // Hard reload if it's an absolute URL to a new origin
        xt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(xt.pathname, m) == null;
      }
      if (Et) {
        je ? a.location.replace(Ee) : a.location.assign(Ee);
        return;
      }
    }
    W = null;
    let Te = je === !0 || P.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Ue, formAction: Oe, formEncType: ut } = _.navigation;
    !ge && !xe && Ue && Oe && ut && (ge = $y(_.navigation));
    let Qe = ge || xe;
    if (wN.has(P.response.status) && Qe && bn(Qe.formMethod))
      await Mt(Te, ke, {
        submission: {
          ...Qe,
          formAction: Ee
        },
        // Preserve these flags across redirects
        preventScrollReset: Ae || F,
        enableViewTransition: ee ? ae : void 0
      });
    else {
      let Et = pf(
        ke,
        ge
      );
      await Mt(Te, ke, {
        overrideNavigation: Et,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: xe,
        // Preserve these flags across redirects
        preventScrollReset: Ae || F,
        enableViewTransition: ee ? ae : void 0
      });
    }
  }
  async function Le(z, P, ee, ge, xe) {
    let Ae, je = {};
    try {
      Ae = await DN(
        b,
        z,
        P,
        ee,
        xe,
        ge,
        !1
      );
    } catch (Ee) {
      return ee.filter((ke) => ke.shouldLoad).forEach((ke) => {
        je[ke.route.id] = {
          type: "error",
          error: Ee
        };
      }), je;
    }
    if (z.signal.aborted)
      return je;
    if (!bn(z.method))
      for (let Ee of ee) {
        if (Ae[Ee.route.id]?.type === "error")
          break;
        !Ae.hasOwnProperty(Ee.route.id) && !_.loaderData.hasOwnProperty(Ee.route.id) && (!_.errors || !_.errors.hasOwnProperty(Ee.route.id)) && Ee.shouldCallHandler() && (Ae[Ee.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${Ee.route.id}`
          )
        });
      }
    for (let [Ee, ke] of Object.entries(Ae))
      if (HN(ke)) {
        let Te = ke.result;
        je[Ee] = {
          type: "redirect",
          response: LN(
            Te,
            z,
            Ee,
            ee,
            m
          )
        };
      } else
        je[Ee] = await ON(ke);
    return je;
  }
  async function Xe(z, P, ee, ge, xe) {
    let Ae = Le(
      ee,
      ge,
      z,
      xe,
      null
    ), je = Promise.all(
      P.map(async (Te) => {
        if (Te.matches && Te.match && Te.request && Te.controller) {
          let Oe = (await Le(
            Te.request,
            Te.path,
            Te.matches,
            xe,
            Te.key
          ))[Te.match.route.id];
          return { [Te.key]: Oe };
        } else
          return Promise.resolve({
            [Te.key]: {
              type: "error",
              error: Wn(404, {
                pathname: Te.path
              })
            }
          });
      })
    ), Ee = await Ae, ke = (await je).reduce(
      (Te, Ue) => Object.assign(Te, Ue),
      {}
    );
    return {
      loaderResults: Ee,
      fetcherResults: ke
    };
  }
  function ct() {
    Y = !0, G.forEach((z, P) => {
      se.has(P) && $.add(P), Tt(P);
    });
  }
  function At(z, P, ee = {}) {
    _.fetchers.set(z, P), Ie(
      { fetchers: new Map(_.fetchers) },
      { flushSync: (ee && ee.flushSync) === !0 }
    );
  }
  function Ut(z, P, ee, ge = {}) {
    let xe = br(_.matches, P);
    pn(z), Ie(
      {
        errors: {
          [xe.route.id]: ee
        },
        fetchers: new Map(_.fetchers)
      },
      { flushSync: (ge && ge.flushSync) === !0 }
    );
  }
  function sa(z) {
    return B.set(z, (B.get(z) || 0) + 1), J.has(z) && J.delete(z), _.fetchers.get(z) || jN;
  }
  function Sn(z, P) {
    Tt(z, P?.reason), At(z, Ba(null));
  }
  function pn(z) {
    let P = _.fetchers.get(z);
    se.has(z) && !(P && P.state === "loading" && H.has(z)) && Tt(z), G.delete(z), H.delete(z), Z.delete(z), J.delete(z), $.delete(z), _.fetchers.delete(z);
  }
  function Ot(z) {
    let P = (B.get(z) || 0) - 1;
    P <= 0 ? (B.delete(z), J.add(z)) : B.set(z, P), Ie({ fetchers: new Map(_.fetchers) });
  }
  function Tt(z, P) {
    let ee = se.get(z);
    ee && (ee.abort(P), se.delete(z));
  }
  function pt(z) {
    for (let P of z) {
      let ee = sa(P), ge = Ba(ee.data);
      _.fetchers.set(P, ge);
    }
  }
  function En() {
    let z = [], P = !1;
    for (let ee of Z) {
      let ge = _.fetchers.get(ee);
      Je(ge, `Expected fetcher: ${ee}`), ge.state === "loading" && (Z.delete(ee), z.push(ee), P = !0);
    }
    return pt(z), P;
  }
  function fe(z) {
    let P = [];
    for (let [ee, ge] of H)
      if (ge < z) {
        let xe = _.fetchers.get(ee);
        Je(xe, `Expected fetcher: ${ee}`), xe.state === "loading" && (Tt(ee), H.delete(ee), P.push(ee));
      }
    return pt(P), P.length > 0;
  }
  function _e(z, P) {
    let ee = _.blockers.get(z) || Zi;
    return ce.get(z) !== P && ce.set(z, P), ee;
  }
  function Ce(z) {
    _.blockers.delete(z), ce.delete(z);
  }
  function U(z, P) {
    let ee = _.blockers.get(z) || Zi;
    Je(
      ee.state === "unblocked" && P.state === "blocked" || ee.state === "blocked" && P.state === "blocked" || ee.state === "blocked" && P.state === "proceeding" || ee.state === "blocked" && P.state === "unblocked" || ee.state === "proceeding" && P.state === "unblocked",
      `Invalid blocker state transition: ${ee.state} -> ${P.state}`
    );
    let ge = new Map(_.blockers);
    ge.set(z, P), Ie({ blockers: ge });
  }
  function pe({
    currentLocation: z,
    nextLocation: P,
    historyAction: ee
  }) {
    if (ce.size === 0)
      return;
    ce.size > 1 && Yt(!1, "A router only supports one blocker at a time");
    let ge = Array.from(ce.entries()), [xe, Ae] = ge[ge.length - 1], je = _.blockers.get(xe);
    if (!(je && je.state === "proceeding") && Ae({ currentLocation: z, nextLocation: P, historyAction: ee }))
      return xe;
  }
  function ve(z) {
    let P = Wn(404, { pathname: z }), ee = y || p, { matches: ge, route: xe } = Fo(ee);
    return { notFoundMatches: ge, route: xe, error: P };
  }
  function be(z, P, ee) {
    if (j = z, R = P, N = ee || null, !C && _.navigation === mf) {
      C = !0;
      let ge = it(_.location, _.matches);
      ge != null && Ie({ restoreScrollPosition: ge });
    }
    return () => {
      j = null, R = null, N = null;
    };
  }
  function Ve(z, P) {
    return N && N(
      z,
      P.map((ge) => KE(ge, _.loaderData))
    ) || z.key;
  }
  function We(z, P) {
    if (j && R) {
      let ee = Ve(z, P);
      j[ee] = R();
    }
  }
  function it(z, P) {
    if (j) {
      let ee = Ve(z, P), ge = j[ee];
      if (typeof ge == "number")
        return ge;
    }
    return null;
  }
  function Fe(z, P, ee) {
    if (t.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
          return { active: !0, matches: cl(
            P,
            ee,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: cl(
          P,
          ee,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function ht(z, P, ee, ge) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: z };
    let xe = z;
    for (; ; ) {
      let Ae = y == null, je = y || p, Ee = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: ee,
          path: P,
          matches: xe,
          fetcherKey: ge,
          patch: (Ue, Oe) => {
            ee.aborted || Cy(
              Ue,
              Oe,
              je,
              Ee,
              u,
              !1
            );
          }
        });
      } catch (Ue) {
        return { type: "error", error: Ue, partialMatches: xe };
      } finally {
        Ae && !ee.aborted && (p = [...p]);
      }
      if (ee.aborted)
        return { type: "aborted" };
      let ke = yr(je, P, m), Te = null;
      if (ke) {
        if (Object.keys(ke[0].params).length === 0)
          return { type: "success", matches: ke };
        if (Te = cl(
          je,
          P,
          m,
          !0
        ), !(Te && xe.length < Te.length && an(
          xe,
          Te.slice(0, xe.length)
        )))
          return { type: "success", matches: ke };
      }
      if (Te || (Te = cl(
        je,
        P,
        m,
        !0
      )), !Te || an(xe, Te))
        return { type: "success", matches: null };
      xe = Te;
    }
  }
  function an(z, P) {
    return z.length === P.length && z.every((ee, ge) => ee.route.id === P[ge].route.id);
  }
  function zn(z) {
    f = {}, y = pl(
      z,
      u,
      void 0,
      f
    );
  }
  function Kt(z, P, ee = !1) {
    let ge = y == null;
    Cy(
      z,
      P,
      y || p,
      f,
      u,
      ee
    ), ge && (p = [...p], Ie({}));
  }
  return re = {
    get basename() {
      return m;
    },
    get future() {
      return v;
    },
    get state() {
      return _;
    },
    get routes() {
      return p;
    },
    get window() {
      return a;
    },
    initialize: Pe,
    subscribe: at,
    enableScrollRestoration: be,
    navigate: Gt,
    fetch: ot,
    revalidate: _t,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (z) => t.history.createHref(z),
    encodeLocation: (z) => t.history.encodeLocation(z),
    getFetcher: sa,
    resetFetcher: Sn,
    deleteFetcher: Ot,
    dispose: Ne,
    getBlocker: _e,
    deleteBlocker: Ce,
    patchRoutes: Kt,
    _internalFetchControllers: se,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: zn,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
      Ie(z);
    }
  }, t.unstable_instrumentations && (re = mN(
    re,
    t.unstable_instrumentations.map((z) => z.router).filter(Boolean)
  )), re;
}
function CN(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function eh(t, a, s, i, o, u) {
  let f, p;
  if (o) {
    f = [];
    for (let m of a)
      if (f.push(m), m.route.id === o) {
        p = m;
        break;
      }
  } else
    f = a, p = a[a.length - 1];
  let y = Bc(
    i || ".",
    zh(f),
    aa(t.pathname, s) || t.pathname,
    u === "path"
  );
  if (i == null && (y.search = t.search, y.hash = t.hash), (i == null || i === "" || i === ".") && p) {
    let m = Uh(y.search);
    if (p.route.index && !m)
      y.search = y.search ? y.search.replace(/^\?/, "?index&") : "?index";
    else if (!p.route.index && m) {
      let b = new URLSearchParams(y.search), v = b.getAll("index");
      b.delete("index"), v.filter((S) => S).forEach((S) => b.append("index", S));
      let w = b.toString();
      y.search = w ? `?${w}` : "";
    }
  }
  return s !== "/" && (y.pathname = lN({ basename: s, pathname: y.pathname })), xa(y);
}
function Ey(t, a, s) {
  if (!s || !CN(s))
    return { path: a };
  if (s.formMethod && !YN(s.formMethod))
    return {
      path: a,
      error: Wn(405, { method: s.formMethod })
    };
  let i = () => ({
    path: a,
    error: Wn(400, { type: "invalid-body" })
  }), u = (s.formMethod || "get").toUpperCase(), f = e1(a);
  if (s.body !== void 0) {
    if (s.formEncType === "text/plain") {
      if (!bn(u))
        return i();
      let v = typeof s.body == "string" ? s.body : s.body instanceof FormData || s.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(s.body.entries()).reduce(
          (w, [S, j]) => `${w}${S}=${j}
`,
          ""
        )
      ) : String(s.body);
      return {
        path: a,
        submission: {
          formMethod: u,
          formAction: f,
          formEncType: s.formEncType,
          formData: void 0,
          json: void 0,
          text: v
        }
      };
    } else if (s.formEncType === "application/json") {
      if (!bn(u))
        return i();
      try {
        let v = typeof s.body == "string" ? JSON.parse(s.body) : s.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: f,
            formEncType: s.formEncType,
            formData: void 0,
            json: v,
            text: void 0
          }
        };
      } catch {
        return i();
      }
    }
  }
  Je(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let p, y;
  if (s.formData)
    p = nh(s.formData), y = s.formData;
  else if (s.body instanceof FormData)
    p = nh(s.body), y = s.body;
  else if (s.body instanceof URLSearchParams)
    p = s.body, y = Dy(p);
  else if (s.body == null)
    p = new URLSearchParams(), y = new FormData();
  else
    try {
      p = new URLSearchParams(s.body), y = Dy(p);
    } catch {
      return i();
    }
  let m = {
    formMethod: u,
    formAction: f,
    formEncType: s && s.formEncType || "application/x-www-form-urlencoded",
    formData: y,
    json: void 0,
    text: void 0
  };
  if (bn(m.formMethod))
    return { path: a, submission: m };
  let b = fa(a);
  return t && b.search && Uh(b.search) && p.append("index", ""), b.search = `?${p}`, { path: xa(b), submission: m };
}
function Ny(t, a, s, i, o, u, f, p, y, m, b, v, w, S, j, N, R, C, O, M, T) {
  let q = M ? Hn(M[1]) ? M[1].error : M[1].data : void 0, Q = o.createURL(u.location), re = o.createURL(y), _;
  if (b && u.errors) {
    let le = Object.keys(u.errors)[0];
    _ = f.findIndex((A) => A.route.id === le);
  } else if (M && Hn(M[1])) {
    let le = M[0];
    _ = f.findIndex((A) => A.route.id === le) - 1;
  }
  let V = M ? M[1].statusCode : void 0, k = V && V >= 400, F = {
    currentUrl: Q,
    currentParams: u.matches[0]?.params || {},
    nextUrl: re,
    nextParams: f[0].params,
    ...p,
    actionResult: q,
    actionStatus: V
  }, W = jl(f), ae = f.map((le, A) => {
    let { route: Y } = le, $ = null;
    if (_ != null && A > _)
      $ = !1;
    else if (Y.lazy)
      $ = !0;
    else if (!Lh(Y))
      $ = !1;
    else if (b) {
      let { shouldLoad: H } = Px(
        Y,
        u.loaderData,
        u.errors
      );
      $ = H;
    } else TN(u.loaderData, u.matches[A], le) && ($ = !0);
    if ($ !== null)
      return th(
        s,
        i,
        t,
        y,
        W,
        le,
        m,
        a,
        $
      );
    let se = !1;
    typeof T == "boolean" ? se = T : k ? se = !1 : (v || Q.pathname + Q.search === re.pathname + re.search || Q.search !== re.search || RN(u.matches[A], le)) && (se = !0);
    let de = {
      ...F,
      defaultShouldRevalidate: se
    }, D = fl(le, de);
    return th(
      s,
      i,
      t,
      y,
      W,
      le,
      m,
      a,
      D,
      de,
      T
    );
  }), K = [];
  return j.forEach((le, A) => {
    if (b || !f.some((G) => G.route.id === le.routeId) || S.has(A))
      return;
    let Y = u.fetchers.get(A), $ = Y && Y.state !== "idle" && Y.data === void 0, se = yr(R, le.path, C);
    if (!se) {
      if (O && $)
        return;
      K.push({
        key: A,
        routeId: le.routeId,
        path: le.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(A))
      return;
    let de = mc(se, le.path), D = new AbortController(), H = Is(
      o,
      le.path,
      D.signal
    ), Z = null;
    if (w.has(A))
      w.delete(A), Z = Ks(
        s,
        i,
        H,
        le.path,
        se,
        de,
        m,
        a
      );
    else if ($)
      v && (Z = Ks(
        s,
        i,
        H,
        le.path,
        se,
        de,
        m,
        a
      ));
    else {
      let G;
      typeof T == "boolean" ? G = T : k ? G = !1 : G = v;
      let B = {
        ...F,
        defaultShouldRevalidate: G
      };
      fl(de, B) && (Z = Ks(
        s,
        i,
        H,
        le.path,
        se,
        de,
        m,
        a,
        B
      ));
    }
    Z && K.push({
      key: A,
      routeId: le.routeId,
      path: le.path,
      matches: Z,
      match: de,
      request: H,
      controller: D
    });
  }), { dsMatches: ae, revalidatingFetchers: K };
}
function Lh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Px(t, a, s) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Lh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let i = a != null && t.id in a, o = s != null && s[t.id] !== void 0;
  if (!i && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !i };
  let u = !i && !o;
  return { shouldLoad: u, renderFallback: u };
}
function TN(t, a, s) {
  let i = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    s.route.id !== a.route.id
  ), o = !t.hasOwnProperty(s.route.id);
  return i || o;
}
function RN(t, a) {
  let s = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    s != null && s.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function fl(t, a) {
  if (t.route.shouldRevalidate) {
    let s = t.route.shouldRevalidate(a);
    if (typeof s == "boolean")
      return s;
  }
  return a.defaultShouldRevalidate;
}
function Cy(t, a, s, i, o, u) {
  let f;
  if (t) {
    let m = i[t];
    Je(
      m,
      `No route found to patch children into: routeId = ${t}`
    ), m.children || (m.children = []), f = m.children;
  } else
    f = s;
  let p = [], y = [];
  if (a.forEach((m) => {
    let b = f.find(
      (v) => Kx(m, v)
    );
    b ? y.push({ existingRoute: b, newRoute: m }) : p.push(m);
  }), p.length > 0) {
    let m = pl(
      p,
      o,
      [t || "_", "patch", String(f?.length || "0")],
      i
    );
    f.push(...m);
  }
  if (u && y.length > 0)
    for (let m = 0; m < y.length; m++) {
      let { existingRoute: b, newRoute: v } = y[m], w = b, [S] = pl(
        [v],
        o,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(w, {
        element: S.element ? S.element : w.element,
        errorElement: S.errorElement ? S.errorElement : w.errorElement,
        hydrateFallbackElement: S.hydrateFallbackElement ? S.hydrateFallbackElement : w.hydrateFallbackElement
      });
    }
}
function Kx(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (s, i) => a.children?.some((o) => Kx(s, o))
  ) ?? !1 : !1;
}
var Ty = /* @__PURE__ */ new WeakMap(), Xx = ({
  key: t,
  route: a,
  manifest: s,
  mapRouteProperties: i
}) => {
  let o = s[a.id];
  if (Je(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let u = o.lazy[t];
  if (!u)
    return;
  let f = Ty.get(o);
  f || (f = {}, Ty.set(o, f));
  let p = f[t];
  if (p)
    return p;
  let y = (async () => {
    let m = FE(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (m)
      Yt(
        !m,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), f[t] = Promise.resolve();
    else if (v)
      Yt(
        !1,
        `Route "${o.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let w = await u();
      w != null && (Object.assign(o, { [t]: w }), Object.assign(o, i(o)));
    }
    typeof o.lazy == "object" && (o.lazy[t] = void 0, Object.values(o.lazy).every((w) => w === void 0) && (o.lazy = void 0));
  })();
  return f[t] = y, y;
}, Ry = /* @__PURE__ */ new WeakMap();
function _N(t, a, s, i, o) {
  let u = s[t.id];
  if (Je(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = Ry.get(u);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let v = (async () => {
      Je(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let w = await t.lazy(), S = {};
      for (let j in w) {
        let N = w[j];
        if (N === void 0)
          continue;
        let R = GE(j), O = u[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        R ? Yt(
          !R,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : O ? Yt(
          !O,
          `Route "${u.id}" has a static property "${j}" defined but its lazy function is also returning a value for this property. The lazy route property "${j}" will be ignored.`
        ) : S[j] = N;
      }
      Object.assign(u, S), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...i(u),
        lazy: void 0
      });
    })();
    return Ry.set(u, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let f = Object.keys(t.lazy), p = [], y;
  for (let b of f) {
    if (o && o.includes(b))
      continue;
    let v = Xx({
      key: b,
      route: t,
      manifest: s,
      mapRouteProperties: i
    });
    v && (p.push(v), b === a && (y = v));
  }
  let m = p.length > 0 ? Promise.all(p).then(() => {
  }) : void 0;
  return m?.catch(() => {
  }), y?.catch(() => {
  }), {
    lazyRoutePromise: m,
    lazyHandlerPromise: y
  };
}
async function _y(t) {
  let a = t.matches.filter((o) => o.shouldLoad), s = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    s[a[u].route.id] = o;
  }), s;
}
async function MN(t) {
  return t.matches.some((a) => a.route.middleware) ? Qx(t, () => _y(t)) : _y(t);
}
function Qx(t, a) {
  return AN(
    t,
    a,
    (i) => {
      if (FN(i))
        throw i;
      return i;
    },
    VN,
    s
  );
  function s(i, o, u) {
    if (u)
      return Promise.resolve(
        Object.assign(u.value, {
          [o]: { type: "error", result: i }
        })
      );
    {
      let { matches: f } = t, p = Math.min(
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
      ), y = br(
        f,
        f[p].route.id
      ).route.id;
      return Promise.resolve({
        [y]: { type: "error", result: i }
      });
    }
  }
}
async function AN(t, a, s, i, o) {
  let { matches: u, ...f } = t, p = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((b) => [m.route.id, b]) : []
  );
  return await Zx(
    f,
    p,
    a,
    s,
    i,
    o
  );
}
async function Zx(t, a, s, i, o, u, f = 0) {
  let { request: p } = t;
  if (p.signal.aborted)
    throw p.signal.reason ?? new Error(`Request aborted: ${p.method} ${p.url}`);
  let y = a[f];
  if (!y)
    return await s();
  let [m, b] = y, v, w = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await Zx(
        t,
        a,
        s,
        i,
        o,
        u,
        f + 1
      ) }, v.value;
    } catch (S) {
      return v = { value: await u(S, m, v) }, v.value;
    }
  };
  try {
    let S = await b(t, w), j = S != null ? i(S) : void 0;
    return o(j) ? j : v ? j ?? v.value : (v = { value: await w() }, v.value);
  } catch (S) {
    return await u(S, m, v);
  }
}
function Jx(t, a, s, i, o) {
  let u = Xx({
    key: "middleware",
    route: i.route,
    manifest: a,
    mapRouteProperties: t
  }), f = _N(
    i.route,
    bn(s.method) ? "action" : "loader",
    a,
    t,
    o
  );
  return {
    middleware: u,
    route: f.lazyRoutePromise,
    handler: f.lazyHandlerPromise
  };
}
function th(t, a, s, i, o, u, f, p, y, m = null, b) {
  let v = !1, w = Jx(
    t,
    a,
    s,
    u,
    f
  );
  return {
    ...u,
    _lazyPromises: w,
    shouldLoad: y,
    shouldRevalidateArgs: m,
    shouldCallHandler(S) {
      return v = !0, m ? typeof b == "boolean" ? fl(u, {
        ...m,
        defaultShouldRevalidate: b
      }) : typeof S == "boolean" ? fl(u, {
        ...m,
        defaultShouldRevalidate: S
      }) : fl(u, m) : y;
    },
    resolve(S) {
      let { lazy: j, loader: N, middleware: R } = u.route, C = v || y || S && !bn(s.method) && (j || N), O = R && R.length > 0 && !N && !j;
      return C && (bn(s.method) || !O) ? kN({
        request: s,
        path: i,
        unstable_pattern: o,
        match: u,
        lazyHandlerPromise: w?.handler,
        lazyRoutePromise: w?.route,
        handlerOverride: S,
        scopedContext: p
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Ks(t, a, s, i, o, u, f, p, y = null) {
  return o.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: y,
    shouldCallHandler: () => !1,
    _lazyPromises: Jx(
      t,
      a,
      s,
      m,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : th(
    t,
    a,
    s,
    i,
    jl(o),
    m,
    f,
    p,
    !0,
    y
  ));
}
async function DN(t, a, s, i, o, u, f) {
  i.some((b) => b._lazyPromises?.middleware) && await Promise.all(i.map((b) => b._lazyPromises?.middleware));
  let p = {
    request: a,
    unstable_url: Wx(a, s),
    unstable_pattern: jl(i),
    params: i[0].params,
    context: u,
    matches: i
  }, m = await t({
    ...p,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = p;
      return Qx(v, () => b({
        ...v,
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
      i.flatMap((b) => [
        b._lazyPromises?.handler,
        b._lazyPromises?.route
      ])
    );
  } catch {
  }
  return m;
}
async function kN({
  request: t,
  path: a,
  unstable_pattern: s,
  match: i,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: f,
  scopedContext: p
}) {
  let y, m, b = bn(t.method), v = b ? "action" : "loader", w = (S) => {
    let j, N = new Promise((O, M) => j = M);
    m = () => j(), t.signal.addEventListener("abort", m);
    let R = (O) => typeof S != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${i.route.id}]`
      )
    ) : S(
      {
        request: t,
        unstable_url: Wx(t, a),
        unstable_pattern: s,
        params: i.params,
        context: p
      },
      ...O !== void 0 ? [O] : []
    ), C = (async () => {
      try {
        return { type: "data", result: await (f ? f((M) => R(M)) : R()) };
      } catch (O) {
        return { type: "error", result: O };
      }
    })();
    return Promise.race([C, N]);
  };
  try {
    let S = b ? i.route.action : i.route.loader;
    if (o || u)
      if (S) {
        let j, [N] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          w(S).catch((R) => {
            j = R;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          u
        ]);
        if (j !== void 0)
          throw j;
        y = N;
      } else {
        await o;
        let j = b ? i.route.action : i.route.loader;
        if (j)
          [y] = await Promise.all([w(j), u]);
        else if (v === "action") {
          let N = new URL(t.url), R = N.pathname + N.search;
          throw Wn(405, {
            method: t.method,
            pathname: R,
            routeId: i.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (S)
      y = await w(S);
    else {
      let j = new URL(t.url), N = j.pathname + j.search;
      throw Wn(404, {
        pathname: N
      });
    }
  } catch (S) {
    return { type: "error", result: S };
  } finally {
    m && t.signal.removeEventListener("abort", m);
  }
  return y;
}
async function zN(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function ON(t) {
  let { result: a, type: s } = t;
  if ($h(a)) {
    let i;
    try {
      i = await zN(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return s === "error" ? {
      type: "error",
      error: new Vc(a.status, a.statusText, i),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: i,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return s === "error" ? Ly(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: BN(a),
    statusCode: gl(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: gl(a) ? a.status : void 0
  } : Ly(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function LN(t, a, s, i, o) {
  let u = t.headers.get("Location");
  if (Je(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !kh(u)) {
    let f = i.slice(
      0,
      i.findIndex((p) => p.route.id === s) + 1
    );
    u = eh(
      new URL(a.url),
      f,
      o,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var My = [
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
function Ay(t, a, s, i) {
  if (kh(t)) {
    let o = t, u = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (My.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let f = aa(u.pathname, s) != null;
    if (u.origin === a.origin && f)
      return Oh(u.pathname) + u.search + u.hash;
  }
  try {
    let o = i.createURL(t);
    if (My.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Is(t, a, s, i) {
  let o = t.createURL(e1(a)).toString(), u = { signal: s };
  if (i && bn(i.formMethod)) {
    let { formMethod: f, formEncType: p } = i;
    u.method = f.toUpperCase(), p === "application/json" ? (u.headers = new Headers({ "Content-Type": p }), u.body = JSON.stringify(i.json)) : p === "text/plain" ? u.body = i.text : p === "application/x-www-form-urlencoded" && i.formData ? u.body = nh(i.formData) : u.body = i.formData;
  }
  return new Request(o, u);
}
function Wx(t, a) {
  let s = new URL(t.url), i = typeof a == "string" ? fa(a) : a;
  if (s.pathname = i.pathname || "/", i.search) {
    let o = new URLSearchParams(i.search), u = o.getAll("index");
    o.delete("index");
    for (let f of u.filter(Boolean))
      o.append("index", f);
    s.search = o.size ? `?${o.toString()}` : "";
  } else
    s.search = "";
  return s.hash = i.hash || "", s;
}
function nh(t) {
  let a = new URLSearchParams();
  for (let [s, i] of t.entries())
    a.append(s, typeof i == "string" ? i : i.name);
  return a;
}
function Dy(t) {
  let a = new FormData();
  for (let [s, i] of t.entries())
    a.append(s, i);
  return a;
}
function $N(t, a, s, i = !1, o = !1) {
  let u = {}, f = null, p, y = !1, m = {}, b = s && Hn(s[1]) ? s[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let w = v.route.id, S = a[w];
    if (Je(
      !Gr(S),
      "Cannot handle redirect results in processLoaderData"
    ), Hn(S)) {
      let j = S.error;
      if (b !== void 0 && (j = b, b = void 0), f = f || {}, o)
        f[w] = j;
      else {
        let N = br(t, w);
        f[N.route.id] == null && (f[N.route.id] = j);
      }
      i || (u[w] = Gx), y || (y = !0, p = gl(S.error) ? S.error.status : 500), S.headers && (m[w] = S.headers);
    } else
      u[w] = S.data, S.statusCode && S.statusCode !== 200 && !y && (p = S.statusCode), S.headers && (m[w] = S.headers);
  }), b !== void 0 && s && (f = { [s[0]]: b }, s[2] && (u[s[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: p || 200,
    loaderHeaders: m
  };
}
function ky(t, a, s, i, o, u) {
  let { loaderData: f, errors: p } = $N(
    a,
    s,
    i
  );
  return o.filter((y) => !y.matches || y.matches.some((m) => m.shouldLoad)).forEach((y) => {
    let { key: m, match: b, controller: v } = y;
    if (v && v.signal.aborted)
      return;
    let w = u[m];
    if (Je(w, "Did not find corresponding fetcher result"), Hn(w)) {
      let S = br(t.matches, b?.route.id);
      p && p[S.route.id] || (p = {
        ...p,
        [S.route.id]: w.error
      }), t.fetchers.delete(m);
    } else if (Gr(w))
      Je(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Ba(w.data);
      t.fetchers.set(m, S);
    }
  }), { loaderData: f, errors: p };
}
function zy(t, a, s, i) {
  let o = Object.entries(a).filter(([, u]) => u !== Gx).reduce((u, [f, p]) => (u[f] = p, u), {});
  for (let u of s) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (o[f] = t[f]), i && i.hasOwnProperty(f))
      break;
  }
  return o;
}
function Oy(t) {
  return t ? Hn(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function br(t, a) {
  return (a ? t.slice(0, t.findIndex((i) => i.route.id === a) + 1) : [...t]).reverse().find((i) => i.route.hasErrorBoundary === !0) || t[0];
}
function Fo(t) {
  let a = t.length === 1 ? t[0] : t.find((s) => s.index || !s.path || s.path === "/") || {
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
function Wn(t, {
  pathname: a,
  routeId: s,
  method: i,
  type: o,
  message: u
} = {}) {
  let f = "Unknown Server Error", p = "Unknown @remix-run/router error";
  return t === 400 ? (f = "Bad Request", i && a && s ? p = `You made a ${i} request to "${a}" but did not provide a \`loader\` for route "${s}", so there is no way to handle the request.` : o === "invalid-body" && (p = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", p = `Route "${s}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", p = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", i && a && s ? p = `You made a ${i.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${s}", so there is no way to handle the request.` : i && (p = `Invalid request method "${i.toUpperCase()}"`)), new Vc(
    t || 500,
    f,
    new Error(p),
    !0
  );
}
function Yo(t) {
  let a = Object.entries(t);
  for (let s = a.length - 1; s >= 0; s--) {
    let [i, o] = a[s];
    if (Gr(o))
      return { key: i, result: o };
  }
}
function e1(t) {
  let a = typeof t == "string" ? fa(t) : t;
  return xa({ ...a, hash: "" });
}
function UN(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function BN(t) {
  return new Vc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function VN(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, s]) => typeof a == "string" && IN(s)
  );
}
function IN(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function HN(t) {
  return $h(t.result) && Fx.has(t.result.status);
}
function Hn(t) {
  return t.type === "error";
}
function Gr(t) {
  return (t && t.type) === "redirect";
}
function Ly(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function $h(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function qN(t) {
  return Fx.has(t);
}
function FN(t) {
  return $h(t) && qN(t.status) && t.headers.has("Location");
}
function YN(t) {
  return SN.has(t.toUpperCase());
}
function bn(t) {
  return bN.has(t.toUpperCase());
}
function Uh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function mc(t, a) {
  let s = typeof a == "string" ? fa(a).search : a.search;
  if (t[t.length - 1].route.index && Uh(s || ""))
    return t[t.length - 1];
  let i = Bx(t);
  return i[i.length - 1];
}
function $y(t) {
  let { formMethod: a, formAction: s, formEncType: i, text: o, formData: u, json: f } = t;
  if (!(!a || !s || !i)) {
    if (o != null)
      return {
        formMethod: a,
        formAction: s,
        formEncType: i,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: s,
        formEncType: i,
        formData: u,
        json: void 0,
        text: void 0
      };
    if (f !== void 0)
      return {
        formMethod: a,
        formAction: s,
        formEncType: i,
        formData: void 0,
        json: f,
        text: void 0
      };
  }
}
function pf(t, a) {
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
function GN(t, a) {
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
function Ji(t, a) {
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
function PN(t, a) {
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
function Ba(t) {
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
function KN(t, a) {
  try {
    let s = t.sessionStorage.getItem(
      Yx
    );
    if (s) {
      let i = JSON.parse(s);
      for (let [o, u] of Object.entries(i || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function XN(t, a) {
  if (a.size > 0) {
    let s = {};
    for (let [i, o] of a)
      s[i] = [...o];
    try {
      t.sessionStorage.setItem(
        Yx,
        JSON.stringify(s)
      );
    } catch (i) {
      Yt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${i}).`
      );
    }
  }
}
function Uy() {
  let t, a, s = new Promise((i, o) => {
    t = async (u) => {
      i(u);
      try {
        await s;
      } catch {
      }
    }, a = async (u) => {
      o(u);
      try {
        await s;
      } catch {
      }
    };
  });
  return {
    promise: s,
    //@ts-ignore
    resolve: t,
    //@ts-ignore
    reject: a
  };
}
var es = g.createContext(null);
es.displayName = "DataRouter";
var El = g.createContext(null);
El.displayName = "DataRouterState";
var t1 = g.createContext(!1);
function n1() {
  return g.useContext(t1);
}
var Bh = g.createContext({
  isTransitioning: !1
});
Bh.displayName = "ViewTransition";
var a1 = g.createContext(
  /* @__PURE__ */ new Map()
);
a1.displayName = "Fetchers";
var QN = g.createContext(null);
QN.displayName = "Await";
var ra = g.createContext(
  null
);
ra.displayName = "Navigation";
var Ic = g.createContext(
  null
);
Ic.displayName = "Location";
var Ha = g.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ha.displayName = "Route";
var Vh = g.createContext(null);
Vh.displayName = "RouteError";
var r1 = "REACT_ROUTER_ERROR", ZN = "REDIRECT", JN = "ROUTE_ERROR_RESPONSE";
function WN(t) {
  if (t.startsWith(`${r1}:${ZN}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function eC(t) {
  if (t.startsWith(
    `${r1}:${JN}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Vc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function tC(t, { relative: a } = {}) {
  Je(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: s, navigator: i } = g.useContext(ra), { hash: o, pathname: u, search: f } = Cl(t, { relative: a }), p = u;
  return s !== "/" && (p = u === "/" ? s : ea([s, u])), i.createHref({ pathname: p, search: f, hash: o });
}
function Nl() {
  return g.useContext(Ic) != null;
}
function qa() {
  return Je(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), g.useContext(Ic).location;
}
var s1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function i1(t) {
  g.useContext(ra).static || g.useLayoutEffect(t);
}
function ti() {
  let { isDataRoute: t } = g.useContext(Ha);
  return t ? hC() : nC();
}
function nC() {
  Je(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = g.useContext(es), { basename: a, navigator: s } = g.useContext(ra), { matches: i } = g.useContext(Ha), { pathname: o } = qa(), u = JSON.stringify(zh(i)), f = g.useRef(!1);
  return i1(() => {
    f.current = !0;
  }), g.useCallback(
    (y, m = {}) => {
      if (Yt(f.current, s1), !f.current) return;
      if (typeof y == "number") {
        s.go(y);
        return;
      }
      let b = Bc(
        y,
        JSON.parse(u),
        o,
        m.relative === "path"
      );
      t == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : ea([a, b.pathname])), (m.replace ? s.replace : s.push)(
        b,
        m.state,
        m
      );
    },
    [
      a,
      s,
      u,
      o,
      t
    ]
  );
}
g.createContext(null);
function Cl(t, { relative: a } = {}) {
  let { matches: s } = g.useContext(Ha), { pathname: i } = qa(), o = JSON.stringify(zh(s));
  return g.useMemo(
    () => Bc(
      t,
      JSON.parse(o),
      i,
      a === "path"
    ),
    [t, o, i, a]
  );
}
function aC(t, a, s) {
  Je(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: i } = g.useContext(ra), { matches: o } = g.useContext(Ha), u = o[o.length - 1], f = u ? u.params : {}, p = u ? u.pathname : "/", y = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let R = m && m.path || "";
    c1(
      p,
      !m || R.endsWith("*") || R.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R === "/" ? "*" : `${R}/*`}">.`
    );
  }
  let b = qa(), v;
  v = b;
  let w = v.pathname || "/", S = w;
  if (y !== "/") {
    let R = y.replace(/^\//, "").split("/");
    S = "/" + w.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let j = yr(t, { pathname: S });
  return Yt(
    m || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Yt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), oC(
    j && j.map(
      (R) => Object.assign({}, R, {
        params: Object.assign({}, f, R.params),
        pathname: ea([
          y,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          i.encodeLocation ? i.encodeLocation(
            R.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathname
        ]),
        pathnameBase: R.pathnameBase === "/" ? y : ea([
          y,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          i.encodeLocation ? i.encodeLocation(
            R.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathnameBase
        ])
      })
    ),
    o,
    s
  );
}
function rC() {
  let t = fC(), a = gl(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), s = t instanceof Error ? t.stack : null, i = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: i }, u = { padding: "2px 4px", backgroundColor: i }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ g.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ g.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ g.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ g.createElement("h3", { style: { fontStyle: "italic" } }, a), s ? /* @__PURE__ */ g.createElement("pre", { style: o }, s) : null, f);
}
var sC = /* @__PURE__ */ g.createElement(rC, null), l1 = class extends g.Component {
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
      const s = eC(t.digest);
      s && (t = s);
    }
    let a = t !== void 0 ? /* @__PURE__ */ g.createElement(Ha.Provider, { value: this.props.routeContext }, /* @__PURE__ */ g.createElement(
      Vh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ g.createElement(iC, { error: t }, a) : a;
  }
};
l1.contextType = t1;
var gf = /* @__PURE__ */ new WeakMap();
function iC({
  children: t,
  error: a
}) {
  let { basename: s } = g.useContext(ra);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let i = WN(a.digest);
    if (i) {
      let o = gf.get(a);
      if (o) throw o;
      let u = Ix(i.location, s);
      if (Vx && !gf.get(a))
        if (u.isExternal || i.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const f = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: i.replace
            })
          );
          throw gf.set(a, f), f;
        }
      return /* @__PURE__ */ g.createElement(
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
function lC({ routeContext: t, match: a, children: s }) {
  let i = g.useContext(es);
  return i && i.static && i.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ g.createElement(Ha.Provider, { value: t }, s);
}
function oC(t, a = [], s) {
  let i = s?.state;
  if (t == null) {
    if (!i)
      return null;
    if (i.errors)
      t = i.matches;
    else if (a.length === 0 && !i.initialized && i.matches.length > 0)
      t = i.matches;
    else
      return null;
  }
  let o = t, u = i?.errors;
  if (u != null) {
    let b = o.findIndex(
      (v) => v.route.id && u?.[v.route.id] !== void 0
    );
    Je(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, b + 1)
    );
  }
  let f = !1, p = -1;
  if (s && i) {
    f = i.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let v = o[b];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (p = b), v.route.id) {
        let { loaderData: w, errors: S } = i, j = v.route.loader && !w.hasOwnProperty(v.route.id) && (!S || S[v.route.id] === void 0);
        if (v.route.lazy || j) {
          s.isStatic && (f = !0), p >= 0 ? o = o.slice(0, p + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let y = s?.onError, m = i && y ? (b, v) => {
    y(b, {
      location: i.location,
      params: i.matches?.[0]?.params ?? {},
      unstable_pattern: jl(i.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (b, v, w) => {
      let S, j = !1, N = null, R = null;
      i && (S = u && v.route.id ? u[v.route.id] : void 0, N = v.route.errorElement || sC, f && (p < 0 && w === 0 ? (c1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, R = null) : p === w && (j = !0, R = v.route.hydrateFallbackElement || null)));
      let C = a.concat(o.slice(0, w + 1)), O = () => {
        let M;
        return S ? M = N : j ? M = R : v.route.Component ? M = /* @__PURE__ */ g.createElement(v.route.Component, null) : v.route.element ? M = v.route.element : M = b, /* @__PURE__ */ g.createElement(
          lC,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: C,
              isDataRoute: i != null
            },
            children: M
          }
        );
      };
      return i && (v.route.ErrorBoundary || v.route.errorElement || w === 0) ? /* @__PURE__ */ g.createElement(
        l1,
        {
          location: i.location,
          revalidation: i.revalidation,
          component: N,
          error: S,
          children: O(),
          routeContext: { outlet: null, matches: C, isDataRoute: !0 },
          onError: m
        }
      ) : O();
    },
    null
  );
}
function Ih(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function cC(t) {
  let a = g.useContext(es);
  return Je(a, Ih(t)), a;
}
function o1(t) {
  let a = g.useContext(El);
  return Je(a, Ih(t)), a;
}
function uC(t) {
  let a = g.useContext(Ha);
  return Je(a, Ih(t)), a;
}
function Hc(t) {
  let a = uC(t), s = a.matches[a.matches.length - 1];
  return Je(
    s.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), s.route.id;
}
function dC() {
  return Hc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Tl() {
  let t = o1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Hc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function fC() {
  let t = g.useContext(Vh), a = o1(
    "useRouteError"
    /* UseRouteError */
  ), s = Hc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[s];
}
function hC() {
  let { router: t } = cC(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Hc(
    "useNavigate"
    /* UseNavigateStable */
  ), s = g.useRef(!1);
  return i1(() => {
    s.current = !0;
  }), g.useCallback(
    async (o, u = {}) => {
      Yt(s.current, s1), s.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var By = {};
function c1(t, a, s) {
  !a && !By[t] && (By[t] = !0, Yt(!1, s));
}
var Vy = {};
function Iy(t, a) {
  !t && !Vy[a] && (Vy[a] = !0, console.warn(a));
}
var mC = "useOptimistic", Hy = AE[mC], pC = () => {
};
function gC(t) {
  return Hy ? Hy(t) : [t, pC];
}
function vC(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && Yt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: g.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && Yt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: g.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && Yt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: g.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var yC = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function bC(t, a) {
  return NN({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: VE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: yC,
    mapRouteProperties: vC,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var xC = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((t, a) => {
      this.resolve = (s) => {
        this.status === "pending" && (this.status = "resolved", t(s));
      }, this.reject = (s) => {
        this.status === "pending" && (this.status = "rejected", a(s));
      };
    });
  }
};
function SC({
  router: t,
  flushSync: a,
  onError: s,
  unstable_useTransitions: i
}) {
  i = n1() || i;
  let [u, f] = g.useState(t.state), [p, y] = gC(u), [m, b] = g.useState(), [v, w] = g.useState({
    isTransitioning: !1
  }), [S, j] = g.useState(), [N, R] = g.useState(), [C, O] = g.useState(), M = g.useRef(/* @__PURE__ */ new Map()), T = g.useCallback(
    (V, { deletedFetchers: k, newErrors: F, flushSync: W, viewTransitionOpts: ae }) => {
      F && s && Object.values(F).forEach(
        (le) => s(le, {
          location: V.location,
          params: V.matches[0]?.params ?? {},
          unstable_pattern: jl(V.matches)
        })
      ), V.fetchers.forEach((le, A) => {
        le.data !== void 0 && M.current.set(A, le.data);
      }), k.forEach((le) => M.current.delete(le)), Iy(
        W === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let K = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Iy(
        ae == null || K,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !ae || !K) {
        a && W ? a(() => f(V)) : i === !1 ? f(V) : g.startTransition(() => {
          i === !0 && y((le) => qy(le, V)), f(V);
        });
        return;
      }
      if (a && W) {
        a(() => {
          N && (S?.resolve(), N.skipTransition()), w({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: ae.currentLocation,
            nextLocation: ae.nextLocation
          });
        });
        let le = t.window.document.startViewTransition(() => {
          a(() => f(V));
        });
        le.finished.finally(() => {
          a(() => {
            j(void 0), R(void 0), b(void 0), w({ isTransitioning: !1 });
          });
        }), a(() => R(le));
        return;
      }
      N ? (S?.resolve(), N.skipTransition(), O({
        state: V,
        currentLocation: ae.currentLocation,
        nextLocation: ae.nextLocation
      })) : (b(V), w({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: ae.currentLocation,
        nextLocation: ae.nextLocation
      }));
    },
    [
      t.window,
      a,
      N,
      S,
      i,
      y,
      s
    ]
  );
  g.useLayoutEffect(() => t.subscribe(T), [t, T]);
  let q = p.initialized;
  g.useLayoutEffect(() => {
    !q && t.state.initialized && T(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [q, T, t.state]), g.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new xC());
  }, [v]), g.useEffect(() => {
    if (S && m && t.window) {
      let V = m, k = S.promise, F = t.window.document.startViewTransition(async () => {
        i === !1 ? f(V) : g.startTransition(() => {
          i === !0 && y((W) => qy(W, V)), f(V);
        }), await k;
      });
      F.finished.finally(() => {
        j(void 0), R(void 0), b(void 0), w({ isTransitioning: !1 });
      }), R(F);
    }
  }, [
    m,
    S,
    t.window,
    i,
    y
  ]), g.useEffect(() => {
    S && m && p.location.key === m.location.key && S.resolve();
  }, [S, N, p.location, m]), g.useEffect(() => {
    !v.isTransitioning && C && (b(C.state), w({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: C.currentLocation,
      nextLocation: C.nextLocation
    }), O(void 0));
  }, [v.isTransitioning, C]);
  let Q = g.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (V) => t.navigate(V),
    push: (V, k, F) => t.navigate(V, {
      state: k,
      preventScrollReset: F?.preventScrollReset
    }),
    replace: (V, k, F) => t.navigate(V, {
      replace: !0,
      state: k,
      preventScrollReset: F?.preventScrollReset
    })
  }), [t]), re = t.basename || "/", _ = g.useMemo(
    () => ({
      router: t,
      navigator: Q,
      static: !1,
      basename: re,
      onError: s
    }),
    [t, Q, re, s]
  );
  return /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement(es.Provider, { value: _ }, /* @__PURE__ */ g.createElement(El.Provider, { value: p }, /* @__PURE__ */ g.createElement(a1.Provider, { value: M.current }, /* @__PURE__ */ g.createElement(Bh.Provider, { value: v }, /* @__PURE__ */ g.createElement(
    EC,
    {
      basename: re,
      location: p.location,
      navigationType: p.historyAction,
      navigator: Q,
      unstable_useTransitions: i
    },
    /* @__PURE__ */ g.createElement(
      wC,
      {
        routes: t.routes,
        future: t.future,
        state: p,
        isStatic: !1,
        onError: s
      }
    )
  ))))), null);
}
function qy(t, a) {
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
var wC = g.memo(jC);
function jC({
  routes: t,
  future: a,
  state: s,
  isStatic: i,
  onError: o
}) {
  return aC(t, void 0, { state: s, isStatic: i, onError: o });
}
function EC({
  basename: t = "/",
  children: a = null,
  location: s,
  navigationType: i = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: f
}) {
  Je(
    !Nl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let p = t.replace(/^\/*/, "/"), y = g.useMemo(
    () => ({
      basename: p,
      navigator: o,
      static: u,
      unstable_useTransitions: f,
      future: {}
    }),
    [p, o, u, f]
  );
  typeof s == "string" && (s = fa(s));
  let {
    pathname: m = "/",
    search: b = "",
    hash: v = "",
    state: w = null,
    key: S = "default",
    unstable_mask: j
  } = s, N = g.useMemo(() => {
    let R = aa(m, p);
    return R == null ? null : {
      location: {
        pathname: R,
        search: b,
        hash: v,
        state: w,
        key: S,
        unstable_mask: j
      },
      navigationType: i
    };
  }, [
    p,
    m,
    b,
    v,
    w,
    S,
    i,
    j
  ]);
  return Yt(
    N != null,
    `<Router basename="${p}"> is not able to match the URL "${m}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ g.createElement(ra.Provider, { value: y }, /* @__PURE__ */ g.createElement(Ic.Provider, { children: a, value: N }));
}
var pc = "get", gc = "application/x-www-form-urlencoded";
function qc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function NC(t) {
  return qc(t) && t.tagName.toLowerCase() === "button";
}
function CC(t) {
  return qc(t) && t.tagName.toLowerCase() === "form";
}
function TC(t) {
  return qc(t) && t.tagName.toLowerCase() === "input";
}
function RC(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function _C(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !RC(t);
}
var Go = null;
function MC() {
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
var AC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function vf(t) {
  return t != null && !AC.has(t) ? (Yt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${gc}"`
  ), null) : t;
}
function DC(t, a) {
  let s, i, o, u, f;
  if (CC(t)) {
    let p = t.getAttribute("action");
    i = p ? aa(p, a) : null, s = t.getAttribute("method") || pc, o = vf(t.getAttribute("enctype")) || gc, u = new FormData(t);
  } else if (NC(t) || TC(t) && (t.type === "submit" || t.type === "image")) {
    let p = t.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = t.getAttribute("formaction") || p.getAttribute("action");
    if (i = y ? aa(y, a) : null, s = t.getAttribute("formmethod") || p.getAttribute("method") || pc, o = vf(t.getAttribute("formenctype")) || vf(p.getAttribute("enctype")) || gc, u = new FormData(p, t), !MC()) {
      let { name: m, type: b, value: v } = t;
      if (b === "image") {
        let w = m ? `${m}.` : "";
        u.append(`${w}x`, "0"), u.append(`${w}y`, "0");
      } else m && u.append(m, v);
    }
  } else {
    if (qc(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    s = pc, i = null, o = gc, f = t;
  }
  return u && o === "text/plain" && (f = u, u = void 0), { action: i, method: s.toLowerCase(), encType: o, formData: u, body: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Hh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function u1(t, a, s, i) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return s ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${i}` : o.pathname = `${o.pathname}.${i}` : o.pathname === "/" ? o.pathname = `_root.${i}` : a && aa(o.pathname, a) === "/" ? o.pathname = `${Ec(a)}/_root.${i}` : o.pathname = `${Ec(o.pathname)}.${i}`, o;
}
async function kC(t, a) {
  if (t.id in a)
    return a[t.id];
  try {
    let s = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      t.module
    );
    return a[t.id] = s, s;
  } catch (s) {
    return console.error(
      `Error loading route module \`${t.module}\`, reloading page...`
    ), console.error(s), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function zC(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function OC(t, a, s) {
  let i = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let f = await kC(u, s);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return BC(
    i.flat(1).filter(zC).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function Fy(t, a, s, i, o, u) {
  let f = (y, m) => s[m] ? y.route.id !== s[m].route.id : !0, p = (y, m) => (
    // param change, /users/123 -> /users/456
    s[m].pathname !== y.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    s[m].route.path?.endsWith("*") && s[m].params["*"] !== y.params["*"]
  );
  return u === "assets" ? a.filter(
    (y, m) => f(y, m) || p(y, m)
  ) : u === "data" ? a.filter((y, m) => {
    let b = i.routes[y.route.id];
    if (!b || !b.hasLoader)
      return !1;
    if (f(y, m) || p(y, m))
      return !0;
    if (y.route.shouldRevalidate) {
      let v = y.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: s[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: y.params,
        defaultShouldRevalidate: !0
      });
      if (typeof v == "boolean")
        return v;
    }
    return !0;
  }) : [];
}
function LC(t, a, { includeHydrateFallback: s } = {}) {
  return $C(
    t.map((i) => {
      let o = a.routes[i.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), s && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function $C(t) {
  return [...new Set(t)];
}
function UC(t) {
  let a = {}, s = Object.keys(t).sort();
  for (let i of s)
    a[i] = t[i];
  return a;
}
function BC(t, a) {
  let s = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((i, o) => {
    let u = JSON.stringify(UC(o));
    return s.has(u) || (s.add(u), i.push({ key: u, link: o })), i;
  }, []);
}
function qh() {
  let t = g.useContext(es);
  return Hh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function VC() {
  let t = g.useContext(El);
  return Hh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Fh = g.createContext(void 0);
Fh.displayName = "FrameworkContext";
function Yh() {
  let t = g.useContext(Fh);
  return Hh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function IC(t, a) {
  let s = g.useContext(Fh), [i, o] = g.useState(!1), [u, f] = g.useState(!1), { onFocus: p, onBlur: y, onMouseEnter: m, onMouseLeave: b, onTouchStart: v } = a, w = g.useRef(null);
  g.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let N = (C) => {
        C.forEach((O) => {
          f(O.isIntersecting);
        });
      }, R = new IntersectionObserver(N, { threshold: 0.5 });
      return w.current && R.observe(w.current), () => {
        R.disconnect();
      };
    }
  }, [t]), g.useEffect(() => {
    if (i) {
      let N = setTimeout(() => {
        f(!0);
      }, 100);
      return () => {
        clearTimeout(N);
      };
    }
  }, [i]);
  let S = () => {
    o(!0);
  }, j = () => {
    o(!1), f(!1);
  };
  return s ? t !== "intent" ? [u, w, {}] : [
    u,
    w,
    {
      onFocus: Wi(p, S),
      onBlur: Wi(y, j),
      onMouseEnter: Wi(m, S),
      onMouseLeave: Wi(b, j),
      onTouchStart: Wi(v, S)
    }
  ] : [!1, w, {}];
}
function Wi(t, a) {
  return (s) => {
    t && t(s), s.defaultPrevented || a(s);
  };
}
function HC({ page: t, ...a }) {
  let s = n1(), { router: i } = qh(), o = g.useMemo(
    () => yr(i.routes, t, i.basename),
    [i.routes, t, i.basename]
  );
  return o ? s ? /* @__PURE__ */ g.createElement(FC, { page: t, matches: o, ...a }) : /* @__PURE__ */ g.createElement(YC, { page: t, matches: o, ...a }) : null;
}
function qC(t) {
  let { manifest: a, routeModules: s } = Yh(), [i, o] = g.useState([]);
  return g.useEffect(() => {
    let u = !1;
    return OC(t, a, s).then(
      (f) => {
        u || o(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, s]), i;
}
function FC({
  page: t,
  matches: a,
  ...s
}) {
  let i = qa(), { future: o } = Yh(), { basename: u } = qh(), f = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let p = u1(
      t,
      u,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), y = !1, m = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? y = !0 : m.push(b.route.id);
    return y && m.length > 0 && p.searchParams.set("_routes", m.join(",")), [p.pathname + p.search];
  }, [
    u,
    o.unstable_trailingSlashAwareDataRequests,
    t,
    i,
    a
  ]);
  return /* @__PURE__ */ g.createElement(g.Fragment, null, f.map((p) => /* @__PURE__ */ g.createElement("link", { key: p, rel: "prefetch", as: "fetch", href: p, ...s })));
}
function YC({
  page: t,
  matches: a,
  ...s
}) {
  let i = qa(), { future: o, manifest: u, routeModules: f } = Yh(), { basename: p } = qh(), { loaderData: y, matches: m } = VC(), b = g.useMemo(
    () => Fy(
      t,
      a,
      m,
      u,
      i,
      "data"
    ),
    [t, a, m, u, i]
  ), v = g.useMemo(
    () => Fy(
      t,
      a,
      m,
      u,
      i,
      "assets"
    ),
    [t, a, m, u, i]
  ), w = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), R = !1;
    if (a.forEach((O) => {
      let M = u.routes[O.route.id];
      !M || !M.hasLoader || (!b.some((T) => T.route.id === O.route.id) && O.route.id in y && f[O.route.id]?.shouldRevalidate || M.hasClientLoader ? R = !0 : N.add(O.route.id));
    }), N.size === 0)
      return [];
    let C = u1(
      t,
      p,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return R && N.size > 0 && C.searchParams.set(
      "_routes",
      a.filter((O) => N.has(O.route.id)).map((O) => O.route.id).join(",")
    ), [C.pathname + C.search];
  }, [
    p,
    o.unstable_trailingSlashAwareDataRequests,
    y,
    i,
    u,
    b,
    a,
    t,
    f
  ]), S = g.useMemo(
    () => LC(v, u),
    [v, u]
  ), j = qC(v);
  return /* @__PURE__ */ g.createElement(g.Fragment, null, w.map((N) => /* @__PURE__ */ g.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...s })), S.map((N) => /* @__PURE__ */ g.createElement("link", { key: N, rel: "modulepreload", href: N, ...s })), j.map(({ key: N, link: R }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ g.createElement(
      "link",
      {
        key: N,
        nonce: s.nonce,
        ...R,
        crossOrigin: R.crossOrigin ?? s.crossOrigin
      }
    )
  )));
}
function GC(...t) {
  return (a) => {
    t.forEach((s) => {
      typeof s == "function" ? s(a) : s != null && (s.current = a);
    });
  };
}
var PC = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  PC && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var d1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Gh = g.forwardRef(
  function({
    onClick: a,
    discover: s = "render",
    prefetch: i = "none",
    relative: o,
    reloadDocument: u,
    replace: f,
    unstable_mask: p,
    state: y,
    target: m,
    to: b,
    preventScrollReset: v,
    viewTransition: w,
    unstable_defaultShouldRevalidate: S,
    ...j
  }, N) {
    let { basename: R, navigator: C, unstable_useTransitions: O } = g.useContext(ra), M = typeof b == "string" && d1.test(b), T = Ix(b, R);
    b = T.to;
    let q = tC(b, { relative: o }), Q = qa(), re = null;
    if (p) {
      let le = Bc(
        p,
        [],
        Q.unstable_mask ? Q.unstable_mask.pathname : "/",
        !0
      );
      R !== "/" && (le.pathname = le.pathname === "/" ? R : ea([R, le.pathname])), re = C.createHref(le);
    }
    let [_, V, k] = IC(
      i,
      j
    ), F = ZC(b, {
      replace: f,
      unstable_mask: p,
      state: y,
      target: m,
      preventScrollReset: v,
      relative: o,
      viewTransition: w,
      unstable_defaultShouldRevalidate: S,
      unstable_useTransitions: O
    });
    function W(le) {
      a && a(le), le.defaultPrevented || F(le);
    }
    let ae = !(T.isExternal || u), K = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ g.createElement(
        "a",
        {
          ...j,
          ...k,
          href: (ae ? re : void 0) || T.absoluteURL || q,
          onClick: ae ? W : a,
          ref: GC(N, V),
          target: m,
          "data-discover": !M && s === "render" ? "true" : void 0
        }
      )
    );
    return _ && !M ? /* @__PURE__ */ g.createElement(g.Fragment, null, K, /* @__PURE__ */ g.createElement(HC, { page: q })) : K;
  }
);
Gh.displayName = "Link";
var KC = g.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: s = !1,
    className: i = "",
    end: o = !1,
    style: u,
    to: f,
    viewTransition: p,
    children: y,
    ...m
  }, b) {
    let v = Cl(f, { relative: m.relative }), w = qa(), S = g.useContext(El), { navigator: j, basename: N } = g.useContext(ra), R = S != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    nT(v) && p === !0, C = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, O = w.pathname, M = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    s || (O = O.toLowerCase(), M = M ? M.toLowerCase() : null, C = C.toLowerCase()), M && N && (M = aa(M, N) || M);
    const T = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
    let q = O === C || !o && O.startsWith(C) && O.charAt(T) === "/", Q = M != null && (M === C || !o && M.startsWith(C) && M.charAt(C.length) === "/"), re = {
      isActive: q,
      isPending: Q,
      isTransitioning: R
    }, _ = q ? a : void 0, V;
    typeof i == "function" ? V = i(re) : V = [
      i,
      q ? "active" : null,
      Q ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let k = typeof u == "function" ? u(re) : u;
    return /* @__PURE__ */ g.createElement(
      Gh,
      {
        ...m,
        "aria-current": _,
        className: V,
        ref: b,
        style: k,
        to: f,
        viewTransition: p
      },
      typeof y == "function" ? y(re) : y
    );
  }
);
KC.displayName = "NavLink";
var XC = g.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: s,
    reloadDocument: i,
    replace: o,
    state: u,
    method: f = pc,
    action: p,
    onSubmit: y,
    relative: m,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: w,
    ...S
  }, j) => {
    let { unstable_useTransitions: N } = g.useContext(ra), R = eT(), C = tT(p, { relative: m }), O = f.toLowerCase() === "get" ? "get" : "post", M = typeof p == "string" && d1.test(p), T = (q) => {
      if (y && y(q), q.defaultPrevented) return;
      q.preventDefault();
      let Q = q.nativeEvent.submitter, re = Q?.getAttribute("formmethod") || f, _ = () => R(Q || q.currentTarget, {
        fetcherKey: a,
        method: re,
        navigate: s,
        replace: o,
        state: u,
        relative: m,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: w
      });
      N && s !== !1 ? g.startTransition(() => _()) : _();
    };
    return /* @__PURE__ */ g.createElement(
      "form",
      {
        ref: j,
        method: O,
        action: C,
        onSubmit: i ? y : T,
        ...S,
        "data-discover": !M && t === "render" ? "true" : void 0
      }
    );
  }
);
XC.displayName = "Form";
function QC(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function f1(t) {
  let a = g.useContext(es);
  return Je(a, QC(t)), a;
}
function ZC(t, {
  target: a,
  replace: s,
  unstable_mask: i,
  state: o,
  preventScrollReset: u,
  relative: f,
  viewTransition: p,
  unstable_defaultShouldRevalidate: y,
  unstable_useTransitions: m
} = {}) {
  let b = ti(), v = qa(), w = Cl(t, { relative: f });
  return g.useCallback(
    (S) => {
      if (_C(S, a)) {
        S.preventDefault();
        let j = s !== void 0 ? s : xa(v) === xa(w), N = () => b(t, {
          replace: j,
          unstable_mask: i,
          state: o,
          preventScrollReset: u,
          relative: f,
          viewTransition: p,
          unstable_defaultShouldRevalidate: y
        });
        m ? g.startTransition(() => N()) : N();
      }
    },
    [
      v,
      b,
      w,
      s,
      i,
      o,
      a,
      t,
      u,
      f,
      p,
      y,
      m
    ]
  );
}
var JC = 0, WC = () => `__${String(++JC)}__`;
function eT() {
  let { router: t } = f1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = g.useContext(ra), s = dC(), i = t.fetch, o = t.navigate;
  return g.useCallback(
    async (u, f = {}) => {
      let { action: p, method: y, encType: m, formData: b, body: v } = DC(
        u,
        a
      );
      if (f.navigate === !1) {
        let w = f.fetcherKey || WC();
        await i(w, s, f.action || p, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || y,
          formEncType: f.encType || m,
          flushSync: f.flushSync
        });
      } else
        await o(f.action || p, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || y,
          formEncType: f.encType || m,
          replace: f.replace,
          state: f.state,
          fromRouteId: s,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition
        });
    },
    [i, o, a, s]
  );
}
function tT(t, { relative: a } = {}) {
  let { basename: s } = g.useContext(ra), i = g.useContext(Ha);
  Je(i, "useFormAction must be used inside a RouteContext");
  let [o] = i.matches.slice(-1), u = { ...Cl(t || ".", { relative: a }) }, f = qa();
  if (t == null) {
    u.search = f.search;
    let p = new URLSearchParams(u.search), y = p.getAll("index");
    if (y.some((b) => b === "")) {
      p.delete("index"), y.filter((v) => v).forEach((v) => p.append("index", v));
      let b = p.toString();
      u.search = b ? `?${b}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (u.pathname = u.pathname === "/" ? s : ea([s, u.pathname])), xa(u);
}
function nT(t, { relative: a } = {}) {
  let s = g.useContext(Bh);
  Je(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = f1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = Cl(t, { relative: a });
  if (!s.isTransitioning)
    return !1;
  let u = aa(s.currentLocation.pathname, i) || s.currentLocation.pathname, f = aa(s.nextLocation.pathname, i) || s.nextLocation.pathname;
  return jc(o.pathname, f) != null || jc(o.pathname, u) != null;
}
class ni extends Error {
  constructor(a, s, i, o) {
    super(i), this.status = a, this.category = s, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const Sa = "/api/v1/extensions/nexus.audio.emotiontts";
async function Ct(t, a) {
  const s = t.startsWith("http") ? t : `${Sa}${t}`, i = await fetch(s, {
    ...a,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...a?.headers ?? {}
    }
  });
  if (!i.ok) {
    let o = null;
    try {
      o = await i.json();
    } catch {
      o = null;
    }
    throw new ni(
      i.status,
      o?.category ?? "unknown",
      o?.message ?? i.statusText,
      o?.requestId
    );
  }
  if (i.status !== 204)
    return await i.json();
}
function aT(t, a, s) {
  const i = t.startsWith("http") ? t : `${Sa}${t}`, o = new EventSource(i);
  return o.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, o.onerror = (u) => {
    s?.(u);
  }, () => o.close();
}
async function rT() {
  return Ct("/deployments");
}
async function Yy(t) {
  return Ct(`/deployments/${t}`);
}
async function sT(t, a) {
  return Ct(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Gy(t) {
  return Ct(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Ph(t, a) {
  return Ct("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function Ys(t, a, s) {
  return Ct(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(s)
    }
  );
}
async function h1(t, a) {
  await Ct(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function iT(t) {
  return Ct(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function lT(t, a, s = "error") {
  return Ct("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: s })
  });
}
async function oT(t, a = {}) {
  const s = new URLSearchParams();
  a.limit && s.set("limit", String(a.limit)), a.status && s.set("status", a.status);
  const i = s.toString(), o = i ? `?${i}` : "";
  return Ct(`/deployments/${t}/runs${o}`);
}
async function cT(t, a) {
  return Ct(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function Kh(t, a) {
  return Ct(`/deployments/${t}/runs/${a}`);
}
async function uT(t, a) {
  return Ct(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function m1(t, a) {
  return Ct(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function dT(t, a) {
  return Ct(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Py(t, a, s, i) {
  return aT(
    `/deployments/${t}/runs/${a}/progress`,
    s,
    i
  );
}
async function Qs(t) {
  return Ct(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function Nc(t, a, s, i, o) {
  const u = new FormData();
  u.append("deploymentId", t), u.append("displayName", s), u.append("kind", i), u.append("audio", a);
  const f = await fetch(`${Sa}/voice-assets`, {
    method: "POST",
    body: u
  });
  if (!f.ok)
    throw new Error(`upload failed: ${f.status}`);
  return await f.json();
}
async function fT(t, a) {
  await Ct(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function hT(t, a, s) {
  return Ct(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: s })
    }
  );
}
function mT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${Sa}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function pT(t) {
  return Ct(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var gT = "mux0i60", vT = "mux0i61", yT = "mux0i62", bT = "mux0i63";
function Fc({ count: t = "0", title: a, hint: s }) {
  return /* @__PURE__ */ c.jsxs("div", { className: gT, children: [
    /* @__PURE__ */ c.jsx("span", { className: vT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: yT, children: a }),
    s ? /* @__PURE__ */ c.jsx("p", { className: bT, children: s }) : null
  ] });
}
var xT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, ST = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, wT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, jT = "zwn3019";
function Va({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: s = "subtle",
  as: i = "section",
  children: o,
  className: u,
  style: f,
  ...p
}) {
  const y = [xT[t], wT[a], ST[s], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(i, { className: y, style: f, "data-elevation": s, ...p, children: o });
}
function ET({ children: t, className: a }) {
  const s = [jT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: s, children: t });
}
var Xr = "vrkn5p0", NT = "_93p6291", CT = "_93p6292", TT = "_93p6293", RT = "_93p6294", _T = "_93p6295", MT = "_93p6296", AT = "_93p6297", DT = "_93p6298", kT = "_93p6299", zT = "_93p629a", OT = "_93p629b", LT = "_93p629c", $T = "_93p629d", UT = "_93p629e";
const BT = "nexus-host-navigate";
function VT(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function IT(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const s = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(BT, {
      detail: s
    })
  );
}
function HT() {
  const { deployments: t } = Tl(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: NT, children: [
    /* @__PURE__ */ c.jsxs("header", { className: CT, children: [
      /* @__PURE__ */ c.jsx("p", { className: TT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: RT, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: _T, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: MT, children: [
        /* @__PURE__ */ c.jsx("span", { className: AT, children: t.length }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Va,
      {
        density: "airy",
        elevation: "raised",
        className: DT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Xr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Fc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: kT, children: t.map((s) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: VT(s.deploymentId),
              onClick: (i) => IT(i, s.deploymentId),
              className: zT,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: OT, "aria-hidden": "true", children: qT(s.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: LT, children: s.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: $T, children: s.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: UT, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, s.deploymentId)) })
        ]
      }
    )
  ] });
}
function qT(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Xh = zx();
const FT = /* @__PURE__ */ kx(Xh);
function YT(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.type = "text/css", a.appendChild(s), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t));
}
const GT = (t) => {
  switch (t) {
    case "success":
      return XT;
    case "info":
      return ZT;
    case "warning":
      return QT;
    case "error":
      return JT;
    default:
      return null;
  }
}, PT = Array(12).fill(0), KT = ({ visible: t, className: a }) => /* @__PURE__ */ Se.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ Se.createElement("div", {
  className: "sonner-spinner"
}, PT.map((s, i) => /* @__PURE__ */ Se.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${i}`
})))), XT = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), QT = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), ZT = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), JT = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), WT = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ Se.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ Se.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), eR = () => {
  const [t, a] = Se.useState(document.hidden);
  return Se.useEffect(() => {
    const s = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", s), () => window.removeEventListener("visibilitychange", s);
  }, []), t;
};
let ah = 1;
class tR {
  constructor() {
    this.subscribe = (a) => (this.subscribers.push(a), () => {
      const s = this.subscribers.indexOf(a);
      this.subscribers.splice(s, 1);
    }), this.publish = (a) => {
      this.subscribers.forEach((s) => s(a));
    }, this.addToast = (a) => {
      this.publish(a), this.toasts = [
        ...this.toasts,
        a
      ];
    }, this.create = (a) => {
      var s;
      const { message: i, ...o } = a, u = typeof a?.id == "number" || ((s = a.id) == null ? void 0 : s.length) > 0 ? a.id : ah++, f = this.toasts.find((y) => y.id === u), p = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((y) => y.id === u ? (this.publish({
        ...y,
        ...a,
        id: u,
        title: i
      }), {
        ...y,
        ...a,
        id: u,
        dismissible: p,
        title: i
      }) : y) : this.addToast({
        title: i,
        ...o,
        dismissible: p,
        id: u
      }), u;
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((s) => s({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((s) => {
      this.subscribers.forEach((i) => i({
        id: s.id,
        dismiss: !0
      }));
    }), a), this.message = (a, s) => this.create({
      ...s,
      message: a
    }), this.error = (a, s) => this.create({
      ...s,
      message: a,
      type: "error"
    }), this.success = (a, s) => this.create({
      ...s,
      type: "success",
      message: a
    }), this.info = (a, s) => this.create({
      ...s,
      type: "info",
      message: a
    }), this.warning = (a, s) => this.create({
      ...s,
      type: "warning",
      message: a
    }), this.loading = (a, s) => this.create({
      ...s,
      type: "loading",
      message: a
    }), this.promise = (a, s) => {
      if (!s)
        return;
      let i;
      s.loading !== void 0 && (i = this.create({
        ...s,
        promise: a,
        type: "loading",
        message: s.loading,
        description: typeof s.description != "function" ? s.description : void 0
      }));
      const o = Promise.resolve(a instanceof Function ? a() : a);
      let u = i !== void 0, f;
      const p = o.then(async (m) => {
        if (f = [
          "resolve",
          m
        ], Se.isValidElement(m))
          u = !1, this.create({
            id: i,
            type: "default",
            message: m
          });
        else if (aR(m) && !m.ok) {
          u = !1;
          const v = typeof s.error == "function" ? await s.error(`HTTP error! status: ${m.status}`) : s.error, w = typeof s.description == "function" ? await s.description(`HTTP error! status: ${m.status}`) : s.description, j = typeof v == "object" && !Se.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "error",
            description: w,
            ...j
          });
        } else if (m instanceof Error) {
          u = !1;
          const v = typeof s.error == "function" ? await s.error(m) : s.error, w = typeof s.description == "function" ? await s.description(m) : s.description, j = typeof v == "object" && !Se.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "error",
            description: w,
            ...j
          });
        } else if (s.success !== void 0) {
          u = !1;
          const v = typeof s.success == "function" ? await s.success(m) : s.success, w = typeof s.description == "function" ? await s.description(m) : s.description, j = typeof v == "object" && !Se.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "success",
            description: w,
            ...j
          });
        }
      }).catch(async (m) => {
        if (f = [
          "reject",
          m
        ], s.error !== void 0) {
          u = !1;
          const b = typeof s.error == "function" ? await s.error(m) : s.error, v = typeof s.description == "function" ? await s.description(m) : s.description, S = typeof b == "object" && !Se.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: i,
            type: "error",
            description: v,
            ...S
          });
        }
      }).finally(() => {
        u && (this.dismiss(i), i = void 0), s.finally == null || s.finally.call(s);
      }), y = () => new Promise((m, b) => p.then(() => f[0] === "reject" ? b(f[1]) : m(f[1])).catch(b));
      return typeof i != "string" && typeof i != "number" ? {
        unwrap: y
      } : Object.assign(i, {
        unwrap: y
      });
    }, this.custom = (a, s) => {
      const i = s?.id || ah++;
      return this.create({
        jsx: a(i),
        id: i,
        ...s
      }), i;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const An = new tR(), nR = (t, a) => {
  const s = a?.id || ah++;
  return An.addToast({
    title: t,
    ...a,
    id: s
  }), s;
}, aR = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", rR = nR, sR = () => An.toasts, iR = () => An.getActiveToasts(), hn = Object.assign(rR, {
  success: An.success,
  info: An.info,
  warning: An.warning,
  error: An.error,
  custom: An.custom,
  message: An.message,
  promise: An.promise,
  dismiss: An.dismiss,
  loading: An.loading
}, {
  getHistory: sR,
  getToasts: iR
});
YT("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Po(t) {
  return t.label !== void 0;
}
const lR = 3, oR = "24px", cR = "16px", Ky = 4e3, uR = 356, dR = 14, fR = 45, hR = 200;
function ba(...t) {
  return t.filter(Boolean).join(" ");
}
function mR(t) {
  const [a, s] = t.split("-"), i = [];
  return a && i.push(a), s && i.push(s), i;
}
const pR = (t) => {
  var a, s, i, o, u, f, p, y, m;
  const { invert: b, toast: v, unstyled: w, interacting: S, setHeights: j, visibleToasts: N, heights: R, index: C, toasts: O, expanded: M, removeToast: T, defaultRichColors: q, closeButton: Q, style: re, cancelButtonStyle: _, actionButtonStyle: V, className: k = "", descriptionClassName: F = "", duration: W, position: ae, gap: K, expandByDefault: le, classNames: A, icons: Y, closeButtonAriaLabel: $ = "Close toast" } = t, [se, de] = Se.useState(null), [D, H] = Se.useState(null), [Z, G] = Se.useState(!1), [B, J] = Se.useState(!1), [ce, ye] = Se.useState(!1), [Re, Pe] = Se.useState(!1), [Ne, at] = Se.useState(!1), [Ie, qe] = Se.useState(0), [Gt, _t] = Se.useState(0), Mt = Se.useRef(v.duration || W || Ky), mn = Se.useRef(null), gt = Se.useRef(null), Pt = C === 0, jn = C + 1 <= N, ot = v.type, sn = v.dismissible !== !1, bt = v.className || "", we = v.descriptionClassName || "", Le = Se.useMemo(() => R.findIndex((be) => be.toastId === v.id) || 0, [
    R,
    v.id
  ]), Xe = Se.useMemo(() => {
    var be;
    return (be = v.closeButton) != null ? be : Q;
  }, [
    v.closeButton,
    Q
  ]), ct = Se.useMemo(() => v.duration || W || Ky, [
    v.duration,
    W
  ]), At = Se.useRef(0), Ut = Se.useRef(0), sa = Se.useRef(0), Sn = Se.useRef(null), [pn, Ot] = ae.split("-"), Tt = Se.useMemo(() => R.reduce((be, Ve, We) => We >= Le ? be : be + Ve.height, 0), [
    R,
    Le
  ]), pt = eR(), En = v.invert || b, fe = ot === "loading";
  Ut.current = Se.useMemo(() => Le * K + Tt, [
    Le,
    Tt
  ]), Se.useEffect(() => {
    Mt.current = ct;
  }, [
    ct
  ]), Se.useEffect(() => {
    G(!0);
  }, []), Se.useEffect(() => {
    const be = gt.current;
    if (be) {
      const Ve = be.getBoundingClientRect().height;
      return _t(Ve), j((We) => [
        {
          toastId: v.id,
          height: Ve,
          position: v.position
        },
        ...We
      ]), () => j((We) => We.filter((it) => it.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), Se.useLayoutEffect(() => {
    if (!Z) return;
    const be = gt.current, Ve = be.style.height;
    be.style.height = "auto";
    const We = be.getBoundingClientRect().height;
    be.style.height = Ve, _t(We), j((it) => it.find((ht) => ht.toastId === v.id) ? it.map((ht) => ht.toastId === v.id ? {
      ...ht,
      height: We
    } : ht) : [
      {
        toastId: v.id,
        height: We,
        position: v.position
      },
      ...it
    ]);
  }, [
    Z,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const _e = Se.useCallback(() => {
    J(!0), qe(Ut.current), j((be) => be.filter((Ve) => Ve.toastId !== v.id)), setTimeout(() => {
      T(v);
    }, hR);
  }, [
    v,
    T,
    j,
    Ut
  ]);
  Se.useEffect(() => {
    if (v.promise && ot === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let be;
    return M || S || pt ? (() => {
      if (sa.current < At.current) {
        const it = (/* @__PURE__ */ new Date()).getTime() - At.current;
        Mt.current = Mt.current - it;
      }
      sa.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Mt.current !== 1 / 0 && (At.current = (/* @__PURE__ */ new Date()).getTime(), be = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), _e();
      }, Mt.current));
    })(), () => clearTimeout(be);
  }, [
    M,
    S,
    v,
    ot,
    pt,
    _e
  ]), Se.useEffect(() => {
    v.delete && (_e(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    _e,
    v.delete
  ]);
  function Ce() {
    var be;
    if (Y?.loading) {
      var Ve;
      return /* @__PURE__ */ Se.createElement("div", {
        className: ba(A?.loader, v == null || (Ve = v.classNames) == null ? void 0 : Ve.loader, "sonner-loader"),
        "data-visible": ot === "loading"
      }, Y.loading);
    }
    return /* @__PURE__ */ Se.createElement(KT, {
      className: ba(A?.loader, v == null || (be = v.classNames) == null ? void 0 : be.loader),
      visible: ot === "loading"
    });
  }
  const U = v.icon || Y?.[ot] || GT(ot);
  var pe, ve;
  return /* @__PURE__ */ Se.createElement("li", {
    tabIndex: 0,
    ref: gt,
    className: ba(k, bt, A?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, A?.default, A?.[ot], v == null || (s = v.classNames) == null ? void 0 : s[ot]),
    "data-sonner-toast": "",
    "data-rich-colors": (pe = v.richColors) != null ? pe : q,
    "data-styled": !(v.jsx || v.unstyled || w),
    "data-mounted": Z,
    "data-promise": !!v.promise,
    "data-swiped": Ne,
    "data-removed": B,
    "data-visible": jn,
    "data-y-position": pn,
    "data-x-position": Ot,
    "data-index": C,
    "data-front": Pt,
    "data-swiping": ce,
    "data-dismissible": sn,
    "data-type": ot,
    "data-invert": En,
    "data-swipe-out": Re,
    "data-swipe-direction": D,
    "data-expanded": !!(M || le && Z),
    "data-testid": v.testId,
    style: {
      "--index": C,
      "--toasts-before": C,
      "--z-index": O.length - C,
      "--offset": `${B ? Ie : Ut.current}px`,
      "--initial-height": le ? "auto" : `${Gt}px`,
      ...re,
      ...v.style
    },
    onDragEnd: () => {
      ye(!1), de(null), Sn.current = null;
    },
    onPointerDown: (be) => {
      be.button !== 2 && (fe || !sn || (mn.current = /* @__PURE__ */ new Date(), qe(Ut.current), be.target.setPointerCapture(be.pointerId), be.target.tagName !== "BUTTON" && (ye(!0), Sn.current = {
        x: be.clientX,
        y: be.clientY
      })));
    },
    onPointerUp: () => {
      var be, Ve, We;
      if (Re || !sn) return;
      Sn.current = null;
      const it = Number(((be = gt.current) == null ? void 0 : be.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), Fe = Number(((Ve = gt.current) == null ? void 0 : Ve.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), ht = (/* @__PURE__ */ new Date()).getTime() - ((We = mn.current) == null ? void 0 : We.getTime()), an = se === "x" ? it : Fe, zn = Math.abs(an) / ht;
      if (Math.abs(an) >= fR || zn > 0.11) {
        qe(Ut.current), v.onDismiss == null || v.onDismiss.call(v, v), H(se === "x" ? it > 0 ? "right" : "left" : Fe > 0 ? "down" : "up"), _e(), Pe(!0);
        return;
      } else {
        var Kt, z;
        (Kt = gt.current) == null || Kt.style.setProperty("--swipe-amount-x", "0px"), (z = gt.current) == null || z.style.setProperty("--swipe-amount-y", "0px");
      }
      at(!1), ye(!1), de(null);
    },
    onPointerMove: (be) => {
      var Ve, We, it;
      if (!Sn.current || !sn || ((Ve = window.getSelection()) == null ? void 0 : Ve.toString().length) > 0) return;
      const ht = be.clientY - Sn.current.y, an = be.clientX - Sn.current.x;
      var zn;
      const Kt = (zn = t.swipeDirections) != null ? zn : mR(ae);
      !se && (Math.abs(an) > 1 || Math.abs(ht) > 1) && de(Math.abs(an) > Math.abs(ht) ? "x" : "y");
      let z = {
        x: 0,
        y: 0
      };
      const P = (ee) => 1 / (1.5 + Math.abs(ee) / 20);
      if (se === "y") {
        if (Kt.includes("top") || Kt.includes("bottom"))
          if (Kt.includes("top") && ht < 0 || Kt.includes("bottom") && ht > 0)
            z.y = ht;
          else {
            const ee = ht * P(ht);
            z.y = Math.abs(ee) < Math.abs(ht) ? ee : ht;
          }
      } else if (se === "x" && (Kt.includes("left") || Kt.includes("right")))
        if (Kt.includes("left") && an < 0 || Kt.includes("right") && an > 0)
          z.x = an;
        else {
          const ee = an * P(an);
          z.x = Math.abs(ee) < Math.abs(an) ? ee : an;
        }
      (Math.abs(z.x) > 0 || Math.abs(z.y) > 0) && at(!0), (We = gt.current) == null || We.style.setProperty("--swipe-amount-x", `${z.x}px`), (it = gt.current) == null || it.style.setProperty("--swipe-amount-y", `${z.y}px`);
    }
  }, Xe && !v.jsx && ot !== "loading" ? /* @__PURE__ */ Se.createElement("button", {
    "aria-label": $,
    "data-disabled": fe,
    "data-close-button": !0,
    onClick: fe || !sn ? () => {
    } : () => {
      _e(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ba(A?.closeButton, v == null || (i = v.classNames) == null ? void 0 : i.closeButton)
  }, (ve = Y?.close) != null ? ve : WT) : null, (ot || v.icon || v.promise) && v.icon !== null && (Y?.[ot] !== null || v.icon) ? /* @__PURE__ */ Se.createElement("div", {
    "data-icon": "",
    className: ba(A?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || Ce() : null, v.type !== "loading" ? U : null) : null, /* @__PURE__ */ Se.createElement("div", {
    "data-content": "",
    className: ba(A?.content, v == null || (u = v.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ Se.createElement("div", {
    "data-title": "",
    className: ba(A?.title, v == null || (f = v.classNames) == null ? void 0 : f.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ Se.createElement("div", {
    "data-description": "",
    className: ba(F, we, A?.description, v == null || (p = v.classNames) == null ? void 0 : p.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ Se.isValidElement(v.cancel) ? v.cancel : v.cancel && Po(v.cancel) ? /* @__PURE__ */ Se.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || _,
    onClick: (be) => {
      Po(v.cancel) && sn && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, be), _e());
    },
    className: ba(A?.cancelButton, v == null || (y = v.classNames) == null ? void 0 : y.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ Se.isValidElement(v.action) ? v.action : v.action && Po(v.action) ? /* @__PURE__ */ Se.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || V,
    onClick: (be) => {
      Po(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, be), !be.defaultPrevented && _e());
    },
    className: ba(A?.actionButton, v == null || (m = v.classNames) == null ? void 0 : m.actionButton)
  }, v.action.label) : null);
};
function Xy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function gR(t, a) {
  const s = {};
  return [
    t,
    a
  ].forEach((i, o) => {
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", p = u ? cR : oR;
    function y(m) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((b) => {
        s[`${f}-${b}`] = typeof m == "number" ? `${m}px` : m;
      });
    }
    typeof i == "number" || typeof i == "string" ? y(i) : typeof i == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((m) => {
      i[m] === void 0 ? s[`${f}-${m}`] = p : s[`${f}-${m}`] = typeof i[m] == "number" ? `${i[m]}px` : i[m];
    }) : y(p);
  }), s;
}
const vR = /* @__PURE__ */ Se.forwardRef(function(a, s) {
  const { id: i, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: p, closeButton: y, className: m, offset: b, mobileOffset: v, theme: w = "light", richColors: S, duration: j, style: N, visibleToasts: R = lR, toastOptions: C, dir: O = Xy(), gap: M = dR, icons: T, containerAriaLabel: q = "Notifications" } = a, [Q, re] = Se.useState([]), _ = Se.useMemo(() => i ? Q.filter((Z) => Z.toasterId === i) : Q.filter((Z) => !Z.toasterId), [
    Q,
    i
  ]), V = Se.useMemo(() => Array.from(new Set([
    u
  ].concat(_.filter((Z) => Z.position).map((Z) => Z.position)))), [
    _,
    u
  ]), [k, F] = Se.useState([]), [W, ae] = Se.useState(!1), [K, le] = Se.useState(!1), [A, Y] = Se.useState(w !== "system" ? w : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), $ = Se.useRef(null), se = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), de = Se.useRef(null), D = Se.useRef(!1), H = Se.useCallback((Z) => {
    re((G) => {
      var B;
      return (B = G.find((J) => J.id === Z.id)) != null && B.delete || An.dismiss(Z.id), G.filter(({ id: J }) => J !== Z.id);
    });
  }, []);
  return Se.useEffect(() => An.subscribe((Z) => {
    if (Z.dismiss) {
      requestAnimationFrame(() => {
        re((G) => G.map((B) => B.id === Z.id ? {
          ...B,
          delete: !0
        } : B));
      });
      return;
    }
    setTimeout(() => {
      FT.flushSync(() => {
        re((G) => {
          const B = G.findIndex((J) => J.id === Z.id);
          return B !== -1 ? [
            ...G.slice(0, B),
            {
              ...G[B],
              ...Z
            },
            ...G.slice(B + 1)
          ] : [
            Z,
            ...G
          ];
        });
      });
    });
  }), [
    Q
  ]), Se.useEffect(() => {
    if (w !== "system") {
      Y(w);
      return;
    }
    if (w === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? Y("dark") : Y("light")), typeof window > "u") return;
    const Z = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Z.addEventListener("change", ({ matches: G }) => {
        Y(G ? "dark" : "light");
      });
    } catch {
      Z.addListener(({ matches: B }) => {
        try {
          Y(B ? "dark" : "light");
        } catch (J) {
          console.error(J);
        }
      });
    }
  }, [
    w
  ]), Se.useEffect(() => {
    Q.length <= 1 && ae(!1);
  }, [
    Q
  ]), Se.useEffect(() => {
    const Z = (G) => {
      var B;
      if (f.every((ye) => G[ye] || G.code === ye)) {
        var ce;
        ae(!0), (ce = $.current) == null || ce.focus();
      }
      G.code === "Escape" && (document.activeElement === $.current || (B = $.current) != null && B.contains(document.activeElement)) && ae(!1);
    };
    return document.addEventListener("keydown", Z), () => document.removeEventListener("keydown", Z);
  }, [
    f
  ]), Se.useEffect(() => {
    if ($.current)
      return () => {
        de.current && (de.current.focus({
          preventScroll: !0
        }), de.current = null, D.current = !1);
      };
  }, [
    $.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ Se.createElement("section", {
    ref: s,
    "aria-label": `${q} ${se}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, V.map((Z, G) => {
    var B;
    const [J, ce] = Z.split("-");
    return _.length ? /* @__PURE__ */ Se.createElement("ol", {
      key: Z,
      dir: O === "auto" ? Xy() : O,
      tabIndex: -1,
      ref: $,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": A,
      "data-y-position": J,
      "data-x-position": ce,
      style: {
        "--front-toast-height": `${((B = k[0]) == null ? void 0 : B.height) || 0}px`,
        "--width": `${uR}px`,
        "--gap": `${M}px`,
        ...N,
        ...gR(b, v)
      },
      onBlur: (ye) => {
        D.current && !ye.currentTarget.contains(ye.relatedTarget) && (D.current = !1, de.current && (de.current.focus({
          preventScroll: !0
        }), de.current = null));
      },
      onFocus: (ye) => {
        ye.target instanceof HTMLElement && ye.target.dataset.dismissible === "false" || D.current || (D.current = !0, de.current = ye.relatedTarget);
      },
      onMouseEnter: () => ae(!0),
      onMouseMove: () => ae(!0),
      onMouseLeave: () => {
        K || ae(!1);
      },
      onDragEnd: () => ae(!1),
      onPointerDown: (ye) => {
        ye.target instanceof HTMLElement && ye.target.dataset.dismissible === "false" || le(!0);
      },
      onPointerUp: () => le(!1)
    }, _.filter((ye) => !ye.position && G === 0 || ye.position === Z).map((ye, Re) => {
      var Pe, Ne;
      return /* @__PURE__ */ Se.createElement(pR, {
        key: ye.id,
        icons: T,
        index: Re,
        toast: ye,
        defaultRichColors: S,
        duration: (Pe = C?.duration) != null ? Pe : j,
        className: C?.className,
        descriptionClassName: C?.descriptionClassName,
        invert: o,
        visibleToasts: R,
        closeButton: (Ne = C?.closeButton) != null ? Ne : y,
        interacting: K,
        position: Z,
        style: C?.style,
        unstyled: C?.unstyled,
        classNames: C?.classNames,
        cancelButtonStyle: C?.cancelButtonStyle,
        actionButtonStyle: C?.actionButtonStyle,
        closeButtonAriaLabel: C?.closeButtonAriaLabel,
        removeToast: H,
        toasts: _.filter((at) => at.position == ye.position),
        heights: k.filter((at) => at.position == ye.position),
        setHeights: F,
        expandByDefault: p,
        gap: M,
        expanded: W,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Qy = 32, Zy = -30, Jy = -6, Wy = 0.5, e0 = 2, t0 = -24, n0 = 24, a0 = -12, r0 = 12, s0 = -12, i0 = 12, l0 = -60, o0 = -20;
class Zs extends Error {
  constructor(a, s) {
    super(s), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function p1(t, a, s, i = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, u = `${Sa}${o}`, f = await fetch(u, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (f.status === 409) {
    const p = await f.json().catch(() => null), y = p?.error?.current_digest ?? "", m = p?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Zs(y, m);
  }
  if (!f.ok)
    throw new Error(await Yc(f, "apply"));
  return await f.json();
}
async function yR(t, a, s, i, o = {}) {
  const u = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(s)}/edit`, f = `${Sa}${u}`, p = await fetch(f, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (p.status === 409) {
    const y = await p.json().catch(() => null), m = y?.error?.current_digest ?? "", b = y?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Zs(m, b);
  }
  if (!p.ok)
    throw new Error(await Yc(p, "apply"));
  return await p.json();
}
async function bR(t, a, s = {}) {
  const i = `${Sa}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(i, {
    method: "DELETE",
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function xR(t, a, s, i = {}) {
  const o = `${Sa}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, u = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: s }),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!u.ok)
    throw new Error(await Yc(u, "preview"));
  return u.blob();
}
async function vc(t, a, s, i = 50, o = {}) {
  const u = `${Sa}/audit/${encodeURIComponent(a)}/${encodeURIComponent(s)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(i))}`, f = await fetch(u, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!f.ok)
    throw new Error(await Yc(f, "audit fetch"));
  return await f.json();
}
function kn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function g1(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Qy)
    return {
      message: `Chain exceeds the maximum of ${Qy} operations.`
    };
  for (const s of t.ops) {
    const i = SR(s, a);
    if (i) return i;
  }
  return null;
}
function SR(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return wR(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < Zy || t.target_lufs > Jy ? {
        opId: t.id,
        message: `Normalize target must be between ${Zy} and ${Jy} LUFS.`
      } : null;
    case "speed":
      return t.factor < Wy || t.factor > e0 ? {
        opId: t.id,
        message: `Speed factor must be between ${Wy}× and ${e0}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < t0 || t.gain_db > n0 ? {
        opId: t.id,
        message: `Volume must be between ${t0} and ${n0} dB.`
      } : null;
    case "eq3":
      for (const [s, i] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (i < a0 || i > r0)
          return {
            opId: t.id,
            message: `EQ ${s} must be between ${a0} and ${r0} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < s0 || t.semitones > i0 ? {
        opId: t.id,
        message: `Pitch must be between ${s0} and ${i0} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < l0 || t.threshold_db > o0 ? {
        opId: t.id,
        message: `Silence threshold must be between ${l0} and ${o0} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function wR(t, a, s, i) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : s <= a ? { opId: t, message: "End must be greater than start." } : i > 0 && s > i ? { opId: t, message: "End extends past source duration." } : null;
}
async function Yc(t, a) {
  const s = await t.json().catch(() => null);
  return s?.error?.message ?? s?.message ?? `${a} failed: ${t.status}`;
}
var jR = "g5r6d10", ER = "g5r6d11", NR = "g5r6d12", CR = "g5r6d13", TR = "g5r6d14", RR = "g5r6d15", _R = "g5r6d1a", MR = "g5r6d1b", AR = "g5r6d1c", DR = "g5r6d1d", kR = "g5r6d1e", zR = "g5r6d1g", OR = "g5r6d1h", LR = "g5r6d1i", $R = "g5r6d1j", UR = "g5r6d1k", BR = "g5r6d1l", VR = "g5r6d1m", IR = "g5r6d1n", HR = "g5r6d1o", c0 = "g5r6d1p", qR = "g5r6d1q", FR = "g5r6d1r", YR = "g5r6d1s", GR = "g5r6d1t", PR = "g5r6d1u", u0 = "g5r6d1v", d0 = "g5r6d1w", KR = "g5r6d1x", XR = "g5r6d1y", Gs = "g5r6d1z", QR = "g5r6d110", f0 = "g5r6d111", ZR = "g5r6d112", JR = "g5r6d113", mr = "g5r6d114", WR = "g5r6d119", e_ = "a6ki8u0", t_ = "a6ki8u1", n_ = "a6ki8u2", a_ = "a6ki8u3", r_ = "a6ki8u4", s_ = "a6ki8u5", i_ = "a6ki8u6", yf = "a6ki8u7", l_ = "a6ki8u8", o_ = "a6ki8u9", c_ = "a6ki8ua", u_ = "a6ki8ub", d_ = "a6ki8uc", f_ = "a6ki8ud", h_ = "a6ki8ue", m_ = "a6ki8uf", p_ = "a6ki8ug", g_ = "a6ki8uh", v_ = "_1lguv7x0", y_ = "_1lguv7x1", b_ = "_1lguv7x2", x_ = "_1lguv7x3", S_ = "_1lguv7x4", h0 = "_1lguv7x5", w_ = "_1lguv7x6", j_ = "_1lguv7x7", E_ = "_1lguv7x8", N_ = "_1lguv7x9", C_ = "_1lguv7xa", T_ = "_1lguv7xb", R_ = "_1lguv7xc", m0 = "_1lguv7xd", __ = "_1lguv7xe", M_ = "_1lguv7xf", A_ = "_1lguv7xg", D_ = "_1lguv7xh", v1 = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, y1 = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, k_ = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, z_ = "_4ydn54f";
function Ge({
  variant: t = "primary",
  size: a = "md",
  type: s = "button",
  loading: i = !1,
  iconOnly: o = !1,
  disabled: u,
  children: f,
  className: p,
  style: y,
  ...m
}) {
  const b = [
    v1[t],
    y1[a],
    o ? k_[a] : null,
    p
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: s,
      className: b,
      style: y,
      disabled: i || u,
      "aria-busy": i || void 0,
      ...m,
      children: [
        i ? /* @__PURE__ */ c.jsx("span", { className: z_, "aria-hidden": "true" }) : null,
        f
      ]
    }
  );
}
const O_ = 28;
function L_(t) {
  if (!t) return 1;
  let a = 0;
  for (let s = 0; s < Math.min(t.length, 12); s++)
    a = a * 33 + t.charCodeAt(s) >>> 0;
  return a || 1;
}
function $_(t, a) {
  const s = new Array(a);
  let i = t;
  for (let o = 0; o < a; o++) {
    i = (i * 9301 + 49297) % 233280;
    const u = i / 233280, f = Math.min(1, o / 6, (a - o) / 6);
    s[o] = Math.max(0.18, f * (0.32 + u * 0.68));
  }
  return s;
}
function U_(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function B_(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function V_({
  asset: t,
  presentation: a,
  usedBy: s,
  isPlaying: i,
  onTogglePlay: o,
  onRename: u,
  onCopyName: f,
  onDelete: p,
  onCreateCharacter: y,
  onPlaybackEnded: m
}) {
  const [b, v] = g.useState(!1), [w, S] = g.useState(t.displayName), [j, N] = g.useState(!1), [R, C] = g.useState(t.displayName), O = g.useRef(null), M = g.useRef(null), T = g.useMemo(() => L_(t.contentSha256), [t.contentSha256]), q = g.useMemo(() => $_(T, O_), [T]), Q = g.useMemo(() => mT(t), [t]);
  g.useEffect(() => {
    S(t.displayName);
  }, [t.displayName]), g.useEffect(() => {
    const ae = O.current;
    ae && (i && Q ? ae.play().catch(() => {
    }) : (ae.pause(), ae.currentTime = 0));
  }, [i, Q]);
  const re = async () => {
    const ae = w.trim();
    if (!ae || ae === t.displayName) {
      v(!1), S(t.displayName);
      return;
    }
    try {
      await u(ae);
    } finally {
      v(!1);
    }
  }, _ = () => {
    C(t.displayName), N(!0);
  }, V = () => {
    const ae = R.trim();
    if (!ae) {
      M.current?.focus();
      return;
    }
    N(!1), y?.(ae);
  }, k = () => {
    N(!1);
  }, F = () => {
    R.trim() ? V() : k();
  }, W = `${U_(t.durationMs)} · ${B_(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: v_, "data-playing": i ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: y_, children: [
      /* @__PURE__ */ c.jsx("span", { className: b_, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: x_, children: [
        b ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: h0,
            value: w,
            autoFocus: !0,
            onChange: (ae) => S(ae.target.value),
            onBlur: () => {
              re();
            },
            onKeyDown: (ae) => {
              ae.key === "Enter" ? (ae.preventDefault(), ae.currentTarget.blur()) : ae.key === "Escape" && (v(!1), S(t.displayName));
            },
            "aria-label": `Rename ${t.displayName}`
          }
        ) : /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: S_,
            onDoubleClick: () => v(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: w_, children: W })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: j_, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: E_,
        "data-playing": i ? "true" : "false",
        disabled: Q == null,
        title: Q ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": i ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: N_, "aria-hidden": "true", children: i ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: C_, "aria-hidden": "true", children: q.map((ae, K) => /* @__PURE__ */ c.jsx("span", { className: T_, style: { height: `${Math.round(ae * 100)}%` } }, K)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("footer", { className: R_, children: j ? /* @__PURE__ */ c.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6, width: "100%" }, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          ref: M,
          className: h0,
          style: { flex: 1, minWidth: 0 },
          value: R,
          autoFocus: !0,
          placeholder: "Character name",
          onChange: (ae) => C(ae.target.value),
          onFocus: (ae) => ae.currentTarget.select(),
          onBlur: F,
          onKeyDown: (ae) => {
            ae.key === "Enter" ? (ae.preventDefault(), V()) : ae.key === "Escape" && k();
          },
          "aria-label": "New character name"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ge,
        {
          variant: "ghost",
          size: "xs",
          iconOnly: !0,
          title: "Add character",
          "aria-label": "Confirm add character",
          onMouseDown: (ae) => ae.preventDefault(),
          onClick: V,
          children: "✓"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ge,
        {
          variant: "ghost",
          size: "xs",
          iconOnly: !0,
          title: "Cancel",
          "aria-label": "Cancel add character",
          onMouseDown: (ae) => ae.preventDefault(),
          onClick: k,
          children: "✕"
        }
      )
    ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      s.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: m0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        s.map((ae) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: __,
            style: { color: ae.color, borderColor: ae.color },
            children: ae.characterName
          },
          ae.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: m0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: M_, children: [
        y && /* @__PURE__ */ c.jsx(
          Ge,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Create character from this voice",
            "aria-label": "Create character from this voice",
            onClick: _,
            children: "＋"
          }
        ),
        /* @__PURE__ */ c.jsx(
          Ge,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Rename",
            "aria-label": "Rename voice",
            onClick: () => v(!0),
            children: "✎"
          }
        ),
        /* @__PURE__ */ c.jsx(
          Ge,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Copy name",
            "aria-label": "Copy voice name",
            onClick: f,
            children: "⧉"
          }
        ),
        p && /* @__PURE__ */ c.jsx(
          Ge,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: A_,
            title: "Delete",
            "aria-label": "Delete voice",
            onClick: p,
            children: "✕"
          }
        )
      ] })
    ] }) }),
    Q && /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: O,
        src: Q,
        preload: "none",
        className: D_,
        onEnded: m
      }
    )
  ] });
}
var I_ = "_17eol302", H_ = "_17eol303", q_ = "_17eol304", F_ = "_17eol305", Y_ = "_17eol306", G_ = "_17eol307", Ko = "_17eol308", P_ = "_17eol309", K_ = "_17eol30a", X_ = "_17eol30b", Q_ = "_17eol30c", Z_ = "_17eol30d", p0 = "_17eol30e", J_ = "_17eol30g";
function W_() {
  if (typeof MediaRecorder > "u")
    return { mime: "audio/webm", ext: "webm" };
  const t = [
    { mime: "audio/webm;codecs=opus", ext: "webm" },
    { mime: "audio/webm", ext: "webm" },
    { mime: "audio/ogg;codecs=opus", ext: "ogg" },
    { mime: "audio/mp4", ext: "m4a" }
  ];
  for (const a of t)
    if (MediaRecorder.isTypeSupported(a.mime)) return a;
  return { mime: "", ext: "webm" };
}
function e2(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function t2({
  open: t,
  defaultName: a,
  onClose: s,
  onSubmit: i
}) {
  const [o, u] = g.useState("idle"), [f, p] = g.useState(null), [y, m] = g.useState(0), [b, v] = g.useState(null), [w, S] = g.useState(a), [j, N] = g.useState(!1), R = g.useRef(null), C = g.useRef(null), O = g.useRef([]), M = g.useRef(0), T = g.useRef(null), q = g.useRef(null), Q = g.useRef({ mime: "audio/webm", ext: "webm" }), re = g.useRef(null), _ = g.useRef(null), V = g.useRef(null);
  g.useEffect(() => {
    if (t)
      return V.current = document.activeElement ?? null, requestAnimationFrame(() => {
        re.current?.scrollIntoView({ behavior: "smooth", block: "center" }), _.current?.focus();
      }), () => {
        V.current?.focus?.();
      };
  }, [t]), g.useEffect(() => {
    if (!t) return;
    const Y = ($) => {
      $.key === "Escape" && s();
    };
    return window.addEventListener("keydown", Y), () => window.removeEventListener("keydown", Y);
  }, [t, s]);
  const k = g.useCallback(
    (Y) => {
      if (Y.key !== "Tab") return;
      const $ = re.current;
      if (!$) return;
      const se = $.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (se.length === 0) return;
      const de = se[0], D = se[se.length - 1], H = document.activeElement;
      Y.shiftKey ? (H === de || H === $) && (Y.preventDefault(), D.focus()) : H === D && (Y.preventDefault(), de.focus());
    },
    []
  ), F = g.useCallback(() => {
    if (C.current) {
      for (const Y of C.current.getTracks()) Y.stop();
      C.current = null;
    }
    T.current != null && (window.clearInterval(T.current), T.current = null);
  }, []), W = g.useCallback(() => {
    F(), b && URL.revokeObjectURL(b), v(null), O.current = [], q.current = null, m(0), p(null), u("idle");
  }, [b, F]);
  if (g.useEffect(() => {
    t || (W(), S(a));
  }, [t, a, W]), g.useEffect(() => () => {
    F(), b && URL.revokeObjectURL(b);
  }, [b, F]), !t) return null;
  const ae = async () => {
    p(null), u("preparing");
    try {
      const Y = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      C.current = Y;
      const $ = W_();
      Q.current = $;
      const se = $.mime ? new MediaRecorder(Y, { mimeType: $.mime }) : new MediaRecorder(Y);
      R.current = se, O.current = [], se.ondataavailable = (de) => {
        de.data && de.data.size > 0 && O.current.push(de.data);
      }, se.onstop = () => {
        const de = $.mime || "audio/webm", D = new Blob(O.current, { type: de }), H = new File([D], `${w || a || "recording"}.${$.ext}`, {
          type: de
        });
        q.current = H;
        const Z = URL.createObjectURL(D);
        v(Z), u("ready"), F();
      }, se.start(), M.current = Date.now(), m(0), T.current = window.setInterval(() => {
        m(Date.now() - M.current);
      }, 200), u("recording");
    } catch (Y) {
      const $ = Y instanceof Error ? Y.message : "could not access microphone";
      p($), u($.toLowerCase().includes("denied") ? "denied" : "error"), F();
    }
  }, K = () => {
    const Y = R.current;
    Y && Y.state !== "inactive" && Y.stop(), T.current != null && (window.clearInterval(T.current), T.current = null);
  }, le = async () => {
    const Y = q.current;
    if (!Y) return;
    const $ = (w || a).trim();
    if (!$) {
      p("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await i(Y, $), s();
    } catch (se) {
      p(se instanceof Error ? se.message : "upload failed");
    } finally {
      N(!1);
    }
  }, A = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: I_, role: "presentation", onClick: s, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: re,
      className: H_,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (Y) => Y.stopPropagation(),
      onKeyDown: k,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: q_, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: F_, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: Y_,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: A
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: Q_, "aria-live": "polite", children: e2(y) }),
        /* @__PURE__ */ c.jsxs("div", { className: G_, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: _,
              type: "button",
              className: Ko,
              "data-tone": "danger",
              onClick: () => {
                ae();
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: p0, "aria-hidden": "true" }),
                "Record"
              ]
            }
          ),
          o === "preparing" && /* @__PURE__ */ c.jsx("button", { type: "button", className: Ko, disabled: !0, children: "Starting…" }),
          o === "recording" && /* @__PURE__ */ c.jsxs(
            "button",
            {
              type: "button",
              className: Ko,
              "data-tone": "danger",
              "data-active": "true",
              onClick: K,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: p0, "aria-hidden": "true" }),
                "Stop"
              ]
            }
          ),
          o === "ready" && /* @__PURE__ */ c.jsx(
            "button",
            {
              type: "button",
              className: Ko,
              onClick: () => {
                W();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        b && /* @__PURE__ */ c.jsx("audio", { className: Z_, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: P_, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: K_,
              value: w,
              onChange: (Y) => S(Y.target.value),
              placeholder: a
            }
          )
        ] }),
        f && /* @__PURE__ */ c.jsx("div", { className: X_, children: f }),
        /* @__PURE__ */ c.jsxs("div", { className: J_, children: [
          /* @__PURE__ */ c.jsx(Ge, { variant: "ghost", size: "md", onClick: s, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            Ge,
            {
              variant: "primary",
              size: "md",
              onClick: () => {
                le();
              },
              disabled: o !== "ready" || j,
              loading: j,
              children: j ? "Saving…" : "Save voice"
            }
          )
        ] })
      ]
    }
  ) });
}
function n2({
  deploymentId: t,
  voiceAssets: a,
  mappings: s,
  characterColors: i,
  onVoiceAssetsChange: o,
  onCreateCharacterFromVoice: u
}) {
  const [f, p] = g.useState(""), [y, m] = g.useState("all"), [b, v] = g.useState(!1), [w, S] = g.useState(null), [j, N] = g.useState(!1), [R, C] = g.useState(!1), O = g.useRef(null), M = g.useCallback(
    (K) => "upload",
    []
  ), T = g.useMemo(() => {
    const K = f.trim().toLowerCase();
    return a.filter((le) => {
      const A = M(le);
      return !(y === "uploaded" && A !== "upload" || y === "preset" && A !== "preset" || K && !le.displayName.toLowerCase().includes(K));
    });
  }, [a, f, y, M]), q = g.useMemo(
    () => a.filter((K) => M(K) === "upload").length,
    [a, M]
  ), Q = g.useCallback(
    (K) => {
      const le = [], A = /* @__PURE__ */ new Set();
      for (const Y of s)
        Y.speakerVoiceAssetId === K && (A.has(Y.characterName) || (A.add(Y.characterName), le.push({
          characterName: Y.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: i[Y.characterName] ?? "#ba9eff"
        })));
      return le;
    },
    [s, i]
  ), re = g.useCallback(
    async (K) => {
      const le = Array.from(K).slice(0, 8);
      if (le.length !== 0) {
        C(!0);
        try {
          const A = [];
          for (const Y of le) {
            if (!Y.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(Y.name)) {
              hn.error(`${Y.name}: not an audio file`);
              continue;
            }
            const $ = Y.name.replace(/\.[^.]+$/, "");
            try {
              const se = await Nc(t, Y, $, "speaker");
              A.push(se), hn.success(`Added ${se.displayName}`);
            } catch (se) {
              hn.error(se instanceof Error ? se.message : `${Y.name}: upload failed`);
            }
          }
          A.length > 0 && o([...A, ...a]);
        } finally {
          C(!1);
        }
      }
    },
    [t, a, o]
  ), _ = (K) => {
    K.preventDefault(), v(!1), K.dataTransfer?.files && re(K.dataTransfer.files);
  }, V = g.useCallback(async () => {
    const K = window.prompt("Paste an audio URL (https://…)");
    if (K)
      try {
        const le = await fetch(K);
        if (!le.ok) throw new Error(`fetch failed: ${le.status}`);
        const A = await le.blob(), Y = K.split("/").pop()?.split("?")[0] ?? "voice.wav", $ = new File([A], Y, { type: A.type || "audio/wav" });
        await re([$]);
      } catch (le) {
        hn.error(le instanceof Error ? le.message : "could not fetch URL");
      }
  }, [re]), k = g.useCallback(
    async (K, le) => {
      try {
        const A = await hT(t, K, le);
        o(
          a.map((Y) => Y.voiceAssetId === K ? A : Y)
        ), hn.success(`Renamed to ${A.displayName}`);
      } catch (A) {
        hn.error(A instanceof Error ? A.message : "rename failed");
      }
    },
    [t, a, o]
  ), F = g.useCallback((K) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(K), hn.success("Copied name")) : hn.error("Clipboard unavailable");
  }, []), W = g.useCallback(
    async (K) => {
      if (window.confirm(`Delete "${K.displayName}"? Mappings using it will reset.`))
        try {
          await fT(t, K.voiceAssetId), o(a.filter((A) => A.voiceAssetId !== K.voiceAssetId)), hn.success(`Deleted ${K.displayName}`);
        } catch (A) {
          hn.error(A instanceof Error ? A.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: e_, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: t_,
        "data-over": b ? "true" : "false",
        onDragOver: (K) => {
          K.preventDefault(), v(!0);
        },
        onDragLeave: () => v(!1),
        onDrop: _,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: n_, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: a_, children: [
            /* @__PURE__ */ c.jsxs("div", { className: r_, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: s_, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: i_, children: [
              "or",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: yf,
                  onClick: () => O.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: yf,
                  onClick: () => {
                    V();
                  },
                  children: "paste URL"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: yf,
                  onClick: () => N(!0),
                  children: "record from mic"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            Ge,
            {
              variant: "primary",
              size: "md",
              disabled: R,
              onClick: () => O.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: O,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: g_,
              onChange: (K) => {
                K.target.files && (re(K.target.files), K.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: l_, children: [
      /* @__PURE__ */ c.jsxs("label", { className: o_, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: c_,
            value: f,
            onChange: (K) => p(K.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: u_, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([K, le]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: d_,
          "data-active": y === K ? "true" : "false",
          onClick: () => m(K),
          children: le
        },
        K
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: m_, children: [
        /* @__PURE__ */ c.jsx("span", { className: p_, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          q,
          " uploaded"
        ] })
      ] })
    ] }),
    T.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: h_, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: f_, children: T.map((K) => {
      const le = M(K);
      return /* @__PURE__ */ c.jsx(
        V_,
        {
          asset: K,
          presentation: le,
          usedBy: Q(K.voiceAssetId),
          isPlaying: w === K.voiceAssetId,
          onTogglePlay: () => S((A) => A === K.voiceAssetId ? null : K.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (A) => k(K.voiceAssetId, A),
          onCopyName: () => F(K.displayName),
          onDelete: le === "upload" ? () => void W(K) : void 0,
          onCreateCharacter: u ? (A) => u(K, A) : void 0
        },
        K.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      t2,
      {
        open: j,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => N(!1),
        onSubmit: async (K, le) => {
          await ae(K, le);
        }
      }
    )
  ] });
  async function ae(K, le) {
    C(!0);
    try {
      const A = await Nc(t, K, le, "speaker");
      o([A, ...a]), hn.success(`Recorded ${A.displayName}`);
    } catch (A) {
      throw hn.error(A instanceof Error ? A.message : "upload failed"), A;
    } finally {
      C(!1);
    }
  }
}
async function a2(t) {
  return Ct(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function r2(t, a, s) {
  return Ct("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: s })
  });
}
async function s2(t, a) {
  await Ct(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var g0 = "_190jlds0", i2 = "_190jlds1", l2 = "_190jlds2", o2 = "_190jlds3", c2 = "_190jlds4", u2 = "_190jlds5", d2 = "_190jlds6", f2 = "_190jlds7", h2 = "_190jlds8", m2 = "_190jlds9", v0 = "_190jldsa", p2 = "_190jldsb", y0 = "_190jldsc", g2 = "_190jldsd", v2 = "_190jldse", y2 = "_190jldsf";
function b2({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: s,
  onRevertToChain: i,
  emptyHint: o
}) {
  const [u, f] = g.useState(() => $s(a[0])), [p, y] = g.useState([]), [m, b] = g.useState(!1), [v, w] = g.useState(null), [S, j] = g.useState(!1), [N, R] = g.useState(null), C = g.useMemo(
    () => a.find((T) => $s(T) === u) ?? a[0],
    [a, u]
  );
  g.useEffect(() => {
    a.length && (a.some((T) => $s(T) === u) || f($s(a[0])));
  }, [a, u]), g.useEffect(() => {
    if (!C) {
      y([]);
      return;
    }
    let T = !1;
    return b(!0), w(null), vc(t, C.kind, C.id, 50).then((q) => {
      T || y(q.entries);
    }).catch((q) => {
      T || w(q instanceof Error ? q.message : "audit fetch failed");
    }).finally(() => {
      T || b(!1);
    }), () => {
      T = !0;
    };
  }, [t, C]);
  const O = g.useCallback(() => {
    if (!C) return;
    const T = {
      deploymentId: t,
      targetKind: C.kind,
      targetId: C.id,
      targetLabel: C.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: p
    }, q = new Blob([JSON.stringify(T, null, 2)], {
      type: "application/json"
    }), Q = URL.createObjectURL(q), re = document.createElement("a");
    re.href = Q, re.download = `audit-${C.kind}-${C.id}-${Date.now()}.json`, document.body.appendChild(re), re.click(), document.body.removeChild(re), URL.revokeObjectURL(Q);
  }, [t, p, C]), M = g.useCallback(async () => {
    if (!(!C || !s) && window.confirm(
      `Revert "${C.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      j(!0);
      try {
        await s(C);
        const T = await vc(t, C.kind, C.id, 50);
        y(T.entries);
      } catch (T) {
        w(T instanceof Error ? T.message : "revert failed");
      } finally {
        j(!1);
      }
    }
  }, [t, s, C]);
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: g0, children: /* @__PURE__ */ c.jsx("p", { className: y0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: g0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: i2, children: [
      /* @__PURE__ */ c.jsxs("div", { className: l2, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: v0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: o2,
            value: u,
            onChange: (T) => f(T.target.value),
            children: a.map((T) => /* @__PURE__ */ c.jsxs("option", { value: $s(T), children: [
              T.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              T.label
            ] }, $s(T)))
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: c2, children: [
        /* @__PURE__ */ c.jsx(
          Ge,
          {
            variant: "ghost",
            size: "sm",
            onClick: O,
            disabled: p.length === 0 || m,
            children: "Export JSON"
          }
        ),
        s && /* @__PURE__ */ c.jsx(
          Ge,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void M(),
            disabled: S || !C,
            children: S ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsx("div", { className: v2, children: v }),
    m && !v && /* @__PURE__ */ c.jsx("div", { className: y2, "aria-live": "polite", children: "Loading edit history…" }),
    !m && !v && p.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: y0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: g2, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !m && !v && p.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: u2, children: p.map((T) => {
      const q = i && C && !!T.chain_snapshot_json && T.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: d2, children: [
        /* @__PURE__ */ c.jsx("span", { className: f2, children: x2(T.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: h2, children: T.operation_count === 0 ? "cleared" : `${T.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: m2, title: T.digest_after, children: [
          T.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: v0, children: T.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: p2,
            style: {
              background: `color-mix(in oklab, ${T.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: T.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: T.digest_before === "" || !T.digest_before ? "create" : T.operation_count === 0 ? "clear" : "update"
          }
        ),
        q && /* @__PURE__ */ c.jsx(
          Ge,
          {
            variant: "ghost",
            size: "xs",
            disabled: S || N !== null,
            onClick: async () => {
              if (!(!C || !T.chain_snapshot_json) && !(N !== null || S) && window.confirm(
                `Replay this ${T.operation_count}-op chain on "${C.label}"? A new audit entry will be written.`
              )) {
                R(T.entry_id);
                try {
                  await i(C, T.chain_snapshot_json, T);
                  const Q = await vc(
                    t,
                    C.kind,
                    C.id,
                    50
                  );
                  y(Q.entries);
                } catch (Q) {
                  w(Q instanceof Error ? Q.message : "revert failed");
                } finally {
                  R(null);
                }
              }
            },
            children: N === T.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, T.entry_id);
    }) })
  ] });
}
function $s(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function x2(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var S2 = "_1uzgubz0", w2 = "_1uzgubz1", j2 = "_1uzgubz2", E2 = "_1uzgubz3", N2 = "_1uzgubz4", C2 = "_1uzgubz5", T2 = "_1uzgubz6", R2 = "_1uzgubz7", b0 = "_1uzgubz8", _2 = "_1uzgubz9", b1 = "_1uzgubza", x1 = "_1uzgubzb", M2 = "_1uzgubzc", A2 = "_1uzgubzd", Xo = "_1uzgubze", Qo = "_1uzgubzf", D2 = "_1uzgubzg", k2 = "_1uzgubzh", x0 = "_1uzgubzi", S0 = "_1uzgubzj", w0 = "_1uzgubzk", j0 = "_1uzgubzl", E0 = "_1uzgubzm", z2 = "_1uzgubzn", O2 = "_1uzgubzo", L2 = "_1uzgubzp", $2 = "_1uzgubzq";
function U2({
  characterName: t,
  color: a,
  lineCount: s,
  mapping: i,
  voiceAssets: o,
  presets: u,
  active: f,
  onToggle: p,
  onAssignVoiceAsset: y,
  onAssignPreset: m,
  onUploadFile: b,
  onClearMapping: v,
  onRename: w
}) {
  const [S, j] = g.useState(!1), N = i ? o.find((M) => M.voiceAssetId === i.speakerVoiceAssetId) : null, R = i?.defaultVectorPresetId ? u.find((M) => M.presetId === i.defaultVectorPresetId) ?? null : null, C = (t[0] ?? "?").toUpperCase(), O = i !== null;
  return /* @__PURE__ */ c.jsxs("div", { className: `${S2}${f ? ` ${w2}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: j2,
        onClick: p,
        "aria-expanded": f,
        children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: E2,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: C
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: N2, children: [
            /* @__PURE__ */ c.jsx("span", { className: C2, style: { color: a }, children: t }),
            /* @__PURE__ */ c.jsxs("span", { className: T2, children: [
              s,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: R2, children: [
            N ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: b0, children: N.displayName }),
              N.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                N0(N.durationMs),
                " ·",
                " ",
                N.sampleRate ? `${N.sampleRate} Hz` : "—"
              ] })
            ] }) : R ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: b0, children: R.presetName }),
              /* @__PURE__ */ c.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ c.jsx("span", { children: "no voice assigned" }),
            i?.voiceAssetChainDigest && /* @__PURE__ */ c.jsxs("span", { className: M2, children: [
              "chain · ",
              i.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: `${_2} ${O ? b1 : x1}`,
              children: O ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    f && /* @__PURE__ */ c.jsxs("div", { className: A2, children: [
      O && s === 0 && w && /* @__PURE__ */ c.jsxs("div", { className: Xo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Qo, children: "Character name" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            defaultValue: t,
            placeholder: "Character name",
            "aria-label": "Rename character",
            style: {
              flex: 1,
              minWidth: 0,
              background: "var(--surface-floor, #0c0e10)",
              border: "1px solid rgba(70,72,74,0.4)",
              borderRadius: 8,
              color: "var(--on-surface)",
              padding: "6px 10px",
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              outline: "none"
            },
            onKeyDown: (M) => {
              M.key === "Enter" && (M.preventDefault(), M.currentTarget.blur());
            },
            onBlur: (M) => {
              const T = M.target.value.trim();
              T && T !== t && w(T);
            }
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: Xo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Qo, children: "Drop new audio" }),
        /* @__PURE__ */ c.jsxs(
          "label",
          {
            className: `${D2}${S ? ` ${k2}` : ""}`,
            onDragEnter: (M) => {
              M.preventDefault(), j(!0);
            },
            onDragOver: (M) => M.preventDefault(),
            onDragLeave: () => j(!1),
            onDrop: (M) => {
              M.preventDefault(), j(!1);
              const T = M.dataTransfer.files?.[0];
              T && b && b(T);
            },
            children: [
              /* @__PURE__ */ c.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (M) => {
                    const T = M.target.files?.[0];
                    T && b && b(T);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ c.jsxs("div", { className: Xo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Qo, children: "Reference library" }),
        /* @__PURE__ */ c.jsx("div", { className: x0, children: o.map((M) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${S0}${i?.speakerVoiceAssetId === M.voiceAssetId ? ` ${w0}` : ""}`,
            onClick: () => y(M.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: j0, children: M.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: E0, children: [
                M.durationMs != null ? N0(M.durationMs) : "—",
                " ",
                "·",
                " ",
                M.sampleRate ? `${M.sampleRate} Hz` : "—"
              ] })
            ]
          },
          M.voiceAssetId
        )) })
      ] }),
      u.length > 0 && m && /* @__PURE__ */ c.jsxs("div", { className: Xo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Qo, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: x0, children: u.map((M) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${S0}${i?.defaultVectorPresetId === M.presetId ? ` ${w0}` : ""}`,
            onClick: () => m(M.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: j0, children: M.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: E0, children: "preset · vector" })
            ]
          },
          M.presetId
        )) })
      ] }),
      O && v && /* @__PURE__ */ c.jsx(Ge, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function N0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function B2({
  unmappedCount: t,
  totalCount: a,
  children: s,
  emptyHint: i
}) {
  if (a === 0)
    return /* @__PURE__ */ c.jsx("p", { className: $2, children: i ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("header", { className: z2, children: /* @__PURE__ */ c.jsx(
      "span",
      {
        className: `${O2} ${o ? b1 : x1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: L2, children: s })
  ] });
}
async function vl() {
  return Ct("/runtime/health");
}
async function V2() {
  await Ct("/runtime/start", { method: "POST" });
}
async function I2() {
  return Ct("/runtime/stop", { method: "POST" });
}
function S1(t) {
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
var H2 = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function Dn({
  severity: t,
  children: a,
  role: s,
  ariaLive: i,
  className: o,
  style: u
}) {
  const f = [H2[t], o].filter(Boolean).join(" "), p = s ?? (t === "error" ? "alert" : "status"), y = i ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: f, role: p, "aria-live": y, style: u, children: a });
}
var w1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, j1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, q2 = "_13bb4njb";
function Jr({
  tone: t,
  size: a = "sm",
  pulse: s = !1,
  children: i,
  className: o,
  style: u,
  title: f
}) {
  const p = s && t !== "faint", y = [w1[a], j1[t], p ? q2 : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: y, style: u, title: f, children: i });
}
const F2 = 4e3;
function Y2({ deployment: t }) {
  const [a, s] = g.useState(null), [i, o] = g.useState(null);
  g.useEffect(() => {
    let p = !1;
    const y = async () => {
      try {
        const b = await vl();
        p || (s(b), o(null));
      } catch (b) {
        p || o(K2(b));
      }
    };
    y();
    const m = setInterval(y, F2);
    return () => {
      p = !0, clearInterval(m);
    };
  }, []);
  const u = a?.badge ?? "not_installed", f = i?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ c.jsxs("output", { className: QR, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: Gs, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: Gs, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Jr, { tone: G2(u), pulse: u === "starting" || u === "installing", children: S1(u) }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Gs, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: P2(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: Gs, children: "VRAM" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    f && /* @__PURE__ */ c.jsxs(Dn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "IndexTTS-2 model is not installed." }),
      " ",
      "Open ",
      /* @__PURE__ */ c.jsx("em", { children: "Settings → Dependencies → Install all" }),
      " to download the required artifacts, then retry."
    ] }),
    i && !f && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: i })
  ] });
}
function G2(t) {
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
function P2(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function K2(t) {
  return t instanceof ni || t instanceof Error ? t.message : "unknown error";
}
const Cc = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, Gc = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Ia = 1e-3;
function X2(t, a, s) {
  for (const i of Object.keys(Cc)) {
    const o = Cc[i];
    if (Math.abs(o.low - t) < Ia && Math.abs(o.mid - a) < Ia && Math.abs(o.high - s) < Ia)
      return i;
  }
  return "custom";
}
function Q2(t) {
  let a = J2();
  for (const s of t.ops)
    a = Z2(a, s);
  return a;
}
function Z2(t, a) {
  switch (a.mode) {
    case "gain":
      return { ...t, volumeDb: a.gain_db };
    case "eq3":
      return {
        ...t,
        eq3: {
          low: a.low_db,
          mid: a.mid_db,
          high: a.high_db,
          preset: X2(a.low_db, a.mid_db, a.high_db)
        }
      };
    case "speed":
      return { ...t, speed: { mode: "audio", value: a.factor } };
    case "pitch_shift":
      return { ...t, pitchSt: a.semitones };
    case "normalize":
      return {
        ...t,
        normalize: { mode: "loudness", targetDbOrLufs: a.target_lufs }
      };
    case "fade_in":
      return {
        ...t,
        fade: { ...t.fade, inS: a.duration_ms / 1e3 }
      };
    case "fade_out":
      return {
        ...t,
        fade: { ...t.fade, outS: a.duration_ms / 1e3 }
      };
    case "silence_strip":
      return {
        ...t,
        silence: { enabled: !0, thresholdDb: a.threshold_db }
      };
    default:
      return t;
  }
}
function J2() {
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
function Er(t, a) {
  return t.ops.filter((s) => s.mode !== a);
}
function Nr(t, a) {
  return [...t, a];
}
function W2(t, a) {
  const s = Er(t, "gain");
  if (Math.abs(a) < Ia) return { ...t, ops: s };
  const i = { id: kn(), mode: "gain", gain_db: a };
  return { ...t, ops: Nr(s, i) };
}
function eM(t, a, s, i) {
  const o = Er(t, "eq3");
  if (Math.abs(a) < Ia && Math.abs(s) < Ia && Math.abs(i) < Ia)
    return { ...t, ops: o };
  const u = {
    id: kn(),
    mode: "eq3",
    low_db: a,
    mid_db: s,
    high_db: i
  };
  return { ...t, ops: Nr(o, u) };
}
function tM(t, a) {
  const s = Er(t, "speed");
  if (Math.abs(a - 1) < Ia) return { ...t, ops: s };
  const i = { id: kn(), mode: "speed", factor: a };
  return { ...t, ops: Nr(s, i) };
}
function nM(t, a) {
  const s = Er(t, "pitch_shift");
  if (Math.abs(a) < Ia) return { ...t, ops: s };
  const i = {
    id: kn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Nr(s, i) };
}
function aM(t, a, s) {
  const i = Er(t, "normalize");
  if (a === "off") return { ...t, ops: i };
  const o = {
    id: kn(),
    mode: "normalize",
    target_lufs: s
  };
  return { ...t, ops: Nr(i, o) };
}
function rM(t, a) {
  const s = Er(t, "fade_in");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: kn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(s, i) };
}
function sM(t, a) {
  const s = Er(t, "fade_out");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: kn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(s, i) };
}
function iM(t, a, s) {
  const i = Er(t, "silence_strip");
  if (!a) return { ...t, ops: i };
  const o = {
    id: kn(),
    mode: "silence_strip",
    threshold_db: s
  };
  return { ...t, ops: Nr(i, o) };
}
const E1 = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function N1(t, a) {
  const s = {
    ...t,
    ops: t.ops.filter((u) => !E1.has(u.mode))
  };
  let o = W2({ version: 1, ops: [] }, a.volumeDb);
  return o = eM(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = tM(o, a.speed.value)), o = nM(o, a.pitchSt), o = aM(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = rM(o, a.fade.inS), o = sM(o, a.fade.outS), o = iM(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...s, ops: [...s.ops, ...o.ops] };
}
function C1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((s) => E1.has(s.mode))
  };
  return Q2(a);
}
var lM = "_1rsa80i0", oM = "_1rsa80i1", cM = "_1rsa80i2", uM = "_1rsa80i3", dM = "_1rsa80i4", fM = "_1rsa80i5", hM = "_1rsa80i6", mM = "_1rsa80i7", pM = "_1rsa80i8", gM = "_1rsa80i9";
const T1 = ["flat", "warm", "bright", "voice", "telephone"], el = -12, Zo = 12, vM = 0.5;
function yM(t) {
  const { low: a, mid: s, high: i, preset: o, onChange: u, disabled: f } = t, p = (m) => {
    const b = Cc[m];
    u(b.low, b.mid, b.high, m);
  }, y = (m, b) => {
    const v = { low: a, mid: s, high: i, [m]: b }, w = xM(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, w);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: lM, children: [
    /* @__PURE__ */ c.jsxs("div", { className: oM, role: "group", "aria-label": "EQ presets", children: [
      T1.map((m) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: cM,
          "data-active": o === m,
          onClick: () => p(m),
          disabled: f,
          children: m
        },
        m
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: uM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: dM, children: [
      /* @__PURE__ */ c.jsx(
        bf,
        {
          label: "Low",
          value: a,
          onChange: (m) => y("low", m),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        bf,
        {
          label: "Mid",
          value: s,
          onChange: (m) => y("mid", m),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        bf,
        {
          label: "High",
          value: i,
          onChange: (m) => y("high", m),
          disabled: f
        }
      )
    ] })
  ] });
}
function bf({ label: t, value: a, onChange: s, disabled: i }) {
  const o = (a - el) / (Zo - el) * 100, u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: fM, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: u, className: hM, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: el,
        max: Zo,
        step: vM,
        value: a,
        disabled: i,
        className: pM,
        style: { "--fill": `${o}%` },
        onChange: (f) => s(Number(f.target.value)),
        "aria-valuemin": el,
        "aria-valuemax": Zo,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: mM, children: bM(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: gM, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: el }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Zo
      ] })
    ] })
  ] });
}
function bM(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const xf = 1e-3;
function xM(t, a, s) {
  for (const i of T1) {
    const o = Cc[i];
    if (Math.abs(o.low - t) < xf && Math.abs(o.mid - a) < xf && Math.abs(o.high - s) < xf)
      return i;
  }
  return "custom";
}
var SM = "_85bhwb0", wM = "_85bhwb1", C0 = "_85bhwb2", jM = "_85bhwb3", EM = "_85bhwb4", NM = "_85bhwb5", CM = "_85bhwb6", TM = "_85bhwb7";
const Jo = 0.5, Sf = 2, RM = 0.05;
function _M(t) {
  const { mode: a, value: s, supportsSynthSpeed: i, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, p = (s - Jo) / (Sf - Jo) * 100, y = g.useId(), m = (v) => o(v, s), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: SM, children: [
    i ? /* @__PURE__ */ c.jsxs("div", { className: wM, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: C0,
          "data-active": a === "audio",
          onClick: () => m("audio"),
          disabled: f,
          children: "Audio"
        }
      ),
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: C0,
          "data-active": a === "synth",
          onClick: () => m("synth"),
          disabled: f,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: jM, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: y,
          type: "range",
          min: Jo,
          max: Sf,
          step: RM,
          value: s,
          disabled: f,
          className: EM,
          style: { "--fill": `${p}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Jo,
          "aria-valuemax": Sf,
          "aria-valuenow": s,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: NM, children: `${s.toFixed(2)}×` })
    ] }),
    a === "synth" && i ? /* @__PURE__ */ c.jsxs("div", { className: CM, children: [
      /* @__PURE__ */ c.jsx(
        Ge,
        {
          variant: "primary",
          size: "sm",
          onClick: u,
          disabled: f || !u,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: TM, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var MM = "kgszk50", AM = "kgszk51", T0 = "kgszk52", DM = "kgszk53", kM = "kgszk54", R1 = "kgszk55", zM = "kgszk56", OM = "kgszk58", Qh = "kgszk59", _1 = "kgszk5a", Zh = "kgszk5b", LM = "kgszk5c", $M = "kgszk5d", UM = "kgszk5e", R0 = "kgszk5f", _0 = "kgszk5g", M0 = "kgszk5h", BM = "kgszk5i", VM = "kgszk5j", IM = "kgszk5l", yl = "kgszk5m", bl = "kgszk5n";
const HM = -24, qM = 24, FM = 0.5, YM = -12, GM = 12, PM = 0.5, KM = -30, XM = -6, QM = -12, ZM = 0, Wo = -60, wf = -20;
function Jh(t) {
  const {
    state: a,
    onChange: s,
    supportsSynthSpeed: i,
    onReRenderAtSynthTime: o,
    onSliderFlush: u,
    pendingExecution: f = !1,
    disabled: p = !1,
    onApply: y,
    applyLabel: m = "Apply edit"
  } = t, b = (S) => {
    s({ ...a, ...S });
  }, v = tA(a), w = (S) => {
    const j = S.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: MM, onPointerDownCapture: w, children: [
    /* @__PURE__ */ c.jsxs("div", { className: AM, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: DM, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: T0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      f ? /* @__PURE__ */ c.jsxs("span", { className: T0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: kM, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      A0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: HM,
        max: qM,
        step: FM,
        format: nA,
        value: a.volumeDb,
        onChange: (S) => b({ volumeDb: S }),
        disabled: p
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
      /* @__PURE__ */ c.jsx("span", { className: bl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        yM,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: p,
          onChange: (S, j, N, R) => b({ eq3: { low: S, mid: j, high: N, preset: R } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
      /* @__PURE__ */ c.jsx("span", { className: bl, children: "Speed" }),
      /* @__PURE__ */ c.jsx(
        _M,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: i,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: p,
          onChange: (S, j) => b({ speed: { mode: S, value: j } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(
      A0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: YM,
        max: GM,
        step: PM,
        format: aA,
        value: a.pitchSt,
        onChange: (S) => b({ pitchSt: S }),
        disabled: p
      }
    ),
    /* @__PURE__ */ c.jsx(
      JM,
      {
        normalize: a.normalize,
        disabled: p,
        onChange: (S) => b({ normalize: S })
      }
    ),
    /* @__PURE__ */ c.jsx(
      WM,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: p,
        onChange: (S, j) => b({ fade: { ...a.fade, inS: S, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      eA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: p,
        onChange: (S, j) => b({ silence: { enabled: S, thresholdDb: j } })
      }
    ),
    y ? /* @__PURE__ */ c.jsxs("div", { className: IM, children: [
      /* @__PURE__ */ c.jsx(
        Ge,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => s(Gc),
          disabled: p,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx(Ge, { variant: "primary", size: "md", onClick: y, disabled: p, children: m })
    ] }) : null
  ] });
}
function A0(t) {
  const { label: a, sub: s, min: i, max: o, step: u, format: f, value: p, onChange: y, disabled: m } = t, b = (p - i) / (o - i) * 100, v = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: R1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: zM, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: OM, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: _1, children: s })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: v,
        type: "range",
        min: i,
        max: o,
        step: u,
        value: p,
        disabled: m,
        className: Zh,
        style: { "--fill": `${b}%` },
        onChange: (w) => y(Number(w.target.value)),
        "aria-valuemin": i,
        "aria-valuemax": o,
        "aria-valuenow": p
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Qh, children: f(p) })
  ] });
}
function JM({ normalize: t, onChange: a, disabled: s }) {
  const o = t.mode === "loudness" ? { min: KM, max: XM, step: 0.5, suffix: "LUFS" } : { min: QM, max: ZM, step: 0.5, suffix: "dB" }, u = rA(t.targetDbOrLufs, o.min, o.max), f = (u - o.min) / (o.max - o.min) * 100, p = (y) => {
    if (y === "off") {
      a({ mode: y, targetDbOrLufs: t.targetDbOrLufs });
      return;
    }
    if (y === "peak") {
      a({ mode: y, targetDbOrLufs: -1 });
      return;
    }
    a({ mode: y, targetDbOrLufs: -16 });
  };
  return /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
    /* @__PURE__ */ c.jsx("span", { className: bl, children: "Normalize" }),
    /* @__PURE__ */ c.jsx("div", { className: LM, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((y) => {
      const m = y === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: $M,
          "data-active": t.mode === y,
          disabled: s || m,
          onClick: () => p(y),
          title: m ? "Peak normalize is not yet supported by the worker. Use Loudness (LUFS) instead." : void 0,
          children: [
            y,
            m ? " (soon)" : ""
          ]
        },
        y
      );
    }) }),
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: R1, children: [
      /* @__PURE__ */ c.jsx("span", { className: _1, children: "Target" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: u,
          disabled: s,
          className: Zh,
          style: { "--fill": `${f}%` },
          onChange: (y) => a({ mode: t.mode, targetDbOrLufs: Number(y.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": u,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Qh, children: [
        u.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function WM({ inS: t, outS: a, onChange: s, disabled: i }) {
  const o = g.useId(), u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
    /* @__PURE__ */ c.jsx("span", { className: bl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: UM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: R0, children: [
        /* @__PURE__ */ c.jsx("label", { className: _0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: i,
            className: M0,
            onChange: (f) => s(Math.max(0, Number(f.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: R0, children: [
        /* @__PURE__ */ c.jsx("label", { className: _0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: i,
            className: M0,
            onChange: (f) => s(t, Math.max(0, Number(f.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function eA({ enabled: t, thresholdDb: a, onChange: s, disabled: i }) {
  const o = (a - Wo) / (wf - Wo) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
    /* @__PURE__ */ c.jsx("span", { className: bl, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: BM, children: [
      /* @__PURE__ */ c.jsxs("label", { className: VM, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: t,
            disabled: i,
            onChange: (u) => s(u.target.checked, a)
          }
        ),
        "Enabled"
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: Wo,
          max: wf,
          step: 1,
          value: a,
          disabled: i || !t,
          className: Zh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => s(t, Number(u.target.value)),
          "aria-valuemin": Wo,
          "aria-valuemax": wf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Qh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Us = 1e-3;
function tA(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Us && a.push("gain"), (Math.abs(t.eq3.low) >= Us || Math.abs(t.eq3.mid) >= Us || Math.abs(t.eq3.high) >= Us) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Us && a.push("speed"), Math.abs(t.pitchSt) >= Us && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function nA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function aA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function rA(t, a, s) {
  return Number.isFinite(t) ? Math.max(a, Math.min(s, t)) : a;
}
var sA = "skdk4g0", iA = "skdk4g1", D0 = "skdk4g2", lA = "skdk4g3", oA = "skdk4g4", cA = "skdk4g5", uA = "skdk4g6", dA = "skdk4g7", fA = "skdk4g8", hA = "skdk4g9", mA = "skdk4ga", pA = "skdk4gb", gA = "skdk4gc", vA = "skdk4gd", k0 = "skdk4ge", z0 = "skdk4gf", yA = "skdk4gg", O0 = "skdk4gh", L0 = "skdk4gi", bA = "skdk4gj", xA = "skdk4gk", SA = "skdk4gl", $0 = "skdk4gm", wA = "skdk4gn", jA = "skdk4gp", EA = "skdk4gq", NA = "skdk4gr", CA = "skdk4gs", TA = "skdk4gt", RA = "skdk4gu", _A = "skdk4gv", U0 = "skdk4gw", MA = "skdk4gx", AA = "skdk4gy", DA = "skdk4gz", kA = "skdk4g10", zA = "cgsfgh1", OA = "cgsfgh2", LA = "cgsfgh3", $A = "cgsfgh4", UA = "cgsfgh5", BA = "cgsfgh6", VA = "cgsfgh7", IA = "cgsfgh8", HA = "cgsfgh9", qA = "cgsfgha", FA = "cgsfghb", YA = "cgsfghc", GA = "cgsfghd", PA = "cgsfghe", KA = "cgsfghm", XA = "cgsfghn", QA = "cgsfgho", ZA = "cgsfghp";
const nn = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], xl = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, Js = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, M1 = 0.05;
function JA(t) {
  let a = null, s = -1 / 0;
  for (const i of nn) {
    const o = t[i];
    o > s && (s = o, a = i);
  }
  return !a || s <= M1 ? null : a;
}
function A1(t, a = 3) {
  return nn.map((s) => ({ key: s, label: xl[s], value: t[s] })).filter((s) => s.value > M1).sort((s, i) => i.value - s.value).slice(0, a);
}
function WA(t) {
  let a = 0;
  for (const s of nn) a += t[s] * t[s];
  return Math.sqrt(a);
}
function B0(t) {
  const a = A1(t, 2), s = a[0];
  if (!s) return "";
  const i = a[1];
  return !i || s.value - i.value > 0.25 ? jf(s.label) : `${jf(s.label)} + ${i.label.toLowerCase()}`;
}
function jf(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function Wr(t) {
  const a = { ...Js };
  for (const s of nn) {
    const i = t[s];
    a[s] = Number.isFinite(i) ? Math.max(0, Math.min(1, i)) : 0;
  }
  return a;
}
const V0 = 0.05, I0 = 0.2, e3 = 22, t3 = 320, Ef = 0.78;
function Nf(t, a, s, i) {
  const o = Math.cos(s), u = Math.sin(s), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / i));
}
function n3(t) {
  const { vec: a, onChange: s, size: i, reduceMotion: o = !1 } = t, [u, f] = g.useState(a), [p, y] = g.useState(null), [m, b] = g.useState(null), v = g.useRef(null), w = g.useRef(a), S = g.useRef(o), j = g.useRef(null), N = g.useRef(0);
  S.current = o, g.useEffect(() => {
    f(a), w.current = a;
  }, [a]);
  const R = g.useCallback(
    (V) => {
      const k = Wr(V);
      f(k), w.current = k, s(k);
    },
    [s]
  ), C = g.useCallback((V) => {
    const k = Wr(V);
    f(k), w.current = k;
  }, []), O = g.useCallback(
    (V) => {
      const k = v.current;
      if (!k || S.current) return;
      const F = V.clientX - k.centerX, W = V.clientY - k.centerY, ae = i / 2 * Ef, K = Nf(F, W, k.angle, ae), le = { ...w.current, [k.axis]: K };
      C(le);
    },
    [i, C]
  ), M = g.useCallback(
    (V) => {
      const k = v.current;
      if (k) {
        if (window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", M), window.removeEventListener("pointercancel", M), S.current) {
          const F = V.clientX - k.centerX, W = V.clientY - k.centerY, ae = i / 2 * Ef, K = Nf(F, W, k.angle, ae), le = { ...w.current, [k.axis]: K };
          v.current = null, R(le);
          return;
        }
        v.current = null, R(w.current);
      }
    },
    [R, O, i]
  );
  g.useEffect(() => () => {
    window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", M), window.removeEventListener("pointercancel", M), v.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [O, M]);
  const T = g.useCallback((V, k) => {
    S.current || (N.current += 1, b({ x: V, y: k, key: N.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, t3));
  }, []), q = g.useCallback(
    (V, k, F, W, ae) => {
      const K = F.getBoundingClientRect(), le = K.left + K.width / 2, A = K.top + K.height / 2, $ = nn.indexOf(V) / nn.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: V,
        pointerId: k,
        centerX: le,
        centerY: A,
        angle: $
      }, y(V), W !== void 0 && ae !== void 0) {
        const se = W - le, de = ae - A, D = i / 2 * Ef, H = Nf(se, de, $, D), Z = { ...w.current, [V]: H };
        S.current ? R(Z) : C(Z);
      }
      window.addEventListener("pointermove", O), window.addEventListener("pointerup", M), window.addEventListener("pointercancel", M);
    },
    [R, O, M, i, C]
  ), Q = g.useCallback(
    (V, k) => {
      k.preventDefault();
      const F = k.currentTarget, W = F.ownerSVGElement ?? F;
      q(V, k.pointerId, W);
    },
    [q]
  ), re = g.useCallback(
    (V) => {
      const k = V.currentTarget, F = k instanceof SVGSVGElement ? k : k.ownerSVGElement ?? k, W = F.getBoundingClientRect(), ae = W.left + W.width / 2, K = W.top + W.height / 2, le = V.clientX - ae, A = V.clientY - K;
      if (Math.sqrt(le * le + A * A) < 8) return;
      let $ = Math.atan2(A, le) * 180 / Math.PI;
      $ = (($ + 90) % 360 + 360) % 360;
      let se = null, de = 999;
      for (let Z = 0; Z < nn.length; Z++) {
        const G = nn[Z];
        if (!G) continue;
        const B = Z / nn.length * 360, J = Math.abs((B - $ + 540) % 360 - 180);
        J < de && (de = J, se = G);
      }
      if (!se || de > e3) return;
      V.preventDefault();
      const D = (V.clientX - W.left) / W.width * i, H = (V.clientY - W.top) / W.height * i;
      T(D, H), q(se, V.pointerId, F, V.clientX, V.clientY);
    },
    [q, i, T]
  ), _ = g.useCallback(
    (V, k) => {
      const F = w.current[V];
      let W = F;
      switch (k.key) {
        case "ArrowUp":
        case "ArrowRight":
          W = F + V0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          W = F - V0;
          break;
        case "PageUp":
          W = F + I0;
          break;
        case "PageDown":
          W = F - I0;
          break;
        case "Home":
          W = 0;
          break;
        case "End":
          W = 1;
          break;
        default:
          return;
      }
      k.preventDefault(), y(V), R({ ...w.current, [V]: W });
    },
    [R]
  );
  return {
    liveVec: u,
    activeAxis: p,
    setActiveAxis: y,
    onPointerDown: Q,
    onKeyDown: _,
    onSurfacePointerDown: re,
    surfacePing: m
  };
}
const a3 = [0.25, 0.5, 0.75, 1];
function r3({
  vec: t,
  onChange: a,
  size: s = 360,
  readOnly: i = !1,
  reduceMotion: o = !1
}) {
  const u = n3({ vec: t, onChange: a, size: s, reduceMotion: o }), f = s / 2, p = s / 2, y = s / 2 * 0.78, m = g.useMemo(() => s3(f, p, y), [f, p, y]), b = g.useMemo(() => nn.map((v, w) => {
    const S = yc(u.liveVec[v]), j = m[w];
    return j ? `${f + j.dx * S},${p + j.dy * S}` : "0,0";
  }).join(" "), [m, f, p, u.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: zA, children: /* @__PURE__ */ c.jsx("div", { className: OA, style: { width: s, height: s }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: LA,
      viewBox: `0 0 ${s} ${s}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: i ? void 0 : u.onSurfacePointerDown,
      style: i ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        a3.map((v) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: $A,
            cx: f,
            cy: p,
            r: y * v
          },
          v
        )),
        nn.map((v, w) => {
          const S = m[w];
          if (!S) return null;
          const j = f + S.dx * 1.18, N = p + S.dy * 1.18, R = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: UA,
                x1: f,
                y1: p,
                x2: f + S.dx,
                y2: p + S.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${GA}${R ? ` ${PA}` : ""}`,
                x: j,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: xl[v]
              }
            )
          ] }, v);
        }),
        nn.map((v, w) => {
          const S = yc(u.liveVec[v]);
          if (S <= 0.01) return null;
          const j = m[w];
          if (!j) return null;
          const N = u.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${VA}${N ? ` ${IA}` : ""}`,
              x1: f,
              y1: p,
              x2: f + j.dx * S,
              y2: p + j.dy * S
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: BA, points: b }),
        u.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: YA,
            cx: u.surfacePing.x,
            cy: u.surfacePing.y,
            r: 10
          },
          u.surfacePing.key
        ),
        !i && nn.map((v, w) => {
          const S = yc(u.liveVec[v]), j = m[w];
          if (!j) return null;
          const N = f + j.dx * S, R = p + j.dy * S, C = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: HA,
                cx: N,
                cy: R,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${xl[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": S,
                onPointerDown: (O) => u.onPointerDown(v, O),
                onKeyDown: (O) => u.onKeyDown(v, O),
                onFocus: () => u.setActiveAxis(v),
                onBlur: () => u.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: `${qA}${C ? ` ${FA}` : ""}`,
                cx: N,
                cy: R,
                r: 6
              }
            )
          ] }, v);
        })
      ]
    }
  ) }) });
}
function s3(t, a, s) {
  return nn.map((i, o) => {
    const u = o / nn.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(u) * s,
      dy: Math.sin(u) * s
    };
  });
}
function yc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function i3({ vec: t, size: a = 36 }) {
  const s = a / 2, i = a / 2, o = a / 2 * 0.86, u = g.useMemo(() => nn.map((f, p) => {
    const y = yc(t[f]), m = p / nn.length * Math.PI * 2 - Math.PI / 2, b = s + Math.cos(m) * o * y, v = i + Math.sin(m) * o * y;
    return `${b},${v}`;
  }).join(" "), [s, i, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: KA, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: XA,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: QA, cx: s, cy: i, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: ZA, points: u })
      ]
    }
  ) });
}
var l3 = "_1jqr3aj0", o3 = "_1jqr3aj1", c3 = "_1jqr3aj2", u3 = "_1jqr3aj3", d3 = "_1jqr3aj4", f3 = "_1jqr3aj5", h3 = "_1jqr3aj6", m3 = "_1jqr3aj7";
const H0 = 0.05, q0 = 0.2;
function p3({
  vec: t,
  onChange: a,
  readOnly: s = !1,
  reduceMotion: i = !1
}) {
  const [o, u] = g.useState(null), f = g.useRef(null), p = g.useRef(/* @__PURE__ */ new Map()), y = g.useCallback(
    (j, N) => {
      const R = Math.max(0, Math.min(1, N));
      a(Wr({ ...t, [j]: R }));
    },
    [a, t]
  ), m = g.useCallback((j, N) => {
    const R = p.current.get(j);
    return !R || R.width <= 0 ? 0 : (N - R.left) / R.width;
  }, []), b = g.useCallback(
    (j, N) => {
      if (s) return;
      N.preventDefault();
      const R = N.currentTarget.querySelector("[data-track]");
      R instanceof HTMLElement && p.current.set(j, R.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), f.current = j, u(j), y(j, m(j, N.clientX));
    },
    [s, y, m]
  ), v = g.useCallback(
    (j, N) => {
      s || i || f.current === j && y(j, m(j, N.clientX));
    },
    [s, i, y, m]
  ), w = g.useCallback(
    (j, N) => {
      if (f.current === j) {
        try {
          N.currentTarget.releasePointerCapture(N.pointerId);
        } catch {
        }
        f.current = null, p.current.delete(j);
      }
    },
    []
  ), S = g.useCallback(
    (j, N) => {
      if (s) return;
      const R = t[j] ?? 0;
      let C = R;
      switch (N.key) {
        case "ArrowRight":
        case "ArrowUp":
          C = R + H0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          C = R - H0;
          break;
        case "PageUp":
          C = R + q0;
          break;
        case "PageDown":
          C = R - q0;
          break;
        case "Home":
          C = 0;
          break;
        case "End":
          C = 1;
          break;
        default:
          return;
      }
      N.preventDefault(), u(j), y(j, C);
    },
    [s, y, t]
  );
  return /* @__PURE__ */ c.jsx("div", { className: l3, role: "group", "aria-label": "Emotion axis sliders", children: nn.map((j) => {
    const N = g3(t[j] ?? 0), R = N > 0.05, C = o === j, O = xl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${o3}${R ? ` ${c3}` : ""}${C ? ` ${u3}` : ""}`,
        role: "slider",
        "aria-label": `${O} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": s,
        disabled: s,
        onPointerDown: (M) => b(j, M),
        onPointerMove: (M) => v(j, M),
        onPointerUp: (M) => w(j, M),
        onPointerCancel: (M) => w(j, M),
        onKeyDown: (M) => S(j, M),
        onFocus: () => u(j),
        onBlur: () => u(null),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: d3, children: O }),
          /* @__PURE__ */ c.jsx("span", { className: f3, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: h3,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: m3, children: N.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function g3(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var F0 = "gvwvwg0", v3 = "gvwvwg2", y3 = "gvwvwg3", b3 = "gvwvwg8", x3 = "gvwvwg9", S3 = "gvwvwga", w3 = "gvwvwgb", j3 = "gvwvwgc", E3 = "gvwvwgd", N3 = "gvwvwge";
function C3({
  presets: t,
  activePresetId: a,
  onSelect: s,
  onDelete: i
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: F0, children: [
    /* @__PURE__ */ c.jsx("span", { className: v3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: y3, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: F0, children: [
    /* @__PURE__ */ c.jsx("span", { className: N3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: b3, children: t.map((o) => {
      const u = T3(o), f = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${x3}${f ? ` ${w3}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: S3,
                onClick: () => s(o),
                "aria-pressed": f,
                children: [
                  /* @__PURE__ */ c.jsx(i3, { vec: u, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: j3, children: o.presetName })
                ]
              }
            ),
            i && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: E3,
                onClick: () => {
                  window.confirm(`Delete preset "${o.presetName}"? This cannot be undone.`) && i(o.presetId);
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
const rh = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function T3(t) {
  const a = rh.reduce(
    (i, o) => ({ ...i, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const s = rh.reduce(
    (i, o, u) => ({ ...i, [o]: t.vector[u] ?? 0 }),
    a
  );
  return Wr(s);
}
function Cf(t) {
  return rh.map((a) => t[a] ?? 0);
}
const R3 = [
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
], _3 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], M3 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], A3 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function D3(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Js };
  const i = a.split(/\s+/).some((f) => _3.includes(f)) ? 1.2 : 1, o = M3.some((f) => a.includes(f)) ? 0.55 : 1, u = { ...Js };
  for (const f of R3) {
    let p = 0;
    for (const y of f.keywords) {
      const m = y.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${m}\\b`).exec(a);
      if (!v) continue;
      const w = v.index, S = a.slice(0, w), j = Math.max(
        S.lastIndexOf(","),
        S.lastIndexOf(";"),
        S.lastIndexOf(" but "),
        S.lastIndexOf(" yet ")
      ), R = S.slice(j >= 0 ? j : 0).slice(-30);
      A3.some((C) => new RegExp(`\\b${C}\\b`).test(R)) || (p += 1);
    }
    if (p > 0) {
      const y = f.weight * Math.min(1, 0.55 + 0.2 * (p - 1)) * i * o;
      u[f.axis] = Math.min(1, y);
    }
  }
  return nn.every((f) => u[f] === 0) && (u.calm = 0.4), Wr(u);
}
const k3 = [
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function z3({
  value: t,
  onChange: a,
  deploymentId: s,
  presets: i,
  onPresetsChange: o
}) {
  const u = t.mode ?? "emotion_vector", f = u === "none" || u === "audio_ref" ? "emotion_vector" : u, p = g.useMemo(() => O3(t.vector), [t.vector]), y = t.emotionAlpha ?? 1, [m, b] = g.useState(null), [v, w] = g.useState(!1), [S, j] = g.useState(null), [N, R] = g.useState(""), [C, O] = g.useState(!1), M = g.useRef(!0);
  g.useEffect(() => (M.current = !0, () => {
    M.current = !1;
  }), []), g.useEffect(() => {
    C || R(B0(p));
  }, [p, C]);
  const T = ($) => {
    a({ ...t, mode: $ });
  }, q = ($) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: Cf($)
    }), S && j(null);
  }, Q = () => {
    q(Wr(Js));
  }, re = ($) => {
    const se = Math.max(0, Math.min(10, Number.isFinite($) ? $ : 1));
    a({ ...t, emotionAlpha: se });
  }, _ = async () => {
    const $ = N.trim();
    if ($) {
      w(!0), b(null);
      try {
        const se = await r2(s, $, Cf(p));
        if (!M.current) return;
        o(
          L3([se, ...i.filter((de) => de.presetId !== se.presetId)])
        ), j(se.presetId), O(!1);
      } catch (se) {
        M.current && b(Y0(se));
      } finally {
        M.current && w(!1);
      }
    }
  }, V = async ($) => {
    const se = [...i];
    o(i.filter((de) => de.presetId !== $)), S === $ && j(null);
    try {
      await s2(s, $);
    } catch (de) {
      M.current && (o(se), b(Y0(de)));
    }
  }, k = ($) => {
    j($.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: $.vector
    });
  }, F = ($) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: $ });
  }, W = JA(p), ae = WA(p), K = A1(p, 3), le = K.length > 0 && N.trim().length > 0 && !v, A = B0(p) || "name your preset…", Y = f !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: sA, children: [
    /* @__PURE__ */ c.jsxs("div", { className: iA, children: [
      /* @__PURE__ */ c.jsx("span", { className: D0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: lA, role: "radiogroup", "aria-label": "Emotion mode", children: k3.map(($) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": f === $.id,
          className: `${oA}${f === $.id ? ` ${cA}` : ""}`,
          onClick: () => T($.id),
          children: $.label
        },
        $.id
      )) })
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: bA, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: xA,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: ($) => F($.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: SA, children: [
        /* @__PURE__ */ c.jsx(
          Ge,
          {
            variant: "secondary",
            onClick: () => {
              const $ = (t.qwenTemplate ?? "").trim();
              if (!$) return;
              const se = D3($);
              a({
                ...t,
                mode: "emotion_vector",
                vector: Cf(se)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: $0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: $0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    f === "emotion_vector" && /* @__PURE__ */ c.jsxs("div", { className: vA, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${c0} ${uA}`, children: /* @__PURE__ */ c.jsx(
        r3,
        {
          vec: p,
          onChange: q,
          readOnly: Y
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${c0} ${dA}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: fA, children: [
          /* @__PURE__ */ c.jsx("span", { className: D0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: hA, children: W ? xl[W].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: mA, children: [
            "‖v‖ = ",
            ae.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(p3, { vec: p, onChange: q, readOnly: Y }),
        /* @__PURE__ */ c.jsx("div", { className: pA, children: /* @__PURE__ */ c.jsxs(
          Ge,
          {
            variant: "ghost",
            size: "sm",
            onClick: Q,
            disabled: Y || ae < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: gA,
                  viewBox: "0 0 24 24",
                  width: "14",
                  height: "14",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ c.jsx(
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
                    /* @__PURE__ */ c.jsx(
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
    f === "emotion_vector" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs("div", { className: k0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: z0, children: "Alpha" }),
          /* @__PURE__ */ c.jsx("br", {}),
          /* @__PURE__ */ c.jsx("span", { className: yA, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: y,
            className: O0,
            style: { "--fill": `${y * 10}%` },
            onChange: ($) => re(Number($.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: L0, children: [
          (y * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${jA}${K.length === 0 ? ` ${EA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: NA, children: [
              /* @__PURE__ */ c.jsx("span", { className: CA, children: "Save current as preset" }),
              K.length === 0 && /* @__PURE__ */ c.jsx("span", { className: TA, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: RA, children: [
              /* @__PURE__ */ c.jsx("div", { className: _A, children: K.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${U0} ${AA}`, children: "no axes set" }) : K.map(($) => /* @__PURE__ */ c.jsxs("span", { className: U0, children: [
                $.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: MA, children: $.value.toFixed(2) })
              ] }, $.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: DA, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: kA,
                    placeholder: A,
                    value: N,
                    disabled: K.length === 0 || v,
                    onChange: ($) => {
                      R($.target.value), O(!0);
                    },
                    onKeyDown: ($) => {
                      $.key === "Enter" && le && _();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  Ge,
                  {
                    variant: "primary",
                    disabled: !le,
                    onClick: _,
                    children: v ? "Saving…" : "+ Save"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ c.jsx(
        C3,
        {
          presets: i,
          activePresetId: S,
          onSelect: k,
          onDelete: V
        }
      )
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: k0, children: [
      /* @__PURE__ */ c.jsx("span", { className: z0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: y,
          className: O0,
          style: { "--fill": `${y * 10}%` },
          onChange: ($) => re(Number($.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: L0, children: [
        (y * 100).toFixed(0),
        "%"
      ] })
    ] }),
    m && /* @__PURE__ */ c.jsx("div", { className: wA, children: m })
  ] });
}
function O3(t) {
  if (!t || !Array.isArray(t)) return Wr(Js);
  const a = { ...Js };
  return nn.forEach((s, i) => {
    const o = t[i];
    a[s] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function L3(t) {
  return [...t].sort((a, s) => s.updatedAt - a.updatedAt);
}
function Y0(t) {
  return t instanceof ni || t instanceof Error ? t.message : "Unknown error";
}
var $3 = "_5u1uau0", tl = "_5u1uau1", U3 = "_5u1uau2", Bs = "_5u1uau3", nl = "_5u1uau4", B3 = "_5u1uau5", Tf = "_5u1uau6", V3 = "_5u1uau7", I3 = "_5u1uau8", H3 = "_5u1uau9", q3 = "_5u1uaua", F3 = "_5u1uaub", Y3 = "_5u1uauc", G3 = "_5u1uaud", P3 = "_5u1uaue", G0 = "_5u1uauf", P0 = "_5u1uaug", K3 = "_5u1uauh";
const Rf = [
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
], X3 = ["mp3", "wav", "flac"], ec = 0.5, _f = 2, Q3 = 0.05, Z3 = 0.8, J3 = 0.8, K0 = 42;
function tc(t, a, s) {
  const i = t[a];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  if (typeof i == "string") {
    const o = Number(i);
    if (Number.isFinite(o)) return o;
  }
  return s;
}
function W3({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: s,
  onSpeedFactorChange: i,
  cachePolicy: o,
  onCachePolicyChange: u,
  generation: f,
  onGenerationChange: p
}) {
  const y = g.useId(), m = g.useId(), b = g.useId(), v = g.useId(), w = g.useId(), S = (q, Q) => {
    p({ ...f, [q]: Q });
  }, j = f.seed === void 0 || f.seed === null ? "random" : "fixed", N = (q) => {
    if (q !== j)
      if (q === "random") {
        const Q = { ...f };
        delete Q.seed, p(Q);
      } else {
        const Q = tc(f, "seed", K0);
        p({ ...f, seed: Q });
      }
  }, R = Rf.find((q) => q.id === o) ?? Rf[0], C = (s - ec) / (_f - ec) * 100, O = tc(f, "temperature", Z3), M = tc(f, "top_p", J3), T = tc(f, "seed", K0);
  return /* @__PURE__ */ c.jsxs("div", { className: $3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: y, className: Bs, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: nl, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: y,
          className: B3,
          value: t,
          onChange: (q) => a(q.currentTarget.value),
          children: X3.map((q) => /* @__PURE__ */ c.jsx("option", { value: q, children: q }, q))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: m, className: Bs, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${nl} ${V3}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: m,
            type: "range",
            className: I3,
            min: ec,
            max: _f,
            step: Q3,
            value: s,
            style: { "--range-pct": `${C}%` },
            onChange: (q) => i(Number(q.currentTarget.value)),
            "aria-valuemin": ec,
            "aria-valuemax": _f,
            "aria-valuenow": s
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: H3, children: [
          s.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: U3, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: Bs, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: q3, children: Rf.map((q) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === q.id,
          className: F3,
          onClick: () => u(q.id),
          title: q.help,
          children: q.label
        },
        q.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: Y3, "aria-live": "polite", children: R.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: G3, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: Bs, children: "Temperature" }),
      /* @__PURE__ */ c.jsx("div", { className: nl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: Tf,
          min: 0,
          max: 2,
          step: 0.05,
          value: O,
          onChange: (q) => S("temperature", Number(q.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: Bs, children: "Top-p" }),
      /* @__PURE__ */ c.jsx("div", { className: nl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: Tf,
          min: 0,
          max: 1,
          step: 0.05,
          value: M,
          onChange: (q) => S("top_p", Number(q.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("span", { className: Bs, id: `${w}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${nl} ${P3}`,
          role: "radiogroup",
          "aria-labelledby": `${w}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "fixed",
                className: `${G0} ${j === "fixed" ? P0 : ""}`,
                onClick: () => N("fixed"),
                children: "Fixed"
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "random",
                className: `${G0} ${j === "random" ? P0 : ""}`,
                onClick: () => N("random"),
                title: "A fresh seed is rolled for every run — output varies",
                children: "Random"
              }
            ),
            j === "fixed" ? /* @__PURE__ */ c.jsx(
              "input",
              {
                id: w,
                type: "number",
                className: Tf,
                step: 1,
                value: T,
                onChange: (q) => S("seed", Math.trunc(Number(q.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ c.jsx("span", { className: K3, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var e5 = "iv43qk0", X0 = "iv43qk1", t5 = "iv43qk2", Q0 = "iv43qk3", n5 = "iv43qk4", a5 = "iv43qk5", r5 = "iv43qk6", s5 = "iv43qk7", i5 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, l5 = "iv43qkd", o5 = "iv43qke", Mf = "iv43qkf", Af = "iv43qkg";
function c5({
  lines: t,
  characterColors: a,
  onLineClick: s
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: l5, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const i = t.length, o = t.filter((f) => f.character !== null).length, u = i - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: o5, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Mf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Af, children: i }),
        "lines"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Mf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Af, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Mf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Af, children: u }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ol", { className: e5, children: t.map((f) => /* @__PURE__ */ c.jsx(
      u5,
      {
        line: f,
        ...f.character && a[f.character] ? { color: a[f.character] } : {},
        ...s ? { onClick: () => s(f.idx) } : {}
      },
      f.idx
    )) })
  ] });
}
function u5({ line: t, color: a, onClick: s }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${X0} ${t5}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: Q0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: r5, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: X0,
      onClick: s,
      style: s ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: Q0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: n5, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: a5, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${s5} ${i5[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var d5 = "_46z95i0", f5 = "_46z95i1", h5 = "_46z95i2", m5 = "_46z95i3", p5 = "_46z95i4", g5 = "_46z95i5", v5 = "_46z95i6";
const y5 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function b5({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: d5, children: [
    /* @__PURE__ */ c.jsx(
      Df,
      {
        label: "Intensity",
        sub: "How emotionally amplified each line reads",
        min: 0,
        max: 1,
        step: 0.01,
        format: (s) => `${Math.round(s * 100)}%`,
        value: t.intensity,
        onChange: (s) => a({ ...t, intensity: s })
      }
    ),
    /* @__PURE__ */ c.jsx(
      Df,
      {
        label: "Pace",
        sub: "Time-stretched playback per line",
        min: 0.5,
        max: 2,
        step: 0.01,
        format: (s) => `${s.toFixed(2)}×`,
        value: t.pace,
        onChange: (s) => a({ ...t, pace: s })
      }
    ),
    /* @__PURE__ */ c.jsx(
      Df,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: -12,
        max: 12,
        step: 0.5,
        format: (s) => `${s >= 0 ? "+" : ""}${s.toFixed(1)} st`,
        value: t.pitchSt,
        onChange: (s) => a({ ...t, pitchSt: s })
      }
    )
  ] });
}
function Df({ label: t, sub: a, min: s, max: i, step: o, format: u, value: f, onChange: p }) {
  const y = (f - s) / (i - s) * 100, m = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: f5, children: [
    /* @__PURE__ */ c.jsxs("div", { className: h5, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: m, className: m5, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: p5, children: a })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: m,
        type: "range",
        min: s,
        max: i,
        step: o,
        value: f,
        className: g5,
        style: { "--fill": `${y}%` },
        onChange: (b) => p(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: v5, children: u(f) })
  ] });
}
var x5 = "qe93dj0", S5 = "qe93dj1", w5 = "qe93dj2", j5 = "qe93dj3", E5 = "qe93dj4", N5 = "qe93dj5", C5 = "qe93dj6", T5 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, R5 = "qe93dja", _5 = "qe93djb";
function M5({ checks: t }) {
  const a = t.filter((s) => s.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: x5, children: [
    /* @__PURE__ */ c.jsxs("header", { className: S5, children: [
      /* @__PURE__ */ c.jsx("span", { className: w5, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: j5, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: E5, children: t.map((s) => /* @__PURE__ */ c.jsxs("li", { className: N5, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${C5} ${T5[s.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: R5, children: s.label }),
      s.detail && /* @__PURE__ */ c.jsx("span", { className: _5, children: s.detail })
    ] }, s.id)) })
  ] });
}
var Z0 = "_17fbpt30", J0 = "_17fbpt31", W0 = "_17fbpt32", A5 = "_17fbpt33", D5 = "_17fbpt34", k5 = "_17fbpt35", eb = "_17fbpt36", z5 = "_17fbpt37", O5 = "_17fbpt38";
const L5 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function $5({
  runs: t,
  deploymentId: a,
  onOpenQueue: s,
  onOpenRun: i,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: Z0, children: [
    /* @__PURE__ */ c.jsx("header", { className: J0, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: W0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: s ? (u) => {
          u.preventDefault(), s();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: z5, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: O5, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: Z0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: J0, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: W0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: s ? (u) => {
            u.preventDefault(), s();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: A5, children: t.slice(0, 5).map((u) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: D5,
        onClick: i ? () => i(u.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: k5, children: u.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${w1.sm} ${j1[L5[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ c.jsx("span", { className: eb, children: U5(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: eb, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function U5(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, s = new Date(a * 1e3);
  if (Number.isNaN(s.getTime())) return "—";
  const o = Date.now() - s.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : s.toISOString().slice(0, 16).replace("T", " ");
}
const D1 = g.createContext({});
function Wh(t) {
  const a = g.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const B5 = typeof window < "u", k1 = B5 ? g.useLayoutEffect : g.useEffect, Pc = /* @__PURE__ */ g.createContext(null);
function V5(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function I5(t, a) {
  const s = t.indexOf(a);
  s > -1 && t.splice(s, 1);
}
const wr = (t, a, s) => s > a ? a : s < t ? t : s;
function tb(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Rl = () => {
}, Ws = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Rl = (t, a, s) => {
  !t && typeof console < "u" && console.warn(tb(a, s));
}, Ws = (t, a, s) => {
  if (!t)
    throw new Error(tb(a, s));
});
const jr = {}, z1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function H5(t) {
  return typeof t == "object" && t !== null;
}
const O1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function L1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ai = /* @__NO_SIDE_EFFECTS__ */ (t) => t, q5 = (t, a) => (s) => a(t(s)), Kc = (...t) => t.reduce(q5), $1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, s) => {
  const i = a - t;
  return i === 0 ? 1 : (s - t) / i;
};
class U1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return V5(this.subscriptions, a), () => I5(this.subscriptions, a);
  }
  notify(a, s, i) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, s, i);
      else
        for (let u = 0; u < o; u++) {
          const f = this.subscriptions[u];
          f && f(a, s, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const ta = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, ua = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function B1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const V1 = (t, a, s) => (((1 - 3 * s + 3 * a) * t + (3 * s - 6 * a)) * t + 3 * a) * t, F5 = 1e-7, Y5 = 12;
function G5(t, a, s, i, o) {
  let u, f, p = 0;
  do
    f = a + (s - a) / 2, u = V1(f, i, o) - t, u > 0 ? s = f : a = f;
  while (Math.abs(u) > F5 && ++p < Y5);
  return f;
}
function _l(t, a, s, i) {
  if (t === a && s === i)
    return ai;
  const o = (u) => G5(u, 0, 1, t, s);
  return (u) => u === 0 || u === 1 ? u : V1(o(u), a, i);
}
const I1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, H1 = (t) => (a) => 1 - t(1 - a), q1 = /* @__PURE__ */ _l(0.33, 1.53, 0.69, 0.99), em = /* @__PURE__ */ H1(q1), F1 = /* @__PURE__ */ I1(em), Y1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * em(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), tm = (t) => 1 - Math.sin(Math.acos(t)), P5 = H1(tm), G1 = I1(tm), K5 = /* @__PURE__ */ _l(0.42, 0, 1, 1), X5 = /* @__PURE__ */ _l(0, 0, 0.58, 1), P1 = /* @__PURE__ */ _l(0.42, 0, 0.58, 1), Q5 = (t) => Array.isArray(t) && typeof t[0] != "number", K1 = (t) => Array.isArray(t) && typeof t[0] == "number", nb = {
  linear: ai,
  easeIn: K5,
  easeInOut: P1,
  easeOut: X5,
  circIn: tm,
  circInOut: G1,
  circOut: P5,
  backIn: em,
  backInOut: F1,
  backOut: q1,
  anticipate: Y1
}, Z5 = (t) => typeof t == "string", ab = (t) => {
  if (K1(t)) {
    Ws(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, s, i, o] = t;
    return _l(a, s, i, o);
  } else if (Z5(t))
    return Ws(nb[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), nb[t];
  return t;
}, nc = [
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
function J5(t, a) {
  let s = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), o = !1, u = !1;
  const f = /* @__PURE__ */ new WeakSet();
  let p = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function y(b) {
    f.has(b) && (m.schedule(b), t()), b(p);
  }
  const m = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (b, v = !1, w = !1) => {
      const j = w && o ? s : i;
      return v && f.add(b), j.add(b), b;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (b) => {
      i.delete(b), f.delete(b);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (b) => {
      if (p = b, o) {
        u = !0;
        return;
      }
      o = !0;
      const v = s;
      s = i, i = v, s.forEach(y), s.clear(), o = !1, u && (u = !1, m.process(b));
    }
  };
  return m;
}
const W5 = 40;
function X1(t, a) {
  let s = !1, i = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => s = !0, f = nc.reduce((M, T) => (M[T] = J5(u), M), {}), { setup: p, read: y, resolveKeyframes: m, preUpdate: b, update: v, preRender: w, render: S, postRender: j } = f, N = () => {
    const M = jr.useManualTiming, T = M ? o.timestamp : performance.now();
    s = !1, M || (o.delta = i ? 1e3 / 60 : Math.max(Math.min(T - o.timestamp, W5), 1)), o.timestamp = T, o.isProcessing = !0, p.process(o), y.process(o), m.process(o), b.process(o), v.process(o), w.process(o), S.process(o), j.process(o), o.isProcessing = !1, s && a && (i = !1, t(N));
  }, R = () => {
    s = !0, i = !0, o.isProcessing || t(N);
  };
  return { schedule: nc.reduce((M, T) => {
    const q = f[T];
    return M[T] = (Q, re = !1, _ = !1) => (s || R(), q.schedule(Q, re, _)), M;
  }, {}), cancel: (M) => {
    for (let T = 0; T < nc.length; T++)
      f[nc[T]].cancel(M);
  }, state: o, steps: f };
}
const { schedule: na, cancel: sh, state: Tc } = /* @__PURE__ */ X1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ai, !0);
let bc;
function eD() {
  bc = void 0;
}
const qn = {
  now: () => (bc === void 0 && qn.set(Tc.isProcessing || jr.useManualTiming ? Tc.timestamp : performance.now()), bc),
  set: (t) => {
    bc = t, queueMicrotask(eD);
  }
}, Q1 = (t) => (a) => typeof a == "string" && a.startsWith(t), Z1 = /* @__PURE__ */ Q1("--"), tD = /* @__PURE__ */ Q1("var(--"), nm = (t) => tD(t) ? nD.test(t.split("/*")[0].trim()) : !1, nD = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function rb(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const ri = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Sl = {
  ...ri,
  transform: (t) => wr(0, 1, t)
}, ac = {
  ...ri,
  default: 1
}, hl = (t) => Math.round(t * 1e5) / 1e5, am = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function aD(t) {
  return t == null;
}
const rD = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, rm = (t, a) => (s) => !!(typeof s == "string" && rD.test(s) && s.startsWith(t) || a && !aD(s) && Object.prototype.hasOwnProperty.call(s, a)), J1 = (t, a, s) => (i) => {
  if (typeof i != "string")
    return i;
  const [o, u, f, p] = i.match(am);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [s]: parseFloat(f),
    alpha: p !== void 0 ? parseFloat(p) : 1
  };
}, sD = (t) => wr(0, 255, t), kf = {
  ...ri,
  transform: (t) => Math.round(sD(t))
}, Pr = {
  test: /* @__PURE__ */ rm("rgb", "red"),
  parse: /* @__PURE__ */ J1("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: s, alpha: i = 1 }) => "rgba(" + kf.transform(t) + ", " + kf.transform(a) + ", " + kf.transform(s) + ", " + hl(Sl.transform(i)) + ")"
};
function iD(t) {
  let a = "", s = "", i = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), s = t.substring(3, 5), i = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), s = t.substring(2, 3), i = t.substring(3, 4), o = t.substring(4, 5), a += a, s += s, i += i, o += o), {
    red: parseInt(a, 16),
    green: parseInt(s, 16),
    blue: parseInt(i, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const ih = {
  test: /* @__PURE__ */ rm("#"),
  parse: iD,
  transform: Pr.transform
}, Ml = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), vr = /* @__PURE__ */ Ml("deg"), Xs = /* @__PURE__ */ Ml("%"), De = /* @__PURE__ */ Ml("px"), lD = /* @__PURE__ */ Ml("vh"), oD = /* @__PURE__ */ Ml("vw"), sb = {
  ...Xs,
  parse: (t) => Xs.parse(t) / 100,
  transform: (t) => Xs.transform(t * 100)
}, Ps = {
  test: /* @__PURE__ */ rm("hsl", "hue"),
  parse: /* @__PURE__ */ J1("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: s, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + Xs.transform(hl(a)) + ", " + Xs.transform(hl(s)) + ", " + hl(Sl.transform(i)) + ")"
}, tn = {
  test: (t) => Pr.test(t) || ih.test(t) || Ps.test(t),
  parse: (t) => Pr.test(t) ? Pr.parse(t) : Ps.test(t) ? Ps.parse(t) : ih.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Pr.transform(t) : Ps.transform(t),
  getAnimatableNone: (t) => {
    const a = tn.parse(t);
    return a.alpha = 0, tn.transform(a);
  }
}, cD = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function uD(t) {
  return isNaN(t) && typeof t == "string" && (t.match(am)?.length || 0) + (t.match(cD)?.length || 0) > 0;
}
const W1 = "number", eS = "color", dD = "var", fD = "var(", ib = "${}", hD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ei(t) {
  const a = t.toString(), s = [], i = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const p = a.replace(hD, (y) => (tn.test(y) ? (i.color.push(u), o.push(eS), s.push(tn.parse(y))) : y.startsWith(fD) ? (i.var.push(u), o.push(dD), s.push(y)) : (i.number.push(u), o.push(W1), s.push(parseFloat(y))), ++u, ib)).split(ib);
  return { values: s, split: p, indexes: i, types: o };
}
function mD(t) {
  return ei(t).values;
}
function tS({ split: t, types: a }) {
  const s = t.length;
  return (i) => {
    let o = "";
    for (let u = 0; u < s; u++)
      if (o += t[u], i[u] !== void 0) {
        const f = a[u];
        f === W1 ? o += hl(i[u]) : f === eS ? o += tn.transform(i[u]) : o += i[u];
      }
    return o;
  };
}
function pD(t) {
  return tS(ei(t));
}
const gD = (t) => typeof t == "number" ? 0 : tn.test(t) ? tn.getAnimatableNone(t) : t, vD = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : gD(t);
function yD(t) {
  const a = ei(t);
  return tS(a)(a.values.map((i, o) => vD(i, a.split[o])));
}
const da = {
  test: uD,
  parse: mD,
  createTransformer: pD,
  getAnimatableNone: yD
};
function zf(t, a, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? t + (a - t) * 6 * s : s < 1 / 2 ? a : s < 2 / 3 ? t + (a - t) * (2 / 3 - s) * 6 : t;
}
function bD({ hue: t, saturation: a, lightness: s, alpha: i }) {
  t /= 360, a /= 100, s /= 100;
  let o = 0, u = 0, f = 0;
  if (!a)
    o = u = f = s;
  else {
    const p = s < 0.5 ? s * (1 + a) : s + a - s * a, y = 2 * s - p;
    o = zf(y, p, t + 1 / 3), u = zf(y, p, t), f = zf(y, p, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(u * 255),
    blue: Math.round(f * 255),
    alpha: i
  };
}
function Rc(t, a) {
  return (s) => s > 0 ? a : t;
}
const Al = (t, a, s) => t + (a - t) * s, Of = (t, a, s) => {
  const i = t * t, o = s * (a * a - i) + i;
  return o < 0 ? 0 : Math.sqrt(o);
}, xD = [ih, Pr, Ps], SD = (t) => xD.find((a) => a.test(t));
function lb(t) {
  const a = SD(t);
  if (Rl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let s = a.parse(t);
  return a === Ps && (s = bD(s)), s;
}
const ob = (t, a) => {
  const s = lb(t), i = lb(a);
  if (!s || !i)
    return Rc(t, a);
  const o = { ...s };
  return (u) => (o.red = Of(s.red, i.red, u), o.green = Of(s.green, i.green, u), o.blue = Of(s.blue, i.blue, u), o.alpha = Al(s.alpha, i.alpha, u), Pr.transform(o));
}, lh = /* @__PURE__ */ new Set(["none", "hidden"]);
function wD(t, a) {
  return lh.has(t) ? (s) => s <= 0 ? t : a : (s) => s >= 1 ? a : t;
}
function jD(t, a) {
  return (s) => Al(t, a, s);
}
function sm(t) {
  return typeof t == "number" ? jD : typeof t == "string" ? nm(t) ? Rc : tn.test(t) ? ob : CD : Array.isArray(t) ? nS : typeof t == "object" ? tn.test(t) ? ob : ED : Rc;
}
function nS(t, a) {
  const s = [...t], i = s.length, o = t.map((u, f) => sm(u)(u, a[f]));
  return (u) => {
    for (let f = 0; f < i; f++)
      s[f] = o[f](u);
    return s;
  };
}
function ED(t, a) {
  const s = { ...t, ...a }, i = {};
  for (const o in s)
    t[o] !== void 0 && a[o] !== void 0 && (i[o] = sm(t[o])(t[o], a[o]));
  return (o) => {
    for (const u in i)
      s[u] = i[u](o);
    return s;
  };
}
function ND(t, a) {
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], f = t.indexes[u][i[u]], p = t.values[f] ?? 0;
    s[o] = p, i[u]++;
  }
  return s;
}
const CD = (t, a) => {
  const s = da.createTransformer(a), i = ei(t), o = ei(a);
  return i.indexes.var.length === o.indexes.var.length && i.indexes.color.length === o.indexes.color.length && i.indexes.number.length >= o.indexes.number.length ? lh.has(t) && !o.values.length || lh.has(a) && !i.values.length ? wD(t, a) : Kc(nS(ND(i, o), o.values), s) : (Rl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Rc(t, a));
};
function aS(t, a, s) {
  return typeof t == "number" && typeof a == "number" && typeof s == "number" ? Al(t, a, s) : sm(t)(t, a);
}
const TD = (t) => {
  const a = ({ timestamp: s }) => t(s);
  return {
    start: (s = !0) => na.update(a, s),
    stop: () => sh(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Tc.isProcessing ? Tc.timestamp : qn.now()
  };
}, rS = (t, a, s = 10) => {
  let i = "";
  const o = Math.max(Math.round(a / s), 2);
  for (let u = 0; u < o; u++)
    i += Math.round(t(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, _c = 2e4;
function im(t) {
  let a = 0;
  const s = 50;
  let i = t.next(a);
  for (; !i.done && a < _c; )
    a += s, i = t.next(a);
  return a >= _c ? 1 / 0 : a;
}
function RD(t, a = 100, s) {
  const i = s({ ...t, keyframes: [0, a] }), o = Math.min(im(i), _c);
  return {
    type: "keyframes",
    ease: (u) => i.next(o * u).value / a,
    duration: /* @__PURE__ */ ua(o)
  };
}
const Bt = {
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
function oh(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const _D = 12;
function MD(t, a, s) {
  let i = s;
  for (let o = 1; o < _D; o++)
    i = i - t(i) / a(i);
  return i;
}
const Lf = 1e-3;
function AD({ duration: t = Bt.duration, bounce: a = Bt.bounce, velocity: s = Bt.velocity, mass: i = Bt.mass }) {
  let o, u;
  Rl(t <= /* @__PURE__ */ ta(Bt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = wr(Bt.minDamping, Bt.maxDamping, f), t = wr(Bt.minDuration, Bt.maxDuration, /* @__PURE__ */ ua(t)), f < 1 ? (o = (m) => {
    const b = m * f, v = b * t, w = b - s, S = oh(m, f), j = Math.exp(-v);
    return Lf - w / S * j;
  }, u = (m) => {
    const v = m * f * t, w = v * s + s, S = Math.pow(f, 2) * Math.pow(m, 2) * t, j = Math.exp(-v), N = oh(Math.pow(m, 2), f);
    return (-o(m) + Lf > 0 ? -1 : 1) * ((w - S) * j) / N;
  }) : (o = (m) => {
    const b = Math.exp(-m * t), v = (m - s) * t + 1;
    return -Lf + b * v;
  }, u = (m) => {
    const b = Math.exp(-m * t), v = (s - m) * (t * t);
    return b * v;
  });
  const p = 5 / t, y = MD(o, u, p);
  if (t = /* @__PURE__ */ ta(t), isNaN(y))
    return {
      stiffness: Bt.stiffness,
      damping: Bt.damping,
      duration: t
    };
  {
    const m = Math.pow(y, 2) * i;
    return {
      stiffness: m,
      damping: f * 2 * Math.sqrt(i * m),
      duration: t
    };
  }
}
const DD = ["duration", "bounce"], kD = ["stiffness", "damping", "mass"];
function cb(t, a) {
  return a.some((s) => t[s] !== void 0);
}
function zD(t) {
  let a = {
    velocity: Bt.velocity,
    stiffness: Bt.stiffness,
    damping: Bt.damping,
    mass: Bt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!cb(t, kD) && cb(t, DD))
    if (a.velocity = 0, t.visualDuration) {
      const s = t.visualDuration, i = 2 * Math.PI / (s * 1.2), o = i * i, u = 2 * wr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: Bt.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const s = AD({ ...t, velocity: 0 });
      a = {
        ...a,
        ...s,
        mass: Bt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Mc(t = Bt.visualDuration, a = Bt.bounce) {
  const s = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: i, restDelta: o } = s;
  const u = s.keyframes[0], f = s.keyframes[s.keyframes.length - 1], p = { done: !1, value: u }, { stiffness: y, damping: m, mass: b, duration: v, velocity: w, isResolvedFromDuration: S } = zD({
    ...s,
    velocity: -/* @__PURE__ */ ua(s.velocity || 0)
  }), j = w || 0, N = m / (2 * Math.sqrt(y * b)), R = f - u, C = /* @__PURE__ */ ua(Math.sqrt(y / b)), O = Math.abs(R) < 5;
  i || (i = O ? Bt.restSpeed.granular : Bt.restSpeed.default), o || (o = O ? Bt.restDelta.granular : Bt.restDelta.default);
  let M, T, q, Q, re, _;
  if (N < 1)
    q = oh(C, N), Q = (j + N * C * R) / q, M = (k) => {
      const F = Math.exp(-N * C * k);
      return f - F * (Q * Math.sin(q * k) + R * Math.cos(q * k));
    }, re = N * C * Q + R * q, _ = N * C * R - Q * q, T = (k) => Math.exp(-N * C * k) * (re * Math.sin(q * k) + _ * Math.cos(q * k));
  else if (N === 1) {
    M = (F) => f - Math.exp(-C * F) * (R + (j + C * R) * F);
    const k = j + C * R;
    T = (F) => Math.exp(-C * F) * (C * k * F - j);
  } else {
    const k = C * Math.sqrt(N * N - 1);
    M = (K) => {
      const le = Math.exp(-N * C * K), A = Math.min(k * K, 300);
      return f - le * ((j + N * C * R) * Math.sinh(A) + k * R * Math.cosh(A)) / k;
    };
    const F = (j + N * C * R) / k, W = N * C * F - R * k, ae = N * C * R - F * k;
    T = (K) => {
      const le = Math.exp(-N * C * K), A = Math.min(k * K, 300);
      return le * (W * Math.sinh(A) + ae * Math.cosh(A));
    };
  }
  const V = {
    calculatedDuration: S && v || null,
    velocity: (k) => /* @__PURE__ */ ta(T(k)),
    next: (k) => {
      if (!S && N < 1) {
        const W = Math.exp(-N * C * k), ae = Math.sin(q * k), K = Math.cos(q * k), le = f - W * (Q * ae + R * K), A = /* @__PURE__ */ ta(W * (re * ae + _ * K));
        return p.done = Math.abs(A) <= i && Math.abs(f - le) <= o, p.value = p.done ? f : le, p;
      }
      const F = M(k);
      if (S)
        p.done = k >= v;
      else {
        const W = /* @__PURE__ */ ta(T(k));
        p.done = Math.abs(W) <= i && Math.abs(f - F) <= o;
      }
      return p.value = p.done ? f : F, p;
    },
    toString: () => {
      const k = Math.min(im(V), _c), F = rS((W) => V.next(k * W).value, k, 30);
      return k + "ms " + F;
    },
    toTransition: () => {
    }
  };
  return V;
}
Mc.applyToOptions = (t) => {
  const a = RD(t, 100, Mc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ ta(a.duration), t.type = "keyframes", t;
};
const OD = 5;
function sS(t, a, s) {
  const i = Math.max(a - OD, 0);
  return B1(s - t(i), a - i);
}
function ch({ keyframes: t, velocity: a = 0, power: s = 0.8, timeConstant: i = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: f, min: p, max: y, restDelta: m = 0.5, restSpeed: b }) {
  const v = t[0], w = {
    done: !1,
    value: v
  }, S = (_) => p !== void 0 && _ < p || y !== void 0 && _ > y, j = (_) => p === void 0 ? y : y === void 0 || Math.abs(p - _) < Math.abs(y - _) ? p : y;
  let N = s * a;
  const R = v + N, C = f === void 0 ? R : f(R);
  C !== R && (N = C - v);
  const O = (_) => -N * Math.exp(-_ / i), M = (_) => C + O(_), T = (_) => {
    const V = O(_), k = M(_);
    w.done = Math.abs(V) <= m, w.value = w.done ? C : k;
  };
  let q, Q;
  const re = (_) => {
    S(w.value) && (q = _, Q = Mc({
      keyframes: [w.value, j(w.value)],
      velocity: sS(M, _, w.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: m,
      restSpeed: b
    }));
  };
  return re(0), {
    calculatedDuration: null,
    next: (_) => {
      let V = !1;
      return !Q && q === void 0 && (V = !0, T(_), re(_)), q !== void 0 && _ >= q ? Q.next(_ - q) : (!V && T(_), w);
    }
  };
}
function LD(t, a, s) {
  const i = [], o = s || jr.mix || aS, u = t.length - 1;
  for (let f = 0; f < u; f++) {
    let p = o(t[f], t[f + 1]);
    if (a) {
      const y = Array.isArray(a) ? a[f] || ai : a;
      p = Kc(y, p);
    }
    i.push(p);
  }
  return i;
}
function $D(t, a, { clamp: s = !0, ease: i, mixer: o } = {}) {
  const u = t.length;
  if (Ws(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const p = LD(a, i, o), y = p.length, m = (b) => {
    if (f && b < t[0])
      return a[0];
    let v = 0;
    if (y > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const w = /* @__PURE__ */ $1(t[v], t[v + 1], b);
    return p[v](w);
  };
  return s ? (b) => m(wr(t[0], t[u - 1], b)) : m;
}
function UD(t, a) {
  const s = t[t.length - 1];
  for (let i = 1; i <= a; i++) {
    const o = /* @__PURE__ */ $1(0, a, i);
    t.push(Al(s, 1, o));
  }
}
function BD(t) {
  const a = [0];
  return UD(a, t.length - 1), a;
}
function VD(t, a) {
  return t.map((s) => s * a);
}
function ID(t, a) {
  return t.map(() => a || P1).splice(0, t.length - 1);
}
function ml({ duration: t = 300, keyframes: a, times: s, ease: i = "easeInOut" }) {
  const o = Q5(i) ? i.map(ab) : ab(i), u = {
    done: !1,
    value: a[0]
  }, f = VD(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    s && s.length === a.length ? s : BD(a),
    t
  ), p = $D(f, a, {
    ease: Array.isArray(o) ? o : ID(a, o)
  });
  return {
    calculatedDuration: t,
    next: (y) => (u.value = p(y), u.done = y >= t, u)
  };
}
const HD = (t) => t !== null;
function Xc(t, { repeat: a, repeatType: s = "loop" }, i, o = 1) {
  const u = t.filter(HD), p = o < 0 || a && s !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !p || i === void 0 ? u[p] : i;
}
const qD = {
  decay: ch,
  inertia: ch,
  tween: ml,
  keyframes: ml,
  spring: Mc
};
function iS(t) {
  typeof t.type == "string" && (t.type = qD[t.type]);
}
class lm {
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
  then(a, s) {
    return this.finished.then(a, s);
  }
}
const FD = (t) => t / 100;
class Ac extends lm {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: s } = this.options;
      s && s.updatedAt !== qn.now() && this.tick(qn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    iS(a);
    const { type: s = ml, repeat: i = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: p } = a;
    const y = s || ml;
    y !== ml && typeof p[0] != "number" && (this.mixKeyframes = Kc(FD, aS(p[0], p[1])), p = [0, 100]);
    const m = y({ ...a, keyframes: p });
    u === "mirror" && (this.mirroredGenerator = y({
      ...a,
      keyframes: [...p].reverse(),
      velocity: -f
    })), m.calculatedDuration === null && (m.calculatedDuration = im(m));
    const { calculatedDuration: b } = m;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (i + 1) - o, this.generator = m;
  }
  updateTime(a) {
    const s = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = s;
  }
  tick(a, s = !1) {
    const { generator: i, totalDuration: o, mixKeyframes: u, mirroredGenerator: f, resolvedDuration: p, calculatedDuration: y } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: m = 0, keyframes: b, repeat: v, repeatType: w, repeatDelay: S, type: j, onUpdate: N, finalKeyframe: R } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), s ? this.currentTime = a : this.updateTime(a);
    const C = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), O = this.playbackSpeed >= 0 ? C < 0 : C > o;
    this.currentTime = Math.max(C, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let M = this.currentTime, T = i;
    if (v) {
      const _ = Math.min(this.currentTime, o) / p;
      let V = Math.floor(_), k = _ % 1;
      !k && _ >= 1 && (k = 1), k === 1 && V--, V = Math.min(V, v + 1), !!(V % 2) && (w === "reverse" ? (k = 1 - k, S && (k -= S / p)) : w === "mirror" && (T = f)), M = wr(0, 1, k) * p;
    }
    let q;
    O ? (this.delayState.value = b[0], q = this.delayState) : q = T.next(M), u && !O && (q.value = u(q.value));
    let { done: Q } = q;
    !O && y !== null && (Q = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const re = this.holdTime === null && (this.state === "finished" || this.state === "running" && Q);
    return re && j !== ch && (q.value = Xc(b, this.options, R, this.speed)), N && N(q.value), re && this.finish(), q;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(a, s) {
    return this.finished.then(a, s);
  }
  get duration() {
    return /* @__PURE__ */ ua(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ua(a);
  }
  get time() {
    return /* @__PURE__ */ ua(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ ta(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    const s = this.generator.next(a).value;
    return sS((i) => this.generator.next(i).value, a, s);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const s = this.playbackSpeed !== a;
    s && this.driver && this.updateTime(qn.now()), this.playbackSpeed = a, s && this.driver && (this.time = /* @__PURE__ */ ua(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = TD, startTime: s } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = s ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(qn.now()), this.holdTime = this.currentTime;
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
function YD(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Kr = (t) => t * 180 / Math.PI, uh = (t) => {
  const a = Kr(Math.atan2(t[1], t[0]));
  return dh(a);
}, GD = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: uh,
  rotateZ: uh,
  skewX: (t) => Kr(Math.atan(t[1])),
  skewY: (t) => Kr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, dh = (t) => (t = t % 360, t < 0 && (t += 360), t), ub = uh, db = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), fb = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), PD = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: db,
  scaleY: fb,
  scale: (t) => (db(t) + fb(t)) / 2,
  rotateX: (t) => dh(Kr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => dh(Kr(Math.atan2(-t[2], t[0]))),
  rotateZ: ub,
  rotate: ub,
  skewX: (t) => Kr(Math.atan(t[4])),
  skewY: (t) => Kr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function fh(t) {
  return t.includes("scale") ? 1 : 0;
}
function hh(t, a) {
  if (!t || t === "none")
    return fh(a);
  const s = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, o;
  if (s)
    i = PD, o = s;
  else {
    const p = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = GD, o = p;
  }
  if (!o)
    return fh(a);
  const u = i[a], f = o[1].split(",").map(XD);
  return typeof u == "function" ? u(f) : f[u];
}
const KD = (t, a) => {
  const { transform: s = "none" } = getComputedStyle(t);
  return hh(s, a);
};
function XD(t) {
  return parseFloat(t.trim());
}
const si = [
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
], ii = new Set(si), hb = (t) => t === ri || t === De, QD = /* @__PURE__ */ new Set(["x", "y", "z"]), ZD = si.filter((t) => !QD.has(t));
function JD(t) {
  const a = [];
  return ZD.forEach((s) => {
    const i = t.getValue(s);
    i !== void 0 && (a.push([s, i.get()]), i.set(s.startsWith("scale") ? 1 : 0));
  }), a;
}
const Sr = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: a = "0", paddingRight: s = "0", boxSizing: i }) => {
    const o = t.max - t.min;
    return i === "border-box" ? o : o - parseFloat(a) - parseFloat(s);
  },
  height: ({ y: t }, { paddingTop: a = "0", paddingBottom: s = "0", boxSizing: i }) => {
    const o = t.max - t.min;
    return i === "border-box" ? o : o - parseFloat(a) - parseFloat(s);
  },
  top: (t, { top: a }) => parseFloat(a),
  left: (t, { left: a }) => parseFloat(a),
  bottom: ({ y: t }, { top: a }) => parseFloat(a) + (t.max - t.min),
  right: ({ x: t }, { left: a }) => parseFloat(a) + (t.max - t.min),
  // Transform
  x: (t, { transform: a }) => hh(a, "x"),
  y: (t, { transform: a }) => hh(a, "y")
};
Sr.translateX = Sr.x;
Sr.translateY = Sr.y;
const Qr = /* @__PURE__ */ new Set();
let mh = !1, ph = !1, gh = !1;
function lS() {
  if (ph) {
    const t = Array.from(Qr).filter((i) => i.needsMeasurement), a = new Set(t.map((i) => i.element)), s = /* @__PURE__ */ new Map();
    a.forEach((i) => {
      const o = JD(i);
      o.length && (s.set(i, o), i.render());
    }), t.forEach((i) => i.measureInitialState()), a.forEach((i) => {
      i.render();
      const o = s.get(i);
      o && o.forEach(([u, f]) => {
        i.getValue(u)?.set(f);
      });
    }), t.forEach((i) => i.measureEndState()), t.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  ph = !1, mh = !1, Qr.forEach((t) => t.complete(gh)), Qr.clear();
}
function oS() {
  Qr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (ph = !0);
  });
}
function WD() {
  gh = !0, oS(), lS(), gh = !1;
}
class om {
  constructor(a, s, i, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = s, this.name = i, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Qr.add(this), mh || (mh = !0, na.read(oS), na.resolveKeyframes(lS))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: s, element: i, motionValue: o } = this;
    if (a[0] === null) {
      const u = o?.get(), f = a[a.length - 1];
      if (u !== void 0)
        a[0] = u;
      else if (i && s) {
        const p = i.readValue(s, f);
        p != null && (a[0] = p);
      }
      a[0] === void 0 && (a[0] = f), o && u === void 0 && o.set(a[0]);
    }
    YD(a);
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
const ek = (t) => t.startsWith("--");
function cS(t, a, s) {
  ek(a) ? t.style.setProperty(a, s) : t.style[a] = s;
}
const tk = {};
function uS(t, a) {
  const s = /* @__PURE__ */ L1(t);
  return () => tk[a] ?? s();
}
const nk = /* @__PURE__ */ uS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), dS = /* @__PURE__ */ uS(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ul = ([t, a, s, i]) => `cubic-bezier(${t}, ${a}, ${s}, ${i})`, mb = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ul([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ul([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ul([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ul([0.33, 1.53, 0.69, 0.99])
};
function fS(t, a) {
  if (t)
    return typeof t == "function" ? dS() ? rS(t, a) : "ease-out" : K1(t) ? ul(t) : Array.isArray(t) ? t.map((s) => fS(s, a) || mb.easeOut) : mb[t];
}
function ak(t, a, s, { delay: i = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: p = "easeOut", times: y } = {}, m = void 0) {
  const b = {
    [a]: s
  };
  y && (b.offset = y);
  const v = fS(p, o);
  Array.isArray(v) && (b.easing = v);
  const w = {
    delay: i,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: u + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return m && (w.pseudoElement = m), t.animate(b, w);
}
function hS(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function rk({ type: t, ...a }) {
  return hS(t) && dS() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class mS extends lm {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: s, name: i, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: p, onComplete: y } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, Ws(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = rk(a);
    this.animation = ak(s, i, o, m, u), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Xc(o, this.options, p, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), cS(s, i, b), this.animation.cancel();
      }
      y?.(), this.notifyFinished();
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
    return /* @__PURE__ */ ua(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ua(a);
  }
  get time() {
    return /* @__PURE__ */ ua(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const s = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ ta(a), s && this.animation.pause();
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
  attachTimeline({ timeline: a, rangeStart: s, rangeEnd: i, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && nk() ? (this.animation.timeline = a, s && (this.animation.rangeStart = s), i && (this.animation.rangeEnd = i), ai) : o(this);
  }
}
const pS = {
  anticipate: Y1,
  backInOut: F1,
  circInOut: G1
};
function sk(t) {
  return t in pS;
}
function ik(t) {
  typeof t.ease == "string" && sk(t.ease) && (t.ease = pS[t.ease]);
}
const $f = 10;
class lk extends mS {
  constructor(a) {
    ik(a), iS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: s, onUpdate: i, onComplete: o, element: u, ...f } = this.options;
    if (!s)
      return;
    if (a !== void 0) {
      s.set(a);
      return;
    }
    const p = new Ac({
      ...f,
      autoplay: !1
    }), y = Math.max($f, qn.now() - this.startTime), m = wr(0, $f, y - $f), b = p.sample(y).value, { name: v } = this.options;
    u && v && cS(u, v, b), s.setWithVelocity(p.sample(Math.max(0, y - m)).value, b, m), p.stop();
  }
}
const pb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(da.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function ok(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let s = 0; s < t.length; s++)
    if (t[s] !== a)
      return !0;
}
function ck(t, a, s, i) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = t[t.length - 1], f = pb(o, a), p = pb(u, a);
  return Rl(f === p, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !p ? !1 : ok(t) || (s === "spring" || hS(s)) && i;
}
function vh(t) {
  t.duration = 0, t.type = "keyframes";
}
const gS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), uk = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function dk(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && uk.test(t[a]))
      return !0;
  return !1;
}
const fk = /* @__PURE__ */ new Set([
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
]), hk = /* @__PURE__ */ L1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function mk(t) {
  const { motionValue: a, name: s, repeatDelay: i, repeatType: o, damping: u, type: f, keyframes: p } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: b } = a.owner.getProps();
  return hk() && s && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (gS.has(s) || fk.has(s) && dk(p)) && (s !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !i && o !== "mirror" && u !== 0 && f !== "inertia";
}
const pk = 40;
class gk extends lm {
  constructor({ autoplay: a = !0, delay: s = 0, type: i = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: f = "loop", keyframes: p, name: y, motionValue: m, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = qn.now();
    const w = {
      autoplay: a,
      delay: s,
      type: i,
      repeat: o,
      repeatDelay: u,
      repeatType: f,
      name: y,
      motionValue: m,
      element: b,
      ...v
    }, S = b?.KeyframeResolver || om;
    this.keyframeResolver = new S(p, (j, N, R) => this.onKeyframesResolved(j, N, w, !R), y, m, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, s, i, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: f, velocity: p, delay: y, isHandoff: m, onUpdate: b } = i;
    this.resolvedAt = qn.now();
    let v = !0;
    ck(a, u, f, p) || (v = !1, (jr.instantAnimations || !y) && b?.(Xc(a, i, s)), a[0] = a[a.length - 1], vh(i), i.repeat = 0);
    const S = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > pk ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...i,
      keyframes: a
    }, j = v && !m && mk(S), N = S.motionValue?.owner?.current;
    let R;
    if (j)
      try {
        R = new lk({
          ...S,
          element: N
        });
      } catch {
        R = new Ac(S);
      }
    else
      R = new Ac(S);
    R.finished.then(() => {
      this.notifyFinished();
    }).catch(ai), this.pendingTimeline && (this.stopTimeline = R.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = R;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, s) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), WD()), this._animation;
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
function vS(t, a, s, i = 0, o = 1) {
  const u = Array.from(t).sort((m, b) => m.sortNodePosition(b)).indexOf(a), f = t.size, p = (f - 1) * i;
  return typeof s == "function" ? s(u, f) : o === 1 ? u * i : p - u * i;
}
const vk = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function yk(t) {
  const a = vk.exec(t);
  if (!a)
    return [,];
  const [, s, i, o] = a;
  return [`--${s ?? i}`, o];
}
const bk = 4;
function yS(t, a, s = 1) {
  Ws(s <= bk, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, o] = yk(t);
  if (!i)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(i);
  if (u) {
    const f = u.trim();
    return z1(f) ? parseFloat(f) : f;
  }
  return nm(o) ? yS(o, a, s + 1) : o;
}
const xk = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Sk = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), wk = {
  type: "keyframes",
  duration: 0.8
}, jk = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Ek = (t, { keyframes: a }) => a.length > 2 ? wk : ii.has(t) ? t.startsWith("scale") ? Sk(a[1]) : xk : jk;
function bS(t, a) {
  if (t?.inherit && a) {
    const { inherit: s, ...i } = t;
    return { ...a, ...i };
  }
  return t;
}
function xS(t, a) {
  const s = t?.[a] ?? t?.default ?? t;
  return s !== t ? bS(s, t) : s;
}
const Nk = /* @__PURE__ */ new Set([
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
function Ck(t) {
  for (const a in t)
    if (!Nk.has(a))
      return !0;
  return !1;
}
const Tk = (t, a, s, i = {}, o, u) => (f) => {
  const p = xS(i, t) || {}, y = p.delay || i.delay || 0;
  let { elapsed: m = 0 } = i;
  m = m - /* @__PURE__ */ ta(y);
  const b = {
    keyframes: Array.isArray(s) ? s : [null, s],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...p,
    delay: -m,
    onUpdate: (w) => {
      a.set(w), p.onUpdate && p.onUpdate(w);
    },
    onComplete: () => {
      f(), p.onComplete && p.onComplete();
    },
    name: t,
    motionValue: a,
    element: u ? void 0 : o
  };
  Ck(p) || Object.assign(b, Ek(t, b)), b.duration && (b.duration = /* @__PURE__ */ ta(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ ta(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (vh(b), b.delay === 0 && (v = !0)), (jr.instantAnimations || jr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, vh(b), b.delay = 0), b.allowFlatten = !p.type && !p.ease, v && !u && a.get() !== void 0) {
    const w = Xc(b.keyframes, p);
    if (w !== void 0) {
      na.update(() => {
        b.onUpdate(w), b.onComplete();
      });
      return;
    }
  }
  return p.isSync ? new Ac(b) : new gk(b);
};
function gb(t) {
  const a = [{}, {}];
  return t?.values.forEach((s, i) => {
    a[0][i] = s.get(), a[1][i] = s.getVelocity();
  }), a;
}
function cm(t, a, s, i) {
  if (typeof a == "function") {
    const [o, u] = gb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, u] = gb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  return a;
}
function Zr(t, a, s) {
  const i = t.getProps();
  return cm(i, a, s !== void 0 ? s : i.custom, t);
}
const SS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...si
]), vb = 30, Rk = (t) => !isNaN(parseFloat(t));
class _k {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, s = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const o = qn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const u of this.dependents)
          u.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = s.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = qn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = Rk(this.current));
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
  on(a, s) {
    this.events[a] || (this.events[a] = new U1());
    const i = this.events[a].add(s);
    return a === "change" ? () => {
      i(), na.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
  }
  clearListeners() {
    for (const a in this.events)
      this.events[a].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(a, s) {
    this.passiveEffect = a, this.stopPassiveEffect = s;
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
  setWithVelocity(a, s, i) {
    this.set(s), this.prev = void 0, this.prevFrameValue = a, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(a, s = !0) {
    this.updateAndNotify(a), this.prev = a, this.prevUpdatedAt = this.prevFrameValue = void 0, s && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
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
    const a = qn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > vb)
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, vb);
    return B1(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
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
    return this.stop(), new Promise((s) => {
      this.hasAnimated = !0, this.animation = a(s), this.events.animationStart && this.events.animationStart.notify();
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
function Dc(t, a) {
  return new _k(t, a);
}
const yh = (t) => Array.isArray(t);
function Mk(t, a, s) {
  t.hasValue(a) ? t.getValue(a).set(s) : t.addValue(a, Dc(s));
}
function Ak(t) {
  return yh(t) ? t[t.length - 1] || 0 : t;
}
function Dk(t, a) {
  const s = Zr(t, a);
  let { transitionEnd: i = {}, transition: o = {}, ...u } = s || {};
  u = { ...u, ...i };
  for (const f in u) {
    const p = Ak(u[f]);
    Mk(t, f, p);
  }
}
const xn = (t) => !!(t && t.getVelocity);
function kk(t) {
  return !!(xn(t) && t.add);
}
function zk(t, a) {
  const s = t.getValue("willChange");
  if (kk(s))
    return s.add(a);
  if (!s && jr.WillChange) {
    const i = new jr.WillChange("auto");
    t.addValue("willChange", i), i.add(a);
  }
}
function um(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const Ok = "framerAppearId", wS = "data-" + um(Ok);
function Lk(t) {
  return t.props[wS];
}
function $k({ protectedKeys: t, needsAnimating: a }, s) {
  const i = t.hasOwnProperty(s) && a[s] !== !0;
  return a[s] = !1, i;
}
function jS(t, a, { delay: s = 0, transitionOverride: i, type: o } = {}) {
  let { transition: u, transitionEnd: f, ...p } = a;
  const y = t.getDefaultTransition();
  u = u ? bS(u, y) : y;
  const m = u?.reduceMotion;
  i && (u = i);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const w in p) {
    const S = t.getValue(w, t.latestValues[w] ?? null), j = p[w];
    if (j === void 0 || v && $k(v, w))
      continue;
    const N = {
      delay: s,
      ...xS(u || {}, w)
    }, R = S.get();
    if (R !== void 0 && !S.isAnimating() && !Array.isArray(j) && j === R && !N.velocity) {
      na.update(() => S.set(j));
      continue;
    }
    let C = !1;
    if (window.MotionHandoffAnimation) {
      const T = Lk(t);
      if (T) {
        const q = window.MotionHandoffAnimation(T, w, na);
        q !== null && (N.startTime = q, C = !0);
      }
    }
    zk(t, w);
    const O = m ?? t.shouldReduceMotion;
    S.start(Tk(w, S, j, O && SS.has(w) ? { type: !1 } : N, t, C));
    const M = S.animation;
    M && b.push(M);
  }
  if (f) {
    const w = () => na.update(() => {
      f && Dk(t, f);
    });
    b.length ? Promise.all(b).then(w) : w();
  }
  return b;
}
function bh(t, a, s = {}) {
  const i = Zr(t, a, s.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = i || {};
  s.transitionOverride && (o = s.transitionOverride);
  const u = i ? () => Promise.all(jS(t, i, s)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (y = 0) => {
    const { delayChildren: m = 0, staggerChildren: b, staggerDirection: v } = o;
    return Uk(t, a, y, m, b, v, s);
  } : () => Promise.resolve(), { when: p } = o;
  if (p) {
    const [y, m] = p === "beforeChildren" ? [u, f] : [f, u];
    return y().then(() => m());
  } else
    return Promise.all([u(), f(s.delay)]);
}
function Uk(t, a, s = 0, i = 0, o = 0, u = 1, f) {
  const p = [];
  for (const y of t.variantChildren)
    y.notify("AnimationStart", a), p.push(bh(y, a, {
      ...f,
      delay: s + (typeof i == "function" ? 0 : i) + vS(t.variantChildren, y, i, o, u)
    }).then(() => y.notify("AnimationComplete", a)));
  return Promise.all(p);
}
function Bk(t, a, s = {}) {
  t.notify("AnimationStart", a);
  let i;
  if (Array.isArray(a)) {
    const o = a.map((u) => bh(t, u, s));
    i = Promise.all(o);
  } else if (typeof a == "string")
    i = bh(t, a, s);
  else {
    const o = typeof a == "function" ? Zr(t, a, s.custom) : a;
    i = Promise.all(jS(t, o, s));
  }
  return i.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const Vk = {
  test: (t) => t === "auto",
  parse: (t) => t
}, ES = (t) => (a) => a.test(t), NS = [ri, De, Xs, vr, oD, lD, Vk], yb = (t) => NS.find(ES(t));
function Ik(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || O1(t) : !0;
}
const Hk = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function qk(t) {
  const [a, s] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [i] = s.match(am) || [];
  if (!i)
    return t;
  const o = s.replace(i, "");
  let u = Hk.has(a) ? 1 : 0;
  return i !== s && (u *= 100), a + "(" + u + o + ")";
}
const Fk = /\b([a-z-]*)\(.*?\)/gu, xh = {
  ...da,
  getAnimatableNone: (t) => {
    const a = t.match(Fk);
    return a ? a.map(qk).join(" ") : t;
  }
}, Sh = {
  ...da,
  getAnimatableNone: (t) => {
    const a = da.parse(t);
    return da.createTransformer(t)(a.map((i) => typeof i == "number" ? 0 : typeof i == "object" ? { ...i, alpha: 1 } : i));
  }
}, bb = {
  ...ri,
  transform: Math.round
}, Yk = {
  rotate: vr,
  rotateX: vr,
  rotateY: vr,
  rotateZ: vr,
  scale: ac,
  scaleX: ac,
  scaleY: ac,
  scaleZ: ac,
  skew: vr,
  skewX: vr,
  skewY: vr,
  distance: De,
  translateX: De,
  translateY: De,
  translateZ: De,
  x: De,
  y: De,
  z: De,
  perspective: De,
  transformPerspective: De,
  opacity: Sl,
  originX: sb,
  originY: sb,
  originZ: De
}, dm = {
  // Border props
  borderWidth: De,
  borderTopWidth: De,
  borderRightWidth: De,
  borderBottomWidth: De,
  borderLeftWidth: De,
  borderRadius: De,
  borderTopLeftRadius: De,
  borderTopRightRadius: De,
  borderBottomRightRadius: De,
  borderBottomLeftRadius: De,
  // Positioning props
  width: De,
  maxWidth: De,
  height: De,
  maxHeight: De,
  top: De,
  right: De,
  bottom: De,
  left: De,
  inset: De,
  insetBlock: De,
  insetBlockStart: De,
  insetBlockEnd: De,
  insetInline: De,
  insetInlineStart: De,
  insetInlineEnd: De,
  // Spacing props
  padding: De,
  paddingTop: De,
  paddingRight: De,
  paddingBottom: De,
  paddingLeft: De,
  paddingBlock: De,
  paddingBlockStart: De,
  paddingBlockEnd: De,
  paddingInline: De,
  paddingInlineStart: De,
  paddingInlineEnd: De,
  margin: De,
  marginTop: De,
  marginRight: De,
  marginBottom: De,
  marginLeft: De,
  marginBlock: De,
  marginBlockStart: De,
  marginBlockEnd: De,
  marginInline: De,
  marginInlineStart: De,
  marginInlineEnd: De,
  // Typography
  fontSize: De,
  // Misc
  backgroundPositionX: De,
  backgroundPositionY: De,
  ...Yk,
  zIndex: bb,
  // SVG
  fillOpacity: Sl,
  strokeOpacity: Sl,
  numOctaves: bb
}, Gk = {
  ...dm,
  // Color props
  color: tn,
  backgroundColor: tn,
  outlineColor: tn,
  fill: tn,
  stroke: tn,
  // Border props
  borderColor: tn,
  borderTopColor: tn,
  borderRightColor: tn,
  borderBottomColor: tn,
  borderLeftColor: tn,
  filter: xh,
  WebkitFilter: xh,
  mask: Sh,
  WebkitMask: Sh
}, CS = (t) => Gk[t], Pk = /* @__PURE__ */ new Set([xh, Sh]);
function TS(t, a) {
  let s = CS(t);
  return Pk.has(s) || (s = da), s.getAnimatableNone ? s.getAnimatableNone(a) : void 0;
}
const Kk = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Xk(t, a, s) {
  let i = 0, o;
  for (; i < t.length && !o; ) {
    const u = t[i];
    typeof u == "string" && !Kk.has(u) && ei(u).values.length && (o = t[i]), i++;
  }
  if (o && s)
    for (const u of a)
      t[u] = TS(s, o);
}
class Qk extends om {
  constructor(a, s, i, o, u) {
    super(a, s, i, o, u, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: s, name: i } = this;
    if (!s || !s.current)
      return;
    super.readKeyframes();
    for (let b = 0; b < a.length; b++) {
      let v = a[b];
      if (typeof v == "string" && (v = v.trim(), nm(v))) {
        const w = yS(v, s.current);
        w !== void 0 && (a[b] = w), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !SS.has(i) || a.length !== 2)
      return;
    const [o, u] = a, f = yb(o), p = yb(u), y = rb(o), m = rb(u);
    if (y !== m && Sr[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== p)
      if (hb(f) && hb(p))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else Sr[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: s } = this, i = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || Ik(a[o])) && i.push(o);
    i.length && Xk(a, i, s);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: s, name: i } = this;
    if (!a || !a.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Sr[i](a.measureViewportBox(), window.getComputedStyle(a.current)), s[0] = this.measuredOrigin;
    const o = s[s.length - 1];
    o !== void 0 && a.getValue(i, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: s, unresolvedKeyframes: i } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(s);
    o && o.jump(this.measuredOrigin, !1);
    const u = i.length - 1, f = i[u];
    i[u] = Sr[s](a.measureViewportBox(), window.getComputedStyle(a.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([p, y]) => {
      a.getValue(p).set(y);
    }), this.resolveNoneKeyframes();
  }
}
function Zk(t, a, s) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let i = document;
    const o = s?.[t] ?? i.querySelectorAll(t);
    return o ? Array.from(o) : [];
  }
  return Array.from(t).filter((i) => i != null);
}
const RS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function xc(t) {
  return H5(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: Jk } = /* @__PURE__ */ X1(queueMicrotask, !1), Wk = {
  y: !1
};
function ez() {
  return Wk.y;
}
function _S(t, a) {
  const s = Zk(t), i = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: i.signal
  };
  return [s, o, () => i.abort()];
}
function tz(t) {
  return !(t.pointerType === "touch" || ez());
}
function nz(t, a, s = {}) {
  const [i, o, u] = _S(t, s);
  return i.forEach((f) => {
    let p = !1, y = !1, m;
    const b = () => {
      f.removeEventListener("pointerleave", j);
    }, v = (R) => {
      m && (m(R), m = void 0), b();
    }, w = (R) => {
      p = !1, window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w), y && (y = !1, v(R));
    }, S = () => {
      p = !0, window.addEventListener("pointerup", w, o), window.addEventListener("pointercancel", w, o);
    }, j = (R) => {
      if (R.pointerType !== "touch") {
        if (p) {
          y = !0;
          return;
        }
        v(R);
      }
    }, N = (R) => {
      if (!tz(R))
        return;
      y = !1;
      const C = a(f, R);
      typeof C == "function" && (m = C, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", N, o), f.addEventListener("pointerdown", S, o);
  }), u;
}
const MS = (t, a) => a ? t === a ? !0 : MS(t, a.parentElement) : !1, az = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, rz = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function sz(t) {
  return rz.has(t.tagName) || t.isContentEditable === !0;
}
const Sc = /* @__PURE__ */ new WeakSet();
function xb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function Uf(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const iz = (t, a) => {
  const s = t.currentTarget;
  if (!s)
    return;
  const i = xb(() => {
    if (Sc.has(s))
      return;
    Uf(s, "down");
    const o = xb(() => {
      Uf(s, "up");
    }), u = () => Uf(s, "cancel");
    s.addEventListener("keyup", o, a), s.addEventListener("blur", u, a);
  });
  s.addEventListener("keydown", i, a), s.addEventListener("blur", () => s.removeEventListener("keydown", i), a);
};
function Sb(t) {
  return az(t) && !0;
}
const wb = /* @__PURE__ */ new WeakSet();
function lz(t, a, s = {}) {
  const [i, o, u] = _S(t, s), f = (p) => {
    const y = p.currentTarget;
    if (!Sb(p) || wb.has(p))
      return;
    Sc.add(y), s.stopPropagation && wb.add(p);
    const m = a(y, p), b = (S, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", w), Sc.has(y) && Sc.delete(y), Sb(S) && typeof m == "function" && m(S, { success: j });
    }, v = (S) => {
      b(S, y === window || y === document || s.useGlobalTarget || MS(y, S.target));
    }, w = (S) => {
      b(S, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", w, o);
  };
  return i.forEach((p) => {
    (s.useGlobalTarget ? window : p).addEventListener("pointerdown", f, o), xc(p) && (p.addEventListener("focus", (m) => iz(m, o)), !sz(p) && !p.hasAttribute("tabindex") && (p.tabIndex = 0));
  }), u;
}
const oz = [...NS, tn, da], cz = (t) => oz.find(ES(t)), jb = () => ({ min: 0, max: 0 }), AS = () => ({
  x: jb(),
  y: jb()
}), uz = /* @__PURE__ */ new WeakMap();
function Qc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function wl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const fm = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], hm = ["initial", ...fm];
function Zc(t) {
  return Qc(t.animate) || hm.some((a) => wl(t[a]));
}
function DS(t) {
  return !!(Zc(t) || t.variants);
}
function dz(t, a, s) {
  for (const i in a) {
    const o = a[i], u = s[i];
    if (xn(o))
      t.addValue(i, o);
    else if (xn(u))
      t.addValue(i, Dc(o, { owner: t }));
    else if (u !== o)
      if (t.hasValue(i)) {
        const f = t.getValue(i);
        f.liveStyle === !0 ? f.jump(o) : f.hasAnimated || f.set(o);
      } else {
        const f = t.getStaticValue(i);
        t.addValue(i, Dc(f !== void 0 ? f : o, { owner: t }));
      }
  }
  for (const i in s)
    a[i] === void 0 && t.removeValue(i);
  return a;
}
const kc = { current: null }, mm = { current: !1 }, fz = typeof window < "u";
function kS() {
  if (mm.current = !0, !!fz)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => kc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      kc.current = !1;
}
const Eb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let zc = {};
function zS(t) {
  zc = t;
}
function hz() {
  return zc;
}
class mz {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(a, s, i) {
    return {};
  }
  constructor({ parent: a, props: s, presenceContext: i, reducedMotionConfig: o, skipAnimations: u, blockInitialAnimation: f, visualState: p }, y = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = om, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const S = qn.now();
      this.renderScheduledAt < S && (this.renderScheduledAt = S, na.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: b } = p;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = s.initial ? { ...m } : {}, this.renderState = b, this.parent = a, this.props = s, this.presenceContext = i, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Zc(s), this.isVariantNode = DS(s), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...w } = this.scrapeMotionValuesFromProps(s, {}, this);
    for (const S in w) {
      const j = w[S];
      m[S] !== void 0 && xn(j) && j.set(m[S]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const s in this.initialValues)
        this.values.get(s)?.jump(this.initialValues[s]), this.latestValues[s] = this.initialValues[s];
    this.current = a, uz.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, i) => this.bindToMotionValue(i, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (mm.current || kS(), this.shouldReduceMotion = kc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), sh(this.notifyUpdate), sh(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const a in this.events)
      this.events[a].clear();
    for (const a in this.features) {
      const s = this.features[a];
      s && (s.unmount(), s.isMounted = !1);
    }
    this.current = null;
  }
  addChild(a) {
    this.children.add(a), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(a);
  }
  removeChild(a) {
    this.children.delete(a), this.enteringChildren && this.enteringChildren.delete(a);
  }
  bindToMotionValue(a, s) {
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), s.accelerate && gS.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: p, times: y, ease: m, duration: b } = s.accelerate, v = new mS({
        element: this.current,
        name: a,
        keyframes: p,
        times: y,
        ease: m,
        duration: /* @__PURE__ */ ta(b)
      }), w = f(v);
      this.valueSubscriptions.set(a, () => {
        w(), v.cancel();
      });
      return;
    }
    const i = ii.has(a);
    i && this.onBindTransform && this.onBindTransform();
    const o = s.on("change", (f) => {
      this.latestValues[a] = f, this.props.onUpdate && na.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let u;
    typeof window < "u" && window.MotionCheckAppearSync && (u = window.MotionCheckAppearSync(this, a, s)), this.valueSubscriptions.set(a, () => {
      o(), u && u(), s.owner && s.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in zc) {
      const s = zc[a];
      if (!s)
        continue;
      const { isEnabled: i, Feature: o } = s;
      if (!this.features[a] && o && i(this.props) && (this.features[a] = new o(this)), this.features[a]) {
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : AS();
  }
  getStaticValue(a) {
    return this.latestValues[a];
  }
  setStaticValue(a, s) {
    this.latestValues[a] = s;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(a, s) {
    (a.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = a, this.prevPresenceContext = this.presenceContext, this.presenceContext = s;
    for (let i = 0; i < Eb.length; i++) {
      const o = Eb[i];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, f = a[u];
      f && (this.propEventSubscriptions[o] = this.on(o, f));
    }
    this.prevMotionValues = dz(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const s = this.getClosestVariantNode();
    if (s)
      return s.variantChildren && s.variantChildren.add(a), () => s.variantChildren.delete(a);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(a, s) {
    const i = this.values.get(a);
    s !== i && (i && this.removeValue(a), this.bindToMotionValue(a, s), this.values.set(a, s), this.latestValues[a] = s.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(a) {
    this.values.delete(a);
    const s = this.valueSubscriptions.get(a);
    s && (s(), this.valueSubscriptions.delete(a)), delete this.latestValues[a], this.removeValueFromRenderState(a, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(a) {
    return this.values.has(a);
  }
  getValue(a, s) {
    if (this.props.values && this.props.values[a])
      return this.props.values[a];
    let i = this.values.get(a);
    return i === void 0 && s !== void 0 && (i = Dc(s === null ? void 0 : s, { owner: this }), this.addValue(a, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, s) {
    let i = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return i != null && (typeof i == "string" && (z1(i) || O1(i)) ? i = parseFloat(i) : !cz(i) && da.test(s) && (i = TS(a, s)), this.setBaseTarget(a, xn(i) ? i.get() : i)), xn(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(a, s) {
    this.baseTarget[a] = s;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(a) {
    const { initial: s } = this.props;
    let i;
    if (typeof s == "string" || typeof s == "object") {
      const u = cm(this.props, s, this.presenceContext?.custom);
      u && (i = u[a]);
    }
    if (s && i !== void 0)
      return i;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !xn(o) ? o : this.initialValues[a] !== void 0 && i === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, s) {
    return this.events[a] || (this.events[a] = new U1()), this.events[a].add(s);
  }
  notify(a, ...s) {
    this.events[a] && this.events[a].notify(...s);
  }
  scheduleRenderMicrotask() {
    Jk.render(this.render);
  }
}
class OS extends mz {
  constructor() {
    super(...arguments), this.KeyframeResolver = Qk;
  }
  sortInstanceNodePosition(a, s) {
    return a.compareDocumentPosition(s) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(a, s) {
    const i = a.style;
    return i ? i[s] : void 0;
  }
  removeValueFromRenderState(a, { vars: s, style: i }) {
    delete s[a], delete i[a];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: a } = this.props;
    xn(a) && (this.childSubscription = a.on("change", (s) => {
      this.current && (this.current.textContent = `${s}`);
    }));
  }
}
class li {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function pz({ top: t, left: a, right: s, bottom: i }) {
  return {
    x: { min: a, max: s },
    y: { min: t, max: i }
  };
}
function gz(t, a) {
  if (!a)
    return t;
  const s = a({ x: t.left, y: t.top }), i = a({ x: t.right, y: t.bottom });
  return {
    top: s.y,
    left: s.x,
    bottom: i.y,
    right: i.x
  };
}
function vz(t, a) {
  return pz(gz(t.getBoundingClientRect(), a));
}
const yz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, bz = si.length;
function xz(t, a, s) {
  let i = "", o = !0;
  for (let u = 0; u < bz; u++) {
    const f = si[u], p = t[f];
    if (p === void 0)
      continue;
    let y = !0;
    if (typeof p == "number")
      y = p === (f.startsWith("scale") ? 1 : 0);
    else {
      const m = parseFloat(p);
      y = f.startsWith("scale") ? m === 1 : m === 0;
    }
    if (!y || s) {
      const m = RS(p, dm[f]);
      if (!y) {
        o = !1;
        const b = yz[f] || f;
        i += `${b}(${m}) `;
      }
      s && (a[f] = m);
    }
  }
  return i = i.trim(), s ? i = s(a, o ? "" : i) : o && (i = "none"), i;
}
function pm(t, a, s) {
  const { style: i, vars: o, transformOrigin: u } = t;
  let f = !1, p = !1;
  for (const y in a) {
    const m = a[y];
    if (ii.has(y)) {
      f = !0;
      continue;
    } else if (Z1(y)) {
      o[y] = m;
      continue;
    } else {
      const b = RS(m, dm[y]);
      y.startsWith("origin") ? (p = !0, u[y] = b) : i[y] = b;
    }
  }
  if (a.transform || (f || s ? i.transform = xz(a, t.transform, s) : i.transform && (i.transform = "none")), p) {
    const { originX: y = "50%", originY: m = "50%", originZ: b = 0 } = u;
    i.transformOrigin = `${y} ${m} ${b}`;
  }
}
function LS(t, { style: a, vars: s }, i, o) {
  const u = t.style;
  let f;
  for (f in a)
    u[f] = a[f];
  o?.applyProjectionStyles(u, i);
  for (f in s)
    u.setProperty(f, s[f]);
}
function Nb(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const al = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (De.test(t))
        t = parseFloat(t);
      else
        return t;
    const s = Nb(t, a.target.x), i = Nb(t, a.target.y);
    return `${s}% ${i}%`;
  }
}, Sz = {
  correct: (t, { treeScale: a, projectionDelta: s }) => {
    const i = t, o = da.parse(t);
    if (o.length > 5)
      return i;
    const u = da.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, p = s.x.scale * a.x, y = s.y.scale * a.y;
    o[0 + f] /= p, o[1 + f] /= y;
    const m = Al(p, y, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= m), typeof o[3 + f] == "number" && (o[3 + f] /= m), u(o);
  }
}, wz = {
  borderRadius: {
    ...al,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: al,
  borderTopRightRadius: al,
  borderBottomLeftRadius: al,
  borderBottomRightRadius: al,
  boxShadow: Sz
};
function $S(t, { layout: a, layoutId: s }) {
  return ii.has(t) || t.startsWith("origin") || (a || s !== void 0) && (!!wz[t] || t === "opacity");
}
function gm(t, a, s) {
  const i = t.style, o = a?.style, u = {};
  if (!i)
    return u;
  for (const f in i)
    (xn(i[f]) || o && xn(o[f]) || $S(f, t) || s?.getValue(f)?.liveStyle !== void 0) && (u[f] = i[f]);
  return u;
}
function jz(t) {
  return window.getComputedStyle(t);
}
class Ez extends OS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = LS;
  }
  readValueFromInstance(a, s) {
    if (ii.has(s))
      return this.projection?.isProjecting ? fh(s) : KD(a, s);
    {
      const i = jz(a), o = (Z1(s) ? i.getPropertyValue(s) : i[s]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: s }) {
    return vz(a, s);
  }
  build(a, s, i) {
    pm(a, s, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return gm(a, s, i);
  }
}
const Nz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Cz = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Tz(t, a, s = 1, i = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? Nz : Cz;
  t[u.offset] = `${-i}`, t[u.array] = `${a} ${s}`;
}
const Rz = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function US(t, {
  attrX: a,
  attrY: s,
  attrScale: i,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...p
}, y, m, b) {
  if (pm(t, p, m), y) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: w } = t;
  v.transform && (w.transform = v.transform, delete v.transform), (w.transform || v.transformOrigin) && (w.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), w.transform && (w.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const S of Rz)
    v[S] !== void 0 && (w[S] = v[S], delete v[S]);
  a !== void 0 && (v.x = a), s !== void 0 && (v.y = s), i !== void 0 && (v.scale = i), o !== void 0 && Tz(v, o, u, f, !1);
}
const BS = /* @__PURE__ */ new Set([
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
]), VS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function _z(t, a, s, i) {
  LS(t, a, void 0, i);
  for (const o in a.attrs)
    t.setAttribute(BS.has(o) ? o : um(o), a.attrs[o]);
}
function IS(t, a, s) {
  const i = gm(t, a, s);
  for (const o in t)
    if (xn(t[o]) || xn(a[o])) {
      const u = si.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      i[u] = t[o];
    }
  return i;
}
class Mz extends OS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = AS;
  }
  getBaseTargetFromProps(a, s) {
    return a[s];
  }
  readValueFromInstance(a, s) {
    if (ii.has(s)) {
      const i = CS(s);
      return i && i.default || 0;
    }
    return s = BS.has(s) ? s : um(s), a.getAttribute(s);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return IS(a, s, i);
  }
  build(a, s, i) {
    US(a, s, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(a, s, i, o) {
    _z(a, s, i, o);
  }
  mount(a) {
    this.isSVGTag = VS(a.tagName), super.mount(a);
  }
}
const Az = hm.length;
function HS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const s = t.parent ? HS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (s.initial = t.props.initial), s;
  }
  const a = {};
  for (let s = 0; s < Az; s++) {
    const i = hm[s], o = t.props[i];
    (wl(o) || o === !1) && (a[i] = o);
  }
  return a;
}
function qS(t, a) {
  if (!Array.isArray(a))
    return !1;
  const s = a.length;
  if (s !== t.length)
    return !1;
  for (let i = 0; i < s; i++)
    if (a[i] !== t[i])
      return !1;
  return !0;
}
const Dz = [...fm].reverse(), kz = fm.length;
function zz(t) {
  return (a) => Promise.all(a.map(({ animation: s, options: i }) => Bk(t, s, i)));
}
function Oz(t) {
  let a = zz(t), s = Cb(), i = !0, o = !1;
  const u = (m) => (b, v) => {
    const w = Zr(t, v, m === "exit" ? t.presenceContext?.custom : void 0);
    if (w) {
      const { transition: S, transitionEnd: j, ...N } = w;
      b = { ...b, ...N, ...j };
    }
    return b;
  };
  function f(m) {
    a = m(t);
  }
  function p(m) {
    const { props: b } = t, v = HS(t.parent) || {}, w = [], S = /* @__PURE__ */ new Set();
    let j = {}, N = 1 / 0;
    for (let C = 0; C < kz; C++) {
      const O = Dz[C], M = s[O], T = b[O] !== void 0 ? b[O] : v[O], q = wl(T), Q = O === m ? M.isActive : null;
      Q === !1 && (N = C);
      let re = T === v[O] && T !== b[O] && q;
      if (re && (i || o) && t.manuallyAnimateOnMount && (re = !1), M.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !M.isActive && Q === null || // If we didn't and don't have any defined prop for this animation type
      !T && !M.prevProp || // Or if the prop doesn't define an animation
      Qc(T) || typeof T == "boolean")
        continue;
      if (O === "exit" && M.isActive && Q !== !0) {
        M.prevResolvedValues && (j = {
          ...j,
          ...M.prevResolvedValues
        });
        continue;
      }
      const _ = Lz(M.prevProp, T);
      let V = _ || // If we're making this variant active, we want to always make it active
      O === m && M.isActive && !re && q || // If we removed a higher-priority variant (i is in reverse order)
      C > N && q, k = !1;
      const F = Array.isArray(T) ? T : [T];
      let W = F.reduce(u(O), {});
      Q === !1 && (W = {});
      const { prevResolvedValues: ae = {} } = M, K = {
        ...ae,
        ...W
      }, le = ($) => {
        V = !0, S.has($) && (k = !0, S.delete($)), M.needsAnimating[$] = !0;
        const se = t.getValue($);
        se && (se.liveStyle = !1);
      };
      for (const $ in K) {
        const se = W[$], de = ae[$];
        if (j.hasOwnProperty($))
          continue;
        let D = !1;
        yh(se) && yh(de) ? D = !qS(se, de) : D = se !== de, D ? se != null ? le($) : S.add($) : se !== void 0 && S.has($) ? le($) : M.protectedKeys[$] = !0;
      }
      M.prevProp = T, M.prevResolvedValues = W, M.isActive && (j = { ...j, ...W }), (i || o) && t.blockInitialAnimation && (V = !1);
      const A = re && _;
      V && (!A || k) && w.push(...F.map(($) => {
        const se = { type: O };
        if (typeof $ == "string" && (i || o) && !A && t.manuallyAnimateOnMount && t.parent) {
          const { parent: de } = t, D = Zr(de, $);
          if (de.enteringChildren && D) {
            const { delayChildren: H } = D.transition || {};
            se.delay = vS(de.enteringChildren, t, H);
          }
        }
        return {
          animation: $,
          options: se
        };
      }));
    }
    if (S.size) {
      const C = {};
      if (typeof b.initial != "boolean") {
        const O = Zr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        O && O.transition && (C.transition = O.transition);
      }
      S.forEach((O) => {
        const M = t.getBaseTarget(O), T = t.getValue(O);
        T && (T.liveStyle = !0), C[O] = M ?? null;
      }), w.push({ animation: C });
    }
    let R = !!w.length;
    return i && (b.initial === !1 || b.initial === b.animate) && !t.manuallyAnimateOnMount && (R = !1), i = !1, o = !1, R ? a(w) : Promise.resolve();
  }
  function y(m, b) {
    if (s[m].isActive === b)
      return Promise.resolve();
    t.variantChildren?.forEach((w) => w.animationState?.setActive(m, b)), s[m].isActive = b;
    const v = p(m);
    for (const w in s)
      s[w].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: p,
    setActive: y,
    setAnimateFunction: f,
    getState: () => s,
    reset: () => {
      s = Cb(), o = !0;
    }
  };
}
function Lz(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !qS(a, t) : !1;
}
function Fr(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Cb() {
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
function Tb(t, a, s, i = { passive: !0 }) {
  return t.addEventListener(a, s, i), () => t.removeEventListener(a, s);
}
function $z(t) {
  return xn(t) ? t.get() : t;
}
const vm = g.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function Rb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function Uz(...t) {
  return (a) => {
    let s = !1;
    const i = t.map((o) => {
      const u = Rb(o, a);
      return !s && typeof u == "function" && (s = !0), u;
    });
    if (s)
      return () => {
        for (let o = 0; o < i.length; o++) {
          const u = i[o];
          typeof u == "function" ? u() : Rb(t[o], null);
        }
      };
  };
}
function Bz(...t) {
  return g.useCallback(Uz(...t), t);
}
class Vz extends g.Component {
  getSnapshotBeforeUpdate(a) {
    const s = this.props.childRef.current;
    if (xc(s) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const i = s.offsetParent, o = xc(i) && i.offsetWidth || 0, u = xc(i) && i.offsetHeight || 0, f = getComputedStyle(s), p = this.props.sizeRef.current;
      p.height = parseFloat(f.height), p.width = parseFloat(f.width), p.top = s.offsetTop, p.left = s.offsetLeft, p.right = o - p.width - p.left, p.bottom = u - p.height - p.top;
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
function Iz({ children: t, isPresent: a, anchorX: s, anchorY: i, root: o, pop: u }) {
  const f = g.useId(), p = g.useRef(null), y = g.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = g.useContext(vm), b = t.props?.ref ?? t?.ref, v = Bz(p, b);
  return g.useInsertionEffect(() => {
    const { width: w, height: S, top: j, left: N, right: R, bottom: C } = y.current;
    if (a || u === !1 || !p.current || !w || !S)
      return;
    const O = s === "left" ? `left: ${N}` : `right: ${R}`, M = i === "bottom" ? `bottom: ${C}` : `top: ${j}`;
    p.current.dataset.motionPopId = f;
    const T = document.createElement("style");
    m && (T.nonce = m);
    const q = o ?? document.head;
    return q.appendChild(T), T.sheet && T.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${w}px !important;
            height: ${S}px !important;
            ${O}px !important;
            ${M}px !important;
          }
        `), () => {
      p.current?.removeAttribute("data-motion-pop-id"), q.contains(T) && q.removeChild(T);
    };
  }, [a]), c.jsx(Vz, { isPresent: a, childRef: p, sizeRef: y, pop: u, children: u === !1 ? t : g.cloneElement(t, { ref: v }) });
}
const Hz = ({ children: t, initial: a, isPresent: s, onExitComplete: i, custom: o, presenceAffectsLayout: u, mode: f, anchorX: p, anchorY: y, root: m }) => {
  const b = Wh(qz), v = g.useId();
  let w = !0, S = g.useMemo(() => (w = !1, {
    id: v,
    initial: a,
    isPresent: s,
    custom: o,
    onExitComplete: (j) => {
      b.set(j, !0);
      for (const N of b.values())
        if (!N)
          return;
      i && i();
    },
    register: (j) => (b.set(j, !1), () => b.delete(j))
  }), [s, b, i]);
  return u && w && (S = { ...S }), g.useMemo(() => {
    b.forEach((j, N) => b.set(N, !1));
  }, [s]), g.useEffect(() => {
    !s && !b.size && i && i();
  }, [s]), t = c.jsx(Iz, { pop: f === "popLayout", isPresent: s, anchorX: p, anchorY: y, root: m, children: t }), c.jsx(Pc.Provider, { value: S, children: t });
};
function qz() {
  return /* @__PURE__ */ new Map();
}
function Fz(t = !0) {
  const a = g.useContext(Pc);
  if (a === null)
    return [!0, null];
  const { isPresent: s, onExitComplete: i, register: o } = a, u = g.useId();
  g.useEffect(() => {
    if (t)
      return o(u);
  }, [t]);
  const f = g.useCallback(() => t && i && i(u), [u, i, t]);
  return !s && i ? [!1, f] : [!0];
}
const rc = (t) => t.key || "";
function _b(t) {
  const a = [];
  return g.Children.forEach(t, (s) => {
    g.isValidElement(s) && a.push(s);
  }), a;
}
const FS = ({ children: t, custom: a, initial: s = !0, onExitComplete: i, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: p = "left", anchorY: y = "top", root: m }) => {
  const [b, v] = Fz(f), w = g.useMemo(() => _b(t), [t]), S = f && !b ? [] : w.map(rc), j = g.useRef(!0), N = g.useRef(w), R = Wh(() => /* @__PURE__ */ new Map()), C = g.useRef(/* @__PURE__ */ new Set()), [O, M] = g.useState(w), [T, q] = g.useState(w);
  k1(() => {
    j.current = !1, N.current = w;
    for (let _ = 0; _ < T.length; _++) {
      const V = rc(T[_]);
      S.includes(V) ? (R.delete(V), C.current.delete(V)) : R.get(V) !== !0 && R.set(V, !1);
    }
  }, [T, S.length, S.join("-")]);
  const Q = [];
  if (w !== O) {
    let _ = [...w];
    for (let V = 0; V < T.length; V++) {
      const k = T[V], F = rc(k);
      S.includes(F) || (_.splice(V, 0, k), Q.push(k));
    }
    return u === "wait" && Q.length && (_ = Q), q(_b(_)), M(w), null;
  }
  const { forceRender: re } = g.useContext(D1);
  return c.jsx(c.Fragment, { children: T.map((_) => {
    const V = rc(_), k = f && !b ? !1 : w === T || S.includes(V), F = () => {
      if (C.current.has(V))
        return;
      if (R.has(V))
        C.current.add(V), R.set(V, !0);
      else
        return;
      let W = !0;
      R.forEach((ae) => {
        ae || (W = !1);
      }), W && (re?.(), q(N.current), f && v?.(), i && i());
    };
    return c.jsx(Hz, { isPresent: k, initial: !j.current || s ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: m, onExitComplete: k ? void 0 : F, anchorX: p, anchorY: y, children: _ }, V);
  }) });
}, ym = g.createContext({ strict: !1 }), Mb = {
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
let Ab = !1;
function Yz() {
  if (Ab)
    return;
  const t = {};
  for (const a in Mb)
    t[a] = {
      isEnabled: (s) => Mb[a].some((i) => !!s[i])
    };
  zS(t), Ab = !0;
}
function YS() {
  return Yz(), hz();
}
function wh(t) {
  const a = YS();
  for (const s in t)
    a[s] = {
      ...a[s],
      ...t[s]
    };
  zS(a);
}
function bm({ children: t, features: a, strict: s = !1 }) {
  const [, i] = g.useState(!Bf(a)), o = g.useRef(void 0);
  if (!Bf(a)) {
    const { renderer: u, ...f } = a;
    o.current = u, wh(f);
  }
  return g.useEffect(() => {
    Bf(a) && a().then(({ renderer: u, ...f }) => {
      wh(f), o.current = u, i(!0);
    });
  }, []), c.jsx(ym.Provider, { value: { renderer: o.current, strict: s }, children: t });
}
function Bf(t) {
  return typeof t == "function";
}
const Gz = /* @__PURE__ */ new Set([
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
function Oc(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Gz.has(t);
}
let GS = (t) => !Oc(t);
function Pz(t) {
  typeof t == "function" && (GS = (a) => a.startsWith("on") ? !Oc(a) : t(a));
}
try {
  Pz(require("@emotion/is-prop-valid").default);
} catch {
}
function Kz(t, a, s) {
  const i = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || xn(t[o]) || (GS(o) || s === !0 && Oc(o) || !a && !Oc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (i[o] = t[o]);
  return i;
}
const Jc = /* @__PURE__ */ g.createContext({});
function Xz(t, a) {
  if (Zc(t)) {
    const { initial: s, animate: i } = t;
    return {
      initial: s === !1 || wl(s) ? s : void 0,
      animate: wl(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function Qz(t) {
  const { initial: a, animate: s } = Xz(t, g.useContext(Jc));
  return g.useMemo(() => ({ initial: a, animate: s }), [Db(a), Db(s)]);
}
function Db(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const xm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function PS(t, a, s) {
  for (const i in a)
    !xn(a[i]) && !$S(i, s) && (t[i] = a[i]);
}
function Zz({ transformTemplate: t }, a) {
  return g.useMemo(() => {
    const s = xm();
    return pm(s, a, t), Object.assign({}, s.vars, s.style);
  }, [a]);
}
function Jz(t, a) {
  const s = t.style || {}, i = {};
  return PS(i, s, t), Object.assign(i, Zz(t, a)), i;
}
function Wz(t, a) {
  const s = {}, i = Jz(t, a);
  return t.drag && t.dragListener !== !1 && (s.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = i, s;
}
const KS = () => ({
  ...xm(),
  attrs: {}
});
function e4(t, a, s, i) {
  const o = g.useMemo(() => {
    const u = KS();
    return US(u, a, VS(i), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    PS(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const t4 = [
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
function Sm(t) {
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
      !!(t4.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function n4(t, a, s, { latestValues: i }, o, u = !1, f) {
  const y = (f ?? Sm(t) ? e4 : Wz)(a, i, o, t), m = Kz(a, typeof t == "string", u), b = t !== g.Fragment ? { ...m, ...y, ref: s } : {}, { children: v } = a, w = g.useMemo(() => xn(v) ? v.get() : v, [v]);
  return g.createElement(t, {
    ...b,
    children: w
  });
}
function a4({ scrapeMotionValuesFromProps: t, createRenderState: a }, s, i, o) {
  return {
    latestValues: r4(s, i, o, t),
    renderState: a()
  };
}
function r4(t, a, s, i) {
  const o = {}, u = i(t, {});
  for (const w in u)
    o[w] = $z(u[w]);
  let { initial: f, animate: p } = t;
  const y = Zc(t), m = DS(t);
  a && m && !y && t.inherit !== !1 && (f === void 0 && (f = a.initial), p === void 0 && (p = a.animate));
  let b = s ? s.initial === !1 : !1;
  b = b || f === !1;
  const v = b ? p : f;
  if (v && typeof v != "boolean" && !Qc(v)) {
    const w = Array.isArray(v) ? v : [v];
    for (let S = 0; S < w.length; S++) {
      const j = cm(t, w[S]);
      if (j) {
        const { transitionEnd: N, transition: R, ...C } = j;
        for (const O in C) {
          let M = C[O];
          if (Array.isArray(M)) {
            const T = b ? M.length - 1 : 0;
            M = M[T];
          }
          M !== null && (o[O] = M);
        }
        for (const O in N)
          o[O] = N[O];
      }
    }
  }
  return o;
}
const XS = (t) => (a, s) => {
  const i = g.useContext(Jc), o = g.useContext(Pc), u = () => a4(t, a, i, o);
  return s ? u() : Wh(u);
}, s4 = /* @__PURE__ */ XS({
  scrapeMotionValuesFromProps: gm,
  createRenderState: xm
}), i4 = /* @__PURE__ */ XS({
  scrapeMotionValuesFromProps: IS,
  createRenderState: KS
}), l4 = Symbol.for("motionComponentSymbol");
function o4(t, a, s) {
  const i = g.useRef(s);
  g.useInsertionEffect(() => {
    i.current = s;
  });
  const o = g.useRef(null);
  return g.useCallback((u) => {
    u && t.onMount?.(u);
    const f = i.current;
    if (typeof f == "function")
      if (u) {
        const p = f(u);
        typeof p == "function" && (o.current = p);
      } else o.current ? (o.current(), o.current = null) : f(u);
    else f && (f.current = u);
    a && (u ? a.mount(u) : a.unmount());
  }, [a]);
}
const c4 = g.createContext({});
function u4(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function d4(t, a, s, i, o, u) {
  const { visualElement: f } = g.useContext(Jc), p = g.useContext(ym), y = g.useContext(Pc), m = g.useContext(vm), b = m.reducedMotion, v = m.skipAnimations, w = g.useRef(null), S = g.useRef(!1);
  i = i || p.renderer, !w.current && i && (w.current = i(t, {
    visualState: a,
    parent: f,
    props: s,
    presenceContext: y,
    blockInitialAnimation: y ? y.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: u
  }), S.current && w.current && (w.current.manuallyAnimateOnMount = !0));
  const j = w.current, N = g.useContext(c4);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && f4(w.current, s, o, N);
  const R = g.useRef(!1);
  g.useInsertionEffect(() => {
    j && R.current && j.update(s, y);
  });
  const C = s[wS], O = g.useRef(!!C && typeof window < "u" && !window.MotionHandoffIsComplete?.(C) && window.MotionHasOptimisedAnimation?.(C));
  return k1(() => {
    S.current = !0, j && (R.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), O.current && j.animationState && j.animationState.animateChanges());
  }), g.useEffect(() => {
    j && (!O.current && j.animationState && j.animationState.animateChanges(), O.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(C);
    }), O.current = !1), j.enteringChildren = void 0);
  }), j;
}
function f4(t, a, s, i) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: p, layoutScroll: y, layoutRoot: m, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new s(t.latestValues, a["data-framer-portal-id"] ? void 0 : QS(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!f || p && u4(p),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof u == "string" ? u : "both",
    initialPromotionConfig: i,
    crossfade: v,
    layoutScroll: y,
    layoutRoot: m,
    layoutAnchor: b
  });
}
function QS(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : QS(t.parent);
}
function Vf(t, { forwardMotionProps: a = !1, type: s } = {}, i, o) {
  i && wh(i);
  const u = s ? s === "svg" : Sm(t), f = u ? i4 : s4;
  function p(m, b) {
    let v;
    const w = {
      ...g.useContext(vm),
      ...m,
      layoutId: h4(m)
    }, { isStatic: S } = w, j = Qz(m), N = f(m, S);
    if (!S && typeof window < "u") {
      m4();
      const R = p4(w);
      v = R.MeasureLayout, j.visualElement = d4(t, N, w, o, R.ProjectionNode, u);
    }
    return c.jsxs(Jc.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...w }) : null, n4(t, m, o4(N, j.visualElement, b), N, S, a, u)] });
  }
  p.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const y = g.forwardRef(p);
  return y[l4] = t, y;
}
function h4({ layoutId: t }) {
  const a = g.useContext(D1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function m4(t, a) {
  g.useContext(ym).strict;
}
function p4(t) {
  const a = YS(), { drag: s, layout: i } = a;
  if (!s && !i)
    return {};
  const o = { ...s, ...i };
  return {
    MeasureLayout: s?.isEnabled(t) || i?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function g4(t, a) {
  if (typeof Proxy > "u")
    return Vf;
  const s = /* @__PURE__ */ new Map(), i = (u, f) => Vf(u, f, t, a), o = (u, f) => i(u, f);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, f) => f === "create" ? i : (s.has(f) || s.set(f, Vf(f, void 0, t, a)), s.get(f))
  });
}
const wm = /* @__PURE__ */ g4(), v4 = (t, a) => a.isSVG ?? Sm(t) ? new Mz(a) : new Ez(a, {
  allowProjection: t !== g.Fragment
});
class y4 extends li {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = Oz(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Qc(a) && (this.unmountControls = a.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: a } = this.node.getProps(), { animate: s } = this.node.prevProps || {};
    a !== s && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let b4 = 0;
class x4 extends li {
  constructor() {
    super(...arguments), this.id = b4++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: s } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === i)
      return;
    if (a && i === !1) {
      if (this.isExitComplete) {
        const { initial: u, custom: f } = this.node.getProps();
        if (typeof u == "string") {
          const p = Zr(this.node, u, f);
          if (p) {
            const { transition: y, transitionEnd: m, ...b } = p;
            for (const v in b)
              this.node.getValue(v)?.jump(b[v]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const o = this.node.animationState.setActive("exit", !a);
    s && !a && o.then(() => {
      this.isExitComplete = !0, s(this.id);
    });
  }
  mount() {
    const { register: a, onExitComplete: s } = this.node.presenceContext || {};
    s && s(this.id), a && (this.unmount = a(this.id));
  }
  unmount() {
  }
}
const S4 = {
  animation: {
    Feature: y4
  },
  exit: {
    Feature: x4
  }
};
function ZS(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function kb(t, a, s) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", s === "Start");
  const o = "onHover" + s, u = i[o];
  u && na.postRender(() => u(a, ZS(a)));
}
class w4 extends li {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = nz(a, (s, i) => (kb(this.node, i, "Start"), (o) => kb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class j4 extends li {
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
    this.unmount = Kc(Tb(this.node.current, "focus", () => this.onFocus()), Tb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function zb(t, a, s) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", s === "Start");
  const o = "onTap" + (s === "End" ? "" : s), u = i[o];
  u && na.postRender(() => u(a, ZS(a)));
}
class E4 extends li {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: s, propagate: i } = this.node.props;
    this.unmount = lz(a, (o, u) => (zb(this.node, u, "Start"), (f, { success: p }) => zb(this.node, f, p ? "End" : "Cancel")), {
      useGlobalTarget: s,
      stopPropagation: i?.tap === !1
    });
  }
  unmount() {
  }
}
const jh = /* @__PURE__ */ new WeakMap(), If = /* @__PURE__ */ new WeakMap(), N4 = (t) => {
  const a = jh.get(t.target);
  a && a(t);
}, C4 = (t) => {
  t.forEach(N4);
};
function T4({ root: t, ...a }) {
  const s = t || document;
  If.has(s) || If.set(s, {});
  const i = If.get(s), o = JSON.stringify(a);
  return i[o] || (i[o] = new IntersectionObserver(C4, { root: t, ...a })), i[o];
}
function R4(t, a, s) {
  const i = T4(a);
  return jh.set(t, s), i.observe(t), () => {
    jh.delete(t), i.unobserve(t);
  };
}
const _4 = {
  some: 0,
  all: 1
};
class M4 extends li {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: s, margin: i, amount: o = "some", once: u } = a, f = {
      root: s ? s.current : void 0,
      rootMargin: i,
      threshold: typeof o == "number" ? o : _4[o]
    }, p = (y) => {
      const { isIntersecting: m } = y;
      if (this.isInView === m || (this.isInView = m, u && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), w = m ? b : v;
      w && w(y);
    };
    this.stopObserver = R4(this.node.current, f, p);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(A4(a, s)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function A4({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (s) => t[s] !== a[s];
}
const D4 = {
  inView: {
    Feature: M4
  },
  tap: {
    Feature: E4
  },
  focus: {
    Feature: j4
  },
  hover: {
    Feature: w4
  }
}, jm = {
  renderer: v4,
  ...S4,
  ...D4
};
function k4() {
  !mm.current && kS();
  const [t] = g.useState(kc.current);
  return t;
}
const Eh = "emotion-tts:trigger-generate", Nh = "emotion-tts:run-state";
function z4() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Eh));
}
function O4(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Nh, { detail: t }));
}
function L4(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Eh, t), () => window.removeEventListener(Eh, t));
}
function JS(t) {
  if (typeof window > "u") return () => {
  };
  const a = (s) => {
    const i = s.detail;
    i && t(i);
  };
  return window.addEventListener(Nh, a), () => window.removeEventListener(Nh, a);
}
var $4 = "wksjad0", U4 = "wksjad1", B4 = "wksjad2", V4 = "wksjad3", I4 = "wksjad4", H4 = "wksjad5", q4 = "wksjad6", F4 = "wksjad7", Y4 = "wksjad8", G4 = "wksjad9", P4 = "wksjada", K4 = "wksjadb", X4 = "wksjadc", Q4 = "wksjadd", Z4 = "wksjade", J4 = "wksjadf", W4 = "wksjadg", Hf = "wksjadh", eO = "wksjadi", tO = "wksjadj", nO = "wksjadk", aO = "wksjadl", rO = "wksjadm", sO = "wksjadn";
const Ch = 5, iO = 5e-3;
function WS(t, a = "") {
  return `${Sa}/deployments/${t}/artifacts${a}`;
}
function lO(t) {
  const [a, s] = g.useState([]), [i, o] = g.useState(!1), [u, f] = g.useState(null), [p, y] = g.useState(0), m = g.useRef(null), b = g.useRef(!1), v = g.useCallback(() => y((w) => w + 1), []);
  return g.useEffect(() => {
    m.current?.abort();
    const w = new AbortController();
    return m.current = w, o(!0), f(null), fetch(`${WS(t)}?limit=${Ch}`, {
      headers: { accept: "application/json" },
      signal: w.signal
    }).then(async (S) => {
      if (!S.ok)
        throw new Error(`HTTP ${S.status}`);
      const j = await S.json();
      w.signal.aborted || s(j.artifacts.slice(0, Ch));
    }).catch((S) => {
      if (w.signal.aborted) return;
      const j = S instanceof Error ? S.message : "fetch failed";
      f(j);
    }).finally(() => {
      w.signal.aborted || o(!1);
    }), () => w.abort();
  }, [t, p]), g.useEffect(() => JS((w) => {
    const S = b.current;
    b.current = w.busy, S && !w.busy && v();
  }), [v]), { rows: a, loading: i, error: u, refetch: v, tick: p };
}
function oO(t, a) {
  const [s, i] = g.useState(() => /* @__PURE__ */ new Map());
  return g.useEffect(() => {
    let o = !1;
    return Qs(t).then(({ voiceAssets: u }) => {
      if (o) return;
      const f = /* @__PURE__ */ new Map();
      for (const p of u)
        f.set(p.voiceAssetId, p.displayName);
      i(f);
    }).catch(() => {
    }), () => {
      o = !0;
    };
  }, [t, a]), s;
}
function cO({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: s, loading: i, error: o, refetch: u, tick: f } = lO(t), p = oO(t, f), [y, m] = g.useState(null), b = k4(), v = g.useCallback(() => {
    m(null), u();
  }, [u]), w = s;
  return !i && !o && w.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: $4, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: U4, children: [
      /* @__PURE__ */ c.jsx("span", { className: B4, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: V4, children: [
        /* @__PURE__ */ c.jsx("span", { className: I4, children: w.length }),
        /* @__PURE__ */ c.jsxs("span", { className: H4, children: [
          "last ",
          Ch
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: q4,
            onClick: v,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        )
      ] })
    ] }),
    o && /* @__PURE__ */ c.jsx("div", { className: sO, role: "alert", children: o }),
    /* @__PURE__ */ c.jsx(bm, { features: jm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: F4, children: /* @__PURE__ */ c.jsx(FS, { initial: !1, children: w.map((S) => {
      const j = y === S.utteranceId, N = WS(
        t,
        `/${S.utteranceId}/download`
      ), R = S.voiceAssetId ? p.get(S.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        wm.li,
        {
          className: Y4,
          initial: b ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: b ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: b ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": j || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: G4, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: P4,
                  onClick: () => m(
                    (C) => C === S.utteranceId ? null : S.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": j,
                  children: j ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: K4, children: [
                /* @__PURE__ */ c.jsxs("div", { className: X4, children: [
                  /* @__PURE__ */ c.jsx("span", { className: Q4, children: S.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: Z4, title: S.text, children: S.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: J4, children: [
                  /* @__PURE__ */ c.jsx("span", { className: W4, children: dO(S.finishedAt) }),
                  R && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Hf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: eO, children: R })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: Hf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: tO, children: uO(S.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > iO && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Hf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: nO, children: [
                      a.toFixed(2),
                      "×"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ c.jsx(
                "a",
                {
                  className: aO,
                  href: N,
                  download: S.filename,
                  "aria-label": `Download ${S.filename}`,
                  title: "Download",
                  children: "↓"
                }
              )
            ] }),
            j && /* @__PURE__ */ c.jsx(
              "audio",
              {
                className: rO,
                src: N,
                controls: !0,
                autoPlay: !0,
                preload: "auto",
                children: /* @__PURE__ */ c.jsx("track", { kind: "captions" })
              }
            )
          ]
        },
        S.utteranceId
      );
    }) }) }) })
  ] });
}
function uO(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return s > 0 ? `${s}:${i.toString().padStart(2, "0")}` : `${i}s`;
}
function dO(t) {
  if (!t) return "—";
  const s = Math.floor(Date.now() / 1e3) - t;
  return s < 0 ? "just now" : s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : s < 86400 ? `${Math.floor(s / 3600)}h ago` : s < 604800 ? `${Math.floor(s / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
function fO(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function ew() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const s = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(s.overflowY) || /(auto|scroll|overlay)/.test(s.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function hO() {
  if (typeof window > "u") return;
  const t = ew();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function tw(t) {
  const [a, s] = g.useState(!1);
  return g.useEffect(() => {
    if (typeof window > "u") return;
    const i = ew(), o = () => {
      const f = i.reduce((p, y) => {
        const m = fO(y);
        return m > p ? m : p;
      }, 0);
      s(f > t);
    };
    o();
    const u = { passive: !0 };
    for (const f of i)
      f.addEventListener("scroll", o, u);
    return () => {
      for (const f of i)
        f.removeEventListener("scroll", o, u);
    };
  }, [t]), a;
}
const nw = 360;
var mO = "_1s59p180", pO = "_1s59p181", gO = "_1s59p182", vO = "_1s59p183", yO = "_1s59p184", bO = "_1s59p185", xO = "_1s59p186", SO = "_1s59p188", wO = "_1s59p189", Ob = "_1s59p18a", jO = "_1s59p18c", EO = "_1s59p18d", NO = "_1s59p18e", CO = "_1s59p18f", TO = "_1s59p18g", RO = "_1s59p18i";
const _O = 4e3;
function MO(t) {
  const a = ti(), [s, i] = g.useState("idle"), [o, u] = g.useState(null), [f, p] = g.useState(/* @__PURE__ */ new Map()), [y, m] = g.useState(null), [b, v] = g.useState(null), [w, S] = g.useState(null), j = g.useRef(null);
  g.useEffect(() => () => {
    j.current?.();
  }, []), g.useEffect(() => {
    let H = !1;
    const Z = async () => {
      try {
        const B = await vl();
        H || S(B);
      } catch {
      }
    };
    Z();
    const G = window.setInterval(Z, _O);
    return () => {
      H = !0, window.clearInterval(G);
    };
  }, []), g.useEffect(() => {
    O4({ busy: s === "starting" || s === "running" });
  }, [s]);
  const N = g.useCallback(
    (H) => {
      const Z = H.status;
      (Z === "completed" || Z === "partial") && hn.success(
        Z === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
        {
          action: {
            label: "Artifacts",
            onClick: () => {
              a(`/${t.deploymentId}?tab=artifacts`);
            }
          }
        }
      );
    },
    [a, t.deploymentId]
  ), R = g.useCallback(async () => {
    i("starting"), m(null), p(/* @__PURE__ */ new Map()), v(null);
    try {
      const H = await cT(t.deploymentId, t.createPayload);
      u(H.runId), i("running"), j.current?.(), j.current = Py(
        t.deploymentId,
        H.runId,
        (Z) => Lb(
          Z,
          p,
          i,
          (G) => {
            v(G), N(G);
          },
          t.deploymentId,
          H.runId
        ),
        () => i("error")
      );
    } catch (H) {
      i("error"), m(qf(H));
    }
  }, [t.deploymentId, t.createPayload, N]);
  g.useEffect(() => L4(() => {
    (s === "idle" || s === "terminal" || s === "error") && R();
  }), [s, R]);
  const C = g.useCallback(async () => {
    if (o)
      try {
        await uT(t.deploymentId, o);
      } catch (H) {
        m(qf(H));
      }
  }, [t.deploymentId, o]), O = Array.from(f.values()).sort((H, Z) => H.globalIndex - Z.globalIndex), M = s === "starting" || s === "running", T = b?.status === "partial", q = O.filter((H) => H.status === "running").length, Q = O.filter((H) => H.status === "completed").length, re = s === "starting" || s === "running" || O.length > 0, _ = O.filter((H) => H.status === "failed"), V = (() => {
    if (s !== "terminal" || _.length === 0) return null;
    const H = /* @__PURE__ */ new Map();
    for (const J of _) {
      const ce = J.failureCategory ?? "unknown";
      H.set(ce, (H.get(ce) ?? 0) + 1);
    }
    let Z = "unknown", G = 0;
    for (const [J, ce] of H)
      ce > G && (Z = J, G = ce);
    const B = O.length;
    return { category: Z, count: G, total: B };
  })(), k = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, F = "Check the run detail page for the per-segment error log.", W = y?.toLowerCase().includes("unmapped") ?? !1, ae = t.diagnostics ?? [], K = w?.badge ?? "not_installed", le = K === "ready" || K === "running", A = s === "starting" ? "Starting…" : s === "running" ? "Generating…" : le ? "Generate" : "Start runtime to generate", Y = !t.canGenerate || M || !le, $ = s === "starting" || s === "running", se = $ ? "running" : Y ? "blocked" : "idle", D = !tw(nw) || $;
  return /* @__PURE__ */ c.jsxs("div", { className: mO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: pO, children: [
      /* @__PURE__ */ c.jsxs("div", { className: vO, children: [
        /* @__PURE__ */ c.jsxs("span", { className: yO, children: [
          /* @__PURE__ */ c.jsx("span", { className: gO, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          re && /* @__PURE__ */ c.jsxs("span", { className: TO, children: [
            /* @__PURE__ */ c.jsx("span", { className: RO, "aria-hidden": "true" }),
            q > 0 ? `${q} in flight` : `${Q} done`
          ] })
        ] }),
        ae.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: bO, "aria-label": "Pre-flight checks", children: ae.map((H) => /* @__PURE__ */ c.jsxs("li", { className: xO, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: SO,
              "data-status": H.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: wO, children: H.label }),
          H.detail && /* @__PURE__ */ c.jsx("span", { className: Ob, children: H.detail })
        ] }, H.label)) }) : /* @__PURE__ */ c.jsx("span", { className: Ob, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: jO, "data-state": se, children: [
        D ? /* @__PURE__ */ c.jsxs(
          Ge,
          {
            variant: "primary",
            size: "sm",
            onClick: R,
            disabled: Y,
            loading: $,
            children: [
              !$ && /* @__PURE__ */ c.jsx("span", { className: EO, "aria-hidden": "true", children: "▶" }),
              A
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: NO, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: CO, children: "↑" })
        ] }),
        M && /* @__PURE__ */ c.jsx(
          Ge,
          {
            variant: "ghost",
            size: "xs",
            onClick: C,
            "aria-label": "Cancel current run",
            children: "Cancel"
          }
        )
      ] })
    ] }),
    y && /* @__PURE__ */ c.jsxs(
      Dn,
      {
        severity: "error",
        style: {
          marginBottom: 12,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8
        },
        children: [
          /* @__PURE__ */ c.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ c.jsx("span", { children: y }),
          W && /* @__PURE__ */ c.jsx(
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
    V && /* @__PURE__ */ c.jsxs(Dn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "Run failed — ",
        V.count,
        " of ",
        V.total,
        " segments failed with ",
        /* @__PURE__ */ c.jsx("code", { children: V.category })
      ] }),
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: k[V.category] ?? F })
    ] }),
    b?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${v1.secondary} ${y1.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    T && b && /* @__PURE__ */ c.jsxs(Dn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        Ge,
        {
          variant: "secondary",
          disabled: !1,
          onClick: async () => {
            try {
              const H = await m1(t.deploymentId, b.runId);
              u(H.runId), p(/* @__PURE__ */ new Map()), v(null), i("running"), j.current?.(), j.current = Py(
                t.deploymentId,
                H.runId,
                (Z) => Lb(Z, p, i, v, t.deploymentId, H.runId),
                () => i("error")
              );
            } catch (H) {
              m(qf(H)), i("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    O.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: ZR, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: O.map((H) => /* @__PURE__ */ c.jsxs("tr", { className: JR, children: [
        /* @__PURE__ */ c.jsx("td", { className: mr, children: H.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: /* @__PURE__ */ c.jsx(Jr, { tone: AO(H.status), children: H.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: H.durationMs ? `${H.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: H.failureCategory ?? "" })
      ] }, H.globalIndex)) })
    ] })
  ] });
}
async function Lb(t, a, s, i, o, u) {
  switch (t.type) {
    case "segment_started":
      a((f) => {
        const p = new Map(f);
        return p.set(t.globalIndex, { globalIndex: t.globalIndex, status: "running" }), p;
      });
      return;
    case "segment_completed":
      a((f) => {
        const p = new Map(f);
        return p.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "completed",
          durationMs: t.durationMs
        }), p;
      });
      return;
    case "segment_failed":
      a((f) => {
        const p = new Map(f);
        return p.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "failed",
          failureCategory: t.failureCategory
        }), p;
      });
      return;
    case "run_terminal":
      s("terminal");
      try {
        const f = await Kh(o, u);
        i(f);
      } catch {
      }
      return;
  }
}
function AO(t) {
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
function qf(t) {
  return t instanceof ni || t instanceof Error ? t.message : "unknown error";
}
const DO = {
  queued: { label: "Queued", color: "var(--outline, #747578)", glow: "rgba(116,117,120,0)", pulse: !1 },
  rendering: { label: "Rendering", color: "var(--primary, #ba9eff)", glow: "rgba(186,158,255,0.6)", pulse: !0 },
  ready: { label: "Ready", color: "var(--acid-green, #22c55e)", glow: "rgba(34,197,94,0.6)", pulse: !1 },
  failed: { label: "Failed", color: "var(--error, #ff6e84)", glow: "rgba(255,110,132,0.5)", pulse: !1 }
}, $b = [
  { color: "#ba9eff", rgb: "186,158,255", onColor: "#2b006e" },
  { color: "#9093ff", rgb: "144,147,255", onColor: "#080079" },
  { color: "#ff8439", rgb: "255,132,57", onColor: "#471a00" },
  { color: "#21c7d9", rgb: "33,199,217", onColor: "#00363c" },
  { color: "#34d399", rgb: "52,211,153", onColor: "#003824" },
  { color: "#e879f9", rgb: "232,121,249", onColor: "#3b0a45" }
], Ub = [
  "record_voice_over",
  "graphic_eq",
  "mic_external_on",
  "interpreter_mode",
  "voice_chat",
  "spatial_audio"
];
function kO(t) {
  return t === 0 ? "Lead" : t === 1 ? "Support" : "Voice";
}
function zO(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function OO(t) {
  const a = t.filter((s) => s.isActive && (s.kind === "speaker" || s.kind === "mixed"));
  return a.length === 0 ? [] : a.map((s, i) => {
    const o = $b[i % $b.length], u = Ub[i % Ub.length];
    return {
      id: s.voiceAssetId,
      name: s.displayName || `Voice ${i + 1}`,
      role: kO(i),
      icon: u,
      color: o.color,
      rgb: o.rgb,
      onColor: o.onColor,
      initial: zO(s.displayName || "V"),
      lib: s.displayName || s.voiceAssetId
    };
  });
}
function aw(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
function LO(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    const o = aw(i.presetName);
    a.has(o) || (a.add(o), s.push({ id: o, label: i.presetName }));
  }
  return s;
}
function $O(t, a) {
  const s = t.find((o) => aw(o.presetName) === a);
  if (!s) return null;
  const i = s.vector;
  return Array.isArray(i) && i.length === 8 ? i : null;
}
function UO(t) {
  const a = t.split(/\n\s*\n/), s = [];
  let i = 0;
  for (const o of a) {
    if (!o.trim()) continue;
    const u = o.match(/\S+\s*/g) ?? [o];
    let f = !1;
    const p = u.map((y, m) => {
      const b = f || /[“”"]/.test(y) ? "dialogue" : "narration";
      for (const v of y)
        v === "“" ? f = !0 : v === "”" ? f = !1 : v === '"' && (f = !f);
      return { id: `p${i}s${m}`, text: y, kind: b };
    });
    s.push({ id: `p${i}`, segs: p }), i += 1;
  }
  return s;
}
function Th(t) {
  const a = [];
  for (const s of t) for (const i of s.segs) a.push(i);
  return a;
}
function Rh(t, a) {
  let s = 0;
  for (const i of t)
    for (const o of i.segs) {
      if (o.id === a) return s;
      s += 1;
    }
  return Number.MAX_SAFE_INTEGER;
}
function BO(t, a, s) {
  const i = [];
  let o = 0;
  for (const u of t)
    for (const f of u.segs)
      o >= a && o <= s && i.push(f.id), o += 1;
  return i;
}
function VO(t, a) {
  for (const s of t) for (const i of s.segs) if (i.id === a) return i.text;
  return "";
}
function rl(t, a) {
  return [...a].sort((s, i) => Rh(t, s) - Rh(t, i)).map((s) => VO(t, s)).join("").trim();
}
function Bb(t, a) {
  return Math.min(...a.segIds.map((s) => Rh(t, s)));
}
function rw(t, a) {
  return t.find((s) => s.segIds.includes(a));
}
function Vb(t, a) {
  return a.every((s) => !rw(t, s));
}
function sw(t, a) {
  return [...a].sort((s, i) => Bb(t, s) - Bb(t, i));
}
function IO(t, a) {
  const s = {};
  return sw(t, a).forEach((i, o) => {
    s[i.id] = `SEG-${String(o + 1).padStart(3, "0")}`;
  }), s;
}
function HO(t) {
  return Th(t).reduce(
    (a, s) => a + s.text.trim().split(/\s+/).filter(Boolean).length,
    0
  );
}
function qO(t) {
  const a = { queued: 0, rendering: 0, ready: 0, failed: 0 };
  for (const i of t) a[i.status] += 1;
  const s = [];
  return a.queued && s.push(`${a.queued} queued`), a.rendering && s.push(`${a.rendering} rendering`), a.ready && s.push(`${a.ready} ready`), a.failed && s.push(`${a.failed} failed`), s.join("  ·  ");
}
const dl = {
  id: "",
  name: "Unassigned",
  role: "",
  icon: "graphic_eq",
  color: "var(--on-surface-variant, #c4c7c5)",
  rgb: "120,124,128",
  onColor: "#15171a",
  initial: "—",
  lib: ""
};
function sc(t, a) {
  return t.find((s) => s.id === a) ?? t[0] ?? dl;
}
function Ib(t, a) {
  return t.find((s) => s.id === a)?.label ?? a;
}
var FO = "_171z55w1", YO = "_171z55w2", GO = "_171z55w3", Ff = "_171z55w4", PO = "_171z55w5", KO = "_171z55w6", XO = "_171z55w7", QO = "_171z55w8", ZO = "_171z55w9", JO = "_171z55wa", WO = "_171z55wb", eL = "_171z55wc", tL = "_171z55wd", nL = "_171z55we", aL = "_171z55wh", rL = "_171z55wi", Hb = "_171z55wj", qb = "_171z55wk _171z55wj", sL = "_171z55wl", iL = "_171z55wm", lL = "_171z55wn", oL = "_171z55wo", Fb = "_171z55wp", Yb = "_171z55wq", cL = "_171z55wr", uL = "_171z55ws", dL = "_171z55wt", fL = "_171z55wu", hL = "_171z55wv", mL = "_171z55ww", pL = "_171z55wx", gL = "_171z55wy", vL = "_171z55wz", yL = "_171z55w10", bL = "_171z55w11", xL = "_171z55w12", SL = "_171z55w13", wL = "_171z55w14", Gb = "_171z55w15", jL = "_171z55w16", EL = "_171z55w17", NL = "_171z55w18", CL = "_171z55w19", TL = "_171z55w1a", RL = "_171z55w1b", _L = "_171z55w1c", ML = "_171z55w1d", AL = "_171z55w1e", DL = "_171z55w1f", kL = "_171z55w1g", zL = "_171z55w1h", OL = "_171z55w1i", LL = "_171z55w1j", $L = "_171z55w1k", UL = "_171z55w1l", BL = "_171z55w1m", VL = "_171z55w1n", IL = "_171z55w1o", HL = "_171z55w1p", qL = "_171z55w1q", FL = "_171z55w1r";
function YL({
  voiceAssets: t,
  presets: a,
  storyText: s,
  onStoryTextChange: i,
  mappings: o,
  onQueueChange: u
}) {
  const f = g.useMemo(() => OO(t), [t]), p = g.useMemo(() => LO(a), [a]), y = s, m = g.useMemo(() => UO(y), [y]), b = f[0]?.id ?? "", v = p[0]?.id ?? "", [w, S] = g.useState("voice"), [j, N] = g.useState(""), R = g.useMemo(
    () => JL(o, f),
    [o, f]
  ), [C, O] = g.useState([]), [M, T] = g.useState([]), [q, Q] = g.useState(null), [re, _] = g.useState(null), [V, k] = g.useState(b), [F, W] = g.useState(v), [ae, K] = g.useState(null), [le, A] = g.useState(null), [Y, $] = g.useState(null), [se, de] = g.useState(null), [D, H] = g.useState(!1), Z = g.useRef(null), G = g.useRef(null), B = g.useRef(/* @__PURE__ */ new Map()), J = g.useRef(null), ce = g.useRef(1e3), ye = g.useCallback(() => (ce.current += 1, `job-${ce.current}`), []), Re = g.useMemo(() => {
    const U = /* @__PURE__ */ new Map();
    return Th(m).forEach((pe, ve) => U.set(pe.id, ve)), U;
  }, [m]), Pe = g.useCallback((U) => Re.get(U) ?? Number.MAX_SAFE_INTEGER, [Re]);
  g.useEffect(() => {
    const U = new Set(Th(m).map((pe) => pe.id));
    O((pe) => {
      const ve = pe.filter((be) => be.segIds.every((Ve) => U.has(Ve)));
      return ve.length === pe.length ? pe : ve;
    });
  }, [m]);
  const Ne = g.useMemo(() => new Set(f.map((U) => U.id)), [f]), at = g.useCallback(
    (U) => !Ne.has(U.voiceId),
    [Ne]
  ), Ie = g.useCallback((U) => {
    const pe = Z.current;
    if (!pe || !U) return { top: 60, left: 0 };
    const ve = U.getBoundingClientRect(), be = pe.getBoundingClientRect();
    let Ve = ve.left - be.left + pe.scrollLeft;
    const We = ve.bottom - be.top + pe.scrollTop + 10, it = Math.max(0, pe.clientWidth - 318);
    return Ve = Math.max(0, Math.min(Ve, it)), { top: We, left: Ve };
  }, []), qe = g.useCallback(() => {
    T([]), Q(null), _(null), K(null);
  }, []), Gt = g.useCallback(
    (U, pe) => {
      const ve = [...U.segIds].sort((Ve, We) => Pe(Ve) - Pe(We))[0];
      if (!ve) return;
      const be = pe ?? B.current.get(ve) ?? null;
      _(U.id), T([...U.segIds]), Q(ve), k(U.voiceId), W(U.emotion), K(Ie(be)), $(U.id);
    },
    [Pe, Ie]
  ), _t = g.useCallback(
    (U, pe, ve) => {
      const be = rw(C, U);
      if (be) {
        Gt(be, pe);
        return;
      }
      const Ve = Ie(pe);
      if (ve && q != null && re == null) {
        const We = Pe(q), it = Pe(U), Fe = BO(m, Math.min(We, it), Math.max(We, it));
        if (Vb(C, Fe)) {
          T(Fe), _(null), K(Ve);
          return;
        }
      }
      T([U]), Q(U), _(null), K(Ve);
    },
    [C, m, q, re, Ie, Gt, Pe]
  ), Mt = g.useCallback(() => {
    if (re) {
      O(
        (ve) => ve.map(
          (be) => be.id === re ? { ...be, voiceId: V, emotion: F, status: "queued" } : be
        )
      ), $(re), T([]), Q(null), _(null), K(null);
      return;
    }
    if (M.length === 0 || rl(m, M).trim() === "" || !Vb(C, M)) return;
    const U = ye(), pe = { id: U, segIds: [...M], voiceId: V, emotion: F, status: "queued" };
    O((ve) => [...ve, pe]), $(U), T([]), Q(null), K(null);
  }, [re, M, C, m, V, F, ye]), mn = g.useCallback((U) => {
    O((pe) => pe.filter((ve) => ve.id !== U)), $((pe) => pe === U ? null : pe), de((pe) => pe === U ? null : pe), T([]), Q(null), _(null), K(null);
  }, []), gt = g.useCallback((U) => {
    de((pe) => pe === U ? null : U);
  }, []), Pt = g.useCallback((U) => {
    G.current?.scrollBy({ left: U * 280, behavior: "smooth" });
  }, []), jn = g.useCallback(
    (U) => {
      if (p.length === 0) return;
      const pe = p.findIndex((be) => be.id === F), ve = p[(pe + U + p.length) % p.length];
      W(ve.id), J.current?.querySelector(`[data-emotion="${ve.id}"]`)?.focus();
    },
    [p, F]
  ), ot = ae ? re ?? M[0] ?? "new" : null;
  g.useEffect(() => {
    if (ot == null) return;
    const U = requestAnimationFrame(() => {
      J.current?.querySelector(`[data-voice="${V}"]`)?.focus();
    });
    return () => cancelAnimationFrame(U);
  }, [ot]);
  const sn = g.useCallback(
    (U) => {
      U.key === "Escape" && (U.preventDefault(), qe());
    },
    [qe]
  ), bt = g.useMemo(() => {
    const U = /* @__PURE__ */ new Map();
    for (const pe of C) for (const ve of pe.segIds) U.set(ve, pe);
    return U;
  }, [C]), we = g.useMemo(() => sw(m, C), [m, C]), Le = g.useMemo(
    () => we.filter((U) => f.some((pe) => pe.id === U.voiceId)).filter((U) => rl(m, U.segIds).trim() !== "").map((U) => {
      const pe = $O(a, U.emotion);
      return {
        text: rl(m, U.segIds),
        voice_asset_id: U.voiceId,
        speaker_label: (sc(f, U.voiceId) ?? dl).name,
        emotion: pe ? { mode: "emotion_vector", vector: pe } : null
      };
    }),
    [we, m, f, a]
  ), Xe = g.useRef(null);
  g.useEffect(() => {
    const U = JSON.stringify(Le);
    U !== Xe.current && (Xe.current = U, u?.(Le));
  }, [Le, u]);
  const ct = g.useMemo(() => {
    const U = /* @__PURE__ */ new Map();
    for (const pe of C) {
      const ve = [...pe.segIds].sort((be, Ve) => Pe(be) - Pe(Ve))[0];
      ve && U.set(pe.id, ve);
    }
    return U;
  }, [C, Pe]), At = g.useMemo(() => IO(m, C), [m, C]), Ut = g.useMemo(() => {
    const U = /* @__PURE__ */ new Set();
    for (const pe of C) for (const ve of pe.segIds) U.add(ve);
    return U.size;
  }, [C]), sa = g.useMemo(() => HO(m), [m]), Sn = qO(C), pn = sc(f, V) ?? dl, [Ot, Tt] = g.useState(null), pt = j.trim().toLowerCase(), En = g.useMemo(
    () => f.filter(
      (U) => !pt || U.name.toLowerCase().includes(pt) || U.role.toLowerCase().includes(pt)
    ),
    [f, pt]
  ), fe = g.useMemo(
    () => R.filter(
      (U) => !pt || U.name.toLowerCase().includes(pt) || (U.voice?.name.toLowerCase().includes(pt) ?? !1)
    ),
    [R, pt]
  ), _e = w === "character" ? `${fe.length} character${fe.length === 1 ? "" : "s"}` : `${En.length} voice${En.length === 1 ? "" : "s"}`, Ce = (U) => U.stopPropagation();
  return /* @__PURE__ */ c.jsxs("div", { className: GO, children: [
    /* @__PURE__ */ c.jsxs("div", { style: GL, children: [
      /* @__PURE__ */ c.jsxs("span", { className: PO, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: Ut }),
          " cast"
        ] }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: sa }),
          " words"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: XO,
          "aria-pressed": D,
          onClick: () => H((U) => !U),
          children: [
            /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: D ? "check" : "edit" }),
            D ? "Done" : "Edit text"
          ]
        }
      )
    ] }),
    D ? /* @__PURE__ */ c.jsx(
      "textarea",
      {
        value: s,
        onChange: (U) => i(U.target.value),
        placeholder: "Paste or write your script, then switch back to cast each phrase.",
        "aria-label": "Storyboard script text",
        style: XL
      }
    ) : /* @__PURE__ */ c.jsxs(
      "div",
      {
        ref: Z,
        className: KO,
        role: "group",
        "aria-label": "Story script — select a phrase to cast a voice",
        onMouseDown: (U) => {
          U.shiftKey && U.preventDefault();
        },
        onClick: () => {
          ae && qe();
        },
        children: [
          m.map((U) => /* @__PURE__ */ c.jsx("p", { className: QO, children: U.segs.map((pe) => {
            const ve = bt.get(pe.id), be = M.includes(pe.id), Ve = !!ve && (le === ve.id || Y === ve.id), We = !!ve && ct.get(ve.id) === pe.id, it = ve ? sc(f, ve.voiceId) : null;
            return /* @__PURE__ */ c.jsxs("span", { children: [
              We && it && /* @__PURE__ */ c.jsx("span", { className: JO, style: ZL(it), "aria-hidden": "true", children: it.initial }),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  ref: (Fe) => {
                    Fe && B.current.set(pe.id, Fe);
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": be || !!ve,
                  "aria-label": ve ? `${it?.name ?? "voice"} · ${pe.text.trim()}` : pe.text.trim(),
                  className: ZO,
                  style: QL(be, it, Ve, pe.kind),
                  onClick: (Fe) => {
                    Fe.stopPropagation(), _t(pe.id, Fe.currentTarget, Fe.shiftKey);
                  },
                  onKeyDown: (Fe) => {
                    (Fe.key === "Enter" || Fe.key === " ") && (Fe.preventDefault(), _t(pe.id, Fe.currentTarget, Fe.shiftKey));
                  },
                  onMouseEnter: ve ? () => A(ve.id) : void 0,
                  onMouseLeave: ve ? () => A(null) : void 0,
                  children: pe.text
                }
              )
            ] }, pe.id);
          }) }, U.id)),
          ae && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: J,
              className: WO,
              role: "dialog",
              "aria-label": re ? "Edit casting" : "Cast voice",
              style: { top: ae.top, left: ae.left },
              onClick: Ce,
              onMouseDown: Ce,
              onKeyDown: sn,
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: eL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: tL, children: re ? "Edit casting" : "Cast voice" }),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: nL,
                      style: { width: 24, height: 24 },
                      "aria-label": "Cancel",
                      onClick: qe,
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: aL, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: rL, role: "radiogroup", "aria-label": "Cast source", children: [
                    /* @__PURE__ */ c.jsx(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": w === "voice",
                        className: w === "voice" ? qb : Hb,
                        onClick: () => {
                          S("voice"), N("");
                        },
                        children: "Voices"
                      }
                    ),
                    /* @__PURE__ */ c.jsx(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": w === "character",
                        className: w === "character" ? qb : Hb,
                        onClick: () => {
                          S("character"), N("");
                        },
                        children: "Characters"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: sL, children: _e })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: iL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: WL, children: "search" }),
                  /* @__PURE__ */ c.jsx(
                    "input",
                    {
                      className: lL,
                      value: j,
                      onChange: (U) => N(U.target.value),
                      placeholder: w === "character" ? "Search characters…" : "Search voices…",
                      "aria-label": w === "character" ? "Search characters" : "Search voices"
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: oL, role: "radiogroup", "aria-label": w === "character" ? "Character" : "Voice", children: [
                  w === "voice" && En.map((U) => {
                    const pe = Ot == null && V === U.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": pe,
                        className: Fb,
                        style: Pb(U, pe),
                        onClick: () => {
                          k(U.id), Tt(null);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: Kb(U), children: U.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: Yb, children: [
                            /* @__PURE__ */ c.jsx("span", { style: Xb(pe), children: U.name }),
                            /* @__PURE__ */ c.jsx("span", { style: e6, children: U.role })
                          ] }),
                          pe && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: U.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      U.id
                    );
                  }),
                  w === "character" && fe.map((U) => {
                    const pe = U.voice ?? dl, ve = Ot === U.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": ve,
                        className: Fb,
                        style: Pb(pe, ve),
                        onClick: () => {
                          k(U.voiceId), Tt(U.id);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: Kb(pe), children: pe.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: Yb, children: [
                            /* @__PURE__ */ c.jsx("span", { style: Xb(ve), children: U.name }),
                            /* @__PURE__ */ c.jsx("span", { style: t6, children: pe.name })
                          ] }),
                          ve && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: pe.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      U.id
                    );
                  }),
                  (w === "voice" && En.length === 0 || w === "character" && fe.length === 0) && /* @__PURE__ */ c.jsx("div", { className: cL, children: w === "character" ? R.length === 0 ? "No characters mapped yet." : `No matches for “${j}”` : f.length === 0 ? "No voices yet — add voice assets." : `No matches for “${j}”` })
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: uL }),
                /* @__PURE__ */ c.jsxs("div", { className: dL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: Ff, style: { fontSize: 9.5, marginBottom: 0 }, children: "Emotion" }),
                  /* @__PURE__ */ c.jsx(
                    "div",
                    {
                      className: fL,
                      role: "radiogroup",
                      "aria-label": "Emotion",
                      onKeyDown: (U) => {
                        U.key === "ArrowRight" || U.key === "ArrowDown" ? (U.preventDefault(), jn(1)) : (U.key === "ArrowLeft" || U.key === "ArrowUp") && (U.preventDefault(), jn(-1));
                      },
                      children: p.map((U) => {
                        const pe = F === U.id;
                        return /* @__PURE__ */ c.jsx(
                          "button",
                          {
                            type: "button",
                            role: "radio",
                            "aria-checked": pe,
                            "data-emotion": U.id,
                            tabIndex: pe ? 0 : -1,
                            className: hL,
                            style: n6(pn, pe),
                            onClick: () => W(U.id),
                            children: U.label
                          },
                          U.id
                        );
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: mL, children: /* @__PURE__ */ c.jsx("span", { className: pL, children: rl(m, M) }) }),
                /* @__PURE__ */ c.jsxs("div", { className: gL, children: [
                  re && /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: vL,
                      "aria-label": "Remove casting",
                      onClick: () => re && mn(re),
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "delete" })
                    }
                  ),
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      style: a6(pn),
                      onClick: Mt,
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "check" }),
                        re ? "Update" : "Cast"
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: yL, children: [
      /* @__PURE__ */ c.jsxs("div", { className: bL, children: [
        /* @__PURE__ */ c.jsxs("div", { className: xL, children: [
          /* @__PURE__ */ c.jsx("span", { className: Ff, style: { marginBottom: 0 }, children: "Assigned segments" }),
          /* @__PURE__ */ c.jsx("span", { className: SL, children: C.length }),
          Sn && /* @__PURE__ */ c.jsx("span", { className: wL, children: Sn })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ c.jsxs("span", { "aria-live": "polite", style: PL, children: [
            /* @__PURE__ */ c.jsx("span", { style: KL }),
            "Live"
          ] }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: Gb, "aria-label": "Scroll segments left", onClick: () => Pt(-1), disabled: C.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_left" }) }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: Gb, "aria-label": "Scroll segments right", onClick: () => Pt(1), disabled: C.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_right" }) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { ref: G, className: jL, children: [
        we.map((U) => {
          const pe = sc(f, U.voiceId) ?? dl, ve = at(U), be = DO[U.status], Ve = Y === U.id || le === U.id, We = se === U.id, it = rl(m, U.segIds);
          return /* @__PURE__ */ c.jsxs(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `${pe.name} ${At[U.id]} — ${Ib(p, U.emotion)} — ${ve ? "voice removed — recast" : be.label}`,
              className: EL,
              "data-broken": ve ? "true" : "false",
              style: ve ? s6(Ve) : r6(pe, Ve),
              onClick: () => Gt(U),
              onKeyDown: (Fe) => {
                (Fe.key === "Enter" || Fe.key === " ") && (Fe.preventDefault(), Gt(U));
              },
              onMouseEnter: () => A(U.id),
              onMouseLeave: () => A(null),
              onFocus: () => $(U.id),
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: NL, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: CL, children: [
                    /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 17, color: pe.color }, children: pe.icon }),
                    /* @__PURE__ */ c.jsx("span", { className: TL, children: pe.name })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: RL, children: At[U.id] })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: _L, children: it }),
                /* @__PURE__ */ c.jsxs("div", { className: ML, children: [
                  /* @__PURE__ */ c.jsx("span", { style: l6(pe), children: Ib(p, U.emotion) }),
                  /* @__PURE__ */ c.jsxs("span", { className: AL, children: [
                    /* @__PURE__ */ c.jsx("span", { style: o6(be) }),
                    /* @__PURE__ */ c.jsx("span", { style: c6(be, U.status), children: be.label })
                  ] })
                ] }),
                ve && /* @__PURE__ */ c.jsxs("span", { style: i6, role: "status", children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 14 }, "aria-hidden": "true", children: "error" }),
                  "voice removed — recast"
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: DL, children: [
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      className: kL,
                      "aria-label": We ? "Pause preview" : "Preview audio",
                      onClick: (Fe) => {
                        Fe.stopPropagation(), gt(U.id);
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: We ? "pause_circle" : "play_circle" }),
                        We ? "Playing" : "Preview"
                      ]
                    }
                  ),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: zL,
                      "aria-label": `Remove ${At[U.id]}`,
                      onClick: (Fe) => {
                        Fe.stopPropagation(), mn(U.id);
                      },
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                We && /* @__PURE__ */ c.jsx("div", { className: OL, children: /* @__PURE__ */ c.jsx("div", { style: u6(pe) }) })
              ]
            },
            U.id
          );
        }),
        C.length === 0 && /* @__PURE__ */ c.jsxs("div", { className: LL, children: [
          /* @__PURE__ */ c.jsx("span", { className: $L, children: "0" }),
          /* @__PURE__ */ c.jsx("span", { className: UL, children: "No segments cast yet. Select a phrase above to begin." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: BL, children: [
      /* @__PURE__ */ c.jsxs("div", { className: VL, children: [
        /* @__PURE__ */ c.jsx("span", { className: Ff, style: { fontSize: 9.5, marginBottom: 0 }, children: "Voices" }),
        /* @__PURE__ */ c.jsx("div", { className: IL, children: f.map((U) => {
          const pe = C.some((ve) => ve.voiceId === U.id);
          return /* @__PURE__ */ c.jsxs("span", { className: HL, style: { border: `1px solid ${pe ? `rgba(${U.rgb},0.35)` : "rgba(70,72,74,0.3)"}` }, children: [
            /* @__PURE__ */ c.jsx("span", { style: { width: 8, height: 8, borderRadius: "50%", background: U.color, boxShadow: pe ? `0 0 8px rgba(${U.rgb},0.7)` : "none", flexShrink: 0 } }),
            /* @__PURE__ */ c.jsx("span", { className: qL, style: { color: pe ? "var(--on-surface)" : "var(--on-surface-variant)" }, children: U.lib })
          ] }, U.id);
        }) })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: FL, children: [
        "Cast every phrase, then ",
        /* @__PURE__ */ c.jsx("strong", { children: "Generate" }),
        " from the top bar."
      ] })
    ] })
  ] });
}
const GL = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, PL = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 24,
  padding: "0 10px",
  borderRadius: 999,
  fontFamily: "var(--font-ui)",
  fontSize: 11,
  fontWeight: 500,
  color: "#b8f0c8",
  background: "var(--surface-highest, #232629)"
}, KL = { width: 6, height: 6, borderRadius: 999, background: "var(--acid-green, #22c55e)", boxShadow: "0 0 8px rgba(34,197,94,0.7)" }, XL = {
  width: "100%",
  minHeight: 220,
  padding: 14,
  background: "var(--surface-floor, #000)",
  border: "1px solid rgba(70,72,74,0.3)",
  borderRadius: 12,
  color: "var(--on-surface)",
  fontFamily: "var(--font-mono)",
  fontSize: 14,
  lineHeight: 1.7,
  resize: "vertical",
  outline: "none"
};
function QL(t, a, s, i) {
  const o = { borderRadius: 4, padding: "1.5px 1px", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }, u = "186,158,255";
  if (t) return { ...o, background: `rgba(${u},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${u},0.55)`, color: "var(--on-surface)" };
  if (a) {
    const f = s ? `, inset 0 0 0 1px rgba(${a.rgb},0.8)` : "";
    return { ...o, background: `rgba(${a.rgb},${s ? 0.22 : 0.12})`, boxShadow: `inset 0 -2px 0 ${a.color}${f}`, color: "var(--on-surface)" };
  }
  return { ...o, color: i === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}
function ZL(t) {
  return { color: t.color, background: `rgba(${t.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.45)` };
}
function JL(t, a) {
  return t ? [...t.values()].filter((s) => s.isActive).map((s) => ({
    id: s.mappingId,
    name: s.characterName,
    voiceId: s.speakerVoiceAssetId,
    voice: a.find((i) => i.id === s.speakerVoiceAssetId) ?? null
  })) : [];
}
function Pb(t, a) {
  return a ? {
    border: `1px solid rgba(${t.rgb},0.5)`,
    background: `rgba(${t.rgb},0.12)`
  } : {};
}
function Kb(t) {
  return {
    width: 28,
    height: 28,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    fontWeight: 700,
    color: t.color,
    background: `rgba(${t.rgb},0.16)`,
    boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.4)`
  };
}
function Xb(t) {
  return {
    fontSize: 12,
    fontWeight: 600,
    color: t ? "var(--on-surface, #e3e3e3)" : "var(--on-surface-variant, #c4c7c5)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };
}
const WL = { position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--on-surface-muted)", pointerEvents: "none" }, e6 = { fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" }, t6 = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.02em", color: "var(--on-surface-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
function n6(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.45)` : "rgba(120,124,128,0.35)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))",
    color: a ? t.color : "var(--on-surface-variant, #c4c7c5)"
  };
}
function a6(t) {
  return {
    flex: 1,
    height: 38,
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-ui)",
    fontSize: 13,
    fontWeight: 600,
    color: t.onColor,
    background: t.color,
    boxShadow: `0 0 18px rgba(${t.rgb},0.45)`,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    transition: "filter .15s"
  };
}
function r6(t, a) {
  return {
    background: a ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: a ? "translateY(-2px)" : "none",
    boxShadow: a ? `inset 3px 0 0 ${t.color}, 0 0 0 1px rgba(${t.rgb},0.4), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${t.color}`
  };
}
function s6(t) {
  const a = "var(--error, #ff6e84)";
  return {
    background: t ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: t ? "translateY(-2px)" : "none",
    boxShadow: t ? `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.45), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.32)`
  };
}
const i6 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  marginTop: 6,
  fontFamily: "var(--font-ui)",
  fontSize: 10.5,
  fontWeight: 500,
  color: "var(--error, #ff6e84)"
};
function l6(t) {
  return {
    fontFamily: "var(--font-mono)",
    fontSize: 9.5,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "3px 8px",
    borderRadius: 6,
    color: t.color,
    background: `rgba(${t.rgb},0.12)`,
    border: `1px solid rgba(${t.rgb},0.22)`
  };
}
function o6(t) {
  return {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: t.color,
    boxShadow: `0 0 8px ${t.glow}`,
    animation: t.pulse ? `${YO} 1.5s ease-in-out infinite` : "none",
    flexShrink: 0
  };
}
function c6(t, a) {
  return { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, color: a === "queued" ? "var(--on-surface-variant)" : t.color };
}
function u6(t) {
  return { position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, animation: `${FO} 1.1s linear infinite` };
}
var d6 = "xq3iim0", f6 = "xq3iim1", h6 = "xq3iim2", m6 = "xq3iim3", p6 = "xq3iim4", g6 = "xq3iim5", v6 = "xq3iim6", y6 = "xq3iim7", b6 = "xq3iim8", x6 = "xq3iim9", S6 = "xq3iima", w6 = "xq3iimb", j6 = "xq3iimc", E6 = "xq3iimd", N6 = "xq3iime", C6 = "xq3iimf", T6 = "xq3iimg", R6 = "xq3iimh", _6 = "xq3iimi", M6 = "xq3iimj", A6 = "xq3iimk", Qb = "xq3iiml";
function D6({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: s
}) {
  const [i, o] = g.useState([]), [u, f] = g.useState(a), [p, y] = g.useState(!0), [m, b] = g.useState(!1), [v, w] = g.useState(null), [S, j] = g.useState(!1), N = g.useRef(null), R = g.useRef(null);
  g.useEffect(() => {
    let T = !1;
    return y(!0), Qs(t).then(({ voiceAssets: q }) => {
      T || o(q);
    }).catch((q) => {
      T || w(q instanceof Error ? q.message : "Failed to load voices");
    }).finally(() => {
      T || y(!1);
    }), () => {
      T = !0;
    };
  }, [t]), g.useEffect(() => {
    if (!S) return;
    const T = (Q) => {
      N.current && (Q.target instanceof Node && N.current.contains(Q.target) || j(!1));
    }, q = (Q) => {
      Q.key === "Escape" && (j(!1), R.current?.focus());
    };
    return document.addEventListener("mousedown", T), document.addEventListener("keydown", q), () => {
      document.removeEventListener("mousedown", T), document.removeEventListener("keydown", q);
    };
  }, [S]);
  const C = g.useCallback(
    async (T) => {
      b(!0), w(null);
      const q = u, Q = T === u ? null : T;
      f(Q), j(!1);
      try {
        await sT(t, Q), s?.(Q);
      } catch (re) {
        f(q), w(re instanceof Error ? re.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, s, u]
  ), O = g.useMemo(
    () => i.find((T) => T.voiceAssetId === u) ?? null,
    [i, u]
  ), M = g.useMemo(() => {
    const T = [], q = [];
    for (const Q of i)
      Q.kind === "speaker" || Q.kind === "mixed" ? T.push(Q) : q.push(Q);
    return { uploaded: T, other: q };
  }, [i]);
  return p ? /* @__PURE__ */ c.jsx("span", { className: Qb, children: "Loading voices…" }) : i.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: Qb, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: N, className: d6, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: R,
        type: "button",
        className: `${f6} ${S ? h6 : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": S,
        disabled: m,
        onClick: () => j((T) => !T),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: m6, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: p6, children: [
            /* @__PURE__ */ c.jsx("span", { className: g6, children: O ? O.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: v6, children: O ? iw(O) : `${i.length} voice${i.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: y6, "aria-hidden": "true", children: k6.map((T, q) => /* @__PURE__ */ c.jsx("i", { style: { height: `${T * 100}%` } }, q)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${b6}`, "aria-hidden": "true", children: S ? "expand_less" : "expand_more" })
        ]
      }
    ),
    S && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: x6,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: S6, children: /* @__PURE__ */ c.jsx("span", { className: w6, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: j6, role: "alert", children: v }),
          M.uploaded.length > 0 && /* @__PURE__ */ c.jsx(Zb, { label: "Uploaded", children: M.uploaded.map((T) => /* @__PURE__ */ c.jsx(
            Jb,
            {
              voice: T,
              selected: u === T.voiceAssetId,
              onSelect: () => void C(T.voiceAssetId)
            },
            T.voiceAssetId
          )) }),
          M.other.length > 0 && /* @__PURE__ */ c.jsx(Zb, { label: "Other", children: M.other.map((T) => /* @__PURE__ */ c.jsx(
            Jb,
            {
              voice: T,
              selected: u === T.voiceAssetId,
              onSelect: () => void C(T.voiceAssetId)
            },
            T.voiceAssetId
          )) })
        ]
      }
    )
  ] });
}
function Zb({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: E6, children: [
    /* @__PURE__ */ c.jsx("div", { className: N6, children: t }),
    a
  ] });
}
function Jb({ voice: t, selected: a, onSelect: s }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${C6} ${a ? T6 : ""}`,
      onClick: s,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: R6, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: _6, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: M6, children: iw(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${A6}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const k6 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function iw(t) {
  const a = [];
  return t.durationMs != null && a.push(z6(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function z6(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const s = Math.floor(a / 60), i = Math.round(a - s * 60);
  return `${s}:${i.toString().padStart(2, "0")}`;
}
const Wb = [
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
function O6(t) {
  const a = ti(), s = g.useRef(null), { tokens: i, attributions: o, unresolved: u, predictedFilenames: f, characterColor: p } = g.useMemo(
    () => $6(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), y = (b) => {
    const v = s.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, m = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: m ? GR : qR, children: [
      !m && /* @__PURE__ */ c.jsx("div", { ref: s, className: FR, "aria-hidden": "true", children: i.map((b, v) => L6(b, v, p)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: m ? PR : YR,
          value: t.value,
          onChange: (b) => t.onChange(b.currentTarget.value),
          onScroll: m ? void 0 : y,
          placeholder: m ? "Type or paste plain text. The selected voice will read every word." : `[Bob] Hey there
[Alice] Hello
...`,
          "aria-label": "Dialogue script",
          spellCheck: !1
        }
      )
    ] }),
    u.length > 0 && /* @__PURE__ */ c.jsxs(Dn, { severity: "error", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      u.map((b) => /* @__PURE__ */ c.jsxs(
        Ge,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => a(
            `/${t.deploymentId}/mappings/new?character=${encodeURIComponent(b)}`
          ),
          children: [
            "Create mapping for ",
            b
          ]
        },
        b
      ))
    ] }),
    o.length > 0 && /* @__PURE__ */ c.jsxs("div", { children: [
      /* @__PURE__ */ c.jsx("span", { className: Gs, children: "Parsed lines" }),
      /* @__PURE__ */ c.jsx("ul", { className: f0, children: o.map((b) => /* @__PURE__ */ c.jsxs("li", { children: [
        "#",
        b.lineNumber.toString().padStart(3, "0"),
        " [",
        b.character,
        "] ",
        b.text,
        !b.hasMapping && b.character !== "Narrator" && " — unresolved"
      ] }, b.lineNumber)) })
    ] }),
    f.length > 0 && /* @__PURE__ */ c.jsxs("div", { children: [
      /* @__PURE__ */ c.jsx("span", { className: Gs, children: "Predicted filenames" }),
      /* @__PURE__ */ c.jsx("ul", { className: f0, children: f.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function L6(t, a, s) {
  if (t.kind === "blank")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      /* @__PURE__ */ c.jsx("span", { className: d0, children: t.raw }),
      `
`
    ] }, a);
  const i = s.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? u0 : `${u0} ${KR}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: i }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: XR, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: d0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function $6(t, a, s) {
  const i = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), y = [], m = /* @__PURE__ */ new Map();
  let b = 0;
  const v = t.split(/\r?\n/);
  let w = 0;
  return v.forEach((S, j) => {
    const N = S.trim();
    if (!N) {
      o.push({ kind: "blank", raw: S });
      return;
    }
    const R = j + 1, C = N.match(i);
    let O = "Narrator", M = N, T, q = !1;
    if (C?.groups) {
      q = !0;
      const V = (C.groups.body ?? "").trim(), k = (C.groups.rest ?? "").trim();
      O = ((V.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", T = (V.includes("|") ? V.slice(V.indexOf("|") + 1) : "").trim() || void 0, M = k;
    }
    w += 1;
    const Q = O.toLowerCase(), re = (p.get(Q) ?? 0) + 1;
    p.set(Q, re);
    const _ = O === "Narrator" || s.has(Q);
    if (_ || f.add(O), O !== "Narrator" && !m.has(Q) && (m.set(Q, Wb[b % Wb.length] ?? "currentColor"), b += 1), q) {
      const V = { kind: "character", raw: S, character: O, text: M, hasMapping: _ };
      T !== void 0 && (V.override = T), o.push(V);
    } else
      o.push({ kind: "narrator", raw: S });
    u.push({ lineNumber: R, character: O, text: M, hasMapping: _ }), y.push(
      `${w.toString().padStart(3, "0")}_${U6(O)}_${re.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: y,
    characterColor: m
  };
}
function U6(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const ex = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], lw = 1e-3;
function B6(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function V6() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function I6(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function ow(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function cw(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function H6(t) {
  const a = [];
  for (let s = 0; s < ex.length; s += 1) {
    const i = t[s];
    typeof i == "number" && (Math.abs(i) < lw || a.push(`${ex[s]}=${cw(ow(i))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function q6(t, a) {
  const s = B6(t.character) || "Narrator", i = I6(t.text);
  if (!i) return null;
  const o = [];
  if (t.presetId) {
    const p = a.get(t.presetId);
    if (p) {
      const y = H6(p.vector);
      y && o.push(`emotion_vector:${y}`);
    }
  }
  const u = ow(t.alpha);
  return Math.abs(u - 1) >= lw && o.push(`emotion_alpha:${cw(u)}`), `${o.length > 0 ? `[${s}|${o.join("|")}]` : `[${s}]`} ${i}`;
}
function uw(t, a) {
  const s = /* @__PURE__ */ new Map();
  for (const o of a) s.set(o.presetId, o);
  const i = [];
  for (const o of t) {
    const u = q6(o, s);
    u && i.push(u);
  }
  return i.join(`
`);
}
function Yr() {
  return {
    id: V6(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var F6 = "_1827s3t2", Y6 = "_1827s3t3", G6 = "_1827s3t4", P6 = "_1827s3t5", K6 = "_1827s3t6", X6 = "_1827s3t7", Q6 = "_1827s3t8", Z6 = "_1827s3t9", J6 = "_1827s3ta", W6 = "_1827s3tb", e8 = "_1827s3td _1827s3tc", t8 = "_1827s3te _1827s3tc", n8 = "_1827s3tf", a8 = "_1827s3tg", r8 = "_1827s3th", s8 = "_1827s3ti _1827s3tc", i8 = "_1827s3tj", l8 = "_1827s3tk", o8 = "_1827s3tl", c8 = "_1827s3tm", u8 = "_1827s3tn", d8 = "_1827s3to", f8 = "_1827s3tp", h8 = "_1827s3tq", m8 = "_1827s3tr", p8 = "_1827s3ts", g8 = "_1827s3tt", v8 = "_1827s3tu";
function y8({
  rows: t,
  onRowsChange: a,
  presets: s,
  mappingsByLower: i
}) {
  const o = g.useId(), u = g.useId(), f = g.useId(), p = g.useRef(null), y = g.useRef(/* @__PURE__ */ new Map()), m = g.useRef(/* @__PURE__ */ new Map()), b = g.useRef(/* @__PURE__ */ new Map()), [v, w] = g.useState(null), [S, j] = g.useState(!1), N = g.useRef(null), R = g.useRef(null), [C, O] = g.useState(null), [M, T] = g.useState(null), [q, Q] = g.useState("");
  g.useEffect(() => {
    v && (v.kind === "addBtn" ? p.current?.focus() : v.kind === "text" && v.rowId ? y.current.get(v.rowId)?.focus() : v.kind === "remove" && v.rowId ? m.current.get(v.rowId)?.focus() : v.kind === "character" && v.rowId ? b.current.get(v.rowId)?.focus() : v.kind === "unmappedFirstItem" && R.current?.querySelector("button")?.focus(), w(null));
  }, [v]);
  const re = t.filter((B) => B.text.trim().length > 0).length, _ = g.useMemo(() => {
    const B = /* @__PURE__ */ new Map();
    for (const J of t) {
      const ce = J.character.trim(), ye = ce.toLowerCase();
      !ye || ye === "narrator" || i.has(ye) || B.has(ye) || B.set(ye, ce);
    }
    return Array.from(B.values()).sort((J, ce) => J.localeCompare(ce));
  }, [t, i]), V = _.length, k = g.useRef(V), [F, W] = g.useState(0);
  g.useEffect(() => {
    V > k.current && W((B) => B + 1), k.current = V;
  }, [V]), g.useEffect(() => {
    if (!S) return;
    w({ kind: "unmappedFirstItem" });
    const B = (ce) => {
      if (!R.current || !N.current) return;
      const ye = ce.target;
      R.current.contains(ye) || N.current.contains(ye) || j(!1);
    }, J = (ce) => {
      ce.key === "Escape" && (j(!1), N.current?.focus());
    };
    return document.addEventListener("mousedown", B), document.addEventListener("keydown", J), () => {
      document.removeEventListener("mousedown", B), document.removeEventListener("keydown", J);
    };
  }, [S]);
  const ae = g.useMemo(() => {
    const B = /* @__PURE__ */ new Set();
    return i.forEach((J) => B.add(J.characterName)), Array.from(B).sort((J, ce) => J.localeCompare(ce));
  }, [i]), K = g.useCallback(
    (B, J) => {
      a(t.map((ce) => ce.id === B ? { ...ce, ...J } : ce));
    },
    [t, a]
  ), le = g.useRef(t);
  g.useEffect(() => {
    le.current = t;
  }, [t]);
  const A = g.useCallback(
    (B) => {
      const J = t.findIndex((at) => at.id === B);
      if (J < 0) return;
      const ce = t[J];
      if (!ce) return;
      const ye = J > 0 ? t[J - 1]?.id ?? null : null, Re = t.filter((at) => at.id !== B);
      a(Re);
      const Pe = ce.character.trim() || `Line ${J + 1}`;
      hn(`Removed ${Pe}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const at = le.current;
            if (at.some((_t) => _t.id === ce.id)) return;
            const Ie = [...at], qe = ye ? at.findIndex((_t) => _t.id === ye) : -1, Gt = qe >= 0 ? qe + 1 : 0;
            Ie.splice(Gt, 0, ce), a(Ie);
          }
        },
        duration: 5e3
      });
      const Ne = `Removed line ${J + 1}, now ${Re.length} ${Re.length === 1 ? "line" : "lines"}`;
      if (Q((at) => at === Ne ? `${Ne}​` : Ne), Re.length === 0)
        w({ kind: "addBtn" });
      else {
        const at = J < Re.length ? J : Re.length - 1, Ie = Re[at];
        w(Ie ? { kind: "remove", rowId: Ie.id } : { kind: "addBtn" });
      }
    },
    [t, a]
  ), Y = g.useCallback(
    (B) => {
      const J = Yr();
      let ce;
      if (B === null)
        ce = [...t, J];
      else {
        const ye = t.findIndex((Re) => Re.id === B);
        ce = ye < 0 ? [...t, J] : [...t.slice(0, ye + 1), J, ...t.slice(ye + 1)];
      }
      a(ce), w({ kind: "text", rowId: J.id });
    },
    [t, a]
  ), $ = g.useCallback(
    (B, J) => {
      const ce = t.findIndex((qe) => qe.id === B);
      if (ce < 0) return;
      const ye = ce + J;
      if (ye < 0 || ye >= t.length) return;
      const Re = [...t], Pe = Re[ce], Ne = Re[ye];
      if (!Pe || !Ne) return;
      Re[ce] = Ne, Re[ye] = Pe, a(Re);
      const Ie = `Moved ${Pe.character.trim() || `Line ${ce + 1}`} to position ${ye + 1} of ${Re.length}`;
      Q((qe) => qe === Ie ? `${Ie}​` : Ie);
    },
    [t, a]
  ), se = g.useCallback(
    (B, J) => {
      B.key === "Enter" && !B.shiftKey ? (B.preventDefault(), Y(J)) : B.altKey && B.key === "ArrowUp" ? (B.preventDefault(), $(J, -1)) : B.altKey && B.key === "ArrowDown" && (B.preventDefault(), $(J, 1));
    },
    [Y, $]
  ), de = g.useCallback((B, J) => {
    O(J), B.dataTransfer.effectAllowed = "move", B.dataTransfer.setData("text/plain", J);
  }, []), D = g.useCallback((B, J) => {
    C && (B.preventDefault(), B.dataTransfer.dropEffect = "move", M !== J && T(J));
  }, [C, M]), H = g.useCallback(
    (B, J) => {
      B.preventDefault();
      const ce = C ?? B.dataTransfer.getData("text/plain");
      if (O(null), T(null), !ce || ce === J) return;
      const ye = t.findIndex((qe) => qe.id === ce), Re = t.findIndex((qe) => qe.id === J);
      if (ye < 0 || Re < 0) return;
      const Pe = [...t], [Ne] = Pe.splice(ye, 1);
      if (!Ne) return;
      Pe.splice(Re, 0, Ne), a(Pe);
      const Ie = `Moved ${Ne.character.trim() || `Line ${ye + 1}`} to position ${Re + 1} of ${Pe.length}`;
      Q((qe) => qe === Ie ? `${Ie}​` : Ie);
    },
    [t, a, C]
  ), Z = g.useCallback(() => {
    O(null), T(null);
  }, []), G = g.useCallback(
    (B) => {
      const J = t.find((ce) => ce.character.trim().toLowerCase() === B.toLowerCase());
      J && w({ kind: "character", rowId: J.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: F6, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: Y6, children: [
      /* @__PURE__ */ c.jsxs("span", { className: G6, id: u, children: [
        "02 / Per-character lines",
        t.length > 1 && /* @__PURE__ */ c.jsx("span", { className: g8, children: "· Alt+↑↓ to reorder" })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: P6, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: K6, children: re.toString().padStart(2, "0") }),
        " lines",
        V > 0 && /* @__PURE__ */ c.jsxs("span", { className: l8, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: N,
              type: "button",
              className: v8,
              "aria-haspopup": "dialog",
              "aria-expanded": S,
              "aria-controls": f,
              title: "Click to see unmapped characters",
              onClick: () => j((B) => !B),
              children: [
                "⚠ ",
                V,
                " unmapped"
              ]
            },
            F
          ),
          S && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: R,
              id: f,
              role: "dialog",
              "aria-label": "Unmapped characters",
              className: o8,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: c8, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: u8, children: _.map((B) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: d8,
                    onClick: () => G(B),
                    children: B
                  }
                ) }, B)) })
              ]
            }
          )
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: m8, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: X6, children: t.map((B, J) => {
      const ce = B.character.trim() || `line ${J + 1}`, ye = i.has(B.character.trim().toLowerCase()), Re = C === B.id, Pe = M === B.id && C !== B.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: Q6,
          "data-mapped": ye || void 0,
          "data-dragging": Re || void 0,
          "data-drag-over": Pe || void 0,
          onDragOver: (Ne) => D(Ne, B.id),
          onDrop: (Ne) => H(Ne, B.id),
          onDragEnd: Z,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: Z6,
                draggable: !0,
                "aria-label": `Drag to reorder ${ce}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`,
                title: "Drag to reorder · Alt+↑ / Alt+↓",
                onDragStart: (Ne) => de(Ne, B.id),
                onKeyDown: (Ne) => {
                  Ne.altKey && Ne.key === "ArrowUp" ? (Ne.preventDefault(), $(B.id, -1)) : Ne.altKey && Ne.key === "ArrowDown" && (Ne.preventDefault(), $(B.id, 1));
                },
                children: "⋮⋮"
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: W6, "aria-hidden": "true", children: (J + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ne) => {
                  Ne ? b.current.set(B.id, Ne) : b.current.delete(B.id);
                },
                type: "text",
                value: B.character,
                onChange: (Ne) => K(B.id, { character: Ne.target.value }),
                placeholder: "Character",
                className: e8,
                "aria-label": `Character name for ${ce}`,
                list: ae.length > 0 ? o : void 0,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ c.jsxs(
              "select",
              {
                value: B.presetId ?? "",
                onChange: (Ne) => K(B.id, { presetId: Ne.target.value === "" ? null : Ne.target.value }),
                className: t8,
                "aria-label": `Emotion preset for ${ce}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  s.map((Ne) => /* @__PURE__ */ c.jsx("option", { value: Ne.presetId, children: Ne.presetName }, Ne.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: n8, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: B.alpha,
                  onChange: (Ne) => K(B.id, { alpha: Number.parseFloat(Ne.target.value) }),
                  className: a8,
                  "aria-label": `Emotion intensity for ${ce}`,
                  "aria-valuetext": `${Math.round(B.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: r8,
                  "aria-hidden": "true",
                  "data-hot": B.alpha >= 0.85 || void 0,
                  children: (Math.round(B.alpha * 100) / 100).toFixed(2)
                }
              )
            ] }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ne) => {
                  Ne ? y.current.set(B.id, Ne) : y.current.delete(B.id);
                },
                type: "text",
                value: B.text,
                onChange: (Ne) => K(B.id, { text: Ne.target.value }),
                onKeyDown: (Ne) => se(Ne, B.id),
                placeholder: "Line text…",
                className: s8,
                "aria-label": `Line text for ${ce}`
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                ref: (Ne) => {
                  Ne ? m.current.set(B.id, Ne) : m.current.delete(B.id);
                },
                type: "button",
                className: i8,
                "aria-label": `Remove ${ce}`,
                title: "Remove this line",
                onClick: () => A(B.id),
                children: "✕"
              }
            ),
            J < t.length - 1 && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: J6,
                "aria-label": `Insert line after ${ce}`,
                title: "Insert line below",
                onClick: () => Y(B.id),
                tabIndex: -1,
                children: /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "＋" })
              }
            )
          ]
        },
        B.id
      );
    }) }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: p,
        type: "button",
        className: f8,
        onClick: () => Y(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: h8, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    ae.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: ae.map((B) => /* @__PURE__ */ c.jsx("option", { value: B }, B)) }),
    /* @__PURE__ */ c.jsx("div", { className: p8, role: "status", "aria-live": "polite", "aria-atomic": "true", children: q })
  ] });
}
var b8 = "fmg0gf0", x8 = "fmg0gf1", tx = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const Hs = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
  { id: "storyboard", label: "Storyboard", glyph: "04", description: "Click words to cast voice + emotion in bulk · shift-click to extend a range" }
], S8 = Hs;
function w8({
  value: t,
  onChange: a,
  storyDisabled: s = !1
}) {
  const i = g.useRef([]), o = g.useCallback(
    (f, p) => {
      const y = Hs.length;
      let m = f;
      for (let v = 1; v <= y; v += 1) {
        const w = (f + p * v + y) % y, S = Hs[w];
        if (!S) continue;
        if (!(S.id === "story" && s)) {
          m = w;
          break;
        }
      }
      const b = Hs[m];
      b && (a(b.id), i.current[m]?.focus());
    },
    [a, s]
  ), u = g.useCallback(
    (f, p) => {
      f.key === "ArrowRight" || f.key === "ArrowDown" ? (f.preventDefault(), o(p, 1)) : f.key === "ArrowLeft" || f.key === "ArrowUp" ? (f.preventDefault(), o(p, -1)) : f.key === "Home" ? (f.preventDefault(), o(-1, 1)) : f.key === "End" && (f.preventDefault(), o(Hs.length, -1));
    },
    [o]
  );
  return /* @__PURE__ */ c.jsx("div", { className: b8, role: "radiogroup", "aria-label": "Editor mode", children: Hs.map((f, p) => {
    const y = f.id === t, m = f.id === "story" && s, b = m ? `${f.label} (coming soon)` : f.label;
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: (v) => {
          i.current[p] = v;
        },
        type: "button",
        role: "radio",
        "aria-checked": y,
        "aria-disabled": m || void 0,
        tabIndex: y ? 0 : -1,
        title: m ? `${f.description} — coming soon` : f.description,
        className: y ? tx.active : tx.idle,
        onClick: () => {
          m || a(f.id);
        },
        onKeyDown: (v) => u(v, p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: x8, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const j8 = [
  "boxSizing",
  "width",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "letterSpacing",
  "textTransform",
  "lineHeight",
  "tabSize",
  "wordSpacing",
  "textIndent",
  "whiteSpace",
  "wordBreak",
  "overflowWrap",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth"
];
function E8(t, a) {
  const s = t.ownerDocument;
  if (!s) return { top: 0, left: 0, height: 0 };
  const i = s.createElement("div"), o = s.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = i.style, f = o;
  for (const N of j8) {
    const R = f[N];
    typeof R == "string" && (u[N] = R);
  }
  i.style.position = "absolute", i.style.visibility = "hidden", i.style.overflow = "hidden", i.style.top = "0", i.style.left = "-9999px", i.style.whiteSpace = "pre-wrap", i.style.wordWrap = "break-word";
  const p = t.value.slice(0, a), y = s.createTextNode(p.replace(/ /g, " ")), m = s.createElement("span");
  m.textContent = t.value.slice(a, a + 1) || ".", i.appendChild(y), i.appendChild(m), s.body.appendChild(i);
  const b = m.getBoundingClientRect(), v = i.getBoundingClientRect(), w = b.top - v.top - t.scrollTop, S = b.left - v.left - t.scrollLeft, j = b.height || parseFloat(o.lineHeight) || 16;
  return s.body.removeChild(i), { top: w, left: S, height: j };
}
const dw = {
  character: "@",
  emotion: "/"
}, fw = /* @__PURE__ */ new Set([" ", "	", `
`, "\r"]), N8 = /[\p{L}\p{N}_-]/u, C8 = /[^\p{L}\p{N}_-]+/gu;
function hw(t) {
  return t ? N8.test(t) : !1;
}
function T8(t) {
  return t.replace(C8, "_").replace(/_+/g, "_").replace(/^[_-]+|[_-]+$/g, "");
}
function R8(t, a) {
  if (a >= t.length) return 0;
  const s = t.charCodeAt(a);
  if (s >= 55296 && s <= 56319 && a + 1 < t.length) {
    const i = t.charCodeAt(a + 1);
    if (i >= 56320 && i <= 57343) return 2;
  }
  return 1;
}
function Lc(t, a) {
  const s = R8(t, a);
  return s === 0 ? "" : t.slice(a, a + s);
}
function $c(t) {
  const a = [];
  let s = 0, i = 0;
  const o = t.length, u = (f) => {
    f > s && a.push({
      kind: "text",
      start: s,
      end: f,
      value: t.slice(s, f)
    });
  };
  for (; i < o; ) {
    const f = t[i], p = f === "@" || f === "/", y = i === 0 ? "" : Lc(t, wc(t, i)), m = i === 0 || y !== "" && fw.has(y);
    if (p && m) {
      let b = i + 1, v = "";
      for (; b < o; ) {
        const w = Lc(t, b);
        if (w && hw(w))
          v += w, b += w.length;
        else
          break;
      }
      if (v) {
        u(i), a.push({
          kind: f === "@" ? "character" : "emotion",
          start: i,
          end: b,
          value: v
        }), s = b, i = b;
        continue;
      }
    }
    i += 1;
  }
  return u(o), a;
}
function wc(t, a) {
  if (a <= 0) return -1;
  const s = t.charCodeAt(a - 1);
  if (s >= 56320 && s <= 57343 && a >= 2) {
    const i = t.charCodeAt(a - 2);
    if (i >= 55296 && i <= 56319) return a - 2;
  }
  return a - 1;
}
function _8(t, a) {
  if (a <= 0 || a > t.length) return null;
  let s = wc(t, a), i = "";
  for (; s >= 0; ) {
    const o = Lc(t, s);
    if (!o) break;
    if (o === "@" || o === "/") {
      const f = s === 0 ? "" : Lc(t, wc(t, s));
      return s === 0 || f !== "" && fw.has(f) ? {
        kind: o === "@" ? "character" : "emotion",
        start: s,
        query: i
      } : null;
    }
    if (!hw(o)) return null;
    i = o + i;
    const u = wc(t, s);
    if (u < 0) break;
    s = u;
  }
  return null;
}
var M8 = "_1d2ofoy5", A8 = "_1d2ofoy6", D8 = "_1d2ofoy8 _1d2ofoy7", k8 = "_1d2ofoy9 _1d2ofoy7", z8 = "_1d2ofoya", O8 = "_1d2ofoyb", L8 = "_1d2ofoyc", $8 = "_1d2ofoye", U8 = "_1d2ofoyf", B8 = "_1d2ofoyg", V8 = "_1d2ofoyh", I8 = "_1d2ofoyi", H8 = "_1d2ofoyj", ic = "_1d2ofoyk", q8 = "_1d2ofoyl";
const F8 = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function Y8({
  value: t,
  onChange: a,
  characters: s,
  presets: i,
  mappingsByLower: o
}) {
  const u = g.useRef(null), f = g.useRef(null), p = g.useId(), y = `${p}-opt`, [m, b] = g.useState(null), v = g.useMemo(() => $c(t), [t]), w = g.useMemo(() => {
    const k = /* @__PURE__ */ new Map();
    o.forEach((F) => k.set(F.characterName.toLowerCase(), F.characterName));
    for (const F of s) {
      const W = F.toLowerCase();
      k.has(W) || k.set(W, F);
    }
    return Array.from(k.values()).sort((F, W) => F.localeCompare(W));
  }, [s, o]), S = g.useMemo(() => {
    if (!m) return [];
    const k = m.query.toLowerCase();
    if (m.kind === "character")
      return w.filter((ae) => ae.toLowerCase().includes(k)).slice(0, 8).map((ae) => {
        const K = o.get(ae.toLowerCase());
        return { value: ae, hint: K ? "mapped" : "unmapped" };
      });
    const F = /* @__PURE__ */ new Set(), W = [];
    for (const ae of i) {
      const K = ae.presetName.toLowerCase();
      if (K.includes(k) && !F.has(K) && (F.add(K), W.push({ value: ae.presetName, hint: "vector" }), W.length >= 8))
        break;
    }
    return W;
  }, [m, w, o, i]), j = g.useCallback((k, F, W) => {
    if (F < 0) return null;
    const ae = _8(k, F);
    if (!ae) return null;
    const K = u.current, le = K ? E8(K, F) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: ae.start,
      query: ae.query,
      kind: ae.kind,
      selected: W && W.kind === ae.kind ? W.selected : 0,
      caretTop: le.top,
      caretLeft: le.left,
      caretHeight: le.height
    };
  }, []), N = g.useCallback(() => {
    const k = u.current;
    if (!k) {
      b(null);
      return;
    }
    const F = k.selectionStart;
    if (F !== k.selectionEnd) {
      b(null);
      return;
    }
    b((W) => j(t, F, W));
  }, [t, j]);
  g.useEffect(() => {
    if (!m) return;
    const k = S.length, F = k === 0 ? 0 : Math.min(m.selected, k - 1);
    m.selected !== F && b({ ...m, selected: F });
  }, [m, S]), g.useLayoutEffect(() => {
    const k = f.current, F = u.current;
    !k || !F || (k.scrollTop = F.scrollTop, k.scrollLeft = F.scrollLeft);
  }), g.useEffect(() => {
    const k = u.current, F = f.current;
    if (!k || !F) return;
    const W = () => {
      F.scrollTop = k.scrollTop, F.scrollLeft = k.scrollLeft;
    };
    return k.addEventListener("scroll", W, { passive: !0 }), () => k.removeEventListener("scroll", W);
  }, []);
  const R = g.useCallback(
    (k) => {
      const F = k.target.value;
      a(F);
      const W = k.target;
      requestAnimationFrame(() => {
        const ae = W.selectionStart;
        if (ae !== W.selectionEnd) {
          b(null);
          return;
        }
        b((K) => j(F, ae, K));
      });
    },
    [a, j]
  ), C = g.useCallback(() => {
    N();
  }, [N]), O = g.useCallback(
    (k, F) => {
      if (!m) return;
      const W = dw[m.kind], ae = m.triggerStart + 1 + m.query.length, K = t.slice(0, m.triggerStart), le = t.slice(ae), A = T8(k);
      if (!A) return;
      const Y = `${W}${A} `, $ = `${K}${Y}${le}`;
      a($);
      const se = K.length + Y.length;
      b(null), F.advanceFocus || requestAnimationFrame(() => {
        u.current && (u.current.focus(), u.current.setSelectionRange(se, se));
      });
    },
    [m, t, a]
  ), M = g.useCallback(
    (k) => {
      if (m) {
        if (k.key === "Escape") {
          k.preventDefault(), b(null);
          return;
        }
        if (S.length !== 0) {
          if (k.key === "ArrowDown")
            k.preventDefault(), b((F) => F && { ...F, selected: (F.selected + 1) % S.length });
          else if (k.key === "ArrowUp")
            k.preventDefault(), b(
              (F) => F && { ...F, selected: (F.selected - 1 + S.length) % S.length }
            );
          else if (k.key === "Enter") {
            const F = S[m.selected];
            F && (k.preventDefault(), O(F.value, { advanceFocus: !1 }));
          } else if (k.key === "Tab") {
            const F = S[m.selected];
            F && O(F.value, { advanceFocus: !0 });
          }
        }
      }
    },
    [m, S, O]
  ), T = g.useRef(null), [q, Q] = g.useState(null);
  g.useLayoutEffect(() => {
    if (!m) {
      Q(null);
      return;
    }
    const k = T.current, F = u.current;
    if (!k || !F) return;
    const W = k.offsetWidth, ae = F.clientWidth, K = Math.max(0, ae - W - 8), le = Math.max(0, m.caretLeft);
    Q(Math.min(le, K));
  }, [m]);
  const re = m?.kind === "character" ? "Character" : "Emotion preset", _ = m && S.length > 0 ? `${y}-${m.selected}` : void 0, V = !m || S.length > 0 ? null : m.kind === "emotion" ? i.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${m.query}". Type a different name or pick from Mappings.` : m.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${m.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: M8, children: [
    /* @__PURE__ */ c.jsxs("div", { className: A8, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: D8, "aria-hidden": "true", children: G8(v, m?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: k8,
          value: t,
          onChange: R,
          onSelect: C,
          onKeyDown: M,
          placeholder: F8,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": m && S.length > 0 ? p : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": _
        }
      ),
      m && (S.length > 0 || V) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: T,
          className: $8,
          style: {
            top: `${m.caretTop + m.caretHeight + 6}px`,
            left: `${q ?? Math.max(0, m.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: U8, "aria-hidden": "true", children: re }),
            S.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: p,
                role: "listbox",
                "aria-label": re,
                className: B8,
                children: S.map((k, F) => {
                  const W = `${y}-${F}`, ae = F === m.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: W,
                      role: "option",
                      "aria-selected": ae,
                      "data-active": ae || void 0,
                      className: V8,
                      onMouseDown: (K) => {
                        K.preventDefault(), O(k.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: k.value }),
                        k.hint && /* @__PURE__ */ c.jsx("span", { className: I8, children: k.hint })
                      ]
                    },
                    `${k.value}-${F}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: p, role: "status", className: q8, children: V })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: H8, children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ic, children: "@" }),
        " character"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ic, children: "/" }),
        " emotion"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ic, children: "⏎" }),
        " commits"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ic, children: "⇥" }),
        " commits + advance"
      ] })
    ] })
  ] });
}
function G8(t, a) {
  return t.map((s, i) => {
    if (s.kind === "text")
      return /* @__PURE__ */ c.jsx("span", { className: z8, children: s.value }, `${s.start}-${i}`);
    const o = s.kind, u = a !== null && s.start === a, f = s.value.replace(/_/g, " ");
    return /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: L8,
        "data-kind": o,
        "data-active": u ? "true" : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: O8, children: dw[o] }),
          f
        ]
      },
      `${s.start}-${i}`
    );
  });
}
var P8 = "_5o8xvy0", K8 = "_5o8xvy1", X8 = "_5o8xvy2", Q8 = "_5o8xvy3", Yf = "_5o8xvy4", Z8 = "_5o8xvy5", J8 = "_3f2ar0", W8 = "_3f2ar1", e$ = "_3f2ar2", t$ = "_3f2ar3", n$ = "_3f2ar4", a$ = "_3f2ar6", sl = "_3f2ar7", il = "_3f2ar8", ll = "_3f2ar9", nx = "_3f2ara", ax = "_3f2arb";
function r$({ label: t, glyph: a = "?", children: s }) {
  const [i, o] = g.useState(!1), u = g.useRef(null), f = g.useId(), p = `${f}-content`, y = g.useCallback(() => o(!1), []);
  return g.useEffect(() => {
    if (!i) return;
    const m = (v) => {
      u.current && (v.target instanceof Node && u.current.contains(v.target) || y());
    }, b = (v) => {
      v.key === "Escape" && y();
    };
    return document.addEventListener("mousedown", m), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", m), document.removeEventListener("keydown", b);
    };
  }, [i, y]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: J8, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: W8,
        "aria-expanded": i,
        "aria-controls": p,
        onClick: () => o((m) => !m),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: e$, "aria-hidden": "true", children: a }),
          t
        ]
      }
    ),
    i && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: p,
        role: "dialog",
        "aria-labelledby": f,
        className: t$,
        children: s
      }
    )
  ] });
}
var s$ = "_1dxb1dg0", rx = "_1dxb1dg1", i$ = "_1dxb1dg2", l$ = "_1dxb1dg3", o$ = "_1dxb1dg4";
function c$() {
  return /* @__PURE__ */ c.jsxs(r$, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: n$, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: a$, children: [
      /* @__PURE__ */ c.jsxs("li", { className: sl, children: [
        /* @__PURE__ */ c.jsx("code", { className: il, children: "[Char] line text" }),
        /* @__PURE__ */ c.jsx("span", { className: ll, children: "Plain line — uses the speaker's mapped voice." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: sl, children: [
        /* @__PURE__ */ c.jsx("code", { className: il, children: "[Char|emotion_vector:happy=0.7]" }),
        /* @__PURE__ */ c.jsx("span", { className: ll, children: "Per-line 8-axis emotion override. Combine axes with commas." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: sl, children: [
        /* @__PURE__ */ c.jsx("code", { className: il, children: "[Char|qwen:Friendly teen]" }),
        /* @__PURE__ */ c.jsx("span", { className: ll, children: "Send a free-text mood prompt — the Qwen helper turns it into an emotion vector." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: sl, children: [
        /* @__PURE__ */ c.jsx("code", { className: il, children: "[Char|preset:Bittersweet]" }),
        /* @__PURE__ */ c.jsx("span", { className: ll, children: "Apply a saved preset by name." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: sl, children: [
        /* @__PURE__ */ c.jsx("code", { className: il, children: "[Char|audio:slow_breath.wav]" }),
        /* @__PURE__ */ c.jsx("span", { className: ll, children: "Use a reference audio clip as the emotion source." })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: nx, children: [
      /* @__PURE__ */ c.jsx("span", { className: ax, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: nx, children: [
      /* @__PURE__ */ c.jsx("span", { className: ax, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function u$() {
  return /* @__PURE__ */ c.jsxs("ul", { className: s$, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: rx, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: rx, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: i$, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: l$, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: o$, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function d$({
  editorMode: t,
  onEditorModeChange: a,
  deployment: s,
  script: i,
  onScriptChange: o,
  rows: u,
  onRowsChange: f,
  storyText: p,
  onStoryTextChange: y,
  storyCharacters: m,
  outputFormat: b,
  mappingsByLower: v,
  defaultVoiceAssetId: w,
  onDefaultVoiceAssetIdChange: S,
  presets: j,
  voiceAssets: N,
  onQueueChange: R
}) {
  const C = t === "quick", O = t === "rows", M = t === "story", T = t === "storyboard", q = M || T, Q = S8.find((F) => F.id === t)?.description ?? "", re = O ? u.reduce((F, W) => F + W.text.length, 0) : q ? p.length : i.length, _ = O ? u.map((F) => F.text).join(" ") : q ? p : i, V = _.trim() ? _.trim().split(/\s+/).length : 0, k = O ? u.filter((F) => F.text.trim().length > 0).length : (q ? p : i).trim() ? (q ? p : i).trim().split(/\r?\n/).filter((F) => F.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: P8, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${K8} ${C ? X8 : ""}`,
        "data-quick-on": C || void 0,
        children: [
          /* @__PURE__ */ c.jsx(w8, { value: t, onChange: a }),
          C && /* @__PURE__ */ c.jsx(
            D6,
            {
              deploymentId: s.deploymentId,
              initialVoiceAssetId: w,
              onChange: S
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: Q8, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: re.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: k.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: V.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            !O && /* @__PURE__ */ c.jsx(c$, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: Z8, "aria-live": "polite", children: Q }),
    T ? /* @__PURE__ */ c.jsx(
      YL,
      {
        voiceAssets: N,
        presets: j,
        storyText: p,
        onStoryTextChange: y,
        mappings: v,
        onQueueChange: R
      }
    ) : O ? /* @__PURE__ */ c.jsx(
      y8,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: v
      }
    ) : M ? /* @__PURE__ */ c.jsx(
      Y8,
      {
        value: p,
        onChange: y,
        characters: m,
        presets: j,
        mappingsByLower: v
      }
    ) : /* @__PURE__ */ c.jsx(
      O6,
      {
        value: i,
        onChange: o,
        outputFormat: b,
        mappings: v,
        deploymentId: s.deploymentId,
        quickMode: C
      }
    ),
    !C && !O && !M && !T && /* @__PURE__ */ c.jsx(u$, {})
  ] });
}
function f$({
  script: t,
  quickMode: a,
  defaultVoiceAssetId: s,
  characters: i,
  unmappedCount: o,
  globalEmotion: u,
  performance: f
}) {
  const p = [], y = t.trim();
  if (!y)
    p.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const m = y.split(/\r?\n/).filter((b) => b.trim()).length;
    p.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${m} lines · ${y.length} chars`
    });
  }
  if (a ? p.push({
    id: "voice",
    status: s ? "ok" : "warn",
    label: "Quick voice",
    detail: s ? "default voice set" : "no default voice"
  }) : i.length === 0 ? p.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? p.push({ id: "cast", status: "ok", label: "Cast", detail: `${i.length} mapped` }) : p.push({
    id: "cast",
    status: "warn",
    label: "Cast",
    detail: `${o} unmapped`
  }), u.mode === "qwen_template" && !u.qwenTemplate?.trim())
    p.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (u.mode === "emotion_vector") {
    const m = u.vector, b = Array.isArray(m) && m.some((v) => Math.abs(v) > 0.01);
    p.push({
      id: "emotion",
      status: b ? "ok" : "info",
      label: "Emotion",
      detail: b ? "8-axis vector" : "neutral vector"
    });
  } else u.mode === "audio_ref" ? p.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : p.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return p.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(f.intensity * 100)}% · pace ${f.pace.toFixed(2)}× · pitch ${f.pitchSt >= 0 ? "+" : ""}${f.pitchSt.toFixed(1)}st`
  }), p;
}
function sx(t, a) {
  return t === "quick" ? a.script.trim().length > 0 : t === "rows" ? a.rows.some((s) => s.text.trim().length > 0 || s.character.trim().length > 0) : a.storyText.trim().length > 0;
}
function h$(t, a, s, i) {
  if (t === a) return null;
  if (t === "quick" && a === "rows") {
    const u = s.script.split(/\r?\n/).filter((f) => f.trim().length > 0).map((f) => ({
      ...Yr(),
      text: f.trim()
    }));
    return { rows: u.length > 0 ? u : [Yr()] };
  }
  if (t === "quick" && a === "story")
    return { storyText: s.script };
  if (t === "rows" && a === "quick")
    return { script: uw(s.rows, i) };
  if (t === "rows" && a === "story") {
    const o = /* @__PURE__ */ new Map();
    for (const f of i) o.set(f.presetId, f);
    const u = [];
    for (const f of s.rows) {
      const p = f.text.trim();
      if (!p) continue;
      const y = f.character.trim(), m = f.presetId ? o.get(f.presetId) : null, b = [];
      y && b.push(`@${ix(y)}`), m && b.push(`/${ix(m.presetName)}`), b.push(p), u.push(b.join(" "));
    }
    return { storyText: u.join(`
`) };
  }
  if (t === "story" && a === "quick") {
    const o = $c(s.storyText), u = [];
    for (const p of o)
      p.kind === "text" && u.push(p.value);
    return { script: u.join("").split(/\r?\n/).map((p) => p.replace(/[ \t]+/g, " ").trim()).filter((p) => p.length > 0).join(`
`) };
  }
  if (t === "story" && a === "rows") {
    const o = $c(s.storyText), u = /* @__PURE__ */ new Map();
    for (const w of i) u.set(w.presetName.toLowerCase(), w);
    const f = [];
    let p = "", y = null, m = "", b = !1;
    const v = () => {
      const w = m.split(/\r?\n/).map((j) => j.replace(/[ \t]+/g, " ").trim()).filter((j) => j.length > 0);
      if (m = "", w.length === 0) return;
      const S = w[0];
      if (S !== void 0) {
        f.push({
          ...Yr(),
          character: p,
          presetId: y,
          alpha: 1,
          text: S
        });
        for (let j = 1; j < w.length; j += 1) {
          const N = w[j];
          N !== void 0 && f.push({
            ...Yr(),
            character: "",
            presetId: null,
            alpha: 1,
            text: N
          });
        }
      }
    };
    for (const w of o)
      if (w.kind === "character")
        b && v(), p = w.value, y = null, b = !0;
      else if (w.kind === "emotion") {
        b && v();
        const S = u.get(w.value.toLowerCase());
        y = S ? S.presetId : null, b = !0;
      } else
        m += w.value, b = !0;
    return v(), { rows: f.length > 0 ? f : [Yr()] };
  }
  return null;
}
function ix(t) {
  return t.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
const Gf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], m$ = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function p$(t) {
  const a = [];
  if (!t) return a;
  const s = t.split(/\r?\n/);
  for (let i = 0; i < s.length; i += 1) {
    const u = (s[i] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(m$);
    if (!f || !f.groups) {
      a.push({ idx: i, character: null, text: u, override: null });
      continue;
    }
    const p = f.groups.body ?? "", y = (f.groups.rest ?? "").trim(), [m = "", ...b] = p.split("|"), v = m.trim();
    if (!v) {
      a.push({ idx: i, character: null, text: y || u, override: null });
      continue;
    }
    const w = v.split(":")[0]?.trim() || null, S = b.join("|").trim(), j = S ? g$(S) : null;
    a.push({
      idx: i,
      character: w,
      text: y,
      override: j
    });
  }
  return a;
}
function g$(t) {
  const a = t.trim();
  if (!a) return { kind: "raw", label: "" };
  const s = a.indexOf(":"), i = s >= 0 ? a.slice(0, s).trim().toLowerCase() : a.toLowerCase(), o = s >= 0 ? a.slice(s + 1).trim() : "";
  switch (i) {
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
function v$(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    if (!i.character) continue;
    const o = i.character.toLowerCase();
    a.has(o) || (a.add(o), s.push(i.character));
  }
  return s;
}
function y$(t) {
  const a = {};
  for (let s = 0; s < t.length; s += 1) {
    const i = t[s];
    i && (a[i] = Gf[s % Gf.length] ?? Gf[0]);
  }
  return a;
}
function b$(t) {
  const a = {};
  for (const s of t)
    s.character && (a[s.character] = (a[s.character] ?? 0) + 1);
  return a;
}
var x$ = "_1snzz30", S$ = "_1snzz31", w$ = "_1snzz33", j$ = "_1snzz34", E$ = "_1snzz36", lx = "_1snzz3b", ox = "_1snzz3c", cx = "_1snzz3d";
const N$ = "ext-action-invoke", C$ = "emotion-tts.run";
function T$() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(N$, {
      detail: { id: C$ },
      bubbles: !1
    })
  ), !0) : !1;
}
const R$ = 4e3;
function _$({ visible: t, canGenerate: a }) {
  const [s, i] = g.useState(null), [o, u] = g.useState(!1), [f, p] = g.useState(!1), y = g.useRef(null);
  g.useEffect(() => {
    let Y = !1;
    const $ = async () => {
      try {
        const de = await vl();
        Y || (y.current = de, i(de));
      } catch {
      }
    };
    $();
    const se = window.setInterval($, R$);
    return () => {
      Y = !0, window.clearInterval(se);
    };
  }, []), g.useEffect(() => JS((Y) => {
    p(!!Y.busy);
  }), []);
  const m = g.useCallback(() => {
    z4();
  }, []), b = s?.badge ?? "not_installed", v = b === "ready" || b === "running", w = b === "starting" || b === "installing" || b === "stopping", S = v;
  g.useEffect(() => {
    o && (w || v) && u(!1);
  }, [o, w, v]);
  const j = g.useCallback(() => {
    u(!0), T$();
  }, []), N = v ? "Stop runtime" : w ? "Runtime starting…" : "Start runtime", R = o || w, C = o || w, O = C ? "transitioning" : v ? "running" : "stopped", M = !a || f || !S, T = S ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", q = S && a && !f, Q = v ? "ready" : w || o ? "busy" : "off", re = v ? "Runtime ready" : w ? "Starting…" : o ? "Working…" : "Runtime off", _ = Q === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const V = "rgba(28, 30, 34, 0.94)", k = "#ba9eff", F = "#8455ef", W = "#1a0a3a", ae = "#f0f0f3", K = "#aaabae", le = "#22c55e", A = v ? "◼" : "⏻";
  return Xh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: x$,
        "data-visible": t ? "true" : "false",
        role: "toolbar",
        "aria-label": "Quick actions",
        "aria-hidden": !t,
        style: {
          position: "fixed",
          bottom: "24px",
          left: "50%",
          right: "auto",
          top: "auto",
          transform: t ? "translate(-50%, 0)" : "translate(-50%, 12px)",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          paddingInline: "8px",
          paddingBlock: "8px",
          background: V,
          boxShadow: "0 18px 44px -12px rgba(0, 0, 0, 0.7), 0 6px 18px -6px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(186, 158, 255, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(20px) saturate(1.7)",
          WebkitBackdropFilter: "blur(20px) saturate(1.7)",
          borderRadius: "999px",
          zIndex: 60
        },
        children: [
          /* @__PURE__ */ c.jsxs(
            "span",
            {
              className: S$,
              "data-tone": Q,
              "aria-live": "polite",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                paddingInline: "14px",
                height: "36px",
                borderRadius: "999px",
                fontFamily: 'var(--font-mono, "JetBrains Mono", ui-monospace, monospace)',
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: Q === "ready" ? le : Q === "busy" ? k : K,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${Q === "ready" ? "rgba(34, 197, 94, 0.4)" : Q === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: w$,
                    "data-pulse": _ ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: Q === "ready" ? `0 0 8px ${le}` : Q === "busy" ? `0 0 8px ${k}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                re
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: ox, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: j$,
                "data-state": O,
                onClick: j,
                disabled: R,
                "aria-label": N,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: O === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: O === "running" ? le : ae,
                  fontSize: "16px",
                  cursor: R ? "not-allowed" : "pointer",
                  opacity: R ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${O === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: C ? /* @__PURE__ */ c.jsx("span", { className: lx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: A })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: cx, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: ox, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: E$,
                "data-ready": q ? "true" : "false",
                onClick: m,
                disabled: M,
                "aria-label": T,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: M ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${k} 0%, ${F} 100%)`,
                  color: M ? K : W,
                  fontFamily: 'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: M ? "not-allowed" : "pointer",
                  boxShadow: M ? "none" : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  transition: "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
                  whiteSpace: "nowrap"
                },
                children: [
                  f ? /* @__PURE__ */ c.jsx("span", { className: lx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: cx, role: "tooltip", children: T })
          ] })
        ]
      }
    ),
    document.body
  );
}
function M$(t) {
  const a = t.workflowCustomised ?? !1, s = t.unmappableFields ?? [], i = A$(t.deployment.displayName, t.deployment.deploymentId), o = tw(nw), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: jR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: ER, children: [
      /* @__PURE__ */ c.jsx("div", { className: CR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: NR, children: /* @__PURE__ */ c.jsx("h1", { className: TR, children: i }) }),
      /* @__PURE__ */ c.jsx("p", { className: RR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(Dn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      s.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${s.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: BR, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: _R, children: [
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: t.scriptSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: t.parsedDialogueSection
        }
      ),
      t.voiceLibrarySection && /* @__PURE__ */ c.jsx(
        pr,
        {
          number: "03",
          title: "Voice library",
          id: "recipe-section-voice-library",
          variant: "default",
          children: t.voiceLibrarySection
        }
      ),
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: t.voiceLibrarySection ? "04" : "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: t.castSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: t.voiceLibrarySection ? "05" : "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: t.emotionSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: t.voiceLibrarySection ? "06" : "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: t.performanceSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: t.voiceLibrarySection ? "07" : "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: t.recentRunsSection
        }
      ),
      t.auditSection && /* @__PURE__ */ c.jsx(
        pr,
        {
          number: t.voiceLibrarySection ? "08" : "07",
          title: "Edit history",
          id: "recipe-section-audit",
          variant: "default",
          defaultCollapsed: !0,
          children: t.auditSection
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(_$, { visible: o, canGenerate: u }),
    typeof document < "u" && Xh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: VR,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: hO,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function A$(t, a) {
  const s = (t ?? "").trim();
  return !s || s === a ? "Recipe Studio" : s;
}
function pr({
  number: t,
  title: a,
  id: s,
  variant: i,
  defaultCollapsed: o = !1,
  children: u
}) {
  const [f, p] = g.useState(o), y = `${s}-body`;
  return /* @__PURE__ */ c.jsxs("section", { className: MR, "aria-labelledby": s, children: [
    /* @__PURE__ */ c.jsx("header", { className: AR, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: zR,
        "aria-expanded": !f,
        "aria-controls": y,
        onClick: () => p((m) => !m),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: DR, children: [
            /* @__PURE__ */ c.jsx("span", { className: OR, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: LR, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: $R, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: s, className: kR, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: UR,
              "data-collapsed": f ? "true" : "false",
              "aria-hidden": "true",
              children: "▾"
            }
          )
        ]
      }
    ) }),
    !f && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: y,
        className: i === "split" ? HR : IR,
        children: u
      }
    )
  ] });
}
const yn = {
  success(t) {
    hn.success(t);
  },
  error(t) {
    hn.error(t);
  }
}, _h = "__recipe";
function D$(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function k$(t) {
  const a = {};
  for (const s of Object.keys(t))
    s !== _h && (a[s] = t[s]);
  return a;
}
function z$() {
  const { deployment: t, mappings: a, runs: s, workflow: i } = Tl(), [o, u] = g.useState(a), [f, p] = g.useState([]), [y, m] = g.useState([]), [b, v] = g.useState(null), [w, S] = g.useState(Gc), j = g.useMemo(
    () => t.defaultGenerationOverridesJson ? D$(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = g.useMemo(() => {
    const fe = j[_h];
    return typeof fe == "object" && fe !== null ? fe : {};
  }, [j]), [R, C] = g.useState(""), [O, M] = g.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [T, q] = g.useState(t.defaultSpeedFactor ?? 1), [Q, re] = g.useState({
    mode: "none",
    emotionAlpha: 1
  }), [_, V] = g.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...k$(j)
  })), [k, F] = g.useState(() => {
    const fe = N.cachePolicy;
    return fe === "use_cache" || fe === "force_regenerate" || fe === "read_only_cache" ? fe : "use_cache";
  }), [W, ae] = g.useState(
    t.defaultVoiceAssetId ?? null
  ), [K, le] = g.useState(() => {
    const fe = N.editorMode;
    return fe === "quick" || fe === "rows" || fe === "story" || fe === "storyboard" ? fe : typeof N.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), A = K === "quick", [Y, $] = g.useState(() => [Yr()]), se = 1e5, [de, D] = g.useState(() => {
    const fe = N.storyText;
    return typeof fe == "string" ? fe : "";
  }), H = g.useRef(!1), Z = g.useCallback((fe) => {
    fe.length > se && !H.current && (H.current = !0, yn.error(
      `Story text is over ${Math.round(se / 1e3)} KB — large scripts may slow down save and rendering.`
    )), fe.length <= se && (H.current = !1), D(fe);
  }, []), [G, B] = g.useState(y5), [J, ce] = g.useState([]), ye = g.useRef(R), Re = g.useRef(Y), Pe = g.useRef(de), Ne = g.useRef(y);
  g.useEffect(() => {
    ye.current = R;
  }, [R]), g.useEffect(() => {
    Re.current = Y;
  }, [Y]), g.useEffect(() => {
    Pe.current = de;
  }, [de]), g.useEffect(() => {
    Ne.current = y;
  }, [y]);
  const [at, Ie] = g.useState(""), qe = g.useCallback(
    (fe) => {
      le((_e) => {
        if (fe === _e) return _e;
        const Ce = {
          script: ye.current,
          rows: Re.current,
          storyText: Pe.current
        }, U = sx(fe, Ce), pe = sx(_e, Ce);
        if (!U && pe) {
          const ve = h$(_e, fe, Ce, Ne.current);
          if (ve) {
            const be = { ...Ce }, Ve = document.activeElement;
            ve.script !== void 0 && C(ve.script), ve.rows !== void 0 && $(ve.rows), ve.storyText !== void 0 && Z(ve.storyText);
            const We = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story",
              storyboard: "Storyboard"
            }, it = (Kt) => Kt.split(/\r?\n/).filter((z) => z.trim().length > 0).length, Fe = ve.rows !== void 0 ? ve.rows.length : ve.script !== void 0 ? it(ve.script) : ve.storyText !== void 0 ? it(ve.storyText) : 0, ht = Fe === 1 ? "line" : "lines", an = Fe > 0 ? ` (${Fe} ${ht})` : "", zn = `Switched to ${We[fe]} mode${Fe > 0 ? `, ${Fe} ${ht}` : ""}.`;
            Ie((Kt) => Kt === zn ? `${zn}​` : zn), hn(`Switched to ${We[fe]}${an} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  C(be.script), $([...be.rows]), Z(be.storyText), le(_e), Ve && typeof Ve.focus == "function" && requestAnimationFrame(() => Ve.focus());
                }
              },
              duration: 5e3
            });
          }
        }
        return fe;
      });
    },
    [Z]
  );
  g.useEffect(() => {
    let fe = !1;
    return Qs(t.deploymentId).then((_e) => {
      fe || p(_e.voiceAssets);
    }).catch(() => {
    }), a2(t.deploymentId).then((_e) => {
      fe || m(
        [..._e.presets].sort((Ce, U) => U.updatedAt - Ce.updatedAt)
      );
    }).catch(() => {
    }), () => {
      fe = !0;
    };
  }, [t.deploymentId]);
  const Gt = g.useRef(!0);
  g.useEffect(() => {
    if (Gt.current) {
      Gt.current = !1;
      return;
    }
    const fe = window.setTimeout(() => {
      const _e = {
        ..._,
        [_h]: {
          editorMode: K,
          quickMode: A,
          cachePolicy: k,
          storyText: de
        }
      };
      Ct(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: O,
          defaultSpeedFactor: T,
          defaultGenerationOverrides: _e
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(fe);
  }, [
    t.deploymentId,
    O,
    T,
    k,
    K,
    A,
    de,
    _
  ]);
  const _t = g.useMemo(() => K === "rows" ? uw(Y, y) : K === "story" ? de : R, [K, Y, y, R, de]), Mt = g.useMemo(() => p$(_t), [_t]), mn = g.useMemo(() => {
    if (K !== "story") return v$(Mt);
    const fe = /* @__PURE__ */ new Set(), _e = [];
    for (const Ce of $c(de))
      Ce.kind === "character" && (fe.has(Ce.value) || (fe.add(Ce.value), _e.push(Ce.value)));
    return _e;
  }, [K, Mt, de]), gt = g.useMemo(() => {
    const fe = new Set(mn.map((Ce) => Ce.toLowerCase())), _e = [...mn];
    for (const Ce of o) {
      if (!Ce.isActive) continue;
      const U = Ce.characterName.toLowerCase();
      fe.has(U) || (fe.add(U), _e.push(Ce.characterName));
    }
    return _e;
  }, [mn, o]), Pt = g.useMemo(() => y$(gt), [gt]), jn = g.useMemo(() => b$(Mt), [Mt]), ot = g.useMemo(() => {
    const fe = /* @__PURE__ */ new Map();
    for (const _e of o)
      fe.set(_e.characterName.toLowerCase(), _e);
    return fe;
  }, [o]), sn = g.useMemo(() => A && W ? 0 : gt.filter((fe) => !ot.has(fe.toLowerCase())).length, [gt, ot, A, W]), bt = g.useCallback(
    async (fe, _e) => {
      const Ce = ot.get(fe.toLowerCase());
      try {
        if (Ce) {
          const U = await Ys(t.deploymentId, Ce.mappingId, _e);
          u(
            (pe) => pe.map((ve) => ve.mappingId === U.mappingId ? U : ve)
          ), yn.success(`Updated mapping for ${Ce.characterName}`);
        } else if (_e.speakerVoiceAssetId) {
          const U = await Ph(t.deploymentId, {
            ..._e,
            characterName: fe,
            speakerVoiceAssetId: _e.speakerVoiceAssetId
          });
          u((pe) => [...pe, U]), yn.success(`Mapped ${fe} to voice`);
        }
      } catch (U) {
        yn.error(U instanceof Error ? U.message : "mapping failed");
      }
    },
    [ot, t.deploymentId]
  ), we = g.useCallback(
    async (fe, _e) => {
      const Ce = _e.trim(), U = ot.get(fe.toLowerCase());
      if (!(!U || !Ce || Ce === U.characterName))
        try {
          const pe = await Ys(t.deploymentId, U.mappingId, {
            characterName: Ce
          });
          u(
            (ve) => ve.map((be) => be.mappingId === pe.mappingId ? pe : be)
          ), yn.success(`Renamed character to ${Ce}`);
        } catch (pe) {
          yn.error(pe instanceof Error ? pe.message : "rename failed");
        }
    },
    [ot, t.deploymentId]
  ), Le = g.useCallback(
    async (fe) => {
      const _e = ot.get(fe.toLowerCase());
      if (_e)
        try {
          await h1(t.deploymentId, _e.mappingId), u((Ce) => Ce.filter((U) => U.mappingId !== _e.mappingId)), yn.success(`Cleared mapping for ${fe}`);
        } catch (Ce) {
          yn.error(Ce instanceof Error ? Ce.message : "clear failed");
        }
    },
    [ot, t.deploymentId]
  ), Xe = g.useCallback(
    async (fe, _e) => {
      try {
        const Ce = await Nc(
          t.deploymentId,
          _e,
          _e.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        p((U) => [Ce, ...U]), await bt(fe, { speakerVoiceAssetId: Ce.voiceAssetId });
      } catch (Ce) {
        yn.error(Ce instanceof Error ? Ce.message : "upload failed");
      }
    },
    [t.deploymentId, bt]
  ), ct = g.useCallback(
    (fe, _e) => {
      bt(_e, { speakerVoiceAssetId: fe.voiceAssetId });
    },
    [bt]
  ), At = g.useCallback((fe) => {
    S(fe);
  }, []), Ut = g.useMemo(() => {
    const fe = [], _e = /* @__PURE__ */ new Set();
    for (const Ce of o) {
      const U = Ce.speakerVoiceAssetId;
      if (!U || _e.has(U)) continue;
      _e.add(U);
      const ve = f.find((be) => be.voiceAssetId === U)?.displayName ?? `${Ce.characterName} · ${U.slice(0, 8)}`;
      fe.push({ kind: "voice_asset", id: U, label: ve });
    }
    for (const Ce of f)
      _e.has(Ce.voiceAssetId) || (_e.add(Ce.voiceAssetId), fe.push({ kind: "voice_asset", id: Ce.voiceAssetId, label: Ce.displayName }));
    return fe;
  }, [o, f]), sa = g.useCallback(
    async (fe, _e) => {
      if (fe.kind !== "voice_asset") {
        yn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let Ce;
      try {
        const U = JSON.parse(_e);
        if (typeof U != "object" || U === null || U.version !== 1 || !Array.isArray(U.ops))
          throw new Error("snapshot is not a valid EditChain");
        Ce = U;
      } catch (U) {
        yn.error(
          U instanceof Error ? `Audit snapshot is malformed: ${U.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const U = await p1(fe.id, t.deploymentId, {
          chain: Ce
        }), pe = o.filter((ve) => ve.speakerVoiceAssetId === fe.id);
        await Promise.all(
          pe.map(
            (ve) => Ys(t.deploymentId, ve.mappingId, {
              voiceAssetChainDigest: U.chain_digest
            }).catch(() => null)
          )
        ), u(
          (ve) => ve.map(
            (be) => be.speakerVoiceAssetId === fe.id ? { ...be, voiceAssetChainDigest: U.chain_digest } : be
          )
        ), yn.success(`Reverted ${fe.label} to a prior chain`);
      } catch (U) {
        yn.error(U instanceof Error ? U.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), Sn = g.useCallback(
    async (fe) => {
      if (fe.kind !== "voice_asset") {
        yn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await bR(fe.id, t.deploymentId);
        const _e = o.filter((Ce) => Ce.speakerVoiceAssetId === fe.id);
        await Promise.all(
          _e.map(
            (Ce) => Ys(t.deploymentId, Ce.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (Ce) => Ce.map(
            (U) => U.speakerVoiceAssetId === fe.id ? { ...U, voiceAssetChainDigest: null } : U
          )
        ), yn.success(`Cleared edit chain on ${fe.label}`);
      } catch (_e) {
        yn.error(_e instanceof Error ? _e.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), pn = g.useMemo(
    () => ({
      script: _t,
      parserMode: K === "quick" ? "raw_text" : K === "story" ? "story" : "dialogue",
      outputFormat: O,
      speedFactor: T,
      globalEmotion: { ...Q, emotionAlpha: G.intensity },
      generation: _,
      cachePolicy: k,
      ...K === "storyboard" && J.length > 0 ? {
        prebuiltSegments: J.map(
          (fe) => fe.emotion ? { ...fe, emotion: { ...fe.emotion, emotionAlpha: G.intensity } } : fe
        )
      } : {}
    }),
    [_t, K, O, T, G.intensity, Q, _, k, J]
  ), Ot = g.useMemo(
    () => f$({
      script: _t,
      quickMode: A,
      defaultVoiceAssetId: W,
      characters: gt,
      unmappedCount: sn,
      globalEmotion: Q,
      performance: G
    }),
    [_t, A, W, gt, sn, Q, G]
  ), Tt = g.useMemo(
    () => Ot.filter((fe) => fe.id !== "performance").map((fe) => ({
      label: fe.label,
      status: fe.status === "ok" ? "ok" : fe.status === "warn" ? "warn" : "ok",
      detail: fe.detail
    })),
    [Ot]
  ), pt = K === "storyboard" && J.length > 0, En = _t.trim().length > 0 || pt;
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(vR, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ c.jsx(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true",
        style: {
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          border: 0
        },
        children: at
      }
    ),
    /* @__PURE__ */ c.jsx(
      M$,
      {
        deployment: t,
        canGenerate: En,
        workflowCustomised: i.workflow.customised,
        unmappableFields: i.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(Y2, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          MO,
          {
            deploymentId: t.deploymentId,
            createPayload: pn,
            canGenerate: En,
            diagnostics: Tt
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          cO,
          {
            deploymentId: t.deploymentId,
            speedFactor: T
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          d$,
          {
            editorMode: K,
            onEditorModeChange: qe,
            deployment: t,
            script: R,
            onScriptChange: C,
            rows: Y,
            onRowsChange: $,
            storyText: de,
            onStoryTextChange: Z,
            storyCharacters: gt,
            outputFormat: O,
            mappingsByLower: ot,
            defaultVoiceAssetId: W,
            onDefaultVoiceAssetIdChange: ae,
            presets: y,
            voiceAssets: f,
            onQueueChange: ce
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(c5, { lines: Mt, characterColors: Pt }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          n2,
          {
            deploymentId: t.deploymentId,
            voiceAssets: f,
            mappings: o,
            characterColors: Pt,
            onVoiceAssetsChange: p,
            onCreateCharacterFromVoice: ct
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(B2, { unmappedCount: sn, totalCount: gt.length, children: gt.map((fe) => {
          const _e = ot.get(fe.toLowerCase()) ?? null, Ce = Pt[fe] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: WR, children: /* @__PURE__ */ c.jsx(
            U2,
            {
              characterName: fe,
              color: Ce,
              lineCount: jn[fe] ?? 0,
              mapping: _e,
              voiceAssets: f,
              presets: y,
              active: b === fe,
              onToggle: () => v((U) => U === fe ? null : fe),
              onAssignVoiceAsset: (U) => bt(fe, { speakerVoiceAssetId: U }),
              onAssignPreset: (U) => bt(fe, { defaultVectorPresetId: U }),
              onUploadFile: (U) => Xe(fe, U),
              onClearMapping: () => Le(fe),
              onRename: (U) => we(fe, U)
            }
          ) }, fe);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          z3,
          {
            value: Q,
            onChange: re,
            deploymentId: t.deploymentId,
            presets: y,
            onPresetsChange: m
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            b5,
            {
              value: { ...G, pace: T },
              onChange: (fe) => {
                B(fe), fe.pace !== T && q(fe.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            Jh,
            {
              state: w,
              onChange: At,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(M5, { checks: Ot }),
          /* @__PURE__ */ c.jsx(
            W3,
            {
              outputFormat: O,
              onOutputFormatChange: M,
              speedFactor: T,
              onSpeedFactorChange: q,
              cachePolicy: k,
              onCachePolicyChange: F,
              generation: _,
              onGenerationChange: V
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx($5, { runs: s, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          b2,
          {
            deploymentId: t.deploymentId,
            targets: Ut,
            onRevertToIdentity: Sn,
            onRevertToChain: sa
          }
        )
      }
    )
  ] });
}
const ux = /* @__PURE__ */ new Map();
function O$(t, a) {
  const [s, i] = g.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return g.useEffect(() => {
    if (!t || a <= 0) {
      i({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${t}::${a}`, u = ux.get(o);
    if (u) {
      i({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return i({ peaks: null, isLoading: !0, error: null }), L$(t, a, f.signal).then((p) => {
      f.signal.aborted || (ux.set(o, p), i({ peaks: p, isLoading: !1, error: null }));
    }).catch((p) => {
      if (f.signal.aborted) return;
      const y = p instanceof Error ? p.message : "decode failed";
      i({ peaks: null, isLoading: !1, error: y });
    }), () => f.abort();
  }, [t, a]), s;
}
async function L$(t, a, s) {
  const i = await fetch(t, { signal: s });
  if (!i.ok) throw new Error(`failed to load audio (${i.status})`);
  const o = await i.arrayBuffer();
  if (s.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return $$(f, a);
}
function $$(t, a) {
  const s = t.numberOfChannels, i = t.length, o = Math.max(1, Math.floor(i / a)), u = new Float32Array(a), f = [];
  for (let p = 0; p < s; p += 1) f.push(t.getChannelData(p));
  for (let p = 0; p < a; p += 1) {
    const y = p * o, m = Math.min(i, y + o);
    let b = 0;
    for (let v = y; v < m; v += 1) {
      let w = 0;
      for (let j = 0; j < s; j += 1) {
        const N = f[j];
        N && (w += Math.abs(N[v] ?? 0));
      }
      const S = w / s;
      S > b && (b = S);
    }
    u[p] = b;
  }
  return u;
}
const dx = "(prefers-reduced-motion: reduce)";
function U$() {
  const [t, a] = g.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(dx).matches);
  return g.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const s = window.matchMedia(dx), i = (o) => a(o.matches);
    return s.addEventListener("change", i), () => s.removeEventListener("change", i);
  }, []), t;
}
var B$ = "mquzal0", V$ = "mquzal1", fx = "mquzal2", hx = "mquzal3", mx = "mquzal4", I$ = "mquzal5", px = "mquzal6", gx = "mquzal7";
const H$ = 120, q$ = 720;
function mw(t) {
  const {
    audioUrl: a,
    durationMs: s,
    startMs: i,
    endMs: o,
    onChangeStart: u,
    onChangeEnd: f,
    isPlaying: p = !1,
    playbackPositionMs: y = 0,
    onSeek: m,
    width: b = q$,
    height: v = H$
  } = t, w = g.useRef(null), S = g.useRef(null), j = g.useRef(null), N = O$(a, b), R = U$();
  g.useEffect(() => {
    F$(w.current, N.peaks, b, v);
  }, [N.peaks, b, v]);
  const C = g.useCallback(
    (_) => {
      const V = S.current?.getBoundingClientRect();
      if (!V || V.width <= 0) return 0;
      const k = Math.max(0, Math.min(1, (_ - V.left) / V.width));
      return Math.round(k * s);
    },
    [s]
  );
  g.useEffect(() => {
    const _ = (k) => {
      if (!j.current) return;
      const F = C(k.clientX);
      j.current === "start" ? u(lc(F, 0, o - 1)) : f(lc(F, i + 1, s));
    }, V = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", _), window.addEventListener("pointerup", V), () => {
      window.removeEventListener("pointermove", _), window.removeEventListener("pointerup", V);
    };
  }, [C, s, o, i, u, f]);
  const O = (_) => (V) => {
    V.preventDefault(), V.stopPropagation(), j.current = _;
  }, M = (_) => {
    !m || _.target.closest("[data-handle]") || m(C(_.clientX));
  }, T = (_) => (V) => {
    const k = V.shiftKey ? 100 : V.ctrlKey ? 1 : 10;
    let F = 0;
    if (V.key === "ArrowLeft") F = -k;
    else if (V.key === "ArrowRight") F = k;
    else return;
    V.preventDefault(), _ === "start" ? u(lc(i + F, 0, o - 1)) : f(lc(o + F, i + 1, s));
  }, q = Pf(i, s), Q = Pf(o, s), re = Pf(y, s);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: S,
      className: B$,
      style: { height: v },
      onPointerDown: M,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: w,
            width: b,
            height: v,
            className: V$,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ c.jsx("div", { className: gx, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ c.jsx("div", { className: gx, role: "alert", children: N.error }),
        /* @__PURE__ */ c.jsx("div", { className: px, style: { left: 0, width: `${q}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: px,
            style: { left: `${Q}%`, right: 0, width: `${100 - Q}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: fx,
            style: { left: `${q}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": i,
            tabIndex: 0,
            onPointerDown: O("start"),
            onKeyDown: T("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: hx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: mx, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: fx,
            style: { left: `${Q}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: O("end"),
            onKeyDown: T("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: hx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: mx, "aria-hidden": "true" })
            ]
          }
        ),
        p && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: I$,
            style: {
              left: `${re}%`,
              transition: R ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function Pf(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function lc(t, a, s) {
  return Math.max(a, Math.min(s, t));
}
function F$(t, a, s, i) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, s, i), !a || a.length === 0)) return;
  const u = i / 2;
  o.fillStyle = Y$(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, s);
  for (let p = 0; p < f; p += 1) {
    const y = a[p] ?? 0, m = Math.max(1, y * (i - 4));
    o.fillRect(p, u - m / 2, 1, m);
  }
}
function Y$(t, a, s) {
  return getComputedStyle(t).getPropertyValue(a).trim() || s;
}
var G$ = "r8lfsm0", P$ = "r8lfsm1", K$ = "r8lfsm2", X$ = "r8lfsm3", Q$ = "r8lfsm4", Z$ = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, J$ = "_1b1zchy3", W$ = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, eU = "_1b1zchy6", tU = "_1b1zchy7";
const pw = g.createContext("standalone");
function gw({
  variant: t = "standalone",
  children: a,
  className: s,
  style: i,
  ...o
}) {
  const u = [Z$[t], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(pw.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: i, ...o, children: a }) });
}
function vw({
  title: t,
  meta: a,
  children: s,
  className: i,
  titleId: o
}) {
  const u = g.useContext(pw), f = [J$, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: W$[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: eU, children: a }) : null,
    s
  ] });
}
function yw({
  children: t,
  className: a,
  role: s = "group"
}) {
  const i = [tU, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, role: s, children: t });
}
const vx = -16, nU = 80, aU = 720;
function rU(t) {
  const { deploymentId: a, runId: s, utterance: i, audioUrl: o, onApplied: u, onError: f, onCancel: p } = t, y = i.durationMs ?? 0, [m, b] = g.useState(() => yx(y)), [v, w] = g.useState(Gc), [S, j] = g.useState(!1), [N, R] = g.useState(!1), [C, O] = g.useState(null), [M, T] = g.useState(!1), q = g.useRef(null), Q = g.useRef(null), re = g.useRef(null);
  g.useEffect(() => {
    const $ = yx(y);
    b($), w(C1($)), R(!1), O(null), re.current = null;
  }, [i.utteranceId, y]);
  const _ = g.useCallback(($) => {
    w($), b((se) => N1(se, $));
  }, []);
  g.useEffect(() => () => Q.current?.abort(), []), g.useEffect(() => {
    q.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [i.utteranceId]);
  const V = g.useCallback(
    ($) => {
      $.key === "Escape" && ($.stopPropagation(), p());
    },
    [p]
  ), k = g.useMemo(
    () => m.ops.find(($) => $.mode === "trim"),
    [m.ops]
  ), F = k?.start_ms ?? 0, W = k?.end_ms ?? Math.max(1, y), ae = g.useCallback(($, se) => {
    b((de) => sU(de, "trim", (D) => ({
      ...D,
      mode: "trim",
      start_ms: Math.max(0, Math.floor($)),
      end_ms: Math.max(Math.floor($) + 1, Math.floor(se))
    })));
  }, []), K = g.useCallback(($) => ae($, W), [W, ae]), le = g.useCallback(($) => ae(F, $), [F, ae]), A = g.useCallback(($) => {
    R($), b((se) => {
      const de = se.ops.filter((D) => D.mode !== "normalize");
      if ($) {
        const D = {
          id: kn(),
          mode: "normalize",
          target_lufs: vx
        };
        return { ...se, ops: [...de, D] };
      }
      return { ...se, ops: de };
    });
  }, []), Y = g.useCallback(async () => {
    const $ = g1(m, y);
    if ($) {
      O($.message);
      return;
    }
    if (O(null), M) return;
    Q.current?.abort();
    const se = new AbortController();
    Q.current = se, T(!0);
    try {
      const de = re.current ?? void 0, D = await yR(
        a,
        s,
        i.utteranceId,
        de ? { chain: m, digest_before: de } : { chain: m },
        { signal: se.signal }
      );
      if (se.signal.aborted) return;
      re.current = D.chain_digest, u(D);
    } catch (de) {
      if (se.signal.aborted) return;
      de instanceof Zs && (re.current = de.currentDigest || null);
      const D = de instanceof Zs ? "Edit chain has changed in another tab. Reload to continue." : de instanceof Error ? de.message : "apply failed";
      O(D), f(D);
    } finally {
      se.signal.aborted || T(!1);
    }
  }, [m, y, M, a, s, i.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(gw, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: q, onKeyDown: V, children: [
    /* @__PURE__ */ c.jsx(vw, { title: "Edit segment", meta: `Source · ${oc(y)}` }),
    /* @__PURE__ */ c.jsx(
      mw,
      {
        audioUrl: o,
        durationMs: Math.max(1, y),
        startMs: F,
        endMs: W,
        onChangeStart: K,
        onChangeEnd: le,
        height: nU,
        width: aU
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: G$, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: P$, children: [
        oc(F),
        " → ",
        oc(W),
        " · ",
        oc(W - F)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: K$, children: [
      /* @__PURE__ */ c.jsxs("label", { className: X$, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: ($) => A($.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Normalize to ",
          vx.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: Q$,
          onClick: () => j(($) => !$),
          "aria-expanded": S,
          children: [
            S ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    S && /* @__PURE__ */ c.jsx(
      Jh,
      {
        state: v,
        onChange: _,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(yw, { children: [
      /* @__PURE__ */ c.jsx(Ge, { size: "sm", onClick: () => void Y(), disabled: M, children: M ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(Ge, { variant: "ghost", size: "sm", onClick: p, disabled: M, children: "Cancel" })
    ] }),
    C && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: C })
  ] }) });
}
function yx(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: kn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function sU(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: kn(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function oc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var iU = "jq2zyb2", lU = "jq2zyb3", oU = "jq2zyb4", cU = "jq2zyb5", uU = "jq2zyb6", dU = "jq2zyb7", fU = "jq2zyb8", hU = "jq2zyb9", mU = "jq2zyba", pU = "jq2zybb", gU = "jq2zybc", vU = "jq2zybd", yU = "jq2zybe", bU = "jq2zybf jq2zybe", xU = "jq2zybg", SU = "jq2zybh", wU = "jq2zybi", jU = "jq2zybj", EU = "jq2zybk", NU = "jq2zybl", CU = "jq2zybm", TU = "jq2zybn", RU = "jq2zybo", _U = "jq2zybp", MU = "jq2zybq", AU = "jq2zybr", DU = "jq2zybs", kU = "jq2zybt", zU = "jq2zybu", OU = "jq2zybv", LU = "jq2zybw", $U = "jq2zybx", UU = "jq2zyby", bx = "jq2zybz", BU = "jq2zyb10", VU = "jq2zyb11", IU = "jq2zyb12";
const HU = ["cancelled", "failed", "partial"], qU = 2600;
function FU() {
  const { run: t } = Tl(), a = ti(), [s, i] = g.useState(t), [o, u] = g.useState(!1), [f, p] = g.useState(null), [y, m] = g.useState(null), [b, v] = g.useState(
    null
  );
  g.useEffect(() => {
    i(t);
  }, [t]), g.useEffect(() => {
    if (!b) return;
    const T = setTimeout(() => v(null), qU);
    return () => clearTimeout(T);
  }, [b]);
  const w = g.useMemo(() => PU(s), [s]), S = HU.includes(s.status) && s.kind === "batch", j = (s.exportZipStaleAt ?? null) !== null, N = async () => {
    if (s.deploymentId) {
      u(!0), p(null);
      try {
        const { runId: T } = await m1(s.deploymentId, s.runId);
        a(`/${s.deploymentId}/runs/${T}`);
      } catch (T) {
        p(QU(T));
      } finally {
        u(!1);
      }
    }
  }, R = g.useCallback((T) => {
    m((q) => q === T ? null : T);
  }, []), C = g.useCallback(() => {
    m(null);
  }, []), O = (T, q) => {
    i((Q) => GU(Q, T, q)), m(null), v({ message: "Segment edited", severity: "success" });
  }, M = g.useCallback((T) => {
    v({ message: T, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: iU, children: [
    /* @__PURE__ */ c.jsxs("div", { className: lU, children: [
      /* @__PURE__ */ c.jsxs("header", { className: oU, children: [
        /* @__PURE__ */ c.jsxs("p", { className: cU, children: [
          s.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Gh, { to: `/${s.deploymentId}/recipe`, className: uU, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: dU, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: fU, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: hU, children: [
            KU(s.kind),
            /* @__PURE__ */ c.jsx("span", { className: mU, children: s.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Jr, { size: "md", tone: ZU(s.status), pulse: s.status === "running", children: s.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: pU, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ c.jsx(cc, { label: "Format", value: s.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ c.jsx(cc, { label: "Speed", value: `${s.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ c.jsx(
          cc,
          {
            label: "Completed",
            value: `${w.completed} / ${w.total}`,
            progress: w.total > 0 ? w.completed / w.total : 0
          }
        ),
        /* @__PURE__ */ c.jsx(
          cc,
          {
            label: "Cache hit",
            value: `${w.cacheRatio}%`,
            progress: w.cacheRatio / 100
          }
        )
      ] }),
      S && /* @__PURE__ */ c.jsxs("section", { className: SU, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: wU, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: jU, children: w.failed > 0 ? `${w.failed} line${w.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: EU, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(Ge, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : w.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: NU, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs(Va, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(ET, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Xr, children: "01 / Utterances" }),
          w.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: CU, children: [
            /* @__PURE__ */ c.jsx("span", { className: TU, children: w.cached }),
            "/",
            w.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: RU, children: s.utterances.map((T) => {
          const q = y === T.utteranceId, Q = T.status === "completed" && T.audioArtifactRef !== null && T.audioArtifactRef !== void 0, re = T.derivedArtifactRef ?? T.audioArtifactRef ?? null, _ = re ? `/api/v1/artifacts/${encodeURIComponent(re)}/download` : "", V = (T.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: MU, children: [
            /* @__PURE__ */ c.jsxs("div", { className: _U, children: [
              /* @__PURE__ */ c.jsxs("span", { className: DU, children: [
                "#",
                T.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: kU, title: T.characterDisplay, children: T.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: zU, title: T.text, children: T.text }),
              /* @__PURE__ */ c.jsxs("span", { className: OU, children: [
                T.cacheHit && /* @__PURE__ */ c.jsx("span", { className: LU, children: "cached" }),
                V && /* @__PURE__ */ c.jsx("span", { className: AU, children: "edited" }),
                T.durationMs ? /* @__PURE__ */ c.jsx("span", { children: XU(T.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Jr, { tone: JU(T.status), children: T.status }),
                Q && /* @__PURE__ */ c.jsx(
                  Ge,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => R(T.utteranceId),
                    "aria-expanded": q,
                    "aria-label": q ? "Close segment editor" : "Edit segment",
                    children: q ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            q && _ && s.deploymentId && /* @__PURE__ */ c.jsx(
              rU,
              {
                deploymentId: s.deploymentId,
                runId: s.runId,
                utterance: T,
                audioUrl: _,
                onApplied: (k) => O(T.utteranceId, k),
                onError: M,
                onCancel: C
              }
            )
          ] }, T.utteranceId);
        }) })
      ] }),
      YU(s, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: IU,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function YU(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const i = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: $U, children: a ? /* @__PURE__ */ c.jsxs("div", { className: BU, children: [
    /* @__PURE__ */ c.jsx("p", { className: VU, children: i }),
    /* @__PURE__ */ c.jsxs(
      Ge,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ c.jsx("span", { className: bx, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: UU,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: bx, children: "↓" })
      ]
    }
  ) : null });
}
function GU(t, a, s) {
  const i = t.utterances.map((o) => o.utteranceId !== a ? o : {
    ...o,
    derivedArtifactRef: s.derived_artifact_ref,
    durationMs: s.derived_duration_ms
  });
  return {
    ...t,
    utterances: i,
    exportZipStaleAt: t.exportZipStaleAt ?? Math.floor(Date.now() / 1e3)
  };
}
function cc({ label: t, value: a, mono: s, progress: i }) {
  const o = i !== void 0 ? Math.min(1, Math.max(0, i)) : void 0;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: gU,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: vU, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: s ? bU : yU, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: xU, "aria-hidden": "true" })
      ]
    }
  );
}
function PU(t) {
  const a = t.utterances.length, s = t.utterances.filter((f) => f.status === "completed").length, i = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = s > 0 ? Math.round(o / s * 100) : 0;
  return { total: a, completed: s, failed: i, cached: o, cacheRatio: u };
}
function KU(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function XU(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function QU(t) {
  return t instanceof ni ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function ZU(t) {
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
function JU(t) {
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
var WU = "pcphqj2", e9 = "pcphqj3", t9 = "pcphqj4", n9 = "pcphqj5", a9 = "pcphqj6", r9 = "pcphqj7", s9 = "pcphqj8", i9 = "pcphqj9", l9 = "pcphqja", xx = "pcphqjb", o9 = "pcphqjc", c9 = "pcphqjd", u9 = "pcphqje pcphqjd", d9 = "pcphqjf", f9 = "pcphqjg", h9 = "pcphqjh", m9 = "pcphqji", p9 = "pcphqjj pcphqji", g9 = "pcphqjk pcphqji", v9 = "pcphqjl pcphqji", y9 = "pcphqjm", Kf = "pcphqjn", Xf = "pcphqjo";
function b9() {
  const [t, a] = g.useState(null), [s, i] = g.useState(null);
  return g.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const p = await Ct("/runtime/queue");
        o || (a(p.entries), i(null));
      } catch (p) {
        o || i(p instanceof Error ? p.message : "Unknown error");
      }
    };
    u();
    const f = setInterval(() => void u(), 3e3);
    return () => {
      o = !0, clearInterval(f);
    };
  }, []), /* @__PURE__ */ c.jsx("main", { className: WU, children: /* @__PURE__ */ c.jsxs("div", { className: e9, children: [
    /* @__PURE__ */ c.jsxs("header", { className: t9, children: [
      /* @__PURE__ */ c.jsx("p", { className: n9, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: a9, children: [
        /* @__PURE__ */ c.jsx("h1", { className: r9, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: s9, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: i9, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    s ? /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: s }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Va, { density: "compact", children: /* @__PURE__ */ c.jsx(Fc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Va, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Xr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: l9, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${xx} ${o9}` : xx,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? u9 : c9, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: d9, children: [
                /* @__PURE__ */ c.jsx("span", { className: f9, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: h9, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: x9(o.kind), children: S9(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: y9, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Kf, children: w9(o.etaSeconds) }),
                /* @__PURE__ */ c.jsx("span", { className: Xf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Kf, children: o.utteranceTotal }),
                /* @__PURE__ */ c.jsx("span", { className: Xf, children: "lines" })
              ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Kf, children: "—" }),
                /* @__PURE__ */ c.jsx("span", { className: Xf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function x9(t) {
  switch (t) {
    case "batch":
      return p9;
    case "test_line":
      return g9;
    case "resume":
      return v9;
    default:
      return m9;
  }
}
function S9(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function w9(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), s = t % 60;
  return s === 0 ? `${a}m` : `${a}m ${s}s`;
}
function j9() {
  const { deploymentId: t, prefillCharacterName: a } = Tl(), s = ti(), [i, o] = g.useState(a), [u, f] = g.useState(""), [p, y] = g.useState("none"), [m, b] = g.useState(!1), [v, w] = g.useState(null), S = g.useRef(null);
  g.useEffect(() => {
    S.current?.scrollIntoView({ behavior: "smooth", block: "center" }), S.current?.focus();
  }, []);
  const j = async (N) => {
    N.preventDefault(), b(!0), w(null);
    try {
      await Ph(t, {
        characterName: i,
        speakerVoiceAssetId: u,
        defaultEmotionMode: p
      }), s(`/${t}/recipe`);
    } catch (R) {
      w(R instanceof Error ? R.message : "failed");
    } finally {
      b(!1);
    }
  };
  return /* @__PURE__ */ c.jsxs("main", { children: [
    /* @__PURE__ */ c.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: j, children: [
      /* @__PURE__ */ c.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ c.jsx(
          "input",
          {
            ref: S,
            value: i,
            onChange: (N) => o(N.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("label", { children: [
        "Speaker voice asset id",
        /* @__PURE__ */ c.jsx(
          "input",
          {
            value: u,
            onChange: (N) => f(N.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ c.jsxs("select", { value: p, onChange: (N) => y(N.currentTarget.value), children: [
          /* @__PURE__ */ c.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ c.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ c.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ c.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx(Ge, { type: "submit", variant: "primary", disabled: m, children: "Save mapping" }),
      v && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: v })
    ] })
  ] });
}
var E9 = "_1oor31e0", N9 = "_1oor31e1", C9 = "_1oor31e2", T9 = "_1oor31e3", R9 = "_1oor31e4", _9 = "_1oor31e5", M9 = "_1oor31e6", A9 = "_1oor31e7", D9 = "_1oor31e8";
const k9 = 8;
function z9(t) {
  const { entries: a, loading: s, error: i } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: E9, "aria-busy": !!s, children: [
    i && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: i }),
    s && !i && /* @__PURE__ */ c.jsx("div", { className: D9, "aria-live": "polite", children: "Loading edit history…" }),
    !s && !i && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: A9, children: "No edits yet" }),
    !s && !i && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: N9, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: C9, children: [
      /* @__PURE__ */ c.jsx("span", { className: T9, children: L9(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: R9, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: _9, title: o.digest_after, children: O9(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: M9, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function O9(t) {
  return t ? `${t.slice(0, k9)}…` : "—";
}
function L9(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var Sx = "_1c63kaw0", $9 = "_1c63kaw1", U9 = "_1c63kaw2", B9 = "_1c63kaw3", V9 = "_1c63kaw4", I9 = "_1c63kaw5", H9 = "_1c63kaw6";
function q9({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: Sx, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: $9, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: Sx, "data-testid": "edit-chain-list", children: t.ops.map((s, i) => /* @__PURE__ */ c.jsxs("li", { className: U9, children: [
    /* @__PURE__ */ c.jsxs("span", { className: B9, "aria-hidden": "true", children: [
      i + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: V9, children: [
      /* @__PURE__ */ c.jsx("span", { className: I9, children: wx(s) }),
      /* @__PURE__ */ c.jsx("span", { className: H9, children: F9(s) })
    ] }),
    /* @__PURE__ */ c.jsx(
      Ge,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(s.id),
        "aria-label": `Remove ${wx(s)} (position ${i + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, s.id)) });
}
function wx(t) {
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
function F9(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${jx(t.start_ms)} → ${jx(t.end_ms)}`;
    case "normalize":
      return `${t.target_lufs.toFixed(1)} LUFS`;
    case "speed":
      return `${t.factor.toFixed(2)}×`;
    case "fade_in":
      return `${t.duration_ms} ms in`;
    case "fade_out":
      return `${t.duration_ms} ms out`;
    case "gain":
      return `${t.gain_db >= 0 ? "+" : ""}${t.gain_db.toFixed(1)} dB`;
    case "eq3":
      return `${Qf(t.low_db)} / ${Qf(t.mid_db)} / ${Qf(t.high_db)}`;
    case "pitch_shift":
      return `${t.semitones >= 0 ? "+" : ""}${t.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${t.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function Qf(t) {
  return `${t >= 0 ? "+" : ""}${t.toFixed(0)}`;
}
function jx(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var uc = "_1o3ytop0", Zf = "_1o3ytop1", Ex = "_1o3ytop2", Y9 = "_1o3ytop3", G9 = "_1o3ytop4", P9 = "_1o3ytop5", K9 = "_1o3ytop6", X9 = "_1o3ytop7", dc = "_1o3ytop8", Q9 = "_1o3ytop9", Z9 = "_1o3ytopf", J9 = "_1o3ytopg", W9 = "_1o3ytoph", eB = "_1o3ytopi", tB = "_1o3ytopj", nB = "_1o3ytopk", aB = "_1t0zy2f0", rB = "_1t0zy2f1", sB = "_1t0zy2f2";
function iB({ content: t, children: a, delayMs: s = 350 }) {
  const [i, o] = g.useState(!1), u = g.useId(), f = g.useRef(null), p = g.useCallback(() => {
    f.current != null && (window.clearTimeout(f.current), f.current = null);
  }, []), y = g.useCallback(() => {
    p(), f.current = window.setTimeout(() => o(!0), s);
  }, [p, s]), m = g.useCallback(() => {
    p(), o(!1);
  }, [p]);
  if (g.useEffect(() => () => p(), [p]), g.useEffect(() => {
    if (!i) return;
    const v = (w) => {
      w.key === "Escape" && o(!1);
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [i]), !g.isValidElement(a))
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: a });
  const b = {
    onMouseEnter: y,
    onMouseLeave: m,
    onFocus: y,
    onBlur: m,
    "aria-describedby": i ? u : void 0
  };
  return /* @__PURE__ */ c.jsxs("span", { className: aB, children: [
    g.cloneElement(a, b),
    i && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: sB, children: t })
  ] });
}
function fc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(iB, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: rB, children: "?" }) });
}
const Nx = -16;
function lB(t) {
  const {
    voiceAsset: a,
    deploymentId: s,
    affectedCharacterNames: i = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, p = g.useMemo(
    () => oB(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [y, m] = g.useState(() => Jf(f)), [b, v] = g.useState(Gc), [w, S] = g.useState(!1), [j, N] = g.useState(null), [R, C] = g.useState(null), [O, M] = g.useState(!1), [T, q] = g.useState(!1), [Q, re] = g.useState(!1), [_, V] = g.useState(null), [k, F] = g.useState([]), [W, ae] = g.useState(null), [K, le] = g.useState([]), [A, Y] = g.useState(!1), [$, se] = g.useState(null), [de, D] = g.useState(0), H = g.useRef(null), Z = g.useRef(null), G = g.useRef(null), B = g.useRef(null), J = g.useRef(null), ce = g.useRef(0), ye = g.useMemo(
    () => y.ops.some((we) => we.mode === "normalize"),
    [y.ops]
  );
  g.useEffect(() => {
    const we = Jf(f);
    m(we), v(C1(we)), N(null), re(!1), F([]), ae(null), J.current = null;
  }, [a.voiceAssetId, f]);
  const Re = g.useCallback((we) => {
    v(we), m((Le) => N1(Le, we));
  }, []);
  g.useEffect(() => {
    B.current?.abort();
    const we = new AbortController();
    return B.current = we, Y(!0), se(null), vc(s, "voice_asset", a.voiceAssetId, 50, {
      signal: we.signal
    }).then((Le) => {
      we.signal.aborted || le(Le.entries);
    }).catch((Le) => {
      if (we.signal.aborted) return;
      const Xe = Le instanceof Error ? Le.message : "audit fetch failed";
      se(Xe);
    }).finally(() => {
      we.signal.aborted || Y(!1);
    }), () => we.abort();
  }, [s, a.voiceAssetId, de]), g.useEffect(() => () => {
    R && URL.revokeObjectURL(R);
  }, [R]), g.useEffect(() => () => {
    Z.current?.abort(), G.current?.abort(), B.current?.abort();
  }, []);
  const Pe = y.ops.find((we) => we.mode === "trim"), Ne = y.ops.find((we) => we.mode === "normalize"), at = Pe?.start_ms ?? 0, Ie = Pe?.end_ms ?? Math.max(1, f), qe = g.useCallback((we, Le) => {
    m(
      (Xe) => Cx(
        Xe,
        "trim",
        (ct) => ({
          ...ct,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(we)),
          end_ms: Math.max(Math.floor(we) + 1, Math.floor(Le))
        })
      )
    );
  }, []), Gt = g.useCallback(
    (we) => qe(we, Ie),
    [Ie, qe]
  ), _t = g.useCallback(
    (we) => qe(at, we),
    [at, qe]
  ), Mt = g.useCallback((we) => {
    m((Le) => {
      const Xe = Le.ops.filter((ct) => ct.mode !== "normalize");
      if (we) {
        const ct = {
          id: kn(),
          mode: "normalize",
          target_lufs: Nx
        };
        return { ...Le, ops: [...Xe, ct] };
      }
      return { ...Le, ops: Xe };
    });
  }, []), mn = g.useCallback(
    (we) => {
      const Le = y.ops.findIndex((At) => At.id === we);
      if (Le === -1) return;
      const Xe = y.ops[Le];
      if (!Xe) return;
      const ct = [...y.ops.slice(0, Le), ...y.ops.slice(Le + 1)];
      m({ ...y, ops: ct }), F((At) => [...At, { op: Xe, index: Le }]);
    },
    [y]
  ), gt = g.useCallback(() => {
    const we = k[k.length - 1];
    if (!we) return;
    const Le = Math.min(we.index, y.ops.length), Xe = [...y.ops.slice(0, Le), we.op, ...y.ops.slice(Le)];
    m({ ...y, ops: Xe }), F(k.slice(0, -1));
  }, [y, k]), Pt = g.useCallback(() => {
    const we = g1(y, f);
    return we ? (N(we.message), !1) : (N(null), !0);
  }, [y, f]), jn = g.useCallback(async () => {
    if (!Pt() || O) return;
    Z.current?.abort();
    const we = new AbortController();
    Z.current = we;
    const Le = ++ce.current;
    q(!0);
    try {
      const Xe = await xR(a.voiceAssetId, s, y, {
        signal: we.signal
      });
      if (we.signal.aborted || Le !== ce.current) return;
      R && URL.revokeObjectURL(R);
      const ct = URL.createObjectURL(Xe);
      C(ct), re(!0), requestAnimationFrame(() => H.current?.play().catch(() => {
      }));
    } catch (Xe) {
      if (we.signal.aborted) return;
      const ct = Xe instanceof Error ? Xe.message : "preview failed";
      N(ct), u(ct);
    } finally {
      we.signal.aborted || q(!1);
    }
  }, [Pt, O, a.voiceAssetId, s, y, R, u]), ot = g.useCallback(async () => {
    if (!Pt() || T || O) return;
    if (i.length > 1) {
      const Le = i.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${i.length} characters: ${Le}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    Z.current?.abort(), G.current?.abort();
    const we = new AbortController();
    G.current = we, M(!0);
    try {
      const Le = J.current ?? void 0, Xe = await p1(
        a.voiceAssetId,
        s,
        Le ? { chain: y, digest_before: Le } : { chain: y },
        { signal: we.signal }
      );
      if (we.signal.aborted) return;
      J.current = Xe.chain_digest, ae(Xe.chain_digest), N(null), V(Xe.measured_lufs ?? null), F([]), o(Xe), D((ct) => ct + 1);
    } catch (Le) {
      if (we.signal.aborted) return;
      const Xe = Le instanceof Zs;
      Le instanceof Zs && (J.current = Le.currentDigest || null);
      const ct = Xe ? "Edit chain has changed in another tab. Reload to continue." : Le instanceof Error ? Le.message : "apply failed";
      N(ct), u(ct);
    } finally {
      we.signal.aborted || M(!1);
    }
  }, [
    Pt,
    T,
    O,
    i,
    a.voiceAssetId,
    s,
    y,
    o,
    u
  ]), sn = g.useCallback(() => {
    Z.current?.abort(), m(Jf(f)), N(null), V(null), re(!1), F([]), D((we) => we + 1), R && (URL.revokeObjectURL(R), C(null));
  }, [f, R]), bt = g.useCallback((we) => {
    m(
      (Le) => Cx(
        Le,
        "normalize",
        (Xe) => ({
          ...Xe,
          mode: "normalize",
          target_lufs: we
        })
      )
    );
  }, []);
  return /* @__PURE__ */ c.jsxs(gw, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      vw,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${hc(f)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      mw,
      {
        audioUrl: p,
        durationMs: Math.max(1, f),
        startMs: at,
        endMs: Ie,
        onChangeStart: Gt,
        onChangeEnd: _t
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: uc, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Zf, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ c.jsx(
          fc,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Ex, children: [
        hc(at),
        " → ",
        hc(Ie),
        " · ",
        hc(Ie - at)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: X9, children: [
      /* @__PURE__ */ c.jsxs("div", { className: dc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: uc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Zf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ c.jsx(
              fc,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          ye && Ne && /* @__PURE__ */ c.jsxs("span", { className: Z9, children: [
            "target ",
            Ne.target_lufs.toFixed(1),
            " LUFS",
            _ !== null && ` · measured ${_.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: Q9, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: ye,
              onChange: (we) => Mt(we.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            Nx.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        ye && Ne && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: W9,
            min: -30,
            max: -6,
            step: 0.5,
            value: Ne.target_lufs,
            onChange: (we) => bt(Number(we.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: dc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: uc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Zf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ c.jsx(
              fc,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: Ex, children: y.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(q9, { chain: y, onRemoveOp: mn })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: dc, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: Y9,
            onClick: () => S((we) => !we),
            "aria-expanded": w,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: G9, "aria-hidden": "true", children: w ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: P9, children: "gain · EQ · pitch · fade · silence trim" }),
              /* @__PURE__ */ c.jsx(
                fc,
                {
                  label: "advanced effects",
                  content: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    "Fine-tune the voice without re-recording.",
                    /* @__PURE__ */ c.jsx("br", {}),
                    /* @__PURE__ */ c.jsx("strong", { children: "Gain" }),
                    ": makes the whole clip louder/quieter.",
                    /* @__PURE__ */ c.jsx("br", {}),
                    /* @__PURE__ */ c.jsx("strong", { children: "EQ" }),
                    ": boosts low (bass), mid (vowels), or high (consonants) bands.",
                    /* @__PURE__ */ c.jsx("br", {}),
                    /* @__PURE__ */ c.jsx("strong", { children: "Pitch" }),
                    ": shifts the perceived voice up/down in semitones.",
                    /* @__PURE__ */ c.jsx("br", {}),
                    /* @__PURE__ */ c.jsx("strong", { children: "Fade" }),
                    ": smooth volume ramp at the start/end (no clicks).",
                    /* @__PURE__ */ c.jsx("br", {}),
                    /* @__PURE__ */ c.jsx("strong", { children: "Silence trim" }),
                    ": removes quiet gaps below a dB threshold."
                  ] })
                }
              )
            ]
          }
        ),
        w && /* @__PURE__ */ c.jsx(
          Jh,
          {
            state: b,
            onChange: Re,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      W && /* @__PURE__ */ c.jsx("div", { className: dc, children: /* @__PURE__ */ c.jsxs("span", { className: uc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: K9, title: W, children: [
          W.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(yw, { children: [
      /* @__PURE__ */ c.jsx(
        Ge,
        {
          variant: "secondary",
          onClick: () => void jn(),
          disabled: T || O,
          children: T ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ge,
        {
          onClick: () => void ot(),
          disabled: O || T,
          children: O ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ge,
        {
          variant: "ghost",
          onClick: sn,
          disabled: O || T,
          children: "Reset"
        }
      ),
      k.length > 0 && /* @__PURE__ */ c.jsxs(
        Ge,
        {
          variant: "ghost",
          size: "sm",
          onClick: gt,
          disabled: O || T,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            k.length,
            ")"
          ]
        }
      ),
      Q && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: nB,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    R && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: H,
        src: R,
        controls: !0,
        className: J9,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: eB, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: tB, children: [
        "Edit history",
        K.length > 0 ? ` · ${K.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        z9,
        {
          entries: K,
          loading: A,
          error: $
        }
      )
    ] })
  ] });
}
function Jf(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: kn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Cx(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: kn(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function hc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function oB(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var cB = "go9vi12", uB = "go9vi13", dB = "go9vi14", fB = "go9vi15", hB = "go9vi16", mB = "go9vi17", pB = "go9vi18", gB = "go9vi19", vB = "go9vi1a", yB = "go9vi1b go9vi1a", bB = "go9vi1c", xB = "go9vi1d", SB = "go9vi1e", wB = "go9vi1f", jB = "go9vi1g", EB = "go9vi1h", NB = "go9vi1i", CB = "go9vi1j", Tx = "go9vi1k", TB = "go9vi1l", RB = "go9vi1m", _B = "go9vi1n", Uc = "go9vi1o", MB = "go9vi1q", AB = "go9vi1r go9vi1q", DB = "go9vi1s go9vi1q", kB = "go9vi1t", zB = "go9vi1u", OB = "go9vi1v", LB = "go9vi1w", bw = "go9vi1x", $B = "go9vi1y", UB = "go9vi1z", BB = "go9vi110 go9vi1o", VB = "go9vi111", IB = "go9vi112", HB = "go9vi113", qB = "go9vi114", FB = "go9vi115", YB = "go9vi116";
function GB() {
  const { deployment: t, mappings: a, voiceAssets: s } = Tl(), i = ti(), [o, u] = g.useState(a), [f, p] = g.useState(s), [y, m] = g.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = g.useState(""), [w, S] = g.useState(null), [j, N] = g.useState(null), [R, C] = g.useState(null), [O, M] = g.useState(null), [T, q] = g.useState(0), Q = g.useCallback(() => {
    i(`/${t.deploymentId}/recipe`);
  }, [i, t.deploymentId]), re = g.useCallback((G) => {
    M(G), window.setTimeout(() => {
      M((B) => B === G ? null : B);
    }, 1600);
  }, []), _ = g.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const B of f) G.set(B.voiceAssetId, B);
    return G;
  }, [f]), V = g.useMemo(() => {
    const G = b.trim().toLowerCase();
    return G ? o.filter((B) => B.characterName.toLowerCase().includes(G)) : o;
  }, [o, b]), k = g.useMemo(
    () => o.find((G) => G.mappingId === y) ?? null,
    [o, y]
  );
  g.useEffect(() => {
    u(a), p(s), m(a[0]?.mappingId ?? null);
  }, [a, s]), g.useEffect(() => {
    if (!j) return;
    const G = setTimeout(() => N(null), 2600);
    return () => clearTimeout(G);
  }, [j]);
  const F = g.useCallback(async () => {
    const G = await Qs(t.deploymentId);
    p(G.voiceAssets);
  }, [t.deploymentId]), W = g.useCallback(
    (G) => {
      u(
        (B) => B.map((J) => J.mappingId === y ? { ...J, ...G } : J)
      );
    },
    [y]
  ), ae = g.useCallback(
    async (G) => {
      if (!k) return;
      const B = k;
      try {
        const J = await Ys(t.deploymentId, k.mappingId, G);
        u((ce) => ce.map((ye) => ye.mappingId === J.mappingId ? J : ye)), Object.prototype.hasOwnProperty.call(G, "characterName") && re(J.mappingId);
      } catch (J) {
        u(
          (ce) => ce.map((ye) => ye.mappingId === B.mappingId ? B : ye)
        ), S(gr(J));
      }
    },
    [k, t.deploymentId, re]
  ), K = g.useCallback(async () => {
    const G = f[0];
    if (!G) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const B = WB(o), J = await Ph(t.deploymentId, {
        characterName: B,
        speakerVoiceAssetId: G.voiceAssetId
      });
      u((ce) => [...ce, J]), m(J.mappingId), q((ce) => ce + 1);
    } catch (B) {
      S(gr(B));
    }
  }, [t.deploymentId, f, o]), le = g.useCallback(() => {
    k && C({ id: k.mappingId, name: k.characterName });
  }, [k]), A = g.useCallback(async () => {
    if (!R) return;
    const { id: G, name: B } = R;
    C(null);
    try {
      await h1(t.deploymentId, G), u((J) => J.filter((ce) => ce.mappingId !== G)), m(null), N(`Mapping for ${B} deactivated.`);
    } catch (J) {
      S(gr(J));
    }
  }, [t.deploymentId, R]), Y = g.useCallback(
    async (G, B, J) => {
      try {
        const ce = await Nc(t.deploymentId, G, B, J);
        return p((ye) => [ce, ...ye]), N(`${ce.displayName} uploaded.`), ce;
      } catch (ce) {
        return S(gr(ce)), null;
      }
    },
    [t.deploymentId]
  ), $ = g.useCallback(async () => {
    try {
      const G = await iT(t.deploymentId);
      r7(G, `${t.deploymentId}-mappings.json`), N("Mappings exported to JSON.");
    } catch (G) {
      S(gr(G));
    }
  }, [t.deploymentId]), se = g.useCallback(
    async (G, B) => {
      try {
        const J = await lT(
          t.deploymentId,
          G.mappings,
          B
        );
        N(
          `Imported ${J.created.length} • skipped ${J.skipped.length} • replaced ${J.replaced.length}.`
        );
        const ce = await Qs(t.deploymentId);
        p(ce.voiceAssets);
      } catch (J) {
        S(gr(J));
      }
    },
    [t.deploymentId]
  ), de = g.useCallback(
    async (G) => {
      if (await F(), k && G.chain_digest)
        try {
          const B = await Ys(t.deploymentId, k.mappingId, {
            voiceAssetChainDigest: G.chain_digest
          });
          u(
            (J) => J.map((ce) => ce.mappingId === B.mappingId ? B : ce)
          );
        } catch (B) {
          S(gr(B));
        }
      N("Edit applied.");
    },
    [F, k, t.deploymentId]
  ), D = g.useCallback((G) => {
    S(G);
  }, []), H = g.useCallback(
    async (G, B) => {
      if (!k) return null;
      const J = G.trim() || `[${k.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await dT(t.deploymentId, {
          line: J,
          outputFormat: B
        })).runId };
      } catch (ce) {
        return S(gr(ce)), null;
      }
    },
    [t.deploymentId, k]
  ), Z = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: cB, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: uB, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: dB,
          onClick: Q,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: fB, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: hB, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: mB, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            Z
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(Ge, { variant: "primary", size: "sm", onClick: K, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: pB,
          placeholder: "Search characters",
          value: b,
          onChange: (G) => v(G.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(JB, { onExport: $, onImport: se, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: gB, children: V.length === 0 ? /* @__PURE__ */ c.jsx(
        Fc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : V.map((G) => {
        const B = _.get(G.speakerVoiceAssetId), J = G.mappingId === y;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: J ? yB : vB,
            onClick: () => m(G.mappingId),
            "aria-pressed": J,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: bB, "aria-hidden": "true", children: e7(G.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: xB, children: [
                /* @__PURE__ */ c.jsx("span", { className: SB, children: G.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: wB, children: B?.displayName ?? "no voice" })
              ] })
            ]
          },
          G.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: jB, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(bm, { features: jm, children: /* @__PURE__ */ c.jsx(FS, { children: j && /* @__PURE__ */ c.jsx(
        wm.div,
        {
          className: $B,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: j
        },
        j
      ) }) }),
      w && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: w }),
      R && /* @__PURE__ */ c.jsxs(Dn, { severity: "warning", children: [
        /* @__PURE__ */ c.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          R.name,
          "?"
        ] }),
        /* @__PURE__ */ c.jsx(Ge, { variant: "danger", size: "sm", onClick: () => void A(), children: "Delete" }),
        /* @__PURE__ */ c.jsx(Ge, { variant: "ghost", size: "sm", onClick: () => C(null), children: "Cancel" })
      ] }),
      k ? /* @__PURE__ */ c.jsx(
        KB,
        {
          deploymentId: t.deploymentId,
          mapping: k,
          voiceAssets: f,
          allMappings: o,
          onNameChange: (G) => {
            W({ characterName: G });
          },
          onNameSave: (G) => {
            const B = G.trim();
            B && ae({ characterName: B });
          },
          savedHint: O === k.mappingId,
          autoFocusNonce: T,
          onSpeakerChange: (G) => {
            W({ speakerVoiceAssetId: G }), ae({ speakerVoiceAssetId: G });
          },
          onDelete: le,
          onUploadVoice: async (G, B, J) => {
            const ce = await Y(G, B, J);
            return ce && J === "speaker" && (W({ speakerVoiceAssetId: ce.voiceAssetId }), ae({ speakerVoiceAssetId: ce.voiceAssetId })), await F(), ce;
          },
          onTestLine: H,
          onEditChainPersisted: de,
          onEditError: D
        },
        k.mappingId
      ) : /* @__PURE__ */ c.jsx(
        PB,
        {
          voiceCount: f.length,
          onUploadVoice: async (G) => {
            await Y(G, G.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function PB({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Va, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: HB, children: [
      /* @__PURE__ */ c.jsx("p", { className: Xr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: qB, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: FB, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      xw,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (s) => (await a(s), null)
      }
    )
  ] }) : /* @__PURE__ */ c.jsx(Va, { density: "airy", children: /* @__PURE__ */ c.jsx(
    Fc,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function KB(t) {
  const { mapping: a, voiceAssets: s, allMappings: i } = t, o = s.find((C) => C.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = g.useMemo(
    () => i.filter(
      (C) => C.isActive && C.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((C) => C.characterName),
    [i, a.speakerVoiceAssetId]
  ), [f, p] = g.useState(""), [y, m] = g.useState("mp3"), [b, v] = g.useState("idle"), [w, S] = g.useState(null), j = g.useRef(!1), N = g.useRef(null);
  g.useEffect(() => (j.current = !1, () => {
    j.current = !0;
  }), []), g.useEffect(() => {
    if (t.autoFocusNonce === 0) return;
    const C = N.current;
    C && (C.focus(), C.select());
  }, [t.autoFocusNonce]);
  const R = g.useCallback(async () => {
    j.current = !1, v("running"), S(null);
    const C = await t.onTestLine(f, y);
    if (j.current) return;
    if (!C) {
      v("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: O } = C;
    for (let M = 0; M < 60; M += 1) {
      if (await new Promise((T) => setTimeout(T, 500)), j.current) return;
      try {
        const T = await Kh(t.deploymentId, O);
        if (j.current) return;
        if (T.status === "completed") {
          v("done");
          return;
        }
        if (T.status === "failed" || T.status === "cancelled") {
          v("error"), S(`Run ${T.status}.`);
          return;
        }
      } catch (T) {
        if (j.current) return;
        v("error"), S(T instanceof Error ? T.message : "unknown error");
        return;
      }
    }
    j.current || (v("error"), S("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, f, y]);
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: EB, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Xr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: NB, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: bw, children: /* @__PURE__ */ c.jsx(Ge, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Va,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: UB,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: BB,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: f,
              onChange: (C) => p(C.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: b === "running"
            }
          ),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Uc,
              value: y,
              onChange: (C) => m(C.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: b === "running",
              children: [
                /* @__PURE__ */ c.jsx("option", { value: "mp3", children: "mp3" }),
                /* @__PURE__ */ c.jsx("option", { value: "wav", children: "wav" }),
                /* @__PURE__ */ c.jsx("option", { value: "flac", children: "flac" })
              ]
            }
          ),
          /* @__PURE__ */ c.jsx(
            Ge,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void R(),
              disabled: b === "running",
              children: b === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          b === "done" && /* @__PURE__ */ c.jsx(Jr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          b === "error" && w && /* @__PURE__ */ c.jsx(Jr, { tone: "danger", children: w })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: CB, children: [
      /* @__PURE__ */ c.jsxs(Va, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Xr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: _B, children: [
          /* @__PURE__ */ c.jsxs("span", { className: TB, children: [
            /* @__PURE__ */ c.jsx("span", { className: Tx, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: RB,
                role: "status",
                "aria-live": "polite",
                children: "✓ Saved"
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: N,
              className: Uc,
              value: a.characterName,
              onChange: (C) => t.onNameChange(C.currentTarget.value),
              onBlur: (C) => t.onNameSave(C.currentTarget.value),
              onKeyDown: (C) => {
                C.key === "Enter" && (C.preventDefault(), C.currentTarget.blur());
              },
              placeholder: "Type a name and press Enter"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(Va, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "voice-heading", className: Xr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ c.jsx("span", { className: Tx, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          XB,
          {
            value: a.speakerVoiceAssetId,
            voices: s,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(QB, { voice: o }),
        /* @__PURE__ */ c.jsx(
          xw,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (C) => t.onUploadVoice(C, C.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          lB,
          {
            voiceAsset: o,
            deploymentId: t.deploymentId,
            affectedCharacterNames: u,
            onChainPersisted: t.onEditChainPersisted,
            onError: t.onEditError
          }
        )
      ] })
    ] })
  ] });
}
function XB({
  value: t,
  voices: a,
  onChange: s
}) {
  return /* @__PURE__ */ c.jsxs(
    "select",
    {
      className: Uc,
      value: t,
      onChange: (i) => s(i.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ c.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((i) => /* @__PURE__ */ c.jsx("option", { value: i.voiceAssetId, children: i.displayName }, i.voiceAssetId))
      ]
    }
  );
}
function QB({ voice: t }) {
  const a = t7(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: kB, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: n7(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: zB, children: [
      /* @__PURE__ */ c.jsx("div", { className: OB, children: /* @__PURE__ */ c.jsx(bm, { features: jm, children: /* @__PURE__ */ c.jsx(
        wm.div,
        {
          className: LB,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Jr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(ZB, { seed: t.contentSha256 })
  ] });
}
function ZB({ seed: t }) {
  const a = g.useMemo(() => a7(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: VB, "aria-hidden": "true", children: a.map((s, i) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: IB,
      style: { height: `${Math.max(6, s * 100)}%` }
    },
    `${t}-${i}`
  )) });
}
function xw({
  label: t,
  onFile: a
}) {
  const [s, i] = g.useState(!1), [o, u] = g.useState(!1), f = g.useRef(null), p = g.useCallback(
    async (y) => {
      u(!0);
      try {
        await a(y);
      } finally {
        u(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: o ? DB : s ? AB : MB,
      onDragOver: (y) => {
        y.preventDefault(), i(!0);
      },
      onDragLeave: () => i(!1),
      onDrop: (y) => {
        y.preventDefault(), i(!1);
        const m = y.dataTransfer.files?.[0];
        m && p(m);
      },
      onClick: () => f.current?.click(),
      role: "button",
      tabIndex: 0,
      onKeyDown: (y) => {
        (y.key === "Enter" || y.key === " ") && (y.preventDefault(), f.current?.click());
      },
      "aria-busy": o,
      children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            ref: f,
            type: "file",
            accept: "audio/*",
            onChange: (y) => {
              const m = y.currentTarget.files?.[0];
              m && p(m), y.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : t
      ]
    }
  );
}
function JB({
  onExport: t,
  onImport: a,
  onParseError: s
}) {
  const [i, o] = g.useState("error"), u = g.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: bw, children: [
    /* @__PURE__ */ c.jsx(Ge, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: YB,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (f) => {
          const p = f.currentTarget.files?.[0];
          if (f.currentTarget.value = "", !!p)
            try {
              const y = await p.text(), m = JSON.parse(y);
              a(m, i);
            } catch {
              s("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ c.jsx(Ge, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ c.jsxs(
      "select",
      {
        className: Uc,
        value: i,
        onChange: (f) => o(f.currentTarget.value),
        "aria-label": "Import conflict strategy",
        children: [
          /* @__PURE__ */ c.jsx("option", { value: "error", children: "Error on conflict" }),
          /* @__PURE__ */ c.jsx("option", { value: "skip", children: "Skip existing" }),
          /* @__PURE__ */ c.jsx("option", { value: "replace", children: "Replace existing" })
        ]
      }
    )
  ] });
}
function WB(t) {
  const a = new Set(t.map((i) => i.characterName.toLowerCase()));
  let s = 1;
  for (; a.has(`character ${s}`); ) s += 1;
  return `Character ${s}`;
}
function e7(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function t7(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function n7(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function a7(t, a) {
  const s = [];
  for (let i = 0; i < a; i += 1) {
    const o = t.charCodeAt(i % t.length);
    s.push((o * 31 + i * 7) % 100 / 100);
  }
  return s;
}
function r7(t, a) {
  const s = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), i = URL.createObjectURL(s), o = document.createElement("a");
  o.href = i, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i);
}
function gr(t) {
  return t instanceof ni || t instanceof Error ? t.message : "unknown error";
}
function s7() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await rT();
        return { deployments: t };
      },
      Component: HT
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId");
        return fN(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), [s, { mappings: i }, { runs: o }, u] = await Promise.all([
          Yy(a),
          Gy(a),
          oT(a, { limit: 10 }),
          pT(a)
        ]);
        return { deployment: s, mappings: i, runs: o, workflow: u };
      },
      Component: z$
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), s = Vs(t, "runId");
        return { run: await Kh(a, s) };
      },
      Component: FU
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), [s, { mappings: i }, { voiceAssets: o }] = await Promise.all([
          Yy(a),
          Gy(a),
          Qs(a)
        ]);
        return { deployment: s, mappings: i, voiceAssets: o };
      },
      Component: GB
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const s = Vs(t, "deploymentId"), i = new URL(a.url);
        return {
          deploymentId: s,
          prefillCharacterName: i.searchParams.get("character") ?? ""
        };
      },
      Component: j9
    },
    {
      path: "/runtime/queue",
      Component: b9
    }
  ];
}
function Vs(t, a) {
  const s = t[a];
  if (!s)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return s;
}
const Rx = "ext-actions-request", i7 = "ext-actions-declare", l7 = "ext-action-state", _x = "ext-action-invoke", Mh = "emotion-tts:navigate", qs = "emotion-tts.run", Mx = "emotion-tts.mappings", o7 = 4e3;
function c7(t, a) {
  let s = null, i = !1;
  const o = () => {
    const j = s?.badge ?? "not_installed";
    return u7(j, i);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: Mx,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(i7, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, p = () => {
    t.dispatchEvent(
      new CustomEvent(l7, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, y = () => f(), m = (j) => {
    const N = j.detail?.id;
    N === qs ? b() : N === Mx && t.dispatchEvent(
      new CustomEvent(Mh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = s?.badge ?? "not_installed", N = j === "ready" || j === "running" || j === "starting";
    i = !0, p();
    try {
      N ? await I2() : await V2();
      try {
        s = await vl();
      } catch {
      }
    } catch {
    } finally {
      i = !1, p();
    }
  };
  t.addEventListener(Rx, y), t.addEventListener(_x, m);
  let v = !1;
  const w = async () => {
    try {
      const j = await vl();
      if (v) return;
      s = j, p();
    } catch {
    }
  };
  w();
  const S = window.setInterval(() => void w(), o7);
  return f(), {
    dispose: () => {
      v = !0, window.clearInterval(S), t.removeEventListener(Rx, y), t.removeEventListener(_x, m);
    }
  };
}
function u7(t, a) {
  const s = t === "ready" || t === "running" || t === "starting", i = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: qs,
    label: s ? "Stopping…" : "Starting…",
    icon: s ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: qs,
    label: S1(t),
    icon: "hourglass_top",
    tone: "primary",
    state: "loading"
  } : s ? {
    id: qs,
    label: "Stop runtime",
    icon: "stop",
    tone: "primary",
    state: "idle",
    tooltip: "Stop the EmotionTTS worker"
  } : i ? {
    id: qs,
    label: t === "not_installed" ? "Install / Start runtime" : "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle",
    tooltip: "Start the EmotionTTS worker for this deployment"
  } : {
    id: qs,
    label: "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle"
  };
}
const Ah = "emotion-tts-app", d7 = "ext-event", Ax = "emotion-tts-stylesheet", Dx = ["accent", "density", "card"];
function f7(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function h7() {
  if (typeof document > "u" || document.getElementById(Ax)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Ax, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
h7();
class m7 extends HTMLElement {
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
    this.root = $E.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Mh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = c7(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (s) => {
      const i = s.detail?.path;
      i && this.router && this.router.navigate(i);
    };
    this.navigateListener = a, this.addEventListener(Mh, a);
  }
  syncTweaksFromBody() {
    for (const a of Dx) {
      const s = f7(a);
      s === void 0 ? delete this.dataset[a] : this.dataset[a] !== s && (this.dataset[a] = s);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Dx.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), s = bC(s7(), { initialEntries: [a] });
    this.router = s, this.root.render(
      /* @__PURE__ */ c.jsx(g.StrictMode, { children: /* @__PURE__ */ c.jsx(SC, { router: s }) })
    );
  }
  resolveInitialEntry() {
    const a = this.getAttribute("route");
    if (a && a.length > 0) return a;
    const s = this.getAttribute("deployment-id");
    return s && s.length > 0 ? `/${s}/recipe` : "/";
  }
  emitHostEvent(a, s) {
    this.dispatchEvent(
      new CustomEvent(d7, {
        detail: { topic: a, payload: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function p7() {
  typeof customElements > "u" || customElements.get(Ah) || customElements.define(Ah, m7);
}
typeof customElements < "u" && !customElements.get(Ah) && p7();
export {
  p7 as register
};
//# sourceMappingURL=emotion-tts.js.map
