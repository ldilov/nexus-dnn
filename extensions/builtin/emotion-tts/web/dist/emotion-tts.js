function nT(n, a) {
  for (var l = 0; l < a.length; l++) {
    const s = a[l];
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
function aT(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var qf = { exports: {} }, Nr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ng;
function iT() {
  if (Ng) return Nr;
  Ng = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function l(s, o, c) {
    var d = null;
    if (c !== void 0 && (d = "" + c), o.key !== void 0 && (d = "" + o.key), "key" in o) {
      c = {};
      for (var h in o)
        h !== "key" && (c[h] = o[h]);
    } else c = o;
    return o = c.ref, {
      $$typeof: n,
      type: s,
      key: d,
      ref: o !== void 0 ? o : null,
      props: c
    };
  }
  return Nr.Fragment = a, Nr.jsx = l, Nr.jsxs = l, Nr;
}
var zg;
function lT() {
  return zg || (zg = 1, qf.exports = iT()), qf.exports;
}
var v = lT(), kf = { exports: {} }, Me = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Og;
function rT() {
  if (Og) return Me;
  Og = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), d = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), S = Symbol.iterator;
  function T(j) {
    return j === null || typeof j != "object" ? null : (j = S && j[S] || j["@@iterator"], typeof j == "function" ? j : null);
  }
  var R = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, w = Object.assign, D = {};
  function O(j, F, ie) {
    this.props = j, this.context = F, this.refs = D, this.updater = ie || R;
  }
  O.prototype.isReactComponent = {}, O.prototype.setState = function(j, F) {
    if (typeof j != "object" && typeof j != "function" && j != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, j, F, "setState");
  }, O.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function B() {
  }
  B.prototype = O.prototype;
  function L(j, F, ie) {
    this.props = j, this.context = F, this.refs = D, this.updater = ie || R;
  }
  var V = L.prototype = new B();
  V.constructor = L, w(V, O.prototype), V.isPureReactComponent = !0;
  var X = Array.isArray;
  function K() {
  }
  var ee = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function Q(j, F, ie) {
    var oe = ie.ref;
    return {
      $$typeof: n,
      type: j,
      key: F,
      ref: oe !== void 0 ? oe : null,
      props: ie
    };
  }
  function te(j, F) {
    return Q(j.type, F, j.props);
  }
  function ce(j) {
    return typeof j == "object" && j !== null && j.$$typeof === n;
  }
  function J(j) {
    var F = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(ie) {
      return F[ie];
    });
  }
  var P = /\/+/g;
  function le(j, F) {
    return typeof j == "object" && j !== null && j.key != null ? J("" + j.key) : F.toString(36);
  }
  function Z(j) {
    switch (j.status) {
      case "fulfilled":
        return j.value;
      case "rejected":
        throw j.reason;
      default:
        switch (typeof j.status == "string" ? j.then(K, K) : (j.status = "pending", j.then(
          function(F) {
            j.status === "pending" && (j.status = "fulfilled", j.value = F);
          },
          function(F) {
            j.status === "pending" && (j.status = "rejected", j.reason = F);
          }
        )), j.status) {
          case "fulfilled":
            return j.value;
          case "rejected":
            throw j.reason;
        }
    }
    throw j;
  }
  function z(j, F, ie, oe, xe) {
    var Re = typeof j;
    (Re === "undefined" || Re === "boolean") && (j = null);
    var De = !1;
    if (j === null) De = !0;
    else
      switch (Re) {
        case "bigint":
        case "string":
        case "number":
          De = !0;
          break;
        case "object":
          switch (j.$$typeof) {
            case n:
            case a:
              De = !0;
              break;
            case y:
              return De = j._init, z(
                De(j._payload),
                F,
                ie,
                oe,
                xe
              );
          }
      }
    if (De)
      return xe = xe(j), De = oe === "" ? "." + le(j, 0) : oe, X(xe) ? (ie = "", De != null && (ie = De.replace(P, "$&/") + "/"), z(xe, F, ie, "", function(In) {
        return In;
      })) : xe != null && (ce(xe) && (xe = te(
        xe,
        ie + (xe.key == null || j && j.key === xe.key ? "" : ("" + xe.key).replace(
          P,
          "$&/"
        ) + "/") + De
      )), F.push(xe)), 1;
    De = 0;
    var dt = oe === "" ? "." : oe + ":";
    if (X(j))
      for (var $e = 0; $e < j.length; $e++)
        oe = j[$e], Re = dt + le(oe, $e), De += z(
          oe,
          F,
          ie,
          Re,
          xe
        );
    else if ($e = T(j), typeof $e == "function")
      for (j = $e.call(j), $e = 0; !(oe = j.next()).done; )
        oe = oe.value, Re = dt + le(oe, $e++), De += z(
          oe,
          F,
          ie,
          Re,
          xe
        );
    else if (Re === "object") {
      if (typeof j.then == "function")
        return z(
          Z(j),
          F,
          ie,
          oe,
          xe
        );
      throw F = String(j), Error(
        "Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function ne(j, F, ie) {
    if (j == null) return j;
    var oe = [], xe = 0;
    return z(j, oe, "", "", function(Re) {
      return F.call(ie, Re, xe++);
    }), oe;
  }
  function se(j) {
    if (j._status === -1) {
      var F = j._result;
      F = F(), F.then(
        function(ie) {
          (j._status === 0 || j._status === -1) && (j._status = 1, j._result = ie);
        },
        function(ie) {
          (j._status === 0 || j._status === -1) && (j._status = 2, j._result = ie);
        }
      ), j._status === -1 && (j._status = 0, j._result = F);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var ue = typeof reportError == "function" ? reportError : function(j) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var F = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
        error: j
      });
      if (!window.dispatchEvent(F)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", j);
      return;
    }
    console.error(j);
  }, we = {
    map: ne,
    forEach: function(j, F, ie) {
      ne(
        j,
        function() {
          F.apply(this, arguments);
        },
        ie
      );
    },
    count: function(j) {
      var F = 0;
      return ne(j, function() {
        F++;
      }), F;
    },
    toArray: function(j) {
      return ne(j, function(F) {
        return F;
      }) || [];
    },
    only: function(j) {
      if (!ce(j))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return j;
    }
  };
  return Me.Activity = b, Me.Children = we, Me.Component = O, Me.Fragment = l, Me.Profiler = o, Me.PureComponent = L, Me.StrictMode = s, Me.Suspense = p, Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ee, Me.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(j) {
      return ee.H.useMemoCache(j);
    }
  }, Me.cache = function(j) {
    return function() {
      return j.apply(null, arguments);
    };
  }, Me.cacheSignal = function() {
    return null;
  }, Me.cloneElement = function(j, F, ie) {
    if (j == null)
      throw Error(
        "The argument must be a React element, but you passed " + j + "."
      );
    var oe = w({}, j.props), xe = j.key;
    if (F != null)
      for (Re in F.key !== void 0 && (xe = "" + F.key), F)
        !A.call(F, Re) || Re === "key" || Re === "__self" || Re === "__source" || Re === "ref" && F.ref === void 0 || (oe[Re] = F[Re]);
    var Re = arguments.length - 2;
    if (Re === 1) oe.children = ie;
    else if (1 < Re) {
      for (var De = Array(Re), dt = 0; dt < Re; dt++)
        De[dt] = arguments[dt + 2];
      oe.children = De;
    }
    return Q(j.type, xe, oe);
  }, Me.createContext = function(j) {
    return j = {
      $$typeof: d,
      _currentValue: j,
      _currentValue2: j,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, j.Provider = j, j.Consumer = {
      $$typeof: c,
      _context: j
    }, j;
  }, Me.createElement = function(j, F, ie) {
    var oe, xe = {}, Re = null;
    if (F != null)
      for (oe in F.key !== void 0 && (Re = "" + F.key), F)
        A.call(F, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (xe[oe] = F[oe]);
    var De = arguments.length - 2;
    if (De === 1) xe.children = ie;
    else if (1 < De) {
      for (var dt = Array(De), $e = 0; $e < De; $e++)
        dt[$e] = arguments[$e + 2];
      xe.children = dt;
    }
    if (j && j.defaultProps)
      for (oe in De = j.defaultProps, De)
        xe[oe] === void 0 && (xe[oe] = De[oe]);
    return Q(j, Re, xe);
  }, Me.createRef = function() {
    return { current: null };
  }, Me.forwardRef = function(j) {
    return { $$typeof: h, render: j };
  }, Me.isValidElement = ce, Me.lazy = function(j) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: j },
      _init: se
    };
  }, Me.memo = function(j, F) {
    return {
      $$typeof: m,
      type: j,
      compare: F === void 0 ? null : F
    };
  }, Me.startTransition = function(j) {
    var F = ee.T, ie = {};
    ee.T = ie;
    try {
      var oe = j(), xe = ee.S;
      xe !== null && xe(ie, oe), typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then(K, ue);
    } catch (Re) {
      ue(Re);
    } finally {
      F !== null && ie.types !== null && (F.types = ie.types), ee.T = F;
    }
  }, Me.unstable_useCacheRefresh = function() {
    return ee.H.useCacheRefresh();
  }, Me.use = function(j) {
    return ee.H.use(j);
  }, Me.useActionState = function(j, F, ie) {
    return ee.H.useActionState(j, F, ie);
  }, Me.useCallback = function(j, F) {
    return ee.H.useCallback(j, F);
  }, Me.useContext = function(j) {
    return ee.H.useContext(j);
  }, Me.useDebugValue = function() {
  }, Me.useDeferredValue = function(j, F) {
    return ee.H.useDeferredValue(j, F);
  }, Me.useEffect = function(j, F) {
    return ee.H.useEffect(j, F);
  }, Me.useEffectEvent = function(j) {
    return ee.H.useEffectEvent(j);
  }, Me.useId = function() {
    return ee.H.useId();
  }, Me.useImperativeHandle = function(j, F, ie) {
    return ee.H.useImperativeHandle(j, F, ie);
  }, Me.useInsertionEffect = function(j, F) {
    return ee.H.useInsertionEffect(j, F);
  }, Me.useLayoutEffect = function(j, F) {
    return ee.H.useLayoutEffect(j, F);
  }, Me.useMemo = function(j, F) {
    return ee.H.useMemo(j, F);
  }, Me.useOptimistic = function(j, F) {
    return ee.H.useOptimistic(j, F);
  }, Me.useReducer = function(j, F, ie) {
    return ee.H.useReducer(j, F, ie);
  }, Me.useRef = function(j) {
    return ee.H.useRef(j);
  }, Me.useState = function(j) {
    return ee.H.useState(j);
  }, Me.useSyncExternalStore = function(j, F, ie) {
    return ee.H.useSyncExternalStore(
      j,
      F,
      ie
    );
  }, Me.useTransition = function() {
    return ee.H.useTransition();
  }, Me.version = "19.2.5", Me;
}
var _g;
function eh() {
  return _g || (_g = 1, kf.exports = rT()), kf.exports;
}
var x = eh();
const sT = /* @__PURE__ */ aT(x), oT = /* @__PURE__ */ nT({
  __proto__: null,
  default: sT
}, [x]);
var Pf = { exports: {} }, zr = {}, Yf = { exports: {} }, Gf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lg;
function uT() {
  return Lg || (Lg = 1, (function(n) {
    function a(z, ne) {
      var se = z.length;
      z.push(ne);
      e: for (; 0 < se; ) {
        var ue = se - 1 >>> 1, we = z[ue];
        if (0 < o(we, ne))
          z[ue] = ne, z[se] = we, se = ue;
        else break e;
      }
    }
    function l(z) {
      return z.length === 0 ? null : z[0];
    }
    function s(z) {
      if (z.length === 0) return null;
      var ne = z[0], se = z.pop();
      if (se !== ne) {
        z[0] = se;
        e: for (var ue = 0, we = z.length, j = we >>> 1; ue < j; ) {
          var F = 2 * (ue + 1) - 1, ie = z[F], oe = F + 1, xe = z[oe];
          if (0 > o(ie, se))
            oe < we && 0 > o(xe, ie) ? (z[ue] = xe, z[oe] = se, ue = oe) : (z[ue] = ie, z[F] = se, ue = F);
          else if (oe < we && 0 > o(xe, se))
            z[ue] = xe, z[oe] = se, ue = oe;
          else break e;
        }
      }
      return ne;
    }
    function o(z, ne) {
      var se = z.sortIndex - ne.sortIndex;
      return se !== 0 ? se : z.id - ne.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      n.unstable_now = function() {
        return c.now();
      };
    } else {
      var d = Date, h = d.now();
      n.unstable_now = function() {
        return d.now() - h;
      };
    }
    var p = [], m = [], y = 1, b = null, S = 3, T = !1, R = !1, w = !1, D = !1, O = typeof setTimeout == "function" ? setTimeout : null, B = typeof clearTimeout == "function" ? clearTimeout : null, L = typeof setImmediate < "u" ? setImmediate : null;
    function V(z) {
      for (var ne = l(m); ne !== null; ) {
        if (ne.callback === null) s(m);
        else if (ne.startTime <= z)
          s(m), ne.sortIndex = ne.expirationTime, a(p, ne);
        else break;
        ne = l(m);
      }
    }
    function X(z) {
      if (w = !1, V(z), !R)
        if (l(p) !== null)
          R = !0, K || (K = !0, J());
        else {
          var ne = l(m);
          ne !== null && Z(X, ne.startTime - z);
        }
    }
    var K = !1, ee = -1, A = 5, Q = -1;
    function te() {
      return D ? !0 : !(n.unstable_now() - Q < A);
    }
    function ce() {
      if (D = !1, K) {
        var z = n.unstable_now();
        Q = z;
        var ne = !0;
        try {
          e: {
            R = !1, w && (w = !1, B(ee), ee = -1), T = !0;
            var se = S;
            try {
              t: {
                for (V(z), b = l(p); b !== null && !(b.expirationTime > z && te()); ) {
                  var ue = b.callback;
                  if (typeof ue == "function") {
                    b.callback = null, S = b.priorityLevel;
                    var we = ue(
                      b.expirationTime <= z
                    );
                    if (z = n.unstable_now(), typeof we == "function") {
                      b.callback = we, V(z), ne = !0;
                      break t;
                    }
                    b === l(p) && s(p), V(z);
                  } else s(p);
                  b = l(p);
                }
                if (b !== null) ne = !0;
                else {
                  var j = l(m);
                  j !== null && Z(
                    X,
                    j.startTime - z
                  ), ne = !1;
                }
              }
              break e;
            } finally {
              b = null, S = se, T = !1;
            }
            ne = void 0;
          }
        } finally {
          ne ? J() : K = !1;
        }
      }
    }
    var J;
    if (typeof L == "function")
      J = function() {
        L(ce);
      };
    else if (typeof MessageChannel < "u") {
      var P = new MessageChannel(), le = P.port2;
      P.port1.onmessage = ce, J = function() {
        le.postMessage(null);
      };
    } else
      J = function() {
        O(ce, 0);
      };
    function Z(z, ne) {
      ee = O(function() {
        z(n.unstable_now());
      }, ne);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, n.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < z ? Math.floor(1e3 / z) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(z) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var ne = 3;
          break;
        default:
          ne = S;
      }
      var se = S;
      S = ne;
      try {
        return z();
      } finally {
        S = se;
      }
    }, n.unstable_requestPaint = function() {
      D = !0;
    }, n.unstable_runWithPriority = function(z, ne) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var se = S;
      S = z;
      try {
        return ne();
      } finally {
        S = se;
      }
    }, n.unstable_scheduleCallback = function(z, ne, se) {
      var ue = n.unstable_now();
      switch (typeof se == "object" && se !== null ? (se = se.delay, se = typeof se == "number" && 0 < se ? ue + se : ue) : se = ue, z) {
        case 1:
          var we = -1;
          break;
        case 2:
          we = 250;
          break;
        case 5:
          we = 1073741823;
          break;
        case 4:
          we = 1e4;
          break;
        default:
          we = 5e3;
      }
      return we = se + we, z = {
        id: y++,
        callback: ne,
        priorityLevel: z,
        startTime: se,
        expirationTime: we,
        sortIndex: -1
      }, se > ue ? (z.sortIndex = se, a(m, z), l(p) === null && z === l(m) && (w ? (B(ee), ee = -1) : w = !0, Z(X, se - ue))) : (z.sortIndex = we, a(p, z), R || T || (R = !0, K || (K = !0, J()))), z;
    }, n.unstable_shouldYield = te, n.unstable_wrapCallback = function(z) {
      var ne = S;
      return function() {
        var se = S;
        S = ne;
        try {
          return z.apply(this, arguments);
        } finally {
          S = se;
        }
      };
    };
  })(Gf)), Gf;
}
var Ug;
function cT() {
  return Ug || (Ug = 1, Yf.exports = uT()), Yf.exports;
}
var Ff = { exports: {} }, kt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vg;
function fT() {
  if (Vg) return kt;
  Vg = 1;
  var n = eh();
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
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, m) {
    if (p === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return kt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, kt.createPortal = function(p, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return c(p, m, null, y);
  }, kt.flushSync = function(p) {
    var m = d.T, y = s.p;
    try {
      if (d.T = null, s.p = 2, p) return p();
    } finally {
      d.T = m, s.p = y, s.d.f();
    }
  }, kt.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(p, m));
  }, kt.prefetchDNS = function(p) {
    typeof p == "string" && s.d.D(p);
  }, kt.preinit = function(p, m) {
    if (typeof p == "string" && m && typeof m.as == "string") {
      var y = m.as, b = h(y, m.crossOrigin), S = typeof m.integrity == "string" ? m.integrity : void 0, T = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? s.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: b,
          integrity: S,
          fetchPriority: T
        }
      ) : y === "script" && s.d.X(p, {
        crossOrigin: b,
        integrity: S,
        fetchPriority: T,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, kt.preinitModule = function(p, m) {
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
  }, kt.preload = function(p, m) {
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
  }, kt.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var y = h(m.as, m.crossOrigin);
        s.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else s.d.m(p);
  }, kt.requestFormReset = function(p) {
    s.d.r(p);
  }, kt.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, kt.useFormState = function(p, m, y) {
    return d.H.useFormState(p, m, y);
  }, kt.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, kt.version = "19.2.5", kt;
}
var Bg;
function dT() {
  if (Bg) return Ff.exports;
  Bg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Ff.exports = fT(), Ff.exports;
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
var Hg;
function hT() {
  if (Hg) return zr;
  Hg = 1;
  var n = cT(), a = eh(), l = dT();
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
  function d(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (c(e) !== e)
      throw Error(s(188));
  }
  function m(e) {
    var t = e.alternate;
    if (!t) {
      if (t = c(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var i = e, r = t; ; ) {
      var u = i.return;
      if (u === null) break;
      var f = u.alternate;
      if (f === null) {
        if (r = u.return, r !== null) {
          i = r;
          continue;
        }
        break;
      }
      if (u.child === f.child) {
        for (f = u.child; f; ) {
          if (f === i) return p(u), e;
          if (f === r) return p(u), t;
          f = f.sibling;
        }
        throw Error(s(188));
      }
      if (i.return !== r.return) i = u, r = f;
      else {
        for (var g = !1, E = u.child; E; ) {
          if (E === i) {
            g = !0, i = u, r = f;
            break;
          }
          if (E === r) {
            g = !0, r = u, i = f;
            break;
          }
          E = E.sibling;
        }
        if (!g) {
          for (E = f.child; E; ) {
            if (E === i) {
              g = !0, i = f, r = u;
              break;
            }
            if (E === r) {
              g = !0, r = f, i = u;
              break;
            }
            E = E.sibling;
          }
          if (!g) throw Error(s(189));
        }
      }
      if (i.alternate !== r) throw Error(s(190));
    }
    if (i.tag !== 3) throw Error(s(188));
    return i.stateNode.current === i ? e : t;
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
  var b = Object.assign, S = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), R = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), B = Symbol.for("react.consumer"), L = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), X = Symbol.for("react.suspense"), K = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), Q = Symbol.for("react.activity"), te = Symbol.for("react.memo_cache_sentinel"), ce = Symbol.iterator;
  function J(e) {
    return e === null || typeof e != "object" ? null : (e = ce && e[ce] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var P = Symbol.for("react.client.reference");
  function le(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === P ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case w:
        return "Fragment";
      case O:
        return "Profiler";
      case D:
        return "StrictMode";
      case X:
        return "Suspense";
      case K:
        return "SuspenseList";
      case Q:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case R:
          return "Portal";
        case L:
          return e.displayName || "Context";
        case B:
          return (e._context.displayName || "Context") + ".Consumer";
        case V:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ee:
          return t = e.displayName || null, t !== null ? t : le(e.type) || "Memo";
        case A:
          t = e._payload, e = e._init;
          try {
            return le(e(t));
          } catch {
          }
      }
    return null;
  }
  var Z = Array.isArray, z = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ue = [], we = -1;
  function j(e) {
    return { current: e };
  }
  function F(e) {
    0 > we || (e.current = ue[we], ue[we] = null, we--);
  }
  function ie(e, t) {
    we++, ue[we] = e.current, e.current = t;
  }
  var oe = j(null), xe = j(null), Re = j(null), De = j(null);
  function dt(e, t) {
    switch (ie(Re, t), ie(xe, e), ie(oe, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? eg(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = eg(t), e = tg(t, e);
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
    F(oe), ie(oe, e);
  }
  function $e() {
    F(oe), F(xe), F(Re);
  }
  function In(e) {
    e.memoizedState !== null && ie(De, e);
    var t = oe.current, i = tg(t, e.type);
    t !== i && (ie(xe, e), ie(oe, i));
  }
  function xa(e) {
    xe.current === e && (F(oe), F(xe)), De.current === e && (F(De), Mr._currentValue = se);
  }
  var Vn, pt;
  function Bt(e) {
    if (Vn === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        Vn = t && t[1] || "", pt = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Vn + e + pt;
  }
  var Ea = !1;
  function oi(e, t) {
    if (!e || Ea) return "";
    Ea = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
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
                } catch (G) {
                  var Y = G;
                }
                Reflect.construct(e, [], W);
              } else {
                try {
                  W.call();
                } catch (G) {
                  Y = G;
                }
                e.call(W.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (G) {
                Y = G;
              }
              (W = e()) && typeof W.catch == "function" && W.catch(function() {
              });
            }
          } catch (G) {
            if (G && Y && typeof G.stack == "string")
              return [G.stack, Y.stack];
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
        var C = g.split(`
`), q = E.split(`
`);
        for (u = r = 0; r < C.length && !C[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; u < q.length && !q[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (r === C.length || u === q.length)
          for (r = C.length - 1, u = q.length - 1; 1 <= r && 0 <= u && C[r] !== q[u]; )
            u--;
        for (; 1 <= r && 0 <= u; r--, u--)
          if (C[r] !== q[u]) {
            if (r !== 1 || u !== 1)
              do
                if (r--, u--, 0 > u || C[r] !== q[u]) {
                  var $ = `
` + C[r].replace(" at new ", " at ");
                  return e.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", e.displayName)), $;
                }
              while (1 <= r && 0 <= u);
            break;
          }
      }
    } finally {
      Ea = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Bt(i) : "";
  }
  function be(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Bt(e.type);
      case 16:
        return Bt("Lazy");
      case 13:
        return e.child !== t && t !== null ? Bt("Suspense Fallback") : Bt("Suspense");
      case 19:
        return Bt("SuspenseList");
      case 0:
      case 15:
        return oi(e.type, !1);
      case 11:
        return oi(e.type.render, !1);
      case 1:
        return oi(e.type, !0);
      case 31:
        return Bt("Activity");
      default:
        return "";
    }
  }
  function _e(e) {
    try {
      var t = "", i = null;
      do
        t += be(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var Fe = Object.prototype.hasOwnProperty, ot = n.unstable_scheduleCallback, Zn = n.unstable_cancelCallback, Au = n.unstable_shouldYield, ju = n.unstable_requestPaint, Yt = n.unstable_now, Jn = n.unstable_getCurrentPriorityLevel, Ta = n.unstable_ImmediatePriority, Pl = n.unstable_UserBlockingPriority, Ra = n.unstable_NormalPriority, Mn = n.unstable_LowPriority, fn = n.unstable_IdlePriority, ms = n.log, Du = n.unstable_setDisableYieldValue, Wn = null, Gt = null;
  function jt(e) {
    if (typeof ms == "function" && Du(e), Gt && typeof Gt.setStrictMode == "function")
      try {
        Gt.setStrictMode(Wn, e);
      } catch {
      }
  }
  var Ht = Math.clz32 ? Math.clz32 : Nu, ps = Math.log, ys = Math.LN2;
  function Nu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ps(e) / ys | 0) | 0;
  }
  var ui = 256, ea = 262144, ci = 4194304;
  function An(e) {
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
  function Yi(e, t, i) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var u = 0, f = e.suspendedLanes, g = e.pingedLanes;
    e = e.warmLanes;
    var E = r & 134217727;
    return E !== 0 ? (r = E & ~f, r !== 0 ? u = An(r) : (g &= E, g !== 0 ? u = An(g) : i || (i = E & ~e, i !== 0 && (u = An(i))))) : (E = r & ~f, E !== 0 ? u = An(E) : g !== 0 ? u = An(g) : i || (i = r & ~e, i !== 0 && (u = An(i)))), u === 0 ? 0 : t !== 0 && t !== u && (t & f) === 0 && (f = u & -u, i = t & -t, f >= i || f === 32 && (i & 4194048) !== 0) ? t : u;
  }
  function wa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function zu(e, t) {
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
  function Yl() {
    var e = ci;
    return ci <<= 1, (ci & 62914560) === 0 && (ci = 4194304), e;
  }
  function Ca(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function Bn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function gs(e, t, i, r, u, f) {
    var g = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var E = e.entanglements, C = e.expirationTimes, q = e.hiddenUpdates;
    for (i = g & ~i; 0 < i; ) {
      var $ = 31 - Ht(i), W = 1 << $;
      E[$] = 0, C[$] = -1;
      var Y = q[$];
      if (Y !== null)
        for (q[$] = null, $ = 0; $ < Y.length; $++) {
          var G = Y[$];
          G !== null && (G.lane &= -536870913);
        }
      i &= ~W;
    }
    r !== 0 && vs(e, r, 0), f !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(g & ~t));
  }
  function vs(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var r = 31 - Ht(t);
    e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | i & 261930;
  }
  function bs(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var r = 31 - Ht(i), u = 1 << r;
      u & t | e[r] & t && (e[r] |= t), i &= ~u;
    }
  }
  function M(e, t) {
    var i = t & -t;
    return i = (i & 42) !== 0 ? 1 : _(i), (i & (e.suspendedLanes | t)) !== 0 ? 0 : i;
  }
  function _(e) {
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
  function k(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ae() {
    var e = ne.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Rg(e.type));
  }
  function re(e, t) {
    var i = ne.p;
    try {
      return ne.p = e, t();
    } finally {
      ne.p = i;
    }
  }
  var pe = Math.random().toString(36).slice(2), fe = "__reactFiber$" + pe, de = "__reactProps$" + pe, ge = "__reactContainer$" + pe, he = "__reactEvents$" + pe, Te = "__reactListeners$" + pe, Se = "__reactHandles$" + pe, ke = "__reactResources$" + pe, Ne = "__reactMarker$" + pe;
  function We(e) {
    delete e[fe], delete e[de], delete e[he], delete e[Te], delete e[Se];
  }
  function Qe(e) {
    var t = e[fe];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[ge] || i[fe]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = og(e); e !== null; ) {
            if (i = e[fe]) return i;
            e = og(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function ut(e) {
    if (e = e[fe] || e[ge]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Le(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function St(e) {
    var t = e[ke];
    return t || (t = e[ke] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function nt(e) {
    e[Ne] = !0;
  }
  var Ma = /* @__PURE__ */ new Set(), jn = {};
  function Dt(e, t) {
    Hn(e, t), Hn(e + "Capture", t);
  }
  function Hn(e, t) {
    for (jn[e] = t, e = 0; e < t.length; e++)
      Ma.add(t[e]);
  }
  var fi = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), qn = {}, di = {};
  function Gi(e) {
    return Fe.call(di, e) ? !0 : Fe.call(qn, e) ? !1 : fi.test(e) ? di[e] = !0 : (qn[e] = !0, !1);
  }
  function ze(e, t, i) {
    if (Gi(t))
      if (i === null) e.removeAttribute(t);
      else {
        switch (typeof i) {
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
        e.setAttribute(t, "" + i);
      }
  }
  function yt(e, t, i) {
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
  function qt(e, t, i, r) {
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
      e.setAttributeNS(t, i, "" + r);
    }
  }
  function xt(e) {
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
  function at(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Fi(e, t, i) {
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
          i = "" + g, f.call(this, g);
        }
      }), Object.defineProperty(e, t, {
        enumerable: r.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(g) {
          i = "" + g;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function $i(e) {
    if (!e._valueTracker) {
      var t = at(e) ? "checked" : "value";
      e._valueTracker = Fi(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Ss(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), r = "";
    return e && (r = at(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== i ? (t.setValue(e), !0) : !1;
  }
  function xs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var I1 = /[\n"\\]/g;
  function dn(e) {
    return e.replace(
      I1,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ou(e, t, i, r, u, f, g, E) {
    e.name = "", g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" ? e.type = g : e.removeAttribute("type"), t != null ? g === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + xt(t)) : e.value !== "" + xt(t) && (e.value = "" + xt(t)) : g !== "submit" && g !== "reset" || e.removeAttribute("value"), t != null ? _u(e, g, xt(t)) : i != null ? _u(e, g, xt(i)) : r != null && e.removeAttribute("value"), u == null && f != null && (e.defaultChecked = !!f), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + xt(E) : e.removeAttribute("name");
  }
  function Kh(e, t, i, r, u, f, g, E) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), t != null || i != null) {
      if (!(f !== "submit" && f !== "reset" || t != null)) {
        $i(e);
        return;
      }
      i = i != null ? "" + xt(i) : "", t = t != null ? "" + xt(t) : i, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = r ?? u, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = E ? e.checked : !!r, e.defaultChecked = !!r, g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (e.name = g), $i(e);
  }
  function _u(e, t, i) {
    t === "number" && xs(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function Xi(e, t, i, r) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < i.length; u++)
        t["$" + i[u]] = !0;
      for (i = 0; i < e.length; i++)
        u = t.hasOwnProperty("$" + e[i].value), e[i].selected !== u && (e[i].selected = u), u && r && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + xt(i), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === i) {
          e[u].selected = !0, r && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Qh(e, t, i) {
    if (t != null && (t = "" + xt(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + xt(i) : "";
  }
  function Ih(e, t, i, r) {
    if (t == null) {
      if (r != null) {
        if (i != null) throw Error(s(92));
        if (Z(r)) {
          if (1 < r.length) throw Error(s(93));
          r = r[0];
        }
        i = r;
      }
      i == null && (i = ""), t = i;
    }
    i = xt(t), e.defaultValue = i, r = e.textContent, r === i && r !== "" && r !== null && (e.value = r), $i(e);
  }
  function Ki(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Z1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Zh(e, t, i) {
    var r = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, i) : typeof i != "number" || i === 0 || Z1.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function Jh(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var r in i)
        !i.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var u in t)
        r = t[u], t.hasOwnProperty(u) && i[u] !== r && Zh(e, u, r);
    } else
      for (var f in t)
        t.hasOwnProperty(f) && Zh(e, f, t[f]);
  }
  function Lu(e) {
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
  var J1 = /* @__PURE__ */ new Map([
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
  ]), W1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Es(e) {
    return W1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ta() {
  }
  var Uu = null;
  function Vu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Qi = null, Ii = null;
  function Wh(e) {
    var t = ut(e);
    if (t && (e = t.stateNode)) {
      var i = e[de] || null;
      e: switch (e = t.stateNode, t.type) {
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
          ), t = i.name, i.type === "radio" && t != null) {
            for (i = e; i.parentNode; ) i = i.parentNode;
            for (i = i.querySelectorAll(
              'input[name="' + dn(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < i.length; t++) {
              var r = i[t];
              if (r !== e && r.form === e.form) {
                var u = r[de] || null;
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
            for (t = 0; t < i.length; t++)
              r = i[t], r.form === e.form && Ss(r);
          }
          break e;
        case "textarea":
          Qh(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && Xi(e, !!i.multiple, t, !1);
      }
    }
  }
  var Bu = !1;
  function em(e, t, i) {
    if (Bu) return e(t, i);
    Bu = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (Bu = !1, (Qi !== null || Ii !== null) && (uo(), Qi && (t = Qi, e = Ii, Ii = Qi = null, Wh(t), e)))
        for (t = 0; t < e.length; t++) Wh(e[t]);
    }
  }
  function Gl(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var r = i[de] || null;
    if (r === null) return null;
    i = r[t];
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
    if (i && typeof i != "function")
      throw Error(
        s(231, t, typeof i)
      );
    return i;
  }
  var na = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Hu = !1;
  if (na)
    try {
      var Fl = {};
      Object.defineProperty(Fl, "passive", {
        get: function() {
          Hu = !0;
        }
      }), window.addEventListener("test", Fl, Fl), window.removeEventListener("test", Fl, Fl);
    } catch {
      Hu = !1;
    }
  var Aa = null, qu = null, Ts = null;
  function tm() {
    if (Ts) return Ts;
    var e, t = qu, i = t.length, r, u = "value" in Aa ? Aa.value : Aa.textContent, f = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) ;
    var g = i - e;
    for (r = 1; r <= g && t[i - r] === u[f - r]; r++) ;
    return Ts = u.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Rs(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function ws() {
    return !0;
  }
  function nm() {
    return !1;
  }
  function Kt(e) {
    function t(i, r, u, f, g) {
      this._reactName = i, this._targetInst = u, this.type = r, this.nativeEvent = f, this.target = g, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (i = e[E], this[E] = i ? i(f) : f[E]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? ws : nm, this.isPropagationStopped = nm, this;
    }
    return b(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = ws);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = ws);
      },
      persist: function() {
      },
      isPersistent: ws
    }), t;
  }
  var hi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Cs = Kt(hi), $l = b({}, hi, { view: 0, detail: 0 }), ex = Kt($l), ku, Pu, Xl, Ms = b({}, $l, {
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
      return "movementX" in e ? e.movementX : (e !== Xl && (Xl && e.type === "mousemove" ? (ku = e.screenX - Xl.screenX, Pu = e.screenY - Xl.screenY) : Pu = ku = 0, Xl = e), ku);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Pu;
    }
  }), am = Kt(Ms), tx = b({}, Ms, { dataTransfer: 0 }), nx = Kt(tx), ax = b({}, $l, { relatedTarget: 0 }), Yu = Kt(ax), ix = b({}, hi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), lx = Kt(ix), rx = b({}, hi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), sx = Kt(rx), ox = b({}, hi, { data: 0 }), im = Kt(ox), ux = {
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
  }, cx = {
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
  }, fx = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function dx(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = fx[e]) ? !!t[e] : !1;
  }
  function Gu() {
    return dx;
  }
  var hx = b({}, $l, {
    key: function(e) {
      if (e.key) {
        var t = ux[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Rs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? cx[e.keyCode] || "Unidentified" : "";
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
      return e.type === "keypress" ? Rs(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Rs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), mx = Kt(hx), px = b({}, Ms, {
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
  }), lm = Kt(px), yx = b({}, $l, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Gu
  }), gx = Kt(yx), vx = b({}, hi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), bx = Kt(vx), Sx = b({}, Ms, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), xx = Kt(Sx), Ex = b({}, hi, {
    newState: 0,
    oldState: 0
  }), Tx = Kt(Ex), Rx = [9, 13, 27, 32], Fu = na && "CompositionEvent" in window, Kl = null;
  na && "documentMode" in document && (Kl = document.documentMode);
  var wx = na && "TextEvent" in window && !Kl, rm = na && (!Fu || Kl && 8 < Kl && 11 >= Kl), sm = " ", om = !1;
  function um(e, t) {
    switch (e) {
      case "keyup":
        return Rx.indexOf(t.keyCode) !== -1;
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
  function cm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Zi = !1;
  function Cx(e, t) {
    switch (e) {
      case "compositionend":
        return cm(t);
      case "keypress":
        return t.which !== 32 ? null : (om = !0, sm);
      case "textInput":
        return e = t.data, e === sm && om ? null : e;
      default:
        return null;
    }
  }
  function Mx(e, t) {
    if (Zi)
      return e === "compositionend" || !Fu && um(e, t) ? (e = tm(), Ts = qu = Aa = null, Zi = !1, e) : null;
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
        return rm && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Ax = {
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
  function fm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Ax[e.type] : t === "textarea";
  }
  function dm(e, t, i, r) {
    Qi ? Ii ? Ii.push(r) : Ii = [r] : Qi = r, t = go(t, "onChange"), 0 < t.length && (i = new Cs(
      "onChange",
      "change",
      null,
      i,
      r
    ), e.push({ event: i, listeners: t }));
  }
  var Ql = null, Il = null;
  function jx(e) {
    Ky(e, 0);
  }
  function As(e) {
    var t = Le(e);
    if (Ss(t)) return e;
  }
  function hm(e, t) {
    if (e === "change") return t;
  }
  var mm = !1;
  if (na) {
    var $u;
    if (na) {
      var Xu = "oninput" in document;
      if (!Xu) {
        var pm = document.createElement("div");
        pm.setAttribute("oninput", "return;"), Xu = typeof pm.oninput == "function";
      }
      $u = Xu;
    } else $u = !1;
    mm = $u && (!document.documentMode || 9 < document.documentMode);
  }
  function ym() {
    Ql && (Ql.detachEvent("onpropertychange", gm), Il = Ql = null);
  }
  function gm(e) {
    if (e.propertyName === "value" && As(Il)) {
      var t = [];
      dm(
        t,
        Il,
        e,
        Vu(e)
      ), em(jx, t);
    }
  }
  function Dx(e, t, i) {
    e === "focusin" ? (ym(), Ql = t, Il = i, Ql.attachEvent("onpropertychange", gm)) : e === "focusout" && ym();
  }
  function Nx(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return As(Il);
  }
  function zx(e, t) {
    if (e === "click") return As(t);
  }
  function Ox(e, t) {
    if (e === "input" || e === "change")
      return As(t);
  }
  function _x(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var nn = typeof Object.is == "function" ? Object.is : _x;
  function Zl(e, t) {
    if (nn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), r = Object.keys(t);
    if (i.length !== r.length) return !1;
    for (r = 0; r < i.length; r++) {
      var u = i[r];
      if (!Fe.call(t, u) || !nn(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function vm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function bm(e, t) {
    var i = vm(e);
    e = 0;
    for (var r; i; ) {
      if (i.nodeType === 3) {
        if (r = e + i.textContent.length, e <= t && r >= t)
          return { node: i, offset: t - e };
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
      i = vm(i);
    }
  }
  function Sm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Sm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function xm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = xs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = xs(e.document);
    }
    return t;
  }
  function Ku(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Lx = na && "documentMode" in document && 11 >= document.documentMode, Ji = null, Qu = null, Jl = null, Iu = !1;
  function Em(e, t, i) {
    var r = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Iu || Ji == null || Ji !== xs(r) || (r = Ji, "selectionStart" in r && Ku(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), Jl && Zl(Jl, r) || (Jl = r, r = go(Qu, "onSelect"), 0 < r.length && (t = new Cs(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: r }), t.target = Ji)));
  }
  function mi(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var Wi = {
    animationend: mi("Animation", "AnimationEnd"),
    animationiteration: mi("Animation", "AnimationIteration"),
    animationstart: mi("Animation", "AnimationStart"),
    transitionrun: mi("Transition", "TransitionRun"),
    transitionstart: mi("Transition", "TransitionStart"),
    transitioncancel: mi("Transition", "TransitionCancel"),
    transitionend: mi("Transition", "TransitionEnd")
  }, Zu = {}, Tm = {};
  na && (Tm = document.createElement("div").style, "AnimationEvent" in window || (delete Wi.animationend.animation, delete Wi.animationiteration.animation, delete Wi.animationstart.animation), "TransitionEvent" in window || delete Wi.transitionend.transition);
  function pi(e) {
    if (Zu[e]) return Zu[e];
    if (!Wi[e]) return e;
    var t = Wi[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in Tm)
        return Zu[e] = t[i];
    return e;
  }
  var Rm = pi("animationend"), wm = pi("animationiteration"), Cm = pi("animationstart"), Ux = pi("transitionrun"), Vx = pi("transitionstart"), Bx = pi("transitioncancel"), Mm = pi("transitionend"), Am = /* @__PURE__ */ new Map(), Ju = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ju.push("scrollEnd");
  function Dn(e, t) {
    Am.set(e, t), Dt(t, [e]);
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
  }, hn = [], el = 0, Wu = 0;
  function Ds() {
    for (var e = el, t = Wu = el = 0; t < e; ) {
      var i = hn[t];
      hn[t++] = null;
      var r = hn[t];
      hn[t++] = null;
      var u = hn[t];
      hn[t++] = null;
      var f = hn[t];
      if (hn[t++] = null, r !== null && u !== null) {
        var g = r.pending;
        g === null ? u.next = u : (u.next = g.next, g.next = u), r.pending = u;
      }
      f !== 0 && jm(i, u, f);
    }
  }
  function Ns(e, t, i, r) {
    hn[el++] = e, hn[el++] = t, hn[el++] = i, hn[el++] = r, Wu |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function ec(e, t, i, r) {
    return Ns(e, t, i, r), zs(e);
  }
  function yi(e, t) {
    return Ns(e, null, null, t), zs(e);
  }
  function jm(e, t, i) {
    e.lanes |= i;
    var r = e.alternate;
    r !== null && (r.lanes |= i);
    for (var u = !1, f = e.return; f !== null; )
      f.childLanes |= i, r = f.alternate, r !== null && (r.childLanes |= i), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (u = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, u && t !== null && (u = 31 - Ht(i), e = f.hiddenUpdates, r = e[u], r === null ? e[u] = [t] : r.push(t), t.lane = i | 536870912), f) : null;
  }
  function zs(e) {
    if (50 < Sr)
      throw Sr = 0, cf = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var tl = {};
  function Hx(e, t, i, r) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function an(e, t, i, r) {
    return new Hx(e, t, i, r);
  }
  function tc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function aa(e, t) {
    var i = e.alternate;
    return i === null ? (i = an(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function Dm(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Os(e, t, i, r, u, f) {
    var g = 0;
    if (r = e, typeof e == "function") tc(e) && (g = 1);
    else if (typeof e == "string")
      g = GE(
        e,
        i,
        oe.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Q:
          return e = an(31, i, t, u), e.elementType = Q, e.lanes = f, e;
        case w:
          return gi(i.children, u, f, t);
        case D:
          g = 8, u |= 24;
          break;
        case O:
          return e = an(12, i, t, u | 2), e.elementType = O, e.lanes = f, e;
        case X:
          return e = an(13, i, t, u), e.elementType = X, e.lanes = f, e;
        case K:
          return e = an(19, i, t, u), e.elementType = K, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case L:
                g = 10;
                break e;
              case B:
                g = 9;
                break e;
              case V:
                g = 11;
                break e;
              case ee:
                g = 14;
                break e;
              case A:
                g = 16, r = null;
                break e;
            }
          g = 29, i = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), r = null;
      }
    return t = an(g, i, t, u), t.elementType = e, t.type = r, t.lanes = f, t;
  }
  function gi(e, t, i, r) {
    return e = an(7, e, r, t), e.lanes = i, e;
  }
  function nc(e, t, i) {
    return e = an(6, e, null, t), e.lanes = i, e;
  }
  function Nm(e) {
    var t = an(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function ac(e, t, i) {
    return t = an(
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
  var zm = /* @__PURE__ */ new WeakMap();
  function mn(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = zm.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: _e(t)
      }, zm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: _e(t)
    };
  }
  var nl = [], al = 0, _s = null, Wl = 0, pn = [], yn = 0, ja = null, kn = 1, Pn = "";
  function ia(e, t) {
    nl[al++] = Wl, nl[al++] = _s, _s = e, Wl = t;
  }
  function Om(e, t, i) {
    pn[yn++] = kn, pn[yn++] = Pn, pn[yn++] = ja, ja = e;
    var r = kn;
    e = Pn;
    var u = 32 - Ht(r) - 1;
    r &= ~(1 << u), i += 1;
    var f = 32 - Ht(t) + u;
    if (30 < f) {
      var g = u - u % 5;
      f = (r & (1 << g) - 1).toString(32), r >>= g, u -= g, kn = 1 << 32 - Ht(t) + u | i << u | r, Pn = f + e;
    } else
      kn = 1 << f | i << u | r, Pn = e;
  }
  function ic(e) {
    e.return !== null && (ia(e, 1), Om(e, 1, 0));
  }
  function lc(e) {
    for (; e === _s; )
      _s = nl[--al], nl[al] = null, Wl = nl[--al], nl[al] = null;
    for (; e === ja; )
      ja = pn[--yn], pn[yn] = null, Pn = pn[--yn], pn[yn] = null, kn = pn[--yn], pn[yn] = null;
  }
  function _m(e, t) {
    pn[yn++] = kn, pn[yn++] = Pn, pn[yn++] = ja, kn = t.id, Pn = t.overflow, ja = e;
  }
  var zt = null, it = null, qe = !1, Da = null, gn = !1, rc = Error(s(519));
  function Na(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw er(mn(t, e)), rc;
  }
  function Lm(e) {
    var t = e.stateNode, i = e.type, r = e.memoizedProps;
    switch (t[fe] = e, t[de] = r, i) {
      case "dialog":
        Ve("cancel", t), Ve("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ve("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Er.length; i++)
          Ve(Er[i], t);
        break;
      case "source":
        Ve("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Ve("error", t), Ve("load", t);
        break;
      case "details":
        Ve("toggle", t);
        break;
      case "input":
        Ve("invalid", t), Kh(
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
        Ve("invalid", t);
        break;
      case "textarea":
        Ve("invalid", t), Ih(t, r.value, r.defaultValue, r.children);
    }
    i = r.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || r.suppressHydrationWarning === !0 || Jy(t.textContent, i) ? (r.popover != null && (Ve("beforetoggle", t), Ve("toggle", t)), r.onScroll != null && Ve("scroll", t), r.onScrollEnd != null && Ve("scrollend", t), r.onClick != null && (t.onclick = ta), t = !0) : t = !1, t || Na(e, !0);
  }
  function Um(e) {
    for (zt = e.return; zt; )
      switch (zt.tag) {
        case 5:
        case 31:
        case 13:
          gn = !1;
          return;
        case 27:
        case 3:
          gn = !0;
          return;
        default:
          zt = zt.return;
      }
  }
  function il(e) {
    if (e !== zt) return !1;
    if (!qe) return Um(e), qe = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || wf(e.type, e.memoizedProps)), i = !i), i && it && Na(e), Um(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      it = sg(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      it = sg(e);
    } else
      t === 27 ? (t = it, Fa(e.type) ? (e = Df, Df = null, it = e) : it = t) : it = zt ? bn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function vi() {
    it = zt = null, qe = !1;
  }
  function sc() {
    var e = Da;
    return e !== null && (Jt === null ? Jt = e : Jt.push.apply(
      Jt,
      e
    ), Da = null), e;
  }
  function er(e) {
    Da === null ? Da = [e] : Da.push(e);
  }
  var oc = j(null), bi = null, la = null;
  function za(e, t, i) {
    ie(oc, t._currentValue), t._currentValue = i;
  }
  function ra(e) {
    e._currentValue = oc.current, F(oc);
  }
  function uc(e, t, i) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function cc(e, t, i, r) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var f = u.dependencies;
      if (f !== null) {
        var g = u.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var E = f;
          f = u;
          for (var C = 0; C < t.length; C++)
            if (E.context === t[C]) {
              f.lanes |= i, E = f.alternate, E !== null && (E.lanes |= i), uc(
                f.return,
                i,
                e
              ), r || (g = null);
              break e;
            }
          f = E.next;
        }
      } else if (u.tag === 18) {
        if (g = u.return, g === null) throw Error(s(341));
        g.lanes |= i, f = g.alternate, f !== null && (f.lanes |= i), uc(g, i, e), g = null;
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
  function ll(e, t, i, r) {
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
          nn(u.pendingProps.value, g.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (u === De.current) {
        if (g = u.alternate, g === null) throw Error(s(387));
        g.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Mr) : e = [Mr]);
      }
      u = u.return;
    }
    e !== null && cc(
      t,
      e,
      i,
      r
    ), t.flags |= 262144;
  }
  function Ls(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!nn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Si(e) {
    bi = e, la = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ot(e) {
    return Vm(bi, e);
  }
  function Us(e, t) {
    return bi === null && Si(e), Vm(e, t);
  }
  function Vm(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, la === null) {
      if (e === null) throw Error(s(308));
      la = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else la = la.next = t;
    return i;
  }
  var qx = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(i, r) {
        e.push(r);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(i) {
        return i();
      });
    };
  }, kx = n.unstable_scheduleCallback, Px = n.unstable_NormalPriority, Et = {
    $$typeof: L,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function fc() {
    return {
      controller: new qx(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function tr(e) {
    e.refCount--, e.refCount === 0 && kx(Px, function() {
      e.controller.abort();
    });
  }
  var nr = null, dc = 0, rl = 0, sl = null;
  function Yx(e, t) {
    if (nr === null) {
      var i = nr = [];
      dc = 0, rl = yf(), sl = {
        status: "pending",
        value: void 0,
        then: function(r) {
          i.push(r);
        }
      };
    }
    return dc++, t.then(Bm, Bm), t;
  }
  function Bm() {
    if (--dc === 0 && nr !== null) {
      sl !== null && (sl.status = "fulfilled");
      var e = nr;
      nr = null, rl = 0, sl = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Gx(e, t) {
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
        r.status = "fulfilled", r.value = t;
        for (var u = 0; u < i.length; u++) (0, i[u])(t);
      },
      function(u) {
        for (r.status = "rejected", r.reason = u, u = 0; u < i.length; u++)
          (0, i[u])(void 0);
      }
    ), r;
  }
  var Hm = z.S;
  z.S = function(e, t) {
    Ey = Yt(), typeof t == "object" && t !== null && typeof t.then == "function" && Yx(e, t), Hm !== null && Hm(e, t);
  };
  var xi = j(null);
  function hc() {
    var e = xi.current;
    return e !== null ? e : et.pooledCache;
  }
  function Vs(e, t) {
    t === null ? ie(xi, xi.current) : ie(xi, t.pool);
  }
  function qm() {
    var e = hc();
    return e === null ? null : { parent: Et._currentValue, pool: e };
  }
  var ol = Error(s(460)), mc = Error(s(474)), Bs = Error(s(542)), Hs = { then: function() {
  } };
  function km(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Pm(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(ta, ta), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Gm(e), e;
      default:
        if (typeof t.status == "string") t.then(ta, ta);
        else {
          if (e = et, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, Gm(e), e;
        }
        throw Ti = t, ol;
    }
  }
  function Ei(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (Ti = i, ol) : i;
    }
  }
  var Ti = null;
  function Ym() {
    if (Ti === null) throw Error(s(459));
    var e = Ti;
    return Ti = null, e;
  }
  function Gm(e) {
    if (e === ol || e === Bs)
      throw Error(s(483));
  }
  var ul = null, ar = 0;
  function qs(e) {
    var t = ar;
    return ar += 1, ul === null && (ul = []), Pm(ul, e, t);
  }
  function ir(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function ks(e, t) {
    throw t.$$typeof === S ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Fm(e) {
    function t(U, N) {
      if (e) {
        var H = U.deletions;
        H === null ? (U.deletions = [N], U.flags |= 16) : H.push(N);
      }
    }
    function i(U, N) {
      if (!e) return null;
      for (; N !== null; )
        t(U, N), N = N.sibling;
      return null;
    }
    function r(U) {
      for (var N = /* @__PURE__ */ new Map(); U !== null; )
        U.key !== null ? N.set(U.key, U) : N.set(U.index, U), U = U.sibling;
      return N;
    }
    function u(U, N) {
      return U = aa(U, N), U.index = 0, U.sibling = null, U;
    }
    function f(U, N, H) {
      return U.index = H, e ? (H = U.alternate, H !== null ? (H = H.index, H < N ? (U.flags |= 67108866, N) : H) : (U.flags |= 67108866, N)) : (U.flags |= 1048576, N);
    }
    function g(U) {
      return e && U.alternate === null && (U.flags |= 67108866), U;
    }
    function E(U, N, H, I) {
      return N === null || N.tag !== 6 ? (N = nc(H, U.mode, I), N.return = U, N) : (N = u(N, H), N.return = U, N);
    }
    function C(U, N, H, I) {
      var Ee = H.type;
      return Ee === w ? $(
        U,
        N,
        H.props.children,
        I,
        H.key
      ) : N !== null && (N.elementType === Ee || typeof Ee == "object" && Ee !== null && Ee.$$typeof === A && Ei(Ee) === N.type) ? (N = u(N, H.props), ir(N, H), N.return = U, N) : (N = Os(
        H.type,
        H.key,
        H.props,
        null,
        U.mode,
        I
      ), ir(N, H), N.return = U, N);
    }
    function q(U, N, H, I) {
      return N === null || N.tag !== 4 || N.stateNode.containerInfo !== H.containerInfo || N.stateNode.implementation !== H.implementation ? (N = ac(H, U.mode, I), N.return = U, N) : (N = u(N, H.children || []), N.return = U, N);
    }
    function $(U, N, H, I, Ee) {
      return N === null || N.tag !== 7 ? (N = gi(
        H,
        U.mode,
        I,
        Ee
      ), N.return = U, N) : (N = u(N, H), N.return = U, N);
    }
    function W(U, N, H) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return N = nc(
          "" + N,
          U.mode,
          H
        ), N.return = U, N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case T:
            return H = Os(
              N.type,
              N.key,
              N.props,
              null,
              U.mode,
              H
            ), ir(H, N), H.return = U, H;
          case R:
            return N = ac(
              N,
              U.mode,
              H
            ), N.return = U, N;
          case A:
            return N = Ei(N), W(U, N, H);
        }
        if (Z(N) || J(N))
          return N = gi(
            N,
            U.mode,
            H,
            null
          ), N.return = U, N;
        if (typeof N.then == "function")
          return W(U, qs(N), H);
        if (N.$$typeof === L)
          return W(
            U,
            Us(U, N),
            H
          );
        ks(U, N);
      }
      return null;
    }
    function Y(U, N, H, I) {
      var Ee = N !== null ? N.key : null;
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return Ee !== null ? null : E(U, N, "" + H, I);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case T:
            return H.key === Ee ? C(U, N, H, I) : null;
          case R:
            return H.key === Ee ? q(U, N, H, I) : null;
          case A:
            return H = Ei(H), Y(U, N, H, I);
        }
        if (Z(H) || J(H))
          return Ee !== null ? null : $(U, N, H, I, null);
        if (typeof H.then == "function")
          return Y(
            U,
            N,
            qs(H),
            I
          );
        if (H.$$typeof === L)
          return Y(
            U,
            N,
            Us(U, H),
            I
          );
        ks(U, H);
      }
      return null;
    }
    function G(U, N, H, I, Ee) {
      if (typeof I == "string" && I !== "" || typeof I == "number" || typeof I == "bigint")
        return U = U.get(H) || null, E(N, U, "" + I, Ee);
      if (typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case T:
            return U = U.get(
              I.key === null ? H : I.key
            ) || null, C(N, U, I, Ee);
          case R:
            return U = U.get(
              I.key === null ? H : I.key
            ) || null, q(N, U, I, Ee);
          case A:
            return I = Ei(I), G(
              U,
              N,
              H,
              I,
              Ee
            );
        }
        if (Z(I) || J(I))
          return U = U.get(H) || null, $(N, U, I, Ee, null);
        if (typeof I.then == "function")
          return G(
            U,
            N,
            H,
            qs(I),
            Ee
          );
        if (I.$$typeof === L)
          return G(
            U,
            N,
            H,
            Us(N, I),
            Ee
          );
        ks(N, I);
      }
      return null;
    }
    function me(U, N, H, I) {
      for (var Ee = null, Pe = null, ve = N, je = N = 0, He = null; ve !== null && je < H.length; je++) {
        ve.index > je ? (He = ve, ve = null) : He = ve.sibling;
        var Ye = Y(
          U,
          ve,
          H[je],
          I
        );
        if (Ye === null) {
          ve === null && (ve = He);
          break;
        }
        e && ve && Ye.alternate === null && t(U, ve), N = f(Ye, N, je), Pe === null ? Ee = Ye : Pe.sibling = Ye, Pe = Ye, ve = He;
      }
      if (je === H.length)
        return i(U, ve), qe && ia(U, je), Ee;
      if (ve === null) {
        for (; je < H.length; je++)
          ve = W(U, H[je], I), ve !== null && (N = f(
            ve,
            N,
            je
          ), Pe === null ? Ee = ve : Pe.sibling = ve, Pe = ve);
        return qe && ia(U, je), Ee;
      }
      for (ve = r(ve); je < H.length; je++)
        He = G(
          ve,
          U,
          je,
          H[je],
          I
        ), He !== null && (e && He.alternate !== null && ve.delete(
          He.key === null ? je : He.key
        ), N = f(
          He,
          N,
          je
        ), Pe === null ? Ee = He : Pe.sibling = He, Pe = He);
      return e && ve.forEach(function(Ia) {
        return t(U, Ia);
      }), qe && ia(U, je), Ee;
    }
    function Ce(U, N, H, I) {
      if (H == null) throw Error(s(151));
      for (var Ee = null, Pe = null, ve = N, je = N = 0, He = null, Ye = H.next(); ve !== null && !Ye.done; je++, Ye = H.next()) {
        ve.index > je ? (He = ve, ve = null) : He = ve.sibling;
        var Ia = Y(U, ve, Ye.value, I);
        if (Ia === null) {
          ve === null && (ve = He);
          break;
        }
        e && ve && Ia.alternate === null && t(U, ve), N = f(Ia, N, je), Pe === null ? Ee = Ia : Pe.sibling = Ia, Pe = Ia, ve = He;
      }
      if (Ye.done)
        return i(U, ve), qe && ia(U, je), Ee;
      if (ve === null) {
        for (; !Ye.done; je++, Ye = H.next())
          Ye = W(U, Ye.value, I), Ye !== null && (N = f(Ye, N, je), Pe === null ? Ee = Ye : Pe.sibling = Ye, Pe = Ye);
        return qe && ia(U, je), Ee;
      }
      for (ve = r(ve); !Ye.done; je++, Ye = H.next())
        Ye = G(ve, U, je, Ye.value, I), Ye !== null && (e && Ye.alternate !== null && ve.delete(Ye.key === null ? je : Ye.key), N = f(Ye, N, je), Pe === null ? Ee = Ye : Pe.sibling = Ye, Pe = Ye);
      return e && ve.forEach(function(tT) {
        return t(U, tT);
      }), qe && ia(U, je), Ee;
    }
    function Je(U, N, H, I) {
      if (typeof H == "object" && H !== null && H.type === w && H.key === null && (H = H.props.children), typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case T:
            e: {
              for (var Ee = H.key; N !== null; ) {
                if (N.key === Ee) {
                  if (Ee = H.type, Ee === w) {
                    if (N.tag === 7) {
                      i(
                        U,
                        N.sibling
                      ), I = u(
                        N,
                        H.props.children
                      ), I.return = U, U = I;
                      break e;
                    }
                  } else if (N.elementType === Ee || typeof Ee == "object" && Ee !== null && Ee.$$typeof === A && Ei(Ee) === N.type) {
                    i(
                      U,
                      N.sibling
                    ), I = u(N, H.props), ir(I, H), I.return = U, U = I;
                    break e;
                  }
                  i(U, N);
                  break;
                } else t(U, N);
                N = N.sibling;
              }
              H.type === w ? (I = gi(
                H.props.children,
                U.mode,
                I,
                H.key
              ), I.return = U, U = I) : (I = Os(
                H.type,
                H.key,
                H.props,
                null,
                U.mode,
                I
              ), ir(I, H), I.return = U, U = I);
            }
            return g(U);
          case R:
            e: {
              for (Ee = H.key; N !== null; ) {
                if (N.key === Ee)
                  if (N.tag === 4 && N.stateNode.containerInfo === H.containerInfo && N.stateNode.implementation === H.implementation) {
                    i(
                      U,
                      N.sibling
                    ), I = u(N, H.children || []), I.return = U, U = I;
                    break e;
                  } else {
                    i(U, N);
                    break;
                  }
                else t(U, N);
                N = N.sibling;
              }
              I = ac(H, U.mode, I), I.return = U, U = I;
            }
            return g(U);
          case A:
            return H = Ei(H), Je(
              U,
              N,
              H,
              I
            );
        }
        if (Z(H))
          return me(
            U,
            N,
            H,
            I
          );
        if (J(H)) {
          if (Ee = J(H), typeof Ee != "function") throw Error(s(150));
          return H = Ee.call(H), Ce(
            U,
            N,
            H,
            I
          );
        }
        if (typeof H.then == "function")
          return Je(
            U,
            N,
            qs(H),
            I
          );
        if (H.$$typeof === L)
          return Je(
            U,
            N,
            Us(U, H),
            I
          );
        ks(U, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, N !== null && N.tag === 6 ? (i(U, N.sibling), I = u(N, H), I.return = U, U = I) : (i(U, N), I = nc(H, U.mode, I), I.return = U, U = I), g(U)) : i(U, N);
    }
    return function(U, N, H, I) {
      try {
        ar = 0;
        var Ee = Je(
          U,
          N,
          H,
          I
        );
        return ul = null, Ee;
      } catch (ve) {
        if (ve === ol || ve === Bs) throw ve;
        var Pe = an(29, ve, null, U.mode);
        return Pe.lanes = I, Pe.return = U, Pe;
      } finally {
      }
    };
  }
  var Ri = Fm(!0), $m = Fm(!1), Oa = !1;
  function pc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function yc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function _a(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function La(e, t, i) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Ge & 2) !== 0) {
      var u = r.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), r.pending = t, t = zs(e), jm(e, null, i), t;
    }
    return Ns(e, r, t, i), zs(e);
  }
  function lr(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, i |= r, t.lanes = i, bs(e, i);
    }
  }
  function gc(e, t) {
    var i = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, i === r)) {
      var u = null, f = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var g = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          f === null ? u = f = g : f = f.next = g, i = i.next;
        } while (i !== null);
        f === null ? u = f = t : f = f.next = t;
      } else u = f = t;
      i = {
        baseState: r.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: f,
        shared: r.shared,
        callbacks: r.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = t : e.next = t, i.lastBaseUpdate = t;
  }
  var vc = !1;
  function rr() {
    if (vc) {
      var e = sl;
      if (e !== null) throw e;
    }
  }
  function sr(e, t, i, r) {
    vc = !1;
    var u = e.updateQueue;
    Oa = !1;
    var f = u.firstBaseUpdate, g = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var C = E, q = C.next;
      C.next = null, g === null ? f = q : g.next = q, g = C;
      var $ = e.alternate;
      $ !== null && ($ = $.updateQueue, E = $.lastBaseUpdate, E !== g && (E === null ? $.firstBaseUpdate = q : E.next = q, $.lastBaseUpdate = C));
    }
    if (f !== null) {
      var W = u.baseState;
      g = 0, $ = q = C = null, E = f;
      do {
        var Y = E.lane & -536870913, G = Y !== E.lane;
        if (G ? (Be & Y) === Y : (r & Y) === Y) {
          Y !== 0 && Y === rl && (vc = !0), $ !== null && ($ = $.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var me = e, Ce = E;
            Y = t;
            var Je = i;
            switch (Ce.tag) {
              case 1:
                if (me = Ce.payload, typeof me == "function") {
                  W = me.call(Je, W, Y);
                  break e;
                }
                W = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = Ce.payload, Y = typeof me == "function" ? me.call(Je, W, Y) : me, Y == null) break e;
                W = b({}, W, Y);
                break e;
              case 2:
                Oa = !0;
            }
          }
          Y = E.callback, Y !== null && (e.flags |= 64, G && (e.flags |= 8192), G = u.callbacks, G === null ? u.callbacks = [Y] : G.push(Y));
        } else
          G = {
            lane: Y,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, $ === null ? (q = $ = G, C = W) : $ = $.next = G, g |= Y;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          G = E, E = G.next, G.next = null, u.lastBaseUpdate = G, u.shared.pending = null;
        }
      } while (!0);
      $ === null && (C = W), u.baseState = C, u.firstBaseUpdate = q, u.lastBaseUpdate = $, f === null && (u.shared.lanes = 0), qa |= g, e.lanes = g, e.memoizedState = W;
    }
  }
  function Xm(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function Km(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Xm(i[e], t);
  }
  var cl = j(null), Ps = j(0);
  function Qm(e, t) {
    e = pa, ie(Ps, e), ie(cl, t), pa = e | t.baseLanes;
  }
  function bc() {
    ie(Ps, pa), ie(cl, cl.current);
  }
  function Sc() {
    pa = Ps.current, F(cl), F(Ps);
  }
  var ln = j(null), vn = null;
  function Ua(e) {
    var t = e.alternate;
    ie(gt, gt.current & 1), ie(ln, e), vn === null && (t === null || cl.current !== null || t.memoizedState !== null) && (vn = e);
  }
  function xc(e) {
    ie(gt, gt.current), ie(ln, e), vn === null && (vn = e);
  }
  function Im(e) {
    e.tag === 22 ? (ie(gt, gt.current), ie(ln, e), vn === null && (vn = e)) : Va();
  }
  function Va() {
    ie(gt, gt.current), ie(ln, ln.current);
  }
  function rn(e) {
    F(ln), vn === e && (vn = null), F(gt);
  }
  var gt = j(0);
  function Ys(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Af(i) || jf(i)))
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
  var sa = 0, Ae = null, Ie = null, Tt = null, Gs = !1, fl = !1, wi = !1, Fs = 0, or = 0, dl = null, Fx = 0;
  function ht() {
    throw Error(s(321));
  }
  function Ec(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!nn(e[i], t[i])) return !1;
    return !0;
  }
  function Tc(e, t, i, r, u, f) {
    return sa = f, Ae = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, z.H = e === null || e.memoizedState === null ? Op : Bc, wi = !1, f = i(r, u), wi = !1, fl && (f = Jm(
      t,
      i,
      r,
      u
    )), Zm(e), f;
  }
  function Zm(e) {
    z.H = fr;
    var t = Ie !== null && Ie.next !== null;
    if (sa = 0, Tt = Ie = Ae = null, Gs = !1, or = 0, dl = null, t) throw Error(s(300));
    e === null || Rt || (e = e.dependencies, e !== null && Ls(e) && (Rt = !0));
  }
  function Jm(e, t, i, r) {
    Ae = e;
    var u = 0;
    do {
      if (fl && (dl = null), or = 0, fl = !1, 25 <= u) throw Error(s(301));
      if (u += 1, Tt = Ie = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      z.H = _p, f = t(i, r);
    } while (fl);
    return f;
  }
  function $x() {
    var e = z.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? ur(t) : t, e = e.useState()[0], (Ie !== null ? Ie.memoizedState : null) !== e && (Ae.flags |= 1024), t;
  }
  function Rc() {
    var e = Fs !== 0;
    return Fs = 0, e;
  }
  function wc(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function Cc(e) {
    if (Gs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Gs = !1;
    }
    sa = 0, Tt = Ie = Ae = null, fl = !1, or = Fs = 0, dl = null;
  }
  function Ft() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Tt === null ? Ae.memoizedState = Tt = e : Tt = Tt.next = e, Tt;
  }
  function vt() {
    if (Ie === null) {
      var e = Ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ie.next;
    var t = Tt === null ? Ae.memoizedState : Tt.next;
    if (t !== null)
      Tt = t, Ie = e;
    else {
      if (e === null)
        throw Ae.alternate === null ? Error(s(467)) : Error(s(310));
      Ie = e, e = {
        memoizedState: Ie.memoizedState,
        baseState: Ie.baseState,
        baseQueue: Ie.baseQueue,
        queue: Ie.queue,
        next: null
      }, Tt === null ? Ae.memoizedState = Tt = e : Tt = Tt.next = e;
    }
    return Tt;
  }
  function $s() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ur(e) {
    var t = or;
    return or += 1, dl === null && (dl = []), e = Pm(dl, e, t), t = Ae, (Tt === null ? t.memoizedState : Tt.next) === null && (t = t.alternate, z.H = t === null || t.memoizedState === null ? Op : Bc), e;
  }
  function Xs(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return ur(e);
      if (e.$$typeof === L) return Ot(e);
    }
    throw Error(s(438, String(e)));
  }
  function Mc(e) {
    var t = null, i = Ae.updateQueue;
    if (i !== null && (t = i.memoCache), t == null) {
      var r = Ae.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
        data: r.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = $s(), Ae.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), r = 0; r < e; r++)
        i[r] = te;
    return t.index++, i;
  }
  function oa(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ks(e) {
    var t = vt();
    return Ac(t, Ie, e);
  }
  function Ac(e, t, i) {
    var r = e.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = i;
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
      var E = g = null, C = null, q = t, $ = !1;
      do {
        var W = q.lane & -536870913;
        if (W !== q.lane ? (Be & W) === W : (sa & W) === W) {
          var Y = q.revertLane;
          if (Y === 0)
            C !== null && (C = C.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }), W === rl && ($ = !0);
          else if ((sa & Y) === Y) {
            q = q.next, Y === rl && ($ = !0);
            continue;
          } else
            W = {
              lane: 0,
              revertLane: q.revertLane,
              gesture: null,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }, C === null ? (E = C = W, g = f) : C = C.next = W, Ae.lanes |= Y, qa |= Y;
          W = q.action, wi && i(f, W), f = q.hasEagerState ? q.eagerState : i(f, W);
        } else
          Y = {
            lane: W,
            revertLane: q.revertLane,
            gesture: q.gesture,
            action: q.action,
            hasEagerState: q.hasEagerState,
            eagerState: q.eagerState,
            next: null
          }, C === null ? (E = C = Y, g = f) : C = C.next = Y, Ae.lanes |= W, qa |= W;
        q = q.next;
      } while (q !== null && q !== t);
      if (C === null ? g = f : C.next = E, !nn(f, e.memoizedState) && (Rt = !0, $ && (i = sl, i !== null)))
        throw i;
      e.memoizedState = f, e.baseState = g, e.baseQueue = C, r.lastRenderedState = f;
    }
    return u === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function jc(e) {
    var t = vt(), i = t.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var r = i.dispatch, u = i.pending, f = t.memoizedState;
    if (u !== null) {
      i.pending = null;
      var g = u = u.next;
      do
        f = e(f, g.action), g = g.next;
      while (g !== u);
      nn(f, t.memoizedState) || (Rt = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), i.lastRenderedState = f;
    }
    return [f, r];
  }
  function Wm(e, t, i) {
    var r = Ae, u = vt(), f = qe;
    if (f) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = t();
    var g = !nn(
      (Ie || u).memoizedState,
      i
    );
    if (g && (u.memoizedState = i, Rt = !0), u = u.queue, zc(np.bind(null, r, u, e), [
      e
    ]), u.getSnapshot !== t || g || Tt !== null && Tt.memoizedState.tag & 1) {
      if (r.flags |= 2048, hl(
        9,
        { destroy: void 0 },
        tp.bind(
          null,
          r,
          u,
          i,
          t
        ),
        null
      ), et === null) throw Error(s(349));
      f || (sa & 127) !== 0 || ep(r, t, i);
    }
    return i;
  }
  function ep(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = Ae.updateQueue, t === null ? (t = $s(), Ae.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function tp(e, t, i, r) {
    t.value = i, t.getSnapshot = r, ap(t) && ip(e);
  }
  function np(e, t, i) {
    return i(function() {
      ap(t) && ip(e);
    });
  }
  function ap(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !nn(e, i);
    } catch {
      return !0;
    }
  }
  function ip(e) {
    var t = yi(e, 2);
    t !== null && Wt(t, e, 2);
  }
  function Dc(e) {
    var t = Ft();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), wi) {
        jt(!0);
        try {
          i();
        } finally {
          jt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: oa,
      lastRenderedState: e
    }, t;
  }
  function lp(e, t, i, r) {
    return e.baseState = i, Ac(
      e,
      Ie,
      typeof r == "function" ? r : oa
    );
  }
  function Xx(e, t, i, r, u) {
    if (Zs(e)) throw Error(s(485));
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
      z.T !== null ? i(!0) : f.isTransition = !1, r(f), i = t.pending, i === null ? (f.next = t.pending = f, rp(t, f)) : (f.next = i.next, t.pending = i.next = f);
    }
  }
  function rp(e, t) {
    var i = t.action, r = t.payload, u = e.state;
    if (t.isTransition) {
      var f = z.T, g = {};
      z.T = g;
      try {
        var E = i(u, r), C = z.S;
        C !== null && C(g, E), sp(e, t, E);
      } catch (q) {
        Nc(e, t, q);
      } finally {
        f !== null && g.types !== null && (f.types = g.types), z.T = f;
      }
    } else
      try {
        f = i(u, r), sp(e, t, f);
      } catch (q) {
        Nc(e, t, q);
      }
  }
  function sp(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(r) {
        op(e, t, r);
      },
      function(r) {
        return Nc(e, t, r);
      }
    ) : op(e, t, i);
  }
  function op(e, t, i) {
    t.status = "fulfilled", t.value = i, up(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, rp(e, i)));
  }
  function Nc(e, t, i) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        t.status = "rejected", t.reason = i, up(t), t = t.next;
      while (t !== r);
    }
    e.action = null;
  }
  function up(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function cp(e, t) {
    return t;
  }
  function fp(e, t) {
    if (qe) {
      var i = et.formState;
      if (i !== null) {
        e: {
          var r = Ae;
          if (qe) {
            if (it) {
              t: {
                for (var u = it, f = gn; u.nodeType !== 8; ) {
                  if (!f) {
                    u = null;
                    break t;
                  }
                  if (u = bn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                f = u.data, u = f === "F!" || f === "F" ? u : null;
              }
              if (u) {
                it = bn(
                  u.nextSibling
                ), r = u.data === "F!";
                break e;
              }
            }
            Na(r);
          }
          r = !1;
        }
        r && (t = i[0]);
      }
    }
    return i = Ft(), i.memoizedState = i.baseState = t, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: cp,
      lastRenderedState: t
    }, i.queue = r, i = Dp.bind(
      null,
      Ae,
      r
    ), r.dispatch = i, r = Dc(!1), f = Vc.bind(
      null,
      Ae,
      !1,
      r.queue
    ), r = Ft(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = u, i = Xx.bind(
      null,
      Ae,
      u,
      f,
      i
    ), u.dispatch = i, r.memoizedState = e, [t, i, !1];
  }
  function dp(e) {
    var t = vt();
    return hp(t, Ie, e);
  }
  function hp(e, t, i) {
    if (t = Ac(
      e,
      t,
      cp
    )[0], e = Ks(oa)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var r = ur(t);
      } catch (g) {
        throw g === ol ? Bs : g;
      }
    else r = t;
    t = vt();
    var u = t.queue, f = u.dispatch;
    return i !== t.memoizedState && (Ae.flags |= 2048, hl(
      9,
      { destroy: void 0 },
      Kx.bind(null, u, i),
      null
    )), [r, f, e];
  }
  function Kx(e, t) {
    e.action = t;
  }
  function mp(e) {
    var t = vt(), i = Ie;
    if (i !== null)
      return hp(t, i, e);
    vt(), t = t.memoizedState, i = vt();
    var r = i.queue.dispatch;
    return i.memoizedState = e, [t, r, !1];
  }
  function hl(e, t, i, r) {
    return e = { tag: e, create: i, deps: r, inst: t, next: null }, t = Ae.updateQueue, t === null && (t = $s(), Ae.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (r = i.next, i.next = e, e.next = r, t.lastEffect = e), e;
  }
  function pp() {
    return vt().memoizedState;
  }
  function Qs(e, t, i, r) {
    var u = Ft();
    Ae.flags |= e, u.memoizedState = hl(
      1 | t,
      { destroy: void 0 },
      i,
      r === void 0 ? null : r
    );
  }
  function Is(e, t, i, r) {
    var u = vt();
    r = r === void 0 ? null : r;
    var f = u.memoizedState.inst;
    Ie !== null && r !== null && Ec(r, Ie.memoizedState.deps) ? u.memoizedState = hl(t, f, i, r) : (Ae.flags |= e, u.memoizedState = hl(
      1 | t,
      f,
      i,
      r
    ));
  }
  function yp(e, t) {
    Qs(8390656, 8, e, t);
  }
  function zc(e, t) {
    Is(2048, 8, e, t);
  }
  function Qx(e) {
    Ae.flags |= 4;
    var t = Ae.updateQueue;
    if (t === null)
      t = $s(), Ae.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function gp(e) {
    var t = vt().memoizedState;
    return Qx({ ref: t, nextImpl: e }), function() {
      if ((Ge & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function vp(e, t) {
    return Is(4, 2, e, t);
  }
  function bp(e, t) {
    return Is(4, 4, e, t);
  }
  function Sp(e, t) {
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
  function xp(e, t, i) {
    i = i != null ? i.concat([e]) : null, Is(4, 4, Sp.bind(null, t, e), i);
  }
  function Oc() {
  }
  function Ep(e, t) {
    var i = vt();
    t = t === void 0 ? null : t;
    var r = i.memoizedState;
    return t !== null && Ec(t, r[1]) ? r[0] : (i.memoizedState = [e, t], e);
  }
  function Tp(e, t) {
    var i = vt();
    t = t === void 0 ? null : t;
    var r = i.memoizedState;
    if (t !== null && Ec(t, r[1]))
      return r[0];
    if (r = e(), wi) {
      jt(!0);
      try {
        e();
      } finally {
        jt(!1);
      }
    }
    return i.memoizedState = [r, t], r;
  }
  function _c(e, t, i) {
    return i === void 0 || (sa & 1073741824) !== 0 && (Be & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = Ry(), Ae.lanes |= e, qa |= e, i);
  }
  function Rp(e, t, i, r) {
    return nn(i, t) ? i : cl.current !== null ? (e = _c(e, i, r), nn(e, t) || (Rt = !0), e) : (sa & 42) === 0 || (sa & 1073741824) !== 0 && (Be & 261930) === 0 ? (Rt = !0, e.memoizedState = i) : (e = Ry(), Ae.lanes |= e, qa |= e, t);
  }
  function wp(e, t, i, r, u) {
    var f = ne.p;
    ne.p = f !== 0 && 8 > f ? f : 8;
    var g = z.T, E = {};
    z.T = E, Vc(e, !1, t, i);
    try {
      var C = u(), q = z.S;
      if (q !== null && q(E, C), C !== null && typeof C == "object" && typeof C.then == "function") {
        var $ = Gx(
          C,
          r
        );
        cr(
          e,
          t,
          $,
          un(e)
        );
      } else
        cr(
          e,
          t,
          r,
          un(e)
        );
    } catch (W) {
      cr(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: W },
        un()
      );
    } finally {
      ne.p = f, g !== null && E.types !== null && (g.types = E.types), z.T = g;
    }
  }
  function Ix() {
  }
  function Lc(e, t, i, r) {
    if (e.tag !== 5) throw Error(s(476));
    var u = Cp(e).queue;
    wp(
      e,
      u,
      t,
      se,
      i === null ? Ix : function() {
        return Mp(e), i(r);
      }
    );
  }
  function Cp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: se,
      baseState: se,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: oa,
        lastRenderedState: se
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
        lastRenderedReducer: oa,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Mp(e) {
    var t = Cp(e);
    t.next === null && (t = e.alternate.memoizedState), cr(
      e,
      t.next.queue,
      {},
      un()
    );
  }
  function Uc() {
    return Ot(Mr);
  }
  function Ap() {
    return vt().memoizedState;
  }
  function jp() {
    return vt().memoizedState;
  }
  function Zx(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = un();
          e = _a(i);
          var r = La(t, e, i);
          r !== null && (Wt(r, t, i), lr(r, t, i)), t = { cache: fc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Jx(e, t, i) {
    var r = un();
    i = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Zs(e) ? Np(t, i) : (i = ec(e, t, i, r), i !== null && (Wt(i, e, r), zp(i, t, r)));
  }
  function Dp(e, t, i) {
    var r = un();
    cr(e, t, i, r);
  }
  function cr(e, t, i, r) {
    var u = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Zs(e)) Np(t, u);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null))
        try {
          var g = t.lastRenderedState, E = f(g, i);
          if (u.hasEagerState = !0, u.eagerState = E, nn(E, g))
            return Ns(e, t, u, 0), et === null && Ds(), !1;
        } catch {
        } finally {
        }
      if (i = ec(e, t, u, r), i !== null)
        return Wt(i, e, r), zp(i, t, r), !0;
    }
    return !1;
  }
  function Vc(e, t, i, r) {
    if (r = {
      lane: 2,
      revertLane: yf(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Zs(e)) {
      if (t) throw Error(s(479));
    } else
      t = ec(
        e,
        i,
        r,
        2
      ), t !== null && Wt(t, e, 2);
  }
  function Zs(e) {
    var t = e.alternate;
    return e === Ae || t !== null && t === Ae;
  }
  function Np(e, t) {
    fl = Gs = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function zp(e, t, i) {
    if ((i & 4194048) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, i |= r, t.lanes = i, bs(e, i);
    }
  }
  var fr = {
    readContext: Ot,
    use: Xs,
    useCallback: ht,
    useContext: ht,
    useEffect: ht,
    useImperativeHandle: ht,
    useLayoutEffect: ht,
    useInsertionEffect: ht,
    useMemo: ht,
    useReducer: ht,
    useRef: ht,
    useState: ht,
    useDebugValue: ht,
    useDeferredValue: ht,
    useTransition: ht,
    useSyncExternalStore: ht,
    useId: ht,
    useHostTransitionStatus: ht,
    useFormState: ht,
    useActionState: ht,
    useOptimistic: ht,
    useMemoCache: ht,
    useCacheRefresh: ht
  };
  fr.useEffectEvent = ht;
  var Op = {
    readContext: Ot,
    use: Xs,
    useCallback: function(e, t) {
      return Ft().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Ot,
    useEffect: yp,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, Qs(
        4194308,
        4,
        Sp.bind(null, t, e),
        i
      );
    },
    useLayoutEffect: function(e, t) {
      return Qs(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Qs(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var i = Ft();
      t = t === void 0 ? null : t;
      var r = e();
      if (wi) {
        jt(!0);
        try {
          e();
        } finally {
          jt(!1);
        }
      }
      return i.memoizedState = [r, t], r;
    },
    useReducer: function(e, t, i) {
      var r = Ft();
      if (i !== void 0) {
        var u = i(t);
        if (wi) {
          jt(!0);
          try {
            i(t);
          } finally {
            jt(!1);
          }
        }
      } else u = t;
      return r.memoizedState = r.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, r.queue = e, e = e.dispatch = Jx.bind(
        null,
        Ae,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var t = Ft();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Dc(e);
      var t = e.queue, i = Dp.bind(null, Ae, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, t) {
      var i = Ft();
      return _c(i, e, t);
    },
    useTransition: function() {
      var e = Dc(!1);
      return e = wp.bind(
        null,
        Ae,
        e.queue,
        !0,
        !1
      ), Ft().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var r = Ae, u = Ft();
      if (qe) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = t(), et === null)
          throw Error(s(349));
        (Be & 127) !== 0 || ep(r, t, i);
      }
      u.memoizedState = i;
      var f = { value: i, getSnapshot: t };
      return u.queue = f, yp(np.bind(null, r, f, e), [
        e
      ]), r.flags |= 2048, hl(
        9,
        { destroy: void 0 },
        tp.bind(
          null,
          r,
          f,
          i,
          t
        ),
        null
      ), i;
    },
    useId: function() {
      var e = Ft(), t = et.identifierPrefix;
      if (qe) {
        var i = Pn, r = kn;
        i = (r & ~(1 << 32 - Ht(r) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = Fs++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = Fx++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Uc,
    useFormState: fp,
    useActionState: fp,
    useOptimistic: function(e) {
      var t = Ft();
      t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = i, t = Vc.bind(
        null,
        Ae,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: Mc,
    useCacheRefresh: function() {
      return Ft().memoizedState = Zx.bind(
        null,
        Ae
      );
    },
    useEffectEvent: function(e) {
      var t = Ft(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((Ge & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Bc = {
    readContext: Ot,
    use: Xs,
    useCallback: Ep,
    useContext: Ot,
    useEffect: zc,
    useImperativeHandle: xp,
    useInsertionEffect: vp,
    useLayoutEffect: bp,
    useMemo: Tp,
    useReducer: Ks,
    useRef: pp,
    useState: function() {
      return Ks(oa);
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, t) {
      var i = vt();
      return Rp(
        i,
        Ie.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ks(oa)[0], t = vt().memoizedState;
      return [
        typeof e == "boolean" ? e : ur(e),
        t
      ];
    },
    useSyncExternalStore: Wm,
    useId: Ap,
    useHostTransitionStatus: Uc,
    useFormState: dp,
    useActionState: dp,
    useOptimistic: function(e, t) {
      var i = vt();
      return lp(i, Ie, e, t);
    },
    useMemoCache: Mc,
    useCacheRefresh: jp
  };
  Bc.useEffectEvent = gp;
  var _p = {
    readContext: Ot,
    use: Xs,
    useCallback: Ep,
    useContext: Ot,
    useEffect: zc,
    useImperativeHandle: xp,
    useInsertionEffect: vp,
    useLayoutEffect: bp,
    useMemo: Tp,
    useReducer: jc,
    useRef: pp,
    useState: function() {
      return jc(oa);
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, t) {
      var i = vt();
      return Ie === null ? _c(i, e, t) : Rp(
        i,
        Ie.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = jc(oa)[0], t = vt().memoizedState;
      return [
        typeof e == "boolean" ? e : ur(e),
        t
      ];
    },
    useSyncExternalStore: Wm,
    useId: Ap,
    useHostTransitionStatus: Uc,
    useFormState: mp,
    useActionState: mp,
    useOptimistic: function(e, t) {
      var i = vt();
      return Ie !== null ? lp(i, Ie, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Mc,
    useCacheRefresh: jp
  };
  _p.useEffectEvent = gp;
  function Hc(e, t, i, r) {
    t = e.memoizedState, i = i(r, t), i = i == null ? t : b({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var qc = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var r = un(), u = _a(r);
      u.payload = t, i != null && (u.callback = i), t = La(e, u, r), t !== null && (Wt(t, e, r), lr(t, e, r));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var r = un(), u = _a(r);
      u.tag = 1, u.payload = t, i != null && (u.callback = i), t = La(e, u, r), t !== null && (Wt(t, e, r), lr(t, e, r));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = un(), r = _a(i);
      r.tag = 2, t != null && (r.callback = t), t = La(e, r, i), t !== null && (Wt(t, e, i), lr(t, e, i));
    }
  };
  function Lp(e, t, i, r, u, f, g) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, f, g) : t.prototype && t.prototype.isPureReactComponent ? !Zl(i, r) || !Zl(u, f) : !0;
  }
  function Up(e, t, i, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, r), t.state !== e && qc.enqueueReplaceState(t, t.state, null);
  }
  function Ci(e, t) {
    var i = t;
    if ("ref" in t) {
      i = {};
      for (var r in t)
        r !== "ref" && (i[r] = t[r]);
    }
    if (e = e.defaultProps) {
      i === t && (i = b({}, i));
      for (var u in e)
        i[u] === void 0 && (i[u] = e[u]);
    }
    return i;
  }
  function Vp(e) {
    js(e);
  }
  function Bp(e) {
    console.error(e);
  }
  function Hp(e) {
    js(e);
  }
  function Js(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function qp(e, t, i) {
    try {
      var r = e.onCaughtError;
      r(i.value, {
        componentStack: i.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function kc(e, t, i) {
    return i = _a(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Js(e, t);
    }, i;
  }
  function kp(e) {
    return e = _a(e), e.tag = 3, e;
  }
  function Pp(e, t, i, r) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = r.value;
      e.payload = function() {
        return u(f);
      }, e.callback = function() {
        qp(t, i, r);
      };
    }
    var g = i.stateNode;
    g !== null && typeof g.componentDidCatch == "function" && (e.callback = function() {
      qp(t, i, r), typeof u != "function" && (ka === null ? ka = /* @__PURE__ */ new Set([this]) : ka.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function Wx(e, t, i, r, u) {
    if (i.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (t = i.alternate, t !== null && ll(
        t,
        i,
        u,
        !0
      ), i = ln.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return vn === null ? co() : i.alternate === null && mt === 0 && (mt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, r === Hs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), hf(e, r, u)), !1;
          case 22:
            return i.flags |= 65536, r === Hs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : i.add(r)), hf(e, r, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return hf(e, r, u), co(), !1;
    }
    if (qe)
      return t = ln.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, r !== rc && (e = Error(s(422), { cause: r }), er(mn(e, i)))) : (r !== rc && (t = Error(s(423), {
        cause: r
      }), er(
        mn(t, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, r = mn(r, i), u = kc(
        e.stateNode,
        r,
        u
      ), gc(e, u), mt !== 4 && (mt = 2)), !1;
    var f = Error(s(520), { cause: r });
    if (f = mn(f, i), br === null ? br = [f] : br.push(f), mt !== 4 && (mt = 2), t === null) return !0;
    r = mn(r, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = kc(i.stateNode, r, e), gc(i, e), !1;
        case 1:
          if (t = i.type, f = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (ka === null || !ka.has(f))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = kp(u), Pp(
              u,
              e,
              i,
              r
            ), gc(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Pc = Error(s(461)), Rt = !1;
  function _t(e, t, i, r) {
    t.child = e === null ? $m(t, null, i, r) : Ri(
      t,
      e.child,
      i,
      r
    );
  }
  function Yp(e, t, i, r, u) {
    i = i.render;
    var f = t.ref;
    if ("ref" in r) {
      var g = {};
      for (var E in r)
        E !== "ref" && (g[E] = r[E]);
    } else g = r;
    return Si(t), r = Tc(
      e,
      t,
      i,
      g,
      f,
      u
    ), E = Rc(), e !== null && !Rt ? (wc(e, t, u), ua(e, t, u)) : (qe && E && ic(t), t.flags |= 1, _t(e, t, r, u), t.child);
  }
  function Gp(e, t, i, r, u) {
    if (e === null) {
      var f = i.type;
      return typeof f == "function" && !tc(f) && f.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = f, Fp(
        e,
        t,
        f,
        r,
        u
      )) : (e = Os(
        i.type,
        null,
        r,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (f = e.child, !Ic(e, u)) {
      var g = f.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Zl, i(g, r) && e.ref === t.ref)
        return ua(e, t, u);
    }
    return t.flags |= 1, e = aa(f, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Fp(e, t, i, r, u) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (Zl(f, r) && e.ref === t.ref)
        if (Rt = !1, t.pendingProps = r = f, Ic(e, u))
          (e.flags & 131072) !== 0 && (Rt = !0);
        else
          return t.lanes = e.lanes, ua(e, t, u);
    }
    return Yc(
      e,
      t,
      i,
      r,
      u
    );
  }
  function $p(e, t, i, r) {
    var u = r.children, f = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), r.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | i : i, e !== null) {
          for (r = t.child = e.child, u = 0; r !== null; )
            u = u | r.lanes | r.childLanes, r = r.sibling;
          r = u & ~f;
        } else r = 0, t.child = null;
        return Xp(
          e,
          t,
          f,
          i,
          r
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Vs(
          t,
          f !== null ? f.cachePool : null
        ), f !== null ? Qm(t, f) : bc(), Im(t);
      else
        return r = t.lanes = 536870912, Xp(
          e,
          t,
          f !== null ? f.baseLanes | i : i,
          i,
          r
        );
    } else
      f !== null ? (Vs(t, f.cachePool), Qm(t, f), Va(), t.memoizedState = null) : (e !== null && Vs(t, null), bc(), Va());
    return _t(e, t, u, i), t.child;
  }
  function dr(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Xp(e, t, i, r, u) {
    var f = hc();
    return f = f === null ? null : { parent: Et._currentValue, pool: f }, t.memoizedState = {
      baseLanes: i,
      cachePool: f
    }, e !== null && Vs(t, null), bc(), Im(t), e !== null && ll(e, t, r, !0), t.childLanes = u, null;
  }
  function Ws(e, t) {
    return t = to(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Kp(e, t, i) {
    return Ri(t, e.child, null, i), e = Ws(t, t.pendingProps), e.flags |= 2, rn(t), t.memoizedState = null, e;
  }
  function eE(e, t, i) {
    var r = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (qe) {
        if (r.mode === "hidden")
          return e = Ws(t, r), t.lanes = 536870912, dr(null, e);
        if (xc(t), (e = it) ? (e = rg(
          e,
          gn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ja !== null ? { id: kn, overflow: Pn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Nm(e), i.return = t, t.child = i, zt = t, it = null)) : e = null, e === null) throw Na(t);
        return t.lanes = 536870912, null;
      }
      return Ws(t, r);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var g = f.dehydrated;
      if (xc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Kp(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (Rt || ll(e, t, i, !1), u = (i & e.childLanes) !== 0, Rt || u) {
        if (r = et, r !== null && (g = M(r, i), g !== 0 && g !== f.retryLane))
          throw f.retryLane = g, yi(e, g), Wt(r, e, g), Pc;
        co(), t = Kp(
          e,
          t,
          i
        );
      } else
        e = f.treeContext, it = bn(g.nextSibling), zt = t, qe = !0, Da = null, gn = !1, e !== null && _m(t, e), t = Ws(t, r), t.flags |= 4096;
      return t;
    }
    return e = aa(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function eo(e, t) {
    var i = t.ref;
    if (i === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (e === null || e.ref !== i) && (t.flags |= 4194816);
    }
  }
  function Yc(e, t, i, r, u) {
    return Si(t), i = Tc(
      e,
      t,
      i,
      r,
      void 0,
      u
    ), r = Rc(), e !== null && !Rt ? (wc(e, t, u), ua(e, t, u)) : (qe && r && ic(t), t.flags |= 1, _t(e, t, i, u), t.child);
  }
  function Qp(e, t, i, r, u, f) {
    return Si(t), t.updateQueue = null, i = Jm(
      t,
      r,
      i,
      u
    ), Zm(e), r = Rc(), e !== null && !Rt ? (wc(e, t, f), ua(e, t, f)) : (qe && r && ic(t), t.flags |= 1, _t(e, t, i, f), t.child);
  }
  function Ip(e, t, i, r, u) {
    if (Si(t), t.stateNode === null) {
      var f = tl, g = i.contextType;
      typeof g == "object" && g !== null && (f = Ot(g)), f = new i(r, f), t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = qc, t.stateNode = f, f._reactInternals = t, f = t.stateNode, f.props = r, f.state = t.memoizedState, f.refs = {}, pc(t), g = i.contextType, f.context = typeof g == "object" && g !== null ? Ot(g) : tl, f.state = t.memoizedState, g = i.getDerivedStateFromProps, typeof g == "function" && (Hc(
        t,
        i,
        g,
        r
      ), f.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (g = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), g !== f.state && qc.enqueueReplaceState(f, f.state, null), sr(t, r, f, u), rr(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
    } else if (e === null) {
      f = t.stateNode;
      var E = t.memoizedProps, C = Ci(i, E);
      f.props = C;
      var q = f.context, $ = i.contextType;
      g = tl, typeof $ == "object" && $ !== null && (g = Ot($));
      var W = i.getDerivedStateFromProps;
      $ = typeof W == "function" || typeof f.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, $ || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (E || q !== g) && Up(
        t,
        f,
        r,
        g
      ), Oa = !1;
      var Y = t.memoizedState;
      f.state = Y, sr(t, r, f, u), rr(), q = t.memoizedState, E || Y !== q || Oa ? (typeof W == "function" && (Hc(
        t,
        i,
        W,
        r
      ), q = t.memoizedState), (C = Oa || Lp(
        t,
        i,
        C,
        r,
        Y,
        q,
        g
      )) ? ($ || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = q), f.props = r, f.state = q, f.context = g, r = C) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      f = t.stateNode, yc(e, t), g = t.memoizedProps, $ = Ci(i, g), f.props = $, W = t.pendingProps, Y = f.context, q = i.contextType, C = tl, typeof q == "object" && q !== null && (C = Ot(q)), E = i.getDerivedStateFromProps, (q = typeof E == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== W || Y !== C) && Up(
        t,
        f,
        r,
        C
      ), Oa = !1, Y = t.memoizedState, f.state = Y, sr(t, r, f, u), rr();
      var G = t.memoizedState;
      g !== W || Y !== G || Oa || e !== null && e.dependencies !== null && Ls(e.dependencies) ? (typeof E == "function" && (Hc(
        t,
        i,
        E,
        r
      ), G = t.memoizedState), ($ = Oa || Lp(
        t,
        i,
        $,
        r,
        Y,
        G,
        C
      ) || e !== null && e.dependencies !== null && Ls(e.dependencies)) ? (q || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(r, G, C), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        r,
        G,
        C
      )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && Y === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && Y === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = G), f.props = r, f.state = G, f.context = C, r = $) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && Y === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && Y === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return f = r, eo(e, t), r = (t.flags & 128) !== 0, f || r ? (f = t.stateNode, i = r && typeof i.getDerivedStateFromError != "function" ? null : f.render(), t.flags |= 1, e !== null && r ? (t.child = Ri(
      t,
      e.child,
      null,
      u
    ), t.child = Ri(
      t,
      null,
      i,
      u
    )) : _t(e, t, i, u), t.memoizedState = f.state, e = t.child) : e = ua(
      e,
      t,
      u
    ), e;
  }
  function Zp(e, t, i, r) {
    return vi(), t.flags |= 256, _t(e, t, i, r), t.child;
  }
  var Gc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Fc(e) {
    return { baseLanes: e, cachePool: qm() };
  }
  function $c(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= on), e;
  }
  function Jp(e, t, i) {
    var r = t.pendingProps, u = !1, f = (t.flags & 128) !== 0, g;
    if ((g = f) || (g = e !== null && e.memoizedState === null ? !1 : (gt.current & 2) !== 0), g && (u = !0, t.flags &= -129), g = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (qe) {
        if (u ? Ua(t) : Va(), (e = it) ? (e = rg(
          e,
          gn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ja !== null ? { id: kn, overflow: Pn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Nm(e), i.return = t, t.child = i, zt = t, it = null)) : e = null, e === null) throw Na(t);
        return jf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = r.children;
      return r = r.fallback, u ? (Va(), u = t.mode, E = to(
        { mode: "hidden", children: E },
        u
      ), r = gi(
        r,
        u,
        i,
        null
      ), E.return = t, r.return = t, E.sibling = r, t.child = E, r = t.child, r.memoizedState = Fc(i), r.childLanes = $c(
        e,
        g,
        i
      ), t.memoizedState = Gc, dr(null, r)) : (Ua(t), Xc(t, E));
    }
    var C = e.memoizedState;
    if (C !== null && (E = C.dehydrated, E !== null)) {
      if (f)
        t.flags & 256 ? (Ua(t), t.flags &= -257, t = Kc(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (Va(), t.child = e.child, t.flags |= 128, t = null) : (Va(), E = r.fallback, u = t.mode, r = to(
          { mode: "visible", children: r.children },
          u
        ), E = gi(
          E,
          u,
          i,
          null
        ), E.flags |= 2, r.return = t, E.return = t, r.sibling = E, t.child = r, Ri(
          t,
          e.child,
          null,
          i
        ), r = t.child, r.memoizedState = Fc(i), r.childLanes = $c(
          e,
          g,
          i
        ), t.memoizedState = Gc, t = dr(null, r));
      else if (Ua(t), jf(E)) {
        if (g = E.nextSibling && E.nextSibling.dataset, g) var q = g.dgst;
        g = q, r = Error(s(419)), r.stack = "", r.digest = g, er({ value: r, source: null, stack: null }), t = Kc(
          e,
          t,
          i
        );
      } else if (Rt || ll(e, t, i, !1), g = (i & e.childLanes) !== 0, Rt || g) {
        if (g = et, g !== null && (r = M(g, i), r !== 0 && r !== C.retryLane))
          throw C.retryLane = r, yi(e, r), Wt(g, e, r), Pc;
        Af(E) || co(), t = Kc(
          e,
          t,
          i
        );
      } else
        Af(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = C.treeContext, it = bn(
          E.nextSibling
        ), zt = t, qe = !0, Da = null, gn = !1, e !== null && _m(t, e), t = Xc(
          t,
          r.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Va(), E = r.fallback, u = t.mode, C = e.child, q = C.sibling, r = aa(C, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = C.subtreeFlags & 65011712, q !== null ? E = aa(
      q,
      E
    ) : (E = gi(
      E,
      u,
      i,
      null
    ), E.flags |= 2), E.return = t, r.return = t, r.sibling = E, t.child = r, dr(null, r), r = t.child, E = e.child.memoizedState, E === null ? E = Fc(i) : (u = E.cachePool, u !== null ? (C = Et._currentValue, u = u.parent !== C ? { parent: C, pool: C } : u) : u = qm(), E = {
      baseLanes: E.baseLanes | i,
      cachePool: u
    }), r.memoizedState = E, r.childLanes = $c(
      e,
      g,
      i
    ), t.memoizedState = Gc, dr(e.child, r)) : (Ua(t), i = e.child, e = i.sibling, i = aa(i, {
      mode: "visible",
      children: r.children
    }), i.return = t, i.sibling = null, e !== null && (g = t.deletions, g === null ? (t.deletions = [e], t.flags |= 16) : g.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function Xc(e, t) {
    return t = to(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function to(e, t) {
    return e = an(22, e, null, t), e.lanes = 0, e;
  }
  function Kc(e, t, i) {
    return Ri(t, e.child, null, i), e = Xc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Wp(e, t, i) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), uc(e.return, t, i);
  }
  function Qc(e, t, i, r, u, f) {
    var g = e.memoizedState;
    g === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: r,
      tail: i,
      tailMode: u,
      treeForkCount: f
    } : (g.isBackwards = t, g.rendering = null, g.renderingStartTime = 0, g.last = r, g.tail = i, g.tailMode = u, g.treeForkCount = f);
  }
  function ey(e, t, i) {
    var r = t.pendingProps, u = r.revealOrder, f = r.tail;
    r = r.children;
    var g = gt.current, E = (g & 2) !== 0;
    if (E ? (g = g & 1 | 2, t.flags |= 128) : g &= 1, ie(gt, g), _t(e, t, r, i), r = qe ? Wl : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Wp(e, i, t);
        else if (e.tag === 19)
          Wp(e, i, t);
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
          e = i.alternate, e !== null && Ys(e) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = t.child, t.child = null) : (u = i.sibling, i.sibling = null), Qc(
          t,
          !1,
          u,
          i,
          f,
          r
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && Ys(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = i, i = u, u = e;
        }
        Qc(
          t,
          !0,
          i,
          null,
          f,
          r
        );
        break;
      case "together":
        Qc(
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
  function ua(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), qa |= t.lanes, (i & t.childLanes) === 0)
      if (e !== null) {
        if (ll(
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
      for (e = t.child, i = aa(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; )
        e = e.sibling, i = i.sibling = aa(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function Ic(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ls(e)));
  }
  function tE(e, t, i) {
    switch (t.tag) {
      case 3:
        dt(t, t.stateNode.containerInfo), za(t, Et, e.memoizedState.cache), vi();
        break;
      case 27:
      case 5:
        In(t);
        break;
      case 4:
        dt(t, t.stateNode.containerInfo);
        break;
      case 10:
        za(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, xc(t), null;
        break;
      case 13:
        var r = t.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (Ua(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? Jp(e, t, i) : (Ua(t), e = ua(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        Ua(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (r = (i & t.childLanes) !== 0, r || (ll(
          e,
          t,
          i,
          !1
        ), r = (i & t.childLanes) !== 0), u) {
          if (r)
            return ey(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), ie(gt, gt.current), r) break;
        return null;
      case 22:
        return t.lanes = 0, $p(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        za(t, Et, e.memoizedState.cache);
    }
    return ua(e, t, i);
  }
  function ty(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Rt = !0;
      else {
        if (!Ic(e, i) && (t.flags & 128) === 0)
          return Rt = !1, tE(
            e,
            t,
            i
          );
        Rt = (e.flags & 131072) !== 0;
      }
    else
      Rt = !1, qe && (t.flags & 1048576) !== 0 && Om(t, Wl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var r = t.pendingProps;
          if (e = Ei(t.elementType), t.type = e, typeof e == "function")
            tc(e) ? (r = Ci(e, r), t.tag = 1, t = Ip(
              null,
              t,
              e,
              r,
              i
            )) : (t.tag = 0, t = Yc(
              null,
              t,
              e,
              r,
              i
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === V) {
                t.tag = 11, t = Yp(
                  null,
                  t,
                  e,
                  r,
                  i
                );
                break e;
              } else if (u === ee) {
                t.tag = 14, t = Gp(
                  null,
                  t,
                  e,
                  r,
                  i
                );
                break e;
              }
            }
            throw t = le(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Yc(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 1:
        return r = t.type, u = Ci(
          r,
          t.pendingProps
        ), Ip(
          e,
          t,
          r,
          u,
          i
        );
      case 3:
        e: {
          if (dt(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          r = t.pendingProps;
          var f = t.memoizedState;
          u = f.element, yc(e, t), sr(t, r, null, i);
          var g = t.memoizedState;
          if (r = g.cache, za(t, Et, r), r !== f.cache && cc(
            t,
            [Et],
            i,
            !0
          ), rr(), r = g.element, f.isDehydrated)
            if (f = {
              element: r,
              isDehydrated: !1,
              cache: g.cache
            }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
              t = Zp(
                e,
                t,
                r,
                i
              );
              break e;
            } else if (r !== u) {
              u = mn(
                Error(s(424)),
                t
              ), er(u), t = Zp(
                e,
                t,
                r,
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
              for (it = bn(e.firstChild), zt = t, qe = !0, Da = null, gn = !0, i = $m(
                t,
                null,
                r,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (vi(), r === u) {
              t = ua(
                e,
                t,
                i
              );
              break e;
            }
            _t(e, t, r, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return eo(e, t), e === null ? (i = dg(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : qe || (i = t.type, e = t.pendingProps, r = vo(
          Re.current
        ).createElement(i), r[fe] = t, r[de] = e, Lt(r, i, e), nt(r), t.stateNode = r) : t.memoizedState = dg(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return In(t), e === null && qe && (r = t.stateNode = ug(
          t.type,
          t.pendingProps,
          Re.current
        ), zt = t, gn = !0, u = it, Fa(t.type) ? (Df = u, it = bn(r.firstChild)) : it = u), _t(
          e,
          t,
          t.pendingProps.children,
          i
        ), eo(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && qe && ((u = r = it) && (r = NE(
          r,
          t.type,
          t.pendingProps,
          gn
        ), r !== null ? (t.stateNode = r, zt = t, it = bn(r.firstChild), gn = !1, u = !0) : u = !1), u || Na(t)), In(t), u = t.type, f = t.pendingProps, g = e !== null ? e.memoizedProps : null, r = f.children, wf(u, f) ? r = null : g !== null && wf(u, g) && (t.flags |= 32), t.memoizedState !== null && (u = Tc(
          e,
          t,
          $x,
          null,
          null,
          i
        ), Mr._currentValue = u), eo(e, t), _t(e, t, r, i), t.child;
      case 6:
        return e === null && qe && ((e = i = it) && (i = zE(
          i,
          t.pendingProps,
          gn
        ), i !== null ? (t.stateNode = i, zt = t, it = null, e = !0) : e = !1), e || Na(t)), null;
      case 13:
        return Jp(e, t, i);
      case 4:
        return dt(
          t,
          t.stateNode.containerInfo
        ), r = t.pendingProps, e === null ? t.child = Ri(
          t,
          null,
          r,
          i
        ) : _t(e, t, r, i), t.child;
      case 11:
        return Yp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 7:
        return _t(
          e,
          t,
          t.pendingProps,
          i
        ), t.child;
      case 8:
        return _t(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 12:
        return _t(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 10:
        return r = t.pendingProps, za(t, t.type, r.value), _t(e, t, r.children, i), t.child;
      case 9:
        return u = t.type._context, r = t.pendingProps.children, Si(t), u = Ot(u), r = r(u), t.flags |= 1, _t(e, t, r, i), t.child;
      case 14:
        return Gp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return Fp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return ey(e, t, i);
      case 31:
        return eE(e, t, i);
      case 22:
        return $p(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return Si(t), r = Ot(Et), e === null ? (u = hc(), u === null && (u = et, f = fc(), u.pooledCache = f, f.refCount++, f !== null && (u.pooledCacheLanes |= i), u = f), t.memoizedState = { parent: r, cache: u }, pc(t), za(t, Et, u)) : ((e.lanes & i) !== 0 && (yc(e, t), sr(t, null, null, i), rr()), u = e.memoizedState, f = t.memoizedState, u.parent !== r ? (u = { parent: r, cache: r }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), za(t, Et, r)) : (r = f.cache, za(t, Et, r), r !== u.cache && cc(
          t,
          [Et],
          i,
          !0
        ))), _t(
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
  function ca(e) {
    e.flags |= 4;
  }
  function Zc(e, t, i, r, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Ay()) e.flags |= 8192;
        else
          throw Ti = Hs, mc;
    } else e.flags &= -16777217;
  }
  function ny(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !gg(t))
      if (Ay()) e.flags |= 8192;
      else
        throw Ti = Hs, mc;
  }
  function no(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Yl() : 536870912, e.lanes |= t, gl |= t);
  }
  function hr(e, t) {
    if (!qe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var i = null; t !== null; )
            t.alternate !== null && (i = t), t = t.sibling;
          i === null ? e.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = e.tail;
          for (var r = null; i !== null; )
            i.alternate !== null && (r = i), i = i.sibling;
          r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
      }
  }
  function lt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, i = 0, r = 0;
    if (t)
      for (var u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, r |= u.subtreeFlags & 65011712, r |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, r |= u.subtreeFlags, r |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= r, e.childLanes = i, t;
  }
  function nE(e, t, i) {
    var r = t.pendingProps;
    switch (lc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return lt(t), null;
      case 1:
        return lt(t), null;
      case 3:
        return i = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ra(Et), $e(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (il(t) ? ca(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, sc())), lt(t), null;
      case 26:
        var u = t.type, f = t.memoizedState;
        return e === null ? (ca(t), f !== null ? (lt(t), ny(t, f)) : (lt(t), Zc(
          t,
          u,
          null,
          r,
          i
        ))) : f ? f !== e.memoizedState ? (ca(t), lt(t), ny(t, f)) : (lt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== r && ca(t), lt(t), Zc(
          t,
          u,
          e,
          r,
          i
        )), null;
      case 27:
        if (xa(t), i = Re.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && ca(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(s(166));
            return lt(t), null;
          }
          e = oe.current, il(t) ? Lm(t) : (e = ug(u, r, i), t.stateNode = e, ca(t));
        }
        return lt(t), null;
      case 5:
        if (xa(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && ca(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(s(166));
            return lt(t), null;
          }
          if (f = oe.current, il(t))
            Lm(t);
          else {
            var g = vo(
              Re.current
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
            e: switch (Lt(f, u, r), u) {
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
            r && ca(t);
          }
        }
        return lt(t), Zc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          i
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== r && ca(t);
        else {
          if (typeof r != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = Re.current, il(t)) {
            if (e = t.stateNode, i = t.memoizedProps, r = null, u = zt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  r = u.memoizedProps;
              }
            e[fe] = t, e = !!(e.nodeValue === i || r !== null && r.suppressHydrationWarning === !0 || Jy(e.nodeValue, i)), e || Na(t, !0);
          } else
            e = vo(e).createTextNode(
              r
            ), e[fe] = t, t.stateNode = e;
        }
        return lt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (r = il(t), i !== null) {
            if (e === null) {
              if (!r) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[fe] = t;
            } else
              vi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            lt(t), e = !1;
          } else
            i = sc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (rn(t), t) : (rn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return lt(t), null;
      case 13:
        if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = il(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[fe] = t;
            } else
              vi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            lt(t), u = !1;
          } else
            u = sc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (rn(t), t) : (rn(t), null);
        }
        return rn(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = r !== null, e = e !== null && e.memoizedState !== null, i && (r = t.child, u = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (u = r.alternate.memoizedState.cachePool.pool), f = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (f = r.memoizedState.cachePool.pool), f !== u && (r.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), no(t, t.updateQueue), lt(t), null);
      case 4:
        return $e(), e === null && Sf(t.stateNode.containerInfo), lt(t), null;
      case 10:
        return ra(t.type), lt(t), null;
      case 19:
        if (F(gt), r = t.memoizedState, r === null) return lt(t), null;
        if (u = (t.flags & 128) !== 0, f = r.rendering, f === null)
          if (u) hr(r, !1);
          else {
            if (mt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (f = Ys(e), f !== null) {
                  for (t.flags |= 128, hr(r, !1), e = f.updateQueue, t.updateQueue = e, no(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    Dm(i, e), i = i.sibling;
                  return ie(
                    gt,
                    gt.current & 1 | 2
                  ), qe && ia(t, r.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            r.tail !== null && Yt() > so && (t.flags |= 128, u = !0, hr(r, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Ys(f), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, no(t, e), hr(r, !0), r.tail === null && r.tailMode === "hidden" && !f.alternate && !qe)
                return lt(t), null;
            } else
              2 * Yt() - r.renderingStartTime > so && i !== 536870912 && (t.flags |= 128, u = !0, hr(r, !1), t.lanes = 4194304);
          r.isBackwards ? (f.sibling = t.child, t.child = f) : (e = r.last, e !== null ? e.sibling = f : t.child = f, r.last = f);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Yt(), e.sibling = null, i = gt.current, ie(
          gt,
          u ? i & 1 | 2 : i & 1
        ), qe && ia(t, r.treeForkCount), e) : (lt(t), null);
      case 22:
      case 23:
        return rn(t), Sc(), r = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (t.flags |= 8192) : r && (t.flags |= 8192), r ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (lt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : lt(t), i = t.updateQueue, i !== null && no(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== i && (t.flags |= 2048), e !== null && F(xi), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), ra(Et), lt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function aE(e, t) {
    switch (lc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return ra(Et), $e(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return xa(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (rn(t), t.alternate === null)
            throw Error(s(340));
          vi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (rn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          vi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return F(gt), null;
      case 4:
        return $e(), null;
      case 10:
        return ra(t.type), null;
      case 22:
      case 23:
        return rn(t), Sc(), e !== null && F(xi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return ra(Et), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ay(e, t) {
    switch (lc(t), t.tag) {
      case 3:
        ra(Et), $e();
        break;
      case 26:
      case 27:
      case 5:
        xa(t);
        break;
      case 4:
        $e();
        break;
      case 31:
        t.memoizedState !== null && rn(t);
        break;
      case 13:
        rn(t);
        break;
      case 19:
        F(gt);
        break;
      case 10:
        ra(t.type);
        break;
      case 22:
      case 23:
        rn(t), Sc(), e !== null && F(xi);
        break;
      case 24:
        ra(Et);
    }
  }
  function mr(e, t) {
    try {
      var i = t.updateQueue, r = i !== null ? i.lastEffect : null;
      if (r !== null) {
        var u = r.next;
        i = u;
        do {
          if ((i.tag & e) === e) {
            r = void 0;
            var f = i.create, g = i.inst;
            r = f(), g.destroy = r;
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (E) {
      Ke(t, t.return, E);
    }
  }
  function Ba(e, t, i) {
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
              var C = i, q = E;
              try {
                q();
              } catch ($) {
                Ke(
                  u,
                  C,
                  $
                );
              }
            }
          }
          r = r.next;
        } while (r !== f);
      }
    } catch ($) {
      Ke(t, t.return, $);
    }
  }
  function iy(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Km(t, i);
      } catch (r) {
        Ke(e, e.return, r);
      }
    }
  }
  function ly(e, t, i) {
    i.props = Ci(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (r) {
      Ke(e, t, r);
    }
  }
  function pr(e, t) {
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
      Ke(e, t, u);
    }
  }
  function Yn(e, t) {
    var i = e.ref, r = e.refCleanup;
    if (i !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (u) {
          Ke(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          Ke(e, t, u);
        }
      else i.current = null;
  }
  function ry(e) {
    var t = e.type, i = e.memoizedProps, r = e.stateNode;
    try {
      e: switch (t) {
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
  function Jc(e, t, i) {
    try {
      var r = e.stateNode;
      wE(r, e.type, i, t), r[de] = t;
    } catch (u) {
      Ke(e, e.return, u);
    }
  }
  function sy(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Fa(e.type) || e.tag === 4;
  }
  function Wc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || sy(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Fa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ef(e, t, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = ta));
    else if (r !== 4 && (r === 27 && Fa(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (ef(e, t, i), e = e.sibling; e !== null; )
        ef(e, t, i), e = e.sibling;
  }
  function ao(e, t, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (r !== 4 && (r === 27 && Fa(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (ao(e, t, i), e = e.sibling; e !== null; )
        ao(e, t, i), e = e.sibling;
  }
  function oy(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var r = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Lt(t, r, i), t[fe] = e, t[de] = i;
    } catch (f) {
      Ke(e, e.return, f);
    }
  }
  var fa = !1, wt = !1, tf = !1, uy = typeof WeakSet == "function" ? WeakSet : Set, Nt = null;
  function iE(e, t) {
    if (e = e.containerInfo, Tf = wo, e = xm(e), Ku(e)) {
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
            var u = r.anchorOffset, f = r.focusNode;
            r = r.focusOffset;
            try {
              i.nodeType, f.nodeType;
            } catch {
              i = null;
              break e;
            }
            var g = 0, E = -1, C = -1, q = 0, $ = 0, W = e, Y = null;
            t: for (; ; ) {
              for (var G; W !== i || u !== 0 && W.nodeType !== 3 || (E = g + u), W !== f || r !== 0 && W.nodeType !== 3 || (C = g + r), W.nodeType === 3 && (g += W.nodeValue.length), (G = W.firstChild) !== null; )
                Y = W, W = G;
              for (; ; ) {
                if (W === e) break t;
                if (Y === i && ++q === u && (E = g), Y === f && ++$ === r && (C = g), (G = W.nextSibling) !== null) break;
                W = Y, Y = W.parentNode;
              }
              W = G;
            }
            i = E === -1 || C === -1 ? null : { start: E, end: C };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Rf = { focusedElem: e, selectionRange: i }, wo = !1, Nt = t; Nt !== null; )
      if (t = Nt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Nt = e;
      else
        for (; Nt !== null; ) {
          switch (t = Nt, f = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  u = e[i], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, i = t, u = f.memoizedProps, f = f.memoizedState, r = i.stateNode;
                try {
                  var me = Ci(
                    i.type,
                    u
                  );
                  e = r.getSnapshotBeforeUpdate(
                    me,
                    f
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
                if (e = t.stateNode.containerInfo, i = e.nodeType, i === 9)
                  Mf(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Mf(e);
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
            e.return = t.return, Nt = e;
            break;
          }
          Nt = t.return;
        }
  }
  function cy(e, t, i) {
    var r = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        ha(e, i), r & 4 && mr(5, i);
        break;
      case 1:
        if (ha(e, i), r & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (g) {
              Ke(i, i.return, g);
            }
          else {
            var u = Ci(
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
            } catch (g) {
              Ke(
                i,
                i.return,
                g
              );
            }
          }
        r & 64 && iy(i), r & 512 && pr(i, i.return);
        break;
      case 3:
        if (ha(e, i), r & 64 && (e = i.updateQueue, e !== null)) {
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
            Km(e, t);
          } catch (g) {
            Ke(i, i.return, g);
          }
        }
        break;
      case 27:
        t === null && r & 4 && oy(i);
      case 26:
      case 5:
        ha(e, i), t === null && r & 4 && ry(i), r & 512 && pr(i, i.return);
        break;
      case 12:
        ha(e, i);
        break;
      case 31:
        ha(e, i), r & 4 && hy(e, i);
        break;
      case 13:
        ha(e, i), r & 4 && my(e, i), r & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = hE.bind(
          null,
          i
        ), OE(e, i))));
        break;
      case 22:
        if (r = i.memoizedState !== null || fa, !r) {
          t = t !== null && t.memoizedState !== null || wt, u = fa;
          var f = wt;
          fa = r, (wt = t) && !f ? ma(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : ha(e, i), fa = u, wt = f;
        }
        break;
      case 30:
        break;
      default:
        ha(e, i);
    }
  }
  function fy(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, fy(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && We(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ct = null, Qt = !1;
  function da(e, t, i) {
    for (i = i.child; i !== null; )
      dy(e, t, i), i = i.sibling;
  }
  function dy(e, t, i) {
    if (Gt && typeof Gt.onCommitFiberUnmount == "function")
      try {
        Gt.onCommitFiberUnmount(Wn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        wt || Yn(i, t), da(
          e,
          t,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        wt || Yn(i, t);
        var r = ct, u = Qt;
        Fa(i.type) && (ct = i.stateNode, Qt = !1), da(
          e,
          t,
          i
        ), Rr(i.stateNode), ct = r, Qt = u;
        break;
      case 5:
        wt || Yn(i, t);
      case 6:
        if (r = ct, u = Qt, ct = null, da(
          e,
          t,
          i
        ), ct = r, Qt = u, ct !== null)
          if (Qt)
            try {
              (ct.nodeType === 9 ? ct.body : ct.nodeName === "HTML" ? ct.ownerDocument.body : ct).removeChild(i.stateNode);
            } catch (f) {
              Ke(
                i,
                t,
                f
              );
            }
          else
            try {
              ct.removeChild(i.stateNode);
            } catch (f) {
              Ke(
                i,
                t,
                f
              );
            }
        break;
      case 18:
        ct !== null && (Qt ? (e = ct, ig(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), wl(e)) : ig(ct, i.stateNode));
        break;
      case 4:
        r = ct, u = Qt, ct = i.stateNode.containerInfo, Qt = !0, da(
          e,
          t,
          i
        ), ct = r, Qt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ba(2, i, t), wt || Ba(4, i, t), da(
          e,
          t,
          i
        );
        break;
      case 1:
        wt || (Yn(i, t), r = i.stateNode, typeof r.componentWillUnmount == "function" && ly(
          i,
          t,
          r
        )), da(
          e,
          t,
          i
        );
        break;
      case 21:
        da(
          e,
          t,
          i
        );
        break;
      case 22:
        wt = (r = wt) || i.memoizedState !== null, da(
          e,
          t,
          i
        ), wt = r;
        break;
      default:
        da(
          e,
          t,
          i
        );
    }
  }
  function hy(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        wl(e);
      } catch (i) {
        Ke(t, t.return, i);
      }
    }
  }
  function my(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        wl(e);
      } catch (i) {
        Ke(t, t.return, i);
      }
  }
  function lE(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new uy()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new uy()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function io(e, t) {
    var i = lE(e);
    t.forEach(function(r) {
      if (!i.has(r)) {
        i.add(r);
        var u = mE.bind(null, e, r);
        r.then(u, u);
      }
    });
  }
  function It(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var r = 0; r < i.length; r++) {
        var u = i[r], f = e, g = t, E = g;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (Fa(E.type)) {
                ct = E.stateNode, Qt = !1;
                break e;
              }
              break;
            case 5:
              ct = E.stateNode, Qt = !1;
              break e;
            case 3:
            case 4:
              ct = E.stateNode.containerInfo, Qt = !0;
              break e;
          }
          E = E.return;
        }
        if (ct === null) throw Error(s(160));
        dy(f, g, u), ct = null, Qt = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        py(t, e), t = t.sibling;
  }
  var Nn = null;
  function py(e, t) {
    var i = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        It(t, e), Zt(e), r & 4 && (Ba(3, e, e.return), mr(3, e), Ba(5, e, e.return));
        break;
      case 1:
        It(t, e), Zt(e), r & 512 && (wt || i === null || Yn(i, i.return)), r & 64 && fa && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? r : i.concat(r))));
        break;
      case 26:
        var u = Nn;
        if (It(t, e), Zt(e), r & 512 && (wt || i === null || Yn(i, i.return)), r & 4) {
          var f = i !== null ? i.memoizedState : null;
          if (r = e.memoizedState, i === null)
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  r = e.type, i = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (r) {
                    case "title":
                      f = u.getElementsByTagName("title")[0], (!f || f[Ne] || f[fe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = u.createElement(r), u.head.insertBefore(
                        f,
                        u.querySelector("head > title")
                      )), Lt(f, r, i), f[fe] = e, nt(f), r = f;
                      break e;
                    case "link":
                      var g = pg(
                        "link",
                        "href",
                        u
                      ).get(r + (i.href || ""));
                      if (g) {
                        for (var E = 0; E < g.length; E++)
                          if (f = g[E], f.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && f.getAttribute("rel") === (i.rel == null ? null : i.rel) && f.getAttribute("title") === (i.title == null ? null : i.title) && f.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            g.splice(E, 1);
                            break t;
                          }
                      }
                      f = u.createElement(r), Lt(f, r, i), u.head.appendChild(f);
                      break;
                    case "meta":
                      if (g = pg(
                        "meta",
                        "content",
                        u
                      ).get(r + (i.content || ""))) {
                        for (E = 0; E < g.length; E++)
                          if (f = g[E], f.getAttribute("content") === (i.content == null ? null : "" + i.content) && f.getAttribute("name") === (i.name == null ? null : i.name) && f.getAttribute("property") === (i.property == null ? null : i.property) && f.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && f.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            g.splice(E, 1);
                            break t;
                          }
                      }
                      f = u.createElement(r), Lt(f, r, i), u.head.appendChild(f);
                      break;
                    default:
                      throw Error(s(468, r));
                  }
                  f[fe] = e, nt(f), r = f;
                }
                e.stateNode = r;
              } else
                yg(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = mg(
                u,
                r,
                e.memoizedProps
              );
          else
            f !== r ? (f === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : f.count--, r === null ? yg(
              u,
              e.type,
              e.stateNode
            ) : mg(
              u,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && Jc(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        It(t, e), Zt(e), r & 512 && (wt || i === null || Yn(i, i.return)), i !== null && r & 4 && Jc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (It(t, e), Zt(e), r & 512 && (wt || i === null || Yn(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            Ki(u, "");
          } catch (me) {
            Ke(e, e.return, me);
          }
        }
        r & 4 && e.stateNode != null && (u = e.memoizedProps, Jc(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), r & 1024 && (tf = !0);
        break;
      case 6:
        if (It(t, e), Zt(e), r & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          r = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = r;
          } catch (me) {
            Ke(e, e.return, me);
          }
        }
        break;
      case 3:
        if (xo = null, u = Nn, Nn = bo(t.containerInfo), It(t, e), Nn = u, Zt(e), r & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            wl(t.containerInfo);
          } catch (me) {
            Ke(e, e.return, me);
          }
        tf && (tf = !1, yy(e));
        break;
      case 4:
        r = Nn, Nn = bo(
          e.stateNode.containerInfo
        ), It(t, e), Zt(e), Nn = r;
        break;
      case 12:
        It(t, e), Zt(e);
        break;
      case 31:
        It(t, e), Zt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, io(e, r)));
        break;
      case 13:
        It(t, e), Zt(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (ro = Yt()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, io(e, r)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var C = i !== null && i.memoizedState !== null, q = fa, $ = wt;
        if (fa = q || u, wt = $ || C, It(t, e), wt = $, fa = q, Zt(e), r & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (i === null || C || fa || wt || Mi(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                C = i = t;
                try {
                  if (f = C.stateNode, u)
                    g = f.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none";
                  else {
                    E = C.stateNode;
                    var W = C.memoizedProps.style, Y = W != null && W.hasOwnProperty("display") ? W.display : null;
                    E.style.display = Y == null || typeof Y == "boolean" ? "" : ("" + Y).trim();
                  }
                } catch (me) {
                  Ke(C, C.return, me);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                C = t;
                try {
                  C.stateNode.nodeValue = u ? "" : C.memoizedProps;
                } catch (me) {
                  Ke(C, C.return, me);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                C = t;
                try {
                  var G = C.stateNode;
                  u ? lg(G, !0) : lg(C.stateNode, !1);
                } catch (me) {
                  Ke(C, C.return, me);
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
        r & 4 && (r = e.updateQueue, r !== null && (i = r.retryQueue, i !== null && (r.retryQueue = null, io(e, i))));
        break;
      case 19:
        It(t, e), Zt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, io(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        It(t, e), Zt(e);
    }
  }
  function Zt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var i, r = e.return; r !== null; ) {
          if (sy(r)) {
            i = r;
            break;
          }
          r = r.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, f = Wc(e);
            ao(e, f, u);
            break;
          case 5:
            var g = i.stateNode;
            i.flags & 32 && (Ki(g, ""), i.flags &= -33);
            var E = Wc(e);
            ao(e, E, g);
            break;
          case 3:
          case 4:
            var C = i.stateNode.containerInfo, q = Wc(e);
            ef(
              e,
              q,
              C
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch ($) {
        Ke(e, e.return, $);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function yy(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        yy(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function ha(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        cy(e, t.alternate, t), t = t.sibling;
  }
  function Mi(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ba(4, t, t.return), Mi(t);
          break;
        case 1:
          Yn(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && ly(
            t,
            t.return,
            i
          ), Mi(t);
          break;
        case 27:
          Rr(t.stateNode);
        case 26:
        case 5:
          Yn(t, t.return), Mi(t);
          break;
        case 22:
          t.memoizedState === null && Mi(t);
          break;
        case 30:
          Mi(t);
          break;
        default:
          Mi(t);
      }
      e = e.sibling;
    }
  }
  function ma(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var r = t.alternate, u = e, f = t, g = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          ma(
            u,
            f,
            i
          ), mr(4, f);
          break;
        case 1:
          if (ma(
            u,
            f,
            i
          ), r = f, u = r.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (q) {
              Ke(r, r.return, q);
            }
          if (r = f, u = r.updateQueue, u !== null) {
            var E = r.stateNode;
            try {
              var C = u.shared.hiddenCallbacks;
              if (C !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < C.length; u++)
                  Xm(C[u], E);
            } catch (q) {
              Ke(r, r.return, q);
            }
          }
          i && g & 64 && iy(f), pr(f, f.return);
          break;
        case 27:
          oy(f);
        case 26:
        case 5:
          ma(
            u,
            f,
            i
          ), i && r === null && g & 4 && ry(f), pr(f, f.return);
          break;
        case 12:
          ma(
            u,
            f,
            i
          );
          break;
        case 31:
          ma(
            u,
            f,
            i
          ), i && g & 4 && hy(u, f);
          break;
        case 13:
          ma(
            u,
            f,
            i
          ), i && g & 4 && my(u, f);
          break;
        case 22:
          f.memoizedState === null && ma(
            u,
            f,
            i
          ), pr(f, f.return);
          break;
        case 30:
          break;
        default:
          ma(
            u,
            f,
            i
          );
      }
      t = t.sibling;
    }
  }
  function nf(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && tr(i));
  }
  function af(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && tr(e));
  }
  function zn(e, t, i, r) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        gy(
          e,
          t,
          i,
          r
        ), t = t.sibling;
  }
  function gy(e, t, i, r) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        zn(
          e,
          t,
          i,
          r
        ), u & 2048 && mr(9, t);
        break;
      case 1:
        zn(
          e,
          t,
          i,
          r
        );
        break;
      case 3:
        zn(
          e,
          t,
          i,
          r
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && tr(e)));
        break;
      case 12:
        if (u & 2048) {
          zn(
            e,
            t,
            i,
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
          } catch (C) {
            Ke(t, t.return, C);
          }
        } else
          zn(
            e,
            t,
            i,
            r
          );
        break;
      case 31:
        zn(
          e,
          t,
          i,
          r
        );
        break;
      case 13:
        zn(
          e,
          t,
          i,
          r
        );
        break;
      case 23:
        break;
      case 22:
        f = t.stateNode, g = t.alternate, t.memoizedState !== null ? f._visibility & 2 ? zn(
          e,
          t,
          i,
          r
        ) : yr(e, t) : f._visibility & 2 ? zn(
          e,
          t,
          i,
          r
        ) : (f._visibility |= 2, ml(
          e,
          t,
          i,
          r,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && nf(g, t);
        break;
      case 24:
        zn(
          e,
          t,
          i,
          r
        ), u & 2048 && af(t.alternate, t);
        break;
      default:
        zn(
          e,
          t,
          i,
          r
        );
    }
  }
  function ml(e, t, i, r, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var f = e, g = t, E = i, C = r, q = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          ml(
            f,
            g,
            E,
            C,
            u
          ), mr(8, g);
          break;
        case 23:
          break;
        case 22:
          var $ = g.stateNode;
          g.memoizedState !== null ? $._visibility & 2 ? ml(
            f,
            g,
            E,
            C,
            u
          ) : yr(
            f,
            g
          ) : ($._visibility |= 2, ml(
            f,
            g,
            E,
            C,
            u
          )), u && q & 2048 && nf(
            g.alternate,
            g
          );
          break;
        case 24:
          ml(
            f,
            g,
            E,
            C,
            u
          ), u && q & 2048 && af(g.alternate, g);
          break;
        default:
          ml(
            f,
            g,
            E,
            C,
            u
          );
      }
      t = t.sibling;
    }
  }
  function yr(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, r = t, u = r.flags;
        switch (r.tag) {
          case 22:
            yr(i, r), u & 2048 && nf(
              r.alternate,
              r
            );
            break;
          case 24:
            yr(i, r), u & 2048 && af(r.alternate, r);
            break;
          default:
            yr(i, r);
        }
        t = t.sibling;
      }
  }
  var gr = 8192;
  function pl(e, t, i) {
    if (e.subtreeFlags & gr)
      for (e = e.child; e !== null; )
        vy(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function vy(e, t, i) {
    switch (e.tag) {
      case 26:
        pl(
          e,
          t,
          i
        ), e.flags & gr && e.memoizedState !== null && FE(
          i,
          Nn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        pl(
          e,
          t,
          i
        );
        break;
      case 3:
      case 4:
        var r = Nn;
        Nn = bo(e.stateNode.containerInfo), pl(
          e,
          t,
          i
        ), Nn = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = gr, gr = 16777216, pl(
          e,
          t,
          i
        ), gr = r) : pl(
          e,
          t,
          i
        ));
        break;
      default:
        pl(
          e,
          t,
          i
        );
    }
  }
  function by(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function vr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var r = t[i];
          Nt = r, xy(
            r,
            e
          );
        }
      by(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Sy(e), e = e.sibling;
  }
  function Sy(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        vr(e), e.flags & 2048 && Ba(9, e, e.return);
        break;
      case 3:
        vr(e);
        break;
      case 12:
        vr(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, lo(e)) : vr(e);
        break;
      default:
        vr(e);
    }
  }
  function lo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var r = t[i];
          Nt = r, xy(
            r,
            e
          );
        }
      by(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Ba(8, t, t.return), lo(t);
          break;
        case 22:
          i = t.stateNode, i._visibility & 2 && (i._visibility &= -3, lo(t));
          break;
        default:
          lo(t);
      }
      e = e.sibling;
    }
  }
  function xy(e, t) {
    for (; Nt !== null; ) {
      var i = Nt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ba(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var r = i.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          tr(i.memoizedState.cache);
      }
      if (r = i.child, r !== null) r.return = i, Nt = r;
      else
        e: for (i = e; Nt !== null; ) {
          r = Nt;
          var u = r.sibling, f = r.return;
          if (fy(r), r === i) {
            Nt = null;
            break e;
          }
          if (u !== null) {
            u.return = f, Nt = u;
            break e;
          }
          Nt = f;
        }
    }
  }
  var rE = {
    getCacheForType: function(e) {
      var t = Ot(Et), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Ot(Et).controller.signal;
    }
  }, sE = typeof WeakMap == "function" ? WeakMap : Map, Ge = 0, et = null, Ue = null, Be = 0, Xe = 0, sn = null, Ha = !1, yl = !1, lf = !1, pa = 0, mt = 0, qa = 0, Ai = 0, rf = 0, on = 0, gl = 0, br = null, Jt = null, sf = !1, ro = 0, Ey = 0, so = 1 / 0, oo = null, ka = null, Mt = 0, Pa = null, vl = null, ya = 0, of = 0, uf = null, Ty = null, Sr = 0, cf = null;
  function un() {
    return (Ge & 2) !== 0 && Be !== 0 ? Be & -Be : z.T !== null ? yf() : ae();
  }
  function Ry() {
    if (on === 0)
      if ((Be & 536870912) === 0 || qe) {
        var e = ea;
        ea <<= 1, (ea & 3932160) === 0 && (ea = 262144), on = e;
      } else on = 536870912;
    return e = ln.current, e !== null && (e.flags |= 32), on;
  }
  function Wt(e, t, i) {
    (e === et && (Xe === 2 || Xe === 9) || e.cancelPendingCommit !== null) && (bl(e, 0), Ya(
      e,
      Be,
      on,
      !1
    )), Bn(e, i), ((Ge & 2) === 0 || e !== et) && (e === et && ((Ge & 2) === 0 && (Ai |= i), mt === 4 && Ya(
      e,
      Be,
      on,
      !1
    )), Gn(e));
  }
  function wy(e, t, i) {
    if ((Ge & 6) !== 0) throw Error(s(327));
    var r = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || wa(e, t), u = r ? cE(e, t) : df(e, t, !0), f = r;
    do {
      if (u === 0) {
        yl && !r && Ya(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, f && !oE(i)) {
          u = df(e, t, !1), f = !1;
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
              u = br;
              var C = E.current.memoizedState.isDehydrated;
              if (C && (bl(E, g).flags |= 256), g = df(
                E,
                g,
                !1
              ), g !== 2) {
                if (lf && !C) {
                  E.errorRecoveryDisabledLanes |= f, Ai |= f, u = 4;
                  break e;
                }
                f = Jt, Jt = u, f !== null && (Jt === null ? Jt = f : Jt.push.apply(
                  Jt,
                  f
                ));
              }
              u = g;
            }
            if (f = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          bl(e, 0), Ya(e, t, 0, !0);
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
              Ya(
                r,
                t,
                on,
                !Ha
              );
              break e;
            case 2:
              Jt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = ro + 300 - Yt(), 10 < u)) {
            if (Ya(
              r,
              t,
              on,
              !Ha
            ), Yi(r, 0, !0) !== 0) break e;
            ya = t, r.timeoutHandle = ng(
              Cy.bind(
                null,
                r,
                i,
                Jt,
                oo,
                sf,
                t,
                on,
                Ai,
                gl,
                Ha,
                f,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          Cy(
            r,
            i,
            Jt,
            oo,
            sf,
            t,
            on,
            Ai,
            gl,
            Ha,
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
  function Cy(e, t, i, r, u, f, g, E, C, q, $, W, Y, G) {
    if (e.timeoutHandle = -1, W = t.subtreeFlags, W & 8192 || (W & 16785408) === 16785408) {
      W = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ta
      }, vy(
        t,
        f,
        W
      );
      var me = (f & 62914560) === f ? ro - Yt() : (f & 4194048) === f ? Ey - Yt() : 0;
      if (me = $E(
        W,
        me
      ), me !== null) {
        ya = f, e.cancelPendingCommit = me(
          _y.bind(
            null,
            e,
            t,
            f,
            i,
            r,
            u,
            g,
            E,
            C,
            $,
            W,
            null,
            Y,
            G
          )
        ), Ya(e, f, g, !q);
        return;
      }
    }
    _y(
      e,
      t,
      f,
      i,
      r,
      u,
      g,
      E,
      C
    );
  }
  function oE(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var r = 0; r < i.length; r++) {
          var u = i[r], f = u.getSnapshot;
          u = u.value;
          try {
            if (!nn(f(), u)) return !1;
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
  function Ya(e, t, i, r) {
    t &= ~rf, t &= ~Ai, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var f = 31 - Ht(u), g = 1 << f;
      r[f] = -1, u &= ~g;
    }
    i !== 0 && vs(e, i, t);
  }
  function uo() {
    return (Ge & 6) === 0 ? (xr(0), !1) : !0;
  }
  function ff() {
    if (Ue !== null) {
      if (Xe === 0)
        var e = Ue.return;
      else
        e = Ue, la = bi = null, Cc(e), ul = null, ar = 0, e = Ue;
      for (; e !== null; )
        ay(e.alternate, e), e = e.return;
      Ue = null;
    }
  }
  function bl(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, AE(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), ya = 0, ff(), et = e, Ue = i = aa(e.current, null), Be = t, Xe = 0, sn = null, Ha = !1, yl = wa(e, t), lf = !1, gl = on = rf = Ai = qa = mt = 0, Jt = br = null, sf = !1, (t & 8) !== 0 && (t |= t & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var u = 31 - Ht(r), f = 1 << u;
        t |= e[u], r &= ~f;
      }
    return pa = t, Ds(), i;
  }
  function My(e, t) {
    Ae = null, z.H = fr, t === ol || t === Bs ? (t = Ym(), Xe = 3) : t === mc ? (t = Ym(), Xe = 4) : Xe = t === Pc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, sn = t, Ue === null && (mt = 1, Js(
      e,
      mn(t, e.current)
    ));
  }
  function Ay() {
    var e = ln.current;
    return e === null ? !0 : (Be & 4194048) === Be ? vn === null : (Be & 62914560) === Be || (Be & 536870912) !== 0 ? e === vn : !1;
  }
  function jy() {
    var e = z.H;
    return z.H = fr, e === null ? fr : e;
  }
  function Dy() {
    var e = z.A;
    return z.A = rE, e;
  }
  function co() {
    mt = 4, Ha || (Be & 4194048) !== Be && ln.current !== null || (yl = !0), (qa & 134217727) === 0 && (Ai & 134217727) === 0 || et === null || Ya(
      et,
      Be,
      on,
      !1
    );
  }
  function df(e, t, i) {
    var r = Ge;
    Ge |= 2;
    var u = jy(), f = Dy();
    (et !== e || Be !== t) && (oo = null, bl(e, t)), t = !1;
    var g = mt;
    e: do
      try {
        if (Xe !== 0 && Ue !== null) {
          var E = Ue, C = sn;
          switch (Xe) {
            case 8:
              ff(), g = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ln.current === null && (t = !0);
              var q = Xe;
              if (Xe = 0, sn = null, Sl(e, E, C, q), i && yl) {
                g = 0;
                break e;
              }
              break;
            default:
              q = Xe, Xe = 0, sn = null, Sl(e, E, C, q);
          }
        }
        uE(), g = mt;
        break;
      } catch ($) {
        My(e, $);
      }
    while (!0);
    return t && e.shellSuspendCounter++, la = bi = null, Ge = r, z.H = u, z.A = f, Ue === null && (et = null, Be = 0, Ds()), g;
  }
  function uE() {
    for (; Ue !== null; ) Ny(Ue);
  }
  function cE(e, t) {
    var i = Ge;
    Ge |= 2;
    var r = jy(), u = Dy();
    et !== e || Be !== t ? (oo = null, so = Yt() + 500, bl(e, t)) : yl = wa(
      e,
      t
    );
    e: do
      try {
        if (Xe !== 0 && Ue !== null) {
          t = Ue;
          var f = sn;
          t: switch (Xe) {
            case 1:
              Xe = 0, sn = null, Sl(e, t, f, 1);
              break;
            case 2:
            case 9:
              if (km(f)) {
                Xe = 0, sn = null, zy(t);
                break;
              }
              t = function() {
                Xe !== 2 && Xe !== 9 || et !== e || (Xe = 7), Gn(e);
              }, f.then(t, t);
              break e;
            case 3:
              Xe = 7;
              break e;
            case 4:
              Xe = 5;
              break e;
            case 7:
              km(f) ? (Xe = 0, sn = null, zy(t)) : (Xe = 0, sn = null, Sl(e, t, f, 7));
              break;
            case 5:
              var g = null;
              switch (Ue.tag) {
                case 26:
                  g = Ue.memoizedState;
                case 5:
                case 27:
                  var E = Ue;
                  if (g ? gg(g) : E.stateNode.complete) {
                    Xe = 0, sn = null;
                    var C = E.sibling;
                    if (C !== null) Ue = C;
                    else {
                      var q = E.return;
                      q !== null ? (Ue = q, fo(q)) : Ue = null;
                    }
                    break t;
                  }
              }
              Xe = 0, sn = null, Sl(e, t, f, 5);
              break;
            case 6:
              Xe = 0, sn = null, Sl(e, t, f, 6);
              break;
            case 8:
              ff(), mt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        fE();
        break;
      } catch ($) {
        My(e, $);
      }
    while (!0);
    return la = bi = null, z.H = r, z.A = u, Ge = i, Ue !== null ? 0 : (et = null, Be = 0, Ds(), mt);
  }
  function fE() {
    for (; Ue !== null && !Au(); )
      Ny(Ue);
  }
  function Ny(e) {
    var t = ty(e.alternate, e, pa);
    e.memoizedProps = e.pendingProps, t === null ? fo(e) : Ue = t;
  }
  function zy(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Qp(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Be
        );
        break;
      case 11:
        t = Qp(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Be
        );
        break;
      case 5:
        Cc(t);
      default:
        ay(i, t), t = Ue = Dm(t, pa), t = ty(i, t, pa);
    }
    e.memoizedProps = e.pendingProps, t === null ? fo(e) : Ue = t;
  }
  function Sl(e, t, i, r) {
    la = bi = null, Cc(t), ul = null, ar = 0;
    var u = t.return;
    try {
      if (Wx(
        e,
        u,
        t,
        i,
        Be
      )) {
        mt = 1, Js(
          e,
          mn(i, e.current)
        ), Ue = null;
        return;
      }
    } catch (f) {
      if (u !== null) throw Ue = u, f;
      mt = 1, Js(
        e,
        mn(i, e.current)
      ), Ue = null;
      return;
    }
    t.flags & 32768 ? (qe || r === 1 ? e = !0 : yl || (Be & 536870912) !== 0 ? e = !1 : (Ha = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = ln.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Oy(t, e)) : fo(t);
  }
  function fo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Oy(
          t,
          Ha
        );
        return;
      }
      e = t.return;
      var i = nE(
        t.alternate,
        t,
        pa
      );
      if (i !== null) {
        Ue = i;
        return;
      }
      if (t = t.sibling, t !== null) {
        Ue = t;
        return;
      }
      Ue = t = e;
    } while (t !== null);
    mt === 0 && (mt = 5);
  }
  function Oy(e, t) {
    do {
      var i = aE(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Ue = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !t && (e = e.sibling, e !== null)) {
        Ue = e;
        return;
      }
      Ue = e = i;
    } while (e !== null);
    mt = 6, Ue = null;
  }
  function _y(e, t, i, r, u, f, g, E, C) {
    e.cancelPendingCommit = null;
    do
      ho();
    while (Mt !== 0);
    if ((Ge & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (f = t.lanes | t.childLanes, f |= Wu, gs(
        e,
        i,
        f,
        g,
        E,
        C
      ), e === et && (Ue = et = null, Be = 0), vl = t, Pa = e, ya = i, of = f, uf = u, Ty = r, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, pE(Ra, function() {
        return Hy(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || r) {
        r = z.T, z.T = null, u = ne.p, ne.p = 2, g = Ge, Ge |= 4;
        try {
          iE(e, t, i);
        } finally {
          Ge = g, ne.p = u, z.T = r;
        }
      }
      Mt = 1, Ly(), Uy(), Vy();
    }
  }
  function Ly() {
    if (Mt === 1) {
      Mt = 0;
      var e = Pa, t = vl, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = z.T, z.T = null;
        var r = ne.p;
        ne.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          py(t, e);
          var f = Rf, g = xm(e.containerInfo), E = f.focusedElem, C = f.selectionRange;
          if (g !== E && E && E.ownerDocument && Sm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (C !== null && Ku(E)) {
              var q = C.start, $ = C.end;
              if ($ === void 0 && ($ = q), "selectionStart" in E)
                E.selectionStart = q, E.selectionEnd = Math.min(
                  $,
                  E.value.length
                );
              else {
                var W = E.ownerDocument || document, Y = W && W.defaultView || window;
                if (Y.getSelection) {
                  var G = Y.getSelection(), me = E.textContent.length, Ce = Math.min(C.start, me), Je = C.end === void 0 ? Ce : Math.min(C.end, me);
                  !G.extend && Ce > Je && (g = Je, Je = Ce, Ce = g);
                  var U = bm(
                    E,
                    Ce
                  ), N = bm(
                    E,
                    Je
                  );
                  if (U && N && (G.rangeCount !== 1 || G.anchorNode !== U.node || G.anchorOffset !== U.offset || G.focusNode !== N.node || G.focusOffset !== N.offset)) {
                    var H = W.createRange();
                    H.setStart(U.node, U.offset), G.removeAllRanges(), Ce > Je ? (G.addRange(H), G.extend(N.node, N.offset)) : (H.setEnd(N.node, N.offset), G.addRange(H));
                  }
                }
              }
            }
            for (W = [], G = E; G = G.parentNode; )
              G.nodeType === 1 && W.push({
                element: G,
                left: G.scrollLeft,
                top: G.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < W.length; E++) {
              var I = W[E];
              I.element.scrollLeft = I.left, I.element.scrollTop = I.top;
            }
          }
          wo = !!Tf, Rf = Tf = null;
        } finally {
          Ge = u, ne.p = r, z.T = i;
        }
      }
      e.current = t, Mt = 2;
    }
  }
  function Uy() {
    if (Mt === 2) {
      Mt = 0;
      var e = Pa, t = vl, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = z.T, z.T = null;
        var r = ne.p;
        ne.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          cy(e, t.alternate, t);
        } finally {
          Ge = u, ne.p = r, z.T = i;
        }
      }
      Mt = 3;
    }
  }
  function Vy() {
    if (Mt === 4 || Mt === 3) {
      Mt = 0, ju();
      var e = Pa, t = vl, i = ya, r = Ty;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Mt = 5 : (Mt = 0, vl = Pa = null, By(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (ka = null), k(i), t = t.stateNode, Gt && typeof Gt.onCommitFiberRoot == "function")
        try {
          Gt.onCommitFiberRoot(
            Wn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        t = z.T, u = ne.p, ne.p = 2, z.T = null;
        try {
          for (var f = e.onRecoverableError, g = 0; g < r.length; g++) {
            var E = r[g];
            f(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          z.T = t, ne.p = u;
        }
      }
      (ya & 3) !== 0 && ho(), Gn(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === cf ? Sr++ : (Sr = 0, cf = e) : Sr = 0, xr(0);
    }
  }
  function By(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, tr(t)));
  }
  function ho() {
    return Ly(), Uy(), Vy(), Hy();
  }
  function Hy() {
    if (Mt !== 5) return !1;
    var e = Pa, t = of;
    of = 0;
    var i = k(ya), r = z.T, u = ne.p;
    try {
      ne.p = 32 > i ? 32 : i, z.T = null, i = uf, uf = null;
      var f = Pa, g = ya;
      if (Mt = 0, vl = Pa = null, ya = 0, (Ge & 6) !== 0) throw Error(s(331));
      var E = Ge;
      if (Ge |= 4, Sy(f.current), gy(
        f,
        f.current,
        g,
        i
      ), Ge = E, xr(0, !1), Gt && typeof Gt.onPostCommitFiberRoot == "function")
        try {
          Gt.onPostCommitFiberRoot(Wn, f);
        } catch {
        }
      return !0;
    } finally {
      ne.p = u, z.T = r, By(e, t);
    }
  }
  function qy(e, t, i) {
    t = mn(i, t), t = kc(e.stateNode, t, 2), e = La(e, t, 2), e !== null && (Bn(e, 2), Gn(e));
  }
  function Ke(e, t, i) {
    if (e.tag === 3)
      qy(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          qy(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ka === null || !ka.has(r))) {
            e = mn(i, e), i = kp(2), r = La(t, i, 2), r !== null && (Pp(
              i,
              r,
              t,
              e
            ), Bn(r, 2), Gn(r));
            break;
          }
        }
        t = t.return;
      }
  }
  function hf(e, t, i) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new sE();
      var u = /* @__PURE__ */ new Set();
      r.set(t, u);
    } else
      u = r.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), r.set(t, u));
    u.has(i) || (lf = !0, u.add(i), e = dE.bind(null, e, t, i), t.then(e, e));
  }
  function dE(e, t, i) {
    var r = e.pingCache;
    r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, et === e && (Be & i) === i && (mt === 4 || mt === 3 && (Be & 62914560) === Be && 300 > Yt() - ro ? (Ge & 2) === 0 && bl(e, 0) : rf |= i, gl === Be && (gl = 0)), Gn(e);
  }
  function ky(e, t) {
    t === 0 && (t = Yl()), e = yi(e, t), e !== null && (Bn(e, t), Gn(e));
  }
  function hE(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), ky(e, i);
  }
  function mE(e, t) {
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
    r !== null && r.delete(t), ky(e, i);
  }
  function pE(e, t) {
    return ot(e, t);
  }
  var mo = null, xl = null, mf = !1, po = !1, pf = !1, Ga = 0;
  function Gn(e) {
    e !== xl && e.next === null && (xl === null ? mo = xl = e : xl = xl.next = e), po = !0, mf || (mf = !0, gE());
  }
  function xr(e, t) {
    if (!pf && po) {
      pf = !0;
      do
        for (var i = !1, r = mo; r !== null; ) {
          if (e !== 0) {
            var u = r.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var g = r.suspendedLanes, E = r.pingedLanes;
              f = (1 << 31 - Ht(42 | e) + 1) - 1, f &= u & ~(g & ~E), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (i = !0, Fy(r, f));
          } else
            f = Be, f = Yi(
              r,
              r === et ? f : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (f & 3) === 0 || wa(r, f) || (i = !0, Fy(r, f));
          r = r.next;
        }
      while (i);
      pf = !1;
    }
  }
  function yE() {
    Py();
  }
  function Py() {
    po = mf = !1;
    var e = 0;
    Ga !== 0 && ME() && (e = Ga);
    for (var t = Yt(), i = null, r = mo; r !== null; ) {
      var u = r.next, f = Yy(r, t);
      f === 0 ? (r.next = null, i === null ? mo = u : i.next = u, u === null && (xl = i)) : (i = r, (e !== 0 || (f & 3) !== 0) && (po = !0)), r = u;
    }
    Mt !== 0 && Mt !== 5 || xr(e), Ga !== 0 && (Ga = 0);
  }
  function Yy(e, t) {
    for (var i = e.suspendedLanes, r = e.pingedLanes, u = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var g = 31 - Ht(f), E = 1 << g, C = u[g];
      C === -1 ? ((E & i) === 0 || (E & r) !== 0) && (u[g] = zu(E, t)) : C <= t && (e.expiredLanes |= E), f &= ~E;
    }
    if (t = et, i = Be, i = Yi(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, i === 0 || e === t && (Xe === 2 || Xe === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && Zn(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || wa(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (r !== null && Zn(r), k(i)) {
        case 2:
        case 8:
          i = Pl;
          break;
        case 32:
          i = Ra;
          break;
        case 268435456:
          i = fn;
          break;
        default:
          i = Ra;
      }
      return r = Gy.bind(null, e), i = ot(i, r), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return r !== null && r !== null && Zn(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Gy(e, t) {
    if (Mt !== 0 && Mt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (ho() && e.callbackNode !== i)
      return null;
    var r = Be;
    return r = Yi(
      e,
      e === et ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (wy(e, r, t), Yy(e, Yt()), e.callbackNode != null && e.callbackNode === i ? Gy.bind(null, e) : null);
  }
  function Fy(e, t) {
    if (ho()) return null;
    wy(e, t, !0);
  }
  function gE() {
    jE(function() {
      (Ge & 6) !== 0 ? ot(
        Ta,
        yE
      ) : Py();
    });
  }
  function yf() {
    if (Ga === 0) {
      var e = rl;
      e === 0 && (e = ui, ui <<= 1, (ui & 261888) === 0 && (ui = 256)), Ga = e;
    }
    return Ga;
  }
  function $y(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Es("" + e);
  }
  function Xy(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function vE(e, t, i, r, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var f = $y(
        (u[de] || null).action
      ), g = r.submitter;
      g && (t = (t = g[de] || null) ? $y(t.formAction) : g.getAttribute("formAction"), t !== null && (f = t, g = null));
      var E = new Cs(
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
                if (Ga !== 0) {
                  var C = g ? Xy(u, g) : new FormData(u);
                  Lc(
                    i,
                    {
                      pending: !0,
                      data: C,
                      method: u.method,
                      action: f
                    },
                    null,
                    C
                  );
                }
              } else
                typeof f == "function" && (E.preventDefault(), C = g ? Xy(u, g) : new FormData(u), Lc(
                  i,
                  {
                    pending: !0,
                    data: C,
                    method: u.method,
                    action: f
                  },
                  f,
                  C
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var gf = 0; gf < Ju.length; gf++) {
    var vf = Ju[gf], bE = vf.toLowerCase(), SE = vf[0].toUpperCase() + vf.slice(1);
    Dn(
      bE,
      "on" + SE
    );
  }
  Dn(Rm, "onAnimationEnd"), Dn(wm, "onAnimationIteration"), Dn(Cm, "onAnimationStart"), Dn("dblclick", "onDoubleClick"), Dn("focusin", "onFocus"), Dn("focusout", "onBlur"), Dn(Ux, "onTransitionRun"), Dn(Vx, "onTransitionStart"), Dn(Bx, "onTransitionCancel"), Dn(Mm, "onTransitionEnd"), Hn("onMouseEnter", ["mouseout", "mouseover"]), Hn("onMouseLeave", ["mouseout", "mouseover"]), Hn("onPointerEnter", ["pointerout", "pointerover"]), Hn("onPointerLeave", ["pointerout", "pointerover"]), Dt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Dt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Dt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Dt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Dt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Dt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Er = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), xE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Er)
  );
  function Ky(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var r = e[i], u = r.event;
      r = r.listeners;
      e: {
        var f = void 0;
        if (t)
          for (var g = r.length - 1; 0 <= g; g--) {
            var E = r[g], C = E.instance, q = E.currentTarget;
            if (E = E.listener, C !== f && u.isPropagationStopped())
              break e;
            f = E, u.currentTarget = q;
            try {
              f(u);
            } catch ($) {
              js($);
            }
            u.currentTarget = null, f = C;
          }
        else
          for (g = 0; g < r.length; g++) {
            if (E = r[g], C = E.instance, q = E.currentTarget, E = E.listener, C !== f && u.isPropagationStopped())
              break e;
            f = E, u.currentTarget = q;
            try {
              f(u);
            } catch ($) {
              js($);
            }
            u.currentTarget = null, f = C;
          }
      }
    }
  }
  function Ve(e, t) {
    var i = t[he];
    i === void 0 && (i = t[he] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    i.has(r) || (Qy(t, e, 2, !1), i.add(r));
  }
  function bf(e, t, i) {
    var r = 0;
    t && (r |= 4), Qy(
      i,
      e,
      r,
      t
    );
  }
  var yo = "_reactListening" + Math.random().toString(36).slice(2);
  function Sf(e) {
    if (!e[yo]) {
      e[yo] = !0, Ma.forEach(function(i) {
        i !== "selectionchange" && (xE.has(i) || bf(i, !1, e), bf(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[yo] || (t[yo] = !0, bf("selectionchange", !1, t));
    }
  }
  function Qy(e, t, i, r) {
    switch (Rg(t)) {
      case 2:
        var u = QE;
        break;
      case 8:
        u = IE;
        break;
      default:
        u = Lf;
    }
    i = u.bind(
      null,
      t,
      i,
      e
    ), u = void 0, !Hu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), r ? u !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, i, !0) : u !== void 0 ? e.addEventListener(t, i, {
      passive: u
    }) : e.addEventListener(t, i, !1);
  }
  function xf(e, t, i, r, u) {
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
              var C = g.tag;
              if ((C === 3 || C === 4) && g.stateNode.containerInfo === u)
                return;
              g = g.return;
            }
          for (; E !== null; ) {
            if (g = Qe(E), g === null) return;
            if (C = g.tag, C === 5 || C === 6 || C === 26 || C === 27) {
              r = f = g;
              continue e;
            }
            E = E.parentNode;
          }
        }
        r = r.return;
      }
    em(function() {
      var q = f, $ = Vu(i), W = [];
      e: {
        var Y = Am.get(e);
        if (Y !== void 0) {
          var G = Cs, me = e;
          switch (e) {
            case "keypress":
              if (Rs(i) === 0) break e;
            case "keydown":
            case "keyup":
              G = mx;
              break;
            case "focusin":
              me = "focus", G = Yu;
              break;
            case "focusout":
              me = "blur", G = Yu;
              break;
            case "beforeblur":
            case "afterblur":
              G = Yu;
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
              G = am;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              G = nx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              G = gx;
              break;
            case Rm:
            case wm:
            case Cm:
              G = lx;
              break;
            case Mm:
              G = bx;
              break;
            case "scroll":
            case "scrollend":
              G = ex;
              break;
            case "wheel":
              G = xx;
              break;
            case "copy":
            case "cut":
            case "paste":
              G = sx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              G = lm;
              break;
            case "toggle":
            case "beforetoggle":
              G = Tx;
          }
          var Ce = (t & 4) !== 0, Je = !Ce && (e === "scroll" || e === "scrollend"), U = Ce ? Y !== null ? Y + "Capture" : null : Y;
          Ce = [];
          for (var N = q, H; N !== null; ) {
            var I = N;
            if (H = I.stateNode, I = I.tag, I !== 5 && I !== 26 && I !== 27 || H === null || U === null || (I = Gl(N, U), I != null && Ce.push(
              Tr(N, I, H)
            )), Je) break;
            N = N.return;
          }
          0 < Ce.length && (Y = new G(
            Y,
            me,
            null,
            i,
            $
          ), W.push({ event: Y, listeners: Ce }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (Y = e === "mouseover" || e === "pointerover", G = e === "mouseout" || e === "pointerout", Y && i !== Uu && (me = i.relatedTarget || i.fromElement) && (Qe(me) || me[ge]))
            break e;
          if ((G || Y) && (Y = $.window === $ ? $ : (Y = $.ownerDocument) ? Y.defaultView || Y.parentWindow : window, G ? (me = i.relatedTarget || i.toElement, G = q, me = me ? Qe(me) : null, me !== null && (Je = c(me), Ce = me.tag, me !== Je || Ce !== 5 && Ce !== 27 && Ce !== 6) && (me = null)) : (G = null, me = q), G !== me)) {
            if (Ce = am, I = "onMouseLeave", U = "onMouseEnter", N = "mouse", (e === "pointerout" || e === "pointerover") && (Ce = lm, I = "onPointerLeave", U = "onPointerEnter", N = "pointer"), Je = G == null ? Y : Le(G), H = me == null ? Y : Le(me), Y = new Ce(
              I,
              N + "leave",
              G,
              i,
              $
            ), Y.target = Je, Y.relatedTarget = H, I = null, Qe($) === q && (Ce = new Ce(
              U,
              N + "enter",
              me,
              i,
              $
            ), Ce.target = H, Ce.relatedTarget = Je, I = Ce), Je = I, G && me)
              t: {
                for (Ce = EE, U = G, N = me, H = 0, I = U; I; I = Ce(I))
                  H++;
                I = 0;
                for (var Ee = N; Ee; Ee = Ce(Ee))
                  I++;
                for (; 0 < H - I; )
                  U = Ce(U), H--;
                for (; 0 < I - H; )
                  N = Ce(N), I--;
                for (; H--; ) {
                  if (U === N || N !== null && U === N.alternate) {
                    Ce = U;
                    break t;
                  }
                  U = Ce(U), N = Ce(N);
                }
                Ce = null;
              }
            else Ce = null;
            G !== null && Iy(
              W,
              Y,
              G,
              Ce,
              !1
            ), me !== null && Je !== null && Iy(
              W,
              Je,
              me,
              Ce,
              !0
            );
          }
        }
        e: {
          if (Y = q ? Le(q) : window, G = Y.nodeName && Y.nodeName.toLowerCase(), G === "select" || G === "input" && Y.type === "file")
            var Pe = hm;
          else if (fm(Y))
            if (mm)
              Pe = Ox;
            else {
              Pe = Nx;
              var ve = Dx;
            }
          else
            G = Y.nodeName, !G || G.toLowerCase() !== "input" || Y.type !== "checkbox" && Y.type !== "radio" ? q && Lu(q.elementType) && (Pe = hm) : Pe = zx;
          if (Pe && (Pe = Pe(e, q))) {
            dm(
              W,
              Pe,
              i,
              $
            );
            break e;
          }
          ve && ve(e, Y, q), e === "focusout" && q && Y.type === "number" && q.memoizedProps.value != null && _u(Y, "number", Y.value);
        }
        switch (ve = q ? Le(q) : window, e) {
          case "focusin":
            (fm(ve) || ve.contentEditable === "true") && (Ji = ve, Qu = q, Jl = null);
            break;
          case "focusout":
            Jl = Qu = Ji = null;
            break;
          case "mousedown":
            Iu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Iu = !1, Em(W, i, $);
            break;
          case "selectionchange":
            if (Lx) break;
          case "keydown":
          case "keyup":
            Em(W, i, $);
        }
        var je;
        if (Fu)
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
          Zi ? um(e, i) && (He = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (He = "onCompositionStart");
        He && (rm && i.locale !== "ko" && (Zi || He !== "onCompositionStart" ? He === "onCompositionEnd" && Zi && (je = tm()) : (Aa = $, qu = "value" in Aa ? Aa.value : Aa.textContent, Zi = !0)), ve = go(q, He), 0 < ve.length && (He = new im(
          He,
          e,
          null,
          i,
          $
        ), W.push({ event: He, listeners: ve }), je ? He.data = je : (je = cm(i), je !== null && (He.data = je)))), (je = wx ? Cx(e, i) : Mx(e, i)) && (He = go(q, "onBeforeInput"), 0 < He.length && (ve = new im(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          $
        ), W.push({
          event: ve,
          listeners: He
        }), ve.data = je)), vE(
          W,
          e,
          q,
          i,
          $
        );
      }
      Ky(W, t);
    });
  }
  function Tr(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function go(e, t) {
    for (var i = t + "Capture", r = []; e !== null; ) {
      var u = e, f = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || f === null || (u = Gl(e, i), u != null && r.unshift(
        Tr(e, u, f)
      ), u = Gl(e, t), u != null && r.push(
        Tr(e, u, f)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function EE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Iy(e, t, i, r, u) {
    for (var f = t._reactName, g = []; i !== null && i !== r; ) {
      var E = i, C = E.alternate, q = E.stateNode;
      if (E = E.tag, C !== null && C === r) break;
      E !== 5 && E !== 26 && E !== 27 || q === null || (C = q, u ? (q = Gl(i, f), q != null && g.unshift(
        Tr(i, q, C)
      )) : u || (q = Gl(i, f), q != null && g.push(
        Tr(i, q, C)
      ))), i = i.return;
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  var TE = /\r\n?/g, RE = /\u0000|\uFFFD/g;
  function Zy(e) {
    return (typeof e == "string" ? e : "" + e).replace(TE, `
`).replace(RE, "");
  }
  function Jy(e, t) {
    return t = Zy(t), Zy(e) === t;
  }
  function Ze(e, t, i, r, u, f) {
    switch (i) {
      case "children":
        typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Ki(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Ki(e, "" + r);
        break;
      case "className":
        yt(e, "class", r);
        break;
      case "tabIndex":
        yt(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        yt(e, i, r);
        break;
      case "style":
        Jh(e, r, f);
        break;
      case "data":
        if (t !== "object") {
          yt(e, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (t !== "a" || i !== "href")) {
          e.removeAttribute(i);
          break;
        }
        if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(i);
          break;
        }
        r = Es("" + r), e.setAttribute(i, r);
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
          typeof f == "function" && (i === "formAction" ? (t !== "input" && Ze(e, t, "name", u.name, u, null), Ze(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Ze(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Ze(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Ze(e, t, "encType", u.encType, u, null), Ze(e, t, "method", u.method, u, null), Ze(e, t, "target", u.target, u, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(i);
          break;
        }
        r = Es("" + r), e.setAttribute(i, r);
        break;
      case "onClick":
        r != null && (e.onclick = ta);
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
        i = Es("" + r), e.setAttributeNS(
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
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = J1.get(i) || i, ze(e, i, r));
    }
  }
  function Ef(e, t, i, r, u, f) {
    switch (i) {
      case "style":
        Jh(e, r, f);
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
        typeof r == "string" ? Ki(e, r) : (typeof r == "number" || typeof r == "bigint") && Ki(e, "" + r);
        break;
      case "onScroll":
        r != null && Ve("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Ve("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = ta);
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
        if (!jn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), t = i.slice(2, u ? i.length - 7 : void 0), f = e[de] || null, f = f != null ? f[i] : null, typeof f == "function" && e.removeEventListener(t, f, u), typeof r == "function")) {
              typeof f != "function" && f !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, r, u);
              break e;
            }
            i in e ? e[i] = r : r === !0 ? e.setAttribute(i, "") : ze(e, i, r);
          }
    }
  }
  function Lt(e, t, i) {
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
        Ve("error", e), Ve("load", e);
        var r = !1, u = !1, f;
        for (f in i)
          if (i.hasOwnProperty(f)) {
            var g = i[f];
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
                  Ze(e, t, f, g, i, null);
              }
          }
        u && Ze(e, t, "srcSet", i.srcSet, i, null), r && Ze(e, t, "src", i.src, i, null);
        return;
      case "input":
        Ve("invalid", e);
        var E = f = g = u = null, C = null, q = null;
        for (r in i)
          if (i.hasOwnProperty(r)) {
            var $ = i[r];
            if ($ != null)
              switch (r) {
                case "name":
                  u = $;
                  break;
                case "type":
                  g = $;
                  break;
                case "checked":
                  C = $;
                  break;
                case "defaultChecked":
                  q = $;
                  break;
                case "value":
                  f = $;
                  break;
                case "defaultValue":
                  E = $;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if ($ != null)
                    throw Error(s(137, t));
                  break;
                default:
                  Ze(e, t, r, $, i, null);
              }
          }
        Kh(
          e,
          f,
          E,
          C,
          q,
          g,
          u,
          !1
        );
        return;
      case "select":
        Ve("invalid", e), r = g = f = null;
        for (u in i)
          if (i.hasOwnProperty(u) && (E = i[u], E != null))
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
                Ze(e, t, u, E, i, null);
            }
        t = f, i = g, e.multiple = !!r, t != null ? Xi(e, !!r, t, !1) : i != null && Xi(e, !!r, i, !0);
        return;
      case "textarea":
        Ve("invalid", e), f = u = r = null;
        for (g in i)
          if (i.hasOwnProperty(g) && (E = i[g], E != null))
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
                Ze(e, t, g, E, i, null);
            }
        Ih(e, r, u, f);
        return;
      case "option":
        for (C in i)
          if (i.hasOwnProperty(C) && (r = i[C], r != null))
            switch (C) {
              case "selected":
                e.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                Ze(e, t, C, r, i, null);
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
        for (r = 0; r < Er.length; r++)
          Ve(Er[r], e);
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
        for (q in i)
          if (i.hasOwnProperty(q) && (r = i[q], r != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                Ze(e, t, q, r, i, null);
            }
        return;
      default:
        if (Lu(t)) {
          for ($ in i)
            i.hasOwnProperty($) && (r = i[$], r !== void 0 && Ef(
              e,
              t,
              $,
              r,
              i,
              void 0
            ));
          return;
        }
    }
    for (E in i)
      i.hasOwnProperty(E) && (r = i[E], r != null && Ze(e, t, E, r, i, null));
  }
  function wE(e, t, i, r) {
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
        var u = null, f = null, g = null, E = null, C = null, q = null, $ = null;
        for (G in i) {
          var W = i[G];
          if (i.hasOwnProperty(G) && W != null)
            switch (G) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                C = W;
              default:
                r.hasOwnProperty(G) || Ze(e, t, G, null, r, W);
            }
        }
        for (var Y in r) {
          var G = r[Y];
          if (W = i[Y], r.hasOwnProperty(Y) && (G != null || W != null))
            switch (Y) {
              case "type":
                f = G;
                break;
              case "name":
                u = G;
                break;
              case "checked":
                q = G;
                break;
              case "defaultChecked":
                $ = G;
                break;
              case "value":
                g = G;
                break;
              case "defaultValue":
                E = G;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (G != null)
                  throw Error(s(137, t));
                break;
              default:
                G !== W && Ze(
                  e,
                  t,
                  Y,
                  G,
                  r,
                  W
                );
            }
        }
        Ou(
          e,
          g,
          E,
          C,
          q,
          $,
          f,
          u
        );
        return;
      case "select":
        G = g = E = Y = null;
        for (f in i)
          if (C = i[f], i.hasOwnProperty(f) && C != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                G = C;
              default:
                r.hasOwnProperty(f) || Ze(
                  e,
                  t,
                  f,
                  null,
                  r,
                  C
                );
            }
        for (u in r)
          if (f = r[u], C = i[u], r.hasOwnProperty(u) && (f != null || C != null))
            switch (u) {
              case "value":
                Y = f;
                break;
              case "defaultValue":
                E = f;
                break;
              case "multiple":
                g = f;
              default:
                f !== C && Ze(
                  e,
                  t,
                  u,
                  f,
                  r,
                  C
                );
            }
        t = E, i = g, r = G, Y != null ? Xi(e, !!i, Y, !1) : !!r != !!i && (t != null ? Xi(e, !!i, t, !0) : Xi(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        G = Y = null;
        for (E in i)
          if (u = i[E], i.hasOwnProperty(E) && u != null && !r.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ze(e, t, E, null, r, u);
            }
        for (g in r)
          if (u = r[g], f = i[g], r.hasOwnProperty(g) && (u != null || f != null))
            switch (g) {
              case "value":
                Y = u;
                break;
              case "defaultValue":
                G = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== f && Ze(e, t, g, u, r, f);
            }
        Qh(e, Y, G);
        return;
      case "option":
        for (var me in i)
          if (Y = i[me], i.hasOwnProperty(me) && Y != null && !r.hasOwnProperty(me))
            switch (me) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ze(
                  e,
                  t,
                  me,
                  null,
                  r,
                  Y
                );
            }
        for (C in r)
          if (Y = r[C], G = i[C], r.hasOwnProperty(C) && Y !== G && (Y != null || G != null))
            switch (C) {
              case "selected":
                e.selected = Y && typeof Y != "function" && typeof Y != "symbol";
                break;
              default:
                Ze(
                  e,
                  t,
                  C,
                  Y,
                  r,
                  G
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
          Y = i[Ce], i.hasOwnProperty(Ce) && Y != null && !r.hasOwnProperty(Ce) && Ze(e, t, Ce, null, r, Y);
        for (q in r)
          if (Y = r[q], G = i[q], r.hasOwnProperty(q) && Y !== G && (Y != null || G != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null)
                  throw Error(s(137, t));
                break;
              default:
                Ze(
                  e,
                  t,
                  q,
                  Y,
                  r,
                  G
                );
            }
        return;
      default:
        if (Lu(t)) {
          for (var Je in i)
            Y = i[Je], i.hasOwnProperty(Je) && Y !== void 0 && !r.hasOwnProperty(Je) && Ef(
              e,
              t,
              Je,
              void 0,
              r,
              Y
            );
          for ($ in r)
            Y = r[$], G = i[$], !r.hasOwnProperty($) || Y === G || Y === void 0 && G === void 0 || Ef(
              e,
              t,
              $,
              Y,
              r,
              G
            );
          return;
        }
    }
    for (var U in i)
      Y = i[U], i.hasOwnProperty(U) && Y != null && !r.hasOwnProperty(U) && Ze(e, t, U, null, r, Y);
    for (W in r)
      Y = r[W], G = i[W], !r.hasOwnProperty(W) || Y === G || Y == null && G == null || Ze(e, t, W, Y, r, G);
  }
  function Wy(e) {
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
  function CE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), r = 0; r < i.length; r++) {
        var u = i[r], f = u.transferSize, g = u.initiatorType, E = u.duration;
        if (f && E && Wy(g)) {
          for (g = 0, E = u.responseEnd, r += 1; r < i.length; r++) {
            var C = i[r], q = C.startTime;
            if (q > E) break;
            var $ = C.transferSize, W = C.initiatorType;
            $ && Wy(W) && (C = C.responseEnd, g += $ * (C < E ? 1 : (E - q) / (C - q)));
          }
          if (--r, t += 8 * (f + g) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Tf = null, Rf = null;
  function vo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function eg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function tg(e, t) {
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
  function wf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Cf = null;
  function ME() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Cf ? !1 : (Cf = e, !0) : (Cf = null, !1);
  }
  var ng = typeof setTimeout == "function" ? setTimeout : void 0, AE = typeof clearTimeout == "function" ? clearTimeout : void 0, ag = typeof Promise == "function" ? Promise : void 0, jE = typeof queueMicrotask == "function" ? queueMicrotask : typeof ag < "u" ? function(e) {
    return ag.resolve(null).then(e).catch(DE);
  } : ng;
  function DE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Fa(e) {
    return e === "head";
  }
  function ig(e, t) {
    var i = t, r = 0;
    do {
      var u = i.nextSibling;
      if (e.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (r === 0) {
            e.removeChild(u), wl(t);
            return;
          }
          r--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          r++;
        else if (i === "html")
          Rr(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, Rr(i);
          for (var f = i.firstChild; f; ) {
            var g = f.nextSibling, E = f.nodeName;
            f[Ne] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && f.rel.toLowerCase() === "stylesheet" || i.removeChild(f), f = g;
          }
        } else
          i === "body" && Rr(e.ownerDocument.body);
      i = u;
    } while (i);
    wl(t);
  }
  function lg(e, t) {
    var i = e;
    e = 0;
    do {
      var r = i.nextSibling;
      if (i.nodeType === 1 ? t ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (t ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), r && r.nodeType === 8)
        if (i = r.data, i === "/$") {
          if (e === 0) break;
          e--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || e++;
      i = r;
    } while (i);
  }
  function Mf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Mf(i), We(i);
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
  function NE(e, t, i, r) {
    for (; e.nodeType === 1; ) {
      var u = i;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (r) {
        if (!e[Ne])
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
      if (e = bn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function zE(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = bn(e.nextSibling), e === null)) return null;
    return e;
  }
  function rg(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = bn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Af(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function jf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function OE(e, t) {
    var i = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || i.readyState !== "loading")
      t();
    else {
      var r = function() {
        t(), i.removeEventListener("DOMContentLoaded", r);
      };
      i.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
    }
  }
  function bn(e) {
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
  var Df = null;
  function sg(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (t === 0)
            return bn(e.nextSibling);
          t--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function og(e) {
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
  function ug(e, t, i) {
    switch (t = vo(i), e) {
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
  function Rr(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    We(e);
  }
  var Sn = /* @__PURE__ */ new Map(), cg = /* @__PURE__ */ new Set();
  function bo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ga = ne.d;
  ne.d = {
    f: _E,
    r: LE,
    D: UE,
    C: VE,
    L: BE,
    m: HE,
    X: kE,
    S: qE,
    M: PE
  };
  function _E() {
    var e = ga.f(), t = uo();
    return e || t;
  }
  function LE(e) {
    var t = ut(e);
    t !== null && t.tag === 5 && t.type === "form" ? Mp(t) : ga.r(e);
  }
  var El = typeof document > "u" ? null : document;
  function fg(e, t, i) {
    var r = El;
    if (r && typeof t == "string" && t) {
      var u = dn(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), cg.has(u) || (cg.add(u), e = { rel: e, crossOrigin: i, href: t }, r.querySelector(u) === null && (t = r.createElement("link"), Lt(t, "link", e), nt(t), r.head.appendChild(t)));
    }
  }
  function UE(e) {
    ga.D(e), fg("dns-prefetch", e, null);
  }
  function VE(e, t) {
    ga.C(e, t), fg("preconnect", e, t);
  }
  function BE(e, t, i) {
    ga.L(e, t, i);
    var r = El;
    if (r && e && t) {
      var u = 'link[rel="preload"][as="' + dn(t) + '"]';
      t === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + dn(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + dn(
        i.imageSizes
      ) + '"]')) : u += '[href="' + dn(e) + '"]';
      var f = u;
      switch (t) {
        case "style":
          f = Tl(e);
          break;
        case "script":
          f = Rl(e);
      }
      Sn.has(f) || (e = b(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), Sn.set(f, e), r.querySelector(u) !== null || t === "style" && r.querySelector(wr(f)) || t === "script" && r.querySelector(Cr(f)) || (t = r.createElement("link"), Lt(t, "link", e), nt(t), r.head.appendChild(t)));
    }
  }
  function HE(e, t) {
    ga.m(e, t);
    var i = El;
    if (i && e) {
      var r = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + dn(r) + '"][href="' + dn(e) + '"]', f = u;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = Rl(e);
      }
      if (!Sn.has(f) && (e = b({ rel: "modulepreload", href: e }, t), Sn.set(f, e), i.querySelector(u) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Cr(f)))
              return;
        }
        r = i.createElement("link"), Lt(r, "link", e), nt(r), i.head.appendChild(r);
      }
    }
  }
  function qE(e, t, i) {
    ga.S(e, t, i);
    var r = El;
    if (r && e) {
      var u = St(r).hoistableStyles, f = Tl(e);
      t = t || "default";
      var g = u.get(f);
      if (!g) {
        var E = { loading: 0, preload: null };
        if (g = r.querySelector(
          wr(f)
        ))
          E.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = Sn.get(f)) && Nf(e, i);
          var C = g = r.createElement("link");
          nt(C), Lt(C, "link", e), C._p = new Promise(function(q, $) {
            C.onload = q, C.onerror = $;
          }), C.addEventListener("load", function() {
            E.loading |= 1;
          }), C.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, So(g, t, r);
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
  function kE(e, t) {
    ga.X(e, t);
    var i = El;
    if (i && e) {
      var r = St(i).hoistableScripts, u = Rl(e), f = r.get(u);
      f || (f = i.querySelector(Cr(u)), f || (e = b({ src: e, async: !0 }, t), (t = Sn.get(u)) && zf(e, t), f = i.createElement("script"), nt(f), Lt(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, r.set(u, f));
    }
  }
  function PE(e, t) {
    ga.M(e, t);
    var i = El;
    if (i && e) {
      var r = St(i).hoistableScripts, u = Rl(e), f = r.get(u);
      f || (f = i.querySelector(Cr(u)), f || (e = b({ src: e, async: !0, type: "module" }, t), (t = Sn.get(u)) && zf(e, t), f = i.createElement("script"), nt(f), Lt(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, r.set(u, f));
    }
  }
  function dg(e, t, i, r) {
    var u = (u = Re.current) ? bo(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = Tl(i.href), i = St(
          u
        ).hoistableStyles, r = i.get(t), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = Tl(i.href);
          var f = St(
            u
          ).hoistableStyles, g = f.get(e);
          if (g || (u = u.ownerDocument || u, g = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, g), (f = u.querySelector(
            wr(e)
          )) && !f._p && (g.instance = f, g.state.loading = 5), Sn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, Sn.set(e, i), f || YE(
            u,
            e,
            i,
            g.state
          ))), t && r === null)
            throw Error(s(528, ""));
          return g;
        }
        if (t && r !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Rl(i), i = St(
          u
        ).hoistableScripts, r = i.get(t), r || (r = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, r)), r) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function Tl(e) {
    return 'href="' + dn(e) + '"';
  }
  function wr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function hg(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function YE(e, t, i, r) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
      return r.loading |= 1;
    }), t.addEventListener("error", function() {
      return r.loading |= 2;
    }), Lt(t, "link", i), nt(t), e.head.appendChild(t));
  }
  function Rl(e) {
    return '[src="' + dn(e) + '"]';
  }
  function Cr(e) {
    return "script[async]" + e;
  }
  function mg(e, t, i) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + dn(i.href) + '"]'
          );
          if (r)
            return t.instance = r, nt(r), r;
          var u = b({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), nt(r), Lt(r, "style", u), So(r, i.precedence, e), t.instance = r;
        case "stylesheet":
          u = Tl(i.href);
          var f = e.querySelector(
            wr(u)
          );
          if (f)
            return t.state.loading |= 4, t.instance = f, nt(f), f;
          r = hg(i), (u = Sn.get(u)) && Nf(r, u), f = (e.ownerDocument || e).createElement("link"), nt(f);
          var g = f;
          return g._p = new Promise(function(E, C) {
            g.onload = E, g.onerror = C;
          }), Lt(f, "link", r), t.state.loading |= 4, So(f, i.precedence, e), t.instance = f;
        case "script":
          return f = Rl(i.src), (u = e.querySelector(
            Cr(f)
          )) ? (t.instance = u, nt(u), u) : (r = i, (u = Sn.get(f)) && (r = b({}, i), zf(r, u)), e = e.ownerDocument || e, u = e.createElement("script"), nt(u), Lt(u, "link", r), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (r = t.instance, t.state.loading |= 4, So(r, i.precedence, e));
    return t.instance;
  }
  function So(e, t, i) {
    for (var r = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = r.length ? r[r.length - 1] : null, f = u, g = 0; g < r.length; g++) {
      var E = r[g];
      if (E.dataset.precedence === t) f = E;
      else if (f !== u) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function Nf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function zf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var xo = null;
  function pg(e, t, i) {
    if (xo === null) {
      var r = /* @__PURE__ */ new Map(), u = xo = /* @__PURE__ */ new Map();
      u.set(i, r);
    } else
      u = xo, r = u.get(i), r || (r = /* @__PURE__ */ new Map(), u.set(i, r));
    if (r.has(e)) return r;
    for (r.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var f = i[u];
      if (!(f[Ne] || f[fe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var g = f.getAttribute(t) || "";
        g = e + g;
        var E = r.get(g);
        E ? E.push(f) : r.set(g, [f]);
      }
    }
    return r;
  }
  function yg(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function GE(e, t, i) {
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
  function gg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function FE(e, t, i, r) {
    if (i.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Tl(r.href), f = t.querySelector(
          wr(u)
        );
        if (f) {
          t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Eo.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = f, nt(f);
          return;
        }
        f = t.ownerDocument || t, r = hg(r), (u = Sn.get(u)) && Nf(r, u), f = f.createElement("link"), nt(f);
        var g = f;
        g._p = new Promise(function(E, C) {
          g.onload = E, g.onerror = C;
        }), Lt(f, "link", r), i.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Eo.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var Of = 0;
  function $E(e, t) {
    return e.stylesheets && e.count === 0 && Ro(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var r = setTimeout(function() {
        if (e.stylesheets && Ro(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Of === 0 && (Of = 62500 * CE());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ro(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > Of ? 50 : 800) + t
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(u);
      };
    } : null;
  }
  function Eo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ro(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var To = null;
  function Ro(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, To = /* @__PURE__ */ new Map(), t.forEach(XE, e), To = null, Eo.call(e));
  }
  function XE(e, t) {
    if (!(t.state.loading & 4)) {
      var i = To.get(e);
      if (i) var r = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), To.set(e, i);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < u.length; f++) {
          var g = u[f];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") && (i.set(g.dataset.precedence, g), r = g);
        }
        r && i.set(null, r);
      }
      u = t.instance, g = u.getAttribute("data-precedence"), f = i.get(g) || r, f === r && i.set(null, u), i.set(g, u), this.count++, r = Eo.bind(this), u.addEventListener("load", r), u.addEventListener("error", r), f ? f.parentNode.insertBefore(u, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Mr = {
    $$typeof: L,
    Provider: null,
    Consumer: null,
    _currentValue: se,
    _currentValue2: se,
    _threadCount: 0
  };
  function KE(e, t, i, r, u, f, g, E, C) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ca(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ca(0), this.hiddenUpdates = Ca(null), this.identifierPrefix = r, this.onUncaughtError = u, this.onCaughtError = f, this.onRecoverableError = g, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = C, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function vg(e, t, i, r, u, f, g, E, C, q, $, W) {
    return e = new KE(
      e,
      t,
      i,
      g,
      C,
      q,
      $,
      W,
      E
    ), t = 1, f === !0 && (t |= 24), f = an(3, null, null, t), e.current = f, f.stateNode = e, t = fc(), t.refCount++, e.pooledCache = t, t.refCount++, f.memoizedState = {
      element: r,
      isDehydrated: i,
      cache: t
    }, pc(f), e;
  }
  function bg(e) {
    return e ? (e = tl, e) : tl;
  }
  function Sg(e, t, i, r, u, f) {
    u = bg(u), r.context === null ? r.context = u : r.pendingContext = u, r = _a(t), r.payload = { element: i }, f = f === void 0 ? null : f, f !== null && (r.callback = f), i = La(e, r, t), i !== null && (Wt(i, e, t), lr(i, e, t));
  }
  function xg(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function _f(e, t) {
    xg(e, t), (e = e.alternate) && xg(e, t);
  }
  function Eg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = yi(e, 67108864);
      t !== null && Wt(t, e, 67108864), _f(e, 67108864);
    }
  }
  function Tg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = un();
      t = _(t);
      var i = yi(e, t);
      i !== null && Wt(i, e, t), _f(e, t);
    }
  }
  var wo = !0;
  function QE(e, t, i, r) {
    var u = z.T;
    z.T = null;
    var f = ne.p;
    try {
      ne.p = 2, Lf(e, t, i, r);
    } finally {
      ne.p = f, z.T = u;
    }
  }
  function IE(e, t, i, r) {
    var u = z.T;
    z.T = null;
    var f = ne.p;
    try {
      ne.p = 8, Lf(e, t, i, r);
    } finally {
      ne.p = f, z.T = u;
    }
  }
  function Lf(e, t, i, r) {
    if (wo) {
      var u = Uf(r);
      if (u === null)
        xf(
          e,
          t,
          r,
          Co,
          i
        ), wg(e, r);
      else if (JE(
        u,
        e,
        t,
        i,
        r
      ))
        r.stopPropagation();
      else if (wg(e, r), t & 4 && -1 < ZE.indexOf(e)) {
        for (; u !== null; ) {
          var f = ut(u);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var g = An(f.pendingLanes);
                  if (g !== 0) {
                    var E = f;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; g; ) {
                      var C = 1 << 31 - Ht(g);
                      E.entanglements[1] |= C, g &= ~C;
                    }
                    Gn(f), (Ge & 6) === 0 && (so = Yt() + 500, xr(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = yi(f, 2), E !== null && Wt(E, f, 2), uo(), _f(f, 2);
            }
          if (f = Uf(r), f === null && xf(
            e,
            t,
            r,
            Co,
            i
          ), f === u) break;
          u = f;
        }
        u !== null && r.stopPropagation();
      } else
        xf(
          e,
          t,
          r,
          null,
          i
        );
    }
  }
  function Uf(e) {
    return e = Vu(e), Vf(e);
  }
  var Co = null;
  function Vf(e) {
    if (Co = null, e = Qe(e), e !== null) {
      var t = c(e);
      if (t === null) e = null;
      else {
        var i = t.tag;
        if (i === 13) {
          if (e = d(t), e !== null) return e;
          e = null;
        } else if (i === 31) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (i === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Co = e, null;
  }
  function Rg(e) {
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
        switch (Jn()) {
          case Ta:
            return 2;
          case Pl:
            return 8;
          case Ra:
          case Mn:
            return 32;
          case fn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Bf = !1, $a = null, Xa = null, Ka = null, Ar = /* @__PURE__ */ new Map(), jr = /* @__PURE__ */ new Map(), Qa = [], ZE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function wg(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        $a = null;
        break;
      case "dragenter":
      case "dragleave":
        Xa = null;
        break;
      case "mouseover":
      case "mouseout":
        Ka = null;
        break;
      case "pointerover":
      case "pointerout":
        Ar.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        jr.delete(t.pointerId);
    }
  }
  function Dr(e, t, i, r, u, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: r,
      nativeEvent: f,
      targetContainers: [u]
    }, t !== null && (t = ut(t), t !== null && Eg(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function JE(e, t, i, r, u) {
    switch (t) {
      case "focusin":
        return $a = Dr(
          $a,
          e,
          t,
          i,
          r,
          u
        ), !0;
      case "dragenter":
        return Xa = Dr(
          Xa,
          e,
          t,
          i,
          r,
          u
        ), !0;
      case "mouseover":
        return Ka = Dr(
          Ka,
          e,
          t,
          i,
          r,
          u
        ), !0;
      case "pointerover":
        var f = u.pointerId;
        return Ar.set(
          f,
          Dr(
            Ar.get(f) || null,
            e,
            t,
            i,
            r,
            u
          )
        ), !0;
      case "gotpointercapture":
        return f = u.pointerId, jr.set(
          f,
          Dr(
            jr.get(f) || null,
            e,
            t,
            i,
            r,
            u
          )
        ), !0;
    }
    return !1;
  }
  function Cg(e) {
    var t = Qe(e.target);
    if (t !== null) {
      var i = c(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = d(i), t !== null) {
            e.blockedOn = t, re(e.priority, function() {
              Tg(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = h(i), t !== null) {
            e.blockedOn = t, re(e.priority, function() {
              Tg(i);
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
  function Mo(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var i = Uf(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var r = new i.constructor(
          i.type,
          i
        );
        Uu = r, i.target.dispatchEvent(r), Uu = null;
      } else
        return t = ut(i), t !== null && Eg(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function Mg(e, t, i) {
    Mo(e) && i.delete(t);
  }
  function WE() {
    Bf = !1, $a !== null && Mo($a) && ($a = null), Xa !== null && Mo(Xa) && (Xa = null), Ka !== null && Mo(Ka) && (Ka = null), Ar.forEach(Mg), jr.forEach(Mg);
  }
  function Ao(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Bf || (Bf = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      WE
    )));
  }
  var jo = null;
  function Ag(e) {
    jo !== e && (jo = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        jo === e && (jo = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], r = e[t + 1], u = e[t + 2];
          if (typeof r != "function") {
            if (Vf(r || i) === null)
              continue;
            break;
          }
          var f = ut(i);
          f !== null && (e.splice(t, 3), t -= 3, Lc(
            f,
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
  function wl(e) {
    function t(C) {
      return Ao(C, e);
    }
    $a !== null && Ao($a, e), Xa !== null && Ao(Xa, e), Ka !== null && Ao(Ka, e), Ar.forEach(t), jr.forEach(t);
    for (var i = 0; i < Qa.length; i++) {
      var r = Qa[i];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Qa.length && (i = Qa[0], i.blockedOn === null); )
      Cg(i), i.blockedOn === null && Qa.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (r = 0; r < i.length; r += 3) {
        var u = i[r], f = i[r + 1], g = u[de] || null;
        if (typeof f == "function")
          g || Ag(i);
        else if (g) {
          var E = null;
          if (f && f.hasAttribute("formAction")) {
            if (u = f, g = f[de] || null)
              E = g.formAction;
            else if (Vf(u) !== null) continue;
          } else E = g.action;
          typeof E == "function" ? i[r + 1] = E : (i.splice(r, 3), r -= 3), Ag(i);
        }
      }
  }
  function jg() {
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
      u !== null && (u(), u = null), r || setTimeout(i, 20);
    }
    function i() {
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
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(i, 100), function() {
        r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function Hf(e) {
    this._internalRoot = e;
  }
  Do.prototype.render = Hf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var i = t.current, r = un();
    Sg(i, r, e, t, null, null);
  }, Do.prototype.unmount = Hf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Sg(e.current, 2, null, e, null, null), uo(), t[ge] = null;
    }
  };
  function Do(e) {
    this._internalRoot = e;
  }
  Do.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ae();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < Qa.length && t !== 0 && t < Qa[i].priority; i++) ;
      Qa.splice(i, 0, e), i === 0 && Cg(e);
    }
  };
  var Dg = a.version;
  if (Dg !== "19.2.5")
    throw Error(
      s(
        527,
        Dg,
        "19.2.5"
      )
    );
  ne.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = m(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var eT = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var No = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!No.isDisabled && No.supportsFiber)
      try {
        Wn = No.inject(
          eT
        ), Gt = No;
      } catch {
      }
  }
  return zr.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var i = !1, r = "", u = Vp, f = Bp, g = Hp;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (g = t.onRecoverableError)), t = vg(
      e,
      1,
      !1,
      null,
      null,
      i,
      r,
      null,
      u,
      f,
      g,
      jg
    ), e[ge] = t.current, Sf(e), new Hf(t);
  }, zr.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(s(299));
    var r = !1, u = "", f = Vp, g = Bp, E = Hp, C = null;
    return i != null && (i.unstable_strictMode === !0 && (r = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (f = i.onUncaughtError), i.onCaughtError !== void 0 && (g = i.onCaughtError), i.onRecoverableError !== void 0 && (E = i.onRecoverableError), i.formState !== void 0 && (C = i.formState)), t = vg(
      e,
      1,
      !0,
      t,
      i ?? null,
      r,
      u,
      C,
      f,
      g,
      E,
      jg
    ), t.context = bg(null), i = t.current, r = un(), r = _(r), u = _a(r), u.callback = null, La(i, u, r), i = r, t.current.lanes = i, Bn(t, i), Gn(t), e[ge] = t.current, Sf(e), new Do(t);
  }, zr.version = "19.2.5", zr;
}
var qg;
function mT() {
  if (qg) return Pf.exports;
  qg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Pf.exports = hT(), Pf.exports;
}
var pT = mT();
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
var db = (n) => {
  throw TypeError(n);
}, yT = (n, a, l) => a.has(n) || db("Cannot " + l), $f = (n, a, l) => (yT(n, a, "read from private field"), l ? l.call(n) : a.get(n)), gT = (n, a, l) => a.has(n) ? db("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, l);
function kg(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function vT(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: l, v5Compat: s = !1 } = n, o;
  o = a.map(
    (T, R) => y(
      T,
      typeof T == "string" ? null : T.state,
      R === 0 ? "default" : void 0,
      typeof T == "string" ? void 0 : T.unstable_mask
    )
  );
  let c = p(
    l ?? o.length - 1
  ), d = "POP", h = null;
  function p(T) {
    return Math.min(Math.max(T, 0), o.length - 1);
  }
  function m() {
    return o[c];
  }
  function y(T, R = null, w, D) {
    let O = Rd(
      o ? m().pathname : "/",
      T,
      R,
      w,
      D
    );
    return bt(
      O.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        T
      )}`
    ), O;
  }
  function b(T) {
    return typeof T == "string" ? T : Kn(T);
  }
  return {
    get index() {
      return c;
    },
    get action() {
      return d;
    },
    get location() {
      return m();
    },
    createHref: b,
    createURL(T) {
      return new URL(b(T), "http://localhost");
    },
    encodeLocation(T) {
      let R = typeof T == "string" ? Un(T) : T;
      return {
        pathname: R.pathname || "",
        search: R.search || "",
        hash: R.hash || ""
      };
    },
    push(T, R) {
      d = "PUSH";
      let w = kg(T) ? T : y(T, R);
      c += 1, o.splice(c, o.length, w), s && h && h({ action: d, location: w, delta: 1 });
    },
    replace(T, R) {
      d = "REPLACE";
      let w = kg(T) ? T : y(T, R);
      o[c] = w, s && h && h({ action: d, location: w, delta: 0 });
    },
    go(T) {
      d = "POP";
      let R = p(c + T), w = o[R];
      c = R, h && h({ action: d, location: w, delta: T });
    },
    listen(T) {
      return h = T, () => {
        h = null;
      };
    }
  };
}
function Oe(n, a) {
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
function bT() {
  return Math.random().toString(36).substring(2, 10);
}
function Rd(n, a, l = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? Un(a) : a,
    state: l,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || bT(),
    unstable_mask: o
  };
}
function Kn({
  pathname: n = "/",
  search: a = "",
  hash: l = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), l && l !== "#" && (n += l.charAt(0) === "#" ? l : "#" + l), n;
}
function Un(n) {
  let a = {};
  if (n) {
    let l = n.indexOf("#");
    l >= 0 && (a.hash = n.substring(l), n = n.substring(0, l));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function ST(n, a = !1) {
  let l = "http://localhost";
  typeof window < "u" && (l = window.location.origin !== "null" ? window.location.origin : window.location.href), Oe(l, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : Kn(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var Pr, Pg = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (gT(this, Pr, /* @__PURE__ */ new Map()), n)
      for (let [a, l] of n)
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
  get(n) {
    if ($f(this, Pr).has(n))
      return $f(this, Pr).get(n);
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
    $f(this, Pr).set(n, a);
  }
};
Pr = /* @__PURE__ */ new WeakMap();
var xT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function ET(n) {
  return xT.has(
    n
  );
}
var TT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function RT(n) {
  return TT.has(
    n
  );
}
function wT(n) {
  return n.index === !0;
}
function Ir(n, a, l = [], s = {}, o = !1) {
  return n.map((c, d) => {
    let h = [...l, String(d)], p = typeof c.id == "string" ? c.id : h.join("-");
    if (Oe(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), Oe(
      o || !s[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), wT(c)) {
      let m = {
        ...c,
        id: p
      };
      return s[p] = Yg(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...c,
        id: p,
        children: void 0
      };
      return s[p] = Yg(
        m,
        a(m)
      ), c.children && (m.children = Ir(
        c.children,
        a,
        h,
        s,
        o
      )), m;
    }
  });
}
function Yg(n, a) {
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
function ei(n, a, l = "/") {
  return Yr(n, a, l, !1);
}
function Yr(n, a, l, s) {
  let o = typeof a == "string" ? Un(a) : a, c = wn(o.pathname || "/", l);
  if (c == null)
    return null;
  let d = hb(n);
  MT(d);
  let h = null;
  for (let p = 0; h == null && p < d.length; ++p) {
    let m = BT(c);
    h = UT(
      d[p],
      m,
      s
    );
  }
  return h;
}
function CT(n, a) {
  let { route: l, pathname: s, params: o } = n;
  return {
    id: l.id,
    pathname: s,
    params: o,
    data: a[l.id],
    loaderData: a[l.id],
    handle: l.handle
  };
}
function hb(n, a = [], l = [], s = "", o = !1) {
  let c = (d, h, p = o, m) => {
    let y = {
      relativePath: m === void 0 ? d.path || "" : m,
      caseSensitive: d.caseSensitive === !0,
      childrenIndex: h,
      route: d
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(s) && p)
        return;
      Oe(
        y.relativePath.startsWith(s),
        `Absolute route path "${y.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(s.length);
    }
    let b = Tn([s, y.relativePath]), S = l.concat(y);
    d.children && d.children.length > 0 && (Oe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      d.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
    ), hb(
      d.children,
      a,
      S,
      b,
      p
    )), !(d.path == null && !d.index) && a.push({
      path: b,
      score: _T(b, d.index),
      routesMeta: S
    });
  };
  return n.forEach((d, h) => {
    if (d.path === "" || !d.path?.includes("?"))
      c(d, h);
    else
      for (let p of mb(d.path))
        c(d, h, !0, p);
  }), a;
}
function mb(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [l, ...s] = a, o = l.endsWith("?"), c = l.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let d = mb(s.join("/")), h = [];
  return h.push(
    ...d.map(
      (p) => p === "" ? c : [c, p].join("/")
    )
  ), o && h.push(...d), h.map(
    (p) => n.startsWith("/") && p === "" ? "/" : p
  );
}
function MT(n) {
  n.sort(
    (a, l) => a.score !== l.score ? l.score - a.score : LT(
      a.routesMeta.map((s) => s.childrenIndex),
      l.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var AT = /^:[\w-]+$/, jT = 3, DT = 2, NT = 1, zT = 10, OT = -2, Gg = (n) => n === "*";
function _T(n, a) {
  let l = n.split("/"), s = l.length;
  return l.some(Gg) && (s += OT), a && (s += DT), l.filter((o) => !Gg(o)).reduce(
    (o, c) => o + (AT.test(c) ? jT : c === "" ? NT : zT),
    s
  );
}
function LT(n, a) {
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
function UT(n, a, l = !1) {
  let { routesMeta: s } = n, o = {}, c = "/", d = [];
  for (let h = 0; h < s.length; ++h) {
    let p = s[h], m = h === s.length - 1, y = c === "/" ? a : a.slice(c.length) || "/", b = nu(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), S = p.route;
    if (!b && m && l && !s[s.length - 1].route.index && (b = nu(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      y
    )), !b)
      return null;
    Object.assign(o, b.params), d.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: Tn([c, b.pathname]),
      pathnameBase: kT(
        Tn([c, b.pathnameBase])
      ),
      route: S
    }), b.pathnameBase !== "/" && (c = Tn([c, b.pathnameBase]));
  }
  return d;
}
function nu(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [l, s] = VT(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(l);
  if (!o) return null;
  let c = o[0], d = c.replace(/(.)\/+$/, "$1"), h = o.slice(1);
  return {
    params: s.reduce(
      (m, { paramName: y, isOptional: b }, S) => {
        if (y === "*") {
          let R = h[S] || "";
          d = c.slice(0, c.length - R.length).replace(/(.)\/+$/, "$1");
        }
        const T = h[S];
        return b && !T ? m[y] = void 0 : m[y] = (T || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: c,
    pathnameBase: d,
    pattern: n
  };
}
function VT(n, a = !1, l = !0) {
  bt(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + n.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (d, h, p, m, y) => {
      if (s.push({ paramName: h, isOptional: p != null }), p) {
        let b = y.charAt(m + d.length);
        return b && b !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return n.endsWith("*") ? (s.push({ paramName: "*" }), o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : l ? o += "\\/*$" : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function BT(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return bt(
      !1,
      `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), n;
  }
}
function wn(n, a) {
  if (a === "/") return n;
  if (!n.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let l = a.endsWith("/") ? a.length - 1 : a.length, s = n.charAt(l);
  return s && s !== "/" ? null : n.slice(l) || "/";
}
function HT({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : Tn([n, a]);
}
var pb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, th = (n) => pb.test(n);
function qT(n, a = "/") {
  let {
    pathname: l,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? Un(n) : n, c;
  return l ? (l = ah(l), l.startsWith("/") ? c = Fg(l.substring(1), "/") : c = Fg(l, a)) : c = a, {
    pathname: c,
    search: PT(s),
    hash: YT(o)
  };
}
function Fg(n, a) {
  let l = au(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? l.length > 1 && l.pop() : o !== "." && l.push(o);
  }), l.length > 1 ? l.join("/") : "/";
}
function Xf(n, a, l, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${l}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function yb(n) {
  return n.filter(
    (a, l) => l === 0 || a.route.path && a.route.path.length > 0
  );
}
function nh(n) {
  let a = yb(n);
  return a.map(
    (l, s) => s === a.length - 1 ? l.pathname : l.pathnameBase
  );
}
function gu(n, a, l, s = !1) {
  let o;
  typeof n == "string" ? o = Un(n) : (o = { ...n }, Oe(
    !o.pathname || !o.pathname.includes("?"),
    Xf("?", "pathname", "search", o)
  ), Oe(
    !o.pathname || !o.pathname.includes("#"),
    Xf("#", "pathname", "hash", o)
  ), Oe(
    !o.search || !o.search.includes("#"),
    Xf("#", "search", "hash", o)
  ));
  let c = n === "" || o.pathname === "", d = c ? "/" : o.pathname, h;
  if (d == null)
    h = l;
  else {
    let b = a.length - 1;
    if (!s && d.startsWith("..")) {
      let S = d.split("/");
      for (; S[0] === ".."; )
        S.shift(), b -= 1;
      o.pathname = S.join("/");
    }
    h = b >= 0 ? a[b] : "/";
  }
  let p = qT(o, h), m = d && d !== "/" && d.endsWith("/"), y = (c || d === ".") && l.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var ah = (n) => n.replace(/\/\/+/g, "/"), Tn = (n) => ah(n.join("/")), au = (n) => n.replace(/\/+$/, ""), kT = (n) => au(n).replace(/^\/*/, "/"), PT = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, YT = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, GT = (n, a = 302) => {
  let l = a;
  typeof l == "number" ? l = { status: l } : typeof l.status > "u" && (l.status = 302);
  let s = new Headers(l.headers);
  return s.set("Location", n), new Response(null, { ...l, headers: s });
}, vu = class {
  constructor(n, a, l, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, l instanceof Error ? (this.data = l.toString(), this.error = l) : this.data = l;
  }
};
function Zr(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function as(n) {
  let a = n.map((l) => l.route.path).filter(Boolean);
  return Tn(a) || "/";
}
var gb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function vb(n, a) {
  let l = n;
  if (typeof l != "string" || !pb.test(l))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: l
    };
  let s = l, o = !1;
  if (gb)
    try {
      let c = new URL(window.location.href), d = l.startsWith("//") ? new URL(c.protocol + l) : new URL(l), h = wn(d.pathname, a);
      d.origin === c.origin && h != null ? l = h + d.search + d.hash : o = !0;
    } catch {
      bt(
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
var ni = Symbol("Uninstrumented");
function FT(n, a) {
  let l = {
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
        let d = Object.keys(l);
        for (let h of d)
          c[h] && l[h].push(c[h]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && l.lazy.length > 0) {
    let o = jl(l.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((c) => {
      let d = o[c], h = l[`lazy.${c}`];
      if (typeof d == "function" && h.length > 0) {
        let p = jl(h, d, () => {
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
      let d = c[ni] ?? c, h = jl(
        l[o],
        d,
        (...p) => $g(p[0])
      );
      h && (o === "loader" && d.hydrate === !0 && (h.hydrate = !0), h[ni] = d, s[o] = h);
    }
  }), a.middleware && a.middleware.length > 0 && l.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[ni] ?? o, d = jl(
      l.middleware,
      c,
      (...h) => $g(h[0])
    );
    return d ? (d[ni] = c, d) : o;
  })), s;
}
function $T(n, a) {
  let l = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (s) => s({
      instrument(o) {
        let c = Object.keys(o);
        for (let d of c)
          o[d] && l[d].push(o[d]);
      }
    })
  ), l.navigate.length > 0) {
    let s = n.navigate[ni] ?? n.navigate, o = jl(
      l.navigate,
      s,
      (...c) => {
        let [d, h] = c;
        return {
          to: typeof d == "number" || typeof d == "string" ? d : d ? Kn(d) : ".",
          ...Xg(n, h ?? {})
        };
      }
    );
    o && (o[ni] = s, n.navigate = o);
  }
  if (l.fetch.length > 0) {
    let s = n.fetch[ni] ?? n.fetch, o = jl(l.fetch, s, (...c) => {
      let [d, , h, p] = c;
      return {
        href: h ?? ".",
        fetcherKey: d,
        ...Xg(n, p ?? {})
      };
    });
    o && (o[ni] = s, n.fetch = o);
  }
  return n;
}
function jl(n, a, l) {
  return n.length === 0 ? null : async (...s) => {
    let o = await bb(
      n,
      l(...s),
      () => a(...s),
      n.length - 1
    );
    if (o.type === "error")
      throw o.value;
    return o.value;
  };
}
async function bb(n, a, l, s) {
  let o = n[s], c;
  if (o) {
    let d, h = async () => (d ? console.error("You cannot call instrumented handlers more than once") : d = bb(n, a, l, s - 1), c = await d, Oe(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
    try {
      await o(h, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    d || await h(), await d;
  } else
    try {
      c = { type: "success", value: await l() };
    } catch (d) {
      c = { type: "error", value: d };
    }
  return c || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function $g(n) {
  let { request: a, context: l, params: s, unstable_pattern: o } = n;
  return {
    request: XT(a),
    params: { ...s },
    unstable_pattern: o,
    context: KT(l)
  };
}
function Xg(n, a) {
  return {
    currentUrl: Kn(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function XT(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function KT(n) {
  if (IT(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var QT = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function IT(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === QT;
}
var Sb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], ZT = new Set(
  Sb
), JT = [
  "GET",
  ...Sb
], WT = new Set(JT), xb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), eR = /* @__PURE__ */ new Set([307, 308]), Kf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, tR = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Or = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, nR = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), Eb = "remix-router-transitions", Tb = Symbol("ResetLoaderData");
function aR(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, l = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Oe(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || nR, c = o;
  if (n.unstable_instrumentations) {
    let M = n.unstable_instrumentations;
    c = (_) => ({
      ...o(_),
      ...FT(
        M.map((k) => k.route).filter(Boolean),
        _
      )
    });
  }
  let d = {}, h = Ir(
    n.routes,
    c,
    void 0,
    d
  ), p, m = n.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let y = n.dataStrategy || oR, b = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, T = /* @__PURE__ */ new Set(), R = null, w = null, D = null, O = n.hydrationData != null, B = ei(h, n.history.location, m), L = !1, V = null, X, K;
  if (B == null && !n.patchRoutesOnNavigation) {
    let M = xn(404, {
      pathname: n.history.location.pathname
    }), { matches: _, route: k } = zo(h);
    X = !0, K = !X, B = _, V = { [k.id]: M };
  } else if (B && !n.hydrationData && Ca(
    B,
    h,
    n.history.location.pathname
  ).active && (B = null), B)
    if (B.some((M) => M.route.lazy))
      X = !1, K = !X;
    else if (!B.some((M) => ih(M.route)))
      X = !0, K = !X;
    else {
      let M = n.hydrationData ? n.hydrationData.loaderData : null, _ = n.hydrationData ? n.hydrationData.errors : null, k = B;
      if (_) {
        let ae = B.findIndex(
          (re) => _[re.route.id] !== void 0
        );
        k = k.slice(0, ae + 1);
      }
      K = !1, X = !0, k.forEach((ae) => {
        let re = Rb(ae.route, M, _);
        K = K || re.renderFallback, X = X && !re.shouldLoad;
      });
    }
  else {
    X = !1, K = !X, B = [];
    let M = Ca(
      null,
      h,
      n.history.location.pathname
    );
    M.active && M.matches && (L = !0, B = M.matches);
  }
  let ee, A = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: B,
    initialized: X,
    renderFallback: K,
    navigation: Kf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || V,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, Q = "POP", te = null, ce = !1, J, P = !1, le = /* @__PURE__ */ new Map(), Z = null, z = !1, ne = !1, se = /* @__PURE__ */ new Set(), ue = /* @__PURE__ */ new Map(), we = 0, j = -1, F = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ new Set(), oe = /* @__PURE__ */ new Map(), xe = /* @__PURE__ */ new Map(), Re = /* @__PURE__ */ new Set(), De = /* @__PURE__ */ new Map(), dt, $e = null;
  function In() {
    if (S = n.history.listen(
      ({ action: M, location: _, delta: k }) => {
        if (dt) {
          dt(), dt = void 0;
          return;
        }
        bt(
          De.size === 0 || k != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ae = ci({
          currentLocation: A.location,
          nextLocation: _,
          historyAction: M
        });
        if (ae && k != null) {
          let re = new Promise((pe) => {
            dt = pe;
          });
          n.history.go(k * -1), ea(ae, {
            state: "blocked",
            location: _,
            proceed() {
              ea(ae, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: _
              }), re.then(() => n.history.go(k));
            },
            reset() {
              let pe = new Map(A.blockers);
              pe.set(ae, Or), pt({ blockers: pe });
            }
          }), te?.resolve(), te = null;
          return;
        }
        return be(M, _);
      }
    ), l) {
      CR(a, le);
      let M = () => MR(a, le);
      a.addEventListener("pagehide", M), Z = () => a.removeEventListener("pagehide", M);
    }
    return A.initialized || be("POP", A.location, {
      initialHydration: !0
    }), ee;
  }
  function xa() {
    S && S(), Z && Z(), T.clear(), J && J.abort(), A.fetchers.forEach((M, _) => Wn(_)), A.blockers.forEach((M, _) => ui(_));
  }
  function Vn(M) {
    return T.add(M), () => T.delete(M);
  }
  function pt(M, _ = {}) {
    M.matches && (M.matches = M.matches.map((re) => {
      let pe = d[re.route.id], fe = re.route;
      return fe.element !== pe.element || fe.errorElement !== pe.errorElement || fe.hydrateFallbackElement !== pe.hydrateFallbackElement ? {
        ...re,
        route: pe
      } : re;
    })), A = {
      ...A,
      ...M
    };
    let k = [], ae = [];
    A.fetchers.forEach((re, pe) => {
      re.state === "idle" && (Re.has(pe) ? k.push(pe) : ae.push(pe));
    }), Re.forEach((re) => {
      !A.fetchers.has(re) && !ue.has(re) && k.push(re);
    }), [...T].forEach(
      (re) => re(A, {
        deletedFetchers: k,
        newErrors: M.errors ?? null,
        viewTransitionOpts: _.viewTransitionOpts,
        flushSync: _.flushSync === !0
      })
    ), k.forEach((re) => Wn(re)), ae.forEach((re) => A.fetchers.delete(re));
  }
  function Bt(M, _, { flushSync: k } = {}) {
    let ae = A.actionData != null && A.navigation.formMethod != null && Pt(A.navigation.formMethod) && A.navigation.state === "loading" && M.state?._isRedirect !== !0, re;
    _.actionData ? Object.keys(_.actionData).length > 0 ? re = _.actionData : re = null : ae ? re = A.actionData : re = null;
    let pe = _.loaderData ? iv(
      A.loaderData,
      _.loaderData,
      _.matches || [],
      _.errors
    ) : A.loaderData, fe = A.blockers;
    fe.size > 0 && (fe = new Map(fe), fe.forEach((Te, Se) => fe.set(Se, Or)));
    let de = z ? !1 : Yl(M, _.matches || A.matches), ge = ce === !0 || A.navigation.formMethod != null && Pt(A.navigation.formMethod) && M.state?._isRedirect !== !0;
    p && (h = p, p = void 0), z || Q === "POP" || (Q === "PUSH" ? n.history.push(M, M.state) : Q === "REPLACE" && n.history.replace(M, M.state));
    let he;
    if (Q === "POP") {
      let Te = le.get(A.location.pathname);
      Te && Te.has(M.pathname) ? he = {
        currentLocation: A.location,
        nextLocation: M
      } : le.has(M.pathname) && (he = {
        currentLocation: M,
        nextLocation: A.location
      });
    } else if (P) {
      let Te = le.get(A.location.pathname);
      Te ? Te.add(M.pathname) : (Te = /* @__PURE__ */ new Set([M.pathname]), le.set(A.location.pathname, Te)), he = {
        currentLocation: A.location,
        nextLocation: M
      };
    }
    pt(
      {
        ..._,
        // matches, errors, fetchers go through as-is
        actionData: re,
        loaderData: pe,
        historyAction: Q,
        location: M,
        initialized: !0,
        renderFallback: !1,
        navigation: Kf,
        revalidation: "idle",
        restoreScrollPosition: de,
        preventScrollReset: ge,
        blockers: fe
      },
      {
        viewTransitionOpts: he,
        flushSync: k === !0
      }
    ), Q = "POP", ce = !1, P = !1, z = !1, ne = !1, te?.resolve(), te = null, $e?.resolve(), $e = null;
  }
  async function Ea(M, _) {
    if (te?.resolve(), te = null, typeof M == "number") {
      te || (te = ov());
      let We = te.promise;
      return n.history.go(M), We;
    }
    let k = wd(
      A.location,
      A.matches,
      m,
      M,
      _?.fromRouteId,
      _?.relative
    ), { path: ae, submission: re, error: pe } = Kg(
      !1,
      k,
      _
    ), fe;
    _?.unstable_mask && (fe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof _.unstable_mask == "string" ? Un(_.unstable_mask) : {
        ...A.location.unstable_mask,
        ..._.unstable_mask
      }
    });
    let de = A.location, ge = Rd(
      de,
      ae,
      _ && _.state,
      void 0,
      fe
    );
    ge = {
      ...ge,
      ...n.history.encodeLocation(ge)
    };
    let he = _ && _.replace != null ? _.replace : void 0, Te = "PUSH";
    he === !0 ? Te = "REPLACE" : he === !1 || re != null && Pt(re.formMethod) && re.formAction === A.location.pathname + A.location.search && (Te = "REPLACE");
    let Se = _ && "preventScrollReset" in _ ? _.preventScrollReset === !0 : void 0, ke = (_ && _.flushSync) === !0, Ne = ci({
      currentLocation: de,
      nextLocation: ge,
      historyAction: Te
    });
    if (Ne) {
      ea(Ne, {
        state: "blocked",
        location: ge,
        proceed() {
          ea(Ne, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ge
          }), Ea(M, _);
        },
        reset() {
          let We = new Map(A.blockers);
          We.set(Ne, Or), pt({ blockers: We });
        }
      });
      return;
    }
    await be(Te, ge, {
      submission: re,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: pe,
      preventScrollReset: Se,
      replace: _ && _.replace,
      enableViewTransition: _ && _.viewTransition,
      flushSync: ke,
      callSiteDefaultShouldRevalidate: _ && _.unstable_defaultShouldRevalidate
    });
  }
  function oi() {
    $e || ($e = ov()), Ra(), pt({ revalidation: "loading" });
    let M = $e.promise;
    return A.navigation.state === "submitting" ? M : A.navigation.state === "idle" ? (be(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), M) : (be(
      Q || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: P === !0
      }
    ), M);
  }
  async function be(M, _, k) {
    J && J.abort(), J = null, Q = M, z = (k && k.startUninterruptedRevalidation) === !0, zu(A.location, A.matches), ce = (k && k.preventScrollReset) === !0, P = (k && k.enableViewTransition) === !0;
    let ae = p || h, re = k && k.overrideNavigation, pe = k?.initialHydration && A.matches && A.matches.length > 0 && !L ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : ei(ae, _, m), fe = (k && k.flushSync) === !0;
    if (pe && A.initialized && !ne && yR(A.location, _) && !(k && k.submission && Pt(k.submission.formMethod))) {
      Bt(_, { matches: pe }, { flushSync: fe });
      return;
    }
    let de = Ca(pe, ae, _.pathname);
    if (de.active && de.matches && (pe = de.matches), !pe) {
      let { error: Qe, notFoundMatches: ut, route: Le } = An(
        _.pathname
      );
      Bt(
        _,
        {
          matches: ut,
          loaderData: {},
          errors: {
            [Le.id]: Qe
          }
        },
        { flushSync: fe }
      );
      return;
    }
    J = new AbortController();
    let ge = Ml(
      n.history,
      _,
      J.signal,
      k && k.submission
    ), he = n.getContext ? await n.getContext() : new Pg(), Te;
    if (k && k.pendingError)
      Te = [
        ti(pe).route.id,
        { type: "error", error: k.pendingError }
      ];
    else if (k && k.submission && Pt(k.submission.formMethod)) {
      let Qe = await _e(
        ge,
        _,
        k.submission,
        pe,
        he,
        de.active,
        k && k.initialHydration === !0,
        { replace: k.replace, flushSync: fe }
      );
      if (Qe.shortCircuited)
        return;
      if (Qe.pendingActionResult) {
        let [ut, Le] = Qe.pendingActionResult;
        if (cn(Le) && Zr(Le.error) && Le.error.status === 404) {
          J = null, Bt(_, {
            matches: Qe.matches,
            loaderData: {},
            errors: {
              [ut]: Le.error
            }
          });
          return;
        }
      }
      pe = Qe.matches || pe, Te = Qe.pendingActionResult, re = Qf(_, k.submission), fe = !1, de.active = !1, ge = Ml(
        n.history,
        ge.url,
        ge.signal
      );
    }
    let {
      shortCircuited: Se,
      matches: ke,
      loaderData: Ne,
      errors: We
    } = await Fe(
      ge,
      _,
      pe,
      he,
      de.active,
      re,
      k && k.submission,
      k && k.fetcherSubmission,
      k && k.replace,
      k && k.initialHydration === !0,
      fe,
      Te,
      k && k.callSiteDefaultShouldRevalidate
    );
    Se || (J = null, Bt(_, {
      matches: ke || pe,
      ...lv(Te),
      loaderData: Ne,
      errors: We
    }));
  }
  async function _e(M, _, k, ae, re, pe, fe, de = {}) {
    Ra();
    let ge = RR(_, k);
    if (pt({ navigation: ge }, { flushSync: de.flushSync === !0 }), pe) {
      let Se = await Bn(
        ae,
        _.pathname,
        M.signal
      );
      if (Se.type === "aborted")
        return { shortCircuited: !0 };
      if (Se.type === "error") {
        if (Se.partialMatches.length === 0) {
          let { matches: Ne, route: We } = zo(h);
          return {
            matches: Ne,
            pendingActionResult: [
              We.id,
              {
                type: "error",
                error: Se.error
              }
            ]
          };
        }
        let ke = ti(Se.partialMatches).route.id;
        return {
          matches: Se.partialMatches,
          pendingActionResult: [
            ke,
            {
              type: "error",
              error: Se.error
            }
          ]
        };
      } else if (Se.matches)
        ae = Se.matches;
      else {
        let { notFoundMatches: ke, error: Ne, route: We } = An(
          _.pathname
        );
        return {
          matches: ke,
          pendingActionResult: [
            We.id,
            {
              type: "error",
              error: Ne
            }
          ]
        };
      }
    }
    let he, Te = Go(ae, _);
    if (!Te.route.action && !Te.route.lazy)
      he = {
        type: "error",
        error: xn(405, {
          method: M.method,
          pathname: _.pathname,
          routeId: Te.route.id
        })
      };
    else {
      let Se = _l(
        c,
        d,
        M,
        _,
        ae,
        Te,
        fe ? [] : s,
        re
      ), ke = await Ta(
        M,
        _,
        Se,
        re,
        null
      );
      if (he = ke[Te.route.id], !he) {
        for (let Ne of ae)
          if (ke[Ne.route.id]) {
            he = ke[Ne.route.id];
            break;
          }
      }
      if (M.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Oi(he)) {
      let Se;
      return de && de.replace != null ? Se = de.replace : Se = tv(
        he.response.headers.get("Location"),
        new URL(M.url),
        m,
        n.history
      ) === A.location.pathname + A.location.search, await Jn(M, he, !0, {
        submission: k,
        replace: Se
      }), { shortCircuited: !0 };
    }
    if (cn(he)) {
      let Se = ti(ae, Te.route.id);
      return (de && de.replace) !== !0 && (Q = "PUSH"), {
        matches: ae,
        pendingActionResult: [
          Se.route.id,
          he,
          Te.route.id
        ]
      };
    }
    return {
      matches: ae,
      pendingActionResult: [Te.route.id, he]
    };
  }
  async function Fe(M, _, k, ae, re, pe, fe, de, ge, he, Te, Se, ke) {
    let Ne = pe || Qf(_, fe), We = fe || de || sv(Ne), Qe = !z && !he;
    if (re) {
      if (Qe) {
        let yt = ot(Se);
        pt(
          {
            navigation: Ne,
            ...yt !== void 0 ? { actionData: yt } : {}
          },
          {
            flushSync: Te
          }
        );
      }
      let ze = await Bn(
        k,
        _.pathname,
        M.signal
      );
      if (ze.type === "aborted")
        return { shortCircuited: !0 };
      if (ze.type === "error") {
        if (ze.partialMatches.length === 0) {
          let { matches: qt, route: xt } = zo(h);
          return {
            matches: qt,
            loaderData: {},
            errors: {
              [xt.id]: ze.error
            }
          };
        }
        let yt = ti(ze.partialMatches).route.id;
        return {
          matches: ze.partialMatches,
          loaderData: {},
          errors: {
            [yt]: ze.error
          }
        };
      } else if (ze.matches)
        k = ze.matches;
      else {
        let { error: yt, notFoundMatches: qt, route: xt } = An(
          _.pathname
        );
        return {
          matches: qt,
          loaderData: {},
          errors: {
            [xt.id]: yt
          }
        };
      }
    }
    let ut = p || h, { dsMatches: Le, revalidatingFetchers: St } = Qg(
      M,
      ae,
      c,
      d,
      n.history,
      A,
      k,
      We,
      _,
      he ? [] : s,
      he === !0,
      ne,
      se,
      Re,
      oe,
      ie,
      ut,
      m,
      n.patchRoutesOnNavigation != null,
      Se,
      ke
    );
    if (j = ++we, !n.dataStrategy && !Le.some((ze) => ze.shouldLoad) && !Le.some(
      (ze) => ze.route.middleware && ze.route.middleware.length > 0
    ) && St.length === 0) {
      let ze = ps();
      return Bt(
        _,
        {
          matches: k,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Se && cn(Se[1]) ? { [Se[0]]: Se[1].error } : null,
          ...lv(Se),
          ...ze ? { fetchers: new Map(A.fetchers) } : {}
        },
        { flushSync: Te }
      ), { shortCircuited: !0 };
    }
    if (Qe) {
      let ze = {};
      if (!re) {
        ze.navigation = Ne;
        let yt = ot(Se);
        yt !== void 0 && (ze.actionData = yt);
      }
      St.length > 0 && (ze.fetchers = Zn(St)), pt(ze, { flushSync: Te });
    }
    St.forEach((ze) => {
      jt(ze.key), ze.controller && ue.set(ze.key, ze.controller);
    });
    let nt = () => St.forEach((ze) => jt(ze.key));
    J && J.signal.addEventListener(
      "abort",
      nt
    );
    let { loaderResults: Ma, fetcherResults: jn } = await Pl(
      Le,
      St,
      M,
      _,
      ae
    );
    if (M.signal.aborted)
      return { shortCircuited: !0 };
    J && J.signal.removeEventListener(
      "abort",
      nt
    ), St.forEach((ze) => ue.delete(ze.key));
    let Dt = Oo(Ma);
    if (Dt)
      return await Jn(M, Dt.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    if (Dt = Oo(jn), Dt)
      return ie.add(Dt.key), await Jn(M, Dt.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    let { loaderData: Hn, errors: fi } = av(
      A,
      k,
      Ma,
      Se,
      St,
      jn
    );
    he && A.errors && (fi = { ...A.errors, ...fi });
    let qn = ps(), di = ys(j), Gi = qn || di || St.length > 0;
    return {
      matches: k,
      loaderData: Hn,
      errors: fi,
      ...Gi ? { fetchers: new Map(A.fetchers) } : {}
    };
  }
  function ot(M) {
    if (M && !cn(M[1]))
      return {
        [M[0]]: M[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function Zn(M) {
    return M.forEach((_) => {
      let k = A.fetchers.get(_.key), ae = _r(
        void 0,
        k ? k.data : void 0
      );
      A.fetchers.set(_.key, ae);
    }), new Map(A.fetchers);
  }
  async function Au(M, _, k, ae) {
    jt(M);
    let re = (ae && ae.flushSync) === !0, pe = p || h, fe = wd(
      A.location,
      A.matches,
      m,
      k,
      _,
      ae?.relative
    ), de = ei(pe, fe, m), ge = Ca(de, pe, fe);
    if (ge.active && ge.matches && (de = ge.matches), !de) {
      fn(
        M,
        _,
        xn(404, { pathname: fe }),
        { flushSync: re }
      );
      return;
    }
    let { path: he, submission: Te, error: Se } = Kg(
      !0,
      fe,
      ae
    );
    if (Se) {
      fn(M, _, Se, { flushSync: re });
      return;
    }
    let ke = n.getContext ? await n.getContext() : new Pg(), Ne = (ae && ae.preventScrollReset) === !0;
    if (Te && Pt(Te.formMethod)) {
      await ju(
        M,
        _,
        he,
        de,
        ke,
        ge.active,
        re,
        Ne,
        Te,
        ae && ae.unstable_defaultShouldRevalidate
      );
      return;
    }
    oe.set(M, { routeId: _, path: he }), await Yt(
      M,
      _,
      he,
      de,
      ke,
      ge.active,
      re,
      Ne,
      Te
    );
  }
  async function ju(M, _, k, ae, re, pe, fe, de, ge, he) {
    Ra(), oe.delete(M);
    let Te = A.fetchers.get(M);
    Mn(M, wR(ge, Te), {
      flushSync: fe
    });
    let Se = new AbortController(), ke = Ml(
      n.history,
      k,
      Se.signal,
      ge
    );
    if (pe) {
      let at = await Bn(
        ae,
        new URL(ke.url).pathname,
        ke.signal,
        M
      );
      if (at.type === "aborted")
        return;
      if (at.type === "error") {
        fn(M, _, at.error, { flushSync: fe });
        return;
      } else if (at.matches)
        ae = at.matches;
      else {
        fn(
          M,
          _,
          xn(404, { pathname: k }),
          { flushSync: fe }
        );
        return;
      }
    }
    let Ne = Go(ae, k);
    if (!Ne.route.action && !Ne.route.lazy) {
      let at = xn(405, {
        method: ge.formMethod,
        pathname: k,
        routeId: _
      });
      fn(M, _, at, { flushSync: fe });
      return;
    }
    ue.set(M, Se);
    let We = we, Qe = _l(
      c,
      d,
      ke,
      k,
      ae,
      Ne,
      s,
      re
    ), ut = await Ta(
      ke,
      k,
      Qe,
      re,
      M
    ), Le = ut[Ne.route.id];
    if (!Le) {
      for (let at of Qe)
        if (ut[at.route.id]) {
          Le = ut[at.route.id];
          break;
        }
    }
    if (ke.signal.aborted) {
      ue.get(M) === Se && ue.delete(M);
      return;
    }
    if (Re.has(M)) {
      if (Oi(Le) || cn(Le)) {
        Mn(M, va(void 0));
        return;
      }
    } else {
      if (Oi(Le))
        if (ue.delete(M), j > We) {
          Mn(M, va(void 0));
          return;
        } else
          return ie.add(M), Mn(M, _r(ge)), Jn(ke, Le, !1, {
            fetcherSubmission: ge,
            preventScrollReset: de
          });
      if (cn(Le)) {
        fn(M, _, Le.error);
        return;
      }
    }
    let St = A.navigation.location || A.location, nt = Ml(
      n.history,
      St,
      Se.signal
    ), Ma = p || h, jn = A.navigation.state !== "idle" ? ei(Ma, A.navigation.location, m) : A.matches;
    Oe(jn, "Didn't find any matches after fetcher action");
    let Dt = ++we;
    F.set(M, Dt);
    let Hn = _r(ge, Le.data);
    A.fetchers.set(M, Hn);
    let { dsMatches: fi, revalidatingFetchers: qn } = Qg(
      nt,
      re,
      c,
      d,
      n.history,
      A,
      jn,
      ge,
      St,
      s,
      !1,
      ne,
      se,
      Re,
      oe,
      ie,
      Ma,
      m,
      n.patchRoutesOnNavigation != null,
      [Ne.route.id, Le],
      he
    );
    qn.filter((at) => at.key !== M).forEach((at) => {
      let Fi = at.key, $i = A.fetchers.get(Fi), Ss = _r(
        void 0,
        $i ? $i.data : void 0
      );
      A.fetchers.set(Fi, Ss), jt(Fi), at.controller && ue.set(Fi, at.controller);
    }), pt({ fetchers: new Map(A.fetchers) });
    let di = () => qn.forEach((at) => jt(at.key));
    Se.signal.addEventListener(
      "abort",
      di
    );
    let { loaderResults: Gi, fetcherResults: ze } = await Pl(
      fi,
      qn,
      nt,
      St,
      re
    );
    if (Se.signal.aborted)
      return;
    if (Se.signal.removeEventListener(
      "abort",
      di
    ), F.delete(M), ue.delete(M), qn.forEach((at) => ue.delete(at.key)), A.fetchers.has(M)) {
      let at = va(Le.data);
      A.fetchers.set(M, at);
    }
    let yt = Oo(Gi);
    if (yt)
      return Jn(
        nt,
        yt.result,
        !1,
        { preventScrollReset: de }
      );
    if (yt = Oo(ze), yt)
      return ie.add(yt.key), Jn(
        nt,
        yt.result,
        !1,
        { preventScrollReset: de }
      );
    let { loaderData: qt, errors: xt } = av(
      A,
      jn,
      Gi,
      void 0,
      qn,
      ze
    );
    ys(Dt), A.navigation.state === "loading" && Dt > j ? (Oe(Q, "Expected pending action"), J && J.abort(), Bt(A.navigation.location, {
      matches: jn,
      loaderData: qt,
      errors: xt,
      fetchers: new Map(A.fetchers)
    })) : (pt({
      errors: xt,
      loaderData: iv(
        A.loaderData,
        qt,
        jn,
        xt
      ),
      fetchers: new Map(A.fetchers)
    }), ne = !1);
  }
  async function Yt(M, _, k, ae, re, pe, fe, de, ge) {
    let he = A.fetchers.get(M);
    Mn(
      M,
      _r(
        ge,
        he ? he.data : void 0
      ),
      { flushSync: fe }
    );
    let Te = new AbortController(), Se = Ml(
      n.history,
      k,
      Te.signal
    );
    if (pe) {
      let Le = await Bn(
        ae,
        new URL(Se.url).pathname,
        Se.signal,
        M
      );
      if (Le.type === "aborted")
        return;
      if (Le.type === "error") {
        fn(M, _, Le.error, { flushSync: fe });
        return;
      } else if (Le.matches)
        ae = Le.matches;
      else {
        fn(
          M,
          _,
          xn(404, { pathname: k }),
          { flushSync: fe }
        );
        return;
      }
    }
    let ke = Go(ae, k);
    ue.set(M, Te);
    let Ne = we, We = _l(
      c,
      d,
      Se,
      k,
      ae,
      ke,
      s,
      re
    ), Qe = await Ta(
      Se,
      k,
      We,
      re,
      M
    ), ut = Qe[ke.route.id];
    if (!ut) {
      for (let Le of ae)
        if (Qe[Le.route.id]) {
          ut = Qe[Le.route.id];
          break;
        }
    }
    if (ue.get(M) === Te && ue.delete(M), !Se.signal.aborted) {
      if (Re.has(M)) {
        Mn(M, va(void 0));
        return;
      }
      if (Oi(ut))
        if (j > Ne) {
          Mn(M, va(void 0));
          return;
        } else {
          ie.add(M), await Jn(Se, ut, !1, {
            preventScrollReset: de
          });
          return;
        }
      if (cn(ut)) {
        fn(M, _, ut.error);
        return;
      }
      Mn(M, va(ut.data));
    }
  }
  async function Jn(M, _, k, {
    submission: ae,
    fetcherSubmission: re,
    preventScrollReset: pe,
    replace: fe
  } = {}) {
    k || (te?.resolve(), te = null), _.response.headers.has("X-Remix-Revalidate") && (ne = !0);
    let de = _.response.headers.get("Location");
    Oe(de, "Expected a Location header on the redirect Response"), de = tv(
      de,
      new URL(M.url),
      m,
      n.history
    );
    let ge = Rd(A.location, de, {
      _isRedirect: !0
    });
    if (l) {
      let We = !1;
      if (_.response.headers.has("X-Remix-Reload-Document"))
        We = !0;
      else if (th(de)) {
        const Qe = ST(de, !0);
        We = // Hard reload if it's an absolute URL to a new origin
        Qe.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        wn(Qe.pathname, m) == null;
      }
      if (We) {
        fe ? a.location.replace(de) : a.location.assign(de);
        return;
      }
    }
    J = null;
    let he = fe === !0 || _.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Te, formAction: Se, formEncType: ke } = A.navigation;
    !ae && !re && Te && Se && ke && (ae = sv(A.navigation));
    let Ne = ae || re;
    if (eR.has(_.response.status) && Ne && Pt(Ne.formMethod))
      await be(he, ge, {
        submission: {
          ...Ne,
          formAction: de
        },
        // Preserve these flags across redirects
        preventScrollReset: pe || ce,
        enableViewTransition: k ? P : void 0
      });
    else {
      let We = Qf(
        ge,
        ae
      );
      await be(he, ge, {
        overrideNavigation: We,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: re,
        // Preserve these flags across redirects
        preventScrollReset: pe || ce,
        enableViewTransition: k ? P : void 0
      });
    }
  }
  async function Ta(M, _, k, ae, re) {
    let pe, fe = {};
    try {
      pe = await cR(
        y,
        M,
        _,
        k,
        re,
        ae,
        !1
      );
    } catch (de) {
      return k.filter((ge) => ge.shouldLoad).forEach((ge) => {
        fe[ge.route.id] = {
          type: "error",
          error: de
        };
      }), fe;
    }
    if (M.signal.aborted)
      return fe;
    if (!Pt(M.method))
      for (let de of k) {
        if (pe[de.route.id]?.type === "error")
          break;
        !pe.hasOwnProperty(de.route.id) && !A.loaderData.hasOwnProperty(de.route.id) && (!A.errors || !A.errors.hasOwnProperty(de.route.id)) && de.shouldCallHandler() && (pe[de.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${de.route.id}`
          )
        });
      }
    for (let [de, ge] of Object.entries(pe))
      if (SR(ge)) {
        let he = ge.result;
        fe[de] = {
          type: "redirect",
          response: mR(
            he,
            M,
            de,
            k,
            m
          )
        };
      } else
        fe[de] = await hR(ge);
    return fe;
  }
  async function Pl(M, _, k, ae, re) {
    let pe = Ta(
      k,
      ae,
      M,
      re,
      null
    ), fe = Promise.all(
      _.map(async (he) => {
        if (he.matches && he.match && he.request && he.controller) {
          let Se = (await Ta(
            he.request,
            he.path,
            he.matches,
            re,
            he.key
          ))[he.match.route.id];
          return { [he.key]: Se };
        } else
          return Promise.resolve({
            [he.key]: {
              type: "error",
              error: xn(404, {
                pathname: he.path
              })
            }
          });
      })
    ), de = await pe, ge = (await fe).reduce(
      (he, Te) => Object.assign(he, Te),
      {}
    );
    return {
      loaderResults: de,
      fetcherResults: ge
    };
  }
  function Ra() {
    ne = !0, oe.forEach((M, _) => {
      ue.has(_) && se.add(_), jt(_);
    });
  }
  function Mn(M, _, k = {}) {
    A.fetchers.set(M, _), pt(
      { fetchers: new Map(A.fetchers) },
      { flushSync: (k && k.flushSync) === !0 }
    );
  }
  function fn(M, _, k, ae = {}) {
    let re = ti(A.matches, _);
    Wn(M), pt(
      {
        errors: {
          [re.route.id]: k
        },
        fetchers: new Map(A.fetchers)
      },
      { flushSync: (ae && ae.flushSync) === !0 }
    );
  }
  function ms(M) {
    return xe.set(M, (xe.get(M) || 0) + 1), Re.has(M) && Re.delete(M), A.fetchers.get(M) || tR;
  }
  function Du(M, _) {
    jt(M, _?.reason), Mn(M, va(null));
  }
  function Wn(M) {
    let _ = A.fetchers.get(M);
    ue.has(M) && !(_ && _.state === "loading" && F.has(M)) && jt(M), oe.delete(M), F.delete(M), ie.delete(M), Re.delete(M), se.delete(M), A.fetchers.delete(M);
  }
  function Gt(M) {
    let _ = (xe.get(M) || 0) - 1;
    _ <= 0 ? (xe.delete(M), Re.add(M)) : xe.set(M, _), pt({ fetchers: new Map(A.fetchers) });
  }
  function jt(M, _) {
    let k = ue.get(M);
    k && (k.abort(_), ue.delete(M));
  }
  function Ht(M) {
    for (let _ of M) {
      let k = ms(_), ae = va(k.data);
      A.fetchers.set(_, ae);
    }
  }
  function ps() {
    let M = [], _ = !1;
    for (let k of ie) {
      let ae = A.fetchers.get(k);
      Oe(ae, `Expected fetcher: ${k}`), ae.state === "loading" && (ie.delete(k), M.push(k), _ = !0);
    }
    return Ht(M), _;
  }
  function ys(M) {
    let _ = [];
    for (let [k, ae] of F)
      if (ae < M) {
        let re = A.fetchers.get(k);
        Oe(re, `Expected fetcher: ${k}`), re.state === "loading" && (jt(k), F.delete(k), _.push(k));
      }
    return Ht(_), _.length > 0;
  }
  function Nu(M, _) {
    let k = A.blockers.get(M) || Or;
    return De.get(M) !== _ && De.set(M, _), k;
  }
  function ui(M) {
    A.blockers.delete(M), De.delete(M);
  }
  function ea(M, _) {
    let k = A.blockers.get(M) || Or;
    Oe(
      k.state === "unblocked" && _.state === "blocked" || k.state === "blocked" && _.state === "blocked" || k.state === "blocked" && _.state === "proceeding" || k.state === "blocked" && _.state === "unblocked" || k.state === "proceeding" && _.state === "unblocked",
      `Invalid blocker state transition: ${k.state} -> ${_.state}`
    );
    let ae = new Map(A.blockers);
    ae.set(M, _), pt({ blockers: ae });
  }
  function ci({
    currentLocation: M,
    nextLocation: _,
    historyAction: k
  }) {
    if (De.size === 0)
      return;
    De.size > 1 && bt(!1, "A router only supports one blocker at a time");
    let ae = Array.from(De.entries()), [re, pe] = ae[ae.length - 1], fe = A.blockers.get(re);
    if (!(fe && fe.state === "proceeding") && pe({ currentLocation: M, nextLocation: _, historyAction: k }))
      return re;
  }
  function An(M) {
    let _ = xn(404, { pathname: M }), k = p || h, { matches: ae, route: re } = zo(k);
    return { notFoundMatches: ae, route: re, error: _ };
  }
  function Yi(M, _, k) {
    if (R = M, D = _, w = k || null, !O && A.navigation === Kf) {
      O = !0;
      let ae = Yl(A.location, A.matches);
      ae != null && pt({ restoreScrollPosition: ae });
    }
    return () => {
      R = null, D = null, w = null;
    };
  }
  function wa(M, _) {
    return w && w(
      M,
      _.map((ae) => CT(ae, A.loaderData))
    ) || M.key;
  }
  function zu(M, _) {
    if (R && D) {
      let k = wa(M, _);
      R[k] = D();
    }
  }
  function Yl(M, _) {
    if (R) {
      let k = wa(M, _), ae = R[k];
      if (typeof ae == "number")
        return ae;
    }
    return null;
  }
  function Ca(M, _, k) {
    if (n.patchRoutesOnNavigation)
      if (M) {
        if (Object.keys(M[0].params).length > 0)
          return { active: !0, matches: Yr(
            _,
            k,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: Yr(
          _,
          k,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function Bn(M, _, k, ae) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: M };
    let re = M;
    for (; ; ) {
      let pe = p == null, fe = p || h, de = d;
      try {
        await n.patchRoutesOnNavigation({
          signal: k,
          path: _,
          matches: re,
          fetcherKey: ae,
          patch: (Te, Se) => {
            k.aborted || Ig(
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
        return { type: "error", error: Te, partialMatches: re };
      } finally {
        pe && !k.aborted && (h = [...h]);
      }
      if (k.aborted)
        return { type: "aborted" };
      let ge = ei(fe, _, m), he = null;
      if (ge) {
        if (Object.keys(ge[0].params).length === 0)
          return { type: "success", matches: ge };
        if (he = Yr(
          fe,
          _,
          m,
          !0
        ), !(he && re.length < he.length && gs(
          re,
          he.slice(0, re.length)
        )))
          return { type: "success", matches: ge };
      }
      if (he || (he = Yr(
        fe,
        _,
        m,
        !0
      )), !he || gs(re, he))
        return { type: "success", matches: null };
      re = he;
    }
  }
  function gs(M, _) {
    return M.length === _.length && M.every((k, ae) => k.route.id === _[ae].route.id);
  }
  function vs(M) {
    d = {}, p = Ir(
      M,
      c,
      void 0,
      d
    );
  }
  function bs(M, _, k = !1) {
    let ae = p == null;
    Ig(
      M,
      _,
      p || h,
      d,
      c,
      k
    ), ae && (h = [...h], pt({}));
  }
  return ee = {
    get basename() {
      return m;
    },
    get future() {
      return b;
    },
    get state() {
      return A;
    },
    get routes() {
      return h;
    },
    get window() {
      return a;
    },
    initialize: In,
    subscribe: Vn,
    enableScrollRestoration: Yi,
    navigate: Ea,
    fetch: Au,
    revalidate: oi,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (M) => n.history.createHref(M),
    encodeLocation: (M) => n.history.encodeLocation(M),
    getFetcher: ms,
    resetFetcher: Du,
    deleteFetcher: Gt,
    dispose: xa,
    getBlocker: Nu,
    deleteBlocker: ui,
    patchRoutes: bs,
    _internalFetchControllers: ue,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: vs,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(M) {
      pt(M);
    }
  }, n.unstable_instrumentations && (ee = $T(
    ee,
    n.unstable_instrumentations.map((M) => M.router).filter(Boolean)
  )), ee;
}
function iR(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function wd(n, a, l, s, o, c) {
  let d, h;
  if (o) {
    d = [];
    for (let m of a)
      if (d.push(m), m.route.id === o) {
        h = m;
        break;
      }
  } else
    d = a, h = a[a.length - 1];
  let p = gu(
    s || ".",
    nh(d),
    wn(n.pathname, l) || n.pathname,
    c === "path"
  );
  if (s == null && (p.search = n.search, p.hash = n.hash), (s == null || s === "" || s === ".") && h) {
    let m = rh(p.search);
    if (h.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && m) {
      let y = new URLSearchParams(p.search), b = y.getAll("index");
      y.delete("index"), b.filter((T) => T).forEach((T) => y.append("index", T));
      let S = y.toString();
      p.search = S ? `?${S}` : "";
    }
  }
  return l !== "/" && (p.pathname = HT({ basename: l, pathname: p.pathname })), Kn(p);
}
function Kg(n, a, l) {
  if (!l || !iR(l))
    return { path: a };
  if (l.formMethod && !TR(l.formMethod))
    return {
      path: a,
      error: xn(405, { method: l.formMethod })
    };
  let s = () => ({
    path: a,
    error: xn(400, { type: "invalid-body" })
  }), c = (l.formMethod || "get").toUpperCase(), d = Nb(a);
  if (l.body !== void 0) {
    if (l.formEncType === "text/plain") {
      if (!Pt(c))
        return s();
      let b = typeof l.body == "string" ? l.body : l.body instanceof FormData || l.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(l.body.entries()).reduce(
          (S, [T, R]) => `${S}${T}=${R}
`,
          ""
        )
      ) : String(l.body);
      return {
        path: a,
        submission: {
          formMethod: c,
          formAction: d,
          formEncType: l.formEncType,
          formData: void 0,
          json: void 0,
          text: b
        }
      };
    } else if (l.formEncType === "application/json") {
      if (!Pt(c))
        return s();
      try {
        let b = typeof l.body == "string" ? JSON.parse(l.body) : l.body;
        return {
          path: a,
          submission: {
            formMethod: c,
            formAction: d,
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
  Oe(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let h, p;
  if (l.formData)
    h = Md(l.formData), p = l.formData;
  else if (l.body instanceof FormData)
    h = Md(l.body), p = l.body;
  else if (l.body instanceof URLSearchParams)
    h = l.body, p = nv(h);
  else if (l.body == null)
    h = new URLSearchParams(), p = new FormData();
  else
    try {
      h = new URLSearchParams(l.body), p = nv(h);
    } catch {
      return s();
    }
  let m = {
    formMethod: c,
    formAction: d,
    formEncType: l && l.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (Pt(m.formMethod))
    return { path: a, submission: m };
  let y = Un(a);
  return n && y.search && rh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: Kn(y), submission: m };
}
function Qg(n, a, l, s, o, c, d, h, p, m, y, b, S, T, R, w, D, O, B, L, V) {
  let X = L ? cn(L[1]) ? L[1].error : L[1].data : void 0, K = o.createURL(c.location), ee = o.createURL(p), A;
  if (y && c.errors) {
    let Z = Object.keys(c.errors)[0];
    A = d.findIndex((z) => z.route.id === Z);
  } else if (L && cn(L[1])) {
    let Z = L[0];
    A = d.findIndex((z) => z.route.id === Z) - 1;
  }
  let Q = L ? L[1].statusCode : void 0, te = Q && Q >= 400, ce = {
    currentUrl: K,
    currentParams: c.matches[0]?.params || {},
    nextUrl: ee,
    nextParams: d[0].params,
    ...h,
    actionResult: X,
    actionStatus: Q
  }, J = as(d), P = d.map((Z, z) => {
    let { route: ne } = Z, se = null;
    if (A != null && z > A)
      se = !1;
    else if (ne.lazy)
      se = !0;
    else if (!ih(ne))
      se = !1;
    else if (y) {
      let { shouldLoad: F } = Rb(
        ne,
        c.loaderData,
        c.errors
      );
      se = F;
    } else lR(c.loaderData, c.matches[z], Z) && (se = !0);
    if (se !== null)
      return Cd(
        l,
        s,
        n,
        p,
        J,
        Z,
        m,
        a,
        se
      );
    let ue = !1;
    typeof V == "boolean" ? ue = V : te ? ue = !1 : (b || K.pathname + K.search === ee.pathname + ee.search || K.search !== ee.search || rR(c.matches[z], Z)) && (ue = !0);
    let we = {
      ...ce,
      defaultShouldRevalidate: ue
    }, j = Fr(Z, we);
    return Cd(
      l,
      s,
      n,
      p,
      J,
      Z,
      m,
      a,
      j,
      we,
      V
    );
  }), le = [];
  return R.forEach((Z, z) => {
    if (y || !d.some((oe) => oe.route.id === Z.routeId) || T.has(z))
      return;
    let ne = c.fetchers.get(z), se = ne && ne.state !== "idle" && ne.data === void 0, ue = ei(D, Z.path, O);
    if (!ue) {
      if (B && se)
        return;
      le.push({
        key: z,
        routeId: Z.routeId,
        path: Z.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (w.has(z))
      return;
    let we = Go(ue, Z.path), j = new AbortController(), F = Ml(
      o,
      Z.path,
      j.signal
    ), ie = null;
    if (S.has(z))
      S.delete(z), ie = _l(
        l,
        s,
        F,
        Z.path,
        ue,
        we,
        m,
        a
      );
    else if (se)
      b && (ie = _l(
        l,
        s,
        F,
        Z.path,
        ue,
        we,
        m,
        a
      ));
    else {
      let oe;
      typeof V == "boolean" ? oe = V : te ? oe = !1 : oe = b;
      let xe = {
        ...ce,
        defaultShouldRevalidate: oe
      };
      Fr(we, xe) && (ie = _l(
        l,
        s,
        F,
        Z.path,
        ue,
        we,
        m,
        a,
        xe
      ));
    }
    ie && le.push({
      key: z,
      routeId: Z.routeId,
      path: Z.path,
      matches: ie,
      match: we,
      request: F,
      controller: j
    });
  }), { dsMatches: P, revalidatingFetchers: le };
}
function ih(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function Rb(n, a, l) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!ih(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = l != null && l[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
}
function lR(n, a, l) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    l.route.id !== a.route.id
  ), o = !n.hasOwnProperty(l.route.id);
  return s || o;
}
function rR(n, a) {
  let l = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    l != null && l.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function Fr(n, a) {
  if (n.route.shouldRevalidate) {
    let l = n.route.shouldRevalidate(a);
    if (typeof l == "boolean")
      return l;
  }
  return a.defaultShouldRevalidate;
}
function Ig(n, a, l, s, o, c) {
  let d;
  if (n) {
    let m = s[n];
    Oe(
      m,
      `No route found to patch children into: routeId = ${n}`
    ), m.children || (m.children = []), d = m.children;
  } else
    d = l;
  let h = [], p = [];
  if (a.forEach((m) => {
    let y = d.find(
      (b) => wb(m, b)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : h.push(m);
  }), h.length > 0) {
    let m = Ir(
      h,
      o,
      [n || "_", "patch", String(d?.length || "0")],
      s
    );
    d.push(...m);
  }
  if (c && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: b } = p[m], S = y, [T] = Ir(
        [b],
        o,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(S, {
        element: T.element ? T.element : S.element,
        errorElement: T.errorElement ? T.errorElement : S.errorElement,
        hydrateFallbackElement: T.hydrateFallbackElement ? T.hydrateFallbackElement : S.hydrateFallbackElement
      });
    }
}
function wb(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (l, s) => a.children?.some((o) => wb(l, o))
  ) ?? !1 : !1;
}
var Zg = /* @__PURE__ */ new WeakMap(), Cb = ({
  key: n,
  route: a,
  manifest: l,
  mapRouteProperties: s
}) => {
  let o = l[a.id];
  if (Oe(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let c = o.lazy[n];
  if (!c)
    return;
  let d = Zg.get(o);
  d || (d = {}, Zg.set(o, d));
  let h = d[n];
  if (h)
    return h;
  let p = (async () => {
    let m = ET(n), b = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (m)
      bt(
        !m,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), d[n] = Promise.resolve();
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
  return d[n] = p, p;
}, Jg = /* @__PURE__ */ new WeakMap();
function sR(n, a, l, s, o) {
  let c = l[n.id];
  if (Oe(c, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let y = Jg.get(c);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let b = (async () => {
      Oe(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let S = await n.lazy(), T = {};
      for (let R in S) {
        let w = S[R];
        if (w === void 0)
          continue;
        let D = RT(R), B = c[R] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        R !== "hasErrorBoundary";
        D ? bt(
          !D,
          "Route property " + R + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : B ? bt(
          !B,
          `Route "${c.id}" has a static property "${R}" defined but its lazy function is also returning a value for this property. The lazy route property "${R}" will be ignored.`
        ) : T[R] = w;
      }
      Object.assign(c, T), Object.assign(c, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(c),
        lazy: void 0
      });
    })();
    return Jg.set(c, b), b.catch(() => {
    }), {
      lazyRoutePromise: b,
      lazyHandlerPromise: b
    };
  }
  let d = Object.keys(n.lazy), h = [], p;
  for (let y of d) {
    if (o && o.includes(y))
      continue;
    let b = Cb({
      key: y,
      route: n,
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
async function Wg(n) {
  let a = n.matches.filter((o) => o.shouldLoad), l = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    l[a[c].route.id] = o;
  }), l;
}
async function oR(n) {
  return n.matches.some((a) => a.route.middleware) ? Mb(n, () => Wg(n)) : Wg(n);
}
function Mb(n, a) {
  return uR(
    n,
    a,
    (s) => {
      if (ER(s))
        throw s;
      return s;
    },
    vR,
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
      let { matches: d } = n, h = Math.min(
        // Throwing route
        Math.max(
          d.findIndex((m) => m.route.id === o),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          d.findIndex((m) => m.shouldCallHandler()),
          0
        )
      ), p = ti(
        d,
        d[h].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: s }
      });
    }
  }
}
async function uR(n, a, l, s, o) {
  let { matches: c, ...d } = n, h = c.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await Ab(
    d,
    h,
    a,
    l,
    s,
    o
  );
}
async function Ab(n, a, l, s, o, c, d = 0) {
  let { request: h } = n;
  if (h.signal.aborted)
    throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let p = a[d];
  if (!p)
    return await l();
  let [m, y] = p, b, S = async () => {
    if (b)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return b = { value: await Ab(
        n,
        a,
        l,
        s,
        o,
        c,
        d + 1
      ) }, b.value;
    } catch (T) {
      return b = { value: await c(T, m, b) }, b.value;
    }
  };
  try {
    let T = await y(n, S), R = T != null ? s(T) : void 0;
    return o(R) ? R : b ? R ?? b.value : (b = { value: await S() }, b.value);
  } catch (T) {
    return await c(T, m, b);
  }
}
function jb(n, a, l, s, o) {
  let c = Cb({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), d = sR(
    s.route,
    Pt(l.method) ? "action" : "loader",
    a,
    n,
    o
  );
  return {
    middleware: c,
    route: d.lazyRoutePromise,
    handler: d.lazyHandlerPromise
  };
}
function Cd(n, a, l, s, o, c, d, h, p, m = null, y) {
  let b = !1, S = jb(
    n,
    a,
    l,
    c,
    d
  );
  return {
    ...c,
    _lazyPromises: S,
    shouldLoad: p,
    shouldRevalidateArgs: m,
    shouldCallHandler(T) {
      return b = !0, m ? typeof y == "boolean" ? Fr(c, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof T == "boolean" ? Fr(c, {
        ...m,
        defaultShouldRevalidate: T
      }) : Fr(c, m) : p;
    },
    resolve(T) {
      let { lazy: R, loader: w, middleware: D } = c.route, O = b || p || T && !Pt(l.method) && (R || w), B = D && D.length > 0 && !w && !R;
      return O && (Pt(l.method) || !B) ? fR({
        request: l,
        path: s,
        unstable_pattern: o,
        match: c,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: T,
        scopedContext: h
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function _l(n, a, l, s, o, c, d, h, p = null) {
  return o.map((m) => m.route.id !== c.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: jb(
      n,
      a,
      l,
      m,
      d
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Cd(
    n,
    a,
    l,
    s,
    as(o),
    m,
    d,
    h,
    !0,
    p
  ));
}
async function cR(n, a, l, s, o, c, d) {
  s.some((y) => y._lazyPromises?.middleware) && await Promise.all(s.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    unstable_url: Db(a, l),
    unstable_pattern: as(s),
    params: s[0].params,
    context: c,
    matches: s
  }, m = await n({
    ...h,
    fetcherKey: o,
    runClientMiddleware: (y) => {
      let b = h;
      return Mb(b, () => y({
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
async function fR({
  request: n,
  path: a,
  unstable_pattern: l,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: d,
  scopedContext: h
}) {
  let p, m, y = Pt(n.method), b = y ? "action" : "loader", S = (T) => {
    let R, w = new Promise((B, L) => R = L);
    m = () => R(), n.signal.addEventListener("abort", m);
    let D = (B) => typeof T != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${b}" [routeId: ${s.route.id}]`
      )
    ) : T(
      {
        request: n,
        unstable_url: Db(n, a),
        unstable_pattern: l,
        params: s.params,
        context: h
      },
      ...B !== void 0 ? [B] : []
    ), O = (async () => {
      try {
        return { type: "data", result: await (d ? d((L) => D(L)) : D()) };
      } catch (B) {
        return { type: "error", result: B };
      }
    })();
    return Promise.race([O, w]);
  };
  try {
    let T = y ? s.route.action : s.route.loader;
    if (o || c)
      if (T) {
        let R, [w] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(T).catch((D) => {
            R = D;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          c
        ]);
        if (R !== void 0)
          throw R;
        p = w;
      } else {
        await o;
        let R = y ? s.route.action : s.route.loader;
        if (R)
          [p] = await Promise.all([S(R), c]);
        else if (b === "action") {
          let w = new URL(n.url), D = w.pathname + w.search;
          throw xn(405, {
            method: n.method,
            pathname: D,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (T)
      p = await S(T);
    else {
      let R = new URL(n.url), w = R.pathname + R.search;
      throw xn(404, {
        pathname: w
      });
    }
  } catch (T) {
    return { type: "error", result: T };
  } finally {
    m && n.signal.removeEventListener("abort", m);
  }
  return p;
}
async function dR(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function hR(n) {
  let { result: a, type: l } = n;
  if (lh(a)) {
    let s;
    try {
      s = await dR(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return l === "error" ? {
      type: "error",
      error: new vu(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return l === "error" ? rv(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: gR(a),
    statusCode: Zr(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Zr(a) ? a.status : void 0
  } : rv(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function mR(n, a, l, s, o) {
  let c = n.headers.get("Location");
  if (Oe(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !th(c)) {
    let d = s.slice(
      0,
      s.findIndex((h) => h.route.id === l) + 1
    );
    c = wd(
      new URL(a.url),
      d,
      o,
      c
    ), n.headers.set("Location", c);
  }
  return n;
}
var ev = [
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
function tv(n, a, l, s) {
  if (th(n)) {
    let o = n, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (ev.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let d = wn(c.pathname, l) != null;
    if (c.origin === a.origin && d)
      return ah(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(n);
    if (ev.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function Ml(n, a, l, s) {
  let o = n.createURL(Nb(a)).toString(), c = { signal: l };
  if (s && Pt(s.formMethod)) {
    let { formMethod: d, formEncType: h } = s;
    c.method = d.toUpperCase(), h === "application/json" ? (c.headers = new Headers({ "Content-Type": h }), c.body = JSON.stringify(s.json)) : h === "text/plain" ? c.body = s.text : h === "application/x-www-form-urlencoded" && s.formData ? c.body = Md(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function Db(n, a) {
  let l = new URL(n.url), s = typeof a == "string" ? Un(a) : a;
  if (l.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), c = o.getAll("index");
    o.delete("index");
    for (let d of c.filter(Boolean))
      o.append("index", d);
    l.search = o.size ? `?${o.toString()}` : "";
  } else
    l.search = "";
  return l.hash = s.hash || "", l;
}
function Md(n) {
  let a = new URLSearchParams();
  for (let [l, s] of n.entries())
    a.append(l, typeof s == "string" ? s : s.name);
  return a;
}
function nv(n) {
  let a = new FormData();
  for (let [l, s] of n.entries())
    a.append(l, s);
  return a;
}
function pR(n, a, l, s = !1, o = !1) {
  let c = {}, d = null, h, p = !1, m = {}, y = l && cn(l[1]) ? l[1].error : void 0;
  return n.forEach((b) => {
    if (!(b.route.id in a))
      return;
    let S = b.route.id, T = a[S];
    if (Oe(
      !Oi(T),
      "Cannot handle redirect results in processLoaderData"
    ), cn(T)) {
      let R = T.error;
      if (y !== void 0 && (R = y, y = void 0), d = d || {}, o)
        d[S] = R;
      else {
        let w = ti(n, S);
        d[w.route.id] == null && (d[w.route.id] = R);
      }
      s || (c[S] = Tb), p || (p = !0, h = Zr(T.error) ? T.error.status : 500), T.headers && (m[S] = T.headers);
    } else
      c[S] = T.data, T.statusCode && T.statusCode !== 200 && !p && (h = T.statusCode), T.headers && (m[S] = T.headers);
  }), y !== void 0 && l && (d = { [l[0]]: y }, l[2] && (c[l[2]] = void 0)), {
    loaderData: c,
    errors: d,
    statusCode: h || 200,
    loaderHeaders: m
  };
}
function av(n, a, l, s, o, c) {
  let { loaderData: d, errors: h } = pR(
    a,
    l,
    s
  );
  return o.filter((p) => !p.matches || p.matches.some((m) => m.shouldLoad)).forEach((p) => {
    let { key: m, match: y, controller: b } = p;
    if (b && b.signal.aborted)
      return;
    let S = c[m];
    if (Oe(S, "Did not find corresponding fetcher result"), cn(S)) {
      let T = ti(n.matches, y?.route.id);
      h && h[T.route.id] || (h = {
        ...h,
        [T.route.id]: S.error
      }), n.fetchers.delete(m);
    } else if (Oi(S))
      Oe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let T = va(S.data);
      n.fetchers.set(m, T);
    }
  }), { loaderData: d, errors: h };
}
function iv(n, a, l, s) {
  let o = Object.entries(a).filter(([, c]) => c !== Tb).reduce((c, [d, h]) => (c[d] = h, c), {});
  for (let c of l) {
    let d = c.route.id;
    if (!a.hasOwnProperty(d) && n.hasOwnProperty(d) && c.route.loader && (o[d] = n[d]), s && s.hasOwnProperty(d))
      break;
  }
  return o;
}
function lv(n) {
  return n ? cn(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function ti(n, a) {
  return (a ? n.slice(0, n.findIndex((s) => s.route.id === a) + 1) : [...n]).reverse().find((s) => s.route.hasErrorBoundary === !0) || n[0];
}
function zo(n) {
  let a = n.length === 1 ? n[0] : n.find((l) => l.index || !l.path || l.path === "/") || {
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
function xn(n, {
  pathname: a,
  routeId: l,
  method: s,
  type: o,
  message: c
} = {}) {
  let d = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return n === 400 ? (d = "Bad Request", s && a && l ? h = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${l}", so there is no way to handle the request.` : o === "invalid-body" && (h = "Unable to encode submission body")) : n === 403 ? (d = "Forbidden", h = `Route "${l}" does not match URL "${a}"`) : n === 404 ? (d = "Not Found", h = `No route matches URL "${a}"`) : n === 405 && (d = "Method Not Allowed", s && a && l ? h = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${l}", so there is no way to handle the request.` : s && (h = `Invalid request method "${s.toUpperCase()}"`)), new vu(
    n || 500,
    d,
    new Error(h),
    !0
  );
}
function Oo(n) {
  let a = Object.entries(n);
  for (let l = a.length - 1; l >= 0; l--) {
    let [s, o] = a[l];
    if (Oi(o))
      return { key: s, result: o };
  }
}
function Nb(n) {
  let a = typeof n == "string" ? Un(n) : n;
  return Kn({ ...a, hash: "" });
}
function yR(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function gR(n) {
  return new vu(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function vR(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, l]) => typeof a == "string" && bR(l)
  );
}
function bR(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function SR(n) {
  return lh(n.result) && xb.has(n.result.status);
}
function cn(n) {
  return n.type === "error";
}
function Oi(n) {
  return (n && n.type) === "redirect";
}
function rv(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function lh(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function xR(n) {
  return xb.has(n);
}
function ER(n) {
  return lh(n) && xR(n.status) && n.headers.has("Location");
}
function TR(n) {
  return WT.has(n.toUpperCase());
}
function Pt(n) {
  return ZT.has(n.toUpperCase());
}
function rh(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function Go(n, a) {
  let l = typeof a == "string" ? Un(a).search : a.search;
  if (n[n.length - 1].route.index && rh(l || ""))
    return n[n.length - 1];
  let s = yb(n);
  return s[s.length - 1];
}
function sv(n) {
  let { formMethod: a, formAction: l, formEncType: s, text: o, formData: c, json: d } = n;
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
    if (d !== void 0)
      return {
        formMethod: a,
        formAction: l,
        formEncType: s,
        formData: void 0,
        json: d,
        text: void 0
      };
  }
}
function Qf(n, a) {
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
function RR(n, a) {
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
function _r(n, a) {
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
function wR(n, a) {
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
function va(n) {
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
function CR(n, a) {
  try {
    let l = n.sessionStorage.getItem(
      Eb
    );
    if (l) {
      let s = JSON.parse(l);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function MR(n, a) {
  if (a.size > 0) {
    let l = {};
    for (let [s, o] of a)
      l[s] = [...o];
    try {
      n.sessionStorage.setItem(
        Eb,
        JSON.stringify(l)
      );
    } catch (s) {
      bt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function ov() {
  let n, a, l = new Promise((s, o) => {
    n = async (c) => {
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
    resolve: n,
    //@ts-ignore
    reject: a
  };
}
var Hi = x.createContext(null);
Hi.displayName = "DataRouter";
var is = x.createContext(null);
is.displayName = "DataRouterState";
var zb = x.createContext(!1);
function Ob() {
  return x.useContext(zb);
}
var sh = x.createContext({
  isTransitioning: !1
});
sh.displayName = "ViewTransition";
var _b = x.createContext(
  /* @__PURE__ */ new Map()
);
_b.displayName = "Fetchers";
var AR = x.createContext(null);
AR.displayName = "Await";
var Cn = x.createContext(
  null
);
Cn.displayName = "Navigation";
var bu = x.createContext(
  null
);
bu.displayName = "Location";
var ba = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ba.displayName = "Route";
var oh = x.createContext(null);
oh.displayName = "RouteError";
var Lb = "REACT_ROUTER_ERROR", jR = "REDIRECT", DR = "ROUTE_ERROR_RESPONSE";
function NR(n) {
  if (n.startsWith(`${Lb}:${jR}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function zR(n) {
  if (n.startsWith(
    `${Lb}:${DR}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new vu(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function OR(n, { relative: a } = {}) {
  Oe(
    ls(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: l, navigator: s } = x.useContext(Cn), { hash: o, pathname: c, search: d } = rs(n, { relative: a }), h = c;
  return l !== "/" && (h = c === "/" ? l : Tn([l, c])), s.createHref({ pathname: h, search: d, hash: o });
}
function ls() {
  return x.useContext(bu) != null;
}
function Sa() {
  return Oe(
    ls(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(bu).location;
}
var Ub = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Vb(n) {
  x.useContext(Cn).static || x.useLayoutEffect(n);
}
function qi() {
  let { isDataRoute: n } = x.useContext(ba);
  return n ? FR() : _R();
}
function _R() {
  Oe(
    ls(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = x.useContext(Hi), { basename: a, navigator: l } = x.useContext(Cn), { matches: s } = x.useContext(ba), { pathname: o } = Sa(), c = JSON.stringify(nh(s)), d = x.useRef(!1);
  return Vb(() => {
    d.current = !0;
  }), x.useCallback(
    (p, m = {}) => {
      if (bt(d.current, Ub), !d.current) return;
      if (typeof p == "number") {
        l.go(p);
        return;
      }
      let y = gu(
        p,
        JSON.parse(c),
        o,
        m.relative === "path"
      );
      n == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : Tn([a, y.pathname])), (m.replace ? l.replace : l.push)(
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
      n
    ]
  );
}
x.createContext(null);
function rs(n, { relative: a } = {}) {
  let { matches: l } = x.useContext(ba), { pathname: s } = Sa(), o = JSON.stringify(nh(l));
  return x.useMemo(
    () => gu(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function LR(n, a, l) {
  Oe(
    ls(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = x.useContext(Cn), { matches: o } = x.useContext(ba), c = o[o.length - 1], d = c ? c.params : {}, h = c ? c.pathname : "/", p = c ? c.pathnameBase : "/", m = c && c.route;
  {
    let D = m && m.path || "";
    qb(
      h,
      !m || D.endsWith("*") || D.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${D}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${D}"> to <Route path="${D === "/" ? "*" : `${D}/*`}">.`
    );
  }
  let y = Sa(), b;
  b = y;
  let S = b.pathname || "/", T = S;
  if (p !== "/") {
    let D = p.replace(/^\//, "").split("/");
    T = "/" + S.replace(/^\//, "").split("/").slice(D.length).join("/");
  }
  let R = ei(n, { pathname: T });
  return bt(
    m || R != null,
    `No routes matched location "${b.pathname}${b.search}${b.hash}" `
  ), bt(
    R == null || R[R.length - 1].route.element !== void 0 || R[R.length - 1].route.Component !== void 0 || R[R.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), qR(
    R && R.map(
      (D) => Object.assign({}, D, {
        params: Object.assign({}, d, D.params),
        pathname: Tn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            D.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : D.pathname
        ]),
        pathnameBase: D.pathnameBase === "/" ? p : Tn([
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
function UR() {
  let n = GR(), a = Zr(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), l = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, d = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), d = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, a), l ? /* @__PURE__ */ x.createElement("pre", { style: o }, l) : null, d);
}
var VR = /* @__PURE__ */ x.createElement(UR, null), Bb = class extends x.Component {
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
      const l = zR(n.digest);
      l && (n = l);
    }
    let a = n !== void 0 ? /* @__PURE__ */ x.createElement(ba.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      oh.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ x.createElement(BR, { error: n }, a) : a;
  }
};
Bb.contextType = zb;
var If = /* @__PURE__ */ new WeakMap();
function BR({
  children: n,
  error: a
}) {
  let { basename: l } = x.useContext(Cn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = NR(a.digest);
    if (s) {
      let o = If.get(a);
      if (o) throw o;
      let c = vb(s.location, l);
      if (gb && !If.get(a))
        if (c.isExternal || s.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const d = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(c.to, {
              replace: s.replace
            })
          );
          throw If.set(a, d), d;
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
function HR({ routeContext: n, match: a, children: l }) {
  let s = x.useContext(Hi);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ x.createElement(ba.Provider, { value: n }, l);
}
function qR(n, a = [], l) {
  let s = l?.state;
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
    Oe(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        c
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, y + 1)
    );
  }
  let d = !1, h = -1;
  if (l && s) {
    d = s.renderFallback;
    for (let y = 0; y < o.length; y++) {
      let b = o[y];
      if ((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (h = y), b.route.id) {
        let { loaderData: S, errors: T } = s, R = b.route.loader && !S.hasOwnProperty(b.route.id) && (!T || T[b.route.id] === void 0);
        if (b.route.lazy || R) {
          l.isStatic && (d = !0), h >= 0 ? o = o.slice(0, h + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let p = l?.onError, m = s && p ? (y, b) => {
    p(y, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: as(s.matches),
      errorInfo: b
    });
  } : void 0;
  return o.reduceRight(
    (y, b, S) => {
      let T, R = !1, w = null, D = null;
      s && (T = c && b.route.id ? c[b.route.id] : void 0, w = b.route.errorElement || VR, d && (h < 0 && S === 0 ? (qb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), R = !0, D = null) : h === S && (R = !0, D = b.route.hydrateFallbackElement || null)));
      let O = a.concat(o.slice(0, S + 1)), B = () => {
        let L;
        return T ? L = w : R ? L = D : b.route.Component ? L = /* @__PURE__ */ x.createElement(b.route.Component, null) : b.route.element ? L = b.route.element : L = y, /* @__PURE__ */ x.createElement(
          HR,
          {
            match: b,
            routeContext: {
              outlet: y,
              matches: O,
              isDataRoute: s != null
            },
            children: L
          }
        );
      };
      return s && (b.route.ErrorBoundary || b.route.errorElement || S === 0) ? /* @__PURE__ */ x.createElement(
        Bb,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: w,
          error: T,
          children: B(),
          routeContext: { outlet: null, matches: O, isDataRoute: !0 },
          onError: m
        }
      ) : B();
    },
    null
  );
}
function uh(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function kR(n) {
  let a = x.useContext(Hi);
  return Oe(a, uh(n)), a;
}
function Hb(n) {
  let a = x.useContext(is);
  return Oe(a, uh(n)), a;
}
function PR(n) {
  let a = x.useContext(ba);
  return Oe(a, uh(n)), a;
}
function Su(n) {
  let a = PR(n), l = a.matches[a.matches.length - 1];
  return Oe(
    l.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), l.route.id;
}
function YR() {
  return Su(
    "useRouteId"
    /* UseRouteId */
  );
}
function ss() {
  let n = Hb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Su(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function GR() {
  let n = x.useContext(oh), a = Hb(
    "useRouteError"
    /* UseRouteError */
  ), l = Su(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[l];
}
function FR() {
  let { router: n } = kR(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Su(
    "useNavigate"
    /* UseNavigateStable */
  ), l = x.useRef(!1);
  return Vb(() => {
    l.current = !0;
  }), x.useCallback(
    async (o, c = {}) => {
      bt(l.current, Ub), l.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...c }));
    },
    [n, a]
  );
}
var uv = {};
function qb(n, a, l) {
  !a && !uv[n] && (uv[n] = !0, bt(!1, l));
}
var cv = {};
function fv(n, a) {
  !n && !cv[a] && (cv[a] = !0, console.warn(a));
}
var $R = "useOptimistic", dv = oT[$R], XR = () => {
};
function KR(n) {
  return dv ? dv(n) : [n, XR];
}
function QR(n) {
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
var IR = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function ZR(n, a) {
  return aR({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: vT({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: IR,
    mapRouteProperties: QR,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var JR = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((n, a) => {
      this.resolve = (l) => {
        this.status === "pending" && (this.status = "resolved", n(l));
      }, this.reject = (l) => {
        this.status === "pending" && (this.status = "rejected", a(l));
      };
    });
  }
};
function WR({
  router: n,
  flushSync: a,
  onError: l,
  unstable_useTransitions: s
}) {
  s = Ob() || s;
  let [c, d] = x.useState(n.state), [h, p] = KR(c), [m, y] = x.useState(), [b, S] = x.useState({
    isTransitioning: !1
  }), [T, R] = x.useState(), [w, D] = x.useState(), [O, B] = x.useState(), L = x.useRef(/* @__PURE__ */ new Map()), V = x.useCallback(
    (Q, { deletedFetchers: te, newErrors: ce, flushSync: J, viewTransitionOpts: P }) => {
      ce && l && Object.values(ce).forEach(
        (Z) => l(Z, {
          location: Q.location,
          params: Q.matches[0]?.params ?? {},
          unstable_pattern: as(Q.matches)
        })
      ), Q.fetchers.forEach((Z, z) => {
        Z.data !== void 0 && L.current.set(z, Z.data);
      }), te.forEach((Z) => L.current.delete(Z)), fv(
        J === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let le = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (fv(
        P == null || le,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !P || !le) {
        a && J ? a(() => d(Q)) : s === !1 ? d(Q) : x.startTransition(() => {
          s === !0 && p((Z) => hv(Z, Q)), d(Q);
        });
        return;
      }
      if (a && J) {
        a(() => {
          w && (T?.resolve(), w.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: P.currentLocation,
            nextLocation: P.nextLocation
          });
        });
        let Z = n.window.document.startViewTransition(() => {
          a(() => d(Q));
        });
        Z.finished.finally(() => {
          a(() => {
            R(void 0), D(void 0), y(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => D(Z));
        return;
      }
      w ? (T?.resolve(), w.skipTransition(), B({
        state: Q,
        currentLocation: P.currentLocation,
        nextLocation: P.nextLocation
      })) : (y(Q), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: P.currentLocation,
        nextLocation: P.nextLocation
      }));
    },
    [
      n.window,
      a,
      w,
      T,
      s,
      p,
      l
    ]
  );
  x.useLayoutEffect(() => n.subscribe(V), [n, V]);
  let X = h.initialized;
  x.useLayoutEffect(() => {
    !X && n.state.initialized && V(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [X, V, n.state]), x.useEffect(() => {
    b.isTransitioning && !b.flushSync && R(new JR());
  }, [b]), x.useEffect(() => {
    if (T && m && n.window) {
      let Q = m, te = T.promise, ce = n.window.document.startViewTransition(async () => {
        s === !1 ? d(Q) : x.startTransition(() => {
          s === !0 && p((J) => hv(J, Q)), d(Q);
        }), await te;
      });
      ce.finished.finally(() => {
        R(void 0), D(void 0), y(void 0), S({ isTransitioning: !1 });
      }), D(ce);
    }
  }, [
    m,
    T,
    n.window,
    s,
    p
  ]), x.useEffect(() => {
    T && m && h.location.key === m.location.key && T.resolve();
  }, [T, w, h.location, m]), x.useEffect(() => {
    !b.isTransitioning && O && (y(O.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: O.currentLocation,
      nextLocation: O.nextLocation
    }), B(void 0));
  }, [b.isTransitioning, O]);
  let K = x.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (Q) => n.navigate(Q),
    push: (Q, te, ce) => n.navigate(Q, {
      state: te,
      preventScrollReset: ce?.preventScrollReset
    }),
    replace: (Q, te, ce) => n.navigate(Q, {
      replace: !0,
      state: te,
      preventScrollReset: ce?.preventScrollReset
    })
  }), [n]), ee = n.basename || "/", A = x.useMemo(
    () => ({
      router: n,
      navigator: K,
      static: !1,
      basename: ee,
      onError: l
    }),
    [n, K, ee, l]
  );
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(Hi.Provider, { value: A }, /* @__PURE__ */ x.createElement(is.Provider, { value: h }, /* @__PURE__ */ x.createElement(_b.Provider, { value: L.current }, /* @__PURE__ */ x.createElement(sh.Provider, { value: b }, /* @__PURE__ */ x.createElement(
    nw,
    {
      basename: ee,
      location: h.location,
      navigationType: h.historyAction,
      navigator: K,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ x.createElement(
      ew,
      {
        routes: n.routes,
        future: n.future,
        state: h,
        isStatic: !1,
        onError: l
      }
    )
  ))))), null);
}
function hv(n, a) {
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
var ew = x.memo(tw);
function tw({
  routes: n,
  future: a,
  state: l,
  isStatic: s,
  onError: o
}) {
  return LR(n, void 0, { state: l, isStatic: s, onError: o });
}
function nw({
  basename: n = "/",
  children: a = null,
  location: l,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: d
}) {
  Oe(
    !ls(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = n.replace(/^\/*/, "/"), p = x.useMemo(
    () => ({
      basename: h,
      navigator: o,
      static: c,
      unstable_useTransitions: d,
      future: {}
    }),
    [h, o, c, d]
  );
  typeof l == "string" && (l = Un(l));
  let {
    pathname: m = "/",
    search: y = "",
    hash: b = "",
    state: S = null,
    key: T = "default",
    unstable_mask: R
  } = l, w = x.useMemo(() => {
    let D = wn(m, h);
    return D == null ? null : {
      location: {
        pathname: D,
        search: y,
        hash: b,
        state: S,
        key: T,
        unstable_mask: R
      },
      navigationType: s
    };
  }, [
    h,
    m,
    y,
    b,
    S,
    T,
    s,
    R
  ]);
  return bt(
    w != null,
    `<Router basename="${h}"> is not able to match the URL "${m}${y}${b}" because it does not start with the basename, so the <Router> won't render anything.`
  ), w == null ? null : /* @__PURE__ */ x.createElement(Cn.Provider, { value: p }, /* @__PURE__ */ x.createElement(bu.Provider, { children: a, value: w }));
}
var Fo = "get", $o = "application/x-www-form-urlencoded";
function xu(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function aw(n) {
  return xu(n) && n.tagName.toLowerCase() === "button";
}
function iw(n) {
  return xu(n) && n.tagName.toLowerCase() === "form";
}
function lw(n) {
  return xu(n) && n.tagName.toLowerCase() === "input";
}
function rw(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function sw(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !rw(n);
}
var _o = null;
function ow() {
  if (_o === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), _o = !1;
    } catch {
      _o = !0;
    }
  return _o;
}
var uw = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Zf(n) {
  return n != null && !uw.has(n) ? (bt(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${$o}"`
  ), null) : n;
}
function cw(n, a) {
  let l, s, o, c, d;
  if (iw(n)) {
    let h = n.getAttribute("action");
    s = h ? wn(h, a) : null, l = n.getAttribute("method") || Fo, o = Zf(n.getAttribute("enctype")) || $o, c = new FormData(n);
  } else if (aw(n) || lw(n) && (n.type === "submit" || n.type === "image")) {
    let h = n.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = n.getAttribute("formaction") || h.getAttribute("action");
    if (s = p ? wn(p, a) : null, l = n.getAttribute("formmethod") || h.getAttribute("method") || Fo, o = Zf(n.getAttribute("formenctype")) || Zf(h.getAttribute("enctype")) || $o, c = new FormData(h, n), !ow()) {
      let { name: m, type: y, value: b } = n;
      if (y === "image") {
        let S = m ? `${m}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else m && c.append(m, b);
    }
  } else {
    if (xu(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    l = Fo, s = null, o = $o, d = n;
  }
  return c && o === "text/plain" && (d = c, c = void 0), { action: s, method: l.toLowerCase(), encType: o, formData: c, body: d };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function ch(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function kb(n, a, l, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return l ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && wn(o.pathname, a) === "/" ? o.pathname = `${au(a)}/_root.${s}` : o.pathname = `${au(o.pathname)}.${s}`, o;
}
async function fw(n, a) {
  if (n.id in a)
    return a[n.id];
  try {
    let l = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      n.module
    );
    return a[n.id] = l, l;
  } catch (l) {
    return console.error(
      `Error loading route module \`${n.module}\`, reloading page...`
    ), console.error(l), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function dw(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function hw(n, a, l) {
  let s = await Promise.all(
    n.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let d = await fw(c, l);
        return d.links ? d.links() : [];
      }
      return [];
    })
  );
  return gw(
    s.flat(1).filter(dw).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function mv(n, a, l, s, o, c) {
  let d = (p, m) => l[m] ? p.route.id !== l[m].route.id : !0, h = (p, m) => (
    // param change, /users/123 -> /users/456
    l[m].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    l[m].route.path?.endsWith("*") && l[m].params["*"] !== p.params["*"]
  );
  return c === "assets" ? a.filter(
    (p, m) => d(p, m) || h(p, m)
  ) : c === "data" ? a.filter((p, m) => {
    let y = s.routes[p.route.id];
    if (!y || !y.hasLoader)
      return !1;
    if (d(p, m) || h(p, m))
      return !0;
    if (p.route.shouldRevalidate) {
      let b = p.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: l[0]?.params || {},
        nextUrl: new URL(n, window.origin),
        nextParams: p.params,
        defaultShouldRevalidate: !0
      });
      if (typeof b == "boolean")
        return b;
    }
    return !0;
  }) : [];
}
function mw(n, a, { includeHydrateFallback: l } = {}) {
  return pw(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), l && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function pw(n) {
  return [...new Set(n)];
}
function yw(n) {
  let a = {}, l = Object.keys(n).sort();
  for (let s of l)
    a[s] = n[s];
  return a;
}
function gw(n, a) {
  let l = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let c = JSON.stringify(yw(o));
    return l.has(c) || (l.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function fh() {
  let n = x.useContext(Hi);
  return ch(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function vw() {
  let n = x.useContext(is);
  return ch(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var dh = x.createContext(void 0);
dh.displayName = "FrameworkContext";
function hh() {
  let n = x.useContext(dh);
  return ch(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function bw(n, a) {
  let l = x.useContext(dh), [s, o] = x.useState(!1), [c, d] = x.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: b } = a, S = x.useRef(null);
  x.useEffect(() => {
    if (n === "render" && d(!0), n === "viewport") {
      let w = (O) => {
        O.forEach((B) => {
          d(B.isIntersecting);
        });
      }, D = new IntersectionObserver(w, { threshold: 0.5 });
      return S.current && D.observe(S.current), () => {
        D.disconnect();
      };
    }
  }, [n]), x.useEffect(() => {
    if (s) {
      let w = setTimeout(() => {
        d(!0);
      }, 100);
      return () => {
        clearTimeout(w);
      };
    }
  }, [s]);
  let T = () => {
    o(!0);
  }, R = () => {
    o(!1), d(!1);
  };
  return l ? n !== "intent" ? [c, S, {}] : [
    c,
    S,
    {
      onFocus: Lr(h, T),
      onBlur: Lr(p, R),
      onMouseEnter: Lr(m, T),
      onMouseLeave: Lr(y, R),
      onTouchStart: Lr(b, T)
    }
  ] : [!1, S, {}];
}
function Lr(n, a) {
  return (l) => {
    n && n(l), l.defaultPrevented || a(l);
  };
}
function Sw({ page: n, ...a }) {
  let l = Ob(), { router: s } = fh(), o = x.useMemo(
    () => ei(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? l ? /* @__PURE__ */ x.createElement(Ew, { page: n, matches: o, ...a }) : /* @__PURE__ */ x.createElement(Tw, { page: n, matches: o, ...a }) : null;
}
function xw(n) {
  let { manifest: a, routeModules: l } = hh(), [s, o] = x.useState([]);
  return x.useEffect(() => {
    let c = !1;
    return hw(n, a, l).then(
      (d) => {
        c || o(d);
      }
    ), () => {
      c = !0;
    };
  }, [n, a, l]), s;
}
function Ew({
  page: n,
  matches: a,
  ...l
}) {
  let s = Sa(), { future: o } = hh(), { basename: c } = fh(), d = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let h = kb(
      n,
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
    n,
    s,
    a
  ]);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, d.map((h) => /* @__PURE__ */ x.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...l })));
}
function Tw({
  page: n,
  matches: a,
  ...l
}) {
  let s = Sa(), { future: o, manifest: c, routeModules: d } = hh(), { basename: h } = fh(), { loaderData: p, matches: m } = vw(), y = x.useMemo(
    () => mv(
      n,
      a,
      m,
      c,
      s,
      "data"
    ),
    [n, a, m, c, s]
  ), b = x.useMemo(
    () => mv(
      n,
      a,
      m,
      c,
      s,
      "assets"
    ),
    [n, a, m, c, s]
  ), S = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let w = /* @__PURE__ */ new Set(), D = !1;
    if (a.forEach((B) => {
      let L = c.routes[B.route.id];
      !L || !L.hasLoader || (!y.some((V) => V.route.id === B.route.id) && B.route.id in p && d[B.route.id]?.shouldRevalidate || L.hasClientLoader ? D = !0 : w.add(B.route.id));
    }), w.size === 0)
      return [];
    let O = kb(
      n,
      h,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return D && w.size > 0 && O.searchParams.set(
      "_routes",
      a.filter((B) => w.has(B.route.id)).map((B) => B.route.id).join(",")
    ), [O.pathname + O.search];
  }, [
    h,
    o.unstable_trailingSlashAwareDataRequests,
    p,
    s,
    c,
    y,
    a,
    n,
    d
  ]), T = x.useMemo(
    () => mw(b, c),
    [b, c]
  ), R = xw(b);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, S.map((w) => /* @__PURE__ */ x.createElement("link", { key: w, rel: "prefetch", as: "fetch", href: w, ...l })), T.map((w) => /* @__PURE__ */ x.createElement("link", { key: w, rel: "modulepreload", href: w, ...l })), R.map(({ key: w, link: D }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement(
      "link",
      {
        key: w,
        nonce: l.nonce,
        ...D,
        crossOrigin: D.crossOrigin ?? l.crossOrigin
      }
    )
  )));
}
function Rw(...n) {
  return (a) => {
    n.forEach((l) => {
      typeof l == "function" ? l(a) : l != null && (l.current = a);
    });
  };
}
var ww = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  ww && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Pb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, os = x.forwardRef(
  function({
    onClick: a,
    discover: l = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: c,
    replace: d,
    unstable_mask: h,
    state: p,
    target: m,
    to: y,
    preventScrollReset: b,
    viewTransition: S,
    unstable_defaultShouldRevalidate: T,
    ...R
  }, w) {
    let { basename: D, navigator: O, unstable_useTransitions: B } = x.useContext(Cn), L = typeof y == "string" && Pb.test(y), V = vb(y, D);
    y = V.to;
    let X = OR(y, { relative: o }), K = Sa(), ee = null;
    if (h) {
      let Z = gu(
        h,
        [],
        K.unstable_mask ? K.unstable_mask.pathname : "/",
        !0
      );
      D !== "/" && (Z.pathname = Z.pathname === "/" ? D : Tn([D, Z.pathname])), ee = O.createHref(Z);
    }
    let [A, Q, te] = bw(
      s,
      R
    ), ce = jw(y, {
      replace: d,
      unstable_mask: h,
      state: p,
      target: m,
      preventScrollReset: b,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: T,
      unstable_useTransitions: B
    });
    function J(Z) {
      a && a(Z), Z.defaultPrevented || ce(Z);
    }
    let P = !(V.isExternal || c), le = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...R,
          ...te,
          href: (P ? ee : void 0) || V.absoluteURL || X,
          onClick: P ? J : a,
          ref: Rw(w, Q),
          target: m,
          "data-discover": !L && l === "render" ? "true" : void 0
        }
      )
    );
    return A && !L ? /* @__PURE__ */ x.createElement(x.Fragment, null, le, /* @__PURE__ */ x.createElement(Sw, { page: X })) : le;
  }
);
os.displayName = "Link";
var Cw = x.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: l = !1,
    className: s = "",
    end: o = !1,
    style: c,
    to: d,
    viewTransition: h,
    children: p,
    ...m
  }, y) {
    let b = rs(d, { relative: m.relative }), S = Sa(), T = x.useContext(is), { navigator: R, basename: w } = x.useContext(Cn), D = T != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    _w(b) && h === !0, O = R.encodeLocation ? R.encodeLocation(b).pathname : b.pathname, B = S.pathname, L = T && T.navigation && T.navigation.location ? T.navigation.location.pathname : null;
    l || (B = B.toLowerCase(), L = L ? L.toLowerCase() : null, O = O.toLowerCase()), L && w && (L = wn(L, w) || L);
    const V = O !== "/" && O.endsWith("/") ? O.length - 1 : O.length;
    let X = B === O || !o && B.startsWith(O) && B.charAt(V) === "/", K = L != null && (L === O || !o && L.startsWith(O) && L.charAt(O.length) === "/"), ee = {
      isActive: X,
      isPending: K,
      isTransitioning: D
    }, A = X ? a : void 0, Q;
    typeof s == "function" ? Q = s(ee) : Q = [
      s,
      X ? "active" : null,
      K ? "pending" : null,
      D ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let te = typeof c == "function" ? c(ee) : c;
    return /* @__PURE__ */ x.createElement(
      os,
      {
        ...m,
        "aria-current": A,
        className: Q,
        ref: y,
        style: te,
        to: d,
        viewTransition: h
      },
      typeof p == "function" ? p(ee) : p
    );
  }
);
Cw.displayName = "NavLink";
var Mw = x.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: l,
    reloadDocument: s,
    replace: o,
    state: c,
    method: d = Fo,
    action: h,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: b,
    unstable_defaultShouldRevalidate: S,
    ...T
  }, R) => {
    let { unstable_useTransitions: w } = x.useContext(Cn), D = zw(), O = Ow(h, { relative: m }), B = d.toLowerCase() === "get" ? "get" : "post", L = typeof h == "string" && Pb.test(h), V = (X) => {
      if (p && p(X), X.defaultPrevented) return;
      X.preventDefault();
      let K = X.nativeEvent.submitter, ee = K?.getAttribute("formmethod") || d, A = () => D(K || X.currentTarget, {
        fetcherKey: a,
        method: ee,
        navigate: l,
        replace: o,
        state: c,
        relative: m,
        preventScrollReset: y,
        viewTransition: b,
        unstable_defaultShouldRevalidate: S
      });
      w && l !== !1 ? x.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: R,
        method: B,
        action: O,
        onSubmit: s ? p : V,
        ...T,
        "data-discover": !L && n === "render" ? "true" : void 0
      }
    );
  }
);
Mw.displayName = "Form";
function Aw(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Yb(n) {
  let a = x.useContext(Hi);
  return Oe(a, Aw(n)), a;
}
function jw(n, {
  target: a,
  replace: l,
  unstable_mask: s,
  state: o,
  preventScrollReset: c,
  relative: d,
  viewTransition: h,
  unstable_defaultShouldRevalidate: p,
  unstable_useTransitions: m
} = {}) {
  let y = qi(), b = Sa(), S = rs(n, { relative: d });
  return x.useCallback(
    (T) => {
      if (sw(T, a)) {
        T.preventDefault();
        let R = l !== void 0 ? l : Kn(b) === Kn(S), w = () => y(n, {
          replace: R,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: d,
          viewTransition: h,
          unstable_defaultShouldRevalidate: p
        });
        m ? x.startTransition(() => w()) : w();
      }
    },
    [
      b,
      y,
      S,
      l,
      s,
      o,
      a,
      n,
      c,
      d,
      h,
      p,
      m
    ]
  );
}
var Dw = 0, Nw = () => `__${String(++Dw)}__`;
function zw() {
  let { router: n } = Yb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = x.useContext(Cn), l = YR(), s = n.fetch, o = n.navigate;
  return x.useCallback(
    async (c, d = {}) => {
      let { action: h, method: p, encType: m, formData: y, body: b } = cw(
        c,
        a
      );
      if (d.navigate === !1) {
        let S = d.fetcherKey || Nw();
        await s(S, l, d.action || h, {
          unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
          preventScrollReset: d.preventScrollReset,
          formData: y,
          body: b,
          formMethod: d.method || p,
          formEncType: d.encType || m,
          flushSync: d.flushSync
        });
      } else
        await o(d.action || h, {
          unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
          preventScrollReset: d.preventScrollReset,
          formData: y,
          body: b,
          formMethod: d.method || p,
          formEncType: d.encType || m,
          replace: d.replace,
          state: d.state,
          fromRouteId: l,
          flushSync: d.flushSync,
          viewTransition: d.viewTransition
        });
    },
    [s, o, a, l]
  );
}
function Ow(n, { relative: a } = {}) {
  let { basename: l } = x.useContext(Cn), s = x.useContext(ba);
  Oe(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...rs(n || ".", { relative: a }) }, d = Sa();
  if (n == null) {
    c.search = d.search;
    let h = new URLSearchParams(c.search), p = h.getAll("index");
    if (p.some((y) => y === "")) {
      h.delete("index"), p.filter((b) => b).forEach((b) => h.append("index", b));
      let y = h.toString();
      c.search = y ? `?${y}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), l !== "/" && (c.pathname = c.pathname === "/" ? l : Tn([l, c.pathname])), Kn(c);
}
function _w(n, { relative: a } = {}) {
  let l = x.useContext(sh);
  Oe(
    l != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Yb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = rs(n, { relative: a });
  if (!l.isTransitioning)
    return !1;
  let c = wn(l.currentLocation.pathname, s) || l.currentLocation.pathname, d = wn(l.nextLocation.pathname, s) || l.nextLocation.pathname;
  return nu(o.pathname, d) != null || nu(o.pathname, c) != null;
}
class ki extends Error {
  constructor(a, l, s, o) {
    super(s), this.status = a, this.category = l, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const Pi = "/api/v1/extensions/nexus.audio.emotiontts";
async function st(n, a) {
  const l = n.startsWith("http") ? n : `${Pi}${n}`, s = await fetch(l, {
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
    throw new ki(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function Lw(n, a, l) {
  const s = n.startsWith("http") ? n : `${Pi}${n}`, o = new EventSource(s);
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
async function Uw() {
  return st("/deployments");
}
async function pv(n) {
  return st(`/deployments/${n}`);
}
async function Vw(n, a) {
  return st(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function yv(n) {
  return st(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function Gb(n, a) {
  return st("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function Bw(n, a, l) {
  return st(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(l)
    }
  );
}
async function Hw(n, a) {
  await st(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function qw(n) {
  return st(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function kw(n, a, l = "error") {
  return st("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: l })
  });
}
async function Pw(n, a = {}) {
  const l = new URLSearchParams();
  a.limit && l.set("limit", String(a.limit)), a.status && l.set("status", a.status);
  const s = l.toString(), o = s ? `?${s}` : "";
  return st(`/deployments/${n}/runs${o}`);
}
async function Yw(n, a) {
  return st(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function mh(n, a) {
  return st(`/deployments/${n}/runs/${a}`);
}
async function Gw(n, a) {
  return st(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function ph(n, a) {
  return st(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function Fw(n, a) {
  return st(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function gv(n, a, l, s) {
  return Lw(
    `/deployments/${n}/runs/${a}/progress`,
    l,
    s
  );
}
async function iu(n) {
  return st(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function $w(n, a, l, s, o) {
  const c = new FormData();
  c.append("deploymentId", n), c.append("displayName", l), c.append("kind", s), c.append("audio", a);
  const d = await fetch(`${Pi}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!d.ok)
    throw new Error(`upload failed: ${d.status}`);
  return await d.json();
}
async function Xw(n) {
  return st(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var Kw = "_93p6291", Qw = "_93p6292", Iw = "_93p6293", Zw = "_93p6294", Jw = "_93p6295", Ww = "_93p6296", eC = "_93p6297", tC = "_93p6298", nC = "_93p6299", aC = "_93p629a", iC = "_93p629b", lC = "_93p629c", rC = "_93p629d", sC = "_93p629e", oC = "_93p629f", uC = "_93p629g", cC = "_93p629h", fC = "_93p629i";
function dC() {
  const { deployments: n } = ss();
  return /* @__PURE__ */ v.jsxs("main", { className: Kw, children: [
    /* @__PURE__ */ v.jsxs("header", { className: Qw, children: [
      /* @__PURE__ */ v.jsx("p", { className: Iw, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ v.jsxs("h1", { className: Zw, children: [
        "Direct your characters.",
        /* @__PURE__ */ v.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ v.jsx("p", { className: Jw, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." })
    ] }),
    /* @__PURE__ */ v.jsxs("section", { className: Ww, children: [
      /* @__PURE__ */ v.jsx("h2", { className: eC, children: "Deployments" }),
      n.length === 0 ? /* @__PURE__ */ v.jsxs("div", { className: sC, children: [
        /* @__PURE__ */ v.jsx("span", { className: oC, "aria-hidden": "true", children: "◈" }),
        /* @__PURE__ */ v.jsx("p", { className: uC, children: "No deployments yet" }),
        /* @__PURE__ */ v.jsx("p", { className: cC, children: "A deployment is a named character-cast that binds voices, presets, and the runtime settings for a script. Create your first one from the host shell." }),
        /* @__PURE__ */ v.jsx("p", { className: fC, children: "Host shell → Extensions → EmotionTTS → New" })
      ] }) : /* @__PURE__ */ v.jsx("ul", { className: tC, children: n.map((a) => /* @__PURE__ */ v.jsx("li", { children: /* @__PURE__ */ v.jsxs(os, { to: `/${a.deploymentId}/recipe`, className: nC, children: [
        /* @__PURE__ */ v.jsx("span", { className: aC, "aria-hidden": "true", children: hC(a.displayName) }),
        /* @__PURE__ */ v.jsxs("span", { children: [
          /* @__PURE__ */ v.jsx("span", { className: iC, children: a.displayName }),
          /* @__PURE__ */ v.jsx("span", { className: lC, children: a.deploymentId })
        ] }),
        /* @__PURE__ */ v.jsx("span", { className: rC, "aria-hidden": "true", children: "→" })
      ] }) }, a.deploymentId)) })
    ] })
  ] });
}
function hC(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
const mC = "huggingface/IndexTeam/IndexTTS-2";
async function pC(n) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(n)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function yC() {
  return st("/runtime/health");
}
async function gC() {
  await st("/runtime/start", { method: "POST" });
}
async function vC() {
  return st("/runtime/stop", { method: "POST" });
}
async function bC() {
  await st("/runtime/restart", { method: "POST" });
}
function SC(n) {
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
var xC = "g5r6d10", EC = "g5r6d11", TC = "g5r6d12", Ur = "g5r6d13", Vr = "g5r6d14", RC = "g5r6d15", wC = "g5r6d16", CC = "g5r6d17", en = "g5r6d18", Wa = "g5r6d19", lu = "g5r6d1b g5r6d1a", ii = "g5r6d1c g5r6d1a", Fb = "g5r6d1d g5r6d1a", $b = "g5r6d1e", Jr = "g5r6d1f", Ad = "g5r6d1g", MC = "g5r6d1h", AC = "g5r6d1i", Za = "g5r6d1j", Xb = "g5r6d1k", Kb = "g5r6d1l g5r6d1k", yh = "g5r6d1m g5r6d1k", gh = "g5r6d1n g5r6d1k";
const jC = 4e3;
function DC({ deployment: n }) {
  const a = qi(), [l, s] = x.useState(null), [o, c] = x.useState(null), [d, h] = x.useState(!1);
  x.useEffect(() => {
    let D = !1;
    const O = async () => {
      try {
        const L = await yC();
        D || (s(L), c(null));
      } catch (L) {
        D || c(Br(L));
      }
    };
    O();
    const B = setInterval(O, jC);
    return () => {
      D = !0, clearInterval(B);
    };
  }, []);
  const p = x.useCallback(async () => {
    h(!0), c(null);
    try {
      await gC();
    } catch (D) {
      c(Br(D));
    } finally {
      h(!1);
    }
  }, []), m = x.useCallback(async () => {
    h(!0);
    try {
      await vC();
    } catch (D) {
      c(Br(D));
    } finally {
      h(!1);
    }
  }, []), y = x.useCallback(async () => {
    h(!0);
    try {
      await bC();
    } catch (D) {
      c(Br(D));
    } finally {
      h(!1);
    }
  }, []), b = x.useCallback(async () => {
    h(!0);
    try {
      await pC(mC);
    } catch (D) {
      c(Br(D));
    } finally {
      h(!1);
    }
  }, []), S = l?.badge ?? "not_installed", T = S === "stopped" || S === "not_installed", R = S === "ready" || S === "running" || S === "starting", w = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ v.jsxs("div", { className: Wa, role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ v.jsx("span", { className: en, children: "Runtime" }),
    /* @__PURE__ */ v.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ v.jsx("span", { className: en, children: "Badge" }),
    /* @__PURE__ */ v.jsx("span", { className: NC(S), children: SC(S) }),
    l && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx("span", { className: en, children: "Uptime" }),
      /* @__PURE__ */ v.jsx("span", { children: zC(l.uptimeSeconds) }),
      /* @__PURE__ */ v.jsx("span", { className: en, children: "VRAM" }),
      /* @__PURE__ */ v.jsxs("span", { children: [
        l.vramUsedMb,
        " / ",
        l.vramTotalMb,
        " MB"
      ] })
    ] }),
    T && /* @__PURE__ */ v.jsx("button", { type: "button", className: lu, disabled: d, onClick: p, children: "Install / Start runtime" }),
    R && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx("button", { type: "button", className: Fb, disabled: d, onClick: m, children: "Stop backend" }),
      /* @__PURE__ */ v.jsx("button", { type: "button", className: ii, disabled: d, onClick: y, children: "Restart" })
    ] }),
    w && /* @__PURE__ */ v.jsx("button", { type: "button", className: lu, disabled: d, onClick: b, children: "Download IndexTTS-2 model" }),
    /* @__PURE__ */ v.jsx(
      "button",
      {
        type: "button",
        className: ii,
        onClick: () => a(`/${n.deploymentId}/mappings`),
        title: "Manage character → voice mappings (upload voice samples, edit emotion defaults)",
        children: "Mappings"
      }
    ),
    o && !w && /* @__PURE__ */ v.jsx("span", { className: Jr, children: o })
  ] });
}
function NC(n) {
  switch (n) {
    case "ready":
    case "running":
      return Kb;
    case "starting":
    case "stopping":
    case "installing":
      return yh;
    case "failed":
      return gh;
    default:
      return Xb;
  }
}
function zC(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Br(n) {
  return n instanceof ki || n instanceof Error ? n.message : "unknown error";
}
async function OC(n) {
  return st(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function _C(n, a, l) {
  return st("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: l })
  });
}
async function LC(n, a) {
  await st(
    `/presets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
var UC = "wfqeb50", VC = "wfqeb51", BC = "wfqeb52", HC = "wfqeb53", qC = "wfqeb54", kC = "wfqeb55 wfqeb54", PC = "wfqeb56", YC = "wfqeb57", Qb = "wfqeb58", Ib = "wfqeb59", Zb = "wfqeb5a", GC = "wfqeb5b", FC = "wfqeb5c", vv = "wfqeb5d", $C = "wfqeb5e wfqeb5d", XC = "wfqeb5f wfqeb5d", KC = "wfqeb5g", QC = "wfqeb5h", Jf = "wfqeb5i", IC = "wfqeb5j", ZC = "wfqeb5k", JC = "wfqeb5l", WC = "wfqeb5m";
const vh = x.createContext({});
function bh(n) {
  const a = x.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const eM = typeof window < "u", Jb = eM ? x.useLayoutEffect : x.useEffect, Eu = /* @__PURE__ */ x.createContext(null);
function Sh(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function ru(n, a) {
  const l = n.indexOf(a);
  l > -1 && n.splice(l, 1);
}
const Qn = (n, a, l) => l > a ? a : l < n ? n : l;
function bv(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let us = () => {
}, Bi = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (us = (n, a, l) => {
  !n && typeof console < "u" && console.warn(bv(a, l));
}, Bi = (n, a, l) => {
  if (!n)
    throw new Error(bv(a, l));
});
const li = {}, Wb = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function eS(n) {
  return typeof n == "object" && n !== null;
}
const tS = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function nS(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const Rn = /* @__NO_SIDE_EFFECTS__ */ (n) => n, tM = (n, a) => (l) => a(n(l)), cs = (...n) => n.reduce(tM), Wr = /* @__NO_SIDE_EFFECTS__ */ (n, a, l) => {
  const s = a - n;
  return s === 0 ? 1 : (l - n) / s;
};
class xh {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return Sh(this.subscriptions, a), () => ru(this.subscriptions, a);
  }
  notify(a, l, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, l, s);
      else
        for (let c = 0; c < o; c++) {
          const d = this.subscriptions[c];
          d && d(a, l, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const tn = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, En = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function aS(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const iS = (n, a, l) => (((1 - 3 * l + 3 * a) * n + (3 * l - 6 * a)) * n + 3 * a) * n, nM = 1e-7, aM = 12;
function iM(n, a, l, s, o) {
  let c, d, h = 0;
  do
    d = a + (l - a) / 2, c = iS(d, s, o) - n, c > 0 ? l = d : a = d;
  while (Math.abs(c) > nM && ++h < aM);
  return d;
}
function fs(n, a, l, s) {
  if (n === a && l === s)
    return Rn;
  const o = (c) => iM(c, 0, 1, n, l);
  return (c) => c === 0 || c === 1 ? c : iS(o(c), a, s);
}
const lS = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, rS = (n) => (a) => 1 - n(1 - a), sS = /* @__PURE__ */ fs(0.33, 1.53, 0.69, 0.99), Eh = /* @__PURE__ */ rS(sS), oS = /* @__PURE__ */ lS(Eh), uS = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * Eh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), Th = (n) => 1 - Math.sin(Math.acos(n)), cS = rS(Th), fS = lS(Th), lM = /* @__PURE__ */ fs(0.42, 0, 1, 1), rM = /* @__PURE__ */ fs(0, 0, 0.58, 1), dS = /* @__PURE__ */ fs(0.42, 0, 0.58, 1), sM = (n) => Array.isArray(n) && typeof n[0] != "number", hS = (n) => Array.isArray(n) && typeof n[0] == "number", Sv = {
  linear: Rn,
  easeIn: lM,
  easeInOut: dS,
  easeOut: rM,
  circIn: Th,
  circInOut: fS,
  circOut: cS,
  backIn: Eh,
  backInOut: oS,
  backOut: sS,
  anticipate: uS
}, oM = (n) => typeof n == "string", xv = (n) => {
  if (hS(n)) {
    Bi(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, l, s, o] = n;
    return fs(a, l, s, o);
  } else if (oM(n))
    return Bi(Sv[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), Sv[n];
  return n;
}, Lo = [
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
function uM(n, a) {
  let l = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, c = !1;
  const d = /* @__PURE__ */ new WeakSet();
  let h = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function p(y) {
    d.has(y) && (m.schedule(y), n()), y(h);
  }
  const m = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (y, b = !1, S = !1) => {
      const R = S && o ? l : s;
      return b && d.add(y), R.add(y), y;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (y) => {
      s.delete(y), d.delete(y);
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
const cM = 40;
function mS(n, a) {
  let l = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, d = Lo.reduce((L, V) => (L[V] = uM(c), L), {}), { setup: h, read: p, resolveKeyframes: m, preUpdate: y, update: b, preRender: S, render: T, postRender: R } = d, w = () => {
    const L = li.useManualTiming, V = L ? o.timestamp : performance.now();
    l = !1, L || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(V - o.timestamp, cM), 1)), o.timestamp = V, o.isProcessing = !0, h.process(o), p.process(o), m.process(o), y.process(o), b.process(o), S.process(o), T.process(o), R.process(o), o.isProcessing = !1, l && a && (s = !1, n(w));
  }, D = () => {
    l = !0, s = !0, o.isProcessing || n(w);
  };
  return { schedule: Lo.reduce((L, V) => {
    const X = d[V];
    return L[V] = (K, ee = !1, A = !1) => (l || D(), X.schedule(K, ee, A)), L;
  }, {}), cancel: (L) => {
    for (let V = 0; V < Lo.length; V++)
      d[Lo[V]].cancel(L);
  }, state: o, steps: d };
}
const { schedule: tt, cancel: ri, state: Ut, steps: Wf } = /* @__PURE__ */ mS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Rn, !0);
let Xo;
function fM() {
  Xo = void 0;
}
const $t = {
  now: () => (Xo === void 0 && $t.set(Ut.isProcessing || li.useManualTiming ? Ut.timestamp : performance.now()), Xo),
  set: (n) => {
    Xo = n, queueMicrotask(fM);
  }
}, pS = (n) => (a) => typeof a == "string" && a.startsWith(n), yS = /* @__PURE__ */ pS("--"), dM = /* @__PURE__ */ pS("var(--"), Rh = (n) => dM(n) ? hM.test(n.split("/*")[0].trim()) : !1, hM = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Ev(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Bl = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, es = {
  ...Bl,
  transform: (n) => Qn(0, 1, n)
}, Uo = {
  ...Bl,
  default: 1
}, $r = (n) => Math.round(n * 1e5) / 1e5, wh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function mM(n) {
  return n == null;
}
const pM = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Ch = (n, a) => (l) => !!(typeof l == "string" && pM.test(l) && l.startsWith(n) || a && !mM(l) && Object.prototype.hasOwnProperty.call(l, a)), gS = (n, a, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, d, h] = s.match(wh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(c),
    [l]: parseFloat(d),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, yM = (n) => Qn(0, 255, n), ed = {
  ...Bl,
  transform: (n) => Math.round(yM(n))
}, _i = {
  test: /* @__PURE__ */ Ch("rgb", "red"),
  parse: /* @__PURE__ */ gS("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: l, alpha: s = 1 }) => "rgba(" + ed.transform(n) + ", " + ed.transform(a) + ", " + ed.transform(l) + ", " + $r(es.transform(s)) + ")"
};
function gM(n) {
  let a = "", l = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), l = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), l = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, l += l, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(l, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const jd = {
  test: /* @__PURE__ */ Ch("#"),
  parse: gM,
  transform: _i.transform
}, ds = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), Ja = /* @__PURE__ */ ds("deg"), Xn = /* @__PURE__ */ ds("%"), ye = /* @__PURE__ */ ds("px"), vM = /* @__PURE__ */ ds("vh"), bM = /* @__PURE__ */ ds("vw"), Tv = {
  ...Xn,
  parse: (n) => Xn.parse(n) / 100,
  transform: (n) => Xn.transform(n * 100)
}, Dl = {
  test: /* @__PURE__ */ Ch("hsl", "hue"),
  parse: /* @__PURE__ */ gS("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Xn.transform($r(a)) + ", " + Xn.transform($r(l)) + ", " + $r(es.transform(s)) + ")"
}, Ct = {
  test: (n) => _i.test(n) || jd.test(n) || Dl.test(n),
  parse: (n) => _i.test(n) ? _i.parse(n) : Dl.test(n) ? Dl.parse(n) : jd.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? _i.transform(n) : Dl.transform(n),
  getAnimatableNone: (n) => {
    const a = Ct.parse(n);
    return a.alpha = 0, Ct.transform(a);
  }
}, SM = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function xM(n) {
  return isNaN(n) && typeof n == "string" && (n.match(wh)?.length || 0) + (n.match(SM)?.length || 0) > 0;
}
const vS = "number", bS = "color", EM = "var", TM = "var(", Rv = "${}", RM = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ll(n) {
  const a = n.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const h = a.replace(RM, (p) => (Ct.test(p) ? (s.color.push(c), o.push(bS), l.push(Ct.parse(p))) : p.startsWith(TM) ? (s.var.push(c), o.push(EM), l.push(p)) : (s.number.push(c), o.push(vS), l.push(parseFloat(p))), ++c, Rv)).split(Rv);
  return { values: l, split: h, indexes: s, types: o };
}
function wM(n) {
  return Ll(n).values;
}
function SS({ split: n, types: a }) {
  const l = n.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < l; c++)
      if (o += n[c], s[c] !== void 0) {
        const d = a[c];
        d === vS ? o += $r(s[c]) : d === bS ? o += Ct.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function CM(n) {
  return SS(Ll(n));
}
const MM = (n) => typeof n == "number" ? 0 : Ct.test(n) ? Ct.getAnimatableNone(n) : n, AM = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : MM(n);
function jM(n) {
  const a = Ll(n);
  return SS(a)(a.values.map((s, o) => AM(s, a.split[o])));
}
const Ln = {
  test: xM,
  parse: wM,
  createTransformer: CM,
  getAnimatableNone: jM
};
function td(n, a, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? n + (a - n) * 6 * l : l < 1 / 2 ? a : l < 2 / 3 ? n + (a - n) * (2 / 3 - l) * 6 : n;
}
function DM({ hue: n, saturation: a, lightness: l, alpha: s }) {
  n /= 360, a /= 100, l /= 100;
  let o = 0, c = 0, d = 0;
  if (!a)
    o = c = d = l;
  else {
    const h = l < 0.5 ? l * (1 + a) : l + a - l * a, p = 2 * l - h;
    o = td(p, h, n + 1 / 3), c = td(p, h, n), d = td(p, h, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(d * 255),
    alpha: s
  };
}
function su(n, a) {
  return (l) => l > 0 ? a : n;
}
const rt = (n, a, l) => n + (a - n) * l, nd = (n, a, l) => {
  const s = n * n, o = l * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, NM = [jd, _i, Dl], zM = (n) => NM.find((a) => a.test(n));
function wv(n) {
  const a = zM(n);
  if (us(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let l = a.parse(n);
  return a === Dl && (l = DM(l)), l;
}
const Cv = (n, a) => {
  const l = wv(n), s = wv(a);
  if (!l || !s)
    return su(n, a);
  const o = { ...l };
  return (c) => (o.red = nd(l.red, s.red, c), o.green = nd(l.green, s.green, c), o.blue = nd(l.blue, s.blue, c), o.alpha = rt(l.alpha, s.alpha, c), _i.transform(o));
}, Dd = /* @__PURE__ */ new Set(["none", "hidden"]);
function OM(n, a) {
  return Dd.has(n) ? (l) => l <= 0 ? n : a : (l) => l >= 1 ? a : n;
}
function _M(n, a) {
  return (l) => rt(n, a, l);
}
function Mh(n) {
  return typeof n == "number" ? _M : typeof n == "string" ? Rh(n) ? su : Ct.test(n) ? Cv : VM : Array.isArray(n) ? xS : typeof n == "object" ? Ct.test(n) ? Cv : LM : su;
}
function xS(n, a) {
  const l = [...n], s = l.length, o = n.map((c, d) => Mh(c)(c, a[d]));
  return (c) => {
    for (let d = 0; d < s; d++)
      l[d] = o[d](c);
    return l;
  };
}
function LM(n, a) {
  const l = { ...n, ...a }, s = {};
  for (const o in l)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = Mh(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in s)
      l[c] = s[c](o);
    return l;
  };
}
function UM(n, a) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], d = n.indexes[c][s[c]], h = n.values[d] ?? 0;
    l[o] = h, s[c]++;
  }
  return l;
}
const VM = (n, a) => {
  const l = Ln.createTransformer(a), s = Ll(n), o = Ll(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Dd.has(n) && !o.values.length || Dd.has(a) && !s.values.length ? OM(n, a) : cs(xS(UM(s, o), o.values), l) : (us(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), su(n, a));
};
function ES(n, a, l) {
  return typeof n == "number" && typeof a == "number" && typeof l == "number" ? rt(n, a, l) : Mh(n)(n, a);
}
const BM = (n) => {
  const a = ({ timestamp: l }) => n(l);
  return {
    start: (l = !0) => tt.update(a, l),
    stop: () => ri(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Ut.isProcessing ? Ut.timestamp : $t.now()
  };
}, TS = (n, a, l = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / l), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, ou = 2e4;
function Ah(n) {
  let a = 0;
  const l = 50;
  let s = n.next(a);
  for (; !s.done && a < ou; )
    a += l, s = n.next(a);
  return a >= ou ? 1 / 0 : a;
}
function HM(n, a = 100, l) {
  const s = l({ ...n, keyframes: [0, a] }), o = Math.min(Ah(s), ou);
  return {
    type: "keyframes",
    ease: (c) => s.next(o * c).value / a,
    duration: /* @__PURE__ */ En(o)
  };
}
const ft = {
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
function Nd(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const qM = 12;
function kM(n, a, l) {
  let s = l;
  for (let o = 1; o < qM; o++)
    s = s - n(s) / a(s);
  return s;
}
const ad = 1e-3;
function PM({ duration: n = ft.duration, bounce: a = ft.bounce, velocity: l = ft.velocity, mass: s = ft.mass }) {
  let o, c;
  us(n <= /* @__PURE__ */ tn(ft.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let d = 1 - a;
  d = Qn(ft.minDamping, ft.maxDamping, d), n = Qn(ft.minDuration, ft.maxDuration, /* @__PURE__ */ En(n)), d < 1 ? (o = (m) => {
    const y = m * d, b = y * n, S = y - l, T = Nd(m, d), R = Math.exp(-b);
    return ad - S / T * R;
  }, c = (m) => {
    const b = m * d * n, S = b * l + l, T = Math.pow(d, 2) * Math.pow(m, 2) * n, R = Math.exp(-b), w = Nd(Math.pow(m, 2), d);
    return (-o(m) + ad > 0 ? -1 : 1) * ((S - T) * R) / w;
  }) : (o = (m) => {
    const y = Math.exp(-m * n), b = (m - l) * n + 1;
    return -ad + y * b;
  }, c = (m) => {
    const y = Math.exp(-m * n), b = (l - m) * (n * n);
    return y * b;
  });
  const h = 5 / n, p = kM(o, c, h);
  if (n = /* @__PURE__ */ tn(n), isNaN(p))
    return {
      stiffness: ft.stiffness,
      damping: ft.damping,
      duration: n
    };
  {
    const m = Math.pow(p, 2) * s;
    return {
      stiffness: m,
      damping: d * 2 * Math.sqrt(s * m),
      duration: n
    };
  }
}
const YM = ["duration", "bounce"], GM = ["stiffness", "damping", "mass"];
function Mv(n, a) {
  return a.some((l) => n[l] !== void 0);
}
function FM(n) {
  let a = {
    velocity: ft.velocity,
    stiffness: ft.stiffness,
    damping: ft.damping,
    mass: ft.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!Mv(n, GM) && Mv(n, YM))
    if (a.velocity = 0, n.visualDuration) {
      const l = n.visualDuration, s = 2 * Math.PI / (l * 1.2), o = s * s, c = 2 * Qn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: ft.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const l = PM({ ...n, velocity: 0 });
      a = {
        ...a,
        ...l,
        mass: ft.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function uu(n = ft.visualDuration, a = ft.bounce) {
  const l = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = l;
  const c = l.keyframes[0], d = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: p, damping: m, mass: y, duration: b, velocity: S, isResolvedFromDuration: T } = FM({
    ...l,
    velocity: -/* @__PURE__ */ En(l.velocity || 0)
  }), R = S || 0, w = m / (2 * Math.sqrt(p * y)), D = d - c, O = /* @__PURE__ */ En(Math.sqrt(p / y)), B = Math.abs(D) < 5;
  s || (s = B ? ft.restSpeed.granular : ft.restSpeed.default), o || (o = B ? ft.restDelta.granular : ft.restDelta.default);
  let L, V, X, K, ee, A;
  if (w < 1)
    X = Nd(O, w), K = (R + w * O * D) / X, L = (te) => {
      const ce = Math.exp(-w * O * te);
      return d - ce * (K * Math.sin(X * te) + D * Math.cos(X * te));
    }, ee = w * O * K + D * X, A = w * O * D - K * X, V = (te) => Math.exp(-w * O * te) * (ee * Math.sin(X * te) + A * Math.cos(X * te));
  else if (w === 1) {
    L = (ce) => d - Math.exp(-O * ce) * (D + (R + O * D) * ce);
    const te = R + O * D;
    V = (ce) => Math.exp(-O * ce) * (O * te * ce - R);
  } else {
    const te = O * Math.sqrt(w * w - 1);
    L = (le) => {
      const Z = Math.exp(-w * O * le), z = Math.min(te * le, 300);
      return d - Z * ((R + w * O * D) * Math.sinh(z) + te * D * Math.cosh(z)) / te;
    };
    const ce = (R + w * O * D) / te, J = w * O * ce - D * te, P = w * O * D - ce * te;
    V = (le) => {
      const Z = Math.exp(-w * O * le), z = Math.min(te * le, 300);
      return Z * (J * Math.sinh(z) + P * Math.cosh(z));
    };
  }
  const Q = {
    calculatedDuration: T && b || null,
    velocity: (te) => /* @__PURE__ */ tn(V(te)),
    next: (te) => {
      if (!T && w < 1) {
        const J = Math.exp(-w * O * te), P = Math.sin(X * te), le = Math.cos(X * te), Z = d - J * (K * P + D * le), z = /* @__PURE__ */ tn(J * (ee * P + A * le));
        return h.done = Math.abs(z) <= s && Math.abs(d - Z) <= o, h.value = h.done ? d : Z, h;
      }
      const ce = L(te);
      if (T)
        h.done = te >= b;
      else {
        const J = /* @__PURE__ */ tn(V(te));
        h.done = Math.abs(J) <= s && Math.abs(d - ce) <= o;
      }
      return h.value = h.done ? d : ce, h;
    },
    toString: () => {
      const te = Math.min(Ah(Q), ou), ce = TS((J) => Q.next(te * J).value, te, 30);
      return te + "ms " + ce;
    },
    toTransition: () => {
    }
  };
  return Q;
}
uu.applyToOptions = (n) => {
  const a = HM(n, 100, uu);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ tn(a.duration), n.type = "keyframes", n;
};
const $M = 5;
function RS(n, a, l) {
  const s = Math.max(a - $M, 0);
  return aS(l - n(s), a - s);
}
function zd({ keyframes: n, velocity: a = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: d, min: h, max: p, restDelta: m = 0.5, restSpeed: y }) {
  const b = n[0], S = {
    done: !1,
    value: b
  }, T = (A) => h !== void 0 && A < h || p !== void 0 && A > p, R = (A) => h === void 0 ? p : p === void 0 || Math.abs(h - A) < Math.abs(p - A) ? h : p;
  let w = l * a;
  const D = b + w, O = d === void 0 ? D : d(D);
  O !== D && (w = O - b);
  const B = (A) => -w * Math.exp(-A / s), L = (A) => O + B(A), V = (A) => {
    const Q = B(A), te = L(A);
    S.done = Math.abs(Q) <= m, S.value = S.done ? O : te;
  };
  let X, K;
  const ee = (A) => {
    T(S.value) && (X = A, K = uu({
      keyframes: [S.value, R(S.value)],
      velocity: RS(L, A, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: m,
      restSpeed: y
    }));
  };
  return ee(0), {
    calculatedDuration: null,
    next: (A) => {
      let Q = !1;
      return !K && X === void 0 && (Q = !0, V(A), ee(A)), X !== void 0 && A >= X ? K.next(A - X) : (!Q && V(A), S);
    }
  };
}
function XM(n, a, l) {
  const s = [], o = l || li.mix || ES, c = n.length - 1;
  for (let d = 0; d < c; d++) {
    let h = o(n[d], n[d + 1]);
    if (a) {
      const p = Array.isArray(a) ? a[d] || Rn : a;
      h = cs(p, h);
    }
    s.push(h);
  }
  return s;
}
function KM(n, a, { clamp: l = !0, ease: s, mixer: o } = {}) {
  const c = n.length;
  if (Bi(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const d = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const h = XM(a, s, o), p = h.length, m = (y) => {
    if (d && y < n[0])
      return a[0];
    let b = 0;
    if (p > 1)
      for (; b < n.length - 2 && !(y < n[b + 1]); b++)
        ;
    const S = /* @__PURE__ */ Wr(n[b], n[b + 1], y);
    return h[b](S);
  };
  return l ? (y) => m(Qn(n[0], n[c - 1], y)) : m;
}
function QM(n, a) {
  const l = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ Wr(0, a, s);
    n.push(rt(l, 1, o));
  }
}
function IM(n) {
  const a = [0];
  return QM(a, n.length - 1), a;
}
function ZM(n, a) {
  return n.map((l) => l * a);
}
function JM(n, a) {
  return n.map(() => a || dS).splice(0, n.length - 1);
}
function Xr({ duration: n = 300, keyframes: a, times: l, ease: s = "easeInOut" }) {
  const o = sM(s) ? s.map(xv) : xv(s), c = {
    done: !1,
    value: a[0]
  }, d = ZM(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === a.length ? l : IM(a),
    n
  ), h = KM(d, a, {
    ease: Array.isArray(o) ? o : JM(a, o)
  });
  return {
    calculatedDuration: n,
    next: (p) => (c.value = h(p), c.done = p >= n, c)
  };
}
const WM = (n) => n !== null;
function Tu(n, { repeat: a, repeatType: l = "loop" }, s, o = 1) {
  const c = n.filter(WM), h = o < 0 || a && l !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const eA = {
  decay: zd,
  inertia: zd,
  tween: Xr,
  keyframes: Xr,
  spring: uu
};
function wS(n) {
  typeof n.type == "string" && (n.type = eA[n.type]);
}
class jh {
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
const tA = (n) => n / 100;
class cu extends jh {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: l } = this.options;
      l && l.updatedAt !== $t.now() && this.tick($t.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    wS(a);
    const { type: l = Xr, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: d = 0 } = a;
    let { keyframes: h } = a;
    const p = l || Xr;
    p !== Xr && typeof h[0] != "number" && (this.mixKeyframes = cs(tA, ES(h[0], h[1])), h = [0, 100]);
    const m = p({ ...a, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = p({
      ...a,
      keyframes: [...h].reverse(),
      velocity: -d
    })), m.calculatedDuration === null && (m.calculatedDuration = Ah(m));
    const { calculatedDuration: y } = m;
    this.calculatedDuration = y, this.resolvedDuration = y + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = m;
  }
  updateTime(a) {
    const l = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = l;
  }
  tick(a, l = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: c, mirroredGenerator: d, resolvedDuration: h, calculatedDuration: p } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: m = 0, keyframes: y, repeat: b, repeatType: S, repeatDelay: T, type: R, onUpdate: w, finalKeyframe: D } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), l ? this.currentTime = a : this.updateTime(a);
    const O = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), B = this.playbackSpeed >= 0 ? O < 0 : O > o;
    this.currentTime = Math.max(O, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let L = this.currentTime, V = s;
    if (b) {
      const A = Math.min(this.currentTime, o) / h;
      let Q = Math.floor(A), te = A % 1;
      !te && A >= 1 && (te = 1), te === 1 && Q--, Q = Math.min(Q, b + 1), !!(Q % 2) && (S === "reverse" ? (te = 1 - te, T && (te -= T / h)) : S === "mirror" && (V = d)), L = Qn(0, 1, te) * h;
    }
    let X;
    B ? (this.delayState.value = y[0], X = this.delayState) : X = V.next(L), c && !B && (X.value = c(X.value));
    let { done: K } = X;
    !B && p !== null && (K = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ee = this.holdTime === null && (this.state === "finished" || this.state === "running" && K);
    return ee && R !== zd && (X.value = Tu(y, this.options, D, this.speed)), w && w(X.value), ee && this.finish(), X;
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
    return /* @__PURE__ */ En(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ En(a);
  }
  get time() {
    return /* @__PURE__ */ En(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ tn(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    return RS((s) => this.generator.next(s).value, a, l);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const l = this.playbackSpeed !== a;
    l && this.driver && this.updateTime($t.now()), this.playbackSpeed = a, l && this.driver && (this.time = /* @__PURE__ */ En(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = BM, startTime: l } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = l ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime($t.now()), this.holdTime = this.currentTime;
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
function nA(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Li = (n) => n * 180 / Math.PI, Od = (n) => {
  const a = Li(Math.atan2(n[1], n[0]));
  return _d(a);
}, aA = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Od,
  rotateZ: Od,
  skewX: (n) => Li(Math.atan(n[1])),
  skewY: (n) => Li(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, _d = (n) => (n = n % 360, n < 0 && (n += 360), n), Av = Od, jv = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), Dv = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), iA = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: jv,
  scaleY: Dv,
  scale: (n) => (jv(n) + Dv(n)) / 2,
  rotateX: (n) => _d(Li(Math.atan2(n[6], n[5]))),
  rotateY: (n) => _d(Li(Math.atan2(-n[2], n[0]))),
  rotateZ: Av,
  rotate: Av,
  skewX: (n) => Li(Math.atan(n[4])),
  skewY: (n) => Li(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function Ld(n) {
  return n.includes("scale") ? 1 : 0;
}
function Ud(n, a) {
  if (!n || n === "none")
    return Ld(a);
  const l = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (l)
    s = iA, o = l;
  else {
    const h = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = aA, o = h;
  }
  if (!o)
    return Ld(a);
  const c = s[a], d = o[1].split(",").map(rA);
  return typeof c == "function" ? c(d) : d[c];
}
const lA = (n, a) => {
  const { transform: l = "none" } = getComputedStyle(n);
  return Ud(l, a);
};
function rA(n) {
  return parseFloat(n.trim());
}
const Hl = [
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
], ql = new Set(Hl), Nv = (n) => n === Bl || n === ye, sA = /* @__PURE__ */ new Set(["x", "y", "z"]), oA = Hl.filter((n) => !sA.has(n));
function uA(n) {
  const a = [];
  return oA.forEach((l) => {
    const s = n.getValue(l);
    s !== void 0 && (a.push([l, s.get()]), s.set(l.startsWith("scale") ? 1 : 0));
  }), a;
}
const ai = {
  // Dimensions
  width: ({ x: n }, { paddingLeft: a = "0", paddingRight: l = "0", boxSizing: s }) => {
    const o = n.max - n.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(l);
  },
  height: ({ y: n }, { paddingTop: a = "0", paddingBottom: l = "0", boxSizing: s }) => {
    const o = n.max - n.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(l);
  },
  top: (n, { top: a }) => parseFloat(a),
  left: (n, { left: a }) => parseFloat(a),
  bottom: ({ y: n }, { top: a }) => parseFloat(a) + (n.max - n.min),
  right: ({ x: n }, { left: a }) => parseFloat(a) + (n.max - n.min),
  // Transform
  x: (n, { transform: a }) => Ud(a, "x"),
  y: (n, { transform: a }) => Ud(a, "y")
};
ai.translateX = ai.x;
ai.translateY = ai.y;
const Ui = /* @__PURE__ */ new Set();
let Vd = !1, Bd = !1, Hd = !1;
function CS() {
  if (Bd) {
    const n = Array.from(Ui).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = uA(s);
      o.length && (l.set(s, o), s.render());
    }), n.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = l.get(s);
      o && o.forEach(([c, d]) => {
        s.getValue(c)?.set(d);
      });
    }), n.forEach((s) => s.measureEndState()), n.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Bd = !1, Vd = !1, Ui.forEach((n) => n.complete(Hd)), Ui.clear();
}
function MS() {
  Ui.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Bd = !0);
  });
}
function cA() {
  Hd = !0, MS(), CS(), Hd = !1;
}
class Dh {
  constructor(a, l, s, o, c, d = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = l, this.name = s, this.motionValue = o, this.element = c, this.isAsync = d;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Ui.add(this), Vd || (Vd = !0, tt.read(MS), tt.resolveKeyframes(CS))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: l, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const c = o?.get(), d = a[a.length - 1];
      if (c !== void 0)
        a[0] = c;
      else if (s && l) {
        const h = s.readValue(l, d);
        h != null && (a[0] = h);
      }
      a[0] === void 0 && (a[0] = d), o && c === void 0 && o.set(a[0]);
    }
    nA(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Ui.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Ui.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const fA = (n) => n.startsWith("--");
function AS(n, a, l) {
  fA(a) ? n.style.setProperty(a, l) : n.style[a] = l;
}
const dA = {};
function jS(n, a) {
  const l = /* @__PURE__ */ nS(n);
  return () => dA[a] ?? l();
}
const hA = /* @__PURE__ */ jS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), DS = /* @__PURE__ */ jS(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Gr = ([n, a, l, s]) => `cubic-bezier(${n}, ${a}, ${l}, ${s})`, zv = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Gr([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Gr([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Gr([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Gr([0.33, 1.53, 0.69, 0.99])
};
function NS(n, a) {
  if (n)
    return typeof n == "function" ? DS() ? TS(n, a) : "ease-out" : hS(n) ? Gr(n) : Array.isArray(n) ? n.map((l) => NS(l, a) || zv.easeOut) : zv[n];
}
function mA(n, a, l, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: d = "loop", ease: h = "easeOut", times: p } = {}, m = void 0) {
  const y = {
    [a]: l
  };
  p && (y.offset = p);
  const b = NS(h, o);
  Array.isArray(b) && (y.easing = b);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(b) ? "linear" : b,
    fill: "both",
    iterations: c + 1,
    direction: d === "reverse" ? "alternate" : "normal"
  };
  return m && (S.pseudoElement = m), n.animate(y, S);
}
function zS(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function pA({ type: n, ...a }) {
  return zS(n) && DS() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class OS extends jh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: l, name: s, keyframes: o, pseudoElement: c, allowFlatten: d = !1, finalKeyframe: h, onComplete: p } = a;
    this.isPseudoElement = !!c, this.allowFlatten = d, this.options = a, Bi(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = pA(a);
    this.animation = mA(l, s, o, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const y = Tu(o, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(y), AS(l, s, y), this.animation.cancel();
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
    return /* @__PURE__ */ En(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ En(a);
  }
  get time() {
    return /* @__PURE__ */ En(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const l = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ tn(a), l && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && hA() ? (this.animation.timeline = a, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), Rn) : o(this);
  }
}
const _S = {
  anticipate: uS,
  backInOut: oS,
  circInOut: fS
};
function yA(n) {
  return n in _S;
}
function gA(n) {
  typeof n.ease == "string" && yA(n.ease) && (n.ease = _S[n.ease]);
}
const id = 10;
class vA extends OS {
  constructor(a) {
    gA(a), wS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: l, onUpdate: s, onComplete: o, element: c, ...d } = this.options;
    if (!l)
      return;
    if (a !== void 0) {
      l.set(a);
      return;
    }
    const h = new cu({
      ...d,
      autoplay: !1
    }), p = Math.max(id, $t.now() - this.startTime), m = Qn(0, id, p - id), y = h.sample(p).value, { name: b } = this.options;
    c && b && AS(c, b, y), l.setWithVelocity(h.sample(Math.max(0, p - m)).value, y, m), h.stop();
  }
}
const Ov = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(Ln.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function bA(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let l = 0; l < n.length; l++)
    if (n[l] !== a)
      return !0;
}
function SA(n, a, l, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = n[n.length - 1], d = Ov(o, a), h = Ov(c, a);
  return us(d === h, `You are trying to animate ${a} from "${o}" to "${c}". "${d ? c : o}" is not an animatable value.`, "value-not-animatable"), !d || !h ? !1 : bA(n) || (l === "spring" || zS(l)) && s;
}
function qd(n) {
  n.duration = 0, n.type = "keyframes";
}
const LS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), xA = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function EA(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && xA.test(n[a]))
      return !0;
  return !1;
}
const TA = /* @__PURE__ */ new Set([
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
]), RA = /* @__PURE__ */ nS(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function wA(n) {
  const { motionValue: a, name: l, repeatDelay: s, repeatType: o, damping: c, type: d, keyframes: h } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: y } = a.owner.getProps();
  return RA() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (LS.has(l) || TA.has(l) && EA(h)) && (l !== "transform" || !y) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && c !== 0 && d !== "inertia";
}
const CA = 40;
class MA extends jh {
  constructor({ autoplay: a = !0, delay: l = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: d = "loop", keyframes: h, name: p, motionValue: m, element: y, ...b }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = $t.now();
    const S = {
      autoplay: a,
      delay: l,
      type: s,
      repeat: o,
      repeatDelay: c,
      repeatType: d,
      name: p,
      motionValue: m,
      element: y,
      ...b
    }, T = y?.KeyframeResolver || Dh;
    this.keyframeResolver = new T(h, (R, w, D) => this.onKeyframesResolved(R, w, S, !D), p, m, y), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, l, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: d, velocity: h, delay: p, isHandoff: m, onUpdate: y } = s;
    this.resolvedAt = $t.now();
    let b = !0;
    SA(a, c, d, h) || (b = !1, (li.instantAnimations || !p) && y?.(Tu(a, s, l)), a[0] = a[a.length - 1], qd(s), s.repeat = 0);
    const T = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > CA ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: a
    }, R = b && !m && wA(T), w = T.motionValue?.owner?.current;
    let D;
    if (R)
      try {
        D = new vA({
          ...T,
          element: w
        });
      } catch {
        D = new cu(T);
      }
    else
      D = new cu(T);
    D.finished.then(() => {
      this.notifyFinished();
    }).catch(Rn), this.pendingTimeline && (this.stopTimeline = D.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = D;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, l) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), cA()), this._animation;
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
function US(n, a, l, s = 0, o = 1) {
  const c = Array.from(n).sort((m, y) => m.sortNodePosition(y)).indexOf(a), d = n.size, h = (d - 1) * s;
  return typeof l == "function" ? l(c, d) : o === 1 ? c * s : h - c * s;
}
const AA = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function jA(n) {
  const a = AA.exec(n);
  if (!a)
    return [,];
  const [, l, s, o] = a;
  return [`--${l ?? s}`, o];
}
const DA = 4;
function VS(n, a, l = 1) {
  Bi(l <= DA, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = jA(n);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const d = c.trim();
    return Wb(d) ? parseFloat(d) : d;
  }
  return Rh(o) ? VS(o, a, l + 1) : o;
}
const NA = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, zA = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), OA = {
  type: "keyframes",
  duration: 0.8
}, _A = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, LA = (n, { keyframes: a }) => a.length > 2 ? OA : ql.has(n) ? n.startsWith("scale") ? zA(a[1]) : NA : _A;
function BS(n, a) {
  if (n?.inherit && a) {
    const { inherit: l, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function Nh(n, a) {
  const l = n?.[a] ?? n?.default ?? n;
  return l !== n ? BS(l, n) : l;
}
const UA = /* @__PURE__ */ new Set([
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
function VA(n) {
  for (const a in n)
    if (!UA.has(a))
      return !0;
  return !1;
}
const zh = (n, a, l, s = {}, o, c) => (d) => {
  const h = Nh(s, n) || {}, p = h.delay || s.delay || 0;
  let { elapsed: m = 0 } = s;
  m = m - /* @__PURE__ */ tn(p);
  const y = {
    keyframes: Array.isArray(l) ? l : [null, l],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...h,
    delay: -m,
    onUpdate: (S) => {
      a.set(S), h.onUpdate && h.onUpdate(S);
    },
    onComplete: () => {
      d(), h.onComplete && h.onComplete();
    },
    name: n,
    motionValue: a,
    element: c ? void 0 : o
  };
  VA(h) || Object.assign(y, LA(n, y)), y.duration && (y.duration = /* @__PURE__ */ tn(y.duration)), y.repeatDelay && (y.repeatDelay = /* @__PURE__ */ tn(y.repeatDelay)), y.from !== void 0 && (y.keyframes[0] = y.from);
  let b = !1;
  if ((y.type === !1 || y.duration === 0 && !y.repeatDelay) && (qd(y), y.delay === 0 && (b = !0)), (li.instantAnimations || li.skipAnimations || o?.shouldSkipAnimations) && (b = !0, qd(y), y.delay = 0), y.allowFlatten = !h.type && !h.ease, b && !c && a.get() !== void 0) {
    const S = Tu(y.keyframes, h);
    if (S !== void 0) {
      tt.update(() => {
        y.onUpdate(S), y.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new cu(y) : new MA(y);
};
function _v(n) {
  const a = [{}, {}];
  return n?.values.forEach((l, s) => {
    a[0][s] = l.get(), a[1][s] = l.getVelocity();
  }), a;
}
function Oh(n, a, l, s) {
  if (typeof a == "function") {
    const [o, c] = _v(s);
    a = a(l !== void 0 ? l : n.custom, o, c);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, c] = _v(s);
    a = a(l !== void 0 ? l : n.custom, o, c);
  }
  return a;
}
function Vi(n, a, l) {
  const s = n.getProps();
  return Oh(s, a, l !== void 0 ? l : s.custom, n);
}
const HS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Hl
]), Lv = 30, BA = (n) => !isNaN(parseFloat(n));
class HA {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, l = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = $t.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = l.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = $t.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = BA(this.current));
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
    this.events[a] || (this.events[a] = new xh());
    const s = this.events[a].add(l);
    return a === "change" ? () => {
      s(), tt.read(() => {
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
    const a = $t.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > Lv)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, Lv);
    return aS(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
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
function Ul(n, a) {
  return new HA(n, a);
}
const kd = (n) => Array.isArray(n);
function qA(n, a, l) {
  n.hasValue(a) ? n.getValue(a).set(l) : n.addValue(a, Ul(l));
}
function kA(n) {
  return kd(n) ? n[n.length - 1] || 0 : n;
}
function PA(n, a) {
  const l = Vi(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const d in c) {
    const h = kA(c[d]);
    qA(n, d, h);
  }
}
const Vt = (n) => !!(n && n.getVelocity);
function YA(n) {
  return !!(Vt(n) && n.add);
}
function Pd(n, a) {
  const l = n.getValue("willChange");
  if (YA(l))
    return l.add(a);
  if (!l && li.WillChange) {
    const s = new li.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function _h(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const GA = "framerAppearId", qS = "data-" + _h(GA);
function kS(n) {
  return n.props[qS];
}
function FA({ protectedKeys: n, needsAnimating: a }, l) {
  const s = n.hasOwnProperty(l) && a[l] !== !0;
  return a[l] = !1, s;
}
function PS(n, a, { delay: l = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: d, ...h } = a;
  const p = n.getDefaultTransition();
  c = c ? BS(c, p) : p;
  const m = c?.reduceMotion;
  s && (c = s);
  const y = [], b = o && n.animationState && n.animationState.getState()[o];
  for (const S in h) {
    const T = n.getValue(S, n.latestValues[S] ?? null), R = h[S];
    if (R === void 0 || b && FA(b, S))
      continue;
    const w = {
      delay: l,
      ...Nh(c || {}, S)
    }, D = T.get();
    if (D !== void 0 && !T.isAnimating() && !Array.isArray(R) && R === D && !w.velocity) {
      tt.update(() => T.set(R));
      continue;
    }
    let O = !1;
    if (window.MotionHandoffAnimation) {
      const V = kS(n);
      if (V) {
        const X = window.MotionHandoffAnimation(V, S, tt);
        X !== null && (w.startTime = X, O = !0);
      }
    }
    Pd(n, S);
    const B = m ?? n.shouldReduceMotion;
    T.start(zh(S, T, R, B && HS.has(S) ? { type: !1 } : w, n, O));
    const L = T.animation;
    L && y.push(L);
  }
  if (d) {
    const S = () => tt.update(() => {
      d && PA(n, d);
    });
    y.length ? Promise.all(y).then(S) : S();
  }
  return y;
}
function Yd(n, a, l = {}) {
  const s = Vi(n, a, l.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (o = l.transitionOverride);
  const c = s ? () => Promise.all(PS(n, s, l)) : () => Promise.resolve(), d = n.variantChildren && n.variantChildren.size ? (p = 0) => {
    const { delayChildren: m = 0, staggerChildren: y, staggerDirection: b } = o;
    return $A(n, a, p, m, y, b, l);
  } : () => Promise.resolve(), { when: h } = o;
  if (h) {
    const [p, m] = h === "beforeChildren" ? [c, d] : [d, c];
    return p().then(() => m());
  } else
    return Promise.all([c(), d(l.delay)]);
}
function $A(n, a, l = 0, s = 0, o = 0, c = 1, d) {
  const h = [];
  for (const p of n.variantChildren)
    p.notify("AnimationStart", a), h.push(Yd(p, a, {
      ...d,
      delay: l + (typeof s == "function" ? 0 : s) + US(n.variantChildren, p, s, o, c)
    }).then(() => p.notify("AnimationComplete", a)));
  return Promise.all(h);
}
function XA(n, a, l = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => Yd(n, c, l));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = Yd(n, a, l);
  else {
    const o = typeof a == "function" ? Vi(n, a, l.custom) : a;
    s = Promise.all(PS(n, o, l));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const KA = {
  test: (n) => n === "auto",
  parse: (n) => n
}, YS = (n) => (a) => a.test(n), GS = [Bl, ye, Xn, Ja, bM, vM, KA], Uv = (n) => GS.find(YS(n));
function QA(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || tS(n) : !0;
}
const IA = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function ZA(n) {
  const [a, l] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = l.match(wh) || [];
  if (!s)
    return n;
  const o = l.replace(s, "");
  let c = IA.has(a) ? 1 : 0;
  return s !== l && (c *= 100), a + "(" + c + o + ")";
}
const JA = /\b([a-z-]*)\(.*?\)/gu, Gd = {
  ...Ln,
  getAnimatableNone: (n) => {
    const a = n.match(JA);
    return a ? a.map(ZA).join(" ") : n;
  }
}, Fd = {
  ...Ln,
  getAnimatableNone: (n) => {
    const a = Ln.parse(n);
    return Ln.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, Vv = {
  ...Bl,
  transform: Math.round
}, WA = {
  rotate: Ja,
  rotateX: Ja,
  rotateY: Ja,
  rotateZ: Ja,
  scale: Uo,
  scaleX: Uo,
  scaleY: Uo,
  scaleZ: Uo,
  skew: Ja,
  skewX: Ja,
  skewY: Ja,
  distance: ye,
  translateX: ye,
  translateY: ye,
  translateZ: ye,
  x: ye,
  y: ye,
  z: ye,
  perspective: ye,
  transformPerspective: ye,
  opacity: es,
  originX: Tv,
  originY: Tv,
  originZ: ye
}, Lh = {
  // Border props
  borderWidth: ye,
  borderTopWidth: ye,
  borderRightWidth: ye,
  borderBottomWidth: ye,
  borderLeftWidth: ye,
  borderRadius: ye,
  borderTopLeftRadius: ye,
  borderTopRightRadius: ye,
  borderBottomRightRadius: ye,
  borderBottomLeftRadius: ye,
  // Positioning props
  width: ye,
  maxWidth: ye,
  height: ye,
  maxHeight: ye,
  top: ye,
  right: ye,
  bottom: ye,
  left: ye,
  inset: ye,
  insetBlock: ye,
  insetBlockStart: ye,
  insetBlockEnd: ye,
  insetInline: ye,
  insetInlineStart: ye,
  insetInlineEnd: ye,
  // Spacing props
  padding: ye,
  paddingTop: ye,
  paddingRight: ye,
  paddingBottom: ye,
  paddingLeft: ye,
  paddingBlock: ye,
  paddingBlockStart: ye,
  paddingBlockEnd: ye,
  paddingInline: ye,
  paddingInlineStart: ye,
  paddingInlineEnd: ye,
  margin: ye,
  marginTop: ye,
  marginRight: ye,
  marginBottom: ye,
  marginLeft: ye,
  marginBlock: ye,
  marginBlockStart: ye,
  marginBlockEnd: ye,
  marginInline: ye,
  marginInlineStart: ye,
  marginInlineEnd: ye,
  // Typography
  fontSize: ye,
  // Misc
  backgroundPositionX: ye,
  backgroundPositionY: ye,
  ...WA,
  zIndex: Vv,
  // SVG
  fillOpacity: es,
  strokeOpacity: es,
  numOctaves: Vv
}, ej = {
  ...Lh,
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
  filter: Gd,
  WebkitFilter: Gd,
  mask: Fd,
  WebkitMask: Fd
}, FS = (n) => ej[n], tj = /* @__PURE__ */ new Set([Gd, Fd]);
function $S(n, a) {
  let l = FS(n);
  return tj.has(l) || (l = Ln), l.getAnimatableNone ? l.getAnimatableNone(a) : void 0;
}
const nj = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function aj(n, a, l) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const c = n[s];
    typeof c == "string" && !nj.has(c) && Ll(c).values.length && (o = n[s]), s++;
  }
  if (o && l)
    for (const c of a)
      n[c] = $S(l, o);
}
class ij extends Dh {
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
      if (typeof b == "string" && (b = b.trim(), Rh(b))) {
        const S = VS(b, l.current);
        S !== void 0 && (a[y] = S), y === a.length - 1 && (this.finalKeyframe = b);
      }
    }
    if (this.resolveNoneKeyframes(), !HS.has(s) || a.length !== 2)
      return;
    const [o, c] = a, d = Uv(o), h = Uv(c), p = Ev(o), m = Ev(c);
    if (p !== m && ai[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (d !== h)
      if (Nv(d) && Nv(h))
        for (let y = 0; y < a.length; y++) {
          const b = a[y];
          typeof b == "string" && (a[y] = parseFloat(b));
        }
      else ai[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: l } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || QA(a[o])) && s.push(o);
    s.length && aj(a, s, l);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: l, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = ai[s](a.measureViewportBox(), window.getComputedStyle(a.current)), l[0] = this.measuredOrigin;
    const o = l[l.length - 1];
    o !== void 0 && a.getValue(s, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: l, unresolvedKeyframes: s } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(l);
    o && o.jump(this.measuredOrigin, !1);
    const c = s.length - 1, d = s[c];
    s[c] = ai[l](a.measureViewportBox(), window.getComputedStyle(a.current)), d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d), this.removedTransforms?.length && this.removedTransforms.forEach(([h, p]) => {
      a.getValue(h).set(p);
    }), this.resolveNoneKeyframes();
  }
}
function XS(n, a, l) {
  if (n == null)
    return [];
  if (n instanceof EventTarget)
    return [n];
  if (typeof n == "string") {
    let s = document;
    const o = l?.[n] ?? s.querySelectorAll(n);
    return o ? Array.from(o) : [];
  }
  return Array.from(n).filter((s) => s != null);
}
const KS = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function Ko(n) {
  return eS(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Uh } = /* @__PURE__ */ mS(queueMicrotask, !1), _n = {
  x: !1,
  y: !1
};
function QS() {
  return _n.x || _n.y;
}
function lj(n) {
  return n === "x" || n === "y" ? _n[n] ? null : (_n[n] = !0, () => {
    _n[n] = !1;
  }) : _n.x || _n.y ? null : (_n.x = _n.y = !0, () => {
    _n.x = _n.y = !1;
  });
}
function IS(n, a) {
  const l = XS(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [l, o, () => s.abort()];
}
function rj(n) {
  return !(n.pointerType === "touch" || QS());
}
function sj(n, a, l = {}) {
  const [s, o, c] = IS(n, l);
  return s.forEach((d) => {
    let h = !1, p = !1, m;
    const y = () => {
      d.removeEventListener("pointerleave", R);
    }, b = (D) => {
      m && (m(D), m = void 0), y();
    }, S = (D) => {
      h = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), p && (p = !1, b(D));
    }, T = () => {
      h = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, R = (D) => {
      if (D.pointerType !== "touch") {
        if (h) {
          p = !0;
          return;
        }
        b(D);
      }
    }, w = (D) => {
      if (!rj(D))
        return;
      p = !1;
      const O = a(d, D);
      typeof O == "function" && (m = O, d.addEventListener("pointerleave", R, o));
    };
    d.addEventListener("pointerenter", w, o), d.addEventListener("pointerdown", T, o);
  }), c;
}
const ZS = (n, a) => a ? n === a ? !0 : ZS(n, a.parentElement) : !1, Vh = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, oj = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function uj(n) {
  return oj.has(n.tagName) || n.isContentEditable === !0;
}
const cj = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function fj(n) {
  return cj.has(n.tagName) || n.isContentEditable === !0;
}
const Qo = /* @__PURE__ */ new WeakSet();
function Bv(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function ld(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const dj = (n, a) => {
  const l = n.currentTarget;
  if (!l)
    return;
  const s = Bv(() => {
    if (Qo.has(l))
      return;
    ld(l, "down");
    const o = Bv(() => {
      ld(l, "up");
    }), c = () => ld(l, "cancel");
    l.addEventListener("keyup", o, a), l.addEventListener("blur", c, a);
  });
  l.addEventListener("keydown", s, a), l.addEventListener("blur", () => l.removeEventListener("keydown", s), a);
};
function Hv(n) {
  return Vh(n) && !QS();
}
const qv = /* @__PURE__ */ new WeakSet();
function hj(n, a, l = {}) {
  const [s, o, c] = IS(n, l), d = (h) => {
    const p = h.currentTarget;
    if (!Hv(h) || qv.has(h))
      return;
    Qo.add(p), l.stopPropagation && qv.add(h);
    const m = a(p, h), y = (T, R) => {
      window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", S), Qo.has(p) && Qo.delete(p), Hv(T) && typeof m == "function" && m(T, { success: R });
    }, b = (T) => {
      y(T, p === window || p === document || l.useGlobalTarget || ZS(p, T.target));
    }, S = (T) => {
      y(T, !1);
    };
    window.addEventListener("pointerup", b, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", d, o), Ko(h) && (h.addEventListener("focus", (m) => dj(m, o)), !uj(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function Bh(n) {
  return eS(n) && "ownerSVGElement" in n;
}
const Io = /* @__PURE__ */ new WeakMap();
let Zo;
const JS = (n, a, l) => (s, o) => o && o[0] ? o[0][n + "Size"] : Bh(s) && "getBBox" in s ? s.getBBox()[a] : s[l], mj = /* @__PURE__ */ JS("inline", "width", "offsetWidth"), pj = /* @__PURE__ */ JS("block", "height", "offsetHeight");
function yj({ target: n, borderBoxSize: a }) {
  Io.get(n)?.forEach((l) => {
    l(n, {
      get width() {
        return mj(n, a);
      },
      get height() {
        return pj(n, a);
      }
    });
  });
}
function gj(n) {
  n.forEach(yj);
}
function vj() {
  typeof ResizeObserver > "u" || (Zo = new ResizeObserver(gj));
}
function bj(n, a) {
  Zo || vj();
  const l = XS(n);
  return l.forEach((s) => {
    let o = Io.get(s);
    o || (o = /* @__PURE__ */ new Set(), Io.set(s, o)), o.add(a), Zo?.observe(s);
  }), () => {
    l.forEach((s) => {
      const o = Io.get(s);
      o?.delete(a), o?.size || Zo?.unobserve(s);
    });
  };
}
const Jo = /* @__PURE__ */ new Set();
let Nl;
function Sj() {
  Nl = () => {
    const n = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Jo.forEach((a) => a(n));
  }, window.addEventListener("resize", Nl);
}
function xj(n) {
  return Jo.add(n), Nl || Sj(), () => {
    Jo.delete(n), !Jo.size && typeof Nl == "function" && (window.removeEventListener("resize", Nl), Nl = void 0);
  };
}
function kv(n, a) {
  return typeof n == "function" ? xj(n) : bj(n, a);
}
function Ej(n) {
  return Bh(n) && n.tagName === "svg";
}
const Tj = [...GS, Ct, Ln], Rj = (n) => Tj.find(YS(n)), Pv = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), zl = () => ({
  x: Pv(),
  y: Pv()
}), Yv = () => ({ min: 0, max: 0 }), At = () => ({
  x: Yv(),
  y: Yv()
}), wj = /* @__PURE__ */ new WeakMap();
function Ru(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function ts(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Hh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], qh = ["initial", ...Hh];
function wu(n) {
  return Ru(n.animate) || qh.some((a) => ts(n[a]));
}
function WS(n) {
  return !!(wu(n) || n.variants);
}
function Cj(n, a, l) {
  for (const s in a) {
    const o = a[s], c = l[s];
    if (Vt(o))
      n.addValue(s, o);
    else if (Vt(c))
      n.addValue(s, Ul(o, { owner: n }));
    else if (c !== o)
      if (n.hasValue(s)) {
        const d = n.getValue(s);
        d.liveStyle === !0 ? d.jump(o) : d.hasAnimated || d.set(o);
      } else {
        const d = n.getStaticValue(s);
        n.addValue(s, Ul(d !== void 0 ? d : o, { owner: n }));
      }
  }
  for (const s in l)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const fu = { current: null }, kh = { current: !1 }, Mj = typeof window < "u";
function e1() {
  if (kh.current = !0, !!Mj)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => fu.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      fu.current = !1;
}
const Gv = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let du = {};
function t1(n) {
  du = n;
}
function Aj() {
  return du;
}
class jj {
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
  constructor({ parent: a, props: l, presenceContext: s, reducedMotionConfig: o, skipAnimations: c, blockInitialAnimation: d, visualState: h }, p = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Dh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = $t.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, tt.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: y } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = l.initial ? { ...m } : {}, this.renderState = y, this.parent = a, this.props = l, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = p, this.blockInitialAnimation = !!d, this.isControllingVariants = wu(l), this.isVariantNode = WS(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: b, ...S } = this.scrapeMotionValuesFromProps(l, {}, this);
    for (const T in S) {
      const R = S[T];
      m[T] !== void 0 && Vt(R) && R.set(m[T]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const l in this.initialValues)
        this.values.get(l)?.jump(this.initialValues[l]), this.latestValues[l] = this.initialValues[l];
    this.current = a, wj.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (kh.current || e1(), this.shouldReduceMotion = fu.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), ri(this.notifyUpdate), ri(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), l.accelerate && LS.has(a) && this.current instanceof HTMLElement) {
      const { factory: d, keyframes: h, times: p, ease: m, duration: y } = l.accelerate, b = new OS({
        element: this.current,
        name: a,
        keyframes: h,
        times: p,
        ease: m,
        duration: /* @__PURE__ */ tn(y)
      }), S = d(b);
      this.valueSubscriptions.set(a, () => {
        S(), b.cancel();
      });
      return;
    }
    const s = ql.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = l.on("change", (d) => {
      this.latestValues[a] = d, this.props.onUpdate && tt.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (a in du) {
      const l = du[a];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : At();
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
    for (let s = 0; s < Gv.length; s++) {
      const o = Gv[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, d = a[c];
      d && (this.propEventSubscriptions[o] = this.on(o, d));
    }
    this.prevMotionValues = Cj(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && l !== void 0 && (s = Ul(l === null ? void 0 : l, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, l) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Wb(s) || tS(s)) ? s = parseFloat(s) : !Rj(s) && Ln.test(l) && (s = $S(a, l)), this.setBaseTarget(a, Vt(s) ? s.get() : s)), Vt(s) ? s.get() : s;
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
      const c = Oh(this.props, l, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (l && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !Vt(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, l) {
    return this.events[a] || (this.events[a] = new xh()), this.events[a].add(l);
  }
  notify(a, ...l) {
    this.events[a] && this.events[a].notify(...l);
  }
  scheduleRenderMicrotask() {
    Uh.render(this.render);
  }
}
class n1 extends jj {
  constructor() {
    super(...arguments), this.KeyframeResolver = ij;
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
    Vt(a) && (this.childSubscription = a.on("change", (l) => {
      this.current && (this.current.textContent = `${l}`);
    }));
  }
}
class si {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function a1({ top: n, left: a, right: l, bottom: s }) {
  return {
    x: { min: a, max: l },
    y: { min: n, max: s }
  };
}
function Dj({ x: n, y: a }) {
  return { top: a.min, right: n.max, bottom: a.max, left: n.min };
}
function Nj(n, a) {
  if (!a)
    return n;
  const l = a({ x: n.left, y: n.top }), s = a({ x: n.right, y: n.bottom });
  return {
    top: l.y,
    left: l.x,
    bottom: s.y,
    right: s.x
  };
}
function rd(n) {
  return n === void 0 || n === 1;
}
function $d({ scale: n, scaleX: a, scaleY: l }) {
  return !rd(n) || !rd(a) || !rd(l);
}
function zi(n) {
  return $d(n) || i1(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function i1(n) {
  return Fv(n.x) || Fv(n.y);
}
function Fv(n) {
  return n && n !== "0%";
}
function hu(n, a, l) {
  const s = n - l, o = a * s;
  return l + o;
}
function $v(n, a, l, s, o) {
  return o !== void 0 && (n = hu(n, o, s)), hu(n, l, s) + a;
}
function Xd(n, a = 0, l = 1, s, o) {
  n.min = $v(n.min, a, l, s, o), n.max = $v(n.max, a, l, s, o);
}
function l1(n, { x: a, y: l }) {
  Xd(n.x, a.translate, a.scale, a.originPoint), Xd(n.y, l.translate, l.scale, l.originPoint);
}
const Xv = 0.999999999999, Kv = 1.0000000000001;
function zj(n, a, l, s = !1) {
  const o = l.length;
  if (!o)
    return;
  a.x = a.y = 1;
  let c, d;
  for (let h = 0; h < o; h++) {
    c = l[h], d = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && ($n(n.x, -c.scroll.offset.x), $n(n.y, -c.scroll.offset.y)), d && (a.x *= d.x.scale, a.y *= d.y.scale, l1(n, d)), s && zi(c.latestValues) && Wo(n, c.latestValues, c.layout?.layoutBox));
  }
  a.x < Kv && a.x > Xv && (a.x = 1), a.y < Kv && a.y > Xv && (a.y = 1);
}
function $n(n, a) {
  n.min += a, n.max += a;
}
function Qv(n, a, l, s, o = 0.5) {
  const c = rt(n.min, n.max, o);
  Xd(n, a, l, c, s);
}
function Iv(n, a) {
  return typeof n == "string" ? parseFloat(n) / 100 * (a.max - a.min) : n;
}
function Wo(n, a, l) {
  const s = l ?? n;
  Qv(n.x, Iv(a.x, s.x), a.scaleX, a.scale, a.originX), Qv(n.y, Iv(a.y, s.y), a.scaleY, a.scale, a.originY);
}
function r1(n, a) {
  return a1(Nj(n.getBoundingClientRect(), a));
}
function Oj(n, a, l) {
  const s = r1(n, l), { scroll: o } = a;
  return o && ($n(s.x, o.offset.x), $n(s.y, o.offset.y)), s;
}
const _j = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Lj = Hl.length;
function Uj(n, a, l) {
  let s = "", o = !0;
  for (let c = 0; c < Lj; c++) {
    const d = Hl[c], h = n[d];
    if (h === void 0)
      continue;
    let p = !0;
    if (typeof h == "number")
      p = h === (d.startsWith("scale") ? 1 : 0);
    else {
      const m = parseFloat(h);
      p = d.startsWith("scale") ? m === 1 : m === 0;
    }
    if (!p || l) {
      const m = KS(h, Lh[d]);
      if (!p) {
        o = !1;
        const y = _j[d] || d;
        s += `${y}(${m}) `;
      }
      l && (a[d] = m);
    }
  }
  return s = s.trim(), l ? s = l(a, o ? "" : s) : o && (s = "none"), s;
}
function Ph(n, a, l) {
  const { style: s, vars: o, transformOrigin: c } = n;
  let d = !1, h = !1;
  for (const p in a) {
    const m = a[p];
    if (ql.has(p)) {
      d = !0;
      continue;
    } else if (yS(p)) {
      o[p] = m;
      continue;
    } else {
      const y = KS(m, Lh[p]);
      p.startsWith("origin") ? (h = !0, c[p] = y) : s[p] = y;
    }
  }
  if (a.transform || (d || l ? s.transform = Uj(a, n.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: p = "50%", originY: m = "50%", originZ: y = 0 } = c;
    s.transformOrigin = `${p} ${m} ${y}`;
  }
}
function s1(n, { style: a, vars: l }, s, o) {
  const c = n.style;
  let d;
  for (d in a)
    c[d] = a[d];
  o?.applyProjectionStyles(c, s);
  for (d in l)
    c.setProperty(d, l[d]);
}
function Zv(n, a) {
  return a.max === a.min ? 0 : n / (a.max - a.min) * 100;
}
const Hr = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (ye.test(n))
        n = parseFloat(n);
      else
        return n;
    const l = Zv(n, a.target.x), s = Zv(n, a.target.y);
    return `${l}% ${s}%`;
  }
}, Vj = {
  correct: (n, { treeScale: a, projectionDelta: l }) => {
    const s = n, o = Ln.parse(n);
    if (o.length > 5)
      return s;
    const c = Ln.createTransformer(n), d = typeof o[0] != "number" ? 1 : 0, h = l.x.scale * a.x, p = l.y.scale * a.y;
    o[0 + d] /= h, o[1 + d] /= p;
    const m = rt(h, p, 0.5);
    return typeof o[2 + d] == "number" && (o[2 + d] /= m), typeof o[3 + d] == "number" && (o[3 + d] /= m), c(o);
  }
}, Kd = {
  borderRadius: {
    ...Hr,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Hr,
  borderTopRightRadius: Hr,
  borderBottomLeftRadius: Hr,
  borderBottomRightRadius: Hr,
  boxShadow: Vj
};
function o1(n, { layout: a, layoutId: l }) {
  return ql.has(n) || n.startsWith("origin") || (a || l !== void 0) && (!!Kd[n] || n === "opacity");
}
function Yh(n, a, l) {
  const s = n.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const d in s)
    (Vt(s[d]) || o && Vt(o[d]) || o1(d, n) || l?.getValue(d)?.liveStyle !== void 0) && (c[d] = s[d]);
  return c;
}
function Bj(n) {
  return window.getComputedStyle(n);
}
class Hj extends n1 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = s1;
  }
  readValueFromInstance(a, l) {
    if (ql.has(l))
      return this.projection?.isProjecting ? Ld(l) : lA(a, l);
    {
      const s = Bj(a), o = (yS(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: l }) {
    return r1(a, l);
  }
  build(a, l, s) {
    Ph(a, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return Yh(a, l, s);
  }
}
const qj = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, kj = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Pj(n, a, l = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? qj : kj;
  n[c.offset] = `${-s}`, n[c.array] = `${a} ${l}`;
}
const Yj = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function u1(n, {
  attrX: a,
  attrY: l,
  attrScale: s,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: d = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, p, m, y) {
  if (Ph(n, h, m), p) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: b, style: S } = n;
  b.transform && (S.transform = b.transform, delete b.transform), (S.transform || b.transformOrigin) && (S.transformOrigin = b.transformOrigin ?? "50% 50%", delete b.transformOrigin), S.transform && (S.transformBox = y?.transformBox ?? "fill-box", delete b.transformBox);
  for (const T of Yj)
    b[T] !== void 0 && (S[T] = b[T], delete b[T]);
  a !== void 0 && (b.x = a), l !== void 0 && (b.y = l), s !== void 0 && (b.scale = s), o !== void 0 && Pj(b, o, c, d, !1);
}
const c1 = /* @__PURE__ */ new Set([
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
]), f1 = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function Gj(n, a, l, s) {
  s1(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(c1.has(o) ? o : _h(o), a.attrs[o]);
}
function d1(n, a, l) {
  const s = Yh(n, a, l);
  for (const o in n)
    if (Vt(n[o]) || Vt(a[o])) {
      const c = Hl.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = n[o];
    }
  return s;
}
class Fj extends n1 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = At;
  }
  getBaseTargetFromProps(a, l) {
    return a[l];
  }
  readValueFromInstance(a, l) {
    if (ql.has(l)) {
      const s = FS(l);
      return s && s.default || 0;
    }
    return l = c1.has(l) ? l : _h(l), a.getAttribute(l);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return d1(a, l, s);
  }
  build(a, l, s) {
    u1(a, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, l, s, o) {
    Gj(a, l, s, o);
  }
  mount(a) {
    this.isSVGTag = f1(a.tagName), super.mount(a);
  }
}
const $j = qh.length;
function h1(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const l = n.parent ? h1(n.parent) || {} : {};
    return n.props.initial !== void 0 && (l.initial = n.props.initial), l;
  }
  const a = {};
  for (let l = 0; l < $j; l++) {
    const s = qh[l], o = n.props[s];
    (ts(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function m1(n, a) {
  if (!Array.isArray(a))
    return !1;
  const l = a.length;
  if (l !== n.length)
    return !1;
  for (let s = 0; s < l; s++)
    if (a[s] !== n[s])
      return !1;
  return !0;
}
const Xj = [...Hh].reverse(), Kj = Hh.length;
function Qj(n) {
  return (a) => Promise.all(a.map(({ animation: l, options: s }) => XA(n, l, s)));
}
function Ij(n) {
  let a = Qj(n), l = Jv(), s = !0, o = !1;
  const c = (m) => (y, b) => {
    const S = Vi(n, b, m === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: T, transitionEnd: R, ...w } = S;
      y = { ...y, ...w, ...R };
    }
    return y;
  };
  function d(m) {
    a = m(n);
  }
  function h(m) {
    const { props: y } = n, b = h1(n.parent) || {}, S = [], T = /* @__PURE__ */ new Set();
    let R = {}, w = 1 / 0;
    for (let O = 0; O < Kj; O++) {
      const B = Xj[O], L = l[B], V = y[B] !== void 0 ? y[B] : b[B], X = ts(V), K = B === m ? L.isActive : null;
      K === !1 && (w = O);
      let ee = V === b[B] && V !== y[B] && X;
      if (ee && (s || o) && n.manuallyAnimateOnMount && (ee = !1), L.protectedKeys = { ...R }, // If it isn't active and hasn't *just* been set as inactive
      !L.isActive && K === null || // If we didn't and don't have any defined prop for this animation type
      !V && !L.prevProp || // Or if the prop doesn't define an animation
      Ru(V) || typeof V == "boolean")
        continue;
      if (B === "exit" && L.isActive && K !== !0) {
        L.prevResolvedValues && (R = {
          ...R,
          ...L.prevResolvedValues
        });
        continue;
      }
      const A = Zj(L.prevProp, V);
      let Q = A || // If we're making this variant active, we want to always make it active
      B === m && L.isActive && !ee && X || // If we removed a higher-priority variant (i is in reverse order)
      O > w && X, te = !1;
      const ce = Array.isArray(V) ? V : [V];
      let J = ce.reduce(c(B), {});
      K === !1 && (J = {});
      const { prevResolvedValues: P = {} } = L, le = {
        ...P,
        ...J
      }, Z = (se) => {
        Q = !0, T.has(se) && (te = !0, T.delete(se)), L.needsAnimating[se] = !0;
        const ue = n.getValue(se);
        ue && (ue.liveStyle = !1);
      };
      for (const se in le) {
        const ue = J[se], we = P[se];
        if (R.hasOwnProperty(se))
          continue;
        let j = !1;
        kd(ue) && kd(we) ? j = !m1(ue, we) : j = ue !== we, j ? ue != null ? Z(se) : T.add(se) : ue !== void 0 && T.has(se) ? Z(se) : L.protectedKeys[se] = !0;
      }
      L.prevProp = V, L.prevResolvedValues = J, L.isActive && (R = { ...R, ...J }), (s || o) && n.blockInitialAnimation && (Q = !1);
      const z = ee && A;
      Q && (!z || te) && S.push(...ce.map((se) => {
        const ue = { type: B };
        if (typeof se == "string" && (s || o) && !z && n.manuallyAnimateOnMount && n.parent) {
          const { parent: we } = n, j = Vi(we, se);
          if (we.enteringChildren && j) {
            const { delayChildren: F } = j.transition || {};
            ue.delay = US(we.enteringChildren, n, F);
          }
        }
        return {
          animation: se,
          options: ue
        };
      }));
    }
    if (T.size) {
      const O = {};
      if (typeof y.initial != "boolean") {
        const B = Vi(n, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        B && B.transition && (O.transition = B.transition);
      }
      T.forEach((B) => {
        const L = n.getBaseTarget(B), V = n.getValue(B);
        V && (V.liveStyle = !0), O[B] = L ?? null;
      }), S.push({ animation: O });
    }
    let D = !!S.length;
    return s && (y.initial === !1 || y.initial === y.animate) && !n.manuallyAnimateOnMount && (D = !1), s = !1, o = !1, D ? a(S) : Promise.resolve();
  }
  function p(m, y) {
    if (l[m].isActive === y)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(m, y)), l[m].isActive = y;
    const b = h(m);
    for (const S in l)
      l[S].protectedKeys = {};
    return b;
  }
  return {
    animateChanges: h,
    setActive: p,
    setAnimateFunction: d,
    getState: () => l,
    reset: () => {
      l = Jv(), o = !0;
    }
  };
}
function Zj(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !m1(a, n) : !1;
}
function ji(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Jv() {
  return {
    animate: ji(!0),
    whileInView: ji(),
    whileHover: ji(),
    whileTap: ji(),
    whileDrag: ji(),
    whileFocus: ji(),
    exit: ji()
  };
}
function Qd(n, a) {
  n.min = a.min, n.max = a.max;
}
function On(n, a) {
  Qd(n.x, a.x), Qd(n.y, a.y);
}
function Wv(n, a) {
  n.translate = a.translate, n.scale = a.scale, n.originPoint = a.originPoint, n.origin = a.origin;
}
const p1 = 1e-4, Jj = 1 - p1, Wj = 1 + p1, y1 = 0.01, e2 = 0 - y1, t2 = 0 + y1;
function Xt(n) {
  return n.max - n.min;
}
function n2(n, a, l) {
  return Math.abs(n - a) <= l;
}
function e0(n, a, l, s = 0.5) {
  n.origin = s, n.originPoint = rt(a.min, a.max, n.origin), n.scale = Xt(l) / Xt(a), n.translate = rt(l.min, l.max, n.origin) - n.originPoint, (n.scale >= Jj && n.scale <= Wj || isNaN(n.scale)) && (n.scale = 1), (n.translate >= e2 && n.translate <= t2 || isNaN(n.translate)) && (n.translate = 0);
}
function Kr(n, a, l, s) {
  e0(n.x, a.x, l.x, s ? s.originX : void 0), e0(n.y, a.y, l.y, s ? s.originY : void 0);
}
function t0(n, a, l, s = 0) {
  const o = s ? rt(l.min, l.max, s) : l.min;
  n.min = o + a.min, n.max = n.min + Xt(a);
}
function a2(n, a, l, s) {
  t0(n.x, a.x, l.x, s?.x), t0(n.y, a.y, l.y, s?.y);
}
function n0(n, a, l, s = 0) {
  const o = s ? rt(l.min, l.max, s) : l.min;
  n.min = a.min - o, n.max = n.min + Xt(a);
}
function mu(n, a, l, s) {
  n0(n.x, a.x, l.x, s?.x), n0(n.y, a.y, l.y, s?.y);
}
function a0(n, a, l, s, o) {
  return n -= a, n = hu(n, 1 / l, s), o !== void 0 && (n = hu(n, 1 / o, s)), n;
}
function i2(n, a = 0, l = 1, s = 0.5, o, c = n, d = n) {
  if (Xn.test(a) && (a = parseFloat(a), a = rt(d.min, d.max, a / 100) - d.min), typeof a != "number")
    return;
  let h = rt(c.min, c.max, s);
  n === c && (h -= a), n.min = a0(n.min, a, l, h, o), n.max = a0(n.max, a, l, h, o);
}
function i0(n, a, [l, s, o], c, d) {
  i2(n, a[l], a[s], a[o], a.scale, c, d);
}
const l2 = ["x", "scaleX", "originX"], r2 = ["y", "scaleY", "originY"];
function l0(n, a, l, s) {
  i0(n.x, a, l2, l ? l.x : void 0, s ? s.x : void 0), i0(n.y, a, r2, l ? l.y : void 0, s ? s.y : void 0);
}
function r0(n) {
  return n.translate === 0 && n.scale === 1;
}
function g1(n) {
  return r0(n.x) && r0(n.y);
}
function s0(n, a) {
  return n.min === a.min && n.max === a.max;
}
function s2(n, a) {
  return s0(n.x, a.x) && s0(n.y, a.y);
}
function o0(n, a) {
  return Math.round(n.min) === Math.round(a.min) && Math.round(n.max) === Math.round(a.max);
}
function v1(n, a) {
  return o0(n.x, a.x) && o0(n.y, a.y);
}
function u0(n) {
  return Xt(n.x) / Xt(n.y);
}
function c0(n, a) {
  return n.translate === a.translate && n.scale === a.scale && n.originPoint === a.originPoint;
}
function Fn(n) {
  return [n("x"), n("y")];
}
function o2(n, a, l) {
  let s = "";
  const o = n.x.translate / a.x, c = n.y.translate / a.y, d = l?.z || 0;
  if ((o || c || d) && (s = `translate3d(${o}px, ${c}px, ${d}px) `), (a.x !== 1 || a.y !== 1) && (s += `scale(${1 / a.x}, ${1 / a.y}) `), l) {
    const { transformPerspective: m, rotate: y, rotateX: b, rotateY: S, skewX: T, skewY: R } = l;
    m && (s = `perspective(${m}px) ${s}`), y && (s += `rotate(${y}deg) `), b && (s += `rotateX(${b}deg) `), S && (s += `rotateY(${S}deg) `), T && (s += `skewX(${T}deg) `), R && (s += `skewY(${R}deg) `);
  }
  const h = n.x.scale * a.x, p = n.y.scale * a.y;
  return (h !== 1 || p !== 1) && (s += `scale(${h}, ${p})`), s || "none";
}
const b1 = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius"
], u2 = b1.length, f0 = (n) => typeof n == "string" ? parseFloat(n) : n, d0 = (n) => typeof n == "number" || ye.test(n);
function c2(n, a, l, s, o, c) {
  o ? (n.opacity = rt(0, l.opacity ?? 1, f2(s)), n.opacityExit = rt(a.opacity ?? 1, 0, d2(s))) : c && (n.opacity = rt(a.opacity ?? 1, l.opacity ?? 1, s));
  for (let d = 0; d < u2; d++) {
    const h = b1[d];
    let p = h0(a, h), m = h0(l, h);
    if (p === void 0 && m === void 0)
      continue;
    p || (p = 0), m || (m = 0), p === 0 || m === 0 || d0(p) === d0(m) ? (n[h] = Math.max(rt(f0(p), f0(m), s), 0), (Xn.test(m) || Xn.test(p)) && (n[h] += "%")) : n[h] = m;
  }
  (a.rotate || l.rotate) && (n.rotate = rt(a.rotate || 0, l.rotate || 0, s));
}
function h0(n, a) {
  return n[a] !== void 0 ? n[a] : n.borderRadius;
}
const f2 = /* @__PURE__ */ S1(0, 0.5, cS), d2 = /* @__PURE__ */ S1(0.5, 0.95, Rn);
function S1(n, a, l) {
  return (s) => s < n ? 0 : s > a ? 1 : l(/* @__PURE__ */ Wr(n, a, s));
}
function h2(n, a, l) {
  const s = Vt(n) ? n : Ul(n);
  return s.start(zh("", s, a, l)), s.animation;
}
function ns(n, a, l, s = { passive: !0 }) {
  return n.addEventListener(a, l, s), () => n.removeEventListener(a, l);
}
const m2 = (n, a) => n.depth - a.depth;
class p2 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(a) {
    Sh(this.children, a), this.isDirty = !0;
  }
  remove(a) {
    ru(this.children, a), this.isDirty = !0;
  }
  forEach(a) {
    this.isDirty && this.children.sort(m2), this.isDirty = !1, this.children.forEach(a);
  }
}
function y2(n, a) {
  const l = $t.now(), s = ({ timestamp: o }) => {
    const c = o - l;
    c >= a && (ri(s), n(c - a));
  };
  return tt.setup(s, !0), () => ri(s);
}
function eu(n) {
  return Vt(n) ? n.get() : n;
}
class g2 {
  constructor() {
    this.members = [];
  }
  add(a) {
    Sh(this.members, a);
    for (let l = this.members.length - 1; l >= 0; l--) {
      const s = this.members[l];
      if (s === a || s === this.lead || s === this.prevLead)
        continue;
      const o = s.instance;
      (!o || o.isConnected === !1) && !s.snapshot && (ru(this.members, s), s.unmount());
    }
    a.scheduleRender();
  }
  remove(a) {
    if (ru(this.members, a), a === this.prevLead && (this.prevLead = void 0), a === this.lead) {
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
const tu = {
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
}, sd = ["", "X", "Y", "Z"], v2 = 1e3;
let b2 = 0;
function od(n, a, l, s) {
  const { latestValues: o } = a;
  o[n] && (l[n] = o[n], a.setStaticValue(n, 0), s && (s[n] = 0));
}
function x1(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: a } = n.options;
  if (!a)
    return;
  const l = kS(a);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: o, layoutId: c } = n.options;
    window.MotionCancelOptimisedAnimation(l, "transform", tt, !(o || c));
  }
  const { parent: s } = n;
  s && !s.hasCheckedOptimisedAppear && x1(s);
}
function E1({ attachResizeListener: n, defaultParent: a, measureScroll: l, checkIsScrollRoot: s, resetTransform: o }) {
  return class {
    constructor(d = {}, h = a?.()) {
      this.id = b2++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(E2), this.nodes.forEach(A2), this.nodes.forEach(j2), this.nodes.forEach(T2);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = d, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new p2());
    }
    addEventListener(d, h) {
      return this.eventHandlers.has(d) || this.eventHandlers.set(d, new xh()), this.eventHandlers.get(d).add(h);
    }
    notifyListeners(d, ...h) {
      const p = this.eventHandlers.get(d);
      p && p.notify(...h);
    }
    hasListeners(d) {
      return this.eventHandlers.has(d);
    }
    /**
     * Lifecycles
     */
    mount(d) {
      if (this.instance)
        return;
      this.isSVG = Bh(d) && !Ej(d), this.instance = d;
      const { layoutId: h, layout: p, visualElement: m } = this.options;
      if (m && !m.current && m.mount(d), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0), n) {
        let y, b = 0;
        const S = () => this.root.updateBlockedByResize = !1;
        tt.read(() => {
          b = window.innerWidth;
        }), n(d, () => {
          const T = window.innerWidth;
          T !== b && (b = T, this.root.updateBlockedByResize = !0, y && y(), y = y2(S, 250), tu.hasAnimatedSinceResize && (tu.hasAnimatedSinceResize = !1, this.nodes.forEach(y0)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || p) && this.addEventListener("didUpdate", ({ delta: y, hasLayoutChanged: b, hasRelativeLayoutChanged: S, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const R = this.options.transition || m.getDefaultTransition() || _2, { onLayoutAnimationStart: w, onLayoutAnimationComplete: D } = m.getProps(), O = !this.targetLayout || !v1(this.targetLayout, T), B = !b && S;
        if (this.options.layoutRoot || this.resumeFrom || B || b && (O || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const L = {
            ...Nh(R, "layout"),
            onPlay: w,
            onComplete: D
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (L.delay = 0, L.type = !1), this.startAnimation(L), this.setAnimationOrigin(y, B);
        } else
          b || y0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const d = this.getStack();
      d && d.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ri(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(D2), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: d } = this.options;
      return d && d.getProps().transformTemplate;
    }
    willUpdate(d = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && x1(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
      this.prevTransformTemplateValue = m ? m(this.latestValues, "") : void 0, this.updateSnapshot(), d && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const p = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(w2), this.nodes.forEach(m0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(p0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(C2), this.nodes.forEach(M2), this.nodes.forEach(S2), this.nodes.forEach(x2)) : this.nodes.forEach(p0), this.clearAllSnapshots();
      const h = $t.now();
      Ut.delta = Qn(0, 1e3 / 60, h - Ut.timestamp), Ut.timestamp = h, Ut.isProcessing = !0, Wf.update.process(Ut), Wf.preRender.process(Ut), Wf.render.process(Ut), Ut.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Uh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(R2), this.sharedNodes.forEach(N2);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, tt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      tt.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Xt(this.snapshot.measuredBox.x) && !Xt(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++)
          this.path[p].updateScroll();
      const d = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = At()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: h } = this.options;
      h && h.notify("LayoutMeasure", this.layout.layoutBox, d ? d.layoutBox : void 0);
    }
    updateScroll(d = "measure") {
      let h = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === d && (h = !1), h && this.instance) {
        const p = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: d,
          isRoot: p,
          offset: l(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p
        };
      }
    }
    resetTransform() {
      if (!o)
        return;
      const d = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !g1(this.projectionDelta), p = this.getTransformTemplate(), m = p ? p(this.latestValues, "") : void 0, y = m !== this.prevTransformTemplateValue;
      d && this.instance && (h || zi(this.latestValues) || y) && (o(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(d = !0) {
      const h = this.measurePageBox();
      let p = this.removeElementScroll(h);
      return d && (p = this.removeTransform(p)), L2(p), {
        animationId: this.root.animationId,
        measuredBox: h,
        layoutBox: p,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: d } = this.options;
      if (!d)
        return At();
      const h = d.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(U2))) {
        const { scroll: m } = this.root;
        m && ($n(h.x, m.offset.x), $n(h.y, m.offset.y));
      }
      return h;
    }
    removeElementScroll(d) {
      const h = At();
      if (On(h, d), this.scroll?.wasRoot)
        return h;
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p], { scroll: y, options: b } = m;
        m !== this.root && y && b.layoutScroll && (y.wasRoot && On(h, d), $n(h.x, y.offset.x), $n(h.y, y.offset.y));
      }
      return h;
    }
    applyTransform(d, h = !1, p) {
      const m = p || At();
      On(m, d);
      for (let y = 0; y < this.path.length; y++) {
        const b = this.path[y];
        !h && b.options.layoutScroll && b.scroll && b !== b.root && ($n(m.x, -b.scroll.offset.x), $n(m.y, -b.scroll.offset.y)), zi(b.latestValues) && Wo(m, b.latestValues, b.layout?.layoutBox);
      }
      return zi(this.latestValues) && Wo(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(d) {
      const h = At();
      On(h, d);
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p];
        if (!zi(m.latestValues))
          continue;
        let y;
        m.instance && ($d(m.latestValues) && m.updateSnapshot(), y = At(), On(y, m.measurePageBox())), l0(h, m.latestValues, m.snapshot?.layoutBox, y);
      }
      return zi(this.latestValues) && l0(h, this.latestValues), h;
    }
    setTargetDelta(d) {
      this.targetDelta = d, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(d) {
      this.options = {
        ...this.options,
        ...d,
        crossfade: d.crossfade !== void 0 ? d.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Ut.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(d = !1) {
      const h = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
      const p = !!this.resumingFrom || this !== h;
      if (!(d || p && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: y, layoutId: b } = this.options;
      if (!this.layout || !(y || b))
        return;
      this.resolvedRelativeTargetAt = Ut.timestamp;
      const S = this.getClosestProjectingParent();
      S && this.linkedParentVersion !== S.layoutVersion && !S.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && S && S.layout ? this.createRelativeTarget(S, this.layout.layoutBox, S.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = At(), this.targetWithTransforms = At()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), a2(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : On(this.target, this.layout.layoutBox), l1(this.target, this.targetDelta)) : On(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && S && !!S.resumingFrom == !!this.resumingFrom && !S.options.layoutScroll && S.target && this.animationProgress !== 1 ? this.createRelativeTarget(S, this.target, S.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || $d(this.parent.latestValues) || i1(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(d, h, p) {
      this.relativeParent = d, this.linkedParentVersion = d.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = At(), this.relativeTargetOrigin = At(), mu(this.relativeTargetOrigin, h, p, this.options.layoutAnchor || void 0), On(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const d = this.getLead(), h = !!this.resumingFrom || this !== d;
      let p = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1), this.resolvedRelativeTargetAt === Ut.timestamp && (p = !1), p)
        return;
      const { layout: m, layoutId: y } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(m || y))
        return;
      On(this.layoutCorrected, this.layout.layoutBox);
      const b = this.treeScale.x, S = this.treeScale.y;
      zj(this.layoutCorrected, this.treeScale, this.path, h), d.layout && !d.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (d.target = d.layout.layoutBox, d.targetWithTransforms = At());
      const { target: T } = d;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Wv(this.prevProjectionDelta.x, this.projectionDelta.x), Wv(this.prevProjectionDelta.y, this.projectionDelta.y)), Kr(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== b || this.treeScale.y !== S || !c0(this.projectionDelta.x, this.prevProjectionDelta.x) || !c0(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(d = !0) {
      if (this.options.visualElement?.scheduleRender(), d) {
        const h = this.getStack();
        h && h.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = zl(), this.projectionDelta = zl(), this.projectionDeltaWithTransform = zl();
    }
    setAnimationOrigin(d, h = !1) {
      const p = this.snapshot, m = p ? p.latestValues : {}, y = { ...this.latestValues }, b = zl();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const S = At(), T = p ? p.source : void 0, R = this.layout ? this.layout.source : void 0, w = T !== R, D = this.getStack(), O = !D || D.members.length <= 1, B = !!(w && !O && this.options.crossfade === !0 && !this.path.some(O2));
      this.animationProgress = 0;
      let L;
      this.mixTargetDelta = (V) => {
        const X = V / 1e3;
        g0(b.x, d.x, X), g0(b.y, d.y, X), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (mu(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), z2(this.relativeTarget, this.relativeTargetOrigin, S, X), L && s2(this.relativeTarget, L) && (this.isProjectionDirty = !1), L || (L = At()), On(L, this.relativeTarget)), w && (this.animationValues = y, c2(y, m, this.latestValues, X, B, O)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = X;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (ri(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = tt.update(() => {
        tu.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Ul(0)), this.motionValue.jump(0, !1), this.currentAnimation = h2(this.motionValue, [0, 1e3], {
          ...d,
          velocity: 0,
          isSync: !0,
          onUpdate: (h) => {
            this.mixTargetDelta(h), d.onUpdate && d.onUpdate(h);
          },
          onStop: () => {
          },
          onComplete: () => {
            d.onComplete && d.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const d = this.getStack();
      d && d.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(v2), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: h, target: p, layout: m, latestValues: y } = d;
      if (!(!h || !p || !m)) {
        if (this !== d && this.layout && m && T1(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          p = this.target || At();
          const b = Xt(this.layout.layoutBox.x);
          p.x.min = d.target.x.min, p.x.max = p.x.min + b;
          const S = Xt(this.layout.layoutBox.y);
          p.y.min = d.target.y.min, p.y.max = p.y.min + S;
        }
        On(h, p), Wo(h, y), Kr(this.projectionDeltaWithTransform, this.layoutCorrected, h, y);
      }
    }
    registerSharedNode(d, h) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new g2()), this.sharedNodes.get(d).add(h);
      const m = h.options.initialPromotionConfig;
      h.promote({
        transition: m ? m.transition : void 0,
        preserveFollowOpacity: m && m.shouldPreserveFollowOpacity ? m.shouldPreserveFollowOpacity(h) : void 0
      });
    }
    isLead() {
      const d = this.getStack();
      return d ? d.lead === this : !0;
    }
    getLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: d } = this.options;
      if (d)
        return this.root.sharedNodes.get(d);
    }
    promote({ needsReset: d, transition: h, preserveFollowOpacity: p } = {}) {
      const m = this.getStack();
      m && m.promote(this, p), d && (this.projectionDelta = void 0, this.needsReset = !0), h && this.setOptions({ transition: h });
    }
    relegate() {
      const d = this.getStack();
      return d ? d.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: d } = this.options;
      if (!d)
        return;
      let h = !1;
      const { latestValues: p } = d;
      if ((p.z || p.rotate || p.rotateX || p.rotateY || p.rotateZ || p.skewX || p.skewY) && (h = !0), !h)
        return;
      const m = {};
      p.z && od("z", d, m, this.animationValues);
      for (let y = 0; y < sd.length; y++)
        od(`rotate${sd[y]}`, d, m, this.animationValues), od(`skew${sd[y]}`, d, m, this.animationValues);
      d.render();
      for (const y in m)
        d.setStaticValue(y, m[y]), this.animationValues && (this.animationValues[y] = m[y]);
      d.scheduleRender();
    }
    applyProjectionStyles(d, h) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        d.visibility = "hidden";
        return;
      }
      const p = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, d.visibility = "", d.opacity = "", d.pointerEvents = eu(h?.pointerEvents) || "", d.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, d.pointerEvents = eu(h?.pointerEvents) || ""), this.hasProjected && !zi(this.latestValues) && (d.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      d.visibility = "";
      const y = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let b = o2(this.projectionDeltaWithTransform, this.treeScale, y);
      p && (b = p(y, b)), d.transform = b;
      const { x: S, y: T } = this.projectionDelta;
      d.transformOrigin = `${S.origin * 100}% ${T.origin * 100}% 0`, m.animationValues ? d.opacity = m === this ? y.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : y.opacityExit : d.opacity = m === this ? y.opacity !== void 0 ? y.opacity : "" : y.opacityExit !== void 0 ? y.opacityExit : 0;
      for (const R in Kd) {
        if (y[R] === void 0)
          continue;
        const { correct: w, applyTo: D, isCSSVariable: O } = Kd[R], B = b === "none" ? y[R] : w(y[R], m);
        if (D) {
          const L = D.length;
          for (let V = 0; V < L; V++)
            d[D[V]] = B;
        } else
          O ? this.options.visualElement.renderState.vars[R] = B : d[R] = B;
      }
      this.options.layoutId && (d.pointerEvents = m === this ? eu(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((d) => d.currentAnimation?.stop()), this.root.nodes.forEach(m0), this.root.sharedNodes.clear();
    }
  };
}
function S2(n) {
  n.updateLayout();
}
function x2(n) {
  const a = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && a && n.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: s } = n.layout, { animationType: o } = n.options, c = a.source !== n.layout.source;
    if (o === "size")
      Fn((y) => {
        const b = c ? a.measuredBox[y] : a.layoutBox[y], S = Xt(b);
        b.min = l[y].min, b.max = b.min + S;
      });
    else if (o === "x" || o === "y") {
      const y = o === "x" ? "y" : "x";
      Qd(c ? a.measuredBox[y] : a.layoutBox[y], l[y]);
    } else T1(o, a.layoutBox, l) && Fn((y) => {
      const b = c ? a.measuredBox[y] : a.layoutBox[y], S = Xt(l[y]);
      b.max = b.min + S, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[y].max = n.relativeTarget[y].min + S);
    });
    const d = zl();
    Kr(d, l, a.layoutBox);
    const h = zl();
    c ? Kr(h, n.applyTransform(s, !0), a.measuredBox) : Kr(h, l, a.layoutBox);
    const p = !g1(d);
    let m = !1;
    if (!n.resumeFrom) {
      const y = n.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: b, layout: S } = y;
        if (b && S) {
          const T = n.options.layoutAnchor || void 0, R = At();
          mu(R, a.layoutBox, b.layoutBox, T);
          const w = At();
          mu(w, l, S.layoutBox, T), v1(R, w) || (m = !0), y.options.layoutRoot && (n.relativeTarget = w, n.relativeTargetOrigin = R, n.relativeParent = y);
        }
      }
    }
    n.notifyListeners("didUpdate", {
      layout: l,
      snapshot: a,
      delta: h,
      layoutDelta: d,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: m
    });
  } else if (n.isLead()) {
    const { onExitComplete: l } = n.options;
    l && l();
  }
  n.options.transition = void 0;
}
function E2(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function T2(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function R2(n) {
  n.clearSnapshot();
}
function m0(n) {
  n.clearMeasurements();
}
function w2(n) {
  n.isLayoutDirty = !0, n.updateLayout();
}
function p0(n) {
  n.isLayoutDirty = !1;
}
function C2(n) {
  n.isAnimationBlocked && n.layout && !n.isLayoutDirty && (n.snapshot = n.layout, n.isLayoutDirty = !0);
}
function M2(n) {
  const { visualElement: a } = n.options;
  a && a.getProps().onBeforeLayoutMeasure && a.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function y0(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function A2(n) {
  n.resolveTargetDelta();
}
function j2(n) {
  n.calcProjection();
}
function D2(n) {
  n.resetSkewAndRotation();
}
function N2(n) {
  n.removeLeadSnapshot();
}
function g0(n, a, l) {
  n.translate = rt(a.translate, 0, l), n.scale = rt(a.scale, 1, l), n.origin = a.origin, n.originPoint = a.originPoint;
}
function v0(n, a, l, s) {
  n.min = rt(a.min, l.min, s), n.max = rt(a.max, l.max, s);
}
function z2(n, a, l, s) {
  v0(n.x, a.x, l.x, s), v0(n.y, a.y, l.y, s);
}
function O2(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const _2 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, b0 = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), S0 = b0("applewebkit/") && !b0("chrome/") ? Math.round : Rn;
function x0(n) {
  n.min = S0(n.min), n.max = S0(n.max);
}
function L2(n) {
  x0(n.x), x0(n.y);
}
function T1(n, a, l) {
  return n === "position" || n === "preserve-aspect" && !n2(u0(a), u0(l), 0.2);
}
function U2(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const V2 = E1({
  attachResizeListener: (n, a) => ns(n, "resize", a),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), ud = {
  current: void 0
}, R1 = E1({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!ud.current) {
      const n = new V2({});
      n.mount(window), n.setOptions({ layoutScroll: !0 }), ud.current = n;
    }
    return ud.current;
  },
  resetTransform: (n, a) => {
    n.style.transform = a !== void 0 ? a : "none";
  },
  checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed"
}), Gh = x.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function E0(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function B2(...n) {
  return (a) => {
    let l = !1;
    const s = n.map((o) => {
      const c = E0(o, a);
      return !l && typeof c == "function" && (l = !0), c;
    });
    if (l)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : E0(n[o], null);
        }
      };
  };
}
function H2(...n) {
  return x.useCallback(B2(...n), n);
}
class q2 extends x.Component {
  getSnapshotBeforeUpdate(a) {
    const l = this.props.childRef.current;
    if (Ko(l) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = l.offsetParent, o = Ko(s) && s.offsetWidth || 0, c = Ko(s) && s.offsetHeight || 0, d = getComputedStyle(l), h = this.props.sizeRef.current;
      h.height = parseFloat(d.height), h.width = parseFloat(d.width), h.top = l.offsetTop, h.left = l.offsetLeft, h.right = o - h.width - h.left, h.bottom = c - h.height - h.top;
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
function k2({ children: n, isPresent: a, anchorX: l, anchorY: s, root: o, pop: c }) {
  const d = x.useId(), h = x.useRef(null), p = x.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = x.useContext(Gh), y = n.props?.ref ?? n?.ref, b = H2(h, y);
  return x.useInsertionEffect(() => {
    const { width: S, height: T, top: R, left: w, right: D, bottom: O } = p.current;
    if (a || c === !1 || !h.current || !S || !T)
      return;
    const B = l === "left" ? `left: ${w}` : `right: ${D}`, L = s === "bottom" ? `bottom: ${O}` : `top: ${R}`;
    h.current.dataset.motionPopId = d;
    const V = document.createElement("style");
    m && (V.nonce = m);
    const X = o ?? document.head;
    return X.appendChild(V), V.sheet && V.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${T}px !important;
            ${B}px !important;
            ${L}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), X.contains(V) && X.removeChild(V);
    };
  }, [a]), v.jsx(q2, { isPresent: a, childRef: h, sizeRef: p, pop: c, children: c === !1 ? n : x.cloneElement(n, { ref: b }) });
}
const P2 = ({ children: n, initial: a, isPresent: l, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: d, anchorX: h, anchorY: p, root: m }) => {
  const y = bh(Y2), b = x.useId();
  let S = !0, T = x.useMemo(() => (S = !1, {
    id: b,
    initial: a,
    isPresent: l,
    custom: o,
    onExitComplete: (R) => {
      y.set(R, !0);
      for (const w of y.values())
        if (!w)
          return;
      s && s();
    },
    register: (R) => (y.set(R, !1), () => y.delete(R))
  }), [l, y, s]);
  return c && S && (T = { ...T }), x.useMemo(() => {
    y.forEach((R, w) => y.set(w, !1));
  }, [l]), x.useEffect(() => {
    !l && !y.size && s && s();
  }, [l]), n = v.jsx(k2, { pop: d === "popLayout", isPresent: l, anchorX: h, anchorY: p, root: m, children: n }), v.jsx(Eu.Provider, { value: T, children: n });
};
function Y2() {
  return /* @__PURE__ */ new Map();
}
function w1(n = !0) {
  const a = x.useContext(Eu);
  if (a === null)
    return [!0, null];
  const { isPresent: l, onExitComplete: s, register: o } = a, c = x.useId();
  x.useEffect(() => {
    if (n)
      return o(c);
  }, [n]);
  const d = x.useCallback(() => n && s && s(c), [c, s, n]);
  return !l && s ? [!1, d] : [!0];
}
const Vo = (n) => n.key || "";
function T0(n) {
  const a = [];
  return x.Children.forEach(n, (l) => {
    x.isValidElement(l) && a.push(l);
  }), a;
}
const G2 = ({ children: n, custom: a, initial: l = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: d = !1, anchorX: h = "left", anchorY: p = "top", root: m }) => {
  const [y, b] = w1(d), S = x.useMemo(() => T0(n), [n]), T = d && !y ? [] : S.map(Vo), R = x.useRef(!0), w = x.useRef(S), D = bh(() => /* @__PURE__ */ new Map()), O = x.useRef(/* @__PURE__ */ new Set()), [B, L] = x.useState(S), [V, X] = x.useState(S);
  Jb(() => {
    R.current = !1, w.current = S;
    for (let A = 0; A < V.length; A++) {
      const Q = Vo(V[A]);
      T.includes(Q) ? (D.delete(Q), O.current.delete(Q)) : D.get(Q) !== !0 && D.set(Q, !1);
    }
  }, [V, T.length, T.join("-")]);
  const K = [];
  if (S !== B) {
    let A = [...S];
    for (let Q = 0; Q < V.length; Q++) {
      const te = V[Q], ce = Vo(te);
      T.includes(ce) || (A.splice(Q, 0, te), K.push(te));
    }
    return c === "wait" && K.length && (A = K), X(T0(A)), L(S), null;
  }
  const { forceRender: ee } = x.useContext(vh);
  return v.jsx(v.Fragment, { children: V.map((A) => {
    const Q = Vo(A), te = d && !y ? !1 : S === V || T.includes(Q), ce = () => {
      if (O.current.has(Q))
        return;
      if (D.has(Q))
        O.current.add(Q), D.set(Q, !0);
      else
        return;
      let J = !0;
      D.forEach((P) => {
        P || (J = !1);
      }), J && (ee?.(), X(w.current), d && b?.(), s && s());
    };
    return v.jsx(P2, { isPresent: te, initial: !R.current || l ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: m, onExitComplete: te ? void 0 : ce, anchorX: h, anchorY: p, children: A }, Q);
  }) });
}, Fh = x.createContext({ strict: !1 }), R0 = {
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
function F2() {
  if (w0)
    return;
  const n = {};
  for (const a in R0)
    n[a] = {
      isEnabled: (l) => R0[a].some((s) => !!l[s])
    };
  t1(n), w0 = !0;
}
function C1() {
  return F2(), Aj();
}
function Id(n) {
  const a = C1();
  for (const l in n)
    a[l] = {
      ...a[l],
      ...n[l]
    };
  t1(a);
}
function M1({ children: n, features: a, strict: l = !1 }) {
  const [, s] = x.useState(!cd(a)), o = x.useRef(void 0);
  if (!cd(a)) {
    const { renderer: c, ...d } = a;
    o.current = c, Id(d);
  }
  return x.useEffect(() => {
    cd(a) && a().then(({ renderer: c, ...d }) => {
      Id(d), o.current = c, s(!0);
    });
  }, []), v.jsx(Fh.Provider, { value: { renderer: o.current, strict: l }, children: n });
}
function cd(n) {
  return typeof n == "function";
}
const $2 = /* @__PURE__ */ new Set([
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
function pu(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || $2.has(n);
}
let A1 = (n) => !pu(n);
function X2(n) {
  typeof n == "function" && (A1 = (a) => a.startsWith("on") ? !pu(a) : n(a));
}
try {
  X2(require("@emotion/is-prop-valid").default);
} catch {
}
function K2(n, a, l) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || Vt(n[o]) || (A1(o) || l === !0 && pu(o) || !a && !pu(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const Cu = /* @__PURE__ */ x.createContext({});
function Q2(n, a) {
  if (wu(n)) {
    const { initial: l, animate: s } = n;
    return {
      initial: l === !1 || ts(l) ? l : void 0,
      animate: ts(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function I2(n) {
  const { initial: a, animate: l } = Q2(n, x.useContext(Cu));
  return x.useMemo(() => ({ initial: a, animate: l }), [C0(a), C0(l)]);
}
function C0(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const $h = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function j1(n, a, l) {
  for (const s in a)
    !Vt(a[s]) && !o1(s, l) && (n[s] = a[s]);
}
function Z2({ transformTemplate: n }, a) {
  return x.useMemo(() => {
    const l = $h();
    return Ph(l, a, n), Object.assign({}, l.vars, l.style);
  }, [a]);
}
function J2(n, a) {
  const l = n.style || {}, s = {};
  return j1(s, l, n), Object.assign(s, Z2(n, a)), s;
}
function W2(n, a) {
  const l = {}, s = J2(n, a);
  return n.drag && n.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const D1 = () => ({
  ...$h(),
  attrs: {}
});
function eD(n, a, l, s) {
  const o = x.useMemo(() => {
    const c = D1();
    return u1(c, a, f1(s), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (n.style) {
    const c = {};
    j1(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const tD = [
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
function Xh(n) {
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
      !!(tD.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function nD(n, a, l, { latestValues: s }, o, c = !1, d) {
  const p = (d ?? Xh(n) ? eD : W2)(a, s, o, n), m = K2(a, typeof n == "string", c), y = n !== x.Fragment ? { ...m, ...p, ref: l } : {}, { children: b } = a, S = x.useMemo(() => Vt(b) ? b.get() : b, [b]);
  return x.createElement(n, {
    ...y,
    children: S
  });
}
function aD({ scrapeMotionValuesFromProps: n, createRenderState: a }, l, s, o) {
  return {
    latestValues: iD(l, s, o, n),
    renderState: a()
  };
}
function iD(n, a, l, s) {
  const o = {}, c = s(n, {});
  for (const S in c)
    o[S] = eu(c[S]);
  let { initial: d, animate: h } = n;
  const p = wu(n), m = WS(n);
  a && m && !p && n.inherit !== !1 && (d === void 0 && (d = a.initial), h === void 0 && (h = a.animate));
  let y = l ? l.initial === !1 : !1;
  y = y || d === !1;
  const b = y ? h : d;
  if (b && typeof b != "boolean" && !Ru(b)) {
    const S = Array.isArray(b) ? b : [b];
    for (let T = 0; T < S.length; T++) {
      const R = Oh(n, S[T]);
      if (R) {
        const { transitionEnd: w, transition: D, ...O } = R;
        for (const B in O) {
          let L = O[B];
          if (Array.isArray(L)) {
            const V = y ? L.length - 1 : 0;
            L = L[V];
          }
          L !== null && (o[B] = L);
        }
        for (const B in w)
          o[B] = w[B];
      }
    }
  }
  return o;
}
const N1 = (n) => (a, l) => {
  const s = x.useContext(Cu), o = x.useContext(Eu), c = () => aD(n, a, s, o);
  return l ? c() : bh(c);
}, lD = /* @__PURE__ */ N1({
  scrapeMotionValuesFromProps: Yh,
  createRenderState: $h
}), rD = /* @__PURE__ */ N1({
  scrapeMotionValuesFromProps: d1,
  createRenderState: D1
}), sD = Symbol.for("motionComponentSymbol");
function oD(n, a, l) {
  const s = x.useRef(l);
  x.useInsertionEffect(() => {
    s.current = l;
  });
  const o = x.useRef(null);
  return x.useCallback((c) => {
    c && n.onMount?.(c);
    const d = s.current;
    if (typeof d == "function")
      if (c) {
        const h = d(c);
        typeof h == "function" && (o.current = h);
      } else o.current ? (o.current(), o.current = null) : d(c);
    else d && (d.current = c);
    a && (c ? a.mount(c) : a.unmount());
  }, [a]);
}
const z1 = x.createContext({});
function Al(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function uD(n, a, l, s, o, c) {
  const { visualElement: d } = x.useContext(Cu), h = x.useContext(Fh), p = x.useContext(Eu), m = x.useContext(Gh), y = m.reducedMotion, b = m.skipAnimations, S = x.useRef(null), T = x.useRef(!1);
  s = s || h.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: d,
    props: l,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: y,
    skipAnimations: b,
    isSVG: c
  }), T.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const R = S.current, w = x.useContext(z1);
  R && !R.projection && o && (R.type === "html" || R.type === "svg") && cD(S.current, l, o, w);
  const D = x.useRef(!1);
  x.useInsertionEffect(() => {
    R && D.current && R.update(l, p);
  });
  const O = l[qS], B = x.useRef(!!O && typeof window < "u" && !window.MotionHandoffIsComplete?.(O) && window.MotionHasOptimisedAnimation?.(O));
  return Jb(() => {
    T.current = !0, R && (D.current = !0, window.MotionIsMounted = !0, R.updateFeatures(), R.scheduleRenderMicrotask(), B.current && R.animationState && R.animationState.animateChanges());
  }), x.useEffect(() => {
    R && (!B.current && R.animationState && R.animationState.animateChanges(), B.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(O);
    }), B.current = !1), R.enteringChildren = void 0);
  }), R;
}
function cD(n, a, l, s) {
  const { layoutId: o, layout: c, drag: d, dragConstraints: h, layoutScroll: p, layoutRoot: m, layoutAnchor: y, layoutCrossfade: b } = a;
  n.projection = new l(n.latestValues, a["data-framer-portal-id"] ? void 0 : O1(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!d || h && Al(h),
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
    layoutScroll: p,
    layoutRoot: m,
    layoutAnchor: y
  });
}
function O1(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : O1(n.parent);
}
function fd(n, { forwardMotionProps: a = !1, type: l } = {}, s, o) {
  s && Id(s);
  const c = l ? l === "svg" : Xh(n), d = c ? rD : lD;
  function h(m, y) {
    let b;
    const S = {
      ...x.useContext(Gh),
      ...m,
      layoutId: fD(m)
    }, { isStatic: T } = S, R = I2(m), w = d(m, T);
    if (!T && typeof window < "u") {
      dD();
      const D = hD(S);
      b = D.MeasureLayout, R.visualElement = uD(n, w, S, o, D.ProjectionNode, c);
    }
    return v.jsxs(Cu.Provider, { value: R, children: [b && R.visualElement ? v.jsx(b, { visualElement: R.visualElement, ...S }) : null, nD(n, m, oD(w, R.visualElement, y), w, T, a, c)] });
  }
  h.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const p = x.forwardRef(h);
  return p[sD] = n, p;
}
function fD({ layoutId: n }) {
  const a = x.useContext(vh).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function dD(n, a) {
  x.useContext(Fh).strict;
}
function hD(n) {
  const a = C1(), { drag: l, layout: s } = a;
  if (!l && !s)
    return {};
  const o = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function _1(n, a) {
  if (typeof Proxy > "u")
    return fd;
  const l = /* @__PURE__ */ new Map(), s = (c, d) => fd(c, d, n, a), o = (c, d) => s(c, d);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, d) => d === "create" ? s : (l.has(d) || l.set(d, fd(d, void 0, n, a)), l.get(d))
  });
}
const L1 = /* @__PURE__ */ _1(), U1 = (n, a) => a.isSVG ?? Xh(n) ? new Fj(a) : new Hj(a, {
  allowProjection: n !== x.Fragment
});
class mD extends si {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = Ij(a));
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
let pD = 0;
class yD extends si {
  constructor() {
    super(...arguments), this.id = pD++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: l } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: c, custom: d } = this.node.getProps();
        if (typeof c == "string") {
          const h = Vi(this.node, c, d);
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
const V1 = {
  animation: {
    Feature: mD
  },
  exit: {
    Feature: yD
  }
};
function hs(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
const gD = (n) => (a) => Vh(a) && n(a, hs(a));
function Qr(n, a, l, s) {
  return ns(n, a, gD(l), s);
}
const B1 = ({ current: n }) => n ? n.ownerDocument.defaultView : null, M0 = (n, a) => Math.abs(n - a);
function vD(n, a) {
  const l = M0(n.x, a.x), s = M0(n.y, a.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const A0 = /* @__PURE__ */ new Set(["auto", "scroll"]);
class H1 {
  constructor(a, l, { transformPagePoint: s, contextWindow: o = window, dragSnapToOrigin: c = !1, distanceThreshold: d = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (T) => {
      this.handleScroll(T.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Bo(this.lastRawMoveEventInfo, this.transformPagePoint));
      const T = dd(this.lastMoveEventInfo, this.history), R = this.startEvent !== null, w = vD(T.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!R && !w)
        return;
      const { point: D } = T, { timestamp: O } = Ut;
      this.history.push({ ...D, timestamp: O });
      const { onStart: B, onMove: L } = this.handlers;
      R || (B && B(this.lastMoveEvent, T), this.startEvent = this.lastMoveEvent), L && L(this.lastMoveEvent, T);
    }, this.handlePointerMove = (T, R) => {
      this.lastMoveEvent = T, this.lastRawMoveEventInfo = R, this.lastMoveEventInfo = Bo(R, this.transformPagePoint), tt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (T, R) => {
      this.end();
      const { onEnd: w, onSessionEnd: D, resumeAnimation: O } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && O && O(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const B = dd(T.type === "pointercancel" ? this.lastMoveEventInfo : Bo(R, this.transformPagePoint), this.history);
      this.startEvent && w && w(T, B), D && D(T, B);
    }, !Vh(a))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = d, this.contextWindow = o || window;
    const p = hs(a), m = Bo(p, this.transformPagePoint), { point: y } = m, { timestamp: b } = Ut;
    this.history = [{ ...y, timestamp: b }];
    const { onSessionStart: S } = l;
    S && S(a, dd(m, this.history)), this.removeListeners = cs(Qr(this.contextWindow, "pointermove", this.handlePointerMove), Qr(this.contextWindow, "pointerup", this.handlePointerUp), Qr(this.contextWindow, "pointercancel", this.handlePointerUp)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(a) {
    let l = a.parentElement;
    for (; l; ) {
      const s = getComputedStyle(l);
      (A0.has(s.overflowX) || A0.has(s.overflowY)) && this.scrollPositions.set(l, {
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
    c.x === 0 && c.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(a, o), tt.update(this.updatePoint, !0));
  }
  updateHandlers(a) {
    this.handlers = a;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), ri(this.updatePoint);
  }
}
function Bo(n, a) {
  return a ? { point: a(n.point) } : n;
}
function j0(n, a) {
  return { x: n.x - a.x, y: n.y - a.y };
}
function dd({ point: n }, a) {
  return {
    point: n,
    delta: j0(n, q1(a)),
    offset: j0(n, bD(a)),
    velocity: SD(a, 0.1)
  };
}
function bD(n) {
  return n[0];
}
function q1(n) {
  return n[n.length - 1];
}
function SD(n, a) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let l = n.length - 1, s = null;
  const o = q1(n);
  for (; l >= 0 && (s = n[l], !(o.timestamp - s.timestamp > /* @__PURE__ */ tn(a))); )
    l--;
  if (!s)
    return { x: 0, y: 0 };
  s === n[0] && n.length > 2 && o.timestamp - s.timestamp > /* @__PURE__ */ tn(a) * 2 && (s = n[1]);
  const c = /* @__PURE__ */ En(o.timestamp - s.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const d = {
    x: (o.x - s.x) / c,
    y: (o.y - s.y) / c
  };
  return d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d;
}
function xD(n, { min: a, max: l }, s) {
  return a !== void 0 && n < a ? n = s ? rt(a, n, s.min) : Math.max(n, a) : l !== void 0 && n > l && (n = s ? rt(l, n, s.max) : Math.min(n, l)), n;
}
function D0(n, a, l) {
  return {
    min: a !== void 0 ? n.min + a : void 0,
    max: l !== void 0 ? n.max + l - (n.max - n.min) : void 0
  };
}
function ED(n, { top: a, left: l, bottom: s, right: o }) {
  return {
    x: D0(n.x, l, o),
    y: D0(n.y, a, s)
  };
}
function N0(n, a) {
  let l = a.min - n.min, s = a.max - n.max;
  return a.max - a.min < n.max - n.min && ([l, s] = [s, l]), { min: l, max: s };
}
function TD(n, a) {
  return {
    x: N0(n.x, a.x),
    y: N0(n.y, a.y)
  };
}
function RD(n, a) {
  let l = 0.5;
  const s = Xt(n), o = Xt(a);
  return o > s ? l = /* @__PURE__ */ Wr(a.min, a.max - s, n.min) : s > o && (l = /* @__PURE__ */ Wr(n.min, n.max - o, a.min)), Qn(0, 1, l);
}
function wD(n, a) {
  const l = {};
  return a.min !== void 0 && (l.min = a.min - n.min), a.max !== void 0 && (l.max = a.max - n.min), l;
}
const Zd = 0.35;
function CD(n = Zd) {
  return n === !1 ? n = 0 : n === !0 && (n = Zd), {
    x: z0(n, "left", "right"),
    y: z0(n, "top", "bottom")
  };
}
function z0(n, a, l) {
  return {
    min: O0(n, a),
    max: O0(n, l)
  };
}
function O0(n, a) {
  return typeof n == "number" ? n : n[a] || 0;
}
const MD = /* @__PURE__ */ new WeakMap();
class AD {
  constructor(a) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = At(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = a;
  }
  start(a, { snapToCursor: l = !1, distanceThreshold: s } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const c = (b) => {
      l && this.snapToCursor(hs(b).point), this.stopAnimation();
    }, d = (b, S) => {
      const { drag: T, dragPropagation: R, onDragStart: w } = this.getProps();
      if (T && !R && (this.openDragLock && this.openDragLock(), this.openDragLock = lj(T), !this.openDragLock))
        return;
      this.latestPointerEvent = b, this.latestPanInfo = S, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Fn((O) => {
        let B = this.getAxisMotionValue(O).get() || 0;
        if (Xn.test(B)) {
          const { projection: L } = this.visualElement;
          if (L && L.layout) {
            const V = L.layout.layoutBox[O];
            V && (B = Xt(V) * (parseFloat(B) / 100));
          }
        }
        this.originPoint[O] = B;
      }), w && tt.update(() => w(b, S), !1, !0), Pd(this.visualElement, "transform");
      const { animationState: D } = this.visualElement;
      D && D.setActive("whileDrag", !0);
    }, h = (b, S) => {
      this.latestPointerEvent = b, this.latestPanInfo = S;
      const { dragPropagation: T, dragDirectionLock: R, onDirectionLock: w, onDrag: D } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: O } = S;
      if (R && this.currentDirection === null) {
        this.currentDirection = DD(O), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", S.point, O), this.updateAxis("y", S.point, O), this.visualElement.render(), D && tt.update(() => D(b, S), !1, !0);
    }, p = (b, S) => {
      this.latestPointerEvent = b, this.latestPanInfo = S, this.stop(b, S), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: b } = this.getProps();
      (b || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: y } = this.getProps();
    this.panSession = new H1(a, {
      onSessionStart: c,
      onStart: d,
      onMove: h,
      onSessionEnd: p,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: y,
      distanceThreshold: s,
      contextWindow: B1(this.visualElement),
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
    const { velocity: d } = o;
    this.startAnimation(d);
    const { onDragEnd: h } = this.getProps();
    h && tt.postRender(() => h(s, o));
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
    if (!s || !Ho(a, o, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(a);
    let d = this.originPoint[a] + s[a];
    this.constraints && this.constraints[a] && (d = xD(d, this.constraints[a], this.elastic[a])), c.set(d);
  }
  resolveConstraints() {
    const { dragConstraints: a, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    a && Al(a) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : a && s ? this.constraints = ED(s.layoutBox, a) : this.constraints = !1, this.elastic = CD(l), o !== this.constraints && !Al(a) && s && this.constraints && !this.hasMutatedConstraints && Fn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = wD(s.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: a, onMeasureDragConstraints: l } = this.getProps();
    if (!a || !Al(a))
      return !1;
    const s = a.current;
    Bi(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: o } = this.visualElement;
    if (!o || !o.layout)
      return !1;
    const c = Oj(s, o.root, this.visualElement.getTransformPagePoint());
    let d = TD(o.layout.layoutBox, c);
    if (l) {
      const h = l(Dj(d));
      this.hasMutatedConstraints = !!h, h && (d = a1(h));
    }
    return d;
  }
  startAnimation(a) {
    const { drag: l, dragMomentum: s, dragElastic: o, dragTransition: c, dragSnapToOrigin: d, onDragTransitionEnd: h } = this.getProps(), p = this.constraints || {}, m = Fn((y) => {
      if (!Ho(y, l, this.currentDirection))
        return;
      let b = p && p[y] || {};
      (d === !0 || d === y) && (b = { min: 0, max: 0 });
      const S = o ? 200 : 1e6, T = o ? 40 : 1e7, R = {
        type: "inertia",
        velocity: s ? a[y] : 0,
        bounceStiffness: S,
        bounceDamping: T,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...c,
        ...b
      };
      return this.startAxisValueAnimation(y, R);
    });
    return Promise.all(m).then(h);
  }
  startAxisValueAnimation(a, l) {
    const s = this.getAxisMotionValue(a);
    return Pd(this.visualElement, a), s.start(zh(a, s, 0, l, this.visualElement, !1));
  }
  stopAnimation() {
    Fn((a) => this.getAxisMotionValue(a).stop());
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
    Fn((l) => {
      const { drag: s } = this.getProps();
      if (!Ho(l, s, this.currentDirection))
        return;
      const { projection: o } = this.visualElement, c = this.getAxisMotionValue(l);
      if (o && o.layout) {
        const { min: d, max: h } = o.layout.layoutBox[l], p = c.get() || 0;
        c.set(a[l] - rt(d, h, 0.5) + p);
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
    if (!Al(l) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    Fn((d) => {
      const h = this.getAxisMotionValue(d);
      if (h && this.constraints !== !1) {
        const p = h.get();
        o[d] = RD({ min: p, max: p }, this.constraints[d]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), Fn((d) => {
      if (!Ho(d, a, null))
        return;
      const h = this.getAxisMotionValue(d), { min: p, max: m } = this.constraints[d];
      h.set(rt(p, m, o[d]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    MD.set(this.visualElement, this);
    const a = this.visualElement.current, l = Qr(a, "pointerdown", (m) => {
      const { drag: y, dragListener: b = !0 } = this.getProps(), S = m.target, T = S !== a && fj(S);
      y && b && !T && this.start(m);
    });
    let s;
    const o = () => {
      const { dragConstraints: m } = this.getProps();
      Al(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = jD(a, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, d = c.addEventListener("measure", o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), tt.read(o);
    const h = ns(window, "resize", () => this.scalePositionWithinConstraints()), p = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: y }) => {
      this.isDragging && y && (Fn((b) => {
        const S = this.getAxisMotionValue(b);
        S && (this.originPoint[b] += m[b].translate, S.set(S.get() + m[b].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), l(), d(), p && p(), s && s();
    };
  }
  getProps() {
    const a = this.visualElement.getProps(), { drag: l = !1, dragDirectionLock: s = !1, dragPropagation: o = !1, dragConstraints: c = !1, dragElastic: d = Zd, dragMomentum: h = !0 } = a;
    return {
      ...a,
      drag: l,
      dragDirectionLock: s,
      dragPropagation: o,
      dragConstraints: c,
      dragElastic: d,
      dragMomentum: h
    };
  }
}
function _0(n) {
  let a = !0;
  return () => {
    if (a) {
      a = !1;
      return;
    }
    n();
  };
}
function jD(n, a, l) {
  const s = kv(n, _0(l)), o = kv(a, _0(l));
  return () => {
    s(), o();
  };
}
function Ho(n, a, l) {
  return (a === !0 || a === n) && (l === null || l === n);
}
function DD(n, a = 10) {
  let l = null;
  return Math.abs(n.y) > a ? l = "y" : Math.abs(n.x) > a && (l = "x"), l;
}
class ND extends si {
  constructor(a) {
    super(a), this.removeGroupControls = Rn, this.removeListeners = Rn, this.controls = new AD(a);
  }
  mount() {
    const { dragControls: a } = this.node.getProps();
    a && (this.removeGroupControls = a.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Rn;
  }
  update() {
    const { dragControls: a } = this.node.getProps(), { dragControls: l } = this.node.prevProps || {};
    a !== l && (this.removeGroupControls(), a && (this.removeGroupControls = a.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const hd = (n) => (a, l) => {
  n && tt.update(() => n(a, l), !1, !0);
};
class zD extends si {
  constructor() {
    super(...arguments), this.removePointerDownListener = Rn;
  }
  onPointerDown(a) {
    this.session = new H1(a, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: B1(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: a, onPanStart: l, onPan: s, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: hd(a),
      onStart: hd(l),
      onMove: hd(s),
      onEnd: (c, d) => {
        delete this.session, o && tt.postRender(() => o(c, d));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Qr(this.node.current, "pointerdown", (a) => this.onPointerDown(a));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let md = !1;
class OD extends x.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: a, layoutGroup: l, switchLayoutGroup: s, layoutId: o } = this.props, { projection: c } = a;
    c && (l.group && l.group.add(c), s && s.register && o && s.register(c), md && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), tu.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(a) {
    const { layoutDependency: l, visualElement: s, drag: o, isPresent: c } = this.props, { projection: d } = s;
    return d && (d.isPresent = c, a.layoutDependency !== l && d.setOptions({
      ...d.options,
      layoutDependency: l
    }), md = !0, o || a.layoutDependency !== l || l === void 0 || a.isPresent !== c ? d.willUpdate() : this.safeToRemove(), a.isPresent !== c && (c ? d.promote() : d.relegate() || tt.postRender(() => {
      const h = d.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: a, layoutAnchor: l } = this.props, { projection: s } = a;
    s && (s.options.layoutAnchor = l, s.root.didUpdate(), Uh.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: a, layoutGroup: l, switchLayoutGroup: s } = this.props, { projection: o } = a;
    md = !0, o && (o.scheduleCheckAfterUnmount(), l && l.group && l.group.remove(o), s && s.deregister && s.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: a } = this.props;
    a && a();
  }
  render() {
    return null;
  }
}
function k1(n) {
  const [a, l] = w1(), s = x.useContext(vh);
  return v.jsx(OD, { ...n, layoutGroup: s, switchLayoutGroup: x.useContext(z1), isPresent: a, safeToRemove: l });
}
const _D = {
  pan: {
    Feature: zD
  },
  drag: {
    Feature: ND,
    ProjectionNode: R1,
    MeasureLayout: k1
  }
};
function L0(n, a, l) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", l === "Start");
  const o = "onHover" + l, c = s[o];
  c && tt.postRender(() => c(a, hs(a)));
}
class LD extends si {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = sj(a, (l, s) => (L0(this.node, s, "Start"), (o) => L0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class UD extends si {
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
    this.unmount = cs(ns(this.node.current, "focus", () => this.onFocus()), ns(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function U0(n, a, l) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", l === "Start");
  const o = "onTap" + (l === "End" ? "" : l), c = s[o];
  c && tt.postRender(() => c(a, hs(a)));
}
class VD extends si {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = hj(a, (o, c) => (U0(this.node, c, "Start"), (d, { success: h }) => U0(this.node, d, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Jd = /* @__PURE__ */ new WeakMap(), pd = /* @__PURE__ */ new WeakMap(), BD = (n) => {
  const a = Jd.get(n.target);
  a && a(n);
}, HD = (n) => {
  n.forEach(BD);
};
function qD({ root: n, ...a }) {
  const l = n || document;
  pd.has(l) || pd.set(l, {});
  const s = pd.get(l), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(HD, { root: n, ...a })), s[o];
}
function kD(n, a, l) {
  const s = qD(a);
  return Jd.set(n, l), s.observe(n), () => {
    Jd.delete(n), s.unobserve(n);
  };
}
const PD = {
  some: 0,
  all: 1
};
class YD extends si {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: l, margin: s, amount: o = "some", once: c } = a, d = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : PD[o]
    }, h = (p) => {
      const { isIntersecting: m } = p;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: y, onViewportLeave: b } = this.node.getProps(), S = m ? y : b;
      S && S(p);
    };
    this.stopObserver = kD(this.node.current, d, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(GD(a, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function GD({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (l) => n[l] !== a[l];
}
const P1 = {
  inView: {
    Feature: YD
  },
  tap: {
    Feature: VD
  },
  focus: {
    Feature: UD
  },
  hover: {
    Feature: LD
  }
}, FD = {
  layout: {
    ProjectionNode: R1,
    MeasureLayout: k1
  }
}, $D = {
  ...V1,
  ...P1,
  ..._D,
  ...FD
}, XD = /* @__PURE__ */ _1($D, U1), Y1 = {
  renderer: U1,
  ...V1,
  ...P1
};
function KD() {
  !kh.current && e1();
  const [n] = x.useState(fu.current);
  return n;
}
const qr = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function QD({ vector: n, pulseKey: a, size: l = 220 }) {
  const s = KD(), o = l / 2, c = l / 2, d = l / 2 - 28, h = qr.length, p = qr.map((b, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / h, R = Math.max(0, Math.min(1, n[S] ?? 0));
    return { x: o + Math.cos(T) * d * R, y: c + Math.sin(T) * d * R };
  }), m = qr.map((b, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / h;
    return { x: o + Math.cos(T) * d, y: c + Math.sin(T) * d, angle: T };
  }), y = p.map((b) => `${b.x.toFixed(2)},${b.y.toFixed(2)}`).join(" ");
  return /* @__PURE__ */ v.jsxs(
    "svg",
    {
      width: l,
      height: l,
      viewBox: `0 0 ${l} ${l}`,
      role: "img",
      "aria-label": "Emotion vector radar",
      children: [
        /* @__PURE__ */ v.jsxs("g", { stroke: "currentColor", strokeOpacity: 0.18, fill: "none", children: [
          [0.25, 0.5, 0.75, 1].map((b) => /* @__PURE__ */ v.jsx(
            "polygon",
            {
              points: m.map((S) => `${o + (S.x - o) * b},${c + (S.y - c) * b}`).join(" ")
            },
            b
          )),
          m.map((b, S) => /* @__PURE__ */ v.jsx("line", { x1: o, y1: c, x2: b.x, y2: b.y }, S))
        ] }),
        /* @__PURE__ */ v.jsx(
          XD.polygon,
          {
            points: y,
            fill: "currentColor",
            fillOpacity: 0.32,
            stroke: "currentColor",
            strokeWidth: 1.5,
            initial: s || a === void 0 ? !1 : { scale: 0.92, opacity: 0.2 },
            animate: { scale: 1, opacity: 1 },
            style: { transformOrigin: `${o}px ${c}px` },
            transition: s ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
          },
          a ?? "static"
        ),
        m.map((b, S) => /* @__PURE__ */ v.jsx(
          "text",
          {
            x: o + Math.cos(b.angle) * (d + 16),
            y: c + Math.sin(b.angle) * (d + 16) + 3,
            textAnchor: "middle",
            fontSize: 10,
            fill: "currentColor",
            opacity: 0.72,
            children: qr[S]
          },
          qr[S]
        ))
      ]
    }
  );
}
const ID = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function ZD({ vector: n, onChange: a, disabled: l = !1 }) {
  const s = (o, c) => {
    const d = Math.max(0, Math.min(1, Number.isFinite(c) ? c : 0)), h = [...n];
    h[o] = d, a(h);
  };
  return /* @__PURE__ */ v.jsx("div", { className: PC, role: "group", "aria-label": "Emotion axes", children: ID.map((o, c) => /* @__PURE__ */ v.jsxs("div", { className: YC, children: [
    /* @__PURE__ */ v.jsx("label", { htmlFor: `emo-slider-${c}`, className: Qb, children: o }),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        id: `emo-slider-${c}`,
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
        value: n[c] ?? 0,
        disabled: l,
        onChange: (d) => s(c, Number(d.currentTarget.value)),
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": n[c] ?? 0,
        className: Ib
      }
    ),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        type: "number",
        min: 0,
        max: 1,
        step: 0.01,
        value: Number((n[c] ?? 0).toFixed(2)),
        disabled: l,
        onChange: (d) => s(c, Number(d.currentTarget.value)),
        className: Zb,
        "aria-label": `${o} numeric value`
      }
    )
  ] }, o)) });
}
const JD = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
], G1 = [0, 0, 0, 0, 0, 0, 0, 0], WD = `Per-line overrides (inside the [Char|…] tag):

  [Bob|emotion_vector:happy=0.7,surprised=0.2]  text…
  [Alice|qwen:Friendly teen voice]              text…
  [Carol:happy_sarah]                           text…   (legacy compat ref)

Precedence (highest wins): inline → legacy compat ref → mapping default → global panel.
Global alpha applies to every line unless a mapping overrides it.`;
function eN({ value: n, onChange: a, deploymentId: l }) {
  const s = n.mode ?? "none", o = tN(n.vector), c = n.emotionAlpha ?? 1, [d, h] = x.useState([]), [p, m] = x.useState(null), [y, b] = x.useState(""), [S, T] = x.useState(""), [R, w] = x.useState(0), [D, O] = x.useState(!1), B = x.useRef(!0);
  x.useEffect(() => (B.current = !0, () => {
    B.current = !1;
  }), []), x.useEffect(() => {
    let J = !1;
    return m(null), OC(l).then((P) => {
      J || h(V0(P.presets));
    }).catch((P) => {
      J || m(yd(P));
    }), () => {
      J = !0;
    };
  }, [l]);
  const L = x.useMemo(
    () => d.find((J) => J.presetId === S) ?? null,
    [d, S]
  ), V = (J) => {
    a({ ...n, mode: J });
  }, X = (J) => {
    a({ ...n, mode: "emotion_vector", vector: J }), L && !aN(L.vector, J) && T("");
  }, K = (J) => {
    const P = Math.max(0, Math.min(1, Number.isFinite(J) ? J : 1));
    a({ ...n, emotionAlpha: P });
  }, ee = (J) => {
    const P = d.find((le) => le.presetId === J);
    P && (T(J), a({ ...n, mode: "emotion_vector", vector: P.vector }), w((le) => le + 1));
  }, A = async () => {
    const J = y.trim();
    if (J) {
      O(!0), m(null);
      try {
        const P = await _C(l, J, o);
        if (!B.current) return;
        h((le) => V0([P, ...le.filter((Z) => Z.presetId !== P.presetId)])), T(P.presetId), b(""), w((le) => le + 1);
      } catch (P) {
        B.current && m(yd(P));
      } finally {
        B.current && O(!1);
      }
    }
  }, Q = async (J) => {
    const P = d;
    h((le) => le.filter((Z) => Z.presetId !== J)), S === J && T("");
    try {
      await LC(l, J);
    } catch (le) {
      B.current && (h(P), m(yd(le)));
    }
  }, te = () => X(G1), ce = () => {
    const J = Array.from({ length: 8 }, () => Math.round(Math.random() * 100) / 100);
    X(J), w((P) => P + 1);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: UC, children: [
    /* @__PURE__ */ v.jsxs("div", { className: VC, children: [
      /* @__PURE__ */ v.jsx(QD, { vector: o, pulseKey: R }),
      /* @__PURE__ */ v.jsx("span", { className: Jf, children: iN(s, L?.presetName) })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: BC, children: [
      /* @__PURE__ */ v.jsx("div", { className: HC, role: "radiogroup", "aria-label": "Emotion source", children: JD.map((J) => /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === J.id,
          className: s === J.id ? kC : qC,
          onClick: () => V(J.id),
          children: J.label
        },
        J.id
      )) }),
      s === "emotion_vector" && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsxs("div", { className: GC, children: [
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              className: FC,
              value: S,
              onChange: (J) => ee(J.currentTarget.value),
              "aria-label": "Load preset",
              children: [
                /* @__PURE__ */ v.jsx("option", { value: "", children: "— Load preset —" }),
                d.map((J) => /* @__PURE__ */ v.jsx("option", { value: J.presetId, children: J.presetName }, J.presetId))
              ]
            }
          ),
          S && /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              className: XC,
              onClick: () => void Q(S),
              disabled: D,
              children: "Delete preset"
            }
          ),
          /* @__PURE__ */ v.jsx("button", { type: "button", className: vv, onClick: te, children: "Reset" }),
          /* @__PURE__ */ v.jsx("button", { type: "button", className: vv, onClick: ce, children: "Random" })
        ] }),
        /* @__PURE__ */ v.jsx(ZD, { vector: o, onChange: X }),
        /* @__PURE__ */ v.jsxs(
          "form",
          {
            className: IC,
            onSubmit: (J) => {
              J.preventDefault(), A();
            },
            children: [
              /* @__PURE__ */ v.jsx(
                "input",
                {
                  type: "text",
                  className: ZC,
                  value: y,
                  placeholder: "Name current vector",
                  onChange: (J) => b(J.currentTarget.value),
                  maxLength: 120,
                  "aria-label": "Preset name"
                }
              ),
              /* @__PURE__ */ v.jsx(
                "button",
                {
                  type: "submit",
                  className: $C,
                  disabled: D || y.trim().length === 0,
                  children: "Save preset"
                }
              )
            ]
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ v.jsxs("label", { children: [
        /* @__PURE__ */ v.jsxs("span", { className: Jf, children: [
          "Qwen template — use ",
          "{seg}",
          " for the line text."
        ] }),
        /* @__PURE__ */ v.jsx(
          "textarea",
          {
            className: QC,
            value: n.qwenTemplate ?? "",
            onChange: (J) => a({ ...n, mode: "qwen_template", qwenTemplate: J.currentTarget.value }),
            rows: 4
          }
        )
      ] }),
      s === "audio_ref" && /* @__PURE__ */ v.jsx("p", { className: Jf, children: "Audio references are attached per character in the mapping editor — the global panel only toggles the mode." }),
      s !== "none" && /* @__PURE__ */ v.jsxs("div", { className: KC, children: [
        /* @__PURE__ */ v.jsx("span", { className: Qb, children: "alpha" }),
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: c,
            className: Ib,
            onChange: (J) => K(Number(J.currentTarget.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "number",
            min: 0,
            max: 1,
            step: 0.01,
            value: Number(c.toFixed(2)),
            className: Zb,
            onChange: (J) => K(Number(J.currentTarget.value)),
            "aria-label": "Emotion alpha numeric"
          }
        )
      ] }),
      p && /* @__PURE__ */ v.jsx("p", { className: JC, children: p }),
      /* @__PURE__ */ v.jsx("pre", { className: WC, children: WD })
    ] })
  ] });
}
function tN(n) {
  return !n || n.length !== 8 ? [...G1] : n.map((a) => nN(a));
}
function nN(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function aN(n, a) {
  for (let l = 0; l < 8; l += 1) {
    const s = n[l] ?? 0, o = a[l] ?? 0;
    if (Math.abs(s - o) > 1e-6) return !1;
  }
  return !0;
}
function V0(n) {
  return [...n].sort((a, l) => l.updatedAt - a.updatedAt);
}
function iN(n, a) {
  switch (n) {
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
function yd(n) {
  return n instanceof ki ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
const gd = [
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
];
function lN({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: l,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: c,
  generation: d,
  onGenerationChange: h
}) {
  const p = (y, b) => {
    h({ ...d, [y]: b });
  }, m = gd.find((y) => y.id === o) ?? gd[0];
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsxs("label", { className: Wa, children: [
      /* @__PURE__ */ v.jsx("span", { className: en, children: "Format" }),
      /* @__PURE__ */ v.jsxs("select", { value: n, onChange: (y) => a(y.currentTarget.value), children: [
        /* @__PURE__ */ v.jsx("option", { value: "mp3", children: "mp3" }),
        /* @__PURE__ */ v.jsx("option", { value: "wav", children: "wav" }),
        /* @__PURE__ */ v.jsx("option", { value: "flac", children: "flac" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("label", { className: Wa, children: [
      /* @__PURE__ */ v.jsx("span", { className: en, children: "Speed" }),
      /* @__PURE__ */ v.jsx(
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
      /* @__PURE__ */ v.jsxs("output", { children: [
        l.toFixed(2),
        "×"
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs(
      "div",
      {
        className: Wa,
        role: "radiogroup",
        "aria-label": "Cache policy",
        children: [
          /* @__PURE__ */ v.jsx("span", { className: en, children: "Cache" }),
          gd.map((y) => /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": o === y.id,
              className: o === y.id ? lu : ii,
              onClick: () => c(y.id),
              title: y.help,
              children: y.label
            },
            y.id
          ))
        ]
      }
    ),
    /* @__PURE__ */ v.jsx("p", { className: en, "aria-live": "polite", children: m.help }),
    /* @__PURE__ */ v.jsxs("label", { className: Wa, children: [
      /* @__PURE__ */ v.jsx("span", { className: en, children: "Temperature" }),
      /* @__PURE__ */ v.jsx(
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
    /* @__PURE__ */ v.jsxs("label", { className: Wa, children: [
      /* @__PURE__ */ v.jsx("span", { className: en, children: "Top-p" }),
      /* @__PURE__ */ v.jsx(
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
    /* @__PURE__ */ v.jsxs("label", { className: Wa, children: [
      /* @__PURE__ */ v.jsx("span", { className: en, children: "Seed" }),
      /* @__PURE__ */ v.jsx(
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
const rN = ["cancelled", "failed", "partial"];
function sN({ runs: n, deploymentId: a }) {
  const l = qi(), [s, o] = x.useState(null), [c, d] = x.useState(null);
  if (n.length === 0)
    return /* @__PURE__ */ v.jsx("p", { className: en, children: "No runs yet." });
  const h = async (p) => {
    o(p), d(null);
    try {
      const { runId: m } = await ph(a, p);
      l(`/${a}/runs/${m}`);
    } catch (m) {
      d(uN(m));
    } finally {
      o(null);
    }
  };
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    c && /* @__PURE__ */ v.jsx("p", { className: Jr, children: c }),
    /* @__PURE__ */ v.jsx("ul", { className: Ad, children: n.map((p) => {
      const m = rN.includes(p.status) && p.kind === "batch";
      return /* @__PURE__ */ v.jsxs("li", { children: [
        /* @__PURE__ */ v.jsxs(os, { to: `/${a}/runs/${p.runId}`, children: [
          p.kind,
          " · ",
          p.status,
          " · ",
          new Date(p.queuedAt * 1e3).toLocaleString()
        ] }),
        m && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
          " ",
          /* @__PURE__ */ v.jsx("span", { className: oN(p.status), children: "partial — resumable" }),
          " ",
          /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              className: ii,
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
function oN(n) {
  return n === "failed" ? gh : yh;
}
function uN(n) {
  return n instanceof ki ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function cN({ deploymentId: n, initialVoiceAssetId: a, onChange: l }) {
  const [s, o] = x.useState([]), [c, d] = x.useState(a ?? "");
  x.useEffect(() => {
    iu(n).then(({ voiceAssets: p }) => o(p)).catch(() => o([]));
  }, [n]);
  async function h(p) {
    const m = p.target.value || null;
    d(m ?? ""), await Vw(n, m), l?.(m);
  }
  return /* @__PURE__ */ v.jsxs("select", { value: c, onChange: h, children: [
    /* @__PURE__ */ v.jsx("option", { value: "", children: "— choose voice —" }),
    s.map((p) => /* @__PURE__ */ v.jsx("option", { value: p.voiceAssetId, children: p.displayName }, p.voiceAssetId))
  ] });
}
function fN(n) {
  const a = qi(), [l, s] = x.useState("idle"), [o, c] = x.useState(null), [d, h] = x.useState(/* @__PURE__ */ new Map()), [p, m] = x.useState(null), [y, b] = x.useState(null), S = x.useRef(null);
  x.useEffect(() => () => {
    S.current?.();
  }, []);
  const T = x.useCallback(async () => {
    s("starting"), m(null), h(/* @__PURE__ */ new Map()), b(null);
    try {
      const K = await Yw(n.deploymentId, n.createPayload);
      c(K.runId), s("running"), S.current?.(), S.current = gv(
        n.deploymentId,
        K.runId,
        (ee) => B0(ee, h, s, b, n.deploymentId, K.runId),
        () => s("error")
      );
    } catch (K) {
      s("error"), m(vd(K));
    }
  }, [n.deploymentId, n.createPayload]), R = x.useCallback(async () => {
    if (o)
      try {
        await Gw(n.deploymentId, o);
      } catch (K) {
        m(vd(K));
      }
  }, [n.deploymentId, o]), w = Array.from(d.values()).sort((K, ee) => K.globalIndex - ee.globalIndex), D = l === "starting" || l === "running", O = y?.status === "partial", B = w.filter((K) => K.status === "failed"), L = (() => {
    if (l !== "terminal" || B.length === 0) return null;
    const K = /* @__PURE__ */ new Map();
    for (const te of B) {
      const ce = te.failureCategory ?? "unknown";
      K.set(ce, (K.get(ce) ?? 0) + 1);
    }
    let ee = "unknown", A = 0;
    for (const [te, ce] of K)
      ce > A && (ee = te, A = ce);
    const Q = w.length;
    return { category: ee, count: A, total: Q };
  })(), V = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, X = p?.toLowerCase().includes("unmapped") ?? !1;
  return /* @__PURE__ */ v.jsxs("div", { children: [
    p && /* @__PURE__ */ v.jsxs(
      "div",
      {
        className: Jr,
        role: "alert",
        "aria-live": "assertive",
        style: {
          marginBottom: 12,
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          fontSize: "0.95rem",
          lineHeight: 1.45
        },
        children: [
          /* @__PURE__ */ v.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ v.jsx("span", { children: p }),
          X && /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              className: ii,
              onClick: () => a(`/${n.deploymentId}/mappings`),
              style: { alignSelf: "flex-start" },
              children: "Open Mappings →"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: Wa, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: lu,
          disabled: !n.canGenerate || D,
          onClick: T,
          children: l === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: Fb,
          disabled: !D,
          onClick: R,
          children: "Cancel"
        }
      )
    ] }),
    L && /* @__PURE__ */ v.jsxs("div", { className: Jr, role: "alert", children: [
      /* @__PURE__ */ v.jsxs("strong", { children: [
        "Run failed — ",
        L.count,
        " of ",
        L.total,
        " segments failed with ",
        /* @__PURE__ */ v.jsx("code", { children: L.category })
      ] }),
      V[L.category] && /* @__PURE__ */ v.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: V[L.category] })
    ] }),
    y?.exportArtifactRef && /* @__PURE__ */ v.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${y.exportArtifactRef}/download`,
        download: !0,
        className: ii,
        children: "Download ZIP"
      }
    ),
    O && y && /* @__PURE__ */ v.jsxs("div", { className: $b, style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ v.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: ii,
          onClick: async () => {
            try {
              const K = await ph(n.deploymentId, y.runId);
              c(K.runId), h(/* @__PURE__ */ new Map()), b(null), s("running"), S.current?.(), S.current = gv(
                n.deploymentId,
                K.runId,
                (ee) => B0(ee, h, s, b, n.deploymentId, K.runId),
                () => s("error")
              );
            } catch (K) {
              m(vd(K)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    w.length > 0 && /* @__PURE__ */ v.jsxs("table", { className: MC, children: [
      /* @__PURE__ */ v.jsx("thead", { children: /* @__PURE__ */ v.jsxs("tr", { children: [
        /* @__PURE__ */ v.jsx("th", { className: Za, children: "#" }),
        /* @__PURE__ */ v.jsx("th", { className: Za, children: "Status" }),
        /* @__PURE__ */ v.jsx("th", { className: Za, children: "Duration" }),
        /* @__PURE__ */ v.jsx("th", { className: Za, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ v.jsx("tbody", { children: w.map((K) => /* @__PURE__ */ v.jsxs("tr", { className: AC, children: [
        /* @__PURE__ */ v.jsx("td", { className: Za, children: K.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ v.jsx("td", { className: Za, children: /* @__PURE__ */ v.jsx("span", { className: dN(K.status), children: K.status }) }),
        /* @__PURE__ */ v.jsx("td", { className: Za, children: K.durationMs ? `${K.durationMs} ms` : "—" }),
        /* @__PURE__ */ v.jsx("td", { className: Za, children: K.failureCategory ?? "" })
      ] }, K.globalIndex)) })
    ] })
  ] });
}
async function B0(n, a, l, s, o, c) {
  switch (n.type) {
    case "segment_started":
      a((d) => {
        const h = new Map(d);
        return h.set(n.globalIndex, { globalIndex: n.globalIndex, status: "running" }), h;
      });
      return;
    case "segment_completed":
      a((d) => {
        const h = new Map(d);
        return h.set(n.globalIndex, {
          globalIndex: n.globalIndex,
          status: "completed",
          durationMs: n.durationMs
        }), h;
      });
      return;
    case "segment_failed":
      a((d) => {
        const h = new Map(d);
        return h.set(n.globalIndex, {
          globalIndex: n.globalIndex,
          status: "failed",
          failureCategory: n.failureCategory
        }), h;
      });
      return;
    case "run_terminal":
      l("terminal");
      try {
        const d = await mh(o, c);
        s(d);
      } catch {
      }
      return;
  }
}
function dN(n) {
  switch (n) {
    case "completed":
      return Kb;
    case "running":
      return yh;
    case "failed":
      return gh;
    default:
      return Xb;
  }
}
function vd(n) {
  return n instanceof ki || n instanceof Error ? n.message : "unknown error";
}
function hN(n) {
  const a = qi(), { attributions: l, unresolved: s, predictedFilenames: o } = x.useMemo(
    () => mN(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  );
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsx(
      "textarea",
      {
        className: CC,
        value: n.value,
        onChange: (c) => n.onChange(c.currentTarget.value),
        placeholder: `[Bob] Hey there
[Alice] Hello
...`,
        "aria-label": "Dialogue script",
        spellCheck: !1
      }
    ),
    s.length > 0 && /* @__PURE__ */ v.jsxs("div", { className: Jr, role: "alert", children: [
      /* @__PURE__ */ v.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      s.map((c) => /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          className: ii,
          onClick: () => a(
            `/${n.deploymentId}/mappings/new?character=${encodeURIComponent(c)}`
          ),
          children: [
            "Create mapping for ",
            c
          ]
        },
        c
      ))
    ] }),
    l.length > 0 && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("span", { className: en, children: "Parsed lines" }),
      /* @__PURE__ */ v.jsx("ul", { className: Ad, children: l.map((c) => /* @__PURE__ */ v.jsxs("li", { children: [
        "#",
        c.lineNumber.toString().padStart(3, "0"),
        " [",
        c.character,
        "] ",
        c.text,
        !c.hasMapping && c.character !== "Narrator" && " — unresolved"
      ] }, c.lineNumber)) })
    ] }),
    o.length > 0 && /* @__PURE__ */ v.jsxs("div", { children: [
      /* @__PURE__ */ v.jsx("span", { className: en, children: "Predicted filenames" }),
      /* @__PURE__ */ v.jsx("ul", { className: Ad, children: o.map((c) => /* @__PURE__ */ v.jsx("li", { children: c }, c)) })
    ] })
  ] });
}
function mN(n, a, l) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Map(), h = [], p = n.split(/\r?\n/);
  let m = 0;
  return p.forEach((y, b) => {
    const S = y.trim();
    if (!S) return;
    const T = b + 1, R = S.match(s);
    let w = "Narrator", D = S;
    if (R && R.groups) {
      const V = (R.groups.body ?? "").trim(), X = (R.groups.rest ?? "").trim();
      w = ((V.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", D = X;
    }
    m += 1;
    const O = w.toLowerCase(), B = (d.get(O) ?? 0) + 1;
    d.set(O, B);
    const L = w === "Narrator" || l.has(O);
    L || c.add(w), o.push({ lineNumber: T, character: w, text: D, hasMapping: L }), h.push(
      `${m.toString().padStart(3, "0")}_${pN(w)}_${B.toString().padStart(3, "0")}.${a}`
    );
  }), {
    attributions: o,
    unresolved: Array.from(c),
    predictedFilenames: h
  };
}
function pN(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
function yN(n) {
  const a = n.workflowCustomised ?? !1, l = n.unmappableFields ?? [];
  return /* @__PURE__ */ v.jsxs("div", { className: xC, children: [
    /* @__PURE__ */ v.jsxs("header", { className: RC, children: [
      /* @__PURE__ */ v.jsx("h1", { className: wC, children: n.deployment.displayName }),
      n.header
    ] }),
    a && /* @__PURE__ */ v.jsxs("section", { className: $b, "aria-live": "polite", children: [
      /* @__PURE__ */ v.jsx("strong", { children: "Workflow customised." }),
      " ",
      l.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${l.join(", ")}.`,
      " ",
      /* @__PURE__ */ v.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: EC, children: [
      /* @__PURE__ */ v.jsxs("section", { className: Ur, "aria-label": "Dialogue script", children: [
        /* @__PURE__ */ v.jsx("h2", { className: Vr, children: "Script" }),
        n.scriptEditor
      ] }),
      /* @__PURE__ */ v.jsxs("section", { className: Ur, "aria-label": "Generation settings", children: [
        /* @__PURE__ */ v.jsx("h2", { className: Vr, children: "Settings" }),
        n.settingsPanel
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: TC, children: [
      /* @__PURE__ */ v.jsxs("section", { className: Ur, "aria-label": "Run", children: [
        /* @__PURE__ */ v.jsx("h2", { className: Vr, children: "Run" }),
        n.runPanel
      ] }),
      /* @__PURE__ */ v.jsxs("section", { className: Ur, "aria-label": "Emotion panel", children: [
        /* @__PURE__ */ v.jsx("h2", { className: Vr, children: "Emotion" }),
        n.emotionPanel
      ] }),
      /* @__PURE__ */ v.jsxs("section", { className: Ur, "aria-label": "Recent runs", children: [
        /* @__PURE__ */ v.jsx("h2", { className: Vr, children: "Recent runs" }),
        n.historyPanel
      ] })
    ] })
  ] });
}
function gN() {
  const { deployment: n, mappings: a, runs: l, workflow: s } = ss(), [o, c] = x.useState(""), [d, h] = x.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [p, m] = x.useState(n.defaultSpeedFactor ?? 1), [y, b] = x.useState({
    mode: "none",
    emotionAlpha: 1
  }), [S, T] = x.useState({}), [R, w] = x.useState("use_cache"), [D, O] = x.useState(n.defaultVoiceAssetId != null), B = x.useMemo(
    () => ({
      script: o,
      parserMode: D ? "raw_text" : "dialogue",
      outputFormat: d,
      speedFactor: p,
      globalEmotion: y,
      generation: S,
      cachePolicy: R
    }),
    [o, D, d, p, y, S, R]
  ), L = x.useMemo(() => {
    const V = /* @__PURE__ */ new Map();
    for (const X of a)
      V.set(X.characterName.toLowerCase(), X);
    return V;
  }, [a]);
  return /* @__PURE__ */ v.jsx(
    yN,
    {
      deployment: n,
      workflowCustomised: s.workflow.customised,
      unmappableFields: s.unmappableFields,
      header: /* @__PURE__ */ v.jsx(DC, { deployment: n }),
      scriptEditor: /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
          /* @__PURE__ */ v.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ v.jsx(
              "input",
              {
                type: "checkbox",
                checked: D,
                onChange: (V) => O(V.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          D && /* @__PURE__ */ v.jsx(
            cN,
            {
              deploymentId: n.deploymentId,
              initialVoiceAssetId: n.defaultVoiceAssetId ?? null
            }
          )
        ] }),
        /* @__PURE__ */ v.jsx(
          hN,
          {
            value: o,
            onChange: c,
            outputFormat: d,
            mappings: L,
            deploymentId: n.deploymentId
          }
        )
      ] }),
      emotionPanel: /* @__PURE__ */ v.jsx(
        eN,
        {
          value: y,
          onChange: b,
          deploymentId: n.deploymentId
        }
      ),
      settingsPanel: /* @__PURE__ */ v.jsx(
        lN,
        {
          outputFormat: d,
          onOutputFormatChange: h,
          speedFactor: p,
          onSpeedFactorChange: m,
          cachePolicy: R,
          onCachePolicyChange: w,
          generation: S,
          onGenerationChange: T
        }
      ),
      runPanel: /* @__PURE__ */ v.jsx(
        fN,
        {
          deploymentId: n.deploymentId,
          createPayload: B,
          canGenerate: o.trim().length > 0
        }
      ),
      historyPanel: /* @__PURE__ */ v.jsx(sN, { runs: l, deploymentId: n.deploymentId })
    }
  );
}
const H0 = 32, q0 = -30, k0 = -6, P0 = 0.5, Y0 = 2;
class Vl extends Error {
  constructor(a, l) {
    super(l), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function vN(n, a, l, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, c = `${Pi}${o}`, d = await fetch(c, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(l),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (d.status === 409) {
    const h = await d.json().catch(() => null), p = h?.error?.current_digest ?? "", m = h?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Vl(p, m);
  }
  if (!d.ok)
    throw new Error(await Mu(d, "apply"));
  return await d.json();
}
async function bN(n, a, l, s, o = {}) {
  const c = `/deployments/${encodeURIComponent(n)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(l)}/edit`, d = `${Pi}${c}`, h = await fetch(d, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (h.status === 409) {
    const p = await h.json().catch(() => null), m = p?.error?.current_digest ?? "", y = p?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Vl(m, y);
  }
  if (!h.ok)
    throw new Error(await Mu(h, "apply"));
  return await h.json();
}
async function SN(n, a, l, s = {}) {
  const o = `${Pi}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: l }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!c.ok)
    throw new Error(await Mu(c, "preview"));
  return c.blob();
}
async function xN(n, a, l, s = 50, o = {}) {
  const c = `${Pi}/audit/${encodeURIComponent(a)}/${encodeURIComponent(l)}?deploymentId=${encodeURIComponent(n)}&limit=${encodeURIComponent(String(s))}`, d = await fetch(c, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!d.ok)
    throw new Error(await Mu(d, "audit fetch"));
  return await d.json();
}
function kl() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function F1(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > H0)
    return {
      message: `Chain exceeds the maximum of ${H0} operations.`
    };
  for (const l of n.ops) {
    const s = EN(l, a);
    if (s) return s;
  }
  return null;
}
function EN(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return TN(n.id, n.start_ms, n.end_ms, a);
    case "normalize":
      return n.target_lufs < q0 || n.target_lufs > k0 ? {
        opId: n.id,
        message: `Normalize target must be between ${q0} and ${k0} LUFS.`
      } : null;
    case "speed":
      return n.factor < P0 || n.factor > Y0 ? {
        opId: n.id,
        message: `Speed factor must be between ${P0}× and ${Y0}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return n.duration_ms < 1 ? { opId: n.id, message: "Fade duration must be at least 1 ms." } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function TN(n, a, l, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : l <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && l > s ? { opId: n, message: "End extends past source duration." } : null;
}
async function Mu(n, a) {
  const l = await n.json().catch(() => null);
  return l?.error?.message ?? l?.message ?? `${a} failed: ${n.status}`;
}
const G0 = /* @__PURE__ */ new Map();
function RN(n, a) {
  const [l, s] = x.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return x.useEffect(() => {
    if (!n || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${n}::${a}`, c = G0.get(o);
    if (c) {
      s({ peaks: c, isLoading: !1, error: null });
      return;
    }
    const d = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), wN(n, a, d.signal).then((h) => {
      d.signal.aborted || (G0.set(o, h), s({ peaks: h, isLoading: !1, error: null }));
    }).catch((h) => {
      if (d.signal.aborted) return;
      const p = h instanceof Error ? h.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: p });
    }), () => d.abort();
  }, [n, a]), l;
}
async function wN(n, a, l) {
  const s = await fetch(n, { signal: l });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (l.aborted) throw new DOMException("aborted", "AbortError");
  const d = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return CN(d, a);
}
function CN(n, a) {
  const l = n.numberOfChannels, s = n.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), d = [];
  for (let h = 0; h < l; h += 1) d.push(n.getChannelData(h));
  for (let h = 0; h < a; h += 1) {
    const p = h * o, m = Math.min(s, p + o);
    let y = 0;
    for (let b = p; b < m; b += 1) {
      let S = 0;
      for (let R = 0; R < l; R += 1) {
        const w = d[R];
        w && (S += Math.abs(w[b] ?? 0));
      }
      const T = S / l;
      T > y && (y = T);
    }
    c[h] = y;
  }
  return c;
}
const F0 = "(prefers-reduced-motion: reduce)";
function MN() {
  const [n, a] = x.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(F0).matches);
  return x.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const l = window.matchMedia(F0), s = (o) => a(o.matches);
    return l.addEventListener("change", s), () => l.removeEventListener("change", s);
  }, []), n;
}
var AN = "mquzal0", jN = "mquzal1", $0 = "mquzal2", X0 = "mquzal3", K0 = "mquzal4", DN = "mquzal5", Q0 = "mquzal6", I0 = "mquzal7";
const NN = 120, zN = 720;
function $1(n) {
  const {
    audioUrl: a,
    durationMs: l,
    startMs: s,
    endMs: o,
    onChangeStart: c,
    onChangeEnd: d,
    isPlaying: h = !1,
    playbackPositionMs: p = 0,
    onSeek: m,
    width: y = zN,
    height: b = NN
  } = n, S = x.useRef(null), T = x.useRef(null), R = x.useRef(null), w = RN(a, y), D = MN();
  x.useEffect(() => {
    ON(S.current, w.peaks, y, b);
  }, [w.peaks, y, b]);
  const O = x.useCallback(
    (A) => {
      const Q = T.current?.getBoundingClientRect();
      if (!Q || Q.width <= 0) return 0;
      const te = Math.max(0, Math.min(1, (A - Q.left) / Q.width));
      return Math.round(te * l);
    },
    [l]
  );
  x.useEffect(() => {
    const A = (te) => {
      if (!R.current) return;
      const ce = O(te.clientX);
      R.current === "start" ? c(qo(ce, 0, o - 1)) : d(qo(ce, s + 1, l));
    }, Q = () => {
      R.current = null;
    };
    return window.addEventListener("pointermove", A), window.addEventListener("pointerup", Q), () => {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", Q);
    };
  }, [O, l, o, s, c, d]);
  const B = (A) => (Q) => {
    Q.preventDefault(), Q.stopPropagation(), R.current = A;
  }, L = (A) => {
    !m || A.target.closest("[data-handle]") || m(O(A.clientX));
  }, V = (A) => (Q) => {
    const te = Q.shiftKey ? 100 : Q.ctrlKey ? 1 : 10;
    let ce = 0;
    if (Q.key === "ArrowLeft") ce = -te;
    else if (Q.key === "ArrowRight") ce = te;
    else return;
    Q.preventDefault(), A === "start" ? c(qo(s + ce, 0, o - 1)) : d(qo(o + ce, s + 1, l));
  }, X = bd(s, l), K = bd(o, l), ee = bd(p, l);
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      ref: T,
      className: AN,
      style: { height: b },
      onPointerDown: L,
      children: [
        /* @__PURE__ */ v.jsx(
          "canvas",
          {
            ref: S,
            width: y,
            height: b,
            className: jN,
            "aria-label": "Audio waveform"
          }
        ),
        w.isLoading && /* @__PURE__ */ v.jsx("div", { className: I0, children: "Decoding waveform…" }),
        w.error && /* @__PURE__ */ v.jsx("div", { className: I0, role: "alert", children: w.error }),
        /* @__PURE__ */ v.jsx("div", { className: Q0, style: { left: 0, width: `${X}%` } }),
        /* @__PURE__ */ v.jsx(
          "div",
          {
            className: Q0,
            style: { left: `${K}%`, right: 0, width: `${100 - K}%` }
          }
        ),
        /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: $0,
            style: { left: `${X}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": l,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: B("start"),
            onKeyDown: V("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ v.jsx("span", { className: X0, "aria-hidden": "true" }),
              /* @__PURE__ */ v.jsx("span", { className: K0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: $0,
            style: { left: `${K}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": l,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: B("end"),
            onKeyDown: V("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ v.jsx("span", { className: X0, "aria-hidden": "true" }),
              /* @__PURE__ */ v.jsx("span", { className: K0, "aria-hidden": "true" })
            ]
          }
        ),
        h && /* @__PURE__ */ v.jsx(
          "div",
          {
            className: DN,
            style: {
              left: `${ee}%`,
              transition: D ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function bd(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function qo(n, a, l) {
  return Math.max(a, Math.min(l, n));
}
function ON(n, a, l, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, l, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = _N(n, "--color-primary", "#ba9eff");
  const d = Math.min(a.length, l);
  for (let h = 0; h < d; h += 1) {
    const p = a[h] ?? 0, m = Math.max(1, p * (s - 4));
    o.fillRect(h, c - m / 2, 1, m);
  }
}
function _N(n, a, l) {
  return getComputedStyle(n).getPropertyValue(a).trim() || l;
}
var LN = "r8lfsm0", UN = "r8lfsm1", VN = "r8lfsm2", BN = "r8lfsm3", HN = "r8lfsm4", qN = "r8lfsm5", kN = "r8lfsm6", PN = "r8lfsm7", YN = "r8lfsm8", GN = "r8lfsm9", FN = "r8lfsma", $N = "r8lfsmb";
const Z0 = -16, XN = 80, KN = 720;
function QN(n) {
  const { deploymentId: a, runId: l, utterance: s, audioUrl: o, onApplied: c, onError: d, onCancel: h } = n, p = s.durationMs ?? 0, [m, y] = x.useState(() => J0(p)), [b, S] = x.useState(!1), [T, R] = x.useState(null), [w, D] = x.useState(!1), O = x.useRef(null), B = x.useRef(null), L = x.useRef(null);
  x.useEffect(() => {
    y(J0(p)), S(!1), R(null), L.current = null;
  }, [s.utteranceId, p]), x.useEffect(() => () => B.current?.abort(), []), x.useEffect(() => {
    O.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const V = x.useCallback(
    (P) => {
      P.key === "Escape" && (P.stopPropagation(), h());
    },
    [h]
  ), X = x.useMemo(
    () => m.ops.find((P) => P.mode === "trim"),
    [m.ops]
  ), K = X?.start_ms ?? 0, ee = X?.end_ms ?? Math.max(1, p), A = x.useCallback((P, le) => {
    y((Z) => IN(Z, "trim", (z) => ({
      ...z,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(P)),
      end_ms: Math.max(Math.floor(P) + 1, Math.floor(le))
    })));
  }, []), Q = x.useCallback((P) => A(P, ee), [ee, A]), te = x.useCallback((P) => A(K, P), [K, A]), ce = x.useCallback((P) => {
    S(P), y((le) => {
      const Z = le.ops.filter((z) => z.mode !== "normalize");
      if (P) {
        const z = {
          id: kl(),
          mode: "normalize",
          target_lufs: Z0
        };
        return { ...le, ops: [...Z, z] };
      }
      return { ...le, ops: Z };
    });
  }, []), J = x.useCallback(async () => {
    const P = F1(m, p);
    if (P) {
      R(P.message);
      return;
    }
    if (R(null), w) return;
    B.current?.abort();
    const le = new AbortController();
    B.current = le, D(!0);
    try {
      const Z = L.current ?? void 0, z = await bN(
        a,
        l,
        s.utteranceId,
        Z ? { chain: m, digest_before: Z } : { chain: m },
        { signal: le.signal }
      );
      if (le.signal.aborted) return;
      L.current = z.chain_digest, c(z);
    } catch (Z) {
      if (le.signal.aborted) return;
      Z instanceof Vl && (L.current = Z.currentDigest || null);
      const z = Z instanceof Vl ? "Edit chain has changed in another tab. Reload to continue." : Z instanceof Error ? Z.message : "apply failed";
      R(z), d(z);
    } finally {
      le.signal.aborted || D(!1);
    }
  }, [m, p, w, a, l, s.utteranceId, c, d]);
  return /* @__PURE__ */ v.jsxs("div", { className: LN, ref: O, onKeyDown: V, children: [
    /* @__PURE__ */ v.jsxs("header", { className: UN, children: [
      /* @__PURE__ */ v.jsx("h4", { className: VN, children: "Edit segment" }),
      /* @__PURE__ */ v.jsxs("span", { className: BN, children: [
        "Source · ",
        ko(p)
      ] })
    ] }),
    /* @__PURE__ */ v.jsx(
      $1,
      {
        audioUrl: o,
        durationMs: Math.max(1, p),
        startMs: K,
        endMs: ee,
        onChangeStart: Q,
        onChangeEnd: te,
        height: XN,
        width: KN
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: HN, children: [
      /* @__PURE__ */ v.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ v.jsxs("span", { className: qN, children: [
        ko(K),
        " → ",
        ko(ee),
        " · ",
        ko(ee - K)
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: kN, children: /* @__PURE__ */ v.jsxs("label", { className: PN, children: [
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "checkbox",
          checked: b,
          onChange: (P) => ce(P.currentTarget.checked),
          "aria-label": "Toggle loudness normalization"
        }
      ),
      /* @__PURE__ */ v.jsxs("span", { children: [
        "Normalize to ",
        Z0.toFixed(0),
        " LUFS (broadcast-friendly)"
      ] })
    ] }) }),
    /* @__PURE__ */ v.jsxs("div", { className: YN, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: GN,
          onClick: () => void J(),
          disabled: w,
          children: w ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: FN,
          onClick: h,
          disabled: w,
          children: "Cancel"
        }
      )
    ] }),
    T && /* @__PURE__ */ v.jsx("div", { className: $N, role: "alert", "aria-live": "polite", children: T })
  ] });
}
function J0(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: kl(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function IN(n, a, l) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: kl(), mode: a };
    return { ...n, ops: [...n.ops, l(c)] };
  }
  const o = [...n.ops];
  return o[s] = l(o[s]), { ...n, ops: o };
}
function ko(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
var ZN = "jq2zyb3", JN = "jq2zyb4", WN = "jq2zyb5", ez = "jq2zyb6", tz = "jq2zyb7", nz = "jq2zyb8", az = "jq2zyb9", iz = "jq2zyba", lz = "jq2zybb", rz = { queued: "jq2zybd jq2zybc", running: "jq2zybe jq2zybc", completed: "jq2zybf jq2zybc", failed: "jq2zybg jq2zybc", cancelled: "jq2zybh jq2zybc", partial: "jq2zybi jq2zybc" }, sz = "jq2zybj", oz = "jq2zybk", uz = "jq2zybl", cz = "jq2zybm", fz = "jq2zybn jq2zybm", dz = "jq2zybo", hz = "jq2zybp", mz = "jq2zybq", pz = "jq2zybr", yz = "jq2zybs", gz = "jq2zybt", vz = "jq2zybu", bz = "jq2zybv", Sz = "jq2zybw", xz = "jq2zybx", Ez = "jq2zyby", Tz = "jq2zybz", Rz = "jq2zyb10", wz = "jq2zyb11", Cz = "jq2zyb12", Mz = "jq2zyb13", Az = "jq2zyb14", jz = "jq2zyb15", Dz = "jq2zyb16", Nz = "jq2zyb17", zz = "jq2zyb18", Oz = "jq2zyb19", _z = { queued: "jq2zyb1b jq2zyb1a", running: "jq2zyb1c jq2zyb1a", completed: "jq2zyb1d jq2zyb1a", failed: "jq2zyb1e jq2zyb1a", cancelled: "jq2zyb1f jq2zyb1a" }, Lz = "jq2zyb1g", Uz = "jq2zyb1h", W0 = "jq2zyb1i", Vz = "jq2zyb1j", Bz = "jq2zyb1k", Hz = "jq2zyb1l", qz = "jq2zyb1m";
const kz = ["cancelled", "failed", "partial"], Pz = 2600;
function Yz() {
  const { run: n } = ss(), a = qi(), [l, s] = x.useState(n), [o, c] = x.useState(!1), [d, h] = x.useState(null), [p, m] = x.useState(null), [y, b] = x.useState(null);
  x.useEffect(() => {
    s(n);
  }, [n]), x.useEffect(() => {
    if (!y) return;
    const V = setTimeout(() => b(null), Pz);
    return () => clearTimeout(V);
  }, [y]);
  const S = x.useMemo(() => $z(l), [l]), T = kz.includes(l.status) && l.kind === "batch", R = (l.exportZipStaleAt ?? null) !== null, w = async () => {
    if (l.deploymentId) {
      c(!0), h(null);
      try {
        const { runId: V } = await ph(l.deploymentId, l.runId);
        a(`/${l.deploymentId}/runs/${V}`);
      } catch (V) {
        h(Qz(V));
      } finally {
        c(!1);
      }
    }
  }, D = x.useCallback((V) => {
    m((X) => X === V ? null : V);
  }, []), O = x.useCallback(() => {
    m(null);
  }, []), B = (V, X) => {
    s((K) => Fz(K, V, X)), m(null), b("Segment edited");
  }, L = x.useCallback((V) => {
    b(V);
  }, []);
  return /* @__PURE__ */ v.jsxs("main", { className: ZN, children: [
    /* @__PURE__ */ v.jsxs("div", { className: JN, children: [
      /* @__PURE__ */ v.jsxs("header", { className: WN, children: [
        /* @__PURE__ */ v.jsxs("p", { className: ez, children: [
          l.deploymentId ? /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
            /* @__PURE__ */ v.jsx(os, { to: `/${l.deploymentId}/recipe`, className: tz, children: "← Back to recipe" }),
            /* @__PURE__ */ v.jsx("span", { className: nz, children: "·" })
          ] }) : null,
          /* @__PURE__ */ v.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: az, children: [
          /* @__PURE__ */ v.jsxs("h1", { className: iz, children: [
            Xz(l.kind),
            /* @__PURE__ */ v.jsx("span", { className: lz, children: l.runId })
          ] }),
          /* @__PURE__ */ v.jsx("span", { className: rz[l.status], children: l.status })
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("section", { className: sz, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ v.jsx(Po, { label: "Format", value: l.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ v.jsx(Po, { label: "Speed", value: `${l.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ v.jsx(
          Po,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ v.jsx(
          Po,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      T && /* @__PURE__ */ v.jsxs("section", { className: hz, "aria-label": "Resume run", children: [
        /* @__PURE__ */ v.jsxs("div", { className: mz, children: [
          /* @__PURE__ */ v.jsx("p", { className: pz, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ v.jsx("p", { className: yz, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ v.jsx(
          "button",
          {
            type: "button",
            className: gz,
            disabled: o,
            onClick: () => void w(),
            children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run"
          }
        ),
        d && /* @__PURE__ */ v.jsx("p", { className: vz, role: "alert", children: d })
      ] }),
      /* @__PURE__ */ v.jsxs("section", { className: bz, "aria-label": "Utterances", children: [
        /* @__PURE__ */ v.jsxs("div", { className: Sz, children: [
          /* @__PURE__ */ v.jsx("h2", { className: xz, children: "Utterances" }),
          S.completed > 0 && /* @__PURE__ */ v.jsxs("span", { className: Ez, children: [
            /* @__PURE__ */ v.jsx("span", { className: Tz, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ v.jsx("ul", { className: Rz, children: l.utterances.map((V) => {
          const X = p === V.utteranceId, K = V.status === "completed" && V.audioArtifactRef !== null && V.audioArtifactRef !== void 0, ee = V.derivedArtifactRef ?? V.audioArtifactRef ?? null, A = ee ? `/api/v1/artifacts/${encodeURIComponent(ee)}/download` : "", Q = (V.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ v.jsxs("li", { className: Cz, children: [
            /* @__PURE__ */ v.jsxs("div", { className: wz, children: [
              /* @__PURE__ */ v.jsxs("span", { className: jz, children: [
                "#",
                V.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ v.jsx("span", { className: Dz, title: V.characterDisplay, children: V.characterDisplay }),
              /* @__PURE__ */ v.jsx("span", { className: Nz, title: V.text, children: V.text }),
              /* @__PURE__ */ v.jsxs("span", { className: zz, children: [
                V.cacheHit && /* @__PURE__ */ v.jsx("span", { className: Oz, children: "cached" }),
                Q && /* @__PURE__ */ v.jsx("span", { className: Mz, children: "edited" }),
                V.durationMs ? /* @__PURE__ */ v.jsx("span", { children: Kz(V.durationMs) }) : null,
                /* @__PURE__ */ v.jsx("span", { className: _z[V.status], children: V.status }),
                K && /* @__PURE__ */ v.jsx(
                  "button",
                  {
                    type: "button",
                    className: Az,
                    onClick: () => D(V.utteranceId),
                    "aria-expanded": X,
                    "aria-label": X ? "Close segment editor" : "Edit segment",
                    children: X ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            X && A && l.deploymentId && /* @__PURE__ */ v.jsx(
              QN,
              {
                deploymentId: l.deploymentId,
                runId: l.runId,
                utterance: V,
                audioUrl: A,
                onApplied: (te) => B(V.utteranceId, te),
                onError: L,
                onCancel: O
              }
            )
          ] }, V.utteranceId);
        }) })
      ] }),
      Gz(l, R)
    ] }),
    y && /* @__PURE__ */ v.jsx("div", { className: qz, role: "status", "aria-live": "polite", children: y })
  ] });
}
function Gz(n, a) {
  if (!n.exportArtifactRef && !a) return null;
  const s = !!n.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ v.jsx("div", { className: Lz, children: a ? /* @__PURE__ */ v.jsxs("div", { className: Vz, children: [
    /* @__PURE__ */ v.jsx("p", { className: Bz, children: s }),
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        type: "button",
        className: Hz,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ v.jsx("span", { className: W0, children: "↻" })
        ]
      }
    )
  ] }) : n.exportArtifactRef ? /* @__PURE__ */ v.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
      download: !0,
      className: Uz,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ v.jsx("span", { className: W0, children: "↓" })
      ]
    }
  ) : null });
}
function Fz(n, a, l) {
  const s = n.utterances.map((o) => o.utteranceId !== a ? o : {
    ...o,
    derivedArtifactRef: l.derived_artifact_ref,
    durationMs: l.derived_duration_ms
  });
  return {
    ...n,
    utterances: s,
    exportZipStaleAt: n.exportZipStaleAt ?? Math.floor(Date.now() / 1e3)
  };
}
function Po({ label: n, value: a, mono: l, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: oz,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ v.jsx("span", { className: uz, children: n }),
        /* @__PURE__ */ v.jsx("span", { className: l ? fz : cz, children: a }),
        o !== void 0 && /* @__PURE__ */ v.jsx("span", { className: dz, "aria-hidden": "true" })
      ]
    }
  );
}
function $z(n) {
  const a = n.utterances.length, l = n.utterances.filter((d) => d.status === "completed").length, s = n.utterances.filter(
    (d) => d.status === "failed" || d.status === "cancelled"
  ).length, o = n.utterances.filter((d) => d.cacheHit).length, c = l > 0 ? Math.round(o / l * 100) : 0;
  return { total: a, completed: l, failed: s, cached: o, cacheRatio: c };
}
function Xz(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function Kz(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function Qz(n) {
  return n instanceof ki ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
var Iz = "pcphqj2", Zz = "pcphqj3", Jz = "pcphqj4", Wz = "pcphqj5", eO = "pcphqj6", tO = "pcphqj7", nO = "pcphqj8", aO = "pcphqj9", eb = "pcphqja", iO = "pcphqjb", tb = "pcphqjc", lO = "pcphqjd", rO = "pcphqje", sO = "pcphqjf pcphqje", oO = "pcphqjg", uO = "pcphqjh", cO = "pcphqji", fO = "pcphqjj", dO = "pcphqjk pcphqjj", hO = "pcphqjl pcphqjj", mO = "pcphqjm pcphqjj", pO = "pcphqjn", Sd = "pcphqjo", xd = "pcphqjp", yO = "pcphqjq", gO = "pcphqjr", vO = "pcphqjs", bO = "pcphqjt", SO = "pcphqju";
function xO() {
  const [n, a] = x.useState(null), [l, s] = x.useState(null);
  return x.useEffect(() => {
    let o = !1;
    const c = async () => {
      try {
        const h = await st("/runtime/queue");
        o || (a(h.entries), s(null));
      } catch (h) {
        o || s(h instanceof Error ? h.message : "Unknown error");
      }
    };
    c();
    const d = setInterval(() => void c(), 3e3);
    return () => {
      o = !0, clearInterval(d);
    };
  }, []), /* @__PURE__ */ v.jsx("main", { className: Iz, children: /* @__PURE__ */ v.jsxs("div", { className: Zz, children: [
    /* @__PURE__ */ v.jsxs("header", { className: Jz, children: [
      /* @__PURE__ */ v.jsx("p", { className: Wz, children: "Runtime" }),
      /* @__PURE__ */ v.jsxs("div", { className: eO, children: [
        /* @__PURE__ */ v.jsx("h1", { className: tO, children: "Queue" }),
        /* @__PURE__ */ v.jsx("span", { className: nO, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ v.jsx("p", { className: aO, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    l ? /* @__PURE__ */ v.jsx("section", { className: SO, role: "alert", children: l }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ v.jsx("section", { className: eb, children: /* @__PURE__ */ v.jsxs("div", { className: yO, children: [
      /* @__PURE__ */ v.jsx("span", { className: gO, children: "○" }),
      /* @__PURE__ */ v.jsx("p", { className: vO, children: "Queue is quiet" }),
      /* @__PURE__ */ v.jsx("p", { className: bO, children: "No runs are pending. Start a synthesis from a deployment's recipe surface." })
    ] }) }) : /* @__PURE__ */ v.jsx("section", { className: eb, "aria-label": "Queued runs", children: /* @__PURE__ */ v.jsx("ul", { className: iO, children: n.map((o) => {
      const c = o.position === 1;
      return /* @__PURE__ */ v.jsxs(
        "li",
        {
          className: c ? `${tb} ${lO}` : tb,
          children: [
            /* @__PURE__ */ v.jsx("span", { className: c ? sO : rO, children: o.position }),
            /* @__PURE__ */ v.jsxs("span", { className: oO, children: [
              /* @__PURE__ */ v.jsx("span", { className: uO, children: o.deploymentName ?? o.deploymentId }),
              /* @__PURE__ */ v.jsx("span", { className: cO, children: o.runId })
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: EO(o.kind), children: TO(o.kind) }),
            /* @__PURE__ */ v.jsx("span", { className: pO, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
              /* @__PURE__ */ v.jsx("span", { className: Sd, children: RO(o.etaSeconds) }),
              /* @__PURE__ */ v.jsx("span", { className: xd, children: "eta" })
            ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
              /* @__PURE__ */ v.jsx("span", { className: Sd, children: o.utteranceTotal }),
              /* @__PURE__ */ v.jsx("span", { className: xd, children: "lines" })
            ] }) : /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
              /* @__PURE__ */ v.jsx("span", { className: Sd, children: "—" }),
              /* @__PURE__ */ v.jsx("span", { className: xd, children: "pending" })
            ] }) })
          ]
        },
        o.runId
      );
    }) }) })
  ] }) });
}
function EO(n) {
  switch (n) {
    case "batch":
      return dO;
    case "test_line":
      return hO;
    case "resume":
      return mO;
    default:
      return fO;
  }
}
function TO(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function RO(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), l = n % 60;
  return l === 0 ? `${a}m` : `${a}m ${l}s`;
}
function wO() {
  const { deploymentId: n, prefillCharacterName: a } = ss(), l = qi(), [s, o] = x.useState(a), [c, d] = x.useState(""), [h, p] = x.useState("none"), [m, y] = x.useState(!1), [b, S] = x.useState(null), T = x.useRef(null);
  x.useEffect(() => {
    T.current?.scrollIntoView({ behavior: "smooth", block: "center" }), T.current?.focus();
  }, []);
  const R = async (w) => {
    w.preventDefault(), y(!0), S(null);
    try {
      await Gb(n, {
        characterName: s,
        speakerVoiceAssetId: c,
        defaultEmotionMode: h
      }), l(`/${n}/recipe`);
    } catch (D) {
      S(D instanceof Error ? D.message : "failed");
    } finally {
      y(!1);
    }
  };
  return /* @__PURE__ */ v.jsxs("main", { children: [
    /* @__PURE__ */ v.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ v.jsxs("form", { onSubmit: R, children: [
      /* @__PURE__ */ v.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ v.jsx(
          "input",
          {
            ref: T,
            value: s,
            onChange: (w) => o(w.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ v.jsxs("label", { children: [
        "Speaker voice asset id",
        /* @__PURE__ */ v.jsx(
          "input",
          {
            value: c,
            onChange: (w) => d(w.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ v.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ v.jsxs("select", { value: h, onChange: (w) => p(w.currentTarget.value), children: [
          /* @__PURE__ */ v.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ v.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ v.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ v.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ v.jsx("button", { type: "submit", disabled: m, children: "Save mapping" }),
      b && /* @__PURE__ */ v.jsx("p", { role: "alert", children: b })
    ] })
  ] });
}
var CO = "_1oor31e0", MO = "_1oor31e1", AO = "_1oor31e2", jO = "_1oor31e3", DO = "_1oor31e4", NO = "_1oor31e5", zO = "_1oor31e6", OO = "_1oor31e7", _O = "_1oor31e8", LO = "_1oor31e9";
const UO = 8;
function VO(n) {
  const { entries: a, loading: l, error: s } = n;
  return /* @__PURE__ */ v.jsxs("div", { className: CO, "aria-busy": !!l, children: [
    s && /* @__PURE__ */ v.jsx("div", { className: _O, role: "alert", children: s }),
    l && !s && /* @__PURE__ */ v.jsx("div", { className: LO, "aria-live": "polite", children: "Loading edit history…" }),
    !l && !s && a.length === 0 && /* @__PURE__ */ v.jsx("div", { className: OO, children: "No edits yet" }),
    !l && !s && a.length > 0 && /* @__PURE__ */ v.jsx("ul", { className: MO, children: a.map((o) => /* @__PURE__ */ v.jsxs("li", { className: AO, children: [
      /* @__PURE__ */ v.jsx("span", { className: jO, children: HO(o.recorded_at) }),
      /* @__PURE__ */ v.jsx("span", { className: DO, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ v.jsx("span", { className: NO, title: o.digest_after, children: BO(o.digest_after) }),
      /* @__PURE__ */ v.jsx("span", { className: zO, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function BO(n) {
  return n ? `${n.slice(0, UO)}…` : "—";
}
function HO(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var nb = "_1c63kaw0", qO = "_1c63kaw1", kO = "_1c63kaw2", PO = "_1c63kaw3", YO = "_1c63kaw4", GO = "_1c63kaw5", FO = "_1c63kaw6", $O = "_1c63kaw7";
function XO({ chain: n, onRemoveOp: a }) {
  return n.ops.length === 0 ? /* @__PURE__ */ v.jsx("div", { className: nb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ v.jsx("span", { className: qO, children: "No edits yet" }) }) : /* @__PURE__ */ v.jsx("ol", { className: nb, "data-testid": "edit-chain-list", children: n.ops.map((l, s) => /* @__PURE__ */ v.jsxs("li", { className: kO, children: [
    /* @__PURE__ */ v.jsxs("span", { className: PO, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ v.jsxs("span", { className: YO, children: [
      /* @__PURE__ */ v.jsx("span", { className: GO, children: ab(l) }),
      /* @__PURE__ */ v.jsx("span", { className: FO, children: KO(l) })
    ] }),
    /* @__PURE__ */ v.jsx(
      "button",
      {
        type: "button",
        className: $O,
        onClick: () => a(l.id),
        "aria-label": `Remove ${ab(l)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, l.id)) });
}
function ab(n) {
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
  }
}
function KO(n) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${ib(n.start_ms)} → ${ib(n.end_ms)}`;
    case "normalize":
      return `${n.target_lufs.toFixed(1)} LUFS`;
    case "speed":
      return `${n.factor.toFixed(2)}×`;
    case "fade_in":
      return `${n.duration_ms} ms in`;
    case "fade_out":
      return `${n.duration_ms} ms out`;
  }
}
function ib(n) {
  return !Number.isFinite(n) || n < 0 ? "0.00s" : `${(n / 1e3).toFixed(2)}s`;
}
var QO = "_1o3ytop0", IO = "_1o3ytop1", ZO = "_1o3ytop2", JO = "_1o3ytop3", Ed = "_1o3ytop4", WO = "_1o3ytop5", e3 = "_1o3ytop6", lb = "_1o3ytop7", t3 = "_1o3ytop8", n3 = "_1o3ytope", a3 = "_1o3ytopf", i3 = "_1o3ytopg", l3 = "_1o3ytoph", r3 = "_1o3ytopi", s3 = "_1o3ytopj", o3 = "_1o3ytopk", u3 = "_1o3ytopl", c3 = "_1o3ytopm", f3 = "_1o3ytopn", d3 = "_1o3ytopo", h3 = "_1o3ytopp";
const rb = -16;
function m3(n) {
  const { voiceAsset: a, deploymentId: l, onChainPersisted: s, onError: o } = n, c = a.durationMs ?? 0, d = x.useMemo(
    () => p3(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [h, p] = x.useState(() => Td(c)), [m, y] = x.useState(null), [b, S] = x.useState(null), [T, R] = x.useState(!1), [w, D] = x.useState(!1), [O, B] = x.useState(!1), [L, V] = x.useState(null), [X, K] = x.useState([]), [ee, A] = x.useState([]), [Q, te] = x.useState(!1), [ce, J] = x.useState(null), [P, le] = x.useState(0), Z = x.useRef(null), z = x.useRef(null), ne = x.useRef(null), se = x.useRef(null), ue = x.useRef(null), we = x.useRef(0), j = x.useMemo(
    () => h.ops.some((be) => be.mode === "normalize"),
    [h.ops]
  );
  x.useEffect(() => {
    p(Td(c)), y(null), B(!1), K([]), ue.current = null;
  }, [a.voiceAssetId, c]), x.useEffect(() => {
    se.current?.abort();
    const be = new AbortController();
    return se.current = be, te(!0), J(null), xN(l, "voice_asset", a.voiceAssetId, 50, {
      signal: be.signal
    }).then((_e) => {
      be.signal.aborted || A(_e.entries);
    }).catch((_e) => {
      if (be.signal.aborted) return;
      const Fe = _e instanceof Error ? _e.message : "audit fetch failed";
      J(Fe);
    }).finally(() => {
      be.signal.aborted || te(!1);
    }), () => be.abort();
  }, [l, a.voiceAssetId, P]), x.useEffect(() => () => {
    b && URL.revokeObjectURL(b);
  }, [b]), x.useEffect(() => () => {
    z.current?.abort(), ne.current?.abort(), se.current?.abort();
  }, []);
  const F = h.ops.find((be) => be.mode === "trim"), ie = h.ops.find((be) => be.mode === "normalize"), oe = F?.start_ms ?? 0, xe = F?.end_ms ?? Math.max(1, c), Re = x.useCallback((be, _e) => {
    p(
      (Fe) => sb(
        Fe,
        "trim",
        (ot) => ({
          ...ot,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(be)),
          end_ms: Math.max(Math.floor(be) + 1, Math.floor(_e))
        })
      )
    );
  }, []), De = x.useCallback(
    (be) => Re(be, xe),
    [xe, Re]
  ), dt = x.useCallback(
    (be) => Re(oe, be),
    [oe, Re]
  ), $e = x.useCallback((be) => {
    p((_e) => {
      const Fe = _e.ops.filter((ot) => ot.mode !== "normalize");
      if (be) {
        const ot = {
          id: kl(),
          mode: "normalize",
          target_lufs: rb
        };
        return { ..._e, ops: [...Fe, ot] };
      }
      return { ..._e, ops: Fe };
    });
  }, []), In = x.useCallback(
    (be) => {
      const _e = h.ops.findIndex((Zn) => Zn.id === be);
      if (_e === -1) return;
      const Fe = h.ops[_e];
      if (!Fe) return;
      const ot = [...h.ops.slice(0, _e), ...h.ops.slice(_e + 1)];
      p({ ...h, ops: ot }), K((Zn) => [...Zn, { op: Fe, index: _e }]);
    },
    [h]
  ), xa = x.useCallback(() => {
    const be = X[X.length - 1];
    if (!be) return;
    const _e = Math.min(be.index, h.ops.length), Fe = [...h.ops.slice(0, _e), be.op, ...h.ops.slice(_e)];
    p({ ...h, ops: Fe }), K(X.slice(0, -1));
  }, [h, X]), Vn = x.useCallback(() => {
    const be = F1(h, c);
    return be ? (y(be.message), !1) : (y(null), !0);
  }, [h, c]), pt = x.useCallback(async () => {
    if (!Vn() || T) return;
    z.current?.abort();
    const be = new AbortController();
    z.current = be;
    const _e = ++we.current;
    D(!0);
    try {
      const Fe = await SN(a.voiceAssetId, l, h, {
        signal: be.signal
      });
      if (be.signal.aborted || _e !== we.current) return;
      b && URL.revokeObjectURL(b);
      const ot = URL.createObjectURL(Fe);
      S(ot), B(!0), requestAnimationFrame(() => Z.current?.play().catch(() => {
      }));
    } catch (Fe) {
      if (be.signal.aborted) return;
      const ot = Fe instanceof Error ? Fe.message : "preview failed";
      y(ot), o(ot);
    } finally {
      be.signal.aborted || D(!1);
    }
  }, [Vn, T, a.voiceAssetId, l, h, b, o]), Bt = x.useCallback(async () => {
    if (!Vn() || w || T) return;
    z.current?.abort(), ne.current?.abort();
    const be = new AbortController();
    ne.current = be, R(!0);
    try {
      const _e = ue.current ?? void 0, Fe = await vN(
        a.voiceAssetId,
        l,
        _e ? { chain: h, digest_before: _e } : { chain: h },
        { signal: be.signal }
      );
      if (be.signal.aborted) return;
      ue.current = Fe.chain_digest, y(null), V(Fe.measured_lufs ?? null), K([]), s(Fe), le((ot) => ot + 1);
    } catch (_e) {
      if (be.signal.aborted) return;
      const Fe = _e instanceof Vl;
      _e instanceof Vl && (ue.current = _e.currentDigest || null);
      const ot = Fe ? "Edit chain has changed in another tab. Reload to continue." : _e instanceof Error ? _e.message : "apply failed";
      y(ot), o(ot);
    } finally {
      be.signal.aborted || R(!1);
    }
  }, [
    Vn,
    w,
    T,
    a.voiceAssetId,
    l,
    h,
    s,
    o
  ]), Ea = x.useCallback(() => {
    z.current?.abort(), p(Td(c)), y(null), V(null), B(!1), K([]), le((be) => be + 1), b && (URL.revokeObjectURL(b), S(null));
  }, [c, b]), oi = x.useCallback((be) => {
    p(
      (_e) => sb(
        _e,
        "normalize",
        (Fe) => ({
          ...Fe,
          mode: "normalize",
          target_lufs: be
        })
      )
    );
  }, []);
  return /* @__PURE__ */ v.jsxs("div", { className: QO, children: [
    /* @__PURE__ */ v.jsxs("header", { className: IO, children: [
      /* @__PURE__ */ v.jsxs("h3", { className: ZO, children: [
        "Edit · ",
        a.displayName
      ] }),
      /* @__PURE__ */ v.jsxs("span", { className: JO, children: [
        "Source · ",
        Yo(c)
      ] })
    ] }),
    /* @__PURE__ */ v.jsx(
      $1,
      {
        audioUrl: d,
        durationMs: Math.max(1, c),
        startMs: oe,
        endMs: xe,
        onChangeStart: De,
        onChangeEnd: dt
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: Ed, children: [
      /* @__PURE__ */ v.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ v.jsxs("span", { className: WO, children: [
        Yo(oe),
        " → ",
        Yo(xe),
        " · ",
        Yo(xe - oe)
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: e3, children: [
      /* @__PURE__ */ v.jsxs("div", { className: lb, children: [
        /* @__PURE__ */ v.jsxs("span", { className: Ed, children: [
          /* @__PURE__ */ v.jsx("span", { children: "Normalize loudness" }),
          j && ie && /* @__PURE__ */ v.jsxs("span", { className: o3, children: [
            "target ",
            ie.target_lufs.toFixed(1),
            " LUFS",
            L !== null && ` · measured ${L.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ v.jsxs("label", { className: t3, children: [
          /* @__PURE__ */ v.jsx(
            "input",
            {
              type: "checkbox",
              checked: j,
              onChange: (be) => $e(be.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ v.jsxs("span", { children: [
            "Target ",
            rb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        j && ie && /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "range",
            className: c3,
            min: -30,
            max: -6,
            step: 0.5,
            value: ie.target_lufs,
            onChange: (be) => oi(Number(be.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: lb, children: [
        /* @__PURE__ */ v.jsxs("span", { className: Ed, children: [
          "Operations · ",
          h.ops.length
        ] }),
        /* @__PURE__ */ v.jsx(XO, { chain: h, onRemoveOp: In })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: n3, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: i3,
          onClick: () => void pt(),
          disabled: w || T,
          children: w ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: a3,
          onClick: () => void Bt(),
          disabled: T || w,
          children: T ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: l3,
          onClick: Ea,
          disabled: T || w,
          children: "Reset"
        }
      ),
      X.length > 0 && /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          className: r3,
          onClick: xa,
          disabled: T || w,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            X.length,
            ")"
          ]
        }
      ),
      O && /* @__PURE__ */ v.jsx(
        "span",
        {
          className: h3,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    b && /* @__PURE__ */ v.jsx(
      "audio",
      {
        ref: Z,
        src: b,
        controls: !0,
        className: u3,
        "aria-label": "Edit preview"
      }
    ),
    m && /* @__PURE__ */ v.jsx("div", { className: s3, role: "alert", "aria-live": "polite", children: m }),
    /* @__PURE__ */ v.jsxs("details", { className: f3, children: [
      /* @__PURE__ */ v.jsxs("summary", { className: d3, children: [
        "Edit history",
        ee.length > 0 ? ` · ${ee.length}` : ""
      ] }),
      /* @__PURE__ */ v.jsx(
        VO,
        {
          entries: ee,
          loading: Q,
          error: ce
        }
      )
    ] })
  ] });
}
function Td(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: kl(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function sb(n, a, l) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: kl(), mode: a };
    return { ...n, ops: [...n.ops, l(c)] };
  }
  const o = [...n.ops];
  return o[s] = l(o[s]), { ...n, ops: o };
}
function Yo(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
function p3(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var y3 = "go9vi12", g3 = "go9vi13", v3 = "go9vi14", b3 = "go9vi15", S3 = "go9vi16", x3 = "go9vi17", E3 = "go9vi18", T3 = "go9vi19", R3 = "go9vi1a go9vi19", w3 = "go9vi1b", C3 = "go9vi1c", M3 = "go9vi1d", A3 = "go9vi1e", j3 = "go9vi1f", D3 = "go9vi1g", N3 = "go9vi1h", z3 = "go9vi1i", O3 = "go9vi1j", _3 = "go9vi1k", yu = "go9vi1l", Di = "go9vi1m", kr = "go9vi1n", Ol = "go9vi1o", L3 = "go9vi1p go9vi1o", U3 = "go9vi1q", V3 = "go9vi1r go9vi1q", B3 = "go9vi1s go9vi1q", H3 = "go9vi1t", q3 = "go9vi1u", k3 = "go9vi1v", P3 = "go9vi1w", Y3 = "go9vi1x", G3 = "go9vi1y", X1 = "go9vi1z", K1 = "go9vi110", ob = "go9vi111 go9vi110", F3 = "go9vi112 go9vi110", $3 = "go9vi113", X3 = "go9vi114", K3 = "go9vi115", Q3 = "go9vi116 go9vi1o", I3 = "go9vi117", Z3 = "go9vi118", J3 = "go9vi119", W3 = "go9vi11a", e_ = "go9vi11b", t_ = "go9vi11c", n_ = "go9vi11d", a_ = "go9vi11e", i_ = "go9vi11f", l_ = "go9vi11g", r_ = "go9vi11h";
const s_ = ["none", "audio_ref", "vector_preset", "qwen_template"];
function o_() {
  const { deployment: n, mappings: a, voiceAssets: l } = ss(), [s, o] = x.useState(a), [c, d] = x.useState(l), [h, p] = x.useState(
    a[0]?.mappingId ?? null
  ), [m, y] = x.useState(""), [b, S] = x.useState(null), [T, R] = x.useState(null), w = x.useMemo(() => {
    const P = /* @__PURE__ */ new Map();
    for (const le of c) P.set(le.voiceAssetId, le);
    return P;
  }, [c]), D = x.useMemo(() => {
    const P = m.trim().toLowerCase();
    return P ? s.filter((le) => le.characterName.toLowerCase().includes(P)) : s;
  }, [s, m]), O = x.useMemo(
    () => s.find((P) => P.mappingId === h) ?? null,
    [s, h]
  );
  x.useEffect(() => {
    o(a), d(l), p(a[0]?.mappingId ?? null);
  }, [a, l]), x.useEffect(() => {
    if (!T) return;
    const P = setTimeout(() => R(null), 2600);
    return () => clearTimeout(P);
  }, [T]);
  const B = x.useCallback(async () => {
    const P = await iu(n.deploymentId);
    d(P.voiceAssets);
  }, [n.deploymentId]), L = x.useCallback(
    (P) => {
      o(
        (le) => le.map((Z) => Z.mappingId === h ? { ...Z, ...P } : Z)
      );
    },
    [h]
  ), V = x.useCallback(
    async (P) => {
      if (!O) return;
      const le = O;
      try {
        const Z = await Bw(n.deploymentId, O.mappingId, P);
        o((z) => z.map((ne) => ne.mappingId === Z.mappingId ? Z : ne));
      } catch (Z) {
        o(
          (z) => z.map((ne) => ne.mappingId === le.mappingId ? le : ne)
        ), S(Ni(Z));
      }
    },
    [O, n.deploymentId]
  ), X = x.useCallback(async () => {
    const P = c[0];
    if (!P) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const le = m_(s), Z = await Gb(n.deploymentId, {
        characterName: le,
        speakerVoiceAssetId: P.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((z) => [...z, Z]), p(Z.mappingId);
    } catch (le) {
      S(Ni(le));
    }
  }, [n.deploymentId, c, s]), K = x.useCallback(async () => {
    if (O && confirm(`Deactivate mapping for ${O.characterName}?`))
      try {
        await Hw(n.deploymentId, O.mappingId), o((P) => P.filter((le) => le.mappingId !== O.mappingId)), p(null), R(`Mapping for ${O.characterName} deactivated.`);
      } catch (P) {
        S(Ni(P));
      }
  }, [n.deploymentId, O]), ee = x.useCallback(
    async (P, le, Z) => {
      try {
        const z = await $w(n.deploymentId, P, le, Z);
        return d((ne) => [z, ...ne]), R(`${z.displayName} uploaded.`), z;
      } catch (z) {
        return S(Ni(z)), null;
      }
    },
    [n.deploymentId]
  ), A = x.useCallback(async () => {
    try {
      const P = await qw(n.deploymentId);
      S_(P, `${n.deploymentId}-mappings.json`), R("Mappings exported to JSON.");
    } catch (P) {
      S(Ni(P));
    }
  }, [n.deploymentId]), Q = x.useCallback(
    async (P, le) => {
      try {
        const Z = await kw(
          n.deploymentId,
          P.mappings,
          le
        );
        R(
          `Imported ${Z.created.length} • skipped ${Z.skipped.length} • replaced ${Z.replaced.length}.`
        );
        const z = await iu(n.deploymentId);
        d(z.voiceAssets);
      } catch (Z) {
        S(Ni(Z));
      }
    },
    [n.deploymentId]
  ), te = x.useCallback(
    async (P) => {
      await B(), R("Edit applied.");
    },
    [B]
  ), ce = x.useCallback((P) => {
    S(P);
  }, []), J = x.useCallback(
    async (P, le) => {
      if (!O) return null;
      const Z = P.trim() || `[${O.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await Fw(n.deploymentId, {
          line: Z,
          outputFormat: le
        })).runId };
      } catch (z) {
        return S(Ni(z)), null;
      }
    },
    [n.deploymentId, O]
  );
  return /* @__PURE__ */ v.jsxs("div", { className: y3, children: [
    /* @__PURE__ */ v.jsxs("aside", { className: g3, "aria-label": "Character mappings", children: [
      /* @__PURE__ */ v.jsxs("header", { className: v3, children: [
        /* @__PURE__ */ v.jsxs("div", { children: [
          /* @__PURE__ */ v.jsx("h1", { className: b3, children: "Mappings" }),
          /* @__PURE__ */ v.jsxs("span", { className: S3, children: [
            s.length,
            " active · ",
            c.length,
            " voice",
            c.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ v.jsx("button", { type: "button", className: K1, onClick: X, children: "+ Add" })
      ] }),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "search",
          className: x3,
          placeholder: "Search characters",
          value: m,
          onChange: (P) => y(P.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ v.jsx(h_, { onExport: A, onImport: Q }),
      /* @__PURE__ */ v.jsx("div", { className: E3, children: D.length === 0 ? /* @__PURE__ */ v.jsx("div", { className: j3, children: "No mappings yet. Click Add to create one." }) : D.map((P) => {
        const le = w.get(P.speakerVoiceAssetId), Z = P.mappingId === h;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            className: Z ? R3 : T3,
            onClick: () => p(P.mappingId),
            "aria-pressed": Z,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ v.jsx("span", { className: w3, "aria-hidden": "true", children: p_(P.characterName) }),
              /* @__PURE__ */ v.jsxs("span", { className: C3, children: [
                /* @__PURE__ */ v.jsx("span", { className: M3, children: P.characterName }),
                /* @__PURE__ */ v.jsxs("span", { className: A3, children: [
                  P.defaultEmotionMode,
                  " · ",
                  le?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          P.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ v.jsxs("section", { className: D3, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ v.jsx(M1, { features: Y1, children: /* @__PURE__ */ v.jsx(G2, { children: T && /* @__PURE__ */ v.jsx(
        L1.div,
        {
          className: X3,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: T
        },
        T
      ) }) }),
      b && /* @__PURE__ */ v.jsx("div", { className: $3, role: "alert", children: b }),
      O ? /* @__PURE__ */ v.jsx(
        c_,
        {
          deploymentId: n.deploymentId,
          mapping: O,
          voiceAssets: c,
          onNameChange: (P) => {
            L({ characterName: P });
          },
          onNameBlur: (P) => {
            P !== O.characterName && P.trim() && V({ characterName: P.trim() });
          },
          onSpeakerChange: (P) => {
            L({ speakerVoiceAssetId: P }), V({ speakerVoiceAssetId: P });
          },
          onModeChange: (P) => {
            L({ defaultEmotionMode: P }), V({ defaultEmotionMode: P });
          },
          onQwenChange: (P) => {
            L({ defaultQwenTemplate: P });
          },
          onQwenBlur: (P) => {
            V({ defaultQwenTemplate: P });
          },
          onSpeedChange: (P) => {
            L({ defaultSpeedFactor: P });
          },
          onSpeedCommit: (P) => {
            V({ defaultSpeedFactor: P });
          },
          onEmotionVoiceChange: (P) => {
            const le = P || null;
            L({ defaultEmotionVoiceAssetId: le }), V({ defaultEmotionVoiceAssetId: le });
          },
          onDelete: K,
          onUploadVoice: async (P, le, Z) => {
            const z = await ee(P, le, Z);
            return z && Z === "speaker" && (L({ speakerVoiceAssetId: z.voiceAssetId }), V({ speakerVoiceAssetId: z.voiceAssetId })), await B(), z;
          },
          onTestLine: J,
          onEditChainPersisted: te,
          onEditError: ce
        }
      ) : /* @__PURE__ */ v.jsx(
        u_,
        {
          voiceCount: c.length,
          onUploadVoice: async (P) => {
            await ee(P, P.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function u_({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ v.jsxs("div", { className: `${yu} ${J3}`, children: [
    /* @__PURE__ */ v.jsxs("div", { className: W3, children: [
      /* @__PURE__ */ v.jsx("h2", { className: e_, children: "Upload your first voice" }),
      /* @__PURE__ */ v.jsxs("p", { className: t_, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ v.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ v.jsx(
      Q1,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (l) => (await a(l), null)
      }
    )
  ] }) : /* @__PURE__ */ v.jsx("div", { className: `${yu} ${n_}`, children: /* @__PURE__ */ v.jsxs("p", { className: a_, children: [
    "Select a character on the left, or click ",
    /* @__PURE__ */ v.jsx("strong", { children: "+ Add" }),
    " to create one."
  ] }) });
}
function c_(n) {
  const { mapping: a, voiceAssets: l } = n, s = l.find((R) => R.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = l.find((R) => R.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [c, d] = x.useState(""), [h, p] = x.useState("mp3"), [m, y] = x.useState("idle"), [b, S] = x.useState(null), T = x.useCallback(async () => {
    y("running"), S(null);
    const R = await n.onTestLine(c, h);
    if (!R) {
      y("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: w } = R;
    for (let D = 0; D < 60; D += 1) {
      await new Promise((O) => setTimeout(O, 500));
      try {
        const O = await mh(n.deploymentId, w);
        if (O.status === "completed") {
          y("done");
          return;
        }
        if (O.status === "failed" || O.status === "cancelled") {
          y("error"), S(`Run ${O.status}.`);
          return;
        }
      } catch (O) {
        y("error"), S(O instanceof Error ? O.message : "unknown error");
        return;
      }
    }
    y("error"), S("test-line timed out after 30s");
  }, [n.onTestLine, n.deploymentId, c, h]);
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("header", { className: N3, children: [
      /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsx("span", { className: O3, children: "Character" }),
        /* @__PURE__ */ v.jsx("h2", { className: z3, children: a.characterName })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: X1, children: /* @__PURE__ */ v.jsx("button", { type: "button", className: F3, onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: K3, children: [
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "text",
          className: Q3,
          placeholder: `[${a.characterName}] This is a test of the voice.`,
          value: c,
          onChange: (R) => d(R.currentTarget.value),
          "aria-label": "Test-line text",
          disabled: m === "running"
        }
      ),
      /* @__PURE__ */ v.jsxs(
        "select",
        {
          className: Ol,
          value: h,
          onChange: (R) => p(R.currentTarget.value),
          "aria-label": "Test-line output format",
          disabled: m === "running",
          children: [
            /* @__PURE__ */ v.jsx("option", { value: "mp3", children: "mp3" }),
            /* @__PURE__ */ v.jsx("option", { value: "wav", children: "wav" }),
            /* @__PURE__ */ v.jsx("option", { value: "flac", children: "flac" })
          ]
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: K1,
          onClick: () => void T(),
          disabled: m === "running",
          children: m === "running" ? "Synthesising…" : "Test this line"
        }
      ),
      m === "done" && /* @__PURE__ */ v.jsx("span", { className: i_, children: "Synthesised — see host logs for the output file path." }),
      m === "error" && b && /* @__PURE__ */ v.jsx("span", { className: l_, children: b })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: _3, children: [
      /* @__PURE__ */ v.jsxs("div", { className: yu, children: [
        /* @__PURE__ */ v.jsxs("label", { className: kr, children: [
          /* @__PURE__ */ v.jsx("span", { className: Di, children: "Character name" }),
          /* @__PURE__ */ v.jsx(
            "input",
            {
              className: Ol,
              value: a.characterName,
              onChange: (R) => n.onNameChange(R.currentTarget.value),
              onBlur: (R) => n.onNameBlur(R.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("label", { className: kr, children: [
          /* @__PURE__ */ v.jsx("span", { className: Di, children: "Emotion mode" }),
          /* @__PURE__ */ v.jsx(
            "select",
            {
              className: Ol,
              value: a.defaultEmotionMode,
              onChange: (R) => n.onModeChange(R.currentTarget.value),
              children: s_.map((R) => /* @__PURE__ */ v.jsx("option", { value: R, children: y_(R) }, R))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ v.jsxs("label", { className: kr, children: [
          /* @__PURE__ */ v.jsxs("span", { className: Di, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ v.jsx(
            "textarea",
            {
              className: L3,
              value: a.defaultQwenTemplate ?? "",
              onChange: (R) => n.onQwenChange(R.currentTarget.value),
              onBlur: (R) => n.onQwenBlur(R.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ v.jsxs("label", { className: kr, children: [
          /* @__PURE__ */ v.jsx("span", { className: Di, children: "Emotion reference" }),
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              className: Ol,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (R) => n.onEmotionVoiceChange(R.currentTarget.value),
              children: [
                /* @__PURE__ */ v.jsx("option", { value: "", children: "— none —" }),
                l.map((R) => /* @__PURE__ */ v.jsxs("option", { value: R.voiceAssetId, children: [
                  R.displayName,
                  " · ",
                  R.kind
                ] }, R.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("label", { className: kr, children: [
          /* @__PURE__ */ v.jsxs("span", { className: Di, children: [
            "Speed · ",
            a.defaultSpeedFactor?.toFixed(2) ?? "—",
            "×"
          ] }),
          /* @__PURE__ */ v.jsx(
            "input",
            {
              type: "range",
              min: 0.5,
              max: 2,
              step: 0.05,
              value: a.defaultSpeedFactor ?? 1,
              onChange: (R) => n.onSpeedChange(Number(R.currentTarget.value)),
              onMouseUp: (R) => n.onSpeedCommit(Number(R.currentTarget.value)),
              onTouchEnd: (R) => n.onSpeedCommit(Number(R.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: yu, children: [
        /* @__PURE__ */ v.jsx("span", { className: Di, children: "Speaker reference" }),
        /* @__PURE__ */ v.jsx(
          f_,
          {
            value: a.speakerVoiceAssetId,
            voices: l,
            onChange: n.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ v.jsx(ub, { voice: s }),
        /* @__PURE__ */ v.jsx(
          Q1,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (R) => n.onUploadVoice(R, R.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        s && /* @__PURE__ */ v.jsx(
          m3,
          {
            voiceAsset: s,
            deploymentId: n.deploymentId,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        o && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
          /* @__PURE__ */ v.jsx("span", { className: Di, children: "Emotion reference voice" }),
          /* @__PURE__ */ v.jsx(ub, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function f_({
  value: n,
  voices: a,
  onChange: l
}) {
  return /* @__PURE__ */ v.jsxs(
    "select",
    {
      className: Ol,
      value: n,
      onChange: (s) => l(s.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ v.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((s) => /* @__PURE__ */ v.jsx("option", { value: s.voiceAssetId, children: s.displayName }, s.voiceAssetId))
      ]
    }
  );
}
function ub({ voice: n }) {
  const a = g_(n.durationMs ?? null);
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsxs("div", { className: H3, children: [
      /* @__PURE__ */ v.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ v.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ v.jsx("span", { children: v_(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ v.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ v.jsxs("div", { className: q3, children: [
      /* @__PURE__ */ v.jsx("div", { className: k3, children: /* @__PURE__ */ v.jsx(M1, { features: Y1, children: /* @__PURE__ */ v.jsx(
        L1.div,
        {
          className: P3,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ v.jsx(
        "span",
        {
          className: a.level === "warn" ? Y3 : G3,
          children: a.message
        }
      )
    ] }),
    /* @__PURE__ */ v.jsx(d_, { seed: n.contentSha256 })
  ] });
}
function d_({ seed: n }) {
  const a = x.useMemo(() => b_(n, 48), [n]);
  return /* @__PURE__ */ v.jsx("div", { className: I3, "aria-hidden": "true", children: a.map((l, s) => /* @__PURE__ */ v.jsx(
    "span",
    {
      className: Z3,
      style: { height: `${Math.max(6, l * 100)}%` }
    },
    s
  )) });
}
function Q1({
  label: n,
  onFile: a
}) {
  const [l, s] = x.useState(!1), [o, c] = x.useState(!1), d = x.useRef(null), h = x.useCallback(
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
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: o ? B3 : l ? V3 : U3,
      onDragOver: (p) => {
        p.preventDefault(), s(!0);
      },
      onDragLeave: () => s(!1),
      onDrop: (p) => {
        p.preventDefault(), s(!1);
        const m = p.dataTransfer.files?.[0];
        m && h(m);
      },
      onClick: () => d.current?.click(),
      role: "button",
      tabIndex: 0,
      onKeyDown: (p) => {
        (p.key === "Enter" || p.key === " ") && (p.preventDefault(), d.current?.click());
      },
      "aria-busy": o,
      children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            ref: d,
            type: "file",
            accept: "audio/*",
            onChange: (p) => {
              const m = p.currentTarget.files?.[0];
              m && h(m), p.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : n
      ]
    }
  );
}
function h_({
  onExport: n,
  onImport: a
}) {
  const [l, s] = x.useState("error"), o = x.useRef(null);
  return /* @__PURE__ */ v.jsxs("div", { className: X1, children: [
    /* @__PURE__ */ v.jsx("button", { type: "button", className: ob, onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        ref: o,
        type: "file",
        accept: "application/json,.json",
        className: r_,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (c) => {
          const d = c.currentTarget.files?.[0];
          if (c.currentTarget.value = "", !!d)
            try {
              const h = await d.text(), p = JSON.parse(h);
              a(p, l);
            } catch {
              alert("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ v.jsx("button", { type: "button", className: ob, onClick: () => o.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ v.jsxs(
      "select",
      {
        className: Ol,
        value: l,
        onChange: (c) => s(c.currentTarget.value),
        "aria-label": "Import conflict strategy",
        children: [
          /* @__PURE__ */ v.jsx("option", { value: "error", children: "Error on conflict" }),
          /* @__PURE__ */ v.jsx("option", { value: "skip", children: "Skip existing" }),
          /* @__PURE__ */ v.jsx("option", { value: "replace", children: "Replace existing" })
        ]
      }
    )
  ] });
}
function m_(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let l = n.length + 1;
  for (; a.has(`character ${l}`); ) l += 1;
  return `Character ${l}`;
}
function p_(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function y_(n) {
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
function g_(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function v_(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function b_(n, a) {
  const l = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    l.push((o * 31 + s * 7) % 100 / 100);
  }
  return l;
}
function S_(n, a) {
  const l = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(l), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function Ni(n) {
  return n instanceof ki || n instanceof Error ? n.message : "unknown error";
}
function x_() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await Uw();
        return { deployments: n };
      },
      Component: dC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = Cl(n, "deploymentId");
        return GT(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = Cl(n, "deploymentId"), [l, { mappings: s }, { runs: o }, c] = await Promise.all([
          pv(a),
          yv(a),
          Pw(a, { limit: 10 }),
          Xw(a)
        ]);
        return { deployment: l, mappings: s, runs: o, workflow: c };
      },
      Component: gN
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = Cl(n, "deploymentId"), l = Cl(n, "runId");
        return { run: await mh(a, l) };
      },
      Component: Yz
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = Cl(n, "deploymentId"), [l, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          pv(a),
          yv(a),
          iu(a)
        ]);
        return { deployment: l, mappings: s, voiceAssets: o };
      },
      Component: o_
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const l = Cl(n, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: l,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: wO
    },
    {
      path: "/runtime/queue",
      Component: xO
    }
  ];
}
function Cl(n, a) {
  const l = n[a];
  if (!l)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return l;
}
const Wd = "emotion-tts-app", E_ = "ext-event", cb = "emotion-tts-stylesheet", fb = ["accent", "density", "card"];
function T_(n) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[n];
}
function R_() {
  if (typeof document > "u" || document.getElementById(cb)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = cb, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
R_();
class w_ extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = pT.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.paint();
  }
  attributeChangedCallback() {
    this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null;
  }
  // Mirror `document.body.dataset.{accent,density,card}` onto this custom
  // element so the scoped CSS selectors in `theme/tokens.css.ts` re-bind
  // tokens whenever the host tweak panel writes a new value. Runs once on
  // connect and then on every body-attribute mutation. Defaults baked into
  // the theme cover the no-attribute case, so a missing host (e.g. running
  // the bundle in isolation for the visual baseline) still paints with the
  // documented `cozy / primary / flat` baseline.
  syncTweaksFromBody() {
    for (const a of fb) {
      const l = T_(a);
      l === void 0 ? delete this.dataset[a] : this.dataset[a] !== l && (this.dataset[a] = l);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: fb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), l = ZR(x_(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ v.jsx(x.StrictMode, { children: /* @__PURE__ */ v.jsx(WR, { router: l }) })
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
      new CustomEvent(E_, {
        detail: { topic: a, payload: l },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function C_() {
  typeof customElements > "u" || customElements.get(Wd) || customElements.define(Wd, w_);
}
typeof customElements < "u" && !customElements.get(Wd) && C_();
export {
  C_ as register
};
//# sourceMappingURL=emotion-tts.js.map
