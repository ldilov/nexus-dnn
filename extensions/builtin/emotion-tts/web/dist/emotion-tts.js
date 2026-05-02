function aT(t, a) {
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
function iT(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var kf = { exports: {} }, Vr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dg;
function lT() {
  if (Dg) return Vr;
  Dg = 1;
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
var Ng;
function rT() {
  return Ng || (Ng = 1, kf.exports = lT()), kf.exports;
}
var g = rT(), Pf = { exports: {} }, Me = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zg;
function sT() {
  if (zg) return Me;
  zg = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), f = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), x = Symbol.iterator;
  function T(j) {
    return j === null || typeof j != "object" ? null : (j = x && j[x] || j["@@iterator"], typeof j == "function" ? j : null);
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
  }, C = Object.assign, D = {};
  function _(j, I, se) {
    this.props = j, this.context = I, this.refs = D, this.updater = se || w;
  }
  _.prototype.isReactComponent = {}, _.prototype.setState = function(j, I) {
    if (typeof j != "object" && typeof j != "function" && j != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, j, I, "setState");
  }, _.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function L() {
  }
  L.prototype = _.prototype;
  function O(j, I, se) {
    this.props = j, this.context = I, this.refs = D, this.updater = se || w;
  }
  var B = O.prototype = new L();
  B.constructor = O, C(B, _.prototype), B.isPureReactComponent = !0;
  var F = Array.isArray;
  function ne() {
  }
  var te = { H: null, A: null, T: null, S: null }, R = Object.prototype.hasOwnProperty;
  function H(j, I, se) {
    var ue = se.ref;
    return {
      $$typeof: t,
      type: j,
      key: I,
      ref: ue !== void 0 ? ue : null,
      props: se
    };
  }
  function K(j, I) {
    return H(j.type, I, j.props);
  }
  function ie(j) {
    return typeof j == "object" && j !== null && j.$$typeof === t;
  }
  function X(j) {
    var I = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(se) {
      return I[se];
    });
  }
  var le = /\/+/g;
  function G(j, I) {
    return typeof j == "object" && j !== null && j.key != null ? X("" + j.key) : I.toString(36);
  }
  function Z(j) {
    switch (j.status) {
      case "fulfilled":
        return j.value;
      case "rejected":
        throw j.reason;
      default:
        switch (typeof j.status == "string" ? j.then(ne, ne) : (j.status = "pending", j.then(
          function(I) {
            j.status === "pending" && (j.status = "fulfilled", j.value = I);
          },
          function(I) {
            j.status === "pending" && (j.status = "rejected", j.reason = I);
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
  function N(j, I, se, ue, Se) {
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
            case t:
            case a:
              De = !0;
              break;
            case y:
              return De = j._init, N(
                De(j._payload),
                I,
                se,
                ue,
                Se
              );
          }
      }
    if (De)
      return Se = Se(j), De = ue === "" ? "." + G(j, 0) : ue, F(Se) ? (se = "", De != null && (se = De.replace(le, "$&/") + "/"), N(Se, I, se, "", function(ea) {
        return ea;
      })) : Se != null && (ie(Se) && (Se = K(
        Se,
        se + (Se.key == null || j && j.key === Se.key ? "" : ("" + Se.key).replace(
          le,
          "$&/"
        ) + "/") + De
      )), I.push(Se)), 1;
    De = 0;
    var ht = ue === "" ? "." : ue + ":";
    if (F(j))
      for (var $e = 0; $e < j.length; $e++)
        ue = j[$e], Re = ht + G(ue, $e), De += N(
          ue,
          I,
          se,
          Re,
          Se
        );
    else if ($e = T(j), typeof $e == "function")
      for (j = $e.call(j), $e = 0; !(ue = j.next()).done; )
        ue = ue.value, Re = ht + G(ue, $e++), De += N(
          ue,
          I,
          se,
          Re,
          Se
        );
    else if (Re === "object") {
      if (typeof j.then == "function")
        return N(
          Z(j),
          I,
          se,
          ue,
          Se
        );
      throw I = String(j), Error(
        "Objects are not valid as a React child (found: " + (I === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : I) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function J(j, I, se) {
    if (j == null) return j;
    var ue = [], Se = 0;
    return N(j, ue, "", "", function(Re) {
      return I.call(se, Re, Se++);
    }), ue;
  }
  function re(j) {
    if (j._status === -1) {
      var I = j._result;
      I = I(), I.then(
        function(se) {
          (j._status === 0 || j._status === -1) && (j._status = 1, j._result = se);
        },
        function(se) {
          (j._status === 0 || j._status === -1) && (j._status = 2, j._result = se);
        }
      ), j._status === -1 && (j._status = 0, j._result = I);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var ce = typeof reportError == "function" ? reportError : function(j) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var I = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
        error: j
      });
      if (!window.dispatchEvent(I)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", j);
      return;
    }
    console.error(j);
  }, Te = {
    map: J,
    forEach: function(j, I, se) {
      J(
        j,
        function() {
          I.apply(this, arguments);
        },
        se
      );
    },
    count: function(j) {
      var I = 0;
      return J(j, function() {
        I++;
      }), I;
    },
    toArray: function(j) {
      return J(j, function(I) {
        return I;
      }) || [];
    },
    only: function(j) {
      if (!ie(j))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return j;
    }
  };
  return Me.Activity = b, Me.Children = Te, Me.Component = _, Me.Fragment = l, Me.Profiler = o, Me.PureComponent = O, Me.StrictMode = s, Me.Suspense = p, Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = te, Me.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(j) {
      return te.H.useMemoCache(j);
    }
  }, Me.cache = function(j) {
    return function() {
      return j.apply(null, arguments);
    };
  }, Me.cacheSignal = function() {
    return null;
  }, Me.cloneElement = function(j, I, se) {
    if (j == null)
      throw Error(
        "The argument must be a React element, but you passed " + j + "."
      );
    var ue = C({}, j.props), Se = j.key;
    if (I != null)
      for (Re in I.key !== void 0 && (Se = "" + I.key), I)
        !R.call(I, Re) || Re === "key" || Re === "__self" || Re === "__source" || Re === "ref" && I.ref === void 0 || (ue[Re] = I[Re]);
    var Re = arguments.length - 2;
    if (Re === 1) ue.children = se;
    else if (1 < Re) {
      for (var De = Array(Re), ht = 0; ht < Re; ht++)
        De[ht] = arguments[ht + 2];
      ue.children = De;
    }
    return H(j.type, Se, ue);
  }, Me.createContext = function(j) {
    return j = {
      $$typeof: f,
      _currentValue: j,
      _currentValue2: j,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, j.Provider = j, j.Consumer = {
      $$typeof: c,
      _context: j
    }, j;
  }, Me.createElement = function(j, I, se) {
    var ue, Se = {}, Re = null;
    if (I != null)
      for (ue in I.key !== void 0 && (Re = "" + I.key), I)
        R.call(I, ue) && ue !== "key" && ue !== "__self" && ue !== "__source" && (Se[ue] = I[ue]);
    var De = arguments.length - 2;
    if (De === 1) Se.children = se;
    else if (1 < De) {
      for (var ht = Array(De), $e = 0; $e < De; $e++)
        ht[$e] = arguments[$e + 2];
      Se.children = ht;
    }
    if (j && j.defaultProps)
      for (ue in De = j.defaultProps, De)
        Se[ue] === void 0 && (Se[ue] = De[ue]);
    return H(j, Re, Se);
  }, Me.createRef = function() {
    return { current: null };
  }, Me.forwardRef = function(j) {
    return { $$typeof: h, render: j };
  }, Me.isValidElement = ie, Me.lazy = function(j) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: j },
      _init: re
    };
  }, Me.memo = function(j, I) {
    return {
      $$typeof: m,
      type: j,
      compare: I === void 0 ? null : I
    };
  }, Me.startTransition = function(j) {
    var I = te.T, se = {};
    te.T = se;
    try {
      var ue = j(), Se = te.S;
      Se !== null && Se(se, ue), typeof ue == "object" && ue !== null && typeof ue.then == "function" && ue.then(ne, ce);
    } catch (Re) {
      ce(Re);
    } finally {
      I !== null && se.types !== null && (I.types = se.types), te.T = I;
    }
  }, Me.unstable_useCacheRefresh = function() {
    return te.H.useCacheRefresh();
  }, Me.use = function(j) {
    return te.H.use(j);
  }, Me.useActionState = function(j, I, se) {
    return te.H.useActionState(j, I, se);
  }, Me.useCallback = function(j, I) {
    return te.H.useCallback(j, I);
  }, Me.useContext = function(j) {
    return te.H.useContext(j);
  }, Me.useDebugValue = function() {
  }, Me.useDeferredValue = function(j, I) {
    return te.H.useDeferredValue(j, I);
  }, Me.useEffect = function(j, I) {
    return te.H.useEffect(j, I);
  }, Me.useEffectEvent = function(j) {
    return te.H.useEffectEvent(j);
  }, Me.useId = function() {
    return te.H.useId();
  }, Me.useImperativeHandle = function(j, I, se) {
    return te.H.useImperativeHandle(j, I, se);
  }, Me.useInsertionEffect = function(j, I) {
    return te.H.useInsertionEffect(j, I);
  }, Me.useLayoutEffect = function(j, I) {
    return te.H.useLayoutEffect(j, I);
  }, Me.useMemo = function(j, I) {
    return te.H.useMemo(j, I);
  }, Me.useOptimistic = function(j, I) {
    return te.H.useOptimistic(j, I);
  }, Me.useReducer = function(j, I, se) {
    return te.H.useReducer(j, I, se);
  }, Me.useRef = function(j) {
    return te.H.useRef(j);
  }, Me.useState = function(j) {
    return te.H.useState(j);
  }, Me.useSyncExternalStore = function(j, I, se) {
    return te.H.useSyncExternalStore(
      j,
      I,
      se
    );
  }, Me.useTransition = function() {
    return te.H.useTransition();
  }, Me.version = "19.2.5", Me;
}
var _g;
function th() {
  return _g || (_g = 1, Pf.exports = sT()), Pf.exports;
}
var S = th();
const oT = /* @__PURE__ */ iT(S), uT = /* @__PURE__ */ aT({
  __proto__: null,
  default: oT
}, [S]);
var Yf = { exports: {} }, Br = {}, Gf = { exports: {} }, Ff = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Og;
function cT() {
  return Og || (Og = 1, (function(t) {
    function a(N, J) {
      var re = N.length;
      N.push(J);
      e: for (; 0 < re; ) {
        var ce = re - 1 >>> 1, Te = N[ce];
        if (0 < o(Te, J))
          N[ce] = J, N[re] = Te, re = ce;
        else break e;
      }
    }
    function l(N) {
      return N.length === 0 ? null : N[0];
    }
    function s(N) {
      if (N.length === 0) return null;
      var J = N[0], re = N.pop();
      if (re !== J) {
        N[0] = re;
        e: for (var ce = 0, Te = N.length, j = Te >>> 1; ce < j; ) {
          var I = 2 * (ce + 1) - 1, se = N[I], ue = I + 1, Se = N[ue];
          if (0 > o(se, re))
            ue < Te && 0 > o(Se, se) ? (N[ce] = Se, N[ue] = re, ce = ue) : (N[ce] = se, N[I] = re, ce = I);
          else if (ue < Te && 0 > o(Se, re))
            N[ce] = Se, N[ue] = re, ce = ue;
          else break e;
        }
      }
      return J;
    }
    function o(N, J) {
      var re = N.sortIndex - J.sortIndex;
      return re !== 0 ? re : N.id - J.id;
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
    var p = [], m = [], y = 1, b = null, x = 3, T = !1, w = !1, C = !1, D = !1, _ = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, O = typeof setImmediate < "u" ? setImmediate : null;
    function B(N) {
      for (var J = l(m); J !== null; ) {
        if (J.callback === null) s(m);
        else if (J.startTime <= N)
          s(m), J.sortIndex = J.expirationTime, a(p, J);
        else break;
        J = l(m);
      }
    }
    function F(N) {
      if (C = !1, B(N), !w)
        if (l(p) !== null)
          w = !0, ne || (ne = !0, X());
        else {
          var J = l(m);
          J !== null && Z(F, J.startTime - N);
        }
    }
    var ne = !1, te = -1, R = 5, H = -1;
    function K() {
      return D ? !0 : !(t.unstable_now() - H < R);
    }
    function ie() {
      if (D = !1, ne) {
        var N = t.unstable_now();
        H = N;
        var J = !0;
        try {
          e: {
            w = !1, C && (C = !1, L(te), te = -1), T = !0;
            var re = x;
            try {
              t: {
                for (B(N), b = l(p); b !== null && !(b.expirationTime > N && K()); ) {
                  var ce = b.callback;
                  if (typeof ce == "function") {
                    b.callback = null, x = b.priorityLevel;
                    var Te = ce(
                      b.expirationTime <= N
                    );
                    if (N = t.unstable_now(), typeof Te == "function") {
                      b.callback = Te, B(N), J = !0;
                      break t;
                    }
                    b === l(p) && s(p), B(N);
                  } else s(p);
                  b = l(p);
                }
                if (b !== null) J = !0;
                else {
                  var j = l(m);
                  j !== null && Z(
                    F,
                    j.startTime - N
                  ), J = !1;
                }
              }
              break e;
            } finally {
              b = null, x = re, T = !1;
            }
            J = void 0;
          }
        } finally {
          J ? X() : ne = !1;
        }
      }
    }
    var X;
    if (typeof O == "function")
      X = function() {
        O(ie);
      };
    else if (typeof MessageChannel < "u") {
      var le = new MessageChannel(), G = le.port2;
      le.port1.onmessage = ie, X = function() {
        G.postMessage(null);
      };
    } else
      X = function() {
        _(ie, 0);
      };
    function Z(N, J) {
      te = _(function() {
        N(t.unstable_now());
      }, J);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(N) {
      N.callback = null;
    }, t.unstable_forceFrameRate = function(N) {
      0 > N || 125 < N ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : R = 0 < N ? Math.floor(1e3 / N) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return x;
    }, t.unstable_next = function(N) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var J = 3;
          break;
        default:
          J = x;
      }
      var re = x;
      x = J;
      try {
        return N();
      } finally {
        x = re;
      }
    }, t.unstable_requestPaint = function() {
      D = !0;
    }, t.unstable_runWithPriority = function(N, J) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var re = x;
      x = N;
      try {
        return J();
      } finally {
        x = re;
      }
    }, t.unstable_scheduleCallback = function(N, J, re) {
      var ce = t.unstable_now();
      switch (typeof re == "object" && re !== null ? (re = re.delay, re = typeof re == "number" && 0 < re ? ce + re : ce) : re = ce, N) {
        case 1:
          var Te = -1;
          break;
        case 2:
          Te = 250;
          break;
        case 5:
          Te = 1073741823;
          break;
        case 4:
          Te = 1e4;
          break;
        default:
          Te = 5e3;
      }
      return Te = re + Te, N = {
        id: y++,
        callback: J,
        priorityLevel: N,
        startTime: re,
        expirationTime: Te,
        sortIndex: -1
      }, re > ce ? (N.sortIndex = re, a(m, N), l(p) === null && N === l(m) && (C ? (L(te), te = -1) : C = !0, Z(F, re - ce))) : (N.sortIndex = Te, a(p, N), w || T || (w = !0, ne || (ne = !0, X()))), N;
    }, t.unstable_shouldYield = K, t.unstable_wrapCallback = function(N) {
      var J = x;
      return function() {
        var re = x;
        x = J;
        try {
          return N.apply(this, arguments);
        } finally {
          x = re;
        }
      };
    };
  })(Ff)), Ff;
}
var Lg;
function fT() {
  return Lg || (Lg = 1, Gf.exports = cT()), Gf.exports;
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
var Ug;
function dT() {
  if (Ug) return Pt;
  Ug = 1;
  var t = th();
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
      var y = m.as, b = h(y, m.crossOrigin), x = typeof m.integrity == "string" ? m.integrity : void 0, T = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? s.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: b,
          integrity: x,
          fetchPriority: T
        }
      ) : y === "script" && s.d.X(p, {
        crossOrigin: b,
        integrity: x,
        fetchPriority: T,
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
var Vg;
function hT() {
  if (Vg) return $f.exports;
  Vg = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), $f.exports = dT(), $f.exports;
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
var Bg;
function mT() {
  if (Bg) return Br;
  Bg = 1;
  var t = fT(), a = th(), l = hT();
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
        for (var v = !1, E = u.child; E; ) {
          if (E === i) {
            v = !0, i = u, r = d;
            break;
          }
          if (E === r) {
            v = !0, r = u, i = d;
            break;
          }
          E = E.sibling;
        }
        if (!v) {
          for (E = d.child; E; ) {
            if (E === i) {
              v = !0, i = d, r = u;
              break;
            }
            if (E === r) {
              v = !0, r = d, i = u;
              break;
            }
            E = E.sibling;
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
  var b = Object.assign, x = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), O = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), H = Symbol.for("react.activity"), K = Symbol.for("react.memo_cache_sentinel"), ie = Symbol.iterator;
  function X(e) {
    return e === null || typeof e != "object" ? null : (e = ie && e[ie] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var le = Symbol.for("react.client.reference");
  function G(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case _:
        return "Profiler";
      case D:
        return "StrictMode";
      case F:
        return "Suspense";
      case ne:
        return "SuspenseList";
      case H:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case O:
          return e.displayName || "Context";
        case L:
          return (e._context.displayName || "Context") + ".Consumer";
        case B:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case te:
          return n = e.displayName || null, n !== null ? n : G(e.type) || "Memo";
        case R:
          n = e._payload, e = e._init;
          try {
            return G(e(n));
          } catch {
          }
      }
    return null;
  }
  var Z = Array.isArray, N = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, re = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ce = [], Te = -1;
  function j(e) {
    return { current: e };
  }
  function I(e) {
    0 > Te || (e.current = ce[Te], ce[Te] = null, Te--);
  }
  function se(e, n) {
    Te++, ce[Te] = e.current, e.current = n;
  }
  var ue = j(null), Se = j(null), Re = j(null), De = j(null);
  function ht(e, n) {
    switch (se(Re, n), se(Se, e), se(ue, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Wy(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Wy(n), e = eg(n, e);
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
    I(ue), se(ue, e);
  }
  function $e() {
    I(ue), I(Se), I(Re);
  }
  function ea(e) {
    e.memoizedState !== null && se(De, e);
    var n = ue.current, i = eg(n, e.type);
    n !== i && (se(Se, e), se(ue, i));
  }
  function Ca(e) {
    Se.current === e && (I(ue), I(Se)), De.current === e && (I(De), _r._currentValue = re);
  }
  var kn, yt;
  function Ht(e) {
    if (kn === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        kn = n && n[1] || "", yt = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + kn + e + yt;
  }
  var Ma = !1;
  function di(e, n) {
    if (!e || Ma) return "";
    Ma = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var ee = function() {
                throw Error();
              };
              if (Object.defineProperty(ee.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(ee, []);
                } catch ($) {
                  var Y = $;
                }
                Reflect.construct(e, [], ee);
              } else {
                try {
                  ee.call();
                } catch ($) {
                  Y = $;
                }
                e.call(ee.prototype);
              }
            } else {
              try {
                throw Error();
              } catch ($) {
                Y = $;
              }
              (ee = e()) && typeof ee.catch == "function" && ee.catch(function() {
              });
            }
          } catch ($) {
            if ($ && Y && typeof $.stack == "string")
              return [$.stack, Y.stack];
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
      var d = r.DetermineComponentFrameRoot(), v = d[0], E = d[1];
      if (v && E) {
        var M = v.split(`
`), k = E.split(`
`);
        for (u = r = 0; r < M.length && !M[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; u < k.length && !k[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (r === M.length || u === k.length)
          for (r = M.length - 1, u = k.length - 1; 1 <= r && 0 <= u && M[r] !== k[u]; )
            u--;
        for (; 1 <= r && 0 <= u; r--, u--)
          if (M[r] !== k[u]) {
            if (r !== 1 || u !== 1)
              do
                if (r--, u--, 0 > u || M[r] !== k[u]) {
                  var Q = `
` + M[r].replace(" at new ", " at ");
                  return e.displayName && Q.includes("<anonymous>") && (Q = Q.replace("<anonymous>", e.displayName)), Q;
                }
              while (1 <= r && 0 <= u);
            break;
          }
      }
    } finally {
      Ma = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Ht(i) : "";
  }
  function be(e, n) {
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
        return di(e.type, !1);
      case 11:
        return di(e.type.render, !1);
      case 1:
        return di(e.type, !0);
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
        n += be(e, i), i = e, e = e.return;
      while (e);
      return n;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var Fe = Object.prototype.hasOwnProperty, ut = t.unstable_scheduleCallback, ta = t.unstable_cancelCallback, ju = t.unstable_shouldYield, Du = t.unstable_requestPaint, Gt = t.unstable_now, na = t.unstable_getCurrentPriorityLevel, Aa = t.unstable_ImmediatePriority, Il = t.unstable_UserBlockingPriority, ja = t.unstable_NormalPriority, Nn = t.unstable_LowPriority, mn = t.unstable_IdlePriority, ys = t.log, Nu = t.unstable_setDisableYieldValue, aa = null, Ft = null;
  function Dt(e) {
    if (typeof ys == "function" && Nu(e), Ft && typeof Ft.setStrictMode == "function")
      try {
        Ft.setStrictMode(aa, e);
      } catch {
      }
  }
  var qt = Math.clz32 ? Math.clz32 : zu, gs = Math.log, vs = Math.LN2;
  function zu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (gs(e) / vs | 0) | 0;
  }
  var hi = 256, ia = 262144, mi = 4194304;
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
    var E = r & 134217727;
    return E !== 0 ? (r = E & ~d, r !== 0 ? u = zn(r) : (v &= E, v !== 0 ? u = zn(v) : i || (i = E & ~e, i !== 0 && (u = zn(i))))) : (E = r & ~d, E !== 0 ? u = zn(E) : v !== 0 ? u = zn(v) : i || (i = r & ~e, i !== 0 && (u = zn(i)))), u === 0 ? 0 : n !== 0 && n !== u && (n & d) === 0 && (d = u & -u, i = n & -n, d >= i || d === 32 && (i & 4194048) !== 0) ? n : u;
  }
  function Da(e, n) {
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
    var e = mi;
    return mi <<= 1, (mi & 62914560) === 0 && (mi = 4194304), e;
  }
  function Na(e) {
    for (var n = [], i = 0; 31 > i; i++) n.push(e);
    return n;
  }
  function Pn(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function bs(e, n, i, r, u, d) {
    var v = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var E = e.entanglements, M = e.expirationTimes, k = e.hiddenUpdates;
    for (i = v & ~i; 0 < i; ) {
      var Q = 31 - qt(i), ee = 1 << Q;
      E[Q] = 0, M[Q] = -1;
      var Y = k[Q];
      if (Y !== null)
        for (k[Q] = null, Q = 0; Q < Y.length; Q++) {
          var $ = Y[Q];
          $ !== null && ($.lane &= -536870913);
        }
      i &= ~ee;
    }
    r !== 0 && xs(e, r, 0), d !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(v & ~n));
  }
  function xs(e, n, i) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var r = 31 - qt(n);
    e.entangledLanes |= n, e.entanglements[r] = e.entanglements[r] | 1073741824 | i & 261930;
  }
  function Ss(e, n) {
    var i = e.entangledLanes |= n;
    for (e = e.entanglements; i; ) {
      var r = 31 - qt(i), u = 1 << r;
      u & n | e[r] & n && (e[r] |= n), i &= ~u;
    }
  }
  function A(e, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : U(i), (i & (e.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function U(e) {
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
  function ae() {
    var e = J.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Tg(e.type));
  }
  function oe(e, n) {
    var i = J.p;
    try {
      return J.p = e, n();
    } finally {
      J.p = i;
    }
  }
  var pe = Math.random().toString(36).slice(2), fe = "__reactFiber$" + pe, de = "__reactProps$" + pe, ge = "__reactContainer$" + pe, he = "__reactEvents$" + pe, we = "__reactListeners$" + pe, xe = "__reactHandles$" + pe, ke = "__reactResources$" + pe, Ne = "__reactMarker$" + pe;
  function et(e) {
    delete e[fe], delete e[de], delete e[he], delete e[we], delete e[xe];
  }
  function Qe(e) {
    var n = e[fe];
    if (n) return n;
    for (var i = e.parentNode; i; ) {
      if (n = i[ge] || i[fe]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (e = sg(e); e !== null; ) {
            if (i = e[fe]) return i;
            e = sg(e);
          }
        return n;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function ct(e) {
    if (e = e[fe] || e[ge]) {
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
    var n = e[ke];
    return n || (n = e[ke] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function at(e) {
    e[Ne] = !0;
  }
  var za = /* @__PURE__ */ new Set(), _n = {};
  function Nt(e, n) {
    Yn(e, n), Yn(e + "Capture", n);
  }
  function Yn(e, n) {
    for (_n[e] = n, e = 0; e < n.length; e++)
      za.add(n[e]);
  }
  var pi = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Gn = {}, yi = {};
  function Ki(e) {
    return Fe.call(yi, e) ? !0 : Fe.call(Gn, e) ? !1 : pi.test(e) ? yi[e] = !0 : (Gn[e] = !0, !1);
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
  function kt(e, n, i, r) {
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
  var ZS = /[\n"\\]/g;
  function pn(e) {
    return e.replace(
      ZS,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ou(e, n, i, r, u, d, v, E) {
    e.name = "", v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? e.type = v : e.removeAttribute("type"), n != null ? v === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + Et(n)) : e.value !== "" + Et(n) && (e.value = "" + Et(n)) : v !== "submit" && v !== "reset" || e.removeAttribute("value"), n != null ? Lu(e, v, Et(n)) : i != null ? Lu(e, v, Et(i)) : r != null && e.removeAttribute("value"), u == null && d != null && (e.defaultChecked = !!d), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + Et(E) : e.removeAttribute("name");
  }
  function Xh(e, n, i, r, u, d, v, E) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), n != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        Zi(e);
        return;
      }
      i = i != null ? "" + Et(i) : "", n = n != null ? "" + Et(n) : i, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    r = r ?? u, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = E ? e.checked : !!r, e.defaultChecked = !!r, v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" && (e.name = v), Zi(e);
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
  function Ih(e, n, i) {
    if (n != null && (n = "" + Et(n), n !== e.value && (e.value = n), i == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = i != null ? "" + Et(i) : "";
  }
  function Kh(e, n, i, r) {
    if (n == null) {
      if (r != null) {
        if (i != null) throw Error(s(92));
        if (Z(r)) {
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
  var JS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Qh(e, n, i) {
    var r = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? r ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : r ? e.setProperty(n, i) : typeof i != "number" || i === 0 || JS.has(n) ? n === "float" ? e.cssFloat = i : e[n] = ("" + i).trim() : e[n] = i + "px";
  }
  function Zh(e, n, i) {
    if (n != null && typeof n != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var r in i)
        !i.hasOwnProperty(r) || n != null && n.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var u in n)
        r = n[u], n.hasOwnProperty(u) && i[u] !== r && Qh(e, u, r);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && Qh(e, d, n[d]);
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
  var WS = /* @__PURE__ */ new Map([
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
  ]), e1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ws(e) {
    return e1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function la() {
  }
  var Vu = null;
  function Bu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var el = null, tl = null;
  function Jh(e) {
    var n = ct(e);
    if (n && (e = n.stateNode)) {
      var i = e[de] || null;
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
            for (n = 0; n < i.length; n++)
              r = i[n], r.form === e.form && Es(r);
          }
          break e;
        case "textarea":
          Ih(e, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && Ji(e, !!i.multiple, n, !1);
      }
    }
  }
  var Hu = !1;
  function Wh(e, n, i) {
    if (Hu) return e(n, i);
    Hu = !0;
    try {
      var r = e(n);
      return r;
    } finally {
      if (Hu = !1, (el !== null || tl !== null) && (fo(), el && (n = el, e = tl, tl = el = null, Jh(n), e)))
        for (n = 0; n < e.length; n++) Jh(e[n]);
    }
  }
  function Ql(e, n) {
    var i = e.stateNode;
    if (i === null) return null;
    var r = i[de] || null;
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
  var ra = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), qu = !1;
  if (ra)
    try {
      var Zl = {};
      Object.defineProperty(Zl, "passive", {
        get: function() {
          qu = !0;
        }
      }), window.addEventListener("test", Zl, Zl), window.removeEventListener("test", Zl, Zl);
    } catch {
      qu = !1;
    }
  var _a = null, ku = null, Rs = null;
  function em() {
    if (Rs) return Rs;
    var e, n = ku, i = n.length, r, u = "value" in _a ? _a.value : _a.textContent, d = u.length;
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
  function tm() {
    return !1;
  }
  function Kt(e) {
    function n(i, r, u, d, v) {
      this._reactName = i, this._targetInst = u, this.type = r, this.nativeEvent = d, this.target = v, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (i = e[E], this[E] = i ? i(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Ms : tm, this.isPropagationStopped = tm, this;
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
  var gi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, As = Kt(gi), Jl = b({}, gi, { view: 0, detail: 0 }), t1 = Kt(Jl), Pu, Yu, Wl, js = b({}, Jl, {
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
    getModifierState: Fu,
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
  }), nm = Kt(js), n1 = b({}, js, { dataTransfer: 0 }), a1 = Kt(n1), i1 = b({}, Jl, { relatedTarget: 0 }), Gu = Kt(i1), l1 = b({}, gi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), r1 = Kt(l1), s1 = b({}, gi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), o1 = Kt(s1), u1 = b({}, gi, { data: 0 }), am = Kt(u1), c1 = {
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
  }, f1 = {
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
  }, d1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function h1(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = d1[e]) ? !!n[e] : !1;
  }
  function Fu() {
    return h1;
  }
  var m1 = b({}, Jl, {
    key: function(e) {
      if (e.key) {
        var n = c1[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Cs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? f1[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fu,
    charCode: function(e) {
      return e.type === "keypress" ? Cs(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Cs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), p1 = Kt(m1), y1 = b({}, js, {
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
  }), im = Kt(y1), g1 = b({}, Jl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fu
  }), v1 = Kt(g1), b1 = b({}, gi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), x1 = Kt(b1), S1 = b({}, js, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), E1 = Kt(S1), T1 = b({}, gi, {
    newState: 0,
    oldState: 0
  }), w1 = Kt(T1), R1 = [9, 13, 27, 32], $u = ra && "CompositionEvent" in window, er = null;
  ra && "documentMode" in document && (er = document.documentMode);
  var C1 = ra && "TextEvent" in window && !er, lm = ra && (!$u || er && 8 < er && 11 >= er), rm = " ", sm = !1;
  function om(e, n) {
    switch (e) {
      case "keyup":
        return R1.indexOf(n.keyCode) !== -1;
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
  function um(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var nl = !1;
  function M1(e, n) {
    switch (e) {
      case "compositionend":
        return um(n);
      case "keypress":
        return n.which !== 32 ? null : (sm = !0, rm);
      case "textInput":
        return e = n.data, e === rm && sm ? null : e;
      default:
        return null;
    }
  }
  function A1(e, n) {
    if (nl)
      return e === "compositionend" || !$u && om(e, n) ? (e = em(), Rs = ku = _a = null, nl = !1, e) : null;
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
        return lm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var j1 = {
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
  function cm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!j1[e.type] : n === "textarea";
  }
  function fm(e, n, i, r) {
    el ? tl ? tl.push(r) : tl = [r] : el = r, n = bo(n, "onChange"), 0 < n.length && (i = new As(
      "onChange",
      "change",
      null,
      i,
      r
    ), e.push({ event: i, listeners: n }));
  }
  var tr = null, nr = null;
  function D1(e) {
    Xy(e, 0);
  }
  function Ds(e) {
    var n = Le(e);
    if (Es(n)) return e;
  }
  function dm(e, n) {
    if (e === "change") return n;
  }
  var hm = !1;
  if (ra) {
    var Xu;
    if (ra) {
      var Iu = "oninput" in document;
      if (!Iu) {
        var mm = document.createElement("div");
        mm.setAttribute("oninput", "return;"), Iu = typeof mm.oninput == "function";
      }
      Xu = Iu;
    } else Xu = !1;
    hm = Xu && (!document.documentMode || 9 < document.documentMode);
  }
  function pm() {
    tr && (tr.detachEvent("onpropertychange", ym), nr = tr = null);
  }
  function ym(e) {
    if (e.propertyName === "value" && Ds(nr)) {
      var n = [];
      fm(
        n,
        nr,
        e,
        Bu(e)
      ), Wh(D1, n);
    }
  }
  function N1(e, n, i) {
    e === "focusin" ? (pm(), tr = n, nr = i, tr.attachEvent("onpropertychange", ym)) : e === "focusout" && pm();
  }
  function z1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ds(nr);
  }
  function _1(e, n) {
    if (e === "click") return Ds(n);
  }
  function O1(e, n) {
    if (e === "input" || e === "change")
      return Ds(n);
  }
  function L1(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var ln = typeof Object.is == "function" ? Object.is : L1;
  function ar(e, n) {
    if (ln(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(e), r = Object.keys(n);
    if (i.length !== r.length) return !1;
    for (r = 0; r < i.length; r++) {
      var u = i[r];
      if (!Fe.call(n, u) || !ln(e[u], n[u]))
        return !1;
    }
    return !0;
  }
  function gm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function vm(e, n) {
    var i = gm(e);
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
      i = gm(i);
    }
  }
  function bm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? bm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function xm(e) {
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
  var U1 = ra && "documentMode" in document && 11 >= document.documentMode, al = null, Qu = null, ir = null, Zu = !1;
  function Sm(e, n, i) {
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
  function vi(e, n) {
    var i = {};
    return i[e.toLowerCase()] = n.toLowerCase(), i["Webkit" + e] = "webkit" + n, i["Moz" + e] = "moz" + n, i;
  }
  var il = {
    animationend: vi("Animation", "AnimationEnd"),
    animationiteration: vi("Animation", "AnimationIteration"),
    animationstart: vi("Animation", "AnimationStart"),
    transitionrun: vi("Transition", "TransitionRun"),
    transitionstart: vi("Transition", "TransitionStart"),
    transitioncancel: vi("Transition", "TransitionCancel"),
    transitionend: vi("Transition", "TransitionEnd")
  }, Ju = {}, Em = {};
  ra && (Em = document.createElement("div").style, "AnimationEvent" in window || (delete il.animationend.animation, delete il.animationiteration.animation, delete il.animationstart.animation), "TransitionEvent" in window || delete il.transitionend.transition);
  function bi(e) {
    if (Ju[e]) return Ju[e];
    if (!il[e]) return e;
    var n = il[e], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Em)
        return Ju[e] = n[i];
    return e;
  }
  var Tm = bi("animationend"), wm = bi("animationiteration"), Rm = bi("animationstart"), V1 = bi("transitionrun"), B1 = bi("transitionstart"), H1 = bi("transitioncancel"), Cm = bi("transitionend"), Mm = /* @__PURE__ */ new Map(), Wu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Wu.push("scrollEnd");
  function On(e, n) {
    Mm.set(e, n), Nt(n, [e]);
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
      d !== 0 && Am(i, u, d);
    }
  }
  function _s(e, n, i, r) {
    yn[ll++] = e, yn[ll++] = n, yn[ll++] = i, yn[ll++] = r, ec |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function tc(e, n, i, r) {
    return _s(e, n, i, r), Os(e);
  }
  function xi(e, n) {
    return _s(e, null, null, n), Os(e);
  }
  function Am(e, n, i) {
    e.lanes |= i;
    var r = e.alternate;
    r !== null && (r.lanes |= i);
    for (var u = !1, d = e.return; d !== null; )
      d.childLanes |= i, r = d.alternate, r !== null && (r.childLanes |= i), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (u = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, u && n !== null && (u = 31 - qt(i), e = d.hiddenUpdates, r = e[u], r === null ? e[u] = [n] : r.push(n), n.lane = i | 536870912), d) : null;
  }
  function Os(e) {
    if (50 < Cr)
      throw Cr = 0, ff = null, Error(s(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var rl = {};
  function q1(e, n, i, r) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function rn(e, n, i, r) {
    return new q1(e, n, i, r);
  }
  function nc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function sa(e, n) {
    var i = e.alternate;
    return i === null ? (i = rn(
      e.tag,
      n,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = n, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, n = e.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function jm(e, n) {
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
      v = FE(
        e,
        i,
        ue.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case H:
          return e = rn(31, i, n, u), e.elementType = H, e.lanes = d, e;
        case C:
          return Si(i.children, u, d, n);
        case D:
          v = 8, u |= 24;
          break;
        case _:
          return e = rn(12, i, n, u | 2), e.elementType = _, e.lanes = d, e;
        case F:
          return e = rn(13, i, n, u), e.elementType = F, e.lanes = d, e;
        case ne:
          return e = rn(19, i, n, u), e.elementType = ne, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case O:
                v = 10;
                break e;
              case L:
                v = 9;
                break e;
              case B:
                v = 11;
                break e;
              case te:
                v = 14;
                break e;
              case R:
                v = 16, r = null;
                break e;
            }
          v = 29, i = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), r = null;
      }
    return n = rn(v, i, n, u), n.elementType = e, n.type = r, n.lanes = d, n;
  }
  function Si(e, n, i, r) {
    return e = rn(7, e, r, n), e.lanes = i, e;
  }
  function ac(e, n, i) {
    return e = rn(6, e, null, n), e.lanes = i, e;
  }
  function Dm(e) {
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
  var Nm = /* @__PURE__ */ new WeakMap();
  function gn(e, n) {
    if (typeof e == "object" && e !== null) {
      var i = Nm.get(e);
      return i !== void 0 ? i : (n = {
        value: e,
        source: n,
        stack: Oe(n)
      }, Nm.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Oe(n)
    };
  }
  var sl = [], ol = 0, Us = null, lr = 0, vn = [], bn = 0, Oa = null, Fn = 1, $n = "";
  function oa(e, n) {
    sl[ol++] = lr, sl[ol++] = Us, Us = e, lr = n;
  }
  function zm(e, n, i) {
    vn[bn++] = Fn, vn[bn++] = $n, vn[bn++] = Oa, Oa = e;
    var r = Fn;
    e = $n;
    var u = 32 - qt(r) - 1;
    r &= ~(1 << u), i += 1;
    var d = 32 - qt(n) + u;
    if (30 < d) {
      var v = u - u % 5;
      d = (r & (1 << v) - 1).toString(32), r >>= v, u -= v, Fn = 1 << 32 - qt(n) + u | i << u | r, $n = d + e;
    } else
      Fn = 1 << d | i << u | r, $n = e;
  }
  function lc(e) {
    e.return !== null && (oa(e, 1), zm(e, 1, 0));
  }
  function rc(e) {
    for (; e === Us; )
      Us = sl[--ol], sl[ol] = null, lr = sl[--ol], sl[ol] = null;
    for (; e === Oa; )
      Oa = vn[--bn], vn[bn] = null, $n = vn[--bn], vn[bn] = null, Fn = vn[--bn], vn[bn] = null;
  }
  function _m(e, n) {
    vn[bn++] = Fn, vn[bn++] = $n, vn[bn++] = Oa, Fn = n.id, $n = n.overflow, Oa = e;
  }
  var _t = null, lt = null, qe = !1, La = null, xn = !1, sc = Error(s(519));
  function Ua(e) {
    var n = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw rr(gn(n, e)), sc;
  }
  function Om(e) {
    var n = e.stateNode, i = e.type, r = e.memoizedProps;
    switch (n[fe] = e, n[de] = r, i) {
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
        Ve("invalid", n), Xh(
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
        Ve("invalid", n), Kh(n, r.value, r.defaultValue, r.children);
    }
    i = r.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || r.suppressHydrationWarning === !0 || Zy(n.textContent, i) ? (r.popover != null && (Ve("beforetoggle", n), Ve("toggle", n)), r.onScroll != null && Ve("scroll", n), r.onScrollEnd != null && Ve("scrollend", n), r.onClick != null && (n.onclick = la), n = !0) : n = !1, n || Ua(e, !0);
  }
  function Lm(e) {
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
    if (!qe) return Lm(e), qe = !0, !1;
    var n = e.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || Cf(e.type, e.memoizedProps)), i = !i), i && lt && Ua(e), Lm(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      lt = rg(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      lt = rg(e);
    } else
      n === 27 ? (n = lt, Qa(e.type) ? (e = Nf, Nf = null, lt = e) : lt = n) : lt = _t ? En(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ei() {
    lt = _t = null, qe = !1;
  }
  function oc() {
    var e = La;
    return e !== null && (Wt === null ? Wt = e : Wt.push.apply(
      Wt,
      e
    ), La = null), e;
  }
  function rr(e) {
    La === null ? La = [e] : La.push(e);
  }
  var uc = j(null), Ti = null, ua = null;
  function Va(e, n, i) {
    se(uc, n._currentValue), n._currentValue = i;
  }
  function ca(e) {
    e._currentValue = uc.current, I(uc);
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
          var E = d;
          d = u;
          for (var M = 0; M < n.length; M++)
            if (E.context === n[M]) {
              d.lanes |= i, E = d.alternate, E !== null && (E.lanes |= i), cc(
                d.return,
                i,
                e
              ), r || (v = null);
              break e;
            }
          d = E.next;
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
          var E = u.type;
          ln(u.pendingProps.value, v.value) || (e !== null ? e.push(E) : e = [E]);
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
  function wi(e) {
    Ti = e, ua = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ot(e) {
    return Um(Ti, e);
  }
  function Bs(e, n) {
    return Ti === null && wi(e), Um(e, n);
  }
  function Um(e, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, ua === null) {
      if (e === null) throw Error(s(308));
      ua = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else ua = ua.next = n;
    return i;
  }
  var k1 = typeof AbortController < "u" ? AbortController : function() {
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
  }, P1 = t.unstable_scheduleCallback, Y1 = t.unstable_NormalPriority, Tt = {
    $$typeof: O,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function dc() {
    return {
      controller: new k1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function sr(e) {
    e.refCount--, e.refCount === 0 && P1(Y1, function() {
      e.controller.abort();
    });
  }
  var or = null, hc = 0, fl = 0, dl = null;
  function G1(e, n) {
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
    return hc++, n.then(Vm, Vm), n;
  }
  function Vm() {
    if (--hc === 0 && or !== null) {
      dl !== null && (dl.status = "fulfilled");
      var e = or;
      or = null, fl = 0, dl = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function F1(e, n) {
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
  var Bm = N.S;
  N.S = function(e, n) {
    Sy = Gt(), typeof n == "object" && n !== null && typeof n.then == "function" && G1(e, n), Bm !== null && Bm(e, n);
  };
  var Ri = j(null);
  function mc() {
    var e = Ri.current;
    return e !== null ? e : tt.pooledCache;
  }
  function Hs(e, n) {
    n === null ? se(Ri, Ri.current) : se(Ri, n.pool);
  }
  function Hm() {
    var e = mc();
    return e === null ? null : { parent: Tt._currentValue, pool: e };
  }
  var hl = Error(s(460)), pc = Error(s(474)), qs = Error(s(542)), ks = { then: function() {
  } };
  function qm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function km(e, n, i) {
    switch (i = e[i], i === void 0 ? e.push(n) : i !== n && (n.then(la, la), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, Ym(e), e;
      default:
        if (typeof n.status == "string") n.then(la, la);
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
            throw e = n.reason, Ym(e), e;
        }
        throw Mi = n, hl;
    }
  }
  function Ci(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (Mi = i, hl) : i;
    }
  }
  var Mi = null;
  function Pm() {
    if (Mi === null) throw Error(s(459));
    var e = Mi;
    return Mi = null, e;
  }
  function Ym(e) {
    if (e === hl || e === qs)
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
  function Gm(e) {
    function n(V, z) {
      if (e) {
        var q = V.deletions;
        q === null ? (V.deletions = [z], V.flags |= 16) : q.push(z);
      }
    }
    function i(V, z) {
      if (!e) return null;
      for (; z !== null; )
        n(V, z), z = z.sibling;
      return null;
    }
    function r(V) {
      for (var z = /* @__PURE__ */ new Map(); V !== null; )
        V.key !== null ? z.set(V.key, V) : z.set(V.index, V), V = V.sibling;
      return z;
    }
    function u(V, z) {
      return V = sa(V, z), V.index = 0, V.sibling = null, V;
    }
    function d(V, z, q) {
      return V.index = q, e ? (q = V.alternate, q !== null ? (q = q.index, q < z ? (V.flags |= 67108866, z) : q) : (V.flags |= 67108866, z)) : (V.flags |= 1048576, z);
    }
    function v(V) {
      return e && V.alternate === null && (V.flags |= 67108866), V;
    }
    function E(V, z, q, W) {
      return z === null || z.tag !== 6 ? (z = ac(q, V.mode, W), z.return = V, z) : (z = u(z, q), z.return = V, z);
    }
    function M(V, z, q, W) {
      var Ee = q.type;
      return Ee === C ? Q(
        V,
        z,
        q.props.children,
        W,
        q.key
      ) : z !== null && (z.elementType === Ee || typeof Ee == "object" && Ee !== null && Ee.$$typeof === R && Ci(Ee) === z.type) ? (z = u(z, q.props), cr(z, q), z.return = V, z) : (z = Ls(
        q.type,
        q.key,
        q.props,
        null,
        V.mode,
        W
      ), cr(z, q), z.return = V, z);
    }
    function k(V, z, q, W) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== q.containerInfo || z.stateNode.implementation !== q.implementation ? (z = ic(q, V.mode, W), z.return = V, z) : (z = u(z, q.children || []), z.return = V, z);
    }
    function Q(V, z, q, W, Ee) {
      return z === null || z.tag !== 7 ? (z = Si(
        q,
        V.mode,
        W,
        Ee
      ), z.return = V, z) : (z = u(z, q), z.return = V, z);
    }
    function ee(V, z, q) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = ac(
          "" + z,
          V.mode,
          q
        ), z.return = V, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case T:
            return q = Ls(
              z.type,
              z.key,
              z.props,
              null,
              V.mode,
              q
            ), cr(q, z), q.return = V, q;
          case w:
            return z = ic(
              z,
              V.mode,
              q
            ), z.return = V, z;
          case R:
            return z = Ci(z), ee(V, z, q);
        }
        if (Z(z) || X(z))
          return z = Si(
            z,
            V.mode,
            q,
            null
          ), z.return = V, z;
        if (typeof z.then == "function")
          return ee(V, Ps(z), q);
        if (z.$$typeof === O)
          return ee(
            V,
            Bs(V, z),
            q
          );
        Ys(V, z);
      }
      return null;
    }
    function Y(V, z, q, W) {
      var Ee = z !== null ? z.key : null;
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return Ee !== null ? null : E(V, z, "" + q, W);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case T:
            return q.key === Ee ? M(V, z, q, W) : null;
          case w:
            return q.key === Ee ? k(V, z, q, W) : null;
          case R:
            return q = Ci(q), Y(V, z, q, W);
        }
        if (Z(q) || X(q))
          return Ee !== null ? null : Q(V, z, q, W, null);
        if (typeof q.then == "function")
          return Y(
            V,
            z,
            Ps(q),
            W
          );
        if (q.$$typeof === O)
          return Y(
            V,
            z,
            Bs(V, q),
            W
          );
        Ys(V, q);
      }
      return null;
    }
    function $(V, z, q, W, Ee) {
      if (typeof W == "string" && W !== "" || typeof W == "number" || typeof W == "bigint")
        return V = V.get(q) || null, E(z, V, "" + W, Ee);
      if (typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case T:
            return V = V.get(
              W.key === null ? q : W.key
            ) || null, M(z, V, W, Ee);
          case w:
            return V = V.get(
              W.key === null ? q : W.key
            ) || null, k(z, V, W, Ee);
          case R:
            return W = Ci(W), $(
              V,
              z,
              q,
              W,
              Ee
            );
        }
        if (Z(W) || X(W))
          return V = V.get(q) || null, Q(z, V, W, Ee, null);
        if (typeof W.then == "function")
          return $(
            V,
            z,
            q,
            Ps(W),
            Ee
          );
        if (W.$$typeof === O)
          return $(
            V,
            z,
            q,
            Bs(z, W),
            Ee
          );
        Ys(z, W);
      }
      return null;
    }
    function me(V, z, q, W) {
      for (var Ee = null, Pe = null, ve = z, je = z = 0, He = null; ve !== null && je < q.length; je++) {
        ve.index > je ? (He = ve, ve = null) : He = ve.sibling;
        var Ye = Y(
          V,
          ve,
          q[je],
          W
        );
        if (Ye === null) {
          ve === null && (ve = He);
          break;
        }
        e && ve && Ye.alternate === null && n(V, ve), z = d(Ye, z, je), Pe === null ? Ee = Ye : Pe.sibling = Ye, Pe = Ye, ve = He;
      }
      if (je === q.length)
        return i(V, ve), qe && oa(V, je), Ee;
      if (ve === null) {
        for (; je < q.length; je++)
          ve = ee(V, q[je], W), ve !== null && (z = d(
            ve,
            z,
            je
          ), Pe === null ? Ee = ve : Pe.sibling = ve, Pe = ve);
        return qe && oa(V, je), Ee;
      }
      for (ve = r(ve); je < q.length; je++)
        He = $(
          ve,
          V,
          je,
          q[je],
          W
        ), He !== null && (e && He.alternate !== null && ve.delete(
          He.key === null ? je : He.key
        ), z = d(
          He,
          z,
          je
        ), Pe === null ? Ee = He : Pe.sibling = He, Pe = He);
      return e && ve.forEach(function(ti) {
        return n(V, ti);
      }), qe && oa(V, je), Ee;
    }
    function Ce(V, z, q, W) {
      if (q == null) throw Error(s(151));
      for (var Ee = null, Pe = null, ve = z, je = z = 0, He = null, Ye = q.next(); ve !== null && !Ye.done; je++, Ye = q.next()) {
        ve.index > je ? (He = ve, ve = null) : He = ve.sibling;
        var ti = Y(V, ve, Ye.value, W);
        if (ti === null) {
          ve === null && (ve = He);
          break;
        }
        e && ve && ti.alternate === null && n(V, ve), z = d(ti, z, je), Pe === null ? Ee = ti : Pe.sibling = ti, Pe = ti, ve = He;
      }
      if (Ye.done)
        return i(V, ve), qe && oa(V, je), Ee;
      if (ve === null) {
        for (; !Ye.done; je++, Ye = q.next())
          Ye = ee(V, Ye.value, W), Ye !== null && (z = d(Ye, z, je), Pe === null ? Ee = Ye : Pe.sibling = Ye, Pe = Ye);
        return qe && oa(V, je), Ee;
      }
      for (ve = r(ve); !Ye.done; je++, Ye = q.next())
        Ye = $(ve, V, je, Ye.value, W), Ye !== null && (e && Ye.alternate !== null && ve.delete(Ye.key === null ? je : Ye.key), z = d(Ye, z, je), Pe === null ? Ee = Ye : Pe.sibling = Ye, Pe = Ye);
      return e && ve.forEach(function(nT) {
        return n(V, nT);
      }), qe && oa(V, je), Ee;
    }
    function We(V, z, q, W) {
      if (typeof q == "object" && q !== null && q.type === C && q.key === null && (q = q.props.children), typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case T:
            e: {
              for (var Ee = q.key; z !== null; ) {
                if (z.key === Ee) {
                  if (Ee = q.type, Ee === C) {
                    if (z.tag === 7) {
                      i(
                        V,
                        z.sibling
                      ), W = u(
                        z,
                        q.props.children
                      ), W.return = V, V = W;
                      break e;
                    }
                  } else if (z.elementType === Ee || typeof Ee == "object" && Ee !== null && Ee.$$typeof === R && Ci(Ee) === z.type) {
                    i(
                      V,
                      z.sibling
                    ), W = u(z, q.props), cr(W, q), W.return = V, V = W;
                    break e;
                  }
                  i(V, z);
                  break;
                } else n(V, z);
                z = z.sibling;
              }
              q.type === C ? (W = Si(
                q.props.children,
                V.mode,
                W,
                q.key
              ), W.return = V, V = W) : (W = Ls(
                q.type,
                q.key,
                q.props,
                null,
                V.mode,
                W
              ), cr(W, q), W.return = V, V = W);
            }
            return v(V);
          case w:
            e: {
              for (Ee = q.key; z !== null; ) {
                if (z.key === Ee)
                  if (z.tag === 4 && z.stateNode.containerInfo === q.containerInfo && z.stateNode.implementation === q.implementation) {
                    i(
                      V,
                      z.sibling
                    ), W = u(z, q.children || []), W.return = V, V = W;
                    break e;
                  } else {
                    i(V, z);
                    break;
                  }
                else n(V, z);
                z = z.sibling;
              }
              W = ic(q, V.mode, W), W.return = V, V = W;
            }
            return v(V);
          case R:
            return q = Ci(q), We(
              V,
              z,
              q,
              W
            );
        }
        if (Z(q))
          return me(
            V,
            z,
            q,
            W
          );
        if (X(q)) {
          if (Ee = X(q), typeof Ee != "function") throw Error(s(150));
          return q = Ee.call(q), Ce(
            V,
            z,
            q,
            W
          );
        }
        if (typeof q.then == "function")
          return We(
            V,
            z,
            Ps(q),
            W
          );
        if (q.$$typeof === O)
          return We(
            V,
            z,
            Bs(V, q),
            W
          );
        Ys(V, q);
      }
      return typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint" ? (q = "" + q, z !== null && z.tag === 6 ? (i(V, z.sibling), W = u(z, q), W.return = V, V = W) : (i(V, z), W = ac(q, V.mode, W), W.return = V, V = W), v(V)) : i(V, z);
    }
    return function(V, z, q, W) {
      try {
        ur = 0;
        var Ee = We(
          V,
          z,
          q,
          W
        );
        return ml = null, Ee;
      } catch (ve) {
        if (ve === hl || ve === qs) throw ve;
        var Pe = rn(29, ve, null, V.mode);
        return Pe.lanes = W, Pe.return = V, Pe;
      } finally {
      }
    };
  }
  var Ai = Gm(!0), Fm = Gm(!1), Ba = !1;
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
  function Ha(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function qa(e, n, i) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Ge & 2) !== 0) {
      var u = r.pending;
      return u === null ? n.next = n : (n.next = u.next, u.next = n), r.pending = n, n = Os(e), Am(e, null, i), n;
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
    Ba = !1;
    var d = u.firstBaseUpdate, v = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var M = E, k = M.next;
      M.next = null, v === null ? d = k : v.next = k, v = M;
      var Q = e.alternate;
      Q !== null && (Q = Q.updateQueue, E = Q.lastBaseUpdate, E !== v && (E === null ? Q.firstBaseUpdate = k : E.next = k, Q.lastBaseUpdate = M));
    }
    if (d !== null) {
      var ee = u.baseState;
      v = 0, Q = k = M = null, E = d;
      do {
        var Y = E.lane & -536870913, $ = Y !== E.lane;
        if ($ ? (Be & Y) === Y : (r & Y) === Y) {
          Y !== 0 && Y === fl && (bc = !0), Q !== null && (Q = Q.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var me = e, Ce = E;
            Y = n;
            var We = i;
            switch (Ce.tag) {
              case 1:
                if (me = Ce.payload, typeof me == "function") {
                  ee = me.call(We, ee, Y);
                  break e;
                }
                ee = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = Ce.payload, Y = typeof me == "function" ? me.call(We, ee, Y) : me, Y == null) break e;
                ee = b({}, ee, Y);
                break e;
              case 2:
                Ba = !0;
            }
          }
          Y = E.callback, Y !== null && (e.flags |= 64, $ && (e.flags |= 8192), $ = u.callbacks, $ === null ? u.callbacks = [Y] : $.push(Y));
        } else
          $ = {
            lane: Y,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, Q === null ? (k = Q = $, M = ee) : Q = Q.next = $, v |= Y;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          $ = E, E = $.next, $.next = null, u.lastBaseUpdate = $, u.shared.pending = null;
        }
      } while (!0);
      Q === null && (M = ee), u.baseState = M, u.firstBaseUpdate = k, u.lastBaseUpdate = Q, d === null && (u.shared.lanes = 0), Fa |= v, e.lanes = v, e.memoizedState = ee;
    }
  }
  function $m(e, n) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(n);
  }
  function Xm(e, n) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        $m(i[e], n);
  }
  var pl = j(null), Gs = j(0);
  function Im(e, n) {
    e = ba, se(Gs, e), se(pl, n), ba = e | n.baseLanes;
  }
  function xc() {
    se(Gs, ba), se(pl, pl.current);
  }
  function Sc() {
    ba = Gs.current, I(pl), I(Gs);
  }
  var sn = j(null), Sn = null;
  function ka(e) {
    var n = e.alternate;
    se(vt, vt.current & 1), se(sn, e), Sn === null && (n === null || pl.current !== null || n.memoizedState !== null) && (Sn = e);
  }
  function Ec(e) {
    se(vt, vt.current), se(sn, e), Sn === null && (Sn = e);
  }
  function Km(e) {
    e.tag === 22 ? (se(vt, vt.current), se(sn, e), Sn === null && (Sn = e)) : Pa();
  }
  function Pa() {
    se(vt, vt.current), se(sn, sn.current);
  }
  function on(e) {
    I(sn), Sn === e && (Sn = null), I(vt);
  }
  var vt = j(0);
  function Fs(e) {
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
  var fa = 0, Ae = null, Ze = null, wt = null, $s = !1, yl = !1, ji = !1, Xs = 0, mr = 0, gl = null, $1 = 0;
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
    return fa = d, Ae = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, N.H = e === null || e.memoizedState === null ? zp : Hc, ji = !1, d = i(r, u), ji = !1, yl && (d = Zm(
      n,
      i,
      r,
      u
    )), Qm(e), d;
  }
  function Qm(e) {
    N.H = gr;
    var n = Ze !== null && Ze.next !== null;
    if (fa = 0, wt = Ze = Ae = null, $s = !1, mr = 0, gl = null, n) throw Error(s(300));
    e === null || Rt || (e = e.dependencies, e !== null && Vs(e) && (Rt = !0));
  }
  function Zm(e, n, i, r) {
    Ae = e;
    var u = 0;
    do {
      if (yl && (gl = null), mr = 0, yl = !1, 25 <= u) throw Error(s(301));
      if (u += 1, wt = Ze = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      N.H = _p, d = n(i, r);
    } while (yl);
    return d;
  }
  function X1() {
    var e = N.H, n = e.useState()[0];
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
    fa = 0, wt = Ze = Ae = null, yl = !1, mr = Xs = 0, gl = null;
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
    return mr += 1, gl === null && (gl = []), e = km(gl, e, n), n = Ae, (wt === null ? n.memoizedState : wt.next) === null && (n = n.alternate, N.H = n === null || n.memoizedState === null ? zp : Hc), e;
  }
  function Ks(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return pr(e);
      if (e.$$typeof === O) return Ot(e);
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
        i[r] = K;
    return n.index++, i;
  }
  function da(e, n) {
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
      var E = v = null, M = null, k = n, Q = !1;
      do {
        var ee = k.lane & -536870913;
        if (ee !== k.lane ? (Be & ee) === ee : (fa & ee) === ee) {
          var Y = k.revertLane;
          if (Y === 0)
            M !== null && (M = M.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: k.action,
              hasEagerState: k.hasEagerState,
              eagerState: k.eagerState,
              next: null
            }), ee === fl && (Q = !0);
          else if ((fa & Y) === Y) {
            k = k.next, Y === fl && (Q = !0);
            continue;
          } else
            ee = {
              lane: 0,
              revertLane: k.revertLane,
              gesture: null,
              action: k.action,
              hasEagerState: k.hasEagerState,
              eagerState: k.eagerState,
              next: null
            }, M === null ? (E = M = ee, v = d) : M = M.next = ee, Ae.lanes |= Y, Fa |= Y;
          ee = k.action, ji && i(d, ee), d = k.hasEagerState ? k.eagerState : i(d, ee);
        } else
          Y = {
            lane: ee,
            revertLane: k.revertLane,
            gesture: k.gesture,
            action: k.action,
            hasEagerState: k.hasEagerState,
            eagerState: k.eagerState,
            next: null
          }, M === null ? (E = M = Y, v = d) : M = M.next = Y, Ae.lanes |= ee, Fa |= ee;
        k = k.next;
      } while (k !== null && k !== n);
      if (M === null ? v = d : M.next = E, !ln(d, e.memoizedState) && (Rt = !0, Q && (i = dl, i !== null)))
        throw i;
      e.memoizedState = d, e.baseState = v, e.baseQueue = M, r.lastRenderedState = d;
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
  function Jm(e, n, i) {
    var r = Ae, u = bt(), d = qe;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = n();
    var v = !ln(
      (Ze || u).memoizedState,
      i
    );
    if (v && (u.memoizedState = i, Rt = !0), u = u.queue, _c(tp.bind(null, r, u, e), [
      e
    ]), u.getSnapshot !== n || v || wt !== null && wt.memoizedState.tag & 1) {
      if (r.flags |= 2048, vl(
        9,
        { destroy: void 0 },
        ep.bind(
          null,
          r,
          u,
          i,
          n
        ),
        null
      ), tt === null) throw Error(s(349));
      d || (fa & 127) !== 0 || Wm(r, n, i);
    }
    return i;
  }
  function Wm(e, n, i) {
    e.flags |= 16384, e = { getSnapshot: n, value: i }, n = Ae.updateQueue, n === null ? (n = Is(), Ae.updateQueue = n, n.stores = [e]) : (i = n.stores, i === null ? n.stores = [e] : i.push(e));
  }
  function ep(e, n, i, r) {
    n.value = i, n.getSnapshot = r, np(n) && ap(e);
  }
  function tp(e, n, i) {
    return i(function() {
      np(n) && ap(e);
    });
  }
  function np(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var i = n();
      return !ln(e, i);
    } catch {
      return !0;
    }
  }
  function ap(e) {
    var n = xi(e, 2);
    n !== null && en(n, e, 2);
  }
  function Nc(e) {
    var n = $t();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), ji) {
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
      lastRenderedReducer: da,
      lastRenderedState: e
    }, n;
  }
  function ip(e, n, i, r) {
    return e.baseState = i, jc(
      e,
      Ze,
      typeof r == "function" ? r : da
    );
  }
  function I1(e, n, i, r, u) {
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
      N.T !== null ? i(!0) : d.isTransition = !1, r(d), i = n.pending, i === null ? (d.next = n.pending = d, lp(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function lp(e, n) {
    var i = n.action, r = n.payload, u = e.state;
    if (n.isTransition) {
      var d = N.T, v = {};
      N.T = v;
      try {
        var E = i(u, r), M = N.S;
        M !== null && M(v, E), rp(e, n, E);
      } catch (k) {
        zc(e, n, k);
      } finally {
        d !== null && v.types !== null && (d.types = v.types), N.T = d;
      }
    } else
      try {
        d = i(u, r), rp(e, n, d);
      } catch (k) {
        zc(e, n, k);
      }
  }
  function rp(e, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(r) {
        sp(e, n, r);
      },
      function(r) {
        return zc(e, n, r);
      }
    ) : sp(e, n, i);
  }
  function sp(e, n, i) {
    n.status = "fulfilled", n.value = i, op(n), e.state = i, n = e.pending, n !== null && (i = n.next, i === n ? e.pending = null : (i = i.next, n.next = i, lp(e, i)));
  }
  function zc(e, n, i) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        n.status = "rejected", n.reason = i, op(n), n = n.next;
      while (n !== r);
    }
    e.action = null;
  }
  function op(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function up(e, n) {
    return n;
  }
  function cp(e, n) {
    if (qe) {
      var i = tt.formState;
      if (i !== null) {
        e: {
          var r = Ae;
          if (qe) {
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
            Ua(r);
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
      lastRenderedReducer: up,
      lastRenderedState: n
    }, i.queue = r, i = jp.bind(
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
    }, r.queue = u, i = I1.bind(
      null,
      Ae,
      u,
      d,
      i
    ), u.dispatch = i, r.memoizedState = e, [n, i, !1];
  }
  function fp(e) {
    var n = bt();
    return dp(n, Ze, e);
  }
  function dp(e, n, i) {
    if (n = jc(
      e,
      n,
      up
    )[0], e = Qs(da)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var r = pr(n);
      } catch (v) {
        throw v === hl ? qs : v;
      }
    else r = n;
    n = bt();
    var u = n.queue, d = u.dispatch;
    return i !== n.memoizedState && (Ae.flags |= 2048, vl(
      9,
      { destroy: void 0 },
      K1.bind(null, u, i),
      null
    )), [r, d, e];
  }
  function K1(e, n) {
    e.action = n;
  }
  function hp(e) {
    var n = bt(), i = Ze;
    if (i !== null)
      return dp(n, i, e);
    bt(), n = n.memoizedState, i = bt();
    var r = i.queue.dispatch;
    return i.memoizedState = e, [n, r, !1];
  }
  function vl(e, n, i, r) {
    return e = { tag: e, create: i, deps: r, inst: n, next: null }, n = Ae.updateQueue, n === null && (n = Is(), Ae.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = e.next = e : (r = i.next, i.next = e, e.next = r, n.lastEffect = e), e;
  }
  function mp() {
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
  function pp(e, n) {
    Zs(8390656, 8, e, n);
  }
  function _c(e, n) {
    Js(2048, 8, e, n);
  }
  function Q1(e) {
    Ae.flags |= 4;
    var n = Ae.updateQueue;
    if (n === null)
      n = Is(), Ae.updateQueue = n, n.events = [e];
    else {
      var i = n.events;
      i === null ? n.events = [e] : i.push(e);
    }
  }
  function yp(e) {
    var n = bt().memoizedState;
    return Q1({ ref: n, nextImpl: e }), function() {
      if ((Ge & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function gp(e, n) {
    return Js(4, 2, e, n);
  }
  function vp(e, n) {
    return Js(4, 4, e, n);
  }
  function bp(e, n) {
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
  function xp(e, n, i) {
    i = i != null ? i.concat([e]) : null, Js(4, 4, bp.bind(null, n, e), i);
  }
  function Oc() {
  }
  function Sp(e, n) {
    var i = bt();
    n = n === void 0 ? null : n;
    var r = i.memoizedState;
    return n !== null && Tc(n, r[1]) ? r[0] : (i.memoizedState = [e, n], e);
  }
  function Ep(e, n) {
    var i = bt();
    n = n === void 0 ? null : n;
    var r = i.memoizedState;
    if (n !== null && Tc(n, r[1]))
      return r[0];
    if (r = e(), ji) {
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
    return i === void 0 || (fa & 1073741824) !== 0 && (Be & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = i, e = Ty(), Ae.lanes |= e, Fa |= e, i);
  }
  function Tp(e, n, i, r) {
    return ln(i, n) ? i : pl.current !== null ? (e = Lc(e, i, r), ln(e, n) || (Rt = !0), e) : (fa & 42) === 0 || (fa & 1073741824) !== 0 && (Be & 261930) === 0 ? (Rt = !0, e.memoizedState = i) : (e = Ty(), Ae.lanes |= e, Fa |= e, n);
  }
  function wp(e, n, i, r, u) {
    var d = J.p;
    J.p = d !== 0 && 8 > d ? d : 8;
    var v = N.T, E = {};
    N.T = E, Bc(e, !1, n, i);
    try {
      var M = u(), k = N.S;
      if (k !== null && k(E, M), M !== null && typeof M == "object" && typeof M.then == "function") {
        var Q = F1(
          M,
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
    } catch (ee) {
      yr(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: ee },
        fn()
      );
    } finally {
      J.p = d, v !== null && E.types !== null && (v.types = E.types), N.T = v;
    }
  }
  function Z1() {
  }
  function Uc(e, n, i, r) {
    if (e.tag !== 5) throw Error(s(476));
    var u = Rp(e).queue;
    wp(
      e,
      u,
      n,
      re,
      i === null ? Z1 : function() {
        return Cp(e), i(r);
      }
    );
  }
  function Rp(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: re,
      baseState: re,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: da,
        lastRenderedState: re
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
        lastRenderedReducer: da,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function Cp(e) {
    var n = Rp(e);
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
  function Mp() {
    return bt().memoizedState;
  }
  function Ap() {
    return bt().memoizedState;
  }
  function J1(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = fn();
          e = Ha(i);
          var r = qa(n, e, i);
          r !== null && (en(r, n, i), fr(r, n, i)), n = { cache: dc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function W1(e, n, i) {
    var r = fn();
    i = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ws(e) ? Dp(n, i) : (i = tc(e, n, i, r), i !== null && (en(i, e, r), Np(i, n, r)));
  }
  function jp(e, n, i) {
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
    if (Ws(e)) Dp(n, u);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var v = n.lastRenderedState, E = d(v, i);
          if (u.hasEagerState = !0, u.eagerState = E, ln(E, v))
            return _s(e, n, u, 0), tt === null && zs(), !1;
        } catch {
        } finally {
        }
      if (i = tc(e, n, u, r), i !== null)
        return en(i, e, r), Np(i, n, r), !0;
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
      ), n !== null && en(n, e, 2);
  }
  function Ws(e) {
    var n = e.alternate;
    return e === Ae || n !== null && n === Ae;
  }
  function Dp(e, n) {
    yl = $s = !0;
    var i = e.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), e.pending = n;
  }
  function Np(e, n, i) {
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
  var zp = {
    readContext: Ot,
    use: Ks,
    useCallback: function(e, n) {
      return $t().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: Ot,
    useEffect: pp,
    useImperativeHandle: function(e, n, i) {
      i = i != null ? i.concat([e]) : null, Zs(
        4194308,
        4,
        bp.bind(null, n, e),
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
      if (ji) {
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
        if (ji) {
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
      }, r.queue = e, e = e.dispatch = W1.bind(
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
      var n = e.queue, i = jp.bind(null, Ae, n);
      return n.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, n) {
      var i = $t();
      return Lc(i, e, n);
    },
    useTransition: function() {
      var e = Nc(!1);
      return e = wp.bind(
        null,
        Ae,
        e.queue,
        !0,
        !1
      ), $t().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, i) {
      var r = Ae, u = $t();
      if (qe) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = n(), tt === null)
          throw Error(s(349));
        (Be & 127) !== 0 || Wm(r, n, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return u.queue = d, pp(tp.bind(null, r, d, e), [
        e
      ]), r.flags |= 2048, vl(
        9,
        { destroy: void 0 },
        ep.bind(
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
      if (qe) {
        var i = $n, r = Fn;
        i = (r & ~(1 << 32 - qt(r) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = Xs++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = $1++, n = "_" + n + "r_" + i.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Vc,
    useFormState: cp,
    useActionState: cp,
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
      return $t().memoizedState = J1.bind(
        null,
        Ae
      );
    },
    useEffectEvent: function(e) {
      var n = $t(), i = { impl: e };
      return n.memoizedState = i, function() {
        if ((Ge & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Hc = {
    readContext: Ot,
    use: Ks,
    useCallback: Sp,
    useContext: Ot,
    useEffect: _c,
    useImperativeHandle: xp,
    useInsertionEffect: gp,
    useLayoutEffect: vp,
    useMemo: Ep,
    useReducer: Qs,
    useRef: mp,
    useState: function() {
      return Qs(da);
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, n) {
      var i = bt();
      return Tp(
        i,
        Ze.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Qs(da)[0], n = bt().memoizedState;
      return [
        typeof e == "boolean" ? e : pr(e),
        n
      ];
    },
    useSyncExternalStore: Jm,
    useId: Mp,
    useHostTransitionStatus: Vc,
    useFormState: fp,
    useActionState: fp,
    useOptimistic: function(e, n) {
      var i = bt();
      return ip(i, Ze, e, n);
    },
    useMemoCache: Ac,
    useCacheRefresh: Ap
  };
  Hc.useEffectEvent = yp;
  var _p = {
    readContext: Ot,
    use: Ks,
    useCallback: Sp,
    useContext: Ot,
    useEffect: _c,
    useImperativeHandle: xp,
    useInsertionEffect: gp,
    useLayoutEffect: vp,
    useMemo: Ep,
    useReducer: Dc,
    useRef: mp,
    useState: function() {
      return Dc(da);
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, n) {
      var i = bt();
      return Ze === null ? Lc(i, e, n) : Tp(
        i,
        Ze.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Dc(da)[0], n = bt().memoizedState;
      return [
        typeof e == "boolean" ? e : pr(e),
        n
      ];
    },
    useSyncExternalStore: Jm,
    useId: Mp,
    useHostTransitionStatus: Vc,
    useFormState: hp,
    useActionState: hp,
    useOptimistic: function(e, n) {
      var i = bt();
      return Ze !== null ? ip(i, Ze, e, n) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Ac,
    useCacheRefresh: Ap
  };
  _p.useEffectEvent = yp;
  function qc(e, n, i, r) {
    n = e.memoizedState, i = i(r, n), i = i == null ? n : b({}, n, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var kc = {
    enqueueSetState: function(e, n, i) {
      e = e._reactInternals;
      var r = fn(), u = Ha(r);
      u.payload = n, i != null && (u.callback = i), n = qa(e, u, r), n !== null && (en(n, e, r), fr(n, e, r));
    },
    enqueueReplaceState: function(e, n, i) {
      e = e._reactInternals;
      var r = fn(), u = Ha(r);
      u.tag = 1, u.payload = n, i != null && (u.callback = i), n = qa(e, u, r), n !== null && (en(n, e, r), fr(n, e, r));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var i = fn(), r = Ha(i);
      r.tag = 2, n != null && (r.callback = n), n = qa(e, r, i), n !== null && (en(n, e, i), fr(n, e, i));
    }
  };
  function Op(e, n, i, r, u, d, v) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, d, v) : n.prototype && n.prototype.isPureReactComponent ? !ar(i, r) || !ar(u, d) : !0;
  }
  function Lp(e, n, i, r) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, r), n.state !== e && kc.enqueueReplaceState(n, n.state, null);
  }
  function Di(e, n) {
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
  function Up(e) {
    Ns(e);
  }
  function Vp(e) {
    console.error(e);
  }
  function Bp(e) {
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
  function Hp(e, n, i) {
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
    return i = Ha(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      eo(e, n);
    }, i;
  }
  function qp(e) {
    return e = Ha(e), e.tag = 3, e;
  }
  function kp(e, n, i, r) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = r.value;
      e.payload = function() {
        return u(d);
      }, e.callback = function() {
        Hp(n, i, r);
      };
    }
    var v = i.stateNode;
    v !== null && typeof v.componentDidCatch == "function" && (e.callback = function() {
      Hp(n, i, r), typeof u != "function" && ($a === null ? $a = /* @__PURE__ */ new Set([this]) : $a.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function eE(e, n, i, r, u) {
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
            return Sn === null ? ho() : i.alternate === null && pt === 0 && (pt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, r === ks ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([r]) : n.add(r), mf(e, r, u)), !1;
          case 22:
            return i.flags |= 65536, r === ks ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([r]) : i.add(r)), mf(e, r, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return mf(e, r, u), ho(), !1;
    }
    if (qe)
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
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && ($a === null || !$a.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = qp(u), kp(
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
    n.child = e === null ? Fm(n, null, i, r) : Ai(
      n,
      e.child,
      i,
      r
    );
  }
  function Pp(e, n, i, r, u) {
    i = i.render;
    var d = n.ref;
    if ("ref" in r) {
      var v = {};
      for (var E in r)
        E !== "ref" && (v[E] = r[E]);
    } else v = r;
    return wi(n), r = wc(
      e,
      n,
      i,
      v,
      d,
      u
    ), E = Rc(), e !== null && !Rt ? (Cc(e, n, u), ha(e, n, u)) : (qe && E && lc(n), n.flags |= 1, Lt(e, n, r, u), n.child);
  }
  function Yp(e, n, i, r, u) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" && !nc(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, Gp(
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
        return ha(e, n, u);
    }
    return n.flags |= 1, e = sa(d, r), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Gp(e, n, i, r, u) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (ar(d, r) && e.ref === n.ref)
        if (Rt = !1, n.pendingProps = r = d, Zc(e, u))
          (e.flags & 131072) !== 0 && (Rt = !0);
        else
          return n.lanes = e.lanes, ha(e, n, u);
    }
    return Gc(
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
        return $p(
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
        ), d !== null ? Im(n, d) : xc(), Km(n);
      else
        return r = n.lanes = 536870912, $p(
          e,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          r
        );
    } else
      d !== null ? (Hs(n, d.cachePool), Im(n, d), Pa(), n.memoizedState = null) : (e !== null && Hs(n, null), xc(), Pa());
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
  function $p(e, n, i, r, u) {
    var d = mc();
    return d = d === null ? null : { parent: Tt._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, e !== null && Hs(n, null), xc(), Km(n), e !== null && cl(e, n, r, !0), n.childLanes = u, null;
  }
  function to(e, n) {
    return n = ao(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Xp(e, n, i) {
    return Ai(n, e.child, null, i), e = to(n, n.pendingProps), e.flags |= 2, on(n), n.memoizedState = null, e;
  }
  function tE(e, n, i) {
    var r = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (qe) {
        if (r.mode === "hidden")
          return e = to(n, r), n.lanes = 536870912, vr(null, e);
        if (Ec(n), (e = lt) ? (e = lg(
          e,
          xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Oa !== null ? { id: Fn, overflow: $n } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Dm(e), i.return = n, n.child = i, _t = n, lt = null)) : e = null, e === null) throw Ua(n);
        return n.lanes = 536870912, null;
      }
      return to(n, r);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var v = d.dehydrated;
      if (Ec(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = Xp(
            e,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(s(558));
      else if (Rt || cl(e, n, i, !1), u = (i & e.childLanes) !== 0, Rt || u) {
        if (r = tt, r !== null && (v = A(r, i), v !== 0 && v !== d.retryLane))
          throw d.retryLane = v, xi(e, v), en(r, e, v), Yc;
        ho(), n = Xp(
          e,
          n,
          i
        );
      } else
        e = d.treeContext, lt = En(v.nextSibling), _t = n, qe = !0, La = null, xn = !1, e !== null && _m(n, e), n = to(n, r), n.flags |= 4096;
      return n;
    }
    return e = sa(e.child, {
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
  function Gc(e, n, i, r, u) {
    return wi(n), i = wc(
      e,
      n,
      i,
      r,
      void 0,
      u
    ), r = Rc(), e !== null && !Rt ? (Cc(e, n, u), ha(e, n, u)) : (qe && r && lc(n), n.flags |= 1, Lt(e, n, i, u), n.child);
  }
  function Ip(e, n, i, r, u, d) {
    return wi(n), n.updateQueue = null, i = Zm(
      n,
      r,
      i,
      u
    ), Qm(e), r = Rc(), e !== null && !Rt ? (Cc(e, n, d), ha(e, n, d)) : (qe && r && lc(n), n.flags |= 1, Lt(e, n, i, d), n.child);
  }
  function Kp(e, n, i, r, u) {
    if (wi(n), n.stateNode === null) {
      var d = rl, v = i.contextType;
      typeof v == "object" && v !== null && (d = Ot(v)), d = new i(r, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = kc, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = r, d.state = n.memoizedState, d.refs = {}, yc(n), v = i.contextType, d.context = typeof v == "object" && v !== null ? Ot(v) : rl, d.state = n.memoizedState, v = i.getDerivedStateFromProps, typeof v == "function" && (qc(
        n,
        i,
        v,
        r
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (v = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), v !== d.state && kc.enqueueReplaceState(d, d.state, null), hr(n, r, d, u), dr(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), r = !0;
    } else if (e === null) {
      d = n.stateNode;
      var E = n.memoizedProps, M = Di(i, E);
      d.props = M;
      var k = d.context, Q = i.contextType;
      v = rl, typeof Q == "object" && Q !== null && (v = Ot(Q));
      var ee = i.getDerivedStateFromProps;
      Q = typeof ee == "function" || typeof d.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, Q || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (E || k !== v) && Lp(
        n,
        d,
        r,
        v
      ), Ba = !1;
      var Y = n.memoizedState;
      d.state = Y, hr(n, r, d, u), dr(), k = n.memoizedState, E || Y !== k || Ba ? (typeof ee == "function" && (qc(
        n,
        i,
        ee,
        r
      ), k = n.memoizedState), (M = Ba || Op(
        n,
        i,
        M,
        r,
        Y,
        k,
        v
      )) ? (Q || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = k), d.props = r, d.state = k, d.context = v, r = M) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), r = !1);
    } else {
      d = n.stateNode, gc(e, n), v = n.memoizedProps, Q = Di(i, v), d.props = Q, ee = n.pendingProps, Y = d.context, k = i.contextType, M = rl, typeof k == "object" && k !== null && (M = Ot(k)), E = i.getDerivedStateFromProps, (k = typeof E == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (v !== ee || Y !== M) && Lp(
        n,
        d,
        r,
        M
      ), Ba = !1, Y = n.memoizedState, d.state = Y, hr(n, r, d, u), dr();
      var $ = n.memoizedState;
      v !== ee || Y !== $ || Ba || e !== null && e.dependencies !== null && Vs(e.dependencies) ? (typeof E == "function" && (qc(
        n,
        i,
        E,
        r
      ), $ = n.memoizedState), (Q = Ba || Op(
        n,
        i,
        Q,
        r,
        Y,
        $,
        M
      ) || e !== null && e.dependencies !== null && Vs(e.dependencies)) ? (k || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(r, $, M), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        r,
        $,
        M
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || v === e.memoizedProps && Y === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && Y === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = $), d.props = r, d.state = $, d.context = M, r = Q) : (typeof d.componentDidUpdate != "function" || v === e.memoizedProps && Y === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && Y === e.memoizedState || (n.flags |= 1024), r = !1);
    }
    return d = r, no(e, n), r = (n.flags & 128) !== 0, d || r ? (d = n.stateNode, i = r && typeof i.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, e !== null && r ? (n.child = Ai(
      n,
      e.child,
      null,
      u
    ), n.child = Ai(
      n,
      null,
      i,
      u
    )) : Lt(e, n, i, u), n.memoizedState = d.state, e = n.child) : e = ha(
      e,
      n,
      u
    ), e;
  }
  function Qp(e, n, i, r) {
    return Ei(), n.flags |= 256, Lt(e, n, i, r), n.child;
  }
  var Fc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function $c(e) {
    return { baseLanes: e, cachePool: Hm() };
  }
  function Xc(e, n, i) {
    return e = e !== null ? e.childLanes & ~i : 0, n && (e |= cn), e;
  }
  function Zp(e, n, i) {
    var r = n.pendingProps, u = !1, d = (n.flags & 128) !== 0, v;
    if ((v = d) || (v = e !== null && e.memoizedState === null ? !1 : (vt.current & 2) !== 0), v && (u = !0, n.flags &= -129), v = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (qe) {
        if (u ? ka(n) : Pa(), (e = lt) ? (e = lg(
          e,
          xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Oa !== null ? { id: Fn, overflow: $n } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Dm(e), i.return = n, n.child = i, _t = n, lt = null)) : e = null, e === null) throw Ua(n);
        return Df(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = r.children;
      return r = r.fallback, u ? (Pa(), u = n.mode, E = ao(
        { mode: "hidden", children: E },
        u
      ), r = Si(
        r,
        u,
        i,
        null
      ), E.return = n, r.return = n, E.sibling = r, n.child = E, r = n.child, r.memoizedState = $c(i), r.childLanes = Xc(
        e,
        v,
        i
      ), n.memoizedState = Fc, vr(null, r)) : (ka(n), Ic(n, E));
    }
    var M = e.memoizedState;
    if (M !== null && (E = M.dehydrated, E !== null)) {
      if (d)
        n.flags & 256 ? (ka(n), n.flags &= -257, n = Kc(
          e,
          n,
          i
        )) : n.memoizedState !== null ? (Pa(), n.child = e.child, n.flags |= 128, n = null) : (Pa(), E = r.fallback, u = n.mode, r = ao(
          { mode: "visible", children: r.children },
          u
        ), E = Si(
          E,
          u,
          i,
          null
        ), E.flags |= 2, r.return = n, E.return = n, r.sibling = E, n.child = r, Ai(
          n,
          e.child,
          null,
          i
        ), r = n.child, r.memoizedState = $c(i), r.childLanes = Xc(
          e,
          v,
          i
        ), n.memoizedState = Fc, n = vr(null, r));
      else if (ka(n), Df(E)) {
        if (v = E.nextSibling && E.nextSibling.dataset, v) var k = v.dgst;
        v = k, r = Error(s(419)), r.stack = "", r.digest = v, rr({ value: r, source: null, stack: null }), n = Kc(
          e,
          n,
          i
        );
      } else if (Rt || cl(e, n, i, !1), v = (i & e.childLanes) !== 0, Rt || v) {
        if (v = tt, v !== null && (r = A(v, i), r !== 0 && r !== M.retryLane))
          throw M.retryLane = r, xi(e, r), en(v, e, r), Yc;
        jf(E) || ho(), n = Kc(
          e,
          n,
          i
        );
      } else
        jf(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = M.treeContext, lt = En(
          E.nextSibling
        ), _t = n, qe = !0, La = null, xn = !1, e !== null && _m(n, e), n = Ic(
          n,
          r.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (Pa(), E = r.fallback, u = n.mode, M = e.child, k = M.sibling, r = sa(M, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = M.subtreeFlags & 65011712, k !== null ? E = sa(
      k,
      E
    ) : (E = Si(
      E,
      u,
      i,
      null
    ), E.flags |= 2), E.return = n, r.return = n, r.sibling = E, n.child = r, vr(null, r), r = n.child, E = e.child.memoizedState, E === null ? E = $c(i) : (u = E.cachePool, u !== null ? (M = Tt._currentValue, u = u.parent !== M ? { parent: M, pool: M } : u) : u = Hm(), E = {
      baseLanes: E.baseLanes | i,
      cachePool: u
    }), r.memoizedState = E, r.childLanes = Xc(
      e,
      v,
      i
    ), n.memoizedState = Fc, vr(e.child, r)) : (ka(n), i = e.child, e = i.sibling, i = sa(i, {
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
    return Ai(n, e.child, null, i), e = Ic(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Jp(e, n, i) {
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
  function Wp(e, n, i) {
    var r = n.pendingProps, u = r.revealOrder, d = r.tail;
    r = r.children;
    var v = vt.current, E = (v & 2) !== 0;
    if (E ? (v = v & 1 | 2, n.flags |= 128) : v &= 1, se(vt, v), Lt(e, n, r, i), r = qe ? lr : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Jp(e, i, n);
        else if (e.tag === 19)
          Jp(e, i, n);
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
          e = i.alternate, e !== null && Fs(e) === null && (u = i), i = i.sibling;
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
          if (e = u.alternate, e !== null && Fs(e) === null) {
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
  function ha(e, n, i) {
    if (e !== null && (n.dependencies = e.dependencies), Fa |= n.lanes, (i & n.childLanes) === 0)
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
      for (e = n.child, i = sa(e, e.pendingProps), n.child = i, i.return = n; e.sibling !== null; )
        e = e.sibling, i = i.sibling = sa(e, e.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function Zc(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Vs(e)));
  }
  function nE(e, n, i) {
    switch (n.tag) {
      case 3:
        ht(n, n.stateNode.containerInfo), Va(n, Tt, e.memoizedState.cache), Ei();
        break;
      case 27:
      case 5:
        ea(n);
        break;
      case 4:
        ht(n, n.stateNode.containerInfo);
        break;
      case 10:
        Va(
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
          return r.dehydrated !== null ? (ka(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? Zp(e, n, i) : (ka(n), e = ha(
            e,
            n,
            i
          ), e !== null ? e.sibling : null);
        ka(n);
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
            return Wp(
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
        Va(n, Tt, e.memoizedState.cache);
    }
    return ha(e, n, i);
  }
  function ey(e, n, i) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Rt = !0;
      else {
        if (!Zc(e, i) && (n.flags & 128) === 0)
          return Rt = !1, nE(
            e,
            n,
            i
          );
        Rt = (e.flags & 131072) !== 0;
      }
    else
      Rt = !1, qe && (n.flags & 1048576) !== 0 && zm(n, lr, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var r = n.pendingProps;
          if (e = Ci(n.elementType), n.type = e, typeof e == "function")
            nc(e) ? (r = Di(e, r), n.tag = 1, n = Kp(
              null,
              n,
              e,
              r,
              i
            )) : (n.tag = 0, n = Gc(
              null,
              n,
              e,
              r,
              i
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === B) {
                n.tag = 11, n = Pp(
                  null,
                  n,
                  e,
                  r,
                  i
                );
                break e;
              } else if (u === te) {
                n.tag = 14, n = Yp(
                  null,
                  n,
                  e,
                  r,
                  i
                );
                break e;
              }
            }
            throw n = G(e) || e, Error(s(306, n, ""));
          }
        }
        return n;
      case 0:
        return Gc(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return r = n.type, u = Di(
          r,
          n.pendingProps
        ), Kp(
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
          if (r = v.cache, Va(n, Tt, r), r !== d.cache && fc(
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
              n = Qp(
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
              ), rr(u), n = Qp(
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
              for (lt = En(e.firstChild), _t = n, qe = !0, La = null, xn = !0, i = Fm(
                n,
                null,
                r,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (Ei(), r === u) {
              n = ha(
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
        return no(e, n), e === null ? (i = fg(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : qe || (i = n.type, e = n.pendingProps, r = xo(
          Re.current
        ).createElement(i), r[fe] = n, r[de] = e, Ut(r, i, e), at(r), n.stateNode = r) : n.memoizedState = fg(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ea(n), e === null && qe && (r = n.stateNode = og(
          n.type,
          n.pendingProps,
          Re.current
        ), _t = n, xn = !0, u = lt, Qa(n.type) ? (Nf = u, lt = En(r.firstChild)) : lt = u), Lt(
          e,
          n,
          n.pendingProps.children,
          i
        ), no(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && qe && ((u = r = lt) && (r = zE(
          r,
          n.type,
          n.pendingProps,
          xn
        ), r !== null ? (n.stateNode = r, _t = n, lt = En(r.firstChild), xn = !1, u = !0) : u = !1), u || Ua(n)), ea(n), u = n.type, d = n.pendingProps, v = e !== null ? e.memoizedProps : null, r = d.children, Cf(u, d) ? r = null : v !== null && Cf(u, v) && (n.flags |= 32), n.memoizedState !== null && (u = wc(
          e,
          n,
          X1,
          null,
          null,
          i
        ), _r._currentValue = u), no(e, n), Lt(e, n, r, i), n.child;
      case 6:
        return e === null && qe && ((e = i = lt) && (i = _E(
          i,
          n.pendingProps,
          xn
        ), i !== null ? (n.stateNode = i, _t = n, lt = null, e = !0) : e = !1), e || Ua(n)), null;
      case 13:
        return Zp(e, n, i);
      case 4:
        return ht(
          n,
          n.stateNode.containerInfo
        ), r = n.pendingProps, e === null ? n.child = Ai(
          n,
          null,
          r,
          i
        ) : Lt(e, n, r, i), n.child;
      case 11:
        return Pp(
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
        return r = n.pendingProps, Va(n, n.type, r.value), Lt(e, n, r.children, i), n.child;
      case 9:
        return u = n.type._context, r = n.pendingProps.children, wi(n), u = Ot(u), r = r(u), n.flags |= 1, Lt(e, n, r, i), n.child;
      case 14:
        return Yp(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return Gp(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return Wp(e, n, i);
      case 31:
        return tE(e, n, i);
      case 22:
        return Fp(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return wi(n), r = Ot(Tt), e === null ? (u = mc(), u === null && (u = tt, d = dc(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), n.memoizedState = { parent: r, cache: u }, yc(n), Va(n, Tt, u)) : ((e.lanes & i) !== 0 && (gc(e, n), hr(n, null, null, i), dr()), u = e.memoizedState, d = n.memoizedState, u.parent !== r ? (u = { parent: r, cache: r }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), Va(n, Tt, r)) : (r = d.cache, Va(n, Tt, r), r !== u.cache && fc(
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
  function ma(e) {
    e.flags |= 4;
  }
  function Jc(e, n, i, r, u) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (My()) e.flags |= 8192;
        else
          throw Mi = ks, pc;
    } else e.flags &= -16777217;
  }
  function ty(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !yg(n))
      if (My()) e.flags |= 8192;
      else
        throw Mi = ks, pc;
  }
  function io(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Kl() : 536870912, e.lanes |= n, El |= n);
  }
  function br(e, n) {
    if (!qe)
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
  function aE(e, n, i) {
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
        return i = n.stateNode, r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), ca(Tt), $e(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (ul(n) ? ma(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, oc())), rt(n), null;
      case 26:
        var u = n.type, d = n.memoizedState;
        return e === null ? (ma(n), d !== null ? (rt(n), ty(n, d)) : (rt(n), Jc(
          n,
          u,
          null,
          r,
          i
        ))) : d ? d !== e.memoizedState ? (ma(n), rt(n), ty(n, d)) : (rt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== r && ma(n), rt(n), Jc(
          n,
          u,
          e,
          r,
          i
        )), null;
      case 27:
        if (Ca(n), i = Re.current, u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== r && ma(n);
        else {
          if (!r) {
            if (n.stateNode === null)
              throw Error(s(166));
            return rt(n), null;
          }
          e = ue.current, ul(n) ? Om(n) : (e = og(u, r, i), n.stateNode = e, ma(n));
        }
        return rt(n), null;
      case 5:
        if (Ca(n), u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== r && ma(n);
        else {
          if (!r) {
            if (n.stateNode === null)
              throw Error(s(166));
            return rt(n), null;
          }
          if (d = ue.current, ul(n))
            Om(n);
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
            d[fe] = n, d[de] = r;
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
            r && ma(n);
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
          e.memoizedProps !== r && ma(n);
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
            e[fe] = n, e = !!(e.nodeValue === i || r !== null && r.suppressHydrationWarning === !0 || Zy(e.nodeValue, i)), e || Ua(n, !0);
          } else
            e = xo(e).createTextNode(
              r
            ), e[fe] = n, n.stateNode = e;
        }
        return rt(n), null;
      case 31:
        if (i = n.memoizedState, e === null || e.memoizedState !== null) {
          if (r = ul(n), i !== null) {
            if (e === null) {
              if (!r) throw Error(s(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[fe] = n;
            } else
              Ei(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
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
              u[fe] = n;
            } else
              Ei(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            rt(n), u = !1;
          } else
            u = oc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (on(n), n) : (on(n), null);
        }
        return on(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = r !== null, e = e !== null && e.memoizedState !== null, i && (r = n.child, u = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (u = r.alternate.memoizedState.cachePool.pool), d = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (d = r.memoizedState.cachePool.pool), d !== u && (r.flags |= 2048)), i !== e && i && (n.child.flags |= 8192), io(n, n.updateQueue), rt(n), null);
      case 4:
        return $e(), e === null && Sf(n.stateNode.containerInfo), rt(n), null;
      case 10:
        return ca(n.type), rt(n), null;
      case 19:
        if (I(vt), r = n.memoizedState, r === null) return rt(n), null;
        if (u = (n.flags & 128) !== 0, d = r.rendering, d === null)
          if (u) br(r, !1);
          else {
            if (pt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (d = Fs(e), d !== null) {
                  for (n.flags |= 128, br(r, !1), e = d.updateQueue, n.updateQueue = e, io(n, e), n.subtreeFlags = 0, e = i, i = n.child; i !== null; )
                    jm(i, e), i = i.sibling;
                  return se(
                    vt,
                    vt.current & 1 | 2
                  ), qe && oa(n, r.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            r.tail !== null && Gt() > uo && (n.flags |= 128, u = !0, br(r, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Fs(d), e !== null) {
              if (n.flags |= 128, u = !0, e = e.updateQueue, n.updateQueue = e, io(n, e), br(r, !0), r.tail === null && r.tailMode === "hidden" && !d.alternate && !qe)
                return rt(n), null;
            } else
              2 * Gt() - r.renderingStartTime > uo && i !== 536870912 && (n.flags |= 128, u = !0, br(r, !1), n.lanes = 4194304);
          r.isBackwards ? (d.sibling = n.child, n.child = d) : (e = r.last, e !== null ? e.sibling = d : n.child = d, r.last = d);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Gt(), e.sibling = null, i = vt.current, se(
          vt,
          u ? i & 1 | 2 : i & 1
        ), qe && oa(n, r.treeForkCount), e) : (rt(n), null);
      case 22:
      case 23:
        return on(n), Sc(), r = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (n.flags |= 8192) : r && (n.flags |= 8192), r ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (rt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : rt(n), i = n.updateQueue, i !== null && io(n, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), r = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (r = n.memoizedState.cachePool.pool), r !== i && (n.flags |= 2048), e !== null && I(Ri), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), ca(Tt), rt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function iE(e, n) {
    switch (rc(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return ca(Tt), $e(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ca(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (on(n), n.alternate === null)
            throw Error(s(340));
          Ei();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (on(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(s(340));
          Ei();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return I(vt), null;
      case 4:
        return $e(), null;
      case 10:
        return ca(n.type), null;
      case 22:
      case 23:
        return on(n), Sc(), e !== null && I(Ri), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return ca(Tt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ny(e, n) {
    switch (rc(n), n.tag) {
      case 3:
        ca(Tt), $e();
        break;
      case 26:
      case 27:
      case 5:
        Ca(n);
        break;
      case 4:
        $e();
        break;
      case 31:
        n.memoizedState !== null && on(n);
        break;
      case 13:
        on(n);
        break;
      case 19:
        I(vt);
        break;
      case 10:
        ca(n.type);
        break;
      case 22:
      case 23:
        on(n), Sc(), e !== null && I(Ri);
        break;
      case 24:
        ca(Tt);
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
    } catch (E) {
      Ie(n, n.return, E);
    }
  }
  function Ya(e, n, i) {
    try {
      var r = n.updateQueue, u = r !== null ? r.lastEffect : null;
      if (u !== null) {
        var d = u.next;
        r = d;
        do {
          if ((r.tag & e) === e) {
            var v = r.inst, E = v.destroy;
            if (E !== void 0) {
              v.destroy = void 0, u = n;
              var M = i, k = E;
              try {
                k();
              } catch (Q) {
                Ie(
                  u,
                  M,
                  Q
                );
              }
            }
          }
          r = r.next;
        } while (r !== d);
      }
    } catch (Q) {
      Ie(n, n.return, Q);
    }
  }
  function ay(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var i = e.stateNode;
      try {
        Xm(n, i);
      } catch (r) {
        Ie(e, e.return, r);
      }
    }
  }
  function iy(e, n, i) {
    i.props = Di(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (r) {
      Ie(e, n, r);
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
      Ie(e, n, u);
    }
  }
  function Xn(e, n) {
    var i = e.ref, r = e.refCleanup;
    if (i !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (u) {
          Ie(e, n, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          Ie(e, n, u);
        }
      else i.current = null;
  }
  function ly(e) {
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
      Ie(e, e.return, u);
    }
  }
  function Wc(e, n, i) {
    try {
      var r = e.stateNode;
      CE(r, e.type, i, n), r[de] = n;
    } catch (u) {
      Ie(e, e.return, u);
    }
  }
  function ry(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Qa(e.type) || e.tag === 4;
  }
  function ef(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ry(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Qa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function tf(e, n, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(e), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = la));
    else if (r !== 4 && (r === 27 && Qa(e.type) && (i = e.stateNode, n = null), e = e.child, e !== null))
      for (tf(e, n, i), e = e.sibling; e !== null; )
        tf(e, n, i), e = e.sibling;
  }
  function lo(e, n, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? i.insertBefore(e, n) : i.appendChild(e);
    else if (r !== 4 && (r === 27 && Qa(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (lo(e, n, i), e = e.sibling; e !== null; )
        lo(e, n, i), e = e.sibling;
  }
  function sy(e) {
    var n = e.stateNode, i = e.memoizedProps;
    try {
      for (var r = e.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      Ut(n, r, i), n[fe] = e, n[de] = i;
    } catch (d) {
      Ie(e, e.return, d);
    }
  }
  var pa = !1, Ct = !1, nf = !1, oy = typeof WeakSet == "function" ? WeakSet : Set, zt = null;
  function lE(e, n) {
    if (e = e.containerInfo, wf = Mo, e = xm(e), Ku(e)) {
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
            var v = 0, E = -1, M = -1, k = 0, Q = 0, ee = e, Y = null;
            t: for (; ; ) {
              for (var $; ee !== i || u !== 0 && ee.nodeType !== 3 || (E = v + u), ee !== d || r !== 0 && ee.nodeType !== 3 || (M = v + r), ee.nodeType === 3 && (v += ee.nodeValue.length), ($ = ee.firstChild) !== null; )
                Y = ee, ee = $;
              for (; ; ) {
                if (ee === e) break t;
                if (Y === i && ++k === u && (E = v), Y === d && ++Q === r && (M = v), ($ = ee.nextSibling) !== null) break;
                ee = Y, Y = ee.parentNode;
              }
              ee = $;
            }
            i = E === -1 || M === -1 ? null : { start: E, end: M };
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
                  var me = Di(
                    i.type,
                    u
                  );
                  e = r.getSnapshotBeforeUpdate(
                    me,
                    d
                  ), r.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ce) {
                  Ie(
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
  function uy(e, n, i) {
    var r = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        ga(e, i), r & 4 && xr(5, i);
        break;
      case 1:
        if (ga(e, i), r & 4)
          if (e = i.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (v) {
              Ie(i, i.return, v);
            }
          else {
            var u = Di(
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
              Ie(
                i,
                i.return,
                v
              );
            }
          }
        r & 64 && ay(i), r & 512 && Sr(i, i.return);
        break;
      case 3:
        if (ga(e, i), r & 64 && (e = i.updateQueue, e !== null)) {
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
            Xm(e, n);
          } catch (v) {
            Ie(i, i.return, v);
          }
        }
        break;
      case 27:
        n === null && r & 4 && sy(i);
      case 26:
      case 5:
        ga(e, i), n === null && r & 4 && ly(i), r & 512 && Sr(i, i.return);
        break;
      case 12:
        ga(e, i);
        break;
      case 31:
        ga(e, i), r & 4 && dy(e, i);
        break;
      case 13:
        ga(e, i), r & 4 && hy(e, i), r & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = mE.bind(
          null,
          i
        ), OE(e, i))));
        break;
      case 22:
        if (r = i.memoizedState !== null || pa, !r) {
          n = n !== null && n.memoizedState !== null || Ct, u = pa;
          var d = Ct;
          pa = r, (Ct = n) && !d ? va(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : ga(e, i), pa = u, Ct = d;
        }
        break;
      case 30:
        break;
      default:
        ga(e, i);
    }
  }
  function cy(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, cy(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && et(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ft = null, Qt = !1;
  function ya(e, n, i) {
    for (i = i.child; i !== null; )
      fy(e, n, i), i = i.sibling;
  }
  function fy(e, n, i) {
    if (Ft && typeof Ft.onCommitFiberUnmount == "function")
      try {
        Ft.onCommitFiberUnmount(aa, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Ct || Xn(i, n), ya(
          e,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Ct || Xn(i, n);
        var r = ft, u = Qt;
        Qa(i.type) && (ft = i.stateNode, Qt = !1), ya(
          e,
          n,
          i
        ), Dr(i.stateNode), ft = r, Qt = u;
        break;
      case 5:
        Ct || Xn(i, n);
      case 6:
        if (r = ft, u = Qt, ft = null, ya(
          e,
          n,
          i
        ), ft = r, Qt = u, ft !== null)
          if (Qt)
            try {
              (ft.nodeType === 9 ? ft.body : ft.nodeName === "HTML" ? ft.ownerDocument.body : ft).removeChild(i.stateNode);
            } catch (d) {
              Ie(
                i,
                n,
                d
              );
            }
          else
            try {
              ft.removeChild(i.stateNode);
            } catch (d) {
              Ie(
                i,
                n,
                d
              );
            }
        break;
      case 18:
        ft !== null && (Qt ? (e = ft, ag(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), Dl(e)) : ag(ft, i.stateNode));
        break;
      case 4:
        r = ft, u = Qt, ft = i.stateNode.containerInfo, Qt = !0, ya(
          e,
          n,
          i
        ), ft = r, Qt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ya(2, i, n), Ct || Ya(4, i, n), ya(
          e,
          n,
          i
        );
        break;
      case 1:
        Ct || (Xn(i, n), r = i.stateNode, typeof r.componentWillUnmount == "function" && iy(
          i,
          n,
          r
        )), ya(
          e,
          n,
          i
        );
        break;
      case 21:
        ya(
          e,
          n,
          i
        );
        break;
      case 22:
        Ct = (r = Ct) || i.memoizedState !== null, ya(
          e,
          n,
          i
        ), Ct = r;
        break;
      default:
        ya(
          e,
          n,
          i
        );
    }
  }
  function dy(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Dl(e);
      } catch (i) {
        Ie(n, n.return, i);
      }
    }
  }
  function hy(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Dl(e);
      } catch (i) {
        Ie(n, n.return, i);
      }
  }
  function rE(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new oy()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new oy()), n;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function ro(e, n) {
    var i = rE(e);
    n.forEach(function(r) {
      if (!i.has(r)) {
        i.add(r);
        var u = pE.bind(null, e, r);
        r.then(u, u);
      }
    });
  }
  function Zt(e, n) {
    var i = n.deletions;
    if (i !== null)
      for (var r = 0; r < i.length; r++) {
        var u = i[r], d = e, v = n, E = v;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (Qa(E.type)) {
                ft = E.stateNode, Qt = !1;
                break e;
              }
              break;
            case 5:
              ft = E.stateNode, Qt = !1;
              break e;
            case 3:
            case 4:
              ft = E.stateNode.containerInfo, Qt = !0;
              break e;
          }
          E = E.return;
        }
        if (ft === null) throw Error(s(160));
        fy(d, v, u), ft = null, Qt = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        my(n, e), n = n.sibling;
  }
  var Ln = null;
  function my(e, n) {
    var i = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Zt(n, e), Jt(e), r & 4 && (Ya(3, e, e.return), xr(3, e), Ya(5, e, e.return));
        break;
      case 1:
        Zt(n, e), Jt(e), r & 512 && (Ct || i === null || Xn(i, i.return)), r & 64 && pa && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? r : i.concat(r))));
        break;
      case 26:
        var u = Ln;
        if (Zt(n, e), Jt(e), r & 512 && (Ct || i === null || Xn(i, i.return)), r & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (r = e.memoizedState, i === null)
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  r = e.type, i = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (r) {
                    case "title":
                      d = u.getElementsByTagName("title")[0], (!d || d[Ne] || d[fe] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(r), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), Ut(d, r, i), d[fe] = e, at(d), r = d;
                      break e;
                    case "link":
                      var v = mg(
                        "link",
                        "href",
                        u
                      ).get(r + (i.href || ""));
                      if (v) {
                        for (var E = 0; E < v.length; E++)
                          if (d = v[E], d.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && d.getAttribute("rel") === (i.rel == null ? null : i.rel) && d.getAttribute("title") === (i.title == null ? null : i.title) && d.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            v.splice(E, 1);
                            break t;
                          }
                      }
                      d = u.createElement(r), Ut(d, r, i), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (v = mg(
                        "meta",
                        "content",
                        u
                      ).get(r + (i.content || ""))) {
                        for (E = 0; E < v.length; E++)
                          if (d = v[E], d.getAttribute("content") === (i.content == null ? null : "" + i.content) && d.getAttribute("name") === (i.name == null ? null : i.name) && d.getAttribute("property") === (i.property == null ? null : i.property) && d.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && d.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            v.splice(E, 1);
                            break t;
                          }
                      }
                      d = u.createElement(r), Ut(d, r, i), u.head.appendChild(d);
                      break;
                    default:
                      throw Error(s(468, r));
                  }
                  d[fe] = e, at(d), r = d;
                }
                e.stateNode = r;
              } else
                pg(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = hg(
                u,
                r,
                e.memoizedProps
              );
          else
            d !== r ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, r === null ? pg(
              u,
              e.type,
              e.stateNode
            ) : hg(
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
        Zt(n, e), Jt(e), r & 512 && (Ct || i === null || Xn(i, i.return)), i !== null && r & 4 && Wc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Zt(n, e), Jt(e), r & 512 && (Ct || i === null || Xn(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            Wi(u, "");
          } catch (me) {
            Ie(e, e.return, me);
          }
        }
        r & 4 && e.stateNode != null && (u = e.memoizedProps, Wc(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), r & 1024 && (nf = !0);
        break;
      case 6:
        if (Zt(n, e), Jt(e), r & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          r = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = r;
          } catch (me) {
            Ie(e, e.return, me);
          }
        }
        break;
      case 3:
        if (To = null, u = Ln, Ln = So(n.containerInfo), Zt(n, e), Ln = u, Jt(e), r & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Dl(n.containerInfo);
          } catch (me) {
            Ie(e, e.return, me);
          }
        nf && (nf = !1, py(e));
        break;
      case 4:
        r = Ln, Ln = So(
          e.stateNode.containerInfo
        ), Zt(n, e), Jt(e), Ln = r;
        break;
      case 12:
        Zt(n, e), Jt(e);
        break;
      case 31:
        Zt(n, e), Jt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ro(e, r)));
        break;
      case 13:
        Zt(n, e), Jt(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (oo = Gt()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ro(e, r)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var M = i !== null && i.memoizedState !== null, k = pa, Q = Ct;
        if (pa = k || u, Ct = Q || M, Zt(n, e), Ct = Q, pa = k, Jt(e), r & 8192)
          e: for (n = e.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (i === null || M || pa || Ct || Ni(e)), i = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                M = i = n;
                try {
                  if (d = M.stateNode, u)
                    v = d.style, typeof v.setProperty == "function" ? v.setProperty("display", "none", "important") : v.display = "none";
                  else {
                    E = M.stateNode;
                    var ee = M.memoizedProps.style, Y = ee != null && ee.hasOwnProperty("display") ? ee.display : null;
                    E.style.display = Y == null || typeof Y == "boolean" ? "" : ("" + Y).trim();
                  }
                } catch (me) {
                  Ie(M, M.return, me);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                M = n;
                try {
                  M.stateNode.nodeValue = u ? "" : M.memoizedProps;
                } catch (me) {
                  Ie(M, M.return, me);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                M = n;
                try {
                  var $ = M.stateNode;
                  u ? ig($, !0) : ig(M.stateNode, !1);
                } catch (me) {
                  Ie(M, M.return, me);
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
        Zt(n, e), Jt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ro(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Zt(n, e), Jt(e);
    }
  }
  function Jt(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var i, r = e.return; r !== null; ) {
          if (ry(r)) {
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
            var E = ef(e);
            lo(e, E, v);
            break;
          case 3:
          case 4:
            var M = i.stateNode.containerInfo, k = ef(e);
            tf(
              e,
              k,
              M
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (Q) {
        Ie(e, e.return, Q);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function py(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        py(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function ga(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        uy(e, n.alternate, n), n = n.sibling;
  }
  function Ni(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ya(4, n, n.return), Ni(n);
          break;
        case 1:
          Xn(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && iy(
            n,
            n.return,
            i
          ), Ni(n);
          break;
        case 27:
          Dr(n.stateNode);
        case 26:
        case 5:
          Xn(n, n.return), Ni(n);
          break;
        case 22:
          n.memoizedState === null && Ni(n);
          break;
        case 30:
          Ni(n);
          break;
        default:
          Ni(n);
      }
      e = e.sibling;
    }
  }
  function va(e, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var r = n.alternate, u = e, d = n, v = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          va(
            u,
            d,
            i
          ), xr(4, d);
          break;
        case 1:
          if (va(
            u,
            d,
            i
          ), r = d, u = r.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (k) {
              Ie(r, r.return, k);
            }
          if (r = d, u = r.updateQueue, u !== null) {
            var E = r.stateNode;
            try {
              var M = u.shared.hiddenCallbacks;
              if (M !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < M.length; u++)
                  $m(M[u], E);
            } catch (k) {
              Ie(r, r.return, k);
            }
          }
          i && v & 64 && ay(d), Sr(d, d.return);
          break;
        case 27:
          sy(d);
        case 26:
        case 5:
          va(
            u,
            d,
            i
          ), i && r === null && v & 4 && ly(d), Sr(d, d.return);
          break;
        case 12:
          va(
            u,
            d,
            i
          );
          break;
        case 31:
          va(
            u,
            d,
            i
          ), i && v & 4 && dy(u, d);
          break;
        case 13:
          va(
            u,
            d,
            i
          ), i && v & 4 && hy(u, d);
          break;
        case 22:
          d.memoizedState === null && va(
            u,
            d,
            i
          ), Sr(d, d.return);
          break;
        case 30:
          break;
        default:
          va(
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
        yy(
          e,
          n,
          i,
          r
        ), n = n.sibling;
  }
  function yy(e, n, i, r) {
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
            var d = n.memoizedProps, v = d.id, E = d.onPostCommit;
            typeof E == "function" && E(
              v,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (M) {
            Ie(n, n.return, M);
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
      var d = e, v = n, E = i, M = r, k = v.flags;
      switch (v.tag) {
        case 0:
        case 11:
        case 15:
          bl(
            d,
            v,
            E,
            M,
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
            E,
            M,
            u
          ) : Er(
            d,
            v
          ) : (Q._visibility |= 2, bl(
            d,
            v,
            E,
            M,
            u
          )), u && k & 2048 && af(
            v.alternate,
            v
          );
          break;
        case 24:
          bl(
            d,
            v,
            E,
            M,
            u
          ), u && k & 2048 && lf(v.alternate, v);
          break;
        default:
          bl(
            d,
            v,
            E,
            M,
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
        gy(
          e,
          n,
          i
        ), e = e.sibling;
  }
  function gy(e, n, i) {
    switch (e.tag) {
      case 26:
        xl(
          e,
          n,
          i
        ), e.flags & Tr && e.memoizedState !== null && $E(
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
  function vy(e) {
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
          zt = r, xy(
            r,
            e
          );
        }
      vy(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        by(e), e = e.sibling;
  }
  function by(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        wr(e), e.flags & 2048 && Ya(9, e, e.return);
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
          zt = r, xy(
            r,
            e
          );
        }
      vy(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Ya(8, n, n.return), so(n);
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
  function xy(e, n) {
    for (; zt !== null; ) {
      var i = zt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ya(8, i, n);
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
          if (cy(r), r === i) {
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
  var sE = {
    getCacheForType: function(e) {
      var n = Ot(Tt), i = n.data.get(e);
      return i === void 0 && (i = e(), n.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Ot(Tt).controller.signal;
    }
  }, oE = typeof WeakMap == "function" ? WeakMap : Map, Ge = 0, tt = null, Ue = null, Be = 0, Xe = 0, un = null, Ga = !1, Sl = !1, rf = !1, ba = 0, pt = 0, Fa = 0, zi = 0, sf = 0, cn = 0, El = 0, Rr = null, Wt = null, of = !1, oo = 0, Sy = 0, uo = 1 / 0, co = null, $a = null, At = 0, Xa = null, Tl = null, xa = 0, uf = 0, cf = null, Ey = null, Cr = 0, ff = null;
  function fn() {
    return (Ge & 2) !== 0 && Be !== 0 ? Be & -Be : N.T !== null ? gf() : ae();
  }
  function Ty() {
    if (cn === 0)
      if ((Be & 536870912) === 0 || qe) {
        var e = ia;
        ia <<= 1, (ia & 3932160) === 0 && (ia = 262144), cn = e;
      } else cn = 536870912;
    return e = sn.current, e !== null && (e.flags |= 32), cn;
  }
  function en(e, n, i) {
    (e === tt && (Xe === 2 || Xe === 9) || e.cancelPendingCommit !== null) && (wl(e, 0), Ia(
      e,
      Be,
      cn,
      !1
    )), Pn(e, i), ((Ge & 2) === 0 || e !== tt) && (e === tt && ((Ge & 2) === 0 && (zi |= i), pt === 4 && Ia(
      e,
      Be,
      cn,
      !1
    )), In(e));
  }
  function wy(e, n, i) {
    if ((Ge & 6) !== 0) throw Error(s(327));
    var r = !i && (n & 127) === 0 && (n & e.expiredLanes) === 0 || Da(e, n), u = r ? fE(e, n) : hf(e, n, !0), d = r;
    do {
      if (u === 0) {
        Sl && !r && Ia(e, n, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, d && !uE(i)) {
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
              var E = e;
              u = Rr;
              var M = E.current.memoizedState.isDehydrated;
              if (M && (wl(E, v).flags |= 256), v = hf(
                E,
                v,
                !1
              ), v !== 2) {
                if (rf && !M) {
                  E.errorRecoveryDisabledLanes |= d, zi |= d, u = 4;
                  break e;
                }
                d = Wt, Wt = u, d !== null && (Wt === null ? Wt = d : Wt.push.apply(
                  Wt,
                  d
                ));
              }
              u = v;
            }
            if (d = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          wl(e, 0), Ia(e, n, 0, !0);
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
              Ia(
                r,
                n,
                cn,
                !Ga
              );
              break e;
            case 2:
              Wt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((n & 62914560) === n && (u = oo + 300 - Gt(), 10 < u)) {
            if (Ia(
              r,
              n,
              cn,
              !Ga
            ), Ii(r, 0, !0) !== 0) break e;
            xa = n, r.timeoutHandle = tg(
              Ry.bind(
                null,
                r,
                i,
                Wt,
                co,
                of,
                n,
                cn,
                zi,
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
          Ry(
            r,
            i,
            Wt,
            co,
            of,
            n,
            cn,
            zi,
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
  function Ry(e, n, i, r, u, d, v, E, M, k, Q, ee, Y, $) {
    if (e.timeoutHandle = -1, ee = n.subtreeFlags, ee & 8192 || (ee & 16785408) === 16785408) {
      ee = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: la
      }, gy(
        n,
        d,
        ee
      );
      var me = (d & 62914560) === d ? oo - Gt() : (d & 4194048) === d ? Sy - Gt() : 0;
      if (me = XE(
        ee,
        me
      ), me !== null) {
        xa = d, e.cancelPendingCommit = me(
          _y.bind(
            null,
            e,
            n,
            d,
            i,
            r,
            u,
            v,
            E,
            M,
            Q,
            ee,
            null,
            Y,
            $
          )
        ), Ia(e, d, v, !k);
        return;
      }
    }
    _y(
      e,
      n,
      d,
      i,
      r,
      u,
      v,
      E,
      M
    );
  }
  function uE(e) {
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
  function Ia(e, n, i, r) {
    n &= ~sf, n &= ~zi, e.suspendedLanes |= n, e.pingedLanes &= ~n, r && (e.warmLanes |= n), r = e.expirationTimes;
    for (var u = n; 0 < u; ) {
      var d = 31 - qt(u), v = 1 << d;
      r[d] = -1, u &= ~v;
    }
    i !== 0 && xs(e, i, n);
  }
  function fo() {
    return (Ge & 6) === 0 ? (Mr(0), !1) : !0;
  }
  function df() {
    if (Ue !== null) {
      if (Xe === 0)
        var e = Ue.return;
      else
        e = Ue, ua = Ti = null, Mc(e), ml = null, ur = 0, e = Ue;
      for (; e !== null; )
        ny(e.alternate, e), e = e.return;
      Ue = null;
    }
  }
  function wl(e, n) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, jE(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), xa = 0, df(), tt = e, Ue = i = sa(e.current, null), Be = n, Xe = 0, un = null, Ga = !1, Sl = Da(e, n), rf = !1, El = cn = sf = zi = Fa = pt = 0, Wt = Rr = null, of = !1, (n & 8) !== 0 && (n |= n & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= n; 0 < r; ) {
        var u = 31 - qt(r), d = 1 << u;
        n |= e[u], r &= ~d;
      }
    return ba = n, zs(), i;
  }
  function Cy(e, n) {
    Ae = null, N.H = gr, n === hl || n === qs ? (n = Pm(), Xe = 3) : n === pc ? (n = Pm(), Xe = 4) : Xe = n === Yc ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, un = n, Ue === null && (pt = 1, eo(
      e,
      gn(n, e.current)
    ));
  }
  function My() {
    var e = sn.current;
    return e === null ? !0 : (Be & 4194048) === Be ? Sn === null : (Be & 62914560) === Be || (Be & 536870912) !== 0 ? e === Sn : !1;
  }
  function Ay() {
    var e = N.H;
    return N.H = gr, e === null ? gr : e;
  }
  function jy() {
    var e = N.A;
    return N.A = sE, e;
  }
  function ho() {
    pt = 4, Ga || (Be & 4194048) !== Be && sn.current !== null || (Sl = !0), (Fa & 134217727) === 0 && (zi & 134217727) === 0 || tt === null || Ia(
      tt,
      Be,
      cn,
      !1
    );
  }
  function hf(e, n, i) {
    var r = Ge;
    Ge |= 2;
    var u = Ay(), d = jy();
    (tt !== e || Be !== n) && (co = null, wl(e, n)), n = !1;
    var v = pt;
    e: do
      try {
        if (Xe !== 0 && Ue !== null) {
          var E = Ue, M = un;
          switch (Xe) {
            case 8:
              df(), v = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              sn.current === null && (n = !0);
              var k = Xe;
              if (Xe = 0, un = null, Rl(e, E, M, k), i && Sl) {
                v = 0;
                break e;
              }
              break;
            default:
              k = Xe, Xe = 0, un = null, Rl(e, E, M, k);
          }
        }
        cE(), v = pt;
        break;
      } catch (Q) {
        Cy(e, Q);
      }
    while (!0);
    return n && e.shellSuspendCounter++, ua = Ti = null, Ge = r, N.H = u, N.A = d, Ue === null && (tt = null, Be = 0, zs()), v;
  }
  function cE() {
    for (; Ue !== null; ) Dy(Ue);
  }
  function fE(e, n) {
    var i = Ge;
    Ge |= 2;
    var r = Ay(), u = jy();
    tt !== e || Be !== n ? (co = null, uo = Gt() + 500, wl(e, n)) : Sl = Da(
      e,
      n
    );
    e: do
      try {
        if (Xe !== 0 && Ue !== null) {
          n = Ue;
          var d = un;
          t: switch (Xe) {
            case 1:
              Xe = 0, un = null, Rl(e, n, d, 1);
              break;
            case 2:
            case 9:
              if (qm(d)) {
                Xe = 0, un = null, Ny(n);
                break;
              }
              n = function() {
                Xe !== 2 && Xe !== 9 || tt !== e || (Xe = 7), In(e);
              }, d.then(n, n);
              break e;
            case 3:
              Xe = 7;
              break e;
            case 4:
              Xe = 5;
              break e;
            case 7:
              qm(d) ? (Xe = 0, un = null, Ny(n)) : (Xe = 0, un = null, Rl(e, n, d, 7));
              break;
            case 5:
              var v = null;
              switch (Ue.tag) {
                case 26:
                  v = Ue.memoizedState;
                case 5:
                case 27:
                  var E = Ue;
                  if (v ? yg(v) : E.stateNode.complete) {
                    Xe = 0, un = null;
                    var M = E.sibling;
                    if (M !== null) Ue = M;
                    else {
                      var k = E.return;
                      k !== null ? (Ue = k, mo(k)) : Ue = null;
                    }
                    break t;
                  }
              }
              Xe = 0, un = null, Rl(e, n, d, 5);
              break;
            case 6:
              Xe = 0, un = null, Rl(e, n, d, 6);
              break;
            case 8:
              df(), pt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        dE();
        break;
      } catch (Q) {
        Cy(e, Q);
      }
    while (!0);
    return ua = Ti = null, N.H = r, N.A = u, Ge = i, Ue !== null ? 0 : (tt = null, Be = 0, zs(), pt);
  }
  function dE() {
    for (; Ue !== null && !ju(); )
      Dy(Ue);
  }
  function Dy(e) {
    var n = ey(e.alternate, e, ba);
    e.memoizedProps = e.pendingProps, n === null ? mo(e) : Ue = n;
  }
  function Ny(e) {
    var n = e, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Ip(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Be
        );
        break;
      case 11:
        n = Ip(
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
        ny(i, n), n = Ue = jm(n, ba), n = ey(i, n, ba);
    }
    e.memoizedProps = e.pendingProps, n === null ? mo(e) : Ue = n;
  }
  function Rl(e, n, i, r) {
    ua = Ti = null, Mc(n), ml = null, ur = 0;
    var u = n.return;
    try {
      if (eE(
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
    n.flags & 32768 ? (qe || r === 1 ? e = !0 : Sl || (Be & 536870912) !== 0 ? e = !1 : (Ga = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = sn.current, r !== null && r.tag === 13 && (r.flags |= 16384))), zy(n, e)) : mo(n);
  }
  function mo(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        zy(
          n,
          Ga
        );
        return;
      }
      e = n.return;
      var i = aE(
        n.alternate,
        n,
        ba
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
  function zy(e, n) {
    do {
      var i = iE(e.alternate, e);
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
  function _y(e, n, i, r, u, d, v, E, M) {
    e.cancelPendingCommit = null;
    do
      po();
    while (At !== 0);
    if ((Ge & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === e.current) throw Error(s(177));
      if (d = n.lanes | n.childLanes, d |= ec, bs(
        e,
        i,
        d,
        v,
        E,
        M
      ), e === tt && (Ue = tt = null, Be = 0), Tl = n, Xa = e, xa = i, uf = d, cf = u, Ey = r, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, yE(ja, function() {
        return By(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || r) {
        r = N.T, N.T = null, u = J.p, J.p = 2, v = Ge, Ge |= 4;
        try {
          lE(e, n, i);
        } finally {
          Ge = v, J.p = u, N.T = r;
        }
      }
      At = 1, Oy(), Ly(), Uy();
    }
  }
  function Oy() {
    if (At === 1) {
      At = 0;
      var e = Xa, n = Tl, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = N.T, N.T = null;
        var r = J.p;
        J.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          my(n, e);
          var d = Rf, v = xm(e.containerInfo), E = d.focusedElem, M = d.selectionRange;
          if (v !== E && E && E.ownerDocument && bm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (M !== null && Ku(E)) {
              var k = M.start, Q = M.end;
              if (Q === void 0 && (Q = k), "selectionStart" in E)
                E.selectionStart = k, E.selectionEnd = Math.min(
                  Q,
                  E.value.length
                );
              else {
                var ee = E.ownerDocument || document, Y = ee && ee.defaultView || window;
                if (Y.getSelection) {
                  var $ = Y.getSelection(), me = E.textContent.length, Ce = Math.min(M.start, me), We = M.end === void 0 ? Ce : Math.min(M.end, me);
                  !$.extend && Ce > We && (v = We, We = Ce, Ce = v);
                  var V = vm(
                    E,
                    Ce
                  ), z = vm(
                    E,
                    We
                  );
                  if (V && z && ($.rangeCount !== 1 || $.anchorNode !== V.node || $.anchorOffset !== V.offset || $.focusNode !== z.node || $.focusOffset !== z.offset)) {
                    var q = ee.createRange();
                    q.setStart(V.node, V.offset), $.removeAllRanges(), Ce > We ? ($.addRange(q), $.extend(z.node, z.offset)) : (q.setEnd(z.node, z.offset), $.addRange(q));
                  }
                }
              }
            }
            for (ee = [], $ = E; $ = $.parentNode; )
              $.nodeType === 1 && ee.push({
                element: $,
                left: $.scrollLeft,
                top: $.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < ee.length; E++) {
              var W = ee[E];
              W.element.scrollLeft = W.left, W.element.scrollTop = W.top;
            }
          }
          Mo = !!wf, Rf = wf = null;
        } finally {
          Ge = u, J.p = r, N.T = i;
        }
      }
      e.current = n, At = 2;
    }
  }
  function Ly() {
    if (At === 2) {
      At = 0;
      var e = Xa, n = Tl, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = N.T, N.T = null;
        var r = J.p;
        J.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          uy(e, n.alternate, n);
        } finally {
          Ge = u, J.p = r, N.T = i;
        }
      }
      At = 3;
    }
  }
  function Uy() {
    if (At === 4 || At === 3) {
      At = 0, Du();
      var e = Xa, n = Tl, i = xa, r = Ey;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? At = 5 : (At = 0, Tl = Xa = null, Vy(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && ($a = null), P(i), n = n.stateNode, Ft && typeof Ft.onCommitFiberRoot == "function")
        try {
          Ft.onCommitFiberRoot(
            aa,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        n = N.T, u = J.p, J.p = 2, N.T = null;
        try {
          for (var d = e.onRecoverableError, v = 0; v < r.length; v++) {
            var E = r[v];
            d(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          N.T = n, J.p = u;
        }
      }
      (xa & 3) !== 0 && po(), In(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === ff ? Cr++ : (Cr = 0, ff = e) : Cr = 0, Mr(0);
    }
  }
  function Vy(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, sr(n)));
  }
  function po() {
    return Oy(), Ly(), Uy(), By();
  }
  function By() {
    if (At !== 5) return !1;
    var e = Xa, n = uf;
    uf = 0;
    var i = P(xa), r = N.T, u = J.p;
    try {
      J.p = 32 > i ? 32 : i, N.T = null, i = cf, cf = null;
      var d = Xa, v = xa;
      if (At = 0, Tl = Xa = null, xa = 0, (Ge & 6) !== 0) throw Error(s(331));
      var E = Ge;
      if (Ge |= 4, by(d.current), yy(
        d,
        d.current,
        v,
        i
      ), Ge = E, Mr(0, !1), Ft && typeof Ft.onPostCommitFiberRoot == "function")
        try {
          Ft.onPostCommitFiberRoot(aa, d);
        } catch {
        }
      return !0;
    } finally {
      J.p = u, N.T = r, Vy(e, n);
    }
  }
  function Hy(e, n, i) {
    n = gn(i, n), n = Pc(e.stateNode, n, 2), e = qa(e, n, 2), e !== null && (Pn(e, 2), In(e));
  }
  function Ie(e, n, i) {
    if (e.tag === 3)
      Hy(e, e, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Hy(
            n,
            e,
            i
          );
          break;
        } else if (n.tag === 1) {
          var r = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && ($a === null || !$a.has(r))) {
            e = gn(i, e), i = qp(2), r = qa(n, i, 2), r !== null && (kp(
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
      r = e.pingCache = new oE();
      var u = /* @__PURE__ */ new Set();
      r.set(n, u);
    } else
      u = r.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), r.set(n, u));
    u.has(i) || (rf = !0, u.add(i), e = hE.bind(null, e, n, i), n.then(e, e));
  }
  function hE(e, n, i) {
    var r = e.pingCache;
    r !== null && r.delete(n), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, tt === e && (Be & i) === i && (pt === 4 || pt === 3 && (Be & 62914560) === Be && 300 > Gt() - oo ? (Ge & 2) === 0 && wl(e, 0) : sf |= i, El === Be && (El = 0)), In(e);
  }
  function qy(e, n) {
    n === 0 && (n = Kl()), e = xi(e, n), e !== null && (Pn(e, n), In(e));
  }
  function mE(e) {
    var n = e.memoizedState, i = 0;
    n !== null && (i = n.retryLane), qy(e, i);
  }
  function pE(e, n) {
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
    r !== null && r.delete(n), qy(e, i);
  }
  function yE(e, n) {
    return ut(e, n);
  }
  var yo = null, Cl = null, pf = !1, go = !1, yf = !1, Ka = 0;
  function In(e) {
    e !== Cl && e.next === null && (Cl === null ? yo = Cl = e : Cl = Cl.next = e), go = !0, pf || (pf = !0, vE());
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
              var v = r.suspendedLanes, E = r.pingedLanes;
              d = (1 << 31 - qt(42 | e) + 1) - 1, d &= u & ~(v & ~E), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, Gy(r, d));
          } else
            d = Be, d = Ii(
              r,
              r === tt ? d : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (d & 3) === 0 || Da(r, d) || (i = !0, Gy(r, d));
          r = r.next;
        }
      while (i);
      yf = !1;
    }
  }
  function gE() {
    ky();
  }
  function ky() {
    go = pf = !1;
    var e = 0;
    Ka !== 0 && AE() && (e = Ka);
    for (var n = Gt(), i = null, r = yo; r !== null; ) {
      var u = r.next, d = Py(r, n);
      d === 0 ? (r.next = null, i === null ? yo = u : i.next = u, u === null && (Cl = i)) : (i = r, (e !== 0 || (d & 3) !== 0) && (go = !0)), r = u;
    }
    At !== 0 && At !== 5 || Mr(e), Ka !== 0 && (Ka = 0);
  }
  function Py(e, n) {
    for (var i = e.suspendedLanes, r = e.pingedLanes, u = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var v = 31 - qt(d), E = 1 << v, M = u[v];
      M === -1 ? ((E & i) === 0 || (E & r) !== 0) && (u[v] = _u(E, n)) : M <= n && (e.expiredLanes |= E), d &= ~E;
    }
    if (n = tt, i = Be, i = Ii(
      e,
      e === n ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, i === 0 || e === n && (Xe === 2 || Xe === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && ta(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || Da(e, i)) {
      if (n = i & -i, n === e.callbackPriority) return n;
      switch (r !== null && ta(r), P(i)) {
        case 2:
        case 8:
          i = Il;
          break;
        case 32:
          i = ja;
          break;
        case 268435456:
          i = mn;
          break;
        default:
          i = ja;
      }
      return r = Yy.bind(null, e), i = ut(i, r), e.callbackPriority = n, e.callbackNode = i, n;
    }
    return r !== null && r !== null && ta(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Yy(e, n) {
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
    ), r === 0 ? null : (wy(e, r, n), Py(e, Gt()), e.callbackNode != null && e.callbackNode === i ? Yy.bind(null, e) : null);
  }
  function Gy(e, n) {
    if (po()) return null;
    wy(e, n, !0);
  }
  function vE() {
    DE(function() {
      (Ge & 6) !== 0 ? ut(
        Aa,
        gE
      ) : ky();
    });
  }
  function gf() {
    if (Ka === 0) {
      var e = fl;
      e === 0 && (e = hi, hi <<= 1, (hi & 261888) === 0 && (hi = 256)), Ka = e;
    }
    return Ka;
  }
  function Fy(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ws("" + e);
  }
  function $y(e, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, e.id && i.setAttribute("form", e.id), n.parentNode.insertBefore(i, n), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function bE(e, n, i, r, u) {
    if (n === "submit" && i && i.stateNode === u) {
      var d = Fy(
        (u[de] || null).action
      ), v = r.submitter;
      v && (n = (n = v[de] || null) ? Fy(n.formAction) : v.getAttribute("formAction"), n !== null && (d = n, v = null));
      var E = new As(
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
                if (Ka !== 0) {
                  var M = v ? $y(u, v) : new FormData(u);
                  Uc(
                    i,
                    {
                      pending: !0,
                      data: M,
                      method: u.method,
                      action: d
                    },
                    null,
                    M
                  );
                }
              } else
                typeof d == "function" && (E.preventDefault(), M = v ? $y(u, v) : new FormData(u), Uc(
                  i,
                  {
                    pending: !0,
                    data: M,
                    method: u.method,
                    action: d
                  },
                  d,
                  M
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var vf = 0; vf < Wu.length; vf++) {
    var bf = Wu[vf], xE = bf.toLowerCase(), SE = bf[0].toUpperCase() + bf.slice(1);
    On(
      xE,
      "on" + SE
    );
  }
  On(Tm, "onAnimationEnd"), On(wm, "onAnimationIteration"), On(Rm, "onAnimationStart"), On("dblclick", "onDoubleClick"), On("focusin", "onFocus"), On("focusout", "onBlur"), On(V1, "onTransitionRun"), On(B1, "onTransitionStart"), On(H1, "onTransitionCancel"), On(Cm, "onTransitionEnd"), Yn("onMouseEnter", ["mouseout", "mouseover"]), Yn("onMouseLeave", ["mouseout", "mouseover"]), Yn("onPointerEnter", ["pointerout", "pointerover"]), Yn("onPointerLeave", ["pointerout", "pointerover"]), Nt(
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
  ), EE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ar)
  );
  function Xy(e, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var r = e[i], u = r.event;
      r = r.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var v = r.length - 1; 0 <= v; v--) {
            var E = r[v], M = E.instance, k = E.currentTarget;
            if (E = E.listener, M !== d && u.isPropagationStopped())
              break e;
            d = E, u.currentTarget = k;
            try {
              d(u);
            } catch (Q) {
              Ns(Q);
            }
            u.currentTarget = null, d = M;
          }
        else
          for (v = 0; v < r.length; v++) {
            if (E = r[v], M = E.instance, k = E.currentTarget, E = E.listener, M !== d && u.isPropagationStopped())
              break e;
            d = E, u.currentTarget = k;
            try {
              d(u);
            } catch (Q) {
              Ns(Q);
            }
            u.currentTarget = null, d = M;
          }
      }
    }
  }
  function Ve(e, n) {
    var i = n[he];
    i === void 0 && (i = n[he] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    i.has(r) || (Iy(n, e, 2, !1), i.add(r));
  }
  function xf(e, n, i) {
    var r = 0;
    n && (r |= 4), Iy(
      i,
      e,
      r,
      n
    );
  }
  var vo = "_reactListening" + Math.random().toString(36).slice(2);
  function Sf(e) {
    if (!e[vo]) {
      e[vo] = !0, za.forEach(function(i) {
        i !== "selectionchange" && (EE.has(i) || xf(i, !1, e), xf(i, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[vo] || (n[vo] = !0, xf("selectionchange", !1, n));
    }
  }
  function Iy(e, n, i, r) {
    switch (Tg(n)) {
      case 2:
        var u = QE;
        break;
      case 8:
        u = ZE;
        break;
      default:
        u = Uf;
    }
    i = u.bind(
      null,
      n,
      i,
      e
    ), u = void 0, !qu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), r ? u !== void 0 ? e.addEventListener(n, i, {
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
          var E = r.stateNode.containerInfo;
          if (E === u) break;
          if (v === 4)
            for (v = r.return; v !== null; ) {
              var M = v.tag;
              if ((M === 3 || M === 4) && v.stateNode.containerInfo === u)
                return;
              v = v.return;
            }
          for (; E !== null; ) {
            if (v = Qe(E), v === null) return;
            if (M = v.tag, M === 5 || M === 6 || M === 26 || M === 27) {
              r = d = v;
              continue e;
            }
            E = E.parentNode;
          }
        }
        r = r.return;
      }
    Wh(function() {
      var k = d, Q = Bu(i), ee = [];
      e: {
        var Y = Mm.get(e);
        if (Y !== void 0) {
          var $ = As, me = e;
          switch (e) {
            case "keypress":
              if (Cs(i) === 0) break e;
            case "keydown":
            case "keyup":
              $ = p1;
              break;
            case "focusin":
              me = "focus", $ = Gu;
              break;
            case "focusout":
              me = "blur", $ = Gu;
              break;
            case "beforeblur":
            case "afterblur":
              $ = Gu;
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
              $ = nm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              $ = a1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              $ = v1;
              break;
            case Tm:
            case wm:
            case Rm:
              $ = r1;
              break;
            case Cm:
              $ = x1;
              break;
            case "scroll":
            case "scrollend":
              $ = t1;
              break;
            case "wheel":
              $ = E1;
              break;
            case "copy":
            case "cut":
            case "paste":
              $ = o1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              $ = im;
              break;
            case "toggle":
            case "beforetoggle":
              $ = w1;
          }
          var Ce = (n & 4) !== 0, We = !Ce && (e === "scroll" || e === "scrollend"), V = Ce ? Y !== null ? Y + "Capture" : null : Y;
          Ce = [];
          for (var z = k, q; z !== null; ) {
            var W = z;
            if (q = W.stateNode, W = W.tag, W !== 5 && W !== 26 && W !== 27 || q === null || V === null || (W = Ql(z, V), W != null && Ce.push(
              jr(z, W, q)
            )), We) break;
            z = z.return;
          }
          0 < Ce.length && (Y = new $(
            Y,
            me,
            null,
            i,
            Q
          ), ee.push({ event: Y, listeners: Ce }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (Y = e === "mouseover" || e === "pointerover", $ = e === "mouseout" || e === "pointerout", Y && i !== Vu && (me = i.relatedTarget || i.fromElement) && (Qe(me) || me[ge]))
            break e;
          if (($ || Y) && (Y = Q.window === Q ? Q : (Y = Q.ownerDocument) ? Y.defaultView || Y.parentWindow : window, $ ? (me = i.relatedTarget || i.toElement, $ = k, me = me ? Qe(me) : null, me !== null && (We = c(me), Ce = me.tag, me !== We || Ce !== 5 && Ce !== 27 && Ce !== 6) && (me = null)) : ($ = null, me = k), $ !== me)) {
            if (Ce = nm, W = "onMouseLeave", V = "onMouseEnter", z = "mouse", (e === "pointerout" || e === "pointerover") && (Ce = im, W = "onPointerLeave", V = "onPointerEnter", z = "pointer"), We = $ == null ? Y : Le($), q = me == null ? Y : Le(me), Y = new Ce(
              W,
              z + "leave",
              $,
              i,
              Q
            ), Y.target = We, Y.relatedTarget = q, W = null, Qe(Q) === k && (Ce = new Ce(
              V,
              z + "enter",
              me,
              i,
              Q
            ), Ce.target = q, Ce.relatedTarget = We, W = Ce), We = W, $ && me)
              t: {
                for (Ce = TE, V = $, z = me, q = 0, W = V; W; W = Ce(W))
                  q++;
                W = 0;
                for (var Ee = z; Ee; Ee = Ce(Ee))
                  W++;
                for (; 0 < q - W; )
                  V = Ce(V), q--;
                for (; 0 < W - q; )
                  z = Ce(z), W--;
                for (; q--; ) {
                  if (V === z || z !== null && V === z.alternate) {
                    Ce = V;
                    break t;
                  }
                  V = Ce(V), z = Ce(z);
                }
                Ce = null;
              }
            else Ce = null;
            $ !== null && Ky(
              ee,
              Y,
              $,
              Ce,
              !1
            ), me !== null && We !== null && Ky(
              ee,
              We,
              me,
              Ce,
              !0
            );
          }
        }
        e: {
          if (Y = k ? Le(k) : window, $ = Y.nodeName && Y.nodeName.toLowerCase(), $ === "select" || $ === "input" && Y.type === "file")
            var Pe = dm;
          else if (cm(Y))
            if (hm)
              Pe = O1;
            else {
              Pe = z1;
              var ve = N1;
            }
          else
            $ = Y.nodeName, !$ || $.toLowerCase() !== "input" || Y.type !== "checkbox" && Y.type !== "radio" ? k && Uu(k.elementType) && (Pe = dm) : Pe = _1;
          if (Pe && (Pe = Pe(e, k))) {
            fm(
              ee,
              Pe,
              i,
              Q
            );
            break e;
          }
          ve && ve(e, Y, k), e === "focusout" && k && Y.type === "number" && k.memoizedProps.value != null && Lu(Y, "number", Y.value);
        }
        switch (ve = k ? Le(k) : window, e) {
          case "focusin":
            (cm(ve) || ve.contentEditable === "true") && (al = ve, Qu = k, ir = null);
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
            Zu = !1, Sm(ee, i, Q);
            break;
          case "selectionchange":
            if (U1) break;
          case "keydown":
          case "keyup":
            Sm(ee, i, Q);
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
          nl ? om(e, i) && (He = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (He = "onCompositionStart");
        He && (lm && i.locale !== "ko" && (nl || He !== "onCompositionStart" ? He === "onCompositionEnd" && nl && (je = em()) : (_a = Q, ku = "value" in _a ? _a.value : _a.textContent, nl = !0)), ve = bo(k, He), 0 < ve.length && (He = new am(
          He,
          e,
          null,
          i,
          Q
        ), ee.push({ event: He, listeners: ve }), je ? He.data = je : (je = um(i), je !== null && (He.data = je)))), (je = C1 ? M1(e, i) : A1(e, i)) && (He = bo(k, "onBeforeInput"), 0 < He.length && (ve = new am(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          Q
        ), ee.push({
          event: ve,
          listeners: He
        }), ve.data = je)), bE(
          ee,
          e,
          k,
          i,
          Q
        );
      }
      Xy(ee, n);
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
  function TE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Ky(e, n, i, r, u) {
    for (var d = n._reactName, v = []; i !== null && i !== r; ) {
      var E = i, M = E.alternate, k = E.stateNode;
      if (E = E.tag, M !== null && M === r) break;
      E !== 5 && E !== 26 && E !== 27 || k === null || (M = k, u ? (k = Ql(i, d), k != null && v.unshift(
        jr(i, k, M)
      )) : u || (k = Ql(i, d), k != null && v.push(
        jr(i, k, M)
      ))), i = i.return;
    }
    v.length !== 0 && e.push({ event: n, listeners: v });
  }
  var wE = /\r\n?/g, RE = /\u0000|\uFFFD/g;
  function Qy(e) {
    return (typeof e == "string" ? e : "" + e).replace(wE, `
`).replace(RE, "");
  }
  function Zy(e, n) {
    return n = Qy(n), Qy(e) === n;
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
        Zh(e, r, d);
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
        r != null && (e.onclick = la);
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
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        kt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        kt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        kt(
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
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = WS.get(i) || i, ze(e, i, r));
    }
  }
  function Tf(e, n, i, r, u, d) {
    switch (i) {
      case "style":
        Zh(e, r, d);
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
        r != null && (e.onclick = la);
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
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), n = i.slice(2, u ? i.length - 7 : void 0), d = e[de] || null, d = d != null ? d[i] : null, typeof d == "function" && e.removeEventListener(n, d, u), typeof r == "function")) {
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
        var E = d = v = u = null, M = null, k = null;
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
                  M = Q;
                  break;
                case "defaultChecked":
                  k = Q;
                  break;
                case "value":
                  d = Q;
                  break;
                case "defaultValue":
                  E = Q;
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
        Xh(
          e,
          d,
          E,
          M,
          k,
          v,
          u,
          !1
        );
        return;
      case "select":
        Ve("invalid", e), r = v = d = null;
        for (u in i)
          if (i.hasOwnProperty(u) && (E = i[u], E != null))
            switch (u) {
              case "value":
                d = E;
                break;
              case "defaultValue":
                v = E;
                break;
              case "multiple":
                r = E;
              default:
                Je(e, n, u, E, i, null);
            }
        n = d, i = v, e.multiple = !!r, n != null ? Ji(e, !!r, n, !1) : i != null && Ji(e, !!r, i, !0);
        return;
      case "textarea":
        Ve("invalid", e), d = u = r = null;
        for (v in i)
          if (i.hasOwnProperty(v) && (E = i[v], E != null))
            switch (v) {
              case "value":
                r = E;
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
                Je(e, n, v, E, i, null);
            }
        Kh(e, r, u, d);
        return;
      case "option":
        for (M in i)
          if (i.hasOwnProperty(M) && (r = i[M], r != null))
            switch (M) {
              case "selected":
                e.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                Je(e, n, M, r, i, null);
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
        for (k in i)
          if (i.hasOwnProperty(k) && (r = i[k], r != null))
            switch (k) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, n));
              default:
                Je(e, n, k, r, i, null);
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
    for (E in i)
      i.hasOwnProperty(E) && (r = i[E], r != null && Je(e, n, E, r, i, null));
  }
  function CE(e, n, i, r) {
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
        var u = null, d = null, v = null, E = null, M = null, k = null, Q = null;
        for ($ in i) {
          var ee = i[$];
          if (i.hasOwnProperty($) && ee != null)
            switch ($) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                M = ee;
              default:
                r.hasOwnProperty($) || Je(e, n, $, null, r, ee);
            }
        }
        for (var Y in r) {
          var $ = r[Y];
          if (ee = i[Y], r.hasOwnProperty(Y) && ($ != null || ee != null))
            switch (Y) {
              case "type":
                d = $;
                break;
              case "name":
                u = $;
                break;
              case "checked":
                k = $;
                break;
              case "defaultChecked":
                Q = $;
                break;
              case "value":
                v = $;
                break;
              case "defaultValue":
                E = $;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if ($ != null)
                  throw Error(s(137, n));
                break;
              default:
                $ !== ee && Je(
                  e,
                  n,
                  Y,
                  $,
                  r,
                  ee
                );
            }
        }
        Ou(
          e,
          v,
          E,
          M,
          k,
          Q,
          d,
          u
        );
        return;
      case "select":
        $ = v = E = Y = null;
        for (d in i)
          if (M = i[d], i.hasOwnProperty(d) && M != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                $ = M;
              default:
                r.hasOwnProperty(d) || Je(
                  e,
                  n,
                  d,
                  null,
                  r,
                  M
                );
            }
        for (u in r)
          if (d = r[u], M = i[u], r.hasOwnProperty(u) && (d != null || M != null))
            switch (u) {
              case "value":
                Y = d;
                break;
              case "defaultValue":
                E = d;
                break;
              case "multiple":
                v = d;
              default:
                d !== M && Je(
                  e,
                  n,
                  u,
                  d,
                  r,
                  M
                );
            }
        n = E, i = v, r = $, Y != null ? Ji(e, !!i, Y, !1) : !!r != !!i && (n != null ? Ji(e, !!i, n, !0) : Ji(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        $ = Y = null;
        for (E in i)
          if (u = i[E], i.hasOwnProperty(E) && u != null && !r.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                Je(e, n, E, null, r, u);
            }
        for (v in r)
          if (u = r[v], d = i[v], r.hasOwnProperty(v) && (u != null || d != null))
            switch (v) {
              case "value":
                Y = u;
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
        Ih(e, Y, $);
        return;
      case "option":
        for (var me in i)
          if (Y = i[me], i.hasOwnProperty(me) && Y != null && !r.hasOwnProperty(me))
            switch (me) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Je(
                  e,
                  n,
                  me,
                  null,
                  r,
                  Y
                );
            }
        for (M in r)
          if (Y = r[M], $ = i[M], r.hasOwnProperty(M) && Y !== $ && (Y != null || $ != null))
            switch (M) {
              case "selected":
                e.selected = Y && typeof Y != "function" && typeof Y != "symbol";
                break;
              default:
                Je(
                  e,
                  n,
                  M,
                  Y,
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
          Y = i[Ce], i.hasOwnProperty(Ce) && Y != null && !r.hasOwnProperty(Ce) && Je(e, n, Ce, null, r, Y);
        for (k in r)
          if (Y = r[k], $ = i[k], r.hasOwnProperty(k) && Y !== $ && (Y != null || $ != null))
            switch (k) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null)
                  throw Error(s(137, n));
                break;
              default:
                Je(
                  e,
                  n,
                  k,
                  Y,
                  r,
                  $
                );
            }
        return;
      default:
        if (Uu(n)) {
          for (var We in i)
            Y = i[We], i.hasOwnProperty(We) && Y !== void 0 && !r.hasOwnProperty(We) && Tf(
              e,
              n,
              We,
              void 0,
              r,
              Y
            );
          for (Q in r)
            Y = r[Q], $ = i[Q], !r.hasOwnProperty(Q) || Y === $ || Y === void 0 && $ === void 0 || Tf(
              e,
              n,
              Q,
              Y,
              r,
              $
            );
          return;
        }
    }
    for (var V in i)
      Y = i[V], i.hasOwnProperty(V) && Y != null && !r.hasOwnProperty(V) && Je(e, n, V, null, r, Y);
    for (ee in r)
      Y = r[ee], $ = i[ee], !r.hasOwnProperty(ee) || Y === $ || Y == null && $ == null || Je(e, n, ee, Y, r, $);
  }
  function Jy(e) {
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
  function ME() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, i = performance.getEntriesByType("resource"), r = 0; r < i.length; r++) {
        var u = i[r], d = u.transferSize, v = u.initiatorType, E = u.duration;
        if (d && E && Jy(v)) {
          for (v = 0, E = u.responseEnd, r += 1; r < i.length; r++) {
            var M = i[r], k = M.startTime;
            if (k > E) break;
            var Q = M.transferSize, ee = M.initiatorType;
            Q && Jy(ee) && (M = M.responseEnd, v += Q * (M < E ? 1 : (E - k) / (M - k)));
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
  function Wy(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function eg(e, n) {
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
  function AE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Mf ? !1 : (Mf = e, !0) : (Mf = null, !1);
  }
  var tg = typeof setTimeout == "function" ? setTimeout : void 0, jE = typeof clearTimeout == "function" ? clearTimeout : void 0, ng = typeof Promise == "function" ? Promise : void 0, DE = typeof queueMicrotask == "function" ? queueMicrotask : typeof ng < "u" ? function(e) {
    return ng.resolve(null).then(e).catch(NE);
  } : tg;
  function NE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Qa(e) {
    return e === "head";
  }
  function ag(e, n) {
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
            var v = d.nextSibling, E = d.nodeName;
            d[Ne] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = v;
          }
        } else
          i === "body" && Dr(e.ownerDocument.body);
      i = u;
    } while (i);
    Dl(n);
  }
  function ig(e, n) {
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
  function zE(e, n, i, r) {
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
  function _E(e, n, i) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = En(e.nextSibling), e === null)) return null;
    return e;
  }
  function lg(e, n) {
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
  function OE(e, n) {
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
  function rg(e) {
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
  function sg(e) {
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
  function og(e, n, i) {
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
  var Tn = /* @__PURE__ */ new Map(), ug = /* @__PURE__ */ new Set();
  function So(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Sa = J.d;
  J.d = {
    f: LE,
    r: UE,
    D: VE,
    C: BE,
    L: HE,
    m: qE,
    X: PE,
    S: kE,
    M: YE
  };
  function LE() {
    var e = Sa.f(), n = fo();
    return e || n;
  }
  function UE(e) {
    var n = ct(e);
    n !== null && n.tag === 5 && n.type === "form" ? Cp(n) : Sa.r(e);
  }
  var Ml = typeof document > "u" ? null : document;
  function cg(e, n, i) {
    var r = Ml;
    if (r && typeof n == "string" && n) {
      var u = pn(n);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), ug.has(u) || (ug.add(u), e = { rel: e, crossOrigin: i, href: n }, r.querySelector(u) === null && (n = r.createElement("link"), Ut(n, "link", e), at(n), r.head.appendChild(n)));
    }
  }
  function VE(e) {
    Sa.D(e), cg("dns-prefetch", e, null);
  }
  function BE(e, n) {
    Sa.C(e, n), cg("preconnect", e, n);
  }
  function HE(e, n, i) {
    Sa.L(e, n, i);
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
  function qE(e, n) {
    Sa.m(e, n);
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
  function kE(e, n, i) {
    Sa.S(e, n, i);
    var r = Ml;
    if (r && e) {
      var u = St(r).hoistableStyles, d = Al(e);
      n = n || "default";
      var v = u.get(d);
      if (!v) {
        var E = { loading: 0, preload: null };
        if (v = r.querySelector(
          Nr(d)
        ))
          E.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": n },
            i
          ), (i = Tn.get(d)) && zf(e, i);
          var M = v = r.createElement("link");
          at(M), Ut(M, "link", e), M._p = new Promise(function(k, Q) {
            M.onload = k, M.onerror = Q;
          }), M.addEventListener("load", function() {
            E.loading |= 1;
          }), M.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, Eo(v, n, r);
        }
        v = {
          type: "stylesheet",
          instance: v,
          count: 1,
          state: E
        }, u.set(d, v);
      }
    }
  }
  function PE(e, n) {
    Sa.X(e, n);
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
  function YE(e, n) {
    Sa.M(e, n);
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
  function fg(e, n, i, r) {
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
          }, Tn.set(e, i), d || GE(
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
  function dg(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function GE(e, n, i, r) {
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
  function hg(e, n, i) {
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
          r = dg(i), (u = Tn.get(u)) && zf(r, u), d = (e.ownerDocument || e).createElement("link"), at(d);
          var v = d;
          return v._p = new Promise(function(E, M) {
            v.onload = E, v.onerror = M;
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
      var E = r[v];
      if (E.dataset.precedence === n) d = E;
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
  function mg(e, n, i) {
    if (To === null) {
      var r = /* @__PURE__ */ new Map(), u = To = /* @__PURE__ */ new Map();
      u.set(i, r);
    } else
      u = To, r = u.get(i), r || (r = /* @__PURE__ */ new Map(), u.set(i, r));
    if (r.has(e)) return r;
    for (r.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var d = i[u];
      if (!(d[Ne] || d[fe] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var v = d.getAttribute(n) || "";
        v = e + v;
        var E = r.get(v);
        E ? E.push(d) : r.set(v, [d]);
      }
    }
    return r;
  }
  function pg(e, n, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function FE(e, n, i) {
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
  function yg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function $E(e, n, i, r) {
    if (i.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Al(r.href), d = n.querySelector(
          Nr(u)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = wo.bind(e), n.then(e, e)), i.state.loading |= 4, i.instance = d, at(d);
          return;
        }
        d = n.ownerDocument || n, r = dg(r), (u = Tn.get(u)) && zf(r, u), d = d.createElement("link"), at(d);
        var v = d;
        v._p = new Promise(function(E, M) {
          v.onload = E, v.onerror = M;
        }), Ut(d, "link", r), i.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = wo.bind(e), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Of = 0;
  function XE(e, n) {
    return e.stylesheets && e.count === 0 && Co(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var r = setTimeout(function() {
        if (e.stylesheets && Co(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Of === 0 && (Of = 62500 * ME());
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ro = /* @__PURE__ */ new Map(), n.forEach(IE, e), Ro = null, wo.call(e));
  }
  function IE(e, n) {
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
    $$typeof: O,
    Provider: null,
    Consumer: null,
    _currentValue: re,
    _currentValue2: re,
    _threadCount: 0
  };
  function KE(e, n, i, r, u, d, v, E, M) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Na(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Na(0), this.hiddenUpdates = Na(null), this.identifierPrefix = r, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = v, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = M, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function gg(e, n, i, r, u, d, v, E, M, k, Q, ee) {
    return e = new KE(
      e,
      n,
      i,
      v,
      M,
      k,
      Q,
      ee,
      E
    ), n = 1, d === !0 && (n |= 24), d = rn(3, null, null, n), e.current = d, d.stateNode = e, n = dc(), n.refCount++, e.pooledCache = n, n.refCount++, d.memoizedState = {
      element: r,
      isDehydrated: i,
      cache: n
    }, yc(d), e;
  }
  function vg(e) {
    return e ? (e = rl, e) : rl;
  }
  function bg(e, n, i, r, u, d) {
    u = vg(u), r.context === null ? r.context = u : r.pendingContext = u, r = Ha(n), r.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (r.callback = d), i = qa(e, r, n), i !== null && (en(i, e, n), fr(i, e, n));
  }
  function xg(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Lf(e, n) {
    xg(e, n), (e = e.alternate) && xg(e, n);
  }
  function Sg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = xi(e, 67108864);
      n !== null && en(n, e, 67108864), Lf(e, 67108864);
    }
  }
  function Eg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = fn();
      n = U(n);
      var i = xi(e, n);
      i !== null && en(i, e, n), Lf(e, n);
    }
  }
  var Mo = !0;
  function QE(e, n, i, r) {
    var u = N.T;
    N.T = null;
    var d = J.p;
    try {
      J.p = 2, Uf(e, n, i, r);
    } finally {
      J.p = d, N.T = u;
    }
  }
  function ZE(e, n, i, r) {
    var u = N.T;
    N.T = null;
    var d = J.p;
    try {
      J.p = 8, Uf(e, n, i, r);
    } finally {
      J.p = d, N.T = u;
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
        ), wg(e, r);
      else if (WE(
        u,
        e,
        n,
        i,
        r
      ))
        r.stopPropagation();
      else if (wg(e, r), n & 4 && -1 < JE.indexOf(e)) {
        for (; u !== null; ) {
          var d = ct(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var v = zn(d.pendingLanes);
                  if (v !== 0) {
                    var E = d;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; v; ) {
                      var M = 1 << 31 - qt(v);
                      E.entanglements[1] |= M, v &= ~M;
                    }
                    In(d), (Ge & 6) === 0 && (uo = Gt() + 500, Mr(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = xi(d, 2), E !== null && en(E, d, 2), fo(), Lf(d, 2);
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
  function Tg(e) {
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
        switch (na()) {
          case Aa:
            return 2;
          case Il:
            return 8;
          case ja:
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
  var Hf = !1, Za = null, Ja = null, Wa = null, Or = /* @__PURE__ */ new Map(), Lr = /* @__PURE__ */ new Map(), ei = [], JE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function wg(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Za = null;
        break;
      case "dragenter":
      case "dragleave":
        Ja = null;
        break;
      case "mouseover":
      case "mouseout":
        Wa = null;
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
    }, n !== null && (n = ct(n), n !== null && Sg(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), e);
  }
  function WE(e, n, i, r, u) {
    switch (n) {
      case "focusin":
        return Za = Ur(
          Za,
          e,
          n,
          i,
          r,
          u
        ), !0;
      case "dragenter":
        return Ja = Ur(
          Ja,
          e,
          n,
          i,
          r,
          u
        ), !0;
      case "mouseover":
        return Wa = Ur(
          Wa,
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
  function Rg(e) {
    var n = Qe(e.target);
    if (n !== null) {
      var i = c(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = f(i), n !== null) {
            e.blockedOn = n, oe(e.priority, function() {
              Eg(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            e.blockedOn = n, oe(e.priority, function() {
              Eg(i);
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
        return n = ct(i), n !== null && Sg(n), e.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function Cg(e, n, i) {
    jo(e) && i.delete(n);
  }
  function eT() {
    Hf = !1, Za !== null && jo(Za) && (Za = null), Ja !== null && jo(Ja) && (Ja = null), Wa !== null && jo(Wa) && (Wa = null), Or.forEach(Cg), Lr.forEach(Cg);
  }
  function Do(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Hf || (Hf = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      eT
    )));
  }
  var No = null;
  function Mg(e) {
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
    function n(M) {
      return Do(M, e);
    }
    Za !== null && Do(Za, e), Ja !== null && Do(Ja, e), Wa !== null && Do(Wa, e), Or.forEach(n), Lr.forEach(n);
    for (var i = 0; i < ei.length; i++) {
      var r = ei[i];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < ei.length && (i = ei[0], i.blockedOn === null); )
      Rg(i), i.blockedOn === null && ei.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (r = 0; r < i.length; r += 3) {
        var u = i[r], d = i[r + 1], v = u[de] || null;
        if (typeof d == "function")
          v || Mg(i);
        else if (v) {
          var E = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, v = d[de] || null)
              E = v.formAction;
            else if (Bf(u) !== null) continue;
          } else E = v.action;
          typeof E == "function" ? i[r + 1] = E : (i.splice(r, 3), r -= 3), Mg(i);
        }
      }
  }
  function Ag() {
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
  function qf(e) {
    this._internalRoot = e;
  }
  zo.prototype.render = qf.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(s(409));
    var i = n.current, r = fn();
    bg(i, r, e, n, null, null);
  }, zo.prototype.unmount = qf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      bg(e.current, 2, null, e, null, null), fo(), n[ge] = null;
    }
  };
  function zo(e) {
    this._internalRoot = e;
  }
  zo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ae();
      e = { blockedOn: null, target: e, priority: n };
      for (var i = 0; i < ei.length && n !== 0 && n < ei[i].priority; i++) ;
      ei.splice(i, 0, e), i === 0 && Rg(e);
    }
  };
  var jg = a.version;
  if (jg !== "19.2.5")
    throw Error(
      s(
        527,
        jg,
        "19.2.5"
      )
    );
  J.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = m(n), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var tT = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: N,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var _o = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!_o.isDisabled && _o.supportsFiber)
      try {
        aa = _o.inject(
          tT
        ), Ft = _o;
      } catch {
      }
  }
  return Br.createRoot = function(e, n) {
    if (!o(e)) throw Error(s(299));
    var i = !1, r = "", u = Up, d = Vp, v = Bp;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (v = n.onRecoverableError)), n = gg(
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
      Ag
    ), e[ge] = n.current, Sf(e), new qf(n);
  }, Br.hydrateRoot = function(e, n, i) {
    if (!o(e)) throw Error(s(299));
    var r = !1, u = "", d = Up, v = Vp, E = Bp, M = null;
    return i != null && (i.unstable_strictMode === !0 && (r = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (v = i.onCaughtError), i.onRecoverableError !== void 0 && (E = i.onRecoverableError), i.formState !== void 0 && (M = i.formState)), n = gg(
      e,
      1,
      !0,
      n,
      i ?? null,
      r,
      u,
      M,
      d,
      v,
      E,
      Ag
    ), n.context = vg(null), i = n.current, r = fn(), r = U(r), u = Ha(r), u.callback = null, qa(i, u, r), i = r, n.current.lanes = i, Pn(n, i), In(n), e[ge] = n.current, Sf(e), new zo(n);
  }, Br.version = "19.2.5", Br;
}
var Hg;
function pT() {
  if (Hg) return Yf.exports;
  Hg = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Yf.exports = mT(), Yf.exports;
}
var yT = pT();
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
var db = (t) => {
  throw TypeError(t);
}, gT = (t, a, l) => a.has(t) || db("Cannot " + l), Xf = (t, a, l) => (gT(t, a, "read from private field"), l ? l.call(t) : a.get(t)), vT = (t, a, l) => a.has(t) ? db("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, l);
function qg(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function bT(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: l, v5Compat: s = !1 } = t, o;
  o = a.map(
    (T, w) => y(
      T,
      typeof T == "string" ? null : T.state,
      w === 0 ? "default" : void 0,
      typeof T == "string" ? void 0 : T.unstable_mask
    )
  );
  let c = p(
    l ?? o.length - 1
  ), f = "POP", h = null;
  function p(T) {
    return Math.min(Math.max(T, 0), o.length - 1);
  }
  function m() {
    return o[c];
  }
  function y(T, w = null, C, D) {
    let _ = Rd(
      o ? m().pathname : "/",
      T,
      w,
      C,
      D
    );
    return xt(
      _.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        T
      )}`
    ), _;
  }
  function b(T) {
    return typeof T == "string" ? T : Jn(T);
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
    createURL(T) {
      return new URL(b(T), "http://localhost");
    },
    encodeLocation(T) {
      let w = typeof T == "string" ? qn(T) : T;
      return {
        pathname: w.pathname || "",
        search: w.search || "",
        hash: w.hash || ""
      };
    },
    push(T, w) {
      f = "PUSH";
      let C = qg(T) ? T : y(T, w);
      c += 1, o.splice(c, o.length, C), s && h && h({ action: f, location: C, delta: 1 });
    },
    replace(T, w) {
      f = "REPLACE";
      let C = qg(T) ? T : y(T, w);
      o[c] = C, s && h && h({ action: f, location: C, delta: 0 });
    },
    go(T) {
      f = "POP";
      let w = p(c + T), C = o[w];
      c = w, h && h({ action: f, location: C, delta: T });
    },
    listen(T) {
      return h = T, () => {
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
function xT() {
  return Math.random().toString(36).substring(2, 10);
}
function Rd(t, a, l = null, s, o) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? qn(a) : a,
    state: l,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || xT(),
    unstable_mask: o
  };
}
function Jn({
  pathname: t = "/",
  search: a = "",
  hash: l = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), l && l !== "#" && (t += l.charAt(0) === "#" ? l : "#" + l), t;
}
function qn(t) {
  let a = {};
  if (t) {
    let l = t.indexOf("#");
    l >= 0 && (a.hash = t.substring(l), t = t.substring(0, l));
    let s = t.indexOf("?");
    s >= 0 && (a.search = t.substring(s), t = t.substring(0, s)), t && (a.pathname = t);
  }
  return a;
}
function ST(t, a = !1) {
  let l = "http://localhost";
  typeof window < "u" && (l = window.location.origin !== "null" ? window.location.origin : window.location.href), _e(l, "No window.location.(origin|href) available to create URL");
  let s = typeof t == "string" ? t : Jn(t);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var Fr, kg = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (vT(this, Fr, /* @__PURE__ */ new Map()), t)
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
    if (Xf(this, Fr).has(t))
      return Xf(this, Fr).get(t);
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
    Xf(this, Fr).set(t, a);
  }
};
Fr = /* @__PURE__ */ new WeakMap();
var ET = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function TT(t) {
  return ET.has(
    t
  );
}
var wT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function RT(t) {
  return wT.has(
    t
  );
}
function CT(t) {
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
    ), CT(c)) {
      let m = {
        ...c,
        id: p
      };
      return s[p] = Pg(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...c,
        id: p,
        children: void 0
      };
      return s[p] = Pg(
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
function Pg(t, a) {
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
function li(t, a, l = "/") {
  return $r(t, a, l, !1);
}
function $r(t, a, l, s) {
  let o = typeof a == "string" ? qn(a) : a, c = jn(o.pathname || "/", l);
  if (c == null)
    return null;
  let f = hb(t);
  AT(f);
  let h = null;
  for (let p = 0; h == null && p < f.length; ++p) {
    let m = HT(c);
    h = VT(
      f[p],
      m,
      s
    );
  }
  return h;
}
function MT(t, a) {
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
function hb(t, a = [], l = [], s = "", o = !1) {
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
    ), hb(
      f.children,
      a,
      x,
      b,
      p
    )), !(f.path == null && !f.index) && a.push({
      path: b,
      score: LT(b, f.index),
      routesMeta: x
    });
  };
  return t.forEach((f, h) => {
    if (f.path === "" || !f.path?.includes("?"))
      c(f, h);
    else
      for (let p of mb(f.path))
        c(f, h, !0, p);
  }), a;
}
function mb(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [l, ...s] = a, o = l.endsWith("?"), c = l.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let f = mb(s.join("/")), h = [];
  return h.push(
    ...f.map(
      (p) => p === "" ? c : [c, p].join("/")
    )
  ), o && h.push(...f), h.map(
    (p) => t.startsWith("/") && p === "" ? "/" : p
  );
}
function AT(t) {
  t.sort(
    (a, l) => a.score !== l.score ? l.score - a.score : UT(
      a.routesMeta.map((s) => s.childrenIndex),
      l.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var jT = /^:[\w-]+$/, DT = 3, NT = 2, zT = 1, _T = 10, OT = -2, Yg = (t) => t === "*";
function LT(t, a) {
  let l = t.split("/"), s = l.length;
  return l.some(Yg) && (s += OT), a && (s += NT), l.filter((o) => !Yg(o)).reduce(
    (o, c) => o + (jT.test(c) ? DT : c === "" ? zT : _T),
    s
  );
}
function UT(t, a) {
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
function VT(t, a, l = !1) {
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
      pathnameBase: PT(
        Mn([c, b.pathnameBase])
      ),
      route: x
    }), b.pathnameBase !== "/" && (c = Mn([c, b.pathnameBase]));
  }
  return f;
}
function lu(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [l, s] = BT(
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
        const T = h[x];
        return b && !T ? m[y] = void 0 : m[y] = (T || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: c,
    pathnameBase: f,
    pattern: t
  };
}
function BT(t, a = !1, l = !0) {
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
function HT(t) {
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
function qT({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Mn([t, a]);
}
var pb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, nh = (t) => pb.test(t);
function kT(t, a = "/") {
  let {
    pathname: l,
    search: s = "",
    hash: o = ""
  } = typeof t == "string" ? qn(t) : t, c;
  return l ? (l = ih(l), l.startsWith("/") ? c = Gg(l.substring(1), "/") : c = Gg(l, a)) : c = a, {
    pathname: c,
    search: YT(s),
    hash: GT(o)
  };
}
function Gg(t, a) {
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
function yb(t) {
  return t.filter(
    (a, l) => l === 0 || a.route.path && a.route.path.length > 0
  );
}
function ah(t) {
  let a = yb(t);
  return a.map(
    (l, s) => s === a.length - 1 ? l.pathname : l.pathnameBase
  );
}
function vu(t, a, l, s = !1) {
  let o;
  typeof t == "string" ? o = qn(t) : (o = { ...t }, _e(
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
  let p = kT(o, h), m = f && f !== "/" && f.endsWith("/"), y = (c || f === ".") && l.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var ih = (t) => t.replace(/\/\/+/g, "/"), Mn = (t) => ih(t.join("/")), ru = (t) => t.replace(/\/+$/, ""), PT = (t) => ru(t).replace(/^\/*/, "/"), YT = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, GT = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, FT = (t, a = 302) => {
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
var gb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function vb(t, a) {
  let l = t;
  if (typeof l != "string" || !pb.test(l))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: l
    };
  let s = l, o = !1;
  if (gb)
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
var si = Symbol("Uninstrumented");
function $T(t, a) {
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
      let f = c[si] ?? c, h = Ol(
        l[o],
        f,
        (...p) => Fg(p[0])
      );
      h && (o === "loader" && f.hydrate === !0 && (h.hydrate = !0), h[si] = f, s[o] = h);
    }
  }), a.middleware && a.middleware.length > 0 && l.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[si] ?? o, f = Ol(
      l.middleware,
      c,
      (...h) => Fg(h[0])
    );
    return f ? (f[si] = c, f) : o;
  })), s;
}
function XT(t, a) {
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
    let s = t.navigate[si] ?? t.navigate, o = Ol(
      l.navigate,
      s,
      (...c) => {
        let [f, h] = c;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? Jn(f) : ".",
          ...$g(t, h ?? {})
        };
      }
    );
    o && (o[si] = s, t.navigate = o);
  }
  if (l.fetch.length > 0) {
    let s = t.fetch[si] ?? t.fetch, o = Ol(l.fetch, s, (...c) => {
      let [f, , h, p] = c;
      return {
        href: h ?? ".",
        fetcherKey: f,
        ...$g(t, p ?? {})
      };
    });
    o && (o[si] = s, t.fetch = o);
  }
  return t;
}
function Ol(t, a, l) {
  return t.length === 0 ? null : async (...s) => {
    let o = await bb(
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
async function bb(t, a, l, s) {
  let o = t[s], c;
  if (o) {
    let f, h = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = bb(t, a, l, s - 1), c = await f, _e(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
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
    request: IT(a),
    params: { ...s },
    unstable_pattern: o,
    context: KT(l)
  };
}
function $g(t, a) {
  return {
    currentUrl: Jn(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function IT(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function KT(t) {
  if (ZT(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var QT = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function ZT(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === QT;
}
var xb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], JT = new Set(
  xb
), WT = [
  "GET",
  ...xb
], ew = new Set(WT), Sb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), tw = /* @__PURE__ */ new Set([307, 308]), Kf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, nw = {
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
}, aw = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), Eb = "remix-router-transitions", Tb = Symbol("ResetLoaderData");
function iw(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, l = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  _e(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = t.hydrationRouteProperties || [], o = t.mapRouteProperties || aw, c = o;
  if (t.unstable_instrumentations) {
    let A = t.unstable_instrumentations;
    c = (U) => ({
      ...o(U),
      ...$T(
        A.map((P) => P.route).filter(Boolean),
        U
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
  let y = t.dataStrategy || uw, b = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, x = null, T = /* @__PURE__ */ new Set(), w = null, C = null, D = null, _ = t.hydrationData != null, L = li(h, t.history.location, m), O = !1, B = null, F, ne;
  if (L == null && !t.patchRoutesOnNavigation) {
    let A = wn(404, {
      pathname: t.history.location.pathname
    }), { matches: U, route: P } = Oo(h);
    F = !0, ne = !F, L = U, B = { [P.id]: A };
  } else if (L && !t.hydrationData && Na(
    L,
    h,
    t.history.location.pathname
  ).active && (L = null), L)
    if (L.some((A) => A.route.lazy))
      F = !1, ne = !F;
    else if (!L.some((A) => lh(A.route)))
      F = !0, ne = !F;
    else {
      let A = t.hydrationData ? t.hydrationData.loaderData : null, U = t.hydrationData ? t.hydrationData.errors : null, P = L;
      if (U) {
        let ae = L.findIndex(
          (oe) => U[oe.route.id] !== void 0
        );
        P = P.slice(0, ae + 1);
      }
      ne = !1, F = !0, P.forEach((ae) => {
        let oe = wb(ae.route, A, U);
        ne = ne || oe.renderFallback, F = F && !oe.shouldLoad;
      });
    }
  else {
    F = !1, ne = !F, L = [];
    let A = Na(
      null,
      h,
      t.history.location.pathname
    );
    A.active && A.matches && (O = !0, L = A.matches);
  }
  let te, R = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: L,
    initialized: F,
    renderFallback: ne,
    navigation: Kf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || B,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, H = "POP", K = null, ie = !1, X, le = !1, G = /* @__PURE__ */ new Map(), Z = null, N = !1, J = !1, re = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), Te = 0, j = -1, I = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Set(), ue = /* @__PURE__ */ new Map(), Se = /* @__PURE__ */ new Map(), Re = /* @__PURE__ */ new Set(), De = /* @__PURE__ */ new Map(), ht, $e = null;
  function ea() {
    if (x = t.history.listen(
      ({ action: A, location: U, delta: P }) => {
        if (ht) {
          ht(), ht = void 0;
          return;
        }
        xt(
          De.size === 0 || P != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ae = mi({
          currentLocation: R.location,
          nextLocation: U,
          historyAction: A
        });
        if (ae && P != null) {
          let oe = new Promise((pe) => {
            ht = pe;
          });
          t.history.go(P * -1), ia(ae, {
            state: "blocked",
            location: U,
            proceed() {
              ia(ae, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: U
              }), oe.then(() => t.history.go(P));
            },
            reset() {
              let pe = new Map(R.blockers);
              pe.set(ae, Hr), yt({ blockers: pe });
            }
          }), K?.resolve(), K = null;
          return;
        }
        return be(A, U);
      }
    ), l) {
      Mw(a, G);
      let A = () => Aw(a, G);
      a.addEventListener("pagehide", A), Z = () => a.removeEventListener("pagehide", A);
    }
    return R.initialized || be("POP", R.location, {
      initialHydration: !0
    }), te;
  }
  function Ca() {
    x && x(), Z && Z(), T.clear(), X && X.abort(), R.fetchers.forEach((A, U) => aa(U)), R.blockers.forEach((A, U) => hi(U));
  }
  function kn(A) {
    return T.add(A), () => T.delete(A);
  }
  function yt(A, U = {}) {
    A.matches && (A.matches = A.matches.map((oe) => {
      let pe = f[oe.route.id], fe = oe.route;
      return fe.element !== pe.element || fe.errorElement !== pe.errorElement || fe.hydrateFallbackElement !== pe.hydrateFallbackElement ? {
        ...oe,
        route: pe
      } : oe;
    })), R = {
      ...R,
      ...A
    };
    let P = [], ae = [];
    R.fetchers.forEach((oe, pe) => {
      oe.state === "idle" && (Re.has(pe) ? P.push(pe) : ae.push(pe));
    }), Re.forEach((oe) => {
      !R.fetchers.has(oe) && !ce.has(oe) && P.push(oe);
    }), [...T].forEach(
      (oe) => oe(R, {
        deletedFetchers: P,
        newErrors: A.errors ?? null,
        viewTransitionOpts: U.viewTransitionOpts,
        flushSync: U.flushSync === !0
      })
    ), P.forEach((oe) => aa(oe)), ae.forEach((oe) => R.fetchers.delete(oe));
  }
  function Ht(A, U, { flushSync: P } = {}) {
    let ae = R.actionData != null && R.navigation.formMethod != null && Yt(R.navigation.formMethod) && R.navigation.state === "loading" && A.state?._isRedirect !== !0, oe;
    U.actionData ? Object.keys(U.actionData).length > 0 ? oe = U.actionData : oe = null : ae ? oe = R.actionData : oe = null;
    let pe = U.loaderData ? av(
      R.loaderData,
      U.loaderData,
      U.matches || [],
      U.errors
    ) : R.loaderData, fe = R.blockers;
    fe.size > 0 && (fe = new Map(fe), fe.forEach((we, xe) => fe.set(xe, Hr)));
    let de = N ? !1 : Kl(A, U.matches || R.matches), ge = ie === !0 || R.navigation.formMethod != null && Yt(R.navigation.formMethod) && A.state?._isRedirect !== !0;
    p && (h = p, p = void 0), N || H === "POP" || (H === "PUSH" ? t.history.push(A, A.state) : H === "REPLACE" && t.history.replace(A, A.state));
    let he;
    if (H === "POP") {
      let we = G.get(R.location.pathname);
      we && we.has(A.pathname) ? he = {
        currentLocation: R.location,
        nextLocation: A
      } : G.has(A.pathname) && (he = {
        currentLocation: A,
        nextLocation: R.location
      });
    } else if (le) {
      let we = G.get(R.location.pathname);
      we ? we.add(A.pathname) : (we = /* @__PURE__ */ new Set([A.pathname]), G.set(R.location.pathname, we)), he = {
        currentLocation: R.location,
        nextLocation: A
      };
    }
    yt(
      {
        ...U,
        // matches, errors, fetchers go through as-is
        actionData: oe,
        loaderData: pe,
        historyAction: H,
        location: A,
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
        flushSync: P === !0
      }
    ), H = "POP", ie = !1, le = !1, N = !1, J = !1, K?.resolve(), K = null, $e?.resolve(), $e = null;
  }
  async function Ma(A, U) {
    if (K?.resolve(), K = null, typeof A == "number") {
      K || (K = sv());
      let et = K.promise;
      return t.history.go(A), et;
    }
    let P = Cd(
      R.location,
      R.matches,
      m,
      A,
      U?.fromRouteId,
      U?.relative
    ), { path: ae, submission: oe, error: pe } = Xg(
      !1,
      P,
      U
    ), fe;
    U?.unstable_mask && (fe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof U.unstable_mask == "string" ? qn(U.unstable_mask) : {
        ...R.location.unstable_mask,
        ...U.unstable_mask
      }
    });
    let de = R.location, ge = Rd(
      de,
      ae,
      U && U.state,
      void 0,
      fe
    );
    ge = {
      ...ge,
      ...t.history.encodeLocation(ge)
    };
    let he = U && U.replace != null ? U.replace : void 0, we = "PUSH";
    he === !0 ? we = "REPLACE" : he === !1 || oe != null && Yt(oe.formMethod) && oe.formAction === R.location.pathname + R.location.search && (we = "REPLACE");
    let xe = U && "preventScrollReset" in U ? U.preventScrollReset === !0 : void 0, ke = (U && U.flushSync) === !0, Ne = mi({
      currentLocation: de,
      nextLocation: ge,
      historyAction: we
    });
    if (Ne) {
      ia(Ne, {
        state: "blocked",
        location: ge,
        proceed() {
          ia(Ne, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ge
          }), Ma(A, U);
        },
        reset() {
          let et = new Map(R.blockers);
          et.set(Ne, Hr), yt({ blockers: et });
        }
      });
      return;
    }
    await be(we, ge, {
      submission: oe,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: pe,
      preventScrollReset: xe,
      replace: U && U.replace,
      enableViewTransition: U && U.viewTransition,
      flushSync: ke,
      callSiteDefaultShouldRevalidate: U && U.unstable_defaultShouldRevalidate
    });
  }
  function di() {
    $e || ($e = sv()), ja(), yt({ revalidation: "loading" });
    let A = $e.promise;
    return R.navigation.state === "submitting" ? A : R.navigation.state === "idle" ? (be(R.historyAction, R.location, {
      startUninterruptedRevalidation: !0
    }), A) : (be(
      H || R.historyAction,
      R.navigation.location,
      {
        overrideNavigation: R.navigation,
        // Proxy through any rending view transition
        enableViewTransition: le === !0
      }
    ), A);
  }
  async function be(A, U, P) {
    X && X.abort(), X = null, H = A, N = (P && P.startUninterruptedRevalidation) === !0, _u(R.location, R.matches), ie = (P && P.preventScrollReset) === !0, le = (P && P.enableViewTransition) === !0;
    let ae = p || h, oe = P && P.overrideNavigation, pe = P?.initialHydration && R.matches && R.matches.length > 0 && !O ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      R.matches
    ) : li(ae, U, m), fe = (P && P.flushSync) === !0;
    if (pe && R.initialized && !J && gw(R.location, U) && !(P && P.submission && Yt(P.submission.formMethod))) {
      Ht(U, { matches: pe }, { flushSync: fe });
      return;
    }
    let de = Na(pe, ae, U.pathname);
    if (de.active && de.matches && (pe = de.matches), !pe) {
      let { error: Qe, notFoundMatches: ct, route: Le } = zn(
        U.pathname
      );
      Ht(
        U,
        {
          matches: ct,
          loaderData: {},
          errors: {
            [Le.id]: Qe
          }
        },
        { flushSync: fe }
      );
      return;
    }
    X = new AbortController();
    let ge = zl(
      t.history,
      U,
      X.signal,
      P && P.submission
    ), he = t.getContext ? await t.getContext() : new kg(), we;
    if (P && P.pendingError)
      we = [
        ri(pe).route.id,
        { type: "error", error: P.pendingError }
      ];
    else if (P && P.submission && Yt(P.submission.formMethod)) {
      let Qe = await Oe(
        ge,
        U,
        P.submission,
        pe,
        he,
        de.active,
        P && P.initialHydration === !0,
        { replace: P.replace, flushSync: fe }
      );
      if (Qe.shortCircuited)
        return;
      if (Qe.pendingActionResult) {
        let [ct, Le] = Qe.pendingActionResult;
        if (dn(Le) && es(Le.error) && Le.error.status === 404) {
          X = null, Ht(U, {
            matches: Qe.matches,
            loaderData: {},
            errors: {
              [ct]: Le.error
            }
          });
          return;
        }
      }
      pe = Qe.matches || pe, we = Qe.pendingActionResult, oe = Qf(U, P.submission), fe = !1, de.active = !1, ge = zl(
        t.history,
        ge.url,
        ge.signal
      );
    }
    let {
      shortCircuited: xe,
      matches: ke,
      loaderData: Ne,
      errors: et
    } = await Fe(
      ge,
      U,
      pe,
      he,
      de.active,
      oe,
      P && P.submission,
      P && P.fetcherSubmission,
      P && P.replace,
      P && P.initialHydration === !0,
      fe,
      we,
      P && P.callSiteDefaultShouldRevalidate
    );
    xe || (X = null, Ht(U, {
      matches: ke || pe,
      ...iv(we),
      loaderData: Ne,
      errors: et
    }));
  }
  async function Oe(A, U, P, ae, oe, pe, fe, de = {}) {
    ja();
    let ge = Rw(U, P);
    if (yt({ navigation: ge }, { flushSync: de.flushSync === !0 }), pe) {
      let xe = await Pn(
        ae,
        U.pathname,
        A.signal
      );
      if (xe.type === "aborted")
        return { shortCircuited: !0 };
      if (xe.type === "error") {
        if (xe.partialMatches.length === 0) {
          let { matches: Ne, route: et } = Oo(h);
          return {
            matches: Ne,
            pendingActionResult: [
              et.id,
              {
                type: "error",
                error: xe.error
              }
            ]
          };
        }
        let ke = ri(xe.partialMatches).route.id;
        return {
          matches: xe.partialMatches,
          pendingActionResult: [
            ke,
            {
              type: "error",
              error: xe.error
            }
          ]
        };
      } else if (xe.matches)
        ae = xe.matches;
      else {
        let { notFoundMatches: ke, error: Ne, route: et } = zn(
          U.pathname
        );
        return {
          matches: ke,
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
    let he, we = Xo(ae, U);
    if (!we.route.action && !we.route.lazy)
      he = {
        type: "error",
        error: wn(405, {
          method: A.method,
          pathname: U.pathname,
          routeId: we.route.id
        })
      };
    else {
      let xe = Hl(
        c,
        f,
        A,
        U,
        ae,
        we,
        fe ? [] : s,
        oe
      ), ke = await Aa(
        A,
        U,
        xe,
        oe,
        null
      );
      if (he = ke[we.route.id], !he) {
        for (let Ne of ae)
          if (ke[Ne.route.id]) {
            he = ke[Ne.route.id];
            break;
          }
      }
      if (A.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Bi(he)) {
      let xe;
      return de && de.replace != null ? xe = de.replace : xe = ev(
        he.response.headers.get("Location"),
        new URL(A.url),
        m,
        t.history
      ) === R.location.pathname + R.location.search, await na(A, he, !0, {
        submission: P,
        replace: xe
      }), { shortCircuited: !0 };
    }
    if (dn(he)) {
      let xe = ri(ae, we.route.id);
      return (de && de.replace) !== !0 && (H = "PUSH"), {
        matches: ae,
        pendingActionResult: [
          xe.route.id,
          he,
          we.route.id
        ]
      };
    }
    return {
      matches: ae,
      pendingActionResult: [we.route.id, he]
    };
  }
  async function Fe(A, U, P, ae, oe, pe, fe, de, ge, he, we, xe, ke) {
    let Ne = pe || Qf(U, fe), et = fe || de || rv(Ne), Qe = !N && !he;
    if (oe) {
      if (Qe) {
        let gt = ut(xe);
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
        P,
        U.pathname,
        A.signal
      );
      if (ze.type === "aborted")
        return { shortCircuited: !0 };
      if (ze.type === "error") {
        if (ze.partialMatches.length === 0) {
          let { matches: kt, route: Et } = Oo(h);
          return {
            matches: kt,
            loaderData: {},
            errors: {
              [Et.id]: ze.error
            }
          };
        }
        let gt = ri(ze.partialMatches).route.id;
        return {
          matches: ze.partialMatches,
          loaderData: {},
          errors: {
            [gt]: ze.error
          }
        };
      } else if (ze.matches)
        P = ze.matches;
      else {
        let { error: gt, notFoundMatches: kt, route: Et } = zn(
          U.pathname
        );
        return {
          matches: kt,
          loaderData: {},
          errors: {
            [Et.id]: gt
          }
        };
      }
    }
    let ct = p || h, { dsMatches: Le, revalidatingFetchers: St } = Ig(
      A,
      ae,
      c,
      f,
      t.history,
      R,
      P,
      et,
      U,
      he ? [] : s,
      he === !0,
      J,
      re,
      Re,
      ue,
      se,
      ct,
      m,
      t.patchRoutesOnNavigation != null,
      xe,
      ke
    );
    if (j = ++Te, !t.dataStrategy && !Le.some((ze) => ze.shouldLoad) && !Le.some(
      (ze) => ze.route.middleware && ze.route.middleware.length > 0
    ) && St.length === 0) {
      let ze = gs();
      return Ht(
        U,
        {
          matches: P,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: xe && dn(xe[1]) ? { [xe[0]]: xe[1].error } : null,
          ...iv(xe),
          ...ze ? { fetchers: new Map(R.fetchers) } : {}
        },
        { flushSync: we }
      ), { shortCircuited: !0 };
    }
    if (Qe) {
      let ze = {};
      if (!oe) {
        ze.navigation = Ne;
        let gt = ut(xe);
        gt !== void 0 && (ze.actionData = gt);
      }
      St.length > 0 && (ze.fetchers = ta(St)), yt(ze, { flushSync: we });
    }
    St.forEach((ze) => {
      Dt(ze.key), ze.controller && ce.set(ze.key, ze.controller);
    });
    let at = () => St.forEach((ze) => Dt(ze.key));
    X && X.signal.addEventListener(
      "abort",
      at
    );
    let { loaderResults: za, fetcherResults: _n } = await Il(
      Le,
      St,
      A,
      U,
      ae
    );
    if (A.signal.aborted)
      return { shortCircuited: !0 };
    X && X.signal.removeEventListener(
      "abort",
      at
    ), St.forEach((ze) => ce.delete(ze.key));
    let Nt = Lo(za);
    if (Nt)
      return await na(A, Nt.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    if (Nt = Lo(_n), Nt)
      return se.add(Nt.key), await na(A, Nt.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    let { loaderData: Yn, errors: pi } = nv(
      R,
      P,
      za,
      xe,
      St,
      _n
    );
    he && R.errors && (pi = { ...R.errors, ...pi });
    let Gn = gs(), yi = vs(j), Ki = Gn || yi || St.length > 0;
    return {
      matches: P,
      loaderData: Yn,
      errors: pi,
      ...Ki ? { fetchers: new Map(R.fetchers) } : {}
    };
  }
  function ut(A) {
    if (A && !dn(A[1]))
      return {
        [A[0]]: A[1].data
      };
    if (R.actionData)
      return Object.keys(R.actionData).length === 0 ? null : R.actionData;
  }
  function ta(A) {
    return A.forEach((U) => {
      let P = R.fetchers.get(U.key), ae = qr(
        void 0,
        P ? P.data : void 0
      );
      R.fetchers.set(U.key, ae);
    }), new Map(R.fetchers);
  }
  async function ju(A, U, P, ae) {
    Dt(A);
    let oe = (ae && ae.flushSync) === !0, pe = p || h, fe = Cd(
      R.location,
      R.matches,
      m,
      P,
      U,
      ae?.relative
    ), de = li(pe, fe, m), ge = Na(de, pe, fe);
    if (ge.active && ge.matches && (de = ge.matches), !de) {
      mn(
        A,
        U,
        wn(404, { pathname: fe }),
        { flushSync: oe }
      );
      return;
    }
    let { path: he, submission: we, error: xe } = Xg(
      !0,
      fe,
      ae
    );
    if (xe) {
      mn(A, U, xe, { flushSync: oe });
      return;
    }
    let ke = t.getContext ? await t.getContext() : new kg(), Ne = (ae && ae.preventScrollReset) === !0;
    if (we && Yt(we.formMethod)) {
      await Du(
        A,
        U,
        he,
        de,
        ke,
        ge.active,
        oe,
        Ne,
        we,
        ae && ae.unstable_defaultShouldRevalidate
      );
      return;
    }
    ue.set(A, { routeId: U, path: he }), await Gt(
      A,
      U,
      he,
      de,
      ke,
      ge.active,
      oe,
      Ne,
      we
    );
  }
  async function Du(A, U, P, ae, oe, pe, fe, de, ge, he) {
    ja(), ue.delete(A);
    let we = R.fetchers.get(A);
    Nn(A, Cw(ge, we), {
      flushSync: fe
    });
    let xe = new AbortController(), ke = zl(
      t.history,
      P,
      xe.signal,
      ge
    );
    if (pe) {
      let it = await Pn(
        ae,
        new URL(ke.url).pathname,
        ke.signal,
        A
      );
      if (it.type === "aborted")
        return;
      if (it.type === "error") {
        mn(A, U, it.error, { flushSync: fe });
        return;
      } else if (it.matches)
        ae = it.matches;
      else {
        mn(
          A,
          U,
          wn(404, { pathname: P }),
          { flushSync: fe }
        );
        return;
      }
    }
    let Ne = Xo(ae, P);
    if (!Ne.route.action && !Ne.route.lazy) {
      let it = wn(405, {
        method: ge.formMethod,
        pathname: P,
        routeId: U
      });
      mn(A, U, it, { flushSync: fe });
      return;
    }
    ce.set(A, xe);
    let et = Te, Qe = Hl(
      c,
      f,
      ke,
      P,
      ae,
      Ne,
      s,
      oe
    ), ct = await Aa(
      ke,
      P,
      Qe,
      oe,
      A
    ), Le = ct[Ne.route.id];
    if (!Le) {
      for (let it of Qe)
        if (ct[it.route.id]) {
          Le = ct[it.route.id];
          break;
        }
    }
    if (ke.signal.aborted) {
      ce.get(A) === xe && ce.delete(A);
      return;
    }
    if (Re.has(A)) {
      if (Bi(Le) || dn(Le)) {
        Nn(A, Ea(void 0));
        return;
      }
    } else {
      if (Bi(Le))
        if (ce.delete(A), j > et) {
          Nn(A, Ea(void 0));
          return;
        } else
          return se.add(A), Nn(A, qr(ge)), na(ke, Le, !1, {
            fetcherSubmission: ge,
            preventScrollReset: de
          });
      if (dn(Le)) {
        mn(A, U, Le.error);
        return;
      }
    }
    let St = R.navigation.location || R.location, at = zl(
      t.history,
      St,
      xe.signal
    ), za = p || h, _n = R.navigation.state !== "idle" ? li(za, R.navigation.location, m) : R.matches;
    _e(_n, "Didn't find any matches after fetcher action");
    let Nt = ++Te;
    I.set(A, Nt);
    let Yn = qr(ge, Le.data);
    R.fetchers.set(A, Yn);
    let { dsMatches: pi, revalidatingFetchers: Gn } = Ig(
      at,
      oe,
      c,
      f,
      t.history,
      R,
      _n,
      ge,
      St,
      s,
      !1,
      J,
      re,
      Re,
      ue,
      se,
      za,
      m,
      t.patchRoutesOnNavigation != null,
      [Ne.route.id, Le],
      he
    );
    Gn.filter((it) => it.key !== A).forEach((it) => {
      let Qi = it.key, Zi = R.fetchers.get(Qi), Es = qr(
        void 0,
        Zi ? Zi.data : void 0
      );
      R.fetchers.set(Qi, Es), Dt(Qi), it.controller && ce.set(Qi, it.controller);
    }), yt({ fetchers: new Map(R.fetchers) });
    let yi = () => Gn.forEach((it) => Dt(it.key));
    xe.signal.addEventListener(
      "abort",
      yi
    );
    let { loaderResults: Ki, fetcherResults: ze } = await Il(
      pi,
      Gn,
      at,
      St,
      oe
    );
    if (xe.signal.aborted)
      return;
    if (xe.signal.removeEventListener(
      "abort",
      yi
    ), I.delete(A), ce.delete(A), Gn.forEach((it) => ce.delete(it.key)), R.fetchers.has(A)) {
      let it = Ea(Le.data);
      R.fetchers.set(A, it);
    }
    let gt = Lo(Ki);
    if (gt)
      return na(
        at,
        gt.result,
        !1,
        { preventScrollReset: de }
      );
    if (gt = Lo(ze), gt)
      return se.add(gt.key), na(
        at,
        gt.result,
        !1,
        { preventScrollReset: de }
      );
    let { loaderData: kt, errors: Et } = nv(
      R,
      _n,
      Ki,
      void 0,
      Gn,
      ze
    );
    vs(Nt), R.navigation.state === "loading" && Nt > j ? (_e(H, "Expected pending action"), X && X.abort(), Ht(R.navigation.location, {
      matches: _n,
      loaderData: kt,
      errors: Et,
      fetchers: new Map(R.fetchers)
    })) : (yt({
      errors: Et,
      loaderData: av(
        R.loaderData,
        kt,
        _n,
        Et
      ),
      fetchers: new Map(R.fetchers)
    }), J = !1);
  }
  async function Gt(A, U, P, ae, oe, pe, fe, de, ge) {
    let he = R.fetchers.get(A);
    Nn(
      A,
      qr(
        ge,
        he ? he.data : void 0
      ),
      { flushSync: fe }
    );
    let we = new AbortController(), xe = zl(
      t.history,
      P,
      we.signal
    );
    if (pe) {
      let Le = await Pn(
        ae,
        new URL(xe.url).pathname,
        xe.signal,
        A
      );
      if (Le.type === "aborted")
        return;
      if (Le.type === "error") {
        mn(A, U, Le.error, { flushSync: fe });
        return;
      } else if (Le.matches)
        ae = Le.matches;
      else {
        mn(
          A,
          U,
          wn(404, { pathname: P }),
          { flushSync: fe }
        );
        return;
      }
    }
    let ke = Xo(ae, P);
    ce.set(A, we);
    let Ne = Te, et = Hl(
      c,
      f,
      xe,
      P,
      ae,
      ke,
      s,
      oe
    ), Qe = await Aa(
      xe,
      P,
      et,
      oe,
      A
    ), ct = Qe[ke.route.id];
    if (!ct) {
      for (let Le of ae)
        if (Qe[Le.route.id]) {
          ct = Qe[Le.route.id];
          break;
        }
    }
    if (ce.get(A) === we && ce.delete(A), !xe.signal.aborted) {
      if (Re.has(A)) {
        Nn(A, Ea(void 0));
        return;
      }
      if (Bi(ct))
        if (j > Ne) {
          Nn(A, Ea(void 0));
          return;
        } else {
          se.add(A), await na(xe, ct, !1, {
            preventScrollReset: de
          });
          return;
        }
      if (dn(ct)) {
        mn(A, U, ct.error);
        return;
      }
      Nn(A, Ea(ct.data));
    }
  }
  async function na(A, U, P, {
    submission: ae,
    fetcherSubmission: oe,
    preventScrollReset: pe,
    replace: fe
  } = {}) {
    P || (K?.resolve(), K = null), U.response.headers.has("X-Remix-Revalidate") && (J = !0);
    let de = U.response.headers.get("Location");
    _e(de, "Expected a Location header on the redirect Response"), de = ev(
      de,
      new URL(A.url),
      m,
      t.history
    );
    let ge = Rd(R.location, de, {
      _isRedirect: !0
    });
    if (l) {
      let et = !1;
      if (U.response.headers.has("X-Remix-Reload-Document"))
        et = !0;
      else if (nh(de)) {
        const Qe = ST(de, !0);
        et = // Hard reload if it's an absolute URL to a new origin
        Qe.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        jn(Qe.pathname, m) == null;
      }
      if (et) {
        fe ? a.location.replace(de) : a.location.assign(de);
        return;
      }
    }
    X = null;
    let he = fe === !0 || U.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: we, formAction: xe, formEncType: ke } = R.navigation;
    !ae && !oe && we && xe && ke && (ae = rv(R.navigation));
    let Ne = ae || oe;
    if (tw.has(U.response.status) && Ne && Yt(Ne.formMethod))
      await be(he, ge, {
        submission: {
          ...Ne,
          formAction: de
        },
        // Preserve these flags across redirects
        preventScrollReset: pe || ie,
        enableViewTransition: P ? le : void 0
      });
    else {
      let et = Qf(
        ge,
        ae
      );
      await be(he, ge, {
        overrideNavigation: et,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: oe,
        // Preserve these flags across redirects
        preventScrollReset: pe || ie,
        enableViewTransition: P ? le : void 0
      });
    }
  }
  async function Aa(A, U, P, ae, oe) {
    let pe, fe = {};
    try {
      pe = await fw(
        y,
        A,
        U,
        P,
        oe,
        ae,
        !1
      );
    } catch (de) {
      return P.filter((ge) => ge.shouldLoad).forEach((ge) => {
        fe[ge.route.id] = {
          type: "error",
          error: de
        };
      }), fe;
    }
    if (A.signal.aborted)
      return fe;
    if (!Yt(A.method))
      for (let de of P) {
        if (pe[de.route.id]?.type === "error")
          break;
        !pe.hasOwnProperty(de.route.id) && !R.loaderData.hasOwnProperty(de.route.id) && (!R.errors || !R.errors.hasOwnProperty(de.route.id)) && de.shouldCallHandler() && (pe[de.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${de.route.id}`
          )
        });
      }
    for (let [de, ge] of Object.entries(pe))
      if (Sw(ge)) {
        let he = ge.result;
        fe[de] = {
          type: "redirect",
          response: pw(
            he,
            A,
            de,
            P,
            m
          )
        };
      } else
        fe[de] = await mw(ge);
    return fe;
  }
  async function Il(A, U, P, ae, oe) {
    let pe = Aa(
      P,
      ae,
      A,
      oe,
      null
    ), fe = Promise.all(
      U.map(async (he) => {
        if (he.matches && he.match && he.request && he.controller) {
          let xe = (await Aa(
            he.request,
            he.path,
            he.matches,
            oe,
            he.key
          ))[he.match.route.id];
          return { [he.key]: xe };
        } else
          return Promise.resolve({
            [he.key]: {
              type: "error",
              error: wn(404, {
                pathname: he.path
              })
            }
          });
      })
    ), de = await pe, ge = (await fe).reduce(
      (he, we) => Object.assign(he, we),
      {}
    );
    return {
      loaderResults: de,
      fetcherResults: ge
    };
  }
  function ja() {
    J = !0, ue.forEach((A, U) => {
      ce.has(U) && re.add(U), Dt(U);
    });
  }
  function Nn(A, U, P = {}) {
    R.fetchers.set(A, U), yt(
      { fetchers: new Map(R.fetchers) },
      { flushSync: (P && P.flushSync) === !0 }
    );
  }
  function mn(A, U, P, ae = {}) {
    let oe = ri(R.matches, U);
    aa(A), yt(
      {
        errors: {
          [oe.route.id]: P
        },
        fetchers: new Map(R.fetchers)
      },
      { flushSync: (ae && ae.flushSync) === !0 }
    );
  }
  function ys(A) {
    return Se.set(A, (Se.get(A) || 0) + 1), Re.has(A) && Re.delete(A), R.fetchers.get(A) || nw;
  }
  function Nu(A, U) {
    Dt(A, U?.reason), Nn(A, Ea(null));
  }
  function aa(A) {
    let U = R.fetchers.get(A);
    ce.has(A) && !(U && U.state === "loading" && I.has(A)) && Dt(A), ue.delete(A), I.delete(A), se.delete(A), Re.delete(A), re.delete(A), R.fetchers.delete(A);
  }
  function Ft(A) {
    let U = (Se.get(A) || 0) - 1;
    U <= 0 ? (Se.delete(A), Re.add(A)) : Se.set(A, U), yt({ fetchers: new Map(R.fetchers) });
  }
  function Dt(A, U) {
    let P = ce.get(A);
    P && (P.abort(U), ce.delete(A));
  }
  function qt(A) {
    for (let U of A) {
      let P = ys(U), ae = Ea(P.data);
      R.fetchers.set(U, ae);
    }
  }
  function gs() {
    let A = [], U = !1;
    for (let P of se) {
      let ae = R.fetchers.get(P);
      _e(ae, `Expected fetcher: ${P}`), ae.state === "loading" && (se.delete(P), A.push(P), U = !0);
    }
    return qt(A), U;
  }
  function vs(A) {
    let U = [];
    for (let [P, ae] of I)
      if (ae < A) {
        let oe = R.fetchers.get(P);
        _e(oe, `Expected fetcher: ${P}`), oe.state === "loading" && (Dt(P), I.delete(P), U.push(P));
      }
    return qt(U), U.length > 0;
  }
  function zu(A, U) {
    let P = R.blockers.get(A) || Hr;
    return De.get(A) !== U && De.set(A, U), P;
  }
  function hi(A) {
    R.blockers.delete(A), De.delete(A);
  }
  function ia(A, U) {
    let P = R.blockers.get(A) || Hr;
    _e(
      P.state === "unblocked" && U.state === "blocked" || P.state === "blocked" && U.state === "blocked" || P.state === "blocked" && U.state === "proceeding" || P.state === "blocked" && U.state === "unblocked" || P.state === "proceeding" && U.state === "unblocked",
      `Invalid blocker state transition: ${P.state} -> ${U.state}`
    );
    let ae = new Map(R.blockers);
    ae.set(A, U), yt({ blockers: ae });
  }
  function mi({
    currentLocation: A,
    nextLocation: U,
    historyAction: P
  }) {
    if (De.size === 0)
      return;
    De.size > 1 && xt(!1, "A router only supports one blocker at a time");
    let ae = Array.from(De.entries()), [oe, pe] = ae[ae.length - 1], fe = R.blockers.get(oe);
    if (!(fe && fe.state === "proceeding") && pe({ currentLocation: A, nextLocation: U, historyAction: P }))
      return oe;
  }
  function zn(A) {
    let U = wn(404, { pathname: A }), P = p || h, { matches: ae, route: oe } = Oo(P);
    return { notFoundMatches: ae, route: oe, error: U };
  }
  function Ii(A, U, P) {
    if (w = A, D = U, C = P || null, !_ && R.navigation === Kf) {
      _ = !0;
      let ae = Kl(R.location, R.matches);
      ae != null && yt({ restoreScrollPosition: ae });
    }
    return () => {
      w = null, D = null, C = null;
    };
  }
  function Da(A, U) {
    return C && C(
      A,
      U.map((ae) => MT(ae, R.loaderData))
    ) || A.key;
  }
  function _u(A, U) {
    if (w && D) {
      let P = Da(A, U);
      w[P] = D();
    }
  }
  function Kl(A, U) {
    if (w) {
      let P = Da(A, U), ae = w[P];
      if (typeof ae == "number")
        return ae;
    }
    return null;
  }
  function Na(A, U, P) {
    if (t.patchRoutesOnNavigation)
      if (A) {
        if (Object.keys(A[0].params).length > 0)
          return { active: !0, matches: $r(
            U,
            P,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: $r(
          U,
          P,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function Pn(A, U, P, ae) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: A };
    let oe = A;
    for (; ; ) {
      let pe = p == null, fe = p || h, de = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: P,
          path: U,
          matches: oe,
          fetcherKey: ae,
          patch: (we, xe) => {
            P.aborted || Kg(
              we,
              xe,
              fe,
              de,
              c,
              !1
            );
          }
        });
      } catch (we) {
        return { type: "error", error: we, partialMatches: oe };
      } finally {
        pe && !P.aborted && (h = [...h]);
      }
      if (P.aborted)
        return { type: "aborted" };
      let ge = li(fe, U, m), he = null;
      if (ge) {
        if (Object.keys(ge[0].params).length === 0)
          return { type: "success", matches: ge };
        if (he = $r(
          fe,
          U,
          m,
          !0
        ), !(he && oe.length < he.length && bs(
          oe,
          he.slice(0, oe.length)
        )))
          return { type: "success", matches: ge };
      }
      if (he || (he = $r(
        fe,
        U,
        m,
        !0
      )), !he || bs(oe, he))
        return { type: "success", matches: null };
      oe = he;
    }
  }
  function bs(A, U) {
    return A.length === U.length && A.every((P, ae) => P.route.id === U[ae].route.id);
  }
  function xs(A) {
    f = {}, p = Wr(
      A,
      c,
      void 0,
      f
    );
  }
  function Ss(A, U, P = !1) {
    let ae = p == null;
    Kg(
      A,
      U,
      p || h,
      f,
      c,
      P
    ), ae && (h = [...h], yt({}));
  }
  return te = {
    get basename() {
      return m;
    },
    get future() {
      return b;
    },
    get state() {
      return R;
    },
    get routes() {
      return h;
    },
    get window() {
      return a;
    },
    initialize: ea,
    subscribe: kn,
    enableScrollRestoration: Ii,
    navigate: Ma,
    fetch: ju,
    revalidate: di,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (A) => t.history.createHref(A),
    encodeLocation: (A) => t.history.encodeLocation(A),
    getFetcher: ys,
    resetFetcher: Nu,
    deleteFetcher: Ft,
    dispose: Ca,
    getBlocker: zu,
    deleteBlocker: hi,
    patchRoutes: Ss,
    _internalFetchControllers: ce,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: xs,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(A) {
      yt(A);
    }
  }, t.unstable_instrumentations && (te = XT(
    te,
    t.unstable_instrumentations.map((A) => A.router).filter(Boolean)
  )), te;
}
function lw(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Cd(t, a, l, s, o, c) {
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
    ah(f),
    jn(t.pathname, l) || t.pathname,
    c === "path"
  );
  if (s == null && (p.search = t.search, p.hash = t.hash), (s == null || s === "" || s === ".") && h) {
    let m = sh(p.search);
    if (h.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && m) {
      let y = new URLSearchParams(p.search), b = y.getAll("index");
      y.delete("index"), b.filter((T) => T).forEach((T) => y.append("index", T));
      let x = y.toString();
      p.search = x ? `?${x}` : "";
    }
  }
  return l !== "/" && (p.pathname = qT({ basename: l, pathname: p.pathname })), Jn(p);
}
function Xg(t, a, l) {
  if (!l || !lw(l))
    return { path: a };
  if (l.formMethod && !ww(l.formMethod))
    return {
      path: a,
      error: wn(405, { method: l.formMethod })
    };
  let s = () => ({
    path: a,
    error: wn(400, { type: "invalid-body" })
  }), c = (l.formMethod || "get").toUpperCase(), f = Nb(a);
  if (l.body !== void 0) {
    if (l.formEncType === "text/plain") {
      if (!Yt(c))
        return s();
      let b = typeof l.body == "string" ? l.body : l.body instanceof FormData || l.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(l.body.entries()).reduce(
          (x, [T, w]) => `${x}${T}=${w}
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
    h = Ad(l.formData), p = l.formData;
  else if (l.body instanceof FormData)
    h = Ad(l.body), p = l.body;
  else if (l.body instanceof URLSearchParams)
    h = l.body, p = tv(h);
  else if (l.body == null)
    h = new URLSearchParams(), p = new FormData();
  else
    try {
      h = new URLSearchParams(l.body), p = tv(h);
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
  let y = qn(a);
  return t && y.search && sh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: Jn(y), submission: m };
}
function Ig(t, a, l, s, o, c, f, h, p, m, y, b, x, T, w, C, D, _, L, O, B) {
  let F = O ? dn(O[1]) ? O[1].error : O[1].data : void 0, ne = o.createURL(c.location), te = o.createURL(p), R;
  if (y && c.errors) {
    let Z = Object.keys(c.errors)[0];
    R = f.findIndex((N) => N.route.id === Z);
  } else if (O && dn(O[1])) {
    let Z = O[0];
    R = f.findIndex((N) => N.route.id === Z) - 1;
  }
  let H = O ? O[1].statusCode : void 0, K = H && H >= 400, ie = {
    currentUrl: ne,
    currentParams: c.matches[0]?.params || {},
    nextUrl: te,
    nextParams: f[0].params,
    ...h,
    actionResult: F,
    actionStatus: H
  }, X = ls(f), le = f.map((Z, N) => {
    let { route: J } = Z, re = null;
    if (R != null && N > R)
      re = !1;
    else if (J.lazy)
      re = !0;
    else if (!lh(J))
      re = !1;
    else if (y) {
      let { shouldLoad: I } = wb(
        J,
        c.loaderData,
        c.errors
      );
      re = I;
    } else rw(c.loaderData, c.matches[N], Z) && (re = !0);
    if (re !== null)
      return Md(
        l,
        s,
        t,
        p,
        X,
        Z,
        m,
        a,
        re
      );
    let ce = !1;
    typeof B == "boolean" ? ce = B : K ? ce = !1 : (b || ne.pathname + ne.search === te.pathname + te.search || ne.search !== te.search || sw(c.matches[N], Z)) && (ce = !0);
    let Te = {
      ...ie,
      defaultShouldRevalidate: ce
    }, j = Ir(Z, Te);
    return Md(
      l,
      s,
      t,
      p,
      X,
      Z,
      m,
      a,
      j,
      Te,
      B
    );
  }), G = [];
  return w.forEach((Z, N) => {
    if (y || !f.some((ue) => ue.route.id === Z.routeId) || T.has(N))
      return;
    let J = c.fetchers.get(N), re = J && J.state !== "idle" && J.data === void 0, ce = li(D, Z.path, _);
    if (!ce) {
      if (L && re)
        return;
      G.push({
        key: N,
        routeId: Z.routeId,
        path: Z.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (C.has(N))
      return;
    let Te = Xo(ce, Z.path), j = new AbortController(), I = zl(
      o,
      Z.path,
      j.signal
    ), se = null;
    if (x.has(N))
      x.delete(N), se = Hl(
        l,
        s,
        I,
        Z.path,
        ce,
        Te,
        m,
        a
      );
    else if (re)
      b && (se = Hl(
        l,
        s,
        I,
        Z.path,
        ce,
        Te,
        m,
        a
      ));
    else {
      let ue;
      typeof B == "boolean" ? ue = B : K ? ue = !1 : ue = b;
      let Se = {
        ...ie,
        defaultShouldRevalidate: ue
      };
      Ir(Te, Se) && (se = Hl(
        l,
        s,
        I,
        Z.path,
        ce,
        Te,
        m,
        a,
        Se
      ));
    }
    se && G.push({
      key: N,
      routeId: Z.routeId,
      path: Z.path,
      matches: se,
      match: Te,
      request: I,
      controller: j
    });
  }), { dsMatches: le, revalidatingFetchers: G };
}
function lh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function wb(t, a, l) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!lh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && t.id in a, o = l != null && l[t.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
}
function rw(t, a, l) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    l.route.id !== a.route.id
  ), o = !t.hasOwnProperty(l.route.id);
  return s || o;
}
function sw(t, a) {
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
function Kg(t, a, l, s, o, c) {
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
      (b) => Rb(m, b)
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
      let { existingRoute: y, newRoute: b } = p[m], x = y, [T] = Wr(
        [b],
        o,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(x, {
        element: T.element ? T.element : x.element,
        errorElement: T.errorElement ? T.errorElement : x.errorElement,
        hydrateFallbackElement: T.hydrateFallbackElement ? T.hydrateFallbackElement : x.hydrateFallbackElement
      });
    }
}
function Rb(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (l, s) => a.children?.some((o) => Rb(l, o))
  ) ?? !1 : !1;
}
var Qg = /* @__PURE__ */ new WeakMap(), Cb = ({
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
  let f = Qg.get(o);
  f || (f = {}, Qg.set(o, f));
  let h = f[t];
  if (h)
    return h;
  let p = (async () => {
    let m = TT(t), b = o[t] !== void 0 && t !== "hasErrorBoundary";
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
}, Zg = /* @__PURE__ */ new WeakMap();
function ow(t, a, l, s, o) {
  let c = l[t.id];
  if (_e(c, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let y = Zg.get(c);
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
      let x = await t.lazy(), T = {};
      for (let w in x) {
        let C = x[w];
        if (C === void 0)
          continue;
        let D = RT(w), L = c[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        D ? xt(
          !D,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : L ? xt(
          !L,
          `Route "${c.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : T[w] = C;
      }
      Object.assign(c, T), Object.assign(c, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(c),
        lazy: void 0
      });
    })();
    return Zg.set(c, b), b.catch(() => {
    }), {
      lazyRoutePromise: b,
      lazyHandlerPromise: b
    };
  }
  let f = Object.keys(t.lazy), h = [], p;
  for (let y of f) {
    if (o && o.includes(y))
      continue;
    let b = Cb({
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
async function Jg(t) {
  let a = t.matches.filter((o) => o.shouldLoad), l = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    l[a[c].route.id] = o;
  }), l;
}
async function uw(t) {
  return t.matches.some((a) => a.route.middleware) ? Mb(t, () => Jg(t)) : Jg(t);
}
function Mb(t, a) {
  return cw(
    t,
    a,
    (s) => {
      if (Tw(s))
        throw s;
      return s;
    },
    bw,
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
      ), p = ri(
        f,
        f[h].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: s }
      });
    }
  }
}
async function cw(t, a, l, s, o) {
  let { matches: c, ...f } = t, h = c.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await Ab(
    f,
    h,
    a,
    l,
    s,
    o
  );
}
async function Ab(t, a, l, s, o, c, f = 0) {
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
      return b = { value: await Ab(
        t,
        a,
        l,
        s,
        o,
        c,
        f + 1
      ) }, b.value;
    } catch (T) {
      return b = { value: await c(T, m, b) }, b.value;
    }
  };
  try {
    let T = await y(t, x), w = T != null ? s(T) : void 0;
    return o(w) ? w : b ? w ?? b.value : (b = { value: await x() }, b.value);
  } catch (T) {
    return await c(T, m, b);
  }
}
function jb(t, a, l, s, o) {
  let c = Cb({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: t
  }), f = ow(
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
function Md(t, a, l, s, o, c, f, h, p, m = null, y) {
  let b = !1, x = jb(
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
    shouldCallHandler(T) {
      return b = !0, m ? typeof y == "boolean" ? Ir(c, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof T == "boolean" ? Ir(c, {
        ...m,
        defaultShouldRevalidate: T
      }) : Ir(c, m) : p;
    },
    resolve(T) {
      let { lazy: w, loader: C, middleware: D } = c.route, _ = b || p || T && !Yt(l.method) && (w || C), L = D && D.length > 0 && !C && !w;
      return _ && (Yt(l.method) || !L) ? dw({
        request: l,
        path: s,
        unstable_pattern: o,
        match: c,
        lazyHandlerPromise: x?.handler,
        lazyRoutePromise: x?.route,
        handlerOverride: T,
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
    _lazyPromises: jb(
      t,
      a,
      l,
      m,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Md(
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
async function fw(t, a, l, s, o, c, f) {
  s.some((y) => y._lazyPromises?.middleware) && await Promise.all(s.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    unstable_url: Db(a, l),
    unstable_pattern: ls(s),
    params: s[0].params,
    context: c,
    matches: s
  }, m = await t({
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
async function dw({
  request: t,
  path: a,
  unstable_pattern: l,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: f,
  scopedContext: h
}) {
  let p, m, y = Yt(t.method), b = y ? "action" : "loader", x = (T) => {
    let w, C = new Promise((L, O) => w = O);
    m = () => w(), t.signal.addEventListener("abort", m);
    let D = (L) => typeof T != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${b}" [routeId: ${s.route.id}]`
      )
    ) : T(
      {
        request: t,
        unstable_url: Db(t, a),
        unstable_pattern: l,
        params: s.params,
        context: h
      },
      ...L !== void 0 ? [L] : []
    ), _ = (async () => {
      try {
        return { type: "data", result: await (f ? f((O) => D(O)) : D()) };
      } catch (L) {
        return { type: "error", result: L };
      }
    })();
    return Promise.race([_, C]);
  };
  try {
    let T = y ? s.route.action : s.route.loader;
    if (o || c)
      if (T) {
        let w, [C] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          x(T).catch((D) => {
            w = D;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          c
        ]);
        if (w !== void 0)
          throw w;
        p = C;
      } else {
        await o;
        let w = y ? s.route.action : s.route.loader;
        if (w)
          [p] = await Promise.all([x(w), c]);
        else if (b === "action") {
          let C = new URL(t.url), D = C.pathname + C.search;
          throw wn(405, {
            method: t.method,
            pathname: D,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (T)
      p = await x(T);
    else {
      let w = new URL(t.url), C = w.pathname + w.search;
      throw wn(404, {
        pathname: C
      });
    }
  } catch (T) {
    return { type: "error", result: T };
  } finally {
    m && t.signal.removeEventListener("abort", m);
  }
  return p;
}
async function hw(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function mw(t) {
  let { result: a, type: l } = t;
  if (rh(a)) {
    let s;
    try {
      s = await hw(a);
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
  return l === "error" ? lv(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: vw(a),
    statusCode: es(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: es(a) ? a.status : void 0
  } : lv(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function pw(t, a, l, s, o) {
  let c = t.headers.get("Location");
  if (_e(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !nh(c)) {
    let f = s.slice(
      0,
      s.findIndex((h) => h.route.id === l) + 1
    );
    c = Cd(
      new URL(a.url),
      f,
      o,
      c
    ), t.headers.set("Location", c);
  }
  return t;
}
var Wg = [
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
function ev(t, a, l, s) {
  if (nh(t)) {
    let o = t, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Wg.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let f = jn(c.pathname, l) != null;
    if (c.origin === a.origin && f)
      return ih(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(t);
    if (Wg.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function zl(t, a, l, s) {
  let o = t.createURL(Nb(a)).toString(), c = { signal: l };
  if (s && Yt(s.formMethod)) {
    let { formMethod: f, formEncType: h } = s;
    c.method = f.toUpperCase(), h === "application/json" ? (c.headers = new Headers({ "Content-Type": h }), c.body = JSON.stringify(s.json)) : h === "text/plain" ? c.body = s.text : h === "application/x-www-form-urlencoded" && s.formData ? c.body = Ad(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function Db(t, a) {
  let l = new URL(t.url), s = typeof a == "string" ? qn(a) : a;
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
function Ad(t) {
  let a = new URLSearchParams();
  for (let [l, s] of t.entries())
    a.append(l, typeof s == "string" ? s : s.name);
  return a;
}
function tv(t) {
  let a = new FormData();
  for (let [l, s] of t.entries())
    a.append(l, s);
  return a;
}
function yw(t, a, l, s = !1, o = !1) {
  let c = {}, f = null, h, p = !1, m = {}, y = l && dn(l[1]) ? l[1].error : void 0;
  return t.forEach((b) => {
    if (!(b.route.id in a))
      return;
    let x = b.route.id, T = a[x];
    if (_e(
      !Bi(T),
      "Cannot handle redirect results in processLoaderData"
    ), dn(T)) {
      let w = T.error;
      if (y !== void 0 && (w = y, y = void 0), f = f || {}, o)
        f[x] = w;
      else {
        let C = ri(t, x);
        f[C.route.id] == null && (f[C.route.id] = w);
      }
      s || (c[x] = Tb), p || (p = !0, h = es(T.error) ? T.error.status : 500), T.headers && (m[x] = T.headers);
    } else
      c[x] = T.data, T.statusCode && T.statusCode !== 200 && !p && (h = T.statusCode), T.headers && (m[x] = T.headers);
  }), y !== void 0 && l && (f = { [l[0]]: y }, l[2] && (c[l[2]] = void 0)), {
    loaderData: c,
    errors: f,
    statusCode: h || 200,
    loaderHeaders: m
  };
}
function nv(t, a, l, s, o, c) {
  let { loaderData: f, errors: h } = yw(
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
      let T = ri(t.matches, y?.route.id);
      h && h[T.route.id] || (h = {
        ...h,
        [T.route.id]: x.error
      }), t.fetchers.delete(m);
    } else if (Bi(x))
      _e(!1, "Unhandled fetcher revalidation redirect");
    else {
      let T = Ea(x.data);
      t.fetchers.set(m, T);
    }
  }), { loaderData: f, errors: h };
}
function av(t, a, l, s) {
  let o = Object.entries(a).filter(([, c]) => c !== Tb).reduce((c, [f, h]) => (c[f] = h, c), {});
  for (let c of l) {
    let f = c.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && c.route.loader && (o[f] = t[f]), s && s.hasOwnProperty(f))
      break;
  }
  return o;
}
function iv(t) {
  return t ? dn(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function ri(t, a) {
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
function Nb(t) {
  let a = typeof t == "string" ? qn(t) : t;
  return Jn({ ...a, hash: "" });
}
function gw(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function vw(t) {
  return new bu(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function bw(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, l]) => typeof a == "string" && xw(l)
  );
}
function xw(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function Sw(t) {
  return rh(t.result) && Sb.has(t.result.status);
}
function dn(t) {
  return t.type === "error";
}
function Bi(t) {
  return (t && t.type) === "redirect";
}
function lv(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function rh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function Ew(t) {
  return Sb.has(t);
}
function Tw(t) {
  return rh(t) && Ew(t.status) && t.headers.has("Location");
}
function ww(t) {
  return ew.has(t.toUpperCase());
}
function Yt(t) {
  return JT.has(t.toUpperCase());
}
function sh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function Xo(t, a) {
  let l = typeof a == "string" ? qn(a).search : a.search;
  if (t[t.length - 1].route.index && sh(l || ""))
    return t[t.length - 1];
  let s = yb(t);
  return s[s.length - 1];
}
function rv(t) {
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
function Rw(t, a) {
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
function qr(t, a) {
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
function Cw(t, a) {
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
function Ea(t) {
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
function Mw(t, a) {
  try {
    let l = t.sessionStorage.getItem(
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
function Aw(t, a) {
  if (a.size > 0) {
    let l = {};
    for (let [s, o] of a)
      l[s] = [...o];
    try {
      t.sessionStorage.setItem(
        Eb,
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
function sv() {
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
var Gi = S.createContext(null);
Gi.displayName = "DataRouter";
var rs = S.createContext(null);
rs.displayName = "DataRouterState";
var zb = S.createContext(!1);
function _b() {
  return S.useContext(zb);
}
var oh = S.createContext({
  isTransitioning: !1
});
oh.displayName = "ViewTransition";
var Ob = S.createContext(
  /* @__PURE__ */ new Map()
);
Ob.displayName = "Fetchers";
var jw = S.createContext(null);
jw.displayName = "Await";
var Dn = S.createContext(
  null
);
Dn.displayName = "Navigation";
var xu = S.createContext(
  null
);
xu.displayName = "Location";
var wa = S.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
wa.displayName = "Route";
var uh = S.createContext(null);
uh.displayName = "RouteError";
var Lb = "REACT_ROUTER_ERROR", Dw = "REDIRECT", Nw = "ROUTE_ERROR_RESPONSE";
function zw(t) {
  if (t.startsWith(`${Lb}:${Dw}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function _w(t) {
  if (t.startsWith(
    `${Lb}:${Nw}:{`
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
function Ow(t, { relative: a } = {}) {
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
function Ra() {
  return _e(
    ss(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), S.useContext(xu).location;
}
var Ub = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Vb(t) {
  S.useContext(Dn).static || S.useLayoutEffect(t);
}
function Fi() {
  let { isDataRoute: t } = S.useContext(wa);
  return t ? $w() : Lw();
}
function Lw() {
  _e(
    ss(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = S.useContext(Gi), { basename: a, navigator: l } = S.useContext(Dn), { matches: s } = S.useContext(wa), { pathname: o } = Ra(), c = JSON.stringify(ah(s)), f = S.useRef(!1);
  return Vb(() => {
    f.current = !0;
  }), S.useCallback(
    (p, m = {}) => {
      if (xt(f.current, Ub), !f.current) return;
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
  let { matches: l } = S.useContext(wa), { pathname: s } = Ra(), o = JSON.stringify(ah(l));
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
function Uw(t, a, l) {
  _e(
    ss(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = S.useContext(Dn), { matches: o } = S.useContext(wa), c = o[o.length - 1], f = c ? c.params : {}, h = c ? c.pathname : "/", p = c ? c.pathnameBase : "/", m = c && c.route;
  {
    let D = m && m.path || "";
    qb(
      h,
      !m || D.endsWith("*") || D.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${D}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${D}"> to <Route path="${D === "/" ? "*" : `${D}/*`}">.`
    );
  }
  let y = Ra(), b;
  b = y;
  let x = b.pathname || "/", T = x;
  if (p !== "/") {
    let D = p.replace(/^\//, "").split("/");
    T = "/" + x.replace(/^\//, "").split("/").slice(D.length).join("/");
  }
  let w = li(t, { pathname: T });
  return xt(
    m || w != null,
    `No routes matched location "${b.pathname}${b.search}${b.hash}" `
  ), xt(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), kw(
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
function Vw() {
  let t = Fw(), a = es(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), l = t instanceof Error ? t.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ S.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ S.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ S.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ S.createElement("h3", { style: { fontStyle: "italic" } }, a), l ? /* @__PURE__ */ S.createElement("pre", { style: o }, l) : null, f);
}
var Bw = /* @__PURE__ */ S.createElement(Vw, null), Bb = class extends S.Component {
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
      const l = _w(t.digest);
      l && (t = l);
    }
    let a = t !== void 0 ? /* @__PURE__ */ S.createElement(wa.Provider, { value: this.props.routeContext }, /* @__PURE__ */ S.createElement(
      uh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ S.createElement(Hw, { error: t }, a) : a;
  }
};
Bb.contextType = zb;
var Zf = /* @__PURE__ */ new WeakMap();
function Hw({
  children: t,
  error: a
}) {
  let { basename: l } = S.useContext(Dn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = zw(a.digest);
    if (s) {
      let o = Zf.get(a);
      if (o) throw o;
      let c = vb(s.location, l);
      if (gb && !Zf.get(a))
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
function qw({ routeContext: t, match: a, children: l }) {
  let s = S.useContext(Gi);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ S.createElement(wa.Provider, { value: t }, l);
}
function kw(t, a = [], l) {
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
        let { loaderData: x, errors: T } = s, w = b.route.loader && !x.hasOwnProperty(b.route.id) && (!T || T[b.route.id] === void 0);
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
      let T, w = !1, C = null, D = null;
      s && (T = c && b.route.id ? c[b.route.id] : void 0, C = b.route.errorElement || Bw, f && (h < 0 && x === 0 ? (qb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, D = null) : h === x && (w = !0, D = b.route.hydrateFallbackElement || null)));
      let _ = a.concat(o.slice(0, x + 1)), L = () => {
        let O;
        return T ? O = C : w ? O = D : b.route.Component ? O = /* @__PURE__ */ S.createElement(b.route.Component, null) : b.route.element ? O = b.route.element : O = y, /* @__PURE__ */ S.createElement(
          qw,
          {
            match: b,
            routeContext: {
              outlet: y,
              matches: _,
              isDataRoute: s != null
            },
            children: O
          }
        );
      };
      return s && (b.route.ErrorBoundary || b.route.errorElement || x === 0) ? /* @__PURE__ */ S.createElement(
        Bb,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: C,
          error: T,
          children: L(),
          routeContext: { outlet: null, matches: _, isDataRoute: !0 },
          onError: m
        }
      ) : L();
    },
    null
  );
}
function ch(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Pw(t) {
  let a = S.useContext(Gi);
  return _e(a, ch(t)), a;
}
function Hb(t) {
  let a = S.useContext(rs);
  return _e(a, ch(t)), a;
}
function Yw(t) {
  let a = S.useContext(wa);
  return _e(a, ch(t)), a;
}
function Su(t) {
  let a = Yw(t), l = a.matches[a.matches.length - 1];
  return _e(
    l.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), l.route.id;
}
function Gw() {
  return Su(
    "useRouteId"
    /* UseRouteId */
  );
}
function us() {
  let t = Hb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Su(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function Fw() {
  let t = S.useContext(uh), a = Hb(
    "useRouteError"
    /* UseRouteError */
  ), l = Su(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[l];
}
function $w() {
  let { router: t } = Pw(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Su(
    "useNavigate"
    /* UseNavigateStable */
  ), l = S.useRef(!1);
  return Vb(() => {
    l.current = !0;
  }), S.useCallback(
    async (o, c = {}) => {
      xt(l.current, Ub), l.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...c }));
    },
    [t, a]
  );
}
var ov = {};
function qb(t, a, l) {
  !a && !ov[t] && (ov[t] = !0, xt(!1, l));
}
var uv = {};
function cv(t, a) {
  !t && !uv[a] && (uv[a] = !0, console.warn(a));
}
var Xw = "useOptimistic", fv = uT[Xw], Iw = () => {
};
function Kw(t) {
  return fv ? fv(t) : [t, Iw];
}
function Qw(t) {
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
var Zw = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function Jw(t, a) {
  return iw({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: bT({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: Zw,
    mapRouteProperties: Qw,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var Ww = class {
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
function eR({
  router: t,
  flushSync: a,
  onError: l,
  unstable_useTransitions: s
}) {
  s = _b() || s;
  let [c, f] = S.useState(t.state), [h, p] = Kw(c), [m, y] = S.useState(), [b, x] = S.useState({
    isTransitioning: !1
  }), [T, w] = S.useState(), [C, D] = S.useState(), [_, L] = S.useState(), O = S.useRef(/* @__PURE__ */ new Map()), B = S.useCallback(
    (H, { deletedFetchers: K, newErrors: ie, flushSync: X, viewTransitionOpts: le }) => {
      ie && l && Object.values(ie).forEach(
        (Z) => l(Z, {
          location: H.location,
          params: H.matches[0]?.params ?? {},
          unstable_pattern: ls(H.matches)
        })
      ), H.fetchers.forEach((Z, N) => {
        Z.data !== void 0 && O.current.set(N, Z.data);
      }), K.forEach((Z) => O.current.delete(Z)), cv(
        X === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let G = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (cv(
        le == null || G,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !le || !G) {
        a && X ? a(() => f(H)) : s === !1 ? f(H) : S.startTransition(() => {
          s === !0 && p((Z) => dv(Z, H)), f(H);
        });
        return;
      }
      if (a && X) {
        a(() => {
          C && (T?.resolve(), C.skipTransition()), x({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: le.currentLocation,
            nextLocation: le.nextLocation
          });
        });
        let Z = t.window.document.startViewTransition(() => {
          a(() => f(H));
        });
        Z.finished.finally(() => {
          a(() => {
            w(void 0), D(void 0), y(void 0), x({ isTransitioning: !1 });
          });
        }), a(() => D(Z));
        return;
      }
      C ? (T?.resolve(), C.skipTransition(), L({
        state: H,
        currentLocation: le.currentLocation,
        nextLocation: le.nextLocation
      })) : (y(H), x({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: le.currentLocation,
        nextLocation: le.nextLocation
      }));
    },
    [
      t.window,
      a,
      C,
      T,
      s,
      p,
      l
    ]
  );
  S.useLayoutEffect(() => t.subscribe(B), [t, B]);
  let F = h.initialized;
  S.useLayoutEffect(() => {
    !F && t.state.initialized && B(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [F, B, t.state]), S.useEffect(() => {
    b.isTransitioning && !b.flushSync && w(new Ww());
  }, [b]), S.useEffect(() => {
    if (T && m && t.window) {
      let H = m, K = T.promise, ie = t.window.document.startViewTransition(async () => {
        s === !1 ? f(H) : S.startTransition(() => {
          s === !0 && p((X) => dv(X, H)), f(H);
        }), await K;
      });
      ie.finished.finally(() => {
        w(void 0), D(void 0), y(void 0), x({ isTransitioning: !1 });
      }), D(ie);
    }
  }, [
    m,
    T,
    t.window,
    s,
    p
  ]), S.useEffect(() => {
    T && m && h.location.key === m.location.key && T.resolve();
  }, [T, C, h.location, m]), S.useEffect(() => {
    !b.isTransitioning && _ && (y(_.state), x({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: _.currentLocation,
      nextLocation: _.nextLocation
    }), L(void 0));
  }, [b.isTransitioning, _]);
  let ne = S.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (H) => t.navigate(H),
    push: (H, K, ie) => t.navigate(H, {
      state: K,
      preventScrollReset: ie?.preventScrollReset
    }),
    replace: (H, K, ie) => t.navigate(H, {
      replace: !0,
      state: K,
      preventScrollReset: ie?.preventScrollReset
    })
  }), [t]), te = t.basename || "/", R = S.useMemo(
    () => ({
      router: t,
      navigator: ne,
      static: !1,
      basename: te,
      onError: l
    }),
    [t, ne, te, l]
  );
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(Gi.Provider, { value: R }, /* @__PURE__ */ S.createElement(rs.Provider, { value: h }, /* @__PURE__ */ S.createElement(Ob.Provider, { value: O.current }, /* @__PURE__ */ S.createElement(oh.Provider, { value: b }, /* @__PURE__ */ S.createElement(
    aR,
    {
      basename: te,
      location: h.location,
      navigationType: h.historyAction,
      navigator: ne,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ S.createElement(
      tR,
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
function dv(t, a) {
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
var tR = S.memo(nR);
function nR({
  routes: t,
  future: a,
  state: l,
  isStatic: s,
  onError: o
}) {
  return Uw(t, void 0, { state: l, isStatic: s, onError: o });
}
function aR({
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
  typeof l == "string" && (l = qn(l));
  let {
    pathname: m = "/",
    search: y = "",
    hash: b = "",
    state: x = null,
    key: T = "default",
    unstable_mask: w
  } = l, C = S.useMemo(() => {
    let D = jn(m, h);
    return D == null ? null : {
      location: {
        pathname: D,
        search: y,
        hash: b,
        state: x,
        key: T,
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
    T,
    s,
    w
  ]);
  return xt(
    C != null,
    `<Router basename="${h}"> is not able to match the URL "${m}${y}${b}" because it does not start with the basename, so the <Router> won't render anything.`
  ), C == null ? null : /* @__PURE__ */ S.createElement(Dn.Provider, { value: p }, /* @__PURE__ */ S.createElement(xu.Provider, { children: a, value: C }));
}
var Io = "get", Ko = "application/x-www-form-urlencoded";
function Eu(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function iR(t) {
  return Eu(t) && t.tagName.toLowerCase() === "button";
}
function lR(t) {
  return Eu(t) && t.tagName.toLowerCase() === "form";
}
function rR(t) {
  return Eu(t) && t.tagName.toLowerCase() === "input";
}
function sR(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function oR(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !sR(t);
}
var Uo = null;
function uR() {
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
var cR = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Jf(t) {
  return t != null && !cR.has(t) ? (xt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ko}"`
  ), null) : t;
}
function fR(t, a) {
  let l, s, o, c, f;
  if (lR(t)) {
    let h = t.getAttribute("action");
    s = h ? jn(h, a) : null, l = t.getAttribute("method") || Io, o = Jf(t.getAttribute("enctype")) || Ko, c = new FormData(t);
  } else if (iR(t) || rR(t) && (t.type === "submit" || t.type === "image")) {
    let h = t.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = t.getAttribute("formaction") || h.getAttribute("action");
    if (s = p ? jn(p, a) : null, l = t.getAttribute("formmethod") || h.getAttribute("method") || Io, o = Jf(t.getAttribute("formenctype")) || Jf(h.getAttribute("enctype")) || Ko, c = new FormData(h, t), !uR()) {
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
function fh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function kb(t, a, l, s) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return l ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && jn(o.pathname, a) === "/" ? o.pathname = `${ru(a)}/_root.${s}` : o.pathname = `${ru(o.pathname)}.${s}`, o;
}
async function dR(t, a) {
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
function hR(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function mR(t, a, l) {
  let s = await Promise.all(
    t.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let f = await dR(c, l);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return vR(
    s.flat(1).filter(hR).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function hv(t, a, l, s, o, c) {
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
function pR(t, a, { includeHydrateFallback: l } = {}) {
  return yR(
    t.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), l && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function yR(t) {
  return [...new Set(t)];
}
function gR(t) {
  let a = {}, l = Object.keys(t).sort();
  for (let s of l)
    a[s] = t[s];
  return a;
}
function vR(t, a) {
  let l = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((s, o) => {
    let c = JSON.stringify(gR(o));
    return l.has(c) || (l.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function dh() {
  let t = S.useContext(Gi);
  return fh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function bR() {
  let t = S.useContext(rs);
  return fh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var hh = S.createContext(void 0);
hh.displayName = "FrameworkContext";
function mh() {
  let t = S.useContext(hh);
  return fh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function xR(t, a) {
  let l = S.useContext(hh), [s, o] = S.useState(!1), [c, f] = S.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: b } = a, x = S.useRef(null);
  S.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let C = (_) => {
        _.forEach((L) => {
          f(L.isIntersecting);
        });
      }, D = new IntersectionObserver(C, { threshold: 0.5 });
      return x.current && D.observe(x.current), () => {
        D.disconnect();
      };
    }
  }, [t]), S.useEffect(() => {
    if (s) {
      let C = setTimeout(() => {
        f(!0);
      }, 100);
      return () => {
        clearTimeout(C);
      };
    }
  }, [s]);
  let T = () => {
    o(!0);
  }, w = () => {
    o(!1), f(!1);
  };
  return l ? t !== "intent" ? [c, x, {}] : [
    c,
    x,
    {
      onFocus: kr(h, T),
      onBlur: kr(p, w),
      onMouseEnter: kr(m, T),
      onMouseLeave: kr(y, w),
      onTouchStart: kr(b, T)
    }
  ] : [!1, x, {}];
}
function kr(t, a) {
  return (l) => {
    t && t(l), l.defaultPrevented || a(l);
  };
}
function SR({ page: t, ...a }) {
  let l = _b(), { router: s } = dh(), o = S.useMemo(
    () => li(s.routes, t, s.basename),
    [s.routes, t, s.basename]
  );
  return o ? l ? /* @__PURE__ */ S.createElement(TR, { page: t, matches: o, ...a }) : /* @__PURE__ */ S.createElement(wR, { page: t, matches: o, ...a }) : null;
}
function ER(t) {
  let { manifest: a, routeModules: l } = mh(), [s, o] = S.useState([]);
  return S.useEffect(() => {
    let c = !1;
    return mR(t, a, l).then(
      (f) => {
        c || o(f);
      }
    ), () => {
      c = !0;
    };
  }, [t, a, l]), s;
}
function TR({
  page: t,
  matches: a,
  ...l
}) {
  let s = Ra(), { future: o } = mh(), { basename: c } = dh(), f = S.useMemo(() => {
    if (t === s.pathname + s.search + s.hash)
      return [];
    let h = kb(
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
function wR({
  page: t,
  matches: a,
  ...l
}) {
  let s = Ra(), { future: o, manifest: c, routeModules: f } = mh(), { basename: h } = dh(), { loaderData: p, matches: m } = bR(), y = S.useMemo(
    () => hv(
      t,
      a,
      m,
      c,
      s,
      "data"
    ),
    [t, a, m, c, s]
  ), b = S.useMemo(
    () => hv(
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
    let C = /* @__PURE__ */ new Set(), D = !1;
    if (a.forEach((L) => {
      let O = c.routes[L.route.id];
      !O || !O.hasLoader || (!y.some((B) => B.route.id === L.route.id) && L.route.id in p && f[L.route.id]?.shouldRevalidate || O.hasClientLoader ? D = !0 : C.add(L.route.id));
    }), C.size === 0)
      return [];
    let _ = kb(
      t,
      h,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return D && C.size > 0 && _.searchParams.set(
      "_routes",
      a.filter((L) => C.has(L.route.id)).map((L) => L.route.id).join(",")
    ), [_.pathname + _.search];
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
  ]), T = S.useMemo(
    () => pR(b, c),
    [b, c]
  ), w = ER(b);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, x.map((C) => /* @__PURE__ */ S.createElement("link", { key: C, rel: "prefetch", as: "fetch", href: C, ...l })), T.map((C) => /* @__PURE__ */ S.createElement("link", { key: C, rel: "modulepreload", href: C, ...l })), w.map(({ key: C, link: D }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ S.createElement(
      "link",
      {
        key: C,
        nonce: l.nonce,
        ...D,
        crossOrigin: D.crossOrigin ?? l.crossOrigin
      }
    )
  )));
}
function RR(...t) {
  return (a) => {
    t.forEach((l) => {
      typeof l == "function" ? l(a) : l != null && (l.current = a);
    });
  };
}
var CR = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  CR && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Pb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, cs = S.forwardRef(
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
    unstable_defaultShouldRevalidate: T,
    ...w
  }, C) {
    let { basename: D, navigator: _, unstable_useTransitions: L } = S.useContext(Dn), O = typeof y == "string" && Pb.test(y), B = vb(y, D);
    y = B.to;
    let F = Ow(y, { relative: o }), ne = Ra(), te = null;
    if (h) {
      let Z = vu(
        h,
        [],
        ne.unstable_mask ? ne.unstable_mask.pathname : "/",
        !0
      );
      D !== "/" && (Z.pathname = Z.pathname === "/" ? D : Mn([D, Z.pathname])), te = _.createHref(Z);
    }
    let [R, H, K] = xR(
      s,
      w
    ), ie = DR(y, {
      replace: f,
      unstable_mask: h,
      state: p,
      target: m,
      preventScrollReset: b,
      relative: o,
      viewTransition: x,
      unstable_defaultShouldRevalidate: T,
      unstable_useTransitions: L
    });
    function X(Z) {
      a && a(Z), Z.defaultPrevented || ie(Z);
    }
    let le = !(B.isExternal || c), G = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ S.createElement(
        "a",
        {
          ...w,
          ...K,
          href: (le ? te : void 0) || B.absoluteURL || F,
          onClick: le ? X : a,
          ref: RR(C, H),
          target: m,
          "data-discover": !O && l === "render" ? "true" : void 0
        }
      )
    );
    return R && !O ? /* @__PURE__ */ S.createElement(S.Fragment, null, G, /* @__PURE__ */ S.createElement(SR, { page: F })) : G;
  }
);
cs.displayName = "Link";
var MR = S.forwardRef(
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
    let b = os(f, { relative: m.relative }), x = Ra(), T = S.useContext(rs), { navigator: w, basename: C } = S.useContext(Dn), D = T != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    LR(b) && h === !0, _ = w.encodeLocation ? w.encodeLocation(b).pathname : b.pathname, L = x.pathname, O = T && T.navigation && T.navigation.location ? T.navigation.location.pathname : null;
    l || (L = L.toLowerCase(), O = O ? O.toLowerCase() : null, _ = _.toLowerCase()), O && C && (O = jn(O, C) || O);
    const B = _ !== "/" && _.endsWith("/") ? _.length - 1 : _.length;
    let F = L === _ || !o && L.startsWith(_) && L.charAt(B) === "/", ne = O != null && (O === _ || !o && O.startsWith(_) && O.charAt(_.length) === "/"), te = {
      isActive: F,
      isPending: ne,
      isTransitioning: D
    }, R = F ? a : void 0, H;
    typeof s == "function" ? H = s(te) : H = [
      s,
      F ? "active" : null,
      ne ? "pending" : null,
      D ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let K = typeof c == "function" ? c(te) : c;
    return /* @__PURE__ */ S.createElement(
      cs,
      {
        ...m,
        "aria-current": R,
        className: H,
        ref: y,
        style: K,
        to: f,
        viewTransition: h
      },
      typeof p == "function" ? p(te) : p
    );
  }
);
MR.displayName = "NavLink";
var AR = S.forwardRef(
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
    ...T
  }, w) => {
    let { unstable_useTransitions: C } = S.useContext(Dn), D = _R(), _ = OR(h, { relative: m }), L = f.toLowerCase() === "get" ? "get" : "post", O = typeof h == "string" && Pb.test(h), B = (F) => {
      if (p && p(F), F.defaultPrevented) return;
      F.preventDefault();
      let ne = F.nativeEvent.submitter, te = ne?.getAttribute("formmethod") || f, R = () => D(ne || F.currentTarget, {
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
      C && l !== !1 ? S.startTransition(() => R()) : R();
    };
    return /* @__PURE__ */ S.createElement(
      "form",
      {
        ref: w,
        method: L,
        action: _,
        onSubmit: s ? p : B,
        ...T,
        "data-discover": !O && t === "render" ? "true" : void 0
      }
    );
  }
);
AR.displayName = "Form";
function jR(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Yb(t) {
  let a = S.useContext(Gi);
  return _e(a, jR(t)), a;
}
function DR(t, {
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
  let y = Fi(), b = Ra(), x = os(t, { relative: f });
  return S.useCallback(
    (T) => {
      if (oR(T, a)) {
        T.preventDefault();
        let w = l !== void 0 ? l : Jn(b) === Jn(x), C = () => y(t, {
          replace: w,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: f,
          viewTransition: h,
          unstable_defaultShouldRevalidate: p
        });
        m ? S.startTransition(() => C()) : C();
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
var NR = 0, zR = () => `__${String(++NR)}__`;
function _R() {
  let { router: t } = Yb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = S.useContext(Dn), l = Gw(), s = t.fetch, o = t.navigate;
  return S.useCallback(
    async (c, f = {}) => {
      let { action: h, method: p, encType: m, formData: y, body: b } = fR(
        c,
        a
      );
      if (f.navigate === !1) {
        let x = f.fetcherKey || zR();
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
function OR(t, { relative: a } = {}) {
  let { basename: l } = S.useContext(Dn), s = S.useContext(wa);
  _e(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...os(t || ".", { relative: a }) }, f = Ra();
  if (t == null) {
    c.search = f.search;
    let h = new URLSearchParams(c.search), p = h.getAll("index");
    if (p.some((y) => y === "")) {
      h.delete("index"), p.filter((b) => b).forEach((b) => h.append("index", b));
      let y = h.toString();
      c.search = y ? `?${y}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), l !== "/" && (c.pathname = c.pathname === "/" ? l : Mn([l, c.pathname])), Jn(c);
}
function LR(t, { relative: a } = {}) {
  let l = S.useContext(oh);
  _e(
    l != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Yb(
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
function UR(t, a, l) {
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
async function VR() {
  return ot("/deployments");
}
async function mv(t) {
  return ot(`/deployments/${t}`);
}
async function BR(t, a) {
  return ot(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function pv(t) {
  return ot(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Gb(t, a) {
  return ot("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function HR(t, a, l) {
  return ot(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(l)
    }
  );
}
async function qR(t, a) {
  await ot(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function kR(t) {
  return ot(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function PR(t, a, l = "error") {
  return ot("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: l })
  });
}
async function YR(t, a = {}) {
  const l = new URLSearchParams();
  a.limit && l.set("limit", String(a.limit)), a.status && l.set("status", a.status);
  const s = l.toString(), o = s ? `?${s}` : "";
  return ot(`/deployments/${t}/runs${o}`);
}
async function GR(t, a) {
  return ot(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function ph(t, a) {
  return ot(`/deployments/${t}/runs/${a}`);
}
async function FR(t, a) {
  return ot(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function yh(t, a) {
  return ot(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function $R(t, a) {
  return ot(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function yv(t, a, l, s) {
  return UR(
    `/deployments/${t}/runs/${a}/progress`,
    l,
    s
  );
}
async function su(t) {
  return ot(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function XR(t, a, l, s, o) {
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
async function IR(t) {
  return ot(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var KR = "mux0i60", QR = "mux0i61", ZR = "mux0i62", JR = "mux0i63";
function Yl({ count: t = "0", title: a, hint: l }) {
  return /* @__PURE__ */ g.jsxs("div", { className: KR, children: [
    /* @__PURE__ */ g.jsx("span", { className: QR, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ g.jsx("h3", { className: ZR, children: a }),
    l ? /* @__PURE__ */ g.jsx("p", { className: JR, children: l }) : null
  ] });
}
var WR = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, eC = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, tC = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, nC = "zwn3019";
function tn({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: l = "subtle",
  as: s = "section",
  children: o,
  className: c,
  style: f,
  ...h
}) {
  const p = [WR[t], tC[a], eC[l], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx(s, { className: p, style: f, ...h, children: o });
}
function aC({ children: t, className: a }) {
  const l = [nC, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx("div", { className: l, children: t });
}
var Rn = "vrkn5p0", iC = "_93p6291", lC = "_93p6292", rC = "_93p6293", sC = "_93p6294", oC = "_93p6295", uC = "_93p6296", cC = "_93p6297", fC = "_93p6298", dC = "_93p6299", hC = "_93p629a", mC = "_93p629b", pC = "_93p629c", yC = "_93p629d", gC = "_93p629e";
function vC() {
  const { deployments: t } = us(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ g.jsxs("main", { className: iC, children: [
    /* @__PURE__ */ g.jsxs("header", { className: lC, children: [
      /* @__PURE__ */ g.jsx("p", { className: rC, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ g.jsxs("h1", { className: sC, children: [
        "Direct your characters.",
        /* @__PURE__ */ g.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ g.jsx("p", { className: oC, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ g.jsxs("p", { className: uC, children: [
        /* @__PURE__ */ g.jsx("span", { className: cC, children: t.length }),
        /* @__PURE__ */ g.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs(
      tn,
      {
        density: "airy",
        elevation: "raised",
        className: fC,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ g.jsx("h2", { id: "deployments-section-list", className: Rn, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ g.jsx(
            Yl,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ g.jsx("ul", { className: dC, children: t.map((l) => /* @__PURE__ */ g.jsx("li", { children: /* @__PURE__ */ g.jsxs(cs, { to: `/${l.deploymentId}/recipe`, className: hC, children: [
            /* @__PURE__ */ g.jsx("span", { className: mC, "aria-hidden": "true", children: bC(l.displayName) }),
            /* @__PURE__ */ g.jsxs("span", { children: [
              /* @__PURE__ */ g.jsx("span", { className: pC, children: l.displayName }),
              /* @__PURE__ */ g.jsx("span", { className: yC, children: l.deploymentId })
            ] }),
            /* @__PURE__ */ g.jsx("span", { className: gC, "aria-hidden": "true", children: "→" })
          ] }) }, l.deploymentId)) })
        ]
      }
    )
  ] });
}
function bC(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
const xC = "huggingface/IndexTeam/IndexTTS-2";
async function SC(t) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(t)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function EC() {
  return ot("/runtime/health");
}
async function TC() {
  await ot("/runtime/start", { method: "POST" });
}
async function wC() {
  return ot("/runtime/stop", { method: "POST" });
}
async function RC() {
  await ot("/runtime/restart", { method: "POST" });
}
function CC(t) {
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
var MC = "g5r6d10", AC = "g5r6d11", jC = "g5r6d12", DC = "g5r6d13", NC = "g5r6d14", zC = "g5r6d15", _C = "g5r6d16", OC = "g5r6d17", gv = "g5r6d18", vv = "g5r6d19", LC = "g5r6d1a", UC = "g5r6d1b", hn = "g5r6d1c", ii = "g5r6d1d", jd = "g5r6d1e", VC = "g5r6d1f", BC = "g5r6d1g", ni = "g5r6d1h", HC = "g5r6d1i", qC = "g5r6d1j", kC = "g5r6d1k", PC = "g5r6d1l", YC = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function nn({
  severity: t,
  children: a,
  role: l,
  ariaLive: s,
  className: o,
  style: c
}) {
  const f = [YC[t], o].filter(Boolean).join(" "), h = l ?? (t === "error" ? "alert" : "status"), p = s ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ g.jsx("div", { className: f, role: h, "aria-live": p, style: c, children: a });
}
var Fb = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, $b = { sm: "_4ydn546", md: "_4ydn547", lg: "_4ydn548" };
function Ke({
  variant: t = "primary",
  size: a = "md",
  type: l = "button",
  children: s,
  className: o,
  style: c,
  ...f
}) {
  const h = [Fb[t], $b[a], o].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx("button", { type: l, className: h, style: c, ...f, children: s });
}
var GC = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, FC = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, $C = "_13bb4njb";
function Ta({
  tone: t,
  size: a = "sm",
  pulse: l = !1,
  children: s,
  className: o,
  style: c,
  title: f
}) {
  const h = [GC[a], FC[t], l ? $C : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx("span", { className: h, style: c, title: f, children: s });
}
const XC = 4e3;
function IC({ deployment: t }) {
  const a = Fi(), [l, s] = S.useState(null), [o, c] = S.useState(null), [f, h] = S.useState(!1);
  S.useEffect(() => {
    let D = !1;
    const _ = async () => {
      try {
        const O = await EC();
        D || (s(O), c(null));
      } catch (O) {
        D || c(Pr(O));
      }
    };
    _();
    const L = setInterval(_, XC);
    return () => {
      D = !0, clearInterval(L);
    };
  }, []);
  const p = S.useCallback(async () => {
    h(!0), c(null);
    try {
      await TC();
    } catch (D) {
      c(Pr(D));
    } finally {
      h(!1);
    }
  }, []), m = S.useCallback(async () => {
    h(!0);
    try {
      await wC();
    } catch (D) {
      c(Pr(D));
    } finally {
      h(!1);
    }
  }, []), y = S.useCallback(async () => {
    h(!0);
    try {
      await RC();
    } catch (D) {
      c(Pr(D));
    } finally {
      h(!1);
    }
  }, []), b = S.useCallback(async () => {
    h(!0);
    try {
      await SC(xC);
    } catch (D) {
      c(Pr(D));
    } finally {
      h(!1);
    }
  }, []), x = l?.badge ?? "not_installed", T = x === "stopped" || x === "not_installed", w = x === "ready" || x === "running" || x === "starting", C = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ g.jsxs("div", { className: ii, role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ g.jsx("span", { className: hn, children: "Runtime" }),
    /* @__PURE__ */ g.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ g.jsx("span", { className: hn, children: "Badge" }),
    /* @__PURE__ */ g.jsx(Ta, { tone: KC(x), pulse: x === "starting" || x === "installing", children: CC(x) }),
    l && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "Uptime" }),
      /* @__PURE__ */ g.jsx("span", { children: QC(l.uptimeSeconds) }),
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "VRAM" }),
      /* @__PURE__ */ g.jsxs("span", { children: [
        l.vramUsedMb,
        " / ",
        l.vramTotalMb,
        " MB"
      ] })
    ] }),
    T && /* @__PURE__ */ g.jsx(Ke, { disabled: f, onClick: p, children: "Install / Start runtime" }),
    w && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      /* @__PURE__ */ g.jsx(Ke, { variant: "danger", disabled: f, onClick: m, children: "Stop backend" }),
      /* @__PURE__ */ g.jsx(Ke, { variant: "secondary", disabled: f, onClick: y, children: "Restart" })
    ] }),
    C && /* @__PURE__ */ g.jsx(Ke, { disabled: f, onClick: b, children: "Download IndexTTS-2 model" }),
    /* @__PURE__ */ g.jsx(
      Ke,
      {
        variant: "secondary",
        onClick: () => a(`/${t.deploymentId}/mappings`),
        title: "Manage character → voice mappings (upload voice samples, edit emotion defaults)",
        children: "Mappings"
      }
    ),
    o && !C && /* @__PURE__ */ g.jsx(nn, { severity: "error", children: o })
  ] });
}
function KC(t) {
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
function QC(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Pr(t) {
  return t instanceof $i || t instanceof Error ? t.message : "unknown error";
}
async function ZC(t) {
  return ot(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function JC(t, a, l) {
  return ot("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: l })
  });
}
async function WC(t, a) {
  await ot(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var eM = "wfqeb50", tM = "wfqeb51", nM = "wfqeb52", aM = "wfqeb53", iM = "wfqeb54", lM = "wfqeb55 wfqeb54", rM = "wfqeb56", sM = "wfqeb57", Xb = "wfqeb58", Ib = "wfqeb59", Kb = "wfqeb5a", oM = "wfqeb5b", uM = "wfqeb5c", cM = "wfqeb5d", fM = "wfqeb5e", Wf = "wfqeb5f", dM = "wfqeb5g", hM = "wfqeb5h", mM = "wfqeb5i";
const gh = S.createContext({});
function vh(t) {
  const a = S.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const pM = typeof window < "u", Qb = pM ? S.useLayoutEffect : S.useEffect, Tu = /* @__PURE__ */ S.createContext(null);
function bh(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function ou(t, a) {
  const l = t.indexOf(a);
  l > -1 && t.splice(l, 1);
}
const Wn = (t, a, l) => l > a ? a : l < t ? t : l;
function bv(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let fs = () => {
}, Yi = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (fs = (t, a, l) => {
  !t && typeof console < "u" && console.warn(bv(a, l));
}, Yi = (t, a, l) => {
  if (!t)
    throw new Error(bv(a, l));
});
const ui = {}, Zb = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function Jb(t) {
  return typeof t == "object" && t !== null;
}
const Wb = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function ex(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const An = /* @__NO_SIDE_EFFECTS__ */ (t) => t, yM = (t, a) => (l) => a(t(l)), ds = (...t) => t.reduce(yM), ts = /* @__NO_SIDE_EFFECTS__ */ (t, a, l) => {
  const s = a - t;
  return s === 0 ? 1 : (l - t) / s;
};
class xh {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return bh(this.subscriptions, a), () => ou(this.subscriptions, a);
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
function tx(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const nx = (t, a, l) => (((1 - 3 * l + 3 * a) * t + (3 * l - 6 * a)) * t + 3 * a) * t, gM = 1e-7, vM = 12;
function bM(t, a, l, s, o) {
  let c, f, h = 0;
  do
    f = a + (l - a) / 2, c = nx(f, s, o) - t, c > 0 ? l = f : a = f;
  while (Math.abs(c) > gM && ++h < vM);
  return f;
}
function hs(t, a, l, s) {
  if (t === a && l === s)
    return An;
  const o = (c) => bM(c, 0, 1, t, l);
  return (c) => c === 0 || c === 1 ? c : nx(o(c), a, s);
}
const ax = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, ix = (t) => (a) => 1 - t(1 - a), lx = /* @__PURE__ */ hs(0.33, 1.53, 0.69, 0.99), Sh = /* @__PURE__ */ ix(lx), rx = /* @__PURE__ */ ax(Sh), sx = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Sh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Eh = (t) => 1 - Math.sin(Math.acos(t)), ox = ix(Eh), ux = ax(Eh), xM = /* @__PURE__ */ hs(0.42, 0, 1, 1), SM = /* @__PURE__ */ hs(0, 0, 0.58, 1), cx = /* @__PURE__ */ hs(0.42, 0, 0.58, 1), EM = (t) => Array.isArray(t) && typeof t[0] != "number", fx = (t) => Array.isArray(t) && typeof t[0] == "number", xv = {
  linear: An,
  easeIn: xM,
  easeInOut: cx,
  easeOut: SM,
  circIn: Eh,
  circInOut: ux,
  circOut: ox,
  backIn: Sh,
  backInOut: rx,
  backOut: lx,
  anticipate: sx
}, TM = (t) => typeof t == "string", Sv = (t) => {
  if (fx(t)) {
    Yi(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, l, s, o] = t;
    return hs(a, l, s, o);
  } else if (TM(t))
    return Yi(xv[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), xv[t];
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
function wM(t, a) {
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
const RM = 40;
function dx(t, a) {
  let l = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, f = Vo.reduce((O, B) => (O[B] = wM(c), O), {}), { setup: h, read: p, resolveKeyframes: m, preUpdate: y, update: b, preRender: x, render: T, postRender: w } = f, C = () => {
    const O = ui.useManualTiming, B = O ? o.timestamp : performance.now();
    l = !1, O || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(B - o.timestamp, RM), 1)), o.timestamp = B, o.isProcessing = !0, h.process(o), p.process(o), m.process(o), y.process(o), b.process(o), x.process(o), T.process(o), w.process(o), o.isProcessing = !1, l && a && (s = !1, t(C));
  }, D = () => {
    l = !0, s = !0, o.isProcessing || t(C);
  };
  return { schedule: Vo.reduce((O, B) => {
    const F = f[B];
    return O[B] = (ne, te = !1, R = !1) => (l || D(), F.schedule(ne, te, R)), O;
  }, {}), cancel: (O) => {
    for (let B = 0; B < Vo.length; B++)
      f[Vo[B]].cancel(O);
  }, state: o, steps: f };
}
const { schedule: nt, cancel: ci, state: Vt, steps: ed } = /* @__PURE__ */ dx(typeof requestAnimationFrame < "u" ? requestAnimationFrame : An, !0);
let Qo;
function CM() {
  Qo = void 0;
}
const Xt = {
  now: () => (Qo === void 0 && Xt.set(Vt.isProcessing || ui.useManualTiming ? Vt.timestamp : performance.now()), Qo),
  set: (t) => {
    Qo = t, queueMicrotask(CM);
  }
}, hx = (t) => (a) => typeof a == "string" && a.startsWith(t), mx = /* @__PURE__ */ hx("--"), MM = /* @__PURE__ */ hx("var(--"), Th = (t) => MM(t) ? AM.test(t.split("/*")[0].trim()) : !1, AM = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Ev(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const Gl = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, ns = {
  ...Gl,
  transform: (t) => Wn(0, 1, t)
}, Bo = {
  ...Gl,
  default: 1
}, Kr = (t) => Math.round(t * 1e5) / 1e5, wh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function jM(t) {
  return t == null;
}
const DM = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Rh = (t, a) => (l) => !!(typeof l == "string" && DM.test(l) && l.startsWith(t) || a && !jM(l) && Object.prototype.hasOwnProperty.call(l, a)), px = (t, a, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, f, h] = s.match(wh);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(c),
    [l]: parseFloat(f),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, NM = (t) => Wn(0, 255, t), td = {
  ...Gl,
  transform: (t) => Math.round(NM(t))
}, Hi = {
  test: /* @__PURE__ */ Rh("rgb", "red"),
  parse: /* @__PURE__ */ px("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: l, alpha: s = 1 }) => "rgba(" + td.transform(t) + ", " + td.transform(a) + ", " + td.transform(l) + ", " + Kr(ns.transform(s)) + ")"
};
function zM(t) {
  let a = "", l = "", s = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), l = t.substring(3, 5), s = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), l = t.substring(2, 3), s = t.substring(3, 4), o = t.substring(4, 5), a += a, l += l, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(l, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Dd = {
  test: /* @__PURE__ */ Rh("#"),
  parse: zM,
  transform: Hi.transform
}, ms = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), ai = /* @__PURE__ */ ms("deg"), Zn = /* @__PURE__ */ ms("%"), ye = /* @__PURE__ */ ms("px"), _M = /* @__PURE__ */ ms("vh"), OM = /* @__PURE__ */ ms("vw"), Tv = {
  ...Zn,
  parse: (t) => Zn.parse(t) / 100,
  transform: (t) => Zn.transform(t * 100)
}, Ll = {
  test: /* @__PURE__ */ Rh("hsl", "hue"),
  parse: /* @__PURE__ */ px("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + Zn.transform(Kr(a)) + ", " + Zn.transform(Kr(l)) + ", " + Kr(ns.transform(s)) + ")"
}, Mt = {
  test: (t) => Hi.test(t) || Dd.test(t) || Ll.test(t),
  parse: (t) => Hi.test(t) ? Hi.parse(t) : Ll.test(t) ? Ll.parse(t) : Dd.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Hi.transform(t) : Ll.transform(t),
  getAnimatableNone: (t) => {
    const a = Mt.parse(t);
    return a.alpha = 0, Mt.transform(a);
  }
}, LM = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function UM(t) {
  return isNaN(t) && typeof t == "string" && (t.match(wh)?.length || 0) + (t.match(LM)?.length || 0) > 0;
}
const yx = "number", gx = "color", VM = "var", BM = "var(", wv = "${}", HM = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ql(t) {
  const a = t.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const h = a.replace(HM, (p) => (Mt.test(p) ? (s.color.push(c), o.push(gx), l.push(Mt.parse(p))) : p.startsWith(BM) ? (s.var.push(c), o.push(VM), l.push(p)) : (s.number.push(c), o.push(yx), l.push(parseFloat(p))), ++c, wv)).split(wv);
  return { values: l, split: h, indexes: s, types: o };
}
function qM(t) {
  return ql(t).values;
}
function vx({ split: t, types: a }) {
  const l = t.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < l; c++)
      if (o += t[c], s[c] !== void 0) {
        const f = a[c];
        f === yx ? o += Kr(s[c]) : f === gx ? o += Mt.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function kM(t) {
  return vx(ql(t));
}
const PM = (t) => typeof t == "number" ? 0 : Mt.test(t) ? Mt.getAnimatableNone(t) : t, YM = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : PM(t);
function GM(t) {
  const a = ql(t);
  return vx(a)(a.values.map((s, o) => YM(s, a.split[o])));
}
const Hn = {
  test: UM,
  parse: qM,
  createTransformer: kM,
  getAnimatableNone: GM
};
function nd(t, a, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? t + (a - t) * 6 * l : l < 1 / 2 ? a : l < 2 / 3 ? t + (a - t) * (2 / 3 - l) * 6 : t;
}
function FM({ hue: t, saturation: a, lightness: l, alpha: s }) {
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
}, $M = [Dd, Hi, Ll], XM = (t) => $M.find((a) => a.test(t));
function Rv(t) {
  const a = XM(t);
  if (fs(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let l = a.parse(t);
  return a === Ll && (l = FM(l)), l;
}
const Cv = (t, a) => {
  const l = Rv(t), s = Rv(a);
  if (!l || !s)
    return uu(t, a);
  const o = { ...l };
  return (c) => (o.red = ad(l.red, s.red, c), o.green = ad(l.green, s.green, c), o.blue = ad(l.blue, s.blue, c), o.alpha = st(l.alpha, s.alpha, c), Hi.transform(o));
}, Nd = /* @__PURE__ */ new Set(["none", "hidden"]);
function IM(t, a) {
  return Nd.has(t) ? (l) => l <= 0 ? t : a : (l) => l >= 1 ? a : t;
}
function KM(t, a) {
  return (l) => st(t, a, l);
}
function Ch(t) {
  return typeof t == "number" ? KM : typeof t == "string" ? Th(t) ? uu : Mt.test(t) ? Cv : JM : Array.isArray(t) ? bx : typeof t == "object" ? Mt.test(t) ? Cv : QM : uu;
}
function bx(t, a) {
  const l = [...t], s = l.length, o = t.map((c, f) => Ch(c)(c, a[f]));
  return (c) => {
    for (let f = 0; f < s; f++)
      l[f] = o[f](c);
    return l;
  };
}
function QM(t, a) {
  const l = { ...t, ...a }, s = {};
  for (const o in l)
    t[o] !== void 0 && a[o] !== void 0 && (s[o] = Ch(t[o])(t[o], a[o]));
  return (o) => {
    for (const c in s)
      l[c] = s[c](o);
    return l;
  };
}
function ZM(t, a) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], f = t.indexes[c][s[c]], h = t.values[f] ?? 0;
    l[o] = h, s[c]++;
  }
  return l;
}
const JM = (t, a) => {
  const l = Hn.createTransformer(a), s = ql(t), o = ql(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Nd.has(t) && !o.values.length || Nd.has(a) && !s.values.length ? IM(t, a) : ds(bx(ZM(s, o), o.values), l) : (fs(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), uu(t, a));
};
function xx(t, a, l) {
  return typeof t == "number" && typeof a == "number" && typeof l == "number" ? st(t, a, l) : Ch(t)(t, a);
}
const WM = (t) => {
  const a = ({ timestamp: l }) => t(l);
  return {
    start: (l = !0) => nt.update(a, l),
    stop: () => ci(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Vt.isProcessing ? Vt.timestamp : Xt.now()
  };
}, Sx = (t, a, l = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / l), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(t(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, cu = 2e4;
function Mh(t) {
  let a = 0;
  const l = 50;
  let s = t.next(a);
  for (; !s.done && a < cu; )
    a += l, s = t.next(a);
  return a >= cu ? 1 / 0 : a;
}
function eA(t, a = 100, l) {
  const s = l({ ...t, keyframes: [0, a] }), o = Math.min(Mh(s), cu);
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
function zd(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const tA = 12;
function nA(t, a, l) {
  let s = l;
  for (let o = 1; o < tA; o++)
    s = s - t(s) / a(s);
  return s;
}
const id = 1e-3;
function aA({ duration: t = dt.duration, bounce: a = dt.bounce, velocity: l = dt.velocity, mass: s = dt.mass }) {
  let o, c;
  fs(t <= /* @__PURE__ */ an(dt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = Wn(dt.minDamping, dt.maxDamping, f), t = Wn(dt.minDuration, dt.maxDuration, /* @__PURE__ */ Cn(t)), f < 1 ? (o = (m) => {
    const y = m * f, b = y * t, x = y - l, T = zd(m, f), w = Math.exp(-b);
    return id - x / T * w;
  }, c = (m) => {
    const b = m * f * t, x = b * l + l, T = Math.pow(f, 2) * Math.pow(m, 2) * t, w = Math.exp(-b), C = zd(Math.pow(m, 2), f);
    return (-o(m) + id > 0 ? -1 : 1) * ((x - T) * w) / C;
  }) : (o = (m) => {
    const y = Math.exp(-m * t), b = (m - l) * t + 1;
    return -id + y * b;
  }, c = (m) => {
    const y = Math.exp(-m * t), b = (l - m) * (t * t);
    return y * b;
  });
  const h = 5 / t, p = nA(o, c, h);
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
const iA = ["duration", "bounce"], lA = ["stiffness", "damping", "mass"];
function Mv(t, a) {
  return a.some((l) => t[l] !== void 0);
}
function rA(t) {
  let a = {
    velocity: dt.velocity,
    stiffness: dt.stiffness,
    damping: dt.damping,
    mass: dt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Mv(t, lA) && Mv(t, iA))
    if (a.velocity = 0, t.visualDuration) {
      const l = t.visualDuration, s = 2 * Math.PI / (l * 1.2), o = s * s, c = 2 * Wn(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: dt.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const l = aA({ ...t, velocity: 0 });
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
  const c = l.keyframes[0], f = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: p, damping: m, mass: y, duration: b, velocity: x, isResolvedFromDuration: T } = rA({
    ...l,
    velocity: -/* @__PURE__ */ Cn(l.velocity || 0)
  }), w = x || 0, C = m / (2 * Math.sqrt(p * y)), D = f - c, _ = /* @__PURE__ */ Cn(Math.sqrt(p / y)), L = Math.abs(D) < 5;
  s || (s = L ? dt.restSpeed.granular : dt.restSpeed.default), o || (o = L ? dt.restDelta.granular : dt.restDelta.default);
  let O, B, F, ne, te, R;
  if (C < 1)
    F = zd(_, C), ne = (w + C * _ * D) / F, O = (K) => {
      const ie = Math.exp(-C * _ * K);
      return f - ie * (ne * Math.sin(F * K) + D * Math.cos(F * K));
    }, te = C * _ * ne + D * F, R = C * _ * D - ne * F, B = (K) => Math.exp(-C * _ * K) * (te * Math.sin(F * K) + R * Math.cos(F * K));
  else if (C === 1) {
    O = (ie) => f - Math.exp(-_ * ie) * (D + (w + _ * D) * ie);
    const K = w + _ * D;
    B = (ie) => Math.exp(-_ * ie) * (_ * K * ie - w);
  } else {
    const K = _ * Math.sqrt(C * C - 1);
    O = (G) => {
      const Z = Math.exp(-C * _ * G), N = Math.min(K * G, 300);
      return f - Z * ((w + C * _ * D) * Math.sinh(N) + K * D * Math.cosh(N)) / K;
    };
    const ie = (w + C * _ * D) / K, X = C * _ * ie - D * K, le = C * _ * D - ie * K;
    B = (G) => {
      const Z = Math.exp(-C * _ * G), N = Math.min(K * G, 300);
      return Z * (X * Math.sinh(N) + le * Math.cosh(N));
    };
  }
  const H = {
    calculatedDuration: T && b || null,
    velocity: (K) => /* @__PURE__ */ an(B(K)),
    next: (K) => {
      if (!T && C < 1) {
        const X = Math.exp(-C * _ * K), le = Math.sin(F * K), G = Math.cos(F * K), Z = f - X * (ne * le + D * G), N = /* @__PURE__ */ an(X * (te * le + R * G));
        return h.done = Math.abs(N) <= s && Math.abs(f - Z) <= o, h.value = h.done ? f : Z, h;
      }
      const ie = O(K);
      if (T)
        h.done = K >= b;
      else {
        const X = /* @__PURE__ */ an(B(K));
        h.done = Math.abs(X) <= s && Math.abs(f - ie) <= o;
      }
      return h.value = h.done ? f : ie, h;
    },
    toString: () => {
      const K = Math.min(Mh(H), cu), ie = Sx((X) => H.next(K * X).value, K, 30);
      return K + "ms " + ie;
    },
    toTransition: () => {
    }
  };
  return H;
}
fu.applyToOptions = (t) => {
  const a = eA(t, 100, fu);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ an(a.duration), t.type = "keyframes", t;
};
const sA = 5;
function Ex(t, a, l) {
  const s = Math.max(a - sA, 0);
  return tx(l - t(s), a - s);
}
function _d({ keyframes: t, velocity: a = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: f, min: h, max: p, restDelta: m = 0.5, restSpeed: y }) {
  const b = t[0], x = {
    done: !1,
    value: b
  }, T = (R) => h !== void 0 && R < h || p !== void 0 && R > p, w = (R) => h === void 0 ? p : p === void 0 || Math.abs(h - R) < Math.abs(p - R) ? h : p;
  let C = l * a;
  const D = b + C, _ = f === void 0 ? D : f(D);
  _ !== D && (C = _ - b);
  const L = (R) => -C * Math.exp(-R / s), O = (R) => _ + L(R), B = (R) => {
    const H = L(R), K = O(R);
    x.done = Math.abs(H) <= m, x.value = x.done ? _ : K;
  };
  let F, ne;
  const te = (R) => {
    T(x.value) && (F = R, ne = fu({
      keyframes: [x.value, w(x.value)],
      velocity: Ex(O, R, x.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: m,
      restSpeed: y
    }));
  };
  return te(0), {
    calculatedDuration: null,
    next: (R) => {
      let H = !1;
      return !ne && F === void 0 && (H = !0, B(R), te(R)), F !== void 0 && R >= F ? ne.next(R - F) : (!H && B(R), x);
    }
  };
}
function oA(t, a, l) {
  const s = [], o = l || ui.mix || xx, c = t.length - 1;
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
function uA(t, a, { clamp: l = !0, ease: s, mixer: o } = {}) {
  const c = t.length;
  if (Yi(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[c - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const h = oA(a, s, o), p = h.length, m = (y) => {
    if (f && y < t[0])
      return a[0];
    let b = 0;
    if (p > 1)
      for (; b < t.length - 2 && !(y < t[b + 1]); b++)
        ;
    const x = /* @__PURE__ */ ts(t[b], t[b + 1], y);
    return h[b](x);
  };
  return l ? (y) => m(Wn(t[0], t[c - 1], y)) : m;
}
function cA(t, a) {
  const l = t[t.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ ts(0, a, s);
    t.push(st(l, 1, o));
  }
}
function fA(t) {
  const a = [0];
  return cA(a, t.length - 1), a;
}
function dA(t, a) {
  return t.map((l) => l * a);
}
function hA(t, a) {
  return t.map(() => a || cx).splice(0, t.length - 1);
}
function Qr({ duration: t = 300, keyframes: a, times: l, ease: s = "easeInOut" }) {
  const o = EM(s) ? s.map(Sv) : Sv(s), c = {
    done: !1,
    value: a[0]
  }, f = dA(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === a.length ? l : fA(a),
    t
  ), h = uA(f, a, {
    ease: Array.isArray(o) ? o : hA(a, o)
  });
  return {
    calculatedDuration: t,
    next: (p) => (c.value = h(p), c.done = p >= t, c)
  };
}
const mA = (t) => t !== null;
function wu(t, { repeat: a, repeatType: l = "loop" }, s, o = 1) {
  const c = t.filter(mA), h = o < 0 || a && l !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const pA = {
  decay: _d,
  inertia: _d,
  tween: Qr,
  keyframes: Qr,
  spring: fu
};
function Tx(t) {
  typeof t.type == "string" && (t.type = pA[t.type]);
}
class Ah {
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
const yA = (t) => t / 100;
class du extends Ah {
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
    Tx(a);
    const { type: l = Qr, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: f = 0 } = a;
    let { keyframes: h } = a;
    const p = l || Qr;
    p !== Qr && typeof h[0] != "number" && (this.mixKeyframes = ds(yA, xx(h[0], h[1])), h = [0, 100]);
    const m = p({ ...a, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = p({
      ...a,
      keyframes: [...h].reverse(),
      velocity: -f
    })), m.calculatedDuration === null && (m.calculatedDuration = Mh(m));
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
    const { delay: m = 0, keyframes: y, repeat: b, repeatType: x, repeatDelay: T, type: w, onUpdate: C, finalKeyframe: D } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), l ? this.currentTime = a : this.updateTime(a);
    const _ = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), L = this.playbackSpeed >= 0 ? _ < 0 : _ > o;
    this.currentTime = Math.max(_, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let O = this.currentTime, B = s;
    if (b) {
      const R = Math.min(this.currentTime, o) / h;
      let H = Math.floor(R), K = R % 1;
      !K && R >= 1 && (K = 1), K === 1 && H--, H = Math.min(H, b + 1), !!(H % 2) && (x === "reverse" ? (K = 1 - K, T && (K -= T / h)) : x === "mirror" && (B = f)), O = Wn(0, 1, K) * h;
    }
    let F;
    L ? (this.delayState.value = y[0], F = this.delayState) : F = B.next(O), c && !L && (F.value = c(F.value));
    let { done: ne } = F;
    !L && p !== null && (ne = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const te = this.holdTime === null && (this.state === "finished" || this.state === "running" && ne);
    return te && w !== _d && (F.value = wu(y, this.options, D, this.speed)), C && C(F.value), te && this.finish(), F;
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
    return Ex((s) => this.generator.next(s).value, a, l);
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
    const { driver: a = WM, startTime: l } = this.options;
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
function gA(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const qi = (t) => t * 180 / Math.PI, Od = (t) => {
  const a = qi(Math.atan2(t[1], t[0]));
  return Ld(a);
}, vA = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Od,
  rotateZ: Od,
  skewX: (t) => qi(Math.atan(t[1])),
  skewY: (t) => qi(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Ld = (t) => (t = t % 360, t < 0 && (t += 360), t), Av = Od, jv = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), Dv = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), bA = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: jv,
  scaleY: Dv,
  scale: (t) => (jv(t) + Dv(t)) / 2,
  rotateX: (t) => Ld(qi(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Ld(qi(Math.atan2(-t[2], t[0]))),
  rotateZ: Av,
  rotate: Av,
  skewX: (t) => qi(Math.atan(t[4])),
  skewY: (t) => qi(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Ud(t) {
  return t.includes("scale") ? 1 : 0;
}
function Vd(t, a) {
  if (!t || t === "none")
    return Ud(a);
  const l = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (l)
    s = bA, o = l;
  else {
    const h = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = vA, o = h;
  }
  if (!o)
    return Ud(a);
  const c = s[a], f = o[1].split(",").map(SA);
  return typeof c == "function" ? c(f) : f[c];
}
const xA = (t, a) => {
  const { transform: l = "none" } = getComputedStyle(t);
  return Vd(l, a);
};
function SA(t) {
  return parseFloat(t.trim());
}
const Fl = [
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
], $l = new Set(Fl), Nv = (t) => t === Gl || t === ye, EA = /* @__PURE__ */ new Set(["x", "y", "z"]), TA = Fl.filter((t) => !EA.has(t));
function wA(t) {
  const a = [];
  return TA.forEach((l) => {
    const s = t.getValue(l);
    s !== void 0 && (a.push([l, s.get()]), s.set(l.startsWith("scale") ? 1 : 0));
  }), a;
}
const oi = {
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
  x: (t, { transform: a }) => Vd(a, "x"),
  y: (t, { transform: a }) => Vd(a, "y")
};
oi.translateX = oi.x;
oi.translateY = oi.y;
const ki = /* @__PURE__ */ new Set();
let Bd = !1, Hd = !1, qd = !1;
function wx() {
  if (Hd) {
    const t = Array.from(ki).filter((s) => s.needsMeasurement), a = new Set(t.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = wA(s);
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
  Hd = !1, Bd = !1, ki.forEach((t) => t.complete(qd)), ki.clear();
}
function Rx() {
  ki.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Hd = !0);
  });
}
function RA() {
  qd = !0, Rx(), wx(), qd = !1;
}
class jh {
  constructor(a, l, s, o, c, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = l, this.name = s, this.motionValue = o, this.element = c, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ki.add(this), Bd || (Bd = !0, nt.read(Rx), nt.resolveKeyframes(wx))) : (this.readKeyframes(), this.complete());
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
    gA(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), ki.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ki.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const CA = (t) => t.startsWith("--");
function Cx(t, a, l) {
  CA(a) ? t.style.setProperty(a, l) : t.style[a] = l;
}
const MA = {};
function Mx(t, a) {
  const l = /* @__PURE__ */ ex(t);
  return () => MA[a] ?? l();
}
const AA = /* @__PURE__ */ Mx(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Ax = /* @__PURE__ */ Mx(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Xr = ([t, a, l, s]) => `cubic-bezier(${t}, ${a}, ${l}, ${s})`, zv = {
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
function jx(t, a) {
  if (t)
    return typeof t == "function" ? Ax() ? Sx(t, a) : "ease-out" : fx(t) ? Xr(t) : Array.isArray(t) ? t.map((l) => jx(l, a) || zv.easeOut) : zv[t];
}
function jA(t, a, l, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: f = "loop", ease: h = "easeOut", times: p } = {}, m = void 0) {
  const y = {
    [a]: l
  };
  p && (y.offset = p);
  const b = jx(h, o);
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
function Dx(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function DA({ type: t, ...a }) {
  return Dx(t) && Ax() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class Nx extends Ah {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: l, name: s, keyframes: o, pseudoElement: c, allowFlatten: f = !1, finalKeyframe: h, onComplete: p } = a;
    this.isPseudoElement = !!c, this.allowFlatten = f, this.options = a, Yi(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = DA(a);
    this.animation = jA(l, s, o, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const y = wu(o, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(y), Cx(l, s, y), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && AA() ? (this.animation.timeline = a, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), An) : o(this);
  }
}
const zx = {
  anticipate: sx,
  backInOut: rx,
  circInOut: ux
};
function NA(t) {
  return t in zx;
}
function zA(t) {
  typeof t.ease == "string" && NA(t.ease) && (t.ease = zx[t.ease]);
}
const ld = 10;
class _A extends Nx {
  constructor(a) {
    zA(a), Tx(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    }), p = Math.max(ld, Xt.now() - this.startTime), m = Wn(0, ld, p - ld), y = h.sample(p).value, { name: b } = this.options;
    c && b && Cx(c, b, y), l.setWithVelocity(h.sample(Math.max(0, p - m)).value, y, m), h.stop();
  }
}
const _v = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(Hn.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function OA(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let l = 0; l < t.length; l++)
    if (t[l] !== a)
      return !0;
}
function LA(t, a, l, s) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = t[t.length - 1], f = _v(o, a), h = _v(c, a);
  return fs(f === h, `You are trying to animate ${a} from "${o}" to "${c}". "${f ? c : o}" is not an animatable value.`, "value-not-animatable"), !f || !h ? !1 : OA(t) || (l === "spring" || Dx(l)) && s;
}
function kd(t) {
  t.duration = 0, t.type = "keyframes";
}
const _x = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), UA = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function VA(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && UA.test(t[a]))
      return !0;
  return !1;
}
const BA = /* @__PURE__ */ new Set([
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
]), HA = /* @__PURE__ */ ex(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function qA(t) {
  const { motionValue: a, name: l, repeatDelay: s, repeatType: o, damping: c, type: f, keyframes: h } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: y } = a.owner.getProps();
  return HA() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (_x.has(l) || BA.has(l) && VA(h)) && (l !== "transform" || !y) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && c !== 0 && f !== "inertia";
}
const kA = 40;
class PA extends Ah {
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
    }, T = y?.KeyframeResolver || jh;
    this.keyframeResolver = new T(h, (w, C, D) => this.onKeyframesResolved(w, C, x, !D), p, m, y), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, l, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: f, velocity: h, delay: p, isHandoff: m, onUpdate: y } = s;
    this.resolvedAt = Xt.now();
    let b = !0;
    LA(a, c, f, h) || (b = !1, (ui.instantAnimations || !p) && y?.(wu(a, s, l)), a[0] = a[a.length - 1], kd(s), s.repeat = 0);
    const T = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > kA ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: a
    }, w = b && !m && qA(T), C = T.motionValue?.owner?.current;
    let D;
    if (w)
      try {
        D = new _A({
          ...T,
          element: C
        });
      } catch {
        D = new du(T);
      }
    else
      D = new du(T);
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
    return this._animation || (this.keyframeResolver?.resume(), RA()), this._animation;
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
function Ox(t, a, l, s = 0, o = 1) {
  const c = Array.from(t).sort((m, y) => m.sortNodePosition(y)).indexOf(a), f = t.size, h = (f - 1) * s;
  return typeof l == "function" ? l(c, f) : o === 1 ? c * s : h - c * s;
}
const YA = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function GA(t) {
  const a = YA.exec(t);
  if (!a)
    return [,];
  const [, l, s, o] = a;
  return [`--${l ?? s}`, o];
}
const FA = 4;
function Lx(t, a, l = 1) {
  Yi(l <= FA, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = GA(t);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const f = c.trim();
    return Zb(f) ? parseFloat(f) : f;
  }
  return Th(o) ? Lx(o, a, l + 1) : o;
}
const $A = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, XA = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), IA = {
  type: "keyframes",
  duration: 0.8
}, KA = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, QA = (t, { keyframes: a }) => a.length > 2 ? IA : $l.has(t) ? t.startsWith("scale") ? XA(a[1]) : $A : KA;
function Ux(t, a) {
  if (t?.inherit && a) {
    const { inherit: l, ...s } = t;
    return { ...a, ...s };
  }
  return t;
}
function Dh(t, a) {
  const l = t?.[a] ?? t?.default ?? t;
  return l !== t ? Ux(l, t) : l;
}
const ZA = /* @__PURE__ */ new Set([
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
function JA(t) {
  for (const a in t)
    if (!ZA.has(a))
      return !0;
  return !1;
}
const Nh = (t, a, l, s = {}, o, c) => (f) => {
  const h = Dh(s, t) || {}, p = h.delay || s.delay || 0;
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
  JA(h) || Object.assign(y, QA(t, y)), y.duration && (y.duration = /* @__PURE__ */ an(y.duration)), y.repeatDelay && (y.repeatDelay = /* @__PURE__ */ an(y.repeatDelay)), y.from !== void 0 && (y.keyframes[0] = y.from);
  let b = !1;
  if ((y.type === !1 || y.duration === 0 && !y.repeatDelay) && (kd(y), y.delay === 0 && (b = !0)), (ui.instantAnimations || ui.skipAnimations || o?.shouldSkipAnimations) && (b = !0, kd(y), y.delay = 0), y.allowFlatten = !h.type && !h.ease, b && !c && a.get() !== void 0) {
    const x = wu(y.keyframes, h);
    if (x !== void 0) {
      nt.update(() => {
        y.onUpdate(x), y.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new du(y) : new PA(y);
};
function Ov(t) {
  const a = [{}, {}];
  return t?.values.forEach((l, s) => {
    a[0][s] = l.get(), a[1][s] = l.getVelocity();
  }), a;
}
function zh(t, a, l, s) {
  if (typeof a == "function") {
    const [o, c] = Ov(s);
    a = a(l !== void 0 ? l : t.custom, o, c);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, c] = Ov(s);
    a = a(l !== void 0 ? l : t.custom, o, c);
  }
  return a;
}
function Pi(t, a, l) {
  const s = t.getProps();
  return zh(s, a, l !== void 0 ? l : s.custom, t);
}
const Vx = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Fl
]), Lv = 30, WA = (t) => !isNaN(parseFloat(t));
class ej {
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
    this.current = a, this.updatedAt = Xt.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = WA(this.current));
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > Lv)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, Lv);
    return tx(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
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
function kl(t, a) {
  return new ej(t, a);
}
const Pd = (t) => Array.isArray(t);
function tj(t, a, l) {
  t.hasValue(a) ? t.getValue(a).set(l) : t.addValue(a, kl(l));
}
function nj(t) {
  return Pd(t) ? t[t.length - 1] || 0 : t;
}
function aj(t, a) {
  const l = Pi(t, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const f in c) {
    const h = nj(c[f]);
    tj(t, f, h);
  }
}
const Bt = (t) => !!(t && t.getVelocity);
function ij(t) {
  return !!(Bt(t) && t.add);
}
function Yd(t, a) {
  const l = t.getValue("willChange");
  if (ij(l))
    return l.add(a);
  if (!l && ui.WillChange) {
    const s = new ui.WillChange("auto");
    t.addValue("willChange", s), s.add(a);
  }
}
function _h(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const lj = "framerAppearId", Bx = "data-" + _h(lj);
function Hx(t) {
  return t.props[Bx];
}
function rj({ protectedKeys: t, needsAnimating: a }, l) {
  const s = t.hasOwnProperty(l) && a[l] !== !0;
  return a[l] = !1, s;
}
function qx(t, a, { delay: l = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: f, ...h } = a;
  const p = t.getDefaultTransition();
  c = c ? Ux(c, p) : p;
  const m = c?.reduceMotion;
  s && (c = s);
  const y = [], b = o && t.animationState && t.animationState.getState()[o];
  for (const x in h) {
    const T = t.getValue(x, t.latestValues[x] ?? null), w = h[x];
    if (w === void 0 || b && rj(b, x))
      continue;
    const C = {
      delay: l,
      ...Dh(c || {}, x)
    }, D = T.get();
    if (D !== void 0 && !T.isAnimating() && !Array.isArray(w) && w === D && !C.velocity) {
      nt.update(() => T.set(w));
      continue;
    }
    let _ = !1;
    if (window.MotionHandoffAnimation) {
      const B = Hx(t);
      if (B) {
        const F = window.MotionHandoffAnimation(B, x, nt);
        F !== null && (C.startTime = F, _ = !0);
      }
    }
    Yd(t, x);
    const L = m ?? t.shouldReduceMotion;
    T.start(Nh(x, T, w, L && Vx.has(x) ? { type: !1 } : C, t, _));
    const O = T.animation;
    O && y.push(O);
  }
  if (f) {
    const x = () => nt.update(() => {
      f && aj(t, f);
    });
    y.length ? Promise.all(y).then(x) : x();
  }
  return y;
}
function Gd(t, a, l = {}) {
  const s = Pi(t, a, l.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (o = l.transitionOverride);
  const c = s ? () => Promise.all(qx(t, s, l)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (p = 0) => {
    const { delayChildren: m = 0, staggerChildren: y, staggerDirection: b } = o;
    return sj(t, a, p, m, y, b, l);
  } : () => Promise.resolve(), { when: h } = o;
  if (h) {
    const [p, m] = h === "beforeChildren" ? [c, f] : [f, c];
    return p().then(() => m());
  } else
    return Promise.all([c(), f(l.delay)]);
}
function sj(t, a, l = 0, s = 0, o = 0, c = 1, f) {
  const h = [];
  for (const p of t.variantChildren)
    p.notify("AnimationStart", a), h.push(Gd(p, a, {
      ...f,
      delay: l + (typeof s == "function" ? 0 : s) + Ox(t.variantChildren, p, s, o, c)
    }).then(() => p.notify("AnimationComplete", a)));
  return Promise.all(h);
}
function oj(t, a, l = {}) {
  t.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => Gd(t, c, l));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = Gd(t, a, l);
  else {
    const o = typeof a == "function" ? Pi(t, a, l.custom) : a;
    s = Promise.all(qx(t, o, l));
  }
  return s.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const uj = {
  test: (t) => t === "auto",
  parse: (t) => t
}, kx = (t) => (a) => a.test(t), Px = [Gl, ye, Zn, ai, OM, _M, uj], Uv = (t) => Px.find(kx(t));
function cj(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || Wb(t) : !0;
}
const fj = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function dj(t) {
  const [a, l] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [s] = l.match(wh) || [];
  if (!s)
    return t;
  const o = l.replace(s, "");
  let c = fj.has(a) ? 1 : 0;
  return s !== l && (c *= 100), a + "(" + c + o + ")";
}
const hj = /\b([a-z-]*)\(.*?\)/gu, Fd = {
  ...Hn,
  getAnimatableNone: (t) => {
    const a = t.match(hj);
    return a ? a.map(dj).join(" ") : t;
  }
}, $d = {
  ...Hn,
  getAnimatableNone: (t) => {
    const a = Hn.parse(t);
    return Hn.createTransformer(t)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, Vv = {
  ...Gl,
  transform: Math.round
}, mj = {
  rotate: ai,
  rotateX: ai,
  rotateY: ai,
  rotateZ: ai,
  scale: Bo,
  scaleX: Bo,
  scaleY: Bo,
  scaleZ: Bo,
  skew: ai,
  skewX: ai,
  skewY: ai,
  distance: ye,
  translateX: ye,
  translateY: ye,
  translateZ: ye,
  x: ye,
  y: ye,
  z: ye,
  perspective: ye,
  transformPerspective: ye,
  opacity: ns,
  originX: Tv,
  originY: Tv,
  originZ: ye
}, Oh = {
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
  ...mj,
  zIndex: Vv,
  // SVG
  fillOpacity: ns,
  strokeOpacity: ns,
  numOctaves: Vv
}, pj = {
  ...Oh,
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
  mask: $d,
  WebkitMask: $d
}, Yx = (t) => pj[t], yj = /* @__PURE__ */ new Set([Fd, $d]);
function Gx(t, a) {
  let l = Yx(t);
  return yj.has(l) || (l = Hn), l.getAnimatableNone ? l.getAnimatableNone(a) : void 0;
}
const gj = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function vj(t, a, l) {
  let s = 0, o;
  for (; s < t.length && !o; ) {
    const c = t[s];
    typeof c == "string" && !gj.has(c) && ql(c).values.length && (o = t[s]), s++;
  }
  if (o && l)
    for (const c of a)
      t[c] = Gx(l, o);
}
class bj extends jh {
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
      if (typeof b == "string" && (b = b.trim(), Th(b))) {
        const x = Lx(b, l.current);
        x !== void 0 && (a[y] = x), y === a.length - 1 && (this.finalKeyframe = b);
      }
    }
    if (this.resolveNoneKeyframes(), !Vx.has(s) || a.length !== 2)
      return;
    const [o, c] = a, f = Uv(o), h = Uv(c), p = Ev(o), m = Ev(c);
    if (p !== m && oi[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== h)
      if (Nv(f) && Nv(h))
        for (let y = 0; y < a.length; y++) {
          const b = a[y];
          typeof b == "string" && (a[y] = parseFloat(b));
        }
      else oi[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: l } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || cj(a[o])) && s.push(o);
    s.length && vj(a, s, l);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: l, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = oi[s](a.measureViewportBox(), window.getComputedStyle(a.current)), l[0] = this.measuredOrigin;
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
    s[c] = oi[l](a.measureViewportBox(), window.getComputedStyle(a.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([h, p]) => {
      a.getValue(h).set(p);
    }), this.resolveNoneKeyframes();
  }
}
function Fx(t, a, l) {
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
const $x = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function Zo(t) {
  return Jb(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: Lh } = /* @__PURE__ */ dx(queueMicrotask, !1), Bn = {
  x: !1,
  y: !1
};
function Xx() {
  return Bn.x || Bn.y;
}
function xj(t) {
  return t === "x" || t === "y" ? Bn[t] ? null : (Bn[t] = !0, () => {
    Bn[t] = !1;
  }) : Bn.x || Bn.y ? null : (Bn.x = Bn.y = !0, () => {
    Bn.x = Bn.y = !1;
  });
}
function Ix(t, a) {
  const l = Fx(t), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [l, o, () => s.abort()];
}
function Sj(t) {
  return !(t.pointerType === "touch" || Xx());
}
function Ej(t, a, l = {}) {
  const [s, o, c] = Ix(t, l);
  return s.forEach((f) => {
    let h = !1, p = !1, m;
    const y = () => {
      f.removeEventListener("pointerleave", w);
    }, b = (D) => {
      m && (m(D), m = void 0), y();
    }, x = (D) => {
      h = !1, window.removeEventListener("pointerup", x), window.removeEventListener("pointercancel", x), p && (p = !1, b(D));
    }, T = () => {
      h = !0, window.addEventListener("pointerup", x, o), window.addEventListener("pointercancel", x, o);
    }, w = (D) => {
      if (D.pointerType !== "touch") {
        if (h) {
          p = !0;
          return;
        }
        b(D);
      }
    }, C = (D) => {
      if (!Sj(D))
        return;
      p = !1;
      const _ = a(f, D);
      typeof _ == "function" && (m = _, f.addEventListener("pointerleave", w, o));
    };
    f.addEventListener("pointerenter", C, o), f.addEventListener("pointerdown", T, o);
  }), c;
}
const Kx = (t, a) => a ? t === a ? !0 : Kx(t, a.parentElement) : !1, Uh = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Tj = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function wj(t) {
  return Tj.has(t.tagName) || t.isContentEditable === !0;
}
const Rj = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function Cj(t) {
  return Rj.has(t.tagName) || t.isContentEditable === !0;
}
const Jo = /* @__PURE__ */ new WeakSet();
function Bv(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function rd(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const Mj = (t, a) => {
  const l = t.currentTarget;
  if (!l)
    return;
  const s = Bv(() => {
    if (Jo.has(l))
      return;
    rd(l, "down");
    const o = Bv(() => {
      rd(l, "up");
    }), c = () => rd(l, "cancel");
    l.addEventListener("keyup", o, a), l.addEventListener("blur", c, a);
  });
  l.addEventListener("keydown", s, a), l.addEventListener("blur", () => l.removeEventListener("keydown", s), a);
};
function Hv(t) {
  return Uh(t) && !Xx();
}
const qv = /* @__PURE__ */ new WeakSet();
function Aj(t, a, l = {}) {
  const [s, o, c] = Ix(t, l), f = (h) => {
    const p = h.currentTarget;
    if (!Hv(h) || qv.has(h))
      return;
    Jo.add(p), l.stopPropagation && qv.add(h);
    const m = a(p, h), y = (T, w) => {
      window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", x), Jo.has(p) && Jo.delete(p), Hv(T) && typeof m == "function" && m(T, { success: w });
    }, b = (T) => {
      y(T, p === window || p === document || l.useGlobalTarget || Kx(p, T.target));
    }, x = (T) => {
      y(T, !1);
    };
    window.addEventListener("pointerup", b, o), window.addEventListener("pointercancel", x, o);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", f, o), Zo(h) && (h.addEventListener("focus", (m) => Mj(m, o)), !wj(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function Vh(t) {
  return Jb(t) && "ownerSVGElement" in t;
}
const Wo = /* @__PURE__ */ new WeakMap();
let eu;
const Qx = (t, a, l) => (s, o) => o && o[0] ? o[0][t + "Size"] : Vh(s) && "getBBox" in s ? s.getBBox()[a] : s[l], jj = /* @__PURE__ */ Qx("inline", "width", "offsetWidth"), Dj = /* @__PURE__ */ Qx("block", "height", "offsetHeight");
function Nj({ target: t, borderBoxSize: a }) {
  Wo.get(t)?.forEach((l) => {
    l(t, {
      get width() {
        return jj(t, a);
      },
      get height() {
        return Dj(t, a);
      }
    });
  });
}
function zj(t) {
  t.forEach(Nj);
}
function _j() {
  typeof ResizeObserver > "u" || (eu = new ResizeObserver(zj));
}
function Oj(t, a) {
  eu || _j();
  const l = Fx(t);
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
function Lj() {
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
function Uj(t) {
  return tu.add(t), Ul || Lj(), () => {
    tu.delete(t), !tu.size && typeof Ul == "function" && (window.removeEventListener("resize", Ul), Ul = void 0);
  };
}
function kv(t, a) {
  return typeof t == "function" ? Uj(t) : Oj(t, a);
}
function Vj(t) {
  return Vh(t) && t.tagName === "svg";
}
const Bj = [...Px, Mt, Hn], Hj = (t) => Bj.find(kx(t)), Pv = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Vl = () => ({
  x: Pv(),
  y: Pv()
}), Yv = () => ({ min: 0, max: 0 }), jt = () => ({
  x: Yv(),
  y: Yv()
}), qj = /* @__PURE__ */ new WeakMap();
function Ru(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function as(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Bh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Hh = ["initial", ...Bh];
function Cu(t) {
  return Ru(t.animate) || Hh.some((a) => as(t[a]));
}
function Zx(t) {
  return !!(Cu(t) || t.variants);
}
function kj(t, a, l) {
  for (const s in a) {
    const o = a[s], c = l[s];
    if (Bt(o))
      t.addValue(s, o);
    else if (Bt(c))
      t.addValue(s, kl(o, { owner: t }));
    else if (c !== o)
      if (t.hasValue(s)) {
        const f = t.getValue(s);
        f.liveStyle === !0 ? f.jump(o) : f.hasAnimated || f.set(o);
      } else {
        const f = t.getStaticValue(s);
        t.addValue(s, kl(f !== void 0 ? f : o, { owner: t }));
      }
  }
  for (const s in l)
    a[s] === void 0 && t.removeValue(s);
  return a;
}
const hu = { current: null }, qh = { current: !1 }, Pj = typeof window < "u";
function Jx() {
  if (qh.current = !0, !!Pj)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => hu.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      hu.current = !1;
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
let mu = {};
function Wx(t) {
  mu = t;
}
function Yj() {
  return mu;
}
class Gj {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = jh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = Xt.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, nt.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: y } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = l.initial ? { ...m } : {}, this.renderState = y, this.parent = a, this.props = l, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = p, this.blockInitialAnimation = !!f, this.isControllingVariants = Cu(l), this.isVariantNode = Zx(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: b, ...x } = this.scrapeMotionValuesFromProps(l, {}, this);
    for (const T in x) {
      const w = x[T];
      m[T] !== void 0 && Bt(w) && w.set(m[T]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const l in this.initialValues)
        this.values.get(l)?.jump(this.initialValues[l]), this.latestValues[l] = this.initialValues[l];
    this.current = a, qj.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (qh.current || Jx(), this.shouldReduceMotion = hu.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), ci(this.notifyUpdate), ci(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), l.accelerate && _x.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: h, times: p, ease: m, duration: y } = l.accelerate, b = new Nx({
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
    for (let s = 0; s < Gv.length; s++) {
      const o = Gv[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, f = a[c];
      f && (this.propEventSubscriptions[o] = this.on(o, f));
    }
    this.prevMotionValues = kj(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && l !== void 0 && (s = kl(l === null ? void 0 : l, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, l) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Zb(s) || Wb(s)) ? s = parseFloat(s) : !Hj(s) && Hn.test(l) && (s = Gx(a, l)), this.setBaseTarget(a, Bt(s) ? s.get() : s)), Bt(s) ? s.get() : s;
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
      const c = zh(this.props, l, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (l && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !Bt(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, l) {
    return this.events[a] || (this.events[a] = new xh()), this.events[a].add(l);
  }
  notify(a, ...l) {
    this.events[a] && this.events[a].notify(...l);
  }
  scheduleRenderMicrotask() {
    Lh.render(this.render);
  }
}
class eS extends Gj {
  constructor() {
    super(...arguments), this.KeyframeResolver = bj;
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
class fi {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function tS({ top: t, left: a, right: l, bottom: s }) {
  return {
    x: { min: a, max: l },
    y: { min: t, max: s }
  };
}
function Fj({ x: t, y: a }) {
  return { top: a.min, right: t.max, bottom: a.max, left: t.min };
}
function $j(t, a) {
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
function Xd({ scale: t, scaleX: a, scaleY: l }) {
  return !sd(t) || !sd(a) || !sd(l);
}
function Ui(t) {
  return Xd(t) || nS(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function nS(t) {
  return Fv(t.x) || Fv(t.y);
}
function Fv(t) {
  return t && t !== "0%";
}
function pu(t, a, l) {
  const s = t - l, o = a * s;
  return l + o;
}
function $v(t, a, l, s, o) {
  return o !== void 0 && (t = pu(t, o, s)), pu(t, l, s) + a;
}
function Id(t, a = 0, l = 1, s, o) {
  t.min = $v(t.min, a, l, s, o), t.max = $v(t.max, a, l, s, o);
}
function aS(t, { x: a, y: l }) {
  Id(t.x, a.translate, a.scale, a.originPoint), Id(t.y, l.translate, l.scale, l.originPoint);
}
const Xv = 0.999999999999, Iv = 1.0000000000001;
function Xj(t, a, l, s = !1) {
  const o = l.length;
  if (!o)
    return;
  a.x = a.y = 1;
  let c, f;
  for (let h = 0; h < o; h++) {
    c = l[h], f = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (Qn(t.x, -c.scroll.offset.x), Qn(t.y, -c.scroll.offset.y)), f && (a.x *= f.x.scale, a.y *= f.y.scale, aS(t, f)), s && Ui(c.latestValues) && nu(t, c.latestValues, c.layout?.layoutBox));
  }
  a.x < Iv && a.x > Xv && (a.x = 1), a.y < Iv && a.y > Xv && (a.y = 1);
}
function Qn(t, a) {
  t.min += a, t.max += a;
}
function Kv(t, a, l, s, o = 0.5) {
  const c = st(t.min, t.max, o);
  Id(t, a, l, c, s);
}
function Qv(t, a) {
  return typeof t == "string" ? parseFloat(t) / 100 * (a.max - a.min) : t;
}
function nu(t, a, l) {
  const s = l ?? t;
  Kv(t.x, Qv(a.x, s.x), a.scaleX, a.scale, a.originX), Kv(t.y, Qv(a.y, s.y), a.scaleY, a.scale, a.originY);
}
function iS(t, a) {
  return tS($j(t.getBoundingClientRect(), a));
}
function Ij(t, a, l) {
  const s = iS(t, l), { scroll: o } = a;
  return o && (Qn(s.x, o.offset.x), Qn(s.y, o.offset.y)), s;
}
const Kj = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Qj = Fl.length;
function Zj(t, a, l) {
  let s = "", o = !0;
  for (let c = 0; c < Qj; c++) {
    const f = Fl[c], h = t[f];
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
      const m = $x(h, Oh[f]);
      if (!p) {
        o = !1;
        const y = Kj[f] || f;
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
    } else if (mx(p)) {
      o[p] = m;
      continue;
    } else {
      const y = $x(m, Oh[p]);
      p.startsWith("origin") ? (h = !0, c[p] = y) : s[p] = y;
    }
  }
  if (a.transform || (f || l ? s.transform = Zj(a, t.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: p = "50%", originY: m = "50%", originZ: y = 0 } = c;
    s.transformOrigin = `${p} ${m} ${y}`;
  }
}
function lS(t, { style: a, vars: l }, s, o) {
  const c = t.style;
  let f;
  for (f in a)
    c[f] = a[f];
  o?.applyProjectionStyles(c, s);
  for (f in l)
    c.setProperty(f, l[f]);
}
function Zv(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const Yr = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (ye.test(t))
        t = parseFloat(t);
      else
        return t;
    const l = Zv(t, a.target.x), s = Zv(t, a.target.y);
    return `${l}% ${s}%`;
  }
}, Jj = {
  correct: (t, { treeScale: a, projectionDelta: l }) => {
    const s = t, o = Hn.parse(t);
    if (o.length > 5)
      return s;
    const c = Hn.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, h = l.x.scale * a.x, p = l.y.scale * a.y;
    o[0 + f] /= h, o[1 + f] /= p;
    const m = st(h, p, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= m), typeof o[3 + f] == "number" && (o[3 + f] /= m), c(o);
  }
}, Kd = {
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
  boxShadow: Jj
};
function rS(t, { layout: a, layoutId: l }) {
  return $l.has(t) || t.startsWith("origin") || (a || l !== void 0) && (!!Kd[t] || t === "opacity");
}
function Ph(t, a, l) {
  const s = t.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const f in s)
    (Bt(s[f]) || o && Bt(o[f]) || rS(f, t) || l?.getValue(f)?.liveStyle !== void 0) && (c[f] = s[f]);
  return c;
}
function Wj(t) {
  return window.getComputedStyle(t);
}
class eD extends eS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = lS;
  }
  readValueFromInstance(a, l) {
    if ($l.has(l))
      return this.projection?.isProjecting ? Ud(l) : xA(a, l);
    {
      const s = Wj(a), o = (mx(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: l }) {
    return iS(a, l);
  }
  build(a, l, s) {
    kh(a, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return Ph(a, l, s);
  }
}
const tD = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, nD = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function aD(t, a, l = 1, s = 0, o = !0) {
  t.pathLength = 1;
  const c = o ? tD : nD;
  t[c.offset] = `${-s}`, t[c.array] = `${a} ${l}`;
}
const iD = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function sS(t, {
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
  for (const T of iD)
    b[T] !== void 0 && (x[T] = b[T], delete b[T]);
  a !== void 0 && (b.x = a), l !== void 0 && (b.y = l), s !== void 0 && (b.scale = s), o !== void 0 && aD(b, o, c, f, !1);
}
const oS = /* @__PURE__ */ new Set([
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
]), uS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function lD(t, a, l, s) {
  lS(t, a, void 0, s);
  for (const o in a.attrs)
    t.setAttribute(oS.has(o) ? o : _h(o), a.attrs[o]);
}
function cS(t, a, l) {
  const s = Ph(t, a, l);
  for (const o in t)
    if (Bt(t[o]) || Bt(a[o])) {
      const c = Fl.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = t[o];
    }
  return s;
}
class rD extends eS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = jt;
  }
  getBaseTargetFromProps(a, l) {
    return a[l];
  }
  readValueFromInstance(a, l) {
    if ($l.has(l)) {
      const s = Yx(l);
      return s && s.default || 0;
    }
    return l = oS.has(l) ? l : _h(l), a.getAttribute(l);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return cS(a, l, s);
  }
  build(a, l, s) {
    sS(a, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, l, s, o) {
    lD(a, l, s, o);
  }
  mount(a) {
    this.isSVGTag = uS(a.tagName), super.mount(a);
  }
}
const sD = Hh.length;
function fS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const l = t.parent ? fS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (l.initial = t.props.initial), l;
  }
  const a = {};
  for (let l = 0; l < sD; l++) {
    const s = Hh[l], o = t.props[s];
    (as(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function dS(t, a) {
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
const oD = [...Bh].reverse(), uD = Bh.length;
function cD(t) {
  return (a) => Promise.all(a.map(({ animation: l, options: s }) => oj(t, l, s)));
}
function fD(t) {
  let a = cD(t), l = Jv(), s = !0, o = !1;
  const c = (m) => (y, b) => {
    const x = Pi(t, b, m === "exit" ? t.presenceContext?.custom : void 0);
    if (x) {
      const { transition: T, transitionEnd: w, ...C } = x;
      y = { ...y, ...C, ...w };
    }
    return y;
  };
  function f(m) {
    a = m(t);
  }
  function h(m) {
    const { props: y } = t, b = fS(t.parent) || {}, x = [], T = /* @__PURE__ */ new Set();
    let w = {}, C = 1 / 0;
    for (let _ = 0; _ < uD; _++) {
      const L = oD[_], O = l[L], B = y[L] !== void 0 ? y[L] : b[L], F = as(B), ne = L === m ? O.isActive : null;
      ne === !1 && (C = _);
      let te = B === b[L] && B !== y[L] && F;
      if (te && (s || o) && t.manuallyAnimateOnMount && (te = !1), O.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !O.isActive && ne === null || // If we didn't and don't have any defined prop for this animation type
      !B && !O.prevProp || // Or if the prop doesn't define an animation
      Ru(B) || typeof B == "boolean")
        continue;
      if (L === "exit" && O.isActive && ne !== !0) {
        O.prevResolvedValues && (w = {
          ...w,
          ...O.prevResolvedValues
        });
        continue;
      }
      const R = dD(O.prevProp, B);
      let H = R || // If we're making this variant active, we want to always make it active
      L === m && O.isActive && !te && F || // If we removed a higher-priority variant (i is in reverse order)
      _ > C && F, K = !1;
      const ie = Array.isArray(B) ? B : [B];
      let X = ie.reduce(c(L), {});
      ne === !1 && (X = {});
      const { prevResolvedValues: le = {} } = O, G = {
        ...le,
        ...X
      }, Z = (re) => {
        H = !0, T.has(re) && (K = !0, T.delete(re)), O.needsAnimating[re] = !0;
        const ce = t.getValue(re);
        ce && (ce.liveStyle = !1);
      };
      for (const re in G) {
        const ce = X[re], Te = le[re];
        if (w.hasOwnProperty(re))
          continue;
        let j = !1;
        Pd(ce) && Pd(Te) ? j = !dS(ce, Te) : j = ce !== Te, j ? ce != null ? Z(re) : T.add(re) : ce !== void 0 && T.has(re) ? Z(re) : O.protectedKeys[re] = !0;
      }
      O.prevProp = B, O.prevResolvedValues = X, O.isActive && (w = { ...w, ...X }), (s || o) && t.blockInitialAnimation && (H = !1);
      const N = te && R;
      H && (!N || K) && x.push(...ie.map((re) => {
        const ce = { type: L };
        if (typeof re == "string" && (s || o) && !N && t.manuallyAnimateOnMount && t.parent) {
          const { parent: Te } = t, j = Pi(Te, re);
          if (Te.enteringChildren && j) {
            const { delayChildren: I } = j.transition || {};
            ce.delay = Ox(Te.enteringChildren, t, I);
          }
        }
        return {
          animation: re,
          options: ce
        };
      }));
    }
    if (T.size) {
      const _ = {};
      if (typeof y.initial != "boolean") {
        const L = Pi(t, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        L && L.transition && (_.transition = L.transition);
      }
      T.forEach((L) => {
        const O = t.getBaseTarget(L), B = t.getValue(L);
        B && (B.liveStyle = !0), _[L] = O ?? null;
      }), x.push({ animation: _ });
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
      l = Jv(), o = !0;
    }
  };
}
function dD(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !dS(a, t) : !1;
}
function _i(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Jv() {
  return {
    animate: _i(!0),
    whileInView: _i(),
    whileHover: _i(),
    whileTap: _i(),
    whileDrag: _i(),
    whileFocus: _i(),
    exit: _i()
  };
}
function Qd(t, a) {
  t.min = a.min, t.max = a.max;
}
function Vn(t, a) {
  Qd(t.x, a.x), Qd(t.y, a.y);
}
function Wv(t, a) {
  t.translate = a.translate, t.scale = a.scale, t.originPoint = a.originPoint, t.origin = a.origin;
}
const hS = 1e-4, hD = 1 - hS, mD = 1 + hS, mS = 0.01, pD = 0 - mS, yD = 0 + mS;
function It(t) {
  return t.max - t.min;
}
function gD(t, a, l) {
  return Math.abs(t - a) <= l;
}
function e0(t, a, l, s = 0.5) {
  t.origin = s, t.originPoint = st(a.min, a.max, t.origin), t.scale = It(l) / It(a), t.translate = st(l.min, l.max, t.origin) - t.originPoint, (t.scale >= hD && t.scale <= mD || isNaN(t.scale)) && (t.scale = 1), (t.translate >= pD && t.translate <= yD || isNaN(t.translate)) && (t.translate = 0);
}
function Zr(t, a, l, s) {
  e0(t.x, a.x, l.x, s ? s.originX : void 0), e0(t.y, a.y, l.y, s ? s.originY : void 0);
}
function t0(t, a, l, s = 0) {
  const o = s ? st(l.min, l.max, s) : l.min;
  t.min = o + a.min, t.max = t.min + It(a);
}
function vD(t, a, l, s) {
  t0(t.x, a.x, l.x, s?.x), t0(t.y, a.y, l.y, s?.y);
}
function n0(t, a, l, s = 0) {
  const o = s ? st(l.min, l.max, s) : l.min;
  t.min = a.min - o, t.max = t.min + It(a);
}
function yu(t, a, l, s) {
  n0(t.x, a.x, l.x, s?.x), n0(t.y, a.y, l.y, s?.y);
}
function a0(t, a, l, s, o) {
  return t -= a, t = pu(t, 1 / l, s), o !== void 0 && (t = pu(t, 1 / o, s)), t;
}
function bD(t, a = 0, l = 1, s = 0.5, o, c = t, f = t) {
  if (Zn.test(a) && (a = parseFloat(a), a = st(f.min, f.max, a / 100) - f.min), typeof a != "number")
    return;
  let h = st(c.min, c.max, s);
  t === c && (h -= a), t.min = a0(t.min, a, l, h, o), t.max = a0(t.max, a, l, h, o);
}
function i0(t, a, [l, s, o], c, f) {
  bD(t, a[l], a[s], a[o], a.scale, c, f);
}
const xD = ["x", "scaleX", "originX"], SD = ["y", "scaleY", "originY"];
function l0(t, a, l, s) {
  i0(t.x, a, xD, l ? l.x : void 0, s ? s.x : void 0), i0(t.y, a, SD, l ? l.y : void 0, s ? s.y : void 0);
}
function r0(t) {
  return t.translate === 0 && t.scale === 1;
}
function pS(t) {
  return r0(t.x) && r0(t.y);
}
function s0(t, a) {
  return t.min === a.min && t.max === a.max;
}
function ED(t, a) {
  return s0(t.x, a.x) && s0(t.y, a.y);
}
function o0(t, a) {
  return Math.round(t.min) === Math.round(a.min) && Math.round(t.max) === Math.round(a.max);
}
function yS(t, a) {
  return o0(t.x, a.x) && o0(t.y, a.y);
}
function u0(t) {
  return It(t.x) / It(t.y);
}
function c0(t, a) {
  return t.translate === a.translate && t.scale === a.scale && t.originPoint === a.originPoint;
}
function Kn(t) {
  return [t("x"), t("y")];
}
function TD(t, a, l) {
  let s = "";
  const o = t.x.translate / a.x, c = t.y.translate / a.y, f = l?.z || 0;
  if ((o || c || f) && (s = `translate3d(${o}px, ${c}px, ${f}px) `), (a.x !== 1 || a.y !== 1) && (s += `scale(${1 / a.x}, ${1 / a.y}) `), l) {
    const { transformPerspective: m, rotate: y, rotateX: b, rotateY: x, skewX: T, skewY: w } = l;
    m && (s = `perspective(${m}px) ${s}`), y && (s += `rotate(${y}deg) `), b && (s += `rotateX(${b}deg) `), x && (s += `rotateY(${x}deg) `), T && (s += `skewX(${T}deg) `), w && (s += `skewY(${w}deg) `);
  }
  const h = t.x.scale * a.x, p = t.y.scale * a.y;
  return (h !== 1 || p !== 1) && (s += `scale(${h}, ${p})`), s || "none";
}
const gS = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius"
], wD = gS.length, f0 = (t) => typeof t == "string" ? parseFloat(t) : t, d0 = (t) => typeof t == "number" || ye.test(t);
function RD(t, a, l, s, o, c) {
  o ? (t.opacity = st(0, l.opacity ?? 1, CD(s)), t.opacityExit = st(a.opacity ?? 1, 0, MD(s))) : c && (t.opacity = st(a.opacity ?? 1, l.opacity ?? 1, s));
  for (let f = 0; f < wD; f++) {
    const h = gS[f];
    let p = h0(a, h), m = h0(l, h);
    if (p === void 0 && m === void 0)
      continue;
    p || (p = 0), m || (m = 0), p === 0 || m === 0 || d0(p) === d0(m) ? (t[h] = Math.max(st(f0(p), f0(m), s), 0), (Zn.test(m) || Zn.test(p)) && (t[h] += "%")) : t[h] = m;
  }
  (a.rotate || l.rotate) && (t.rotate = st(a.rotate || 0, l.rotate || 0, s));
}
function h0(t, a) {
  return t[a] !== void 0 ? t[a] : t.borderRadius;
}
const CD = /* @__PURE__ */ vS(0, 0.5, ox), MD = /* @__PURE__ */ vS(0.5, 0.95, An);
function vS(t, a, l) {
  return (s) => s < t ? 0 : s > a ? 1 : l(/* @__PURE__ */ ts(t, a, s));
}
function AD(t, a, l) {
  const s = Bt(t) ? t : kl(t);
  return s.start(Nh("", s, a, l)), s.animation;
}
function is(t, a, l, s = { passive: !0 }) {
  return t.addEventListener(a, l, s), () => t.removeEventListener(a, l);
}
const jD = (t, a) => t.depth - a.depth;
class DD {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(a) {
    bh(this.children, a), this.isDirty = !0;
  }
  remove(a) {
    ou(this.children, a), this.isDirty = !0;
  }
  forEach(a) {
    this.isDirty && this.children.sort(jD), this.isDirty = !1, this.children.forEach(a);
  }
}
function ND(t, a) {
  const l = Xt.now(), s = ({ timestamp: o }) => {
    const c = o - l;
    c >= a && (ci(s), t(c - a));
  };
  return nt.setup(s, !0), () => ci(s);
}
function au(t) {
  return Bt(t) ? t.get() : t;
}
class zD {
  constructor() {
    this.members = [];
  }
  add(a) {
    bh(this.members, a);
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
}, od = ["", "X", "Y", "Z"], _D = 1e3;
let OD = 0;
function ud(t, a, l, s) {
  const { latestValues: o } = a;
  o[t] && (l[t] = o[t], a.setStaticValue(t, 0), s && (s[t] = 0));
}
function bS(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: a } = t.options;
  if (!a)
    return;
  const l = Hx(a);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: o, layoutId: c } = t.options;
    window.MotionCancelOptimisedAnimation(l, "transform", nt, !(o || c));
  }
  const { parent: s } = t;
  s && !s.hasCheckedOptimisedAppear && bS(s);
}
function xS({ attachResizeListener: t, defaultParent: a, measureScroll: l, checkIsScrollRoot: s, resetTransform: o }) {
  return class {
    constructor(f = {}, h = a?.()) {
      this.id = OD++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(VD), this.nodes.forEach(YD), this.nodes.forEach(GD), this.nodes.forEach(BD);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new DD());
    }
    addEventListener(f, h) {
      return this.eventHandlers.has(f) || this.eventHandlers.set(f, new xh()), this.eventHandlers.get(f).add(h);
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
      this.isSVG = Vh(f) && !Vj(f), this.instance = f;
      const { layoutId: h, layout: p, visualElement: m } = this.options;
      if (m && !m.current && m.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0), t) {
        let y, b = 0;
        const x = () => this.root.updateBlockedByResize = !1;
        nt.read(() => {
          b = window.innerWidth;
        }), t(f, () => {
          const T = window.innerWidth;
          T !== b && (b = T, this.root.updateBlockedByResize = !0, y && y(), y = ND(x, 250), iu.hasAnimatedSinceResize && (iu.hasAnimatedSinceResize = !1, this.nodes.forEach(y0)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || p) && this.addEventListener("didUpdate", ({ delta: y, hasLayoutChanged: b, hasRelativeLayoutChanged: x, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const w = this.options.transition || m.getDefaultTransition() || KD, { onLayoutAnimationStart: C, onLayoutAnimationComplete: D } = m.getProps(), _ = !this.targetLayout || !yS(this.targetLayout, T), L = !b && x;
        if (this.options.layoutRoot || this.resumeFrom || L || b && (_ || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const O = {
            ...Dh(w, "layout"),
            onPlay: C,
            onComplete: D
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (O.delay = 0, O.type = !1), this.startAnimation(O), this.setAnimationOrigin(y, L);
        } else
          b || y0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const f = this.getStack();
      f && f.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ci(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(FD), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && bS(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(qD), this.nodes.forEach(m0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(p0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(kD), this.nodes.forEach(PD), this.nodes.forEach(LD), this.nodes.forEach(UD)) : this.nodes.forEach(p0), this.clearAllSnapshots();
      const h = Xt.now();
      Vt.delta = Wn(0, 1e3 / 60, h - Vt.timestamp), Vt.timestamp = h, Vt.isProcessing = !0, ed.update.process(Vt), ed.preRender.process(Vt), ed.render.process(Vt), Vt.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Lh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(HD), this.sharedNodes.forEach($D);
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
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !pS(this.projectionDelta), p = this.getTransformTemplate(), m = p ? p(this.latestValues, "") : void 0, y = m !== this.prevTransformTemplateValue;
      f && this.instance && (h || Ui(this.latestValues) || y) && (o(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const h = this.measurePageBox();
      let p = this.removeElementScroll(h);
      return f && (p = this.removeTransform(p)), QD(p), {
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
      if (!(this.scroll?.wasRoot || this.path.some(ZD))) {
        const { scroll: m } = this.root;
        m && (Qn(h.x, m.offset.x), Qn(h.y, m.offset.y));
      }
      return h;
    }
    removeElementScroll(f) {
      const h = jt();
      if (Vn(h, f), this.scroll?.wasRoot)
        return h;
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p], { scroll: y, options: b } = m;
        m !== this.root && y && b.layoutScroll && (y.wasRoot && Vn(h, f), Qn(h.x, y.offset.x), Qn(h.y, y.offset.y));
      }
      return h;
    }
    applyTransform(f, h = !1, p) {
      const m = p || jt();
      Vn(m, f);
      for (let y = 0; y < this.path.length; y++) {
        const b = this.path[y];
        !h && b.options.layoutScroll && b.scroll && b !== b.root && (Qn(m.x, -b.scroll.offset.x), Qn(m.y, -b.scroll.offset.y)), Ui(b.latestValues) && nu(m, b.latestValues, b.layout?.layoutBox);
      }
      return Ui(this.latestValues) && nu(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(f) {
      const h = jt();
      Vn(h, f);
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p];
        if (!Ui(m.latestValues))
          continue;
        let y;
        m.instance && (Xd(m.latestValues) && m.updateSnapshot(), y = jt(), Vn(y, m.measurePageBox())), l0(h, m.latestValues, m.snapshot?.layoutBox, y);
      }
      return Ui(this.latestValues) && l0(h, this.latestValues), h;
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
      x && this.linkedParentVersion !== x.layoutVersion && !x.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && x && x.layout ? this.createRelativeTarget(x, this.layout.layoutBox, x.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = jt(), this.targetWithTransforms = jt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), vD(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Vn(this.target, this.layout.layoutBox), aS(this.target, this.targetDelta)) : Vn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && x && !!x.resumingFrom == !!this.resumingFrom && !x.options.layoutScroll && x.target && this.animationProgress !== 1 ? this.createRelativeTarget(x, this.target, x.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Xd(this.parent.latestValues) || nS(this.parent.latestValues)))
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
      Xj(this.layoutCorrected, this.treeScale, this.path, h), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = jt());
      const { target: T } = f;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Wv(this.prevProjectionDelta.x, this.projectionDelta.x), Wv(this.prevProjectionDelta.y, this.projectionDelta.y)), Zr(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== b || this.treeScale.y !== x || !c0(this.projectionDelta.x, this.prevProjectionDelta.x) || !c0(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
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
      const x = jt(), T = p ? p.source : void 0, w = this.layout ? this.layout.source : void 0, C = T !== w, D = this.getStack(), _ = !D || D.members.length <= 1, L = !!(C && !_ && this.options.crossfade === !0 && !this.path.some(ID));
      this.animationProgress = 0;
      let O;
      this.mixTargetDelta = (B) => {
        const F = B / 1e3;
        g0(b.x, f.x, F), g0(b.y, f.y, F), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (yu(x, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), XD(this.relativeTarget, this.relativeTargetOrigin, x, F), O && ED(this.relativeTarget, O) && (this.isProjectionDirty = !1), O || (O = jt()), Vn(O, this.relativeTarget)), C && (this.animationValues = y, RD(y, m, this.latestValues, F, L, _)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = F;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (ci(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = nt.update(() => {
        iu.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = kl(0)), this.motionValue.jump(0, !1), this.currentAnimation = AD(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(_D), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: h, target: p, layout: m, latestValues: y } = f;
      if (!(!h || !p || !m)) {
        if (this !== f && this.layout && m && SS(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
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
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new zD()), this.sharedNodes.get(f).add(h);
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
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = au(h?.pointerEvents) || ""), this.hasProjected && !Ui(this.latestValues) && (f.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const y = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let b = TD(this.projectionDeltaWithTransform, this.treeScale, y);
      p && (b = p(y, b)), f.transform = b;
      const { x, y: T } = this.projectionDelta;
      f.transformOrigin = `${x.origin * 100}% ${T.origin * 100}% 0`, m.animationValues ? f.opacity = m === this ? y.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : y.opacityExit : f.opacity = m === this ? y.opacity !== void 0 ? y.opacity : "" : y.opacityExit !== void 0 ? y.opacityExit : 0;
      for (const w in Kd) {
        if (y[w] === void 0)
          continue;
        const { correct: C, applyTo: D, isCSSVariable: _ } = Kd[w], L = b === "none" ? y[w] : C(y[w], m);
        if (D) {
          const O = D.length;
          for (let B = 0; B < O; B++)
            f[D[B]] = L;
        } else
          _ ? this.options.visualElement.renderState.vars[w] = L : f[w] = L;
      }
      this.options.layoutId && (f.pointerEvents = m === this ? au(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => f.currentAnimation?.stop()), this.root.nodes.forEach(m0), this.root.sharedNodes.clear();
    }
  };
}
function LD(t) {
  t.updateLayout();
}
function UD(t) {
  const a = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && a && t.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: s } = t.layout, { animationType: o } = t.options, c = a.source !== t.layout.source;
    if (o === "size")
      Kn((y) => {
        const b = c ? a.measuredBox[y] : a.layoutBox[y], x = It(b);
        b.min = l[y].min, b.max = b.min + x;
      });
    else if (o === "x" || o === "y") {
      const y = o === "x" ? "y" : "x";
      Qd(c ? a.measuredBox[y] : a.layoutBox[y], l[y]);
    } else SS(o, a.layoutBox, l) && Kn((y) => {
      const b = c ? a.measuredBox[y] : a.layoutBox[y], x = It(l[y]);
      b.max = b.min + x, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[y].max = t.relativeTarget[y].min + x);
    });
    const f = Vl();
    Zr(f, l, a.layoutBox);
    const h = Vl();
    c ? Zr(h, t.applyTransform(s, !0), a.measuredBox) : Zr(h, l, a.layoutBox);
    const p = !pS(f);
    let m = !1;
    if (!t.resumeFrom) {
      const y = t.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: b, layout: x } = y;
        if (b && x) {
          const T = t.options.layoutAnchor || void 0, w = jt();
          yu(w, a.layoutBox, b.layoutBox, T);
          const C = jt();
          yu(C, l, x.layoutBox, T), yS(w, C) || (m = !0), y.options.layoutRoot && (t.relativeTarget = C, t.relativeTargetOrigin = w, t.relativeParent = y);
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
function VD(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function BD(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function HD(t) {
  t.clearSnapshot();
}
function m0(t) {
  t.clearMeasurements();
}
function qD(t) {
  t.isLayoutDirty = !0, t.updateLayout();
}
function p0(t) {
  t.isLayoutDirty = !1;
}
function kD(t) {
  t.isAnimationBlocked && t.layout && !t.isLayoutDirty && (t.snapshot = t.layout, t.isLayoutDirty = !0);
}
function PD(t) {
  const { visualElement: a } = t.options;
  a && a.getProps().onBeforeLayoutMeasure && a.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function y0(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function YD(t) {
  t.resolveTargetDelta();
}
function GD(t) {
  t.calcProjection();
}
function FD(t) {
  t.resetSkewAndRotation();
}
function $D(t) {
  t.removeLeadSnapshot();
}
function g0(t, a, l) {
  t.translate = st(a.translate, 0, l), t.scale = st(a.scale, 1, l), t.origin = a.origin, t.originPoint = a.originPoint;
}
function v0(t, a, l, s) {
  t.min = st(a.min, l.min, s), t.max = st(a.max, l.max, s);
}
function XD(t, a, l, s) {
  v0(t.x, a.x, l.x, s), v0(t.y, a.y, l.y, s);
}
function ID(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const KD = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, b0 = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), x0 = b0("applewebkit/") && !b0("chrome/") ? Math.round : An;
function S0(t) {
  t.min = x0(t.min), t.max = x0(t.max);
}
function QD(t) {
  S0(t.x), S0(t.y);
}
function SS(t, a, l) {
  return t === "position" || t === "preserve-aspect" && !gD(u0(a), u0(l), 0.2);
}
function ZD(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const JD = xS({
  attachResizeListener: (t, a) => is(t, "resize", a),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), cd = {
  current: void 0
}, ES = xS({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!cd.current) {
      const t = new JD({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), cd.current = t;
    }
    return cd.current;
  },
  resetTransform: (t, a) => {
    t.style.transform = a !== void 0 ? a : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), Yh = S.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function E0(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function WD(...t) {
  return (a) => {
    let l = !1;
    const s = t.map((o) => {
      const c = E0(o, a);
      return !l && typeof c == "function" && (l = !0), c;
    });
    if (l)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : E0(t[o], null);
        }
      };
  };
}
function e2(...t) {
  return S.useCallback(WD(...t), t);
}
class t2 extends S.Component {
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
function n2({ children: t, isPresent: a, anchorX: l, anchorY: s, root: o, pop: c }) {
  const f = S.useId(), h = S.useRef(null), p = S.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = S.useContext(Yh), y = t.props?.ref ?? t?.ref, b = e2(h, y);
  return S.useInsertionEffect(() => {
    const { width: x, height: T, top: w, left: C, right: D, bottom: _ } = p.current;
    if (a || c === !1 || !h.current || !x || !T)
      return;
    const L = l === "left" ? `left: ${C}` : `right: ${D}`, O = s === "bottom" ? `bottom: ${_}` : `top: ${w}`;
    h.current.dataset.motionPopId = f;
    const B = document.createElement("style");
    m && (B.nonce = m);
    const F = o ?? document.head;
    return F.appendChild(B), B.sheet && B.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${x}px !important;
            height: ${T}px !important;
            ${L}px !important;
            ${O}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), F.contains(B) && F.removeChild(B);
    };
  }, [a]), g.jsx(t2, { isPresent: a, childRef: h, sizeRef: p, pop: c, children: c === !1 ? t : S.cloneElement(t, { ref: b }) });
}
const a2 = ({ children: t, initial: a, isPresent: l, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: f, anchorX: h, anchorY: p, root: m }) => {
  const y = vh(i2), b = S.useId();
  let x = !0, T = S.useMemo(() => (x = !1, {
    id: b,
    initial: a,
    isPresent: l,
    custom: o,
    onExitComplete: (w) => {
      y.set(w, !0);
      for (const C of y.values())
        if (!C)
          return;
      s && s();
    },
    register: (w) => (y.set(w, !1), () => y.delete(w))
  }), [l, y, s]);
  return c && x && (T = { ...T }), S.useMemo(() => {
    y.forEach((w, C) => y.set(C, !1));
  }, [l]), S.useEffect(() => {
    !l && !y.size && s && s();
  }, [l]), t = g.jsx(n2, { pop: f === "popLayout", isPresent: l, anchorX: h, anchorY: p, root: m, children: t }), g.jsx(Tu.Provider, { value: T, children: t });
};
function i2() {
  return /* @__PURE__ */ new Map();
}
function TS(t = !0) {
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
function T0(t) {
  const a = [];
  return S.Children.forEach(t, (l) => {
    S.isValidElement(l) && a.push(l);
  }), a;
}
const l2 = ({ children: t, custom: a, initial: l = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: f = !1, anchorX: h = "left", anchorY: p = "top", root: m }) => {
  const [y, b] = TS(f), x = S.useMemo(() => T0(t), [t]), T = f && !y ? [] : x.map(Ho), w = S.useRef(!0), C = S.useRef(x), D = vh(() => /* @__PURE__ */ new Map()), _ = S.useRef(/* @__PURE__ */ new Set()), [L, O] = S.useState(x), [B, F] = S.useState(x);
  Qb(() => {
    w.current = !1, C.current = x;
    for (let R = 0; R < B.length; R++) {
      const H = Ho(B[R]);
      T.includes(H) ? (D.delete(H), _.current.delete(H)) : D.get(H) !== !0 && D.set(H, !1);
    }
  }, [B, T.length, T.join("-")]);
  const ne = [];
  if (x !== L) {
    let R = [...x];
    for (let H = 0; H < B.length; H++) {
      const K = B[H], ie = Ho(K);
      T.includes(ie) || (R.splice(H, 0, K), ne.push(K));
    }
    return c === "wait" && ne.length && (R = ne), F(T0(R)), O(x), null;
  }
  const { forceRender: te } = S.useContext(gh);
  return g.jsx(g.Fragment, { children: B.map((R) => {
    const H = Ho(R), K = f && !y ? !1 : x === B || T.includes(H), ie = () => {
      if (_.current.has(H))
        return;
      if (D.has(H))
        _.current.add(H), D.set(H, !0);
      else
        return;
      let X = !0;
      D.forEach((le) => {
        le || (X = !1);
      }), X && (te?.(), F(C.current), f && b?.(), s && s());
    };
    return g.jsx(a2, { isPresent: K, initial: !w.current || l ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: m, onExitComplete: K ? void 0 : ie, anchorX: h, anchorY: p, children: R }, H);
  }) });
}, Gh = S.createContext({ strict: !1 }), w0 = {
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
let R0 = !1;
function r2() {
  if (R0)
    return;
  const t = {};
  for (const a in w0)
    t[a] = {
      isEnabled: (l) => w0[a].some((s) => !!l[s])
    };
  Wx(t), R0 = !0;
}
function wS() {
  return r2(), Yj();
}
function Zd(t) {
  const a = wS();
  for (const l in t)
    a[l] = {
      ...a[l],
      ...t[l]
    };
  Wx(a);
}
function RS({ children: t, features: a, strict: l = !1 }) {
  const [, s] = S.useState(!fd(a)), o = S.useRef(void 0);
  if (!fd(a)) {
    const { renderer: c, ...f } = a;
    o.current = c, Zd(f);
  }
  return S.useEffect(() => {
    fd(a) && a().then(({ renderer: c, ...f }) => {
      Zd(f), o.current = c, s(!0);
    });
  }, []), g.jsx(Gh.Provider, { value: { renderer: o.current, strict: l }, children: t });
}
function fd(t) {
  return typeof t == "function";
}
const s2 = /* @__PURE__ */ new Set([
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
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || s2.has(t);
}
let CS = (t) => !gu(t);
function o2(t) {
  typeof t == "function" && (CS = (a) => a.startsWith("on") ? !gu(a) : t(a));
}
try {
  o2(require("@emotion/is-prop-valid").default);
} catch {
}
function u2(t, a, l) {
  const s = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || Bt(t[o]) || (CS(o) || l === !0 && gu(o) || !a && !gu(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (s[o] = t[o]);
  return s;
}
const Mu = /* @__PURE__ */ S.createContext({});
function c2(t, a) {
  if (Cu(t)) {
    const { initial: l, animate: s } = t;
    return {
      initial: l === !1 || as(l) ? l : void 0,
      animate: as(s) ? s : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function f2(t) {
  const { initial: a, animate: l } = c2(t, S.useContext(Mu));
  return S.useMemo(() => ({ initial: a, animate: l }), [C0(a), C0(l)]);
}
function C0(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Fh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function MS(t, a, l) {
  for (const s in a)
    !Bt(a[s]) && !rS(s, l) && (t[s] = a[s]);
}
function d2({ transformTemplate: t }, a) {
  return S.useMemo(() => {
    const l = Fh();
    return kh(l, a, t), Object.assign({}, l.vars, l.style);
  }, [a]);
}
function h2(t, a) {
  const l = t.style || {}, s = {};
  return MS(s, l, t), Object.assign(s, d2(t, a)), s;
}
function m2(t, a) {
  const l = {}, s = h2(t, a);
  return t.drag && t.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const AS = () => ({
  ...Fh(),
  attrs: {}
});
function p2(t, a, l, s) {
  const o = S.useMemo(() => {
    const c = AS();
    return sS(c, a, uS(s), t.transformTemplate, t.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (t.style) {
    const c = {};
    MS(c, t.style, t), o.style = { ...c, ...o.style };
  }
  return o;
}
const y2 = [
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
function $h(t) {
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
      !!(y2.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function g2(t, a, l, { latestValues: s }, o, c = !1, f) {
  const p = (f ?? $h(t) ? p2 : m2)(a, s, o, t), m = u2(a, typeof t == "string", c), y = t !== S.Fragment ? { ...m, ...p, ref: l } : {}, { children: b } = a, x = S.useMemo(() => Bt(b) ? b.get() : b, [b]);
  return S.createElement(t, {
    ...y,
    children: x
  });
}
function v2({ scrapeMotionValuesFromProps: t, createRenderState: a }, l, s, o) {
  return {
    latestValues: b2(l, s, o, t),
    renderState: a()
  };
}
function b2(t, a, l, s) {
  const o = {}, c = s(t, {});
  for (const x in c)
    o[x] = au(c[x]);
  let { initial: f, animate: h } = t;
  const p = Cu(t), m = Zx(t);
  a && m && !p && t.inherit !== !1 && (f === void 0 && (f = a.initial), h === void 0 && (h = a.animate));
  let y = l ? l.initial === !1 : !1;
  y = y || f === !1;
  const b = y ? h : f;
  if (b && typeof b != "boolean" && !Ru(b)) {
    const x = Array.isArray(b) ? b : [b];
    for (let T = 0; T < x.length; T++) {
      const w = zh(t, x[T]);
      if (w) {
        const { transitionEnd: C, transition: D, ..._ } = w;
        for (const L in _) {
          let O = _[L];
          if (Array.isArray(O)) {
            const B = y ? O.length - 1 : 0;
            O = O[B];
          }
          O !== null && (o[L] = O);
        }
        for (const L in C)
          o[L] = C[L];
      }
    }
  }
  return o;
}
const jS = (t) => (a, l) => {
  const s = S.useContext(Mu), o = S.useContext(Tu), c = () => v2(t, a, s, o);
  return l ? c() : vh(c);
}, x2 = /* @__PURE__ */ jS({
  scrapeMotionValuesFromProps: Ph,
  createRenderState: Fh
}), S2 = /* @__PURE__ */ jS({
  scrapeMotionValuesFromProps: cS,
  createRenderState: AS
}), E2 = Symbol.for("motionComponentSymbol");
function T2(t, a, l) {
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
const DS = S.createContext({});
function _l(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function w2(t, a, l, s, o, c) {
  const { visualElement: f } = S.useContext(Mu), h = S.useContext(Gh), p = S.useContext(Tu), m = S.useContext(Yh), y = m.reducedMotion, b = m.skipAnimations, x = S.useRef(null), T = S.useRef(!1);
  s = s || h.renderer, !x.current && s && (x.current = s(t, {
    visualState: a,
    parent: f,
    props: l,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: y,
    skipAnimations: b,
    isSVG: c
  }), T.current && x.current && (x.current.manuallyAnimateOnMount = !0));
  const w = x.current, C = S.useContext(DS);
  w && !w.projection && o && (w.type === "html" || w.type === "svg") && R2(x.current, l, o, C);
  const D = S.useRef(!1);
  S.useInsertionEffect(() => {
    w && D.current && w.update(l, p);
  });
  const _ = l[Bx], L = S.useRef(!!_ && typeof window < "u" && !window.MotionHandoffIsComplete?.(_) && window.MotionHasOptimisedAnimation?.(_));
  return Qb(() => {
    T.current = !0, w && (D.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), L.current && w.animationState && w.animationState.animateChanges());
  }), S.useEffect(() => {
    w && (!L.current && w.animationState && w.animationState.animateChanges(), L.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(_);
    }), L.current = !1), w.enteringChildren = void 0);
  }), w;
}
function R2(t, a, l, s) {
  const { layoutId: o, layout: c, drag: f, dragConstraints: h, layoutScroll: p, layoutRoot: m, layoutAnchor: y, layoutCrossfade: b } = a;
  t.projection = new l(t.latestValues, a["data-framer-portal-id"] ? void 0 : NS(t.parent)), t.projection.setOptions({
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
function NS(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : NS(t.parent);
}
function dd(t, { forwardMotionProps: a = !1, type: l } = {}, s, o) {
  s && Zd(s);
  const c = l ? l === "svg" : $h(t), f = c ? S2 : x2;
  function h(m, y) {
    let b;
    const x = {
      ...S.useContext(Yh),
      ...m,
      layoutId: C2(m)
    }, { isStatic: T } = x, w = f2(m), C = f(m, T);
    if (!T && typeof window < "u") {
      M2();
      const D = A2(x);
      b = D.MeasureLayout, w.visualElement = w2(t, C, x, o, D.ProjectionNode, c);
    }
    return g.jsxs(Mu.Provider, { value: w, children: [b && w.visualElement ? g.jsx(b, { visualElement: w.visualElement, ...x }) : null, g2(t, m, T2(C, w.visualElement, y), C, T, a, c)] });
  }
  h.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const p = S.forwardRef(h);
  return p[E2] = t, p;
}
function C2({ layoutId: t }) {
  const a = S.useContext(gh).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function M2(t, a) {
  S.useContext(Gh).strict;
}
function A2(t) {
  const a = wS(), { drag: l, layout: s } = a;
  if (!l && !s)
    return {};
  const o = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(t) || s?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function zS(t, a) {
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
const _S = /* @__PURE__ */ zS(), OS = (t, a) => a.isSVG ?? $h(t) ? new rD(a) : new eD(a, {
  allowProjection: t !== S.Fragment
});
class j2 extends fi {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = fD(a));
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
let D2 = 0;
class N2 extends fi {
  constructor() {
    super(...arguments), this.id = D2++, this.isExitComplete = !1;
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
const LS = {
  animation: {
    Feature: j2
  },
  exit: {
    Feature: N2
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
const z2 = (t) => (a) => Uh(a) && t(a, ps(a));
function Jr(t, a, l, s) {
  return is(t, a, z2(l), s);
}
const US = ({ current: t }) => t ? t.ownerDocument.defaultView : null, M0 = (t, a) => Math.abs(t - a);
function _2(t, a) {
  const l = M0(t.x, a.x), s = M0(t.y, a.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const A0 = /* @__PURE__ */ new Set(["auto", "scroll"]);
class VS {
  constructor(a, l, { transformPagePoint: s, contextWindow: o = window, dragSnapToOrigin: c = !1, distanceThreshold: f = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (T) => {
      this.handleScroll(T.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = qo(this.lastRawMoveEventInfo, this.transformPagePoint));
      const T = hd(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, C = _2(T.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !C)
        return;
      const { point: D } = T, { timestamp: _ } = Vt;
      this.history.push({ ...D, timestamp: _ });
      const { onStart: L, onMove: O } = this.handlers;
      w || (L && L(this.lastMoveEvent, T), this.startEvent = this.lastMoveEvent), O && O(this.lastMoveEvent, T);
    }, this.handlePointerMove = (T, w) => {
      this.lastMoveEvent = T, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = qo(w, this.transformPagePoint), nt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (T, w) => {
      this.end();
      const { onEnd: C, onSessionEnd: D, resumeAnimation: _ } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && _ && _(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const L = hd(T.type === "pointercancel" ? this.lastMoveEventInfo : qo(w, this.transformPagePoint), this.history);
      this.startEvent && C && C(T, L), D && D(T, L);
    }, !Uh(a))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = f, this.contextWindow = o || window;
    const p = ps(a), m = qo(p, this.transformPagePoint), { point: y } = m, { timestamp: b } = Vt;
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
    c.x === 0 && c.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(a, o), nt.update(this.updatePoint, !0));
  }
  updateHandlers(a) {
    this.handlers = a;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), ci(this.updatePoint);
  }
}
function qo(t, a) {
  return a ? { point: a(t.point) } : t;
}
function j0(t, a) {
  return { x: t.x - a.x, y: t.y - a.y };
}
function hd({ point: t }, a) {
  return {
    point: t,
    delta: j0(t, BS(a)),
    offset: j0(t, O2(a)),
    velocity: L2(a, 0.1)
  };
}
function O2(t) {
  return t[0];
}
function BS(t) {
  return t[t.length - 1];
}
function L2(t, a) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let l = t.length - 1, s = null;
  const o = BS(t);
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
function U2(t, { min: a, max: l }, s) {
  return a !== void 0 && t < a ? t = s ? st(a, t, s.min) : Math.max(t, a) : l !== void 0 && t > l && (t = s ? st(l, t, s.max) : Math.min(t, l)), t;
}
function D0(t, a, l) {
  return {
    min: a !== void 0 ? t.min + a : void 0,
    max: l !== void 0 ? t.max + l - (t.max - t.min) : void 0
  };
}
function V2(t, { top: a, left: l, bottom: s, right: o }) {
  return {
    x: D0(t.x, l, o),
    y: D0(t.y, a, s)
  };
}
function N0(t, a) {
  let l = a.min - t.min, s = a.max - t.max;
  return a.max - a.min < t.max - t.min && ([l, s] = [s, l]), { min: l, max: s };
}
function B2(t, a) {
  return {
    x: N0(t.x, a.x),
    y: N0(t.y, a.y)
  };
}
function H2(t, a) {
  let l = 0.5;
  const s = It(t), o = It(a);
  return o > s ? l = /* @__PURE__ */ ts(a.min, a.max - s, t.min) : s > o && (l = /* @__PURE__ */ ts(t.min, t.max - o, a.min)), Wn(0, 1, l);
}
function q2(t, a) {
  const l = {};
  return a.min !== void 0 && (l.min = a.min - t.min), a.max !== void 0 && (l.max = a.max - t.min), l;
}
const Jd = 0.35;
function k2(t = Jd) {
  return t === !1 ? t = 0 : t === !0 && (t = Jd), {
    x: z0(t, "left", "right"),
    y: z0(t, "top", "bottom")
  };
}
function z0(t, a, l) {
  return {
    min: _0(t, a),
    max: _0(t, l)
  };
}
function _0(t, a) {
  return typeof t == "number" ? t : t[a] || 0;
}
const P2 = /* @__PURE__ */ new WeakMap();
class Y2 {
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
      const { drag: T, dragPropagation: w, onDragStart: C } = this.getProps();
      if (T && !w && (this.openDragLock && this.openDragLock(), this.openDragLock = xj(T), !this.openDragLock))
        return;
      this.latestPointerEvent = b, this.latestPanInfo = x, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Kn((_) => {
        let L = this.getAxisMotionValue(_).get() || 0;
        if (Zn.test(L)) {
          const { projection: O } = this.visualElement;
          if (O && O.layout) {
            const B = O.layout.layoutBox[_];
            B && (L = It(B) * (parseFloat(L) / 100));
          }
        }
        this.originPoint[_] = L;
      }), C && nt.update(() => C(b, x), !1, !0), Yd(this.visualElement, "transform");
      const { animationState: D } = this.visualElement;
      D && D.setActive("whileDrag", !0);
    }, h = (b, x) => {
      this.latestPointerEvent = b, this.latestPanInfo = x;
      const { dragPropagation: T, dragDirectionLock: w, onDirectionLock: C, onDrag: D } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: _ } = x;
      if (w && this.currentDirection === null) {
        this.currentDirection = F2(_), this.currentDirection !== null && C && C(this.currentDirection);
        return;
      }
      this.updateAxis("x", x.point, _), this.updateAxis("y", x.point, _), this.visualElement.render(), D && nt.update(() => D(b, x), !1, !0);
    }, p = (b, x) => {
      this.latestPointerEvent = b, this.latestPanInfo = x, this.stop(b, x), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: b } = this.getProps();
      (b || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: y } = this.getProps();
    this.panSession = new VS(a, {
      onSessionStart: c,
      onStart: f,
      onMove: h,
      onSessionEnd: p,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: y,
      distanceThreshold: s,
      contextWindow: US(this.visualElement),
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
    if (!s || !ko(a, o, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(a);
    let f = this.originPoint[a] + s[a];
    this.constraints && this.constraints[a] && (f = U2(f, this.constraints[a], this.elastic[a])), c.set(f);
  }
  resolveConstraints() {
    const { dragConstraints: a, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    a && _l(a) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : a && s ? this.constraints = V2(s.layoutBox, a) : this.constraints = !1, this.elastic = k2(l), o !== this.constraints && !_l(a) && s && this.constraints && !this.hasMutatedConstraints && Kn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = q2(s.layoutBox[c], this.constraints[c]));
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
    const c = Ij(s, o.root, this.visualElement.getTransformPagePoint());
    let f = B2(o.layout.layoutBox, c);
    if (l) {
      const h = l(Fj(f));
      this.hasMutatedConstraints = !!h, h && (f = tS(h));
    }
    return f;
  }
  startAnimation(a) {
    const { drag: l, dragMomentum: s, dragElastic: o, dragTransition: c, dragSnapToOrigin: f, onDragTransitionEnd: h } = this.getProps(), p = this.constraints || {}, m = Kn((y) => {
      if (!ko(y, l, this.currentDirection))
        return;
      let b = p && p[y] || {};
      (f === !0 || f === y) && (b = { min: 0, max: 0 });
      const x = o ? 200 : 1e6, T = o ? 40 : 1e7, w = {
        type: "inertia",
        velocity: s ? a[y] : 0,
        bounceStiffness: x,
        bounceDamping: T,
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
    return Yd(this.visualElement, a), s.start(Nh(a, s, 0, l, this.visualElement, !1));
  }
  stopAnimation() {
    Kn((a) => this.getAxisMotionValue(a).stop());
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
    Kn((l) => {
      const { drag: s } = this.getProps();
      if (!ko(l, s, this.currentDirection))
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
    Kn((f) => {
      const h = this.getAxisMotionValue(f);
      if (h && this.constraints !== !1) {
        const p = h.get();
        o[f] = H2({ min: p, max: p }, this.constraints[f]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), Kn((f) => {
      if (!ko(f, a, null))
        return;
      const h = this.getAxisMotionValue(f), { min: p, max: m } = this.constraints[f];
      h.set(st(p, m, o[f]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    P2.set(this.visualElement, this);
    const a = this.visualElement.current, l = Jr(a, "pointerdown", (m) => {
      const { drag: y, dragListener: b = !0 } = this.getProps(), x = m.target, T = x !== a && Cj(x);
      y && b && !T && this.start(m);
    });
    let s;
    const o = () => {
      const { dragConstraints: m } = this.getProps();
      _l(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = G2(a, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, f = c.addEventListener("measure", o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), nt.read(o);
    const h = is(window, "resize", () => this.scalePositionWithinConstraints()), p = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: y }) => {
      this.isDragging && y && (Kn((b) => {
        const x = this.getAxisMotionValue(b);
        x && (this.originPoint[b] += m[b].translate, x.set(x.get() + m[b].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), l(), f(), p && p(), s && s();
    };
  }
  getProps() {
    const a = this.visualElement.getProps(), { drag: l = !1, dragDirectionLock: s = !1, dragPropagation: o = !1, dragConstraints: c = !1, dragElastic: f = Jd, dragMomentum: h = !0 } = a;
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
function O0(t) {
  let a = !0;
  return () => {
    if (a) {
      a = !1;
      return;
    }
    t();
  };
}
function G2(t, a, l) {
  const s = kv(t, O0(l)), o = kv(a, O0(l));
  return () => {
    s(), o();
  };
}
function ko(t, a, l) {
  return (a === !0 || a === t) && (l === null || l === t);
}
function F2(t, a = 10) {
  let l = null;
  return Math.abs(t.y) > a ? l = "y" : Math.abs(t.x) > a && (l = "x"), l;
}
class $2 extends fi {
  constructor(a) {
    super(a), this.removeGroupControls = An, this.removeListeners = An, this.controls = new Y2(a);
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
class X2 extends fi {
  constructor() {
    super(...arguments), this.removePointerDownListener = An;
  }
  onPointerDown(a) {
    this.session = new VS(a, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: US(this.node)
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
class I2 extends S.Component {
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
    s && (s.options.layoutAnchor = l, s.root.didUpdate(), Lh.postRender(() => {
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
function HS(t) {
  const [a, l] = TS(), s = S.useContext(gh);
  return g.jsx(I2, { ...t, layoutGroup: s, switchLayoutGroup: S.useContext(DS), isPresent: a, safeToRemove: l });
}
const K2 = {
  pan: {
    Feature: X2
  },
  drag: {
    Feature: $2,
    ProjectionNode: ES,
    MeasureLayout: HS
  }
};
function L0(t, a, l) {
  const { props: s } = t;
  t.animationState && s.whileHover && t.animationState.setActive("whileHover", l === "Start");
  const o = "onHover" + l, c = s[o];
  c && nt.postRender(() => c(a, ps(a)));
}
class Q2 extends fi {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = Ej(a, (l, s) => (L0(this.node, s, "Start"), (o) => L0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class Z2 extends fi {
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
function U0(t, a, l) {
  const { props: s } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && s.whileTap && t.animationState.setActive("whileTap", l === "Start");
  const o = "onTap" + (l === "End" ? "" : l), c = s[o];
  c && nt.postRender(() => c(a, ps(a)));
}
class J2 extends fi {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = Aj(a, (o, c) => (U0(this.node, c, "Start"), (f, { success: h }) => U0(this.node, f, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Wd = /* @__PURE__ */ new WeakMap(), yd = /* @__PURE__ */ new WeakMap(), W2 = (t) => {
  const a = Wd.get(t.target);
  a && a(t);
}, eN = (t) => {
  t.forEach(W2);
};
function tN({ root: t, ...a }) {
  const l = t || document;
  yd.has(l) || yd.set(l, {});
  const s = yd.get(l), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(eN, { root: t, ...a })), s[o];
}
function nN(t, a, l) {
  const s = tN(a);
  return Wd.set(t, l), s.observe(t), () => {
    Wd.delete(t), s.unobserve(t);
  };
}
const aN = {
  some: 0,
  all: 1
};
class iN extends fi {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: l, margin: s, amount: o = "some", once: c } = a, f = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : aN[o]
    }, h = (p) => {
      const { isIntersecting: m } = p;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: y, onViewportLeave: b } = this.node.getProps(), x = m ? y : b;
      x && x(p);
    };
    this.stopObserver = nN(this.node.current, f, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(lN(a, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function lN({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (l) => t[l] !== a[l];
}
const qS = {
  inView: {
    Feature: iN
  },
  tap: {
    Feature: J2
  },
  focus: {
    Feature: Z2
  },
  hover: {
    Feature: Q2
  }
}, rN = {
  layout: {
    ProjectionNode: ES,
    MeasureLayout: HS
  }
}, sN = {
  ...LS,
  ...qS,
  ...K2,
  ...rN
}, oN = /* @__PURE__ */ zS(sN, OS), kS = {
  renderer: OS,
  ...LS,
  ...qS
};
function uN() {
  !qh.current && Jx();
  const [t] = S.useState(hu.current);
  return t;
}
var cN = { color: { surfaceMuted: "var(--_13pk47p1)" } }, fN = "_1suh9ey0", dN = "_1suh9ey1", hN = "_1suh9ey2", mN = "_1suh9ey3", pN = "_1suh9ey4", yN = "_1suh9ey5";
const Vi = [
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
  const c = uN(), f = S.useRef(null), [h, p] = S.useState(null), m = S.useId(), y = l / 2, b = l / 2, x = l / 2 - 28, T = Vi.length, w = !!s && !o, C = Vi.map((R, H) => {
    const K = -Math.PI / 2 + 2 * Math.PI * H / T, ie = Po(t[H] ?? 0);
    return { x: y + Math.cos(K) * x * ie, y: b + Math.sin(K) * x * ie };
  }), D = Vi.map((R, H) => {
    const K = -Math.PI / 2 + 2 * Math.PI * H / T;
    return { x: y + Math.cos(K) * x, y: b + Math.sin(K) * x, angle: K };
  }), _ = C.map((R) => `${R.x.toFixed(2)},${R.y.toFixed(2)}`).join(" "), L = bN(t), O = S.useCallback(
    (R, H, K) => {
      if (!w || !s || !f.current) return;
      const ie = f.current.getBoundingClientRect(), X = l / ie.width, le = (R - ie.left) * X - y, G = (H - ie.top) * X - b, Z = K ?? vN(le, G, T), N = -Math.PI / 2 + 2 * Math.PI * Z / T, J = Math.cos(N), re = Math.sin(N), ce = (le * J + G * re) / x, Te = Po(ce), j = t.slice();
      j[Z] = V0(Te, 0.01), s(j), p(Z);
    },
    [T, y, b, w, s, x, l, t]
  ), B = (R) => {
    w && (R.preventDefault(), R.target.setPointerCapture?.(R.pointerId), O(R.clientX, R.clientY));
  }, F = (R) => {
    !w || h === null || R.buttons === 0 || O(R.clientX, R.clientY, h);
  }, ne = (R) => {
    R.target.releasePointerCapture?.(R.pointerId), p(null);
  }, te = (R) => {
    if (!w || !s) return;
    const H = h ?? L.index, K = R.shiftKey ? 0.1 : 0.05;
    let ie = t[H] ?? 0, X = H;
    switch (R.key) {
      case "ArrowUp":
      case "ArrowRight":
        ie = Po(ie + K);
        break;
      case "ArrowDown":
      case "ArrowLeft":
        ie = Po(ie - K);
        break;
      case "Tab":
        return;
      case "Home":
        ie = 0;
        break;
      case "End":
        ie = 1;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8": {
        const G = Number(R.key) - 1;
        X = G, ie = t[G] ?? 0, p(G), R.preventDefault();
        return;
      }
      default:
        return;
    }
    R.preventDefault();
    const le = t.slice();
    le[X] = V0(ie, 0.01), s(le), p(X);
  };
  return /* @__PURE__ */ g.jsxs("div", { className: fN, children: [
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
        onPointerDown: B,
        onPointerMove: F,
        onPointerUp: ne,
        onKeyDown: te,
        className: w ? dN : void 0,
        children: [
          /* @__PURE__ */ g.jsxs("g", { stroke: "currentColor", strokeOpacity: 0.18, fill: "none", children: [
            [0.25, 0.5, 0.75, 1].map((R) => /* @__PURE__ */ g.jsx(
              "polygon",
              {
                points: D.map((H) => `${y + (H.x - y) * R},${b + (H.y - b) * R}`).join(" ")
              },
              R
            )),
            D.map((R, H) => /* @__PURE__ */ g.jsx("line", { x1: y, y1: b, x2: R.x, y2: R.y }, H))
          ] }),
          /* @__PURE__ */ g.jsx(
            oN.polygon,
            {
              points: _,
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
          C.map((R, H) => {
            const K = h === H, ie = H === L.index && L.value > 0, X = K ? 6 : ie ? 5 : 3;
            return /* @__PURE__ */ g.jsx(
              "circle",
              {
                cx: R.x,
                cy: R.y,
                r: X,
                fill: K || ie ? "currentColor" : cN.color.surfaceMuted,
                stroke: "currentColor",
                strokeWidth: K ? 2 : 1
              },
              H
            );
          }),
          D.map((R, H) => /* @__PURE__ */ g.jsx(
            "text",
            {
              x: y + Math.cos(R.angle) * (x + 16),
              y: b + Math.sin(R.angle) * (x + 16) + 3,
              textAnchor: "middle",
              fontSize: 10,
              fill: "currentColor",
              opacity: H === L.index && L.value > 0 ? 1 : 0.72,
              fontWeight: H === L.index && L.value > 0 ? 600 : 400,
              children: Vi[H]
            },
            Vi[H]
          ))
        ]
      }
    ),
    /* @__PURE__ */ g.jsx("div", { id: m, className: hN, "aria-live": "polite", children: L.value > 0 ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      /* @__PURE__ */ g.jsx("span", { className: mN, children: Vi[L.index] }),
      /* @__PURE__ */ g.jsx("span", { className: pN, children: L.value.toFixed(2) })
    ] }) : /* @__PURE__ */ g.jsx("span", { className: yN, children: "neutral · 0.00" }) })
  ] });
}
function Po(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function V0(t, a) {
  return Math.round(t / a) * a;
}
function vN(t, a, l) {
  let s = Math.atan2(a, t);
  return s += Math.PI / 2, s < 0 && (s += 2 * Math.PI), Math.round(s * l / (2 * Math.PI)) % l;
}
function bN(t) {
  let a = 0, l = 0;
  for (let s = 0; s < Vi.length; s += 1) {
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
  return /* @__PURE__ */ g.jsx("div", { className: rM, role: "group", "aria-label": "Emotion axes", children: xN.map((o, c) => /* @__PURE__ */ g.jsxs("div", { className: sM, children: [
    /* @__PURE__ */ g.jsx("label", { htmlFor: `emo-slider-${c}`, className: Xb, children: o }),
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
        className: Ib
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
        className: Kb,
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
], PS = [0, 0, 0, 0, 0, 0, 0, 0], TN = `Per-line overrides (inside the [Char|…] tag):

  [Bob|emotion_vector:happy=0.7,surprised=0.2]  text…
  [Alice|qwen:Friendly teen voice]              text…
  [Carol:happy_sarah]                           text…   (legacy compat ref)

Precedence (highest wins): inline → legacy compat ref → mapping default → global panel.
Global alpha applies to every line unless a mapping overrides it.`;
function wN({ value: t, onChange: a, deploymentId: l }) {
  const s = t.mode ?? "none", o = RN(t.vector), c = t.emotionAlpha ?? 1, [f, h] = S.useState([]), [p, m] = S.useState(null), [y, b] = S.useState(""), [x, T] = S.useState(""), [w, C] = S.useState(0), [D, _] = S.useState(!1), L = S.useRef(!0);
  S.useEffect(() => (L.current = !0, () => {
    L.current = !1;
  }), []), S.useEffect(() => {
    let X = !1;
    return m(null), ZC(l).then((le) => {
      X || h(B0(le.presets));
    }).catch((le) => {
      X || m(gd(le));
    }), () => {
      X = !0;
    };
  }, [l]);
  const O = S.useMemo(
    () => f.find((X) => X.presetId === x) ?? null,
    [f, x]
  ), B = (X) => {
    a({ ...t, mode: X });
  }, F = (X) => {
    a({ ...t, mode: "emotion_vector", vector: X }), O && !MN(O.vector, X) && T("");
  }, ne = (X) => {
    const le = Math.max(0, Math.min(1, Number.isFinite(X) ? X : 1));
    a({ ...t, emotionAlpha: le });
  }, te = (X) => {
    const le = f.find((G) => G.presetId === X);
    le && (T(X), a({ ...t, mode: "emotion_vector", vector: le.vector }), C((G) => G + 1));
  }, R = async () => {
    const X = y.trim();
    if (X) {
      _(!0), m(null);
      try {
        const le = await JC(l, X, o);
        if (!L.current) return;
        h((G) => B0([le, ...G.filter((Z) => Z.presetId !== le.presetId)])), T(le.presetId), b(""), C((G) => G + 1);
      } catch (le) {
        L.current && m(gd(le));
      } finally {
        L.current && _(!1);
      }
    }
  }, H = async (X) => {
    const le = f;
    h((G) => G.filter((Z) => Z.presetId !== X)), x === X && T("");
    try {
      await WC(l, X);
    } catch (G) {
      L.current && (h(le), m(gd(G)));
    }
  }, K = () => F(PS), ie = () => {
    const X = Array.from({ length: 8 }, () => Math.round(Math.random() * 100) / 100);
    F(X), C((le) => le + 1);
  };
  return /* @__PURE__ */ g.jsxs("div", { className: eM, children: [
    /* @__PURE__ */ g.jsxs("div", { className: tM, children: [
      /* @__PURE__ */ g.jsx(
        gN,
        {
          vector: o,
          pulseKey: w,
          onChange: (X) => F(X),
          disabled: s !== "emotion_vector"
        }
      ),
      /* @__PURE__ */ g.jsx("span", { className: Wf, children: AN(s, O?.presetName) })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: nM, children: [
      /* @__PURE__ */ g.jsx("div", { className: aM, role: "radiogroup", "aria-label": "Emotion source", children: EN.map((X) => /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === X.id,
          className: s === X.id ? lM : iM,
          onClick: () => B(X.id),
          children: X.label
        },
        X.id
      )) }),
      s === "emotion_vector" && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
        /* @__PURE__ */ g.jsxs("div", { className: oM, children: [
          /* @__PURE__ */ g.jsxs(
            "select",
            {
              className: uM,
              value: x,
              onChange: (X) => te(X.currentTarget.value),
              "aria-label": "Load preset",
              children: [
                /* @__PURE__ */ g.jsx("option", { value: "", children: "— Load preset —" }),
                f.map((X) => /* @__PURE__ */ g.jsx("option", { value: X.presetId, children: X.presetName }, X.presetId))
              ]
            }
          ),
          x && /* @__PURE__ */ g.jsx(
            Ke,
            {
              variant: "danger",
              size: "sm",
              onClick: () => void H(x),
              disabled: D,
              children: "Delete preset"
            }
          ),
          /* @__PURE__ */ g.jsx(Ke, { variant: "ghost", size: "sm", onClick: K, children: "Reset" }),
          /* @__PURE__ */ g.jsx(Ke, { variant: "ghost", size: "sm", onClick: ie, children: "Random" })
        ] }),
        /* @__PURE__ */ g.jsx(SN, { vector: o, onChange: F }),
        /* @__PURE__ */ g.jsxs(
          "form",
          {
            className: dM,
            onSubmit: (X) => {
              X.preventDefault(), R();
            },
            children: [
              /* @__PURE__ */ g.jsx(
                "input",
                {
                  type: "text",
                  className: hM,
                  value: y,
                  placeholder: "Name current vector",
                  onChange: (X) => b(X.currentTarget.value),
                  maxLength: 120,
                  "aria-label": "Preset name"
                }
              ),
              /* @__PURE__ */ g.jsx(
                Ke,
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
            className: fM,
            value: t.qwenTemplate ?? "",
            onChange: (X) => a({ ...t, mode: "qwen_template", qwenTemplate: X.currentTarget.value }),
            rows: 4
          }
        )
      ] }),
      s === "audio_ref" && /* @__PURE__ */ g.jsx("p", { className: Wf, children: "Audio references are attached per character in the mapping editor — the global panel only toggles the mode." }),
      s !== "none" && /* @__PURE__ */ g.jsxs("div", { className: cM, children: [
        /* @__PURE__ */ g.jsx("span", { className: Xb, children: "alpha" }),
        /* @__PURE__ */ g.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: c,
            className: Ib,
            onChange: (X) => ne(Number(X.currentTarget.value)),
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
            className: Kb,
            onChange: (X) => ne(Number(X.currentTarget.value)),
            "aria-label": "Emotion alpha numeric"
          }
        )
      ] }),
      p && /* @__PURE__ */ g.jsx(nn, { severity: "error", children: p }),
      /* @__PURE__ */ g.jsx("pre", { className: mM, children: TN })
    ] })
  ] });
}
function RN(t) {
  return !t || t.length !== 8 ? [...PS] : t.map((a) => CN(a));
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
function B0(t) {
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
const vd = [
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
function jN({
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
  }, m = vd.find((y) => y.id === o) ?? vd[0];
  return /* @__PURE__ */ g.jsxs("div", { children: [
    /* @__PURE__ */ g.jsxs("label", { className: ii, children: [
      /* @__PURE__ */ g.jsx("span", { className: hn, children: "Format" }),
      /* @__PURE__ */ g.jsxs("select", { value: t, onChange: (y) => a(y.currentTarget.value), children: [
        /* @__PURE__ */ g.jsx("option", { value: "mp3", children: "mp3" }),
        /* @__PURE__ */ g.jsx("option", { value: "wav", children: "wav" }),
        /* @__PURE__ */ g.jsx("option", { value: "flac", children: "flac" })
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("label", { className: ii, children: [
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
        className: ii,
        role: "radiogroup",
        "aria-label": "Cache policy",
        children: [
          /* @__PURE__ */ g.jsx("span", { className: hn, children: "Cache" }),
          vd.map((y) => /* @__PURE__ */ g.jsx(
            Ke,
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
    /* @__PURE__ */ g.jsxs("label", { className: ii, children: [
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
    /* @__PURE__ */ g.jsxs("label", { className: ii, children: [
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
    /* @__PURE__ */ g.jsxs("label", { className: ii, children: [
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
const DN = ["cancelled", "failed", "partial"];
function NN({ runs: t, deploymentId: a }) {
  const l = Fi(), [s, o] = S.useState(null), [c, f] = S.useState(null);
  if (t.length === 0)
    return /* @__PURE__ */ g.jsx(Yl, { title: "No runs yet.", hint: "Generate to see history" });
  const h = async (p) => {
    o(p), f(null);
    try {
      const { runId: m } = await yh(a, p);
      l(`/${a}/runs/${m}`);
    } catch (m) {
      f(zN(m));
    } finally {
      o(null);
    }
  };
  return /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    c && /* @__PURE__ */ g.jsx(nn, { severity: "error", children: c }),
    /* @__PURE__ */ g.jsx("ul", { className: jd, children: t.map((p) => {
      const m = DN.includes(p.status) && p.kind === "batch";
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
          /* @__PURE__ */ g.jsx(Ta, { tone: p.status === "failed" ? "danger" : "warning", children: "partial — resumable" }),
          " ",
          /* @__PURE__ */ g.jsx(
            Ke,
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
function zN(t) {
  return t instanceof $i ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
var _N = "xq3iim0", ON = "xq3iim2 xq3iim1", LN = "xq3iim3 xq3iim1", UN = "xq3iim4", VN = "xq3iim5", BN = "xq3iim6", HN = "xq3iim7";
function qN({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: l
}) {
  const [s, o] = S.useState([]), [c, f] = S.useState(a), [h, p] = S.useState(!0), [m, y] = S.useState(!1), [b, x] = S.useState(null);
  S.useEffect(() => {
    let w = !1;
    return p(!0), su(t).then(({ voiceAssets: C }) => {
      w || o(C);
    }).catch((C) => {
      w || x(C instanceof Error ? C.message : "Failed to load voices");
    }).finally(() => {
      w || p(!1);
    }), () => {
      w = !0;
    };
  }, [t]);
  async function T(w) {
    y(!0), x(null);
    const C = c;
    f(w);
    try {
      await BR(t, w), l?.(w);
    } catch (D) {
      f(C), x(D instanceof Error ? D.message : "Failed to update default voice");
    } finally {
      y(!1);
    }
  }
  return h ? /* @__PURE__ */ g.jsx("p", { className: BN, children: "Loading voices…" }) : b ? /* @__PURE__ */ g.jsx("p", { className: HN, children: b }) : s.length === 0 ? /* @__PURE__ */ g.jsx(
    Yl,
    {
      title: "No voices yet.",
      hint: "Upload a voice in Mappings to enable quick mode."
    }
  ) : /* @__PURE__ */ g.jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Default voice for quick mode",
      className: _N,
      children: s.map((w) => {
        const C = w.voiceAssetId === c;
        return /* @__PURE__ */ g.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": C,
            disabled: m,
            onClick: () => void T(C ? null : w.voiceAssetId),
            className: C ? LN : ON,
            children: [
              /* @__PURE__ */ g.jsx("span", { className: UN, children: w.displayName }),
              w.durationMs !== null && w.durationMs !== void 0 && /* @__PURE__ */ g.jsx("span", { className: VN, children: kN(w.durationMs) })
            ]
          },
          w.voiceAssetId
        );
      })
    }
  );
}
function kN(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const l = Math.floor(a / 60), s = Math.round(a - l * 60);
  return `${l}:${s.toString().padStart(2, "0")}`;
}
function PN(t) {
  const a = Fi(), [l, s] = S.useState("idle"), [o, c] = S.useState(null), [f, h] = S.useState(/* @__PURE__ */ new Map()), [p, m] = S.useState(null), [y, b] = S.useState(null), x = S.useRef(null);
  S.useEffect(() => () => {
    x.current?.();
  }, []);
  const T = S.useCallback(async () => {
    s("starting"), m(null), h(/* @__PURE__ */ new Map()), b(null);
    try {
      const R = await GR(t.deploymentId, t.createPayload);
      c(R.runId), s("running"), x.current?.(), x.current = yv(
        t.deploymentId,
        R.runId,
        (H) => H0(H, h, s, b, t.deploymentId, R.runId),
        () => s("error")
      );
    } catch (R) {
      s("error"), m(bd(R));
    }
  }, [t.deploymentId, t.createPayload]), w = S.useCallback(async () => {
    if (o)
      try {
        await FR(t.deploymentId, o);
      } catch (R) {
        m(bd(R));
      }
  }, [t.deploymentId, o]), C = Array.from(f.values()).sort((R, H) => R.globalIndex - H.globalIndex), D = l === "starting" || l === "running", _ = y?.status === "partial", L = C.filter((R) => R.status === "failed"), O = (() => {
    if (l !== "terminal" || L.length === 0) return null;
    const R = /* @__PURE__ */ new Map();
    for (const X of L) {
      const le = X.failureCategory ?? "unknown";
      R.set(le, (R.get(le) ?? 0) + 1);
    }
    let H = "unknown", K = 0;
    for (const [X, le] of R)
      le > K && (H = X, K = le);
    const ie = C.length;
    return { category: H, count: K, total: ie };
  })(), B = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, F = p?.toLowerCase().includes("unmapped") ?? !1, ne = t.diagnostics ?? [], te = ne.find((R) => R.status === "fail");
  return /* @__PURE__ */ g.jsxs("div", { children: [
    ne.length > 0 && /* @__PURE__ */ g.jsx("ul", { className: HC, "aria-label": "Pre-flight checks", children: ne.map((R) => /* @__PURE__ */ g.jsxs("li", { className: qC, children: [
      /* @__PURE__ */ g.jsx(Ta, { tone: GN(R.status), children: FN(R.status) }),
      /* @__PURE__ */ g.jsx("span", { className: kC, children: R.label }),
      R.detail && /* @__PURE__ */ g.jsx("span", { className: PC, children: R.detail })
    ] }, R.label)) }),
    p && /* @__PURE__ */ g.jsxs(
      nn,
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
          F && /* @__PURE__ */ g.jsx(
            Ke,
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
    /* @__PURE__ */ g.jsxs("div", { className: ii, children: [
      /* @__PURE__ */ g.jsx(
        Ke,
        {
          disabled: !t.canGenerate || D || !!te,
          onClick: T,
          children: l === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ g.jsx(Ke, { variant: "danger", disabled: !D, onClick: w, children: "Cancel" })
    ] }),
    O && /* @__PURE__ */ g.jsxs(nn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ g.jsxs("strong", { children: [
        "Run failed — ",
        O.count,
        " of ",
        O.total,
        " segments failed with ",
        /* @__PURE__ */ g.jsx("code", { children: O.category })
      ] }),
      B[O.category] && /* @__PURE__ */ g.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: B[O.category] })
    ] }),
    y?.exportArtifactRef && /* @__PURE__ */ g.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${y.exportArtifactRef}/download`,
        download: !0,
        className: `${Fb.secondary} ${$b.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    _ && y && /* @__PURE__ */ g.jsxs(nn, { severity: "warning", children: [
      /* @__PURE__ */ g.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ g.jsx(
        Ke,
        {
          variant: "secondary",
          onClick: async () => {
            try {
              const R = await yh(t.deploymentId, y.runId);
              c(R.runId), h(/* @__PURE__ */ new Map()), b(null), s("running"), x.current?.(), x.current = yv(
                t.deploymentId,
                R.runId,
                (H) => H0(H, h, s, b, t.deploymentId, R.runId),
                () => s("error")
              );
            } catch (R) {
              m(bd(R)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    C.length > 0 && /* @__PURE__ */ g.jsxs("table", { className: VC, children: [
      /* @__PURE__ */ g.jsx("thead", { children: /* @__PURE__ */ g.jsxs("tr", { children: [
        /* @__PURE__ */ g.jsx("th", { className: ni, children: "#" }),
        /* @__PURE__ */ g.jsx("th", { className: ni, children: "Status" }),
        /* @__PURE__ */ g.jsx("th", { className: ni, children: "Duration" }),
        /* @__PURE__ */ g.jsx("th", { className: ni, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ g.jsx("tbody", { children: C.map((R) => /* @__PURE__ */ g.jsxs("tr", { className: BC, children: [
        /* @__PURE__ */ g.jsx("td", { className: ni, children: R.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ g.jsx("td", { className: ni, children: /* @__PURE__ */ g.jsx(Ta, { tone: YN(R.status), children: R.status }) }),
        /* @__PURE__ */ g.jsx("td", { className: ni, children: R.durationMs ? `${R.durationMs} ms` : "—" }),
        /* @__PURE__ */ g.jsx("td", { className: ni, children: R.failureCategory ?? "" })
      ] }, R.globalIndex)) })
    ] })
  ] });
}
async function H0(t, a, l, s, o, c) {
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
        const f = await ph(o, c);
        s(f);
      } catch {
      }
      return;
  }
}
function YN(t) {
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
function FN(t) {
  switch (t) {
    case "ok":
      return "ok";
    case "warn":
      return "warn";
    case "fail":
      return "stop";
  }
}
function bd(t) {
  return t instanceof $i || t instanceof Error ? t.message : "unknown error";
}
const q0 = [
  "var(--accent, #ba9eff)",
  "var(--secondary, #9093ff)",
  "var(--tertiary, #ff8439)",
  "var(--success, #80e0a8)",
  "var(--warning, #f0c265)",
  "var(--info, #7fdbff)"
];
function $N(t) {
  const a = Fi(), l = S.useRef(null), { tokens: s, attributions: o, unresolved: c, predictedFilenames: f, characterColor: h } = S.useMemo(
    () => IN(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), p = (m) => {
    const y = l.current;
    y && (y.scrollTop = m.currentTarget.scrollTop, y.scrollLeft = m.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ g.jsxs("div", { children: [
    /* @__PURE__ */ g.jsxs("div", { className: zC, children: [
      /* @__PURE__ */ g.jsx("div", { ref: l, className: _C, "aria-hidden": "true", children: s.map((m, y) => XN(m, y, h)) }),
      /* @__PURE__ */ g.jsx(
        "textarea",
        {
          className: OC,
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
    c.length > 0 && /* @__PURE__ */ g.jsxs(nn, { severity: "error", children: [
      /* @__PURE__ */ g.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      c.map((m) => /* @__PURE__ */ g.jsxs(
        Ke,
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
      /* @__PURE__ */ g.jsx("ul", { className: jd, children: o.map((m) => /* @__PURE__ */ g.jsxs("li", { children: [
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
      /* @__PURE__ */ g.jsx("ul", { className: jd, children: f.map((m) => /* @__PURE__ */ g.jsx("li", { children: m }, m)) })
    ] })
  ] });
}
function XN(t, a, l) {
  if (t.kind === "blank")
    return /* @__PURE__ */ g.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ g.jsxs("span", { children: [
      /* @__PURE__ */ g.jsx("span", { className: vv, children: t.raw }),
      `
`
    ] }, a);
  const s = l.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? gv : `${gv} ${LC}`;
  return /* @__PURE__ */ g.jsxs("span", { children: [
    /* @__PURE__ */ g.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ g.jsxs("span", { className: UC, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ g.jsxs("span", { className: vv, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function IN(t, a, l) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = [], f = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Map(), p = [], m = /* @__PURE__ */ new Map();
  let y = 0;
  const b = t.split(/\r?\n/);
  let x = 0;
  return b.forEach((T, w) => {
    const C = T.trim();
    if (!C) {
      o.push({ kind: "blank", raw: T });
      return;
    }
    const D = w + 1, _ = C.match(s);
    let L = "Narrator", O = C, B, F = !1;
    if (_ && _.groups) {
      F = !0;
      const H = (_.groups.body ?? "").trim(), K = (_.groups.rest ?? "").trim();
      L = ((H.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", B = (H.includes("|") ? H.slice(H.indexOf("|") + 1) : "").trim() || void 0, O = K;
    }
    x += 1;
    const ne = L.toLowerCase(), te = (h.get(ne) ?? 0) + 1;
    h.set(ne, te);
    const R = L === "Narrator" || l.has(ne);
    if (R || f.add(L), L !== "Narrator" && !m.has(ne) && (m.set(ne, q0[y % q0.length] ?? "currentColor"), y += 1), F) {
      const H = { kind: "character", raw: T, character: L, text: O, hasMapping: R };
      B !== void 0 && (H.override = B), o.push(H);
    } else
      o.push({ kind: "narrator", raw: T });
    c.push({ lineNumber: D, character: L, text: O, hasMapping: R }), p.push(
      `${x.toString().padStart(3, "0")}_${KN(L)}_${te.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: c,
    unresolved: Array.from(f),
    predictedFilenames: p,
    characterColor: m
  };
}
function KN(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
function QN(t) {
  const a = t.workflowCustomised ?? !1, l = t.unmappableFields ?? [];
  return /* @__PURE__ */ g.jsxs("div", { className: MC, children: [
    /* @__PURE__ */ g.jsxs("header", { className: DC, children: [
      /* @__PURE__ */ g.jsx("h1", { className: NC, children: t.deployment.displayName }),
      t.header
    ] }),
    a && /* @__PURE__ */ g.jsxs(nn, { severity: "warning", children: [
      /* @__PURE__ */ g.jsx("strong", { children: "Workflow customised." }),
      " ",
      l.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${l.join(", ")}.`,
      " ",
      /* @__PURE__ */ g.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: AC, children: [
      /* @__PURE__ */ g.jsxs(tn, { "aria-labelledby": "recipe-section-script", children: [
        /* @__PURE__ */ g.jsx("h2", { id: "recipe-section-script", className: Rn, children: "01 / Script" }),
        t.scriptEditor
      ] }),
      /* @__PURE__ */ g.jsxs(tn, { "aria-labelledby": "recipe-section-settings", children: [
        /* @__PURE__ */ g.jsx("h2", { id: "recipe-section-settings", className: Rn, children: "02 / Settings" }),
        t.settingsPanel
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: jC, children: [
      /* @__PURE__ */ g.jsxs(tn, { "aria-labelledby": "recipe-section-run", children: [
        /* @__PURE__ */ g.jsx("h2", { id: "recipe-section-run", className: Rn, children: "03 / Run" }),
        t.runPanel
      ] }),
      /* @__PURE__ */ g.jsxs(tn, { "aria-labelledby": "recipe-section-emotion", children: [
        /* @__PURE__ */ g.jsx("h2", { id: "recipe-section-emotion", className: Rn, children: "04 / Emotion" }),
        t.emotionPanel
      ] }),
      /* @__PURE__ */ g.jsxs(tn, { "aria-labelledby": "recipe-section-history", children: [
        /* @__PURE__ */ g.jsx("h2", { id: "recipe-section-history", className: Rn, children: "05 / Recent runs" }),
        t.historyPanel
      ] })
    ] })
  ] });
}
function ZN() {
  const { deployment: t, mappings: a, runs: l, workflow: s } = us(), [o, c] = S.useState(""), [f, h] = S.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [p, m] = S.useState(t.defaultSpeedFactor ?? 1), [y, b] = S.useState({
    mode: "none",
    emotionAlpha: 1
  }), [x, T] = S.useState({}), [w, C] = S.useState("use_cache"), [D, _] = S.useState(t.defaultVoiceAssetId != null), L = S.useMemo(
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
  ), O = S.useMemo(() => {
    const F = /* @__PURE__ */ new Map();
    for (const ne of a)
      F.set(ne.characterName.toLowerCase(), ne);
    return F;
  }, [a]), B = S.useMemo(() => {
    const F = [], ne = o.trim();
    if (ne.length === 0)
      F.push({ label: "Script", status: "fail", detail: "empty" });
    else {
      const te = ne.split(/\r?\n/).filter((R) => R.trim().length > 0).length;
      F.push({ label: "Script", status: "ok", detail: `${te} lines` });
    }
    if (D)
      t.defaultVoiceAssetId ? F.push({ label: "Quick voice", status: "ok", detail: "default voice set" }) : F.push({ label: "Quick voice", status: "fail", detail: "no default voice" });
    else {
      const te = /* @__PURE__ */ new Set(), R = /^\[(?<body>[^\]]*)\]/;
      for (const K of ne.split(/\r?\n/)) {
        const ie = K.trim();
        if (!ie) continue;
        const G = (ie.match(R)?.groups?.body?.split("|")[0]?.trim() ?? "").split(":")[0]?.trim() ?? "";
        G && te.add(G.toLowerCase());
      }
      const H = Array.from(te).filter((K) => !O.has(K));
      te.size === 0 ? F.push({ label: "Cast", status: "warn", detail: "no characters detected" }) : H.length === 0 ? F.push({
        label: "Cast",
        status: "ok",
        detail: `${te.size} mapped`
      }) : F.push({
        label: "Cast",
        status: "fail",
        detail: `${H.length} unmapped`
      });
    }
    return y.mode === "qwen_template" && !y.qwenTemplate?.trim() && F.push({ label: "Emotion", status: "warn", detail: "Qwen template empty" }), F;
  }, [o, D, t.defaultVoiceAssetId, O, y]);
  return /* @__PURE__ */ g.jsx(
    QN,
    {
      deployment: t,
      workflowCustomised: s.workflow.customised,
      unmappableFields: s.unmappableFields,
      header: /* @__PURE__ */ g.jsx(IC, { deployment: t }),
      scriptEditor: /* @__PURE__ */ g.jsxs("div", { children: [
        /* @__PURE__ */ g.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
          /* @__PURE__ */ g.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ g.jsx(
              "input",
              {
                type: "checkbox",
                checked: D,
                onChange: (F) => _(F.target.checked)
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
          $N,
          {
            value: o,
            onChange: c,
            outputFormat: f,
            mappings: O,
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
        jN,
        {
          outputFormat: f,
          onOutputFormatChange: h,
          speedFactor: p,
          onSpeedFactorChange: m,
          cachePolicy: w,
          onCachePolicyChange: C,
          generation: x,
          onGenerationChange: T
        }
      ),
      runPanel: /* @__PURE__ */ g.jsx(
        PN,
        {
          deploymentId: t.deploymentId,
          createPayload: L,
          canGenerate: o.trim().length > 0,
          diagnostics: B
        }
      ),
      historyPanel: /* @__PURE__ */ g.jsx(NN, { runs: l, deploymentId: t.deploymentId })
    }
  );
}
const k0 = 32, P0 = -30, Y0 = -6, G0 = 0.5, F0 = 2;
class Pl extends Error {
  constructor(a, l) {
    super(l), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function JN(t, a, l, s = {}) {
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
async function WN(t, a, l, s, o = {}) {
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
async function ez(t, a, l, s = {}) {
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
async function tz(t, a, l, s = 50, o = {}) {
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
function YS(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > k0)
    return {
      message: `Chain exceeds the maximum of ${k0} operations.`
    };
  for (const l of t.ops) {
    const s = nz(l, a);
    if (s) return s;
  }
  return null;
}
function nz(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return az(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < P0 || t.target_lufs > Y0 ? {
        opId: t.id,
        message: `Normalize target must be between ${P0} and ${Y0} LUFS.`
      } : null;
    case "speed":
      return t.factor < G0 || t.factor > F0 ? {
        opId: t.id,
        message: `Speed factor must be between ${G0}× and ${F0}×.`
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
function az(t, a, l, s) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : l <= a ? { opId: t, message: "End must be greater than start." } : s > 0 && l > s ? { opId: t, message: "End extends past source duration." } : null;
}
async function Au(t, a) {
  const l = await t.json().catch(() => null);
  return l?.error?.message ?? l?.message ?? `${a} failed: ${t.status}`;
}
const $0 = /* @__PURE__ */ new Map();
function iz(t, a) {
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
    const o = `${t}::${a}`, c = $0.get(o);
    if (c) {
      s({ peaks: c, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), lz(t, a, f.signal).then((h) => {
      f.signal.aborted || ($0.set(o, h), s({ peaks: h, isLoading: !1, error: null }));
    }).catch((h) => {
      if (f.signal.aborted) return;
      const p = h instanceof Error ? h.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: p });
    }), () => f.abort();
  }, [t, a]), l;
}
async function lz(t, a, l) {
  const s = await fetch(t, { signal: l });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (l.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return rz(f, a);
}
function rz(t, a) {
  const l = t.numberOfChannels, s = t.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), f = [];
  for (let h = 0; h < l; h += 1) f.push(t.getChannelData(h));
  for (let h = 0; h < a; h += 1) {
    const p = h * o, m = Math.min(s, p + o);
    let y = 0;
    for (let b = p; b < m; b += 1) {
      let x = 0;
      for (let w = 0; w < l; w += 1) {
        const C = f[w];
        C && (x += Math.abs(C[b] ?? 0));
      }
      const T = x / l;
      T > y && (y = T);
    }
    c[h] = y;
  }
  return c;
}
const X0 = "(prefers-reduced-motion: reduce)";
function sz() {
  const [t, a] = S.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(X0).matches);
  return S.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const l = window.matchMedia(X0), s = (o) => a(o.matches);
    return l.addEventListener("change", s), () => l.removeEventListener("change", s);
  }, []), t;
}
var oz = "mquzal0", uz = "mquzal1", I0 = "mquzal2", K0 = "mquzal3", Q0 = "mquzal4", cz = "mquzal5", Z0 = "mquzal6", J0 = "mquzal7";
const fz = 120, dz = 720;
function GS(t) {
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
    width: y = dz,
    height: b = fz
  } = t, x = S.useRef(null), T = S.useRef(null), w = S.useRef(null), C = iz(a, y), D = sz();
  S.useEffect(() => {
    hz(x.current, C.peaks, y, b);
  }, [C.peaks, y, b]);
  const _ = S.useCallback(
    (R) => {
      const H = T.current?.getBoundingClientRect();
      if (!H || H.width <= 0) return 0;
      const K = Math.max(0, Math.min(1, (R - H.left) / H.width));
      return Math.round(K * l);
    },
    [l]
  );
  S.useEffect(() => {
    const R = (K) => {
      if (!w.current) return;
      const ie = _(K.clientX);
      w.current === "start" ? c(Yo(ie, 0, o - 1)) : f(Yo(ie, s + 1, l));
    }, H = () => {
      w.current = null;
    };
    return window.addEventListener("pointermove", R), window.addEventListener("pointerup", H), () => {
      window.removeEventListener("pointermove", R), window.removeEventListener("pointerup", H);
    };
  }, [_, l, o, s, c, f]);
  const L = (R) => (H) => {
    H.preventDefault(), H.stopPropagation(), w.current = R;
  }, O = (R) => {
    !m || R.target.closest("[data-handle]") || m(_(R.clientX));
  }, B = (R) => (H) => {
    const K = H.shiftKey ? 100 : H.ctrlKey ? 1 : 10;
    let ie = 0;
    if (H.key === "ArrowLeft") ie = -K;
    else if (H.key === "ArrowRight") ie = K;
    else return;
    H.preventDefault(), R === "start" ? c(Yo(s + ie, 0, o - 1)) : f(Yo(o + ie, s + 1, l));
  }, F = xd(s, l), ne = xd(o, l), te = xd(p, l);
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      ref: T,
      className: oz,
      style: { height: b },
      onPointerDown: O,
      children: [
        /* @__PURE__ */ g.jsx(
          "canvas",
          {
            ref: x,
            width: y,
            height: b,
            className: uz,
            "aria-label": "Audio waveform"
          }
        ),
        C.isLoading && /* @__PURE__ */ g.jsx("div", { className: J0, children: "Decoding waveform…" }),
        C.error && /* @__PURE__ */ g.jsx("div", { className: J0, role: "alert", children: C.error }),
        /* @__PURE__ */ g.jsx("div", { className: Z0, style: { left: 0, width: `${F}%` } }),
        /* @__PURE__ */ g.jsx(
          "div",
          {
            className: Z0,
            style: { left: `${ne}%`, right: 0, width: `${100 - ne}%` }
          }
        ),
        /* @__PURE__ */ g.jsxs(
          "div",
          {
            className: I0,
            style: { left: `${F}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": l,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: L("start"),
            onKeyDown: B("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ g.jsx("span", { className: K0, "aria-hidden": "true" }),
              /* @__PURE__ */ g.jsx("span", { className: Q0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ g.jsxs(
          "div",
          {
            className: I0,
            style: { left: `${ne}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": l,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: L("end"),
            onKeyDown: B("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ g.jsx("span", { className: K0, "aria-hidden": "true" }),
              /* @__PURE__ */ g.jsx("span", { className: Q0, "aria-hidden": "true" })
            ]
          }
        ),
        h && /* @__PURE__ */ g.jsx(
          "div",
          {
            className: cz,
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
function xd(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function Yo(t, a, l) {
  return Math.max(a, Math.min(l, t));
}
function hz(t, a, l, s) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, l, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = mz(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, l);
  for (let h = 0; h < f; h += 1) {
    const p = a[h] ?? 0, m = Math.max(1, p * (s - 4));
    o.fillRect(h, c - m / 2, 1, m);
  }
}
function mz(t, a, l) {
  return getComputedStyle(t).getPropertyValue(a).trim() || l;
}
var pz = "r8lfsm0", yz = "r8lfsm1", gz = "r8lfsm2", vz = "r8lfsm3", bz = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, xz = "_1b1zchy3", Sz = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, Ez = "_1b1zchy6", Tz = "_1b1zchy7";
const FS = S.createContext("standalone");
function $S({
  variant: t = "standalone",
  children: a,
  className: l,
  style: s,
  ...o
}) {
  const c = [bz[t], l].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx(FS.Provider, { value: t, children: /* @__PURE__ */ g.jsx("div", { className: c, style: s, ...o, children: a }) });
}
function XS({
  title: t,
  meta: a,
  children: l,
  className: s,
  titleId: o
}) {
  const c = S.useContext(FS), f = [xz, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsxs("div", { className: f, children: [
    /* @__PURE__ */ g.jsx("h3", { id: o, className: Sz[c], children: t }),
    a ? /* @__PURE__ */ g.jsx("span", { className: Ez, children: a }) : null,
    l
  ] });
}
function IS({ children: t, className: a }) {
  const l = [Tz, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx("div", { className: l, children: t });
}
const W0 = -16, wz = 80, Rz = 720;
function Cz(t) {
  const { deploymentId: a, runId: l, utterance: s, audioUrl: o, onApplied: c, onError: f, onCancel: h } = t, p = s.durationMs ?? 0, [m, y] = S.useState(() => eb(p)), [b, x] = S.useState(!1), [T, w] = S.useState(null), [C, D] = S.useState(!1), _ = S.useRef(null), L = S.useRef(null), O = S.useRef(null);
  S.useEffect(() => {
    y(eb(p)), x(!1), w(null), O.current = null;
  }, [s.utteranceId, p]), S.useEffect(() => () => L.current?.abort(), []), S.useEffect(() => {
    _.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const B = S.useCallback(
    (le) => {
      le.key === "Escape" && (le.stopPropagation(), h());
    },
    [h]
  ), F = S.useMemo(
    () => m.ops.find((le) => le.mode === "trim"),
    [m.ops]
  ), ne = F?.start_ms ?? 0, te = F?.end_ms ?? Math.max(1, p), R = S.useCallback((le, G) => {
    y((Z) => Mz(Z, "trim", (N) => ({
      ...N,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(le)),
      end_ms: Math.max(Math.floor(le) + 1, Math.floor(G))
    })));
  }, []), H = S.useCallback((le) => R(le, te), [te, R]), K = S.useCallback((le) => R(ne, le), [ne, R]), ie = S.useCallback((le) => {
    x(le), y((G) => {
      const Z = G.ops.filter((N) => N.mode !== "normalize");
      if (le) {
        const N = {
          id: Xl(),
          mode: "normalize",
          target_lufs: W0
        };
        return { ...G, ops: [...Z, N] };
      }
      return { ...G, ops: Z };
    });
  }, []), X = S.useCallback(async () => {
    const le = YS(m, p);
    if (le) {
      w(le.message);
      return;
    }
    if (w(null), C) return;
    L.current?.abort();
    const G = new AbortController();
    L.current = G, D(!0);
    try {
      const Z = O.current ?? void 0, N = await WN(
        a,
        l,
        s.utteranceId,
        Z ? { chain: m, digest_before: Z } : { chain: m },
        { signal: G.signal }
      );
      if (G.signal.aborted) return;
      O.current = N.chain_digest, c(N);
    } catch (Z) {
      if (G.signal.aborted) return;
      Z instanceof Pl && (O.current = Z.currentDigest || null);
      const N = Z instanceof Pl ? "Edit chain has changed in another tab. Reload to continue." : Z instanceof Error ? Z.message : "apply failed";
      w(N), f(N);
    } finally {
      G.signal.aborted || D(!1);
    }
  }, [m, p, C, a, l, s.utteranceId, c, f]);
  return /* @__PURE__ */ g.jsx($S, { variant: "nested", children: /* @__PURE__ */ g.jsxs("div", { ref: _, onKeyDown: B, children: [
    /* @__PURE__ */ g.jsx(XS, { title: "Edit segment", meta: `Source · ${Go(p)}` }),
    /* @__PURE__ */ g.jsx(
      GS,
      {
        audioUrl: o,
        durationMs: Math.max(1, p),
        startMs: ne,
        endMs: te,
        onChangeStart: H,
        onChangeEnd: K,
        height: wz,
        width: Rz
      }
    ),
    /* @__PURE__ */ g.jsxs("div", { className: pz, children: [
      /* @__PURE__ */ g.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ g.jsxs("span", { className: yz, children: [
        Go(ne),
        " → ",
        Go(te),
        " · ",
        Go(te - ne)
      ] })
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: gz, children: /* @__PURE__ */ g.jsxs("label", { className: vz, children: [
      /* @__PURE__ */ g.jsx(
        "input",
        {
          type: "checkbox",
          checked: b,
          onChange: (le) => ie(le.currentTarget.checked),
          "aria-label": "Toggle loudness normalization"
        }
      ),
      /* @__PURE__ */ g.jsxs("span", { children: [
        "Normalize to ",
        W0.toFixed(0),
        " LUFS (broadcast-friendly)"
      ] })
    ] }) }),
    /* @__PURE__ */ g.jsxs(IS, { children: [
      /* @__PURE__ */ g.jsx(Ke, { size: "sm", onClick: () => void X(), disabled: C, children: C ? "Applying…" : "Apply" }),
      /* @__PURE__ */ g.jsx(Ke, { variant: "ghost", size: "sm", onClick: h, disabled: C, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ g.jsx(nn, { severity: "error", children: T })
  ] }) });
}
function eb(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Xl(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Mz(t, a, l) {
  const s = t.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Xl(), mode: a };
    return { ...t, ops: [...t.ops, l(c)] };
  }
  const o = [...t.ops];
  return o[s] = l(o[s]), { ...t, ops: o };
}
function Go(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var Az = "jq2zyb2", jz = "jq2zyb3", Dz = "jq2zyb4", Nz = "jq2zyb5", zz = "jq2zyb6", _z = "jq2zyb7", Oz = "jq2zyb8", Lz = "jq2zyb9", Uz = "jq2zyba", Vz = "jq2zybb", Bz = "jq2zybc", Hz = "jq2zybd", qz = "jq2zybe", kz = "jq2zybf jq2zybe", Pz = "jq2zybg", Yz = "jq2zybh", Gz = "jq2zybi", Fz = "jq2zybj", $z = "jq2zybk", Xz = "jq2zybl", Iz = "jq2zybm", Kz = "jq2zybn", Qz = "jq2zybo", Zz = "jq2zybp", Jz = "jq2zybq", Wz = "jq2zybr", e3 = "jq2zybs", t3 = "jq2zybt", n3 = "jq2zybu", a3 = "jq2zybv", i3 = "jq2zybw", l3 = "jq2zybx", r3 = "jq2zyby", s3 = "jq2zybz", tb = "jq2zyb10", o3 = "jq2zyb11", u3 = "jq2zyb12", c3 = "jq2zyb13", f3 = "jq2zyb14";
const d3 = ["cancelled", "failed", "partial"], h3 = 2600;
function m3() {
  const { run: t } = us(), a = Fi(), [l, s] = S.useState(t), [o, c] = S.useState(!1), [f, h] = S.useState(null), [p, m] = S.useState(null), [y, b] = S.useState(
    null
  );
  S.useEffect(() => {
    s(t);
  }, [t]), S.useEffect(() => {
    if (!y) return;
    const B = setTimeout(() => b(null), h3);
    return () => clearTimeout(B);
  }, [y]);
  const x = S.useMemo(() => g3(l), [l]), T = d3.includes(l.status) && l.kind === "batch", w = (l.exportZipStaleAt ?? null) !== null, C = async () => {
    if (l.deploymentId) {
      c(!0), h(null);
      try {
        const { runId: B } = await yh(l.deploymentId, l.runId);
        a(`/${l.deploymentId}/runs/${B}`);
      } catch (B) {
        h(x3(B));
      } finally {
        c(!1);
      }
    }
  }, D = S.useCallback((B) => {
    m((F) => F === B ? null : B);
  }, []), _ = S.useCallback(() => {
    m(null);
  }, []), L = (B, F) => {
    s((ne) => y3(ne, B, F)), m(null), b({ message: "Segment edited", severity: "success" });
  }, O = S.useCallback((B) => {
    b({ message: B, severity: "error" });
  }, []);
  return /* @__PURE__ */ g.jsxs("main", { className: Az, children: [
    /* @__PURE__ */ g.jsxs("div", { className: jz, children: [
      /* @__PURE__ */ g.jsxs("header", { className: Dz, children: [
        /* @__PURE__ */ g.jsxs("p", { className: Nz, children: [
          l.deploymentId ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
            /* @__PURE__ */ g.jsx(cs, { to: `/${l.deploymentId}/recipe`, className: zz, children: "← Back to recipe" }),
            /* @__PURE__ */ g.jsx("span", { className: _z, children: "·" })
          ] }) : null,
          /* @__PURE__ */ g.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ g.jsxs("div", { className: Oz, children: [
          /* @__PURE__ */ g.jsxs("h1", { className: Lz, children: [
            v3(l.kind),
            /* @__PURE__ */ g.jsx("span", { className: Uz, children: l.runId })
          ] }),
          /* @__PURE__ */ g.jsx(Ta, { size: "md", tone: S3(l.status), pulse: l.status === "running", children: l.status })
        ] })
      ] }),
      /* @__PURE__ */ g.jsxs("section", { className: Vz, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ g.jsx(Fo, { label: "Format", value: l.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ g.jsx(Fo, { label: "Speed", value: `${l.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ g.jsx(
          Fo,
          {
            label: "Completed",
            value: `${x.completed} / ${x.total}`,
            progress: x.total > 0 ? x.completed / x.total : 0
          }
        ),
        /* @__PURE__ */ g.jsx(
          Fo,
          {
            label: "Cache hit",
            value: `${x.cacheRatio}%`,
            progress: x.cacheRatio / 100
          }
        )
      ] }),
      T && /* @__PURE__ */ g.jsxs("section", { className: Yz, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ g.jsxs("div", { className: Gz, children: [
          /* @__PURE__ */ g.jsx("h2", { id: "run-detail-resume-title", className: Fz, children: x.failed > 0 ? `${x.failed} line${x.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ g.jsx("p", { className: $z, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ g.jsx(Ke, { size: "lg", disabled: o, onClick: () => void C(), children: o ? "Resuming…" : x.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ g.jsx("p", { className: Xz, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ g.jsxs(tn, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ g.jsxs(aC, { children: [
          /* @__PURE__ */ g.jsx("h2", { id: "run-detail-utterances", className: Rn, children: "01 / Utterances" }),
          x.completed > 0 && /* @__PURE__ */ g.jsxs("span", { className: Iz, children: [
            /* @__PURE__ */ g.jsx("span", { className: Kz, children: x.cached }),
            "/",
            x.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ g.jsx("ul", { className: Qz, children: l.utterances.map((B) => {
          const F = p === B.utteranceId, ne = B.status === "completed" && B.audioArtifactRef !== null && B.audioArtifactRef !== void 0, te = B.derivedArtifactRef ?? B.audioArtifactRef ?? null, R = te ? `/api/v1/artifacts/${encodeURIComponent(te)}/download` : "", H = (B.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ g.jsxs("li", { className: Jz, children: [
            /* @__PURE__ */ g.jsxs("div", { className: Zz, children: [
              /* @__PURE__ */ g.jsxs("span", { className: t3, children: [
                "#",
                B.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ g.jsx("span", { className: n3, title: B.characterDisplay, children: B.characterDisplay }),
              /* @__PURE__ */ g.jsx("span", { className: a3, title: B.text, children: B.text }),
              /* @__PURE__ */ g.jsxs("span", { className: i3, children: [
                B.cacheHit && /* @__PURE__ */ g.jsx("span", { className: l3, children: "cached" }),
                H && /* @__PURE__ */ g.jsx("span", { className: Wz, children: "edited" }),
                B.durationMs ? /* @__PURE__ */ g.jsx("span", { children: b3(B.durationMs) }) : null,
                /* @__PURE__ */ g.jsx(Ta, { tone: E3(B.status), children: B.status }),
                ne && /* @__PURE__ */ g.jsx(
                  "button",
                  {
                    type: "button",
                    className: e3,
                    onClick: () => D(B.utteranceId),
                    "aria-expanded": F,
                    "aria-label": F ? "Close segment editor" : "Edit segment",
                    children: F ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            F && R && l.deploymentId && /* @__PURE__ */ g.jsx(
              Cz,
              {
                deploymentId: l.deploymentId,
                runId: l.runId,
                utterance: B,
                audioUrl: R,
                onApplied: (K) => L(B.utteranceId, K),
                onError: O,
                onCancel: _
              }
            )
          ] }, B.utteranceId);
        }) })
      ] }),
      p3(l, w)
    ] }),
    y && /* @__PURE__ */ g.jsx(
      "div",
      {
        className: f3,
        role: y.severity === "error" ? "alert" : "status",
        "aria-live": y.severity === "error" ? "assertive" : "polite",
        children: y.message
      }
    )
  ] });
}
function p3(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const s = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ g.jsx("div", { className: r3, children: a ? /* @__PURE__ */ g.jsxs("div", { className: o3, children: [
    /* @__PURE__ */ g.jsx("p", { className: u3, children: s }),
    /* @__PURE__ */ g.jsxs(
      "button",
      {
        type: "button",
        className: c3,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ g.jsx("span", { className: tb, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ g.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: s3,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ g.jsx("span", { className: tb, children: "↓" })
      ]
    }
  ) : null });
}
function y3(t, a, l) {
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
function Fo({ label: t, value: a, mono: l, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      className: Bz,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ g.jsx("span", { className: Hz, children: t }),
        /* @__PURE__ */ g.jsx("span", { className: l ? kz : qz, children: a }),
        o !== void 0 && /* @__PURE__ */ g.jsx("span", { className: Pz, "aria-hidden": "true" })
      ]
    }
  );
}
function g3(t) {
  const a = t.utterances.length, l = t.utterances.filter((f) => f.status === "completed").length, s = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, c = l > 0 ? Math.round(o / l * 100) : 0;
  return { total: a, completed: l, failed: s, cached: o, cacheRatio: c };
}
function v3(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function b3(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function x3(t) {
  return t instanceof $i ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function S3(t) {
  switch (t) {
    case "running":
      return "accent";
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "partial":
      return "warning";
    case "queued":
    case "cancelled":
    default:
      return "neutral";
  }
}
function E3(t) {
  switch (t) {
    case "running":
      return "accent";
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "cancelled":
      return "faint";
    case "queued":
    default:
      return "neutral";
  }
}
var T3 = "pcphqj2", w3 = "pcphqj3", R3 = "pcphqj4", C3 = "pcphqj5", M3 = "pcphqj6", A3 = "pcphqj7", j3 = "pcphqj8", D3 = "pcphqj9", N3 = "pcphqja", nb = "pcphqjb", z3 = "pcphqjc", _3 = "pcphqjd", O3 = "pcphqje pcphqjd", L3 = "pcphqjf", U3 = "pcphqjg", V3 = "pcphqjh", B3 = "pcphqji", H3 = "pcphqjj pcphqji", q3 = "pcphqjk pcphqji", k3 = "pcphqjl pcphqji", P3 = "pcphqjm", Sd = "pcphqjn", Ed = "pcphqjo";
function Y3() {
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
  }, []), /* @__PURE__ */ g.jsx("main", { className: T3, children: /* @__PURE__ */ g.jsxs("div", { className: w3, children: [
    /* @__PURE__ */ g.jsxs("header", { className: R3, children: [
      /* @__PURE__ */ g.jsx("p", { className: C3, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ g.jsxs("div", { className: M3, children: [
        /* @__PURE__ */ g.jsx("h1", { className: A3, children: "Queue" }),
        /* @__PURE__ */ g.jsx("span", { className: j3, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ g.jsx("p", { className: D3, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    l ? /* @__PURE__ */ g.jsx(nn, { severity: "error", children: l }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ g.jsx(tn, { density: "compact", children: /* @__PURE__ */ g.jsx(Yl, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ g.jsxs(tn, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ g.jsx("h2", { id: "runtime-queue-section", className: Rn, children: "01 / In flight" }),
      /* @__PURE__ */ g.jsx("ul", { className: N3, children: t.map((o) => {
        const c = o.position === 1;
        return /* @__PURE__ */ g.jsxs(
          "li",
          {
            className: c ? `${nb} ${z3}` : nb,
            children: [
              /* @__PURE__ */ g.jsx("span", { className: c ? O3 : _3, children: o.position }),
              /* @__PURE__ */ g.jsxs("span", { className: L3, children: [
                /* @__PURE__ */ g.jsx("span", { className: U3, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ g.jsx("span", { className: V3, children: o.runId })
              ] }),
              /* @__PURE__ */ g.jsx("span", { className: G3(o.kind), children: F3(o.kind) }),
              /* @__PURE__ */ g.jsx("span", { className: P3, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
                /* @__PURE__ */ g.jsx("span", { className: Sd, children: $3(o.etaSeconds) }),
                /* @__PURE__ */ g.jsx("span", { className: Ed, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
                /* @__PURE__ */ g.jsx("span", { className: Sd, children: o.utteranceTotal }),
                /* @__PURE__ */ g.jsx("span", { className: Ed, children: "lines" })
              ] }) : /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
                /* @__PURE__ */ g.jsx("span", { className: Sd, children: "—" }),
                /* @__PURE__ */ g.jsx("span", { className: Ed, children: "pending" })
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
      return H3;
    case "test_line":
      return q3;
    case "resume":
      return k3;
    default:
      return B3;
  }
}
function F3(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function $3(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), l = t % 60;
  return l === 0 ? `${a}m` : `${a}m ${l}s`;
}
function X3() {
  const { deploymentId: t, prefillCharacterName: a } = us(), l = Fi(), [s, o] = S.useState(a), [c, f] = S.useState(""), [h, p] = S.useState("none"), [m, y] = S.useState(!1), [b, x] = S.useState(null), T = S.useRef(null);
  S.useEffect(() => {
    T.current?.scrollIntoView({ behavior: "smooth", block: "center" }), T.current?.focus();
  }, []);
  const w = async (C) => {
    C.preventDefault(), y(!0), x(null);
    try {
      await Gb(t, {
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
            ref: T,
            value: s,
            onChange: (C) => o(C.currentTarget.value),
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
            onChange: (C) => f(C.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ g.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ g.jsxs("select", { value: h, onChange: (C) => p(C.currentTarget.value), children: [
          /* @__PURE__ */ g.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ g.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ g.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ g.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ g.jsx(Ke, { type: "submit", variant: "primary", disabled: m, children: "Save mapping" }),
      b && /* @__PURE__ */ g.jsx(nn, { severity: "error", children: b })
    ] })
  ] });
}
var I3 = "_1oor31e0", K3 = "_1oor31e1", Q3 = "_1oor31e2", Z3 = "_1oor31e3", J3 = "_1oor31e4", W3 = "_1oor31e5", e_ = "_1oor31e6", t_ = "_1oor31e7", n_ = "_1oor31e8";
const a_ = 8;
function i_(t) {
  const { entries: a, loading: l, error: s } = t;
  return /* @__PURE__ */ g.jsxs("div", { className: I3, "aria-busy": !!l, children: [
    s && /* @__PURE__ */ g.jsx(nn, { severity: "error", children: s }),
    l && !s && /* @__PURE__ */ g.jsx("div", { className: n_, "aria-live": "polite", children: "Loading edit history…" }),
    !l && !s && a.length === 0 && /* @__PURE__ */ g.jsx("div", { className: t_, children: "No edits yet" }),
    !l && !s && a.length > 0 && /* @__PURE__ */ g.jsx("ul", { className: K3, children: a.map((o) => /* @__PURE__ */ g.jsxs("li", { className: Q3, children: [
      /* @__PURE__ */ g.jsx("span", { className: Z3, children: r_(o.recorded_at) }),
      /* @__PURE__ */ g.jsx("span", { className: J3, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ g.jsx("span", { className: W3, title: o.digest_after, children: l_(o.digest_after) }),
      /* @__PURE__ */ g.jsx("span", { className: e_, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function l_(t) {
  return t ? `${t.slice(0, a_)}…` : "—";
}
function r_(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var ab = "_1c63kaw0", s_ = "_1c63kaw1", o_ = "_1c63kaw2", u_ = "_1c63kaw3", c_ = "_1c63kaw4", f_ = "_1c63kaw5", d_ = "_1c63kaw6", h_ = "_1c63kaw7";
function m_({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ g.jsx("div", { className: ab, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ g.jsx("span", { className: s_, children: "No edits yet" }) }) : /* @__PURE__ */ g.jsx("ol", { className: ab, "data-testid": "edit-chain-list", children: t.ops.map((l, s) => /* @__PURE__ */ g.jsxs("li", { className: o_, children: [
    /* @__PURE__ */ g.jsxs("span", { className: u_, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ g.jsxs("span", { className: c_, children: [
      /* @__PURE__ */ g.jsx("span", { className: f_, children: ib(l) }),
      /* @__PURE__ */ g.jsx("span", { className: d_, children: p_(l) })
    ] }),
    /* @__PURE__ */ g.jsx(
      "button",
      {
        type: "button",
        className: h_,
        onClick: () => a(l.id),
        "aria-label": `Remove ${ib(l)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, l.id)) });
}
function ib(t) {
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
function p_(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${lb(t.start_ms)} → ${lb(t.end_ms)}`;
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
function lb(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var Td = "_1o3ytop0", y_ = "_1o3ytop1", g_ = "_1o3ytop2", rb = "_1o3ytop3", v_ = "_1o3ytop4", b_ = "_1o3ytopa", x_ = "_1o3ytopb", S_ = "_1o3ytopc", E_ = "_1o3ytopd", T_ = "_1o3ytope", w_ = "_1o3ytopf";
const sb = -16;
function R_(t) {
  const { voiceAsset: a, deploymentId: l, onChainPersisted: s, onError: o } = t, c = a.durationMs ?? 0, f = S.useMemo(
    () => C_(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [h, p] = S.useState(() => wd(c)), [m, y] = S.useState(null), [b, x] = S.useState(null), [T, w] = S.useState(!1), [C, D] = S.useState(!1), [_, L] = S.useState(!1), [O, B] = S.useState(null), [F, ne] = S.useState([]), [te, R] = S.useState([]), [H, K] = S.useState(!1), [ie, X] = S.useState(null), [le, G] = S.useState(0), Z = S.useRef(null), N = S.useRef(null), J = S.useRef(null), re = S.useRef(null), ce = S.useRef(null), Te = S.useRef(0), j = S.useMemo(
    () => h.ops.some((be) => be.mode === "normalize"),
    [h.ops]
  );
  S.useEffect(() => {
    p(wd(c)), y(null), L(!1), ne([]), ce.current = null;
  }, [a.voiceAssetId, c]), S.useEffect(() => {
    re.current?.abort();
    const be = new AbortController();
    return re.current = be, K(!0), X(null), tz(l, "voice_asset", a.voiceAssetId, 50, {
      signal: be.signal
    }).then((Oe) => {
      be.signal.aborted || R(Oe.entries);
    }).catch((Oe) => {
      if (be.signal.aborted) return;
      const Fe = Oe instanceof Error ? Oe.message : "audit fetch failed";
      X(Fe);
    }).finally(() => {
      be.signal.aborted || K(!1);
    }), () => be.abort();
  }, [l, a.voiceAssetId, le]), S.useEffect(() => () => {
    b && URL.revokeObjectURL(b);
  }, [b]), S.useEffect(() => () => {
    N.current?.abort(), J.current?.abort(), re.current?.abort();
  }, []);
  const I = h.ops.find((be) => be.mode === "trim"), se = h.ops.find((be) => be.mode === "normalize"), ue = I?.start_ms ?? 0, Se = I?.end_ms ?? Math.max(1, c), Re = S.useCallback((be, Oe) => {
    p(
      (Fe) => ob(
        Fe,
        "trim",
        (ut) => ({
          ...ut,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(be)),
          end_ms: Math.max(Math.floor(be) + 1, Math.floor(Oe))
        })
      )
    );
  }, []), De = S.useCallback(
    (be) => Re(be, Se),
    [Se, Re]
  ), ht = S.useCallback(
    (be) => Re(ue, be),
    [ue, Re]
  ), $e = S.useCallback((be) => {
    p((Oe) => {
      const Fe = Oe.ops.filter((ut) => ut.mode !== "normalize");
      if (be) {
        const ut = {
          id: Xl(),
          mode: "normalize",
          target_lufs: sb
        };
        return { ...Oe, ops: [...Fe, ut] };
      }
      return { ...Oe, ops: Fe };
    });
  }, []), ea = S.useCallback(
    (be) => {
      const Oe = h.ops.findIndex((ta) => ta.id === be);
      if (Oe === -1) return;
      const Fe = h.ops[Oe];
      if (!Fe) return;
      const ut = [...h.ops.slice(0, Oe), ...h.ops.slice(Oe + 1)];
      p({ ...h, ops: ut }), ne((ta) => [...ta, { op: Fe, index: Oe }]);
    },
    [h]
  ), Ca = S.useCallback(() => {
    const be = F[F.length - 1];
    if (!be) return;
    const Oe = Math.min(be.index, h.ops.length), Fe = [...h.ops.slice(0, Oe), be.op, ...h.ops.slice(Oe)];
    p({ ...h, ops: Fe }), ne(F.slice(0, -1));
  }, [h, F]), kn = S.useCallback(() => {
    const be = YS(h, c);
    return be ? (y(be.message), !1) : (y(null), !0);
  }, [h, c]), yt = S.useCallback(async () => {
    if (!kn() || T) return;
    N.current?.abort();
    const be = new AbortController();
    N.current = be;
    const Oe = ++Te.current;
    D(!0);
    try {
      const Fe = await ez(a.voiceAssetId, l, h, {
        signal: be.signal
      });
      if (be.signal.aborted || Oe !== Te.current) return;
      b && URL.revokeObjectURL(b);
      const ut = URL.createObjectURL(Fe);
      x(ut), L(!0), requestAnimationFrame(() => Z.current?.play().catch(() => {
      }));
    } catch (Fe) {
      if (be.signal.aborted) return;
      const ut = Fe instanceof Error ? Fe.message : "preview failed";
      y(ut), o(ut);
    } finally {
      be.signal.aborted || D(!1);
    }
  }, [kn, T, a.voiceAssetId, l, h, b, o]), Ht = S.useCallback(async () => {
    if (!kn() || C || T) return;
    N.current?.abort(), J.current?.abort();
    const be = new AbortController();
    J.current = be, w(!0);
    try {
      const Oe = ce.current ?? void 0, Fe = await JN(
        a.voiceAssetId,
        l,
        Oe ? { chain: h, digest_before: Oe } : { chain: h },
        { signal: be.signal }
      );
      if (be.signal.aborted) return;
      ce.current = Fe.chain_digest, y(null), B(Fe.measured_lufs ?? null), ne([]), s(Fe), G((ut) => ut + 1);
    } catch (Oe) {
      if (be.signal.aborted) return;
      const Fe = Oe instanceof Pl;
      Oe instanceof Pl && (ce.current = Oe.currentDigest || null);
      const ut = Fe ? "Edit chain has changed in another tab. Reload to continue." : Oe instanceof Error ? Oe.message : "apply failed";
      y(ut), o(ut);
    } finally {
      be.signal.aborted || w(!1);
    }
  }, [
    kn,
    C,
    T,
    a.voiceAssetId,
    l,
    h,
    s,
    o
  ]), Ma = S.useCallback(() => {
    N.current?.abort(), p(wd(c)), y(null), B(null), L(!1), ne([]), G((be) => be + 1), b && (URL.revokeObjectURL(b), x(null));
  }, [c, b]), di = S.useCallback((be) => {
    p(
      (Oe) => ob(
        Oe,
        "normalize",
        (Fe) => ({
          ...Fe,
          mode: "normalize",
          target_lufs: be
        })
      )
    );
  }, []);
  return /* @__PURE__ */ g.jsxs($S, { variant: "standalone", children: [
    /* @__PURE__ */ g.jsx(
      XS,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${$o(c)}`
      }
    ),
    /* @__PURE__ */ g.jsx(
      GS,
      {
        audioUrl: f,
        durationMs: Math.max(1, c),
        startMs: ue,
        endMs: Se,
        onChangeStart: De,
        onChangeEnd: ht
      }
    ),
    /* @__PURE__ */ g.jsxs("div", { className: Td, children: [
      /* @__PURE__ */ g.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ g.jsxs("span", { className: y_, children: [
        $o(ue),
        " → ",
        $o(Se),
        " · ",
        $o(Se - ue)
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: g_, children: [
      /* @__PURE__ */ g.jsxs("div", { className: rb, children: [
        /* @__PURE__ */ g.jsxs("span", { className: Td, children: [
          /* @__PURE__ */ g.jsx("span", { children: "Normalize loudness" }),
          j && se && /* @__PURE__ */ g.jsxs("span", { className: b_, children: [
            "target ",
            se.target_lufs.toFixed(1),
            " LUFS",
            O !== null && ` · measured ${O.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ g.jsxs("label", { className: v_, children: [
          /* @__PURE__ */ g.jsx(
            "input",
            {
              type: "checkbox",
              checked: j,
              onChange: (be) => $e(be.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ g.jsxs("span", { children: [
            "Target ",
            sb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        j && se && /* @__PURE__ */ g.jsx(
          "input",
          {
            type: "range",
            className: S_,
            min: -30,
            max: -6,
            step: 0.5,
            value: se.target_lufs,
            onChange: (be) => di(Number(be.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: rb, children: [
        /* @__PURE__ */ g.jsxs("span", { className: Td, children: [
          "Operations · ",
          h.ops.length
        ] }),
        /* @__PURE__ */ g.jsx(m_, { chain: h, onRemoveOp: ea })
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs(IS, { children: [
      /* @__PURE__ */ g.jsx(
        Ke,
        {
          variant: "secondary",
          onClick: () => void yt(),
          disabled: C || T,
          children: C ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ g.jsx(
        Ke,
        {
          onClick: () => void Ht(),
          disabled: T || C,
          children: T ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ g.jsx(
        Ke,
        {
          variant: "ghost",
          onClick: Ma,
          disabled: T || C,
          children: "Reset"
        }
      ),
      F.length > 0 && /* @__PURE__ */ g.jsxs(
        Ke,
        {
          variant: "ghost",
          size: "sm",
          onClick: Ca,
          disabled: T || C,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            F.length,
            ")"
          ]
        }
      ),
      _ && /* @__PURE__ */ g.jsx(
        "span",
        {
          className: w_,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    b && /* @__PURE__ */ g.jsx(
      "audio",
      {
        ref: Z,
        src: b,
        controls: !0,
        className: x_,
        "aria-label": "Edit preview"
      }
    ),
    m && /* @__PURE__ */ g.jsx(nn, { severity: "error", children: m }),
    /* @__PURE__ */ g.jsxs("details", { className: E_, children: [
      /* @__PURE__ */ g.jsxs("summary", { className: T_, children: [
        "Edit history",
        te.length > 0 ? ` · ${te.length}` : ""
      ] }),
      /* @__PURE__ */ g.jsx(
        i_,
        {
          entries: te,
          loading: H,
          error: ie
        }
      )
    ] })
  ] });
}
function wd(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Xl(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function ob(t, a, l) {
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
function C_(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var M_ = "go9vi12", A_ = "go9vi13", j_ = "go9vi14", D_ = "go9vi15", N_ = "go9vi16", z_ = "go9vi17", __ = "go9vi18", O_ = "go9vi19", L_ = "go9vi1a go9vi19", U_ = "go9vi1b", V_ = "go9vi1c", B_ = "go9vi1d", H_ = "go9vi1e", q_ = "go9vi1f", k_ = "go9vi1g", P_ = "go9vi1h", Y_ = "go9vi1i", Oi = "go9vi1j", Gr = "go9vi1k", Bl = "go9vi1l", G_ = "go9vi1m go9vi1l", F_ = "go9vi1n", $_ = "go9vi1o go9vi1n", X_ = "go9vi1p go9vi1n", I_ = "go9vi1q", K_ = "go9vi1r", Q_ = "go9vi1s", Z_ = "go9vi1t", KS = "go9vi1u", J_ = "go9vi1v", W_ = "go9vi1w", eO = "go9vi1x go9vi1l", tO = "go9vi1y", nO = "go9vi1z", aO = "go9vi110", iO = "go9vi111", lO = "go9vi112", rO = "go9vi113";
const sO = ["none", "audio_ref", "vector_preset", "qwen_template"];
function oO() {
  const { deployment: t, mappings: a, voiceAssets: l } = us(), [s, o] = S.useState(a), [c, f] = S.useState(l), [h, p] = S.useState(
    a[0]?.mappingId ?? null
  ), [m, y] = S.useState(""), [b, x] = S.useState(null), [T, w] = S.useState(null), C = S.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const Z of c) G.set(Z.voiceAssetId, Z);
    return G;
  }, [c]), D = S.useMemo(() => {
    const G = m.trim().toLowerCase();
    return G ? s.filter((Z) => Z.characterName.toLowerCase().includes(G)) : s;
  }, [s, m]), _ = S.useMemo(
    () => s.find((G) => G.mappingId === h) ?? null,
    [s, h]
  );
  S.useEffect(() => {
    o(a), f(l), p(a[0]?.mappingId ?? null);
  }, [a, l]), S.useEffect(() => {
    if (!T) return;
    const G = setTimeout(() => w(null), 2600);
    return () => clearTimeout(G);
  }, [T]);
  const L = S.useCallback(async () => {
    const G = await su(t.deploymentId);
    f(G.voiceAssets);
  }, [t.deploymentId]), O = S.useCallback(
    (G) => {
      o(
        (Z) => Z.map((N) => N.mappingId === h ? { ...N, ...G } : N)
      );
    },
    [h]
  ), B = S.useCallback(
    async (G) => {
      if (!_) return;
      const Z = _;
      try {
        const N = await HR(t.deploymentId, _.mappingId, G);
        o((J) => J.map((re) => re.mappingId === N.mappingId ? N : re));
      } catch (N) {
        o(
          (J) => J.map((re) => re.mappingId === Z.mappingId ? Z : re)
        ), x(Li(N));
      }
    },
    [_, t.deploymentId]
  ), F = S.useCallback(async () => {
    const G = c[0];
    if (!G) {
      x("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const Z = mO(s), N = await Gb(t.deploymentId, {
        characterName: Z,
        speakerVoiceAssetId: G.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((J) => [...J, N]), p(N.mappingId);
    } catch (Z) {
      x(Li(Z));
    }
  }, [t.deploymentId, c, s]), ne = S.useCallback(async () => {
    if (_ && confirm(`Deactivate mapping for ${_.characterName}?`))
      try {
        await qR(t.deploymentId, _.mappingId), o((G) => G.filter((Z) => Z.mappingId !== _.mappingId)), p(null), w(`Mapping for ${_.characterName} deactivated.`);
      } catch (G) {
        x(Li(G));
      }
  }, [t.deploymentId, _]), te = S.useCallback(
    async (G, Z, N) => {
      try {
        const J = await XR(t.deploymentId, G, Z, N);
        return f((re) => [J, ...re]), w(`${J.displayName} uploaded.`), J;
      } catch (J) {
        return x(Li(J)), null;
      }
    },
    [t.deploymentId]
  ), R = S.useCallback(async () => {
    try {
      const G = await kR(t.deploymentId);
      xO(G, `${t.deploymentId}-mappings.json`), w("Mappings exported to JSON.");
    } catch (G) {
      x(Li(G));
    }
  }, [t.deploymentId]), H = S.useCallback(
    async (G, Z) => {
      try {
        const N = await PR(
          t.deploymentId,
          G.mappings,
          Z
        );
        w(
          `Imported ${N.created.length} • skipped ${N.skipped.length} • replaced ${N.replaced.length}.`
        );
        const J = await su(t.deploymentId);
        f(J.voiceAssets);
      } catch (N) {
        x(Li(N));
      }
    },
    [t.deploymentId]
  ), K = S.useCallback(
    async (G) => {
      await L(), w("Edit applied.");
    },
    [L]
  ), ie = S.useCallback((G) => {
    x(G);
  }, []), X = S.useCallback(
    async (G, Z) => {
      if (!_) return null;
      const N = G.trim() || `[${_.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await $R(t.deploymentId, {
          line: N,
          outputFormat: Z
        })).runId };
      } catch (J) {
        return x(Li(J)), null;
      }
    },
    [t.deploymentId, _]
  ), le = c.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ g.jsxs("div", { className: M_, children: [
    /* @__PURE__ */ g.jsxs("aside", { className: A_, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ g.jsxs("header", { className: j_, children: [
        /* @__PURE__ */ g.jsxs("div", { children: [
          /* @__PURE__ */ g.jsx("h1", { id: "mapping-sidebar-heading", className: D_, children: "Cast" }),
          /* @__PURE__ */ g.jsxs("span", { className: N_, children: [
            s.length,
            " active · ",
            c.length,
            " ",
            le
          ] })
        ] }),
        /* @__PURE__ */ g.jsx(Ke, { variant: "primary", size: "sm", onClick: F, children: "+ Add" })
      ] }),
      /* @__PURE__ */ g.jsx(
        "input",
        {
          type: "search",
          className: z_,
          placeholder: "Search characters",
          value: m,
          onChange: (G) => y(G.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ g.jsx(hO, { onExport: R, onImport: H }),
      /* @__PURE__ */ g.jsx("div", { className: __, children: D.length === 0 ? /* @__PURE__ */ g.jsx(
        Yl,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : D.map((G) => {
        const Z = C.get(G.speakerVoiceAssetId), N = G.mappingId === h;
        return /* @__PURE__ */ g.jsxs(
          "button",
          {
            type: "button",
            className: N ? L_ : O_,
            onClick: () => p(G.mappingId),
            "aria-pressed": N,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ g.jsx("span", { className: U_, "aria-hidden": "true", children: pO(G.characterName) }),
              /* @__PURE__ */ g.jsxs("span", { className: V_, children: [
                /* @__PURE__ */ g.jsx("span", { className: B_, children: G.characterName }),
                /* @__PURE__ */ g.jsxs("span", { className: H_, children: [
                  G.defaultEmotionMode,
                  " · ",
                  Z?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          G.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ g.jsxs("section", { className: q_, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ g.jsx(RS, { features: kS, children: /* @__PURE__ */ g.jsx(l2, { children: T && /* @__PURE__ */ g.jsx(
        _S.div,
        {
          className: J_,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: T
        },
        T
      ) }) }),
      b && /* @__PURE__ */ g.jsx(nn, { severity: "error", children: b }),
      _ ? /* @__PURE__ */ g.jsx(
        cO,
        {
          deploymentId: t.deploymentId,
          mapping: _,
          voiceAssets: c,
          onNameChange: (G) => {
            O({ characterName: G });
          },
          onNameBlur: (G) => {
            G !== _.characterName && G.trim() && B({ characterName: G.trim() });
          },
          onSpeakerChange: (G) => {
            O({ speakerVoiceAssetId: G }), B({ speakerVoiceAssetId: G });
          },
          onModeChange: (G) => {
            O({ defaultEmotionMode: G }), B({ defaultEmotionMode: G });
          },
          onQwenChange: (G) => {
            O({ defaultQwenTemplate: G });
          },
          onQwenBlur: (G) => {
            B({ defaultQwenTemplate: G });
          },
          onSpeedChange: (G) => {
            O({ defaultSpeedFactor: G });
          },
          onSpeedCommit: (G) => {
            B({ defaultSpeedFactor: G });
          },
          onEmotionVoiceChange: (G) => {
            const Z = G || null;
            O({ defaultEmotionVoiceAssetId: Z }), B({ defaultEmotionVoiceAssetId: Z });
          },
          onDelete: ne,
          onUploadVoice: async (G, Z, N) => {
            const J = await te(G, Z, N);
            return J && N === "speaker" && (O({ speakerVoiceAssetId: J.voiceAssetId }), B({ speakerVoiceAssetId: J.voiceAssetId })), await L(), J;
          },
          onTestLine: X,
          onEditChainPersisted: K,
          onEditError: ie
        }
      ) : /* @__PURE__ */ g.jsx(
        uO,
        {
          voiceCount: c.length,
          onUploadVoice: async (G) => {
            await te(G, G.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function uO({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ g.jsxs(tn, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ g.jsxs("div", { className: aO, children: [
      /* @__PURE__ */ g.jsx("p", { className: Rn, children: "01 / Onboarding" }),
      /* @__PURE__ */ g.jsx("h2", { id: "onboarding-heading", className: iO, children: "Upload your first voice" }),
      /* @__PURE__ */ g.jsxs("p", { className: lO, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ g.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ g.jsx(
      QS,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (l) => (await a(l), null)
      }
    )
  ] }) : /* @__PURE__ */ g.jsx(tn, { density: "airy", children: /* @__PURE__ */ g.jsx(
    Yl,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function cO(t) {
  const { mapping: a, voiceAssets: l } = t, s = l.find((w) => w.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = l.find((w) => w.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [c, f] = S.useState(""), [h, p] = S.useState("mp3"), [m, y] = S.useState("idle"), [b, x] = S.useState(null), T = S.useCallback(async () => {
    y("running"), x(null);
    const w = await t.onTestLine(c, h);
    if (!w) {
      y("error"), x("Failed to enqueue test-line run.");
      return;
    }
    const { runId: C } = w;
    for (let D = 0; D < 60; D += 1) {
      await new Promise((_) => setTimeout(_, 500));
      try {
        const _ = await ph(t.deploymentId, C);
        if (_.status === "completed") {
          y("done");
          return;
        }
        if (_.status === "failed" || _.status === "cancelled") {
          y("error"), x(`Run ${_.status}.`);
          return;
        }
      } catch (_) {
        y("error"), x(_ instanceof Error ? _.message : "unknown error");
        return;
      }
    }
    y("error"), x("test-line timed out after 30s");
  }, [t.onTestLine, t.deploymentId, c, h]);
  return /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsxs("header", { className: k_, children: [
      /* @__PURE__ */ g.jsxs("div", { children: [
        /* @__PURE__ */ g.jsx("p", { className: Rn, children: "Character" }),
        /* @__PURE__ */ g.jsx("h2", { className: P_, children: a.characterName })
      ] }),
      /* @__PURE__ */ g.jsx("div", { className: KS, children: /* @__PURE__ */ g.jsx(Ke, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ g.jsxs(
      tn,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: W_,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ g.jsx(
            "input",
            {
              type: "text",
              className: eO,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: c,
              onChange: (w) => f(w.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: m === "running"
            }
          ),
          /* @__PURE__ */ g.jsxs(
            "select",
            {
              className: Bl,
              value: h,
              onChange: (w) => p(w.currentTarget.value),
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
            Ke,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void T(),
              disabled: m === "running",
              children: m === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          m === "done" && /* @__PURE__ */ g.jsx(Ta, { tone: "success", children: "Synthesised — see host logs for output path." }),
          m === "error" && b && /* @__PURE__ */ g.jsx(Ta, { tone: "danger", children: b })
        ]
      }
    ),
    /* @__PURE__ */ g.jsxs("div", { className: Y_, children: [
      /* @__PURE__ */ g.jsxs(tn, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ g.jsx("h3", { id: "identity-heading", className: Rn, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ g.jsxs("label", { className: Gr, children: [
          /* @__PURE__ */ g.jsx("span", { className: Oi, children: "Character name" }),
          /* @__PURE__ */ g.jsx(
            "input",
            {
              className: Bl,
              value: a.characterName,
              onChange: (w) => t.onNameChange(w.currentTarget.value),
              onBlur: (w) => t.onNameBlur(w.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ g.jsxs("label", { className: Gr, children: [
          /* @__PURE__ */ g.jsx("span", { className: Oi, children: "Emotion mode" }),
          /* @__PURE__ */ g.jsx(
            "select",
            {
              className: Bl,
              value: a.defaultEmotionMode,
              onChange: (w) => t.onModeChange(w.currentTarget.value),
              children: sO.map((w) => /* @__PURE__ */ g.jsx("option", { value: w, children: yO(w) }, w))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ g.jsxs("label", { className: Gr, children: [
          /* @__PURE__ */ g.jsxs("span", { className: Oi, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ g.jsx(
            "textarea",
            {
              className: G_,
              value: a.defaultQwenTemplate ?? "",
              onChange: (w) => t.onQwenChange(w.currentTarget.value),
              onBlur: (w) => t.onQwenBlur(w.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ g.jsxs("label", { className: Gr, children: [
          /* @__PURE__ */ g.jsx("span", { className: Oi, children: "Emotion reference" }),
          /* @__PURE__ */ g.jsxs(
            "select",
            {
              className: Bl,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (w) => t.onEmotionVoiceChange(w.currentTarget.value),
              children: [
                /* @__PURE__ */ g.jsx("option", { value: "", children: "— none —" }),
                l.map((w) => /* @__PURE__ */ g.jsxs("option", { value: w.voiceAssetId, children: [
                  w.displayName,
                  " · ",
                  w.kind
                ] }, w.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ g.jsxs("label", { className: Gr, children: [
          /* @__PURE__ */ g.jsxs("span", { className: Oi, children: [
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
              onChange: (w) => t.onSpeedChange(Number(w.currentTarget.value)),
              onMouseUp: (w) => t.onSpeedCommit(Number(w.currentTarget.value)),
              onTouchEnd: (w) => t.onSpeedCommit(Number(w.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ g.jsxs(tn, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ g.jsx("h3", { id: "voice-heading", className: Rn, children: "02 / Voice Reference" }),
        /* @__PURE__ */ g.jsx("span", { className: Oi, children: "Speaker reference" }),
        /* @__PURE__ */ g.jsx(
          fO,
          {
            value: a.speakerVoiceAssetId,
            voices: l,
            onChange: t.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ g.jsx(ub, { voice: s }),
        /* @__PURE__ */ g.jsx(
          QS,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (w) => t.onUploadVoice(w, w.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        s && /* @__PURE__ */ g.jsx(
          R_,
          {
            voiceAsset: s,
            deploymentId: t.deploymentId,
            onChainPersisted: t.onEditChainPersisted,
            onError: t.onEditError
          }
        ),
        o && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
          /* @__PURE__ */ g.jsx("span", { className: Oi, children: "Emotion reference voice" }),
          /* @__PURE__ */ g.jsx(ub, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function fO({
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
function ub({ voice: t }) {
  const a = gO(t.durationMs ?? null);
  return /* @__PURE__ */ g.jsxs("div", { children: [
    /* @__PURE__ */ g.jsxs("div", { className: I_, children: [
      /* @__PURE__ */ g.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ g.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ g.jsx("span", { children: vO(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ g.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ g.jsxs("div", { className: K_, children: [
      /* @__PURE__ */ g.jsx("div", { className: Q_, children: /* @__PURE__ */ g.jsx(RS, { features: kS, children: /* @__PURE__ */ g.jsx(
        _S.div,
        {
          className: Z_,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ g.jsx(Ta, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ g.jsx(dO, { seed: t.contentSha256 })
  ] });
}
function dO({ seed: t }) {
  const a = S.useMemo(() => bO(t, 48), [t]);
  return /* @__PURE__ */ g.jsx("div", { className: tO, "aria-hidden": "true", children: a.map((l, s) => /* @__PURE__ */ g.jsx(
    "span",
    {
      className: nO,
      style: { height: `${Math.max(6, l * 100)}%` }
    },
    s
  )) });
}
function QS({
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
      className: o ? X_ : l ? $_ : F_,
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
function hO({
  onExport: t,
  onImport: a
}) {
  const [l, s] = S.useState("error"), o = S.useRef(null);
  return /* @__PURE__ */ g.jsxs("div", { className: KS, children: [
    /* @__PURE__ */ g.jsx(Ke, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ g.jsx(
      "input",
      {
        ref: o,
        type: "file",
        accept: "application/json,.json",
        className: rO,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (c) => {
          const f = c.currentTarget.files?.[0];
          if (c.currentTarget.value = "", !!f)
            try {
              const h = await f.text(), p = JSON.parse(h);
              a(p, l);
            } catch {
              alert("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ g.jsx(Ke, { variant: "secondary", size: "sm", onClick: () => o.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ g.jsxs(
      "select",
      {
        className: Bl,
        value: l,
        onChange: (c) => s(c.currentTarget.value),
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
function mO(t) {
  const a = new Set(t.map((s) => s.characterName.toLowerCase()));
  let l = t.length + 1;
  for (; a.has(`character ${l}`); ) l += 1;
  return `Character ${l}`;
}
function pO(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function yO(t) {
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
function gO(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function vO(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function bO(t, a) {
  const l = [];
  for (let s = 0; s < a; s += 1) {
    const o = t.charCodeAt(s % t.length);
    l.push((o * 31 + s * 7) % 100 / 100);
  }
  return l;
}
function xO(t, a) {
  const l = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), s = URL.createObjectURL(l), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function Li(t) {
  return t instanceof $i || t instanceof Error ? t.message : "unknown error";
}
function SO() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await VR();
        return { deployments: t };
      },
      Component: vC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Nl(t, "deploymentId");
        return FT(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Nl(t, "deploymentId"), [l, { mappings: s }, { runs: o }, c] = await Promise.all([
          mv(a),
          pv(a),
          YR(a, { limit: 10 }),
          IR(a)
        ]);
        return { deployment: l, mappings: s, runs: o, workflow: c };
      },
      Component: ZN
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Nl(t, "deploymentId"), l = Nl(t, "runId");
        return { run: await ph(a, l) };
      },
      Component: m3
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Nl(t, "deploymentId"), [l, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          mv(a),
          pv(a),
          su(a)
        ]);
        return { deployment: l, mappings: s, voiceAssets: o };
      },
      Component: oO
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
      Component: X3
    },
    {
      path: "/runtime/queue",
      Component: Y3
    }
  ];
}
function Nl(t, a) {
  const l = t[a];
  if (!l)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return l;
}
const eh = "emotion-tts-app", EO = "ext-event", cb = "emotion-tts-stylesheet", fb = ["accent", "density", "card"];
function TO(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function wO() {
  if (typeof document > "u" || document.getElementById(cb)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = cb, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
wO();
class RO extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = yT.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.paint();
  }
  attributeChangedCallback() {
    this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null;
  }
  syncTweaksFromBody() {
    for (const a of fb) {
      const l = TO(a);
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
    const a = this.resolveInitialEntry(), l = Jw(SO(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ g.jsx(S.StrictMode, { children: /* @__PURE__ */ g.jsx(eR, { router: l }) })
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
      new CustomEvent(EO, {
        detail: { topic: a, payload: l },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function CO() {
  typeof customElements > "u" || customElements.get(eh) || customElements.define(eh, RO);
}
typeof customElements < "u" && !customElements.get(eh) && CO();
export {
  CO as register
};
//# sourceMappingURL=emotion-tts.js.map
