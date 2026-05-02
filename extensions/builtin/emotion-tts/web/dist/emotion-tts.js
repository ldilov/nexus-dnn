function WE(t, a) {
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
function eT(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var qf = { exports: {} }, Lr = {};
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
function tT() {
  if (jg) return Lr;
  jg = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function l(s, o, c) {
    var d = null;
    if (c !== void 0 && (d = "" + c), o.key !== void 0 && (d = "" + o.key), "key" in o) {
      c = {};
      for (var h in o)
        h !== "key" && (c[h] = o[h]);
    } else c = o;
    return o = c.ref, {
      $$typeof: t,
      type: s,
      key: d,
      ref: o !== void 0 ? o : null,
      props: c
    };
  }
  return Lr.Fragment = a, Lr.jsx = l, Lr.jsxs = l, Lr;
}
var Dg;
function nT() {
  return Dg || (Dg = 1, qf.exports = tT()), qf.exports;
}
var v = nT(), kf = { exports: {} }, Me = {};
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
function aT() {
  if (Ng) return Me;
  Ng = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), d = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), S = Symbol.iterator;
  function T(j) {
    return j === null || typeof j != "object" ? null : (j = S && j[S] || j["@@iterator"], typeof j == "function" ? j : null);
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
  function _(j, F, le) {
    this.props = j, this.context = F, this.refs = D, this.updater = le || w;
  }
  _.prototype.isReactComponent = {}, _.prototype.setState = function(j, F) {
    if (typeof j != "object" && typeof j != "function" && j != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, j, F, "setState");
  }, _.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function B() {
  }
  B.prototype = _.prototype;
  function L(j, F, le) {
    this.props = j, this.context = F, this.refs = D, this.updater = le || w;
  }
  var V = L.prototype = new B();
  V.constructor = L, R(V, _.prototype), V.isPureReactComponent = !0;
  var $ = Array.isArray;
  function K() {
  }
  var te = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function Q(j, F, le) {
    var oe = le.ref;
    return {
      $$typeof: t,
      type: j,
      key: F,
      ref: oe !== void 0 ? oe : null,
      props: le
    };
  }
  function ne(j, F) {
    return Q(j.type, F, j.props);
  }
  function ce(j) {
    return typeof j == "object" && j !== null && j.$$typeof === t;
  }
  function W(j) {
    var F = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(le) {
      return F[le];
    });
  }
  var se = /\/+/g;
  function G(j, F) {
    return typeof j == "object" && j !== null && j.key != null ? W("" + j.key) : F.toString(36);
  }
  function I(j) {
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
  function N(j, F, le, oe, xe) {
    var we = typeof j;
    (we === "undefined" || we === "boolean") && (j = null);
    var De = !1;
    if (j === null) De = !0;
    else
      switch (we) {
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
                F,
                le,
                oe,
                xe
              );
          }
      }
    if (De)
      return xe = xe(j), De = oe === "" ? "." + G(j, 0) : oe, $(xe) ? (le = "", De != null && (le = De.replace(se, "$&/") + "/"), N(xe, F, le, "", function(ea) {
        return ea;
      })) : xe != null && (ce(xe) && (xe = ne(
        xe,
        le + (xe.key == null || j && j.key === xe.key ? "" : ("" + xe.key).replace(
          se,
          "$&/"
        ) + "/") + De
      )), F.push(xe)), 1;
    De = 0;
    var ht = oe === "" ? "." : oe + ":";
    if ($(j))
      for (var Xe = 0; Xe < j.length; Xe++)
        oe = j[Xe], we = ht + G(oe, Xe), De += N(
          oe,
          F,
          le,
          we,
          xe
        );
    else if (Xe = T(j), typeof Xe == "function")
      for (j = Xe.call(j), Xe = 0; !(oe = j.next()).done; )
        oe = oe.value, we = ht + G(oe, Xe++), De += N(
          oe,
          F,
          le,
          we,
          xe
        );
    else if (we === "object") {
      if (typeof j.then == "function")
        return N(
          I(j),
          F,
          le,
          oe,
          xe
        );
      throw F = String(j), Error(
        "Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function J(j, F, le) {
    if (j == null) return j;
    var oe = [], xe = 0;
    return N(j, oe, "", "", function(we) {
      return F.call(le, we, xe++);
    }), oe;
  }
  function ie(j) {
    if (j._status === -1) {
      var F = j._result;
      F = F(), F.then(
        function(le) {
          (j._status === 0 || j._status === -1) && (j._status = 1, j._result = le);
        },
        function(le) {
          (j._status === 0 || j._status === -1) && (j._status = 2, j._result = le);
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
  }, Re = {
    map: J,
    forEach: function(j, F, le) {
      J(
        j,
        function() {
          F.apply(this, arguments);
        },
        le
      );
    },
    count: function(j) {
      var F = 0;
      return J(j, function() {
        F++;
      }), F;
    },
    toArray: function(j) {
      return J(j, function(F) {
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
  return Me.Activity = b, Me.Children = Re, Me.Component = _, Me.Fragment = l, Me.Profiler = o, Me.PureComponent = L, Me.StrictMode = s, Me.Suspense = p, Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = te, Me.__COMPILER_RUNTIME = {
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
  }, Me.cloneElement = function(j, F, le) {
    if (j == null)
      throw Error(
        "The argument must be a React element, but you passed " + j + "."
      );
    var oe = R({}, j.props), xe = j.key;
    if (F != null)
      for (we in F.key !== void 0 && (xe = "" + F.key), F)
        !A.call(F, we) || we === "key" || we === "__self" || we === "__source" || we === "ref" && F.ref === void 0 || (oe[we] = F[we]);
    var we = arguments.length - 2;
    if (we === 1) oe.children = le;
    else if (1 < we) {
      for (var De = Array(we), ht = 0; ht < we; ht++)
        De[ht] = arguments[ht + 2];
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
  }, Me.createElement = function(j, F, le) {
    var oe, xe = {}, we = null;
    if (F != null)
      for (oe in F.key !== void 0 && (we = "" + F.key), F)
        A.call(F, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (xe[oe] = F[oe]);
    var De = arguments.length - 2;
    if (De === 1) xe.children = le;
    else if (1 < De) {
      for (var ht = Array(De), Xe = 0; Xe < De; Xe++)
        ht[Xe] = arguments[Xe + 2];
      xe.children = ht;
    }
    if (j && j.defaultProps)
      for (oe in De = j.defaultProps, De)
        xe[oe] === void 0 && (xe[oe] = De[oe]);
    return Q(j, we, xe);
  }, Me.createRef = function() {
    return { current: null };
  }, Me.forwardRef = function(j) {
    return { $$typeof: h, render: j };
  }, Me.isValidElement = ce, Me.lazy = function(j) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: j },
      _init: ie
    };
  }, Me.memo = function(j, F) {
    return {
      $$typeof: m,
      type: j,
      compare: F === void 0 ? null : F
    };
  }, Me.startTransition = function(j) {
    var F = te.T, le = {};
    te.T = le;
    try {
      var oe = j(), xe = te.S;
      xe !== null && xe(le, oe), typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then(K, ue);
    } catch (we) {
      ue(we);
    } finally {
      F !== null && le.types !== null && (F.types = le.types), te.T = F;
    }
  }, Me.unstable_useCacheRefresh = function() {
    return te.H.useCacheRefresh();
  }, Me.use = function(j) {
    return te.H.use(j);
  }, Me.useActionState = function(j, F, le) {
    return te.H.useActionState(j, F, le);
  }, Me.useCallback = function(j, F) {
    return te.H.useCallback(j, F);
  }, Me.useContext = function(j) {
    return te.H.useContext(j);
  }, Me.useDebugValue = function() {
  }, Me.useDeferredValue = function(j, F) {
    return te.H.useDeferredValue(j, F);
  }, Me.useEffect = function(j, F) {
    return te.H.useEffect(j, F);
  }, Me.useEffectEvent = function(j) {
    return te.H.useEffectEvent(j);
  }, Me.useId = function() {
    return te.H.useId();
  }, Me.useImperativeHandle = function(j, F, le) {
    return te.H.useImperativeHandle(j, F, le);
  }, Me.useInsertionEffect = function(j, F) {
    return te.H.useInsertionEffect(j, F);
  }, Me.useLayoutEffect = function(j, F) {
    return te.H.useLayoutEffect(j, F);
  }, Me.useMemo = function(j, F) {
    return te.H.useMemo(j, F);
  }, Me.useOptimistic = function(j, F) {
    return te.H.useOptimistic(j, F);
  }, Me.useReducer = function(j, F, le) {
    return te.H.useReducer(j, F, le);
  }, Me.useRef = function(j) {
    return te.H.useRef(j);
  }, Me.useState = function(j) {
    return te.H.useState(j);
  }, Me.useSyncExternalStore = function(j, F, le) {
    return te.H.useSyncExternalStore(
      j,
      F,
      le
    );
  }, Me.useTransition = function() {
    return te.H.useTransition();
  }, Me.version = "19.2.5", Me;
}
var zg;
function eh() {
  return zg || (zg = 1, kf.exports = aT()), kf.exports;
}
var x = eh();
const iT = /* @__PURE__ */ eT(x), lT = /* @__PURE__ */ WE({
  __proto__: null,
  default: iT
}, [x]);
var Pf = { exports: {} }, Ur = {}, Yf = { exports: {} }, Gf = {};
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
function rT() {
  return _g || (_g = 1, (function(t) {
    function a(N, J) {
      var ie = N.length;
      N.push(J);
      e: for (; 0 < ie; ) {
        var ue = ie - 1 >>> 1, Re = N[ue];
        if (0 < o(Re, J))
          N[ue] = J, N[ie] = Re, ie = ue;
        else break e;
      }
    }
    function l(N) {
      return N.length === 0 ? null : N[0];
    }
    function s(N) {
      if (N.length === 0) return null;
      var J = N[0], ie = N.pop();
      if (ie !== J) {
        N[0] = ie;
        e: for (var ue = 0, Re = N.length, j = Re >>> 1; ue < j; ) {
          var F = 2 * (ue + 1) - 1, le = N[F], oe = F + 1, xe = N[oe];
          if (0 > o(le, ie))
            oe < Re && 0 > o(xe, le) ? (N[ue] = xe, N[oe] = ie, ue = oe) : (N[ue] = le, N[F] = ie, ue = F);
          else if (oe < Re && 0 > o(xe, ie))
            N[ue] = xe, N[oe] = ie, ue = oe;
          else break e;
        }
      }
      return J;
    }
    function o(N, J) {
      var ie = N.sortIndex - J.sortIndex;
      return ie !== 0 ? ie : N.id - J.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      t.unstable_now = function() {
        return c.now();
      };
    } else {
      var d = Date, h = d.now();
      t.unstable_now = function() {
        return d.now() - h;
      };
    }
    var p = [], m = [], y = 1, b = null, S = 3, T = !1, w = !1, R = !1, D = !1, _ = typeof setTimeout == "function" ? setTimeout : null, B = typeof clearTimeout == "function" ? clearTimeout : null, L = typeof setImmediate < "u" ? setImmediate : null;
    function V(N) {
      for (var J = l(m); J !== null; ) {
        if (J.callback === null) s(m);
        else if (J.startTime <= N)
          s(m), J.sortIndex = J.expirationTime, a(p, J);
        else break;
        J = l(m);
      }
    }
    function $(N) {
      if (R = !1, V(N), !w)
        if (l(p) !== null)
          w = !0, K || (K = !0, W());
        else {
          var J = l(m);
          J !== null && I($, J.startTime - N);
        }
    }
    var K = !1, te = -1, A = 5, Q = -1;
    function ne() {
      return D ? !0 : !(t.unstable_now() - Q < A);
    }
    function ce() {
      if (D = !1, K) {
        var N = t.unstable_now();
        Q = N;
        var J = !0;
        try {
          e: {
            w = !1, R && (R = !1, B(te), te = -1), T = !0;
            var ie = S;
            try {
              t: {
                for (V(N), b = l(p); b !== null && !(b.expirationTime > N && ne()); ) {
                  var ue = b.callback;
                  if (typeof ue == "function") {
                    b.callback = null, S = b.priorityLevel;
                    var Re = ue(
                      b.expirationTime <= N
                    );
                    if (N = t.unstable_now(), typeof Re == "function") {
                      b.callback = Re, V(N), J = !0;
                      break t;
                    }
                    b === l(p) && s(p), V(N);
                  } else s(p);
                  b = l(p);
                }
                if (b !== null) J = !0;
                else {
                  var j = l(m);
                  j !== null && I(
                    $,
                    j.startTime - N
                  ), J = !1;
                }
              }
              break e;
            } finally {
              b = null, S = ie, T = !1;
            }
            J = void 0;
          }
        } finally {
          J ? W() : K = !1;
        }
      }
    }
    var W;
    if (typeof L == "function")
      W = function() {
        L(ce);
      };
    else if (typeof MessageChannel < "u") {
      var se = new MessageChannel(), G = se.port2;
      se.port1.onmessage = ce, W = function() {
        G.postMessage(null);
      };
    } else
      W = function() {
        _(ce, 0);
      };
    function I(N, J) {
      te = _(function() {
        N(t.unstable_now());
      }, J);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(N) {
      N.callback = null;
    }, t.unstable_forceFrameRate = function(N) {
      0 > N || 125 < N ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < N ? Math.floor(1e3 / N) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, t.unstable_next = function(N) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var J = 3;
          break;
        default:
          J = S;
      }
      var ie = S;
      S = J;
      try {
        return N();
      } finally {
        S = ie;
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
      var ie = S;
      S = N;
      try {
        return J();
      } finally {
        S = ie;
      }
    }, t.unstable_scheduleCallback = function(N, J, ie) {
      var ue = t.unstable_now();
      switch (typeof ie == "object" && ie !== null ? (ie = ie.delay, ie = typeof ie == "number" && 0 < ie ? ue + ie : ue) : ie = ue, N) {
        case 1:
          var Re = -1;
          break;
        case 2:
          Re = 250;
          break;
        case 5:
          Re = 1073741823;
          break;
        case 4:
          Re = 1e4;
          break;
        default:
          Re = 5e3;
      }
      return Re = ie + Re, N = {
        id: y++,
        callback: J,
        priorityLevel: N,
        startTime: ie,
        expirationTime: Re,
        sortIndex: -1
      }, ie > ue ? (N.sortIndex = ie, a(m, N), l(p) === null && N === l(m) && (R ? (B(te), te = -1) : R = !0, I($, ie - ue))) : (N.sortIndex = Re, a(p, N), w || T || (w = !0, K || (K = !0, W()))), N;
    }, t.unstable_shouldYield = ne, t.unstable_wrapCallback = function(N) {
      var J = S;
      return function() {
        var ie = S;
        S = J;
        try {
          return N.apply(this, arguments);
        } finally {
          S = ie;
        }
      };
    };
  })(Gf)), Gf;
}
var Og;
function sT() {
  return Og || (Og = 1, Yf.exports = rT()), Yf.exports;
}
var Ff = { exports: {} }, Pt = {};
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
function oT() {
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
  var d = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
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
    var m = d.T, y = s.p;
    try {
      if (d.T = null, s.p = 2, p) return p();
    } finally {
      d.T = m, s.p = y, s.d.f();
    }
  }, Pt.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(p, m));
  }, Pt.prefetchDNS = function(p) {
    typeof p == "string" && s.d.D(p);
  }, Pt.preinit = function(p, m) {
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
    return d.H.useFormState(p, m, y);
  }, Pt.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Pt.version = "19.2.5", Pt;
}
var Ug;
function uT() {
  if (Ug) return Ff.exports;
  Ug = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Ff.exports = oT(), Ff.exports;
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
function cT() {
  if (Vg) return Ur;
  Vg = 1;
  var t = sT(), a = eh(), l = uT();
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
  function d(e) {
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
          if (f === r) return p(u), n;
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
  var b = Object.assign, S = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), B = Symbol.for("react.consumer"), L = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), K = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), Q = Symbol.for("react.activity"), ne = Symbol.for("react.memo_cache_sentinel"), ce = Symbol.iterator;
  function W(e) {
    return e === null || typeof e != "object" ? null : (e = ce && e[ce] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var se = Symbol.for("react.client.reference");
  function G(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === se ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case R:
        return "Fragment";
      case _:
        return "Profiler";
      case D:
        return "StrictMode";
      case $:
        return "Suspense";
      case K:
        return "SuspenseList";
      case Q:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case L:
          return e.displayName || "Context";
        case B:
          return (e._context.displayName || "Context") + ".Consumer";
        case V:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case te:
          return n = e.displayName || null, n !== null ? n : G(e.type) || "Memo";
        case A:
          n = e._payload, e = e._init;
          try {
            return G(e(n));
          } catch {
          }
      }
    return null;
  }
  var I = Array.isArray, N = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ie = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ue = [], Re = -1;
  function j(e) {
    return { current: e };
  }
  function F(e) {
    0 > Re || (e.current = ue[Re], ue[Re] = null, Re--);
  }
  function le(e, n) {
    Re++, ue[Re] = e.current, e.current = n;
  }
  var oe = j(null), xe = j(null), we = j(null), De = j(null);
  function ht(e, n) {
    switch (le(we, n), le(xe, e), le(oe, null), n.nodeType) {
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
    F(oe), le(oe, e);
  }
  function Xe() {
    F(oe), F(xe), F(we);
  }
  function ea(e) {
    e.memoizedState !== null && le(De, e);
    var n = oe.current, i = Wy(n, e.type);
    n !== i && (le(xe, e), le(oe, i));
  }
  function Ra(e) {
    xe.current === e && (F(oe), F(xe)), De.current === e && (F(De), Nr._currentValue = ie);
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
  var Ca = !1;
  function di(e, n) {
    if (!e || Ca) return "";
    Ca = !0;
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
                } catch (Y) {
                  var P = Y;
                }
                Reflect.construct(e, [], ee);
              } else {
                try {
                  ee.call();
                } catch (Y) {
                  P = Y;
                }
                e.call(ee.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                P = Y;
              }
              (ee = e()) && typeof ee.catch == "function" && ee.catch(function() {
              });
            }
          } catch (Y) {
            if (Y && P && typeof Y.stack == "string")
              return [Y.stack, P.stack];
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
                  var X = `
` + C[r].replace(" at new ", " at ");
                  return e.displayName && X.includes("<anonymous>") && (X = X.replace("<anonymous>", e.displayName)), X;
                }
              while (1 <= r && 0 <= u);
            break;
          }
      }
    } finally {
      Ca = !1, Error.prepareStackTrace = i;
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
  var Fe = Object.prototype.hasOwnProperty, ut = t.unstable_scheduleCallback, ta = t.unstable_cancelCallback, Au = t.unstable_shouldYield, ju = t.unstable_requestPaint, Gt = t.unstable_now, na = t.unstable_getCurrentPriorityLevel, Ma = t.unstable_ImmediatePriority, Xl = t.unstable_UserBlockingPriority, Aa = t.unstable_NormalPriority, Nn = t.unstable_LowPriority, mn = t.unstable_IdlePriority, ps = t.log, Du = t.unstable_setDisableYieldValue, aa = null, Ft = null;
  function Dt(e) {
    if (typeof ps == "function" && Du(e), Ft && typeof Ft.setStrictMode == "function")
      try {
        Ft.setStrictMode(aa, e);
      } catch {
      }
  }
  var qt = Math.clz32 ? Math.clz32 : Nu, ys = Math.log, gs = Math.LN2;
  function Nu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ys(e) / gs | 0) | 0;
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
  function $i(e, n, i) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var u = 0, f = e.suspendedLanes, g = e.pingedLanes;
    e = e.warmLanes;
    var E = r & 134217727;
    return E !== 0 ? (r = E & ~f, r !== 0 ? u = zn(r) : (g &= E, g !== 0 ? u = zn(g) : i || (i = E & ~e, i !== 0 && (u = zn(i))))) : (E = r & ~f, E !== 0 ? u = zn(E) : g !== 0 ? u = zn(g) : i || (i = r & ~e, i !== 0 && (u = zn(i)))), u === 0 ? 0 : n !== 0 && n !== u && (n & f) === 0 && (f = u & -u, i = n & -n, f >= i || f === 32 && (i & 4194048) !== 0) ? n : u;
  }
  function ja(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function zu(e, n) {
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
  function $l() {
    var e = mi;
    return mi <<= 1, (mi & 62914560) === 0 && (mi = 4194304), e;
  }
  function Da(e) {
    for (var n = [], i = 0; 31 > i; i++) n.push(e);
    return n;
  }
  function Pn(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function vs(e, n, i, r, u, f) {
    var g = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var E = e.entanglements, C = e.expirationTimes, q = e.hiddenUpdates;
    for (i = g & ~i; 0 < i; ) {
      var X = 31 - qt(i), ee = 1 << X;
      E[X] = 0, C[X] = -1;
      var P = q[X];
      if (P !== null)
        for (q[X] = null, X = 0; X < P.length; X++) {
          var Y = P[X];
          Y !== null && (Y.lane &= -536870913);
        }
      i &= ~ee;
    }
    r !== 0 && bs(e, r, 0), f !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(g & ~n));
  }
  function bs(e, n, i) {
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
  function M(e, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : O(i), (i & (e.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function O(e) {
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
    var e = J.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Eg(e.type));
  }
  function re(e, n) {
    var i = J.p;
    try {
      return J.p = e, n();
    } finally {
      J.p = i;
    }
  }
  var pe = Math.random().toString(36).slice(2), fe = "__reactFiber$" + pe, de = "__reactProps$" + pe, ge = "__reactContainer$" + pe, he = "__reactEvents$" + pe, Te = "__reactListeners$" + pe, Se = "__reactHandles$" + pe, ke = "__reactResources$" + pe, Ne = "__reactMarker$" + pe;
  function We(e) {
    delete e[fe], delete e[de], delete e[he], delete e[Te], delete e[Se];
  }
  function Qe(e) {
    var n = e[fe];
    if (n) return n;
    for (var i = e.parentNode; i; ) {
      if (n = i[ge] || i[fe]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (e = rg(e); e !== null; ) {
            if (i = e[fe]) return i;
            e = rg(e);
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
  function xt(e) {
    var n = e[ke];
    return n || (n = e[ke] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function nt(e) {
    e[Ne] = !0;
  }
  var Na = /* @__PURE__ */ new Set(), _n = {};
  function Nt(e, n) {
    Yn(e, n), Yn(e + "Capture", n);
  }
  function Yn(e, n) {
    for (_n[e] = n, e = 0; e < n.length; e++)
      Na.add(n[e]);
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
  function at(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Qi(e, n, i) {
    var r = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var u = r.get, f = r.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(g) {
          i = "" + g, f.call(this, g);
        }
      }), Object.defineProperty(e, n, {
        enumerable: r.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(g) {
          i = "" + g;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function Ii(e) {
    if (!e._valueTracker) {
      var n = at(e) ? "checked" : "value";
      e._valueTracker = Qi(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function xs(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), r = "";
    return e && (r = at(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== i ? (n.setValue(e), !0) : !1;
  }
  function Es(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var $x = /[\n"\\]/g;
  function pn(e) {
    return e.replace(
      $x,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function _u(e, n, i, r, u, f, g, E) {
    e.name = "", g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" ? e.type = g : e.removeAttribute("type"), n != null ? g === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + Et(n)) : e.value !== "" + Et(n) && (e.value = "" + Et(n)) : g !== "submit" && g !== "reset" || e.removeAttribute("value"), n != null ? Ou(e, g, Et(n)) : i != null ? Ou(e, g, Et(i)) : r != null && e.removeAttribute("value"), u == null && f != null && (e.defaultChecked = !!f), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + Et(E) : e.removeAttribute("name");
  }
  function Xh(e, n, i, r, u, f, g, E) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), n != null || i != null) {
      if (!(f !== "submit" && f !== "reset" || n != null)) {
        Ii(e);
        return;
      }
      i = i != null ? "" + Et(i) : "", n = n != null ? "" + Et(n) : i, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    r = r ?? u, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = E ? e.checked : !!r, e.defaultChecked = !!r, g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (e.name = g), Ii(e);
  }
  function Ou(e, n, i) {
    n === "number" && Es(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function Zi(e, n, i, r) {
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
  function $h(e, n, i) {
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
        if (I(r)) {
          if (1 < r.length) throw Error(s(93));
          r = r[0];
        }
        i = r;
      }
      i == null && (i = ""), n = i;
    }
    i = Et(n), e.defaultValue = i, r = e.textContent, r === i && r !== "" && r !== null && (e.value = r), Ii(e);
  }
  function Ji(e, n) {
    if (n) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var Kx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Qh(e, n, i) {
    var r = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? r ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : r ? e.setProperty(n, i) : typeof i != "number" || i === 0 || Kx.has(n) ? n === "float" ? e.cssFloat = i : e[n] = ("" + i).trim() : e[n] = i + "px";
  }
  function Ih(e, n, i) {
    if (n != null && typeof n != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var r in i)
        !i.hasOwnProperty(r) || n != null && n.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var u in n)
        r = n[u], n.hasOwnProperty(u) && i[u] !== r && Qh(e, u, r);
    } else
      for (var f in n)
        n.hasOwnProperty(f) && Qh(e, f, n[f]);
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
  var Qx = /* @__PURE__ */ new Map([
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
  ]), Ix = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ts(e) {
    return Ix.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function la() {
  }
  var Uu = null;
  function Vu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Wi = null, el = null;
  function Zh(e) {
    var n = ct(e);
    if (n && (e = n.stateNode)) {
      var i = e[de] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (_u(
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
                _u(
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
              r = i[n], r.form === e.form && xs(r);
          }
          break e;
        case "textarea":
          $h(e, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && Zi(e, !!i.multiple, n, !1);
      }
    }
  }
  var Bu = !1;
  function Jh(e, n, i) {
    if (Bu) return e(n, i);
    Bu = !0;
    try {
      var r = e(n);
      return r;
    } finally {
      if (Bu = !1, (Wi !== null || el !== null) && (co(), Wi && (n = Wi, e = el, el = Wi = null, Zh(n), e)))
        for (n = 0; n < e.length; n++) Zh(e[n]);
    }
  }
  function Kl(e, n) {
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
  var ra = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Hu = !1;
  if (ra)
    try {
      var Ql = {};
      Object.defineProperty(Ql, "passive", {
        get: function() {
          Hu = !0;
        }
      }), window.addEventListener("test", Ql, Ql), window.removeEventListener("test", Ql, Ql);
    } catch {
      Hu = !1;
    }
  var za = null, qu = null, ws = null;
  function Wh() {
    if (ws) return ws;
    var e, n = qu, i = n.length, r, u = "value" in za ? za.value : za.textContent, f = u.length;
    for (e = 0; e < i && n[e] === u[e]; e++) ;
    var g = i - e;
    for (r = 1; r <= g && n[i - r] === u[f - r]; r++) ;
    return ws = u.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Rs(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Cs() {
    return !0;
  }
  function em() {
    return !1;
  }
  function Qt(e) {
    function n(i, r, u, f, g) {
      this._reactName = i, this._targetInst = u, this.type = r, this.nativeEvent = f, this.target = g, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (i = e[E], this[E] = i ? i(f) : f[E]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Cs : em, this.isPropagationStopped = em, this;
    }
    return b(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Cs);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Cs);
      },
      persist: function() {
      },
      isPersistent: Cs
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
  }, Ms = Qt(gi), Il = b({}, gi, { view: 0, detail: 0 }), Zx = Qt(Il), ku, Pu, Zl, As = b({}, Il, {
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
      return "movementX" in e ? e.movementX : (e !== Zl && (Zl && e.type === "mousemove" ? (ku = e.screenX - Zl.screenX, Pu = e.screenY - Zl.screenY) : Pu = ku = 0, Zl = e), ku);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Pu;
    }
  }), tm = Qt(As), Jx = b({}, As, { dataTransfer: 0 }), Wx = Qt(Jx), e1 = b({}, Il, { relatedTarget: 0 }), Yu = Qt(e1), t1 = b({}, gi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), n1 = Qt(t1), a1 = b({}, gi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), i1 = Qt(a1), l1 = b({}, gi, { data: 0 }), nm = Qt(l1), r1 = {
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
  }, s1 = {
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
  }, o1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function u1(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = o1[e]) ? !!n[e] : !1;
  }
  function Gu() {
    return u1;
  }
  var c1 = b({}, Il, {
    key: function(e) {
      if (e.key) {
        var n = r1[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Rs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? s1[e.keyCode] || "Unidentified" : "";
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
  }), f1 = Qt(c1), d1 = b({}, As, {
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
  }), am = Qt(d1), h1 = b({}, Il, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Gu
  }), m1 = Qt(h1), p1 = b({}, gi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), y1 = Qt(p1), g1 = b({}, As, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), v1 = Qt(g1), b1 = b({}, gi, {
    newState: 0,
    oldState: 0
  }), S1 = Qt(b1), x1 = [9, 13, 27, 32], Fu = ra && "CompositionEvent" in window, Jl = null;
  ra && "documentMode" in document && (Jl = document.documentMode);
  var E1 = ra && "TextEvent" in window && !Jl, im = ra && (!Fu || Jl && 8 < Jl && 11 >= Jl), lm = " ", rm = !1;
  function sm(e, n) {
    switch (e) {
      case "keyup":
        return x1.indexOf(n.keyCode) !== -1;
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
  var tl = !1;
  function T1(e, n) {
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
  function w1(e, n) {
    if (tl)
      return e === "compositionend" || !Fu && sm(e, n) ? (e = Wh(), ws = qu = za = null, tl = !1, e) : null;
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
  var R1 = {
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
    return n === "input" ? !!R1[e.type] : n === "textarea";
  }
  function cm(e, n, i, r) {
    Wi ? el ? el.push(r) : el = [r] : Wi = r, n = vo(n, "onChange"), 0 < n.length && (i = new Ms(
      "onChange",
      "change",
      null,
      i,
      r
    ), e.push({ event: i, listeners: n }));
  }
  var Wl = null, er = null;
  function C1(e) {
    Xy(e, 0);
  }
  function js(e) {
    var n = Le(e);
    if (xs(n)) return e;
  }
  function fm(e, n) {
    if (e === "change") return n;
  }
  var dm = !1;
  if (ra) {
    var Xu;
    if (ra) {
      var $u = "oninput" in document;
      if (!$u) {
        var hm = document.createElement("div");
        hm.setAttribute("oninput", "return;"), $u = typeof hm.oninput == "function";
      }
      Xu = $u;
    } else Xu = !1;
    dm = Xu && (!document.documentMode || 9 < document.documentMode);
  }
  function mm() {
    Wl && (Wl.detachEvent("onpropertychange", pm), er = Wl = null);
  }
  function pm(e) {
    if (e.propertyName === "value" && js(er)) {
      var n = [];
      cm(
        n,
        er,
        e,
        Vu(e)
      ), Jh(C1, n);
    }
  }
  function M1(e, n, i) {
    e === "focusin" ? (mm(), Wl = n, er = i, Wl.attachEvent("onpropertychange", pm)) : e === "focusout" && mm();
  }
  function A1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return js(er);
  }
  function j1(e, n) {
    if (e === "click") return js(n);
  }
  function D1(e, n) {
    if (e === "input" || e === "change")
      return js(n);
  }
  function N1(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var ln = typeof Object.is == "function" ? Object.is : N1;
  function tr(e, n) {
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
    for (var n = Es(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = n.contentWindow;
      else break;
      n = Es(e.document);
    }
    return n;
  }
  function Ku(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var z1 = ra && "documentMode" in document && 11 >= document.documentMode, nl = null, Qu = null, nr = null, Iu = !1;
  function Sm(e, n, i) {
    var r = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Iu || nl == null || nl !== Es(r) || (r = nl, "selectionStart" in r && Ku(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), nr && tr(nr, r) || (nr = r, r = vo(Qu, "onSelect"), 0 < r.length && (n = new Ms(
      "onSelect",
      "select",
      null,
      n,
      i
    ), e.push({ event: n, listeners: r }), n.target = nl)));
  }
  function vi(e, n) {
    var i = {};
    return i[e.toLowerCase()] = n.toLowerCase(), i["Webkit" + e] = "webkit" + n, i["Moz" + e] = "moz" + n, i;
  }
  var al = {
    animationend: vi("Animation", "AnimationEnd"),
    animationiteration: vi("Animation", "AnimationIteration"),
    animationstart: vi("Animation", "AnimationStart"),
    transitionrun: vi("Transition", "TransitionRun"),
    transitionstart: vi("Transition", "TransitionStart"),
    transitioncancel: vi("Transition", "TransitionCancel"),
    transitionend: vi("Transition", "TransitionEnd")
  }, Zu = {}, xm = {};
  ra && (xm = document.createElement("div").style, "AnimationEvent" in window || (delete al.animationend.animation, delete al.animationiteration.animation, delete al.animationstart.animation), "TransitionEvent" in window || delete al.transitionend.transition);
  function bi(e) {
    if (Zu[e]) return Zu[e];
    if (!al[e]) return e;
    var n = al[e], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in xm)
        return Zu[e] = n[i];
    return e;
  }
  var Em = bi("animationend"), Tm = bi("animationiteration"), wm = bi("animationstart"), _1 = bi("transitionrun"), O1 = bi("transitionstart"), L1 = bi("transitioncancel"), Rm = bi("transitionend"), Cm = /* @__PURE__ */ new Map(), Ju = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ju.push("scrollEnd");
  function On(e, n) {
    Cm.set(e, n), Nt(n, [e]);
  }
  var Ds = typeof reportError == "function" ? reportError : function(e) {
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
  }, yn = [], il = 0, Wu = 0;
  function Ns() {
    for (var e = il, n = Wu = il = 0; n < e; ) {
      var i = yn[n];
      yn[n++] = null;
      var r = yn[n];
      yn[n++] = null;
      var u = yn[n];
      yn[n++] = null;
      var f = yn[n];
      if (yn[n++] = null, r !== null && u !== null) {
        var g = r.pending;
        g === null ? u.next = u : (u.next = g.next, g.next = u), r.pending = u;
      }
      f !== 0 && Mm(i, u, f);
    }
  }
  function zs(e, n, i, r) {
    yn[il++] = e, yn[il++] = n, yn[il++] = i, yn[il++] = r, Wu |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function ec(e, n, i, r) {
    return zs(e, n, i, r), _s(e);
  }
  function Si(e, n) {
    return zs(e, null, null, n), _s(e);
  }
  function Mm(e, n, i) {
    e.lanes |= i;
    var r = e.alternate;
    r !== null && (r.lanes |= i);
    for (var u = !1, f = e.return; f !== null; )
      f.childLanes |= i, r = f.alternate, r !== null && (r.childLanes |= i), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (u = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, u && n !== null && (u = 31 - qt(i), e = f.hiddenUpdates, r = e[u], r === null ? e[u] = [n] : r.push(n), n.lane = i | 536870912), f) : null;
  }
  function _s(e) {
    if (50 < wr)
      throw wr = 0, cf = null, Error(s(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ll = {};
  function U1(e, n, i, r) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function rn(e, n, i, r) {
    return new U1(e, n, i, r);
  }
  function tc(e) {
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
  function Am(e, n) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, n = i.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Os(e, n, i, r, u, f) {
    var g = 0;
    if (r = e, typeof e == "function") tc(e) && (g = 1);
    else if (typeof e == "string")
      g = kE(
        e,
        i,
        oe.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Q:
          return e = rn(31, i, n, u), e.elementType = Q, e.lanes = f, e;
        case R:
          return xi(i.children, u, f, n);
        case D:
          g = 8, u |= 24;
          break;
        case _:
          return e = rn(12, i, n, u | 2), e.elementType = _, e.lanes = f, e;
        case $:
          return e = rn(13, i, n, u), e.elementType = $, e.lanes = f, e;
        case K:
          return e = rn(19, i, n, u), e.elementType = K, e.lanes = f, e;
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
              case te:
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
    return n = rn(g, i, n, u), n.elementType = e, n.type = r, n.lanes = f, n;
  }
  function xi(e, n, i, r) {
    return e = rn(7, e, r, n), e.lanes = i, e;
  }
  function nc(e, n, i) {
    return e = rn(6, e, null, n), e.lanes = i, e;
  }
  function jm(e) {
    var n = rn(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function ac(e, n, i) {
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
  var rl = [], sl = 0, Ls = null, ar = 0, vn = [], bn = 0, _a = null, Fn = 1, Xn = "";
  function oa(e, n) {
    rl[sl++] = ar, rl[sl++] = Ls, Ls = e, ar = n;
  }
  function Nm(e, n, i) {
    vn[bn++] = Fn, vn[bn++] = Xn, vn[bn++] = _a, _a = e;
    var r = Fn;
    e = Xn;
    var u = 32 - qt(r) - 1;
    r &= ~(1 << u), i += 1;
    var f = 32 - qt(n) + u;
    if (30 < f) {
      var g = u - u % 5;
      f = (r & (1 << g) - 1).toString(32), r >>= g, u -= g, Fn = 1 << 32 - qt(n) + u | i << u | r, Xn = f + e;
    } else
      Fn = 1 << f | i << u | r, Xn = e;
  }
  function ic(e) {
    e.return !== null && (oa(e, 1), Nm(e, 1, 0));
  }
  function lc(e) {
    for (; e === Ls; )
      Ls = rl[--sl], rl[sl] = null, ar = rl[--sl], rl[sl] = null;
    for (; e === _a; )
      _a = vn[--bn], vn[bn] = null, Xn = vn[--bn], vn[bn] = null, Fn = vn[--bn], vn[bn] = null;
  }
  function zm(e, n) {
    vn[bn++] = Fn, vn[bn++] = Xn, vn[bn++] = _a, Fn = n.id, Xn = n.overflow, _a = e;
  }
  var _t = null, it = null, qe = !1, Oa = null, Sn = !1, rc = Error(s(519));
  function La(e) {
    var n = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ir(gn(n, e)), rc;
  }
  function _m(e) {
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
        for (i = 0; i < Cr.length; i++)
          Ve(Cr[i], n);
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
    i = r.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || r.suppressHydrationWarning === !0 || Iy(n.textContent, i) ? (r.popover != null && (Ve("beforetoggle", n), Ve("toggle", n)), r.onScroll != null && Ve("scroll", n), r.onScrollEnd != null && Ve("scrollend", n), r.onClick != null && (n.onclick = la), n = !0) : n = !1, n || La(e, !0);
  }
  function Om(e) {
    for (_t = e.return; _t; )
      switch (_t.tag) {
        case 5:
        case 31:
        case 13:
          Sn = !1;
          return;
        case 27:
        case 3:
          Sn = !0;
          return;
        default:
          _t = _t.return;
      }
  }
  function ol(e) {
    if (e !== _t) return !1;
    if (!qe) return Om(e), qe = !0, !1;
    var n = e.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || Rf(e.type, e.memoizedProps)), i = !i), i && it && La(e), Om(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      it = lg(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      it = lg(e);
    } else
      n === 27 ? (n = it, Qa(e.type) ? (e = Df, Df = null, it = e) : it = n) : it = _t ? En(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ei() {
    it = _t = null, qe = !1;
  }
  function sc() {
    var e = Oa;
    return e !== null && (Wt === null ? Wt = e : Wt.push.apply(
      Wt,
      e
    ), Oa = null), e;
  }
  function ir(e) {
    Oa === null ? Oa = [e] : Oa.push(e);
  }
  var oc = j(null), Ti = null, ua = null;
  function Ua(e, n, i) {
    le(oc, n._currentValue), n._currentValue = i;
  }
  function ca(e) {
    e._currentValue = oc.current, F(oc);
  }
  function uc(e, n, i) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, r !== null && (r.childLanes |= n)) : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n), e === i) break;
      e = e.return;
    }
  }
  function cc(e, n, i, r) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var f = u.dependencies;
      if (f !== null) {
        var g = u.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var E = f;
          f = u;
          for (var C = 0; C < n.length; C++)
            if (E.context === n[C]) {
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
  function ul(e, n, i, r) {
    e = null;
    for (var u = n, f = !1; u !== null; ) {
      if (!f) {
        if ((u.flags & 524288) !== 0) f = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var g = u.alternate;
        if (g === null) throw Error(s(387));
        if (g = g.memoizedProps, g !== null) {
          var E = u.type;
          ln(u.pendingProps.value, g.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (u === De.current) {
        if (g = u.alternate, g === null) throw Error(s(387));
        g.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Nr) : e = [Nr]);
      }
      u = u.return;
    }
    e !== null && cc(
      n,
      e,
      i,
      r
    ), n.flags |= 262144;
  }
  function Us(e) {
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
    return Lm(Ti, e);
  }
  function Vs(e, n) {
    return Ti === null && wi(e), Lm(e, n);
  }
  function Lm(e, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, ua === null) {
      if (e === null) throw Error(s(308));
      ua = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else ua = ua.next = n;
    return i;
  }
  var V1 = typeof AbortController < "u" ? AbortController : function() {
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
  }, B1 = t.unstable_scheduleCallback, H1 = t.unstable_NormalPriority, Tt = {
    $$typeof: L,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function fc() {
    return {
      controller: new V1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function lr(e) {
    e.refCount--, e.refCount === 0 && B1(H1, function() {
      e.controller.abort();
    });
  }
  var rr = null, dc = 0, cl = 0, fl = null;
  function q1(e, n) {
    if (rr === null) {
      var i = rr = [];
      dc = 0, cl = yf(), fl = {
        status: "pending",
        value: void 0,
        then: function(r) {
          i.push(r);
        }
      };
    }
    return dc++, n.then(Um, Um), n;
  }
  function Um() {
    if (--dc === 0 && rr !== null) {
      fl !== null && (fl.status = "fulfilled");
      var e = rr;
      rr = null, cl = 0, fl = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function k1(e, n) {
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
  var Vm = N.S;
  N.S = function(e, n) {
    Sy = Gt(), typeof n == "object" && n !== null && typeof n.then == "function" && q1(e, n), Vm !== null && Vm(e, n);
  };
  var Ri = j(null);
  function hc() {
    var e = Ri.current;
    return e !== null ? e : et.pooledCache;
  }
  function Bs(e, n) {
    n === null ? le(Ri, Ri.current) : le(Ri, n.pool);
  }
  function Bm() {
    var e = hc();
    return e === null ? null : { parent: Tt._currentValue, pool: e };
  }
  var dl = Error(s(460)), mc = Error(s(474)), Hs = Error(s(542)), qs = { then: function() {
  } };
  function Hm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function qm(e, n, i) {
    switch (i = e[i], i === void 0 ? e.push(n) : i !== n && (n.then(la, la), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, Pm(e), e;
      default:
        if (typeof n.status == "string") n.then(la, la);
        else {
          if (e = et, e !== null && 100 < e.shellSuspendCounter)
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
        throw Mi = n, dl;
    }
  }
  function Ci(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (Mi = i, dl) : i;
    }
  }
  var Mi = null;
  function km() {
    if (Mi === null) throw Error(s(459));
    var e = Mi;
    return Mi = null, e;
  }
  function Pm(e) {
    if (e === dl || e === Hs)
      throw Error(s(483));
  }
  var hl = null, sr = 0;
  function ks(e) {
    var n = sr;
    return sr += 1, hl === null && (hl = []), qm(hl, e, n);
  }
  function or(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Ps(e, n) {
    throw n.$$typeof === S ? Error(s(525)) : (e = Object.prototype.toString.call(n), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function Ym(e) {
    function n(U, z) {
      if (e) {
        var H = U.deletions;
        H === null ? (U.deletions = [z], U.flags |= 16) : H.push(z);
      }
    }
    function i(U, z) {
      if (!e) return null;
      for (; z !== null; )
        n(U, z), z = z.sibling;
      return null;
    }
    function r(U) {
      for (var z = /* @__PURE__ */ new Map(); U !== null; )
        U.key !== null ? z.set(U.key, U) : z.set(U.index, U), U = U.sibling;
      return z;
    }
    function u(U, z) {
      return U = sa(U, z), U.index = 0, U.sibling = null, U;
    }
    function f(U, z, H) {
      return U.index = H, e ? (H = U.alternate, H !== null ? (H = H.index, H < z ? (U.flags |= 67108866, z) : H) : (U.flags |= 67108866, z)) : (U.flags |= 1048576, z);
    }
    function g(U) {
      return e && U.alternate === null && (U.flags |= 67108866), U;
    }
    function E(U, z, H, Z) {
      return z === null || z.tag !== 6 ? (z = nc(H, U.mode, Z), z.return = U, z) : (z = u(z, H), z.return = U, z);
    }
    function C(U, z, H, Z) {
      var Ee = H.type;
      return Ee === R ? X(
        U,
        z,
        H.props.children,
        Z,
        H.key
      ) : z !== null && (z.elementType === Ee || typeof Ee == "object" && Ee !== null && Ee.$$typeof === A && Ci(Ee) === z.type) ? (z = u(z, H.props), or(z, H), z.return = U, z) : (z = Os(
        H.type,
        H.key,
        H.props,
        null,
        U.mode,
        Z
      ), or(z, H), z.return = U, z);
    }
    function q(U, z, H, Z) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== H.containerInfo || z.stateNode.implementation !== H.implementation ? (z = ac(H, U.mode, Z), z.return = U, z) : (z = u(z, H.children || []), z.return = U, z);
    }
    function X(U, z, H, Z, Ee) {
      return z === null || z.tag !== 7 ? (z = xi(
        H,
        U.mode,
        Z,
        Ee
      ), z.return = U, z) : (z = u(z, H), z.return = U, z);
    }
    function ee(U, z, H) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = nc(
          "" + z,
          U.mode,
          H
        ), z.return = U, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case T:
            return H = Os(
              z.type,
              z.key,
              z.props,
              null,
              U.mode,
              H
            ), or(H, z), H.return = U, H;
          case w:
            return z = ac(
              z,
              U.mode,
              H
            ), z.return = U, z;
          case A:
            return z = Ci(z), ee(U, z, H);
        }
        if (I(z) || W(z))
          return z = xi(
            z,
            U.mode,
            H,
            null
          ), z.return = U, z;
        if (typeof z.then == "function")
          return ee(U, ks(z), H);
        if (z.$$typeof === L)
          return ee(
            U,
            Vs(U, z),
            H
          );
        Ps(U, z);
      }
      return null;
    }
    function P(U, z, H, Z) {
      var Ee = z !== null ? z.key : null;
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return Ee !== null ? null : E(U, z, "" + H, Z);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case T:
            return H.key === Ee ? C(U, z, H, Z) : null;
          case w:
            return H.key === Ee ? q(U, z, H, Z) : null;
          case A:
            return H = Ci(H), P(U, z, H, Z);
        }
        if (I(H) || W(H))
          return Ee !== null ? null : X(U, z, H, Z, null);
        if (typeof H.then == "function")
          return P(
            U,
            z,
            ks(H),
            Z
          );
        if (H.$$typeof === L)
          return P(
            U,
            z,
            Vs(U, H),
            Z
          );
        Ps(U, H);
      }
      return null;
    }
    function Y(U, z, H, Z, Ee) {
      if (typeof Z == "string" && Z !== "" || typeof Z == "number" || typeof Z == "bigint")
        return U = U.get(H) || null, E(z, U, "" + Z, Ee);
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case T:
            return U = U.get(
              Z.key === null ? H : Z.key
            ) || null, C(z, U, Z, Ee);
          case w:
            return U = U.get(
              Z.key === null ? H : Z.key
            ) || null, q(z, U, Z, Ee);
          case A:
            return Z = Ci(Z), Y(
              U,
              z,
              H,
              Z,
              Ee
            );
        }
        if (I(Z) || W(Z))
          return U = U.get(H) || null, X(z, U, Z, Ee, null);
        if (typeof Z.then == "function")
          return Y(
            U,
            z,
            H,
            ks(Z),
            Ee
          );
        if (Z.$$typeof === L)
          return Y(
            U,
            z,
            H,
            Vs(z, Z),
            Ee
          );
        Ps(z, Z);
      }
      return null;
    }
    function me(U, z, H, Z) {
      for (var Ee = null, Pe = null, ve = z, je = z = 0, He = null; ve !== null && je < H.length; je++) {
        ve.index > je ? (He = ve, ve = null) : He = ve.sibling;
        var Ye = P(
          U,
          ve,
          H[je],
          Z
        );
        if (Ye === null) {
          ve === null && (ve = He);
          break;
        }
        e && ve && Ye.alternate === null && n(U, ve), z = f(Ye, z, je), Pe === null ? Ee = Ye : Pe.sibling = Ye, Pe = Ye, ve = He;
      }
      if (je === H.length)
        return i(U, ve), qe && oa(U, je), Ee;
      if (ve === null) {
        for (; je < H.length; je++)
          ve = ee(U, H[je], Z), ve !== null && (z = f(
            ve,
            z,
            je
          ), Pe === null ? Ee = ve : Pe.sibling = ve, Pe = ve);
        return qe && oa(U, je), Ee;
      }
      for (ve = r(ve); je < H.length; je++)
        He = Y(
          ve,
          U,
          je,
          H[je],
          Z
        ), He !== null && (e && He.alternate !== null && ve.delete(
          He.key === null ? je : He.key
        ), z = f(
          He,
          z,
          je
        ), Pe === null ? Ee = He : Pe.sibling = He, Pe = He);
      return e && ve.forEach(function(ei) {
        return n(U, ei);
      }), qe && oa(U, je), Ee;
    }
    function Ce(U, z, H, Z) {
      if (H == null) throw Error(s(151));
      for (var Ee = null, Pe = null, ve = z, je = z = 0, He = null, Ye = H.next(); ve !== null && !Ye.done; je++, Ye = H.next()) {
        ve.index > je ? (He = ve, ve = null) : He = ve.sibling;
        var ei = P(U, ve, Ye.value, Z);
        if (ei === null) {
          ve === null && (ve = He);
          break;
        }
        e && ve && ei.alternate === null && n(U, ve), z = f(ei, z, je), Pe === null ? Ee = ei : Pe.sibling = ei, Pe = ei, ve = He;
      }
      if (Ye.done)
        return i(U, ve), qe && oa(U, je), Ee;
      if (ve === null) {
        for (; !Ye.done; je++, Ye = H.next())
          Ye = ee(U, Ye.value, Z), Ye !== null && (z = f(Ye, z, je), Pe === null ? Ee = Ye : Pe.sibling = Ye, Pe = Ye);
        return qe && oa(U, je), Ee;
      }
      for (ve = r(ve); !Ye.done; je++, Ye = H.next())
        Ye = Y(ve, U, je, Ye.value, Z), Ye !== null && (e && Ye.alternate !== null && ve.delete(Ye.key === null ? je : Ye.key), z = f(Ye, z, je), Pe === null ? Ee = Ye : Pe.sibling = Ye, Pe = Ye);
      return e && ve.forEach(function(JE) {
        return n(U, JE);
      }), qe && oa(U, je), Ee;
    }
    function Je(U, z, H, Z) {
      if (typeof H == "object" && H !== null && H.type === R && H.key === null && (H = H.props.children), typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case T:
            e: {
              for (var Ee = H.key; z !== null; ) {
                if (z.key === Ee) {
                  if (Ee = H.type, Ee === R) {
                    if (z.tag === 7) {
                      i(
                        U,
                        z.sibling
                      ), Z = u(
                        z,
                        H.props.children
                      ), Z.return = U, U = Z;
                      break e;
                    }
                  } else if (z.elementType === Ee || typeof Ee == "object" && Ee !== null && Ee.$$typeof === A && Ci(Ee) === z.type) {
                    i(
                      U,
                      z.sibling
                    ), Z = u(z, H.props), or(Z, H), Z.return = U, U = Z;
                    break e;
                  }
                  i(U, z);
                  break;
                } else n(U, z);
                z = z.sibling;
              }
              H.type === R ? (Z = xi(
                H.props.children,
                U.mode,
                Z,
                H.key
              ), Z.return = U, U = Z) : (Z = Os(
                H.type,
                H.key,
                H.props,
                null,
                U.mode,
                Z
              ), or(Z, H), Z.return = U, U = Z);
            }
            return g(U);
          case w:
            e: {
              for (Ee = H.key; z !== null; ) {
                if (z.key === Ee)
                  if (z.tag === 4 && z.stateNode.containerInfo === H.containerInfo && z.stateNode.implementation === H.implementation) {
                    i(
                      U,
                      z.sibling
                    ), Z = u(z, H.children || []), Z.return = U, U = Z;
                    break e;
                  } else {
                    i(U, z);
                    break;
                  }
                else n(U, z);
                z = z.sibling;
              }
              Z = ac(H, U.mode, Z), Z.return = U, U = Z;
            }
            return g(U);
          case A:
            return H = Ci(H), Je(
              U,
              z,
              H,
              Z
            );
        }
        if (I(H))
          return me(
            U,
            z,
            H,
            Z
          );
        if (W(H)) {
          if (Ee = W(H), typeof Ee != "function") throw Error(s(150));
          return H = Ee.call(H), Ce(
            U,
            z,
            H,
            Z
          );
        }
        if (typeof H.then == "function")
          return Je(
            U,
            z,
            ks(H),
            Z
          );
        if (H.$$typeof === L)
          return Je(
            U,
            z,
            Vs(U, H),
            Z
          );
        Ps(U, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, z !== null && z.tag === 6 ? (i(U, z.sibling), Z = u(z, H), Z.return = U, U = Z) : (i(U, z), Z = nc(H, U.mode, Z), Z.return = U, U = Z), g(U)) : i(U, z);
    }
    return function(U, z, H, Z) {
      try {
        sr = 0;
        var Ee = Je(
          U,
          z,
          H,
          Z
        );
        return hl = null, Ee;
      } catch (ve) {
        if (ve === dl || ve === Hs) throw ve;
        var Pe = rn(29, ve, null, U.mode);
        return Pe.lanes = Z, Pe.return = U, Pe;
      } finally {
      }
    };
  }
  var Ai = Ym(!0), Gm = Ym(!1), Va = !1;
  function pc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function yc(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Ba(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ha(e, n, i) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Ge & 2) !== 0) {
      var u = r.pending;
      return u === null ? n.next = n : (n.next = u.next, u.next = n), r.pending = n, n = _s(e), Mm(e, null, i), n;
    }
    return zs(e, r, n, i), _s(e);
  }
  function ur(e, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var r = n.lanes;
      r &= e.pendingLanes, i |= r, n.lanes = i, Ss(e, i);
    }
  }
  function gc(e, n) {
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
        f === null ? u = f = n : f = f.next = n;
      } else u = f = n;
      i = {
        baseState: r.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: f,
        shared: r.shared,
        callbacks: r.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = n : e.next = n, i.lastBaseUpdate = n;
  }
  var vc = !1;
  function cr() {
    if (vc) {
      var e = fl;
      if (e !== null) throw e;
    }
  }
  function fr(e, n, i, r) {
    vc = !1;
    var u = e.updateQueue;
    Va = !1;
    var f = u.firstBaseUpdate, g = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var C = E, q = C.next;
      C.next = null, g === null ? f = q : g.next = q, g = C;
      var X = e.alternate;
      X !== null && (X = X.updateQueue, E = X.lastBaseUpdate, E !== g && (E === null ? X.firstBaseUpdate = q : E.next = q, X.lastBaseUpdate = C));
    }
    if (f !== null) {
      var ee = u.baseState;
      g = 0, X = q = C = null, E = f;
      do {
        var P = E.lane & -536870913, Y = P !== E.lane;
        if (Y ? (Be & P) === P : (r & P) === P) {
          P !== 0 && P === cl && (vc = !0), X !== null && (X = X.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var me = e, Ce = E;
            P = n;
            var Je = i;
            switch (Ce.tag) {
              case 1:
                if (me = Ce.payload, typeof me == "function") {
                  ee = me.call(Je, ee, P);
                  break e;
                }
                ee = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = Ce.payload, P = typeof me == "function" ? me.call(Je, ee, P) : me, P == null) break e;
                ee = b({}, ee, P);
                break e;
              case 2:
                Va = !0;
            }
          }
          P = E.callback, P !== null && (e.flags |= 64, Y && (e.flags |= 8192), Y = u.callbacks, Y === null ? u.callbacks = [P] : Y.push(P));
        } else
          Y = {
            lane: P,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, X === null ? (q = X = Y, C = ee) : X = X.next = Y, g |= P;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          Y = E, E = Y.next, Y.next = null, u.lastBaseUpdate = Y, u.shared.pending = null;
        }
      } while (!0);
      X === null && (C = ee), u.baseState = C, u.firstBaseUpdate = q, u.lastBaseUpdate = X, f === null && (u.shared.lanes = 0), Ga |= g, e.lanes = g, e.memoizedState = ee;
    }
  }
  function Fm(e, n) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(n);
  }
  function Xm(e, n) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Fm(i[e], n);
  }
  var ml = j(null), Ys = j(0);
  function $m(e, n) {
    e = ba, le(Ys, e), le(ml, n), ba = e | n.baseLanes;
  }
  function bc() {
    le(Ys, ba), le(ml, ml.current);
  }
  function Sc() {
    ba = Ys.current, F(ml), F(Ys);
  }
  var sn = j(null), xn = null;
  function qa(e) {
    var n = e.alternate;
    le(vt, vt.current & 1), le(sn, e), xn === null && (n === null || ml.current !== null || n.memoizedState !== null) && (xn = e);
  }
  function xc(e) {
    le(vt, vt.current), le(sn, e), xn === null && (xn = e);
  }
  function Km(e) {
    e.tag === 22 ? (le(vt, vt.current), le(sn, e), xn === null && (xn = e)) : ka();
  }
  function ka() {
    le(vt, vt.current), le(sn, sn.current);
  }
  function on(e) {
    F(sn), xn === e && (xn = null), F(vt);
  }
  var vt = j(0);
  function Gs(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Af(i) || jf(i)))
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
  var fa = 0, Ae = null, Ie = null, wt = null, Fs = !1, pl = !1, ji = !1, Xs = 0, dr = 0, yl = null, P1 = 0;
  function mt() {
    throw Error(s(321));
  }
  function Ec(e, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < e.length; i++)
      if (!ln(e[i], n[i])) return !1;
    return !0;
  }
  function Tc(e, n, i, r, u, f) {
    return fa = f, Ae = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, N.H = e === null || e.memoizedState === null ? Np : Bc, ji = !1, f = i(r, u), ji = !1, pl && (f = Im(
      n,
      i,
      r,
      u
    )), Qm(e), f;
  }
  function Qm(e) {
    N.H = pr;
    var n = Ie !== null && Ie.next !== null;
    if (fa = 0, wt = Ie = Ae = null, Fs = !1, dr = 0, yl = null, n) throw Error(s(300));
    e === null || Rt || (e = e.dependencies, e !== null && Us(e) && (Rt = !0));
  }
  function Im(e, n, i, r) {
    Ae = e;
    var u = 0;
    do {
      if (pl && (yl = null), dr = 0, pl = !1, 25 <= u) throw Error(s(301));
      if (u += 1, wt = Ie = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      N.H = zp, f = n(i, r);
    } while (pl);
    return f;
  }
  function Y1() {
    var e = N.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? hr(n) : n, e = e.useState()[0], (Ie !== null ? Ie.memoizedState : null) !== e && (Ae.flags |= 1024), n;
  }
  function wc() {
    var e = Xs !== 0;
    return Xs = 0, e;
  }
  function Rc(e, n, i) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~i;
  }
  function Cc(e) {
    if (Fs) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      Fs = !1;
    }
    fa = 0, wt = Ie = Ae = null, pl = !1, dr = Xs = 0, yl = null;
  }
  function Xt() {
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
    if (Ie === null) {
      var e = Ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ie.next;
    var n = wt === null ? Ae.memoizedState : wt.next;
    if (n !== null)
      wt = n, Ie = e;
    else {
      if (e === null)
        throw Ae.alternate === null ? Error(s(467)) : Error(s(310));
      Ie = e, e = {
        memoizedState: Ie.memoizedState,
        baseState: Ie.baseState,
        baseQueue: Ie.baseQueue,
        queue: Ie.queue,
        next: null
      }, wt === null ? Ae.memoizedState = wt = e : wt = wt.next = e;
    }
    return wt;
  }
  function $s() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function hr(e) {
    var n = dr;
    return dr += 1, yl === null && (yl = []), e = qm(yl, e, n), n = Ae, (wt === null ? n.memoizedState : wt.next) === null && (n = n.alternate, N.H = n === null || n.memoizedState === null ? Np : Bc), e;
  }
  function Ks(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return hr(e);
      if (e.$$typeof === L) return Ot(e);
    }
    throw Error(s(438, String(e)));
  }
  function Mc(e) {
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
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = $s(), Ae.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(e), r = 0; r < e; r++)
        i[r] = ne;
    return n.index++, i;
  }
  function da(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function Qs(e) {
    var n = bt();
    return Ac(n, Ie, e);
  }
  function Ac(e, n, i) {
    var r = e.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = i;
    var u = e.baseQueue, f = r.pending;
    if (f !== null) {
      if (u !== null) {
        var g = u.next;
        u.next = f.next, f.next = g;
      }
      n.baseQueue = u = f, r.pending = null;
    }
    if (f = e.baseState, u === null) e.memoizedState = f;
    else {
      n = u.next;
      var E = g = null, C = null, q = n, X = !1;
      do {
        var ee = q.lane & -536870913;
        if (ee !== q.lane ? (Be & ee) === ee : (fa & ee) === ee) {
          var P = q.revertLane;
          if (P === 0)
            C !== null && (C = C.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }), ee === cl && (X = !0);
          else if ((fa & P) === P) {
            q = q.next, P === cl && (X = !0);
            continue;
          } else
            ee = {
              lane: 0,
              revertLane: q.revertLane,
              gesture: null,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }, C === null ? (E = C = ee, g = f) : C = C.next = ee, Ae.lanes |= P, Ga |= P;
          ee = q.action, ji && i(f, ee), f = q.hasEagerState ? q.eagerState : i(f, ee);
        } else
          P = {
            lane: ee,
            revertLane: q.revertLane,
            gesture: q.gesture,
            action: q.action,
            hasEagerState: q.hasEagerState,
            eagerState: q.eagerState,
            next: null
          }, C === null ? (E = C = P, g = f) : C = C.next = P, Ae.lanes |= ee, Ga |= ee;
        q = q.next;
      } while (q !== null && q !== n);
      if (C === null ? g = f : C.next = E, !ln(f, e.memoizedState) && (Rt = !0, X && (i = fl, i !== null)))
        throw i;
      e.memoizedState = f, e.baseState = g, e.baseQueue = C, r.lastRenderedState = f;
    }
    return u === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function jc(e) {
    var n = bt(), i = n.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var r = i.dispatch, u = i.pending, f = n.memoizedState;
    if (u !== null) {
      i.pending = null;
      var g = u = u.next;
      do
        f = e(f, g.action), g = g.next;
      while (g !== u);
      ln(f, n.memoizedState) || (Rt = !0), n.memoizedState = f, n.baseQueue === null && (n.baseState = f), i.lastRenderedState = f;
    }
    return [f, r];
  }
  function Zm(e, n, i) {
    var r = Ae, u = bt(), f = qe;
    if (f) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = n();
    var g = !ln(
      (Ie || u).memoizedState,
      i
    );
    if (g && (u.memoizedState = i, Rt = !0), u = u.queue, zc(ep.bind(null, r, u, e), [
      e
    ]), u.getSnapshot !== n || g || wt !== null && wt.memoizedState.tag & 1) {
      if (r.flags |= 2048, gl(
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
      ), et === null) throw Error(s(349));
      f || (fa & 127) !== 0 || Jm(r, n, i);
    }
    return i;
  }
  function Jm(e, n, i) {
    e.flags |= 16384, e = { getSnapshot: n, value: i }, n = Ae.updateQueue, n === null ? (n = $s(), Ae.updateQueue = n, n.stores = [e]) : (i = n.stores, i === null ? n.stores = [e] : i.push(e));
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
    n !== null && en(n, e, 2);
  }
  function Dc(e) {
    var n = Xt();
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
  function ap(e, n, i, r) {
    return e.baseState = i, Ac(
      e,
      Ie,
      typeof r == "function" ? r : da
    );
  }
  function G1(e, n, i, r, u) {
    if (Js(e)) throw Error(s(485));
    if (e = n.action, e !== null) {
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
      N.T !== null ? i(!0) : f.isTransition = !1, r(f), i = n.pending, i === null ? (f.next = n.pending = f, ip(n, f)) : (f.next = i.next, n.pending = i.next = f);
    }
  }
  function ip(e, n) {
    var i = n.action, r = n.payload, u = e.state;
    if (n.isTransition) {
      var f = N.T, g = {};
      N.T = g;
      try {
        var E = i(u, r), C = N.S;
        C !== null && C(g, E), lp(e, n, E);
      } catch (q) {
        Nc(e, n, q);
      } finally {
        f !== null && g.types !== null && (f.types = g.types), N.T = f;
      }
    } else
      try {
        f = i(u, r), lp(e, n, f);
      } catch (q) {
        Nc(e, n, q);
      }
  }
  function lp(e, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(r) {
        rp(e, n, r);
      },
      function(r) {
        return Nc(e, n, r);
      }
    ) : rp(e, n, i);
  }
  function rp(e, n, i) {
    n.status = "fulfilled", n.value = i, sp(n), e.state = i, n = e.pending, n !== null && (i = n.next, i === n ? e.pending = null : (i = i.next, n.next = i, ip(e, i)));
  }
  function Nc(e, n, i) {
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
    if (qe) {
      var i = et.formState;
      if (i !== null) {
        e: {
          var r = Ae;
          if (qe) {
            if (it) {
              t: {
                for (var u = it, f = Sn; u.nodeType !== 8; ) {
                  if (!f) {
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
                f = u.data, u = f === "F!" || f === "F" ? u : null;
              }
              if (u) {
                it = En(
                  u.nextSibling
                ), r = u.data === "F!";
                break e;
              }
            }
            La(r);
          }
          r = !1;
        }
        r && (n = i[0]);
      }
    }
    return i = Xt(), i.memoizedState = i.baseState = n, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: op,
      lastRenderedState: n
    }, i.queue = r, i = Ap.bind(
      null,
      Ae,
      r
    ), r.dispatch = i, r = Dc(!1), f = Vc.bind(
      null,
      Ae,
      !1,
      r.queue
    ), r = Xt(), u = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = u, i = G1.bind(
      null,
      Ae,
      u,
      f,
      i
    ), u.dispatch = i, r.memoizedState = e, [n, i, !1];
  }
  function cp(e) {
    var n = bt();
    return fp(n, Ie, e);
  }
  function fp(e, n, i) {
    if (n = Ac(
      e,
      n,
      op
    )[0], e = Qs(da)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var r = hr(n);
      } catch (g) {
        throw g === dl ? Hs : g;
      }
    else r = n;
    n = bt();
    var u = n.queue, f = u.dispatch;
    return i !== n.memoizedState && (Ae.flags |= 2048, gl(
      9,
      { destroy: void 0 },
      F1.bind(null, u, i),
      null
    )), [r, f, e];
  }
  function F1(e, n) {
    e.action = n;
  }
  function dp(e) {
    var n = bt(), i = Ie;
    if (i !== null)
      return fp(n, i, e);
    bt(), n = n.memoizedState, i = bt();
    var r = i.queue.dispatch;
    return i.memoizedState = e, [n, r, !1];
  }
  function gl(e, n, i, r) {
    return e = { tag: e, create: i, deps: r, inst: n, next: null }, n = Ae.updateQueue, n === null && (n = $s(), Ae.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = e.next = e : (r = i.next, i.next = e, e.next = r, n.lastEffect = e), e;
  }
  function hp() {
    return bt().memoizedState;
  }
  function Is(e, n, i, r) {
    var u = Xt();
    Ae.flags |= e, u.memoizedState = gl(
      1 | n,
      { destroy: void 0 },
      i,
      r === void 0 ? null : r
    );
  }
  function Zs(e, n, i, r) {
    var u = bt();
    r = r === void 0 ? null : r;
    var f = u.memoizedState.inst;
    Ie !== null && r !== null && Ec(r, Ie.memoizedState.deps) ? u.memoizedState = gl(n, f, i, r) : (Ae.flags |= e, u.memoizedState = gl(
      1 | n,
      f,
      i,
      r
    ));
  }
  function mp(e, n) {
    Is(8390656, 8, e, n);
  }
  function zc(e, n) {
    Zs(2048, 8, e, n);
  }
  function X1(e) {
    Ae.flags |= 4;
    var n = Ae.updateQueue;
    if (n === null)
      n = $s(), Ae.updateQueue = n, n.events = [e];
    else {
      var i = n.events;
      i === null ? n.events = [e] : i.push(e);
    }
  }
  function pp(e) {
    var n = bt().memoizedState;
    return X1({ ref: n, nextImpl: e }), function() {
      if ((Ge & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function yp(e, n) {
    return Zs(4, 2, e, n);
  }
  function gp(e, n) {
    return Zs(4, 4, e, n);
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
    i = i != null ? i.concat([e]) : null, Zs(4, 4, vp.bind(null, n, e), i);
  }
  function _c() {
  }
  function Sp(e, n) {
    var i = bt();
    n = n === void 0 ? null : n;
    var r = i.memoizedState;
    return n !== null && Ec(n, r[1]) ? r[0] : (i.memoizedState = [e, n], e);
  }
  function xp(e, n) {
    var i = bt();
    n = n === void 0 ? null : n;
    var r = i.memoizedState;
    if (n !== null && Ec(n, r[1]))
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
  function Oc(e, n, i) {
    return i === void 0 || (fa & 1073741824) !== 0 && (Be & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = i, e = Ey(), Ae.lanes |= e, Ga |= e, i);
  }
  function Ep(e, n, i, r) {
    return ln(i, n) ? i : ml.current !== null ? (e = Oc(e, i, r), ln(e, n) || (Rt = !0), e) : (fa & 42) === 0 || (fa & 1073741824) !== 0 && (Be & 261930) === 0 ? (Rt = !0, e.memoizedState = i) : (e = Ey(), Ae.lanes |= e, Ga |= e, n);
  }
  function Tp(e, n, i, r, u) {
    var f = J.p;
    J.p = f !== 0 && 8 > f ? f : 8;
    var g = N.T, E = {};
    N.T = E, Vc(e, !1, n, i);
    try {
      var C = u(), q = N.S;
      if (q !== null && q(E, C), C !== null && typeof C == "object" && typeof C.then == "function") {
        var X = k1(
          C,
          r
        );
        mr(
          e,
          n,
          X,
          fn(e)
        );
      } else
        mr(
          e,
          n,
          r,
          fn(e)
        );
    } catch (ee) {
      mr(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: ee },
        fn()
      );
    } finally {
      J.p = f, g !== null && E.types !== null && (g.types = E.types), N.T = g;
    }
  }
  function $1() {
  }
  function Lc(e, n, i, r) {
    if (e.tag !== 5) throw Error(s(476));
    var u = wp(e).queue;
    Tp(
      e,
      u,
      n,
      ie,
      i === null ? $1 : function() {
        return Rp(e), i(r);
      }
    );
  }
  function wp(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: ie,
      baseState: ie,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: da,
        lastRenderedState: ie
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
  function Rp(e) {
    var n = wp(e);
    n.next === null && (n = e.alternate.memoizedState), mr(
      e,
      n.next.queue,
      {},
      fn()
    );
  }
  function Uc() {
    return Ot(Nr);
  }
  function Cp() {
    return bt().memoizedState;
  }
  function Mp() {
    return bt().memoizedState;
  }
  function K1(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = fn();
          e = Ba(i);
          var r = Ha(n, e, i);
          r !== null && (en(r, n, i), ur(r, n, i)), n = { cache: fc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function Q1(e, n, i) {
    var r = fn();
    i = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Js(e) ? jp(n, i) : (i = ec(e, n, i, r), i !== null && (en(i, e, r), Dp(i, n, r)));
  }
  function Ap(e, n, i) {
    var r = fn();
    mr(e, n, i, r);
  }
  function mr(e, n, i, r) {
    var u = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Js(e)) jp(n, u);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = n.lastRenderedReducer, f !== null))
        try {
          var g = n.lastRenderedState, E = f(g, i);
          if (u.hasEagerState = !0, u.eagerState = E, ln(E, g))
            return zs(e, n, u, 0), et === null && Ns(), !1;
        } catch {
        } finally {
        }
      if (i = ec(e, n, u, r), i !== null)
        return en(i, e, r), Dp(i, n, r), !0;
    }
    return !1;
  }
  function Vc(e, n, i, r) {
    if (r = {
      lane: 2,
      revertLane: yf(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Js(e)) {
      if (n) throw Error(s(479));
    } else
      n = ec(
        e,
        i,
        r,
        2
      ), n !== null && en(n, e, 2);
  }
  function Js(e) {
    var n = e.alternate;
    return e === Ae || n !== null && n === Ae;
  }
  function jp(e, n) {
    pl = Fs = !0;
    var i = e.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), e.pending = n;
  }
  function Dp(e, n, i) {
    if ((i & 4194048) !== 0) {
      var r = n.lanes;
      r &= e.pendingLanes, i |= r, n.lanes = i, Ss(e, i);
    }
  }
  var pr = {
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
  pr.useEffectEvent = mt;
  var Np = {
    readContext: Ot,
    use: Ks,
    useCallback: function(e, n) {
      return Xt().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: Ot,
    useEffect: mp,
    useImperativeHandle: function(e, n, i) {
      i = i != null ? i.concat([e]) : null, Is(
        4194308,
        4,
        vp.bind(null, n, e),
        i
      );
    },
    useLayoutEffect: function(e, n) {
      return Is(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      Is(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var i = Xt();
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
      var r = Xt();
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
      }, r.queue = e, e = e.dispatch = Q1.bind(
        null,
        Ae,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var n = Xt();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Dc(e);
      var n = e.queue, i = Ap.bind(null, Ae, n);
      return n.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: _c,
    useDeferredValue: function(e, n) {
      var i = Xt();
      return Oc(i, e, n);
    },
    useTransition: function() {
      var e = Dc(!1);
      return e = Tp.bind(
        null,
        Ae,
        e.queue,
        !0,
        !1
      ), Xt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, i) {
      var r = Ae, u = Xt();
      if (qe) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = n(), et === null)
          throw Error(s(349));
        (Be & 127) !== 0 || Jm(r, n, i);
      }
      u.memoizedState = i;
      var f = { value: i, getSnapshot: n };
      return u.queue = f, mp(ep.bind(null, r, f, e), [
        e
      ]), r.flags |= 2048, gl(
        9,
        { destroy: void 0 },
        Wm.bind(
          null,
          r,
          f,
          i,
          n
        ),
        null
      ), i;
    },
    useId: function() {
      var e = Xt(), n = et.identifierPrefix;
      if (qe) {
        var i = Xn, r = Fn;
        i = (r & ~(1 << 32 - qt(r) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = Xs++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = P1++, n = "_" + n + "r_" + i.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Uc,
    useFormState: up,
    useActionState: up,
    useOptimistic: function(e) {
      var n = Xt();
      n.memoizedState = n.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = Vc.bind(
        null,
        Ae,
        !0,
        i
      ), i.dispatch = n, [e, n];
    },
    useMemoCache: Mc,
    useCacheRefresh: function() {
      return Xt().memoizedState = K1.bind(
        null,
        Ae
      );
    },
    useEffectEvent: function(e) {
      var n = Xt(), i = { impl: e };
      return n.memoizedState = i, function() {
        if ((Ge & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Bc = {
    readContext: Ot,
    use: Ks,
    useCallback: Sp,
    useContext: Ot,
    useEffect: zc,
    useImperativeHandle: bp,
    useInsertionEffect: yp,
    useLayoutEffect: gp,
    useMemo: xp,
    useReducer: Qs,
    useRef: hp,
    useState: function() {
      return Qs(da);
    },
    useDebugValue: _c,
    useDeferredValue: function(e, n) {
      var i = bt();
      return Ep(
        i,
        Ie.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Qs(da)[0], n = bt().memoizedState;
      return [
        typeof e == "boolean" ? e : hr(e),
        n
      ];
    },
    useSyncExternalStore: Zm,
    useId: Cp,
    useHostTransitionStatus: Uc,
    useFormState: cp,
    useActionState: cp,
    useOptimistic: function(e, n) {
      var i = bt();
      return ap(i, Ie, e, n);
    },
    useMemoCache: Mc,
    useCacheRefresh: Mp
  };
  Bc.useEffectEvent = pp;
  var zp = {
    readContext: Ot,
    use: Ks,
    useCallback: Sp,
    useContext: Ot,
    useEffect: zc,
    useImperativeHandle: bp,
    useInsertionEffect: yp,
    useLayoutEffect: gp,
    useMemo: xp,
    useReducer: jc,
    useRef: hp,
    useState: function() {
      return jc(da);
    },
    useDebugValue: _c,
    useDeferredValue: function(e, n) {
      var i = bt();
      return Ie === null ? Oc(i, e, n) : Ep(
        i,
        Ie.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = jc(da)[0], n = bt().memoizedState;
      return [
        typeof e == "boolean" ? e : hr(e),
        n
      ];
    },
    useSyncExternalStore: Zm,
    useId: Cp,
    useHostTransitionStatus: Uc,
    useFormState: dp,
    useActionState: dp,
    useOptimistic: function(e, n) {
      var i = bt();
      return Ie !== null ? ap(i, Ie, e, n) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Mc,
    useCacheRefresh: Mp
  };
  zp.useEffectEvent = pp;
  function Hc(e, n, i, r) {
    n = e.memoizedState, i = i(r, n), i = i == null ? n : b({}, n, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var qc = {
    enqueueSetState: function(e, n, i) {
      e = e._reactInternals;
      var r = fn(), u = Ba(r);
      u.payload = n, i != null && (u.callback = i), n = Ha(e, u, r), n !== null && (en(n, e, r), ur(n, e, r));
    },
    enqueueReplaceState: function(e, n, i) {
      e = e._reactInternals;
      var r = fn(), u = Ba(r);
      u.tag = 1, u.payload = n, i != null && (u.callback = i), n = Ha(e, u, r), n !== null && (en(n, e, r), ur(n, e, r));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var i = fn(), r = Ba(i);
      r.tag = 2, n != null && (r.callback = n), n = Ha(e, r, i), n !== null && (en(n, e, i), ur(n, e, i));
    }
  };
  function _p(e, n, i, r, u, f, g) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, f, g) : n.prototype && n.prototype.isPureReactComponent ? !tr(i, r) || !tr(u, f) : !0;
  }
  function Op(e, n, i, r) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, r), n.state !== e && qc.enqueueReplaceState(n, n.state, null);
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
  function Lp(e) {
    Ds(e);
  }
  function Up(e) {
    console.error(e);
  }
  function Vp(e) {
    Ds(e);
  }
  function Ws(e, n) {
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
  function kc(e, n, i) {
    return i = Ba(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Ws(e, n);
    }, i;
  }
  function Hp(e) {
    return e = Ba(e), e.tag = 3, e;
  }
  function qp(e, n, i, r) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = r.value;
      e.payload = function() {
        return u(f);
      }, e.callback = function() {
        Bp(n, i, r);
      };
    }
    var g = i.stateNode;
    g !== null && typeof g.componentDidCatch == "function" && (e.callback = function() {
      Bp(n, i, r), typeof u != "function" && (Fa === null ? Fa = /* @__PURE__ */ new Set([this]) : Fa.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function I1(e, n, i, r, u) {
    if (i.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (n = i.alternate, n !== null && ul(
        n,
        i,
        u,
        !0
      ), i = sn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return xn === null ? fo() : i.alternate === null && pt === 0 && (pt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, r === qs ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([r]) : n.add(r), hf(e, r, u)), !1;
          case 22:
            return i.flags |= 65536, r === qs ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([r]) : i.add(r)), hf(e, r, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return hf(e, r, u), fo(), !1;
    }
    if (qe)
      return n = sn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, r !== rc && (e = Error(s(422), { cause: r }), ir(gn(e, i)))) : (r !== rc && (n = Error(s(423), {
        cause: r
      }), ir(
        gn(n, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, r = gn(r, i), u = kc(
        e.stateNode,
        r,
        u
      ), gc(e, u), pt !== 4 && (pt = 2)), !1;
    var f = Error(s(520), { cause: r });
    if (f = gn(f, i), Tr === null ? Tr = [f] : Tr.push(f), pt !== 4 && (pt = 2), n === null) return !0;
    r = gn(r, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = kc(i.stateNode, r, e), gc(i, e), !1;
        case 1:
          if (n = i.type, f = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Fa === null || !Fa.has(f))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Hp(u), qp(
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
  function Lt(e, n, i, r) {
    n.child = e === null ? Gm(n, null, i, r) : Ai(
      n,
      e.child,
      i,
      r
    );
  }
  function kp(e, n, i, r, u) {
    i = i.render;
    var f = n.ref;
    if ("ref" in r) {
      var g = {};
      for (var E in r)
        E !== "ref" && (g[E] = r[E]);
    } else g = r;
    return wi(n), r = Tc(
      e,
      n,
      i,
      g,
      f,
      u
    ), E = wc(), e !== null && !Rt ? (Rc(e, n, u), ha(e, n, u)) : (qe && E && ic(n), n.flags |= 1, Lt(e, n, r, u), n.child);
  }
  function Pp(e, n, i, r, u) {
    if (e === null) {
      var f = i.type;
      return typeof f == "function" && !tc(f) && f.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = f, Yp(
        e,
        n,
        f,
        r,
        u
      )) : (e = Os(
        i.type,
        null,
        r,
        n,
        n.mode,
        u
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (f = e.child, !Ic(e, u)) {
      var g = f.memoizedProps;
      if (i = i.compare, i = i !== null ? i : tr, i(g, r) && e.ref === n.ref)
        return ha(e, n, u);
    }
    return n.flags |= 1, e = sa(f, r), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Yp(e, n, i, r, u) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (tr(f, r) && e.ref === n.ref)
        if (Rt = !1, n.pendingProps = r = f, Ic(e, u))
          (e.flags & 131072) !== 0 && (Rt = !0);
        else
          return n.lanes = e.lanes, ha(e, n, u);
    }
    return Yc(
      e,
      n,
      i,
      r,
      u
    );
  }
  function Gp(e, n, i, r) {
    var u = r.children, f = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), r.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | i : i, e !== null) {
          for (r = n.child = e.child, u = 0; r !== null; )
            u = u | r.lanes | r.childLanes, r = r.sibling;
          r = u & ~f;
        } else r = 0, n.child = null;
        return Fp(
          e,
          n,
          f,
          i,
          r
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Bs(
          n,
          f !== null ? f.cachePool : null
        ), f !== null ? $m(n, f) : bc(), Km(n);
      else
        return r = n.lanes = 536870912, Fp(
          e,
          n,
          f !== null ? f.baseLanes | i : i,
          i,
          r
        );
    } else
      f !== null ? (Bs(n, f.cachePool), $m(n, f), ka(), n.memoizedState = null) : (e !== null && Bs(n, null), bc(), ka());
    return Lt(e, n, u, i), n.child;
  }
  function yr(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Fp(e, n, i, r, u) {
    var f = hc();
    return f = f === null ? null : { parent: Tt._currentValue, pool: f }, n.memoizedState = {
      baseLanes: i,
      cachePool: f
    }, e !== null && Bs(n, null), bc(), Km(n), e !== null && ul(e, n, r, !0), n.childLanes = u, null;
  }
  function eo(e, n) {
    return n = no(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Xp(e, n, i) {
    return Ai(n, e.child, null, i), e = eo(n, n.pendingProps), e.flags |= 2, on(n), n.memoizedState = null, e;
  }
  function Z1(e, n, i) {
    var r = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (qe) {
        if (r.mode === "hidden")
          return e = eo(n, r), n.lanes = 536870912, yr(null, e);
        if (xc(n), (e = it) ? (e = ig(
          e,
          Sn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: _a !== null ? { id: Fn, overflow: Xn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = jm(e), i.return = n, n.child = i, _t = n, it = null)) : e = null, e === null) throw La(n);
        return n.lanes = 536870912, null;
      }
      return eo(n, r);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var g = f.dehydrated;
      if (xc(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = Xp(
            e,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(s(558));
      else if (Rt || ul(e, n, i, !1), u = (i & e.childLanes) !== 0, Rt || u) {
        if (r = et, r !== null && (g = M(r, i), g !== 0 && g !== f.retryLane))
          throw f.retryLane = g, Si(e, g), en(r, e, g), Pc;
        fo(), n = Xp(
          e,
          n,
          i
        );
      } else
        e = f.treeContext, it = En(g.nextSibling), _t = n, qe = !0, Oa = null, Sn = !1, e !== null && zm(n, e), n = eo(n, r), n.flags |= 4096;
      return n;
    }
    return e = sa(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function to(e, n) {
    var i = n.ref;
    if (i === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (e === null || e.ref !== i) && (n.flags |= 4194816);
    }
  }
  function Yc(e, n, i, r, u) {
    return wi(n), i = Tc(
      e,
      n,
      i,
      r,
      void 0,
      u
    ), r = wc(), e !== null && !Rt ? (Rc(e, n, u), ha(e, n, u)) : (qe && r && ic(n), n.flags |= 1, Lt(e, n, i, u), n.child);
  }
  function $p(e, n, i, r, u, f) {
    return wi(n), n.updateQueue = null, i = Im(
      n,
      r,
      i,
      u
    ), Qm(e), r = wc(), e !== null && !Rt ? (Rc(e, n, f), ha(e, n, f)) : (qe && r && ic(n), n.flags |= 1, Lt(e, n, i, f), n.child);
  }
  function Kp(e, n, i, r, u) {
    if (wi(n), n.stateNode === null) {
      var f = ll, g = i.contextType;
      typeof g == "object" && g !== null && (f = Ot(g)), f = new i(r, f), n.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = qc, n.stateNode = f, f._reactInternals = n, f = n.stateNode, f.props = r, f.state = n.memoizedState, f.refs = {}, pc(n), g = i.contextType, f.context = typeof g == "object" && g !== null ? Ot(g) : ll, f.state = n.memoizedState, g = i.getDerivedStateFromProps, typeof g == "function" && (Hc(
        n,
        i,
        g,
        r
      ), f.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (g = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), g !== f.state && qc.enqueueReplaceState(f, f.state, null), fr(n, r, f, u), cr(), f.state = n.memoizedState), typeof f.componentDidMount == "function" && (n.flags |= 4194308), r = !0;
    } else if (e === null) {
      f = n.stateNode;
      var E = n.memoizedProps, C = Di(i, E);
      f.props = C;
      var q = f.context, X = i.contextType;
      g = ll, typeof X == "object" && X !== null && (g = Ot(X));
      var ee = i.getDerivedStateFromProps;
      X = typeof ee == "function" || typeof f.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, X || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (E || q !== g) && Op(
        n,
        f,
        r,
        g
      ), Va = !1;
      var P = n.memoizedState;
      f.state = P, fr(n, r, f, u), cr(), q = n.memoizedState, E || P !== q || Va ? (typeof ee == "function" && (Hc(
        n,
        i,
        ee,
        r
      ), q = n.memoizedState), (C = Va || _p(
        n,
        i,
        C,
        r,
        P,
        q,
        g
      )) ? (X || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = q), f.props = r, f.state = q, f.context = g, r = C) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), r = !1);
    } else {
      f = n.stateNode, yc(e, n), g = n.memoizedProps, X = Di(i, g), f.props = X, ee = n.pendingProps, P = f.context, q = i.contextType, C = ll, typeof q == "object" && q !== null && (C = Ot(q)), E = i.getDerivedStateFromProps, (q = typeof E == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== ee || P !== C) && Op(
        n,
        f,
        r,
        C
      ), Va = !1, P = n.memoizedState, f.state = P, fr(n, r, f, u), cr();
      var Y = n.memoizedState;
      g !== ee || P !== Y || Va || e !== null && e.dependencies !== null && Us(e.dependencies) ? (typeof E == "function" && (Hc(
        n,
        i,
        E,
        r
      ), Y = n.memoizedState), (X = Va || _p(
        n,
        i,
        X,
        r,
        P,
        Y,
        C
      ) || e !== null && e.dependencies !== null && Us(e.dependencies)) ? (q || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(r, Y, C), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        r,
        Y,
        C
      )), typeof f.componentDidUpdate == "function" && (n.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = Y), f.props = r, f.state = Y, f.context = C, r = X) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (n.flags |= 1024), r = !1);
    }
    return f = r, to(e, n), r = (n.flags & 128) !== 0, f || r ? (f = n.stateNode, i = r && typeof i.getDerivedStateFromError != "function" ? null : f.render(), n.flags |= 1, e !== null && r ? (n.child = Ai(
      n,
      e.child,
      null,
      u
    ), n.child = Ai(
      n,
      null,
      i,
      u
    )) : Lt(e, n, i, u), n.memoizedState = f.state, e = n.child) : e = ha(
      e,
      n,
      u
    ), e;
  }
  function Qp(e, n, i, r) {
    return Ei(), n.flags |= 256, Lt(e, n, i, r), n.child;
  }
  var Gc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Fc(e) {
    return { baseLanes: e, cachePool: Bm() };
  }
  function Xc(e, n, i) {
    return e = e !== null ? e.childLanes & ~i : 0, n && (e |= cn), e;
  }
  function Ip(e, n, i) {
    var r = n.pendingProps, u = !1, f = (n.flags & 128) !== 0, g;
    if ((g = f) || (g = e !== null && e.memoizedState === null ? !1 : (vt.current & 2) !== 0), g && (u = !0, n.flags &= -129), g = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (qe) {
        if (u ? qa(n) : ka(), (e = it) ? (e = ig(
          e,
          Sn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: _a !== null ? { id: Fn, overflow: Xn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = jm(e), i.return = n, n.child = i, _t = n, it = null)) : e = null, e === null) throw La(n);
        return jf(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = r.children;
      return r = r.fallback, u ? (ka(), u = n.mode, E = no(
        { mode: "hidden", children: E },
        u
      ), r = xi(
        r,
        u,
        i,
        null
      ), E.return = n, r.return = n, E.sibling = r, n.child = E, r = n.child, r.memoizedState = Fc(i), r.childLanes = Xc(
        e,
        g,
        i
      ), n.memoizedState = Gc, yr(null, r)) : (qa(n), $c(n, E));
    }
    var C = e.memoizedState;
    if (C !== null && (E = C.dehydrated, E !== null)) {
      if (f)
        n.flags & 256 ? (qa(n), n.flags &= -257, n = Kc(
          e,
          n,
          i
        )) : n.memoizedState !== null ? (ka(), n.child = e.child, n.flags |= 128, n = null) : (ka(), E = r.fallback, u = n.mode, r = no(
          { mode: "visible", children: r.children },
          u
        ), E = xi(
          E,
          u,
          i,
          null
        ), E.flags |= 2, r.return = n, E.return = n, r.sibling = E, n.child = r, Ai(
          n,
          e.child,
          null,
          i
        ), r = n.child, r.memoizedState = Fc(i), r.childLanes = Xc(
          e,
          g,
          i
        ), n.memoizedState = Gc, n = yr(null, r));
      else if (qa(n), jf(E)) {
        if (g = E.nextSibling && E.nextSibling.dataset, g) var q = g.dgst;
        g = q, r = Error(s(419)), r.stack = "", r.digest = g, ir({ value: r, source: null, stack: null }), n = Kc(
          e,
          n,
          i
        );
      } else if (Rt || ul(e, n, i, !1), g = (i & e.childLanes) !== 0, Rt || g) {
        if (g = et, g !== null && (r = M(g, i), r !== 0 && r !== C.retryLane))
          throw C.retryLane = r, Si(e, r), en(g, e, r), Pc;
        Af(E) || fo(), n = Kc(
          e,
          n,
          i
        );
      } else
        Af(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = C.treeContext, it = En(
          E.nextSibling
        ), _t = n, qe = !0, Oa = null, Sn = !1, e !== null && zm(n, e), n = $c(
          n,
          r.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (ka(), E = r.fallback, u = n.mode, C = e.child, q = C.sibling, r = sa(C, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = C.subtreeFlags & 65011712, q !== null ? E = sa(
      q,
      E
    ) : (E = xi(
      E,
      u,
      i,
      null
    ), E.flags |= 2), E.return = n, r.return = n, r.sibling = E, n.child = r, yr(null, r), r = n.child, E = e.child.memoizedState, E === null ? E = Fc(i) : (u = E.cachePool, u !== null ? (C = Tt._currentValue, u = u.parent !== C ? { parent: C, pool: C } : u) : u = Bm(), E = {
      baseLanes: E.baseLanes | i,
      cachePool: u
    }), r.memoizedState = E, r.childLanes = Xc(
      e,
      g,
      i
    ), n.memoizedState = Gc, yr(e.child, r)) : (qa(n), i = e.child, e = i.sibling, i = sa(i, {
      mode: "visible",
      children: r.children
    }), i.return = n, i.sibling = null, e !== null && (g = n.deletions, g === null ? (n.deletions = [e], n.flags |= 16) : g.push(e)), n.child = i, n.memoizedState = null, i);
  }
  function $c(e, n) {
    return n = no(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function no(e, n) {
    return e = rn(22, e, null, n), e.lanes = 0, e;
  }
  function Kc(e, n, i) {
    return Ai(n, e.child, null, i), e = $c(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Zp(e, n, i) {
    e.lanes |= n;
    var r = e.alternate;
    r !== null && (r.lanes |= n), uc(e.return, n, i);
  }
  function Qc(e, n, i, r, u, f) {
    var g = e.memoizedState;
    g === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: r,
      tail: i,
      tailMode: u,
      treeForkCount: f
    } : (g.isBackwards = n, g.rendering = null, g.renderingStartTime = 0, g.last = r, g.tail = i, g.tailMode = u, g.treeForkCount = f);
  }
  function Jp(e, n, i) {
    var r = n.pendingProps, u = r.revealOrder, f = r.tail;
    r = r.children;
    var g = vt.current, E = (g & 2) !== 0;
    if (E ? (g = g & 1 | 2, n.flags |= 128) : g &= 1, le(vt, g), Lt(e, n, r, i), r = qe ? ar : 0, !E && e !== null && (e.flags & 128) !== 0)
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
          f,
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
          f,
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
    if (e !== null && (n.dependencies = e.dependencies), Ga |= n.lanes, (i & n.childLanes) === 0)
      if (e !== null) {
        if (ul(
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
  function Ic(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Us(e)));
  }
  function J1(e, n, i) {
    switch (n.tag) {
      case 3:
        ht(n, n.stateNode.containerInfo), Ua(n, Tt, e.memoizedState.cache), Ei();
        break;
      case 27:
      case 5:
        ea(n);
        break;
      case 4:
        ht(n, n.stateNode.containerInfo);
        break;
      case 10:
        Ua(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, xc(n), null;
        break;
      case 13:
        var r = n.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (qa(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? Ip(e, n, i) : (qa(n), e = ha(
            e,
            n,
            i
          ), e !== null ? e.sibling : null);
        qa(n);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (r = (i & n.childLanes) !== 0, r || (ul(
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
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), le(vt, vt.current), r) break;
        return null;
      case 22:
        return n.lanes = 0, Gp(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        Ua(n, Tt, e.memoizedState.cache);
    }
    return ha(e, n, i);
  }
  function Wp(e, n, i) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Rt = !0;
      else {
        if (!Ic(e, i) && (n.flags & 128) === 0)
          return Rt = !1, J1(
            e,
            n,
            i
          );
        Rt = (e.flags & 131072) !== 0;
      }
    else
      Rt = !1, qe && (n.flags & 1048576) !== 0 && Nm(n, ar, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var r = n.pendingProps;
          if (e = Ci(n.elementType), n.type = e, typeof e == "function")
            tc(e) ? (r = Di(e, r), n.tag = 1, n = Kp(
              null,
              n,
              e,
              r,
              i
            )) : (n.tag = 0, n = Yc(
              null,
              n,
              e,
              r,
              i
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === V) {
                n.tag = 11, n = kp(
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
            throw n = G(e) || e, Error(s(306, n, ""));
          }
        }
        return n;
      case 0:
        return Yc(
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
          var f = n.memoizedState;
          u = f.element, yc(e, n), fr(n, r, null, i);
          var g = n.memoizedState;
          if (r = g.cache, Ua(n, Tt, r), r !== f.cache && cc(
            n,
            [Tt],
            i,
            !0
          ), cr(), r = g.element, f.isDehydrated)
            if (f = {
              element: r,
              isDehydrated: !1,
              cache: g.cache
            }, n.updateQueue.baseState = f, n.memoizedState = f, n.flags & 256) {
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
              ), ir(u), n = Qp(
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
              for (it = En(e.firstChild), _t = n, qe = !0, Oa = null, Sn = !0, i = Gm(
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
        return to(e, n), e === null ? (i = cg(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : qe || (i = n.type, e = n.pendingProps, r = bo(
          we.current
        ).createElement(i), r[fe] = n, r[de] = e, Ut(r, i, e), nt(r), n.stateNode = r) : n.memoizedState = cg(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ea(n), e === null && qe && (r = n.stateNode = sg(
          n.type,
          n.pendingProps,
          we.current
        ), _t = n, Sn = !0, u = it, Qa(n.type) ? (Df = u, it = En(r.firstChild)) : it = u), Lt(
          e,
          n,
          n.pendingProps.children,
          i
        ), to(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && qe && ((u = r = it) && (r = AE(
          r,
          n.type,
          n.pendingProps,
          Sn
        ), r !== null ? (n.stateNode = r, _t = n, it = En(r.firstChild), Sn = !1, u = !0) : u = !1), u || La(n)), ea(n), u = n.type, f = n.pendingProps, g = e !== null ? e.memoizedProps : null, r = f.children, Rf(u, f) ? r = null : g !== null && Rf(u, g) && (n.flags |= 32), n.memoizedState !== null && (u = Tc(
          e,
          n,
          Y1,
          null,
          null,
          i
        ), Nr._currentValue = u), to(e, n), Lt(e, n, r, i), n.child;
      case 6:
        return e === null && qe && ((e = i = it) && (i = jE(
          i,
          n.pendingProps,
          Sn
        ), i !== null ? (n.stateNode = i, _t = n, it = null, e = !0) : e = !1), e || La(n)), null;
      case 13:
        return Ip(e, n, i);
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
        return kp(
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
        return r = n.pendingProps, Ua(n, n.type, r.value), Lt(e, n, r.children, i), n.child;
      case 9:
        return u = n.type._context, r = n.pendingProps.children, wi(n), u = Ot(u), r = r(u), n.flags |= 1, Lt(e, n, r, i), n.child;
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
        return Z1(e, n, i);
      case 22:
        return Gp(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return wi(n), r = Ot(Tt), e === null ? (u = hc(), u === null && (u = et, f = fc(), u.pooledCache = f, f.refCount++, f !== null && (u.pooledCacheLanes |= i), u = f), n.memoizedState = { parent: r, cache: u }, pc(n), Ua(n, Tt, u)) : ((e.lanes & i) !== 0 && (yc(e, n), fr(n, null, null, i), cr()), u = e.memoizedState, f = n.memoizedState, u.parent !== r ? (u = { parent: r, cache: r }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), Ua(n, Tt, r)) : (r = f.cache, Ua(n, Tt, r), r !== u.cache && cc(
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
  function Zc(e, n, i, r, u) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Cy()) e.flags |= 8192;
        else
          throw Mi = qs, mc;
    } else e.flags &= -16777217;
  }
  function ey(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !pg(n))
      if (Cy()) e.flags |= 8192;
      else
        throw Mi = qs, mc;
  }
  function ao(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? $l() : 536870912, e.lanes |= n, xl |= n);
  }
  function gr(e, n) {
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
  function lt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, i = 0, r = 0;
    if (n)
      for (var u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, r |= u.subtreeFlags & 65011712, r |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, r |= u.subtreeFlags, r |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= r, e.childLanes = i, n;
  }
  function W1(e, n, i) {
    var r = n.pendingProps;
    switch (lc(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return lt(n), null;
      case 1:
        return lt(n), null;
      case 3:
        return i = n.stateNode, r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), ca(Tt), Xe(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (ol(n) ? ma(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, sc())), lt(n), null;
      case 26:
        var u = n.type, f = n.memoizedState;
        return e === null ? (ma(n), f !== null ? (lt(n), ey(n, f)) : (lt(n), Zc(
          n,
          u,
          null,
          r,
          i
        ))) : f ? f !== e.memoizedState ? (ma(n), lt(n), ey(n, f)) : (lt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== r && ma(n), lt(n), Zc(
          n,
          u,
          e,
          r,
          i
        )), null;
      case 27:
        if (Ra(n), i = we.current, u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== r && ma(n);
        else {
          if (!r) {
            if (n.stateNode === null)
              throw Error(s(166));
            return lt(n), null;
          }
          e = oe.current, ol(n) ? _m(n) : (e = sg(u, r, i), n.stateNode = e, ma(n));
        }
        return lt(n), null;
      case 5:
        if (Ra(n), u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== r && ma(n);
        else {
          if (!r) {
            if (n.stateNode === null)
              throw Error(s(166));
            return lt(n), null;
          }
          if (f = oe.current, ol(n))
            _m(n);
          else {
            var g = bo(
              we.current
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
            f[fe] = n, f[de] = r;
            e: for (g = n.child; g !== null; ) {
              if (g.tag === 5 || g.tag === 6)
                f.appendChild(g.stateNode);
              else if (g.tag !== 4 && g.tag !== 27 && g.child !== null) {
                g.child.return = g, g = g.child;
                continue;
              }
              if (g === n) break e;
              for (; g.sibling === null; ) {
                if (g.return === null || g.return === n)
                  break e;
                g = g.return;
              }
              g.sibling.return = g.return, g = g.sibling;
            }
            n.stateNode = f;
            e: switch (Ut(f, u, r), u) {
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
        return lt(n), Zc(
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
          if (e = we.current, ol(n)) {
            if (e = n.stateNode, i = n.memoizedProps, r = null, u = _t, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  r = u.memoizedProps;
              }
            e[fe] = n, e = !!(e.nodeValue === i || r !== null && r.suppressHydrationWarning === !0 || Iy(e.nodeValue, i)), e || La(n, !0);
          } else
            e = bo(e).createTextNode(
              r
            ), e[fe] = n, n.stateNode = e;
        }
        return lt(n), null;
      case 31:
        if (i = n.memoizedState, e === null || e.memoizedState !== null) {
          if (r = ol(n), i !== null) {
            if (e === null) {
              if (!r) throw Error(s(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[fe] = n;
            } else
              Ei(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            lt(n), e = !1;
          } else
            i = sc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return n.flags & 256 ? (on(n), n) : (on(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(s(558));
        }
        return lt(n), null;
      case 13:
        if (r = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = ol(n), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[fe] = n;
            } else
              Ei(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            lt(n), u = !1;
          } else
            u = sc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (on(n), n) : (on(n), null);
        }
        return on(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = r !== null, e = e !== null && e.memoizedState !== null, i && (r = n.child, u = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (u = r.alternate.memoizedState.cachePool.pool), f = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (f = r.memoizedState.cachePool.pool), f !== u && (r.flags |= 2048)), i !== e && i && (n.child.flags |= 8192), ao(n, n.updateQueue), lt(n), null);
      case 4:
        return Xe(), e === null && Sf(n.stateNode.containerInfo), lt(n), null;
      case 10:
        return ca(n.type), lt(n), null;
      case 19:
        if (F(vt), r = n.memoizedState, r === null) return lt(n), null;
        if (u = (n.flags & 128) !== 0, f = r.rendering, f === null)
          if (u) gr(r, !1);
          else {
            if (pt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (f = Gs(e), f !== null) {
                  for (n.flags |= 128, gr(r, !1), e = f.updateQueue, n.updateQueue = e, ao(n, e), n.subtreeFlags = 0, e = i, i = n.child; i !== null; )
                    Am(i, e), i = i.sibling;
                  return le(
                    vt,
                    vt.current & 1 | 2
                  ), qe && oa(n, r.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            r.tail !== null && Gt() > oo && (n.flags |= 128, u = !0, gr(r, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Gs(f), e !== null) {
              if (n.flags |= 128, u = !0, e = e.updateQueue, n.updateQueue = e, ao(n, e), gr(r, !0), r.tail === null && r.tailMode === "hidden" && !f.alternate && !qe)
                return lt(n), null;
            } else
              2 * Gt() - r.renderingStartTime > oo && i !== 536870912 && (n.flags |= 128, u = !0, gr(r, !1), n.lanes = 4194304);
          r.isBackwards ? (f.sibling = n.child, n.child = f) : (e = r.last, e !== null ? e.sibling = f : n.child = f, r.last = f);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Gt(), e.sibling = null, i = vt.current, le(
          vt,
          u ? i & 1 | 2 : i & 1
        ), qe && oa(n, r.treeForkCount), e) : (lt(n), null);
      case 22:
      case 23:
        return on(n), Sc(), r = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (n.flags |= 8192) : r && (n.flags |= 8192), r ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (lt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : lt(n), i = n.updateQueue, i !== null && ao(n, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), r = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (r = n.memoizedState.cachePool.pool), r !== i && (n.flags |= 2048), e !== null && F(Ri), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), ca(Tt), lt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function eE(e, n) {
    switch (lc(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return ca(Tt), Xe(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ra(n), null;
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
        return F(vt), null;
      case 4:
        return Xe(), null;
      case 10:
        return ca(n.type), null;
      case 22:
      case 23:
        return on(n), Sc(), e !== null && F(Ri), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return ca(Tt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ty(e, n) {
    switch (lc(n), n.tag) {
      case 3:
        ca(Tt), Xe();
        break;
      case 26:
      case 27:
      case 5:
        Ra(n);
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
        F(vt);
        break;
      case 10:
        ca(n.type);
        break;
      case 22:
      case 23:
        on(n), Sc(), e !== null && F(Ri);
        break;
      case 24:
        ca(Tt);
    }
  }
  function vr(e, n) {
    try {
      var i = n.updateQueue, r = i !== null ? i.lastEffect : null;
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
      Ke(n, n.return, E);
    }
  }
  function Pa(e, n, i) {
    try {
      var r = n.updateQueue, u = r !== null ? r.lastEffect : null;
      if (u !== null) {
        var f = u.next;
        r = f;
        do {
          if ((r.tag & e) === e) {
            var g = r.inst, E = g.destroy;
            if (E !== void 0) {
              g.destroy = void 0, u = n;
              var C = i, q = E;
              try {
                q();
              } catch (X) {
                Ke(
                  u,
                  C,
                  X
                );
              }
            }
          }
          r = r.next;
        } while (r !== f);
      }
    } catch (X) {
      Ke(n, n.return, X);
    }
  }
  function ny(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var i = e.stateNode;
      try {
        Xm(n, i);
      } catch (r) {
        Ke(e, e.return, r);
      }
    }
  }
  function ay(e, n, i) {
    i.props = Di(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (r) {
      Ke(e, n, r);
    }
  }
  function br(e, n) {
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
  function $n(e, n) {
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
  function Jc(e, n, i) {
    try {
      var r = e.stateNode;
      EE(r, e.type, i, n), r[de] = n;
    } catch (u) {
      Ke(e, e.return, u);
    }
  }
  function ly(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Qa(e.type) || e.tag === 4;
  }
  function Wc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ly(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Qa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ef(e, n, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(e), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = la));
    else if (r !== 4 && (r === 27 && Qa(e.type) && (i = e.stateNode, n = null), e = e.child, e !== null))
      for (ef(e, n, i), e = e.sibling; e !== null; )
        ef(e, n, i), e = e.sibling;
  }
  function io(e, n, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? i.insertBefore(e, n) : i.appendChild(e);
    else if (r !== 4 && (r === 27 && Qa(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (io(e, n, i), e = e.sibling; e !== null; )
        io(e, n, i), e = e.sibling;
  }
  function ry(e) {
    var n = e.stateNode, i = e.memoizedProps;
    try {
      for (var r = e.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      Ut(n, r, i), n[fe] = e, n[de] = i;
    } catch (f) {
      Ke(e, e.return, f);
    }
  }
  var pa = !1, Ct = !1, tf = !1, sy = typeof WeakSet == "function" ? WeakSet : Set, zt = null;
  function tE(e, n) {
    if (e = e.containerInfo, Tf = Co, e = bm(e), Ku(e)) {
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
            var g = 0, E = -1, C = -1, q = 0, X = 0, ee = e, P = null;
            t: for (; ; ) {
              for (var Y; ee !== i || u !== 0 && ee.nodeType !== 3 || (E = g + u), ee !== f || r !== 0 && ee.nodeType !== 3 || (C = g + r), ee.nodeType === 3 && (g += ee.nodeValue.length), (Y = ee.firstChild) !== null; )
                P = ee, ee = Y;
              for (; ; ) {
                if (ee === e) break t;
                if (P === i && ++q === u && (E = g), P === f && ++X === r && (C = g), (Y = ee.nextSibling) !== null) break;
                ee = P, P = ee.parentNode;
              }
              ee = Y;
            }
            i = E === -1 || C === -1 ? null : { start: E, end: C };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (wf = { focusedElem: e, selectionRange: i }, Co = !1, zt = n; zt !== null; )
      if (n = zt, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, zt = e;
      else
        for (; zt !== null; ) {
          switch (n = zt, f = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  u = e[i], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, i = n, u = f.memoizedProps, f = f.memoizedState, r = i.stateNode;
                try {
                  var me = Di(
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
                if (e = n.stateNode.containerInfo, i = e.nodeType, i === 9)
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
        ga(e, i), r & 4 && vr(5, i);
        break;
      case 1:
        if (ga(e, i), r & 4)
          if (e = i.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (g) {
              Ke(i, i.return, g);
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
            } catch (g) {
              Ke(
                i,
                i.return,
                g
              );
            }
          }
        r & 64 && ny(i), r & 512 && br(i, i.return);
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
          } catch (g) {
            Ke(i, i.return, g);
          }
        }
        break;
      case 27:
        n === null && r & 4 && ry(i);
      case 26:
      case 5:
        ga(e, i), n === null && r & 4 && iy(i), r & 512 && br(i, i.return);
        break;
      case 12:
        ga(e, i);
        break;
      case 31:
        ga(e, i), r & 4 && fy(e, i);
        break;
      case 13:
        ga(e, i), r & 4 && dy(e, i), r & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = cE.bind(
          null,
          i
        ), DE(e, i))));
        break;
      case 22:
        if (r = i.memoizedState !== null || pa, !r) {
          n = n !== null && n.memoizedState !== null || Ct, u = pa;
          var f = Ct;
          pa = r, (Ct = n) && !f ? va(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : ga(e, i), pa = u, Ct = f;
        }
        break;
      case 30:
        break;
      default:
        ga(e, i);
    }
  }
  function uy(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, uy(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && We(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ft = null, It = !1;
  function ya(e, n, i) {
    for (i = i.child; i !== null; )
      cy(e, n, i), i = i.sibling;
  }
  function cy(e, n, i) {
    if (Ft && typeof Ft.onCommitFiberUnmount == "function")
      try {
        Ft.onCommitFiberUnmount(aa, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Ct || $n(i, n), ya(
          e,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Ct || $n(i, n);
        var r = ft, u = It;
        Qa(i.type) && (ft = i.stateNode, It = !1), ya(
          e,
          n,
          i
        ), Ar(i.stateNode), ft = r, It = u;
        break;
      case 5:
        Ct || $n(i, n);
      case 6:
        if (r = ft, u = It, ft = null, ya(
          e,
          n,
          i
        ), ft = r, It = u, ft !== null)
          if (It)
            try {
              (ft.nodeType === 9 ? ft.body : ft.nodeName === "HTML" ? ft.ownerDocument.body : ft).removeChild(i.stateNode);
            } catch (f) {
              Ke(
                i,
                n,
                f
              );
            }
          else
            try {
              ft.removeChild(i.stateNode);
            } catch (f) {
              Ke(
                i,
                n,
                f
              );
            }
        break;
      case 18:
        ft !== null && (It ? (e = ft, ng(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), jl(e)) : ng(ft, i.stateNode));
        break;
      case 4:
        r = ft, u = It, ft = i.stateNode.containerInfo, It = !0, ya(
          e,
          n,
          i
        ), ft = r, It = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Pa(2, i, n), Ct || Pa(4, i, n), ya(
          e,
          n,
          i
        );
        break;
      case 1:
        Ct || ($n(i, n), r = i.stateNode, typeof r.componentWillUnmount == "function" && ay(
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
  function fy(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        jl(e);
      } catch (i) {
        Ke(n, n.return, i);
      }
    }
  }
  function dy(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        jl(e);
      } catch (i) {
        Ke(n, n.return, i);
      }
  }
  function nE(e) {
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
  function lo(e, n) {
    var i = nE(e);
    n.forEach(function(r) {
      if (!i.has(r)) {
        i.add(r);
        var u = fE.bind(null, e, r);
        r.then(u, u);
      }
    });
  }
  function Zt(e, n) {
    var i = n.deletions;
    if (i !== null)
      for (var r = 0; r < i.length; r++) {
        var u = i[r], f = e, g = n, E = g;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (Qa(E.type)) {
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
        cy(f, g, u), ft = null, It = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
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
        Zt(n, e), Jt(e), r & 4 && (Pa(3, e, e.return), vr(3, e), Pa(5, e, e.return));
        break;
      case 1:
        Zt(n, e), Jt(e), r & 512 && (Ct || i === null || $n(i, i.return)), r & 64 && pa && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? r : i.concat(r))));
        break;
      case 26:
        var u = Ln;
        if (Zt(n, e), Jt(e), r & 512 && (Ct || i === null || $n(i, i.return)), r & 4) {
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
                      )), Ut(f, r, i), f[fe] = e, nt(f), r = f;
                      break e;
                    case "link":
                      var g = hg(
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
                      f = u.createElement(r), Ut(f, r, i), u.head.appendChild(f);
                      break;
                    case "meta":
                      if (g = hg(
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
                      f = u.createElement(r), Ut(f, r, i), u.head.appendChild(f);
                      break;
                    default:
                      throw Error(s(468, r));
                  }
                  f[fe] = e, nt(f), r = f;
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
            f !== r ? (f === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : f.count--, r === null ? mg(
              u,
              e.type,
              e.stateNode
            ) : dg(
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
        Zt(n, e), Jt(e), r & 512 && (Ct || i === null || $n(i, i.return)), i !== null && r & 4 && Jc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Zt(n, e), Jt(e), r & 512 && (Ct || i === null || $n(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            Ji(u, "");
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
        if (Zt(n, e), Jt(e), r & 4) {
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
        if (Eo = null, u = Ln, Ln = So(n.containerInfo), Zt(n, e), Ln = u, Jt(e), r & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            jl(n.containerInfo);
          } catch (me) {
            Ke(e, e.return, me);
          }
        tf && (tf = !1, my(e));
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
        Zt(n, e), Jt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, lo(e, r)));
        break;
      case 13:
        Zt(n, e), Jt(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (so = Gt()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, lo(e, r)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var C = i !== null && i.memoizedState !== null, q = pa, X = Ct;
        if (pa = q || u, Ct = X || C, Zt(n, e), Ct = X, pa = q, Jt(e), r & 8192)
          e: for (n = e.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (i === null || C || pa || Ct || Ni(e)), i = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                C = i = n;
                try {
                  if (f = C.stateNode, u)
                    g = f.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none";
                  else {
                    E = C.stateNode;
                    var ee = C.memoizedProps.style, P = ee != null && ee.hasOwnProperty("display") ? ee.display : null;
                    E.style.display = P == null || typeof P == "boolean" ? "" : ("" + P).trim();
                  }
                } catch (me) {
                  Ke(C, C.return, me);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                C = n;
                try {
                  C.stateNode.nodeValue = u ? "" : C.memoizedProps;
                } catch (me) {
                  Ke(C, C.return, me);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                C = n;
                try {
                  var Y = C.stateNode;
                  u ? ag(Y, !0) : ag(C.stateNode, !1);
                } catch (me) {
                  Ke(C, C.return, me);
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
        r & 4 && (r = e.updateQueue, r !== null && (i = r.retryQueue, i !== null && (r.retryQueue = null, lo(e, i))));
        break;
      case 19:
        Zt(n, e), Jt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, lo(e, r)));
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
          if (ly(r)) {
            i = r;
            break;
          }
          r = r.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, f = Wc(e);
            io(e, f, u);
            break;
          case 5:
            var g = i.stateNode;
            i.flags & 32 && (Ji(g, ""), i.flags &= -33);
            var E = Wc(e);
            io(e, E, g);
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
      } catch (X) {
        Ke(e, e.return, X);
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
  function ga(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        oy(e, n.alternate, n), n = n.sibling;
  }
  function Ni(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Pa(4, n, n.return), Ni(n);
          break;
        case 1:
          $n(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && ay(
            n,
            n.return,
            i
          ), Ni(n);
          break;
        case 27:
          Ar(n.stateNode);
        case 26:
        case 5:
          $n(n, n.return), Ni(n);
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
      var r = n.alternate, u = e, f = n, g = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          va(
            u,
            f,
            i
          ), vr(4, f);
          break;
        case 1:
          if (va(
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
                  Fm(C[u], E);
            } catch (q) {
              Ke(r, r.return, q);
            }
          }
          i && g & 64 && ny(f), br(f, f.return);
          break;
        case 27:
          ry(f);
        case 26:
        case 5:
          va(
            u,
            f,
            i
          ), i && r === null && g & 4 && iy(f), br(f, f.return);
          break;
        case 12:
          va(
            u,
            f,
            i
          );
          break;
        case 31:
          va(
            u,
            f,
            i
          ), i && g & 4 && fy(u, f);
          break;
        case 13:
          va(
            u,
            f,
            i
          ), i && g & 4 && dy(u, f);
          break;
        case 22:
          f.memoizedState === null && va(
            u,
            f,
            i
          ), br(f, f.return);
          break;
        case 30:
          break;
        default:
          va(
            u,
            f,
            i
          );
      }
      n = n.sibling;
    }
  }
  function nf(e, n) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && lr(i));
  }
  function af(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && lr(e));
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
        ), u & 2048 && vr(9, n);
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
        ), u & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && lr(e)));
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
            var f = n.memoizedProps, g = f.id, E = f.onPostCommit;
            typeof E == "function" && E(
              g,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (C) {
            Ke(n, n.return, C);
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
        f = n.stateNode, g = n.alternate, n.memoizedState !== null ? f._visibility & 2 ? Un(
          e,
          n,
          i,
          r
        ) : Sr(e, n) : f._visibility & 2 ? Un(
          e,
          n,
          i,
          r
        ) : (f._visibility |= 2, vl(
          e,
          n,
          i,
          r,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && nf(g, n);
        break;
      case 24:
        Un(
          e,
          n,
          i,
          r
        ), u & 2048 && af(n.alternate, n);
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
  function vl(e, n, i, r, u) {
    for (u = u && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var f = e, g = n, E = i, C = r, q = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          vl(
            f,
            g,
            E,
            C,
            u
          ), vr(8, g);
          break;
        case 23:
          break;
        case 22:
          var X = g.stateNode;
          g.memoizedState !== null ? X._visibility & 2 ? vl(
            f,
            g,
            E,
            C,
            u
          ) : Sr(
            f,
            g
          ) : (X._visibility |= 2, vl(
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
          vl(
            f,
            g,
            E,
            C,
            u
          ), u && q & 2048 && af(g.alternate, g);
          break;
        default:
          vl(
            f,
            g,
            E,
            C,
            u
          );
      }
      n = n.sibling;
    }
  }
  function Sr(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = e, r = n, u = r.flags;
        switch (r.tag) {
          case 22:
            Sr(i, r), u & 2048 && nf(
              r.alternate,
              r
            );
            break;
          case 24:
            Sr(i, r), u & 2048 && af(r.alternate, r);
            break;
          default:
            Sr(i, r);
        }
        n = n.sibling;
      }
  }
  var xr = 8192;
  function bl(e, n, i) {
    if (e.subtreeFlags & xr)
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
        bl(
          e,
          n,
          i
        ), e.flags & xr && e.memoizedState !== null && PE(
          i,
          Ln,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        bl(
          e,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var r = Ln;
        Ln = So(e.stateNode.containerInfo), bl(
          e,
          n,
          i
        ), Ln = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = xr, xr = 16777216, bl(
          e,
          n,
          i
        ), xr = r) : bl(
          e,
          n,
          i
        ));
        break;
      default:
        bl(
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
  function Er(e) {
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
        Er(e), e.flags & 2048 && Pa(9, e, e.return);
        break;
      case 3:
        Er(e);
        break;
      case 12:
        Er(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, ro(e)) : Er(e);
        break;
      default:
        Er(e);
    }
  }
  function ro(e) {
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
          Pa(8, n, n.return), ro(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, ro(n));
          break;
        default:
          ro(n);
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
          Pa(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var r = i.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          lr(i.memoizedState.cache);
      }
      if (r = i.child, r !== null) r.return = i, zt = r;
      else
        e: for (i = e; zt !== null; ) {
          r = zt;
          var u = r.sibling, f = r.return;
          if (uy(r), r === i) {
            zt = null;
            break e;
          }
          if (u !== null) {
            u.return = f, zt = u;
            break e;
          }
          zt = f;
        }
    }
  }
  var aE = {
    getCacheForType: function(e) {
      var n = Ot(Tt), i = n.data.get(e);
      return i === void 0 && (i = e(), n.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Ot(Tt).controller.signal;
    }
  }, iE = typeof WeakMap == "function" ? WeakMap : Map, Ge = 0, et = null, Ue = null, Be = 0, $e = 0, un = null, Ya = !1, Sl = !1, lf = !1, ba = 0, pt = 0, Ga = 0, zi = 0, rf = 0, cn = 0, xl = 0, Tr = null, Wt = null, sf = !1, so = 0, Sy = 0, oo = 1 / 0, uo = null, Fa = null, At = 0, Xa = null, El = null, Sa = 0, of = 0, uf = null, xy = null, wr = 0, cf = null;
  function fn() {
    return (Ge & 2) !== 0 && Be !== 0 ? Be & -Be : N.T !== null ? yf() : ae();
  }
  function Ey() {
    if (cn === 0)
      if ((Be & 536870912) === 0 || qe) {
        var e = ia;
        ia <<= 1, (ia & 3932160) === 0 && (ia = 262144), cn = e;
      } else cn = 536870912;
    return e = sn.current, e !== null && (e.flags |= 32), cn;
  }
  function en(e, n, i) {
    (e === et && ($e === 2 || $e === 9) || e.cancelPendingCommit !== null) && (Tl(e, 0), $a(
      e,
      Be,
      cn,
      !1
    )), Pn(e, i), ((Ge & 2) === 0 || e !== et) && (e === et && ((Ge & 2) === 0 && (zi |= i), pt === 4 && $a(
      e,
      Be,
      cn,
      !1
    )), Kn(e));
  }
  function Ty(e, n, i) {
    if ((Ge & 6) !== 0) throw Error(s(327));
    var r = !i && (n & 127) === 0 && (n & e.expiredLanes) === 0 || ja(e, n), u = r ? sE(e, n) : df(e, n, !0), f = r;
    do {
      if (u === 0) {
        Sl && !r && $a(e, n, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, f && !lE(i)) {
          u = df(e, n, !1), f = !1;
          continue;
        }
        if (u === 2) {
          if (f = n, e.errorRecoveryDisabledLanes & f)
            var g = 0;
          else
            g = e.pendingLanes & -536870913, g = g !== 0 ? g : g & 536870912 ? 536870912 : 0;
          if (g !== 0) {
            n = g;
            e: {
              var E = e;
              u = Tr;
              var C = E.current.memoizedState.isDehydrated;
              if (C && (Tl(E, g).flags |= 256), g = df(
                E,
                g,
                !1
              ), g !== 2) {
                if (lf && !C) {
                  E.errorRecoveryDisabledLanes |= f, zi |= f, u = 4;
                  break e;
                }
                f = Wt, Wt = u, f !== null && (Wt === null ? Wt = f : Wt.push.apply(
                  Wt,
                  f
                ));
              }
              u = g;
            }
            if (f = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Tl(e, 0), $a(e, n, 0, !0);
          break;
        }
        e: {
          switch (r = e, f = u, f) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              $a(
                r,
                n,
                cn,
                !Ya
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
          if ((n & 62914560) === n && (u = so + 300 - Gt(), 10 < u)) {
            if ($a(
              r,
              n,
              cn,
              !Ya
            ), $i(r, 0, !0) !== 0) break e;
            Sa = n, r.timeoutHandle = eg(
              wy.bind(
                null,
                r,
                i,
                Wt,
                uo,
                sf,
                n,
                cn,
                zi,
                xl,
                Ya,
                f,
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
            Wt,
            uo,
            sf,
            n,
            cn,
            zi,
            xl,
            Ya,
            f,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Kn(e);
  }
  function wy(e, n, i, r, u, f, g, E, C, q, X, ee, P, Y) {
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
      }, yy(
        n,
        f,
        ee
      );
      var me = (f & 62914560) === f ? so - Gt() : (f & 4194048) === f ? Sy - Gt() : 0;
      if (me = YE(
        ee,
        me
      ), me !== null) {
        Sa = f, e.cancelPendingCommit = me(
          zy.bind(
            null,
            e,
            n,
            f,
            i,
            r,
            u,
            g,
            E,
            C,
            X,
            ee,
            null,
            P,
            Y
          )
        ), $a(e, f, g, !q);
        return;
      }
    }
    zy(
      e,
      n,
      f,
      i,
      r,
      u,
      g,
      E,
      C
    );
  }
  function lE(e) {
    for (var n = e; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var r = 0; r < i.length; r++) {
          var u = i[r], f = u.getSnapshot;
          u = u.value;
          try {
            if (!ln(f(), u)) return !1;
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
  function $a(e, n, i, r) {
    n &= ~rf, n &= ~zi, e.suspendedLanes |= n, e.pingedLanes &= ~n, r && (e.warmLanes |= n), r = e.expirationTimes;
    for (var u = n; 0 < u; ) {
      var f = 31 - qt(u), g = 1 << f;
      r[f] = -1, u &= ~g;
    }
    i !== 0 && bs(e, i, n);
  }
  function co() {
    return (Ge & 6) === 0 ? (Rr(0), !1) : !0;
  }
  function ff() {
    if (Ue !== null) {
      if ($e === 0)
        var e = Ue.return;
      else
        e = Ue, ua = Ti = null, Cc(e), hl = null, sr = 0, e = Ue;
      for (; e !== null; )
        ty(e.alternate, e), e = e.return;
      Ue = null;
    }
  }
  function Tl(e, n) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, RE(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), Sa = 0, ff(), et = e, Ue = i = sa(e.current, null), Be = n, $e = 0, un = null, Ya = !1, Sl = ja(e, n), lf = !1, xl = cn = rf = zi = Ga = pt = 0, Wt = Tr = null, sf = !1, (n & 8) !== 0 && (n |= n & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= n; 0 < r; ) {
        var u = 31 - qt(r), f = 1 << u;
        n |= e[u], r &= ~f;
      }
    return ba = n, Ns(), i;
  }
  function Ry(e, n) {
    Ae = null, N.H = pr, n === dl || n === Hs ? (n = km(), $e = 3) : n === mc ? (n = km(), $e = 4) : $e = n === Pc ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, un = n, Ue === null && (pt = 1, Ws(
      e,
      gn(n, e.current)
    ));
  }
  function Cy() {
    var e = sn.current;
    return e === null ? !0 : (Be & 4194048) === Be ? xn === null : (Be & 62914560) === Be || (Be & 536870912) !== 0 ? e === xn : !1;
  }
  function My() {
    var e = N.H;
    return N.H = pr, e === null ? pr : e;
  }
  function Ay() {
    var e = N.A;
    return N.A = aE, e;
  }
  function fo() {
    pt = 4, Ya || (Be & 4194048) !== Be && sn.current !== null || (Sl = !0), (Ga & 134217727) === 0 && (zi & 134217727) === 0 || et === null || $a(
      et,
      Be,
      cn,
      !1
    );
  }
  function df(e, n, i) {
    var r = Ge;
    Ge |= 2;
    var u = My(), f = Ay();
    (et !== e || Be !== n) && (uo = null, Tl(e, n)), n = !1;
    var g = pt;
    e: do
      try {
        if ($e !== 0 && Ue !== null) {
          var E = Ue, C = un;
          switch ($e) {
            case 8:
              ff(), g = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              sn.current === null && (n = !0);
              var q = $e;
              if ($e = 0, un = null, wl(e, E, C, q), i && Sl) {
                g = 0;
                break e;
              }
              break;
            default:
              q = $e, $e = 0, un = null, wl(e, E, C, q);
          }
        }
        rE(), g = pt;
        break;
      } catch (X) {
        Ry(e, X);
      }
    while (!0);
    return n && e.shellSuspendCounter++, ua = Ti = null, Ge = r, N.H = u, N.A = f, Ue === null && (et = null, Be = 0, Ns()), g;
  }
  function rE() {
    for (; Ue !== null; ) jy(Ue);
  }
  function sE(e, n) {
    var i = Ge;
    Ge |= 2;
    var r = My(), u = Ay();
    et !== e || Be !== n ? (uo = null, oo = Gt() + 500, Tl(e, n)) : Sl = ja(
      e,
      n
    );
    e: do
      try {
        if ($e !== 0 && Ue !== null) {
          n = Ue;
          var f = un;
          t: switch ($e) {
            case 1:
              $e = 0, un = null, wl(e, n, f, 1);
              break;
            case 2:
            case 9:
              if (Hm(f)) {
                $e = 0, un = null, Dy(n);
                break;
              }
              n = function() {
                $e !== 2 && $e !== 9 || et !== e || ($e = 7), Kn(e);
              }, f.then(n, n);
              break e;
            case 3:
              $e = 7;
              break e;
            case 4:
              $e = 5;
              break e;
            case 7:
              Hm(f) ? ($e = 0, un = null, Dy(n)) : ($e = 0, un = null, wl(e, n, f, 7));
              break;
            case 5:
              var g = null;
              switch (Ue.tag) {
                case 26:
                  g = Ue.memoizedState;
                case 5:
                case 27:
                  var E = Ue;
                  if (g ? pg(g) : E.stateNode.complete) {
                    $e = 0, un = null;
                    var C = E.sibling;
                    if (C !== null) Ue = C;
                    else {
                      var q = E.return;
                      q !== null ? (Ue = q, ho(q)) : Ue = null;
                    }
                    break t;
                  }
              }
              $e = 0, un = null, wl(e, n, f, 5);
              break;
            case 6:
              $e = 0, un = null, wl(e, n, f, 6);
              break;
            case 8:
              ff(), pt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        oE();
        break;
      } catch (X) {
        Ry(e, X);
      }
    while (!0);
    return ua = Ti = null, N.H = r, N.A = u, Ge = i, Ue !== null ? 0 : (et = null, Be = 0, Ns(), pt);
  }
  function oE() {
    for (; Ue !== null && !Au(); )
      jy(Ue);
  }
  function jy(e) {
    var n = Wp(e.alternate, e, ba);
    e.memoizedProps = e.pendingProps, n === null ? ho(e) : Ue = n;
  }
  function Dy(e) {
    var n = e, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = $p(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Be
        );
        break;
      case 11:
        n = $p(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Be
        );
        break;
      case 5:
        Cc(n);
      default:
        ty(i, n), n = Ue = Am(n, ba), n = Wp(i, n, ba);
    }
    e.memoizedProps = e.pendingProps, n === null ? ho(e) : Ue = n;
  }
  function wl(e, n, i, r) {
    ua = Ti = null, Cc(n), hl = null, sr = 0;
    var u = n.return;
    try {
      if (I1(
        e,
        u,
        n,
        i,
        Be
      )) {
        pt = 1, Ws(
          e,
          gn(i, e.current)
        ), Ue = null;
        return;
      }
    } catch (f) {
      if (u !== null) throw Ue = u, f;
      pt = 1, Ws(
        e,
        gn(i, e.current)
      ), Ue = null;
      return;
    }
    n.flags & 32768 ? (qe || r === 1 ? e = !0 : Sl || (Be & 536870912) !== 0 ? e = !1 : (Ya = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = sn.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Ny(n, e)) : ho(n);
  }
  function ho(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        Ny(
          n,
          Ya
        );
        return;
      }
      e = n.return;
      var i = W1(
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
  function Ny(e, n) {
    do {
      var i = eE(e.alternate, e);
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
  function zy(e, n, i, r, u, f, g, E, C) {
    e.cancelPendingCommit = null;
    do
      mo();
    while (At !== 0);
    if ((Ge & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === e.current) throw Error(s(177));
      if (f = n.lanes | n.childLanes, f |= Wu, vs(
        e,
        i,
        f,
        g,
        E,
        C
      ), e === et && (Ue = et = null, Be = 0), El = n, Xa = e, Sa = i, of = f, uf = u, xy = r, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, dE(Aa, function() {
        return Vy(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || r) {
        r = N.T, N.T = null, u = J.p, J.p = 2, g = Ge, Ge |= 4;
        try {
          tE(e, n, i);
        } finally {
          Ge = g, J.p = u, N.T = r;
        }
      }
      At = 1, _y(), Oy(), Ly();
    }
  }
  function _y() {
    if (At === 1) {
      At = 0;
      var e = Xa, n = El, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = N.T, N.T = null;
        var r = J.p;
        J.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          hy(n, e);
          var f = wf, g = bm(e.containerInfo), E = f.focusedElem, C = f.selectionRange;
          if (g !== E && E && E.ownerDocument && vm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (C !== null && Ku(E)) {
              var q = C.start, X = C.end;
              if (X === void 0 && (X = q), "selectionStart" in E)
                E.selectionStart = q, E.selectionEnd = Math.min(
                  X,
                  E.value.length
                );
              else {
                var ee = E.ownerDocument || document, P = ee && ee.defaultView || window;
                if (P.getSelection) {
                  var Y = P.getSelection(), me = E.textContent.length, Ce = Math.min(C.start, me), Je = C.end === void 0 ? Ce : Math.min(C.end, me);
                  !Y.extend && Ce > Je && (g = Je, Je = Ce, Ce = g);
                  var U = gm(
                    E,
                    Ce
                  ), z = gm(
                    E,
                    Je
                  );
                  if (U && z && (Y.rangeCount !== 1 || Y.anchorNode !== U.node || Y.anchorOffset !== U.offset || Y.focusNode !== z.node || Y.focusOffset !== z.offset)) {
                    var H = ee.createRange();
                    H.setStart(U.node, U.offset), Y.removeAllRanges(), Ce > Je ? (Y.addRange(H), Y.extend(z.node, z.offset)) : (H.setEnd(z.node, z.offset), Y.addRange(H));
                  }
                }
              }
            }
            for (ee = [], Y = E; Y = Y.parentNode; )
              Y.nodeType === 1 && ee.push({
                element: Y,
                left: Y.scrollLeft,
                top: Y.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < ee.length; E++) {
              var Z = ee[E];
              Z.element.scrollLeft = Z.left, Z.element.scrollTop = Z.top;
            }
          }
          Co = !!Tf, wf = Tf = null;
        } finally {
          Ge = u, J.p = r, N.T = i;
        }
      }
      e.current = n, At = 2;
    }
  }
  function Oy() {
    if (At === 2) {
      At = 0;
      var e = Xa, n = El, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = N.T, N.T = null;
        var r = J.p;
        J.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          oy(e, n.alternate, n);
        } finally {
          Ge = u, J.p = r, N.T = i;
        }
      }
      At = 3;
    }
  }
  function Ly() {
    if (At === 4 || At === 3) {
      At = 0, ju();
      var e = Xa, n = El, i = Sa, r = xy;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? At = 5 : (At = 0, El = Xa = null, Uy(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (Fa = null), k(i), n = n.stateNode, Ft && typeof Ft.onCommitFiberRoot == "function")
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
          for (var f = e.onRecoverableError, g = 0; g < r.length; g++) {
            var E = r[g];
            f(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          N.T = n, J.p = u;
        }
      }
      (Sa & 3) !== 0 && mo(), Kn(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === cf ? wr++ : (wr = 0, cf = e) : wr = 0, Rr(0);
    }
  }
  function Uy(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, lr(n)));
  }
  function mo() {
    return _y(), Oy(), Ly(), Vy();
  }
  function Vy() {
    if (At !== 5) return !1;
    var e = Xa, n = of;
    of = 0;
    var i = k(Sa), r = N.T, u = J.p;
    try {
      J.p = 32 > i ? 32 : i, N.T = null, i = uf, uf = null;
      var f = Xa, g = Sa;
      if (At = 0, El = Xa = null, Sa = 0, (Ge & 6) !== 0) throw Error(s(331));
      var E = Ge;
      if (Ge |= 4, vy(f.current), py(
        f,
        f.current,
        g,
        i
      ), Ge = E, Rr(0, !1), Ft && typeof Ft.onPostCommitFiberRoot == "function")
        try {
          Ft.onPostCommitFiberRoot(aa, f);
        } catch {
        }
      return !0;
    } finally {
      J.p = u, N.T = r, Uy(e, n);
    }
  }
  function By(e, n, i) {
    n = gn(i, n), n = kc(e.stateNode, n, 2), e = Ha(e, n, 2), e !== null && (Pn(e, 2), Kn(e));
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
          if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Fa === null || !Fa.has(r))) {
            e = gn(i, e), i = Hp(2), r = Ha(n, i, 2), r !== null && (qp(
              i,
              r,
              n,
              e
            ), Pn(r, 2), Kn(r));
            break;
          }
        }
        n = n.return;
      }
  }
  function hf(e, n, i) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new iE();
      var u = /* @__PURE__ */ new Set();
      r.set(n, u);
    } else
      u = r.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), r.set(n, u));
    u.has(i) || (lf = !0, u.add(i), e = uE.bind(null, e, n, i), n.then(e, e));
  }
  function uE(e, n, i) {
    var r = e.pingCache;
    r !== null && r.delete(n), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, et === e && (Be & i) === i && (pt === 4 || pt === 3 && (Be & 62914560) === Be && 300 > Gt() - so ? (Ge & 2) === 0 && Tl(e, 0) : rf |= i, xl === Be && (xl = 0)), Kn(e);
  }
  function Hy(e, n) {
    n === 0 && (n = $l()), e = Si(e, n), e !== null && (Pn(e, n), Kn(e));
  }
  function cE(e) {
    var n = e.memoizedState, i = 0;
    n !== null && (i = n.retryLane), Hy(e, i);
  }
  function fE(e, n) {
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
  function dE(e, n) {
    return ut(e, n);
  }
  var po = null, Rl = null, mf = !1, yo = !1, pf = !1, Ka = 0;
  function Kn(e) {
    e !== Rl && e.next === null && (Rl === null ? po = Rl = e : Rl = Rl.next = e), yo = !0, mf || (mf = !0, mE());
  }
  function Rr(e, n) {
    if (!pf && yo) {
      pf = !0;
      do
        for (var i = !1, r = po; r !== null; ) {
          if (e !== 0) {
            var u = r.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var g = r.suspendedLanes, E = r.pingedLanes;
              f = (1 << 31 - qt(42 | e) + 1) - 1, f &= u & ~(g & ~E), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (i = !0, Yy(r, f));
          } else
            f = Be, f = $i(
              r,
              r === et ? f : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (f & 3) === 0 || ja(r, f) || (i = !0, Yy(r, f));
          r = r.next;
        }
      while (i);
      pf = !1;
    }
  }
  function hE() {
    qy();
  }
  function qy() {
    yo = mf = !1;
    var e = 0;
    Ka !== 0 && wE() && (e = Ka);
    for (var n = Gt(), i = null, r = po; r !== null; ) {
      var u = r.next, f = ky(r, n);
      f === 0 ? (r.next = null, i === null ? po = u : i.next = u, u === null && (Rl = i)) : (i = r, (e !== 0 || (f & 3) !== 0) && (yo = !0)), r = u;
    }
    At !== 0 && At !== 5 || Rr(e), Ka !== 0 && (Ka = 0);
  }
  function ky(e, n) {
    for (var i = e.suspendedLanes, r = e.pingedLanes, u = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var g = 31 - qt(f), E = 1 << g, C = u[g];
      C === -1 ? ((E & i) === 0 || (E & r) !== 0) && (u[g] = zu(E, n)) : C <= n && (e.expiredLanes |= E), f &= ~E;
    }
    if (n = et, i = Be, i = $i(
      e,
      e === n ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, i === 0 || e === n && ($e === 2 || $e === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && ta(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || ja(e, i)) {
      if (n = i & -i, n === e.callbackPriority) return n;
      switch (r !== null && ta(r), k(i)) {
        case 2:
        case 8:
          i = Xl;
          break;
        case 32:
          i = Aa;
          break;
        case 268435456:
          i = mn;
          break;
        default:
          i = Aa;
      }
      return r = Py.bind(null, e), i = ut(i, r), e.callbackPriority = n, e.callbackNode = i, n;
    }
    return r !== null && r !== null && ta(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Py(e, n) {
    if (At !== 0 && At !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (mo() && e.callbackNode !== i)
      return null;
    var r = Be;
    return r = $i(
      e,
      e === et ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (Ty(e, r, n), ky(e, Gt()), e.callbackNode != null && e.callbackNode === i ? Py.bind(null, e) : null);
  }
  function Yy(e, n) {
    if (mo()) return null;
    Ty(e, n, !0);
  }
  function mE() {
    CE(function() {
      (Ge & 6) !== 0 ? ut(
        Ma,
        hE
      ) : qy();
    });
  }
  function yf() {
    if (Ka === 0) {
      var e = cl;
      e === 0 && (e = hi, hi <<= 1, (hi & 261888) === 0 && (hi = 256)), Ka = e;
    }
    return Ka;
  }
  function Gy(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ts("" + e);
  }
  function Fy(e, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, e.id && i.setAttribute("form", e.id), n.parentNode.insertBefore(i, n), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function pE(e, n, i, r, u) {
    if (n === "submit" && i && i.stateNode === u) {
      var f = Gy(
        (u[de] || null).action
      ), g = r.submitter;
      g && (n = (n = g[de] || null) ? Gy(n.formAction) : g.getAttribute("formAction"), n !== null && (f = n, g = null));
      var E = new Ms(
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
                  var C = g ? Fy(u, g) : new FormData(u);
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
                typeof f == "function" && (E.preventDefault(), C = g ? Fy(u, g) : new FormData(u), Lc(
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
    var vf = Ju[gf], yE = vf.toLowerCase(), gE = vf[0].toUpperCase() + vf.slice(1);
    On(
      yE,
      "on" + gE
    );
  }
  On(Em, "onAnimationEnd"), On(Tm, "onAnimationIteration"), On(wm, "onAnimationStart"), On("dblclick", "onDoubleClick"), On("focusin", "onFocus"), On("focusout", "onBlur"), On(_1, "onTransitionRun"), On(O1, "onTransitionStart"), On(L1, "onTransitionCancel"), On(Rm, "onTransitionEnd"), Yn("onMouseEnter", ["mouseout", "mouseover"]), Yn("onMouseLeave", ["mouseout", "mouseover"]), Yn("onPointerEnter", ["pointerout", "pointerover"]), Yn("onPointerLeave", ["pointerout", "pointerover"]), Nt(
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
  var Cr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), vE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Cr)
  );
  function Xy(e, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var r = e[i], u = r.event;
      r = r.listeners;
      e: {
        var f = void 0;
        if (n)
          for (var g = r.length - 1; 0 <= g; g--) {
            var E = r[g], C = E.instance, q = E.currentTarget;
            if (E = E.listener, C !== f && u.isPropagationStopped())
              break e;
            f = E, u.currentTarget = q;
            try {
              f(u);
            } catch (X) {
              Ds(X);
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
            } catch (X) {
              Ds(X);
            }
            u.currentTarget = null, f = C;
          }
      }
    }
  }
  function Ve(e, n) {
    var i = n[he];
    i === void 0 && (i = n[he] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    i.has(r) || ($y(n, e, 2, !1), i.add(r));
  }
  function bf(e, n, i) {
    var r = 0;
    n && (r |= 4), $y(
      i,
      e,
      r,
      n
    );
  }
  var go = "_reactListening" + Math.random().toString(36).slice(2);
  function Sf(e) {
    if (!e[go]) {
      e[go] = !0, Na.forEach(function(i) {
        i !== "selectionchange" && (vE.has(i) || bf(i, !1, e), bf(i, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[go] || (n[go] = !0, bf("selectionchange", !1, n));
    }
  }
  function $y(e, n, i, r) {
    switch (Eg(n)) {
      case 2:
        var u = XE;
        break;
      case 8:
        u = $E;
        break;
      default:
        u = Lf;
    }
    i = u.bind(
      null,
      n,
      i,
      e
    ), u = void 0, !Hu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), r ? u !== void 0 ? e.addEventListener(n, i, {
      capture: !0,
      passive: u
    }) : e.addEventListener(n, i, !0) : u !== void 0 ? e.addEventListener(n, i, {
      passive: u
    }) : e.addEventListener(n, i, !1);
  }
  function xf(e, n, i, r, u) {
    var f = r;
    if ((n & 1) === 0 && (n & 2) === 0 && r !== null)
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
    Jh(function() {
      var q = f, X = Vu(i), ee = [];
      e: {
        var P = Cm.get(e);
        if (P !== void 0) {
          var Y = Ms, me = e;
          switch (e) {
            case "keypress":
              if (Rs(i) === 0) break e;
            case "keydown":
            case "keyup":
              Y = f1;
              break;
            case "focusin":
              me = "focus", Y = Yu;
              break;
            case "focusout":
              me = "blur", Y = Yu;
              break;
            case "beforeblur":
            case "afterblur":
              Y = Yu;
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
              Y = tm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Y = Wx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Y = m1;
              break;
            case Em:
            case Tm:
            case wm:
              Y = n1;
              break;
            case Rm:
              Y = y1;
              break;
            case "scroll":
            case "scrollend":
              Y = Zx;
              break;
            case "wheel":
              Y = v1;
              break;
            case "copy":
            case "cut":
            case "paste":
              Y = i1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Y = am;
              break;
            case "toggle":
            case "beforetoggle":
              Y = S1;
          }
          var Ce = (n & 4) !== 0, Je = !Ce && (e === "scroll" || e === "scrollend"), U = Ce ? P !== null ? P + "Capture" : null : P;
          Ce = [];
          for (var z = q, H; z !== null; ) {
            var Z = z;
            if (H = Z.stateNode, Z = Z.tag, Z !== 5 && Z !== 26 && Z !== 27 || H === null || U === null || (Z = Kl(z, U), Z != null && Ce.push(
              Mr(z, Z, H)
            )), Je) break;
            z = z.return;
          }
          0 < Ce.length && (P = new Y(
            P,
            me,
            null,
            i,
            X
          ), ee.push({ event: P, listeners: Ce }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (P = e === "mouseover" || e === "pointerover", Y = e === "mouseout" || e === "pointerout", P && i !== Uu && (me = i.relatedTarget || i.fromElement) && (Qe(me) || me[ge]))
            break e;
          if ((Y || P) && (P = X.window === X ? X : (P = X.ownerDocument) ? P.defaultView || P.parentWindow : window, Y ? (me = i.relatedTarget || i.toElement, Y = q, me = me ? Qe(me) : null, me !== null && (Je = c(me), Ce = me.tag, me !== Je || Ce !== 5 && Ce !== 27 && Ce !== 6) && (me = null)) : (Y = null, me = q), Y !== me)) {
            if (Ce = tm, Z = "onMouseLeave", U = "onMouseEnter", z = "mouse", (e === "pointerout" || e === "pointerover") && (Ce = am, Z = "onPointerLeave", U = "onPointerEnter", z = "pointer"), Je = Y == null ? P : Le(Y), H = me == null ? P : Le(me), P = new Ce(
              Z,
              z + "leave",
              Y,
              i,
              X
            ), P.target = Je, P.relatedTarget = H, Z = null, Qe(X) === q && (Ce = new Ce(
              U,
              z + "enter",
              me,
              i,
              X
            ), Ce.target = H, Ce.relatedTarget = Je, Z = Ce), Je = Z, Y && me)
              t: {
                for (Ce = bE, U = Y, z = me, H = 0, Z = U; Z; Z = Ce(Z))
                  H++;
                Z = 0;
                for (var Ee = z; Ee; Ee = Ce(Ee))
                  Z++;
                for (; 0 < H - Z; )
                  U = Ce(U), H--;
                for (; 0 < Z - H; )
                  z = Ce(z), Z--;
                for (; H--; ) {
                  if (U === z || z !== null && U === z.alternate) {
                    Ce = U;
                    break t;
                  }
                  U = Ce(U), z = Ce(z);
                }
                Ce = null;
              }
            else Ce = null;
            Y !== null && Ky(
              ee,
              P,
              Y,
              Ce,
              !1
            ), me !== null && Je !== null && Ky(
              ee,
              Je,
              me,
              Ce,
              !0
            );
          }
        }
        e: {
          if (P = q ? Le(q) : window, Y = P.nodeName && P.nodeName.toLowerCase(), Y === "select" || Y === "input" && P.type === "file")
            var Pe = fm;
          else if (um(P))
            if (dm)
              Pe = D1;
            else {
              Pe = A1;
              var ve = M1;
            }
          else
            Y = P.nodeName, !Y || Y.toLowerCase() !== "input" || P.type !== "checkbox" && P.type !== "radio" ? q && Lu(q.elementType) && (Pe = fm) : Pe = j1;
          if (Pe && (Pe = Pe(e, q))) {
            cm(
              ee,
              Pe,
              i,
              X
            );
            break e;
          }
          ve && ve(e, P, q), e === "focusout" && q && P.type === "number" && q.memoizedProps.value != null && Ou(P, "number", P.value);
        }
        switch (ve = q ? Le(q) : window, e) {
          case "focusin":
            (um(ve) || ve.contentEditable === "true") && (nl = ve, Qu = q, nr = null);
            break;
          case "focusout":
            nr = Qu = nl = null;
            break;
          case "mousedown":
            Iu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Iu = !1, Sm(ee, i, X);
            break;
          case "selectionchange":
            if (z1) break;
          case "keydown":
          case "keyup":
            Sm(ee, i, X);
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
          tl ? sm(e, i) && (He = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (He = "onCompositionStart");
        He && (im && i.locale !== "ko" && (tl || He !== "onCompositionStart" ? He === "onCompositionEnd" && tl && (je = Wh()) : (za = X, qu = "value" in za ? za.value : za.textContent, tl = !0)), ve = vo(q, He), 0 < ve.length && (He = new nm(
          He,
          e,
          null,
          i,
          X
        ), ee.push({ event: He, listeners: ve }), je ? He.data = je : (je = om(i), je !== null && (He.data = je)))), (je = E1 ? T1(e, i) : w1(e, i)) && (He = vo(q, "onBeforeInput"), 0 < He.length && (ve = new nm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          X
        ), ee.push({
          event: ve,
          listeners: He
        }), ve.data = je)), pE(
          ee,
          e,
          q,
          i,
          X
        );
      }
      Xy(ee, n);
    });
  }
  function Mr(e, n, i) {
    return {
      instance: e,
      listener: n,
      currentTarget: i
    };
  }
  function vo(e, n) {
    for (var i = n + "Capture", r = []; e !== null; ) {
      var u = e, f = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || f === null || (u = Kl(e, i), u != null && r.unshift(
        Mr(e, u, f)
      ), u = Kl(e, n), u != null && r.push(
        Mr(e, u, f)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function bE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Ky(e, n, i, r, u) {
    for (var f = n._reactName, g = []; i !== null && i !== r; ) {
      var E = i, C = E.alternate, q = E.stateNode;
      if (E = E.tag, C !== null && C === r) break;
      E !== 5 && E !== 26 && E !== 27 || q === null || (C = q, u ? (q = Kl(i, f), q != null && g.unshift(
        Mr(i, q, C)
      )) : u || (q = Kl(i, f), q != null && g.push(
        Mr(i, q, C)
      ))), i = i.return;
    }
    g.length !== 0 && e.push({ event: n, listeners: g });
  }
  var SE = /\r\n?/g, xE = /\u0000|\uFFFD/g;
  function Qy(e) {
    return (typeof e == "string" ? e : "" + e).replace(SE, `
`).replace(xE, "");
  }
  function Iy(e, n) {
    return n = Qy(n), Qy(e) === n;
  }
  function Ze(e, n, i, r, u, f) {
    switch (i) {
      case "children":
        typeof r == "string" ? n === "body" || n === "textarea" && r === "" || Ji(e, r) : (typeof r == "number" || typeof r == "bigint") && n !== "body" && Ji(e, "" + r);
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
        Ih(e, r, f);
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
        r = Ts("" + r), e.setAttribute(i, r);
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
          typeof f == "function" && (i === "formAction" ? (n !== "input" && Ze(e, n, "name", u.name, u, null), Ze(
            e,
            n,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Ze(
            e,
            n,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Ze(
            e,
            n,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Ze(e, n, "encType", u.encType, u, null), Ze(e, n, "method", u.method, u, null), Ze(e, n, "target", u.target, u, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(i);
          break;
        }
        r = Ts("" + r), e.setAttribute(i, r);
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
        i = Ts("" + r), e.setAttributeNS(
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
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Qx.get(i) || i, ze(e, i, r));
    }
  }
  function Ef(e, n, i, r, u, f) {
    switch (i) {
      case "style":
        Ih(e, r, f);
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
        typeof r == "string" ? Ji(e, r) : (typeof r == "number" || typeof r == "bigint") && Ji(e, "" + r);
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
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), n = i.slice(2, u ? i.length - 7 : void 0), f = e[de] || null, f = f != null ? f[i] : null, typeof f == "function" && e.removeEventListener(n, f, u), typeof r == "function")) {
              typeof f != "function" && f !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(n, r, u);
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
                  throw Error(s(137, n));
                default:
                  Ze(e, n, f, g, i, null);
              }
          }
        u && Ze(e, n, "srcSet", i.srcSet, i, null), r && Ze(e, n, "src", i.src, i, null);
        return;
      case "input":
        Ve("invalid", e);
        var E = f = g = u = null, C = null, q = null;
        for (r in i)
          if (i.hasOwnProperty(r)) {
            var X = i[r];
            if (X != null)
              switch (r) {
                case "name":
                  u = X;
                  break;
                case "type":
                  g = X;
                  break;
                case "checked":
                  C = X;
                  break;
                case "defaultChecked":
                  q = X;
                  break;
                case "value":
                  f = X;
                  break;
                case "defaultValue":
                  E = X;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (X != null)
                    throw Error(s(137, n));
                  break;
                default:
                  Ze(e, n, r, X, i, null);
              }
          }
        Xh(
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
                Ze(e, n, u, E, i, null);
            }
        n = f, i = g, e.multiple = !!r, n != null ? Zi(e, !!r, n, !1) : i != null && Zi(e, !!r, i, !0);
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
                Ze(e, n, g, E, i, null);
            }
        Kh(e, r, u, f);
        return;
      case "option":
        for (C in i)
          if (i.hasOwnProperty(C) && (r = i[C], r != null))
            switch (C) {
              case "selected":
                e.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                Ze(e, n, C, r, i, null);
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
        for (r = 0; r < Cr.length; r++)
          Ve(Cr[r], e);
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
                throw Error(s(137, n));
              default:
                Ze(e, n, q, r, i, null);
            }
        return;
      default:
        if (Lu(n)) {
          for (X in i)
            i.hasOwnProperty(X) && (r = i[X], r !== void 0 && Ef(
              e,
              n,
              X,
              r,
              i,
              void 0
            ));
          return;
        }
    }
    for (E in i)
      i.hasOwnProperty(E) && (r = i[E], r != null && Ze(e, n, E, r, i, null));
  }
  function EE(e, n, i, r) {
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
        var u = null, f = null, g = null, E = null, C = null, q = null, X = null;
        for (Y in i) {
          var ee = i[Y];
          if (i.hasOwnProperty(Y) && ee != null)
            switch (Y) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                C = ee;
              default:
                r.hasOwnProperty(Y) || Ze(e, n, Y, null, r, ee);
            }
        }
        for (var P in r) {
          var Y = r[P];
          if (ee = i[P], r.hasOwnProperty(P) && (Y != null || ee != null))
            switch (P) {
              case "type":
                f = Y;
                break;
              case "name":
                u = Y;
                break;
              case "checked":
                q = Y;
                break;
              case "defaultChecked":
                X = Y;
                break;
              case "value":
                g = Y;
                break;
              case "defaultValue":
                E = Y;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null)
                  throw Error(s(137, n));
                break;
              default:
                Y !== ee && Ze(
                  e,
                  n,
                  P,
                  Y,
                  r,
                  ee
                );
            }
        }
        _u(
          e,
          g,
          E,
          C,
          q,
          X,
          f,
          u
        );
        return;
      case "select":
        Y = g = E = P = null;
        for (f in i)
          if (C = i[f], i.hasOwnProperty(f) && C != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                Y = C;
              default:
                r.hasOwnProperty(f) || Ze(
                  e,
                  n,
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
                P = f;
                break;
              case "defaultValue":
                E = f;
                break;
              case "multiple":
                g = f;
              default:
                f !== C && Ze(
                  e,
                  n,
                  u,
                  f,
                  r,
                  C
                );
            }
        n = E, i = g, r = Y, P != null ? Zi(e, !!i, P, !1) : !!r != !!i && (n != null ? Zi(e, !!i, n, !0) : Zi(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        Y = P = null;
        for (E in i)
          if (u = i[E], i.hasOwnProperty(E) && u != null && !r.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ze(e, n, E, null, r, u);
            }
        for (g in r)
          if (u = r[g], f = i[g], r.hasOwnProperty(g) && (u != null || f != null))
            switch (g) {
              case "value":
                P = u;
                break;
              case "defaultValue":
                Y = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== f && Ze(e, n, g, u, r, f);
            }
        $h(e, P, Y);
        return;
      case "option":
        for (var me in i)
          if (P = i[me], i.hasOwnProperty(me) && P != null && !r.hasOwnProperty(me))
            switch (me) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ze(
                  e,
                  n,
                  me,
                  null,
                  r,
                  P
                );
            }
        for (C in r)
          if (P = r[C], Y = i[C], r.hasOwnProperty(C) && P !== Y && (P != null || Y != null))
            switch (C) {
              case "selected":
                e.selected = P && typeof P != "function" && typeof P != "symbol";
                break;
              default:
                Ze(
                  e,
                  n,
                  C,
                  P,
                  r,
                  Y
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
          P = i[Ce], i.hasOwnProperty(Ce) && P != null && !r.hasOwnProperty(Ce) && Ze(e, n, Ce, null, r, P);
        for (q in r)
          if (P = r[q], Y = i[q], r.hasOwnProperty(q) && P !== Y && (P != null || Y != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null)
                  throw Error(s(137, n));
                break;
              default:
                Ze(
                  e,
                  n,
                  q,
                  P,
                  r,
                  Y
                );
            }
        return;
      default:
        if (Lu(n)) {
          for (var Je in i)
            P = i[Je], i.hasOwnProperty(Je) && P !== void 0 && !r.hasOwnProperty(Je) && Ef(
              e,
              n,
              Je,
              void 0,
              r,
              P
            );
          for (X in r)
            P = r[X], Y = i[X], !r.hasOwnProperty(X) || P === Y || P === void 0 && Y === void 0 || Ef(
              e,
              n,
              X,
              P,
              r,
              Y
            );
          return;
        }
    }
    for (var U in i)
      P = i[U], i.hasOwnProperty(U) && P != null && !r.hasOwnProperty(U) && Ze(e, n, U, null, r, P);
    for (ee in r)
      P = r[ee], Y = i[ee], !r.hasOwnProperty(ee) || P === Y || P == null && Y == null || Ze(e, n, ee, P, r, Y);
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
  function TE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, i = performance.getEntriesByType("resource"), r = 0; r < i.length; r++) {
        var u = i[r], f = u.transferSize, g = u.initiatorType, E = u.duration;
        if (f && E && Zy(g)) {
          for (g = 0, E = u.responseEnd, r += 1; r < i.length; r++) {
            var C = i[r], q = C.startTime;
            if (q > E) break;
            var X = C.transferSize, ee = C.initiatorType;
            X && Zy(ee) && (C = C.responseEnd, g += X * (C < E ? 1 : (E - q) / (C - q)));
          }
          if (--r, n += 8 * (f + g) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Tf = null, wf = null;
  function bo(e) {
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
  function Rf(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Cf = null;
  function wE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Cf ? !1 : (Cf = e, !0) : (Cf = null, !1);
  }
  var eg = typeof setTimeout == "function" ? setTimeout : void 0, RE = typeof clearTimeout == "function" ? clearTimeout : void 0, tg = typeof Promise == "function" ? Promise : void 0, CE = typeof queueMicrotask == "function" ? queueMicrotask : typeof tg < "u" ? function(e) {
    return tg.resolve(null).then(e).catch(ME);
  } : eg;
  function ME(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Qa(e) {
    return e === "head";
  }
  function ng(e, n) {
    var i = n, r = 0;
    do {
      var u = i.nextSibling;
      if (e.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (r === 0) {
            e.removeChild(u), jl(n);
            return;
          }
          r--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          r++;
        else if (i === "html")
          Ar(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, Ar(i);
          for (var f = i.firstChild; f; ) {
            var g = f.nextSibling, E = f.nodeName;
            f[Ne] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && f.rel.toLowerCase() === "stylesheet" || i.removeChild(f), f = g;
          }
        } else
          i === "body" && Ar(e.ownerDocument.body);
      i = u;
    } while (i);
    jl(n);
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
  function Mf(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
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
  function AE(e, n, i, r) {
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
      } else if (n === "input" && e.type === "hidden") {
        var f = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = En(e.nextSibling), e === null) break;
    }
    return null;
  }
  function jE(e, n, i) {
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
  function Af(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function jf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function DE(e, n) {
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
  var Df = null;
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
    switch (n = bo(i), e) {
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
  function Ar(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    We(e);
  }
  var Tn = /* @__PURE__ */ new Map(), og = /* @__PURE__ */ new Set();
  function So(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var xa = J.d;
  J.d = {
    f: NE,
    r: zE,
    D: _E,
    C: OE,
    L: LE,
    m: UE,
    X: BE,
    S: VE,
    M: HE
  };
  function NE() {
    var e = xa.f(), n = co();
    return e || n;
  }
  function zE(e) {
    var n = ct(e);
    n !== null && n.tag === 5 && n.type === "form" ? Rp(n) : xa.r(e);
  }
  var Cl = typeof document > "u" ? null : document;
  function ug(e, n, i) {
    var r = Cl;
    if (r && typeof n == "string" && n) {
      var u = pn(n);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), og.has(u) || (og.add(u), e = { rel: e, crossOrigin: i, href: n }, r.querySelector(u) === null && (n = r.createElement("link"), Ut(n, "link", e), nt(n), r.head.appendChild(n)));
    }
  }
  function _E(e) {
    xa.D(e), ug("dns-prefetch", e, null);
  }
  function OE(e, n) {
    xa.C(e, n), ug("preconnect", e, n);
  }
  function LE(e, n, i) {
    xa.L(e, n, i);
    var r = Cl;
    if (r && e && n) {
      var u = 'link[rel="preload"][as="' + pn(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + pn(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + pn(
        i.imageSizes
      ) + '"]')) : u += '[href="' + pn(e) + '"]';
      var f = u;
      switch (n) {
        case "style":
          f = Ml(e);
          break;
        case "script":
          f = Al(e);
      }
      Tn.has(f) || (e = b(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : e,
          as: n
        },
        i
      ), Tn.set(f, e), r.querySelector(u) !== null || n === "style" && r.querySelector(jr(f)) || n === "script" && r.querySelector(Dr(f)) || (n = r.createElement("link"), Ut(n, "link", e), nt(n), r.head.appendChild(n)));
    }
  }
  function UE(e, n) {
    xa.m(e, n);
    var i = Cl;
    if (i && e) {
      var r = n && typeof n.as == "string" ? n.as : "script", u = 'link[rel="modulepreload"][as="' + pn(r) + '"][href="' + pn(e) + '"]', f = u;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = Al(e);
      }
      if (!Tn.has(f) && (e = b({ rel: "modulepreload", href: e }, n), Tn.set(f, e), i.querySelector(u) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Dr(f)))
              return;
        }
        r = i.createElement("link"), Ut(r, "link", e), nt(r), i.head.appendChild(r);
      }
    }
  }
  function VE(e, n, i) {
    xa.S(e, n, i);
    var r = Cl;
    if (r && e) {
      var u = xt(r).hoistableStyles, f = Ml(e);
      n = n || "default";
      var g = u.get(f);
      if (!g) {
        var E = { loading: 0, preload: null };
        if (g = r.querySelector(
          jr(f)
        ))
          E.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": n },
            i
          ), (i = Tn.get(f)) && Nf(e, i);
          var C = g = r.createElement("link");
          nt(C), Ut(C, "link", e), C._p = new Promise(function(q, X) {
            C.onload = q, C.onerror = X;
          }), C.addEventListener("load", function() {
            E.loading |= 1;
          }), C.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, xo(g, n, r);
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
  function BE(e, n) {
    xa.X(e, n);
    var i = Cl;
    if (i && e) {
      var r = xt(i).hoistableScripts, u = Al(e), f = r.get(u);
      f || (f = i.querySelector(Dr(u)), f || (e = b({ src: e, async: !0 }, n), (n = Tn.get(u)) && zf(e, n), f = i.createElement("script"), nt(f), Ut(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, r.set(u, f));
    }
  }
  function HE(e, n) {
    xa.M(e, n);
    var i = Cl;
    if (i && e) {
      var r = xt(i).hoistableScripts, u = Al(e), f = r.get(u);
      f || (f = i.querySelector(Dr(u)), f || (e = b({ src: e, async: !0, type: "module" }, n), (n = Tn.get(u)) && zf(e, n), f = i.createElement("script"), nt(f), Ut(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, r.set(u, f));
    }
  }
  function cg(e, n, i, r) {
    var u = (u = we.current) ? So(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = Ml(i.href), i = xt(
          u
        ).hoistableStyles, r = i.get(n), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = Ml(i.href);
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
          )) && !f._p && (g.instance = f, g.state.loading = 5), Tn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, Tn.set(e, i), f || qE(
            u,
            e,
            i,
            g.state
          ))), n && r === null)
            throw Error(s(528, ""));
          return g;
        }
        if (n && r !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Al(i), i = xt(
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
  function Ml(e) {
    return 'href="' + pn(e) + '"';
  }
  function jr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function fg(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function qE(e, n, i, r) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? r.loading = 1 : (n = e.createElement("link"), r.preload = n, n.addEventListener("load", function() {
      return r.loading |= 1;
    }), n.addEventListener("error", function() {
      return r.loading |= 2;
    }), Ut(n, "link", i), nt(n), e.head.appendChild(n));
  }
  function Al(e) {
    return '[src="' + pn(e) + '"]';
  }
  function Dr(e) {
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
            return n.instance = r, nt(r), r;
          var u = b({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), nt(r), Ut(r, "style", u), xo(r, i.precedence, e), n.instance = r;
        case "stylesheet":
          u = Ml(i.href);
          var f = e.querySelector(
            jr(u)
          );
          if (f)
            return n.state.loading |= 4, n.instance = f, nt(f), f;
          r = fg(i), (u = Tn.get(u)) && Nf(r, u), f = (e.ownerDocument || e).createElement("link"), nt(f);
          var g = f;
          return g._p = new Promise(function(E, C) {
            g.onload = E, g.onerror = C;
          }), Ut(f, "link", r), n.state.loading |= 4, xo(f, i.precedence, e), n.instance = f;
        case "script":
          return f = Al(i.src), (u = e.querySelector(
            Dr(f)
          )) ? (n.instance = u, nt(u), u) : (r = i, (u = Tn.get(f)) && (r = b({}, i), zf(r, u)), e = e.ownerDocument || e, u = e.createElement("script"), nt(u), Ut(u, "link", r), e.head.appendChild(u), n.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (r = n.instance, n.state.loading |= 4, xo(r, i.precedence, e));
    return n.instance;
  }
  function xo(e, n, i) {
    for (var r = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = r.length ? r[r.length - 1] : null, f = u, g = 0; g < r.length; g++) {
      var E = r[g];
      if (E.dataset.precedence === n) f = E;
      else if (f !== u) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(e, n.firstChild));
  }
  function Nf(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function zf(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Eo = null;
  function hg(e, n, i) {
    if (Eo === null) {
      var r = /* @__PURE__ */ new Map(), u = Eo = /* @__PURE__ */ new Map();
      u.set(i, r);
    } else
      u = Eo, r = u.get(i), r || (r = /* @__PURE__ */ new Map(), u.set(i, r));
    if (r.has(e)) return r;
    for (r.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var f = i[u];
      if (!(f[Ne] || f[fe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var g = f.getAttribute(n) || "";
        g = e + g;
        var E = r.get(g);
        E ? E.push(f) : r.set(g, [f]);
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
  function kE(e, n, i) {
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
  function PE(e, n, i, r) {
    if (i.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Ml(r.href), f = n.querySelector(
          jr(u)
        );
        if (f) {
          n = f._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = To.bind(e), n.then(e, e)), i.state.loading |= 4, i.instance = f, nt(f);
          return;
        }
        f = n.ownerDocument || n, r = fg(r), (u = Tn.get(u)) && Nf(r, u), f = f.createElement("link"), nt(f);
        var g = f;
        g._p = new Promise(function(E, C) {
          g.onload = E, g.onerror = C;
        }), Ut(f, "link", r), i.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = To.bind(e), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var _f = 0;
  function YE(e, n) {
    return e.stylesheets && e.count === 0 && Ro(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var r = setTimeout(function() {
        if (e.stylesheets && Ro(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + n);
      0 < e.imgBytes && _f === 0 && (_f = 62500 * TE());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ro(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > _f ? 50 : 800) + n
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(u);
      };
    } : null;
  }
  function To() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ro(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var wo = null;
  function Ro(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, wo = /* @__PURE__ */ new Map(), n.forEach(GE, e), wo = null, To.call(e));
  }
  function GE(e, n) {
    if (!(n.state.loading & 4)) {
      var i = wo.get(e);
      if (i) var r = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), wo.set(e, i);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < u.length; f++) {
          var g = u[f];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") && (i.set(g.dataset.precedence, g), r = g);
        }
        r && i.set(null, r);
      }
      u = n.instance, g = u.getAttribute("data-precedence"), f = i.get(g) || r, f === r && i.set(null, u), i.set(g, u), this.count++, r = To.bind(this), u.addEventListener("load", r), u.addEventListener("error", r), f ? f.parentNode.insertBefore(u, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Nr = {
    $$typeof: L,
    Provider: null,
    Consumer: null,
    _currentValue: ie,
    _currentValue2: ie,
    _threadCount: 0
  };
  function FE(e, n, i, r, u, f, g, E, C) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Da(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Da(0), this.hiddenUpdates = Da(null), this.identifierPrefix = r, this.onUncaughtError = u, this.onCaughtError = f, this.onRecoverableError = g, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = C, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function yg(e, n, i, r, u, f, g, E, C, q, X, ee) {
    return e = new FE(
      e,
      n,
      i,
      g,
      C,
      q,
      X,
      ee,
      E
    ), n = 1, f === !0 && (n |= 24), f = rn(3, null, null, n), e.current = f, f.stateNode = e, n = fc(), n.refCount++, e.pooledCache = n, n.refCount++, f.memoizedState = {
      element: r,
      isDehydrated: i,
      cache: n
    }, pc(f), e;
  }
  function gg(e) {
    return e ? (e = ll, e) : ll;
  }
  function vg(e, n, i, r, u, f) {
    u = gg(u), r.context === null ? r.context = u : r.pendingContext = u, r = Ba(n), r.payload = { element: i }, f = f === void 0 ? null : f, f !== null && (r.callback = f), i = Ha(e, r, n), i !== null && (en(i, e, n), ur(i, e, n));
  }
  function bg(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Of(e, n) {
    bg(e, n), (e = e.alternate) && bg(e, n);
  }
  function Sg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Si(e, 67108864);
      n !== null && en(n, e, 67108864), Of(e, 67108864);
    }
  }
  function xg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = fn();
      n = O(n);
      var i = Si(e, n);
      i !== null && en(i, e, n), Of(e, n);
    }
  }
  var Co = !0;
  function XE(e, n, i, r) {
    var u = N.T;
    N.T = null;
    var f = J.p;
    try {
      J.p = 2, Lf(e, n, i, r);
    } finally {
      J.p = f, N.T = u;
    }
  }
  function $E(e, n, i, r) {
    var u = N.T;
    N.T = null;
    var f = J.p;
    try {
      J.p = 8, Lf(e, n, i, r);
    } finally {
      J.p = f, N.T = u;
    }
  }
  function Lf(e, n, i, r) {
    if (Co) {
      var u = Uf(r);
      if (u === null)
        xf(
          e,
          n,
          r,
          Mo,
          i
        ), Tg(e, r);
      else if (QE(
        u,
        e,
        n,
        i,
        r
      ))
        r.stopPropagation();
      else if (Tg(e, r), n & 4 && -1 < KE.indexOf(e)) {
        for (; u !== null; ) {
          var f = ct(u);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var g = zn(f.pendingLanes);
                  if (g !== 0) {
                    var E = f;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; g; ) {
                      var C = 1 << 31 - qt(g);
                      E.entanglements[1] |= C, g &= ~C;
                    }
                    Kn(f), (Ge & 6) === 0 && (oo = Gt() + 500, Rr(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Si(f, 2), E !== null && en(E, f, 2), co(), Of(f, 2);
            }
          if (f = Uf(r), f === null && xf(
            e,
            n,
            r,
            Mo,
            i
          ), f === u) break;
          u = f;
        }
        u !== null && r.stopPropagation();
      } else
        xf(
          e,
          n,
          r,
          null,
          i
        );
    }
  }
  function Uf(e) {
    return e = Vu(e), Vf(e);
  }
  var Mo = null;
  function Vf(e) {
    if (Mo = null, e = Qe(e), e !== null) {
      var n = c(e);
      if (n === null) e = null;
      else {
        var i = n.tag;
        if (i === 13) {
          if (e = d(n), e !== null) return e;
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
    return Mo = e, null;
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
        switch (na()) {
          case Ma:
            return 2;
          case Xl:
            return 8;
          case Aa:
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
  var Bf = !1, Ia = null, Za = null, Ja = null, zr = /* @__PURE__ */ new Map(), _r = /* @__PURE__ */ new Map(), Wa = [], KE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Tg(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ia = null;
        break;
      case "dragenter":
      case "dragleave":
        Za = null;
        break;
      case "mouseover":
      case "mouseout":
        Ja = null;
        break;
      case "pointerover":
      case "pointerout":
        zr.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        _r.delete(n.pointerId);
    }
  }
  function Or(e, n, i, r, u, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: r,
      nativeEvent: f,
      targetContainers: [u]
    }, n !== null && (n = ct(n), n !== null && Sg(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), e);
  }
  function QE(e, n, i, r, u) {
    switch (n) {
      case "focusin":
        return Ia = Or(
          Ia,
          e,
          n,
          i,
          r,
          u
        ), !0;
      case "dragenter":
        return Za = Or(
          Za,
          e,
          n,
          i,
          r,
          u
        ), !0;
      case "mouseover":
        return Ja = Or(
          Ja,
          e,
          n,
          i,
          r,
          u
        ), !0;
      case "pointerover":
        var f = u.pointerId;
        return zr.set(
          f,
          Or(
            zr.get(f) || null,
            e,
            n,
            i,
            r,
            u
          )
        ), !0;
      case "gotpointercapture":
        return f = u.pointerId, _r.set(
          f,
          Or(
            _r.get(f) || null,
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
          if (n = d(i), n !== null) {
            e.blockedOn = n, re(e.priority, function() {
              xg(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            e.blockedOn = n, re(e.priority, function() {
              xg(i);
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
  function Ao(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var i = Uf(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var r = new i.constructor(
          i.type,
          i
        );
        Uu = r, i.target.dispatchEvent(r), Uu = null;
      } else
        return n = ct(i), n !== null && Sg(n), e.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function Rg(e, n, i) {
    Ao(e) && i.delete(n);
  }
  function IE() {
    Bf = !1, Ia !== null && Ao(Ia) && (Ia = null), Za !== null && Ao(Za) && (Za = null), Ja !== null && Ao(Ja) && (Ja = null), zr.forEach(Rg), _r.forEach(Rg);
  }
  function jo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Bf || (Bf = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      IE
    )));
  }
  var Do = null;
  function Cg(e) {
    Do !== e && (Do = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Do === e && (Do = null);
        for (var n = 0; n < e.length; n += 3) {
          var i = e[n], r = e[n + 1], u = e[n + 2];
          if (typeof r != "function") {
            if (Vf(r || i) === null)
              continue;
            break;
          }
          var f = ct(i);
          f !== null && (e.splice(n, 3), n -= 3, Lc(
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
  function jl(e) {
    function n(C) {
      return jo(C, e);
    }
    Ia !== null && jo(Ia, e), Za !== null && jo(Za, e), Ja !== null && jo(Ja, e), zr.forEach(n), _r.forEach(n);
    for (var i = 0; i < Wa.length; i++) {
      var r = Wa[i];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Wa.length && (i = Wa[0], i.blockedOn === null); )
      wg(i), i.blockedOn === null && Wa.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (r = 0; r < i.length; r += 3) {
        var u = i[r], f = i[r + 1], g = u[de] || null;
        if (typeof f == "function")
          g || Cg(i);
        else if (g) {
          var E = null;
          if (f && f.hasAttribute("formAction")) {
            if (u = f, g = f[de] || null)
              E = g.formAction;
            else if (Vf(u) !== null) continue;
          } else E = g.action;
          typeof E == "function" ? i[r + 1] = E : (i.splice(r, 3), r -= 3), Cg(i);
        }
      }
  }
  function Mg() {
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
    function n() {
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
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(i, 100), function() {
        r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), u !== null && (u(), u = null);
      };
    }
  }
  function Hf(e) {
    this._internalRoot = e;
  }
  No.prototype.render = Hf.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(s(409));
    var i = n.current, r = fn();
    vg(i, r, e, n, null, null);
  }, No.prototype.unmount = Hf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      vg(e.current, 2, null, e, null, null), co(), n[ge] = null;
    }
  };
  function No(e) {
    this._internalRoot = e;
  }
  No.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ae();
      e = { blockedOn: null, target: e, priority: n };
      for (var i = 0; i < Wa.length && n !== 0 && n < Wa[i].priority; i++) ;
      Wa.splice(i, 0, e), i === 0 && wg(e);
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
  J.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = m(n), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var ZE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: N,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var zo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zo.isDisabled && zo.supportsFiber)
      try {
        aa = zo.inject(
          ZE
        ), Ft = zo;
      } catch {
      }
  }
  return Ur.createRoot = function(e, n) {
    if (!o(e)) throw Error(s(299));
    var i = !1, r = "", u = Lp, f = Up, g = Vp;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (g = n.onRecoverableError)), n = yg(
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
      Mg
    ), e[ge] = n.current, Sf(e), new Hf(n);
  }, Ur.hydrateRoot = function(e, n, i) {
    if (!o(e)) throw Error(s(299));
    var r = !1, u = "", f = Lp, g = Up, E = Vp, C = null;
    return i != null && (i.unstable_strictMode === !0 && (r = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (f = i.onUncaughtError), i.onCaughtError !== void 0 && (g = i.onCaughtError), i.onRecoverableError !== void 0 && (E = i.onRecoverableError), i.formState !== void 0 && (C = i.formState)), n = yg(
      e,
      1,
      !0,
      n,
      i ?? null,
      r,
      u,
      C,
      f,
      g,
      E,
      Mg
    ), n.context = gg(null), i = n.current, r = fn(), r = O(r), u = Ba(r), u.callback = null, Ha(i, u, r), i = r, n.current.lanes = i, Pn(n, i), Kn(n), e[ge] = n.current, Sf(e), new No(n);
  }, Ur.version = "19.2.5", Ur;
}
var Bg;
function fT() {
  if (Bg) return Pf.exports;
  Bg = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Pf.exports = cT(), Pf.exports;
}
var dT = fT();
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
var ob = (t) => {
  throw TypeError(t);
}, hT = (t, a, l) => a.has(t) || ob("Cannot " + l), Xf = (t, a, l) => (hT(t, a, "read from private field"), l ? l.call(t) : a.get(t)), mT = (t, a, l) => a.has(t) ? ob("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, l);
function Hg(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function pT(t = {}) {
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
  ), d = "POP", h = null;
  function p(T) {
    return Math.min(Math.max(T, 0), o.length - 1);
  }
  function m() {
    return o[c];
  }
  function y(T, w = null, R, D) {
    let _ = wd(
      o ? m().pathname : "/",
      T,
      w,
      R,
      D
    );
    return St(
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
      let w = typeof T == "string" ? qn(T) : T;
      return {
        pathname: w.pathname || "",
        search: w.search || "",
        hash: w.hash || ""
      };
    },
    push(T, w) {
      d = "PUSH";
      let R = Hg(T) ? T : y(T, w);
      c += 1, o.splice(c, o.length, R), s && h && h({ action: d, location: R, delta: 1 });
    },
    replace(T, w) {
      d = "REPLACE";
      let R = Hg(T) ? T : y(T, w);
      o[c] = R, s && h && h({ action: d, location: R, delta: 0 });
    },
    go(T) {
      d = "POP";
      let w = p(c + T), R = o[w];
      c = w, h && h({ action: d, location: R, delta: T });
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
function St(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function yT() {
  return Math.random().toString(36).substring(2, 10);
}
function wd(t, a, l = null, s, o) {
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
    key: a && a.key || s || yT(),
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
function gT(t, a = !1) {
  let l = "http://localhost";
  typeof window < "u" && (l = window.location.origin !== "null" ? window.location.origin : window.location.href), _e(l, "No window.location.(origin|href) available to create URL");
  let s = typeof t == "string" ? t : Jn(t);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var Gr, qg = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (mT(this, Gr, /* @__PURE__ */ new Map()), t)
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
var vT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function bT(t) {
  return vT.has(
    t
  );
}
var ST = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function xT(t) {
  return ST.has(
    t
  );
}
function ET(t) {
  return t.index === !0;
}
function Jr(t, a, l = [], s = {}, o = !1) {
  return t.map((c, d) => {
    let h = [...l, String(d)], p = typeof c.id == "string" ? c.id : h.join("-");
    if (_e(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), _e(
      o || !s[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), ET(c)) {
      let m = {
        ...c,
        id: p
      };
      return s[p] = kg(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...c,
        id: p,
        children: void 0
      };
      return s[p] = kg(
        m,
        a(m)
      ), c.children && (m.children = Jr(
        c.children,
        a,
        h,
        s,
        o
      )), m;
    }
  });
}
function kg(t, a) {
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
function ii(t, a, l = "/") {
  return Fr(t, a, l, !1);
}
function Fr(t, a, l, s) {
  let o = typeof a == "string" ? qn(a) : a, c = jn(o.pathname || "/", l);
  if (c == null)
    return null;
  let d = ub(t);
  wT(d);
  let h = null;
  for (let p = 0; h == null && p < d.length; ++p) {
    let m = LT(c);
    h = _T(
      d[p],
      m,
      s
    );
  }
  return h;
}
function TT(t, a) {
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
function ub(t, a = [], l = [], s = "", o = !1) {
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
      _e(
        y.relativePath.startsWith(s),
        `Absolute route path "${y.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(s.length);
    }
    let b = Mn([s, y.relativePath]), S = l.concat(y);
    d.children && d.children.length > 0 && (_e(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      d.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
    ), ub(
      d.children,
      a,
      S,
      b,
      p
    )), !(d.path == null && !d.index) && a.push({
      path: b,
      score: NT(b, d.index),
      routesMeta: S
    });
  };
  return t.forEach((d, h) => {
    if (d.path === "" || !d.path?.includes("?"))
      c(d, h);
    else
      for (let p of cb(d.path))
        c(d, h, !0, p);
  }), a;
}
function cb(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [l, ...s] = a, o = l.endsWith("?"), c = l.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let d = cb(s.join("/")), h = [];
  return h.push(
    ...d.map(
      (p) => p === "" ? c : [c, p].join("/")
    )
  ), o && h.push(...d), h.map(
    (p) => t.startsWith("/") && p === "" ? "/" : p
  );
}
function wT(t) {
  t.sort(
    (a, l) => a.score !== l.score ? l.score - a.score : zT(
      a.routesMeta.map((s) => s.childrenIndex),
      l.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var RT = /^:[\w-]+$/, CT = 3, MT = 2, AT = 1, jT = 10, DT = -2, Pg = (t) => t === "*";
function NT(t, a) {
  let l = t.split("/"), s = l.length;
  return l.some(Pg) && (s += DT), a && (s += MT), l.filter((o) => !Pg(o)).reduce(
    (o, c) => o + (RT.test(c) ? CT : c === "" ? AT : jT),
    s
  );
}
function zT(t, a) {
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
function _T(t, a, l = !1) {
  let { routesMeta: s } = t, o = {}, c = "/", d = [];
  for (let h = 0; h < s.length; ++h) {
    let p = s[h], m = h === s.length - 1, y = c === "/" ? a : a.slice(c.length) || "/", b = au(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), S = p.route;
    if (!b && m && l && !s[s.length - 1].route.index && (b = au(
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
      pathname: Mn([c, b.pathname]),
      pathnameBase: BT(
        Mn([c, b.pathnameBase])
      ),
      route: S
    }), b.pathnameBase !== "/" && (c = Mn([c, b.pathnameBase]));
  }
  return d;
}
function au(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [l, s] = OT(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(l);
  if (!o) return null;
  let c = o[0], d = c.replace(/(.)\/+$/, "$1"), h = o.slice(1);
  return {
    params: s.reduce(
      (m, { paramName: y, isOptional: b }, S) => {
        if (y === "*") {
          let w = h[S] || "";
          d = c.slice(0, c.length - w.length).replace(/(.)\/+$/, "$1");
        }
        const T = h[S];
        return b && !T ? m[y] = void 0 : m[y] = (T || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: c,
    pathnameBase: d,
    pattern: t
  };
}
function OT(t, a = !1, l = !0) {
  St(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (d, h, p, m, y) => {
      if (s.push({ paramName: h, isOptional: p != null }), p) {
        let b = y.charAt(m + d.length);
        return b && b !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (s.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : l ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function LT(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return St(
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
function UT({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Mn([t, a]);
}
var fb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, th = (t) => fb.test(t);
function VT(t, a = "/") {
  let {
    pathname: l,
    search: s = "",
    hash: o = ""
  } = typeof t == "string" ? qn(t) : t, c;
  return l ? (l = ah(l), l.startsWith("/") ? c = Yg(l.substring(1), "/") : c = Yg(l, a)) : c = a, {
    pathname: c,
    search: HT(s),
    hash: qT(o)
  };
}
function Yg(t, a) {
  let l = iu(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? l.length > 1 && l.pop() : o !== "." && l.push(o);
  }), l.length > 1 ? l.join("/") : "/";
}
function $f(t, a, l, s) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${l}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function db(t) {
  return t.filter(
    (a, l) => l === 0 || a.route.path && a.route.path.length > 0
  );
}
function nh(t) {
  let a = db(t);
  return a.map(
    (l, s) => s === a.length - 1 ? l.pathname : l.pathnameBase
  );
}
function yu(t, a, l, s = !1) {
  let o;
  typeof t == "string" ? o = qn(t) : (o = { ...t }, _e(
    !o.pathname || !o.pathname.includes("?"),
    $f("?", "pathname", "search", o)
  ), _e(
    !o.pathname || !o.pathname.includes("#"),
    $f("#", "pathname", "hash", o)
  ), _e(
    !o.search || !o.search.includes("#"),
    $f("#", "search", "hash", o)
  ));
  let c = t === "" || o.pathname === "", d = c ? "/" : o.pathname, h;
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
  let p = VT(o, h), m = d && d !== "/" && d.endsWith("/"), y = (c || d === ".") && l.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var ah = (t) => t.replace(/\/\/+/g, "/"), Mn = (t) => ah(t.join("/")), iu = (t) => t.replace(/\/+$/, ""), BT = (t) => iu(t).replace(/^\/*/, "/"), HT = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, qT = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, kT = (t, a = 302) => {
  let l = a;
  typeof l == "number" ? l = { status: l } : typeof l.status > "u" && (l.status = 302);
  let s = new Headers(l.headers);
  return s.set("Location", t), new Response(null, { ...l, headers: s });
}, gu = class {
  constructor(t, a, l, s = !1) {
    this.status = t, this.statusText = a || "", this.internal = s, l instanceof Error ? (this.data = l.toString(), this.error = l) : this.data = l;
  }
};
function Wr(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function is(t) {
  let a = t.map((l) => l.route.path).filter(Boolean);
  return Mn(a) || "/";
}
var hb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function mb(t, a) {
  let l = t;
  if (typeof l != "string" || !fb.test(l))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: l
    };
  let s = l, o = !1;
  if (hb)
    try {
      let c = new URL(window.location.href), d = l.startsWith("//") ? new URL(c.protocol + l) : new URL(l), h = jn(d.pathname, a);
      d.origin === c.origin && h != null ? l = h + d.search + d.hash : o = !0;
    } catch {
      St(
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
var ri = Symbol("Uninstrumented");
function PT(t, a) {
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
        let d = Object.keys(l);
        for (let h of d)
          c[h] && l[h].push(c[h]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && l.lazy.length > 0) {
    let o = _l(l.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((c) => {
      let d = o[c], h = l[`lazy.${c}`];
      if (typeof d == "function" && h.length > 0) {
        let p = _l(h, d, () => {
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
      let d = c[ri] ?? c, h = _l(
        l[o],
        d,
        (...p) => Gg(p[0])
      );
      h && (o === "loader" && d.hydrate === !0 && (h.hydrate = !0), h[ri] = d, s[o] = h);
    }
  }), a.middleware && a.middleware.length > 0 && l.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[ri] ?? o, d = _l(
      l.middleware,
      c,
      (...h) => Gg(h[0])
    );
    return d ? (d[ri] = c, d) : o;
  })), s;
}
function YT(t, a) {
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
    let s = t.navigate[ri] ?? t.navigate, o = _l(
      l.navigate,
      s,
      (...c) => {
        let [d, h] = c;
        return {
          to: typeof d == "number" || typeof d == "string" ? d : d ? Jn(d) : ".",
          ...Fg(t, h ?? {})
        };
      }
    );
    o && (o[ri] = s, t.navigate = o);
  }
  if (l.fetch.length > 0) {
    let s = t.fetch[ri] ?? t.fetch, o = _l(l.fetch, s, (...c) => {
      let [d, , h, p] = c;
      return {
        href: h ?? ".",
        fetcherKey: d,
        ...Fg(t, p ?? {})
      };
    });
    o && (o[ri] = s, t.fetch = o);
  }
  return t;
}
function _l(t, a, l) {
  return t.length === 0 ? null : async (...s) => {
    let o = await pb(
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
async function pb(t, a, l, s) {
  let o = t[s], c;
  if (o) {
    let d, h = async () => (d ? console.error("You cannot call instrumented handlers more than once") : d = pb(t, a, l, s - 1), c = await d, _e(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
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
function Gg(t) {
  let { request: a, context: l, params: s, unstable_pattern: o } = t;
  return {
    request: GT(a),
    params: { ...s },
    unstable_pattern: o,
    context: FT(l)
  };
}
function Fg(t, a) {
  return {
    currentUrl: Jn(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function GT(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function FT(t) {
  if ($T(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var XT = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function $T(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === XT;
}
var yb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], KT = new Set(
  yb
), QT = [
  "GET",
  ...yb
], IT = new Set(QT), gb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), ZT = /* @__PURE__ */ new Set([307, 308]), Kf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, JT = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Vr = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, WT = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), vb = "remix-router-transitions", bb = Symbol("ResetLoaderData");
function ew(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, l = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  _e(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = t.hydrationRouteProperties || [], o = t.mapRouteProperties || WT, c = o;
  if (t.unstable_instrumentations) {
    let M = t.unstable_instrumentations;
    c = (O) => ({
      ...o(O),
      ...PT(
        M.map((k) => k.route).filter(Boolean),
        O
      )
    });
  }
  let d = {}, h = Jr(
    t.routes,
    c,
    void 0,
    d
  ), p, m = t.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let y = t.dataStrategy || lw, b = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, S = null, T = /* @__PURE__ */ new Set(), w = null, R = null, D = null, _ = t.hydrationData != null, B = ii(h, t.history.location, m), L = !1, V = null, $, K;
  if (B == null && !t.patchRoutesOnNavigation) {
    let M = wn(404, {
      pathname: t.history.location.pathname
    }), { matches: O, route: k } = _o(h);
    $ = !0, K = !$, B = O, V = { [k.id]: M };
  } else if (B && !t.hydrationData && Da(
    B,
    h,
    t.history.location.pathname
  ).active && (B = null), B)
    if (B.some((M) => M.route.lazy))
      $ = !1, K = !$;
    else if (!B.some((M) => ih(M.route)))
      $ = !0, K = !$;
    else {
      let M = t.hydrationData ? t.hydrationData.loaderData : null, O = t.hydrationData ? t.hydrationData.errors : null, k = B;
      if (O) {
        let ae = B.findIndex(
          (re) => O[re.route.id] !== void 0
        );
        k = k.slice(0, ae + 1);
      }
      K = !1, $ = !0, k.forEach((ae) => {
        let re = Sb(ae.route, M, O);
        K = K || re.renderFallback, $ = $ && !re.shouldLoad;
      });
    }
  else {
    $ = !1, K = !$, B = [];
    let M = Da(
      null,
      h,
      t.history.location.pathname
    );
    M.active && M.matches && (L = !0, B = M.matches);
  }
  let te, A = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: B,
    initialized: $,
    renderFallback: K,
    navigation: Kf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || V,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, Q = "POP", ne = null, ce = !1, W, se = !1, G = /* @__PURE__ */ new Map(), I = null, N = !1, J = !1, ie = /* @__PURE__ */ new Set(), ue = /* @__PURE__ */ new Map(), Re = 0, j = -1, F = /* @__PURE__ */ new Map(), le = /* @__PURE__ */ new Set(), oe = /* @__PURE__ */ new Map(), xe = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Set(), De = /* @__PURE__ */ new Map(), ht, Xe = null;
  function ea() {
    if (S = t.history.listen(
      ({ action: M, location: O, delta: k }) => {
        if (ht) {
          ht(), ht = void 0;
          return;
        }
        St(
          De.size === 0 || k != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ae = mi({
          currentLocation: A.location,
          nextLocation: O,
          historyAction: M
        });
        if (ae && k != null) {
          let re = new Promise((pe) => {
            ht = pe;
          });
          t.history.go(k * -1), ia(ae, {
            state: "blocked",
            location: O,
            proceed() {
              ia(ae, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: O
              }), re.then(() => t.history.go(k));
            },
            reset() {
              let pe = new Map(A.blockers);
              pe.set(ae, Vr), yt({ blockers: pe });
            }
          }), ne?.resolve(), ne = null;
          return;
        }
        return be(M, O);
      }
    ), l) {
      Tw(a, G);
      let M = () => ww(a, G);
      a.addEventListener("pagehide", M), I = () => a.removeEventListener("pagehide", M);
    }
    return A.initialized || be("POP", A.location, {
      initialHydration: !0
    }), te;
  }
  function Ra() {
    S && S(), I && I(), T.clear(), W && W.abort(), A.fetchers.forEach((M, O) => aa(O)), A.blockers.forEach((M, O) => hi(O));
  }
  function kn(M) {
    return T.add(M), () => T.delete(M);
  }
  function yt(M, O = {}) {
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
      re.state === "idle" && (we.has(pe) ? k.push(pe) : ae.push(pe));
    }), we.forEach((re) => {
      !A.fetchers.has(re) && !ue.has(re) && k.push(re);
    }), [...T].forEach(
      (re) => re(A, {
        deletedFetchers: k,
        newErrors: M.errors ?? null,
        viewTransitionOpts: O.viewTransitionOpts,
        flushSync: O.flushSync === !0
      })
    ), k.forEach((re) => aa(re)), ae.forEach((re) => A.fetchers.delete(re));
  }
  function Ht(M, O, { flushSync: k } = {}) {
    let ae = A.actionData != null && A.navigation.formMethod != null && Yt(A.navigation.formMethod) && A.navigation.state === "loading" && M.state?._isRedirect !== !0, re;
    O.actionData ? Object.keys(O.actionData).length > 0 ? re = O.actionData : re = null : ae ? re = A.actionData : re = null;
    let pe = O.loaderData ? nv(
      A.loaderData,
      O.loaderData,
      O.matches || [],
      O.errors
    ) : A.loaderData, fe = A.blockers;
    fe.size > 0 && (fe = new Map(fe), fe.forEach((Te, Se) => fe.set(Se, Vr)));
    let de = N ? !1 : $l(M, O.matches || A.matches), ge = ce === !0 || A.navigation.formMethod != null && Yt(A.navigation.formMethod) && M.state?._isRedirect !== !0;
    p && (h = p, p = void 0), N || Q === "POP" || (Q === "PUSH" ? t.history.push(M, M.state) : Q === "REPLACE" && t.history.replace(M, M.state));
    let he;
    if (Q === "POP") {
      let Te = G.get(A.location.pathname);
      Te && Te.has(M.pathname) ? he = {
        currentLocation: A.location,
        nextLocation: M
      } : G.has(M.pathname) && (he = {
        currentLocation: M,
        nextLocation: A.location
      });
    } else if (se) {
      let Te = G.get(A.location.pathname);
      Te ? Te.add(M.pathname) : (Te = /* @__PURE__ */ new Set([M.pathname]), G.set(A.location.pathname, Te)), he = {
        currentLocation: A.location,
        nextLocation: M
      };
    }
    yt(
      {
        ...O,
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
    ), Q = "POP", ce = !1, se = !1, N = !1, J = !1, ne?.resolve(), ne = null, Xe?.resolve(), Xe = null;
  }
  async function Ca(M, O) {
    if (ne?.resolve(), ne = null, typeof M == "number") {
      ne || (ne = rv());
      let We = ne.promise;
      return t.history.go(M), We;
    }
    let k = Rd(
      A.location,
      A.matches,
      m,
      M,
      O?.fromRouteId,
      O?.relative
    ), { path: ae, submission: re, error: pe } = Xg(
      !1,
      k,
      O
    ), fe;
    O?.unstable_mask && (fe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof O.unstable_mask == "string" ? qn(O.unstable_mask) : {
        ...A.location.unstable_mask,
        ...O.unstable_mask
      }
    });
    let de = A.location, ge = wd(
      de,
      ae,
      O && O.state,
      void 0,
      fe
    );
    ge = {
      ...ge,
      ...t.history.encodeLocation(ge)
    };
    let he = O && O.replace != null ? O.replace : void 0, Te = "PUSH";
    he === !0 ? Te = "REPLACE" : he === !1 || re != null && Yt(re.formMethod) && re.formAction === A.location.pathname + A.location.search && (Te = "REPLACE");
    let Se = O && "preventScrollReset" in O ? O.preventScrollReset === !0 : void 0, ke = (O && O.flushSync) === !0, Ne = mi({
      currentLocation: de,
      nextLocation: ge,
      historyAction: Te
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
          }), Ca(M, O);
        },
        reset() {
          let We = new Map(A.blockers);
          We.set(Ne, Vr), yt({ blockers: We });
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
      replace: O && O.replace,
      enableViewTransition: O && O.viewTransition,
      flushSync: ke,
      callSiteDefaultShouldRevalidate: O && O.unstable_defaultShouldRevalidate
    });
  }
  function di() {
    Xe || (Xe = rv()), Aa(), yt({ revalidation: "loading" });
    let M = Xe.promise;
    return A.navigation.state === "submitting" ? M : A.navigation.state === "idle" ? (be(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), M) : (be(
      Q || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: se === !0
      }
    ), M);
  }
  async function be(M, O, k) {
    W && W.abort(), W = null, Q = M, N = (k && k.startUninterruptedRevalidation) === !0, zu(A.location, A.matches), ce = (k && k.preventScrollReset) === !0, se = (k && k.enableViewTransition) === !0;
    let ae = p || h, re = k && k.overrideNavigation, pe = k?.initialHydration && A.matches && A.matches.length > 0 && !L ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : ii(ae, O, m), fe = (k && k.flushSync) === !0;
    if (pe && A.initialized && !J && hw(A.location, O) && !(k && k.submission && Yt(k.submission.formMethod))) {
      Ht(O, { matches: pe }, { flushSync: fe });
      return;
    }
    let de = Da(pe, ae, O.pathname);
    if (de.active && de.matches && (pe = de.matches), !pe) {
      let { error: Qe, notFoundMatches: ct, route: Le } = zn(
        O.pathname
      );
      Ht(
        O,
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
    W = new AbortController();
    let ge = Nl(
      t.history,
      O,
      W.signal,
      k && k.submission
    ), he = t.getContext ? await t.getContext() : new qg(), Te;
    if (k && k.pendingError)
      Te = [
        li(pe).route.id,
        { type: "error", error: k.pendingError }
      ];
    else if (k && k.submission && Yt(k.submission.formMethod)) {
      let Qe = await Oe(
        ge,
        O,
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
        let [ct, Le] = Qe.pendingActionResult;
        if (dn(Le) && Wr(Le.error) && Le.error.status === 404) {
          W = null, Ht(O, {
            matches: Qe.matches,
            loaderData: {},
            errors: {
              [ct]: Le.error
            }
          });
          return;
        }
      }
      pe = Qe.matches || pe, Te = Qe.pendingActionResult, re = Qf(O, k.submission), fe = !1, de.active = !1, ge = Nl(
        t.history,
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
      O,
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
    Se || (W = null, Ht(O, {
      matches: ke || pe,
      ...av(Te),
      loaderData: Ne,
      errors: We
    }));
  }
  async function Oe(M, O, k, ae, re, pe, fe, de = {}) {
    Aa();
    let ge = xw(O, k);
    if (yt({ navigation: ge }, { flushSync: de.flushSync === !0 }), pe) {
      let Se = await Pn(
        ae,
        O.pathname,
        M.signal
      );
      if (Se.type === "aborted")
        return { shortCircuited: !0 };
      if (Se.type === "error") {
        if (Se.partialMatches.length === 0) {
          let { matches: Ne, route: We } = _o(h);
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
        let ke = li(Se.partialMatches).route.id;
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
        let { notFoundMatches: ke, error: Ne, route: We } = zn(
          O.pathname
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
    let he, Te = Fo(ae, O);
    if (!Te.route.action && !Te.route.lazy)
      he = {
        type: "error",
        error: wn(405, {
          method: M.method,
          pathname: O.pathname,
          routeId: Te.route.id
        })
      };
    else {
      let Se = Bl(
        c,
        d,
        M,
        O,
        ae,
        Te,
        fe ? [] : s,
        re
      ), ke = await Ma(
        M,
        O,
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
    if (Vi(he)) {
      let Se;
      return de && de.replace != null ? Se = de.replace : Se = Wg(
        he.response.headers.get("Location"),
        new URL(M.url),
        m,
        t.history
      ) === A.location.pathname + A.location.search, await na(M, he, !0, {
        submission: k,
        replace: Se
      }), { shortCircuited: !0 };
    }
    if (dn(he)) {
      let Se = li(ae, Te.route.id);
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
  async function Fe(M, O, k, ae, re, pe, fe, de, ge, he, Te, Se, ke) {
    let Ne = pe || Qf(O, fe), We = fe || de || lv(Ne), Qe = !N && !he;
    if (re) {
      if (Qe) {
        let gt = ut(Se);
        yt(
          {
            navigation: Ne,
            ...gt !== void 0 ? { actionData: gt } : {}
          },
          {
            flushSync: Te
          }
        );
      }
      let ze = await Pn(
        k,
        O.pathname,
        M.signal
      );
      if (ze.type === "aborted")
        return { shortCircuited: !0 };
      if (ze.type === "error") {
        if (ze.partialMatches.length === 0) {
          let { matches: kt, route: Et } = _o(h);
          return {
            matches: kt,
            loaderData: {},
            errors: {
              [Et.id]: ze.error
            }
          };
        }
        let gt = li(ze.partialMatches).route.id;
        return {
          matches: ze.partialMatches,
          loaderData: {},
          errors: {
            [gt]: ze.error
          }
        };
      } else if (ze.matches)
        k = ze.matches;
      else {
        let { error: gt, notFoundMatches: kt, route: Et } = zn(
          O.pathname
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
    let ct = p || h, { dsMatches: Le, revalidatingFetchers: xt } = $g(
      M,
      ae,
      c,
      d,
      t.history,
      A,
      k,
      We,
      O,
      he ? [] : s,
      he === !0,
      J,
      ie,
      we,
      oe,
      le,
      ct,
      m,
      t.patchRoutesOnNavigation != null,
      Se,
      ke
    );
    if (j = ++Re, !t.dataStrategy && !Le.some((ze) => ze.shouldLoad) && !Le.some(
      (ze) => ze.route.middleware && ze.route.middleware.length > 0
    ) && xt.length === 0) {
      let ze = ys();
      return Ht(
        O,
        {
          matches: k,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Se && dn(Se[1]) ? { [Se[0]]: Se[1].error } : null,
          ...av(Se),
          ...ze ? { fetchers: new Map(A.fetchers) } : {}
        },
        { flushSync: Te }
      ), { shortCircuited: !0 };
    }
    if (Qe) {
      let ze = {};
      if (!re) {
        ze.navigation = Ne;
        let gt = ut(Se);
        gt !== void 0 && (ze.actionData = gt);
      }
      xt.length > 0 && (ze.fetchers = ta(xt)), yt(ze, { flushSync: Te });
    }
    xt.forEach((ze) => {
      Dt(ze.key), ze.controller && ue.set(ze.key, ze.controller);
    });
    let nt = () => xt.forEach((ze) => Dt(ze.key));
    W && W.signal.addEventListener(
      "abort",
      nt
    );
    let { loaderResults: Na, fetcherResults: _n } = await Xl(
      Le,
      xt,
      M,
      O,
      ae
    );
    if (M.signal.aborted)
      return { shortCircuited: !0 };
    W && W.signal.removeEventListener(
      "abort",
      nt
    ), xt.forEach((ze) => ue.delete(ze.key));
    let Nt = Oo(Na);
    if (Nt)
      return await na(M, Nt.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    if (Nt = Oo(_n), Nt)
      return le.add(Nt.key), await na(M, Nt.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    let { loaderData: Yn, errors: pi } = tv(
      A,
      k,
      Na,
      Se,
      xt,
      _n
    );
    he && A.errors && (pi = { ...A.errors, ...pi });
    let Gn = ys(), yi = gs(j), Ki = Gn || yi || xt.length > 0;
    return {
      matches: k,
      loaderData: Yn,
      errors: pi,
      ...Ki ? { fetchers: new Map(A.fetchers) } : {}
    };
  }
  function ut(M) {
    if (M && !dn(M[1]))
      return {
        [M[0]]: M[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function ta(M) {
    return M.forEach((O) => {
      let k = A.fetchers.get(O.key), ae = Br(
        void 0,
        k ? k.data : void 0
      );
      A.fetchers.set(O.key, ae);
    }), new Map(A.fetchers);
  }
  async function Au(M, O, k, ae) {
    Dt(M);
    let re = (ae && ae.flushSync) === !0, pe = p || h, fe = Rd(
      A.location,
      A.matches,
      m,
      k,
      O,
      ae?.relative
    ), de = ii(pe, fe, m), ge = Da(de, pe, fe);
    if (ge.active && ge.matches && (de = ge.matches), !de) {
      mn(
        M,
        O,
        wn(404, { pathname: fe }),
        { flushSync: re }
      );
      return;
    }
    let { path: he, submission: Te, error: Se } = Xg(
      !0,
      fe,
      ae
    );
    if (Se) {
      mn(M, O, Se, { flushSync: re });
      return;
    }
    let ke = t.getContext ? await t.getContext() : new qg(), Ne = (ae && ae.preventScrollReset) === !0;
    if (Te && Yt(Te.formMethod)) {
      await ju(
        M,
        O,
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
    oe.set(M, { routeId: O, path: he }), await Gt(
      M,
      O,
      he,
      de,
      ke,
      ge.active,
      re,
      Ne,
      Te
    );
  }
  async function ju(M, O, k, ae, re, pe, fe, de, ge, he) {
    Aa(), oe.delete(M);
    let Te = A.fetchers.get(M);
    Nn(M, Ew(ge, Te), {
      flushSync: fe
    });
    let Se = new AbortController(), ke = Nl(
      t.history,
      k,
      Se.signal,
      ge
    );
    if (pe) {
      let at = await Pn(
        ae,
        new URL(ke.url).pathname,
        ke.signal,
        M
      );
      if (at.type === "aborted")
        return;
      if (at.type === "error") {
        mn(M, O, at.error, { flushSync: fe });
        return;
      } else if (at.matches)
        ae = at.matches;
      else {
        mn(
          M,
          O,
          wn(404, { pathname: k }),
          { flushSync: fe }
        );
        return;
      }
    }
    let Ne = Fo(ae, k);
    if (!Ne.route.action && !Ne.route.lazy) {
      let at = wn(405, {
        method: ge.formMethod,
        pathname: k,
        routeId: O
      });
      mn(M, O, at, { flushSync: fe });
      return;
    }
    ue.set(M, Se);
    let We = Re, Qe = Bl(
      c,
      d,
      ke,
      k,
      ae,
      Ne,
      s,
      re
    ), ct = await Ma(
      ke,
      k,
      Qe,
      re,
      M
    ), Le = ct[Ne.route.id];
    if (!Le) {
      for (let at of Qe)
        if (ct[at.route.id]) {
          Le = ct[at.route.id];
          break;
        }
    }
    if (ke.signal.aborted) {
      ue.get(M) === Se && ue.delete(M);
      return;
    }
    if (we.has(M)) {
      if (Vi(Le) || dn(Le)) {
        Nn(M, Ea(void 0));
        return;
      }
    } else {
      if (Vi(Le))
        if (ue.delete(M), j > We) {
          Nn(M, Ea(void 0));
          return;
        } else
          return le.add(M), Nn(M, Br(ge)), na(ke, Le, !1, {
            fetcherSubmission: ge,
            preventScrollReset: de
          });
      if (dn(Le)) {
        mn(M, O, Le.error);
        return;
      }
    }
    let xt = A.navigation.location || A.location, nt = Nl(
      t.history,
      xt,
      Se.signal
    ), Na = p || h, _n = A.navigation.state !== "idle" ? ii(Na, A.navigation.location, m) : A.matches;
    _e(_n, "Didn't find any matches after fetcher action");
    let Nt = ++Re;
    F.set(M, Nt);
    let Yn = Br(ge, Le.data);
    A.fetchers.set(M, Yn);
    let { dsMatches: pi, revalidatingFetchers: Gn } = $g(
      nt,
      re,
      c,
      d,
      t.history,
      A,
      _n,
      ge,
      xt,
      s,
      !1,
      J,
      ie,
      we,
      oe,
      le,
      Na,
      m,
      t.patchRoutesOnNavigation != null,
      [Ne.route.id, Le],
      he
    );
    Gn.filter((at) => at.key !== M).forEach((at) => {
      let Qi = at.key, Ii = A.fetchers.get(Qi), xs = Br(
        void 0,
        Ii ? Ii.data : void 0
      );
      A.fetchers.set(Qi, xs), Dt(Qi), at.controller && ue.set(Qi, at.controller);
    }), yt({ fetchers: new Map(A.fetchers) });
    let yi = () => Gn.forEach((at) => Dt(at.key));
    Se.signal.addEventListener(
      "abort",
      yi
    );
    let { loaderResults: Ki, fetcherResults: ze } = await Xl(
      pi,
      Gn,
      nt,
      xt,
      re
    );
    if (Se.signal.aborted)
      return;
    if (Se.signal.removeEventListener(
      "abort",
      yi
    ), F.delete(M), ue.delete(M), Gn.forEach((at) => ue.delete(at.key)), A.fetchers.has(M)) {
      let at = Ea(Le.data);
      A.fetchers.set(M, at);
    }
    let gt = Oo(Ki);
    if (gt)
      return na(
        nt,
        gt.result,
        !1,
        { preventScrollReset: de }
      );
    if (gt = Oo(ze), gt)
      return le.add(gt.key), na(
        nt,
        gt.result,
        !1,
        { preventScrollReset: de }
      );
    let { loaderData: kt, errors: Et } = tv(
      A,
      _n,
      Ki,
      void 0,
      Gn,
      ze
    );
    gs(Nt), A.navigation.state === "loading" && Nt > j ? (_e(Q, "Expected pending action"), W && W.abort(), Ht(A.navigation.location, {
      matches: _n,
      loaderData: kt,
      errors: Et,
      fetchers: new Map(A.fetchers)
    })) : (yt({
      errors: Et,
      loaderData: nv(
        A.loaderData,
        kt,
        _n,
        Et
      ),
      fetchers: new Map(A.fetchers)
    }), J = !1);
  }
  async function Gt(M, O, k, ae, re, pe, fe, de, ge) {
    let he = A.fetchers.get(M);
    Nn(
      M,
      Br(
        ge,
        he ? he.data : void 0
      ),
      { flushSync: fe }
    );
    let Te = new AbortController(), Se = Nl(
      t.history,
      k,
      Te.signal
    );
    if (pe) {
      let Le = await Pn(
        ae,
        new URL(Se.url).pathname,
        Se.signal,
        M
      );
      if (Le.type === "aborted")
        return;
      if (Le.type === "error") {
        mn(M, O, Le.error, { flushSync: fe });
        return;
      } else if (Le.matches)
        ae = Le.matches;
      else {
        mn(
          M,
          O,
          wn(404, { pathname: k }),
          { flushSync: fe }
        );
        return;
      }
    }
    let ke = Fo(ae, k);
    ue.set(M, Te);
    let Ne = Re, We = Bl(
      c,
      d,
      Se,
      k,
      ae,
      ke,
      s,
      re
    ), Qe = await Ma(
      Se,
      k,
      We,
      re,
      M
    ), ct = Qe[ke.route.id];
    if (!ct) {
      for (let Le of ae)
        if (Qe[Le.route.id]) {
          ct = Qe[Le.route.id];
          break;
        }
    }
    if (ue.get(M) === Te && ue.delete(M), !Se.signal.aborted) {
      if (we.has(M)) {
        Nn(M, Ea(void 0));
        return;
      }
      if (Vi(ct))
        if (j > Ne) {
          Nn(M, Ea(void 0));
          return;
        } else {
          le.add(M), await na(Se, ct, !1, {
            preventScrollReset: de
          });
          return;
        }
      if (dn(ct)) {
        mn(M, O, ct.error);
        return;
      }
      Nn(M, Ea(ct.data));
    }
  }
  async function na(M, O, k, {
    submission: ae,
    fetcherSubmission: re,
    preventScrollReset: pe,
    replace: fe
  } = {}) {
    k || (ne?.resolve(), ne = null), O.response.headers.has("X-Remix-Revalidate") && (J = !0);
    let de = O.response.headers.get("Location");
    _e(de, "Expected a Location header on the redirect Response"), de = Wg(
      de,
      new URL(M.url),
      m,
      t.history
    );
    let ge = wd(A.location, de, {
      _isRedirect: !0
    });
    if (l) {
      let We = !1;
      if (O.response.headers.has("X-Remix-Reload-Document"))
        We = !0;
      else if (th(de)) {
        const Qe = gT(de, !0);
        We = // Hard reload if it's an absolute URL to a new origin
        Qe.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        jn(Qe.pathname, m) == null;
      }
      if (We) {
        fe ? a.location.replace(de) : a.location.assign(de);
        return;
      }
    }
    W = null;
    let he = fe === !0 || O.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Te, formAction: Se, formEncType: ke } = A.navigation;
    !ae && !re && Te && Se && ke && (ae = lv(A.navigation));
    let Ne = ae || re;
    if (ZT.has(O.response.status) && Ne && Yt(Ne.formMethod))
      await be(he, ge, {
        submission: {
          ...Ne,
          formAction: de
        },
        // Preserve these flags across redirects
        preventScrollReset: pe || ce,
        enableViewTransition: k ? se : void 0
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
        enableViewTransition: k ? se : void 0
      });
    }
  }
  async function Ma(M, O, k, ae, re) {
    let pe, fe = {};
    try {
      pe = await sw(
        y,
        M,
        O,
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
    if (!Yt(M.method))
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
      if (gw(ge)) {
        let he = ge.result;
        fe[de] = {
          type: "redirect",
          response: fw(
            he,
            M,
            de,
            k,
            m
          )
        };
      } else
        fe[de] = await cw(ge);
    return fe;
  }
  async function Xl(M, O, k, ae, re) {
    let pe = Ma(
      k,
      ae,
      M,
      re,
      null
    ), fe = Promise.all(
      O.map(async (he) => {
        if (he.matches && he.match && he.request && he.controller) {
          let Se = (await Ma(
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
              error: wn(404, {
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
  function Aa() {
    J = !0, oe.forEach((M, O) => {
      ue.has(O) && ie.add(O), Dt(O);
    });
  }
  function Nn(M, O, k = {}) {
    A.fetchers.set(M, O), yt(
      { fetchers: new Map(A.fetchers) },
      { flushSync: (k && k.flushSync) === !0 }
    );
  }
  function mn(M, O, k, ae = {}) {
    let re = li(A.matches, O);
    aa(M), yt(
      {
        errors: {
          [re.route.id]: k
        },
        fetchers: new Map(A.fetchers)
      },
      { flushSync: (ae && ae.flushSync) === !0 }
    );
  }
  function ps(M) {
    return xe.set(M, (xe.get(M) || 0) + 1), we.has(M) && we.delete(M), A.fetchers.get(M) || JT;
  }
  function Du(M, O) {
    Dt(M, O?.reason), Nn(M, Ea(null));
  }
  function aa(M) {
    let O = A.fetchers.get(M);
    ue.has(M) && !(O && O.state === "loading" && F.has(M)) && Dt(M), oe.delete(M), F.delete(M), le.delete(M), we.delete(M), ie.delete(M), A.fetchers.delete(M);
  }
  function Ft(M) {
    let O = (xe.get(M) || 0) - 1;
    O <= 0 ? (xe.delete(M), we.add(M)) : xe.set(M, O), yt({ fetchers: new Map(A.fetchers) });
  }
  function Dt(M, O) {
    let k = ue.get(M);
    k && (k.abort(O), ue.delete(M));
  }
  function qt(M) {
    for (let O of M) {
      let k = ps(O), ae = Ea(k.data);
      A.fetchers.set(O, ae);
    }
  }
  function ys() {
    let M = [], O = !1;
    for (let k of le) {
      let ae = A.fetchers.get(k);
      _e(ae, `Expected fetcher: ${k}`), ae.state === "loading" && (le.delete(k), M.push(k), O = !0);
    }
    return qt(M), O;
  }
  function gs(M) {
    let O = [];
    for (let [k, ae] of F)
      if (ae < M) {
        let re = A.fetchers.get(k);
        _e(re, `Expected fetcher: ${k}`), re.state === "loading" && (Dt(k), F.delete(k), O.push(k));
      }
    return qt(O), O.length > 0;
  }
  function Nu(M, O) {
    let k = A.blockers.get(M) || Vr;
    return De.get(M) !== O && De.set(M, O), k;
  }
  function hi(M) {
    A.blockers.delete(M), De.delete(M);
  }
  function ia(M, O) {
    let k = A.blockers.get(M) || Vr;
    _e(
      k.state === "unblocked" && O.state === "blocked" || k.state === "blocked" && O.state === "blocked" || k.state === "blocked" && O.state === "proceeding" || k.state === "blocked" && O.state === "unblocked" || k.state === "proceeding" && O.state === "unblocked",
      `Invalid blocker state transition: ${k.state} -> ${O.state}`
    );
    let ae = new Map(A.blockers);
    ae.set(M, O), yt({ blockers: ae });
  }
  function mi({
    currentLocation: M,
    nextLocation: O,
    historyAction: k
  }) {
    if (De.size === 0)
      return;
    De.size > 1 && St(!1, "A router only supports one blocker at a time");
    let ae = Array.from(De.entries()), [re, pe] = ae[ae.length - 1], fe = A.blockers.get(re);
    if (!(fe && fe.state === "proceeding") && pe({ currentLocation: M, nextLocation: O, historyAction: k }))
      return re;
  }
  function zn(M) {
    let O = wn(404, { pathname: M }), k = p || h, { matches: ae, route: re } = _o(k);
    return { notFoundMatches: ae, route: re, error: O };
  }
  function $i(M, O, k) {
    if (w = M, D = O, R = k || null, !_ && A.navigation === Kf) {
      _ = !0;
      let ae = $l(A.location, A.matches);
      ae != null && yt({ restoreScrollPosition: ae });
    }
    return () => {
      w = null, D = null, R = null;
    };
  }
  function ja(M, O) {
    return R && R(
      M,
      O.map((ae) => TT(ae, A.loaderData))
    ) || M.key;
  }
  function zu(M, O) {
    if (w && D) {
      let k = ja(M, O);
      w[k] = D();
    }
  }
  function $l(M, O) {
    if (w) {
      let k = ja(M, O), ae = w[k];
      if (typeof ae == "number")
        return ae;
    }
    return null;
  }
  function Da(M, O, k) {
    if (t.patchRoutesOnNavigation)
      if (M) {
        if (Object.keys(M[0].params).length > 0)
          return { active: !0, matches: Fr(
            O,
            k,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: Fr(
          O,
          k,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function Pn(M, O, k, ae) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: M };
    let re = M;
    for (; ; ) {
      let pe = p == null, fe = p || h, de = d;
      try {
        await t.patchRoutesOnNavigation({
          signal: k,
          path: O,
          matches: re,
          fetcherKey: ae,
          patch: (Te, Se) => {
            k.aborted || Kg(
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
      let ge = ii(fe, O, m), he = null;
      if (ge) {
        if (Object.keys(ge[0].params).length === 0)
          return { type: "success", matches: ge };
        if (he = Fr(
          fe,
          O,
          m,
          !0
        ), !(he && re.length < he.length && vs(
          re,
          he.slice(0, re.length)
        )))
          return { type: "success", matches: ge };
      }
      if (he || (he = Fr(
        fe,
        O,
        m,
        !0
      )), !he || vs(re, he))
        return { type: "success", matches: null };
      re = he;
    }
  }
  function vs(M, O) {
    return M.length === O.length && M.every((k, ae) => k.route.id === O[ae].route.id);
  }
  function bs(M) {
    d = {}, p = Jr(
      M,
      c,
      void 0,
      d
    );
  }
  function Ss(M, O, k = !1) {
    let ae = p == null;
    Kg(
      M,
      O,
      p || h,
      d,
      c,
      k
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
      return A;
    },
    get routes() {
      return h;
    },
    get window() {
      return a;
    },
    initialize: ea,
    subscribe: kn,
    enableScrollRestoration: $i,
    navigate: Ca,
    fetch: Au,
    revalidate: di,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (M) => t.history.createHref(M),
    encodeLocation: (M) => t.history.encodeLocation(M),
    getFetcher: ps,
    resetFetcher: Du,
    deleteFetcher: Ft,
    dispose: Ra,
    getBlocker: Nu,
    deleteBlocker: hi,
    patchRoutes: Ss,
    _internalFetchControllers: ue,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: bs,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(M) {
      yt(M);
    }
  }, t.unstable_instrumentations && (te = YT(
    te,
    t.unstable_instrumentations.map((M) => M.router).filter(Boolean)
  )), te;
}
function tw(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Rd(t, a, l, s, o, c) {
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
  let p = yu(
    s || ".",
    nh(d),
    jn(t.pathname, l) || t.pathname,
    c === "path"
  );
  if (s == null && (p.search = t.search, p.hash = t.hash), (s == null || s === "" || s === ".") && h) {
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
  return l !== "/" && (p.pathname = UT({ basename: l, pathname: p.pathname })), Jn(p);
}
function Xg(t, a, l) {
  if (!l || !tw(l))
    return { path: a };
  if (l.formMethod && !Sw(l.formMethod))
    return {
      path: a,
      error: wn(405, { method: l.formMethod })
    };
  let s = () => ({
    path: a,
    error: wn(400, { type: "invalid-body" })
  }), c = (l.formMethod || "get").toUpperCase(), d = Mb(a);
  if (l.body !== void 0) {
    if (l.formEncType === "text/plain") {
      if (!Yt(c))
        return s();
      let b = typeof l.body == "string" ? l.body : l.body instanceof FormData || l.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(l.body.entries()).reduce(
          (S, [T, w]) => `${S}${T}=${w}
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
      if (!Yt(c))
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
    formAction: d,
    formEncType: l && l.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (Yt(m.formMethod))
    return { path: a, submission: m };
  let y = qn(a);
  return t && y.search && rh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: Jn(y), submission: m };
}
function $g(t, a, l, s, o, c, d, h, p, m, y, b, S, T, w, R, D, _, B, L, V) {
  let $ = L ? dn(L[1]) ? L[1].error : L[1].data : void 0, K = o.createURL(c.location), te = o.createURL(p), A;
  if (y && c.errors) {
    let I = Object.keys(c.errors)[0];
    A = d.findIndex((N) => N.route.id === I);
  } else if (L && dn(L[1])) {
    let I = L[0];
    A = d.findIndex((N) => N.route.id === I) - 1;
  }
  let Q = L ? L[1].statusCode : void 0, ne = Q && Q >= 400, ce = {
    currentUrl: K,
    currentParams: c.matches[0]?.params || {},
    nextUrl: te,
    nextParams: d[0].params,
    ...h,
    actionResult: $,
    actionStatus: Q
  }, W = is(d), se = d.map((I, N) => {
    let { route: J } = I, ie = null;
    if (A != null && N > A)
      ie = !1;
    else if (J.lazy)
      ie = !0;
    else if (!ih(J))
      ie = !1;
    else if (y) {
      let { shouldLoad: F } = Sb(
        J,
        c.loaderData,
        c.errors
      );
      ie = F;
    } else nw(c.loaderData, c.matches[N], I) && (ie = !0);
    if (ie !== null)
      return Cd(
        l,
        s,
        t,
        p,
        W,
        I,
        m,
        a,
        ie
      );
    let ue = !1;
    typeof V == "boolean" ? ue = V : ne ? ue = !1 : (b || K.pathname + K.search === te.pathname + te.search || K.search !== te.search || aw(c.matches[N], I)) && (ue = !0);
    let Re = {
      ...ce,
      defaultShouldRevalidate: ue
    }, j = $r(I, Re);
    return Cd(
      l,
      s,
      t,
      p,
      W,
      I,
      m,
      a,
      j,
      Re,
      V
    );
  }), G = [];
  return w.forEach((I, N) => {
    if (y || !d.some((oe) => oe.route.id === I.routeId) || T.has(N))
      return;
    let J = c.fetchers.get(N), ie = J && J.state !== "idle" && J.data === void 0, ue = ii(D, I.path, _);
    if (!ue) {
      if (B && ie)
        return;
      G.push({
        key: N,
        routeId: I.routeId,
        path: I.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (R.has(N))
      return;
    let Re = Fo(ue, I.path), j = new AbortController(), F = Nl(
      o,
      I.path,
      j.signal
    ), le = null;
    if (S.has(N))
      S.delete(N), le = Bl(
        l,
        s,
        F,
        I.path,
        ue,
        Re,
        m,
        a
      );
    else if (ie)
      b && (le = Bl(
        l,
        s,
        F,
        I.path,
        ue,
        Re,
        m,
        a
      ));
    else {
      let oe;
      typeof V == "boolean" ? oe = V : ne ? oe = !1 : oe = b;
      let xe = {
        ...ce,
        defaultShouldRevalidate: oe
      };
      $r(Re, xe) && (le = Bl(
        l,
        s,
        F,
        I.path,
        ue,
        Re,
        m,
        a,
        xe
      ));
    }
    le && G.push({
      key: N,
      routeId: I.routeId,
      path: I.path,
      matches: le,
      match: Re,
      request: F,
      controller: j
    });
  }), { dsMatches: se, revalidatingFetchers: G };
}
function ih(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Sb(t, a, l) {
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
function nw(t, a, l) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    l.route.id !== a.route.id
  ), o = !t.hasOwnProperty(l.route.id);
  return s || o;
}
function aw(t, a) {
  let l = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    l != null && l.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function $r(t, a) {
  if (t.route.shouldRevalidate) {
    let l = t.route.shouldRevalidate(a);
    if (typeof l == "boolean")
      return l;
  }
  return a.defaultShouldRevalidate;
}
function Kg(t, a, l, s, o, c) {
  let d;
  if (t) {
    let m = s[t];
    _e(
      m,
      `No route found to patch children into: routeId = ${t}`
    ), m.children || (m.children = []), d = m.children;
  } else
    d = l;
  let h = [], p = [];
  if (a.forEach((m) => {
    let y = d.find(
      (b) => xb(m, b)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : h.push(m);
  }), h.length > 0) {
    let m = Jr(
      h,
      o,
      [t || "_", "patch", String(d?.length || "0")],
      s
    );
    d.push(...m);
  }
  if (c && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: b } = p[m], S = y, [T] = Jr(
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
function xb(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (l, s) => a.children?.some((o) => xb(l, o))
  ) ?? !1 : !1;
}
var Qg = /* @__PURE__ */ new WeakMap(), Eb = ({
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
  let d = Qg.get(o);
  d || (d = {}, Qg.set(o, d));
  let h = d[t];
  if (h)
    return h;
  let p = (async () => {
    let m = bT(t), b = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (m)
      St(
        !m,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), d[t] = Promise.resolve();
    else if (b)
      St(
        !1,
        `Route "${o.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let S = await c();
      S != null && (Object.assign(o, { [t]: S }), Object.assign(o, s(o)));
    }
    typeof o.lazy == "object" && (o.lazy[t] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return d[t] = p, p;
}, Ig = /* @__PURE__ */ new WeakMap();
function iw(t, a, l, s, o) {
  let c = l[t.id];
  if (_e(c, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let y = Ig.get(c);
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
      let S = await t.lazy(), T = {};
      for (let w in S) {
        let R = S[w];
        if (R === void 0)
          continue;
        let D = xT(w), B = c[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        D ? St(
          !D,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : B ? St(
          !B,
          `Route "${c.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : T[w] = R;
      }
      Object.assign(c, T), Object.assign(c, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(c),
        lazy: void 0
      });
    })();
    return Ig.set(c, b), b.catch(() => {
    }), {
      lazyRoutePromise: b,
      lazyHandlerPromise: b
    };
  }
  let d = Object.keys(t.lazy), h = [], p;
  for (let y of d) {
    if (o && o.includes(y))
      continue;
    let b = Eb({
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
async function lw(t) {
  return t.matches.some((a) => a.route.middleware) ? Tb(t, () => Zg(t)) : Zg(t);
}
function Tb(t, a) {
  return rw(
    t,
    a,
    (s) => {
      if (bw(s))
        throw s;
      return s;
    },
    pw,
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
      let { matches: d } = t, h = Math.min(
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
      ), p = li(
        d,
        d[h].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: s }
      });
    }
  }
}
async function rw(t, a, l, s, o) {
  let { matches: c, ...d } = t, h = c.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await wb(
    d,
    h,
    a,
    l,
    s,
    o
  );
}
async function wb(t, a, l, s, o, c, d = 0) {
  let { request: h } = t;
  if (h.signal.aborted)
    throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let p = a[d];
  if (!p)
    return await l();
  let [m, y] = p, b, S = async () => {
    if (b)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return b = { value: await wb(
        t,
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
    let T = await y(t, S), w = T != null ? s(T) : void 0;
    return o(w) ? w : b ? w ?? b.value : (b = { value: await S() }, b.value);
  } catch (T) {
    return await c(T, m, b);
  }
}
function Rb(t, a, l, s, o) {
  let c = Eb({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: t
  }), d = iw(
    s.route,
    Yt(l.method) ? "action" : "loader",
    a,
    t,
    o
  );
  return {
    middleware: c,
    route: d.lazyRoutePromise,
    handler: d.lazyHandlerPromise
  };
}
function Cd(t, a, l, s, o, c, d, h, p, m = null, y) {
  let b = !1, S = Rb(
    t,
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
      return b = !0, m ? typeof y == "boolean" ? $r(c, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof T == "boolean" ? $r(c, {
        ...m,
        defaultShouldRevalidate: T
      }) : $r(c, m) : p;
    },
    resolve(T) {
      let { lazy: w, loader: R, middleware: D } = c.route, _ = b || p || T && !Yt(l.method) && (w || R), B = D && D.length > 0 && !R && !w;
      return _ && (Yt(l.method) || !B) ? ow({
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
function Bl(t, a, l, s, o, c, d, h, p = null) {
  return o.map((m) => m.route.id !== c.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: Rb(
      t,
      a,
      l,
      m,
      d
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Cd(
    t,
    a,
    l,
    s,
    is(o),
    m,
    d,
    h,
    !0,
    p
  ));
}
async function sw(t, a, l, s, o, c, d) {
  s.some((y) => y._lazyPromises?.middleware) && await Promise.all(s.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    unstable_url: Cb(a, l),
    unstable_pattern: is(s),
    params: s[0].params,
    context: c,
    matches: s
  }, m = await t({
    ...h,
    fetcherKey: o,
    runClientMiddleware: (y) => {
      let b = h;
      return Tb(b, () => y({
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
async function ow({
  request: t,
  path: a,
  unstable_pattern: l,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: d,
  scopedContext: h
}) {
  let p, m, y = Yt(t.method), b = y ? "action" : "loader", S = (T) => {
    let w, R = new Promise((B, L) => w = L);
    m = () => w(), t.signal.addEventListener("abort", m);
    let D = (B) => typeof T != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${b}" [routeId: ${s.route.id}]`
      )
    ) : T(
      {
        request: t,
        unstable_url: Cb(t, a),
        unstable_pattern: l,
        params: s.params,
        context: h
      },
      ...B !== void 0 ? [B] : []
    ), _ = (async () => {
      try {
        return { type: "data", result: await (d ? d((L) => D(L)) : D()) };
      } catch (B) {
        return { type: "error", result: B };
      }
    })();
    return Promise.race([_, R]);
  };
  try {
    let T = y ? s.route.action : s.route.loader;
    if (o || c)
      if (T) {
        let w, [R] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(T).catch((D) => {
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
          [p] = await Promise.all([S(w), c]);
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
    else if (T)
      p = await S(T);
    else {
      let w = new URL(t.url), R = w.pathname + w.search;
      throw wn(404, {
        pathname: R
      });
    }
  } catch (T) {
    return { type: "error", result: T };
  } finally {
    m && t.signal.removeEventListener("abort", m);
  }
  return p;
}
async function uw(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function cw(t) {
  let { result: a, type: l } = t;
  if (lh(a)) {
    let s;
    try {
      s = await uw(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return l === "error" ? {
      type: "error",
      error: new gu(a.status, a.statusText, s),
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
    error: mw(a),
    statusCode: Wr(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Wr(a) ? a.status : void 0
  } : iv(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function fw(t, a, l, s, o) {
  let c = t.headers.get("Location");
  if (_e(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !th(c)) {
    let d = s.slice(
      0,
      s.findIndex((h) => h.route.id === l) + 1
    );
    c = Rd(
      new URL(a.url),
      d,
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
    let d = jn(c.pathname, l) != null;
    if (c.origin === a.origin && d)
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
function Nl(t, a, l, s) {
  let o = t.createURL(Mb(a)).toString(), c = { signal: l };
  if (s && Yt(s.formMethod)) {
    let { formMethod: d, formEncType: h } = s;
    c.method = d.toUpperCase(), h === "application/json" ? (c.headers = new Headers({ "Content-Type": h }), c.body = JSON.stringify(s.json)) : h === "text/plain" ? c.body = s.text : h === "application/x-www-form-urlencoded" && s.formData ? c.body = Md(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function Cb(t, a) {
  let l = new URL(t.url), s = typeof a == "string" ? qn(a) : a;
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
function dw(t, a, l, s = !1, o = !1) {
  let c = {}, d = null, h, p = !1, m = {}, y = l && dn(l[1]) ? l[1].error : void 0;
  return t.forEach((b) => {
    if (!(b.route.id in a))
      return;
    let S = b.route.id, T = a[S];
    if (_e(
      !Vi(T),
      "Cannot handle redirect results in processLoaderData"
    ), dn(T)) {
      let w = T.error;
      if (y !== void 0 && (w = y, y = void 0), d = d || {}, o)
        d[S] = w;
      else {
        let R = li(t, S);
        d[R.route.id] == null && (d[R.route.id] = w);
      }
      s || (c[S] = bb), p || (p = !0, h = Wr(T.error) ? T.error.status : 500), T.headers && (m[S] = T.headers);
    } else
      c[S] = T.data, T.statusCode && T.statusCode !== 200 && !p && (h = T.statusCode), T.headers && (m[S] = T.headers);
  }), y !== void 0 && l && (d = { [l[0]]: y }, l[2] && (c[l[2]] = void 0)), {
    loaderData: c,
    errors: d,
    statusCode: h || 200,
    loaderHeaders: m
  };
}
function tv(t, a, l, s, o, c) {
  let { loaderData: d, errors: h } = dw(
    a,
    l,
    s
  );
  return o.filter((p) => !p.matches || p.matches.some((m) => m.shouldLoad)).forEach((p) => {
    let { key: m, match: y, controller: b } = p;
    if (b && b.signal.aborted)
      return;
    let S = c[m];
    if (_e(S, "Did not find corresponding fetcher result"), dn(S)) {
      let T = li(t.matches, y?.route.id);
      h && h[T.route.id] || (h = {
        ...h,
        [T.route.id]: S.error
      }), t.fetchers.delete(m);
    } else if (Vi(S))
      _e(!1, "Unhandled fetcher revalidation redirect");
    else {
      let T = Ea(S.data);
      t.fetchers.set(m, T);
    }
  }), { loaderData: d, errors: h };
}
function nv(t, a, l, s) {
  let o = Object.entries(a).filter(([, c]) => c !== bb).reduce((c, [d, h]) => (c[d] = h, c), {});
  for (let c of l) {
    let d = c.route.id;
    if (!a.hasOwnProperty(d) && t.hasOwnProperty(d) && c.route.loader && (o[d] = t[d]), s && s.hasOwnProperty(d))
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
function li(t, a) {
  return (a ? t.slice(0, t.findIndex((s) => s.route.id === a) + 1) : [...t]).reverse().find((s) => s.route.hasErrorBoundary === !0) || t[0];
}
function _o(t) {
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
  let d = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return t === 400 ? (d = "Bad Request", s && a && l ? h = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${l}", so there is no way to handle the request.` : o === "invalid-body" && (h = "Unable to encode submission body")) : t === 403 ? (d = "Forbidden", h = `Route "${l}" does not match URL "${a}"`) : t === 404 ? (d = "Not Found", h = `No route matches URL "${a}"`) : t === 405 && (d = "Method Not Allowed", s && a && l ? h = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${l}", so there is no way to handle the request.` : s && (h = `Invalid request method "${s.toUpperCase()}"`)), new gu(
    t || 500,
    d,
    new Error(h),
    !0
  );
}
function Oo(t) {
  let a = Object.entries(t);
  for (let l = a.length - 1; l >= 0; l--) {
    let [s, o] = a[l];
    if (Vi(o))
      return { key: s, result: o };
  }
}
function Mb(t) {
  let a = typeof t == "string" ? qn(t) : t;
  return Jn({ ...a, hash: "" });
}
function hw(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function mw(t) {
  return new gu(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function pw(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, l]) => typeof a == "string" && yw(l)
  );
}
function yw(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function gw(t) {
  return lh(t.result) && gb.has(t.result.status);
}
function dn(t) {
  return t.type === "error";
}
function Vi(t) {
  return (t && t.type) === "redirect";
}
function iv(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function lh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function vw(t) {
  return gb.has(t);
}
function bw(t) {
  return lh(t) && vw(t.status) && t.headers.has("Location");
}
function Sw(t) {
  return IT.has(t.toUpperCase());
}
function Yt(t) {
  return KT.has(t.toUpperCase());
}
function rh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function Fo(t, a) {
  let l = typeof a == "string" ? qn(a).search : a.search;
  if (t[t.length - 1].route.index && rh(l || ""))
    return t[t.length - 1];
  let s = db(t);
  return s[s.length - 1];
}
function lv(t) {
  let { formMethod: a, formAction: l, formEncType: s, text: o, formData: c, json: d } = t;
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
function xw(t, a) {
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
function Br(t, a) {
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
function Ew(t, a) {
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
function Tw(t, a) {
  try {
    let l = t.sessionStorage.getItem(
      vb
    );
    if (l) {
      let s = JSON.parse(l);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function ww(t, a) {
  if (a.size > 0) {
    let l = {};
    for (let [s, o] of a)
      l[s] = [...o];
    try {
      t.sessionStorage.setItem(
        vb,
        JSON.stringify(l)
      );
    } catch (s) {
      St(
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
var Yi = x.createContext(null);
Yi.displayName = "DataRouter";
var ls = x.createContext(null);
ls.displayName = "DataRouterState";
var Ab = x.createContext(!1);
function jb() {
  return x.useContext(Ab);
}
var sh = x.createContext({
  isTransitioning: !1
});
sh.displayName = "ViewTransition";
var Db = x.createContext(
  /* @__PURE__ */ new Map()
);
Db.displayName = "Fetchers";
var Rw = x.createContext(null);
Rw.displayName = "Await";
var Dn = x.createContext(
  null
);
Dn.displayName = "Navigation";
var vu = x.createContext(
  null
);
vu.displayName = "Location";
var Ta = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ta.displayName = "Route";
var oh = x.createContext(null);
oh.displayName = "RouteError";
var Nb = "REACT_ROUTER_ERROR", Cw = "REDIRECT", Mw = "ROUTE_ERROR_RESPONSE";
function Aw(t) {
  if (t.startsWith(`${Nb}:${Cw}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function jw(t) {
  if (t.startsWith(
    `${Nb}:${Mw}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new gu(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function Dw(t, { relative: a } = {}) {
  _e(
    rs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: l, navigator: s } = x.useContext(Dn), { hash: o, pathname: c, search: d } = ss(t, { relative: a }), h = c;
  return l !== "/" && (h = c === "/" ? l : Mn([l, c])), s.createHref({ pathname: h, search: d, hash: o });
}
function rs() {
  return x.useContext(vu) != null;
}
function wa() {
  return _e(
    rs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(vu).location;
}
var zb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function _b(t) {
  x.useContext(Dn).static || x.useLayoutEffect(t);
}
function Gi() {
  let { isDataRoute: t } = x.useContext(Ta);
  return t ? Pw() : Nw();
}
function Nw() {
  _e(
    rs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = x.useContext(Yi), { basename: a, navigator: l } = x.useContext(Dn), { matches: s } = x.useContext(Ta), { pathname: o } = wa(), c = JSON.stringify(nh(s)), d = x.useRef(!1);
  return _b(() => {
    d.current = !0;
  }), x.useCallback(
    (p, m = {}) => {
      if (St(d.current, zb), !d.current) return;
      if (typeof p == "number") {
        l.go(p);
        return;
      }
      let y = yu(
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
x.createContext(null);
function ss(t, { relative: a } = {}) {
  let { matches: l } = x.useContext(Ta), { pathname: s } = wa(), o = JSON.stringify(nh(l));
  return x.useMemo(
    () => yu(
      t,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [t, o, s, a]
  );
}
function zw(t, a, l) {
  _e(
    rs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = x.useContext(Dn), { matches: o } = x.useContext(Ta), c = o[o.length - 1], d = c ? c.params : {}, h = c ? c.pathname : "/", p = c ? c.pathnameBase : "/", m = c && c.route;
  {
    let D = m && m.path || "";
    Ub(
      h,
      !m || D.endsWith("*") || D.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${D}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${D}"> to <Route path="${D === "/" ? "*" : `${D}/*`}">.`
    );
  }
  let y = wa(), b;
  b = y;
  let S = b.pathname || "/", T = S;
  if (p !== "/") {
    let D = p.replace(/^\//, "").split("/");
    T = "/" + S.replace(/^\//, "").split("/").slice(D.length).join("/");
  }
  let w = ii(t, { pathname: T });
  return St(
    m || w != null,
    `No routes matched location "${b.pathname}${b.search}${b.hash}" `
  ), St(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), Vw(
    w && w.map(
      (D) => Object.assign({}, D, {
        params: Object.assign({}, d, D.params),
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
function _w() {
  let t = kw(), a = Wr(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), l = t instanceof Error ? t.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, d = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), d = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, a), l ? /* @__PURE__ */ x.createElement("pre", { style: o }, l) : null, d);
}
var Ow = /* @__PURE__ */ x.createElement(_w, null), Ob = class extends x.Component {
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
      const l = jw(t.digest);
      l && (t = l);
    }
    let a = t !== void 0 ? /* @__PURE__ */ x.createElement(Ta.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      oh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ x.createElement(Lw, { error: t }, a) : a;
  }
};
Ob.contextType = Ab;
var If = /* @__PURE__ */ new WeakMap();
function Lw({
  children: t,
  error: a
}) {
  let { basename: l } = x.useContext(Dn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = Aw(a.digest);
    if (s) {
      let o = If.get(a);
      if (o) throw o;
      let c = mb(s.location, l);
      if (hb && !If.get(a))
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
  return t;
}
function Uw({ routeContext: t, match: a, children: l }) {
  let s = x.useContext(Yi);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ x.createElement(Ta.Provider, { value: t }, l);
}
function Vw(t, a = [], l) {
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
  let d = !1, h = -1;
  if (l && s) {
    d = s.renderFallback;
    for (let y = 0; y < o.length; y++) {
      let b = o[y];
      if ((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (h = y), b.route.id) {
        let { loaderData: S, errors: T } = s, w = b.route.loader && !S.hasOwnProperty(b.route.id) && (!T || T[b.route.id] === void 0);
        if (b.route.lazy || w) {
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
      unstable_pattern: is(s.matches),
      errorInfo: b
    });
  } : void 0;
  return o.reduceRight(
    (y, b, S) => {
      let T, w = !1, R = null, D = null;
      s && (T = c && b.route.id ? c[b.route.id] : void 0, R = b.route.errorElement || Ow, d && (h < 0 && S === 0 ? (Ub(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, D = null) : h === S && (w = !0, D = b.route.hydrateFallbackElement || null)));
      let _ = a.concat(o.slice(0, S + 1)), B = () => {
        let L;
        return T ? L = R : w ? L = D : b.route.Component ? L = /* @__PURE__ */ x.createElement(b.route.Component, null) : b.route.element ? L = b.route.element : L = y, /* @__PURE__ */ x.createElement(
          Uw,
          {
            match: b,
            routeContext: {
              outlet: y,
              matches: _,
              isDataRoute: s != null
            },
            children: L
          }
        );
      };
      return s && (b.route.ErrorBoundary || b.route.errorElement || S === 0) ? /* @__PURE__ */ x.createElement(
        Ob,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: R,
          error: T,
          children: B(),
          routeContext: { outlet: null, matches: _, isDataRoute: !0 },
          onError: m
        }
      ) : B();
    },
    null
  );
}
function uh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Bw(t) {
  let a = x.useContext(Yi);
  return _e(a, uh(t)), a;
}
function Lb(t) {
  let a = x.useContext(ls);
  return _e(a, uh(t)), a;
}
function Hw(t) {
  let a = x.useContext(Ta);
  return _e(a, uh(t)), a;
}
function bu(t) {
  let a = Hw(t), l = a.matches[a.matches.length - 1];
  return _e(
    l.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), l.route.id;
}
function qw() {
  return bu(
    "useRouteId"
    /* UseRouteId */
  );
}
function os() {
  let t = Lb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = bu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function kw() {
  let t = x.useContext(oh), a = Lb(
    "useRouteError"
    /* UseRouteError */
  ), l = bu(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[l];
}
function Pw() {
  let { router: t } = Bw(
    "useNavigate"
    /* UseNavigateStable */
  ), a = bu(
    "useNavigate"
    /* UseNavigateStable */
  ), l = x.useRef(!1);
  return _b(() => {
    l.current = !0;
  }), x.useCallback(
    async (o, c = {}) => {
      St(l.current, zb), l.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...c }));
    },
    [t, a]
  );
}
var sv = {};
function Ub(t, a, l) {
  !a && !sv[t] && (sv[t] = !0, St(!1, l));
}
var ov = {};
function uv(t, a) {
  !t && !ov[a] && (ov[a] = !0, console.warn(a));
}
var Yw = "useOptimistic", cv = lT[Yw], Gw = () => {
};
function Fw(t) {
  return cv ? cv(t) : [t, Gw];
}
function Xw(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && St(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: x.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && St(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: x.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && St(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: x.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var $w = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function Kw(t, a) {
  return ew({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: pT({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: $w,
    mapRouteProperties: Xw,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var Qw = class {
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
function Iw({
  router: t,
  flushSync: a,
  onError: l,
  unstable_useTransitions: s
}) {
  s = jb() || s;
  let [c, d] = x.useState(t.state), [h, p] = Fw(c), [m, y] = x.useState(), [b, S] = x.useState({
    isTransitioning: !1
  }), [T, w] = x.useState(), [R, D] = x.useState(), [_, B] = x.useState(), L = x.useRef(/* @__PURE__ */ new Map()), V = x.useCallback(
    (Q, { deletedFetchers: ne, newErrors: ce, flushSync: W, viewTransitionOpts: se }) => {
      ce && l && Object.values(ce).forEach(
        (I) => l(I, {
          location: Q.location,
          params: Q.matches[0]?.params ?? {},
          unstable_pattern: is(Q.matches)
        })
      ), Q.fetchers.forEach((I, N) => {
        I.data !== void 0 && L.current.set(N, I.data);
      }), ne.forEach((I) => L.current.delete(I)), uv(
        W === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let G = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (uv(
        se == null || G,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !se || !G) {
        a && W ? a(() => d(Q)) : s === !1 ? d(Q) : x.startTransition(() => {
          s === !0 && p((I) => fv(I, Q)), d(Q);
        });
        return;
      }
      if (a && W) {
        a(() => {
          R && (T?.resolve(), R.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: se.currentLocation,
            nextLocation: se.nextLocation
          });
        });
        let I = t.window.document.startViewTransition(() => {
          a(() => d(Q));
        });
        I.finished.finally(() => {
          a(() => {
            w(void 0), D(void 0), y(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => D(I));
        return;
      }
      R ? (T?.resolve(), R.skipTransition(), B({
        state: Q,
        currentLocation: se.currentLocation,
        nextLocation: se.nextLocation
      })) : (y(Q), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: se.currentLocation,
        nextLocation: se.nextLocation
      }));
    },
    [
      t.window,
      a,
      R,
      T,
      s,
      p,
      l
    ]
  );
  x.useLayoutEffect(() => t.subscribe(V), [t, V]);
  let $ = h.initialized;
  x.useLayoutEffect(() => {
    !$ && t.state.initialized && V(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [$, V, t.state]), x.useEffect(() => {
    b.isTransitioning && !b.flushSync && w(new Qw());
  }, [b]), x.useEffect(() => {
    if (T && m && t.window) {
      let Q = m, ne = T.promise, ce = t.window.document.startViewTransition(async () => {
        s === !1 ? d(Q) : x.startTransition(() => {
          s === !0 && p((W) => fv(W, Q)), d(Q);
        }), await ne;
      });
      ce.finished.finally(() => {
        w(void 0), D(void 0), y(void 0), S({ isTransitioning: !1 });
      }), D(ce);
    }
  }, [
    m,
    T,
    t.window,
    s,
    p
  ]), x.useEffect(() => {
    T && m && h.location.key === m.location.key && T.resolve();
  }, [T, R, h.location, m]), x.useEffect(() => {
    !b.isTransitioning && _ && (y(_.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: _.currentLocation,
      nextLocation: _.nextLocation
    }), B(void 0));
  }, [b.isTransitioning, _]);
  let K = x.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (Q) => t.navigate(Q),
    push: (Q, ne, ce) => t.navigate(Q, {
      state: ne,
      preventScrollReset: ce?.preventScrollReset
    }),
    replace: (Q, ne, ce) => t.navigate(Q, {
      replace: !0,
      state: ne,
      preventScrollReset: ce?.preventScrollReset
    })
  }), [t]), te = t.basename || "/", A = x.useMemo(
    () => ({
      router: t,
      navigator: K,
      static: !1,
      basename: te,
      onError: l
    }),
    [t, K, te, l]
  );
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(Yi.Provider, { value: A }, /* @__PURE__ */ x.createElement(ls.Provider, { value: h }, /* @__PURE__ */ x.createElement(Db.Provider, { value: L.current }, /* @__PURE__ */ x.createElement(sh.Provider, { value: b }, /* @__PURE__ */ x.createElement(
    Ww,
    {
      basename: te,
      location: h.location,
      navigationType: h.historyAction,
      navigator: K,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ x.createElement(
      Zw,
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
var Zw = x.memo(Jw);
function Jw({
  routes: t,
  future: a,
  state: l,
  isStatic: s,
  onError: o
}) {
  return zw(t, void 0, { state: l, isStatic: s, onError: o });
}
function Ww({
  basename: t = "/",
  children: a = null,
  location: l,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: d
}) {
  _e(
    !rs(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = t.replace(/^\/*/, "/"), p = x.useMemo(
    () => ({
      basename: h,
      navigator: o,
      static: c,
      unstable_useTransitions: d,
      future: {}
    }),
    [h, o, c, d]
  );
  typeof l == "string" && (l = qn(l));
  let {
    pathname: m = "/",
    search: y = "",
    hash: b = "",
    state: S = null,
    key: T = "default",
    unstable_mask: w
  } = l, R = x.useMemo(() => {
    let D = jn(m, h);
    return D == null ? null : {
      location: {
        pathname: D,
        search: y,
        hash: b,
        state: S,
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
    S,
    T,
    s,
    w
  ]);
  return St(
    R != null,
    `<Router basename="${h}"> is not able to match the URL "${m}${y}${b}" because it does not start with the basename, so the <Router> won't render anything.`
  ), R == null ? null : /* @__PURE__ */ x.createElement(Dn.Provider, { value: p }, /* @__PURE__ */ x.createElement(vu.Provider, { children: a, value: R }));
}
var Xo = "get", $o = "application/x-www-form-urlencoded";
function Su(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function eR(t) {
  return Su(t) && t.tagName.toLowerCase() === "button";
}
function tR(t) {
  return Su(t) && t.tagName.toLowerCase() === "form";
}
function nR(t) {
  return Su(t) && t.tagName.toLowerCase() === "input";
}
function aR(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function iR(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !aR(t);
}
var Lo = null;
function lR() {
  if (Lo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Lo = !1;
    } catch {
      Lo = !0;
    }
  return Lo;
}
var rR = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Zf(t) {
  return t != null && !rR.has(t) ? (St(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${$o}"`
  ), null) : t;
}
function sR(t, a) {
  let l, s, o, c, d;
  if (tR(t)) {
    let h = t.getAttribute("action");
    s = h ? jn(h, a) : null, l = t.getAttribute("method") || Xo, o = Zf(t.getAttribute("enctype")) || $o, c = new FormData(t);
  } else if (eR(t) || nR(t) && (t.type === "submit" || t.type === "image")) {
    let h = t.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = t.getAttribute("formaction") || h.getAttribute("action");
    if (s = p ? jn(p, a) : null, l = t.getAttribute("formmethod") || h.getAttribute("method") || Xo, o = Zf(t.getAttribute("formenctype")) || Zf(h.getAttribute("enctype")) || $o, c = new FormData(h, t), !lR()) {
      let { name: m, type: y, value: b } = t;
      if (y === "image") {
        let S = m ? `${m}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else m && c.append(m, b);
    }
  } else {
    if (Su(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    l = Xo, s = null, o = $o, d = t;
  }
  return c && o === "text/plain" && (d = c, c = void 0), { action: s, method: l.toLowerCase(), encType: o, formData: c, body: d };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function ch(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Vb(t, a, l, s) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return l ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && jn(o.pathname, a) === "/" ? o.pathname = `${iu(a)}/_root.${s}` : o.pathname = `${iu(o.pathname)}.${s}`, o;
}
async function oR(t, a) {
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
function uR(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function cR(t, a, l) {
  let s = await Promise.all(
    t.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let d = await oR(c, l);
        return d.links ? d.links() : [];
      }
      return [];
    })
  );
  return mR(
    s.flat(1).filter(uR).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function dv(t, a, l, s, o, c) {
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
function fR(t, a, { includeHydrateFallback: l } = {}) {
  return dR(
    t.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), l && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function dR(t) {
  return [...new Set(t)];
}
function hR(t) {
  let a = {}, l = Object.keys(t).sort();
  for (let s of l)
    a[s] = t[s];
  return a;
}
function mR(t, a) {
  let l = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((s, o) => {
    let c = JSON.stringify(hR(o));
    return l.has(c) || (l.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function fh() {
  let t = x.useContext(Yi);
  return ch(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function pR() {
  let t = x.useContext(ls);
  return ch(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var dh = x.createContext(void 0);
dh.displayName = "FrameworkContext";
function hh() {
  let t = x.useContext(dh);
  return ch(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function yR(t, a) {
  let l = x.useContext(dh), [s, o] = x.useState(!1), [c, d] = x.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: b } = a, S = x.useRef(null);
  x.useEffect(() => {
    if (t === "render" && d(!0), t === "viewport") {
      let R = (_) => {
        _.forEach((B) => {
          d(B.isIntersecting);
        });
      }, D = new IntersectionObserver(R, { threshold: 0.5 });
      return S.current && D.observe(S.current), () => {
        D.disconnect();
      };
    }
  }, [t]), x.useEffect(() => {
    if (s) {
      let R = setTimeout(() => {
        d(!0);
      }, 100);
      return () => {
        clearTimeout(R);
      };
    }
  }, [s]);
  let T = () => {
    o(!0);
  }, w = () => {
    o(!1), d(!1);
  };
  return l ? t !== "intent" ? [c, S, {}] : [
    c,
    S,
    {
      onFocus: Hr(h, T),
      onBlur: Hr(p, w),
      onMouseEnter: Hr(m, T),
      onMouseLeave: Hr(y, w),
      onTouchStart: Hr(b, T)
    }
  ] : [!1, S, {}];
}
function Hr(t, a) {
  return (l) => {
    t && t(l), l.defaultPrevented || a(l);
  };
}
function gR({ page: t, ...a }) {
  let l = jb(), { router: s } = fh(), o = x.useMemo(
    () => ii(s.routes, t, s.basename),
    [s.routes, t, s.basename]
  );
  return o ? l ? /* @__PURE__ */ x.createElement(bR, { page: t, matches: o, ...a }) : /* @__PURE__ */ x.createElement(SR, { page: t, matches: o, ...a }) : null;
}
function vR(t) {
  let { manifest: a, routeModules: l } = hh(), [s, o] = x.useState([]);
  return x.useEffect(() => {
    let c = !1;
    return cR(t, a, l).then(
      (d) => {
        c || o(d);
      }
    ), () => {
      c = !0;
    };
  }, [t, a, l]), s;
}
function bR({
  page: t,
  matches: a,
  ...l
}) {
  let s = wa(), { future: o } = hh(), { basename: c } = fh(), d = x.useMemo(() => {
    if (t === s.pathname + s.search + s.hash)
      return [];
    let h = Vb(
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
  return /* @__PURE__ */ x.createElement(x.Fragment, null, d.map((h) => /* @__PURE__ */ x.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...l })));
}
function SR({
  page: t,
  matches: a,
  ...l
}) {
  let s = wa(), { future: o, manifest: c, routeModules: d } = hh(), { basename: h } = fh(), { loaderData: p, matches: m } = pR(), y = x.useMemo(
    () => dv(
      t,
      a,
      m,
      c,
      s,
      "data"
    ),
    [t, a, m, c, s]
  ), b = x.useMemo(
    () => dv(
      t,
      a,
      m,
      c,
      s,
      "assets"
    ),
    [t, a, m, c, s]
  ), S = x.useMemo(() => {
    if (t === s.pathname + s.search + s.hash)
      return [];
    let R = /* @__PURE__ */ new Set(), D = !1;
    if (a.forEach((B) => {
      let L = c.routes[B.route.id];
      !L || !L.hasLoader || (!y.some((V) => V.route.id === B.route.id) && B.route.id in p && d[B.route.id]?.shouldRevalidate || L.hasClientLoader ? D = !0 : R.add(B.route.id));
    }), R.size === 0)
      return [];
    let _ = Vb(
      t,
      h,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return D && R.size > 0 && _.searchParams.set(
      "_routes",
      a.filter((B) => R.has(B.route.id)).map((B) => B.route.id).join(",")
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
    d
  ]), T = x.useMemo(
    () => fR(b, c),
    [b, c]
  ), w = vR(b);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, S.map((R) => /* @__PURE__ */ x.createElement("link", { key: R, rel: "prefetch", as: "fetch", href: R, ...l })), T.map((R) => /* @__PURE__ */ x.createElement("link", { key: R, rel: "modulepreload", href: R, ...l })), w.map(({ key: R, link: D }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement(
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
function xR(...t) {
  return (a) => {
    t.forEach((l) => {
      typeof l == "function" ? l(a) : l != null && (l.current = a);
    });
  };
}
var ER = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  ER && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Bb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, us = x.forwardRef(
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
    ...w
  }, R) {
    let { basename: D, navigator: _, unstable_useTransitions: B } = x.useContext(Dn), L = typeof y == "string" && Bb.test(y), V = mb(y, D);
    y = V.to;
    let $ = Dw(y, { relative: o }), K = wa(), te = null;
    if (h) {
      let I = yu(
        h,
        [],
        K.unstable_mask ? K.unstable_mask.pathname : "/",
        !0
      );
      D !== "/" && (I.pathname = I.pathname === "/" ? D : Mn([D, I.pathname])), te = _.createHref(I);
    }
    let [A, Q, ne] = yR(
      s,
      w
    ), ce = CR(y, {
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
    function W(I) {
      a && a(I), I.defaultPrevented || ce(I);
    }
    let se = !(V.isExternal || c), G = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...w,
          ...ne,
          href: (se ? te : void 0) || V.absoluteURL || $,
          onClick: se ? W : a,
          ref: xR(R, Q),
          target: m,
          "data-discover": !L && l === "render" ? "true" : void 0
        }
      )
    );
    return A && !L ? /* @__PURE__ */ x.createElement(x.Fragment, null, G, /* @__PURE__ */ x.createElement(gR, { page: $ })) : G;
  }
);
us.displayName = "Link";
var TR = x.forwardRef(
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
    let b = ss(d, { relative: m.relative }), S = wa(), T = x.useContext(ls), { navigator: w, basename: R } = x.useContext(Dn), D = T != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    NR(b) && h === !0, _ = w.encodeLocation ? w.encodeLocation(b).pathname : b.pathname, B = S.pathname, L = T && T.navigation && T.navigation.location ? T.navigation.location.pathname : null;
    l || (B = B.toLowerCase(), L = L ? L.toLowerCase() : null, _ = _.toLowerCase()), L && R && (L = jn(L, R) || L);
    const V = _ !== "/" && _.endsWith("/") ? _.length - 1 : _.length;
    let $ = B === _ || !o && B.startsWith(_) && B.charAt(V) === "/", K = L != null && (L === _ || !o && L.startsWith(_) && L.charAt(_.length) === "/"), te = {
      isActive: $,
      isPending: K,
      isTransitioning: D
    }, A = $ ? a : void 0, Q;
    typeof s == "function" ? Q = s(te) : Q = [
      s,
      $ ? "active" : null,
      K ? "pending" : null,
      D ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let ne = typeof c == "function" ? c(te) : c;
    return /* @__PURE__ */ x.createElement(
      us,
      {
        ...m,
        "aria-current": A,
        className: Q,
        ref: y,
        style: ne,
        to: d,
        viewTransition: h
      },
      typeof p == "function" ? p(te) : p
    );
  }
);
TR.displayName = "NavLink";
var wR = x.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: l,
    reloadDocument: s,
    replace: o,
    state: c,
    method: d = Xo,
    action: h,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: b,
    unstable_defaultShouldRevalidate: S,
    ...T
  }, w) => {
    let { unstable_useTransitions: R } = x.useContext(Dn), D = jR(), _ = DR(h, { relative: m }), B = d.toLowerCase() === "get" ? "get" : "post", L = typeof h == "string" && Bb.test(h), V = ($) => {
      if (p && p($), $.defaultPrevented) return;
      $.preventDefault();
      let K = $.nativeEvent.submitter, te = K?.getAttribute("formmethod") || d, A = () => D(K || $.currentTarget, {
        fetcherKey: a,
        method: te,
        navigate: l,
        replace: o,
        state: c,
        relative: m,
        preventScrollReset: y,
        viewTransition: b,
        unstable_defaultShouldRevalidate: S
      });
      R && l !== !1 ? x.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: w,
        method: B,
        action: _,
        onSubmit: s ? p : V,
        ...T,
        "data-discover": !L && t === "render" ? "true" : void 0
      }
    );
  }
);
wR.displayName = "Form";
function RR(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Hb(t) {
  let a = x.useContext(Yi);
  return _e(a, RR(t)), a;
}
function CR(t, {
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
  let y = Gi(), b = wa(), S = ss(t, { relative: d });
  return x.useCallback(
    (T) => {
      if (iR(T, a)) {
        T.preventDefault();
        let w = l !== void 0 ? l : Jn(b) === Jn(S), R = () => y(t, {
          replace: w,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: d,
          viewTransition: h,
          unstable_defaultShouldRevalidate: p
        });
        m ? x.startTransition(() => R()) : R();
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
      t,
      c,
      d,
      h,
      p,
      m
    ]
  );
}
var MR = 0, AR = () => `__${String(++MR)}__`;
function jR() {
  let { router: t } = Hb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = x.useContext(Dn), l = qw(), s = t.fetch, o = t.navigate;
  return x.useCallback(
    async (c, d = {}) => {
      let { action: h, method: p, encType: m, formData: y, body: b } = sR(
        c,
        a
      );
      if (d.navigate === !1) {
        let S = d.fetcherKey || AR();
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
function DR(t, { relative: a } = {}) {
  let { basename: l } = x.useContext(Dn), s = x.useContext(Ta);
  _e(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...ss(t || ".", { relative: a }) }, d = wa();
  if (t == null) {
    c.search = d.search;
    let h = new URLSearchParams(c.search), p = h.getAll("index");
    if (p.some((y) => y === "")) {
      h.delete("index"), p.filter((b) => b).forEach((b) => h.append("index", b));
      let y = h.toString();
      c.search = y ? `?${y}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), l !== "/" && (c.pathname = c.pathname === "/" ? l : Mn([l, c.pathname])), Jn(c);
}
function NR(t, { relative: a } = {}) {
  let l = x.useContext(sh);
  _e(
    l != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Hb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = ss(t, { relative: a });
  if (!l.isTransitioning)
    return !1;
  let c = jn(l.currentLocation.pathname, s) || l.currentLocation.pathname, d = jn(l.nextLocation.pathname, s) || l.nextLocation.pathname;
  return au(o.pathname, d) != null || au(o.pathname, c) != null;
}
class Fi extends Error {
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
    throw new Fi(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function zR(t, a, l) {
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
async function _R() {
  return ot("/deployments");
}
async function hv(t) {
  return ot(`/deployments/${t}`);
}
async function OR(t, a) {
  return ot(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function mv(t) {
  return ot(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function qb(t, a) {
  return ot("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function LR(t, a, l) {
  return ot(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(l)
    }
  );
}
async function UR(t, a) {
  await ot(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function VR(t) {
  return ot(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function BR(t, a, l = "error") {
  return ot("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: l })
  });
}
async function HR(t, a = {}) {
  const l = new URLSearchParams();
  a.limit && l.set("limit", String(a.limit)), a.status && l.set("status", a.status);
  const s = l.toString(), o = s ? `?${s}` : "";
  return ot(`/deployments/${t}/runs${o}`);
}
async function qR(t, a) {
  return ot(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function mh(t, a) {
  return ot(`/deployments/${t}/runs/${a}`);
}
async function kR(t, a) {
  return ot(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function ph(t, a) {
  return ot(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function PR(t, a) {
  return ot(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function pv(t, a, l, s) {
  return zR(
    `/deployments/${t}/runs/${a}/progress`,
    l,
    s
  );
}
async function lu(t) {
  return ot(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function YR(t, a, l, s, o) {
  const c = new FormData();
  c.append("deploymentId", t), c.append("displayName", l), c.append("kind", s), c.append("audio", a);
  const d = await fetch(`${Xi}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!d.ok)
    throw new Error(`upload failed: ${d.status}`);
  return await d.json();
}
async function GR(t) {
  return ot(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var FR = "mux0i60", XR = "mux0i61", $R = "mux0i62", KR = "mux0i63";
function xu({ count: t = "0", title: a, hint: l }) {
  return /* @__PURE__ */ v.jsxs("div", { className: FR, children: [
    /* @__PURE__ */ v.jsx("span", { className: XR, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ v.jsx("h3", { className: $R, children: a }),
    l ? /* @__PURE__ */ v.jsx("p", { className: KR, children: l }) : null
  ] });
}
var QR = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, IR = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, ZR = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, JR = "zwn3019";
function nn({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: l = "subtle",
  as: s = "section",
  children: o,
  className: c,
  style: d,
  ...h
}) {
  const p = [QR[t], ZR[a], IR[l], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx(s, { className: p, style: d, ...h, children: o });
}
function WR({ children: t, className: a }) {
  const l = [JR, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx("div", { className: l, children: t });
}
var Rn = "vrkn5p0", eC = "_93p6291", tC = "_93p6292", nC = "_93p6293", aC = "_93p6294", iC = "_93p6295", lC = "_93p6296", rC = "_93p6297", sC = "_93p6298", oC = "_93p6299", uC = "_93p629a", cC = "_93p629b", fC = "_93p629c", dC = "_93p629d", hC = "_93p629e";
function mC() {
  const { deployments: t } = os(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ v.jsxs("main", { className: eC, children: [
    /* @__PURE__ */ v.jsxs("header", { className: tC, children: [
      /* @__PURE__ */ v.jsx("p", { className: nC, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ v.jsxs("h1", { className: aC, children: [
        "Direct your characters.",
        /* @__PURE__ */ v.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ v.jsx("p", { className: iC, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ v.jsxs("p", { className: lC, children: [
        /* @__PURE__ */ v.jsx("span", { className: rC, children: t.length }),
        /* @__PURE__ */ v.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs(
      nn,
      {
        density: "airy",
        elevation: "raised",
        className: sC,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ v.jsx("h2", { id: "deployments-section-list", className: Rn, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ v.jsx(
            xu,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ v.jsx("ul", { className: oC, children: t.map((l) => /* @__PURE__ */ v.jsx("li", { children: /* @__PURE__ */ v.jsxs(us, { to: `/${l.deploymentId}/recipe`, className: uC, children: [
            /* @__PURE__ */ v.jsx("span", { className: cC, "aria-hidden": "true", children: pC(l.displayName) }),
            /* @__PURE__ */ v.jsxs("span", { children: [
              /* @__PURE__ */ v.jsx("span", { className: fC, children: l.displayName }),
              /* @__PURE__ */ v.jsx("span", { className: dC, children: l.deploymentId })
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: hC, "aria-hidden": "true", children: "→" })
          ] }) }, l.deploymentId)) })
        ]
      }
    )
  ] });
}
function pC(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
const yC = "huggingface/IndexTeam/IndexTTS-2";
async function gC(t) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(t)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function vC() {
  return ot("/runtime/health");
}
async function bC() {
  await ot("/runtime/start", { method: "POST" });
}
async function SC() {
  return ot("/runtime/stop", { method: "POST" });
}
async function xC() {
  await ot("/runtime/restart", { method: "POST" });
}
function EC(t) {
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
var TC = "g5r6d10", wC = "g5r6d11", RC = "g5r6d12", CC = "g5r6d13", MC = "g5r6d14", AC = "g5r6d15", tn = "g5r6d16", ai = "g5r6d17", Ad = "g5r6d18", jC = "g5r6d19", DC = "g5r6d1a", ti = "g5r6d1b", NC = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function hn({
  severity: t,
  children: a,
  role: l,
  ariaLive: s,
  className: o,
  style: c
}) {
  const d = [NC[t], o].filter(Boolean).join(" "), h = l ?? (t === "error" ? "alert" : "status"), p = s ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ v.jsx("div", { className: d, role: h, "aria-live": p, style: c, children: a });
}
var kb = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Pb = { sm: "_4ydn546", md: "_4ydn547", lg: "_4ydn548" };
function rt({
  variant: t = "primary",
  size: a = "md",
  type: l = "button",
  children: s,
  className: o,
  style: c,
  ...d
}) {
  const h = [kb[t], Pb[a], o].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx("button", { type: l, className: h, style: c, ...d, children: s });
}
var zC = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, _C = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, OC = "_13bb4njb";
function oi({
  tone: t,
  size: a = "sm",
  pulse: l = !1,
  children: s,
  className: o,
  style: c,
  title: d
}) {
  const h = [zC[a], _C[t], l ? OC : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx("span", { className: h, style: c, title: d, children: s });
}
const LC = 4e3;
function UC({ deployment: t }) {
  const a = Gi(), [l, s] = x.useState(null), [o, c] = x.useState(null), [d, h] = x.useState(!1);
  x.useEffect(() => {
    let D = !1;
    const _ = async () => {
      try {
        const L = await vC();
        D || (s(L), c(null));
      } catch (L) {
        D || c(qr(L));
      }
    };
    _();
    const B = setInterval(_, LC);
    return () => {
      D = !0, clearInterval(B);
    };
  }, []);
  const p = x.useCallback(async () => {
    h(!0), c(null);
    try {
      await bC();
    } catch (D) {
      c(qr(D));
    } finally {
      h(!1);
    }
  }, []), m = x.useCallback(async () => {
    h(!0);
    try {
      await SC();
    } catch (D) {
      c(qr(D));
    } finally {
      h(!1);
    }
  }, []), y = x.useCallback(async () => {
    h(!0);
    try {
      await xC();
    } catch (D) {
      c(qr(D));
    } finally {
      h(!1);
    }
  }, []), b = x.useCallback(async () => {
    h(!0);
    try {
      await gC(yC);
    } catch (D) {
      c(qr(D));
    } finally {
      h(!1);
    }
  }, []), S = l?.badge ?? "not_installed", T = S === "stopped" || S === "not_installed", w = S === "ready" || S === "running" || S === "starting", R = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ v.jsxs("div", { className: ai, role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ v.jsx("span", { className: tn, children: "Runtime" }),
    /* @__PURE__ */ v.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ v.jsx("span", { className: tn, children: "Badge" }),
    /* @__PURE__ */ v.jsx(oi, { tone: VC(S), pulse: S === "starting" || S === "installing", children: EC(S) }),
    l && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx("span", { className: tn, children: "Uptime" }),
      /* @__PURE__ */ v.jsx("span", { children: BC(l.uptimeSeconds) }),
      /* @__PURE__ */ v.jsx("span", { className: tn, children: "VRAM" }),
      /* @__PURE__ */ v.jsxs("span", { children: [
        l.vramUsedMb,
        " / ",
        l.vramTotalMb,
        " MB"
      ] })
    ] }),
    T && /* @__PURE__ */ v.jsx(rt, { disabled: d, onClick: p, children: "Install / Start runtime" }),
    w && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx(rt, { variant: "danger", disabled: d, onClick: m, children: "Stop backend" }),
      /* @__PURE__ */ v.jsx(rt, { variant: "secondary", disabled: d, onClick: y, children: "Restart" })
    ] }),
    R && /* @__PURE__ */ v.jsx(rt, { disabled: d, onClick: b, children: "Download IndexTTS-2 model" }),
    /* @__PURE__ */ v.jsx(
      rt,
      {
        variant: "secondary",
        onClick: () => a(`/${t.deploymentId}/mappings`),
        title: "Manage character → voice mappings (upload voice samples, edit emotion defaults)",
        children: "Mappings"
      }
    ),
    o && !R && /* @__PURE__ */ v.jsx(hn, { severity: "error", children: o })
  ] });
}
function VC(t) {
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
function BC(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function qr(t) {
  return t instanceof Fi || t instanceof Error ? t.message : "unknown error";
}
async function HC(t) {
  return ot(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function qC(t, a, l) {
  return ot("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: l })
  });
}
async function kC(t, a) {
  await ot(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var PC = "wfqeb50", YC = "wfqeb51", GC = "wfqeb52", FC = "wfqeb53", XC = "wfqeb54", $C = "wfqeb55 wfqeb54", KC = "wfqeb56", QC = "wfqeb57", Yb = "wfqeb58", Gb = "wfqeb59", Fb = "wfqeb5a", IC = "wfqeb5b", ZC = "wfqeb5c", yv = "wfqeb5d", JC = "wfqeb5e wfqeb5d", WC = "wfqeb5f wfqeb5d", eM = "wfqeb5g", tM = "wfqeb5h", Jf = "wfqeb5i", nM = "wfqeb5j", aM = "wfqeb5k", iM = "wfqeb5l", lM = "wfqeb5m";
const yh = x.createContext({});
function gh(t) {
  const a = x.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const rM = typeof window < "u", Xb = rM ? x.useLayoutEffect : x.useEffect, Eu = /* @__PURE__ */ x.createContext(null);
function vh(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function ru(t, a) {
  const l = t.indexOf(a);
  l > -1 && t.splice(l, 1);
}
const Wn = (t, a, l) => l > a ? a : l < t ? t : l;
function gv(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let cs = () => {
}, Pi = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (cs = (t, a, l) => {
  !t && typeof console < "u" && console.warn(gv(a, l));
}, Pi = (t, a, l) => {
  if (!t)
    throw new Error(gv(a, l));
});
const ui = {}, $b = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function Kb(t) {
  return typeof t == "object" && t !== null;
}
const Qb = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function Ib(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const An = /* @__NO_SIDE_EFFECTS__ */ (t) => t, sM = (t, a) => (l) => a(t(l)), fs = (...t) => t.reduce(sM), es = /* @__NO_SIDE_EFFECTS__ */ (t, a, l) => {
  const s = a - t;
  return s === 0 ? 1 : (l - t) / s;
};
class bh {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return vh(this.subscriptions, a), () => ru(this.subscriptions, a);
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
const an = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, Cn = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function Zb(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const Jb = (t, a, l) => (((1 - 3 * l + 3 * a) * t + (3 * l - 6 * a)) * t + 3 * a) * t, oM = 1e-7, uM = 12;
function cM(t, a, l, s, o) {
  let c, d, h = 0;
  do
    d = a + (l - a) / 2, c = Jb(d, s, o) - t, c > 0 ? l = d : a = d;
  while (Math.abs(c) > oM && ++h < uM);
  return d;
}
function ds(t, a, l, s) {
  if (t === a && l === s)
    return An;
  const o = (c) => cM(c, 0, 1, t, l);
  return (c) => c === 0 || c === 1 ? c : Jb(o(c), a, s);
}
const Wb = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, eS = (t) => (a) => 1 - t(1 - a), tS = /* @__PURE__ */ ds(0.33, 1.53, 0.69, 0.99), Sh = /* @__PURE__ */ eS(tS), nS = /* @__PURE__ */ Wb(Sh), aS = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Sh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), xh = (t) => 1 - Math.sin(Math.acos(t)), iS = eS(xh), lS = Wb(xh), fM = /* @__PURE__ */ ds(0.42, 0, 1, 1), dM = /* @__PURE__ */ ds(0, 0, 0.58, 1), rS = /* @__PURE__ */ ds(0.42, 0, 0.58, 1), hM = (t) => Array.isArray(t) && typeof t[0] != "number", sS = (t) => Array.isArray(t) && typeof t[0] == "number", vv = {
  linear: An,
  easeIn: fM,
  easeInOut: rS,
  easeOut: dM,
  circIn: xh,
  circInOut: lS,
  circOut: iS,
  backIn: Sh,
  backInOut: nS,
  backOut: tS,
  anticipate: aS
}, mM = (t) => typeof t == "string", bv = (t) => {
  if (sS(t)) {
    Pi(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, l, s, o] = t;
    return ds(a, l, s, o);
  } else if (mM(t))
    return Pi(vv[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), vv[t];
  return t;
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
function pM(t, a) {
  let l = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, c = !1;
  const d = /* @__PURE__ */ new WeakSet();
  let h = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function p(y) {
    d.has(y) && (m.schedule(y), t()), y(h);
  }
  const m = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (y, b = !1, S = !1) => {
      const w = S && o ? l : s;
      return b && d.add(y), w.add(y), y;
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
const yM = 40;
function oS(t, a) {
  let l = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, d = Uo.reduce((L, V) => (L[V] = pM(c), L), {}), { setup: h, read: p, resolveKeyframes: m, preUpdate: y, update: b, preRender: S, render: T, postRender: w } = d, R = () => {
    const L = ui.useManualTiming, V = L ? o.timestamp : performance.now();
    l = !1, L || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(V - o.timestamp, yM), 1)), o.timestamp = V, o.isProcessing = !0, h.process(o), p.process(o), m.process(o), y.process(o), b.process(o), S.process(o), T.process(o), w.process(o), o.isProcessing = !1, l && a && (s = !1, t(R));
  }, D = () => {
    l = !0, s = !0, o.isProcessing || t(R);
  };
  return { schedule: Uo.reduce((L, V) => {
    const $ = d[V];
    return L[V] = (K, te = !1, A = !1) => (l || D(), $.schedule(K, te, A)), L;
  }, {}), cancel: (L) => {
    for (let V = 0; V < Uo.length; V++)
      d[Uo[V]].cancel(L);
  }, state: o, steps: d };
}
const { schedule: tt, cancel: ci, state: Vt, steps: Wf } = /* @__PURE__ */ oS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : An, !0);
let Ko;
function gM() {
  Ko = void 0;
}
const $t = {
  now: () => (Ko === void 0 && $t.set(Vt.isProcessing || ui.useManualTiming ? Vt.timestamp : performance.now()), Ko),
  set: (t) => {
    Ko = t, queueMicrotask(gM);
  }
}, uS = (t) => (a) => typeof a == "string" && a.startsWith(t), cS = /* @__PURE__ */ uS("--"), vM = /* @__PURE__ */ uS("var(--"), Eh = (t) => vM(t) ? bM.test(t.split("/*")[0].trim()) : !1, bM = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Sv(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const Pl = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, ts = {
  ...Pl,
  transform: (t) => Wn(0, 1, t)
}, Vo = {
  ...Pl,
  default: 1
}, Kr = (t) => Math.round(t * 1e5) / 1e5, Th = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function SM(t) {
  return t == null;
}
const xM = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, wh = (t, a) => (l) => !!(typeof l == "string" && xM.test(l) && l.startsWith(t) || a && !SM(l) && Object.prototype.hasOwnProperty.call(l, a)), fS = (t, a, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, d, h] = s.match(Th);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(c),
    [l]: parseFloat(d),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, EM = (t) => Wn(0, 255, t), ed = {
  ...Pl,
  transform: (t) => Math.round(EM(t))
}, Bi = {
  test: /* @__PURE__ */ wh("rgb", "red"),
  parse: /* @__PURE__ */ fS("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: l, alpha: s = 1 }) => "rgba(" + ed.transform(t) + ", " + ed.transform(a) + ", " + ed.transform(l) + ", " + Kr(ts.transform(s)) + ")"
};
function TM(t) {
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
  parse: TM,
  transform: Bi.transform
}, hs = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), ni = /* @__PURE__ */ hs("deg"), Zn = /* @__PURE__ */ hs("%"), ye = /* @__PURE__ */ hs("px"), wM = /* @__PURE__ */ hs("vh"), RM = /* @__PURE__ */ hs("vw"), xv = {
  ...Zn,
  parse: (t) => Zn.parse(t) / 100,
  transform: (t) => Zn.transform(t * 100)
}, Ol = {
  test: /* @__PURE__ */ wh("hsl", "hue"),
  parse: /* @__PURE__ */ fS("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + Zn.transform(Kr(a)) + ", " + Zn.transform(Kr(l)) + ", " + Kr(ts.transform(s)) + ")"
}, Mt = {
  test: (t) => Bi.test(t) || jd.test(t) || Ol.test(t),
  parse: (t) => Bi.test(t) ? Bi.parse(t) : Ol.test(t) ? Ol.parse(t) : jd.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Bi.transform(t) : Ol.transform(t),
  getAnimatableNone: (t) => {
    const a = Mt.parse(t);
    return a.alpha = 0, Mt.transform(a);
  }
}, CM = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function MM(t) {
  return isNaN(t) && typeof t == "string" && (t.match(Th)?.length || 0) + (t.match(CM)?.length || 0) > 0;
}
const dS = "number", hS = "color", AM = "var", jM = "var(", Ev = "${}", DM = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Hl(t) {
  const a = t.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const h = a.replace(DM, (p) => (Mt.test(p) ? (s.color.push(c), o.push(hS), l.push(Mt.parse(p))) : p.startsWith(jM) ? (s.var.push(c), o.push(AM), l.push(p)) : (s.number.push(c), o.push(dS), l.push(parseFloat(p))), ++c, Ev)).split(Ev);
  return { values: l, split: h, indexes: s, types: o };
}
function NM(t) {
  return Hl(t).values;
}
function mS({ split: t, types: a }) {
  const l = t.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < l; c++)
      if (o += t[c], s[c] !== void 0) {
        const d = a[c];
        d === dS ? o += Kr(s[c]) : d === hS ? o += Mt.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function zM(t) {
  return mS(Hl(t));
}
const _M = (t) => typeof t == "number" ? 0 : Mt.test(t) ? Mt.getAnimatableNone(t) : t, OM = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : _M(t);
function LM(t) {
  const a = Hl(t);
  return mS(a)(a.values.map((s, o) => OM(s, a.split[o])));
}
const Hn = {
  test: MM,
  parse: NM,
  createTransformer: zM,
  getAnimatableNone: LM
};
function td(t, a, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? t + (a - t) * 6 * l : l < 1 / 2 ? a : l < 2 / 3 ? t + (a - t) * (2 / 3 - l) * 6 : t;
}
function UM({ hue: t, saturation: a, lightness: l, alpha: s }) {
  t /= 360, a /= 100, l /= 100;
  let o = 0, c = 0, d = 0;
  if (!a)
    o = c = d = l;
  else {
    const h = l < 0.5 ? l * (1 + a) : l + a - l * a, p = 2 * l - h;
    o = td(p, h, t + 1 / 3), c = td(p, h, t), d = td(p, h, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(d * 255),
    alpha: s
  };
}
function su(t, a) {
  return (l) => l > 0 ? a : t;
}
const st = (t, a, l) => t + (a - t) * l, nd = (t, a, l) => {
  const s = t * t, o = l * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, VM = [jd, Bi, Ol], BM = (t) => VM.find((a) => a.test(t));
function Tv(t) {
  const a = BM(t);
  if (cs(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let l = a.parse(t);
  return a === Ol && (l = UM(l)), l;
}
const wv = (t, a) => {
  const l = Tv(t), s = Tv(a);
  if (!l || !s)
    return su(t, a);
  const o = { ...l };
  return (c) => (o.red = nd(l.red, s.red, c), o.green = nd(l.green, s.green, c), o.blue = nd(l.blue, s.blue, c), o.alpha = st(l.alpha, s.alpha, c), Bi.transform(o));
}, Dd = /* @__PURE__ */ new Set(["none", "hidden"]);
function HM(t, a) {
  return Dd.has(t) ? (l) => l <= 0 ? t : a : (l) => l >= 1 ? a : t;
}
function qM(t, a) {
  return (l) => st(t, a, l);
}
function Rh(t) {
  return typeof t == "number" ? qM : typeof t == "string" ? Eh(t) ? su : Mt.test(t) ? wv : YM : Array.isArray(t) ? pS : typeof t == "object" ? Mt.test(t) ? wv : kM : su;
}
function pS(t, a) {
  const l = [...t], s = l.length, o = t.map((c, d) => Rh(c)(c, a[d]));
  return (c) => {
    for (let d = 0; d < s; d++)
      l[d] = o[d](c);
    return l;
  };
}
function kM(t, a) {
  const l = { ...t, ...a }, s = {};
  for (const o in l)
    t[o] !== void 0 && a[o] !== void 0 && (s[o] = Rh(t[o])(t[o], a[o]));
  return (o) => {
    for (const c in s)
      l[c] = s[c](o);
    return l;
  };
}
function PM(t, a) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], d = t.indexes[c][s[c]], h = t.values[d] ?? 0;
    l[o] = h, s[c]++;
  }
  return l;
}
const YM = (t, a) => {
  const l = Hn.createTransformer(a), s = Hl(t), o = Hl(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Dd.has(t) && !o.values.length || Dd.has(a) && !s.values.length ? HM(t, a) : fs(pS(PM(s, o), o.values), l) : (cs(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), su(t, a));
};
function yS(t, a, l) {
  return typeof t == "number" && typeof a == "number" && typeof l == "number" ? st(t, a, l) : Rh(t)(t, a);
}
const GM = (t) => {
  const a = ({ timestamp: l }) => t(l);
  return {
    start: (l = !0) => tt.update(a, l),
    stop: () => ci(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Vt.isProcessing ? Vt.timestamp : $t.now()
  };
}, gS = (t, a, l = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / l), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(t(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, ou = 2e4;
function Ch(t) {
  let a = 0;
  const l = 50;
  let s = t.next(a);
  for (; !s.done && a < ou; )
    a += l, s = t.next(a);
  return a >= ou ? 1 / 0 : a;
}
function FM(t, a = 100, l) {
  const s = l({ ...t, keyframes: [0, a] }), o = Math.min(Ch(s), ou);
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
const XM = 12;
function $M(t, a, l) {
  let s = l;
  for (let o = 1; o < XM; o++)
    s = s - t(s) / a(s);
  return s;
}
const ad = 1e-3;
function KM({ duration: t = dt.duration, bounce: a = dt.bounce, velocity: l = dt.velocity, mass: s = dt.mass }) {
  let o, c;
  cs(t <= /* @__PURE__ */ an(dt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let d = 1 - a;
  d = Wn(dt.minDamping, dt.maxDamping, d), t = Wn(dt.minDuration, dt.maxDuration, /* @__PURE__ */ Cn(t)), d < 1 ? (o = (m) => {
    const y = m * d, b = y * t, S = y - l, T = Nd(m, d), w = Math.exp(-b);
    return ad - S / T * w;
  }, c = (m) => {
    const b = m * d * t, S = b * l + l, T = Math.pow(d, 2) * Math.pow(m, 2) * t, w = Math.exp(-b), R = Nd(Math.pow(m, 2), d);
    return (-o(m) + ad > 0 ? -1 : 1) * ((S - T) * w) / R;
  }) : (o = (m) => {
    const y = Math.exp(-m * t), b = (m - l) * t + 1;
    return -ad + y * b;
  }, c = (m) => {
    const y = Math.exp(-m * t), b = (l - m) * (t * t);
    return y * b;
  });
  const h = 5 / t, p = $M(o, c, h);
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
      damping: d * 2 * Math.sqrt(s * m),
      duration: t
    };
  }
}
const QM = ["duration", "bounce"], IM = ["stiffness", "damping", "mass"];
function Rv(t, a) {
  return a.some((l) => t[l] !== void 0);
}
function ZM(t) {
  let a = {
    velocity: dt.velocity,
    stiffness: dt.stiffness,
    damping: dt.damping,
    mass: dt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Rv(t, IM) && Rv(t, QM))
    if (a.velocity = 0, t.visualDuration) {
      const l = t.visualDuration, s = 2 * Math.PI / (l * 1.2), o = s * s, c = 2 * Wn(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: dt.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const l = KM({ ...t, velocity: 0 });
      a = {
        ...a,
        ...l,
        mass: dt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function uu(t = dt.visualDuration, a = dt.bounce) {
  const l = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: s, restDelta: o } = l;
  const c = l.keyframes[0], d = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: p, damping: m, mass: y, duration: b, velocity: S, isResolvedFromDuration: T } = ZM({
    ...l,
    velocity: -/* @__PURE__ */ Cn(l.velocity || 0)
  }), w = S || 0, R = m / (2 * Math.sqrt(p * y)), D = d - c, _ = /* @__PURE__ */ Cn(Math.sqrt(p / y)), B = Math.abs(D) < 5;
  s || (s = B ? dt.restSpeed.granular : dt.restSpeed.default), o || (o = B ? dt.restDelta.granular : dt.restDelta.default);
  let L, V, $, K, te, A;
  if (R < 1)
    $ = Nd(_, R), K = (w + R * _ * D) / $, L = (ne) => {
      const ce = Math.exp(-R * _ * ne);
      return d - ce * (K * Math.sin($ * ne) + D * Math.cos($ * ne));
    }, te = R * _ * K + D * $, A = R * _ * D - K * $, V = (ne) => Math.exp(-R * _ * ne) * (te * Math.sin($ * ne) + A * Math.cos($ * ne));
  else if (R === 1) {
    L = (ce) => d - Math.exp(-_ * ce) * (D + (w + _ * D) * ce);
    const ne = w + _ * D;
    V = (ce) => Math.exp(-_ * ce) * (_ * ne * ce - w);
  } else {
    const ne = _ * Math.sqrt(R * R - 1);
    L = (G) => {
      const I = Math.exp(-R * _ * G), N = Math.min(ne * G, 300);
      return d - I * ((w + R * _ * D) * Math.sinh(N) + ne * D * Math.cosh(N)) / ne;
    };
    const ce = (w + R * _ * D) / ne, W = R * _ * ce - D * ne, se = R * _ * D - ce * ne;
    V = (G) => {
      const I = Math.exp(-R * _ * G), N = Math.min(ne * G, 300);
      return I * (W * Math.sinh(N) + se * Math.cosh(N));
    };
  }
  const Q = {
    calculatedDuration: T && b || null,
    velocity: (ne) => /* @__PURE__ */ an(V(ne)),
    next: (ne) => {
      if (!T && R < 1) {
        const W = Math.exp(-R * _ * ne), se = Math.sin($ * ne), G = Math.cos($ * ne), I = d - W * (K * se + D * G), N = /* @__PURE__ */ an(W * (te * se + A * G));
        return h.done = Math.abs(N) <= s && Math.abs(d - I) <= o, h.value = h.done ? d : I, h;
      }
      const ce = L(ne);
      if (T)
        h.done = ne >= b;
      else {
        const W = /* @__PURE__ */ an(V(ne));
        h.done = Math.abs(W) <= s && Math.abs(d - ce) <= o;
      }
      return h.value = h.done ? d : ce, h;
    },
    toString: () => {
      const ne = Math.min(Ch(Q), ou), ce = gS((W) => Q.next(ne * W).value, ne, 30);
      return ne + "ms " + ce;
    },
    toTransition: () => {
    }
  };
  return Q;
}
uu.applyToOptions = (t) => {
  const a = FM(t, 100, uu);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ an(a.duration), t.type = "keyframes", t;
};
const JM = 5;
function vS(t, a, l) {
  const s = Math.max(a - JM, 0);
  return Zb(l - t(s), a - s);
}
function zd({ keyframes: t, velocity: a = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: d, min: h, max: p, restDelta: m = 0.5, restSpeed: y }) {
  const b = t[0], S = {
    done: !1,
    value: b
  }, T = (A) => h !== void 0 && A < h || p !== void 0 && A > p, w = (A) => h === void 0 ? p : p === void 0 || Math.abs(h - A) < Math.abs(p - A) ? h : p;
  let R = l * a;
  const D = b + R, _ = d === void 0 ? D : d(D);
  _ !== D && (R = _ - b);
  const B = (A) => -R * Math.exp(-A / s), L = (A) => _ + B(A), V = (A) => {
    const Q = B(A), ne = L(A);
    S.done = Math.abs(Q) <= m, S.value = S.done ? _ : ne;
  };
  let $, K;
  const te = (A) => {
    T(S.value) && ($ = A, K = uu({
      keyframes: [S.value, w(S.value)],
      velocity: vS(L, A, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: m,
      restSpeed: y
    }));
  };
  return te(0), {
    calculatedDuration: null,
    next: (A) => {
      let Q = !1;
      return !K && $ === void 0 && (Q = !0, V(A), te(A)), $ !== void 0 && A >= $ ? K.next(A - $) : (!Q && V(A), S);
    }
  };
}
function WM(t, a, l) {
  const s = [], o = l || ui.mix || yS, c = t.length - 1;
  for (let d = 0; d < c; d++) {
    let h = o(t[d], t[d + 1]);
    if (a) {
      const p = Array.isArray(a) ? a[d] || An : a;
      h = fs(p, h);
    }
    s.push(h);
  }
  return s;
}
function eA(t, a, { clamp: l = !0, ease: s, mixer: o } = {}) {
  const c = t.length;
  if (Pi(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const d = t[0] === t[1];
  t[0] > t[c - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const h = WM(a, s, o), p = h.length, m = (y) => {
    if (d && y < t[0])
      return a[0];
    let b = 0;
    if (p > 1)
      for (; b < t.length - 2 && !(y < t[b + 1]); b++)
        ;
    const S = /* @__PURE__ */ es(t[b], t[b + 1], y);
    return h[b](S);
  };
  return l ? (y) => m(Wn(t[0], t[c - 1], y)) : m;
}
function tA(t, a) {
  const l = t[t.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ es(0, a, s);
    t.push(st(l, 1, o));
  }
}
function nA(t) {
  const a = [0];
  return tA(a, t.length - 1), a;
}
function aA(t, a) {
  return t.map((l) => l * a);
}
function iA(t, a) {
  return t.map(() => a || rS).splice(0, t.length - 1);
}
function Qr({ duration: t = 300, keyframes: a, times: l, ease: s = "easeInOut" }) {
  const o = hM(s) ? s.map(bv) : bv(s), c = {
    done: !1,
    value: a[0]
  }, d = aA(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === a.length ? l : nA(a),
    t
  ), h = eA(d, a, {
    ease: Array.isArray(o) ? o : iA(a, o)
  });
  return {
    calculatedDuration: t,
    next: (p) => (c.value = h(p), c.done = p >= t, c)
  };
}
const lA = (t) => t !== null;
function Tu(t, { repeat: a, repeatType: l = "loop" }, s, o = 1) {
  const c = t.filter(lA), h = o < 0 || a && l !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const rA = {
  decay: zd,
  inertia: zd,
  tween: Qr,
  keyframes: Qr,
  spring: uu
};
function bS(t) {
  typeof t.type == "string" && (t.type = rA[t.type]);
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
const sA = (t) => t / 100;
class cu extends Mh {
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
    bS(a);
    const { type: l = Qr, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: d = 0 } = a;
    let { keyframes: h } = a;
    const p = l || Qr;
    p !== Qr && typeof h[0] != "number" && (this.mixKeyframes = fs(sA, yS(h[0], h[1])), h = [0, 100]);
    const m = p({ ...a, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = p({
      ...a,
      keyframes: [...h].reverse(),
      velocity: -d
    })), m.calculatedDuration === null && (m.calculatedDuration = Ch(m));
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
    const { delay: m = 0, keyframes: y, repeat: b, repeatType: S, repeatDelay: T, type: w, onUpdate: R, finalKeyframe: D } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), l ? this.currentTime = a : this.updateTime(a);
    const _ = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), B = this.playbackSpeed >= 0 ? _ < 0 : _ > o;
    this.currentTime = Math.max(_, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let L = this.currentTime, V = s;
    if (b) {
      const A = Math.min(this.currentTime, o) / h;
      let Q = Math.floor(A), ne = A % 1;
      !ne && A >= 1 && (ne = 1), ne === 1 && Q--, Q = Math.min(Q, b + 1), !!(Q % 2) && (S === "reverse" ? (ne = 1 - ne, T && (ne -= T / h)) : S === "mirror" && (V = d)), L = Wn(0, 1, ne) * h;
    }
    let $;
    B ? (this.delayState.value = y[0], $ = this.delayState) : $ = V.next(L), c && !B && ($.value = c($.value));
    let { done: K } = $;
    !B && p !== null && (K = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const te = this.holdTime === null && (this.state === "finished" || this.state === "running" && K);
    return te && w !== zd && ($.value = Tu(y, this.options, D, this.speed)), R && R($.value), te && this.finish(), $;
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
    return vS((s) => this.generator.next(s).value, a, l);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const l = this.playbackSpeed !== a;
    l && this.driver && this.updateTime($t.now()), this.playbackSpeed = a, l && this.driver && (this.time = /* @__PURE__ */ Cn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = GM, startTime: l } = this.options;
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
function oA(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Hi = (t) => t * 180 / Math.PI, _d = (t) => {
  const a = Hi(Math.atan2(t[1], t[0]));
  return Od(a);
}, uA = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: _d,
  rotateZ: _d,
  skewX: (t) => Hi(Math.atan(t[1])),
  skewY: (t) => Hi(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Od = (t) => (t = t % 360, t < 0 && (t += 360), t), Cv = _d, Mv = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), Av = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), cA = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Mv,
  scaleY: Av,
  scale: (t) => (Mv(t) + Av(t)) / 2,
  rotateX: (t) => Od(Hi(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Od(Hi(Math.atan2(-t[2], t[0]))),
  rotateZ: Cv,
  rotate: Cv,
  skewX: (t) => Hi(Math.atan(t[4])),
  skewY: (t) => Hi(Math.atan(t[1])),
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
    s = cA, o = l;
  else {
    const h = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = uA, o = h;
  }
  if (!o)
    return Ld(a);
  const c = s[a], d = o[1].split(",").map(dA);
  return typeof c == "function" ? c(d) : d[c];
}
const fA = (t, a) => {
  const { transform: l = "none" } = getComputedStyle(t);
  return Ud(l, a);
};
function dA(t) {
  return parseFloat(t.trim());
}
const Yl = [
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
], Gl = new Set(Yl), jv = (t) => t === Pl || t === ye, hA = /* @__PURE__ */ new Set(["x", "y", "z"]), mA = Yl.filter((t) => !hA.has(t));
function pA(t) {
  const a = [];
  return mA.forEach((l) => {
    const s = t.getValue(l);
    s !== void 0 && (a.push([l, s.get()]), s.set(l.startsWith("scale") ? 1 : 0));
  }), a;
}
const si = {
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
si.translateX = si.x;
si.translateY = si.y;
const qi = /* @__PURE__ */ new Set();
let Vd = !1, Bd = !1, Hd = !1;
function SS() {
  if (Bd) {
    const t = Array.from(qi).filter((s) => s.needsMeasurement), a = new Set(t.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = pA(s);
      o.length && (l.set(s, o), s.render());
    }), t.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = l.get(s);
      o && o.forEach(([c, d]) => {
        s.getValue(c)?.set(d);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Bd = !1, Vd = !1, qi.forEach((t) => t.complete(Hd)), qi.clear();
}
function xS() {
  qi.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Bd = !0);
  });
}
function yA() {
  Hd = !0, xS(), SS(), Hd = !1;
}
class Ah {
  constructor(a, l, s, o, c, d = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = l, this.name = s, this.motionValue = o, this.element = c, this.isAsync = d;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (qi.add(this), Vd || (Vd = !0, tt.read(xS), tt.resolveKeyframes(SS))) : (this.readKeyframes(), this.complete());
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
    oA(a);
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
const gA = (t) => t.startsWith("--");
function ES(t, a, l) {
  gA(a) ? t.style.setProperty(a, l) : t.style[a] = l;
}
const vA = {};
function TS(t, a) {
  const l = /* @__PURE__ */ Ib(t);
  return () => vA[a] ?? l();
}
const bA = /* @__PURE__ */ TS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), wS = /* @__PURE__ */ TS(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Xr = ([t, a, l, s]) => `cubic-bezier(${t}, ${a}, ${l}, ${s})`, Dv = {
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
function RS(t, a) {
  if (t)
    return typeof t == "function" ? wS() ? gS(t, a) : "ease-out" : sS(t) ? Xr(t) : Array.isArray(t) ? t.map((l) => RS(l, a) || Dv.easeOut) : Dv[t];
}
function SA(t, a, l, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: d = "loop", ease: h = "easeOut", times: p } = {}, m = void 0) {
  const y = {
    [a]: l
  };
  p && (y.offset = p);
  const b = RS(h, o);
  Array.isArray(b) && (y.easing = b);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(b) ? "linear" : b,
    fill: "both",
    iterations: c + 1,
    direction: d === "reverse" ? "alternate" : "normal"
  };
  return m && (S.pseudoElement = m), t.animate(y, S);
}
function CS(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function xA({ type: t, ...a }) {
  return CS(t) && wS() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class MS extends Mh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: l, name: s, keyframes: o, pseudoElement: c, allowFlatten: d = !1, finalKeyframe: h, onComplete: p } = a;
    this.isPseudoElement = !!c, this.allowFlatten = d, this.options = a, Pi(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = xA(a);
    this.animation = SA(l, s, o, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const y = Tu(o, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(y), ES(l, s, y), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && bA() ? (this.animation.timeline = a, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), An) : o(this);
  }
}
const AS = {
  anticipate: aS,
  backInOut: nS,
  circInOut: lS
};
function EA(t) {
  return t in AS;
}
function TA(t) {
  typeof t.ease == "string" && EA(t.ease) && (t.ease = AS[t.ease]);
}
const id = 10;
class wA extends MS {
  constructor(a) {
    TA(a), bS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    }), p = Math.max(id, $t.now() - this.startTime), m = Wn(0, id, p - id), y = h.sample(p).value, { name: b } = this.options;
    c && b && ES(c, b, y), l.setWithVelocity(h.sample(Math.max(0, p - m)).value, y, m), h.stop();
  }
}
const Nv = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(Hn.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function RA(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let l = 0; l < t.length; l++)
    if (t[l] !== a)
      return !0;
}
function CA(t, a, l, s) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = t[t.length - 1], d = Nv(o, a), h = Nv(c, a);
  return cs(d === h, `You are trying to animate ${a} from "${o}" to "${c}". "${d ? c : o}" is not an animatable value.`, "value-not-animatable"), !d || !h ? !1 : RA(t) || (l === "spring" || CS(l)) && s;
}
function qd(t) {
  t.duration = 0, t.type = "keyframes";
}
const jS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), MA = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function AA(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && MA.test(t[a]))
      return !0;
  return !1;
}
const jA = /* @__PURE__ */ new Set([
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
]), DA = /* @__PURE__ */ Ib(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function NA(t) {
  const { motionValue: a, name: l, repeatDelay: s, repeatType: o, damping: c, type: d, keyframes: h } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: y } = a.owner.getProps();
  return DA() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (jS.has(l) || jA.has(l) && AA(h)) && (l !== "transform" || !y) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && c !== 0 && d !== "inertia";
}
const zA = 40;
class _A extends Mh {
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
    }, T = y?.KeyframeResolver || Ah;
    this.keyframeResolver = new T(h, (w, R, D) => this.onKeyframesResolved(w, R, S, !D), p, m, y), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, l, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: d, velocity: h, delay: p, isHandoff: m, onUpdate: y } = s;
    this.resolvedAt = $t.now();
    let b = !0;
    CA(a, c, d, h) || (b = !1, (ui.instantAnimations || !p) && y?.(Tu(a, s, l)), a[0] = a[a.length - 1], qd(s), s.repeat = 0);
    const T = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > zA ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: a
    }, w = b && !m && NA(T), R = T.motionValue?.owner?.current;
    let D;
    if (w)
      try {
        D = new wA({
          ...T,
          element: R
        });
      } catch {
        D = new cu(T);
      }
    else
      D = new cu(T);
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
    return this._animation || (this.keyframeResolver?.resume(), yA()), this._animation;
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
function DS(t, a, l, s = 0, o = 1) {
  const c = Array.from(t).sort((m, y) => m.sortNodePosition(y)).indexOf(a), d = t.size, h = (d - 1) * s;
  return typeof l == "function" ? l(c, d) : o === 1 ? c * s : h - c * s;
}
const OA = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function LA(t) {
  const a = OA.exec(t);
  if (!a)
    return [,];
  const [, l, s, o] = a;
  return [`--${l ?? s}`, o];
}
const UA = 4;
function NS(t, a, l = 1) {
  Pi(l <= UA, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = LA(t);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const d = c.trim();
    return $b(d) ? parseFloat(d) : d;
  }
  return Eh(o) ? NS(o, a, l + 1) : o;
}
const VA = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, BA = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), HA = {
  type: "keyframes",
  duration: 0.8
}, qA = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, kA = (t, { keyframes: a }) => a.length > 2 ? HA : Gl.has(t) ? t.startsWith("scale") ? BA(a[1]) : VA : qA;
function zS(t, a) {
  if (t?.inherit && a) {
    const { inherit: l, ...s } = t;
    return { ...a, ...s };
  }
  return t;
}
function jh(t, a) {
  const l = t?.[a] ?? t?.default ?? t;
  return l !== t ? zS(l, t) : l;
}
const PA = /* @__PURE__ */ new Set([
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
function YA(t) {
  for (const a in t)
    if (!PA.has(a))
      return !0;
  return !1;
}
const Dh = (t, a, l, s = {}, o, c) => (d) => {
  const h = jh(s, t) || {}, p = h.delay || s.delay || 0;
  let { elapsed: m = 0 } = s;
  m = m - /* @__PURE__ */ an(p);
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
    name: t,
    motionValue: a,
    element: c ? void 0 : o
  };
  YA(h) || Object.assign(y, kA(t, y)), y.duration && (y.duration = /* @__PURE__ */ an(y.duration)), y.repeatDelay && (y.repeatDelay = /* @__PURE__ */ an(y.repeatDelay)), y.from !== void 0 && (y.keyframes[0] = y.from);
  let b = !1;
  if ((y.type === !1 || y.duration === 0 && !y.repeatDelay) && (qd(y), y.delay === 0 && (b = !0)), (ui.instantAnimations || ui.skipAnimations || o?.shouldSkipAnimations) && (b = !0, qd(y), y.delay = 0), y.allowFlatten = !h.type && !h.ease, b && !c && a.get() !== void 0) {
    const S = Tu(y.keyframes, h);
    if (S !== void 0) {
      tt.update(() => {
        y.onUpdate(S), y.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new cu(y) : new _A(y);
};
function zv(t) {
  const a = [{}, {}];
  return t?.values.forEach((l, s) => {
    a[0][s] = l.get(), a[1][s] = l.getVelocity();
  }), a;
}
function Nh(t, a, l, s) {
  if (typeof a == "function") {
    const [o, c] = zv(s);
    a = a(l !== void 0 ? l : t.custom, o, c);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, c] = zv(s);
    a = a(l !== void 0 ? l : t.custom, o, c);
  }
  return a;
}
function ki(t, a, l) {
  const s = t.getProps();
  return Nh(s, a, l !== void 0 ? l : s.custom, t);
}
const _S = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Yl
]), _v = 30, GA = (t) => !isNaN(parseFloat(t));
class FA {
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
    this.current = a, this.updatedAt = $t.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = GA(this.current));
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > _v)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, _v);
    return Zb(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
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
  return new FA(t, a);
}
const kd = (t) => Array.isArray(t);
function XA(t, a, l) {
  t.hasValue(a) ? t.getValue(a).set(l) : t.addValue(a, ql(l));
}
function $A(t) {
  return kd(t) ? t[t.length - 1] || 0 : t;
}
function KA(t, a) {
  const l = ki(t, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const d in c) {
    const h = $A(c[d]);
    XA(t, d, h);
  }
}
const Bt = (t) => !!(t && t.getVelocity);
function QA(t) {
  return !!(Bt(t) && t.add);
}
function Pd(t, a) {
  const l = t.getValue("willChange");
  if (QA(l))
    return l.add(a);
  if (!l && ui.WillChange) {
    const s = new ui.WillChange("auto");
    t.addValue("willChange", s), s.add(a);
  }
}
function zh(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const IA = "framerAppearId", OS = "data-" + zh(IA);
function LS(t) {
  return t.props[OS];
}
function ZA({ protectedKeys: t, needsAnimating: a }, l) {
  const s = t.hasOwnProperty(l) && a[l] !== !0;
  return a[l] = !1, s;
}
function US(t, a, { delay: l = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: d, ...h } = a;
  const p = t.getDefaultTransition();
  c = c ? zS(c, p) : p;
  const m = c?.reduceMotion;
  s && (c = s);
  const y = [], b = o && t.animationState && t.animationState.getState()[o];
  for (const S in h) {
    const T = t.getValue(S, t.latestValues[S] ?? null), w = h[S];
    if (w === void 0 || b && ZA(b, S))
      continue;
    const R = {
      delay: l,
      ...jh(c || {}, S)
    }, D = T.get();
    if (D !== void 0 && !T.isAnimating() && !Array.isArray(w) && w === D && !R.velocity) {
      tt.update(() => T.set(w));
      continue;
    }
    let _ = !1;
    if (window.MotionHandoffAnimation) {
      const V = LS(t);
      if (V) {
        const $ = window.MotionHandoffAnimation(V, S, tt);
        $ !== null && (R.startTime = $, _ = !0);
      }
    }
    Pd(t, S);
    const B = m ?? t.shouldReduceMotion;
    T.start(Dh(S, T, w, B && _S.has(S) ? { type: !1 } : R, t, _));
    const L = T.animation;
    L && y.push(L);
  }
  if (d) {
    const S = () => tt.update(() => {
      d && KA(t, d);
    });
    y.length ? Promise.all(y).then(S) : S();
  }
  return y;
}
function Yd(t, a, l = {}) {
  const s = ki(t, a, l.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (o = l.transitionOverride);
  const c = s ? () => Promise.all(US(t, s, l)) : () => Promise.resolve(), d = t.variantChildren && t.variantChildren.size ? (p = 0) => {
    const { delayChildren: m = 0, staggerChildren: y, staggerDirection: b } = o;
    return JA(t, a, p, m, y, b, l);
  } : () => Promise.resolve(), { when: h } = o;
  if (h) {
    const [p, m] = h === "beforeChildren" ? [c, d] : [d, c];
    return p().then(() => m());
  } else
    return Promise.all([c(), d(l.delay)]);
}
function JA(t, a, l = 0, s = 0, o = 0, c = 1, d) {
  const h = [];
  for (const p of t.variantChildren)
    p.notify("AnimationStart", a), h.push(Yd(p, a, {
      ...d,
      delay: l + (typeof s == "function" ? 0 : s) + DS(t.variantChildren, p, s, o, c)
    }).then(() => p.notify("AnimationComplete", a)));
  return Promise.all(h);
}
function WA(t, a, l = {}) {
  t.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => Yd(t, c, l));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = Yd(t, a, l);
  else {
    const o = typeof a == "function" ? ki(t, a, l.custom) : a;
    s = Promise.all(US(t, o, l));
  }
  return s.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const ej = {
  test: (t) => t === "auto",
  parse: (t) => t
}, VS = (t) => (a) => a.test(t), BS = [Pl, ye, Zn, ni, RM, wM, ej], Ov = (t) => BS.find(VS(t));
function tj(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || Qb(t) : !0;
}
const nj = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function aj(t) {
  const [a, l] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [s] = l.match(Th) || [];
  if (!s)
    return t;
  const o = l.replace(s, "");
  let c = nj.has(a) ? 1 : 0;
  return s !== l && (c *= 100), a + "(" + c + o + ")";
}
const ij = /\b([a-z-]*)\(.*?\)/gu, Gd = {
  ...Hn,
  getAnimatableNone: (t) => {
    const a = t.match(ij);
    return a ? a.map(aj).join(" ") : t;
  }
}, Fd = {
  ...Hn,
  getAnimatableNone: (t) => {
    const a = Hn.parse(t);
    return Hn.createTransformer(t)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, Lv = {
  ...Pl,
  transform: Math.round
}, lj = {
  rotate: ni,
  rotateX: ni,
  rotateY: ni,
  rotateZ: ni,
  scale: Vo,
  scaleX: Vo,
  scaleY: Vo,
  scaleZ: Vo,
  skew: ni,
  skewX: ni,
  skewY: ni,
  distance: ye,
  translateX: ye,
  translateY: ye,
  translateZ: ye,
  x: ye,
  y: ye,
  z: ye,
  perspective: ye,
  transformPerspective: ye,
  opacity: ts,
  originX: xv,
  originY: xv,
  originZ: ye
}, _h = {
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
  ...lj,
  zIndex: Lv,
  // SVG
  fillOpacity: ts,
  strokeOpacity: ts,
  numOctaves: Lv
}, rj = {
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
  filter: Gd,
  WebkitFilter: Gd,
  mask: Fd,
  WebkitMask: Fd
}, HS = (t) => rj[t], sj = /* @__PURE__ */ new Set([Gd, Fd]);
function qS(t, a) {
  let l = HS(t);
  return sj.has(l) || (l = Hn), l.getAnimatableNone ? l.getAnimatableNone(a) : void 0;
}
const oj = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function uj(t, a, l) {
  let s = 0, o;
  for (; s < t.length && !o; ) {
    const c = t[s];
    typeof c == "string" && !oj.has(c) && Hl(c).values.length && (o = t[s]), s++;
  }
  if (o && l)
    for (const c of a)
      t[c] = qS(l, o);
}
class cj extends Ah {
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
        const S = NS(b, l.current);
        S !== void 0 && (a[y] = S), y === a.length - 1 && (this.finalKeyframe = b);
      }
    }
    if (this.resolveNoneKeyframes(), !_S.has(s) || a.length !== 2)
      return;
    const [o, c] = a, d = Ov(o), h = Ov(c), p = Sv(o), m = Sv(c);
    if (p !== m && si[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (d !== h)
      if (jv(d) && jv(h))
        for (let y = 0; y < a.length; y++) {
          const b = a[y];
          typeof b == "string" && (a[y] = parseFloat(b));
        }
      else si[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: l } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || tj(a[o])) && s.push(o);
    s.length && uj(a, s, l);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: l, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = si[s](a.measureViewportBox(), window.getComputedStyle(a.current)), l[0] = this.measuredOrigin;
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
    s[c] = si[l](a.measureViewportBox(), window.getComputedStyle(a.current)), d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d), this.removedTransforms?.length && this.removedTransforms.forEach(([h, p]) => {
      a.getValue(h).set(p);
    }), this.resolveNoneKeyframes();
  }
}
function kS(t, a, l) {
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
const PS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function Qo(t) {
  return Kb(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: Oh } = /* @__PURE__ */ oS(queueMicrotask, !1), Bn = {
  x: !1,
  y: !1
};
function YS() {
  return Bn.x || Bn.y;
}
function fj(t) {
  return t === "x" || t === "y" ? Bn[t] ? null : (Bn[t] = !0, () => {
    Bn[t] = !1;
  }) : Bn.x || Bn.y ? null : (Bn.x = Bn.y = !0, () => {
    Bn.x = Bn.y = !1;
  });
}
function GS(t, a) {
  const l = kS(t), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [l, o, () => s.abort()];
}
function dj(t) {
  return !(t.pointerType === "touch" || YS());
}
function hj(t, a, l = {}) {
  const [s, o, c] = GS(t, l);
  return s.forEach((d) => {
    let h = !1, p = !1, m;
    const y = () => {
      d.removeEventListener("pointerleave", w);
    }, b = (D) => {
      m && (m(D), m = void 0), y();
    }, S = (D) => {
      h = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), p && (p = !1, b(D));
    }, T = () => {
      h = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, w = (D) => {
      if (D.pointerType !== "touch") {
        if (h) {
          p = !0;
          return;
        }
        b(D);
      }
    }, R = (D) => {
      if (!dj(D))
        return;
      p = !1;
      const _ = a(d, D);
      typeof _ == "function" && (m = _, d.addEventListener("pointerleave", w, o));
    };
    d.addEventListener("pointerenter", R, o), d.addEventListener("pointerdown", T, o);
  }), c;
}
const FS = (t, a) => a ? t === a ? !0 : FS(t, a.parentElement) : !1, Lh = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, mj = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function pj(t) {
  return mj.has(t.tagName) || t.isContentEditable === !0;
}
const yj = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function gj(t) {
  return yj.has(t.tagName) || t.isContentEditable === !0;
}
const Io = /* @__PURE__ */ new WeakSet();
function Uv(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function ld(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const vj = (t, a) => {
  const l = t.currentTarget;
  if (!l)
    return;
  const s = Uv(() => {
    if (Io.has(l))
      return;
    ld(l, "down");
    const o = Uv(() => {
      ld(l, "up");
    }), c = () => ld(l, "cancel");
    l.addEventListener("keyup", o, a), l.addEventListener("blur", c, a);
  });
  l.addEventListener("keydown", s, a), l.addEventListener("blur", () => l.removeEventListener("keydown", s), a);
};
function Vv(t) {
  return Lh(t) && !YS();
}
const Bv = /* @__PURE__ */ new WeakSet();
function bj(t, a, l = {}) {
  const [s, o, c] = GS(t, l), d = (h) => {
    const p = h.currentTarget;
    if (!Vv(h) || Bv.has(h))
      return;
    Io.add(p), l.stopPropagation && Bv.add(h);
    const m = a(p, h), y = (T, w) => {
      window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", S), Io.has(p) && Io.delete(p), Vv(T) && typeof m == "function" && m(T, { success: w });
    }, b = (T) => {
      y(T, p === window || p === document || l.useGlobalTarget || FS(p, T.target));
    }, S = (T) => {
      y(T, !1);
    };
    window.addEventListener("pointerup", b, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", d, o), Qo(h) && (h.addEventListener("focus", (m) => vj(m, o)), !pj(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function Uh(t) {
  return Kb(t) && "ownerSVGElement" in t;
}
const Zo = /* @__PURE__ */ new WeakMap();
let Jo;
const XS = (t, a, l) => (s, o) => o && o[0] ? o[0][t + "Size"] : Uh(s) && "getBBox" in s ? s.getBBox()[a] : s[l], Sj = /* @__PURE__ */ XS("inline", "width", "offsetWidth"), xj = /* @__PURE__ */ XS("block", "height", "offsetHeight");
function Ej({ target: t, borderBoxSize: a }) {
  Zo.get(t)?.forEach((l) => {
    l(t, {
      get width() {
        return Sj(t, a);
      },
      get height() {
        return xj(t, a);
      }
    });
  });
}
function Tj(t) {
  t.forEach(Ej);
}
function wj() {
  typeof ResizeObserver > "u" || (Jo = new ResizeObserver(Tj));
}
function Rj(t, a) {
  Jo || wj();
  const l = kS(t);
  return l.forEach((s) => {
    let o = Zo.get(s);
    o || (o = /* @__PURE__ */ new Set(), Zo.set(s, o)), o.add(a), Jo?.observe(s);
  }), () => {
    l.forEach((s) => {
      const o = Zo.get(s);
      o?.delete(a), o?.size || Jo?.unobserve(s);
    });
  };
}
const Wo = /* @__PURE__ */ new Set();
let Ll;
function Cj() {
  Ll = () => {
    const t = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Wo.forEach((a) => a(t));
  }, window.addEventListener("resize", Ll);
}
function Mj(t) {
  return Wo.add(t), Ll || Cj(), () => {
    Wo.delete(t), !Wo.size && typeof Ll == "function" && (window.removeEventListener("resize", Ll), Ll = void 0);
  };
}
function Hv(t, a) {
  return typeof t == "function" ? Mj(t) : Rj(t, a);
}
function Aj(t) {
  return Uh(t) && t.tagName === "svg";
}
const jj = [...BS, Mt, Hn], Dj = (t) => jj.find(VS(t)), qv = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Ul = () => ({
  x: qv(),
  y: qv()
}), kv = () => ({ min: 0, max: 0 }), jt = () => ({
  x: kv(),
  y: kv()
}), Nj = /* @__PURE__ */ new WeakMap();
function wu(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function ns(t) {
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
function Ru(t) {
  return wu(t.animate) || Bh.some((a) => ns(t[a]));
}
function $S(t) {
  return !!(Ru(t) || t.variants);
}
function zj(t, a, l) {
  for (const s in a) {
    const o = a[s], c = l[s];
    if (Bt(o))
      t.addValue(s, o);
    else if (Bt(c))
      t.addValue(s, ql(o, { owner: t }));
    else if (c !== o)
      if (t.hasValue(s)) {
        const d = t.getValue(s);
        d.liveStyle === !0 ? d.jump(o) : d.hasAnimated || d.set(o);
      } else {
        const d = t.getStaticValue(s);
        t.addValue(s, ql(d !== void 0 ? d : o, { owner: t }));
      }
  }
  for (const s in l)
    a[s] === void 0 && t.removeValue(s);
  return a;
}
const fu = { current: null }, Hh = { current: !1 }, _j = typeof window < "u";
function KS() {
  if (Hh.current = !0, !!_j)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => fu.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      fu.current = !1;
}
const Pv = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let du = {};
function QS(t) {
  du = t;
}
function Oj() {
  return du;
}
class Lj {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Ah, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = $t.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, tt.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: y } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = l.initial ? { ...m } : {}, this.renderState = y, this.parent = a, this.props = l, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = p, this.blockInitialAnimation = !!d, this.isControllingVariants = Ru(l), this.isVariantNode = $S(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: b, ...S } = this.scrapeMotionValuesFromProps(l, {}, this);
    for (const T in S) {
      const w = S[T];
      m[T] !== void 0 && Bt(w) && w.set(m[T]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const l in this.initialValues)
        this.values.get(l)?.jump(this.initialValues[l]), this.latestValues[l] = this.initialValues[l];
    this.current = a, Nj.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Hh.current || KS(), this.shouldReduceMotion = fu.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), l.accelerate && jS.has(a) && this.current instanceof HTMLElement) {
      const { factory: d, keyframes: h, times: p, ease: m, duration: y } = l.accelerate, b = new MS({
        element: this.current,
        name: a,
        keyframes: h,
        times: p,
        ease: m,
        duration: /* @__PURE__ */ an(y)
      }), S = d(b);
      this.valueSubscriptions.set(a, () => {
        S(), b.cancel();
      });
      return;
    }
    const s = Gl.has(a);
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
    for (let s = 0; s < Pv.length; s++) {
      const o = Pv[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, d = a[c];
      d && (this.propEventSubscriptions[o] = this.on(o, d));
    }
    this.prevMotionValues = zj(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s != null && (typeof s == "string" && ($b(s) || Qb(s)) ? s = parseFloat(s) : !Dj(s) && Hn.test(l) && (s = qS(a, l)), this.setBaseTarget(a, Bt(s) ? s.get() : s)), Bt(s) ? s.get() : s;
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
class IS extends Lj {
  constructor() {
    super(...arguments), this.KeyframeResolver = cj;
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
function ZS({ top: t, left: a, right: l, bottom: s }) {
  return {
    x: { min: a, max: l },
    y: { min: t, max: s }
  };
}
function Uj({ x: t, y: a }) {
  return { top: a.min, right: t.max, bottom: a.max, left: t.min };
}
function Vj(t, a) {
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
function rd(t) {
  return t === void 0 || t === 1;
}
function Xd({ scale: t, scaleX: a, scaleY: l }) {
  return !rd(t) || !rd(a) || !rd(l);
}
function Ui(t) {
  return Xd(t) || JS(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function JS(t) {
  return Yv(t.x) || Yv(t.y);
}
function Yv(t) {
  return t && t !== "0%";
}
function hu(t, a, l) {
  const s = t - l, o = a * s;
  return l + o;
}
function Gv(t, a, l, s, o) {
  return o !== void 0 && (t = hu(t, o, s)), hu(t, l, s) + a;
}
function $d(t, a = 0, l = 1, s, o) {
  t.min = Gv(t.min, a, l, s, o), t.max = Gv(t.max, a, l, s, o);
}
function WS(t, { x: a, y: l }) {
  $d(t.x, a.translate, a.scale, a.originPoint), $d(t.y, l.translate, l.scale, l.originPoint);
}
const Fv = 0.999999999999, Xv = 1.0000000000001;
function Bj(t, a, l, s = !1) {
  const o = l.length;
  if (!o)
    return;
  a.x = a.y = 1;
  let c, d;
  for (let h = 0; h < o; h++) {
    c = l[h], d = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (In(t.x, -c.scroll.offset.x), In(t.y, -c.scroll.offset.y)), d && (a.x *= d.x.scale, a.y *= d.y.scale, WS(t, d)), s && Ui(c.latestValues) && eu(t, c.latestValues, c.layout?.layoutBox));
  }
  a.x < Xv && a.x > Fv && (a.x = 1), a.y < Xv && a.y > Fv && (a.y = 1);
}
function In(t, a) {
  t.min += a, t.max += a;
}
function $v(t, a, l, s, o = 0.5) {
  const c = st(t.min, t.max, o);
  $d(t, a, l, c, s);
}
function Kv(t, a) {
  return typeof t == "string" ? parseFloat(t) / 100 * (a.max - a.min) : t;
}
function eu(t, a, l) {
  const s = l ?? t;
  $v(t.x, Kv(a.x, s.x), a.scaleX, a.scale, a.originX), $v(t.y, Kv(a.y, s.y), a.scaleY, a.scale, a.originY);
}
function ex(t, a) {
  return ZS(Vj(t.getBoundingClientRect(), a));
}
function Hj(t, a, l) {
  const s = ex(t, l), { scroll: o } = a;
  return o && (In(s.x, o.offset.x), In(s.y, o.offset.y)), s;
}
const qj = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, kj = Yl.length;
function Pj(t, a, l) {
  let s = "", o = !0;
  for (let c = 0; c < kj; c++) {
    const d = Yl[c], h = t[d];
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
      const m = PS(h, _h[d]);
      if (!p) {
        o = !1;
        const y = qj[d] || d;
        s += `${y}(${m}) `;
      }
      l && (a[d] = m);
    }
  }
  return s = s.trim(), l ? s = l(a, o ? "" : s) : o && (s = "none"), s;
}
function qh(t, a, l) {
  const { style: s, vars: o, transformOrigin: c } = t;
  let d = !1, h = !1;
  for (const p in a) {
    const m = a[p];
    if (Gl.has(p)) {
      d = !0;
      continue;
    } else if (cS(p)) {
      o[p] = m;
      continue;
    } else {
      const y = PS(m, _h[p]);
      p.startsWith("origin") ? (h = !0, c[p] = y) : s[p] = y;
    }
  }
  if (a.transform || (d || l ? s.transform = Pj(a, t.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: p = "50%", originY: m = "50%", originZ: y = 0 } = c;
    s.transformOrigin = `${p} ${m} ${y}`;
  }
}
function tx(t, { style: a, vars: l }, s, o) {
  const c = t.style;
  let d;
  for (d in a)
    c[d] = a[d];
  o?.applyProjectionStyles(c, s);
  for (d in l)
    c.setProperty(d, l[d]);
}
function Qv(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const kr = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (ye.test(t))
        t = parseFloat(t);
      else
        return t;
    const l = Qv(t, a.target.x), s = Qv(t, a.target.y);
    return `${l}% ${s}%`;
  }
}, Yj = {
  correct: (t, { treeScale: a, projectionDelta: l }) => {
    const s = t, o = Hn.parse(t);
    if (o.length > 5)
      return s;
    const c = Hn.createTransformer(t), d = typeof o[0] != "number" ? 1 : 0, h = l.x.scale * a.x, p = l.y.scale * a.y;
    o[0 + d] /= h, o[1 + d] /= p;
    const m = st(h, p, 0.5);
    return typeof o[2 + d] == "number" && (o[2 + d] /= m), typeof o[3 + d] == "number" && (o[3 + d] /= m), c(o);
  }
}, Kd = {
  borderRadius: {
    ...kr,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: kr,
  borderTopRightRadius: kr,
  borderBottomLeftRadius: kr,
  borderBottomRightRadius: kr,
  boxShadow: Yj
};
function nx(t, { layout: a, layoutId: l }) {
  return Gl.has(t) || t.startsWith("origin") || (a || l !== void 0) && (!!Kd[t] || t === "opacity");
}
function kh(t, a, l) {
  const s = t.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const d in s)
    (Bt(s[d]) || o && Bt(o[d]) || nx(d, t) || l?.getValue(d)?.liveStyle !== void 0) && (c[d] = s[d]);
  return c;
}
function Gj(t) {
  return window.getComputedStyle(t);
}
class Fj extends IS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = tx;
  }
  readValueFromInstance(a, l) {
    if (Gl.has(l))
      return this.projection?.isProjecting ? Ld(l) : fA(a, l);
    {
      const s = Gj(a), o = (cS(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: l }) {
    return ex(a, l);
  }
  build(a, l, s) {
    qh(a, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return kh(a, l, s);
  }
}
const Xj = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, $j = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Kj(t, a, l = 1, s = 0, o = !0) {
  t.pathLength = 1;
  const c = o ? Xj : $j;
  t[c.offset] = `${-s}`, t[c.array] = `${a} ${l}`;
}
const Qj = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function ax(t, {
  attrX: a,
  attrY: l,
  attrScale: s,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: d = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, p, m, y) {
  if (qh(t, h, m), p) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: b, style: S } = t;
  b.transform && (S.transform = b.transform, delete b.transform), (S.transform || b.transformOrigin) && (S.transformOrigin = b.transformOrigin ?? "50% 50%", delete b.transformOrigin), S.transform && (S.transformBox = y?.transformBox ?? "fill-box", delete b.transformBox);
  for (const T of Qj)
    b[T] !== void 0 && (S[T] = b[T], delete b[T]);
  a !== void 0 && (b.x = a), l !== void 0 && (b.y = l), s !== void 0 && (b.scale = s), o !== void 0 && Kj(b, o, c, d, !1);
}
const ix = /* @__PURE__ */ new Set([
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
]), lx = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Ij(t, a, l, s) {
  tx(t, a, void 0, s);
  for (const o in a.attrs)
    t.setAttribute(ix.has(o) ? o : zh(o), a.attrs[o]);
}
function rx(t, a, l) {
  const s = kh(t, a, l);
  for (const o in t)
    if (Bt(t[o]) || Bt(a[o])) {
      const c = Yl.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = t[o];
    }
  return s;
}
class Zj extends IS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = jt;
  }
  getBaseTargetFromProps(a, l) {
    return a[l];
  }
  readValueFromInstance(a, l) {
    if (Gl.has(l)) {
      const s = HS(l);
      return s && s.default || 0;
    }
    return l = ix.has(l) ? l : zh(l), a.getAttribute(l);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return rx(a, l, s);
  }
  build(a, l, s) {
    ax(a, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, l, s, o) {
    Ij(a, l, s, o);
  }
  mount(a) {
    this.isSVGTag = lx(a.tagName), super.mount(a);
  }
}
const Jj = Bh.length;
function sx(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const l = t.parent ? sx(t.parent) || {} : {};
    return t.props.initial !== void 0 && (l.initial = t.props.initial), l;
  }
  const a = {};
  for (let l = 0; l < Jj; l++) {
    const s = Bh[l], o = t.props[s];
    (ns(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function ox(t, a) {
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
const Wj = [...Vh].reverse(), eD = Vh.length;
function tD(t) {
  return (a) => Promise.all(a.map(({ animation: l, options: s }) => WA(t, l, s)));
}
function nD(t) {
  let a = tD(t), l = Iv(), s = !0, o = !1;
  const c = (m) => (y, b) => {
    const S = ki(t, b, m === "exit" ? t.presenceContext?.custom : void 0);
    if (S) {
      const { transition: T, transitionEnd: w, ...R } = S;
      y = { ...y, ...R, ...w };
    }
    return y;
  };
  function d(m) {
    a = m(t);
  }
  function h(m) {
    const { props: y } = t, b = sx(t.parent) || {}, S = [], T = /* @__PURE__ */ new Set();
    let w = {}, R = 1 / 0;
    for (let _ = 0; _ < eD; _++) {
      const B = Wj[_], L = l[B], V = y[B] !== void 0 ? y[B] : b[B], $ = ns(V), K = B === m ? L.isActive : null;
      K === !1 && (R = _);
      let te = V === b[B] && V !== y[B] && $;
      if (te && (s || o) && t.manuallyAnimateOnMount && (te = !1), L.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !L.isActive && K === null || // If we didn't and don't have any defined prop for this animation type
      !V && !L.prevProp || // Or if the prop doesn't define an animation
      wu(V) || typeof V == "boolean")
        continue;
      if (B === "exit" && L.isActive && K !== !0) {
        L.prevResolvedValues && (w = {
          ...w,
          ...L.prevResolvedValues
        });
        continue;
      }
      const A = aD(L.prevProp, V);
      let Q = A || // If we're making this variant active, we want to always make it active
      B === m && L.isActive && !te && $ || // If we removed a higher-priority variant (i is in reverse order)
      _ > R && $, ne = !1;
      const ce = Array.isArray(V) ? V : [V];
      let W = ce.reduce(c(B), {});
      K === !1 && (W = {});
      const { prevResolvedValues: se = {} } = L, G = {
        ...se,
        ...W
      }, I = (ie) => {
        Q = !0, T.has(ie) && (ne = !0, T.delete(ie)), L.needsAnimating[ie] = !0;
        const ue = t.getValue(ie);
        ue && (ue.liveStyle = !1);
      };
      for (const ie in G) {
        const ue = W[ie], Re = se[ie];
        if (w.hasOwnProperty(ie))
          continue;
        let j = !1;
        kd(ue) && kd(Re) ? j = !ox(ue, Re) : j = ue !== Re, j ? ue != null ? I(ie) : T.add(ie) : ue !== void 0 && T.has(ie) ? I(ie) : L.protectedKeys[ie] = !0;
      }
      L.prevProp = V, L.prevResolvedValues = W, L.isActive && (w = { ...w, ...W }), (s || o) && t.blockInitialAnimation && (Q = !1);
      const N = te && A;
      Q && (!N || ne) && S.push(...ce.map((ie) => {
        const ue = { type: B };
        if (typeof ie == "string" && (s || o) && !N && t.manuallyAnimateOnMount && t.parent) {
          const { parent: Re } = t, j = ki(Re, ie);
          if (Re.enteringChildren && j) {
            const { delayChildren: F } = j.transition || {};
            ue.delay = DS(Re.enteringChildren, t, F);
          }
        }
        return {
          animation: ie,
          options: ue
        };
      }));
    }
    if (T.size) {
      const _ = {};
      if (typeof y.initial != "boolean") {
        const B = ki(t, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        B && B.transition && (_.transition = B.transition);
      }
      T.forEach((B) => {
        const L = t.getBaseTarget(B), V = t.getValue(B);
        V && (V.liveStyle = !0), _[B] = L ?? null;
      }), S.push({ animation: _ });
    }
    let D = !!S.length;
    return s && (y.initial === !1 || y.initial === y.animate) && !t.manuallyAnimateOnMount && (D = !1), s = !1, o = !1, D ? a(S) : Promise.resolve();
  }
  function p(m, y) {
    if (l[m].isActive === y)
      return Promise.resolve();
    t.variantChildren?.forEach((S) => S.animationState?.setActive(m, y)), l[m].isActive = y;
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
      l = Iv(), o = !0;
    }
  };
}
function aD(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !ox(a, t) : !1;
}
function _i(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Iv() {
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
function Zv(t, a) {
  t.translate = a.translate, t.scale = a.scale, t.originPoint = a.originPoint, t.origin = a.origin;
}
const ux = 1e-4, iD = 1 - ux, lD = 1 + ux, cx = 0.01, rD = 0 - cx, sD = 0 + cx;
function Kt(t) {
  return t.max - t.min;
}
function oD(t, a, l) {
  return Math.abs(t - a) <= l;
}
function Jv(t, a, l, s = 0.5) {
  t.origin = s, t.originPoint = st(a.min, a.max, t.origin), t.scale = Kt(l) / Kt(a), t.translate = st(l.min, l.max, t.origin) - t.originPoint, (t.scale >= iD && t.scale <= lD || isNaN(t.scale)) && (t.scale = 1), (t.translate >= rD && t.translate <= sD || isNaN(t.translate)) && (t.translate = 0);
}
function Ir(t, a, l, s) {
  Jv(t.x, a.x, l.x, s ? s.originX : void 0), Jv(t.y, a.y, l.y, s ? s.originY : void 0);
}
function Wv(t, a, l, s = 0) {
  const o = s ? st(l.min, l.max, s) : l.min;
  t.min = o + a.min, t.max = t.min + Kt(a);
}
function uD(t, a, l, s) {
  Wv(t.x, a.x, l.x, s?.x), Wv(t.y, a.y, l.y, s?.y);
}
function e0(t, a, l, s = 0) {
  const o = s ? st(l.min, l.max, s) : l.min;
  t.min = a.min - o, t.max = t.min + Kt(a);
}
function mu(t, a, l, s) {
  e0(t.x, a.x, l.x, s?.x), e0(t.y, a.y, l.y, s?.y);
}
function t0(t, a, l, s, o) {
  return t -= a, t = hu(t, 1 / l, s), o !== void 0 && (t = hu(t, 1 / o, s)), t;
}
function cD(t, a = 0, l = 1, s = 0.5, o, c = t, d = t) {
  if (Zn.test(a) && (a = parseFloat(a), a = st(d.min, d.max, a / 100) - d.min), typeof a != "number")
    return;
  let h = st(c.min, c.max, s);
  t === c && (h -= a), t.min = t0(t.min, a, l, h, o), t.max = t0(t.max, a, l, h, o);
}
function n0(t, a, [l, s, o], c, d) {
  cD(t, a[l], a[s], a[o], a.scale, c, d);
}
const fD = ["x", "scaleX", "originX"], dD = ["y", "scaleY", "originY"];
function a0(t, a, l, s) {
  n0(t.x, a, fD, l ? l.x : void 0, s ? s.x : void 0), n0(t.y, a, dD, l ? l.y : void 0, s ? s.y : void 0);
}
function i0(t) {
  return t.translate === 0 && t.scale === 1;
}
function fx(t) {
  return i0(t.x) && i0(t.y);
}
function l0(t, a) {
  return t.min === a.min && t.max === a.max;
}
function hD(t, a) {
  return l0(t.x, a.x) && l0(t.y, a.y);
}
function r0(t, a) {
  return Math.round(t.min) === Math.round(a.min) && Math.round(t.max) === Math.round(a.max);
}
function dx(t, a) {
  return r0(t.x, a.x) && r0(t.y, a.y);
}
function s0(t) {
  return Kt(t.x) / Kt(t.y);
}
function o0(t, a) {
  return t.translate === a.translate && t.scale === a.scale && t.originPoint === a.originPoint;
}
function Qn(t) {
  return [t("x"), t("y")];
}
function mD(t, a, l) {
  let s = "";
  const o = t.x.translate / a.x, c = t.y.translate / a.y, d = l?.z || 0;
  if ((o || c || d) && (s = `translate3d(${o}px, ${c}px, ${d}px) `), (a.x !== 1 || a.y !== 1) && (s += `scale(${1 / a.x}, ${1 / a.y}) `), l) {
    const { transformPerspective: m, rotate: y, rotateX: b, rotateY: S, skewX: T, skewY: w } = l;
    m && (s = `perspective(${m}px) ${s}`), y && (s += `rotate(${y}deg) `), b && (s += `rotateX(${b}deg) `), S && (s += `rotateY(${S}deg) `), T && (s += `skewX(${T}deg) `), w && (s += `skewY(${w}deg) `);
  }
  const h = t.x.scale * a.x, p = t.y.scale * a.y;
  return (h !== 1 || p !== 1) && (s += `scale(${h}, ${p})`), s || "none";
}
const hx = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius"
], pD = hx.length, u0 = (t) => typeof t == "string" ? parseFloat(t) : t, c0 = (t) => typeof t == "number" || ye.test(t);
function yD(t, a, l, s, o, c) {
  o ? (t.opacity = st(0, l.opacity ?? 1, gD(s)), t.opacityExit = st(a.opacity ?? 1, 0, vD(s))) : c && (t.opacity = st(a.opacity ?? 1, l.opacity ?? 1, s));
  for (let d = 0; d < pD; d++) {
    const h = hx[d];
    let p = f0(a, h), m = f0(l, h);
    if (p === void 0 && m === void 0)
      continue;
    p || (p = 0), m || (m = 0), p === 0 || m === 0 || c0(p) === c0(m) ? (t[h] = Math.max(st(u0(p), u0(m), s), 0), (Zn.test(m) || Zn.test(p)) && (t[h] += "%")) : t[h] = m;
  }
  (a.rotate || l.rotate) && (t.rotate = st(a.rotate || 0, l.rotate || 0, s));
}
function f0(t, a) {
  return t[a] !== void 0 ? t[a] : t.borderRadius;
}
const gD = /* @__PURE__ */ mx(0, 0.5, iS), vD = /* @__PURE__ */ mx(0.5, 0.95, An);
function mx(t, a, l) {
  return (s) => s < t ? 0 : s > a ? 1 : l(/* @__PURE__ */ es(t, a, s));
}
function bD(t, a, l) {
  const s = Bt(t) ? t : ql(t);
  return s.start(Dh("", s, a, l)), s.animation;
}
function as(t, a, l, s = { passive: !0 }) {
  return t.addEventListener(a, l, s), () => t.removeEventListener(a, l);
}
const SD = (t, a) => t.depth - a.depth;
class xD {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(a) {
    vh(this.children, a), this.isDirty = !0;
  }
  remove(a) {
    ru(this.children, a), this.isDirty = !0;
  }
  forEach(a) {
    this.isDirty && this.children.sort(SD), this.isDirty = !1, this.children.forEach(a);
  }
}
function ED(t, a) {
  const l = $t.now(), s = ({ timestamp: o }) => {
    const c = o - l;
    c >= a && (ci(s), t(c - a));
  };
  return tt.setup(s, !0), () => ci(s);
}
function tu(t) {
  return Bt(t) ? t.get() : t;
}
class TD {
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
const nu = {
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
}, sd = ["", "X", "Y", "Z"], wD = 1e3;
let RD = 0;
function od(t, a, l, s) {
  const { latestValues: o } = a;
  o[t] && (l[t] = o[t], a.setStaticValue(t, 0), s && (s[t] = 0));
}
function px(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: a } = t.options;
  if (!a)
    return;
  const l = LS(a);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: o, layoutId: c } = t.options;
    window.MotionCancelOptimisedAnimation(l, "transform", tt, !(o || c));
  }
  const { parent: s } = t;
  s && !s.hasCheckedOptimisedAppear && px(s);
}
function yx({ attachResizeListener: t, defaultParent: a, measureScroll: l, checkIsScrollRoot: s, resetTransform: o }) {
  return class {
    constructor(d = {}, h = a?.()) {
      this.id = RD++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(AD), this.nodes.forEach(OD), this.nodes.forEach(LD), this.nodes.forEach(jD);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = d, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new xD());
    }
    addEventListener(d, h) {
      return this.eventHandlers.has(d) || this.eventHandlers.set(d, new bh()), this.eventHandlers.get(d).add(h);
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
      this.isSVG = Uh(d) && !Aj(d), this.instance = d;
      const { layoutId: h, layout: p, visualElement: m } = this.options;
      if (m && !m.current && m.mount(d), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0), t) {
        let y, b = 0;
        const S = () => this.root.updateBlockedByResize = !1;
        tt.read(() => {
          b = window.innerWidth;
        }), t(d, () => {
          const T = window.innerWidth;
          T !== b && (b = T, this.root.updateBlockedByResize = !0, y && y(), y = ED(S, 250), nu.hasAnimatedSinceResize && (nu.hasAnimatedSinceResize = !1, this.nodes.forEach(m0)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || p) && this.addEventListener("didUpdate", ({ delta: y, hasLayoutChanged: b, hasRelativeLayoutChanged: S, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const w = this.options.transition || m.getDefaultTransition() || qD, { onLayoutAnimationStart: R, onLayoutAnimationComplete: D } = m.getProps(), _ = !this.targetLayout || !dx(this.targetLayout, T), B = !b && S;
        if (this.options.layoutRoot || this.resumeFrom || B || b && (_ || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const L = {
            ...jh(w, "layout"),
            onPlay: R,
            onComplete: D
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (L.delay = 0, L.type = !1), this.startAnimation(L), this.setAnimationOrigin(y, B);
        } else
          b || m0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const d = this.getStack();
      d && d.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ci(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(UD), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && px(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(ND), this.nodes.forEach(d0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(h0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(zD), this.nodes.forEach(_D), this.nodes.forEach(CD), this.nodes.forEach(MD)) : this.nodes.forEach(h0), this.clearAllSnapshots();
      const h = $t.now();
      Vt.delta = Wn(0, 1e3 / 60, h - Vt.timestamp), Vt.timestamp = h, Vt.isProcessing = !0, Wf.update.process(Vt), Wf.preRender.process(Vt), Wf.render.process(Vt), Vt.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Oh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(DD), this.sharedNodes.forEach(VD);
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
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Kt(this.snapshot.measuredBox.x) && !Kt(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++)
          this.path[p].updateScroll();
      const d = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = jt()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
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
      const d = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !fx(this.projectionDelta), p = this.getTransformTemplate(), m = p ? p(this.latestValues, "") : void 0, y = m !== this.prevTransformTemplateValue;
      d && this.instance && (h || Ui(this.latestValues) || y) && (o(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(d = !0) {
      const h = this.measurePageBox();
      let p = this.removeElementScroll(h);
      return d && (p = this.removeTransform(p)), kD(p), {
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
        return jt();
      const h = d.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(PD))) {
        const { scroll: m } = this.root;
        m && (In(h.x, m.offset.x), In(h.y, m.offset.y));
      }
      return h;
    }
    removeElementScroll(d) {
      const h = jt();
      if (Vn(h, d), this.scroll?.wasRoot)
        return h;
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p], { scroll: y, options: b } = m;
        m !== this.root && y && b.layoutScroll && (y.wasRoot && Vn(h, d), In(h.x, y.offset.x), In(h.y, y.offset.y));
      }
      return h;
    }
    applyTransform(d, h = !1, p) {
      const m = p || jt();
      Vn(m, d);
      for (let y = 0; y < this.path.length; y++) {
        const b = this.path[y];
        !h && b.options.layoutScroll && b.scroll && b !== b.root && (In(m.x, -b.scroll.offset.x), In(m.y, -b.scroll.offset.y)), Ui(b.latestValues) && eu(m, b.latestValues, b.layout?.layoutBox);
      }
      return Ui(this.latestValues) && eu(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(d) {
      const h = jt();
      Vn(h, d);
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p];
        if (!Ui(m.latestValues))
          continue;
        let y;
        m.instance && (Xd(m.latestValues) && m.updateSnapshot(), y = jt(), Vn(y, m.measurePageBox())), a0(h, m.latestValues, m.snapshot?.layoutBox, y);
      }
      return Ui(this.latestValues) && a0(h, this.latestValues), h;
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
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Vt.timestamp && this.relativeParent.resolveTargetDelta(!0);
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
      this.resolvedRelativeTargetAt = Vt.timestamp;
      const S = this.getClosestProjectingParent();
      S && this.linkedParentVersion !== S.layoutVersion && !S.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && S && S.layout ? this.createRelativeTarget(S, this.layout.layoutBox, S.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = jt(), this.targetWithTransforms = jt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), uD(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Vn(this.target, this.layout.layoutBox), WS(this.target, this.targetDelta)) : Vn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && S && !!S.resumingFrom == !!this.resumingFrom && !S.options.layoutScroll && S.target && this.animationProgress !== 1 ? this.createRelativeTarget(S, this.target, S.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Xd(this.parent.latestValues) || JS(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(d, h, p) {
      this.relativeParent = d, this.linkedParentVersion = d.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = jt(), this.relativeTargetOrigin = jt(), mu(this.relativeTargetOrigin, h, p, this.options.layoutAnchor || void 0), Vn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const d = this.getLead(), h = !!this.resumingFrom || this !== d;
      let p = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1), this.resolvedRelativeTargetAt === Vt.timestamp && (p = !1), p)
        return;
      const { layout: m, layoutId: y } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(m || y))
        return;
      Vn(this.layoutCorrected, this.layout.layoutBox);
      const b = this.treeScale.x, S = this.treeScale.y;
      Bj(this.layoutCorrected, this.treeScale, this.path, h), d.layout && !d.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (d.target = d.layout.layoutBox, d.targetWithTransforms = jt());
      const { target: T } = d;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Zv(this.prevProjectionDelta.x, this.projectionDelta.x), Zv(this.prevProjectionDelta.y, this.projectionDelta.y)), Ir(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== b || this.treeScale.y !== S || !o0(this.projectionDelta.x, this.prevProjectionDelta.x) || !o0(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
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
      this.prevProjectionDelta = Ul(), this.projectionDelta = Ul(), this.projectionDeltaWithTransform = Ul();
    }
    setAnimationOrigin(d, h = !1) {
      const p = this.snapshot, m = p ? p.latestValues : {}, y = { ...this.latestValues }, b = Ul();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const S = jt(), T = p ? p.source : void 0, w = this.layout ? this.layout.source : void 0, R = T !== w, D = this.getStack(), _ = !D || D.members.length <= 1, B = !!(R && !_ && this.options.crossfade === !0 && !this.path.some(HD));
      this.animationProgress = 0;
      let L;
      this.mixTargetDelta = (V) => {
        const $ = V / 1e3;
        p0(b.x, d.x, $), p0(b.y, d.y, $), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (mu(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), BD(this.relativeTarget, this.relativeTargetOrigin, S, $), L && hD(this.relativeTarget, L) && (this.isProjectionDirty = !1), L || (L = jt()), Vn(L, this.relativeTarget)), R && (this.animationValues = y, yD(y, m, this.latestValues, $, B, _)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = $;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (ci(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = tt.update(() => {
        nu.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = ql(0)), this.motionValue.jump(0, !1), this.currentAnimation = bD(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(wD), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: h, target: p, layout: m, latestValues: y } = d;
      if (!(!h || !p || !m)) {
        if (this !== d && this.layout && m && gx(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          p = this.target || jt();
          const b = Kt(this.layout.layoutBox.x);
          p.x.min = d.target.x.min, p.x.max = p.x.min + b;
          const S = Kt(this.layout.layoutBox.y);
          p.y.min = d.target.y.min, p.y.max = p.y.min + S;
        }
        Vn(h, p), eu(h, y), Ir(this.projectionDeltaWithTransform, this.layoutCorrected, h, y);
      }
    }
    registerSharedNode(d, h) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new TD()), this.sharedNodes.get(d).add(h);
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
        this.needsReset = !1, d.visibility = "", d.opacity = "", d.pointerEvents = tu(h?.pointerEvents) || "", d.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, d.pointerEvents = tu(h?.pointerEvents) || ""), this.hasProjected && !Ui(this.latestValues) && (d.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      d.visibility = "";
      const y = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let b = mD(this.projectionDeltaWithTransform, this.treeScale, y);
      p && (b = p(y, b)), d.transform = b;
      const { x: S, y: T } = this.projectionDelta;
      d.transformOrigin = `${S.origin * 100}% ${T.origin * 100}% 0`, m.animationValues ? d.opacity = m === this ? y.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : y.opacityExit : d.opacity = m === this ? y.opacity !== void 0 ? y.opacity : "" : y.opacityExit !== void 0 ? y.opacityExit : 0;
      for (const w in Kd) {
        if (y[w] === void 0)
          continue;
        const { correct: R, applyTo: D, isCSSVariable: _ } = Kd[w], B = b === "none" ? y[w] : R(y[w], m);
        if (D) {
          const L = D.length;
          for (let V = 0; V < L; V++)
            d[D[V]] = B;
        } else
          _ ? this.options.visualElement.renderState.vars[w] = B : d[w] = B;
      }
      this.options.layoutId && (d.pointerEvents = m === this ? tu(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((d) => d.currentAnimation?.stop()), this.root.nodes.forEach(d0), this.root.sharedNodes.clear();
    }
  };
}
function CD(t) {
  t.updateLayout();
}
function MD(t) {
  const a = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && a && t.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: s } = t.layout, { animationType: o } = t.options, c = a.source !== t.layout.source;
    if (o === "size")
      Qn((y) => {
        const b = c ? a.measuredBox[y] : a.layoutBox[y], S = Kt(b);
        b.min = l[y].min, b.max = b.min + S;
      });
    else if (o === "x" || o === "y") {
      const y = o === "x" ? "y" : "x";
      Qd(c ? a.measuredBox[y] : a.layoutBox[y], l[y]);
    } else gx(o, a.layoutBox, l) && Qn((y) => {
      const b = c ? a.measuredBox[y] : a.layoutBox[y], S = Kt(l[y]);
      b.max = b.min + S, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[y].max = t.relativeTarget[y].min + S);
    });
    const d = Ul();
    Ir(d, l, a.layoutBox);
    const h = Ul();
    c ? Ir(h, t.applyTransform(s, !0), a.measuredBox) : Ir(h, l, a.layoutBox);
    const p = !fx(d);
    let m = !1;
    if (!t.resumeFrom) {
      const y = t.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: b, layout: S } = y;
        if (b && S) {
          const T = t.options.layoutAnchor || void 0, w = jt();
          mu(w, a.layoutBox, b.layoutBox, T);
          const R = jt();
          mu(R, l, S.layoutBox, T), dx(w, R) || (m = !0), y.options.layoutRoot && (t.relativeTarget = R, t.relativeTargetOrigin = w, t.relativeParent = y);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: l,
      snapshot: a,
      delta: h,
      layoutDelta: d,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: m
    });
  } else if (t.isLead()) {
    const { onExitComplete: l } = t.options;
    l && l();
  }
  t.options.transition = void 0;
}
function AD(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function jD(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function DD(t) {
  t.clearSnapshot();
}
function d0(t) {
  t.clearMeasurements();
}
function ND(t) {
  t.isLayoutDirty = !0, t.updateLayout();
}
function h0(t) {
  t.isLayoutDirty = !1;
}
function zD(t) {
  t.isAnimationBlocked && t.layout && !t.isLayoutDirty && (t.snapshot = t.layout, t.isLayoutDirty = !0);
}
function _D(t) {
  const { visualElement: a } = t.options;
  a && a.getProps().onBeforeLayoutMeasure && a.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function m0(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function OD(t) {
  t.resolveTargetDelta();
}
function LD(t) {
  t.calcProjection();
}
function UD(t) {
  t.resetSkewAndRotation();
}
function VD(t) {
  t.removeLeadSnapshot();
}
function p0(t, a, l) {
  t.translate = st(a.translate, 0, l), t.scale = st(a.scale, 1, l), t.origin = a.origin, t.originPoint = a.originPoint;
}
function y0(t, a, l, s) {
  t.min = st(a.min, l.min, s), t.max = st(a.max, l.max, s);
}
function BD(t, a, l, s) {
  y0(t.x, a.x, l.x, s), y0(t.y, a.y, l.y, s);
}
function HD(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const qD = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, g0 = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), v0 = g0("applewebkit/") && !g0("chrome/") ? Math.round : An;
function b0(t) {
  t.min = v0(t.min), t.max = v0(t.max);
}
function kD(t) {
  b0(t.x), b0(t.y);
}
function gx(t, a, l) {
  return t === "position" || t === "preserve-aspect" && !oD(s0(a), s0(l), 0.2);
}
function PD(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const YD = yx({
  attachResizeListener: (t, a) => as(t, "resize", a),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), ud = {
  current: void 0
}, vx = yx({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!ud.current) {
      const t = new YD({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), ud.current = t;
    }
    return ud.current;
  },
  resetTransform: (t, a) => {
    t.style.transform = a !== void 0 ? a : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), Ph = x.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function S0(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function GD(...t) {
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
function FD(...t) {
  return x.useCallback(GD(...t), t);
}
class XD extends x.Component {
  getSnapshotBeforeUpdate(a) {
    const l = this.props.childRef.current;
    if (Qo(l) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = l.offsetParent, o = Qo(s) && s.offsetWidth || 0, c = Qo(s) && s.offsetHeight || 0, d = getComputedStyle(l), h = this.props.sizeRef.current;
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
function $D({ children: t, isPresent: a, anchorX: l, anchorY: s, root: o, pop: c }) {
  const d = x.useId(), h = x.useRef(null), p = x.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = x.useContext(Ph), y = t.props?.ref ?? t?.ref, b = FD(h, y);
  return x.useInsertionEffect(() => {
    const { width: S, height: T, top: w, left: R, right: D, bottom: _ } = p.current;
    if (a || c === !1 || !h.current || !S || !T)
      return;
    const B = l === "left" ? `left: ${R}` : `right: ${D}`, L = s === "bottom" ? `bottom: ${_}` : `top: ${w}`;
    h.current.dataset.motionPopId = d;
    const V = document.createElement("style");
    m && (V.nonce = m);
    const $ = o ?? document.head;
    return $.appendChild(V), V.sheet && V.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${T}px !important;
            ${B}px !important;
            ${L}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), $.contains(V) && $.removeChild(V);
    };
  }, [a]), v.jsx(XD, { isPresent: a, childRef: h, sizeRef: p, pop: c, children: c === !1 ? t : x.cloneElement(t, { ref: b }) });
}
const KD = ({ children: t, initial: a, isPresent: l, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: d, anchorX: h, anchorY: p, root: m }) => {
  const y = gh(QD), b = x.useId();
  let S = !0, T = x.useMemo(() => (S = !1, {
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
  return c && S && (T = { ...T }), x.useMemo(() => {
    y.forEach((w, R) => y.set(R, !1));
  }, [l]), x.useEffect(() => {
    !l && !y.size && s && s();
  }, [l]), t = v.jsx($D, { pop: d === "popLayout", isPresent: l, anchorX: h, anchorY: p, root: m, children: t }), v.jsx(Eu.Provider, { value: T, children: t });
};
function QD() {
  return /* @__PURE__ */ new Map();
}
function bx(t = !0) {
  const a = x.useContext(Eu);
  if (a === null)
    return [!0, null];
  const { isPresent: l, onExitComplete: s, register: o } = a, c = x.useId();
  x.useEffect(() => {
    if (t)
      return o(c);
  }, [t]);
  const d = x.useCallback(() => t && s && s(c), [c, s, t]);
  return !l && s ? [!1, d] : [!0];
}
const Bo = (t) => t.key || "";
function x0(t) {
  const a = [];
  return x.Children.forEach(t, (l) => {
    x.isValidElement(l) && a.push(l);
  }), a;
}
const ID = ({ children: t, custom: a, initial: l = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: d = !1, anchorX: h = "left", anchorY: p = "top", root: m }) => {
  const [y, b] = bx(d), S = x.useMemo(() => x0(t), [t]), T = d && !y ? [] : S.map(Bo), w = x.useRef(!0), R = x.useRef(S), D = gh(() => /* @__PURE__ */ new Map()), _ = x.useRef(/* @__PURE__ */ new Set()), [B, L] = x.useState(S), [V, $] = x.useState(S);
  Xb(() => {
    w.current = !1, R.current = S;
    for (let A = 0; A < V.length; A++) {
      const Q = Bo(V[A]);
      T.includes(Q) ? (D.delete(Q), _.current.delete(Q)) : D.get(Q) !== !0 && D.set(Q, !1);
    }
  }, [V, T.length, T.join("-")]);
  const K = [];
  if (S !== B) {
    let A = [...S];
    for (let Q = 0; Q < V.length; Q++) {
      const ne = V[Q], ce = Bo(ne);
      T.includes(ce) || (A.splice(Q, 0, ne), K.push(ne));
    }
    return c === "wait" && K.length && (A = K), $(x0(A)), L(S), null;
  }
  const { forceRender: te } = x.useContext(yh);
  return v.jsx(v.Fragment, { children: V.map((A) => {
    const Q = Bo(A), ne = d && !y ? !1 : S === V || T.includes(Q), ce = () => {
      if (_.current.has(Q))
        return;
      if (D.has(Q))
        _.current.add(Q), D.set(Q, !0);
      else
        return;
      let W = !0;
      D.forEach((se) => {
        se || (W = !1);
      }), W && (te?.(), $(R.current), d && b?.(), s && s());
    };
    return v.jsx(KD, { isPresent: ne, initial: !w.current || l ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: m, onExitComplete: ne ? void 0 : ce, anchorX: h, anchorY: p, children: A }, Q);
  }) });
}, Yh = x.createContext({ strict: !1 }), E0 = {
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
let T0 = !1;
function ZD() {
  if (T0)
    return;
  const t = {};
  for (const a in E0)
    t[a] = {
      isEnabled: (l) => E0[a].some((s) => !!l[s])
    };
  QS(t), T0 = !0;
}
function Sx() {
  return ZD(), Oj();
}
function Id(t) {
  const a = Sx();
  for (const l in t)
    a[l] = {
      ...a[l],
      ...t[l]
    };
  QS(a);
}
function xx({ children: t, features: a, strict: l = !1 }) {
  const [, s] = x.useState(!cd(a)), o = x.useRef(void 0);
  if (!cd(a)) {
    const { renderer: c, ...d } = a;
    o.current = c, Id(d);
  }
  return x.useEffect(() => {
    cd(a) && a().then(({ renderer: c, ...d }) => {
      Id(d), o.current = c, s(!0);
    });
  }, []), v.jsx(Yh.Provider, { value: { renderer: o.current, strict: l }, children: t });
}
function cd(t) {
  return typeof t == "function";
}
const JD = /* @__PURE__ */ new Set([
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
function pu(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || JD.has(t);
}
let Ex = (t) => !pu(t);
function WD(t) {
  typeof t == "function" && (Ex = (a) => a.startsWith("on") ? !pu(a) : t(a));
}
try {
  WD(require("@emotion/is-prop-valid").default);
} catch {
}
function e2(t, a, l) {
  const s = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || Bt(t[o]) || (Ex(o) || l === !0 && pu(o) || !a && !pu(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (s[o] = t[o]);
  return s;
}
const Cu = /* @__PURE__ */ x.createContext({});
function t2(t, a) {
  if (Ru(t)) {
    const { initial: l, animate: s } = t;
    return {
      initial: l === !1 || ns(l) ? l : void 0,
      animate: ns(s) ? s : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function n2(t) {
  const { initial: a, animate: l } = t2(t, x.useContext(Cu));
  return x.useMemo(() => ({ initial: a, animate: l }), [w0(a), w0(l)]);
}
function w0(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Gh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Tx(t, a, l) {
  for (const s in a)
    !Bt(a[s]) && !nx(s, l) && (t[s] = a[s]);
}
function a2({ transformTemplate: t }, a) {
  return x.useMemo(() => {
    const l = Gh();
    return qh(l, a, t), Object.assign({}, l.vars, l.style);
  }, [a]);
}
function i2(t, a) {
  const l = t.style || {}, s = {};
  return Tx(s, l, t), Object.assign(s, a2(t, a)), s;
}
function l2(t, a) {
  const l = {}, s = i2(t, a);
  return t.drag && t.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const wx = () => ({
  ...Gh(),
  attrs: {}
});
function r2(t, a, l, s) {
  const o = x.useMemo(() => {
    const c = wx();
    return ax(c, a, lx(s), t.transformTemplate, t.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (t.style) {
    const c = {};
    Tx(c, t.style, t), o.style = { ...c, ...o.style };
  }
  return o;
}
const s2 = [
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
function Fh(t) {
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
      !!(s2.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function o2(t, a, l, { latestValues: s }, o, c = !1, d) {
  const p = (d ?? Fh(t) ? r2 : l2)(a, s, o, t), m = e2(a, typeof t == "string", c), y = t !== x.Fragment ? { ...m, ...p, ref: l } : {}, { children: b } = a, S = x.useMemo(() => Bt(b) ? b.get() : b, [b]);
  return x.createElement(t, {
    ...y,
    children: S
  });
}
function u2({ scrapeMotionValuesFromProps: t, createRenderState: a }, l, s, o) {
  return {
    latestValues: c2(l, s, o, t),
    renderState: a()
  };
}
function c2(t, a, l, s) {
  const o = {}, c = s(t, {});
  for (const S in c)
    o[S] = tu(c[S]);
  let { initial: d, animate: h } = t;
  const p = Ru(t), m = $S(t);
  a && m && !p && t.inherit !== !1 && (d === void 0 && (d = a.initial), h === void 0 && (h = a.animate));
  let y = l ? l.initial === !1 : !1;
  y = y || d === !1;
  const b = y ? h : d;
  if (b && typeof b != "boolean" && !wu(b)) {
    const S = Array.isArray(b) ? b : [b];
    for (let T = 0; T < S.length; T++) {
      const w = Nh(t, S[T]);
      if (w) {
        const { transitionEnd: R, transition: D, ..._ } = w;
        for (const B in _) {
          let L = _[B];
          if (Array.isArray(L)) {
            const V = y ? L.length - 1 : 0;
            L = L[V];
          }
          L !== null && (o[B] = L);
        }
        for (const B in R)
          o[B] = R[B];
      }
    }
  }
  return o;
}
const Rx = (t) => (a, l) => {
  const s = x.useContext(Cu), o = x.useContext(Eu), c = () => u2(t, a, s, o);
  return l ? c() : gh(c);
}, f2 = /* @__PURE__ */ Rx({
  scrapeMotionValuesFromProps: kh,
  createRenderState: Gh
}), d2 = /* @__PURE__ */ Rx({
  scrapeMotionValuesFromProps: rx,
  createRenderState: wx
}), h2 = Symbol.for("motionComponentSymbol");
function m2(t, a, l) {
  const s = x.useRef(l);
  x.useInsertionEffect(() => {
    s.current = l;
  });
  const o = x.useRef(null);
  return x.useCallback((c) => {
    c && t.onMount?.(c);
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
const Cx = x.createContext({});
function zl(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function p2(t, a, l, s, o, c) {
  const { visualElement: d } = x.useContext(Cu), h = x.useContext(Yh), p = x.useContext(Eu), m = x.useContext(Ph), y = m.reducedMotion, b = m.skipAnimations, S = x.useRef(null), T = x.useRef(!1);
  s = s || h.renderer, !S.current && s && (S.current = s(t, {
    visualState: a,
    parent: d,
    props: l,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: y,
    skipAnimations: b,
    isSVG: c
  }), T.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const w = S.current, R = x.useContext(Cx);
  w && !w.projection && o && (w.type === "html" || w.type === "svg") && y2(S.current, l, o, R);
  const D = x.useRef(!1);
  x.useInsertionEffect(() => {
    w && D.current && w.update(l, p);
  });
  const _ = l[OS], B = x.useRef(!!_ && typeof window < "u" && !window.MotionHandoffIsComplete?.(_) && window.MotionHasOptimisedAnimation?.(_));
  return Xb(() => {
    T.current = !0, w && (D.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), B.current && w.animationState && w.animationState.animateChanges());
  }), x.useEffect(() => {
    w && (!B.current && w.animationState && w.animationState.animateChanges(), B.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(_);
    }), B.current = !1), w.enteringChildren = void 0);
  }), w;
}
function y2(t, a, l, s) {
  const { layoutId: o, layout: c, drag: d, dragConstraints: h, layoutScroll: p, layoutRoot: m, layoutAnchor: y, layoutCrossfade: b } = a;
  t.projection = new l(t.latestValues, a["data-framer-portal-id"] ? void 0 : Mx(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!d || h && zl(h),
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
function Mx(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : Mx(t.parent);
}
function fd(t, { forwardMotionProps: a = !1, type: l } = {}, s, o) {
  s && Id(s);
  const c = l ? l === "svg" : Fh(t), d = c ? d2 : f2;
  function h(m, y) {
    let b;
    const S = {
      ...x.useContext(Ph),
      ...m,
      layoutId: g2(m)
    }, { isStatic: T } = S, w = n2(m), R = d(m, T);
    if (!T && typeof window < "u") {
      v2();
      const D = b2(S);
      b = D.MeasureLayout, w.visualElement = p2(t, R, S, o, D.ProjectionNode, c);
    }
    return v.jsxs(Cu.Provider, { value: w, children: [b && w.visualElement ? v.jsx(b, { visualElement: w.visualElement, ...S }) : null, o2(t, m, m2(R, w.visualElement, y), R, T, a, c)] });
  }
  h.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const p = x.forwardRef(h);
  return p[h2] = t, p;
}
function g2({ layoutId: t }) {
  const a = x.useContext(yh).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function v2(t, a) {
  x.useContext(Yh).strict;
}
function b2(t) {
  const a = Sx(), { drag: l, layout: s } = a;
  if (!l && !s)
    return {};
  const o = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(t) || s?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function Ax(t, a) {
  if (typeof Proxy > "u")
    return fd;
  const l = /* @__PURE__ */ new Map(), s = (c, d) => fd(c, d, t, a), o = (c, d) => s(c, d);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, d) => d === "create" ? s : (l.has(d) || l.set(d, fd(d, void 0, t, a)), l.get(d))
  });
}
const jx = /* @__PURE__ */ Ax(), Dx = (t, a) => a.isSVG ?? Fh(t) ? new Zj(a) : new Fj(a, {
  allowProjection: t !== x.Fragment
});
class S2 extends fi {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = nD(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    wu(a) && (this.unmountControls = a.subscribe(this.node));
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
let x2 = 0;
class E2 extends fi {
  constructor() {
    super(...arguments), this.id = x2++, this.isExitComplete = !1;
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
          const h = ki(this.node, c, d);
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
const Nx = {
  animation: {
    Feature: S2
  },
  exit: {
    Feature: E2
  }
};
function ms(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const T2 = (t) => (a) => Lh(a) && t(a, ms(a));
function Zr(t, a, l, s) {
  return as(t, a, T2(l), s);
}
const zx = ({ current: t }) => t ? t.ownerDocument.defaultView : null, R0 = (t, a) => Math.abs(t - a);
function w2(t, a) {
  const l = R0(t.x, a.x), s = R0(t.y, a.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const C0 = /* @__PURE__ */ new Set(["auto", "scroll"]);
class _x {
  constructor(a, l, { transformPagePoint: s, contextWindow: o = window, dragSnapToOrigin: c = !1, distanceThreshold: d = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (T) => {
      this.handleScroll(T.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Ho(this.lastRawMoveEventInfo, this.transformPagePoint));
      const T = dd(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, R = w2(T.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !R)
        return;
      const { point: D } = T, { timestamp: _ } = Vt;
      this.history.push({ ...D, timestamp: _ });
      const { onStart: B, onMove: L } = this.handlers;
      w || (B && B(this.lastMoveEvent, T), this.startEvent = this.lastMoveEvent), L && L(this.lastMoveEvent, T);
    }, this.handlePointerMove = (T, w) => {
      this.lastMoveEvent = T, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = Ho(w, this.transformPagePoint), tt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (T, w) => {
      this.end();
      const { onEnd: R, onSessionEnd: D, resumeAnimation: _ } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && _ && _(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const B = dd(T.type === "pointercancel" ? this.lastMoveEventInfo : Ho(w, this.transformPagePoint), this.history);
      this.startEvent && R && R(T, B), D && D(T, B);
    }, !Lh(a))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = d, this.contextWindow = o || window;
    const p = ms(a), m = Ho(p, this.transformPagePoint), { point: y } = m, { timestamp: b } = Vt;
    this.history = [{ ...y, timestamp: b }];
    const { onSessionStart: S } = l;
    S && S(a, dd(m, this.history)), this.removeListeners = fs(Zr(this.contextWindow, "pointermove", this.handlePointerMove), Zr(this.contextWindow, "pointerup", this.handlePointerUp), Zr(this.contextWindow, "pointercancel", this.handlePointerUp)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(a) {
    let l = a.parentElement;
    for (; l; ) {
      const s = getComputedStyle(l);
      (C0.has(s.overflowX) || C0.has(s.overflowY)) && this.scrollPositions.set(l, {
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
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), ci(this.updatePoint);
  }
}
function Ho(t, a) {
  return a ? { point: a(t.point) } : t;
}
function M0(t, a) {
  return { x: t.x - a.x, y: t.y - a.y };
}
function dd({ point: t }, a) {
  return {
    point: t,
    delta: M0(t, Ox(a)),
    offset: M0(t, R2(a)),
    velocity: C2(a, 0.1)
  };
}
function R2(t) {
  return t[0];
}
function Ox(t) {
  return t[t.length - 1];
}
function C2(t, a) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let l = t.length - 1, s = null;
  const o = Ox(t);
  for (; l >= 0 && (s = t[l], !(o.timestamp - s.timestamp > /* @__PURE__ */ an(a))); )
    l--;
  if (!s)
    return { x: 0, y: 0 };
  s === t[0] && t.length > 2 && o.timestamp - s.timestamp > /* @__PURE__ */ an(a) * 2 && (s = t[1]);
  const c = /* @__PURE__ */ Cn(o.timestamp - s.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const d = {
    x: (o.x - s.x) / c,
    y: (o.y - s.y) / c
  };
  return d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d;
}
function M2(t, { min: a, max: l }, s) {
  return a !== void 0 && t < a ? t = s ? st(a, t, s.min) : Math.max(t, a) : l !== void 0 && t > l && (t = s ? st(l, t, s.max) : Math.min(t, l)), t;
}
function A0(t, a, l) {
  return {
    min: a !== void 0 ? t.min + a : void 0,
    max: l !== void 0 ? t.max + l - (t.max - t.min) : void 0
  };
}
function A2(t, { top: a, left: l, bottom: s, right: o }) {
  return {
    x: A0(t.x, l, o),
    y: A0(t.y, a, s)
  };
}
function j0(t, a) {
  let l = a.min - t.min, s = a.max - t.max;
  return a.max - a.min < t.max - t.min && ([l, s] = [s, l]), { min: l, max: s };
}
function j2(t, a) {
  return {
    x: j0(t.x, a.x),
    y: j0(t.y, a.y)
  };
}
function D2(t, a) {
  let l = 0.5;
  const s = Kt(t), o = Kt(a);
  return o > s ? l = /* @__PURE__ */ es(a.min, a.max - s, t.min) : s > o && (l = /* @__PURE__ */ es(t.min, t.max - o, a.min)), Wn(0, 1, l);
}
function N2(t, a) {
  const l = {};
  return a.min !== void 0 && (l.min = a.min - t.min), a.max !== void 0 && (l.max = a.max - t.min), l;
}
const Zd = 0.35;
function z2(t = Zd) {
  return t === !1 ? t = 0 : t === !0 && (t = Zd), {
    x: D0(t, "left", "right"),
    y: D0(t, "top", "bottom")
  };
}
function D0(t, a, l) {
  return {
    min: N0(t, a),
    max: N0(t, l)
  };
}
function N0(t, a) {
  return typeof t == "number" ? t : t[a] || 0;
}
const _2 = /* @__PURE__ */ new WeakMap();
class O2 {
  constructor(a) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = jt(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = a;
  }
  start(a, { snapToCursor: l = !1, distanceThreshold: s } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const c = (b) => {
      l && this.snapToCursor(ms(b).point), this.stopAnimation();
    }, d = (b, S) => {
      const { drag: T, dragPropagation: w, onDragStart: R } = this.getProps();
      if (T && !w && (this.openDragLock && this.openDragLock(), this.openDragLock = fj(T), !this.openDragLock))
        return;
      this.latestPointerEvent = b, this.latestPanInfo = S, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Qn((_) => {
        let B = this.getAxisMotionValue(_).get() || 0;
        if (Zn.test(B)) {
          const { projection: L } = this.visualElement;
          if (L && L.layout) {
            const V = L.layout.layoutBox[_];
            V && (B = Kt(V) * (parseFloat(B) / 100));
          }
        }
        this.originPoint[_] = B;
      }), R && tt.update(() => R(b, S), !1, !0), Pd(this.visualElement, "transform");
      const { animationState: D } = this.visualElement;
      D && D.setActive("whileDrag", !0);
    }, h = (b, S) => {
      this.latestPointerEvent = b, this.latestPanInfo = S;
      const { dragPropagation: T, dragDirectionLock: w, onDirectionLock: R, onDrag: D } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: _ } = S;
      if (w && this.currentDirection === null) {
        this.currentDirection = U2(_), this.currentDirection !== null && R && R(this.currentDirection);
        return;
      }
      this.updateAxis("x", S.point, _), this.updateAxis("y", S.point, _), this.visualElement.render(), D && tt.update(() => D(b, S), !1, !0);
    }, p = (b, S) => {
      this.latestPointerEvent = b, this.latestPanInfo = S, this.stop(b, S), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: b } = this.getProps();
      (b || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: y } = this.getProps();
    this.panSession = new _x(a, {
      onSessionStart: c,
      onStart: d,
      onMove: h,
      onSessionEnd: p,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: y,
      distanceThreshold: s,
      contextWindow: zx(this.visualElement),
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
    if (!s || !qo(a, o, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(a);
    let d = this.originPoint[a] + s[a];
    this.constraints && this.constraints[a] && (d = M2(d, this.constraints[a], this.elastic[a])), c.set(d);
  }
  resolveConstraints() {
    const { dragConstraints: a, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    a && zl(a) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : a && s ? this.constraints = A2(s.layoutBox, a) : this.constraints = !1, this.elastic = z2(l), o !== this.constraints && !zl(a) && s && this.constraints && !this.hasMutatedConstraints && Qn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = N2(s.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: a, onMeasureDragConstraints: l } = this.getProps();
    if (!a || !zl(a))
      return !1;
    const s = a.current;
    Pi(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: o } = this.visualElement;
    if (!o || !o.layout)
      return !1;
    const c = Hj(s, o.root, this.visualElement.getTransformPagePoint());
    let d = j2(o.layout.layoutBox, c);
    if (l) {
      const h = l(Uj(d));
      this.hasMutatedConstraints = !!h, h && (d = ZS(h));
    }
    return d;
  }
  startAnimation(a) {
    const { drag: l, dragMomentum: s, dragElastic: o, dragTransition: c, dragSnapToOrigin: d, onDragTransitionEnd: h } = this.getProps(), p = this.constraints || {}, m = Qn((y) => {
      if (!qo(y, l, this.currentDirection))
        return;
      let b = p && p[y] || {};
      (d === !0 || d === y) && (b = { min: 0, max: 0 });
      const S = o ? 200 : 1e6, T = o ? 40 : 1e7, w = {
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
        const { min: d, max: h } = o.layout.layoutBox[l], p = c.get() || 0;
        c.set(a[l] - st(d, h, 0.5) + p);
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
    if (!zl(l) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    Qn((d) => {
      const h = this.getAxisMotionValue(d);
      if (h && this.constraints !== !1) {
        const p = h.get();
        o[d] = D2({ min: p, max: p }, this.constraints[d]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), Qn((d) => {
      if (!qo(d, a, null))
        return;
      const h = this.getAxisMotionValue(d), { min: p, max: m } = this.constraints[d];
      h.set(st(p, m, o[d]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    _2.set(this.visualElement, this);
    const a = this.visualElement.current, l = Zr(a, "pointerdown", (m) => {
      const { drag: y, dragListener: b = !0 } = this.getProps(), S = m.target, T = S !== a && gj(S);
      y && b && !T && this.start(m);
    });
    let s;
    const o = () => {
      const { dragConstraints: m } = this.getProps();
      zl(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = L2(a, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, d = c.addEventListener("measure", o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), tt.read(o);
    const h = as(window, "resize", () => this.scalePositionWithinConstraints()), p = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: y }) => {
      this.isDragging && y && (Qn((b) => {
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
function z0(t) {
  let a = !0;
  return () => {
    if (a) {
      a = !1;
      return;
    }
    t();
  };
}
function L2(t, a, l) {
  const s = Hv(t, z0(l)), o = Hv(a, z0(l));
  return () => {
    s(), o();
  };
}
function qo(t, a, l) {
  return (a === !0 || a === t) && (l === null || l === t);
}
function U2(t, a = 10) {
  let l = null;
  return Math.abs(t.y) > a ? l = "y" : Math.abs(t.x) > a && (l = "x"), l;
}
class V2 extends fi {
  constructor(a) {
    super(a), this.removeGroupControls = An, this.removeListeners = An, this.controls = new O2(a);
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
const hd = (t) => (a, l) => {
  t && tt.update(() => t(a, l), !1, !0);
};
class B2 extends fi {
  constructor() {
    super(...arguments), this.removePointerDownListener = An;
  }
  onPointerDown(a) {
    this.session = new _x(a, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: zx(this.node)
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
    this.removePointerDownListener = Zr(this.node.current, "pointerdown", (a) => this.onPointerDown(a));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let md = !1;
class H2 extends x.Component {
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
    })), nu.hasEverUpdated = !0;
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
    s && (s.options.layoutAnchor = l, s.root.didUpdate(), Oh.postRender(() => {
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
function Lx(t) {
  const [a, l] = bx(), s = x.useContext(yh);
  return v.jsx(H2, { ...t, layoutGroup: s, switchLayoutGroup: x.useContext(Cx), isPresent: a, safeToRemove: l });
}
const q2 = {
  pan: {
    Feature: B2
  },
  drag: {
    Feature: V2,
    ProjectionNode: vx,
    MeasureLayout: Lx
  }
};
function _0(t, a, l) {
  const { props: s } = t;
  t.animationState && s.whileHover && t.animationState.setActive("whileHover", l === "Start");
  const o = "onHover" + l, c = s[o];
  c && tt.postRender(() => c(a, ms(a)));
}
class k2 extends fi {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = hj(a, (l, s) => (_0(this.node, s, "Start"), (o) => _0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class P2 extends fi {
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
    this.unmount = fs(as(this.node.current, "focus", () => this.onFocus()), as(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function O0(t, a, l) {
  const { props: s } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && s.whileTap && t.animationState.setActive("whileTap", l === "Start");
  const o = "onTap" + (l === "End" ? "" : l), c = s[o];
  c && tt.postRender(() => c(a, ms(a)));
}
class Y2 extends fi {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = bj(a, (o, c) => (O0(this.node, c, "Start"), (d, { success: h }) => O0(this.node, d, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Jd = /* @__PURE__ */ new WeakMap(), pd = /* @__PURE__ */ new WeakMap(), G2 = (t) => {
  const a = Jd.get(t.target);
  a && a(t);
}, F2 = (t) => {
  t.forEach(G2);
};
function X2({ root: t, ...a }) {
  const l = t || document;
  pd.has(l) || pd.set(l, {});
  const s = pd.get(l), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(F2, { root: t, ...a })), s[o];
}
function $2(t, a, l) {
  const s = X2(a);
  return Jd.set(t, l), s.observe(t), () => {
    Jd.delete(t), s.unobserve(t);
  };
}
const K2 = {
  some: 0,
  all: 1
};
class Q2 extends fi {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: l, margin: s, amount: o = "some", once: c } = a, d = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : K2[o]
    }, h = (p) => {
      const { isIntersecting: m } = p;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: y, onViewportLeave: b } = this.node.getProps(), S = m ? y : b;
      S && S(p);
    };
    this.stopObserver = $2(this.node.current, d, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(I2(a, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function I2({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (l) => t[l] !== a[l];
}
const Ux = {
  inView: {
    Feature: Q2
  },
  tap: {
    Feature: Y2
  },
  focus: {
    Feature: P2
  },
  hover: {
    Feature: k2
  }
}, Z2 = {
  layout: {
    ProjectionNode: vx,
    MeasureLayout: Lx
  }
}, J2 = {
  ...Nx,
  ...Ux,
  ...q2,
  ...Z2
}, W2 = /* @__PURE__ */ Ax(J2, Dx), Vx = {
  renderer: Dx,
  ...Nx,
  ...Ux
};
function eN() {
  !Hh.current && KS();
  const [t] = x.useState(fu.current);
  return t;
}
const Pr = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function tN({ vector: t, pulseKey: a, size: l = 220 }) {
  const s = eN(), o = l / 2, c = l / 2, d = l / 2 - 28, h = Pr.length, p = Pr.map((b, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / h, w = Math.max(0, Math.min(1, t[S] ?? 0));
    return { x: o + Math.cos(T) * d * w, y: c + Math.sin(T) * d * w };
  }), m = Pr.map((b, S) => {
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
          W2.polygon,
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
            children: Pr[S]
          },
          Pr[S]
        ))
      ]
    }
  );
}
const nN = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function aN({ vector: t, onChange: a, disabled: l = !1 }) {
  const s = (o, c) => {
    const d = Math.max(0, Math.min(1, Number.isFinite(c) ? c : 0)), h = [...t];
    h[o] = d, a(h);
  };
  return /* @__PURE__ */ v.jsx("div", { className: KC, role: "group", "aria-label": "Emotion axes", children: nN.map((o, c) => /* @__PURE__ */ v.jsxs("div", { className: QC, children: [
    /* @__PURE__ */ v.jsx("label", { htmlFor: `emo-slider-${c}`, className: Yb, children: o }),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        id: `emo-slider-${c}`,
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
        value: t[c] ?? 0,
        disabled: l,
        onChange: (d) => s(c, Number(d.currentTarget.value)),
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": t[c] ?? 0,
        className: Gb
      }
    ),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        type: "number",
        min: 0,
        max: 1,
        step: 0.01,
        value: Number((t[c] ?? 0).toFixed(2)),
        disabled: l,
        onChange: (d) => s(c, Number(d.currentTarget.value)),
        className: Fb,
        "aria-label": `${o} numeric value`
      }
    )
  ] }, o)) });
}
const iN = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
], Bx = [0, 0, 0, 0, 0, 0, 0, 0], lN = `Per-line overrides (inside the [Char|…] tag):

  [Bob|emotion_vector:happy=0.7,surprised=0.2]  text…
  [Alice|qwen:Friendly teen voice]              text…
  [Carol:happy_sarah]                           text…   (legacy compat ref)

Precedence (highest wins): inline → legacy compat ref → mapping default → global panel.
Global alpha applies to every line unless a mapping overrides it.`;
function rN({ value: t, onChange: a, deploymentId: l }) {
  const s = t.mode ?? "none", o = sN(t.vector), c = t.emotionAlpha ?? 1, [d, h] = x.useState([]), [p, m] = x.useState(null), [y, b] = x.useState(""), [S, T] = x.useState(""), [w, R] = x.useState(0), [D, _] = x.useState(!1), B = x.useRef(!0);
  x.useEffect(() => (B.current = !0, () => {
    B.current = !1;
  }), []), x.useEffect(() => {
    let W = !1;
    return m(null), HC(l).then((se) => {
      W || h(L0(se.presets));
    }).catch((se) => {
      W || m(yd(se));
    }), () => {
      W = !0;
    };
  }, [l]);
  const L = x.useMemo(
    () => d.find((W) => W.presetId === S) ?? null,
    [d, S]
  ), V = (W) => {
    a({ ...t, mode: W });
  }, $ = (W) => {
    a({ ...t, mode: "emotion_vector", vector: W }), L && !uN(L.vector, W) && T("");
  }, K = (W) => {
    const se = Math.max(0, Math.min(1, Number.isFinite(W) ? W : 1));
    a({ ...t, emotionAlpha: se });
  }, te = (W) => {
    const se = d.find((G) => G.presetId === W);
    se && (T(W), a({ ...t, mode: "emotion_vector", vector: se.vector }), R((G) => G + 1));
  }, A = async () => {
    const W = y.trim();
    if (W) {
      _(!0), m(null);
      try {
        const se = await qC(l, W, o);
        if (!B.current) return;
        h((G) => L0([se, ...G.filter((I) => I.presetId !== se.presetId)])), T(se.presetId), b(""), R((G) => G + 1);
      } catch (se) {
        B.current && m(yd(se));
      } finally {
        B.current && _(!1);
      }
    }
  }, Q = async (W) => {
    const se = d;
    h((G) => G.filter((I) => I.presetId !== W)), S === W && T("");
    try {
      await kC(l, W);
    } catch (G) {
      B.current && (h(se), m(yd(G)));
    }
  }, ne = () => $(Bx), ce = () => {
    const W = Array.from({ length: 8 }, () => Math.round(Math.random() * 100) / 100);
    $(W), R((se) => se + 1);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: PC, children: [
    /* @__PURE__ */ v.jsxs("div", { className: YC, children: [
      /* @__PURE__ */ v.jsx(tN, { vector: o, pulseKey: w }),
      /* @__PURE__ */ v.jsx("span", { className: Jf, children: cN(s, L?.presetName) })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: GC, children: [
      /* @__PURE__ */ v.jsx("div", { className: FC, role: "radiogroup", "aria-label": "Emotion source", children: iN.map((W) => /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === W.id,
          className: s === W.id ? $C : XC,
          onClick: () => V(W.id),
          children: W.label
        },
        W.id
      )) }),
      s === "emotion_vector" && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsxs("div", { className: IC, children: [
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              className: ZC,
              value: S,
              onChange: (W) => te(W.currentTarget.value),
              "aria-label": "Load preset",
              children: [
                /* @__PURE__ */ v.jsx("option", { value: "", children: "— Load preset —" }),
                d.map((W) => /* @__PURE__ */ v.jsx("option", { value: W.presetId, children: W.presetName }, W.presetId))
              ]
            }
          ),
          S && /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              className: WC,
              onClick: () => void Q(S),
              disabled: D,
              children: "Delete preset"
            }
          ),
          /* @__PURE__ */ v.jsx("button", { type: "button", className: yv, onClick: ne, children: "Reset" }),
          /* @__PURE__ */ v.jsx("button", { type: "button", className: yv, onClick: ce, children: "Random" })
        ] }),
        /* @__PURE__ */ v.jsx(aN, { vector: o, onChange: $ }),
        /* @__PURE__ */ v.jsxs(
          "form",
          {
            className: nM,
            onSubmit: (W) => {
              W.preventDefault(), A();
            },
            children: [
              /* @__PURE__ */ v.jsx(
                "input",
                {
                  type: "text",
                  className: aM,
                  value: y,
                  placeholder: "Name current vector",
                  onChange: (W) => b(W.currentTarget.value),
                  maxLength: 120,
                  "aria-label": "Preset name"
                }
              ),
              /* @__PURE__ */ v.jsx(
                "button",
                {
                  type: "submit",
                  className: JC,
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
            className: tM,
            value: t.qwenTemplate ?? "",
            onChange: (W) => a({ ...t, mode: "qwen_template", qwenTemplate: W.currentTarget.value }),
            rows: 4
          }
        )
      ] }),
      s === "audio_ref" && /* @__PURE__ */ v.jsx("p", { className: Jf, children: "Audio references are attached per character in the mapping editor — the global panel only toggles the mode." }),
      s !== "none" && /* @__PURE__ */ v.jsxs("div", { className: eM, children: [
        /* @__PURE__ */ v.jsx("span", { className: Yb, children: "alpha" }),
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: c,
            className: Gb,
            onChange: (W) => K(Number(W.currentTarget.value)),
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
            className: Fb,
            onChange: (W) => K(Number(W.currentTarget.value)),
            "aria-label": "Emotion alpha numeric"
          }
        )
      ] }),
      p && /* @__PURE__ */ v.jsx("p", { className: iM, children: p }),
      /* @__PURE__ */ v.jsx("pre", { className: lM, children: lN })
    ] })
  ] });
}
function sN(t) {
  return !t || t.length !== 8 ? [...Bx] : t.map((a) => oN(a));
}
function oN(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function uN(t, a) {
  for (let l = 0; l < 8; l += 1) {
    const s = t[l] ?? 0, o = a[l] ?? 0;
    if (Math.abs(s - o) > 1e-6) return !1;
  }
  return !0;
}
function L0(t) {
  return [...t].sort((a, l) => l.updatedAt - a.updatedAt);
}
function cN(t, a) {
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
function yd(t) {
  return t instanceof Fi ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
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
function fN({
  outputFormat: t,
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
    /* @__PURE__ */ v.jsxs("label", { className: ai, children: [
      /* @__PURE__ */ v.jsx("span", { className: tn, children: "Format" }),
      /* @__PURE__ */ v.jsxs("select", { value: t, onChange: (y) => a(y.currentTarget.value), children: [
        /* @__PURE__ */ v.jsx("option", { value: "mp3", children: "mp3" }),
        /* @__PURE__ */ v.jsx("option", { value: "wav", children: "wav" }),
        /* @__PURE__ */ v.jsx("option", { value: "flac", children: "flac" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("label", { className: ai, children: [
      /* @__PURE__ */ v.jsx("span", { className: tn, children: "Speed" }),
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
        className: ai,
        role: "radiogroup",
        "aria-label": "Cache policy",
        children: [
          /* @__PURE__ */ v.jsx("span", { className: tn, children: "Cache" }),
          gd.map((y) => /* @__PURE__ */ v.jsx(
            rt,
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
    /* @__PURE__ */ v.jsx("p", { className: tn, "aria-live": "polite", children: m.help }),
    /* @__PURE__ */ v.jsxs("label", { className: ai, children: [
      /* @__PURE__ */ v.jsx("span", { className: tn, children: "Temperature" }),
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
    /* @__PURE__ */ v.jsxs("label", { className: ai, children: [
      /* @__PURE__ */ v.jsx("span", { className: tn, children: "Top-p" }),
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
    /* @__PURE__ */ v.jsxs("label", { className: ai, children: [
      /* @__PURE__ */ v.jsx("span", { className: tn, children: "Seed" }),
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
const dN = ["cancelled", "failed", "partial"];
function hN({ runs: t, deploymentId: a }) {
  const l = Gi(), [s, o] = x.useState(null), [c, d] = x.useState(null);
  if (t.length === 0)
    return /* @__PURE__ */ v.jsx("p", { className: tn, children: "No runs yet." });
  const h = async (p) => {
    o(p), d(null);
    try {
      const { runId: m } = await ph(a, p);
      l(`/${a}/runs/${m}`);
    } catch (m) {
      d(mN(m));
    } finally {
      o(null);
    }
  };
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    c && /* @__PURE__ */ v.jsx(hn, { severity: "error", children: c }),
    /* @__PURE__ */ v.jsx("ul", { className: Ad, children: t.map((p) => {
      const m = dN.includes(p.status) && p.kind === "batch";
      return /* @__PURE__ */ v.jsxs("li", { children: [
        /* @__PURE__ */ v.jsxs(us, { to: `/${a}/runs/${p.runId}`, children: [
          p.kind,
          " · ",
          p.status,
          " · ",
          new Date(p.queuedAt * 1e3).toLocaleString()
        ] }),
        m && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
          " ",
          /* @__PURE__ */ v.jsx(oi, { tone: p.status === "failed" ? "danger" : "warning", children: "partial — resumable" }),
          " ",
          /* @__PURE__ */ v.jsx(
            rt,
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
function mN(t) {
  return t instanceof Fi ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function pN({ deploymentId: t, initialVoiceAssetId: a, onChange: l }) {
  const [s, o] = x.useState([]), [c, d] = x.useState(a ?? "");
  x.useEffect(() => {
    lu(t).then(({ voiceAssets: p }) => o(p)).catch(() => o([]));
  }, [t]);
  async function h(p) {
    const m = p.target.value || null;
    d(m ?? ""), await OR(t, m), l?.(m);
  }
  return /* @__PURE__ */ v.jsxs("select", { value: c, onChange: h, children: [
    /* @__PURE__ */ v.jsx("option", { value: "", children: "— choose voice —" }),
    s.map((p) => /* @__PURE__ */ v.jsx("option", { value: p.voiceAssetId, children: p.displayName }, p.voiceAssetId))
  ] });
}
function yN(t) {
  const a = Gi(), [l, s] = x.useState("idle"), [o, c] = x.useState(null), [d, h] = x.useState(/* @__PURE__ */ new Map()), [p, m] = x.useState(null), [y, b] = x.useState(null), S = x.useRef(null);
  x.useEffect(() => () => {
    S.current?.();
  }, []);
  const T = x.useCallback(async () => {
    s("starting"), m(null), h(/* @__PURE__ */ new Map()), b(null);
    try {
      const K = await qR(t.deploymentId, t.createPayload);
      c(K.runId), s("running"), S.current?.(), S.current = pv(
        t.deploymentId,
        K.runId,
        (te) => U0(te, h, s, b, t.deploymentId, K.runId),
        () => s("error")
      );
    } catch (K) {
      s("error"), m(vd(K));
    }
  }, [t.deploymentId, t.createPayload]), w = x.useCallback(async () => {
    if (o)
      try {
        await kR(t.deploymentId, o);
      } catch (K) {
        m(vd(K));
      }
  }, [t.deploymentId, o]), R = Array.from(d.values()).sort((K, te) => K.globalIndex - te.globalIndex), D = l === "starting" || l === "running", _ = y?.status === "partial", B = R.filter((K) => K.status === "failed"), L = (() => {
    if (l !== "terminal" || B.length === 0) return null;
    const K = /* @__PURE__ */ new Map();
    for (const ne of B) {
      const ce = ne.failureCategory ?? "unknown";
      K.set(ce, (K.get(ce) ?? 0) + 1);
    }
    let te = "unknown", A = 0;
    for (const [ne, ce] of K)
      ce > A && (te = ne, A = ce);
    const Q = R.length;
    return { category: te, count: A, total: Q };
  })(), V = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, $ = p?.toLowerCase().includes("unmapped") ?? !1;
  return /* @__PURE__ */ v.jsxs("div", { children: [
    p && /* @__PURE__ */ v.jsxs(
      hn,
      {
        severity: "error",
        style: {
          marginBottom: 12,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8
        },
        children: [
          /* @__PURE__ */ v.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ v.jsx("span", { children: p }),
          $ && /* @__PURE__ */ v.jsx(
            rt,
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
    /* @__PURE__ */ v.jsxs("div", { className: ai, children: [
      /* @__PURE__ */ v.jsx(rt, { disabled: !t.canGenerate || D, onClick: T, children: l === "running" ? "Running…" : "Generate + Export ZIP" }),
      /* @__PURE__ */ v.jsx(rt, { variant: "danger", disabled: !D, onClick: w, children: "Cancel" })
    ] }),
    L && /* @__PURE__ */ v.jsxs(hn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
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
        className: `${kb.secondary} ${Pb.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    _ && y && /* @__PURE__ */ v.jsxs(hn, { severity: "warning", children: [
      /* @__PURE__ */ v.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ v.jsx(
        rt,
        {
          variant: "secondary",
          onClick: async () => {
            try {
              const K = await ph(t.deploymentId, y.runId);
              c(K.runId), h(/* @__PURE__ */ new Map()), b(null), s("running"), S.current?.(), S.current = pv(
                t.deploymentId,
                K.runId,
                (te) => U0(te, h, s, b, t.deploymentId, K.runId),
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
    R.length > 0 && /* @__PURE__ */ v.jsxs("table", { className: jC, children: [
      /* @__PURE__ */ v.jsx("thead", { children: /* @__PURE__ */ v.jsxs("tr", { children: [
        /* @__PURE__ */ v.jsx("th", { className: ti, children: "#" }),
        /* @__PURE__ */ v.jsx("th", { className: ti, children: "Status" }),
        /* @__PURE__ */ v.jsx("th", { className: ti, children: "Duration" }),
        /* @__PURE__ */ v.jsx("th", { className: ti, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ v.jsx("tbody", { children: R.map((K) => /* @__PURE__ */ v.jsxs("tr", { className: DC, children: [
        /* @__PURE__ */ v.jsx("td", { className: ti, children: K.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ v.jsx("td", { className: ti, children: /* @__PURE__ */ v.jsx(oi, { tone: gN(K.status), children: K.status }) }),
        /* @__PURE__ */ v.jsx("td", { className: ti, children: K.durationMs ? `${K.durationMs} ms` : "—" }),
        /* @__PURE__ */ v.jsx("td", { className: ti, children: K.failureCategory ?? "" })
      ] }, K.globalIndex)) })
    ] })
  ] });
}
async function U0(t, a, l, s, o, c) {
  switch (t.type) {
    case "segment_started":
      a((d) => {
        const h = new Map(d);
        return h.set(t.globalIndex, { globalIndex: t.globalIndex, status: "running" }), h;
      });
      return;
    case "segment_completed":
      a((d) => {
        const h = new Map(d);
        return h.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "completed",
          durationMs: t.durationMs
        }), h;
      });
      return;
    case "segment_failed":
      a((d) => {
        const h = new Map(d);
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
        const d = await mh(o, c);
        s(d);
      } catch {
      }
      return;
  }
}
function gN(t) {
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
function vd(t) {
  return t instanceof Fi || t instanceof Error ? t.message : "unknown error";
}
function vN(t) {
  const a = Gi(), { attributions: l, unresolved: s, predictedFilenames: o } = x.useMemo(
    () => bN(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  );
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsx(
      "textarea",
      {
        className: AC,
        value: t.value,
        onChange: (c) => t.onChange(c.currentTarget.value),
        placeholder: `[Bob] Hey there
[Alice] Hello
...`,
        "aria-label": "Dialogue script",
        spellCheck: !1
      }
    ),
    s.length > 0 && /* @__PURE__ */ v.jsxs(hn, { severity: "error", children: [
      /* @__PURE__ */ v.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      s.map((c) => /* @__PURE__ */ v.jsxs(
        rt,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => a(
            `/${t.deploymentId}/mappings/new?character=${encodeURIComponent(c)}`
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
      /* @__PURE__ */ v.jsx("span", { className: tn, children: "Parsed lines" }),
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
      /* @__PURE__ */ v.jsx("span", { className: tn, children: "Predicted filenames" }),
      /* @__PURE__ */ v.jsx("ul", { className: Ad, children: o.map((c) => /* @__PURE__ */ v.jsx("li", { children: c }, c)) })
    ] })
  ] });
}
function bN(t, a, l) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Map(), h = [], p = t.split(/\r?\n/);
  let m = 0;
  return p.forEach((y, b) => {
    const S = y.trim();
    if (!S) return;
    const T = b + 1, w = S.match(s);
    let R = "Narrator", D = S;
    if (w && w.groups) {
      const V = (w.groups.body ?? "").trim(), $ = (w.groups.rest ?? "").trim();
      R = ((V.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", D = $;
    }
    m += 1;
    const _ = R.toLowerCase(), B = (d.get(_) ?? 0) + 1;
    d.set(_, B);
    const L = R === "Narrator" || l.has(_);
    L || c.add(R), o.push({ lineNumber: T, character: R, text: D, hasMapping: L }), h.push(
      `${m.toString().padStart(3, "0")}_${SN(R)}_${B.toString().padStart(3, "0")}.${a}`
    );
  }), {
    attributions: o,
    unresolved: Array.from(c),
    predictedFilenames: h
  };
}
function SN(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
function xN(t) {
  const a = t.workflowCustomised ?? !1, l = t.unmappableFields ?? [];
  return /* @__PURE__ */ v.jsxs("div", { className: TC, children: [
    /* @__PURE__ */ v.jsxs("header", { className: CC, children: [
      /* @__PURE__ */ v.jsx("h1", { className: MC, children: t.deployment.displayName }),
      t.header
    ] }),
    a && /* @__PURE__ */ v.jsxs(hn, { severity: "warning", children: [
      /* @__PURE__ */ v.jsx("strong", { children: "Workflow customised." }),
      " ",
      l.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${l.join(", ")}.`,
      " ",
      /* @__PURE__ */ v.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: wC, children: [
      /* @__PURE__ */ v.jsxs(nn, { "aria-labelledby": "recipe-section-script", children: [
        /* @__PURE__ */ v.jsx("h2", { id: "recipe-section-script", className: Rn, children: "01 / Script" }),
        t.scriptEditor
      ] }),
      /* @__PURE__ */ v.jsxs(nn, { "aria-labelledby": "recipe-section-settings", children: [
        /* @__PURE__ */ v.jsx("h2", { id: "recipe-section-settings", className: Rn, children: "02 / Settings" }),
        t.settingsPanel
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: RC, children: [
      /* @__PURE__ */ v.jsxs(nn, { "aria-labelledby": "recipe-section-run", children: [
        /* @__PURE__ */ v.jsx("h2", { id: "recipe-section-run", className: Rn, children: "03 / Run" }),
        t.runPanel
      ] }),
      /* @__PURE__ */ v.jsxs(nn, { "aria-labelledby": "recipe-section-emotion", children: [
        /* @__PURE__ */ v.jsx("h2", { id: "recipe-section-emotion", className: Rn, children: "04 / Emotion" }),
        t.emotionPanel
      ] }),
      /* @__PURE__ */ v.jsxs(nn, { "aria-labelledby": "recipe-section-history", children: [
        /* @__PURE__ */ v.jsx("h2", { id: "recipe-section-history", className: Rn, children: "05 / Recent runs" }),
        t.historyPanel
      ] })
    ] })
  ] });
}
function EN() {
  const { deployment: t, mappings: a, runs: l, workflow: s } = os(), [o, c] = x.useState(""), [d, h] = x.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [p, m] = x.useState(t.defaultSpeedFactor ?? 1), [y, b] = x.useState({
    mode: "none",
    emotionAlpha: 1
  }), [S, T] = x.useState({}), [w, R] = x.useState("use_cache"), [D, _] = x.useState(t.defaultVoiceAssetId != null), B = x.useMemo(
    () => ({
      script: o,
      parserMode: D ? "raw_text" : "dialogue",
      outputFormat: d,
      speedFactor: p,
      globalEmotion: y,
      generation: S,
      cachePolicy: w
    }),
    [o, D, d, p, y, S, w]
  ), L = x.useMemo(() => {
    const V = /* @__PURE__ */ new Map();
    for (const $ of a)
      V.set($.characterName.toLowerCase(), $);
    return V;
  }, [a]);
  return /* @__PURE__ */ v.jsx(
    xN,
    {
      deployment: t,
      workflowCustomised: s.workflow.customised,
      unmappableFields: s.unmappableFields,
      header: /* @__PURE__ */ v.jsx(UC, { deployment: t }),
      scriptEditor: /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
          /* @__PURE__ */ v.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ v.jsx(
              "input",
              {
                type: "checkbox",
                checked: D,
                onChange: (V) => _(V.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          D && /* @__PURE__ */ v.jsx(
            pN,
            {
              deploymentId: t.deploymentId,
              initialVoiceAssetId: t.defaultVoiceAssetId ?? null
            }
          )
        ] }),
        /* @__PURE__ */ v.jsx(
          vN,
          {
            value: o,
            onChange: c,
            outputFormat: d,
            mappings: L,
            deploymentId: t.deploymentId
          }
        )
      ] }),
      emotionPanel: /* @__PURE__ */ v.jsx(
        rN,
        {
          value: y,
          onChange: b,
          deploymentId: t.deploymentId
        }
      ),
      settingsPanel: /* @__PURE__ */ v.jsx(
        fN,
        {
          outputFormat: d,
          onOutputFormatChange: h,
          speedFactor: p,
          onSpeedFactorChange: m,
          cachePolicy: w,
          onCachePolicyChange: R,
          generation: S,
          onGenerationChange: T
        }
      ),
      runPanel: /* @__PURE__ */ v.jsx(
        yN,
        {
          deploymentId: t.deploymentId,
          createPayload: B,
          canGenerate: o.trim().length > 0
        }
      ),
      historyPanel: /* @__PURE__ */ v.jsx(hN, { runs: l, deploymentId: t.deploymentId })
    }
  );
}
const V0 = 32, B0 = -30, H0 = -6, q0 = 0.5, k0 = 2;
class kl extends Error {
  constructor(a, l) {
    super(l), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function TN(t, a, l, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, c = `${Xi}${o}`, d = await fetch(c, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(l),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (d.status === 409) {
    const h = await d.json().catch(() => null), p = h?.error?.current_digest ?? "", m = h?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new kl(p, m);
  }
  if (!d.ok)
    throw new Error(await Mu(d, "apply"));
  return await d.json();
}
async function wN(t, a, l, s, o = {}) {
  const c = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(l)}/edit`, d = `${Xi}${c}`, h = await fetch(d, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (h.status === 409) {
    const p = await h.json().catch(() => null), m = p?.error?.current_digest ?? "", y = p?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new kl(m, y);
  }
  if (!h.ok)
    throw new Error(await Mu(h, "apply"));
  return await h.json();
}
async function RN(t, a, l, s = {}) {
  const o = `${Xi}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: l }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!c.ok)
    throw new Error(await Mu(c, "preview"));
  return c.blob();
}
async function CN(t, a, l, s = 50, o = {}) {
  const c = `${Xi}/audit/${encodeURIComponent(a)}/${encodeURIComponent(l)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(s))}`, d = await fetch(c, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!d.ok)
    throw new Error(await Mu(d, "audit fetch"));
  return await d.json();
}
function Fl() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function Hx(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > V0)
    return {
      message: `Chain exceeds the maximum of ${V0} operations.`
    };
  for (const l of t.ops) {
    const s = MN(l, a);
    if (s) return s;
  }
  return null;
}
function MN(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return AN(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < B0 || t.target_lufs > H0 ? {
        opId: t.id,
        message: `Normalize target must be between ${B0} and ${H0} LUFS.`
      } : null;
    case "speed":
      return t.factor < q0 || t.factor > k0 ? {
        opId: t.id,
        message: `Speed factor must be between ${q0}× and ${k0}×.`
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
function AN(t, a, l, s) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : l <= a ? { opId: t, message: "End must be greater than start." } : s > 0 && l > s ? { opId: t, message: "End extends past source duration." } : null;
}
async function Mu(t, a) {
  const l = await t.json().catch(() => null);
  return l?.error?.message ?? l?.message ?? `${a} failed: ${t.status}`;
}
const P0 = /* @__PURE__ */ new Map();
function jN(t, a) {
  const [l, s] = x.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return x.useEffect(() => {
    if (!t || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${t}::${a}`, c = P0.get(o);
    if (c) {
      s({ peaks: c, isLoading: !1, error: null });
      return;
    }
    const d = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), DN(t, a, d.signal).then((h) => {
      d.signal.aborted || (P0.set(o, h), s({ peaks: h, isLoading: !1, error: null }));
    }).catch((h) => {
      if (d.signal.aborted) return;
      const p = h instanceof Error ? h.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: p });
    }), () => d.abort();
  }, [t, a]), l;
}
async function DN(t, a, l) {
  const s = await fetch(t, { signal: l });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (l.aborted) throw new DOMException("aborted", "AbortError");
  const d = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return NN(d, a);
}
function NN(t, a) {
  const l = t.numberOfChannels, s = t.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), d = [];
  for (let h = 0; h < l; h += 1) d.push(t.getChannelData(h));
  for (let h = 0; h < a; h += 1) {
    const p = h * o, m = Math.min(s, p + o);
    let y = 0;
    for (let b = p; b < m; b += 1) {
      let S = 0;
      for (let w = 0; w < l; w += 1) {
        const R = d[w];
        R && (S += Math.abs(R[b] ?? 0));
      }
      const T = S / l;
      T > y && (y = T);
    }
    c[h] = y;
  }
  return c;
}
const Y0 = "(prefers-reduced-motion: reduce)";
function zN() {
  const [t, a] = x.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Y0).matches);
  return x.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const l = window.matchMedia(Y0), s = (o) => a(o.matches);
    return l.addEventListener("change", s), () => l.removeEventListener("change", s);
  }, []), t;
}
var _N = "mquzal0", ON = "mquzal1", G0 = "mquzal2", F0 = "mquzal3", X0 = "mquzal4", LN = "mquzal5", $0 = "mquzal6", K0 = "mquzal7";
const UN = 120, VN = 720;
function qx(t) {
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
    width: y = VN,
    height: b = UN
  } = t, S = x.useRef(null), T = x.useRef(null), w = x.useRef(null), R = jN(a, y), D = zN();
  x.useEffect(() => {
    BN(S.current, R.peaks, y, b);
  }, [R.peaks, y, b]);
  const _ = x.useCallback(
    (A) => {
      const Q = T.current?.getBoundingClientRect();
      if (!Q || Q.width <= 0) return 0;
      const ne = Math.max(0, Math.min(1, (A - Q.left) / Q.width));
      return Math.round(ne * l);
    },
    [l]
  );
  x.useEffect(() => {
    const A = (ne) => {
      if (!w.current) return;
      const ce = _(ne.clientX);
      w.current === "start" ? c(ko(ce, 0, o - 1)) : d(ko(ce, s + 1, l));
    }, Q = () => {
      w.current = null;
    };
    return window.addEventListener("pointermove", A), window.addEventListener("pointerup", Q), () => {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", Q);
    };
  }, [_, l, o, s, c, d]);
  const B = (A) => (Q) => {
    Q.preventDefault(), Q.stopPropagation(), w.current = A;
  }, L = (A) => {
    !m || A.target.closest("[data-handle]") || m(_(A.clientX));
  }, V = (A) => (Q) => {
    const ne = Q.shiftKey ? 100 : Q.ctrlKey ? 1 : 10;
    let ce = 0;
    if (Q.key === "ArrowLeft") ce = -ne;
    else if (Q.key === "ArrowRight") ce = ne;
    else return;
    Q.preventDefault(), A === "start" ? c(ko(s + ce, 0, o - 1)) : d(ko(o + ce, s + 1, l));
  }, $ = bd(s, l), K = bd(o, l), te = bd(p, l);
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      ref: T,
      className: _N,
      style: { height: b },
      onPointerDown: L,
      children: [
        /* @__PURE__ */ v.jsx(
          "canvas",
          {
            ref: S,
            width: y,
            height: b,
            className: ON,
            "aria-label": "Audio waveform"
          }
        ),
        R.isLoading && /* @__PURE__ */ v.jsx("div", { className: K0, children: "Decoding waveform…" }),
        R.error && /* @__PURE__ */ v.jsx("div", { className: K0, role: "alert", children: R.error }),
        /* @__PURE__ */ v.jsx("div", { className: $0, style: { left: 0, width: `${$}%` } }),
        /* @__PURE__ */ v.jsx(
          "div",
          {
            className: $0,
            style: { left: `${K}%`, right: 0, width: `${100 - K}%` }
          }
        ),
        /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: G0,
            style: { left: `${$}%` },
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
              /* @__PURE__ */ v.jsx("span", { className: F0, "aria-hidden": "true" }),
              /* @__PURE__ */ v.jsx("span", { className: X0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: G0,
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
              /* @__PURE__ */ v.jsx("span", { className: F0, "aria-hidden": "true" }),
              /* @__PURE__ */ v.jsx("span", { className: X0, "aria-hidden": "true" })
            ]
          }
        ),
        h && /* @__PURE__ */ v.jsx(
          "div",
          {
            className: LN,
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
function ko(t, a, l) {
  return Math.max(a, Math.min(l, t));
}
function BN(t, a, l, s) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, l, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = HN(t, "--color-primary", "#ba9eff");
  const d = Math.min(a.length, l);
  for (let h = 0; h < d; h += 1) {
    const p = a[h] ?? 0, m = Math.max(1, p * (s - 4));
    o.fillRect(h, c - m / 2, 1, m);
  }
}
function HN(t, a, l) {
  return getComputedStyle(t).getPropertyValue(a).trim() || l;
}
var qN = "r8lfsm0", kN = "r8lfsm1", PN = "r8lfsm2", YN = "r8lfsm3", GN = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, FN = "_1b1zchy3", XN = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, $N = "_1b1zchy6", KN = "_1b1zchy7";
const kx = x.createContext("standalone");
function Px({
  variant: t = "standalone",
  children: a,
  className: l,
  style: s,
  ...o
}) {
  const c = [GN[t], l].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx(kx.Provider, { value: t, children: /* @__PURE__ */ v.jsx("div", { className: c, style: s, ...o, children: a }) });
}
function Yx({
  title: t,
  meta: a,
  children: l,
  className: s,
  titleId: o
}) {
  const c = x.useContext(kx), d = [FN, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("div", { className: d, children: [
    /* @__PURE__ */ v.jsx("h3", { id: o, className: XN[c], children: t }),
    a ? /* @__PURE__ */ v.jsx("span", { className: $N, children: a }) : null,
    l
  ] });
}
function Gx({ children: t, className: a }) {
  const l = [KN, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx("div", { className: l, children: t });
}
const Q0 = -16, QN = 80, IN = 720;
function ZN(t) {
  const { deploymentId: a, runId: l, utterance: s, audioUrl: o, onApplied: c, onError: d, onCancel: h } = t, p = s.durationMs ?? 0, [m, y] = x.useState(() => I0(p)), [b, S] = x.useState(!1), [T, w] = x.useState(null), [R, D] = x.useState(!1), _ = x.useRef(null), B = x.useRef(null), L = x.useRef(null);
  x.useEffect(() => {
    y(I0(p)), S(!1), w(null), L.current = null;
  }, [s.utteranceId, p]), x.useEffect(() => () => B.current?.abort(), []), x.useEffect(() => {
    _.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const V = x.useCallback(
    (se) => {
      se.key === "Escape" && (se.stopPropagation(), h());
    },
    [h]
  ), $ = x.useMemo(
    () => m.ops.find((se) => se.mode === "trim"),
    [m.ops]
  ), K = $?.start_ms ?? 0, te = $?.end_ms ?? Math.max(1, p), A = x.useCallback((se, G) => {
    y((I) => JN(I, "trim", (N) => ({
      ...N,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(se)),
      end_ms: Math.max(Math.floor(se) + 1, Math.floor(G))
    })));
  }, []), Q = x.useCallback((se) => A(se, te), [te, A]), ne = x.useCallback((se) => A(K, se), [K, A]), ce = x.useCallback((se) => {
    S(se), y((G) => {
      const I = G.ops.filter((N) => N.mode !== "normalize");
      if (se) {
        const N = {
          id: Fl(),
          mode: "normalize",
          target_lufs: Q0
        };
        return { ...G, ops: [...I, N] };
      }
      return { ...G, ops: I };
    });
  }, []), W = x.useCallback(async () => {
    const se = Hx(m, p);
    if (se) {
      w(se.message);
      return;
    }
    if (w(null), R) return;
    B.current?.abort();
    const G = new AbortController();
    B.current = G, D(!0);
    try {
      const I = L.current ?? void 0, N = await wN(
        a,
        l,
        s.utteranceId,
        I ? { chain: m, digest_before: I } : { chain: m },
        { signal: G.signal }
      );
      if (G.signal.aborted) return;
      L.current = N.chain_digest, c(N);
    } catch (I) {
      if (G.signal.aborted) return;
      I instanceof kl && (L.current = I.currentDigest || null);
      const N = I instanceof kl ? "Edit chain has changed in another tab. Reload to continue." : I instanceof Error ? I.message : "apply failed";
      w(N), d(N);
    } finally {
      G.signal.aborted || D(!1);
    }
  }, [m, p, R, a, l, s.utteranceId, c, d]);
  return /* @__PURE__ */ v.jsx(Px, { variant: "nested", children: /* @__PURE__ */ v.jsxs("div", { ref: _, onKeyDown: V, children: [
    /* @__PURE__ */ v.jsx(Yx, { title: "Edit segment", meta: `Source · ${Po(p)}` }),
    /* @__PURE__ */ v.jsx(
      qx,
      {
        audioUrl: o,
        durationMs: Math.max(1, p),
        startMs: K,
        endMs: te,
        onChangeStart: Q,
        onChangeEnd: ne,
        height: QN,
        width: IN
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: qN, children: [
      /* @__PURE__ */ v.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ v.jsxs("span", { className: kN, children: [
        Po(K),
        " → ",
        Po(te),
        " · ",
        Po(te - K)
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: PN, children: /* @__PURE__ */ v.jsxs("label", { className: YN, children: [
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "checkbox",
          checked: b,
          onChange: (se) => ce(se.currentTarget.checked),
          "aria-label": "Toggle loudness normalization"
        }
      ),
      /* @__PURE__ */ v.jsxs("span", { children: [
        "Normalize to ",
        Q0.toFixed(0),
        " LUFS (broadcast-friendly)"
      ] })
    ] }) }),
    /* @__PURE__ */ v.jsxs(Gx, { children: [
      /* @__PURE__ */ v.jsx(rt, { size: "sm", onClick: () => void W(), disabled: R, children: R ? "Applying…" : "Apply" }),
      /* @__PURE__ */ v.jsx(rt, { variant: "ghost", size: "sm", onClick: h, disabled: R, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ v.jsx(hn, { severity: "error", children: T })
  ] }) });
}
function I0(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Fl(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function JN(t, a, l) {
  const s = t.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Fl(), mode: a };
    return { ...t, ops: [...t.ops, l(c)] };
  }
  const o = [...t.ops];
  return o[s] = l(o[s]), { ...t, ops: o };
}
function Po(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var WN = "jq2zyb2", ez = "jq2zyb3", tz = "jq2zyb4", nz = "jq2zyb5", az = "jq2zyb6", iz = "jq2zyb7", lz = "jq2zyb8", rz = "jq2zyb9", sz = "jq2zyba", oz = "jq2zybb", uz = "jq2zybc", cz = "jq2zybd", fz = "jq2zybe", dz = "jq2zybf jq2zybe", hz = "jq2zybg", mz = "jq2zybh", pz = "jq2zybi", yz = "jq2zybj", gz = "jq2zybk", vz = "jq2zybl", bz = "jq2zybm", Sz = "jq2zybn", xz = "jq2zybo", Ez = "jq2zybp", Tz = "jq2zybq", wz = "jq2zybr", Rz = "jq2zybs", Cz = "jq2zybt", Mz = "jq2zybu", Az = "jq2zybv", jz = "jq2zybw", Dz = "jq2zybx", Nz = "jq2zyby", zz = "jq2zybz", Z0 = "jq2zyb10", _z = "jq2zyb11", Oz = "jq2zyb12", Lz = "jq2zyb13", Uz = "jq2zyb14";
const Vz = ["cancelled", "failed", "partial"], Bz = 2600;
function Hz() {
  const { run: t } = os(), a = Gi(), [l, s] = x.useState(t), [o, c] = x.useState(!1), [d, h] = x.useState(null), [p, m] = x.useState(null), [y, b] = x.useState(
    null
  );
  x.useEffect(() => {
    s(t);
  }, [t]), x.useEffect(() => {
    if (!y) return;
    const V = setTimeout(() => b(null), Bz);
    return () => clearTimeout(V);
  }, [y]);
  const S = x.useMemo(() => Pz(l), [l]), T = Vz.includes(l.status) && l.kind === "batch", w = (l.exportZipStaleAt ?? null) !== null, R = async () => {
    if (l.deploymentId) {
      c(!0), h(null);
      try {
        const { runId: V } = await ph(l.deploymentId, l.runId);
        a(`/${l.deploymentId}/runs/${V}`);
      } catch (V) {
        h(Fz(V));
      } finally {
        c(!1);
      }
    }
  }, D = x.useCallback((V) => {
    m(($) => $ === V ? null : V);
  }, []), _ = x.useCallback(() => {
    m(null);
  }, []), B = (V, $) => {
    s((K) => kz(K, V, $)), m(null), b({ message: "Segment edited", severity: "success" });
  }, L = x.useCallback((V) => {
    b({ message: V, severity: "error" });
  }, []);
  return /* @__PURE__ */ v.jsxs("main", { className: WN, children: [
    /* @__PURE__ */ v.jsxs("div", { className: ez, children: [
      /* @__PURE__ */ v.jsxs("header", { className: tz, children: [
        /* @__PURE__ */ v.jsxs("p", { className: nz, children: [
          l.deploymentId ? /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
            /* @__PURE__ */ v.jsx(us, { to: `/${l.deploymentId}/recipe`, className: az, children: "← Back to recipe" }),
            /* @__PURE__ */ v.jsx("span", { className: iz, children: "·" })
          ] }) : null,
          /* @__PURE__ */ v.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: lz, children: [
          /* @__PURE__ */ v.jsxs("h1", { className: rz, children: [
            Yz(l.kind),
            /* @__PURE__ */ v.jsx("span", { className: sz, children: l.runId })
          ] }),
          /* @__PURE__ */ v.jsx(oi, { size: "md", tone: Xz(l.status), pulse: l.status === "running", children: l.status })
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("section", { className: oz, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ v.jsx(Yo, { label: "Format", value: l.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ v.jsx(Yo, { label: "Speed", value: `${l.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ v.jsx(
          Yo,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ v.jsx(
          Yo,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      T && /* @__PURE__ */ v.jsxs("section", { className: mz, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ v.jsxs("div", { className: pz, children: [
          /* @__PURE__ */ v.jsx("h2", { id: "run-detail-resume-title", className: yz, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ v.jsx("p", { className: gz, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ v.jsx(rt, { size: "lg", disabled: o, onClick: () => void R(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        d && /* @__PURE__ */ v.jsx("p", { className: vz, role: "alert", children: d })
      ] }),
      /* @__PURE__ */ v.jsxs(nn, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ v.jsxs(WR, { children: [
          /* @__PURE__ */ v.jsx("h2", { id: "run-detail-utterances", className: Rn, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ v.jsxs("span", { className: bz, children: [
            /* @__PURE__ */ v.jsx("span", { className: Sz, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ v.jsx("ul", { className: xz, children: l.utterances.map((V) => {
          const $ = p === V.utteranceId, K = V.status === "completed" && V.audioArtifactRef !== null && V.audioArtifactRef !== void 0, te = V.derivedArtifactRef ?? V.audioArtifactRef ?? null, A = te ? `/api/v1/artifacts/${encodeURIComponent(te)}/download` : "", Q = (V.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ v.jsxs("li", { className: Tz, children: [
            /* @__PURE__ */ v.jsxs("div", { className: Ez, children: [
              /* @__PURE__ */ v.jsxs("span", { className: Cz, children: [
                "#",
                V.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ v.jsx("span", { className: Mz, title: V.characterDisplay, children: V.characterDisplay }),
              /* @__PURE__ */ v.jsx("span", { className: Az, title: V.text, children: V.text }),
              /* @__PURE__ */ v.jsxs("span", { className: jz, children: [
                V.cacheHit && /* @__PURE__ */ v.jsx("span", { className: Dz, children: "cached" }),
                Q && /* @__PURE__ */ v.jsx("span", { className: wz, children: "edited" }),
                V.durationMs ? /* @__PURE__ */ v.jsx("span", { children: Gz(V.durationMs) }) : null,
                /* @__PURE__ */ v.jsx(oi, { tone: $z(V.status), children: V.status }),
                K && /* @__PURE__ */ v.jsx(
                  "button",
                  {
                    type: "button",
                    className: Rz,
                    onClick: () => D(V.utteranceId),
                    "aria-expanded": $,
                    "aria-label": $ ? "Close segment editor" : "Edit segment",
                    children: $ ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            $ && A && l.deploymentId && /* @__PURE__ */ v.jsx(
              ZN,
              {
                deploymentId: l.deploymentId,
                runId: l.runId,
                utterance: V,
                audioUrl: A,
                onApplied: (ne) => B(V.utteranceId, ne),
                onError: L,
                onCancel: _
              }
            )
          ] }, V.utteranceId);
        }) })
      ] }),
      qz(l, w)
    ] }),
    y && /* @__PURE__ */ v.jsx(
      "div",
      {
        className: Uz,
        role: y.severity === "error" ? "alert" : "status",
        "aria-live": y.severity === "error" ? "assertive" : "polite",
        children: y.message
      }
    )
  ] });
}
function qz(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const s = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ v.jsx("div", { className: Nz, children: a ? /* @__PURE__ */ v.jsxs("div", { className: _z, children: [
    /* @__PURE__ */ v.jsx("p", { className: Oz, children: s }),
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        type: "button",
        className: Lz,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ v.jsx("span", { className: Z0, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ v.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: zz,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ v.jsx("span", { className: Z0, children: "↓" })
      ]
    }
  ) : null });
}
function kz(t, a, l) {
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
function Yo({ label: t, value: a, mono: l, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: uz,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ v.jsx("span", { className: cz, children: t }),
        /* @__PURE__ */ v.jsx("span", { className: l ? dz : fz, children: a }),
        o !== void 0 && /* @__PURE__ */ v.jsx("span", { className: hz, "aria-hidden": "true" })
      ]
    }
  );
}
function Pz(t) {
  const a = t.utterances.length, l = t.utterances.filter((d) => d.status === "completed").length, s = t.utterances.filter(
    (d) => d.status === "failed" || d.status === "cancelled"
  ).length, o = t.utterances.filter((d) => d.cacheHit).length, c = l > 0 ? Math.round(o / l * 100) : 0;
  return { total: a, completed: l, failed: s, cached: o, cacheRatio: c };
}
function Yz(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function Gz(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function Fz(t) {
  return t instanceof Fi ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function Xz(t) {
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
function $z(t) {
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
var Kz = "pcphqj2", Qz = "pcphqj3", Iz = "pcphqj4", Zz = "pcphqj5", Jz = "pcphqj6", Wz = "pcphqj7", e3 = "pcphqj8", t3 = "pcphqj9", n3 = "pcphqja", J0 = "pcphqjb", a3 = "pcphqjc", i3 = "pcphqjd", l3 = "pcphqje pcphqjd", r3 = "pcphqjf", s3 = "pcphqjg", o3 = "pcphqjh", u3 = "pcphqji", c3 = "pcphqjj pcphqji", f3 = "pcphqjk pcphqji", d3 = "pcphqjl pcphqji", h3 = "pcphqjm", Sd = "pcphqjn", xd = "pcphqjo";
function m3() {
  const [t, a] = x.useState(null), [l, s] = x.useState(null);
  return x.useEffect(() => {
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
    const d = setInterval(() => void c(), 3e3);
    return () => {
      o = !0, clearInterval(d);
    };
  }, []), /* @__PURE__ */ v.jsx("main", { className: Kz, children: /* @__PURE__ */ v.jsxs("div", { className: Qz, children: [
    /* @__PURE__ */ v.jsxs("header", { className: Iz, children: [
      /* @__PURE__ */ v.jsx("p", { className: Zz, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ v.jsxs("div", { className: Jz, children: [
        /* @__PURE__ */ v.jsx("h1", { className: Wz, children: "Queue" }),
        /* @__PURE__ */ v.jsx("span", { className: e3, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ v.jsx("p", { className: t3, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    l ? /* @__PURE__ */ v.jsx(hn, { severity: "error", children: l }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ v.jsx(nn, { density: "compact", children: /* @__PURE__ */ v.jsx(xu, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ v.jsxs(nn, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ v.jsx("h2", { id: "runtime-queue-section", className: Rn, children: "01 / In flight" }),
      /* @__PURE__ */ v.jsx("ul", { className: n3, children: t.map((o) => {
        const c = o.position === 1;
        return /* @__PURE__ */ v.jsxs(
          "li",
          {
            className: c ? `${J0} ${a3}` : J0,
            children: [
              /* @__PURE__ */ v.jsx("span", { className: c ? l3 : i3, children: o.position }),
              /* @__PURE__ */ v.jsxs("span", { className: r3, children: [
                /* @__PURE__ */ v.jsx("span", { className: s3, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ v.jsx("span", { className: o3, children: o.runId })
              ] }),
              /* @__PURE__ */ v.jsx("span", { className: p3(o.kind), children: y3(o.kind) }),
              /* @__PURE__ */ v.jsx("span", { className: h3, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
                /* @__PURE__ */ v.jsx("span", { className: Sd, children: g3(o.etaSeconds) }),
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
      }) })
    ] })
  ] }) });
}
function p3(t) {
  switch (t) {
    case "batch":
      return c3;
    case "test_line":
      return f3;
    case "resume":
      return d3;
    default:
      return u3;
  }
}
function y3(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function g3(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), l = t % 60;
  return l === 0 ? `${a}m` : `${a}m ${l}s`;
}
function v3() {
  const { deploymentId: t, prefillCharacterName: a } = os(), l = Gi(), [s, o] = x.useState(a), [c, d] = x.useState(""), [h, p] = x.useState("none"), [m, y] = x.useState(!1), [b, S] = x.useState(null), T = x.useRef(null);
  x.useEffect(() => {
    T.current?.scrollIntoView({ behavior: "smooth", block: "center" }), T.current?.focus();
  }, []);
  const w = async (R) => {
    R.preventDefault(), y(!0), S(null);
    try {
      await qb(t, {
        characterName: s,
        speakerVoiceAssetId: c,
        defaultEmotionMode: h
      }), l(`/${t}/recipe`);
    } catch (D) {
      S(D instanceof Error ? D.message : "failed");
    } finally {
      y(!1);
    }
  };
  return /* @__PURE__ */ v.jsxs("main", { children: [
    /* @__PURE__ */ v.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ v.jsxs("form", { onSubmit: w, children: [
      /* @__PURE__ */ v.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ v.jsx(
          "input",
          {
            ref: T,
            value: s,
            onChange: (R) => o(R.currentTarget.value),
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
            onChange: (R) => d(R.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ v.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ v.jsxs("select", { value: h, onChange: (R) => p(R.currentTarget.value), children: [
          /* @__PURE__ */ v.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ v.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ v.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ v.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ v.jsx(rt, { type: "submit", variant: "primary", disabled: m, children: "Save mapping" }),
      b && /* @__PURE__ */ v.jsx(hn, { severity: "error", children: b })
    ] })
  ] });
}
var b3 = "_1oor31e0", S3 = "_1oor31e1", x3 = "_1oor31e2", E3 = "_1oor31e3", T3 = "_1oor31e4", w3 = "_1oor31e5", R3 = "_1oor31e6", C3 = "_1oor31e7", M3 = "_1oor31e8";
const A3 = 8;
function j3(t) {
  const { entries: a, loading: l, error: s } = t;
  return /* @__PURE__ */ v.jsxs("div", { className: b3, "aria-busy": !!l, children: [
    s && /* @__PURE__ */ v.jsx(hn, { severity: "error", children: s }),
    l && !s && /* @__PURE__ */ v.jsx("div", { className: M3, "aria-live": "polite", children: "Loading edit history…" }),
    !l && !s && a.length === 0 && /* @__PURE__ */ v.jsx("div", { className: C3, children: "No edits yet" }),
    !l && !s && a.length > 0 && /* @__PURE__ */ v.jsx("ul", { className: S3, children: a.map((o) => /* @__PURE__ */ v.jsxs("li", { className: x3, children: [
      /* @__PURE__ */ v.jsx("span", { className: E3, children: N3(o.recorded_at) }),
      /* @__PURE__ */ v.jsx("span", { className: T3, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ v.jsx("span", { className: w3, title: o.digest_after, children: D3(o.digest_after) }),
      /* @__PURE__ */ v.jsx("span", { className: R3, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function D3(t) {
  return t ? `${t.slice(0, A3)}…` : "—";
}
function N3(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var W0 = "_1c63kaw0", z3 = "_1c63kaw1", _3 = "_1c63kaw2", O3 = "_1c63kaw3", L3 = "_1c63kaw4", U3 = "_1c63kaw5", V3 = "_1c63kaw6", B3 = "_1c63kaw7";
function H3({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ v.jsx("div", { className: W0, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ v.jsx("span", { className: z3, children: "No edits yet" }) }) : /* @__PURE__ */ v.jsx("ol", { className: W0, "data-testid": "edit-chain-list", children: t.ops.map((l, s) => /* @__PURE__ */ v.jsxs("li", { className: _3, children: [
    /* @__PURE__ */ v.jsxs("span", { className: O3, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ v.jsxs("span", { className: L3, children: [
      /* @__PURE__ */ v.jsx("span", { className: U3, children: eb(l) }),
      /* @__PURE__ */ v.jsx("span", { className: V3, children: q3(l) })
    ] }),
    /* @__PURE__ */ v.jsx(
      "button",
      {
        type: "button",
        className: B3,
        onClick: () => a(l.id),
        "aria-label": `Remove ${eb(l)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, l.id)) });
}
function eb(t) {
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
function q3(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${tb(t.start_ms)} → ${tb(t.end_ms)}`;
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
function tb(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var Ed = "_1o3ytop0", k3 = "_1o3ytop1", P3 = "_1o3ytop2", nb = "_1o3ytop3", Y3 = "_1o3ytop4", G3 = "_1o3ytopa", F3 = "_1o3ytopb", X3 = "_1o3ytopc", $3 = "_1o3ytopd", K3 = "_1o3ytope", Q3 = "_1o3ytopf";
const ab = -16;
function I3(t) {
  const { voiceAsset: a, deploymentId: l, onChainPersisted: s, onError: o } = t, c = a.durationMs ?? 0, d = x.useMemo(
    () => Z3(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [h, p] = x.useState(() => Td(c)), [m, y] = x.useState(null), [b, S] = x.useState(null), [T, w] = x.useState(!1), [R, D] = x.useState(!1), [_, B] = x.useState(!1), [L, V] = x.useState(null), [$, K] = x.useState([]), [te, A] = x.useState([]), [Q, ne] = x.useState(!1), [ce, W] = x.useState(null), [se, G] = x.useState(0), I = x.useRef(null), N = x.useRef(null), J = x.useRef(null), ie = x.useRef(null), ue = x.useRef(null), Re = x.useRef(0), j = x.useMemo(
    () => h.ops.some((be) => be.mode === "normalize"),
    [h.ops]
  );
  x.useEffect(() => {
    p(Td(c)), y(null), B(!1), K([]), ue.current = null;
  }, [a.voiceAssetId, c]), x.useEffect(() => {
    ie.current?.abort();
    const be = new AbortController();
    return ie.current = be, ne(!0), W(null), CN(l, "voice_asset", a.voiceAssetId, 50, {
      signal: be.signal
    }).then((Oe) => {
      be.signal.aborted || A(Oe.entries);
    }).catch((Oe) => {
      if (be.signal.aborted) return;
      const Fe = Oe instanceof Error ? Oe.message : "audit fetch failed";
      W(Fe);
    }).finally(() => {
      be.signal.aborted || ne(!1);
    }), () => be.abort();
  }, [l, a.voiceAssetId, se]), x.useEffect(() => () => {
    b && URL.revokeObjectURL(b);
  }, [b]), x.useEffect(() => () => {
    N.current?.abort(), J.current?.abort(), ie.current?.abort();
  }, []);
  const F = h.ops.find((be) => be.mode === "trim"), le = h.ops.find((be) => be.mode === "normalize"), oe = F?.start_ms ?? 0, xe = F?.end_ms ?? Math.max(1, c), we = x.useCallback((be, Oe) => {
    p(
      (Fe) => ib(
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
  }, []), De = x.useCallback(
    (be) => we(be, xe),
    [xe, we]
  ), ht = x.useCallback(
    (be) => we(oe, be),
    [oe, we]
  ), Xe = x.useCallback((be) => {
    p((Oe) => {
      const Fe = Oe.ops.filter((ut) => ut.mode !== "normalize");
      if (be) {
        const ut = {
          id: Fl(),
          mode: "normalize",
          target_lufs: ab
        };
        return { ...Oe, ops: [...Fe, ut] };
      }
      return { ...Oe, ops: Fe };
    });
  }, []), ea = x.useCallback(
    (be) => {
      const Oe = h.ops.findIndex((ta) => ta.id === be);
      if (Oe === -1) return;
      const Fe = h.ops[Oe];
      if (!Fe) return;
      const ut = [...h.ops.slice(0, Oe), ...h.ops.slice(Oe + 1)];
      p({ ...h, ops: ut }), K((ta) => [...ta, { op: Fe, index: Oe }]);
    },
    [h]
  ), Ra = x.useCallback(() => {
    const be = $[$.length - 1];
    if (!be) return;
    const Oe = Math.min(be.index, h.ops.length), Fe = [...h.ops.slice(0, Oe), be.op, ...h.ops.slice(Oe)];
    p({ ...h, ops: Fe }), K($.slice(0, -1));
  }, [h, $]), kn = x.useCallback(() => {
    const be = Hx(h, c);
    return be ? (y(be.message), !1) : (y(null), !0);
  }, [h, c]), yt = x.useCallback(async () => {
    if (!kn() || T) return;
    N.current?.abort();
    const be = new AbortController();
    N.current = be;
    const Oe = ++Re.current;
    D(!0);
    try {
      const Fe = await RN(a.voiceAssetId, l, h, {
        signal: be.signal
      });
      if (be.signal.aborted || Oe !== Re.current) return;
      b && URL.revokeObjectURL(b);
      const ut = URL.createObjectURL(Fe);
      S(ut), B(!0), requestAnimationFrame(() => I.current?.play().catch(() => {
      }));
    } catch (Fe) {
      if (be.signal.aborted) return;
      const ut = Fe instanceof Error ? Fe.message : "preview failed";
      y(ut), o(ut);
    } finally {
      be.signal.aborted || D(!1);
    }
  }, [kn, T, a.voiceAssetId, l, h, b, o]), Ht = x.useCallback(async () => {
    if (!kn() || R || T) return;
    N.current?.abort(), J.current?.abort();
    const be = new AbortController();
    J.current = be, w(!0);
    try {
      const Oe = ue.current ?? void 0, Fe = await TN(
        a.voiceAssetId,
        l,
        Oe ? { chain: h, digest_before: Oe } : { chain: h },
        { signal: be.signal }
      );
      if (be.signal.aborted) return;
      ue.current = Fe.chain_digest, y(null), V(Fe.measured_lufs ?? null), K([]), s(Fe), G((ut) => ut + 1);
    } catch (Oe) {
      if (be.signal.aborted) return;
      const Fe = Oe instanceof kl;
      Oe instanceof kl && (ue.current = Oe.currentDigest || null);
      const ut = Fe ? "Edit chain has changed in another tab. Reload to continue." : Oe instanceof Error ? Oe.message : "apply failed";
      y(ut), o(ut);
    } finally {
      be.signal.aborted || w(!1);
    }
  }, [
    kn,
    R,
    T,
    a.voiceAssetId,
    l,
    h,
    s,
    o
  ]), Ca = x.useCallback(() => {
    N.current?.abort(), p(Td(c)), y(null), V(null), B(!1), K([]), G((be) => be + 1), b && (URL.revokeObjectURL(b), S(null));
  }, [c, b]), di = x.useCallback((be) => {
    p(
      (Oe) => ib(
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
  return /* @__PURE__ */ v.jsxs(Px, { variant: "standalone", children: [
    /* @__PURE__ */ v.jsx(
      Yx,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${Go(c)}`
      }
    ),
    /* @__PURE__ */ v.jsx(
      qx,
      {
        audioUrl: d,
        durationMs: Math.max(1, c),
        startMs: oe,
        endMs: xe,
        onChangeStart: De,
        onChangeEnd: ht
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: Ed, children: [
      /* @__PURE__ */ v.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ v.jsxs("span", { className: k3, children: [
        Go(oe),
        " → ",
        Go(xe),
        " · ",
        Go(xe - oe)
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: P3, children: [
      /* @__PURE__ */ v.jsxs("div", { className: nb, children: [
        /* @__PURE__ */ v.jsxs("span", { className: Ed, children: [
          /* @__PURE__ */ v.jsx("span", { children: "Normalize loudness" }),
          j && le && /* @__PURE__ */ v.jsxs("span", { className: G3, children: [
            "target ",
            le.target_lufs.toFixed(1),
            " LUFS",
            L !== null && ` · measured ${L.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ v.jsxs("label", { className: Y3, children: [
          /* @__PURE__ */ v.jsx(
            "input",
            {
              type: "checkbox",
              checked: j,
              onChange: (be) => Xe(be.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ v.jsxs("span", { children: [
            "Target ",
            ab.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        j && le && /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "range",
            className: X3,
            min: -30,
            max: -6,
            step: 0.5,
            value: le.target_lufs,
            onChange: (be) => di(Number(be.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: nb, children: [
        /* @__PURE__ */ v.jsxs("span", { className: Ed, children: [
          "Operations · ",
          h.ops.length
        ] }),
        /* @__PURE__ */ v.jsx(H3, { chain: h, onRemoveOp: ea })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs(Gx, { children: [
      /* @__PURE__ */ v.jsx(
        rt,
        {
          variant: "secondary",
          onClick: () => void yt(),
          disabled: R || T,
          children: R ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ v.jsx(
        rt,
        {
          onClick: () => void Ht(),
          disabled: T || R,
          children: T ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ v.jsx(
        rt,
        {
          variant: "ghost",
          onClick: Ca,
          disabled: T || R,
          children: "Reset"
        }
      ),
      $.length > 0 && /* @__PURE__ */ v.jsxs(
        rt,
        {
          variant: "ghost",
          size: "sm",
          onClick: Ra,
          disabled: T || R,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            $.length,
            ")"
          ]
        }
      ),
      _ && /* @__PURE__ */ v.jsx(
        "span",
        {
          className: Q3,
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
        ref: I,
        src: b,
        controls: !0,
        className: F3,
        "aria-label": "Edit preview"
      }
    ),
    m && /* @__PURE__ */ v.jsx(hn, { severity: "error", children: m }),
    /* @__PURE__ */ v.jsxs("details", { className: $3, children: [
      /* @__PURE__ */ v.jsxs("summary", { className: K3, children: [
        "Edit history",
        te.length > 0 ? ` · ${te.length}` : ""
      ] }),
      /* @__PURE__ */ v.jsx(
        j3,
        {
          entries: te,
          loading: Q,
          error: ce
        }
      )
    ] })
  ] });
}
function Td(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Fl(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function ib(t, a, l) {
  const s = t.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Fl(), mode: a };
    return { ...t, ops: [...t.ops, l(c)] };
  }
  const o = [...t.ops];
  return o[s] = l(o[s]), { ...t, ops: o };
}
function Go(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function Z3(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var J3 = "go9vi12", W3 = "go9vi13", e_ = "go9vi14", t_ = "go9vi15", n_ = "go9vi16", a_ = "go9vi17", i_ = "go9vi18", l_ = "go9vi19", r_ = "go9vi1a go9vi19", s_ = "go9vi1b", o_ = "go9vi1c", u_ = "go9vi1d", c_ = "go9vi1e", f_ = "go9vi1f", d_ = "go9vi1g", h_ = "go9vi1h", m_ = "go9vi1i", Oi = "go9vi1j", Yr = "go9vi1k", Vl = "go9vi1l", p_ = "go9vi1m go9vi1l", y_ = "go9vi1n", g_ = "go9vi1o go9vi1n", v_ = "go9vi1p go9vi1n", b_ = "go9vi1q", S_ = "go9vi1r", x_ = "go9vi1s", E_ = "go9vi1t", Fx = "go9vi1u", T_ = "go9vi1v", w_ = "go9vi1w", R_ = "go9vi1x go9vi1l", C_ = "go9vi1y", M_ = "go9vi1z", A_ = "go9vi110", j_ = "go9vi111", D_ = "go9vi112", N_ = "go9vi113";
const z_ = ["none", "audio_ref", "vector_preset", "qwen_template"];
function __() {
  const { deployment: t, mappings: a, voiceAssets: l } = os(), [s, o] = x.useState(a), [c, d] = x.useState(l), [h, p] = x.useState(
    a[0]?.mappingId ?? null
  ), [m, y] = x.useState(""), [b, S] = x.useState(null), [T, w] = x.useState(null), R = x.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const I of c) G.set(I.voiceAssetId, I);
    return G;
  }, [c]), D = x.useMemo(() => {
    const G = m.trim().toLowerCase();
    return G ? s.filter((I) => I.characterName.toLowerCase().includes(G)) : s;
  }, [s, m]), _ = x.useMemo(
    () => s.find((G) => G.mappingId === h) ?? null,
    [s, h]
  );
  x.useEffect(() => {
    o(a), d(l), p(a[0]?.mappingId ?? null);
  }, [a, l]), x.useEffect(() => {
    if (!T) return;
    const G = setTimeout(() => w(null), 2600);
    return () => clearTimeout(G);
  }, [T]);
  const B = x.useCallback(async () => {
    const G = await lu(t.deploymentId);
    d(G.voiceAssets);
  }, [t.deploymentId]), L = x.useCallback(
    (G) => {
      o(
        (I) => I.map((N) => N.mappingId === h ? { ...N, ...G } : N)
      );
    },
    [h]
  ), V = x.useCallback(
    async (G) => {
      if (!_) return;
      const I = _;
      try {
        const N = await LR(t.deploymentId, _.mappingId, G);
        o((J) => J.map((ie) => ie.mappingId === N.mappingId ? N : ie));
      } catch (N) {
        o(
          (J) => J.map((ie) => ie.mappingId === I.mappingId ? I : ie)
        ), S(Li(N));
      }
    },
    [_, t.deploymentId]
  ), $ = x.useCallback(async () => {
    const G = c[0];
    if (!G) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const I = H_(s), N = await qb(t.deploymentId, {
        characterName: I,
        speakerVoiceAssetId: G.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((J) => [...J, N]), p(N.mappingId);
    } catch (I) {
      S(Li(I));
    }
  }, [t.deploymentId, c, s]), K = x.useCallback(async () => {
    if (_ && confirm(`Deactivate mapping for ${_.characterName}?`))
      try {
        await UR(t.deploymentId, _.mappingId), o((G) => G.filter((I) => I.mappingId !== _.mappingId)), p(null), w(`Mapping for ${_.characterName} deactivated.`);
      } catch (G) {
        S(Li(G));
      }
  }, [t.deploymentId, _]), te = x.useCallback(
    async (G, I, N) => {
      try {
        const J = await YR(t.deploymentId, G, I, N);
        return d((ie) => [J, ...ie]), w(`${J.displayName} uploaded.`), J;
      } catch (J) {
        return S(Li(J)), null;
      }
    },
    [t.deploymentId]
  ), A = x.useCallback(async () => {
    try {
      const G = await VR(t.deploymentId);
      F_(G, `${t.deploymentId}-mappings.json`), w("Mappings exported to JSON.");
    } catch (G) {
      S(Li(G));
    }
  }, [t.deploymentId]), Q = x.useCallback(
    async (G, I) => {
      try {
        const N = await BR(
          t.deploymentId,
          G.mappings,
          I
        );
        w(
          `Imported ${N.created.length} • skipped ${N.skipped.length} • replaced ${N.replaced.length}.`
        );
        const J = await lu(t.deploymentId);
        d(J.voiceAssets);
      } catch (N) {
        S(Li(N));
      }
    },
    [t.deploymentId]
  ), ne = x.useCallback(
    async (G) => {
      await B(), w("Edit applied.");
    },
    [B]
  ), ce = x.useCallback((G) => {
    S(G);
  }, []), W = x.useCallback(
    async (G, I) => {
      if (!_) return null;
      const N = G.trim() || `[${_.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await PR(t.deploymentId, {
          line: N,
          outputFormat: I
        })).runId };
      } catch (J) {
        return S(Li(J)), null;
      }
    },
    [t.deploymentId, _]
  ), se = c.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ v.jsxs("div", { className: J3, children: [
    /* @__PURE__ */ v.jsxs("aside", { className: W3, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ v.jsxs("header", { className: e_, children: [
        /* @__PURE__ */ v.jsxs("div", { children: [
          /* @__PURE__ */ v.jsx("h1", { id: "mapping-sidebar-heading", className: t_, children: "Cast" }),
          /* @__PURE__ */ v.jsxs("span", { className: n_, children: [
            s.length,
            " active · ",
            c.length,
            " ",
            se
          ] })
        ] }),
        /* @__PURE__ */ v.jsx(rt, { variant: "primary", size: "sm", onClick: $, children: "+ Add" })
      ] }),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "search",
          className: a_,
          placeholder: "Search characters",
          value: m,
          onChange: (G) => y(G.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ v.jsx(B_, { onExport: A, onImport: Q }),
      /* @__PURE__ */ v.jsx("div", { className: i_, children: D.length === 0 ? /* @__PURE__ */ v.jsx(
        xu,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : D.map((G) => {
        const I = R.get(G.speakerVoiceAssetId), N = G.mappingId === h;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            className: N ? r_ : l_,
            onClick: () => p(G.mappingId),
            "aria-pressed": N,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ v.jsx("span", { className: s_, "aria-hidden": "true", children: q_(G.characterName) }),
              /* @__PURE__ */ v.jsxs("span", { className: o_, children: [
                /* @__PURE__ */ v.jsx("span", { className: u_, children: G.characterName }),
                /* @__PURE__ */ v.jsxs("span", { className: c_, children: [
                  G.defaultEmotionMode,
                  " · ",
                  I?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          G.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ v.jsxs("section", { className: f_, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ v.jsx(xx, { features: Vx, children: /* @__PURE__ */ v.jsx(ID, { children: T && /* @__PURE__ */ v.jsx(
        jx.div,
        {
          className: T_,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: T
        },
        T
      ) }) }),
      b && /* @__PURE__ */ v.jsx(hn, { severity: "error", children: b }),
      _ ? /* @__PURE__ */ v.jsx(
        L_,
        {
          deploymentId: t.deploymentId,
          mapping: _,
          voiceAssets: c,
          onNameChange: (G) => {
            L({ characterName: G });
          },
          onNameBlur: (G) => {
            G !== _.characterName && G.trim() && V({ characterName: G.trim() });
          },
          onSpeakerChange: (G) => {
            L({ speakerVoiceAssetId: G }), V({ speakerVoiceAssetId: G });
          },
          onModeChange: (G) => {
            L({ defaultEmotionMode: G }), V({ defaultEmotionMode: G });
          },
          onQwenChange: (G) => {
            L({ defaultQwenTemplate: G });
          },
          onQwenBlur: (G) => {
            V({ defaultQwenTemplate: G });
          },
          onSpeedChange: (G) => {
            L({ defaultSpeedFactor: G });
          },
          onSpeedCommit: (G) => {
            V({ defaultSpeedFactor: G });
          },
          onEmotionVoiceChange: (G) => {
            const I = G || null;
            L({ defaultEmotionVoiceAssetId: I }), V({ defaultEmotionVoiceAssetId: I });
          },
          onDelete: K,
          onUploadVoice: async (G, I, N) => {
            const J = await te(G, I, N);
            return J && N === "speaker" && (L({ speakerVoiceAssetId: J.voiceAssetId }), V({ speakerVoiceAssetId: J.voiceAssetId })), await B(), J;
          },
          onTestLine: W,
          onEditChainPersisted: ne,
          onEditError: ce
        }
      ) : /* @__PURE__ */ v.jsx(
        O_,
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
function O_({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ v.jsxs(nn, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ v.jsxs("div", { className: A_, children: [
      /* @__PURE__ */ v.jsx("p", { className: Rn, children: "01 / Onboarding" }),
      /* @__PURE__ */ v.jsx("h2", { id: "onboarding-heading", className: j_, children: "Upload your first voice" }),
      /* @__PURE__ */ v.jsxs("p", { className: D_, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ v.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ v.jsx(
      Xx,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (l) => (await a(l), null)
      }
    )
  ] }) : /* @__PURE__ */ v.jsx(nn, { density: "airy", children: /* @__PURE__ */ v.jsx(
    xu,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function L_(t) {
  const { mapping: a, voiceAssets: l } = t, s = l.find((w) => w.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = l.find((w) => w.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [c, d] = x.useState(""), [h, p] = x.useState("mp3"), [m, y] = x.useState("idle"), [b, S] = x.useState(null), T = x.useCallback(async () => {
    y("running"), S(null);
    const w = await t.onTestLine(c, h);
    if (!w) {
      y("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: R } = w;
    for (let D = 0; D < 60; D += 1) {
      await new Promise((_) => setTimeout(_, 500));
      try {
        const _ = await mh(t.deploymentId, R);
        if (_.status === "completed") {
          y("done");
          return;
        }
        if (_.status === "failed" || _.status === "cancelled") {
          y("error"), S(`Run ${_.status}.`);
          return;
        }
      } catch (_) {
        y("error"), S(_ instanceof Error ? _.message : "unknown error");
        return;
      }
    }
    y("error"), S("test-line timed out after 30s");
  }, [t.onTestLine, t.deploymentId, c, h]);
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("header", { className: d_, children: [
      /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsx("p", { className: Rn, children: "Character" }),
        /* @__PURE__ */ v.jsx("h2", { className: h_, children: a.characterName })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: Fx, children: /* @__PURE__ */ v.jsx(rt, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ v.jsxs(
      nn,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: w_,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ v.jsx(
            "input",
            {
              type: "text",
              className: R_,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: c,
              onChange: (w) => d(w.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: m === "running"
            }
          ),
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              className: Vl,
              value: h,
              onChange: (w) => p(w.currentTarget.value),
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
            rt,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void T(),
              disabled: m === "running",
              children: m === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          m === "done" && /* @__PURE__ */ v.jsx(oi, { tone: "success", children: "Synthesised — see host logs for output path." }),
          m === "error" && b && /* @__PURE__ */ v.jsx(oi, { tone: "danger", children: b })
        ]
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: m_, children: [
      /* @__PURE__ */ v.jsxs(nn, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ v.jsx("h3", { id: "identity-heading", className: Rn, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ v.jsxs("label", { className: Yr, children: [
          /* @__PURE__ */ v.jsx("span", { className: Oi, children: "Character name" }),
          /* @__PURE__ */ v.jsx(
            "input",
            {
              className: Vl,
              value: a.characterName,
              onChange: (w) => t.onNameChange(w.currentTarget.value),
              onBlur: (w) => t.onNameBlur(w.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("label", { className: Yr, children: [
          /* @__PURE__ */ v.jsx("span", { className: Oi, children: "Emotion mode" }),
          /* @__PURE__ */ v.jsx(
            "select",
            {
              className: Vl,
              value: a.defaultEmotionMode,
              onChange: (w) => t.onModeChange(w.currentTarget.value),
              children: z_.map((w) => /* @__PURE__ */ v.jsx("option", { value: w, children: k_(w) }, w))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ v.jsxs("label", { className: Yr, children: [
          /* @__PURE__ */ v.jsxs("span", { className: Oi, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ v.jsx(
            "textarea",
            {
              className: p_,
              value: a.defaultQwenTemplate ?? "",
              onChange: (w) => t.onQwenChange(w.currentTarget.value),
              onBlur: (w) => t.onQwenBlur(w.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ v.jsxs("label", { className: Yr, children: [
          /* @__PURE__ */ v.jsx("span", { className: Oi, children: "Emotion reference" }),
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              className: Vl,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (w) => t.onEmotionVoiceChange(w.currentTarget.value),
              children: [
                /* @__PURE__ */ v.jsx("option", { value: "", children: "— none —" }),
                l.map((w) => /* @__PURE__ */ v.jsxs("option", { value: w.voiceAssetId, children: [
                  w.displayName,
                  " · ",
                  w.kind
                ] }, w.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("label", { className: Yr, children: [
          /* @__PURE__ */ v.jsxs("span", { className: Oi, children: [
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
              onChange: (w) => t.onSpeedChange(Number(w.currentTarget.value)),
              onMouseUp: (w) => t.onSpeedCommit(Number(w.currentTarget.value)),
              onTouchEnd: (w) => t.onSpeedCommit(Number(w.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs(nn, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ v.jsx("h3", { id: "voice-heading", className: Rn, children: "02 / Voice Reference" }),
        /* @__PURE__ */ v.jsx("span", { className: Oi, children: "Speaker reference" }),
        /* @__PURE__ */ v.jsx(
          U_,
          {
            value: a.speakerVoiceAssetId,
            voices: l,
            onChange: t.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ v.jsx(lb, { voice: s }),
        /* @__PURE__ */ v.jsx(
          Xx,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (w) => t.onUploadVoice(w, w.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        s && /* @__PURE__ */ v.jsx(
          I3,
          {
            voiceAsset: s,
            deploymentId: t.deploymentId,
            onChainPersisted: t.onEditChainPersisted,
            onError: t.onEditError
          }
        ),
        o && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
          /* @__PURE__ */ v.jsx("span", { className: Oi, children: "Emotion reference voice" }),
          /* @__PURE__ */ v.jsx(lb, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function U_({
  value: t,
  voices: a,
  onChange: l
}) {
  return /* @__PURE__ */ v.jsxs(
    "select",
    {
      className: Vl,
      value: t,
      onChange: (s) => l(s.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ v.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((s) => /* @__PURE__ */ v.jsx("option", { value: s.voiceAssetId, children: s.displayName }, s.voiceAssetId))
      ]
    }
  );
}
function lb({ voice: t }) {
  const a = P_(t.durationMs ?? null);
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsxs("div", { className: b_, children: [
      /* @__PURE__ */ v.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ v.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ v.jsx("span", { children: Y_(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ v.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ v.jsxs("div", { className: S_, children: [
      /* @__PURE__ */ v.jsx("div", { className: x_, children: /* @__PURE__ */ v.jsx(xx, { features: Vx, children: /* @__PURE__ */ v.jsx(
        jx.div,
        {
          className: E_,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ v.jsx(oi, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ v.jsx(V_, { seed: t.contentSha256 })
  ] });
}
function V_({ seed: t }) {
  const a = x.useMemo(() => G_(t, 48), [t]);
  return /* @__PURE__ */ v.jsx("div", { className: C_, "aria-hidden": "true", children: a.map((l, s) => /* @__PURE__ */ v.jsx(
    "span",
    {
      className: M_,
      style: { height: `${Math.max(6, l * 100)}%` }
    },
    s
  )) });
}
function Xx({
  label: t,
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
      className: o ? v_ : l ? g_ : y_,
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
        o ? "Uploading…" : t
      ]
    }
  );
}
function B_({
  onExport: t,
  onImport: a
}) {
  const [l, s] = x.useState("error"), o = x.useRef(null);
  return /* @__PURE__ */ v.jsxs("div", { className: Fx, children: [
    /* @__PURE__ */ v.jsx(rt, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        ref: o,
        type: "file",
        accept: "application/json,.json",
        className: N_,
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
    /* @__PURE__ */ v.jsx(rt, { variant: "secondary", size: "sm", onClick: () => o.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ v.jsxs(
      "select",
      {
        className: Vl,
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
function H_(t) {
  const a = new Set(t.map((s) => s.characterName.toLowerCase()));
  let l = t.length + 1;
  for (; a.has(`character ${l}`); ) l += 1;
  return `Character ${l}`;
}
function q_(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function k_(t) {
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
function P_(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function Y_(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function G_(t, a) {
  const l = [];
  for (let s = 0; s < a; s += 1) {
    const o = t.charCodeAt(s % t.length);
    l.push((o * 31 + s * 7) % 100 / 100);
  }
  return l;
}
function F_(t, a) {
  const l = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), s = URL.createObjectURL(l), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function Li(t) {
  return t instanceof Fi || t instanceof Error ? t.message : "unknown error";
}
function X_() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await _R();
        return { deployments: t };
      },
      Component: mC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Dl(t, "deploymentId");
        return kT(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Dl(t, "deploymentId"), [l, { mappings: s }, { runs: o }, c] = await Promise.all([
          hv(a),
          mv(a),
          HR(a, { limit: 10 }),
          GR(a)
        ]);
        return { deployment: l, mappings: s, runs: o, workflow: c };
      },
      Component: EN
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Dl(t, "deploymentId"), l = Dl(t, "runId");
        return { run: await mh(a, l) };
      },
      Component: Hz
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Dl(t, "deploymentId"), [l, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          hv(a),
          mv(a),
          lu(a)
        ]);
        return { deployment: l, mappings: s, voiceAssets: o };
      },
      Component: __
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const l = Dl(t, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: l,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: v3
    },
    {
      path: "/runtime/queue",
      Component: m3
    }
  ];
}
function Dl(t, a) {
  const l = t[a];
  if (!l)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return l;
}
const Wd = "emotion-tts-app", $_ = "ext-event", rb = "emotion-tts-stylesheet", sb = ["accent", "density", "card"];
function K_(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function Q_() {
  if (typeof document > "u" || document.getElementById(rb)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = rb, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
Q_();
class I_ extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = dT.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.paint();
  }
  attributeChangedCallback() {
    this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null;
  }
  syncTweaksFromBody() {
    for (const a of sb) {
      const l = K_(a);
      l === void 0 ? delete this.dataset[a] : this.dataset[a] !== l && (this.dataset[a] = l);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: sb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), l = Kw(X_(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ v.jsx(x.StrictMode, { children: /* @__PURE__ */ v.jsx(Iw, { router: l }) })
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
      new CustomEvent($_, {
        detail: { topic: a, payload: l },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function Z_() {
  typeof customElements > "u" || customElements.get(Wd) || customElements.define(Wd, I_);
}
typeof customElements < "u" && !customElements.get(Wd) && Z_();
export {
  Z_ as register
};
//# sourceMappingURL=emotion-tts.js.map
