function WE(e, a) {
  for (var i = 0; i < a.length; i++) {
    const l = a[i];
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
function wm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ah = { exports: {} }, Do = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wv;
function JE() {
  if (Wv) return Do;
  Wv = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(l, s, u) {
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
  return Do.Fragment = a, Do.jsx = i, Do.jsxs = i, Do;
}
var Jv;
function e2() {
  return Jv || (Jv = 1, ah.exports = JE()), ah.exports;
}
var v = e2(), rh = { exports: {} }, Ie = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ey;
function t2() {
  if (ey) return Ie;
  ey = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), b = Symbol.iterator;
  function x(A) {
    return A === null || typeof A != "object" ? null : (A = b && A[b] || A["@@iterator"], typeof A == "function" ? A : null);
  }
  var _ = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, E = Object.assign, N = {};
  function R(A, k, G) {
    this.props = A, this.context = k, this.refs = N, this.updater = G || _;
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
  function j() {
  }
  j.prototype = R.prototype;
  function C(A, k, G) {
    this.props = A, this.context = k, this.refs = N, this.updater = G || _;
  }
  var O = C.prototype = new j();
  O.constructor = C, E(O, R.prototype), O.isPureReactComponent = !0;
  var V = Array.isArray;
  function B() {
  }
  var U = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function H(A, k, G) {
    var ee = G.ref;
    return {
      $$typeof: e,
      type: A,
      key: k,
      ref: ee !== void 0 ? ee : null,
      props: G
    };
  }
  function J(A, k) {
    return H(A.type, k, A.props);
  }
  function I(A) {
    return typeof A == "object" && A !== null && A.$$typeof === e;
  }
  function Q(A) {
    var k = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(G) {
      return k[G];
    });
  }
  var ae = /\/+/g;
  function L(A, k) {
    return typeof A == "object" && A !== null && A.key != null ? Q("" + A.key) : k.toString(36);
  }
  function Y(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(B, B) : (A.status = "pending", A.then(
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
  function T(A, k, G, ee, se) {
    var de = typeof A;
    (de === "undefined" || de === "boolean") && (A = null);
    var he = !1;
    if (A === null) he = !0;
    else
      switch (de) {
        case "bigint":
        case "string":
        case "number":
          he = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case e:
            case a:
              he = !0;
              break;
            case y:
              return he = A._init, T(
                he(A._payload),
                k,
                G,
                ee,
                se
              );
          }
      }
    if (he)
      return se = se(A), he = ee === "" ? "." + L(A, 0) : ee, V(se) ? (G = "", he != null && (G = he.replace(ae, "$&/") + "/"), T(se, k, G, "", function(De) {
        return De;
      })) : se != null && (I(se) && (se = J(
        se,
        G + (se.key == null || A && A.key === se.key ? "" : ("" + se.key).replace(
          ae,
          "$&/"
        ) + "/") + he
      )), k.push(se)), 1;
    he = 0;
    var W = ee === "" ? "." : ee + ":";
    if (V(A))
      for (var ve = 0; ve < A.length; ve++)
        ee = A[ve], de = W + L(ee, ve), he += T(
          ee,
          k,
          G,
          de,
          se
        );
    else if (ve = x(A), typeof ve == "function")
      for (A = ve.call(A), ve = 0; !(ee = A.next()).done; )
        ee = ee.value, de = W + L(ee, ve++), he += T(
          ee,
          k,
          G,
          de,
          se
        );
    else if (de === "object") {
      if (typeof A.then == "function")
        return T(
          Y(A),
          k,
          G,
          ee,
          se
        );
      throw k = String(A), Error(
        "Objects are not valid as a React child (found: " + (k === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : k) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return he;
  }
  function z(A, k, G) {
    if (A == null) return A;
    var ee = [], se = 0;
    return T(A, ee, "", "", function(de) {
      return k.call(G, de, se++);
    }), ee;
  }
  function F(A) {
    if (A._status === -1) {
      var k = A._result;
      k = k(), k.then(
        function(G) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = G);
        },
        function(G) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = G);
        }
      ), A._status === -1 && (A._status = 0, A._result = k);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var X = typeof reportError == "function" ? reportError : function(A) {
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
    map: z,
    forEach: function(A, k, G) {
      z(
        A,
        function() {
          k.apply(this, arguments);
        },
        G
      );
    },
    count: function(A) {
      var k = 0;
      return z(A, function() {
        k++;
      }), k;
    },
    toArray: function(A) {
      return z(A, function(k) {
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
  return Ie.Activity = g, Ie.Children = ne, Ie.Component = R, Ie.Fragment = i, Ie.Profiler = s, Ie.PureComponent = C, Ie.StrictMode = l, Ie.Suspense = p, Ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = U, Ie.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return U.H.useMemoCache(A);
    }
  }, Ie.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, Ie.cacheSignal = function() {
    return null;
  }, Ie.cloneElement = function(A, k, G) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var ee = E({}, A.props), se = A.key;
    if (k != null)
      for (de in k.key !== void 0 && (se = "" + k.key), k)
        !D.call(k, de) || de === "key" || de === "__self" || de === "__source" || de === "ref" && k.ref === void 0 || (ee[de] = k[de]);
    var de = arguments.length - 2;
    if (de === 1) ee.children = G;
    else if (1 < de) {
      for (var he = Array(de), W = 0; W < de; W++)
        he[W] = arguments[W + 2];
      ee.children = he;
    }
    return H(A.type, se, ee);
  }, Ie.createContext = function(A) {
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
  }, Ie.createElement = function(A, k, G) {
    var ee, se = {}, de = null;
    if (k != null)
      for (ee in k.key !== void 0 && (de = "" + k.key), k)
        D.call(k, ee) && ee !== "key" && ee !== "__self" && ee !== "__source" && (se[ee] = k[ee]);
    var he = arguments.length - 2;
    if (he === 1) se.children = G;
    else if (1 < he) {
      for (var W = Array(he), ve = 0; ve < he; ve++)
        W[ve] = arguments[ve + 2];
      se.children = W;
    }
    if (A && A.defaultProps)
      for (ee in he = A.defaultProps, he)
        se[ee] === void 0 && (se[ee] = he[ee]);
    return H(A, de, se);
  }, Ie.createRef = function() {
    return { current: null };
  }, Ie.forwardRef = function(A) {
    return { $$typeof: d, render: A };
  }, Ie.isValidElement = I, Ie.lazy = function(A) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: A },
      _init: F
    };
  }, Ie.memo = function(A, k) {
    return {
      $$typeof: m,
      type: A,
      compare: k === void 0 ? null : k
    };
  }, Ie.startTransition = function(A) {
    var k = U.T, G = {};
    U.T = G;
    try {
      var ee = A(), se = U.S;
      se !== null && se(G, ee), typeof ee == "object" && ee !== null && typeof ee.then == "function" && ee.then(B, X);
    } catch (de) {
      X(de);
    } finally {
      k !== null && G.types !== null && (k.types = G.types), U.T = k;
    }
  }, Ie.unstable_useCacheRefresh = function() {
    return U.H.useCacheRefresh();
  }, Ie.use = function(A) {
    return U.H.use(A);
  }, Ie.useActionState = function(A, k, G) {
    return U.H.useActionState(A, k, G);
  }, Ie.useCallback = function(A, k) {
    return U.H.useCallback(A, k);
  }, Ie.useContext = function(A) {
    return U.H.useContext(A);
  }, Ie.useDebugValue = function() {
  }, Ie.useDeferredValue = function(A, k) {
    return U.H.useDeferredValue(A, k);
  }, Ie.useEffect = function(A, k) {
    return U.H.useEffect(A, k);
  }, Ie.useEffectEvent = function(A) {
    return U.H.useEffectEvent(A);
  }, Ie.useId = function() {
    return U.H.useId();
  }, Ie.useImperativeHandle = function(A, k, G) {
    return U.H.useImperativeHandle(A, k, G);
  }, Ie.useInsertionEffect = function(A, k) {
    return U.H.useInsertionEffect(A, k);
  }, Ie.useLayoutEffect = function(A, k) {
    return U.H.useLayoutEffect(A, k);
  }, Ie.useMemo = function(A, k) {
    return U.H.useMemo(A, k);
  }, Ie.useOptimistic = function(A, k) {
    return U.H.useOptimistic(A, k);
  }, Ie.useReducer = function(A, k, G) {
    return U.H.useReducer(A, k, G);
  }, Ie.useRef = function(A) {
    return U.H.useRef(A);
  }, Ie.useState = function(A) {
    return U.H.useState(A);
  }, Ie.useSyncExternalStore = function(A, k, G) {
    return U.H.useSyncExternalStore(
      A,
      k,
      G
    );
  }, Ie.useTransition = function() {
    return U.H.useTransition();
  }, Ie.version = "19.2.7", Ie;
}
var ty;
function us() {
  return ty || (ty = 1, rh.exports = t2()), rh.exports;
}
var S = us();
const be = /* @__PURE__ */ wm(S), n2 = /* @__PURE__ */ WE({
  __proto__: null,
  default: be
}, [S]);
var ih = { exports: {} }, Ao = {}, lh = { exports: {} }, oh = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ny;
function a2() {
  return ny || (ny = 1, (function(e) {
    function a(T, z) {
      var F = T.length;
      T.push(z);
      e: for (; 0 < F; ) {
        var X = F - 1 >>> 1, ne = T[X];
        if (0 < s(ne, z))
          T[X] = z, T[F] = ne, F = X;
        else break e;
      }
    }
    function i(T) {
      return T.length === 0 ? null : T[0];
    }
    function l(T) {
      if (T.length === 0) return null;
      var z = T[0], F = T.pop();
      if (F !== z) {
        T[0] = F;
        e: for (var X = 0, ne = T.length, A = ne >>> 1; X < A; ) {
          var k = 2 * (X + 1) - 1, G = T[k], ee = k + 1, se = T[ee];
          if (0 > s(G, F))
            ee < ne && 0 > s(se, G) ? (T[X] = se, T[ee] = F, X = ee) : (T[X] = G, T[k] = F, X = k);
          else if (ee < ne && 0 > s(se, F))
            T[X] = se, T[ee] = F, X = ee;
          else break e;
        }
      }
      return z;
    }
    function s(T, z) {
      var F = T.sortIndex - z.sortIndex;
      return F !== 0 ? F : T.id - z.id;
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
    var p = [], m = [], y = 1, g = null, b = 3, x = !1, _ = !1, E = !1, N = !1, R = typeof setTimeout == "function" ? setTimeout : null, j = typeof clearTimeout == "function" ? clearTimeout : null, C = typeof setImmediate < "u" ? setImmediate : null;
    function O(T) {
      for (var z = i(m); z !== null; ) {
        if (z.callback === null) l(m);
        else if (z.startTime <= T)
          l(m), z.sortIndex = z.expirationTime, a(p, z);
        else break;
        z = i(m);
      }
    }
    function V(T) {
      if (E = !1, O(T), !_)
        if (i(p) !== null)
          _ = !0, B || (B = !0, Q());
        else {
          var z = i(m);
          z !== null && Y(V, z.startTime - T);
        }
    }
    var B = !1, U = -1, D = 5, H = -1;
    function J() {
      return N ? !0 : !(e.unstable_now() - H < D);
    }
    function I() {
      if (N = !1, B) {
        var T = e.unstable_now();
        H = T;
        var z = !0;
        try {
          e: {
            _ = !1, E && (E = !1, j(U), U = -1), x = !0;
            var F = b;
            try {
              t: {
                for (O(T), g = i(p); g !== null && !(g.expirationTime > T && J()); ) {
                  var X = g.callback;
                  if (typeof X == "function") {
                    g.callback = null, b = g.priorityLevel;
                    var ne = X(
                      g.expirationTime <= T
                    );
                    if (T = e.unstable_now(), typeof ne == "function") {
                      g.callback = ne, O(T), z = !0;
                      break t;
                    }
                    g === i(p) && l(p), O(T);
                  } else l(p);
                  g = i(p);
                }
                if (g !== null) z = !0;
                else {
                  var A = i(m);
                  A !== null && Y(
                    V,
                    A.startTime - T
                  ), z = !1;
                }
              }
              break e;
            } finally {
              g = null, b = F, x = !1;
            }
            z = void 0;
          }
        } finally {
          z ? Q() : B = !1;
        }
      }
    }
    var Q;
    if (typeof C == "function")
      Q = function() {
        C(I);
      };
    else if (typeof MessageChannel < "u") {
      var ae = new MessageChannel(), L = ae.port2;
      ae.port1.onmessage = I, Q = function() {
        L.postMessage(null);
      };
    } else
      Q = function() {
        R(I, 0);
      };
    function Y(T, z) {
      U = R(function() {
        T(e.unstable_now());
      }, z);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
      T.callback = null;
    }, e.unstable_forceFrameRate = function(T) {
      0 > T || 125 < T ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : D = 0 < T ? Math.floor(1e3 / T) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, e.unstable_next = function(T) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = b;
      }
      var F = b;
      b = z;
      try {
        return T();
      } finally {
        b = F;
      }
    }, e.unstable_requestPaint = function() {
      N = !0;
    }, e.unstable_runWithPriority = function(T, z) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var F = b;
      b = T;
      try {
        return z();
      } finally {
        b = F;
      }
    }, e.unstable_scheduleCallback = function(T, z, F) {
      var X = e.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? X + F : X) : F = X, T) {
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
      return ne = F + ne, T = {
        id: y++,
        callback: z,
        priorityLevel: T,
        startTime: F,
        expirationTime: ne,
        sortIndex: -1
      }, F > X ? (T.sortIndex = F, a(m, T), i(p) === null && T === i(m) && (E ? (j(U), U = -1) : E = !0, Y(V, F - X))) : (T.sortIndex = ne, a(p, T), _ || x || (_ = !0, B || (B = !0, Q()))), T;
    }, e.unstable_shouldYield = J, e.unstable_wrapCallback = function(T) {
      var z = b;
      return function() {
        var F = b;
        b = z;
        try {
          return T.apply(this, arguments);
        } finally {
          b = F;
        }
      };
    };
  })(oh)), oh;
}
var ay;
function r2() {
  return ay || (ay = 1, lh.exports = a2()), lh.exports;
}
var sh = { exports: {} }, hn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ry;
function i2() {
  if (ry) return hn;
  ry = 1;
  var e = us();
  function a(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + p + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function i() {
  }
  var l = {
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
  return hn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, hn.createPortal = function(p, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(p, m, null, y);
  }, hn.flushSync = function(p) {
    var m = c.T, y = l.p;
    try {
      if (c.T = null, l.p = 2, p) return p();
    } finally {
      c.T = m, l.p = y, l.d.f();
    }
  }, hn.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, l.d.C(p, m));
  }, hn.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, hn.preinit = function(p, m) {
    if (typeof p == "string" && m && typeof m.as == "string") {
      var y = m.as, g = d(y, m.crossOrigin), b = typeof m.integrity == "string" ? m.integrity : void 0, x = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? l.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: g,
          integrity: b,
          fetchPriority: x
        }
      ) : y === "script" && l.d.X(p, {
        crossOrigin: g,
        integrity: b,
        fetchPriority: x,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, hn.preinitModule = function(p, m) {
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
  }, hn.preload = function(p, m) {
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
  }, hn.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var y = d(m.as, m.crossOrigin);
        l.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else l.d.m(p);
  }, hn.requestFormReset = function(p) {
    l.d.r(p);
  }, hn.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, hn.useFormState = function(p, m, y) {
    return c.H.useFormState(p, m, y);
  }, hn.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, hn.version = "19.2.7", hn;
}
var iy;
function Yx() {
  if (iy) return sh.exports;
  iy = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), sh.exports = i2(), sh.exports;
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
var ly;
function l2() {
  if (ly) return Ao;
  ly = 1;
  var e = r2(), a = us(), i = Yx();
  function l(t) {
    var n = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var r = 2; r < arguments.length; r++)
        n += "&args[]=" + encodeURIComponent(arguments[r]);
    }
    return "Minified React error #" + t + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function u(t) {
    var n = t, r = t;
    if (t.alternate) for (; n.return; ) n = n.return;
    else {
      t = n;
      do
        n = t, (n.flags & 4098) !== 0 && (r = n.return), t = n.return;
      while (t);
    }
    return n.tag === 3 ? r : null;
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
    for (var r = t, o = n; ; ) {
      var f = r.return;
      if (f === null) break;
      var h = f.alternate;
      if (h === null) {
        if (o = f.return, o !== null) {
          r = o;
          continue;
        }
        break;
      }
      if (f.child === h.child) {
        for (h = f.child; h; ) {
          if (h === r) return p(f), t;
          if (h === o) return p(f), n;
          h = h.sibling;
        }
        throw Error(l(188));
      }
      if (r.return !== o.return) r = f, o = h;
      else {
        for (var w = !1, M = f.child; M; ) {
          if (M === r) {
            w = !0, r = f, o = h;
            break;
          }
          if (M === o) {
            w = !0, o = f, r = h;
            break;
          }
          M = M.sibling;
        }
        if (!w) {
          for (M = h.child; M; ) {
            if (M === r) {
              w = !0, r = h, o = f;
              break;
            }
            if (M === o) {
              w = !0, o = h, r = f;
              break;
            }
            M = M.sibling;
          }
          if (!w) throw Error(l(189));
        }
      }
      if (r.alternate !== o) throw Error(l(190));
    }
    if (r.tag !== 3) throw Error(l(188));
    return r.stateNode.current === r ? t : n;
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
  var g = Object.assign, b = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), j = Symbol.for("react.consumer"), C = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), H = Symbol.for("react.activity"), J = Symbol.for("react.memo_cache_sentinel"), I = Symbol.iterator;
  function Q(t) {
    return t === null || typeof t != "object" ? null : (t = I && t[I] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ae = Symbol.for("react.client.reference");
  function L(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ae ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case E:
        return "Fragment";
      case R:
        return "Profiler";
      case N:
        return "StrictMode";
      case V:
        return "Suspense";
      case B:
        return "SuspenseList";
      case H:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case _:
          return "Portal";
        case C:
          return t.displayName || "Context";
        case j:
          return (t._context.displayName || "Context") + ".Consumer";
        case O:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case U:
          return n = t.displayName || null, n !== null ? n : L(t.type) || "Memo";
        case D:
          n = t._payload, t = t._init;
          try {
            return L(t(n));
          } catch {
          }
      }
    return null;
  }
  var Y = Array.isArray, T = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, X = [], ne = -1;
  function A(t) {
    return { current: t };
  }
  function k(t) {
    0 > ne || (t.current = X[ne], X[ne] = null, ne--);
  }
  function G(t, n) {
    ne++, X[ne] = t.current, t.current = n;
  }
  var ee = A(null), se = A(null), de = A(null), he = A(null);
  function W(t, n) {
    switch (G(de, n), G(se, t), G(ee, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? wv(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = wv(n), t = _v(n, t);
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
    k(ee), G(ee, t);
  }
  function ve() {
    k(ee), k(se), k(de);
  }
  function De(t) {
    t.memoizedState !== null && G(he, t);
    var n = ee.current, r = _v(n, t.type);
    n !== r && (G(se, t), G(ee, r));
  }
  function Oe(t) {
    se.current === t && (k(ee), k(se)), he.current === t && (k(he), Co._currentValue = F);
  }
  var Ee, we;
  function Me(t) {
    if (Ee === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        Ee = n && n[1] || "", we = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ee + t + we;
  }
  var Ye = !1;
  function ye(t, n) {
    if (!t || Ye) return "";
    Ye = !0;
    var r = Error.prepareStackTrace;
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
                  var le = oe;
                }
                Reflect.construct(t, [], fe);
              } else {
                try {
                  fe.call();
                } catch (oe) {
                  le = oe;
                }
                t.call(fe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                le = oe;
              }
              (fe = t()) && typeof fe.catch == "function" && fe.catch(function() {
              });
            }
          } catch (oe) {
            if (oe && le && typeof oe.stack == "string")
              return [oe.stack, le.stack];
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
      var h = o.DetermineComponentFrameRoot(), w = h[0], M = h[1];
      if (w && M) {
        var q = w.split(`
`), ie = M.split(`
`);
        for (f = o = 0; o < q.length && !q[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; f < ie.length && !ie[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (o === q.length || f === ie.length)
          for (o = q.length - 1, f = ie.length - 1; 1 <= o && 0 <= f && q[o] !== ie[f]; )
            f--;
        for (; 1 <= o && 0 <= f; o--, f--)
          if (q[o] !== ie[f]) {
            if (o !== 1 || f !== 1)
              do
                if (o--, f--, 0 > f || q[o] !== ie[f]) {
                  var ue = `
` + q[o].replace(" at new ", " at ");
                  return t.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", t.displayName)), ue;
                }
              while (1 <= o && 0 <= f);
            break;
          }
      }
    } finally {
      Ye = !1, Error.prepareStackTrace = r;
    }
    return (r = t ? t.displayName || t.name : "") ? Me(r) : "";
  }
  function pe(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Me(t.type);
      case 16:
        return Me("Lazy");
      case 13:
        return t.child !== n && n !== null ? Me("Suspense Fallback") : Me("Suspense");
      case 19:
        return Me("SuspenseList");
      case 0:
      case 15:
        return ye(t.type, !1);
      case 11:
        return ye(t.type.render, !1);
      case 1:
        return ye(t.type, !0);
      case 31:
        return Me("Activity");
      default:
        return "";
    }
  }
  function _e(t) {
    try {
      var n = "", r = null;
      do
        n += pe(t, r), r = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var Re = Object.prototype.hasOwnProperty, Ae = e.unstable_scheduleCallback, lt = e.unstable_cancelCallback, Ze = e.unstable_shouldYield, Fe = e.unstable_requestPaint, Ke = e.unstable_now, vt = e.unstable_getCurrentPriorityLevel, yt = e.unstable_ImmediatePriority, Yt = e.unstable_UserBlockingPriority, Lt = e.unstable_NormalPriority, pt = e.unstable_LowPriority, ut = e.unstable_IdlePriority, Zn = e.log, _n = e.unstable_setDisableYieldValue, nn = null, Kt = null;
  function Ot(t) {
    if (typeof Zn == "function" && _n(t), Kt && typeof Kt.setStrictMode == "function")
      try {
        Kt.setStrictMode(nn, t);
      } catch {
      }
  }
  var Ut = Math.clz32 ? Math.clz32 : Sn, _r = Math.log, Aa = Math.LN2;
  function Sn(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (_r(t) / Aa | 0) | 0;
  }
  var ma = 256, Ln = 262144, Qn = 4194304;
  function fn(t) {
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
  function Ve(t, n, r) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var f = 0, h = t.suspendedLanes, w = t.pingedLanes;
    t = t.warmLanes;
    var M = o & 134217727;
    return M !== 0 ? (o = M & ~h, o !== 0 ? f = fn(o) : (w &= M, w !== 0 ? f = fn(w) : r || (r = M & ~t, r !== 0 && (f = fn(r))))) : (M = o & ~h, M !== 0 ? f = fn(M) : w !== 0 ? f = fn(w) : r || (r = o & ~t, r !== 0 && (f = fn(r)))), f === 0 ? 0 : n !== 0 && n !== f && (n & h) === 0 && (h = f & -f, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : f;
  }
  function bt(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function kt(t, n) {
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
    var t = Qn;
    return Qn <<= 1, (Qn & 62914560) === 0 && (Qn = 4194304), t;
  }
  function gn(t) {
    for (var n = [], r = 0; 31 > r; r++) n.push(t);
    return n;
  }
  function gt(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Wt(t, n, r, o, f, h) {
    var w = t.pendingLanes;
    t.pendingLanes = r, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= r, t.entangledLanes &= r, t.errorRecoveryDisabledLanes &= r, t.shellSuspendCounter = 0;
    var M = t.entanglements, q = t.expirationTimes, ie = t.hiddenUpdates;
    for (r = w & ~r; 0 < r; ) {
      var ue = 31 - Ut(r), fe = 1 << ue;
      M[ue] = 0, q[ue] = -1;
      var le = ie[ue];
      if (le !== null)
        for (ie[ue] = null, ue = 0; ue < le.length; ue++) {
          var oe = le[ue];
          oe !== null && (oe.lane &= -536870913);
        }
      r &= ~fe;
    }
    o !== 0 && pa(t, o, 0), h !== 0 && f === 0 && t.tag !== 0 && (t.suspendedLanes |= h & ~(w & ~n));
  }
  function pa(t, n, r) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - Ut(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | r & 261930;
  }
  function en(t, n) {
    var r = t.entangledLanes |= n;
    for (t = t.entanglements; r; ) {
      var o = 31 - Ut(r), f = 1 << o;
      f & n | t[o] & n && (t[o] |= n), r &= ~f;
    }
  }
  function $(t, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : Z(r), (r & (t.suspendedLanes | n)) !== 0 ? 0 : r;
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
  function te(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function me() {
    var t = z.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Gv(t.type));
  }
  function ge(t, n) {
    var r = z.p;
    try {
      return z.p = t, n();
    } finally {
      z.p = r;
    }
  }
  var Ce = Math.random().toString(36).slice(2), xe = "__reactFiber$" + Ce, Ne = "__reactProps$" + Ce, Se = "__reactContainer$" + Ce, ze = "__reactEvents$" + Ce, Le = "__reactListeners$" + Ce, qe = "__reactHandles$" + Ce, Be = "__reactResources$" + Ce, Pe = "__reactMarker$" + Ce;
  function ot(t) {
    delete t[xe], delete t[Ne], delete t[ze], delete t[Le], delete t[qe];
  }
  function Ct(t) {
    var n = t[xe];
    if (n) return n;
    for (var r = t.parentNode; r; ) {
      if (n = r[Se] || r[xe]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (t = Mv(t); t !== null; ) {
            if (r = t[xe]) return r;
            t = Mv(t);
          }
        return n;
      }
      t = r, r = t.parentNode;
    }
    return null;
  }
  function ct(t) {
    if (t = t[xe] || t[Se]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function et(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(l(33));
  }
  function zt(t) {
    var n = t[Be];
    return n || (n = t[Be] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function rt(t) {
    t[Pe] = !0;
  }
  var ja = /* @__PURE__ */ new Set(), kn = {};
  function dn(t, n) {
    an(t, n), an(t + "Capture", n);
  }
  function an(t, n) {
    for (kn[t] = n, t = 0; t < n.length; t++)
      ja.add(n[t]);
  }
  var En = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Sr = {}, Nn = {};
  function Er(t) {
    return Re.call(Nn, t) ? !0 : Re.call(Sr, t) ? !1 : En.test(t) ? Nn[t] = !0 : (Sr[t] = !0, !1);
  }
  function ga(t, n, r) {
    if (Er(n))
      if (r === null) t.removeAttribute(n);
      else {
        switch (typeof r) {
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
        t.setAttribute(n, "" + r);
      }
  }
  function va(t, n, r) {
    if (r === null) t.removeAttribute(n);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, "" + r);
    }
  }
  function $e(t, n, r, o) {
    if (o === null) t.removeAttribute(r);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(r);
          return;
      }
      t.setAttributeNS(n, r, "" + o);
    }
  }
  function xt(t) {
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
  function vn(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Hn(t, n, r) {
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
        set: function(w) {
          r = "" + w, h.call(this, w);
        }
      }), Object.defineProperty(t, n, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return r;
        },
        setValue: function(w) {
          r = "" + w;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[n];
        }
      };
    }
  }
  function Nr(t) {
    if (!t._valueTracker) {
      var n = vn(t) ? "checked" : "value";
      t._valueTracker = Hn(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function Xa(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), o = "";
    return t && (o = vn(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== r ? (n.setValue(t), !0) : !1;
  }
  function ht(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Kn = /[\n"\\]/g;
  function rn(t) {
    return t.replace(
      Kn,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ai(t, n, r, o, f, h, w, M) {
    t.name = "", w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? t.type = w : t.removeAttribute("type"), n != null ? w === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + xt(n)) : t.value !== "" + xt(n) && (t.value = "" + xt(n)) : w !== "submit" && w !== "reset" || t.removeAttribute("value"), n != null ? Vl(t, w, xt(n)) : r != null ? Vl(t, w, xt(r)) : o != null && t.removeAttribute("value"), f == null && h != null && (t.defaultChecked = !!h), f != null && (t.checked = f && typeof f != "function" && typeof f != "symbol"), M != null && typeof M != "function" && typeof M != "symbol" && typeof M != "boolean" ? t.name = "" + xt(M) : t.removeAttribute("name");
  }
  function ki(t, n, r, o, f, h, w, M) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        Nr(t);
        return;
      }
      r = r != null ? "" + xt(r) : "", n = n != null ? "" + xt(n) : r, M || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = M ? t.checked : !!o, t.defaultChecked = !!o, w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" && (t.name = w), Nr(t);
  }
  function Vl(t, n, r) {
    n === "number" && ht(t.ownerDocument) === t || t.defaultValue === "" + r || (t.defaultValue = "" + r);
  }
  function Cr(t, n, r, o) {
    if (t = t.options, n) {
      n = {};
      for (var f = 0; f < r.length; f++)
        n["$" + r[f]] = !0;
      for (r = 0; r < t.length; r++)
        f = n.hasOwnProperty("$" + t[r].value), t[r].selected !== f && (t[r].selected = f), f && o && (t[r].defaultSelected = !0);
    } else {
      for (r = "" + xt(r), n = null, f = 0; f < t.length; f++) {
        if (t[f].value === r) {
          t[f].selected = !0, o && (t[f].defaultSelected = !0);
          return;
        }
        n !== null || t[f].disabled || (n = t[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function $l(t, n, r) {
    if (n != null && (n = "" + xt(n), n !== t.value && (t.value = n), r == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = r != null ? "" + xt(r) : "";
  }
  function vp(t, n, r, o) {
    if (n == null) {
      if (o != null) {
        if (r != null) throw Error(l(92));
        if (Y(o)) {
          if (1 < o.length) throw Error(l(93));
          o = o[0];
        }
        r = o;
      }
      r == null && (r = ""), n = r;
    }
    r = xt(n), t.defaultValue = r, o = t.textContent, o === r && o !== "" && o !== null && (t.value = o), Nr(t);
  }
  function Hi(t, n) {
    if (n) {
      var r = t.firstChild;
      if (r && r === t.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var X_ = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function yp(t, n, r) {
    var o = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, r) : typeof r != "number" || r === 0 || X_.has(n) ? n === "float" ? t.cssFloat = r : t[n] = ("" + r).trim() : t[n] = r + "px";
  }
  function bp(t, n, r) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (t = t.style, r != null) {
      for (var o in r)
        !r.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var f in n)
        o = n[f], n.hasOwnProperty(f) && r[f] !== o && yp(t, f, o);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && yp(t, h, n[h]);
  }
  function Wc(t) {
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
  var P_ = /* @__PURE__ */ new Map([
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
  ]), Z_ = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ws(t) {
    return Z_.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Pa() {
  }
  var Jc = null;
  function ef(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Bi = null, Ui = null;
  function xp(t) {
    var n = ct(t);
    if (n && (t = n.stateNode)) {
      var r = t[Ne] || null;
      e: switch (t = n.stateNode, n.type) {
        case "input":
          if (ai(
            t,
            r.value,
            r.defaultValue,
            r.defaultValue,
            r.checked,
            r.defaultChecked,
            r.type,
            r.name
          ), n = r.name, r.type === "radio" && n != null) {
            for (r = t; r.parentNode; ) r = r.parentNode;
            for (r = r.querySelectorAll(
              'input[name="' + rn(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < r.length; n++) {
              var o = r[n];
              if (o !== t && o.form === t.form) {
                var f = o[Ne] || null;
                if (!f) throw Error(l(90));
                ai(
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
            for (n = 0; n < r.length; n++)
              o = r[n], o.form === t.form && Xa(o);
          }
          break e;
        case "textarea":
          $l(t, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && Cr(t, !!r.multiple, n, !1);
      }
    }
  }
  var tf = !1;
  function wp(t, n, r) {
    if (tf) return t(n, r);
    tf = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (tf = !1, (Bi !== null || Ui !== null) && (su(), Bi && (n = Bi, t = Ui, Ui = Bi = null, xp(n), t)))
        for (n = 0; n < t.length; n++) xp(t[n]);
    }
  }
  function ql(t, n) {
    var r = t.stateNode;
    if (r === null) return null;
    var o = r[Ne] || null;
    if (o === null) return null;
    r = o[n];
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
    if (r && typeof r != "function")
      throw Error(
        l(231, n, typeof r)
      );
    return r;
  }
  var Za = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nf = !1;
  if (Za)
    try {
      var Il = {};
      Object.defineProperty(Il, "passive", {
        get: function() {
          nf = !0;
        }
      }), window.addEventListener("test", Il, Il), window.removeEventListener("test", Il, Il);
    } catch {
      nf = !1;
    }
  var Rr = null, af = null, _s = null;
  function _p() {
    if (_s) return _s;
    var t, n = af, r = n.length, o, f = "value" in Rr ? Rr.value : Rr.textContent, h = f.length;
    for (t = 0; t < r && n[t] === f[t]; t++) ;
    var w = r - t;
    for (o = 1; o <= w && n[r - o] === f[h - o]; o++) ;
    return _s = f.slice(t, 1 < o ? 1 - o : void 0);
  }
  function Ss(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Es() {
    return !0;
  }
  function Sp() {
    return !1;
  }
  function Cn(t) {
    function n(r, o, f, h, w) {
      this._reactName = r, this._targetInst = f, this.type = o, this.nativeEvent = h, this.target = w, this.currentTarget = null;
      for (var M in t)
        t.hasOwnProperty(M) && (r = t[M], this[M] = r ? r(h) : h[M]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? Es : Sp, this.isPropagationStopped = Sp, this;
    }
    return g(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Es);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Es);
      },
      persist: function() {
      },
      isPersistent: Es
    }), n;
  }
  var ri = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ns = Cn(ri), Yl = g({}, ri, { view: 0, detail: 0 }), Q_ = Cn(Yl), rf, lf, Gl, Cs = g({}, Yl, {
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
    getModifierState: sf,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Gl && (Gl && t.type === "mousemove" ? (rf = t.screenX - Gl.screenX, lf = t.screenY - Gl.screenY) : lf = rf = 0, Gl = t), rf);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : lf;
    }
  }), Ep = Cn(Cs), K_ = g({}, Cs, { dataTransfer: 0 }), W_ = Cn(K_), J_ = g({}, Yl, { relatedTarget: 0 }), of = Cn(J_), eS = g({}, ri, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), tS = Cn(eS), nS = g({}, ri, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), aS = Cn(nS), rS = g({}, ri, { data: 0 }), Np = Cn(rS), iS = {
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
  }, lS = {
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
  }, oS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function sS(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = oS[t]) ? !!n[t] : !1;
  }
  function sf() {
    return sS;
  }
  var uS = g({}, Yl, {
    key: function(t) {
      if (t.key) {
        var n = iS[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = Ss(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? lS[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: sf,
    charCode: function(t) {
      return t.type === "keypress" ? Ss(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Ss(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), cS = Cn(uS), fS = g({}, Cs, {
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
  }), Cp = Cn(fS), dS = g({}, Yl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: sf
  }), hS = Cn(dS), mS = g({}, ri, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pS = Cn(mS), gS = g({}, Cs, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), vS = Cn(gS), yS = g({}, ri, {
    newState: 0,
    oldState: 0
  }), bS = Cn(yS), xS = [9, 13, 27, 32], uf = Za && "CompositionEvent" in window, Fl = null;
  Za && "documentMode" in document && (Fl = document.documentMode);
  var wS = Za && "TextEvent" in window && !Fl, Rp = Za && (!uf || Fl && 8 < Fl && 11 >= Fl), Tp = " ", Mp = !1;
  function Dp(t, n) {
    switch (t) {
      case "keyup":
        return xS.indexOf(n.keyCode) !== -1;
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
  function Ap(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Vi = !1;
  function _S(t, n) {
    switch (t) {
      case "compositionend":
        return Ap(n);
      case "keypress":
        return n.which !== 32 ? null : (Mp = !0, Tp);
      case "textInput":
        return t = n.data, t === Tp && Mp ? null : t;
      default:
        return null;
    }
  }
  function SS(t, n) {
    if (Vi)
      return t === "compositionend" || !uf && Dp(t, n) ? (t = _p(), _s = af = Rr = null, Vi = !1, t) : null;
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
        return Rp && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var ES = {
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
  function jp(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!ES[t.type] : n === "textarea";
  }
  function Op(t, n, r, o) {
    Bi ? Ui ? Ui.push(o) : Ui = [o] : Bi = o, n = pu(n, "onChange"), 0 < n.length && (r = new Ns(
      "onChange",
      "change",
      null,
      r,
      o
    ), t.push({ event: r, listeners: n }));
  }
  var Xl = null, Pl = null;
  function NS(t) {
    pv(t, 0);
  }
  function Rs(t) {
    var n = et(t);
    if (Xa(n)) return t;
  }
  function zp(t, n) {
    if (t === "change") return n;
  }
  var Lp = !1;
  if (Za) {
    var cf;
    if (Za) {
      var ff = "oninput" in document;
      if (!ff) {
        var kp = document.createElement("div");
        kp.setAttribute("oninput", "return;"), ff = typeof kp.oninput == "function";
      }
      cf = ff;
    } else cf = !1;
    Lp = cf && (!document.documentMode || 9 < document.documentMode);
  }
  function Hp() {
    Xl && (Xl.detachEvent("onpropertychange", Bp), Pl = Xl = null);
  }
  function Bp(t) {
    if (t.propertyName === "value" && Rs(Pl)) {
      var n = [];
      Op(
        n,
        Pl,
        t,
        ef(t)
      ), wp(NS, n);
    }
  }
  function CS(t, n, r) {
    t === "focusin" ? (Hp(), Xl = n, Pl = r, Xl.attachEvent("onpropertychange", Bp)) : t === "focusout" && Hp();
  }
  function RS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Rs(Pl);
  }
  function TS(t, n) {
    if (t === "click") return Rs(n);
  }
  function MS(t, n) {
    if (t === "input" || t === "change")
      return Rs(n);
  }
  function DS(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Bn = typeof Object.is == "function" ? Object.is : DS;
  function Zl(t, n) {
    if (Bn(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(t), o = Object.keys(n);
    if (r.length !== o.length) return !1;
    for (o = 0; o < r.length; o++) {
      var f = r[o];
      if (!Re.call(n, f) || !Bn(t[f], n[f]))
        return !1;
    }
    return !0;
  }
  function Up(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Vp(t, n) {
    var r = Up(t);
    t = 0;
    for (var o; r; ) {
      if (r.nodeType === 3) {
        if (o = t + r.textContent.length, t <= n && o >= n)
          return { node: r, offset: n - t };
        t = o;
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
      r = Up(r);
    }
  }
  function $p(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? $p(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function qp(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = ht(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) t = n.contentWindow;
      else break;
      n = ht(t.document);
    }
    return n;
  }
  function df(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var AS = Za && "documentMode" in document && 11 >= document.documentMode, $i = null, hf = null, Ql = null, mf = !1;
  function Ip(t, n, r) {
    var o = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    mf || $i == null || $i !== ht(o) || (o = $i, "selectionStart" in o && df(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Ql && Zl(Ql, o) || (Ql = o, o = pu(hf, "onSelect"), 0 < o.length && (n = new Ns(
      "onSelect",
      "select",
      null,
      n,
      r
    ), t.push({ event: n, listeners: o }), n.target = $i)));
  }
  function ii(t, n) {
    var r = {};
    return r[t.toLowerCase()] = n.toLowerCase(), r["Webkit" + t] = "webkit" + n, r["Moz" + t] = "moz" + n, r;
  }
  var qi = {
    animationend: ii("Animation", "AnimationEnd"),
    animationiteration: ii("Animation", "AnimationIteration"),
    animationstart: ii("Animation", "AnimationStart"),
    transitionrun: ii("Transition", "TransitionRun"),
    transitionstart: ii("Transition", "TransitionStart"),
    transitioncancel: ii("Transition", "TransitionCancel"),
    transitionend: ii("Transition", "TransitionEnd")
  }, pf = {}, Yp = {};
  Za && (Yp = document.createElement("div").style, "AnimationEvent" in window || (delete qi.animationend.animation, delete qi.animationiteration.animation, delete qi.animationstart.animation), "TransitionEvent" in window || delete qi.transitionend.transition);
  function li(t) {
    if (pf[t]) return pf[t];
    if (!qi[t]) return t;
    var n = qi[t], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Yp)
        return pf[t] = n[r];
    return t;
  }
  var Gp = li("animationend"), Fp = li("animationiteration"), Xp = li("animationstart"), jS = li("transitionrun"), OS = li("transitionstart"), zS = li("transitioncancel"), Pp = li("transitionend"), Zp = /* @__PURE__ */ new Map(), gf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  gf.push("scrollEnd");
  function ya(t, n) {
    Zp.set(t, n), dn(n, [t]);
  }
  var Ts = typeof reportError == "function" ? reportError : function(t) {
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
  }, Wn = [], Ii = 0, vf = 0;
  function Ms() {
    for (var t = Ii, n = vf = Ii = 0; n < t; ) {
      var r = Wn[n];
      Wn[n++] = null;
      var o = Wn[n];
      Wn[n++] = null;
      var f = Wn[n];
      Wn[n++] = null;
      var h = Wn[n];
      if (Wn[n++] = null, o !== null && f !== null) {
        var w = o.pending;
        w === null ? f.next = f : (f.next = w.next, w.next = f), o.pending = f;
      }
      h !== 0 && Qp(r, f, h);
    }
  }
  function Ds(t, n, r, o) {
    Wn[Ii++] = t, Wn[Ii++] = n, Wn[Ii++] = r, Wn[Ii++] = o, vf |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function yf(t, n, r, o) {
    return Ds(t, n, r, o), As(t);
  }
  function oi(t, n) {
    return Ds(t, null, null, n), As(t);
  }
  function Qp(t, n, r) {
    t.lanes |= r;
    var o = t.alternate;
    o !== null && (o.lanes |= r);
    for (var f = !1, h = t.return; h !== null; )
      h.childLanes |= r, o = h.alternate, o !== null && (o.childLanes |= r), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (f = !0)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, f && n !== null && (f = 31 - Ut(r), t = h.hiddenUpdates, o = t[f], o === null ? t[f] = [n] : o.push(n), n.lane = r | 536870912), h) : null;
  }
  function As(t) {
    if (50 < bo)
      throw bo = 0, Rd = null, Error(l(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Yi = {};
  function LS(t, n, r, o) {
    this.tag = t, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Un(t, n, r, o) {
    return new LS(t, n, r, o);
  }
  function bf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Qa(t, n) {
    var r = t.alternate;
    return r === null ? (r = Un(
      t.tag,
      n,
      t.key,
      t.mode
    ), r.elementType = t.elementType, r.type = t.type, r.stateNode = t.stateNode, r.alternate = t, t.alternate = r) : (r.pendingProps = n, r.type = t.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = t.flags & 65011712, r.childLanes = t.childLanes, r.lanes = t.lanes, r.child = t.child, r.memoizedProps = t.memoizedProps, r.memoizedState = t.memoizedState, r.updateQueue = t.updateQueue, n = t.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = t.sibling, r.index = t.index, r.ref = t.ref, r.refCleanup = t.refCleanup, r;
  }
  function Kp(t, n) {
    t.flags &= 65011714;
    var r = t.alternate;
    return r === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = r.childLanes, t.lanes = r.lanes, t.child = r.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = r.memoizedProps, t.memoizedState = r.memoizedState, t.updateQueue = r.updateQueue, t.type = r.type, n = r.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function js(t, n, r, o, f, h) {
    var w = 0;
    if (o = t, typeof t == "function") bf(t) && (w = 1);
    else if (typeof t == "string")
      w = VE(
        t,
        r,
        ee.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (t) {
        case H:
          return t = Un(31, r, n, f), t.elementType = H, t.lanes = h, t;
        case E:
          return si(r.children, f, h, n);
        case N:
          w = 8, f |= 24;
          break;
        case R:
          return t = Un(12, r, n, f | 2), t.elementType = R, t.lanes = h, t;
        case V:
          return t = Un(13, r, n, f), t.elementType = V, t.lanes = h, t;
        case B:
          return t = Un(19, r, n, f), t.elementType = B, t.lanes = h, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case C:
                w = 10;
                break e;
              case j:
                w = 9;
                break e;
              case O:
                w = 11;
                break e;
              case U:
                w = 14;
                break e;
              case D:
                w = 16, o = null;
                break e;
            }
          w = 29, r = Error(
            l(130, t === null ? "null" : typeof t, "")
          ), o = null;
      }
    return n = Un(w, r, n, f), n.elementType = t, n.type = o, n.lanes = h, n;
  }
  function si(t, n, r, o) {
    return t = Un(7, t, o, n), t.lanes = r, t;
  }
  function xf(t, n, r) {
    return t = Un(6, t, null, n), t.lanes = r, t;
  }
  function Wp(t) {
    var n = Un(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function wf(t, n, r) {
    return n = Un(
      4,
      t.children !== null ? t.children : [],
      t.key,
      n
    ), n.lanes = r, n.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, n;
  }
  var Jp = /* @__PURE__ */ new WeakMap();
  function Jn(t, n) {
    if (typeof t == "object" && t !== null) {
      var r = Jp.get(t);
      return r !== void 0 ? r : (n = {
        value: t,
        source: n,
        stack: _e(n)
      }, Jp.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: _e(n)
    };
  }
  var Gi = [], Fi = 0, Os = null, Kl = 0, ea = [], ta = 0, Tr = null, Oa = 1, za = "";
  function Ka(t, n) {
    Gi[Fi++] = Kl, Gi[Fi++] = Os, Os = t, Kl = n;
  }
  function eg(t, n, r) {
    ea[ta++] = Oa, ea[ta++] = za, ea[ta++] = Tr, Tr = t;
    var o = Oa;
    t = za;
    var f = 32 - Ut(o) - 1;
    o &= ~(1 << f), r += 1;
    var h = 32 - Ut(n) + f;
    if (30 < h) {
      var w = f - f % 5;
      h = (o & (1 << w) - 1).toString(32), o >>= w, f -= w, Oa = 1 << 32 - Ut(n) + f | r << f | o, za = h + t;
    } else
      Oa = 1 << h | r << f | o, za = t;
  }
  function _f(t) {
    t.return !== null && (Ka(t, 1), eg(t, 1, 0));
  }
  function Sf(t) {
    for (; t === Os; )
      Os = Gi[--Fi], Gi[Fi] = null, Kl = Gi[--Fi], Gi[Fi] = null;
    for (; t === Tr; )
      Tr = ea[--ta], ea[ta] = null, za = ea[--ta], ea[ta] = null, Oa = ea[--ta], ea[ta] = null;
  }
  function tg(t, n) {
    ea[ta++] = Oa, ea[ta++] = za, ea[ta++] = Tr, Oa = n.id, za = n.overflow, Tr = t;
  }
  var ln = null, Tt = null, it = !1, Mr = null, na = !1, Ef = Error(l(519));
  function Dr(t) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Wl(Jn(n, t)), Ef;
  }
  function ng(t) {
    var n = t.stateNode, r = t.type, o = t.memoizedProps;
    switch (n[xe] = t, n[Ne] = o, r) {
      case "dialog":
        Je("cancel", n), Je("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Je("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < wo.length; r++)
          Je(wo[r], n);
        break;
      case "source":
        Je("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Je("error", n), Je("load", n);
        break;
      case "details":
        Je("toggle", n);
        break;
      case "input":
        Je("invalid", n), ki(
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
        Je("invalid", n);
        break;
      case "textarea":
        Je("invalid", n), vp(n, o.value, o.defaultValue, o.children);
    }
    r = o.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || o.suppressHydrationWarning === !0 || bv(n.textContent, r) ? (o.popover != null && (Je("beforetoggle", n), Je("toggle", n)), o.onScroll != null && Je("scroll", n), o.onScrollEnd != null && Je("scrollend", n), o.onClick != null && (n.onclick = Pa), n = !0) : n = !1, n || Dr(t, !0);
  }
  function ag(t) {
    for (ln = t.return; ln; )
      switch (ln.tag) {
        case 5:
        case 31:
        case 13:
          na = !1;
          return;
        case 27:
        case 3:
          na = !0;
          return;
        default:
          ln = ln.return;
      }
  }
  function Xi(t) {
    if (t !== ln) return !1;
    if (!it) return ag(t), it = !0, !1;
    var n = t.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = t.type, r = !(r !== "form" && r !== "button") || qd(t.type, t.memoizedProps)), r = !r), r && Tt && Dr(t), ag(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = Tv(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = Tv(t);
    } else
      n === 27 ? (n = Tt, Yr(t.type) ? (t = Xd, Xd = null, Tt = t) : Tt = n) : Tt = ln ? ra(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ui() {
    Tt = ln = null, it = !1;
  }
  function Nf() {
    var t = Mr;
    return t !== null && (Dn === null ? Dn = t : Dn.push.apply(
      Dn,
      t
    ), Mr = null), t;
  }
  function Wl(t) {
    Mr === null ? Mr = [t] : Mr.push(t);
  }
  var Cf = A(null), ci = null, Wa = null;
  function Ar(t, n, r) {
    G(Cf, n._currentValue), n._currentValue = r;
  }
  function Ja(t) {
    t._currentValue = Cf.current, k(Cf);
  }
  function Rf(t, n, r) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === r) break;
      t = t.return;
    }
  }
  function Tf(t, n, r, o) {
    var f = t.child;
    for (f !== null && (f.return = t); f !== null; ) {
      var h = f.dependencies;
      if (h !== null) {
        var w = f.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var M = h;
          h = f;
          for (var q = 0; q < n.length; q++)
            if (M.context === n[q]) {
              h.lanes |= r, M = h.alternate, M !== null && (M.lanes |= r), Rf(
                h.return,
                r,
                t
              ), o || (w = null);
              break e;
            }
          h = M.next;
        }
      } else if (f.tag === 18) {
        if (w = f.return, w === null) throw Error(l(341));
        w.lanes |= r, h = w.alternate, h !== null && (h.lanes |= r), Rf(w, r, t), w = null;
      } else w = f.child;
      if (w !== null) w.return = f;
      else
        for (w = f; w !== null; ) {
          if (w === t) {
            w = null;
            break;
          }
          if (f = w.sibling, f !== null) {
            f.return = w.return, w = f;
            break;
          }
          w = w.return;
        }
      f = w;
    }
  }
  function Pi(t, n, r, o) {
    t = null;
    for (var f = n, h = !1; f !== null; ) {
      if (!h) {
        if ((f.flags & 524288) !== 0) h = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var w = f.alternate;
        if (w === null) throw Error(l(387));
        if (w = w.memoizedProps, w !== null) {
          var M = f.type;
          Bn(f.pendingProps.value, w.value) || (t !== null ? t.push(M) : t = [M]);
        }
      } else if (f === he.current) {
        if (w = f.alternate, w === null) throw Error(l(387));
        w.memoizedState.memoizedState !== f.memoizedState.memoizedState && (t !== null ? t.push(Co) : t = [Co]);
      }
      f = f.return;
    }
    t !== null && Tf(
      n,
      t,
      r,
      o
    ), n.flags |= 262144;
  }
  function zs(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Bn(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function fi(t) {
    ci = t, Wa = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function on(t) {
    return rg(ci, t);
  }
  function Ls(t, n) {
    return ci === null && fi(t), rg(t, n);
  }
  function rg(t, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Wa === null) {
      if (t === null) throw Error(l(308));
      Wa = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Wa = Wa.next = n;
    return r;
  }
  var kS = typeof AbortController < "u" ? AbortController : function() {
    var t = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(r, o) {
        t.push(o);
      }
    };
    this.abort = function() {
      n.aborted = !0, t.forEach(function(r) {
        return r();
      });
    };
  }, HS = e.unstable_scheduleCallback, BS = e.unstable_NormalPriority, Gt = {
    $$typeof: C,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Mf() {
    return {
      controller: new kS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Jl(t) {
    t.refCount--, t.refCount === 0 && HS(BS, function() {
      t.controller.abort();
    });
  }
  var eo = null, Df = 0, Zi = 0, Qi = null;
  function US(t, n) {
    if (eo === null) {
      var r = eo = [];
      Df = 0, Zi = Od(), Qi = {
        status: "pending",
        value: void 0,
        then: function(o) {
          r.push(o);
        }
      };
    }
    return Df++, n.then(ig, ig), n;
  }
  function ig() {
    if (--Df === 0 && eo !== null) {
      Qi !== null && (Qi.status = "fulfilled");
      var t = eo;
      eo = null, Zi = 0, Qi = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function VS(t, n) {
    var r = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(f) {
        r.push(f);
      }
    };
    return t.then(
      function() {
        o.status = "fulfilled", o.value = n;
        for (var f = 0; f < r.length; f++) (0, r[f])(n);
      },
      function(f) {
        for (o.status = "rejected", o.reason = f, f = 0; f < r.length; f++)
          (0, r[f])(void 0);
      }
    ), o;
  }
  var lg = T.S;
  T.S = function(t, n) {
    I0 = Ke(), typeof n == "object" && n !== null && typeof n.then == "function" && US(t, n), lg !== null && lg(t, n);
  };
  var di = A(null);
  function Af() {
    var t = di.current;
    return t !== null ? t : Rt.pooledCache;
  }
  function ks(t, n) {
    n === null ? G(di, di.current) : G(di, n.pool);
  }
  function og() {
    var t = Af();
    return t === null ? null : { parent: Gt._currentValue, pool: t };
  }
  var Ki = Error(l(460)), jf = Error(l(474)), Hs = Error(l(542)), Bs = { then: function() {
  } };
  function sg(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function ug(t, n, r) {
    switch (r = t[r], r === void 0 ? t.push(n) : r !== n && (n.then(Pa, Pa), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, fg(t), t;
      default:
        if (typeof n.status == "string") n.then(Pa, Pa);
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
            throw t = n.reason, fg(t), t;
        }
        throw mi = n, Ki;
    }
  }
  function hi(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (mi = r, Ki) : r;
    }
  }
  var mi = null;
  function cg() {
    if (mi === null) throw Error(l(459));
    var t = mi;
    return mi = null, t;
  }
  function fg(t) {
    if (t === Ki || t === Hs)
      throw Error(l(483));
  }
  var Wi = null, to = 0;
  function Us(t) {
    var n = to;
    return to += 1, Wi === null && (Wi = []), ug(Wi, t, n);
  }
  function no(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function Vs(t, n) {
    throw n.$$typeof === b ? Error(l(525)) : (t = Object.prototype.toString.call(n), Error(
      l(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function dg(t) {
    function n(K, P) {
      if (t) {
        var re = K.deletions;
        re === null ? (K.deletions = [P], K.flags |= 16) : re.push(P);
      }
    }
    function r(K, P) {
      if (!t) return null;
      for (; P !== null; )
        n(K, P), P = P.sibling;
      return null;
    }
    function o(K) {
      for (var P = /* @__PURE__ */ new Map(); K !== null; )
        K.key !== null ? P.set(K.key, K) : P.set(K.index, K), K = K.sibling;
      return P;
    }
    function f(K, P) {
      return K = Qa(K, P), K.index = 0, K.sibling = null, K;
    }
    function h(K, P, re) {
      return K.index = re, t ? (re = K.alternate, re !== null ? (re = re.index, re < P ? (K.flags |= 67108866, P) : re) : (K.flags |= 67108866, P)) : (K.flags |= 1048576, P);
    }
    function w(K) {
      return t && K.alternate === null && (K.flags |= 67108866), K;
    }
    function M(K, P, re, ce) {
      return P === null || P.tag !== 6 ? (P = xf(re, K.mode, ce), P.return = K, P) : (P = f(P, re), P.return = K, P);
    }
    function q(K, P, re, ce) {
      var He = re.type;
      return He === E ? ue(
        K,
        P,
        re.props.children,
        ce,
        re.key
      ) : P !== null && (P.elementType === He || typeof He == "object" && He !== null && He.$$typeof === D && hi(He) === P.type) ? (P = f(P, re.props), no(P, re), P.return = K, P) : (P = js(
        re.type,
        re.key,
        re.props,
        null,
        K.mode,
        ce
      ), no(P, re), P.return = K, P);
    }
    function ie(K, P, re, ce) {
      return P === null || P.tag !== 4 || P.stateNode.containerInfo !== re.containerInfo || P.stateNode.implementation !== re.implementation ? (P = wf(re, K.mode, ce), P.return = K, P) : (P = f(P, re.children || []), P.return = K, P);
    }
    function ue(K, P, re, ce, He) {
      return P === null || P.tag !== 7 ? (P = si(
        re,
        K.mode,
        ce,
        He
      ), P.return = K, P) : (P = f(P, re), P.return = K, P);
    }
    function fe(K, P, re) {
      if (typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint")
        return P = xf(
          "" + P,
          K.mode,
          re
        ), P.return = K, P;
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case x:
            return re = js(
              P.type,
              P.key,
              P.props,
              null,
              K.mode,
              re
            ), no(re, P), re.return = K, re;
          case _:
            return P = wf(
              P,
              K.mode,
              re
            ), P.return = K, P;
          case D:
            return P = hi(P), fe(K, P, re);
        }
        if (Y(P) || Q(P))
          return P = si(
            P,
            K.mode,
            re,
            null
          ), P.return = K, P;
        if (typeof P.then == "function")
          return fe(K, Us(P), re);
        if (P.$$typeof === C)
          return fe(
            K,
            Ls(K, P),
            re
          );
        Vs(K, P);
      }
      return null;
    }
    function le(K, P, re, ce) {
      var He = P !== null ? P.key : null;
      if (typeof re == "string" && re !== "" || typeof re == "number" || typeof re == "bigint")
        return He !== null ? null : M(K, P, "" + re, ce);
      if (typeof re == "object" && re !== null) {
        switch (re.$$typeof) {
          case x:
            return re.key === He ? q(K, P, re, ce) : null;
          case _:
            return re.key === He ? ie(K, P, re, ce) : null;
          case D:
            return re = hi(re), le(K, P, re, ce);
        }
        if (Y(re) || Q(re))
          return He !== null ? null : ue(K, P, re, ce, null);
        if (typeof re.then == "function")
          return le(
            K,
            P,
            Us(re),
            ce
          );
        if (re.$$typeof === C)
          return le(
            K,
            P,
            Ls(K, re),
            ce
          );
        Vs(K, re);
      }
      return null;
    }
    function oe(K, P, re, ce, He) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return K = K.get(re) || null, M(P, K, "" + ce, He);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case x:
            return K = K.get(
              ce.key === null ? re : ce.key
            ) || null, q(P, K, ce, He);
          case _:
            return K = K.get(
              ce.key === null ? re : ce.key
            ) || null, ie(P, K, ce, He);
          case D:
            return ce = hi(ce), oe(
              K,
              P,
              re,
              ce,
              He
            );
        }
        if (Y(ce) || Q(ce))
          return K = K.get(re) || null, ue(P, K, ce, He, null);
        if (typeof ce.then == "function")
          return oe(
            K,
            P,
            re,
            Us(ce),
            He
          );
        if (ce.$$typeof === C)
          return oe(
            K,
            P,
            re,
            Ls(P, ce),
            He
          );
        Vs(P, ce);
      }
      return null;
    }
    function Te(K, P, re, ce) {
      for (var He = null, ft = null, je = P, Xe = P = 0, nt = null; je !== null && Xe < re.length; Xe++) {
        je.index > Xe ? (nt = je, je = null) : nt = je.sibling;
        var dt = le(
          K,
          je,
          re[Xe],
          ce
        );
        if (dt === null) {
          je === null && (je = nt);
          break;
        }
        t && je && dt.alternate === null && n(K, je), P = h(dt, P, Xe), ft === null ? He = dt : ft.sibling = dt, ft = dt, je = nt;
      }
      if (Xe === re.length)
        return r(K, je), it && Ka(K, Xe), He;
      if (je === null) {
        for (; Xe < re.length; Xe++)
          je = fe(K, re[Xe], ce), je !== null && (P = h(
            je,
            P,
            Xe
          ), ft === null ? He = je : ft.sibling = je, ft = je);
        return it && Ka(K, Xe), He;
      }
      for (je = o(je); Xe < re.length; Xe++)
        nt = oe(
          je,
          K,
          Xe,
          re[Xe],
          ce
        ), nt !== null && (t && nt.alternate !== null && je.delete(
          nt.key === null ? Xe : nt.key
        ), P = h(
          nt,
          P,
          Xe
        ), ft === null ? He = nt : ft.sibling = nt, ft = nt);
      return t && je.forEach(function(Zr) {
        return n(K, Zr);
      }), it && Ka(K, Xe), He;
    }
    function Ue(K, P, re, ce) {
      if (re == null) throw Error(l(151));
      for (var He = null, ft = null, je = P, Xe = P = 0, nt = null, dt = re.next(); je !== null && !dt.done; Xe++, dt = re.next()) {
        je.index > Xe ? (nt = je, je = null) : nt = je.sibling;
        var Zr = le(K, je, dt.value, ce);
        if (Zr === null) {
          je === null && (je = nt);
          break;
        }
        t && je && Zr.alternate === null && n(K, je), P = h(Zr, P, Xe), ft === null ? He = Zr : ft.sibling = Zr, ft = Zr, je = nt;
      }
      if (dt.done)
        return r(K, je), it && Ka(K, Xe), He;
      if (je === null) {
        for (; !dt.done; Xe++, dt = re.next())
          dt = fe(K, dt.value, ce), dt !== null && (P = h(dt, P, Xe), ft === null ? He = dt : ft.sibling = dt, ft = dt);
        return it && Ka(K, Xe), He;
      }
      for (je = o(je); !dt.done; Xe++, dt = re.next())
        dt = oe(je, K, Xe, dt.value, ce), dt !== null && (t && dt.alternate !== null && je.delete(dt.key === null ? Xe : dt.key), P = h(dt, P, Xe), ft === null ? He = dt : ft.sibling = dt, ft = dt);
      return t && je.forEach(function(KE) {
        return n(K, KE);
      }), it && Ka(K, Xe), He;
    }
    function Nt(K, P, re, ce) {
      if (typeof re == "object" && re !== null && re.type === E && re.key === null && (re = re.props.children), typeof re == "object" && re !== null) {
        switch (re.$$typeof) {
          case x:
            e: {
              for (var He = re.key; P !== null; ) {
                if (P.key === He) {
                  if (He = re.type, He === E) {
                    if (P.tag === 7) {
                      r(
                        K,
                        P.sibling
                      ), ce = f(
                        P,
                        re.props.children
                      ), ce.return = K, K = ce;
                      break e;
                    }
                  } else if (P.elementType === He || typeof He == "object" && He !== null && He.$$typeof === D && hi(He) === P.type) {
                    r(
                      K,
                      P.sibling
                    ), ce = f(P, re.props), no(ce, re), ce.return = K, K = ce;
                    break e;
                  }
                  r(K, P);
                  break;
                } else n(K, P);
                P = P.sibling;
              }
              re.type === E ? (ce = si(
                re.props.children,
                K.mode,
                ce,
                re.key
              ), ce.return = K, K = ce) : (ce = js(
                re.type,
                re.key,
                re.props,
                null,
                K.mode,
                ce
              ), no(ce, re), ce.return = K, K = ce);
            }
            return w(K);
          case _:
            e: {
              for (He = re.key; P !== null; ) {
                if (P.key === He)
                  if (P.tag === 4 && P.stateNode.containerInfo === re.containerInfo && P.stateNode.implementation === re.implementation) {
                    r(
                      K,
                      P.sibling
                    ), ce = f(P, re.children || []), ce.return = K, K = ce;
                    break e;
                  } else {
                    r(K, P);
                    break;
                  }
                else n(K, P);
                P = P.sibling;
              }
              ce = wf(re, K.mode, ce), ce.return = K, K = ce;
            }
            return w(K);
          case D:
            return re = hi(re), Nt(
              K,
              P,
              re,
              ce
            );
        }
        if (Y(re))
          return Te(
            K,
            P,
            re,
            ce
          );
        if (Q(re)) {
          if (He = Q(re), typeof He != "function") throw Error(l(150));
          return re = He.call(re), Ue(
            K,
            P,
            re,
            ce
          );
        }
        if (typeof re.then == "function")
          return Nt(
            K,
            P,
            Us(re),
            ce
          );
        if (re.$$typeof === C)
          return Nt(
            K,
            P,
            Ls(K, re),
            ce
          );
        Vs(K, re);
      }
      return typeof re == "string" && re !== "" || typeof re == "number" || typeof re == "bigint" ? (re = "" + re, P !== null && P.tag === 6 ? (r(K, P.sibling), ce = f(P, re), ce.return = K, K = ce) : (r(K, P), ce = xf(re, K.mode, ce), ce.return = K, K = ce), w(K)) : r(K, P);
    }
    return function(K, P, re, ce) {
      try {
        to = 0;
        var He = Nt(
          K,
          P,
          re,
          ce
        );
        return Wi = null, He;
      } catch (je) {
        if (je === Ki || je === Hs) throw je;
        var ft = Un(29, je, null, K.mode);
        return ft.lanes = ce, ft.return = K, ft;
      } finally {
      }
    };
  }
  var pi = dg(!0), hg = dg(!1), jr = !1;
  function Of(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function zf(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Or(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function zr(t, n, r) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (mt & 2) !== 0) {
      var f = o.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), o.pending = n, n = As(t), Qp(t, null, r), n;
    }
    return Ds(t, o, n, r), As(t);
  }
  function ao(t, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, r |= o, n.lanes = r, en(t, r);
    }
  }
  function Lf(t, n) {
    var r = t.updateQueue, o = t.alternate;
    if (o !== null && (o = o.updateQueue, r === o)) {
      var f = null, h = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var w = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          };
          h === null ? f = h = w : h = h.next = w, r = r.next;
        } while (r !== null);
        h === null ? f = h = n : h = h.next = n;
      } else f = h = n;
      r = {
        baseState: o.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: h,
        shared: o.shared,
        callbacks: o.callbacks
      }, t.updateQueue = r;
      return;
    }
    t = r.lastBaseUpdate, t === null ? r.firstBaseUpdate = n : t.next = n, r.lastBaseUpdate = n;
  }
  var kf = !1;
  function ro() {
    if (kf) {
      var t = Qi;
      if (t !== null) throw t;
    }
  }
  function io(t, n, r, o) {
    kf = !1;
    var f = t.updateQueue;
    jr = !1;
    var h = f.firstBaseUpdate, w = f.lastBaseUpdate, M = f.shared.pending;
    if (M !== null) {
      f.shared.pending = null;
      var q = M, ie = q.next;
      q.next = null, w === null ? h = ie : w.next = ie, w = q;
      var ue = t.alternate;
      ue !== null && (ue = ue.updateQueue, M = ue.lastBaseUpdate, M !== w && (M === null ? ue.firstBaseUpdate = ie : M.next = ie, ue.lastBaseUpdate = q));
    }
    if (h !== null) {
      var fe = f.baseState;
      w = 0, ue = ie = q = null, M = h;
      do {
        var le = M.lane & -536870913, oe = le !== M.lane;
        if (oe ? (tt & le) === le : (o & le) === le) {
          le !== 0 && le === Zi && (kf = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: null,
            next: null
          });
          e: {
            var Te = t, Ue = M;
            le = n;
            var Nt = r;
            switch (Ue.tag) {
              case 1:
                if (Te = Ue.payload, typeof Te == "function") {
                  fe = Te.call(Nt, fe, le);
                  break e;
                }
                fe = Te;
                break e;
              case 3:
                Te.flags = Te.flags & -65537 | 128;
              case 0:
                if (Te = Ue.payload, le = typeof Te == "function" ? Te.call(Nt, fe, le) : Te, le == null) break e;
                fe = g({}, fe, le);
                break e;
              case 2:
                jr = !0;
            }
          }
          le = M.callback, le !== null && (t.flags |= 64, oe && (t.flags |= 8192), oe = f.callbacks, oe === null ? f.callbacks = [le] : oe.push(le));
        } else
          oe = {
            lane: le,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          }, ue === null ? (ie = ue = oe, q = fe) : ue = ue.next = oe, w |= le;
        if (M = M.next, M === null) {
          if (M = f.shared.pending, M === null)
            break;
          oe = M, M = oe.next, oe.next = null, f.lastBaseUpdate = oe, f.shared.pending = null;
        }
      } while (!0);
      ue === null && (q = fe), f.baseState = q, f.firstBaseUpdate = ie, f.lastBaseUpdate = ue, h === null && (f.shared.lanes = 0), Ur |= w, t.lanes = w, t.memoizedState = fe;
    }
  }
  function mg(t, n) {
    if (typeof t != "function")
      throw Error(l(191, t));
    t.call(n);
  }
  function pg(t, n) {
    var r = t.callbacks;
    if (r !== null)
      for (t.callbacks = null, t = 0; t < r.length; t++)
        mg(r[t], n);
  }
  var Ji = A(null), $s = A(0);
  function gg(t, n) {
    t = sr, G($s, t), G(Ji, n), sr = t | n.baseLanes;
  }
  function Hf() {
    G($s, sr), G(Ji, Ji.current);
  }
  function Bf() {
    sr = $s.current, k(Ji), k($s);
  }
  var Vn = A(null), aa = null;
  function Lr(t) {
    var n = t.alternate;
    G($t, $t.current & 1), G(Vn, t), aa === null && (n === null || Ji.current !== null || n.memoizedState !== null) && (aa = t);
  }
  function Uf(t) {
    G($t, $t.current), G(Vn, t), aa === null && (aa = t);
  }
  function vg(t) {
    t.tag === 22 ? (G($t, $t.current), G(Vn, t), aa === null && (aa = t)) : kr();
  }
  function kr() {
    G($t, $t.current), G(Vn, Vn.current);
  }
  function $n(t) {
    k(Vn), aa === t && (aa = null), k($t);
  }
  var $t = A(0);
  function qs(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Gd(r) || Fd(r)))
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
  var er = 0, Ge = null, St = null, Ft = null, Is = !1, el = !1, gi = !1, Ys = 0, lo = 0, tl = null, $S = 0;
  function Ht() {
    throw Error(l(321));
  }
  function Vf(t, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < t.length; r++)
      if (!Bn(t[r], n[r])) return !1;
    return !0;
  }
  function $f(t, n, r, o, f, h) {
    return er = h, Ge = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, T.H = t === null || t.memoizedState === null ? e0 : nd, gi = !1, h = r(o, f), gi = !1, el && (h = bg(
      n,
      r,
      o,
      f
    )), yg(t), h;
  }
  function yg(t) {
    T.H = uo;
    var n = St !== null && St.next !== null;
    if (er = 0, Ft = St = Ge = null, Is = !1, lo = 0, tl = null, n) throw Error(l(300));
    t === null || Xt || (t = t.dependencies, t !== null && zs(t) && (Xt = !0));
  }
  function bg(t, n, r, o) {
    Ge = t;
    var f = 0;
    do {
      if (el && (tl = null), lo = 0, el = !1, 25 <= f) throw Error(l(301));
      if (f += 1, Ft = St = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      T.H = t0, h = n(r, o);
    } while (el);
    return h;
  }
  function qS() {
    var t = T.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? oo(n) : n, t = t.useState()[0], (St !== null ? St.memoizedState : null) !== t && (Ge.flags |= 1024), n;
  }
  function qf() {
    var t = Ys !== 0;
    return Ys = 0, t;
  }
  function If(t, n, r) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~r;
  }
  function Yf(t) {
    if (Is) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      Is = !1;
    }
    er = 0, Ft = St = Ge = null, el = !1, lo = Ys = 0, tl = null;
  }
  function yn() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ft === null ? Ge.memoizedState = Ft = t : Ft = Ft.next = t, Ft;
  }
  function qt() {
    if (St === null) {
      var t = Ge.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = St.next;
    var n = Ft === null ? Ge.memoizedState : Ft.next;
    if (n !== null)
      Ft = n, St = t;
    else {
      if (t === null)
        throw Ge.alternate === null ? Error(l(467)) : Error(l(310));
      St = t, t = {
        memoizedState: St.memoizedState,
        baseState: St.baseState,
        baseQueue: St.baseQueue,
        queue: St.queue,
        next: null
      }, Ft === null ? Ge.memoizedState = Ft = t : Ft = Ft.next = t;
    }
    return Ft;
  }
  function Gs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function oo(t) {
    var n = lo;
    return lo += 1, tl === null && (tl = []), t = ug(tl, t, n), n = Ge, (Ft === null ? n.memoizedState : Ft.next) === null && (n = n.alternate, T.H = n === null || n.memoizedState === null ? e0 : nd), t;
  }
  function Fs(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return oo(t);
      if (t.$$typeof === C) return on(t);
    }
    throw Error(l(438, String(t)));
  }
  function Gf(t) {
    var n = null, r = Ge.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var o = Ge.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(f) {
          return f.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = Gs(), Ge.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(t), o = 0; o < t; o++)
        r[o] = J;
    return n.index++, r;
  }
  function tr(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function Xs(t) {
    var n = qt();
    return Ff(n, St, t);
  }
  function Ff(t, n, r) {
    var o = t.queue;
    if (o === null) throw Error(l(311));
    o.lastRenderedReducer = r;
    var f = t.baseQueue, h = o.pending;
    if (h !== null) {
      if (f !== null) {
        var w = f.next;
        f.next = h.next, h.next = w;
      }
      n.baseQueue = f = h, o.pending = null;
    }
    if (h = t.baseState, f === null) t.memoizedState = h;
    else {
      n = f.next;
      var M = w = null, q = null, ie = n, ue = !1;
      do {
        var fe = ie.lane & -536870913;
        if (fe !== ie.lane ? (tt & fe) === fe : (er & fe) === fe) {
          var le = ie.revertLane;
          if (le === 0)
            q !== null && (q = q.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ie.action,
              hasEagerState: ie.hasEagerState,
              eagerState: ie.eagerState,
              next: null
            }), fe === Zi && (ue = !0);
          else if ((er & le) === le) {
            ie = ie.next, le === Zi && (ue = !0);
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
            }, q === null ? (M = q = fe, w = h) : q = q.next = fe, Ge.lanes |= le, Ur |= le;
          fe = ie.action, gi && r(h, fe), h = ie.hasEagerState ? ie.eagerState : r(h, fe);
        } else
          le = {
            lane: fe,
            revertLane: ie.revertLane,
            gesture: ie.gesture,
            action: ie.action,
            hasEagerState: ie.hasEagerState,
            eagerState: ie.eagerState,
            next: null
          }, q === null ? (M = q = le, w = h) : q = q.next = le, Ge.lanes |= fe, Ur |= fe;
        ie = ie.next;
      } while (ie !== null && ie !== n);
      if (q === null ? w = h : q.next = M, !Bn(h, t.memoizedState) && (Xt = !0, ue && (r = Qi, r !== null)))
        throw r;
      t.memoizedState = h, t.baseState = w, t.baseQueue = q, o.lastRenderedState = h;
    }
    return f === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function Xf(t) {
    var n = qt(), r = n.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = t;
    var o = r.dispatch, f = r.pending, h = n.memoizedState;
    if (f !== null) {
      r.pending = null;
      var w = f = f.next;
      do
        h = t(h, w.action), w = w.next;
      while (w !== f);
      Bn(h, n.memoizedState) || (Xt = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), r.lastRenderedState = h;
    }
    return [h, o];
  }
  function xg(t, n, r) {
    var o = Ge, f = qt(), h = it;
    if (h) {
      if (r === void 0) throw Error(l(407));
      r = r();
    } else r = n();
    var w = !Bn(
      (St || f).memoizedState,
      r
    );
    if (w && (f.memoizedState = r, Xt = !0), f = f.queue, Qf(Sg.bind(null, o, f, t), [
      t
    ]), f.getSnapshot !== n || w || Ft !== null && Ft.memoizedState.tag & 1) {
      if (o.flags |= 2048, nl(
        9,
        { destroy: void 0 },
        _g.bind(
          null,
          o,
          f,
          r,
          n
        ),
        null
      ), Rt === null) throw Error(l(349));
      h || (er & 127) !== 0 || wg(o, n, r);
    }
    return r;
  }
  function wg(t, n, r) {
    t.flags |= 16384, t = { getSnapshot: n, value: r }, n = Ge.updateQueue, n === null ? (n = Gs(), Ge.updateQueue = n, n.stores = [t]) : (r = n.stores, r === null ? n.stores = [t] : r.push(t));
  }
  function _g(t, n, r, o) {
    n.value = r, n.getSnapshot = o, Eg(n) && Ng(t);
  }
  function Sg(t, n, r) {
    return r(function() {
      Eg(n) && Ng(t);
    });
  }
  function Eg(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var r = n();
      return !Bn(t, r);
    } catch {
      return !0;
    }
  }
  function Ng(t) {
    var n = oi(t, 2);
    n !== null && An(n, t, 2);
  }
  function Pf(t) {
    var n = yn();
    if (typeof t == "function") {
      var r = t;
      if (t = r(), gi) {
        Ot(!0);
        try {
          r();
        } finally {
          Ot(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: tr,
      lastRenderedState: t
    }, n;
  }
  function Cg(t, n, r, o) {
    return t.baseState = r, Ff(
      t,
      St,
      typeof o == "function" ? o : tr
    );
  }
  function IS(t, n, r, o, f) {
    if (Qs(t)) throw Error(l(485));
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
        then: function(w) {
          h.listeners.push(w);
        }
      };
      T.T !== null ? r(!0) : h.isTransition = !1, o(h), r = n.pending, r === null ? (h.next = n.pending = h, Rg(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function Rg(t, n) {
    var r = n.action, o = n.payload, f = t.state;
    if (n.isTransition) {
      var h = T.T, w = {};
      T.T = w;
      try {
        var M = r(f, o), q = T.S;
        q !== null && q(w, M), Tg(t, n, M);
      } catch (ie) {
        Zf(t, n, ie);
      } finally {
        h !== null && w.types !== null && (h.types = w.types), T.T = h;
      }
    } else
      try {
        h = r(f, o), Tg(t, n, h);
      } catch (ie) {
        Zf(t, n, ie);
      }
  }
  function Tg(t, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(o) {
        Mg(t, n, o);
      },
      function(o) {
        return Zf(t, n, o);
      }
    ) : Mg(t, n, r);
  }
  function Mg(t, n, r) {
    n.status = "fulfilled", n.value = r, Dg(n), t.state = r, n = t.pending, n !== null && (r = n.next, r === n ? t.pending = null : (r = r.next, n.next = r, Rg(t, r)));
  }
  function Zf(t, n, r) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = r, Dg(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function Dg(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Ag(t, n) {
    return n;
  }
  function jg(t, n) {
    if (it) {
      var r = Rt.formState;
      if (r !== null) {
        e: {
          var o = Ge;
          if (it) {
            if (Tt) {
              t: {
                for (var f = Tt, h = na; f.nodeType !== 8; ) {
                  if (!h) {
                    f = null;
                    break t;
                  }
                  if (f = ra(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                h = f.data, f = h === "F!" || h === "F" ? f : null;
              }
              if (f) {
                Tt = ra(
                  f.nextSibling
                ), o = f.data === "F!";
                break e;
              }
            }
            Dr(o);
          }
          o = !1;
        }
        o && (n = r[0]);
      }
    }
    return r = yn(), r.memoizedState = r.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ag,
      lastRenderedState: n
    }, r.queue = o, r = Kg.bind(
      null,
      Ge,
      o
    ), o.dispatch = r, o = Pf(!1), h = td.bind(
      null,
      Ge,
      !1,
      o.queue
    ), o = yn(), f = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = f, r = IS.bind(
      null,
      Ge,
      f,
      h,
      r
    ), f.dispatch = r, o.memoizedState = t, [n, r, !1];
  }
  function Og(t) {
    var n = qt();
    return zg(n, St, t);
  }
  function zg(t, n, r) {
    if (n = Ff(
      t,
      n,
      Ag
    )[0], t = Xs(tr)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = oo(n);
      } catch (w) {
        throw w === Ki ? Hs : w;
      }
    else o = n;
    n = qt();
    var f = n.queue, h = f.dispatch;
    return r !== n.memoizedState && (Ge.flags |= 2048, nl(
      9,
      { destroy: void 0 },
      YS.bind(null, f, r),
      null
    )), [o, h, t];
  }
  function YS(t, n) {
    t.action = n;
  }
  function Lg(t) {
    var n = qt(), r = St;
    if (r !== null)
      return zg(n, r, t);
    qt(), n = n.memoizedState, r = qt();
    var o = r.queue.dispatch;
    return r.memoizedState = t, [n, o, !1];
  }
  function nl(t, n, r, o) {
    return t = { tag: t, create: r, deps: o, inst: n, next: null }, n = Ge.updateQueue, n === null && (n = Gs(), Ge.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = t.next = t : (o = r.next, r.next = t, t.next = o, n.lastEffect = t), t;
  }
  function kg() {
    return qt().memoizedState;
  }
  function Ps(t, n, r, o) {
    var f = yn();
    Ge.flags |= t, f.memoizedState = nl(
      1 | n,
      { destroy: void 0 },
      r,
      o === void 0 ? null : o
    );
  }
  function Zs(t, n, r, o) {
    var f = qt();
    o = o === void 0 ? null : o;
    var h = f.memoizedState.inst;
    St !== null && o !== null && Vf(o, St.memoizedState.deps) ? f.memoizedState = nl(n, h, r, o) : (Ge.flags |= t, f.memoizedState = nl(
      1 | n,
      h,
      r,
      o
    ));
  }
  function Hg(t, n) {
    Ps(8390656, 8, t, n);
  }
  function Qf(t, n) {
    Zs(2048, 8, t, n);
  }
  function GS(t) {
    Ge.flags |= 4;
    var n = Ge.updateQueue;
    if (n === null)
      n = Gs(), Ge.updateQueue = n, n.events = [t];
    else {
      var r = n.events;
      r === null ? n.events = [t] : r.push(t);
    }
  }
  function Bg(t) {
    var n = qt().memoizedState;
    return GS({ ref: n, nextImpl: t }), function() {
      if ((mt & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Ug(t, n) {
    return Zs(4, 2, t, n);
  }
  function Vg(t, n) {
    return Zs(4, 4, t, n);
  }
  function $g(t, n) {
    if (typeof n == "function") {
      t = t();
      var r = n(t);
      return function() {
        typeof r == "function" ? r() : n(null);
      };
    }
    if (n != null)
      return t = t(), n.current = t, function() {
        n.current = null;
      };
  }
  function qg(t, n, r) {
    r = r != null ? r.concat([t]) : null, Zs(4, 4, $g.bind(null, n, t), r);
  }
  function Kf() {
  }
  function Ig(t, n) {
    var r = qt();
    n = n === void 0 ? null : n;
    var o = r.memoizedState;
    return n !== null && Vf(n, o[1]) ? o[0] : (r.memoizedState = [t, n], t);
  }
  function Yg(t, n) {
    var r = qt();
    n = n === void 0 ? null : n;
    var o = r.memoizedState;
    if (n !== null && Vf(n, o[1]))
      return o[0];
    if (o = t(), gi) {
      Ot(!0);
      try {
        t();
      } finally {
        Ot(!1);
      }
    }
    return r.memoizedState = [o, n], o;
  }
  function Wf(t, n, r) {
    return r === void 0 || (er & 1073741824) !== 0 && (tt & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = r, t = G0(), Ge.lanes |= t, Ur |= t, r);
  }
  function Gg(t, n, r, o) {
    return Bn(r, n) ? r : Ji.current !== null ? (t = Wf(t, r, o), Bn(t, n) || (Xt = !0), t) : (er & 42) === 0 || (er & 1073741824) !== 0 && (tt & 261930) === 0 ? (Xt = !0, t.memoizedState = r) : (t = G0(), Ge.lanes |= t, Ur |= t, n);
  }
  function Fg(t, n, r, o, f) {
    var h = z.p;
    z.p = h !== 0 && 8 > h ? h : 8;
    var w = T.T, M = {};
    T.T = M, td(t, !1, n, r);
    try {
      var q = f(), ie = T.S;
      if (ie !== null && ie(M, q), q !== null && typeof q == "object" && typeof q.then == "function") {
        var ue = VS(
          q,
          o
        );
        so(
          t,
          n,
          ue,
          Yn(t)
        );
      } else
        so(
          t,
          n,
          o,
          Yn(t)
        );
    } catch (fe) {
      so(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        Yn()
      );
    } finally {
      z.p = h, w !== null && M.types !== null && (w.types = M.types), T.T = w;
    }
  }
  function FS() {
  }
  function Jf(t, n, r, o) {
    if (t.tag !== 5) throw Error(l(476));
    var f = Xg(t).queue;
    Fg(
      t,
      f,
      n,
      F,
      r === null ? FS : function() {
        return Pg(t), r(o);
      }
    );
  }
  function Xg(t) {
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
        lastRenderedReducer: tr,
        lastRenderedState: F
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
        lastRenderedReducer: tr,
        lastRenderedState: r
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function Pg(t) {
    var n = Xg(t);
    n.next === null && (n = t.alternate.memoizedState), so(
      t,
      n.next.queue,
      {},
      Yn()
    );
  }
  function ed() {
    return on(Co);
  }
  function Zg() {
    return qt().memoizedState;
  }
  function Qg() {
    return qt().memoizedState;
  }
  function XS(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Yn();
          t = Or(r);
          var o = zr(n, t, r);
          o !== null && (An(o, n, r), ao(o, n, r)), n = { cache: Mf() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function PS(t, n, r) {
    var o = Yn();
    r = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qs(t) ? Wg(n, r) : (r = yf(t, n, r, o), r !== null && (An(r, t, o), Jg(r, n, o)));
  }
  function Kg(t, n, r) {
    var o = Yn();
    so(t, n, r, o);
  }
  function so(t, n, r, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Qs(t)) Wg(n, f);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var w = n.lastRenderedState, M = h(w, r);
          if (f.hasEagerState = !0, f.eagerState = M, Bn(M, w))
            return Ds(t, n, f, 0), Rt === null && Ms(), !1;
        } catch {
        } finally {
        }
      if (r = yf(t, n, f, o), r !== null)
        return An(r, t, o), Jg(r, n, o), !0;
    }
    return !1;
  }
  function td(t, n, r, o) {
    if (o = {
      lane: 2,
      revertLane: Od(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qs(t)) {
      if (n) throw Error(l(479));
    } else
      n = yf(
        t,
        r,
        o,
        2
      ), n !== null && An(n, t, 2);
  }
  function Qs(t) {
    var n = t.alternate;
    return t === Ge || n !== null && n === Ge;
  }
  function Wg(t, n) {
    el = Is = !0;
    var r = t.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), t.pending = n;
  }
  function Jg(t, n, r) {
    if ((r & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, r |= o, n.lanes = r, en(t, r);
    }
  }
  var uo = {
    readContext: on,
    use: Fs,
    useCallback: Ht,
    useContext: Ht,
    useEffect: Ht,
    useImperativeHandle: Ht,
    useLayoutEffect: Ht,
    useInsertionEffect: Ht,
    useMemo: Ht,
    useReducer: Ht,
    useRef: Ht,
    useState: Ht,
    useDebugValue: Ht,
    useDeferredValue: Ht,
    useTransition: Ht,
    useSyncExternalStore: Ht,
    useId: Ht,
    useHostTransitionStatus: Ht,
    useFormState: Ht,
    useActionState: Ht,
    useOptimistic: Ht,
    useMemoCache: Ht,
    useCacheRefresh: Ht
  };
  uo.useEffectEvent = Ht;
  var e0 = {
    readContext: on,
    use: Fs,
    useCallback: function(t, n) {
      return yn().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: on,
    useEffect: Hg,
    useImperativeHandle: function(t, n, r) {
      r = r != null ? r.concat([t]) : null, Ps(
        4194308,
        4,
        $g.bind(null, n, t),
        r
      );
    },
    useLayoutEffect: function(t, n) {
      return Ps(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      Ps(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var r = yn();
      n = n === void 0 ? null : n;
      var o = t();
      if (gi) {
        Ot(!0);
        try {
          t();
        } finally {
          Ot(!1);
        }
      }
      return r.memoizedState = [o, n], o;
    },
    useReducer: function(t, n, r) {
      var o = yn();
      if (r !== void 0) {
        var f = r(n);
        if (gi) {
          Ot(!0);
          try {
            r(n);
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
      }, o.queue = t, t = t.dispatch = PS.bind(
        null,
        Ge,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = yn();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Pf(t);
      var n = t.queue, r = Kg.bind(null, Ge, n);
      return n.dispatch = r, [t.memoizedState, r];
    },
    useDebugValue: Kf,
    useDeferredValue: function(t, n) {
      var r = yn();
      return Wf(r, t, n);
    },
    useTransition: function() {
      var t = Pf(!1);
      return t = Fg.bind(
        null,
        Ge,
        t.queue,
        !0,
        !1
      ), yn().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, r) {
      var o = Ge, f = yn();
      if (it) {
        if (r === void 0)
          throw Error(l(407));
        r = r();
      } else {
        if (r = n(), Rt === null)
          throw Error(l(349));
        (tt & 127) !== 0 || wg(o, n, r);
      }
      f.memoizedState = r;
      var h = { value: r, getSnapshot: n };
      return f.queue = h, Hg(Sg.bind(null, o, h, t), [
        t
      ]), o.flags |= 2048, nl(
        9,
        { destroy: void 0 },
        _g.bind(
          null,
          o,
          h,
          r,
          n
        ),
        null
      ), r;
    },
    useId: function() {
      var t = yn(), n = Rt.identifierPrefix;
      if (it) {
        var r = za, o = Oa;
        r = (o & ~(1 << 32 - Ut(o) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = Ys++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = $S++, n = "_" + n + "r_" + r.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: ed,
    useFormState: jg,
    useActionState: jg,
    useOptimistic: function(t) {
      var n = yn();
      n.memoizedState = n.baseState = t;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = r, n = td.bind(
        null,
        Ge,
        !0,
        r
      ), r.dispatch = n, [t, n];
    },
    useMemoCache: Gf,
    useCacheRefresh: function() {
      return yn().memoizedState = XS.bind(
        null,
        Ge
      );
    },
    useEffectEvent: function(t) {
      var n = yn(), r = { impl: t };
      return n.memoizedState = r, function() {
        if ((mt & 2) !== 0)
          throw Error(l(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, nd = {
    readContext: on,
    use: Fs,
    useCallback: Ig,
    useContext: on,
    useEffect: Qf,
    useImperativeHandle: qg,
    useInsertionEffect: Ug,
    useLayoutEffect: Vg,
    useMemo: Yg,
    useReducer: Xs,
    useRef: kg,
    useState: function() {
      return Xs(tr);
    },
    useDebugValue: Kf,
    useDeferredValue: function(t, n) {
      var r = qt();
      return Gg(
        r,
        St.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Xs(tr)[0], n = qt().memoizedState;
      return [
        typeof t == "boolean" ? t : oo(t),
        n
      ];
    },
    useSyncExternalStore: xg,
    useId: Zg,
    useHostTransitionStatus: ed,
    useFormState: Og,
    useActionState: Og,
    useOptimistic: function(t, n) {
      var r = qt();
      return Cg(r, St, t, n);
    },
    useMemoCache: Gf,
    useCacheRefresh: Qg
  };
  nd.useEffectEvent = Bg;
  var t0 = {
    readContext: on,
    use: Fs,
    useCallback: Ig,
    useContext: on,
    useEffect: Qf,
    useImperativeHandle: qg,
    useInsertionEffect: Ug,
    useLayoutEffect: Vg,
    useMemo: Yg,
    useReducer: Xf,
    useRef: kg,
    useState: function() {
      return Xf(tr);
    },
    useDebugValue: Kf,
    useDeferredValue: function(t, n) {
      var r = qt();
      return St === null ? Wf(r, t, n) : Gg(
        r,
        St.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Xf(tr)[0], n = qt().memoizedState;
      return [
        typeof t == "boolean" ? t : oo(t),
        n
      ];
    },
    useSyncExternalStore: xg,
    useId: Zg,
    useHostTransitionStatus: ed,
    useFormState: Lg,
    useActionState: Lg,
    useOptimistic: function(t, n) {
      var r = qt();
      return St !== null ? Cg(r, St, t, n) : (r.baseState = t, [t, r.queue.dispatch]);
    },
    useMemoCache: Gf,
    useCacheRefresh: Qg
  };
  t0.useEffectEvent = Bg;
  function ad(t, n, r, o) {
    n = t.memoizedState, r = r(o, n), r = r == null ? n : g({}, n, r), t.memoizedState = r, t.lanes === 0 && (t.updateQueue.baseState = r);
  }
  var rd = {
    enqueueSetState: function(t, n, r) {
      t = t._reactInternals;
      var o = Yn(), f = Or(o);
      f.payload = n, r != null && (f.callback = r), n = zr(t, f, o), n !== null && (An(n, t, o), ao(n, t, o));
    },
    enqueueReplaceState: function(t, n, r) {
      t = t._reactInternals;
      var o = Yn(), f = Or(o);
      f.tag = 1, f.payload = n, r != null && (f.callback = r), n = zr(t, f, o), n !== null && (An(n, t, o), ao(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var r = Yn(), o = Or(r);
      o.tag = 2, n != null && (o.callback = n), n = zr(t, o, r), n !== null && (An(n, t, r), ao(n, t, r));
    }
  };
  function n0(t, n, r, o, f, h, w) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, h, w) : n.prototype && n.prototype.isPureReactComponent ? !Zl(r, o) || !Zl(f, h) : !0;
  }
  function a0(t, n, r, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, o), n.state !== t && rd.enqueueReplaceState(n, n.state, null);
  }
  function vi(t, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var o in n)
        o !== "ref" && (r[o] = n[o]);
    }
    if (t = t.defaultProps) {
      r === n && (r = g({}, r));
      for (var f in t)
        r[f] === void 0 && (r[f] = t[f]);
    }
    return r;
  }
  function r0(t) {
    Ts(t);
  }
  function i0(t) {
    console.error(t);
  }
  function l0(t) {
    Ts(t);
  }
  function Ks(t, n) {
    try {
      var r = t.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function o0(t, n, r) {
    try {
      var o = t.onCaughtError;
      o(r.value, {
        componentStack: r.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (f) {
      setTimeout(function() {
        throw f;
      });
    }
  }
  function id(t, n, r) {
    return r = Or(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      Ks(t, n);
    }, r;
  }
  function s0(t) {
    return t = Or(t), t.tag = 3, t;
  }
  function u0(t, n, r, o) {
    var f = r.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = o.value;
      t.payload = function() {
        return f(h);
      }, t.callback = function() {
        o0(n, r, o);
      };
    }
    var w = r.stateNode;
    w !== null && typeof w.componentDidCatch == "function" && (t.callback = function() {
      o0(n, r, o), typeof f != "function" && (Vr === null ? Vr = /* @__PURE__ */ new Set([this]) : Vr.add(this));
      var M = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: M !== null ? M : ""
      });
    });
  }
  function ZS(t, n, r, o, f) {
    if (r.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = r.alternate, n !== null && Pi(
        n,
        r,
        f,
        !0
      ), r = Vn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return aa === null ? uu() : r.alternate === null && Bt === 0 && (Bt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = f, o === Bs ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), Dd(t, o, f)), !1;
          case 22:
            return r.flags |= 65536, o === Bs ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : r.add(o)), Dd(t, o, f)), !1;
        }
        throw Error(l(435, r.tag));
      }
      return Dd(t, o, f), uu(), !1;
    }
    if (it)
      return n = Vn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, o !== Ef && (t = Error(l(422), { cause: o }), Wl(Jn(t, r)))) : (o !== Ef && (n = Error(l(423), {
        cause: o
      }), Wl(
        Jn(n, r)
      )), t = t.current.alternate, t.flags |= 65536, f &= -f, t.lanes |= f, o = Jn(o, r), f = id(
        t.stateNode,
        o,
        f
      ), Lf(t, f), Bt !== 4 && (Bt = 2)), !1;
    var h = Error(l(520), { cause: o });
    if (h = Jn(h, r), yo === null ? yo = [h] : yo.push(h), Bt !== 4 && (Bt = 2), n === null) return !0;
    o = Jn(o, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, t = f & -f, r.lanes |= t, t = id(r.stateNode, o, t), Lf(r, t), !1;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (Vr === null || !Vr.has(h))))
            return r.flags |= 65536, f &= -f, r.lanes |= f, f = s0(f), u0(
              f,
              t,
              r,
              o
            ), Lf(r, f), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var ld = Error(l(461)), Xt = !1;
  function sn(t, n, r, o) {
    n.child = t === null ? hg(n, null, r, o) : pi(
      n,
      t.child,
      r,
      o
    );
  }
  function c0(t, n, r, o, f) {
    r = r.render;
    var h = n.ref;
    if ("ref" in o) {
      var w = {};
      for (var M in o)
        M !== "ref" && (w[M] = o[M]);
    } else w = o;
    return fi(n), o = $f(
      t,
      n,
      r,
      w,
      h,
      f
    ), M = qf(), t !== null && !Xt ? (If(t, n, f), nr(t, n, f)) : (it && M && _f(n), n.flags |= 1, sn(t, n, o, f), n.child);
  }
  function f0(t, n, r, o, f) {
    if (t === null) {
      var h = r.type;
      return typeof h == "function" && !bf(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, d0(
        t,
        n,
        h,
        o,
        f
      )) : (t = js(
        r.type,
        null,
        o,
        n,
        n.mode,
        f
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (h = t.child, !md(t, f)) {
      var w = h.memoizedProps;
      if (r = r.compare, r = r !== null ? r : Zl, r(w, o) && t.ref === n.ref)
        return nr(t, n, f);
    }
    return n.flags |= 1, t = Qa(h, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function d0(t, n, r, o, f) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (Zl(h, o) && t.ref === n.ref)
        if (Xt = !1, n.pendingProps = o = h, md(t, f))
          (t.flags & 131072) !== 0 && (Xt = !0);
        else
          return n.lanes = t.lanes, nr(t, n, f);
    }
    return od(
      t,
      n,
      r,
      o,
      f
    );
  }
  function h0(t, n, r, o) {
    var f = o.children, h = t !== null ? t.memoizedState : null;
    if (t === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (h = h !== null ? h.baseLanes | r : r, t !== null) {
          for (o = n.child = t.child, f = 0; o !== null; )
            f = f | o.lanes | o.childLanes, o = o.sibling;
          o = f & ~h;
        } else o = 0, n.child = null;
        return m0(
          t,
          n,
          h,
          r,
          o
        );
      }
      if ((r & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && ks(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? gg(n, h) : Hf(), vg(n);
      else
        return o = n.lanes = 536870912, m0(
          t,
          n,
          h !== null ? h.baseLanes | r : r,
          r,
          o
        );
    } else
      h !== null ? (ks(n, h.cachePool), gg(n, h), kr(), n.memoizedState = null) : (t !== null && ks(n, null), Hf(), kr());
    return sn(t, n, f, r), n.child;
  }
  function co(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function m0(t, n, r, o, f) {
    var h = Af();
    return h = h === null ? null : { parent: Gt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: r,
      cachePool: h
    }, t !== null && ks(n, null), Hf(), vg(n), t !== null && Pi(t, n, o, !0), n.childLanes = f, null;
  }
  function Ws(t, n) {
    return n = eu(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function p0(t, n, r) {
    return pi(n, t.child, null, r), t = Ws(n, n.pendingProps), t.flags |= 2, $n(n), n.memoizedState = null, t;
  }
  function QS(t, n, r) {
    var o = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (it) {
        if (o.mode === "hidden")
          return t = Ws(n, o), n.lanes = 536870912, co(null, t);
        if (Uf(n), (t = Tt) ? (t = Rv(
          t,
          na
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Tr !== null ? { id: Oa, overflow: za } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Wp(t), r.return = n, n.child = r, ln = n, Tt = null)) : t = null, t === null) throw Dr(n);
        return n.lanes = 536870912, null;
      }
      return Ws(n, o);
    }
    var h = t.memoizedState;
    if (h !== null) {
      var w = h.dehydrated;
      if (Uf(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = p0(
            t,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Xt || Pi(t, n, r, !1), f = (r & t.childLanes) !== 0, Xt || f) {
        if (o = Rt, o !== null && (w = $(o, r), w !== 0 && w !== h.retryLane))
          throw h.retryLane = w, oi(t, w), An(o, t, w), ld;
        uu(), n = p0(
          t,
          n,
          r
        );
      } else
        t = h.treeContext, Tt = ra(w.nextSibling), ln = n, it = !0, Mr = null, na = !1, t !== null && tg(n, t), n = Ws(n, o), n.flags |= 4096;
      return n;
    }
    return t = Qa(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function Js(t, n) {
    var r = n.ref;
    if (r === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(l(284));
      (t === null || t.ref !== r) && (n.flags |= 4194816);
    }
  }
  function od(t, n, r, o, f) {
    return fi(n), r = $f(
      t,
      n,
      r,
      o,
      void 0,
      f
    ), o = qf(), t !== null && !Xt ? (If(t, n, f), nr(t, n, f)) : (it && o && _f(n), n.flags |= 1, sn(t, n, r, f), n.child);
  }
  function g0(t, n, r, o, f, h) {
    return fi(n), n.updateQueue = null, r = bg(
      n,
      o,
      r,
      f
    ), yg(t), o = qf(), t !== null && !Xt ? (If(t, n, h), nr(t, n, h)) : (it && o && _f(n), n.flags |= 1, sn(t, n, r, h), n.child);
  }
  function v0(t, n, r, o, f) {
    if (fi(n), n.stateNode === null) {
      var h = Yi, w = r.contextType;
      typeof w == "object" && w !== null && (h = on(w)), h = new r(o, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = rd, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = o, h.state = n.memoizedState, h.refs = {}, Of(n), w = r.contextType, h.context = typeof w == "object" && w !== null ? on(w) : Yi, h.state = n.memoizedState, w = r.getDerivedStateFromProps, typeof w == "function" && (ad(
        n,
        r,
        w,
        o
      ), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (w = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), w !== h.state && rd.enqueueReplaceState(h, h.state, null), io(n, o, h, f), ro(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      h = n.stateNode;
      var M = n.memoizedProps, q = vi(r, M);
      h.props = q;
      var ie = h.context, ue = r.contextType;
      w = Yi, typeof ue == "object" && ue !== null && (w = on(ue));
      var fe = r.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof h.getSnapshotBeforeUpdate == "function", M = n.pendingProps !== M, ue || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (M || ie !== w) && a0(
        n,
        h,
        o,
        w
      ), jr = !1;
      var le = n.memoizedState;
      h.state = le, io(n, o, h, f), ro(), ie = n.memoizedState, M || le !== ie || jr ? (typeof fe == "function" && (ad(
        n,
        r,
        fe,
        o
      ), ie = n.memoizedState), (q = jr || n0(
        n,
        r,
        q,
        o,
        le,
        ie,
        w
      )) ? (ue || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = ie), h.props = o, h.state = ie, h.context = w, o = q) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      h = n.stateNode, zf(t, n), w = n.memoizedProps, ue = vi(r, w), h.props = ue, fe = n.pendingProps, le = h.context, ie = r.contextType, q = Yi, typeof ie == "object" && ie !== null && (q = on(ie)), M = r.getDerivedStateFromProps, (ie = typeof M == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (w !== fe || le !== q) && a0(
        n,
        h,
        o,
        q
      ), jr = !1, le = n.memoizedState, h.state = le, io(n, o, h, f), ro();
      var oe = n.memoizedState;
      w !== fe || le !== oe || jr || t !== null && t.dependencies !== null && zs(t.dependencies) ? (typeof M == "function" && (ad(
        n,
        r,
        M,
        o
      ), oe = n.memoizedState), (ue = jr || n0(
        n,
        r,
        ue,
        o,
        le,
        oe,
        q
      ) || t !== null && t.dependencies !== null && zs(t.dependencies)) ? (ie || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, oe, q), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        o,
        oe,
        q
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = oe), h.props = o, h.state = oe, h.context = q, o = ue) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return h = o, Js(t, n), o = (n.flags & 128) !== 0, h || o ? (h = n.stateNode, r = o && typeof r.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, t !== null && o ? (n.child = pi(
      n,
      t.child,
      null,
      f
    ), n.child = pi(
      n,
      null,
      r,
      f
    )) : sn(t, n, r, f), n.memoizedState = h.state, t = n.child) : t = nr(
      t,
      n,
      f
    ), t;
  }
  function y0(t, n, r, o) {
    return ui(), n.flags |= 256, sn(t, n, r, o), n.child;
  }
  var sd = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ud(t) {
    return { baseLanes: t, cachePool: og() };
  }
  function cd(t, n, r) {
    return t = t !== null ? t.childLanes & ~r : 0, n && (t |= In), t;
  }
  function b0(t, n, r) {
    var o = n.pendingProps, f = !1, h = (n.flags & 128) !== 0, w;
    if ((w = h) || (w = t !== null && t.memoizedState === null ? !1 : ($t.current & 2) !== 0), w && (f = !0, n.flags &= -129), w = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (it) {
        if (f ? Lr(n) : kr(), (t = Tt) ? (t = Rv(
          t,
          na
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Tr !== null ? { id: Oa, overflow: za } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Wp(t), r.return = n, n.child = r, ln = n, Tt = null)) : t = null, t === null) throw Dr(n);
        return Fd(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var M = o.children;
      return o = o.fallback, f ? (kr(), f = n.mode, M = eu(
        { mode: "hidden", children: M },
        f
      ), o = si(
        o,
        f,
        r,
        null
      ), M.return = n, o.return = n, M.sibling = o, n.child = M, o = n.child, o.memoizedState = ud(r), o.childLanes = cd(
        t,
        w,
        r
      ), n.memoizedState = sd, co(null, o)) : (Lr(n), fd(n, M));
    }
    var q = t.memoizedState;
    if (q !== null && (M = q.dehydrated, M !== null)) {
      if (h)
        n.flags & 256 ? (Lr(n), n.flags &= -257, n = dd(
          t,
          n,
          r
        )) : n.memoizedState !== null ? (kr(), n.child = t.child, n.flags |= 128, n = null) : (kr(), M = o.fallback, f = n.mode, o = eu(
          { mode: "visible", children: o.children },
          f
        ), M = si(
          M,
          f,
          r,
          null
        ), M.flags |= 2, o.return = n, M.return = n, o.sibling = M, n.child = o, pi(
          n,
          t.child,
          null,
          r
        ), o = n.child, o.memoizedState = ud(r), o.childLanes = cd(
          t,
          w,
          r
        ), n.memoizedState = sd, n = co(null, o));
      else if (Lr(n), Fd(M)) {
        if (w = M.nextSibling && M.nextSibling.dataset, w) var ie = w.dgst;
        w = ie, o = Error(l(419)), o.stack = "", o.digest = w, Wl({ value: o, source: null, stack: null }), n = dd(
          t,
          n,
          r
        );
      } else if (Xt || Pi(t, n, r, !1), w = (r & t.childLanes) !== 0, Xt || w) {
        if (w = Rt, w !== null && (o = $(w, r), o !== 0 && o !== q.retryLane))
          throw q.retryLane = o, oi(t, o), An(w, t, o), ld;
        Gd(M) || uu(), n = dd(
          t,
          n,
          r
        );
      } else
        Gd(M) ? (n.flags |= 192, n.child = t.child, n = null) : (t = q.treeContext, Tt = ra(
          M.nextSibling
        ), ln = n, it = !0, Mr = null, na = !1, t !== null && tg(n, t), n = fd(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (kr(), M = o.fallback, f = n.mode, q = t.child, ie = q.sibling, o = Qa(q, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = q.subtreeFlags & 65011712, ie !== null ? M = Qa(
      ie,
      M
    ) : (M = si(
      M,
      f,
      r,
      null
    ), M.flags |= 2), M.return = n, o.return = n, o.sibling = M, n.child = o, co(null, o), o = n.child, M = t.child.memoizedState, M === null ? M = ud(r) : (f = M.cachePool, f !== null ? (q = Gt._currentValue, f = f.parent !== q ? { parent: q, pool: q } : f) : f = og(), M = {
      baseLanes: M.baseLanes | r,
      cachePool: f
    }), o.memoizedState = M, o.childLanes = cd(
      t,
      w,
      r
    ), n.memoizedState = sd, co(t.child, o)) : (Lr(n), r = t.child, t = r.sibling, r = Qa(r, {
      mode: "visible",
      children: o.children
    }), r.return = n, r.sibling = null, t !== null && (w = n.deletions, w === null ? (n.deletions = [t], n.flags |= 16) : w.push(t)), n.child = r, n.memoizedState = null, r);
  }
  function fd(t, n) {
    return n = eu(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function eu(t, n) {
    return t = Un(22, t, null, n), t.lanes = 0, t;
  }
  function dd(t, n, r) {
    return pi(n, t.child, null, r), t = fd(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function x0(t, n, r) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), Rf(t.return, n, r);
  }
  function hd(t, n, r, o, f, h) {
    var w = t.memoizedState;
    w === null ? t.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: r,
      tailMode: f,
      treeForkCount: h
    } : (w.isBackwards = n, w.rendering = null, w.renderingStartTime = 0, w.last = o, w.tail = r, w.tailMode = f, w.treeForkCount = h);
  }
  function w0(t, n, r) {
    var o = n.pendingProps, f = o.revealOrder, h = o.tail;
    o = o.children;
    var w = $t.current, M = (w & 2) !== 0;
    if (M ? (w = w & 1 | 2, n.flags |= 128) : w &= 1, G($t, w), sn(t, n, o, r), o = it ? Kl : 0, !M && t !== null && (t.flags & 128) !== 0)
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && x0(t, r, n);
        else if (t.tag === 19)
          x0(t, r, n);
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
        for (r = n.child, f = null; r !== null; )
          t = r.alternate, t !== null && qs(t) === null && (f = r), r = r.sibling;
        r = f, r === null ? (f = n.child, n.child = null) : (f = r.sibling, r.sibling = null), hd(
          n,
          !1,
          f,
          r,
          h,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, f = n.child, n.child = null; f !== null; ) {
          if (t = f.alternate, t !== null && qs(t) === null) {
            n.child = f;
            break;
          }
          t = f.sibling, f.sibling = r, r = f, f = t;
        }
        hd(
          n,
          !0,
          r,
          null,
          h,
          o
        );
        break;
      case "together":
        hd(
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
  function nr(t, n, r) {
    if (t !== null && (n.dependencies = t.dependencies), Ur |= n.lanes, (r & n.childLanes) === 0)
      if (t !== null) {
        if (Pi(
          t,
          n,
          r,
          !1
        ), (r & n.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && n.child !== t.child)
      throw Error(l(153));
    if (n.child !== null) {
      for (t = n.child, r = Qa(t, t.pendingProps), n.child = r, r.return = n; t.sibling !== null; )
        t = t.sibling, r = r.sibling = Qa(t, t.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function md(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && zs(t)));
  }
  function KS(t, n, r) {
    switch (n.tag) {
      case 3:
        W(n, n.stateNode.containerInfo), Ar(n, Gt, t.memoizedState.cache), ui();
        break;
      case 27:
      case 5:
        De(n);
        break;
      case 4:
        W(n, n.stateNode.containerInfo);
        break;
      case 10:
        Ar(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Uf(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Lr(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? b0(t, n, r) : (Lr(n), t = nr(
            t,
            n,
            r
          ), t !== null ? t.sibling : null);
        Lr(n);
        break;
      case 19:
        var f = (t.flags & 128) !== 0;
        if (o = (r & n.childLanes) !== 0, o || (Pi(
          t,
          n,
          r,
          !1
        ), o = (r & n.childLanes) !== 0), f) {
          if (o)
            return w0(
              t,
              n,
              r
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), G($t, $t.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, h0(
          t,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Ar(n, Gt, t.memoizedState.cache);
    }
    return nr(t, n, r);
  }
  function _0(t, n, r) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        Xt = !0;
      else {
        if (!md(t, r) && (n.flags & 128) === 0)
          return Xt = !1, KS(
            t,
            n,
            r
          );
        Xt = (t.flags & 131072) !== 0;
      }
    else
      Xt = !1, it && (n.flags & 1048576) !== 0 && eg(n, Kl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (t = hi(n.elementType), n.type = t, typeof t == "function")
            bf(t) ? (o = vi(t, o), n.tag = 1, n = v0(
              null,
              n,
              t,
              o,
              r
            )) : (n.tag = 0, n = od(
              null,
              n,
              t,
              o,
              r
            ));
          else {
            if (t != null) {
              var f = t.$$typeof;
              if (f === O) {
                n.tag = 11, n = c0(
                  null,
                  n,
                  t,
                  o,
                  r
                );
                break e;
              } else if (f === U) {
                n.tag = 14, n = f0(
                  null,
                  n,
                  t,
                  o,
                  r
                );
                break e;
              }
            }
            throw n = L(t) || t, Error(l(306, n, ""));
          }
        }
        return n;
      case 0:
        return od(
          t,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 1:
        return o = n.type, f = vi(
          o,
          n.pendingProps
        ), v0(
          t,
          n,
          o,
          f,
          r
        );
      case 3:
        e: {
          if (W(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(l(387));
          o = n.pendingProps;
          var h = n.memoizedState;
          f = h.element, zf(t, n), io(n, o, null, r);
          var w = n.memoizedState;
          if (o = w.cache, Ar(n, Gt, o), o !== h.cache && Tf(
            n,
            [Gt],
            r,
            !0
          ), ro(), o = w.element, h.isDehydrated)
            if (h = {
              element: o,
              isDehydrated: !1,
              cache: w.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = y0(
                t,
                n,
                o,
                r
              );
              break e;
            } else if (o !== f) {
              f = Jn(
                Error(l(424)),
                n
              ), Wl(f), n = y0(
                t,
                n,
                o,
                r
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
              for (Tt = ra(t.firstChild), ln = n, it = !0, Mr = null, na = !0, r = hg(
                n,
                null,
                o,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (ui(), o === f) {
              n = nr(
                t,
                n,
                r
              );
              break e;
            }
            sn(t, n, o, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Js(t, n), t === null ? (r = Ov(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : it || (r = n.type, t = n.pendingProps, o = gu(
          de.current
        ).createElement(r), o[xe] = n, o[Ne] = t, un(o, r, t), rt(o), n.stateNode = o) : n.memoizedState = Ov(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return De(n), t === null && it && (o = n.stateNode = Dv(
          n.type,
          n.pendingProps,
          de.current
        ), ln = n, na = !0, f = Tt, Yr(n.type) ? (Xd = f, Tt = ra(o.firstChild)) : Tt = f), sn(
          t,
          n,
          n.pendingProps.children,
          r
        ), Js(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && it && ((f = o = Tt) && (o = RE(
          o,
          n.type,
          n.pendingProps,
          na
        ), o !== null ? (n.stateNode = o, ln = n, Tt = ra(o.firstChild), na = !1, f = !0) : f = !1), f || Dr(n)), De(n), f = n.type, h = n.pendingProps, w = t !== null ? t.memoizedProps : null, o = h.children, qd(f, h) ? o = null : w !== null && qd(f, w) && (n.flags |= 32), n.memoizedState !== null && (f = $f(
          t,
          n,
          qS,
          null,
          null,
          r
        ), Co._currentValue = f), Js(t, n), sn(t, n, o, r), n.child;
      case 6:
        return t === null && it && ((t = r = Tt) && (r = TE(
          r,
          n.pendingProps,
          na
        ), r !== null ? (n.stateNode = r, ln = n, Tt = null, t = !0) : t = !1), t || Dr(n)), null;
      case 13:
        return b0(t, n, r);
      case 4:
        return W(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = pi(
          n,
          null,
          o,
          r
        ) : sn(t, n, o, r), n.child;
      case 11:
        return c0(
          t,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return sn(
          t,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return sn(
          t,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return sn(
          t,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return o = n.pendingProps, Ar(n, n.type, o.value), sn(t, n, o.children, r), n.child;
      case 9:
        return f = n.type._context, o = n.pendingProps.children, fi(n), f = on(f), o = o(f), n.flags |= 1, sn(t, n, o, r), n.child;
      case 14:
        return f0(
          t,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return d0(
          t,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return w0(t, n, r);
      case 31:
        return QS(t, n, r);
      case 22:
        return h0(
          t,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return fi(n), o = on(Gt), t === null ? (f = Af(), f === null && (f = Rt, h = Mf(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= r), f = h), n.memoizedState = { parent: o, cache: f }, Of(n), Ar(n, Gt, f)) : ((t.lanes & r) !== 0 && (zf(t, n), io(n, null, null, r), ro()), f = t.memoizedState, h = n.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), Ar(n, Gt, o)) : (o = h.cache, Ar(n, Gt, o), o !== f.cache && Tf(
          n,
          [Gt],
          r,
          !0
        ))), sn(
          t,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(l(156, n.tag));
  }
  function ar(t) {
    t.flags |= 4;
  }
  function pd(t, n, r, o, f) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (f & 335544128) === f)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Z0()) t.flags |= 8192;
        else
          throw mi = Bs, jf;
    } else t.flags &= -16777217;
  }
  function S0(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Bv(n))
      if (Z0()) t.flags |= 8192;
      else
        throw mi = Bs, jf;
  }
  function tu(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Vt() : 536870912, t.lanes |= n, ll |= n);
  }
  function fo(t, n) {
    if (!it)
      switch (t.tailMode) {
        case "hidden":
          n = t.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), n = n.sibling;
          r === null ? t.tail = null : r.sibling = null;
          break;
        case "collapsed":
          r = t.tail;
          for (var o = null; r !== null; )
            r.alternate !== null && (o = r), r = r.sibling;
          o === null ? n || t.tail === null ? t.tail = null : t.tail.sibling = null : o.sibling = null;
      }
  }
  function Mt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, r = 0, o = 0;
    if (n)
      for (var f = t.child; f !== null; )
        r |= f.lanes | f.childLanes, o |= f.subtreeFlags & 65011712, o |= f.flags & 65011712, f.return = t, f = f.sibling;
    else
      for (f = t.child; f !== null; )
        r |= f.lanes | f.childLanes, o |= f.subtreeFlags, o |= f.flags, f.return = t, f = f.sibling;
    return t.subtreeFlags |= o, t.childLanes = r, n;
  }
  function WS(t, n, r) {
    var o = n.pendingProps;
    switch (Sf(n), n.tag) {
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
        return r = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Ja(Gt), ve(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (t === null || t.child === null) && (Xi(n) ? ar(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Nf())), Mt(n), null;
      case 26:
        var f = n.type, h = n.memoizedState;
        return t === null ? (ar(n), h !== null ? (Mt(n), S0(n, h)) : (Mt(n), pd(
          n,
          f,
          null,
          o,
          r
        ))) : h ? h !== t.memoizedState ? (ar(n), Mt(n), S0(n, h)) : (Mt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && ar(n), Mt(n), pd(
          n,
          f,
          t,
          o,
          r
        )), null;
      case 27:
        if (Oe(n), r = de.current, f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && ar(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          t = ee.current, Xi(n) ? ng(n) : (t = Dv(f, o, r), n.stateNode = t, ar(n));
        }
        return Mt(n), null;
      case 5:
        if (Oe(n), f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && ar(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          if (h = ee.current, Xi(n))
            ng(n);
          else {
            var w = gu(
              de.current
            );
            switch (h) {
              case 1:
                h = w.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                h = w.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    h = w.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    h = w.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    h = w.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof o.is == "string" ? w.createElement("select", {
                      is: o.is
                    }) : w.createElement("select"), o.multiple ? h.multiple = !0 : o.size && (h.size = o.size);
                    break;
                  default:
                    h = typeof o.is == "string" ? w.createElement(f, { is: o.is }) : w.createElement(f);
                }
            }
            h[xe] = n, h[Ne] = o;
            e: for (w = n.child; w !== null; ) {
              if (w.tag === 5 || w.tag === 6)
                h.appendChild(w.stateNode);
              else if (w.tag !== 4 && w.tag !== 27 && w.child !== null) {
                w.child.return = w, w = w.child;
                continue;
              }
              if (w === n) break e;
              for (; w.sibling === null; ) {
                if (w.return === null || w.return === n)
                  break e;
                w = w.return;
              }
              w.sibling.return = w.return, w = w.sibling;
            }
            n.stateNode = h;
            e: switch (un(h, f, o), f) {
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
            o && ar(n);
          }
        }
        return Mt(n), pd(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          r
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && ar(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(l(166));
          if (t = de.current, Xi(n)) {
            if (t = n.stateNode, r = n.memoizedProps, o = null, f = ln, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            t[xe] = n, t = !!(t.nodeValue === r || o !== null && o.suppressHydrationWarning === !0 || bv(t.nodeValue, r)), t || Dr(n, !0);
          } else
            t = gu(t).createTextNode(
              o
            ), t[xe] = n, n.stateNode = t;
        }
        return Mt(n), null;
      case 31:
        if (r = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = Xi(n), r !== null) {
            if (t === null) {
              if (!o) throw Error(l(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(557));
              t[xe] = n;
            } else
              ui(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), t = !1;
          } else
            r = Nf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), t = !0;
          if (!t)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Mt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (f = Xi(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!f) throw Error(l(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[xe] = n;
            } else
              ui(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), f = !1;
          } else
            f = Nf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
        }
        return $n(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = o !== null, t = t !== null && t.memoizedState !== null, r && (o = n.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), h = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (h = o.memoizedState.cachePool.pool), h !== f && (o.flags |= 2048)), r !== t && r && (n.child.flags |= 8192), tu(n, n.updateQueue), Mt(n), null);
      case 4:
        return ve(), t === null && Hd(n.stateNode.containerInfo), Mt(n), null;
      case 10:
        return Ja(n.type), Mt(n), null;
      case 19:
        if (k($t), o = n.memoizedState, o === null) return Mt(n), null;
        if (f = (n.flags & 128) !== 0, h = o.rendering, h === null)
          if (f) fo(o, !1);
          else {
            if (Bt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (h = qs(t), h !== null) {
                  for (n.flags |= 128, fo(o, !1), t = h.updateQueue, n.updateQueue = t, tu(n, t), n.subtreeFlags = 0, t = r, r = n.child; r !== null; )
                    Kp(r, t), r = r.sibling;
                  return G(
                    $t,
                    $t.current & 1 | 2
                  ), it && Ka(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Ke() > lu && (n.flags |= 128, f = !0, fo(o, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (t = qs(h), t !== null) {
              if (n.flags |= 128, f = !0, t = t.updateQueue, n.updateQueue = t, tu(n, t), fo(o, !0), o.tail === null && o.tailMode === "hidden" && !h.alternate && !it)
                return Mt(n), null;
            } else
              2 * Ke() - o.renderingStartTime > lu && r !== 536870912 && (n.flags |= 128, f = !0, fo(o, !1), n.lanes = 4194304);
          o.isBackwards ? (h.sibling = n.child, n.child = h) : (t = o.last, t !== null ? t.sibling = h : n.child = h, o.last = h);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ke(), t.sibling = null, r = $t.current, G(
          $t,
          f ? r & 1 | 2 : r & 1
        ), it && Ka(n, o.treeForkCount), t) : (Mt(n), null);
      case 22:
      case 23:
        return $n(n), Bf(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), r = n.updateQueue, r !== null && tu(n, r.retryQueue), r = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== r && (n.flags |= 2048), t !== null && k(di), null;
      case 24:
        return r = null, t !== null && (r = t.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ja(Gt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function JS(t, n) {
    switch (Sf(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Ja(Gt), ve(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Oe(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if ($n(n), n.alternate === null)
            throw Error(l(340));
          ui();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if ($n(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          ui();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return k($t), null;
      case 4:
        return ve(), null;
      case 10:
        return Ja(n.type), null;
      case 22:
      case 23:
        return $n(n), Bf(), t !== null && k(di), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Ja(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function E0(t, n) {
    switch (Sf(n), n.tag) {
      case 3:
        Ja(Gt), ve();
        break;
      case 26:
      case 27:
      case 5:
        Oe(n);
        break;
      case 4:
        ve();
        break;
      case 31:
        n.memoizedState !== null && $n(n);
        break;
      case 13:
        $n(n);
        break;
      case 19:
        k($t);
        break;
      case 10:
        Ja(n.type);
        break;
      case 22:
      case 23:
        $n(n), Bf(), t !== null && k(di);
        break;
      case 24:
        Ja(Gt);
    }
  }
  function ho(t, n) {
    try {
      var r = n.updateQueue, o = r !== null ? r.lastEffect : null;
      if (o !== null) {
        var f = o.next;
        r = f;
        do {
          if ((r.tag & t) === t) {
            o = void 0;
            var h = r.create, w = r.inst;
            o = h(), w.destroy = o;
          }
          r = r.next;
        } while (r !== f);
      }
    } catch (M) {
      _t(n, n.return, M);
    }
  }
  function Hr(t, n, r) {
    try {
      var o = n.updateQueue, f = o !== null ? o.lastEffect : null;
      if (f !== null) {
        var h = f.next;
        o = h;
        do {
          if ((o.tag & t) === t) {
            var w = o.inst, M = w.destroy;
            if (M !== void 0) {
              w.destroy = void 0, f = n;
              var q = r, ie = M;
              try {
                ie();
              } catch (ue) {
                _t(
                  f,
                  q,
                  ue
                );
              }
            }
          }
          o = o.next;
        } while (o !== h);
      }
    } catch (ue) {
      _t(n, n.return, ue);
    }
  }
  function N0(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var r = t.stateNode;
      try {
        pg(n, r);
      } catch (o) {
        _t(t, t.return, o);
      }
    }
  }
  function C0(t, n, r) {
    r.props = vi(
      t.type,
      t.memoizedProps
    ), r.state = t.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (o) {
      _t(t, n, o);
    }
  }
  function mo(t, n) {
    try {
      var r = t.ref;
      if (r !== null) {
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
        typeof r == "function" ? t.refCleanup = r(o) : r.current = o;
      }
    } catch (f) {
      _t(t, n, f);
    }
  }
  function La(t, n) {
    var r = t.ref, o = t.refCleanup;
    if (r !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (f) {
          _t(t, n, f);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (f) {
          _t(t, n, f);
        }
      else r.current = null;
  }
  function R0(t) {
    var n = t.type, r = t.memoizedProps, o = t.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && o.focus();
          break e;
        case "img":
          r.src ? o.src = r.src : r.srcSet && (o.srcset = r.srcSet);
      }
    } catch (f) {
      _t(t, t.return, f);
    }
  }
  function gd(t, n, r) {
    try {
      var o = t.stateNode;
      wE(o, t.type, r, n), o[Ne] = n;
    } catch (f) {
      _t(t, t.return, f);
    }
  }
  function T0(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Yr(t.type) || t.tag === 4;
  }
  function vd(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || T0(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Yr(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function yd(t, n, r) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(t, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(t), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = Pa));
    else if (o !== 4 && (o === 27 && Yr(t.type) && (r = t.stateNode, n = null), t = t.child, t !== null))
      for (yd(t, n, r), t = t.sibling; t !== null; )
        yd(t, n, r), t = t.sibling;
  }
  function nu(t, n, r) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? r.insertBefore(t, n) : r.appendChild(t);
    else if (o !== 4 && (o === 27 && Yr(t.type) && (r = t.stateNode), t = t.child, t !== null))
      for (nu(t, n, r), t = t.sibling; t !== null; )
        nu(t, n, r), t = t.sibling;
  }
  function M0(t) {
    var n = t.stateNode, r = t.memoizedProps;
    try {
      for (var o = t.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      un(n, o, r), n[xe] = t, n[Ne] = r;
    } catch (h) {
      _t(t, t.return, h);
    }
  }
  var rr = !1, Pt = !1, bd = !1, D0 = typeof WeakSet == "function" ? WeakSet : Set, tn = null;
  function eE(t, n) {
    if (t = t.containerInfo, Vd = Su, t = qp(t), df(t)) {
      if ("selectionStart" in t)
        var r = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        e: {
          r = (r = t.ownerDocument) && r.defaultView || window;
          var o = r.getSelection && r.getSelection();
          if (o && o.rangeCount !== 0) {
            r = o.anchorNode;
            var f = o.anchorOffset, h = o.focusNode;
            o = o.focusOffset;
            try {
              r.nodeType, h.nodeType;
            } catch {
              r = null;
              break e;
            }
            var w = 0, M = -1, q = -1, ie = 0, ue = 0, fe = t, le = null;
            t: for (; ; ) {
              for (var oe; fe !== r || f !== 0 && fe.nodeType !== 3 || (M = w + f), fe !== h || o !== 0 && fe.nodeType !== 3 || (q = w + o), fe.nodeType === 3 && (w += fe.nodeValue.length), (oe = fe.firstChild) !== null; )
                le = fe, fe = oe;
              for (; ; ) {
                if (fe === t) break t;
                if (le === r && ++ie === f && (M = w), le === h && ++ue === o && (q = w), (oe = fe.nextSibling) !== null) break;
                fe = le, le = fe.parentNode;
              }
              fe = oe;
            }
            r = M === -1 || q === -1 ? null : { start: M, end: q };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for ($d = { focusedElem: t, selectionRange: r }, Su = !1, tn = n; tn !== null; )
      if (n = tn, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, tn = t;
      else
        for (; tn !== null; ) {
          switch (n = tn, h = n.alternate, t = n.flags, n.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = n.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (r = 0; r < t.length; r++)
                  f = t[r], f.ref.impl = f.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && h !== null) {
                t = void 0, r = n, f = h.memoizedProps, h = h.memoizedState, o = r.stateNode;
                try {
                  var Te = vi(
                    r.type,
                    f
                  );
                  t = o.getSnapshotBeforeUpdate(
                    Te,
                    h
                  ), o.__reactInternalSnapshotBeforeUpdate = t;
                } catch (Ue) {
                  _t(
                    r,
                    r.return,
                    Ue
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = n.stateNode.containerInfo, r = t.nodeType, r === 9)
                  Yd(t);
                else if (r === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Yd(t);
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
            t.return = n.return, tn = t;
            break;
          }
          tn = n.return;
        }
  }
  function A0(t, n, r) {
    var o = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        lr(t, r), o & 4 && ho(5, r);
        break;
      case 1:
        if (lr(t, r), o & 4)
          if (t = r.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (w) {
              _t(r, r.return, w);
            }
          else {
            var f = vi(
              r.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              t.componentDidUpdate(
                f,
                n,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (w) {
              _t(
                r,
                r.return,
                w
              );
            }
          }
        o & 64 && N0(r), o & 512 && mo(r, r.return);
        break;
      case 3:
        if (lr(t, r), o & 64 && (t = r.updateQueue, t !== null)) {
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
            pg(t, n);
          } catch (w) {
            _t(r, r.return, w);
          }
        }
        break;
      case 27:
        n === null && o & 4 && M0(r);
      case 26:
      case 5:
        lr(t, r), n === null && o & 4 && R0(r), o & 512 && mo(r, r.return);
        break;
      case 12:
        lr(t, r);
        break;
      case 31:
        lr(t, r), o & 4 && z0(t, r);
        break;
      case 13:
        lr(t, r), o & 4 && L0(t, r), o & 64 && (t = r.memoizedState, t !== null && (t = t.dehydrated, t !== null && (r = uE.bind(
          null,
          r
        ), ME(t, r))));
        break;
      case 22:
        if (o = r.memoizedState !== null || rr, !o) {
          n = n !== null && n.memoizedState !== null || Pt, f = rr;
          var h = Pt;
          rr = o, (Pt = n) && !h ? or(
            t,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : lr(t, r), rr = f, Pt = h;
        }
        break;
      case 30:
        break;
      default:
        lr(t, r);
    }
  }
  function j0(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, j0(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && ot(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Dt = null, Rn = !1;
  function ir(t, n, r) {
    for (r = r.child; r !== null; )
      O0(t, n, r), r = r.sibling;
  }
  function O0(t, n, r) {
    if (Kt && typeof Kt.onCommitFiberUnmount == "function")
      try {
        Kt.onCommitFiberUnmount(nn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        Pt || La(r, n), ir(
          t,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Pt || La(r, n);
        var o = Dt, f = Rn;
        Yr(r.type) && (Dt = r.stateNode, Rn = !1), ir(
          t,
          n,
          r
        ), So(r.stateNode), Dt = o, Rn = f;
        break;
      case 5:
        Pt || La(r, n);
      case 6:
        if (o = Dt, f = Rn, Dt = null, ir(
          t,
          n,
          r
        ), Dt = o, Rn = f, Dt !== null)
          if (Rn)
            try {
              (Dt.nodeType === 9 ? Dt.body : Dt.nodeName === "HTML" ? Dt.ownerDocument.body : Dt).removeChild(r.stateNode);
            } catch (h) {
              _t(
                r,
                n,
                h
              );
            }
          else
            try {
              Dt.removeChild(r.stateNode);
            } catch (h) {
              _t(
                r,
                n,
                h
              );
            }
        break;
      case 18:
        Dt !== null && (Rn ? (t = Dt, Nv(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          r.stateNode
        ), ml(t)) : Nv(Dt, r.stateNode));
        break;
      case 4:
        o = Dt, f = Rn, Dt = r.stateNode.containerInfo, Rn = !0, ir(
          t,
          n,
          r
        ), Dt = o, Rn = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Hr(2, r, n), Pt || Hr(4, r, n), ir(
          t,
          n,
          r
        );
        break;
      case 1:
        Pt || (La(r, n), o = r.stateNode, typeof o.componentWillUnmount == "function" && C0(
          r,
          n,
          o
        )), ir(
          t,
          n,
          r
        );
        break;
      case 21:
        ir(
          t,
          n,
          r
        );
        break;
      case 22:
        Pt = (o = Pt) || r.memoizedState !== null, ir(
          t,
          n,
          r
        ), Pt = o;
        break;
      default:
        ir(
          t,
          n,
          r
        );
    }
  }
  function z0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ml(t);
      } catch (r) {
        _t(n, n.return, r);
      }
    }
  }
  function L0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ml(t);
      } catch (r) {
        _t(n, n.return, r);
      }
  }
  function tE(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new D0()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new D0()), n;
      default:
        throw Error(l(435, t.tag));
    }
  }
  function au(t, n) {
    var r = tE(t);
    n.forEach(function(o) {
      if (!r.has(o)) {
        r.add(o);
        var f = cE.bind(null, t, o);
        o.then(f, f);
      }
    });
  }
  function Tn(t, n) {
    var r = n.deletions;
    if (r !== null)
      for (var o = 0; o < r.length; o++) {
        var f = r[o], h = t, w = n, M = w;
        e: for (; M !== null; ) {
          switch (M.tag) {
            case 27:
              if (Yr(M.type)) {
                Dt = M.stateNode, Rn = !1;
                break e;
              }
              break;
            case 5:
              Dt = M.stateNode, Rn = !1;
              break e;
            case 3:
            case 4:
              Dt = M.stateNode.containerInfo, Rn = !0;
              break e;
          }
          M = M.return;
        }
        if (Dt === null) throw Error(l(160));
        O0(h, w, f), Dt = null, Rn = !1, h = f.alternate, h !== null && (h.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        k0(n, t), n = n.sibling;
  }
  var ba = null;
  function k0(t, n) {
    var r = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Tn(n, t), Mn(t), o & 4 && (Hr(3, t, t.return), ho(3, t), Hr(5, t, t.return));
        break;
      case 1:
        Tn(n, t), Mn(t), o & 512 && (Pt || r === null || La(r, r.return)), o & 64 && rr && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (r = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = r === null ? o : r.concat(o))));
        break;
      case 26:
        var f = ba;
        if (Tn(n, t), Mn(t), o & 512 && (Pt || r === null || La(r, r.return)), o & 4) {
          var h = r !== null ? r.memoizedState : null;
          if (o = t.memoizedState, r === null)
            if (o === null)
              if (t.stateNode === null) {
                e: {
                  o = t.type, r = t.memoizedProps, f = f.ownerDocument || f;
                  t: switch (o) {
                    case "title":
                      h = f.getElementsByTagName("title")[0], (!h || h[Pe] || h[xe] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = f.createElement(o), f.head.insertBefore(
                        h,
                        f.querySelector("head > title")
                      )), un(h, o, r), h[xe] = t, rt(h), o = h;
                      break e;
                    case "link":
                      var w = kv(
                        "link",
                        "href",
                        f
                      ).get(o + (r.href || ""));
                      if (w) {
                        for (var M = 0; M < w.length; M++)
                          if (h = w[M], h.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && h.getAttribute("rel") === (r.rel == null ? null : r.rel) && h.getAttribute("title") === (r.title == null ? null : r.title) && h.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            w.splice(M, 1);
                            break t;
                          }
                      }
                      h = f.createElement(o), un(h, o, r), f.head.appendChild(h);
                      break;
                    case "meta":
                      if (w = kv(
                        "meta",
                        "content",
                        f
                      ).get(o + (r.content || ""))) {
                        for (M = 0; M < w.length; M++)
                          if (h = w[M], h.getAttribute("content") === (r.content == null ? null : "" + r.content) && h.getAttribute("name") === (r.name == null ? null : r.name) && h.getAttribute("property") === (r.property == null ? null : r.property) && h.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && h.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            w.splice(M, 1);
                            break t;
                          }
                      }
                      h = f.createElement(o), un(h, o, r), f.head.appendChild(h);
                      break;
                    default:
                      throw Error(l(468, o));
                  }
                  h[xe] = t, rt(h), o = h;
                }
                t.stateNode = o;
              } else
                Hv(
                  f,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Lv(
                f,
                o,
                t.memoizedProps
              );
          else
            h !== o ? (h === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : h.count--, o === null ? Hv(
              f,
              t.type,
              t.stateNode
            ) : Lv(
              f,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && gd(
              t,
              t.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        Tn(n, t), Mn(t), o & 512 && (Pt || r === null || La(r, r.return)), r !== null && o & 4 && gd(
          t,
          t.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (Tn(n, t), Mn(t), o & 512 && (Pt || r === null || La(r, r.return)), t.flags & 32) {
          f = t.stateNode;
          try {
            Hi(f, "");
          } catch (Te) {
            _t(t, t.return, Te);
          }
        }
        o & 4 && t.stateNode != null && (f = t.memoizedProps, gd(
          t,
          f,
          r !== null ? r.memoizedProps : f
        )), o & 1024 && (bd = !0);
        break;
      case 6:
        if (Tn(n, t), Mn(t), o & 4) {
          if (t.stateNode === null)
            throw Error(l(162));
          o = t.memoizedProps, r = t.stateNode;
          try {
            r.nodeValue = o;
          } catch (Te) {
            _t(t, t.return, Te);
          }
        }
        break;
      case 3:
        if (bu = null, f = ba, ba = vu(n.containerInfo), Tn(n, t), ba = f, Mn(t), o & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            ml(n.containerInfo);
          } catch (Te) {
            _t(t, t.return, Te);
          }
        bd && (bd = !1, H0(t));
        break;
      case 4:
        o = ba, ba = vu(
          t.stateNode.containerInfo
        ), Tn(n, t), Mn(t), ba = o;
        break;
      case 12:
        Tn(n, t), Mn(t);
        break;
      case 31:
        Tn(n, t), Mn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, au(t, o)));
        break;
      case 13:
        Tn(n, t), Mn(t), t.child.flags & 8192 && t.memoizedState !== null != (r !== null && r.memoizedState !== null) && (iu = Ke()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, au(t, o)));
        break;
      case 22:
        f = t.memoizedState !== null;
        var q = r !== null && r.memoizedState !== null, ie = rr, ue = Pt;
        if (rr = ie || f, Pt = ue || q, Tn(n, t), Pt = ue, rr = ie, Mn(t), o & 8192)
          e: for (n = t.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (r === null || q || rr || Pt || yi(t)), r = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                q = r = n;
                try {
                  if (h = q.stateNode, f)
                    w = h.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none";
                  else {
                    M = q.stateNode;
                    var fe = q.memoizedProps.style, le = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    M.style.display = le == null || typeof le == "boolean" ? "" : ("" + le).trim();
                  }
                } catch (Te) {
                  _t(q, q.return, Te);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                q = n;
                try {
                  q.stateNode.nodeValue = f ? "" : q.memoizedProps;
                } catch (Te) {
                  _t(q, q.return, Te);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                q = n;
                try {
                  var oe = q.stateNode;
                  f ? Cv(oe, !0) : Cv(q.stateNode, !1);
                } catch (Te) {
                  _t(q, q.return, Te);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === t) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === t) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break e;
              r === n && (r = null), n = n.return;
            }
            r === n && (r = null), n.sibling.return = n.return, n = n.sibling;
          }
        o & 4 && (o = t.updateQueue, o !== null && (r = o.retryQueue, r !== null && (o.retryQueue = null, au(t, r))));
        break;
      case 19:
        Tn(n, t), Mn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, au(t, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Tn(n, t), Mn(t);
    }
  }
  function Mn(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var r, o = t.return; o !== null; ) {
          if (T0(o)) {
            r = o;
            break;
          }
          o = o.return;
        }
        if (r == null) throw Error(l(160));
        switch (r.tag) {
          case 27:
            var f = r.stateNode, h = vd(t);
            nu(t, h, f);
            break;
          case 5:
            var w = r.stateNode;
            r.flags & 32 && (Hi(w, ""), r.flags &= -33);
            var M = vd(t);
            nu(t, M, w);
            break;
          case 3:
          case 4:
            var q = r.stateNode.containerInfo, ie = vd(t);
            yd(
              t,
              ie,
              q
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (ue) {
        _t(t, t.return, ue);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function H0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        H0(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function lr(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        A0(t, n.alternate, n), n = n.sibling;
  }
  function yi(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Hr(4, n, n.return), yi(n);
          break;
        case 1:
          La(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && C0(
            n,
            n.return,
            r
          ), yi(n);
          break;
        case 27:
          So(n.stateNode);
        case 26:
        case 5:
          La(n, n.return), yi(n);
          break;
        case 22:
          n.memoizedState === null && yi(n);
          break;
        case 30:
          yi(n);
          break;
        default:
          yi(n);
      }
      t = t.sibling;
    }
  }
  function or(t, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, f = t, h = n, w = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          or(
            f,
            h,
            r
          ), ho(4, h);
          break;
        case 1:
          if (or(
            f,
            h,
            r
          ), o = h, f = o.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (ie) {
              _t(o, o.return, ie);
            }
          if (o = h, f = o.updateQueue, f !== null) {
            var M = o.stateNode;
            try {
              var q = f.shared.hiddenCallbacks;
              if (q !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < q.length; f++)
                  mg(q[f], M);
            } catch (ie) {
              _t(o, o.return, ie);
            }
          }
          r && w & 64 && N0(h), mo(h, h.return);
          break;
        case 27:
          M0(h);
        case 26:
        case 5:
          or(
            f,
            h,
            r
          ), r && o === null && w & 4 && R0(h), mo(h, h.return);
          break;
        case 12:
          or(
            f,
            h,
            r
          );
          break;
        case 31:
          or(
            f,
            h,
            r
          ), r && w & 4 && z0(f, h);
          break;
        case 13:
          or(
            f,
            h,
            r
          ), r && w & 4 && L0(f, h);
          break;
        case 22:
          h.memoizedState === null && or(
            f,
            h,
            r
          ), mo(h, h.return);
          break;
        case 30:
          break;
        default:
          or(
            f,
            h,
            r
          );
      }
      n = n.sibling;
    }
  }
  function xd(t, n) {
    var r = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== r && (t != null && t.refCount++, r != null && Jl(r));
  }
  function wd(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Jl(t));
  }
  function xa(t, n, r, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        B0(
          t,
          n,
          r,
          o
        ), n = n.sibling;
  }
  function B0(t, n, r, o) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        xa(
          t,
          n,
          r,
          o
        ), f & 2048 && ho(9, n);
        break;
      case 1:
        xa(
          t,
          n,
          r,
          o
        );
        break;
      case 3:
        xa(
          t,
          n,
          r,
          o
        ), f & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Jl(t)));
        break;
      case 12:
        if (f & 2048) {
          xa(
            t,
            n,
            r,
            o
          ), t = n.stateNode;
          try {
            var h = n.memoizedProps, w = h.id, M = h.onPostCommit;
            typeof M == "function" && M(
              w,
              n.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (q) {
            _t(n, n.return, q);
          }
        } else
          xa(
            t,
            n,
            r,
            o
          );
        break;
      case 31:
        xa(
          t,
          n,
          r,
          o
        );
        break;
      case 13:
        xa(
          t,
          n,
          r,
          o
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, w = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? xa(
          t,
          n,
          r,
          o
        ) : po(t, n) : h._visibility & 2 ? xa(
          t,
          n,
          r,
          o
        ) : (h._visibility |= 2, al(
          t,
          n,
          r,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && xd(w, n);
        break;
      case 24:
        xa(
          t,
          n,
          r,
          o
        ), f & 2048 && wd(n.alternate, n);
        break;
      default:
        xa(
          t,
          n,
          r,
          o
        );
    }
  }
  function al(t, n, r, o, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = t, w = n, M = r, q = o, ie = w.flags;
      switch (w.tag) {
        case 0:
        case 11:
        case 15:
          al(
            h,
            w,
            M,
            q,
            f
          ), ho(8, w);
          break;
        case 23:
          break;
        case 22:
          var ue = w.stateNode;
          w.memoizedState !== null ? ue._visibility & 2 ? al(
            h,
            w,
            M,
            q,
            f
          ) : po(
            h,
            w
          ) : (ue._visibility |= 2, al(
            h,
            w,
            M,
            q,
            f
          )), f && ie & 2048 && xd(
            w.alternate,
            w
          );
          break;
        case 24:
          al(
            h,
            w,
            M,
            q,
            f
          ), f && ie & 2048 && wd(w.alternate, w);
          break;
        default:
          al(
            h,
            w,
            M,
            q,
            f
          );
      }
      n = n.sibling;
    }
  }
  function po(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = t, o = n, f = o.flags;
        switch (o.tag) {
          case 22:
            po(r, o), f & 2048 && xd(
              o.alternate,
              o
            );
            break;
          case 24:
            po(r, o), f & 2048 && wd(o.alternate, o);
            break;
          default:
            po(r, o);
        }
        n = n.sibling;
      }
  }
  var go = 8192;
  function rl(t, n, r) {
    if (t.subtreeFlags & go)
      for (t = t.child; t !== null; )
        U0(
          t,
          n,
          r
        ), t = t.sibling;
  }
  function U0(t, n, r) {
    switch (t.tag) {
      case 26:
        rl(
          t,
          n,
          r
        ), t.flags & go && t.memoizedState !== null && $E(
          r,
          ba,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        rl(
          t,
          n,
          r
        );
        break;
      case 3:
      case 4:
        var o = ba;
        ba = vu(t.stateNode.containerInfo), rl(
          t,
          n,
          r
        ), ba = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = go, go = 16777216, rl(
          t,
          n,
          r
        ), go = o) : rl(
          t,
          n,
          r
        ));
        break;
      default:
        rl(
          t,
          n,
          r
        );
    }
  }
  function V0(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function vo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          tn = o, q0(
            o,
            t
          );
        }
      V0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        $0(t), t = t.sibling;
  }
  function $0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        vo(t), t.flags & 2048 && Hr(9, t, t.return);
        break;
      case 3:
        vo(t);
        break;
      case 12:
        vo(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, ru(t)) : vo(t);
        break;
      default:
        vo(t);
    }
  }
  function ru(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          tn = o, q0(
            o,
            t
          );
        }
      V0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          Hr(8, n, n.return), ru(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, ru(n));
          break;
        default:
          ru(n);
      }
      t = t.sibling;
    }
  }
  function q0(t, n) {
    for (; tn !== null; ) {
      var r = tn;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Hr(8, r, n);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var o = r.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Jl(r.memoizedState.cache);
      }
      if (o = r.child, o !== null) o.return = r, tn = o;
      else
        e: for (r = t; tn !== null; ) {
          o = tn;
          var f = o.sibling, h = o.return;
          if (j0(o), o === r) {
            tn = null;
            break e;
          }
          if (f !== null) {
            f.return = h, tn = f;
            break e;
          }
          tn = h;
        }
    }
  }
  var nE = {
    getCacheForType: function(t) {
      var n = on(Gt), r = n.data.get(t);
      return r === void 0 && (r = t(), n.data.set(t, r)), r;
    },
    cacheSignal: function() {
      return on(Gt).controller.signal;
    }
  }, aE = typeof WeakMap == "function" ? WeakMap : Map, mt = 0, Rt = null, We = null, tt = 0, wt = 0, qn = null, Br = !1, il = !1, _d = !1, sr = 0, Bt = 0, Ur = 0, bi = 0, Sd = 0, In = 0, ll = 0, yo = null, Dn = null, Ed = !1, iu = 0, I0 = 0, lu = 1 / 0, ou = null, Vr = null, Jt = 0, $r = null, ol = null, ur = 0, Nd = 0, Cd = null, Y0 = null, bo = 0, Rd = null;
  function Yn() {
    return (mt & 2) !== 0 && tt !== 0 ? tt & -tt : T.T !== null ? Od() : me();
  }
  function G0() {
    if (In === 0)
      if ((tt & 536870912) === 0 || it) {
        var t = Ln;
        Ln <<= 1, (Ln & 3932160) === 0 && (Ln = 262144), In = t;
      } else In = 536870912;
    return t = Vn.current, t !== null && (t.flags |= 32), In;
  }
  function An(t, n, r) {
    (t === Rt && (wt === 2 || wt === 9) || t.cancelPendingCommit !== null) && (sl(t, 0), qr(
      t,
      tt,
      In,
      !1
    )), gt(t, r), ((mt & 2) === 0 || t !== Rt) && (t === Rt && ((mt & 2) === 0 && (bi |= r), Bt === 4 && qr(
      t,
      tt,
      In,
      !1
    )), ka(t));
  }
  function F0(t, n, r) {
    if ((mt & 6) !== 0) throw Error(l(327));
    var o = !r && (n & 127) === 0 && (n & t.expiredLanes) === 0 || bt(t, n), f = o ? lE(t, n) : Md(t, n, !0), h = o;
    do {
      if (f === 0) {
        il && !o && qr(t, n, 0, !1);
        break;
      } else {
        if (r = t.current.alternate, h && !rE(r)) {
          f = Md(t, n, !1), h = !1;
          continue;
        }
        if (f === 2) {
          if (h = n, t.errorRecoveryDisabledLanes & h)
            var w = 0;
          else
            w = t.pendingLanes & -536870913, w = w !== 0 ? w : w & 536870912 ? 536870912 : 0;
          if (w !== 0) {
            n = w;
            e: {
              var M = t;
              f = yo;
              var q = M.current.memoizedState.isDehydrated;
              if (q && (sl(M, w).flags |= 256), w = Md(
                M,
                w,
                !1
              ), w !== 2) {
                if (_d && !q) {
                  M.errorRecoveryDisabledLanes |= h, bi |= h, f = 4;
                  break e;
                }
                h = Dn, Dn = f, h !== null && (Dn === null ? Dn = h : Dn.push.apply(
                  Dn,
                  h
                ));
              }
              f = w;
            }
            if (h = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          sl(t, 0), qr(t, n, 0, !0);
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
              qr(
                o,
                n,
                In,
                !Br
              );
              break e;
            case 2:
              Dn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((n & 62914560) === n && (f = iu + 300 - Ke(), 10 < f)) {
            if (qr(
              o,
              n,
              In,
              !Br
            ), Ve(o, 0, !0) !== 0) break e;
            ur = n, o.timeoutHandle = Sv(
              X0.bind(
                null,
                o,
                r,
                Dn,
                ou,
                Ed,
                n,
                In,
                bi,
                ll,
                Br,
                h,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break e;
          }
          X0(
            o,
            r,
            Dn,
            ou,
            Ed,
            n,
            In,
            bi,
            ll,
            Br,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ka(t);
  }
  function X0(t, n, r, o, f, h, w, M, q, ie, ue, fe, le, oe) {
    if (t.timeoutHandle = -1, fe = n.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Pa
      }, U0(
        n,
        h,
        fe
      );
      var Te = (h & 62914560) === h ? iu - Ke() : (h & 4194048) === h ? I0 - Ke() : 0;
      if (Te = qE(
        fe,
        Te
      ), Te !== null) {
        ur = h, t.cancelPendingCommit = Te(
          tv.bind(
            null,
            t,
            n,
            h,
            r,
            o,
            f,
            w,
            M,
            q,
            ue,
            fe,
            null,
            le,
            oe
          )
        ), qr(t, h, w, !ie);
        return;
      }
    }
    tv(
      t,
      n,
      h,
      r,
      o,
      f,
      w,
      M,
      q
    );
  }
  function rE(t) {
    for (var n = t; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var o = 0; o < r.length; o++) {
          var f = r[o], h = f.getSnapshot;
          f = f.value;
          try {
            if (!Bn(h(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (r = n.child, n.subtreeFlags & 16384 && r !== null)
        r.return = n, n = r;
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
  function qr(t, n, r, o) {
    n &= ~Sd, n &= ~bi, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var f = n; 0 < f; ) {
      var h = 31 - Ut(f), w = 1 << h;
      o[h] = -1, f &= ~w;
    }
    r !== 0 && pa(t, r, n);
  }
  function su() {
    return (mt & 6) === 0 ? (xo(0), !1) : !0;
  }
  function Td() {
    if (We !== null) {
      if (wt === 0)
        var t = We.return;
      else
        t = We, Wa = ci = null, Yf(t), Wi = null, to = 0, t = We;
      for (; t !== null; )
        E0(t.alternate, t), t = t.return;
      We = null;
    }
  }
  function sl(t, n) {
    var r = t.timeoutHandle;
    r !== -1 && (t.timeoutHandle = -1, EE(r)), r = t.cancelPendingCommit, r !== null && (t.cancelPendingCommit = null, r()), ur = 0, Td(), Rt = t, We = r = Qa(t.current, null), tt = n, wt = 0, qn = null, Br = !1, il = bt(t, n), _d = !1, ll = In = Sd = bi = Ur = Bt = 0, Dn = yo = null, Ed = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var f = 31 - Ut(o), h = 1 << f;
        n |= t[f], o &= ~h;
      }
    return sr = n, Ms(), r;
  }
  function P0(t, n) {
    Ge = null, T.H = uo, n === Ki || n === Hs ? (n = cg(), wt = 3) : n === jf ? (n = cg(), wt = 4) : wt = n === ld ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, qn = n, We === null && (Bt = 1, Ks(
      t,
      Jn(n, t.current)
    ));
  }
  function Z0() {
    var t = Vn.current;
    return t === null ? !0 : (tt & 4194048) === tt ? aa === null : (tt & 62914560) === tt || (tt & 536870912) !== 0 ? t === aa : !1;
  }
  function Q0() {
    var t = T.H;
    return T.H = uo, t === null ? uo : t;
  }
  function K0() {
    var t = T.A;
    return T.A = nE, t;
  }
  function uu() {
    Bt = 4, Br || (tt & 4194048) !== tt && Vn.current !== null || (il = !0), (Ur & 134217727) === 0 && (bi & 134217727) === 0 || Rt === null || qr(
      Rt,
      tt,
      In,
      !1
    );
  }
  function Md(t, n, r) {
    var o = mt;
    mt |= 2;
    var f = Q0(), h = K0();
    (Rt !== t || tt !== n) && (ou = null, sl(t, n)), n = !1;
    var w = Bt;
    e: do
      try {
        if (wt !== 0 && We !== null) {
          var M = We, q = qn;
          switch (wt) {
            case 8:
              Td(), w = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Vn.current === null && (n = !0);
              var ie = wt;
              if (wt = 0, qn = null, ul(t, M, q, ie), r && il) {
                w = 0;
                break e;
              }
              break;
            default:
              ie = wt, wt = 0, qn = null, ul(t, M, q, ie);
          }
        }
        iE(), w = Bt;
        break;
      } catch (ue) {
        P0(t, ue);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Wa = ci = null, mt = o, T.H = f, T.A = h, We === null && (Rt = null, tt = 0, Ms()), w;
  }
  function iE() {
    for (; We !== null; ) W0(We);
  }
  function lE(t, n) {
    var r = mt;
    mt |= 2;
    var o = Q0(), f = K0();
    Rt !== t || tt !== n ? (ou = null, lu = Ke() + 500, sl(t, n)) : il = bt(
      t,
      n
    );
    e: do
      try {
        if (wt !== 0 && We !== null) {
          n = We;
          var h = qn;
          t: switch (wt) {
            case 1:
              wt = 0, qn = null, ul(t, n, h, 1);
              break;
            case 2:
            case 9:
              if (sg(h)) {
                wt = 0, qn = null, J0(n);
                break;
              }
              n = function() {
                wt !== 2 && wt !== 9 || Rt !== t || (wt = 7), ka(t);
              }, h.then(n, n);
              break e;
            case 3:
              wt = 7;
              break e;
            case 4:
              wt = 5;
              break e;
            case 7:
              sg(h) ? (wt = 0, qn = null, J0(n)) : (wt = 0, qn = null, ul(t, n, h, 7));
              break;
            case 5:
              var w = null;
              switch (We.tag) {
                case 26:
                  w = We.memoizedState;
                case 5:
                case 27:
                  var M = We;
                  if (w ? Bv(w) : M.stateNode.complete) {
                    wt = 0, qn = null;
                    var q = M.sibling;
                    if (q !== null) We = q;
                    else {
                      var ie = M.return;
                      ie !== null ? (We = ie, cu(ie)) : We = null;
                    }
                    break t;
                  }
              }
              wt = 0, qn = null, ul(t, n, h, 5);
              break;
            case 6:
              wt = 0, qn = null, ul(t, n, h, 6);
              break;
            case 8:
              Td(), Bt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        oE();
        break;
      } catch (ue) {
        P0(t, ue);
      }
    while (!0);
    return Wa = ci = null, T.H = o, T.A = f, mt = r, We !== null ? 0 : (Rt = null, tt = 0, Ms(), Bt);
  }
  function oE() {
    for (; We !== null && !Ze(); )
      W0(We);
  }
  function W0(t) {
    var n = _0(t.alternate, t, sr);
    t.memoizedProps = t.pendingProps, n === null ? cu(t) : We = n;
  }
  function J0(t) {
    var n = t, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = g0(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          tt
        );
        break;
      case 11:
        n = g0(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          tt
        );
        break;
      case 5:
        Yf(n);
      default:
        E0(r, n), n = We = Kp(n, sr), n = _0(r, n, sr);
    }
    t.memoizedProps = t.pendingProps, n === null ? cu(t) : We = n;
  }
  function ul(t, n, r, o) {
    Wa = ci = null, Yf(n), Wi = null, to = 0;
    var f = n.return;
    try {
      if (ZS(
        t,
        f,
        n,
        r,
        tt
      )) {
        Bt = 1, Ks(
          t,
          Jn(r, t.current)
        ), We = null;
        return;
      }
    } catch (h) {
      if (f !== null) throw We = f, h;
      Bt = 1, Ks(
        t,
        Jn(r, t.current)
      ), We = null;
      return;
    }
    n.flags & 32768 ? (it || o === 1 ? t = !0 : il || (tt & 536870912) !== 0 ? t = !1 : (Br = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Vn.current, o !== null && o.tag === 13 && (o.flags |= 16384))), ev(n, t)) : cu(n);
  }
  function cu(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        ev(
          n,
          Br
        );
        return;
      }
      t = n.return;
      var r = WS(
        n.alternate,
        n,
        sr
      );
      if (r !== null) {
        We = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        We = n;
        return;
      }
      We = n = t;
    } while (n !== null);
    Bt === 0 && (Bt = 5);
  }
  function ev(t, n) {
    do {
      var r = JS(t.alternate, t);
      if (r !== null) {
        r.flags &= 32767, We = r;
        return;
      }
      if (r = t.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (t = t.sibling, t !== null)) {
        We = t;
        return;
      }
      We = t = r;
    } while (t !== null);
    Bt = 6, We = null;
  }
  function tv(t, n, r, o, f, h, w, M, q) {
    t.cancelPendingCommit = null;
    do
      fu();
    while (Jt !== 0);
    if ((mt & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === t.current) throw Error(l(177));
      if (h = n.lanes | n.childLanes, h |= vf, Wt(
        t,
        r,
        h,
        w,
        M,
        q
      ), t === Rt && (We = Rt = null, tt = 0), ol = n, $r = t, ur = r, Nd = h, Cd = f, Y0 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, fE(Lt, function() {
        return lv(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = T.T, T.T = null, f = z.p, z.p = 2, w = mt, mt |= 4;
        try {
          eE(t, n, r);
        } finally {
          mt = w, z.p = f, T.T = o;
        }
      }
      Jt = 1, nv(), av(), rv();
    }
  }
  function nv() {
    if (Jt === 1) {
      Jt = 0;
      var t = $r, n = ol, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = T.T, T.T = null;
        var o = z.p;
        z.p = 2;
        var f = mt;
        mt |= 4;
        try {
          k0(n, t);
          var h = $d, w = qp(t.containerInfo), M = h.focusedElem, q = h.selectionRange;
          if (w !== M && M && M.ownerDocument && $p(
            M.ownerDocument.documentElement,
            M
          )) {
            if (q !== null && df(M)) {
              var ie = q.start, ue = q.end;
              if (ue === void 0 && (ue = ie), "selectionStart" in M)
                M.selectionStart = ie, M.selectionEnd = Math.min(
                  ue,
                  M.value.length
                );
              else {
                var fe = M.ownerDocument || document, le = fe && fe.defaultView || window;
                if (le.getSelection) {
                  var oe = le.getSelection(), Te = M.textContent.length, Ue = Math.min(q.start, Te), Nt = q.end === void 0 ? Ue : Math.min(q.end, Te);
                  !oe.extend && Ue > Nt && (w = Nt, Nt = Ue, Ue = w);
                  var K = Vp(
                    M,
                    Ue
                  ), P = Vp(
                    M,
                    Nt
                  );
                  if (K && P && (oe.rangeCount !== 1 || oe.anchorNode !== K.node || oe.anchorOffset !== K.offset || oe.focusNode !== P.node || oe.focusOffset !== P.offset)) {
                    var re = fe.createRange();
                    re.setStart(K.node, K.offset), oe.removeAllRanges(), Ue > Nt ? (oe.addRange(re), oe.extend(P.node, P.offset)) : (re.setEnd(P.node, P.offset), oe.addRange(re));
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
          Su = !!Vd, $d = Vd = null;
        } finally {
          mt = f, z.p = o, T.T = r;
        }
      }
      t.current = n, Jt = 2;
    }
  }
  function av() {
    if (Jt === 2) {
      Jt = 0;
      var t = $r, n = ol, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = T.T, T.T = null;
        var o = z.p;
        z.p = 2;
        var f = mt;
        mt |= 4;
        try {
          A0(t, n.alternate, n);
        } finally {
          mt = f, z.p = o, T.T = r;
        }
      }
      Jt = 3;
    }
  }
  function rv() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, Fe();
      var t = $r, n = ol, r = ur, o = Y0;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, ol = $r = null, iv(t, t.pendingLanes));
      var f = t.pendingLanes;
      if (f === 0 && (Vr = null), te(r), n = n.stateNode, Kt && typeof Kt.onCommitFiberRoot == "function")
        try {
          Kt.onCommitFiberRoot(
            nn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = T.T, f = z.p, z.p = 2, T.T = null;
        try {
          for (var h = t.onRecoverableError, w = 0; w < o.length; w++) {
            var M = o[w];
            h(M.value, {
              componentStack: M.stack
            });
          }
        } finally {
          T.T = n, z.p = f;
        }
      }
      (ur & 3) !== 0 && fu(), ka(t), f = t.pendingLanes, (r & 261930) !== 0 && (f & 42) !== 0 ? t === Rd ? bo++ : (bo = 0, Rd = t) : bo = 0, xo(0);
    }
  }
  function iv(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Jl(n)));
  }
  function fu() {
    return nv(), av(), rv(), lv();
  }
  function lv() {
    if (Jt !== 5) return !1;
    var t = $r, n = Nd;
    Nd = 0;
    var r = te(ur), o = T.T, f = z.p;
    try {
      z.p = 32 > r ? 32 : r, T.T = null, r = Cd, Cd = null;
      var h = $r, w = ur;
      if (Jt = 0, ol = $r = null, ur = 0, (mt & 6) !== 0) throw Error(l(331));
      var M = mt;
      if (mt |= 4, $0(h.current), B0(
        h,
        h.current,
        w,
        r
      ), mt = M, xo(0, !1), Kt && typeof Kt.onPostCommitFiberRoot == "function")
        try {
          Kt.onPostCommitFiberRoot(nn, h);
        } catch {
        }
      return !0;
    } finally {
      z.p = f, T.T = o, iv(t, n);
    }
  }
  function ov(t, n, r) {
    n = Jn(r, n), n = id(t.stateNode, n, 2), t = zr(t, n, 2), t !== null && (gt(t, 2), ka(t));
  }
  function _t(t, n, r) {
    if (t.tag === 3)
      ov(t, t, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          ov(
            n,
            t,
            r
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Vr === null || !Vr.has(o))) {
            t = Jn(r, t), r = s0(2), o = zr(n, r, 2), o !== null && (u0(
              r,
              o,
              n,
              t
            ), gt(o, 2), ka(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function Dd(t, n, r) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new aE();
      var f = /* @__PURE__ */ new Set();
      o.set(n, f);
    } else
      f = o.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(n, f));
    f.has(r) || (_d = !0, f.add(r), t = sE.bind(null, t, n, r), n.then(t, t));
  }
  function sE(t, n, r) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & r, t.warmLanes &= ~r, Rt === t && (tt & r) === r && (Bt === 4 || Bt === 3 && (tt & 62914560) === tt && 300 > Ke() - iu ? (mt & 2) === 0 && sl(t, 0) : Sd |= r, ll === tt && (ll = 0)), ka(t);
  }
  function sv(t, n) {
    n === 0 && (n = Vt()), t = oi(t, n), t !== null && (gt(t, n), ka(t));
  }
  function uE(t) {
    var n = t.memoizedState, r = 0;
    n !== null && (r = n.retryLane), sv(t, r);
  }
  function cE(t, n) {
    var r = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var o = t.stateNode, f = t.memoizedState;
        f !== null && (r = f.retryLane);
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
    o !== null && o.delete(n), sv(t, r);
  }
  function fE(t, n) {
    return Ae(t, n);
  }
  var du = null, cl = null, Ad = !1, hu = !1, jd = !1, Ir = 0;
  function ka(t) {
    t !== cl && t.next === null && (cl === null ? du = cl = t : cl = cl.next = t), hu = !0, Ad || (Ad = !0, hE());
  }
  function xo(t, n) {
    if (!jd && hu) {
      jd = !0;
      do
        for (var r = !1, o = du; o !== null; ) {
          if (t !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var h = 0;
            else {
              var w = o.suspendedLanes, M = o.pingedLanes;
              h = (1 << 31 - Ut(42 | t) + 1) - 1, h &= f & ~(w & ~M), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, dv(o, h));
          } else
            h = tt, h = Ve(
              o,
              o === Rt ? h : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (h & 3) === 0 || bt(o, h) || (r = !0, dv(o, h));
          o = o.next;
        }
      while (r);
      jd = !1;
    }
  }
  function dE() {
    uv();
  }
  function uv() {
    hu = Ad = !1;
    var t = 0;
    Ir !== 0 && SE() && (t = Ir);
    for (var n = Ke(), r = null, o = du; o !== null; ) {
      var f = o.next, h = cv(o, n);
      h === 0 ? (o.next = null, r === null ? du = f : r.next = f, f === null && (cl = r)) : (r = o, (t !== 0 || (h & 3) !== 0) && (hu = !0)), o = f;
    }
    Jt !== 0 && Jt !== 5 || xo(t), Ir !== 0 && (Ir = 0);
  }
  function cv(t, n) {
    for (var r = t.suspendedLanes, o = t.pingedLanes, f = t.expirationTimes, h = t.pendingLanes & -62914561; 0 < h; ) {
      var w = 31 - Ut(h), M = 1 << w, q = f[w];
      q === -1 ? ((M & r) === 0 || (M & o) !== 0) && (f[w] = kt(M, n)) : q <= n && (t.expiredLanes |= M), h &= ~M;
    }
    if (n = Rt, r = tt, r = Ve(
      t,
      t === n ? r : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, r === 0 || t === n && (wt === 2 || wt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && lt(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((r & 3) === 0 || bt(t, r)) {
      if (n = r & -r, n === t.callbackPriority) return n;
      switch (o !== null && lt(o), te(r)) {
        case 2:
        case 8:
          r = Yt;
          break;
        case 32:
          r = Lt;
          break;
        case 268435456:
          r = ut;
          break;
        default:
          r = Lt;
      }
      return o = fv.bind(null, t), r = Ae(r, o), t.callbackPriority = n, t.callbackNode = r, n;
    }
    return o !== null && o !== null && lt(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function fv(t, n) {
    if (Jt !== 0 && Jt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var r = t.callbackNode;
    if (fu() && t.callbackNode !== r)
      return null;
    var o = tt;
    return o = Ve(
      t,
      t === Rt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (F0(t, o, n), cv(t, Ke()), t.callbackNode != null && t.callbackNode === r ? fv.bind(null, t) : null);
  }
  function dv(t, n) {
    if (fu()) return null;
    F0(t, n, !0);
  }
  function hE() {
    NE(function() {
      (mt & 6) !== 0 ? Ae(
        yt,
        dE
      ) : uv();
    });
  }
  function Od() {
    if (Ir === 0) {
      var t = Zi;
      t === 0 && (t = ma, ma <<= 1, (ma & 261888) === 0 && (ma = 256)), Ir = t;
    }
    return Ir;
  }
  function hv(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ws("" + t);
  }
  function mv(t, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, t.id && r.setAttribute("form", t.id), n.parentNode.insertBefore(r, n), t = new FormData(t), r.parentNode.removeChild(r), t;
  }
  function mE(t, n, r, o, f) {
    if (n === "submit" && r && r.stateNode === f) {
      var h = hv(
        (f[Ne] || null).action
      ), w = o.submitter;
      w && (n = (n = w[Ne] || null) ? hv(n.formAction) : w.getAttribute("formAction"), n !== null && (h = n, w = null));
      var M = new Ns(
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
                if (Ir !== 0) {
                  var q = w ? mv(f, w) : new FormData(f);
                  Jf(
                    r,
                    {
                      pending: !0,
                      data: q,
                      method: f.method,
                      action: h
                    },
                    null,
                    q
                  );
                }
              } else
                typeof h == "function" && (M.preventDefault(), q = w ? mv(f, w) : new FormData(f), Jf(
                  r,
                  {
                    pending: !0,
                    data: q,
                    method: f.method,
                    action: h
                  },
                  h,
                  q
                ));
            },
            currentTarget: f
          }
        ]
      });
    }
  }
  for (var zd = 0; zd < gf.length; zd++) {
    var Ld = gf[zd], pE = Ld.toLowerCase(), gE = Ld[0].toUpperCase() + Ld.slice(1);
    ya(
      pE,
      "on" + gE
    );
  }
  ya(Gp, "onAnimationEnd"), ya(Fp, "onAnimationIteration"), ya(Xp, "onAnimationStart"), ya("dblclick", "onDoubleClick"), ya("focusin", "onFocus"), ya("focusout", "onBlur"), ya(jS, "onTransitionRun"), ya(OS, "onTransitionStart"), ya(zS, "onTransitionCancel"), ya(Pp, "onTransitionEnd"), an("onMouseEnter", ["mouseout", "mouseover"]), an("onMouseLeave", ["mouseout", "mouseover"]), an("onPointerEnter", ["pointerout", "pointerover"]), an("onPointerLeave", ["pointerout", "pointerover"]), dn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), dn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), dn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), dn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), dn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), dn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var wo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), vE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wo)
  );
  function pv(t, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < t.length; r++) {
      var o = t[r], f = o.event;
      o = o.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var w = o.length - 1; 0 <= w; w--) {
            var M = o[w], q = M.instance, ie = M.currentTarget;
            if (M = M.listener, q !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = ie;
            try {
              h(f);
            } catch (ue) {
              Ts(ue);
            }
            f.currentTarget = null, h = q;
          }
        else
          for (w = 0; w < o.length; w++) {
            if (M = o[w], q = M.instance, ie = M.currentTarget, M = M.listener, q !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = ie;
            try {
              h(f);
            } catch (ue) {
              Ts(ue);
            }
            f.currentTarget = null, h = q;
          }
      }
    }
  }
  function Je(t, n) {
    var r = n[ze];
    r === void 0 && (r = n[ze] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    r.has(o) || (gv(n, t, 2, !1), r.add(o));
  }
  function kd(t, n, r) {
    var o = 0;
    n && (o |= 4), gv(
      r,
      t,
      o,
      n
    );
  }
  var mu = "_reactListening" + Math.random().toString(36).slice(2);
  function Hd(t) {
    if (!t[mu]) {
      t[mu] = !0, ja.forEach(function(r) {
        r !== "selectionchange" && (vE.has(r) || kd(r, !1, t), kd(r, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[mu] || (n[mu] = !0, kd("selectionchange", !1, n));
    }
  }
  function gv(t, n, r, o) {
    switch (Gv(n)) {
      case 2:
        var f = GE;
        break;
      case 8:
        f = FE;
        break;
      default:
        f = Wd;
    }
    r = f.bind(
      null,
      n,
      r,
      t
    ), f = void 0, !nf || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), o ? f !== void 0 ? t.addEventListener(n, r, {
      capture: !0,
      passive: f
    }) : t.addEventListener(n, r, !0) : f !== void 0 ? t.addEventListener(n, r, {
      passive: f
    }) : t.addEventListener(n, r, !1);
  }
  function Bd(t, n, r, o, f) {
    var h = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var w = o.tag;
        if (w === 3 || w === 4) {
          var M = o.stateNode.containerInfo;
          if (M === f) break;
          if (w === 4)
            for (w = o.return; w !== null; ) {
              var q = w.tag;
              if ((q === 3 || q === 4) && w.stateNode.containerInfo === f)
                return;
              w = w.return;
            }
          for (; M !== null; ) {
            if (w = Ct(M), w === null) return;
            if (q = w.tag, q === 5 || q === 6 || q === 26 || q === 27) {
              o = h = w;
              continue e;
            }
            M = M.parentNode;
          }
        }
        o = o.return;
      }
    wp(function() {
      var ie = h, ue = ef(r), fe = [];
      e: {
        var le = Zp.get(t);
        if (le !== void 0) {
          var oe = Ns, Te = t;
          switch (t) {
            case "keypress":
              if (Ss(r) === 0) break e;
            case "keydown":
            case "keyup":
              oe = cS;
              break;
            case "focusin":
              Te = "focus", oe = of;
              break;
            case "focusout":
              Te = "blur", oe = of;
              break;
            case "beforeblur":
            case "afterblur":
              oe = of;
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
              oe = Ep;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = W_;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = hS;
              break;
            case Gp:
            case Fp:
            case Xp:
              oe = tS;
              break;
            case Pp:
              oe = pS;
              break;
            case "scroll":
            case "scrollend":
              oe = Q_;
              break;
            case "wheel":
              oe = vS;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = aS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = Cp;
              break;
            case "toggle":
            case "beforetoggle":
              oe = bS;
          }
          var Ue = (n & 4) !== 0, Nt = !Ue && (t === "scroll" || t === "scrollend"), K = Ue ? le !== null ? le + "Capture" : null : le;
          Ue = [];
          for (var P = ie, re; P !== null; ) {
            var ce = P;
            if (re = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || re === null || K === null || (ce = ql(P, K), ce != null && Ue.push(
              _o(P, ce, re)
            )), Nt) break;
            P = P.return;
          }
          0 < Ue.length && (le = new oe(
            le,
            Te,
            null,
            r,
            ue
          ), fe.push({ event: le, listeners: Ue }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (le = t === "mouseover" || t === "pointerover", oe = t === "mouseout" || t === "pointerout", le && r !== Jc && (Te = r.relatedTarget || r.fromElement) && (Ct(Te) || Te[Se]))
            break e;
          if ((oe || le) && (le = ue.window === ue ? ue : (le = ue.ownerDocument) ? le.defaultView || le.parentWindow : window, oe ? (Te = r.relatedTarget || r.toElement, oe = ie, Te = Te ? Ct(Te) : null, Te !== null && (Nt = u(Te), Ue = Te.tag, Te !== Nt || Ue !== 5 && Ue !== 27 && Ue !== 6) && (Te = null)) : (oe = null, Te = ie), oe !== Te)) {
            if (Ue = Ep, ce = "onMouseLeave", K = "onMouseEnter", P = "mouse", (t === "pointerout" || t === "pointerover") && (Ue = Cp, ce = "onPointerLeave", K = "onPointerEnter", P = "pointer"), Nt = oe == null ? le : et(oe), re = Te == null ? le : et(Te), le = new Ue(
              ce,
              P + "leave",
              oe,
              r,
              ue
            ), le.target = Nt, le.relatedTarget = re, ce = null, Ct(ue) === ie && (Ue = new Ue(
              K,
              P + "enter",
              Te,
              r,
              ue
            ), Ue.target = re, Ue.relatedTarget = Nt, ce = Ue), Nt = ce, oe && Te)
              t: {
                for (Ue = yE, K = oe, P = Te, re = 0, ce = K; ce; ce = Ue(ce))
                  re++;
                ce = 0;
                for (var He = P; He; He = Ue(He))
                  ce++;
                for (; 0 < re - ce; )
                  K = Ue(K), re--;
                for (; 0 < ce - re; )
                  P = Ue(P), ce--;
                for (; re--; ) {
                  if (K === P || P !== null && K === P.alternate) {
                    Ue = K;
                    break t;
                  }
                  K = Ue(K), P = Ue(P);
                }
                Ue = null;
              }
            else Ue = null;
            oe !== null && vv(
              fe,
              le,
              oe,
              Ue,
              !1
            ), Te !== null && Nt !== null && vv(
              fe,
              Nt,
              Te,
              Ue,
              !0
            );
          }
        }
        e: {
          if (le = ie ? et(ie) : window, oe = le.nodeName && le.nodeName.toLowerCase(), oe === "select" || oe === "input" && le.type === "file")
            var ft = zp;
          else if (jp(le))
            if (Lp)
              ft = MS;
            else {
              ft = RS;
              var je = CS;
            }
          else
            oe = le.nodeName, !oe || oe.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? ie && Wc(ie.elementType) && (ft = zp) : ft = TS;
          if (ft && (ft = ft(t, ie))) {
            Op(
              fe,
              ft,
              r,
              ue
            );
            break e;
          }
          je && je(t, le, ie), t === "focusout" && ie && le.type === "number" && ie.memoizedProps.value != null && Vl(le, "number", le.value);
        }
        switch (je = ie ? et(ie) : window, t) {
          case "focusin":
            (jp(je) || je.contentEditable === "true") && ($i = je, hf = ie, Ql = null);
            break;
          case "focusout":
            Ql = hf = $i = null;
            break;
          case "mousedown":
            mf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            mf = !1, Ip(fe, r, ue);
            break;
          case "selectionchange":
            if (AS) break;
          case "keydown":
          case "keyup":
            Ip(fe, r, ue);
        }
        var Xe;
        if (uf)
          e: {
            switch (t) {
              case "compositionstart":
                var nt = "onCompositionStart";
                break e;
              case "compositionend":
                nt = "onCompositionEnd";
                break e;
              case "compositionupdate":
                nt = "onCompositionUpdate";
                break e;
            }
            nt = void 0;
          }
        else
          Vi ? Dp(t, r) && (nt = "onCompositionEnd") : t === "keydown" && r.keyCode === 229 && (nt = "onCompositionStart");
        nt && (Rp && r.locale !== "ko" && (Vi || nt !== "onCompositionStart" ? nt === "onCompositionEnd" && Vi && (Xe = _p()) : (Rr = ue, af = "value" in Rr ? Rr.value : Rr.textContent, Vi = !0)), je = pu(ie, nt), 0 < je.length && (nt = new Np(
          nt,
          t,
          null,
          r,
          ue
        ), fe.push({ event: nt, listeners: je }), Xe ? nt.data = Xe : (Xe = Ap(r), Xe !== null && (nt.data = Xe)))), (Xe = wS ? _S(t, r) : SS(t, r)) && (nt = pu(ie, "onBeforeInput"), 0 < nt.length && (je = new Np(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ue
        ), fe.push({
          event: je,
          listeners: nt
        }), je.data = Xe)), mE(
          fe,
          t,
          ie,
          r,
          ue
        );
      }
      pv(fe, n);
    });
  }
  function _o(t, n, r) {
    return {
      instance: t,
      listener: n,
      currentTarget: r
    };
  }
  function pu(t, n) {
    for (var r = n + "Capture", o = []; t !== null; ) {
      var f = t, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = ql(t, r), f != null && o.unshift(
        _o(t, f, h)
      ), f = ql(t, n), f != null && o.push(
        _o(t, f, h)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function yE(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function vv(t, n, r, o, f) {
    for (var h = n._reactName, w = []; r !== null && r !== o; ) {
      var M = r, q = M.alternate, ie = M.stateNode;
      if (M = M.tag, q !== null && q === o) break;
      M !== 5 && M !== 26 && M !== 27 || ie === null || (q = ie, f ? (ie = ql(r, h), ie != null && w.unshift(
        _o(r, ie, q)
      )) : f || (ie = ql(r, h), ie != null && w.push(
        _o(r, ie, q)
      ))), r = r.return;
    }
    w.length !== 0 && t.push({ event: n, listeners: w });
  }
  var bE = /\r\n?/g, xE = /\u0000|\uFFFD/g;
  function yv(t) {
    return (typeof t == "string" ? t : "" + t).replace(bE, `
`).replace(xE, "");
  }
  function bv(t, n) {
    return n = yv(n), yv(t) === n;
  }
  function Et(t, n, r, o, f, h) {
    switch (r) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Hi(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Hi(t, "" + o);
        break;
      case "className":
        va(t, "class", o);
        break;
      case "tabIndex":
        va(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        va(t, r, o);
        break;
      case "style":
        bp(t, o, h);
        break;
      case "data":
        if (n !== "object") {
          va(t, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (n !== "a" || r !== "href")) {
          t.removeAttribute(r);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(r);
          break;
        }
        o = ws("" + o), t.setAttribute(r, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          t.setAttribute(
            r,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof h == "function" && (r === "formAction" ? (n !== "input" && Et(t, n, "name", f.name, f, null), Et(
            t,
            n,
            "formEncType",
            f.formEncType,
            f,
            null
          ), Et(
            t,
            n,
            "formMethod",
            f.formMethod,
            f,
            null
          ), Et(
            t,
            n,
            "formTarget",
            f.formTarget,
            f,
            null
          )) : (Et(t, n, "encType", f.encType, f, null), Et(t, n, "method", f.method, f, null), Et(t, n, "target", f.target, f, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(r);
          break;
        }
        o = ws("" + o), t.setAttribute(r, o);
        break;
      case "onClick":
        o != null && (t.onclick = Pa);
        break;
      case "onScroll":
        o != null && Je("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Je("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (r = o.__html, r != null) {
            if (f.children != null) throw Error(l(60));
            t.innerHTML = r;
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
        r = ws("" + o), t.setAttributeNS(
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
        o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(r, "" + o) : t.removeAttribute(r);
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
        o && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(r, "") : t.removeAttribute(r);
        break;
      case "capture":
      case "download":
        o === !0 ? t.setAttribute(r, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(r, o) : t.removeAttribute(r);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? t.setAttribute(r, o) : t.removeAttribute(r);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? t.removeAttribute(r) : t.setAttribute(r, o);
        break;
      case "popover":
        Je("beforetoggle", t), Je("toggle", t), ga(t, "popover", o);
        break;
      case "xlinkActuate":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        $e(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        $e(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        $e(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        ga(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = P_.get(r) || r, ga(t, r, o));
    }
  }
  function Ud(t, n, r, o, f, h) {
    switch (r) {
      case "style":
        bp(t, o, h);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (r = o.__html, r != null) {
            if (f.children != null) throw Error(l(60));
            t.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof o == "string" ? Hi(t, o) : (typeof o == "number" || typeof o == "bigint") && Hi(t, "" + o);
        break;
      case "onScroll":
        o != null && Je("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Je("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = Pa);
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
        if (!kn.hasOwnProperty(r))
          e: {
            if (r[0] === "o" && r[1] === "n" && (f = r.endsWith("Capture"), n = r.slice(2, f ? r.length - 7 : void 0), h = t[Ne] || null, h = h != null ? h[r] : null, typeof h == "function" && t.removeEventListener(n, h, f), typeof o == "function")) {
              typeof h != "function" && h !== null && (r in t ? t[r] = null : t.hasAttribute(r) && t.removeAttribute(r)), t.addEventListener(n, o, f);
              break e;
            }
            r in t ? t[r] = o : o === !0 ? t.setAttribute(r, "") : ga(t, r, o);
          }
    }
  }
  function un(t, n, r) {
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
        Je("error", t), Je("load", t);
        var o = !1, f = !1, h;
        for (h in r)
          if (r.hasOwnProperty(h)) {
            var w = r[h];
            if (w != null)
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
                  Et(t, n, h, w, r, null);
              }
          }
        f && Et(t, n, "srcSet", r.srcSet, r, null), o && Et(t, n, "src", r.src, r, null);
        return;
      case "input":
        Je("invalid", t);
        var M = h = w = f = null, q = null, ie = null;
        for (o in r)
          if (r.hasOwnProperty(o)) {
            var ue = r[o];
            if (ue != null)
              switch (o) {
                case "name":
                  f = ue;
                  break;
                case "type":
                  w = ue;
                  break;
                case "checked":
                  q = ue;
                  break;
                case "defaultChecked":
                  ie = ue;
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
                  Et(t, n, o, ue, r, null);
              }
          }
        ki(
          t,
          h,
          M,
          q,
          ie,
          w,
          f,
          !1
        );
        return;
      case "select":
        Je("invalid", t), o = w = h = null;
        for (f in r)
          if (r.hasOwnProperty(f) && (M = r[f], M != null))
            switch (f) {
              case "value":
                h = M;
                break;
              case "defaultValue":
                w = M;
                break;
              case "multiple":
                o = M;
              default:
                Et(t, n, f, M, r, null);
            }
        n = h, r = w, t.multiple = !!o, n != null ? Cr(t, !!o, n, !1) : r != null && Cr(t, !!o, r, !0);
        return;
      case "textarea":
        Je("invalid", t), h = f = o = null;
        for (w in r)
          if (r.hasOwnProperty(w) && (M = r[w], M != null))
            switch (w) {
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
                Et(t, n, w, M, r, null);
            }
        vp(t, o, f, h);
        return;
      case "option":
        for (q in r)
          if (r.hasOwnProperty(q) && (o = r[q], o != null))
            switch (q) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Et(t, n, q, o, r, null);
            }
        return;
      case "dialog":
        Je("beforetoggle", t), Je("toggle", t), Je("cancel", t), Je("close", t);
        break;
      case "iframe":
      case "object":
        Je("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < wo.length; o++)
          Je(wo[o], t);
        break;
      case "image":
        Je("error", t), Je("load", t);
        break;
      case "details":
        Je("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Je("error", t), Je("load", t);
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
        for (ie in r)
          if (r.hasOwnProperty(ie) && (o = r[ie], o != null))
            switch (ie) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                Et(t, n, ie, o, r, null);
            }
        return;
      default:
        if (Wc(n)) {
          for (ue in r)
            r.hasOwnProperty(ue) && (o = r[ue], o !== void 0 && Ud(
              t,
              n,
              ue,
              o,
              r,
              void 0
            ));
          return;
        }
    }
    for (M in r)
      r.hasOwnProperty(M) && (o = r[M], o != null && Et(t, n, M, o, r, null));
  }
  function wE(t, n, r, o) {
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
        var f = null, h = null, w = null, M = null, q = null, ie = null, ue = null;
        for (oe in r) {
          var fe = r[oe];
          if (r.hasOwnProperty(oe) && fe != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                q = fe;
              default:
                o.hasOwnProperty(oe) || Et(t, n, oe, null, o, fe);
            }
        }
        for (var le in o) {
          var oe = o[le];
          if (fe = r[le], o.hasOwnProperty(le) && (oe != null || fe != null))
            switch (le) {
              case "type":
                h = oe;
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
                w = oe;
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
                oe !== fe && Et(
                  t,
                  n,
                  le,
                  oe,
                  o,
                  fe
                );
            }
        }
        ai(
          t,
          w,
          M,
          q,
          ie,
          ue,
          h,
          f
        );
        return;
      case "select":
        oe = w = M = le = null;
        for (h in r)
          if (q = r[h], r.hasOwnProperty(h) && q != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                oe = q;
              default:
                o.hasOwnProperty(h) || Et(
                  t,
                  n,
                  h,
                  null,
                  o,
                  q
                );
            }
        for (f in o)
          if (h = o[f], q = r[f], o.hasOwnProperty(f) && (h != null || q != null))
            switch (f) {
              case "value":
                le = h;
                break;
              case "defaultValue":
                M = h;
                break;
              case "multiple":
                w = h;
              default:
                h !== q && Et(
                  t,
                  n,
                  f,
                  h,
                  o,
                  q
                );
            }
        n = M, r = w, o = oe, le != null ? Cr(t, !!r, le, !1) : !!o != !!r && (n != null ? Cr(t, !!r, n, !0) : Cr(t, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        oe = le = null;
        for (M in r)
          if (f = r[M], r.hasOwnProperty(M) && f != null && !o.hasOwnProperty(M))
            switch (M) {
              case "value":
                break;
              case "children":
                break;
              default:
                Et(t, n, M, null, o, f);
            }
        for (w in o)
          if (f = o[w], h = r[w], o.hasOwnProperty(w) && (f != null || h != null))
            switch (w) {
              case "value":
                le = f;
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
                f !== h && Et(t, n, w, f, o, h);
            }
        $l(t, le, oe);
        return;
      case "option":
        for (var Te in r)
          if (le = r[Te], r.hasOwnProperty(Te) && le != null && !o.hasOwnProperty(Te))
            switch (Te) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Et(
                  t,
                  n,
                  Te,
                  null,
                  o,
                  le
                );
            }
        for (q in o)
          if (le = o[q], oe = r[q], o.hasOwnProperty(q) && le !== oe && (le != null || oe != null))
            switch (q) {
              case "selected":
                t.selected = le && typeof le != "function" && typeof le != "symbol";
                break;
              default:
                Et(
                  t,
                  n,
                  q,
                  le,
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
        for (var Ue in r)
          le = r[Ue], r.hasOwnProperty(Ue) && le != null && !o.hasOwnProperty(Ue) && Et(t, n, Ue, null, o, le);
        for (ie in o)
          if (le = o[ie], oe = r[ie], o.hasOwnProperty(ie) && le !== oe && (le != null || oe != null))
            switch (ie) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(l(137, n));
                break;
              default:
                Et(
                  t,
                  n,
                  ie,
                  le,
                  o,
                  oe
                );
            }
        return;
      default:
        if (Wc(n)) {
          for (var Nt in r)
            le = r[Nt], r.hasOwnProperty(Nt) && le !== void 0 && !o.hasOwnProperty(Nt) && Ud(
              t,
              n,
              Nt,
              void 0,
              o,
              le
            );
          for (ue in o)
            le = o[ue], oe = r[ue], !o.hasOwnProperty(ue) || le === oe || le === void 0 && oe === void 0 || Ud(
              t,
              n,
              ue,
              le,
              o,
              oe
            );
          return;
        }
    }
    for (var K in r)
      le = r[K], r.hasOwnProperty(K) && le != null && !o.hasOwnProperty(K) && Et(t, n, K, null, o, le);
    for (fe in o)
      le = o[fe], oe = r[fe], !o.hasOwnProperty(fe) || le === oe || le == null && oe == null || Et(t, n, fe, le, o, oe);
  }
  function xv(t) {
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
  function _E() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, r = performance.getEntriesByType("resource"), o = 0; o < r.length; o++) {
        var f = r[o], h = f.transferSize, w = f.initiatorType, M = f.duration;
        if (h && M && xv(w)) {
          for (w = 0, M = f.responseEnd, o += 1; o < r.length; o++) {
            var q = r[o], ie = q.startTime;
            if (ie > M) break;
            var ue = q.transferSize, fe = q.initiatorType;
            ue && xv(fe) && (q = q.responseEnd, w += ue * (q < M ? 1 : (M - ie) / (q - ie)));
          }
          if (--o, n += 8 * (h + w) / (f.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Vd = null, $d = null;
  function gu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function wv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function _v(t, n) {
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
  function qd(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Id = null;
  function SE() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Id ? !1 : (Id = t, !0) : (Id = null, !1);
  }
  var Sv = typeof setTimeout == "function" ? setTimeout : void 0, EE = typeof clearTimeout == "function" ? clearTimeout : void 0, Ev = typeof Promise == "function" ? Promise : void 0, NE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ev < "u" ? function(t) {
    return Ev.resolve(null).then(t).catch(CE);
  } : Sv;
  function CE(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Yr(t) {
    return t === "head";
  }
  function Nv(t, n) {
    var r = n, o = 0;
    do {
      var f = r.nextSibling;
      if (t.removeChild(r), f && f.nodeType === 8)
        if (r = f.data, r === "/$" || r === "/&") {
          if (o === 0) {
            t.removeChild(f), ml(n);
            return;
          }
          o--;
        } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&")
          o++;
        else if (r === "html")
          So(t.ownerDocument.documentElement);
        else if (r === "head") {
          r = t.ownerDocument.head, So(r);
          for (var h = r.firstChild; h; ) {
            var w = h.nextSibling, M = h.nodeName;
            h[Pe] || M === "SCRIPT" || M === "STYLE" || M === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = w;
          }
        } else
          r === "body" && So(t.ownerDocument.body);
      r = f;
    } while (r);
    ml(n);
  }
  function Cv(t, n) {
    var r = t;
    t = 0;
    do {
      var o = r.nextSibling;
      if (r.nodeType === 1 ? n ? (r._stashedDisplay = r.style.display, r.style.display = "none") : (r.style.display = r._stashedDisplay || "", r.getAttribute("style") === "" && r.removeAttribute("style")) : r.nodeType === 3 && (n ? (r._stashedText = r.nodeValue, r.nodeValue = "") : r.nodeValue = r._stashedText || ""), o && o.nodeType === 8)
        if (r = o.data, r === "/$") {
          if (t === 0) break;
          t--;
        } else
          r !== "$" && r !== "$?" && r !== "$~" && r !== "$!" || t++;
      r = o;
    } while (r);
  }
  function Yd(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Yd(r), ot(r);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (r.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(r);
    }
  }
  function RE(t, n, r, o) {
    for (; t.nodeType === 1; ) {
      var f = r;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (o) {
        if (!t[Pe])
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
      if (t = ra(t.nextSibling), t === null) break;
    }
    return null;
  }
  function TE(t, n, r) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !r || (t = ra(t.nextSibling), t === null)) return null;
    return t;
  }
  function Rv(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = ra(t.nextSibling), t === null)) return null;
    return t;
  }
  function Gd(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Fd(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function ME(t, n) {
    var r = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = n;
    else if (t.data !== "$?" || r.readyState !== "loading")
      n();
    else {
      var o = function() {
        n(), r.removeEventListener("DOMContentLoaded", o);
      };
      r.addEventListener("DOMContentLoaded", o), t._reactRetry = o;
    }
  }
  function ra(t) {
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
  var Xd = null;
  function Tv(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var r = t.data;
        if (r === "/$" || r === "/&") {
          if (n === 0)
            return ra(t.nextSibling);
          n--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Mv(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var r = t.data;
        if (r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&") {
          if (n === 0) return t;
          n--;
        } else r !== "/$" && r !== "/&" || n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Dv(t, n, r) {
    switch (n = gu(r), t) {
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
  function So(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    ot(t);
  }
  var ia = /* @__PURE__ */ new Map(), Av = /* @__PURE__ */ new Set();
  function vu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var cr = z.d;
  z.d = {
    f: DE,
    r: AE,
    D: jE,
    C: OE,
    L: zE,
    m: LE,
    X: HE,
    S: kE,
    M: BE
  };
  function DE() {
    var t = cr.f(), n = su();
    return t || n;
  }
  function AE(t) {
    var n = ct(t);
    n !== null && n.tag === 5 && n.type === "form" ? Pg(n) : cr.r(t);
  }
  var fl = typeof document > "u" ? null : document;
  function jv(t, n, r) {
    var o = fl;
    if (o && typeof n == "string" && n) {
      var f = rn(n);
      f = 'link[rel="' + t + '"][href="' + f + '"]', typeof r == "string" && (f += '[crossorigin="' + r + '"]'), Av.has(f) || (Av.add(f), t = { rel: t, crossOrigin: r, href: n }, o.querySelector(f) === null && (n = o.createElement("link"), un(n, "link", t), rt(n), o.head.appendChild(n)));
    }
  }
  function jE(t) {
    cr.D(t), jv("dns-prefetch", t, null);
  }
  function OE(t, n) {
    cr.C(t, n), jv("preconnect", t, n);
  }
  function zE(t, n, r) {
    cr.L(t, n, r);
    var o = fl;
    if (o && t && n) {
      var f = 'link[rel="preload"][as="' + rn(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (f += '[imagesrcset="' + rn(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (f += '[imagesizes="' + rn(
        r.imageSizes
      ) + '"]')) : f += '[href="' + rn(t) + '"]';
      var h = f;
      switch (n) {
        case "style":
          h = dl(t);
          break;
        case "script":
          h = hl(t);
      }
      ia.has(h) || (t = g(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : t,
          as: n
        },
        r
      ), ia.set(h, t), o.querySelector(f) !== null || n === "style" && o.querySelector(Eo(h)) || n === "script" && o.querySelector(No(h)) || (n = o.createElement("link"), un(n, "link", t), rt(n), o.head.appendChild(n)));
    }
  }
  function LE(t, n) {
    cr.m(t, n);
    var r = fl;
    if (r && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + rn(o) + '"][href="' + rn(t) + '"]', h = f;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = hl(t);
      }
      if (!ia.has(h) && (t = g({ rel: "modulepreload", href: t }, n), ia.set(h, t), r.querySelector(f) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(No(h)))
              return;
        }
        o = r.createElement("link"), un(o, "link", t), rt(o), r.head.appendChild(o);
      }
    }
  }
  function kE(t, n, r) {
    cr.S(t, n, r);
    var o = fl;
    if (o && t) {
      var f = zt(o).hoistableStyles, h = dl(t);
      n = n || "default";
      var w = f.get(h);
      if (!w) {
        var M = { loading: 0, preload: null };
        if (w = o.querySelector(
          Eo(h)
        ))
          M.loading = 5;
        else {
          t = g(
            { rel: "stylesheet", href: t, "data-precedence": n },
            r
          ), (r = ia.get(h)) && Pd(t, r);
          var q = w = o.createElement("link");
          rt(q), un(q, "link", t), q._p = new Promise(function(ie, ue) {
            q.onload = ie, q.onerror = ue;
          }), q.addEventListener("load", function() {
            M.loading |= 1;
          }), q.addEventListener("error", function() {
            M.loading |= 2;
          }), M.loading |= 4, yu(w, n, o);
        }
        w = {
          type: "stylesheet",
          instance: w,
          count: 1,
          state: M
        }, f.set(h, w);
      }
    }
  }
  function HE(t, n) {
    cr.X(t, n);
    var r = fl;
    if (r && t) {
      var o = zt(r).hoistableScripts, f = hl(t), h = o.get(f);
      h || (h = r.querySelector(No(f)), h || (t = g({ src: t, async: !0 }, n), (n = ia.get(f)) && Zd(t, n), h = r.createElement("script"), rt(h), un(h, "link", t), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function BE(t, n) {
    cr.M(t, n);
    var r = fl;
    if (r && t) {
      var o = zt(r).hoistableScripts, f = hl(t), h = o.get(f);
      h || (h = r.querySelector(No(f)), h || (t = g({ src: t, async: !0, type: "module" }, n), (n = ia.get(f)) && Zd(t, n), h = r.createElement("script"), rt(h), un(h, "link", t), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function Ov(t, n, r, o) {
    var f = (f = de.current) ? vu(f) : null;
    if (!f) throw Error(l(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = dl(r.href), r = zt(
          f
        ).hoistableStyles, o = r.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          t = dl(r.href);
          var h = zt(
            f
          ).hoistableStyles, w = h.get(t);
          if (w || (f = f.ownerDocument || f, w = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(t, w), (h = f.querySelector(
            Eo(t)
          )) && !h._p && (w.instance = h, w.state.loading = 5), ia.has(t) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, ia.set(t, r), h || UE(
            f,
            t,
            r,
            w.state
          ))), n && o === null)
            throw Error(l(528, ""));
          return w;
        }
        if (n && o !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = hl(r), r = zt(
          f
        ).hoistableScripts, o = r.get(n), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, t));
    }
  }
  function dl(t) {
    return 'href="' + rn(t) + '"';
  }
  function Eo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function zv(t) {
    return g({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function UE(t, n, r, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), un(n, "link", r), rt(n), t.head.appendChild(n));
  }
  function hl(t) {
    return '[src="' + rn(t) + '"]';
  }
  function No(t) {
    return "script[async]" + t;
  }
  function Lv(t, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + rn(r.href) + '"]'
          );
          if (o)
            return n.instance = o, rt(o), o;
          var f = g({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return o = (t.ownerDocument || t).createElement(
            "style"
          ), rt(o), un(o, "style", f), yu(o, r.precedence, t), n.instance = o;
        case "stylesheet":
          f = dl(r.href);
          var h = t.querySelector(
            Eo(f)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, rt(h), h;
          o = zv(r), (f = ia.get(f)) && Pd(o, f), h = (t.ownerDocument || t).createElement("link"), rt(h);
          var w = h;
          return w._p = new Promise(function(M, q) {
            w.onload = M, w.onerror = q;
          }), un(h, "link", o), n.state.loading |= 4, yu(h, r.precedence, t), n.instance = h;
        case "script":
          return h = hl(r.src), (f = t.querySelector(
            No(h)
          )) ? (n.instance = f, rt(f), f) : (o = r, (f = ia.get(h)) && (o = g({}, r), Zd(o, f)), t = t.ownerDocument || t, f = t.createElement("script"), rt(f), un(f, "link", o), t.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, yu(o, r.precedence, t));
    return n.instance;
  }
  function yu(t, n, r) {
    for (var o = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, h = f, w = 0; w < o.length; w++) {
      var M = o[w];
      if (M.dataset.precedence === n) h = M;
      else if (h !== f) break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(t, n.firstChild));
  }
  function Pd(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Zd(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var bu = null;
  function kv(t, n, r) {
    if (bu === null) {
      var o = /* @__PURE__ */ new Map(), f = bu = /* @__PURE__ */ new Map();
      f.set(r, o);
    } else
      f = bu, o = f.get(r), o || (o = /* @__PURE__ */ new Map(), f.set(r, o));
    if (o.has(t)) return o;
    for (o.set(t, null), r = r.getElementsByTagName(t), f = 0; f < r.length; f++) {
      var h = r[f];
      if (!(h[Pe] || h[xe] || t === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var w = h.getAttribute(n) || "";
        w = t + w;
        var M = o.get(w);
        M ? M.push(h) : o.set(w, [h]);
      }
    }
    return o;
  }
  function Hv(t, n, r) {
    t = t.ownerDocument || t, t.head.insertBefore(
      r,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function VE(t, n, r) {
    if (r === 1 || n.itemProp != null) return !1;
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
  function Bv(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function $E(t, n, r, o) {
    if (r.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var f = dl(o.href), h = n.querySelector(
          Eo(f)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = xu.bind(t), n.then(t, t)), r.state.loading |= 4, r.instance = h, rt(h);
          return;
        }
        h = n.ownerDocument || n, o = zv(o), (f = ia.get(f)) && Pd(o, f), h = h.createElement("link"), rt(h);
        var w = h;
        w._p = new Promise(function(M, q) {
          w.onload = M, w.onerror = q;
        }), un(h, "link", o), r.instance = h;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (t.count++, r = xu.bind(t), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Qd = 0;
  function qE(t, n) {
    return t.stylesheets && t.count === 0 && _u(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(r) {
      var o = setTimeout(function() {
        if (t.stylesheets && _u(t, t.stylesheets), t.unsuspend) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Qd === 0 && (Qd = 62500 * _E());
      var f = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && _u(t, t.stylesheets), t.unsuspend)) {
            var h = t.unsuspend;
            t.unsuspend = null, h();
          }
        },
        (t.imgBytes > Qd ? 50 : 800) + n
      );
      return t.unsuspend = r, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(f);
      };
    } : null;
  }
  function xu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) _u(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var wu = null;
  function _u(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, wu = /* @__PURE__ */ new Map(), n.forEach(IE, t), wu = null, xu.call(t));
  }
  function IE(t, n) {
    if (!(n.state.loading & 4)) {
      var r = wu.get(t);
      if (r) var o = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), wu.set(t, r);
        for (var f = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < f.length; h++) {
          var w = f[h];
          (w.nodeName === "LINK" || w.getAttribute("media") !== "not all") && (r.set(w.dataset.precedence, w), o = w);
        }
        o && r.set(null, o);
      }
      f = n.instance, w = f.getAttribute("data-precedence"), h = r.get(w) || o, h === o && r.set(null, f), r.set(w, f), this.count++, o = xu.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), h ? h.parentNode.insertBefore(f, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(f, t.firstChild)), n.state.loading |= 4;
    }
  }
  var Co = {
    $$typeof: C,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function YE(t, n, r, o, f, h, w, M, q) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = gn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gn(0), this.hiddenUpdates = gn(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = w, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = q, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Uv(t, n, r, o, f, h, w, M, q, ie, ue, fe) {
    return t = new YE(
      t,
      n,
      r,
      w,
      q,
      ie,
      ue,
      fe,
      M
    ), n = 1, h === !0 && (n |= 24), h = Un(3, null, null, n), t.current = h, h.stateNode = t, n = Mf(), n.refCount++, t.pooledCache = n, n.refCount++, h.memoizedState = {
      element: o,
      isDehydrated: r,
      cache: n
    }, Of(h), t;
  }
  function Vv(t) {
    return t ? (t = Yi, t) : Yi;
  }
  function $v(t, n, r, o, f, h) {
    f = Vv(f), o.context === null ? o.context = f : o.pendingContext = f, o = Or(n), o.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (o.callback = h), r = zr(t, o, n), r !== null && (An(r, t, n), ao(r, t, n));
  }
  function qv(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var r = t.retryLane;
      t.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Kd(t, n) {
    qv(t, n), (t = t.alternate) && qv(t, n);
  }
  function Iv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = oi(t, 67108864);
      n !== null && An(n, t, 67108864), Kd(t, 67108864);
    }
  }
  function Yv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Yn();
      n = Z(n);
      var r = oi(t, n);
      r !== null && An(r, t, n), Kd(t, n);
    }
  }
  var Su = !0;
  function GE(t, n, r, o) {
    var f = T.T;
    T.T = null;
    var h = z.p;
    try {
      z.p = 2, Wd(t, n, r, o);
    } finally {
      z.p = h, T.T = f;
    }
  }
  function FE(t, n, r, o) {
    var f = T.T;
    T.T = null;
    var h = z.p;
    try {
      z.p = 8, Wd(t, n, r, o);
    } finally {
      z.p = h, T.T = f;
    }
  }
  function Wd(t, n, r, o) {
    if (Su) {
      var f = Jd(o);
      if (f === null)
        Bd(
          t,
          n,
          o,
          Eu,
          r
        ), Fv(t, o);
      else if (PE(
        f,
        t,
        n,
        r,
        o
      ))
        o.stopPropagation();
      else if (Fv(t, o), n & 4 && -1 < XE.indexOf(t)) {
        for (; f !== null; ) {
          var h = ct(f);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var w = fn(h.pendingLanes);
                  if (w !== 0) {
                    var M = h;
                    for (M.pendingLanes |= 2, M.entangledLanes |= 2; w; ) {
                      var q = 1 << 31 - Ut(w);
                      M.entanglements[1] |= q, w &= ~q;
                    }
                    ka(h), (mt & 6) === 0 && (lu = Ke() + 500, xo(0));
                  }
                }
                break;
              case 31:
              case 13:
                M = oi(h, 2), M !== null && An(M, h, 2), su(), Kd(h, 2);
            }
          if (h = Jd(o), h === null && Bd(
            t,
            n,
            o,
            Eu,
            r
          ), h === f) break;
          f = h;
        }
        f !== null && o.stopPropagation();
      } else
        Bd(
          t,
          n,
          o,
          null,
          r
        );
    }
  }
  function Jd(t) {
    return t = ef(t), eh(t);
  }
  var Eu = null;
  function eh(t) {
    if (Eu = null, t = Ct(t), t !== null) {
      var n = u(t);
      if (n === null) t = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (t = c(n), t !== null) return t;
          t = null;
        } else if (r === 31) {
          if (t = d(n), t !== null) return t;
          t = null;
        } else if (r === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else n !== t && (t = null);
      }
    }
    return Eu = t, null;
  }
  function Gv(t) {
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
        switch (vt()) {
          case yt:
            return 2;
          case Yt:
            return 8;
          case Lt:
          case pt:
            return 32;
          case ut:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var th = !1, Gr = null, Fr = null, Xr = null, Ro = /* @__PURE__ */ new Map(), To = /* @__PURE__ */ new Map(), Pr = [], XE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Fv(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        Gr = null;
        break;
      case "dragenter":
      case "dragleave":
        Fr = null;
        break;
      case "mouseover":
      case "mouseout":
        Xr = null;
        break;
      case "pointerover":
      case "pointerout":
        Ro.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        To.delete(n.pointerId);
    }
  }
  function Mo(t, n, r, o, f, h) {
    return t === null || t.nativeEvent !== h ? (t = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: o,
      nativeEvent: h,
      targetContainers: [f]
    }, n !== null && (n = ct(n), n !== null && Iv(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), t);
  }
  function PE(t, n, r, o, f) {
    switch (n) {
      case "focusin":
        return Gr = Mo(
          Gr,
          t,
          n,
          r,
          o,
          f
        ), !0;
      case "dragenter":
        return Fr = Mo(
          Fr,
          t,
          n,
          r,
          o,
          f
        ), !0;
      case "mouseover":
        return Xr = Mo(
          Xr,
          t,
          n,
          r,
          o,
          f
        ), !0;
      case "pointerover":
        var h = f.pointerId;
        return Ro.set(
          h,
          Mo(
            Ro.get(h) || null,
            t,
            n,
            r,
            o,
            f
          )
        ), !0;
      case "gotpointercapture":
        return h = f.pointerId, To.set(
          h,
          Mo(
            To.get(h) || null,
            t,
            n,
            r,
            o,
            f
          )
        ), !0;
    }
    return !1;
  }
  function Xv(t) {
    var n = Ct(t.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = c(r), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Yv(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(r), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Yv(r);
            });
            return;
          }
        } else if (n === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Nu(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var r = Jd(t.nativeEvent);
      if (r === null) {
        r = t.nativeEvent;
        var o = new r.constructor(
          r.type,
          r
        );
        Jc = o, r.target.dispatchEvent(o), Jc = null;
      } else
        return n = ct(r), n !== null && Iv(n), t.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function Pv(t, n, r) {
    Nu(t) && r.delete(n);
  }
  function ZE() {
    th = !1, Gr !== null && Nu(Gr) && (Gr = null), Fr !== null && Nu(Fr) && (Fr = null), Xr !== null && Nu(Xr) && (Xr = null), Ro.forEach(Pv), To.forEach(Pv);
  }
  function Cu(t, n) {
    t.blockedOn === n && (t.blockedOn = null, th || (th = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      ZE
    )));
  }
  var Ru = null;
  function Zv(t) {
    Ru !== t && (Ru = t, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        Ru === t && (Ru = null);
        for (var n = 0; n < t.length; n += 3) {
          var r = t[n], o = t[n + 1], f = t[n + 2];
          if (typeof o != "function") {
            if (eh(o || r) === null)
              continue;
            break;
          }
          var h = ct(r);
          h !== null && (t.splice(n, 3), n -= 3, Jf(
            h,
            {
              pending: !0,
              data: f,
              method: r.method,
              action: o
            },
            o,
            f
          ));
        }
      }
    ));
  }
  function ml(t) {
    function n(q) {
      return Cu(q, t);
    }
    Gr !== null && Cu(Gr, t), Fr !== null && Cu(Fr, t), Xr !== null && Cu(Xr, t), Ro.forEach(n), To.forEach(n);
    for (var r = 0; r < Pr.length; r++) {
      var o = Pr[r];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < Pr.length && (r = Pr[0], r.blockedOn === null); )
      Xv(r), r.blockedOn === null && Pr.shift();
    if (r = (t.ownerDocument || t).$$reactFormReplay, r != null)
      for (o = 0; o < r.length; o += 3) {
        var f = r[o], h = r[o + 1], w = f[Ne] || null;
        if (typeof h == "function")
          w || Zv(r);
        else if (w) {
          var M = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, w = h[Ne] || null)
              M = w.formAction;
            else if (eh(f) !== null) continue;
          } else M = w.action;
          typeof M == "function" ? r[o + 1] = M : (r.splice(o, 3), o -= 3), Zv(r);
        }
      }
  }
  function Qv() {
    function t(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
        handler: function() {
          return new Promise(function(w) {
            return f = w;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      f !== null && (f(), f = null), o || setTimeout(r, 20);
    }
    function r() {
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
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(r, 100), function() {
        o = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), f !== null && (f(), f = null);
      };
    }
  }
  function nh(t) {
    this._internalRoot = t;
  }
  Tu.prototype.render = nh.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var r = n.current, o = Yn();
    $v(r, o, t, n, null, null);
  }, Tu.prototype.unmount = nh.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      $v(t.current, 2, null, t, null, null), su(), n[Se] = null;
    }
  };
  function Tu(t) {
    this._internalRoot = t;
  }
  Tu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = me();
      t = { blockedOn: null, target: t, priority: n };
      for (var r = 0; r < Pr.length && n !== 0 && n < Pr[r].priority; r++) ;
      Pr.splice(r, 0, t), r === 0 && Xv(t);
    }
  };
  var Kv = a.version;
  if (Kv !== "19.2.7")
    throw Error(
      l(
        527,
        Kv,
        "19.2.7"
      )
    );
  z.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(l(188)) : (t = Object.keys(t).join(","), Error(l(268, t)));
    return t = m(n), t = t !== null ? y(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var QE = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Mu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Mu.isDisabled && Mu.supportsFiber)
      try {
        nn = Mu.inject(
          QE
        ), Kt = Mu;
      } catch {
      }
  }
  return Ao.createRoot = function(t, n) {
    if (!s(t)) throw Error(l(299));
    var r = !1, o = "", f = r0, h = i0, w = l0;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (w = n.onRecoverableError)), n = Uv(
      t,
      1,
      !1,
      null,
      null,
      r,
      o,
      null,
      f,
      h,
      w,
      Qv
    ), t[Se] = n.current, Hd(t), new nh(n);
  }, Ao.hydrateRoot = function(t, n, r) {
    if (!s(t)) throw Error(l(299));
    var o = !1, f = "", h = r0, w = i0, M = l0, q = null;
    return r != null && (r.unstable_strictMode === !0 && (o = !0), r.identifierPrefix !== void 0 && (f = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (w = r.onCaughtError), r.onRecoverableError !== void 0 && (M = r.onRecoverableError), r.formState !== void 0 && (q = r.formState)), n = Uv(
      t,
      1,
      !0,
      n,
      r ?? null,
      o,
      f,
      q,
      h,
      w,
      M,
      Qv
    ), n.context = Vv(null), r = n.current, o = Yn(), o = Z(o), f = Or(o), f.callback = null, zr(r, f, o), r = o, n.current.lanes = r, gt(n, r), ka(n), t[Se] = n.current, Hd(t), new Tu(n);
  }, Ao.version = "19.2.7", Ao;
}
var oy;
function o2() {
  if (oy) return ih.exports;
  oy = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), ih.exports = l2(), ih.exports;
}
var s2 = o2();
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
var Gx = (e) => {
  throw TypeError(e);
}, Fx = (e, a, i) => a.has(e) || Gx("Cannot " + i), oa = (e, a, i) => (Fx(e, a, "read from private field"), i ? i.call(e) : a.get(e)), Vo = (e, a, i) => a.has(e) ? Gx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, i), Ha = (e, a, i, l) => (Fx(e, a, "write to private field"), a.set(e, i), i);
function sy(e) {
  return typeof e == "object" && e != null && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function u2(e = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: l = !1 } = e, s;
  s = a.map(
    (x, _) => y(
      x,
      typeof x == "string" ? null : x.state,
      _ === 0 ? "default" : void 0,
      typeof x == "string" ? void 0 : x.mask
    )
  );
  let u = p(
    i ?? s.length - 1
  ), c = "POP", d = null;
  function p(x) {
    return Math.min(Math.max(x, 0), s.length - 1);
  }
  function m() {
    return s[u];
  }
  function y(x, _ = null, E, N) {
    let R = qh(
      s ? m().pathname : "/",
      x,
      _,
      E,
      N
    );
    return It(
      R.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), R;
  }
  function g(x) {
    return typeof x == "string" ? x : Ga(x);
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
    createURL(x) {
      return new URL(g(x), "http://localhost");
    },
    encodeLocation(x) {
      let _ = typeof x == "string" ? Ta(x) : x;
      return {
        pathname: _.pathname || "",
        search: _.search || "",
        hash: _.hash || ""
      };
    },
    push(x, _) {
      c = "PUSH";
      let E = sy(x) ? x : y(x, _);
      u += 1, s.splice(u, s.length, E), l && d && d({ action: c, location: E, delta: 1 });
    },
    replace(x, _) {
      c = "REPLACE";
      let E = sy(x) ? x : y(x, _);
      s[u] = E, l && d && d({ action: c, location: E, delta: 0 });
    },
    go(x) {
      c = "POP";
      let _ = p(u + x), E = s[_];
      u = _, d && d({ action: c, location: E, delta: x });
    },
    listen(x) {
      return d = x, () => {
        d = null;
      };
    }
  };
}
function Qe(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function It(e, a) {
  if (!e) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function c2() {
  return Math.random().toString(36).substring(2, 10);
}
function qh(e, a, i = null, l, s) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? Ta(a) : a,
    state: i,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || l || c2(),
    mask: s
  };
}
function Ga({
  pathname: e = "/",
  search: a = "",
  hash: i = ""
}) {
  return a && a !== "?" && (e += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (e += i.charAt(0) === "#" ? i : "#" + i), e;
}
function Ta(e) {
  let a = {};
  if (e) {
    let i = e.indexOf("#");
    i >= 0 && (a.hash = e.substring(i), e = e.substring(0, i));
    let l = e.indexOf("?");
    l >= 0 && (a.search = e.substring(l), e = e.substring(0, l)), e && (a.pathname = e);
  }
  return a;
}
function f2(e, a, i = !1) {
  let l = "http://localhost";
  e && (l = e.location.origin !== "null" ? e.location.origin : e.location.href), Qe(l, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : Ga(a);
  return s = s.replace(/ $/, "%20"), !i && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var $o, uy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(e) {
    if (Vo(this, $o, /* @__PURE__ */ new Map()), e)
      for (let [a, i] of e)
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
  get(e) {
    if (oa(this, $o).has(e))
      return oa(this, $o).get(e);
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
    oa(this, $o).set(e, a);
  }
};
$o = /* @__PURE__ */ new WeakMap();
var d2 = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function h2(e) {
  return d2.has(
    e
  );
}
var m2 = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function p2(e) {
  return m2.has(
    e
  );
}
function g2(e) {
  return e.index === !0;
}
function Po(e, a, i = [], l = {}, s = !1) {
  return e.map((u, c) => {
    let d = [...i, String(c)], p = typeof u.id == "string" ? u.id : d.join("-");
    if (Qe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Qe(
      s || !l[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), g2(u)) {
      let m = {
        ...u,
        id: p
      };
      return l[p] = cy(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: p,
        children: void 0
      };
      return l[p] = cy(
        m,
        a(m)
      ), u.children && (m.children = Po(
        u.children,
        a,
        d,
        l,
        s
      )), m;
    }
  });
}
function cy(e, a) {
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
function Xx(e, a, i = "/") {
  return _a(e, a, i, !1);
}
function _a(e, a, i, l, s) {
  let u = typeof a == "string" ? Ta(a) : a, c = da(u.pathname || "/", i);
  if (c == null)
    return null;
  let d = s ?? nc(e), p = null, m = M2(c);
  for (let y = 0; p == null && y < d.length; ++y)
    p = R2(
      d[y],
      m,
      l
    );
  return p;
}
function v2(e, a) {
  let { route: i, pathname: l, params: s } = e;
  return {
    id: i.id,
    pathname: l,
    params: s,
    data: a[i.id],
    loaderData: a[i.id],
    handle: i.handle
  };
}
function nc(e) {
  let a = Px(e);
  return y2(a), a;
}
function Px(e, a = [], i = [], l = "", s = !1) {
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
      Qe(
        y.relativePath.startsWith(l),
        `Absolute route path "${y.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(l.length);
    }
    let g = fa([l, y.relativePath]), b = i.concat(y);
    c.children && c.children.length > 0 && (Qe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      c.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), Px(
      c.children,
      a,
      b,
      g,
      p
    )), !(c.path == null && !c.index) && a.push({
      path: g,
      score: N2(g, c.index),
      routesMeta: b
    });
  };
  return e.forEach((c, d) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, d);
    else
      for (let p of Zx(c.path))
        u(c, d, !0, p);
  }), a;
}
function Zx(e) {
  let a = e.split("/");
  if (a.length === 0) return [];
  let [i, ...l] = a, s = i.endsWith("?"), u = i.replace(/\?$/, "");
  if (l.length === 0)
    return s ? [u, ""] : [u];
  let c = Zx(l.join("/")), d = [];
  return d.push(
    ...c.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && d.push(...c), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function y2(e) {
  e.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : C2(
      a.routesMeta.map((l) => l.childrenIndex),
      i.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var b2 = /^:[\w-]+$/, x2 = 3, w2 = 2, _2 = 1, S2 = 10, E2 = -2, fy = (e) => e === "*";
function N2(e, a) {
  let i = e.split("/"), l = i.length;
  return i.some(fy) && (l += E2), a && (l += w2), i.filter((s) => !fy(s)).reduce(
    (s, u) => s + (b2.test(u) ? x2 : u === "" ? _2 : S2),
    l
  );
}
function C2(e, a) {
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
function R2(e, a, i = !1) {
  let { routesMeta: l } = e, s = {}, u = "/", c = [];
  for (let d = 0; d < l.length; ++d) {
    let p = l[d], m = d === l.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", g = hc(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), b = p.route;
    if (!g && m && i && !l[l.length - 1].route.index && (g = hc(
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
      pathname: fa([u, g.pathname]),
      pathnameBase: j2(
        fa([u, g.pathnameBase])
      ),
      route: b
    }), g.pathnameBase !== "/" && (u = fa([u, g.pathnameBase]));
  }
  return c;
}
function hc(e, a) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [i, l] = T2(
    e.path,
    e.caseSensitive,
    e.end
  ), s = a.match(i);
  if (!s) return null;
  let u = s[0], c = u.replace(/(.)\/+$/, "$1"), d = s.slice(1);
  return {
    params: l.reduce(
      (m, { paramName: y, isOptional: g }, b) => {
        if (y === "*") {
          let _ = d[b] || "";
          c = u.slice(0, u.length - _.length).replace(/(.)\/+$/, "$1");
        }
        const x = d[b];
        return g && !x ? m[y] = void 0 : m[y] = (x || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: u,
    pathnameBase: c,
    pattern: e
  };
}
function T2(e, a = !1, i = !0) {
  It(
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
  return e.endsWith("*") ? (l.push({ paramName: "*" }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), l];
}
function M2(e) {
  try {
    return e.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return It(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), e;
  }
}
function da(e, a) {
  if (a === "/") return e;
  if (!e.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let i = a.endsWith("/") ? a.length - 1 : a.length, l = e.charAt(i);
  return l && l !== "/" ? null : e.slice(i) || "/";
}
function D2({
  basename: e,
  pathname: a
}) {
  return a === "/" ? e : fa([e, a]);
}
var Qx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, _m = (e) => Qx.test(e);
function A2(e, a = "/") {
  let {
    pathname: i,
    search: l = "",
    hash: s = ""
  } = typeof e == "string" ? Ta(e) : e, u;
  return i ? (i = Em(i), i.startsWith("/") ? u = dy(i.substring(1), "/") : u = dy(i, a)) : u = a, {
    pathname: u,
    search: O2(l),
    hash: z2(s)
  };
}
function dy(e, a) {
  let i = mc(a).split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? i.length > 1 && i.pop() : s !== "." && i.push(s);
  }), i.length > 1 ? i.join("/") : "/";
}
function uh(e, a, i, l) {
  return `Cannot include a '${e}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Kx(e) {
  return e.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function Sm(e) {
  let a = Kx(e);
  return a.map(
    (i, l) => l === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function Dc(e, a, i, l = !1) {
  let s;
  typeof e == "string" ? s = Ta(e) : (s = { ...e }, Qe(
    !s.pathname || !s.pathname.includes("?"),
    uh("?", "pathname", "search", s)
  ), Qe(
    !s.pathname || !s.pathname.includes("#"),
    uh("#", "pathname", "hash", s)
  ), Qe(
    !s.search || !s.search.includes("#"),
    uh("#", "search", "hash", s)
  ));
  let u = e === "" || s.pathname === "", c = u ? "/" : s.pathname, d;
  if (c == null)
    d = i;
  else {
    let g = a.length - 1;
    if (!l && c.startsWith("..")) {
      let b = c.split("/");
      for (; b[0] === ".."; )
        b.shift(), g -= 1;
      s.pathname = b.join("/");
    }
    d = g >= 0 ? a[g] : "/";
  }
  let p = A2(s, d), m = c && c !== "/" && c.endsWith("/"), y = (u || c === ".") && i.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var Em = (e) => e.replace(/\/\/+/g, "/"), fa = (e) => Em(e.join("/")), mc = (e) => e.replace(/\/+$/, ""), j2 = (e) => mc(e).replace(/^\/*/, "/"), O2 = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, z2 = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, hy = (e, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let l = new Headers(i.headers);
  return l.set("Location", e), new Response(null, { ...i, headers: l });
}, Ac = class {
  constructor(e, a, i, l = !1) {
    this.status = e, this.statusText = a || "", this.internal = l, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function Zo(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function cs(e) {
  let a = e.map((i) => i.route.path).filter(Boolean);
  return fa(a) || "/";
}
var Wx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Jx(e, a) {
  let i = e;
  if (typeof i != "string" || !Qx.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let l = i, s = !1;
  if (Wx)
    try {
      let u = new URL(window.location.href), c = i.startsWith("//") ? new URL(u.protocol + i) : new URL(i), d = da(c.pathname, a);
      c.origin === u.origin && d != null ? i = d + c.search + c.hash : s = !0;
    } catch {
      It(
        !1,
        `<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: l,
    isExternal: s,
    to: i
  };
}
var ti = Symbol("Uninstrumented");
function L2(e, a) {
  let i = {
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
        let c = Object.keys(i);
        for (let d of c)
          u[d] && i[d].push(u[d]);
      }
    })
  );
  let l = {};
  if (typeof a.lazy == "function" && i.lazy.length > 0) {
    let s = wl(i.lazy, a.lazy, () => {
    });
    s && (l.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], d = i[`lazy.${u}`];
      if (typeof c == "function" && d.length > 0) {
        let p = wl(d, c, () => {
        });
        p && (l.lazy = Object.assign(l.lazy || {}, {
          [u]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((s) => {
    let u = a[s];
    if (typeof u == "function" && i[s].length > 0) {
      let c = u[ti] ?? u, d = wl(
        i[s],
        c,
        (...p) => my(p[0])
      );
      d && (s === "loader" && c.hydrate === !0 && (d.hydrate = !0), d[ti] = c, l[s] = d);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (l.middleware = a.middleware.map((s) => {
    let u = s[ti] ?? s, c = wl(
      i.middleware,
      u,
      (...d) => my(d[0])
    );
    return c ? (c[ti] = u, c) : s;
  })), l;
}
function k2(e, a) {
  let i = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (l) => l({
      instrument(s) {
        let u = Object.keys(s);
        for (let c of u)
          s[c] && i[c].push(s[c]);
      }
    })
  ), i.navigate.length > 0) {
    let l = e.navigate[ti] ?? e.navigate, s = wl(
      i.navigate,
      l,
      (...u) => {
        let [c, d] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? Ga(c) : ".",
          ...py(e, d ?? {})
        };
      }
    );
    s && (s[ti] = l, e.navigate = s);
  }
  if (i.fetch.length > 0) {
    let l = e.fetch[ti] ?? e.fetch, s = wl(i.fetch, l, (...u) => {
      let [c, , d, p] = u;
      return {
        href: d ?? ".",
        fetcherKey: c,
        ...py(e, p ?? {})
      };
    });
    s && (s[ti] = l, e.fetch = s);
  }
  return e;
}
function wl(e, a, i) {
  return e.length === 0 ? null : async (...l) => {
    let s = await e1(
      e,
      i(...l),
      () => a(...l),
      e.length - 1
    );
    if (s.type === "error")
      throw s.value;
    return s.value;
  };
}
async function e1(e, a, i, l) {
  let s = e[l], u;
  if (s) {
    let c, d = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = e1(e, a, i, l - 1), u = await c, Qe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await s(d, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    c || await d(), await c;
  } else
    try {
      u = { type: "success", value: await i() };
    } catch (c) {
      u = { type: "error", value: c };
    }
  return u || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function my(e) {
  let { request: a, context: i, params: l, pattern: s } = e;
  return {
    request: H2(a),
    params: { ...l },
    pattern: s,
    context: B2(i)
  };
}
function py(e, a) {
  return {
    currentUrl: Ga(e.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function H2(e) {
  return {
    method: e.method,
    url: e.url,
    headers: {
      get: (...a) => e.headers.get(...a)
    }
  };
}
function B2(e) {
  if (V2(e)) {
    let a = { ...e };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => e.get(a)
    };
}
var U2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function V2(e) {
  if (e === null || typeof e != "object")
    return !1;
  const a = Object.getPrototypeOf(e);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === U2;
}
var t1 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], $2 = new Set(
  t1
), q2 = [
  "GET",
  ...t1
], I2 = new Set(q2), n1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Y2 = /* @__PURE__ */ new Set([307, 308]), ch = {
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
}, G2 = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, jo = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, F2 = (e) => ({
  hasErrorBoundary: !!e.hasErrorBoundary
}), a1 = "remix-router-transitions", r1 = Symbol("ResetLoaderData"), xi, vl, Wr, yl, X2 = class {
  constructor(e) {
    Vo(this, xi), Vo(this, vl), Vo(this, Wr), Vo(this, yl), Ha(this, xi, e), Ha(this, vl, nc(e));
  }
  /** The stable route tree */
  get stableRoutes() {
    return oa(this, xi);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return oa(this, Wr) ?? oa(this, xi);
  }
  /** Pre-computed branches */
  get branches() {
    return oa(this, yl) ?? oa(this, vl);
  }
  get hasHMRRoutes() {
    return oa(this, Wr) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(e) {
    Ha(this, xi, e), Ha(this, vl, nc(e));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(e) {
    Ha(this, Wr, e), Ha(this, yl, nc(e));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    oa(this, Wr) && (Ha(this, xi, oa(this, Wr)), Ha(this, vl, oa(this, yl)), Ha(this, Wr, void 0), Ha(this, yl, void 0));
  }
};
xi = /* @__PURE__ */ new WeakMap();
vl = /* @__PURE__ */ new WeakMap();
Wr = /* @__PURE__ */ new WeakMap();
yl = /* @__PURE__ */ new WeakMap();
function P2(e) {
  const a = e.window ? e.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Qe(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = e.hydrationRouteProperties || [], s = e.mapRouteProperties || F2, u = s;
  if (e.instrumentations) {
    let $ = e.instrumentations;
    u = (Z) => ({
      ...s(Z),
      ...L2(
        $.map((te) => te.route).filter(Boolean),
        Z
      )
    });
  }
  let c = {}, d = new X2(
    Po(
      e.routes,
      u,
      void 0,
      c
    )
  ), p = e.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let m = e.dataStrategy || J2, y = {
    ...e.future
  }, g = null, b = /* @__PURE__ */ new Set(), x = null, _ = null, E = null, N = null, R = e.hydrationData != null, j = _a(
    d.activeRoutes,
    e.history.location,
    p,
    !1,
    d.branches
  ), C = !1, O = null, V, B;
  if (j == null && !e.patchRoutesOnNavigation) {
    let $ = sa(404, {
      pathname: e.history.location.pathname
    }), { matches: Z, route: te } = Du(d.activeRoutes);
    V = !0, B = !V, j = Z, O = { [te.id]: $ };
  } else if (j && !e.hydrationData && gn(
    j,
    d.activeRoutes,
    e.history.location.pathname
  ).active && (j = null), j)
    if (j.some(($) => $.route.lazy))
      V = !1, B = !V;
    else if (!j.some(($) => Nm($.route)))
      V = !0, B = !V;
    else {
      let $ = e.hydrationData ? e.hydrationData.loaderData : null, Z = e.hydrationData ? e.hydrationData.errors : null, te = j;
      if (Z) {
        let me = j.findIndex(
          (ge) => Z[ge.route.id] !== void 0
        );
        te = te.slice(0, me + 1);
      }
      B = !1, V = !0, te.forEach((me) => {
        let ge = i1(me.route, $, Z);
        B = B || ge.renderFallback, V = V && !ge.shouldLoad;
      });
    }
  else {
    V = !1, B = !V, j = [];
    let $ = gn(
      null,
      d.activeRoutes,
      e.history.location.pathname
    );
    $.active && $.matches && (C = !0, j = $.matches);
  }
  let U, D = {
    historyAction: e.history.action,
    location: e.history.location,
    matches: j,
    initialized: V,
    renderFallback: B,
    navigation: ch,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: e.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: e.hydrationData && e.hydrationData.loaderData || {},
    actionData: e.hydrationData && e.hydrationData.actionData || null,
    errors: e.hydrationData && e.hydrationData.errors || O,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, H = "POP", J = null, I = !1, Q, ae = !1, L = /* @__PURE__ */ new Map(), Y = null, T = !1, z = !1, F = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Map(), ne = 0, A = -1, k = /* @__PURE__ */ new Map(), G = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Set(), he = /* @__PURE__ */ new Map(), W, ve = null;
  function De() {
    if (g = e.history.listen(
      ({ action: $, location: Z, delta: te }) => {
        if (W) {
          W(), W = void 0;
          return;
        }
        It(
          he.size === 0 || te != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let me = Qn({
          currentLocation: D.location,
          nextLocation: Z,
          historyAction: $
        });
        if (me && te != null) {
          let ge = new Promise((Ce) => {
            W = Ce;
          });
          e.history.go(te * -1), Ln(me, {
            state: "blocked",
            location: Z,
            proceed() {
              Ln(me, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: Z
              }), ge.then(() => e.history.go(te));
            },
            reset() {
              let Ce = new Map(D.blockers);
              Ce.set(me, jo), we({ blockers: Ce });
            }
          }), J?.resolve(), J = null;
          return;
        }
        return pe($, Z);
      }
    ), i) {
      vN(a, L);
      let $ = () => yN(a, L);
      a.addEventListener("pagehide", $), Y = () => a.removeEventListener("pagehide", $);
    }
    return D.initialized || pe("POP", D.location, {
      initialHydration: !0
    }), U;
  }
  function Oe() {
    g && g(), Y && Y(), b.clear(), Q && Q.abort(), D.fetchers.forEach(($, Z) => nn(D.fetchers, Z)), D.blockers.forEach(($, Z) => ma(Z));
  }
  function Ee($) {
    if (b.add($), x) {
      let { newErrors: Z } = x;
      x = null, $(D, {
        deletedFetchers: [],
        newErrors: Z,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => b.delete($);
  }
  function we($, Z = {}) {
    $.matches && ($.matches = $.matches.map((ge) => {
      let Ce = c[ge.route.id], xe = ge.route;
      return xe.element !== Ce.element || xe.errorElement !== Ce.errorElement || xe.hydrateFallbackElement !== Ce.hydrateFallbackElement ? {
        ...ge,
        route: Ce
      } : ge;
    })), D = {
      ...D,
      ...$
    };
    let te = [], me = [];
    D.fetchers.forEach((ge, Ce) => {
      ge.state === "idle" && (de.has(Ce) ? te.push(Ce) : me.push(Ce));
    }), de.forEach((ge) => {
      !D.fetchers.has(ge) && !X.has(ge) && te.push(ge);
    }), b.size === 0 && (x = { newErrors: $.errors ?? null }), [...b].forEach(
      (ge) => ge(D, {
        deletedFetchers: te,
        newErrors: $.errors ?? null,
        viewTransitionOpts: Z.viewTransitionOpts,
        flushSync: Z.flushSync === !0
      })
    ), te.forEach((ge) => nn(D.fetchers, ge)), me.forEach((ge) => D.fetchers.delete(ge));
  }
  function Me($, Z, { flushSync: te } = {}) {
    let me = D.actionData != null && D.navigation.formMethod != null && mn(D.navigation.formMethod) && D.navigation.state === "loading" && $.state?._isRedirect !== !0, ge;
    Z.actionData ? Object.keys(Z.actionData).length > 0 ? ge = Z.actionData : ge = null : me ? ge = D.actionData : ge = null;
    let Ce = Z.loaderData ? Cy(
      D.loaderData,
      Z.loaderData,
      Z.matches || [],
      Z.errors
    ) : D.loaderData, xe = D.blockers;
    xe.size > 0 && (xe = new Map(xe), xe.forEach((Le, qe) => xe.set(qe, jo)));
    let Ne = T ? !1 : Vt($, Z.matches || D.matches), Se = I === !0 || D.navigation.formMethod != null && mn(D.navigation.formMethod) && $.state?._isRedirect !== !0;
    d.commitHmrRoutes(), T || H === "POP" || (H === "PUSH" ? e.history.push($, $.state) : H === "REPLACE" && e.history.replace($, $.state));
    let ze;
    if (H === "POP") {
      let Le = L.get(D.location.pathname);
      Le && Le.has($.pathname) ? ze = {
        currentLocation: D.location,
        nextLocation: $
      } : L.has($.pathname) && (ze = {
        currentLocation: $,
        nextLocation: D.location
      });
    } else if (ae) {
      let Le = L.get(D.location.pathname);
      Le ? Le.add($.pathname) : (Le = /* @__PURE__ */ new Set([$.pathname]), L.set(D.location.pathname, Le)), ze = {
        currentLocation: D.location,
        nextLocation: $
      };
    }
    we(
      {
        ...Z,
        // matches, errors, fetchers go through as-is
        actionData: ge,
        loaderData: Ce,
        historyAction: H,
        location: $,
        initialized: !0,
        renderFallback: !1,
        navigation: ch,
        revalidation: "idle",
        restoreScrollPosition: Ne,
        preventScrollReset: Se,
        blockers: xe
      },
      {
        viewTransitionOpts: ze,
        flushSync: te === !0
      }
    ), H = "POP", I = !1, ae = !1, T = !1, z = !1, J?.resolve(), J = null, ve?.resolve(), ve = null;
  }
  async function Ye($, Z) {
    if (J?.resolve(), J = null, typeof $ == "number") {
      J || (J = Dy());
      let ot = J.promise;
      return e.history.go($), ot;
    }
    let te = Ih(
      D.location,
      D.matches,
      p,
      $,
      Z?.fromRouteId,
      Z?.relative
    ), { path: me, submission: ge, error: Ce } = gy(
      !1,
      te,
      Z
    ), xe;
    Z?.mask && (xe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof Z.mask == "string" ? Ta(Z.mask) : {
        ...D.location.mask,
        ...Z.mask
      }
    });
    let Ne = D.location, Se = qh(
      Ne,
      me,
      Z && Z.state,
      void 0,
      xe
    );
    Se = {
      ...Se,
      ...e.history.encodeLocation(Se)
    };
    let ze = Z && Z.replace != null ? Z.replace : void 0, Le = "PUSH";
    ze === !0 ? Le = "REPLACE" : ze === !1 || ge != null && mn(ge.formMethod) && ge.formAction === D.location.pathname + D.location.search && (Le = "REPLACE");
    let qe = Z && "preventScrollReset" in Z ? Z.preventScrollReset === !0 : void 0, Be = (Z && Z.flushSync) === !0, Pe = Qn({
      currentLocation: Ne,
      nextLocation: Se,
      historyAction: Le
    });
    if (Pe) {
      Ln(Pe, {
        state: "blocked",
        location: Se,
        proceed() {
          Ln(Pe, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Se
          }), Ye($, Z);
        },
        reset() {
          let ot = new Map(D.blockers);
          ot.set(Pe, jo), we({ blockers: ot });
        }
      });
      return;
    }
    await pe(Le, Se, {
      submission: ge,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ce,
      preventScrollReset: qe,
      replace: Z && Z.replace,
      enableViewTransition: Z && Z.viewTransition,
      flushSync: Be,
      callSiteDefaultShouldRevalidate: Z && Z.defaultShouldRevalidate
    });
  }
  function ye() {
    ve || (ve = Dy()), Lt(), we({ revalidation: "loading" });
    let $ = ve.promise;
    return D.navigation.state === "submitting" ? $ : D.navigation.state === "idle" ? (pe(D.historyAction, D.location, {
      startUninterruptedRevalidation: !0
    }), $) : (pe(
      H || D.historyAction,
      D.navigation.location,
      {
        overrideNavigation: D.navigation,
        // Proxy through any rending view transition
        enableViewTransition: ae === !0
      }
    ), $);
  }
  async function pe($, Z, te) {
    Q && Q.abort(), Q = null, H = $, T = (te && te.startUninterruptedRevalidation) === !0, kt(D.location, D.matches), I = (te && te.preventScrollReset) === !0, ae = (te && te.enableViewTransition) === !0;
    let me = d.activeRoutes, ge = te?.initialHydration && D.matches && D.matches.length > 0 && !C ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      D.matches
    ) : _a(
      me,
      Z,
      p,
      !1,
      d.branches
    ), Ce = (te && te.flushSync) === !0;
    if (ge && D.initialized && !z && oN(D.location, Z) && !(te && te.submission && mn(te.submission.formMethod))) {
      Me(Z, { matches: ge }, { flushSync: Ce });
      return;
    }
    let xe = gn(ge, me, Z.pathname);
    if (xe.active && xe.matches && (ge = xe.matches), !ge) {
      let { error: ct, notFoundMatches: et, route: zt } = fn(
        Z.pathname
      );
      Me(
        Z,
        {
          matches: et,
          loaderData: {},
          errors: {
            [zt.id]: ct
          }
        },
        { flushSync: Ce }
      );
      return;
    }
    let Ne = te && te.overrideNavigation ? {
      ...te.overrideNavigation,
      matches: ge,
      historyAction: $
    } : void 0;
    Q = new AbortController();
    let Se = bl(
      e.history,
      Z,
      Q.signal,
      te && te.submission
    ), ze = e.getContext ? await e.getContext() : new uy(), Le;
    if (te && te.pendingError)
      Le = [
        Jr(ge).route.id,
        { type: "error", error: te.pendingError }
      ];
    else if (te && te.submission && mn(te.submission.formMethod)) {
      let ct = await _e(
        Se,
        Z,
        te.submission,
        ge,
        $,
        ze,
        xe.active,
        te && te.initialHydration === !0,
        { replace: te.replace, flushSync: Ce }
      );
      if (ct.shortCircuited)
        return;
      if (ct.pendingActionResult) {
        let [et, zt] = ct.pendingActionResult;
        if (Gn(zt) && Zo(zt.error) && zt.error.status === 404) {
          Q = null, Me(Z, {
            matches: ct.matches,
            loaderData: {},
            errors: {
              [et]: zt.error
            }
          });
          return;
        }
      }
      ge = ct.matches || ge, Le = ct.pendingActionResult, Ne = fh(
        Z,
        ge,
        $,
        te.submission
      ), Ce = !1, xe.active = !1, Se = bl(
        e.history,
        Se.url,
        Se.signal
      );
    }
    let {
      shortCircuited: qe,
      matches: Be,
      loaderData: Pe,
      errors: ot,
      workingFetchers: Ct
    } = await Re(
      Se,
      Z,
      ge,
      $,
      ze,
      xe.active,
      Ne,
      te && te.submission,
      te && te.fetcherSubmission,
      te && te.replace,
      te && te.initialHydration === !0,
      Ce,
      Le,
      te && te.callSiteDefaultShouldRevalidate
    );
    qe || (Q = null, Me(Z, {
      matches: Be || ge,
      ...Ry(Le),
      loaderData: Pe,
      errors: ot,
      ...Ct ? { fetchers: Ct } : {}
    }));
  }
  async function _e($, Z, te, me, ge, Ce, xe, Ne, Se = {}) {
    Lt();
    let ze = pN(
      Z,
      me,
      ge,
      te
    );
    if (we({ navigation: ze }, { flushSync: Se.flushSync === !0 }), xe) {
      let Be = await gt(
        me,
        Z.pathname,
        $.signal
      );
      if (Be.type === "aborted")
        return { shortCircuited: !0 };
      if (Be.type === "error") {
        if (Be.partialMatches.length === 0) {
          let { matches: ot, route: Ct } = Du(
            d.activeRoutes
          );
          return {
            matches: ot,
            pendingActionResult: [
              Ct.id,
              {
                type: "error",
                error: Be.error
              }
            ]
          };
        }
        let Pe = Jr(Be.partialMatches).route.id;
        return {
          matches: Be.partialMatches,
          pendingActionResult: [
            Pe,
            {
              type: "error",
              error: Be.error
            }
          ]
        };
      } else if (Be.matches)
        me = Be.matches;
      else {
        let { notFoundMatches: Pe, error: ot, route: Ct } = fn(
          Z.pathname
        );
        return {
          matches: Pe,
          pendingActionResult: [
            Ct.id,
            {
              type: "error",
              error: ot
            }
          ]
        };
      }
    }
    let Le, qe = ac(me, Z);
    if (!qe.route.action && !qe.route.lazy)
      Le = {
        type: "error",
        error: sa(405, {
          method: $.method,
          pathname: Z.pathname,
          routeId: qe.route.id
        })
      };
    else {
      let Be = El(
        u,
        c,
        $,
        Z,
        me,
        qe,
        Ne ? [] : l,
        Ce
      ), Pe = await yt(
        $,
        Z,
        Be,
        Ce,
        null
      );
      if (Le = Pe[qe.route.id], !Le) {
        for (let ot of me)
          if (Pe[ot.route.id]) {
            Le = Pe[ot.route.id];
            break;
          }
      }
      if ($.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (_i(Le)) {
      let Be;
      return Se && Se.replace != null ? Be = Se.replace : Be = Sy(
        Le.response.headers.get("Location"),
        new URL($.url),
        p,
        e.history
      ) === D.location.pathname + D.location.search, await vt($, Le, !0, {
        submission: te,
        replace: Be
      }), { shortCircuited: !0 };
    }
    if (Gn(Le)) {
      let Be = Jr(me, qe.route.id);
      return (Se && Se.replace) !== !0 && (H = "PUSH"), {
        matches: me,
        pendingActionResult: [
          Be.route.id,
          Le,
          qe.route.id
        ]
      };
    }
    return {
      matches: me,
      pendingActionResult: [qe.route.id, Le]
    };
  }
  async function Re($, Z, te, me, ge, Ce, xe, Ne, Se, ze, Le, qe, Be, Pe) {
    let ot = xe || fh(Z, te, me, Ne), Ct = Ne || Se || My(ot), ct = !T && !Le;
    if (Ce) {
      if (ct) {
        let xt = Ae(Be);
        we(
          {
            navigation: ot,
            ...xt !== void 0 ? { actionData: xt } : {}
          },
          {
            flushSync: qe
          }
        );
      }
      let $e = await gt(
        te,
        Z.pathname,
        $.signal
      );
      if ($e.type === "aborted")
        return { shortCircuited: !0 };
      if ($e.type === "error") {
        if ($e.partialMatches.length === 0) {
          let { matches: vn, route: Hn } = Du(
            d.activeRoutes
          );
          return {
            matches: vn,
            loaderData: {},
            errors: {
              [Hn.id]: $e.error
            }
          };
        }
        let xt = Jr($e.partialMatches).route.id;
        return {
          matches: $e.partialMatches,
          loaderData: {},
          errors: {
            [xt]: $e.error
          }
        };
      } else if ($e.matches)
        te = $e.matches;
      else {
        let { error: xt, notFoundMatches: vn, route: Hn } = fn(
          Z.pathname
        );
        return {
          matches: vn,
          loaderData: {},
          errors: {
            [Hn.id]: xt
          }
        };
      }
    }
    let et = d.activeRoutes, { dsMatches: zt, revalidatingFetchers: rt } = vy(
      $,
      ge,
      u,
      c,
      e.history,
      D,
      te,
      Ct,
      Z,
      Le ? [] : l,
      Le === !0,
      z,
      F,
      de,
      ee,
      G,
      et,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      Be,
      Pe
    );
    if (A = ++ne, !e.dataStrategy && !zt.some(($e) => $e.shouldLoad) && !zt.some(
      ($e) => $e.route.middleware && $e.route.middleware.length > 0
    ) && rt.length === 0) {
      let $e = new Map(D.fetchers), xt = _r($e);
      return Me(
        Z,
        {
          matches: te,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Be && Gn(Be[1]) ? { [Be[0]]: Be[1].error } : null,
          ...Ry(Be),
          ...xt ? { fetchers: $e } : {}
        },
        { flushSync: qe }
      ), { shortCircuited: !0 };
    }
    if (ct) {
      let $e = {};
      if (!Ce) {
        $e.navigation = ot;
        let xt = Ae(Be);
        xt !== void 0 && ($e.actionData = xt);
      }
      rt.length > 0 && ($e.fetchers = lt(rt)), we($e, { flushSync: qe });
    }
    rt.forEach(($e) => {
      Ot($e.key), $e.controller && X.set($e.key, $e.controller);
    });
    let ja = () => rt.forEach(($e) => Ot($e.key));
    Q && Q.signal.addEventListener(
      "abort",
      ja
    );
    let { loaderResults: kn, fetcherResults: dn } = await Yt(
      zt,
      rt,
      $,
      Z,
      ge
    );
    if ($.signal.aborted)
      return { shortCircuited: !0 };
    Q && Q.signal.removeEventListener(
      "abort",
      ja
    ), rt.forEach(($e) => X.delete($e.key));
    let an = Au(kn);
    if (an)
      return await vt($, an.result, !0, {
        replace: ze
      }), { shortCircuited: !0 };
    if (an = Au(dn), an)
      return G.add(an.key), await vt($, an.result, !0, {
        replace: ze
      }), { shortCircuited: !0 };
    let En = new Map(D.fetchers), { loaderData: Sr, errors: Nn } = Ny(
      D,
      te,
      kn,
      Be,
      rt,
      dn,
      En
    );
    Le && D.errors && (Nn = { ...D.errors, ...Nn });
    let Er = _r(En), ga = Aa(
      A,
      En
    ), va = Er || ga || rt.length > 0;
    return {
      matches: te,
      loaderData: Sr,
      errors: Nn,
      ...va ? { workingFetchers: En } : {}
    };
  }
  function Ae($) {
    if ($ && !Gn($[1]))
      return {
        [$[0]]: $[1].data
      };
    if (D.actionData)
      return Object.keys(D.actionData).length === 0 ? null : D.actionData;
  }
  function lt($) {
    let Z = new Map(D.fetchers);
    return $.forEach((te) => {
      let me = Z.get(te.key), ge = Oo(
        void 0,
        me ? me.data : void 0
      );
      Z.set(te.key, ge);
    }), Z;
  }
  async function Ze($, Z, te, me) {
    Ot($);
    let ge = (me && me.flushSync) === !0, Ce = d.activeRoutes, xe = Ih(
      D.location,
      D.matches,
      p,
      te,
      Z,
      me?.relative
    ), Ne = _a(
      Ce,
      xe,
      p,
      !1,
      d.branches
    ), Se = gn(Ne, Ce, xe);
    if (Se.active && Se.matches && (Ne = Se.matches), !Ne) {
      ut(
        $,
        Z,
        sa(404, { pathname: xe }),
        { flushSync: ge }
      );
      return;
    }
    let { path: ze, submission: Le, error: qe } = gy(
      !0,
      xe,
      me
    );
    if (qe) {
      ut($, Z, qe, { flushSync: ge });
      return;
    }
    let Be = e.getContext ? await e.getContext() : new uy(), Pe = (me && me.preventScrollReset) === !0;
    if (Le && mn(Le.formMethod)) {
      await Fe(
        $,
        Z,
        ze,
        Ne,
        Be,
        Se.active,
        ge,
        Pe,
        Le,
        me && me.defaultShouldRevalidate
      );
      return;
    }
    ee.set($, { routeId: Z, path: ze }), await Ke(
      $,
      Z,
      ze,
      Ne,
      Be,
      Se.active,
      ge,
      Pe,
      Le
    );
  }
  async function Fe($, Z, te, me, ge, Ce, xe, Ne, Se, ze) {
    Lt(), ee.delete($);
    let Le = D.fetchers.get($);
    pt($, gN(Se, Le), {
      flushSync: xe
    });
    let qe = new AbortController(), Be = bl(
      e.history,
      te,
      qe.signal,
      Se
    );
    if (Ce) {
      let ht = await gt(
        me,
        new URL(Be.url).pathname,
        Be.signal,
        $
      );
      if (ht.type === "aborted")
        return;
      if (ht.type === "error") {
        ut($, Z, ht.error, { flushSync: xe });
        return;
      } else if (ht.matches)
        me = ht.matches;
      else {
        ut(
          $,
          Z,
          sa(404, { pathname: te }),
          { flushSync: xe }
        );
        return;
      }
    }
    let Pe = ac(me, te);
    if (!Pe.route.action && !Pe.route.lazy) {
      let ht = sa(405, {
        method: Se.formMethod,
        pathname: te,
        routeId: Z
      });
      ut($, Z, ht, { flushSync: xe });
      return;
    }
    X.set($, qe);
    let ot = ne, Ct = El(
      u,
      c,
      Be,
      te,
      me,
      Pe,
      l,
      ge
    ), ct = await yt(
      Be,
      te,
      Ct,
      ge,
      $
    ), et = ct[Pe.route.id];
    if (!et) {
      for (let ht of Ct)
        if (ct[ht.route.id]) {
          et = ct[ht.route.id];
          break;
        }
    }
    if (Be.signal.aborted) {
      X.get($) === qe && X.delete($);
      return;
    }
    if (de.has($)) {
      if (_i(et) || Gn(et)) {
        pt($, Ua(void 0));
        return;
      }
    } else {
      if (_i(et))
        if (X.delete($), A > ot) {
          pt($, Ua(void 0));
          return;
        } else
          return G.add($), pt($, Oo(Se)), vt(Be, et, !1, {
            fetcherSubmission: Se,
            preventScrollReset: Ne
          });
      if (Gn(et)) {
        ut($, Z, et.error);
        return;
      }
    }
    let zt = D.navigation.location || D.location, rt = bl(
      e.history,
      zt,
      qe.signal
    ), ja = d.activeRoutes, kn = D.navigation.state !== "idle" ? _a(
      ja,
      D.navigation.location,
      p,
      !1,
      d.branches
    ) : D.matches;
    Qe(kn, "Didn't find any matches after fetcher action");
    let dn = ++ne;
    k.set($, dn);
    let { dsMatches: an, revalidatingFetchers: En } = vy(
      rt,
      ge,
      u,
      c,
      e.history,
      D,
      kn,
      Se,
      zt,
      l,
      !1,
      z,
      F,
      de,
      ee,
      G,
      ja,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      [Pe.route.id, et],
      ze
    ), Sr = Oo(Se, et.data), Nn = new Map(D.fetchers);
    Nn.set($, Sr), En.filter((ht) => ht.key !== $).forEach((ht) => {
      let Kn = ht.key, rn = Nn.get(Kn), ai = Oo(
        void 0,
        rn ? rn.data : void 0
      );
      Nn.set(Kn, ai), Ot(Kn), ht.controller && X.set(Kn, ht.controller);
    }), we({ fetchers: Nn });
    let Er = () => En.forEach((ht) => Ot(ht.key));
    qe.signal.addEventListener(
      "abort",
      Er
    );
    let { loaderResults: ga, fetcherResults: va } = await Yt(
      an,
      En,
      rt,
      zt,
      ge
    );
    if (qe.signal.aborted)
      return;
    qe.signal.removeEventListener(
      "abort",
      Er
    ), k.delete($), X.delete($), En.forEach((ht) => X.delete(ht.key));
    let $e = D.fetchers.has($), xt = (ht) => {
      if (!$e) return ht;
      let Kn = new Map(ht.fetchers);
      return Kn.set($, Ua(et.data)), { ...ht, fetchers: Kn };
    }, vn = Au(ga);
    if (vn)
      return D = xt(D), vt(
        rt,
        vn.result,
        !1,
        { preventScrollReset: Ne }
      );
    if (vn = Au(va), vn)
      return G.add(vn.key), D = xt(D), vt(
        rt,
        vn.result,
        !1,
        { preventScrollReset: Ne }
      );
    let Hn = new Map(D.fetchers);
    $e && Hn.set($, Ua(et.data));
    let { loaderData: Nr, errors: Xa } = Ny(
      D,
      kn,
      ga,
      void 0,
      En,
      va,
      Hn
    );
    Aa(dn, Hn), D.navigation.state === "loading" && dn > A ? (Qe(H, "Expected pending action"), Q && Q.abort(), Me(D.navigation.location, {
      matches: kn,
      loaderData: Nr,
      errors: Xa,
      fetchers: Hn
    })) : (we({
      errors: Xa,
      loaderData: Cy(
        D.loaderData,
        Nr,
        kn,
        Xa
      ),
      fetchers: Hn
    }), z = !1);
  }
  async function Ke($, Z, te, me, ge, Ce, xe, Ne, Se) {
    let ze = D.fetchers.get($);
    pt(
      $,
      Oo(
        Se,
        ze ? ze.data : void 0
      ),
      { flushSync: xe }
    );
    let Le = new AbortController(), qe = bl(
      e.history,
      te,
      Le.signal
    );
    if (Ce) {
      let et = await gt(
        me,
        new URL(qe.url).pathname,
        qe.signal,
        $
      );
      if (et.type === "aborted")
        return;
      if (et.type === "error") {
        ut($, Z, et.error, { flushSync: xe });
        return;
      } else if (et.matches)
        me = et.matches;
      else {
        ut(
          $,
          Z,
          sa(404, { pathname: te }),
          { flushSync: xe }
        );
        return;
      }
    }
    let Be = ac(me, te);
    X.set($, Le);
    let Pe = ne, ot = El(
      u,
      c,
      qe,
      te,
      me,
      Be,
      l,
      ge
    ), Ct = await yt(
      qe,
      te,
      ot,
      ge,
      $
    ), ct = Ct[Be.route.id];
    if (!ct) {
      for (let et of me)
        if (Ct[et.route.id]) {
          ct = Ct[et.route.id];
          break;
        }
    }
    if (X.get($) === Le && X.delete($), !qe.signal.aborted) {
      if (de.has($)) {
        pt($, Ua(void 0));
        return;
      }
      if (_i(ct))
        if (A > Pe) {
          pt($, Ua(void 0));
          return;
        } else {
          G.add($), await vt(qe, ct, !1, {
            preventScrollReset: Ne
          });
          return;
        }
      if (Gn(ct)) {
        ut($, Z, ct.error);
        return;
      }
      pt($, Ua(ct.data));
    }
  }
  async function vt($, Z, te, {
    submission: me,
    fetcherSubmission: ge,
    preventScrollReset: Ce,
    replace: xe
  } = {}) {
    te || (J?.resolve(), J = null), Z.response.headers.has("X-Remix-Revalidate") && (z = !0);
    let Ne = Z.response.headers.get("Location");
    Qe(Ne, "Expected a Location header on the redirect Response"), Ne = Sy(
      Ne,
      new URL($.url),
      p,
      e.history
    );
    let Se = qh(D.location, Ne, {
      _isRedirect: !0
    });
    if (i) {
      let ot = !1;
      if (Z.response.headers.has("X-Remix-Reload-Document"))
        ot = !0;
      else if (_m(Ne)) {
        const Ct = f2(a, Ne, !0);
        ot = // Hard reload if it's an absolute URL to a new origin
        Ct.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        da(Ct.pathname, p) == null;
      }
      if (ot) {
        xe ? a.location.replace(Ne) : a.location.assign(Ne);
        return;
      }
    }
    Q = null;
    let ze = xe === !0 || Z.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Le, formAction: qe, formEncType: Be } = D.navigation;
    !me && !ge && Le && qe && Be && (me = My(D.navigation));
    let Pe = me || ge;
    if (Y2.has(Z.response.status) && Pe && mn(Pe.formMethod))
      await pe(ze, Se, {
        submission: {
          ...Pe,
          formAction: Ne
        },
        // Preserve these flags across redirects
        preventScrollReset: Ce || I,
        enableViewTransition: te ? ae : void 0
      });
    else {
      let ot = fh(
        Se,
        [],
        ze,
        me
      );
      await pe(ze, Se, {
        overrideNavigation: ot,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ge,
        // Preserve these flags across redirects
        preventScrollReset: Ce || I,
        enableViewTransition: te ? ae : void 0
      });
    }
  }
  async function yt($, Z, te, me, ge) {
    let Ce, xe = {};
    try {
      Ce = await tN(
        m,
        $,
        Z,
        te,
        ge,
        me,
        !1
      );
    } catch (Ne) {
      return te.filter((Se) => Se.shouldLoad).forEach((Se) => {
        xe[Se.route.id] = {
          type: "error",
          error: Ne
        };
      }), xe;
    }
    if ($.signal.aborted)
      return xe;
    if (!mn($.method))
      for (let Ne of te) {
        if (Ce[Ne.route.id]?.type === "error")
          break;
        !Ce.hasOwnProperty(Ne.route.id) && !D.loaderData.hasOwnProperty(Ne.route.id) && (!D.errors || !D.errors.hasOwnProperty(Ne.route.id)) && Ne.shouldCallHandler() && (Ce[Ne.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${Ne.route.id}`
          )
        });
      }
    for (let [Ne, Se] of Object.entries(Ce))
      if (fN(Se)) {
        let ze = Se.result;
        xe[Ne] = {
          type: "redirect",
          response: iN(
            ze,
            $,
            Ne,
            te,
            p
          )
        };
      } else
        xe[Ne] = await rN(Se);
    return xe;
  }
  async function Yt($, Z, te, me, ge) {
    let Ce = yt(
      te,
      me,
      $,
      ge,
      null
    ), xe = Promise.all(
      Z.map(async (ze) => {
        if (ze.matches && ze.match && ze.request && ze.controller) {
          let qe = (await yt(
            ze.request,
            ze.path,
            ze.matches,
            ge,
            ze.key
          ))[ze.match.route.id];
          return { [ze.key]: qe };
        } else
          return Promise.resolve({
            [ze.key]: {
              type: "error",
              error: sa(404, {
                pathname: ze.path
              })
            }
          });
      })
    ), Ne = await Ce, Se = (await xe).reduce(
      (ze, Le) => Object.assign(ze, Le),
      {}
    );
    return {
      loaderResults: Ne,
      fetcherResults: Se
    };
  }
  function Lt() {
    z = !0, ee.forEach(($, Z) => {
      X.has(Z) && F.add(Z), Ot(Z);
    });
  }
  function pt($, Z, te = {}) {
    let me = new Map(D.fetchers);
    me.set($, Z), we(
      { fetchers: me },
      { flushSync: (te && te.flushSync) === !0 }
    );
  }
  function ut($, Z, te, me = {}) {
    let ge = Jr(D.matches, Z), Ce = new Map(D.fetchers);
    nn(Ce, $), we(
      {
        errors: {
          [ge.route.id]: te
        },
        fetchers: Ce
      },
      { flushSync: (me && me.flushSync) === !0 }
    );
  }
  function Zn($) {
    return se.set($, (se.get($) || 0) + 1), de.has($) && de.delete($), D.fetchers.get($) || G2;
  }
  function _n($, Z) {
    Ot($, Z?.reason), pt($, Ua(null));
  }
  function nn($, Z) {
    let te = D.fetchers.get(Z);
    X.has(Z) && !(te && te.state === "loading" && k.has(Z)) && Ot(Z), ee.delete(Z), k.delete(Z), G.delete(Z), de.delete(Z), F.delete(Z), $.delete(Z);
  }
  function Kt($) {
    let Z = (se.get($) || 0) - 1;
    Z <= 0 ? (se.delete($), de.add($)) : se.set($, Z), we({ fetchers: new Map(D.fetchers) });
  }
  function Ot($, Z) {
    let te = X.get($);
    te && (te.abort(Z), X.delete($));
  }
  function Ut($, Z) {
    for (let te of $) {
      let me = Z.get(te);
      Qe(me, `Expected fetcher: ${te}`);
      let ge = Ua(me.data);
      Z.set(te, ge);
    }
  }
  function _r($) {
    let Z = [], te = !1;
    for (let me of G) {
      let ge = $.get(me);
      Qe(ge, `Expected fetcher: ${me}`), ge.state === "loading" && (G.delete(me), Z.push(me), te = !0);
    }
    return Ut(Z, $), te;
  }
  function Aa($, Z) {
    let te = [];
    for (let [me, ge] of k)
      if (ge < $) {
        let Ce = Z.get(me);
        Qe(Ce, `Expected fetcher: ${me}`), Ce.state === "loading" && (Ot(me), k.delete(me), te.push(me));
      }
    return Ut(te, Z), te.length > 0;
  }
  function Sn($, Z) {
    let te = D.blockers.get($) || jo;
    return he.get($) !== Z && he.set($, Z), te;
  }
  function ma($) {
    D.blockers.delete($), he.delete($);
  }
  function Ln($, Z) {
    let te = D.blockers.get($) || jo;
    Qe(
      te.state === "unblocked" && Z.state === "blocked" || te.state === "blocked" && Z.state === "blocked" || te.state === "blocked" && Z.state === "proceeding" || te.state === "blocked" && Z.state === "unblocked" || te.state === "proceeding" && Z.state === "unblocked",
      `Invalid blocker state transition: ${te.state} -> ${Z.state}`
    );
    let me = new Map(D.blockers);
    me.set($, Z), we({ blockers: me });
  }
  function Qn({
    currentLocation: $,
    nextLocation: Z,
    historyAction: te
  }) {
    if (he.size === 0)
      return;
    he.size > 1 && It(!1, "A router only supports one blocker at a time");
    let me = Array.from(he.entries()), [ge, Ce] = me[me.length - 1], xe = D.blockers.get(ge);
    if (!(xe && xe.state === "proceeding") && Ce({ currentLocation: $, nextLocation: Z, historyAction: te }))
      return ge;
  }
  function fn($) {
    let Z = sa(404, { pathname: $ }), te = d.activeRoutes, { matches: me, route: ge } = Du(te);
    return { notFoundMatches: me, route: ge, error: Z };
  }
  function Ve($, Z, te) {
    if (_ = $, N = Z, E = te || null, !R && D.navigation === ch) {
      R = !0;
      let me = Vt(D.location, D.matches);
      me != null && we({ restoreScrollPosition: me });
    }
    return () => {
      _ = null, N = null, E = null;
    };
  }
  function bt($, Z) {
    return E && E(
      $,
      Z.map((me) => v2(me, D.loaderData))
    ) || $.key;
  }
  function kt($, Z) {
    if (_ && N) {
      let te = bt($, Z);
      _[te] = N();
    }
  }
  function Vt($, Z) {
    if (_) {
      let te = bt($, Z), me = _[te];
      if (typeof me == "number")
        return me;
    }
    return null;
  }
  function gn($, Z, te) {
    if (e.patchRoutesOnNavigation) {
      let me = d.branches;
      if ($) {
        if (Object.keys($[0].params).length > 0)
          return { active: !0, matches: _a(
            Z,
            te,
            p,
            !0,
            me
          ) };
      } else
        return { active: !0, matches: _a(
          Z,
          te,
          p,
          !0,
          me
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function gt($, Z, te, me) {
    if (!e.patchRoutesOnNavigation)
      return { type: "success", matches: $ };
    let ge = $;
    for (; ; ) {
      let Ce = c;
      try {
        await e.patchRoutesOnNavigation({
          signal: te,
          path: Z,
          matches: ge,
          fetcherKey: me,
          patch: (ze, Le) => {
            te.aborted || yy(
              ze,
              Le,
              d,
              Ce,
              u,
              !1
            );
          }
        });
      } catch (ze) {
        return { type: "error", error: ze, partialMatches: ge };
      }
      if (te.aborted)
        return { type: "aborted" };
      let xe = d.branches, Ne = _a(
        d.activeRoutes,
        Z,
        p,
        !1,
        xe
      ), Se = null;
      if (Ne) {
        if (Object.keys(Ne[0].params).length === 0)
          return { type: "success", matches: Ne };
        if (Se = _a(
          d.activeRoutes,
          Z,
          p,
          !0,
          xe
        ), !(Se && ge.length < Se.length && Wt(
          ge,
          Se.slice(0, ge.length)
        )))
          return { type: "success", matches: Ne };
      }
      if (Se || (Se = _a(
        d.activeRoutes,
        Z,
        p,
        !0,
        xe
      )), !Se || Wt(ge, Se))
        return { type: "success", matches: null };
      ge = Se;
    }
  }
  function Wt($, Z) {
    return $.length === Z.length && $.every((te, me) => te.route.id === Z[me].route.id);
  }
  function pa($) {
    c = {}, d.setHmrRoutes(
      Po(
        $,
        u,
        void 0,
        c
      )
    );
  }
  function en($, Z, te = !1) {
    yy(
      $,
      Z,
      d,
      c,
      u,
      te
    ), d.hasHMRRoutes || we({});
  }
  return U = {
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
    initialize: De,
    subscribe: Ee,
    enableScrollRestoration: Ve,
    navigate: Ye,
    fetch: Ze,
    revalidate: ye,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: ($) => e.history.createHref($),
    encodeLocation: ($) => e.history.encodeLocation($),
    getFetcher: Zn,
    resetFetcher: _n,
    deleteFetcher: Kt,
    dispose: Oe,
    getBlocker: Sn,
    deleteBlocker: ma,
    patchRoutes: en,
    _internalFetchControllers: X,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: pa,
    _internalSetStateDoNotUseOrYouWillBreakYourApp($) {
      we($);
    }
  }, e.instrumentations && (U = k2(
    U,
    e.instrumentations.map(($) => $.router).filter(Boolean)
  )), U;
}
function Z2(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function Ih(e, a, i, l, s, u) {
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
  let p = Dc(
    l || ".",
    Sm(c),
    da(e.pathname, i) || e.pathname,
    u === "path"
  );
  if (l == null && (p.search = e.search, p.hash = e.hash), (l == null || l === "" || l === ".") && d) {
    let m = Rm(p.search);
    if (d.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!d.route.index && m) {
      let y = new URLSearchParams(p.search), g = y.getAll("index");
      y.delete("index"), g.filter((x) => x).forEach((x) => y.append("index", x));
      let b = y.toString();
      p.search = b ? `?${b}` : "";
    }
  }
  return i !== "/" && (p.pathname = D2({ basename: i, pathname: p.pathname })), Ga(p);
}
function gy(e, a, i) {
  if (!i || !Z2(i))
    return { path: a };
  if (i.formMethod && !mN(i.formMethod))
    return {
      path: a,
      error: sa(405, { method: i.formMethod })
    };
  let l = () => ({
    path: a,
    error: sa(400, { type: "invalid-body" })
  }), u = (i.formMethod || "get").toUpperCase(), c = d1(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!mn(u))
        return l();
      let g = typeof i.body == "string" ? i.body : i.body instanceof FormData || i.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(i.body.entries()).reduce(
          (b, [x, _]) => `${b}${x}=${_}
`,
          ""
        )
      ) : String(i.body);
      return {
        path: a,
        submission: {
          formMethod: u,
          formAction: c,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: g
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!mn(u))
        return l();
      try {
        let g = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: c,
            formEncType: i.formEncType,
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
  Qe(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let d, p;
  if (i.formData)
    d = Gh(i.formData), p = i.formData;
  else if (i.body instanceof FormData)
    d = Gh(i.body), p = i.body;
  else if (i.body instanceof URLSearchParams)
    d = i.body, p = Ey(d);
  else if (i.body == null)
    d = new URLSearchParams(), p = new FormData();
  else
    try {
      d = new URLSearchParams(i.body), p = Ey(d);
    } catch {
      return l();
    }
  let m = {
    formMethod: u,
    formAction: c,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (mn(m.formMethod))
    return { path: a, submission: m };
  let y = Ta(a);
  return e && y.search && Rm(y.search) && d.append("index", ""), y.search = `?${d}`, { path: Ga(y), submission: m };
}
function vy(e, a, i, l, s, u, c, d, p, m, y, g, b, x, _, E, N, R, j, C, O, V) {
  let B = O ? Gn(O[1]) ? O[1].error : O[1].data : void 0, U = s.createURL(u.location), D = s.createURL(p), H;
  if (y && u.errors) {
    let T = Object.keys(u.errors)[0];
    H = c.findIndex((z) => z.route.id === T);
  } else if (O && Gn(O[1])) {
    let T = O[0];
    H = c.findIndex((z) => z.route.id === T) - 1;
  }
  let J = O ? O[1].statusCode : void 0, I = J && J >= 400, Q = {
    currentUrl: U,
    currentParams: u.matches[0]?.params || {},
    nextUrl: D,
    nextParams: c[0].params,
    ...d,
    actionResult: B,
    actionStatus: J
  }, ae = cs(c), L = c.map((T, z) => {
    let { route: F } = T, X = null;
    if (H != null && z > H)
      X = !1;
    else if (F.lazy)
      X = !0;
    else if (!Nm(F))
      X = !1;
    else if (y) {
      let { shouldLoad: G } = i1(
        F,
        u.loaderData,
        u.errors
      );
      X = G;
    } else Q2(u.loaderData, u.matches[z], T) && (X = !0);
    if (X !== null)
      return Yh(
        i,
        l,
        e,
        p,
        ae,
        T,
        m,
        a,
        X
      );
    let ne = !1;
    typeof V == "boolean" ? ne = V : I ? ne = !1 : (g || U.pathname + U.search === D.pathname + D.search || U.search !== D.search || K2(u.matches[z], T)) && (ne = !0);
    let A = {
      ...Q,
      defaultShouldRevalidate: ne
    }, k = Yo(T, A);
    return Yh(
      i,
      l,
      e,
      p,
      ae,
      T,
      m,
      a,
      k,
      A,
      V
    );
  }), Y = [];
  return _.forEach((T, z) => {
    if (y || !c.some((se) => se.route.id === T.routeId) || x.has(z))
      return;
    let F = u.fetchers.get(z), X = F && F.state !== "idle" && F.data === void 0, ne = _a(
      N,
      T.path,
      R ?? "/",
      !1,
      C
    );
    if (!ne) {
      if (j && X)
        return;
      Y.push({
        key: z,
        routeId: T.routeId,
        path: T.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (E.has(z))
      return;
    let A = ac(ne, T.path), k = new AbortController(), G = bl(
      s,
      T.path,
      k.signal
    ), ee = null;
    if (b.has(z))
      b.delete(z), ee = El(
        i,
        l,
        G,
        T.path,
        ne,
        A,
        m,
        a
      );
    else if (X)
      g && (ee = El(
        i,
        l,
        G,
        T.path,
        ne,
        A,
        m,
        a
      ));
    else {
      let se;
      typeof V == "boolean" ? se = V : I ? se = !1 : se = g;
      let de = {
        ...Q,
        defaultShouldRevalidate: se
      };
      Yo(A, de) && (ee = El(
        i,
        l,
        G,
        T.path,
        ne,
        A,
        m,
        a,
        de
      ));
    }
    ee && Y.push({
      key: z,
      routeId: T.routeId,
      path: T.path,
      matches: ee,
      match: A,
      request: G,
      controller: k
    });
  }), { dsMatches: L, revalidatingFetchers: Y };
}
function Nm(e) {
  return e.loader != null || e.middleware != null && e.middleware.length > 0;
}
function i1(e, a, i) {
  if (e.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Nm(e))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && e.id in a, s = i != null && i[e.id] !== void 0;
  if (!l && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == "function" && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !s;
  return { shouldLoad: u, renderFallback: u };
}
function Q2(e, a, i) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), s = !e.hasOwnProperty(i.route.id);
  return l || s;
}
function K2(e, a) {
  let i = e.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    e.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && e.params["*"] !== a.params["*"]
  );
}
function Yo(e, a) {
  if (e.route.shouldRevalidate) {
    let i = e.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function yy(e, a, i, l, s, u) {
  let c;
  if (e) {
    let m = l[e];
    Qe(
      m,
      `No route found to patch children into: routeId = ${e}`
    ), m.children || (m.children = []), c = m.children;
  } else
    c = i.activeRoutes;
  let d = [], p = [];
  if (a.forEach((m) => {
    let y = c.find(
      (g) => l1(m, g)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : d.push(m);
  }), d.length > 0) {
    let m = Po(
      d,
      s,
      [e || "_", "patch", String(c?.length || "0")],
      l
    );
    c.push(...m);
  }
  if (u && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: g } = p[m], b = y, [x] = Po(
        [g],
        s,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(b, {
        element: x.element ? x.element : b.element,
        errorElement: x.errorElement ? x.errorElement : b.errorElement,
        hydrateFallbackElement: x.hydrateFallbackElement ? x.hydrateFallbackElement : b.hydrateFallbackElement
      });
    }
  i.hasHMRRoutes || i.setRoutes([...i.activeRoutes]);
}
function l1(e, a) {
  return "id" in e && "id" in a && e.id === a.id ? !0 : e.index === a.index && e.path === a.path && e.caseSensitive === a.caseSensitive ? (!e.children || e.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : e.children?.every(
    (i, l) => a.children?.some((s) => l1(i, s))
  ) ?? !1 : !1;
}
var by = /* @__PURE__ */ new WeakMap(), o1 = ({
  key: e,
  route: a,
  manifest: i,
  mapRouteProperties: l
}) => {
  let s = i[a.id];
  if (Qe(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object")
    return;
  let u = s.lazy[e];
  if (!u)
    return;
  let c = by.get(s);
  c || (c = {}, by.set(s, c));
  let d = c[e];
  if (d)
    return d;
  let p = (async () => {
    let m = h2(e), g = s[e] !== void 0 && e !== "hasErrorBoundary";
    if (m)
      It(
        !m,
        "Route property " + e + " is not a supported lazy route property. This property will be ignored."
      ), c[e] = Promise.resolve();
    else if (g)
      It(
        !1,
        `Route "${s.id}" has a static property "${e}" defined. The lazy property will be ignored.`
      );
    else {
      let b = await u();
      b != null && (Object.assign(s, { [e]: b }), Object.assign(s, l(s)));
    }
    typeof s.lazy == "object" && (s.lazy[e] = void 0, Object.values(s.lazy).every((b) => b === void 0) && (s.lazy = void 0));
  })();
  return c[e] = p, p;
}, xy = /* @__PURE__ */ new WeakMap();
function W2(e, a, i, l, s) {
  let u = i[e.id];
  if (Qe(u, "No route found in manifest"), !e.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof e.lazy == "function") {
    let y = xy.get(u);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let g = (async () => {
      Qe(
        typeof e.lazy == "function",
        "No lazy route function found"
      );
      let b = await e.lazy(), x = {};
      for (let _ in b) {
        let E = b[_];
        if (E === void 0)
          continue;
        let N = p2(_), j = u[_] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        _ !== "hasErrorBoundary";
        N ? It(
          !N,
          "Route property " + _ + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : j ? It(
          !j,
          `Route "${u.id}" has a static property "${_}" defined but its lazy function is also returning a value for this property. The lazy route property "${_}" will be ignored.`
        ) : x[_] = E;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(u),
        lazy: void 0
      });
    })();
    return xy.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let c = Object.keys(e.lazy), d = [], p;
  for (let y of c) {
    if (s && s.includes(y))
      continue;
    let g = o1({
      key: y,
      route: e,
      manifest: i,
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
async function wy(e) {
  let a = e.matches.filter((s) => s.shouldLoad), i = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    i[a[u].route.id] = s;
  }), i;
}
async function J2(e) {
  return e.matches.some((a) => a.route.middleware) ? s1(e, () => wy(e)) : wy(e);
}
function s1(e, a) {
  return eN(
    e,
    a,
    (l) => {
      if (hN(l))
        throw l;
      return l;
    },
    uN,
    i
  );
  function i(l, s, u) {
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
      ), p = Jr(
        c,
        c[d].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: l }
      });
    }
  }
}
async function eN(e, a, i, l, s) {
  let { matches: u, ...c } = e, d = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await u1(
    c,
    d,
    a,
    i,
    l,
    s
  );
}
async function u1(e, a, i, l, s, u, c = 0) {
  let { request: d } = e;
  if (d.signal.aborted)
    throw d.signal.reason ?? new Error(`Request aborted: ${d.method} ${d.url}`);
  let p = a[c];
  if (!p)
    return await i();
  let [m, y] = p, g, b = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await u1(
        e,
        a,
        i,
        l,
        s,
        u,
        c + 1
      ) }, g.value;
    } catch (x) {
      return g = { value: await u(x, m, g) }, g.value;
    }
  };
  try {
    let x = await y(e, b), _ = x != null ? l(x) : void 0;
    return s(_) ? _ : g ? _ ?? g.value : (g = { value: await b() }, g.value);
  } catch (x) {
    return await u(x, m, g);
  }
}
function c1(e, a, i, l, s) {
  let u = o1({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: e
  }), c = W2(
    l.route,
    mn(i.method) ? "action" : "loader",
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
function Yh(e, a, i, l, s, u, c, d, p, m = null, y) {
  let g = !1, b = c1(
    e,
    a,
    i,
    u,
    c
  );
  return {
    ...u,
    _lazyPromises: b,
    shouldLoad: p,
    shouldRevalidateArgs: m,
    shouldCallHandler(x) {
      return g = !0, m ? typeof y == "boolean" ? Yo(u, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof x == "boolean" ? Yo(u, {
        ...m,
        defaultShouldRevalidate: x
      }) : Yo(u, m) : p;
    },
    resolve(x) {
      let { lazy: _, loader: E, middleware: N } = u.route, R = g || p || x && !mn(i.method) && (_ || E), j = N && N.length > 0 && !E && !_;
      return R && (mn(i.method) || !j) ? nN({
        request: i,
        path: l,
        pattern: s,
        match: u,
        lazyHandlerPromise: b?.handler,
        lazyRoutePromise: b?.route,
        handlerOverride: x,
        scopedContext: d
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function El(e, a, i, l, s, u, c, d, p = null) {
  return s.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: c1(
      e,
      a,
      i,
      m,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Yh(
    e,
    a,
    i,
    l,
    cs(s),
    m,
    c,
    d,
    !0,
    p
  ));
}
async function tN(e, a, i, l, s, u, c) {
  l.some((y) => y._lazyPromises?.middleware) && await Promise.all(l.map((y) => y._lazyPromises?.middleware));
  let d = {
    request: a,
    url: f1(a, i),
    pattern: cs(l),
    params: l[0].params,
    context: u,
    matches: l
  }, m = await e({
    ...d,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let g = d;
      return s1(g, () => y({
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
async function nN({
  request: e,
  path: a,
  pattern: i,
  match: l,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: d
}) {
  let p, m, y = mn(e.method), g = y ? "action" : "loader", b = (x) => {
    let _, E = new Promise((j, C) => _ = C);
    m = () => _(), e.signal.addEventListener("abort", m);
    let N = (j) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${l.route.id}]`
      )
    ) : x(
      {
        request: e,
        url: f1(e, a),
        pattern: i,
        params: l.params,
        context: d
      },
      ...j !== void 0 ? [j] : []
    ), R = (async () => {
      try {
        return { type: "data", result: await (c ? c((C) => N(C)) : N()) };
      } catch (j) {
        return { type: "error", result: j };
      }
    })();
    return Promise.race([R, E]);
  };
  try {
    let x = y ? l.route.action : l.route.loader;
    if (s || u)
      if (x) {
        let _, [E] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          b(x).catch((N) => {
            _ = N;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (_ !== void 0)
          throw _;
        p = E;
      } else {
        await s;
        let _ = y ? l.route.action : l.route.loader;
        if (_)
          [p] = await Promise.all([b(_), u]);
        else if (g === "action") {
          let E = new URL(e.url), N = E.pathname + E.search;
          throw sa(405, {
            method: e.method,
            pathname: N,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (x)
      p = await b(x);
    else {
      let _ = new URL(e.url), E = _.pathname + _.search;
      throw sa(404, {
        pathname: E
      });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    m && e.signal.removeEventListener("abort", m);
  }
  return p;
}
async function aN(e) {
  let a = e.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? e.body == null ? null : e.json() : e.text();
}
async function rN(e) {
  let { result: a, type: i } = e;
  if (Cm(a)) {
    let l;
    try {
      l = await aN(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return i === "error" ? {
      type: "error",
      error: new Ac(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? Ty(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: sN(a),
    statusCode: Zo(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Zo(a) ? a.status : void 0
  } : Ty(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function iN(e, a, i, l, s) {
  let u = e.headers.get("Location");
  if (Qe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !_m(u)) {
    let c = l.slice(
      0,
      l.findIndex((d) => d.route.id === i) + 1
    );
    u = Ih(
      new URL(a.url),
      c,
      s,
      u
    ), e.headers.set("Location", u);
  }
  return e;
}
var _y = [
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
function Sy(e, a, i, l) {
  if (_m(e)) {
    let s = e, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (_y.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = da(u.pathname, i) != null;
    if (u.origin === a.origin && c)
      return Em(u.pathname) + u.search + u.hash;
  }
  try {
    let s = l.createURL(e);
    if (_y.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return e;
}
function bl(e, a, i, l) {
  let s = e.createURL(d1(a)).toString(), u = { signal: i };
  if (l && mn(l.formMethod)) {
    let { formMethod: c, formEncType: d } = l;
    u.method = c.toUpperCase(), d === "application/json" ? (u.headers = new Headers({ "Content-Type": d }), u.body = JSON.stringify(l.json)) : d === "text/plain" ? u.body = l.text : d === "application/x-www-form-urlencoded" && l.formData ? u.body = Gh(l.formData) : u.body = l.formData;
  }
  return new Request(s, u);
}
function f1(e, a) {
  let i = new URL(e.url), l = typeof a == "string" ? Ta(a) : a;
  if (i.pathname = l.pathname || "/", l.search) {
    let s = new URLSearchParams(l.search), u = s.getAll("index");
    s.delete("index");
    for (let c of u.filter(Boolean))
      s.append("index", c);
    i.search = s.size ? `?${s.toString()}` : "";
  } else
    i.search = "";
  return i.hash = l.hash || "", i;
}
function Gh(e) {
  let a = new URLSearchParams();
  for (let [i, l] of e.entries())
    a.append(i, typeof l == "string" ? l : l.name);
  return a;
}
function Ey(e) {
  let a = new FormData();
  for (let [i, l] of e.entries())
    a.append(i, l);
  return a;
}
function lN(e, a, i, l = !1, s = !1) {
  let u = {}, c = null, d, p = !1, m = {}, y = i && Gn(i[1]) ? i[1].error : void 0;
  return e.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let b = g.route.id, x = a[b];
    if (Qe(
      !_i(x),
      "Cannot handle redirect results in processLoaderData"
    ), Gn(x)) {
      let _ = x.error;
      if (y !== void 0 && (_ = y, y = void 0), c = c || {}, s)
        c[b] = _;
      else {
        let E = Jr(e, b);
        c[E.route.id] == null && (c[E.route.id] = _);
      }
      l || (u[b] = r1), p || (p = !0, d = Zo(x.error) ? x.error.status : 500), x.headers && (m[b] = x.headers);
    } else
      u[b] = x.data, x.statusCode && x.statusCode !== 200 && !p && (d = x.statusCode), x.headers && (m[b] = x.headers);
  }), y !== void 0 && i && (c = { [i[0]]: y }, i[2] && (u[i[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: d || 200,
    loaderHeaders: m
  };
}
function Ny(e, a, i, l, s, u, c) {
  let { loaderData: d, errors: p } = lN(
    a,
    i,
    l
  );
  return s.filter((m) => !m.matches || m.matches.some((y) => y.shouldLoad)).forEach((m) => {
    let { key: y, match: g, controller: b } = m;
    if (b && b.signal.aborted)
      return;
    let x = u[y];
    if (Qe(x, "Did not find corresponding fetcher result"), Gn(x)) {
      let _ = Jr(e.matches, g?.route.id);
      p && p[_.route.id] || (p = {
        ...p,
        [_.route.id]: x.error
      }), c.delete(y);
    } else if (_i(x))
      Qe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let _ = Ua(x.data);
      c.set(y, _);
    }
  }), { loaderData: d, errors: p };
}
function Cy(e, a, i, l) {
  let s = Object.entries(a).filter(([, u]) => u !== r1).reduce((u, [c, d]) => (u[c] = d, u), {});
  for (let u of i) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && e.hasOwnProperty(c) && u.route.loader && (s[c] = e[c]), l && l.hasOwnProperty(c))
      break;
  }
  return s;
}
function Ry(e) {
  return e ? Gn(e[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [e[0]]: e[1].data
    }
  } : {};
}
function Jr(e, a) {
  return (a ? e.slice(0, e.findIndex((l) => l.route.id === a) + 1) : [...e]).reverse().find((l) => l.route.hasErrorBoundary === !0) || e[0];
}
function Du(e) {
  let a = e.length === 1 ? e[0] : e.find((i) => i.index || !i.path || i.path === "/") || {
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
function sa(e, {
  pathname: a,
  routeId: i,
  method: l,
  type: s,
  message: u
} = {}) {
  let c = "Unknown Server Error", d = "Unknown @remix-run/router error";
  return e === 400 ? (c = "Bad Request", l && a && i ? d = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : s === "invalid-body" && (d = "Unable to encode submission body")) : e === 403 ? (c = "Forbidden", d = `Route "${i}" does not match URL "${a}"`) : e === 404 ? (c = "Not Found", d = `No route matches URL "${a}"`) : e === 405 && (c = "Method Not Allowed", l && a && i ? d = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : l && (d = `Invalid request method "${l.toUpperCase()}"`)), new Ac(
    e || 500,
    c,
    new Error(d),
    !0
  );
}
function Au(e) {
  let a = Object.entries(e);
  for (let i = a.length - 1; i >= 0; i--) {
    let [l, s] = a[i];
    if (_i(s))
      return { key: l, result: s };
  }
}
function d1(e) {
  let a = typeof e == "string" ? Ta(e) : e;
  return Ga({ ...a, hash: "" });
}
function oN(e, a) {
  return e.pathname !== a.pathname || e.search !== a.search ? !1 : e.hash === "" ? a.hash !== "" : e.hash === a.hash ? !0 : a.hash !== "";
}
function sN(e) {
  return new Ac(
    e.init?.status ?? 500,
    e.init?.statusText ?? "Internal Server Error",
    e.data
  );
}
function uN(e) {
  return e != null && typeof e == "object" && Object.entries(e).every(
    ([a, i]) => typeof a == "string" && cN(i)
  );
}
function cN(e) {
  return e != null && typeof e == "object" && "type" in e && "result" in e && (e.type === "data" || e.type === "error");
}
function fN(e) {
  return Cm(e.result) && n1.has(e.result.status);
}
function Gn(e) {
  return e.type === "error";
}
function _i(e) {
  return (e && e.type) === "redirect";
}
function Ty(e) {
  return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit";
}
function Cm(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function dN(e) {
  return n1.has(e);
}
function hN(e) {
  return Cm(e) && dN(e.status) && e.headers.has("Location");
}
function mN(e) {
  return I2.has(e.toUpperCase());
}
function mn(e) {
  return $2.has(e.toUpperCase());
}
function Rm(e) {
  return new URLSearchParams(e).getAll("index").some((a) => a === "");
}
function ac(e, a) {
  let i = typeof a == "string" ? Ta(a).search : a.search;
  if (e[e.length - 1].route.index && Rm(i || ""))
    return e[e.length - 1];
  let l = Kx(e);
  return l[l.length - 1];
}
function My(e) {
  let { formMethod: a, formAction: i, formEncType: l, text: s, formData: u, json: c } = e;
  if (!(!a || !i || !l)) {
    if (s != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: void 0,
        json: void 0,
        text: s
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: u,
        json: void 0,
        text: void 0
      };
    if (c !== void 0)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: void 0,
        json: c,
        text: void 0
      };
  }
}
function fh(e, a, i, l) {
  return l ? {
    state: "loading",
    location: e,
    matches: a,
    historyAction: i,
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
    historyAction: i,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function pN(e, a, i, l) {
  return {
    state: "submitting",
    location: e,
    matches: a,
    historyAction: i,
    formMethod: l.formMethod,
    formAction: l.formAction,
    formEncType: l.formEncType,
    formData: l.formData,
    json: l.json,
    text: l.text
  };
}
function Oo(e, a) {
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
function gN(e, a) {
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
function Ua(e) {
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
function vN(e, a) {
  try {
    let i = e.sessionStorage.getItem(
      a1
    );
    if (i) {
      let l = JSON.parse(i);
      for (let [s, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function yN(e, a) {
  if (a.size > 0) {
    let i = {};
    for (let [l, s] of a)
      i[l] = [...s];
    try {
      e.sessionStorage.setItem(
        a1,
        JSON.stringify(i)
      );
    } catch (l) {
      It(
        !1,
        `Failed to save applied view transitions in sessionStorage (${l}).`
      );
    }
  }
}
function Dy() {
  let e, a, i = new Promise((l, s) => {
    e = async (u) => {
      l(u);
      try {
        await i;
      } catch {
      }
    }, a = async (u) => {
      s(u);
      try {
        await i;
      } catch {
      }
    };
  });
  return {
    promise: i,
    //@ts-ignore
    resolve: e,
    //@ts-ignore
    reject: a
  };
}
var Li = S.createContext(null);
Li.displayName = "DataRouter";
var fs = S.createContext(null);
fs.displayName = "DataRouterState";
var h1 = S.createContext(!1);
function m1() {
  return S.useContext(h1);
}
var Tm = S.createContext({
  isTransitioning: !1
});
Tm.displayName = "ViewTransition";
var p1 = S.createContext(
  /* @__PURE__ */ new Map()
);
p1.displayName = "Fetchers";
var bN = S.createContext(null);
bN.displayName = "Await";
var ha = S.createContext(
  null
);
ha.displayName = "Navigation";
var jc = S.createContext(
  null
);
jc.displayName = "Location";
var Ma = S.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ma.displayName = "Route";
var Mm = S.createContext(null);
Mm.displayName = "RouteError";
var g1 = "REACT_ROUTER_ERROR", xN = "REDIRECT", wN = "ROUTE_ERROR_RESPONSE";
function _N(e) {
  if (e.startsWith(`${g1}:${xN}:{`))
    try {
      let a = JSON.parse(e.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function SN(e) {
  if (e.startsWith(
    `${g1}:${wN}:{`
  ))
    try {
      let a = JSON.parse(e.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Ac(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function EN(e, { relative: a } = {}) {
  Qe(
    ds(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: l } = S.useContext(ha), { hash: s, pathname: u, search: c } = hs(e, { relative: a }), d = u;
  return i !== "/" && (d = u === "/" ? i : fa([i, u])), l.createHref({ pathname: d, search: c, hash: s });
}
function ds() {
  return S.useContext(jc) != null;
}
function br() {
  return Qe(
    ds(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), S.useContext(jc).location;
}
var v1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function y1(e) {
  S.useContext(ha).static || S.useLayoutEffect(e);
}
function NN() {
  let { isDataRoute: e } = S.useContext(Ma);
  return e ? $N() : CN();
}
function CN() {
  Qe(
    ds(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = S.useContext(Li), { basename: a, navigator: i } = S.useContext(ha), { matches: l } = S.useContext(Ma), { pathname: s } = br(), u = JSON.stringify(Sm(l)), c = S.useRef(!1);
  return y1(() => {
    c.current = !0;
  }), S.useCallback(
    (p, m = {}) => {
      if (It(c.current, v1), !c.current) return;
      if (typeof p == "number") {
        i.go(p);
        return;
      }
      let y = Dc(
        p,
        JSON.parse(u),
        s,
        m.relative === "path"
      );
      e == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : fa([a, y.pathname])), (m.replace ? i.replace : i.push)(
        y,
        m.state,
        m
      );
    },
    [
      a,
      i,
      u,
      s,
      e
    ]
  );
}
var RN = S.createContext(null);
function TN(e) {
  let a = S.useContext(Ma).outlet;
  return S.useMemo(
    () => a && /* @__PURE__ */ S.createElement(RN.Provider, { value: e }, a),
    [a, e]
  );
}
function MN() {
  let { matches: e } = S.useContext(Ma);
  return e[e.length - 1]?.params ?? {};
}
function hs(e, { relative: a } = {}) {
  let { matches: i } = S.useContext(Ma), { pathname: l } = br(), s = JSON.stringify(Sm(i));
  return S.useMemo(
    () => Dc(
      e,
      JSON.parse(s),
      l,
      a === "path"
    ),
    [e, s, l, a]
  );
}
function DN(e, a, i) {
  Qe(
    ds(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = S.useContext(ha), { matches: s } = S.useContext(Ma), u = s[s.length - 1], c = u ? u.params : {}, d = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let N = m && m.path || "";
    w1(
      d,
      !m || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === "/" ? "*" : `${N}/*`}">.`
    );
  }
  let y = br(), g;
  g = y;
  let b = g.pathname || "/", x = b;
  if (p !== "/") {
    let N = p.replace(/^\//, "").split("/");
    x = "/" + b.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let _ = i && i.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    i.state.matches.map(
      (N) => Object.assign(N, {
        route: i.manifest[N.route.id] || N.route
      })
    )
  ) : Xx(e, { pathname: x });
  return It(
    m || _ != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), It(
    _ == null || _[_.length - 1].route.element !== void 0 || _[_.length - 1].route.Component !== void 0 || _[_.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), LN(
    _ && _.map(
      (N) => Object.assign({}, N, {
        params: Object.assign({}, c, N.params),
        pathname: fa([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            N.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathname
        ]),
        pathnameBase: N.pathnameBase === "/" ? p : fa([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            N.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathnameBase
        ])
      })
    ),
    s,
    i
  );
}
function AN() {
  let e = VN(), a = Zo(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), i = e instanceof Error ? e.stack : null, l = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), c = /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ S.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ S.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ S.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ S.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ S.createElement("pre", { style: s }, i) : null, c);
}
var jN = /* @__PURE__ */ S.createElement(AN, null), b1 = class extends S.Component {
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
      const i = SN(e.digest);
      i && (e = i);
    }
    let a = e !== void 0 ? /* @__PURE__ */ S.createElement(Ma.Provider, { value: this.props.routeContext }, /* @__PURE__ */ S.createElement(
      Mm.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ S.createElement(ON, { error: e }, a) : a;
  }
};
b1.contextType = h1;
var dh = /* @__PURE__ */ new WeakMap();
function ON({
  children: e,
  error: a
}) {
  let { basename: i } = S.useContext(ha);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = _N(a.digest);
    if (l) {
      let s = dh.get(a);
      if (s) throw s;
      let u = Jx(l.location, i);
      if (Wx && !dh.get(a))
        if (u.isExternal || l.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: l.replace
            })
          );
          throw dh.set(a, c), c;
        }
      return /* @__PURE__ */ S.createElement(
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
function zN({ routeContext: e, match: a, children: i }) {
  let l = S.useContext(Li);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ S.createElement(Ma.Provider, { value: e }, i);
}
function LN(e, a = [], i) {
  let l = i?.state;
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
    Qe(
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
  if (i && l) {
    c = l.renderFallback;
    for (let y = 0; y < s.length; y++) {
      let g = s[y];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (d = y), g.route.id) {
        let { loaderData: b, errors: x } = l, _ = g.route.loader && !b.hasOwnProperty(g.route.id) && (!x || x[g.route.id] === void 0);
        if (g.route.lazy || _) {
          i.isStatic && (c = !0), d >= 0 ? s = s.slice(0, d + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let p = i?.onError, m = l && p ? (y, g) => {
    p(y, {
      location: l.location,
      params: l.matches?.[0]?.params ?? {},
      pattern: cs(l.matches),
      errorInfo: g
    });
  } : void 0;
  return s.reduceRight(
    (y, g, b) => {
      let x, _ = !1, E = null, N = null;
      l && (x = u && g.route.id ? u[g.route.id] : void 0, E = g.route.errorElement || jN, c && (d < 0 && b === 0 ? (w1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), _ = !0, N = null) : d === b && (_ = !0, N = g.route.hydrateFallbackElement || null)));
      let R = a.concat(s.slice(0, b + 1)), j = () => {
        let C;
        return x ? C = E : _ ? C = N : g.route.Component ? C = /* @__PURE__ */ S.createElement(g.route.Component, null) : g.route.element ? C = g.route.element : C = y, /* @__PURE__ */ S.createElement(
          zN,
          {
            match: g,
            routeContext: {
              outlet: y,
              matches: R,
              isDataRoute: l != null
            },
            children: C
          }
        );
      };
      return l && (g.route.ErrorBoundary || g.route.errorElement || b === 0) ? /* @__PURE__ */ S.createElement(
        b1,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: E,
          error: x,
          children: j(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
          onError: m
        }
      ) : j();
    },
    null
  );
}
function Dm(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function kN(e) {
  let a = S.useContext(Li);
  return Qe(a, Dm(e)), a;
}
function x1(e) {
  let a = S.useContext(fs);
  return Qe(a, Dm(e)), a;
}
function HN(e) {
  let a = S.useContext(Ma);
  return Qe(a, Dm(e)), a;
}
function Oc(e) {
  let a = HN(e), i = a.matches[a.matches.length - 1];
  return Qe(
    i.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function BN() {
  return Oc(
    "useRouteId"
    /* UseRouteId */
  );
}
function UN() {
  let e = x1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Oc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return e.loaderData[a];
}
function VN() {
  let e = S.useContext(Mm), a = x1(
    "useRouteError"
    /* UseRouteError */
  ), i = Oc(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : a.errors?.[i];
}
function $N() {
  let { router: e } = kN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Oc(
    "useNavigate"
    /* UseNavigateStable */
  ), i = S.useRef(!1);
  return y1(() => {
    i.current = !0;
  }), S.useCallback(
    async (s, u = {}) => {
      It(i.current, v1), i.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: a, ...u }));
    },
    [e, a]
  );
}
var Ay = {};
function w1(e, a, i) {
  !a && !Ay[e] && (Ay[e] = !0, It(!1, i));
}
var jy = {};
function Oy(e, a) {
  !e && !jy[a] && (jy[a] = !0, console.warn(a));
}
var qN = "useOptimistic", zy = n2[qN], IN = () => {
};
function YN(e) {
  return zy ? zy(e) : [e, IN];
}
function GN(e) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null
  };
  return e.Component && (e.element && It(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: S.createElement(e.Component),
    Component: void 0
  })), e.HydrateFallback && (e.hydrateFallbackElement && It(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: S.createElement(e.HydrateFallback),
    HydrateFallback: void 0
  })), e.ErrorBoundary && (e.errorElement && It(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: S.createElement(e.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var FN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function XN(e, a) {
  return P2({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: u2({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: e,
    hydrationRouteProperties: FN,
    mapRouteProperties: GN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var PN = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((e, a) => {
      this.resolve = (i) => {
        this.status === "pending" && (this.status = "resolved", e(i));
      }, this.reject = (i) => {
        this.status === "pending" && (this.status = "rejected", a(i));
      };
    });
  }
};
function ZN({
  router: e,
  flushSync: a,
  onError: i,
  useTransitions: l
}) {
  l = m1() || l;
  let [u, c] = S.useState(e.state), [d, p] = YN(u), [m, y] = S.useState(), [g, b] = S.useState({
    isTransitioning: !1
  }), [x, _] = S.useState(), [E, N] = S.useState(), [R, j] = S.useState(), C = S.useRef(/* @__PURE__ */ new Map()), O = S.useCallback(
    (D, { deletedFetchers: H, newErrors: J, flushSync: I, viewTransitionOpts: Q }) => {
      J && i && Object.values(J).forEach(
        (L) => i(L, {
          location: D.location,
          params: D.matches[0]?.params ?? {},
          pattern: cs(D.matches)
        })
      ), D.fetchers.forEach((L, Y) => {
        L.data !== void 0 && C.current.set(Y, L.data);
      }), H.forEach((L) => C.current.delete(L)), Oy(
        I === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ae = e.window != null && e.window.document != null && typeof e.window.document.startViewTransition == "function";
      if (Oy(
        Q == null || ae,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !Q || !ae) {
        a && I ? a(() => c(D)) : l === !1 ? c(D) : S.startTransition(() => {
          l === !0 && p((L) => Ly(L, D)), c(D);
        });
        return;
      }
      if (a && I) {
        a(() => {
          E && (x?.resolve(), E.skipTransition()), b({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: Q.currentLocation,
            nextLocation: Q.nextLocation
          });
        });
        let L = e.window.document.startViewTransition(() => {
          a(() => c(D));
        });
        L.finished.finally(() => {
          a(() => {
            _(void 0), N(void 0), y(void 0), b({ isTransitioning: !1 });
          });
        }), a(() => N(L));
        return;
      }
      E ? (x?.resolve(), E.skipTransition(), j({
        state: D,
        currentLocation: Q.currentLocation,
        nextLocation: Q.nextLocation
      })) : (y(D), b({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: Q.currentLocation,
        nextLocation: Q.nextLocation
      }));
    },
    [
      e.window,
      a,
      E,
      x,
      l,
      p,
      i
    ]
  );
  S.useLayoutEffect(() => e.subscribe(O), [e, O]), S.useEffect(() => {
    g.isTransitioning && !g.flushSync && _(new PN());
  }, [g]), S.useEffect(() => {
    if (x && m && e.window) {
      let D = m, H = x.promise, J = e.window.document.startViewTransition(async () => {
        l === !1 ? c(D) : S.startTransition(() => {
          l === !0 && p((I) => Ly(I, D)), c(D);
        }), await H;
      });
      J.finished.finally(() => {
        _(void 0), N(void 0), y(void 0), b({ isTransitioning: !1 });
      }), N(J);
    }
  }, [
    m,
    x,
    e.window,
    l,
    p
  ]), S.useEffect(() => {
    x && m && d.location.key === m.location.key && x.resolve();
  }, [x, E, d.location, m]), S.useEffect(() => {
    !g.isTransitioning && R && (y(R.state), b({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: R.currentLocation,
      nextLocation: R.nextLocation
    }), j(void 0));
  }, [g.isTransitioning, R]);
  let V = S.useMemo(() => ({
    createHref: e.createHref,
    encodeLocation: e.encodeLocation,
    go: (D) => e.navigate(D),
    push: (D, H, J) => e.navigate(D, {
      state: H,
      preventScrollReset: J?.preventScrollReset
    }),
    replace: (D, H, J) => e.navigate(D, {
      replace: !0,
      state: H,
      preventScrollReset: J?.preventScrollReset
    })
  }), [e]), B = e.basename || "/", U = S.useMemo(
    () => ({
      router: e,
      navigator: V,
      static: !1,
      basename: B,
      onError: i
    }),
    [e, V, B, i]
  );
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(Li.Provider, { value: U }, /* @__PURE__ */ S.createElement(fs.Provider, { value: d }, /* @__PURE__ */ S.createElement(p1.Provider, { value: C.current }, /* @__PURE__ */ S.createElement(Tm.Provider, { value: g }, /* @__PURE__ */ S.createElement(
    JN,
    {
      basename: B,
      location: d.location,
      navigationType: d.historyAction,
      navigator: V,
      useTransitions: l
    },
    /* @__PURE__ */ S.createElement(
      QN,
      {
        routes: e.routes,
        manifest: e.manifest,
        future: e.future,
        state: d,
        isStatic: !1,
        onError: i
      }
    )
  ))))), null);
}
function Ly(e, a) {
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
var QN = S.memo(KN);
function KN({
  routes: e,
  manifest: a,
  future: i,
  state: l,
  isStatic: s,
  onError: u
}) {
  return DN(e, void 0, {
    manifest: a,
    state: l,
    isStatic: s,
    onError: u
  });
}
function WN(e) {
  return TN(e.context);
}
function JN({
  basename: e = "/",
  children: a = null,
  location: i,
  navigationType: l = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Qe(
    !ds(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = e.replace(/^\/*/, "/"), p = S.useMemo(
    () => ({
      basename: d,
      navigator: s,
      static: u,
      useTransitions: c,
      future: {}
    }),
    [d, s, u, c]
  );
  typeof i == "string" && (i = Ta(i));
  let {
    pathname: m = "/",
    search: y = "",
    hash: g = "",
    state: b = null,
    key: x = "default",
    mask: _
  } = i, E = S.useMemo(() => {
    let N = da(m, d);
    return N == null ? null : {
      location: {
        pathname: N,
        search: y,
        hash: g,
        state: b,
        key: x,
        mask: _
      },
      navigationType: l
    };
  }, [d, m, y, g, b, x, l, _]);
  return It(
    E != null,
    `<Router basename="${d}"> is not able to match the URL "${m}${y}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), E == null ? null : /* @__PURE__ */ S.createElement(ha.Provider, { value: p }, /* @__PURE__ */ S.createElement(jc.Provider, { children: a, value: E }));
}
var rc = "get", ic = "application/x-www-form-urlencoded";
function zc(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function eC(e) {
  return zc(e) && e.tagName.toLowerCase() === "button";
}
function tC(e) {
  return zc(e) && e.tagName.toLowerCase() === "form";
}
function nC(e) {
  return zc(e) && e.tagName.toLowerCase() === "input";
}
function aC(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function rC(e, a) {
  return e.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !aC(e);
}
var ju = null;
function iC() {
  if (ju === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), ju = !1;
    } catch {
      ju = !0;
    }
  return ju;
}
var lC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function hh(e) {
  return e != null && !lC.has(e) ? (It(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ic}"`
  ), null) : e;
}
function oC(e, a) {
  let i, l, s, u, c;
  if (tC(e)) {
    let d = e.getAttribute("action");
    l = d ? da(d, a) : null, i = e.getAttribute("method") || rc, s = hh(e.getAttribute("enctype")) || ic, u = new FormData(e);
  } else if (eC(e) || nC(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (l = p ? da(p, a) : null, i = e.getAttribute("formmethod") || d.getAttribute("method") || rc, s = hh(e.getAttribute("formenctype")) || hh(d.getAttribute("enctype")) || ic, u = new FormData(d, e), !iC()) {
      let { name: m, type: y, value: g } = e;
      if (y === "image") {
        let b = m ? `${m}.` : "";
        u.append(`${b}x`, "0"), u.append(`${b}y`, "0");
      } else m && u.append(m, g);
    }
  } else {
    if (zc(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = rc, l = null, s = ic, c = e;
  }
  return u && s === "text/plain" && (c = u, u = void 0), { action: l, method: i.toLowerCase(), encType: s, formData: u, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Am(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function _1(e, a, i, l) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return i ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${l}` : s.pathname = `${s.pathname}.${l}` : s.pathname === "/" ? s.pathname = `_root.${l}` : a && da(s.pathname, a) === "/" ? s.pathname = `${mc(a)}/_root.${l}` : s.pathname = `${mc(s.pathname)}.${l}`, s;
}
async function sC(e, a) {
  if (e.id in a)
    return a[e.id];
  try {
    let i = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return a[e.id] = i, i;
  } catch (i) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(i), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function uC(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function cC(e, a, i) {
  let l = await Promise.all(
    e.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await sC(u, i);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return mC(
    l.flat(1).filter(uC).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function ky(e, a, i, l, s, u) {
  let c = (p, m) => i[m] ? p.route.id !== i[m].route.id : !0, d = (p, m) => (
    // param change, /users/123 -> /users/456
    i[m].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[m].route.path?.endsWith("*") && i[m].params["*"] !== p.params["*"]
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
        currentParams: i[0]?.params || {},
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
function fC(e, a, { includeHydrateFallback: i } = {}) {
  return dC(
    e.map((l) => {
      let s = a.routes[l.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), i && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function dC(e) {
  return [...new Set(e)];
}
function hC(e) {
  let a = {}, i = Object.keys(e).sort();
  for (let l of i)
    a[l] = e[l];
  return a;
}
function mC(e, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), e.reduce((l, s) => {
    let u = JSON.stringify(hC(s));
    return i.has(u) || (i.add(u), l.push({ key: u, link: s })), l;
  }, []);
}
function jm() {
  let e = S.useContext(Li);
  return Am(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function pC() {
  let e = S.useContext(fs);
  return Am(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var Om = S.createContext(void 0);
Om.displayName = "FrameworkContext";
function zm() {
  let e = S.useContext(Om);
  return Am(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function gC(e, a) {
  let i = S.useContext(Om), [l, s] = S.useState(!1), [u, c] = S.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: g } = a, b = S.useRef(null);
  S.useEffect(() => {
    if (e === "render" && c(!0), e === "viewport") {
      let E = (R) => {
        R.forEach((j) => {
          c(j.isIntersecting);
        });
      }, N = new IntersectionObserver(E, { threshold: 0.5 });
      return b.current && N.observe(b.current), () => {
        N.disconnect();
      };
    }
  }, [e]), S.useEffect(() => {
    if (l) {
      let E = setTimeout(() => {
        c(!0);
      }, 100);
      return () => {
        clearTimeout(E);
      };
    }
  }, [l]);
  let x = () => {
    s(!0);
  }, _ = () => {
    s(!1), c(!1);
  };
  return i ? e !== "intent" ? [u, b, {}] : [
    u,
    b,
    {
      onFocus: zo(d, x),
      onBlur: zo(p, _),
      onMouseEnter: zo(m, x),
      onMouseLeave: zo(y, _),
      onTouchStart: zo(g, x)
    }
  ] : [!1, b, {}];
}
function zo(e, a) {
  return (i) => {
    e && e(i), i.defaultPrevented || a(i);
  };
}
function vC({ page: e, ...a }) {
  let i = m1(), { router: l } = jm(), s = S.useMemo(
    () => Xx(l.routes, e, l.basename),
    [l.routes, e, l.basename]
  );
  return s ? i ? /* @__PURE__ */ S.createElement(bC, { page: e, matches: s, ...a }) : /* @__PURE__ */ S.createElement(xC, { page: e, matches: s, ...a }) : null;
}
function yC(e) {
  let { manifest: a, routeModules: i } = zm(), [l, s] = S.useState([]);
  return S.useEffect(() => {
    let u = !1;
    return cC(e, a, i).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [e, a, i]), l;
}
function bC({
  page: e,
  matches: a,
  ...i
}) {
  let l = br(), { future: s } = zm(), { basename: u } = jm(), c = S.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let d = _1(
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
  return /* @__PURE__ */ S.createElement(S.Fragment, null, c.map((d) => /* @__PURE__ */ S.createElement("link", { key: d, rel: "prefetch", as: "fetch", href: d, ...i })));
}
function xC({
  page: e,
  matches: a,
  ...i
}) {
  let l = br(), { future: s, manifest: u, routeModules: c } = zm(), { basename: d } = jm(), { loaderData: p, matches: m } = pC(), y = S.useMemo(
    () => ky(
      e,
      a,
      m,
      u,
      l,
      "data"
    ),
    [e, a, m, u, l]
  ), g = S.useMemo(
    () => ky(
      e,
      a,
      m,
      u,
      l,
      "assets"
    ),
    [e, a, m, u, l]
  ), b = S.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let E = /* @__PURE__ */ new Set(), N = !1;
    if (a.forEach((j) => {
      let C = u.routes[j.route.id];
      !C || !C.hasLoader || (!y.some((O) => O.route.id === j.route.id) && j.route.id in p && c[j.route.id]?.shouldRevalidate || C.hasClientLoader ? N = !0 : E.add(j.route.id));
    }), E.size === 0)
      return [];
    let R = _1(
      e,
      d,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return N && E.size > 0 && R.searchParams.set(
      "_routes",
      a.filter((j) => E.has(j.route.id)).map((j) => j.route.id).join(",")
    ), [R.pathname + R.search];
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
  ]), x = S.useMemo(
    () => fC(g, u),
    [g, u]
  ), _ = yC(g);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, b.map((E) => /* @__PURE__ */ S.createElement("link", { key: E, rel: "prefetch", as: "fetch", href: E, ...i })), x.map((E) => /* @__PURE__ */ S.createElement("link", { key: E, rel: "modulepreload", href: E, ...i })), _.map(({ key: E, link: N }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ S.createElement(
      "link",
      {
        key: E,
        nonce: i.nonce,
        ...N,
        crossOrigin: N.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function wC(...e) {
  return (a) => {
    e.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var _C = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  _C && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var S1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, E1 = S.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: l = "none",
    relative: s,
    reloadDocument: u,
    replace: c,
    mask: d,
    state: p,
    target: m,
    to: y,
    preventScrollReset: g,
    viewTransition: b,
    defaultShouldRevalidate: x,
    ..._
  }, E) {
    let { basename: N, navigator: R, useTransitions: j } = S.useContext(ha), C = typeof y == "string" && S1.test(y), O = Jx(y, N);
    y = O.to;
    let V = EN(y, { relative: s }), B = br(), U = null;
    if (d) {
      let Y = Dc(
        d,
        [],
        B.mask ? B.mask.pathname : "/",
        !0
      );
      N !== "/" && (Y.pathname = Y.pathname === "/" ? N : fa([N, Y.pathname])), U = R.createHref(Y);
    }
    let [D, H, J] = gC(
      l,
      _
    ), I = CC(y, {
      replace: c,
      mask: d,
      state: p,
      target: m,
      preventScrollReset: g,
      relative: s,
      viewTransition: b,
      defaultShouldRevalidate: x,
      useTransitions: j
    });
    function Q(Y) {
      a && a(Y), Y.defaultPrevented || I(Y);
    }
    let ae = !(O.isExternal || u), L = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ S.createElement(
        "a",
        {
          ..._,
          ...J,
          href: (ae ? U : void 0) || O.absoluteURL || V,
          onClick: ae ? Q : a,
          ref: wC(E, H),
          target: m,
          "data-discover": !C && i === "render" ? "true" : void 0
        }
      )
    );
    return D && !C ? /* @__PURE__ */ S.createElement(S.Fragment, null, L, /* @__PURE__ */ S.createElement(vC, { page: V })) : L;
  }
);
E1.displayName = "Link";
var SC = S.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: l = "",
    end: s = !1,
    style: u,
    to: c,
    viewTransition: d,
    children: p,
    ...m
  }, y) {
    let g = hs(c, { relative: m.relative }), b = br(), x = S.useContext(fs), { navigator: _, basename: E } = S.useContext(ha), N = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    AC(g) && d === !0, R = _.encodeLocation ? _.encodeLocation(g).pathname : g.pathname, j = b.pathname, C = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    i || (j = j.toLowerCase(), C = C ? C.toLowerCase() : null, R = R.toLowerCase()), C && E && (C = da(C, E) || C);
    const O = R !== "/" && R.endsWith("/") ? R.length - 1 : R.length;
    let V = j === R || !s && j.startsWith(R) && j.charAt(O) === "/", B = C != null && (C === R || !s && C.startsWith(R) && C.charAt(R.length) === "/"), U = {
      isActive: V,
      isPending: B,
      isTransitioning: N
    }, D = V ? a : void 0, H;
    typeof l == "function" ? H = l(U) : H = [
      l,
      V ? "active" : null,
      B ? "pending" : null,
      N ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let J = typeof u == "function" ? u(U) : u;
    return /* @__PURE__ */ S.createElement(
      E1,
      {
        ...m,
        "aria-current": D,
        className: H,
        ref: y,
        style: J,
        to: c,
        viewTransition: d
      },
      typeof p == "function" ? p(U) : p
    );
  }
);
SC.displayName = "NavLink";
var EC = S.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: l,
    replace: s,
    state: u,
    method: c = rc,
    action: d,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: g,
    defaultShouldRevalidate: b,
    ...x
  }, _) => {
    let { useTransitions: E } = S.useContext(ha), N = MC(), R = DC(d, { relative: m }), j = c.toLowerCase() === "get" ? "get" : "post", C = typeof d == "string" && S1.test(d), O = (V) => {
      if (p && p(V), V.defaultPrevented) return;
      V.preventDefault();
      let B = V.nativeEvent.submitter, U = B?.getAttribute("formmethod") || c, D = () => N(B || V.currentTarget, {
        fetcherKey: a,
        method: U,
        navigate: i,
        replace: s,
        state: u,
        relative: m,
        preventScrollReset: y,
        viewTransition: g,
        defaultShouldRevalidate: b
      });
      E && i !== !1 ? S.startTransition(() => D()) : D();
    };
    return /* @__PURE__ */ S.createElement(
      "form",
      {
        ref: _,
        method: j,
        action: R,
        onSubmit: l ? p : O,
        ...x,
        "data-discover": !C && e === "render" ? "true" : void 0
      }
    );
  }
);
EC.displayName = "Form";
function NC(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function N1(e) {
  let a = S.useContext(Li);
  return Qe(a, NC(e)), a;
}
function CC(e, {
  target: a,
  replace: i,
  mask: l,
  state: s,
  preventScrollReset: u,
  relative: c,
  viewTransition: d,
  defaultShouldRevalidate: p,
  useTransitions: m
} = {}) {
  let y = NN(), g = br(), b = hs(e, { relative: c });
  return S.useCallback(
    (x) => {
      if (rC(x, a)) {
        x.preventDefault();
        let _ = i !== void 0 ? i : Ga(g) === Ga(b), E = () => y(e, {
          replace: _,
          mask: l,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: d,
          defaultShouldRevalidate: p
        });
        m ? S.startTransition(() => E()) : E();
      }
    },
    [
      g,
      y,
      b,
      i,
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
var RC = 0, TC = () => `__${String(++RC)}__`;
function MC() {
  let { router: e } = N1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = S.useContext(ha), i = BN(), l = e.fetch, s = e.navigate;
  return S.useCallback(
    async (u, c = {}) => {
      let { action: d, method: p, encType: m, formData: y, body: g } = oC(
        u,
        a
      );
      if (c.navigate === !1) {
        let b = c.fetcherKey || TC();
        await l(b, i, c.action || d, {
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
          fromRouteId: i,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition
        });
    },
    [l, s, a, i]
  );
}
function DC(e, { relative: a } = {}) {
  let { basename: i } = S.useContext(ha), l = S.useContext(Ma);
  Qe(l, "useFormAction must be used inside a RouteContext");
  let [s] = l.matches.slice(-1), u = { ...hs(e || ".", { relative: a }) }, c = br();
  if (e == null) {
    u.search = c.search;
    let d = new URLSearchParams(u.search), p = d.getAll("index");
    if (p.some((y) => y === "")) {
      d.delete("index"), p.filter((g) => g).forEach((g) => d.append("index", g));
      let y = d.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (!e || e === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (u.pathname = u.pathname === "/" ? i : fa([i, u.pathname])), Ga(u);
}
function AC(e, { relative: a } = {}) {
  let i = S.useContext(Tm);
  Qe(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = N1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = hs(e, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let u = da(i.currentLocation.pathname, l) || i.currentLocation.pathname, c = da(i.nextLocation.pathname, l) || i.nextLocation.pathname;
  return hc(s.pathname, c) != null || hc(s.pathname, u) != null;
}
const Lm = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "flash3_fp4", label: "FlashAttention 3 FP4" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], jC = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], OC = [
  { value: "high", label: "High-noise SVI LoRA" },
  { value: "low", label: "Low-noise SVI LoRA" },
  { value: "off", label: "No SVI LoRA" }
], zC = [
  { value: "default", label: "Default (inductor)" },
  { value: "reduce-overhead", label: "Reduce-overhead (CUDA graphs)" },
  { value: "max-autotune", label: "Max-autotune (slow first build)" }
], km = {
  modelsDir: "",
  attentionBackend: "flash2",
  fp8Compute: "bf16",
  blocksToSwap: 40,
  interpolateMethod: "rife",
  interpolateFps: 48,
  fastParallel: !0,
  batchPromptEncode: !1,
  outputDir: "",
  baseModelFamilyId: "",
  ditHighPath: "",
  ditLowPath: "",
  sviLoraTier: "high"
};
class Lc extends Error {
  constructor(a, i, l, s) {
    super(l), this.status = a, this.category = i, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const kc = "/api/v1/extensions/nexus.video.svi2-pro";
async function xr(e, a) {
  const i = e.startsWith("http") ? e : `${kc}${e}`, l = await fetch(i, {
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
    throw new Lc(
      l.status,
      s?.category ?? "unknown",
      s?.message ?? l.statusText,
      s?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function LC(e, a, i) {
  const l = e.startsWith("http") ? e : `${kc}${e}`, s = new EventSource(l);
  return s.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, s.onerror = (u) => {
    i?.(u);
  }, () => s.close();
}
async function C1() {
  return xr("/presets");
}
async function kC() {
  const e = await xr("/settings");
  return { ...km, ...e };
}
async function pc(e) {
  return xr("/settings", {
    method: "PUT",
    body: JSON.stringify(e)
  });
}
var HC = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function Fn({ tone: e = "neutral", children: a, className: i }) {
  const l = [HC[e], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx("span", { className: l, children: a });
}
var BC = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, UC = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, VC = "_1h48t1v9";
function ua({
  variant: e = "primary",
  size: a = "md",
  type: i = "button",
  loading: l = !1,
  disabled: s,
  children: u,
  className: c,
  ...d
}) {
  const p = [BC[e], UC[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs(
    "button",
    {
      type: i,
      className: p,
      disabled: l || s,
      "aria-busy": l || void 0,
      ...d,
      children: [
        l ? /* @__PURE__ */ v.jsx("span", { className: VC, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
function Zt(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let a = "";
  if (Array.isArray(e))
    for (let i = 0, l; i < e.length; i++)
      (l = Zt(e[i])) !== "" && (a += (a && " ") + l);
  else
    for (let i in e)
      e[i] && (a += (a && " ") + i);
  return a;
}
var $C = { value: () => {
} };
function Hc() {
  for (var e = 0, a = arguments.length, i = {}, l; e < a; ++e) {
    if (!(l = arguments[e] + "") || l in i || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    i[l] = [];
  }
  return new lc(i);
}
function lc(e) {
  this._ = e;
}
function qC(e, a) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var l = "", s = i.indexOf(".");
    if (s >= 0 && (l = i.slice(s + 1), i = i.slice(0, s)), i && !a.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: l };
  });
}
lc.prototype = Hc.prototype = {
  constructor: lc,
  on: function(e, a) {
    var i = this._, l = qC(e + "", i), s, u = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (e = l[u]).type) && (s = IC(i[s], e.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (e = l[u]).type) i[s] = Hy(i[s], e.name, a);
      else if (a == null) for (s in i) i[s] = Hy(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, a = this._;
    for (var i in a) e[i] = a[i].slice();
    return new lc(e);
  },
  call: function(e, a) {
    if ((s = arguments.length - 2) > 0) for (var i = new Array(s), l = 0, s, u; l < s; ++l) i[l] = arguments[l + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (u = this._[e], l = 0, s = u.length; l < s; ++l) u[l].value.apply(a, i);
  },
  apply: function(e, a, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var l = this._[e], s = 0, u = l.length; s < u; ++s) l[s].value.apply(a, i);
  }
};
function IC(e, a) {
  for (var i = 0, l = e.length, s; i < l; ++i)
    if ((s = e[i]).name === a)
      return s.value;
}
function Hy(e, a, i) {
  for (var l = 0, s = e.length; l < s; ++l)
    if (e[l].name === a) {
      e[l] = $C, e = e.slice(0, l).concat(e.slice(l + 1));
      break;
    }
  return i != null && e.push({ name: a, value: i }), e;
}
var Fh = "http://www.w3.org/1999/xhtml";
const By = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Fh,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Bc(e) {
  var a = e += "", i = a.indexOf(":");
  return i >= 0 && (a = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), By.hasOwnProperty(a) ? { space: By[a], local: e } : e;
}
function YC(e) {
  return function() {
    var a = this.ownerDocument, i = this.namespaceURI;
    return i === Fh && a.documentElement.namespaceURI === Fh ? a.createElement(e) : a.createElementNS(i, e);
  };
}
function GC(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function R1(e) {
  var a = Bc(e);
  return (a.local ? GC : YC)(a);
}
function FC() {
}
function Hm(e) {
  return e == null ? FC : function() {
    return this.querySelector(e);
  };
}
function XC(e) {
  typeof e != "function" && (e = Hm(e));
  for (var a = this._groups, i = a.length, l = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], c = u.length, d = l[s] = new Array(c), p, m, y = 0; y < c; ++y)
      (p = u[y]) && (m = e.call(p, p.__data__, y, u)) && ("__data__" in p && (m.__data__ = p.__data__), d[y] = m);
  return new Pn(l, this._parents);
}
function PC(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ZC() {
  return [];
}
function T1(e) {
  return e == null ? ZC : function() {
    return this.querySelectorAll(e);
  };
}
function QC(e) {
  return function() {
    return PC(e.apply(this, arguments));
  };
}
function KC(e) {
  typeof e == "function" ? e = QC(e) : e = T1(e);
  for (var a = this._groups, i = a.length, l = [], s = [], u = 0; u < i; ++u)
    for (var c = a[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && (l.push(e.call(p, p.__data__, m, c)), s.push(p));
  return new Pn(l, s);
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
var WC = Array.prototype.find;
function JC(e) {
  return function() {
    return WC.call(this.children, e);
  };
}
function eR() {
  return this.firstElementChild;
}
function tR(e) {
  return this.select(e == null ? eR : JC(typeof e == "function" ? e : D1(e)));
}
var nR = Array.prototype.filter;
function aR() {
  return Array.from(this.children);
}
function rR(e) {
  return function() {
    return nR.call(this.children, e);
  };
}
function iR(e) {
  return this.selectAll(e == null ? aR : rR(typeof e == "function" ? e : D1(e)));
}
function lR(e) {
  typeof e != "function" && (e = M1(e));
  for (var a = this._groups, i = a.length, l = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new Pn(l, this._parents);
}
function A1(e) {
  return new Array(e.length);
}
function oR() {
  return new Pn(this._enter || this._groups.map(A1), this._parents);
}
function gc(e, a) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = a;
}
gc.prototype = {
  constructor: gc,
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
function sR(e) {
  return function() {
    return e;
  };
}
function uR(e, a, i, l, s, u) {
  for (var c = 0, d, p = a.length, m = u.length; c < m; ++c)
    (d = a[c]) ? (d.__data__ = u[c], l[c] = d) : i[c] = new gc(e, u[c]);
  for (; c < p; ++c)
    (d = a[c]) && (s[c] = d);
}
function cR(e, a, i, l, s, u, c) {
  var d, p, m = /* @__PURE__ */ new Map(), y = a.length, g = u.length, b = new Array(y), x;
  for (d = 0; d < y; ++d)
    (p = a[d]) && (b[d] = x = c.call(p, p.__data__, d, a) + "", m.has(x) ? s[d] = p : m.set(x, p));
  for (d = 0; d < g; ++d)
    x = c.call(e, u[d], d, u) + "", (p = m.get(x)) ? (l[d] = p, p.__data__ = u[d], m.delete(x)) : i[d] = new gc(e, u[d]);
  for (d = 0; d < y; ++d)
    (p = a[d]) && m.get(b[d]) === p && (s[d] = p);
}
function fR(e) {
  return e.__data__;
}
function dR(e, a) {
  if (!arguments.length) return Array.from(this, fR);
  var i = a ? cR : uR, l = this._parents, s = this._groups;
  typeof e != "function" && (e = sR(e));
  for (var u = s.length, c = new Array(u), d = new Array(u), p = new Array(u), m = 0; m < u; ++m) {
    var y = l[m], g = s[m], b = g.length, x = hR(e.call(y, y && y.__data__, m, l)), _ = x.length, E = d[m] = new Array(_), N = c[m] = new Array(_), R = p[m] = new Array(b);
    i(y, g, E, N, R, x, a);
    for (var j = 0, C = 0, O, V; j < _; ++j)
      if (O = E[j]) {
        for (j >= C && (C = j + 1); !(V = N[C]) && ++C < _; ) ;
        O._next = V || null;
      }
  }
  return c = new Pn(c, l), c._enter = d, c._exit = p, c;
}
function hR(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function mR() {
  return new Pn(this._exit || this._groups.map(A1), this._parents);
}
function pR(e, a, i) {
  var l = this.enter(), s = this, u = this.exit();
  return typeof e == "function" ? (l = e(l), l && (l = l.selection())) : l = l.append(e + ""), a != null && (s = a(s), s && (s = s.selection())), i == null ? u.remove() : i(u), l && s ? l.merge(s).order() : s;
}
function gR(e) {
  for (var a = e.selection ? e.selection() : e, i = this._groups, l = a._groups, s = i.length, u = l.length, c = Math.min(s, u), d = new Array(s), p = 0; p < c; ++p)
    for (var m = i[p], y = l[p], g = m.length, b = d[p] = new Array(g), x, _ = 0; _ < g; ++_)
      (x = m[_] || y[_]) && (b[_] = x);
  for (; p < s; ++p)
    d[p] = i[p];
  return new Pn(d, this._parents);
}
function vR() {
  for (var e = this._groups, a = -1, i = e.length; ++a < i; )
    for (var l = e[a], s = l.length - 1, u = l[s], c; --s >= 0; )
      (c = l[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function yR(e) {
  e || (e = bR);
  function a(g, b) {
    return g && b ? e(g.__data__, b.__data__) : !g - !b;
  }
  for (var i = this._groups, l = i.length, s = new Array(l), u = 0; u < l; ++u) {
    for (var c = i[u], d = c.length, p = s[u] = new Array(d), m, y = 0; y < d; ++y)
      (m = c[y]) && (p[y] = m);
    p.sort(a);
  }
  return new Pn(s, this._parents).order();
}
function bR(e, a) {
  return e < a ? -1 : e > a ? 1 : e >= a ? 0 : NaN;
}
function xR() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function wR() {
  return Array.from(this);
}
function _R() {
  for (var e = this._groups, a = 0, i = e.length; a < i; ++a)
    for (var l = e[a], s = 0, u = l.length; s < u; ++s) {
      var c = l[s];
      if (c) return c;
    }
  return null;
}
function SR() {
  let e = 0;
  for (const a of this) ++e;
  return e;
}
function ER() {
  return !this.node();
}
function NR(e) {
  for (var a = this._groups, i = 0, l = a.length; i < l; ++i)
    for (var s = a[i], u = 0, c = s.length, d; u < c; ++u)
      (d = s[u]) && e.call(d, d.__data__, u, s);
  return this;
}
function CR(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function RR(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function TR(e, a) {
  return function() {
    this.setAttribute(e, a);
  };
}
function MR(e, a) {
  return function() {
    this.setAttributeNS(e.space, e.local, a);
  };
}
function DR(e, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function AR(e, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function jR(e, a) {
  var i = Bc(e);
  if (arguments.length < 2) {
    var l = this.node();
    return i.local ? l.getAttributeNS(i.space, i.local) : l.getAttribute(i);
  }
  return this.each((a == null ? i.local ? RR : CR : typeof a == "function" ? i.local ? AR : DR : i.local ? MR : TR)(i, a));
}
function j1(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function OR(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function zR(e, a, i) {
  return function() {
    this.style.setProperty(e, a, i);
  };
}
function LR(e, a, i) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.style.removeProperty(e) : this.style.setProperty(e, l, i);
  };
}
function kR(e, a, i) {
  return arguments.length > 1 ? this.each((a == null ? OR : typeof a == "function" ? LR : zR)(e, a, i ?? "")) : Tl(this.node(), e);
}
function Tl(e, a) {
  return e.style.getPropertyValue(a) || j1(e).getComputedStyle(e, null).getPropertyValue(a);
}
function HR(e) {
  return function() {
    delete this[e];
  };
}
function BR(e, a) {
  return function() {
    this[e] = a;
  };
}
function UR(e, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function VR(e, a) {
  return arguments.length > 1 ? this.each((a == null ? HR : typeof a == "function" ? UR : BR)(e, a)) : this.node()[e];
}
function O1(e) {
  return e.trim().split(/^|\s+/);
}
function Bm(e) {
  return e.classList || new z1(e);
}
function z1(e) {
  this._node = e, this._names = O1(e.getAttribute("class") || "");
}
z1.prototype = {
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
  for (var i = Bm(e), l = -1, s = a.length; ++l < s; ) i.add(a[l]);
}
function k1(e, a) {
  for (var i = Bm(e), l = -1, s = a.length; ++l < s; ) i.remove(a[l]);
}
function $R(e) {
  return function() {
    L1(this, e);
  };
}
function qR(e) {
  return function() {
    k1(this, e);
  };
}
function IR(e, a) {
  return function() {
    (a.apply(this, arguments) ? L1 : k1)(this, e);
  };
}
function YR(e, a) {
  var i = O1(e + "");
  if (arguments.length < 2) {
    for (var l = Bm(this.node()), s = -1, u = i.length; ++s < u; ) if (!l.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? IR : a ? $R : qR)(i, a));
}
function GR() {
  this.textContent = "";
}
function FR(e) {
  return function() {
    this.textContent = e;
  };
}
function XR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function PR(e) {
  return arguments.length ? this.each(e == null ? GR : (typeof e == "function" ? XR : FR)(e)) : this.node().textContent;
}
function ZR() {
  this.innerHTML = "";
}
function QR(e) {
  return function() {
    this.innerHTML = e;
  };
}
function KR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function WR(e) {
  return arguments.length ? this.each(e == null ? ZR : (typeof e == "function" ? KR : QR)(e)) : this.node().innerHTML;
}
function JR() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function eT() {
  return this.each(JR);
}
function tT() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function nT() {
  return this.each(tT);
}
function aT(e) {
  var a = typeof e == "function" ? e : R1(e);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function rT() {
  return null;
}
function iT(e, a) {
  var i = typeof e == "function" ? e : R1(e), l = a == null ? rT : typeof a == "function" ? a : Hm(a);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function lT() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function oT() {
  return this.each(lT);
}
function sT() {
  var e = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function uT() {
  var e = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function cT(e) {
  return this.select(e ? uT : sT);
}
function fT(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function dT(e) {
  return function(a) {
    e.call(this, a, this.__data__);
  };
}
function hT(e) {
  return e.trim().split(/^|\s+/).map(function(a) {
    var i = "", l = a.indexOf(".");
    return l >= 0 && (i = a.slice(l + 1), a = a.slice(0, l)), { type: a, name: i };
  });
}
function mT(e) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var i = 0, l = -1, s = a.length, u; i < s; ++i)
        u = a[i], (!e.type || u.type === e.type) && u.name === e.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++l] = u;
      ++l ? a.length = l : delete this.__on;
    }
  };
}
function pT(e, a, i) {
  return function() {
    var l = this.__on, s, u = dT(a);
    if (l) {
      for (var c = 0, d = l.length; c < d; ++c)
        if ((s = l[c]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = u, s.options = i), s.value = a;
          return;
        }
    }
    this.addEventListener(e.type, u, i), s = { type: e.type, name: e.name, value: a, listener: u, options: i }, l ? l.push(s) : this.__on = [s];
  };
}
function gT(e, a, i) {
  var l = hT(e + ""), s, u = l.length, c;
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
  for (d = a ? pT : mT, s = 0; s < u; ++s) this.each(d(l[s], a, i));
  return this;
}
function H1(e, a, i) {
  var l = j1(e), s = l.CustomEvent;
  typeof s == "function" ? s = new s(a, i) : (s = l.document.createEvent("Event"), i ? (s.initEvent(a, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(a, !1, !1)), e.dispatchEvent(s);
}
function vT(e, a) {
  return function() {
    return H1(this, e, a);
  };
}
function yT(e, a) {
  return function() {
    return H1(this, e, a.apply(this, arguments));
  };
}
function bT(e, a) {
  return this.each((typeof a == "function" ? yT : vT)(e, a));
}
function* xT() {
  for (var e = this._groups, a = 0, i = e.length; a < i; ++a)
    for (var l = e[a], s = 0, u = l.length, c; s < u; ++s)
      (c = l[s]) && (yield c);
}
var B1 = [null];
function Pn(e, a) {
  this._groups = e, this._parents = a;
}
function ms() {
  return new Pn([[document.documentElement]], B1);
}
function wT() {
  return this;
}
Pn.prototype = ms.prototype = {
  constructor: Pn,
  select: XC,
  selectAll: KC,
  selectChild: tR,
  selectChildren: iR,
  filter: lR,
  data: dR,
  enter: oR,
  exit: mR,
  join: pR,
  merge: gR,
  selection: wT,
  order: vR,
  sort: yR,
  call: xR,
  nodes: wR,
  node: _R,
  size: SR,
  empty: ER,
  each: NR,
  attr: jR,
  style: kR,
  property: VR,
  classed: YR,
  text: PR,
  html: WR,
  raise: eT,
  lower: nT,
  append: aT,
  insert: iT,
  remove: oT,
  clone: cT,
  datum: fT,
  on: gT,
  dispatch: bT,
  [Symbol.iterator]: xT
};
function Xn(e) {
  return typeof e == "string" ? new Pn([[document.querySelector(e)]], [document.documentElement]) : new Pn([[e]], B1);
}
function _T(e) {
  let a;
  for (; a = e.sourceEvent; ) e = a;
  return e;
}
function Sa(e, a) {
  if (e = _T(e), a === void 0 && (a = e.currentTarget), a) {
    var i = a.ownerSVGElement || a;
    if (i.createSVGPoint) {
      var l = i.createSVGPoint();
      return l.x = e.clientX, l.y = e.clientY, l = l.matrixTransform(a.getScreenCTM().inverse()), [l.x, l.y];
    }
    if (a.getBoundingClientRect) {
      var s = a.getBoundingClientRect();
      return [e.clientX - s.left - a.clientLeft, e.clientY - s.top - a.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const ST = { passive: !1 }, Qo = { capture: !0, passive: !1 };
function mh(e) {
  e.stopImmediatePropagation();
}
function Nl(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function U1(e) {
  var a = e.document.documentElement, i = Xn(e).on("dragstart.drag", Nl, Qo);
  "onselectstart" in a ? i.on("selectstart.drag", Nl, Qo) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function V1(e, a) {
  var i = e.document.documentElement, l = Xn(e).on("dragstart.drag", null);
  a && (l.on("click.drag", Nl, Qo), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in i ? l.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
const Ou = (e) => () => e;
function Xh(e, {
  sourceEvent: a,
  subject: i,
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
    subject: { value: i, enumerable: !0, configurable: !0 },
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
Xh.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function ET(e) {
  return !e.ctrlKey && !e.button;
}
function NT() {
  return this.parentNode;
}
function CT(e, a) {
  return a ?? { x: e.x, y: e.y };
}
function RT() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function $1() {
  var e = ET, a = NT, i = CT, l = RT, s = {}, u = Hc("start", "drag", "end"), c = 0, d, p, m, y, g = 0;
  function b(O) {
    O.on("mousedown.drag", x).filter(l).on("touchstart.drag", N).on("touchmove.drag", R, ST).on("touchend.drag touchcancel.drag", j).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(O, V) {
    if (!(y || !e.call(this, O, V))) {
      var B = C(this, a.call(this, O, V), O, V, "mouse");
      B && (Xn(O.view).on("mousemove.drag", _, Qo).on("mouseup.drag", E, Qo), U1(O.view), mh(O), m = !1, d = O.clientX, p = O.clientY, B("start", O));
    }
  }
  function _(O) {
    if (Nl(O), !m) {
      var V = O.clientX - d, B = O.clientY - p;
      m = V * V + B * B > g;
    }
    s.mouse("drag", O);
  }
  function E(O) {
    Xn(O.view).on("mousemove.drag mouseup.drag", null), V1(O.view, m), Nl(O), s.mouse("end", O);
  }
  function N(O, V) {
    if (e.call(this, O, V)) {
      var B = O.changedTouches, U = a.call(this, O, V), D = B.length, H, J;
      for (H = 0; H < D; ++H)
        (J = C(this, U, O, V, B[H].identifier, B[H])) && (mh(O), J("start", O, B[H]));
    }
  }
  function R(O) {
    var V = O.changedTouches, B = V.length, U, D;
    for (U = 0; U < B; ++U)
      (D = s[V[U].identifier]) && (Nl(O), D("drag", O, V[U]));
  }
  function j(O) {
    var V = O.changedTouches, B = V.length, U, D;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), U = 0; U < B; ++U)
      (D = s[V[U].identifier]) && (mh(O), D("end", O, V[U]));
  }
  function C(O, V, B, U, D, H) {
    var J = u.copy(), I = Sa(H || B, V), Q, ae, L;
    if ((L = i.call(O, new Xh("beforestart", {
      sourceEvent: B,
      target: b,
      identifier: D,
      active: c,
      x: I[0],
      y: I[1],
      dx: 0,
      dy: 0,
      dispatch: J
    }), U)) != null)
      return Q = L.x - I[0] || 0, ae = L.y - I[1] || 0, function Y(T, z, F) {
        var X = I, ne;
        switch (T) {
          case "start":
            s[D] = Y, ne = c++;
            break;
          case "end":
            delete s[D], --c;
          // falls through
          case "drag":
            I = Sa(F || z, V), ne = c;
            break;
        }
        J.call(
          T,
          O,
          new Xh(T, {
            sourceEvent: z,
            subject: L,
            target: b,
            identifier: D,
            active: ne,
            x: I[0] + Q,
            y: I[1] + ae,
            dx: I[0] - X[0],
            dy: I[1] - X[1],
            dispatch: J
          }),
          U
        );
      };
  }
  return b.filter = function(O) {
    return arguments.length ? (e = typeof O == "function" ? O : Ou(!!O), b) : e;
  }, b.container = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : Ou(O), b) : a;
  }, b.subject = function(O) {
    return arguments.length ? (i = typeof O == "function" ? O : Ou(O), b) : i;
  }, b.touchable = function(O) {
    return arguments.length ? (l = typeof O == "function" ? O : Ou(!!O), b) : l;
  }, b.on = function() {
    var O = u.on.apply(u, arguments);
    return O === u ? b : O;
  }, b.clickDistance = function(O) {
    return arguments.length ? (g = (O = +O) * O, b) : Math.sqrt(g);
  }, b;
}
function Um(e, a, i) {
  e.prototype = a.prototype = i, i.constructor = e;
}
function q1(e, a) {
  var i = Object.create(e.prototype);
  for (var l in a) i[l] = a[l];
  return i;
}
function ps() {
}
var Ko = 0.7, vc = 1 / Ko, Cl = "\\s*([+-]?\\d+)\\s*", Wo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ia = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", TT = /^#([0-9a-f]{3,8})$/, MT = new RegExp(`^rgb\\(${Cl},${Cl},${Cl}\\)$`), DT = new RegExp(`^rgb\\(${Ia},${Ia},${Ia}\\)$`), AT = new RegExp(`^rgba\\(${Cl},${Cl},${Cl},${Wo}\\)$`), jT = new RegExp(`^rgba\\(${Ia},${Ia},${Ia},${Wo}\\)$`), OT = new RegExp(`^hsl\\(${Wo},${Ia},${Ia}\\)$`), zT = new RegExp(`^hsla\\(${Wo},${Ia},${Ia},${Wo}\\)$`), Uy = {
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
Um(ps, Ti, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Vy,
  // Deprecated! Use color.formatHex.
  formatHex: Vy,
  formatHex8: LT,
  formatHsl: kT,
  formatRgb: $y,
  toString: $y
});
function Vy() {
  return this.rgb().formatHex();
}
function LT() {
  return this.rgb().formatHex8();
}
function kT() {
  return I1(this).formatHsl();
}
function $y() {
  return this.rgb().formatRgb();
}
function Ti(e) {
  var a, i;
  return e = (e + "").trim().toLowerCase(), (a = TT.exec(e)) ? (i = a[1].length, a = parseInt(a[1], 16), i === 6 ? qy(a) : i === 3 ? new On(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : i === 8 ? zu(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : i === 4 ? zu(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = MT.exec(e)) ? new On(a[1], a[2], a[3], 1) : (a = DT.exec(e)) ? new On(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = AT.exec(e)) ? zu(a[1], a[2], a[3], a[4]) : (a = jT.exec(e)) ? zu(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = OT.exec(e)) ? Gy(a[1], a[2] / 100, a[3] / 100, 1) : (a = zT.exec(e)) ? Gy(a[1], a[2] / 100, a[3] / 100, a[4]) : Uy.hasOwnProperty(e) ? qy(Uy[e]) : e === "transparent" ? new On(NaN, NaN, NaN, 0) : null;
}
function qy(e) {
  return new On(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function zu(e, a, i, l) {
  return l <= 0 && (e = a = i = NaN), new On(e, a, i, l);
}
function HT(e) {
  return e instanceof ps || (e = Ti(e)), e ? (e = e.rgb(), new On(e.r, e.g, e.b, e.opacity)) : new On();
}
function Ph(e, a, i, l) {
  return arguments.length === 1 ? HT(e) : new On(e, a, i, l ?? 1);
}
function On(e, a, i, l) {
  this.r = +e, this.g = +a, this.b = +i, this.opacity = +l;
}
Um(On, Ph, q1(ps, {
  brighter(e) {
    return e = e == null ? vc : Math.pow(vc, e), new On(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ko : Math.pow(Ko, e), new On(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new On(Ei(this.r), Ei(this.g), Ei(this.b), yc(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Iy,
  // Deprecated! Use color.formatHex.
  formatHex: Iy,
  formatHex8: BT,
  formatRgb: Yy,
  toString: Yy
}));
function Iy() {
  return `#${Si(this.r)}${Si(this.g)}${Si(this.b)}`;
}
function BT() {
  return `#${Si(this.r)}${Si(this.g)}${Si(this.b)}${Si((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Yy() {
  const e = yc(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ei(this.r)}, ${Ei(this.g)}, ${Ei(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function yc(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ei(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Si(e) {
  return e = Ei(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Gy(e, a, i, l) {
  return l <= 0 ? e = a = i = NaN : i <= 0 || i >= 1 ? e = a = NaN : a <= 0 && (e = NaN), new Ea(e, a, i, l);
}
function I1(e) {
  if (e instanceof Ea) return new Ea(e.h, e.s, e.l, e.opacity);
  if (e instanceof ps || (e = Ti(e)), !e) return new Ea();
  if (e instanceof Ea) return e;
  e = e.rgb();
  var a = e.r / 255, i = e.g / 255, l = e.b / 255, s = Math.min(a, i, l), u = Math.max(a, i, l), c = NaN, d = u - s, p = (u + s) / 2;
  return d ? (a === u ? c = (i - l) / d + (i < l) * 6 : i === u ? c = (l - a) / d + 2 : c = (a - i) / d + 4, d /= p < 0.5 ? u + s : 2 - u - s, c *= 60) : d = p > 0 && p < 1 ? 0 : c, new Ea(c, d, p, e.opacity);
}
function UT(e, a, i, l) {
  return arguments.length === 1 ? I1(e) : new Ea(e, a, i, l ?? 1);
}
function Ea(e, a, i, l) {
  this.h = +e, this.s = +a, this.l = +i, this.opacity = +l;
}
Um(Ea, UT, q1(ps, {
  brighter(e) {
    return e = e == null ? vc : Math.pow(vc, e), new Ea(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ko : Math.pow(Ko, e), new Ea(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, a = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, l = i + (i < 0.5 ? i : 1 - i) * a, s = 2 * i - l;
    return new On(
      ph(e >= 240 ? e - 240 : e + 120, s, l),
      ph(e, s, l),
      ph(e < 120 ? e + 240 : e - 120, s, l),
      this.opacity
    );
  },
  clamp() {
    return new Ea(Fy(this.h), Lu(this.s), Lu(this.l), yc(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = yc(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Fy(this.h)}, ${Lu(this.s) * 100}%, ${Lu(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Fy(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Lu(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ph(e, a, i) {
  return (e < 60 ? a + (i - a) * e / 60 : e < 180 ? i : e < 240 ? a + (i - a) * (240 - e) / 60 : a) * 255;
}
const Vm = (e) => () => e;
function VT(e, a) {
  return function(i) {
    return e + i * a;
  };
}
function $T(e, a, i) {
  return e = Math.pow(e, i), a = Math.pow(a, i) - e, i = 1 / i, function(l) {
    return Math.pow(e + l * a, i);
  };
}
function qT(e) {
  return (e = +e) == 1 ? Y1 : function(a, i) {
    return i - a ? $T(a, i, e) : Vm(isNaN(a) ? i : a);
  };
}
function Y1(e, a) {
  var i = a - e;
  return i ? VT(e, i) : Vm(isNaN(e) ? a : e);
}
const bc = (function e(a) {
  var i = qT(a);
  function l(s, u) {
    var c = i((s = Ph(s)).r, (u = Ph(u)).r), d = i(s.g, u.g), p = i(s.b, u.b), m = Y1(s.opacity, u.opacity);
    return function(y) {
      return s.r = c(y), s.g = d(y), s.b = p(y), s.opacity = m(y), s + "";
    };
  }
  return l.gamma = e, l;
})(1);
function IT(e, a) {
  a || (a = []);
  var i = e ? Math.min(a.length, e.length) : 0, l = a.slice(), s;
  return function(u) {
    for (s = 0; s < i; ++s) l[s] = e[s] * (1 - u) + a[s] * u;
    return l;
  };
}
function YT(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function GT(e, a) {
  var i = a ? a.length : 0, l = e ? Math.min(i, e.length) : 0, s = new Array(l), u = new Array(i), c;
  for (c = 0; c < l; ++c) s[c] = Go(e[c], a[c]);
  for (; c < i; ++c) u[c] = a[c];
  return function(d) {
    for (c = 0; c < l; ++c) u[c] = s[c](d);
    return u;
  };
}
function FT(e, a) {
  var i = /* @__PURE__ */ new Date();
  return e = +e, a = +a, function(l) {
    return i.setTime(e * (1 - l) + a * l), i;
  };
}
function $a(e, a) {
  return e = +e, a = +a, function(i) {
    return e * (1 - i) + a * i;
  };
}
function XT(e, a) {
  var i = {}, l = {}, s;
  (e === null || typeof e != "object") && (e = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in e ? i[s] = Go(e[s], a[s]) : l[s] = a[s];
  return function(u) {
    for (s in i) l[s] = i[s](u);
    return l;
  };
}
var Zh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, gh = new RegExp(Zh.source, "g");
function PT(e) {
  return function() {
    return e;
  };
}
function ZT(e) {
  return function(a) {
    return e(a) + "";
  };
}
function G1(e, a) {
  var i = Zh.lastIndex = gh.lastIndex = 0, l, s, u, c = -1, d = [], p = [];
  for (e = e + "", a = a + ""; (l = Zh.exec(e)) && (s = gh.exec(a)); )
    (u = s.index) > i && (u = a.slice(i, u), d[c] ? d[c] += u : d[++c] = u), (l = l[0]) === (s = s[0]) ? d[c] ? d[c] += s : d[++c] = s : (d[++c] = null, p.push({ i: c, x: $a(l, s) })), i = gh.lastIndex;
  return i < a.length && (u = a.slice(i), d[c] ? d[c] += u : d[++c] = u), d.length < 2 ? p[0] ? ZT(p[0].x) : PT(a) : (a = p.length, function(m) {
    for (var y = 0, g; y < a; ++y) d[(g = p[y]).i] = g.x(m);
    return d.join("");
  });
}
function Go(e, a) {
  var i = typeof a, l;
  return a == null || i === "boolean" ? Vm(a) : (i === "number" ? $a : i === "string" ? (l = Ti(a)) ? (a = l, bc) : G1 : a instanceof Ti ? bc : a instanceof Date ? FT : YT(a) ? IT : Array.isArray(a) ? GT : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? XT : $a)(e, a);
}
var Xy = 180 / Math.PI, Qh = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function F1(e, a, i, l, s, u) {
  var c, d, p;
  return (c = Math.sqrt(e * e + a * a)) && (e /= c, a /= c), (p = e * i + a * l) && (i -= e * p, l -= a * p), (d = Math.sqrt(i * i + l * l)) && (i /= d, l /= d, p /= d), e * l < a * i && (e = -e, a = -a, p = -p, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, e) * Xy,
    skewX: Math.atan(p) * Xy,
    scaleX: c,
    scaleY: d
  };
}
var ku;
function QT(e) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return a.isIdentity ? Qh : F1(a.a, a.b, a.c, a.d, a.e, a.f);
}
function KT(e) {
  return e == null || (ku || (ku = document.createElementNS("http://www.w3.org/2000/svg", "g")), ku.setAttribute("transform", e), !(e = ku.transform.baseVal.consolidate())) ? Qh : (e = e.matrix, F1(e.a, e.b, e.c, e.d, e.e, e.f));
}
function X1(e, a, i, l) {
  function s(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, y, g, b, x, _) {
    if (m !== g || y !== b) {
      var E = x.push("translate(", null, a, null, i);
      _.push({ i: E - 4, x: $a(m, g) }, { i: E - 2, x: $a(y, b) });
    } else (g || b) && x.push("translate(" + g + a + b + i);
  }
  function c(m, y, g, b) {
    m !== y ? (m - y > 180 ? y += 360 : y - m > 180 && (m += 360), b.push({ i: g.push(s(g) + "rotate(", null, l) - 2, x: $a(m, y) })) : y && g.push(s(g) + "rotate(" + y + l);
  }
  function d(m, y, g, b) {
    m !== y ? b.push({ i: g.push(s(g) + "skewX(", null, l) - 2, x: $a(m, y) }) : y && g.push(s(g) + "skewX(" + y + l);
  }
  function p(m, y, g, b, x, _) {
    if (m !== g || y !== b) {
      var E = x.push(s(x) + "scale(", null, ",", null, ")");
      _.push({ i: E - 4, x: $a(m, g) }, { i: E - 2, x: $a(y, b) });
    } else (g !== 1 || b !== 1) && x.push(s(x) + "scale(" + g + "," + b + ")");
  }
  return function(m, y) {
    var g = [], b = [];
    return m = e(m), y = e(y), u(m.translateX, m.translateY, y.translateX, y.translateY, g, b), c(m.rotate, y.rotate, g, b), d(m.skewX, y.skewX, g, b), p(m.scaleX, m.scaleY, y.scaleX, y.scaleY, g, b), m = y = null, function(x) {
      for (var _ = -1, E = b.length, N; ++_ < E; ) g[(N = b[_]).i] = N.x(x);
      return g.join("");
    };
  };
}
var WT = X1(QT, "px, ", "px)", "deg)"), JT = X1(KT, ", ", ")", ")"), eM = 1e-12;
function Py(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function tM(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function nM(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const oc = (function e(a, i, l) {
  function s(u, c) {
    var d = u[0], p = u[1], m = u[2], y = c[0], g = c[1], b = c[2], x = y - d, _ = g - p, E = x * x + _ * _, N, R;
    if (E < eM)
      R = Math.log(b / m) / a, N = function(U) {
        return [
          d + U * x,
          p + U * _,
          m * Math.exp(a * U * R)
        ];
      };
    else {
      var j = Math.sqrt(E), C = (b * b - m * m + l * E) / (2 * m * i * j), O = (b * b - m * m - l * E) / (2 * b * i * j), V = Math.log(Math.sqrt(C * C + 1) - C), B = Math.log(Math.sqrt(O * O + 1) - O);
      R = (B - V) / a, N = function(U) {
        var D = U * R, H = Py(V), J = m / (i * j) * (H * nM(a * D + V) - tM(V));
        return [
          d + J * x,
          p + J * _,
          m * H / Py(a * D + V)
        ];
      };
    }
    return N.duration = R * 1e3 * a / Math.SQRT2, N;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), d = c * c, p = d * d;
    return e(c, d, p);
  }, s;
})(Math.SQRT2, 2, 4);
var Ml = 0, qo = 0, Lo = 0, P1 = 1e3, xc, Io, wc = 0, Mi = 0, Uc = 0, Jo = typeof performance == "object" && performance.now ? performance : Date, Z1 = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function $m() {
  return Mi || (Z1(aM), Mi = Jo.now() + Uc);
}
function aM() {
  Mi = 0;
}
function _c() {
  this._call = this._time = this._next = null;
}
_c.prototype = Q1.prototype = {
  constructor: _c,
  restart: function(e, a, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? $m() : +i) + (a == null ? 0 : +a), !this._next && Io !== this && (Io ? Io._next = this : xc = this, Io = this), this._call = e, this._time = i, Kh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Kh());
  }
};
function Q1(e, a, i) {
  var l = new _c();
  return l.restart(e, a, i), l;
}
function rM() {
  $m(), ++Ml;
  for (var e = xc, a; e; )
    (a = Mi - e._time) >= 0 && e._call.call(void 0, a), e = e._next;
  --Ml;
}
function Zy() {
  Mi = (wc = Jo.now()) + Uc, Ml = qo = 0;
  try {
    rM();
  } finally {
    Ml = 0, lM(), Mi = 0;
  }
}
function iM() {
  var e = Jo.now(), a = e - wc;
  a > P1 && (Uc -= a, wc = e);
}
function lM() {
  for (var e, a = xc, i, l = 1 / 0; a; )
    a._call ? (l > a._time && (l = a._time), e = a, a = a._next) : (i = a._next, a._next = null, a = e ? e._next = i : xc = i);
  Io = e, Kh(l);
}
function Kh(e) {
  if (!Ml) {
    qo && (qo = clearTimeout(qo));
    var a = e - Mi;
    a > 24 ? (e < 1 / 0 && (qo = setTimeout(Zy, e - Jo.now() - Uc)), Lo && (Lo = clearInterval(Lo))) : (Lo || (wc = Jo.now(), Lo = setInterval(iM, P1)), Ml = 1, Z1(Zy));
  }
}
function Qy(e, a, i) {
  var l = new _c();
  return a = a == null ? 0 : +a, l.restart((s) => {
    l.stop(), e(s + a);
  }, a, i), l;
}
var oM = Hc("start", "end", "cancel", "interrupt"), sM = [], K1 = 0, Ky = 1, Wh = 2, sc = 3, Wy = 4, Jh = 5, uc = 6;
function Vc(e, a, i, l, s, u) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (i in c) return;
  uM(e, i, {
    name: a,
    index: l,
    // For context during callback.
    group: s,
    // For context during callback.
    on: oM,
    tween: sM,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: K1
  });
}
function qm(e, a) {
  var i = Da(e, a);
  if (i.state > K1) throw new Error("too late; already scheduled");
  return i;
}
function Fa(e, a) {
  var i = Da(e, a);
  if (i.state > sc) throw new Error("too late; already running");
  return i;
}
function Da(e, a) {
  var i = e.__transition;
  if (!i || !(i = i[a])) throw new Error("transition not found");
  return i;
}
function uM(e, a, i) {
  var l = e.__transition, s;
  l[a] = i, i.timer = Q1(u, 0, i.time);
  function u(m) {
    i.state = Ky, i.timer.restart(c, i.delay, i.time), i.delay <= m && c(m - i.delay);
  }
  function c(m) {
    var y, g, b, x;
    if (i.state !== Ky) return p();
    for (y in l)
      if (x = l[y], x.name === i.name) {
        if (x.state === sc) return Qy(c);
        x.state === Wy ? (x.state = uc, x.timer.stop(), x.on.call("interrupt", e, e.__data__, x.index, x.group), delete l[y]) : +y < a && (x.state = uc, x.timer.stop(), x.on.call("cancel", e, e.__data__, x.index, x.group), delete l[y]);
      }
    if (Qy(function() {
      i.state === sc && (i.state = Wy, i.timer.restart(d, i.delay, i.time), d(m));
    }), i.state = Wh, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Wh) {
      for (i.state = sc, s = new Array(b = i.tween.length), y = 0, g = -1; y < b; ++y)
        (x = i.tween[y].value.call(e, e.__data__, i.index, i.group)) && (s[++g] = x);
      s.length = g + 1;
    }
  }
  function d(m) {
    for (var y = m < i.duration ? i.ease.call(null, m / i.duration) : (i.timer.restart(p), i.state = Jh, 1), g = -1, b = s.length; ++g < b; )
      s[g].call(e, y);
    i.state === Jh && (i.on.call("end", e, e.__data__, i.index, i.group), p());
  }
  function p() {
    i.state = uc, i.timer.stop(), delete l[a];
    for (var m in l) return;
    delete e.__transition;
  }
}
function cc(e, a) {
  var i = e.__transition, l, s, u = !0, c;
  if (i) {
    a = a == null ? null : a + "";
    for (c in i) {
      if ((l = i[c]).name !== a) {
        u = !1;
        continue;
      }
      s = l.state > Wh && l.state < Jh, l.state = uc, l.timer.stop(), l.on.call(s ? "interrupt" : "cancel", e, e.__data__, l.index, l.group), delete i[c];
    }
    u && delete e.__transition;
  }
}
function cM(e) {
  return this.each(function() {
    cc(this, e);
  });
}
function fM(e, a) {
  var i, l;
  return function() {
    var s = Fa(this, e), u = s.tween;
    if (u !== i) {
      l = i = u;
      for (var c = 0, d = l.length; c < d; ++c)
        if (l[c].name === a) {
          l = l.slice(), l.splice(c, 1);
          break;
        }
    }
    s.tween = l;
  };
}
function dM(e, a, i) {
  var l, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var u = Fa(this, e), c = u.tween;
    if (c !== l) {
      s = (l = c).slice();
      for (var d = { name: a, value: i }, p = 0, m = s.length; p < m; ++p)
        if (s[p].name === a) {
          s[p] = d;
          break;
        }
      p === m && s.push(d);
    }
    u.tween = s;
  };
}
function hM(e, a) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var l = Da(this.node(), i).tween, s = 0, u = l.length, c; s < u; ++s)
      if ((c = l[s]).name === e)
        return c.value;
    return null;
  }
  return this.each((a == null ? fM : dM)(i, e, a));
}
function Im(e, a, i) {
  var l = e._id;
  return e.each(function() {
    var s = Fa(this, l);
    (s.value || (s.value = {}))[a] = i.apply(this, arguments);
  }), function(s) {
    return Da(s, l).value[a];
  };
}
function W1(e, a) {
  var i;
  return (typeof a == "number" ? $a : a instanceof Ti ? bc : (i = Ti(a)) ? (a = i, bc) : G1)(e, a);
}
function mM(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function pM(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function gM(e, a, i) {
  var l, s = i + "", u;
  return function() {
    var c = this.getAttribute(e);
    return c === s ? null : c === l ? u : u = a(l = c, i);
  };
}
function vM(e, a, i) {
  var l, s = i + "", u;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === s ? null : c === l ? u : u = a(l = c, i);
  };
}
function yM(e, a, i) {
  var l, s, u;
  return function() {
    var c, d = i(this), p;
    return d == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function bM(e, a, i) {
  var l, s, u;
  return function() {
    var c, d = i(this), p;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function xM(e, a) {
  var i = Bc(e), l = i === "transform" ? JT : W1;
  return this.attrTween(e, typeof a == "function" ? (i.local ? bM : yM)(i, l, Im(this, "attr." + e, a)) : a == null ? (i.local ? pM : mM)(i) : (i.local ? vM : gM)(i, l, a));
}
function wM(e, a) {
  return function(i) {
    this.setAttribute(e, a.call(this, i));
  };
}
function _M(e, a) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, a.call(this, i));
  };
}
function SM(e, a) {
  var i, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (i = (l = u) && _M(e, u)), i;
  }
  return s._value = a, s;
}
function EM(e, a) {
  var i, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (i = (l = u) && wM(e, u)), i;
  }
  return s._value = a, s;
}
function NM(e, a) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (a == null) return this.tween(i, null);
  if (typeof a != "function") throw new Error();
  var l = Bc(e);
  return this.tween(i, (l.local ? SM : EM)(l, a));
}
function CM(e, a) {
  return function() {
    qm(this, e).delay = +a.apply(this, arguments);
  };
}
function RM(e, a) {
  return a = +a, function() {
    qm(this, e).delay = a;
  };
}
function TM(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? CM : RM)(a, e)) : Da(this.node(), a).delay;
}
function MM(e, a) {
  return function() {
    Fa(this, e).duration = +a.apply(this, arguments);
  };
}
function DM(e, a) {
  return a = +a, function() {
    Fa(this, e).duration = a;
  };
}
function AM(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? MM : DM)(a, e)) : Da(this.node(), a).duration;
}
function jM(e, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    Fa(this, e).ease = a;
  };
}
function OM(e) {
  var a = this._id;
  return arguments.length ? this.each(jM(a, e)) : Da(this.node(), a).ease;
}
function zM(e, a) {
  return function() {
    var i = a.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Fa(this, e).ease = i;
  };
}
function LM(e) {
  if (typeof e != "function") throw new Error();
  return this.each(zM(this._id, e));
}
function kM(e) {
  typeof e != "function" && (e = M1(e));
  for (var a = this._groups, i = a.length, l = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new yr(l, this._parents, this._name, this._id);
}
function HM(e) {
  if (e._id !== this._id) throw new Error();
  for (var a = this._groups, i = e._groups, l = a.length, s = i.length, u = Math.min(l, s), c = new Array(l), d = 0; d < u; ++d)
    for (var p = a[d], m = i[d], y = p.length, g = c[d] = new Array(y), b, x = 0; x < y; ++x)
      (b = p[x] || m[x]) && (g[x] = b);
  for (; d < l; ++d)
    c[d] = a[d];
  return new yr(c, this._parents, this._name, this._id);
}
function BM(e) {
  return (e + "").trim().split(/^|\s+/).every(function(a) {
    var i = a.indexOf(".");
    return i >= 0 && (a = a.slice(0, i)), !a || a === "start";
  });
}
function UM(e, a, i) {
  var l, s, u = BM(a) ? qm : Fa;
  return function() {
    var c = u(this, e), d = c.on;
    d !== l && (s = (l = d).copy()).on(a, i), c.on = s;
  };
}
function VM(e, a) {
  var i = this._id;
  return arguments.length < 2 ? Da(this.node(), i).on.on(e) : this.each(UM(i, e, a));
}
function $M(e) {
  return function() {
    var a = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    a && a.removeChild(this);
  };
}
function qM() {
  return this.on("end.remove", $M(this._id));
}
function IM(e) {
  var a = this._name, i = this._id;
  typeof e != "function" && (e = Hm(e));
  for (var l = this._groups, s = l.length, u = new Array(s), c = 0; c < s; ++c)
    for (var d = l[c], p = d.length, m = u[c] = new Array(p), y, g, b = 0; b < p; ++b)
      (y = d[b]) && (g = e.call(y, y.__data__, b, d)) && ("__data__" in y && (g.__data__ = y.__data__), m[b] = g, Vc(m[b], a, i, b, m, Da(y, i)));
  return new yr(u, this._parents, a, i);
}
function YM(e) {
  var a = this._name, i = this._id;
  typeof e != "function" && (e = T1(e));
  for (var l = this._groups, s = l.length, u = [], c = [], d = 0; d < s; ++d)
    for (var p = l[d], m = p.length, y, g = 0; g < m; ++g)
      if (y = p[g]) {
        for (var b = e.call(y, y.__data__, g, p), x, _ = Da(y, i), E = 0, N = b.length; E < N; ++E)
          (x = b[E]) && Vc(x, a, i, E, b, _);
        u.push(b), c.push(y);
      }
  return new yr(u, c, a, i);
}
var GM = ms.prototype.constructor;
function FM() {
  return new GM(this._groups, this._parents);
}
function XM(e, a) {
  var i, l, s;
  return function() {
    var u = Tl(this, e), c = (this.style.removeProperty(e), Tl(this, e));
    return u === c ? null : u === i && c === l ? s : s = a(i = u, l = c);
  };
}
function J1(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function PM(e, a, i) {
  var l, s = i + "", u;
  return function() {
    var c = Tl(this, e);
    return c === s ? null : c === l ? u : u = a(l = c, i);
  };
}
function ZM(e, a, i) {
  var l, s, u;
  return function() {
    var c = Tl(this, e), d = i(this), p = d + "";
    return d == null && (p = d = (this.style.removeProperty(e), Tl(this, e))), c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d));
  };
}
function QM(e, a) {
  var i, l, s, u = "style." + a, c = "end." + u, d;
  return function() {
    var p = Fa(this, e), m = p.on, y = p.value[u] == null ? d || (d = J1(a)) : void 0;
    (m !== i || s !== y) && (l = (i = m).copy()).on(c, s = y), p.on = l;
  };
}
function KM(e, a, i) {
  var l = (e += "") == "transform" ? WT : W1;
  return a == null ? this.styleTween(e, XM(e, l)).on("end.style." + e, J1(e)) : typeof a == "function" ? this.styleTween(e, ZM(e, l, Im(this, "style." + e, a))).each(QM(this._id, e)) : this.styleTween(e, PM(e, l, a), i).on("end.style." + e, null);
}
function WM(e, a, i) {
  return function(l) {
    this.style.setProperty(e, a.call(this, l), i);
  };
}
function JM(e, a, i) {
  var l, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (l = (s = c) && WM(e, c, i)), l;
  }
  return u._value = a, u;
}
function eD(e, a, i) {
  var l = "style." + (e += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  return this.tween(l, JM(e, a, i ?? ""));
}
function tD(e) {
  return function() {
    this.textContent = e;
  };
}
function nD(e) {
  return function() {
    var a = e(this);
    this.textContent = a ?? "";
  };
}
function aD(e) {
  return this.tween("text", typeof e == "function" ? nD(Im(this, "text", e)) : tD(e == null ? "" : e + ""));
}
function rD(e) {
  return function(a) {
    this.textContent = e.call(this, a);
  };
}
function iD(e) {
  var a, i;
  function l() {
    var s = e.apply(this, arguments);
    return s !== i && (a = (i = s) && rD(s)), a;
  }
  return l._value = e, l;
}
function lD(e) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (e == null) return this.tween(a, null);
  if (typeof e != "function") throw new Error();
  return this.tween(a, iD(e));
}
function oD() {
  for (var e = this._name, a = this._id, i = ew(), l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      if (p = c[m]) {
        var y = Da(p, a);
        Vc(p, e, i, m, c, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new yr(l, this._parents, e, i);
}
function sD() {
  var e, a, i = this, l = i._id, s = i.size();
  return new Promise(function(u, c) {
    var d = { value: c }, p = { value: function() {
      --s === 0 && u();
    } };
    i.each(function() {
      var m = Fa(this, l), y = m.on;
      y !== e && (a = (e = y).copy(), a._.cancel.push(d), a._.interrupt.push(d), a._.end.push(p)), m.on = a;
    }), s === 0 && u();
  });
}
var uD = 0;
function yr(e, a, i, l) {
  this._groups = e, this._parents = a, this._name = i, this._id = l;
}
function ew() {
  return ++uD;
}
var fr = ms.prototype;
yr.prototype = {
  constructor: yr,
  select: IM,
  selectAll: YM,
  selectChild: fr.selectChild,
  selectChildren: fr.selectChildren,
  filter: kM,
  merge: HM,
  selection: FM,
  transition: oD,
  call: fr.call,
  nodes: fr.nodes,
  node: fr.node,
  size: fr.size,
  empty: fr.empty,
  each: fr.each,
  on: VM,
  attr: xM,
  attrTween: NM,
  style: KM,
  styleTween: eD,
  text: aD,
  textTween: lD,
  remove: qM,
  tween: hM,
  delay: TM,
  duration: AM,
  ease: OM,
  easeVarying: LM,
  end: sD,
  [Symbol.iterator]: fr[Symbol.iterator]
};
function cD(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var fD = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cD
};
function dD(e, a) {
  for (var i; !(i = e.__transition) || !(i = i[a]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${a} not found`);
  return i;
}
function hD(e) {
  var a, i;
  e instanceof yr ? (a = e._id, e = e._name) : (a = ew(), (i = fD).time = $m(), e = e == null ? null : e + "");
  for (var l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && Vc(p, e, a, m, c, i || dD(p, a));
  return new yr(l, this._parents, e, a);
}
ms.prototype.interrupt = cM;
ms.prototype.transition = hD;
const Hu = (e) => () => e;
function mD(e, {
  sourceEvent: a,
  target: i,
  transform: l,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: l, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function gr(e, a, i) {
  this.k = e, this.x = a, this.y = i;
}
gr.prototype = {
  constructor: gr,
  scale: function(e) {
    return e === 1 ? this : new gr(this.k * e, this.x, this.y);
  },
  translate: function(e, a) {
    return e === 0 & a === 0 ? this : new gr(this.k, this.x + this.k * e, this.y + this.k * a);
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
var $c = new gr(1, 0, 0);
tw.prototype = gr.prototype;
function tw(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return $c;
  return e.__zoom;
}
function vh(e) {
  e.stopImmediatePropagation();
}
function ko(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function pD(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function gD() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Jy() {
  return this.__zoom || $c;
}
function vD(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function yD() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function bD(e, a, i) {
  var l = e.invertX(a[0][0]) - i[0][0], s = e.invertX(a[1][0]) - i[1][0], u = e.invertY(a[0][1]) - i[0][1], c = e.invertY(a[1][1]) - i[1][1];
  return e.translate(
    s > l ? (l + s) / 2 : Math.min(0, l) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function nw() {
  var e = pD, a = gD, i = bD, l = vD, s = yD, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, p = oc, m = Hc("start", "zoom", "end"), y, g, b, x = 500, _ = 150, E = 0, N = 10;
  function R(L) {
    L.property("__zoom", Jy).on("wheel.zoom", D, { passive: !1 }).on("mousedown.zoom", H).on("dblclick.zoom", J).filter(s).on("touchstart.zoom", I).on("touchmove.zoom", Q).on("touchend.zoom touchcancel.zoom", ae).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  R.transform = function(L, Y, T, z) {
    var F = L.selection ? L.selection() : L;
    F.property("__zoom", Jy), L !== F ? V(L, Y, T, z) : F.interrupt().each(function() {
      B(this, arguments).event(z).start().zoom(null, typeof Y == "function" ? Y.apply(this, arguments) : Y).end();
    });
  }, R.scaleBy = function(L, Y, T, z) {
    R.scaleTo(L, function() {
      var F = this.__zoom.k, X = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return F * X;
    }, T, z);
  }, R.scaleTo = function(L, Y, T, z) {
    R.transform(L, function() {
      var F = a.apply(this, arguments), X = this.__zoom, ne = T == null ? O(F) : typeof T == "function" ? T.apply(this, arguments) : T, A = X.invert(ne), k = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return i(C(j(X, k), ne, A), F, c);
    }, T, z);
  }, R.translateBy = function(L, Y, T, z) {
    R.transform(L, function() {
      return i(this.__zoom.translate(
        typeof Y == "function" ? Y.apply(this, arguments) : Y,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), a.apply(this, arguments), c);
    }, null, z);
  }, R.translateTo = function(L, Y, T, z, F) {
    R.transform(L, function() {
      var X = a.apply(this, arguments), ne = this.__zoom, A = z == null ? O(X) : typeof z == "function" ? z.apply(this, arguments) : z;
      return i($c.translate(A[0], A[1]).scale(ne.k).translate(
        typeof Y == "function" ? -Y.apply(this, arguments) : -Y,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), X, c);
    }, z, F);
  };
  function j(L, Y) {
    return Y = Math.max(u[0], Math.min(u[1], Y)), Y === L.k ? L : new gr(Y, L.x, L.y);
  }
  function C(L, Y, T) {
    var z = Y[0] - T[0] * L.k, F = Y[1] - T[1] * L.k;
    return z === L.x && F === L.y ? L : new gr(L.k, z, F);
  }
  function O(L) {
    return [(+L[0][0] + +L[1][0]) / 2, (+L[0][1] + +L[1][1]) / 2];
  }
  function V(L, Y, T, z) {
    L.on("start.zoom", function() {
      B(this, arguments).event(z).start();
    }).on("interrupt.zoom end.zoom", function() {
      B(this, arguments).event(z).end();
    }).tween("zoom", function() {
      var F = this, X = arguments, ne = B(F, X).event(z), A = a.apply(F, X), k = T == null ? O(A) : typeof T == "function" ? T.apply(F, X) : T, G = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), ee = F.__zoom, se = typeof Y == "function" ? Y.apply(F, X) : Y, de = p(ee.invert(k).concat(G / ee.k), se.invert(k).concat(G / se.k));
      return function(he) {
        if (he === 1) he = se;
        else {
          var W = de(he), ve = G / W[2];
          he = new gr(ve, k[0] - W[0] * ve, k[1] - W[1] * ve);
        }
        ne.zoom(null, he);
      };
    });
  }
  function B(L, Y, T) {
    return !T && L.__zooming || new U(L, Y);
  }
  function U(L, Y) {
    this.that = L, this.args = Y, this.active = 0, this.sourceEvent = null, this.extent = a.apply(L, Y), this.taps = 0;
  }
  U.prototype = {
    event: function(L) {
      return L && (this.sourceEvent = L), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(L, Y) {
      return this.mouse && L !== "mouse" && (this.mouse[1] = Y.invert(this.mouse[0])), this.touch0 && L !== "touch" && (this.touch0[1] = Y.invert(this.touch0[0])), this.touch1 && L !== "touch" && (this.touch1[1] = Y.invert(this.touch1[0])), this.that.__zoom = Y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(L) {
      var Y = Xn(this.that).datum();
      m.call(
        L,
        this.that,
        new mD(L, {
          sourceEvent: this.sourceEvent,
          target: R,
          transform: this.that.__zoom,
          dispatch: m
        }),
        Y
      );
    }
  };
  function D(L, ...Y) {
    if (!e.apply(this, arguments)) return;
    var T = B(this, Y).event(L), z = this.__zoom, F = Math.max(u[0], Math.min(u[1], z.k * Math.pow(2, l.apply(this, arguments)))), X = Sa(L);
    if (T.wheel)
      (T.mouse[0][0] !== X[0] || T.mouse[0][1] !== X[1]) && (T.mouse[1] = z.invert(T.mouse[0] = X)), clearTimeout(T.wheel);
    else {
      if (z.k === F) return;
      T.mouse = [X, z.invert(X)], cc(this), T.start();
    }
    ko(L), T.wheel = setTimeout(ne, _), T.zoom("mouse", i(C(j(z, F), T.mouse[0], T.mouse[1]), T.extent, c));
    function ne() {
      T.wheel = null, T.end();
    }
  }
  function H(L, ...Y) {
    if (b || !e.apply(this, arguments)) return;
    var T = L.currentTarget, z = B(this, Y, !0).event(L), F = Xn(L.view).on("mousemove.zoom", k, !0).on("mouseup.zoom", G, !0), X = Sa(L, T), ne = L.clientX, A = L.clientY;
    U1(L.view), vh(L), z.mouse = [X, this.__zoom.invert(X)], cc(this), z.start();
    function k(ee) {
      if (ko(ee), !z.moved) {
        var se = ee.clientX - ne, de = ee.clientY - A;
        z.moved = se * se + de * de > E;
      }
      z.event(ee).zoom("mouse", i(C(z.that.__zoom, z.mouse[0] = Sa(ee, T), z.mouse[1]), z.extent, c));
    }
    function G(ee) {
      F.on("mousemove.zoom mouseup.zoom", null), V1(ee.view, z.moved), ko(ee), z.event(ee).end();
    }
  }
  function J(L, ...Y) {
    if (e.apply(this, arguments)) {
      var T = this.__zoom, z = Sa(L.changedTouches ? L.changedTouches[0] : L, this), F = T.invert(z), X = T.k * (L.shiftKey ? 0.5 : 2), ne = i(C(j(T, X), z, F), a.apply(this, Y), c);
      ko(L), d > 0 ? Xn(this).transition().duration(d).call(V, ne, z, L) : Xn(this).call(R.transform, ne, z, L);
    }
  }
  function I(L, ...Y) {
    if (e.apply(this, arguments)) {
      var T = L.touches, z = T.length, F = B(this, Y, L.changedTouches.length === z).event(L), X, ne, A, k;
      for (vh(L), ne = 0; ne < z; ++ne)
        A = T[ne], k = Sa(A, this), k = [k, this.__zoom.invert(k), A.identifier], F.touch0 ? !F.touch1 && F.touch0[2] !== k[2] && (F.touch1 = k, F.taps = 0) : (F.touch0 = k, X = !0, F.taps = 1 + !!y);
      y && (y = clearTimeout(y)), X && (F.taps < 2 && (g = k[0], y = setTimeout(function() {
        y = null;
      }, x)), cc(this), F.start());
    }
  }
  function Q(L, ...Y) {
    if (this.__zooming) {
      var T = B(this, Y).event(L), z = L.changedTouches, F = z.length, X, ne, A, k;
      for (ko(L), X = 0; X < F; ++X)
        ne = z[X], A = Sa(ne, this), T.touch0 && T.touch0[2] === ne.identifier ? T.touch0[0] = A : T.touch1 && T.touch1[2] === ne.identifier && (T.touch1[0] = A);
      if (ne = T.that.__zoom, T.touch1) {
        var G = T.touch0[0], ee = T.touch0[1], se = T.touch1[0], de = T.touch1[1], he = (he = se[0] - G[0]) * he + (he = se[1] - G[1]) * he, W = (W = de[0] - ee[0]) * W + (W = de[1] - ee[1]) * W;
        ne = j(ne, Math.sqrt(he / W)), A = [(G[0] + se[0]) / 2, (G[1] + se[1]) / 2], k = [(ee[0] + de[0]) / 2, (ee[1] + de[1]) / 2];
      } else if (T.touch0) A = T.touch0[0], k = T.touch0[1];
      else return;
      T.zoom("touch", i(C(ne, A, k), T.extent, c));
    }
  }
  function ae(L, ...Y) {
    if (this.__zooming) {
      var T = B(this, Y).event(L), z = L.changedTouches, F = z.length, X, ne;
      for (vh(L), b && clearTimeout(b), b = setTimeout(function() {
        b = null;
      }, x), X = 0; X < F; ++X)
        ne = z[X], T.touch0 && T.touch0[2] === ne.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === ne.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (ne = Sa(ne, this), Math.hypot(g[0] - ne[0], g[1] - ne[1]) < N)) {
        var A = Xn(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return R.wheelDelta = function(L) {
    return arguments.length ? (l = typeof L == "function" ? L : Hu(+L), R) : l;
  }, R.filter = function(L) {
    return arguments.length ? (e = typeof L == "function" ? L : Hu(!!L), R) : e;
  }, R.touchable = function(L) {
    return arguments.length ? (s = typeof L == "function" ? L : Hu(!!L), R) : s;
  }, R.extent = function(L) {
    return arguments.length ? (a = typeof L == "function" ? L : Hu([[+L[0][0], +L[0][1]], [+L[1][0], +L[1][1]]]), R) : a;
  }, R.scaleExtent = function(L) {
    return arguments.length ? (u[0] = +L[0], u[1] = +L[1], R) : [u[0], u[1]];
  }, R.translateExtent = function(L) {
    return arguments.length ? (c[0][0] = +L[0][0], c[1][0] = +L[1][0], c[0][1] = +L[0][1], c[1][1] = +L[1][1], R) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, R.constrain = function(L) {
    return arguments.length ? (i = L, R) : i;
  }, R.duration = function(L) {
    return arguments.length ? (d = +L, R) : d;
  }, R.interpolate = function(L) {
    return arguments.length ? (p = L, R) : p;
  }, R.on = function() {
    var L = m.on.apply(m, arguments);
    return L === m ? R : L;
  }, R.clickDistance = function(L) {
    return arguments.length ? (E = (L = +L) * L, R) : Math.sqrt(E);
  }, R.tapDistance = function(L) {
    return arguments.length ? (N = +L, R) : N;
  }, R;
}
const Ra = {
  error001: (e = "react") => `Seems like you have not used zustand provider as an ancestor. Help: https://${e}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (e) => `Node type "${e}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (e) => `The old edge with id=${e} does not exist.`,
  error009: (e) => `Marker type "${e}" doesn't exist.`,
  error008: (e, { id: a, sourceHandle: i, targetHandle: l }) => `Couldn't create edge for ${e} handle id: "${e === "source" ? i : l}", edge id: ${a}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (e) => `Edge type "${e}" not found. Using fallback type "default".`,
  error012: (e) => `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (e = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${e}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (e) => `Edge with id "${e}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, es = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], aw = ["Enter", " ", "Escape"], rw = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: e, x: a, y: i }) => `Moved selected node ${e}. New position, x: ${a}, y: ${i}`,
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
var Dl;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(Dl || (Dl = {}));
var Ni;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(Ni || (Ni = {}));
var ts;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(ts || (ts = {}));
const iw = {
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
var ei;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(ei || (ei = {}));
var Sc;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(Sc || (Sc = {}));
var ke;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(ke || (ke = {}));
const eb = {
  [ke.Left]: ke.Right,
  [ke.Right]: ke.Left,
  [ke.Top]: ke.Bottom,
  [ke.Bottom]: ke.Top
};
function lw(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const ow = (e) => "id" in e && "source" in e && "target" in e, xD = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), Ym = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), gs = (e, a = [0, 0]) => {
  const { width: i, height: l } = wr(e), s = e.origin ?? a, u = i * s[0], c = l * s[1];
  return {
    x: e.position.x - u,
    y: e.position.y - c
  };
}, wD = (e, a = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const i = e.reduce((l, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : Ym(s) ? s : a.nodeLookup.get(s.id));
    const d = c ? Ec(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return qc(l, d);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Ic(i);
}, vs = (e, a = {}) => {
  let i = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, l = !1;
  return e.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (i = qc(i, Ec(s)), l = !0);
  }), l ? Ic(i) : { x: 0, y: 0, width: 0, height: 0 };
}, Gm = (e, a, [i, l, s] = [0, 0, 1], u = !1, c = !1) => {
  const d = {
    ...Ul(a, [i, l, s]),
    width: a.width / s,
    height: a.height / s
  }, p = [];
  for (const m of e.values()) {
    const { measured: y, selectable: g = !0, hidden: b = !1 } = m;
    if (c && !g || b)
      continue;
    const x = y.width ?? m.width ?? m.initialWidth ?? null, _ = y.height ?? m.height ?? m.initialHeight ?? null, E = ns(d, jl(m)), N = (x ?? 0) * (_ ?? 0), R = u && E > 0;
    (!m.internals.handleBounds || R || E >= N || m.dragging) && p.push(m);
  }
  return p;
}, _D = (e, a) => {
  const i = /* @__PURE__ */ new Set();
  return e.forEach((l) => {
    i.add(l.id);
  }), a.filter((l) => i.has(l.source) || i.has(l.target));
};
function SD(e, a) {
  const i = /* @__PURE__ */ new Map(), l = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return e.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!l || l.has(s.id)) && i.set(s.id, s);
  }), i;
}
async function ED({ nodes: e, width: a, height: i, panZoom: l, minZoom: s, maxZoom: u }, c) {
  if (e.size === 0)
    return !0;
  const d = SD(e, c), p = vs(d), m = Xm(p, a, i, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await l.setViewport(m, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function sw({ nodeId: e, nextPosition: a, nodeLookup: i, nodeOrigin: l = [0, 0], nodeExtent: s, onError: u }) {
  const c = i.get(e), d = c.parentId ? i.get(c.parentId) : void 0, { x: p, y: m } = d ? d.internals.positionAbsolute : { x: 0, y: 0 }, y = c.origin ?? l;
  let g = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!d)
      u?.("005", Ra.error005());
    else {
      const x = d.measured.width, _ = d.measured.height;
      x && _ && (g = [
        [p, m],
        [p + x, m + _]
      ]);
    }
  else d && Ai(c.extent) && (g = [
    [c.extent[0][0] + p, c.extent[0][1] + m],
    [c.extent[1][0] + p, c.extent[1][1] + m]
  ]);
  const b = Ai(g) ? Di(a, g, c.measured) : a;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", Ra.error015()), {
    position: {
      x: b.x - p + (c.measured.width ?? 0) * y[0],
      y: b.y - m + (c.measured.height ?? 0) * y[1]
    },
    positionAbsolute: b
  };
}
async function ND({ nodesToRemove: e = [], edgesToRemove: a = [], nodes: i, edges: l, onBeforeDelete: s }) {
  const u = new Set(e.map((b) => b.id)), c = [];
  for (const b of i) {
    if (b.deletable === !1)
      continue;
    const x = u.has(b.id), _ = !x && b.parentId && c.find((E) => E.id === b.parentId);
    (x || _) && c.push(b);
  }
  const d = new Set(a.map((b) => b.id)), p = l.filter((b) => b.deletable !== !1), y = _D(c, p);
  for (const b of p)
    d.has(b.id) && !y.find((_) => _.id === b.id) && y.push(b);
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
const Al = (e, a = 0, i = 1) => Math.min(Math.max(e, a), i), Di = (e = { x: 0, y: 0 }, a, i) => ({
  x: Al(e.x, a[0][0], a[1][0] - (i?.width ?? 0)),
  y: Al(e.y, a[0][1], a[1][1] - (i?.height ?? 0))
});
function uw(e, a, i) {
  const { width: l, height: s } = wr(i), { x: u, y: c } = i.internals.positionAbsolute;
  return Di(e, [
    [u, c],
    [u + l, c + s]
  ], a);
}
const tb = (e, a, i) => e < a ? Al(Math.abs(e - a), 1, a) / a : e > i ? -Al(Math.abs(e - i), 1, a) / a : 0, Fm = (e, a, i = 15, l = 40) => {
  const s = tb(e.x, l, a.width - l) * i, u = tb(e.y, l, a.height - l) * i;
  return [s, u];
}, qc = (e, a) => ({
  x: Math.min(e.x, a.x),
  y: Math.min(e.y, a.y),
  x2: Math.max(e.x2, a.x2),
  y2: Math.max(e.y2, a.y2)
}), em = ({ x: e, y: a, width: i, height: l }) => ({
  x: e,
  y: a,
  x2: e + i,
  y2: a + l
}), Ic = ({ x: e, y: a, x2: i, y2: l }) => ({
  x: e,
  y: a,
  width: i - e,
  height: l - a
}), jl = (e, a = [0, 0]) => {
  const { x: i, y: l } = Ym(e) ? e.internals.positionAbsolute : gs(e, a);
  return {
    x: i,
    y: l,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, Ec = (e, a = [0, 0]) => {
  const { x: i, y: l } = Ym(e) ? e.internals.positionAbsolute : gs(e, a);
  return {
    x: i,
    y: l,
    x2: i + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: l + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, cw = (e, a) => Ic(qc(em(e), em(a))), ns = (e, a) => {
  const i = Math.max(0, Math.min(e.x + e.width, a.x + a.width) - Math.max(e.x, a.x)), l = Math.max(0, Math.min(e.y + e.height, a.y + a.height) - Math.max(e.y, a.y));
  return Math.ceil(i * l);
}, nb = (e) => Na(e.width) && Na(e.height) && Na(e.x) && Na(e.y), Na = (e) => !isNaN(e) && isFinite(e), fw = (e, a) => (i, l) => {
}, ys = (e, a = [1, 1]) => ({
  x: a[0] * Math.round(e.x / a[0]),
  y: a[1] * Math.round(e.y / a[1])
}), Ul = ({ x: e, y: a }, [i, l, s], u = !1, c = [1, 1]) => {
  const d = {
    x: (e - i) / s,
    y: (a - l) / s
  };
  return u ? ys(d, c) : d;
}, Ol = ({ x: e, y: a }, [i, l, s]) => ({
  x: e * s + i,
  y: a * s + l
});
function pl(e, a) {
  if (typeof e == "number")
    return Math.floor((a - a / (1 + e)) * 0.5);
  if (typeof e == "string" && e.endsWith("px")) {
    const i = parseFloat(e);
    if (!Number.isNaN(i))
      return Math.floor(i);
  }
  if (typeof e == "string" && e.endsWith("%")) {
    const i = parseFloat(e);
    if (!Number.isNaN(i))
      return Math.floor(a * i * 0.01);
  }
  return console.error(`The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function CD(e, a, i) {
  if (typeof e == "string" || typeof e == "number") {
    const l = pl(e, i), s = pl(e, a);
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
    const l = pl(e.top ?? e.y ?? 0, i), s = pl(e.bottom ?? e.y ?? 0, i), u = pl(e.left ?? e.x ?? 0, a), c = pl(e.right ?? e.x ?? 0, a);
    return { top: l, right: c, bottom: s, left: u, x: u + c, y: l + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function RD(e, a, i, l, s, u) {
  const { x: c, y: d } = Ol(e, [a, i, l]), { x: p, y: m } = Ol({ x: e.x + e.width, y: e.y + e.height }, [a, i, l]), y = s - p, g = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(y),
    bottom: Math.floor(g)
  };
}
const Xm = (e, a, i, l, s, u) => {
  const c = CD(u, a, i), d = (a - c.x) / e.width, p = (i - c.y) / e.height, m = Math.min(d, p), y = Al(m, l, s), g = e.x + e.width / 2, b = e.y + e.height / 2, x = a / 2 - g * y, _ = i / 2 - b * y, E = RD(e, x, _, y, a, i), N = {
    left: Math.min(E.left - c.left, 0),
    top: Math.min(E.top - c.top, 0),
    right: Math.min(E.right - c.right, 0),
    bottom: Math.min(E.bottom - c.bottom, 0)
  };
  return {
    x: x - N.left + N.right,
    y: _ - N.top + N.bottom,
    zoom: y
  };
}, as = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Ai(e) {
  return e != null && e !== "parent";
}
function wr(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function dw(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function hw(e, a = { width: 0, height: 0 }, i, l, s) {
  const u = { ...e }, c = l.get(i);
  if (c) {
    const d = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * d[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * d[1];
  }
  return u;
}
function ab(e, a) {
  if (e.size !== a.size)
    return !1;
  for (const i of e)
    if (!a.has(i))
      return !1;
  return !0;
}
function TD() {
  let e, a;
  return { promise: new Promise((l, s) => {
    e = l, a = s;
  }), resolve: e, reject: a };
}
function MD(e) {
  return { ...rw, ...e || {} };
}
function Fo(e, { snapGrid: a = [0, 0], snapToGrid: i = !1, transform: l, containerBounds: s }) {
  const { x: u, y: c } = Ca(e), d = Ul({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, l), { x: p, y: m } = i ? ys(d, a) : d;
  return {
    xSnapped: p,
    ySnapped: m,
    ...d
  };
}
const Pm = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), mw = (e) => e?.getRootNode?.() || window?.document, DD = ["INPUT", "SELECT", "TEXTAREA"];
function pw(e) {
  const a = e.composedPath?.()?.[0] || e.target;
  return a?.nodeType !== 1 ? !1 : DD.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const gw = (e) => "clientX" in e, Ca = (e, a) => {
  const i = gw(e), l = i ? e.clientX : e.touches?.[0].clientX, s = i ? e.clientY : e.touches?.[0].clientY;
  return {
    x: l - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, rb = (e, a, i, l, s) => {
  const u = a.querySelectorAll(`.${e}`);
  return !u || !u.length ? null : Array.from(u).map((c) => {
    const d = c.getBoundingClientRect();
    return {
      id: c.getAttribute("data-handleid"),
      type: e,
      nodeId: s,
      position: c.getAttribute("data-handlepos"),
      x: (d.left - i.left) / l,
      y: (d.top - i.top) / l,
      ...Pm(c)
    };
  });
};
function vw({ sourceX: e, sourceY: a, targetX: i, targetY: l, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: d }) {
  const p = e * 0.125 + s * 0.375 + c * 0.375 + i * 0.125, m = a * 0.125 + u * 0.375 + d * 0.375 + l * 0.125, y = Math.abs(p - e), g = Math.abs(m - a);
  return [p, m, y, g];
}
function Bu(e, a) {
  return e >= 0 ? 0.5 * e : a * 25 * Math.sqrt(-e);
}
function ib({ pos: e, x1: a, y1: i, x2: l, y2: s, c: u }) {
  switch (e) {
    case ke.Left:
      return [a - Bu(a - l, u), i];
    case ke.Right:
      return [a + Bu(l - a, u), i];
    case ke.Top:
      return [a, i - Bu(i - s, u)];
    case ke.Bottom:
      return [a, i + Bu(s - i, u)];
  }
}
function yw({ sourceX: e, sourceY: a, sourcePosition: i = ke.Bottom, targetX: l, targetY: s, targetPosition: u = ke.Top, curvature: c = 0.25 }) {
  const [d, p] = ib({
    pos: i,
    x1: e,
    y1: a,
    x2: l,
    y2: s,
    c
  }), [m, y] = ib({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a,
    c
  }), [g, b, x, _] = vw({
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
    b,
    x,
    _
  ];
}
function bw({ sourceX: e, sourceY: a, targetX: i, targetY: l }) {
  const s = Math.abs(i - e) / 2, u = i < e ? i + s : i - s, c = Math.abs(l - a) / 2, d = l < a ? l + c : l - c;
  return [u, d, s, c];
}
function AD({ sourceNode: e, targetNode: a, selected: i = !1, zIndex: l = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return l;
  const c = s && i ? l + 1e3 : l, d = Math.max(e.parentId || s && e.selected ? e.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + d;
}
function jD({ sourceNode: e, targetNode: a, width: i, height: l, transform: s }) {
  const u = qc(Ec(e), Ec(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: i / s[2],
    height: l / s[2]
  };
  return ns(c, Ic(u)) > 0;
}
const OD = ({ source: e, sourceHandle: a, target: i, targetHandle: l }) => `xy-edge__${e}${a || ""}-${i}${l || ""}`, zD = (e, a) => a.some((i) => i.source === e.source && i.target === e.target && (i.sourceHandle === e.sourceHandle || !i.sourceHandle && !e.sourceHandle) && (i.targetHandle === e.targetHandle || !i.targetHandle && !e.targetHandle)), LD = (e, a, i = {}) => {
  if (!e.source || !e.target)
    return i.onError?.("006", Ra.error006()), a;
  const l = i.getEdgeId || OD;
  let s;
  return ow(e) ? s = { ...e } : s = {
    ...e,
    id: l(e)
  }, zD(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function xw({ sourceX: e, sourceY: a, targetX: i, targetY: l }) {
  const [s, u, c, d] = bw({
    sourceX: e,
    sourceY: a,
    targetX: i,
    targetY: l
  });
  return [`M ${e},${a}L ${i},${l}`, s, u, c, d];
}
const lb = {
  [ke.Left]: { x: -1, y: 0 },
  [ke.Right]: { x: 1, y: 0 },
  [ke.Top]: { x: 0, y: -1 },
  [ke.Bottom]: { x: 0, y: 1 }
}, kD = ({ source: e, sourcePosition: a = ke.Bottom, target: i }) => a === ke.Left || a === ke.Right ? e.x < i.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < i.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, ob = (e, a) => Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2));
function HD({ source: e, sourcePosition: a = ke.Bottom, target: i, targetPosition: l = ke.Top, center: s, offset: u, stepPosition: c }) {
  const d = lb[a], p = lb[l], m = { x: e.x + d.x * u, y: e.y + d.y * u }, y = { x: i.x + p.x * u, y: i.y + p.y * u }, g = kD({
    source: m,
    sourcePosition: a,
    target: y
  }), b = g.x !== 0 ? "x" : "y", x = g[b];
  let _ = [], E, N;
  const R = { x: 0, y: 0 }, j = { x: 0, y: 0 }, [, , C, O] = bw({
    sourceX: e.x,
    sourceY: e.y,
    targetX: i.x,
    targetY: i.y
  });
  if (d[b] * p[b] === -1) {
    b === "x" ? (E = s.x ?? m.x + (y.x - m.x) * c, N = s.y ?? (m.y + y.y) / 2) : (E = s.x ?? (m.x + y.x) / 2, N = s.y ?? m.y + (y.y - m.y) * c);
    const D = [
      { x: E, y: m.y },
      { x: E, y: y.y }
    ], H = [
      { x: m.x, y: N },
      { x: y.x, y: N }
    ];
    d[b] === x ? _ = b === "x" ? D : H : _ = b === "x" ? H : D;
  } else {
    const D = [{ x: m.x, y: y.y }], H = [{ x: y.x, y: m.y }];
    if (b === "x" ? _ = d.x === x ? H : D : _ = d.y === x ? D : H, a === l) {
      const L = Math.abs(e[b] - i[b]);
      if (L <= u) {
        const Y = Math.min(u - 1, u - L);
        d[b] === x ? R[b] = (m[b] > e[b] ? -1 : 1) * Y : j[b] = (y[b] > i[b] ? -1 : 1) * Y;
      }
    }
    if (a !== l) {
      const L = b === "x" ? "y" : "x", Y = d[b] === p[L], T = m[L] > y[L], z = m[L] < y[L];
      (d[b] === 1 && (!Y && T || Y && z) || d[b] !== 1 && (!Y && z || Y && T)) && (_ = b === "x" ? D : H);
    }
    const J = { x: m.x + R.x, y: m.y + R.y }, I = { x: y.x + j.x, y: y.y + j.y }, Q = Math.max(Math.abs(J.x - _[0].x), Math.abs(I.x - _[0].x)), ae = Math.max(Math.abs(J.y - _[0].y), Math.abs(I.y - _[0].y));
    Q >= ae ? (E = (J.x + I.x) / 2, N = _[0].y) : (E = _[0].x, N = (J.y + I.y) / 2);
  }
  const V = { x: m.x + R.x, y: m.y + R.y }, B = { x: y.x + j.x, y: y.y + j.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...V.x !== _[0].x || V.y !== _[0].y ? [V] : [],
    ..._,
    ...B.x !== _[_.length - 1].x || B.y !== _[_.length - 1].y ? [B] : [],
    i
  ], E, N, C, O];
}
function BD(e, a, i, l) {
  const s = Math.min(ob(e, a) / 2, ob(a, i) / 2, l), { x: u, y: c } = a;
  if (e.x === u && u === i.x || e.y === c && c === i.y)
    return `L${u} ${c}`;
  if (e.y === c) {
    const m = e.x < i.x ? -1 : 1, y = e.y < i.y ? 1 : -1;
    return `L ${u + s * m},${c}Q ${u},${c} ${u},${c + s * y}`;
  }
  const d = e.x < i.x ? 1 : -1, p = e.y < i.y ? -1 : 1;
  return `L ${u},${c + s * p}Q ${u},${c} ${u + s * d},${c}`;
}
function tm({ sourceX: e, sourceY: a, sourcePosition: i = ke.Bottom, targetX: l, targetY: s, targetPosition: u = ke.Top, borderRadius: c = 5, centerX: d, centerY: p, offset: m = 20, stepPosition: y = 0.5 }) {
  const [g, b, x, _, E] = HD({
    source: { x: e, y: a },
    sourcePosition: i,
    target: { x: l, y: s },
    targetPosition: u,
    center: { x: d, y: p },
    offset: m,
    stepPosition: y
  });
  let N = `M${g[0].x} ${g[0].y}`;
  for (let R = 1; R < g.length - 1; R++)
    N += BD(g[R - 1], g[R], g[R + 1], c);
  return N += `L${g[g.length - 1].x} ${g[g.length - 1].y}`, [N, b, x, _, E];
}
function sb(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function UD(e) {
  const { sourceNode: a, targetNode: i } = e;
  if (!sb(a) || !sb(i))
    return null;
  const l = a.internals.handleBounds || ub(a.handles), s = i.internals.handleBounds || ub(i.handles), u = cb(l?.source ?? [], e.sourceHandle), c = cb(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === Dl.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    e.targetHandle
  );
  if (!u || !c)
    return e.onError?.("008", Ra.error008(u ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const d = u?.position || ke.Bottom, p = c?.position || ke.Top, m = ji(a, u, d), y = ji(i, c, p);
  return {
    sourceX: m.x,
    sourceY: m.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: d,
    targetPosition: p
  };
}
function ub(e) {
  if (!e)
    return null;
  const a = [], i = [];
  for (const l of e)
    l.width = l.width ?? 1, l.height = l.height ?? 1, l.type === "source" ? a.push(l) : l.type === "target" && i.push(l);
  return {
    source: a,
    target: i
  };
}
function ji(e, a, i = ke.Left, l = !1) {
  const s = (a?.x ?? 0) + e.internals.positionAbsolute.x, u = (a?.y ?? 0) + e.internals.positionAbsolute.y, { width: c, height: d } = a ?? wr(e);
  if (l)
    return { x: s + c / 2, y: u + d / 2 };
  switch (a?.position ?? i) {
    case ke.Top:
      return { x: s + c / 2, y: u };
    case ke.Right:
      return { x: s + c, y: u + d / 2 };
    case ke.Bottom:
      return { x: s + c / 2, y: u + d };
    case ke.Left:
      return { x: s, y: u + d / 2 };
  }
}
function cb(e, a) {
  return e && (a ? e.find((i) => i.id === a) : e[0]) || null;
}
function nm(e, a) {
  return e ? typeof e == "string" ? e : `${a ? `${a}__` : ""}${Object.keys(e).sort().map((l) => `${l}=${e[l]}`).join("&")}` : "";
}
function VD(e, { id: a, defaultColor: i, defaultMarkerStart: l, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return e.reduce((c, d) => ([d.markerStart || l, d.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const m = nm(p, a);
      u.has(m) || (c.push({ id: m, color: p.color || i, ...p }), u.add(m));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const ww = 1e3, $D = 10, Zm = {
  nodeOrigin: [0, 0],
  nodeExtent: es,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, qD = {
  ...Zm,
  checkEquality: !0
};
function Qm(e, a) {
  const i = { ...e };
  for (const l in a)
    a[l] !== void 0 && (i[l] = a[l]);
  return i;
}
function ID(e, a, i) {
  const l = Qm(Zm, i);
  for (const s of e.values())
    if (s.parentId)
      Wm(s, e, a, l);
    else {
      const u = gs(s, l.nodeOrigin), c = Ai(s.extent) ? s.extent : l.nodeExtent, d = Di(u, c, wr(s));
      s.internals.positionAbsolute = d;
    }
}
function YD(e, a) {
  if (!e.handles)
    return e.measured ? a?.internals.handleBounds : void 0;
  const i = [], l = [];
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
    s.type === "source" ? i.push(u) : s.type === "target" && l.push(u);
  }
  return {
    source: i,
    target: l
  };
}
function Km(e) {
  return e === "manual";
}
function am(e, a, i, l = {}) {
  const s = Qm(qD, l), u = { i: 0 }, c = new Map(a), d = s?.elevateNodesOnSelect && !Km(s.zIndexMode) ? ww : 0;
  let p = e.length > 0, m = !1;
  a.clear(), i.clear();
  for (const y of e) {
    let g = c.get(y.id);
    if (s.checkEquality && y === g?.internals.userNode)
      a.set(y.id, g);
    else {
      const b = gs(y, s.nodeOrigin), x = Ai(y.extent) ? y.extent : s.nodeExtent, _ = Di(b, x, wr(y));
      g = {
        ...s.defaults,
        ...y,
        measured: {
          width: y.measured?.width,
          height: y.measured?.height
        },
        internals: {
          positionAbsolute: _,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: YD(y, g),
          z: _w(y, d, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, g);
    }
    (g.measured === void 0 || g.measured.width === void 0 || g.measured.height === void 0) && !g.hidden && (p = !1), y.parentId && Wm(g, a, i, l, u), m ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: m };
}
function GD(e, a) {
  if (!e.parentId)
    return;
  const i = a.get(e.parentId);
  i ? i.set(e.id, e) : a.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Wm(e, a, i, l, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: d, zIndexMode: p } = Qm(Zm, l), m = e.parentId, y = a.get(m);
  if (!y) {
    console.warn(`Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  GD(e, i), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * $D), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const g = u && !Km(p) ? ww : 0, { x: b, y: x, z: _ } = FD(e, y, c, d, g, p), { positionAbsolute: E } = e.internals, N = b !== E.x || x !== E.y;
  (N || _ !== e.internals.z) && a.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: N ? { x: b, y: x } : E,
      z: _
    }
  });
}
function _w(e, a, i) {
  const l = Na(e.zIndex) ? e.zIndex : 0;
  return Km(i) ? l : l + (e.selected ? a : 0);
}
function FD(e, a, i, l, s, u) {
  const { x: c, y: d } = a.internals.positionAbsolute, p = wr(e), m = gs(e, i), y = Ai(e.extent) ? Di(m, e.extent, p) : m;
  let g = Di({ x: c + y.x, y: d + y.y }, l, p);
  e.extent === "parent" && (g = uw(g, p, a));
  const b = _w(e, s, u), x = a.internals.z ?? 0;
  return {
    x: g.x,
    y: g.y,
    z: x >= b ? x + 1 : b
  };
}
function Jm(e, a, i, l = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of e) {
    const d = a.get(c.parentId);
    if (!d)
      continue;
    const p = u.get(c.parentId)?.expandedRect ?? jl(d), m = cw(p, c.rect);
    u.set(c.parentId, { expandedRect: m, parent: d });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: d }, p) => {
    const m = d.internals.positionAbsolute, y = wr(d), g = d.origin ?? l, b = c.x < m.x ? Math.round(Math.abs(m.x - c.x)) : 0, x = c.y < m.y ? Math.round(Math.abs(m.y - c.y)) : 0, _ = Math.max(y.width, Math.round(c.width)), E = Math.max(y.height, Math.round(c.height)), N = (_ - y.width) * g[0], R = (E - y.height) * g[1];
    (b > 0 || x > 0 || N || R) && (s.push({
      id: p,
      type: "position",
      position: {
        x: d.position.x - b + N,
        y: d.position.y - x + R
      }
    }), i.get(p)?.forEach((j) => {
      e.some((C) => C.id === j.id) || s.push({
        id: j.id,
        type: "position",
        position: {
          x: j.position.x + b,
          y: j.position.y + x
        }
      });
    })), (y.width < c.width || y.height < c.height || b || x) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: _ + (b ? g[0] * b - N : 0),
        height: E + (x ? g[1] * x - R : 0)
      }
    });
  }), s;
}
function XD(e, a, i, l, s, u, c) {
  const d = l?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!d)
    return { changes: [], updatedInternals: p };
  const m = [], y = window.getComputedStyle(d), { m22: g } = new window.DOMMatrixReadOnly(y.transform), b = [];
  for (const x of e.values()) {
    const _ = a.get(x.id);
    if (!_)
      continue;
    if (_.hidden) {
      a.set(_.id, {
        ..._,
        internals: {
          ..._.internals,
          handleBounds: void 0
        }
      }), p = !0;
      continue;
    }
    const E = Pm(x.nodeElement), N = _.measured.width !== E.width || _.measured.height !== E.height;
    if (!!(E.width && E.height && (N || !_.internals.handleBounds || x.force))) {
      const j = x.nodeElement.getBoundingClientRect(), C = Ai(_.extent) ? _.extent : u;
      let { positionAbsolute: O } = _.internals;
      _.parentId && _.extent === "parent" ? O = uw(O, E, a.get(_.parentId)) : C && (O = Di(O, C, E));
      const V = {
        ..._,
        measured: E,
        internals: {
          ..._.internals,
          positionAbsolute: O,
          handleBounds: {
            source: rb("source", x.nodeElement, j, g, _.id),
            target: rb("target", x.nodeElement, j, g, _.id)
          }
        }
      };
      a.set(_.id, V), _.parentId && Wm(V, a, i, { nodeOrigin: s, zIndexMode: c }), p = !0, N && (m.push({
        id: _.id,
        type: "dimensions",
        dimensions: E
      }), _.expandParent && _.parentId && b.push({
        id: _.id,
        parentId: _.parentId,
        rect: jl(V, s)
      }));
    }
  }
  if (b.length > 0) {
    const x = Jm(b, a, i, s);
    m.push(...x);
  }
  return { changes: m, updatedInternals: p };
}
async function PD({ delta: e, panZoom: a, transform: i, translateExtent: l, width: s, height: u }) {
  if (!a || !e.x && !e.y)
    return !1;
  const c = await a.setViewportConstrained({
    x: i[0] + e.x,
    y: i[1] + e.y,
    zoom: i[2]
  }, [
    [0, 0],
    [s, u]
  ], l);
  return !!c && (c.x !== i[0] || c.y !== i[1] || c.k !== i[2]);
}
function fb(e, a, i, l, s, u) {
  let c = s;
  const d = l.get(c) || /* @__PURE__ */ new Map();
  l.set(c, d.set(i, a)), c = `${s}-${e}`;
  const p = l.get(c) || /* @__PURE__ */ new Map();
  if (l.set(c, p.set(i, a)), u) {
    c = `${s}-${e}-${u}`;
    const m = l.get(c) || /* @__PURE__ */ new Map();
    l.set(c, m.set(i, a));
  }
}
function Sw(e, a, i) {
  e.clear(), a.clear();
  for (const l of i) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: d = null } = l, p = { edgeId: l.id, source: s, target: u, sourceHandle: c, targetHandle: d }, m = `${s}-${c}--${u}-${d}`, y = `${u}-${d}--${s}-${c}`;
    fb("source", p, y, e, s, c), fb("target", p, m, e, u, d), a.set(l.id, l);
  }
}
function Ew(e, a) {
  if (!e.parentId)
    return !1;
  const i = a.get(e.parentId);
  return i ? i.selected ? !0 : Ew(i, a) : !1;
}
function db(e, a, i) {
  let l = e;
  do {
    if (l?.matches?.(a))
      return !0;
    if (l === i)
      return !1;
    l = l?.parentElement;
  } while (l);
  return !1;
}
function ZD(e, a, i, l) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of e)
    if ((c.selected || c.id === l) && (!c.parentId || !Ew(c, e)) && (c.draggable || a && typeof c.draggable > "u")) {
      const d = e.get(u);
      d && s.set(u, {
        id: u,
        position: d.position || { x: 0, y: 0 },
        distance: {
          x: i.x - d.internals.positionAbsolute.x,
          y: i.y - d.internals.positionAbsolute.y
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
function yh({ nodeId: e, dragItems: a, nodeLookup: i, dragging: l = !0 }) {
  const s = [];
  for (const [c, d] of a) {
    const p = i.get(c)?.internals.userNode;
    p && s.push({
      ...p,
      position: d.position,
      dragging: l
    });
  }
  if (!e)
    return [s[0], s];
  const u = i.get(e)?.internals.userNode;
  return [
    u ? {
      ...u,
      position: a.get(e)?.position || u.position,
      dragging: l
    } : s[0],
    s
  ];
}
function QD({ dragItems: e, snapGrid: a, x: i, y: l }) {
  const s = e.values().next().value;
  if (!s)
    return null;
  const u = {
    x: i - s.distance.x,
    y: l - s.distance.y
  }, c = ys(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function KD({ onNodeMouseDown: e, getStoreItems: a, onDragStart: i, onDrag: l, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), p = !1, m = { x: 0, y: 0 }, y = null, g = !1, b = null, x = !1, _ = !1, E = null;
  function N({ noDragClassName: j, handleSelector: C, domNode: O, isSelectable: V, nodeId: B, nodeClickDistance: U = 0 }) {
    b = Xn(O);
    function D({ x: Q, y: ae }) {
      const { nodeLookup: L, nodeExtent: Y, snapGrid: T, snapToGrid: z, nodeOrigin: F, onNodeDrag: X, onSelectionDrag: ne, onError: A, updateNodePositions: k } = a();
      u = { x: Q, y: ae };
      let G = !1;
      const ee = d.size > 1, se = ee && Y ? em(vs(d)) : null, de = ee && z ? QD({
        dragItems: d,
        snapGrid: T,
        x: Q,
        y: ae
      }) : null;
      for (const [he, W] of d) {
        if (!L.has(he))
          continue;
        let ve = { x: Q - W.distance.x, y: ae - W.distance.y };
        z && (ve = de ? {
          x: Math.round(ve.x + de.x),
          y: Math.round(ve.y + de.y)
        } : ys(ve, T));
        let De = null;
        if (ee && Y && !W.extent && se) {
          const { positionAbsolute: we } = W.internals, Me = we.x - se.x + Y[0][0], Ye = we.x + W.measured.width - se.x2 + Y[1][0], ye = we.y - se.y + Y[0][1], pe = we.y + W.measured.height - se.y2 + Y[1][1];
          De = [
            [Me, ye],
            [Ye, pe]
          ];
        }
        const { position: Oe, positionAbsolute: Ee } = sw({
          nodeId: he,
          nextPosition: ve,
          nodeLookup: L,
          nodeExtent: De || Y,
          nodeOrigin: F,
          onError: A
        });
        G = G || W.position.x !== Oe.x || W.position.y !== Oe.y, W.position = Oe, W.internals.positionAbsolute = Ee;
      }
      if (_ = _ || G, !!G && (k(d, !0), E && (l || X || !B && ne))) {
        const [he, W] = yh({
          nodeId: B,
          dragItems: d,
          nodeLookup: L
        });
        l?.(E, d, he, W), X?.(E, he, W), B || ne?.(E, W);
      }
    }
    async function H() {
      if (!y)
        return;
      const { transform: Q, panBy: ae, autoPanSpeed: L, autoPanOnNodeDrag: Y } = a();
      if (!Y) {
        p = !1, cancelAnimationFrame(c);
        return;
      }
      const [T, z] = Fm(m, y, L);
      (T !== 0 || z !== 0) && (u.x = (u.x ?? 0) - T / Q[2], u.y = (u.y ?? 0) - z / Q[2], await ae({ x: T, y: z }) && D(u)), c = requestAnimationFrame(H);
    }
    function J(Q) {
      const { nodeLookup: ae, multiSelectionActive: L, nodesDraggable: Y, transform: T, snapGrid: z, snapToGrid: F, selectNodesOnDrag: X, onNodeDragStart: ne, onSelectionDragStart: A, unselectNodesAndEdges: k } = a();
      g = !0, (!X || !V) && !L && B && (ae.get(B)?.selected || k()), V && X && B && e?.(B);
      const G = Fo(Q.sourceEvent, { transform: T, snapGrid: z, snapToGrid: F, containerBounds: y });
      if (u = G, d = ZD(ae, Y, G, B), d.size > 0 && (i || ne || !B && A)) {
        const [ee, se] = yh({
          nodeId: B,
          dragItems: d,
          nodeLookup: ae
        });
        i?.(Q.sourceEvent, d, ee, se), ne?.(Q.sourceEvent, ee, se), B || A?.(Q.sourceEvent, se);
      }
    }
    const I = $1().clickDistance(U).on("start", (Q) => {
      const { domNode: ae, nodeDragThreshold: L, transform: Y, snapGrid: T, snapToGrid: z } = a();
      y = ae?.getBoundingClientRect() || null, x = !1, _ = !1, E = Q.sourceEvent, L === 0 && J(Q), u = Fo(Q.sourceEvent, { transform: Y, snapGrid: T, snapToGrid: z, containerBounds: y }), m = Ca(Q.sourceEvent, y);
    }).on("drag", (Q) => {
      const { autoPanOnNodeDrag: ae, transform: L, snapGrid: Y, snapToGrid: T, nodeDragThreshold: z, nodeLookup: F } = a(), X = Fo(Q.sourceEvent, { transform: L, snapGrid: Y, snapToGrid: T, containerBounds: y });
      if (E = Q.sourceEvent, (Q.sourceEvent.type === "touchmove" && Q.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      B && !F.has(B)) && (x = !0), !x) {
        if (!p && ae && g && (p = !0, H()), !g) {
          const ne = Ca(Q.sourceEvent, y), A = ne.x - m.x, k = ne.y - m.y;
          Math.sqrt(A * A + k * k) > z && J(Q);
        }
        (u.x !== X.xSnapped || u.y !== X.ySnapped) && d && g && (m = Ca(Q.sourceEvent, y), D(X));
      }
    }).on("end", (Q) => {
      if (!g || x) {
        x && d.size > 0 && a().updateNodePositions(d, !1);
        return;
      }
      if (p = !1, g = !1, cancelAnimationFrame(c), d.size > 0) {
        const { nodeLookup: ae, updateNodePositions: L, onNodeDragStop: Y, onSelectionDragStop: T } = a();
        if (_ && (L(d, !1), _ = !1), s || Y || !B && T) {
          const [z, F] = yh({
            nodeId: B,
            dragItems: d,
            nodeLookup: ae,
            dragging: !1
          });
          s?.(Q.sourceEvent, d, z, F), Y?.(Q.sourceEvent, z, F), B || T?.(Q.sourceEvent, F);
        }
      }
    }).filter((Q) => {
      const ae = Q.target;
      return !Q.button && (!j || !db(ae, `.${j}`, O)) && (!C || db(ae, C, O));
    });
    b.call(I);
  }
  function R() {
    b?.on(".drag", null);
  }
  return {
    update: N,
    destroy: R
  };
}
function WD(e, a, i) {
  const l = [], s = {
    x: e.x - i,
    y: e.y - i,
    width: i * 2,
    height: i * 2
  };
  for (const u of a.values())
    ns(s, jl(u)) > 0 && l.push(u);
  return l;
}
const JD = 250;
function eA(e, a, i, l) {
  let s = [], u = 1 / 0;
  const c = WD(e, i, a + JD);
  for (const d of c) {
    const p = [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []];
    for (const m of p) {
      if (l.nodeId === m.nodeId && l.type === m.type && l.id === m.id)
        continue;
      const { x: y, y: g } = ji(d, m, m.position, !0), b = Math.sqrt(Math.pow(y - e.x, 2) + Math.pow(g - e.y, 2));
      b > a || (b < u ? (s = [{ ...m, x: y, y: g }], u = b) : b === u && s.push({ ...m, x: y, y: g }));
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
function Nw(e, a, i, l, s, u = !1) {
  const c = l.get(e);
  if (!c)
    return null;
  const d = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], p = (i ? d?.find((m) => m.id === i) : d?.[0]) ?? null;
  return p && u ? { ...p, ...ji(c, p, p.position, !0) } : p;
}
function Cw(e, a) {
  return e || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function tA(e, a) {
  let i = null;
  return a ? i = !0 : e && !a && (i = !1), i;
}
const Rw = () => !0;
function nA(e, { connectionMode: a, connectionRadius: i, handleId: l, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: d, nodeLookup: p, lib: m, autoPanOnConnect: y, flowId: g, panBy: b, cancelConnection: x, onConnectStart: _, onConnect: E, onConnectEnd: N, isValidConnection: R = Rw, onReconnectEnd: j, updateConnection: C, getTransform: O, getFromHandle: V, autoPanSpeed: B, dragThreshold: U = 1, handleDomNode: D }) {
  const H = mw(e.target);
  let J = 0, I;
  const { x: Q, y: ae } = Ca(e), L = Cw(u, D), Y = d?.getBoundingClientRect();
  let T = !1;
  if (!Y || !L)
    return;
  const z = Nw(s, L, l, p, a);
  if (!z)
    return;
  let F = Ca(e, Y), X = !1, ne = null, A = !1, k = null;
  function G() {
    if (!y || !Y)
      return;
    const [Oe, Ee] = Fm(F, Y, B);
    b({ x: Oe, y: Ee }), J = requestAnimationFrame(G);
  }
  const ee = {
    ...z,
    nodeId: s,
    type: L,
    position: z.position
  }, se = p.get(s);
  let he = {
    inProgress: !0,
    isValid: null,
    from: ji(se, ee, ke.Left, !0),
    fromHandle: ee,
    fromPosition: ee.position,
    fromNode: se,
    to: F,
    toHandle: null,
    toPosition: eb[ee.position],
    toNode: null,
    pointer: F
  };
  function W() {
    T = !0, C(he), _?.(e, { nodeId: s, handleId: l, handleType: L });
  }
  U === 0 && W();
  function ve(Oe) {
    if (!T) {
      const { x: pe, y: _e } = Ca(Oe), Re = pe - Q, Ae = _e - ae;
      if (!(Re * Re + Ae * Ae > U * U))
        return;
      W();
    }
    if (!V() || !ee) {
      De(Oe);
      return;
    }
    const Ee = O();
    F = Ca(Oe, Y), I = eA(Ul(F, Ee, !1, [1, 1]), i, p, ee), X || (G(), X = !0);
    const we = Tw(Oe, {
      handle: I,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: l,
      fromType: c ? "target" : "source",
      isValidConnection: R,
      doc: H,
      lib: m,
      flowId: g,
      nodeLookup: p
    });
    k = we.handleDomNode, ne = we.connection, A = tA(!!I, we.isValid);
    const Me = p.get(s), Ye = Me ? ji(Me, ee, ke.Left, !0) : he.from, ye = {
      ...he,
      from: Ye,
      isValid: A,
      to: we.toHandle && A ? Ol({ x: we.toHandle.x, y: we.toHandle.y }, Ee) : F,
      toHandle: we.toHandle,
      toPosition: A && we.toHandle ? we.toHandle.position : eb[ee.position],
      toNode: we.toHandle ? p.get(we.toHandle.nodeId) : null,
      pointer: F
    };
    C(ye), he = ye;
  }
  function De(Oe) {
    if (!("touches" in Oe && Oe.touches.length > 0)) {
      if (T) {
        (I || k) && ne && A && E?.(ne);
        const { inProgress: Ee, ...we } = he, Me = {
          ...we,
          toPosition: he.toHandle ? he.toPosition : null
        };
        N?.(Oe, Me), u && j?.(Oe, Me);
      }
      x(), cancelAnimationFrame(J), X = !1, A = !1, ne = null, k = null, H.removeEventListener("mousemove", ve), H.removeEventListener("mouseup", De), H.removeEventListener("touchmove", ve), H.removeEventListener("touchend", De);
    }
  }
  H.addEventListener("mousemove", ve), H.addEventListener("mouseup", De), H.addEventListener("touchmove", ve), H.addEventListener("touchend", De);
}
function Tw(e, { handle: a, connectionMode: i, fromNodeId: l, fromHandleId: s, fromType: u, doc: c, lib: d, flowId: p, isValidConnection: m = Rw, nodeLookup: y }) {
  const g = u === "target", b = a ? c.querySelector(`.${d}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: _ } = Ca(e), E = c.elementFromPoint(x, _), N = E?.classList.contains(`${d}-flow__handle`) ? E : b, R = {
    handleDomNode: N,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (N) {
    const j = Cw(void 0, N), C = N.getAttribute("data-nodeid"), O = N.getAttribute("data-handleid"), V = N.classList.contains("connectable"), B = N.classList.contains("connectableend");
    if (!C || !j)
      return R;
    const U = {
      source: g ? C : l,
      sourceHandle: g ? O : s,
      target: g ? l : C,
      targetHandle: g ? s : O
    };
    R.connection = U;
    const H = V && B && (i === Dl.Strict ? g && j === "source" || !g && j === "target" : C !== l || O !== s);
    R.isValid = H && m(U), R.toHandle = Nw(C, j, O, y, i, !0);
  }
  return R;
}
const rm = {
  onPointerDown: nA,
  isValid: Tw
};
function aA({ domNode: e, panZoom: a, getTransform: i, getViewScale: l }) {
  const s = Xn(e);
  function u({ translateExtent: d, width: p, height: m, zoomStep: y = 1, pannable: g = !0, zoomable: b = !0, inversePan: x = !1 }) {
    const _ = (C) => {
      if (C.sourceEvent.type !== "wheel" || !a)
        return;
      const O = i(), V = C.sourceEvent.ctrlKey && as() ? 10 : 1, B = -C.sourceEvent.deltaY * (C.sourceEvent.deltaMode === 1 ? 0.05 : C.sourceEvent.deltaMode ? 1 : 2e-3) * y, U = O[2] * Math.pow(2, B * V);
      a.scaleTo(U);
    };
    let E = [0, 0];
    const N = (C) => {
      (C.sourceEvent.type === "mousedown" || C.sourceEvent.type === "touchstart") && (E = [
        C.sourceEvent.clientX ?? C.sourceEvent.touches[0].clientX,
        C.sourceEvent.clientY ?? C.sourceEvent.touches[0].clientY
      ]);
    }, R = (C) => {
      const O = i();
      if (C.sourceEvent.type !== "mousemove" && C.sourceEvent.type !== "touchmove" || !a)
        return;
      const V = [
        C.sourceEvent.clientX ?? C.sourceEvent.touches[0].clientX,
        C.sourceEvent.clientY ?? C.sourceEvent.touches[0].clientY
      ], B = [V[0] - E[0], V[1] - E[1]];
      E = V;
      const U = l() * Math.max(O[2], Math.log(O[2])) * (x ? -1 : 1), D = {
        x: O[0] - B[0] * U,
        y: O[1] - B[1] * U
      }, H = [
        [0, 0],
        [p, m]
      ];
      a.setViewportConstrained({
        x: D.x,
        y: D.y,
        zoom: O[2]
      }, H, d);
    }, j = nw().on("start", N).on("zoom", g ? R : null).on("zoom.wheel", b ? _ : null);
    s.call(j, {});
  }
  function c() {
    s.on("zoom", null);
  }
  return {
    update: u,
    destroy: c,
    pointer: Sa
  };
}
const Yc = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), bh = ({ x: e, y: a, zoom: i }) => $c.translate(e, a).scale(i), _l = (e, a) => e.target.closest(`.${a}`), Mw = (e, a) => a === 2 && Array.isArray(e) && e.includes(2), rA = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, xh = (e, a = 0, i = rA, l = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || l(), s ? e.transition().duration(a).ease(i).on("end", l) : e;
}, Dw = (e) => {
  const a = e.ctrlKey && as() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * a;
};
function iA({ zoomPanValues: e, noWheelClassName: a, d3Selection: i, d3Zoom: l, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: p, onPanZoomEnd: m }) {
  return (y) => {
    if (_l(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const g = i.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const N = Sa(y), R = Dw(y), j = g * Math.pow(2, R);
      l.scaleTo(i, j, N, y);
      return;
    }
    const b = y.deltaMode === 1 ? 20 : 1;
    let x = s === Ni.Vertical ? 0 : y.deltaX * b, _ = s === Ni.Horizontal ? 0 : y.deltaY * b;
    !as() && y.shiftKey && s !== Ni.Vertical && (x = y.deltaY * b, _ = 0), l.translateBy(
      i,
      -(x / g) * u,
      -(_ / g) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const E = Yc(i.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (p?.(y, E), e.panScrollTimeout = setTimeout(() => {
      m?.(y, E), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, d?.(y, E));
  };
}
function lA({ noWheelClassName: e, preventScrolling: a, d3ZoomHandler: i }) {
  return function(l, s) {
    const u = l.type === "wheel", c = !a && u && !l.ctrlKey, d = _l(l, e);
    if (l.ctrlKey && u && d && l.preventDefault(), c || d)
      return null;
    l.preventDefault(), i.call(this, l, s);
  };
}
function oA({ zoomPanValues: e, onDraggingChange: a, onPanZoomStart: i }) {
  return (l) => {
    if (l.sourceEvent?.internal)
      return;
    const s = Yc(l.transform);
    e.mouseButton = l.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = s, l.sourceEvent?.type === "mousedown" && a(!0), i && i?.(l.sourceEvent, s);
  };
}
function sA({ zoomPanValues: e, panOnDrag: a, onPaneContextMenu: i, onTransformChange: l, onPanZoom: s }) {
  return (u) => {
    e.usedRightMouseButton = !!(i && Mw(a, e.mouseButton ?? 0)), u.sourceEvent?.sync || l([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, Yc(u.transform));
  };
}
function uA({ zoomPanValues: e, panOnDrag: a, panOnScroll: i, onDraggingChange: l, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (e.isZoomingOrPanning = !1, u && Mw(a, e.mouseButton ?? 0) && !e.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), e.usedRightMouseButton = !1, l(!1), s)) {
      const d = Yc(c.transform);
      e.prevViewport = d, clearTimeout(e.timerId), e.timerId = setTimeout(
        () => {
          s?.(c.sourceEvent, d);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        i ? 150 : 0
      );
    }
  };
}
function cA({ zoomActivationKeyPressed: e, zoomOnScroll: a, zoomOnPinch: i, panOnDrag: l, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: d, noPanClassName: p, lib: m, connectionInProgress: y }) {
  return (g) => {
    const b = e || a, x = i && g.ctrlKey, _ = g.type === "wheel";
    if (g.button === 1 && g.type === "mousedown" && (_l(g, `${m}-flow__node`) || _l(g, `${m}-flow__edge`)))
      return !0;
    if (!l && !b && !s && !u && !i || c || y && !_ || _l(g, d) && _ || _l(g, p) && (!_ || s && _ && !e) || !i && g.ctrlKey && _)
      return !1;
    if (!i && g.type === "touchstart" && g.touches?.length > 1)
      return g.preventDefault(), !1;
    if (!b && !s && !x && _ || !l && (g.type === "mousedown" || g.type === "touchstart") || Array.isArray(l) && !l.includes(g.button) && g.type === "mousedown")
      return !1;
    const E = Array.isArray(l) && l.includes(g.button) || !g.button || g.button <= 1;
    return (!g.ctrlKey || _) && E;
  };
}
function fA({ domNode: e, minZoom: a, maxZoom: i, translateExtent: l, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: p }) {
  const m = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = e.getBoundingClientRect(), g = nw().scaleExtent([a, i]).translateExtent(l), b = Xn(e).call(g);
  j({
    x: s.x,
    y: s.y,
    zoom: Al(s.zoom, a, i)
  }, [
    [0, 0],
    [y.width, y.height]
  ], l);
  const x = b.on("wheel.zoom"), _ = b.on("dblclick.zoom");
  g.wheelDelta(Dw);
  async function E(I, Q) {
    return b ? new Promise((ae) => {
      g?.interpolate(Q?.interpolate === "linear" ? Go : oc).transform(xh(b, Q?.duration, Q?.ease, () => ae(!0)), I);
    }) : !1;
  }
  function N({ noWheelClassName: I, noPanClassName: Q, onPaneContextMenu: ae, userSelectionActive: L, panOnScroll: Y, panOnDrag: T, panOnScrollMode: z, panOnScrollSpeed: F, preventScrolling: X, zoomOnPinch: ne, zoomOnScroll: A, zoomOnDoubleClick: k, zoomActivationKeyPressed: G, lib: ee, onTransformChange: se, connectionInProgress: de, paneClickDistance: he, selectionOnDrag: W }) {
    L && !m.isZoomingOrPanning && R();
    const ve = Y && !G && !L;
    g.clickDistance(W ? 1 / 0 : !Na(he) || he < 0 ? 0 : he);
    const De = ve ? iA({
      zoomPanValues: m,
      noWheelClassName: I,
      d3Selection: b,
      d3Zoom: g,
      panOnScrollMode: z,
      panOnScrollSpeed: F,
      zoomOnPinch: ne,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: d
    }) : lA({
      noWheelClassName: I,
      preventScrolling: X,
      d3ZoomHandler: x
    });
    b.on("wheel.zoom", De, { passive: !1 });
    const Oe = oA({
      zoomPanValues: m,
      onDraggingChange: p,
      onPanZoomStart: c
    });
    g.on("start", Oe);
    const Ee = sA({
      zoomPanValues: m,
      panOnDrag: T,
      onPaneContextMenu: !!ae,
      onPanZoom: u,
      onTransformChange: se
    });
    g.on("zoom", Ee);
    const we = uA({
      zoomPanValues: m,
      panOnDrag: T,
      panOnScroll: Y,
      onPaneContextMenu: ae,
      onPanZoomEnd: d,
      onDraggingChange: p
    });
    g.on("end", we);
    const Me = cA({
      zoomActivationKeyPressed: G,
      panOnDrag: T,
      zoomOnScroll: A,
      panOnScroll: Y,
      zoomOnDoubleClick: k,
      zoomOnPinch: ne,
      userSelectionActive: L,
      noPanClassName: Q,
      noWheelClassName: I,
      lib: ee,
      connectionInProgress: de
    });
    g.filter(Me), k ? b.on("dblclick.zoom", _) : b.on("dblclick.zoom", null);
  }
  function R() {
    g.on("zoom", null);
  }
  async function j(I, Q, ae) {
    const L = bh(I), Y = g?.constrain()(L, Q, ae);
    return Y && await E(Y), Y;
  }
  async function C(I, Q) {
    const ae = bh(I);
    return await E(ae, Q), ae;
  }
  function O(I) {
    if (b) {
      const Q = bh(I), ae = b.property("__zoom");
      (ae.k !== I.zoom || ae.x !== I.x || ae.y !== I.y) && g?.transform(b, Q, null, { sync: !0 });
    }
  }
  function V() {
    const I = b ? tw(b.node()) : { x: 0, y: 0, k: 1 };
    return { x: I.x, y: I.y, zoom: I.k };
  }
  async function B(I, Q) {
    return b ? new Promise((ae) => {
      g?.interpolate(Q?.interpolate === "linear" ? Go : oc).scaleTo(xh(b, Q?.duration, Q?.ease, () => ae(!0)), I);
    }) : !1;
  }
  async function U(I, Q) {
    return b ? new Promise((ae) => {
      g?.interpolate(Q?.interpolate === "linear" ? Go : oc).scaleBy(xh(b, Q?.duration, Q?.ease, () => ae(!0)), I);
    }) : !1;
  }
  function D(I) {
    g?.scaleExtent(I);
  }
  function H(I) {
    g?.translateExtent(I);
  }
  function J(I) {
    const Q = !Na(I) || I < 0 ? 0 : I;
    g?.clickDistance(Q);
  }
  return {
    update: N,
    destroy: R,
    setViewport: C,
    setViewportConstrained: j,
    getViewport: V,
    scaleTo: B,
    scaleBy: U,
    setScaleExtent: D,
    setTranslateExtent: H,
    syncViewport: O,
    setClickDistance: J
  };
}
var zl;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(zl || (zl = {}));
function dA({ width: e, prevWidth: a, height: i, prevHeight: l, affectsX: s, affectsY: u }) {
  const c = e - a, d = i - l, p = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && s && (p[0] = p[0] * -1), d && u && (p[1] = p[1] * -1), p;
}
function hb(e) {
  const a = e.includes("right") || e.includes("left"), i = e.includes("bottom") || e.includes("top"), l = e.includes("left"), s = e.includes("top");
  return {
    isHorizontal: a,
    isVertical: i,
    affectsX: l,
    affectsY: s
  };
}
function Qr(e, a) {
  return Math.max(0, a - e);
}
function Kr(e, a) {
  return Math.max(0, e - a);
}
function Uu(e, a, i) {
  return Math.max(0, a - e, e - i);
}
function mb(e, a) {
  return e ? !a : a;
}
function hA(e, a, i, l, s, u, c, d) {
  let { affectsX: p, affectsY: m } = a;
  const { isHorizontal: y, isVertical: g } = a, b = y && g, { xSnapped: x, ySnapped: _ } = i, { minWidth: E, maxWidth: N, minHeight: R, maxHeight: j } = l, { x: C, y: O, width: V, height: B, aspectRatio: U } = e;
  let D = Math.floor(y ? x - e.pointerX : 0), H = Math.floor(g ? _ - e.pointerY : 0);
  const J = V + (p ? -D : D), I = B + (m ? -H : H), Q = -u[0] * V, ae = -u[1] * B;
  let L = Uu(J, E, N), Y = Uu(I, R, j);
  if (c) {
    let F = 0, X = 0;
    p && D < 0 ? F = Qr(C + D + Q, c[0][0]) : !p && D > 0 && (F = Kr(C + J + Q, c[1][0])), m && H < 0 ? X = Qr(O + H + ae, c[0][1]) : !m && H > 0 && (X = Kr(O + I + ae, c[1][1])), L = Math.max(L, F), Y = Math.max(Y, X);
  }
  if (d) {
    let F = 0, X = 0;
    p && D > 0 ? F = Kr(C + D, d[0][0]) : !p && D < 0 && (F = Qr(C + J, d[1][0])), m && H > 0 ? X = Kr(O + H, d[0][1]) : !m && H < 0 && (X = Qr(O + I, d[1][1])), L = Math.max(L, F), Y = Math.max(Y, X);
  }
  if (s) {
    if (y) {
      const F = Uu(J / U, R, j) * U;
      if (L = Math.max(L, F), c) {
        let X = 0;
        !p && !m || p && !m && b ? X = Kr(O + ae + J / U, c[1][1]) * U : X = Qr(O + ae + (p ? D : -D) / U, c[0][1]) * U, L = Math.max(L, X);
      }
      if (d) {
        let X = 0;
        !p && !m || p && !m && b ? X = Qr(O + J / U, d[1][1]) * U : X = Kr(O + (p ? D : -D) / U, d[0][1]) * U, L = Math.max(L, X);
      }
    }
    if (g) {
      const F = Uu(I * U, E, N) / U;
      if (Y = Math.max(Y, F), c) {
        let X = 0;
        !p && !m || m && !p && b ? X = Kr(C + I * U + Q, c[1][0]) / U : X = Qr(C + (m ? H : -H) * U + Q, c[0][0]) / U, Y = Math.max(Y, X);
      }
      if (d) {
        let X = 0;
        !p && !m || m && !p && b ? X = Qr(C + I * U, d[1][0]) / U : X = Kr(C + (m ? H : -H) * U, d[0][0]) / U, Y = Math.max(Y, X);
      }
    }
  }
  H = H + (H < 0 ? Y : -Y), D = D + (D < 0 ? L : -L), s && (b ? J > I * U ? H = (mb(p, m) ? -D : D) / U : D = (mb(p, m) ? -H : H) * U : y ? (H = D / U, m = p) : (D = H * U, p = m));
  const T = p ? C + D : C, z = m ? O + H : O;
  return {
    width: V + (p ? -D : D),
    height: B + (m ? -H : H),
    x: u[0] * D * (p ? -1 : 1) + T,
    y: u[1] * H * (m ? -1 : 1) + z
  };
}
const Aw = { width: 0, height: 0, x: 0, y: 0 }, mA = {
  ...Aw,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function pA(e, a, i) {
  const l = a.position.x + e.position.x, s = a.position.y + e.position.y, u = e.measured.width ?? 0, c = e.measured.height ?? 0, d = i[0] * u, p = i[1] * c;
  return [
    [l - d, s - p],
    [l + u - d, s + c - p]
  ];
}
function gA({ domNode: e, nodeId: a, getStoreItems: i, onChange: l, onEnd: s }) {
  const u = Xn(e);
  let c = {
    controlDirection: hb("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function d({ controlPosition: m, boundaries: y, keepAspectRatio: g, resizeDirection: b, onResizeStart: x, onResize: _, onResizeEnd: E, shouldResize: N }) {
    let R = { ...Aw }, j = { ...mA };
    c = {
      boundaries: y,
      resizeDirection: b,
      keepAspectRatio: g,
      controlDirection: hb(m)
    };
    let C, O = null, V = [], B, U, D, H = !1;
    const J = $1().on("start", (I) => {
      const { nodeLookup: Q, transform: ae, snapGrid: L, snapToGrid: Y, nodeOrigin: T, paneDomNode: z } = i();
      if (C = Q.get(a), !C)
        return;
      O = z?.getBoundingClientRect() ?? null;
      const { xSnapped: F, ySnapped: X } = Fo(I.sourceEvent, {
        transform: ae,
        snapGrid: L,
        snapToGrid: Y,
        containerBounds: O
      });
      R = {
        width: C.measured.width ?? 0,
        height: C.measured.height ?? 0,
        x: C.position.x ?? 0,
        y: C.position.y ?? 0
      }, j = {
        ...R,
        pointerX: F,
        pointerY: X,
        aspectRatio: R.width / R.height
      }, B = void 0, U = Ai(C.extent) ? C.extent : void 0, C.parentId && (C.extent === "parent" || C.expandParent) && (B = Q.get(C.parentId)), B && C.extent === "parent" && (U = [
        [0, 0],
        [B.measured.width, B.measured.height]
      ]), V = [], D = void 0;
      for (const [ne, A] of Q)
        if (A.parentId === a && (V.push({
          id: ne,
          position: { ...A.position },
          extent: A.extent
        }), A.extent === "parent" || A.expandParent)) {
          const k = pA(A, C, A.origin ?? T);
          D ? D = [
            [Math.min(k[0][0], D[0][0]), Math.min(k[0][1], D[0][1])],
            [Math.max(k[1][0], D[1][0]), Math.max(k[1][1], D[1][1])]
          ] : D = k;
        }
      x?.(I, { ...R });
    }).on("drag", (I) => {
      const { transform: Q, snapGrid: ae, snapToGrid: L, nodeOrigin: Y } = i(), T = Fo(I.sourceEvent, {
        transform: Q,
        snapGrid: ae,
        snapToGrid: L,
        containerBounds: O
      }), z = [];
      if (!C)
        return;
      const { x: F, y: X, width: ne, height: A } = R, k = {}, G = C.origin ?? Y, { width: ee, height: se, x: de, y: he } = hA(j, c.controlDirection, T, c.boundaries, c.keepAspectRatio, G, U, D), W = ee !== ne, ve = se !== A, De = de !== F && W, Oe = he !== X && ve;
      if (!De && !Oe && !W && !ve)
        return;
      if ((De || Oe || G[0] === 1 || G[1] === 1) && (k.x = De ? de : R.x, k.y = Oe ? he : R.y, R.x = k.x, R.y = k.y, V.length > 0)) {
        const Ye = de - F, ye = he - X;
        for (const pe of V)
          pe.position = {
            x: pe.position.x - Ye + G[0] * (ee - ne),
            y: pe.position.y - ye + G[1] * (se - A)
          }, z.push(pe);
      }
      if ((W || ve) && (k.width = W && (!c.resizeDirection || c.resizeDirection === "horizontal") ? ee : R.width, k.height = ve && (!c.resizeDirection || c.resizeDirection === "vertical") ? se : R.height, R.width = k.width, R.height = k.height), B && C.expandParent) {
        const Ye = G[0] * (k.width ?? 0);
        k.x && k.x < Ye && (R.x = Ye, j.x = j.x - (k.x - Ye));
        const ye = G[1] * (k.height ?? 0);
        k.y && k.y < ye && (R.y = ye, j.y = j.y - (k.y - ye));
      }
      const Ee = dA({
        width: R.width,
        prevWidth: ne,
        height: R.height,
        prevHeight: A,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), we = { ...R, direction: Ee };
      N?.(I, we) !== !1 && (H = !0, _?.(I, we), l(k, z));
    }).on("end", (I) => {
      H && (E?.(I, { ...R }), s?.({ ...R }), H = !1);
    });
    u.call(J);
  }
  function p() {
    u.on(".drag", null);
  }
  return {
    update: d,
    destroy: p
  };
}
var wh = { exports: {} }, _h = {}, Sh = { exports: {} }, Eh = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pb;
function vA() {
  if (pb) return Eh;
  pb = 1;
  var e = us();
  function a(g, b) {
    return g === b && (g !== 0 || 1 / g === 1 / b) || g !== g && b !== b;
  }
  var i = typeof Object.is == "function" ? Object.is : a, l = e.useState, s = e.useEffect, u = e.useLayoutEffect, c = e.useDebugValue;
  function d(g, b) {
    var x = b(), _ = l({ inst: { value: x, getSnapshot: b } }), E = _[0].inst, N = _[1];
    return u(
      function() {
        E.value = x, E.getSnapshot = b, p(E) && N({ inst: E });
      },
      [g, x, b]
    ), s(
      function() {
        return p(E) && N({ inst: E }), g(function() {
          p(E) && N({ inst: E });
        });
      },
      [g]
    ), c(x), x;
  }
  function p(g) {
    var b = g.getSnapshot;
    g = g.value;
    try {
      var x = b();
      return !i(g, x);
    } catch {
      return !0;
    }
  }
  function m(g, b) {
    return b();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? m : d;
  return Eh.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : y, Eh;
}
var gb;
function jw() {
  return gb || (gb = 1, Sh.exports = vA()), Sh.exports;
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
var vb;
function yA() {
  if (vb) return _h;
  vb = 1;
  var e = us(), a = jw();
  function i(m, y) {
    return m === y && (m !== 0 || 1 / m === 1 / y) || m !== m && y !== y;
  }
  var l = typeof Object.is == "function" ? Object.is : i, s = a.useSyncExternalStore, u = e.useRef, c = e.useEffect, d = e.useMemo, p = e.useDebugValue;
  return _h.useSyncExternalStoreWithSelector = function(m, y, g, b, x) {
    var _ = u(null);
    if (_.current === null) {
      var E = { hasValue: !1, value: null };
      _.current = E;
    } else E = _.current;
    _ = d(
      function() {
        function R(B) {
          if (!j) {
            if (j = !0, C = B, B = b(B), x !== void 0 && E.hasValue) {
              var U = E.value;
              if (x(U, B))
                return O = U;
            }
            return O = B;
          }
          if (U = O, l(C, B)) return U;
          var D = b(B);
          return x !== void 0 && x(U, D) ? (C = B, U) : (C = B, O = D);
        }
        var j = !1, C, O, V = g === void 0 ? null : g;
        return [
          function() {
            return R(y());
          },
          V === null ? void 0 : function() {
            return R(V());
          }
        ];
      },
      [y, g, b, x]
    );
    var N = s(m, _[0], _[1]);
    return c(
      function() {
        E.hasValue = !0, E.value = N;
      },
      [N]
    ), p(N), N;
  }, _h;
}
var yb;
function bA() {
  return yb || (yb = 1, wh.exports = yA()), wh.exports;
}
var xA = bA();
const wA = /* @__PURE__ */ wm(xA), _A = {}, bb = (e) => {
  let a;
  const i = /* @__PURE__ */ new Set(), l = (y, g) => {
    const b = typeof y == "function" ? y(a) : y;
    if (!Object.is(b, a)) {
      const x = a;
      a = g ?? (typeof b != "object" || b === null) ? b : Object.assign({}, a, b), i.forEach((_) => _(a, x));
    }
  }, s = () => a, p = { setState: l, getState: s, getInitialState: () => m, subscribe: (y) => (i.add(y), () => i.delete(y)), destroy: () => {
    (_A ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), i.clear();
  } }, m = a = e(l, s, p);
  return p;
}, SA = (e) => e ? bb(e) : bb, { useDebugValue: EA } = be, { useSyncExternalStoreWithSelector: NA } = wA, CA = (e) => e;
function Ow(e, a = CA, i) {
  const l = NA(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    a,
    i
  );
  return EA(l), l;
}
const xb = (e, a) => {
  const i = SA(e), l = (s, u = a) => Ow(i, s, u);
  return Object.assign(l, i), l;
}, RA = (e, a) => e ? xb(e, a) : xb;
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
  const i = Object.keys(e);
  if (i.length !== Object.keys(a).length)
    return !1;
  for (const l of i)
    if (!Object.prototype.hasOwnProperty.call(a, l) || !Object.is(e[l], a[l]))
      return !1;
  return !0;
}
var TA = Yx();
const MA = /* @__PURE__ */ wm(TA), Gc = S.createContext(null), DA = Gc.Provider, zw = Ra.error001("react");
function st(e, a) {
  const i = S.useContext(Gc);
  if (i === null)
    throw new Error(zw);
  return Ow(i, e, a);
}
function jt() {
  const e = S.useContext(Gc);
  if (e === null)
    throw new Error(zw);
  return S.useMemo(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const wb = { display: "none" }, AA = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Lw = "react-flow__node-desc", kw = "react-flow__edge-desc", jA = "react-flow__aria-live", OA = (e) => e.ariaLiveMessage, zA = (e) => e.ariaLabelConfig;
function LA({ rfId: e }) {
  const a = st(OA);
  return v.jsx("div", { id: `${jA}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: AA, children: a });
}
function kA({ rfId: e, disableKeyboardA11y: a }) {
  const i = st(zA);
  return v.jsxs(v.Fragment, { children: [v.jsx("div", { id: `${Lw}-${e}`, style: wb, children: a ? i["node.a11yDescription.default"] : i["node.a11yDescription.keyboardDisabled"] }), v.jsx("div", { id: `${kw}-${e}`, style: wb, children: i["edge.a11yDescription.default"] }), !a && v.jsx(LA, { rfId: e })] });
}
const Fc = S.forwardRef(({ position: e = "top-left", children: a, className: i, style: l, ...s }, u) => {
  const c = `${e}`.split("-");
  return v.jsx("div", { className: Zt(["react-flow__panel", i, ...c]), style: l, ref: u, ...s, children: a });
});
Fc.displayName = "Panel";
function HA({ proOptions: e, position: a = "bottom-right" }) {
  return e?.hideAttribution ? null : v.jsx(Fc, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: v.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const BA = (e) => {
  const a = [], i = [];
  for (const [, l] of e.nodeLookup)
    l.selected && a.push(l.internals.userNode);
  for (const [, l] of e.edgeLookup)
    l.selected && i.push(l);
  return { selectedNodes: a, selectedEdges: i };
}, Vu = (e) => e.id;
function UA(e, a) {
  return At(e.selectedNodes.map(Vu), a.selectedNodes.map(Vu)) && At(e.selectedEdges.map(Vu), a.selectedEdges.map(Vu));
}
function VA({ onSelectionChange: e }) {
  const a = jt(), { selectedNodes: i, selectedEdges: l } = st(BA, UA);
  return S.useEffect(() => {
    const s = { nodes: i, edges: l };
    e?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [i, l, e]), null;
}
const $A = (e) => !!e.onSelectionChangeHandlers;
function qA({ onSelectionChange: e }) {
  const a = st($A);
  return e || a ? v.jsx(VA, { onSelectionChange: e }) : null;
}
const Hw = [0, 0], IA = { x: 0, y: 0, zoom: 1 }, YA = [
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
], _b = [...YA, "rfId"], GA = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), Sb = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: es,
  nodeOrigin: Hw,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function FA(e) {
  const { setNodes: a, setEdges: i, setMinZoom: l, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: p } = st(GA, At), m = jt();
  S.useEffect(() => (p(e.defaultNodes, e.defaultEdges), () => {
    y.current = Sb, d();
  }), []);
  const y = S.useRef(Sb);
  return S.useEffect(
    () => {
      for (const g of _b) {
        const b = e[g], x = y.current[g];
        b !== x && (typeof e[g] > "u" || (g === "nodes" ? a(b) : g === "edges" ? i(b) : g === "minZoom" ? l(b) : g === "maxZoom" ? s(b) : g === "translateExtent" ? u(b) : g === "nodeExtent" ? c(b) : g === "ariaLabelConfig" ? m.setState({ ariaLabelConfig: MD(b) }) : g === "fitView" ? m.setState({ fitViewQueued: b }) : g === "fitViewOptions" ? m.setState({ fitViewOptions: b }) : m.setState({ [g]: b })));
      }
      y.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    _b.map((g) => e[g])
  ), null;
}
function Eb() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function XA(e) {
  const [a, i] = S.useState(e === "system" ? null : e);
  return S.useEffect(() => {
    if (e !== "system") {
      i(e);
      return;
    }
    const l = Eb(), s = () => i(l?.matches ? "dark" : "light");
    return s(), l?.addEventListener("change", s), () => {
      l?.removeEventListener("change", s);
    };
  }, [e]), a !== null ? a : Eb()?.matches ? "dark" : "light";
}
const Nb = typeof document < "u" ? document : null;
function rs(e = null, a = { target: Nb, actInsideInputWithModifier: !0 }) {
  const [i, l] = S.useState(!1), s = S.useRef(!1), u = S.useRef(/* @__PURE__ */ new Set([])), [c, d] = S.useMemo(() => {
    if (e !== null) {
      const m = (Array.isArray(e) ? e : [e]).filter((g) => typeof g == "string").map((g) => g.replace("+", `
`).replace(`

`, `
+`).split(`
`)), y = m.reduce((g, b) => g.concat(...b), []);
      return [m, y];
    }
    return [[], []];
  }, [e]);
  return S.useEffect(() => {
    const p = a?.target ?? Nb, m = a?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !m) && pw(x))
          return !1;
        const E = Rb(x.code, d);
        if (u.current.add(x[E]), Cb(c, u.current, !1)) {
          const N = x.composedPath?.()?.[0] || x.target, R = N?.nodeName === "BUTTON" || N?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !R) && x.preventDefault(), l(!0);
        }
      }, g = (x) => {
        const _ = Rb(x.code, d);
        Cb(c, u.current, !0) ? (l(!1), u.current.clear()) : u.current.delete(x[_]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, b = () => {
        u.current.clear(), l(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", g), window.addEventListener("blur", b), window.addEventListener("contextmenu", b), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", g), window.removeEventListener("blur", b), window.removeEventListener("contextmenu", b);
      };
    }
  }, [e, l]), i;
}
function Cb(e, a, i) {
  return e.filter((l) => i || l.length === a.size).some((l) => l.every((s) => a.has(s)));
}
function Rb(e, a) {
  return a.includes(e) ? "code" : "key";
}
const PA = () => {
  const e = jt();
  return S.useMemo(() => ({
    zoomIn: async (a) => {
      const { panZoom: i } = e.getState();
      return i ? i.scaleBy(1.2, a) : !1;
    },
    zoomOut: async (a) => {
      const { panZoom: i } = e.getState();
      return i ? i.scaleBy(1 / 1.2, a) : !1;
    },
    zoomTo: async (a, i) => {
      const { panZoom: l } = e.getState();
      return l ? l.scaleTo(a, i) : !1;
    },
    getZoom: () => e.getState().transform[2],
    setViewport: async (a, i) => {
      const { transform: [l, s, u], panZoom: c } = e.getState();
      return c ? (await c.setViewport({
        x: a.x ?? l,
        y: a.y ?? s,
        zoom: a.zoom ?? u
      }, i), !0) : !1;
    },
    getViewport: () => {
      const [a, i, l] = e.getState().transform;
      return { x: a, y: i, zoom: l };
    },
    setCenter: async (a, i, l) => e.getState().setCenter(a, i, l),
    fitBounds: async (a, i) => {
      const { width: l, height: s, minZoom: u, maxZoom: c, panZoom: d } = e.getState(), p = Xm(a, l, s, u, c, i?.padding ?? 0.1);
      return d ? (await d.setViewport(p, {
        duration: i?.duration,
        ease: i?.ease,
        interpolate: i?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (a, i = {}) => {
      const { transform: l, snapGrid: s, snapToGrid: u, domNode: c } = e.getState();
      if (!c)
        return a;
      const { x: d, y: p } = c.getBoundingClientRect(), m = {
        x: a.x - d,
        y: a.y - p
      }, y = i.snapGrid ?? s, g = i.snapToGrid ?? u;
      return Ul(m, l, g, y);
    },
    flowToScreenPosition: (a) => {
      const { transform: i, domNode: l } = e.getState();
      if (!l)
        return a;
      const { x: s, y: u } = l.getBoundingClientRect(), c = Ol(a, i);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function Bw(e, a) {
  const i = [], l = /* @__PURE__ */ new Map(), s = [];
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
      i.push(u);
      continue;
    }
    if (c[0].type === "remove")
      continue;
    if (c[0].type === "replace") {
      i.push({ ...c[0].item });
      continue;
    }
    const d = { ...u };
    for (const p of c)
      ZA(p, d);
    i.push(d);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? i.splice(u.index, 0, { ...u.item }) : i.push({ ...u.item });
  }), i;
}
function ZA(e, a) {
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
function QA(e, a) {
  return Bw(e, a);
}
function KA(e, a) {
  return Bw(e, a);
}
function wi(e, a) {
  return {
    id: e,
    type: "select",
    selected: a
  };
}
function Sl(e, a = /* @__PURE__ */ new Set(), i = !1) {
  const l = [];
  for (const [s, u] of e) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (i && (u.selected = c), l.push(wi(u.id, c)));
  }
  return l;
}
function Tb({ items: e = [], lookup: a }) {
  const i = [], l = new Map(e.map((s) => [s.id, s]));
  for (const [s, u] of e.entries()) {
    const c = a.get(u.id), d = c?.internals?.userNode ?? c;
    d !== void 0 && d !== u && i.push({ id: u.id, item: u, type: "replace" }), d === void 0 && i.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    l.get(s) === void 0 && i.push({ id: s, type: "remove" });
  return i;
}
function Mb(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const WA = fw();
function JA(e, a, i = {}) {
  return LD(e, a, {
    ...i,
    onError: i.onError ?? WA
  });
}
const Db = (e) => xD(e), ej = (e) => ow(e);
function Uw(e) {
  return S.forwardRef(e);
}
const tj = typeof window < "u" ? S.useLayoutEffect : S.useEffect;
function Ab(e) {
  const [a, i] = S.useState(BigInt(0)), [l] = S.useState(() => nj(() => i((s) => s + BigInt(1))));
  return tj(() => {
    const s = l.get();
    s.length && (e(s), l.reset());
  }, [a]), l;
}
function nj(e) {
  let a = [];
  return {
    get: () => a,
    reset: () => {
      a = [];
    },
    push: (i) => {
      a.push(i), e();
    }
  };
}
const Vw = S.createContext(null);
function aj({ children: e }) {
  const a = jt(), i = S.useCallback((d) => {
    const { nodes: p = [], setNodes: m, hasDefaultNodes: y, onNodesChange: g, nodeLookup: b, fitViewQueued: x, onNodesChangeMiddlewareMap: _ } = a.getState();
    let E = p;
    for (const R of d)
      E = typeof R == "function" ? R(E) : R;
    let N = Tb({
      items: E,
      lookup: b
    });
    for (const R of _.values())
      N = R(N);
    y && m(E), N.length > 0 ? g?.(N) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: R, nodes: j, setNodes: C } = a.getState();
      R && C(j);
    });
  }, []), l = Ab(i), s = S.useCallback((d) => {
    const { edges: p = [], setEdges: m, hasDefaultEdges: y, onEdgesChange: g, edgeLookup: b } = a.getState();
    let x = p;
    for (const _ of d)
      x = typeof _ == "function" ? _(x) : _;
    y ? m(x) : g && g(Tb({
      items: x,
      lookup: b
    }));
  }, []), u = Ab(s), c = S.useMemo(() => ({ nodeQueue: l, edgeQueue: u }), []);
  return v.jsx(Vw.Provider, { value: c, children: e });
}
function rj() {
  const e = S.useContext(Vw);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const ij = (e) => !!e.panZoom;
function ep() {
  const e = PA(), a = jt(), i = rj(), l = st(ij), s = S.useMemo(() => {
    const u = (g) => a.getState().nodeLookup.get(g), c = (g) => {
      i.nodeQueue.push(g);
    }, d = (g) => {
      i.edgeQueue.push(g);
    }, p = (g) => {
      const { nodeLookup: b, nodeOrigin: x } = a.getState(), _ = Db(g) ? g : b.get(g.id), E = _.parentId ? hw(_.position, _.measured, _.parentId, b, x) : _.position, N = {
        ..._,
        position: E,
        width: _.measured?.width ?? _.width,
        height: _.measured?.height ?? _.height
      };
      return jl(N);
    }, m = (g, b, x = { replace: !1 }) => {
      c((_) => _.map((E) => {
        if (E.id === g) {
          const N = typeof b == "function" ? b(E) : b;
          return x.replace && Db(N) ? N : { ...E, ...N };
        }
        return E;
      }));
    }, y = (g, b, x = { replace: !1 }) => {
      d((_) => _.map((E) => {
        if (E.id === g) {
          const N = typeof b == "function" ? b(E) : b;
          return x.replace && ej(N) ? N : { ...E, ...N };
        }
        return E;
      }));
    };
    return {
      getNodes: () => a.getState().nodes.map((g) => ({ ...g })),
      getNode: (g) => u(g)?.internals.userNode,
      getInternalNode: u,
      getEdges: () => {
        const { edges: g = [] } = a.getState();
        return g.map((b) => ({ ...b }));
      },
      getEdge: (g) => a.getState().edgeLookup.get(g),
      setNodes: c,
      setEdges: d,
      addNodes: (g) => {
        const b = Array.isArray(g) ? g : [g];
        i.nodeQueue.push((x) => [...x, ...b]);
      },
      addEdges: (g) => {
        const b = Array.isArray(g) ? g : [g];
        i.edgeQueue.push((x) => [...x, ...b]);
      },
      toObject: () => {
        const { nodes: g = [], edges: b = [], transform: x } = a.getState(), [_, E, N] = x;
        return {
          nodes: g.map((R) => ({ ...R })),
          edges: b.map((R) => ({ ...R })),
          viewport: {
            x: _,
            y: E,
            zoom: N
          }
        };
      },
      deleteElements: async ({ nodes: g = [], edges: b = [] }) => {
        const { nodes: x, edges: _, onNodesDelete: E, onEdgesDelete: N, triggerNodeChanges: R, triggerEdgeChanges: j, onDelete: C, onBeforeDelete: O } = a.getState(), { nodes: V, edges: B } = await ND({
          nodesToRemove: g,
          edgesToRemove: b,
          nodes: x,
          edges: _,
          onBeforeDelete: O
        }), U = B.length > 0, D = V.length > 0;
        if (U) {
          const H = B.map(Mb);
          N?.(B), j(H);
        }
        if (D) {
          const H = V.map(Mb);
          E?.(V), R(H);
        }
        return (D || U) && C?.({ nodes: V, edges: B }), { deletedNodes: V, deletedEdges: B };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (g, b = !0, x) => {
        const _ = nb(g), E = _ ? g : p(g), N = x !== void 0;
        return E ? (x || a.getState().nodes).filter((R) => {
          const j = a.getState().nodeLookup.get(R.id);
          if (j && !_ && (R.id === g.id || !j.internals.positionAbsolute))
            return !1;
          const C = jl(N ? R : j), O = ns(C, E);
          return b && O > 0 || O >= C.width * C.height || O >= E.width * E.height;
        }) : [];
      },
      isNodeIntersecting: (g, b, x = !0) => {
        const E = nb(g) ? g : p(g);
        if (!E)
          return !1;
        const N = ns(E, b);
        return x && N > 0 || N >= b.width * b.height || N >= E.width * E.height;
      },
      updateNode: m,
      updateNodeData: (g, b, x = { replace: !1 }) => {
        m(g, (_) => {
          const E = typeof b == "function" ? b(_) : b;
          return x.replace ? { ..._, data: E } : { ..._, data: { ..._.data, ...E } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (g, b, x = { replace: !1 }) => {
        y(g, (_) => {
          const E = typeof b == "function" ? b(_) : b;
          return x.replace ? { ..._, data: E } : { ..._, data: { ..._.data, ...E } };
        }, x);
      },
      getNodesBounds: (g) => {
        const { nodeLookup: b, nodeOrigin: x } = a.getState();
        return wD(g, { nodeLookup: b, nodeOrigin: x });
      },
      getHandleConnections: ({ type: g, id: b, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${g}${b ? `-${b}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: g, handleId: b, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${g ? b ? `-${g}-${b}` : `-${g}` : ""}`)?.values() ?? []),
      fitView: async (g) => {
        const b = a.getState().fitViewResolver ?? TD();
        return a.setState({ fitViewQueued: !0, fitViewOptions: g, fitViewResolver: b }), i.nodeQueue.push((x) => [...x]), b.promise;
      }
    };
  }, []);
  return S.useMemo(() => ({
    ...s,
    ...e,
    viewportInitialized: l
  }), [l]);
}
const jb = (e) => e.selected, lj = typeof window < "u" ? window : void 0;
function oj({ deleteKeyCode: e, multiSelectionKeyCode: a }) {
  const i = jt(), { deleteElements: l } = ep(), s = rs(e, { actInsideInputWithModifier: !1 }), u = rs(a, { target: lj });
  S.useEffect(() => {
    if (s) {
      const { edges: c, nodes: d } = i.getState();
      l({ nodes: d.filter(jb), edges: c.filter(jb) }), i.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), S.useEffect(() => {
    i.setState({ multiSelectionActive: u });
  }, [u]);
}
function sj(e) {
  const a = jt();
  S.useEffect(() => {
    const i = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const l = Pm(e.current);
      (l.height === 0 || l.width === 0) && a.getState().onError?.("004", Ra.error004()), a.setState({ width: l.width || 500, height: l.height || 500 });
    };
    if (e.current) {
      i(), window.addEventListener("resize", i);
      const l = new ResizeObserver(() => i());
      return l.observe(e.current), () => {
        window.removeEventListener("resize", i), l && e.current && l.unobserve(e.current);
      };
    }
  }, []);
}
const Xc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, uj = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function cj({ onPaneContextMenu: e, zoomOnScroll: a = !0, zoomOnPinch: i = !0, panOnScroll: l = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = Ni.Free, zoomOnDoubleClick: c = !0, panOnDrag: d = !0, defaultViewport: p, translateExtent: m, minZoom: y, maxZoom: g, zoomActivationKeyCode: b, preventScrolling: x = !0, children: _, noWheelClassName: E, noPanClassName: N, onViewportChange: R, isControlledViewport: j, paneClickDistance: C, selectionOnDrag: O }) {
  const V = jt(), B = S.useRef(null), { userSelectionActive: U, lib: D, connectionInProgress: H } = st(uj, At), J = rs(b), I = S.useRef();
  sj(B);
  const Q = S.useCallback((ae) => {
    R?.({ x: ae[0], y: ae[1], zoom: ae[2] }), j || V.setState({ transform: ae });
  }, [R, j]);
  return S.useEffect(() => {
    if (B.current) {
      I.current = fA({
        domNode: B.current,
        minZoom: y,
        maxZoom: g,
        translateExtent: m,
        viewport: p,
        onDraggingChange: (T) => V.setState((z) => z.paneDragging === T ? z : { paneDragging: T }),
        onPanZoomStart: (T, z) => {
          const { onViewportChangeStart: F, onMoveStart: X } = V.getState();
          X?.(T, z), F?.(z);
        },
        onPanZoom: (T, z) => {
          const { onViewportChange: F, onMove: X } = V.getState();
          X?.(T, z), F?.(z);
        },
        onPanZoomEnd: (T, z) => {
          const { onViewportChangeEnd: F, onMoveEnd: X } = V.getState();
          X?.(T, z), F?.(z);
        }
      });
      const { x: ae, y: L, zoom: Y } = I.current.getViewport();
      return V.setState({
        panZoom: I.current,
        transform: [ae, L, Y],
        domNode: B.current.closest(".react-flow")
      }), () => {
        I.current?.destroy();
      };
    }
  }, []), S.useEffect(() => {
    I.current?.update({
      onPaneContextMenu: e,
      zoomOnScroll: a,
      zoomOnPinch: i,
      panOnScroll: l,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: c,
      panOnDrag: d,
      zoomActivationKeyPressed: J,
      preventScrolling: x,
      noPanClassName: N,
      userSelectionActive: U,
      noWheelClassName: E,
      lib: D,
      onTransformChange: Q,
      connectionInProgress: H,
      selectionOnDrag: O,
      paneClickDistance: C
    });
  }, [
    e,
    a,
    i,
    l,
    s,
    u,
    c,
    d,
    J,
    x,
    N,
    U,
    E,
    D,
    Q,
    H,
    O,
    C
  ]), v.jsx("div", { className: "react-flow__renderer", ref: B, style: Xc, children: _ });
}
const fj = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function dj() {
  const { userSelectionActive: e, userSelectionRect: a } = st(fj, At);
  return e && a ? v.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const Nh = (e, a) => (i) => {
  i.target === a.current && e?.(i);
}, hj = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function mj({ isSelecting: e, selectionKeyPressed: a, selectionMode: i = ts.Full, panOnDrag: l, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: d, onSelectionEnd: p, onPaneClick: m, onPaneContextMenu: y, onPaneScroll: g, onPaneMouseEnter: b, onPaneMouseMove: x, onPaneMouseLeave: _, children: E }) {
  const N = S.useRef(0), R = jt(), { userSelectionActive: j, elementsSelectable: C, dragging: O, connectionInProgress: V, panBy: B, autoPanSpeed: U } = st(hj, At), D = C && (e || j), H = S.useRef(null), J = S.useRef(), I = S.useRef(/* @__PURE__ */ new Set()), Q = S.useRef(/* @__PURE__ */ new Set()), ae = S.useRef(!1), L = S.useRef({ x: 0, y: 0 }), Y = S.useRef(!1), T = (W) => {
    if (ae.current || V) {
      ae.current = !1;
      return;
    }
    m?.(W), R.getState().resetSelectedElements(), R.setState({ nodesSelectionActive: !1 });
  }, z = (W) => {
    if (Array.isArray(l) && l?.includes(2)) {
      W.preventDefault();
      return;
    }
    y?.(W);
  }, F = g ? (W) => g(W) : void 0, X = (W) => {
    ae.current && (W.stopPropagation(), ae.current = !1);
  }, ne = (W) => {
    const { domNode: ve, transform: De } = R.getState();
    if (J.current = ve?.getBoundingClientRect(), !J.current)
      return;
    const Oe = W.target === H.current;
    if (!Oe && !!W.target.closest(".nokey") || !e || !(c && Oe || a) || W.button !== 0 || !W.isPrimary)
      return;
    W.target?.setPointerCapture?.(W.pointerId), ae.current = !1;
    const { x: Me, y: Ye } = Ca(W.nativeEvent, J.current), ye = Ul({ x: Me, y: Ye }, De);
    R.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ye.x,
        startY: ye.y,
        x: Me,
        y: Ye
      }
    }), Oe || (W.stopPropagation(), W.preventDefault());
  };
  function A(W, ve) {
    const { userSelectionRect: De } = R.getState();
    if (!De)
      return;
    const { transform: Oe, nodeLookup: Ee, edgeLookup: we, connectionLookup: Me, triggerNodeChanges: Ye, triggerEdgeChanges: ye, defaultEdgeOptions: pe } = R.getState(), _e = { x: De.startX, y: De.startY }, { x: Re, y: Ae } = Ol(_e, Oe), lt = {
      startX: _e.x,
      startY: _e.y,
      x: W < Re ? W : Re,
      y: ve < Ae ? ve : Ae,
      width: Math.abs(W - Re),
      height: Math.abs(ve - Ae)
    }, Ze = I.current, Fe = Q.current;
    I.current = new Set(Gm(Ee, lt, Oe, i === ts.Partial, !0).map((vt) => vt.id)), Q.current = /* @__PURE__ */ new Set();
    const Ke = pe?.selectable ?? !0;
    for (const vt of I.current) {
      const yt = Me.get(vt);
      if (yt)
        for (const { edgeId: Yt } of yt.values()) {
          const Lt = we.get(Yt);
          Lt && (Lt.selectable ?? Ke) && Q.current.add(Yt);
        }
    }
    if (!ab(Ze, I.current)) {
      const vt = Sl(Ee, I.current, !0);
      Ye(vt);
    }
    if (!ab(Fe, Q.current)) {
      const vt = Sl(we, Q.current);
      ye(vt);
    }
    R.setState({
      userSelectionRect: lt,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function k() {
    if (!s || !J.current)
      return;
    const [W, ve] = Fm(L.current, J.current, U);
    B({ x: W, y: ve }).then((De) => {
      if (!ae.current || !De) {
        N.current = requestAnimationFrame(k);
        return;
      }
      const { x: Oe, y: Ee } = L.current;
      A(Oe, Ee), N.current = requestAnimationFrame(k);
    });
  }
  const G = () => {
    cancelAnimationFrame(N.current), N.current = 0, Y.current = !1;
  };
  S.useEffect(() => () => G(), []);
  const ee = (W) => {
    const { userSelectionRect: ve, transform: De, resetSelectedElements: Oe } = R.getState();
    if (!J.current || !ve)
      return;
    const { x: Ee, y: we } = Ca(W.nativeEvent, J.current);
    L.current = { x: Ee, y: we };
    const Me = Ol({ x: ve.startX, y: ve.startY }, De);
    if (!ae.current) {
      const Ye = a ? 0 : u;
      if (Math.hypot(Ee - Me.x, we - Me.y) <= Ye)
        return;
      Oe(), d?.(W);
    }
    ae.current = !0, Y.current || (k(), Y.current = !0), A(Ee, we);
  }, se = (W) => {
    W.button === 0 && (W.target?.releasePointerCapture?.(W.pointerId), !j && W.target === H.current && R.getState().userSelectionRect && T?.(W), R.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), ae.current && (p?.(W), R.setState({
      nodesSelectionActive: I.current.size > 0
    })), G());
  }, de = (W) => {
    W.target?.releasePointerCapture?.(W.pointerId), G();
  }, he = l === !0 || Array.isArray(l) && l.includes(0);
  return v.jsxs("div", { className: Zt(["react-flow__pane", { draggable: he, dragging: O, selection: e }]), onClick: D ? void 0 : Nh(T, H), onContextMenu: Nh(z, H), onWheel: Nh(F, H), onPointerEnter: D ? void 0 : b, onPointerMove: D ? ee : x, onPointerUp: D ? se : void 0, onPointerCancel: D ? de : void 0, onPointerDownCapture: D ? ne : void 0, onClickCapture: D ? X : void 0, onPointerLeave: _, ref: H, style: Xc, children: [E, v.jsx(dj, {})] });
}
function im({ id: e, store: a, unselect: i = !1, nodeRef: l }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: d, onError: p } = a.getState(), m = d.get(e);
  if (!m) {
    p?.("012", Ra.error012(e));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), m.selected ? (i || m.selected && c) && (u({ nodes: [m], edges: [] }), requestAnimationFrame(() => l?.current?.blur())) : s([e]);
}
function $w({ nodeRef: e, disabled: a = !1, noDragClassName: i, handleSelector: l, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const d = jt(), [p, m] = S.useState(!1), y = S.useRef();
  return S.useEffect(() => {
    y.current = KD({
      getStoreItems: () => d.getState(),
      onNodeMouseDown: (g) => {
        im({
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
  }, []), S.useEffect(() => {
    if (!(a || !e.current || !y.current))
      return y.current.update({
        noDragClassName: i,
        handleSelector: l,
        domNode: e.current,
        isSelectable: u,
        nodeId: s,
        nodeClickDistance: c
      }), () => {
        y.current?.destroy();
      };
  }, [i, l, a, u, e, s, c]), p;
}
const pj = (e) => (a) => a.selected && (a.draggable || e && typeof a.draggable > "u");
function qw() {
  const e = jt();
  return S.useCallback((i) => {
    const { nodeExtent: l, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: d, updateNodePositions: p, nodeLookup: m, nodeOrigin: y } = e.getState(), g = /* @__PURE__ */ new Map(), b = pj(c), x = s ? u[0] : 5, _ = s ? u[1] : 5, E = i.direction.x * x * i.factor, N = i.direction.y * _ * i.factor;
    for (const [, R] of m) {
      if (!b(R))
        continue;
      let j = {
        x: R.internals.positionAbsolute.x + E,
        y: R.internals.positionAbsolute.y + N
      };
      s && (j = ys(j, u));
      const { position: C, positionAbsolute: O } = sw({
        nodeId: R.id,
        nextPosition: j,
        nodeLookup: m,
        nodeExtent: l,
        nodeOrigin: y,
        onError: d
      });
      R.position = C, R.internals.positionAbsolute = O, g.set(R.id, R);
    }
    p(g);
  }, []);
}
const tp = S.createContext(null), gj = tp.Provider;
tp.Consumer;
const Iw = () => S.useContext(tp), vj = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), yj = (e, a, i) => (l) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = l, { fromHandle: d, toHandle: p, isValid: m } = c, y = p?.nodeId === e && p?.id === a && p?.type === i;
  return {
    connectingFrom: d?.nodeId === e && d?.id === a && d?.type === i,
    connectingTo: y,
    clickConnecting: s?.nodeId === e && s?.id === a && s?.type === i,
    isPossibleEndHandle: u === Dl.Strict ? d?.type !== i : e !== d?.nodeId || a !== d?.id,
    connectionInProcess: !!d,
    clickConnectionInProcess: !!s,
    valid: y && m
  };
};
function bj({ type: e = "source", position: a = ke.Top, isValidConnection: i, isConnectable: l = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: d, children: p, className: m, onMouseDown: y, onTouchStart: g, ...b }, x) {
  const _ = c || null, E = e === "target", N = jt(), R = Iw(), { connectOnClick: j, noPanClassName: C, rfId: O } = st(vj, At), { connectingFrom: V, connectingTo: B, clickConnecting: U, isPossibleEndHandle: D, connectionInProcess: H, clickConnectionInProcess: J, valid: I } = st(yj(R, _, e), At);
  R || N.getState().onError?.("010", Ra.error010());
  const Q = (Y) => {
    const { defaultEdgeOptions: T, onConnect: z, hasDefaultEdges: F } = N.getState(), X = {
      ...T,
      ...Y
    };
    if (F) {
      const { edges: ne, setEdges: A, onError: k } = N.getState();
      A(JA(X, ne, { onError: k }));
    }
    z?.(X), d?.(X);
  }, ae = (Y) => {
    if (!R)
      return;
    const T = gw(Y.nativeEvent);
    if (s && (T && Y.button === 0 || !T)) {
      const z = N.getState();
      rm.onPointerDown(Y.nativeEvent, {
        handleDomNode: Y.currentTarget,
        autoPanOnConnect: z.autoPanOnConnect,
        connectionMode: z.connectionMode,
        connectionRadius: z.connectionRadius,
        domNode: z.domNode,
        nodeLookup: z.nodeLookup,
        lib: z.lib,
        isTarget: E,
        handleId: _,
        nodeId: R,
        flowId: z.rfId,
        panBy: z.panBy,
        cancelConnection: z.cancelConnection,
        onConnectStart: z.onConnectStart,
        onConnectEnd: (...F) => N.getState().onConnectEnd?.(...F),
        updateConnection: z.updateConnection,
        onConnect: Q,
        isValidConnection: i || ((...F) => N.getState().isValidConnection?.(...F) ?? !0),
        getTransform: () => N.getState().transform,
        getFromHandle: () => N.getState().connection.fromHandle,
        autoPanSpeed: z.autoPanSpeed,
        dragThreshold: z.connectionDragThreshold
      });
    }
    T ? y?.(Y) : g?.(Y);
  }, L = (Y) => {
    const { onClickConnectStart: T, onClickConnectEnd: z, connectionClickStartHandle: F, connectionMode: X, isValidConnection: ne, lib: A, rfId: k, nodeLookup: G, connection: ee } = N.getState();
    if (!R || !F && !s)
      return;
    if (!F) {
      T?.(Y.nativeEvent, { nodeId: R, handleId: _, handleType: e }), N.setState({ connectionClickStartHandle: { nodeId: R, type: e, id: _ } });
      return;
    }
    const se = mw(Y.target), de = i || ne, { connection: he, isValid: W } = rm.isValid(Y.nativeEvent, {
      handle: {
        nodeId: R,
        id: _,
        type: e
      },
      connectionMode: X,
      fromNodeId: F.nodeId,
      fromHandleId: F.id || null,
      fromType: F.type,
      isValidConnection: de,
      flowId: k,
      doc: se,
      lib: A,
      nodeLookup: G
    });
    W && he && Q(he);
    const ve = structuredClone(ee);
    delete ve.inProgress, ve.toPosition = ve.toHandle ? ve.toHandle.position : null, z?.(Y, ve), N.setState({ connectionClickStartHandle: null });
  };
  return v.jsx("div", { "data-handleid": _, "data-nodeid": R, "data-handlepos": a, "data-id": `${O}-${R}-${_}-${e}`, className: Zt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    C,
    m,
    {
      source: !E,
      target: E,
      connectable: l,
      connectablestart: s,
      connectableend: u,
      clickconnecting: U,
      connectingfrom: V,
      connectingto: B,
      valid: I,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: l && (!H || D) && (H || J ? u : s)
    }
  ]), onMouseDown: ae, onTouchStart: ae, onClick: j ? L : void 0, ref: x, ...b, children: p });
}
const Ll = S.memo(Uw(bj));
function xj({ data: e, isConnectable: a, sourcePosition: i = ke.Bottom }) {
  return v.jsxs(v.Fragment, { children: [e?.label, v.jsx(Ll, { type: "source", position: i, isConnectable: a })] });
}
function wj({ data: e, isConnectable: a, targetPosition: i = ke.Top, sourcePosition: l = ke.Bottom }) {
  return v.jsxs(v.Fragment, { children: [v.jsx(Ll, { type: "target", position: i, isConnectable: a }), e?.label, v.jsx(Ll, { type: "source", position: l, isConnectable: a })] });
}
function _j() {
  return null;
}
function Sj({ data: e, isConnectable: a, targetPosition: i = ke.Top }) {
  return v.jsxs(v.Fragment, { children: [v.jsx(Ll, { type: "target", position: i, isConnectable: a }), e?.label] });
}
const Nc = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Ob = {
  input: xj,
  default: wj,
  output: Sj,
  group: _j
};
function Ej(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const Nj = (e) => {
  const { width: a, height: i, x: l, y: s } = vs(e.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: Na(a) ? a : null,
    height: Na(i) ? i : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${l}px,${s}px)`
  };
};
function Cj({ onSelectionContextMenu: e, noPanClassName: a, disableKeyboardA11y: i }) {
  const l = jt(), { width: s, height: u, transformString: c, userSelectionActive: d } = st(Nj, At), p = qw(), m = S.useRef(null);
  S.useEffect(() => {
    i || m.current?.focus({
      preventScroll: !0
    });
  }, [i]);
  const y = !d && s !== null && u !== null;
  if ($w({
    nodeRef: m,
    disabled: !y
  }), !y)
    return null;
  const g = e ? (x) => {
    const _ = l.getState().nodes.filter((E) => E.selected);
    e(x, _);
  } : void 0, b = (x) => {
    Object.prototype.hasOwnProperty.call(Nc, x.key) && (x.preventDefault(), p({
      direction: Nc[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return v.jsx("div", { className: Zt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: v.jsx("div", { ref: m, className: "react-flow__nodesselection-rect", onContextMenu: g, tabIndex: i ? void 0 : -1, onKeyDown: i ? void 0 : b, style: {
    width: s,
    height: u
  } }) });
}
const zb = typeof window < "u" ? window : void 0, Rj = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function Yw({ children: e, onPaneClick: a, onPaneMouseEnter: i, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: p, selectionKeyCode: m, selectionOnDrag: y, selectionMode: g, onSelectionStart: b, onSelectionEnd: x, multiSelectionKeyCode: _, panActivationKeyCode: E, zoomActivationKeyCode: N, elementsSelectable: R, zoomOnScroll: j, zoomOnPinch: C, panOnScroll: O, panOnScrollSpeed: V, panOnScrollMode: B, zoomOnDoubleClick: U, panOnDrag: D, autoPanOnSelection: H, defaultViewport: J, translateExtent: I, minZoom: Q, maxZoom: ae, preventScrolling: L, onSelectionContextMenu: Y, noWheelClassName: T, noPanClassName: z, disableKeyboardA11y: F, onViewportChange: X, isControlledViewport: ne }) {
  const { nodesSelectionActive: A, userSelectionActive: k } = st(Rj, At), G = rs(m, { target: zb }), ee = rs(E, { target: zb }), se = ee || D, de = ee || O, he = y && se !== !0, W = G || k || he;
  return oj({ deleteKeyCode: p, multiSelectionKeyCode: _ }), v.jsx(cj, { onPaneContextMenu: u, elementsSelectable: R, zoomOnScroll: j, zoomOnPinch: C, panOnScroll: de, panOnScrollSpeed: V, panOnScrollMode: B, zoomOnDoubleClick: U, panOnDrag: !G && se, defaultViewport: J, translateExtent: I, minZoom: Q, maxZoom: ae, zoomActivationKeyCode: N, preventScrolling: L, noWheelClassName: T, noPanClassName: z, onViewportChange: X, isControlledViewport: ne, paneClickDistance: d, selectionOnDrag: he, children: v.jsxs(mj, { onSelectionStart: b, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: i, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: se, autoPanOnSelection: H, isSelecting: !!W, selectionMode: g, selectionKeyPressed: G, paneClickDistance: d, selectionOnDrag: he, children: [e, A && v.jsx(Cj, { onSelectionContextMenu: Y, noPanClassName: z, disableKeyboardA11y: F })] }) });
}
Yw.displayName = "FlowRenderer";
const Tj = S.memo(Yw), Mj = (e) => (a) => e ? Gm(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((i) => i.id) : Array.from(a.nodeLookup.keys());
function Dj(e) {
  return st(S.useCallback(Mj(e), [e]), At);
}
const Aj = (e) => e.updateNodeInternals;
function jj() {
  const e = st(Aj), [a] = S.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((i) => {
    const l = /* @__PURE__ */ new Map();
    i.forEach((s) => {
      const u = s.target.getAttribute("data-id");
      l.set(u, {
        id: u,
        nodeElement: s.target,
        force: !0
      });
    }), e(l);
  }));
  return S.useEffect(() => () => {
    a?.disconnect();
  }, [a]), a;
}
function Oj({ node: e, nodeType: a, hasDimensions: i, resizeObserver: l }) {
  const s = jt(), u = S.useRef(null), c = S.useRef(null), d = S.useRef(e.sourcePosition), p = S.useRef(e.targetPosition), m = S.useRef(a), y = i && !!e.internals.handleBounds;
  return S.useEffect(() => {
    u.current && !e.hidden && (!y || c.current !== u.current) && (c.current && l?.unobserve(c.current), l?.observe(u.current), c.current = u.current);
  }, [y, e.hidden]), S.useEffect(() => () => {
    c.current && (l?.unobserve(c.current), c.current = null);
  }, []), S.useEffect(() => {
    if (u.current) {
      const g = m.current !== a, b = d.current !== e.sourcePosition, x = p.current !== e.targetPosition;
      (g || b || x) && (m.current = a, d.current = e.sourcePosition, p.current = e.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [e.id, a, e.sourcePosition, e.targetPosition]), u;
}
function zj({ id: e, onClick: a, onMouseEnter: i, onMouseMove: l, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: d, elementsSelectable: p, nodesConnectable: m, nodesFocusable: y, resizeObserver: g, noDragClassName: b, noPanClassName: x, disableKeyboardA11y: _, rfId: E, nodeTypes: N, nodeClickDistance: R, onError: j }) {
  const { node: C, internals: O, isParent: V } = st((W) => {
    const ve = W.nodeLookup.get(e), De = W.parentLookup.has(e);
    return {
      node: ve,
      internals: ve.internals,
      isParent: De
    };
  }, At);
  let B = C.type || "default", U = N?.[B] || Ob[B];
  U === void 0 && (j?.("003", Ra.error003(B)), B = "default", U = N?.default || Ob.default);
  const D = !!(C.draggable || d && typeof C.draggable > "u"), H = !!(C.selectable || p && typeof C.selectable > "u"), J = !!(C.connectable || m && typeof C.connectable > "u"), I = !!(C.focusable || y && typeof C.focusable > "u"), Q = jt(), ae = dw(C), L = Oj({ node: C, nodeType: B, hasDimensions: ae, resizeObserver: g }), Y = $w({
    nodeRef: L,
    disabled: C.hidden || !D,
    noDragClassName: b,
    handleSelector: C.dragHandle,
    nodeId: e,
    isSelectable: H,
    nodeClickDistance: R
  }), T = qw();
  if (C.hidden)
    return null;
  const z = wr(C), F = Ej(C), X = H || D || a || i || l || s, ne = i ? (W) => i(W, { ...O.userNode }) : void 0, A = l ? (W) => l(W, { ...O.userNode }) : void 0, k = s ? (W) => s(W, { ...O.userNode }) : void 0, G = u ? (W) => u(W, { ...O.userNode }) : void 0, ee = c ? (W) => c(W, { ...O.userNode }) : void 0, se = (W) => {
    const { selectNodesOnDrag: ve, nodeDragThreshold: De } = Q.getState();
    H && (!ve || !D || De > 0) && im({
      id: e,
      store: Q,
      nodeRef: L
    }), a && a(W, { ...O.userNode });
  }, de = (W) => {
    if (!(pw(W.nativeEvent) || _)) {
      if (aw.includes(W.key) && H) {
        const ve = W.key === "Escape";
        im({
          id: e,
          store: Q,
          unselect: ve,
          nodeRef: L
        });
      } else if (D && C.selected && Object.prototype.hasOwnProperty.call(Nc, W.key)) {
        W.preventDefault();
        const { ariaLabelConfig: ve } = Q.getState();
        Q.setState({
          ariaLiveMessage: ve["node.a11yDescription.ariaLiveMessage"]({
            direction: W.key.replace("Arrow", "").toLowerCase(),
            x: ~~O.positionAbsolute.x,
            y: ~~O.positionAbsolute.y
          })
        }), T({
          direction: Nc[W.key],
          factor: W.shiftKey ? 4 : 1
        });
      }
    }
  }, he = () => {
    if (_ || !L.current?.matches(":focus-visible"))
      return;
    const { transform: W, width: ve, height: De, autoPanOnNodeFocus: Oe, setCenter: Ee } = Q.getState();
    if (!Oe)
      return;
    Gm(/* @__PURE__ */ new Map([[e, C]]), { x: 0, y: 0, width: ve, height: De }, W, !0).length > 0 || Ee(C.position.x + z.width / 2, C.position.y + z.height / 2, {
      zoom: W[2]
    });
  };
  return v.jsx("div", { className: Zt([
    "react-flow__node",
    `react-flow__node-${B}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: D
    },
    C.className,
    {
      selected: C.selected,
      selectable: H,
      parent: V,
      draggable: D,
      dragging: Y
    }
  ]), ref: L, style: {
    zIndex: O.z,
    transform: `translate(${O.positionAbsolute.x}px,${O.positionAbsolute.y}px)`,
    pointerEvents: X ? "all" : "none",
    visibility: ae ? "visible" : "hidden",
    ...C.style,
    ...F
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: ne, onMouseMove: A, onMouseLeave: k, onContextMenu: G, onClick: se, onDoubleClick: ee, onKeyDown: I ? de : void 0, tabIndex: I ? 0 : void 0, onFocus: I ? he : void 0, role: C.ariaRole ?? (I ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": _ ? void 0 : `${Lw}-${E}`, "aria-label": C.ariaLabel, ...C.domAttributes, children: v.jsx(gj, { value: e, children: v.jsx(U, { id: e, data: C.data, type: B, positionAbsoluteX: O.positionAbsolute.x, positionAbsoluteY: O.positionAbsolute.y, selected: C.selected ?? !1, selectable: H, draggable: D, deletable: C.deletable ?? !0, isConnectable: J, sourcePosition: C.sourcePosition, targetPosition: C.targetPosition, dragging: Y, dragHandle: C.dragHandle, zIndex: O.z, parentId: C.parentId, ...z }) }) });
}
var Lj = S.memo(zj);
const kj = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function Gw(e) {
  const { nodesDraggable: a, nodesConnectable: i, nodesFocusable: l, elementsSelectable: s, onError: u } = st(kj, At), c = Dj(e.onlyRenderVisibleElements), d = jj();
  return v.jsx("div", { className: "react-flow__nodes", style: Xc, children: c.map((p) => (
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
    v.jsx(Lj, { id: p, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: d, nodesDraggable: a, nodesConnectable: i, nodesFocusable: l, elementsSelectable: s, nodeClickDistance: e.nodeClickDistance, onError: u }, p)
  )) });
}
Gw.displayName = "NodeRenderer";
const Hj = S.memo(Gw);
function Bj(e) {
  return st(S.useCallback((i) => {
    if (!e)
      return i.edges.map((s) => s.id);
    const l = [];
    if (i.width && i.height)
      for (const s of i.edges) {
        const u = i.nodeLookup.get(s.source), c = i.nodeLookup.get(s.target);
        u && c && jD({
          sourceNode: u,
          targetNode: c,
          width: i.width,
          height: i.height,
          transform: i.transform
        }) && l.push(s.id);
      }
    return l;
  }, [e]), At);
}
const Uj = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const i = {
    strokeWidth: a,
    ...e && { stroke: e }
  };
  return v.jsx("polyline", { className: "arrow", style: i, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, Vj = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const i = {
    strokeWidth: a,
    ...e && { stroke: e, fill: e }
  };
  return v.jsx("polyline", { className: "arrowclosed", style: i, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, Lb = {
  [Sc.Arrow]: Uj,
  [Sc.ArrowClosed]: Vj
};
function $j(e) {
  const a = jt();
  return S.useMemo(() => Object.prototype.hasOwnProperty.call(Lb, e) ? Lb[e] : (a.getState().onError?.("009", Ra.error009(e)), null), [e]);
}
const qj = ({ id: e, type: a, color: i, width: l = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const p = $j(a);
  return p ? v.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${l}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: d, refX: "0", refY: "0", children: v.jsx(p, { color: i, strokeWidth: c }) }) : null;
}, Fw = ({ defaultColor: e, rfId: a }) => {
  const i = st((u) => u.edges), l = st((u) => u.defaultEdgeOptions), s = S.useMemo(() => VD(i, {
    id: a,
    defaultColor: e,
    defaultMarkerStart: l?.markerStart,
    defaultMarkerEnd: l?.markerEnd
  }), [i, l, a, e]);
  return s.length ? v.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: v.jsx("defs", { children: s.map((u) => v.jsx(qj, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
Fw.displayName = "MarkerDefinitions";
var Ij = S.memo(Fw);
function Xw({ x: e, y: a, label: i, labelStyle: l, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: p, className: m, ...y }) {
  const [g, b] = S.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Zt(["react-flow__edge-textwrapper", m]), _ = S.useRef(null);
  return S.useEffect(() => {
    if (_.current) {
      const E = _.current.getBBox();
      b({
        x: E.x,
        y: E.y,
        width: E.width,
        height: E.height
      });
    }
  }, [i]), i ? v.jsxs("g", { transform: `translate(${e - g.width / 2} ${a - g.height / 2})`, className: x, visibility: g.width ? "visible" : "hidden", ...y, children: [s && v.jsx("rect", { width: g.width + 2 * c[0], x: -c[0], y: -c[1], height: g.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: d, ry: d }), v.jsx("text", { className: "react-flow__edge-text", y: g.height / 2, dy: "0.3em", ref: _, style: l, children: i }), p] }) : null;
}
Xw.displayName = "EdgeText";
const Yj = S.memo(Xw);
function Pc({ path: e, labelX: a, labelY: i, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p, interactionWidth: m = 20, ...y }) {
  return v.jsxs(v.Fragment, { children: [v.jsx("path", { ...y, d: e, fill: "none", className: Zt(["react-flow__edge-path", y.className]) }), m ? v.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: m, className: "react-flow__edge-interaction" }) : null, l && Na(a) && Na(i) ? v.jsx(Yj, { x: a, y: i, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p }) : null] });
}
function kb({ pos: e, x1: a, y1: i, x2: l, y2: s }) {
  return e === ke.Left || e === ke.Right ? [0.5 * (a + l), i] : [a, 0.5 * (i + s)];
}
function Pw({ sourceX: e, sourceY: a, sourcePosition: i = ke.Bottom, targetX: l, targetY: s, targetPosition: u = ke.Top }) {
  const [c, d] = kb({
    pos: i,
    x1: e,
    y1: a,
    x2: l,
    y2: s
  }), [p, m] = kb({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a
  }), [y, g, b, x] = vw({
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
    b,
    x
  ];
}
function Zw(e) {
  return S.memo(({ id: a, sourceX: i, sourceY: l, targetX: s, targetY: u, sourcePosition: c, targetPosition: d, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: E, markerStart: N, interactionWidth: R }) => {
    const [j, C, O] = Pw({
      sourceX: i,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d
    }), V = e.isInternal ? void 0 : a;
    return v.jsx(Pc, { id: V, path: j, labelX: C, labelY: O, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: E, markerStart: N, interactionWidth: R });
  });
}
const Gj = Zw({ isInternal: !1 }), Qw = Zw({ isInternal: !0 });
Gj.displayName = "SimpleBezierEdge";
Qw.displayName = "SimpleBezierEdgeInternal";
function Kw(e) {
  return S.memo(({ id: a, sourceX: i, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, sourcePosition: x = ke.Bottom, targetPosition: _ = ke.Top, markerEnd: E, markerStart: N, pathOptions: R, interactionWidth: j }) => {
    const [C, O, V] = tm({
      sourceX: i,
      sourceY: l,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: _,
      borderRadius: R?.borderRadius,
      offset: R?.offset,
      stepPosition: R?.stepPosition
    }), B = e.isInternal ? void 0 : a;
    return v.jsx(Pc, { id: B, path: C, labelX: O, labelY: V, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, markerEnd: E, markerStart: N, interactionWidth: j });
  });
}
const Ww = Kw({ isInternal: !1 }), Jw = Kw({ isInternal: !0 });
Ww.displayName = "SmoothStepEdge";
Jw.displayName = "SmoothStepEdgeInternal";
function e_(e) {
  return S.memo(({ id: a, ...i }) => {
    const l = e.isInternal ? void 0 : a;
    return v.jsx(Ww, { ...i, id: l, pathOptions: S.useMemo(() => ({ borderRadius: 0, offset: i.pathOptions?.offset }), [i.pathOptions?.offset]) });
  });
}
const Fj = e_({ isInternal: !1 }), t_ = e_({ isInternal: !0 });
Fj.displayName = "StepEdge";
t_.displayName = "StepEdgeInternal";
function n_(e) {
  return S.memo(({ id: a, sourceX: i, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, markerEnd: x, markerStart: _, interactionWidth: E }) => {
    const [N, R, j] = xw({ sourceX: i, sourceY: l, targetX: s, targetY: u }), C = e.isInternal ? void 0 : a;
    return v.jsx(Pc, { id: C, path: N, labelX: R, labelY: j, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, markerEnd: x, markerStart: _, interactionWidth: E });
  });
}
const Xj = n_({ isInternal: !1 }), a_ = n_({ isInternal: !0 });
Xj.displayName = "StraightEdge";
a_.displayName = "StraightEdgeInternal";
function r_(e) {
  return S.memo(({ id: a, sourceX: i, sourceY: l, targetX: s, targetY: u, sourcePosition: c = ke.Bottom, targetPosition: d = ke.Top, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: E, markerStart: N, pathOptions: R, interactionWidth: j }) => {
    const [C, O, V] = yw({
      sourceX: i,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d,
      curvature: R?.curvature
    }), B = e.isInternal ? void 0 : a;
    return v.jsx(Pc, { id: B, path: C, labelX: O, labelY: V, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: E, markerStart: N, interactionWidth: j });
  });
}
const Pj = r_({ isInternal: !1 }), i_ = r_({ isInternal: !0 });
Pj.displayName = "BezierEdge";
i_.displayName = "BezierEdgeInternal";
const Hb = {
  default: i_,
  straight: a_,
  step: t_,
  smoothstep: Jw,
  simplebezier: Qw
}, Bb = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, Zj = (e, a, i) => i === ke.Left ? e - a : i === ke.Right ? e + a : e, Qj = (e, a, i) => i === ke.Top ? e - a : i === ke.Bottom ? e + a : e, Ub = "react-flow__edgeupdater";
function Vb({ position: e, centerX: a, centerY: i, radius: l = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: d }) {
  return v.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Zt([Ub, `${Ub}-${d}`]), cx: Zj(a, l, e), cy: Qj(i, l, e), r: l, stroke: "transparent", fill: "transparent" });
}
function Kj({ isReconnectable: e, reconnectRadius: a, edge: i, sourceX: l, sourceY: s, targetX: u, targetY: c, sourcePosition: d, targetPosition: p, onReconnect: m, onReconnectStart: y, onReconnectEnd: g, setReconnecting: b, setUpdateHover: x }) {
  const _ = jt(), E = (O, V) => {
    if (O.button !== 0)
      return;
    const { autoPanOnConnect: B, domNode: U, connectionMode: D, connectionRadius: H, lib: J, onConnectStart: I, cancelConnection: Q, nodeLookup: ae, rfId: L, panBy: Y, updateConnection: T } = _.getState(), z = V.type === "target", F = (A, k) => {
      b(!1), g?.(A, i, V.type, k);
    }, X = (A) => m?.(i, A), ne = (A, k) => {
      b(!0), y?.(O, i, V.type), I?.(A, k);
    };
    rm.onPointerDown(O.nativeEvent, {
      autoPanOnConnect: B,
      connectionMode: D,
      connectionRadius: H,
      domNode: U,
      handleId: V.id,
      nodeId: V.nodeId,
      nodeLookup: ae,
      isTarget: z,
      edgeUpdaterType: V.type,
      lib: J,
      flowId: L,
      cancelConnection: Q,
      panBy: Y,
      isValidConnection: (...A) => _.getState().isValidConnection?.(...A) ?? !0,
      onConnect: X,
      onConnectStart: ne,
      onConnectEnd: (...A) => _.getState().onConnectEnd?.(...A),
      onReconnectEnd: F,
      updateConnection: T,
      getTransform: () => _.getState().transform,
      getFromHandle: () => _.getState().connection.fromHandle,
      dragThreshold: _.getState().connectionDragThreshold,
      handleDomNode: O.currentTarget
    });
  }, N = (O) => E(O, { nodeId: i.target, id: i.targetHandle ?? null, type: "target" }), R = (O) => E(O, { nodeId: i.source, id: i.sourceHandle ?? null, type: "source" }), j = () => x(!0), C = () => x(!1);
  return v.jsxs(v.Fragment, { children: [(e === !0 || e === "source") && v.jsx(Vb, { position: d, centerX: l, centerY: s, radius: a, onMouseDown: N, onMouseEnter: j, onMouseOut: C, type: "source" }), (e === !0 || e === "target") && v.jsx(Vb, { position: p, centerX: u, centerY: c, radius: a, onMouseDown: R, onMouseEnter: j, onMouseOut: C, type: "target" })] });
}
function Wj({ id: e, edgesFocusable: a, edgesReconnectable: i, elementsSelectable: l, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, reconnectRadius: y, onReconnect: g, onReconnectStart: b, onReconnectEnd: x, rfId: _, edgeTypes: E, noPanClassName: N, onError: R, disableKeyboardA11y: j }) {
  let C = st((Ee) => Ee.edgeLookup.get(e));
  const O = st((Ee) => Ee.defaultEdgeOptions);
  C = O ? { ...O, ...C } : C;
  let V = C.type || "default", B = E?.[V] || Hb[V];
  B === void 0 && (R?.("011", Ra.error011(V)), V = "default", B = E?.default || Hb.default);
  const U = !!(C.focusable || a && typeof C.focusable > "u"), D = typeof g < "u" && (C.reconnectable || i && typeof C.reconnectable > "u"), H = !!(C.selectable || l && typeof C.selectable > "u"), J = S.useRef(null), [I, Q] = S.useState(!1), [ae, L] = S.useState(!1), Y = jt(), { zIndex: T, sourceX: z, sourceY: F, targetX: X, targetY: ne, sourcePosition: A, targetPosition: k } = st(S.useCallback((Ee) => {
    const we = Ee.nodeLookup.get(C.source), Me = Ee.nodeLookup.get(C.target);
    if (!we || !Me)
      return {
        zIndex: C.zIndex,
        ...Bb
      };
    const Ye = UD({
      id: e,
      sourceNode: we,
      targetNode: Me,
      sourceHandle: C.sourceHandle || null,
      targetHandle: C.targetHandle || null,
      connectionMode: Ee.connectionMode,
      onError: R
    });
    return {
      zIndex: AD({
        selected: C.selected,
        zIndex: C.zIndex,
        sourceNode: we,
        targetNode: Me,
        elevateOnSelect: Ee.elevateEdgesOnSelect,
        zIndexMode: Ee.zIndexMode
      }),
      ...Ye || Bb
    };
  }, [C.source, C.target, C.sourceHandle, C.targetHandle, C.selected, C.zIndex]), At), G = S.useMemo(() => C.markerStart ? `url('#${nm(C.markerStart, _)}')` : void 0, [C.markerStart, _]), ee = S.useMemo(() => C.markerEnd ? `url('#${nm(C.markerEnd, _)}')` : void 0, [C.markerEnd, _]);
  if (C.hidden || z === null || F === null || X === null || ne === null)
    return null;
  const se = (Ee) => {
    const { addSelectedEdges: we, unselectNodesAndEdges: Me, multiSelectionActive: Ye } = Y.getState();
    H && (Y.setState({ nodesSelectionActive: !1 }), C.selected && Ye ? (Me({ nodes: [], edges: [C] }), J.current?.blur()) : we([e])), s && s(Ee, C);
  }, de = u ? (Ee) => {
    u(Ee, { ...C });
  } : void 0, he = c ? (Ee) => {
    c(Ee, { ...C });
  } : void 0, W = d ? (Ee) => {
    d(Ee, { ...C });
  } : void 0, ve = p ? (Ee) => {
    p(Ee, { ...C });
  } : void 0, De = m ? (Ee) => {
    m(Ee, { ...C });
  } : void 0, Oe = (Ee) => {
    if (!j && aw.includes(Ee.key) && H) {
      const { unselectNodesAndEdges: we, addSelectedEdges: Me } = Y.getState();
      Ee.key === "Escape" ? (J.current?.blur(), we({ edges: [C] })) : Me([e]);
    }
  };
  return v.jsx("svg", { style: { zIndex: T }, children: v.jsxs("g", { className: Zt([
    "react-flow__edge",
    `react-flow__edge-${V}`,
    C.className,
    N,
    {
      selected: C.selected,
      animated: C.animated,
      inactive: !H && !s,
      updating: I,
      selectable: H
    }
  ]), onClick: se, onDoubleClick: de, onContextMenu: he, onMouseEnter: W, onMouseMove: ve, onMouseLeave: De, onKeyDown: U ? Oe : void 0, tabIndex: U ? 0 : void 0, role: C.ariaRole ?? (U ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": C.ariaLabel === null ? void 0 : C.ariaLabel || `Edge from ${C.source} to ${C.target}`, "aria-describedby": U ? `${kw}-${_}` : void 0, ref: J, ...C.domAttributes, children: [!ae && v.jsx(B, { id: e, source: C.source, target: C.target, type: C.type, selected: C.selected, animated: C.animated, selectable: H, deletable: C.deletable ?? !0, label: C.label, labelStyle: C.labelStyle, labelShowBg: C.labelShowBg, labelBgStyle: C.labelBgStyle, labelBgPadding: C.labelBgPadding, labelBgBorderRadius: C.labelBgBorderRadius, sourceX: z, sourceY: F, targetX: X, targetY: ne, sourcePosition: A, targetPosition: k, data: C.data, style: C.style, sourceHandleId: C.sourceHandle, targetHandleId: C.targetHandle, markerStart: G, markerEnd: ee, pathOptions: "pathOptions" in C ? C.pathOptions : void 0, interactionWidth: C.interactionWidth }), D && v.jsx(Kj, { edge: C, isReconnectable: D, reconnectRadius: y, onReconnect: g, onReconnectStart: b, onReconnectEnd: x, sourceX: z, sourceY: F, targetX: X, targetY: ne, sourcePosition: A, targetPosition: k, setUpdateHover: Q, setReconnecting: L })] }) });
}
var Jj = S.memo(Wj);
const e4 = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function l_({ defaultMarkerColor: e, onlyRenderVisibleElements: a, rfId: i, edgeTypes: l, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: p, onEdgeMouseLeave: m, onEdgeClick: y, reconnectRadius: g, onEdgeDoubleClick: b, onReconnectStart: x, onReconnectEnd: _, disableKeyboardA11y: E }) {
  const { edgesFocusable: N, edgesReconnectable: R, elementsSelectable: j, onError: C } = st(e4, At), O = Bj(a);
  return v.jsxs("div", { className: "react-flow__edges", children: [v.jsx(Ij, { defaultColor: e, rfId: i }), O.map((V) => v.jsx(Jj, { id: V, edgesFocusable: N, edgesReconnectable: R, elementsSelectable: j, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, onClick: y, reconnectRadius: g, onDoubleClick: b, onReconnectStart: x, onReconnectEnd: _, rfId: i, onError: C, edgeTypes: l, disableKeyboardA11y: E }, V))] });
}
l_.displayName = "EdgeRenderer";
const t4 = S.memo(l_), n4 = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function a4({ children: e }) {
  const a = st(n4);
  return v.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: e });
}
function r4(e) {
  const a = ep(), i = S.useRef(!1);
  S.useEffect(() => {
    !i.current && a.viewportInitialized && e && (setTimeout(() => e(a), 1), i.current = !0);
  }, [e, a.viewportInitialized]);
}
const i4 = (e) => e.panZoom?.syncViewport;
function l4(e) {
  const a = st(i4), i = jt();
  return S.useEffect(() => {
    e && (a?.(e), i.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, a]), null;
}
function o4(e) {
  return e.connection.inProgress ? { ...e.connection, to: Ul(e.connection.to, e.transform) } : { ...e.connection };
}
function s4(e) {
  return o4;
}
function u4(e) {
  const a = s4();
  return st(a, At);
}
const c4 = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function f4({ containerStyle: e, style: a, type: i, component: l }) {
  const { nodesConnectable: s, width: u, height: c, isValid: d, inProgress: p } = st(c4, At);
  return !(u && s && p) ? null : v.jsx("svg", { style: e, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: v.jsx("g", { className: Zt(["react-flow__connection", lw(d)]), children: v.jsx(o_, { style: a, type: i, CustomComponent: l, isValid: d }) }) });
}
const o_ = ({ style: e, type: a = ei.Bezier, CustomComponent: i, isValid: l }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: d, fromPosition: p, to: m, toNode: y, toHandle: g, toPosition: b, pointer: x } = u4();
  if (!s)
    return;
  if (i)
    return v.jsx(i, { connectionLineType: a, connectionLineStyle: e, fromNode: c, fromHandle: d, fromX: u.x, fromY: u.y, toX: m.x, toY: m.y, fromPosition: p, toPosition: b, connectionStatus: lw(l), toNode: y, toHandle: g, pointer: x });
  let _ = "";
  const E = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: m.x,
    targetY: m.y,
    targetPosition: b
  };
  switch (a) {
    case ei.Bezier:
      [_] = yw(E);
      break;
    case ei.SimpleBezier:
      [_] = Pw(E);
      break;
    case ei.Step:
      [_] = tm({
        ...E,
        borderRadius: 0
      });
      break;
    case ei.SmoothStep:
      [_] = tm(E);
      break;
    default:
      [_] = xw(E);
  }
  return v.jsx("path", { d: _, fill: "none", className: "react-flow__connection-path", style: e });
};
o_.displayName = "ConnectionLine";
const d4 = {};
function $b(e = d4) {
  S.useRef(e), jt(), S.useEffect(() => {
  }, [e]);
}
function h4() {
  jt(), S.useRef(!1), S.useEffect(() => {
  }, []);
}
function s_({ nodeTypes: e, edgeTypes: a, onInit: i, onNodeClick: l, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, onSelectionContextMenu: g, onSelectionStart: b, onSelectionEnd: x, connectionLineType: _, connectionLineStyle: E, connectionLineComponent: N, connectionLineContainerStyle: R, selectionKeyCode: j, selectionOnDrag: C, selectionMode: O, multiSelectionKeyCode: V, panActivationKeyCode: B, zoomActivationKeyCode: U, deleteKeyCode: D, onlyRenderVisibleElements: H, elementsSelectable: J, defaultViewport: I, translateExtent: Q, minZoom: ae, maxZoom: L, preventScrolling: Y, defaultMarkerColor: T, zoomOnScroll: z, zoomOnPinch: F, panOnScroll: X, panOnScrollSpeed: ne, panOnScrollMode: A, zoomOnDoubleClick: k, panOnDrag: G, autoPanOnSelection: ee, onPaneClick: se, onPaneMouseEnter: de, onPaneMouseMove: he, onPaneMouseLeave: W, onPaneScroll: ve, onPaneContextMenu: De, paneClickDistance: Oe, nodeClickDistance: Ee, onEdgeContextMenu: we, onEdgeMouseEnter: Me, onEdgeMouseMove: Ye, onEdgeMouseLeave: ye, reconnectRadius: pe, onReconnect: _e, onReconnectStart: Re, onReconnectEnd: Ae, noDragClassName: lt, noWheelClassName: Ze, noPanClassName: Fe, disableKeyboardA11y: Ke, nodeExtent: vt, rfId: yt, viewport: Yt, onViewportChange: Lt }) {
  return $b(e), $b(a), h4(), r4(i), l4(Yt), v.jsx(Tj, { onPaneClick: se, onPaneMouseEnter: de, onPaneMouseMove: he, onPaneMouseLeave: W, onPaneContextMenu: De, onPaneScroll: ve, paneClickDistance: Oe, deleteKeyCode: D, selectionKeyCode: j, selectionOnDrag: C, selectionMode: O, onSelectionStart: b, onSelectionEnd: x, multiSelectionKeyCode: V, panActivationKeyCode: B, zoomActivationKeyCode: U, elementsSelectable: J, zoomOnScroll: z, zoomOnPinch: F, zoomOnDoubleClick: k, panOnScroll: X, panOnScrollSpeed: ne, panOnScrollMode: A, panOnDrag: G, autoPanOnSelection: ee, defaultViewport: I, translateExtent: Q, minZoom: ae, maxZoom: L, onSelectionContextMenu: g, preventScrolling: Y, noDragClassName: lt, noWheelClassName: Ze, noPanClassName: Fe, disableKeyboardA11y: Ke, onViewportChange: Lt, isControlledViewport: !!Yt, children: v.jsxs(a4, { children: [v.jsx(t4, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: _e, onReconnectStart: Re, onReconnectEnd: Ae, onlyRenderVisibleElements: H, onEdgeContextMenu: we, onEdgeMouseEnter: Me, onEdgeMouseMove: Ye, onEdgeMouseLeave: ye, reconnectRadius: pe, defaultMarkerColor: T, noPanClassName: Fe, disableKeyboardA11y: Ke, rfId: yt }), v.jsx(f4, { style: E, type: _, component: N, containerStyle: R }), v.jsx("div", { className: "react-flow__edgelabel-renderer" }), v.jsx(Hj, { nodeTypes: e, onNodeClick: l, onNodeDoubleClick: u, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, nodeClickDistance: Ee, onlyRenderVisibleElements: H, noPanClassName: Fe, noDragClassName: lt, disableKeyboardA11y: Ke, nodeExtent: vt, rfId: yt }), v.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
s_.displayName = "GraphView";
const m4 = S.memo(s_), p4 = fw(), qb = ({ nodes: e, edges: a, defaultNodes: i, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p = 0.5, maxZoom: m = 2, nodeOrigin: y, nodeExtent: g, zIndexMode: b = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), R = l ?? a ?? [], j = i ?? e ?? [], C = y ?? [0, 0], O = g ?? es;
  Sw(E, N, R);
  const { nodesInitialized: V } = am(j, x, _, {
    nodeOrigin: C,
    nodeExtent: O,
    zIndexMode: b
  });
  let B = [0, 0, 1];
  if (c && s && u) {
    const U = vs(x, {
      filter: (I) => !!((I.width || I.initialWidth) && (I.height || I.initialHeight))
    }), { x: D, y: H, zoom: J } = Xm(U, s, u, p, m, d?.padding ?? 0.1);
    B = [D, H, J];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: B,
    nodes: j,
    nodesInitialized: V,
    nodeLookup: x,
    parentLookup: _,
    edges: R,
    edgeLookup: N,
    connectionLookup: E,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: i !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: m,
    translateExtent: es,
    nodeExtent: O,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Dl.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: C,
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
    connection: { ...iw },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: p4,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: rw,
    zIndexMode: b,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, g4 = ({ nodes: e, edges: a, defaultNodes: i, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p, maxZoom: m, nodeOrigin: y, nodeExtent: g, zIndexMode: b }) => RA((x, _) => {
  async function E() {
    const { nodeLookup: N, panZoom: R, fitViewOptions: j, fitViewResolver: C, width: O, height: V, minZoom: B, maxZoom: U } = _();
    R && (await ED({
      nodes: N,
      width: O,
      height: V,
      panZoom: R,
      minZoom: B,
      maxZoom: U
    }, j), C?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...qb({
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
      defaultNodes: i,
      defaultEdges: l,
      zIndexMode: b
    }),
    setNodes: (N) => {
      const { nodeLookup: R, parentLookup: j, nodeOrigin: C, elevateNodesOnSelect: O, fitViewQueued: V, zIndexMode: B, nodesSelectionActive: U } = _(), { nodesInitialized: D, hasSelectedNodes: H } = am(N, R, j, {
        nodeOrigin: C,
        nodeExtent: g,
        elevateNodesOnSelect: O,
        checkEquality: !0,
        zIndexMode: B
      }), J = U && H;
      V && D ? (E(), x({
        nodes: N,
        nodesInitialized: D,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: J
      })) : x({ nodes: N, nodesInitialized: D, nodesSelectionActive: J });
    },
    setEdges: (N) => {
      const { connectionLookup: R, edgeLookup: j } = _();
      Sw(R, j, N), x({ edges: N });
    },
    setDefaultNodesAndEdges: (N, R) => {
      if (N) {
        const { setNodes: j } = _();
        j(N), x({ hasDefaultNodes: !0 });
      }
      if (R) {
        const { setEdges: j } = _();
        j(R), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (N) => {
      const { triggerNodeChanges: R, nodeLookup: j, parentLookup: C, domNode: O, nodeOrigin: V, nodeExtent: B, debug: U, fitViewQueued: D, zIndexMode: H } = _(), { changes: J, updatedInternals: I } = XD(N, j, C, O, V, B, H);
      I && (ID(j, C, { nodeOrigin: V, nodeExtent: B, zIndexMode: H }), D ? (E(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), J?.length > 0 && (U && console.log("React Flow: trigger node changes", J), R?.(J)));
    },
    updateNodePositions: (N, R = !1) => {
      const j = [];
      let C = [];
      const { nodeLookup: O, triggerNodeChanges: V, connection: B, updateConnection: U, onNodesChangeMiddlewareMap: D } = _();
      for (const [H, J] of N) {
        const I = O.get(H), Q = !!(I?.expandParent && I?.parentId && J?.position), ae = {
          id: H,
          type: "position",
          position: Q ? {
            x: Math.max(0, J.position.x),
            y: Math.max(0, J.position.y)
          } : J.position,
          dragging: R
        };
        if (I && B.inProgress && B.fromNode.id === I.id) {
          const L = ji(I, B.fromHandle, ke.Left, !0);
          U({ ...B, from: L });
        }
        Q && I.parentId && j.push({
          id: H,
          parentId: I.parentId,
          rect: {
            ...J.internals.positionAbsolute,
            width: J.measured.width ?? 0,
            height: J.measured.height ?? 0
          }
        }), C.push(ae);
      }
      if (j.length > 0) {
        const { parentLookup: H, nodeOrigin: J } = _(), I = Jm(j, O, H, J);
        C.push(...I);
      }
      for (const H of D.values())
        C = H(C);
      V(C);
    },
    triggerNodeChanges: (N) => {
      const { onNodesChange: R, setNodes: j, nodes: C, hasDefaultNodes: O, debug: V } = _();
      if (N?.length) {
        if (O) {
          const B = QA(N, C);
          j(B);
        }
        V && console.log("React Flow: trigger node changes", N), R?.(N);
      }
    },
    triggerEdgeChanges: (N) => {
      const { onEdgesChange: R, setEdges: j, edges: C, hasDefaultEdges: O, debug: V } = _();
      if (N?.length) {
        if (O) {
          const B = KA(N, C);
          j(B);
        }
        V && console.log("React Flow: trigger edge changes", N), R?.(N);
      }
    },
    addSelectedNodes: (N) => {
      const { multiSelectionActive: R, edgeLookup: j, nodeLookup: C, triggerNodeChanges: O, triggerEdgeChanges: V } = _();
      if (R) {
        const B = N.map((U) => wi(U, !0));
        O(B);
        return;
      }
      O(Sl(C, /* @__PURE__ */ new Set([...N]), !0)), V(Sl(j));
    },
    addSelectedEdges: (N) => {
      const { multiSelectionActive: R, edgeLookup: j, nodeLookup: C, triggerNodeChanges: O, triggerEdgeChanges: V } = _();
      if (R) {
        const B = N.map((U) => wi(U, !0));
        V(B);
        return;
      }
      V(Sl(j, /* @__PURE__ */ new Set([...N]))), O(Sl(C, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: N, edges: R } = {}) => {
      const { edges: j, nodes: C, nodeLookup: O, triggerNodeChanges: V, triggerEdgeChanges: B } = _(), U = N || C, D = R || j, H = [];
      for (const I of U) {
        if (!I.selected)
          continue;
        const Q = O.get(I.id);
        Q && (Q.selected = !1), H.push(wi(I.id, !1));
      }
      const J = [];
      for (const I of D)
        I.selected && J.push(wi(I.id, !1));
      V(H), B(J);
    },
    setMinZoom: (N) => {
      const { panZoom: R, maxZoom: j } = _();
      R?.setScaleExtent([N, j]), x({ minZoom: N });
    },
    setMaxZoom: (N) => {
      const { panZoom: R, minZoom: j } = _();
      R?.setScaleExtent([j, N]), x({ maxZoom: N });
    },
    setTranslateExtent: (N) => {
      _().panZoom?.setTranslateExtent(N), x({ translateExtent: N });
    },
    resetSelectedElements: () => {
      const { edges: N, nodes: R, triggerNodeChanges: j, triggerEdgeChanges: C, elementsSelectable: O } = _();
      if (!O)
        return;
      const V = R.reduce((U, D) => D.selected ? [...U, wi(D.id, !1)] : U, []), B = N.reduce((U, D) => D.selected ? [...U, wi(D.id, !1)] : U, []);
      j(V), C(B);
    },
    setNodeExtent: (N) => {
      const { nodes: R, nodeLookup: j, parentLookup: C, nodeOrigin: O, elevateNodesOnSelect: V, nodeExtent: B, zIndexMode: U } = _();
      N[0][0] === B[0][0] && N[0][1] === B[0][1] && N[1][0] === B[1][0] && N[1][1] === B[1][1] || (am(R, j, C, {
        nodeOrigin: O,
        nodeExtent: N,
        elevateNodesOnSelect: V,
        checkEquality: !1,
        zIndexMode: U
      }), x({ nodeExtent: N }));
    },
    panBy: (N) => {
      const { transform: R, width: j, height: C, panZoom: O, translateExtent: V } = _();
      return PD({ delta: N, panZoom: O, transform: R, translateExtent: V, width: j, height: C });
    },
    setCenter: async (N, R, j) => {
      const { width: C, height: O, maxZoom: V, panZoom: B } = _();
      if (!B)
        return !1;
      const U = typeof j?.zoom < "u" ? j.zoom : V;
      return await B.setViewport({
        x: C / 2 - N * U,
        y: O / 2 - R * U,
        zoom: U
      }, { duration: j?.duration, ease: j?.ease, interpolate: j?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...iw }
      });
    },
    updateConnection: (N) => {
      x({ connection: N });
    },
    reset: () => x({ ...qb() })
  };
}, Object.is);
function u_({ initialNodes: e, initialEdges: a, defaultNodes: i, defaultEdges: l, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: p, fitView: m, nodeOrigin: y, nodeExtent: g, zIndexMode: b, children: x }) {
  const [_] = S.useState(() => g4({
    nodes: e,
    edges: a,
    defaultNodes: i,
    defaultEdges: l,
    width: s,
    height: u,
    fitView: m,
    minZoom: c,
    maxZoom: d,
    fitViewOptions: p,
    nodeOrigin: y,
    nodeExtent: g,
    zIndexMode: b
  }));
  return v.jsx(DA, { value: _, children: v.jsx(aj, { children: x }) });
}
function v4({ children: e, nodes: a, edges: i, defaultNodes: l, defaultEdges: s, width: u, height: c, fitView: d, fitViewOptions: p, minZoom: m, maxZoom: y, nodeOrigin: g, nodeExtent: b, zIndexMode: x }) {
  return S.useContext(Gc) ? v.jsx(v.Fragment, { children: e }) : v.jsx(u_, { initialNodes: a, initialEdges: i, defaultNodes: l, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: d, initialFitViewOptions: p, initialMinZoom: m, initialMaxZoom: y, nodeOrigin: g, nodeExtent: b, zIndexMode: x, children: e });
}
const y4 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function b4({ nodes: e, edges: a, defaultNodes: i, defaultEdges: l, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: d, onEdgeClick: p, onInit: m, onMove: y, onMoveStart: g, onMoveEnd: b, onConnect: x, onConnectStart: _, onConnectEnd: E, onClickConnectStart: N, onClickConnectEnd: R, onNodeMouseEnter: j, onNodeMouseMove: C, onNodeMouseLeave: O, onNodeContextMenu: V, onNodeDoubleClick: B, onNodeDragStart: U, onNodeDrag: D, onNodeDragStop: H, onNodesDelete: J, onEdgesDelete: I, onDelete: Q, onSelectionChange: ae, onSelectionDragStart: L, onSelectionDrag: Y, onSelectionDragStop: T, onSelectionContextMenu: z, onSelectionStart: F, onSelectionEnd: X, onBeforeDelete: ne, connectionMode: A, connectionLineType: k = ei.Bezier, connectionLineStyle: G, connectionLineComponent: ee, connectionLineContainerStyle: se, deleteKeyCode: de = "Backspace", selectionKeyCode: he = "Shift", selectionOnDrag: W = !1, selectionMode: ve = ts.Full, panActivationKeyCode: De = "Space", multiSelectionKeyCode: Oe = as() ? "Meta" : "Control", zoomActivationKeyCode: Ee = as() ? "Meta" : "Control", snapToGrid: we, snapGrid: Me, onlyRenderVisibleElements: Ye = !1, selectNodesOnDrag: ye, nodesDraggable: pe, autoPanOnNodeFocus: _e, nodesConnectable: Re, nodesFocusable: Ae, nodeOrigin: lt = Hw, edgesFocusable: Ze, edgesReconnectable: Fe, elementsSelectable: Ke = !0, defaultViewport: vt = IA, minZoom: yt = 0.5, maxZoom: Yt = 2, translateExtent: Lt = es, preventScrolling: pt = !0, nodeExtent: ut, defaultMarkerColor: Zn = "#b1b1b7", zoomOnScroll: _n = !0, zoomOnPinch: nn = !0, panOnScroll: Kt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: Ut = Ni.Free, zoomOnDoubleClick: _r = !0, panOnDrag: Aa = !0, onPaneClick: Sn, onPaneMouseEnter: ma, onPaneMouseMove: Ln, onPaneMouseLeave: Qn, onPaneScroll: fn, onPaneContextMenu: Ve, paneClickDistance: bt = 1, nodeClickDistance: kt = 0, children: Vt, onReconnect: gn, onReconnectStart: gt, onReconnectEnd: Wt, onEdgeContextMenu: pa, onEdgeDoubleClick: en, onEdgeMouseEnter: $, onEdgeMouseMove: Z, onEdgeMouseLeave: te, reconnectRadius: me = 10, onNodesChange: ge, onEdgesChange: Ce, noDragClassName: xe = "nodrag", noWheelClassName: Ne = "nowheel", noPanClassName: Se = "nopan", fitView: ze, fitViewOptions: Le, connectOnClick: qe, attributionPosition: Be, proOptions: Pe, defaultEdgeOptions: ot, elevateNodesOnSelect: Ct = !0, elevateEdgesOnSelect: ct = !1, disableKeyboardA11y: et = !1, autoPanOnConnect: zt, autoPanOnNodeDrag: rt, autoPanOnSelection: ja = !0, autoPanSpeed: kn, connectionRadius: dn, isValidConnection: an, onError: En, style: Sr, id: Nn, nodeDragThreshold: Er, connectionDragThreshold: ga, viewport: va, onViewportChange: $e, width: xt, height: vn, colorMode: Hn = "light", debug: Nr, onScroll: Xa, ariaLabelConfig: ht, zIndexMode: Kn = "basic", ...rn }, ai) {
  const ki = Nn || "1", Vl = XA(Hn), Cr = S.useCallback(($l) => {
    $l.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Xa?.($l);
  }, [Xa]);
  return v.jsx("div", { "data-testid": "rf__wrapper", ...rn, onScroll: Cr, style: { ...Sr, ...y4 }, ref: ai, className: Zt(["react-flow", s, Vl]), id: Nn, role: "application", children: v.jsxs(v4, { nodes: e, edges: a, width: xt, height: vn, fitView: ze, fitViewOptions: Le, minZoom: yt, maxZoom: Yt, nodeOrigin: lt, nodeExtent: ut, zIndexMode: Kn, children: [v.jsx(FA, { nodes: e, edges: a, defaultNodes: i, defaultEdges: l, onConnect: x, onConnectStart: _, onConnectEnd: E, onClickConnectStart: N, onClickConnectEnd: R, nodesDraggable: pe, autoPanOnNodeFocus: _e, nodesConnectable: Re, nodesFocusable: Ae, edgesFocusable: Ze, edgesReconnectable: Fe, elementsSelectable: Ke, elevateNodesOnSelect: Ct, elevateEdgesOnSelect: ct, minZoom: yt, maxZoom: Yt, nodeExtent: ut, onNodesChange: ge, onEdgesChange: Ce, snapToGrid: we, snapGrid: Me, connectionMode: A, translateExtent: Lt, connectOnClick: qe, defaultEdgeOptions: ot, fitView: ze, fitViewOptions: Le, onNodesDelete: J, onEdgesDelete: I, onDelete: Q, onNodeDragStart: U, onNodeDrag: D, onNodeDragStop: H, onSelectionDrag: Y, onSelectionDragStart: L, onSelectionDragStop: T, onMove: y, onMoveStart: g, onMoveEnd: b, noPanClassName: Se, nodeOrigin: lt, rfId: ki, autoPanOnConnect: zt, autoPanOnNodeDrag: rt, autoPanSpeed: kn, onError: En, connectionRadius: dn, isValidConnection: an, selectNodesOnDrag: ye, nodeDragThreshold: Er, connectionDragThreshold: ga, onBeforeDelete: ne, debug: Nr, ariaLabelConfig: ht, zIndexMode: Kn }), v.jsx(m4, { onInit: m, onNodeClick: d, onEdgeClick: p, onNodeMouseEnter: j, onNodeMouseMove: C, onNodeMouseLeave: O, onNodeContextMenu: V, onNodeDoubleClick: B, nodeTypes: u, edgeTypes: c, connectionLineType: k, connectionLineStyle: G, connectionLineComponent: ee, connectionLineContainerStyle: se, selectionKeyCode: he, selectionOnDrag: W, selectionMode: ve, deleteKeyCode: de, multiSelectionKeyCode: Oe, panActivationKeyCode: De, zoomActivationKeyCode: Ee, onlyRenderVisibleElements: Ye, defaultViewport: vt, translateExtent: Lt, minZoom: yt, maxZoom: Yt, preventScrolling: pt, zoomOnScroll: _n, zoomOnPinch: nn, zoomOnDoubleClick: _r, panOnScroll: Kt, panOnScrollSpeed: Ot, panOnScrollMode: Ut, panOnDrag: Aa, autoPanOnSelection: ja, onPaneClick: Sn, onPaneMouseEnter: ma, onPaneMouseMove: Ln, onPaneMouseLeave: Qn, onPaneScroll: fn, onPaneContextMenu: Ve, paneClickDistance: bt, nodeClickDistance: kt, onSelectionContextMenu: z, onSelectionStart: F, onSelectionEnd: X, onReconnect: gn, onReconnectStart: gt, onReconnectEnd: Wt, onEdgeContextMenu: pa, onEdgeDoubleClick: en, onEdgeMouseEnter: $, onEdgeMouseMove: Z, onEdgeMouseLeave: te, reconnectRadius: me, defaultMarkerColor: Zn, noDragClassName: xe, noWheelClassName: Ne, noPanClassName: Se, rfId: ki, disableKeyboardA11y: et, nodeExtent: ut, viewport: va, onViewportChange: $e }), v.jsx(qA, { onSelectionChange: ae }), Vt, v.jsx(HA, { proOptions: Pe, position: Be }), v.jsx(kA, { rfId: ki, disableKeyboardA11y: et })] }) });
}
var x4 = Uw(b4);
function w4({ dimensions: e, lineWidth: a, variant: i, className: l }) {
  return v.jsx("path", { strokeWidth: a, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Zt(["react-flow__background-pattern", i, l]) });
}
function _4({ radius: e, className: a }) {
  return v.jsx("circle", { cx: e, cy: e, r: e, className: Zt(["react-flow__background-pattern", "dots", a]) });
}
var Ya;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(Ya || (Ya = {}));
const S4 = {
  [Ya.Dots]: 1,
  [Ya.Lines]: 1,
  [Ya.Cross]: 6
}, E4 = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function c_({
  id: e,
  variant: a = Ya.Dots,
  // only used for dots and cross
  gap: i = 20,
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
  const g = S.useRef(null), { transform: b, patternId: x } = st(E4, At), _ = l || S4[a], E = a === Ya.Dots, N = a === Ya.Cross, R = Array.isArray(i) ? i : [i, i], j = [R[0] * b[2] || 1, R[1] * b[2] || 1], C = _ * b[2], O = Array.isArray(u) ? u : [u, u], V = N ? [C, C] : j, B = [
    O[0] * b[2] || 1 + V[0] / 2,
    O[1] * b[2] || 1 + V[1] / 2
  ], U = `${x}${e || ""}`;
  return v.jsxs("svg", { className: Zt(["react-flow__background", m]), style: {
    ...p,
    ...Xc,
    "--xy-background-color-props": d,
    "--xy-background-pattern-color-props": c
  }, ref: g, "data-testid": "rf__background", children: [v.jsx("pattern", { id: U, x: b[0] % j[0], y: b[1] % j[1], width: j[0], height: j[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${B[0]},-${B[1]})`, children: E ? v.jsx(_4, { radius: C / 2, className: y }) : v.jsx(w4, { dimensions: V, lineWidth: s, variant: a, className: y }) }), v.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${U})` })] });
}
c_.displayName = "Background";
const Ib = S.memo(c_);
function N4() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: v.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function C4() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: v.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function R4() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: v.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function T4() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: v.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function M4() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: v.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function $u({ children: e, className: a, ...i }) {
  return v.jsx("button", { type: "button", className: Zt(["react-flow__controls-button", a]), ...i, children: e });
}
const D4 = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function f_({ style: e, showZoom: a = !0, showFitView: i = !0, showInteractive: l = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: d, onInteractiveChange: p, className: m, children: y, position: g = "bottom-left", orientation: b = "vertical", "aria-label": x }) {
  const _ = jt(), { isInteractive: E, minZoomReached: N, maxZoomReached: R, ariaLabelConfig: j } = st(D4, At), { zoomIn: C, zoomOut: O, fitView: V } = ep(), B = () => {
    C(), u?.();
  }, U = () => {
    O(), c?.();
  }, D = () => {
    V(s), d?.();
  }, H = () => {
    _.setState({
      nodesDraggable: !E,
      nodesConnectable: !E,
      elementsSelectable: !E
    }), p?.(!E);
  }, J = b === "horizontal" ? "horizontal" : "vertical";
  return v.jsxs(Fc, { className: Zt(["react-flow__controls", J, m]), position: g, style: e, "data-testid": "rf__controls", "aria-label": x ?? j["controls.ariaLabel"], children: [a && v.jsxs(v.Fragment, { children: [v.jsx($u, { onClick: B, className: "react-flow__controls-zoomin", title: j["controls.zoomIn.ariaLabel"], "aria-label": j["controls.zoomIn.ariaLabel"], disabled: R, children: v.jsx(N4, {}) }), v.jsx($u, { onClick: U, className: "react-flow__controls-zoomout", title: j["controls.zoomOut.ariaLabel"], "aria-label": j["controls.zoomOut.ariaLabel"], disabled: N, children: v.jsx(C4, {}) })] }), i && v.jsx($u, { className: "react-flow__controls-fitview", onClick: D, title: j["controls.fitView.ariaLabel"], "aria-label": j["controls.fitView.ariaLabel"], children: v.jsx(R4, {}) }), l && v.jsx($u, { className: "react-flow__controls-interactive", onClick: H, title: j["controls.interactive.ariaLabel"], "aria-label": j["controls.interactive.ariaLabel"], children: E ? v.jsx(M4, {}) : v.jsx(T4, {}) }), y] });
}
f_.displayName = "Controls";
const A4 = S.memo(f_);
function j4({ id: e, x: a, y: i, width: l, height: s, style: u, color: c, strokeColor: d, strokeWidth: p, className: m, borderRadius: y, shapeRendering: g, selected: b, onClick: x }) {
  const { background: _, backgroundColor: E } = u || {}, N = c || _ || E;
  return v.jsx("rect", { className: Zt(["react-flow__minimap-node", { selected: b }, m]), x: a, y: i, rx: y, ry: y, width: l, height: s, style: {
    fill: N,
    stroke: d,
    strokeWidth: p
  }, shapeRendering: g, onClick: x ? (R) => x(R, e) : void 0 });
}
const O4 = S.memo(j4), z4 = (e) => e.nodes.map((a) => a.id), Ch = (e) => e instanceof Function ? e : () => e;
function L4({
  nodeStrokeColor: e,
  nodeColor: a,
  nodeClassName: i = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = O4,
  onClick: c
}) {
  const d = st(z4, At), p = Ch(a), m = Ch(e), y = Ch(i), g = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return v.jsx(v.Fragment, { children: d.map((b) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    v.jsx(H4, { id: b, nodeColorFunc: p, nodeStrokeColorFunc: m, nodeClassNameFunc: y, nodeBorderRadius: l, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: g }, b)
  )) });
}
function k4({ id: e, nodeColorFunc: a, nodeStrokeColorFunc: i, nodeClassNameFunc: l, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: d, onClick: p }) {
  const { node: m, x: y, y: g, width: b, height: x } = st((_) => {
    const E = _.nodeLookup.get(e);
    if (!E)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const N = E.internals.userNode, { x: R, y: j } = E.internals.positionAbsolute, { width: C, height: O } = wr(N);
    return {
      node: N,
      x: R,
      y: j,
      width: C,
      height: O
    };
  }, At);
  return !m || m.hidden || !dw(m) ? null : v.jsx(d, { x: y, y: g, width: b, height: x, style: m.style, selected: !!m.selected, className: l(m), color: a(m), borderRadius: s, strokeColor: i(m), strokeWidth: u, shapeRendering: c, onClick: p, id: m.id });
}
const H4 = S.memo(k4);
var B4 = S.memo(L4);
const U4 = 200, V4 = 150, $4 = (e) => !e.hidden, q4 = (e) => {
  const a = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: e.nodeLookup.size > 0 ? cw(vs(e.nodeLookup, { filter: $4 }), a) : a,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, I4 = "react-flow__minimap-desc";
function d_({
  style: e,
  className: a,
  nodeStrokeColor: i,
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
  position: b = "bottom-right",
  onClick: x,
  onNodeClick: _,
  pannable: E = !1,
  zoomable: N = !1,
  ariaLabel: R,
  inversePan: j,
  zoomStep: C = 1,
  offsetScale: O = 5
}) {
  const V = jt(), B = S.useRef(null), { boundingRect: U, viewBB: D, rfId: H, panZoom: J, translateExtent: I, flowWidth: Q, flowHeight: ae, ariaLabelConfig: L } = st(q4, At), Y = e?.width ?? U4, T = e?.height ?? V4, z = U.width / Y, F = U.height / T, X = Math.max(z, F), ne = X * Y, A = X * T, k = O * X, G = U.x - (ne - U.width) / 2 - k, ee = U.y - (A - U.height) / 2 - k, se = ne + k * 2, de = A + k * 2, he = `${I4}-${H}`, W = S.useRef(0), ve = S.useRef();
  W.current = X, S.useEffect(() => {
    if (B.current && J)
      return ve.current = aA({
        domNode: B.current,
        panZoom: J,
        getTransform: () => V.getState().transform,
        getViewScale: () => W.current
      }), () => {
        ve.current?.destroy();
      };
  }, [J]), S.useEffect(() => {
    ve.current?.update({
      translateExtent: I,
      width: Q,
      height: ae,
      inversePan: j,
      pannable: E,
      zoomStep: C,
      zoomable: N
    });
  }, [E, N, j, C, I, Q, ae]);
  const De = x ? (we) => {
    const [Me, Ye] = ve.current?.pointer(we) || [0, 0];
    x(we, { x: Me, y: Ye });
  } : void 0, Oe = _ ? S.useCallback((we, Me) => {
    const Ye = V.getState().nodeLookup.get(Me).internals.userNode;
    _(we, Ye);
  }, []) : void 0, Ee = R ?? L["minimap.ariaLabel"];
  return v.jsx(Fc, { position: b, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof g == "number" ? g * X : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof i == "string" ? i : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Zt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: v.jsxs("svg", { width: Y, height: T, viewBox: `${G} ${ee} ${se} ${de}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": he, ref: B, onClick: De, children: [Ee && v.jsx("title", { id: he, children: Ee }), v.jsx(B4, { onClick: Oe, nodeColor: l, nodeStrokeColor: i, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: d }), v.jsx("path", { className: "react-flow__minimap-mask", d: `M${G - k},${ee - k}h${se + k * 2}v${de + k * 2}h${-se - k * 2}z
        M${D.x},${D.y}h${D.width}v${D.height}h${-D.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
d_.displayName = "MiniMap";
const Y4 = S.memo(d_), G4 = (e) => (a) => e ? `${Math.max(1 / a.transform[2], 1)}` : void 0, F4 = {
  [zl.Line]: "right",
  [zl.Handle]: "bottom-right"
};
function X4({ nodeId: e, position: a, variant: i = zl.Handle, className: l, style: s = void 0, children: u, color: c, minWidth: d = 10, minHeight: p = 10, maxWidth: m = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: g = !1, resizeDirection: b, autoScale: x = !0, shouldResize: _, onResizeStart: E, onResize: N, onResizeEnd: R }) {
  const j = Iw(), C = typeof e == "string" ? e : j, O = jt(), V = S.useRef(null), B = i === zl.Handle, U = st(S.useCallback(G4(B && x), [B, x]), At), D = S.useRef(null), H = a ?? F4[i];
  S.useEffect(() => {
    if (!(!V.current || !C))
      return D.current || (D.current = gA({
        domNode: V.current,
        nodeId: C,
        getStoreItems: () => {
          const { nodeLookup: I, transform: Q, snapGrid: ae, snapToGrid: L, nodeOrigin: Y, domNode: T } = O.getState();
          return {
            nodeLookup: I,
            transform: Q,
            snapGrid: ae,
            snapToGrid: L,
            nodeOrigin: Y,
            paneDomNode: T
          };
        },
        onChange: (I, Q) => {
          const { triggerNodeChanges: ae, nodeLookup: L, parentLookup: Y, nodeOrigin: T } = O.getState(), z = [], F = { x: I.x, y: I.y }, X = L.get(C);
          if (X && X.expandParent && X.parentId) {
            const ne = X.origin ?? T, A = I.width ?? X.measured.width ?? 0, k = I.height ?? X.measured.height ?? 0, G = {
              id: X.id,
              parentId: X.parentId,
              rect: {
                width: A,
                height: k,
                ...hw({
                  x: I.x ?? X.position.x,
                  y: I.y ?? X.position.y
                }, { width: A, height: k }, X.parentId, L, ne)
              }
            }, ee = Jm([G], L, Y, T);
            z.push(...ee), F.x = I.x ? Math.max(ne[0] * A, I.x) : void 0, F.y = I.y ? Math.max(ne[1] * k, I.y) : void 0;
          }
          if (F.x !== void 0 && F.y !== void 0) {
            const ne = {
              id: C,
              type: "position",
              position: { ...F }
            };
            z.push(ne);
          }
          if (I.width !== void 0 && I.height !== void 0) {
            const A = {
              id: C,
              type: "dimensions",
              resizing: !0,
              setAttributes: b ? b === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: I.width,
                height: I.height
              }
            };
            z.push(A);
          }
          for (const ne of Q) {
            const A = {
              ...ne,
              type: "position"
            };
            z.push(A);
          }
          ae(z);
        },
        onEnd: ({ width: I, height: Q }) => {
          const ae = {
            id: C,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: I,
              height: Q
            }
          };
          O.getState().triggerNodeChanges([ae]);
        }
      })), D.current.update({
        controlPosition: H,
        boundaries: {
          minWidth: d,
          minHeight: p,
          maxWidth: m,
          maxHeight: y
        },
        keepAspectRatio: g,
        resizeDirection: b,
        onResizeStart: E,
        onResize: N,
        onResizeEnd: R,
        shouldResize: _
      }), () => {
        D.current?.destroy();
      };
  }, [
    H,
    d,
    p,
    m,
    y,
    g,
    E,
    N,
    R,
    _
  ]);
  const J = H.split("-");
  return v.jsx("div", { className: Zt(["react-flow__resize-control", "nodrag", ...J, i, l]), ref: V, style: {
    ...s,
    scale: U,
    ...c && { [B ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
S.memo(X4);
var P4 = "_1bllf8b0", Z4 = "_1bllf8b1";
const Yb = 16, Q4 = "rgba(186, 158, 255, 0.14)", K4 = "rgba(186, 158, 255, 0.06)", W4 = "rgba(0, 0, 0, 0.6)", J4 = "#1d2023", e3 = "#ba9eff";
function t3({
  nodes: e,
  edges: a,
  nodeTypes: i,
  showMiniMap: l = !0,
  showControls: s = !0,
  fitView: u = !0,
  className: c,
  ariaLabel: d,
  children: p,
  onNodeClick: m
}) {
  const y = [P4, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx("div", { className: y, "aria-label": d ?? "node graph", children: /* @__PURE__ */ v.jsxs(
    x4,
    {
      nodes: e,
      edges: a,
      ...i ? { nodeTypes: i } : {},
      fitView: u,
      fitViewOptions: { padding: 0.2 },
      nodesDraggable: !1,
      nodesConnectable: !1,
      elementsSelectable: !0,
      minZoom: 0.2,
      maxZoom: 1.8,
      proOptions: { hideAttribution: !0 },
      onNodeClick: (g, b) => m?.(b),
      children: [
        /* @__PURE__ */ v.jsx(
          Ib,
          {
            id: "minor",
            variant: Ya.Dots,
            gap: Yb,
            size: 1.1,
            color: Q4
          }
        ),
        /* @__PURE__ */ v.jsx(
          Ib,
          {
            id: "major",
            variant: Ya.Lines,
            gap: Yb * 5,
            lineWidth: 1,
            color: K4
          }
        ),
        s && /* @__PURE__ */ v.jsx(A4, { showInteractive: !1 }),
        l && /* @__PURE__ */ v.jsx(
          Y4,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: W4,
            nodeColor: () => J4,
            nodeStrokeColor: () => e3,
            className: Z4
          }
        ),
        p
      ]
    }
  ) });
}
function n3(e) {
  return /* @__PURE__ */ v.jsx(u_, { children: /* @__PURE__ */ v.jsx(t3, { ...e }) });
}
var a3 = "a9gtw0", r3 = "a9gtw1", i3 = "a9gtw2", l3 = "a9gtw3", o3 = "a9gtw4", s3 = "a9gtw5", u3 = "a9gtw6", c3 = "a9gtw7";
const f3 = {
  default: "",
  raised: r3,
  inset: i3
};
function Va({
  title: e,
  description: a,
  actions: i,
  children: l,
  className: s,
  elevation: u = "default"
}) {
  const c = [a3, f3[u], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("section", { className: c, children: [
    (e || i) && /* @__PURE__ */ v.jsxs("header", { className: l3, children: [
      /* @__PURE__ */ v.jsxs("div", { className: o3, children: [
        e && /* @__PURE__ */ v.jsx("span", { className: u3, children: e }),
        a && /* @__PURE__ */ v.jsx("span", { className: c3, children: a })
      ] }),
      i && /* @__PURE__ */ v.jsx("div", { className: s3, children: i })
    ] }),
    l
  ] });
}
const np = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function ap() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function Cc() {
  return {
    phase: "idle",
    jobId: null,
    stage: null,
    stageDetail: null,
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
    stageStates: ap()
  };
}
function Gb(e, a, i = Date.now()) {
  return {
    ...Cc(),
    phase: "running",
    jobId: e,
    lastFrameAt: i,
    stageStates: {
      ...ap(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function d3(e, a, i = Date.now()) {
  const l = { ...e, stalled: !1, lastFrameAt: i };
  switch (a.method) {
    case "svi2.video.progress":
      return {
        ...l,
        overallFraction: g3(a.params.fraction),
        stage: a.params.stage ?? l.stage,
        stageDetail: a.params.detail ?? l.stageDetail
      };
    case "svi2.video.clip.started":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...l.stageStates, qwen_edit: x3(l, "qwen_edit"), diffusion: "active" }
      };
    case "svi2.video.clip.step":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        step: a.params.step,
        totalSteps: a.params.total_steps,
        secondsPerStep: y3(
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
        stageStates: h_(l.stageStates)
      };
    default:
      return l;
  }
}
function h3(e) {
  return { ...e, phase: "cancelled", stageStates: ap() };
}
const m3 = -32108;
function p3(e) {
  return {
    ...e,
    phase: "error",
    stalled: !1,
    errorCode: m3,
    errorMessage: "Lost connection to the render — it may still be running; check History.",
    stageStates: h_(e.stageStates)
  };
}
function Fb(e) {
  return e.phase !== "running" || e.stalled ? e : { ...e, stalled: !0 };
}
function Ho(e) {
  const a = Cc();
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
function g3(e) {
  return Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
const v3 = 0.3;
function y3(e, a) {
  return a === void 0 || !Number.isFinite(a) || a <= 0 ? e : e === null ? a : e + v3 * (a - e);
}
function b3(e) {
  if (e.secondsPerStep === null || e.totalSteps <= 0 || e.numClips <= 0)
    return null;
  const a = Math.max(0, e.totalSteps - e.step), i = Math.max(0, e.numClips - e.clipIndex - 1);
  return (a + i * e.totalSteps) * e.secondsPerStep;
}
function x3(e, a) {
  return e.stageStates[a] === "active" ? "done" : e.stageStates[a];
}
function h_(e) {
  const a = { ...e };
  for (const i of np)
    a[i] === "active" && (a[i] = "error");
  return a;
}
function w3(e) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e));
}
const _3 = (e) => {
  switch (e) {
    case "success":
      return N3;
    case "info":
      return R3;
    case "warning":
      return C3;
    case "error":
      return T3;
    default:
      return null;
  }
}, S3 = Array(12).fill(0), E3 = ({ visible: e, className: a }) => /* @__PURE__ */ be.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ be.createElement("div", {
  className: "sonner-spinner"
}, S3.map((i, l) => /* @__PURE__ */ be.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), N3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), C3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), R3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), T3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), M3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ be.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ be.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), D3 = () => {
  const [e, a] = be.useState(document.hidden);
  return be.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), e;
};
let lm = 1;
class A3 {
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
      const { message: l, ...s } = a, u = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : lm++, c = this.toasts.find((p) => p.id === u), d = a.dismissible === void 0 ? !0 : a.dismissible;
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
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((i) => i({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((i) => {
      this.subscribers.forEach((l) => l({
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
      let l;
      i.loading !== void 0 && (l = this.create({
        ...i,
        promise: a,
        type: "loading",
        message: i.loading,
        description: typeof i.description != "function" ? i.description : void 0
      }));
      const s = Promise.resolve(a instanceof Function ? a() : a);
      let u = l !== void 0, c;
      const d = s.then(async (m) => {
        if (c = [
          "resolve",
          m
        ], be.isValidElement(m))
          u = !1, this.create({
            id: l,
            type: "default",
            message: m
          });
        else if (O3(m) && !m.ok) {
          u = !1;
          const g = typeof i.error == "function" ? await i.error(`HTTP error! status: ${m.status}`) : i.error, b = typeof i.description == "function" ? await i.description(`HTTP error! status: ${m.status}`) : i.description, _ = typeof g == "object" && !be.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: b,
            ..._
          });
        } else if (m instanceof Error) {
          u = !1;
          const g = typeof i.error == "function" ? await i.error(m) : i.error, b = typeof i.description == "function" ? await i.description(m) : i.description, _ = typeof g == "object" && !be.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: b,
            ..._
          });
        } else if (i.success !== void 0) {
          u = !1;
          const g = typeof i.success == "function" ? await i.success(m) : i.success, b = typeof i.description == "function" ? await i.description(m) : i.description, _ = typeof g == "object" && !be.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "success",
            description: b,
            ..._
          });
        }
      }).catch(async (m) => {
        if (c = [
          "reject",
          m
        ], i.error !== void 0) {
          u = !1;
          const y = typeof i.error == "function" ? await i.error(m) : i.error, g = typeof i.description == "function" ? await i.description(m) : i.description, x = typeof y == "object" && !be.isValidElement(y) ? y : {
            message: y
          };
          this.create({
            id: l,
            type: "error",
            description: g,
            ...x
          });
        }
      }).finally(() => {
        u && (this.dismiss(l), l = void 0), i.finally == null || i.finally.call(i);
      }), p = () => new Promise((m, y) => d.then(() => c[0] === "reject" ? y(c[1]) : m(c[1])).catch(y));
      return typeof l != "string" && typeof l != "number" ? {
        unwrap: p
      } : Object.assign(l, {
        unwrap: p
      });
    }, this.custom = (a, i) => {
      const l = i?.id || lm++;
      return this.create({
        jsx: a(l),
        id: l,
        ...i
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const jn = new A3(), j3 = (e, a) => {
  const i = a?.id || lm++;
  return jn.addToast({
    title: e,
    ...a,
    id: i
  }), i;
}, O3 = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", z3 = j3, L3 = () => jn.toasts, k3 = () => jn.getActiveToasts(), ca = Object.assign(z3, {
  success: jn.success,
  info: jn.info,
  warning: jn.warning,
  error: jn.error,
  custom: jn.custom,
  message: jn.message,
  promise: jn.promise,
  dismiss: jn.dismiss,
  loading: jn.loading
}, {
  getHistory: L3,
  getToasts: k3
});
w3("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function qu(e) {
  return e.label !== void 0;
}
const H3 = 3, B3 = "24px", U3 = "16px", Xb = 4e3, V3 = 356, $3 = 14, q3 = 45, I3 = 200;
function Ba(...e) {
  return e.filter(Boolean).join(" ");
}
function Y3(e) {
  const [a, i] = e.split("-"), l = [];
  return a && l.push(a), i && l.push(i), l;
}
const G3 = (e) => {
  var a, i, l, s, u, c, d, p, m;
  const { invert: y, toast: g, unstyled: b, interacting: x, setHeights: _, visibleToasts: E, heights: N, index: R, toasts: j, expanded: C, removeToast: O, defaultRichColors: V, closeButton: B, style: U, cancelButtonStyle: D, actionButtonStyle: H, className: J = "", descriptionClassName: I = "", duration: Q, position: ae, gap: L, expandByDefault: Y, classNames: T, icons: z, closeButtonAriaLabel: F = "Close toast" } = e, [X, ne] = be.useState(null), [A, k] = be.useState(null), [G, ee] = be.useState(!1), [se, de] = be.useState(!1), [he, W] = be.useState(!1), [ve, De] = be.useState(!1), [Oe, Ee] = be.useState(!1), [we, Me] = be.useState(0), [Ye, ye] = be.useState(0), pe = be.useRef(g.duration || Q || Xb), _e = be.useRef(null), Re = be.useRef(null), Ae = R === 0, lt = R + 1 <= E, Ze = g.type, Fe = g.dismissible !== !1, Ke = g.className || "", vt = g.descriptionClassName || "", yt = be.useMemo(() => N.findIndex((Ve) => Ve.toastId === g.id) || 0, [
    N,
    g.id
  ]), Yt = be.useMemo(() => {
    var Ve;
    return (Ve = g.closeButton) != null ? Ve : B;
  }, [
    g.closeButton,
    B
  ]), Lt = be.useMemo(() => g.duration || Q || Xb, [
    g.duration,
    Q
  ]), pt = be.useRef(0), ut = be.useRef(0), Zn = be.useRef(0), _n = be.useRef(null), [nn, Kt] = ae.split("-"), Ot = be.useMemo(() => N.reduce((Ve, bt, kt) => kt >= yt ? Ve : Ve + bt.height, 0), [
    N,
    yt
  ]), Ut = D3(), _r = g.invert || y, Aa = Ze === "loading";
  ut.current = be.useMemo(() => yt * L + Ot, [
    yt,
    Ot
  ]), be.useEffect(() => {
    pe.current = Lt;
  }, [
    Lt
  ]), be.useEffect(() => {
    ee(!0);
  }, []), be.useEffect(() => {
    const Ve = Re.current;
    if (Ve) {
      const bt = Ve.getBoundingClientRect().height;
      return ye(bt), _((kt) => [
        {
          toastId: g.id,
          height: bt,
          position: g.position
        },
        ...kt
      ]), () => _((kt) => kt.filter((Vt) => Vt.toastId !== g.id));
    }
  }, [
    _,
    g.id
  ]), be.useLayoutEffect(() => {
    if (!G) return;
    const Ve = Re.current, bt = Ve.style.height;
    Ve.style.height = "auto";
    const kt = Ve.getBoundingClientRect().height;
    Ve.style.height = bt, ye(kt), _((Vt) => Vt.find((gt) => gt.toastId === g.id) ? Vt.map((gt) => gt.toastId === g.id ? {
      ...gt,
      height: kt
    } : gt) : [
      {
        toastId: g.id,
        height: kt,
        position: g.position
      },
      ...Vt
    ]);
  }, [
    G,
    g.title,
    g.description,
    _,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const Sn = be.useCallback(() => {
    de(!0), Me(ut.current), _((Ve) => Ve.filter((bt) => bt.toastId !== g.id)), setTimeout(() => {
      O(g);
    }, I3);
  }, [
    g,
    O,
    _,
    ut
  ]);
  be.useEffect(() => {
    if (g.promise && Ze === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let Ve;
    return C || x || Ut ? (() => {
      if (Zn.current < pt.current) {
        const Vt = (/* @__PURE__ */ new Date()).getTime() - pt.current;
        pe.current = pe.current - Vt;
      }
      Zn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      pe.current !== 1 / 0 && (pt.current = (/* @__PURE__ */ new Date()).getTime(), Ve = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), Sn();
      }, pe.current));
    })(), () => clearTimeout(Ve);
  }, [
    C,
    x,
    g,
    Ze,
    Ut,
    Sn
  ]), be.useEffect(() => {
    g.delete && (Sn(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    Sn,
    g.delete
  ]);
  function ma() {
    var Ve;
    if (z?.loading) {
      var bt;
      return /* @__PURE__ */ be.createElement("div", {
        className: Ba(T?.loader, g == null || (bt = g.classNames) == null ? void 0 : bt.loader, "sonner-loader"),
        "data-visible": Ze === "loading"
      }, z.loading);
    }
    return /* @__PURE__ */ be.createElement(E3, {
      className: Ba(T?.loader, g == null || (Ve = g.classNames) == null ? void 0 : Ve.loader),
      visible: Ze === "loading"
    });
  }
  const Ln = g.icon || z?.[Ze] || _3(Ze);
  var Qn, fn;
  return /* @__PURE__ */ be.createElement("li", {
    tabIndex: 0,
    ref: Re,
    className: Ba(J, Ke, T?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, T?.default, T?.[Ze], g == null || (i = g.classNames) == null ? void 0 : i[Ze]),
    "data-sonner-toast": "",
    "data-rich-colors": (Qn = g.richColors) != null ? Qn : V,
    "data-styled": !(g.jsx || g.unstyled || b),
    "data-mounted": G,
    "data-promise": !!g.promise,
    "data-swiped": Oe,
    "data-removed": se,
    "data-visible": lt,
    "data-y-position": nn,
    "data-x-position": Kt,
    "data-index": R,
    "data-front": Ae,
    "data-swiping": he,
    "data-dismissible": Fe,
    "data-type": Ze,
    "data-invert": _r,
    "data-swipe-out": ve,
    "data-swipe-direction": A,
    "data-expanded": !!(C || Y && G),
    "data-testid": g.testId,
    style: {
      "--index": R,
      "--toasts-before": R,
      "--z-index": j.length - R,
      "--offset": `${se ? we : ut.current}px`,
      "--initial-height": Y ? "auto" : `${Ye}px`,
      ...U,
      ...g.style
    },
    onDragEnd: () => {
      W(!1), ne(null), _n.current = null;
    },
    onPointerDown: (Ve) => {
      Ve.button !== 2 && (Aa || !Fe || (_e.current = /* @__PURE__ */ new Date(), Me(ut.current), Ve.target.setPointerCapture(Ve.pointerId), Ve.target.tagName !== "BUTTON" && (W(!0), _n.current = {
        x: Ve.clientX,
        y: Ve.clientY
      })));
    },
    onPointerUp: () => {
      var Ve, bt, kt;
      if (ve || !Fe) return;
      _n.current = null;
      const Vt = Number(((Ve = Re.current) == null ? void 0 : Ve.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), gn = Number(((bt = Re.current) == null ? void 0 : bt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), gt = (/* @__PURE__ */ new Date()).getTime() - ((kt = _e.current) == null ? void 0 : kt.getTime()), Wt = X === "x" ? Vt : gn, pa = Math.abs(Wt) / gt;
      if (Math.abs(Wt) >= q3 || pa > 0.11) {
        Me(ut.current), g.onDismiss == null || g.onDismiss.call(g, g), k(X === "x" ? Vt > 0 ? "right" : "left" : gn > 0 ? "down" : "up"), Sn(), De(!0);
        return;
      } else {
        var en, $;
        (en = Re.current) == null || en.style.setProperty("--swipe-amount-x", "0px"), ($ = Re.current) == null || $.style.setProperty("--swipe-amount-y", "0px");
      }
      Ee(!1), W(!1), ne(null);
    },
    onPointerMove: (Ve) => {
      var bt, kt, Vt;
      if (!_n.current || !Fe || ((bt = window.getSelection()) == null ? void 0 : bt.toString().length) > 0) return;
      const gt = Ve.clientY - _n.current.y, Wt = Ve.clientX - _n.current.x;
      var pa;
      const en = (pa = e.swipeDirections) != null ? pa : Y3(ae);
      !X && (Math.abs(Wt) > 1 || Math.abs(gt) > 1) && ne(Math.abs(Wt) > Math.abs(gt) ? "x" : "y");
      let $ = {
        x: 0,
        y: 0
      };
      const Z = (te) => 1 / (1.5 + Math.abs(te) / 20);
      if (X === "y") {
        if (en.includes("top") || en.includes("bottom"))
          if (en.includes("top") && gt < 0 || en.includes("bottom") && gt > 0)
            $.y = gt;
          else {
            const te = gt * Z(gt);
            $.y = Math.abs(te) < Math.abs(gt) ? te : gt;
          }
      } else if (X === "x" && (en.includes("left") || en.includes("right")))
        if (en.includes("left") && Wt < 0 || en.includes("right") && Wt > 0)
          $.x = Wt;
        else {
          const te = Wt * Z(Wt);
          $.x = Math.abs(te) < Math.abs(Wt) ? te : Wt;
        }
      (Math.abs($.x) > 0 || Math.abs($.y) > 0) && Ee(!0), (kt = Re.current) == null || kt.style.setProperty("--swipe-amount-x", `${$.x}px`), (Vt = Re.current) == null || Vt.style.setProperty("--swipe-amount-y", `${$.y}px`);
    }
  }, Yt && !g.jsx && Ze !== "loading" ? /* @__PURE__ */ be.createElement("button", {
    "aria-label": F,
    "data-disabled": Aa,
    "data-close-button": !0,
    onClick: Aa || !Fe ? () => {
    } : () => {
      Sn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: Ba(T?.closeButton, g == null || (l = g.classNames) == null ? void 0 : l.closeButton)
  }, (fn = z?.close) != null ? fn : M3) : null, (Ze || g.icon || g.promise) && g.icon !== null && (z?.[Ze] !== null || g.icon) ? /* @__PURE__ */ be.createElement("div", {
    "data-icon": "",
    className: Ba(T?.icon, g == null || (s = g.classNames) == null ? void 0 : s.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || ma() : null, g.type !== "loading" ? Ln : null) : null, /* @__PURE__ */ be.createElement("div", {
    "data-content": "",
    className: Ba(T?.content, g == null || (u = g.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ be.createElement("div", {
    "data-title": "",
    className: Ba(T?.title, g == null || (c = g.classNames) == null ? void 0 : c.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ be.createElement("div", {
    "data-description": "",
    className: Ba(I, vt, T?.description, g == null || (d = g.classNames) == null ? void 0 : d.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ be.isValidElement(g.cancel) ? g.cancel : g.cancel && qu(g.cancel) ? /* @__PURE__ */ be.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || D,
    onClick: (Ve) => {
      qu(g.cancel) && Fe && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, Ve), Sn());
    },
    className: Ba(T?.cancelButton, g == null || (p = g.classNames) == null ? void 0 : p.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ be.isValidElement(g.action) ? g.action : g.action && qu(g.action) ? /* @__PURE__ */ be.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || H,
    onClick: (Ve) => {
      qu(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, Ve), !Ve.defaultPrevented && Sn());
    },
    className: Ba(T?.actionButton, g == null || (m = g.classNames) == null ? void 0 : m.actionButton)
  }, g.action.label) : null);
};
function Pb() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function F3(e, a) {
  const i = {};
  return [
    e,
    a
  ].forEach((l, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", d = u ? U3 : B3;
    function p(m) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((y) => {
        i[`${c}-${y}`] = typeof m == "number" ? `${m}px` : m;
      });
    }
    typeof l == "number" || typeof l == "string" ? p(l) : typeof l == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((m) => {
      l[m] === void 0 ? i[`${c}-${m}`] = d : i[`${c}-${m}`] = typeof l[m] == "number" ? `${l[m]}px` : l[m];
    }) : p(d);
  }), i;
}
const X3 = /* @__PURE__ */ be.forwardRef(function(a, i) {
  const { id: l, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: d, closeButton: p, className: m, offset: y, mobileOffset: g, theme: b = "light", richColors: x, duration: _, style: E, visibleToasts: N = H3, toastOptions: R, dir: j = Pb(), gap: C = $3, icons: O, containerAriaLabel: V = "Notifications" } = a, [B, U] = be.useState([]), D = be.useMemo(() => l ? B.filter((G) => G.toasterId === l) : B.filter((G) => !G.toasterId), [
    B,
    l
  ]), H = be.useMemo(() => Array.from(new Set([
    u
  ].concat(D.filter((G) => G.position).map((G) => G.position)))), [
    D,
    u
  ]), [J, I] = be.useState([]), [Q, ae] = be.useState(!1), [L, Y] = be.useState(!1), [T, z] = be.useState(b !== "system" ? b : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), F = be.useRef(null), X = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ne = be.useRef(null), A = be.useRef(!1), k = be.useCallback((G) => {
    U((ee) => {
      var se;
      return (se = ee.find((de) => de.id === G.id)) != null && se.delete || jn.dismiss(G.id), ee.filter(({ id: de }) => de !== G.id);
    });
  }, []);
  return be.useEffect(() => jn.subscribe((G) => {
    if (G.dismiss) {
      requestAnimationFrame(() => {
        U((ee) => ee.map((se) => se.id === G.id ? {
          ...se,
          delete: !0
        } : se));
      });
      return;
    }
    setTimeout(() => {
      MA.flushSync(() => {
        U((ee) => {
          const se = ee.findIndex((de) => de.id === G.id);
          return se !== -1 ? [
            ...ee.slice(0, se),
            {
              ...ee[se],
              ...G
            },
            ...ee.slice(se + 1)
          ] : [
            G,
            ...ee
          ];
        });
      });
    });
  }), [
    B
  ]), be.useEffect(() => {
    if (b !== "system") {
      z(b);
      return;
    }
    if (b === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? z("dark") : z("light")), typeof window > "u") return;
    const G = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      G.addEventListener("change", ({ matches: ee }) => {
        z(ee ? "dark" : "light");
      });
    } catch {
      G.addListener(({ matches: se }) => {
        try {
          z(se ? "dark" : "light");
        } catch (de) {
          console.error(de);
        }
      });
    }
  }, [
    b
  ]), be.useEffect(() => {
    B.length <= 1 && ae(!1);
  }, [
    B
  ]), be.useEffect(() => {
    const G = (ee) => {
      var se;
      if (c.every((W) => ee[W] || ee.code === W)) {
        var he;
        ae(!0), (he = F.current) == null || he.focus();
      }
      ee.code === "Escape" && (document.activeElement === F.current || (se = F.current) != null && se.contains(document.activeElement)) && ae(!1);
    };
    return document.addEventListener("keydown", G), () => document.removeEventListener("keydown", G);
  }, [
    c
  ]), be.useEffect(() => {
    if (F.current)
      return () => {
        ne.current && (ne.current.focus({
          preventScroll: !0
        }), ne.current = null, A.current = !1);
      };
  }, [
    F.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ be.createElement("section", {
    ref: i,
    "aria-label": `${V} ${X}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, H.map((G, ee) => {
    var se;
    const [de, he] = G.split("-");
    return D.length ? /* @__PURE__ */ be.createElement("ol", {
      key: G,
      dir: j === "auto" ? Pb() : j,
      tabIndex: -1,
      ref: F,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": T,
      "data-y-position": de,
      "data-x-position": he,
      style: {
        "--front-toast-height": `${((se = J[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${V3}px`,
        "--gap": `${C}px`,
        ...E,
        ...F3(y, g)
      },
      onBlur: (W) => {
        A.current && !W.currentTarget.contains(W.relatedTarget) && (A.current = !1, ne.current && (ne.current.focus({
          preventScroll: !0
        }), ne.current = null));
      },
      onFocus: (W) => {
        W.target instanceof HTMLElement && W.target.dataset.dismissible === "false" || A.current || (A.current = !0, ne.current = W.relatedTarget);
      },
      onMouseEnter: () => ae(!0),
      onMouseMove: () => ae(!0),
      onMouseLeave: () => {
        L || ae(!1);
      },
      onDragEnd: () => ae(!1),
      onPointerDown: (W) => {
        W.target instanceof HTMLElement && W.target.dataset.dismissible === "false" || Y(!0);
      },
      onPointerUp: () => Y(!1)
    }, D.filter((W) => !W.position && ee === 0 || W.position === G).map((W, ve) => {
      var De, Oe;
      return /* @__PURE__ */ be.createElement(G3, {
        key: W.id,
        icons: O,
        index: ve,
        toast: W,
        defaultRichColors: x,
        duration: (De = R?.duration) != null ? De : _,
        className: R?.className,
        descriptionClassName: R?.descriptionClassName,
        invert: s,
        visibleToasts: N,
        closeButton: (Oe = R?.closeButton) != null ? Oe : p,
        interacting: L,
        position: G,
        style: R?.style,
        unstyled: R?.unstyled,
        classNames: R?.classNames,
        cancelButtonStyle: R?.cancelButtonStyle,
        actionButtonStyle: R?.actionButtonStyle,
        closeButtonAriaLabel: R?.closeButtonAriaLabel,
        removeToast: k,
        toasts: D.filter((Ee) => Ee.position == W.position),
        heights: J.filter((Ee) => Ee.position == W.position),
        setHeights: I,
        expandByDefault: d,
        gap: C,
        expanded: Q,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), m_ = [
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
    title: "Transform (let the prompt change the scene)",
    description: "Loosen the input-image grip so the prompt can reshape the scene. Off = input stays locked (default).",
    defaultCollapsed: !0
  },
  {
    id: "identity",
    title: "Identity (keep the look steady)",
    description: "Hold colour & identity steady across chained clips. Off = default; turn up only if later clips drift.",
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
], Zc = [
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
    help: "When the high-noise (structure) expert hands off to the low-noise (detail) expert. Higher = switch sooner = more detail steps; lower = more structure steps. Wan2.2 = 0.9 (2 high + 2 low at 4 steps)."
  },
  {
    key: "solver",
    label: "Solver",
    tier: "quality",
    control: "select",
    default: "euler",
    options: [
      { value: "euler", label: "Euler (standard)" },
      { value: "euler_ancestral", label: "Euler ancestral (distill / lightx2v)" },
      { value: "heun", label: "Heun (2nd-order, ~2× slower)" }
    ],
    help: "Euler = standard flow step (fast). Euler ancestral = re-noises each step; matches ComfyUI euler_ancestral for distill (lightx2v) models. Heun = 2nd-order, ~2× render time. Heun disables TeaCache."
  },
  {
    key: "sigma_preset",
    label: "Schedule",
    tier: "quality",
    control: "select",
    default: "auto",
    options: [
      { value: "auto", label: "Auto (flow-match)" },
      { value: "distilled_4step", label: "Distilled 4-step (lightx2v / Lightning)" }
    ],
    help: "Auto = standard flow-match for fp8/bf16 base models. Distilled 4-step = exact lightx2v/Lightning sigmas [1.0, 0.9375, 0.833, 0.625] for NVFP4-Sparse / Lightning-distilled weights — forces 4 steps (2 high + 2 low) + CFG off; Steps / Guidance / Sigma-shift are ignored. Pure-noise output on distilled weights means you need this."
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
    help: "Loosens the input image's grip so the prompt can change the scene. 0 = input locked (default). 0.3–0.45 = transforms while keeping identity. 0.7+ = swaps the subject entirely."
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
    help: "Protects edges/background from the Transform change, focusing it on the centre. 0 = whole frame changes; 1 = corners/background kept."
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
    help: "Anchors each new clip back to the first frame — holds the look/identity, but costs motion. 0 = off (default). Higher = stronger anchor. -1 = max (freezes motion)."
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
    help: "Keeps colour & skin-tone consistent across clips by matching each clip to clip 1. Fixes colour/brightness drift in later clips — not shape. 0 = off; 0.2–0.3 if colours shift; 0.5 = strong."
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
  },
  {
    key: "fp8_compute",
    label: "FP8 compute",
    tier: "perf",
    control: "select",
    default: "bf16",
    options: [
      { value: "bf16", label: "bf16 dequant (Blackwell colour fix)" },
      { value: "scaled_mm", label: "fp8 rowwise _scaled_mm (faster)" }
    ],
    help: "bf16 = dequant→bf16 matmul (safe, slower). scaled_mm = per-row fp8 GEMM (faster; auto-falls back to bf16 if the kernel rejects it)."
  },
  {
    key: "teacache_multiplier",
    label: "TeaCache speedup",
    tier: "perf",
    control: "select",
    numeric: !0,
    default: 1,
    options: [
      { value: "1", label: "Off (1×)" },
      { value: "1.25", label: "1.25× (near-lossless)" },
      { value: "1.5", label: "1.5×" },
      { value: "1.75", label: "1.75×" },
      { value: "2", label: "2× (softer)" },
      { value: "2.25", label: "2.25×" },
      { value: "2.5", label: "2.5× (artifacts likely)" }
    ],
    help: "Caches diffusion steps when frame-to-frame change is small — higher = faster but more ghosting/artifacts. Off = full quality."
  }
];
function P3(e) {
  return Zc.filter((a) => a.tier === e);
}
function Z3() {
  const e = {};
  for (const a of Zc)
    a.default !== void 0 && (e[a.key] = a.default);
  return e;
}
function Rh(e) {
  return {
    ...Z3(),
    mode: "image_to_video",
    ref_image_path: "",
    prompts: [""],
    last_image_path: null,
    upscale_factor: 0,
    upscale_model: "auto",
    upscale_quality: "HIGH",
    blocks_to_swap: e.blocksToSwap,
    attention: e.attentionBackend,
    interpolate_method: e.interpolateMethod,
    interpolate_fps: e.interpolateFps,
    models_dir: e.modelsDir || void 0,
    output_path: e.outputDir ? `${e.outputDir}/svi2_out.mp4` : void 0,
    dit_high_path: e.ditHighPath || void 0,
    dit_low_path: e.ditLowPath || void 0,
    svi_lora_tier: e.sviLoraTier ?? "high",
    torch_compile_mode: "default",
    fast_parallel: e.fastParallel,
    batch_prompt_encode: e.batchPromptEncode
  };
}
function Zb(e, a) {
  return {
    ...e,
    ...a.params,
    ref_image_path: e.ref_image_path,
    last_image_path: e.last_image_path ?? null,
    prompts: e.prompts
  };
}
const p_ = 1, Q3 = "nexus.video.svi2-pro.recipe", K3 = ["ref_image_path", "last_image_path"];
function g_(e) {
  return `${Q3}.${e}`;
}
function v_() {
  try {
    return typeof window < "u" ? window.localStorage : null;
  } catch {
    return null;
  }
}
function W3(e) {
  if (!e) return null;
  const a = v_();
  if (!a) return null;
  try {
    const i = a.getItem(g_(e));
    if (!i) return null;
    const l = JSON.parse(i);
    return l.v !== p_ || typeof l.params != "object" || l.params === null ? null : l.params;
  } catch {
    return null;
  }
}
function J3(e, a) {
  if (!e) return;
  const i = v_();
  if (i)
    try {
      const l = { ...a };
      for (const u of K3) delete l[u];
      const s = {
        v: p_,
        params: l
      };
      i.setItem(g_(e), JSON.stringify(s));
    } catch {
    }
}
const y_ = [10, 20, 30, 60, 120], e5 = "custom", xl = 85, Th = { framesPerClip: xl, fps: 16, overlap: 5 };
function Oi(e) {
  return {
    framesPerClip: e.frames_per_clip ?? Th.framesPerClip,
    fps: e.fps ?? Th.fps,
    overlap: e.num_overlap_frame ?? Th.overlap
  };
}
function b_(e, a) {
  const { framesPerClip: i, overlap: l } = a;
  return i + (e - 1) * (i - l);
}
function om(e, a) {
  return a.fps <= 0 ? 0 : b_(e, a) / a.fps;
}
function t5(e, a) {
  const { framesPerClip: i, fps: l, overlap: s } = a, u = i - s;
  if (u <= 0 || l <= 0) return 1;
  const c = e * l;
  return Math.max(1, Math.ceil((c - i) / u) + 1);
}
function n5(e, a) {
  const { fps: i, overlap: l } = a;
  if (i <= 0) return { numClips: 1, framesPerClip: xl };
  const s = Math.round(e * i);
  if (s <= rp)
    return { numClips: 1, framesPerClip: ip(s) };
  const u = xl - l;
  return u <= 0 ? { numClips: 1, framesPerClip: xl } : { numClips: Math.max(2, Math.round((s - xl) / u) + 1), framesPerClip: xl };
}
const a5 = 5, rp = 129, r5 = [2, 3, 4, 5, 6, 8];
function ip(e) {
  const a = Math.round((e - 1) / 4) * 4 + 1;
  return Math.min(rp, Math.max(a5, a));
}
function Qb(e, a) {
  return ip(e * a);
}
function i5(e) {
  return e <= 0 ? 0 : Math.floor(rp / e);
}
function x_(e) {
  const { framesPerClip: a, fps: i } = Oi(e);
  return i <= 0 ? 0 : a / i;
}
function l5(e) {
  const { framesPerClip: a, fps: i } = Oi(e), l = `1 × ${a} frames @ ${i} fps → ${x_(e).toFixed(1)}s morph`, s = e.interpolate_fps ?? 0;
  return s > 0 ? `${l} (RIFE → ${s} fps)` : l;
}
function o5(e, a) {
  for (const i of y_)
    if (t5(i, a) === e) return i;
  return e5;
}
function s5(e) {
  const a = Oi(e), i = e.num_clips ?? 1, l = om(i, a), s = `${i} × ${a.framesPerClip} frames @ ${a.fps} fps → ${l.toFixed(1)}s native`, u = e.interpolate_fps ?? 0;
  return u > 0 ? `${s} (RIFE → ${u} fps)` : s;
}
function lp(e) {
  return e ? `${kc}/media?path=${encodeURIComponent(e)}` : null;
}
function u5(e) {
  return lp(e);
}
async function Kb(e) {
  const a = lp(e);
  if (!a) return !1;
  try {
    return (await fetch(a, { method: "HEAD" })).ok;
  } catch {
    return !1;
  }
}
function Wb(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
const is = "svi-canonical", c5 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), f5 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), d5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function h5(e) {
  const a = e.frames_per_clip, i = e.num_clips, l = e.num_overlap_frame ?? 4;
  return !a || !i ? null : a + (i - 1) * (a - l);
}
function m5(e) {
  const a = e.params, i = a.width ?? 480, l = a.height ?? 832, s = `${i}×${l}`, u = h5(a), c = a.fps;
  let d = "—";
  u !== null && c && c > 0 && (d = `${(u / c).toFixed(1)}s`);
  const p = c5.has(e.id), m = a.blocks_to_swap ?? 0, y = m >= 40 ? "~10–11 GiB (16 GB)" : m > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: d,
    vram: y,
    isLowVram: p,
    isOffDistribution: f5.has(e.id),
    requiresLastImage: typeof a.requires_last_image == "boolean" ? a.requires_last_image : d5.has(e.id)
  };
}
function p5(e) {
  return [...e].sort((a, i) => a.id === is ? -1 : i.id === is ? 1 : 0);
}
function g5(e) {
  const a = e.filter((i) => !i.hidden);
  return {
    featured: p5(a.filter((i) => !i.legacy)),
    legacy: a.filter((i) => i.legacy === !0)
  };
}
async function v5(e = 25) {
  return xr(`/render/jobs?limit=${e}`);
}
async function Iu(e) {
  return xr(`/render/jobs/${e}`);
}
async function y5(e) {
  await xr(`/render/jobs/${encodeURIComponent(e)}`, { method: "DELETE" });
}
async function b5(e) {
  return xr("/render/start", {
    method: "POST",
    body: JSON.stringify(e)
  });
}
async function w_(e) {
  return xr(`/render/jobs/${e}/cancel`, { method: "POST", body: "{}" });
}
function x5(e, a, i) {
  return LC(`/render/jobs/${e}/events`, a, i);
}
const w5 = 9e4, Jb = 24e4, _5 = 5e3, op = "nexus.video.svi2-pro.active-render";
function S5(e) {
  try {
    sessionStorage.setItem(op, JSON.stringify({ jobId: e }));
  } catch {
  }
}
function Yu() {
  try {
    sessionStorage.removeItem(op);
  } catch {
  }
}
function E5() {
  try {
    const e = sessionStorage.getItem(op);
    if (!e) return null;
    const a = JSON.parse(e);
    return typeof a.jobId == "string" ? a.jobId : null;
  } catch {
    return null;
  }
}
const __ = S.createContext(null);
function N5({
  initialSettings: e = km,
  initialPreset: a = null,
  deploymentId: i,
  children: l
}) {
  const [s, u] = S.useState(e), [c, d] = S.useState(
    a?.id ?? is
  ), [p, m] = S.useState(a !== null), [y, g] = S.useState(() => {
    const ye = Rh(e), pe = a ? Zb(ye, a) : ye, _e = W3(i);
    return _e ? { ...pe, ..._e } : pe;
  }), [b, x] = S.useState(null), [_, E] = S.useState(null), [N, R] = S.useState({
    enabled: !1,
    prompt: ""
  }), [j, C] = S.useState(Cc), [O, V] = S.useState(!1), B = S.useRef(!1), U = S.useRef(null), D = S.useRef(null), H = S.useRef(j);
  H.current = j;
  const J = S.useRef(!1), I = S.useRef(0), Q = S.useRef(null), ae = S.useCallback(() => {
    D.current !== null && (clearInterval(D.current), D.current = null);
  }, []), L = S.useCallback(() => {
    ae(), D.current = setInterval(() => {
      const ye = H.current;
      if (ye.phase !== "running" || ye.lastFrameAt === null || J.current) return;
      const pe = Date.now() - ye.lastFrameAt, _e = Date.now() - I.current;
      if (pe >= Jb && _e >= Jb) {
        ye.jobId && Q.current?.(ye.jobId);
        return;
      }
      pe >= w5 && C((Re) => Fb(Re));
    }, _5);
  }, [ae]), Y = S.useCallback(
    (ye) => {
      U.current?.(), U.current = x5(
        ye,
        (pe) => {
          C((_e) => d3(_e, pe));
        },
        () => {
          J.current || C((pe) => Fb(pe));
        }
      ), L();
    },
    [L]
  ), T = S.useCallback(
    (ye) => {
      if (J.current) return;
      const pe = ye;
      J.current = !0, I.current = Date.now(), Y(ye), C(
        (Ae) => Ae.phase === "running" ? { ...Ae, lastFrameAt: Date.now() } : Ae
      );
      const _e = () => H.current.jobId === pe && H.current.phase === "running", Re = (Ae) => {
        _e() && (U.current?.(), U.current = null, ae(), C(Ae));
      };
      Iu(ye).then((Ae) => {
        (Ae.status === "succeeded" || Ae.status === "failed" || Ae.status === "cancelled") && Re(Ho(Ae));
      }).catch(() => {
        Re(p3(H.current));
      }).finally(() => {
        J.current = !1;
      });
    },
    [Y, ae]
  );
  Q.current = T;
  const z = S.useCallback(() => {
    B.current || (B.current = !0, V(!0));
  }, []), F = S.useCallback(() => {
    B.current = !1, V(!1);
  }, []), X = S.useCallback(
    (ye, pe) => {
      pe?.markDirty !== !1 && z();
      const _e = ye.params.requires_last_image === !0;
      d(ye.id), m(!0), g((Re) => {
        const Ae = {
          ...Rh(s),
          mode: Re.mode ?? "image_to_video",
          ref_image_path: Re.ref_image_path,
          prompts: Re.prompts,
          last_image_path: _e ? Re.last_image_path ?? null : null
        };
        return Zb(Ae, ye);
      }), _e || E(null);
    },
    [s, z]
  ), ne = S.useCallback(
    (ye) => {
      z(), g((pe) => {
        if (ye === "text_to_video") return { ...pe, mode: ye };
        const { seed: _e, ...Re } = pe;
        return { ...Re, mode: ye };
      });
    },
    [z]
  ), A = S.useCallback(
    (ye, pe) => {
      z(), g((_e) => ({ ..._e, [ye]: pe }));
    },
    [z]
  ), k = S.useCallback(
    (ye) => {
      z(), g((pe) => ({ ...pe, prompts: ye }));
    },
    [z]
  ), G = S.useCallback(
    (ye, pe) => {
      z(), x(ye), g((_e) => ({ ..._e, ref_image_path: pe }));
    },
    [z]
  ), ee = S.useCallback(
    (ye, pe) => {
      z(), E(ye), g((_e) => pe === null || pe.length === 0 ? { ..._e, last_image_path: pe } : {
        ..._e,
        last_image_path: pe,
        num_clips: 1,
        frames_per_clip: ip(_e.frames_per_clip ?? 81)
      });
    },
    [z]
  ), se = S.useCallback(() => {
    x(null), g((ye) => ({ ...ye, ref_image_path: "" }));
  }, []), de = S.useCallback(() => {
    E(null), g((ye) => ({ ...ye, last_image_path: null }));
  }, []), he = S.useCallback(
    (ye) => {
      z(), R((pe) => ({ ...pe, ...ye }));
    },
    [z]
  ), W = S.useCallback(() => B.current, []), ve = S.useCallback((ye) => {
    u(ye), g((pe) => ({
      ...pe,
      fast_parallel: ye.fastParallel,
      batch_prompt_encode: ye.batchPromptEncode
    }));
  }, []), De = S.useCallback(() => {
    U.current?.(), U.current = null, ae(), Yu(), C(Cc());
  }, [ae]), Oe = S.useCallback(async () => {
    F(), U.current?.(), I.current = 0, console.info("[svi2] render → params", {
      base_model: {
        dit_high_path: y.dit_high_path ?? "(bundled)",
        dit_low_path: y.dit_low_path ?? "(bundled)",
        svi_lora_tier: y.svi_lora_tier ?? "high"
      },
      quality: {
        num_inference_steps: y.num_inference_steps,
        cfg_scale: y.cfg_scale,
        sigma_shift: y.sigma_shift,
        switch_boundary: y.switch_boundary,
        solver: y.solver,
        seed: y.seed,
        seed_multiplier: y.seed_multiplier
      },
      basics: {
        width: y.width,
        height: y.height,
        num_clips: y.num_clips,
        frames_per_clip: y.frames_per_clip,
        fps: y.fps,
        interpolate_fps: y.interpolate_fps,
        interpolate_method: y.interpolate_method,
        upscale_factor: y.upscale_factor,
        upscale_model: y.upscale_model,
        upscale_quality: y.upscale_quality
      },
      compile: {
        use_torch_compile: y.use_torch_compile,
        torch_compile_mode: y.torch_compile_mode,
        blocks_to_swap: y.blocks_to_swap
      },
      parallel: {
        fast_parallel: y.fast_parallel,
        batch_prompt_encode: y.batch_prompt_encode
      },
      user_loras: y.user_loras ?? [],
      presetId: c
    });
    const { jobId: ye } = await b5({ presetId: c, params: y });
    C(Gb(ye, N.enabled)), S5(ye), Y(ye);
  }, [y, c, N.enabled, Y, F]), Ee = S.useCallback(async () => {
    const ye = H.current.jobId ?? j.jobId;
    if (!ye) return;
    const { status: pe } = await w_(ye);
    pe !== "cancelling" && (U.current?.(), U.current = null, ae(), Yu(), C((_e) => h3(_e)));
  }, [j.jobId, ae]), we = S.useCallback(
    async (ye) => {
      U.current?.(), U.current = null, ae();
      try {
        const pe = await Iu(ye.id);
        C(Ho(pe));
      } catch {
        C(Ho(ye));
      }
    },
    [ae]
  ), Me = S.useCallback(
    async (ye) => {
      U.current?.(), U.current = null, ae();
      let pe = ye;
      try {
        pe = await Iu(ye.id);
      } catch {
        pe = ye;
      }
      const _e = pe.params.ref_image_path ?? "";
      let Re = _e, Ae = null;
      _e.length > 0 && (await Kb(_e) ? Ae = Wb(_e) : (Re = "", ca.warning("Input image no longer on disk — re-upload to render")));
      const lt = pe.params.last_image_path ?? null;
      let Ze = lt, Fe = null;
      lt && lt.length > 0 && (await Kb(lt) ? Fe = Wb(lt) : (Ze = null, ca.warning("Last image no longer on disk — re-upload to render"))), g({
        ...Rh(s),
        ...pe.params,
        ref_image_path: Re,
        last_image_path: Ze
      }), d(pe.presetId), m(pe.presetId !== null), x(Ae), E(Fe), C(Ho(pe)), F();
    },
    [s, ae, F]
  );
  S.useEffect(() => {
    J3(i, y);
  }, [i, y]), S.useEffect(() => {
    (j.phase === "done" || j.phase === "error" || j.phase === "cancelled") && Yu();
  }, [j.phase]), S.useEffect(() => {
    const ye = () => {
      const Re = H.current;
      Re.phase !== "running" || !Re.jobId || (Y(Re.jobId), C(
        (Ae) => Ae.phase === "running" ? { ...Ae, stalled: !1, lastFrameAt: Date.now() } : Ae
      ));
    }, pe = () => {
      document.visibilityState === "visible" && ye();
    }, _e = () => ye();
    return document.addEventListener("visibilitychange", pe), window.addEventListener("focus", _e), () => {
      document.removeEventListener("visibilitychange", pe), window.removeEventListener("focus", _e);
    };
  }, [Y]), S.useEffect(() => {
    const ye = E5();
    if (!ye) return;
    let pe = !1;
    return Iu(ye).then((_e) => {
      if (!pe) {
        if (_e.status === "succeeded" || _e.status === "failed" || _e.status === "cancelled") {
          Yu(), C(Ho(_e));
          return;
        }
        C(Gb(ye, !1)), Y(ye);
      }
    }).catch(() => {
    }), () => {
      pe = !0;
    };
  }, [Y]), S.useEffect(() => () => {
    U.current?.(), U.current = null, ae();
  }, [ae]);
  const Ye = S.useMemo(
    () => ({
      settings: s,
      presetId: c,
      presetApplied: p,
      params: y,
      refImageName: b,
      lastImageName: _,
      qwenEdit: N,
      render: j,
      isDirty: O,
      applyPresetById: X,
      setMode: ne,
      updateParam: A,
      setPrompts: k,
      setRefImage: G,
      setLastImage: ee,
      clearRefImageSilent: se,
      clearLastImageSilent: de,
      setQwenEdit: he,
      setSettings: ve,
      startRenderJob: Oe,
      cancelRenderJob: Ee,
      resetRender: De,
      showJobResult: we,
      restoreJobIntoForm: Me,
      getIsDirty: W
    }),
    [
      s,
      c,
      p,
      y,
      b,
      _,
      N,
      j,
      O,
      X,
      ne,
      A,
      k,
      G,
      ee,
      se,
      de,
      he,
      ve,
      Oe,
      Ee,
      De,
      we,
      Me,
      W
    ]
  );
  return /* @__PURE__ */ v.jsx(__.Provider, { value: Ye, children: l });
}
function Qt() {
  const e = S.useContext(__);
  if (!e)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return e;
}
const sm = "svi2-pro:trigger-render", um = "svi2-pro:render-state";
function C5() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(sm));
}
function R5(e) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(um, { detail: e }));
}
function T5(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(sm, e), () => window.removeEventListener(sm, e));
}
function M5(e) {
  if (typeof window > "u") return () => {
  };
  const a = (i) => {
    const l = i.detail;
    l && e(l);
  };
  return window.addEventListener(um, a), () => window.removeEventListener(um, a);
}
const D5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), A5 = 832 * 480, j5 = 0.85;
function sp(e, a) {
  return a && typeof a.requires_last_image == "boolean" ? a.requires_last_image : e !== null && D5.has(e);
}
function Qc(e, a) {
  return sp(e, a) ? !0 : typeof a.last_image_path == "string" && a.last_image_path.length > 0;
}
function ex(e, a) {
  return Number.isFinite(e) && e % a === 0;
}
function O5(e, a) {
  const i = [];
  (e.mode ?? "image_to_video") !== "text_to_video" && (!a.hasRefImage || !e.ref_image_path) && i.push({
    field: "ref_image_path",
    message: "A reference (anchor) image is required.",
    severity: "error"
  }), (e.prompts ?? []).some((b) => b.trim().length > 0) || i.push({
    field: "prompts",
    message: "At least one prompt is required.",
    severity: "error"
  });
  const c = e.frames_per_clip ?? 81;
  (c - 1) % 4 !== 0 && i.push({
    field: "frames_per_clip",
    message: `Frames per clip must be 4n+1 (got ${c}). Try ${c - (c - 1) % 4}.`,
    severity: "error"
  });
  const d = e.width ?? 480, p = e.height ?? 832;
  ex(d, 16) || i.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${d}).`,
    severity: "error"
  }), ex(p, 16) || i.push({
    field: "height",
    message: `Height must be divisible by 16 (got ${p}).`,
    severity: "error"
  });
  const m = e.num_inference_steps ?? 50;
  (m < 1 || m > 100) && i.push({
    field: "num_inference_steps",
    message: "Steps must be between 1 and 100.",
    severity: "error"
  });
  const y = e.cfg_scale ?? 5;
  (y < 1 || y > 12) && i.push({
    field: "cfg_scale",
    message: "Guidance (CFG) must be between 1 and 12.",
    severity: "error"
  });
  const g = e.num_clips;
  return g !== void 0 && g < 1 && i.push({
    field: "num_clips",
    message: "Clips must be at least 1.",
    severity: "error"
  }), sp(a.presetId, a.presetParams) && !a.hasLastImage && i.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Qc(a.presetId, e) && g !== void 0 && g > 1 && i.push({
    field: "num_clips",
    message: `FLF2V (last-image morph) requires exactly 1 clip (got ${g}). The end keyframe pins the clip's final frame — chaining has no free tail to continue from.`,
    severity: "error"
  }), Number.isFinite(d) && Number.isFinite(p) && d * p < A5 * j5 && i.push({
    field: "width",
    message: `${d}×${p} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), i;
}
function z5(e) {
  return e.some((a) => a.severity === "error");
}
function S_() {
  const {
    params: e,
    presetId: a,
    refImageName: i,
    lastImageName: l,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = Qt(), d = S.useMemo(
    () => O5(e, {
      presetId: a,
      hasRefImage: !!i,
      hasLastImage: !!l,
      presetParams: e
    }),
    [e, a, i, l]
  ), p = z5(d), m = s.phase === "running", [y, g] = S.useState(null), b = S.useCallback(async () => {
    if (p) {
      const _ = d.find((E) => E.severity === "error");
      _ && g({ field: _.field, token: Date.now() }), ca.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), ca.success("Render started.");
    } catch (_) {
      const E = _ instanceof Lc ? _.message : "Could not start the render.";
      ca.error(E);
    }
  }, [p, d, u]), x = S.useCallback(async () => {
    try {
      await c();
    } catch {
      ca.error("Could not cancel the render.");
    }
  }, [c]);
  return S.useEffect(() => T5(() => void b()), [b]), S.useEffect(() => {
    R5({ busy: m, blocked: p });
  }, [m, p]), { issues: d, blocked: p, busy: m, submit: b, cancel: x, focusRequest: y };
}
const L5 = 220, k5 = 80;
function H5(e) {
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
function B5(e, a) {
  const i = a.params;
  switch (e) {
    case "anchor":
      return "Reference image";
    case "qwen_edit":
      return a.qwenEditEnabled ? "Edit-then-animate" : "Skipped";
    case "diffusion": {
      const l = i.num_clips ?? 1, s = a.render.clipIndex + 1;
      return a.render.phase === "running" ? `Clip ${Math.min(s, l)}/${l}` : `${l} clip${l === 1 ? "" : "s"}`;
    }
    case "stitch":
      return i.stitch_mode === "crossfade" ? "Crossfade" : "Overlap trim";
    case "interpolate":
      return i.interpolate_fps && i.interpolate_fps > 0 ? `→ ${i.interpolate_fps} fps` : "Off";
    case "mux":
      return "Encode mp4";
  }
}
function U5(e) {
  const a = np.filter(
    (s) => s !== "qwen_edit" || e.qwenEditEnabled
  ), i = a.map((s, u) => {
    const c = {
      title: H5(s),
      subtitle: B5(s, e),
      state: e.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * L5, y: k5 },
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
  return { nodes: i, edges: l };
}
var V5 = "dk8hba0", $5 = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, q5 = "dk8hba5", I5 = "dk8hba6", Y5 = "dk8hba7", G5 = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, F5 = "dk8hbac";
function X5({ data: e }) {
  const a = e, i = [V5, $5[a.state]].join(" "), l = [F5, G5[a.state]].join(" ");
  return /* @__PURE__ */ v.jsxs("div", { className: i, children: [
    a.hasInput && /* @__PURE__ */ v.jsx(Ll, { type: "target", position: ke.Left }),
    /* @__PURE__ */ v.jsxs("div", { className: q5, children: [
      /* @__PURE__ */ v.jsx("span", { className: I5, children: a.title }),
      /* @__PURE__ */ v.jsx("span", { className: l, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ v.jsx("span", { className: Y5, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ v.jsx(Ll, { type: "source", position: ke.Right })
  ] });
}
const P5 = { pipeline: X5 };
var Z5 = "_1g4g8kk0", Q5 = "_1g4g8kk1", K5 = "_1g4g8kk2", W5 = "_1g4g8kk3", J5 = "_1g4g8kk4", eO = "_1g4g8kk5";
const tO = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, nO = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function aO() {
  const { render: e, params: a, qwenEdit: i } = Qt(), { busy: l, blocked: s, submit: u, cancel: c } = S_(), d = S.useMemo(
    () => U5({ render: e, params: a, qwenEditEnabled: i.enabled }),
    [e, a, i.enabled]
  ), p = np.filter(
    (m) => m !== "qwen_edit" || i.enabled
  );
  return /* @__PURE__ */ v.jsxs("div", { className: Z5, children: [
    /* @__PURE__ */ v.jsx("div", { className: Q5, children: /* @__PURE__ */ v.jsx(
      n3,
      {
        nodes: d.nodes,
        edges: d.edges,
        nodeTypes: P5,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ v.jsx("div", { className: K5, children: /* @__PURE__ */ v.jsxs(
      Va,
      {
        elevation: "raised",
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ v.jsx("div", { className: W5, children: p.map((m) => /* @__PURE__ */ v.jsxs("div", { className: J5, children: [
            /* @__PURE__ */ v.jsx("span", { children: nO[m] }),
            /* @__PURE__ */ v.jsx(Fn, { tone: tO[e.stageStates[m]], children: e.stageStates[m] })
          ] }, m)) }),
          /* @__PURE__ */ v.jsx("div", { className: eO, children: l ? /* @__PURE__ */ v.jsx(ua, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ v.jsx(ua, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var tx = jw();
const E_ = 0, N_ = 1, C_ = 2, nx = 3;
var ax = Object.prototype.hasOwnProperty;
function cm(e, a) {
  var i, l;
  if (e === a) return !0;
  if (e && a && (i = e.constructor) === a.constructor) {
    if (i === Date) return e.getTime() === a.getTime();
    if (i === RegExp) return e.toString() === a.toString();
    if (i === Array) {
      if ((l = e.length) === a.length)
        for (; l-- && cm(e[l], a[l]); ) ;
      return l === -1;
    }
    if (!i || typeof e == "object") {
      l = 0;
      for (i in e)
        if (ax.call(e, i) && ++l && !ax.call(a, i) || !(i in a) || !cm(e[i], a[i])) return !1;
      return Object.keys(a).length === l;
    }
  }
  return e !== e && a !== a;
}
const pr = /* @__PURE__ */ new WeakMap(), vr = () => {
}, pn = (
  /*#__NOINLINE__*/
  vr()
), fm = Object, at = (e) => e === pn, qa = (e) => typeof e == "function", ni = (e, a) => ({
  ...e,
  ...a
}), R_ = (e) => qa(e.then), Mh = {}, Gu = {}, up = "undefined", bs = typeof window != up, dm = typeof document != up, rO = bs && "Deno" in window, iO = () => bs && typeof window.requestAnimationFrame != up, T_ = (e, a) => {
  const i = pr.get(e);
  return [
    // Getter
    () => !at(a) && e.get(a) || Mh,
    // Setter
    (l) => {
      if (!at(a)) {
        const s = e.get(a);
        a in Gu || (Gu[a] = s), i[5](a, ni(s, l), s || Mh);
      }
    },
    // Subscriber
    i[6],
    // Get server cache snapshot
    () => !at(a) && a in Gu ? Gu[a] : !at(a) && e.get(a) || Mh
  ];
};
let hm = !0;
const lO = () => hm, [mm, pm] = bs && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  vr,
  vr
], oO = () => {
  const e = dm && document.visibilityState;
  return at(e) || e !== "hidden";
}, sO = (e) => (dm && document.addEventListener("visibilitychange", e), mm("focus", e), () => {
  dm && document.removeEventListener("visibilitychange", e), pm("focus", e);
}), uO = (e) => {
  const a = () => {
    hm = !0, e();
  }, i = () => {
    hm = !1;
  };
  return mm("online", a), mm("offline", i), () => {
    pm("online", a), pm("offline", i);
  };
}, cO = {
  isOnline: lO,
  isVisible: oO
}, fO = {
  initFocus: sO,
  initReconnect: uO
}, rx = !be.useId, Rl = !bs || rO, dO = (e) => iO() ? window.requestAnimationFrame(e) : setTimeout(e, 1), Dh = Rl ? S.useEffect : S.useLayoutEffect, Ah = typeof navigator < "u" && navigator.connection, ix = !Rl && Ah && ([
  "slow-2g",
  "2g"
].includes(Ah.effectiveType) || Ah.saveData), Fu = /* @__PURE__ */ new WeakMap(), hO = (e) => fm.prototype.toString.call(e), jh = (e, a) => e === `[object ${a}]`;
let mO = 0;
const gm = (e) => {
  const a = typeof e, i = hO(e), l = jh(i, "Date"), s = jh(i, "RegExp"), u = jh(i, "Object");
  let c, d;
  if (fm(e) === e && !l && !s) {
    if (c = Fu.get(e), c) return c;
    if (c = ++mO + "~", Fu.set(e, c), Array.isArray(e)) {
      for (c = "@", d = 0; d < e.length; d++)
        c += gm(e[d]) + ",";
      Fu.set(e, c);
    }
    if (u) {
      c = "#";
      const p = fm.keys(e).sort();
      for (; !at(d = p.pop()); )
        at(e[d]) || (c += d + ":" + gm(e[d]) + ",");
      Fu.set(e, c);
    }
  } else
    c = l ? e.toJSON() : a == "symbol" ? e.toString() : a == "string" ? JSON.stringify(e) : "" + e;
  return c;
}, cp = (e) => {
  if (qa(e))
    try {
      e = e();
    } catch {
      e = "";
    }
  const a = e;
  return e = typeof e == "string" ? e : (Array.isArray(e) ? e.length : e) ? gm(e) : "", [
    e,
    a
  ];
};
let pO = 0;
const vm = () => ++pO;
async function M_(...e) {
  const [a, i, l, s] = e, u = ni({
    populateCache: !0,
    throwOnError: !0
  }, typeof s == "boolean" ? {
    revalidate: s
  } : s || {});
  let c = u.populateCache;
  const d = u.rollbackOnError;
  let p = u.optimisticData;
  const m = (b) => typeof d == "function" ? d(b) : d !== !1, y = u.throwOnError;
  if (qa(i)) {
    const b = i, x = [], _ = a.keys();
    for (const E of _)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(E) && b(a.get(E)._k) && x.push(E);
    return Promise.all(x.map(g));
  }
  return g(i);
  async function g(b) {
    const [x] = cp(b);
    if (!x) return;
    const [_, E] = T_(a, x), [N, R, j, C] = pr.get(a), O = () => {
      const L = N[x];
      return (qa(u.revalidate) ? u.revalidate(_().data, b) : u.revalidate !== !1) && (delete j[x], delete C[x], L && L[0]) ? L[0](C_).then(() => _().data) : _().data;
    };
    if (e.length < 3)
      return O();
    let V = l, B, U = !1;
    const D = vm();
    R[x] = [
      D,
      0
    ];
    const H = !at(p), J = _(), I = J.data, Q = J._c, ae = at(Q) ? I : Q;
    if (H && (p = qa(p) ? p(ae, I) : p, E({
      data: p,
      _c: ae
    })), qa(V))
      try {
        V = V(ae);
      } catch (L) {
        B = L, U = !0;
      }
    if (V && R_(V))
      if (V = await V.catch((L) => {
        B = L, U = !0;
      }), D !== R[x][0]) {
        if (U) throw B;
        return V;
      } else U && H && m(B) && (c = !0, E({
        data: ae,
        _c: pn
      }));
    if (c && !U)
      if (qa(c)) {
        const L = c(V, ae);
        E({
          data: L,
          error: pn,
          _c: pn
        });
      } else
        E({
          data: V,
          error: pn,
          _c: pn
        });
    if (R[x][1] = vm(), Promise.resolve(O()).then(() => {
      E({
        _c: pn
      });
    }), U) {
      if (y) throw B;
      return;
    }
    return V;
  }
}
const lx = (e, a) => {
  for (const i in e)
    e[i][0] && e[i][0](a);
}, gO = (e, a) => {
  if (!pr.has(e)) {
    const i = ni(fO, a), l = /* @__PURE__ */ Object.create(null), s = M_.bind(pn, e);
    let u = vr;
    const c = /* @__PURE__ */ Object.create(null), d = (y, g) => {
      const b = c[y] || [];
      return c[y] = b, b.push(g), () => b.splice(b.indexOf(g), 1);
    }, p = (y, g, b) => {
      e.set(y, g);
      const x = c[y];
      if (x)
        for (const _ of x)
          _(g, b);
    }, m = () => {
      if (!pr.has(e) && (pr.set(e, [
        l,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        p,
        d
      ]), !Rl)) {
        const y = i.initFocus(setTimeout.bind(pn, lx.bind(pn, l, E_))), g = i.initReconnect(setTimeout.bind(pn, lx.bind(pn, l, N_)));
        u = () => {
          y && y(), g && g(), pr.delete(e);
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
    pr.get(e)[4]
  ];
}, vO = (e, a, i, l, s) => {
  const u = i.errorRetryCount, c = s.retryCount, d = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * i.errorRetryInterval;
  !at(u) && c > u || setTimeout(l, d, s);
}, yO = cm, [D_, bO] = gO(/* @__PURE__ */ new Map()), xO = ni(
  {
    // events
    onLoadingSlow: vr,
    onSuccess: vr,
    onError: vr,
    onErrorRetry: vO,
    onDiscarded: vr,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: ix ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: ix ? 5e3 : 3e3,
    // providers
    compare: yO,
    isPaused: () => !1,
    cache: D_,
    mutate: bO,
    fallback: {}
  },
  // use web preset by default
  cO
), wO = (e, a) => {
  const i = ni(e, a);
  if (a) {
    const { use: l, fallback: s } = e, { use: u, fallback: c } = a;
    l && u && (i.use = l.concat(u)), s && c && (i.fallback = ni(s, c));
  }
  return i;
}, _O = S.createContext({}), SO = "$inf$", A_ = bs && window.__SWR_DEVTOOLS_USE__, EO = A_ ? window.__SWR_DEVTOOLS_USE__ : [], NO = () => {
  A_ && (window.__SWR_DEVTOOLS_REACT__ = be);
}, CO = (e) => qa(e[1]) ? [
  e[0],
  e[1],
  e[2] || {}
] : [
  e[0],
  null,
  (e[1] === null ? e[2] : e[1]) || {}
], RO = () => {
  const e = S.useContext(_O);
  return S.useMemo(() => ni(xO, e), [
    e
  ]);
}, TO = (e) => (a, i, l) => e(a, i && ((...u) => {
  const [c] = cp(a), [, , , d] = pr.get(D_);
  if (c.startsWith(SO))
    return i(...u);
  const p = d[c];
  return at(p) ? i(...u) : (delete d[c], p);
}), l), MO = EO.concat(TO), DO = (e) => function(...i) {
  const l = RO(), [s, u, c] = CO(i), d = wO(l, c);
  let p = e;
  const { use: m } = d, y = (m || []).concat(MO);
  for (let g = y.length; g--; )
    p = y[g](p);
  return p(s, u || d.fetcher || null, d);
}, AO = (e, a, i) => {
  const l = a[e] || (a[e] = []);
  return l.push(i), () => {
    const s = l.indexOf(i);
    s >= 0 && (l[s] = l[l.length - 1], l.pop());
  };
};
NO();
const Oh = be.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), zh = {
  dedupe: !0
}, ox = Promise.resolve(pn), jO = () => vr, OO = (e, a, i) => {
  const { cache: l, compare: s, suspense: u, fallbackData: c, revalidateOnMount: d, revalidateIfStale: p, refreshInterval: m, refreshWhenHidden: y, refreshWhenOffline: g, keepPreviousData: b, strictServerPrefetchWarning: x } = i, [_, E, N, R] = pr.get(l), [j, C] = cp(e), O = S.useRef(!1), V = S.useRef(!1), B = S.useRef(j), U = S.useRef(a), D = S.useRef(i), H = () => D.current, J = () => H().isVisible() && H().isOnline(), [I, Q, ae, L] = T_(l, j), Y = S.useRef({}).current, T = at(c) ? at(i.fallback) ? pn : i.fallback[j] : c, z = (pe, _e) => {
    for (const Re in Y) {
      const Ae = Re;
      if (Ae === "data") {
        if (!s(pe[Ae], _e[Ae]) && (!at(pe[Ae]) || !s(de, _e[Ae])))
          return !1;
      } else if (_e[Ae] !== pe[Ae])
        return !1;
    }
    return !0;
  }, F = !O.current, X = S.useMemo(() => {
    const pe = I(), _e = L(), Re = (Fe) => {
      const Ke = ni(Fe);
      return delete Ke._k, (() => {
        if (!j || !a || H().isPaused()) return !1;
        if (F && !at(d)) return d;
        const yt = at(T) ? Ke.data : T;
        return at(yt) || p;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Ke
      } : Ke;
    }, Ae = Re(pe), lt = pe === _e ? Ae : Re(_e);
    let Ze = Ae;
    return [
      () => {
        const Fe = Re(I());
        return z(Fe, Ze) ? (Ze.data = Fe.data, Ze.isLoading = Fe.isLoading, Ze.isValidating = Fe.isValidating, Ze.error = Fe.error, Ze) : (Ze = Fe, Fe);
      },
      () => lt
    ];
  }, [
    l,
    j
  ]), ne = tx.useSyncExternalStore(S.useCallback(
    (pe) => ae(j, (_e, Re) => {
      z(Re, _e) || pe();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      l,
      j
    ]
  ), X[0], X[1]), A = _[j] && _[j].length > 0, k = ne.data, G = at(k) ? T && R_(T) ? Oh(T) : T : k, ee = ne.error, se = S.useRef(G), de = b ? at(k) ? at(se.current) ? G : se.current : k : G, he = j && at(G), W = S.useRef(null);
  !Rl && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  tx.useSyncExternalStore(jO, () => (W.current = !1, W), () => (W.current = !0, W));
  const ve = W.current;
  x && ve && !u && he && console.warn(`Missing pre-initiated data for serialized key "${j}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const De = !j || !a || H().isPaused() || A && !at(ee) ? !1 : F && !at(d) ? d : u ? at(G) ? !1 : p : at(G) || p, Oe = F && De, Ee = at(ne.isValidating) ? Oe : ne.isValidating, we = at(ne.isLoading) ? Oe : ne.isLoading, Me = S.useCallback(
    async (pe) => {
      const _e = U.current;
      if (!j || !_e || V.current || H().isPaused())
        return !1;
      let Re, Ae, lt = !0;
      const Ze = pe || {}, Fe = !N[j] || !Ze.dedupe, Ke = () => rx ? !V.current && j === B.current && O.current : j === B.current, vt = {
        isValidating: !1,
        isLoading: !1
      }, yt = () => {
        Q(vt);
      }, Yt = () => {
        const pt = N[j];
        pt && pt[1] === Ae && delete N[j];
      }, Lt = {
        isValidating: !0
      };
      at(I().data) && (Lt.isLoading = !0);
      try {
        if (Fe && (Q(Lt), i.loadingTimeout && at(I().data) && setTimeout(() => {
          lt && Ke() && H().onLoadingSlow(j, i);
        }, i.loadingTimeout), N[j] = [
          _e(C),
          vm()
        ]), [Re, Ae] = N[j], Re = await Re, Fe && setTimeout(Yt, i.dedupingInterval), !N[j] || N[j][1] !== Ae)
          return Fe && Ke() && H().onDiscarded(j), !1;
        vt.error = pn;
        const pt = E[j];
        if (!at(pt) && // case 1
        (Ae <= pt[0] || // case 2
        Ae <= pt[1] || // case 3
        pt[1] === 0))
          return yt(), Fe && Ke() && H().onDiscarded(j), !1;
        const ut = I().data;
        vt.data = s(ut, Re) ? ut : Re, Fe && Ke() && H().onSuccess(Re, j, i);
      } catch (pt) {
        Yt();
        const ut = H(), { shouldRetryOnError: Zn } = ut;
        ut.isPaused() || (vt.error = pt, Fe && Ke() && (ut.onError(pt, j, ut), (Zn === !0 || qa(Zn) && Zn(pt)) && (!H().revalidateOnFocus || !H().revalidateOnReconnect || J()) && ut.onErrorRetry(pt, j, ut, (_n) => {
          const nn = _[j];
          nn && nn[0] && nn[0](nx, _n);
        }, {
          retryCount: (Ze.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return lt = !1, yt(), !0;
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
      j,
      l
    ]
  ), Ye = S.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...pe) => M_(l, B.current, ...pe),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (Dh(() => {
    U.current = a, D.current = i, at(k) || (se.current = k);
  }), Dh(() => {
    if (!j) return;
    const pe = Me.bind(pn, zh);
    let _e = 0;
    H().revalidateOnFocus && (_e = Date.now() + H().focusThrottleInterval);
    const Ae = AO(j, _, (lt, Ze = {}) => {
      if (lt == E_) {
        const Fe = Date.now();
        H().revalidateOnFocus && Fe > _e && J() && (_e = Fe + H().focusThrottleInterval, pe());
      } else if (lt == N_)
        H().revalidateOnReconnect && J() && pe();
      else {
        if (lt == C_)
          return Me();
        if (lt == nx)
          return Me(Ze);
      }
    });
    return V.current = !1, B.current = j, O.current = !0, Q({
      _k: C
    }), De && (N[j] || (at(G) || Rl ? pe() : dO(pe))), () => {
      V.current = !0, Ae();
    };
  }, [
    j
  ]), Dh(() => {
    let pe;
    function _e() {
      const Ae = qa(m) ? m(I().data) : m;
      Ae && pe !== -1 && (pe = setTimeout(Re, Ae));
    }
    function Re() {
      !I().error && (y || H().isVisible()) && (g || H().isOnline()) ? Me(zh).then(_e) : _e();
    }
    return _e(), () => {
      pe && (clearTimeout(pe), pe = -1);
    };
  }, [
    m,
    y,
    g,
    j
  ]), S.useDebugValue(de), u) {
    if (!rx && Rl && he)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    he && (U.current = a, D.current = i, V.current = !1);
    const pe = R[j], _e = !at(pe) && he ? Ye(pe) : ox;
    if (Oh(_e), !at(ee) && he)
      throw ee;
    const Re = he ? Me(zh) : ox;
    !at(de) && he && (Re.status = "fulfilled", Re.value = !0), Oh(Re);
  }
  return {
    mutate: Ye,
    get data() {
      return Y.data = !0, de;
    },
    get error() {
      return Y.error = !0, ee;
    },
    get isValidating() {
      return Y.isValidating = !0, Ee;
    },
    get isLoading() {
      return Y.isLoading = !0, we;
    }
  };
}, ls = DO(OO);
var zO = "eb2vop0", LO = "eb2vop1", kO = "eb2vop2", HO = "eb2vop3", BO = "eb2vop4";
function UO({
  open: e,
  title: a,
  message: i,
  confirmLabel: l = "Confirm",
  cancelLabel: s = "Cancel",
  onConfirm: u,
  onCancel: c
}) {
  const d = S.useRef(null), p = S.useRef(c);
  return p.current = c, S.useEffect(() => {
    if (!e) return;
    d.current?.querySelector("button[data-confirm]")?.focus();
    const m = (y) => {
      y.key === "Escape" && p.current();
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [e]), e ? (
    // biome-ignore lint/a11y/useKeyWithClickEvents: scrim dismiss is a convenience; Escape is handled above
    /* @__PURE__ */ v.jsx("div", { className: zO, onClick: c, children: /* @__PURE__ */ v.jsxs(
      "div",
      {
        ref: d,
        className: LO,
        role: "alertdialog",
        "aria-modal": "true",
        "aria-label": a,
        onClick: (m) => m.stopPropagation(),
        children: [
          /* @__PURE__ */ v.jsx("span", { className: kO, children: a }),
          /* @__PURE__ */ v.jsx("span", { className: HO, children: i }),
          /* @__PURE__ */ v.jsxs("div", { className: BO, children: [
            /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: c, children: s }),
            /* @__PURE__ */ v.jsx(ua, { variant: "primary", onClick: u, "data-confirm": !0, children: l })
          ] })
        ]
      }
    ) })
  ) : null;
}
var VO = "_1xasopc0", $O = "_1xasopc1", qO = "_1xasopc2", IO = "_1xasopc3", YO = "_1xasopc4", GO = "_1xasopc5", FO = "_1xasopc6", XO = "_1xasopc7", PO = "_1xasopc8";
function ZO(e, a) {
  const i = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (i.length === 0) return !0;
  const l = e.name.toLowerCase(), s = e.type.toLowerCase();
  return i.some((u) => u.startsWith(".") ? l.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function QO(e, a, i) {
  for (const l of e) {
    if (a && !ZO(l, a))
      return `"${l.name}" is not an accepted file type.`;
    if (i !== void 0 && l.size > i)
      return `"${l.name}" exceeds the maximum size.`;
  }
  return null;
}
function sx({
  accept: e,
  maxSizeBytes: a,
  multiple: i = !1,
  disabled: l = !1,
  label: s,
  hint: u,
  ariaLabel: c,
  className: d,
  renderPreview: p,
  onFiles: m
}) {
  const y = S.useRef(null), g = S.useId(), b = S.useId(), [x, _] = S.useState(!1), [E, N] = S.useState(null), [R, j] = S.useState([]), C = S.useCallback(
    (I) => {
      if (!I || I.length === 0) return;
      const Q = Array.from(I), ae = i ? Q : Q.slice(0, 1), L = QO(ae, e, a);
      if (L) {
        N(L);
        return;
      }
      N(null), j(ae), m(ae);
    },
    [e, a, i, m]
  ), O = S.useCallback(() => {
    l || y.current?.click();
  }, [l]), V = S.useCallback(
    (I) => {
      l || (I.key === "Enter" || I.key === " ") && (I.preventDefault(), O());
    },
    [l, O]
  ), B = S.useCallback(
    (I) => {
      I.preventDefault(), _(!1), !l && C(I.dataTransfer.files);
    },
    [l, C]
  ), U = S.useCallback(
    (I) => {
      I.preventDefault(), l || _(!0);
    },
    [l]
  ), D = S.useCallback((I) => {
    I.preventDefault(), _(!1);
  }, []), H = [u ? b : null, E ? g : null].filter(Boolean).join(" "), J = [
    VO,
    x ? $O : "",
    l ? qO : "",
    E !== null ? IO : "",
    d
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsxs(
      "div",
      {
        role: "button",
        tabIndex: l ? -1 : 0,
        "aria-label": c ?? "file dropzone",
        "aria-disabled": l,
        "aria-describedby": H || void 0,
        className: J,
        onClick: O,
        onKeyDown: V,
        onDrop: B,
        onDragOver: U,
        onDragLeave: D,
        children: [
          /* @__PURE__ */ v.jsx(
            "input",
            {
              ref: y,
              type: "file",
              className: YO,
              accept: e,
              multiple: i,
              disabled: l,
              tabIndex: -1,
              onChange: (I) => C(I.target.files)
            }
          ),
          /* @__PURE__ */ v.jsx("span", { className: GO, children: s ?? (x ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ v.jsx("span", { id: b, className: FO, children: u }),
          p && R.length > 0 && /* @__PURE__ */ v.jsx("div", { className: PO, children: p(R) })
        ]
      }
    ),
    E && /* @__PURE__ */ v.jsx("div", { id: g, role: "alert", className: XO, children: E })
  ] });
}
function KO(e) {
  const [a, i] = S.useState(null);
  return S.useEffect(() => {
    if (!e) {
      i(null);
      return;
    }
    const l = URL.createObjectURL(e);
    return i(l), () => URL.revokeObjectURL(l);
  }, [e]), a;
}
async function WO(e) {
  const a = new FormData();
  a.append("file", e);
  const i = await fetch(`${kc}/uploads`, { method: "POST", body: a });
  if (!i.ok) {
    let l = null;
    try {
      l = await i.json();
    } catch {
      l = null;
    }
    throw new Lc(
      i.status,
      l?.category ?? "unknown",
      l?.message ?? i.statusText,
      l?.requestId
    );
  }
  return await i.json();
}
function ux(e, a, i) {
  const [l, s] = S.useState(null), [u, c] = S.useState(!1), [d, p] = S.useState(null), m = KO(l), y = S.useCallback(
    async (_) => {
      if (s(_), p(null), !_) {
        e(null, null);
        return;
      }
      c(!0);
      try {
        const { path: E } = await WO(_);
        e(_.name, E);
      } catch (E) {
        const N = E instanceof Lc ? E.message : "Upload failed. Try again.";
        p(N), e(null, null), ca.error(N);
      } finally {
        c(!1);
      }
    },
    [e]
  ), g = S.useCallback(() => {
    i(), ca.warning("Input image no longer on disk — re-upload to render");
  }, [i]), b = l ? null : lp(a);
  return { file: l, uploading: u, uploadError: d, previewUrl: m ?? b, pick: y, handleRemotePreviewError: g };
}
var JO = "cyswg40", cx = "cyswg41", fx = "cyswg42", Xu = "cyswg43", dx = "cyswg44", hx = "cyswg45", mx = "cyswg46", px = "cyswg47", Pu = "cyswg48";
const gx = 32 * 1024 * 1024;
function ez({
  refImageRequired: e,
  lastImageRequired: a,
  refError: i,
  lastError: l
}) {
  const {
    params: s,
    refImageName: u,
    lastImageName: c,
    setRefImage: d,
    setLastImage: p,
    clearRefImageSilent: m,
    clearLastImageSilent: y
  } = Qt(), g = S.useCallback(
    (C, O) => d(C, O ?? ""),
    [d]
  ), b = S.useCallback(
    (C, O) => p(C, O),
    [p]
  ), x = s.ref_image_path && s.ref_image_path.length > 0 ? s.ref_image_path : null, _ = s.last_image_path && s.last_image_path.length > 0 ? s.last_image_path : null, E = ux(g, x, m), N = ux(b, _, y), R = E.previewUrl, j = N.previewUrl;
  return /* @__PURE__ */ v.jsxs("div", { className: JO, children: [
    /* @__PURE__ */ v.jsxs("div", { className: cx, children: [
      /* @__PURE__ */ v.jsxs("span", { className: fx, children: [
        "Reference image",
        " ",
        e ? /* @__PURE__ */ v.jsx(Fn, { tone: "accent", children: "required" }) : /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ v.jsx(
        sx,
        {
          accept: "image/*",
          maxSizeBytes: gx,
          ariaLabel: "reference image upload",
          label: E.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: e ? "Defines identity. Aspect-match to the render resolution; dims divisible by 16." : "Optional in Text-to-Video. Provide one to anchor identity, or leave empty to synthesize a seed from the prompt.",
          onFiles: (C) => void E.pick(C[0] ?? null),
          renderPreview: () => E.file && R ? /* @__PURE__ */ v.jsx("img", { className: Xu, src: R, alt: "reference preview" }) : null
        }
      ),
      !E.file && R && /* @__PURE__ */ v.jsxs("div", { className: dx, children: [
        /* @__PURE__ */ v.jsx(
          "img",
          {
            className: Xu,
            src: R,
            alt: "reference preview",
            onError: E.handleRemotePreviewError
          }
        ),
        /* @__PURE__ */ v.jsxs("span", { className: hx, children: [
          "Restored from a past run",
          u ? ` · ${u}` : ""
        ] })
      ] }),
      E.uploading && /* @__PURE__ */ v.jsx("span", { className: px, children: "Uploading…" }),
      !E.uploading && E.file && /* @__PURE__ */ v.jsx("span", { className: mx, children: E.file.name }),
      E.uploadError && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Pu, children: E.uploadError }),
      i && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Pu, children: i })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: cx, children: [
      /* @__PURE__ */ v.jsxs("span", { className: fx, children: [
        "Last image",
        " ",
        a ? /* @__PURE__ */ v.jsx(Fn, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ v.jsx(
        sx,
        {
          accept: "image/*",
          maxSizeBytes: gx,
          ariaLabel: "last image upload",
          label: N.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over one clip — switches the render to single-clip morph (Clips locked to 1).",
          onFiles: (C) => void N.pick(C[0] ?? null),
          renderPreview: () => N.file && j ? /* @__PURE__ */ v.jsx("img", { className: Xu, src: j, alt: "last preview" }) : null
        }
      ),
      !N.file && j && /* @__PURE__ */ v.jsxs("div", { className: dx, children: [
        /* @__PURE__ */ v.jsx(
          "img",
          {
            className: Xu,
            src: j,
            alt: "last preview",
            onError: N.handleRemotePreviewError
          }
        ),
        /* @__PURE__ */ v.jsxs("span", { className: hx, children: [
          "Restored from a past run",
          c ? ` · ${c}` : ""
        ] })
      ] }),
      N.uploading && /* @__PURE__ */ v.jsx("span", { className: px, children: "Uploading…" }),
      !N.uploading && N.file && /* @__PURE__ */ v.jsx("span", { className: mx, children: N.file.name }),
      N.uploadError && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Pu, children: N.uploadError }),
      l && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Pu, children: l })
    ] })
  ] });
}
var tz = "_1hbttwg0", nz = "_1hbttwg1", az = "_1hbttwg2", rz = "_1hbttwg3", j_ = "_1hbttwg4", iz = "_1hbttwg5", lz = "_1hbttwg7 _1hbttwg6", oz = "_1hbttwg8 _1hbttwg6", vx = "_1hbttwg9", O_ = "_1hbttwga", kl = "_1hbttwgb", Hl = "_1hbttwgc", Bl = "_1hbttwgd", sz = "lb0y1x0", uz = "lb0y1x1", cz = "lb0y1x2", fz = "lb0y1x3 lb0y1x2", dz = "lb0y1x4", hz = "lb0y1x6", mz = "lb0y1x7", pz = "lb0y1x8", gz = "lb0y1x9", vz = "lb0y1xa", yz = "lb0y1xb", bz = "lb0y1xc", xz = "lb0y1xd", wz = "lb0y1xe", _z = "lb0y1xf";
function Sz() {
  return /* @__PURE__ */ v.jsx("span", { className: dz, "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx(
    "path",
    {
      d: "M4 6l4 4 4-4",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) });
}
function Ez() {
  return /* @__PURE__ */ v.jsx("span", { className: wz, "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx(
    "path",
    {
      d: "M3.5 8.5l3 3 6-7.5",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) });
}
function Nz({
  id: e,
  value: a,
  options: i,
  onChange: l,
  placeholder: s = "Select…",
  searchPlaceholder: u = "Search…",
  searchLabel: c = "Search options"
}) {
  const [d, p] = S.useState(!1), [m, y] = S.useState(""), [g, b] = S.useState(0), x = S.useRef(null), _ = S.useRef(null), E = S.useRef(null), N = S.useRef(null), R = S.useId(), j = S.useMemo(() => i.find((H) => H.value === a) ?? null, [i, a]), C = S.useMemo(() => {
    const H = m.trim().toLowerCase();
    return H ? i.filter((J) => J.label.toLowerCase().includes(H)) : i;
  }, [i, m]), O = S.useCallback((H) => {
    p(!1), y(""), H && _.current?.focus();
  }, []), V = S.useCallback(
    (H) => {
      l(H.value), O(!0);
    },
    [l, O]
  );
  S.useEffect(() => {
    if (!d) return;
    E.current?.focus();
    const H = i.findIndex((J) => J.value === a);
    b(H >= 0 ? H : 0);
  }, [d, i, a]), S.useEffect(() => {
    b((H) => Math.min(Math.max(0, H), Math.max(0, C.length - 1)));
  }, [C.length]), S.useEffect(() => {
    if (!d) return;
    N.current?.children[g]?.scrollIntoView?.({ block: "nearest" });
  }, [d, g]), S.useEffect(() => {
    if (!d) return;
    const H = (J) => {
      x.current && !x.current.contains(J.target) && O(!1);
    };
    return document.addEventListener("mousedown", H), () => document.removeEventListener("mousedown", H);
  }, [d, O]);
  const B = (H) => {
    switch (H.key) {
      case "ArrowDown":
        H.preventDefault(), b((J) => Math.min(C.length - 1, Math.max(0, J) + 1));
        break;
      case "ArrowUp":
        H.preventDefault(), b((J) => Math.max(0, J - 1));
        break;
      case "Home":
        H.preventDefault(), b(0);
        break;
      case "End":
        H.preventDefault(), b(Math.max(0, C.length - 1));
        break;
      case "Enter": {
        H.preventDefault();
        const J = C[g];
        J && V(J);
        break;
      }
      case "Escape":
        H.preventDefault(), O(!0);
        break;
    }
  }, U = (H) => {
    !d && (H.key === "ArrowDown" || H.key === "Enter" || H.key === " ") && (H.preventDefault(), p(!0));
  }, D = d && C[g] ? `${R}-opt-${g}` : void 0;
  return /* @__PURE__ */ v.jsxs("div", { className: sz, ref: x, children: [
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        type: "button",
        id: e,
        ref: _,
        className: uz,
        "aria-haspopup": "listbox",
        "aria-expanded": d,
        "aria-controls": d ? R : void 0,
        onClick: () => d ? O(!1) : p(!0),
        onKeyDown: U,
        children: [
          /* @__PURE__ */ v.jsx("span", { className: j ? cz : fz, children: j ? j.label : s }),
          /* @__PURE__ */ v.jsx(Sz, {})
        ]
      }
    ),
    d && /* @__PURE__ */ v.jsxs("div", { className: hz, children: [
      /* @__PURE__ */ v.jsx("div", { className: mz, children: /* @__PURE__ */ v.jsx(
        "input",
        {
          ref: E,
          type: "text",
          role: "combobox",
          "aria-expanded": !0,
          "aria-controls": R,
          "aria-activedescendant": D,
          "aria-autocomplete": "list",
          "aria-label": c,
          className: pz,
          placeholder: u,
          value: m,
          onChange: (H) => y(H.target.value),
          onKeyDown: B
        }
      ) }),
      /* @__PURE__ */ v.jsx(
        "div",
        {
          ref: N,
          id: R,
          role: "listbox",
          "aria-label": c,
          tabIndex: -1,
          className: gz,
          children: C.length === 0 ? /* @__PURE__ */ v.jsx("div", { className: _z, children: "No matches" }) : C.map((H, J) => {
            const I = H.value === a, Q = J === g, ae = [
              vz,
              Q ? yz : "",
              I ? bz : ""
            ].filter(Boolean).join(" ");
            return /* @__PURE__ */ v.jsxs(
              "button",
              {
                type: "button",
                id: `${R}-opt-${J}`,
                role: "option",
                "aria-selected": I,
                tabIndex: -1,
                "data-active": Q || void 0,
                className: ae,
                onClick: () => V(H),
                onMouseMove: () => b(J),
                children: [
                  /* @__PURE__ */ v.jsx("span", { className: xz, children: H.label }),
                  I && /* @__PURE__ */ v.jsx(Ez, {})
                ]
              },
              H.value
            );
          })
        }
      )
    ] })
  ] });
}
const Cz = /* @__PURE__ */ new Set(["safetensors", "gguf"]);
function Rz(e) {
  return e.replace(/^[a-z0-9_]+:/i, "");
}
function Tz(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
function Mz(e) {
  return Cz.has(e.format) && e.install_path !== null;
}
function Dz(e) {
  return e.filter((a) => Mz(a) && a.install_path).map((a) => ({
    value: a.install_path,
    label: `${Tz(a.filename)}${a.family_id ? ` (${Rz(a.family_id)})` : ""}`
  })).sort((a, i) => a.label.localeCompare(i.label));
}
const Az = "/api/v1/model-store/installed";
async function jz() {
  const e = await fetch(Az, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json();
  return "installed" in a ? a : a.data && "installed" in a.data ? a.data : { family_ids: [], installed: [], truncated: !1 };
}
var zn = "_1czy96m0", wn = "_1czy96m1", Kc = "_1czy96m2", fp = "_1czy96m3", dp = "_1czy96m4", z_ = "_1czy96m5", L_ = "_1czy96m6", k_ = "_1czy96m7", H_ = "_1czy96m8", hp = "_1czy96m9", Oz = "_1czy96ma", yx = "_1czy96mb", bx = "_1czy96mc", xx = "_1czy96md", wx = "_1czy96me", _x = "_1czy96mf", Sx = "_1czy96mg", Ex = "_1czy96mh", zz = "_1czy96mi", Lz = "_1czy96mk _1czy96mj", kz = "_1czy96ml _1czy96mj", Hz = "_1czy96mm", Bz = "_1czy96mn", Uz = "_1czy96mo", Vz = "_1czy96mp", $z = "_1czy96mq", B_ = "_1czy96mr", qz = "_1czy96ms", Nx = "_1czy96mt", Iz = "_1czy96mu", Yz = "_1czy96mv", Gz = "_1czy96mw", Fz = "_1czy96mx", Xz = "_1czy96my", Pz = "_1czy96mz", Zz = "_1czy96m10", Qz = "_1czy96m11", Kz = "_1czy96m12", Lh = "_1czy96m13", Ci = "_1czy96m14", Ri = "_1czy96m15", xs = "_1czy96m16", cn = "_1czy96m17", Wz = "_1czy96m18", Jz = "_1czy96m19";
const Zu = "__bundled__";
function eL() {
  return /* @__PURE__ */ v.jsx("span", { className: xs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "open" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M4 6l4 4 4-4",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) });
}
function kh({
  id: e,
  label: a,
  value: i,
  options: l,
  includeBundled: s,
  onChange: u
}) {
  const c = S.useMemo(() => {
    const d = s ? [{ value: Zu, label: "Bundled Wan2.2 (default)" }, ...l] : l;
    if (i && i !== Zu && !d.some((p) => p.value === i)) {
      const p = i.split(/[\\/]/).pop() || i;
      return [...d, { value: i, label: `${p} (not installed)` }];
    }
    return d;
  }, [s, l, i]);
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: e, children: a }),
    /* @__PURE__ */ v.jsx(
      Nz,
      {
        id: e,
        value: i ?? Zu,
        options: c,
        onChange: (d) => u(d === Zu ? void 0 : d),
        placeholder: "Select a model file",
        searchPlaceholder: "Search models…",
        searchLabel: `${a} — search installed models`
      }
    )
  ] });
}
function tL() {
  const { params: e, settings: a, updateParam: i, setSettings: l } = Qt(), s = ls("svi2/installed-models", jz), u = S.useMemo(
    () => Dz(s.data?.installed ?? []),
    [s.data]
  ), c = e.dit_high_path ?? void 0, d = e.dit_low_path ?? void 0, p = typeof c == "string" && c.length > 0 && c === d, m = p, y = s.error !== void 0, g = a.sviLoraTier ?? e.svi_lora_tier ?? "high", b = S.useCallback(
    (E, N) => {
      i("dit_high_path", E), i("dit_low_path", N);
      const R = { ...a, ditHighPath: E ?? "", ditLowPath: N ?? "" };
      l(R), pc(R).catch(() => {
      });
    },
    [a, i, l]
  ), x = S.useCallback(
    (E) => {
      if (E) {
        const N = c ?? d ?? u[0]?.value;
        N && b(N, N);
      } else
        b(c, void 0);
    },
    [c, d, u, b]
  ), _ = S.useCallback(
    (E) => {
      const N = E;
      i("svi_lora_tier", N);
      const R = { ...a, sviLoraTier: N };
      l(R), pc(R).catch(() => {
      });
    },
    [a, i, l]
  );
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": p,
          "aria-label": "Use one model file for both experts",
          className: Hl,
          onClick: () => x(!p),
          children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Same file for both experts (single-file model)" })
    ] }),
    p ? /* @__PURE__ */ v.jsx(
      kh,
      {
        id: "svi2-base-model",
        label: "Base model",
        value: c,
        options: u,
        includeBundled: !1,
        onChange: (E) => b(E, E)
      }
    ) : /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx(
        kh,
        {
          id: "svi2-model-high",
          label: "High-noise expert (runs first)",
          value: c,
          options: u,
          includeBundled: !0,
          onChange: (E) => b(E, d)
        }
      ),
      /* @__PURE__ */ v.jsx(
        kh,
        {
          id: "svi2-model-low",
          label: "Low-noise expert (runs second)",
          value: d,
          options: u,
          includeBundled: !0,
          onChange: (E) => b(c, E)
        }
      )
    ] }),
    !m && /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": g !== "off",
          "aria-label": "Apply SVI LoRA to both experts",
          className: Hl,
          onClick: () => _(g === "off" ? "high" : "off"),
          children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "SVI LoRA (auto: high→high, low→low). Turn off for merged checkpoints (e.g. SmoothMix)." })
    ] }),
    y && /* @__PURE__ */ v.jsx("span", { className: cn, children: "Model Foundry list unavailable — using the bundled base model." }),
    !y && u.length === 0 && /* @__PURE__ */ v.jsx("span", { className: cn, children: "No models installed via Model Foundry yet — using the bundled base model." }),
    m && /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-svi-lora-tier", children: "SVI LoRA" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-svi-lora-tier",
            className: Ri,
            value: g,
            onChange: (E) => _(E.target.value),
            children: OC.map((E) => /* @__PURE__ */ v.jsx("option", { value: E.value, children: E.label }, E.value))
          }
        ),
        /* @__PURE__ */ v.jsx(eL, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Which SVI2 LoRA wraps this single-file model. Off for community merges (e.g. SmoothMix)." })
    ] })
  ] });
}
const nL = "/api/v1/model-store/installed";
function aL(e) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const l of e) {
    if (!(l.role === "lora" || l.format === "safetensors") || l.install_path === null || l.install_path.length === 0)
      continue;
    const u = `${l.family_id}/${l.filename}`;
    a.has(u) || (a.add(u), i.push({
      artifactId: l.artifact_id,
      familyId: l.family_id,
      filename: l.filename,
      installPath: l.install_path
    }));
  }
  return i;
}
async function rL() {
  const e = await fetch(nL, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json(), i = "installed" in a ? a : a.data ?? { installed: [] };
  return aL(i.installed);
}
const fc = 4, Hh = 4;
function iL(e) {
  return e.weight_high ?? e.weight ?? 1;
}
function lL(e) {
  return e.weight_low ?? e.weight ?? 1;
}
function oL(e) {
  return e.length >= fc ? e : [...e, { path: "", weight_high: 1, weight_low: 1 }];
}
function sL(e, a) {
  return e.filter((i, l) => l !== a);
}
function uL(e, a, i) {
  return e.map((l, s) => s === a ? { ...l, path: i } : l);
}
function cL(e, a, i) {
  return e.map((l, s) => s === a ? { ...l, weight_high: i } : l);
}
function fL(e, a, i) {
  return e.map((l, s) => s === a ? { ...l, weight_low: i } : l);
}
const Qu = "__none__";
function Cx({
  tier: e,
  value: a,
  onChange: i
}) {
  const l = S.useId(), u = { flex: 1, "--svi2-slider-fill": `${Math.max(0, Math.min(Hh, a)) / Hh * 100}%` };
  return /* @__PURE__ */ v.jsxs("div", { className: Jz, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: l, style: { width: "34px" }, children: e }),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        id: l,
        type: "range",
        className: O_,
        min: 0,
        max: Hh,
        step: 0.05,
        value: a,
        onChange: (c) => i(parseFloat(c.target.value)),
        style: u
      }
    ),
    /* @__PURE__ */ v.jsx("span", { className: hp, children: a.toFixed(2) })
  ] });
}
function dL({
  rowIndex: e,
  row: a,
  options: i,
  onPath: l,
  onWeightHigh: s,
  onWeightLow: u,
  onRemove: c
}) {
  const d = S.useId(), p = a.path.length > 0 ? a.path : Qu, m = (y) => {
    l(y === Qu ? null : y);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
      /* @__PURE__ */ v.jsxs("label", { className: wn, htmlFor: d, style: { flex: 1 }, children: [
        "LoRA ",
        e + 1
      ] }),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          "aria-label": `Remove LoRA ${e + 1}`,
          onClick: c,
          style: {
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 4px",
            lineHeight: 1,
            color: "var(--color-text-muted, #888)"
          },
          children: "×"
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
      /* @__PURE__ */ v.jsxs(
        "select",
        {
          id: d,
          className: Ri,
          value: p,
          onChange: (y) => m(y.target.value),
          children: [
            /* @__PURE__ */ v.jsx("option", { value: Qu, children: "None" }),
            i.map((y) => /* @__PURE__ */ v.jsxs("option", { value: y.installPath, children: [
              y.filename,
              y.familyId ? ` (${y.familyId.replace(/^[^:]+:/, "")})` : ""
            ] }, y.artifactId))
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: xs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ v.jsx("title", { children: "open" }),
        /* @__PURE__ */ v.jsx(
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
    p !== Qu && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx(Cx, { tier: "High", value: iL(a), onChange: s }),
      /* @__PURE__ */ v.jsx(Cx, { tier: "Low", value: lL(a), onChange: u }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Per-expert weight (0 = off for that expert). Distill LoRAs like lightx2v run High>Low, e.g. 3.0 / 1.5." })
    ] })
  ] });
}
function hL() {
  const { params: e, updateParam: a } = Qt(), i = ls("svi2/installed-loras", rL, {
    shouldRetryOnError: !1
  }), l = i.data ?? [], s = e.user_loras ?? [], u = (c) => a("user_loras", c);
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    i.error && /* @__PURE__ */ v.jsx("div", { className: Wz, role: "alert", children: "Failed to load installed LoRAs" }),
    /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("span", { className: wn, children: "LoRAs (applied to both experts)" }),
      s.map((c, d) => /* @__PURE__ */ v.jsx(
        dL,
        {
          rowIndex: d,
          row: c,
          options: l,
          onPath: (p) => u(uL(s, d, p ?? "")),
          onWeightHigh: (p) => u(cL(s, d, p)),
          onWeightLow: (p) => u(fL(s, d, p)),
          onRemove: () => u(sL(s, d))
        },
        d
      )),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          onClick: () => u(oL(s)),
          disabled: s.length >= fc,
          className: cn,
          style: {
            background: "none",
            border: "none",
            cursor: s.length >= fc ? "not-allowed" : "pointer",
            padding: "4px 0",
            textAlign: "left",
            opacity: s.length >= fc ? 0.45 : 1
          },
          children: "+ Add LoRA"
        }
      )
    ] })
  ] });
}
const os = "custom", mL = [
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
function mp(e) {
  const a = new Map(e.map((l) => [l.id, l])), i = [];
  for (const l of mL) {
    const s = a.get(l.presetId), u = s?.params.width, c = s?.params.height;
    !u || !c || i.push({
      id: l.presetId,
      width: u,
      height: c,
      label: l.label,
      sub: l.sub,
      stepsDown: l.stepsDown,
      offDistribution: l.offDistribution
    });
  }
  return i;
}
function pp(e, a) {
  const i = a.find(
    (l) => l.width === e.width && l.height === e.height
  );
  return i ? i.id : os;
}
var pL = "_14qe5430", gL = "_14qe5431", vL = "_14qe5432", yL = "_14qe5433", bL = "_14qe5434", xL = "_14qe5435", wL = "_14qe5436", _L = "_14qe5437", SL = "_14qe5438", EL = "_14qe543a _14qe5439", NL = "_14qe543b _14qe5439", CL = "_14qe543c _14qe5439";
const RL = {
  ok: gL,
  neutral: vL,
  warn: yL
}, TL = {
  ok: xL,
  neutral: wL,
  warn: _L
}, ML = {
  ok: EL,
  neutral: NL,
  warn: CL
};
function DL(e, a) {
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
function AL({ tone: e }) {
  return e === "ok" ? /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "in distribution" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M10 1.8l6.4 2.4v4.4c0 4.1-2.7 7.9-6.4 9.6-3.7-1.7-6.4-5.5-6.4-9.6V4.2L10 1.8z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M7 10l2.1 2.1L13.2 8",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) : e === "warn" ? /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "warning" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M10 2.6L18.6 17H1.4L10 2.6z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ v.jsx("path", { d: "M10 8v4", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "14.4", r: "0.9", fill: "currentColor" })
  ] }) : /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "info" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.4" }),
    /* @__PURE__ */ v.jsx("path", { d: "M10 9v5", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "6.2", r: "0.9", fill: "currentColor" })
  ] });
}
function jL({
  presets: e,
  warningText: a
}) {
  const { params: i } = Qt(), l = S.useMemo(() => mp(e), [e]);
  if (l.length === 0) return null;
  const s = pp(i, l), u = s === os ? null : l.find((d) => d.id === s)?.stepsDown ?? null, c = DL(u, a);
  return /* @__PURE__ */ v.jsxs(
    "output",
    {
      className: [pL, RL[c.tone]].join(" "),
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ v.jsx("span", { className: [bL, TL[c.tone]].join(" "), "aria-hidden": "true", children: /* @__PURE__ */ v.jsx(AL, { tone: c.tone }) }),
        /* @__PURE__ */ v.jsx("span", { className: SL, children: c.text }),
        /* @__PURE__ */ v.jsx("span", { className: ML[c.tone], children: c.tag })
      ]
    }
  );
}
var OL = "_5d10lv0";
const Bo = [
  { value: "image_to_video", label: "Image-to-Video" },
  { value: "text_to_video", label: "Text-to-Video" }
], zL = "In Text-to-Video, the prompt sets content and motion — appearance is locked to the synthesized seed and won't restyle mid-take.", LL = /* @__PURE__ */ new Set(["ArrowRight", "ArrowDown"]), kL = /* @__PURE__ */ new Set(["ArrowLeft", "ArrowUp"]);
function HL(e) {
  return [dp, e ? z_ : ""].filter(Boolean).join(" ");
}
function BL({ value: e, onChange: a }) {
  const i = S.useId(), l = (s) => {
    const u = LL.has(s.key), c = kL.has(s.key);
    if (!u && !c) return;
    s.preventDefault();
    const d = Bo.findIndex((y) => y.value === e), m = Bo[(d + (u ? 1 : -1) + Bo.length) % Bo.length];
    m && m.value !== e && a(m.value);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: i, children: "Mode" }),
    /* @__PURE__ */ v.jsx("div", { className: Kc, children: /* @__PURE__ */ v.jsx(
      "div",
      {
        className: fp,
        role: "radiogroup",
        "aria-labelledby": i,
        onKeyDown: l,
        children: Bo.map((s) => {
          const u = e === s.value;
          return /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": u,
              tabIndex: u ? 0 : -1,
              className: HL(u),
              onClick: () => a(s.value),
              children: s.label
            },
            s.value
          );
        })
      }
    ) }),
    e === "text_to_video" && /* @__PURE__ */ v.jsx("p", { className: OL, "aria-live": "polite", children: zL })
  ] });
}
var UL = "dck790", VL = "dck791", $L = "dck792";
function Rc({ title: e, detail: a, action: i, className: l }) {
  const s = [UL, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("div", { className: s, children: [
    /* @__PURE__ */ v.jsx("span", { className: VL, children: e }),
    a && /* @__PURE__ */ v.jsx("span", { className: $L, children: a }),
    i
  ] });
}
var qL = "_1880igs0", IL = "_1880igs1", YL = "_1880igs2", GL = "_1880igs3", FL = "_1880igs4", XL = "_1880igs5", PL = "_1880igs6", ZL = "_1880igs7", QL = "_1880igs8";
const KL = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function WL({ jobs: e, onOpen: a, onDelete: i }) {
  return e.length === 0 ? /* @__PURE__ */ v.jsx(
    Rc,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ v.jsx("div", { className: qL, children: e.map((l) => /* @__PURE__ */ v.jsxs("div", { className: IL, children: [
    /* @__PURE__ */ v.jsxs("button", { type: "button", className: YL, onClick: () => a(l), children: [
      /* @__PURE__ */ v.jsxs("span", { className: FL, children: [
        /* @__PURE__ */ v.jsx("span", { className: XL, children: l.presetId ?? "custom" }),
        /* @__PURE__ */ v.jsx("span", { className: PL, children: e6(l) })
      ] }),
      /* @__PURE__ */ v.jsxs("span", { className: ZL, children: [
        /* @__PURE__ */ v.jsx(
          "time",
          {
            className: QL,
            dateTime: l.createdAt,
            title: t6(l.createdAt),
            children: n6(l.createdAt)
          }
        ),
        /* @__PURE__ */ v.jsx(Fn, { tone: KL[l.status], children: l.status })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx(
      "button",
      {
        type: "button",
        className: GL,
        "aria-label": `Delete ${l.presetId ?? "custom"} render from history`,
        title: "Delete from history",
        onClick: () => i(l),
        children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 24 24", width: "15", height: "15", "aria-hidden": "true", children: [
          /* @__PURE__ */ v.jsx("title", { children: "delete" }),
          /* @__PURE__ */ v.jsx(
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
  ] }, l.id)) });
}
const JL = S.memo(WL);
function e6(e) {
  const a = e.params, i = [];
  return a.width && a.height && i.push(`${a.width}×${a.height}`), a.num_clips && i.push(`${a.num_clips} clips`), a.num_inference_steps && i.push(`${a.num_inference_steps} steps`), i.join(" · ") || "—";
}
function t6(e) {
  const a = new Date(e);
  return Number.isNaN(a.getTime()) ? e : a.toLocaleString();
}
function n6(e) {
  const a = new Date(e), i = a.getTime();
  if (Number.isNaN(i)) return "";
  const l = Date.now() - i;
  if (l < 0) return "just now";
  const s = Math.floor(l / 6e4);
  if (s < 1) return "just now";
  if (s < 60) return `${s}m ago`;
  const u = Math.floor(s / 60);
  if (u < 24) return `${u}h ago`;
  const c = Math.floor(u / 24);
  return c < 7 ? `${c}d ago` : a.toLocaleDateString();
}
function a6() {
  const { presetId: e, params: a } = Qt();
  return Qc(e, a) ? /* @__PURE__ */ v.jsx(i6, {}) : /* @__PURE__ */ v.jsx(r6, {});
}
function U_(e) {
  return [dp, e ? z_ : ""].filter(Boolean).join(" ");
}
function r6() {
  const { params: e, updateParam: a } = Qt(), i = Oi(e), l = o5(e.num_clips ?? 1, i), [s, u] = S.useState(
    () => Number(om(e.num_clips ?? 1, i).toFixed(1))
  ), c = (d) => {
    const p = n5(d, i);
    a("num_clips", p.numClips), a("frames_per_clip", p.framesPerClip);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ v.jsxs("div", { className: Kc, children: [
      /* @__PURE__ */ v.jsx("div", { className: fp, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: y_.map((d) => {
        const p = l === d;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": p,
            className: U_(p),
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
      /* @__PURE__ */ v.jsxs("div", { className: L_, children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Length in seconds",
            className: k_,
            min: 1,
            max: 600,
            step: 1,
            value: s,
            onChange: (d) => {
              const p = Number(d.target.value);
              u(p), Number.isFinite(p) && p >= 1 && p <= 600 && c(p);
            },
            onBlur: () => {
              u(Number(om(e.num_clips ?? 1, Oi(e)).toFixed(1)));
            }
          }
        ),
        /* @__PURE__ */ v.jsx("span", { className: H_, children: "sec" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("output", { className: hp, "aria-live": "polite", children: s5(e) })
  ] });
}
function i6() {
  const { params: e, updateParam: a } = Qt(), i = Oi(e), l = i5(i.fps), [s, u] = S.useState(() => Number(x_(e).toFixed(1))), c = r5.filter((p) => p <= l), d = (p) => {
    const m = Math.min(l, Math.max(1, p));
    e.num_clips !== 1 && a("num_clips", 1), a("frames_per_clip", Qb(m, i.fps));
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ v.jsxs("div", { className: Kc, children: [
      /* @__PURE__ */ v.jsx("div", { className: fp, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: c.length > 0 ? c.map((p) => {
        const m = Qb(p, i.fps) === i.framesPerClip;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": m,
            className: U_(m),
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
      }) : /* @__PURE__ */ v.jsxs("span", { className: dp, "aria-hidden": "true", children: [
        "1–",
        l,
        "s"
      ] }) }),
      /* @__PURE__ */ v.jsxs("div", { className: L_, children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Morph length in seconds",
            className: k_,
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
        /* @__PURE__ */ v.jsx("span", { className: H_, children: "sec" })
      ] }),
      /* @__PURE__ */ v.jsxs("span", { className: cn, children: [
        "1–",
        l,
        "s morph · single clip, frames = ",
        i.fps,
        " fps × seconds (4n+1)"
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("output", { className: hp, "aria-live": "polite", children: l5(e) })
  ] });
}
var l6 = "_17owg2e0", o6 = "_17owg2e1", s6 = "_17owg2e2", Ku = "_17owg2e3", Wu = "_17owg2e4", u6 = "_17owg2e5", c6 = "_17owg2e6", f6 = "_17owg2e7", d6 = "_17owg2e8";
function Bh() {
  return /* @__PURE__ */ v.jsx("span", { className: u6, "aria-hidden": "true" });
}
function h6({ presets: e }) {
  const { presetId: a, params: i } = Qt(), l = S.useMemo(() => mp(e), [e]), s = Oi(i), u = Qc(a, i), c = u ? 1 : i.num_clips ?? 1, d = u ? s.framesPerClip : b_(c, s), p = s.fps > 0 ? d / s.fps : 0, m = i.interpolate_fps ?? 0, y = m > 0 ? m : s.fps, g = m > 0 && s.fps > 0 ? Math.round(d * (m / s.fps)) : d, b = typeof i.upscale_factor == "number" ? i.upscale_factor : 0, x = b > 0 ? b : 1, _ = (i.width ?? 0) * x, E = (i.height ?? 0) * x, N = pp(i, l), R = N === os || (l.find((C) => C.id === N)?.stepsDown ?? 0) >= 2, j = [f6, R ? d6 : ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("div", { className: l6, children: [
    /* @__PURE__ */ v.jsx("span", { className: o6, children: "Output" }),
    /* @__PURE__ */ v.jsxs("div", { className: s6, children: [
      /* @__PURE__ */ v.jsxs("span", { children: [
        /* @__PURE__ */ v.jsx("span", { className: Ku, children: g }),
        " ",
        /* @__PURE__ */ v.jsx("span", { className: Wu, children: "frames" })
      ] }),
      /* @__PURE__ */ v.jsx(Bh, {}),
      /* @__PURE__ */ v.jsxs("span", { className: Ku, children: [
        _,
        "×",
        E
      ] }),
      /* @__PURE__ */ v.jsx(Bh, {}),
      /* @__PURE__ */ v.jsxs("span", { children: [
        /* @__PURE__ */ v.jsx("span", { className: Ku, children: y }),
        " ",
        /* @__PURE__ */ v.jsx("span", { className: Wu, children: "fps" })
      ] }),
      /* @__PURE__ */ v.jsx(Bh, {}),
      /* @__PURE__ */ v.jsxs("span", { children: [
        /* @__PURE__ */ v.jsx("span", { className: Wu, children: "~" }),
        /* @__PURE__ */ v.jsx("span", { className: Ku, children: p.toFixed(1) }),
        " ",
        /* @__PURE__ */ v.jsx("span", { className: Wu, children: "s" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("span", { className: c6, children: [
      /* @__PURE__ */ v.jsx("span", { className: j, "aria-hidden": "true" }),
      R ? "off-distribution" : "ready"
    ] })
  ] });
}
var m6 = "dgx4n20", p6 = "dgx4n21", g6 = "dgx4n22", v6 = "dgx4n23", y6 = "dgx4n24", b6 = "dgx4n25", x6 = "dgx4n26", w6 = "dgx4n27", _6 = "dgx4n28", S6 = "dgx4n29", E6 = "dgx4n2a", N6 = "dgx4n2b", Rx = "dgx4n2c", C6 = "dgx4n2d", R6 = "dgx4n2e";
function T6(e) {
  const a = e.trim();
  return (a.split(/(?<=[.!?])\s/)[0] ?? a).replace(/[.!?]+$/, "");
}
function M6({
  presets: e,
  selectedId: a,
  onSelect: i
}) {
  const [l, s] = S.useState(!1), u = S.useMemo(() => g5(e), [e]), c = S.useMemo(() => {
    const b = u.legacy.filter((_) => _.id === a), x = l ? u.legacy : b;
    return [...u.featured, ...x];
  }, [u, l, a]), d = S.useRef([]), p = S.useCallback(
    (b) => {
      const x = c[b];
      x && (d.current[b]?.focus(), i(x));
    },
    [c, i]
  ), m = S.useCallback(
    (b, x) => {
      const _ = c.length - 1;
      switch (b.key) {
        case "ArrowRight":
        case "ArrowDown":
          b.preventDefault(), p(x === _ ? 0 : x + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          b.preventDefault(), p(x === 0 ? _ : x - 1);
          break;
        case "Home":
          b.preventDefault(), p(0);
          break;
        case "End":
          b.preventDefault(), p(_);
          break;
      }
    },
    [c, p]
  );
  if (e.length === 0)
    return /* @__PURE__ */ v.jsx(
      Rc,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const y = Math.max(
    0,
    c.findIndex((b) => b.id === a)
  ), g = u.legacy.length;
  return /* @__PURE__ */ v.jsxs("div", { className: E6, children: [
    /* @__PURE__ */ v.jsx("div", { className: m6, role: "radiogroup", "aria-label": "Render presets", children: c.map((b, x) => {
      const _ = m5(b), E = b.id === a, N = b.id === is, R = [
        p6,
        b.legacy ? "" : g6,
        N ? v6 : "",
        E ? y6 : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ v.jsxs(
        "button",
        {
          ref: (j) => {
            d.current[x] = j;
          },
          type: "button",
          role: "radio",
          "aria-checked": E,
          tabIndex: x === y ? 0 : -1,
          title: b.description,
          className: R,
          onClick: () => i(b),
          onKeyDown: (j) => m(j, x),
          children: [
            /* @__PURE__ */ v.jsxs("div", { className: x6, children: [
              /* @__PURE__ */ v.jsx("span", { className: w6, children: b.label }),
              N && /* @__PURE__ */ v.jsx(Fn, { tone: "accent", children: "Default" }),
              /* @__PURE__ */ v.jsx("span", { className: b6, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", children: [
                /* @__PURE__ */ v.jsx("title", { children: "selected" }),
                /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
                /* @__PURE__ */ v.jsx(
                  "path",
                  {
                    d: "M6.5 10.2l2.3 2.3 4.7-4.8",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: _6, children: T6(b.description) }),
            /* @__PURE__ */ v.jsxs("div", { className: S6, children: [
              /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: _.resolution }),
              /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: _.duration }),
              /* @__PURE__ */ v.jsx(Fn, { tone: _.isLowVram ? "success" : "neutral", children: _.vram }),
              _.isOffDistribution && /* @__PURE__ */ v.jsx(Fn, { tone: "warning", children: "off-distribution" }),
              _.requiresLastImage && /* @__PURE__ */ v.jsx(Fn, { tone: "warning", children: "needs last image" })
            ] })
          ]
        },
        b.id
      );
    }) }),
    g > 0 && /* @__PURE__ */ v.jsxs("div", { className: N6, children: [
      /* @__PURE__ */ v.jsx("span", { className: Rx, "aria-hidden": "true" }),
      /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          className: C6,
          "aria-expanded": l,
          onClick: () => s((b) => !b),
          children: [
            /* @__PURE__ */ v.jsx("span", { className: R6, "aria-hidden": "true" }),
            l ? "Hide legacy presets" : `Show legacy presets (${g})`
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: Rx, "aria-hidden": "true" })
    ] })
  ] });
}
var D6 = "_1ntn2zv0", A6 = "_1ntn2zv1", j6 = "_1ntn2zv2", O6 = "_1ntn2zv3", z6 = "_1ntn2zv4", L6 = "_1ntn2zv5", Tx = "_1ntn2zv6", k6 = "_1ntn2zv7", H6 = "_1ntn2zv8", B6 = "_1ntn2zv9", U6 = "_1ntn2zva";
function V6({ error: e, textareaId: a }) {
  const { params: i, setPrompts: l } = Qt(), [s, u] = S.useState(!1), c = i.prompts ?? [""], d = S.useMemo(
    () => Math.max(1, i.num_clips ?? c.length ?? 1),
    [i.num_clips, c.length]
  ), p = S.useMemo(
    () => c.slice(d).filter((b) => b.trim().length > 0).length,
    [c, d]
  ), m = (b) => {
    const x = c.length > 0 ? [...c] : [""];
    x[0] = b, l(x);
  }, y = (b, x) => {
    const _ = Math.max(d, c.length, b + 1), E = Array.from({ length: _ }, (N, R) => c[R] ?? "");
    E[b] = x, l(E);
  }, g = (b) => {
    if (u(b), b) {
      const x = c[0] ?? "", _ = Math.max(d, c.length);
      l(Array.from({ length: _ }, (E, N) => c[N] ?? x));
    }
  };
  return /* @__PURE__ */ v.jsxs("div", { className: D6, children: [
    /* @__PURE__ */ v.jsx("div", { className: A6, children: /* @__PURE__ */ v.jsxs("span", { className: j6, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s,
          "aria-label": "per-clip prompts",
          className: O6,
          onClick: () => g(!s),
          children: /* @__PURE__ */ v.jsx("span", { className: z6, "aria-hidden": "true" })
        }
      ),
      "Per-clip prompts"
    ] }) }),
    s ? Array.from({ length: d }, (b, x) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ v.jsxs("div", { className: k6, children: [
        /* @__PURE__ */ v.jsxs("span", { className: H6, children: [
          "Clip ",
          x + 1
        ] }),
        /* @__PURE__ */ v.jsx(
          "textarea",
          {
            id: x === 0 ? a : void 0,
            className: Tx,
            "aria-label": `prompt for clip ${x + 1}`,
            "aria-invalid": x === 0 && e !== void 0 ? !0 : void 0,
            value: c[x] ?? "",
            onChange: (_) => y(x, _.target.value)
          }
        )
      ] }, `clip-${x}`)
    )) : /* @__PURE__ */ v.jsx(
      "textarea",
      {
        id: a,
        className: Tx,
        "aria-label": "single prompt",
        "aria-invalid": e !== void 0 || void 0,
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: c[0] ?? "",
        onChange: (b) => m(b.target.value)
      }
    ),
    p > 0 && /* @__PURE__ */ v.jsxs("output", { className: L6, children: [
      p,
      " per-clip prompt",
      p > 1 ? "s" : "",
      " beyond the current Clips count ",
      p > 1 ? "are" : "is",
      " kept but hidden. Raise Clips to edit",
      p > 1 ? " them" : " it",
      " again — they are not discarded."
    ] }),
    /* @__PURE__ */ v.jsx("p", { className: B6, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    e && /* @__PURE__ */ v.jsx("span", { role: "alert", className: U6, children: e })
  ] });
}
var $6 = "_1itrxk30", q6 = "_1itrxk31", I6 = "_1itrxk32", Y6 = "_1itrxk33", G6 = "_1itrxk34", F6 = "_1itrxk35", X6 = "_1itrxk36", P6 = "_1itrxk37";
function Z6() {
  const { qwenEdit: e, setQwenEdit: a } = Qt();
  return /* @__PURE__ */ v.jsxs("div", { className: $6, children: [
    /* @__PURE__ */ v.jsxs("div", { className: q6, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": e.enabled,
          "aria-label": "enable anchor edit",
          className: X6,
          onClick: () => a({ enabled: !e.enabled }),
          children: /* @__PURE__ */ v.jsx("span", { className: P6, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsxs("span", { className: I6, children: [
        /* @__PURE__ */ v.jsx("span", { className: Y6, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ v.jsx("span", { className: G6, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    e.enabled && /* @__PURE__ */ v.jsx(
      "textarea",
      {
        className: F6,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: e.prompt,
        onChange: (i) => a({ prompt: i.target.value })
      }
    )
  ] });
}
var Q6 = "ob7g5b0", K6 = "ob7g5b1", W6 = "ob7g5b3", J6 = "ob7g5b4", e8 = "ob7g5b5", t8 = "ob7g5b6", n8 = "ob7g5b7", a8 = "ob7g5b8", r8 = "ob7g5b9", i8 = "ob7g5ba";
function l8({
  src: e,
  poster: a,
  fpsLabel: i,
  controls: l = !0,
  loop: s = !1,
  muted: u = !1,
  autoPlay: c = !1,
  ariaLabel: d,
  className: p,
  emptyContent: m,
  onEnded: y,
  onReady: g,
  onError: b
}) {
  const [x, _] = S.useState("loading"), [E, N] = S.useState(null), R = S.useCallback(() => {
    _("ready"), g?.();
  }, [g]), j = S.useCallback(
    (O) => {
      const V = O.target, B = V.error?.message || `media error code ${V.error?.code ?? "?"}`;
      _("error"), N(B), b?.(new Error(B));
    },
    [b]
  ), C = [Q6, p].filter(Boolean).join(" ");
  return e ? x === "error" ? /* @__PURE__ */ v.jsx("div", { className: C, role: "alert", "aria-label": d ?? "video playback error", children: /* @__PURE__ */ v.jsxs("div", { className: n8, children: [
    /* @__PURE__ */ v.jsx("div", { className: a8, children: "Could not play video" }),
    /* @__PURE__ */ v.jsx("div", { className: r8, children: E ?? "unknown error" }),
    /* @__PURE__ */ v.jsx("a", { className: i8, href: e, download: !0, target: "_blank", rel: "noreferrer", children: "Download file" })
  ] }) }) : /* @__PURE__ */ v.jsxs("div", { className: C, children: [
    x === "loading" && /* @__PURE__ */ v.jsx("div", { className: W6, "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("div", { className: J6 }) }),
    i && /* @__PURE__ */ v.jsx("span", { className: e8, children: i }),
    /* @__PURE__ */ v.jsx(
      "video",
      {
        className: K6,
        src: e,
        poster: a,
        controls: l,
        loop: s,
        muted: u,
        autoPlay: c,
        preload: "metadata",
        "aria-label": d ?? "video player",
        onLoadedData: R,
        onEnded: y,
        onError: j,
        children: /* @__PURE__ */ v.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ v.jsx("div", { className: C, "aria-label": d ?? "no video", children: /* @__PURE__ */ v.jsx("div", { className: t8, children: m ?? "No video to display yet." }) });
}
const dr = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107,
  CONNECTION_LOST: -32108
}, Mx = {
  [dr.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry."
  },
  [dr.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies."
  },
  [dr.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks."
  },
  [dr.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them."
  },
  [dr.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings."
  },
  [dr.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset."
  },
  [dr.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details."
  },
  [dr.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion."
  },
  [dr.CONNECTION_LOST]: {
    title: "Lost connection to the render",
    hint: "The live progress stream dropped. The render may still be running — check History for the final result."
  }
};
function o8(e, a) {
  return e !== null && Mx[e] ? Mx[e] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
var Ju = "_1ojc56g0", s8 = "_1ojc56g1", u8 = "_1ojc56g2", c8 = "_1ojc56g3", f8 = "_1ojc56g4", d8 = "_1ojc56g5", h8 = "_1ojc56g6", m8 = "_1ojc56g7", p8 = "_1ojc56g8", ec = "_1ojc56g9", g8 = "_1ojc56ga", v8 = "_1ojc56gb", y8 = "_1ojc56gc", b8 = "_1ojc56gd", x8 = "_1ojc56ge", w8 = "_1ojc56gf", _8 = "_1ojc56gg", S8 = "_1ojc56gh", E8 = "_51y2ql0", N8 = "_51y2ql1", C8 = "_51y2ql2", R8 = "_51y2ql3", T8 = "_51y2ql4", Uh = "_51y2ql5", M8 = "_51y2ql6", D8 = "_51y2ql7 _51y2ql6", A8 = "_51y2ql8 _51y2ql6", j8 = "_51y2ql9", O8 = "_51y2qla", z8 = "_51y2qlb", L8 = "_51y2qlc", k8 = "_51y2qld", H8 = "_51y2qle";
const bn = 60, la = 62, xn = 46, B8 = 180, Xo = 75, dc = 45, U8 = [0, 0.25, 0.5, 0.75, 1];
function V8(e) {
  const a = Math.PI * (1 - e), i = Math.cos(a), l = Math.sin(a);
  return {
    x1: bn + i * (xn - 9),
    y1: la - l * (xn - 9),
    x2: bn + i * (xn - 14),
    y2: la - l * (xn - 14)
  };
}
function $8(e) {
  const a = Xo - dc, i = (Xo - e) / a;
  return Math.min(1, Math.max(0.02, i));
}
function q8(e) {
  return e >= 0.55 ? M8 : e >= 0.25 ? D8 : A8;
}
function I8({ secondsPerStep: e }) {
  const a = e !== null && e > 0, i = a ? $8(e) : 0, l = B8 * i, s = a ? e.toFixed(1) : "—", u = a ? 1 / e : null, c = u === null ? "—" : u >= 1 ? u.toFixed(2) : u.toFixed(3);
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: E8,
      role: "meter",
      "aria-label": "render speed",
      "aria-valuemin": dc,
      "aria-valuemax": Xo,
      "aria-valuenow": a ? Number(e.toFixed(1)) : void 0,
      "aria-valuetext": a ? `${s} seconds per step` : "no data yet",
      children: [
        /* @__PURE__ */ v.jsx("span", { className: N8, children: "Speed" }),
        /* @__PURE__ */ v.jsxs("svg", { className: C8, viewBox: "0 0 120 78", "aria-hidden": "true", children: [
          /* @__PURE__ */ v.jsx("title", { children: "speedometer" }),
          /* @__PURE__ */ v.jsx(
            "path",
            {
              className: R8,
              d: `M ${bn - xn} ${la} A ${xn} ${xn} 0 0 1 ${bn + xn} ${la}`,
              strokeWidth: 8,
              pathLength: 100
            }
          ),
          U8.map((d) => {
            const p = V8(d);
            return /* @__PURE__ */ v.jsx(
              "line",
              {
                className: T8,
                strokeWidth: 1.4,
                x1: p.x1,
                y1: p.y1,
                x2: p.x2,
                y2: p.y2
              },
              d
            );
          }),
          /* @__PURE__ */ v.jsx("text", { className: Uh, x: bn - xn, y: la + 12, fontSize: 6, textAnchor: "middle", children: Xo }),
          /* @__PURE__ */ v.jsx("text", { className: Uh, x: bn, y: 9, fontSize: 6, textAnchor: "middle", children: (Xo + dc) / 2 }),
          /* @__PURE__ */ v.jsx("text", { className: Uh, x: bn + xn, y: la + 12, fontSize: 6, textAnchor: "middle", children: dc }),
          a && /* @__PURE__ */ v.jsx(
            "path",
            {
              className: q8(i),
              d: `M ${bn - xn} ${la} A ${xn} ${xn} 0 0 1 ${bn + xn} ${la}`,
              strokeWidth: 8,
              pathLength: 100,
              strokeDasharray: `${Math.max(1.5, i * 100)} 100`
            }
          ),
          /* @__PURE__ */ v.jsx(
            "g",
            {
              className: j8,
              style: {
                transform: `rotate(${a ? l : 0}deg)`,
                transformOrigin: `${bn}px ${la}px`
              },
              children: /* @__PURE__ */ v.jsx(
                "line",
                {
                  className: O8,
                  strokeWidth: 2.4,
                  x1: bn,
                  y1: la,
                  x2: bn - xn + 16,
                  y2: la
                }
              )
            }
          ),
          /* @__PURE__ */ v.jsx("circle", { className: z8, cx: bn, cy: la, r: 3.6 }),
          /* @__PURE__ */ v.jsx("text", { className: L8, x: bn, y: 44, fontSize: 15, textAnchor: "middle", children: s }),
          /* @__PURE__ */ v.jsx("text", { className: k8, x: bn, y: 55, fontSize: 7.5, textAnchor: "middle", children: "s/it" })
        ] }),
        /* @__PURE__ */ v.jsxs("span", { className: H8, children: [
          c,
          " it/s"
        ] })
      ]
    }
  );
}
function Y8({ state: e, onCancel: a, onReset: i }) {
  const [l, s] = S.useState(!1);
  S.useEffect(() => {
    e.phase !== "running" && s(!1);
  }, [e.phase]);
  const u = S.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (e.phase === "idle")
    return /* @__PURE__ */ v.jsx(
      Rc,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (e.phase === "error") {
    const m = o8(e.errorCode, e.errorMessage);
    return /* @__PURE__ */ v.jsxs("div", { className: Ju, children: [
      /* @__PURE__ */ v.jsxs("div", { className: w8, role: "alert", children: [
        /* @__PURE__ */ v.jsx("span", { className: _8, children: m.title }),
        /* @__PURE__ */ v.jsx("span", { className: S8, children: m.hint })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: ec, children: /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: i, children: "Dismiss" }) })
    ] });
  }
  if (e.phase === "cancelled")
    return /* @__PURE__ */ v.jsxs("div", { className: Ju, children: [
      /* @__PURE__ */ v.jsx(Rc, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ v.jsx("div", { className: ec, children: /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: i, children: "Reset" }) })
    ] });
  const c = e.renderReport?.fps, d = typeof c == "number" ? c : void 0;
  if (e.phase === "done")
    return /* @__PURE__ */ v.jsxs("output", { className: Ju, children: [
      /* @__PURE__ */ v.jsx(
        l8,
        {
          src: u5(e.outputPath),
          fpsLabel: d ? `${d} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ v.jsx(Q8, { state: e }),
      /* @__PURE__ */ v.jsx("div", { className: ec, children: /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: i, children: "New render" }) })
    ] });
  const p = Math.round(e.overallFraction * 100);
  return /* @__PURE__ */ v.jsxs("div", { className: Ju, children: [
    /* @__PURE__ */ v.jsx("output", { className: s8, "aria-live": "polite", children: X8(e) }),
    /* @__PURE__ */ v.jsx(
      "div",
      {
        className: m8,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": p,
        children: /* @__PURE__ */ v.jsx(
          "div",
          {
            className: p8,
            style: { transform: `scaleX(${Math.max(0.02, e.overallFraction)})` }
          }
        )
      }
    ),
    e.stalled && /* @__PURE__ */ v.jsx("output", { className: x8, children: "Still working… no progress for a while — the connection may be lost. The render may still be running; check History if it does not resume." }),
    /* @__PURE__ */ v.jsxs("div", { className: u8, "aria-live": "polite", children: [
      /* @__PURE__ */ v.jsx(I8, { secondsPerStep: e.secondsPerStep }),
      /* @__PURE__ */ v.jsxs("div", { className: c8, children: [
        /* @__PURE__ */ v.jsx(Uo, { label: "Overall", value: `${p}%` }),
        /* @__PURE__ */ v.jsx(
          Uo,
          {
            label: "Clip",
            value: e.numClips ? `${e.clipIndex + 1} / ${e.numClips}` : "—"
          }
        ),
        /* @__PURE__ */ v.jsx(
          Uo,
          {
            label: "Step",
            value: e.totalSteps ? `${e.step} / ${e.totalSteps}` : "—"
          }
        ),
        /* @__PURE__ */ v.jsx(Uo, { label: "ETA", value: G8(b3(e)) }),
        /* @__PURE__ */ v.jsx(
          Uo,
          {
            label: "VRAM peak",
            value: e.vramPeakGib !== null ? `${e.vramPeakGib.toFixed(1)} GiB` : "—"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: ec, children: /* @__PURE__ */ v.jsx(ua, { variant: "danger", onClick: u, loading: l, disabled: l, children: l ? "Cancelling…" : "Cancel render" }) })
  ] });
}
function G8(e) {
  if (e === null) return "—";
  const a = Math.max(0, Math.round(e)), i = Math.floor(a / 3600), l = Math.floor(a % 3600 / 60), s = a % 60;
  return i > 0 ? `${i}h ${String(l).padStart(2, "0")}m` : l > 0 ? `${l}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}
const F8 = {
  loading_text_encoder: "Loading text encoder (UMT5-xxl)…",
  encoding_prompts: "Encoding prompts…",
  encoding_anchors: "Encoding anchor keyframes…",
  loading_experts: "Loading diffusion experts…",
  denoising: "Denoising",
  stitching: "Assembling frames (overlap trim)…",
  upscaling: "RTX upscaling (Maxine VSR)…",
  interpolating: "Interpolating to target fps (RIFE)…"
};
function X8(e) {
  if (!e.stage) return "Starting worker…";
  if (e.stage === "loading_experts" && e.stageDetail) return e.stageDetail;
  const a = F8[e.stage] ?? e.stage;
  return e.stage === "denoising" && e.numClips > 0 ? `${a} — clip ${e.clipIndex + 1} of ${e.numClips}` : a;
}
function P8(e) {
  const a = e.base_model_high, i = e.base_model_low;
  if (typeof a != "string") return null;
  const l = e.base_model_override === !0, s = l ? "custom" : "bundled", u = Dx(a);
  if (typeof i == "string" && i !== a)
    return `${u} + ${Dx(i)} (${s})`;
  const c = e.svi_lora_tier, d = l && typeof c == "string" ? `, SVI ${c}` : "";
  return `${u} (${s}${d})`;
}
function Z8(e) {
  const a = e.torch_compile;
  if (!a || typeof a != "object") return null;
  const i = a;
  if (i.requested !== !0) return null;
  if (i.blocked_by_block_swap === !0) return "skipped — block-swap on";
  if (typeof i.error == "string") return "failed → eager";
  if (i.engaged !== !0) return "not engaged";
  const l = typeof i.mode == "string" ? i.mode : "default", s = i.dynamo ?? {}, u = typeof s.unique_graphs == "number" ? s.unique_graphs : null, c = typeof s.calls_captured == "number" ? s.calls_captured : null, d = typeof s.graph_breaks == "number" ? s.graph_breaks : null;
  if (u !== null && c !== null) {
    const p = d ? `, ${d} breaks` : "";
    return `${l} — ${u} graphs / ${c} calls${p}`;
  }
  return `${l} — engaged`;
}
function Dx(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
function Uo({ label: e, value: a }) {
  return /* @__PURE__ */ v.jsxs("div", { className: f8, children: [
    /* @__PURE__ */ v.jsx("span", { className: d8, children: e }),
    /* @__PURE__ */ v.jsx("span", { className: h8, children: a })
  ] });
}
function Q8({ state: e }) {
  const a = e.renderReport;
  if (!a) return null;
  const i = [], l = P8(a);
  l && i.push(["Base model", l]);
  const s = Z8(a);
  return s && i.push(["torch.compile", s]), typeof a.frames == "number" && i.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && i.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), e.vramPeakGib !== null && i.push(["VRAM peak", `${e.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && i.push(["sha256", `${a.sha256.slice(0, 16)}…`]), e.outputPath && i.push(["Output", e.outputPath]), i.length === 0 ? null : /* @__PURE__ */ v.jsx("div", { className: g8, children: i.map(([u, c]) => /* @__PURE__ */ v.jsxs("div", { className: v8, children: [
    /* @__PURE__ */ v.jsx("span", { className: y8, children: u }),
    /* @__PURE__ */ v.jsx("span", { className: b8, children: c })
  ] }, u)) });
}
const ym = 16, zi = 128, Tc = 1920, K8 = 832 * 480, W8 = { width: 848, height: 480 }, V_ = [
  { id: "16:9", label: "16:9", w: 16, h: 9 },
  { id: "3:2", label: "3:2", w: 3, h: 2 },
  { id: "4:3", label: "4:3", w: 4, h: 3 },
  { id: "1:1", label: "1:1", w: 1, h: 1 },
  { id: "3:4", label: "3:4", w: 3, h: 4 },
  { id: "9:16", label: "9:16", w: 9, h: 16 }
];
function $_(e, a, i) {
  return Math.min(i, Math.max(a, e));
}
function ss(e) {
  if (!Number.isFinite(e)) return zi;
  const a = Math.round(e / ym) * ym;
  return $_(a, zi, Tc);
}
function Ax(e, a) {
  const i = ss(e);
  return $_(i + a * ym, zi, Tc);
}
function Mc(e, a) {
  return { width: ss(e), height: ss(a) };
}
function J8(e) {
  return { width: e.height, height: e.width };
}
function q_(e) {
  return e.width * e.height;
}
function I_(e) {
  return e.height === 0 ? 0 : e.width / e.height;
}
function ek(e, a, i) {
  if (e <= 0 || a <= 0 || i <= 0)
    return Mc(zi, zi);
  const l = e / a, s = Math.sqrt(i * l), u = i / s;
  return Mc(s, u);
}
function Y_(e) {
  const a = I_(e);
  if (a <= 0) return null;
  let i = null;
  for (const l of V_) {
    const s = Math.abs(a - l.w / l.h);
    s < 0.06 && (i === null || s < i.delta) && (i = { id: l.id, delta: s });
  }
  return i?.id ?? null;
}
function tk(e) {
  return e.width === e.height ? "square" : e.width > e.height ? "landscape" : "portrait";
}
function G_(e, a) {
  return a === 0 ? e : G_(a, e % a);
}
function nk(e) {
  const a = Y_(e);
  if (a) return a;
  const i = G_(e.width, e.height) || 1, l = e.width / i, s = e.height / i;
  return l <= 64 && s <= 64 ? `${l}:${s}` : `${I_(e).toFixed(2)}:1`;
}
function ak(e) {
  const a = q_(e);
  return {
    megapixels: (a / 1e6).toFixed(2),
    aspect: nk(e),
    orientation: tk(e),
    budgetPct: Math.round(a / K8 * 100)
  };
}
function rk() {
  return /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "swap" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M6.5 3.5L3.5 6.5l3 3M3.5 6.5h9M13.5 16.5l3-3-3-3M16.5 13.5h-9",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function jx({
  id: e,
  label: a,
  value: i,
  draft: l,
  onDraft: s,
  onCommit: u,
  onStep: c
}) {
  return /* @__PURE__ */ v.jsxs("div", { className: $z, children: [
    /* @__PURE__ */ v.jsx("label", { className: B_, htmlFor: e, children: a }),
    /* @__PURE__ */ v.jsxs("div", { className: qz, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: Nx,
          "aria-label": `Decrease ${a} by 16`,
          disabled: i <= zi,
          onClick: () => c(-1),
          children: "−"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          id: e,
          type: "number",
          inputMode: "numeric",
          className: Iz,
          "aria-label": a,
          min: zi,
          max: Tc,
          step: 16,
          value: l,
          onChange: (d) => s(d.target.value),
          onBlur: (d) => u(Number(d.target.value)),
          onKeyDown: (d) => {
            d.key === "Enter" && u(Number(d.target.value));
          }
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: Nx,
          "aria-label": `Increase ${a} by 16`,
          disabled: i >= Tc,
          onClick: () => c(1),
          children: "+"
        }
      )
    ] })
  ] });
}
function ik({
  width: e,
  height: a,
  onChange: i
}) {
  const [l, s] = S.useState(() => String(e)), [u, c] = S.useState(() => String(a));
  S.useEffect(() => {
    s(String(e));
  }, [e]), S.useEffect(() => {
    c(String(a));
  }, [a]);
  const d = { width: e, height: a }, p = ak(d), m = Y_(d), y = (N) => {
    const R = ss(N);
    s(String(R)), R !== e && i({ width: R, height: a });
  }, g = (N) => {
    const R = ss(N);
    c(String(R)), R !== a && i({ width: e, height: R });
  }, b = (N) => {
    i({ width: Ax(e, N), height: a });
  }, x = (N) => {
    i({ width: e, height: Ax(a, N) });
  }, _ = () => i(J8(d)), E = (N, R) => {
    i(ek(N, R, q_(d)));
  };
  return /* @__PURE__ */ v.jsxs("div", { className: Uz, children: [
    /* @__PURE__ */ v.jsxs("div", { className: Vz, children: [
      /* @__PURE__ */ v.jsx(
        jx,
        {
          id: "svi2-custom-width",
          label: "Width",
          value: e,
          draft: l,
          onDraft: s,
          onCommit: y,
          onStep: b
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: Yz, "aria-hidden": "true", children: "×" }),
      /* @__PURE__ */ v.jsx(
        jx,
        {
          id: "svi2-custom-height",
          label: "Height",
          value: a,
          draft: u,
          onDraft: c,
          onCommit: g,
          onStep: x
        }
      ),
      /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          className: Gz,
          onClick: _,
          title: "Reverse the aspect ratio — swap width and height at the same pixel count",
          children: [
            /* @__PURE__ */ v.jsx("span", { className: Fz, children: /* @__PURE__ */ v.jsx(rk, {}) }),
            "Swap"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: Xz, children: [
      /* @__PURE__ */ v.jsx("span", { className: B_, children: "Aspect ratio · same pixel budget" }),
      /* @__PURE__ */ v.jsx(
        "div",
        {
          className: Pz,
          role: "group",
          "aria-label": "Aspect ratio presets",
          children: V_.map((N) => {
            const R = m === N.id, j = [Zz, R ? Qz : ""].filter(Boolean).join(" ");
            return /* @__PURE__ */ v.jsx(
              "button",
              {
                type: "button",
                className: j,
                "aria-pressed": R,
                onClick: () => E(N.w, N.h),
                children: N.label
              },
              N.id
            );
          })
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("output", { className: Kz, "aria-live": "polite", children: [
      Mc(e, a).width,
      "×",
      Mc(e, a).height,
      /* @__PURE__ */ v.jsx("span", { className: Lh, children: "·" }),
      p.megapixels,
      " MP",
      /* @__PURE__ */ v.jsx("span", { className: Lh, children: "·" }),
      p.aspect,
      " ",
      p.orientation,
      /* @__PURE__ */ v.jsx("span", { className: Lh, children: "·" }),
      p.budgetPct,
      "% of 480p budget"
    ] })
  ] });
}
function Ox() {
  return /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "selected" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ v.jsx(
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
function lk({ presets: e }) {
  const { params: a, updateParam: i } = Qt(), l = S.useMemo(() => mp(e), [e]), [s, u] = S.useState(!1);
  if (l.length === 0) return null;
  const c = pp(a, l), d = c === os || s, p = a.width ?? 832, m = a.height ?? 480, y = (g) => {
    i("width", g.width), i("height", g.height);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: "svi2-resolution-label", children: "Generation resolution" }),
    /* @__PURE__ */ v.jsxs("div", { className: Oz, role: "radiogroup", "aria-labelledby": "svi2-resolution-label", children: [
      l.map((g) => {
        const b = !d && c === g.id, x = [yx, b ? bx : ""].filter(Boolean).join(" "), _ = [_x, b ? Sx : ""].filter(Boolean).join(" ");
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": b,
            className: x,
            onClick: () => {
              u(!1), i("width", g.width), i("height", g.height);
            },
            children: [
              /* @__PURE__ */ v.jsxs("span", { className: xx, children: [
                /* @__PURE__ */ v.jsxs("span", { className: wx, children: [
                  g.width,
                  "×",
                  g.height
                ] }),
                /* @__PURE__ */ v.jsx("span", { className: _, children: /* @__PURE__ */ v.jsx(Ox, {}) })
              ] }),
              /* @__PURE__ */ v.jsx("span", { className: Ex, children: g.label }),
              /* @__PURE__ */ v.jsx("span", { className: zz, children: g.sub }),
              g.stepsDown > 0 && /* @__PURE__ */ v.jsx(
                "span",
                {
                  className: g.stepsDown >= 2 ? kz : Lz,
                  children: g.stepsDown >= 2 ? "off-distribution" : "below native"
                }
              )
            ]
          },
          g.id
        );
      }),
      /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": d,
          className: [yx, Hz, d ? bx : ""].filter(Boolean).join(" "),
          onClick: () => {
            u(!0), c !== os && y(W8);
          },
          children: [
            /* @__PURE__ */ v.jsxs("span", { className: xx, children: [
              /* @__PURE__ */ v.jsx("span", { className: wx, children: "Custom" }),
              /* @__PURE__ */ v.jsx(
                "span",
                {
                  className: [_x, d ? Sx : ""].join(" "),
                  children: /* @__PURE__ */ v.jsx(Ox, {})
                }
              )
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: Ex, children: "Any aspect & budget" }),
            /* @__PURE__ */ v.jsx("span", { className: Bz, children: "9:16 portrait, square, or a custom Wan2.2 canvas" })
          ]
        }
      )
    ] }),
    d && /* @__PURE__ */ v.jsx(ik, { width: p, height: m, onChange: y })
  ] });
}
var ok = "_1x63kpu0";
const sk = "Random each render";
function uk(e) {
  const a = e.trim();
  if (a.length === 0) return;
  const i = Number(a);
  if (!(!Number.isFinite(i) || i < 0))
    return Math.trunc(i);
}
function ck() {
  const { params: e, updateParam: a } = Qt(), i = S.useId(), l = e.seed, s = (u) => {
    a("seed", uk(u.target.value));
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: i, children: "Seed" }),
    /* @__PURE__ */ v.jsxs("div", { className: Kc, children: [
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "number",
          inputMode: "numeric",
          className: ok,
          "aria-labelledby": i,
          min: 0,
          step: 1,
          placeholder: sk,
          value: l ?? "",
          onChange: s
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Fixes the synthesized seed frame for reproducible takes. Leave blank to randomize." })
    ] })
  ] });
}
function fk({
  spec: e,
  value: a,
  error: i,
  onChange: l,
  disabled: s = !1,
  disabledReason: u
}) {
  const c = S.useId(), d = `${c}-help`, p = i ? `${c}-error` : d;
  return /* @__PURE__ */ v.jsxs("div", { className: tz, title: s ? u : void 0, children: [
    /* @__PURE__ */ v.jsxs("div", { className: nz, children: [
      /* @__PURE__ */ v.jsx("label", { className: az, htmlFor: c, children: e.label }),
      e.control === "slider" && /* @__PURE__ */ v.jsx("span", { className: rz, children: hk(a, e.step) })
    ] }),
    dk(e, a, l, c, p, i !== void 0, s),
    /* @__PURE__ */ v.jsx("span", { id: d, className: j_, children: s && u ? u : e.help }),
    i && /* @__PURE__ */ v.jsx("span", { id: `${c}-error`, role: "alert", className: iz, children: i })
  ] });
}
function dk(e, a, i, l, s, u, c) {
  switch (e.control) {
    case "toggle": {
      const d = !!a;
      return /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
        /* @__PURE__ */ v.jsx(
          "button",
          {
            type: "button",
            id: l,
            role: "switch",
            "aria-checked": d,
            "aria-describedby": s,
            disabled: c,
            className: Hl,
            onClick: () => i(!d),
            children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ v.jsx("span", { className: j_, children: d ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ v.jsx(
        "select",
        {
          id: l,
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [oz, u ? vx : ""].filter(Boolean).join(" "),
          value: String(a ?? e.default ?? ""),
          onChange: (d) => i(e.numeric ? Number(d.target.value) : d.target.value),
          children: e.options?.map((d) => /* @__PURE__ */ v.jsx("option", { value: d.value, children: d.label }, d.value))
        }
      );
    case "slider": {
      const d = zx(a, e), p = e.min ?? 0, m = e.max ?? 100, g = { "--svi2-slider-fill": `${m > p ? (d - p) / (m - p) * 100 : 0}%` };
      return /* @__PURE__ */ v.jsx(
        "input",
        {
          id: l,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: O_,
          style: g,
          min: e.min,
          max: e.max,
          step: e.step,
          value: d,
          onChange: (b) => i(Number(b.target.value))
        }
      );
    }
    default:
      return /* @__PURE__ */ v.jsx(
        "input",
        {
          id: l,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [lz, u ? vx : ""].filter(Boolean).join(" "),
          min: e.min,
          max: e.max,
          step: e.step,
          value: zx(a, e),
          onChange: (d) => i(Number(d.target.value))
        }
      );
  }
}
function zx(e, a) {
  return typeof e == "number" && Number.isFinite(e) ? e : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function hk(e, a) {
  return typeof e != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(e) ? String(e) : e.toFixed(2) : e.toFixed(a >= 0.1 ? 1 : 2);
}
var mk = "_1f0q5gf0", pk = "_1f0q5gf1", gk = "_1f0q5gf2", vk = "_1f0q5gf3", yk = "_1f0q5gf4", bk = "_1f0q5gf5", xk = "_1f0q5gf6", wk = "_1f0q5gf7", _k = "_1f0q5gf8", Sk = "_1f0q5gf9", Ek = "_1f0q5gfa", Nk = "_1f0q5gfb", Ck = "_1f0q5gfc";
function Rk({
  title: e,
  description: a,
  badge: i,
  summary: l,
  defaultCollapsed: s = !1,
  collapsible: u = !0,
  className: c,
  children: d
}) {
  const p = S.useId(), [m, y] = S.useState(u ? s : !1), g = [mk, c].filter(Boolean).join(" "), b = [gk, m ? vk : ""].filter(Boolean).join(" "), x = !u || !m;
  return /* @__PURE__ */ v.jsxs("section", { className: g, children: [
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        type: "button",
        className: pk,
        "aria-expanded": x,
        "aria-controls": p,
        disabled: !u,
        onClick: () => u && y((_) => !_),
        children: [
          u && /* @__PURE__ */ v.jsx("span", { className: b, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ v.jsx("title", { children: "toggle" }),
            /* @__PURE__ */ v.jsx(
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
          /* @__PURE__ */ v.jsxs("span", { className: yk, children: [
            /* @__PURE__ */ v.jsx("span", { className: bk, children: e }),
            a && /* @__PURE__ */ v.jsx("span", { className: xk, children: a })
          ] }),
          (l || i) && /* @__PURE__ */ v.jsxs("span", { className: wk, children: [
            l && /* @__PURE__ */ v.jsx("span", { className: _k, children: l }),
            i
          ] })
        ]
      }
    ),
    /* @__PURE__ */ v.jsx(
      "div",
      {
        id: p,
        className: [Sk, x ? Ek : ""].filter(Boolean).join(" "),
        inert: !x || void 0,
        children: /* @__PURE__ */ v.jsx("div", { className: Nk, children: /* @__PURE__ */ v.jsx("div", { className: Ck, children: d }) })
      }
    )
  ] });
}
const Tk = {
  rife: "RIFE (auto)",
  rife_torch: "RIFE torch",
  rife_ncnn: "RIFE ncnn",
  ffmpeg: "ffmpeg"
};
function Lx(e) {
  return (Math.round(e * 10) / 10).toFixed(1);
}
function Mk(e) {
  return Zc.find((a) => a.key === e)?.default;
}
function gl(e, a) {
  const i = e[a];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  const l = Mk(a);
  return typeof l == "number" ? l : 0;
}
function Dk(e, a) {
  if (e === "core") {
    const i = gl(a, "fps"), l = gl(a, "interpolate_fps"), s = l > 0 ? l : i, u = typeof a.interpolate_method == "string" ? a.interpolate_method : "rife", c = Tk[u] ?? u, d = gl(a, "upscale_factor"), p = `${i} → ${s} fps · ${c}`;
    return d > 0 ? `${p} · ${d}× VSR` : p;
  }
  if (e === "quality") {
    const i = gl(a, "num_inference_steps"), l = gl(a, "cfg_scale"), s = gl(a, "sigma_shift");
    return `${i} steps · CFG ${Lx(l)} · shift ${Lx(s)}`;
  }
  return null;
}
async function Ak() {
  return xr("/capabilities/attention");
}
const kx = Object.fromEntries(
  Lm.map((e) => [e.value, e.label])
);
function jk() {
  const { params: e, settings: a, updateParam: i, setSettings: l } = Qt(), s = ls("svi2/attention-capabilities", Ak, {
    shouldRetryOnError: !1
  }), u = e.attention ?? a.attentionBackend ?? "flash2", c = S.useCallback(
    (b) => {
      i("attention", b);
      const x = { ...a, attentionBackend: b };
      l(x), pc(x).catch(() => {
      });
    },
    [a, i, l]
  ), d = s.data, p = d === void 0, m = s.error !== void 0, y = d?.backends.find((b) => b.id === u), g = y !== void 0 && !y.supported;
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-attention", children: "Attention mechanism" }),
    /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
      /* @__PURE__ */ v.jsxs(
        "select",
        {
          id: "svi2-attention",
          className: Ri,
          value: u,
          onChange: (b) => c(b.target.value),
          children: [
            /* @__PURE__ */ v.jsx("option", { value: "auto", children: kx.auto }),
            d ? d.backends.map((b) => /* @__PURE__ */ v.jsx(
              "option",
              {
                value: b.id,
                disabled: !b.supported,
                title: b.reason ?? void 0,
                children: kx[b.id] ?? b.id
              },
              b.id
            )) : Lm.filter((b) => b.value !== "auto").map((b) => /* @__PURE__ */ v.jsx("option", { value: b.value, children: b.label }, b.value))
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: xs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ v.jsx("title", { children: "open" }),
        /* @__PURE__ */ v.jsx(
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
    m && /* @__PURE__ */ v.jsx("span", { className: cn, children: "GPU capabilities unavailable — all options shown." }),
    g && /* @__PURE__ */ v.jsxs("span", { className: cn, children: [
      y.reason ?? "This backend is not supported on the current GPU",
      " — will fall back to flash2 at render time."
    ] }),
    !p && u === "sage3_fp4" && !g && /* @__PURE__ */ v.jsx("span", { className: cn, children: "FP4 — may show artifacts on some GPUs." })
  ] });
}
function Ok() {
  const { params: e, updateParam: a } = Qt(), i = (e.blocks_to_swap ?? 0) > 0, l = !i && (e.use_torch_compile ?? !1), s = e.torch_compile_mode ?? "default";
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-torch-compile", children: "torch.compile (experimental)" }),
    /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          id: "svi2-torch-compile",
          role: "switch",
          "aria-checked": l,
          disabled: i,
          className: Hl,
          onClick: () => a("use_torch_compile", !l),
          children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: l ? "On" : "Off" })
    ] }),
    l && /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
      /* @__PURE__ */ v.jsx(
        "select",
        {
          "aria-label": "torch.compile mode",
          className: Ri,
          value: s,
          onChange: (u) => a("torch_compile_mode", u.target.value),
          children: zC.map((u) => /* @__PURE__ */ v.jsx("option", { value: u.value, children: u.label }, u.value))
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: xs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ v.jsx("title", { children: "open" }),
        /* @__PURE__ */ v.jsx(
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
    /* @__PURE__ */ v.jsx("span", { className: cn, children: i ? "Set Blocks to swap = 0 to enable — compile needs both experts VRAM-resident (no offload)." : "Compiles the DiT for faster steps; CUDA graphs via reduce-overhead. Falls back to eager if the backend is unavailable. Render report shows whether it engaged." })
  ] });
}
const gp = "off", zk = [
  { value: "off", label: "Off (native resolution)" },
  { value: "auto", label: "Auto (best available)" },
  { value: "maxine", label: "Maxine VSR — RTX (Windows only)" },
  { value: "drct-l-hq", label: "DRCT-L HQ (best, slow)" },
  { value: "drct-l-real", label: "DRCT-L Real (degraded sources)" },
  { value: "hat-l", label: "HAT-L (transformer)" },
  { value: "swinir-l", label: "SwinIR-L (real-world)" },
  { value: "realesrgan", label: "Real-ESRGAN (fast)" }
], Lk = [
  { value: 2, label: "2×" },
  { value: 3, label: "3×" },
  { value: 4, label: "4×" }
], kk = [
  { value: "LOW", label: "Low (fastest)" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "ULTRA", label: "Ultra (best)" },
  { value: "HIGHBITRATE_HIGH", label: "High-bitrate High" },
  { value: "HIGHBITRATE_ULTRA", label: "High-bitrate Ultra" }
], Hk = 2;
function Bk(e) {
  return e === "maxine" || e === "auto";
}
function Uk(e, a) {
  return !e || e <= 0 ? gp : a ?? "auto";
}
function Vk(e, a) {
  return e === gp ? { upscale_factor: 0 } : { upscale_factor: a && a > 0 ? a : Hk, upscale_model: e };
}
function Vh() {
  return /* @__PURE__ */ v.jsx("span", { className: xs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "open" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M4 6l4 4 4-4",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) });
}
function $k() {
  const { params: e, updateParam: a } = Qt(), i = Uk(e.upscale_factor, e.upscale_model), l = i === gp, s = Bk(i), u = S.useCallback(
    (c) => {
      const d = Vk(c, e.upscale_factor);
      a("upscale_factor", d.upscale_factor), d.upscale_model !== void 0 && a("upscale_model", d.upscale_model);
    },
    [e.upscale_factor, a]
  );
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-upscale-engine", children: "Upscaler" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-upscale-engine",
            className: Ri,
            value: i,
            onChange: (c) => u(c.target.value),
            children: zk.map((c) => /* @__PURE__ */ v.jsx("option", { value: c.value, children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ v.jsx(Vh, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Super-resolution after stitch, before interpolation. Auto = Maxine (RTX/Windows) → DRCT-L → Real-ESRGAN. DRCT-L is the highest-quality transformer (runs on aarch64/GB10)." })
    ] }),
    !l && /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-upscale-scale", children: "Scale" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-upscale-scale",
            className: Ri,
            value: String(e.upscale_factor ?? 2),
            onChange: (c) => a("upscale_factor", Number(c.target.value)),
            children: Lk.map((c) => /* @__PURE__ */ v.jsx("option", { value: String(c.value), children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ v.jsx(Vh, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Output multiplier applied to the rendered resolution." })
    ] }),
    !l && s && /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-upscale-quality", children: "Maxine quality" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-upscale-quality",
            className: Ri,
            value: String(e.upscale_quality ?? "HIGH"),
            onChange: (c) => a("upscale_quality", c.target.value),
            children: kk.map((c) => /* @__PURE__ */ v.jsx("option", { value: c.value, children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ v.jsx(Vh, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Maxine VSR preset (Maxine/Auto on Windows only; ignored by DRCT-L/Real-ESRGAN)." })
    ] })
  ] });
}
var qk = "kn07ek0", Ik = "kn07ek1";
const Yk = {
  num_clips: "Locked to 1 in FLF2V morph — the end keyframe pins the clip, no chaining.",
  frames_per_clip: "Driven by the Length control in FLF2V morph (fps × seconds, snapped to 4n+1)."
};
function Gk({ issues: e }) {
  const { presetId: a, params: i, updateParam: l } = Qt(), s = Qc(a, i), u = (c) => e.find((d) => d.field === c && d.severity === "error")?.message;
  return /* @__PURE__ */ v.jsx("div", { className: qk, children: m_.map((c) => {
    const d = P3(c.id);
    return d.length === 0 ? null : /* @__PURE__ */ v.jsx(
      Rk,
      {
        title: c.title,
        description: c.description,
        defaultCollapsed: c.defaultCollapsed,
        summary: Dk(c.id, i),
        badge: c.defaultCollapsed ? /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ v.jsxs("div", { className: Ik, children: [
          c.id === "perf" && /* @__PURE__ */ v.jsx(jk, {}),
          c.id === "perf" && /* @__PURE__ */ v.jsx(Ok, {}),
          d.map((p) => {
            const m = s ? Yk[p.key] : void 0;
            return /* @__PURE__ */ v.jsx(
              fk,
              {
                spec: p,
                value: i[p.key],
                error: u(p.key),
                disabled: m !== void 0,
                disabledReason: m,
                onChange: (y) => l(p.key, y)
              },
              p.key
            );
          }),
          c.id === "core" && /* @__PURE__ */ v.jsx($k, {})
        ] })
      },
      c.id
    );
  }) });
}
var Fk = "_1w9jfpf0", Xk = "_1w9jfpf1", Pk = "_1w9jfpf2", Zk = "_1w9jfpf3", Qk = "_1w9jfpf4", Kk = "_1w9jfpf5";
const bm = "svi2-anchor-panel", F_ = "svi2-prompt-input";
function Wk() {
  const {
    presetId: e,
    presetApplied: a,
    params: i,
    render: l,
    applyPresetById: s,
    setMode: u,
    resetRender: c,
    showJobResult: d,
    restoreJobIntoForm: p,
    getIsDirty: m
  } = Qt(), { issues: y, blocked: g, busy: b, submit: x, cancel: _, focusRequest: E } = S_(), [N, R] = S.useState(null);
  eH(E);
  const j = ls("svi2/presets", C1), C = ls("svi2/history", () => v5(25)), O = j.data?.presets ?? [];
  S.useEffect(() => {
    if (a || O.length === 0) return;
    const k = O.find((G) => G.id === e) ?? O[0];
    k && s(k, { markDirty: !1 });
  }, [a, O, e, s]);
  const V = C.data?.jobs ?? [], B = i.mode ?? "image_to_video", U = B !== "text_to_video", D = sp(e, i), H = y.find((k) => k.field === "ref_image_path")?.message, J = y.find((k) => k.field === "last_image_path")?.message, I = y.find((k) => k.field === "prompts")?.message, Q = y.find(
    (k) => k.field === "width" && k.severity === "warning"
  )?.message, ae = S.useCallback(
    (k) => {
      if (k.status !== "succeeded") {
        d(k);
        return;
      }
      if (m()) {
        R(k.id);
        return;
      }
      p(k);
    },
    [d, p, m]
  ), L = S.useCallback(() => {
    const k = V.find((G) => G.id === N);
    R(null), k && p(k);
  }, [N, V, p]), Y = S.useCallback(() => R(null), []), [T, z] = S.useState(() => /* @__PURE__ */ new Set()), F = S.useRef(/* @__PURE__ */ new Map()), X = C.mutate;
  S.useEffect(() => {
    const k = F.current;
    return () => {
      k.forEach((G) => clearTimeout(G)), k.clear();
    };
  }, []);
  const ne = S.useCallback(
    (k) => {
      const G = k.id, ee = k.status === "running" || k.status === "queued";
      z((W) => new Set(W).add(G));
      const se = F.current.get(G);
      se && clearTimeout(se);
      const de = (W) => z((ve) => {
        const De = new Set(ve);
        return De.delete(W), De;
      }), he = setTimeout(() => {
        F.current.delete(G), (async () => {
          try {
            ee && await w_(G).catch(() => {
            }), await y5(G), await X(), de(G);
          } catch {
            de(G), ca.error("Couldn't delete that render.");
          }
        })();
      }, 5e3);
      F.current.set(G, he), ca.success("Render removed", {
        action: {
          label: "Undo",
          onClick: () => {
            const W = F.current.get(G);
            W && clearTimeout(W), F.current.delete(G), de(G);
          }
        }
      });
    },
    [X]
  ), A = T.size === 0 ? V : V.filter((k) => !T.has(k.id));
  return /* @__PURE__ */ v.jsxs("div", { className: Fk, children: [
    /* @__PURE__ */ v.jsx(
      UO,
      {
        open: N !== null,
        title: "Load this run into the form?",
        message: "Unsaved changes will be replaced.",
        confirmLabel: "Load run",
        cancelLabel: "Keep editing",
        onConfirm: L,
        onCancel: Y
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: Xk, children: [
      /* @__PURE__ */ v.jsx(
        Va,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ v.jsx(M6, { presets: O, selectedId: e, onSelect: s })
        }
      ),
      /* @__PURE__ */ v.jsxs(
        Va,
        {
          title: "Mode",
          description: "Image-to-Video anchors identity to a reference. Text-to-Video synthesizes the seed from the prompt.",
          children: [
            /* @__PURE__ */ v.jsx(BL, { value: B, onChange: u }),
            B === "text_to_video" && /* @__PURE__ */ v.jsx(ck, {})
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("div", { id: bm, children: /* @__PURE__ */ v.jsx(
        Va,
        {
          title: "Anchor",
          description: "The reference image defines identity for the whole take.",
          children: /* @__PURE__ */ v.jsx(
            ez,
            {
              refImageRequired: U,
              lastImageRequired: D,
              refError: H,
              lastError: J
            }
          )
        }
      ) }),
      /* @__PURE__ */ v.jsx(Va, { title: "Prompt", description: "One prompt for a coherent take, or per-clip when needed.", children: /* @__PURE__ */ v.jsx(V6, { error: I, textareaId: F_ }) }),
      /* @__PURE__ */ v.jsx(Va, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ v.jsx(Z6, {}) }),
      /* @__PURE__ */ v.jsxs(
        Va,
        {
          title: /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
            /* @__PURE__ */ v.jsx("span", { className: Qk, children: "Inference · Parameters" }),
            "Parameters"
          ] }),
          description: "Grouped by tier. Advanced tiers stay collapsed.",
          actions: /* @__PURE__ */ v.jsx(
            ua,
            {
              variant: "secondary",
              size: "sm",
              title: "Re-apply the active preset's defaults",
              onClick: () => {
                const k = O.find((G) => G.id === e);
                k && s(k);
              },
              children: "Reset to defaults"
            }
          ),
          children: [
            /* @__PURE__ */ v.jsx(jL, { presets: O, warningText: Q }),
            /* @__PURE__ */ v.jsxs("div", { className: Kk, children: [
              /* @__PURE__ */ v.jsx(a6, {}),
              /* @__PURE__ */ v.jsx(lk, { presets: O }),
              /* @__PURE__ */ v.jsx(tL, {}),
              /* @__PURE__ */ v.jsx(hL, {})
            ] }),
            /* @__PURE__ */ v.jsx(Gk, { issues: y }),
            /* @__PURE__ */ v.jsx(h6, { presets: O })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: Pk, children: [
      /* @__PURE__ */ v.jsxs(
        Va,
        {
          title: "Render",
          description: b ? "Render in progress." : "Live progress and output.",
          children: [
            /* @__PURE__ */ v.jsx(Y8, { state: l, onCancel: _, onReset: c }),
            !b && /* @__PURE__ */ v.jsx("div", { className: Zk, children: /* @__PURE__ */ v.jsx(
              ua,
              {
                variant: "primary",
                disabled: g,
                title: g ? "Fix the highlighted fields before rendering" : void 0,
                onClick: () => void x(),
                children: "Render"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ v.jsx(Va, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ v.jsx(JL, { jobs: A, onOpen: ae, onDelete: ne }) })
    ] })
  ] });
}
const Jk = {
  ref_image_path: bm,
  last_image_path: bm,
  prompts: F_
};
function eH(e) {
  S.useEffect(() => {
    if (!e || typeof document > "u") return;
    const a = Jk[e.field];
    if (a) {
      const l = document.getElementById(a);
      Hx(l);
      return;
    }
    tH(e.field);
    const i = window.requestAnimationFrame(() => {
      const l = document.querySelector('[aria-invalid="true"]');
      Hx(l);
    });
    return () => window.cancelAnimationFrame(i);
  }, [e]);
}
function tH(e) {
  const a = Zc.find((s) => s.key === e);
  if (!a) return;
  const i = m_.find((s) => s.id === a.tier);
  if (!i) return;
  const l = document.querySelectorAll(
    'button[aria-expanded="false"][aria-controls]'
  );
  for (const s of l)
    if (s.textContent?.includes(i.title)) {
      s.click();
      return;
    }
}
function Hx(e) {
  if (!e) return;
  const a = e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" ? e : e.querySelector("input, textarea, select, button");
  e.scrollIntoView({ behavior: "smooth", block: "center" }), a?.focus({ preventScroll: !0 });
}
var nH = "_1smvon90", hr = "_1smvon91", mr = "_1smvon92", wa = "_1smvon93", tc = "_1smvon94", $h = "_1smvon95 _1smvon94", aH = "_1smvon96", rH = "_1smvon97";
const iH = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function lH() {
  const { settings: e, setSettings: a } = Qt(), [i, l] = S.useState(e), [s, u] = S.useState(!1), c = S.useMemo(
    () => Object.keys(i).some(
      (m) => i[m] !== e[m]
    ),
    [i, e]
  ), d = (m, y) => {
    l((g) => ({ ...g, [m]: y }));
  }, p = async () => {
    u(!0);
    try {
      const m = await pc(i);
      a(m), l(m), ca.success("Settings saved. Applied to new renders.");
    } catch {
      ca.error("Could not save settings.");
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ v.jsxs(
    Va,
    {
      title: "Defaults",
      description: "Applied as the starting values for new renders. Environment levers tune the backend.",
      children: [
        /* @__PURE__ */ v.jsxs("div", { className: nH, children: [
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Models directory" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: tc,
                value: i.modelsDir,
                placeholder: "Resolved under the host data dir",
                onChange: (m) => d("modelsDir", m.target.value)
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "Weights root. Leave empty to use the host data dir." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Output directory" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: tc,
                value: i.outputDir,
                placeholder: "Default workspace output",
                onChange: (m) => d("outputDir", m.target.value)
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "Where rendered mp4s are written." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Attention backend (SVI2_ATTENTION)" }),
            /* @__PURE__ */ v.jsx(
              "select",
              {
                className: $h,
                value: i.attentionBackend,
                onChange: (m) => d("attentionBackend", m.target.value),
                children: Lm.map((m) => /* @__PURE__ */ v.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ v.jsx(
              "select",
              {
                className: $h,
                value: i.fp8Compute,
                onChange: (m) => d("fp8Compute", m.target.value),
                children: jC.map((m) => /* @__PURE__ */ v.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Blocks to swap" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: tc,
                type: "number",
                min: 0,
                max: 40,
                value: i.blocksToSwap,
                onChange: (m) => d("blocksToSwap", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "40 = 16 GB-safe (most offload, lowest VRAM peak)." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Interpolation method" }),
            /* @__PURE__ */ v.jsx(
              "select",
              {
                className: $h,
                value: i.interpolateMethod,
                onChange: (m) => d("interpolateMethod", m.target.value),
                children: iH.map((m) => /* @__PURE__ */ v.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Interpolate target fps" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: tc,
                type: "number",
                min: 0,
                max: 120,
                value: i.interpolateFps,
                onChange: (m) => d("interpolateFps", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "0 = off. 48 from 16 = ×3 smooth playback." })
          ] }),
          /* @__PURE__ */ v.jsxs("div", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, id: "svi2-fast-parallel-label", children: "Fast parallel (CPU & encode threads)" }),
            /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
              /* @__PURE__ */ v.jsx(
                "button",
                {
                  type: "button",
                  role: "switch",
                  "aria-checked": i.fastParallel,
                  "aria-labelledby": "svi2-fast-parallel-label",
                  className: Hl,
                  onClick: () => d("fastParallel", !i.fastParallel),
                  children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ v.jsx("span", { className: wa, children: i.fastParallel ? "On" : "Off" })
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "Uses ~half the CPU cores for prompt-encode and ffmpeg. Visually identical; only mp4 sha differs." })
          ] }),
          /* @__PURE__ */ v.jsxs("div", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, id: "svi2-batch-prompt-encode-label", children: "Batch prompt encoding (experimental — alters exact output)" }),
            /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
              /* @__PURE__ */ v.jsx(
                "button",
                {
                  type: "button",
                  role: "switch",
                  "aria-checked": i.batchPromptEncode,
                  "aria-labelledby": "svi2-batch-prompt-encode-label",
                  className: Hl,
                  onClick: () => d("batchPromptEncode", !i.batchPromptEncode),
                  children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ v.jsx("span", { className: wa, children: i.batchPromptEncode ? "On" : "Off" })
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "Encodes all prompts in one forward pass. Faster, but changes text conditioning at the bit level — off by default." })
          ] })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: aH, children: [
          /* @__PURE__ */ v.jsx(ua, { loading: s, disabled: !c, onClick: () => void p(), children: "Save settings" }),
          /* @__PURE__ */ v.jsx(
            ua,
            {
              variant: "secondary",
              onClick: () => l(e),
              disabled: s || !c,
              children: "Discard changes"
            }
          ),
          c && /* @__PURE__ */ v.jsx("output", { className: rH, children: "Unsaved changes" })
        ] })
      ]
    }
  );
}
var oH = "_1ugwva20", sH = "_1ugwva21", uH = "_1ugwva22", cH = "_1ugwva23", fH = "_1ugwva24", dH = "_1ugwva25";
function hH() {
  const e = UN(), { deploymentId: a } = MN(), i = mH(e.catalog?.presets ?? []);
  return /* @__PURE__ */ v.jsxs(
    N5,
    {
      initialSettings: e.settings,
      initialPreset: i,
      deploymentId: a,
      children: [
        /* @__PURE__ */ v.jsxs("div", { className: oH, children: [
          /* @__PURE__ */ v.jsx("header", { className: sH, children: /* @__PURE__ */ v.jsxs("div", { className: uH, children: [
            /* @__PURE__ */ v.jsx("h1", { className: cH, children: "SVI 2.0 Pro" }),
            /* @__PURE__ */ v.jsx("p", { className: fH, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
          ] }) }),
          /* @__PURE__ */ v.jsx("main", { className: dH, children: /* @__PURE__ */ v.jsx(WN, {}) })
        ] }),
        /* @__PURE__ */ v.jsx(X3, { position: "bottom-right", theme: "dark", richColors: !0 })
      ]
    }
  );
}
function mH(e) {
  return e.find((a) => a.id === is) ?? e[0] ?? null;
}
async function pH() {
  const [e, a] = await Promise.all([
    C1().catch(() => null),
    kC().catch(() => km)
  ]);
  return { catalog: e, settings: a };
}
function gH() {
  return [
    {
      path: "/",
      loader: () => hy("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: pH,
      Component: hH,
      children: [
        {
          index: !0,
          loader: ({ params: e }) => hy(`/${vH(e, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: Wk },
        { path: "dag", Component: aO },
        { path: "settings", Component: lH }
      ]
    }
  ];
}
function vH(e, a) {
  const i = e[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const Bx = "ext-actions-request", yH = "ext-actions-declare", bH = "ext-action-state", Ux = "ext-action-invoke", Vx = "svi2-pro:navigate", $x = "svi2-pro.render";
function xH(e, a) {
  let i = !1, l = !1;
  const s = () => ({
    id: $x,
    label: i ? "Rendering…" : "Render",
    icon: i ? "hourglass_top" : "movie",
    tone: "primary",
    state: i ? "loading" : l ? "disabled" : "idle",
    tooltip: l ? "Fix the highlighted fields before rendering" : "Start the SVI 2.0 Pro render"
  }), u = () => ({
    primary: s()
  }), c = () => {
    e.dispatchEvent(
      new CustomEvent(yH, { detail: { actions: u() }, bubbles: !1 })
    );
  }, d = () => {
    e.dispatchEvent(
      new CustomEvent(bH, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => c(), m = (g) => {
    g.detail?.id === $x && C5();
  }, y = M5((g) => {
    i = g.busy, l = g.blocked, d();
  });
  return e.addEventListener(Bx, p), e.addEventListener(Ux, m), c(), {
    dispose: () => {
      y(), e.removeEventListener(Bx, p), e.removeEventListener(Ux, m);
    }
  };
}
const xm = "svi2-pro-app", wH = "ext-event", qx = "svi2-pro-stylesheet", Ix = ["accent", "density", "card"];
function _H(e) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[e];
}
function SH() {
  if (typeof document > "u" || document.getElementById(qx)) return;
  const e = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = qx, a.rel = "stylesheet", a.href = e, document.head.appendChild(a);
}
SH();
class EH extends HTMLElement {
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
    this.root = s2.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Vx, this.navigateListener), this.navigateListener = null), this.router = null, this.paintedEntry = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = xH(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const l = i.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(Vx, a);
  }
  syncTweaksFromBody() {
    for (const a of Ix) {
      const i = _H(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Ix.map((a) => `data-${a}`)
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
    const i = XN(gH(), { initialEntries: [a] });
    this.router = i, this.paintedEntry = a, this.root.render(
      /* @__PURE__ */ v.jsx(S.StrictMode, { children: /* @__PURE__ */ v.jsx(ZN, { router: i }) })
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
      new CustomEvent(wH, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function NH() {
  typeof customElements > "u" || customElements.get(xm) || customElements.define(xm, EH);
}
typeof customElements < "u" && !customElements.get(xm) && NH();
export {
  NH as register
};
//# sourceMappingURL=svi2-pro.js.map
