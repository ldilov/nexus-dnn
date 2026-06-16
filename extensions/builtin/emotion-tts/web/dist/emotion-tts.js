function kE(t, a) {
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
function $x(t) {
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
var oy;
function DE() {
  if (oy) return Xi;
  oy = 1;
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
var cy;
function zE() {
  return cy || (cy = 1, sf.exports = DE()), sf.exports;
}
var c = zE(), lf = { exports: {} }, He = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uy;
function OE() {
  if (uy) return He;
  uy = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), w = Symbol.iterator;
  function S(k) {
    return k === null || typeof k != "object" ? null : (k = w && k[w] || k["@@iterator"], typeof k == "function" ? k : null);
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
  function C(k, H, Z) {
    this.props = k, this.context = H, this.refs = R, this.updater = Z || j;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(k, H) {
    if (typeof k != "object" && typeof k != "function" && k != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, k, H, "setState");
  }, C.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function O() {
  }
  O.prototype = C.prototype;
  function _(k, H, Z) {
    this.props = k, this.context = H, this.refs = R, this.updater = Z || j;
  }
  var T = _.prototype = new O();
  T.constructor = _, N(T, C.prototype), T.isPureReactComponent = !0;
  var q = Array.isArray;
  function Q() {
  }
  var re = { H: null, A: null, T: null, S: null }, M = Object.prototype.hasOwnProperty;
  function V(k, H, Z) {
    var P = Z.ref;
    return {
      $$typeof: t,
      type: k,
      key: H,
      ref: P !== void 0 ? P : null,
      props: Z
    };
  }
  function D(k, H) {
    return V(k.type, H, k.props);
  }
  function F(k) {
    return typeof k == "object" && k !== null && k.$$typeof === t;
  }
  function W(k) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(Z) {
      return H[Z];
    });
  }
  var ae = /\/+/g;
  function K(k, H) {
    return typeof k == "object" && k !== null && k.key != null ? W("" + k.key) : H.toString(36);
  }
  function le(k) {
    switch (k.status) {
      case "fulfilled":
        return k.value;
      case "rejected":
        throw k.reason;
      default:
        switch (typeof k.status == "string" ? k.then(Q, Q) : (k.status = "pending", k.then(
          function(H) {
            k.status === "pending" && (k.status = "fulfilled", k.value = H);
          },
          function(H) {
            k.status === "pending" && (k.status = "rejected", k.reason = H);
          }
        )), k.status) {
          case "fulfilled":
            return k.value;
          case "rejected":
            throw k.reason;
        }
    }
    throw k;
  }
  function A(k, H, Z, P, B) {
    var J = typeof k;
    (J === "undefined" || J === "boolean") && (k = null);
    var ce = !1;
    if (k === null) ce = !0;
    else
      switch (J) {
        case "bigint":
        case "string":
        case "number":
          ce = !0;
          break;
        case "object":
          switch (k.$$typeof) {
            case t:
            case a:
              ce = !0;
              break;
            case b:
              return ce = k._init, A(
                ce(k._payload),
                H,
                Z,
                P,
                B
              );
          }
      }
    if (ce)
      return B = B(k), ce = P === "" ? "." + K(k, 0) : P, q(B) ? (Z = "", ce != null && (Z = ce.replace(ae, "$&/") + "/"), A(B, H, Z, "", function(Ge) {
        return Ge;
      })) : B != null && (F(B) && (B = D(
        B,
        Z + (B.key == null || k && k.key === B.key ? "" : ("" + B.key).replace(
          ae,
          "$&/"
        ) + "/") + ce
      )), H.push(B)), 1;
    ce = 0;
    var ye = P === "" ? "." : P + ":";
    if (q(k))
      for (var Re = 0; Re < k.length; Re++)
        P = k[Re], J = ye + K(P, Re), ce += A(
          P,
          H,
          Z,
          J,
          B
        );
    else if (Re = S(k), typeof Re == "function")
      for (k = Re.call(k), Re = 0; !(P = k.next()).done; )
        P = P.value, J = ye + K(P, Re++), ce += A(
          P,
          H,
          Z,
          J,
          B
        );
    else if (J === "object") {
      if (typeof k.then == "function")
        return A(
          le(k),
          H,
          Z,
          P,
          B
        );
      throw H = String(k), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ce;
  }
  function G(k, H, Z) {
    if (k == null) return k;
    var P = [], B = 0;
    return A(k, P, "", "", function(J) {
      return H.call(Z, J, B++);
    }), P;
  }
  function $(k) {
    if (k._status === -1) {
      var H = k._result;
      H = H(), H.then(
        function(Z) {
          (k._status === 0 || k._status === -1) && (k._status = 1, k._result = Z);
        },
        function(Z) {
          (k._status === 0 || k._status === -1) && (k._status = 2, k._result = Z);
        }
      ), k._status === -1 && (k._status = 0, k._result = H);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var se = typeof reportError == "function" ? reportError : function(k) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof k == "object" && k !== null && typeof k.message == "string" ? String(k.message) : String(k),
        error: k
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", k);
      return;
    }
    console.error(k);
  }, de = {
    map: G,
    forEach: function(k, H, Z) {
      G(
        k,
        function() {
          H.apply(this, arguments);
        },
        Z
      );
    },
    count: function(k) {
      var H = 0;
      return G(k, function() {
        H++;
      }), H;
    },
    toArray: function(k) {
      return G(k, function(H) {
        return H;
      }) || [];
    },
    only: function(k) {
      if (!F(k))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return k;
    }
  };
  return He.Activity = v, He.Children = de, He.Component = C, He.Fragment = s, He.Profiler = o, He.PureComponent = _, He.StrictMode = i, He.Suspense = y, He.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = re, He.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(k) {
      return re.H.useMemoCache(k);
    }
  }, He.cache = function(k) {
    return function() {
      return k.apply(null, arguments);
    };
  }, He.cacheSignal = function() {
    return null;
  }, He.cloneElement = function(k, H, Z) {
    if (k == null)
      throw Error(
        "The argument must be a React element, but you passed " + k + "."
      );
    var P = N({}, k.props), B = k.key;
    if (H != null)
      for (J in H.key !== void 0 && (B = "" + H.key), H)
        !M.call(H, J) || J === "key" || J === "__self" || J === "__source" || J === "ref" && H.ref === void 0 || (P[J] = H[J]);
    var J = arguments.length - 2;
    if (J === 1) P.children = Z;
    else if (1 < J) {
      for (var ce = Array(J), ye = 0; ye < J; ye++)
        ce[ye] = arguments[ye + 2];
      P.children = ce;
    }
    return V(k.type, B, P);
  }, He.createContext = function(k) {
    return k = {
      $$typeof: f,
      _currentValue: k,
      _currentValue2: k,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, k.Provider = k, k.Consumer = {
      $$typeof: u,
      _context: k
    }, k;
  }, He.createElement = function(k, H, Z) {
    var P, B = {}, J = null;
    if (H != null)
      for (P in H.key !== void 0 && (J = "" + H.key), H)
        M.call(H, P) && P !== "key" && P !== "__self" && P !== "__source" && (B[P] = H[P]);
    var ce = arguments.length - 2;
    if (ce === 1) B.children = Z;
    else if (1 < ce) {
      for (var ye = Array(ce), Re = 0; Re < ce; Re++)
        ye[Re] = arguments[Re + 2];
      B.children = ye;
    }
    if (k && k.defaultProps)
      for (P in ce = k.defaultProps, ce)
        B[P] === void 0 && (B[P] = ce[P]);
    return V(k, J, B);
  }, He.createRef = function() {
    return { current: null };
  }, He.forwardRef = function(k) {
    return { $$typeof: p, render: k };
  }, He.isValidElement = F, He.lazy = function(k) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: k },
      _init: $
    };
  }, He.memo = function(k, H) {
    return {
      $$typeof: m,
      type: k,
      compare: H === void 0 ? null : H
    };
  }, He.startTransition = function(k) {
    var H = re.T, Z = {};
    re.T = Z;
    try {
      var P = k(), B = re.S;
      B !== null && B(Z, P), typeof P == "object" && P !== null && typeof P.then == "function" && P.then(Q, se);
    } catch (J) {
      se(J);
    } finally {
      H !== null && Z.types !== null && (H.types = Z.types), re.T = H;
    }
  }, He.unstable_useCacheRefresh = function() {
    return re.H.useCacheRefresh();
  }, He.use = function(k) {
    return re.H.use(k);
  }, He.useActionState = function(k, H, Z) {
    return re.H.useActionState(k, H, Z);
  }, He.useCallback = function(k, H) {
    return re.H.useCallback(k, H);
  }, He.useContext = function(k) {
    return re.H.useContext(k);
  }, He.useDebugValue = function() {
  }, He.useDeferredValue = function(k, H) {
    return re.H.useDeferredValue(k, H);
  }, He.useEffect = function(k, H) {
    return re.H.useEffect(k, H);
  }, He.useEffectEvent = function(k) {
    return re.H.useEffectEvent(k);
  }, He.useId = function() {
    return re.H.useId();
  }, He.useImperativeHandle = function(k, H, Z) {
    return re.H.useImperativeHandle(k, H, Z);
  }, He.useInsertionEffect = function(k, H) {
    return re.H.useInsertionEffect(k, H);
  }, He.useLayoutEffect = function(k, H) {
    return re.H.useLayoutEffect(k, H);
  }, He.useMemo = function(k, H) {
    return re.H.useMemo(k, H);
  }, He.useOptimistic = function(k, H) {
    return re.H.useOptimistic(k, H);
  }, He.useReducer = function(k, H, Z) {
    return re.H.useReducer(k, H, Z);
  }, He.useRef = function(k) {
    return re.H.useRef(k);
  }, He.useState = function(k) {
    return re.H.useState(k);
  }, He.useSyncExternalStore = function(k, H, Z) {
    return re.H.useSyncExternalStore(
      k,
      H,
      Z
    );
  }, He.useTransition = function() {
    return re.H.useTransition();
  }, He.version = "19.2.5", He;
}
var dy;
function Dh() {
  return dy || (dy = 1, lf.exports = OE()), lf.exports;
}
var g = Dh();
const Se = /* @__PURE__ */ $x(g), LE = /* @__PURE__ */ kE({
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
var fy;
function $E() {
  return fy || (fy = 1, (function(t) {
    function a(A, G) {
      var $ = A.length;
      A.push(G);
      e: for (; 0 < $; ) {
        var se = $ - 1 >>> 1, de = A[se];
        if (0 < o(de, G))
          A[se] = G, A[$] = de, $ = se;
        else break e;
      }
    }
    function s(A) {
      return A.length === 0 ? null : A[0];
    }
    function i(A) {
      if (A.length === 0) return null;
      var G = A[0], $ = A.pop();
      if ($ !== G) {
        A[0] = $;
        e: for (var se = 0, de = A.length, k = de >>> 1; se < k; ) {
          var H = 2 * (se + 1) - 1, Z = A[H], P = H + 1, B = A[P];
          if (0 > o(Z, $))
            P < de && 0 > o(B, Z) ? (A[se] = B, A[P] = $, se = P) : (A[se] = Z, A[H] = $, se = H);
          else if (P < de && 0 > o(B, $))
            A[se] = B, A[P] = $, se = P;
          else break e;
        }
      }
      return G;
    }
    function o(A, G) {
      var $ = A.sortIndex - G.sortIndex;
      return $ !== 0 ? $ : A.id - G.id;
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
    var y = [], m = [], b = 1, v = null, w = 3, S = !1, j = !1, N = !1, R = !1, C = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function T(A) {
      for (var G = s(m); G !== null; ) {
        if (G.callback === null) i(m);
        else if (G.startTime <= A)
          i(m), G.sortIndex = G.expirationTime, a(y, G);
        else break;
        G = s(m);
      }
    }
    function q(A) {
      if (N = !1, T(A), !j)
        if (s(y) !== null)
          j = !0, Q || (Q = !0, W());
        else {
          var G = s(m);
          G !== null && le(q, G.startTime - A);
        }
    }
    var Q = !1, re = -1, M = 5, V = -1;
    function D() {
      return R ? !0 : !(t.unstable_now() - V < M);
    }
    function F() {
      if (R = !1, Q) {
        var A = t.unstable_now();
        V = A;
        var G = !0;
        try {
          e: {
            j = !1, N && (N = !1, O(re), re = -1), S = !0;
            var $ = w;
            try {
              t: {
                for (T(A), v = s(y); v !== null && !(v.expirationTime > A && D()); ) {
                  var se = v.callback;
                  if (typeof se == "function") {
                    v.callback = null, w = v.priorityLevel;
                    var de = se(
                      v.expirationTime <= A
                    );
                    if (A = t.unstable_now(), typeof de == "function") {
                      v.callback = de, T(A), G = !0;
                      break t;
                    }
                    v === s(y) && i(y), T(A);
                  } else i(y);
                  v = s(y);
                }
                if (v !== null) G = !0;
                else {
                  var k = s(m);
                  k !== null && le(
                    q,
                    k.startTime - A
                  ), G = !1;
                }
              }
              break e;
            } finally {
              v = null, w = $, S = !1;
            }
            G = void 0;
          }
        } finally {
          G ? W() : Q = !1;
        }
      }
    }
    var W;
    if (typeof _ == "function")
      W = function() {
        _(F);
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
    function le(A, G) {
      re = C(function() {
        A(t.unstable_now());
      }, G);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, t.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : M = 0 < A ? Math.floor(1e3 / A) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, t.unstable_next = function(A) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var G = 3;
          break;
        default:
          G = w;
      }
      var $ = w;
      w = G;
      try {
        return A();
      } finally {
        w = $;
      }
    }, t.unstable_requestPaint = function() {
      R = !0;
    }, t.unstable_runWithPriority = function(A, G) {
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
        return G();
      } finally {
        w = $;
      }
    }, t.unstable_scheduleCallback = function(A, G, $) {
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
        callback: G,
        priorityLevel: A,
        startTime: $,
        expirationTime: de,
        sortIndex: -1
      }, $ > se ? (A.sortIndex = $, a(m, A), s(y) === null && A === s(m) && (N ? (O(re), re = -1) : N = !0, le(q, $ - se))) : (A.sortIndex = de, a(y, A), j || S || (j = !0, Q || (Q = !0, W()))), A;
    }, t.unstable_shouldYield = D, t.unstable_wrapCallback = function(A) {
      var G = w;
      return function() {
        var $ = w;
        w = G;
        try {
          return A.apply(this, arguments);
        } finally {
          w = $;
        }
      };
    };
  })(uf)), uf;
}
var hy;
function UE() {
  return hy || (hy = 1, cf.exports = $E()), cf.exports;
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
var my;
function BE() {
  if (my) return vn;
  my = 1;
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
var py;
function Ux() {
  if (py) return df.exports;
  py = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), df.exports = BE(), df.exports;
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
var gy;
function VE() {
  if (gy) return Qi;
  gy = 1;
  var t = UE(), a = Dh(), s = Ux();
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
  var v = Object.assign, w = Symbol.for("react.element"), S = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), O = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), q = Symbol.for("react.suspense"), Q = Symbol.for("react.suspense_list"), re = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), V = Symbol.for("react.activity"), D = Symbol.for("react.memo_cache_sentinel"), F = Symbol.iterator;
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
        case _:
          return e.displayName || "Context";
        case O:
          return (e._context.displayName || "Context") + ".Consumer";
        case T:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case re:
          return n = e.displayName || null, n !== null ? n : K(e.type) || "Memo";
        case M:
          n = e._payload, e = e._init;
          try {
            return K(e(n));
          } catch {
          }
      }
    return null;
  }
  var le = Array.isArray, A = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, se = [], de = -1;
  function k(e) {
    return { current: e };
  }
  function H(e) {
    0 > de || (e.current = se[de], se[de] = null, de--);
  }
  function Z(e, n) {
    de++, se[de] = e.current, e.current = n;
  }
  var P = k(null), B = k(null), J = k(null), ce = k(null);
  function ye(e, n) {
    switch (Z(J, n), Z(B, e), Z(P, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Av(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Av(n), e = kv(n, e);
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
    H(P), Z(P, e);
  }
  function Re() {
    H(P), H(B), H(J);
  }
  function Ge(e) {
    e.memoizedState !== null && Z(ce, e);
    var n = P.current, r = kv(n, e.type);
    n !== r && (Z(B, e), Z(P, r));
  }
  function Ne(e) {
    B.current === e && (H(P), H(B)), ce.current === e && (H(ce), Yi._currentValue = $);
  }
  var nt, Ie;
  function qe(e) {
    if (nt === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        nt = n && n[1] || "", Ie = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + nt + e + Ie;
  }
  var Kt = !1;
  function _t(e, n) {
    if (!e || Kt) return "";
    Kt = !0;
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
      Kt = !1, Error.prepareStackTrace = r;
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
  var vt = Object.prototype.hasOwnProperty, Xt = t.unstable_scheduleCallback, En = t.unstable_cancelCallback, ot = t.unstable_shouldYield, sn = t.unstable_requestPaint, ht = t.unstable_now, we = t.unstable_getCurrentPriorityLevel, Le = t.unstable_ImmediatePriority, Ke = t.unstable_UserBlockingPriority, ct = t.unstable_NormalPriority, At = t.unstable_LowPriority, Ut = t.unstable_IdlePriority, sa = t.log, Sn = t.unstable_setDisableYieldValue, pn = null, Ot = null;
  function Tt(e) {
    if (typeof sa == "function" && Sn(e), Ot && typeof Ot.setStrictMode == "function")
      try {
        Ot.setStrictMode(pn, e);
      } catch {
      }
  }
  var gt = Math.clz32 ? Math.clz32 : _e, Nn = Math.log, fe = Math.LN2;
  function _e(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Nn(e) / fe | 0) | 0;
  }
  var Ce = 256, U = 262144, pe = 4194304;
  function be(e) {
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
  function ge(e, n, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var d = 0, h = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var E = l & 134217727;
    return E !== 0 ? (l = E & ~h, l !== 0 ? d = be(l) : (x &= E, x !== 0 ? d = be(x) : r || (r = E & ~e, r !== 0 && (d = be(r))))) : (E = l & ~h, E !== 0 ? d = be(E) : x !== 0 ? d = be(x) : r || (r = l & ~e, r !== 0 && (d = be(r)))), d === 0 ? 0 : n !== 0 && n !== d && (n & h) === 0 && (h = d & -d, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : d;
  }
  function Ue(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Xe(e, n) {
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
  function mt() {
    var e = pe;
    return pe <<= 1, (pe & 62914560) === 0 && (pe = 4194304), e;
  }
  function at(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function rt(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function qt(e, n, r, l, d, h) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, ne = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var ue = 31 - gt(r), me = 1 << ue;
      E[ue] = 0, L[ue] = -1;
      var ie = ne[ue];
      if (ie !== null)
        for (ne[ue] = null, ue = 0; ue < ie.length; ue++) {
          var oe = ie[ue];
          oe !== null && (oe.lane &= -536870913);
        }
      r &= ~me;
    }
    l !== 0 && wn(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function wn(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - gt(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function Vt(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var l = 31 - gt(r), d = 1 << l;
      d & n | e[l] & n && (e[l] |= n), r &= ~d;
    }
  }
  function z(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : Y(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function Y(e) {
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
  function ve() {
    var e = G.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ty(e.type));
  }
  function xe(e, n) {
    var r = G.p;
    try {
      return G.p = e, n();
    } finally {
      G.p = r;
    }
  }
  var Ae = Math.random().toString(36).slice(2), je = "__reactFiber$" + Ae, Ee = "__reactProps$" + Ae, De = "__reactContainer$" + Ae, Te = "__reactEvents$" + Ae, Be = "__reactListeners$" + Ae, Oe = "__reactHandles$" + Ae, ut = "__reactResources$" + Ae, Qe = "__reactMarker$" + Ae;
  function Et(e) {
    delete e[je], delete e[Ee], delete e[Te], delete e[Be], delete e[Oe];
  }
  function xt(e) {
    var n = e[je];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[De] || r[je]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Bv(e); e !== null; ) {
            if (r = e[je]) return r;
            e = Bv(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function Lt(e) {
    if (e = e[je] || e[De]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function We(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Qt(e) {
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
  function ns(e) {
    return vt.call(Tr, e) ? !0 : vt.call(ma, e) ? !1 : Cr.test(e) ? Tr[e] = !0 : (ma[e] = !0, !1);
  }
  function Ze(e, n, r) {
    if (ns(n))
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
  function Ft(e, n, r) {
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
  function Zt(e) {
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
  function kt(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function as(e, n, r) {
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
  function rs(e) {
    if (!e._valueTracker) {
      var n = kt(e) ? "checked" : "value";
      e._valueTracker = as(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function kl(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), l = "";
    return e && (l = kt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Dl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Cw = /[\n"\\]/g;
  function Fn(e) {
    return e.replace(
      Cw,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Wc(e, n, r, l, d, h, x, E) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + Zt(n)) : e.value !== "" + Zt(n) && (e.value = "" + Zt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? eu(e, x, Zt(n)) : r != null ? eu(e, x, Zt(r)) : l != null && e.removeAttribute("value"), d == null && h != null && (e.defaultChecked = !!h), d != null && (e.checked = d && typeof d != "function" && typeof d != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + Zt(E) : e.removeAttribute("name");
  }
  function Nm(e, n, r, l, d, h, x, E) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        rs(e);
        return;
      }
      r = r != null ? "" + Zt(r) : "", n = n != null ? "" + Zt(n) : r, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? d, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), rs(e);
  }
  function eu(e, n, r) {
    n === "number" && Dl(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ss(e, n, r, l) {
    if (e = e.options, n) {
      n = {};
      for (var d = 0; d < r.length; d++)
        n["$" + r[d]] = !0;
      for (r = 0; r < e.length; r++)
        d = n.hasOwnProperty("$" + e[r].value), e[r].selected !== d && (e[r].selected = d), d && l && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + Zt(r), n = null, d = 0; d < e.length; d++) {
        if (e[d].value === r) {
          e[d].selected = !0, l && (e[d].defaultSelected = !0);
          return;
        }
        n !== null || e[d].disabled || (n = e[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Cm(e, n, r) {
    if (n != null && (n = "" + Zt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + Zt(r) : "";
  }
  function Tm(e, n, r, l) {
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
    r = Zt(n), e.defaultValue = r, l = e.textContent, l === r && l !== "" && l !== null && (e.value = l), rs(e);
  }
  function is(e, n) {
    if (n) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var Tw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Rm(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, r) : typeof r != "number" || r === 0 || Tw.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function _m(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(i(62));
    if (e = e.style, r != null) {
      for (var l in r)
        !r.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var d in n)
        l = n[d], n.hasOwnProperty(d) && r[d] !== l && Rm(e, d, l);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Rm(e, h, n[h]);
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
  var Rw = /* @__PURE__ */ new Map([
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
  ]), _w = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function zl(e) {
    return _w.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function wa() {
  }
  var nu = null;
  function au(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ls = null, os = null;
  function Mm(e) {
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
              l = r[n], l.form === e.form && kl(l);
          }
          break e;
        case "textarea":
          Cm(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && ss(e, !!r.multiple, n, !1);
      }
    }
  }
  var ru = !1;
  function Am(e, n, r) {
    if (ru) return e(n, r);
    ru = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (ru = !1, (ls !== null || os !== null) && (wo(), ls && (n = ls, e = os, os = ls = null, Mm(n), e)))
        for (n = 0; n < e.length; n++) Mm(e[n]);
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
  function km() {
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
  function Cn(e) {
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
  }, Ul = Cn(Rr), ui = v({}, Rr, { view: 0, detail: 0 }), Mw = Cn(ui), lu, ou, di, Bl = v({}, ui, {
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
  }), zm = Cn(Bl), Aw = v({}, Bl, { dataTransfer: 0 }), kw = Cn(Aw), Dw = v({}, ui, { relatedTarget: 0 }), cu = Cn(Dw), zw = v({}, Rr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ow = Cn(zw), Lw = v({}, Rr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), $w = Cn(Lw), Uw = v({}, Rr, { data: 0 }), Om = Cn(Uw), Bw = {
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
  }, Vw = {
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
  }, Iw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Hw(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Iw[e]) ? !!n[e] : !1;
  }
  function uu() {
    return Hw;
  }
  var qw = v({}, ui, {
    key: function(e) {
      if (e.key) {
        var n = Bw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Ll(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Vw[e.keyCode] || "Unidentified" : "";
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
  }), Fw = Cn(qw), Yw = v({}, Bl, {
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
  }), Lm = Cn(Yw), Gw = v({}, ui, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: uu
  }), Pw = Cn(Gw), Kw = v({}, Rr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Xw = Cn(Kw), Qw = v({}, Bl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zw = Cn(Qw), Jw = v({}, Rr, {
    newState: 0,
    oldState: 0
  }), Ww = Cn(Jw), ej = [9, 13, 27, 32], du = ja && "CompositionEvent" in window, fi = null;
  ja && "documentMode" in document && (fi = document.documentMode);
  var tj = ja && "TextEvent" in window && !fi, $m = ja && (!du || fi && 8 < fi && 11 >= fi), Um = " ", Bm = !1;
  function Vm(e, n) {
    switch (e) {
      case "keyup":
        return ej.indexOf(n.keyCode) !== -1;
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
  function Im(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var cs = !1;
  function nj(e, n) {
    switch (e) {
      case "compositionend":
        return Im(n);
      case "keypress":
        return n.which !== 32 ? null : (Bm = !0, Um);
      case "textInput":
        return e = n.data, e === Um && Bm ? null : e;
      default:
        return null;
    }
  }
  function aj(e, n) {
    if (cs)
      return e === "compositionend" || !du && Vm(e, n) ? (e = km(), Ol = iu = Ya = null, cs = !1, e) : null;
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
        return $m && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var rj = {
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
  function Hm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!rj[e.type] : n === "textarea";
  }
  function qm(e, n, r, l) {
    ls ? os ? os.push(l) : os = [l] : ls = l, n = _o(n, "onChange"), 0 < n.length && (r = new Ul(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: n }));
  }
  var hi = null, mi = null;
  function sj(e) {
    Nv(e, 0);
  }
  function Vl(e) {
    var n = We(e);
    if (kl(n)) return e;
  }
  function Fm(e, n) {
    if (e === "change") return n;
  }
  var Ym = !1;
  if (ja) {
    var fu;
    if (ja) {
      var hu = "oninput" in document;
      if (!hu) {
        var Gm = document.createElement("div");
        Gm.setAttribute("oninput", "return;"), hu = typeof Gm.oninput == "function";
      }
      fu = hu;
    } else fu = !1;
    Ym = fu && (!document.documentMode || 9 < document.documentMode);
  }
  function Pm() {
    hi && (hi.detachEvent("onpropertychange", Km), mi = hi = null);
  }
  function Km(e) {
    if (e.propertyName === "value" && Vl(mi)) {
      var n = [];
      qm(
        n,
        mi,
        e,
        au(e)
      ), Am(sj, n);
    }
  }
  function ij(e, n, r) {
    e === "focusin" ? (Pm(), hi = n, mi = r, hi.attachEvent("onpropertychange", Km)) : e === "focusout" && Pm();
  }
  function lj(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Vl(mi);
  }
  function oj(e, n) {
    if (e === "click") return Vl(n);
  }
  function cj(e, n) {
    if (e === "input" || e === "change")
      return Vl(n);
  }
  function uj(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var On = typeof Object.is == "function" ? Object.is : uj;
  function pi(e, n) {
    if (On(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(n);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var d = r[l];
      if (!vt.call(n, d) || !On(e[d], n[d]))
        return !1;
    }
    return !0;
  }
  function Xm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Qm(e, n) {
    var r = Xm(e);
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
      r = Xm(r);
    }
  }
  function Zm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Zm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Jm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = Dl(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = n.contentWindow;
      else break;
      n = Dl(e.document);
    }
    return n;
  }
  function mu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var dj = ja && "documentMode" in document && 11 >= document.documentMode, us = null, pu = null, gi = null, gu = !1;
  function Wm(e, n, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    gu || us == null || us !== Dl(l) || (l = us, "selectionStart" in l && mu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
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
    ), e.push({ event: n, listeners: l }), n.target = us)));
  }
  function _r(e, n) {
    var r = {};
    return r[e.toLowerCase()] = n.toLowerCase(), r["Webkit" + e] = "webkit" + n, r["Moz" + e] = "moz" + n, r;
  }
  var ds = {
    animationend: _r("Animation", "AnimationEnd"),
    animationiteration: _r("Animation", "AnimationIteration"),
    animationstart: _r("Animation", "AnimationStart"),
    transitionrun: _r("Transition", "TransitionRun"),
    transitionstart: _r("Transition", "TransitionStart"),
    transitioncancel: _r("Transition", "TransitionCancel"),
    transitionend: _r("Transition", "TransitionEnd")
  }, vu = {}, ep = {};
  ja && (ep = document.createElement("div").style, "AnimationEvent" in window || (delete ds.animationend.animation, delete ds.animationiteration.animation, delete ds.animationstart.animation), "TransitionEvent" in window || delete ds.transitionend.transition);
  function Mr(e) {
    if (vu[e]) return vu[e];
    if (!ds[e]) return e;
    var n = ds[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in ep)
        return vu[e] = n[r];
    return e;
  }
  var tp = Mr("animationend"), np = Mr("animationiteration"), ap = Mr("animationstart"), fj = Mr("transitionrun"), hj = Mr("transitionstart"), mj = Mr("transitioncancel"), rp = Mr("transitionend"), sp = /* @__PURE__ */ new Map(), yu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  yu.push("scrollEnd");
  function la(e, n) {
    sp.set(e, n), ln(n, [e]);
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
  }, Yn = [], fs = 0, bu = 0;
  function Hl() {
    for (var e = fs, n = bu = fs = 0; n < e; ) {
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
      h !== 0 && ip(r, d, h);
    }
  }
  function ql(e, n, r, l) {
    Yn[fs++] = e, Yn[fs++] = n, Yn[fs++] = r, Yn[fs++] = l, bu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function xu(e, n, r, l) {
    return ql(e, n, r, l), Fl(e);
  }
  function Ar(e, n) {
    return ql(e, null, null, n), Fl(e);
  }
  function ip(e, n, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var d = !1, h = e.return; h !== null; )
      h.childLanes |= r, l = h.alternate, l !== null && (l.childLanes |= r), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (d = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, d && n !== null && (d = 31 - gt(r), e = h.hiddenUpdates, l = e[d], l === null ? e[d] = [n] : l.push(n), n.lane = r | 536870912), h) : null;
  }
  function Fl(e) {
    if (50 < Ui)
      throw Ui = 0, _d = null, Error(i(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var hs = {};
  function pj(e, n, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ln(e, n, r, l) {
    return new pj(e, n, r, l);
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
  function lp(e, n) {
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
      x = xE(
        e,
        r,
        P.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case V:
          return e = Ln(31, r, n, d), e.elementType = V, e.lanes = h, e;
        case N:
          return kr(r.children, d, h, n);
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
              case _:
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
              case M:
                x = 16, l = null;
                break e;
            }
          x = 29, r = Error(
            i(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return n = Ln(x, r, n, d), n.elementType = e, n.type = l, n.lanes = h, n;
  }
  function kr(e, n, r, l) {
    return e = Ln(7, e, l, n), e.lanes = r, e;
  }
  function wu(e, n, r) {
    return e = Ln(6, e, null, n), e.lanes = r, e;
  }
  function op(e) {
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
  var cp = /* @__PURE__ */ new WeakMap();
  function Gn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = cp.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: mn(n)
      }, cp.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: mn(n)
    };
  }
  var ms = [], ps = 0, Gl = null, vi = 0, Pn = [], Kn = 0, Ga = null, pa = 1, ga = "";
  function Na(e, n) {
    ms[ps++] = vi, ms[ps++] = Gl, Gl = e, vi = n;
  }
  function up(e, n, r) {
    Pn[Kn++] = pa, Pn[Kn++] = ga, Pn[Kn++] = Ga, Ga = e;
    var l = pa;
    e = ga;
    var d = 32 - gt(l) - 1;
    l &= ~(1 << d), r += 1;
    var h = 32 - gt(n) + d;
    if (30 < h) {
      var x = d - d % 5;
      h = (l & (1 << x) - 1).toString(32), l >>= x, d -= x, pa = 1 << 32 - gt(n) + d | r << d | l, ga = h + e;
    } else
      pa = 1 << h | r << d | l, ga = e;
  }
  function Eu(e) {
    e.return !== null && (Na(e, 1), up(e, 1, 0));
  }
  function Nu(e) {
    for (; e === Gl; )
      Gl = ms[--ps], ms[ps] = null, vi = ms[--ps], ms[ps] = null;
    for (; e === Ga; )
      Ga = Pn[--Kn], Pn[Kn] = null, ga = Pn[--Kn], Pn[Kn] = null, pa = Pn[--Kn], Pn[Kn] = null;
  }
  function dp(e, n) {
    Pn[Kn++] = pa, Pn[Kn++] = ga, Pn[Kn++] = Ga, pa = n.id, ga = n.overflow, Ga = e;
  }
  var cn = null, Dt = null, lt = !1, Pa = null, Xn = !1, Cu = Error(i(519));
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
  function fp(e) {
    var n = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (n[je] = e, n[Ee] = l, r) {
      case "dialog":
        tt("cancel", n), tt("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        tt("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Vi.length; r++)
          tt(Vi[r], n);
        break;
      case "source":
        tt("error", n);
        break;
      case "img":
      case "image":
      case "link":
        tt("error", n), tt("load", n);
        break;
      case "details":
        tt("toggle", n);
        break;
      case "input":
        tt("invalid", n), Nm(
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
        tt("invalid", n);
        break;
      case "textarea":
        tt("invalid", n), Tm(n, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || l.suppressHydrationWarning === !0 || _v(n.textContent, r) ? (l.popover != null && (tt("beforetoggle", n), tt("toggle", n)), l.onScroll != null && tt("scroll", n), l.onScrollEnd != null && tt("scrollend", n), l.onClick != null && (n.onclick = wa), n = !0) : n = !1, n || Ka(e, !0);
  }
  function hp(e) {
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
  function gs(e) {
    if (e !== cn) return !1;
    if (!lt) return hp(e), lt = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Fd(e.type, e.memoizedProps)), r = !r), r && Dt && Ka(e), hp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Dt = Uv(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Dt = Uv(e);
    } else
      n === 27 ? (n = Dt, or(e.type) ? (e = Xd, Xd = null, Dt = e) : Dt = n) : Dt = cn ? Zn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Dr() {
    Dt = cn = null, lt = !1;
  }
  function Tu() {
    var e = Pa;
    return e !== null && (Mn === null ? Mn = e : Mn.push.apply(
      Mn,
      e
    ), Pa = null), e;
  }
  function yi(e) {
    Pa === null ? Pa = [e] : Pa.push(e);
  }
  var Ru = k(null), zr = null, Ca = null;
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
  function vs(e, n, r, l) {
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
    return mp(zr, e);
  }
  function Kl(e, n) {
    return zr === null && Or(e), mp(e, n);
  }
  function mp(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Ca === null) {
      if (e === null) throw Error(i(308));
      Ca = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ca = Ca.next = n;
    return r;
  }
  var gj = typeof AbortController < "u" ? AbortController : function() {
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
  }, vj = t.unstable_scheduleCallback, yj = t.unstable_NormalPriority, Jt = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Au() {
    return {
      controller: new gj(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function bi(e) {
    e.refCount--, e.refCount === 0 && vj(yj, function() {
      e.controller.abort();
    });
  }
  var xi = null, ku = 0, ys = 0, bs = null;
  function bj(e, n) {
    if (xi === null) {
      var r = xi = [];
      ku = 0, ys = Od(), bs = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return ku++, n.then(pp, pp), n;
  }
  function pp() {
    if (--ku === 0 && xi !== null) {
      bs !== null && (bs.status = "fulfilled");
      var e = xi;
      xi = null, ys = 0, bs = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function xj(e, n) {
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
  var gp = A.S;
  A.S = function(e, n) {
    Wg = ht(), typeof n == "object" && n !== null && typeof n.then == "function" && bj(e, n), gp !== null && gp(e, n);
  };
  var Lr = k(null);
  function Du() {
    var e = Lr.current;
    return e !== null ? e : Nt.pooledCache;
  }
  function Xl(e, n) {
    n === null ? Z(Lr, Lr.current) : Z(Lr, n.pool);
  }
  function vp() {
    var e = Du();
    return e === null ? null : { parent: Jt._currentValue, pool: e };
  }
  var xs = Error(i(460)), zu = Error(i(474)), Ql = Error(i(542)), Zl = { then: function() {
  } };
  function yp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function bp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(wa, wa), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, Sp(e), e;
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
            throw e = n.reason, Sp(e), e;
        }
        throw Ur = n, xs;
    }
  }
  function $r(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (Ur = r, xs) : r;
    }
  }
  var Ur = null;
  function xp() {
    if (Ur === null) throw Error(i(459));
    var e = Ur;
    return Ur = null, e;
  }
  function Sp(e) {
    if (e === xs || e === Ql)
      throw Error(i(483));
  }
  var Ss = null, Si = 0;
  function Jl(e) {
    var n = Si;
    return Si += 1, Ss === null && (Ss = []), bp(Ss, e, n);
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
  function wp(e) {
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
      ) : I !== null && (I.elementType === $e || typeof $e == "object" && $e !== null && $e.$$typeof === M && $r($e) === I.type) ? (I = d(I, te.props), wi(I, te), I.return = X, I) : (I = Yl(
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
      return I === null || I.tag !== 7 ? (I = kr(
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
          case M:
            return I = $r(I), me(X, I, te);
        }
        if (le(I) || W(I))
          return I = kr(
            I,
            X.mode,
            te,
            null
          ), I.return = X, I;
        if (typeof I.then == "function")
          return me(X, Jl(I), te);
        if (I.$$typeof === _)
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
          case M:
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
        if (te.$$typeof === _)
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
          case M:
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
        if (he.$$typeof === _)
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
      for (var $e = null, dt = null, ze = I, Pe = I = 0, it = null; ze !== null && Pe < te.length; Pe++) {
        ze.index > Pe ? (it = ze, ze = null) : it = ze.sibling;
        var ft = ie(
          X,
          ze,
          te[Pe],
          he
        );
        if (ft === null) {
          ze === null && (ze = it);
          break;
        }
        e && ze && ft.alternate === null && n(X, ze), I = h(ft, I, Pe), dt === null ? $e = ft : dt.sibling = ft, dt = ft, ze = it;
      }
      if (Pe === te.length)
        return r(X, ze), lt && Na(X, Pe), $e;
      if (ze === null) {
        for (; Pe < te.length; Pe++)
          ze = me(X, te[Pe], he), ze !== null && (I = h(
            ze,
            I,
            Pe
          ), dt === null ? $e = ze : dt.sibling = ze, dt = ze);
        return lt && Na(X, Pe), $e;
      }
      for (ze = l(ze); Pe < te.length; Pe++)
        it = oe(
          ze,
          X,
          Pe,
          te[Pe],
          he
        ), it !== null && (e && it.alternate !== null && ze.delete(
          it.key === null ? Pe : it.key
        ), I = h(
          it,
          I,
          Pe
        ), dt === null ? $e = it : dt.sibling = it, dt = it);
      return e && ze.forEach(function(hr) {
        return n(X, hr);
      }), lt && Na(X, Pe), $e;
    }
    function Ve(X, I, te, he) {
      if (te == null) throw Error(i(151));
      for (var $e = null, dt = null, ze = I, Pe = I = 0, it = null, ft = te.next(); ze !== null && !ft.done; Pe++, ft = te.next()) {
        ze.index > Pe ? (it = ze, ze = null) : it = ze.sibling;
        var hr = ie(X, ze, ft.value, he);
        if (hr === null) {
          ze === null && (ze = it);
          break;
        }
        e && ze && hr.alternate === null && n(X, ze), I = h(hr, I, Pe), dt === null ? $e = hr : dt.sibling = hr, dt = hr, ze = it;
      }
      if (ft.done)
        return r(X, ze), lt && Na(X, Pe), $e;
      if (ze === null) {
        for (; !ft.done; Pe++, ft = te.next())
          ft = me(X, ft.value, he), ft !== null && (I = h(ft, I, Pe), dt === null ? $e = ft : dt.sibling = ft, dt = ft);
        return lt && Na(X, Pe), $e;
      }
      for (ze = l(ze); !ft.done; Pe++, ft = te.next())
        ft = oe(ze, X, Pe, ft.value, he), ft !== null && (e && ft.alternate !== null && ze.delete(ft.key === null ? Pe : ft.key), I = h(ft, I, Pe), dt === null ? $e = ft : dt.sibling = ft, dt = ft);
      return e && ze.forEach(function(AE) {
        return n(X, AE);
      }), lt && Na(X, Pe), $e;
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
                  } else if (I.elementType === $e || typeof $e == "object" && $e !== null && $e.$$typeof === M && $r($e) === I.type) {
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
              te.type === N ? (he = kr(
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
          case M:
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
          return te = $e.call(te), Ve(
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
        if (te.$$typeof === _)
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
        return Ss = null, $e;
      } catch (ze) {
        if (ze === xs || ze === Ql) throw ze;
        var dt = Ln(29, ze, null, X.mode);
        return dt.lanes = he, dt.return = X, dt;
      } finally {
      }
    };
  }
  var Br = wp(!0), jp = wp(!1), Qa = !1;
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
    if (l = l.shared, (pt & 2) !== 0) {
      var d = l.pending;
      return d === null ? n.next = n : (n.next = d.next, d.next = n), l.pending = n, n = Fl(e), ip(e, null, r), n;
    }
    return ql(e, l, n, r), Fl(e);
  }
  function ji(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, Vt(e, r);
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
      var e = bs;
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
        if (oe ? (st & ie) === ie : (l & ie) === ie) {
          ie !== 0 && ie === ys && (Uu = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Me = e, Ve = E;
            ie = n;
            var jt = r;
            switch (Ve.tag) {
              case 1:
                if (Me = Ve.payload, typeof Me == "function") {
                  me = Me.call(jt, me, ie);
                  break e;
                }
                me = Me;
                break e;
              case 3:
                Me.flags = Me.flags & -65537 | 128;
              case 0:
                if (Me = Ve.payload, ie = typeof Me == "function" ? Me.call(jt, me, ie) : Me, ie == null) break e;
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
  function Ep(e, n) {
    if (typeof e != "function")
      throw Error(i(191, e));
    e.call(n);
  }
  function Np(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        Ep(r[e], n);
  }
  var ws = k(null), eo = k(0);
  function Cp(e, n) {
    e = La, Z(eo, e), Z(ws, n), La = e | n.baseLanes;
  }
  function Bu() {
    Z(eo, La), Z(ws, ws.current);
  }
  function Vu() {
    La = eo.current, H(ws), H(eo);
  }
  var $n = k(null), Qn = null;
  function Wa(e) {
    var n = e.alternate;
    Z(Yt, Yt.current & 1), Z($n, e), Qn === null && (n === null || ws.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function Iu(e) {
    Z(Yt, Yt.current), Z($n, e), Qn === null && (Qn = e);
  }
  function Tp(e) {
    e.tag === 22 ? (Z(Yt, Yt.current), Z($n, e), Qn === null && (Qn = e)) : er();
  }
  function er() {
    Z(Yt, Yt.current), Z($n, $n.current);
  }
  function Un(e) {
    H($n), Qn === e && (Qn = null), H(Yt);
  }
  var Yt = k(0);
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
  var Ra = 0, Fe = null, St = null, Wt = null, no = !1, js = !1, Vr = !1, ao = 0, Ci = 0, Es = null, Sj = 0;
  function It() {
    throw Error(i(321));
  }
  function Hu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!On(e[r], n[r])) return !1;
    return !0;
  }
  function qu(e, n, r, l, d, h) {
    return Ra = h, Fe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, A.H = e === null || e.memoizedState === null ? ug : rd, Vr = !1, h = r(l, d), Vr = !1, js && (h = _p(
      n,
      r,
      l,
      d
    )), Rp(e), h;
  }
  function Rp(e) {
    A.H = _i;
    var n = St !== null && St.next !== null;
    if (Ra = 0, Wt = St = Fe = null, no = !1, Ci = 0, Es = null, n) throw Error(i(300));
    e === null || en || (e = e.dependencies, e !== null && Pl(e) && (en = !0));
  }
  function _p(e, n, r, l) {
    Fe = e;
    var d = 0;
    do {
      if (js && (Es = null), Ci = 0, js = !1, 25 <= d) throw Error(i(301));
      if (d += 1, Wt = St = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      A.H = dg, h = n(r, l);
    } while (js);
    return h;
  }
  function wj() {
    var e = A.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ti(n) : n, e = e.useState()[0], (St !== null ? St.memoizedState : null) !== e && (Fe.flags |= 1024), n;
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
    Ra = 0, Wt = St = Fe = null, js = !1, Ci = ao = 0, Es = null;
  }
  function jn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Wt === null ? Fe.memoizedState = Wt = e : Wt = Wt.next = e, Wt;
  }
  function Gt() {
    if (St === null) {
      var e = Fe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = St.next;
    var n = Wt === null ? Fe.memoizedState : Wt.next;
    if (n !== null)
      Wt = n, St = e;
    else {
      if (e === null)
        throw Fe.alternate === null ? Error(i(467)) : Error(i(310));
      St = e, e = {
        memoizedState: St.memoizedState,
        baseState: St.baseState,
        baseQueue: St.baseQueue,
        queue: St.queue,
        next: null
      }, Wt === null ? Fe.memoizedState = Wt = e : Wt = Wt.next = e;
    }
    return Wt;
  }
  function ro() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ti(e) {
    var n = Ci;
    return Ci += 1, Es === null && (Es = []), e = bp(Es, e, n), n = Fe, (Wt === null ? n.memoizedState : Wt.next) === null && (n = n.alternate, A.H = n === null || n.memoizedState === null ? ug : rd), e;
  }
  function so(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ti(e);
      if (e.$$typeof === _) return un(e);
    }
    throw Error(i(438, String(e)));
  }
  function Pu(e) {
    var n = null, r = Fe.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var l = Fe.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (n = {
        data: l.data.map(function(d) {
          return d.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = ro(), Fe.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), l = 0; l < e; l++)
        r[l] = D;
    return n.index++, r;
  }
  function _a(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function io(e) {
    var n = Gt();
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
        if (me !== ne.lane ? (st & me) === me : (Ra & me) === me) {
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
            }), me === ys && (ue = !0);
          else if ((Ra & ie) === ie) {
            ne = ne.next, ie === ys && (ue = !0);
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
            }, L === null ? (E = L = me, x = h) : L = L.next = me, Fe.lanes |= ie, ar |= ie;
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
          }, L === null ? (E = L = ie, x = h) : L = L.next = ie, Fe.lanes |= me, ar |= me;
        ne = ne.next;
      } while (ne !== null && ne !== n);
      if (L === null ? x = h : L.next = E, !On(h, e.memoizedState) && (en = !0, ue && (r = bs, r !== null)))
        throw r;
      e.memoizedState = h, e.baseState = x, e.baseQueue = L, l.lastRenderedState = h;
    }
    return d === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Xu(e) {
    var n = Gt(), r = n.queue;
    if (r === null) throw Error(i(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch, d = r.pending, h = n.memoizedState;
    if (d !== null) {
      r.pending = null;
      var x = d = d.next;
      do
        h = e(h, x.action), x = x.next;
      while (x !== d);
      On(h, n.memoizedState) || (en = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), r.lastRenderedState = h;
    }
    return [h, l];
  }
  function Mp(e, n, r) {
    var l = Fe, d = Gt(), h = lt;
    if (h) {
      if (r === void 0) throw Error(i(407));
      r = r();
    } else r = n();
    var x = !On(
      (St || d).memoizedState,
      r
    );
    if (x && (d.memoizedState = r, en = !0), d = d.queue, Ju(Dp.bind(null, l, d, e), [
      e
    ]), d.getSnapshot !== n || x || Wt !== null && Wt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ns(
        9,
        { destroy: void 0 },
        kp.bind(
          null,
          l,
          d,
          r,
          n
        ),
        null
      ), Nt === null) throw Error(i(349));
      h || (Ra & 127) !== 0 || Ap(l, n, r);
    }
    return r;
  }
  function Ap(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Fe.updateQueue, n === null ? (n = ro(), Fe.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function kp(e, n, r, l) {
    n.value = r, n.getSnapshot = l, zp(n) && Op(e);
  }
  function Dp(e, n, r) {
    return r(function() {
      zp(n) && Op(e);
    });
  }
  function zp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !On(e, r);
    } catch {
      return !0;
    }
  }
  function Op(e) {
    var n = Ar(e, 2);
    n !== null && An(n, e, 2);
  }
  function Qu(e) {
    var n = jn();
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
  function Lp(e, n, r, l) {
    return e.baseState = r, Ku(
      e,
      St,
      typeof l == "function" ? l : _a
    );
  }
  function jj(e, n, r, l, d) {
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
      A.T !== null ? r(!0) : h.isTransition = !1, l(h), r = n.pending, r === null ? (h.next = n.pending = h, $p(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function $p(e, n) {
    var r = n.action, l = n.payload, d = e.state;
    if (n.isTransition) {
      var h = A.T, x = {};
      A.T = x;
      try {
        var E = r(d, l), L = A.S;
        L !== null && L(x, E), Up(e, n, E);
      } catch (ne) {
        Zu(e, n, ne);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), A.T = h;
      }
    } else
      try {
        h = r(d, l), Up(e, n, h);
      } catch (ne) {
        Zu(e, n, ne);
      }
  }
  function Up(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        Bp(e, n, l);
      },
      function(l) {
        return Zu(e, n, l);
      }
    ) : Bp(e, n, r);
  }
  function Bp(e, n, r) {
    n.status = "fulfilled", n.value = r, Vp(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, $p(e, r)));
  }
  function Zu(e, n, r) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = r, Vp(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function Vp(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Ip(e, n) {
    return n;
  }
  function Hp(e, n) {
    if (lt) {
      var r = Nt.formState;
      if (r !== null) {
        e: {
          var l = Fe;
          if (lt) {
            if (Dt) {
              t: {
                for (var d = Dt, h = Xn; d.nodeType !== 8; ) {
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
                Dt = Zn(
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
    return r = jn(), r.memoizedState = r.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ip,
      lastRenderedState: n
    }, r.queue = l, r = lg.bind(
      null,
      Fe,
      l
    ), l.dispatch = r, l = Qu(!1), h = ad.bind(
      null,
      Fe,
      !1,
      l.queue
    ), l = jn(), d = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = d, r = jj.bind(
      null,
      Fe,
      d,
      h,
      r
    ), d.dispatch = r, l.memoizedState = e, [n, r, !1];
  }
  function qp(e) {
    var n = Gt();
    return Fp(n, St, e);
  }
  function Fp(e, n, r) {
    if (n = Ku(
      e,
      n,
      Ip
    )[0], e = io(_a)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = Ti(n);
      } catch (x) {
        throw x === xs ? Ql : x;
      }
    else l = n;
    n = Gt();
    var d = n.queue, h = d.dispatch;
    return r !== n.memoizedState && (Fe.flags |= 2048, Ns(
      9,
      { destroy: void 0 },
      Ej.bind(null, d, r),
      null
    )), [l, h, e];
  }
  function Ej(e, n) {
    e.action = n;
  }
  function Yp(e) {
    var n = Gt(), r = St;
    if (r !== null)
      return Fp(n, r, e);
    Gt(), n = n.memoizedState, r = Gt();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [n, l, !1];
  }
  function Ns(e, n, r, l) {
    return e = { tag: e, create: r, deps: l, inst: n, next: null }, n = Fe.updateQueue, n === null && (n = ro(), Fe.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Gp() {
    return Gt().memoizedState;
  }
  function lo(e, n, r, l) {
    var d = jn();
    Fe.flags |= e, d.memoizedState = Ns(
      1 | n,
      { destroy: void 0 },
      r,
      l === void 0 ? null : l
    );
  }
  function oo(e, n, r, l) {
    var d = Gt();
    l = l === void 0 ? null : l;
    var h = d.memoizedState.inst;
    St !== null && l !== null && Hu(l, St.memoizedState.deps) ? d.memoizedState = Ns(n, h, r, l) : (Fe.flags |= e, d.memoizedState = Ns(
      1 | n,
      h,
      r,
      l
    ));
  }
  function Pp(e, n) {
    lo(8390656, 8, e, n);
  }
  function Ju(e, n) {
    oo(2048, 8, e, n);
  }
  function Nj(e) {
    Fe.flags |= 4;
    var n = Fe.updateQueue;
    if (n === null)
      n = ro(), Fe.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Kp(e) {
    var n = Gt().memoizedState;
    return Nj({ ref: n, nextImpl: e }), function() {
      if ((pt & 2) !== 0) throw Error(i(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Xp(e, n) {
    return oo(4, 2, e, n);
  }
  function Qp(e, n) {
    return oo(4, 4, e, n);
  }
  function Zp(e, n) {
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
  function Jp(e, n, r) {
    r = r != null ? r.concat([e]) : null, oo(4, 4, Zp.bind(null, n, e), r);
  }
  function Wu() {
  }
  function Wp(e, n) {
    var r = Gt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    return n !== null && Hu(n, l[1]) ? l[0] : (r.memoizedState = [e, n], e);
  }
  function eg(e, n) {
    var r = Gt();
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
    return r === void 0 || (Ra & 1073741824) !== 0 && (st & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = tv(), Fe.lanes |= e, ar |= e, r);
  }
  function tg(e, n, r, l) {
    return On(r, n) ? r : ws.current !== null ? (e = ed(e, r, l), On(e, n) || (en = !0), e) : (Ra & 42) === 0 || (Ra & 1073741824) !== 0 && (st & 261930) === 0 ? (en = !0, e.memoizedState = r) : (e = tv(), Fe.lanes |= e, ar |= e, n);
  }
  function ng(e, n, r, l, d) {
    var h = G.p;
    G.p = h !== 0 && 8 > h ? h : 8;
    var x = A.T, E = {};
    A.T = E, ad(e, !1, n, r);
    try {
      var L = d(), ne = A.S;
      if (ne !== null && ne(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ue = xj(
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
      G.p = h, x !== null && E.types !== null && (x.types = E.types), A.T = x;
    }
  }
  function Cj() {
  }
  function td(e, n, r, l) {
    if (e.tag !== 5) throw Error(i(476));
    var d = ag(e).queue;
    ng(
      e,
      d,
      n,
      $,
      r === null ? Cj : function() {
        return rg(e), r(l);
      }
    );
  }
  function ag(e) {
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
  function rg(e) {
    var n = ag(e);
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
  function sg() {
    return Gt().memoizedState;
  }
  function ig() {
    return Gt().memoizedState;
  }
  function Tj(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = In();
          e = Za(r);
          var l = Ja(n, e, r);
          l !== null && (An(l, n, r), ji(l, n, r)), n = { cache: Au() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function Rj(e, n, r) {
    var l = In();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, co(e) ? og(n, r) : (r = xu(e, n, r, l), r !== null && (An(r, e, l), cg(r, n, l)));
  }
  function lg(e, n, r) {
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
    if (co(e)) og(n, d);
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
        return An(r, e, l), cg(r, n, l), !0;
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
      ), n !== null && An(n, e, 2);
  }
  function co(e) {
    var n = e.alternate;
    return e === Fe || n !== null && n === Fe;
  }
  function og(e, n) {
    js = no = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function cg(e, n, r) {
    if ((r & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, Vt(e, r);
    }
  }
  var _i = {
    readContext: un,
    use: so,
    useCallback: It,
    useContext: It,
    useEffect: It,
    useImperativeHandle: It,
    useLayoutEffect: It,
    useInsertionEffect: It,
    useMemo: It,
    useReducer: It,
    useRef: It,
    useState: It,
    useDebugValue: It,
    useDeferredValue: It,
    useTransition: It,
    useSyncExternalStore: It,
    useId: It,
    useHostTransitionStatus: It,
    useFormState: It,
    useActionState: It,
    useOptimistic: It,
    useMemoCache: It,
    useCacheRefresh: It
  };
  _i.useEffectEvent = It;
  var ug = {
    readContext: un,
    use: so,
    useCallback: function(e, n) {
      return jn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: un,
    useEffect: Pp,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, lo(
        4194308,
        4,
        Zp.bind(null, n, e),
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
      var r = jn();
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
      var l = jn();
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
      }, l.queue = e, e = e.dispatch = Rj.bind(
        null,
        Fe,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = jn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Qu(e);
      var n = e.queue, r = lg.bind(null, Fe, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: Wu,
    useDeferredValue: function(e, n) {
      var r = jn();
      return ed(r, e, n);
    },
    useTransition: function() {
      var e = Qu(!1);
      return e = ng.bind(
        null,
        Fe,
        e.queue,
        !0,
        !1
      ), jn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var l = Fe, d = jn();
      if (lt) {
        if (r === void 0)
          throw Error(i(407));
        r = r();
      } else {
        if (r = n(), Nt === null)
          throw Error(i(349));
        (st & 127) !== 0 || Ap(l, n, r);
      }
      d.memoizedState = r;
      var h = { value: r, getSnapshot: n };
      return d.queue = h, Pp(Dp.bind(null, l, h, e), [
        e
      ]), l.flags |= 2048, Ns(
        9,
        { destroy: void 0 },
        kp.bind(
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
      var e = jn(), n = Nt.identifierPrefix;
      if (lt) {
        var r = ga, l = pa;
        r = (l & ~(1 << 32 - gt(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = ao++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = Sj++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: nd,
    useFormState: Hp,
    useActionState: Hp,
    useOptimistic: function(e) {
      var n = jn();
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
        Fe,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: Pu,
    useCacheRefresh: function() {
      return jn().memoizedState = Tj.bind(
        null,
        Fe
      );
    },
    useEffectEvent: function(e) {
      var n = jn(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((pt & 2) !== 0)
          throw Error(i(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, rd = {
    readContext: un,
    use: so,
    useCallback: Wp,
    useContext: un,
    useEffect: Ju,
    useImperativeHandle: Jp,
    useInsertionEffect: Xp,
    useLayoutEffect: Qp,
    useMemo: eg,
    useReducer: io,
    useRef: Gp,
    useState: function() {
      return io(_a);
    },
    useDebugValue: Wu,
    useDeferredValue: function(e, n) {
      var r = Gt();
      return tg(
        r,
        St.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = io(_a)[0], n = Gt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ti(e),
        n
      ];
    },
    useSyncExternalStore: Mp,
    useId: sg,
    useHostTransitionStatus: nd,
    useFormState: qp,
    useActionState: qp,
    useOptimistic: function(e, n) {
      var r = Gt();
      return Lp(r, St, e, n);
    },
    useMemoCache: Pu,
    useCacheRefresh: ig
  };
  rd.useEffectEvent = Kp;
  var dg = {
    readContext: un,
    use: so,
    useCallback: Wp,
    useContext: un,
    useEffect: Ju,
    useImperativeHandle: Jp,
    useInsertionEffect: Xp,
    useLayoutEffect: Qp,
    useMemo: eg,
    useReducer: Xu,
    useRef: Gp,
    useState: function() {
      return Xu(_a);
    },
    useDebugValue: Wu,
    useDeferredValue: function(e, n) {
      var r = Gt();
      return St === null ? ed(r, e, n) : tg(
        r,
        St.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Xu(_a)[0], n = Gt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ti(e),
        n
      ];
    },
    useSyncExternalStore: Mp,
    useId: sg,
    useHostTransitionStatus: nd,
    useFormState: Yp,
    useActionState: Yp,
    useOptimistic: function(e, n) {
      var r = Gt();
      return St !== null ? Lp(r, St, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Pu,
    useCacheRefresh: ig
  };
  dg.useEffectEvent = Kp;
  function sd(e, n, r, l) {
    n = e.memoizedState, r = r(l, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var id = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var l = In(), d = Za(l);
      d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (An(n, e, l), ji(n, e, l));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var l = In(), d = Za(l);
      d.tag = 1, d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (An(n, e, l), ji(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = In(), l = Za(r);
      l.tag = 2, n != null && (l.callback = n), n = Ja(e, l, r), n !== null && (An(n, e, r), ji(n, e, r));
    }
  };
  function fg(e, n, r, l, d, h, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, x) : n.prototype && n.prototype.isPureReactComponent ? !pi(r, l) || !pi(d, h) : !0;
  }
  function hg(e, n, r, l) {
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
  function mg(e) {
    Il(e);
  }
  function pg(e) {
    console.error(e);
  }
  function gg(e) {
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
  function vg(e, n, r) {
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
  function yg(e) {
    return e = Za(e), e.tag = 3, e;
  }
  function bg(e, n, r, l) {
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var h = l.value;
      e.payload = function() {
        return d(h);
      }, e.callback = function() {
        vg(n, r, l);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      vg(n, r, l), typeof d != "function" && (rr === null ? rr = /* @__PURE__ */ new Set([this]) : rr.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function _j(e, n, r, l, d) {
    if (r.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = r.alternate, n !== null && vs(
        n,
        r,
        d,
        !0
      ), r = $n.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return Qn === null ? jo() : r.alternate === null && Ht === 0 && (Ht = 3), r.flags &= -257, r.flags |= 65536, r.lanes = d, l === Zl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), kd(e, l, d)), !1;
          case 22:
            return r.flags |= 65536, l === Zl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : r.add(l)), kd(e, l, d)), !1;
        }
        throw Error(i(435, r.tag));
      }
      return kd(e, l, d), jo(), !1;
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
      ), $u(e, d), Ht !== 4 && (Ht = 2)), !1;
    var h = Error(i(520), { cause: l });
    if (h = Gn(h, r), $i === null ? $i = [h] : $i.push(h), Ht !== 4 && (Ht = 2), n === null) return !0;
    l = Gn(l, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = d & -d, r.lanes |= e, e = ld(r.stateNode, l, e), $u(r, e), !1;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (rr === null || !rr.has(h))))
            return r.flags |= 65536, d &= -d, r.lanes |= d, d = yg(d), bg(
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
  var od = Error(i(461)), en = !1;
  function dn(e, n, r, l) {
    n.child = e === null ? jp(n, null, r, l) : Br(
      n,
      e.child,
      r,
      l
    );
  }
  function xg(e, n, r, l, d) {
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
    ), E = Fu(), e !== null && !en ? (Yu(e, n, d), Ma(e, n, d)) : (lt && E && Eu(n), n.flags |= 1, dn(e, n, l, d), n.child);
  }
  function Sg(e, n, r, l, d) {
    if (e === null) {
      var h = r.type;
      return typeof h == "function" && !Su(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, wg(
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
  function wg(e, n, r, l, d) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (pi(h, l) && e.ref === n.ref)
        if (en = !1, n.pendingProps = l = h, gd(e, d))
          (e.flags & 131072) !== 0 && (en = !0);
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
  function jg(e, n, r, l) {
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
        return Eg(
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
        ), h !== null ? Cp(n, h) : Bu(), Tp(n);
      else
        return l = n.lanes = 536870912, Eg(
          e,
          n,
          h !== null ? h.baseLanes | r : r,
          r,
          l
        );
    } else
      h !== null ? (Xl(n, h.cachePool), Cp(n, h), er(), n.memoizedState = null) : (e !== null && Xl(n, null), Bu(), er());
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
  function Eg(e, n, r, l, d) {
    var h = Du();
    return h = h === null ? null : { parent: Jt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: r,
      cachePool: h
    }, e !== null && Xl(n, null), Bu(), Tp(n), e !== null && vs(e, n, l, !0), n.childLanes = d, null;
  }
  function fo(e, n) {
    return n = mo(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Ng(e, n, r) {
    return Br(n, e.child, null, r), e = fo(n, n.pendingProps), e.flags |= 2, Un(n), n.memoizedState = null, e;
  }
  function Mj(e, n, r) {
    var l = n.pendingProps, d = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (lt) {
        if (l.mode === "hidden")
          return e = fo(n, l), n.lanes = 536870912, Mi(null, e);
        if (Iu(n), (e = Dt) ? (e = $v(
          e,
          Xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: pa, overflow: ga } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = op(e), r.return = n, n.child = r, cn = n, Dt = null)) : e = null, e === null) throw Ka(n);
        return n.lanes = 536870912, null;
      }
      return fo(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var x = h.dehydrated;
      if (Iu(n), d)
        if (n.flags & 256)
          n.flags &= -257, n = Ng(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(i(558));
      else if (en || vs(e, n, r, !1), d = (r & e.childLanes) !== 0, en || d) {
        if (l = Nt, l !== null && (x = z(l, r), x !== 0 && x !== h.retryLane))
          throw h.retryLane = x, Ar(e, x), An(l, e, x), od;
        jo(), n = Ng(
          e,
          n,
          r
        );
      } else
        e = h.treeContext, Dt = Zn(x.nextSibling), cn = n, lt = !0, Pa = null, Xn = !1, e !== null && dp(n, e), n = fo(n, l), n.flags |= 4096;
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
    ), l = Fu(), e !== null && !en ? (Yu(e, n, d), Ma(e, n, d)) : (lt && l && Eu(n), n.flags |= 1, dn(e, n, r, d), n.child);
  }
  function Cg(e, n, r, l, d, h) {
    return Or(n), n.updateQueue = null, r = _p(
      n,
      l,
      r,
      d
    ), Rp(e), l = Fu(), e !== null && !en ? (Yu(e, n, h), Ma(e, n, h)) : (lt && l && Eu(n), n.flags |= 1, dn(e, n, r, h), n.child);
  }
  function Tg(e, n, r, l, d) {
    if (Or(n), n.stateNode === null) {
      var h = hs, x = r.contextType;
      typeof x == "object" && x !== null && (h = un(x)), h = new r(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = id, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, Ou(n), x = r.contextType, h.context = typeof x == "object" && x !== null ? un(x) : hs, h.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (sd(
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
      x = hs, typeof ue == "object" && ue !== null && (x = un(ue));
      var me = r.getDerivedStateFromProps;
      ue = typeof me == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, ue || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || ne !== x) && hg(
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
      ), ne = n.memoizedState), (L = Qa || fg(
        n,
        r,
        L,
        l,
        ie,
        ne,
        x
      )) ? (ue || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = ne), h.props = l, h.state = ne, h.context = x, l = L) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, Lu(e, n), x = n.memoizedProps, ue = Ir(r, x), h.props = ue, me = n.pendingProps, ie = h.context, ne = r.contextType, L = hs, typeof ne == "object" && ne !== null && (L = un(ne)), E = r.getDerivedStateFromProps, (ne = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== me || ie !== L) && hg(
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
      ), oe = n.memoizedState), (ue = Qa || fg(
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
  function Rg(e, n, r, l) {
    return Dr(), n.flags |= 256, dn(e, n, r, l), n.child;
  }
  var ud = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function dd(e) {
    return { baseLanes: e, cachePool: vp() };
  }
  function fd(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Vn), e;
  }
  function _g(e, n, r) {
    var l = n.pendingProps, d = !1, h = (n.flags & 128) !== 0, x;
    if ((x = h) || (x = e !== null && e.memoizedState === null ? !1 : (Yt.current & 2) !== 0), x && (d = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (lt) {
        if (d ? Wa(n) : er(), (e = Dt) ? (e = $v(
          e,
          Xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: pa, overflow: ga } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = op(e), r.return = n, n.child = r, cn = n, Dt = null)) : e = null, e === null) throw Ka(n);
        return Kd(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = l.children;
      return l = l.fallback, d ? (er(), d = n.mode, E = mo(
        { mode: "hidden", children: E },
        d
      ), l = kr(
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
        ), E = kr(
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
      } else if (en || vs(e, n, r, !1), x = (r & e.childLanes) !== 0, en || x) {
        if (x = Nt, x !== null && (l = z(x, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, Ar(e, l), An(x, e, l), od;
        Pd(E) || jo(), n = md(
          e,
          n,
          r
        );
      } else
        Pd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, Dt = Zn(
          E.nextSibling
        ), cn = n, lt = !0, Pa = null, Xn = !1, e !== null && dp(n, e), n = hd(
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
    ) : (E = kr(
      E,
      d,
      r,
      null
    ), E.flags |= 2), E.return = n, l.return = n, l.sibling = E, n.child = l, Mi(null, l), l = n.child, E = e.child.memoizedState, E === null ? E = dd(r) : (d = E.cachePool, d !== null ? (L = Jt._currentValue, d = d.parent !== L ? { parent: L, pool: L } : d) : d = vp(), E = {
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
  function Mg(e, n, r) {
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
  function Ag(e, n, r) {
    var l = n.pendingProps, d = l.revealOrder, h = l.tail;
    l = l.children;
    var x = Yt.current, E = (x & 2) !== 0;
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, Z(Yt, x), dn(e, n, l, r), l = lt ? vi : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Mg(e, r, n);
        else if (e.tag === 19)
          Mg(e, r, n);
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
        if (vs(
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
  function Aj(e, n, r) {
    switch (n.tag) {
      case 3:
        ye(n, n.stateNode.containerInfo), Xa(n, Jt, e.memoizedState.cache), Dr();
        break;
      case 27:
      case 5:
        Ge(n);
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
          return l.dehydrated !== null ? (Wa(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? _g(e, n, r) : (Wa(n), e = Ma(
            e,
            n,
            r
          ), e !== null ? e.sibling : null);
        Wa(n);
        break;
      case 19:
        var d = (e.flags & 128) !== 0;
        if (l = (r & n.childLanes) !== 0, l || (vs(
          e,
          n,
          r,
          !1
        ), l = (r & n.childLanes) !== 0), d) {
          if (l)
            return Ag(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), Z(Yt, Yt.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, jg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, Jt, e.memoizedState.cache);
    }
    return Ma(e, n, r);
  }
  function kg(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        en = !0;
      else {
        if (!gd(e, r) && (n.flags & 128) === 0)
          return en = !1, Aj(
            e,
            n,
            r
          );
        en = (e.flags & 131072) !== 0;
      }
    else
      en = !1, lt && (n.flags & 1048576) !== 0 && up(n, vi, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = $r(n.elementType), n.type = e, typeof e == "function")
            Su(e) ? (l = Ir(e, l), n.tag = 1, n = Tg(
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
                n.tag = 11, n = xg(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              } else if (d === re) {
                n.tag = 14, n = Sg(
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
        ), Tg(
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
          if (l = x.cache, Xa(n, Jt, l), l !== h.cache && Mu(
            n,
            [Jt],
            r,
            !0
          ), Ei(), l = x.element, h.isDehydrated)
            if (h = {
              element: l,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Rg(
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
              ), yi(d), n = Rg(
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
              for (Dt = Zn(e.firstChild), cn = n, lt = !0, Pa = null, Xn = !0, r = jp(
                n,
                null,
                l,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (Dr(), l === d) {
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
        return ho(e, n), e === null ? (r = qv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : lt || (r = n.type, e = n.pendingProps, l = Mo(
          J.current
        ).createElement(r), l[je] = n, l[Ee] = e, fn(l, r, e), Rt(l), n.stateNode = l) : n.memoizedState = qv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Ge(n), e === null && lt && (l = n.stateNode = Vv(
          n.type,
          n.pendingProps,
          J.current
        ), cn = n, Xn = !0, d = Dt, or(n.type) ? (Xd = d, Dt = Zn(l.firstChild)) : Dt = d), dn(
          e,
          n,
          n.pendingProps.children,
          r
        ), ho(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && lt && ((d = l = Dt) && (l = lE(
          l,
          n.type,
          n.pendingProps,
          Xn
        ), l !== null ? (n.stateNode = l, cn = n, Dt = Zn(l.firstChild), Xn = !1, d = !0) : d = !1), d || Ka(n)), Ge(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, Fd(d, h) ? l = null : x !== null && Fd(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = qu(
          e,
          n,
          wj,
          null,
          null,
          r
        ), Yi._currentValue = d), ho(e, n), dn(e, n, l, r), n.child;
      case 6:
        return e === null && lt && ((e = r = Dt) && (r = oE(
          r,
          n.pendingProps,
          Xn
        ), r !== null ? (n.stateNode = r, cn = n, Dt = null, e = !0) : e = !1), e || Ka(n)), null;
      case 13:
        return _g(e, n, r);
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
        return xg(
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
        return Sg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return wg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return Ag(e, n, r);
      case 31:
        return Mj(e, n, r);
      case 22:
        return jg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Or(n), l = un(Jt), e === null ? (d = Du(), d === null && (d = Nt, h = Au(), d.pooledCache = h, h.refCount++, h !== null && (d.pooledCacheLanes |= r), d = h), n.memoizedState = { parent: l, cache: d }, Ou(n), Xa(n, Jt, d)) : ((e.lanes & r) !== 0 && (Lu(e, n), Ni(n, null, null, r), Ei()), d = e.memoizedState, h = n.memoizedState, d.parent !== l ? (d = { parent: l, cache: l }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Xa(n, Jt, l)) : (l = h.cache, Xa(n, Jt, l), l !== d.cache && Mu(
          n,
          [Jt],
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
        else if (sv()) e.flags |= 8192;
        else
          throw Ur = Zl, zu;
    } else e.flags &= -16777217;
  }
  function Dg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Kv(n))
      if (sv()) e.flags |= 8192;
      else
        throw Ur = Zl, zu;
  }
  function po(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? mt() : 536870912, e.lanes |= n, _s |= n);
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
  function kj(e, n, r) {
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
        return r = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ta(Jt), Re(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (gs(n) ? Aa(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Tu())), zt(n), null;
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
          e = P.current, gs(n) ? fp(n) : (e = Vv(d, l, r), n.stateNode = e, Aa(n));
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
          if (h = P.current, gs(n))
            fp(n);
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
          if (e = J.current, gs(n)) {
            if (e = n.stateNode, r = n.memoizedProps, l = null, d = cn, d !== null)
              switch (d.tag) {
                case 27:
                case 5:
                  l = d.memoizedProps;
              }
            e[je] = n, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || _v(e.nodeValue, r)), e || Ka(n, !0);
          } else
            e = Mo(e).createTextNode(
              l
            ), e[je] = n, n.stateNode = e;
        }
        return zt(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = gs(n), r !== null) {
            if (e === null) {
              if (!l) throw Error(i(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(557));
              e[je] = n;
            } else
              Dr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
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
          if (d = gs(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(i(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(i(317));
              d[je] = n;
            } else
              Dr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
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
        if (H(Yt), l = n.memoizedState, l === null) return zt(n), null;
        if (d = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (d) Ai(l, !1);
          else {
            if (Ht !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = to(e), h !== null) {
                  for (n.flags |= 128, Ai(l, !1), e = h.updateQueue, n.updateQueue = e, po(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    lp(r, e), r = r.sibling;
                  return Z(
                    Yt,
                    Yt.current & 1 | 2
                  ), lt && Na(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && ht() > xo && (n.flags |= 128, d = !0, Ai(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = to(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, po(n, e), Ai(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !lt)
                return zt(n), null;
            } else
              2 * ht() - l.renderingStartTime > xo && r !== 536870912 && (n.flags |= 128, d = !0, Ai(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = ht(), e.sibling = null, r = Yt.current, Z(
          Yt,
          d ? r & 1 | 2 : r & 1
        ), lt && Na(n, l.treeForkCount), e) : (zt(n), null);
      case 22:
      case 23:
        return Un(n), Vu(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (zt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : zt(n), r = n.updateQueue, r !== null && po(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && H(Lr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ta(Jt), zt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function Dj(e, n) {
    switch (Nu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ta(Jt), Re(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ne(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Un(n), n.alternate === null)
            throw Error(i(340));
          Dr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (Un(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(i(340));
          Dr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return H(Yt), null;
      case 4:
        return Re(), null;
      case 10:
        return Ta(n.type), null;
      case 22:
      case 23:
        return Un(n), Vu(), e !== null && H(Lr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ta(Jt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function zg(e, n) {
    switch (Nu(n), n.tag) {
      case 3:
        Ta(Jt), Re();
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
        H(Yt);
        break;
      case 10:
        Ta(n.type);
        break;
      case 22:
      case 23:
        Un(n), Vu(), e !== null && H(Lr);
        break;
      case 24:
        Ta(Jt);
    }
  }
  function ki(e, n) {
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
      bt(n, n.return, E);
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
                bt(
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
      bt(n, n.return, ue);
    }
  }
  function Og(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        Np(n, r);
      } catch (l) {
        bt(e, e.return, l);
      }
    }
  }
  function Lg(e, n, r) {
    r.props = Ir(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (l) {
      bt(e, n, l);
    }
  }
  function Di(e, n) {
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
      bt(e, n, d);
    }
  }
  function va(e, n) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (d) {
          bt(e, n, d);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (d) {
          bt(e, n, d);
        }
      else r.current = null;
  }
  function $g(e) {
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
      bt(e, e.return, d);
    }
  }
  function yd(e, n, r) {
    try {
      var l = e.stateNode;
      tE(l, e.type, r, n), l[Ee] = n;
    } catch (d) {
      bt(e, e.return, d);
    }
  }
  function Ug(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && or(e.type) || e.tag === 4;
  }
  function bd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ug(e.return)) return null;
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
  function Bg(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, d = n.attributes; d.length; )
        n.removeAttributeNode(d[0]);
      fn(n, l, r), n[je] = e, n[Ee] = r;
    } catch (h) {
      bt(e, e.return, h);
    }
  }
  var ka = !1, tn = !1, Sd = !1, Vg = typeof WeakSet == "function" ? WeakSet : Set, on = null;
  function zj(e, n) {
    if (e = e.containerInfo, Hd = $o, e = Jm(e), mu(e)) {
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
                } catch (Ve) {
                  bt(
                    r,
                    r.return,
                    Ve
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
  function Ig(e, n, r) {
    var l = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        za(e, r), l & 4 && ki(5, r);
        break;
      case 1:
        if (za(e, r), l & 4)
          if (e = r.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              bt(r, r.return, x);
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
              bt(
                r,
                r.return,
                x
              );
            }
          }
        l & 64 && Og(r), l & 512 && Di(r, r.return);
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
            Np(e, n);
          } catch (x) {
            bt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && l & 4 && Bg(r);
      case 26:
      case 5:
        za(e, r), n === null && l & 4 && $g(r), l & 512 && Di(r, r.return);
        break;
      case 12:
        za(e, r);
        break;
      case 31:
        za(e, r), l & 4 && Fg(e, r);
        break;
      case 13:
        za(e, r), l & 4 && Yg(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = qj.bind(
          null,
          r
        ), cE(e, r))));
        break;
      case 22:
        if (l = r.memoizedState !== null || ka, !l) {
          n = n !== null && n.memoizedState !== null || tn, d = ka;
          var h = tn;
          ka = l, (tn = n) && !h ? Oa(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : za(e, r), ka = d, tn = h;
        }
        break;
      case 30:
        break;
      default:
        za(e, r);
    }
  }
  function Hg(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Hg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Et(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var $t = null, Tn = !1;
  function Da(e, n, r) {
    for (r = r.child; r !== null; )
      qg(e, n, r), r = r.sibling;
  }
  function qg(e, n, r) {
    if (Ot && typeof Ot.onCommitFiberUnmount == "function")
      try {
        Ot.onCommitFiberUnmount(pn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        tn || va(r, n), Da(
          e,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        tn || va(r, n);
        var l = $t, d = Tn;
        or(r.type) && ($t = r.stateNode, Tn = !1), Da(
          e,
          n,
          r
        ), Hi(r.stateNode), $t = l, Tn = d;
        break;
      case 5:
        tn || va(r, n);
      case 6:
        if (l = $t, d = Tn, $t = null, Da(
          e,
          n,
          r
        ), $t = l, Tn = d, $t !== null)
          if (Tn)
            try {
              ($t.nodeType === 9 ? $t.body : $t.nodeName === "HTML" ? $t.ownerDocument.body : $t).removeChild(r.stateNode);
            } catch (h) {
              bt(
                r,
                n,
                h
              );
            }
          else
            try {
              $t.removeChild(r.stateNode);
            } catch (h) {
              bt(
                r,
                n,
                h
              );
            }
        break;
      case 18:
        $t !== null && (Tn ? (e = $t, Ov(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), $s(e)) : Ov($t, r.stateNode));
        break;
      case 4:
        l = $t, d = Tn, $t = r.stateNode.containerInfo, Tn = !0, Da(
          e,
          n,
          r
        ), $t = l, Tn = d;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        tr(2, r, n), tn || tr(4, r, n), Da(
          e,
          n,
          r
        );
        break;
      case 1:
        tn || (va(r, n), l = r.stateNode, typeof l.componentWillUnmount == "function" && Lg(
          r,
          n,
          l
        )), Da(
          e,
          n,
          r
        );
        break;
      case 21:
        Da(
          e,
          n,
          r
        );
        break;
      case 22:
        tn = (l = tn) || r.memoizedState !== null, Da(
          e,
          n,
          r
        ), tn = l;
        break;
      default:
        Da(
          e,
          n,
          r
        );
    }
  }
  function Fg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        $s(e);
      } catch (r) {
        bt(n, n.return, r);
      }
    }
  }
  function Yg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        $s(e);
      } catch (r) {
        bt(n, n.return, r);
      }
  }
  function Oj(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Vg()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Vg()), n;
      default:
        throw Error(i(435, e.tag));
    }
  }
  function vo(e, n) {
    var r = Oj(e);
    n.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var d = Fj.bind(null, e, l);
        l.then(d, d);
      }
    });
  }
  function Rn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var l = 0; l < r.length; l++) {
        var d = r[l], h = e, x = n, E = x;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (or(E.type)) {
                $t = E.stateNode, Tn = !1;
                break e;
              }
              break;
            case 5:
              $t = E.stateNode, Tn = !1;
              break e;
            case 3:
            case 4:
              $t = E.stateNode.containerInfo, Tn = !0;
              break e;
          }
          E = E.return;
        }
        if ($t === null) throw Error(i(160));
        qg(h, x, d), $t = null, Tn = !1, h = d.alternate, h !== null && (h.return = null), d.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Gg(n, e), n = n.sibling;
  }
  var oa = null;
  function Gg(e, n) {
    var r = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Rn(n, e), _n(e), l & 4 && (tr(3, e, e.return), ki(3, e), tr(5, e, e.return));
        break;
      case 1:
        Rn(n, e), _n(e), l & 512 && (tn || r === null || va(r, r.return)), l & 64 && ka && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var d = oa;
        if (Rn(n, e), _n(e), l & 512 && (tn || r === null || va(r, r.return)), l & 4) {
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
                      var x = Gv(
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
                      if (x = Gv(
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
                Pv(
                  d,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Yv(
                d,
                l,
                e.memoizedProps
              );
          else
            h !== l ? (h === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : h.count--, l === null ? Pv(
              d,
              e.type,
              e.stateNode
            ) : Yv(
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
        Rn(n, e), _n(e), l & 512 && (tn || r === null || va(r, r.return)), r !== null && l & 4 && yd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (Rn(n, e), _n(e), l & 512 && (tn || r === null || va(r, r.return)), e.flags & 32) {
          d = e.stateNode;
          try {
            is(d, "");
          } catch (Me) {
            bt(e, e.return, Me);
          }
        }
        l & 4 && e.stateNode != null && (d = e.memoizedProps, yd(
          e,
          d,
          r !== null ? r.memoizedProps : d
        )), l & 1024 && (Sd = !0);
        break;
      case 6:
        if (Rn(n, e), _n(e), l & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (Me) {
            bt(e, e.return, Me);
          }
        }
        break;
      case 3:
        if (Do = null, d = oa, oa = Ao(n.containerInfo), Rn(n, e), oa = d, _n(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            $s(n.containerInfo);
          } catch (Me) {
            bt(e, e.return, Me);
          }
        Sd && (Sd = !1, Pg(e));
        break;
      case 4:
        l = oa, oa = Ao(
          e.stateNode.containerInfo
        ), Rn(n, e), _n(e), oa = l;
        break;
      case 12:
        Rn(n, e), _n(e);
        break;
      case 31:
        Rn(n, e), _n(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 13:
        Rn(n, e), _n(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (bo = ht()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, ne = ka, ue = tn;
        if (ka = ne || d, tn = ue || L, Rn(n, e), tn = ue, ka = ne, _n(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (r === null || L || ka || tn || Hr(e)), r = null, n = e; ; ) {
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
                  bt(L, L.return, Me);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = d ? "" : L.memoizedProps;
                } catch (Me) {
                  bt(L, L.return, Me);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var oe = L.stateNode;
                  d ? Lv(oe, !0) : Lv(L.stateNode, !1);
                } catch (Me) {
                  bt(L, L.return, Me);
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
        Rn(n, e), _n(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Rn(n, e), _n(e);
    }
  }
  function _n(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var r, l = e.return; l !== null; ) {
          if (Ug(l)) {
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
            r.flags & 32 && (is(x, ""), r.flags &= -33);
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
        bt(e, e.return, ue);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Pg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Pg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function za(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Ig(e, n.alternate, n), n = n.sibling;
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
          typeof r.componentWillUnmount == "function" && Lg(
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
          ), ki(4, h);
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
              bt(l, l.return, ne);
            }
          if (l = h, d = l.updateQueue, d !== null) {
            var E = l.stateNode;
            try {
              var L = d.shared.hiddenCallbacks;
              if (L !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < L.length; d++)
                  Ep(L[d], E);
            } catch (ne) {
              bt(l, l.return, ne);
            }
          }
          r && x & 64 && Og(h), Di(h, h.return);
          break;
        case 27:
          Bg(h);
        case 26:
        case 5:
          Oa(
            d,
            h,
            r
          ), r && l === null && x & 4 && $g(h), Di(h, h.return);
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
          ), r && x & 4 && Fg(d, h);
          break;
        case 13:
          Oa(
            d,
            h,
            r
          ), r && x & 4 && Yg(d, h);
          break;
        case 22:
          h.memoizedState === null && Oa(
            d,
            h,
            r
          ), Di(h, h.return);
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
        Kg(
          e,
          n,
          r,
          l
        ), n = n.sibling;
  }
  function Kg(e, n, r, l) {
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
        ), d & 2048 && ki(9, n);
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
            bt(n, n.return, L);
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
        ) : (h._visibility |= 2, Cs(
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
  function Cs(e, n, r, l, d) {
    for (d = d && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = e, x = n, E = r, L = l, ne = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Cs(
            h,
            x,
            E,
            L,
            d
          ), ki(8, x);
          break;
        case 23:
          break;
        case 22:
          var ue = x.stateNode;
          x.memoizedState !== null ? ue._visibility & 2 ? Cs(
            h,
            x,
            E,
            L,
            d
          ) : zi(
            h,
            x
          ) : (ue._visibility |= 2, Cs(
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
          Cs(
            h,
            x,
            E,
            L,
            d
          ), d && ne & 2048 && jd(x.alternate, x);
          break;
        default:
          Cs(
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
  function Ts(e, n, r) {
    if (e.subtreeFlags & Oi)
      for (e = e.child; e !== null; )
        Xg(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function Xg(e, n, r) {
    switch (e.tag) {
      case 26:
        Ts(
          e,
          n,
          r
        ), e.flags & Oi && e.memoizedState !== null && SE(
          r,
          oa,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ts(
          e,
          n,
          r
        );
        break;
      case 3:
      case 4:
        var l = oa;
        oa = Ao(e.stateNode.containerInfo), Ts(
          e,
          n,
          r
        ), oa = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Oi, Oi = 16777216, Ts(
          e,
          n,
          r
        ), Oi = l) : Ts(
          e,
          n,
          r
        ));
        break;
      default:
        Ts(
          e,
          n,
          r
        );
    }
  }
  function Qg(e) {
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
          on = l, Jg(
            l,
            e
          );
        }
      Qg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Zg(e), e = e.sibling;
  }
  function Zg(e) {
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
          on = l, Jg(
            l,
            e
          );
        }
      Qg(e);
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
  function Jg(e, n) {
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
          if (Hg(l), l === r) {
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
  var Lj = {
    getCacheForType: function(e) {
      var n = un(Jt), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return un(Jt).controller.signal;
    }
  }, $j = typeof WeakMap == "function" ? WeakMap : Map, pt = 0, Nt = null, et = null, st = 0, yt = 0, Bn = null, nr = !1, Rs = !1, Ed = !1, La = 0, Ht = 0, ar = 0, qr = 0, Nd = 0, Vn = 0, _s = 0, $i = null, Mn = null, Cd = !1, bo = 0, Wg = 0, xo = 1 / 0, So = null, rr = null, rn = 0, sr = null, Ms = null, $a = 0, Td = 0, Rd = null, ev = null, Ui = 0, _d = null;
  function In() {
    return (pt & 2) !== 0 && st !== 0 ? st & -st : A.T !== null ? Od() : ve();
  }
  function tv() {
    if (Vn === 0)
      if ((st & 536870912) === 0 || lt) {
        var e = U;
        U <<= 1, (U & 3932160) === 0 && (U = 262144), Vn = e;
      } else Vn = 536870912;
    return e = $n.current, e !== null && (e.flags |= 32), Vn;
  }
  function An(e, n, r) {
    (e === Nt && (yt === 2 || yt === 9) || e.cancelPendingCommit !== null) && (As(e, 0), ir(
      e,
      st,
      Vn,
      !1
    )), rt(e, r), ((pt & 2) === 0 || e !== Nt) && (e === Nt && ((pt & 2) === 0 && (qr |= r), Ht === 4 && ir(
      e,
      st,
      Vn,
      !1
    )), ya(e));
  }
  function nv(e, n, r) {
    if ((pt & 6) !== 0) throw Error(i(327));
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || Ue(e, n), d = l ? Vj(e, n) : Ad(e, n, !0), h = l;
    do {
      if (d === 0) {
        Rs && !l && ir(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, h && !Uj(r)) {
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
              if (L && (As(E, x).flags |= 256), x = Ad(
                E,
                x,
                !1
              ), x !== 2) {
                if (Ed && !L) {
                  E.errorRecoveryDisabledLanes |= h, qr |= h, d = 4;
                  break e;
                }
                h = Mn, Mn = d, h !== null && (Mn === null ? Mn = h : Mn.push.apply(
                  Mn,
                  h
                ));
              }
              d = x;
            }
            if (h = !1, d !== 2) continue;
          }
        }
        if (d === 1) {
          As(e, 0), ir(e, n, 0, !0);
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
              Mn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((n & 62914560) === n && (d = bo + 300 - ht(), 10 < d)) {
            if (ir(
              l,
              n,
              Vn,
              !nr
            ), ge(l, 0, !0) !== 0) break e;
            $a = n, l.timeoutHandle = Dv(
              av.bind(
                null,
                l,
                r,
                Mn,
                So,
                Cd,
                n,
                Vn,
                qr,
                _s,
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
          av(
            l,
            r,
            Mn,
            So,
            Cd,
            n,
            Vn,
            qr,
            _s,
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
  function av(e, n, r, l, d, h, x, E, L, ne, ue, me, ie, oe) {
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
      }, Xg(
        n,
        h,
        me
      );
      var Me = (h & 62914560) === h ? bo - ht() : (h & 4194048) === h ? Wg - ht() : 0;
      if (Me = wE(
        me,
        Me
      ), Me !== null) {
        $a = h, e.cancelPendingCommit = Me(
          dv.bind(
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
    dv(
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
  function Uj(e) {
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
      var h = 31 - gt(d), x = 1 << h;
      l[h] = -1, d &= ~x;
    }
    r !== 0 && wn(e, r, n);
  }
  function wo() {
    return (pt & 6) === 0 ? (Bi(0), !1) : !0;
  }
  function Md() {
    if (et !== null) {
      if (yt === 0)
        var e = et.return;
      else
        e = et, Ca = zr = null, Gu(e), Ss = null, Si = 0, e = et;
      for (; e !== null; )
        zg(e.alternate, e), e = e.return;
      et = null;
    }
  }
  function As(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, rE(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), $a = 0, Md(), Nt = e, et = r = Ea(e.current, null), st = n, yt = 0, Bn = null, nr = !1, Rs = Ue(e, n), Ed = !1, _s = Vn = Nd = qr = ar = Ht = 0, Mn = $i = null, Cd = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - gt(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return La = n, Hl(), r;
  }
  function rv(e, n) {
    Fe = null, A.H = _i, n === xs || n === Ql ? (n = xp(), yt = 3) : n === zu ? (n = xp(), yt = 4) : yt = n === od ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Bn = n, et === null && (Ht = 1, uo(
      e,
      Gn(n, e.current)
    ));
  }
  function sv() {
    var e = $n.current;
    return e === null ? !0 : (st & 4194048) === st ? Qn === null : (st & 62914560) === st || (st & 536870912) !== 0 ? e === Qn : !1;
  }
  function iv() {
    var e = A.H;
    return A.H = _i, e === null ? _i : e;
  }
  function lv() {
    var e = A.A;
    return A.A = Lj, e;
  }
  function jo() {
    Ht = 4, nr || (st & 4194048) !== st && $n.current !== null || (Rs = !0), (ar & 134217727) === 0 && (qr & 134217727) === 0 || Nt === null || ir(
      Nt,
      st,
      Vn,
      !1
    );
  }
  function Ad(e, n, r) {
    var l = pt;
    pt |= 2;
    var d = iv(), h = lv();
    (Nt !== e || st !== n) && (So = null, As(e, n)), n = !1;
    var x = Ht;
    e: do
      try {
        if (yt !== 0 && et !== null) {
          var E = et, L = Bn;
          switch (yt) {
            case 8:
              Md(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              $n.current === null && (n = !0);
              var ne = yt;
              if (yt = 0, Bn = null, ks(e, E, L, ne), r && Rs) {
                x = 0;
                break e;
              }
              break;
            default:
              ne = yt, yt = 0, Bn = null, ks(e, E, L, ne);
          }
        }
        Bj(), x = Ht;
        break;
      } catch (ue) {
        rv(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ca = zr = null, pt = l, A.H = d, A.A = h, et === null && (Nt = null, st = 0, Hl()), x;
  }
  function Bj() {
    for (; et !== null; ) ov(et);
  }
  function Vj(e, n) {
    var r = pt;
    pt |= 2;
    var l = iv(), d = lv();
    Nt !== e || st !== n ? (So = null, xo = ht() + 500, As(e, n)) : Rs = Ue(
      e,
      n
    );
    e: do
      try {
        if (yt !== 0 && et !== null) {
          n = et;
          var h = Bn;
          t: switch (yt) {
            case 1:
              yt = 0, Bn = null, ks(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (yp(h)) {
                yt = 0, Bn = null, cv(n);
                break;
              }
              n = function() {
                yt !== 2 && yt !== 9 || Nt !== e || (yt = 7), ya(e);
              }, h.then(n, n);
              break e;
            case 3:
              yt = 7;
              break e;
            case 4:
              yt = 5;
              break e;
            case 7:
              yp(h) ? (yt = 0, Bn = null, cv(n)) : (yt = 0, Bn = null, ks(e, n, h, 7));
              break;
            case 5:
              var x = null;
              switch (et.tag) {
                case 26:
                  x = et.memoizedState;
                case 5:
                case 27:
                  var E = et;
                  if (x ? Kv(x) : E.stateNode.complete) {
                    yt = 0, Bn = null;
                    var L = E.sibling;
                    if (L !== null) et = L;
                    else {
                      var ne = E.return;
                      ne !== null ? (et = ne, Eo(ne)) : et = null;
                    }
                    break t;
                  }
              }
              yt = 0, Bn = null, ks(e, n, h, 5);
              break;
            case 6:
              yt = 0, Bn = null, ks(e, n, h, 6);
              break;
            case 8:
              Md(), Ht = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        Ij();
        break;
      } catch (ue) {
        rv(e, ue);
      }
    while (!0);
    return Ca = zr = null, A.H = l, A.A = d, pt = r, et !== null ? 0 : (Nt = null, st = 0, Hl(), Ht);
  }
  function Ij() {
    for (; et !== null && !ot(); )
      ov(et);
  }
  function ov(e) {
    var n = kg(e.alternate, e, La);
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : et = n;
  }
  function cv(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Cg(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          st
        );
        break;
      case 11:
        n = Cg(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          st
        );
        break;
      case 5:
        Gu(n);
      default:
        zg(r, n), n = et = lp(n, La), n = kg(r, n, La);
    }
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : et = n;
  }
  function ks(e, n, r, l) {
    Ca = zr = null, Gu(n), Ss = null, Si = 0;
    var d = n.return;
    try {
      if (_j(
        e,
        d,
        n,
        r,
        st
      )) {
        Ht = 1, uo(
          e,
          Gn(r, e.current)
        ), et = null;
        return;
      }
    } catch (h) {
      if (d !== null) throw et = d, h;
      Ht = 1, uo(
        e,
        Gn(r, e.current)
      ), et = null;
      return;
    }
    n.flags & 32768 ? (lt || l === 1 ? e = !0 : Rs || (st & 536870912) !== 0 ? e = !1 : (nr = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = $n.current, l !== null && l.tag === 13 && (l.flags |= 16384))), uv(n, e)) : Eo(n);
  }
  function Eo(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        uv(
          n,
          nr
        );
        return;
      }
      e = n.return;
      var r = kj(
        n.alternate,
        n,
        La
      );
      if (r !== null) {
        et = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        et = n;
        return;
      }
      et = n = e;
    } while (n !== null);
    Ht === 0 && (Ht = 5);
  }
  function uv(e, n) {
    do {
      var r = Dj(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, et = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        et = e;
        return;
      }
      et = e = r;
    } while (e !== null);
    Ht = 6, et = null;
  }
  function dv(e, n, r, l, d, h, x, E, L) {
    e.cancelPendingCommit = null;
    do
      No();
    while (rn !== 0);
    if ((pt & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === e.current) throw Error(i(177));
      if (h = n.lanes | n.childLanes, h |= bu, qt(
        e,
        r,
        h,
        x,
        E,
        L
      ), e === Nt && (et = Nt = null, st = 0), Ms = n, sr = e, $a = r, Td = h, Rd = d, ev = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Yj(ct, function() {
        return gv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = A.T, A.T = null, d = G.p, G.p = 2, x = pt, pt |= 4;
        try {
          zj(e, n, r);
        } finally {
          pt = x, G.p = d, A.T = l;
        }
      }
      rn = 1, fv(), hv(), mv();
    }
  }
  function fv() {
    if (rn === 1) {
      rn = 0;
      var e = sr, n = Ms, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = A.T, A.T = null;
        var l = G.p;
        G.p = 2;
        var d = pt;
        pt |= 4;
        try {
          Gg(n, e);
          var h = qd, x = Jm(e.containerInfo), E = h.focusedElem, L = h.selectionRange;
          if (x !== E && E && E.ownerDocument && Zm(
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
                  var oe = ie.getSelection(), Me = E.textContent.length, Ve = Math.min(L.start, Me), jt = L.end === void 0 ? Ve : Math.min(L.end, Me);
                  !oe.extend && Ve > jt && (x = jt, jt = Ve, Ve = x);
                  var X = Qm(
                    E,
                    Ve
                  ), I = Qm(
                    E,
                    jt
                  );
                  if (X && I && (oe.rangeCount !== 1 || oe.anchorNode !== X.node || oe.anchorOffset !== X.offset || oe.focusNode !== I.node || oe.focusOffset !== I.offset)) {
                    var te = me.createRange();
                    te.setStart(X.node, X.offset), oe.removeAllRanges(), Ve > jt ? (oe.addRange(te), oe.extend(I.node, I.offset)) : (te.setEnd(I.node, I.offset), oe.addRange(te));
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
          pt = d, G.p = l, A.T = r;
        }
      }
      e.current = n, rn = 2;
    }
  }
  function hv() {
    if (rn === 2) {
      rn = 0;
      var e = sr, n = Ms, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = A.T, A.T = null;
        var l = G.p;
        G.p = 2;
        var d = pt;
        pt |= 4;
        try {
          Ig(e, n.alternate, n);
        } finally {
          pt = d, G.p = l, A.T = r;
        }
      }
      rn = 3;
    }
  }
  function mv() {
    if (rn === 4 || rn === 3) {
      rn = 0, sn();
      var e = sr, n = Ms, r = $a, l = ev;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? rn = 5 : (rn = 0, Ms = sr = null, pv(e, e.pendingLanes));
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
        n = A.T, d = G.p, G.p = 2, A.T = null;
        try {
          for (var h = e.onRecoverableError, x = 0; x < l.length; x++) {
            var E = l[x];
            h(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          A.T = n, G.p = d;
        }
      }
      ($a & 3) !== 0 && No(), ya(e), d = e.pendingLanes, (r & 261930) !== 0 && (d & 42) !== 0 ? e === _d ? Ui++ : (Ui = 0, _d = e) : Ui = 0, Bi(0);
    }
  }
  function pv(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, bi(n)));
  }
  function No() {
    return fv(), hv(), mv(), gv();
  }
  function gv() {
    if (rn !== 5) return !1;
    var e = sr, n = Td;
    Td = 0;
    var r = ee($a), l = A.T, d = G.p;
    try {
      G.p = 32 > r ? 32 : r, A.T = null, r = Rd, Rd = null;
      var h = sr, x = $a;
      if (rn = 0, Ms = sr = null, $a = 0, (pt & 6) !== 0) throw Error(i(331));
      var E = pt;
      if (pt |= 4, Zg(h.current), Kg(
        h,
        h.current,
        x,
        r
      ), pt = E, Bi(0, !1), Ot && typeof Ot.onPostCommitFiberRoot == "function")
        try {
          Ot.onPostCommitFiberRoot(pn, h);
        } catch {
        }
      return !0;
    } finally {
      G.p = d, A.T = l, pv(e, n);
    }
  }
  function vv(e, n, r) {
    n = Gn(r, n), n = ld(e.stateNode, n, 2), e = Ja(e, n, 2), e !== null && (rt(e, 2), ya(e));
  }
  function bt(e, n, r) {
    if (e.tag === 3)
      vv(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          vv(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (rr === null || !rr.has(l))) {
            e = Gn(r, e), r = yg(2), l = Ja(n, r, 2), l !== null && (bg(
              r,
              l,
              n,
              e
            ), rt(l, 2), ya(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function kd(e, n, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new $j();
      var d = /* @__PURE__ */ new Set();
      l.set(n, d);
    } else
      d = l.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), l.set(n, d));
    d.has(r) || (Ed = !0, d.add(r), e = Hj.bind(null, e, n, r), n.then(e, e));
  }
  function Hj(e, n, r) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, Nt === e && (st & r) === r && (Ht === 4 || Ht === 3 && (st & 62914560) === st && 300 > ht() - bo ? (pt & 2) === 0 && As(e, 0) : Nd |= r, _s === st && (_s = 0)), ya(e);
  }
  function yv(e, n) {
    n === 0 && (n = mt()), e = Ar(e, n), e !== null && (rt(e, n), ya(e));
  }
  function qj(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), yv(e, r);
  }
  function Fj(e, n) {
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
    l !== null && l.delete(n), yv(e, r);
  }
  function Yj(e, n) {
    return Xt(e, n);
  }
  var Co = null, Ds = null, Dd = !1, To = !1, zd = !1, lr = 0;
  function ya(e) {
    e !== Ds && e.next === null && (Ds === null ? Co = Ds = e : Ds = Ds.next = e), To = !0, Dd || (Dd = !0, Pj());
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
              h = (1 << 31 - gt(42 | e) + 1) - 1, h &= d & ~(x & ~E), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, wv(l, h));
          } else
            h = st, h = ge(
              l,
              l === Nt ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || Ue(l, h) || (r = !0, wv(l, h));
          l = l.next;
        }
      while (r);
      zd = !1;
    }
  }
  function Gj() {
    bv();
  }
  function bv() {
    To = Dd = !1;
    var e = 0;
    lr !== 0 && aE() && (e = lr);
    for (var n = ht(), r = null, l = Co; l !== null; ) {
      var d = l.next, h = xv(l, n);
      h === 0 ? (l.next = null, r === null ? Co = d : r.next = d, d === null && (Ds = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (To = !0)), l = d;
    }
    rn !== 0 && rn !== 5 || Bi(e), lr !== 0 && (lr = 0);
  }
  function xv(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - gt(h), E = 1 << x, L = d[x];
      L === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = Xe(E, n)) : L <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = Nt, r = st, r = ge(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === n && (yt === 2 || yt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && En(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || Ue(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (l !== null && En(l), ee(r)) {
        case 2:
        case 8:
          r = Ke;
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
      return l = Sv.bind(null, e), r = Xt(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && En(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Sv(e, n) {
    if (rn !== 0 && rn !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (No() && e.callbackNode !== r)
      return null;
    var l = st;
    return l = ge(
      e,
      e === Nt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (nv(e, l, n), xv(e, ht()), e.callbackNode != null && e.callbackNode === r ? Sv.bind(null, e) : null);
  }
  function wv(e, n) {
    if (No()) return null;
    nv(e, n, !0);
  }
  function Pj() {
    sE(function() {
      (pt & 6) !== 0 ? Xt(
        Le,
        Gj
      ) : bv();
    });
  }
  function Od() {
    if (lr === 0) {
      var e = ys;
      e === 0 && (e = Ce, Ce <<= 1, (Ce & 261888) === 0 && (Ce = 256)), lr = e;
    }
    return lr;
  }
  function jv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : zl("" + e);
  }
  function Ev(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function Kj(e, n, r, l, d) {
    if (n === "submit" && r && r.stateNode === d) {
      var h = jv(
        (d[Ee] || null).action
      ), x = l.submitter;
      x && (n = (n = x[Ee] || null) ? jv(n.formAction) : x.getAttribute("formAction"), n !== null && (h = n, x = null));
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
                  var L = x ? Ev(d, x) : new FormData(d);
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
                typeof h == "function" && (E.preventDefault(), L = x ? Ev(d, x) : new FormData(d), td(
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
    var $d = yu[Ld], Xj = $d.toLowerCase(), Qj = $d[0].toUpperCase() + $d.slice(1);
    la(
      Xj,
      "on" + Qj
    );
  }
  la(tp, "onAnimationEnd"), la(np, "onAnimationIteration"), la(ap, "onAnimationStart"), la("dblclick", "onDoubleClick"), la("focusin", "onFocus"), la("focusout", "onBlur"), la(fj, "onTransitionRun"), la(hj, "onTransitionStart"), la(mj, "onTransitionCancel"), la(rp, "onTransitionEnd"), ha("onMouseEnter", ["mouseout", "mouseover"]), ha("onMouseLeave", ["mouseout", "mouseover"]), ha("onPointerEnter", ["pointerout", "pointerover"]), ha("onPointerLeave", ["pointerout", "pointerover"]), ln(
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
  ), Zj = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vi)
  );
  function Nv(e, n) {
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
  function tt(e, n) {
    var r = n[Te];
    r === void 0 && (r = n[Te] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (Cv(n, e, 2, !1), r.add(l));
  }
  function Ud(e, n, r) {
    var l = 0;
    n && (l |= 4), Cv(
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
        r !== "selectionchange" && (Zj.has(r) || Ud(r, !1, e), Ud(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Ro] || (n[Ro] = !0, Ud("selectionchange", !1, n));
    }
  }
  function Cv(e, n, r, l) {
    switch (ty(n)) {
      case 2:
        var d = NE;
        break;
      case 8:
        d = CE;
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
    Am(function() {
      var ne = h, ue = au(r), me = [];
      e: {
        var ie = sp.get(e);
        if (ie !== void 0) {
          var oe = Ul, Me = e;
          switch (e) {
            case "keypress":
              if (Ll(r) === 0) break e;
            case "keydown":
            case "keyup":
              oe = Fw;
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
              oe = zm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = kw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = Pw;
              break;
            case tp:
            case np:
            case ap:
              oe = Ow;
              break;
            case rp:
              oe = Xw;
              break;
            case "scroll":
            case "scrollend":
              oe = Mw;
              break;
            case "wheel":
              oe = Zw;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = $w;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = Lm;
              break;
            case "toggle":
            case "beforetoggle":
              oe = Ww;
          }
          var Ve = (n & 4) !== 0, jt = !Ve && (e === "scroll" || e === "scrollend"), X = Ve ? ie !== null ? ie + "Capture" : null : ie;
          Ve = [];
          for (var I = ne, te; I !== null; ) {
            var he = I;
            if (te = he.stateNode, he = he.tag, he !== 5 && he !== 26 && he !== 27 || te === null || X === null || (he = oi(I, X), he != null && Ve.push(
              Ii(I, he, te)
            )), jt) break;
            I = I.return;
          }
          0 < Ve.length && (ie = new oe(
            ie,
            Me,
            null,
            r,
            ue
          ), me.push({ event: ie, listeners: Ve }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (ie = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", ie && r !== nu && (Me = r.relatedTarget || r.fromElement) && (xt(Me) || Me[De]))
            break e;
          if ((oe || ie) && (ie = ue.window === ue ? ue : (ie = ue.ownerDocument) ? ie.defaultView || ie.parentWindow : window, oe ? (Me = r.relatedTarget || r.toElement, oe = ne, Me = Me ? xt(Me) : null, Me !== null && (jt = u(Me), Ve = Me.tag, Me !== jt || Ve !== 5 && Ve !== 27 && Ve !== 6) && (Me = null)) : (oe = null, Me = ne), oe !== Me)) {
            if (Ve = zm, he = "onMouseLeave", X = "onMouseEnter", I = "mouse", (e === "pointerout" || e === "pointerover") && (Ve = Lm, he = "onPointerLeave", X = "onPointerEnter", I = "pointer"), jt = oe == null ? ie : We(oe), te = Me == null ? ie : We(Me), ie = new Ve(
              he,
              I + "leave",
              oe,
              r,
              ue
            ), ie.target = jt, ie.relatedTarget = te, he = null, xt(ue) === ne && (Ve = new Ve(
              X,
              I + "enter",
              Me,
              r,
              ue
            ), Ve.target = te, Ve.relatedTarget = jt, he = Ve), jt = he, oe && Me)
              t: {
                for (Ve = Jj, X = oe, I = Me, te = 0, he = X; he; he = Ve(he))
                  te++;
                he = 0;
                for (var $e = I; $e; $e = Ve($e))
                  he++;
                for (; 0 < te - he; )
                  X = Ve(X), te--;
                for (; 0 < he - te; )
                  I = Ve(I), he--;
                for (; te--; ) {
                  if (X === I || I !== null && X === I.alternate) {
                    Ve = X;
                    break t;
                  }
                  X = Ve(X), I = Ve(I);
                }
                Ve = null;
              }
            else Ve = null;
            oe !== null && Tv(
              me,
              ie,
              oe,
              Ve,
              !1
            ), Me !== null && jt !== null && Tv(
              me,
              jt,
              Me,
              Ve,
              !0
            );
          }
        }
        e: {
          if (ie = ne ? We(ne) : window, oe = ie.nodeName && ie.nodeName.toLowerCase(), oe === "select" || oe === "input" && ie.type === "file")
            var dt = Fm;
          else if (Hm(ie))
            if (Ym)
              dt = cj;
            else {
              dt = lj;
              var ze = ij;
            }
          else
            oe = ie.nodeName, !oe || oe.toLowerCase() !== "input" || ie.type !== "checkbox" && ie.type !== "radio" ? ne && tu(ne.elementType) && (dt = Fm) : dt = oj;
          if (dt && (dt = dt(e, ne))) {
            qm(
              me,
              dt,
              r,
              ue
            );
            break e;
          }
          ze && ze(e, ie, ne), e === "focusout" && ne && ie.type === "number" && ne.memoizedProps.value != null && eu(ie, "number", ie.value);
        }
        switch (ze = ne ? We(ne) : window, e) {
          case "focusin":
            (Hm(ze) || ze.contentEditable === "true") && (us = ze, pu = ne, gi = null);
            break;
          case "focusout":
            gi = pu = us = null;
            break;
          case "mousedown":
            gu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gu = !1, Wm(me, r, ue);
            break;
          case "selectionchange":
            if (dj) break;
          case "keydown":
          case "keyup":
            Wm(me, r, ue);
        }
        var Pe;
        if (du)
          e: {
            switch (e) {
              case "compositionstart":
                var it = "onCompositionStart";
                break e;
              case "compositionend":
                it = "onCompositionEnd";
                break e;
              case "compositionupdate":
                it = "onCompositionUpdate";
                break e;
            }
            it = void 0;
          }
        else
          cs ? Vm(e, r) && (it = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (it = "onCompositionStart");
        it && ($m && r.locale !== "ko" && (cs || it !== "onCompositionStart" ? it === "onCompositionEnd" && cs && (Pe = km()) : (Ya = ue, iu = "value" in Ya ? Ya.value : Ya.textContent, cs = !0)), ze = _o(ne, it), 0 < ze.length && (it = new Om(
          it,
          e,
          null,
          r,
          ue
        ), me.push({ event: it, listeners: ze }), Pe ? it.data = Pe : (Pe = Im(r), Pe !== null && (it.data = Pe)))), (Pe = tj ? nj(e, r) : aj(e, r)) && (it = _o(ne, "onBeforeInput"), 0 < it.length && (ze = new Om(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ue
        ), me.push({
          event: ze,
          listeners: it
        }), ze.data = Pe)), Kj(
          me,
          e,
          ne,
          r,
          ue
        );
      }
      Nv(me, n);
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
  function Jj(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Tv(e, n, r, l, d) {
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
  var Wj = /\r\n?/g, eE = /\u0000|\uFFFD/g;
  function Rv(e) {
    return (typeof e == "string" ? e : "" + e).replace(Wj, `
`).replace(eE, "");
  }
  function _v(e, n) {
    return n = Rv(n), Rv(e) === n;
  }
  function wt(e, n, r, l, d, h) {
    switch (r) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || is(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && is(e, "" + l);
        break;
      case "className":
        Ft(e, "class", l);
        break;
      case "tabIndex":
        Ft(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ft(e, r, l);
        break;
      case "style":
        _m(e, l, h);
        break;
      case "data":
        if (n !== "object") {
          Ft(e, "data", l);
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
        l != null && tt("scroll", e);
        break;
      case "onScrollEnd":
        l != null && tt("scrollend", e);
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
        tt("beforetoggle", e), tt("toggle", e), Ze(e, "popover", l);
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
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = Rw.get(r) || r, Ze(e, r, l));
    }
  }
  function Id(e, n, r, l, d, h) {
    switch (r) {
      case "style":
        _m(e, l, h);
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
        typeof l == "string" ? is(e, l) : (typeof l == "number" || typeof l == "bigint") && is(e, "" + l);
        break;
      case "onScroll":
        l != null && tt("scroll", e);
        break;
      case "onScrollEnd":
        l != null && tt("scrollend", e);
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
        tt("error", e), tt("load", e);
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
        tt("invalid", e);
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
        Nm(
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
        tt("invalid", e), l = x = h = null;
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
        n = h, r = x, e.multiple = !!l, n != null ? ss(e, !!l, n, !1) : r != null && ss(e, !!l, r, !0);
        return;
      case "textarea":
        tt("invalid", e), h = d = l = null;
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
        Tm(e, l, d, h);
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
        tt("beforetoggle", e), tt("toggle", e), tt("cancel", e), tt("close", e);
        break;
      case "iframe":
      case "object":
        tt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Vi.length; l++)
          tt(Vi[l], e);
        break;
      case "image":
        tt("error", e), tt("load", e);
        break;
      case "details":
        tt("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        tt("error", e), tt("load", e);
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
  function tE(e, n, r, l) {
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
        n = E, r = x, l = oe, ie != null ? ss(e, !!r, ie, !1) : !!l != !!r && (n != null ? ss(e, !!r, n, !0) : ss(e, !!r, r ? [] : "", !1));
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
        Cm(e, ie, oe);
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
        for (var Ve in r)
          ie = r[Ve], r.hasOwnProperty(Ve) && ie != null && !l.hasOwnProperty(Ve) && wt(e, n, Ve, null, l, ie);
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
  function Mv(e) {
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
  function nE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var d = r[l], h = d.transferSize, x = d.initiatorType, E = d.duration;
        if (h && E && Mv(x)) {
          for (x = 0, E = d.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], ne = L.startTime;
            if (ne > E) break;
            var ue = L.transferSize, me = L.initiatorType;
            ue && Mv(me) && (L = L.responseEnd, x += ue * (L < E ? 1 : (E - ne) / (L - ne)));
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
  function Av(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function kv(e, n) {
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
  function aE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Yd ? !1 : (Yd = e, !0) : (Yd = null, !1);
  }
  var Dv = typeof setTimeout == "function" ? setTimeout : void 0, rE = typeof clearTimeout == "function" ? clearTimeout : void 0, zv = typeof Promise == "function" ? Promise : void 0, sE = typeof queueMicrotask == "function" ? queueMicrotask : typeof zv < "u" ? function(e) {
    return zv.resolve(null).then(e).catch(iE);
  } : Dv;
  function iE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function or(e) {
    return e === "head";
  }
  function Ov(e, n) {
    var r = n, l = 0;
    do {
      var d = r.nextSibling;
      if (e.removeChild(r), d && d.nodeType === 8)
        if (r = d.data, r === "/$" || r === "/&") {
          if (l === 0) {
            e.removeChild(d), $s(n);
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
    $s(n);
  }
  function Lv(e, n) {
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
  function lE(e, n, r, l) {
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
  function oE(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = Zn(e.nextSibling), e === null)) return null;
    return e;
  }
  function $v(e, n) {
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
  function cE(e, n) {
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
  function Uv(e) {
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
  function Bv(e) {
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
  function Vv(e, n, r) {
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
  var Jn = /* @__PURE__ */ new Map(), Iv = /* @__PURE__ */ new Set();
  function Ao(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ua = G.d;
  G.d = {
    f: uE,
    r: dE,
    D: fE,
    C: hE,
    L: mE,
    m: pE,
    X: vE,
    S: gE,
    M: yE
  };
  function uE() {
    var e = Ua.f(), n = wo();
    return e || n;
  }
  function dE(e) {
    var n = Lt(e);
    n !== null && n.tag === 5 && n.type === "form" ? rg(n) : Ua.r(e);
  }
  var zs = typeof document > "u" ? null : document;
  function Hv(e, n, r) {
    var l = zs;
    if (l && typeof n == "string" && n) {
      var d = Fn(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof r == "string" && (d += '[crossorigin="' + r + '"]'), Iv.has(d) || (Iv.add(d), e = { rel: e, crossOrigin: r, href: n }, l.querySelector(d) === null && (n = l.createElement("link"), fn(n, "link", e), Rt(n), l.head.appendChild(n)));
    }
  }
  function fE(e) {
    Ua.D(e), Hv("dns-prefetch", e, null);
  }
  function hE(e, n) {
    Ua.C(e, n), Hv("preconnect", e, n);
  }
  function mE(e, n, r) {
    Ua.L(e, n, r);
    var l = zs;
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
          h = Os(e);
          break;
        case "script":
          h = Ls(e);
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
  function pE(e, n) {
    Ua.m(e, n);
    var r = zs;
    if (r && e) {
      var l = n && typeof n.as == "string" ? n.as : "script", d = 'link[rel="modulepreload"][as="' + Fn(l) + '"][href="' + Fn(e) + '"]', h = d;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = Ls(e);
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
  function gE(e, n, r) {
    Ua.S(e, n, r);
    var l = zs;
    if (l && e) {
      var d = Qt(l).hoistableStyles, h = Os(e);
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
          }), E.loading |= 4, ko(x, n, l);
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
  function vE(e, n) {
    Ua.X(e, n);
    var r = zs;
    if (r && e) {
      var l = Qt(r).hoistableScripts, d = Ls(e), h = l.get(d);
      h || (h = r.querySelector(Fi(d)), h || (e = v({ src: e, async: !0 }, n), (n = Jn.get(d)) && Zd(e, n), h = r.createElement("script"), Rt(h), fn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function yE(e, n) {
    Ua.M(e, n);
    var r = zs;
    if (r && e) {
      var l = Qt(r).hoistableScripts, d = Ls(e), h = l.get(d);
      h || (h = r.querySelector(Fi(d)), h || (e = v({ src: e, async: !0, type: "module" }, n), (n = Jn.get(d)) && Zd(e, n), h = r.createElement("script"), Rt(h), fn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function qv(e, n, r, l) {
    var d = (d = J.current) ? Ao(d) : null;
    if (!d) throw Error(i(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = Os(r.href), r = Qt(
          d
        ).hoistableStyles, l = r.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = Os(r.href);
          var h = Qt(
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
          }, Jn.set(e, r), h || bE(
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
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Ls(r), r = Qt(
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
  function Os(e) {
    return 'href="' + Fn(e) + '"';
  }
  function qi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Fv(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function bE(e, n, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), fn(n, "link", r), Rt(n), e.head.appendChild(n));
  }
  function Ls(e) {
    return '[src="' + Fn(e) + '"]';
  }
  function Fi(e) {
    return "script[async]" + e;
  }
  function Yv(e, n, r) {
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
          ), Rt(l), fn(l, "style", d), ko(l, r.precedence, e), n.instance = l;
        case "stylesheet":
          d = Os(r.href);
          var h = e.querySelector(
            qi(d)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, Rt(h), h;
          l = Fv(r), (d = Jn.get(d)) && Qd(l, d), h = (e.ownerDocument || e).createElement("link"), Rt(h);
          var x = h;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), fn(h, "link", l), n.state.loading |= 4, ko(h, r.precedence, e), n.instance = h;
        case "script":
          return h = Ls(r.src), (d = e.querySelector(
            Fi(h)
          )) ? (n.instance = d, Rt(d), d) : (l = r, (d = Jn.get(h)) && (l = v({}, r), Zd(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), Rt(d), fn(d, "link", l), e.head.appendChild(d), n.instance = d);
        case "void":
          return null;
        default:
          throw Error(i(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (l = n.instance, n.state.loading |= 4, ko(l, r.precedence, e));
    return n.instance;
  }
  function ko(e, n, r) {
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
  var Do = null;
  function Gv(e, n, r) {
    if (Do === null) {
      var l = /* @__PURE__ */ new Map(), d = Do = /* @__PURE__ */ new Map();
      d.set(r, l);
    } else
      d = Do, l = d.get(r), l || (l = /* @__PURE__ */ new Map(), d.set(r, l));
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
  function Pv(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function xE(e, n, r) {
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
  function Kv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function SE(e, n, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var d = Os(l.href), h = n.querySelector(
          qi(d)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = zo.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = h, Rt(h);
          return;
        }
        h = n.ownerDocument || n, l = Fv(l), (d = Jn.get(d)) && Qd(l, d), h = h.createElement("link"), Rt(h);
        var x = h;
        x._p = new Promise(function(E, L) {
          x.onload = E, x.onerror = L;
        }), fn(h, "link", l), r.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = zo.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Jd = 0;
  function wE(e, n) {
    return e.stylesheets && e.count === 0 && Lo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Jd === 0 && (Jd = 62500 * nE());
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Oo = /* @__PURE__ */ new Map(), n.forEach(jE, e), Oo = null, zo.call(e));
  }
  function jE(e, n) {
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
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function EE(e, n, r, l, d, h, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = at(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = at(0), this.hiddenUpdates = at(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Xv(e, n, r, l, d, h, x, E, L, ne, ue, me) {
    return e = new EE(
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
  function Qv(e) {
    return e ? (e = hs, e) : hs;
  }
  function Zv(e, n, r, l, d, h) {
    d = Qv(d), l.context === null ? l.context = d : l.pendingContext = d, l = Za(n), l.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (l.callback = h), r = Ja(e, l, n), r !== null && (An(r, e, n), ji(r, e, n));
  }
  function Jv(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Wd(e, n) {
    Jv(e, n), (e = e.alternate) && Jv(e, n);
  }
  function Wv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ar(e, 67108864);
      n !== null && An(n, e, 67108864), Wd(e, 67108864);
    }
  }
  function ey(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = In();
      n = Y(n);
      var r = Ar(e, n);
      r !== null && An(r, e, n), Wd(e, n);
    }
  }
  var $o = !0;
  function NE(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = G.p;
    try {
      G.p = 2, ef(e, n, r, l);
    } finally {
      G.p = h, A.T = d;
    }
  }
  function CE(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = G.p;
    try {
      G.p = 8, ef(e, n, r, l);
    } finally {
      G.p = h, A.T = d;
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
        ), ny(e, l);
      else if (RE(
        d,
        e,
        n,
        r,
        l
      ))
        l.stopPropagation();
      else if (ny(e, l), n & 4 && -1 < TE.indexOf(e)) {
        for (; d !== null; ) {
          var h = Lt(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = be(h.pendingLanes);
                  if (x !== 0) {
                    var E = h;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - gt(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    ya(h), (pt & 6) === 0 && (xo = ht() + 500, Bi(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Ar(h, 2), E !== null && An(E, h, 2), wo(), Wd(h, 2);
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
  function ty(e) {
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
          case Ke:
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
  var af = !1, cr = null, ur = null, dr = null, Gi = /* @__PURE__ */ new Map(), Pi = /* @__PURE__ */ new Map(), fr = [], TE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ny(e, n) {
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
    }, n !== null && (n = Lt(n), n !== null && Wv(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function RE(e, n, r, l, d) {
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
  function ay(e) {
    var n = xt(e.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = f(r), n !== null) {
            e.blockedOn = n, xe(e.priority, function() {
              ey(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = p(r), n !== null) {
            e.blockedOn = n, xe(e.priority, function() {
              ey(r);
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
        return n = Lt(r), n !== null && Wv(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function ry(e, n, r) {
    Bo(e) && r.delete(n);
  }
  function _E() {
    af = !1, cr !== null && Bo(cr) && (cr = null), ur !== null && Bo(ur) && (ur = null), dr !== null && Bo(dr) && (dr = null), Gi.forEach(ry), Pi.forEach(ry);
  }
  function Vo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, af || (af = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      _E
    )));
  }
  var Io = null;
  function sy(e) {
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
  function $s(e) {
    function n(L) {
      return Vo(L, e);
    }
    cr !== null && Vo(cr, e), ur !== null && Vo(ur, e), dr !== null && Vo(dr, e), Gi.forEach(n), Pi.forEach(n);
    for (var r = 0; r < fr.length; r++) {
      var l = fr[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < fr.length && (r = fr[0], r.blockedOn === null); )
      ay(r), r.blockedOn === null && fr.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var d = r[l], h = r[l + 1], x = d[Ee] || null;
        if (typeof h == "function")
          x || sy(r);
        else if (x) {
          var E = null;
          if (h && h.hasAttribute("formAction")) {
            if (d = h, x = h[Ee] || null)
              E = x.formAction;
            else if (nf(d) !== null) continue;
          } else E = x.action;
          typeof E == "function" ? r[l + 1] = E : (r.splice(l, 3), l -= 3), sy(r);
        }
      }
  }
  function iy() {
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
    Zv(r, l, e, n, null, null);
  }, Ho.prototype.unmount = rf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Zv(e.current, 2, null, e, null, null), wo(), n[De] = null;
    }
  };
  function Ho(e) {
    this._internalRoot = e;
  }
  Ho.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ve();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < fr.length && n !== 0 && n < fr[r].priority; r++) ;
      fr.splice(r, 0, e), r === 0 && ay(e);
    }
  };
  var ly = a.version;
  if (ly !== "19.2.5")
    throw Error(
      i(
        527,
        ly,
        "19.2.5"
      )
    );
  G.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = m(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var ME = {
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
          ME
        ), Ot = qo;
      } catch {
      }
  }
  return Qi.createRoot = function(e, n) {
    if (!o(e)) throw Error(i(299));
    var r = !1, l = "", d = mg, h = pg, x = gg;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (d = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = Xv(
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
      iy
    ), e[De] = n.current, Bd(e), new rf(n);
  }, Qi.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(i(299));
    var l = !1, d = "", h = mg, x = pg, E = gg, L = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (d = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (E = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = Xv(
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
      iy
    ), n.context = Qv(null), r = n.current, l = In(), l = Y(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, rt(n, r), ya(n), e[De] = n.current, Bd(e), new Ho(n);
  }, Qi.version = "19.2.5", Qi;
}
var vy;
function IE() {
  if (vy) return of.exports;
  vy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), of.exports = VE(), of.exports;
}
var HE = IE();
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
var Bx = (t) => {
  throw TypeError(t);
}, qE = (t, a, s) => a.has(t) || Bx("Cannot " + s), ff = (t, a, s) => (qE(t, a, "read from private field"), s ? s.call(t) : a.get(t)), FE = (t, a, s) => a.has(t) ? Bx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, s);
function yy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function YE(t = {}) {
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
    return Pt(
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
      let N = yy(S) ? S : b(S, j);
      u += 1, o.splice(u, o.length, N), i && p && p({ action: f, location: N, delta: 1 });
    },
    replace(S, j) {
      f = "REPLACE";
      let N = yy(S) ? S : b(S, j);
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
function Pt(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function GE() {
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
    key: a && a.key || i || GE(),
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
function PE(t, a = !1) {
  let s = "http://localhost";
  typeof window < "u" && (s = window.location.origin !== "null" ? window.location.origin : window.location.href), Je(s, "No window.location.(origin|href) available to create URL");
  let i = typeof t == "string" ? t : xa(t);
  return i = i.replace(/ $/, "%20"), !a && i.startsWith("//") && (i = s + i), new URL(i, s);
}
var ol, by = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (FE(this, ol, /* @__PURE__ */ new Map()), t)
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
var KE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function XE(t) {
  return KE.has(
    t
  );
}
var QE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function ZE(t) {
  return QE.has(
    t
  );
}
function JE(t) {
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
    ), JE(u)) {
      let m = {
        ...u,
        id: y
      };
      return i[y] = xy(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: y,
        children: void 0
      };
      return i[y] = xy(
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
function xy(t, a) {
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
  let f = Vx(t);
  eN(f);
  let p = null;
  for (let y = 0; p == null && y < f.length; ++y) {
    let m = dN(u);
    p = cN(
      f[y],
      m,
      i
    );
  }
  return p;
}
function WE(t, a) {
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
function Vx(t, a = [], s = [], i = "", o = !1) {
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
    ), Vx(
      f.children,
      a,
      w,
      v,
      y
    )), !(f.path == null && !f.index) && a.push({
      path: v,
      score: lN(v, f.index),
      routesMeta: w
    });
  };
  return t.forEach((f, p) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, p);
    else
      for (let y of Ix(f.path))
        u(f, p, !0, y);
  }), a;
}
function Ix(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [s, ...i] = a, o = s.endsWith("?"), u = s.replace(/\?$/, "");
  if (i.length === 0)
    return o ? [u, ""] : [u];
  let f = Ix(i.join("/")), p = [];
  return p.push(
    ...f.map(
      (y) => y === "" ? u : [u, y].join("/")
    )
  ), o && p.push(...f), p.map(
    (y) => t.startsWith("/") && y === "" ? "/" : y
  );
}
function eN(t) {
  t.sort(
    (a, s) => a.score !== s.score ? s.score - a.score : oN(
      a.routesMeta.map((i) => i.childrenIndex),
      s.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var tN = /^:[\w-]+$/, nN = 3, aN = 2, rN = 1, sN = 10, iN = -2, Sy = (t) => t === "*";
function lN(t, a) {
  let s = t.split("/"), i = s.length;
  return s.some(Sy) && (i += iN), a && (i += aN), s.filter((o) => !Sy(o)).reduce(
    (o, u) => o + (tN.test(u) ? nN : u === "" ? rN : sN),
    i
  );
}
function oN(t, a) {
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
function cN(t, a, s = !1) {
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
      pathnameBase: mN(
        ea([u, v.pathnameBase])
      ),
      route: w
    }), v.pathnameBase !== "/" && (u = ea([u, v.pathnameBase]));
  }
  return f;
}
function jc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [s, i] = uN(
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
function uN(t, a = !1, s = !0) {
  Pt(
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
function dN(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Pt(
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
function fN({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : ea([t, a]);
}
var Hx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, zh = (t) => Hx.test(t);
function hN(t, a = "/") {
  let {
    pathname: s,
    search: i = "",
    hash: o = ""
  } = typeof t == "string" ? fa(t) : t, u;
  return s ? (s = Lh(s), s.startsWith("/") ? u = wy(s.substring(1), "/") : u = wy(s, a)) : u = a, {
    pathname: u,
    search: pN(i),
    hash: gN(o)
  };
}
function wy(t, a) {
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
function qx(t) {
  return t.filter(
    (a, s) => s === 0 || a.route.path && a.route.path.length > 0
  );
}
function Oh(t) {
  let a = qx(t);
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
  let y = hN(o, p), m = f && f !== "/" && f.endsWith("/"), b = (u || f === ".") && s.endsWith("/");
  return !y.pathname.endsWith("/") && (m || b) && (y.pathname += "/"), y;
}
var Lh = (t) => t.replace(/\/\/+/g, "/"), ea = (t) => Lh(t.join("/")), Ec = (t) => t.replace(/\/+$/, ""), mN = (t) => Ec(t).replace(/^\/*/, "/"), pN = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, gN = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, vN = (t, a = 302) => {
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
var Fx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Yx(t, a) {
  let s = t;
  if (typeof s != "string" || !Hx.test(s))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: s
    };
  let i = s, o = !1;
  if (Fx)
    try {
      let u = new URL(window.location.href), f = s.startsWith("//") ? new URL(u.protocol + s) : new URL(s), p = aa(f.pathname, a);
      f.origin === u.origin && p != null ? s = p + f.search + f.hash : o = !0;
    } catch {
      Pt(
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
function yN(t, a) {
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
    let o = Ys(s.lazy, a.lazy, () => {
    });
    o && (i.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let f = o[u], p = s[`lazy.${u}`];
      if (typeof f == "function" && p.length > 0) {
        let y = Ys(p, f, () => {
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
      let f = u[xr] ?? u, p = Ys(
        s[o],
        f,
        (...y) => jy(y[0])
      );
      p && (o === "loader" && f.hydrate === !0 && (p.hydrate = !0), p[xr] = f, i[o] = p);
    }
  }), a.middleware && a.middleware.length > 0 && s.middleware.length > 0 && (i.middleware = a.middleware.map((o) => {
    let u = o[xr] ?? o, f = Ys(
      s.middleware,
      u,
      (...p) => jy(p[0])
    );
    return f ? (f[xr] = u, f) : o;
  })), i;
}
function bN(t, a) {
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
    let i = t.navigate[xr] ?? t.navigate, o = Ys(
      s.navigate,
      i,
      (...u) => {
        let [f, p] = u;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? xa(f) : ".",
          ...Ey(t, p ?? {})
        };
      }
    );
    o && (o[xr] = i, t.navigate = o);
  }
  if (s.fetch.length > 0) {
    let i = t.fetch[xr] ?? t.fetch, o = Ys(s.fetch, i, (...u) => {
      let [f, , p, y] = u;
      return {
        href: p ?? ".",
        fetcherKey: f,
        ...Ey(t, y ?? {})
      };
    });
    o && (o[xr] = i, t.fetch = o);
  }
  return t;
}
function Ys(t, a, s) {
  return t.length === 0 ? null : async (...i) => {
    let o = await Gx(
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
async function Gx(t, a, s, i) {
  let o = t[i], u;
  if (o) {
    let f, p = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = Gx(t, a, s, i - 1), u = await f, Je(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
function jy(t) {
  let { request: a, context: s, params: i, unstable_pattern: o } = t;
  return {
    request: xN(a),
    params: { ...i },
    unstable_pattern: o,
    context: SN(s)
  };
}
function Ey(t, a) {
  return {
    currentUrl: xa(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function xN(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function SN(t) {
  if (jN(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var wN = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function jN(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === wN;
}
var Px = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], EN = new Set(
  Px
), NN = [
  "GET",
  ...Px
], CN = new Set(NN), Kx = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), TN = /* @__PURE__ */ new Set([307, 308]), mf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, RN = {
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
}, _N = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), Xx = "remix-router-transitions", Qx = Symbol("ResetLoaderData");
function MN(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, s = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Je(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let i = t.hydrationRouteProperties || [], o = t.mapRouteProperties || _N, u = o;
  if (t.unstable_instrumentations) {
    let z = t.unstable_instrumentations;
    u = (Y) => ({
      ...o(Y),
      ...yN(
        z.map((ee) => ee.route).filter(Boolean),
        Y
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
  let b = t.dataStrategy || ON, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, w = null, S = /* @__PURE__ */ new Set(), j = null, N = null, R = null, C = t.hydrationData != null, O = yr(p, t.history.location, m), _ = !1, T = null, q, Q;
  if (O == null && !t.patchRoutesOnNavigation) {
    let z = Wn(404, {
      pathname: t.history.location.pathname
    }), { matches: Y, route: ee } = Fo(p);
    q = !0, Q = !q, O = Y, T = { [ee.id]: z };
  } else if (O && !t.hydrationData && at(
    O,
    p,
    t.history.location.pathname
  ).active && (O = null), O)
    if (O.some((z) => z.route.lazy))
      q = !1, Q = !q;
    else if (!O.some((z) => $h(z.route)))
      q = !0, Q = !q;
    else {
      let z = t.hydrationData ? t.hydrationData.loaderData : null, Y = t.hydrationData ? t.hydrationData.errors : null, ee = O;
      if (Y) {
        let ve = O.findIndex(
          (xe) => Y[xe.route.id] !== void 0
        );
        ee = ee.slice(0, ve + 1);
      }
      Q = !1, q = !0, ee.forEach((ve) => {
        let xe = Zx(ve.route, z, Y);
        Q = Q || xe.renderFallback, q = q && !xe.shouldLoad;
      });
    }
  else {
    q = !1, Q = !q, O = [];
    let z = at(
      null,
      p,
      t.history.location.pathname
    );
    z.active && z.matches && (_ = !0, O = z.matches);
  }
  let re, M = {
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
  }, V = "POP", D = null, F = !1, W, ae = !1, K = /* @__PURE__ */ new Map(), le = null, A = !1, G = !1, $ = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Map(), de = 0, k = -1, H = /* @__PURE__ */ new Map(), Z = /* @__PURE__ */ new Set(), P = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Map(), J = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), ye, Re = null;
  function Ge() {
    if (w = t.history.listen(
      ({ action: z, location: Y, delta: ee }) => {
        if (ye) {
          ye(), ye = void 0;
          return;
        }
        Pt(
          ce.size === 0 || ee != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ve = pe({
          currentLocation: M.location,
          nextLocation: Y,
          historyAction: z
        });
        if (ve && ee != null) {
          let xe = new Promise((Ae) => {
            ye = Ae;
          });
          t.history.go(ee * -1), U(ve, {
            state: "blocked",
            location: Y,
            proceed() {
              U(ve, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: Y
              }), xe.then(() => t.history.go(ee));
            },
            reset() {
              let Ae = new Map(M.blockers);
              Ae.set(ve, Zi), Ie({ blockers: Ae });
            }
          }), D?.resolve(), D = null;
          return;
        }
        return Mt(z, Y);
      }
    ), s) {
      WN(a, K);
      let z = () => eC(a, K);
      a.addEventListener("pagehide", z), le = () => a.removeEventListener("pagehide", z);
    }
    return M.initialized || Mt("POP", M.location, {
      initialHydration: !0
    }), re;
  }
  function Ne() {
    w && w(), le && le(), S.clear(), W && W.abort(), M.fetchers.forEach((z, Y) => pn(Y)), M.blockers.forEach((z, Y) => Ce(Y));
  }
  function nt(z) {
    return S.add(z), () => S.delete(z);
  }
  function Ie(z, Y = {}) {
    z.matches && (z.matches = z.matches.map((xe) => {
      let Ae = f[xe.route.id], je = xe.route;
      return je.element !== Ae.element || je.errorElement !== Ae.errorElement || je.hydrateFallbackElement !== Ae.hydrateFallbackElement ? {
        ...xe,
        route: Ae
      } : xe;
    })), M = {
      ...M,
      ...z
    };
    let ee = [], ve = [];
    M.fetchers.forEach((xe, Ae) => {
      xe.state === "idle" && (J.has(Ae) ? ee.push(Ae) : ve.push(Ae));
    }), J.forEach((xe) => {
      !M.fetchers.has(xe) && !se.has(xe) && ee.push(xe);
    }), [...S].forEach(
      (xe) => xe(M, {
        deletedFetchers: ee,
        newErrors: z.errors ?? null,
        viewTransitionOpts: Y.viewTransitionOpts,
        flushSync: Y.flushSync === !0
      })
    ), ee.forEach((xe) => pn(xe)), ve.forEach((xe) => M.fetchers.delete(xe));
  }
  function qe(z, Y, { flushSync: ee } = {}) {
    let ve = M.actionData != null && M.navigation.formMethod != null && bn(M.navigation.formMethod) && M.navigation.state === "loading" && z.state?._isRedirect !== !0, xe;
    Y.actionData ? Object.keys(Y.actionData).length > 0 ? xe = Y.actionData : xe = null : ve ? xe = M.actionData : xe = null;
    let Ae = Y.loaderData ? Oy(
      M.loaderData,
      Y.loaderData,
      Y.matches || [],
      Y.errors
    ) : M.loaderData, je = M.blockers;
    je.size > 0 && (je = new Map(je), je.forEach((Be, Oe) => je.set(Oe, Zi)));
    let Ee = A ? !1 : mt(z, Y.matches || M.matches), De = F === !0 || M.navigation.formMethod != null && bn(M.navigation.formMethod) && z.state?._isRedirect !== !0;
    y && (p = y, y = void 0), A || V === "POP" || (V === "PUSH" ? t.history.push(z, z.state) : V === "REPLACE" && t.history.replace(z, z.state));
    let Te;
    if (V === "POP") {
      let Be = K.get(M.location.pathname);
      Be && Be.has(z.pathname) ? Te = {
        currentLocation: M.location,
        nextLocation: z
      } : K.has(z.pathname) && (Te = {
        currentLocation: z,
        nextLocation: M.location
      });
    } else if (ae) {
      let Be = K.get(M.location.pathname);
      Be ? Be.add(z.pathname) : (Be = /* @__PURE__ */ new Set([z.pathname]), K.set(M.location.pathname, Be)), Te = {
        currentLocation: M.location,
        nextLocation: z
      };
    }
    Ie(
      {
        ...Y,
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
        preventScrollReset: De,
        blockers: je
      },
      {
        viewTransitionOpts: Te,
        flushSync: ee === !0
      }
    ), V = "POP", F = !1, ae = !1, A = !1, G = !1, D?.resolve(), D = null, Re?.resolve(), Re = null;
  }
  async function Kt(z, Y) {
    if (D?.resolve(), D = null, typeof z == "number") {
      D || (D = By());
      let Et = D.promise;
      return t.history.go(z), Et;
    }
    let ee = eh(
      M.location,
      M.matches,
      m,
      z,
      Y?.fromRouteId,
      Y?.relative
    ), { path: ve, submission: xe, error: Ae } = Ny(
      !1,
      ee,
      Y
    ), je;
    Y?.unstable_mask && (je = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof Y.unstable_mask == "string" ? fa(Y.unstable_mask) : {
        ...M.location.unstable_mask,
        ...Y.unstable_mask
      }
    });
    let Ee = M.location, De = Wf(
      Ee,
      ve,
      Y && Y.state,
      void 0,
      je
    );
    De = {
      ...De,
      ...t.history.encodeLocation(De)
    };
    let Te = Y && Y.replace != null ? Y.replace : void 0, Be = "PUSH";
    Te === !0 ? Be = "REPLACE" : Te === !1 || xe != null && bn(xe.formMethod) && xe.formAction === M.location.pathname + M.location.search && (Be = "REPLACE");
    let Oe = Y && "preventScrollReset" in Y ? Y.preventScrollReset === !0 : void 0, ut = (Y && Y.flushSync) === !0, Qe = pe({
      currentLocation: Ee,
      nextLocation: De,
      historyAction: Be
    });
    if (Qe) {
      U(Qe, {
        state: "blocked",
        location: De,
        proceed() {
          U(Qe, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: De
          }), Kt(z, Y);
        },
        reset() {
          let Et = new Map(M.blockers);
          Et.set(Qe, Zi), Ie({ blockers: Et });
        }
      });
      return;
    }
    await Mt(Be, De, {
      submission: xe,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ae,
      preventScrollReset: Oe,
      replace: Y && Y.replace,
      enableViewTransition: Y && Y.viewTransition,
      flushSync: ut,
      callSiteDefaultShouldRevalidate: Y && Y.unstable_defaultShouldRevalidate
    });
  }
  function _t() {
    Re || (Re = By()), ct(), Ie({ revalidation: "loading" });
    let z = Re.promise;
    return M.navigation.state === "submitting" ? z : M.navigation.state === "idle" ? (Mt(M.historyAction, M.location, {
      startUninterruptedRevalidation: !0
    }), z) : (Mt(
      V || M.historyAction,
      M.navigation.location,
      {
        overrideNavigation: M.navigation,
        // Proxy through any rending view transition
        enableViewTransition: ae === !0
      }
    ), z);
  }
  async function Mt(z, Y, ee) {
    W && W.abort(), W = null, V = z, A = (ee && ee.startUninterruptedRevalidation) === !0, Xe(M.location, M.matches), F = (ee && ee.preventScrollReset) === !0, ae = (ee && ee.enableViewTransition) === !0;
    let ve = y || p, xe = ee && ee.overrideNavigation, Ae = ee?.initialHydration && M.matches && M.matches.length > 0 && !_ ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      M.matches
    ) : yr(ve, Y, m), je = (ee && ee.flushSync) === !0;
    if (Ae && M.initialized && !G && qN(M.location, Y) && !(ee && ee.submission && bn(ee.submission.formMethod))) {
      qe(Y, { matches: Ae }, { flushSync: je });
      return;
    }
    let Ee = at(Ae, ve, Y.pathname);
    if (Ee.active && Ee.matches && (Ae = Ee.matches), !Ae) {
      let { error: xt, notFoundMatches: Lt, route: We } = be(
        Y.pathname
      );
      qe(
        Y,
        {
          matches: Lt,
          loaderData: {},
          errors: {
            [We.id]: xt
          }
        },
        { flushSync: je }
      );
      return;
    }
    W = new AbortController();
    let De = Hs(
      t.history,
      Y,
      W.signal,
      ee && ee.submission
    ), Te = t.getContext ? await t.getContext() : new by(), Be;
    if (ee && ee.pendingError)
      Be = [
        br(Ae).route.id,
        { type: "error", error: ee.pendingError }
      ];
    else if (ee && ee.submission && bn(ee.submission.formMethod)) {
      let xt = await mn(
        De,
        Y,
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
        let [Lt, We] = xt.pendingActionResult;
        if (Hn(We) && gl(We.error) && We.error.status === 404) {
          W = null, qe(Y, {
            matches: xt.matches,
            loaderData: {},
            errors: {
              [Lt]: We.error
            }
          });
          return;
        }
      }
      Ae = xt.matches || Ae, Be = xt.pendingActionResult, xe = pf(Y, ee.submission), je = !1, Ee.active = !1, De = Hs(
        t.history,
        De.url,
        De.signal
      );
    }
    let {
      shortCircuited: Oe,
      matches: ut,
      loaderData: Qe,
      errors: Et
    } = await vt(
      De,
      Y,
      Ae,
      Te,
      Ee.active,
      xe,
      ee && ee.submission,
      ee && ee.fetcherSubmission,
      ee && ee.replace,
      ee && ee.initialHydration === !0,
      je,
      Be,
      ee && ee.callSiteDefaultShouldRevalidate
    );
    Oe || (W = null, qe(Y, {
      matches: ut || Ae,
      ...Ly(Be),
      loaderData: Qe,
      errors: Et
    }));
  }
  async function mn(z, Y, ee, ve, xe, Ae, je, Ee = {}) {
    ct();
    let De = ZN(Y, ee);
    if (Ie({ navigation: De }, { flushSync: Ee.flushSync === !0 }), Ae) {
      let Oe = await rt(
        ve,
        Y.pathname,
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
        ve = Oe.matches;
      else {
        let { notFoundMatches: ut, error: Qe, route: Et } = be(
          Y.pathname
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
    let Te, Be = mc(ve, Y);
    if (!Be.route.action && !Be.route.lazy)
      Te = {
        type: "error",
        error: Wn(405, {
          method: z.method,
          pathname: Y.pathname,
          routeId: Be.route.id
        })
      };
    else {
      let Oe = Ks(
        u,
        f,
        z,
        Y,
        ve,
        Be,
        je ? [] : i,
        xe
      ), ut = await Le(
        z,
        Y,
        Oe,
        xe,
        null
      );
      if (Te = ut[Be.route.id], !Te) {
        for (let Qe of ve)
          if (ut[Qe.route.id]) {
            Te = ut[Qe.route.id];
            break;
          }
      }
      if (z.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Pr(Te)) {
      let Oe;
      return Ee && Ee.replace != null ? Oe = Ee.replace : Oe = ky(
        Te.response.headers.get("Location"),
        new URL(z.url),
        m,
        t.history
      ) === M.location.pathname + M.location.search, await we(z, Te, !0, {
        submission: ee,
        replace: Oe
      }), { shortCircuited: !0 };
    }
    if (Hn(Te)) {
      let Oe = br(ve, Be.route.id);
      return (Ee && Ee.replace) !== !0 && (V = "PUSH"), {
        matches: ve,
        pendingActionResult: [
          Oe.route.id,
          Te,
          Be.route.id
        ]
      };
    }
    return {
      matches: ve,
      pendingActionResult: [Be.route.id, Te]
    };
  }
  async function vt(z, Y, ee, ve, xe, Ae, je, Ee, De, Te, Be, Oe, ut) {
    let Qe = Ae || pf(Y, je), Et = je || Ee || Uy(Qe), xt = !A && !Te;
    if (xe) {
      if (xt) {
        let Ft = Xt(Oe);
        Ie(
          {
            navigation: Qe,
            ...Ft !== void 0 ? { actionData: Ft } : {}
          },
          {
            flushSync: Be
          }
        );
      }
      let Ze = await rt(
        ee,
        Y.pathname,
        z.signal
      );
      if (Ze.type === "aborted")
        return { shortCircuited: !0 };
      if (Ze.type === "error") {
        if (Ze.partialMatches.length === 0) {
          let { matches: gn, route: Zt } = Fo(p);
          return {
            matches: gn,
            loaderData: {},
            errors: {
              [Zt.id]: Ze.error
            }
          };
        }
        let Ft = br(Ze.partialMatches).route.id;
        return {
          matches: Ze.partialMatches,
          loaderData: {},
          errors: {
            [Ft]: Ze.error
          }
        };
      } else if (Ze.matches)
        ee = Ze.matches;
      else {
        let { error: Ft, notFoundMatches: gn, route: Zt } = be(
          Y.pathname
        );
        return {
          matches: gn,
          loaderData: {},
          errors: {
            [Zt.id]: Ft
          }
        };
      }
    }
    let Lt = y || p, { dsMatches: We, revalidatingFetchers: Qt } = Cy(
      z,
      ve,
      u,
      f,
      t.history,
      M,
      ee,
      Et,
      Y,
      Te ? [] : i,
      Te === !0,
      G,
      $,
      J,
      P,
      Z,
      Lt,
      m,
      t.patchRoutesOnNavigation != null,
      Oe,
      ut
    );
    if (k = ++de, !t.dataStrategy && !We.some((Ze) => Ze.shouldLoad) && !We.some(
      (Ze) => Ze.route.middleware && Ze.route.middleware.length > 0
    ) && Qt.length === 0) {
      let Ze = Nn();
      return qe(
        Y,
        {
          matches: ee,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Oe && Hn(Oe[1]) ? { [Oe[0]]: Oe[1].error } : null,
          ...Ly(Oe),
          ...Ze ? { fetchers: new Map(M.fetchers) } : {}
        },
        { flushSync: Be }
      ), { shortCircuited: !0 };
    }
    if (xt) {
      let Ze = {};
      if (!xe) {
        Ze.navigation = Qe;
        let Ft = Xt(Oe);
        Ft !== void 0 && (Ze.actionData = Ft);
      }
      Qt.length > 0 && (Ze.fetchers = En(Qt)), Ie(Ze, { flushSync: Be });
    }
    Qt.forEach((Ze) => {
      Tt(Ze.key), Ze.controller && se.set(Ze.key, Ze.controller);
    });
    let Rt = () => Qt.forEach((Ze) => Tt(Ze.key));
    W && W.signal.addEventListener(
      "abort",
      Rt
    );
    let { loaderResults: Fa, fetcherResults: ia } = await Ke(
      We,
      Qt,
      z,
      Y,
      ve
    );
    if (z.signal.aborted)
      return { shortCircuited: !0 };
    W && W.signal.removeEventListener(
      "abort",
      Rt
    ), Qt.forEach((Ze) => se.delete(Ze.key));
    let ln = Yo(Fa);
    if (ln)
      return await we(z, ln.result, !0, {
        replace: De
      }), { shortCircuited: !0 };
    if (ln = Yo(ia), ln)
      return Z.add(ln.key), await we(z, ln.result, !0, {
        replace: De
      }), { shortCircuited: !0 };
    let { loaderData: ha, errors: Cr } = zy(
      M,
      ee,
      Fa,
      Oe,
      Qt,
      ia
    );
    Te && M.errors && (Cr = { ...M.errors, ...Cr });
    let ma = Nn(), Tr = fe(k), ns = ma || Tr || Qt.length > 0;
    return {
      matches: ee,
      loaderData: ha,
      errors: Cr,
      ...ns ? { fetchers: new Map(M.fetchers) } : {}
    };
  }
  function Xt(z) {
    if (z && !Hn(z[1]))
      return {
        [z[0]]: z[1].data
      };
    if (M.actionData)
      return Object.keys(M.actionData).length === 0 ? null : M.actionData;
  }
  function En(z) {
    return z.forEach((Y) => {
      let ee = M.fetchers.get(Y.key), ve = Ji(
        void 0,
        ee ? ee.data : void 0
      );
      M.fetchers.set(Y.key, ve);
    }), new Map(M.fetchers);
  }
  async function ot(z, Y, ee, ve) {
    Tt(z);
    let xe = (ve && ve.flushSync) === !0, Ae = y || p, je = eh(
      M.location,
      M.matches,
      m,
      ee,
      Y,
      ve?.relative
    ), Ee = yr(Ae, je, m), De = at(Ee, Ae, je);
    if (De.active && De.matches && (Ee = De.matches), !Ee) {
      Ut(
        z,
        Y,
        Wn(404, { pathname: je }),
        { flushSync: xe }
      );
      return;
    }
    let { path: Te, submission: Be, error: Oe } = Ny(
      !0,
      je,
      ve
    );
    if (Oe) {
      Ut(z, Y, Oe, { flushSync: xe });
      return;
    }
    let ut = t.getContext ? await t.getContext() : new by(), Qe = (ve && ve.preventScrollReset) === !0;
    if (Be && bn(Be.formMethod)) {
      await sn(
        z,
        Y,
        Te,
        Ee,
        ut,
        De.active,
        xe,
        Qe,
        Be,
        ve && ve.unstable_defaultShouldRevalidate
      );
      return;
    }
    P.set(z, { routeId: Y, path: Te }), await ht(
      z,
      Y,
      Te,
      Ee,
      ut,
      De.active,
      xe,
      Qe,
      Be
    );
  }
  async function sn(z, Y, ee, ve, xe, Ae, je, Ee, De, Te) {
    ct(), P.delete(z);
    let Be = M.fetchers.get(z);
    At(z, JN(De, Be), {
      flushSync: je
    });
    let Oe = new AbortController(), ut = Hs(
      t.history,
      ee,
      Oe.signal,
      De
    );
    if (Ae) {
      let kt = await rt(
        ve,
        new URL(ut.url).pathname,
        ut.signal,
        z
      );
      if (kt.type === "aborted")
        return;
      if (kt.type === "error") {
        Ut(z, Y, kt.error, { flushSync: je });
        return;
      } else if (kt.matches)
        ve = kt.matches;
      else {
        Ut(
          z,
          Y,
          Wn(404, { pathname: ee }),
          { flushSync: je }
        );
        return;
      }
    }
    let Qe = mc(ve, ee);
    if (!Qe.route.action && !Qe.route.lazy) {
      let kt = Wn(405, {
        method: De.formMethod,
        pathname: ee,
        routeId: Y
      });
      Ut(z, Y, kt, { flushSync: je });
      return;
    }
    se.set(z, Oe);
    let Et = de, xt = Ks(
      u,
      f,
      ut,
      ee,
      ve,
      Qe,
      i,
      xe
    ), Lt = await Le(
      ut,
      ee,
      xt,
      xe,
      z
    ), We = Lt[Qe.route.id];
    if (!We) {
      for (let kt of xt)
        if (Lt[kt.route.id]) {
          We = Lt[kt.route.id];
          break;
        }
    }
    if (ut.signal.aborted) {
      se.get(z) === Oe && se.delete(z);
      return;
    }
    if (J.has(z)) {
      if (Pr(We) || Hn(We)) {
        At(z, Ba(void 0));
        return;
      }
    } else {
      if (Pr(We))
        if (se.delete(z), k > Et) {
          At(z, Ba(void 0));
          return;
        } else
          return Z.add(z), At(z, Ji(De)), we(ut, We, !1, {
            fetcherSubmission: De,
            preventScrollReset: Ee
          });
      if (Hn(We)) {
        Ut(z, Y, We.error);
        return;
      }
    }
    let Qt = M.navigation.location || M.location, Rt = Hs(
      t.history,
      Qt,
      Oe.signal
    ), Fa = y || p, ia = M.navigation.state !== "idle" ? yr(Fa, M.navigation.location, m) : M.matches;
    Je(ia, "Didn't find any matches after fetcher action");
    let ln = ++de;
    H.set(z, ln);
    let ha = Ji(De, We.data);
    M.fetchers.set(z, ha);
    let { dsMatches: Cr, revalidatingFetchers: ma } = Cy(
      Rt,
      xe,
      u,
      f,
      t.history,
      M,
      ia,
      De,
      Qt,
      i,
      !1,
      G,
      $,
      J,
      P,
      Z,
      Fa,
      m,
      t.patchRoutesOnNavigation != null,
      [Qe.route.id, We],
      Te
    );
    ma.filter((kt) => kt.key !== z).forEach((kt) => {
      let as = kt.key, rs = M.fetchers.get(as), kl = Ji(
        void 0,
        rs ? rs.data : void 0
      );
      M.fetchers.set(as, kl), Tt(as), kt.controller && se.set(as, kt.controller);
    }), Ie({ fetchers: new Map(M.fetchers) });
    let Tr = () => ma.forEach((kt) => Tt(kt.key));
    Oe.signal.addEventListener(
      "abort",
      Tr
    );
    let { loaderResults: ns, fetcherResults: Ze } = await Ke(
      Cr,
      ma,
      Rt,
      Qt,
      xe
    );
    if (Oe.signal.aborted)
      return;
    if (Oe.signal.removeEventListener(
      "abort",
      Tr
    ), H.delete(z), se.delete(z), ma.forEach((kt) => se.delete(kt.key)), M.fetchers.has(z)) {
      let kt = Ba(We.data);
      M.fetchers.set(z, kt);
    }
    let Ft = Yo(ns);
    if (Ft)
      return we(
        Rt,
        Ft.result,
        !1,
        { preventScrollReset: Ee }
      );
    if (Ft = Yo(Ze), Ft)
      return Z.add(Ft.key), we(
        Rt,
        Ft.result,
        !1,
        { preventScrollReset: Ee }
      );
    let { loaderData: gn, errors: Zt } = zy(
      M,
      ia,
      ns,
      void 0,
      ma,
      Ze
    );
    fe(ln), M.navigation.state === "loading" && ln > k ? (Je(V, "Expected pending action"), W && W.abort(), qe(M.navigation.location, {
      matches: ia,
      loaderData: gn,
      errors: Zt,
      fetchers: new Map(M.fetchers)
    })) : (Ie({
      errors: Zt,
      loaderData: Oy(
        M.loaderData,
        gn,
        ia,
        Zt
      ),
      fetchers: new Map(M.fetchers)
    }), G = !1);
  }
  async function ht(z, Y, ee, ve, xe, Ae, je, Ee, De) {
    let Te = M.fetchers.get(z);
    At(
      z,
      Ji(
        De,
        Te ? Te.data : void 0
      ),
      { flushSync: je }
    );
    let Be = new AbortController(), Oe = Hs(
      t.history,
      ee,
      Be.signal
    );
    if (Ae) {
      let We = await rt(
        ve,
        new URL(Oe.url).pathname,
        Oe.signal,
        z
      );
      if (We.type === "aborted")
        return;
      if (We.type === "error") {
        Ut(z, Y, We.error, { flushSync: je });
        return;
      } else if (We.matches)
        ve = We.matches;
      else {
        Ut(
          z,
          Y,
          Wn(404, { pathname: ee }),
          { flushSync: je }
        );
        return;
      }
    }
    let ut = mc(ve, ee);
    se.set(z, Be);
    let Qe = de, Et = Ks(
      u,
      f,
      Oe,
      ee,
      ve,
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
      for (let We of ve)
        if (xt[We.route.id]) {
          Lt = xt[We.route.id];
          break;
        }
    }
    if (se.get(z) === Be && se.delete(z), !Oe.signal.aborted) {
      if (J.has(z)) {
        At(z, Ba(void 0));
        return;
      }
      if (Pr(Lt))
        if (k > Qe) {
          At(z, Ba(void 0));
          return;
        } else {
          Z.add(z), await we(Oe, Lt, !1, {
            preventScrollReset: Ee
          });
          return;
        }
      if (Hn(Lt)) {
        Ut(z, Y, Lt.error);
        return;
      }
      At(z, Ba(Lt.data));
    }
  }
  async function we(z, Y, ee, {
    submission: ve,
    fetcherSubmission: xe,
    preventScrollReset: Ae,
    replace: je
  } = {}) {
    ee || (D?.resolve(), D = null), Y.response.headers.has("X-Remix-Revalidate") && (G = !0);
    let Ee = Y.response.headers.get("Location");
    Je(Ee, "Expected a Location header on the redirect Response"), Ee = ky(
      Ee,
      new URL(z.url),
      m,
      t.history
    );
    let De = Wf(M.location, Ee, {
      _isRedirect: !0
    });
    if (s) {
      let Et = !1;
      if (Y.response.headers.has("X-Remix-Reload-Document"))
        Et = !0;
      else if (zh(Ee)) {
        const xt = PE(Ee, !0);
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
    let Te = je === !0 || Y.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Be, formAction: Oe, formEncType: ut } = M.navigation;
    !ve && !xe && Be && Oe && ut && (ve = Uy(M.navigation));
    let Qe = ve || xe;
    if (TN.has(Y.response.status) && Qe && bn(Qe.formMethod))
      await Mt(Te, De, {
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
        De,
        ve
      );
      await Mt(Te, De, {
        overrideNavigation: Et,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: xe,
        // Preserve these flags across redirects
        preventScrollReset: Ae || F,
        enableViewTransition: ee ? ae : void 0
      });
    }
  }
  async function Le(z, Y, ee, ve, xe) {
    let Ae, je = {};
    try {
      Ae = await $N(
        b,
        z,
        Y,
        ee,
        xe,
        ve,
        !1
      );
    } catch (Ee) {
      return ee.filter((De) => De.shouldLoad).forEach((De) => {
        je[De.route.id] = {
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
        !Ae.hasOwnProperty(Ee.route.id) && !M.loaderData.hasOwnProperty(Ee.route.id) && (!M.errors || !M.errors.hasOwnProperty(Ee.route.id)) && Ee.shouldCallHandler() && (Ae[Ee.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${Ee.route.id}`
          )
        });
      }
    for (let [Ee, De] of Object.entries(Ae))
      if (PN(De)) {
        let Te = De.result;
        je[Ee] = {
          type: "redirect",
          response: IN(
            Te,
            z,
            Ee,
            ee,
            m
          )
        };
      } else
        je[Ee] = await VN(De);
    return je;
  }
  async function Ke(z, Y, ee, ve, xe) {
    let Ae = Le(
      ee,
      ve,
      z,
      xe,
      null
    ), je = Promise.all(
      Y.map(async (Te) => {
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
    ), Ee = await Ae, De = (await je).reduce(
      (Te, Be) => Object.assign(Te, Be),
      {}
    );
    return {
      loaderResults: Ee,
      fetcherResults: De
    };
  }
  function ct() {
    G = !0, P.forEach((z, Y) => {
      se.has(Y) && $.add(Y), Tt(Y);
    });
  }
  function At(z, Y, ee = {}) {
    M.fetchers.set(z, Y), Ie(
      { fetchers: new Map(M.fetchers) },
      { flushSync: (ee && ee.flushSync) === !0 }
    );
  }
  function Ut(z, Y, ee, ve = {}) {
    let xe = br(M.matches, Y);
    pn(z), Ie(
      {
        errors: {
          [xe.route.id]: ee
        },
        fetchers: new Map(M.fetchers)
      },
      { flushSync: (ve && ve.flushSync) === !0 }
    );
  }
  function sa(z) {
    return B.set(z, (B.get(z) || 0) + 1), J.has(z) && J.delete(z), M.fetchers.get(z) || RN;
  }
  function Sn(z, Y) {
    Tt(z, Y?.reason), At(z, Ba(null));
  }
  function pn(z) {
    let Y = M.fetchers.get(z);
    se.has(z) && !(Y && Y.state === "loading" && H.has(z)) && Tt(z), P.delete(z), H.delete(z), Z.delete(z), J.delete(z), $.delete(z), M.fetchers.delete(z);
  }
  function Ot(z) {
    let Y = (B.get(z) || 0) - 1;
    Y <= 0 ? (B.delete(z), J.add(z)) : B.set(z, Y), Ie({ fetchers: new Map(M.fetchers) });
  }
  function Tt(z, Y) {
    let ee = se.get(z);
    ee && (ee.abort(Y), se.delete(z));
  }
  function gt(z) {
    for (let Y of z) {
      let ee = sa(Y), ve = Ba(ee.data);
      M.fetchers.set(Y, ve);
    }
  }
  function Nn() {
    let z = [], Y = !1;
    for (let ee of Z) {
      let ve = M.fetchers.get(ee);
      Je(ve, `Expected fetcher: ${ee}`), ve.state === "loading" && (Z.delete(ee), z.push(ee), Y = !0);
    }
    return gt(z), Y;
  }
  function fe(z) {
    let Y = [];
    for (let [ee, ve] of H)
      if (ve < z) {
        let xe = M.fetchers.get(ee);
        Je(xe, `Expected fetcher: ${ee}`), xe.state === "loading" && (Tt(ee), H.delete(ee), Y.push(ee));
      }
    return gt(Y), Y.length > 0;
  }
  function _e(z, Y) {
    let ee = M.blockers.get(z) || Zi;
    return ce.get(z) !== Y && ce.set(z, Y), ee;
  }
  function Ce(z) {
    M.blockers.delete(z), ce.delete(z);
  }
  function U(z, Y) {
    let ee = M.blockers.get(z) || Zi;
    Je(
      ee.state === "unblocked" && Y.state === "blocked" || ee.state === "blocked" && Y.state === "blocked" || ee.state === "blocked" && Y.state === "proceeding" || ee.state === "blocked" && Y.state === "unblocked" || ee.state === "proceeding" && Y.state === "unblocked",
      `Invalid blocker state transition: ${ee.state} -> ${Y.state}`
    );
    let ve = new Map(M.blockers);
    ve.set(z, Y), Ie({ blockers: ve });
  }
  function pe({
    currentLocation: z,
    nextLocation: Y,
    historyAction: ee
  }) {
    if (ce.size === 0)
      return;
    ce.size > 1 && Pt(!1, "A router only supports one blocker at a time");
    let ve = Array.from(ce.entries()), [xe, Ae] = ve[ve.length - 1], je = M.blockers.get(xe);
    if (!(je && je.state === "proceeding") && Ae({ currentLocation: z, nextLocation: Y, historyAction: ee }))
      return xe;
  }
  function be(z) {
    let Y = Wn(404, { pathname: z }), ee = y || p, { matches: ve, route: xe } = Fo(ee);
    return { notFoundMatches: ve, route: xe, error: Y };
  }
  function ge(z, Y, ee) {
    if (j = z, R = Y, N = ee || null, !C && M.navigation === mf) {
      C = !0;
      let ve = mt(M.location, M.matches);
      ve != null && Ie({ restoreScrollPosition: ve });
    }
    return () => {
      j = null, R = null, N = null;
    };
  }
  function Ue(z, Y) {
    return N && N(
      z,
      Y.map((ve) => WE(ve, M.loaderData))
    ) || z.key;
  }
  function Xe(z, Y) {
    if (j && R) {
      let ee = Ue(z, Y);
      j[ee] = R();
    }
  }
  function mt(z, Y) {
    if (j) {
      let ee = Ue(z, Y), ve = j[ee];
      if (typeof ve == "number")
        return ve;
    }
    return null;
  }
  function at(z, Y, ee) {
    if (t.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
          return { active: !0, matches: cl(
            Y,
            ee,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: cl(
          Y,
          ee,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function rt(z, Y, ee, ve) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: z };
    let xe = z;
    for (; ; ) {
      let Ae = y == null, je = y || p, Ee = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: ee,
          path: Y,
          matches: xe,
          fetcherKey: ve,
          patch: (Be, Oe) => {
            ee.aborted || Ty(
              Be,
              Oe,
              je,
              Ee,
              u,
              !1
            );
          }
        });
      } catch (Be) {
        return { type: "error", error: Be, partialMatches: xe };
      } finally {
        Ae && !ee.aborted && (p = [...p]);
      }
      if (ee.aborted)
        return { type: "aborted" };
      let De = yr(je, Y, m), Te = null;
      if (De) {
        if (Object.keys(De[0].params).length === 0)
          return { type: "success", matches: De };
        if (Te = cl(
          je,
          Y,
          m,
          !0
        ), !(Te && xe.length < Te.length && qt(
          xe,
          Te.slice(0, xe.length)
        )))
          return { type: "success", matches: De };
      }
      if (Te || (Te = cl(
        je,
        Y,
        m,
        !0
      )), !Te || qt(xe, Te))
        return { type: "success", matches: null };
      xe = Te;
    }
  }
  function qt(z, Y) {
    return z.length === Y.length && z.every((ee, ve) => ee.route.id === Y[ve].route.id);
  }
  function wn(z) {
    f = {}, y = pl(
      z,
      u,
      void 0,
      f
    );
  }
  function Vt(z, Y, ee = !1) {
    let ve = y == null;
    Ty(
      z,
      Y,
      y || p,
      f,
      u,
      ee
    ), ve && (p = [...p], Ie({}));
  }
  return re = {
    get basename() {
      return m;
    },
    get future() {
      return v;
    },
    get state() {
      return M;
    },
    get routes() {
      return p;
    },
    get window() {
      return a;
    },
    initialize: Ge,
    subscribe: nt,
    enableScrollRestoration: ge,
    navigate: Kt,
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
    patchRoutes: Vt,
    _internalFetchControllers: se,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: wn,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
      Ie(z);
    }
  }, t.unstable_instrumentations && (re = bN(
    re,
    t.unstable_instrumentations.map((z) => z.router).filter(Boolean)
  )), re;
}
function AN(t) {
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
    Oh(f),
    aa(t.pathname, s) || t.pathname,
    u === "path"
  );
  if (i == null && (y.search = t.search, y.hash = t.hash), (i == null || i === "" || i === ".") && p) {
    let m = Bh(y.search);
    if (p.route.index && !m)
      y.search = y.search ? y.search.replace(/^\?/, "?index&") : "?index";
    else if (!p.route.index && m) {
      let b = new URLSearchParams(y.search), v = b.getAll("index");
      b.delete("index"), v.filter((S) => S).forEach((S) => b.append("index", S));
      let w = b.toString();
      y.search = w ? `?${w}` : "";
    }
  }
  return s !== "/" && (y.pathname = fN({ basename: s, pathname: y.pathname })), xa(y);
}
function Ny(t, a, s) {
  if (!s || !AN(s))
    return { path: a };
  if (s.formMethod && !QN(s.formMethod))
    return {
      path: a,
      error: Wn(405, { method: s.formMethod })
    };
  let i = () => ({
    path: a,
    error: Wn(400, { type: "invalid-body" })
  }), u = (s.formMethod || "get").toUpperCase(), f = r1(a);
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
  return t && b.search && Bh(b.search) && p.append("index", ""), b.search = `?${p}`, { path: xa(b), submission: m };
}
function Cy(t, a, s, i, o, u, f, p, y, m, b, v, w, S, j, N, R, C, O, _, T) {
  let q = _ ? Hn(_[1]) ? _[1].error : _[1].data : void 0, Q = o.createURL(u.location), re = o.createURL(y), M;
  if (b && u.errors) {
    let le = Object.keys(u.errors)[0];
    M = f.findIndex((A) => A.route.id === le);
  } else if (_ && Hn(_[1])) {
    let le = _[0];
    M = f.findIndex((A) => A.route.id === le) - 1;
  }
  let V = _ ? _[1].statusCode : void 0, D = V && V >= 400, F = {
    currentUrl: Q,
    currentParams: u.matches[0]?.params || {},
    nextUrl: re,
    nextParams: f[0].params,
    ...p,
    actionResult: q,
    actionStatus: V
  }, W = jl(f), ae = f.map((le, A) => {
    let { route: G } = le, $ = null;
    if (M != null && A > M)
      $ = !1;
    else if (G.lazy)
      $ = !0;
    else if (!$h(G))
      $ = !1;
    else if (b) {
      let { shouldLoad: H } = Zx(
        G,
        u.loaderData,
        u.errors
      );
      $ = H;
    } else kN(u.loaderData, u.matches[A], le) && ($ = !0);
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
    typeof T == "boolean" ? se = T : D ? se = !1 : (v || Q.pathname + Q.search === re.pathname + re.search || Q.search !== re.search || DN(u.matches[A], le)) && (se = !0);
    let de = {
      ...F,
      defaultShouldRevalidate: se
    }, k = fl(le, de);
    return th(
      s,
      i,
      t,
      y,
      W,
      le,
      m,
      a,
      k,
      de,
      T
    );
  }), K = [];
  return j.forEach((le, A) => {
    if (b || !f.some((P) => P.route.id === le.routeId) || S.has(A))
      return;
    let G = u.fetchers.get(A), $ = G && G.state !== "idle" && G.data === void 0, se = yr(R, le.path, C);
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
    let de = mc(se, le.path), k = new AbortController(), H = Hs(
      o,
      le.path,
      k.signal
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
      let P;
      typeof T == "boolean" ? P = T : D ? P = !1 : P = v;
      let B = {
        ...F,
        defaultShouldRevalidate: P
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
      controller: k
    });
  }), { dsMatches: ae, revalidatingFetchers: K };
}
function $h(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Zx(t, a, s) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!$h(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let i = a != null && t.id in a, o = s != null && s[t.id] !== void 0;
  if (!i && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !i };
  let u = !i && !o;
  return { shouldLoad: u, renderFallback: u };
}
function kN(t, a, s) {
  let i = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    s.route.id !== a.route.id
  ), o = !t.hasOwnProperty(s.route.id);
  return i || o;
}
function DN(t, a) {
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
function Ty(t, a, s, i, o, u) {
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
      (v) => Jx(m, v)
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
function Jx(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (s, i) => a.children?.some((o) => Jx(s, o))
  ) ?? !1 : !1;
}
var Ry = /* @__PURE__ */ new WeakMap(), Wx = ({
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
  let f = Ry.get(o);
  f || (f = {}, Ry.set(o, f));
  let p = f[t];
  if (p)
    return p;
  let y = (async () => {
    let m = XE(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (m)
      Pt(
        !m,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), f[t] = Promise.resolve();
    else if (v)
      Pt(
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
}, _y = /* @__PURE__ */ new WeakMap();
function zN(t, a, s, i, o) {
  let u = s[t.id];
  if (Je(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = _y.get(u);
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
        let R = ZE(j), O = u[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        R ? Pt(
          !R,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : O ? Pt(
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
    return _y.set(u, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let f = Object.keys(t.lazy), p = [], y;
  for (let b of f) {
    if (o && o.includes(b))
      continue;
    let v = Wx({
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
async function My(t) {
  let a = t.matches.filter((o) => o.shouldLoad), s = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    s[a[u].route.id] = o;
  }), s;
}
async function ON(t) {
  return t.matches.some((a) => a.route.middleware) ? e1(t, () => My(t)) : My(t);
}
function e1(t, a) {
  return LN(
    t,
    a,
    (i) => {
      if (XN(i))
        throw i;
      return i;
    },
    YN,
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
async function LN(t, a, s, i, o) {
  let { matches: u, ...f } = t, p = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((b) => [m.route.id, b]) : []
  );
  return await t1(
    f,
    p,
    a,
    s,
    i,
    o
  );
}
async function t1(t, a, s, i, o, u, f = 0) {
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
      return v = { value: await t1(
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
function n1(t, a, s, i, o) {
  let u = Wx({
    key: "middleware",
    route: i.route,
    manifest: a,
    mapRouteProperties: t
  }), f = zN(
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
  let v = !1, w = n1(
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
      return C && (bn(s.method) || !O) ? UN({
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
    _lazyPromises: n1(
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
async function $N(t, a, s, i, o, u, f) {
  i.some((b) => b._lazyPromises?.middleware) && await Promise.all(i.map((b) => b._lazyPromises?.middleware));
  let p = {
    request: a,
    unstable_url: a1(a, s),
    unstable_pattern: jl(i),
    params: i[0].params,
    context: u,
    matches: i
  }, m = await t({
    ...p,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = p;
      return e1(v, () => b({
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
async function UN({
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
    let j, N = new Promise((O, _) => j = _);
    m = () => j(), t.signal.addEventListener("abort", m);
    let R = (O) => typeof S != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${i.route.id}]`
      )
    ) : S(
      {
        request: t,
        unstable_url: a1(t, a),
        unstable_pattern: s,
        params: i.params,
        context: p
      },
      ...O !== void 0 ? [O] : []
    ), C = (async () => {
      try {
        return { type: "data", result: await (f ? f((_) => R(_)) : R()) };
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
async function BN(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function VN(t) {
  let { result: a, type: s } = t;
  if (Uh(a)) {
    let i;
    try {
      i = await BN(a);
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
  return s === "error" ? $y(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: FN(a),
    statusCode: gl(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: gl(a) ? a.status : void 0
  } : $y(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function IN(t, a, s, i, o) {
  let u = t.headers.get("Location");
  if (Je(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !zh(u)) {
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
var Ay = [
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
function ky(t, a, s, i) {
  if (zh(t)) {
    let o = t, u = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Ay.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let f = aa(u.pathname, s) != null;
    if (u.origin === a.origin && f)
      return Lh(u.pathname) + u.search + u.hash;
  }
  try {
    let o = i.createURL(t);
    if (Ay.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Hs(t, a, s, i) {
  let o = t.createURL(r1(a)).toString(), u = { signal: s };
  if (i && bn(i.formMethod)) {
    let { formMethod: f, formEncType: p } = i;
    u.method = f.toUpperCase(), p === "application/json" ? (u.headers = new Headers({ "Content-Type": p }), u.body = JSON.stringify(i.json)) : p === "text/plain" ? u.body = i.text : p === "application/x-www-form-urlencoded" && i.formData ? u.body = nh(i.formData) : u.body = i.formData;
  }
  return new Request(o, u);
}
function a1(t, a) {
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
function HN(t, a, s, i = !1, o = !1) {
  let u = {}, f = null, p, y = !1, m = {}, b = s && Hn(s[1]) ? s[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let w = v.route.id, S = a[w];
    if (Je(
      !Pr(S),
      "Cannot handle redirect results in processLoaderData"
    ), Hn(S)) {
      let j = S.error;
      if (b !== void 0 && (j = b, b = void 0), f = f || {}, o)
        f[w] = j;
      else {
        let N = br(t, w);
        f[N.route.id] == null && (f[N.route.id] = j);
      }
      i || (u[w] = Qx), y || (y = !0, p = gl(S.error) ? S.error.status : 500), S.headers && (m[w] = S.headers);
    } else
      u[w] = S.data, S.statusCode && S.statusCode !== 200 && !y && (p = S.statusCode), S.headers && (m[w] = S.headers);
  }), b !== void 0 && s && (f = { [s[0]]: b }, s[2] && (u[s[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: p || 200,
    loaderHeaders: m
  };
}
function zy(t, a, s, i, o, u) {
  let { loaderData: f, errors: p } = HN(
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
    } else if (Pr(w))
      Je(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Ba(w.data);
      t.fetchers.set(m, S);
    }
  }), { loaderData: f, errors: p };
}
function Oy(t, a, s, i) {
  let o = Object.entries(a).filter(([, u]) => u !== Qx).reduce((u, [f, p]) => (u[f] = p, u), {});
  for (let u of s) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (o[f] = t[f]), i && i.hasOwnProperty(f))
      break;
  }
  return o;
}
function Ly(t) {
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
    if (Pr(o))
      return { key: i, result: o };
  }
}
function r1(t) {
  let a = typeof t == "string" ? fa(t) : t;
  return xa({ ...a, hash: "" });
}
function qN(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function FN(t) {
  return new Vc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function YN(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, s]) => typeof a == "string" && GN(s)
  );
}
function GN(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function PN(t) {
  return Uh(t.result) && Kx.has(t.result.status);
}
function Hn(t) {
  return t.type === "error";
}
function Pr(t) {
  return (t && t.type) === "redirect";
}
function $y(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Uh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function KN(t) {
  return Kx.has(t);
}
function XN(t) {
  return Uh(t) && KN(t.status) && t.headers.has("Location");
}
function QN(t) {
  return CN.has(t.toUpperCase());
}
function bn(t) {
  return EN.has(t.toUpperCase());
}
function Bh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function mc(t, a) {
  let s = typeof a == "string" ? fa(a).search : a.search;
  if (t[t.length - 1].route.index && Bh(s || ""))
    return t[t.length - 1];
  let i = qx(t);
  return i[i.length - 1];
}
function Uy(t) {
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
function ZN(t, a) {
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
function JN(t, a) {
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
function WN(t, a) {
  try {
    let s = t.sessionStorage.getItem(
      Xx
    );
    if (s) {
      let i = JSON.parse(s);
      for (let [o, u] of Object.entries(i || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function eC(t, a) {
  if (a.size > 0) {
    let s = {};
    for (let [i, o] of a)
      s[i] = [...o];
    try {
      t.sessionStorage.setItem(
        Xx,
        JSON.stringify(s)
      );
    } catch (i) {
      Pt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${i}).`
      );
    }
  }
}
function By() {
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
var ts = g.createContext(null);
ts.displayName = "DataRouter";
var El = g.createContext(null);
El.displayName = "DataRouterState";
var s1 = g.createContext(!1);
function i1() {
  return g.useContext(s1);
}
var Vh = g.createContext({
  isTransitioning: !1
});
Vh.displayName = "ViewTransition";
var l1 = g.createContext(
  /* @__PURE__ */ new Map()
);
l1.displayName = "Fetchers";
var tC = g.createContext(null);
tC.displayName = "Await";
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
var Ih = g.createContext(null);
Ih.displayName = "RouteError";
var o1 = "REACT_ROUTER_ERROR", nC = "REDIRECT", aC = "ROUTE_ERROR_RESPONSE";
function rC(t) {
  if (t.startsWith(`${o1}:${nC}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function sC(t) {
  if (t.startsWith(
    `${o1}:${aC}:{`
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
function iC(t, { relative: a } = {}) {
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
var c1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function u1(t) {
  g.useContext(ra).static || g.useLayoutEffect(t);
}
function ti() {
  let { isDataRoute: t } = g.useContext(Ha);
  return t ? yC() : lC();
}
function lC() {
  Je(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = g.useContext(ts), { basename: a, navigator: s } = g.useContext(ra), { matches: i } = g.useContext(Ha), { pathname: o } = qa(), u = JSON.stringify(Oh(i)), f = g.useRef(!1);
  return u1(() => {
    f.current = !0;
  }), g.useCallback(
    (y, m = {}) => {
      if (Pt(f.current, c1), !f.current) return;
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
  let { matches: s } = g.useContext(Ha), { pathname: i } = qa(), o = JSON.stringify(Oh(s));
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
function oC(t, a, s) {
  Je(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: i } = g.useContext(ra), { matches: o } = g.useContext(Ha), u = o[o.length - 1], f = u ? u.params : {}, p = u ? u.pathname : "/", y = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let R = m && m.path || "";
    h1(
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
  return Pt(
    m || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Pt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), hC(
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
function cC() {
  let t = vC(), a = gl(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), s = t instanceof Error ? t.stack : null, i = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: i }, u = { padding: "2px 4px", backgroundColor: i }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ g.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ g.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ g.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ g.createElement("h3", { style: { fontStyle: "italic" } }, a), s ? /* @__PURE__ */ g.createElement("pre", { style: o }, s) : null, f);
}
var uC = /* @__PURE__ */ g.createElement(cC, null), d1 = class extends g.Component {
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
      const s = sC(t.digest);
      s && (t = s);
    }
    let a = t !== void 0 ? /* @__PURE__ */ g.createElement(Ha.Provider, { value: this.props.routeContext }, /* @__PURE__ */ g.createElement(
      Ih.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ g.createElement(dC, { error: t }, a) : a;
  }
};
d1.contextType = s1;
var gf = /* @__PURE__ */ new WeakMap();
function dC({
  children: t,
  error: a
}) {
  let { basename: s } = g.useContext(ra);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let i = rC(a.digest);
    if (i) {
      let o = gf.get(a);
      if (o) throw o;
      let u = Yx(i.location, s);
      if (Fx && !gf.get(a))
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
function fC({ routeContext: t, match: a, children: s }) {
  let i = g.useContext(ts);
  return i && i.static && i.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ g.createElement(Ha.Provider, { value: t }, s);
}
function hC(t, a = [], s) {
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
      i && (S = u && v.route.id ? u[v.route.id] : void 0, N = v.route.errorElement || uC, f && (p < 0 && w === 0 ? (h1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, R = null) : p === w && (j = !0, R = v.route.hydrateFallbackElement || null)));
      let C = a.concat(o.slice(0, w + 1)), O = () => {
        let _;
        return S ? _ = N : j ? _ = R : v.route.Component ? _ = /* @__PURE__ */ g.createElement(v.route.Component, null) : v.route.element ? _ = v.route.element : _ = b, /* @__PURE__ */ g.createElement(
          fC,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: C,
              isDataRoute: i != null
            },
            children: _
          }
        );
      };
      return i && (v.route.ErrorBoundary || v.route.errorElement || w === 0) ? /* @__PURE__ */ g.createElement(
        d1,
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
function Hh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function mC(t) {
  let a = g.useContext(ts);
  return Je(a, Hh(t)), a;
}
function f1(t) {
  let a = g.useContext(El);
  return Je(a, Hh(t)), a;
}
function pC(t) {
  let a = g.useContext(Ha);
  return Je(a, Hh(t)), a;
}
function Hc(t) {
  let a = pC(t), s = a.matches[a.matches.length - 1];
  return Je(
    s.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), s.route.id;
}
function gC() {
  return Hc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Tl() {
  let t = f1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Hc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function vC() {
  let t = g.useContext(Ih), a = f1(
    "useRouteError"
    /* UseRouteError */
  ), s = Hc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[s];
}
function yC() {
  let { router: t } = mC(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Hc(
    "useNavigate"
    /* UseNavigateStable */
  ), s = g.useRef(!1);
  return u1(() => {
    s.current = !0;
  }), g.useCallback(
    async (o, u = {}) => {
      Pt(s.current, c1), s.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var Vy = {};
function h1(t, a, s) {
  !a && !Vy[t] && (Vy[t] = !0, Pt(!1, s));
}
var Iy = {};
function Hy(t, a) {
  !t && !Iy[a] && (Iy[a] = !0, console.warn(a));
}
var bC = "useOptimistic", qy = LE[bC], xC = () => {
};
function SC(t) {
  return qy ? qy(t) : [t, xC];
}
function wC(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && Pt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: g.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && Pt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: g.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && Pt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: g.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var jC = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function EC(t, a) {
  return MN({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: YE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: jC,
    mapRouteProperties: wC,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var NC = class {
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
function CC({
  router: t,
  flushSync: a,
  onError: s,
  unstable_useTransitions: i
}) {
  i = i1() || i;
  let [u, f] = g.useState(t.state), [p, y] = SC(u), [m, b] = g.useState(), [v, w] = g.useState({
    isTransitioning: !1
  }), [S, j] = g.useState(), [N, R] = g.useState(), [C, O] = g.useState(), _ = g.useRef(/* @__PURE__ */ new Map()), T = g.useCallback(
    (V, { deletedFetchers: D, newErrors: F, flushSync: W, viewTransitionOpts: ae }) => {
      F && s && Object.values(F).forEach(
        (le) => s(le, {
          location: V.location,
          params: V.matches[0]?.params ?? {},
          unstable_pattern: jl(V.matches)
        })
      ), V.fetchers.forEach((le, A) => {
        le.data !== void 0 && _.current.set(A, le.data);
      }), D.forEach((le) => _.current.delete(le)), Hy(
        W === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let K = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Hy(
        ae == null || K,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !ae || !K) {
        a && W ? a(() => f(V)) : i === !1 ? f(V) : g.startTransition(() => {
          i === !0 && y((le) => Fy(le, V)), f(V);
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
    v.isTransitioning && !v.flushSync && j(new NC());
  }, [v]), g.useEffect(() => {
    if (S && m && t.window) {
      let V = m, D = S.promise, F = t.window.document.startViewTransition(async () => {
        i === !1 ? f(V) : g.startTransition(() => {
          i === !0 && y((W) => Fy(W, V)), f(V);
        }), await D;
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
    push: (V, D, F) => t.navigate(V, {
      state: D,
      preventScrollReset: F?.preventScrollReset
    }),
    replace: (V, D, F) => t.navigate(V, {
      replace: !0,
      state: D,
      preventScrollReset: F?.preventScrollReset
    })
  }), [t]), re = t.basename || "/", M = g.useMemo(
    () => ({
      router: t,
      navigator: Q,
      static: !1,
      basename: re,
      onError: s
    }),
    [t, Q, re, s]
  );
  return /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement(ts.Provider, { value: M }, /* @__PURE__ */ g.createElement(El.Provider, { value: p }, /* @__PURE__ */ g.createElement(l1.Provider, { value: _.current }, /* @__PURE__ */ g.createElement(Vh.Provider, { value: v }, /* @__PURE__ */ g.createElement(
    _C,
    {
      basename: re,
      location: p.location,
      navigationType: p.historyAction,
      navigator: Q,
      unstable_useTransitions: i
    },
    /* @__PURE__ */ g.createElement(
      TC,
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
function Fy(t, a) {
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
var TC = g.memo(RC);
function RC({
  routes: t,
  future: a,
  state: s,
  isStatic: i,
  onError: o
}) {
  return oC(t, void 0, { state: s, isStatic: i, onError: o });
}
function _C({
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
  return Pt(
    N != null,
    `<Router basename="${p}"> is not able to match the URL "${m}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ g.createElement(ra.Provider, { value: y }, /* @__PURE__ */ g.createElement(Ic.Provider, { children: a, value: N }));
}
var pc = "get", gc = "application/x-www-form-urlencoded";
function qc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function MC(t) {
  return qc(t) && t.tagName.toLowerCase() === "button";
}
function AC(t) {
  return qc(t) && t.tagName.toLowerCase() === "form";
}
function kC(t) {
  return qc(t) && t.tagName.toLowerCase() === "input";
}
function DC(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function zC(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !DC(t);
}
var Go = null;
function OC() {
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
var LC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function vf(t) {
  return t != null && !LC.has(t) ? (Pt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${gc}"`
  ), null) : t;
}
function $C(t, a) {
  let s, i, o, u, f;
  if (AC(t)) {
    let p = t.getAttribute("action");
    i = p ? aa(p, a) : null, s = t.getAttribute("method") || pc, o = vf(t.getAttribute("enctype")) || gc, u = new FormData(t);
  } else if (MC(t) || kC(t) && (t.type === "submit" || t.type === "image")) {
    let p = t.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = t.getAttribute("formaction") || p.getAttribute("action");
    if (i = y ? aa(y, a) : null, s = t.getAttribute("formmethod") || p.getAttribute("method") || pc, o = vf(t.getAttribute("formenctype")) || vf(p.getAttribute("enctype")) || gc, u = new FormData(p, t), !OC()) {
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
function qh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function m1(t, a, s, i) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return s ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${i}` : o.pathname = `${o.pathname}.${i}` : o.pathname === "/" ? o.pathname = `_root.${i}` : a && aa(o.pathname, a) === "/" ? o.pathname = `${Ec(a)}/_root.${i}` : o.pathname = `${Ec(o.pathname)}.${i}`, o;
}
async function UC(t, a) {
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
function BC(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function VC(t, a, s) {
  let i = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let f = await UC(u, s);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return FC(
    i.flat(1).filter(BC).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function Yy(t, a, s, i, o, u) {
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
function IC(t, a, { includeHydrateFallback: s } = {}) {
  return HC(
    t.map((i) => {
      let o = a.routes[i.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), s && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function HC(t) {
  return [...new Set(t)];
}
function qC(t) {
  let a = {}, s = Object.keys(t).sort();
  for (let i of s)
    a[i] = t[i];
  return a;
}
function FC(t, a) {
  let s = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((i, o) => {
    let u = JSON.stringify(qC(o));
    return s.has(u) || (s.add(u), i.push({ key: u, link: o })), i;
  }, []);
}
function Fh() {
  let t = g.useContext(ts);
  return qh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function YC() {
  let t = g.useContext(El);
  return qh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Yh = g.createContext(void 0);
Yh.displayName = "FrameworkContext";
function Gh() {
  let t = g.useContext(Yh);
  return qh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function GC(t, a) {
  let s = g.useContext(Yh), [i, o] = g.useState(!1), [u, f] = g.useState(!1), { onFocus: p, onBlur: y, onMouseEnter: m, onMouseLeave: b, onTouchStart: v } = a, w = g.useRef(null);
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
function PC({ page: t, ...a }) {
  let s = i1(), { router: i } = Fh(), o = g.useMemo(
    () => yr(i.routes, t, i.basename),
    [i.routes, t, i.basename]
  );
  return o ? s ? /* @__PURE__ */ g.createElement(XC, { page: t, matches: o, ...a }) : /* @__PURE__ */ g.createElement(QC, { page: t, matches: o, ...a }) : null;
}
function KC(t) {
  let { manifest: a, routeModules: s } = Gh(), [i, o] = g.useState([]);
  return g.useEffect(() => {
    let u = !1;
    return VC(t, a, s).then(
      (f) => {
        u || o(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, s]), i;
}
function XC({
  page: t,
  matches: a,
  ...s
}) {
  let i = qa(), { future: o } = Gh(), { basename: u } = Fh(), f = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let p = m1(
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
function QC({
  page: t,
  matches: a,
  ...s
}) {
  let i = qa(), { future: o, manifest: u, routeModules: f } = Gh(), { basename: p } = Fh(), { loaderData: y, matches: m } = YC(), b = g.useMemo(
    () => Yy(
      t,
      a,
      m,
      u,
      i,
      "data"
    ),
    [t, a, m, u, i]
  ), v = g.useMemo(
    () => Yy(
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
      let _ = u.routes[O.route.id];
      !_ || !_.hasLoader || (!b.some((T) => T.route.id === O.route.id) && O.route.id in y && f[O.route.id]?.shouldRevalidate || _.hasClientLoader ? R = !0 : N.add(O.route.id));
    }), N.size === 0)
      return [];
    let C = m1(
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
    () => IC(v, u),
    [v, u]
  ), j = KC(v);
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
function ZC(...t) {
  return (a) => {
    t.forEach((s) => {
      typeof s == "function" ? s(a) : s != null && (s.current = a);
    });
  };
}
var JC = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  JC && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var p1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Ph = g.forwardRef(
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
    let { basename: R, navigator: C, unstable_useTransitions: O } = g.useContext(ra), _ = typeof b == "string" && p1.test(b), T = Yx(b, R);
    b = T.to;
    let q = iC(b, { relative: o }), Q = qa(), re = null;
    if (p) {
      let le = Bc(
        p,
        [],
        Q.unstable_mask ? Q.unstable_mask.pathname : "/",
        !0
      );
      R !== "/" && (le.pathname = le.pathname === "/" ? R : ea([R, le.pathname])), re = C.createHref(le);
    }
    let [M, V, D] = GC(
      i,
      j
    ), F = nT(b, {
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
          ...D,
          href: (ae ? re : void 0) || T.absoluteURL || q,
          onClick: ae ? W : a,
          ref: ZC(N, V),
          target: m,
          "data-discover": !_ && s === "render" ? "true" : void 0
        }
      )
    );
    return M && !_ ? /* @__PURE__ */ g.createElement(g.Fragment, null, K, /* @__PURE__ */ g.createElement(PC, { page: q })) : K;
  }
);
Ph.displayName = "Link";
var WC = g.forwardRef(
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
    lT(v) && p === !0, C = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, O = w.pathname, _ = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    s || (O = O.toLowerCase(), _ = _ ? _.toLowerCase() : null, C = C.toLowerCase()), _ && N && (_ = aa(_, N) || _);
    const T = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
    let q = O === C || !o && O.startsWith(C) && O.charAt(T) === "/", Q = _ != null && (_ === C || !o && _.startsWith(C) && _.charAt(C.length) === "/"), re = {
      isActive: q,
      isPending: Q,
      isTransitioning: R
    }, M = q ? a : void 0, V;
    typeof i == "function" ? V = i(re) : V = [
      i,
      q ? "active" : null,
      Q ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let D = typeof u == "function" ? u(re) : u;
    return /* @__PURE__ */ g.createElement(
      Ph,
      {
        ...m,
        "aria-current": M,
        className: V,
        ref: b,
        style: D,
        to: f,
        viewTransition: p
      },
      typeof y == "function" ? y(re) : y
    );
  }
);
WC.displayName = "NavLink";
var eT = g.forwardRef(
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
    let { unstable_useTransitions: N } = g.useContext(ra), R = sT(), C = iT(p, { relative: m }), O = f.toLowerCase() === "get" ? "get" : "post", _ = typeof p == "string" && p1.test(p), T = (q) => {
      if (y && y(q), q.defaultPrevented) return;
      q.preventDefault();
      let Q = q.nativeEvent.submitter, re = Q?.getAttribute("formmethod") || f, M = () => R(Q || q.currentTarget, {
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
      N && s !== !1 ? g.startTransition(() => M()) : M();
    };
    return /* @__PURE__ */ g.createElement(
      "form",
      {
        ref: j,
        method: O,
        action: C,
        onSubmit: i ? y : T,
        ...S,
        "data-discover": !_ && t === "render" ? "true" : void 0
      }
    );
  }
);
eT.displayName = "Form";
function tT(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function g1(t) {
  let a = g.useContext(ts);
  return Je(a, tT(t)), a;
}
function nT(t, {
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
      if (zC(S, a)) {
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
var aT = 0, rT = () => `__${String(++aT)}__`;
function sT() {
  let { router: t } = g1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = g.useContext(ra), s = gC(), i = t.fetch, o = t.navigate;
  return g.useCallback(
    async (u, f = {}) => {
      let { action: p, method: y, encType: m, formData: b, body: v } = $C(
        u,
        a
      );
      if (f.navigate === !1) {
        let w = f.fetcherKey || rT();
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
function iT(t, { relative: a } = {}) {
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
function lT(t, { relative: a } = {}) {
  let s = g.useContext(Vh);
  Je(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = g1(
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
function oT(t, a, s) {
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
async function cT() {
  return Ct("/deployments");
}
async function Gy(t) {
  return Ct(`/deployments/${t}`);
}
async function uT(t, a) {
  return Ct(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Py(t) {
  return Ct(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Kh(t, a) {
  return Ct("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function Gs(t, a, s) {
  return Ct(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(s)
    }
  );
}
async function v1(t, a) {
  await Ct(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function dT(t) {
  return Ct(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function fT(t, a, s = "error") {
  return Ct("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: s })
  });
}
async function hT(t, a = {}) {
  const s = new URLSearchParams();
  a.limit && s.set("limit", String(a.limit)), a.status && s.set("status", a.status);
  const i = s.toString(), o = i ? `?${i}` : "";
  return Ct(`/deployments/${t}/runs${o}`);
}
async function mT(t, a) {
  return Ct(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function Xh(t, a) {
  return Ct(`/deployments/${t}/runs/${a}`);
}
async function pT(t, a) {
  return Ct(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function y1(t, a) {
  return Ct(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function gT(t, a) {
  return Ct(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Ky(t, a, s, i) {
  return oT(
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
async function vT(t, a) {
  await Ct(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function yT(t, a, s) {
  return Ct(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: s })
    }
  );
}
function bT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${Sa}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function xT(t) {
  return Ct(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var ST = "mux0i60", wT = "mux0i61", jT = "mux0i62", ET = "mux0i63";
function Fc({ count: t = "0", title: a, hint: s }) {
  return /* @__PURE__ */ c.jsxs("div", { className: ST, children: [
    /* @__PURE__ */ c.jsx("span", { className: wT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: jT, children: a }),
    s ? /* @__PURE__ */ c.jsx("p", { className: ET, children: s }) : null
  ] });
}
var NT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, CT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, TT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, RT = "zwn3019";
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
  const y = [NT[t], TT[a], CT[s], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(i, { className: y, style: f, "data-elevation": s, ...p, children: o });
}
function _T({ children: t, className: a }) {
  const s = [RT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: s, children: t });
}
var Qr = "vrkn5p0", MT = "_93p6291", AT = "_93p6292", kT = "_93p6293", DT = "_93p6294", zT = "_93p6295", OT = "_93p6296", LT = "_93p6297", $T = "_93p6298", UT = "_93p6299", BT = "_93p629a", VT = "_93p629b", IT = "_93p629c", HT = "_93p629d", qT = "_93p629e";
const FT = "nexus-host-navigate";
function YT(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function GT(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const s = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(FT, {
      detail: s
    })
  );
}
function PT() {
  const { deployments: t } = Tl(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: MT, children: [
    /* @__PURE__ */ c.jsxs("header", { className: AT, children: [
      /* @__PURE__ */ c.jsx("p", { className: kT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: DT, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: zT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: OT, children: [
        /* @__PURE__ */ c.jsx("span", { className: LT, children: t.length }),
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
        className: $T,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Qr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Fc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: UT, children: t.map((s) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: YT(s.deploymentId),
              onClick: (i) => GT(i, s.deploymentId),
              className: BT,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: VT, "aria-hidden": "true", children: KT(s.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: IT, children: s.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: HT, children: s.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: qT, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, s.deploymentId)) })
        ]
      }
    )
  ] });
}
function KT(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Qh = Ux();
const XT = /* @__PURE__ */ $x(Qh);
function QT(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.type = "text/css", a.appendChild(s), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t));
}
const ZT = (t) => {
  switch (t) {
    case "success":
      return eR;
    case "info":
      return nR;
    case "warning":
      return tR;
    case "error":
      return aR;
    default:
      return null;
  }
}, JT = Array(12).fill(0), WT = ({ visible: t, className: a }) => /* @__PURE__ */ Se.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ Se.createElement("div", {
  className: "sonner-spinner"
}, JT.map((s, i) => /* @__PURE__ */ Se.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${i}`
})))), eR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), tR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), nR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), aR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), rR = /* @__PURE__ */ Se.createElement("svg", {
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
})), sR = () => {
  const [t, a] = Se.useState(document.hidden);
  return Se.useEffect(() => {
    const s = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", s), () => window.removeEventListener("visibilitychange", s);
  }, []), t;
};
let ah = 1;
class iR {
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
        else if (oR(m) && !m.ok) {
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
const kn = new iR(), lR = (t, a) => {
  const s = a?.id || ah++;
  return kn.addToast({
    title: t,
    ...a,
    id: s
  }), s;
}, oR = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", cR = lR, uR = () => kn.toasts, dR = () => kn.getActiveToasts(), hn = Object.assign(cR, {
  success: kn.success,
  info: kn.info,
  warning: kn.warning,
  error: kn.error,
  custom: kn.custom,
  message: kn.message,
  promise: kn.promise,
  dismiss: kn.dismiss,
  loading: kn.loading
}, {
  getHistory: uR,
  getToasts: dR
});
QT("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Po(t) {
  return t.label !== void 0;
}
const fR = 3, hR = "24px", mR = "16px", Xy = 4e3, pR = 356, gR = 14, vR = 45, yR = 200;
function ba(...t) {
  return t.filter(Boolean).join(" ");
}
function bR(t) {
  const [a, s] = t.split("-"), i = [];
  return a && i.push(a), s && i.push(s), i;
}
const xR = (t) => {
  var a, s, i, o, u, f, p, y, m;
  const { invert: b, toast: v, unstyled: w, interacting: S, setHeights: j, visibleToasts: N, heights: R, index: C, toasts: O, expanded: _, removeToast: T, defaultRichColors: q, closeButton: Q, style: re, cancelButtonStyle: M, actionButtonStyle: V, className: D = "", descriptionClassName: F = "", duration: W, position: ae, gap: K, expandByDefault: le, classNames: A, icons: G, closeButtonAriaLabel: $ = "Close toast" } = t, [se, de] = Se.useState(null), [k, H] = Se.useState(null), [Z, P] = Se.useState(!1), [B, J] = Se.useState(!1), [ce, ye] = Se.useState(!1), [Re, Ge] = Se.useState(!1), [Ne, nt] = Se.useState(!1), [Ie, qe] = Se.useState(0), [Kt, _t] = Se.useState(0), Mt = Se.useRef(v.duration || W || Xy), mn = Se.useRef(null), vt = Se.useRef(null), Xt = C === 0, En = C + 1 <= N, ot = v.type, sn = v.dismissible !== !1, ht = v.className || "", we = v.descriptionClassName || "", Le = Se.useMemo(() => R.findIndex((ge) => ge.toastId === v.id) || 0, [
    R,
    v.id
  ]), Ke = Se.useMemo(() => {
    var ge;
    return (ge = v.closeButton) != null ? ge : Q;
  }, [
    v.closeButton,
    Q
  ]), ct = Se.useMemo(() => v.duration || W || Xy, [
    v.duration,
    W
  ]), At = Se.useRef(0), Ut = Se.useRef(0), sa = Se.useRef(0), Sn = Se.useRef(null), [pn, Ot] = ae.split("-"), Tt = Se.useMemo(() => R.reduce((ge, Ue, Xe) => Xe >= Le ? ge : ge + Ue.height, 0), [
    R,
    Le
  ]), gt = sR(), Nn = v.invert || b, fe = ot === "loading";
  Ut.current = Se.useMemo(() => Le * K + Tt, [
    Le,
    Tt
  ]), Se.useEffect(() => {
    Mt.current = ct;
  }, [
    ct
  ]), Se.useEffect(() => {
    P(!0);
  }, []), Se.useEffect(() => {
    const ge = vt.current;
    if (ge) {
      const Ue = ge.getBoundingClientRect().height;
      return _t(Ue), j((Xe) => [
        {
          toastId: v.id,
          height: Ue,
          position: v.position
        },
        ...Xe
      ]), () => j((Xe) => Xe.filter((mt) => mt.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), Se.useLayoutEffect(() => {
    if (!Z) return;
    const ge = vt.current, Ue = ge.style.height;
    ge.style.height = "auto";
    const Xe = ge.getBoundingClientRect().height;
    ge.style.height = Ue, _t(Xe), j((mt) => mt.find((rt) => rt.toastId === v.id) ? mt.map((rt) => rt.toastId === v.id ? {
      ...rt,
      height: Xe
    } : rt) : [
      {
        toastId: v.id,
        height: Xe,
        position: v.position
      },
      ...mt
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
    J(!0), qe(Ut.current), j((ge) => ge.filter((Ue) => Ue.toastId !== v.id)), setTimeout(() => {
      T(v);
    }, yR);
  }, [
    v,
    T,
    j,
    Ut
  ]);
  Se.useEffect(() => {
    if (v.promise && ot === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let ge;
    return _ || S || gt ? (() => {
      if (sa.current < At.current) {
        const mt = (/* @__PURE__ */ new Date()).getTime() - At.current;
        Mt.current = Mt.current - mt;
      }
      sa.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Mt.current !== 1 / 0 && (At.current = (/* @__PURE__ */ new Date()).getTime(), ge = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), _e();
      }, Mt.current));
    })(), () => clearTimeout(ge);
  }, [
    _,
    S,
    v,
    ot,
    gt,
    _e
  ]), Se.useEffect(() => {
    v.delete && (_e(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    _e,
    v.delete
  ]);
  function Ce() {
    var ge;
    if (G?.loading) {
      var Ue;
      return /* @__PURE__ */ Se.createElement("div", {
        className: ba(A?.loader, v == null || (Ue = v.classNames) == null ? void 0 : Ue.loader, "sonner-loader"),
        "data-visible": ot === "loading"
      }, G.loading);
    }
    return /* @__PURE__ */ Se.createElement(WT, {
      className: ba(A?.loader, v == null || (ge = v.classNames) == null ? void 0 : ge.loader),
      visible: ot === "loading"
    });
  }
  const U = v.icon || G?.[ot] || ZT(ot);
  var pe, be;
  return /* @__PURE__ */ Se.createElement("li", {
    tabIndex: 0,
    ref: vt,
    className: ba(D, ht, A?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, A?.default, A?.[ot], v == null || (s = v.classNames) == null ? void 0 : s[ot]),
    "data-sonner-toast": "",
    "data-rich-colors": (pe = v.richColors) != null ? pe : q,
    "data-styled": !(v.jsx || v.unstyled || w),
    "data-mounted": Z,
    "data-promise": !!v.promise,
    "data-swiped": Ne,
    "data-removed": B,
    "data-visible": En,
    "data-y-position": pn,
    "data-x-position": Ot,
    "data-index": C,
    "data-front": Xt,
    "data-swiping": ce,
    "data-dismissible": sn,
    "data-type": ot,
    "data-invert": Nn,
    "data-swipe-out": Re,
    "data-swipe-direction": k,
    "data-expanded": !!(_ || le && Z),
    "data-testid": v.testId,
    style: {
      "--index": C,
      "--toasts-before": C,
      "--z-index": O.length - C,
      "--offset": `${B ? Ie : Ut.current}px`,
      "--initial-height": le ? "auto" : `${Kt}px`,
      ...re,
      ...v.style
    },
    onDragEnd: () => {
      ye(!1), de(null), Sn.current = null;
    },
    onPointerDown: (ge) => {
      ge.button !== 2 && (fe || !sn || (mn.current = /* @__PURE__ */ new Date(), qe(Ut.current), ge.target.setPointerCapture(ge.pointerId), ge.target.tagName !== "BUTTON" && (ye(!0), Sn.current = {
        x: ge.clientX,
        y: ge.clientY
      })));
    },
    onPointerUp: () => {
      var ge, Ue, Xe;
      if (Re || !sn) return;
      Sn.current = null;
      const mt = Number(((ge = vt.current) == null ? void 0 : ge.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), at = Number(((Ue = vt.current) == null ? void 0 : Ue.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), rt = (/* @__PURE__ */ new Date()).getTime() - ((Xe = mn.current) == null ? void 0 : Xe.getTime()), qt = se === "x" ? mt : at, wn = Math.abs(qt) / rt;
      if (Math.abs(qt) >= vR || wn > 0.11) {
        qe(Ut.current), v.onDismiss == null || v.onDismiss.call(v, v), H(se === "x" ? mt > 0 ? "right" : "left" : at > 0 ? "down" : "up"), _e(), Ge(!0);
        return;
      } else {
        var Vt, z;
        (Vt = vt.current) == null || Vt.style.setProperty("--swipe-amount-x", "0px"), (z = vt.current) == null || z.style.setProperty("--swipe-amount-y", "0px");
      }
      nt(!1), ye(!1), de(null);
    },
    onPointerMove: (ge) => {
      var Ue, Xe, mt;
      if (!Sn.current || !sn || ((Ue = window.getSelection()) == null ? void 0 : Ue.toString().length) > 0) return;
      const rt = ge.clientY - Sn.current.y, qt = ge.clientX - Sn.current.x;
      var wn;
      const Vt = (wn = t.swipeDirections) != null ? wn : bR(ae);
      !se && (Math.abs(qt) > 1 || Math.abs(rt) > 1) && de(Math.abs(qt) > Math.abs(rt) ? "x" : "y");
      let z = {
        x: 0,
        y: 0
      };
      const Y = (ee) => 1 / (1.5 + Math.abs(ee) / 20);
      if (se === "y") {
        if (Vt.includes("top") || Vt.includes("bottom"))
          if (Vt.includes("top") && rt < 0 || Vt.includes("bottom") && rt > 0)
            z.y = rt;
          else {
            const ee = rt * Y(rt);
            z.y = Math.abs(ee) < Math.abs(rt) ? ee : rt;
          }
      } else if (se === "x" && (Vt.includes("left") || Vt.includes("right")))
        if (Vt.includes("left") && qt < 0 || Vt.includes("right") && qt > 0)
          z.x = qt;
        else {
          const ee = qt * Y(qt);
          z.x = Math.abs(ee) < Math.abs(qt) ? ee : qt;
        }
      (Math.abs(z.x) > 0 || Math.abs(z.y) > 0) && nt(!0), (Xe = vt.current) == null || Xe.style.setProperty("--swipe-amount-x", `${z.x}px`), (mt = vt.current) == null || mt.style.setProperty("--swipe-amount-y", `${z.y}px`);
    }
  }, Ke && !v.jsx && ot !== "loading" ? /* @__PURE__ */ Se.createElement("button", {
    "aria-label": $,
    "data-disabled": fe,
    "data-close-button": !0,
    onClick: fe || !sn ? () => {
    } : () => {
      _e(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ba(A?.closeButton, v == null || (i = v.classNames) == null ? void 0 : i.closeButton)
  }, (be = G?.close) != null ? be : rR) : null, (ot || v.icon || v.promise) && v.icon !== null && (G?.[ot] !== null || v.icon) ? /* @__PURE__ */ Se.createElement("div", {
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
    style: v.cancelButtonStyle || M,
    onClick: (ge) => {
      Po(v.cancel) && sn && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, ge), _e());
    },
    className: ba(A?.cancelButton, v == null || (y = v.classNames) == null ? void 0 : y.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ Se.isValidElement(v.action) ? v.action : v.action && Po(v.action) ? /* @__PURE__ */ Se.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || V,
    onClick: (ge) => {
      Po(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, ge), !ge.defaultPrevented && _e());
    },
    className: ba(A?.actionButton, v == null || (m = v.classNames) == null ? void 0 : m.actionButton)
  }, v.action.label) : null);
};
function Qy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function SR(t, a) {
  const s = {};
  return [
    t,
    a
  ].forEach((i, o) => {
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", p = u ? mR : hR;
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
const wR = /* @__PURE__ */ Se.forwardRef(function(a, s) {
  const { id: i, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: p, closeButton: y, className: m, offset: b, mobileOffset: v, theme: w = "light", richColors: S, duration: j, style: N, visibleToasts: R = fR, toastOptions: C, dir: O = Qy(), gap: _ = gR, icons: T, containerAriaLabel: q = "Notifications" } = a, [Q, re] = Se.useState([]), M = Se.useMemo(() => i ? Q.filter((Z) => Z.toasterId === i) : Q.filter((Z) => !Z.toasterId), [
    Q,
    i
  ]), V = Se.useMemo(() => Array.from(new Set([
    u
  ].concat(M.filter((Z) => Z.position).map((Z) => Z.position)))), [
    M,
    u
  ]), [D, F] = Se.useState([]), [W, ae] = Se.useState(!1), [K, le] = Se.useState(!1), [A, G] = Se.useState(w !== "system" ? w : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), $ = Se.useRef(null), se = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), de = Se.useRef(null), k = Se.useRef(!1), H = Se.useCallback((Z) => {
    re((P) => {
      var B;
      return (B = P.find((J) => J.id === Z.id)) != null && B.delete || kn.dismiss(Z.id), P.filter(({ id: J }) => J !== Z.id);
    });
  }, []);
  return Se.useEffect(() => kn.subscribe((Z) => {
    if (Z.dismiss) {
      requestAnimationFrame(() => {
        re((P) => P.map((B) => B.id === Z.id ? {
          ...B,
          delete: !0
        } : B));
      });
      return;
    }
    setTimeout(() => {
      XT.flushSync(() => {
        re((P) => {
          const B = P.findIndex((J) => J.id === Z.id);
          return B !== -1 ? [
            ...P.slice(0, B),
            {
              ...P[B],
              ...Z
            },
            ...P.slice(B + 1)
          ] : [
            Z,
            ...P
          ];
        });
      });
    });
  }), [
    Q
  ]), Se.useEffect(() => {
    if (w !== "system") {
      G(w);
      return;
    }
    if (w === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? G("dark") : G("light")), typeof window > "u") return;
    const Z = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Z.addEventListener("change", ({ matches: P }) => {
        G(P ? "dark" : "light");
      });
    } catch {
      Z.addListener(({ matches: B }) => {
        try {
          G(B ? "dark" : "light");
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
    const Z = (P) => {
      var B;
      if (f.every((ye) => P[ye] || P.code === ye)) {
        var ce;
        ae(!0), (ce = $.current) == null || ce.focus();
      }
      P.code === "Escape" && (document.activeElement === $.current || (B = $.current) != null && B.contains(document.activeElement)) && ae(!1);
    };
    return document.addEventListener("keydown", Z), () => document.removeEventListener("keydown", Z);
  }, [
    f
  ]), Se.useEffect(() => {
    if ($.current)
      return () => {
        de.current && (de.current.focus({
          preventScroll: !0
        }), de.current = null, k.current = !1);
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
  }, V.map((Z, P) => {
    var B;
    const [J, ce] = Z.split("-");
    return M.length ? /* @__PURE__ */ Se.createElement("ol", {
      key: Z,
      dir: O === "auto" ? Qy() : O,
      tabIndex: -1,
      ref: $,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": A,
      "data-y-position": J,
      "data-x-position": ce,
      style: {
        "--front-toast-height": `${((B = D[0]) == null ? void 0 : B.height) || 0}px`,
        "--width": `${pR}px`,
        "--gap": `${_}px`,
        ...N,
        ...SR(b, v)
      },
      onBlur: (ye) => {
        k.current && !ye.currentTarget.contains(ye.relatedTarget) && (k.current = !1, de.current && (de.current.focus({
          preventScroll: !0
        }), de.current = null));
      },
      onFocus: (ye) => {
        ye.target instanceof HTMLElement && ye.target.dataset.dismissible === "false" || k.current || (k.current = !0, de.current = ye.relatedTarget);
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
    }, M.filter((ye) => !ye.position && P === 0 || ye.position === Z).map((ye, Re) => {
      var Ge, Ne;
      return /* @__PURE__ */ Se.createElement(xR, {
        key: ye.id,
        icons: T,
        index: Re,
        toast: ye,
        defaultRichColors: S,
        duration: (Ge = C?.duration) != null ? Ge : j,
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
        toasts: M.filter((nt) => nt.position == ye.position),
        heights: D.filter((nt) => nt.position == ye.position),
        setHeights: F,
        expandByDefault: p,
        gap: _,
        expanded: W,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Zy = 32, Jy = -30, Wy = -6, e0 = 0.5, t0 = 2, n0 = -24, a0 = 24, r0 = -12, s0 = 12, i0 = -12, l0 = 12, o0 = -60, c0 = -20;
class Zs extends Error {
  constructor(a, s) {
    super(s), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function b1(t, a, s, i = {}) {
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
async function jR(t, a, s, i, o = {}) {
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
async function ER(t, a, s = {}) {
  const i = `${Sa}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(i, {
    method: "DELETE",
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function NR(t, a, s, i = {}) {
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
function zn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function x1(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Zy)
    return {
      message: `Chain exceeds the maximum of ${Zy} operations.`
    };
  for (const s of t.ops) {
    const i = CR(s, a);
    if (i) return i;
  }
  return null;
}
function CR(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return TR(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < Jy || t.target_lufs > Wy ? {
        opId: t.id,
        message: `Normalize target must be between ${Jy} and ${Wy} LUFS.`
      } : null;
    case "speed":
      return t.factor < e0 || t.factor > t0 ? {
        opId: t.id,
        message: `Speed factor must be between ${e0}× and ${t0}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < n0 || t.gain_db > a0 ? {
        opId: t.id,
        message: `Volume must be between ${n0} and ${a0} dB.`
      } : null;
    case "eq3":
      for (const [s, i] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (i < r0 || i > s0)
          return {
            opId: t.id,
            message: `EQ ${s} must be between ${r0} and ${s0} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < i0 || t.semitones > l0 ? {
        opId: t.id,
        message: `Pitch must be between ${i0} and ${l0} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < o0 || t.threshold_db > c0 ? {
        opId: t.id,
        message: `Silence threshold must be between ${o0} and ${c0} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function TR(t, a, s, i) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : s <= a ? { opId: t, message: "End must be greater than start." } : i > 0 && s > i ? { opId: t, message: "End extends past source duration." } : null;
}
async function Yc(t, a) {
  const s = await t.json().catch(() => null);
  return s?.error?.message ?? s?.message ?? `${a} failed: ${t.status}`;
}
var RR = "g5r6d10", _R = "g5r6d11", MR = "g5r6d12", AR = "g5r6d13", kR = "g5r6d14", DR = "g5r6d15", zR = "g5r6d1a", OR = "g5r6d1b", LR = "g5r6d1c", $R = "g5r6d1d", UR = "g5r6d1e", BR = "g5r6d1g", VR = "g5r6d1h", IR = "g5r6d1i", HR = "g5r6d1j", qR = "g5r6d1k", FR = "g5r6d1l", YR = "g5r6d1m", GR = "g5r6d1n", PR = "g5r6d1o", u0 = "g5r6d1p", KR = "g5r6d1q", XR = "g5r6d1r", QR = "g5r6d1s", ZR = "g5r6d1t", JR = "g5r6d1u", d0 = "g5r6d1v", f0 = "g5r6d1w", WR = "g5r6d1x", e_ = "g5r6d1y", Yr = "g5r6d1z", t_ = "g5r6d110", h0 = "g5r6d111", n_ = "g5r6d112", a_ = "g5r6d113", mr = "g5r6d114", r_ = "g5r6d119", s_ = "a6ki8u0", i_ = "a6ki8u1", l_ = "a6ki8u2", o_ = "a6ki8u3", c_ = "a6ki8u4", u_ = "a6ki8u5", d_ = "a6ki8u6", yf = "a6ki8u7", f_ = "a6ki8u8", h_ = "a6ki8u9", m_ = "a6ki8ua", p_ = "a6ki8ub", g_ = "a6ki8uc", v_ = "a6ki8ud", y_ = "a6ki8ue", b_ = "a6ki8uf", x_ = "a6ki8ug", S_ = "a6ki8uh", w_ = "_1lguv7x0", j_ = "_1lguv7x1", E_ = "_1lguv7x2", N_ = "_1lguv7x3", C_ = "_1lguv7x4", m0 = "_1lguv7x5", T_ = "_1lguv7x6", R_ = "_1lguv7x7", __ = "_1lguv7x8", M_ = "_1lguv7x9", A_ = "_1lguv7xa", k_ = "_1lguv7xb", D_ = "_1lguv7xc", p0 = "_1lguv7xd", z_ = "_1lguv7xe", O_ = "_1lguv7xf", L_ = "_1lguv7xg", $_ = "_1lguv7xh", S1 = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, w1 = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, U_ = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, B_ = "_4ydn54f";
function Ye({
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
    S1[t],
    w1[a],
    o ? U_[a] : null,
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
        i ? /* @__PURE__ */ c.jsx("span", { className: B_, "aria-hidden": "true" }) : null,
        f
      ]
    }
  );
}
const V_ = 28;
function I_(t) {
  if (!t) return 1;
  let a = 0;
  for (let s = 0; s < Math.min(t.length, 12); s++)
    a = a * 33 + t.charCodeAt(s) >>> 0;
  return a || 1;
}
function H_(t, a) {
  const s = new Array(a);
  let i = t;
  for (let o = 0; o < a; o++) {
    i = (i * 9301 + 49297) % 233280;
    const u = i / 233280, f = Math.min(1, o / 6, (a - o) / 6);
    s[o] = Math.max(0.18, f * (0.32 + u * 0.68));
  }
  return s;
}
function q_(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function F_(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function Y_({
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
  const [b, v] = g.useState(!1), [w, S] = g.useState(t.displayName), [j, N] = g.useState(!1), [R, C] = g.useState(t.displayName), O = g.useRef(null), _ = g.useRef(null), T = g.useMemo(() => I_(t.contentSha256), [t.contentSha256]), q = g.useMemo(() => H_(T, V_), [T]), Q = g.useMemo(() => bT(t), [t]);
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
  }, M = () => {
    C(t.displayName), N(!0);
  }, V = () => {
    const ae = R.trim();
    if (!ae) {
      _.current?.focus();
      return;
    }
    N(!1), y?.(ae);
  }, D = () => {
    N(!1);
  }, F = () => {
    R.trim() ? V() : D();
  }, W = `${q_(t.durationMs)} · ${F_(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: w_, "data-playing": i ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: j_, children: [
      /* @__PURE__ */ c.jsx("span", { className: E_, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: N_, children: [
        b ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: m0,
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
            className: C_,
            onDoubleClick: () => v(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: T_, children: W })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: R_, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: __,
        "data-playing": i ? "true" : "false",
        disabled: Q == null,
        title: Q ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": i ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: M_, "aria-hidden": "true", children: i ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: A_, "aria-hidden": "true", children: q.map((ae, K) => /* @__PURE__ */ c.jsx("span", { className: k_, style: { height: `${Math.round(ae * 100)}%` } }, K)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("footer", { className: D_, children: j ? /* @__PURE__ */ c.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6, width: "100%" }, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          ref: _,
          className: m0,
          style: { flex: 1, minWidth: 0 },
          value: R,
          autoFocus: !0,
          placeholder: "Character name",
          onChange: (ae) => C(ae.target.value),
          onFocus: (ae) => ae.currentTarget.select(),
          onBlur: F,
          onKeyDown: (ae) => {
            ae.key === "Enter" ? (ae.preventDefault(), V()) : ae.key === "Escape" && D();
          },
          "aria-label": "New character name"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ye,
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
        Ye,
        {
          variant: "ghost",
          size: "xs",
          iconOnly: !0,
          title: "Cancel",
          "aria-label": "Cancel add character",
          onMouseDown: (ae) => ae.preventDefault(),
          onClick: D,
          children: "✕"
        }
      )
    ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      s.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: p0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        s.map((ae) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: z_,
            style: { color: ae.color, borderColor: ae.color },
            children: ae.characterName
          },
          ae.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: p0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: O_, children: [
        y && /* @__PURE__ */ c.jsx(
          Ye,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Create character from this voice",
            "aria-label": "Create character from this voice",
            onClick: M,
            children: "＋"
          }
        ),
        /* @__PURE__ */ c.jsx(
          Ye,
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
          Ye,
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
          Ye,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: L_,
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
        className: $_,
        onEnded: m
      }
    )
  ] });
}
var G_ = "_17eol302", P_ = "_17eol303", K_ = "_17eol304", X_ = "_17eol305", Q_ = "_17eol306", Z_ = "_17eol307", Ko = "_17eol308", J_ = "_17eol309", W_ = "_17eol30a", e2 = "_17eol30b", t2 = "_17eol30c", n2 = "_17eol30d", g0 = "_17eol30e", a2 = "_17eol30g";
function r2() {
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
function s2(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function i2({
  open: t,
  defaultName: a,
  onClose: s,
  onSubmit: i
}) {
  const [o, u] = g.useState("idle"), [f, p] = g.useState(null), [y, m] = g.useState(0), [b, v] = g.useState(null), [w, S] = g.useState(a), [j, N] = g.useState(!1), R = g.useRef(null), C = g.useRef(null), O = g.useRef([]), _ = g.useRef(0), T = g.useRef(null), q = g.useRef(null), Q = g.useRef({ mime: "audio/webm", ext: "webm" }), re = g.useRef(null), M = g.useRef(null), V = g.useRef(null);
  g.useEffect(() => {
    if (t)
      return V.current = document.activeElement ?? null, requestAnimationFrame(() => {
        re.current?.scrollIntoView({ behavior: "smooth", block: "center" }), M.current?.focus();
      }), () => {
        V.current?.focus?.();
      };
  }, [t]), g.useEffect(() => {
    if (!t) return;
    const G = ($) => {
      $.key === "Escape" && s();
    };
    return window.addEventListener("keydown", G), () => window.removeEventListener("keydown", G);
  }, [t, s]);
  const D = g.useCallback(
    (G) => {
      if (G.key !== "Tab") return;
      const $ = re.current;
      if (!$) return;
      const se = $.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (se.length === 0) return;
      const de = se[0], k = se[se.length - 1], H = document.activeElement;
      G.shiftKey ? (H === de || H === $) && (G.preventDefault(), k.focus()) : H === k && (G.preventDefault(), de.focus());
    },
    []
  ), F = g.useCallback(() => {
    if (C.current) {
      for (const G of C.current.getTracks()) G.stop();
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
      const G = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      C.current = G;
      const $ = r2();
      Q.current = $;
      const se = $.mime ? new MediaRecorder(G, { mimeType: $.mime }) : new MediaRecorder(G);
      R.current = se, O.current = [], se.ondataavailable = (de) => {
        de.data && de.data.size > 0 && O.current.push(de.data);
      }, se.onstop = () => {
        const de = $.mime || "audio/webm", k = new Blob(O.current, { type: de }), H = new File([k], `${w || a || "recording"}.${$.ext}`, {
          type: de
        });
        q.current = H;
        const Z = URL.createObjectURL(k);
        v(Z), u("ready"), F();
      }, se.start(), _.current = Date.now(), m(0), T.current = window.setInterval(() => {
        m(Date.now() - _.current);
      }, 200), u("recording");
    } catch (G) {
      const $ = G instanceof Error ? G.message : "could not access microphone";
      p($), u($.toLowerCase().includes("denied") ? "denied" : "error"), F();
    }
  }, K = () => {
    const G = R.current;
    G && G.state !== "inactive" && G.stop(), T.current != null && (window.clearInterval(T.current), T.current = null);
  }, le = async () => {
    const G = q.current;
    if (!G) return;
    const $ = (w || a).trim();
    if (!$) {
      p("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await i(G, $), s();
    } catch (se) {
      p(se instanceof Error ? se.message : "upload failed");
    } finally {
      N(!1);
    }
  }, A = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: G_, role: "presentation", onClick: s, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: re,
      className: P_,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (G) => G.stopPropagation(),
      onKeyDown: D,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: K_, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: X_, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: Q_,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: A
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: t2, "aria-live": "polite", children: s2(y) }),
        /* @__PURE__ */ c.jsxs("div", { className: Z_, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: M,
              type: "button",
              className: Ko,
              "data-tone": "danger",
              onClick: () => {
                ae();
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: g0, "aria-hidden": "true" }),
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
                /* @__PURE__ */ c.jsx("span", { className: g0, "aria-hidden": "true" }),
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
        b && /* @__PURE__ */ c.jsx("audio", { className: n2, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: J_, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: W_,
              value: w,
              onChange: (G) => S(G.target.value),
              placeholder: a
            }
          )
        ] }),
        f && /* @__PURE__ */ c.jsx("div", { className: e2, children: f }),
        /* @__PURE__ */ c.jsxs("div", { className: a2, children: [
          /* @__PURE__ */ c.jsx(Ye, { variant: "ghost", size: "md", onClick: s, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            Ye,
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
function l2({
  deploymentId: t,
  voiceAssets: a,
  mappings: s,
  characterColors: i,
  onVoiceAssetsChange: o,
  onCreateCharacterFromVoice: u
}) {
  const [f, p] = g.useState(""), [y, m] = g.useState("all"), [b, v] = g.useState(!1), [w, S] = g.useState(null), [j, N] = g.useState(!1), [R, C] = g.useState(!1), O = g.useRef(null), _ = g.useCallback(
    (K) => "upload",
    []
  ), T = g.useMemo(() => {
    const K = f.trim().toLowerCase();
    return a.filter((le) => {
      const A = _(le);
      return !(y === "uploaded" && A !== "upload" || y === "preset" && A !== "preset" || K && !le.displayName.toLowerCase().includes(K));
    });
  }, [a, f, y, _]), q = g.useMemo(
    () => a.filter((K) => _(K) === "upload").length,
    [a, _]
  ), Q = g.useCallback(
    (K) => {
      const le = [], A = /* @__PURE__ */ new Set();
      for (const G of s)
        G.speakerVoiceAssetId === K && (A.has(G.characterName) || (A.add(G.characterName), le.push({
          characterName: G.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: i[G.characterName] ?? "#ba9eff"
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
          for (const G of le) {
            if (!G.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(G.name)) {
              hn.error(`${G.name}: not an audio file`);
              continue;
            }
            const $ = G.name.replace(/\.[^.]+$/, "");
            try {
              const se = await Nc(t, G, $, "speaker");
              A.push(se), hn.success(`Added ${se.displayName}`);
            } catch (se) {
              hn.error(se instanceof Error ? se.message : `${G.name}: upload failed`);
            }
          }
          A.length > 0 && o([...A, ...a]);
        } finally {
          C(!1);
        }
      }
    },
    [t, a, o]
  ), M = (K) => {
    K.preventDefault(), v(!1), K.dataTransfer?.files && re(K.dataTransfer.files);
  }, V = g.useCallback(async () => {
    const K = window.prompt("Paste an audio URL (https://…)");
    if (K)
      try {
        const le = await fetch(K);
        if (!le.ok) throw new Error(`fetch failed: ${le.status}`);
        const A = await le.blob(), G = K.split("/").pop()?.split("?")[0] ?? "voice.wav", $ = new File([A], G, { type: A.type || "audio/wav" });
        await re([$]);
      } catch (le) {
        hn.error(le instanceof Error ? le.message : "could not fetch URL");
      }
  }, [re]), D = g.useCallback(
    async (K, le) => {
      try {
        const A = await yT(t, K, le);
        o(
          a.map((G) => G.voiceAssetId === K ? A : G)
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
          await vT(t, K.voiceAssetId), o(a.filter((A) => A.voiceAssetId !== K.voiceAssetId)), hn.success(`Deleted ${K.displayName}`);
        } catch (A) {
          hn.error(A instanceof Error ? A.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: s_, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: i_,
        "data-over": b ? "true" : "false",
        onDragOver: (K) => {
          K.preventDefault(), v(!0);
        },
        onDragLeave: () => v(!1),
        onDrop: M,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: l_, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: o_, children: [
            /* @__PURE__ */ c.jsxs("div", { className: c_, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: u_, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: d_, children: [
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
            Ye,
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
              className: S_,
              onChange: (K) => {
                K.target.files && (re(K.target.files), K.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: f_, children: [
      /* @__PURE__ */ c.jsxs("label", { className: h_, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: m_,
            value: f,
            onChange: (K) => p(K.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: p_, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([K, le]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: g_,
          "data-active": y === K ? "true" : "false",
          onClick: () => m(K),
          children: le
        },
        K
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: b_, children: [
        /* @__PURE__ */ c.jsx("span", { className: x_, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          q,
          " uploaded"
        ] })
      ] })
    ] }),
    T.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: y_, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: v_, children: T.map((K) => {
      const le = _(K);
      return /* @__PURE__ */ c.jsx(
        Y_,
        {
          asset: K,
          presentation: le,
          usedBy: Q(K.voiceAssetId),
          isPlaying: w === K.voiceAssetId,
          onTogglePlay: () => S((A) => A === K.voiceAssetId ? null : K.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (A) => D(K.voiceAssetId, A),
          onCopyName: () => F(K.displayName),
          onDelete: le === "upload" ? () => void W(K) : void 0,
          onCreateCharacter: u ? (A) => u(K, A) : void 0
        },
        K.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      i2,
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
async function o2(t) {
  return Ct(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function c2(t, a, s) {
  return Ct("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: s })
  });
}
async function u2(t, a) {
  await Ct(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var v0 = "_190jlds0", d2 = "_190jlds1", f2 = "_190jlds2", h2 = "_190jlds3", m2 = "_190jlds4", p2 = "_190jlds5", g2 = "_190jlds6", v2 = "_190jlds7", y2 = "_190jlds8", b2 = "_190jlds9", y0 = "_190jldsa", x2 = "_190jldsb", b0 = "_190jldsc", S2 = "_190jldsd", w2 = "_190jldse", j2 = "_190jldsf";
function E2({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: s,
  onRevertToChain: i,
  emptyHint: o
}) {
  const [u, f] = g.useState(() => Us(a[0])), [p, y] = g.useState([]), [m, b] = g.useState(!1), [v, w] = g.useState(null), [S, j] = g.useState(!1), [N, R] = g.useState(null), C = g.useMemo(
    () => a.find((T) => Us(T) === u) ?? a[0],
    [a, u]
  );
  g.useEffect(() => {
    a.length && (a.some((T) => Us(T) === u) || f(Us(a[0])));
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
  }, [t, p, C]), _ = g.useCallback(async () => {
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
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: v0, children: /* @__PURE__ */ c.jsx("p", { className: b0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: v0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: d2, children: [
      /* @__PURE__ */ c.jsxs("div", { className: f2, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: y0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: h2,
            value: u,
            onChange: (T) => f(T.target.value),
            children: a.map((T) => /* @__PURE__ */ c.jsxs("option", { value: Us(T), children: [
              T.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              T.label
            ] }, Us(T)))
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: m2, children: [
        /* @__PURE__ */ c.jsx(
          Ye,
          {
            variant: "ghost",
            size: "sm",
            onClick: O,
            disabled: p.length === 0 || m,
            children: "Export JSON"
          }
        ),
        s && /* @__PURE__ */ c.jsx(
          Ye,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void _(),
            disabled: S || !C,
            children: S ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsx("div", { className: w2, children: v }),
    m && !v && /* @__PURE__ */ c.jsx("div", { className: j2, "aria-live": "polite", children: "Loading edit history…" }),
    !m && !v && p.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: b0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: S2, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !m && !v && p.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: p2, children: p.map((T) => {
      const q = i && C && !!T.chain_snapshot_json && T.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: g2, children: [
        /* @__PURE__ */ c.jsx("span", { className: v2, children: N2(T.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: y2, children: T.operation_count === 0 ? "cleared" : `${T.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: b2, title: T.digest_after, children: [
          T.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: y0, children: T.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: x2,
            style: {
              background: `color-mix(in oklab, ${T.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: T.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: T.digest_before === "" || !T.digest_before ? "create" : T.operation_count === 0 ? "clear" : "update"
          }
        ),
        q && /* @__PURE__ */ c.jsx(
          Ye,
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
function Us(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function N2(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var C2 = "_1uzgubz0", T2 = "_1uzgubz1", R2 = "_1uzgubz2", _2 = "_1uzgubz3", M2 = "_1uzgubz4", A2 = "_1uzgubz5", k2 = "_1uzgubz6", D2 = "_1uzgubz7", x0 = "_1uzgubz8", z2 = "_1uzgubz9", j1 = "_1uzgubza", E1 = "_1uzgubzb", O2 = "_1uzgubzc", L2 = "_1uzgubzd", Xo = "_1uzgubze", Qo = "_1uzgubzf", $2 = "_1uzgubzg", U2 = "_1uzgubzh", S0 = "_1uzgubzi", w0 = "_1uzgubzj", j0 = "_1uzgubzk", E0 = "_1uzgubzl", N0 = "_1uzgubzm", B2 = "_1uzgubzn", V2 = "_1uzgubzo", I2 = "_1uzgubzp", H2 = "_1uzgubzq";
function q2({
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
  const [S, j] = g.useState(!1), N = i ? o.find((_) => _.voiceAssetId === i.speakerVoiceAssetId) : null, R = i?.defaultVectorPresetId ? u.find((_) => _.presetId === i.defaultVectorPresetId) ?? null : null, C = (t[0] ?? "?").toUpperCase(), O = i !== null;
  return /* @__PURE__ */ c.jsxs("div", { className: `${C2}${f ? ` ${T2}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: R2,
        onClick: p,
        "aria-expanded": f,
        children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: _2,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: C
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: M2, children: [
            /* @__PURE__ */ c.jsx("span", { className: A2, style: { color: a }, children: t }),
            /* @__PURE__ */ c.jsxs("span", { className: k2, children: [
              s,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: D2, children: [
            N ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: x0, children: N.displayName }),
              N.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                C0(N.durationMs),
                " ·",
                " ",
                N.sampleRate ? `${N.sampleRate} Hz` : "—"
              ] })
            ] }) : R ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: x0, children: R.presetName }),
              /* @__PURE__ */ c.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ c.jsx("span", { children: "no voice assigned" }),
            i?.voiceAssetChainDigest && /* @__PURE__ */ c.jsxs("span", { className: O2, children: [
              "chain · ",
              i.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: `${z2} ${O ? j1 : E1}`,
              children: O ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    f && /* @__PURE__ */ c.jsxs("div", { className: L2, children: [
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
            onKeyDown: (_) => {
              _.key === "Enter" && (_.preventDefault(), _.currentTarget.blur());
            },
            onBlur: (_) => {
              const T = _.target.value.trim();
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
            className: `${$2}${S ? ` ${U2}` : ""}`,
            onDragEnter: (_) => {
              _.preventDefault(), j(!0);
            },
            onDragOver: (_) => _.preventDefault(),
            onDragLeave: () => j(!1),
            onDrop: (_) => {
              _.preventDefault(), j(!1);
              const T = _.dataTransfer.files?.[0];
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
                  onChange: (_) => {
                    const T = _.target.files?.[0];
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
        /* @__PURE__ */ c.jsx("div", { className: S0, children: o.map((_) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${w0}${i?.speakerVoiceAssetId === _.voiceAssetId ? ` ${j0}` : ""}`,
            onClick: () => y(_.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: E0, children: _.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: N0, children: [
                _.durationMs != null ? C0(_.durationMs) : "—",
                " ",
                "·",
                " ",
                _.sampleRate ? `${_.sampleRate} Hz` : "—"
              ] })
            ]
          },
          _.voiceAssetId
        )) })
      ] }),
      u.length > 0 && m && /* @__PURE__ */ c.jsxs("div", { className: Xo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Qo, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: S0, children: u.map((_) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${w0}${i?.defaultVectorPresetId === _.presetId ? ` ${j0}` : ""}`,
            onClick: () => m(_.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: E0, children: _.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: N0, children: "preset · vector" })
            ]
          },
          _.presetId
        )) })
      ] }),
      O && v && /* @__PURE__ */ c.jsx(Ye, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function C0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function F2({
  unmappedCount: t,
  totalCount: a,
  children: s,
  emptyHint: i
}) {
  if (a === 0)
    return /* @__PURE__ */ c.jsx("p", { className: H2, children: i ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("header", { className: B2, children: /* @__PURE__ */ c.jsx(
      "span",
      {
        className: `${V2} ${o ? j1 : E1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: I2, children: s })
  ] });
}
async function vl() {
  return Ct("/runtime/health");
}
async function Y2(t) {
  await Ct("/runtime/start", {
    method: "POST",
    ...t != null ? { body: JSON.stringify({ numWorkers: t }) } : {}
  });
}
async function G2() {
  return Ct("/runtime/stop", { method: "POST" });
}
function N1(t) {
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
//! Desired concurrent-worker count for the next runtime start.
//!
//! Shared between the recipe header's worker selector and the host-action
//! bridge, which performs the actual `startRuntime`. The host re-clamps to
//! `[1, EMOTIONTTS_MAX_WORKERS]` regardless of what the UI sends, so this is
//! only a preference, never a trust boundary.
let C1 = 1;
function P2() {
  return C1;
}
function T0(t) {
  C1 = Number.isFinite(t) ? Math.max(1, Math.floor(t)) : 1;
}
var K2 = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function Dn({
  severity: t,
  children: a,
  role: s,
  ariaLive: i,
  className: o,
  style: u
}) {
  const f = [K2[t], o].filter(Boolean).join(" "), p = s ?? (t === "error" ? "alert" : "status"), y = i ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: f, role: p, "aria-live": y, style: u, children: a });
}
var T1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, R1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, X2 = "_13bb4njb";
function Wr({
  tone: t,
  size: a = "sm",
  pulse: s = !1,
  children: i,
  className: o,
  style: u,
  title: f
}) {
  const p = s && t !== "faint", y = [T1[a], R1[t], p ? X2 : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: y, style: u, title: f, children: i });
}
const Q2 = 4e3;
function Z2({ deployment: t }) {
  const [a, s] = g.useState(null), [i, o] = g.useState(null), [u, f] = g.useState(1), p = g.useState({ done: !1 })[0];
  g.useEffect(() => {
    let S = !1;
    const j = async () => {
      try {
        const R = await vl();
        S || (s(R), o(null));
      } catch (R) {
        S || o(aM(R));
      }
    };
    j();
    const N = setInterval(j, Q2);
    return () => {
      S = !0, clearInterval(N);
    };
  }, []), g.useEffect(() => {
    const S = a?.workersActive;
    S != null && !p.done && (p.done = !0, f(S), T0(S));
  }, [a?.workersActive, p]);
  const y = a?.badge ?? "not_installed", m = i?.includes("model_missing") ?? !1, b = a?.workersCeiling ?? 1, v = a?.workersActive ?? 1, w = y === "ready" || y === "running" || y === "starting";
  return /* @__PURE__ */ c.jsxs("output", { className: t_, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: Yr, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: Yr, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Wr, { tone: tM(y), pulse: y === "starting" || y === "installing", children: N1(y) }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Yr, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: nM(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: Yr, children: "VRAM" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    b > 1 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Yr, children: "Workers" }),
      /* @__PURE__ */ c.jsxs("span", { style: J2, children: [
        /* @__PURE__ */ c.jsx(
          "select",
          {
            value: u,
            "aria-label": "Concurrent workers for the next runtime start",
            onChange: (S) => {
              const j = Number(S.target.value);
              f(j), T0(j);
            },
            style: W2,
            children: Array.from({ length: b }, (S, j) => j + 1).map((S) => /* @__PURE__ */ c.jsx("option", { value: S, children: S }, S))
          }
        ),
        /* @__PURE__ */ c.jsx("span", { style: eM, children: w && u !== v ? `restart to apply · active ${v}` : `~${u}× model VRAM` })
      ] })
    ] }),
    m && /* @__PURE__ */ c.jsxs(Dn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "IndexTTS-2 model is not installed." }),
      " ",
      "Open ",
      /* @__PURE__ */ c.jsx("em", { children: "Settings → Dependencies → Install all" }),
      " to download the required artifacts, then retry."
    ] }),
    i && !m && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: i })
  ] });
}
const J2 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8
}, W2 = {
  height: 24,
  padding: "0 6px",
  background: "var(--surface-floor, #0c0e10)",
  border: "1px solid rgba(70,72,74,0.4)",
  borderRadius: 6,
  color: "var(--on-surface)",
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  outline: "none",
  cursor: "pointer"
}, eM = {
  fontSize: 11,
  color: "var(--on-surface-variant, #c4c7c5)"
};
function tM(t) {
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
function nM(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function aM(t) {
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
function rM(t, a, s) {
  for (const i of Object.keys(Cc)) {
    const o = Cc[i];
    if (Math.abs(o.low - t) < Ia && Math.abs(o.mid - a) < Ia && Math.abs(o.high - s) < Ia)
      return i;
  }
  return "custom";
}
function sM(t) {
  let a = lM();
  for (const s of t.ops)
    a = iM(a, s);
  return a;
}
function iM(t, a) {
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
          preset: rM(a.low_db, a.mid_db, a.high_db)
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
function lM() {
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
function oM(t, a) {
  const s = Er(t, "gain");
  if (Math.abs(a) < Ia) return { ...t, ops: s };
  const i = { id: zn(), mode: "gain", gain_db: a };
  return { ...t, ops: Nr(s, i) };
}
function cM(t, a, s, i) {
  const o = Er(t, "eq3");
  if (Math.abs(a) < Ia && Math.abs(s) < Ia && Math.abs(i) < Ia)
    return { ...t, ops: o };
  const u = {
    id: zn(),
    mode: "eq3",
    low_db: a,
    mid_db: s,
    high_db: i
  };
  return { ...t, ops: Nr(o, u) };
}
function uM(t, a) {
  const s = Er(t, "speed");
  if (Math.abs(a - 1) < Ia) return { ...t, ops: s };
  const i = { id: zn(), mode: "speed", factor: a };
  return { ...t, ops: Nr(s, i) };
}
function dM(t, a) {
  const s = Er(t, "pitch_shift");
  if (Math.abs(a) < Ia) return { ...t, ops: s };
  const i = {
    id: zn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Nr(s, i) };
}
function fM(t, a, s) {
  const i = Er(t, "normalize");
  if (a === "off") return { ...t, ops: i };
  const o = {
    id: zn(),
    mode: "normalize",
    target_lufs: s
  };
  return { ...t, ops: Nr(i, o) };
}
function hM(t, a) {
  const s = Er(t, "fade_in");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: zn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(s, i) };
}
function mM(t, a) {
  const s = Er(t, "fade_out");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: zn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(s, i) };
}
function pM(t, a, s) {
  const i = Er(t, "silence_strip");
  if (!a) return { ...t, ops: i };
  const o = {
    id: zn(),
    mode: "silence_strip",
    threshold_db: s
  };
  return { ...t, ops: Nr(i, o) };
}
const _1 = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function M1(t, a) {
  const s = {
    ...t,
    ops: t.ops.filter((u) => !_1.has(u.mode))
  };
  let o = oM({ version: 1, ops: [] }, a.volumeDb);
  return o = cM(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = uM(o, a.speed.value)), o = dM(o, a.pitchSt), o = fM(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = hM(o, a.fade.inS), o = mM(o, a.fade.outS), o = pM(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...s, ops: [...s.ops, ...o.ops] };
}
function A1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((s) => _1.has(s.mode))
  };
  return sM(a);
}
var gM = "_1rsa80i0", vM = "_1rsa80i1", yM = "_1rsa80i2", bM = "_1rsa80i3", xM = "_1rsa80i4", SM = "_1rsa80i5", wM = "_1rsa80i6", jM = "_1rsa80i7", EM = "_1rsa80i8", NM = "_1rsa80i9";
const k1 = ["flat", "warm", "bright", "voice", "telephone"], el = -12, Zo = 12, CM = 0.5;
function TM(t) {
  const { low: a, mid: s, high: i, preset: o, onChange: u, disabled: f } = t, p = (m) => {
    const b = Cc[m];
    u(b.low, b.mid, b.high, m);
  }, y = (m, b) => {
    const v = { low: a, mid: s, high: i, [m]: b }, w = _M(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, w);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: gM, children: [
    /* @__PURE__ */ c.jsxs("div", { className: vM, role: "group", "aria-label": "EQ presets", children: [
      k1.map((m) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: yM,
          "data-active": o === m,
          onClick: () => p(m),
          disabled: f,
          children: m
        },
        m
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: bM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: xM, children: [
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
  return /* @__PURE__ */ c.jsxs("div", { className: SM, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: u, className: wM, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: el,
        max: Zo,
        step: CM,
        value: a,
        disabled: i,
        className: EM,
        style: { "--fill": `${o}%` },
        onChange: (f) => s(Number(f.target.value)),
        "aria-valuemin": el,
        "aria-valuemax": Zo,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: jM, children: RM(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: NM, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: el }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Zo
      ] })
    ] })
  ] });
}
function RM(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const xf = 1e-3;
function _M(t, a, s) {
  for (const i of k1) {
    const o = Cc[i];
    if (Math.abs(o.low - t) < xf && Math.abs(o.mid - a) < xf && Math.abs(o.high - s) < xf)
      return i;
  }
  return "custom";
}
var MM = "_85bhwb0", AM = "_85bhwb1", R0 = "_85bhwb2", kM = "_85bhwb3", DM = "_85bhwb4", zM = "_85bhwb5", OM = "_85bhwb6", LM = "_85bhwb7";
const Jo = 0.5, Sf = 2, $M = 0.05;
function UM(t) {
  const { mode: a, value: s, supportsSynthSpeed: i, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, p = (s - Jo) / (Sf - Jo) * 100, y = g.useId(), m = (v) => o(v, s), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: MM, children: [
    i ? /* @__PURE__ */ c.jsxs("div", { className: AM, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: R0,
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
          className: R0,
          "data-active": a === "synth",
          onClick: () => m("synth"),
          disabled: f,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: kM, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: y,
          type: "range",
          min: Jo,
          max: Sf,
          step: $M,
          value: s,
          disabled: f,
          className: DM,
          style: { "--fill": `${p}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Jo,
          "aria-valuemax": Sf,
          "aria-valuenow": s,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: zM, children: `${s.toFixed(2)}×` })
    ] }),
    a === "synth" && i ? /* @__PURE__ */ c.jsxs("div", { className: OM, children: [
      /* @__PURE__ */ c.jsx(
        Ye,
        {
          variant: "primary",
          size: "sm",
          onClick: u,
          disabled: f || !u,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: LM, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var BM = "kgszk50", VM = "kgszk51", _0 = "kgszk52", IM = "kgszk53", HM = "kgszk54", D1 = "kgszk55", qM = "kgszk56", FM = "kgszk58", Zh = "kgszk59", z1 = "kgszk5a", Jh = "kgszk5b", YM = "kgszk5c", GM = "kgszk5d", PM = "kgszk5e", M0 = "kgszk5f", A0 = "kgszk5g", k0 = "kgszk5h", KM = "kgszk5i", XM = "kgszk5j", QM = "kgszk5l", yl = "kgszk5m", bl = "kgszk5n";
const ZM = -24, JM = 24, WM = 0.5, eA = -12, tA = 12, nA = 0.5, aA = -30, rA = -6, sA = -12, iA = 0, Wo = -60, wf = -20;
function Wh(t) {
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
  }, v = uA(a), w = (S) => {
    const j = S.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: BM, onPointerDownCapture: w, children: [
    /* @__PURE__ */ c.jsxs("div", { className: VM, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: IM, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: _0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      f ? /* @__PURE__ */ c.jsxs("span", { className: _0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: HM, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      D0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: ZM,
        max: JM,
        step: WM,
        format: dA,
        value: a.volumeDb,
        onChange: (S) => b({ volumeDb: S }),
        disabled: p
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
      /* @__PURE__ */ c.jsx("span", { className: bl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        TM,
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
        UM,
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
      D0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: eA,
        max: tA,
        step: nA,
        format: fA,
        value: a.pitchSt,
        onChange: (S) => b({ pitchSt: S }),
        disabled: p
      }
    ),
    /* @__PURE__ */ c.jsx(
      lA,
      {
        normalize: a.normalize,
        disabled: p,
        onChange: (S) => b({ normalize: S })
      }
    ),
    /* @__PURE__ */ c.jsx(
      oA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: p,
        onChange: (S, j) => b({ fade: { ...a.fade, inS: S, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      cA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: p,
        onChange: (S, j) => b({ silence: { enabled: S, thresholdDb: j } })
      }
    ),
    y ? /* @__PURE__ */ c.jsxs("div", { className: QM, children: [
      /* @__PURE__ */ c.jsx(
        Ye,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => s(Gc),
          disabled: p,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx(Ye, { variant: "primary", size: "md", onClick: y, disabled: p, children: m })
    ] }) : null
  ] });
}
function D0(t) {
  const { label: a, sub: s, min: i, max: o, step: u, format: f, value: p, onChange: y, disabled: m } = t, b = (p - i) / (o - i) * 100, v = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: D1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: qM, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: FM, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: z1, children: s })
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
        className: Jh,
        style: { "--fill": `${b}%` },
        onChange: (w) => y(Number(w.target.value)),
        "aria-valuemin": i,
        "aria-valuemax": o,
        "aria-valuenow": p
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Zh, children: f(p) })
  ] });
}
function lA({ normalize: t, onChange: a, disabled: s }) {
  const o = t.mode === "loudness" ? { min: aA, max: rA, step: 0.5, suffix: "LUFS" } : { min: sA, max: iA, step: 0.5, suffix: "dB" }, u = hA(t.targetDbOrLufs, o.min, o.max), f = (u - o.min) / (o.max - o.min) * 100, p = (y) => {
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
    /* @__PURE__ */ c.jsx("div", { className: YM, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((y) => {
      const m = y === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: GM,
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
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: D1, children: [
      /* @__PURE__ */ c.jsx("span", { className: z1, children: "Target" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: u,
          disabled: s,
          className: Jh,
          style: { "--fill": `${f}%` },
          onChange: (y) => a({ mode: t.mode, targetDbOrLufs: Number(y.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": u,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Zh, children: [
        u.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function oA({ inS: t, outS: a, onChange: s, disabled: i }) {
  const o = g.useId(), u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
    /* @__PURE__ */ c.jsx("span", { className: bl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: PM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: M0, children: [
        /* @__PURE__ */ c.jsx("label", { className: A0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: i,
            className: k0,
            onChange: (f) => s(Math.max(0, Number(f.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: M0, children: [
        /* @__PURE__ */ c.jsx("label", { className: A0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: i,
            className: k0,
            onChange: (f) => s(t, Math.max(0, Number(f.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function cA({ enabled: t, thresholdDb: a, onChange: s, disabled: i }) {
  const o = (a - Wo) / (wf - Wo) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
    /* @__PURE__ */ c.jsx("span", { className: bl, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: KM, children: [
      /* @__PURE__ */ c.jsxs("label", { className: XM, children: [
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
          className: Jh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => s(t, Number(u.target.value)),
          "aria-valuemin": Wo,
          "aria-valuemax": wf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Zh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Bs = 1e-3;
function uA(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Bs && a.push("gain"), (Math.abs(t.eq3.low) >= Bs || Math.abs(t.eq3.mid) >= Bs || Math.abs(t.eq3.high) >= Bs) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Bs && a.push("speed"), Math.abs(t.pitchSt) >= Bs && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function dA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function fA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function hA(t, a, s) {
  return Number.isFinite(t) ? Math.max(a, Math.min(s, t)) : a;
}
var mA = "skdk4g0", pA = "skdk4g1", z0 = "skdk4g2", gA = "skdk4g3", vA = "skdk4g4", yA = "skdk4g5", bA = "skdk4g6", xA = "skdk4g7", SA = "skdk4g8", wA = "skdk4g9", jA = "skdk4ga", EA = "skdk4gb", NA = "skdk4gc", CA = "skdk4gd", O0 = "skdk4ge", L0 = "skdk4gf", TA = "skdk4gg", $0 = "skdk4gh", U0 = "skdk4gi", RA = "skdk4gj", _A = "skdk4gk", MA = "skdk4gl", B0 = "skdk4gm", AA = "skdk4gn", kA = "skdk4gp", DA = "skdk4gq", zA = "skdk4gr", OA = "skdk4gs", LA = "skdk4gt", $A = "skdk4gu", UA = "skdk4gv", V0 = "skdk4gw", BA = "skdk4gx", VA = "skdk4gy", IA = "skdk4gz", HA = "skdk4g10", qA = "cgsfgh1", FA = "cgsfgh2", YA = "cgsfgh3", GA = "cgsfgh4", PA = "cgsfgh5", KA = "cgsfgh6", XA = "cgsfgh7", QA = "cgsfgh8", ZA = "cgsfgh9", JA = "cgsfgha", WA = "cgsfghb", e3 = "cgsfghc", t3 = "cgsfghd", n3 = "cgsfghe", a3 = "cgsfghm", r3 = "cgsfghn", s3 = "cgsfgho", i3 = "cgsfghp";
const an = [
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
}, O1 = 0.05;
function l3(t) {
  let a = null, s = -1 / 0;
  for (const i of an) {
    const o = t[i];
    o > s && (s = o, a = i);
  }
  return !a || s <= O1 ? null : a;
}
function L1(t, a = 3) {
  return an.map((s) => ({ key: s, label: xl[s], value: t[s] })).filter((s) => s.value > O1).sort((s, i) => i.value - s.value).slice(0, a);
}
function o3(t) {
  let a = 0;
  for (const s of an) a += t[s] * t[s];
  return Math.sqrt(a);
}
function I0(t) {
  const a = L1(t, 2), s = a[0];
  if (!s) return "";
  const i = a[1];
  return !i || s.value - i.value > 0.25 ? jf(s.label) : `${jf(s.label)} + ${i.label.toLowerCase()}`;
}
function jf(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function es(t) {
  const a = { ...Js };
  for (const s of an) {
    const i = t[s];
    a[s] = Number.isFinite(i) ? Math.max(0, Math.min(1, i)) : 0;
  }
  return a;
}
const H0 = 0.05, q0 = 0.2, c3 = 22, u3 = 320, Ef = 0.78;
function Nf(t, a, s, i) {
  const o = Math.cos(s), u = Math.sin(s), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / i));
}
function d3(t) {
  const { vec: a, onChange: s, size: i, reduceMotion: o = !1 } = t, [u, f] = g.useState(a), [p, y] = g.useState(null), [m, b] = g.useState(null), v = g.useRef(null), w = g.useRef(a), S = g.useRef(o), j = g.useRef(null), N = g.useRef(0);
  S.current = o, g.useEffect(() => {
    f(a), w.current = a;
  }, [a]);
  const R = g.useCallback(
    (V) => {
      const D = es(V);
      f(D), w.current = D, s(D);
    },
    [s]
  ), C = g.useCallback((V) => {
    const D = es(V);
    f(D), w.current = D;
  }, []), O = g.useCallback(
    (V) => {
      const D = v.current;
      if (!D || S.current) return;
      const F = V.clientX - D.centerX, W = V.clientY - D.centerY, ae = i / 2 * Ef, K = Nf(F, W, D.angle, ae), le = { ...w.current, [D.axis]: K };
      C(le);
    },
    [i, C]
  ), _ = g.useCallback(
    (V) => {
      const D = v.current;
      if (D) {
        if (window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), S.current) {
          const F = V.clientX - D.centerX, W = V.clientY - D.centerY, ae = i / 2 * Ef, K = Nf(F, W, D.angle, ae), le = { ...w.current, [D.axis]: K };
          v.current = null, R(le);
          return;
        }
        v.current = null, R(w.current);
      }
    },
    [R, O, i]
  );
  g.useEffect(() => () => {
    window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), v.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [O, _]);
  const T = g.useCallback((V, D) => {
    S.current || (N.current += 1, b({ x: V, y: D, key: N.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, u3));
  }, []), q = g.useCallback(
    (V, D, F, W, ae) => {
      const K = F.getBoundingClientRect(), le = K.left + K.width / 2, A = K.top + K.height / 2, $ = an.indexOf(V) / an.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: V,
        pointerId: D,
        centerX: le,
        centerY: A,
        angle: $
      }, y(V), W !== void 0 && ae !== void 0) {
        const se = W - le, de = ae - A, k = i / 2 * Ef, H = Nf(se, de, $, k), Z = { ...w.current, [V]: H };
        S.current ? R(Z) : C(Z);
      }
      window.addEventListener("pointermove", O), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
    },
    [R, O, _, i, C]
  ), Q = g.useCallback(
    (V, D) => {
      D.preventDefault();
      const F = D.currentTarget, W = F.ownerSVGElement ?? F;
      q(V, D.pointerId, W);
    },
    [q]
  ), re = g.useCallback(
    (V) => {
      const D = V.currentTarget, F = D instanceof SVGSVGElement ? D : D.ownerSVGElement ?? D, W = F.getBoundingClientRect(), ae = W.left + W.width / 2, K = W.top + W.height / 2, le = V.clientX - ae, A = V.clientY - K;
      if (Math.sqrt(le * le + A * A) < 8) return;
      let $ = Math.atan2(A, le) * 180 / Math.PI;
      $ = (($ + 90) % 360 + 360) % 360;
      let se = null, de = 999;
      for (let Z = 0; Z < an.length; Z++) {
        const P = an[Z];
        if (!P) continue;
        const B = Z / an.length * 360, J = Math.abs((B - $ + 540) % 360 - 180);
        J < de && (de = J, se = P);
      }
      if (!se || de > c3) return;
      V.preventDefault();
      const k = (V.clientX - W.left) / W.width * i, H = (V.clientY - W.top) / W.height * i;
      T(k, H), q(se, V.pointerId, F, V.clientX, V.clientY);
    },
    [q, i, T]
  ), M = g.useCallback(
    (V, D) => {
      const F = w.current[V];
      let W = F;
      switch (D.key) {
        case "ArrowUp":
        case "ArrowRight":
          W = F + H0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          W = F - H0;
          break;
        case "PageUp":
          W = F + q0;
          break;
        case "PageDown":
          W = F - q0;
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
      D.preventDefault(), y(V), R({ ...w.current, [V]: W });
    },
    [R]
  );
  return {
    liveVec: u,
    activeAxis: p,
    setActiveAxis: y,
    onPointerDown: Q,
    onKeyDown: M,
    onSurfacePointerDown: re,
    surfacePing: m
  };
}
const f3 = [0.25, 0.5, 0.75, 1];
function h3({
  vec: t,
  onChange: a,
  size: s = 360,
  readOnly: i = !1,
  reduceMotion: o = !1
}) {
  const u = d3({ vec: t, onChange: a, size: s, reduceMotion: o }), f = s / 2, p = s / 2, y = s / 2 * 0.78, m = g.useMemo(() => m3(f, p, y), [f, p, y]), b = g.useMemo(() => an.map((v, w) => {
    const S = yc(u.liveVec[v]), j = m[w];
    return j ? `${f + j.dx * S},${p + j.dy * S}` : "0,0";
  }).join(" "), [m, f, p, u.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: qA, children: /* @__PURE__ */ c.jsx("div", { className: FA, style: { width: s, height: s }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: YA,
      viewBox: `0 0 ${s} ${s}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: i ? void 0 : u.onSurfacePointerDown,
      style: i ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        f3.map((v) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: GA,
            cx: f,
            cy: p,
            r: y * v
          },
          v
        )),
        an.map((v, w) => {
          const S = m[w];
          if (!S) return null;
          const j = f + S.dx * 1.18, N = p + S.dy * 1.18, R = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: PA,
                x1: f,
                y1: p,
                x2: f + S.dx,
                y2: p + S.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${t3}${R ? ` ${n3}` : ""}`,
                x: j,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: xl[v]
              }
            )
          ] }, v);
        }),
        an.map((v, w) => {
          const S = yc(u.liveVec[v]);
          if (S <= 0.01) return null;
          const j = m[w];
          if (!j) return null;
          const N = u.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${XA}${N ? ` ${QA}` : ""}`,
              x1: f,
              y1: p,
              x2: f + j.dx * S,
              y2: p + j.dy * S
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: KA, points: b }),
        u.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: e3,
            cx: u.surfacePing.x,
            cy: u.surfacePing.y,
            r: 10
          },
          u.surfacePing.key
        ),
        !i && an.map((v, w) => {
          const S = yc(u.liveVec[v]), j = m[w];
          if (!j) return null;
          const N = f + j.dx * S, R = p + j.dy * S, C = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: ZA,
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
                className: `${JA}${C ? ` ${WA}` : ""}`,
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
function m3(t, a, s) {
  return an.map((i, o) => {
    const u = o / an.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(u) * s,
      dy: Math.sin(u) * s
    };
  });
}
function yc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function p3({ vec: t, size: a = 36 }) {
  const s = a / 2, i = a / 2, o = a / 2 * 0.86, u = g.useMemo(() => an.map((f, p) => {
    const y = yc(t[f]), m = p / an.length * Math.PI * 2 - Math.PI / 2, b = s + Math.cos(m) * o * y, v = i + Math.sin(m) * o * y;
    return `${b},${v}`;
  }).join(" "), [s, i, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: a3, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: r3,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: s3, cx: s, cy: i, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: i3, points: u })
      ]
    }
  ) });
}
var g3 = "_1jqr3aj0", v3 = "_1jqr3aj1", y3 = "_1jqr3aj2", b3 = "_1jqr3aj3", x3 = "_1jqr3aj4", S3 = "_1jqr3aj5", w3 = "_1jqr3aj6", j3 = "_1jqr3aj7";
const F0 = 0.05, Y0 = 0.2;
function E3({
  vec: t,
  onChange: a,
  readOnly: s = !1,
  reduceMotion: i = !1
}) {
  const [o, u] = g.useState(null), f = g.useRef(null), p = g.useRef(/* @__PURE__ */ new Map()), y = g.useCallback(
    (j, N) => {
      const R = Math.max(0, Math.min(1, N));
      a(es({ ...t, [j]: R }));
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
          C = R + F0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          C = R - F0;
          break;
        case "PageUp":
          C = R + Y0;
          break;
        case "PageDown":
          C = R - Y0;
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
  return /* @__PURE__ */ c.jsx("div", { className: g3, role: "group", "aria-label": "Emotion axis sliders", children: an.map((j) => {
    const N = N3(t[j] ?? 0), R = N > 0.05, C = o === j, O = xl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${v3}${R ? ` ${y3}` : ""}${C ? ` ${b3}` : ""}`,
        role: "slider",
        "aria-label": `${O} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": s,
        disabled: s,
        onPointerDown: (_) => b(j, _),
        onPointerMove: (_) => v(j, _),
        onPointerUp: (_) => w(j, _),
        onPointerCancel: (_) => w(j, _),
        onKeyDown: (_) => S(j, _),
        onFocus: () => u(j),
        onBlur: () => u(null),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: x3, children: O }),
          /* @__PURE__ */ c.jsx("span", { className: S3, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: w3,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: j3, children: N.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function N3(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var G0 = "gvwvwg0", C3 = "gvwvwg2", T3 = "gvwvwg3", R3 = "gvwvwg8", _3 = "gvwvwg9", M3 = "gvwvwga", A3 = "gvwvwgb", k3 = "gvwvwgc", D3 = "gvwvwgd", z3 = "gvwvwge";
function O3({
  presets: t,
  activePresetId: a,
  onSelect: s,
  onDelete: i
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: G0, children: [
    /* @__PURE__ */ c.jsx("span", { className: C3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: T3, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: G0, children: [
    /* @__PURE__ */ c.jsx("span", { className: z3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: R3, children: t.map((o) => {
      const u = L3(o), f = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${_3}${f ? ` ${A3}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: M3,
                onClick: () => s(o),
                "aria-pressed": f,
                children: [
                  /* @__PURE__ */ c.jsx(p3, { vec: u, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: k3, children: o.presetName })
                ]
              }
            ),
            i && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: D3,
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
function L3(t) {
  const a = rh.reduce(
    (i, o) => ({ ...i, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const s = rh.reduce(
    (i, o, u) => ({ ...i, [o]: t.vector[u] ?? 0 }),
    a
  );
  return es(s);
}
function Cf(t) {
  return rh.map((a) => t[a] ?? 0);
}
const $3 = [
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
], U3 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], B3 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], V3 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function I3(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Js };
  const i = a.split(/\s+/).some((f) => U3.includes(f)) ? 1.2 : 1, o = B3.some((f) => a.includes(f)) ? 0.55 : 1, u = { ...Js };
  for (const f of $3) {
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
      V3.some((C) => new RegExp(`\\b${C}\\b`).test(R)) || (p += 1);
    }
    if (p > 0) {
      const y = f.weight * Math.min(1, 0.55 + 0.2 * (p - 1)) * i * o;
      u[f.axis] = Math.min(1, y);
    }
  }
  return an.every((f) => u[f] === 0) && (u.calm = 0.4), es(u);
}
const H3 = [
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function q3({
  value: t,
  onChange: a,
  deploymentId: s,
  presets: i,
  onPresetsChange: o
}) {
  const u = t.mode ?? "emotion_vector", f = u === "none" || u === "audio_ref" ? "emotion_vector" : u, p = g.useMemo(() => F3(t.vector), [t.vector]), y = t.emotionAlpha ?? 1, [m, b] = g.useState(null), [v, w] = g.useState(!1), [S, j] = g.useState(null), [N, R] = g.useState(""), [C, O] = g.useState(!1), _ = g.useRef(!0);
  g.useEffect(() => (_.current = !0, () => {
    _.current = !1;
  }), []), g.useEffect(() => {
    C || R(I0(p));
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
    q(es(Js));
  }, re = ($) => {
    const se = Math.max(0, Math.min(10, Number.isFinite($) ? $ : 1));
    a({ ...t, emotionAlpha: se });
  }, M = async () => {
    const $ = N.trim();
    if ($) {
      w(!0), b(null);
      try {
        const se = await c2(s, $, Cf(p));
        if (!_.current) return;
        o(
          Y3([se, ...i.filter((de) => de.presetId !== se.presetId)])
        ), j(se.presetId), O(!1);
      } catch (se) {
        _.current && b(P0(se));
      } finally {
        _.current && w(!1);
      }
    }
  }, V = async ($) => {
    const se = [...i];
    o(i.filter((de) => de.presetId !== $)), S === $ && j(null);
    try {
      await u2(s, $);
    } catch (de) {
      _.current && (o(se), b(P0(de)));
    }
  }, D = ($) => {
    j($.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: $.vector
    });
  }, F = ($) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: $ });
  }, W = l3(p), ae = o3(p), K = L1(p, 3), le = K.length > 0 && N.trim().length > 0 && !v, A = I0(p) || "name your preset…", G = f !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: mA, children: [
    /* @__PURE__ */ c.jsxs("div", { className: pA, children: [
      /* @__PURE__ */ c.jsx("span", { className: z0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: gA, role: "radiogroup", "aria-label": "Emotion mode", children: H3.map(($) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": f === $.id,
          className: `${vA}${f === $.id ? ` ${yA}` : ""}`,
          onClick: () => T($.id),
          children: $.label
        },
        $.id
      )) })
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: RA, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: _A,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: ($) => F($.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: MA, children: [
        /* @__PURE__ */ c.jsx(
          Ye,
          {
            variant: "secondary",
            onClick: () => {
              const $ = (t.qwenTemplate ?? "").trim();
              if (!$) return;
              const se = I3($);
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
        /* @__PURE__ */ c.jsx("span", { className: B0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: B0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    f === "emotion_vector" && /* @__PURE__ */ c.jsxs("div", { className: CA, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${u0} ${bA}`, children: /* @__PURE__ */ c.jsx(
        h3,
        {
          vec: p,
          onChange: q,
          readOnly: G
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${u0} ${xA}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: SA, children: [
          /* @__PURE__ */ c.jsx("span", { className: z0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: wA, children: W ? xl[W].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: jA, children: [
            "‖v‖ = ",
            ae.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(E3, { vec: p, onChange: q, readOnly: G }),
        /* @__PURE__ */ c.jsx("div", { className: EA, children: /* @__PURE__ */ c.jsxs(
          Ye,
          {
            variant: "ghost",
            size: "sm",
            onClick: Q,
            disabled: G || ae < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: NA,
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
      /* @__PURE__ */ c.jsxs("div", { className: O0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: L0, children: "Alpha" }),
          /* @__PURE__ */ c.jsx("br", {}),
          /* @__PURE__ */ c.jsx("span", { className: TA, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: y,
            className: $0,
            style: { "--fill": `${y * 10}%` },
            onChange: ($) => re(Number($.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: U0, children: [
          (y * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${kA}${K.length === 0 ? ` ${DA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: zA, children: [
              /* @__PURE__ */ c.jsx("span", { className: OA, children: "Save current as preset" }),
              K.length === 0 && /* @__PURE__ */ c.jsx("span", { className: LA, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: $A, children: [
              /* @__PURE__ */ c.jsx("div", { className: UA, children: K.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${V0} ${VA}`, children: "no axes set" }) : K.map(($) => /* @__PURE__ */ c.jsxs("span", { className: V0, children: [
                $.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: BA, children: $.value.toFixed(2) })
              ] }, $.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: IA, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: HA,
                    placeholder: A,
                    value: N,
                    disabled: K.length === 0 || v,
                    onChange: ($) => {
                      R($.target.value), O(!0);
                    },
                    onKeyDown: ($) => {
                      $.key === "Enter" && le && M();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  Ye,
                  {
                    variant: "primary",
                    disabled: !le,
                    onClick: M,
                    children: v ? "Saving…" : "+ Save"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ c.jsx(
        O3,
        {
          presets: i,
          activePresetId: S,
          onSelect: D,
          onDelete: V
        }
      )
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: O0, children: [
      /* @__PURE__ */ c.jsx("span", { className: L0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: y,
          className: $0,
          style: { "--fill": `${y * 10}%` },
          onChange: ($) => re(Number($.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: U0, children: [
        (y * 100).toFixed(0),
        "%"
      ] })
    ] }),
    m && /* @__PURE__ */ c.jsx("div", { className: AA, children: m })
  ] });
}
function F3(t) {
  if (!t || !Array.isArray(t)) return es(Js);
  const a = { ...Js };
  return an.forEach((s, i) => {
    const o = t[i];
    a[s] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function Y3(t) {
  return [...t].sort((a, s) => s.updatedAt - a.updatedAt);
}
function P0(t) {
  return t instanceof ni || t instanceof Error ? t.message : "Unknown error";
}
var G3 = "_5u1uau0", tl = "_5u1uau1", P3 = "_5u1uau2", Vs = "_5u1uau3", nl = "_5u1uau4", K3 = "_5u1uau5", Tf = "_5u1uau6", X3 = "_5u1uau7", Q3 = "_5u1uau8", Z3 = "_5u1uau9", J3 = "_5u1uaua", W3 = "_5u1uaub", e5 = "_5u1uauc", t5 = "_5u1uaud", n5 = "_5u1uaue", K0 = "_5u1uauf", X0 = "_5u1uaug", a5 = "_5u1uauh";
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
], r5 = ["mp3", "wav", "flac"], ec = 0.5, _f = 2, s5 = 0.05, i5 = 0.8, l5 = 0.8, Q0 = 42;
function tc(t, a, s) {
  const i = t[a];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  if (typeof i == "string") {
    const o = Number(i);
    if (Number.isFinite(o)) return o;
  }
  return s;
}
function o5({
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
        const Q = tc(f, "seed", Q0);
        p({ ...f, seed: Q });
      }
  }, R = Rf.find((q) => q.id === o) ?? Rf[0], C = (s - ec) / (_f - ec) * 100, O = tc(f, "temperature", i5), _ = tc(f, "top_p", l5), T = tc(f, "seed", Q0);
  return /* @__PURE__ */ c.jsxs("div", { className: G3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: y, className: Vs, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: nl, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: y,
          className: K3,
          value: t,
          onChange: (q) => a(q.currentTarget.value),
          children: r5.map((q) => /* @__PURE__ */ c.jsx("option", { value: q, children: q }, q))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: m, className: Vs, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${nl} ${X3}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: m,
            type: "range",
            className: Q3,
            min: ec,
            max: _f,
            step: s5,
            value: s,
            style: { "--range-pct": `${C}%` },
            onChange: (q) => i(Number(q.currentTarget.value)),
            "aria-valuemin": ec,
            "aria-valuemax": _f,
            "aria-valuenow": s
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: Z3, children: [
          s.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: P3, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: Vs, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: J3, children: Rf.map((q) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === q.id,
          className: W3,
          onClick: () => u(q.id),
          title: q.help,
          children: q.label
        },
        q.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: e5, "aria-live": "polite", children: R.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: t5, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: Vs, children: "Temperature" }),
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
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: Vs, children: "Top-p" }),
      /* @__PURE__ */ c.jsx("div", { className: nl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: Tf,
          min: 0,
          max: 1,
          step: 0.05,
          value: _,
          onChange: (q) => S("top_p", Number(q.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("span", { className: Vs, id: `${w}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${nl} ${n5}`,
          role: "radiogroup",
          "aria-labelledby": `${w}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "fixed",
                className: `${K0} ${j === "fixed" ? X0 : ""}`,
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
                className: `${K0} ${j === "random" ? X0 : ""}`,
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
            ) : /* @__PURE__ */ c.jsx("span", { className: a5, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var c5 = "iv43qk0", Z0 = "iv43qk1", u5 = "iv43qk2", J0 = "iv43qk3", d5 = "iv43qk4", f5 = "iv43qk5", h5 = "iv43qk6", m5 = "iv43qk7", p5 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, g5 = "iv43qkd", v5 = "iv43qke", Mf = "iv43qkf", Af = "iv43qkg";
function y5({
  lines: t,
  characterColors: a,
  onLineClick: s
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: g5, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const i = t.length, o = t.filter((f) => f.character !== null).length, u = i - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: v5, children: [
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
    /* @__PURE__ */ c.jsx("ol", { className: c5, children: t.map((f) => /* @__PURE__ */ c.jsx(
      b5,
      {
        line: f,
        ...f.character && a[f.character] ? { color: a[f.character] } : {},
        ...s ? { onClick: () => s(f.idx) } : {}
      },
      f.idx
    )) })
  ] });
}
function b5({ line: t, color: a, onClick: s }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${Z0} ${u5}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: J0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: h5, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: Z0,
      onClick: s,
      style: s ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: J0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: d5, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: f5, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${m5} ${p5[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var x5 = "_46z95i0", S5 = "_46z95i1", w5 = "_46z95i2", j5 = "_46z95i3", E5 = "_46z95i4", N5 = "_46z95i5", C5 = "_46z95i6";
const T5 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function R5({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: x5, children: [
    /* @__PURE__ */ c.jsx(
      kf,
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
      kf,
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
      kf,
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
function kf({ label: t, sub: a, min: s, max: i, step: o, format: u, value: f, onChange: p }) {
  const y = (f - s) / (i - s) * 100, m = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: S5, children: [
    /* @__PURE__ */ c.jsxs("div", { className: w5, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: m, className: j5, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: E5, children: a })
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
        className: N5,
        style: { "--fill": `${y}%` },
        onChange: (b) => p(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: C5, children: u(f) })
  ] });
}
var _5 = "qe93dj0", M5 = "qe93dj1", A5 = "qe93dj2", k5 = "qe93dj3", D5 = "qe93dj4", z5 = "qe93dj5", O5 = "qe93dj6", L5 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, $5 = "qe93dja", U5 = "qe93djb";
function B5({ checks: t }) {
  const a = t.filter((s) => s.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: _5, children: [
    /* @__PURE__ */ c.jsxs("header", { className: M5, children: [
      /* @__PURE__ */ c.jsx("span", { className: A5, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: k5, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: D5, children: t.map((s) => /* @__PURE__ */ c.jsxs("li", { className: z5, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${O5} ${L5[s.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: $5, children: s.label }),
      s.detail && /* @__PURE__ */ c.jsx("span", { className: U5, children: s.detail })
    ] }, s.id)) })
  ] });
}
var W0 = "_17fbpt30", eb = "_17fbpt31", tb = "_17fbpt32", V5 = "_17fbpt33", I5 = "_17fbpt34", H5 = "_17fbpt35", nb = "_17fbpt36", q5 = "_17fbpt37", F5 = "_17fbpt38";
const Y5 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function G5({
  runs: t,
  deploymentId: a,
  onOpenQueue: s,
  onOpenRun: i,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: W0, children: [
    /* @__PURE__ */ c.jsx("header", { className: eb, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: tb,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: s ? (u) => {
          u.preventDefault(), s();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: q5, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: F5, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: W0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: eb, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: tb,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: s ? (u) => {
            u.preventDefault(), s();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: V5, children: t.slice(0, 5).map((u) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: I5,
        onClick: i ? () => i(u.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: H5, children: u.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${T1.sm} ${R1[Y5[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ c.jsx("span", { className: nb, children: P5(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: nb, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function P5(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, s = new Date(a * 1e3);
  if (Number.isNaN(s.getTime())) return "—";
  const o = Date.now() - s.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : s.toISOString().slice(0, 16).replace("T", " ");
}
const $1 = g.createContext({});
function em(t) {
  const a = g.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const K5 = typeof window < "u", U1 = K5 ? g.useLayoutEffect : g.useEffect, Pc = /* @__PURE__ */ g.createContext(null);
function X5(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function Q5(t, a) {
  const s = t.indexOf(a);
  s > -1 && t.splice(s, 1);
}
const wr = (t, a, s) => s > a ? a : s < t ? t : s;
function ab(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Rl = () => {
}, Ws = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Rl = (t, a, s) => {
  !t && typeof console < "u" && console.warn(ab(a, s));
}, Ws = (t, a, s) => {
  if (!t)
    throw new Error(ab(a, s));
});
const jr = {}, B1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function Z5(t) {
  return typeof t == "object" && t !== null;
}
const V1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function I1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ai = /* @__NO_SIDE_EFFECTS__ */ (t) => t, J5 = (t, a) => (s) => a(t(s)), Kc = (...t) => t.reduce(J5), H1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, s) => {
  const i = a - t;
  return i === 0 ? 1 : (s - t) / i;
};
class q1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return X5(this.subscriptions, a), () => Q5(this.subscriptions, a);
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
function F1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const Y1 = (t, a, s) => (((1 - 3 * s + 3 * a) * t + (3 * s - 6 * a)) * t + 3 * a) * t, W5 = 1e-7, ek = 12;
function tk(t, a, s, i, o) {
  let u, f, p = 0;
  do
    f = a + (s - a) / 2, u = Y1(f, i, o) - t, u > 0 ? s = f : a = f;
  while (Math.abs(u) > W5 && ++p < ek);
  return f;
}
function _l(t, a, s, i) {
  if (t === a && s === i)
    return ai;
  const o = (u) => tk(u, 0, 1, t, s);
  return (u) => u === 0 || u === 1 ? u : Y1(o(u), a, i);
}
const G1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, P1 = (t) => (a) => 1 - t(1 - a), K1 = /* @__PURE__ */ _l(0.33, 1.53, 0.69, 0.99), tm = /* @__PURE__ */ P1(K1), X1 = /* @__PURE__ */ G1(tm), Q1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * tm(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), nm = (t) => 1 - Math.sin(Math.acos(t)), nk = P1(nm), Z1 = G1(nm), ak = /* @__PURE__ */ _l(0.42, 0, 1, 1), rk = /* @__PURE__ */ _l(0, 0, 0.58, 1), J1 = /* @__PURE__ */ _l(0.42, 0, 0.58, 1), sk = (t) => Array.isArray(t) && typeof t[0] != "number", W1 = (t) => Array.isArray(t) && typeof t[0] == "number", rb = {
  linear: ai,
  easeIn: ak,
  easeInOut: J1,
  easeOut: rk,
  circIn: nm,
  circInOut: Z1,
  circOut: nk,
  backIn: tm,
  backInOut: X1,
  backOut: K1,
  anticipate: Q1
}, ik = (t) => typeof t == "string", sb = (t) => {
  if (W1(t)) {
    Ws(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, s, i, o] = t;
    return _l(a, s, i, o);
  } else if (ik(t))
    return Ws(rb[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), rb[t];
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
function lk(t, a) {
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
const ok = 40;
function eS(t, a) {
  let s = !1, i = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => s = !0, f = nc.reduce((_, T) => (_[T] = lk(u), _), {}), { setup: p, read: y, resolveKeyframes: m, preUpdate: b, update: v, preRender: w, render: S, postRender: j } = f, N = () => {
    const _ = jr.useManualTiming, T = _ ? o.timestamp : performance.now();
    s = !1, _ || (o.delta = i ? 1e3 / 60 : Math.max(Math.min(T - o.timestamp, ok), 1)), o.timestamp = T, o.isProcessing = !0, p.process(o), y.process(o), m.process(o), b.process(o), v.process(o), w.process(o), S.process(o), j.process(o), o.isProcessing = !1, s && a && (i = !1, t(N));
  }, R = () => {
    s = !0, i = !0, o.isProcessing || t(N);
  };
  return { schedule: nc.reduce((_, T) => {
    const q = f[T];
    return _[T] = (Q, re = !1, M = !1) => (s || R(), q.schedule(Q, re, M)), _;
  }, {}), cancel: (_) => {
    for (let T = 0; T < nc.length; T++)
      f[nc[T]].cancel(_);
  }, state: o, steps: f };
}
const { schedule: na, cancel: sh, state: Tc } = /* @__PURE__ */ eS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ai, !0);
let bc;
function ck() {
  bc = void 0;
}
const qn = {
  now: () => (bc === void 0 && qn.set(Tc.isProcessing || jr.useManualTiming ? Tc.timestamp : performance.now()), bc),
  set: (t) => {
    bc = t, queueMicrotask(ck);
  }
}, tS = (t) => (a) => typeof a == "string" && a.startsWith(t), nS = /* @__PURE__ */ tS("--"), uk = /* @__PURE__ */ tS("var(--"), am = (t) => uk(t) ? dk.test(t.split("/*")[0].trim()) : !1, dk = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ib(t) {
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
}, hl = (t) => Math.round(t * 1e5) / 1e5, rm = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function fk(t) {
  return t == null;
}
const hk = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, sm = (t, a) => (s) => !!(typeof s == "string" && hk.test(s) && s.startsWith(t) || a && !fk(s) && Object.prototype.hasOwnProperty.call(s, a)), aS = (t, a, s) => (i) => {
  if (typeof i != "string")
    return i;
  const [o, u, f, p] = i.match(rm);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [s]: parseFloat(f),
    alpha: p !== void 0 ? parseFloat(p) : 1
  };
}, mk = (t) => wr(0, 255, t), Df = {
  ...ri,
  transform: (t) => Math.round(mk(t))
}, Kr = {
  test: /* @__PURE__ */ sm("rgb", "red"),
  parse: /* @__PURE__ */ aS("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: s, alpha: i = 1 }) => "rgba(" + Df.transform(t) + ", " + Df.transform(a) + ", " + Df.transform(s) + ", " + hl(Sl.transform(i)) + ")"
};
function pk(t) {
  let a = "", s = "", i = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), s = t.substring(3, 5), i = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), s = t.substring(2, 3), i = t.substring(3, 4), o = t.substring(4, 5), a += a, s += s, i += i, o += o), {
    red: parseInt(a, 16),
    green: parseInt(s, 16),
    blue: parseInt(i, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const ih = {
  test: /* @__PURE__ */ sm("#"),
  parse: pk,
  transform: Kr.transform
}, Ml = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), vr = /* @__PURE__ */ Ml("deg"), Xs = /* @__PURE__ */ Ml("%"), ke = /* @__PURE__ */ Ml("px"), gk = /* @__PURE__ */ Ml("vh"), vk = /* @__PURE__ */ Ml("vw"), lb = {
  ...Xs,
  parse: (t) => Xs.parse(t) / 100,
  transform: (t) => Xs.transform(t * 100)
}, Ps = {
  test: /* @__PURE__ */ sm("hsl", "hue"),
  parse: /* @__PURE__ */ aS("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: s, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + Xs.transform(hl(a)) + ", " + Xs.transform(hl(s)) + ", " + hl(Sl.transform(i)) + ")"
}, nn = {
  test: (t) => Kr.test(t) || ih.test(t) || Ps.test(t),
  parse: (t) => Kr.test(t) ? Kr.parse(t) : Ps.test(t) ? Ps.parse(t) : ih.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Kr.transform(t) : Ps.transform(t),
  getAnimatableNone: (t) => {
    const a = nn.parse(t);
    return a.alpha = 0, nn.transform(a);
  }
}, yk = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function bk(t) {
  return isNaN(t) && typeof t == "string" && (t.match(rm)?.length || 0) + (t.match(yk)?.length || 0) > 0;
}
const rS = "number", sS = "color", xk = "var", Sk = "var(", ob = "${}", wk = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ei(t) {
  const a = t.toString(), s = [], i = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const p = a.replace(wk, (y) => (nn.test(y) ? (i.color.push(u), o.push(sS), s.push(nn.parse(y))) : y.startsWith(Sk) ? (i.var.push(u), o.push(xk), s.push(y)) : (i.number.push(u), o.push(rS), s.push(parseFloat(y))), ++u, ob)).split(ob);
  return { values: s, split: p, indexes: i, types: o };
}
function jk(t) {
  return ei(t).values;
}
function iS({ split: t, types: a }) {
  const s = t.length;
  return (i) => {
    let o = "";
    for (let u = 0; u < s; u++)
      if (o += t[u], i[u] !== void 0) {
        const f = a[u];
        f === rS ? o += hl(i[u]) : f === sS ? o += nn.transform(i[u]) : o += i[u];
      }
    return o;
  };
}
function Ek(t) {
  return iS(ei(t));
}
const Nk = (t) => typeof t == "number" ? 0 : nn.test(t) ? nn.getAnimatableNone(t) : t, Ck = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : Nk(t);
function Tk(t) {
  const a = ei(t);
  return iS(a)(a.values.map((i, o) => Ck(i, a.split[o])));
}
const da = {
  test: bk,
  parse: jk,
  createTransformer: Ek,
  getAnimatableNone: Tk
};
function zf(t, a, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? t + (a - t) * 6 * s : s < 1 / 2 ? a : s < 2 / 3 ? t + (a - t) * (2 / 3 - s) * 6 : t;
}
function Rk({ hue: t, saturation: a, lightness: s, alpha: i }) {
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
}, _k = [ih, Kr, Ps], Mk = (t) => _k.find((a) => a.test(t));
function cb(t) {
  const a = Mk(t);
  if (Rl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let s = a.parse(t);
  return a === Ps && (s = Rk(s)), s;
}
const ub = (t, a) => {
  const s = cb(t), i = cb(a);
  if (!s || !i)
    return Rc(t, a);
  const o = { ...s };
  return (u) => (o.red = Of(s.red, i.red, u), o.green = Of(s.green, i.green, u), o.blue = Of(s.blue, i.blue, u), o.alpha = Al(s.alpha, i.alpha, u), Kr.transform(o));
}, lh = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ak(t, a) {
  return lh.has(t) ? (s) => s <= 0 ? t : a : (s) => s >= 1 ? a : t;
}
function kk(t, a) {
  return (s) => Al(t, a, s);
}
function im(t) {
  return typeof t == "number" ? kk : typeof t == "string" ? am(t) ? Rc : nn.test(t) ? ub : Ok : Array.isArray(t) ? lS : typeof t == "object" ? nn.test(t) ? ub : Dk : Rc;
}
function lS(t, a) {
  const s = [...t], i = s.length, o = t.map((u, f) => im(u)(u, a[f]));
  return (u) => {
    for (let f = 0; f < i; f++)
      s[f] = o[f](u);
    return s;
  };
}
function Dk(t, a) {
  const s = { ...t, ...a }, i = {};
  for (const o in s)
    t[o] !== void 0 && a[o] !== void 0 && (i[o] = im(t[o])(t[o], a[o]));
  return (o) => {
    for (const u in i)
      s[u] = i[u](o);
    return s;
  };
}
function zk(t, a) {
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], f = t.indexes[u][i[u]], p = t.values[f] ?? 0;
    s[o] = p, i[u]++;
  }
  return s;
}
const Ok = (t, a) => {
  const s = da.createTransformer(a), i = ei(t), o = ei(a);
  return i.indexes.var.length === o.indexes.var.length && i.indexes.color.length === o.indexes.color.length && i.indexes.number.length >= o.indexes.number.length ? lh.has(t) && !o.values.length || lh.has(a) && !i.values.length ? Ak(t, a) : Kc(lS(zk(i, o), o.values), s) : (Rl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Rc(t, a));
};
function oS(t, a, s) {
  return typeof t == "number" && typeof a == "number" && typeof s == "number" ? Al(t, a, s) : im(t)(t, a);
}
const Lk = (t) => {
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
}, cS = (t, a, s = 10) => {
  let i = "";
  const o = Math.max(Math.round(a / s), 2);
  for (let u = 0; u < o; u++)
    i += Math.round(t(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, _c = 2e4;
function lm(t) {
  let a = 0;
  const s = 50;
  let i = t.next(a);
  for (; !i.done && a < _c; )
    a += s, i = t.next(a);
  return a >= _c ? 1 / 0 : a;
}
function $k(t, a = 100, s) {
  const i = s({ ...t, keyframes: [0, a] }), o = Math.min(lm(i), _c);
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
const Uk = 12;
function Bk(t, a, s) {
  let i = s;
  for (let o = 1; o < Uk; o++)
    i = i - t(i) / a(i);
  return i;
}
const Lf = 1e-3;
function Vk({ duration: t = Bt.duration, bounce: a = Bt.bounce, velocity: s = Bt.velocity, mass: i = Bt.mass }) {
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
  const p = 5 / t, y = Bk(o, u, p);
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
const Ik = ["duration", "bounce"], Hk = ["stiffness", "damping", "mass"];
function db(t, a) {
  return a.some((s) => t[s] !== void 0);
}
function qk(t) {
  let a = {
    velocity: Bt.velocity,
    stiffness: Bt.stiffness,
    damping: Bt.damping,
    mass: Bt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!db(t, Hk) && db(t, Ik))
    if (a.velocity = 0, t.visualDuration) {
      const s = t.visualDuration, i = 2 * Math.PI / (s * 1.2), o = i * i, u = 2 * wr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: Bt.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const s = Vk({ ...t, velocity: 0 });
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
  const u = s.keyframes[0], f = s.keyframes[s.keyframes.length - 1], p = { done: !1, value: u }, { stiffness: y, damping: m, mass: b, duration: v, velocity: w, isResolvedFromDuration: S } = qk({
    ...s,
    velocity: -/* @__PURE__ */ ua(s.velocity || 0)
  }), j = w || 0, N = m / (2 * Math.sqrt(y * b)), R = f - u, C = /* @__PURE__ */ ua(Math.sqrt(y / b)), O = Math.abs(R) < 5;
  i || (i = O ? Bt.restSpeed.granular : Bt.restSpeed.default), o || (o = O ? Bt.restDelta.granular : Bt.restDelta.default);
  let _, T, q, Q, re, M;
  if (N < 1)
    q = oh(C, N), Q = (j + N * C * R) / q, _ = (D) => {
      const F = Math.exp(-N * C * D);
      return f - F * (Q * Math.sin(q * D) + R * Math.cos(q * D));
    }, re = N * C * Q + R * q, M = N * C * R - Q * q, T = (D) => Math.exp(-N * C * D) * (re * Math.sin(q * D) + M * Math.cos(q * D));
  else if (N === 1) {
    _ = (F) => f - Math.exp(-C * F) * (R + (j + C * R) * F);
    const D = j + C * R;
    T = (F) => Math.exp(-C * F) * (C * D * F - j);
  } else {
    const D = C * Math.sqrt(N * N - 1);
    _ = (K) => {
      const le = Math.exp(-N * C * K), A = Math.min(D * K, 300);
      return f - le * ((j + N * C * R) * Math.sinh(A) + D * R * Math.cosh(A)) / D;
    };
    const F = (j + N * C * R) / D, W = N * C * F - R * D, ae = N * C * R - F * D;
    T = (K) => {
      const le = Math.exp(-N * C * K), A = Math.min(D * K, 300);
      return le * (W * Math.sinh(A) + ae * Math.cosh(A));
    };
  }
  const V = {
    calculatedDuration: S && v || null,
    velocity: (D) => /* @__PURE__ */ ta(T(D)),
    next: (D) => {
      if (!S && N < 1) {
        const W = Math.exp(-N * C * D), ae = Math.sin(q * D), K = Math.cos(q * D), le = f - W * (Q * ae + R * K), A = /* @__PURE__ */ ta(W * (re * ae + M * K));
        return p.done = Math.abs(A) <= i && Math.abs(f - le) <= o, p.value = p.done ? f : le, p;
      }
      const F = _(D);
      if (S)
        p.done = D >= v;
      else {
        const W = /* @__PURE__ */ ta(T(D));
        p.done = Math.abs(W) <= i && Math.abs(f - F) <= o;
      }
      return p.value = p.done ? f : F, p;
    },
    toString: () => {
      const D = Math.min(lm(V), _c), F = cS((W) => V.next(D * W).value, D, 30);
      return D + "ms " + F;
    },
    toTransition: () => {
    }
  };
  return V;
}
Mc.applyToOptions = (t) => {
  const a = $k(t, 100, Mc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ ta(a.duration), t.type = "keyframes", t;
};
const Fk = 5;
function uS(t, a, s) {
  const i = Math.max(a - Fk, 0);
  return F1(s - t(i), a - i);
}
function ch({ keyframes: t, velocity: a = 0, power: s = 0.8, timeConstant: i = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: f, min: p, max: y, restDelta: m = 0.5, restSpeed: b }) {
  const v = t[0], w = {
    done: !1,
    value: v
  }, S = (M) => p !== void 0 && M < p || y !== void 0 && M > y, j = (M) => p === void 0 ? y : y === void 0 || Math.abs(p - M) < Math.abs(y - M) ? p : y;
  let N = s * a;
  const R = v + N, C = f === void 0 ? R : f(R);
  C !== R && (N = C - v);
  const O = (M) => -N * Math.exp(-M / i), _ = (M) => C + O(M), T = (M) => {
    const V = O(M), D = _(M);
    w.done = Math.abs(V) <= m, w.value = w.done ? C : D;
  };
  let q, Q;
  const re = (M) => {
    S(w.value) && (q = M, Q = Mc({
      keyframes: [w.value, j(w.value)],
      velocity: uS(_, M, w.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: m,
      restSpeed: b
    }));
  };
  return re(0), {
    calculatedDuration: null,
    next: (M) => {
      let V = !1;
      return !Q && q === void 0 && (V = !0, T(M), re(M)), q !== void 0 && M >= q ? Q.next(M - q) : (!V && T(M), w);
    }
  };
}
function Yk(t, a, s) {
  const i = [], o = s || jr.mix || oS, u = t.length - 1;
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
function Gk(t, a, { clamp: s = !0, ease: i, mixer: o } = {}) {
  const u = t.length;
  if (Ws(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const p = Yk(a, i, o), y = p.length, m = (b) => {
    if (f && b < t[0])
      return a[0];
    let v = 0;
    if (y > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const w = /* @__PURE__ */ H1(t[v], t[v + 1], b);
    return p[v](w);
  };
  return s ? (b) => m(wr(t[0], t[u - 1], b)) : m;
}
function Pk(t, a) {
  const s = t[t.length - 1];
  for (let i = 1; i <= a; i++) {
    const o = /* @__PURE__ */ H1(0, a, i);
    t.push(Al(s, 1, o));
  }
}
function Kk(t) {
  const a = [0];
  return Pk(a, t.length - 1), a;
}
function Xk(t, a) {
  return t.map((s) => s * a);
}
function Qk(t, a) {
  return t.map(() => a || J1).splice(0, t.length - 1);
}
function ml({ duration: t = 300, keyframes: a, times: s, ease: i = "easeInOut" }) {
  const o = sk(i) ? i.map(sb) : sb(i), u = {
    done: !1,
    value: a[0]
  }, f = Xk(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    s && s.length === a.length ? s : Kk(a),
    t
  ), p = Gk(f, a, {
    ease: Array.isArray(o) ? o : Qk(a, o)
  });
  return {
    calculatedDuration: t,
    next: (y) => (u.value = p(y), u.done = y >= t, u)
  };
}
const Zk = (t) => t !== null;
function Xc(t, { repeat: a, repeatType: s = "loop" }, i, o = 1) {
  const u = t.filter(Zk), p = o < 0 || a && s !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !p || i === void 0 ? u[p] : i;
}
const Jk = {
  decay: ch,
  inertia: ch,
  tween: ml,
  keyframes: ml,
  spring: Mc
};
function dS(t) {
  typeof t.type == "string" && (t.type = Jk[t.type]);
}
class om {
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
const Wk = (t) => t / 100;
class Ac extends om {
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
    dS(a);
    const { type: s = ml, repeat: i = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: p } = a;
    const y = s || ml;
    y !== ml && typeof p[0] != "number" && (this.mixKeyframes = Kc(Wk, oS(p[0], p[1])), p = [0, 100]);
    const m = y({ ...a, keyframes: p });
    u === "mirror" && (this.mirroredGenerator = y({
      ...a,
      keyframes: [...p].reverse(),
      velocity: -f
    })), m.calculatedDuration === null && (m.calculatedDuration = lm(m));
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
    let _ = this.currentTime, T = i;
    if (v) {
      const M = Math.min(this.currentTime, o) / p;
      let V = Math.floor(M), D = M % 1;
      !D && M >= 1 && (D = 1), D === 1 && V--, V = Math.min(V, v + 1), !!(V % 2) && (w === "reverse" ? (D = 1 - D, S && (D -= S / p)) : w === "mirror" && (T = f)), _ = wr(0, 1, D) * p;
    }
    let q;
    O ? (this.delayState.value = b[0], q = this.delayState) : q = T.next(_), u && !O && (q.value = u(q.value));
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
    return uS((i) => this.generator.next(i).value, a, s);
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
    const { driver: a = Lk, startTime: s } = this.options;
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
function eD(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Xr = (t) => t * 180 / Math.PI, uh = (t) => {
  const a = Xr(Math.atan2(t[1], t[0]));
  return dh(a);
}, tD = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: uh,
  rotateZ: uh,
  skewX: (t) => Xr(Math.atan(t[1])),
  skewY: (t) => Xr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, dh = (t) => (t = t % 360, t < 0 && (t += 360), t), fb = uh, hb = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), mb = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), nD = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: hb,
  scaleY: mb,
  scale: (t) => (hb(t) + mb(t)) / 2,
  rotateX: (t) => dh(Xr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => dh(Xr(Math.atan2(-t[2], t[0]))),
  rotateZ: fb,
  rotate: fb,
  skewX: (t) => Xr(Math.atan(t[4])),
  skewY: (t) => Xr(Math.atan(t[1])),
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
    i = nD, o = s;
  else {
    const p = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = tD, o = p;
  }
  if (!o)
    return fh(a);
  const u = i[a], f = o[1].split(",").map(rD);
  return typeof u == "function" ? u(f) : f[u];
}
const aD = (t, a) => {
  const { transform: s = "none" } = getComputedStyle(t);
  return hh(s, a);
};
function rD(t) {
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
], ii = new Set(si), pb = (t) => t === ri || t === ke, sD = /* @__PURE__ */ new Set(["x", "y", "z"]), iD = si.filter((t) => !sD.has(t));
function lD(t) {
  const a = [];
  return iD.forEach((s) => {
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
const Zr = /* @__PURE__ */ new Set();
let mh = !1, ph = !1, gh = !1;
function fS() {
  if (ph) {
    const t = Array.from(Zr).filter((i) => i.needsMeasurement), a = new Set(t.map((i) => i.element)), s = /* @__PURE__ */ new Map();
    a.forEach((i) => {
      const o = lD(i);
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
  ph = !1, mh = !1, Zr.forEach((t) => t.complete(gh)), Zr.clear();
}
function hS() {
  Zr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (ph = !0);
  });
}
function oD() {
  gh = !0, hS(), fS(), gh = !1;
}
class cm {
  constructor(a, s, i, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = s, this.name = i, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Zr.add(this), mh || (mh = !0, na.read(hS), na.resolveKeyframes(fS))) : (this.readKeyframes(), this.complete());
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
    eD(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Zr.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Zr.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const cD = (t) => t.startsWith("--");
function mS(t, a, s) {
  cD(a) ? t.style.setProperty(a, s) : t.style[a] = s;
}
const uD = {};
function pS(t, a) {
  const s = /* @__PURE__ */ I1(t);
  return () => uD[a] ?? s();
}
const dD = /* @__PURE__ */ pS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), gS = /* @__PURE__ */ pS(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ul = ([t, a, s, i]) => `cubic-bezier(${t}, ${a}, ${s}, ${i})`, gb = {
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
function vS(t, a) {
  if (t)
    return typeof t == "function" ? gS() ? cS(t, a) : "ease-out" : W1(t) ? ul(t) : Array.isArray(t) ? t.map((s) => vS(s, a) || gb.easeOut) : gb[t];
}
function fD(t, a, s, { delay: i = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: p = "easeOut", times: y } = {}, m = void 0) {
  const b = {
    [a]: s
  };
  y && (b.offset = y);
  const v = vS(p, o);
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
function yS(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function hD({ type: t, ...a }) {
  return yS(t) && gS() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class bS extends om {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: s, name: i, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: p, onComplete: y } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, Ws(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = hD(a);
    this.animation = fD(s, i, o, m, u), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Xc(o, this.options, p, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), mS(s, i, b), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && dD() ? (this.animation.timeline = a, s && (this.animation.rangeStart = s), i && (this.animation.rangeEnd = i), ai) : o(this);
  }
}
const xS = {
  anticipate: Q1,
  backInOut: X1,
  circInOut: Z1
};
function mD(t) {
  return t in xS;
}
function pD(t) {
  typeof t.ease == "string" && mD(t.ease) && (t.ease = xS[t.ease]);
}
const $f = 10;
class gD extends bS {
  constructor(a) {
    pD(a), dS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    u && v && mS(u, v, b), s.setWithVelocity(p.sample(Math.max(0, y - m)).value, b, m), p.stop();
  }
}
const vb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(da.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function vD(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let s = 0; s < t.length; s++)
    if (t[s] !== a)
      return !0;
}
function yD(t, a, s, i) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = t[t.length - 1], f = vb(o, a), p = vb(u, a);
  return Rl(f === p, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !p ? !1 : vD(t) || (s === "spring" || yS(s)) && i;
}
function vh(t) {
  t.duration = 0, t.type = "keyframes";
}
const SS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), bD = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function xD(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && bD.test(t[a]))
      return !0;
  return !1;
}
const SD = /* @__PURE__ */ new Set([
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
]), wD = /* @__PURE__ */ I1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function jD(t) {
  const { motionValue: a, name: s, repeatDelay: i, repeatType: o, damping: u, type: f, keyframes: p } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: b } = a.owner.getProps();
  return wD() && s && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (SS.has(s) || SD.has(s) && xD(p)) && (s !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !i && o !== "mirror" && u !== 0 && f !== "inertia";
}
const ED = 40;
class ND extends om {
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
    }, S = b?.KeyframeResolver || cm;
    this.keyframeResolver = new S(p, (j, N, R) => this.onKeyframesResolved(j, N, w, !R), y, m, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, s, i, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: f, velocity: p, delay: y, isHandoff: m, onUpdate: b } = i;
    this.resolvedAt = qn.now();
    let v = !0;
    yD(a, u, f, p) || (v = !1, (jr.instantAnimations || !y) && b?.(Xc(a, i, s)), a[0] = a[a.length - 1], vh(i), i.repeat = 0);
    const S = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > ED ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...i,
      keyframes: a
    }, j = v && !m && jD(S), N = S.motionValue?.owner?.current;
    let R;
    if (j)
      try {
        R = new gD({
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
    return this._animation || (this.keyframeResolver?.resume(), oD()), this._animation;
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
function wS(t, a, s, i = 0, o = 1) {
  const u = Array.from(t).sort((m, b) => m.sortNodePosition(b)).indexOf(a), f = t.size, p = (f - 1) * i;
  return typeof s == "function" ? s(u, f) : o === 1 ? u * i : p - u * i;
}
const CD = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function TD(t) {
  const a = CD.exec(t);
  if (!a)
    return [,];
  const [, s, i, o] = a;
  return [`--${s ?? i}`, o];
}
const RD = 4;
function jS(t, a, s = 1) {
  Ws(s <= RD, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, o] = TD(t);
  if (!i)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(i);
  if (u) {
    const f = u.trim();
    return B1(f) ? parseFloat(f) : f;
  }
  return am(o) ? jS(o, a, s + 1) : o;
}
const _D = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, MD = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), AD = {
  type: "keyframes",
  duration: 0.8
}, kD = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, DD = (t, { keyframes: a }) => a.length > 2 ? AD : ii.has(t) ? t.startsWith("scale") ? MD(a[1]) : _D : kD;
function ES(t, a) {
  if (t?.inherit && a) {
    const { inherit: s, ...i } = t;
    return { ...a, ...i };
  }
  return t;
}
function NS(t, a) {
  const s = t?.[a] ?? t?.default ?? t;
  return s !== t ? ES(s, t) : s;
}
const zD = /* @__PURE__ */ new Set([
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
function OD(t) {
  for (const a in t)
    if (!zD.has(a))
      return !0;
  return !1;
}
const LD = (t, a, s, i = {}, o, u) => (f) => {
  const p = NS(i, t) || {}, y = p.delay || i.delay || 0;
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
  OD(p) || Object.assign(b, DD(t, b)), b.duration && (b.duration = /* @__PURE__ */ ta(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ ta(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
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
  return p.isSync ? new Ac(b) : new ND(b);
};
function yb(t) {
  const a = [{}, {}];
  return t?.values.forEach((s, i) => {
    a[0][i] = s.get(), a[1][i] = s.getVelocity();
  }), a;
}
function um(t, a, s, i) {
  if (typeof a == "function") {
    const [o, u] = yb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, u] = yb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  return a;
}
function Jr(t, a, s) {
  const i = t.getProps();
  return um(i, a, s !== void 0 ? s : i.custom, t);
}
const CS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...si
]), bb = 30, $D = (t) => !isNaN(parseFloat(t));
class UD {
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
    this.current = a, this.updatedAt = qn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = $D(this.current));
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
    this.events[a] || (this.events[a] = new q1());
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > bb)
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, bb);
    return F1(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
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
function kc(t, a) {
  return new UD(t, a);
}
const yh = (t) => Array.isArray(t);
function BD(t, a, s) {
  t.hasValue(a) ? t.getValue(a).set(s) : t.addValue(a, kc(s));
}
function VD(t) {
  return yh(t) ? t[t.length - 1] || 0 : t;
}
function ID(t, a) {
  const s = Jr(t, a);
  let { transitionEnd: i = {}, transition: o = {}, ...u } = s || {};
  u = { ...u, ...i };
  for (const f in u) {
    const p = VD(u[f]);
    BD(t, f, p);
  }
}
const xn = (t) => !!(t && t.getVelocity);
function HD(t) {
  return !!(xn(t) && t.add);
}
function qD(t, a) {
  const s = t.getValue("willChange");
  if (HD(s))
    return s.add(a);
  if (!s && jr.WillChange) {
    const i = new jr.WillChange("auto");
    t.addValue("willChange", i), i.add(a);
  }
}
function dm(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const FD = "framerAppearId", TS = "data-" + dm(FD);
function YD(t) {
  return t.props[TS];
}
function GD({ protectedKeys: t, needsAnimating: a }, s) {
  const i = t.hasOwnProperty(s) && a[s] !== !0;
  return a[s] = !1, i;
}
function RS(t, a, { delay: s = 0, transitionOverride: i, type: o } = {}) {
  let { transition: u, transitionEnd: f, ...p } = a;
  const y = t.getDefaultTransition();
  u = u ? ES(u, y) : y;
  const m = u?.reduceMotion;
  i && (u = i);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const w in p) {
    const S = t.getValue(w, t.latestValues[w] ?? null), j = p[w];
    if (j === void 0 || v && GD(v, w))
      continue;
    const N = {
      delay: s,
      ...NS(u || {}, w)
    }, R = S.get();
    if (R !== void 0 && !S.isAnimating() && !Array.isArray(j) && j === R && !N.velocity) {
      na.update(() => S.set(j));
      continue;
    }
    let C = !1;
    if (window.MotionHandoffAnimation) {
      const T = YD(t);
      if (T) {
        const q = window.MotionHandoffAnimation(T, w, na);
        q !== null && (N.startTime = q, C = !0);
      }
    }
    qD(t, w);
    const O = m ?? t.shouldReduceMotion;
    S.start(LD(w, S, j, O && CS.has(w) ? { type: !1 } : N, t, C));
    const _ = S.animation;
    _ && b.push(_);
  }
  if (f) {
    const w = () => na.update(() => {
      f && ID(t, f);
    });
    b.length ? Promise.all(b).then(w) : w();
  }
  return b;
}
function bh(t, a, s = {}) {
  const i = Jr(t, a, s.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = i || {};
  s.transitionOverride && (o = s.transitionOverride);
  const u = i ? () => Promise.all(RS(t, i, s)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (y = 0) => {
    const { delayChildren: m = 0, staggerChildren: b, staggerDirection: v } = o;
    return PD(t, a, y, m, b, v, s);
  } : () => Promise.resolve(), { when: p } = o;
  if (p) {
    const [y, m] = p === "beforeChildren" ? [u, f] : [f, u];
    return y().then(() => m());
  } else
    return Promise.all([u(), f(s.delay)]);
}
function PD(t, a, s = 0, i = 0, o = 0, u = 1, f) {
  const p = [];
  for (const y of t.variantChildren)
    y.notify("AnimationStart", a), p.push(bh(y, a, {
      ...f,
      delay: s + (typeof i == "function" ? 0 : i) + wS(t.variantChildren, y, i, o, u)
    }).then(() => y.notify("AnimationComplete", a)));
  return Promise.all(p);
}
function KD(t, a, s = {}) {
  t.notify("AnimationStart", a);
  let i;
  if (Array.isArray(a)) {
    const o = a.map((u) => bh(t, u, s));
    i = Promise.all(o);
  } else if (typeof a == "string")
    i = bh(t, a, s);
  else {
    const o = typeof a == "function" ? Jr(t, a, s.custom) : a;
    i = Promise.all(RS(t, o, s));
  }
  return i.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const XD = {
  test: (t) => t === "auto",
  parse: (t) => t
}, _S = (t) => (a) => a.test(t), MS = [ri, ke, Xs, vr, vk, gk, XD], xb = (t) => MS.find(_S(t));
function QD(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || V1(t) : !0;
}
const ZD = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function JD(t) {
  const [a, s] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [i] = s.match(rm) || [];
  if (!i)
    return t;
  const o = s.replace(i, "");
  let u = ZD.has(a) ? 1 : 0;
  return i !== s && (u *= 100), a + "(" + u + o + ")";
}
const WD = /\b([a-z-]*)\(.*?\)/gu, xh = {
  ...da,
  getAnimatableNone: (t) => {
    const a = t.match(WD);
    return a ? a.map(JD).join(" ") : t;
  }
}, Sh = {
  ...da,
  getAnimatableNone: (t) => {
    const a = da.parse(t);
    return da.createTransformer(t)(a.map((i) => typeof i == "number" ? 0 : typeof i == "object" ? { ...i, alpha: 1 } : i));
  }
}, Sb = {
  ...ri,
  transform: Math.round
}, ez = {
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
  distance: ke,
  translateX: ke,
  translateY: ke,
  translateZ: ke,
  x: ke,
  y: ke,
  z: ke,
  perspective: ke,
  transformPerspective: ke,
  opacity: Sl,
  originX: lb,
  originY: lb,
  originZ: ke
}, fm = {
  // Border props
  borderWidth: ke,
  borderTopWidth: ke,
  borderRightWidth: ke,
  borderBottomWidth: ke,
  borderLeftWidth: ke,
  borderRadius: ke,
  borderTopLeftRadius: ke,
  borderTopRightRadius: ke,
  borderBottomRightRadius: ke,
  borderBottomLeftRadius: ke,
  // Positioning props
  width: ke,
  maxWidth: ke,
  height: ke,
  maxHeight: ke,
  top: ke,
  right: ke,
  bottom: ke,
  left: ke,
  inset: ke,
  insetBlock: ke,
  insetBlockStart: ke,
  insetBlockEnd: ke,
  insetInline: ke,
  insetInlineStart: ke,
  insetInlineEnd: ke,
  // Spacing props
  padding: ke,
  paddingTop: ke,
  paddingRight: ke,
  paddingBottom: ke,
  paddingLeft: ke,
  paddingBlock: ke,
  paddingBlockStart: ke,
  paddingBlockEnd: ke,
  paddingInline: ke,
  paddingInlineStart: ke,
  paddingInlineEnd: ke,
  margin: ke,
  marginTop: ke,
  marginRight: ke,
  marginBottom: ke,
  marginLeft: ke,
  marginBlock: ke,
  marginBlockStart: ke,
  marginBlockEnd: ke,
  marginInline: ke,
  marginInlineStart: ke,
  marginInlineEnd: ke,
  // Typography
  fontSize: ke,
  // Misc
  backgroundPositionX: ke,
  backgroundPositionY: ke,
  ...ez,
  zIndex: Sb,
  // SVG
  fillOpacity: Sl,
  strokeOpacity: Sl,
  numOctaves: Sb
}, tz = {
  ...fm,
  // Color props
  color: nn,
  backgroundColor: nn,
  outlineColor: nn,
  fill: nn,
  stroke: nn,
  // Border props
  borderColor: nn,
  borderTopColor: nn,
  borderRightColor: nn,
  borderBottomColor: nn,
  borderLeftColor: nn,
  filter: xh,
  WebkitFilter: xh,
  mask: Sh,
  WebkitMask: Sh
}, AS = (t) => tz[t], nz = /* @__PURE__ */ new Set([xh, Sh]);
function kS(t, a) {
  let s = AS(t);
  return nz.has(s) || (s = da), s.getAnimatableNone ? s.getAnimatableNone(a) : void 0;
}
const az = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function rz(t, a, s) {
  let i = 0, o;
  for (; i < t.length && !o; ) {
    const u = t[i];
    typeof u == "string" && !az.has(u) && ei(u).values.length && (o = t[i]), i++;
  }
  if (o && s)
    for (const u of a)
      t[u] = kS(s, o);
}
class sz extends cm {
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
      if (typeof v == "string" && (v = v.trim(), am(v))) {
        const w = jS(v, s.current);
        w !== void 0 && (a[b] = w), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !CS.has(i) || a.length !== 2)
      return;
    const [o, u] = a, f = xb(o), p = xb(u), y = ib(o), m = ib(u);
    if (y !== m && Sr[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== p)
      if (pb(f) && pb(p))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else Sr[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: s } = this, i = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || QD(a[o])) && i.push(o);
    i.length && rz(a, i, s);
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
function iz(t, a, s) {
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
const DS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function xc(t) {
  return Z5(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: lz } = /* @__PURE__ */ eS(queueMicrotask, !1), oz = {
  y: !1
};
function cz() {
  return oz.y;
}
function zS(t, a) {
  const s = iz(t), i = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: i.signal
  };
  return [s, o, () => i.abort()];
}
function uz(t) {
  return !(t.pointerType === "touch" || cz());
}
function dz(t, a, s = {}) {
  const [i, o, u] = zS(t, s);
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
      if (!uz(R))
        return;
      y = !1;
      const C = a(f, R);
      typeof C == "function" && (m = C, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", N, o), f.addEventListener("pointerdown", S, o);
  }), u;
}
const OS = (t, a) => a ? t === a ? !0 : OS(t, a.parentElement) : !1, fz = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, hz = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function mz(t) {
  return hz.has(t.tagName) || t.isContentEditable === !0;
}
const Sc = /* @__PURE__ */ new WeakSet();
function wb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function Uf(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const pz = (t, a) => {
  const s = t.currentTarget;
  if (!s)
    return;
  const i = wb(() => {
    if (Sc.has(s))
      return;
    Uf(s, "down");
    const o = wb(() => {
      Uf(s, "up");
    }), u = () => Uf(s, "cancel");
    s.addEventListener("keyup", o, a), s.addEventListener("blur", u, a);
  });
  s.addEventListener("keydown", i, a), s.addEventListener("blur", () => s.removeEventListener("keydown", i), a);
};
function jb(t) {
  return fz(t) && !0;
}
const Eb = /* @__PURE__ */ new WeakSet();
function gz(t, a, s = {}) {
  const [i, o, u] = zS(t, s), f = (p) => {
    const y = p.currentTarget;
    if (!jb(p) || Eb.has(p))
      return;
    Sc.add(y), s.stopPropagation && Eb.add(p);
    const m = a(y, p), b = (S, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", w), Sc.has(y) && Sc.delete(y), jb(S) && typeof m == "function" && m(S, { success: j });
    }, v = (S) => {
      b(S, y === window || y === document || s.useGlobalTarget || OS(y, S.target));
    }, w = (S) => {
      b(S, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", w, o);
  };
  return i.forEach((p) => {
    (s.useGlobalTarget ? window : p).addEventListener("pointerdown", f, o), xc(p) && (p.addEventListener("focus", (m) => pz(m, o)), !mz(p) && !p.hasAttribute("tabindex") && (p.tabIndex = 0));
  }), u;
}
const vz = [...MS, nn, da], yz = (t) => vz.find(_S(t)), Nb = () => ({ min: 0, max: 0 }), LS = () => ({
  x: Nb(),
  y: Nb()
}), bz = /* @__PURE__ */ new WeakMap();
function Qc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function wl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const hm = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], mm = ["initial", ...hm];
function Zc(t) {
  return Qc(t.animate) || mm.some((a) => wl(t[a]));
}
function $S(t) {
  return !!(Zc(t) || t.variants);
}
function xz(t, a, s) {
  for (const i in a) {
    const o = a[i], u = s[i];
    if (xn(o))
      t.addValue(i, o);
    else if (xn(u))
      t.addValue(i, kc(o, { owner: t }));
    else if (u !== o)
      if (t.hasValue(i)) {
        const f = t.getValue(i);
        f.liveStyle === !0 ? f.jump(o) : f.hasAnimated || f.set(o);
      } else {
        const f = t.getStaticValue(i);
        t.addValue(i, kc(f !== void 0 ? f : o, { owner: t }));
      }
  }
  for (const i in s)
    a[i] === void 0 && t.removeValue(i);
  return a;
}
const Dc = { current: null }, pm = { current: !1 }, Sz = typeof window < "u";
function US() {
  if (pm.current = !0, !!Sz)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => Dc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      Dc.current = !1;
}
const Cb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let zc = {};
function BS(t) {
  zc = t;
}
function wz() {
  return zc;
}
class jz {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = cm, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const S = qn.now();
      this.renderScheduledAt < S && (this.renderScheduledAt = S, na.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: b } = p;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = s.initial ? { ...m } : {}, this.renderState = b, this.parent = a, this.props = s, this.presenceContext = i, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Zc(s), this.isVariantNode = $S(s), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
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
    this.current = a, bz.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, i) => this.bindToMotionValue(i, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (pm.current || US(), this.shouldReduceMotion = Dc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), s.accelerate && SS.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: p, times: y, ease: m, duration: b } = s.accelerate, v = new bS({
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : LS();
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
    for (let i = 0; i < Cb.length; i++) {
      const o = Cb[i];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, f = a[u];
      f && (this.propEventSubscriptions[o] = this.on(o, f));
    }
    this.prevMotionValues = xz(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i === void 0 && s !== void 0 && (i = kc(s === null ? void 0 : s, { owner: this }), this.addValue(a, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, s) {
    let i = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return i != null && (typeof i == "string" && (B1(i) || V1(i)) ? i = parseFloat(i) : !yz(i) && da.test(s) && (i = kS(a, s)), this.setBaseTarget(a, xn(i) ? i.get() : i)), xn(i) ? i.get() : i;
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
      const u = um(this.props, s, this.presenceContext?.custom);
      u && (i = u[a]);
    }
    if (s && i !== void 0)
      return i;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !xn(o) ? o : this.initialValues[a] !== void 0 && i === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, s) {
    return this.events[a] || (this.events[a] = new q1()), this.events[a].add(s);
  }
  notify(a, ...s) {
    this.events[a] && this.events[a].notify(...s);
  }
  scheduleRenderMicrotask() {
    lz.render(this.render);
  }
}
class VS extends jz {
  constructor() {
    super(...arguments), this.KeyframeResolver = sz;
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
function Ez({ top: t, left: a, right: s, bottom: i }) {
  return {
    x: { min: a, max: s },
    y: { min: t, max: i }
  };
}
function Nz(t, a) {
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
function Cz(t, a) {
  return Ez(Nz(t.getBoundingClientRect(), a));
}
const Tz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Rz = si.length;
function _z(t, a, s) {
  let i = "", o = !0;
  for (let u = 0; u < Rz; u++) {
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
      const m = DS(p, fm[f]);
      if (!y) {
        o = !1;
        const b = Tz[f] || f;
        i += `${b}(${m}) `;
      }
      s && (a[f] = m);
    }
  }
  return i = i.trim(), s ? i = s(a, o ? "" : i) : o && (i = "none"), i;
}
function gm(t, a, s) {
  const { style: i, vars: o, transformOrigin: u } = t;
  let f = !1, p = !1;
  for (const y in a) {
    const m = a[y];
    if (ii.has(y)) {
      f = !0;
      continue;
    } else if (nS(y)) {
      o[y] = m;
      continue;
    } else {
      const b = DS(m, fm[y]);
      y.startsWith("origin") ? (p = !0, u[y] = b) : i[y] = b;
    }
  }
  if (a.transform || (f || s ? i.transform = _z(a, t.transform, s) : i.transform && (i.transform = "none")), p) {
    const { originX: y = "50%", originY: m = "50%", originZ: b = 0 } = u;
    i.transformOrigin = `${y} ${m} ${b}`;
  }
}
function IS(t, { style: a, vars: s }, i, o) {
  const u = t.style;
  let f;
  for (f in a)
    u[f] = a[f];
  o?.applyProjectionStyles(u, i);
  for (f in s)
    u.setProperty(f, s[f]);
}
function Tb(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const al = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (ke.test(t))
        t = parseFloat(t);
      else
        return t;
    const s = Tb(t, a.target.x), i = Tb(t, a.target.y);
    return `${s}% ${i}%`;
  }
}, Mz = {
  correct: (t, { treeScale: a, projectionDelta: s }) => {
    const i = t, o = da.parse(t);
    if (o.length > 5)
      return i;
    const u = da.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, p = s.x.scale * a.x, y = s.y.scale * a.y;
    o[0 + f] /= p, o[1 + f] /= y;
    const m = Al(p, y, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= m), typeof o[3 + f] == "number" && (o[3 + f] /= m), u(o);
  }
}, Az = {
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
  boxShadow: Mz
};
function HS(t, { layout: a, layoutId: s }) {
  return ii.has(t) || t.startsWith("origin") || (a || s !== void 0) && (!!Az[t] || t === "opacity");
}
function vm(t, a, s) {
  const i = t.style, o = a?.style, u = {};
  if (!i)
    return u;
  for (const f in i)
    (xn(i[f]) || o && xn(o[f]) || HS(f, t) || s?.getValue(f)?.liveStyle !== void 0) && (u[f] = i[f]);
  return u;
}
function kz(t) {
  return window.getComputedStyle(t);
}
class Dz extends VS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = IS;
  }
  readValueFromInstance(a, s) {
    if (ii.has(s))
      return this.projection?.isProjecting ? fh(s) : aD(a, s);
    {
      const i = kz(a), o = (nS(s) ? i.getPropertyValue(s) : i[s]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: s }) {
    return Cz(a, s);
  }
  build(a, s, i) {
    gm(a, s, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return vm(a, s, i);
  }
}
const zz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Oz = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Lz(t, a, s = 1, i = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? zz : Oz;
  t[u.offset] = `${-i}`, t[u.array] = `${a} ${s}`;
}
const $z = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function qS(t, {
  attrX: a,
  attrY: s,
  attrScale: i,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...p
}, y, m, b) {
  if (gm(t, p, m), y) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: w } = t;
  v.transform && (w.transform = v.transform, delete v.transform), (w.transform || v.transformOrigin) && (w.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), w.transform && (w.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const S of $z)
    v[S] !== void 0 && (w[S] = v[S], delete v[S]);
  a !== void 0 && (v.x = a), s !== void 0 && (v.y = s), i !== void 0 && (v.scale = i), o !== void 0 && Lz(v, o, u, f, !1);
}
const FS = /* @__PURE__ */ new Set([
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
]), YS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Uz(t, a, s, i) {
  IS(t, a, void 0, i);
  for (const o in a.attrs)
    t.setAttribute(FS.has(o) ? o : dm(o), a.attrs[o]);
}
function GS(t, a, s) {
  const i = vm(t, a, s);
  for (const o in t)
    if (xn(t[o]) || xn(a[o])) {
      const u = si.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      i[u] = t[o];
    }
  return i;
}
class Bz extends VS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = LS;
  }
  getBaseTargetFromProps(a, s) {
    return a[s];
  }
  readValueFromInstance(a, s) {
    if (ii.has(s)) {
      const i = AS(s);
      return i && i.default || 0;
    }
    return s = FS.has(s) ? s : dm(s), a.getAttribute(s);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return GS(a, s, i);
  }
  build(a, s, i) {
    qS(a, s, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(a, s, i, o) {
    Uz(a, s, i, o);
  }
  mount(a) {
    this.isSVGTag = YS(a.tagName), super.mount(a);
  }
}
const Vz = mm.length;
function PS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const s = t.parent ? PS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (s.initial = t.props.initial), s;
  }
  const a = {};
  for (let s = 0; s < Vz; s++) {
    const i = mm[s], o = t.props[i];
    (wl(o) || o === !1) && (a[i] = o);
  }
  return a;
}
function KS(t, a) {
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
const Iz = [...hm].reverse(), Hz = hm.length;
function qz(t) {
  return (a) => Promise.all(a.map(({ animation: s, options: i }) => KD(t, s, i)));
}
function Fz(t) {
  let a = qz(t), s = Rb(), i = !0, o = !1;
  const u = (m) => (b, v) => {
    const w = Jr(t, v, m === "exit" ? t.presenceContext?.custom : void 0);
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
    const { props: b } = t, v = PS(t.parent) || {}, w = [], S = /* @__PURE__ */ new Set();
    let j = {}, N = 1 / 0;
    for (let C = 0; C < Hz; C++) {
      const O = Iz[C], _ = s[O], T = b[O] !== void 0 ? b[O] : v[O], q = wl(T), Q = O === m ? _.isActive : null;
      Q === !1 && (N = C);
      let re = T === v[O] && T !== b[O] && q;
      if (re && (i || o) && t.manuallyAnimateOnMount && (re = !1), _.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !_.isActive && Q === null || // If we didn't and don't have any defined prop for this animation type
      !T && !_.prevProp || // Or if the prop doesn't define an animation
      Qc(T) || typeof T == "boolean")
        continue;
      if (O === "exit" && _.isActive && Q !== !0) {
        _.prevResolvedValues && (j = {
          ...j,
          ..._.prevResolvedValues
        });
        continue;
      }
      const M = Yz(_.prevProp, T);
      let V = M || // If we're making this variant active, we want to always make it active
      O === m && _.isActive && !re && q || // If we removed a higher-priority variant (i is in reverse order)
      C > N && q, D = !1;
      const F = Array.isArray(T) ? T : [T];
      let W = F.reduce(u(O), {});
      Q === !1 && (W = {});
      const { prevResolvedValues: ae = {} } = _, K = {
        ...ae,
        ...W
      }, le = ($) => {
        V = !0, S.has($) && (D = !0, S.delete($)), _.needsAnimating[$] = !0;
        const se = t.getValue($);
        se && (se.liveStyle = !1);
      };
      for (const $ in K) {
        const se = W[$], de = ae[$];
        if (j.hasOwnProperty($))
          continue;
        let k = !1;
        yh(se) && yh(de) ? k = !KS(se, de) : k = se !== de, k ? se != null ? le($) : S.add($) : se !== void 0 && S.has($) ? le($) : _.protectedKeys[$] = !0;
      }
      _.prevProp = T, _.prevResolvedValues = W, _.isActive && (j = { ...j, ...W }), (i || o) && t.blockInitialAnimation && (V = !1);
      const A = re && M;
      V && (!A || D) && w.push(...F.map(($) => {
        const se = { type: O };
        if (typeof $ == "string" && (i || o) && !A && t.manuallyAnimateOnMount && t.parent) {
          const { parent: de } = t, k = Jr(de, $);
          if (de.enteringChildren && k) {
            const { delayChildren: H } = k.transition || {};
            se.delay = wS(de.enteringChildren, t, H);
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
        const O = Jr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        O && O.transition && (C.transition = O.transition);
      }
      S.forEach((O) => {
        const _ = t.getBaseTarget(O), T = t.getValue(O);
        T && (T.liveStyle = !0), C[O] = _ ?? null;
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
      s = Rb(), o = !0;
    }
  };
}
function Yz(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !KS(a, t) : !1;
}
function Fr(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Rb() {
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
function _b(t, a, s, i = { passive: !0 }) {
  return t.addEventListener(a, s, i), () => t.removeEventListener(a, s);
}
function Gz(t) {
  return xn(t) ? t.get() : t;
}
const ym = g.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function Mb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function Pz(...t) {
  return (a) => {
    let s = !1;
    const i = t.map((o) => {
      const u = Mb(o, a);
      return !s && typeof u == "function" && (s = !0), u;
    });
    if (s)
      return () => {
        for (let o = 0; o < i.length; o++) {
          const u = i[o];
          typeof u == "function" ? u() : Mb(t[o], null);
        }
      };
  };
}
function Kz(...t) {
  return g.useCallback(Pz(...t), t);
}
class Xz extends g.Component {
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
function Qz({ children: t, isPresent: a, anchorX: s, anchorY: i, root: o, pop: u }) {
  const f = g.useId(), p = g.useRef(null), y = g.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = g.useContext(ym), b = t.props?.ref ?? t?.ref, v = Kz(p, b);
  return g.useInsertionEffect(() => {
    const { width: w, height: S, top: j, left: N, right: R, bottom: C } = y.current;
    if (a || u === !1 || !p.current || !w || !S)
      return;
    const O = s === "left" ? `left: ${N}` : `right: ${R}`, _ = i === "bottom" ? `bottom: ${C}` : `top: ${j}`;
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
            ${_}px !important;
          }
        `), () => {
      p.current?.removeAttribute("data-motion-pop-id"), q.contains(T) && q.removeChild(T);
    };
  }, [a]), c.jsx(Xz, { isPresent: a, childRef: p, sizeRef: y, pop: u, children: u === !1 ? t : g.cloneElement(t, { ref: v }) });
}
const Zz = ({ children: t, initial: a, isPresent: s, onExitComplete: i, custom: o, presenceAffectsLayout: u, mode: f, anchorX: p, anchorY: y, root: m }) => {
  const b = em(Jz), v = g.useId();
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
  }, [s]), t = c.jsx(Qz, { pop: f === "popLayout", isPresent: s, anchorX: p, anchorY: y, root: m, children: t }), c.jsx(Pc.Provider, { value: S, children: t });
};
function Jz() {
  return /* @__PURE__ */ new Map();
}
function Wz(t = !0) {
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
function Ab(t) {
  const a = [];
  return g.Children.forEach(t, (s) => {
    g.isValidElement(s) && a.push(s);
  }), a;
}
const XS = ({ children: t, custom: a, initial: s = !0, onExitComplete: i, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: p = "left", anchorY: y = "top", root: m }) => {
  const [b, v] = Wz(f), w = g.useMemo(() => Ab(t), [t]), S = f && !b ? [] : w.map(rc), j = g.useRef(!0), N = g.useRef(w), R = em(() => /* @__PURE__ */ new Map()), C = g.useRef(/* @__PURE__ */ new Set()), [O, _] = g.useState(w), [T, q] = g.useState(w);
  U1(() => {
    j.current = !1, N.current = w;
    for (let M = 0; M < T.length; M++) {
      const V = rc(T[M]);
      S.includes(V) ? (R.delete(V), C.current.delete(V)) : R.get(V) !== !0 && R.set(V, !1);
    }
  }, [T, S.length, S.join("-")]);
  const Q = [];
  if (w !== O) {
    let M = [...w];
    for (let V = 0; V < T.length; V++) {
      const D = T[V], F = rc(D);
      S.includes(F) || (M.splice(V, 0, D), Q.push(D));
    }
    return u === "wait" && Q.length && (M = Q), q(Ab(M)), _(w), null;
  }
  const { forceRender: re } = g.useContext($1);
  return c.jsx(c.Fragment, { children: T.map((M) => {
    const V = rc(M), D = f && !b ? !1 : w === T || S.includes(V), F = () => {
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
    return c.jsx(Zz, { isPresent: D, initial: !j.current || s ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: m, onExitComplete: D ? void 0 : F, anchorX: p, anchorY: y, children: M }, V);
  }) });
}, bm = g.createContext({ strict: !1 }), kb = {
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
let Db = !1;
function e4() {
  if (Db)
    return;
  const t = {};
  for (const a in kb)
    t[a] = {
      isEnabled: (s) => kb[a].some((i) => !!s[i])
    };
  BS(t), Db = !0;
}
function QS() {
  return e4(), wz();
}
function wh(t) {
  const a = QS();
  for (const s in t)
    a[s] = {
      ...a[s],
      ...t[s]
    };
  BS(a);
}
function xm({ children: t, features: a, strict: s = !1 }) {
  const [, i] = g.useState(!Bf(a)), o = g.useRef(void 0);
  if (!Bf(a)) {
    const { renderer: u, ...f } = a;
    o.current = u, wh(f);
  }
  return g.useEffect(() => {
    Bf(a) && a().then(({ renderer: u, ...f }) => {
      wh(f), o.current = u, i(!0);
    });
  }, []), c.jsx(bm.Provider, { value: { renderer: o.current, strict: s }, children: t });
}
function Bf(t) {
  return typeof t == "function";
}
const t4 = /* @__PURE__ */ new Set([
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
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || t4.has(t);
}
let ZS = (t) => !Oc(t);
function n4(t) {
  typeof t == "function" && (ZS = (a) => a.startsWith("on") ? !Oc(a) : t(a));
}
try {
  n4(require("@emotion/is-prop-valid").default);
} catch {
}
function a4(t, a, s) {
  const i = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || xn(t[o]) || (ZS(o) || s === !0 && Oc(o) || !a && !Oc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (i[o] = t[o]);
  return i;
}
const Jc = /* @__PURE__ */ g.createContext({});
function r4(t, a) {
  if (Zc(t)) {
    const { initial: s, animate: i } = t;
    return {
      initial: s === !1 || wl(s) ? s : void 0,
      animate: wl(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function s4(t) {
  const { initial: a, animate: s } = r4(t, g.useContext(Jc));
  return g.useMemo(() => ({ initial: a, animate: s }), [zb(a), zb(s)]);
}
function zb(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Sm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function JS(t, a, s) {
  for (const i in a)
    !xn(a[i]) && !HS(i, s) && (t[i] = a[i]);
}
function i4({ transformTemplate: t }, a) {
  return g.useMemo(() => {
    const s = Sm();
    return gm(s, a, t), Object.assign({}, s.vars, s.style);
  }, [a]);
}
function l4(t, a) {
  const s = t.style || {}, i = {};
  return JS(i, s, t), Object.assign(i, i4(t, a)), i;
}
function o4(t, a) {
  const s = {}, i = l4(t, a);
  return t.drag && t.dragListener !== !1 && (s.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = i, s;
}
const WS = () => ({
  ...Sm(),
  attrs: {}
});
function c4(t, a, s, i) {
  const o = g.useMemo(() => {
    const u = WS();
    return qS(u, a, YS(i), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    JS(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const u4 = [
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
function wm(t) {
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
      !!(u4.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function d4(t, a, s, { latestValues: i }, o, u = !1, f) {
  const y = (f ?? wm(t) ? c4 : o4)(a, i, o, t), m = a4(a, typeof t == "string", u), b = t !== g.Fragment ? { ...m, ...y, ref: s } : {}, { children: v } = a, w = g.useMemo(() => xn(v) ? v.get() : v, [v]);
  return g.createElement(t, {
    ...b,
    children: w
  });
}
function f4({ scrapeMotionValuesFromProps: t, createRenderState: a }, s, i, o) {
  return {
    latestValues: h4(s, i, o, t),
    renderState: a()
  };
}
function h4(t, a, s, i) {
  const o = {}, u = i(t, {});
  for (const w in u)
    o[w] = Gz(u[w]);
  let { initial: f, animate: p } = t;
  const y = Zc(t), m = $S(t);
  a && m && !y && t.inherit !== !1 && (f === void 0 && (f = a.initial), p === void 0 && (p = a.animate));
  let b = s ? s.initial === !1 : !1;
  b = b || f === !1;
  const v = b ? p : f;
  if (v && typeof v != "boolean" && !Qc(v)) {
    const w = Array.isArray(v) ? v : [v];
    for (let S = 0; S < w.length; S++) {
      const j = um(t, w[S]);
      if (j) {
        const { transitionEnd: N, transition: R, ...C } = j;
        for (const O in C) {
          let _ = C[O];
          if (Array.isArray(_)) {
            const T = b ? _.length - 1 : 0;
            _ = _[T];
          }
          _ !== null && (o[O] = _);
        }
        for (const O in N)
          o[O] = N[O];
      }
    }
  }
  return o;
}
const ew = (t) => (a, s) => {
  const i = g.useContext(Jc), o = g.useContext(Pc), u = () => f4(t, a, i, o);
  return s ? u() : em(u);
}, m4 = /* @__PURE__ */ ew({
  scrapeMotionValuesFromProps: vm,
  createRenderState: Sm
}), p4 = /* @__PURE__ */ ew({
  scrapeMotionValuesFromProps: GS,
  createRenderState: WS
}), g4 = Symbol.for("motionComponentSymbol");
function v4(t, a, s) {
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
const y4 = g.createContext({});
function b4(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function x4(t, a, s, i, o, u) {
  const { visualElement: f } = g.useContext(Jc), p = g.useContext(bm), y = g.useContext(Pc), m = g.useContext(ym), b = m.reducedMotion, v = m.skipAnimations, w = g.useRef(null), S = g.useRef(!1);
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
  const j = w.current, N = g.useContext(y4);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && S4(w.current, s, o, N);
  const R = g.useRef(!1);
  g.useInsertionEffect(() => {
    j && R.current && j.update(s, y);
  });
  const C = s[TS], O = g.useRef(!!C && typeof window < "u" && !window.MotionHandoffIsComplete?.(C) && window.MotionHasOptimisedAnimation?.(C));
  return U1(() => {
    S.current = !0, j && (R.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), O.current && j.animationState && j.animationState.animateChanges());
  }), g.useEffect(() => {
    j && (!O.current && j.animationState && j.animationState.animateChanges(), O.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(C);
    }), O.current = !1), j.enteringChildren = void 0);
  }), j;
}
function S4(t, a, s, i) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: p, layoutScroll: y, layoutRoot: m, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new s(t.latestValues, a["data-framer-portal-id"] ? void 0 : tw(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!f || p && b4(p),
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
function tw(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : tw(t.parent);
}
function Vf(t, { forwardMotionProps: a = !1, type: s } = {}, i, o) {
  i && wh(i);
  const u = s ? s === "svg" : wm(t), f = u ? p4 : m4;
  function p(m, b) {
    let v;
    const w = {
      ...g.useContext(ym),
      ...m,
      layoutId: w4(m)
    }, { isStatic: S } = w, j = s4(m), N = f(m, S);
    if (!S && typeof window < "u") {
      j4();
      const R = E4(w);
      v = R.MeasureLayout, j.visualElement = x4(t, N, w, o, R.ProjectionNode, u);
    }
    return c.jsxs(Jc.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...w }) : null, d4(t, m, v4(N, j.visualElement, b), N, S, a, u)] });
  }
  p.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const y = g.forwardRef(p);
  return y[g4] = t, y;
}
function w4({ layoutId: t }) {
  const a = g.useContext($1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function j4(t, a) {
  g.useContext(bm).strict;
}
function E4(t) {
  const a = QS(), { drag: s, layout: i } = a;
  if (!s && !i)
    return {};
  const o = { ...s, ...i };
  return {
    MeasureLayout: s?.isEnabled(t) || i?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function N4(t, a) {
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
const jm = /* @__PURE__ */ N4(), C4 = (t, a) => a.isSVG ?? wm(t) ? new Bz(a) : new Dz(a, {
  allowProjection: t !== g.Fragment
});
class T4 extends li {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = Fz(a));
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
let R4 = 0;
class _4 extends li {
  constructor() {
    super(...arguments), this.id = R4++, this.isExitComplete = !1;
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
          const p = Jr(this.node, u, f);
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
const M4 = {
  animation: {
    Feature: T4
  },
  exit: {
    Feature: _4
  }
};
function nw(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function Ob(t, a, s) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", s === "Start");
  const o = "onHover" + s, u = i[o];
  u && na.postRender(() => u(a, nw(a)));
}
class A4 extends li {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = dz(a, (s, i) => (Ob(this.node, i, "Start"), (o) => Ob(this.node, o, "End"))));
  }
  unmount() {
  }
}
class k4 extends li {
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
    this.unmount = Kc(_b(this.node.current, "focus", () => this.onFocus()), _b(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Lb(t, a, s) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", s === "Start");
  const o = "onTap" + (s === "End" ? "" : s), u = i[o];
  u && na.postRender(() => u(a, nw(a)));
}
class D4 extends li {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: s, propagate: i } = this.node.props;
    this.unmount = gz(a, (o, u) => (Lb(this.node, u, "Start"), (f, { success: p }) => Lb(this.node, f, p ? "End" : "Cancel")), {
      useGlobalTarget: s,
      stopPropagation: i?.tap === !1
    });
  }
  unmount() {
  }
}
const jh = /* @__PURE__ */ new WeakMap(), If = /* @__PURE__ */ new WeakMap(), z4 = (t) => {
  const a = jh.get(t.target);
  a && a(t);
}, O4 = (t) => {
  t.forEach(z4);
};
function L4({ root: t, ...a }) {
  const s = t || document;
  If.has(s) || If.set(s, {});
  const i = If.get(s), o = JSON.stringify(a);
  return i[o] || (i[o] = new IntersectionObserver(O4, { root: t, ...a })), i[o];
}
function $4(t, a, s) {
  const i = L4(a);
  return jh.set(t, s), i.observe(t), () => {
    jh.delete(t), i.unobserve(t);
  };
}
const U4 = {
  some: 0,
  all: 1
};
class B4 extends li {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: s, margin: i, amount: o = "some", once: u } = a, f = {
      root: s ? s.current : void 0,
      rootMargin: i,
      threshold: typeof o == "number" ? o : U4[o]
    }, p = (y) => {
      const { isIntersecting: m } = y;
      if (this.isInView === m || (this.isInView = m, u && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), w = m ? b : v;
      w && w(y);
    };
    this.stopObserver = $4(this.node.current, f, p);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(V4(a, s)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function V4({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (s) => t[s] !== a[s];
}
const I4 = {
  inView: {
    Feature: B4
  },
  tap: {
    Feature: D4
  },
  focus: {
    Feature: k4
  },
  hover: {
    Feature: A4
  }
}, Em = {
  renderer: C4,
  ...M4,
  ...I4
};
function H4() {
  !pm.current && US();
  const [t] = g.useState(Dc.current);
  return t;
}
const Eh = "emotion-tts:trigger-generate", Nh = "emotion-tts:run-state", Ch = "emotion-tts:run-completed";
function q4() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Eh));
}
function F4(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Nh, { detail: t }));
}
function Y4(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Eh, t), () => window.removeEventListener(Eh, t));
}
function aw(t) {
  if (typeof window > "u") return () => {
  };
  const a = (s) => {
    const i = s.detail;
    i && t(i);
  };
  return window.addEventListener(Nh, a), () => window.removeEventListener(Nh, a);
}
function G4() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Ch));
}
function P4(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Ch, t), () => window.removeEventListener(Ch, t));
}
var K4 = "wksjad0", X4 = "wksjad1", Q4 = "wksjad2", Z4 = "wksjad3", J4 = "wksjad4", W4 = "wksjad5", eO = "wksjad6", tO = "wksjad7", nO = "wksjad8", aO = "wksjad9", rO = "wksjada", sO = "wksjadb", iO = "wksjadc", lO = "wksjadd", oO = "wksjade", cO = "wksjadf", uO = "wksjadg", Hf = "wksjadh", dO = "wksjadi", fO = "wksjadj", hO = "wksjadk", mO = "wksjadl", pO = "wksjadm", gO = "wksjadn";
const Th = 5, vO = 5e-3;
function rw(t, a = "") {
  return `${Sa}/deployments/${t}/artifacts${a}`;
}
function yO(t) {
  const [a, s] = g.useState([]), [i, o] = g.useState(!1), [u, f] = g.useState(null), [p, y] = g.useState(0), m = g.useRef(null), b = g.useRef(!1), v = g.useCallback(() => y((w) => w + 1), []);
  return g.useEffect(() => {
    m.current?.abort();
    const w = new AbortController();
    return m.current = w, o(!0), f(null), fetch(`${rw(t)}?limit=${Th}`, {
      headers: { accept: "application/json" },
      signal: w.signal
    }).then(async (S) => {
      if (!S.ok)
        throw new Error(`HTTP ${S.status}`);
      const j = await S.json();
      w.signal.aborted || s(j.artifacts.slice(0, Th));
    }).catch((S) => {
      if (w.signal.aborted) return;
      const j = S instanceof Error ? S.message : "fetch failed";
      f(j);
    }).finally(() => {
      w.signal.aborted || o(!1);
    }), () => w.abort();
  }, [t, p]), g.useEffect(() => aw((w) => {
    const S = b.current;
    b.current = w.busy, S && !w.busy && v();
  }), [v]), { rows: a, loading: i, error: u, refetch: v, tick: p };
}
function bO(t, a) {
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
function xO({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: s, loading: i, error: o, refetch: u, tick: f } = yO(t), p = bO(t, f), [y, m] = g.useState(null), b = H4(), v = g.useCallback(() => {
    m(null), u();
  }, [u]), w = s;
  return !i && !o && w.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: K4, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: X4, children: [
      /* @__PURE__ */ c.jsx("span", { className: Q4, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: Z4, children: [
        /* @__PURE__ */ c.jsx("span", { className: J4, children: w.length }),
        /* @__PURE__ */ c.jsxs("span", { className: W4, children: [
          "last ",
          Th
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: eO,
            onClick: v,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        )
      ] })
    ] }),
    o && /* @__PURE__ */ c.jsx("div", { className: gO, role: "alert", children: o }),
    /* @__PURE__ */ c.jsx(xm, { features: Em, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: tO, children: /* @__PURE__ */ c.jsx(XS, { initial: !1, children: w.map((S) => {
      const j = y === S.utteranceId, N = rw(
        t,
        `/${S.utteranceId}/download`
      ), R = S.voiceAssetId ? p.get(S.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        jm.li,
        {
          className: nO,
          initial: b ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: b ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: b ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": j || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: aO, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: rO,
                  onClick: () => m(
                    (C) => C === S.utteranceId ? null : S.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": j,
                  children: j ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: sO, children: [
                /* @__PURE__ */ c.jsxs("div", { className: iO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: lO, children: S.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: oO, title: S.text, children: S.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: cO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: uO, children: wO(S.finishedAt) }),
                  R && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Hf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: dO, children: R })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: Hf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: fO, children: SO(S.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > vO && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Hf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: hO, children: [
                      a.toFixed(2),
                      "×"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ c.jsx(
                "a",
                {
                  className: mO,
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
                className: pO,
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
function SO(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return s > 0 ? `${s}:${i.toString().padStart(2, "0")}` : `${i}s`;
}
function wO(t) {
  if (!t) return "—";
  const s = Math.floor(Date.now() / 1e3) - t;
  return s < 0 ? "just now" : s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : s < 86400 ? `${Math.floor(s / 3600)}h ago` : s < 604800 ? `${Math.floor(s / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
function jO(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function sw() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const s = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(s.overflowY) || /(auto|scroll|overlay)/.test(s.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function EO() {
  if (typeof window > "u") return;
  const t = sw();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function iw(t) {
  const [a, s] = g.useState(!1);
  return g.useEffect(() => {
    if (typeof window > "u") return;
    const i = sw(), o = () => {
      const f = i.reduce((p, y) => {
        const m = jO(y);
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
const lw = 360;
var NO = "_1s59p180", CO = "_1s59p181", TO = "_1s59p182", RO = "_1s59p183", _O = "_1s59p184", MO = "_1s59p185", AO = "_1s59p186", kO = "_1s59p188", DO = "_1s59p189", $b = "_1s59p18a", zO = "_1s59p18c", OO = "_1s59p18d", LO = "_1s59p18e", $O = "_1s59p18f", UO = "_1s59p18g", BO = "_1s59p18i";
const VO = 4e3;
function IO(t) {
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
    const P = window.setInterval(Z, VO);
    return () => {
      H = !0, window.clearInterval(P);
    };
  }, []), g.useEffect(() => {
    F4({ busy: s === "starting" || s === "running" });
  }, [s]);
  const N = g.useCallback(
    (H) => {
      const Z = H.status;
      (Z === "completed" || Z === "partial") && (G4(), hn.success(
        Z === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
        {
          action: {
            label: "Artifacts",
            onClick: () => {
              a(`/${t.deploymentId}?tab=artifacts`);
            }
          }
        }
      ));
    },
    [a, t.deploymentId]
  ), R = g.useCallback(async () => {
    i("starting"), m(null), p(/* @__PURE__ */ new Map()), v(null);
    try {
      const H = await mT(t.deploymentId, t.createPayload);
      u(H.runId), i("running"), j.current?.(), j.current = Ky(
        t.deploymentId,
        H.runId,
        (Z) => Ub(
          Z,
          p,
          i,
          (P) => {
            v(P), N(P);
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
  g.useEffect(() => Y4(() => {
    (s === "idle" || s === "terminal" || s === "error") && R();
  }), [s, R]);
  const C = g.useCallback(async () => {
    if (o)
      try {
        await pT(t.deploymentId, o);
      } catch (H) {
        m(qf(H));
      }
  }, [t.deploymentId, o]), O = Array.from(f.values()).sort((H, Z) => H.globalIndex - Z.globalIndex), _ = s === "starting" || s === "running", T = b?.status === "partial", q = O.filter((H) => H.status === "running").length, Q = O.filter((H) => H.status === "completed").length, re = s === "starting" || s === "running" || O.length > 0, M = O.filter((H) => H.status === "failed"), V = (() => {
    if (s !== "terminal" || M.length === 0) return null;
    const H = /* @__PURE__ */ new Map();
    for (const J of M) {
      const ce = J.failureCategory ?? "unknown";
      H.set(ce, (H.get(ce) ?? 0) + 1);
    }
    let Z = "unknown", P = 0;
    for (const [J, ce] of H)
      ce > P && (Z = J, P = ce);
    const B = O.length;
    return { category: Z, count: P, total: B };
  })(), D = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, F = "Check the run detail page for the per-segment error log.", W = y?.toLowerCase().includes("unmapped") ?? !1, ae = t.diagnostics ?? [], K = w?.badge ?? "not_installed", le = K === "ready" || K === "running", A = s === "starting" ? "Starting…" : s === "running" ? "Generating…" : le ? "Generate" : "Start runtime to generate", G = !t.canGenerate || _ || !le, $ = s === "starting" || s === "running", se = $ ? "running" : G ? "blocked" : "idle", k = !iw(lw) || $;
  return /* @__PURE__ */ c.jsxs("div", { className: NO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: CO, children: [
      /* @__PURE__ */ c.jsxs("div", { className: RO, children: [
        /* @__PURE__ */ c.jsxs("span", { className: _O, children: [
          /* @__PURE__ */ c.jsx("span", { className: TO, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          re && /* @__PURE__ */ c.jsxs("span", { className: UO, children: [
            /* @__PURE__ */ c.jsx("span", { className: BO, "aria-hidden": "true" }),
            q > 0 ? `${q} in flight` : `${Q} done`
          ] })
        ] }),
        ae.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: MO, "aria-label": "Pre-flight checks", children: ae.map((H) => /* @__PURE__ */ c.jsxs("li", { className: AO, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: kO,
              "data-status": H.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: DO, children: H.label }),
          H.detail && /* @__PURE__ */ c.jsx("span", { className: $b, children: H.detail })
        ] }, H.label)) }) : /* @__PURE__ */ c.jsx("span", { className: $b, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: zO, "data-state": se, children: [
        k ? /* @__PURE__ */ c.jsxs(
          Ye,
          {
            variant: "primary",
            size: "sm",
            onClick: R,
            disabled: G,
            loading: $,
            children: [
              !$ && /* @__PURE__ */ c.jsx("span", { className: OO, "aria-hidden": "true", children: "▶" }),
              A
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: LO, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: $O, children: "↑" })
        ] }),
        _ && /* @__PURE__ */ c.jsx(
          Ye,
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
            Ye,
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
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: D[V.category] ?? F })
    ] }),
    b?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${S1.secondary} ${w1.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    T && b && /* @__PURE__ */ c.jsxs(Dn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        Ye,
        {
          variant: "secondary",
          disabled: !1,
          onClick: async () => {
            try {
              const H = await y1(t.deploymentId, b.runId);
              u(H.runId), p(/* @__PURE__ */ new Map()), v(null), i("running"), j.current?.(), j.current = Ky(
                t.deploymentId,
                H.runId,
                (Z) => Ub(Z, p, i, v, t.deploymentId, H.runId),
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
    O.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: n_, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: O.map((H) => /* @__PURE__ */ c.jsxs("tr", { className: a_, children: [
        /* @__PURE__ */ c.jsx("td", { className: mr, children: H.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: /* @__PURE__ */ c.jsx(Wr, { tone: HO(H.status), children: H.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: H.durationMs ? `${H.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: H.failureCategory ?? "" })
      ] }, H.globalIndex)) })
    ] })
  ] });
}
async function Ub(t, a, s, i, o, u) {
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
        const f = await Xh(o, u);
        i(f);
      } catch {
      }
      return;
  }
}
function HO(t) {
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
const qO = {
  queued: { label: "Queued", color: "var(--outline, #747578)", glow: "rgba(116,117,120,0)", pulse: !1 },
  rendering: { label: "Rendering", color: "var(--primary, #ba9eff)", glow: "rgba(186,158,255,0.6)", pulse: !0 },
  ready: { label: "Ready", color: "var(--acid-green, #22c55e)", glow: "rgba(34,197,94,0.6)", pulse: !1 },
  failed: { label: "Failed", color: "var(--error, #ff6e84)", glow: "rgba(255,110,132,0.5)", pulse: !1 }
}, Bb = [
  { color: "#ba9eff", rgb: "186,158,255", onColor: "#2b006e" },
  { color: "#9093ff", rgb: "144,147,255", onColor: "#080079" },
  { color: "#ff8439", rgb: "255,132,57", onColor: "#471a00" },
  { color: "#21c7d9", rgb: "33,199,217", onColor: "#00363c" },
  { color: "#34d399", rgb: "52,211,153", onColor: "#003824" },
  { color: "#e879f9", rgb: "232,121,249", onColor: "#3b0a45" }
], Vb = [
  "record_voice_over",
  "graphic_eq",
  "mic_external_on",
  "interpreter_mode",
  "voice_chat",
  "spatial_audio"
];
function FO(t) {
  return t === 0 ? "Lead" : t === 1 ? "Support" : "Voice";
}
function YO(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function GO(t) {
  const a = t.filter((s) => s.isActive && (s.kind === "speaker" || s.kind === "mixed"));
  return a.length === 0 ? [] : a.map((s, i) => {
    const o = Bb[i % Bb.length], u = Vb[i % Vb.length];
    return {
      id: s.voiceAssetId,
      name: s.displayName || `Voice ${i + 1}`,
      role: FO(i),
      icon: u,
      color: o.color,
      rgb: o.rgb,
      onColor: o.onColor,
      initial: YO(s.displayName || "V"),
      lib: s.displayName || s.voiceAssetId
    };
  });
}
function ow(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
function PO(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    const o = ow(i.presetName);
    a.has(o) || (a.add(o), s.push({ id: o, label: i.presetName }));
  }
  return s;
}
function KO(t, a) {
  const s = t.find((o) => ow(o.presetName) === a);
  if (!s) return null;
  const i = s.vector;
  return Array.isArray(i) && i.length === 8 ? i : null;
}
function XO(t) {
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
function Rh(t) {
  const a = [];
  for (const s of t) for (const i of s.segs) a.push(i);
  return a;
}
function _h(t, a) {
  let s = 0;
  for (const i of t)
    for (const o of i.segs) {
      if (o.id === a) return s;
      s += 1;
    }
  return Number.MAX_SAFE_INTEGER;
}
function QO(t, a, s) {
  const i = [];
  let o = 0;
  for (const u of t)
    for (const f of u.segs)
      o >= a && o <= s && i.push(f.id), o += 1;
  return i;
}
function ZO(t, a) {
  for (const s of t) for (const i of s.segs) if (i.id === a) return i.text;
  return "";
}
function rl(t, a) {
  return [...a].sort((s, i) => _h(t, s) - _h(t, i)).map((s) => ZO(t, s)).join("").trim();
}
function Ib(t, a) {
  return Math.min(...a.segIds.map((s) => _h(t, s)));
}
function cw(t, a) {
  return t.find((s) => s.segIds.includes(a));
}
function Hb(t, a) {
  return a.every((s) => !cw(t, s));
}
function uw(t, a) {
  return [...a].sort((s, i) => Ib(t, s) - Ib(t, i));
}
function JO(t, a) {
  const s = {};
  return uw(t, a).forEach((i, o) => {
    s[i.id] = `SEG-${String(o + 1).padStart(3, "0")}`;
  }), s;
}
function WO(t) {
  return Rh(t).reduce(
    (a, s) => a + s.text.trim().split(/\s+/).filter(Boolean).length,
    0
  );
}
function eL(t) {
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
function qb(t, a) {
  return t.find((s) => s.id === a)?.label ?? a;
}
var tL = "_171z55w1", nL = "_171z55w2", aL = "_171z55w3", Fb = "_171z55w4", rL = "_171z55w5", sL = "_171z55w6", iL = "_171z55w7", lL = "_171z55w8", oL = "_171z55w9", cL = "_171z55wa", uL = "_171z55wb", dL = "_171z55wc", fL = "_171z55wd", hL = "_171z55we", mL = "_171z55wh", pL = "_171z55wi", Yb = "_171z55wj", Gb = "_171z55wk _171z55wj", gL = "_171z55wl", vL = "_171z55wm", yL = "_171z55wn", bL = "_171z55wo", Pb = "_171z55wp", Kb = "_171z55wq", xL = "_171z55wr", SL = "_171z55ws", wL = "_171z55wt", jL = "_171z55wu", EL = "_171z55wv", NL = "_171z55ww", CL = "_171z55wx", TL = "_171z55wy", RL = "_171z55wz", _L = "_171z55w10", ML = "_171z55w11", AL = "_171z55w12", kL = "_171z55w13", DL = "_171z55w14", Xb = "_171z55w15", zL = "_171z55w16", OL = "_171z55w17", LL = "_171z55w18", $L = "_171z55w19", UL = "_171z55w1a", BL = "_171z55w1b", VL = "_171z55w1c", IL = "_171z55w1d", HL = "_171z55w1e", qL = "_171z55w1f", FL = "_171z55w1g", YL = "_171z55w1h", GL = "_171z55w1i", PL = "_171z55w1j", KL = "_171z55w1k", XL = "_171z55w1l";
function QL({
  voiceAssets: t,
  presets: a,
  storyText: s,
  onStoryTextChange: i,
  mappings: o,
  onQueueChange: u
}) {
  const f = g.useMemo(() => GO(t), [t]), p = g.useMemo(() => PO(a), [a]), y = s, m = g.useMemo(() => XO(y), [y]), b = f[0]?.id ?? "", v = p[0]?.id ?? "", [w, S] = g.useState("voice"), [j, N] = g.useState(""), R = g.useMemo(
    () => t6(o, f),
    [o, f]
  ), [C, O] = g.useState([]), [_, T] = g.useState([]), [q, Q] = g.useState(null), [re, M] = g.useState(null), [V, D] = g.useState(b), [F, W] = g.useState(v), [ae, K] = g.useState(null), [le, A] = g.useState(null), [G, $] = g.useState(null), [se, de] = g.useState(null), [k, H] = g.useState(!1), Z = g.useRef(null), P = g.useRef(null), B = g.useRef(/* @__PURE__ */ new Map()), J = g.useRef(null), ce = g.useRef(1e3), ye = g.useCallback(() => (ce.current += 1, `job-${ce.current}`), []), Re = g.useMemo(() => {
    const U = /* @__PURE__ */ new Map();
    return Rh(m).forEach((pe, be) => U.set(pe.id, be)), U;
  }, [m]), Ge = g.useCallback((U) => Re.get(U) ?? Number.MAX_SAFE_INTEGER, [Re]);
  g.useEffect(() => {
    const U = new Set(Rh(m).map((pe) => pe.id));
    O((pe) => {
      const be = pe.filter((ge) => ge.segIds.every((Ue) => U.has(Ue)));
      return be.length === pe.length ? pe : be;
    });
  }, [m]), g.useEffect(() => P4(() => O([])), []), g.useEffect(() => {
    if (f.length !== 0 && (D((U) => f.some((pe) => pe.id === U) ? U : f[0].id), f.length === 1)) {
      const U = f[0].id;
      O((pe) => {
        let be = !1;
        const ge = pe.map((Ue) => f.some((Xe) => Xe.id === Ue.voiceId) ? Ue : (be = !0, { ...Ue, voiceId: U }));
        return be ? ge : pe;
      });
    }
  }, [f]);
  const Ne = g.useMemo(() => new Set(f.map((U) => U.id)), [f]), nt = g.useCallback(
    (U) => !Ne.has(U.voiceId),
    [Ne]
  ), Ie = g.useCallback((U) => {
    const pe = Z.current;
    if (!pe || !U) return { top: 60, left: 0 };
    const be = U.getBoundingClientRect(), ge = pe.getBoundingClientRect();
    let Ue = be.left - ge.left + pe.scrollLeft;
    const Xe = be.bottom - ge.top + pe.scrollTop + 10, mt = Math.max(0, pe.clientWidth - 318);
    return Ue = Math.max(0, Math.min(Ue, mt)), { top: Xe, left: Ue };
  }, []), qe = g.useCallback(() => {
    T([]), Q(null), M(null), K(null);
  }, []), Kt = g.useCallback(
    (U, pe) => {
      const be = [...U.segIds].sort((Ue, Xe) => Ge(Ue) - Ge(Xe))[0];
      if (!be) return;
      const ge = pe ?? B.current.get(be) ?? null;
      M(U.id), T([...U.segIds]), Q(be), D(U.voiceId), W(U.emotion), K(Ie(ge)), $(U.id);
    },
    [Ge, Ie]
  ), _t = g.useCallback(
    (U, pe, be) => {
      const ge = cw(C, U);
      if (ge) {
        Kt(ge, pe);
        return;
      }
      const Ue = Ie(pe);
      if (be && q != null && re == null) {
        const Xe = Ge(q), mt = Ge(U), at = QO(m, Math.min(Xe, mt), Math.max(Xe, mt));
        if (Hb(C, at)) {
          T(at), M(null), K(Ue);
          return;
        }
      }
      T([U]), Q(U), M(null), K(Ue);
    },
    [C, m, q, re, Ie, Kt, Ge]
  ), Mt = g.useCallback(() => {
    if (re) {
      O(
        (be) => be.map(
          (ge) => ge.id === re ? { ...ge, voiceId: V, emotion: F, status: "queued" } : ge
        )
      ), $(re), T([]), Q(null), M(null), K(null);
      return;
    }
    if (_.length === 0 || rl(m, _).trim() === "" || !Hb(C, _)) return;
    const U = ye(), pe = { id: U, segIds: [..._], voiceId: V, emotion: F, status: "queued" };
    O((be) => [...be, pe]), $(U), T([]), Q(null), K(null);
  }, [re, _, C, m, V, F, ye]), mn = g.useCallback((U) => {
    O((pe) => pe.filter((be) => be.id !== U)), $((pe) => pe === U ? null : pe), de((pe) => pe === U ? null : pe), T([]), Q(null), M(null), K(null);
  }, []), vt = g.useCallback((U) => {
    de((pe) => pe === U ? null : U);
  }, []), Xt = g.useCallback((U) => {
    P.current?.scrollBy({ left: U * 280, behavior: "smooth" });
  }, []), En = g.useCallback(
    (U) => {
      if (p.length === 0) return;
      const pe = p.findIndex((ge) => ge.id === F), be = p[(pe + U + p.length) % p.length];
      W(be.id), J.current?.querySelector(`[data-emotion="${be.id}"]`)?.focus();
    },
    [p, F]
  ), ot = ae ? re ?? _[0] ?? "new" : null;
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
  ), ht = g.useMemo(() => {
    const U = /* @__PURE__ */ new Map();
    for (const pe of C) for (const be of pe.segIds) U.set(be, pe);
    return U;
  }, [C]), we = g.useMemo(() => uw(m, C), [m, C]), Le = g.useMemo(
    () => we.filter((U) => f.some((pe) => pe.id === U.voiceId)).filter((U) => rl(m, U.segIds).trim() !== "").map((U) => {
      const pe = KO(a, U.emotion);
      return {
        text: rl(m, U.segIds),
        voice_asset_id: U.voiceId,
        speaker_label: (sc(f, U.voiceId) ?? dl).name,
        emotion: pe ? { mode: "emotion_vector", vector: pe } : null
      };
    }),
    [we, m, f, a]
  ), Ke = g.useRef(null);
  g.useEffect(() => {
    const U = JSON.stringify(Le);
    U !== Ke.current && (Ke.current = U, u?.(Le));
  }, [Le, u]);
  const ct = g.useMemo(() => {
    const U = /* @__PURE__ */ new Map();
    for (const pe of C) {
      const be = [...pe.segIds].sort((ge, Ue) => Ge(ge) - Ge(Ue))[0];
      be && U.set(pe.id, be);
    }
    return U;
  }, [C, Ge]), At = g.useMemo(() => JO(m, C), [m, C]), Ut = g.useMemo(() => {
    const U = /* @__PURE__ */ new Set();
    for (const pe of C) for (const be of pe.segIds) U.add(be);
    return U.size;
  }, [C]), sa = g.useMemo(() => WO(m), [m]), Sn = eL(C), pn = sc(f, V) ?? dl, [Ot, Tt] = g.useState(null), gt = j.trim().toLowerCase(), Nn = g.useMemo(
    () => f.filter(
      (U) => !gt || U.name.toLowerCase().includes(gt) || U.role.toLowerCase().includes(gt)
    ),
    [f, gt]
  ), fe = g.useMemo(
    () => R.filter(
      (U) => !gt || U.name.toLowerCase().includes(gt) || (U.voice?.name.toLowerCase().includes(gt) ?? !1)
    ),
    [R, gt]
  ), _e = w === "character" ? `${fe.length} character${fe.length === 1 ? "" : "s"}` : `${Nn.length} voice${Nn.length === 1 ? "" : "s"}`, Ce = (U) => U.stopPropagation();
  return /* @__PURE__ */ c.jsxs("div", { className: aL, children: [
    /* @__PURE__ */ c.jsxs("div", { style: ZL, children: [
      /* @__PURE__ */ c.jsxs("span", { className: rL, children: [
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
          className: iL,
          "aria-pressed": k,
          onClick: () => H((U) => !U),
          children: [
            /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: k ? "check" : "edit" }),
            k ? "Done" : "Edit text"
          ]
        }
      )
    ] }),
    k ? /* @__PURE__ */ c.jsx(
      "textarea",
      {
        value: s,
        onChange: (U) => i(U.target.value),
        placeholder: "Paste or write your script, then switch back to cast each phrase.",
        "aria-label": "Storyboard script text",
        style: JL
      }
    ) : /* @__PURE__ */ c.jsxs(
      "div",
      {
        ref: Z,
        className: sL,
        role: "group",
        "aria-label": "Story script — select a phrase to cast a voice",
        onMouseDown: (U) => {
          U.shiftKey && U.preventDefault();
        },
        onClick: () => {
          ae && qe();
        },
        children: [
          m.map((U) => /* @__PURE__ */ c.jsx("p", { className: lL, children: U.segs.map((pe, be) => {
            const ge = ht.get(pe.id), Ue = _.includes(pe.id), Xe = !!ge && (le === ge.id || G === ge.id), mt = !!ge && ct.get(ge.id) === pe.id, at = ge ? sc(f, ge.voiceId) : null, rt = Ff(pe.id, ht, _), qt = Ff(U.segs[be - 1]?.id, ht, _), wn = Ff(U.segs[be + 1]?.id, ht, _), Vt = rt != null && qt !== rt, z = rt != null && wn !== rt;
            return /* @__PURE__ */ c.jsxs("span", { children: [
              mt && at && /* @__PURE__ */ c.jsx("span", { className: cL, style: e6(at), "aria-hidden": "true", children: at.initial }),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  ref: (Y) => {
                    Y && B.current.set(pe.id, Y);
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": Ue || !!ge,
                  "aria-label": ge ? `${at?.name ?? "voice"} · ${pe.text.trim()}` : pe.text.trim(),
                  className: oL,
                  style: WL(Ue, at, Xe, pe.kind, Vt, z),
                  onClick: (Y) => {
                    Y.stopPropagation(), _t(pe.id, Y.currentTarget, Y.shiftKey);
                  },
                  onKeyDown: (Y) => {
                    (Y.key === "Enter" || Y.key === " ") && (Y.preventDefault(), _t(pe.id, Y.currentTarget, Y.shiftKey));
                  },
                  onMouseEnter: ge ? () => A(ge.id) : void 0,
                  onMouseLeave: ge ? () => A(null) : void 0,
                  children: pe.text
                }
              )
            ] }, pe.id);
          }) }, U.id)),
          ae && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: J,
              className: uL,
              role: "dialog",
              "aria-label": re ? "Edit casting" : "Cast voice",
              style: { top: ae.top, left: ae.left },
              onClick: Ce,
              onMouseDown: Ce,
              onKeyDown: sn,
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: dL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: fL, children: re ? "Edit casting" : "Cast voice" }),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: hL,
                      style: { width: 24, height: 24 },
                      "aria-label": "Cancel",
                      onClick: qe,
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: mL, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: pL, role: "radiogroup", "aria-label": "Cast source", children: [
                    /* @__PURE__ */ c.jsx(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": w === "voice",
                        className: w === "voice" ? Gb : Yb,
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
                        className: w === "character" ? Gb : Yb,
                        onClick: () => {
                          S("character"), N("");
                        },
                        children: "Characters"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: gL, children: _e })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: vL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: n6, children: "search" }),
                  /* @__PURE__ */ c.jsx(
                    "input",
                    {
                      className: yL,
                      value: j,
                      onChange: (U) => N(U.target.value),
                      placeholder: w === "character" ? "Search characters…" : "Search voices…",
                      "aria-label": w === "character" ? "Search characters" : "Search voices"
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: bL, role: "radiogroup", "aria-label": w === "character" ? "Character" : "Voice", children: [
                  w === "voice" && Nn.map((U) => {
                    const pe = Ot == null && V === U.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": pe,
                        className: Pb,
                        style: Zb(U, pe),
                        onClick: () => {
                          D(U.id), Tt(null);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: Jb(U), children: U.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: Kb, children: [
                            /* @__PURE__ */ c.jsx("span", { style: Wb(pe), children: U.name }),
                            /* @__PURE__ */ c.jsx("span", { style: a6, children: U.role })
                          ] }),
                          pe && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: U.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      U.id
                    );
                  }),
                  w === "character" && fe.map((U) => {
                    const pe = U.voice ?? dl, be = Ot === U.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": be,
                        className: Pb,
                        style: Zb(pe, be),
                        onClick: () => {
                          D(U.voiceId), Tt(U.id);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: Jb(pe), children: pe.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: Kb, children: [
                            /* @__PURE__ */ c.jsx("span", { style: Wb(be), children: U.name }),
                            /* @__PURE__ */ c.jsx("span", { style: r6, children: pe.name })
                          ] }),
                          be && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: pe.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      U.id
                    );
                  }),
                  (w === "voice" && Nn.length === 0 || w === "character" && fe.length === 0) && /* @__PURE__ */ c.jsx("div", { className: xL, children: w === "character" ? R.length === 0 ? "No characters mapped yet." : `No matches for “${j}”` : f.length === 0 ? "No voices yet — add voice assets." : `No matches for “${j}”` })
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: SL }),
                /* @__PURE__ */ c.jsxs("div", { className: wL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: Fb, style: { fontSize: 9.5, marginBottom: 0 }, children: "Emotion" }),
                  /* @__PURE__ */ c.jsx(
                    "div",
                    {
                      className: jL,
                      role: "radiogroup",
                      "aria-label": "Emotion",
                      onKeyDown: (U) => {
                        U.key === "ArrowRight" || U.key === "ArrowDown" ? (U.preventDefault(), En(1)) : (U.key === "ArrowLeft" || U.key === "ArrowUp") && (U.preventDefault(), En(-1));
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
                            className: EL,
                            style: s6(pn, pe),
                            onClick: () => W(U.id),
                            children: U.label
                          },
                          U.id
                        );
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: NL, children: /* @__PURE__ */ c.jsx("span", { className: CL, children: rl(m, _) }) }),
                /* @__PURE__ */ c.jsxs("div", { className: TL, children: [
                  re && /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: RL,
                      "aria-label": "Remove casting",
                      onClick: () => re && mn(re),
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "delete" })
                    }
                  ),
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      style: i6(pn),
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
    /* @__PURE__ */ c.jsxs("div", { className: _L, children: [
      /* @__PURE__ */ c.jsxs("div", { className: ML, children: [
        /* @__PURE__ */ c.jsxs("div", { className: AL, children: [
          /* @__PURE__ */ c.jsx("span", { className: Fb, style: { marginBottom: 0 }, children: "Assigned segments" }),
          /* @__PURE__ */ c.jsx("span", { className: kL, children: C.length }),
          Sn && /* @__PURE__ */ c.jsx("span", { className: DL, children: Sn })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: Xb, "aria-label": "Scroll segments left", onClick: () => Xt(-1), disabled: C.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_left" }) }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: Xb, "aria-label": "Scroll segments right", onClick: () => Xt(1), disabled: C.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_right" }) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { ref: P, className: zL, children: [
        we.map((U) => {
          const pe = sc(f, U.voiceId) ?? dl, be = nt(U), ge = qO[U.status], Ue = G === U.id || le === U.id, Xe = se === U.id, mt = rl(m, U.segIds);
          return /* @__PURE__ */ c.jsxs(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `${pe.name} ${At[U.id]} — ${qb(p, U.emotion)} — ${be ? "voice removed — recast" : ge.label}`,
              className: OL,
              "data-broken": be ? "true" : "false",
              style: be ? o6(Ue) : l6(pe, Ue),
              onClick: () => Kt(U),
              onKeyDown: (at) => {
                (at.key === "Enter" || at.key === " ") && (at.preventDefault(), Kt(U));
              },
              onMouseEnter: () => A(U.id),
              onMouseLeave: () => A(null),
              onFocus: () => $(U.id),
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: LL, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: $L, children: [
                    /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 17, color: pe.color }, children: pe.icon }),
                    /* @__PURE__ */ c.jsx("span", { className: UL, children: pe.name })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: BL, children: At[U.id] })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: VL, children: mt }),
                /* @__PURE__ */ c.jsxs("div", { className: IL, children: [
                  /* @__PURE__ */ c.jsx("span", { style: u6(pe), children: qb(p, U.emotion) }),
                  /* @__PURE__ */ c.jsxs("span", { className: HL, children: [
                    /* @__PURE__ */ c.jsx("span", { style: d6(ge) }),
                    /* @__PURE__ */ c.jsx("span", { style: f6(ge, U.status), children: ge.label })
                  ] })
                ] }),
                be && /* @__PURE__ */ c.jsxs("span", { style: c6, role: "status", children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 14 }, "aria-hidden": "true", children: "error" }),
                  "voice removed — recast"
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: qL, children: [
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      className: FL,
                      "aria-label": Xe ? "Pause preview" : "Preview audio",
                      onClick: (at) => {
                        at.stopPropagation(), vt(U.id);
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: Xe ? "pause_circle" : "play_circle" }),
                        Xe ? "Playing" : "Preview"
                      ]
                    }
                  ),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: YL,
                      "aria-label": `Remove ${At[U.id]}`,
                      onClick: (at) => {
                        at.stopPropagation(), mn(U.id);
                      },
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                Xe && /* @__PURE__ */ c.jsx("div", { className: GL, children: /* @__PURE__ */ c.jsx("div", { style: h6(pe) }) })
              ]
            },
            U.id
          );
        }),
        C.length === 0 && /* @__PURE__ */ c.jsxs("div", { className: PL, children: [
          /* @__PURE__ */ c.jsx("span", { className: KL, children: "0" }),
          /* @__PURE__ */ c.jsx("span", { className: XL, children: "No segments cast yet. Select a phrase above to begin." })
        ] })
      ] })
    ] })
  ] });
}
const ZL = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, JL = {
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
function Ff(t, a, s) {
  if (t == null) return null;
  const i = a.get(t);
  return i ? `job:${i.id}` : s.includes(t) ? "sel" : null;
}
function Qb(t, a) {
  return {
    borderTopLeftRadius: t ? 4 : 0,
    borderBottomLeftRadius: t ? 4 : 0,
    borderTopRightRadius: a ? 4 : 0,
    borderBottomRightRadius: a ? 4 : 0
  };
}
function WL(t, a, s, i, o, u) {
  const f = { padding: "2px 0", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }, p = "186,158,255";
  return t ? { ...f, ...Qb(o, u), background: `rgba(${p},0.16)`, boxShadow: `inset 0 -2px 0 rgba(${p},0.7)`, color: "var(--on-surface)" } : a ? { ...f, ...Qb(o, u), background: `rgba(${a.rgb},${s ? 0.2 : 0.11})`, boxShadow: `inset 0 -2px 0 ${a.color}`, color: "var(--on-surface)" } : { ...f, color: i === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}
function e6(t) {
  return { color: t.color, background: `rgba(${t.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.45)` };
}
function t6(t, a) {
  return t ? [...t.values()].filter((s) => s.isActive).map((s) => ({
    id: s.mappingId,
    name: s.characterName,
    voiceId: s.speakerVoiceAssetId,
    voice: a.find((i) => i.id === s.speakerVoiceAssetId) ?? null
  })) : [];
}
function Zb(t, a) {
  return a ? {
    border: `1px solid rgba(${t.rgb},0.5)`,
    background: `rgba(${t.rgb},0.12)`
  } : {};
}
function Jb(t) {
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
function Wb(t) {
  return {
    fontSize: 12,
    fontWeight: 600,
    color: t ? "var(--on-surface, #e3e3e3)" : "var(--on-surface-variant, #c4c7c5)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };
}
const n6 = { position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--on-surface-muted)", pointerEvents: "none" }, a6 = { fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" }, r6 = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.02em", color: "var(--on-surface-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
function s6(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.45)` : "rgba(120,124,128,0.35)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))",
    color: a ? t.color : "var(--on-surface-variant, #c4c7c5)"
  };
}
function i6(t) {
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
function l6(t, a) {
  return {
    background: a ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: a ? "translateY(-2px)" : "none",
    boxShadow: a ? `inset 3px 0 0 ${t.color}, 0 0 0 1px rgba(${t.rgb},0.4), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${t.color}`
  };
}
function o6(t) {
  const a = "var(--error, #ff6e84)";
  return {
    background: t ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: t ? "translateY(-2px)" : "none",
    boxShadow: t ? `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.45), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.32)`
  };
}
const c6 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  marginTop: 6,
  fontFamily: "var(--font-ui)",
  fontSize: 10.5,
  fontWeight: 500,
  color: "var(--error, #ff6e84)"
};
function u6(t) {
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
function d6(t) {
  return {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: t.color,
    boxShadow: `0 0 8px ${t.glow}`,
    animation: t.pulse ? `${nL} 1.5s ease-in-out infinite` : "none",
    flexShrink: 0
  };
}
function f6(t, a) {
  return { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, color: a === "queued" ? "var(--on-surface-variant)" : t.color };
}
function h6(t) {
  return { position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, animation: `${tL} 1.1s linear infinite` };
}
var m6 = "xq3iim0", p6 = "xq3iim1", g6 = "xq3iim2", v6 = "xq3iim3", y6 = "xq3iim4", b6 = "xq3iim5", x6 = "xq3iim6", S6 = "xq3iim7", w6 = "xq3iim8", j6 = "xq3iim9", E6 = "xq3iima", N6 = "xq3iimb", C6 = "xq3iimc", T6 = "xq3iimd", R6 = "xq3iime", _6 = "xq3iimf", M6 = "xq3iimg", A6 = "xq3iimh", k6 = "xq3iimi", D6 = "xq3iimj", z6 = "xq3iimk", ex = "xq3iiml";
function O6({
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
        await uT(t, Q), s?.(Q);
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
  ), _ = g.useMemo(() => {
    const T = [], q = [];
    for (const Q of i)
      Q.kind === "speaker" || Q.kind === "mixed" ? T.push(Q) : q.push(Q);
    return { uploaded: T, other: q };
  }, [i]);
  return p ? /* @__PURE__ */ c.jsx("span", { className: ex, children: "Loading voices…" }) : i.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: ex, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: N, className: m6, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: R,
        type: "button",
        className: `${p6} ${S ? g6 : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": S,
        disabled: m,
        onClick: () => j((T) => !T),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: v6, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: y6, children: [
            /* @__PURE__ */ c.jsx("span", { className: b6, children: O ? O.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: x6, children: O ? dw(O) : `${i.length} voice${i.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: S6, "aria-hidden": "true", children: L6.map((T, q) => /* @__PURE__ */ c.jsx("i", { style: { height: `${T * 100}%` } }, q)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${w6}`, "aria-hidden": "true", children: S ? "expand_less" : "expand_more" })
        ]
      }
    ),
    S && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: j6,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: E6, children: /* @__PURE__ */ c.jsx("span", { className: N6, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: C6, role: "alert", children: v }),
          _.uploaded.length > 0 && /* @__PURE__ */ c.jsx(tx, { label: "Uploaded", children: _.uploaded.map((T) => /* @__PURE__ */ c.jsx(
            nx,
            {
              voice: T,
              selected: u === T.voiceAssetId,
              onSelect: () => void C(T.voiceAssetId)
            },
            T.voiceAssetId
          )) }),
          _.other.length > 0 && /* @__PURE__ */ c.jsx(tx, { label: "Other", children: _.other.map((T) => /* @__PURE__ */ c.jsx(
            nx,
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
function tx({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: T6, children: [
    /* @__PURE__ */ c.jsx("div", { className: R6, children: t }),
    a
  ] });
}
function nx({ voice: t, selected: a, onSelect: s }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${_6} ${a ? M6 : ""}`,
      onClick: s,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: A6, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: k6, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: D6, children: dw(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${z6}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const L6 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function dw(t) {
  const a = [];
  return t.durationMs != null && a.push($6(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function $6(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const s = Math.floor(a / 60), i = Math.round(a - s * 60);
  return `${s}:${i.toString().padStart(2, "0")}`;
}
const ax = [
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
function U6(t) {
  const a = ti(), s = g.useRef(null), { tokens: i, attributions: o, unresolved: u, predictedFilenames: f, characterColor: p } = g.useMemo(
    () => V6(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), y = (b) => {
    const v = s.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, m = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: m ? ZR : KR, children: [
      !m && /* @__PURE__ */ c.jsx("div", { ref: s, className: XR, "aria-hidden": "true", children: i.map((b, v) => B6(b, v, p)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: m ? JR : QR,
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
        Ye,
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
      /* @__PURE__ */ c.jsx("span", { className: Yr, children: "Parsed lines" }),
      /* @__PURE__ */ c.jsx("ul", { className: h0, children: o.map((b) => /* @__PURE__ */ c.jsxs("li", { children: [
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
      /* @__PURE__ */ c.jsx("span", { className: Yr, children: "Predicted filenames" }),
      /* @__PURE__ */ c.jsx("ul", { className: h0, children: f.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function B6(t, a, s) {
  if (t.kind === "blank")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      /* @__PURE__ */ c.jsx("span", { className: f0, children: t.raw }),
      `
`
    ] }, a);
  const i = s.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? d0 : `${d0} ${WR}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: i }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: e_, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: f0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function V6(t, a, s) {
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
    let O = "Narrator", _ = N, T, q = !1;
    if (C?.groups) {
      q = !0;
      const V = (C.groups.body ?? "").trim(), D = (C.groups.rest ?? "").trim();
      O = ((V.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", T = (V.includes("|") ? V.slice(V.indexOf("|") + 1) : "").trim() || void 0, _ = D;
    }
    w += 1;
    const Q = O.toLowerCase(), re = (p.get(Q) ?? 0) + 1;
    p.set(Q, re);
    const M = O === "Narrator" || s.has(Q);
    if (M || f.add(O), O !== "Narrator" && !m.has(Q) && (m.set(Q, ax[b % ax.length] ?? "currentColor"), b += 1), q) {
      const V = { kind: "character", raw: S, character: O, text: _, hasMapping: M };
      T !== void 0 && (V.override = T), o.push(V);
    } else
      o.push({ kind: "narrator", raw: S });
    u.push({ lineNumber: R, character: O, text: _, hasMapping: M }), y.push(
      `${w.toString().padStart(3, "0")}_${I6(O)}_${re.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: y,
    characterColor: m
  };
}
function I6(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const rx = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], fw = 1e-3;
function H6(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function q6() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function F6(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function hw(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function mw(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function Y6(t) {
  const a = [];
  for (let s = 0; s < rx.length; s += 1) {
    const i = t[s];
    typeof i == "number" && (Math.abs(i) < fw || a.push(`${rx[s]}=${mw(hw(i))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function G6(t, a) {
  const s = H6(t.character) || "Narrator", i = F6(t.text);
  if (!i) return null;
  const o = [];
  if (t.presetId) {
    const p = a.get(t.presetId);
    if (p) {
      const y = Y6(p.vector);
      y && o.push(`emotion_vector:${y}`);
    }
  }
  const u = hw(t.alpha);
  return Math.abs(u - 1) >= fw && o.push(`emotion_alpha:${mw(u)}`), `${o.length > 0 ? `[${s}|${o.join("|")}]` : `[${s}]`} ${i}`;
}
function pw(t, a) {
  const s = /* @__PURE__ */ new Map();
  for (const o of a) s.set(o.presetId, o);
  const i = [];
  for (const o of t) {
    const u = G6(o, s);
    u && i.push(u);
  }
  return i.join(`
`);
}
function Gr() {
  return {
    id: q6(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var P6 = "_1827s3t2", K6 = "_1827s3t3", X6 = "_1827s3t4", Q6 = "_1827s3t5", Z6 = "_1827s3t6", J6 = "_1827s3t7", W6 = "_1827s3t8", e8 = "_1827s3t9", t8 = "_1827s3ta", n8 = "_1827s3tb", a8 = "_1827s3td _1827s3tc", r8 = "_1827s3te _1827s3tc", s8 = "_1827s3tf", i8 = "_1827s3tg", l8 = "_1827s3th", o8 = "_1827s3ti _1827s3tc", c8 = "_1827s3tj", u8 = "_1827s3tk", d8 = "_1827s3tl", f8 = "_1827s3tm", h8 = "_1827s3tn", m8 = "_1827s3to", p8 = "_1827s3tp", g8 = "_1827s3tq", v8 = "_1827s3tr", y8 = "_1827s3ts", b8 = "_1827s3tt", x8 = "_1827s3tu";
function S8({
  rows: t,
  onRowsChange: a,
  presets: s,
  mappingsByLower: i
}) {
  const o = g.useId(), u = g.useId(), f = g.useId(), p = g.useRef(null), y = g.useRef(/* @__PURE__ */ new Map()), m = g.useRef(/* @__PURE__ */ new Map()), b = g.useRef(/* @__PURE__ */ new Map()), [v, w] = g.useState(null), [S, j] = g.useState(!1), N = g.useRef(null), R = g.useRef(null), [C, O] = g.useState(null), [_, T] = g.useState(null), [q, Q] = g.useState("");
  g.useEffect(() => {
    v && (v.kind === "addBtn" ? p.current?.focus() : v.kind === "text" && v.rowId ? y.current.get(v.rowId)?.focus() : v.kind === "remove" && v.rowId ? m.current.get(v.rowId)?.focus() : v.kind === "character" && v.rowId ? b.current.get(v.rowId)?.focus() : v.kind === "unmappedFirstItem" && R.current?.querySelector("button")?.focus(), w(null));
  }, [v]);
  const re = t.filter((B) => B.text.trim().length > 0).length, M = g.useMemo(() => {
    const B = /* @__PURE__ */ new Map();
    for (const J of t) {
      const ce = J.character.trim(), ye = ce.toLowerCase();
      !ye || ye === "narrator" || i.has(ye) || B.has(ye) || B.set(ye, ce);
    }
    return Array.from(B.values()).sort((J, ce) => J.localeCompare(ce));
  }, [t, i]), V = M.length, D = g.useRef(V), [F, W] = g.useState(0);
  g.useEffect(() => {
    V > D.current && W((B) => B + 1), D.current = V;
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
      const J = t.findIndex((nt) => nt.id === B);
      if (J < 0) return;
      const ce = t[J];
      if (!ce) return;
      const ye = J > 0 ? t[J - 1]?.id ?? null : null, Re = t.filter((nt) => nt.id !== B);
      a(Re);
      const Ge = ce.character.trim() || `Line ${J + 1}`;
      hn(`Removed ${Ge}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const nt = le.current;
            if (nt.some((_t) => _t.id === ce.id)) return;
            const Ie = [...nt], qe = ye ? nt.findIndex((_t) => _t.id === ye) : -1, Kt = qe >= 0 ? qe + 1 : 0;
            Ie.splice(Kt, 0, ce), a(Ie);
          }
        },
        duration: 5e3
      });
      const Ne = `Removed line ${J + 1}, now ${Re.length} ${Re.length === 1 ? "line" : "lines"}`;
      if (Q((nt) => nt === Ne ? `${Ne}​` : Ne), Re.length === 0)
        w({ kind: "addBtn" });
      else {
        const nt = J < Re.length ? J : Re.length - 1, Ie = Re[nt];
        w(Ie ? { kind: "remove", rowId: Ie.id } : { kind: "addBtn" });
      }
    },
    [t, a]
  ), G = g.useCallback(
    (B) => {
      const J = Gr();
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
      const Re = [...t], Ge = Re[ce], Ne = Re[ye];
      if (!Ge || !Ne) return;
      Re[ce] = Ne, Re[ye] = Ge, a(Re);
      const Ie = `Moved ${Ge.character.trim() || `Line ${ce + 1}`} to position ${ye + 1} of ${Re.length}`;
      Q((qe) => qe === Ie ? `${Ie}​` : Ie);
    },
    [t, a]
  ), se = g.useCallback(
    (B, J) => {
      B.key === "Enter" && !B.shiftKey ? (B.preventDefault(), G(J)) : B.altKey && B.key === "ArrowUp" ? (B.preventDefault(), $(J, -1)) : B.altKey && B.key === "ArrowDown" && (B.preventDefault(), $(J, 1));
    },
    [G, $]
  ), de = g.useCallback((B, J) => {
    O(J), B.dataTransfer.effectAllowed = "move", B.dataTransfer.setData("text/plain", J);
  }, []), k = g.useCallback((B, J) => {
    C && (B.preventDefault(), B.dataTransfer.dropEffect = "move", _ !== J && T(J));
  }, [C, _]), H = g.useCallback(
    (B, J) => {
      B.preventDefault();
      const ce = C ?? B.dataTransfer.getData("text/plain");
      if (O(null), T(null), !ce || ce === J) return;
      const ye = t.findIndex((qe) => qe.id === ce), Re = t.findIndex((qe) => qe.id === J);
      if (ye < 0 || Re < 0) return;
      const Ge = [...t], [Ne] = Ge.splice(ye, 1);
      if (!Ne) return;
      Ge.splice(Re, 0, Ne), a(Ge);
      const Ie = `Moved ${Ne.character.trim() || `Line ${ye + 1}`} to position ${Re + 1} of ${Ge.length}`;
      Q((qe) => qe === Ie ? `${Ie}​` : Ie);
    },
    [t, a, C]
  ), Z = g.useCallback(() => {
    O(null), T(null);
  }, []), P = g.useCallback(
    (B) => {
      const J = t.find((ce) => ce.character.trim().toLowerCase() === B.toLowerCase());
      J && w({ kind: "character", rowId: J.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: P6, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: K6, children: [
      /* @__PURE__ */ c.jsxs("span", { className: X6, id: u, children: [
        "02 / Per-character lines",
        t.length > 1 && /* @__PURE__ */ c.jsx("span", { className: b8, children: "· Alt+↑↓ to reorder" })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Q6, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: Z6, children: re.toString().padStart(2, "0") }),
        " lines",
        V > 0 && /* @__PURE__ */ c.jsxs("span", { className: u8, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: N,
              type: "button",
              className: x8,
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
              className: d8,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: f8, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: h8, children: M.map((B) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: m8,
                    onClick: () => P(B),
                    children: B
                  }
                ) }, B)) })
              ]
            }
          )
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: v8, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: J6, children: t.map((B, J) => {
      const ce = B.character.trim() || `line ${J + 1}`, ye = i.has(B.character.trim().toLowerCase()), Re = C === B.id, Ge = _ === B.id && C !== B.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: W6,
          "data-mapped": ye || void 0,
          "data-dragging": Re || void 0,
          "data-drag-over": Ge || void 0,
          onDragOver: (Ne) => k(Ne, B.id),
          onDrop: (Ne) => H(Ne, B.id),
          onDragEnd: Z,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: e8,
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
            /* @__PURE__ */ c.jsx("span", { className: n8, "aria-hidden": "true", children: (J + 1).toString().padStart(2, "0") }),
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
                className: a8,
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
                className: r8,
                "aria-label": `Emotion preset for ${ce}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  s.map((Ne) => /* @__PURE__ */ c.jsx("option", { value: Ne.presetId, children: Ne.presetName }, Ne.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: s8, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: B.alpha,
                  onChange: (Ne) => K(B.id, { alpha: Number.parseFloat(Ne.target.value) }),
                  className: i8,
                  "aria-label": `Emotion intensity for ${ce}`,
                  "aria-valuetext": `${Math.round(B.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: l8,
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
                className: o8,
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
                className: c8,
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
                className: t8,
                "aria-label": `Insert line after ${ce}`,
                title: "Insert line below",
                onClick: () => G(B.id),
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
        className: p8,
        onClick: () => G(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: g8, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    ae.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: ae.map((B) => /* @__PURE__ */ c.jsx("option", { value: B }, B)) }),
    /* @__PURE__ */ c.jsx("div", { className: y8, role: "status", "aria-live": "polite", "aria-atomic": "true", children: q })
  ] });
}
var w8 = "fmg0gf0", j8 = "fmg0gf1", sx = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const qs = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
  { id: "storyboard", label: "Storyboard", glyph: "04", description: "Click words to cast voice + emotion in bulk · shift-click to extend a range" }
], E8 = qs;
function N8({
  value: t,
  onChange: a,
  storyDisabled: s = !1
}) {
  const i = g.useRef([]), o = g.useCallback(
    (f, p) => {
      const y = qs.length;
      let m = f;
      for (let v = 1; v <= y; v += 1) {
        const w = (f + p * v + y) % y, S = qs[w];
        if (!S) continue;
        if (!(S.id === "story" && s)) {
          m = w;
          break;
        }
      }
      const b = qs[m];
      b && (a(b.id), i.current[m]?.focus());
    },
    [a, s]
  ), u = g.useCallback(
    (f, p) => {
      f.key === "ArrowRight" || f.key === "ArrowDown" ? (f.preventDefault(), o(p, 1)) : f.key === "ArrowLeft" || f.key === "ArrowUp" ? (f.preventDefault(), o(p, -1)) : f.key === "Home" ? (f.preventDefault(), o(-1, 1)) : f.key === "End" && (f.preventDefault(), o(qs.length, -1));
    },
    [o]
  );
  return /* @__PURE__ */ c.jsx("div", { className: w8, role: "radiogroup", "aria-label": "Editor mode", children: qs.map((f, p) => {
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
        className: y ? sx.active : sx.idle,
        onClick: () => {
          m || a(f.id);
        },
        onKeyDown: (v) => u(v, p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: j8, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const C8 = [
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
function T8(t, a) {
  const s = t.ownerDocument;
  if (!s) return { top: 0, left: 0, height: 0 };
  const i = s.createElement("div"), o = s.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = i.style, f = o;
  for (const N of C8) {
    const R = f[N];
    typeof R == "string" && (u[N] = R);
  }
  i.style.position = "absolute", i.style.visibility = "hidden", i.style.overflow = "hidden", i.style.top = "0", i.style.left = "-9999px", i.style.whiteSpace = "pre-wrap", i.style.wordWrap = "break-word";
  const p = t.value.slice(0, a), y = s.createTextNode(p.replace(/ /g, " ")), m = s.createElement("span");
  m.textContent = t.value.slice(a, a + 1) || ".", i.appendChild(y), i.appendChild(m), s.body.appendChild(i);
  const b = m.getBoundingClientRect(), v = i.getBoundingClientRect(), w = b.top - v.top - t.scrollTop, S = b.left - v.left - t.scrollLeft, j = b.height || parseFloat(o.lineHeight) || 16;
  return s.body.removeChild(i), { top: w, left: S, height: j };
}
const gw = {
  character: "@",
  emotion: "/"
}, vw = /* @__PURE__ */ new Set([" ", "	", `
`, "\r"]), R8 = /[\p{L}\p{N}_-]/u, _8 = /[^\p{L}\p{N}_-]+/gu;
function yw(t) {
  return t ? R8.test(t) : !1;
}
function M8(t) {
  return t.replace(_8, "_").replace(/_+/g, "_").replace(/^[_-]+|[_-]+$/g, "");
}
function A8(t, a) {
  if (a >= t.length) return 0;
  const s = t.charCodeAt(a);
  if (s >= 55296 && s <= 56319 && a + 1 < t.length) {
    const i = t.charCodeAt(a + 1);
    if (i >= 56320 && i <= 57343) return 2;
  }
  return 1;
}
function Lc(t, a) {
  const s = A8(t, a);
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
    const f = t[i], p = f === "@" || f === "/", y = i === 0 ? "" : Lc(t, wc(t, i)), m = i === 0 || y !== "" && vw.has(y);
    if (p && m) {
      let b = i + 1, v = "";
      for (; b < o; ) {
        const w = Lc(t, b);
        if (w && yw(w))
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
function k8(t, a) {
  if (a <= 0 || a > t.length) return null;
  let s = wc(t, a), i = "";
  for (; s >= 0; ) {
    const o = Lc(t, s);
    if (!o) break;
    if (o === "@" || o === "/") {
      const f = s === 0 ? "" : Lc(t, wc(t, s));
      return s === 0 || f !== "" && vw.has(f) ? {
        kind: o === "@" ? "character" : "emotion",
        start: s,
        query: i
      } : null;
    }
    if (!yw(o)) return null;
    i = o + i;
    const u = wc(t, s);
    if (u < 0) break;
    s = u;
  }
  return null;
}
var D8 = "_1d2ofoy5", z8 = "_1d2ofoy6", O8 = "_1d2ofoy8 _1d2ofoy7", L8 = "_1d2ofoy9 _1d2ofoy7", $8 = "_1d2ofoya", U8 = "_1d2ofoyb", B8 = "_1d2ofoyc", V8 = "_1d2ofoye", I8 = "_1d2ofoyf", H8 = "_1d2ofoyg", q8 = "_1d2ofoyh", F8 = "_1d2ofoyi", Y8 = "_1d2ofoyj", ic = "_1d2ofoyk", G8 = "_1d2ofoyl";
const P8 = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function K8({
  value: t,
  onChange: a,
  characters: s,
  presets: i,
  mappingsByLower: o
}) {
  const u = g.useRef(null), f = g.useRef(null), p = g.useId(), y = `${p}-opt`, [m, b] = g.useState(null), v = g.useMemo(() => $c(t), [t]), w = g.useMemo(() => {
    const D = /* @__PURE__ */ new Map();
    o.forEach((F) => D.set(F.characterName.toLowerCase(), F.characterName));
    for (const F of s) {
      const W = F.toLowerCase();
      D.has(W) || D.set(W, F);
    }
    return Array.from(D.values()).sort((F, W) => F.localeCompare(W));
  }, [s, o]), S = g.useMemo(() => {
    if (!m) return [];
    const D = m.query.toLowerCase();
    if (m.kind === "character")
      return w.filter((ae) => ae.toLowerCase().includes(D)).slice(0, 8).map((ae) => {
        const K = o.get(ae.toLowerCase());
        return { value: ae, hint: K ? "mapped" : "unmapped" };
      });
    const F = /* @__PURE__ */ new Set(), W = [];
    for (const ae of i) {
      const K = ae.presetName.toLowerCase();
      if (K.includes(D) && !F.has(K) && (F.add(K), W.push({ value: ae.presetName, hint: "vector" }), W.length >= 8))
        break;
    }
    return W;
  }, [m, w, o, i]), j = g.useCallback((D, F, W) => {
    if (F < 0) return null;
    const ae = k8(D, F);
    if (!ae) return null;
    const K = u.current, le = K ? T8(K, F) : { top: 0, left: 0, height: 0 };
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
    const D = u.current;
    if (!D) {
      b(null);
      return;
    }
    const F = D.selectionStart;
    if (F !== D.selectionEnd) {
      b(null);
      return;
    }
    b((W) => j(t, F, W));
  }, [t, j]);
  g.useEffect(() => {
    if (!m) return;
    const D = S.length, F = D === 0 ? 0 : Math.min(m.selected, D - 1);
    m.selected !== F && b({ ...m, selected: F });
  }, [m, S]), g.useLayoutEffect(() => {
    const D = f.current, F = u.current;
    !D || !F || (D.scrollTop = F.scrollTop, D.scrollLeft = F.scrollLeft);
  }), g.useEffect(() => {
    const D = u.current, F = f.current;
    if (!D || !F) return;
    const W = () => {
      F.scrollTop = D.scrollTop, F.scrollLeft = D.scrollLeft;
    };
    return D.addEventListener("scroll", W, { passive: !0 }), () => D.removeEventListener("scroll", W);
  }, []);
  const R = g.useCallback(
    (D) => {
      const F = D.target.value;
      a(F);
      const W = D.target;
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
    (D, F) => {
      if (!m) return;
      const W = gw[m.kind], ae = m.triggerStart + 1 + m.query.length, K = t.slice(0, m.triggerStart), le = t.slice(ae), A = M8(D);
      if (!A) return;
      const G = `${W}${A} `, $ = `${K}${G}${le}`;
      a($);
      const se = K.length + G.length;
      b(null), F.advanceFocus || requestAnimationFrame(() => {
        u.current && (u.current.focus(), u.current.setSelectionRange(se, se));
      });
    },
    [m, t, a]
  ), _ = g.useCallback(
    (D) => {
      if (m) {
        if (D.key === "Escape") {
          D.preventDefault(), b(null);
          return;
        }
        if (S.length !== 0) {
          if (D.key === "ArrowDown")
            D.preventDefault(), b((F) => F && { ...F, selected: (F.selected + 1) % S.length });
          else if (D.key === "ArrowUp")
            D.preventDefault(), b(
              (F) => F && { ...F, selected: (F.selected - 1 + S.length) % S.length }
            );
          else if (D.key === "Enter") {
            const F = S[m.selected];
            F && (D.preventDefault(), O(F.value, { advanceFocus: !1 }));
          } else if (D.key === "Tab") {
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
    const D = T.current, F = u.current;
    if (!D || !F) return;
    const W = D.offsetWidth, ae = F.clientWidth, K = Math.max(0, ae - W - 8), le = Math.max(0, m.caretLeft);
    Q(Math.min(le, K));
  }, [m]);
  const re = m?.kind === "character" ? "Character" : "Emotion preset", M = m && S.length > 0 ? `${y}-${m.selected}` : void 0, V = !m || S.length > 0 ? null : m.kind === "emotion" ? i.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${m.query}". Type a different name or pick from Mappings.` : m.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${m.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: D8, children: [
    /* @__PURE__ */ c.jsxs("div", { className: z8, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: O8, "aria-hidden": "true", children: X8(v, m?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: L8,
          value: t,
          onChange: R,
          onSelect: C,
          onKeyDown: _,
          placeholder: P8,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": m && S.length > 0 ? p : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": M
        }
      ),
      m && (S.length > 0 || V) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: T,
          className: V8,
          style: {
            top: `${m.caretTop + m.caretHeight + 6}px`,
            left: `${q ?? Math.max(0, m.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: I8, "aria-hidden": "true", children: re }),
            S.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: p,
                role: "listbox",
                "aria-label": re,
                className: H8,
                children: S.map((D, F) => {
                  const W = `${y}-${F}`, ae = F === m.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: W,
                      role: "option",
                      "aria-selected": ae,
                      "data-active": ae || void 0,
                      className: q8,
                      onMouseDown: (K) => {
                        K.preventDefault(), O(D.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: D.value }),
                        D.hint && /* @__PURE__ */ c.jsx("span", { className: F8, children: D.hint })
                      ]
                    },
                    `${D.value}-${F}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: p, role: "status", className: G8, children: V })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: Y8, children: [
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
function X8(t, a) {
  return t.map((s, i) => {
    if (s.kind === "text")
      return /* @__PURE__ */ c.jsx("span", { className: $8, children: s.value }, `${s.start}-${i}`);
    const o = s.kind, u = a !== null && s.start === a, f = s.value.replace(/_/g, " ");
    return /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: B8,
        "data-kind": o,
        "data-active": u ? "true" : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: U8, children: gw[o] }),
          f
        ]
      },
      `${s.start}-${i}`
    );
  });
}
var Q8 = "_5o8xvy0", Z8 = "_5o8xvy1", J8 = "_5o8xvy2", W8 = "_5o8xvy3", Yf = "_5o8xvy4", e$ = "_5o8xvy5", t$ = "_3f2ar0", n$ = "_3f2ar1", a$ = "_3f2ar2", r$ = "_3f2ar3", s$ = "_3f2ar4", i$ = "_3f2ar6", sl = "_3f2ar7", il = "_3f2ar8", ll = "_3f2ar9", ix = "_3f2ara", lx = "_3f2arb";
function l$({ label: t, glyph: a = "?", children: s }) {
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
  }, [i, y]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: t$, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: n$,
        "aria-expanded": i,
        "aria-controls": p,
        onClick: () => o((m) => !m),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: a$, "aria-hidden": "true", children: a }),
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
        className: r$,
        children: s
      }
    )
  ] });
}
var o$ = "_1dxb1dg0", ox = "_1dxb1dg1", c$ = "_1dxb1dg2", u$ = "_1dxb1dg3", d$ = "_1dxb1dg4";
function f$() {
  return /* @__PURE__ */ c.jsxs(l$, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: s$, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: i$, children: [
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
    /* @__PURE__ */ c.jsxs("p", { className: ix, children: [
      /* @__PURE__ */ c.jsx("span", { className: lx, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: ix, children: [
      /* @__PURE__ */ c.jsx("span", { className: lx, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function h$() {
  return /* @__PURE__ */ c.jsxs("ul", { className: o$, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: ox, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: ox, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: c$, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: u$, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: d$, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function m$({
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
  const C = t === "quick", O = t === "rows", _ = t === "story", T = t === "storyboard", q = _ || T, Q = E8.find((F) => F.id === t)?.description ?? "", re = O ? u.reduce((F, W) => F + W.text.length, 0) : q ? p.length : i.length, M = O ? u.map((F) => F.text).join(" ") : q ? p : i, V = M.trim() ? M.trim().split(/\s+/).length : 0, D = O ? u.filter((F) => F.text.trim().length > 0).length : (q ? p : i).trim() ? (q ? p : i).trim().split(/\r?\n/).filter((F) => F.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: Q8, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${Z8} ${C ? J8 : ""}`,
        "data-quick-on": C || void 0,
        children: [
          /* @__PURE__ */ c.jsx(N8, { value: t, onChange: a }),
          C && /* @__PURE__ */ c.jsx(
            O6,
            {
              deploymentId: s.deploymentId,
              initialVoiceAssetId: w,
              onChange: S
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: W8, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: re.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: D.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: V.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            !O && /* @__PURE__ */ c.jsx(f$, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: e$, "aria-live": "polite", children: Q }),
    T ? /* @__PURE__ */ c.jsx(
      QL,
      {
        voiceAssets: N,
        presets: j,
        storyText: p,
        onStoryTextChange: y,
        mappings: v,
        onQueueChange: R
      }
    ) : O ? /* @__PURE__ */ c.jsx(
      S8,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: v
      }
    ) : _ ? /* @__PURE__ */ c.jsx(
      K8,
      {
        value: p,
        onChange: y,
        characters: m,
        presets: j,
        mappingsByLower: v
      }
    ) : /* @__PURE__ */ c.jsx(
      U6,
      {
        value: i,
        onChange: o,
        outputFormat: b,
        mappings: v,
        deploymentId: s.deploymentId,
        quickMode: C
      }
    ),
    !C && !O && !_ && !T && /* @__PURE__ */ c.jsx(h$, {})
  ] });
}
function p$({
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
function cx(t, a) {
  return t === "quick" ? a.script.trim().length > 0 : t === "rows" ? a.rows.some((s) => s.text.trim().length > 0 || s.character.trim().length > 0) : a.storyText.trim().length > 0;
}
function g$(t, a, s, i) {
  if (t === a) return null;
  if (t === "quick" && a === "rows") {
    const u = s.script.split(/\r?\n/).filter((f) => f.trim().length > 0).map((f) => ({
      ...Gr(),
      text: f.trim()
    }));
    return { rows: u.length > 0 ? u : [Gr()] };
  }
  if (t === "quick" && a === "story")
    return { storyText: s.script };
  if (t === "rows" && a === "quick")
    return { script: pw(s.rows, i) };
  if (t === "rows" && a === "story") {
    const o = /* @__PURE__ */ new Map();
    for (const f of i) o.set(f.presetId, f);
    const u = [];
    for (const f of s.rows) {
      const p = f.text.trim();
      if (!p) continue;
      const y = f.character.trim(), m = f.presetId ? o.get(f.presetId) : null, b = [];
      y && b.push(`@${ux(y)}`), m && b.push(`/${ux(m.presetName)}`), b.push(p), u.push(b.join(" "));
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
          ...Gr(),
          character: p,
          presetId: y,
          alpha: 1,
          text: S
        });
        for (let j = 1; j < w.length; j += 1) {
          const N = w[j];
          N !== void 0 && f.push({
            ...Gr(),
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
    return v(), { rows: f.length > 0 ? f : [Gr()] };
  }
  return null;
}
function ux(t) {
  return t.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
const Gf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], v$ = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function y$(t) {
  const a = [];
  if (!t) return a;
  const s = t.split(/\r?\n/);
  for (let i = 0; i < s.length; i += 1) {
    const u = (s[i] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(v$);
    if (!f || !f.groups) {
      a.push({ idx: i, character: null, text: u, override: null });
      continue;
    }
    const p = f.groups.body ?? "", y = (f.groups.rest ?? "").trim(), [m = "", ...b] = p.split("|"), v = m.trim();
    if (!v) {
      a.push({ idx: i, character: null, text: y || u, override: null });
      continue;
    }
    const w = v.split(":")[0]?.trim() || null, S = b.join("|").trim(), j = S ? b$(S) : null;
    a.push({
      idx: i,
      character: w,
      text: y,
      override: j
    });
  }
  return a;
}
function b$(t) {
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
function x$(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    if (!i.character) continue;
    const o = i.character.toLowerCase();
    a.has(o) || (a.add(o), s.push(i.character));
  }
  return s;
}
function S$(t) {
  const a = {};
  for (let s = 0; s < t.length; s += 1) {
    const i = t[s];
    i && (a[i] = Gf[s % Gf.length] ?? Gf[0]);
  }
  return a;
}
function w$(t) {
  const a = {};
  for (const s of t)
    s.character && (a[s.character] = (a[s.character] ?? 0) + 1);
  return a;
}
var j$ = "_1snzz30", E$ = "_1snzz31", N$ = "_1snzz33", C$ = "_1snzz34", T$ = "_1snzz36", dx = "_1snzz3b", fx = "_1snzz3c", hx = "_1snzz3d";
const R$ = "ext-action-invoke", _$ = "emotion-tts.run";
function M$() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(R$, {
      detail: { id: _$ },
      bubbles: !1
    })
  ), !0) : !1;
}
const A$ = 4e3;
function k$({ visible: t, canGenerate: a }) {
  const [s, i] = g.useState(null), [o, u] = g.useState(!1), [f, p] = g.useState(!1), y = g.useRef(null);
  g.useEffect(() => {
    let G = !1;
    const $ = async () => {
      try {
        const de = await vl();
        G || (y.current = de, i(de));
      } catch {
      }
    };
    $();
    const se = window.setInterval($, A$);
    return () => {
      G = !0, window.clearInterval(se);
    };
  }, []), g.useEffect(() => aw((G) => {
    p(!!G.busy);
  }), []);
  const m = g.useCallback(() => {
    q4();
  }, []), b = s?.badge ?? "not_installed", v = b === "ready" || b === "running", w = b === "starting" || b === "installing" || b === "stopping", S = v;
  g.useEffect(() => {
    o && (w || v) && u(!1);
  }, [o, w, v]);
  const j = g.useCallback(() => {
    u(!0), M$();
  }, []), N = v ? "Stop runtime" : w ? "Runtime starting…" : "Start runtime", R = o || w, C = o || w, O = C ? "transitioning" : v ? "running" : "stopped", _ = !a || f || !S, T = S ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", q = S && a && !f, Q = v ? "ready" : w || o ? "busy" : "off", re = v ? "Runtime ready" : w ? "Starting…" : o ? "Working…" : "Runtime off", M = Q === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const V = "rgba(28, 30, 34, 0.94)", D = "#ba9eff", F = "#8455ef", W = "#1a0a3a", ae = "#f0f0f3", K = "#aaabae", le = "#22c55e", A = v ? "◼" : "⏻";
  return Qh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: j$,
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
              className: E$,
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
                color: Q === "ready" ? le : Q === "busy" ? D : K,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${Q === "ready" ? "rgba(34, 197, 94, 0.4)" : Q === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: N$,
                    "data-pulse": M ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: Q === "ready" ? `0 0 8px ${le}` : Q === "busy" ? `0 0 8px ${D}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                re
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: fx, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: C$,
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
                children: C ? /* @__PURE__ */ c.jsx("span", { className: dx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: A })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: hx, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: fx, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: T$,
                "data-ready": q ? "true" : "false",
                onClick: m,
                disabled: _,
                "aria-label": T,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: _ ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${D} 0%, ${F} 100%)`,
                  color: _ ? K : W,
                  fontFamily: 'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: _ ? "not-allowed" : "pointer",
                  boxShadow: _ ? "none" : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  transition: "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
                  whiteSpace: "nowrap"
                },
                children: [
                  f ? /* @__PURE__ */ c.jsx("span", { className: dx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: hx, role: "tooltip", children: T })
          ] })
        ]
      }
    ),
    document.body
  );
}
function D$(t) {
  const a = t.workflowCustomised ?? !1, s = t.unmappableFields ?? [], i = z$(t.deployment.displayName, t.deployment.deploymentId), o = iw(lw), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: RR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: _R, children: [
      /* @__PURE__ */ c.jsx("div", { className: AR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: MR, children: /* @__PURE__ */ c.jsx("h1", { className: kR, children: i }) }),
      /* @__PURE__ */ c.jsx("p", { className: DR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(Dn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      s.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${s.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: FR, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: zR, children: [
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
    /* @__PURE__ */ c.jsx(k$, { visible: o, canGenerate: u }),
    typeof document < "u" && Qh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: YR,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: EO,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function z$(t, a) {
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
  return /* @__PURE__ */ c.jsxs("section", { className: OR, "aria-labelledby": s, children: [
    /* @__PURE__ */ c.jsx("header", { className: LR, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: BR,
        "aria-expanded": !f,
        "aria-controls": y,
        onClick: () => p((m) => !m),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: $R, children: [
            /* @__PURE__ */ c.jsx("span", { className: VR, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: IR, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: HR, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: s, className: UR, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: qR,
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
        className: i === "split" ? PR : GR,
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
}, Mh = "__recipe";
function O$(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function L$(t) {
  const a = {};
  for (const s of Object.keys(t))
    s !== Mh && (a[s] = t[s]);
  return a;
}
function $$() {
  const { deployment: t, mappings: a, runs: s, workflow: i } = Tl(), [o, u] = g.useState(a), [f, p] = g.useState([]), [y, m] = g.useState([]), [b, v] = g.useState(null), [w, S] = g.useState(Gc), j = g.useMemo(
    () => t.defaultGenerationOverridesJson ? O$(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = g.useMemo(() => {
    const fe = j[Mh];
    return typeof fe == "object" && fe !== null ? fe : {};
  }, [j]), [R, C] = g.useState(""), [O, _] = g.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [T, q] = g.useState(t.defaultSpeedFactor ?? 1), [Q, re] = g.useState({
    mode: "none",
    emotionAlpha: 1
  }), [M, V] = g.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...L$(j)
  })), [D, F] = g.useState(() => {
    const fe = N.cachePolicy;
    return fe === "use_cache" || fe === "force_regenerate" || fe === "read_only_cache" ? fe : "use_cache";
  }), [W, ae] = g.useState(
    t.defaultVoiceAssetId ?? null
  ), [K, le] = g.useState(() => {
    const fe = N.editorMode;
    return fe === "quick" || fe === "rows" || fe === "story" || fe === "storyboard" ? fe : typeof N.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), A = K === "quick", [G, $] = g.useState(() => [Gr()]), se = 1e5, [de, k] = g.useState(() => {
    const fe = N.storyText;
    return typeof fe == "string" ? fe : "";
  }), H = g.useRef(!1), Z = g.useCallback((fe) => {
    fe.length > se && !H.current && (H.current = !0, yn.error(
      `Story text is over ${Math.round(se / 1e3)} KB — large scripts may slow down save and rendering.`
    )), fe.length <= se && (H.current = !1), k(fe);
  }, []), [P, B] = g.useState(T5), [J, ce] = g.useState([]), ye = g.useRef(R), Re = g.useRef(G), Ge = g.useRef(de), Ne = g.useRef(y);
  g.useEffect(() => {
    ye.current = R;
  }, [R]), g.useEffect(() => {
    Re.current = G;
  }, [G]), g.useEffect(() => {
    Ge.current = de;
  }, [de]), g.useEffect(() => {
    Ne.current = y;
  }, [y]);
  const [nt, Ie] = g.useState(""), qe = g.useCallback(
    (fe) => {
      le((_e) => {
        if (fe === _e) return _e;
        const Ce = {
          script: ye.current,
          rows: Re.current,
          storyText: Ge.current
        }, U = cx(fe, Ce), pe = cx(_e, Ce);
        if (!U && pe) {
          const be = g$(_e, fe, Ce, Ne.current);
          if (be) {
            const ge = { ...Ce }, Ue = document.activeElement;
            be.script !== void 0 && C(be.script), be.rows !== void 0 && $(be.rows), be.storyText !== void 0 && Z(be.storyText);
            const Xe = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story",
              storyboard: "Storyboard"
            }, mt = (Vt) => Vt.split(/\r?\n/).filter((z) => z.trim().length > 0).length, at = be.rows !== void 0 ? be.rows.length : be.script !== void 0 ? mt(be.script) : be.storyText !== void 0 ? mt(be.storyText) : 0, rt = at === 1 ? "line" : "lines", qt = at > 0 ? ` (${at} ${rt})` : "", wn = `Switched to ${Xe[fe]} mode${at > 0 ? `, ${at} ${rt}` : ""}.`;
            Ie((Vt) => Vt === wn ? `${wn}​` : wn), hn(`Switched to ${Xe[fe]}${qt} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  C(ge.script), $([...ge.rows]), Z(ge.storyText), le(_e), Ue && typeof Ue.focus == "function" && requestAnimationFrame(() => Ue.focus());
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
    }), o2(t.deploymentId).then((_e) => {
      fe || m(
        [..._e.presets].sort((Ce, U) => U.updatedAt - Ce.updatedAt)
      );
    }).catch(() => {
    }), () => {
      fe = !0;
    };
  }, [t.deploymentId]);
  const Kt = g.useRef(!0);
  g.useEffect(() => {
    if (Kt.current) {
      Kt.current = !1;
      return;
    }
    const fe = window.setTimeout(() => {
      const _e = {
        ...M,
        [Mh]: {
          editorMode: K,
          quickMode: A,
          cachePolicy: D,
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
    D,
    K,
    A,
    de,
    M
  ]);
  const _t = g.useMemo(() => K === "rows" ? pw(G, y) : K === "story" ? de : R, [K, G, y, R, de]), Mt = g.useMemo(() => y$(_t), [_t]), mn = g.useMemo(() => {
    if (K !== "story") return x$(Mt);
    const fe = /* @__PURE__ */ new Set(), _e = [];
    for (const Ce of $c(de))
      Ce.kind === "character" && (fe.has(Ce.value) || (fe.add(Ce.value), _e.push(Ce.value)));
    return _e;
  }, [K, Mt, de]), vt = g.useMemo(() => {
    const fe = new Set(mn.map((Ce) => Ce.toLowerCase())), _e = [...mn];
    for (const Ce of o) {
      if (!Ce.isActive) continue;
      const U = Ce.characterName.toLowerCase();
      fe.has(U) || (fe.add(U), _e.push(Ce.characterName));
    }
    return _e;
  }, [mn, o]), Xt = g.useMemo(() => S$(vt), [vt]), En = g.useMemo(() => w$(Mt), [Mt]), ot = g.useMemo(() => {
    const fe = /* @__PURE__ */ new Map();
    for (const _e of o)
      fe.set(_e.characterName.toLowerCase(), _e);
    return fe;
  }, [o]), sn = g.useMemo(() => A && W ? 0 : vt.filter((fe) => !ot.has(fe.toLowerCase())).length, [vt, ot, A, W]), ht = g.useCallback(
    async (fe, _e) => {
      const Ce = ot.get(fe.toLowerCase());
      try {
        if (Ce) {
          const U = await Gs(t.deploymentId, Ce.mappingId, _e);
          u(
            (pe) => pe.map((be) => be.mappingId === U.mappingId ? U : be)
          ), yn.success(`Updated mapping for ${Ce.characterName}`);
        } else if (_e.speakerVoiceAssetId) {
          const U = await Kh(t.deploymentId, {
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
          const pe = await Gs(t.deploymentId, U.mappingId, {
            characterName: Ce
          });
          u(
            (be) => be.map((ge) => ge.mappingId === pe.mappingId ? pe : ge)
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
          await v1(t.deploymentId, _e.mappingId), u((Ce) => Ce.filter((U) => U.mappingId !== _e.mappingId)), yn.success(`Cleared mapping for ${fe}`);
        } catch (Ce) {
          yn.error(Ce instanceof Error ? Ce.message : "clear failed");
        }
    },
    [ot, t.deploymentId]
  ), Ke = g.useCallback(
    async (fe, _e) => {
      try {
        const Ce = await Nc(
          t.deploymentId,
          _e,
          _e.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        p((U) => [Ce, ...U]), await ht(fe, { speakerVoiceAssetId: Ce.voiceAssetId });
      } catch (Ce) {
        yn.error(Ce instanceof Error ? Ce.message : "upload failed");
      }
    },
    [t.deploymentId, ht]
  ), ct = g.useCallback(
    (fe, _e) => {
      ht(_e, { speakerVoiceAssetId: fe.voiceAssetId });
    },
    [ht]
  ), At = g.useCallback((fe) => {
    S(fe);
  }, []), Ut = g.useMemo(() => {
    const fe = [], _e = /* @__PURE__ */ new Set();
    for (const Ce of o) {
      const U = Ce.speakerVoiceAssetId;
      if (!U || _e.has(U)) continue;
      _e.add(U);
      const be = f.find((ge) => ge.voiceAssetId === U)?.displayName ?? `${Ce.characterName} · ${U.slice(0, 8)}`;
      fe.push({ kind: "voice_asset", id: U, label: be });
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
        const U = await b1(fe.id, t.deploymentId, {
          chain: Ce
        }), pe = o.filter((be) => be.speakerVoiceAssetId === fe.id);
        await Promise.all(
          pe.map(
            (be) => Gs(t.deploymentId, be.mappingId, {
              voiceAssetChainDigest: U.chain_digest
            }).catch(() => null)
          )
        ), u(
          (be) => be.map(
            (ge) => ge.speakerVoiceAssetId === fe.id ? { ...ge, voiceAssetChainDigest: U.chain_digest } : ge
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
        await ER(fe.id, t.deploymentId);
        const _e = o.filter((Ce) => Ce.speakerVoiceAssetId === fe.id);
        await Promise.all(
          _e.map(
            (Ce) => Gs(t.deploymentId, Ce.mappingId, {
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
      globalEmotion: { ...Q, emotionAlpha: P.intensity },
      generation: M,
      cachePolicy: D,
      ...K === "storyboard" && J.length > 0 ? {
        prebuiltSegments: J.map(
          (fe) => fe.emotion ? { ...fe, emotion: { ...fe.emotion, emotionAlpha: P.intensity } } : fe
        )
      } : {}
    }),
    [_t, K, O, T, P.intensity, Q, M, D, J]
  ), Ot = g.useMemo(
    () => p$({
      script: _t,
      quickMode: A,
      defaultVoiceAssetId: W,
      characters: vt,
      unmappedCount: sn,
      globalEmotion: Q,
      performance: P
    }),
    [_t, A, W, vt, sn, Q, P]
  ), Tt = g.useMemo(
    () => Ot.filter((fe) => fe.id !== "performance").map((fe) => ({
      label: fe.label,
      status: fe.status === "ok" ? "ok" : fe.status === "warn" ? "warn" : "ok",
      detail: fe.detail
    })),
    [Ot]
  ), gt = K === "storyboard" && J.length > 0, Nn = _t.trim().length > 0 || gt;
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(wR, { position: "bottom-right", richColors: !0, theme: "dark" }),
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
        children: nt
      }
    ),
    /* @__PURE__ */ c.jsx(
      D$,
      {
        deployment: t,
        canGenerate: Nn,
        workflowCustomised: i.workflow.customised,
        unmappableFields: i.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(Z2, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          IO,
          {
            deploymentId: t.deploymentId,
            createPayload: pn,
            canGenerate: Nn,
            diagnostics: Tt
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          xO,
          {
            deploymentId: t.deploymentId,
            speedFactor: T
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          m$,
          {
            editorMode: K,
            onEditorModeChange: qe,
            deployment: t,
            script: R,
            onScriptChange: C,
            rows: G,
            onRowsChange: $,
            storyText: de,
            onStoryTextChange: Z,
            storyCharacters: vt,
            outputFormat: O,
            mappingsByLower: ot,
            defaultVoiceAssetId: W,
            onDefaultVoiceAssetIdChange: ae,
            presets: y,
            voiceAssets: f,
            onQueueChange: ce
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(y5, { lines: Mt, characterColors: Xt }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          l2,
          {
            deploymentId: t.deploymentId,
            voiceAssets: f,
            mappings: o,
            characterColors: Xt,
            onVoiceAssetsChange: p,
            onCreateCharacterFromVoice: ct
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(F2, { unmappedCount: sn, totalCount: vt.length, children: vt.map((fe) => {
          const _e = ot.get(fe.toLowerCase()) ?? null, Ce = Xt[fe] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: r_, children: /* @__PURE__ */ c.jsx(
            q2,
            {
              characterName: fe,
              color: Ce,
              lineCount: En[fe] ?? 0,
              mapping: _e,
              voiceAssets: f,
              presets: y,
              active: b === fe,
              onToggle: () => v((U) => U === fe ? null : fe),
              onAssignVoiceAsset: (U) => ht(fe, { speakerVoiceAssetId: U }),
              onAssignPreset: (U) => ht(fe, { defaultVectorPresetId: U }),
              onUploadFile: (U) => Ke(fe, U),
              onClearMapping: () => Le(fe),
              onRename: (U) => we(fe, U)
            }
          ) }, fe);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          q3,
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
            R5,
            {
              value: { ...P, pace: T },
              onChange: (fe) => {
                B(fe), fe.pace !== T && q(fe.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            Wh,
            {
              state: w,
              onChange: At,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(B5, { checks: Ot }),
          /* @__PURE__ */ c.jsx(
            o5,
            {
              outputFormat: O,
              onOutputFormatChange: _,
              speedFactor: T,
              onSpeedFactorChange: q,
              cachePolicy: D,
              onCachePolicyChange: F,
              generation: M,
              onGenerationChange: V
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(G5, { runs: s, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          E2,
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
const mx = /* @__PURE__ */ new Map();
function U$(t, a) {
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
    const o = `${t}::${a}`, u = mx.get(o);
    if (u) {
      i({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return i({ peaks: null, isLoading: !0, error: null }), B$(t, a, f.signal).then((p) => {
      f.signal.aborted || (mx.set(o, p), i({ peaks: p, isLoading: !1, error: null }));
    }).catch((p) => {
      if (f.signal.aborted) return;
      const y = p instanceof Error ? p.message : "decode failed";
      i({ peaks: null, isLoading: !1, error: y });
    }), () => f.abort();
  }, [t, a]), s;
}
async function B$(t, a, s) {
  const i = await fetch(t, { signal: s });
  if (!i.ok) throw new Error(`failed to load audio (${i.status})`);
  const o = await i.arrayBuffer();
  if (s.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return V$(f, a);
}
function V$(t, a) {
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
const px = "(prefers-reduced-motion: reduce)";
function I$() {
  const [t, a] = g.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(px).matches);
  return g.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const s = window.matchMedia(px), i = (o) => a(o.matches);
    return s.addEventListener("change", i), () => s.removeEventListener("change", i);
  }, []), t;
}
var H$ = "mquzal0", q$ = "mquzal1", gx = "mquzal2", vx = "mquzal3", yx = "mquzal4", F$ = "mquzal5", bx = "mquzal6", xx = "mquzal7";
const Y$ = 120, G$ = 720;
function bw(t) {
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
    width: b = G$,
    height: v = Y$
  } = t, w = g.useRef(null), S = g.useRef(null), j = g.useRef(null), N = U$(a, b), R = I$();
  g.useEffect(() => {
    P$(w.current, N.peaks, b, v);
  }, [N.peaks, b, v]);
  const C = g.useCallback(
    (M) => {
      const V = S.current?.getBoundingClientRect();
      if (!V || V.width <= 0) return 0;
      const D = Math.max(0, Math.min(1, (M - V.left) / V.width));
      return Math.round(D * s);
    },
    [s]
  );
  g.useEffect(() => {
    const M = (D) => {
      if (!j.current) return;
      const F = C(D.clientX);
      j.current === "start" ? u(lc(F, 0, o - 1)) : f(lc(F, i + 1, s));
    }, V = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", M), window.addEventListener("pointerup", V), () => {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", V);
    };
  }, [C, s, o, i, u, f]);
  const O = (M) => (V) => {
    V.preventDefault(), V.stopPropagation(), j.current = M;
  }, _ = (M) => {
    !m || M.target.closest("[data-handle]") || m(C(M.clientX));
  }, T = (M) => (V) => {
    const D = V.shiftKey ? 100 : V.ctrlKey ? 1 : 10;
    let F = 0;
    if (V.key === "ArrowLeft") F = -D;
    else if (V.key === "ArrowRight") F = D;
    else return;
    V.preventDefault(), M === "start" ? u(lc(i + F, 0, o - 1)) : f(lc(o + F, i + 1, s));
  }, q = Pf(i, s), Q = Pf(o, s), re = Pf(y, s);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: S,
      className: H$,
      style: { height: v },
      onPointerDown: _,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: w,
            width: b,
            height: v,
            className: q$,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ c.jsx("div", { className: xx, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ c.jsx("div", { className: xx, role: "alert", children: N.error }),
        /* @__PURE__ */ c.jsx("div", { className: bx, style: { left: 0, width: `${q}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: bx,
            style: { left: `${Q}%`, right: 0, width: `${100 - Q}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: gx,
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
              /* @__PURE__ */ c.jsx("span", { className: vx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: yx, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: gx,
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
              /* @__PURE__ */ c.jsx("span", { className: vx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: yx, "aria-hidden": "true" })
            ]
          }
        ),
        p && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: F$,
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
function P$(t, a, s, i) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, s, i), !a || a.length === 0)) return;
  const u = i / 2;
  o.fillStyle = K$(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, s);
  for (let p = 0; p < f; p += 1) {
    const y = a[p] ?? 0, m = Math.max(1, y * (i - 4));
    o.fillRect(p, u - m / 2, 1, m);
  }
}
function K$(t, a, s) {
  return getComputedStyle(t).getPropertyValue(a).trim() || s;
}
var X$ = "r8lfsm0", Q$ = "r8lfsm1", Z$ = "r8lfsm2", J$ = "r8lfsm3", W$ = "r8lfsm4", eU = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, tU = "_1b1zchy3", nU = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, aU = "_1b1zchy6", rU = "_1b1zchy7";
const xw = g.createContext("standalone");
function Sw({
  variant: t = "standalone",
  children: a,
  className: s,
  style: i,
  ...o
}) {
  const u = [eU[t], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(xw.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: i, ...o, children: a }) });
}
function ww({
  title: t,
  meta: a,
  children: s,
  className: i,
  titleId: o
}) {
  const u = g.useContext(xw), f = [tU, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: nU[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: aU, children: a }) : null,
    s
  ] });
}
function jw({
  children: t,
  className: a,
  role: s = "group"
}) {
  const i = [rU, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, role: s, children: t });
}
const Sx = -16, sU = 80, iU = 720;
function lU(t) {
  const { deploymentId: a, runId: s, utterance: i, audioUrl: o, onApplied: u, onError: f, onCancel: p } = t, y = i.durationMs ?? 0, [m, b] = g.useState(() => wx(y)), [v, w] = g.useState(Gc), [S, j] = g.useState(!1), [N, R] = g.useState(!1), [C, O] = g.useState(null), [_, T] = g.useState(!1), q = g.useRef(null), Q = g.useRef(null), re = g.useRef(null);
  g.useEffect(() => {
    const $ = wx(y);
    b($), w(A1($)), R(!1), O(null), re.current = null;
  }, [i.utteranceId, y]);
  const M = g.useCallback(($) => {
    w($), b((se) => M1(se, $));
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
  ), D = g.useMemo(
    () => m.ops.find(($) => $.mode === "trim"),
    [m.ops]
  ), F = D?.start_ms ?? 0, W = D?.end_ms ?? Math.max(1, y), ae = g.useCallback(($, se) => {
    b((de) => oU(de, "trim", (k) => ({
      ...k,
      mode: "trim",
      start_ms: Math.max(0, Math.floor($)),
      end_ms: Math.max(Math.floor($) + 1, Math.floor(se))
    })));
  }, []), K = g.useCallback(($) => ae($, W), [W, ae]), le = g.useCallback(($) => ae(F, $), [F, ae]), A = g.useCallback(($) => {
    R($), b((se) => {
      const de = se.ops.filter((k) => k.mode !== "normalize");
      if ($) {
        const k = {
          id: zn(),
          mode: "normalize",
          target_lufs: Sx
        };
        return { ...se, ops: [...de, k] };
      }
      return { ...se, ops: de };
    });
  }, []), G = g.useCallback(async () => {
    const $ = x1(m, y);
    if ($) {
      O($.message);
      return;
    }
    if (O(null), _) return;
    Q.current?.abort();
    const se = new AbortController();
    Q.current = se, T(!0);
    try {
      const de = re.current ?? void 0, k = await jR(
        a,
        s,
        i.utteranceId,
        de ? { chain: m, digest_before: de } : { chain: m },
        { signal: se.signal }
      );
      if (se.signal.aborted) return;
      re.current = k.chain_digest, u(k);
    } catch (de) {
      if (se.signal.aborted) return;
      de instanceof Zs && (re.current = de.currentDigest || null);
      const k = de instanceof Zs ? "Edit chain has changed in another tab. Reload to continue." : de instanceof Error ? de.message : "apply failed";
      O(k), f(k);
    } finally {
      se.signal.aborted || T(!1);
    }
  }, [m, y, _, a, s, i.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(Sw, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: q, onKeyDown: V, children: [
    /* @__PURE__ */ c.jsx(ww, { title: "Edit segment", meta: `Source · ${oc(y)}` }),
    /* @__PURE__ */ c.jsx(
      bw,
      {
        audioUrl: o,
        durationMs: Math.max(1, y),
        startMs: F,
        endMs: W,
        onChangeStart: K,
        onChangeEnd: le,
        height: sU,
        width: iU
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: X$, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: Q$, children: [
        oc(F),
        " → ",
        oc(W),
        " · ",
        oc(W - F)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Z$, children: [
      /* @__PURE__ */ c.jsxs("label", { className: J$, children: [
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
          Sx.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: W$,
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
      Wh,
      {
        state: v,
        onChange: M,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(jw, { children: [
      /* @__PURE__ */ c.jsx(Ye, { size: "sm", onClick: () => void G(), disabled: _, children: _ ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(Ye, { variant: "ghost", size: "sm", onClick: p, disabled: _, children: "Cancel" })
    ] }),
    C && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: C })
  ] }) });
}
function wx(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: zn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function oU(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: zn(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function oc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var cU = "jq2zyb2", uU = "jq2zyb3", dU = "jq2zyb4", fU = "jq2zyb5", hU = "jq2zyb6", mU = "jq2zyb7", pU = "jq2zyb8", gU = "jq2zyb9", vU = "jq2zyba", yU = "jq2zybb", bU = "jq2zybc", xU = "jq2zybd", SU = "jq2zybe", wU = "jq2zybf jq2zybe", jU = "jq2zybg", EU = "jq2zybh", NU = "jq2zybi", CU = "jq2zybj", TU = "jq2zybk", RU = "jq2zybl", _U = "jq2zybm", MU = "jq2zybn", AU = "jq2zybo", kU = "jq2zybp", DU = "jq2zybq", zU = "jq2zybr", OU = "jq2zybs", LU = "jq2zybt", $U = "jq2zybu", UU = "jq2zybv", BU = "jq2zybw", VU = "jq2zybx", IU = "jq2zyby", jx = "jq2zybz", HU = "jq2zyb10", qU = "jq2zyb11", FU = "jq2zyb12";
const YU = ["cancelled", "failed", "partial"], GU = 2600;
function PU() {
  const { run: t } = Tl(), a = ti(), [s, i] = g.useState(t), [o, u] = g.useState(!1), [f, p] = g.useState(null), [y, m] = g.useState(null), [b, v] = g.useState(
    null
  );
  g.useEffect(() => {
    i(t);
  }, [t]), g.useEffect(() => {
    if (!b) return;
    const T = setTimeout(() => v(null), GU);
    return () => clearTimeout(T);
  }, [b]);
  const w = g.useMemo(() => QU(s), [s]), S = YU.includes(s.status) && s.kind === "batch", j = (s.exportZipStaleAt ?? null) !== null, N = async () => {
    if (s.deploymentId) {
      u(!0), p(null);
      try {
        const { runId: T } = await y1(s.deploymentId, s.runId);
        a(`/${s.deploymentId}/runs/${T}`);
      } catch (T) {
        p(WU(T));
      } finally {
        u(!1);
      }
    }
  }, R = g.useCallback((T) => {
    m((q) => q === T ? null : T);
  }, []), C = g.useCallback(() => {
    m(null);
  }, []), O = (T, q) => {
    i((Q) => XU(Q, T, q)), m(null), v({ message: "Segment edited", severity: "success" });
  }, _ = g.useCallback((T) => {
    v({ message: T, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: cU, children: [
    /* @__PURE__ */ c.jsxs("div", { className: uU, children: [
      /* @__PURE__ */ c.jsxs("header", { className: dU, children: [
        /* @__PURE__ */ c.jsxs("p", { className: fU, children: [
          s.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Ph, { to: `/${s.deploymentId}/recipe`, className: hU, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: mU, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: pU, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: gU, children: [
            ZU(s.kind),
            /* @__PURE__ */ c.jsx("span", { className: vU, children: s.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Wr, { size: "md", tone: eB(s.status), pulse: s.status === "running", children: s.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: yU, "aria-label": "Run statistics", children: [
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
      S && /* @__PURE__ */ c.jsxs("section", { className: EU, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: NU, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: CU, children: w.failed > 0 ? `${w.failed} line${w.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: TU, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(Ye, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : w.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: RU, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs(Va, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(_T, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Qr, children: "01 / Utterances" }),
          w.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: _U, children: [
            /* @__PURE__ */ c.jsx("span", { className: MU, children: w.cached }),
            "/",
            w.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: AU, children: s.utterances.map((T) => {
          const q = y === T.utteranceId, Q = T.status === "completed" && T.audioArtifactRef !== null && T.audioArtifactRef !== void 0, re = T.derivedArtifactRef ?? T.audioArtifactRef ?? null, M = re ? `/api/v1/artifacts/${encodeURIComponent(re)}/download` : "", V = (T.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: DU, children: [
            /* @__PURE__ */ c.jsxs("div", { className: kU, children: [
              /* @__PURE__ */ c.jsxs("span", { className: OU, children: [
                "#",
                T.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: LU, title: T.characterDisplay, children: T.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: $U, title: T.text, children: T.text }),
              /* @__PURE__ */ c.jsxs("span", { className: UU, children: [
                T.cacheHit && /* @__PURE__ */ c.jsx("span", { className: BU, children: "cached" }),
                V && /* @__PURE__ */ c.jsx("span", { className: zU, children: "edited" }),
                T.durationMs ? /* @__PURE__ */ c.jsx("span", { children: JU(T.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Wr, { tone: tB(T.status), children: T.status }),
                Q && /* @__PURE__ */ c.jsx(
                  Ye,
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
            q && M && s.deploymentId && /* @__PURE__ */ c.jsx(
              lU,
              {
                deploymentId: s.deploymentId,
                runId: s.runId,
                utterance: T,
                audioUrl: M,
                onApplied: (D) => O(T.utteranceId, D),
                onError: _,
                onCancel: C
              }
            )
          ] }, T.utteranceId);
        }) })
      ] }),
      KU(s, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: FU,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function KU(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const i = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: VU, children: a ? /* @__PURE__ */ c.jsxs("div", { className: HU, children: [
    /* @__PURE__ */ c.jsx("p", { className: qU, children: i }),
    /* @__PURE__ */ c.jsxs(
      Ye,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ c.jsx("span", { className: jx, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: IU,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: jx, children: "↓" })
      ]
    }
  ) : null });
}
function XU(t, a, s) {
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
      className: bU,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: xU, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: s ? wU : SU, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: jU, "aria-hidden": "true" })
      ]
    }
  );
}
function QU(t) {
  const a = t.utterances.length, s = t.utterances.filter((f) => f.status === "completed").length, i = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = s > 0 ? Math.round(o / s * 100) : 0;
  return { total: a, completed: s, failed: i, cached: o, cacheRatio: u };
}
function ZU(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function JU(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function WU(t) {
  return t instanceof ni ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function eB(t) {
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
function tB(t) {
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
var nB = "pcphqj2", aB = "pcphqj3", rB = "pcphqj4", sB = "pcphqj5", iB = "pcphqj6", lB = "pcphqj7", oB = "pcphqj8", cB = "pcphqj9", uB = "pcphqja", Ex = "pcphqjb", dB = "pcphqjc", fB = "pcphqjd", hB = "pcphqje pcphqjd", mB = "pcphqjf", pB = "pcphqjg", gB = "pcphqjh", vB = "pcphqji", yB = "pcphqjj pcphqji", bB = "pcphqjk pcphqji", xB = "pcphqjl pcphqji", SB = "pcphqjm", Kf = "pcphqjn", Xf = "pcphqjo";
function wB() {
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
  }, []), /* @__PURE__ */ c.jsx("main", { className: nB, children: /* @__PURE__ */ c.jsxs("div", { className: aB, children: [
    /* @__PURE__ */ c.jsxs("header", { className: rB, children: [
      /* @__PURE__ */ c.jsx("p", { className: sB, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: iB, children: [
        /* @__PURE__ */ c.jsx("h1", { className: lB, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: oB, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: cB, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    s ? /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: s }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Va, { density: "compact", children: /* @__PURE__ */ c.jsx(Fc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Va, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Qr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: uB, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${Ex} ${dB}` : Ex,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? hB : fB, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: mB, children: [
                /* @__PURE__ */ c.jsx("span", { className: pB, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: gB, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: jB(o.kind), children: EB(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: SB, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Kf, children: NB(o.etaSeconds) }),
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
function jB(t) {
  switch (t) {
    case "batch":
      return yB;
    case "test_line":
      return bB;
    case "resume":
      return xB;
    default:
      return vB;
  }
}
function EB(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function NB(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), s = t % 60;
  return s === 0 ? `${a}m` : `${a}m ${s}s`;
}
function CB() {
  const { deploymentId: t, prefillCharacterName: a } = Tl(), s = ti(), [i, o] = g.useState(a), [u, f] = g.useState(""), [p, y] = g.useState("none"), [m, b] = g.useState(!1), [v, w] = g.useState(null), S = g.useRef(null);
  g.useEffect(() => {
    S.current?.scrollIntoView({ behavior: "smooth", block: "center" }), S.current?.focus();
  }, []);
  const j = async (N) => {
    N.preventDefault(), b(!0), w(null);
    try {
      await Kh(t, {
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
      /* @__PURE__ */ c.jsx(Ye, { type: "submit", variant: "primary", disabled: m, children: "Save mapping" }),
      v && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: v })
    ] })
  ] });
}
var TB = "_1oor31e0", RB = "_1oor31e1", _B = "_1oor31e2", MB = "_1oor31e3", AB = "_1oor31e4", kB = "_1oor31e5", DB = "_1oor31e6", zB = "_1oor31e7", OB = "_1oor31e8";
const LB = 8;
function $B(t) {
  const { entries: a, loading: s, error: i } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: TB, "aria-busy": !!s, children: [
    i && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: i }),
    s && !i && /* @__PURE__ */ c.jsx("div", { className: OB, "aria-live": "polite", children: "Loading edit history…" }),
    !s && !i && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: zB, children: "No edits yet" }),
    !s && !i && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: RB, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: _B, children: [
      /* @__PURE__ */ c.jsx("span", { className: MB, children: BB(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: AB, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: kB, title: o.digest_after, children: UB(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: DB, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function UB(t) {
  return t ? `${t.slice(0, LB)}…` : "—";
}
function BB(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var Nx = "_1c63kaw0", VB = "_1c63kaw1", IB = "_1c63kaw2", HB = "_1c63kaw3", qB = "_1c63kaw4", FB = "_1c63kaw5", YB = "_1c63kaw6";
function GB({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: Nx, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: VB, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: Nx, "data-testid": "edit-chain-list", children: t.ops.map((s, i) => /* @__PURE__ */ c.jsxs("li", { className: IB, children: [
    /* @__PURE__ */ c.jsxs("span", { className: HB, "aria-hidden": "true", children: [
      i + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: qB, children: [
      /* @__PURE__ */ c.jsx("span", { className: FB, children: Cx(s) }),
      /* @__PURE__ */ c.jsx("span", { className: YB, children: PB(s) })
    ] }),
    /* @__PURE__ */ c.jsx(
      Ye,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(s.id),
        "aria-label": `Remove ${Cx(s)} (position ${i + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, s.id)) });
}
function Cx(t) {
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
function PB(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Tx(t.start_ms)} → ${Tx(t.end_ms)}`;
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
function Tx(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var uc = "_1o3ytop0", Zf = "_1o3ytop1", Rx = "_1o3ytop2", KB = "_1o3ytop3", XB = "_1o3ytop4", QB = "_1o3ytop5", ZB = "_1o3ytop6", JB = "_1o3ytop7", dc = "_1o3ytop8", WB = "_1o3ytop9", e9 = "_1o3ytopf", t9 = "_1o3ytopg", n9 = "_1o3ytoph", a9 = "_1o3ytopi", r9 = "_1o3ytopj", s9 = "_1o3ytopk", i9 = "_1t0zy2f0", l9 = "_1t0zy2f1", o9 = "_1t0zy2f2";
function c9({ content: t, children: a, delayMs: s = 350 }) {
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
  return /* @__PURE__ */ c.jsxs("span", { className: i9, children: [
    g.cloneElement(a, b),
    i && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: o9, children: t })
  ] });
}
function fc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(c9, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: l9, children: "?" }) });
}
const _x = -16;
function u9(t) {
  const {
    voiceAsset: a,
    deploymentId: s,
    affectedCharacterNames: i = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, p = g.useMemo(
    () => d9(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [y, m] = g.useState(() => Jf(f)), [b, v] = g.useState(Gc), [w, S] = g.useState(!1), [j, N] = g.useState(null), [R, C] = g.useState(null), [O, _] = g.useState(!1), [T, q] = g.useState(!1), [Q, re] = g.useState(!1), [M, V] = g.useState(null), [D, F] = g.useState([]), [W, ae] = g.useState(null), [K, le] = g.useState([]), [A, G] = g.useState(!1), [$, se] = g.useState(null), [de, k] = g.useState(0), H = g.useRef(null), Z = g.useRef(null), P = g.useRef(null), B = g.useRef(null), J = g.useRef(null), ce = g.useRef(0), ye = g.useMemo(
    () => y.ops.some((we) => we.mode === "normalize"),
    [y.ops]
  );
  g.useEffect(() => {
    const we = Jf(f);
    m(we), v(A1(we)), N(null), re(!1), F([]), ae(null), J.current = null;
  }, [a.voiceAssetId, f]);
  const Re = g.useCallback((we) => {
    v(we), m((Le) => M1(Le, we));
  }, []);
  g.useEffect(() => {
    B.current?.abort();
    const we = new AbortController();
    return B.current = we, G(!0), se(null), vc(s, "voice_asset", a.voiceAssetId, 50, {
      signal: we.signal
    }).then((Le) => {
      we.signal.aborted || le(Le.entries);
    }).catch((Le) => {
      if (we.signal.aborted) return;
      const Ke = Le instanceof Error ? Le.message : "audit fetch failed";
      se(Ke);
    }).finally(() => {
      we.signal.aborted || G(!1);
    }), () => we.abort();
  }, [s, a.voiceAssetId, de]), g.useEffect(() => () => {
    R && URL.revokeObjectURL(R);
  }, [R]), g.useEffect(() => () => {
    Z.current?.abort(), P.current?.abort(), B.current?.abort();
  }, []);
  const Ge = y.ops.find((we) => we.mode === "trim"), Ne = y.ops.find((we) => we.mode === "normalize"), nt = Ge?.start_ms ?? 0, Ie = Ge?.end_ms ?? Math.max(1, f), qe = g.useCallback((we, Le) => {
    m(
      (Ke) => Mx(
        Ke,
        "trim",
        (ct) => ({
          ...ct,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(we)),
          end_ms: Math.max(Math.floor(we) + 1, Math.floor(Le))
        })
      )
    );
  }, []), Kt = g.useCallback(
    (we) => qe(we, Ie),
    [Ie, qe]
  ), _t = g.useCallback(
    (we) => qe(nt, we),
    [nt, qe]
  ), Mt = g.useCallback((we) => {
    m((Le) => {
      const Ke = Le.ops.filter((ct) => ct.mode !== "normalize");
      if (we) {
        const ct = {
          id: zn(),
          mode: "normalize",
          target_lufs: _x
        };
        return { ...Le, ops: [...Ke, ct] };
      }
      return { ...Le, ops: Ke };
    });
  }, []), mn = g.useCallback(
    (we) => {
      const Le = y.ops.findIndex((At) => At.id === we);
      if (Le === -1) return;
      const Ke = y.ops[Le];
      if (!Ke) return;
      const ct = [...y.ops.slice(0, Le), ...y.ops.slice(Le + 1)];
      m({ ...y, ops: ct }), F((At) => [...At, { op: Ke, index: Le }]);
    },
    [y]
  ), vt = g.useCallback(() => {
    const we = D[D.length - 1];
    if (!we) return;
    const Le = Math.min(we.index, y.ops.length), Ke = [...y.ops.slice(0, Le), we.op, ...y.ops.slice(Le)];
    m({ ...y, ops: Ke }), F(D.slice(0, -1));
  }, [y, D]), Xt = g.useCallback(() => {
    const we = x1(y, f);
    return we ? (N(we.message), !1) : (N(null), !0);
  }, [y, f]), En = g.useCallback(async () => {
    if (!Xt() || O) return;
    Z.current?.abort();
    const we = new AbortController();
    Z.current = we;
    const Le = ++ce.current;
    q(!0);
    try {
      const Ke = await NR(a.voiceAssetId, s, y, {
        signal: we.signal
      });
      if (we.signal.aborted || Le !== ce.current) return;
      R && URL.revokeObjectURL(R);
      const ct = URL.createObjectURL(Ke);
      C(ct), re(!0), requestAnimationFrame(() => H.current?.play().catch(() => {
      }));
    } catch (Ke) {
      if (we.signal.aborted) return;
      const ct = Ke instanceof Error ? Ke.message : "preview failed";
      N(ct), u(ct);
    } finally {
      we.signal.aborted || q(!1);
    }
  }, [Xt, O, a.voiceAssetId, s, y, R, u]), ot = g.useCallback(async () => {
    if (!Xt() || T || O) return;
    if (i.length > 1) {
      const Le = i.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${i.length} characters: ${Le}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    Z.current?.abort(), P.current?.abort();
    const we = new AbortController();
    P.current = we, _(!0);
    try {
      const Le = J.current ?? void 0, Ke = await b1(
        a.voiceAssetId,
        s,
        Le ? { chain: y, digest_before: Le } : { chain: y },
        { signal: we.signal }
      );
      if (we.signal.aborted) return;
      J.current = Ke.chain_digest, ae(Ke.chain_digest), N(null), V(Ke.measured_lufs ?? null), F([]), o(Ke), k((ct) => ct + 1);
    } catch (Le) {
      if (we.signal.aborted) return;
      const Ke = Le instanceof Zs;
      Le instanceof Zs && (J.current = Le.currentDigest || null);
      const ct = Ke ? "Edit chain has changed in another tab. Reload to continue." : Le instanceof Error ? Le.message : "apply failed";
      N(ct), u(ct);
    } finally {
      we.signal.aborted || _(!1);
    }
  }, [
    Xt,
    T,
    O,
    i,
    a.voiceAssetId,
    s,
    y,
    o,
    u
  ]), sn = g.useCallback(() => {
    Z.current?.abort(), m(Jf(f)), N(null), V(null), re(!1), F([]), k((we) => we + 1), R && (URL.revokeObjectURL(R), C(null));
  }, [f, R]), ht = g.useCallback((we) => {
    m(
      (Le) => Mx(
        Le,
        "normalize",
        (Ke) => ({
          ...Ke,
          mode: "normalize",
          target_lufs: we
        })
      )
    );
  }, []);
  return /* @__PURE__ */ c.jsxs(Sw, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      ww,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${hc(f)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      bw,
      {
        audioUrl: p,
        durationMs: Math.max(1, f),
        startMs: nt,
        endMs: Ie,
        onChangeStart: Kt,
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
      /* @__PURE__ */ c.jsxs("span", { className: Rx, children: [
        hc(nt),
        " → ",
        hc(Ie),
        " · ",
        hc(Ie - nt)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: JB, children: [
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
          ye && Ne && /* @__PURE__ */ c.jsxs("span", { className: e9, children: [
            "target ",
            Ne.target_lufs.toFixed(1),
            " LUFS",
            M !== null && ` · measured ${M.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: WB, children: [
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
            _x.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        ye && Ne && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: n9,
            min: -30,
            max: -6,
            step: 0.5,
            value: Ne.target_lufs,
            onChange: (we) => ht(Number(we.currentTarget.value)),
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
          /* @__PURE__ */ c.jsx("span", { className: Rx, children: y.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(GB, { chain: y, onRemoveOp: mn })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: dc, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: KB,
            onClick: () => S((we) => !we),
            "aria-expanded": w,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: XB, "aria-hidden": "true", children: w ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: QB, children: "gain · EQ · pitch · fade · silence trim" }),
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
          Wh,
          {
            state: b,
            onChange: Re,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      W && /* @__PURE__ */ c.jsx("div", { className: dc, children: /* @__PURE__ */ c.jsxs("span", { className: uc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: ZB, title: W, children: [
          W.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(jw, { children: [
      /* @__PURE__ */ c.jsx(
        Ye,
        {
          variant: "secondary",
          onClick: () => void En(),
          disabled: T || O,
          children: T ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ye,
        {
          onClick: () => void ot(),
          disabled: O || T,
          children: O ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ye,
        {
          variant: "ghost",
          onClick: sn,
          disabled: O || T,
          children: "Reset"
        }
      ),
      D.length > 0 && /* @__PURE__ */ c.jsxs(
        Ye,
        {
          variant: "ghost",
          size: "sm",
          onClick: vt,
          disabled: O || T,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            D.length,
            ")"
          ]
        }
      ),
      Q && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: s9,
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
        className: t9,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: a9, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: r9, children: [
        "Edit history",
        K.length > 0 ? ` · ${K.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        $B,
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
    id: zn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Mx(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: zn(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function hc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function d9(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var f9 = "go9vi12", h9 = "go9vi13", m9 = "go9vi14", p9 = "go9vi15", g9 = "go9vi16", v9 = "go9vi17", y9 = "go9vi18", b9 = "go9vi19", x9 = "go9vi1a", S9 = "go9vi1b go9vi1a", w9 = "go9vi1c", j9 = "go9vi1d", E9 = "go9vi1e", N9 = "go9vi1f", C9 = "go9vi1g", T9 = "go9vi1h", R9 = "go9vi1i", _9 = "go9vi1j", Ax = "go9vi1k", M9 = "go9vi1l", A9 = "go9vi1m", k9 = "go9vi1n", Uc = "go9vi1o", D9 = "go9vi1q", z9 = "go9vi1r go9vi1q", O9 = "go9vi1s go9vi1q", L9 = "go9vi1t", $9 = "go9vi1u", U9 = "go9vi1v", B9 = "go9vi1w", Ew = "go9vi1x", V9 = "go9vi1y", I9 = "go9vi1z", H9 = "go9vi110 go9vi1o", q9 = "go9vi111", F9 = "go9vi112", Y9 = "go9vi113", G9 = "go9vi114", P9 = "go9vi115", K9 = "go9vi116";
function X9() {
  const { deployment: t, mappings: a, voiceAssets: s } = Tl(), i = ti(), [o, u] = g.useState(a), [f, p] = g.useState(s), [y, m] = g.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = g.useState(""), [w, S] = g.useState(null), [j, N] = g.useState(null), [R, C] = g.useState(null), [O, _] = g.useState(null), [T, q] = g.useState(0), Q = g.useCallback(() => {
    i(`/${t.deploymentId}/recipe`);
  }, [i, t.deploymentId]), re = g.useCallback((P) => {
    _(P), window.setTimeout(() => {
      _((B) => B === P ? null : B);
    }, 1600);
  }, []), M = g.useMemo(() => {
    const P = /* @__PURE__ */ new Map();
    for (const B of f) P.set(B.voiceAssetId, B);
    return P;
  }, [f]), V = g.useMemo(() => {
    const P = b.trim().toLowerCase();
    return P ? o.filter((B) => B.characterName.toLowerCase().includes(P)) : o;
  }, [o, b]), D = g.useMemo(
    () => o.find((P) => P.mappingId === y) ?? null,
    [o, y]
  );
  g.useEffect(() => {
    u(a), p(s), m(a[0]?.mappingId ?? null);
  }, [a, s]), g.useEffect(() => {
    if (!j) return;
    const P = setTimeout(() => N(null), 2600);
    return () => clearTimeout(P);
  }, [j]);
  const F = g.useCallback(async () => {
    const P = await Qs(t.deploymentId);
    p(P.voiceAssets);
  }, [t.deploymentId]), W = g.useCallback(
    (P) => {
      u(
        (B) => B.map((J) => J.mappingId === y ? { ...J, ...P } : J)
      );
    },
    [y]
  ), ae = g.useCallback(
    async (P) => {
      if (!D) return;
      const B = D;
      try {
        const J = await Gs(t.deploymentId, D.mappingId, P);
        u((ce) => ce.map((ye) => ye.mappingId === J.mappingId ? J : ye)), Object.prototype.hasOwnProperty.call(P, "characterName") && re(J.mappingId);
      } catch (J) {
        u(
          (ce) => ce.map((ye) => ye.mappingId === B.mappingId ? B : ye)
        ), S(gr(J));
      }
    },
    [D, t.deploymentId, re]
  ), K = g.useCallback(async () => {
    const P = f[0];
    if (!P) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const B = n7(o), J = await Kh(t.deploymentId, {
        characterName: B,
        speakerVoiceAssetId: P.voiceAssetId
      });
      u((ce) => [...ce, J]), m(J.mappingId), q((ce) => ce + 1);
    } catch (B) {
      S(gr(B));
    }
  }, [t.deploymentId, f, o]), le = g.useCallback(() => {
    D && C({ id: D.mappingId, name: D.characterName });
  }, [D]), A = g.useCallback(async () => {
    if (!R) return;
    const { id: P, name: B } = R;
    C(null);
    try {
      await v1(t.deploymentId, P), u((J) => J.filter((ce) => ce.mappingId !== P)), m(null), N(`Mapping for ${B} deactivated.`);
    } catch (J) {
      S(gr(J));
    }
  }, [t.deploymentId, R]), G = g.useCallback(
    async (P, B, J) => {
      try {
        const ce = await Nc(t.deploymentId, P, B, J);
        return p((ye) => [ce, ...ye]), N(`${ce.displayName} uploaded.`), ce;
      } catch (ce) {
        return S(gr(ce)), null;
      }
    },
    [t.deploymentId]
  ), $ = g.useCallback(async () => {
    try {
      const P = await dT(t.deploymentId);
      l7(P, `${t.deploymentId}-mappings.json`), N("Mappings exported to JSON.");
    } catch (P) {
      S(gr(P));
    }
  }, [t.deploymentId]), se = g.useCallback(
    async (P, B) => {
      try {
        const J = await fT(
          t.deploymentId,
          P.mappings,
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
    async (P) => {
      if (await F(), D && P.chain_digest)
        try {
          const B = await Gs(t.deploymentId, D.mappingId, {
            voiceAssetChainDigest: P.chain_digest
          });
          u(
            (J) => J.map((ce) => ce.mappingId === B.mappingId ? B : ce)
          );
        } catch (B) {
          S(gr(B));
        }
      N("Edit applied.");
    },
    [F, D, t.deploymentId]
  ), k = g.useCallback((P) => {
    S(P);
  }, []), H = g.useCallback(
    async (P, B) => {
      if (!D) return null;
      const J = P.trim() || `[${D.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await gT(t.deploymentId, {
          line: J,
          outputFormat: B
        })).runId };
      } catch (ce) {
        return S(gr(ce)), null;
      }
    },
    [t.deploymentId, D]
  ), Z = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: f9, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: h9, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: m9,
          onClick: Q,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: p9, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: g9, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: v9, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            Z
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(Ye, { variant: "primary", size: "sm", onClick: K, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: y9,
          placeholder: "Search characters",
          value: b,
          onChange: (P) => v(P.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(t7, { onExport: $, onImport: se, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: b9, children: V.length === 0 ? /* @__PURE__ */ c.jsx(
        Fc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : V.map((P) => {
        const B = M.get(P.speakerVoiceAssetId), J = P.mappingId === y;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: J ? S9 : x9,
            onClick: () => m(P.mappingId),
            "aria-pressed": J,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: w9, "aria-hidden": "true", children: a7(P.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: j9, children: [
                /* @__PURE__ */ c.jsx("span", { className: E9, children: P.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: N9, children: B?.displayName ?? "no voice" })
              ] })
            ]
          },
          P.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: C9, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(xm, { features: Em, children: /* @__PURE__ */ c.jsx(XS, { children: j && /* @__PURE__ */ c.jsx(
        jm.div,
        {
          className: V9,
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
        /* @__PURE__ */ c.jsx(Ye, { variant: "danger", size: "sm", onClick: () => void A(), children: "Delete" }),
        /* @__PURE__ */ c.jsx(Ye, { variant: "ghost", size: "sm", onClick: () => C(null), children: "Cancel" })
      ] }),
      D ? /* @__PURE__ */ c.jsx(
        Z9,
        {
          deploymentId: t.deploymentId,
          mapping: D,
          voiceAssets: f,
          allMappings: o,
          onNameChange: (P) => {
            W({ characterName: P });
          },
          onNameSave: (P) => {
            const B = P.trim();
            B && ae({ characterName: B });
          },
          savedHint: O === D.mappingId,
          autoFocusNonce: T,
          onSpeakerChange: (P) => {
            W({ speakerVoiceAssetId: P }), ae({ speakerVoiceAssetId: P });
          },
          onDelete: le,
          onUploadVoice: async (P, B, J) => {
            const ce = await G(P, B, J);
            return ce && J === "speaker" && (W({ speakerVoiceAssetId: ce.voiceAssetId }), ae({ speakerVoiceAssetId: ce.voiceAssetId })), await F(), ce;
          },
          onTestLine: H,
          onEditChainPersisted: de,
          onEditError: k
        },
        D.mappingId
      ) : /* @__PURE__ */ c.jsx(
        Q9,
        {
          voiceCount: f.length,
          onUploadVoice: async (P) => {
            await G(P, P.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function Q9({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Va, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: Y9, children: [
      /* @__PURE__ */ c.jsx("p", { className: Qr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: G9, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: P9, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      Nw,
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
function Z9(t) {
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
    for (let _ = 0; _ < 60; _ += 1) {
      if (await new Promise((T) => setTimeout(T, 500)), j.current) return;
      try {
        const T = await Xh(t.deploymentId, O);
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
    /* @__PURE__ */ c.jsxs("header", { className: T9, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Qr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: R9, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: Ew, children: /* @__PURE__ */ c.jsx(Ye, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Va,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: I9,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: H9,
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
            Ye,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void R(),
              disabled: b === "running",
              children: b === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          b === "done" && /* @__PURE__ */ c.jsx(Wr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          b === "error" && w && /* @__PURE__ */ c.jsx(Wr, { tone: "danger", children: w })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: _9, children: [
      /* @__PURE__ */ c.jsxs(Va, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Qr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: k9, children: [
          /* @__PURE__ */ c.jsxs("span", { className: M9, children: [
            /* @__PURE__ */ c.jsx("span", { className: Ax, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: A9,
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
        /* @__PURE__ */ c.jsx("h3", { id: "voice-heading", className: Qr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ c.jsx("span", { className: Ax, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          J9,
          {
            value: a.speakerVoiceAssetId,
            voices: s,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(W9, { voice: o }),
        /* @__PURE__ */ c.jsx(
          Nw,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (C) => t.onUploadVoice(C, C.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          u9,
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
function J9({
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
function W9({ voice: t }) {
  const a = r7(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: L9, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: s7(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: $9, children: [
      /* @__PURE__ */ c.jsx("div", { className: U9, children: /* @__PURE__ */ c.jsx(xm, { features: Em, children: /* @__PURE__ */ c.jsx(
        jm.div,
        {
          className: B9,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Wr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(e7, { seed: t.contentSha256 })
  ] });
}
function e7({ seed: t }) {
  const a = g.useMemo(() => i7(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: q9, "aria-hidden": "true", children: a.map((s, i) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: F9,
      style: { height: `${Math.max(6, s * 100)}%` }
    },
    `${t}-${i}`
  )) });
}
function Nw({
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
      className: o ? O9 : s ? z9 : D9,
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
function t7({
  onExport: t,
  onImport: a,
  onParseError: s
}) {
  const [i, o] = g.useState("error"), u = g.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: Ew, children: [
    /* @__PURE__ */ c.jsx(Ye, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: K9,
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
    /* @__PURE__ */ c.jsx(Ye, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
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
function n7(t) {
  const a = new Set(t.map((i) => i.characterName.toLowerCase()));
  let s = 1;
  for (; a.has(`character ${s}`); ) s += 1;
  return `Character ${s}`;
}
function a7(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function r7(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function s7(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function i7(t, a) {
  const s = [];
  for (let i = 0; i < a; i += 1) {
    const o = t.charCodeAt(i % t.length);
    s.push((o * 31 + i * 7) % 100 / 100);
  }
  return s;
}
function l7(t, a) {
  const s = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), i = URL.createObjectURL(s), o = document.createElement("a");
  o.href = i, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i);
}
function gr(t) {
  return t instanceof ni || t instanceof Error ? t.message : "unknown error";
}
function o7() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await cT();
        return { deployments: t };
      },
      Component: PT
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Is(t, "deploymentId");
        return vN(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Is(t, "deploymentId"), [s, { mappings: i }, { runs: o }, u] = await Promise.all([
          Gy(a),
          Py(a),
          hT(a, { limit: 10 }),
          xT(a)
        ]);
        return { deployment: s, mappings: i, runs: o, workflow: u };
      },
      Component: $$
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Is(t, "deploymentId"), s = Is(t, "runId");
        return { run: await Xh(a, s) };
      },
      Component: PU
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Is(t, "deploymentId"), [s, { mappings: i }, { voiceAssets: o }] = await Promise.all([
          Gy(a),
          Py(a),
          Qs(a)
        ]);
        return { deployment: s, mappings: i, voiceAssets: o };
      },
      Component: X9
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const s = Is(t, "deploymentId"), i = new URL(a.url);
        return {
          deploymentId: s,
          prefillCharacterName: i.searchParams.get("character") ?? ""
        };
      },
      Component: CB
    },
    {
      path: "/runtime/queue",
      Component: wB
    }
  ];
}
function Is(t, a) {
  const s = t[a];
  if (!s)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return s;
}
const kx = "ext-actions-request", c7 = "ext-actions-declare", u7 = "ext-action-state", Dx = "ext-action-invoke", Ah = "emotion-tts:navigate", Fs = "emotion-tts.run", zx = "emotion-tts.mappings", d7 = 4e3;
function f7(t, a) {
  let s = null, i = !1;
  const o = () => {
    const j = s?.badge ?? "not_installed";
    return h7(j, i);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: zx,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(c7, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, p = () => {
    t.dispatchEvent(
      new CustomEvent(u7, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, y = () => f(), m = (j) => {
    const N = j.detail?.id;
    N === Fs ? b() : N === zx && t.dispatchEvent(
      new CustomEvent(Ah, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = s?.badge ?? "not_installed", N = j === "ready" || j === "running" || j === "starting";
    i = !0, p();
    try {
      N ? await G2() : await Y2(P2());
      try {
        s = await vl();
      } catch {
      }
    } catch {
    } finally {
      i = !1, p();
    }
  };
  t.addEventListener(kx, y), t.addEventListener(Dx, m);
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
  const S = window.setInterval(() => void w(), d7);
  return f(), {
    dispose: () => {
      v = !0, window.clearInterval(S), t.removeEventListener(kx, y), t.removeEventListener(Dx, m);
    }
  };
}
function h7(t, a) {
  const s = t === "ready" || t === "running" || t === "starting", i = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: Fs,
    label: s ? "Stopping…" : "Starting…",
    icon: s ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: Fs,
    label: N1(t),
    icon: "hourglass_top",
    tone: "primary",
    state: "loading"
  } : s ? {
    id: Fs,
    label: "Stop runtime",
    icon: "stop",
    tone: "primary",
    state: "idle",
    tooltip: "Stop the EmotionTTS worker"
  } : i ? {
    id: Fs,
    label: t === "not_installed" ? "Install / Start runtime" : "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle",
    tooltip: "Start the EmotionTTS worker for this deployment"
  } : {
    id: Fs,
    label: "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle"
  };
}
const kh = "emotion-tts-app", m7 = "ext-event", Ox = "emotion-tts-stylesheet", Lx = ["accent", "density", "card"];
function p7(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function g7() {
  if (typeof document > "u" || document.getElementById(Ox)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Ox, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
g7();
class v7 extends HTMLElement {
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
    this.root = HE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Ah, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = f7(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (s) => {
      const i = s.detail?.path;
      i && this.router && this.router.navigate(i);
    };
    this.navigateListener = a, this.addEventListener(Ah, a);
  }
  syncTweaksFromBody() {
    for (const a of Lx) {
      const s = p7(a);
      s === void 0 ? delete this.dataset[a] : this.dataset[a] !== s && (this.dataset[a] = s);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Lx.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), s = EC(o7(), { initialEntries: [a] });
    this.router = s, this.root.render(
      /* @__PURE__ */ c.jsx(g.StrictMode, { children: /* @__PURE__ */ c.jsx(CC, { router: s }) })
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
      new CustomEvent(m7, {
        detail: { topic: a, payload: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function y7() {
  typeof customElements > "u" || customElements.get(kh) || customElements.define(kh, v7);
}
typeof customElements < "u" && !customElements.get(kh) && y7();
export {
  y7 as register
};
//# sourceMappingURL=emotion-tts.js.map
